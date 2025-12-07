[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rauttech/aireelxr-meta-horizon&project-name=aireelxr-video-presence&repository-name=aireelxr-meta-horizon&root-directory=web-rtc-client&framework=vite&build-command=npm%20run%20build&install-command=npm%20install&output-directory=dist)

# One-Click Deploy

## 🚀 Deploy to Vercel (Easiest Method)

**Just click the button above!** It will:
- ✅ Automatically import your GitHub repo
- ✅ Set root directory to `web-rtc-client`
- ✅ Configure Vite framework
- ✅ Set build commands
- ✅ Deploy immediately

### After clicking:
1. Log in to Vercel with GitHub
2. Authorize access
3. Click "Deploy"
4. Done! ✅

---

## 🔧 Alternative: Deploy via Vercel CLI

If you prefer command line (requires Node.js):

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project
cd c:\Users\Office\Documents\metaworld\aireelxr-meta-horizon

# Login to Vercel
vercel login

# Deploy web client
vercel --cwd web-rtc-client --prod

# Follow prompts:
# - Link to existing project? No
# - Project name: aireelxr-video-presence
# - Directory: web-rtc-client (auto-detected)
# - Build settings: Use defaults
```

---

## 📱 Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/rauttech/aireelxr-meta-horizon&plugins=postgresql&envs=JWT_SECRET,CORS_ORIGIN&JWT_SECRETDesc=Secret+key+for+JWT+tokens&CORS_ORIGINDesc=Allowed+CORS+origins)

**Click the Railway button above!** It will:
- ✅ Import your GitHub repo
- ✅ Set up signaling server
- ✅ Generate public URL
- ✅ Deploy automatically

---

## ⚡ What You Need to Do:

### For Vercel:
1. **Click the Vercel deploy button** at the top
2. **Log in** with your GitHub account
3. **Click "Deploy"**
4. **Copy the URL** you get

### For Railway:
1. **Click the Railway deploy button**
2. **Log in** with your GitHub account  
3. **Click "Deploy"**
4. **Generate domain** in settings
5. **Copy the URL** you get

### Then:
1. Add Railway URL to Vercel environment variables
2. Redeploy Vercel
3. Test the app!

---

**That's it!** The buttons do all the configuration automatically. You just need to click and log in! 🎉
