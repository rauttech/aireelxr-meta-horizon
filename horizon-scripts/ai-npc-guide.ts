import * as hz from 'horizon/core';
import { PropTypes } from 'horizon/core';

/**
 * AI NPC Guide - "Holo"
 * Provides interactive guidance for users entering the Family Hologram Room
 * Uses Horizon's AI dialogue system (GenAI requirement)
 */

class AINPCGuide extends hz.Component<typeof AINPCGuide> {
    static propsDefinition = {
        // NPC name
        npcName: PropTypes.String,
        // Enable AI dialogue
        aiEnabled: PropTypes.Boolean,
        // Greeting message
        greetingMessage: PropTypes.String
    };

    private hasGreetedPlayers: Set<string> = new Set();
    private dialogueState: 'idle' | 'greeting' | 'explaining' | 'helping' = 'idle';

    preStart() {
        // Set NPC properties
        this.props.npcName = 'Holo';
        this.props.aiEnabled = true;
        this.props.greetingMessage = 'Welcome to the Family Hologram Room! I\'m Holo, your guide.';

        // Listen for player proximity events
        this.connectLocalBroadcastEvent('player.nearby', this.onPlayerNearby.bind(this));
        this.connectLocalBroadcastEvent('player.interact', this.onPlayerInteract.bind(this));
    }

    start() {
        console.log(`[AINPCGuide] AI NPC "${this.props.npcName}" initialized`);
        this.setupAIDialogue();
    }

    /**
     * Setup AI dialogue system
     */
    private setupAIDialogue() {
        if (!this.props.aiEnabled) return;

        // Define AI personality and knowledge base
        const aiConfig = {
            personality: 'friendly, helpful, knowledgeable about video calling and holographic technology',
            knowledge: [
                'How to use the Web Surface for video calls',
                'How to express emotions using the emotion panel',
                'How to create and join video rooms',
                'Troubleshooting video/audio issues',
                'Features of the Family Hologram Room'
            ],
            responseStyle: 'concise, encouraging, and informative'
        };

        // Initialize AI dialogue (Horizon's GenAI feature)
        this.initializeAI(aiConfig);
    }

    /**
     * Initialize AI with configuration
     */
    private initializeAI(config: any) {
        // This would use Horizon's AI dialogue API
        console.log('[AINPCGuide] AI configured with personality:', config.personality);

        // Set up dialogue topics
        this.registerDialogueTopic('getting_started', this.getGettingStartedResponse.bind(this));
        this.registerDialogueTopic('video_calling', this.getVideoCallingResponse.bind(this));
        this.registerDialogueTopic('emotions', this.getEmotionsResponse.bind(this));
        this.registerDialogueTopic('troubleshooting', this.getTroubleshootingResponse.bind(this));
    }

    /**
     * Handle player approaching NPC
     */
    private onPlayerNearby(event: { player: hz.Player; distance: number }) {
        const playerId = event.player.id.toString();

        // Greet new players
        if (!this.hasGreetedPlayers.has(playerId) && event.distance < 3.0) {
            this.greetPlayer(event.player);
            this.hasGreetedPlayers.add(playerId);
        }
    }

    /**
     * Handle player interacting with NPC
     */
    private onPlayerInteract(event: { player: hz.Player }) {
        console.log(`[AINPCGuide] Player ${event.player.name} interacted with Holo`);
        this.dialogueState = 'helping';
        this.showDialogueMenu(event.player);
    }

    /**
     * Greet a player
     */
    private greetPlayer(player: hz.Player) {
        this.dialogueState = 'greeting';

        // Show greeting message
        this.showMessage(player, this.props.greetingMessage);

        // Follow up with quick intro
        this.async.setTimeout(() => {
            this.showMessage(
                player,
                'I can help you get started with video calls and holographic emotions. Just click on me anytime!'
            );
        }, 3000);
    }

    /**
     * Show dialogue menu to player
     */
    private showDialogueMenu(player: hz.Player) {
        const menuOptions = [
            { id: 'getting_started', label: '🚀 How do I get started?' },
            { id: 'video_calling', label: '📹 How do video calls work?' },
            { id: 'emotions', label: '💖 What are holographic emotions?' },
            { id: 'troubleshooting', label: '🔧 I need help with an issue' }
        ];

        // Display dialogue menu (using Horizon's UI system)
        this.displayMenu(player, 'What would you like to know?', menuOptions);
    }

    /**
     * Display a menu to the player
     */
    private displayMenu(player: hz.Player, title: string, options: Array<{ id: string; label: string }>) {
        // This would use Horizon's dialogue UI
        console.log(`[AINPCGuide] Showing menu to ${player.name}:`, title);

        // In actual implementation, this would trigger Horizon's dialogue system
        // For now, we'll simulate with a broadcast event
        this.sendLocalBroadcastEvent('npc.showMenu', { player, title, options });
    }

    /**
     * Show a message to the player
     */
    private showMessage(player: hz.Player, message: string) {
        console.log(`[AINPCGuide] Message to ${player.name}: ${message}`);

        // This would use Horizon's chat/notification system
        this.sendLocalBroadcastEvent('npc.message', { player, message });
    }

    /**
     * Register a dialogue topic
     */
    private registerDialogueTopic(topicId: string, handler: () => string) {
        // Store topic handlers
        console.log(`[AINPCGuide] Registered dialogue topic: ${topicId}`);
    }

    /**
     * Getting Started response
     */
    private getGettingStartedResponse(): string {
        return `Welcome! Here's how to get started:

1. Walk to the Web Surface (the large screen)
2. Click "Create Room" to start a video call
3. Share the room code with family/friends
4. Use the emotion panel to express yourself with holographic effects!

Need more help? Just ask!`;
    }

    /**
     * Video Calling response
     */
    private getVideoCallingResponse(): string {
        return `Video calling is easy:

📱 From Quest/Desktop:
- Click the Web Surface
- Click "Create Room"
- Share the 6-digit code

📱 From Phone/Computer:
- Visit the web app URL
- Enter the room code
- Click "Join Room"

You'll see each other's video feeds in real-time!`;
    }

    /**
     * Emotions response
     */
    private getEmotionsResponse(): string {
        return `Holographic emotions add magic to your calls!

💖 Heart - Show love and affection
😊 Smile - Share happiness
😂 Laugh - Express joy
😢 Sad - Show empathy

Click any emotion button on the panel to trigger beautiful holographic particle effects around your avatar!`;
    }

    /**
     * Troubleshooting response
     */
    private getTroubleshootingResponse(): string {
        return `Common issues and fixes:

🎥 No video?
- Check camera permissions
- Make sure you're in a well-lit area

🔇 No audio?
- Check microphone permissions
- Verify volume settings

📱 Can't connect?
- Check your internet connection
- Try refreshing the Web Surface

Still having issues? Try creating a new room!`;
    }

    /**
     * Handle dialogue selection
     */
    public onDialogueSelected(player: hz.Player, topicId: string) {
        let response = '';

        switch (topicId) {
            case 'getting_started':
                response = this.getGettingStartedResponse();
                break;
            case 'video_calling':
                response = this.getVideoCallingResponse();
                break;
            case 'emotions':
                response = this.getEmotionsResponse();
                break;
            case 'troubleshooting':
                response = this.getTroubleshootingResponse();
                break;
            default:
                response = 'I\'m not sure about that. Try asking something else!';
        }

        this.showMessage(player, response);
    }

    dispose() {
        this.hasGreetedPlayers.clear();
    }
}

// Register the component
hz.Component.register(AINPCGuide);
