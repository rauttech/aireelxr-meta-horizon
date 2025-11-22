# Local Development Setup (macOS)

This guide provides step-by-step instructions for setting up the AaireelXR — Horizon Video Presence project on macOS.

## Prerequisites

### Required Software

1. **Homebrew** (package manager)
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Node.js 18+ (LTS)**
   ```bash
   brew install node@18
   ```

3. **Git**
   ```bash
   brew install git
   ```

4. **Docker** (optional, for containerized deployment)
   ```bash
   brew install --cask docker
   ```

5. **ngrok** (for HTTPS tunneling during development)
   ```bash
   brew install ngrok
   ```

6. **mkcert** (for local HTTPS certificates)
   ```bash
   brew install mkcert
   mkcert -install
   ```

## SSH Key Setup

1. **Generate SSH key**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add to SSH agent**
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. **Copy public key**
   ```bash
   pbcopy < ~/.ssh/id_ed25519.pub
   ```

4. **Add to GitHub**
   - Go to GitHub.com → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your key and save

## Project Setup

### 1. Clone Repository

```bash
git clone git@github.com:rauttech/aireelxr-meta-horizon.git
cd aireelxr-meta-horizon
```

### 2. Install Dependencies

**Web Client:**
```bash
cd web-rtc-client
npm install
cd ..
```

**Signaling Server:**
```bash
cd signaling-server
npm install
cd ..
```

**Backend (optional):**
```bash
cd backend
npm install
cd ..
```

### 3. Configure Environment Variables

**Web Client** (`web-rtc-client/.env.local`):
```env
VITE_SIGNALING_URL=http://localhost:3001
```

**Signaling Server** (`signaling-server/.env`):
```env
PORT=3001
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=dev-secret-key-do-not-use-in-production
```

## Running Locally

### Start Signaling Server

```bash
cd signaling-server
npm run dev
```

Server will start on http://localhost:3001

### Start Web Client

```bash
cd web-rtc-client
npm run dev
```

Client will start on http://localhost:5173

### Access the Application

Open your browser and navigate to:
- **Web Client**: http://localhost:5173
- **Signaling Server Health**: http://localhost:3001/health

## HTTPS Setup for Horizon Testing

Horizon Web Surface requires HTTPS. Use one of these methods:

### Option 1: ngrok (Recommended for Testing)

1. **Sign up** at https://ngrok.com and get your authtoken

2. **Configure ngrok**
   ```bash
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```

3. **Start ngrok tunnel**
   ```bash
   ngrok http 5173
   ```

4. **Use the HTTPS URL** provided by ngrok in your Horizon Web Surface

### Option 2: mkcert (Local Development)

1. **Create local certificate**
   ```bash
   cd web-rtc-client
   mkcert localhost 127.0.0.1 ::1
   ```

2. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     server: {
       https: {
         key: fs.readFileSync('./localhost-key.pem'),
         cert: fs.readFileSync('./localhost.pem'),
       },
     },
   })
   ```

3. **Restart dev server**

## Running Tests

### Web Client Tests

```bash
cd web-rtc-client

# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

### Signaling Server Tests

```bash
cd signaling-server
npm test
```

## Troubleshooting

### Port Already in Use

If port 3001 or 5173 is already in use:

```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Camera/Microphone Access

Ensure your browser has permission to access camera and microphone:
- Chrome: Settings → Privacy and security → Site Settings → Camera/Microphone
- Safari: Preferences → Websites → Camera/Microphone

### CORS Errors

Ensure `CORS_ORIGIN` in signaling server `.env` matches your web client URL.

### WebRTC Connection Issues

1. Check browser console for errors
2. Verify STUN/TURN server configuration
3. Test with both browsers on same machine first
4. Check firewall settings

## Next Steps

- See [production-deploy.md](production-deploy.md) for deployment instructions
- See [horizon-import-guide.md](horizon-import-guide.md) for Horizon integration
- See [architecture.md](architecture.md) for system architecture details

## Development Tips

### Hot Reload

Both web client and signaling server support hot reload. Changes will automatically refresh.

### Debugging

**Web Client:**
- Open browser DevTools (F12)
- Check Console for logs
- Use Network tab to inspect WebSocket connections

**Signaling Server:**
- Logs appear in terminal
- Use `console.log` for debugging
- Check Socket.IO connection events

### Code Quality

```bash
# Lint web client
cd web-rtc-client
npm run lint

# Format code (if configured)
npm run format
```

## Support

For issues or questions, refer to:
- [Architecture Documentation](architecture.md)
- [GitHub Issues](https://github.com/rauttech/aireelxr-meta-horizon/issues)
- Project README
