# Remove the existing xcframework and copy the new xcframework
rm -rf ../react-native-expo/modules/penumbra-sdk-module/ios/Mobile.xcframework
cp -r ./ios/Mobile.xcframework ../react-native-expo/modules/penumbra-sdk-module/ios

# Remove the swift files from the headers 
rm ../react-native-expo/modules/penumbra-sdk-module/ios/Mobile.xcframework/ios-arm64/Headers/mobile.swift
rm ../react-native-expo/modules/penumbra-sdk-module/ios/Mobile.xcframework/ios-arm64-simulator/Headers/mobile.swift

# Remove the auto-generated uniffi swift wrapper
rm ../react-native-expo/modules/penumbra-sdk-module/ios/Sdk.swift

# Copy over new uniffi swift wrapper
cp ./bindings/mobile.swift ../react-native-expo/modules/penumbra-sdk-module/ios
mv ../react-native-expo/modules/penumbra-sdk-module/ios/mobile.swift ../react-native-expo/modules/penumbra-sdk-module/ios/Sdk.swift
