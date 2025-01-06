# Expo app

## File organization

The `react-native-expo` directory is aliased as `@` in `tsconfig.json`. When an import would require traversing more than one parent directory, use the `@` alias instead:

- `import Button from '../components/Button'` ✅
- `import Button from '../../components/Button'` ❌
- `import Button from '@/components/Button'` ✅

Note: this only works in TypeScript (`.ts`/`.tsx`) files.

### Directories

Expo's [file-based routing](https://docs.expo.dev/develop/file-based-routing/) system uses the `app` directory for defining routes and layouts:

> ...`app` is a special directory. Any file you add to this directory becomes a route inside the native app...
>
> Layout files in a directory are used to define shared UI elements such as headers, tab bars so that they persist between different routes.
>
> – [Expo docs](https://docs.expo.dev/develop/file-based-routing/)

In this repo, we use the `app` directory _only_ for defining route components and their corresponding layout components. We don't include _any_ UI or business logic in these route or layout components — any UI that is rendered for a given route or logic MUST be imported from the `components` directory.

Route components MUST be suffixed with `*Route`. So the home route component should be named `HomeRoute`.

Components defining the UI for a screen MUST be suffixed with `*Screen`. So, the home screen component should be named `HomeScreen`. The `HomeRoute` component would import and render _only_ the `HomeScreen` component, and optionally pass it any routing props it needs.

If a given route needs to define layout for it and its children, the `_layout.tsx` file will be placed next to the `index.tsx` file for a given route. The `_layout.tsx` file MUST have a single export — a `Layout` component that simply imports and renders a `*Layout` component from the `components` directory. For example, the home route's `_layout.tsx` file would export a `Layout` component that simply imports and renders the `HomeLayout` component from the `components` directory.

In short: all UI lives under the `components` directory. All route components live under the `app` directory, and don't render any UI of their own.

### Components

- For single-file components, the filename MUST be `ComponentName.tsx`.
- For multi-file components (e.g., components with test, Storybook, etc. files), the component MUST be located in a directory named for the component, and the component filename itself MUST be `index.tsx`, so that it can be imported with `import MyComponent from '@/components/MyComponent'`.
  - For example, a `Foo` component with only a `Foo.tsx` file could live alongside other components in a single directory, but a `Bar` component with test and Storybook files must live in a `Bar` subdirectory:
  ```
  - src/components/
    - Foo.tsx
    - Bar/
      - index.tsx
      - index.test.tsx
      - index.stories.ts
  ```
- All screen components (i.e., those ending with `Screen`) MUST be in the `/src/components/screens` directory.
  - Children of screen components (i.e., components that only exist on that screen) MUST be located underneath that screen's component directory. For example, if a `<Header />` component only exists inside the `SinglePostScreen`, the files should be arranged as follows:
  ```
  - src/components/screens/
    - SinglePostScreen/
      - index.tsx
      - Header/
        - index.tsx
        - index.test.tsx
  ```
- All navigator components (i.e., those ending with `Navigator`) MUST be in the `/src/components/navigators` directory.
- Components that are only used within a parent component MUST sit in the parent component's directory, rather than be a sibling of the parent directory:
  ```
  - src/components/
    - HeaderWithDropdown/
      - index.tsx
      - Dropdown.tsx ✅ Correct, if Dropdown is only ever used inside HeaderWithDropdown
  ```
  ```
  - src/components/
    - Dropdown.tsx ❌ Wrong, if Dropdown is only ever used inside HeaderWithDropdown
    - HeaderWithDropdown/
      - index.tsx
  ```
  (One exception to this rule: if you're developing a component that will eventually be used by multiple other components, and just happens to be a child of only a single component at the moment, you can leave it as a sibling of its parent.)
- If a parent is the only parent of a given component, then it MUST live in an eponymous directory. For example, if a `HeaderWithDropdown` component has `Dropdown` as a child component, `HeaderWithDropdown` must live in its own `HeaderWithDropdown` directory, which also includes the `Dropdown` component:
  ```
  - src/components/
    - HeaderWithDropdown/
      - index.tsx
      - Dropdown.tsx
  ```
  If `Dropdown` were to later have children of its own, `Dropdown` would move into a new `HeaderWithDropdown/Dropdown` subdirectory along with its children:
  ```
  - src/components/
    - HeaderWithDropdown/
      - index.tsx
      - Dropdown/
        - index.tsx
        - DropdownItem.tsx
  ```
- Components should be located at the most specific possible directory level. For example, if the `Dropdown` component is used by both `HeaderWithDropdown` and `Menu` components, `Dropdown` should be placed in the lowest-level directory that contains both `HeaderWithDropdown` and `Menu`:

  ```
  - src/components/
    - SomeCommonParentOfBothHeaderWithDropdownAndMenu/
      - index.tsx
      - HeaderWithDropdown/
        - index.tsx
        - index.test.tsx
      - Menu/
        - index.tsx
        - index.test.tsx
      - Dropdown.tsx ✅ Correct - Dropdown is used by both Menu and HeaderWithDropdown, so it's a sibling to both
  ```

  This, as opposed to e.g., placing it inside the `HeaderWithDropdown` directory (and then importing it from there in `Menu`), or inside a root-level directory. This way, components are nested as closely to the components using them as possible.

  ```
  - src/components/
    - SomeCommonParentOfBothHeaderWithDropdownAndMenu/
      - index.tsx
      - HeaderWithDropdown/
        - index.tsx
        - index.test.tsx
        - Dropdown.tsx ❌ Wrong - Menu shouldn't be importing a child of HeaderWithDropdown
      - Menu/
        - index.tsx
        - index.test.tsx
  ```

- Components MUST be the default export of the file that contains them:

  ```TypeScript
  export default function Foo() {
    // ...
  }
  ```

  This allows components to be imported like so:

  ```TypeScript
  import Foo from '@/components/Foo'
  ```

- If there are multiple components in a file:
  - There MUST NOT be more than one component _exported_ from the file. (If other components in the file need to be exported, move them into separate files.)
  - The file MUST be named for the component which is exported, or be named `index.tsx` when it is in its own directory.

## Naming conventions

### Components

Components MUST be named in UpperCamelCase: e.g., `DropdownMenu`.

## Storybook

We use [Storybook](https://storybook.js.org/) to develop and view UI components in isolation. While Storybook does provide React Native integration (via a separate app entry point), we instead use Storybook for web due to ease of use. This allow developers to view Storybook stories in their browser, while still developing the app in the iOS Simulator.

To make this possible, we use [`react-native-web`](https://necolas.github.io/react-native-web/) (as well as some other utility libraries) to convert React Native components into their HTML equivalents. See `.storybook/main.ts` for more.

Storybook stories should be placed next to the component file they represent, suffixed with `.stories.ts` or `.stories.tsx`. For example, the Storybook stories for a `Button` component would live under `Button/index.stories.ts`.

## Internationalization (i18n)

We use [Lingui](https://lingui.dev/) to manage translations in Prax Mobile.

When rendering literal text in the app, make sure the text is wrapped in either a `<Trans />` component or a `` t`...` `` call. (Get `t` from`useLingui()`: `const { t } = useLingui()`.)

When wrapping translatable text in `<Trans />`, make sure to put the `<Trans />` component as close to the translatable text as possible:

```tsx
<Text><Trans>Correct!</Trans></Text>
<Trans><Text>Incorrect!</Text></Trans>
```

This is because, when strings are extracted from your code (see below), any components between `<Trans />` and the translatable text will show up as `<0>`, `<1>`, etc. wrappers in the translation files.

For example, `<Trans><Text>Incorrect!</Text></Trans>` will be extracted as `<0>Incorrect!</0>` in the translation files. But `<Text><Trans>Correct!</Trans></Text>` will be extracted as just `Correct!` in the translation files, which is easier for translators to work with.

The only time you _should_ keep translatable text wrapped in a surrounding component _inside_ `<Trans />` is when multiple text components form a single unit, e.g., `<Trans><Text>This is a single sentence with a word in <Text style={{ fontWeight: 'bold' }}>bold</Text>.</Text></Trans>`.

(Note: Lingui does allow a [`defaultComponent` prop](https://lingui.dev/ref/react#i18nprovider) to wrap all translatable strings rendered in a `<Trans />` with a `<Text />` component. However, for the purpose of being explicit about what is being rendered, we just use Lingui _without_ the default component.)

### Extraction

Once you've added new translatable messages to the app via either `<Trans />` or `` t`...` ``, run `yarn extract` to extract the new strings to `locales/{locale}/messages.po`.

### Compilation

After messages have been extracted via `yarn extract`, run `yarn compile` to compile them to TypeScript files that can be read by the codebase.

## Redux

We use [Redux](https://redux.js.org/) for state management in Prax Mobile, along with [Redux Toolkit](https://redux-toolkit.js.org/).

### Typed hooks

To use `redux-react`'s `useSelector` and `useDispatch` hooks, do not import them directly. Instead, import the typed versions from `@/store/hooks`, which are bound to our store's TypeScript types.

### The `secureStore` slice

You can use the `secureStore` slice in Redux like any other state slice, but note that all data in `secureStore` will be persisted to encrypted on-device storage, which persists between device and app restarts. So, only store data in that slice that is meant to be persisted, such as private keys, user preferences, etc.

Note that we use secure storage regardless of the sensitivity of the data. So, both the user's full viewing key and the user's default payment token are stored in encrypted storage.

If you're developing a screen that sets data in secure storage but also sets temporary state data that shouldn't be persisted, the pattern we use is to create a separate slice for that screen that only contains the temporary data. For example, `<DefaultPaymentTokenScreen />` uses the `defaultPaymentTokenScreen` slice to maintain its screen state (such as, for example, the contents of the text field on the screen) and the `secureStore` slice to store the user's preferred payment token.

The slice can be consumed and updated just like any other slice (via `useAppSelector()` and `useAppDispatch()`), and can have its shape modified just like any other slice (in `store/secureStore.ts`). The persistence is accomplished via [`redux-persist`](https://github.com/rt2zz/redux-persist) and [redux-persist-expo-securestore](https://github.com/Cretezy/redux-persist-expo-securestore), using [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) under the hood. See `store/index.ts` to see how it's configured.

## Weird issues/gotchas

### Importing `@penumbra-zone/*` packages

For some reason, although TypeScript and Storybook understand imports from `@penumbra-zone/...`, Expo often does not, and expects the import to come from e.g., inside `dist/`. This should be fixed; but in the meantime, `metro.config.cjs` temporarily patches these imports using an alias.
