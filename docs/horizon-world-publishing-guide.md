# Complete Horizon World Publishing Guide
## AaireelXR - Family Hologram Room

This guide provides step-by-step instructions to publish your AaireelXR world in Meta Horizon Worlds Editor.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ Meta Quest headset (Quest 2, Quest 3, or Quest Pro) OR Horizon Worlds desktop app
- ✅ Meta account with creator permissions
- ✅ Web client deployed to Vercel (HTTPS URL)
- ✅ Signaling server deployed to Railway
- ✅ All TypeScript scripts ready (in `horizon-scripts/` folder)
- ✅ NoesisUI XAML file ready
- ✅ Stable internet connection

---

## 🎯 Part 1: Create Your World (15 minutes)

### Step 1.1: Access Horizon Worlds

**On Quest Headset:**
1. Put on your Quest headset
2. Open the **Horizon Worlds** app from your library
3. Wait for the app to load

**On Desktop:**
1. Download and install **Meta Horizon Worlds Desktop App**
2. Launch the application
3. Sign in with your Meta account

### Step 1.2: Create New World

1. Navigate to the **Create** tab in the main menu
2. Click **"Create New World"**
3. Choose **"Blank World"** template (gives you full control)
4. Set the following properties:
   - **Name**: `AaireelXR - Family Hologram Room`
   - **Description**: `Experience immersive video presence with holographic avatars! Connect with family and friends through WebRTC video calls while expressing emotions with beautiful holographic effects.`
   - **Capacity**: 10-20 players (recommended: 12)
   - **Visibility**: Start as **Private** (change to Public after testing)
5. Click **"Create World"**

### Step 1.3: Enter Creator Mode

1. Your new world will load
2. Press the **Menu button** on your controller
3. Select **"Enter Creator Mode"**
4. You should now see the Creator Tools panel

---

## 🏗️ Part 2: Build the Environment (30 minutes)

### Step 2.1: Create the Room Structure

