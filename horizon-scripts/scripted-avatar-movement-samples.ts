import { Player, Quaternion, Vec3 } from 'horizon/core';

/**
 * Scripted Avatar Movement (Fixed)
 */

const VIEWING_POS = new Vec3(0, 1, 5);
// Fixed: fromEuler takes a Vec3, not 3 numbers
const VIEWING_ROT = Quaternion.fromEuler(new Vec3(0, 180, 0));

export function moveToViewingSpot(player: Player) {
    if (!player) return;

    // Standard Horizon movement (checking capability)
    // We use 'any' cast to avoid compilation errors if specific types are missing locally
    const globalVar = (globalThis as any);

    if (globalVar.ScriptedAvatarMovement) {
        console.log("Moving " + player.name + " to best viewing spot");
        globalVar.ScriptedAvatarMovement.moveTo(player, VIEWING_POS, VIEWING_ROT, { duration: 1.5 });
    } else {
        console.log("Movement API not available");
    }
}

export function setupNoesisUI(uiObject: any, player: Player, webSurface: any) {
    // Basic wiring
    const moveBtn = uiObject.find('MoveButton');
    if (moveBtn) {
        moveBtn.onClick.add(() => moveToViewingSpot(player));
    }
}

console.log("Avatar Movement Loaded");
