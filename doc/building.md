# Building
Developing using the local server is highly recommended. If you need to test on
real devices or create a build you will not necessarily be able to use live
reloading or hot reloading to assist you.

These builds steps will also work to create builds for qa, release, etc.

## iOS
iOS automatically creates a release bundle used by the app when it's built for
release, so you don't have to bundle manually.

First, set whatever environment variables you need to do the build.

Next:

```sh
xcodebuild -project ios/$PROJECT.xcodeproj -scheme $SCHEME \
  -configuration $DEBUG_OR_RELEASE \
  -archivePath ios/output/$PROJECT.xcarchive \
  clean archive
```

This will generate the build artifact xcarchive in `ios/output/$PROJECT.xcarchive`.

You can now create a .ipa using `xcodebuild` or the Xcode GUI with this build scheme.

## Android
Android works a bit differently depending upon whether you're building for
debug or release.

### Debug
Android does not automatically create a JavaScript bundle for debug, so you
must have your development server running to serve the bundle (`react-native
start`).

```sh
cd android
./gradlew assembleDebug
```

This will create `android-debug.apk` in `android/app/build/outputs/apk` which
you can install on an app or emulator.

If you have an emulator running, you can also do `./gradlew installDebug` to
install it to the emulator immediately (`react-native run-android` does this).

### Release
First, set whatever environment variables you need for the build.

In the `andrdoid/` directory, `./gradlew assembleRelease` will automatically
build the JavaScript bundle and create the unsigned apk for you in
`android/app/build/outputs/apk`.

**Note:** The `bundleJsAndAssets` build step will only run if the source or
assets have changed. If you only want to change configuration but create a new
build, run `./gradlew clean` first.

If the build does not work for some reason, try `rm -rf node_modules` and
`yarn install` and retry.
