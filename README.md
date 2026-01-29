# Video Learning & Offline Games App (React Native / Expo)

This is a React Native (Expo) application built as part of a technical assignment.  
The app provides:

- A **video learning module** with time-based interactive activities
- An **offline-capable games module** that downloads and plays HTML5 games locally

## APK Download

You can download and install the APK from the link below - [Download APK](https://drive.google.com/file/d/1ZgWBtkwbC-RDF5AQhVz2fKLetvT61DgZ/view?usp=drive_link)

## Features

### Video Learning Module
- Displays a list of learning videos
- Selecting a video starts playback
- Video pauses **every 1 minute**
- An activity modal is shown at each pause
- User must complete the activity to resume playback
- Ensures **exactly one activity per minute** of video playback

### Games Module (Offline Support)
- Displays a list of downloadable HTML5 games
- Games are downloaded as ZIP files and extracted locally
- Supports offline gameplay using an in-app WebView
- Handles download states:
  - Success
  - Failure
  - Retry

## Flow 

The Homescreen opens as default. User can navigate to any module they want. 
1) Video Module - Can play any video from a list of available video. An activity popup appears every minute during video playback.
2) Game Module - Can download any game from a list of available games. After downloading, the game can be played offline in a WebView.

## Project Structure

### Navigation
- app/(tabs)/_layout.tsx - Tab navigation layout
- app/(tabs)/index.tsx - Home Screen

1. Video Learning Module
   - app/(tabs)/videos.tsx - List of available videos
   - app/video-player/index.tsx - Plays a selected video
   - components/Videocard.tsx - Card UI for videos

2. Games Module (Offline Support)
   - app/(tabs)/games.tsx - List of downloadable HTML5 games
   - app/game-viewer/[id].tsx - to open games in-app webview.
   - components/GameCard.tsx - Card UI for games with download status 
   - data/games.ts - list of available games
   - utils/downloader.ts - Handles game download & extraction
  
## Architecture

- **Expo Router** is used for file-based navigation to keep routing simple and scalable
- **WebView** is used for games to support HTML5/WebGL content and offline execution
- Games are stored locally using the device file system after download
- Video activity timing is handled using playback time listeners to ensure accurate 1-minute intervals
- UI components are kept reusable and modular for clarity and maintainability

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
