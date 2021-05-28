"use strict";
/**
 * Minifies and unminifies configs by replacing frequent keys
 * and values with one letter substitutes. Config options must
 * retain array position/index, add new options at the end.
 * @internal
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigMinifier = void 0;
var ConfigMinifier;
(function (ConfigMinifier) {
    const keys = [
        'settings',
        'hasHeaders',
        'constrainDragToContainer',
        'selectionEnabled',
        'dimensions',
        'borderWidth',
        'minItemHeight',
        'minItemWidth',
        'headerHeight',
        'dragProxyWidth',
        'dragProxyHeight',
        'labels',
        'close',
        'maximise',
        'minimise',
        'popout',
        'content',
        'componentType',
        'componentState',
        'id',
        'width',
        'type',
        'height',
        'isClosable',
        'title',
        'popoutWholeStack',
        'openPopouts',
        'parentId',
        'activeItemIndex',
        'reorderEnabled',
        'borderGrabWidth',
        //Maximum 36 entries, do not cross this line!
    ];
    const values = [
        true,
        false,
        'row',
        'column',
        'stack',
        'component',
        'close',
        'maximise',
        'minimise',
        'open in new window'
    ];
    function checkInitialise() {
        if (keys.length > 36) {
            throw new Error('Too many keys in config minifier map');
        }
    }
    ConfigMinifier.checkInitialise = checkInitialise;
    function translateObject(from, minify) {
        const to = {};
        for (const key in from) {
            if (from.hasOwnProperty(key)) { // In case something has extended Object prototypes
                let translatedKey;
                if (minify) {
                    translatedKey = minifyKey(key);
                }
                else {
                    translatedKey = unminifyKey(key);
                }
                const fromValue = from[key];
                to[translatedKey] = translateValue(fromValue, minify);
            }
        }
        return to;
    }
    ConfigMinifier.translateObject = translateObject;
    function translateArray(from, minify) {
        const length = from.length;
        const to = new Array(length);
        for (let i = 0; i < length; i++) {
            // In original code, array indices were numbers and not translated
            const fromValue = from[i];
            to[i] = translateValue(fromValue, minify);
        }
        return to;
    }
    function translateValue(from, minify) {
        if (typeof from === 'object') {
            if (from === null) {
                return null;
            }
            else {
                if (Array.isArray(from)) {
                    return translateArray(from, minify);
                }
                else {
                    return translateObject(from, minify);
                }
            }
        }
        else {
            if (minify) {
                return minifyValue(from);
            }
            else {
                return unminifyValue(from);
            }
        }
    }
    function minifyKey(value) {
        /**
         * If a value actually is a single character, prefix it
         * with ___ to avoid mistaking it for a minification code
         */
        if (typeof value === 'string' && value.length === 1) {
            return '___' + value;
        }
        const index = indexOfKey(value);
        /**
         * value not found in the dictionary, return it unmodified
         */
        if (index === -1) {
            return value;
            /**
             * value found in dictionary, return its base36 counterpart
             */
        }
        else {
            return index.toString(36);
        }
    }
    function unminifyKey(key) {
        /**
         * value is a single character. Assume that it's a translation
         * and return the original value from the dictionary
         */
        if (key.length === 1) {
            return keys[parseInt(key, 36)];
        }
        /**
         * value originally was a single character and was prefixed with ___
         * to avoid mistaking it for a translation. Remove the prefix
         * and return the original character
         */
        if (key.substr(0, 3) === '___') {
            return key[3];
        }
        /**
         * value was not minified
         */
        return key;
    }
    function minifyValue(value) {
        /**
         * If a value actually is a single character, prefix it
         * with ___ to avoid mistaking it for a minification code
         */
        if (typeof value === 'string' && value.length === 1) {
            return '___' + value;
        }
        const index = indexOfValue(value);
        /**
         * value not found in the dictionary, return it unmodified
         */
        if (index === -1) {
            return value;
            /**
             * value found in dictionary, return its base36 counterpart
             */
        }
        else {
            return index.toString(36);
        }
    }
    function unminifyValue(value) {
        /**
         * value is a single character. Assume that it's a translation
         * and return the original value from the dictionary
         */
        if (typeof value === 'string' && value.length === 1) {
            return values[parseInt(value, 36)];
        }
        /**
         * value originally was a single character and was prefixed with ___
         * to avoid mistaking it for a translation. Remove the prefix
         * and return the original character
         */
        if (typeof value === 'string' && value.substr(0, 3) === '___') {
            return value[3];
        }
        /**
         * value was not minified
         */
        return value;
    }
    function indexOfKey(key) {
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
                return i;
            }
        }
        return -1;
    }
    function indexOfValue(value) {
        for (let i = 0; i < values.length; i++) {
            if (values[i] === value) {
                return i;
            }
        }
        return -1;
    }
})(ConfigMinifier = exports.ConfigMinifier || (exports.ConfigMinifier = {}));
//# sourceMappingURL=config-minifier.js.map