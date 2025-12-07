/**
 * NoesisUI Event Handlers for Emotion Control Panel
 * Links UI button clicks to hologram system
 * 
 * SETUP:
 * 1. Create this script in Horizon Editor
 * 2. Attach to the NoesisUI panel object
 * 3. Link button events from XAML to these functions
 */

import { Player } from 'horizon/core';
import { onEmotionButtonClick } from './hologram-avatar-system';

/**
 * Heart button click handler
 * Triggered when player taps the Heart emotion button
 */
export function OnHeartButtonClick(player: Player): void {
    console.log(`[UI] ${player.name} clicked Heart button`);
    onEmotionButtonClick(player, 'heart');

    // Optional: Haptic feedback for mobile
    player.sendHapticFeedback('light');
}

/**
 * Smile button click handler
 */
export function OnSmileButtonClick(player: Player): void {
    console.log(`[UI] ${player.name} clicked Smile button`);
    onEmotionButtonClick(player, 'smile');
    player.sendHapticFeedback('light');
}

/**
 * Laugh button click handler
 */
export function OnLaughButtonClick(player: Player): void {
    console.log(`[UI] ${player.name} clicked Laugh button`);
    onEmotionButtonClick(player, 'laugh');
    player.sendHapticFeedback('medium');
}

/**
 * Sad button click handler
 */
export function OnSadButtonClick(player: Player): void {
    console.log(`[UI] ${player.name} clicked Sad button`);
    onEmotionButtonClick(player, 'sad');
    player.sendHapticFeedback('light');
}
