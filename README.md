<div align="center">
  <img src="https://raw.githubusercontent.com/sonnat/sonnat-ui/next/sonnat.svg" height="128">
  <h1 align="center">Create Sonnat App</h1>
</div>

<div align="center">

Set up a modern web app which is powered by Sonnat.

[![license](https://img.shields.io/github/license/sonnat/create-sonnat-app?color=EE3F7C&style=for-the-badge)](https://github.com/sonnat/create-sonnat-app/blob/main/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/create-sonnat-app?color=EE3F7C&style=for-the-badge)](https://www.npmjs.com/package/create-sonnat-app)
[![npm downloads](https://img.shields.io/npm/dt/create-sonnat-app?color=EE3F7C&style=for-the-badge)](https://www.npmjs.com/package/create-sonnat-app)
[![Follow us on Twitter](https://img.shields.io/twitter/follow/sonnatdesign?color=EE3F7C&label=follow%20us%20on%20twitter&style=for-the-badge)](https://twitter.com/sonnatdesign)

</div>

### Usage

```bash
yarn create sonnat-app <project-name> <project-template> [options]

# or
npx create-sonnat-app <project-name> <project-template> [options]
```
<hr />

**NOTE:** To bootstrap using `yarn` we recommend running `yarn create sonnat-app <project-name> <project-template> [options]` instead of `npx`.

**NOTE:** If you've previously installed `create-sonnat-app` globally via `npm install -g create-sonnat-app`, we recommend you uninstall the package using `npm uninstall -g create-sonnat-app` or `yarn global remove create-sonnat-app` to ensure that npx always uses the latest version.

**NOTE:** `npx` comes with npm 5.2+ and higher, for older npm versions install the CLI globally.

<hr />

### API

```
create-sonnat-app <project-directory> <template> [options]
(valid templates: nextjs, cra)

Options:
  -V, --version       output the version number
  --ts, --typescript  initialize as a TypeScript project. (default: false)
  --use-npm           explicitly tell the CLI to bootstrap the app using npm.
                      (default: false)
  -h, --help          display help for command
```

### Examples

```bash
# With NextJS
yarn create sonnat-app my-app nextjs

# With CRA (create-react-app) and TypeScript
yarn create sonnat-app my-app cra --typescript
```

### Community

The community can be found on [Github Discussions](https://github.com/sonnat/create-sonnat-app/discussions) | [Discord](https://discord.gg/h4Dpr4PnXW), where you can ask questions, voice ideas, and share your projects.
