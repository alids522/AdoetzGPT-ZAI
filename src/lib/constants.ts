import { browser, dev } from '$app/environment';

export const APP_NAME = 'AdoetzGPT';

export const STORAGE_KEY_BACKEND_URL = 'adoetzgpt_backend_url';

export function getBackendUrl(): string {
	if (!browser) return '';
	try {
		return localStorage.getItem(STORAGE_KEY_BACKEND_URL) || '';
	} catch {
		return '';
	}
}

export function setBackendUrl(url: string): void {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY_BACKEND_URL, url);
	} catch {}
}

export function clearBackendUrl(): void {
	if (!browser) return;
	try {
		localStorage.removeItem(STORAGE_KEY_BACKEND_URL);
	} catch {}
}

const DEV_WEBUI_BASE_URL =
	typeof location !== 'undefined' && location.hostname === 'chat2.alids.app'
		? 'https://chat2api.alids.app'
		: typeof location !== 'undefined'
			? `http://${location.hostname}:8080`
			: '';

export let WEBUI_BASE_URL = '';
export let WEBUI_API_BASE_URL = '';
export let OLLAMA_API_BASE_URL = '';
export let OPENAI_API_BASE_URL = '';
export let AUDIO_API_BASE_URL = '';
export let IMAGES_API_BASE_URL = '';
export let RETRIEVAL_API_BASE_URL = '';
export let WEBUI_HOSTNAME = '';

export function refreshUrls(): void {
	if (!browser) return;

	if (dev) {
		WEBUI_BASE_URL = DEV_WEBUI_BASE_URL;
	} else {
		WEBUI_BASE_URL = getBackendUrl();
	}

	WEBUI_HOSTNAME = dev ? (typeof location !== 'undefined' ? location.hostname : '') : '';
	WEBUI_API_BASE_URL = `${WEBUI_BASE_URL}/api/v1`;
	OLLAMA_API_BASE_URL = `${WEBUI_BASE_URL}/ollama`;
	OPENAI_API_BASE_URL = `${WEBUI_BASE_URL}/openai`;
	AUDIO_API_BASE_URL = `${WEBUI_BASE_URL}/api/v1/audio`;
	IMAGES_API_BASE_URL = `${WEBUI_BASE_URL}/api/v1/images`;
	RETRIEVAL_API_BASE_URL = `${WEBUI_BASE_URL}/api/v1/retrieval`;
}

refreshUrls();

export const WEBUI_VERSION = APP_VERSION;
export const WEBUI_BUILD_HASH = APP_BUILD_HASH;
export const REQUIRED_OLLAMA_VERSION = '0.1.16';

export const SUPPORTED_FILE_TYPE = [
	'application/epub+zip',
	'application/pdf',
	'text/plain',
	'text/csv',
	'text/xml',
	'text/html',
	'text/x-python',
	'text/css',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/octet-stream',
	'application/x-javascript',
	'text/markdown',
	'audio/mpeg',
	'audio/wav',
	'audio/ogg',
	'audio/x-m4a'
];

export const SUPPORTED_FILE_EXTENSIONS = [
	'md',
	'rst',
	'go',
	'py',
	'java',
	'sh',
	'bat',
	'ps1',
	'cmd',
	'js',
	'ts',
	'css',
	'cpp',
	'hpp',
	'h',
	'c',
	'cs',
	'htm',
	'html',
	'sql',
	'log',
	'ini',
	'pl',
	'pm',
	'r',
	'dart',
	'dockerfile',
	'env',
	'php',
	'hs',
	'hsc',
	'lua',
	'nginxconf',
	'conf',
	'm',
	'mm',
	'plsql',
	'perl',
	'rb',
	'rs',
	'db2',
	'scala',
	'bash',
	'swift',
	'vue',
	'svelte',
	'doc',
	'docx',
	'pdf',
	'csv',
	'txt',
	'xls',
	'xlsx',
	'pptx',
	'ppt',
	'msg'
];

export const DEFAULT_CAPABILITIES = {
	file_context: true,
	vision: true,
	file_upload: true,
	web_search: true,
	image_generation: true,
	code_interpreter: true,
	terminal: true,
	citations: true,
	status_updates: true,
	usage: undefined,
	builtin_tools: true
};

export const PASTED_TEXT_CHARACTER_LIMIT = 1000;
