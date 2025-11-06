// Shim to satisfy imports that expect the old UMD bundle path
// Load base zone.js then the testing entry for the installed version
require('zone.js');
require('zone.js/testing');
module.exports = {};
