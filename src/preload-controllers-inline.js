// Include the controller models the hard way (have to enumerate all of them)


var CONTROLLER_INLINE_MAP = {
  'oculus/' : {
    'oculus-touch-controller-left.obj':
require('url-loader?name=controllers/oculus/[name].[ext]!../node_modules/aframe-assets/controllers/oculus/oculus-touch-controller-left.obj'),
    'oculus-touch-controller-left.mtl':
require('url-loader?name=controllers/oculus/[name].[ext]!../node_modules/aframe-assets/controllers/oculus/oculus-touch-controller-left.mtl'),
    'oculus-touch-controller-right.obj':
require('url-loader?name=controllers/oculus/[name].[ext]!../node_modules/aframe-assets/controllers/oculus/oculus-touch-controller-right.obj'),
    'oculus-touch-controller-right.mtl':
require('url-loader?name=controllers/oculus/[name].[ext]!../node_modules/aframe-assets/controllers/oculus/oculus-touch-controller-right.mtl'),
    'external_controller01_col.png':
require('url-loader?name=controllers/oculus/[name].[ext]!../node_modules/aframe-assets/controllers/oculus/external_controller01_col.png'),
  },
  'vive/' : {
    'vr_controller_vive.obj':
require('url-loader?name=controllers/vive/[name].[ext]!../node_modules/aframe-assets/controllers/vive/vr_controller_vive.obj'),
    'vr_controller_vive.mtl':
require('url-loader?name=controllers/vive/[name].[ext]!../node_modules/aframe-assets/controllers/vive/vr_controller_vive.mtl'),
  },
  'samsung/' : {
    'gear_vr_controller.obj':
require('url-loader?name=controllers/samsung/[name].[ext]!../node_modules/aframe-assets/controllers/samsung/gear_vr_controller.obj'),
    'gear_vr_controller.mtl':
require('url-loader?name=controllers/samsung/[name].[ext]!../node_modules/aframe-assets/controllers/samsung/gear_vr_controller.mtl'),
  },
  'google/' : {
    'vr_controller_daydream.obj':
require('url-loader?name=controllers/google/[name].[ext]!../node_modules/aframe-assets/controllers/google/vr_controller_daydream.obj'),
    'vr_controller_daydream.mtl':
require('url-loader?name=controllers/google/[name].[ext]!../node_modules/aframe-assets/controllers/google/vr_controller_daydream.mtl'),
    'vr_controller_daydream_tex.png':
require('url-loader?name=controllers/google/[name].[ext]!../node_modules/aframe-assets/controllers/google/vr_controller_daydream_tex.png'),
  },
  'oculus-hands/v2/' : {
    'leftHand.json':
require('url-loader?name=controllers/oculus-hands-v2/[name].[ext]!../node_modules/aframe-assets/controllers/oculus-hands/v2/leftHand.json'),
    'rightHand.json':
require('url-loader?name=controllers/oculus-hands-v2/[name].[ext]!../node_modules/aframe-assets/controllers/oculus-hands/v2/rightHand.json'),
  },
};

// Due to need to monkey-patch, fonts should not use CDN, but rather root

var FONT_INLINE_MAP = {
  '' : {
    'Roboto-msdf.png':
require('url-loader?name=fonts/[name].[ext]!../node_modules/aframe-assets/fonts/Roboto-msdf.png'),
  },
};

var PRELOAD_INLINE_CDN_MAP = {
  'controllers/': CONTROLLER_INLINE_MAP,
};

var PRELOAD_INLINE_RELATIVE_MAP = {
  'fonts/': FONT_INLINE_MAP
};

// Done via a child element of a-assets here, similar to a-asset-item.
// (Need to work on monkey-patch for fonts.)

AFRAME.registerElement('a-inline-cdn-assets', {
  prototype: Object.create(AFRAME.ANode.prototype, {
    createdCallback: { value: function () {
      var self = this;
      var el = document.createElement('a-offline-cdn-fonts');
      self.parentElement.appendChild(el);
      Object.keys(PRELOAD_INLINE_CDN_MAP).forEach(function (type) {
        var dirs = PRELOAD_INLINE_CDN_MAP[type];
        Object.keys(dirs).forEach(function (dir) {
          var files = dirs[dir];
          var urlprefix = type + dir;
          Object.keys(files).forEach(function (file) {
            console.log(urlprefix + file);
            var el = document.createElement('a-inline-cdn-asset');
            el.setAttribute('src', urlprefix + file);
            el.setAttribute('inline', files[file]);
            self.parentElement.appendChild(el);
          });
        });
      });
      Object.keys(PRELOAD_INLINE_RELATIVE_MAP).forEach(function (type) {
        var dirs = PRELOAD_INLINE_RELATIVE_MAP[type];
        Object.keys(dirs).forEach(function (dir) {
          var files = dirs[dir];
          var urlprefix = type + dir;
          Object.keys(files).forEach(function (file) {
            console.log(urlprefix + file);
            var el = document.createElement('a-inline-asset');
            el.setAttribute('src', urlprefix + file);
            el.setAttribute('inline', files[file]);
            self.parentElement.appendChild(el);
          });
        });
      });
    }}
  })
});

