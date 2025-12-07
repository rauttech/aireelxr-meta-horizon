# Quick Start Checklist - AaireelXR Implementation

Use this checklist to track your progress through the implementation.

---

## ☑️ PHASE 1: Deploy Web Services

- [ ] Create Vercel account
- [ ] Deploy web client to Vercel
- [ ] Save Vercel URL: ___________________________
- [ ] Create Railway account  
- [ ] Deploy signaling server to Railway
- [ ] Save Railway URL: ___________________________
- [ ] Add VITE_SIGNALING_URL to Vercel environment variables
- [ ] Redeploy Vercel app

**Estimated Time:** 30 minutes

---

## ☑️ PHASE 2: Import Scripts to Horizon

- [ ] Open "AaireelXR - Family Hologram Room" in Horizon Editor
- [ ] Enter Creator Mode
- [ ] Create Script 1: `HologramSystem`
  - [ ] Copy from `hologram-avatar-system.ts`
  - [ ] Paste and save
- [ ] Create Script 2: `VideoPresence`
  - [ ] Copy from `horizon-match-presence.ts`
  - [ ] Update WEB_SURFACE_URL with Vercel URL
  - [ ] Paste and save
- [ ] Create Script 3: `UIHandlers`
  - [ ] Copy from `noesis-ui-handlers.ts`
  - [ ] Paste and save
- [ ] Create Script 4: `AINPCGuide`
  - [ ] Copy from `ai-npc-guide.ts`
  - [ ] Paste and save
- [ ] Create WorldController object (invisible cube)
- [ ] Attach HologramSystem script to WorldController

**Estimated Time:** 45 minutes

---

## ☑️ PHASE 3: Build Environment

- [ ] Open AI Tools > Environment Generation
- [ ] Generate futuristic family room environment
- [ ] Accept generated environment
- [ ] Add Web Surface object
  - [ ] Position at eye level (1.6m)
  - [ ] Size: 2m x 1.5m
  - [ ] Set URL to Vercel URL
  - [ ] Enable "Allow Interaction"
  - [ ] Enable "Visible to All"
- [ ] Add frame around Web Surface (optional)
- [ ] Add NoesisUI Panel
  - [ ] Position to right of Web Surface
  - [ ] Import `emotion-control-panel.xaml`
  - [ ] Link Heart button to OnHeartButtonClick
  - [ ] Link Smile button to OnSmileButtonClick
  - [ ] Link Laugh button to OnLaughButtonClick
  - [ ] Link Sad button to OnSadButtonClick
  - [ ] Attach UIHandlers script to panel

**Estimated Time:** 30 minutes

---

## ☑️ PHASE 4: Add AI NPC

- [ ] Create AI NPC near entrance
- [ ] Name NPC: `HologramGuide`
- [ ] Set display name: `Holo`
- [ ] Configure appearance (futuristic, friendly)
- [ ] Enable AI Dialogue
- [ ] Attach AINPCGuide script to NPC
- [ ] Test NPC greeting

**Estimated Time:** 15 minutes

---

## ☑️ PHASE 5: Testing

### Solo Testing
- [ ] Exit Creator Mode
- [ ] Walk around environment
- [ ] Approach NPC - verify greeting
- [ ] Click NPC - verify dialogue menu
- [ ] Click Web Surface - verify app loads
- [ ] Create room in video app
- [ ] Click each emotion button
- [ ] Verify particle effects appear
- [ ] Check for script errors

### Video Call Testing
- [ ] Create room on Quest
- [ ] Copy room code
- [ ] Join from phone/computer
- [ ] Verify both video feeds work
- [ ] Test audio

### Mobile Testing (if available)
- [ ] Open world on mobile
- [ ] Test emotion panel buttons
- [ ] Verify touch targets are large enough
- [ ] Check performance

**Estimated Time:** 30 minutes

---

## ☑️ PHASE 6: Publish World

