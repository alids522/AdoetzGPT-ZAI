# AdoetzGPT Zai

Android app wrapping the modified Open WebUI frontend using Capacitor.

## Architecture

- **Frontend**: SvelteKit SPA (static build) bundled inside the Android APK
- **Backend**: Remote Open WebUI server (configured at runtime)
- **Wrapper**: Capacitor 6.x Android bridge
- **No local backend** - the app connects to a user-specified Open WebUI instance

## Prerequisites

- Node.js 18-22
- JDK 17
- Android SDK (platform 34, build-tools 34.0.0)
- Gradle 8.5

## Local Build

```bash
# Install dependencies
npm ci --legacy-peer-deps

# Build frontend (outputs to build/)
npm run build

# Sync Capacitor (copies build/ to android assets)
npx cap sync android

# Build debug APK
cd android
gradle wrapper --gradle-version 8.5
./gradlew assembleDebug

# APK location: android/app/build/outputs/apk/debug/app-debug.apk
```

## GitHub Actions Build

The workflow at `.github/workflows/build-adoetzgpt-zai.yml` automatically builds the debug APK on:
- Push to `main`/`master` when files under `AdoetzGPT zai/` change
- Manual `workflow_dispatch` trigger

The APK is uploaded as a workflow artifact (30-day retention).

No secrets are required for debug builds.

## Usage

1. **First launch**: Enter your Open WebUI backend URL (e.g. `https://your-server.com`)
2. **Login**: Authenticate with your Open WebUI credentials
3. **Chat**: Use the full Open WebUI interface
4. **Change server**: Clear the stored URL from settings or logout flow to re-enter setup

## Key Features

- Backend URL setup screen on first launch
- Login/logout against the configured backend
- Live conversation / voice mode with foreground service
- Microphone continues working when minimized (with persistent notification)
- WebView state preserved across minimize/restore
- Safe-area handling for Android status bar and navigation bar
- Keyboard-aware layout (adjustResize)
- Dark mode support
- Single-task launch mode (no duplicate instances)

## Android Permissions

| Permission | Purpose |
|---|---|
| `INTERNET` | Connect to remote backend |
| `RECORD_AUDIO` | Voice input / live conversation |
| `MODIFY_AUDIO_SETTINGS` | Audio routing |
| `FOREGROUND_SERVICE` | Background microphone service |
| `FOREGROUND_SERVICE_MICROPHONE` | Android 14+ microphone foreground service type |
| `POST_NOTIFICATIONS` | Foreground service notification |
| `CAMERA` | Image capture |
| `READ_EXTERNAL_STORAGE` | File upload (Android < 13) |
| `READ_MEDIA_IMAGES/VIDEO/AUDIO` | Media access (Android 13+) |
| `ACCESS_NETWORK_STATE` | Connectivity awareness |
| `WAKE_LOCK` | Keep process alive during active sessions |
