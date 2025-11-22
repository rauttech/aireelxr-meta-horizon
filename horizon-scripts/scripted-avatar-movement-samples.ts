/**
 * Scripted Avatar Movement & NoesisUI Integration
 * 
 * This script demonstrates how to use the Scripted Avatar Movement API
 * and integrate it with NoesisUI for the Mobile Innovation challenge.
 */

import {
    ScriptedAvatarMovement,
    Quaternion,
    Vector3,
    Player
} from 'horizon/core';

// Configuration
const VIEWING_SPOT_POSITION = new Vector3(0, 1, 5); // Adjust coordinates for your world
const VIEWING_SPOT_ROTATION = Quaternion.fromEuler(0, 180, 0); // Facing the screen

/**
 * Move player to the best viewing spot for the video call
 * Uses Scripted Avatar Movement API
 */
export function moveToViewingSpot(player: Player) {
    // Check if player is valid
    if (!player) return;

    console.log(`[Movement] Moving player ${player.id} to viewing spot`);

    // Use Scripted Avatar Movement to smoothly move the player
    // Note: This requires the "Scripted Avatar Movement" capability enabled in World Settings
    ScriptedAvatarMovement.moveTo(
        player,
        VIEWING_SPOT_POSITION,
        VIEWING_SPOT_ROTATION,
        {
            duration: 1.5, // 1.5 seconds duration
            curve: 'EaseInOut', // Smooth acceleration/deceleration
        }
    ).then(() => {
        console.log(`[Movement] Player ${player.id} arrived at viewing spot`);
    }).catch((error) => {
        console.error(`[Movement] Failed to move player: ${error}`);
    });
}

/**
 * Bind NoesisUI buttons to actions
 * Call this from your main world script
 */
export function setupNoesisUI(uiObject: any, player: Player, webSurface: any) {
    // Get references to UI elements by name (defined in XAML)
    const joinBtn = uiObject.find('JoinButton');
    const leaveBtn = uiObject.find('LeaveButton');
    const moveBtn = uiObject.find('MoveButton');

    if (joinBtn) {
        joinBtn.onClick.add(() => {
            // Trigger Web Surface logic
            // Assuming initializeWebSurface is imported from horizon-match-presence.ts
            // initializeWebSurface(webSurface);
            console.log('Join clicked');
        });
    }

    if (moveBtn) {
        moveBtn.onClick.add(() => {
            moveToViewingSpot(player);
        });
    }
}
