# React Native TypeScript Boilerplate
This is a boilerplate project for working with React Native and TypeScript.

You can copy or reference this repository in order to get started with a React
Native project using a TypeScript source that includes environment variable
configuration, linting, and testing with sensible defaults that align with
Mobiquity's standards for React Native development.

## Base App
The `master` branch includes a base for an app that can be built off of for
most projects. It includes base project dependencies and a file structure. It
already supports using core Mobiquity-recommended dependencies with hot
reloading and [react-native-debugger](https://github.com/jhen0409/react-native-debugger)
support.

Some modifications to existing files will be required for new projects:

1. `App.ts` will need to be modified to set up the navigation scheme for the app.
2. `Home.tsx` should be edited or removed. `HomeScreen.js` may also be impacted
 depending upon whether you have a screen in your app called "Home."
    * `__tests__/Home.test.tsx` should be similarly updated.
3. `Store.ts` should be updated to import all reducers and epics to build the
 state management store for the app. Any modifications to special handling for
 dev tools will be made here as well.

### Example App
**Check out the `example` git branch to see the example app.**

This branch comprises an example app with distinct functionality.

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
will refer to all commands run using the _command_ name. If you don't have the
command globally installed, `yarn <command>` or `npx <command>` should
do the same thing in most cases.
>
> For Example, if you don't have `react-native` on your path and the docs tell
you to run the command `react-native start`, you can use
`yarn react-native start`.
>
> In some cases, `yarn` _is_ the base command and the docs will say something
like `yarn install`.

You can create a base project by cloning this or by using `react-native init`
and copying over and rewriting the relevant content / files that you need.
Cloning and working from the boilerplate is recommended at this time.

**_Beware of copy/pasted code! You should review and code you are copying as if it
were written from scatch._**

---

Once you have your base project set up, run `yarn install`.

Now run `npx react-native-rename $PROJECT_NAME -b $BUNDLE_ID`. You will be
prompted for the app name, bundle identifier, and other information that needs
to be changed from the boilerplate.
See: https://github.com/junedomingo/react-native-rename

You're now ready to start working on your new project!

## Dependencies
This boilerplate project is built with recommended dependencies for Mobiquity
React Native app development. *Using these dependencies is highly recommended
and has the most support*. Don't use an alternative unless you have a good
reason that's been approved by the team.

We are totally open to suggestions for superior alternatives to any core
dependencies, and we'll keep this repo up-to-date with our recommendations.

* react + react-native -- core dependencies
* react-native-navigation -- navigation
* redux + react-redux -- state management
* redux-observable + rxjs -- side effects

**This list will probably also include `react-native-elements` which has not
been fully analyzed yet**.

### Dev Dependencies
These are dependencies used for development only and do not apply to the
production app.

* @types/(various) -- http://definitelytyped.org/
* babel + react-native-typescript-transformer -- used for transformations when bundling the app
* lint-staged + husky -- commit hooks (formatting and linting on build)
* jest + ts-jest + react-test-renderer -- testing
* prettier -- code formatting
* typescript + tslint + ts-config-mobiquity-react-native -- type safety and linting
* redux-immutable-state-invariant -- helps enforce state immutability during development

## Development
*Familiarize yourself with the `react-native` CLI. You can use the `--help`
option when running commands to see more options such as
`react-native run-ios --help` or `react-native run-android --help` (which have
pretty different options).*

The easiest way to develop locally is to start the local development server and
run the app in an iOS and/or Android simulator/emulator.

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

Remember that the React Native bundle server (`react-native start`) must be running for
`run-<platform>` to work. You may want to use `react-native start --reset-cache`
in some cases, especially if your app crashes or new changes aren't being
reflected.

You can use the bundle server for more than one simulator/emulator/device at a
time which will allow you to develop the app on multiple platforms at once.

*I find it's easier to develop functionality for one platform and then test
against the other platform and make minor changes that may be needed for it
specifically.*

### Directory and File Structure
Mobiquity standard React Native projects follow a module-based directory
structure where source files and assets are grouped by the functionality of
the app that they implement. This means that directories for grouping modules
can be created as needed. For example:

```
src/
    App.ts
    Config.ts
    Store.ts
    __tests__/
        Store.test.ts
    package.json
    common/
    account/
        PasswordInput.tsx
        actions.ts
        service.ts
        reducer.ts
        epic.ts
        account-storage.ts
        AccountScreen.js
        AccountPage.tsx
        goose.png
        __tests__/
            PasswordInput.test.tsx
            reducer.test.ts
            service.test.ts
            epic.test.ts
            account-storage.test.ts
            AccountPage.test.tsx
        login/
            LoginScreen.js
            LoginPage.tsx
            __tests__/
                LoginPage.test.tsx
        signup/
            SignupScreen.js
            SignupPage.tsx
            lock.png
            __tests__/
                SignupPage.test.tsx
    order/
        actions.ts
        service.ts
        reducer.ts
        epic.ts
        OrderScreen.js
        OrderPage.tsx
        __tests__/
            service.test.ts
            reducer.test.ts
            epic.test.ts
            OrderPage.test.tsx
```

It is recommended to keep directory structure as flat as possible, but depending
on the size of the project there may be many groupings and sub-groupings of
modules as shown with the `login` and `signup` sub-directories which are part
of the larger Account functionality. `account/` may also have reusable
components that are specific to the account pages, (`PasswordInput.tsx`) as
well as reusable utility functions (`account-storage.ts`). Components and
functions from `common` may also be used.

Asset files should be placed nearest to the module that uses them. It may make
some sense for assets to be placed in `common`.

`actions`, `service`, `reducer` and `epic` will be discussed later.

Organizing code based on module takes discipline. You will have to think about
where a particular component needs to go and whether or not to add another
layer of modules. Keep the single reponsibility principle in mind when creating
files and modules. Discuss with your team if you need help figuring out where
something should go or what it should be named. Naming things is hard!

Utilities and components not tied to specific functionality should be placed
in `src/common/`.

#### Filenames
Files should be named according to the following rules:

`actions`, `reducer`, `epic`, and `service` are special.

Files that have reusable functions and utilities should be given an
appropriate name with `kebab-case` (all lowercase with words separated by
dashes).

Files that have React components (including SFC and HOC) that do not connect to
the store should:
* Export *one* component.
* The filename should match the name of the exported component
* The filename should be in PascalCase (all words capitalized with no separator)
* The filename should use the `.tsx` extension.

Components that connect to the store using the redux `connect` function work
the same except they export *two* components -- the unconnected and the connected.
This helps with testing.

Page-level components (the ones you register for navigation) work the same as
any other component except that the class/filename should end with `Page`.

All page-level components unfortunately require a JavaScript wrapper for hot
reloading. You don't need to worry about testing this file or doing anything
special with it. Name it `<PageName>Screen.js`.

```js
import React from 'react';
import { HomePage } from 'src/home/HomePage';

export default class HomeScreen extends React.Component {
  render() {
    return <Home {...this.props} />;
  }
}
```

#### `actions`, `reducer`, `epic`, and `service`
**Note:** I'm least satisfied with this section and it is subject to change.
We'll have to see how it works on a large project first.

These files should use these names specifically.

`actions` exports the actions strings, types (i.e. type safety), and action
creators corresponding to the module.

The `reducer` exports the reducer functions and state types for the redux store
that apply to the module.

`service` should implement any API calls specific to the module.

`epic` implements the side-effect handling for the reducers for the module.

#### Tests
All test files should be put in a `__tests__` directory next to the file they
are testing and be named <that-file>.test.ts(x).

#### Special Files
These files have special names and purposes.

* `App.ts` -- creates the store and registers navigation
* `Config.ts` -- configuration property names and defaults
* `Store.ts` -- configures the store (reducers and epics)
* `package.json` -- this allows us to import from `src/`

#### Files Outside of `src`
These files should not change often. Most development work should be done in `src/`.

* `app.json` -- app meta information / configuration
* `package.json` -- meta information including dependency list, scripts, and testing configuration
* `yarn.lock` -- lockfile for dependencies
* `README.md` -- you're looking at it
* `android/` -- the Android app
* `ios/` -- the iOS app
* index.js` -- required by React Native. All this does is import the App file.
* rn-cli.config.js -- used to register transformations for bundling
* tsconfig.json -- TypeScript configuration for source
* tsconfig.test.json -- TypeScript configuration for tests
* tslint.json -- TypeScript linter configuration

### Debugging
Install the third party React Native Debugger: https://github.com/jhen0409/react-native-debugger

```sh
brew update && brew cask install react-native-debugger
```

This is a standalone app. In order to use it, open it via:

```sh
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

Once the app is running in your simulator/emulator, type <kbd>Cmd-d</kbd> for
iOS or <kbd>Cmd-m</kbd> for Android and select "Debug JS Remotely" if it is not
already selected. Now you should see logging in the debugger.

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

To debug network requests, you can right-click the debugger and select "Enable
Network Inspect." There are some limitations. See:
https://github.com/jhen0409/react-native-debugger/blob/master/docs/network-inspect-of-chrome-devtools.md

### Hot Reloading
Hot reloading re-renders the current view / screen with changes you've made to
that file or any dependent files in real time. This is different than live
reloading which will restart the app automatically when you make changes.
Using hot reloading is highly recommended at least in cases where you are
developing screens since it doens't clobber navigation or global state
(component state is still clobbered unless handled specifically).

Hot reloading should be supported with our base modules. Some hot reloading will
cause errors or not work properly. In this case, you can manually reload the
app with <kbd>Cmd-r</kbd> on iOS or <kbd>r r</kbd> on Android. If hot reloading
is causing too many issues while you're developing something, you can also turn
it off and turn live reloading on (or just handle reloading on your own).

If you are running multiple simulators or devices, hot/live reloading changes
will propagate to all of them at once.

If working from the base or example app, try enabling hot reloading and then
making a change to the source to see it in action.

In most cases hot reloading should just work :tm:. In some cases it won't work
properly or as you expect. You can dig into the API to improve hot reloading in
some areas of the code to help with development.
https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html

### Unit Testing
Testing is done using the [jest framework](https://facebook.github.io/jest/docs/en/using-matchers.html).

Write unit tests relative to the files they are testing in corresponding
`__tests__` directories (per jest standards). A working sample is given in
`src/__tests__/Home.test.tsx`. You should be able to create any
`__tests__/*.test.tsx` files and they will be picked up by jest.

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
API_HOST=test react-native start
```

In order to add a new environment variable, update `src/Config.ts`:

```ts
+ export const NAME = get(process.env['NAME'], 'default value');
```

Now you can `import { NAME } from 'src/Config` wherever it's needed.

Remember to set the environment variables you need before running `react-native
start`, `xcodebuild`, or `android/gradlew assemble$DEBUG_OR_RELEASE`.

## Building
Developing using the local server is highly recommended. If you need to test on
real devices or create a build you will not necessarily be able to use live
reloading or hot reloading to assist you.

These builds steps will also work to create builds for qa, release, etc.

### iOS
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

### Android
Android works a bit differently depending upon whether you're building for
debug or release.

#### Debug
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
> *Why `yarn` over `npm`?*

The tools are very similar and can probably used interchangeably in a lot of
cases -- at least for local development. `yarn` offers some advantages over
`npm`.

1. `yarn` is faster (although less-so with the latest `npm`).
2. `yarn.lock` offers more consistency than `package-lock.json`
   * It also avoids an annoying <kbd>tab</kbd> completion conflict with `package.json`
3. Most React / Facebook tools, libraries, and documentation prefer yarn or
 use it exclusively.
   * `yarn` is a Facebook tool.
4. `yarn` has a simpler / more straightforward mechanism for adding and managing
 dependencies and for running scripts.

> *Why aren't there more `package.json#scripts` such as `yarn start`?*

Understanding how to use a tool properly for development is important. The lack
of setup scripts encourages developers to look up the documentation of the tool
they want to use so they can set the options they need for the specific task
they're trying to do.

In a lot of cases, scripts don't offer much additional help. So if we had
`"start": "react-native start"` all that would do is allow us to run `yarn start`
instead of `yarn react-native start`. The latter is more meaningful.

Exceptions: Sometimes it is useful to have scripts when we want to force particular
behavior. Examples are `yarn test` and `yarn lint` where we want to enforce
proper type checking and linting of all required files in addition to some base
behavior. These scripts are also more complex.
