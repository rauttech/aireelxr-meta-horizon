/**
 * AaireelXR - Hologram Avatar System
 * Family Hologram Room Experience
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Script in Horizon Editor
 * 2. Copy this entire code into the script
 * 3. Attach to a World Object (e.g., "HologramController")
 * 4. Link NoesisUI buttons to the emotion functions
 * 5. Add particle effect objects for visual feedback
 */

import { Player, Entity, Vec3, Quaternion } from 'horizon/core';
import { World } from 'horizon/world';

// ============================================================================
// CONFIGURATION
// ============================================================================

const HOLOGRAM_CONFIG = {
    // Visual settings
    hologramColor: { r: 0.3, g: 0.7, b: 1.0, a: 0.6 }, // Soft blue glow
    glowIntensity: 2.5,
    flickerSpeed: 0.15,

    // Animation settings
    bobHeight: 0.15, // meters
    bobSpeed: 1.5,
    rotationSpeed: 0.3,

    // Spawn offset above anchor
    spawnHeight: 1.5,
};

const EMOTION_EFFECTS = {
    heart: {
        particleColor: { r: 1.0, g: 0.3, b: 0.5 },
        sound: 'sfx_heart_pop',
        animation: 'wave',
    },
    smile: {
        particleColor: { r: 1.0, g: 0.9, b: 0.3 },
        sound: 'sfx_sparkle',
        animation: 'nod',
    },
    laugh: {
        particleColor: { r: 0.9, g: 0.5, b: 1.0 },
        sound: 'sfx_confetti',
        animation: 'dance',
    },
    sad: {
        particleColor: { r: 0.4, g: 0.6, b: 0.9 },
        sound: 'sfx_sad_tone',
        animation: 'nod_slow',
    },
};

// ============================================================================
// HOLOGRAM AVATAR CLASS
// ============================================================================

class HologramAvatar {
    private entity: Entity;
    private player: Player;
    private anchorPosition: Vec3;
    private bobPhase: number = 0;
    private rotationPhase: number = 0;
    private currentEmotion: string | null = null;

    constructor(player: Player, spawnPosition: Vec3) {
        this.player = player;
        this.anchorPosition = spawnPosition;
        this.createHologramEntity();
        this.startAnimationLoop();
    }

    /**
     * Create the hologram entity with visual effects
     */
    private createHologramEntity(): void {
        // Spawn a humanoid avatar model
        // In Horizon, use built-in avatar prefab or custom model
        this.entity = World.spawn('HumanoidAvatar', this.anchorPosition);

        // Apply hologram material
        this.entity.setMaterial({
            baseColor: HOLOGRAM_CONFIG.hologramColor,
            emissive: HOLOGRAM_CONFIG.hologramColor,
            emissiveIntensity: HOLOGRAM_CONFIG.glowIntensity,
            opacity: HOLOGRAM_CONFIG.hologramColor.a,
            transparent: true,
        });

        // Add glow effect
        this.entity.addComponent('GlowEffect', {
            color: HOLOGRAM_CONFIG.hologramColor,
            intensity: HOLOGRAM_CONFIG.glowIntensity,
        });

        // Add flicker effect for hologram realism
        this.entity.addComponent('FlickerEffect', {
            speed: HOLOGRAM_CONFIG.flickerSpeed,
            minOpacity: 0.5,
            maxOpacity: 0.7,
        });

        console.log(`[Hologram] Created for player ${this.player.name}`);
    }

    /**
     * Main animation loop - handles bobbing and rotation
     */
    private startAnimationLoop(): void {
        World.onUpdate(() => {
            if (!this.entity || !this.entity.isValid()) return;

            const deltaTime = World.getDeltaTime();

            // Anti-gravity bobbing effect
            this.bobPhase += deltaTime * HOLOGRAM_CONFIG.bobSpeed;
            const bobOffset = Math.sin(this.bobPhase) * HOLOGRAM_CONFIG.bobHeight;

            // Gentle rotation
            this.rotationPhase += deltaTime * HOLOGRAM_CONFIG.rotationSpeed;

            // Update position and rotation
            const newPosition = new Vec3(
                this.anchorPosition.x,
                this.anchorPosition.y + HOLOGRAM_CONFIG.spawnHeight + bobOffset,
                this.anchorPosition.z
            );

            const newRotation = Quaternion.fromEuler(0, this.rotationPhase, 0);

            this.entity.setPosition(newPosition);
            this.entity.setRotation(newRotation);
        });
    }