- [ ] Enter Creator Mode for final polish
- [ ] Fix any issues found in testing
- [ ] Open World Settings
- [ ] Set visibility to Public
- [ ] Set capacity to 10-12 players
- [ ] Add description (see walkthrough)
- [ ] Add tags: Social, Video, Communication, Family, Tech, Innovative
- [ ] Set category: Social / Communication
- [ ] Set age rating: Everyone
- [ ] Take cover photo
- [ ] Upload cover photo
- [ ] Click "Publish World"
- [ ] Copy World URL: ___________________________

**Estimated Time:** 10 minutes

---

## ☑️ PHASE 7: Create Demo Video

### Recording
- [ ] Record Scene 1: Opening (0:00-0:20)
- [ ] Record Scene 2: NPC Guide (0:20-0:35)
- [ ] Record Scene 3: Video Call - Quest (0:35-1:15)
- [ ] Record Scene 4: Mobile Join (1:15-1:45)
- [ ] Record Scene 5: Emotions (1:45-2:30)
- [ ] Record Scene 6: Multi-User (2:30-2:50)
- [ ] Record Scene 7: Closing (2:50-3:00)

### Editing
- [ ] Import all clips into video editor
- [ ] Add text overlays
- [ ] Add background music (royalty-free)
- [ ] Ensure total length is under 3 minutes
- [ ] Export as MP4 (1080p)

### Upload
- [ ] Upload to YouTube
- [ ] Set title: "AaireelXR - Family Hologram Room | Meta Horizon Creator Competition"
- [ ] Set to Public or Unlisted
- [ ] Copy video URL: ___________________________

**Estimated Time:** 45 minutes

---

## ☑️ PHASE 8: Devpost Submission

### Prepare Information
- [ ] World name: AaireelXR - Family Hologram Room
- [ ] World URL: [from Phase 6]
- [ ] Your Meta Horizon username: ___________________________
- [ ] Team member names and roles: ___________________________
- [ ] Demo video URL: [from Phase 7]

### Write Content
- [ ] Copy description from `devpost-submission.md`
- [ ] Customize team information
- [ ] Add your specific accomplishments
- [ ] Review and edit for clarity

### Submit
- [ ] Go to Devpost competition page
- [ ] Click "Submit Project"
- [ ] Fill in all required fields:
  - [ ] Project title
  - [ ] Tagline
  - [ ] Description
  - [ ] World URL
  - [ ] Team information
  - [ ] Genre: Open Genre
  - [ ] GenAI features: AI NPCs + Environment Generation
  - [ ] Recommended players: 3+ players
  - [ ] Demo video URL
  - [ ] Built with tags
- [ ] Upload screenshots (4-6 images)
- [ ] Review submission
- [ ] Click "Submit"

**Estimated Time:** 20 minutes

---

## ✅ FINAL VERIFICATION

Before submitting, verify:

### Technical Requirements
- [ ] World works on mobile
- [ ] World is new (created for competition)
- [ ] World is innovative and unique
- [ ] World is publicly accessible

### GenAI Requirements (at least 1)
- [ ] AI NPCs implemented (Holo)
- [ ] Environment Generation used

### Judging Criteria
- [ ] Technical complexity demonstrated
- [ ] Visually appealing
- [ ] Good user experience design
- [ ] Social/multiplayer features
- [ ] GenAI features integrated

### Devpost Requirements
- [ ] World published and public
- [ ] Demo video uploaded (includes mobile footage)
- [ ] Description 200-300 words
- [ ] All team info provided
- [ ] World URL included
- [ ] Submitted before deadline

---

## 🎉 COMPLETION

**Total Estimated Time:** ~3.5 hours

Once all checkboxes are complete, you're done! 

**Congratulations on submitting to the Meta Horizon Creator Competition!** 🚀

---

## 📞 Need Help?

Refer to these files:
- **Full walkthrough:** `walkthrough.md`
- **Devpost content:** `devpost-submission.md`
- **Demo video script:** `demo-video-script.md`
- **Quick reference:** `quick-reference.md`
- **Implementation plan:** `implementation_plan.md`

All scripts are in: `horizon-scripts/`
