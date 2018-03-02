# Directory and File Structure
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
        Button.tsx
        button.style.ts
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

## Filenames
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

Files that export `StyleSheet`s should be named `.style.ts`. These should be
used in cases where stylesheets can be reused by multiple components.

```js
import React from 'react';
import { HomePage } from 'src/home/HomePage';

export default class HomeScreen extends React.Component {
  render() {
    return <HomePage {...this.props} />;
  }
}
```

## `actions`, `reducer`, `epic`, and `service`
**Note:** I'm least satisfied with this section and it is subject to change.
We'll have to see how it works on a large project first.

These files should use these names specifically.

`actions` exports the actions strings, types (i.e. type safety), and action
creators corresponding to the module.

The `reducer` exports the reducer functions and state types for the redux store
that apply to the module.

`service` should implement any API calls specific to the module.

`epic` implements the side-effect handling for the reducers for the module.

## Tests
All test files should be put in a `__tests__` directory next to the file they
are testing and be named <that-file>.test.ts(x).

## Special Files
These files have special names and purposes.

* `App.ts` -- creates the store and registers navigation
* `Config.ts` -- configuration property names and defaults
* `Store.ts` -- configures the store (reducers and epics)
* `package.json` -- this allows us to import from `src/`

## Files Outside of `src`
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
