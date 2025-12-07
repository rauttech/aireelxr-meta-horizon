# Railway Deployment - Step-by-Step Guide

## 🎯 Goal
Deploy the AaireelXR signaling server to Railway from the `main` branch.

---

## 📋 Prerequisites

- ✅ GitHub repository: `rauttech/aireelxr-meta-horizon`
- ✅ Main branch updated with all code
- ✅ Railway account (free) - [Sign up here](https://railway.app)

---

## 🚀 Deployment Steps

### Step 1: Connect Railway to GitHub

1. Go to [railway.app](https://railway.app)
2. Click **"Login"** or **"Start a New Project"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your GitHub account

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select **`rauttech/aireelxr-meta-horizon`**
4. Railway will start analyzing your repository

### Step 3: Configure Service

**IMPORTANT: Railway needs to know which folder to deploy**

1. After selecting the repo, Railway will show detected services
2. Click **"Add variables"** or **"Configure"**
3. Set these settings:

```
Service Name: signaling-server
Root Directory: signaling-server
Start Command: npm start
Build Command: npm install && npm run build
```

### Step 4: Set Root Directory

1. Go to **Settings** tab
2. Find **"Root Directory"** section
3. Set to: `signaling-server`
4. Click **"Save"**

### Step 5: Configure Build Settings

1. In Settings, find **"Build"** section
2. Set:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
3. Click **"Save"**

### Step 6: Add Environment Variables (Optional)

1. Go to **Variables** tab
2. Add these if needed:
   - `PORT`: `3001` (Railway auto-assigns, but you can set)
   - `JWT_SECRET`: `your-secure-secret-key-here`
   - `CORS_ORIGIN`: `*` (or your Vercel URL for security)

### Step 7: Deploy

1. Railway will automatically deploy
2. Wait 3-5 minutes for deployment
3. Check **"Deployments"** tab for status

### Step 8: Generate Public URL

1. Go to **Settings** tab
2. Find **"Networking"** section
3. Click **"Generate Domain"**
4. Railway will create a public URL like:
   ```
   https://aireelxr-production.up.railway.app
   ```

**SAVE THIS URL!** You need it for Vercel environment variables.

---

## ⚙️ Update Vercel with Railway URL

### Add Signaling Server URL to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **aireelxr-video-presence** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_SIGNALING_URL`
   - **Value**: `https://your-railway-url.railway.app`
   - **Environments**: Check all (Production, Preview, Development)
5. Click **"Save"**

### Redeploy Vercel

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## ✅ Verify Deployment

### Test Signaling Server

1. Open your Railway URL in browser:
   ```
   https://your-railway-url.railway.app/health
   ```

2. You should see:
   ```json
   {
     "status": "ok",
     "timestamp": "2025-12-07T10:00:00.000Z"
   }
   ```

### Test Full Application

1. Open your Vercel URL
2. Click **"Create New Room"**
3. Open the same URL in another browser/device
4. Enter the room code
5. Both should connect via video/audio! 🎉

---

## 🐛 Troubleshooting

### "Application failed to respond" error
- Check that Root Directory is `signaling-server`
- Verify Start Command is `npm start`
- Check deployment logs for errors

### Build fails
- Check build logs in Railway dashboard
- Ensure `package.json` has all dependencies
- Verify TypeScript compiles: `npm run build`

### Can't connect to signaling server
- Verify the public domain is generated
- Check CORS settings allow your Vercel domain
- Test `/health` endpoint

---

## 📝 Quick Reference

**Your Railway Project:**
- Service Name: `signaling-server`
- Repository: `rauttech/aireelxr-meta-horizon`
- Branch: `main`
- Root Directory: `signaling-server`
- Public URL: `https://aireelxr-production.up.railway.app`

**Important URLs:**
- Railway Dashboard: https://railway.app/dashboard
- Your Signaling Server: `https://your-url.railway.app`
- Health Check: `https://your-url.railway.app/health`

---

## 🔄 Updating Your Deployment

Railway auto-deploys on every push to `main`:

```bash
# Make changes to signaling server
git add .
git commit -m "Update signaling server"
git push origin main

# Railway automatically redeploys!
```

---

## 💰 Railway Free Tier

**Free tier includes:**
- $5 of usage per month
- Enough for development and testing
- Auto-sleeps after inactivity (wakes on request)

**For production:**
- Consider upgrading to paid plan
- Keeps server always running
- Better performance

---

## 📊 Next Steps

After Railway deployment:

1. ✅ **Copy Railway URL**
2. ✅ **Add to Vercel** environment variables
3. ✅ **Redeploy Vercel** app
4. ✅ **Test** video calling end-to-end
5. ✅ **Update Horizon script** with Vercel URL
6. ✅ **Import** into Horizon Editor

---

## 🆘 Need Help?

- Railway Docs: https://docs.railway.app
- Support: https://railway.app/help
- Check deployment logs in Railway dashboard

---

**Ready to deploy? Go to [railway.app/new](https://railway.app/new) and follow the steps above!** 🚀
