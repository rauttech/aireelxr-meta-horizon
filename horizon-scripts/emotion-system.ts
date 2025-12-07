import { Player, Color } from 'horizon/core';

/**
 * Emotion System & World Controls
 */

// Colors: R, G, B
const COLOR_HEART = new Color(1.0, 0.2, 0.4);
const COLOR_SMILE = new Color(1.0, 0.9, 0.2);

export function setupEmotionPanel(uiObject: any, player: Player) {
    if (!uiObject || !player) return;

    console.log("Setting up UI for " + player.name);

    // Helper to safely attach
    const attach = (name: string, callback: () => void) => {
        try {
            const btn = uiObject.find(name);
            if (btn) btn.onClick.add(callback);
        } catch (e) { }
    };

    // Emotions
    attach('HeartButton', () => console.log("Heart <3"));
    attach('SmileButton', () => console.log("Smile :)"));

    // NEW: World Controls (Chat & Environment)
    attach('ToggleChatButton', () => {
        console.log("Toggling Chat...");
        // This would call into the video presence script logic
        // For now we log, as we can't cross-import easily without modules
    });

    attach('ThemeButton', () => {
        console.log("Switching Environment Theme...");
    });
}

console.log("Emotion System + World Controls Loaded");
