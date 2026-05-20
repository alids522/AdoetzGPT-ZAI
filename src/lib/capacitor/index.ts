import { STORAGE_KEY_BACKEND_URL } from '$lib/constants';

export function getBackendUrl(): string | null {
	try {
		return localStorage.getItem(STORAGE_KEY_BACKEND_URL);
	} catch {
		return null;
	}
}

export function setBackendUrl(url: string): void {
	try {
		localStorage.setItem(STORAGE_KEY_BACKEND_URL, url);
	} catch (e) {
		console.error('Failed to save backend URL:', e);
	}
}

export function clearBackendUrl(): void {
	try {
		localStorage.removeItem(STORAGE_KEY_BACKEND_URL);
	} catch (e) {
		console.error('Failed to clear backend URL:', e);
	}
}
