/*syn@1.0.0-pre.1#syn*/
define([
    'require',
    'exports',
    'module',
    './synthetic',
    './keyboard-event-keys',
    './mouse.support',
    './browsers',
    './key.support',
    './drag'
], function (require, exports, module) {
    var syn = require('./synthetic');
    require('./keyboard-event-keys');
    require('./mouse.support');
    require('./browsers');
    require('./key.support');
    require('./drag');
    window.syn = syn;
    module.exports = syn;
});