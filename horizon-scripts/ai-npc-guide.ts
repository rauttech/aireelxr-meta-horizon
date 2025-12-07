/**
 * AI-Powered NPC Guide for Family Hologram Room
 * Uses Meta Horizon's GenAI NPC Feature
 * 
 * CRITICAL: This satisfies the MANDATORY GenAI requirement for competition
 * 
 * SETUP:
 * 1. In Horizon Editor, go to Create > Characters > AI NPC
 * 2. Create an NPC named "HologramGuide"
 * 3. Attach this script to the NPC
 * 4. Configure NPC appearance (friendly, futuristic look)
 * 5. Position near the entrance of your world
 */

import { Player, NPC } from 'horizon/core';
import { World } from 'horizon/world';

// ============================================================================
// NPC CONFIGURATION
// ============================================================================

const NPC_CONFIG = {
    name: 'Holo',
    greeting: 'Welcome to the AaireelXR Family Hologram Room!',
    personality: 'friendly, helpful, enthusiastic about technology',
    voiceStyle: 'warm and welcoming',
};

const DIALOGUE_RESPONSES = {
    greeting: [
        "Hi there! I'm Holo, your holographic guide. Ready to connect with loved ones?",
        "Welcome! I'll help you get started with our amazing video presence system.",
        "Hello friend! Let me show you how to create magical holographic moments!",
    ],

    howToUse: [
        "It's easy! First, approach the glowing Web Surface screen to start a video call. Then, use the emotion panel to express yourself with holograms!",
        "Just three steps: 1) Walk to the video screen, 2) Create or join a room, 3) Share emotions with the colorful buttons!",
    ],

    emotions: [
        "The emotion buttons let you express feelings! Heart for love, Smile for happiness, Laugh for joy, and Sad for comfort. Try them!",
        "Each emotion creates beautiful holographic effects around your avatar. It's like magic! Tap any button to see.",
    ],

    videoCall: [
        "The Web Surface screen lets you video call anyone, even from their phone! Share the room code with family and friends.",
        "You can connect with people on Quest, mobile, or desktop. Everyone sees your hologram and emotions in real-time!",
    ],

    help: [
        "Need help? Here's what you can do: Start a video call at the screen, express emotions with the panel, or explore the interactive props around the room!",
        "I'm here to help! Ask me about video calls, emotions, or just say hi. You can also explore on your own!",
    ],
};

// ============================================================================
// AI NPC GUIDE CLASS
// ============================================================================

class HologramGuideNPC {
    private npc: NPC;
    private greetedPlayers: Set<string> = new Set();

    constructor(npcEntity: NPC) {
        this.npc = npcEntity;
        this.initialize();
    }

    /**
     * Initialize the NPC with AI capabilities
     */
    private initialize(): void {
        // Configure NPC appearance
        this.npc.setName(NPC_CONFIG.name);
        this.npc.setPersonality(NPC_CONFIG.personality);

        // Enable AI dialogue system (GenAI feature)
        this.npc.enableAIDialogue({
            contextKnowledge: [
                "This is the AaireelXR Family Hologram Room",
                "Players can make video calls using the Web Surface screen",
                "The emotion panel has Heart, Smile, Laugh, and Sad buttons",
                "Each emotion creates unique holographic particle effects",
                "Multiple players can join and see each other's holograms",
                "The system works on Quest headsets and mobile devices",
            ],
            responseStyle: NPC_CONFIG.voiceStyle,
            allowFreeformQuestions: true,
        });

        // Setup interaction triggers
        this.setupInteractions();

        // Idle animations
        this.startIdleAnimations();

        console.log('[NPC] Hologram Guide initialized with AI');
    }

    /**
     * Setup player interaction events
     */
    private setupInteractions(): void {
        // Greet players when they approach
        this.npc.onPlayerEnterProximity(5.0, (player: Player) => {
            this.greetPlayer(player);
        });

        // Handle player interactions
        this.npc.onPlayerInteract((player: Player) => {
            this.startConversation(player);
        });

        // Listen for specific questions
        this.npc.onPlayerSpeech((player: Player, speech: string) => {
            this.handlePlayerQuestion(player, speech);
        });
    }

    /**
     * Greet player when they enter proximity
     */
    private greetPlayer(player: Player): void {
        // Only greet each player once
        if (this.greetedPlayers.has(player.id)) return;

        this.greetedPlayers.add(player.id);

        // Random greeting
        const greeting = this.getRandomResponse('greeting');

        // NPC looks at player
        this.npc.lookAt(player.getPosition());

        // Wave animation
        this.npc.playAnimation('wave', { loop: false });

        // Speak greeting
        this.npc.speak(greeting, {
            displayText: true,
            duration: 5000,
        });

        // Show helpful hint after greeting
        World.setTimeout(() => {
            this.npc.speak("Tap on me if you need help getting started!", {
                displayText: true,
                duration: 3000,
            });
        }, 5500);
    }

