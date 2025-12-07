import * as hz from 'horizon/core';
import { Player, PropTypes } from 'horizon/core';

/**
 * Hologram Avatar System
 * Creates holographic visual effects for player avatars with emotion-based animations
 */

// Emotion types
type EmotionType = 'heart' | 'smile' | 'laugh' | 'sad' | 'neutral';

// Particle effect configurations
const EMOTION_EFFECTS = {
    heart: {
        color: new hz.Color(1.0, 0.2, 0.4, 1.0), // Pink/Red
        particleCount: 20,
        lifetime: 2.0,
        speed: 1.5
    },
    smile: {
        color: new hz.Color(1.0, 0.9, 0.2, 1.0), // Yellow
        particleCount: 15,
        lifetime: 1.5,
        speed: 1.2
    },
    laugh: {
        color: new hz.Color(0.2, 1.0, 0.4, 1.0), // Green
        particleCount: 25,
        lifetime: 2.5,
        speed: 2.0
    },
    sad: {
        color: new hz.Color(0.3, 0.5, 1.0, 1.0), // Blue
        particleCount: 10,
        lifetime: 3.0,
        speed: 0.8
    },
    neutral: {
        color: new hz.Color(0.7, 0.7, 0.7, 1.0), // Gray
        particleCount: 5,
        lifetime: 1.0,
        speed: 1.0
    }
};

class HologramAvatarSystem extends hz.Component<typeof HologramAvatarSystem> {
    static propsDefinition = {
        // Enable/disable holographic effects
        enableHologram: PropTypes.Boolean,
        // Current emotion state
        currentEmotion: PropTypes.String,
        // Hologram intensity (0-1)
        intensity: PropTypes.Number
    };

    private particleEmitters: Map<string, hz.ParticleEmitter> = new Map();
    private activeEmotion: EmotionType = 'neutral';

    preStart() {
        // Set default values
        this.props.enableHologram = true;
        this.props.currentEmotion = 'neutral';
        this.props.intensity = 0.7;

        // Listen for emotion change events from UI
        this.connectNetworkBroadcastEvent('emotionChanged', this.onEmotionChanged.bind(this));

        // Listen for player join events
        this.connectLocalBroadcastEvent('player.joined', this.onPlayerJoined.bind(this));
    }

    start() {
        console.log('[HologramSystem] Hologram Avatar System initialized');
        this.initializeHologramEffects();
    }

    /**
     * Initialize holographic effects for all players
     */
    private initializeHologramEffects() {
        const players = hz.World.getPlayers();
        players.forEach(player => {
            this.createHologramForPlayer(player);
        });
    }

    /**
     * Create hologram effect for a specific player
     */
    private createHologramForPlayer(player: Player) {
        if (!this.props.enableHologram) return;

        const playerId = player.id.toString();

        // Create particle emitter for player
        const emitter = this.world.createEntity(hz.ParticleEmitter, {
            position: player.position,
            parent: player
        });

        this.particleEmitters.set(playerId, emitter);
        this.updateEmotionEffect(playerId, this.activeEmotion);
    }

    /**
     * Handle emotion change events
     */
    private onEmotionChanged(event: { emotion: EmotionType; playerId?: string }) {
        console.log(`[HologramSystem] Emotion changed to: ${event.emotion}`);

        this.activeEmotion = event.emotion;
        this.props.currentEmotion = event.emotion;

        // Update effect for specific player or all players
        if (event.playerId) {
            this.updateEmotionEffect(event.playerId, event.emotion);
        } else {
            // Update for all players
            this.particleEmitters.forEach((emitter, playerId) => {
                this.updateEmotionEffect(playerId, event.emotion);
            });
        }

        // Trigger animation
        this.playEmotionAnimation(event.emotion);
    }

    /**
     * Update particle effect based on emotion
     */
    private updateEmotionEffect(playerId: string, emotion: EmotionType) {
        const emitter = this.particleEmitters.get(playerId);
        if (!emitter) return;

        const effect = EMOTION_EFFECTS[emotion];

        // Update particle emitter properties
        emitter.color = effect.color;
        emitter.particleCount = effect.particleCount;
        emitter.lifetime = effect.lifetime;
        emitter.speed = effect.speed;
        emitter.intensity = this.props.intensity;
    }

    /**
     * Play emotion animation
     */
    private playEmotionAnimation(emotion: EmotionType) {
        // Trigger visual burst effect
        const burstDuration = 0.5;
        const originalIntensity = this.props.intensity;

        // Increase intensity for burst
        this.props.intensity = 1.0;

        // Reset after burst
        this.async.setTimeout(() => {
            this.props.intensity = originalIntensity;
        }, burstDuration * 1000);
    }

    /**
     * Handle new player joining
     */
    private onPlayerJoined(event: { player: Player }) {
        console.log(`[HologramSystem] Player joined: ${event.player.name}`);
        this.createHologramForPlayer(event.player);
    }

    /**
     * Public method to trigger emotion (called from UI handlers)
     */
    public triggerEmotion(emotion: EmotionType) {
        this.sendNetworkBroadcastEvent('emotionChanged', {
            emotion,
            playerId: hz.World.getLocalPlayer()?.id.toString()
        });
    }

    /**
     * Toggle hologram effects on/off
     */
    public toggleHologram(enabled: boolean) {
        this.props.enableHologram = enabled;

        if (!enabled) {
            // Disable all particle emitters
            this.particleEmitters.forEach(emitter => {
                emitter.enabled = false;
            });
        } else {
            // Re-enable all particle emitters
            this.particleEmitters.forEach(emitter => {
                emitter.enabled = true;
            });
        }
    }

    /**
     * Set hologram intensity
     */
    public setIntensity(intensity: number) {
        this.props.intensity = Math.max(0, Math.min(1, intensity)); // Clamp 0-1

        // Update all emitters
        this.particleEmitters.forEach((emitter, playerId) => {
            this.updateEmotionEffect(playerId, this.activeEmotion);
        });
    }

    dispose() {
        // Clean up particle emitters
        this.particleEmitters.forEach(emitter => {
            emitter.dispose();
        });
        this.particleEmitters.clear();
    }
}

// Register the component
hz.Component.register(HologramAvatarSystem);
