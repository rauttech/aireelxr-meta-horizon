import { Player, Quaternion, Vec3 } from 'horizon/core';

/**
 * Scripted Avatar Movement (Fixed)
 */

const VIEWING_POS = new Vec3(0, 1, 5);
const VIEWING_ROT = Quaternion.fromEuler(0, 180, 0);

export function moveToViewingSpot(player: Player) {
    if (!player) return;

    // Using global/namespace access if import fails, or just skipping type check
    // Since 'ScriptedAvatarMovement' export was missing, we use 'any' cast on global 
    // or assume it's attached to the player or world in some contexts.
    // However, best practice without types is to use the standard "ScriptedAvatarMovement" 
    // capability if available on the player entity directly or via component lookup.

    console.log("Move requested for: " + player.name);

    // Placeholder: The provided sample used a class that doesn't exist in types.
    // If ScriptedAvatarMovement IS available at runtime but not types, we escape hatch:
    const SAM = (globalThis as any).ScriptedAvatarMovement;
    if (SAM && SAM.moveTo) {
        SAM.moveTo(player, VIEWING_POS, VIEWING_ROT, { duration: 1.5 });
    } else {
        console.warn("ScriptedAvatarMovement API not found");
    }
}

export function setupNoesisUI(uiObject: any, player: Player, webSurface: any) {
    const joinBtn = uiObject.find('JoinButton');
    if (joinBtn) {
        joinBtn.onClick.add(() => console.log('Join clicked'));
    }

    const moveBtn = uiObject.find('MoveButton');
    if (moveBtn) {
        moveBtn.onClick.add(() => moveToViewingSpot(player));
    }
}
