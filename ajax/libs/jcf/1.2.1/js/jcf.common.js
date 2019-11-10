'use strict';

window.jcf = require('./jcf');

require('./jcf.button');
require('./jcf.checkbox');
require('./jcf.file');
require('./jcf.number');
require('./jcf.radio');
require('./jcf.range');
require('./jcf.scrollable');
require('./jcf.select');
require('./jcf.textarea');

module.exports = window.jcf;

delete window.jcf;

