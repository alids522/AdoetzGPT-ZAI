<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { STORAGE_KEY_BACKEND_URL } from '$lib/constants';

	let url = '';
	let error = '';
	let connecting = false;
	let existingUrl = null;

	onMount(() => {
		existingUrl = localStorage.getItem(STORAGE_KEY_BACKEND_URL);
		if (existingUrl) {
			url = existingUrl;
		}
	});

	async function testConnection(testUrl) {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 8000);

		try {
			const res = await fetch(`${testUrl}/api/v1/configs`, {
				signal: controller.signal
			});
			clearTimeout(timeout);
			return res.ok || res.status === 401;
		} catch (e) {
			clearTimeout(timeout);
			return false;
		}
	}

	async function handleConnect() {
		error = '';
		connecting = true;

		let formatted = url.trim();

		if (!formatted) {
			error = 'Please enter a server URL.';
			connecting = false;
			return;
		}

		if (formatted.endsWith('/')) {
			formatted = formatted.slice(0, -1);
		}

		if (!/^https?:\/\//i.test(formatted)) {
			formatted = 'https://' + formatted;
		}

		try {
			new URL(formatted);
		} catch (e) {
			error = 'Please enter a valid URL.';
			connecting = false;
			return;
		}

		const success = await testConnection(formatted);

		if (success) {
			localStorage.setItem(STORAGE_KEY_BACKEND_URL, formatted);
			window.location.href = '/auth';
		} else {
			error = 'Could not connect to the backend. Please check the URL and try again.';
		}

		connecting = false;
	}

	function handleClear() {
		localStorage.removeItem(STORAGE_KEY_BACKEND_URL);
		existingUrl = null;
		url = '';
		error = '';
	}
</script>

<svelte:head>
	<title>AdoetzGPT - Setup</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-[#171717] p-4">
	<div class="w-full max-w-md">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-white mb-2">AdoetzGPT</h1>
			<p class="text-gray-400">Enter your Open WebUI server address to get started.</p>
		</div>

		{#if existingUrl}
			<div class="bg-[#1e1e1e] rounded-xl p-6 mb-4">
				<p class="text-gray-400 text-sm mb-2">Current server:</p>
				<p class="text-white font-mono text-sm break-all mb-4">{existingUrl}</p>
				<button
					on:click={handleClear}
					class="w-full px-4 py-2 bg-[#2a2a2a] hover:bg-[#333] text-gray-300 rounded-lg transition-colors"
				>
					Clear and enter new server
				</button>
			</div>
		{:else}
			<div class="bg-[#1e1e1e] rounded-xl p-6">
				<div class="mb-4">
					<label for="server-url" class="block text-gray-400 text-sm mb-2">Server URL</label>
					<input
						id="server-url"
						type="url"
						bind:value={url}
						placeholder="https://your-openwebui-server.com"
						on:keydown={(e) => { if (e.key === 'Enter') handleConnect(); }}
						disabled={connecting}
						class="w-full px-4 py-3 bg-[#2a2a2a] text-white rounded-lg border border-[#333] focus:border-blue-500 focus:outline-none placeholder-gray-500 disabled:opacity-50"
					/>
				</div>

				{#if error}
					<p class="text-red-400 text-sm mb-4">{error}</p>
				{/if}

				<button
					on:click={handleConnect}
					disabled={connecting || !url.trim()}
					class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
				>
					{#if connecting}
						<span class="flex items-center justify-center gap-2">
							<svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
							</svg>
							Connecting...
						</span>
					{:else}
						Connect
					{/if}
				</button>
			</div>
		{/if}
	</div>
</div>
