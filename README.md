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
