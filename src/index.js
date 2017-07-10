require('./preload-fonts');
// require('./preload-controllers');

require('aframe');

require('./preload-controllers-inline');

var CDN_BASE_URL = 'https://cdn.aframe.io/';

// Note that pre-populating font URLs in THREE.Cache does not work, as loadBMFont does direct XHR.
// However, the font images could be pre-populated if desired.

var realLookupFont = AFRAME.components.text.Component.prototype.lookupFont;
function localLookupFont (key) {
  var realLookup = realLookupFont(key);
  if (!realLookup) { return realLookup; }
  return realLookup.replace(CDN_BASE_URL, ''); 
};

// Monkey-patch font lookup to use local, not CDN.

AFRAME.registerElement('a-offline-cdn-fonts', {
  prototype: Object.create(AFRAME.ANode.prototype, {
    createdCallback: { value: function () {
      AFRAME.components.text.Component.prototype.lookupFont = localLookupFont;
    }}
  })
});

// Pre-populate THREE Cache.

var cache = AFRAME.THREE.Cache;
cache.enabled = true;

function loadAndCache(path, cacheAsPath, resolve, reject) {
  var loader;
  if (cacheAsPath.indexOf('.png') >= 0) { loader = new THREE.ImageLoader(); }
  if (!loader) { loader = new THREE.FileLoader(); }
  loader.load(path, function (data) {
    cache.add(cacheAsPath, data);
    resolve(path);
  }, undefined, reject);
}

var CONTROLLER_FILE_PRELOAD_MAP = {
  'oculus' : [
    'external_controller01_col.png',
    'oculus-touch-controller-left.obj',
    'oculus-touch-controller-left.mtl',
    'oculus-touch-controller-right.obj',
    'oculus-touch-controller-right.mtl'
  ],
  'vive' : [
    'vr_controller_vive.obj',
    'vr_controller_vive.mtl'
  ],
  'samsung' : [
    'gear_vr_controller.obj',
    'gear_vr_controller.mtl',
  ],
  'google' : [
    'vr_controller_daydream.obj',
    'vr_controller_daydream.mtl',
    'vr_controller_daydream_tex.png'
  ],
  'oculus-hands/v2' : [
    'leftHand.json',
    'rightHand.json',
  ],
};

var PRELOAD_FILE_MAP = {
  'controllers': CONTROLLER_FILE_PRELOAD_MAP
};

// Done via a child element of a-assets here, similar to a-asset-item.
// (This require explicit specification of the CDN assets to be preloaded.)

AFRAME.registerElement('a-offline-asset', {
  prototype: Object.create(AFRAME.ANode.prototype, {
    createdCallback: { value: function () { this.isAssetItem = true; }},
    attachedCallback: { value: function () {
      var self = this;
      var src = this.getAttribute('src');
      var prefix = this.getAttribute('prefix') || '';
      loadAndCache('./' + src, prefix + src, 
        function () { AFRAME.ANode.prototype.load.call(self); },
        function () { self.emit('error', {src: src, el: self}); });
    }}
  })
});

// Done via a child element of a-assets here, similar to a-asset-item.
// (This require explicit specification of the CDN assets to be preloaded.)

AFRAME.registerElement('a-offline-cdn-asset', {
  prototype: Object.create(AFRAME.ANode.prototype, {
    createdCallback: { value: function () { this.isAssetItem = true; }},
    attachedCallback: { value: function () {
      var self = this;
      var src = this.getAttribute('src');
      var prefix = this.getAttribute('prefix') || CDN_BASE_URL;
      loadAndCache('./' + src, prefix + src, 
        function () { AFRAME.ANode.prototype.load.call(self); },
        function () { self.emit('error', {src: src, el: self}); });
    }}
  })
});

// Done via a child element of a-assets here, similar to a-asset-item.
// (This will automatically add all of PRELOAD_FILE_MAP, and monkey-patch fonts.)

AFRAME.registerElement('a-offline-cdn-assets', {
  prototype: Object.create(AFRAME.ANode.prototype, {
    createdCallback: { value: function () {
      var self = this;
      var el = document.createElement('a-offline-cdn-fonts');
      self.parentElement.appendChild(el);
      Object.keys(PRELOAD_FILE_MAP).forEach(function (type) {
        var dirs = PRELOAD_FILE_MAP[type];
        Object.keys(dirs).forEach(function (dir) {
          var files = dirs[dir];
          var urlprefix = type + '/' + dir + '/';
          files.forEach(function (file) {
            var el = document.createElement('a-offline-cdn-asset');
            el.setAttribute('src', urlprefix + file);
            self.parentElement.appendChild(el);
          });
        });
      });
    }}
  })
});

// Done via a child element of a-assets here, similar to a-asset-item.
// (This require explicit specification of the CDN assets to be preloaded.)

AFRAME.registerElement('a-inline-asset', {
  prototype: Object.create(AFRAME.ANode.prototype, {
    createdCallback: { value: function () { this.isAssetItem = true; }},
    attachedCallback: { value: function () {
      var self = this;
      var src = this.getAttribute('src');
      var prefix = this.getAttribute('prefix') || '';
      var inline = this.getAttribute('inline');
      loadAndCache(inline, prefix + src, 
        function () { AFRAME.ANode.prototype.load.call(self); },
        function () { self.emit('error', {src: src, el: self}); });
    }}
  })
});

// Done via a child element of a-assets here, similar to a-asset-item.
// (This require explicit specification of the CDN assets to be preloaded.)

AFRAME.registerElement('a-inline-cdn-asset', {
  prototype: Object.create(AFRAME.ANode.prototype, {
    createdCallback: { value: function () { this.isAssetItem = true; }},
    attachedCallback: { value: function () {
      var self = this;
      var src = this.getAttribute('src');
      var prefix = this.getAttribute('prefix') || CDN_BASE_URL;
      var inline = this.getAttribute('inline');
      loadAndCache(inline, prefix + src, 
        function () { AFRAME.ANode.prototype.load.call(self); },
        function () { self.emit('error', {src: src, el: self}); });
    }}
  })
});