    /**
     * Trigger an emotion with animation and effects
     */
    public triggerEmotion(emotion: string): void {
        if (!EMOTION_EFFECTS[emotion]) {
            console.error(`[Hologram] Unknown emotion: ${emotion}`);
            return;
        }

        this.currentEmotion = emotion;
        const effect = EMOTION_EFFECTS[emotion];

        // Play animation
        this.playAnimation(effect.animation);

        // Play sound
        this.playSound(effect.sound);

        // Spawn particle effects
        this.spawnEmotionParticles(emotion);

        console.log(`[Hologram] ${this.player.name} triggered emotion: ${emotion}`);
    }

    /**
     * Play avatar animation
     */
    private playAnimation(animationName: string): void {
        if (!this.entity) return;

        // Use Horizon's animation system
        this.entity.playAnimation(animationName, {
            loop: false,
            speed: 1.0,
            blendTime: 0.2,
        });
    }

    /**
     * Play sound effect
     */
    private playSound(soundName: string): void {
        if (!this.entity) return;

        // Play 3D positional audio
        World.playSound(soundName, {
            position: this.entity.getPosition(),
            volume: 0.7,
            pitch: 1.0,
            spatialBlend: 1.0,
        });
    }

    /**
     * Spawn emotion-specific particle effects
     */
    private spawnEmotionParticles(emotion: string): void {
        const effect = EMOTION_EFFECTS[emotion];
        const position = this.entity.getPosition();

        switch (emotion) {
            case 'heart':
                this.spawnHeartParticles(position, effect.particleColor);
                break;
            case 'smile':
                this.spawnSparkleParticles(position, effect.particleColor);
                break;
            case 'laugh':
                this.spawnConfettiParticles(position, effect.particleColor);
                break;
            case 'sad':
                this.spawnSadGlowEffect(position, effect.particleColor);
                break;
        }
    }

    /**
     * Heart emotion: Floating hearts swirling around avatar
     */
    private spawnHeartParticles(position: Vec3, color: any): void {
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 0.5;

            const heartPos = new Vec3(
                position.x + Math.cos(angle) * radius,
                position.y,
                position.z + Math.sin(angle) * radius
            );

            const heart = World.spawn('HeartParticle', heartPos);
            heart.setScale(0.2);
            heart.setColor(color);

            // Animate upward spiral
            heart.animate({
                position: new Vec3(heartPos.x, position.y + 2, heartPos.z),
                scale: 0.05,
                duration: 2.0,
                easing: 'easeOut',
                onComplete: () => heart.destroy(),
            });
        }
    }

    /**
     * Smile emotion: Sparkling particle bursts
     */
    private spawnSparkleParticles(position: Vec3, color: any): void {
        const particleSystem = World.spawn('ParticleSystem', position);

        particleSystem.configure({
            particleCount: 30,
            emissionRate: 50,
            lifetime: 1.5,
            startSize: 0.1,
            endSize: 0.01,
            startColor: color,
            endColor: { ...color, a: 0 },
            velocity: { min: 0.5, max: 1.5 },
            gravity: -0.5,
        });

        particleSystem.emit();

        // Auto-destroy after emission
        World.setTimeout(() => particleSystem.destroy(), 2000);
    }

    /**
     * Laugh emotion: Colorful confetti with dance animation
     */
    private spawnConfettiParticles(position: Vec3, color: any): void {
        const colors = [
            { r: 1, g: 0.3, b: 0.5 },
            { r: 0.3, g: 1, b: 0.5 },
            { r: 0.5, g: 0.3, b: 1 },
            { r: 1, g: 0.9, b: 0.3 },
        ];

        for (let i = 0; i < 20; i++) {
            const confetti = World.spawn('ConfettiPiece', position);
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            confetti.setColor(randomColor);
            confetti.setScale(0.15);

            // Random explosion velocity
            const velocity = new Vec3(
                (Math.random() - 0.5) * 3,
                Math.random() * 3 + 1,
                (Math.random() - 0.5) * 3
            );

            confetti.applyImpulse(velocity);

            // Destroy after falling
            World.setTimeout(() => confetti.destroy(), 3000);
        }
    }

    /**
     * Sad emotion: Gentle blue pulsing glow
     */
    private spawnSadGlowEffect(position: Vec3, color: any): void {
        const glowSphere = World.spawn('GlowSphere', position);

        glowSphere.setColor(color);
        glowSphere.setScale(1.5);
        glowSphere.setOpacity(0.3);

        // Pulsing animation
        glowSphere.animate({
            scale: 2.5,
            opacity: 0,
            duration: 2.0,
            easing: 'easeOut',
            onComplete: () => glowSphere.destroy(),
        });
    }

    /**
     * Random idle animations for liveliness
     */
    public playRandomIdleAnimation(): void {
        const idleAnimations = [
            'idle_scratch_head',
            'idle_look_around',
            'idle_stretch',
            'idle_dance_subtle',
        ];

        const randomAnim = idleAnimations[Math.floor(Math.random() * idleAnimations.length)];
        this.playAnimation(randomAnim);
    }

    /**
     * Cleanup
     */
    public destroy(): void {
        if (this.entity) {
            this.entity.destroy();
        }
    }
}

