# Desktop-Only Guide: Git to Horizon Editor

## 🎯 Super Simple Steps - Desktop Only

This is a streamlined guide for importing your project from Git into Horizon Editor using **only your desktop computer**.

---

## ✅ What You Need

- ✅ Meta Horizon Worlds Desktop App installed
- ✅ Your project files at: `c:\Users\Office\Documents\metaworld\aireelxr-meta-horizon\`
- ✅ A world already created named "AaireelXR - Family Hologram Room"

---

## 📋 Step 1: Open Horizon Desktop Editor

1. Launch **Meta Horizon Worlds Desktop App**
2. Click **"My Worlds"**
3. Find **"AaireelXR - Family Hologram Room"**
4. Click **"Edit"** button
5. Wait for Creator Mode to load

---

## 📝 Step 2: Import Your 4 Scripts

You'll copy-paste 4 scripts from your Git folder into Horizon.

### **For Each Script, Do This:**

1. In Horizon Editor:
   - Click **"Objects"** panel (left side)
   - Click **"Scripting"** → **"Script"**
   - Click anywhere in world to place it

2. On your computer:
   - Open the `.ts` file in Notepad or VS Code
   - Select all (Ctrl+A)
   - Copy (Ctrl+C)

3. Back in Horizon:
   - Select the script object you just placed
   - Click **"Edit Script"** button
   - Delete any default code
   - Paste your code (Ctrl+V)
   - Click **"Save"**
   - Name the script (see table below)

### **Scripts to Import:**

| Script Name | File to Copy | Name in Horizon |
|------------|--------------|-----------------|
| Script 1 | `hologram-avatar-system.ts` | `HologramSystem` |
| Script 2 | `horizon-match-presence.ts` | `VideoPresence` |
| Script 3 | `noesis-ui-handlers.ts` | `UIHandlers` |
| Script 4 | `ai-npc-guide.ts` | `AINPCGuide` |

**File location:** `c:\Users\Office\Documents\metaworld\aireelxr-meta-horizon\horizon-scripts\`

✅ **Checkpoint:** You should now have 4 script objects in your world!

---

## 🏗️ Step 3: Build the World

### **A. Generate Environment with AI**

1. Click **"Create"** menu → **"AI Tools"** → **"Environment Generation"**
2. Paste this prompt:
   ```
   Futuristic family hologram room with soft blue ambient lighting, 
   comfortable modern seating arranged in a circle, holographic 
   displays, floating particle effects, and a cozy yet high-tech 
   atmosphere perfect for video calls
   ```
3. Click **"Generate"**
4. Wait, then click **"Accept"**

### **B. Add Web Surface (for video calls)**

1. **Objects** → **"Interactive"** → **"Web Surface"**
2. Place in center of room
3. Select it, then in properties:
   - **URL**: `https://aireelxr-meta-horizon-7hntn24zc-rauttechs-projects.vercel.app`
   - **Allow Interaction**: ✅ ON
   - **Visible to All**: ✅ ON
   - **Resolution**: 1920x1080
   - **Size**: Width 2m, Height 1.5m
   - **Position**: 1.6m height (eye level)

### **C. Add Emotion Panel (NoesisUI)**

1. **Objects** → **"UI"** → **"NoesisUI Panel"**
2. Place to the right of Web Surface
3. Select it, click **"UI Editor"** or **"Import XAML"**
4. Open file: `c:\Users\Office\Documents\metaworld\aireelxr-meta-horizon\horizon-scripts\noesis-ui-templates\emotion-control-panel.xaml`
5. Copy all content (Ctrl+A, Ctrl+C)
6. Paste into Horizon UI Editor
7. Click **"Apply"**
8. **Link buttons to script:**
   - Select **Heart Button** → Event: `Click` → Function: `OnHeartButtonClick` → Script: `UIHandlers`
   - Select **Smile Button** → Event: `Click` → Function: `OnSmileButtonClick` → Script: `UIHandlers`
   - Select **Laugh Button** → Event: `Click` → Function: `OnLaughButtonClick` → Script: `UIHandlers`
   - Select **Sad Button** → Event: `Click` → Function: `OnSadButtonClick` → Script: `UIHandlers`
9. Select the NoesisUI Panel object → In properties, attach `UIHandlers` script

### **D. Add AI NPC "Holo"**

1. **Objects** → **"Characters"** → **"AI NPC"**
2. Place near entrance
3. Select it, open **"Character Editor"**:
   - Style: Futuristic, friendly
   - Outfit: Tech-themed (blue/white)
   - **Display Name**: `Holo`
4. In NPC Properties:
   - Enable **"AI Dialogue"**: ✅ ON
   - Enable **"Interaction"**: ✅ ON
   - **Attach Script**: `AINPCGuide`

---

## 🧪 Step 4: Test Your World

1. Click **"Exit Creator Mode"**
2. Test these things:
   - [ ] Walk to NPC "Holo" - does it greet you?
   - [ ] Click Web Surface - does video app load?
   - [ ] Click "Create Room" - does room code appear?
   - [ ] Click emotion buttons - do effects appear?

---

## 📢 Step 5: Publish

1. Enter Creator Mode again
2. Click **"World Settings"**
3. Fill in:
   - **Name**: `AaireelXR - Family Hologram Room`
   - **Description**: 
     ```
     Experience immersive video presence with holographic avatars! 
     Connect with family and friends through WebRTC video calls 
     while expressing emotions with beautiful holographic effects.
     
     Features:
     • Real-time video calls (Quest & Mobile)
     • Holographic emotion system (Heart, Smile, Laugh, Sad)
     • AI guide "Holo" to help you get started
     
     Perfect for 3+ players. Bring your family together!
     ```
   - **Visibility**: Public
   - **Capacity**: 10-12 players
   - **Category**: Social / Communication
   - **Tags**: `Social, Video, Communication, Family, Tech, AI`
4. Take a screenshot for cover photo
5. Click **"Publish World"**
6. **Copy the World URL** (you need this for Devpost!)

---

## ✅ Done!

Your world is now live! 🎉

**Next:** Record a demo video and submit to Devpost (see `docs/devpost-submission.md`)

---

## 🆘 Quick Troubleshooting

| Problem | Fix |
|---------|-----|
| Web Surface is blank | Check Vercel URL is correct and deployment is live |
| Emotion buttons don't work | Verify events are linked to UIHandlers script |
| NPC doesn't respond | Ensure named "Holo" and AINPCGuide script is attached |
| Video doesn't connect | Grant camera/mic permissions, check Railway server |

---

## ⏱️ Time: ~2 hours total

- Import scripts: 30 min
- Build environment: 30 min
- Add NPC: 15 min
- Testing: 30 min
- Publish: 15 min
