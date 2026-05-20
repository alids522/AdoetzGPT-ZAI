import { registerPlugin } from '@capacitor/core';

const MicrophoneService = registerPlugin('MicrophoneService');

export async function startMicrophoneService(): Promise<boolean> {
	try {
		const result = await MicrophoneService.startForegroundService();
		return result?.started ?? false;
	} catch (e) {
		console.error('Failed to start microphone service:', e);
		return false;
	}
}

export async function stopMicrophoneService(): Promise<boolean> {
	try {
		const result = await MicrophoneService.stopForegroundService();
		return result?.stopped ?? false;
	} catch (e) {
		console.error('Failed to stop microphone service:', e);
		return false;
	}
}

export function initCapacitorBridge(): void {
	if (!window.Capacitor) return;

	console.log('Capacitor bridge initialized');
}
