# React Native TypeScript Boilerplate
This is a boilerplate project for working with React Native and TypeScript.

You can copy or reference this repository in order to get started with a React
Native project using a TypeScript source that includes environment variable
configuration, linting, and testing with sensible defaults.

## Base App
The `master` branch includes a base for an app that can be built off of for
most projects. It includes base project dependencies and a file structure. It
already supports using react-native-navigation with hot reloading.

Some modifications will be required:

1. `App.ts` will need to be modified to set up the navigation scheme for the app.
2. `Home.tsx` should be edited or removed. `HomeScreen.js` may also be impacted
 depending upon whether you have a screen in your app called "Home."
    * `__tests__/Home.test.tsx` should be similarly updated.
3. `Store.ts` should be updated to import all reducers and epics to build the
 state management store for the app. Any modifications to special handling for
 dev tools should be made here as well.

### Example App
**Check out the `example` git branch to see the example app.**

This repository comprises an example app with the following functionality:

* A homepage where you can search Github for a username
* A user page that displays information for the searched user:
 * Their icon, name, etc.
 * A back button to return home to search

This lays out the intended project structure including screens, view components,
actions, reducers, data models, epics (for Redux Observable) / side effects,
tests, etc.

The example app also has the recommended default dependencies with examples of
how to use them.

You can build off of the example app, but it's recommended to build off of the
`master` branch app instead since it requires fewer modifications. Most of the
example app functionality won't apply to what you are building, but it should
be a good reference.

## Installation
Requirements:
* `yarn` 1.3.2
* `node` 9

> You can also install the `react-native-cli`, but it's not necessary and you
can use `yarn react-native` relative to this project instead. This documentation
will refer to all commands run using the command name. If you don't have the
command globally installed, using `yarn <command>` or `npx command` should
do the same thing in most cases.  
> For Example if you don't have `react-native` on your path and the docs tell
you to do `react-native start` you can replace it with `yarn react-native
start`. In some cases, `yarn` _is_ the base command.

You can create a base project by cloning this or by using `react-native init`
and copying over the relevant content / files that you need. Cloning and
working from the boilerplate is recommended at this time.

Once you have your base project, run `yarn install`.

Now run `npx react-native-rename $PROJECT_NAME -b $BUNDLE_ID`. You will be
prompted for the app name, bundle identifier, and other information that needs
to be changed from the boilerplate.
See: https://github.com/junedomingo/react-native-rename

## Dependencies
This boilerplate project is built with recommended dependencies for Mobiquity
React Native app development. *Using these dependencies is highly recommended
and has the most support*. Don't use an alternative unless you have a good
reason that's been approved by the team.

* react-native-navigation -- navigation
* redux + react-redux -- state management
* redux-observable -- side effects

**This list will probably also include `react-native-elements` which has not
been fully analyzed yet**.

## Development
The easiest way to develop locally is to start the local development server and
run the app in an iOS and/or Android emulator.

```
react-native start
react-native run-ios
react-native run-android
```

If you have a simulator open for a platform, React Native will use it
automatically with the `run-<platform>` command. Otherwise you can specify a
device or simulator with the options for `react-native run-<platform>`.

You can open an iOS simulator using Xcode and an Android simulator using Android
Studio or the `emulator` Android tools command.

Once the app is running in the simulator, you can reload it with
<kbd>Cmd-r</kbd> on iOS or <kbd>r r</kbd> on Android. You can also open the menu
with <kbd>Cmd-d</kbd> on iOS or <kbd>Cmd-m</kbd> in Android. This will give you
options to enable live reloading, hot reloading, and remote JS debugging.

Remember that the React Native server (`react-native start`) must be running for
`run-<platform>` to work. You may want to use `react-native start --reset-cache`
in some cases, especially if your app is crashes or new changes aren't being
reflected.

You can use the bundle server more than one simulator/emulator/device at a time
which will allow you to develop the app on multiple platforms at once.

### Debugging
Install the third party React Native Debugger: https://github.com/jhen0409/react-native-debugger

```sh
brew update && brew cask install react-native-debugger
```

This is a standalone app. In order to use it, open it via:

