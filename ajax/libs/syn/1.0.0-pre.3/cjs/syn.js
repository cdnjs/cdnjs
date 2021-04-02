/*syn@1.0.0-pre.2#syn*/
var syn = require('./synthetic.js');
require('./keyboard-event-keys.js');
require('./mouse.support.js');
require('./browsers.js');
require('./key.support.js');
require('./drag.js');
window.syn = syn;
module.exports = syn;