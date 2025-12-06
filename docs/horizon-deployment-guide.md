# Horizon World Deployment Guide

## Overview

This guide will help you deploy the AaireelXR Video Presence application to your Horizon World. While Meta doesn't provide an API for automated deployment, this guide streamlines the process as much as possible.

## Prerequisites

- Meta Quest headset or Horizon Worlds desktop app
- Access to Horizon Worlds Creator Mode
- GitHub account (for web app deployment)
- Vercel or Netlify account (free tier works)

---

## Part 1: Deploy Web Application

### Option A: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Deploy from the web-rtc-client directory**:
```bash
cd /Users/deepakraut/.gemini/antigravity/scratch/aireelxr-meta-horizon/web-rtc-client
vercel
```

3. **Follow the prompts**:
   - Login to Vercel
   - Link to your GitHub account
   - Accept default settings
   - Note the deployment URL (e.g., `https://your-app.vercel.app`)

4. **Set environment variables** in Vercel dashboard:
   - `VITE_SIGNALING_URL` = Your signaling server URL

### Option B: Deploy to Netlify

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Build and deploy**:
```bash
cd /Users/deepakraut/.gemini/antigravity/scratch/aireelxr-meta-horizon/web-rtc-client
npm run build
netlify deploy --prod --dir=dist
```

3. **Note the deployment URL**

---

## Part 2: Deploy Signaling Server

### Deploy to Railway (Recommended for WebSocket support)

