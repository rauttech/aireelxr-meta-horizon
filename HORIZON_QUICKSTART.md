# Horizon World Setup - Quick Start

## 🎯 Goal
Get your AaireelXR Video Presence running in Horizon Worlds in ~40 minutes.

## 📋 Prerequisites Checklist

- [ ] Meta Quest headset OR Horizon Worlds desktop app
- [ ] Vercel account (free) - [Sign up](https://vercel.com/signup)
- [ ] Railway account (free) - [Sign up](https://railway.app)
- [ ] GitHub connected to both platforms

---

## 🚀 Automated Deployment (Steps 1-2)

### Step 1: Deploy Web Application

Run the automated deployment script:

```bash
cd /Users/deepakraut/.gemini/antigravity/scratch/aireelxr-meta-horizon
./deploy.sh
```

This script will:
- ✅ Build the web client
- ✅ Deploy to Vercel
- ✅ Update Horizon script with the URL
- ℹ️ Guide you through signaling server setup

**Expected output**: 
```
🎉 Deployment Complete!
Web Client URL: https://your-app-xxxxx.vercel.app
```

**⚠️ Save this URL** - you'll need it for Horizon!

---

### Step 2: Deploy Signaling Server

1. **Go to** [railway.app](https://railway.app)
2. **Click** "New Project" → "Deploy from GitHub repo"
3. **Select** `rauttech/aireelxr-meta-horizon`
4. **Configure**:
   - Root Directory: `signaling-server`
   - Start Command: `npm start`
5. **Deploy** and wait ~2 minutes
6. **Copy the deployment URL** (e.g., `https://your-app.railway.app`)

7. **Update Vercel environment**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project
   - Settings → Environment Variables
   - Add: `VITE_SIGNALING_URL` = `https://your-app.railway.app`
   - Redeploy

---

## 🌍 Manual Horizon World Setup (Steps 3-6)

### Step 3: Create Your World (5 minutes)

1. **Put on Quest headset** or open Horizon desktop app
2. **Open Horizon Worlds**
3. **Navigate to** Create tab
4. **Click** "Create New World"
5. **Name it**: "AaireelXR Video Lounge"
6. **Choose**: Blank World template
7. **Set capacity**: 10-20 players
8. **Enable** Creator Mode

---

### Step 4: Add Web Surface (2 minutes)

1. **Enter Creator Mode** (press menu button)
2. **Open Object Panel**
3. **Search** for "Web Surface"
4. **Place** in your world
5. **Resize** to ~2m x 1.5m
6. **Select** the Web Surface
7. **Open Properties**
8. **Set URL** to your Vercel URL:
   ```
   https://your-app-xxxxx.vercel.app
   ```
9. **Enable** "Allow Interaction"
10. **Set** "Visible to All"

---

### Step 5: Add Control Script (5 minutes)

#### Option A: Simple Setup (Recommended)

Just use the Web Surface - players interact directly with it!

1. **Position** Web Surface at eye level (1.5m height)
2. **Angle** slightly downward
3. **Done!** Players can click on it to use the app

#### Option B: Advanced Setup (with buttons)

1. **In Creator Mode**, create a **Script** object
2. **Name it**: `VideoPresenceController`
3. **Open** the script editor
4. **Copy contents** from:
   ```
   /Users/deepakraut/.gemini/antigravity/scratch/aireelxr-meta-horizon/horizon-scripts/horizon-match-presence.ts
   ```
5. **Paste** into Horizon script editor
6. **Verify** the `WEB_SURFACE_URL` matches your Vercel URL
7. **Save** the script

8. **Create 3 buttons**:
   - "Start Call" button
   - "Join Call" button
   - "Leave Call" button

9. **Link each button** to script functions (see full guide)

---

### Step 6: Test & Publish (10 minutes)

#### Testing

1. **Enter Play Mode**
2. **Walk to Web Surface**
3. **Click** on it
4. **Verify** app loads
5. **Test** creating a room
6. **Test** from another device (phone/computer)
7. **Verify** video/audio works

#### Publishing

1. **Exit Play Mode**
2. **Open World Settings**
3. **Set Visibility**: Public or Unlisted
4. **Add Description**:
   ```
   Experience immersive video presence! Connect with friends through 
   WebRTC video calls in VR. Create or join rooms to start chatting.
   ```
5. **Add Tags**: Social, Video, Communication, Tech
6. **Take Cover Photo**: Screenshot of your world
7. **Click Publish**

---

## 🎉 You're Done!

Your Horizon World is now live with video presence!

### Share Your World

1. **Get world link** from Horizon
2. **Share** with friends
3. **Invite** people to test

### Test It Out

1. **Enter your world**
2. **Approach the Web Surface**
3. **Click "Create New Room"**
4. **Share the room code** with a friend
5. **Have them join** from their Quest or phone
6. **Start chatting!**

---

## 🐛 Quick Troubleshooting

**Web Surface is blank**:
- Check if URL is correct (must be HTTPS)
- Verify app is deployed on Vercel
- Try opening URL in Quest browser first

**Can't interact with Web Surface**:
- Ensure "Allow Interaction" is enabled
- Get closer to the surface
- Check visibility settings

**No video/audio**:
- Grant camera/mic permissions in Quest browser
- Verify signaling server is running on Railway
- Test on desktop browser first

---

## 📚 Full Documentation

For detailed information, see:
- [Horizon Deployment Guide](file:///Users/deepakraut/.gemini/antigravity/scratch/aireelxr-meta-horizon/docs/horizon-deployment-guide.md)
- [Horizon Scripts](file:///Users/deepakraut/.gemini/antigravity/scratch/aireelxr-meta-horizon/horizon-scripts/)
- [Project README](file:///Users/deepakraut/.gemini/antigravity/scratch/aireelxr-meta-horizon/README.md)

---

## ⏱️ Time Estimate

- **Automated deployment**: 10 minutes
- **Horizon World creation**: 5 minutes  
- **Web Surface setup**: 2 minutes
- **Script setup** (optional): 5 minutes
- **Testing & publishing**: 10 minutes

**Total**: ~30-40 minutes

---

## 🆘 Need Help?

1. Check the full deployment guide
2. Review Horizon Worlds creator docs
3. Test locally first (`npm run dev`)
4. Verify all URLs are HTTPS

**Ready to deploy? Run `./deploy.sh` to get started!** 🚀