    /**
     * Start a conversation with the player
     */
    private startConversation(player: Player): void {
        // Show conversation menu
        player.showDialogueMenu({
            title: `${NPC_CONFIG.name} - Your Hologram Guide`,
            options: [
                { id: 'howToUse', text: 'How do I use this?' },
                { id: 'emotions', text: 'What are the emotion buttons?' },
                { id: 'videoCall', text: 'How do video calls work?' },
                { id: 'help', text: 'I need help!' },
                { id: 'bye', text: 'Thanks, bye!' },
            ],
            onSelect: (optionId: string) => {
                this.handleDialogueChoice(player, optionId);
            },
        });
    }

    /**
     * Handle player's dialogue choice
     */
    private handleDialogueChoice(player: Player, choice: string): void {
        if (choice === 'bye') {
            this.npc.speak("Have fun! Come back if you need anything!", {
                displayText: true,
                duration: 3000,
            });
            this.npc.playAnimation('wave', { loop: false });
            return;
        }

        // Get response for the chosen topic
        const response = this.getRandomResponse(choice);

        // NPC responds
        this.npc.speak(response, {
            displayText: true,
            duration: 6000,
        });

        // Appropriate animation based on topic
        const animations = {
            howToUse: 'explain',
            emotions: 'excited',
            videoCall: 'point',
            help: 'nod',
        };

        this.npc.playAnimation(animations[choice] || 'idle', { loop: false });

        // Offer to continue conversation
        World.setTimeout(() => {
            player.showNotification("Tap Holo again for more help!");
        }, 6500);
    }

    /**
     * Handle free-form player questions using AI
     */
    private handlePlayerQuestion(player: Player, question: string): void {
        // Use AI to generate contextual response
        this.npc.generateAIResponse(question, (response: string) => {
            this.npc.speak(response, {
                displayText: true,
                duration: 5000,
            });
        });
    }

    /**
     * Get random response from category
     */
    private getRandomResponse(category: string): string {
        const responses = DIALOGUE_RESPONSES[category];
        if (!responses || responses.length === 0) {
            return "I'm here to help! What would you like to know?";
        }
        return responses[Math.floor(Math.random() * responses.length)];
    }

    /**
     * Idle animations to make NPC feel alive
     */
    private startIdleAnimations(): void {
        const playRandomIdle = () => {
            const idleAnims = ['idle_look_around', 'idle_wave', 'idle_nod'];
            const randomAnim = idleAnims[Math.floor(Math.random() * idleAnims.length)];

            this.npc.playAnimation(randomAnim, { loop: false });

            // Schedule next idle animation
            const nextDelay = 8000 + Math.random() * 7000;
            World.setTimeout(playRandomIdle, nextDelay);
        };

        playRandomIdle();
    }

    /**
     * Point to specific locations in the world
     */
    public pointToLocation(location: string): void {
        const locations = {
            videoScreen: new Vec3(0, 1.5, -3),
            emotionPanel: new Vec3(2, 1.5, 0),
            props: new Vec3(-2, 1, 2),
        };

        const targetPos = locations[location];
        if (targetPos) {
            this.npc.lookAt(targetPos);
            this.npc.playAnimation('point', { loop: false });
        }
    }
}

// ============================================================================
// GLOBAL INSTANCE AND INITIALIZATION
// ============================================================================

let guideNPC: HologramGuideNPC | null = null;

/**
 * Initialize the AI NPC Guide
 * Call this when spawning the NPC in your world
 */
export function initializeAINPCGuide(npcEntity: NPC): void {
    if (guideNPC) {
        console.warn('[NPC] Guide already initialized');
        return;
    }

    guideNPC = new HologramGuideNPC(npcEntity);
    console.log('[NPC] AI Guide initialized successfully');
}

/**
 * Make NPC point to a specific location
 * Useful for tutorials
 */
export function npcPointTo(location: 'videoScreen' | 'emotionPanel' | 'props'): void {
    if (guideNPC) {
        guideNPC.pointToLocation(location);
    }
}

// Auto-initialize when NPC spawns
World.onNPCSpawned((npc: NPC) => {
    if (npc.getName() === 'HologramGuide') {
        initializeAINPCGuide(npc);
    }
});
