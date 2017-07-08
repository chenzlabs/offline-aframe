# offline-aframe
Example of making A-Frame suitable for offline usage by avoiding CDN references.

# Usage
```
<script src="build.js">
<a-assets><a-offline-cdn-assets></a-offline-cdn-assets></a-assets>`
```
Note that you need both `build.js` and the `controllers` and `fonts` directories.

# Example
`index.html`  

# How to run the example
`npm install` to install dependencies;
`npm start` to run at `localhost:8080`, or
`npm run build` to generate build.js, controllers and fonts directories.

# Known Issues
Unfortunately, the list of controller files to preload in `src/preload-controllers.js`
(as well as the font files in `src/preload-fonts.js`)
and the accompanying preload file map in `src/index.js` are manually generated right now,
rather than trying to interrogate the filesystem at build time.
