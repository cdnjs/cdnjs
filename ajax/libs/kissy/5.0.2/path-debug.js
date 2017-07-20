/*
Copyright 2014, modulex-path@1.0.3
MIT Licensed
build time: Thu, 16 Oct 2014 03:54:36 GMT
*/
/*
combined modules:
path
*/
modulex.add("path", [], function(require, exports, module) {/**
 * @ignore
 * Port Node Utils For KISSY.
 * Note: Only posix mode.
 * @author yiminghe@gmail.com
 */
// [root, dir, basename, ext]
var splitPathRe = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/;

function splitPathToArray(str) {
    var arr = str.split(/\/+/);
    if (!arr[arr.length - 1]) {
        arr = arr.slice(0, -1);
    }
    if (!arr[0]) {
        arr = arr.slice(1);
    }
    return arr;
}

// Remove .. and . in path array
function normalizeArray(parts, allowAboveRoot) {
    // level above root
    var up = 0,
        i = parts.length - 1,
    // splice costs a lot in ie
    // use new array instead
        newParts = [],
        last;

    for (; i >= 0; i--) {
        last = parts[i];
        if (last !== '.') {
            if (last === '..') {
                up++;
            } else if (up) {
                up--;
            } else {
                newParts[newParts.length] = last;
            }
        }
    }

    // if allow above root, has to add ..
    if (allowAboveRoot) {
        for (; up--; up) {
            newParts[newParts.length] = '..';
        }
    }

    newParts = newParts.reverse();

    return newParts;
}

/**
 * Path Utils For KISSY.
 * @class KISSY.Path
 * @singleton
 */
var Path = {
    version: '1.0.3',

    _debug: '@DEBUG@',

    /**
     * resolve([from ...], to)
     * @return {String} Resolved path.
     */
    resolve: function () {
        var resolvedPath = '',
            resolvedPathStr,
            i,
            args = (arguments),
            path,
            absolute = 0;

        for (i = args.length - 1; i >= 0 && !absolute; i--) {
            path = args[i];
            if (typeof path !== 'string' || !path) {
                continue;
            }
            resolvedPath = path + '/' + resolvedPath;
            absolute = path.charAt(0) === '/';
        }

        resolvedPathStr = normalizeArray(splitPathToArray(resolvedPath), !absolute).join('/');

        return ((absolute ? '/' : '') + resolvedPathStr) || '.';
    },

    /**
     * normalize .. and . in path
     * @param {String} path Path tobe normalized
     *
     *
     *      'x/y/../z' => 'x/z'
     *      'x/y/z/../' => 'x/y/'
     *
     * @return {String}
     */
    normalize: function (path) {
        var absolute = path.charAt(0) === '/',
            trailingSlash = path.slice(0 - 1) === '/';

        path = normalizeArray(splitPathToArray(path), !absolute).join('/');

        if (!path && !absolute) {
            path = '.';
        }

        if (path && trailingSlash) {
            path += '/';
        }

        return (absolute ? '/' : '') + path;
    },

    /**
     * join([path ...]) and normalize
     * @return {String}
     */
    join: function () {
        var args = Array.prototype.slice.call(arguments);
        return Path.normalize(args.join('/'));
    },

    /**
     * Get string which is to relative to from
     * @param {String} from
     * @param {String} to
     *
     *
     *      relative('x/','x/y/z') => 'y/z'
     *      relative('x/t/z','x/') => '../..'
     *
     * @return {String}
     */
    relative: function (from, to) {
        from = Path.normalize(from);
        to = Path.normalize(to);

        var fromParts = splitPathToArray(from),
            path = [],
            sameIndex,
            sameIndex2,
            toParts = splitPathToArray(to),
            commonLength = Math.min(fromParts.length, toParts.length);

        for (sameIndex = 0; sameIndex < commonLength; sameIndex++) {
            if (fromParts[sameIndex] !== toParts[sameIndex]) {
                break;
            }
        }

        sameIndex2 = sameIndex;

        while (sameIndex < fromParts.length) {
            path.push('..');
            sameIndex++;
        }

        path = path.concat(toParts.slice(sameIndex2));

        return path.join('/');
    },

    /**
     * Get base name of path
     * @param {String} path
     * @param {String} [ext] ext to be stripped from result returned.
     * @return {String}
     */
    basename: function (path, ext) {
        var result = path.match(splitPathRe) || [],
            basename;
        basename = result[3] || '';
        if (ext && basename && basename.slice(ext.length * -1) === ext) {
            basename = basename.slice(0, -1 * ext.length);
        }
        return basename;
    },

    /**
     * Get dirname of path
     * @param {String} path
     * @return {String}
     */
    dirname: function (path) {
        var result = path.match(splitPathRe) || [],
            root = result[1] || '',
            dir = result[2] || '';

        if (!root && !dir) {
            // No dirname
            return '.';
        }

        if (dir) {
            // It has a dirname, strip trailing slash
            dir = dir.substring(0, dir.length - 1);
        }

        return root + dir;
    },

    /**
     * Get extension name of file in path
     * @param {String} path
     * @return {String}
     */
    extname: function (path) {
        return (path.match(splitPathRe) || [])[4] || '';
    }
};

module.exports = Path;
/*
 Refer
 - https://github.com/joyent/node/blob/master/lib/path.js
 */});