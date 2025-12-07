import { Player } from 'horizon/core';

/**
 * AI NPC Guide
 */

export function setupAINPC(npcObject: any) {
    if (!npcObject) return;

    console.log("Setting up NPC Holo");

    if (npcObject.onInteract) {
        npcObject.onInteract.add((player: Player) => {
            console.log("Hello " + player.name);
        });
    }
}

console.log("AI NPC Guide Loaded");
