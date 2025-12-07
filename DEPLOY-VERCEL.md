# Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Easiest)

Click this button to deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rauttech/aireelxr-meta-horizon&project-name=aireelxr-video-presence&root-directory=web-rtc-client)

### Option 2: Manual Import

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select: `rauttech/aireelxr-meta-horizon`
4. **Important Settings:**
   - Root Directory: `web-rtc-client`
   - Framework: Vite (auto-detected)
   - Build Command: `tsc && vite build`
   - Output Directory: `dist`
5. Click "Deploy"

### Option 3: Vercel CLI (Terminal)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd c:\Users\Office\Documents\metaworld\aireelxr-meta-horizon

# Deploy
vercel --cwd web-rtc-client
```

## After Deployment

1. **Copy your Vercel URL** (e.g., `https://aireelxr-xxxxx.vercel.app`)
2. **Add Environment Variable:**
   - Go to Project Settings > Environment Variables
   - Add: `VITE_SIGNALING_URL` = (Railway URL - add after deploying signaling server)
3. **Redeploy** if you added environment variables

## Troubleshooting

**Build fails?**
- Check that Root Directory is set to `web-rtc-client`
- Verify Framework is "Vite"

**Can't find package.json?**
- Make sure Root Directory is exactly: `web-rtc-client` (no slashes)

**Need help?**
- Check Vercel logs in the Deployments tab
- Ensure you're deploying the `dev5` branch
