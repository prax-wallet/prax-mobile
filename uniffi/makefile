.PHONY: all build copy clean

# Default target
all: build copy

# Build target - handles compilation and XCFramework creation
build:
	@echo "Building library and generating bindings..."
	cargo build
	cargo run --bin uniffi-bindgen generate --library ./target/debug/libmobile.dylib --language swift --out-dir ./bindings
	@echo "Building for iOS targets..."
	for target in aarch64-apple-darwin aarch64-apple-ios aarch64-apple-ios-sim; do \
		rustup target add $$target; \
		cargo build --release --target=$$target; \
	done
	@echo "Setting up XCFramework..."
	mv ./bindings/mobileFFI.modulemap ./bindings/module.modulemap
	rm -rf "ios/Mobile.xcframework"
	xcodebuild -create-xcframework \
		-library ./target/aarch64-apple-ios-sim/release/libmobile.a -headers ./bindings \
		-library ./target/aarch64-apple-ios/release/libmobile.a -headers ./bindings \
		-output "ios/Mobile.xcframework"

# Copy target - handles moving files to the correct locations
copy:
	@echo "Copying framework to react-native-expo..."
	rm -rf ../react-native-expo/modules/penumbra-sdk-module/ios/Mobile.xcframework
	cp -r ./ios/Mobile.xcframework ../react-native-expo/modules/penumbra-sdk-module/ios
	@echo "Cleaning up and copying Swift files..."
	rm -f ../react-native-expo/modules/penumbra-sdk-module/ios/Mobile.xcframework/ios-arm64/Headers/mobile.swift
	rm -f ../react-native-expo/modules/penumbra-sdk-module/ios/Mobile.xcframework/ios-arm64-simulator/Headers/mobile.swift
	rm -f ../react-native-expo/modules/penumbra-sdk-module/ios/mobile.swift
	cp ./bindings/mobile.swift ../react-native-expo/modules/penumbra-sdk-module/ios

# Clean target
clean:
	@echo "Cleaning build artifacts..."
	rm -rf ./target
	rm -rf ./bindings
	rm -rf ./ios/Mobile.xcframework
	rm -rf ../react-native-expo/modules/penumbra-sdk-module/ios/Mobile.xcframework