import { Player } from 'horizon/core';

/**
 * Video Presence
 */

const BASE_URL = 'https://aireelxr-meta-horizon-7hntn24zc-rauttechs-projects.vercel.app';

// Removed WebSurface import as it causes compilation error
// Using 'any' type for the surface object
export function createRoom(webSurface: any, player: Player) {
    if (!webSurface) return;

    try {
        // Create random room
        const roomId = 'ROOM_' + Math.floor(Math.random() * 9999);
        const url = BASE_URL + '?room=' + roomId;

        // Check if property exists before setting
        if ('url' in webSurface) {
            webSurface.url = url;
            console.log("Created room: " + roomId);
        } else if (typeof webSurface.setUrl === 'function') {
            webSurface.setUrl(url); // Method fallback
            console.log("Created room (method): " + roomId);
        }
    } catch (e) {
        console.error("Error setting URL: " + e);
    }
}

console.log("Video Presence Loaded");
