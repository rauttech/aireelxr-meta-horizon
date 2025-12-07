import * as hz from 'horizon/core';
import { PropTypes } from 'horizon/core';

/**
 * Noesis UI Handlers
 * Handles button clicks and interactions from the NoesisUI emotion control panel
 */

class NoesisUIHandlers extends hz.Component<typeof NoesisUIHandlers> {
    static propsDefinition = {
        // Reference to the hologram system
        hologramSystemEnabled: PropTypes.Boolean,
        // Last triggered emotion
        lastEmotion: PropTypes.String
    };

    private hologramSystem: any = null;

    preStart() {
        this.props.hologramSystemEnabled = true;
        this.props.lastEmotion = 'neutral';
    }

    start() {
        console.log('[NoesisUIHandlers] UI Handlers initialized');

        // Find and connect to the HologramSystem
        this.connectToHologramSystem();
    }

    /**
     * Connect to the Hologram Avatar System
     */
    private connectToHologramSystem() {
        // Find the HologramSystem component in the world
        const hologramEntities = this.world.findEntitiesByTag('HologramSystem');

        if (hologramEntities.length > 0) {
            this.hologramSystem = hologramEntities[0];
            console.log('[NoesisUIHandlers] Connected to HologramSystem');
        } else {
            console.warn('[NoesisUIHandlers] HologramSystem not found');
        }
    }

    /**
     * Handle Heart button click
     * Triggers pink/red heart particle effects
     */
    public OnHeartButtonClick() {
        console.log('[NoesisUIHandlers] Heart button clicked ❤️');
        this.triggerEmotion('heart');
        this.playButtonFeedback('heart');
    }

    /**
     * Handle Smile button click
     * Triggers yellow smile particle effects
     */
    public OnSmileButtonClick() {
        console.log('[NoesisUIHandlers] Smile button clicked 😊');
        this.triggerEmotion('smile');
        this.playButtonFeedback('smile');
    }

    /**
     * Handle Laugh button click
     * Triggers green laugh particle effects
     */
    public OnLaughButtonClick() {
        console.log('[NoesisUIHandlers] Laugh button clicked 😂');
        this.triggerEmotion('laugh');
        this.playButtonFeedback('laugh');
    }

    /**
     * Handle Sad button click
     * Triggers blue sad particle effects
     */
    public OnSadButtonClick() {
        console.log('[NoesisUIHandlers] Sad button clicked 😢');
        this.triggerEmotion('sad');
        this.playButtonFeedback('sad');
    }

    /**
     * Trigger emotion effect through the hologram system
     */
    private triggerEmotion(emotion: string) {
        this.props.lastEmotion = emotion;

        // Broadcast emotion change event
        this.sendNetworkBroadcastEvent('emotionChanged', {
            emotion,
            playerId: hz.World.getLocalPlayer()?.id.toString(),
            timestamp: Date.now()
        });

        // If hologram system is available, trigger it directly
        if (this.hologramSystem && this.props.hologramSystemEnabled) {
            this.hologramSystem.triggerEmotion(emotion);
        }

        // Also send to video presence system for web app synchronization
        this.sendToVideoPresence(emotion);
    }

    /**
     * Send emotion to video presence system
     * This syncs the emotion with the WebRTC video app
     */
    private sendToVideoPresence(emotion: string) {
        this.sendNetworkBroadcastEvent('videoPresence.emotion', {
            emotion,
            playerId: hz.World.getLocalPlayer()?.id.toString()
        });
    }

    /**
     * Play button feedback (visual/audio)
     */
    private playButtonFeedback(emotion: string) {
        // Visual feedback - button press animation
        this.playButtonAnimation(emotion);

        // Audio feedback - play sound
        this.playEmotionSound(emotion);

        // Haptic feedback (if on Quest)
        this.triggerHapticFeedback();
    }

    /**
     * Play button press animation
     */
    private playButtonAnimation(emotion: string) {
        // This would trigger a button press animation in NoesisUI
        // For example: scale down then back up
        console.log(`[NoesisUIHandlers] Playing animation for ${emotion} button`);

        // Broadcast to UI system
        this.sendLocalBroadcastEvent('ui.buttonPressed', { emotion });
    }

    /**
     * Play emotion sound effect
     */
    private playEmotionSound(emotion: string) {
        const soundMap: { [key: string]: string } = {
            heart: 'sounds/heart_chime.wav',
            smile: 'sounds/smile_bell.wav',
            laugh: 'sounds/laugh_sparkle.wav',
            sad: 'sounds/sad_tone.wav'
        };

        const soundPath = soundMap[emotion];
        if (soundPath) {
            // Play sound using Horizon's audio system
            this.playSound(soundPath, 0.5); // 50% volume
        }
    }

    /**
     * Play a sound
     */
    private playSound(path: string, volume: number = 1.0) {
        console.log(`[NoesisUIHandlers] Playing sound: ${path} at volume ${volume}`);

        // This would use Horizon's audio API
        this.sendLocalBroadcastEvent('audio.play', { path, volume });
    }

    /**
     * Trigger haptic feedback on Quest controllers
     */
    private triggerHapticFeedback() {
        // Trigger a short vibration on Quest controllers
        const intensity = 0.3;
        const duration = 100; // milliseconds

        this.sendLocalBroadcastEvent('haptic.pulse', { intensity, duration });
    }

    /**
     * Reset all emotions to neutral
     */
    public ResetEmotions() {
        console.log('[NoesisUIHandlers] Resetting emotions to neutral');
        this.triggerEmotion('neutral');
    }

    /**
     * Toggle hologram system on/off
     */
    public ToggleHologramSystem() {
        this.props.hologramSystemEnabled = !this.props.hologramSystemEnabled;

        console.log(`[NoesisUIHandlers] Hologram system ${this.props.hologramSystemEnabled ? 'enabled' : 'disabled'}`);

        if (this.hologramSystem) {
            this.hologramSystem.toggleHologram(this.props.hologramSystemEnabled);
        }
    }

    /**
     * Get the last triggered emotion
     */
    public getLastEmotion(): string {
        return this.props.lastEmotion;
    }

    /**
     * Handle UI panel opened
     */
    public OnPanelOpened() {
        console.log('[NoesisUIHandlers] Emotion panel opened');
        // Could trigger tutorial or highlight buttons
    }

    /**
     * Handle UI panel closed
     */
    public OnPanelClosed() {
        console.log('[NoesisUIHandlers] Emotion panel closed');
    }
}

// Register the component
hz.Component.register(NoesisUIHandlers);
