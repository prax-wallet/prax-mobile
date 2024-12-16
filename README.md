# penumbra-mobile

## Uniffi

1. Generate swift bindings

   ```bash
   cd uniffi && make build
   ```

2. Copy bindings to react-native application

   ```bash
   make copy
   ```

## React Native Application

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

1. Install dependencies

   ```bash
   cd react-native-expo && yarn
   ```

2. Start the app

   ```bash
   npx expo run:ios
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Dependencies

- XCode Developer Tools
- iOS Simulator
- [CocoaPods](https://cocoapods.org/) (v1.16+)
