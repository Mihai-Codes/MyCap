# MyCap Roadmap

Personal fork of [Cap](https://github.com/CapSoftware/Cap) with monetization removed and Screen Studio-inspired features planned.

## Current Custom Changes
- ✅ Removed recording time limits
- ✅ Stripped upgrade prompts from UI

---

## Planned Features (Screen Studio-inspired)

### Priority 1: Background & Padding
**Status:** Not started  
**Difficulty:** Easy

Add configurable background/padding around the recording window to give videos a polished, presentation-ready look.

- [ ] Background color picker
- [ ] Padding size slider (px)
- [ ] Corner radius for recording area
- [ ] Preset themes (dark, light, gradient)

---

### Priority 2: Shadow & Inset Effects
**Status:** Not started  
**Difficulty:** Easy

Add drop shadows and inset effects to make the recording pop against the background.

- [ ] Drop shadow toggle
- [ ] Shadow blur/spread controls
- [ ] Shadow color/opacity
- [ ] Inner shadow/inset option

---

### Priority 3: Keyboard Shortcut Display
**Status:** Not started  
**Difficulty:** Medium

Show keyboard shortcuts on screen as they're pressed during recording.

- [ ] Real-time key capture overlay
- [ ] Customizable key display position
- [ ] Key appearance styling (size, colors, fade duration)
- [ ] Filter for modifier keys only vs all keys

---

### Priority 4: Smooth Cursor Movement
**Status:** Not started  
**Difficulty:** Medium

Apply easing/smoothing to cursor movement in post-processing for more professional-looking demos.

- [ ] Cursor smoothing toggle
- [ ] Smoothing intensity slider
- [ ] Preview in editor before export

---

### Priority 5: Auto-zoom on Cursor
**Status:** Not started  
**Difficulty:** Medium

Automatically zoom in on the cursor area during editing to highlight important actions.

- [ ] Click-to-zoom markers in timeline
- [ ] Auto-detect click events for zoom
- [ ] Zoom level and duration controls
- [ ] Easing for zoom in/out transitions

---

## Upstream Sync Strategy

Keep custom changes minimal and isolated to make syncing with upstream easier:
- Monetization removal: ~13 files
- New features: Add in separate modules when possible
- Periodically merge upstream with `git fetch upstream && git merge upstream/main`

---

## Notes

- Using GitHub Issues/Projects on [Cap-Personal](https://github.com/chindris-mihai-alexandru/Cap-Personal) for detailed tracking when needed
- This file is the quick reference for priorities
