# React Native TypeScript Boilerplate
This is a boilerplate project for working with React Native and TypeScript.

You can copy or reference this repo in order to get started with A React Native
project with a TypeScript source that includes environment variable
configuration, linting, and testing with sensible defaults.

## Installation
Requirements:
* `yarn` 1.3.2
* `node` 9

You can also install the `react-native-cli`, but it's not necessary and you
can use `npx react-native` relative to this project instead.

Once you have your base project, run `yarn install`.

Update `app.json` as needed to reflect your app name and other meta inforamtion.
Now remove the `ios` and `android` directories. Run `npx react-native eject` to
recreate them with your settings.

Note the changes to `ios/$PROJECT/AppDelegate.m`:

```diff
+#ifdef DEBUG
   jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
+#else
+  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
+#endif
```

This will use the release bundle for iOS apps built with the `Release`
configuration automatically.

Also recreate the `android/app/src/main/assets` directory if needed.

## Development
The easiest way to develop locally is to start the local development server and
run the app in an iOS and/or Android emulator.

```
yarn start
npx react-native run-ios
npx react-native run-android
```

If you have a simulator open for a platform, React Native will use it
automatically with the `run-<platform>` command. Otherwise you can specify a
device or simulator with the options for `react-native run-<platform>`.

You can reload the app with <kbd>Cmd-r</kbd> on iOS or <kbd>r r</kbd> on
Android. You can also open the menu with <kbd>Cmd-d</kbd> on iOS or
<kbd>Cmd-m</kbd> in Android. This will give you options to enable live reloading
and hot reloading.

Remember that the React Native server must be running for `run-<platform>` to
work. This is done with `react-native start`. `yarn start` is a wrapper for this
command.

### Unit Testing
Write unit tests relative to the files they are testing in corresponding
`__tests__` directories (per jest standards). A working sample is given in
`src/__tests__/App.test.tsx`. You should be able to create any `__tests__/*.test.tsx`
files and they will be picked up by jest.

`yarn test` will run the unit tests. You can also use `yarn test --coverage`
to generate a coverage report in the `coverage/` directory.

### Formatting
Formatting is handled by [`prettier`](https://github.com/prettier/prettier).
`prettier` will run automatically on `git commit` to format all files.

You should add a prettier plugin for your editor so you can see the changes
ahead of time. This is not strictly necessary, but will help normalize the
output files and your changes as you develop.

### Linting
`yarn lint` will run the linter. Linting is also run at commit time and any
automatic fixes are applied. If there are linter errors, the commit will fail.

You should add a TypeScript and tslint plugin to your editor so you can catch
any errors in real time.

### Path Aliases
In order to make importing more convenient, absolute imports can be done from
the `src` directory. For example:

```ts
// App.tsx
import { API_URL } from 'src/Config.ts';
```

This will work instead of having to do `../src/Config.ts` or `./Config.ts` or
finding a relative path for a given module/file.

This works by having `tsconfig.json#compilerOptions.baseUrl: "."` and also
having `src/package.json#name: "src"`.

You can create more path aliases in a similar fashion by adding a
`package.json` to a given path with a name that corresponds to the path alias.

#### For Tests
This is handled via `package.json@jest.moduleNameMapper: "src(.*)": "<rootDir>/src/$1"`.
This maps any imports from `src/` to the root of the project.

## Environment Variables
*Do not set secret configuration in version control or the environment*.

Configuration of the app is handled through environment variables. When running
the development server or bundling, the environment variables must be set.

```
API_URL=test yarn start
```

In order to add a new environment variable, update `src/Config.ts`:

```ts
+ export const NAME = get(process.env['NAME'], 'default value');
```

Now you can `import { NAME } from 'src/Config.ts` wherever it's needed.

Remember to set the environment variables you need  before running `yarn start`,
`xcodebuild`, or `yarn bundle:android`.

## Building
Developing using the local server is highly recommended. If you need to test on
real devices or create a build you will not necessarily be able to use live
reloading or hot reloading to assist you.

These builds steps will also work to create builds for qa and release.

### iOS
iOS automatically creates a release bundle used by the app when it's built for
release so you don't have to bundle manually.

First, set whatever environment variables you need to do the build.

```sh
xcodebuild -project ios/$PROJECT.xcodeproj -scheme $SCHEME -configuration $DEBUG_OR_RELEASE \
  -archivePath ios/output/$PROJECT.xcarchive clean archive
```

This will generate the build artifact xcarchive in `ios/output/$PROJECT.xcarchive`.

You can now create a .ipa using `xcodebuild` or Xcode with this build scheme.

### Android
Android works a bit differently depending upon whether you're building for
debug or release.

#### Debug
Android does not automatically create a JavaScript bundle so this step must
be done manually.

First, set whatever environment variables you need to do the build.

Run `yarn bundle:android` in order to create the bundle at
`android/app/src/main/assets/index.android.bundle`.

Now you should be able to build using the normal Android process.

```sh
cd android
./gradlew assembleDebug
```

This will create `android-debug.apk` in `android/app/build/outputs/apk` which
you can install on an app or emulator.

If you have an emulator running, you can also do `./gradlew installDebug` to
install it to the emulator immediately.

**Note:** When building for debug, Android will still try to connect to the
development server for the bundle / reloading. I think it's safe to ignore this
for testing purposes, or to use the server for debugging.

#### Release
First, set whatever environment variables you need for the build.

In the `andrdoid/` directory, `./gradlew assembleRelease` will automatically
build the JavaScript bundle and create the unsigned apk for you in
`android/app/build/outputs/apk`.

**Note:** The `bundleJsAndAssets` build step will only run if the source or
assets have changed. If you only want to change configuration but create a new
build, run `./gradlew clean` first.

If the build does not work for some reason, try `rm -rf node_modules` and
`yarn install` and retry.
