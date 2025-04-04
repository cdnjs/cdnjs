'use strict';

var detectNode = typeof window === 'undefined';
var LOCAL_MODULE = /^\.+\//;

/**
 * 获取模板的绝对路径
 * @param   {string} filename
 * @param   {Object} options
 * @return  {string}
 */
var resolveFilename = function resolveFilename(filename, options) {
    /* istanbul ignore else  */
    if (detectNode) {
        var path = require('path');
        var root = options.root;
        var extname = options.extname;

        if (LOCAL_MODULE.test(filename)) {
            var from = options.filename;
            var self = !from || filename === from;
            var base = self ? root : path.dirname(from);
            filename = path.resolve(base, filename);
        } else {
            filename = path.resolve(root, filename);
        }

        if (!path.extname(filename)) {
            filename = filename + extname;
        }
    }

    return filename;
};

module.exports = resolveFilename;