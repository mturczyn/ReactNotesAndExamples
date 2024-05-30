# Switching from CRA to Vite

Mostly followed this link: [How to Migrate from create-react-app to Vite using Jest and Browserslist](https://www.freecodecamp.org/news/how-to-migrate-from-create-react-app-to-vite/).

Other useful site that helped [How to Migrate from create-react-app to Vite?](https://coreui.io/blog/how-to-migrate-create-react-app-to-vite/)

import.meta.env.NODE_ENV === 'development' => import.meta.env.DEV

import.meta.env.VITE_APP_CONFIG_URL,
  .get(import.meta.env.VITE_APP_CONFIG_URL!)

# The process of switching to Vite

- Install Vite
  Install vite dependencies:

  ```
  npm install --save-dev vite @vitejs/plugin-react
  ```

- Create config for Vite

  Create `vite.config.ts` - config file for Vite - in root directory.

- Move `index.html`

  Move `index.html` from public to root directory.

- Remove any `%PUBLIC_URL%`

  Remove any `%PUBLIC_URL%` in `index.html` file, as Vite automatically resolves URLs inside `index.html`.

- Add module script in `index.html`

  Add module script to the bottom of the body tag in `index.html`, as below

  ```
  <body>
  {/_ others here _/}
  <script type="module" src="/src/index.tsx"></script>
  </body>
  ```

- Add Vite scripts to the `package.json`

  Add Vite scripts to the `package.json` file, for example:

  ```
  {
      "scripts": {
          "start": "vite", // start dev server
          "build": "tsc && vite build", // build for production
          "preview": "vite preview" // locally preview production build
      }
  },
  ```

- Update `process.env` references and environment variables

  - Update `process.env.` to `import.meta.env.`.
  - Update environment variables from `REACT_*` to `VITE_*`

- Remove CRA (Create React App) dependencies

  To remove CRA, run the following commands:

  ```
  npm uninstall react-scripts
  ```

  Now we can try and clean all references to `react-scripts` from our `scripts` in `package.json`, completing the upgrade.

- Run the application

  Now, it should be possible to `npm start` the applicaiton. If it runs, the upgrade is complete.

# Unit tests

- download Jest dependencies (but they were already installed before)
  ```
  npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom
  ```
- adjust Jest configuration in `package.json`:

  ```
  "jest": {
    "preset": "ts-jest/presets/js-with-ts",
    "testEnvironment": "jest-environment-jsdom",
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    "modulePaths": [
        // you can update this to match your application setup
        "<rootDir>/src"
    ],
  },
  ```

  In our case, we had to adjust it slightly in a different way.

- add `__mocks__` directory to root director

  After creating `__mocks__` directory, add file named `styleMock.js` with content

  ```
  module.exports = {}
  ```

  and file `fileMock.js` with content:

  ```
  module.exports = 'test-file-stub'
  ```

- adjust `scripts` section of `package.json` file:
  ```
  "scripts": {
      "test": "jest",
      // you can add this to keep watch mode on
      "test:watch": "jest --watch",
      "test:coverage": "jest --coverage .",
      "test:debug": "jest --inspect-brk --runInBand --no-cache"
  }
  ```

# Other challenges

- error that `global` was not defined, so we had to update `vite.config.js` file with `define: { global: {} }`:

  ```
  export default defineConfig(() => {
      return {
          define: {
              global: {},
          },
          ...
      };
  });
  ```

- SASS issues

After switching fully to Vite, SASS sources started to throw errors (some deprecations and stuff).

Some of them were inside `bootstrap` library, so it was updated to latest 4.x.x version (but there are already 5.x.x versions).

Also we had to correct some of our SCSS files (small things, such as deprecated division operator).

- SVG issues

We had exports of SVG images in `src\app\shared\design\components\icon\svg\index.ts` specified like below:

```
export { ReactComponent as AddSVG } from './add.svg';
```

But they have stopped to work. In order to correct that, we had to:

- install `vite-plugin-svgr` library as dev dependency and import `svgr` plugin to `vite.config.js`:

  ```
  // ...
  import svgr from 'vite-plugin-svgr';

  export default defineConfig(() => {
      return {
          // ...
          plugins: [react(), svgr()],
      };
  });
  ```

- include
  ```
  /// <reference types="vite-plugin-svgr/client" />
  ```
  directive at the top of the file with SVG exports,
- change `export` to:
  ```
  import AddSVG from './add.svg?react';
  export { AddSVG }
  ```

– others
Upgraded bootstrap as it was throwing many erros.
Fixed SVG imports and exports. Also needed to install library as dev dependency.

# Things ommited from "CRA to Vite" manuals

Not all steps suggested in online manuals were applied.

We did not create `vite-env.d.ts` file, which supposedly should have the content:

```
/// <reference types="vite/client" />
```

The file should work as `react-app-env.d.ts` replacement, but we did not have that file neither.

And application works fine without it.