```sh
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

Once the app is running in your simulator/emulator, type <kbd>Cmd-d</kbd> and
select "Debug JS Remotely" if it is not already selected. Now you should see
logging in the debugger.

You can also set the debugger at React Native server start time using the
`REACT_DEBUGGER` environment variable. For example:

```sh
REACT_DEBUGGER="open -g 'rndebugger://set-debugger-loc?port=8081' || ''" react-native start
```

This should open the debugger automatically in the background when you turn on
"Debug JS Remotely." You can remove the `-g` flag if you want it to pop to the
foreground when it opens.

The project setup should allow Redux devtools to work out of the box.

**Note:** You can only use the debugger with one emulator/simulator/device at
a time.

### Hot Reloading
Hot reloading reloads the current view / screen with changes you've made to that
file or any dependent files in real time. This is different than live reloading
which will restart the app automatically when you make changes. Using hot
reloading is highly recommended at least in cases where you are developing
screens.

Hot reloading should be supported with our base modules. Some hot reloading will
cause errors or not work properly. In this case, you can manually reload the
app with <kbd>Cmd-r</kbd> on iOS or <kbd>r r</kbd> on Android. If hot reloading
is causing too many issues while you're developing something, you can also turn
it off and turn live reloading on (or just handle reloading on your own).

If you are running multiple simulators or devices, hot/live reloading changes
will propagate to all of them at once.

If working from the base or example app, try enabling hot reloading and then
making a change to a component on your screen to see it in action.

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
`yarn lint` will run the linter. Linting is also run at commit time, and any
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

## Environment Variables / Configuration
**Do not set secret configuration in version control or the environment**.

Configuration of the app is handled through environment variables. When running
the development server, or bundling, the environment variables must be set.

```
API_URL=test react-native start
```

In order to add a new environment variable, update `src/Config.ts`:

```ts
+ export const NAME = get(process.env['NAME'], 'default value');
```

Now you can `import { NAME } from 'src/Config` wherever it's needed.

Remember to set the environment variables you need  before running `react-native
start`, `xcodebuild`, or `android/gradlew assemble$DEBUG_OR_RELEASE`.

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
xcodebuild -project ios/$PROJECT.xcodeproj -scheme $SCHEME \
  -configuration $DEBUG_OR_RELEASE \
  -archivePath ios/output/$PROJECT.xcarchive \
  clean archive
```

This will generate the build artifact xcarchive in `ios/output/$PROJECT.xcarchive`.

You can now create a .ipa using `xcodebuild` or Xcode with this build scheme.

### Android
Android works a bit differently depending upon whether you're building for
debug or release.

#### Debug
Android does not automatically create a JavaScript bundle for debug, so you
must have your development server running to serve the bundle (`react-native
start `).

```sh
cd android
./gradlew assembleDebug
```

This will create `android-debug.apk` in `android/app/build/outputs/apk` which
you can install on an app or emulator.

If you have an emulator running, you can also do `./gradlew installDebug` to
install it to the emulator immediately.

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

## Philosophy
> *Why `yarn` over `npm`?

The tools are very similar and can probably used interchangeably in a lot of
cases -- at least for local development. `yarn` offers some advantages over
`npm`.

1. `yarn` is faster (although less-so with the latest `npm`).
2. `yarn.lock` offers more consistency than `package-lock.json`
   * It also avoids an annoying <kbd>tab</kbd> completion conflict with `package.json`
3. Most React / Facebook tools, libraries, and documentation prefer yarn or
 use it exclusively.
4. `yarn` has a simpler / more straightforward mechanism for adding and managing
 dependencies and for running scripts.

> *Why aren't there more `package.json#scripts` such as `yarn start`?

Understanding how to use a tool properly for development is important. The lack
of setup scripts encourages developers to look up the documentation of the tool
they want to use so they can set the options they need for the specific task
they're trying to do.

In a lot of cases, scripts don't offer much additional help. So if we had
`"start": "react-native start"` all that would do is allow us to run `yarn start`
instead of `yarn react-native start` and the latter is more meaningful.

Sometimes it is useful to have scripts when we want to force particular
behavior. Examples are `yarn test` and `yarn lint` where we want to enforce
proper type checking and linting of all required files in addition to some base
behavior. These scripts are also more complex.
