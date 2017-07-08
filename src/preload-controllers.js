// Include the controller models the hard way (have to enumerate all of them)

// oculus-touch-controls
require('file-loader?name=controllers/oculus/[name].[ext]!../node_modules/aframe-assets/controllers/oculus/oculus-touch-controller-left.obj');
require('file-loader?name=controllers/oculus/[name].[ext]!../node_modules/aframe-assets/controllers/oculus/oculus-touch-controller-left.mtl');
require('file-loader?name=controllers/oculus/[name].[ext]!../node_modules/aframe-assets/controllers/oculus/oculus-touch-controller-right.obj');
require('file-loader?name=controllers/oculus/[name].[ext]!../node_modules/aframe-assets/controllers/oculus/oculus-touch-controller-right.mtl');
require('file-loader?name=controllers/oculus/[name].[ext]!../node_modules/aframe-assets/controllers/oculus/external_controller01_col.png');

// vive-controls
require('file-loader?name=controllers/vive/[name].[ext]!../node_modules/aframe-assets/controllers/vive/vr_controller_vive.obj');
require('file-loader?name=controllers/vive/[name].[ext]!../node_modules/aframe-assets/controllers/vive/vr_controller_vive.mtl');

// gearvr-controls
require('file-loader?name=controllers/samsung/[name].[ext]!../node_modules/aframe-assets/controllers/samsung/gear_vr_controller.obj');
require('file-loader?name=controllers/samsung/[name].[ext]!../node_modules/aframe-assets/controllers/samsung/gear_vr_controller.mtl');

// daydream-controls
require('file-loader?name=controllers/google/[name].[ext]!../node_modules/aframe-assets/controllers/google/vr_controller_daydream.obj');
require('file-loader?name=controllers/google/[name].[ext]!../node_modules/aframe-assets/controllers/google/vr_controller_daydream.mtl');
require('file-loader?name=controllers/google/[name].[ext]!../node_modules/aframe-assets/controllers/google/vr_controller_daydream_tex.png');

// hand-controls
require('file-loader?name=controllers/oculus-hands/v2/[name].[ext]!../node_modules/aframe-assets/controllers/oculus-hands/v2/leftHand.json');
require('file-loader?name=controllers/oculus-hands/v2/[name].[ext]!../node_modules/aframe-assets/controllers/oculus-hands/v2/rightHand.json');
