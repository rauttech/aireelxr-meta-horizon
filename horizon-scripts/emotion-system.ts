import { Color, Player } from 'horizon/core';

/**
 * Emotion System
 */

// Colors: R, G, B (Horizon Color constructor takes 3 args)
const COLOR_HEART = new Color(1.0, 0.2, 0.4);
const COLOR_SMILE = new Color(1.0, 0.9, 0.2);
const COLOR_LAUGH = new Color(0.2, 1.0, 0.4);
const COLOR_SAD = new Color(0.3, 0.5, 1.0);

export function setupEmotionPanel(uiObject: any, player: Player) {
    if (!uiObject || !player) return;

    console.log("Setting up emotions for " + player.name);

    // Helper to attach event safely
    const attachClick = (name: string, message: string) => {
        try {
            const btn = uiObject.find(name);
            if (btn && btn.onClick) {
                btn.onClick.add(() => console.log(message));
            }
        } catch (e) { }
    };

    attachClick('HeartButton', "Heart ❤️");
    attachClick('SmileButton', "Smile 😊");
    attachClick('LaughButton', "Laugh 😂");
    attachClick('SadButton', "Sad 😢");
}

console.log("Emotion System Loaded");
