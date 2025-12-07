# Connect Vercel and Railway - Quick Guide

## ✅ Your URLs:
- **Vercel (Web Client)**: `https://aireelxr-meta-horizon-7hntn24zc-rauttechs-projects.vercel.app`
- **Railway (Signaling Server)**: `https://aireelxr-meta-horizon-production.up.railway.app`

---

## 🔧 Step 1: Add Railway URL to Vercel

### Go to Vercel Dashboard:
1. Open: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your **aireelxr-meta-horizon** project
3. Go to **Settings** → **Environment Variables**

### Add New Variable:
Click **"Add New"** and enter:

```
Name: VITE_SIGNALING_URL
Value: https://aireelxr-meta-horizon-production.up.railway.app
```

**Important:** Check ALL environment boxes:
- ✅ Production
- ✅ Preview  
- ✅ Development

Click **"Save"**

### Redeploy Vercel:
1. Go to **"Deployments"** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes for redeployment

---

## ✅ Step 2: Test Your Application

After Vercel redeploys, test it:

1. **Open your Vercel URL** in browser:
   ```
   https://aireelxr-meta-horizon-7hntn24zc-rauttechs-projects.vercel.app
   ```

2. **Create a room** - Click "Create New Room"
3. **Copy the room code**
4. **Open in another browser/device** - Enter the room code
5. **Both should connect via video!** 🎉

---

## 🎯 Step 3: Update Horizon Script

Now update the Horizon script with your Vercel URL so it works in Horizon Worlds:

The file `horizon-scripts/horizon-match-presence.ts` needs to be updated with:
```typescript
const WEB_SURFACE_URL = 'https://aireelxr-meta-horizon-7hntn24zc-rauttechs-projects.vercel.app';
```

I'll update this file for you now!

---

## 📋 Next Steps After This:

1. ✅ Add Railway URL to Vercel (you'll do this)
2. ✅ Redeploy Vercel
3. ✅ Test video calling works
4. ✅ Import scripts into Horizon Editor
5. ✅ Publish your world
6. ✅ Submit to competition

---

**Go ahead and add the environment variable to Vercel now!** Let me know when Vercel finishes redeploying and I'll help you test it! 🚀
