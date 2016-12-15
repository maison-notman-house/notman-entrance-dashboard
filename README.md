
# Notman Entrance Dashboard Prototype

This project contains only the front-end of the dashboard. It's intended to run full-screen on a vertical (1080x1920) screen.

## Screenshot

![screenshot](screenshot.png)

## Components

The top-level component is [`src/components/dashboard.js`](src/components/dashboard.js).

## Contributing

You need to have `node.js` installed.

The dashboard is built with ES6 JavaScript and [React](https://facebook.github.io/react/) components.

### Build process

We use Webpack and Babel to transpile and bundle the JavaScript, which is contained in `src/`. The entry point is [`src/main.js`](src/main.js) and it gets bundled into `build/main.bundle.js`, and `assets/` contains the single HTML file and the styles and images, which all get copied to `build/`.

### How to develop

Install the module dependencies.
```
npm install
```

Run the localhost dev server.
```
npm start
```

This will run the webpack dev server. Open it at `http://localhost:8080`.

To build for deployment, run:

```
npm run build
```

The build will be placed in the `build/` directory.

TESTCHANGE--001

