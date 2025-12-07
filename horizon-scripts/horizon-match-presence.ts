import { Player } from 'horizon/core';

/**
 * Video Presence (Enhanced)
 */

const BASE_URL = 'https://aireelxr-meta-horizon-7hntn24zc-rauttechs-projects.vercel.app';
let currentRoom = "";
let isChatVisible = true;
let isDarkMode = true;

// Helper to update URL
function updateSurface(webSurface: any) {
    if (!webSurface) return;

    // Construct simplified URL params
    const params = [
        `room=${currentRoom}`,
        `chat=${isChatVisible}`,
        `theme=${isDarkMode ? 'dark' : 'light'}`
    ].join('&');

    const fullUrl = `${BASE_URL}?${params}`;

    try {
        if ('url' in webSurface) webSurface.url = fullUrl;
        else if (webSurface.setUrl) webSurface.setUrl(fullUrl);
        console.log("Video updated: " + params);
    } catch (e) {
        console.error("Failed to update surface: " + e);
    }
}

export function createRoom(webSurface: any, player: Player) {
    // Generate new room
    currentRoom = 'ROOM_' + Math.floor(Math.random() * 9999);
    updateSurface(webSurface);
}

export function toggleChat(webSurface: any) {
    isChatVisible = !isChatVisible;
    console.log("Chat is now: " + (isChatVisible ? "ON" : "OFF"));
    updateSurface(webSurface);
}

export function toggleTheme(webSurface: any) {
    isDarkMode = !isDarkMode;
    console.log("Theme is now: " + (isDarkMode ? "DARK" : "LIGHT"));
    updateSurface(webSurface);
}

console.log("Video Presence (Enhanced) Loaded");