1. **Create account** at [railway.app](https://railway.app)

2. **Create new project** from GitHub repo:
   - Connect your GitHub account
   - Select `rauttech/aireelxr-meta-horizon` repository
   - Set root directory to `signaling-server`

3. **Configure environment variables**:
   - `PORT` = 3001
   - `NODE_ENV` = production
   - Add any TURN server credentials

4. **Note the deployment URL** (e.g., `https://your-app.railway.app`)

5. **Update web client** environment variable:
   - Go back to Vercel/Netlify
   - Set `VITE_SIGNALING_URL` to your Railway URL

---

## Part 3: Create Horizon World

### Step 1: Open Horizon Worlds

1. Put on your Meta Quest headset
2. Open **Horizon Worlds** app
3. Navigate to **Create** tab
4. Click **Create New World**

### Step 2: Set Up Your World

1. **Name your world**: "AaireelXR Video Lounge" (or your preference)
2. **Choose a template**: Start with "Blank World" for full control
3. **Set world capacity**: 8-20 players recommended
4. **Enable Creator Mode**: Toggle on in world settings

### Step 3: Add Basic Environment (Optional)

1. Use **Build Mode** to create a simple lounge area:
   - Add floor platform
   - Add seating (chairs/couches)
   - Add ambient lighting
   - Add decorative elements

2. **Create a designated video call area**:
   - Clear space for players to gather
   - Add visual indicator (glowing platform, sign, etc.)

---

## Part 4: Add Web Surface Panel

### Step 1: Create Web Surface Object

1. In **Creator Mode**, open the **Object Panel**
2. Search for **"Web Surface"** or **"Web Panel"**
3. Place the Web Surface in your world
4. **Resize** to appropriate size (recommended: 2m x 1.5m for group viewing)

### Step 2: Configure Web Surface

1. **Select the Web Surface** object
2. Open **Properties Panel**
3. Set **URL** to your deployed web app:
   ```
   https://your-app.vercel.app
   ```
4. **Enable interaction**: Make sure players can interact with it
5. **Set visibility**: Visible to all players

### Step 3: Position Web Surface

1. Place at comfortable viewing height (1.5m from floor)
2. Angle slightly downward for better viewing
3. Ensure enough space for multiple players to gather

---

## Part 5: Add Horizon Scripts

### Script 1: Video Presence Controller

1. In **Creator Mode**, create a new **Script** object
2. Name it: `VideoPresenceController`
3. **Copy and paste** the contents from:
   [`horizon-scripts/horizon-match-presence.ts`](file:///Users/deepakraut/.gemini/antigravity/scratch/aireelxr-meta-horizon/horizon-scripts/horizon-match-presence.ts)

4. **Update the configuration** at the top of the script:
   ```typescript
   const WEB_SURFACE_URL = 'https://your-app.vercel.app';
   ```

5. **Attach script** to a world object (e.g., a control panel or button)

### Script 2: UI Buttons (Optional)

Create interactive buttons for players:

1. **Create 3 button objects**:
   - "Start Video Call" button
   - "Join Call" button  
   - "Leave Call" button

2. **For each button**, add an **onClick event**:
   - Start Call: `onStartPresenceClick(player, WebSurfaceObject)`
   - Join Call: `onJoinRoomClick(player, WebSurfaceObject, roomId)`
   - Leave Call: `onLeavePresenceClick(player, WebSurfaceObject)`

3. **Link buttons to script functions**

---

## Part 6: Testing Your World

### Test Checklist

1. **Enter Play Mode** in your world
2. **Approach the Web Surface**
3. **Verify the web app loads** correctly
4. **Test creating a room**:
   - Click "Create New Room"
   - Verify room code appears
   - Click "Start Call"
5. **Test joining from another device**:
   - Open the web app on your phone/computer
   - Enter the room code
   - Verify connection works
6. **Test controls**:
   - Microphone toggle
   - Camera toggle
   - Chat functionality
   - Leave call

### Common Issues

**Web Surface shows blank/error**:
- Check if web app URL is correct
- Verify app is deployed and accessible
- Check browser console for errors

**Can't interact with Web Surface**:
- Ensure "Enable Interaction" is checked
- Verify you're close enough to the surface
- Check if surface is set to "Public" visibility

**Video/audio not working**:
- Quest browser requires HTTPS for camera/mic access
- Verify signaling server is running
- Check TURN server configuration

---

## Part 7: Publish Your World

### Make World Public

1. **Exit Play Mode**
2. Open **World Settings**
3. Set **Visibility** to "Public" or "Unlisted"
4. **Add description**: Explain the video presence feature
5. **Add cover image**: Screenshot of your world
6. **Set tags**: "Social", "Video", "Communication"
7. Click **Publish**

### Share Your World

1. **Get world link** from Horizon Worlds
2. **Share with friends** via:
   - Meta Quest app
   - Facebook/Instagram
   - Direct link

---

## Automation Scripts

### Quick Deploy Script

Save this as `deploy.sh` in your project root:

```bash
#!/bin/bash

echo "🚀 Deploying AaireelXR to production..."

# Deploy web client
echo "📱 Deploying web client..."
cd web-rtc-client
vercel --prod
cd ..

# Deploy signaling server (if using Vercel)
echo "🔌 Deploying signaling server..."
cd signaling-server
vercel --prod
cd ..

echo "✅ Deployment complete!"
echo "📝 Don't forget to update the WEB_SURFACE_URL in your Horizon script!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run it:
```bash
./deploy.sh
```

---

## Maintenance

### Updating Your World

1. **Make changes** to your code locally
2. **Test locally** with `npm run dev`
3. **Deploy updates**:
   ```bash
   ./deploy.sh
   ```
4. **No changes needed in Horizon** - Web Surface automatically loads latest version

### Monitoring

- **Vercel Dashboard**: Monitor web app performance
- **Railway Dashboard**: Monitor signaling server
- **Horizon Analytics**: Track world visits and engagement

---

## Advanced Features

### Custom Room URLs

You can create custom entry points in Horizon:

1. **Create multiple Web Surfaces** for different rooms
2. **Set different URLs** with pre-set room IDs:
   ```
   https://your-app.vercel.app?room=LOUNGE1
   https://your-app.vercel.app?room=MEETING2
   ```

### Integration with Horizon Events

1. **Use World Broadcast** to notify all players when someone starts a call
2. **Create visual indicators** (glowing objects) when calls are active
3. **Add sound effects** for call start/end

---

## Troubleshooting

### Issue: Web Surface not loading

**Solution**:
1. Verify URL is HTTPS (required for Quest)
2. Check if app is deployed and accessible
3. Try opening URL in Quest browser first
4. Clear Quest browser cache

### Issue: Camera/Microphone not working

**Solution**:
1. Grant permissions in Quest browser
2. Verify HTTPS is enabled
3. Check signaling server is running
4. Test on desktop browser first

### Issue: Poor video quality in VR

**Solution**:
1. Reduce video resolution in app settings
2. Ensure good WiFi connection
3. Limit number of participants
4. Use TURN server for better connectivity

---

## Support

For issues or questions:
- Check the [GitHub repository](https://github.com/rauttech/aireelxr-meta-horizon)
- Review Horizon Worlds [Creator Documentation](https://creator.oculus.com/horizon-worlds/)
- Test locally first before deploying to Horizon

---

## Summary

**Manual Steps Required**:
1. ✅ Deploy web app (5 minutes)
2. ✅ Deploy signaling server (5 minutes)  
3. ✅ Create Horizon World (10 minutes)
4. ✅ Add Web Surface (2 minutes)
5. ✅ Copy Horizon scripts (5 minutes)
6. ✅ Test and publish (10 minutes)

**Total Time**: ~40 minutes for first deployment

**Future Updates**: Just run `./deploy.sh` - no Horizon changes needed!
