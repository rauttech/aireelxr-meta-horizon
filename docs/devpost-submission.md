# Devpost Submission Content - AaireelXR

## Project Title
**AaireelXR - Family Hologram Room**

---

## Tagline (50 characters max)
Holographic video presence for families in VR

---

## Inspiration

Families today are often separated by distance—whether across cities, countries, or continents. While video calls help bridge the gap, they lack the immersive, shared presence that makes you feel truly together. We wanted to create a space in Meta Horizon where families could not only see each other but feel present in the same virtual room, expressing emotions through beautiful holographic effects that transcend traditional video calling.

---

## What it does

AaireelXR - Family Hologram Room is an immersive social experience that combines:

**Real-Time Video Calling:**
- WebRTC-powered video calls embedded directly in Horizon Worlds via Web Surface
- Works seamlessly across Quest headsets, mobile devices, and desktop browsers
- Share a room code to connect with family members on any platform

**Holographic Emotion System:**
- Each player gets a semi-transparent holographic avatar with anti-gravity bobbing and rotation
- Express emotions through 4 interactive buttons: Heart ❤️, Smile 😊, Laugh 😂, Sad 😢
- Each emotion triggers unique particle effects:
  - Heart: Floating pink hearts swirling around your avatar
  - Smile: Golden sparkles bursting outward
  - Laugh: Colorful confetti explosion with dance animation
  - Sad: Gentle blue pulsing glow for comfort

