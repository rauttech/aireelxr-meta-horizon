# AaireelXR - Quick Reference Guide

## 📁 Project Files Overview

### Horizon Scripts (Import into Horizon Editor)

| File | Purpose | Import Location |
|------|---------|----------------|
| `hologram-avatar-system.ts` | Main hologram system with emotions & animations | Script Object: "HologramSystem" |
| `noesis-ui-handlers.ts` | UI button event handlers | Script Object: "UIHandlers" |
| `ai-npc-guide.ts` | AI NPC guide (GenAI feature) | Attach to NPC: "HologramGuide" |
| `horizon-match-presence.ts` | Video presence integration | Script Object: "VideoPresence" |

### NoesisUI Files

| File | Purpose | Import Location |
|------|---------|----------------|
| `emotion-control-panel.xaml` | 4-button emotion UI panel | NoesisUI Panel object |

### Web Application (Deploy to Cloud)

| Component | Deploy To | URL Needed For |
|-----------|-----------|----------------|
| `web-rtc-client/` | Vercel | Web Surface URL |
| `signaling-server/` | Railway | Web client env variable |

---

## 🚀 Quick Start Checklist

### 1. Deploy Web Services
```bash
# Deploy web client
cd web-rtc-client
npm install
npm run build
# Deploy to Vercel via dashboard

# Deploy signaling server
# Use Railway dashboard to deploy from GitHub
```

### 2. Update Configuration
- Update `WEB_SURFACE_URL` in `horizon-match-presence.ts` with your Vercel URL
- Set `VITE_SIGNALING_URL` environment variable in Vercel to your Railway URL

### 3. Import into Horizon Editor
1. Create new world: "AaireelXR - Family Hologram Room"
2. Import all TypeScript scripts
3. Import NoesisUI XAML
4. Create AI NPC and attach script
5. Add Web Surface with your Vercel URL
6. Link UI buttons to event handlers

### 4. Test & Publish
- Test solo in Creator Mode
- Test multi-user with friend
- Test on mobile device
- Publish world as Public
- Record demo video
- Submit to Devpost

---

## 🎯 Competition Requirements Checklist

### Technical Requirements
- [x] Works on mobile (NoesisUI + responsive Web Surface)
- [x] New world created for competition
- [x] Innovative concept (WebRTC + holograms)
- [ ] Publicly accessible (publish world)

### GenAI Features (MANDATORY - At least 1)
- [x] AI NPCs (embodied) - `ai-npc-guide.ts`
- [x] Environment Generation (use in world building)
- [ ] Other GenAI features (optional)

### Judging Criteria
- [x] **Technical**: WebRTC, TypeScript, multi-user sync
- [x] **Visuals**: Hologram effects, particle systems, UI design
- [x] **Experience**: Simple flow, NPC guidance, emotion expression
- [x] **Social**: Multi-user, video calls, emotion broadcasting
- [x] **GenAI**: AI NPC guide

### Devpost Submission
- [ ] World name: "AaireelXR - Family Hologram Room"
- [ ] Publisher username
- [ ] Team info and roles
- [ ] Genre: Open Genre (Social/Communication)
- [ ] GenAI features: AI NPCs
- [ ] Recommended players: 3+ players
- [ ] 200-300 word description
- [ ] 3-minute demo video (with mobile footage)
- [ ] World URL

---

## 🎨 Emotion System Quick Reference

| Emotion | Button Color | Particle Effect | Animation | Sound |
|---------|--------------|-----------------|-----------|-------|
| ❤️ Heart | Red (#FF1744) | Floating pink hearts | Wave | Heart pop |
| 😊 Smile | Gold (#FFD700) | Golden sparkles | Nod | Sparkle |
| 😂 Laugh | Purple (#9C27B0) | Colorful confetti | Dance | Confetti |
| 😢 Sad | Blue (#2196F3) | Blue pulsing glow | Slow nod | Sad tone |

---

## 🤖 AI NPC Dialogue Options

When players interact with "Holo" the NPC:
- **How do I use this?** - Explains video call and emotion system
- **What are the emotion buttons?** - Details each emotion effect
- **How do video calls work?** - Explains cross-platform connectivity
- **I need help!** - General assistance and exploration tips
- **Free-form questions** - AI generates contextual responses

---

## 📱 Mobile Optimization Features

1. **NoesisUI Panel**
   - Large touch targets (60px+)
   - High contrast colors
   - Clear emoji icons
   - Responsive layout

2. **Web Surface**
   - Mobile-responsive React app
   - Touch-friendly controls
   - Optimized video quality
   - Works in mobile browsers

3. **Performance**
   - Efficient particle systems
   - Optimized hologram rendering
   - Low-latency WebRTC

---

## 🔧 Troubleshooting

### Web Surface Blank
- Verify URL is HTTPS
- Check web client is deployed
- Test URL in Quest browser
- Enable "Allow Interaction"

### Emotion Buttons Not Working
- Verify button events linked to handlers
- Check UIHandlers script attached to panel
- Look for script errors in console

### NPC Not Responding
- Ensure NPC named "HologramGuide"
- Check AI script attached
- Verify AI dialogue enabled

### Video/Audio Issues
- Grant camera/mic permissions
- Check signaling server running
- Test on desktop browser first
- Verify TURN/STUN config

### Holograms Not Appearing
- Check HologramSystem script running
- Look for console errors
- Verify player spawn points

---

## 📊 Recommended World Settings

- **Name**: AaireelXR - Family Hologram Room
- **Capacity**: 10-12 players
- **Visibility**: Public
- **Category**: Social / Communication
- **Tags**: Social, Video, Communication, Family, Tech, Innovative
- **Age Rating**: Everyone
- **Recommended Players**: 3-8 players

---

## 🎬 Demo Video Timing

| Section | Duration | Content |
|---------|----------|---------|
| Opening | 0:00-0:20 | World entrance, environment |
| NPC Intro | 0:20-0:35 | AI guide greeting |
| Video Call | 0:35-1:15 | Quest setup, room creation |
| Mobile Join | 1:15-1:45 | Mobile screen recording |
| Emotions | 1:45-2:30 | All 4 emotion buttons |
| Multi-User | 2:30-2:50 | Multiple players |
| Closing | 2:50-3:00 | Call to action |

---

## 📞 Support Resources

- **Horizon Documentation**: [Meta Horizon Worlds Creator Docs](https://developers.meta.com/horizon-worlds)
- **Competition Rules**: Check Devpost page
- **Project Docs**: See `docs/` folder
  - `horizon-world-publishing-guide.md` - Complete setup guide
  - `demo-video-script.md` - Video recording guide
  - `competition-compliance.md` - Requirements checklist

---

## ✨ Key Features Summary

**What Makes AaireelXR Outstanding:**

1. **First-of-its-kind** WebRTC video integration in Horizon
2. **Cross-platform** connectivity (Quest, mobile, desktop)
3. **Holographic emotion system** with synchronized particle effects
4. **AI-powered guide** using Meta's GenAI technology
5. **Mobile-optimized** UI with NoesisUI
6. **Multi-user** synchronized experience
7. **Production-ready** architecture with deployed services

---

**Ready to publish? Follow the complete guide in `docs/horizon-world-publishing-guide.md`!** 🚀