// ============================================================================
// HOLOGRAM MANAGER - Multi-user support
// ============================================================================

class HologramManager {
    private holograms: Map<string, HologramAvatar> = new Map();
    private spawnPoints: Vec3[] = [];

    constructor() {
        this.initializeSpawnPoints();
        this.setupPlayerEvents();
        this.startIdleAnimationTimer();
    }

    /**
     * Define spawn points for multiple holograms
     */
    private initializeSpawnPoints(): void {
        // Circular arrangement around center
        const center = new Vec3(0, 0, 0);
        const radius = 2;
        const maxPlayers = 8;

        for (let i = 0; i < maxPlayers; i++) {
            const angle = (i / maxPlayers) * Math.PI * 2;
            this.spawnPoints.push(new Vec3(
                center.x + Math.cos(angle) * radius,
                center.y,
                center.z + Math.sin(angle) * radius
            ));
        }
    }

    /**
     * Setup player join/leave events
     */
    private setupPlayerEvents(): void {
        World.onPlayerJoined((player: Player) => {
            this.spawnHologramForPlayer(player);
        });

        World.onPlayerLeft((player: Player) => {
            this.removeHologramForPlayer(player);
        });
    }

    /**
     * Spawn hologram for a player
     */
    private spawnHologramForPlayer(player: Player): void {
        const spawnIndex = this.holograms.size % this.spawnPoints.length;
        const spawnPosition = this.spawnPoints[spawnIndex];

        const hologram = new HologramAvatar(player, spawnPosition);
        this.holograms.set(player.id, hologram);

        console.log(`[Manager] Spawned hologram for ${player.name}`);
    }

    /**
     * Remove hologram when player leaves
     */
    private removeHologramForPlayer(player: Player): void {
        const hologram = this.holograms.get(player.id);
        if (hologram) {
            hologram.destroy();
            this.holograms.delete(player.id);
        }
    }

    /**
     * Broadcast emotion to all players
     */
    public broadcastEmotion(playerId: string, emotion: string): void {
        const hologram = this.holograms.get(playerId);
        if (hologram) {
            hologram.triggerEmotion(emotion);

            // Broadcast to all clients via World Broadcast
            World.broadcast('emotion-triggered', {
                playerId: playerId,
                emotion: emotion,
            });
        }
    }

    /**
     * Random idle animations every 10-15 seconds
     */
    private startIdleAnimationTimer(): void {
        const playRandomIdle = () => {
            this.holograms.forEach((hologram) => {
                if (Math.random() > 0.5) {
                    hologram.playRandomIdleAnimation();
                }
            });

            // Schedule next idle animation
            const nextDelay = 10000 + Math.random() * 5000;
            World.setTimeout(playRandomIdle, nextDelay);
        };

        playRandomIdle();
    }
}

// ============================================================================
// GLOBAL INSTANCE
// ============================================================================

let hologramManager: HologramManager | null = null;

/**
 * Initialize the hologram system
 * Call this from a world script or on world start
 */
export function initializeHologramSystem(): void {
    if (hologramManager) {
        console.warn('[Hologram] System already initialized');
        return;
    }

    hologramManager = new HologramManager();
    console.log('[Hologram] System initialized');
}

/**
 * Handle emotion button clicks from NoesisUI
 * Link these to your UI buttons
 */
export function onEmotionButtonClick(player: Player, emotion: string): void {
    if (!hologramManager) {
        console.error('[Hologram] System not initialized');
        return;
    }

    hologramManager.broadcastEmotion(player.id, emotion);
}

// ============================================================================
// INTERACTIVE PROPS
// ============================================================================

/**
 * Spawn interactive props around the scene
 */
export function spawnInteractiveProps(): void {
    // Floating holographic butterflies
    for (let i = 0; i < 5; i++) {
        const butterfly = World.spawn('HolographicButterfly', new Vec3(
            Math.random() * 4 - 2,
            1.5 + Math.random(),
            Math.random() * 4 - 2
        ));

        butterfly.setColor({ r: 0.5, g: 0.8, b: 1.0, a: 0.6 });
        butterfly.enableFloatingBehavior();
    }

    // Bouncing balls
    for (let i = 0; i < 3; i++) {
        const ball = World.spawn('BouncingBall', new Vec3(
            Math.random() * 3 - 1.5,
            0.5,
            Math.random() * 3 - 1.5
        ));

        ball.setColor({ r: Math.random(), g: Math.random(), b: Math.random() });
        ball.enablePhysics();
    }
}

// Auto-initialize when script loads
World.onStart(() => {
    initializeHologramSystem();
    spawnInteractiveProps();
});
