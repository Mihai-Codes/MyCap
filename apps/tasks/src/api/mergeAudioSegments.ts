import express from "express";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

const router = express.Router();

const rateLimitMap = new Map<string, number>();

router.post<{}>("/", async (req, res) => {
	const ip = req.ip || "unknown";
	const now = Date.now();
	const lastRequest = rateLimitMap.get(ip) || 0;

	if (now - lastRequest < 1000) { // 1 request per second
		res.status(429).json({ response: "FAILED", error: "Too many requests" });
		return;
	}
	rateLimitMap.set(ip, now);

	// Clean up old entries periodically
	if (rateLimitMap.size > 1000) {
		for (const [key, time] of rateLimitMap.entries()) {
			if (now - time > 60000) rateLimitMap.delete(key);
		}
	}

	const body = req.body;

	if (
		!body.segments ||
		body.segments.length === 0 ||
		!body.uploadUrl ||
		!body.videoId ||
		!/^[a-zA-Z0-9_-]+$/.test(body.videoId) || // Prevent path traversal
		!/^https?:\/\//.test(body.uploadUrl) // Basic SSRF protection
	) {
		res.status(400).json({ response: "FAILED" });
		return;
	}

	const outputDir = "./output";
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}

	const command = ffmpeg();
	const filePath = `./output/merged_${body.videoId}.mp3`;

	for (const url of body.segments) {
		if (typeof url !== 'string' || !/^https?:\/\//.test(url)) {
			res.status(400).json({ response: "FAILED", error: "Invalid segment URL" });
			return;
		}
		command.input(url);
	}

	command
		.audioCodec("libmp3lame")
		.on("error", (err: any) => {
			console.log("An error occurred: " + err.message);
		})
		.on("end", async () => {
			console.log("Merging finished!");

			const buffer = fs.readFileSync(filePath);

			const uploadResponse = await fetch(body.uploadUrl, {
				method: "PUT",
				body: buffer,
				headers: {
					"Content-Type": "audio/mpeg",
				},
			});

			fs.unlinkSync(filePath);

			if (!uploadResponse.ok) {
				console.error("Upload failed: ", await uploadResponse.text());
				res.status(500).json({ response: "FAILED" });
				return;
			}

			res.status(200).json({ response: "COMPLETE" });
		})
		.mergeToFile(filePath, "./");
});

export default router;
