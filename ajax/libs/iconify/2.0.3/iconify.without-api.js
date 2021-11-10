/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt or license.gpl.txt
* files at https://github.com/iconify/iconify
*
* Licensed under Apache 2.0 or GPL 2.0 at your option.
* If derivative product is not compatible with one of licenses, you can pick one of licenses.
*
* @license Apache 2.0
* @license GPL 2.0
*/
var Iconify = (function () {
	'use strict';

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var icon = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.fullIcon = exports.iconDefaults = exports.minifyProps = exports.matchName = void 0;
	/**
	 * Expression to test part of icon name.
	 */
	exports.matchName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
	/**
	 * Properties that can be minified
	 *
	 * Values of all these properties are awalys numbers
	 */
	exports.minifyProps = [
	    // All IconifyDimenisons properties
	    'width',
	    'height',
	    'top',
	    'left' ];
	/**
	 * Default values for all optional IconifyIcon properties
	 */
	exports.iconDefaults = Object.freeze({
	    left: 0,
	    top: 0,
	    width: 16,
	    height: 16,
	    rotate: 0,
	    vFlip: false,
	    hFlip: false,
	});
	/**
	 * Add optional properties to icon
	 */
	function fullIcon(data) {
	    return Object.assign({}, exports.iconDefaults, data);
	}
	exports.fullIcon = fullIcon;
	});

	var merge = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.mergeIconData = void 0;

	/**
	 * Merge icon and alias
	 */
	function mergeIconData(icon$1, alias) {
	    var result = Object.assign({}, icon$1);
	    for (var key in icon.iconDefaults) {
	        var prop = key;
	        if (alias[prop] !== void 0) {
	            var value = alias[prop];
	            if (result[prop] === void 0) {
	                // Missing value
	                result[prop] = value;
	                continue;
	            }
	            switch (prop) {
	                case 'rotate':
	                    result[prop] =
	                        (result[prop] + value) % 4;
	                    break;
	                case 'hFlip':
	                case 'vFlip':
	                    result[prop] = value !== result[prop];
	                    break;
	                default:
	                    // Overwrite value
	                    result[prop] =
	                        value;
	            }
	        }
	    }
	    return result;
	}
	exports.mergeIconData = mergeIconData;
	});

	var parse = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseIconSet = void 0;


	/**
	 * Get list of defaults keys
	 */
	var defaultsKeys = Object.keys(icon.iconDefaults);
	/**
	 * Resolve alias
	 */
	function resolveAlias(alias, icons, aliases, level) {
	    if ( level === void 0 ) level = 0;

	    var parent = alias.parent;
	    if (icons[parent] !== void 0) {
	        return merge.mergeIconData(icons[parent], alias);
	    }
	    if (aliases[parent] !== void 0) {
	        if (level > 2) {
	            // icon + alias + alias + alias = too much nesting, possibly infinite
	            return null;
	        }
	        var icon = resolveAlias(aliases[parent], icons, aliases, level + 1);
	        if (icon) {
	            return merge.mergeIconData(icon, alias);
	        }
	    }
	    return null;
	}
	/**
	 * Extract icons from an icon set
	 */
	function parseIconSet(data, callback, list) {
	    if ( list === void 0 ) list = 'none';

	    var added = [];
	    // Must be an object
	    if (typeof data !== 'object') {
	        return list === 'none' ? false : added;
	    }
	    // Check for missing icons list returned by API
	    if (data.not_found instanceof Array) {
	        data.not_found.forEach(function (name) {
	            callback(name, null);
	            if (list === 'all') {
	                added.push(name);
	            }
	        });
	    }
	    // Must have 'icons' object
	    if (typeof data.icons !== 'object') {
	        return list === 'none' ? false : added;
	    }
	    // Get default values
	    var defaults = Object.create(null);
	    defaultsKeys.forEach(function (key) {
	        if (data[key] !== void 0 && typeof data[key] !== 'object') {
	            defaults[key] = data[key];
	        }
	    });
	    // Get icons
	    var icons = data.icons;
	    Object.keys(icons).forEach(function (name) {
	        var icon$1 = icons[name];
	        if (typeof icon$1.body !== 'string') {
	            return;
	        }
	        // Freeze icon to make sure it will not be modified
	        callback(name, Object.freeze(Object.assign({}, icon.iconDefaults, defaults, icon$1)));
	        added.push(name);
	    });
	    // Get aliases
	    if (typeof data.aliases === 'object') {
	        var aliases = data.aliases;
	        Object.keys(aliases).forEach(function (name) {
	            var icon$1 = resolveAlias(aliases[name], icons, aliases, 1);
	            if (icon$1) {
	                // Freeze icon to make sure it will not be modified
	                callback(name, Object.freeze(Object.assign({}, icon.iconDefaults, defaults, icon$1)));
	                added.push(name);
	            }
	        });
	    }
	    return list === 'none' ? added.length > 0 : added;
	}
	exports.parseIconSet = parseIconSet;
	});

	var name = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.validateIcon = exports.stringToIcon = void 0;

	/**
	 * Convert string to Icon object.
	 */
	var stringToIcon = function (value, validate, allowSimpleName, provider) {
	    if ( provider === void 0 ) provider = '';

	    var colonSeparated = value.split(':');
	    // Check for provider with correct '@' at start
	    if (value.slice(0, 1) === '@') {
	        // First part is provider
	        if (colonSeparated.length < 2 || colonSeparated.length > 3) {
	            // "@provider:prefix:name" or "@provider:prefix-name"
	            return null;
	        }
	        provider = colonSeparated.shift().slice(1);
	    }
	    // Check split by colon: "prefix:name", "provider:prefix:name"
	    if (colonSeparated.length > 3 || !colonSeparated.length) {
	        return null;
	    }
	    if (colonSeparated.length > 1) {
	        // "prefix:name"
	        var name$1 = colonSeparated.pop();
	        var prefix = colonSeparated.pop();
	        var result = {
	            // Allow provider without '@': "provider:prefix:name"
	            provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
	            prefix: prefix,
	            name: name$1,
	        };
	        return validate && !exports.validateIcon(result) ? null : result;
	    }
	    // Attempt to split by dash: "prefix-name"
	    var name = colonSeparated[0];
	    var dashSeparated = name.split('-');
	    if (dashSeparated.length > 1) {
	        var result$1 = {
	            provider: provider,
	            prefix: dashSeparated.shift(),
	            name: dashSeparated.join('-'),
	        };
	        return validate && !exports.validateIcon(result$1) ? null : result$1;
	    }
	    // If allowEmpty is set, allow empty provider and prefix, allowing names like "home"
	    if (allowSimpleName && provider === '') {
	        var result$2 = {
	            provider: provider,
	            prefix: '',
	            name: name,
	        };
	        return validate && !exports.validateIcon(result$2, allowSimpleName)
	            ? null
	            : result$2;
	    }
	    return null;
	};
	exports.stringToIcon = stringToIcon;
	/**
	 * Check if icon is valid.
	 *
	 * This function is not part of stringToIcon because validation is not needed for most code.
	 */
	var validateIcon = function (icon$1, allowSimpleName) {
	    if (!icon$1) {
	        return false;
	    }
	    return !!((icon$1.provider === '' || icon$1.provider.match(icon.matchName)) &&
	        ((allowSimpleName && icon$1.prefix === '') ||
	            icon$1.prefix.match(icon.matchName)) &&
	        icon$1.name.match(icon.matchName));
	};
	exports.validateIcon = validateIcon;
	});

	var storage_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.listIcons = exports.getIcon = exports.iconExists = exports.addIcon = exports.addIconSet = exports.getStorage = exports.newStorage = void 0;


	/**
	 * Storage by provider and prefix
	 */
	var storage = Object.create(null);
	/**
	 * Create new storage
	 */
	function newStorage(provider, prefix) {
	    return {
	        provider: provider,
	        prefix: prefix,
	        icons: Object.create(null),
	        missing: Object.create(null),
	    };
	}
	exports.newStorage = newStorage;
	/**
	 * Get storage for provider and prefix
	 */
	function getStorage(provider, prefix) {
	    if (storage[provider] === void 0) {
	        storage[provider] = Object.create(null);
	    }
	    var providerStorage = storage[provider];
	    if (providerStorage[prefix] === void 0) {
	        providerStorage[prefix] = newStorage(provider, prefix);
	    }
	    return providerStorage[prefix];
	}
	exports.getStorage = getStorage;
	/**
	 * Add icon set to storage
	 *
	 * Returns array of added icons if 'list' is true and icons were added successfully
	 */
	function addIconSet(storage, data, list) {
	    if ( list === void 0 ) list = 'none';

	    var t = Date.now();
	    return parse.parseIconSet(data, function (name, icon) {
	        if (icon === null) {
	            storage.missing[name] = t;
	        }
	        else {
	            storage.icons[name] = icon;
	        }
	    }, list);
	}
	exports.addIconSet = addIconSet;
	/**
	 * Add icon to storage
	 */
	function addIcon(storage, name, icon$1) {
	    try {
	        if (typeof icon$1.body === 'string') {
	            // Freeze icon to make sure it will not be modified
	            storage.icons[name] = Object.freeze(icon.fullIcon(icon$1));
	            return true;
	        }
	    }
	    catch (err) {
	        // Do nothing
	    }
	    return false;
	}
	exports.addIcon = addIcon;
	/**
	 * Check if icon exists
	 */
	function iconExists(storage, name) {
	    return storage.icons[name] !== void 0;
	}
	exports.iconExists = iconExists;
	/**
	 * Get icon data
	 */
	function getIcon(storage, name) {
	    var value = storage.icons[name];
	    return value === void 0 ? null : value;
	}
	exports.getIcon = getIcon;
	/**
	 * List available icons
	 */
	function listIcons(provider, prefix) {
	    var allIcons = [];
	    // Get providers
	    var providers;
	    if (typeof provider === 'string') {
	        providers = [provider];
	    }
	    else {
	        providers = Object.keys(storage);
	    }
	    // Get all icons
	    providers.forEach(function (provider) {
	        var prefixes;
	        if (typeof provider === 'string' && typeof prefix === 'string') {
	            prefixes = [prefix];
	        }
	        else {
	            prefixes =
	                storage[provider] === void 0
	                    ? []
	                    : Object.keys(storage[provider]);
	        }
	        prefixes.forEach(function (prefix) {
	            var storage = getStorage(provider, prefix);
	            var icons = Object.keys(storage.icons).map(function (name) { return (provider !== '' ? '@' + provider + ':' : '') +
	                prefix +
	                ':' +
	                name; });
	            allIcons = allIcons.concat(icons);
	        });
	    });
	    return allIcons;
	}
	exports.listIcons = listIcons;
	});

	var functions$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.storageFunctions = exports.addCollection = exports.addIcon = exports.getIconData = exports.allowSimpleNames = void 0;



	/**
	 * Allow storing icons without provider or prefix, making it possible to store icons like "home"
	 */
	var simpleNames = false;
	function allowSimpleNames(allow) {
	    if (typeof allow === 'boolean') {
	        simpleNames = allow;
	    }
	    return simpleNames;
	}
	exports.allowSimpleNames = allowSimpleNames;
	/**
	 * Get icon data
	 */
	function getIconData(name$1) {
	    var icon = typeof name$1 === 'string' ? name.stringToIcon(name$1, true, simpleNames) : name$1;
	    return icon
	        ? storage_1.getIcon(storage_1.getStorage(icon.provider, icon.prefix), icon.name)
	        : null;
	}
	exports.getIconData = getIconData;
	/**
	 * Add one icon
	 */
	function addIcon(name$1, data) {
	    var icon = name.stringToIcon(name$1, true, simpleNames);
	    if (!icon) {
	        return false;
	    }
	    var storage = storage_1.getStorage(icon.provider, icon.prefix);
	    return storage_1.addIcon(storage, icon.name, data);
	}
	exports.addIcon = addIcon;
	/**
	 * Add icon set
	 */
	function addCollection(data, provider) {
	    if (typeof data !== 'object') {
	        return false;
	    }
	    // Get provider
	    if (typeof provider !== 'string') {
	        provider = typeof data.provider === 'string' ? data.provider : '';
	    }
	    // Check for simple names: requires empty provider and prefix
	    if (simpleNames &&
	        provider === '' &&
	        (typeof data.prefix !== 'string' || data.prefix === '')) {
	        // Simple names: add icons one by one
	        var added = false;
	        parse.parseIconSet(data, function (name, icon) {
	            if (icon !== null && addIcon(name, icon)) {
	                added = true;
	            }
	        });
	        return added;
	    }
	    // Validate provider and prefix
	    if (typeof data.prefix !== 'string' ||
	        !name.validateIcon({
	            provider: provider,
	            prefix: data.prefix,
	            name: 'a',
	        })) {
	        return false;
	    }
	    var storage = storage_1.getStorage(provider, data.prefix);
	    return !!storage_1.addIconSet(storage, data);
	}
	exports.addCollection = addCollection;
	/**
	 * Export
	 */
	exports.storageFunctions = {
	    // Check if icon exists
	    iconExists: function (name) { return getIconData(name) !== null; },
	    // Get raw icon data
	    getIcon: function (name) {
	        var result = getIconData(name);
	        return result ? Object.assign({}, result) : null;
	    },
	    // List icons
	    listIcons: storage_1.listIcons,
	    // Add icon
	    addIcon: addIcon,
	    // Add icon set
	    addCollection: addCollection,
	};
	});

	var id = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.replaceIDs = void 0;
	/**
	 * Regular expression for finding ids
	 */
	var regex = /\sid="(\S+)"/g;
	/**
	 * Match for allowed characters before and after id in replacement, including () for group
	 */
	var replaceValue = '([^A-Za-z0-9_-])';
	/**
	 * Escape value for 'new RegExp()'
	 */
	function escapeRegExp(str) {
	    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}
	/**
	 * New random-ish prefix for ids
	 */
	var randomPrefix = 'IconifyId-' +
	    Date.now().toString(16) +
	    '-' +
	    ((Math.random() * 0x1000000) | 0).toString(16) +
	    '-';
	/**
	 * Counter for ids, increasing with every replacement
	 */
	var counter = 0;
	/**
	 * Replace IDs in SVG output with unique IDs
	 * Fast replacement without parsing XML, assuming commonly used patterns and clean XML (icon should have been cleaned up with Iconify Tools or SVGO).
	 */
	function replaceIDs(body, prefix) {
	    if ( prefix === void 0 ) prefix = randomPrefix;

	    // Find all IDs
	    var ids = [];
	    var match;
	    while ((match = regex.exec(body))) {
	        ids.push(match[1]);
	    }
	    if (!ids.length) {
	        return body;
	    }
	    // Replace with unique ids
	    ids.forEach(function (id) {
	        var newID = typeof prefix === 'function' ? prefix() : prefix + counter++;
	        body = body.replace(new RegExp(replaceValue + '(' + escapeRegExp(id) + ')' + replaceValue, 'g'), '$1' + newID + '$3');
	    });
	    return body;
	}
	exports.replaceIDs = replaceIDs;
	});

	var size = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateSize = void 0;
	/**
	 * Regular expressions for calculating dimensions
	 */
	var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
	var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
	/**
	 * Calculate second dimension when only 1 dimension is set
	 *
	 * @param {string|number} size One dimension (such as width)
	 * @param {number} ratio Width/height ratio.
	 *      If size is width, ratio = height/width
	 *      If size is height, ratio = width/height
	 * @param {number} [precision] Floating number precision in result to minimize output. Default = 2
	 * @return {string|number} Another dimension
	 */
	function calculateSize(size, ratio, precision) {
	    if (ratio === 1) {
	        return size;
	    }
	    precision = precision === void 0 ? 100 : precision;
	    if (typeof size === 'number') {
	        return Math.ceil(size * ratio * precision) / precision;
	    }
	    if (typeof size !== 'string') {
	        return size;
	    }
	    // Split code into sets of strings and numbers
	    var oldParts = size.split(unitsSplit);
	    if (oldParts === null || !oldParts.length) {
	        return size;
	    }
	    var newParts = [];
	    var code = oldParts.shift();
	    var isNumber = unitsTest.test(code);
	    // eslint-disable-next-line no-constant-condition
	    while (true) {
	        if (isNumber) {
	            var num = parseFloat(code);
	            if (isNaN(num)) {
	                newParts.push(code);
	            }
	            else {
	                newParts.push(Math.ceil(num * ratio * precision) / precision);
	            }
	        }
	        else {
	            newParts.push(code);
	        }
	        // next
	        code = oldParts.shift();
	        if (code === void 0) {
	            return newParts.join('');
	        }
	        isNumber = !isNumber;
	    }
	}
	exports.calculateSize = calculateSize;
	});

	var customisations = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.mergeCustomisations = exports.defaults = void 0;
	/**
	 * Default icon customisations values
	 */
	exports.defaults = Object.freeze({
	    // Display mode
	    inline: false,
	    // Dimensions
	    width: null,
	    height: null,
	    // Alignment
	    hAlign: 'center',
	    vAlign: 'middle',
	    slice: false,
	    // Transformations
	    hFlip: false,
	    vFlip: false,
	    rotate: 0,
	});
	/**
	 * Convert IconifyIconCustomisations to FullIconCustomisations
	 */
	function mergeCustomisations(defaults, item) {
	    var result = {};
	    for (var key in defaults) {
	        var attr = key;
	        // Copy old value
	        result[attr] = defaults[attr];
	        if (item[attr] === void 0) {
	            continue;
	        }
	        // Validate new value
	        var value = item[attr];
	        switch (attr) {
	            // Boolean attributes that override old value
	            case 'inline':
	            case 'slice':
	                if (typeof value === 'boolean') {
	                    result[attr] = value;
	                }
	                break;
	            // Boolean attributes that are merged
	            case 'hFlip':
	            case 'vFlip':
	                if (value === true) {
	                    result[attr] = !result[attr];
	                }
	                break;
	            // Non-empty string
	            case 'hAlign':
	            case 'vAlign':
	                if (typeof value === 'string' && value !== '') {
	                    result[attr] = value;
	                }
	                break;
	            // Non-empty string / non-zero number / null
	            case 'width':
	            case 'height':
	                if ((typeof value === 'string' && value !== '') ||
	                    (typeof value === 'number' && value) ||
	                    value === null) {
	                    result[attr] = value;
	                }
	                break;
	            // Rotation
	            case 'rotate':
	                if (typeof value === 'number') {
	                    result[attr] += value;
	                }
	                break;
	        }
	    }
	    return result;
	}
	exports.mergeCustomisations = mergeCustomisations;
	});

	var build = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.iconToSVG = void 0;

	/**
	 * Get preserveAspectRatio value
	 */
	function preserveAspectRatio(props) {
	    var result = '';
	    switch (props.hAlign) {
	        case 'left':
	            result += 'xMin';
	            break;
	        case 'right':
	            result += 'xMax';
	            break;
	        default:
	            result += 'xMid';
	    }
	    switch (props.vAlign) {
	        case 'top':
	            result += 'YMin';
	            break;
	        case 'bottom':
	            result += 'YMax';
	            break;
	        default:
	            result += 'YMid';
	    }
	    result += props.slice ? ' slice' : ' meet';
	    return result;
	}
	/**
	 * Get SVG attributes and content from icon + customisations
	 *
	 * Does not generate style to make it compatible with frameworks that use objects for style, such as React.
	 * Instead, it generates 'inline' value. If true, rendering engine should add verticalAlign: -0.125em to icon.
	 *
	 * Customisations should be normalised by platform specific parser.
	 * Result should be converted to <svg> by platform specific parser.
	 * Use replaceIDs to generate unique IDs for body.
	 */
	function iconToSVG(icon, customisations) {
	    // viewBox
	    var box = {
	        left: icon.left,
	        top: icon.top,
	        width: icon.width,
	        height: icon.height,
	    };
	    // Body
	    var body = icon.body;
	    // Apply transformations
	    [icon, customisations].forEach(function (props) {
	        var transformations = [];
	        var hFlip = props.hFlip;
	        var vFlip = props.vFlip;
	        var rotation = props.rotate;
	        // Icon is flipped first, then rotated
	        if (hFlip) {
	            if (vFlip) {
	                rotation += 2;
	            }
	            else {
	                // Horizontal flip
	                transformations.push('translate(' +
	                    (box.width + box.left) +
	                    ' ' +
	                    (0 - box.top) +
	                    ')');
	                transformations.push('scale(-1 1)');
	                box.top = box.left = 0;
	            }
	        }
	        else if (vFlip) {
	            // Vertical flip
	            transformations.push('translate(' +
	                (0 - box.left) +
	                ' ' +
	                (box.height + box.top) +
	                ')');
	            transformations.push('scale(1 -1)');
	            box.top = box.left = 0;
	        }
	        var tempValue;
	        if (rotation < 0) {
	            rotation -= Math.floor(rotation / 4) * 4;
	        }
	        rotation = rotation % 4;
	        switch (rotation) {
	            case 1:
	                // 90deg
	                tempValue = box.height / 2 + box.top;
	                transformations.unshift('rotate(90 ' + tempValue + ' ' + tempValue + ')');
	                break;
	            case 2:
	                // 180deg
	                transformations.unshift('rotate(180 ' +
	                    (box.width / 2 + box.left) +
	                    ' ' +
	                    (box.height / 2 + box.top) +
	                    ')');
	                break;
	            case 3:
	                // 270deg
	                tempValue = box.width / 2 + box.left;
	                transformations.unshift('rotate(-90 ' + tempValue + ' ' + tempValue + ')');
	                break;
	        }
	        if (rotation % 2 === 1) {
	            // Swap width/height and x/y for 90deg or 270deg rotation
	            if (box.left !== 0 || box.top !== 0) {
	                tempValue = box.left;
	                box.left = box.top;
	                box.top = tempValue;
	            }
	            if (box.width !== box.height) {
	                tempValue = box.width;
	                box.width = box.height;
	                box.height = tempValue;
	            }
	        }
	        if (transformations.length) {
	            body =
	                '<g transform="' +
	                    transformations.join(' ') +
	                    '">' +
	                    body +
	                    '</g>';
	        }
	    });
	    // Calculate dimensions
	    var width, height;
	    if (customisations.width === null && customisations.height === null) {
	        // Set height to '1em', calculate width
	        height = '1em';
	        width = size.calculateSize(height, box.width / box.height);
	    }
	    else if (customisations.width !== null &&
	        customisations.height !== null) {
	        // Values are set
	        width = customisations.width;
	        height = customisations.height;
	    }
	    else if (customisations.height !== null) {
	        // Height is set
	        height = customisations.height;
	        width = size.calculateSize(height, box.width / box.height);
	    }
	    else {
	        // Width is set
	        width = customisations.width;
	        height = size.calculateSize(width, box.height / box.width);
	    }
	    // Check for 'auto'
	    if (width === 'auto') {
	        width = box.width;
	    }
	    if (height === 'auto') {
	        height = box.height;
	    }
	    // Convert to string
	    width = typeof width === 'string' ? width : width + '';
	    height = typeof height === 'string' ? height : height + '';
	    // Result
	    var result = {
	        attributes: {
	            width: width,
	            height: height,
	            preserveAspectRatio: preserveAspectRatio(customisations),
	            viewBox: box.left + ' ' + box.top + ' ' + box.width + ' ' + box.height,
	        },
	        body: body,
	    };
	    if (customisations.inline) {
	        result.inline = true;
	    }
	    return result;
	}
	exports.iconToSVG = iconToSVG;
	});

	var functions = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.builderFunctions = void 0;





	/**
	 * Exported builder functions
	 */
	exports.builderFunctions = {
	    replaceIDs: id.replaceIDs,
	    calculateSize: size.calculateSize,
	    buildIcon: function (icon$1, customisations$1) {
	        return build.iconToSVG(icon.fullIcon(icon$1), customisations.mergeCustomisations(customisations.defaults, customisations$1));
	    },
	};
	});

	/**
	 * Names of properties to add to nodes
	 */
	var elementFinderProperty = ('iconifyFinder' + Date.now());
	var elementDataProperty = ('iconifyData' + Date.now());

	/**
	 * Replace element with SVG
	 */
	function renderIcon(placeholder, customisations$1, iconData, returnString) {
	    // Create placeholder. Why placeholder? IE11 doesn't support innerHTML method on SVG.
	    var span;
	    try {
	        span = document.createElement('span');
	    }
	    catch (err) {
	        return returnString ? '' : null;
	    }
	    var data = build.iconToSVG(iconData, customisations.mergeCustomisations(customisations.defaults, customisations$1));
	    // Placeholder properties
	    var placeholderElement = placeholder.element;
	    var finder = placeholder.finder;
	    var name = placeholder.name;
	    // Get class name
	    var placeholderClassName = placeholderElement
	        ? placeholderElement.getAttribute('class')
	        : '';
	    var filteredClassList = finder
	        ? finder.classFilter(placeholderClassName ? placeholderClassName.split(/\s+/) : [])
	        : [];
	    var className = 'iconify iconify--' +
	        name.prefix +
	        (name.provider === '' ? '' : ' iconify--' + name.provider) +
	        (filteredClassList.length ? ' ' + filteredClassList.join(' ') : '');
	    // Generate SVG as string
	    var html = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="' +
	        className +
	        '">' +
	        id.replaceIDs(data.body) +
	        '</svg>';
	    // Set HTML for placeholder
	    span.innerHTML = html;
	    // Get SVG element
	    var svg = span.childNodes[0];
	    var svgStyle = svg.style;
	    // Add attributes
	    var svgAttributes = data.attributes;
	    Object.keys(svgAttributes).forEach(function (attr) {
	        svg.setAttribute(attr, svgAttributes[attr]);
	    });
	    // Add custom styles
	    if (data.inline) {
	        svgStyle.verticalAlign = '-0.125em';
	    }
	    // Copy stuff from placeholder
	    if (placeholderElement) {
	        // Copy attributes
	        var placeholderAttributes = placeholderElement.attributes;
	        for (var i = 0; i < placeholderAttributes.length; i++) {
	            var item = placeholderAttributes.item(i);
	            if (item) {
	                var name$1 = item.name;
	                if (name$1 !== 'class' &&
	                    name$1 !== 'style' &&
	                    svgAttributes[name$1] === void 0) {
	                    try {
	                        svg.setAttribute(name$1, item.value);
	                    }
	                    catch (err$1) { }
	                }
	            }
	        }
	        // Copy styles
	        var placeholderStyle = placeholderElement.style;
	        for (var i$1 = 0; i$1 < placeholderStyle.length; i$1++) {
	            var attr = placeholderStyle[i$1];
	            svgStyle[attr] = placeholderStyle[attr];
	        }
	    }
	    // Store finder specific data
	    if (finder) {
	        var elementData = {
	            name: name,
	            status: 'loaded',
	            customisations: customisations$1,
	        };
	        svg[elementDataProperty] = elementData;
	        svg[elementFinderProperty] = finder;
	    }
	    // Get result
	    var result = returnString ? span.innerHTML : svg;
	    // Replace placeholder
	    if (placeholderElement && placeholderElement.parentNode) {
	        placeholderElement.parentNode.replaceChild(svg, placeholderElement);
	    }
	    else {
	        // Placeholder has no parent? Remove SVG parent as well
	        span.removeChild(svg);
	    }
	    // Return new node
	    return result;
	}

	/**
	 * List of root nodes
	 */
	var nodes = [];
	/**
	 * Find node
	 */
	function findRootNode(node) {
	    for (var i = 0; i < nodes.length; i++) {
	        var item = nodes[i];
	        var root = typeof item.node === 'function' ? item.node() : item.node;
	        if (root === node) {
	            return item;
	        }
	    }
	}
	/**
	 * Add extra root node
	 */
	function addRootNode(root, autoRemove) {
	    if ( autoRemove === void 0 ) autoRemove = false;

	    var node = findRootNode(root);
	    if (node) {
	        // Node already exist: switch type if needed
	        if (node.temporary) {
	            node.temporary = autoRemove;
	        }
	        return node;
	    }
	    // Create item, add it to list, start observer
	    node = {
	        node: root,
	        temporary: autoRemove,
	    };
	    nodes.push(node);
	    return node;
	}
	/**
	 * Add document.body node
	 */
	function addBodyNode() {
	    if (document.documentElement) {
	        return addRootNode(document.documentElement);
	    }
	    nodes.push({
	        node: function () {
	            return document.documentElement;
	        },
	    });
	}
	/**
	 * Remove root node
	 */
	function removeRootNode(root) {
	    nodes = nodes.filter(function (node) {
	        var element = typeof node.node === 'function' ? node.node() : node.node;
	        return root !== element;
	    });
	}
	/**
	 * Get list of root nodes
	 */
	function listRootNodes() {
	    return nodes;
	}

	/**
	 * Execute function when DOM is ready
	 */
	function onReady(callback) {
	    var doc = document;
	    if (doc.readyState === 'complete' ||
	        (doc.readyState !== 'loading' &&
	            !doc.documentElement.doScroll)) {
	        callback();
	    }
	    else {
	        doc.addEventListener('DOMContentLoaded', callback);
	        window.addEventListener('load', callback);
	    }
	}

	/**
	 * Callback
	 */
	var callback = null;
	/**
	 * Parameters for mutation observer
	 */
	var observerParams = {
	    childList: true,
	    subtree: true,
	    attributes: true,
	};
	/**
	 * Queue DOM scan
	 */
	function queueScan(node) {
	    if (!node.observer) {
	        return;
	    }
	    var observer = node.observer;
	    if (!observer.pendingScan) {
	        observer.pendingScan = setTimeout(function () {
	            delete observer.pendingScan;
	            if (callback) {
	                callback(node);
	            }
	        });
	    }
	}
	/**
	 * Check mutations for added nodes
	 */
	function checkMutations(node, mutations) {
	    if (!node.observer) {
	        return;
	    }
	    var observer = node.observer;
	    if (!observer.pendingScan) {
	        for (var i = 0; i < mutations.length; i++) {
	            var item = mutations[i];
	            if (
	            // Check for added nodes
	            (item.addedNodes && item.addedNodes.length > 0) ||
	                // Check for icon or placeholder with modified attributes
	                (item.type === 'attributes' &&
	                    item.target[elementFinderProperty] !==
	                        void 0)) {
	                if (!observer.paused) {
	                    queueScan(node);
	                }
	                return;
	            }
	        }
	    }
	}
	/**
	 * Start/resume observer
	 */
	function observe(node, root) {
	    node.observer.instance.observe(root, observerParams);
	}
	/**
	 * Start mutation observer
	 */
	function startObserver(node) {
	    var observer = node.observer;
	    if (observer && observer.instance) {
	        // Already started
	        return;
	    }
	    var root = typeof node.node === 'function' ? node.node() : node.node;
	    if (!root) {
	        // document.body is not available yet
	        return;
	    }
	    if (!observer) {
	        observer = {
	            paused: 0,
	        };
	        node.observer = observer;
	    }
	    // Create new instance, observe
	    observer.instance = new MutationObserver(checkMutations.bind(null, node));
	    observe(node, root);
	    // Scan immediately
	    if (!observer.paused) {
	        queueScan(node);
	    }
	}
	/**
	 * Start all observers
	 */
	function startObservers() {
	    listRootNodes().forEach(startObserver);
	}
	/**
	 * Stop observer
	 */
	function stopObserver(node) {
	    if (!node.observer) {
	        return;
	    }
	    var observer = node.observer;
	    // Stop scan
	    if (observer.pendingScan) {
	        clearTimeout(observer.pendingScan);
	        delete observer.pendingScan;
	    }
	    // Disconnect observer
	    if (observer.instance) {
	        observer.instance.disconnect();
	        delete observer.instance;
	    }
	}
	/**
	 * Start observer when DOM is ready
	 */
	function initObserver(cb) {
	    var isRestart = callback !== null;
	    if (callback !== cb) {
	        // Change callback and stop all pending observers
	        callback = cb;
	        if (isRestart) {
	            listRootNodes().forEach(stopObserver);
	        }
	    }
	    if (isRestart) {
	        // Restart instances
	        startObservers();
	        return;
	    }
	    // Start observers when document is ready
	    onReady(startObservers);
	}
	/**
	 * Pause observer
	 */
	function pauseObserver(node) {
	    (node ? [node] : listRootNodes()).forEach(function (node) {
	        if (!node.observer) {
	            node.observer = {
	                paused: 1,
	            };
	            return;
	        }
	        var observer = node.observer;
	        observer.paused++;
	        if (observer.paused > 1 || !observer.instance) {
	            return;
	        }
	        // Disconnect observer
	        var instance = observer.instance;
	        // checkMutations(node, instance.takeRecords());
	        instance.disconnect();
	    });
	}
	/**
	 * Resume observer
	 */
	function resumeObserver(observer) {
	    (observer ? [observer] : listRootNodes()).forEach(function (node) {
	        if (!node.observer) {
	            // Start observer
	            startObserver(node);
	            return;
	        }
	        var observer = node.observer;
	        if (observer.paused) {
	            observer.paused--;
	            if (!observer.paused) {
	                // Start / resume
	                var root = typeof node.node === 'function' ? node.node() : node.node;
	                if (!root) {
	                    return;
	                }
	                else if (observer.instance) {
	                    observe(node, root);
	                }
	                else {
	                    startObserver(node);
	                }
	            }
	        }
	    });
	}
	/**
	 * Observe node
	 */
	function observeNode(root, autoRemove) {
	    if ( autoRemove === void 0 ) autoRemove = false;

	    var node = addRootNode(root, autoRemove);
	    startObserver(node);
	    return node;
	}
	/**
	 * Remove observed node
	 */
	function removeObservedNode(root) {
	    var node = findRootNode(root);
	    if (node) {
	        stopObserver(node);
	        removeRootNode(root);
	    }
	}

	var modules = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.coreModules = void 0;
	exports.coreModules = {};
	});

	/**
	 * List of modules
	 */
	var finders = [];
	/**
	 * Add module
	 */
	function addFinder(finder) {
	    if (finders.indexOf(finder) === -1) {
	        finders.push(finder);
	    }
	}
	/**
	 * Clean icon name: convert from string if needed and validate
	 */
	function cleanIconName(name$1) {
	    if (typeof name$1 === 'string') {
	        name$1 = name.stringToIcon(name$1);
	    }
	    return name$1 === null || !name.validateIcon(name$1) ? null : name$1;
	}
	/**
	 * Compare customisations. Returns true if identical
	 */
	function compareCustomisations(list1, list2) {
	    var keys1 = Object.keys(list1);
	    var keys2 = Object.keys(list2);
	    if (keys1.length !== keys2.length) {
	        return false;
	    }
	    for (var i = 0; i < keys1.length; i++) {
	        var key = keys1[i];
	        if (list2[key] !== list1[key]) {
	            return false;
	        }
	    }
	    return true;
	}
	/**
	 * Find all placeholders
	 */
	function findPlaceholders(root) {
	    var results = [];
	    finders.forEach(function (finder) {
	        var elements = finder.find(root);
	        Array.prototype.forEach.call(elements, function (item) {
	            var element = item;
	            if (element[elementFinderProperty] !== void 0 &&
	                element[elementFinderProperty] !== finder) {
	                // Element is assigned to a different finder
	                return;
	            }
	            // Get icon name
	            var name = cleanIconName(finder.name(element));
	            if (name === null) {
	                // Invalid name - do not assign this finder to element
	                return;
	            }
	            // Assign finder to element and add it to results
	            element[elementFinderProperty] = finder;
	            var placeholder = {
	                element: element,
	                finder: finder,
	                name: name,
	            };
	            results.push(placeholder);
	        });
	    });
	    // Find all modified SVG
	    var elements = root.querySelectorAll('svg.iconify');
	    Array.prototype.forEach.call(elements, function (item) {
	        var element = item;
	        var finder = element[elementFinderProperty];
	        var data = element[elementDataProperty];
	        if (!finder || !data) {
	            return;
	        }
	        // Get icon name
	        var name = cleanIconName(finder.name(element));
	        if (name === null) {
	            // Invalid name
	            return;
	        }
	        var updated = false;
	        var customisations;
	        if (name.prefix !== data.name.prefix || name.name !== data.name.name) {
	            updated = true;
	        }
	        else {
	            customisations = finder.customisations(element);
	            if (!compareCustomisations(data.customisations, customisations)) {
	                updated = true;
	            }
	        }
	        // Add item to results
	        if (updated) {
	            var placeholder = {
	                element: element,
	                finder: finder,
	                name: name,
	                customisations: customisations,
	            };
	            results.push(placeholder);
	        }
	    });
	    return results;
	}

	/**
	 * Flag to avoid scanning DOM too often
	 */
	var scanQueued = false;
	/**
	 * Icons have been loaded
	 */
	function checkPendingIcons() {
	    if (!scanQueued) {
	        scanQueued = true;
	        setTimeout(function () {
	            if (scanQueued) {
	                scanQueued = false;
	                scanDOM();
	            }
	        });
	    }
	}
	/**
	 * Compare Icon objects. Returns true if icons are identical.
	 *
	 * Note: null means icon is invalid, so null to null comparison = false.
	 */
	var compareIcons = function (icon1, icon2) {
	    return (icon1 !== null &&
	        icon2 !== null &&
	        icon1.name === icon2.name &&
	        icon1.prefix === icon2.prefix);
	};
	/**
	 * Scan node for placeholders
	 */
	function scanElement(root) {
	    // Add temporary node
	    var node = findRootNode(root);
	    if (!node) {
	        scanDOM({
	            node: root,
	            temporary: true,
	        }, true);
	    }
	    else {
	        scanDOM(node);
	    }
	}
	/**
	 * Scan DOM for placeholders
	 */
	function scanDOM(node, addTempNode) {
	    if ( addTempNode === void 0 ) addTempNode = false;

	    scanQueued = false;
	    // List of icons to load: [provider][prefix][name] = boolean
	    var loadIcons = Object.create(null);
	    // Get placeholders
	    (node ? [node] : listRootNodes()).forEach(function (node) {
	        var root = typeof node.node === 'function' ? node.node() : node.node;
	        if (!root || !root.querySelectorAll) {
	            return;
	        }
	        // Track placeholders
	        var hasPlaceholders = false;
	        // Observer
	        var paused = false;
	        // Find placeholders
	        findPlaceholders(root).forEach(function (item) {
	            var element = item.element;
	            var iconName = item.name;
	            var provider = iconName.provider;
	            var prefix = iconName.prefix;
	            var name = iconName.name;
	            var data = element[elementDataProperty];
	            // Icon has not been updated since last scan
	            if (data !== void 0 && compareIcons(data.name, iconName)) {
	                // Icon name was not changed and data is set - quickly return if icon is missing or still loading
	                switch (data.status) {
	                    case 'missing':
	                        return;
	                    case 'loading':
	                        if (modules.coreModules.api &&
	                            modules.coreModules.api.isPending({
	                                provider: provider,
	                                prefix: prefix,
	                                name: name,
	                            })) {
	                            // Pending
	                            hasPlaceholders = true;
	                            return;
	                        }
	                }
	            }
	            // Check icon
	            var storage = storage_1.getStorage(provider, prefix);
	            if (storage.icons[name] !== void 0) {
	                // Icon exists - pause observer before replacing placeholder
	                if (!paused && node.observer) {
	                    pauseObserver(node);
	                    paused = true;
	                }
	                // Get customisations
	                var customisations = item.customisations !== void 0
	                    ? item.customisations
	                    : item.finder.customisations(element);
	                // Render icon
	                renderIcon(item, customisations, storage_1.getIcon(storage, name));
	                return;
	            }
	            if (storage.missing[name]) {
	                // Mark as missing
	                data = {
	                    name: iconName,
	                    status: 'missing',
	                    customisations: {},
	                };
	                element[elementDataProperty] = data;
	                return;
	            }
	            if (modules.coreModules.api) {
	                if (!modules.coreModules.api.isPending({ provider: provider, prefix: prefix, name: name })) {
	                    // Add icon to loading queue
	                    if (loadIcons[provider] === void 0) {
	                        loadIcons[provider] = Object.create(null);
	                    }
	                    var providerLoadIcons = loadIcons[provider];
	                    if (providerLoadIcons[prefix] === void 0) {
	                        providerLoadIcons[prefix] = Object.create(null);
	                    }
	                    providerLoadIcons[prefix][name] = true;
	                }
	            }
	            // Mark as loading
	            data = {
	                name: iconName,
	                status: 'loading',
	                customisations: {},
	            };
	            element[elementDataProperty] = data;
	            hasPlaceholders = true;
	        });
	        // Node stuff
	        if (node.temporary && !hasPlaceholders) {
	            // Remove temporary node
	            removeObservedNode(root);
	        }
	        else if (addTempNode && hasPlaceholders) {
	            // Add new temporary node
	            observeNode(root, true);
	        }
	        else if (paused && node.observer) {
	            // Resume observer
	            resumeObserver(node);
	        }
	    });
	    // Load icons
	    if (modules.coreModules.api) {
	        var api = modules.coreModules.api;
	        Object.keys(loadIcons).forEach(function (provider) {
	            var providerLoadIcons = loadIcons[provider];
	            Object.keys(providerLoadIcons).forEach(function (prefix) {
	                api.loadIcons(Object.keys(providerLoadIcons[prefix]).map(function (name) {
	                    var icon = {
	                        provider: provider,
	                        prefix: prefix,
	                        name: name,
	                    };
	                    return icon;
	                }), checkPendingIcons);
	            });
	        });
	    }
	}

	var rotate = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.rotateFromString = void 0;
	/**
	 * Get rotation value
	 */
	function rotateFromString(value) {
	    var units = value.replace(/^-?[0-9.]*/, '');
	    function cleanup(value) {
	        while (value < 0) {
	            value += 4;
	        }
	        return value % 4;
	    }
	    if (units === '') {
	        var num = parseInt(value);
	        return isNaN(num) ? 0 : cleanup(num);
	    }
	    else if (units !== value) {
	        var split = 0;
	        switch (units) {
	            case '%':
	                // 25% -> 1, 50% -> 2, ...
	                split = 25;
	                break;
	            case 'deg':
	                // 90deg -> 1, 180deg -> 2, ...
	                split = 90;
	        }
	        if (split) {
	            var num$1 = parseFloat(value.slice(0, value.length - units.length));
	            if (isNaN(num$1)) {
	                return 0;
	            }
	            num$1 = num$1 / split;
	            return num$1 % 1 === 0 ? cleanup(num$1) : 0;
	        }
	    }
	    return 0;
	}
	exports.rotateFromString = rotateFromString;
	});

	var shorthand = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.alignmentFromString = exports.flipFromString = void 0;
	var separator = /[\s,]+/;
	/**
	 * Apply "flip" string to icon customisations
	 */
	function flipFromString(custom, flip) {
	    flip.split(separator).forEach(function (str) {
	        var value = str.trim();
	        switch (value) {
	            case 'horizontal':
	                custom.hFlip = true;
	                break;
	            case 'vertical':
	                custom.vFlip = true;
	                break;
	        }
	    });
	}
	exports.flipFromString = flipFromString;
	/**
	 * Apply "align" string to icon customisations
	 */
	function alignmentFromString(custom, align) {
	    align.split(separator).forEach(function (str) {
	        var value = str.trim();
	        switch (value) {
	            case 'left':
	            case 'center':
	            case 'right':
	                custom.hAlign = value;
	                break;
	            case 'top':
	            case 'middle':
	            case 'bottom':
	                custom.vAlign = value;
	                break;
	            case 'slice':
	            case 'crop':
	                custom.slice = true;
	                break;
	            case 'meet':
	                custom.slice = false;
	        }
	    });
	}
	exports.alignmentFromString = alignmentFromString;
	});

	/**
	 * Check if attribute exists
	 */
	function hasAttribute(element, key) {
	    return element.hasAttribute(key);
	}
	/**
	 * Get attribute value
	 */
	function getAttribute(element, key) {
	    return element.getAttribute(key);
	}
	/**
	 * Get attribute value
	 */
	function getBooleanAttribute(element, key) {
	    var value = element.getAttribute(key);
	    if (value === key || value === 'true') {
	        return true;
	    }
	    if (value === '' || value === 'false') {
	        return false;
	    }
	    return null;
	}
	/**
	 * Boolean attributes
	 */
	var booleanAttributes = [
	    'inline',
	    'hFlip',
	    'vFlip' ];
	/**
	 * String attributes
	 */
	var stringAttributes = [
	    'width',
	    'height' ];
	/**
	 * Class names
	 */
	var mainClass = 'iconify';
	var inlineClass = 'iconify-inline';
	/**
	 * Selector combining class names and tags
	 */
	var selector = 'i.' +
	    mainClass +
	    ', span.' +
	    mainClass +
	    ', i.' +
	    inlineClass +
	    ', span.' +
	    inlineClass;
	/**
	 * Export finder for:
	 *  <span class="iconify" />
	 *  <i class="iconify" />
	 *  <span class="iconify-inline" />
	 *  <i class="iconify-inline" />
	 */
	var finder = {
	    /**
	     * Find all elements
	     */
	    find: function (root) { return root.querySelectorAll(selector); },
	    /**
	     * Get icon name from element
	     */
	    name: function (element) {
	        if (hasAttribute(element, 'data-icon')) {
	            return getAttribute(element, 'data-icon');
	        }
	        return null;
	    },
	    /**
	     * Get customisations list from element
	     */
	    customisations: function (element, defaultValues) {
	        if ( defaultValues === void 0 ) defaultValues = {
	        inline: false,
	    };

	        var result = defaultValues;
	        // Check class list for inline class
	        var className = element.getAttribute('class');
	        var classList = className ? className.split(/\s+/) : [];
	        if (classList.indexOf(inlineClass) !== -1) {
	            result.inline = true;
	        }
	        // Rotation
	        if (hasAttribute(element, 'data-rotate')) {
	            var value = rotate.rotateFromString(getAttribute(element, 'data-rotate'));
	            if (value) {
	                result.rotate = value;
	            }
	        }
	        // Shorthand attributes
	        if (hasAttribute(element, 'data-flip')) {
	            shorthand.flipFromString(result, getAttribute(element, 'data-flip'));
	        }
	        if (hasAttribute(element, 'data-align')) {
	            shorthand.alignmentFromString(result, getAttribute(element, 'data-align'));
	        }
	        // Boolean attributes
	        booleanAttributes.forEach(function (attr) {
	            if (hasAttribute(element, 'data-' + attr)) {
	                var value = getBooleanAttribute(element, 'data-' + attr);
	                if (typeof value === 'boolean') {
	                    result[attr] = value;
	                }
	            }
	        });
	        // String attributes
	        stringAttributes.forEach(function (attr) {
	            if (hasAttribute(element, 'data-' + attr)) {
	                var value = getAttribute(element, 'data-' + attr);
	                if (value !== '') {
	                    result[attr] = value;
	                }
	            }
	        });
	        return result;
	    },
	    /**
	     * Filter classes
	     */
	    classFilter: function (classList) {
	        var result = [];
	        classList.forEach(function (className) {
	            if (className !== 'iconify' &&
	                className !== '' &&
	                className.slice(0, 9) !== 'iconify--') {
	                result.push(className);
	            }
	        });
	        return result;
	    },
	};

	// import { finder as iconifyIconFinder } from './finders/iconify-icon';
	/**
	 * Get SVG data
	 */
	function buildIcon(name, customisations$1) {
	    // Get icon data
	    var iconData = functions$1.getIconData(name);
	    if (!iconData) {
	        return null;
	    }
	    // Clean up customisations
	    var changes = customisations.mergeCustomisations(customisations.defaults, customisations$1);
	    // Get data
	    return build.iconToSVG(iconData, changes);
	}
	/**
	 * Generate icon
	 */
	function generateIcon(name$1, customisations$1, returnString) {
	    // Get icon data
	    var iconData = functions$1.getIconData(name$1);
	    if (!iconData) {
	        return null;
	    }
	    // Split name
	    var iconName = name.stringToIcon(name$1);
	    // Clean up customisations
	    var changes = customisations.mergeCustomisations(customisations.defaults, customisations$1);
	    // Get data
	    return renderIcon({
	        name: iconName,
	    }, changes, iconData, returnString);
	}
	/**
	 * Global variable
	 */
	var commonFunctions = {
	    // Version
	    getVersion: function () { return '2.0.3'; },
	    // Render SVG
	    renderSVG: function (name, customisations) {
	        return generateIcon(name, customisations, false);
	    },
	    renderHTML: function (name, customisations) {
	        return generateIcon(name, customisations, true);
	    },
	    // Get rendered icon as object that can be used to create SVG (use replaceIDs on body)
	    renderIcon: buildIcon,
	    // Scan DOM
	    scan: function (root) {
	        if (root) {
	            scanElement(root);
	        }
	        else {
	            scanDOM();
	        }
	    },
	    // Add root node
	    observe: function (root) {
	        observeNode(root);
	    },
	    // Remove root node
	    stopObserving: function (root) {
	        removeObservedNode(root);
	    },
	    // Pause observer
	    pauseObserver: function (root) {
	        if (root) {
	            var node = findRootNode(root);
	            if (node) {
	                pauseObserver(node);
	            }
	        }
	        else {
	            pauseObserver();
	        }
	    },
	    // Resume observer
	    resumeObserver: function (root) {
	        if (root) {
	            var node = findRootNode(root);
	            if (node) {
	                resumeObserver(node);
	            }
	        }
	        else {
	            resumeObserver();
	        }
	    },
	};
	/**
	 * Initialise stuff
	 */
	if (typeof document !== 'undefined' && typeof window !== 'undefined') {
	    // Add document.body node
	    addBodyNode();
	    // Add finder modules
	    // addFinder(iconifyIconFinder);
	    addFinder(finder);
	    var _window = window;
	    // Load icons from global "IconifyPreload"
	    if (_window.IconifyPreload !== void 0) {
	        var preload = _window.IconifyPreload;
	        var err = 'Invalid IconifyPreload syntax.';
	        if (typeof preload === 'object' && preload !== null) {
	            (preload instanceof Array ? preload : [preload]).forEach(function (item) {
	                try {
	                    if (
	                    // Check if item is an object and not null/array
	                    typeof item !== 'object' ||
	                        item === null ||
	                        item instanceof Array ||
	                        // Check for 'icons' and 'prefix'
	                        typeof item.icons !== 'object' ||
	                        typeof item.prefix !== 'string' ||
	                        // Add icon set
	                        !functions$1.storageFunctions.addCollection(item)) {
	                        console.error(err);
	                    }
	                }
	                catch (e) {
	                    console.error(err);
	                }
	            });
	        }
	    }
	    // Load observer and scan DOM on next tick
	    setTimeout(function () {
	        initObserver(scanDOM);
	        scanDOM();
	    });
	}

	/**
	 * Global variable
	 */
	var Iconify = {};
	// Merge with common functions
	[functions$1.storageFunctions, functions.builderFunctions, commonFunctions].forEach(function (list) {
	    for (var key in list) {
	        Iconify[key] = list[key];
	    }
	});

	return Iconify;

}());

// Export to window or web worker
try {
	if (self.Iconify === void 0) {
		self.Iconify = Iconify;
	}
} catch (err) {
}

// Export as ES module
if (typeof exports === 'object') {
	try {
		exports.__esModule = true;
		exports.default = Iconify;
	} catch (err) {
	}
}
