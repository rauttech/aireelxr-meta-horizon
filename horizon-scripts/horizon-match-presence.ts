/**
 * Horizon World Script - Video Presence Integration
 * 
 * INSTRUCTIONS FOR USE:
 * 1. Open Horizon Desktop Editor
 * 2. Create a new Script component
 * 3. Copy this entire file content into the script editor
 * 4. Attach to a World Object or UI element
 * 5. Configure the WEB_SURFACE_URL constant with your deployed web client URL
 * 
    const url = `${WEB_SURFACE_URL}?room=${finalRoomId}&source=horizon`;

    // Set Web Surface URL
    webSurfaceObject.setUrl(url);

    console.log(`[Presence] Initialized Web Surface with room: ${finalRoomId}`);
    return finalRoomId;
}

/**
 * Generate a unique room ID
 */
export function generateRoomId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    return `${DEFAULT_ROOM_PREFIX}-${timestamp}-${random}`.toUpperCase();
}

/**
 * Handle button click to start video presence
 * Attach this to a button's onClick event
 */
export function onStartPresenceClick(player: any, webSurfaceObject: any) {
    const roomId = initializeWebSurface(webSurfaceObject);

    // Optional: Store room ID in player data
    player.setCustomData('currentRoomId', roomId);

    // Optional: Broadcast to other players
    broadcastPresenceEvent('presence-started', {
        playerId: player.id,
        roomId: roomId,
    });

    console.log(`[Presence] Player ${player.id} started presence in room ${roomId}`);
}

/**
 * Handle button click to join existing room
 */
export function onJoinRoomClick(player: any, webSurfaceObject: any, roomId: string) {
    if (!roomId || roomId.trim() === '') {
        console.error('[Presence] Invalid room ID');
        return;
    }

    initializeWebSurface(webSurfaceObject, roomId);
    player.setCustomData('currentRoomId', roomId);

    console.log(`[Presence] Player ${player.id} joined room ${roomId}`);
}

/**
 * Handle button click to leave presence
 */
export function onLeavePresenceClick(player: any, webSurfaceObject: any) {
    const roomId = player.getCustomData('currentRoomId');

    // Reset Web Surface to default or blank
    webSurfaceObject.setUrl('about:blank');

    // Clear player data
    player.setCustomData('currentRoomId', null);

    // Broadcast leave event
    if (roomId) {
        broadcastPresenceEvent('presence-ended', {
            playerId: player.id,
            roomId: roomId,
        });
    }

    console.log(`[Presence] Player ${player.id} left presence`);
}

/**
 * Broadcast presence event to all players
 * Uses World Broadcast API
 */
export function broadcastPresenceEvent(eventType: string, data: any) {
    // World Broadcast API (Horizon-specific)
    // This is a placeholder - actual implementation depends on Horizon API
    if (typeof world !== 'undefined' && world.broadcast) {
        world.broadcast(eventType, data);
    }
}

/**
 * Handle incoming presence events from other players
 */
export function onPresenceEventReceived(eventType: string, data: any) {
    console.log(`[Presence] Received event: ${eventType}`, data);

    switch (eventType) {
        case 'presence-started':
            console.log(`Player ${data.playerId} started presence in room ${data.roomId}`);
            break;
        case 'presence-ended':
            console.log(`Player ${data.playerId} ended presence`);
            break;
        default:
            console.log(`Unknown event type: ${eventType}`);
    }
}

/**
 * Save a memory snapshot
 * This could trigger a screenshot or recording
 */
export function onSaveMemoryClick(player: any) {
    const roomId = player.getCustomData('currentRoomId');

    if (!roomId) {
        console.error('[Memory] No active presence session');
        return;
    }

    const memory = {
        playerId: player.id,
        roomId: roomId,
        timestamp: new Date().toISOString(),
        location: player.getPosition(),
    };

    // Store memory (implementation depends on your backend)
    console.log('[Memory] Saved:', memory);

    // Broadcast memory event
    broadcastPresenceEvent('memory-saved', memory);
}

// Example usage in Horizon Editor:
// 1. Create a Web Surface object named "VideoPresencePanel"
// 2. Create buttons: "Start Call", "Join Room", "Leave", "Save Memory"
// 3. Attach this script to a world object
// 4. In button onClick events, call:
//    - onStartPresenceClick(player, VideoPresencePanel)
//    - onJoinRoomClick(player, VideoPresencePanel, roomIdInput.value)
//    - onLeavePresenceClick(player, VideoPresencePanel)
//    - onSaveMemoryClick(player)
