#!/bin/bash

# AaireelXR Automated Deployment Script
# This script automates the deployment of web client and signaling server

set -e  # Exit on error

echo "🚀 AaireelXR Automated Deployment"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "web-rtc-client" ] || [ ! -d "signaling-server" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "${BLUE}📋 Pre-deployment checklist:${NC}"
echo "  ✓ Git configured as 'raut tech'"
echo "  ✓ On dev branch"
echo ""

# Step 1: Build web client
echo "${BLUE}Step 1/4: Building web client...${NC}"
cd web-rtc-client
npm run build
echo "${GREEN}✅ Web client built successfully${NC}"
echo ""

# Step 2: Deploy web client to Vercel
echo "${BLUE}Step 2/4: Deploying web client to Vercel...${NC}"
echo "${YELLOW}Note: You may need to login to Vercel if this is your first deployment${NC}"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Deploy to Vercel
vercel --prod --yes

WEB_CLIENT_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*' | head -1)
echo "${GREEN}✅ Web client deployed${NC}"
echo "   URL: ${WEB_CLIENT_URL}"
echo ""

cd ..

# Step 3: Deploy signaling server
echo "${BLUE}Step 3/4: Preparing signaling server deployment...${NC}"
cd signaling-server

echo "${YELLOW}📝 Signaling server deployment options:${NC}"
echo "   1. Railway (Recommended for WebSocket support)"
echo "   2. Vercel (Serverless, may have WebSocket limitations)"
echo "   3. Manual deployment"
echo ""
echo "${YELLOW}For Railway deployment:${NC}"
echo "   1. Go to https://railway.app"
echo "   2. Create new project from GitHub"
echo "   3. Select 'rauttech/aireelxr-meta-horizon' repository"
echo "   4. Set root directory to 'signaling-server'"
echo "   5. Deploy and note the URL"
echo ""
echo "${YELLOW}For now, skipping signaling server auto-deployment${NC}"
echo "${YELLOW}Please deploy manually using Railway or your preferred platform${NC}"

cd ..

# Step 4: Update Horizon script with deployed URL
echo ""
echo "${BLUE}Step 4/4: Updating Horizon script configuration...${NC}"

if [ -n "$WEB_CLIENT_URL" ]; then
    # Update the WEB_SURFACE_URL in horizon script
    sed -i.bak "s|const WEB_SURFACE_URL = '.*';|const WEB_SURFACE_URL = '${WEB_CLIENT_URL}';|" \
        horizon-scripts/horizon-match-presence.ts
    
    echo "${GREEN}✅ Horizon script updated with deployment URL${NC}"
    rm horizon-scripts/horizon-match-presence.ts.bak 2>/dev/null || true
else
    echo "${YELLOW}⚠️  Could not auto-detect deployment URL${NC}"
    echo "${YELLOW}Please manually update WEB_SURFACE_URL in horizon-scripts/horizon-match-presence.ts${NC}"
fi

echo ""
echo "${GREEN}=================================="
echo "🎉 Deployment Complete!"
echo "==================================${NC}"
echo ""
echo "${BLUE}📝 Next Steps:${NC}"
echo ""
echo "1. ${YELLOW}Deploy Signaling Server:${NC}"
echo "   - Go to https://railway.app"
echo "   - Deploy from GitHub: rauttech/aireelxr-meta-horizon"
echo "   - Set root directory: signaling-server"
echo "   - Note the deployment URL"
echo ""
echo "2. ${YELLOW}Update Environment Variables:${NC}"
echo "   - In Vercel dashboard, set VITE_SIGNALING_URL to your Railway URL"
echo "   - Redeploy web client if needed"
echo ""
echo "3. ${YELLOW}Copy Horizon Script:${NC}"
echo "   - Open: horizon-scripts/horizon-match-presence.ts"
echo "   - Copy entire contents"
echo "   - Paste into Horizon Worlds Script Editor"
echo ""
echo "4. ${YELLOW}Create Horizon World:${NC}"
echo "   - Follow guide: docs/horizon-deployment-guide.md"
echo "   - Add Web Surface with URL: ${WEB_CLIENT_URL}"
echo "   - Attach the script"
echo "   - Test and publish!"
echo ""
echo "${BLUE}📚 Full Documentation:${NC}"
echo "   docs/horizon-deployment-guide.md"
echo ""
echo "${GREEN}Happy deploying! 🚀${NC}"