**Floor and Walls:**
1. Open **Object Panel** > **Shapes**
2. Add a **Plane** for the floor
   - Scale: 10m x 10m
   - Material: Futuristic tile or polished concrete
   - Color: Dark blue-gray (#2A2A3E)

3. Add **Cube** objects for walls (4 walls)
   - Height: 4m
   - Thickness: 0.2m
   - Material: Smooth, slightly reflective
   - Color: Light gray with blue tint

**Ceiling:**
4. Add another **Plane** for ceiling
   - Scale: 10m x 10m
   - Height: 4m above floor
   - Material: Dark with embedded lights

### Step 2.2: Add Lighting

1. Open **Object Panel** > **Lights**
2. Add **Point Lights** (4-6 lights):
   - Color: Soft blue (#4A9FFF)
   - Intensity: Medium
   - Position: Corners and above center
3. Add **Ambient Light**:
   - Color: Warm white
   - Intensity: Low (for atmosphere)

### Step 2.3: Use Environment Generation (GenAI Feature)

> [!IMPORTANT]
> This uses GenAI and counts toward competition requirements!

1. Open **Creator Tools** > **AI Tools** > **Environment Generation**
2. Enter prompt: `"Futuristic family living room with holographic displays, comfortable seating, and soft blue ambient lighting"`
3. Click **"Generate"**
4. Review the generated environment
5. Accept or regenerate until satisfied
6. This adds furniture, decorations, and atmosphere automatically

### Step 2.4: Add Seating

1. Open **Object Panel** > **Furniture**
2. Add **Chairs** or **Couches** (4-6 seats)
   - Arrange in a semi-circle facing the center
   - Modern, comfortable design
   - Color: Complement the blue theme

---

## 📺 Part 3: Add Web Surface for Video (10 minutes)

### Step 3.1: Place Web Surface

1. Open **Object Panel** > **Interactive** > **Web Surface**
2. Click to place in your world
3. Position at eye level (approximately 1.6m height)
4. Resize to **2m wide x 1.5m tall** (good viewing size)

### Step 3.2: Configure Web Surface

1. Select the Web Surface object
2. Open **Properties Panel**
3. Set the following:
   - **URL**: `https://your-app-xxxxx.vercel.app` (your deployed web client)
   - **Allow Interaction**: ✅ Enabled
   - **Visible to All**: ✅ Enabled
   - **Resolution**: High (1920x1080 recommended)
   - **Frame Rate**: 30 FPS

4. Test by clicking on it - you should see your web app load

### Step 3.3: Add Web Surface Frame

1. Add **Cube** objects to create a frame around the Web Surface
2. Make it look like a futuristic display screen
3. Add **Glow Effect** to the frame edges (blue color)

---

## 🎨 Part 4: Add NoesisUI Emotion Panel (15 minutes)

### Step 4.1: Create NoesisUI Panel

1. Open **Object Panel** > **UI** > **NoesisUI Panel**
2. Place the panel in your world
3. Position it to the **right side** of the Web Surface
4. Height: 1.5m (comfortable for mobile users)
5. Angle: Slightly tilted toward players

### Step 4.2: Import XAML Layout

1. Select the NoesisUI Panel
2. Open **UI Editor**
3. Click **"Import XAML"**
4. Copy the contents of `emotion-control-panel.xaml`
5. Paste into the editor
6. Click **"Apply"**

You should now see the 4 emotion buttons (Heart, Smile, Laugh, Sad)

### Step 4.3: Link Button Events

1. In the UI Editor, select the **Heart Button**
2. Click **"Add Event"** > **"On Click"**
3. Link to script function: `OnHeartButtonClick`
4. Repeat for other buttons:
   - Smile Button → `OnSmileButtonClick`
   - Laugh Button → `OnLaughButtonClick`
   - Sad Button → `OnSadButtonClick`

---

## 💻 Part 5: Import TypeScript Scripts (20 minutes)

### Step 5.1: Create Main Script Object

1. Open **Object Panel** > **Scripting** > **Script**
2. Create a new script named `HologramSystem`
3. Open the **Script Editor**

### Step 5.2: Import Hologram Avatar System

1. Open `hologram-avatar-system.ts` from your project
2. Copy the entire contents
3. Paste into the Horizon Script Editor
4. Click **"Save"**

### Step 5.3: Import UI Handlers

1. Create another script named `UIHandlers`
2. Copy contents of `noesis-ui-handlers.ts`
3. Paste and save

### Step 5.4: Import AI NPC Guide (GenAI)

1. Create script named `AINPCGuide`
2. Copy contents of `ai-npc-guide.ts`
3. Paste and save

### Step 5.5: Import Video Presence Integration

1. Create script named `VideoPresence`
2. Copy contents of `horizon-match-presence.ts`
3. Update the `WEB_SURFACE_URL` constant with your Vercel URL
4. Paste and save

### Step 5.6: Link Scripts to Objects

1. Select the **HologramSystem** script
2. Attach to a **World Controller** object (create an invisible cube as controller)
3. Link the **UIHandlers** script to the NoesisUI Panel
4. The scripts will auto-initialize on world start

---

## 🤖 Part 6: Add AI NPC Guide (15 minutes)

> [!IMPORTANT]
> This is CRITICAL for competition - GenAI requirement!

### Step 6.1: Create AI NPC

1. Open **Object Panel** > **Characters** > **AI NPC**
2. Click to spawn near the entrance
3. Name the NPC: `HologramGuide`

### Step 6.2: Configure NPC Appearance

1. Select the NPC
2. Open **Character Editor**
3. Choose appearance:
   - **Style**: Futuristic, friendly
   - **Outfit**: Tech-themed clothing
   - **Color scheme**: Blue and white (matches theme)
4. Set **Display Name**: `Holo`

### Step 6.3: Link AI Script

1. Select the NPC
2. Open **Properties**
3. **Attach Script**: Select `AINPCGuide`
4. The NPC will now use AI to interact with players

### Step 6.4: Test NPC

1. Exit Creator Mode
2. Approach the NPC
3. The NPC should greet you
4. Try interacting (click/tap on NPC)
5. Test the dialogue menu

---

## ✨ Part 7: Add Interactive Props (10 minutes)

### Step 7.1: Add Holographic Butterflies

1. Open **Object Panel** > **Effects** > **Particle System**
2. Create 3-5 particle systems
3. Configure each:
   - **Particle Shape**: Butterfly or sparkle
   - **Color**: Cyan/blue with transparency
   - **Movement**: Slow floating
   - **Emission**: Continuous, low rate

### Step 7.2: Add Bouncing Balls

1. Open **Object Panel** > **Shapes** > **Sphere**
2. Create 2-3 small spheres
3. Set properties:
   - **Scale**: 0.3m diameter
   - **Material**: Shiny, colorful
   - **Physics**: Enabled with bounce
4. Add **Grabbable** component so players can interact

### Step 7.3: Add Ambient Effects

1. Add **Glow Spheres** around the room (subtle accent lighting)
2. Add **Floating Particles** near ceiling (stars or sparkles)
3. Add **Sound Emitter** with ambient futuristic music (low volume)

---

## 🧪 Part 8: Testing (20 minutes)

### Step 8.1: Solo Testing

1. **Exit Creator Mode**
2. **Test Checklist**:
   - [ ] Walk around - is the environment complete?
   - [ ] Approach NPC - does it greet you?
   - [ ] Click Web Surface - does video app load?
   - [ ] Create a room in the video app
   - [ ] Click each emotion button
   - [ ] Verify hologram effects appear
   - [ ] Check that props are interactive
   - [ ] Test on mobile (if possible)

### Step 8.2: Multi-User Testing

**Invite a friend to test:**
1. Set world to **Unlisted** (not Public yet)
2. Invite a friend via Horizon
3. Both join the world
4. Test:
   - [ ] Both players see each other's holograms
   - [ ] Emotion effects sync between players
   - [ ] Both can join the same video room
   - [ ] NPC interacts with both players

### Step 8.3: Mobile Testing

1. Open Horizon Worlds on **mobile device** (Android/iOS)
2. Join your world
3. Test:
   - [ ] UI is readable and touchable
   - [ ] Emotion buttons are large enough
   - [ ] Video call works on mobile
   - [ ] Performance is smooth

---

## 🚀 Part 9: Publishing (10 minutes)

### Step 9.1: Final Polish

1. Enter Creator Mode one last time
2. Check for any issues:
   - Objects floating or misaligned
   - Missing textures
   - Script errors in console
3. Fix any problems

### Step 9.2: Set World Properties

1. Open **World Settings**
2. Configure:
   - **Name**: `AaireelXR - Family Hologram Room`
   - **Description**: 
     ```
     Experience immersive video presence with holographic avatars! 
     Connect with family and friends through WebRTC video calls 
     while expressing emotions with beautiful holographic effects. 
     
     Features:
     • Real-time video calls (Quest & Mobile)
     • Holographic emotion system
     • AI guide to help you get started
     • Interactive props and effects
     
     Perfect for 3+ players. Bring your family together!
     ```
   - **Tags**: Social, Video, Communication, Family, Tech, Innovative
   - **Category**: Social / Communication
   - **Recommended Players**: 3-8 players
   - **Visibility**: **Public** (for competition)
   - **Age Rating**: Everyone

### Step 9.3: Take Cover Photo

1. Position yourself for a good screenshot
2. Show the Web Surface, emotion panel, and NPC
3. Make sure lighting looks good
4. Take screenshot (use Quest capture or desktop screenshot)
5. Upload as **Cover Photo** in World Settings

### Step 9.4: Publish

1. Click **"Publish World"**
2. Review the publishing checklist
3. Confirm publication
4. **Copy the World URL** - you'll need this for Devpost!

---

## 📝 Part 10: Devpost Submission

### Step 10.1: Prepare Information

Gather the following:
- ✅ World name: `AaireelXR - Family Hologram Room`
- ✅ World URL (from Horizon)
- ✅ Your Meta Horizon username
- ✅ Team member usernames and roles
- ✅ Genre: **Open Genre** (Social/Communication)
- ✅ GenAI features used: **AI NPCs** (embodied)
- ✅ Recommended players: **3+ players**

### Step 10.2: Write Description (200-300 words)

Use this template:

```
AaireelXR - Family Hologram Room bridges the gap between virtual 
and physical presence, enabling families to connect through immersive 
video calls enhanced with holographic avatars and emotion expression.

INSPIRATION:
In today's world, families are often separated by distance. We wanted 
to create a space where people could feel truly present with loved ones, 
combining the intimacy of video calls with the magic of VR.

HOW WE BUILT IT:
We developed a WebRTC-powered video calling system embedded in Horizon 
via Web Surface, paired with a custom holographic avatar system. Each 
player gets a semi-transparent hologram with anti-gravity bobbing and 
rotation. The emotion system uses particle effects (hearts, sparkles, 
confetti) triggered by mobile-optimized NoesisUI buttons.

The AI NPC guide (using Meta's GenAI feature) welcomes players and 
explains the experience. We used Environment Generation AI to create 
the futuristic family room setting.

Technical stack: React + Vite (web client), Node.js + Socket.IO 
(signaling), TypeScript (Horizon scripts), NoesisUI (mobile controls).

FUTURE PLANS:
- Spatial audio for immersive conversations
- Screen sharing for family movie nights
- AR overlays for enhanced presence
- Recording and memory playback
- Multi-room support for larger gatherings

[Word count: ~180 words - expand as needed]
```

### Step 10.3: Create Demo Video

**Script outline (3 minutes):**
1. **Intro (15s)**: Show world entrance, NPC greeting
2. **Video Call Demo (60s)**: Create room, join from mobile, show video working
3. **Emotion System (45s)**: Click each emotion button, show effects
4. **Multi-User (30s)**: Show 2+ players interacting
5. **Mobile View (20s)**: Show experience on mobile device
6. **Outro (10s)**: Call to action

**Recording tips:**
- Use Quest's built-in recording
- Record mobile screen separately
- Edit together in simple video editor
- Add text overlays for clarity
- Upload to YouTube as **Unlisted** or **Public**

### Step 10.4: Submit on Devpost

1. Go to Devpost competition page
2. Click **"Join hackathon"** (if not already joined)
3. Click **"Start project"**
4. Fill in all required fields
5. Upload demo video link
6. Submit before deadline!

---

## ✅ Final Checklist

Before submission, verify:

- [ ] World is published and publicly accessible
- [ ] Web client is deployed and working (HTTPS)
- [ ] Signaling server is running
- [ ] All scripts are imported and working
- [ ] AI NPC is functional (GenAI requirement)
- [ ] NoesisUI emotion panel works on mobile
- [ ] Tested with multiple users
- [ ] Demo video is uploaded (includes mobile footage)
- [ ] Devpost submission is complete
- [ ] World URL is correct in submission

---

## 🆘 Troubleshooting

**Web Surface shows blank screen:**
- Verify URL is HTTPS (not HTTP)
- Check that web client is deployed
- Test URL in Quest browser first
- Check Web Surface "Allow Interaction" is enabled

**Emotion buttons don't work:**
- Verify button events are linked to functions
- Check script is attached to UI panel
- Look for errors in script console

**NPC doesn't respond:**
- Ensure NPC is named exactly "HologramGuide"
- Check AI script is attached
- Verify NPC has AI dialogue enabled

**Holograms don't appear:**
- Check HologramSystem script is running
- Look for errors in console
- Verify players are spawning correctly

**Video/audio doesn't work:**
- Grant camera/mic permissions in Quest browser
- Check signaling server is running
- Test on desktop browser first
- Verify TURN/STUN configuration

---

## 🎉 You're Done!

Your AaireelXR - Family Hologram Room is now live and ready for the competition!

**Share your world:**
- Post the World URL on social media
- Invite friends and family to test
- Gather feedback for improvements

**Good luck with the competition!** 🚀