**AI-Powered Guide:**
- "Holo" the AI NPC (using Meta's GenAI technology) greets new players
- Provides interactive help and answers questions about the experience
- Guides users through setup and features

**Multi-User Synchronization:**
- All emotions broadcast in real-time to every player in the room
- See family members' holographic expressions simultaneously
- Creates shared moments of joy, laughter, and connection

---

## How we built it

**Architecture:**

1. **Web Client (React + Vite + TypeScript)**
   - Responsive video calling interface optimized for Web Surface embedding
   - WebRTC peer-to-peer connections for low-latency video/audio
   - Mobile-first design with touch-optimized controls

2. **Signaling Server (Node.js + Socket.IO)**
   - WebSocket-based signaling for WebRTC offer/answer/ICE candidates
   - JWT authentication for secure room access
   - TURN/STUN server configuration for NAT traversal

3. **Horizon Scripts (TypeScript)**
   - `hologram-avatar-system.ts`: Manages holographic avatars, animations, and particle effects
   - `ai-npc-guide.ts`: AI-powered NPC with dialogue system and contextual responses
   - `horizon-match-presence.ts`: Integrates Web Surface with video calling
   - `noesis-ui-handlers.ts`: Connects mobile UI buttons to emotion system

4. **NoesisUI (XAML)**
   - Mobile-optimized emotion control panel
   - Large touch targets (60px+) for easy interaction
   - Vibrant color-coded buttons with emoji icons

5. **GenAI Integration:**
   - AI NPCs for interactive guidance and onboarding
   - Environment Generation for creating the futuristic family room atmosphere

**Deployment:**
- Web client deployed to Vercel (CDN-backed, global edge network)
- Signaling server deployed to Railway (auto-scaling, persistent WebSocket connections)
- All connections secured with HTTPS/WSS

---

## Challenges we ran into

**1. Cross-Platform Video Synchronization:**
Getting WebRTC to work reliably between Quest browsers, mobile devices, and desktops required careful TURN/STUN configuration and handling various network conditions.

**2. Mobile Performance Optimization:**
Particle effects needed to be optimized for mobile devices while maintaining visual quality. We implemented efficient particle pooling and limited emission rates based on device capabilities.

**3. Emotion Broadcasting:**
Synchronizing emotion effects across multiple users in real-time required implementing Horizon's World Broadcast API and managing state carefully to avoid race conditions.

**4. Web Surface Integration:**
Embedding a responsive web app in Horizon's Web Surface while maintaining interactivity and performance required specific viewport configurations and touch event handling.

**5. NoesisUI Event Binding:**
Connecting XAML UI elements to TypeScript functions required understanding Horizon's event system and ensuring proper script attachment to UI objects.

---

## Accomplishments that we're proud of

✨ **First-of-its-kind WebRTC integration** in Meta Horizon Worlds, enabling true cross-platform video presence

🎭 **Innovative emotion system** that makes feelings visible through synchronized holographic particle effects

🤖 **Seamless AI integration** with "Holo" providing natural, contextual guidance to new users

📱 **Mobile-first design** with NoesisUI ensuring the experience works beautifully on phones and tablets

👥 **Production-ready architecture** with deployed web services, secure authentication, and scalable infrastructure

🎨 **Polished visual experience** using AI Environment Generation to create an immersive, futuristic family room

---

## What we learned

**Technical Learnings:**
- WebRTC peer-to-peer networking and NAT traversal strategies
- Horizon Worlds scripting API and World Broadcast system
- NoesisUI XAML layout and event handling
- Particle system optimization for VR and mobile
- AI NPC dialogue system design and implementation

**Design Learnings:**
- Importance of large touch targets for mobile VR experiences
- Color psychology in emotion expression (warm vs cool colors)
- Balancing visual effects with performance constraints
- Creating intuitive onboarding with AI assistance

**Social Learnings:**
- How non-verbal communication (emotions) enhances video calls
- The power of shared presence in virtual spaces
- Importance of cross-platform accessibility for family connections

---

## What's next for AaireelXR - Family Hologram Room

**Short-term (Next 3 months):**
- **Spatial Audio**: Implement 3D positional audio so voices come from avatar locations
- **Custom Avatars**: Allow users to customize their holographic appearance
- **Emotion Combos**: Enable multiple emotions simultaneously for richer expression
- **Memory Snapshots**: Capture and save special moments with screenshot/recording features

**Medium-term (6-12 months):**
- **Screen Sharing**: Share photos, videos, or presentations for family movie nights
- **AR Overlays**: Add augmented reality elements visible on mobile devices
- **Multi-Room Support**: Create separate rooms for different family groups
- **Voice Commands**: Use voice to trigger emotions hands-free

**Long-term Vision:**
- **AI Memory Assistant**: AI that remembers family stories and helps create digital scrapbooks
- **Translation**: Real-time language translation for international families
- **Accessibility**: Sign language recognition and visual emotion indicators for hearing-impaired users
- **Integration**: Connect with other family apps (calendars, photo albums, messaging)

**Community Growth:**
- Host virtual family reunions and events
- Create templates for special occasions (birthdays, holidays)
- Build a community of families using AaireelXR worldwide

---

## Built With

- `react`
- `vite`
- `typescript`
- `webrtc`
- `socket.io`
- `node.js`
- `express`
- `meta-horizon-worlds`
- `noesis-ui`
- `meta-genai-npcs`
- `vercel`
- `railway`
- `jwt`

---

## Try it out

**World Name:** AaireelXR - Family Hologram Room  
**Platform:** Meta Horizon Worlds  
**Recommended Players:** 3-8  
**Devices:** Meta Quest (2, 3, Pro), Mobile (Android/iOS), Desktop

**How to Join:**
1. Open Meta Horizon Worlds
2. Search for "AaireelXR - Family Hologram Room"
3. Enter the world
4. Talk to Holo (the AI guide) for help getting started
5. Approach the Web Surface to start a video call
6. Use the emotion panel to express yourself!

---

## Team

**[Your Name]** - Project Lead, Full-Stack Development, Horizon Scripting  
**[Team Member 2]** - UI/UX Design, NoesisUI Development (if applicable)  
**[Team Member 3]** - 3D Environment Design, AI Integration (if applicable)

*Meta Horizon Username:* [Your username]

---

## Links

- **Demo Video:** [YouTube URL]
- **World URL:** [Horizon Worlds URL]
- **GitHub Repository:** https://github.com/rauttech/aireelxr-meta-horizon
- **Web Client:** [Vercel URL]

---

## Screenshots

[Upload 4-6 screenshots showing:]
1. World entrance with AI NPC Holo
2. Web Surface with active video call
3. Emotion panel with all 4 buttons
4. Holographic avatar with particle effects
5. Multi-user scene with multiple players
6. Mobile view of the experience

---

## Competition Category

**Genre:** Open Genre (Social/Communication Experience)

**GenAI Features Used:**
- ✅ AI NPCs (embodied) - "Holo" the interactive guide
- ✅ Environment Generation - AI-generated futuristic family room

**Recommended Players:** 3+ players

---

## Additional Notes

This project demonstrates the potential of Meta Horizon Worlds as a platform for meaningful family connections. By combining cutting-edge WebRTC technology with immersive VR environments and AI assistance, we've created an experience that brings families together in ways traditional video calling cannot.

The holographic emotion system adds a layer of expressiveness that makes digital interactions feel more human and connected. Whether celebrating together with confetti and laughter or offering comfort with gentle blue glows, AaireelXR helps families share authentic moments across any distance.

We're excited to continue developing this platform and building a community of families who stay connected through the magic of holographic presence.

---

**Total Word Count:** ~1,450 words (within Devpost limits)
