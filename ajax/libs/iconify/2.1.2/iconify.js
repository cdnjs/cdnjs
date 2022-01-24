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
* @version 2.1.2
*/
var Iconify = (function (exports) {
  'use strict';

  // src/icon/index.ts
  var matchName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  var iconDefaults = Object.freeze({
    left: 0,
    top: 0,
    width: 16,
    height: 16,
    rotate: 0,
    vFlip: false,
    hFlip: false
  });
  function fullIcon(data) {
    return Object.assign({}, iconDefaults, data);
  }

  // src/icon/merge.ts
  function mergeIconData(icon, alias) {
    var result = Object.assign({}, icon);
    for (var key in iconDefaults) {
      var prop = key;
      if (alias[prop] !== void 0) {
        var value = alias[prop];
        if (result[prop] === void 0) {
          result[prop] = value;
          continue;
        }
        switch (prop) {
          case "rotate":
            result[prop] = (result[prop] + value) % 4;
            break;
          case "hFlip":
          case "vFlip":
            result[prop] = value !== result[prop];
            break;
          default:
            result[prop] = value;
        }
      }
    }
    return result;
  }

  // src/icon-set/get-icon.ts
  function getIconData$1(data, name, full) {
    if ( full === void 0 ) full = false;

    function getIcon(name2, iteration) {
      var _a, _b, _c, _d;
      if (data.icons[name2] !== void 0) {
        return Object.assign({}, data.icons[name2]);
      }
      if (iteration > 5) {
        return null;
      }
      if (((_a = data.aliases) == null ? void 0 : _a[name2]) !== void 0) {
        var item = (_b = data.aliases) == null ? void 0 : _b[name2];
        var result2 = getIcon(item.parent, iteration + 1);
        if (result2) {
          return mergeIconData(result2, item);
        }
        return result2;
      }
      if (iteration === 0 && ((_c = data.chars) == null ? void 0 : _c[name2]) !== void 0) {
        return getIcon((_d = data.chars) == null ? void 0 : _d[name2], iteration + 1);
      }
      return null;
    }
    var result = getIcon(name, 0);
    if (result) {
      for (var key in iconDefaults) {
        if (result[key] === void 0 && data[key] !== void 0) {
          result[key] = data[key];
        }
      }
    }
    return result && full ? fullIcon(result) : result;
  }

  // src/icon-set/validate.ts
  var matchChar = /^[a-f0-9]+(-[a-f0-9]+)*$/;
  function validateIconProps(item, fix) {
    for (var key in item) {
      var attr = key;
      var value = item[attr];
      var type = typeof value;
      if (type === "undefined") {
        delete item[attr];
        continue;
      }
      switch (key) {
        case "body":
        case "parent":
          if (type !== "string") {
            return key;
          }
          break;
        case "hFlip":
        case "vFlip":
        case "hidden":
          if (type !== "boolean") {
            if (fix) {
              delete item[attr];
            } else {
              return key;
            }
          }
          break;
        case "width":
        case "height":
        case "left":
        case "top":
        case "rotate":
        case "inlineHeight":
        case "inlineTop":
        case "verticalAlign":
          if (type !== "number") {
            if (fix) {
              delete item[attr];
            } else {
              return key;
            }
          }
          break;
        default:
          if (type === "object") {
            if (fix) {
              delete item[attr];
            } else {
              return key;
            }
          }
      }
    }
    return null;
  }
  function validateIconSet(obj, options) {
    var fix = !!(options == null ? void 0 : options.fix);
    if (typeof obj !== "object" || obj === null || typeof obj.icons !== "object" || !obj.icons) {
      throw new Error("Bad icon set");
    }
    var data = obj;
    if (typeof (options == null ? void 0 : options.prefix) === "string") {
      data.prefix = options.prefix;
    } else if (typeof data.prefix !== "string" || !data.prefix.match(matchName)) {
      throw new Error("Invalid prefix");
    }
    if (typeof (options == null ? void 0 : options.provider) === "string") {
      data.provider = options.provider;
    } else if (data.provider !== void 0) {
      var value = data.provider;
      if (typeof value !== "string" || value !== "" && !value.match(matchName)) {
        if (fix) {
          delete data.provider;
        } else {
          throw new Error("Invalid provider");
        }
      }
    }
    var icons = data.icons;
    Object.keys(icons).forEach(function (name) {
      if (!name.match(matchName)) {
        if (fix) {
          delete icons[name];
          return;
        }
        throw new Error(("Invalid icon name: \"" + name + "\""));
      }
      var item = icons[name];
      if (typeof item !== "object" || item === null || typeof item.body !== "string") {
        if (fix) {
          delete icons[name];
          return;
        }
        throw new Error(("Invalid icon: \"" + name + "\""));
      }
      var key = typeof item.parent === "string" ? "parent" : validateIconProps(item, fix);
      if (key !== null) {
        if (fix) {
          delete icons[name];
          return;
        }
        throw new Error(("Invalid property \"" + key + "\" in icon \"" + name + "\""));
      }
    });
    if (!Object.keys(data.icons).length) {
      throw new Error("Icon set is empty");
    }
    if (data.aliases !== void 0) {
      if (typeof data.aliases !== "object" || data.aliases === null) {
        if (fix) {
          delete data.aliases;
        } else {
          throw new Error("Invalid aliases list");
        }
      }
    }
    if (typeof data.aliases === "object") {
      var validateAlias = function(name, iteration) {
        if (validatedAliases.has(name)) {
          return !failedAliases.has(name);
        }
        var item = aliases[name];
        if (iteration > 5 || typeof item !== "object" || item === null || typeof item.parent !== "string" || !name.match(matchName)) {
          if (fix) {
            delete aliases[name];
            failedAliases.add(name);
            return false;
          }
          throw new Error(("Invalid icon alias: \"" + name + "\""));
        }
        var parent = item.parent;
        if (data.icons[parent] === void 0) {
          if (aliases[parent] === void 0 || !validateAlias(parent, iteration + 1)) {
            if (fix) {
              delete aliases[name];
              failedAliases.add(name);
              return false;
            }
            throw new Error(("Missing parent icon for alias \"" + name));
          }
        }
        if (fix && item.body !== void 0) {
          delete item.body;
        }
        var key = item.body !== void 0 ? "body" : validateIconProps(item, fix);
        if (key !== null) {
          if (fix) {
            delete aliases[name];
            failedAliases.add(name);
            return false;
          }
          throw new Error(("Invalid property \"" + key + "\" in alias \"" + name + "\""));
        }
        validatedAliases.add(name);
        return true;
      };
      var aliases = data.aliases;
      var validatedAliases = new Set();
      var failedAliases = new Set();
      Object.keys(aliases).forEach(function (name) {
        validateAlias(name, 0);
      });
      if (fix && !Object.keys(data.aliases).length) {
        delete data.aliases;
      }
    }
    Object.keys(iconDefaults).forEach(function (prop) {
      var expectedType = typeof iconDefaults[prop];
      var actualType = typeof data[prop];
      if (actualType !== "undefined" && actualType !== expectedType) {
        throw new Error(("Invalid value type for \"" + prop + "\""));
      }
    });
    if (data.chars !== void 0) {
      if (typeof data.chars !== "object" || data.chars === null) {
        if (fix) {
          delete data.chars;
        } else {
          throw new Error("Invalid characters map");
        }
      }
    }
    if (typeof data.chars === "object") {
      var chars = data.chars;
      Object.keys(chars).forEach(function (char) {
        var _a;
        if (!char.match(matchChar) || typeof chars[char] !== "string") {
          if (fix) {
            delete chars[char];
            return;
          }
          throw new Error(("Invalid character \"" + char + "\""));
        }
        var target = chars[char];
        if (data.icons[target] === void 0 && ((_a = data.aliases) == null ? void 0 : _a[target]) === void 0) {
          if (fix) {
            delete chars[char];
            return;
          }
          throw new Error(("Character \"" + char + "\" points to missing icon \"" + target + "\""));
        }
      });
      if (fix && !Object.keys(data.chars).length) {
        delete data.chars;
      }
    }
    return data;
  }

  // src/icon-set/parse.ts
  function isVariation(item) {
    for (var key in iconDefaults) {
      if (item[key] !== void 0) {
        return true;
      }
    }
    return false;
  }
  function parseIconSet(data, callback, options) {
    options = options || {};
    var names = [];
    if (typeof data !== "object" || typeof data.icons !== "object") {
      return names;
    }
    var validate = options.validate;
    if (validate !== false) {
      try {
        validateIconSet(data, typeof validate === "object" ? validate : { fix: true });
      } catch (err) {
        return names;
      }
    }
    if (data.not_found instanceof Array) {
      data.not_found.forEach(function (name) {
        callback(name, null);
        names.push(name);
      });
    }
    var icons = data.icons;
    Object.keys(icons).forEach(function (name) {
      var iconData = getIconData$1(data, name, true);
      if (iconData) {
        callback(name, iconData);
        names.push(name);
      }
    });
    var parseAliases = options.aliases || "all";
    if (parseAliases !== "none" && typeof data.aliases === "object") {
      var aliases = data.aliases;
      Object.keys(aliases).forEach(function (name) {
        if (parseAliases === "variations" && isVariation(aliases[name])) {
          return;
        }
        var iconData = getIconData$1(data, name, true);
        if (iconData) {
          callback(name, iconData);
          names.push(name);
        }
      });
    }
    return names;
  }

  // src/icon/name.ts
  var stringToIcon = function (value, validate, allowSimpleName, provider) {
    if ( provider === void 0 ) provider = "";

    var colonSeparated = value.split(":");
    if (value.slice(0, 1) === "@") {
      if (colonSeparated.length < 2 || colonSeparated.length > 3) {
        return null;
      }
      provider = colonSeparated.shift().slice(1);
    }
    if (colonSeparated.length > 3 || !colonSeparated.length) {
      return null;
    }
    if (colonSeparated.length > 1) {
      var name2 = colonSeparated.pop();
      var prefix = colonSeparated.pop();
      var result = {
        provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
        prefix: prefix,
        name: name2
      };
      return validate && !validateIcon(result) ? null : result;
    }
    var name = colonSeparated[0];
    var dashSeparated = name.split("-");
    if (dashSeparated.length > 1) {
      var result$1 = {
        provider: provider,
        prefix: dashSeparated.shift(),
        name: dashSeparated.join("-")
      };
      return validate && !validateIcon(result$1) ? null : result$1;
    }
    if (allowSimpleName && provider === "") {
      var result$2 = {
        provider: provider,
        prefix: "",
        name: name
      };
      return validate && !validateIcon(result$2, allowSimpleName) ? null : result$2;
    }
    return null;
  };
  var validateIcon = function (icon, allowSimpleName) {
    if (!icon) {
      return false;
    }
    return !!((icon.provider === "" || icon.provider.match(matchName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchName)) && icon.name.match(matchName));
  };

  // src/storage/storage.ts
  var storageVersion = 1;
  var storage$1 = Object.create(null);
  try {
    var w = window || self;
    if ((w == null ? void 0 : w._iconifyStorage.version) === storageVersion) {
      storage$1 = w._iconifyStorage.storage;
    }
  } catch (err) {
  }
  function shareStorage() {
    try {
      var w = window || self;
      if (w && !w._iconifyStorage) {
        w._iconifyStorage = {
          version: storageVersion,
          storage: storage$1
        };
      }
    } catch (err) {
    }
  }
  function newStorage(provider, prefix) {
    return {
      provider: provider,
      prefix: prefix,
      icons: Object.create(null),
      missing: Object.create(null)
    };
  }
  function getStorage(provider, prefix) {
    if (storage$1[provider] === void 0) {
      storage$1[provider] = Object.create(null);
    }
    var providerStorage = storage$1[provider];
    if (providerStorage[prefix] === void 0) {
      providerStorage[prefix] = newStorage(provider, prefix);
    }
    return providerStorage[prefix];
  }
  function addIconSet(storage2, data) {
    var t = Date.now();
    return parseIconSet(data, function (name, icon) {
      if (icon) {
        storage2.icons[name] = icon;
      } else {
        storage2.missing[name] = t;
      }
    });
  }
  function addIconToStorage(storage2, name, icon) {
    try {
      if (typeof icon.body === "string") {
        storage2.icons[name] = Object.freeze(fullIcon(icon));
        return true;
      }
    } catch (err) {
    }
    return false;
  }
  function getIconFromStorage(storage2, name) {
    var value = storage2.icons[name];
    return value === void 0 ? null : value;
  }
  function listIcons(provider, prefix) {
    var allIcons = [];
    var providers;
    if (typeof provider === "string") {
      providers = [provider];
    } else {
      providers = Object.keys(storage$1);
    }
    providers.forEach(function (provider2) {
      var prefixes;
      if (typeof provider2 === "string" && typeof prefix === "string") {
        prefixes = [prefix];
      } else {
        prefixes = storage$1[provider2] === void 0 ? [] : Object.keys(storage$1[provider2]);
      }
      prefixes.forEach(function (prefix2) {
        var storage2 = getStorage(provider2, prefix2);
        var icons = Object.keys(storage2.icons).map(function (name) { return (provider2 !== "" ? "@" + provider2 + ":" : "") + prefix2 + ":" + name; });
        allIcons = allIcons.concat(icons);
      });
    });
    return allIcons;
  }

  // src/storage/functions.ts
  var simpleNames = false;
  function allowSimpleNames(allow) {
    if (typeof allow === "boolean") {
      simpleNames = allow;
    }
    return simpleNames;
  }
  function getIconData(name) {
    var icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
    return icon ? getIconFromStorage(getStorage(icon.provider, icon.prefix), icon.name) : null;
  }
  function addIcon(name, data) {
    var icon = stringToIcon(name, true, simpleNames);
    if (!icon) {
      return false;
    }
    var storage = getStorage(icon.provider, icon.prefix);
    return addIconToStorage(storage, icon.name, data);
  }
  function addCollection(data, provider) {
    if (typeof data !== "object") {
      return false;
    }
    if (typeof provider !== "string") {
      provider = typeof data.provider === "string" ? data.provider : "";
    }
    if (simpleNames && provider === "" && (typeof data.prefix !== "string" || data.prefix === "")) {
      var added = false;
      parseIconSet(data, function (name, icon) {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      }, {
        validate: {
          fix: true,
          prefix: ""
        }
      });
      return added;
    }
    if (typeof data.prefix !== "string" || !validateIcon({
      provider: provider,
      prefix: data.prefix,
      name: "a"
    })) {
      return false;
    }
    var storage = getStorage(provider, data.prefix);
    return !!addIconSet(storage, data);
  }
  function iconExists(name) {
    return getIconData(name) !== null;
  }
  function getIcon(name) {
    var result = getIconData(name);
    return result ? Object.assign({}, result) : null;
  }

  // src/customisations/index.ts
  var defaults = Object.freeze({
    inline: false,
    width: null,
    height: null,
    hAlign: "center",
    vAlign: "middle",
    slice: false,
    hFlip: false,
    vFlip: false,
    rotate: 0
  });
  function mergeCustomisations(defaults2, item) {
    var result = {};
    for (var key in defaults2) {
      var attr = key;
      result[attr] = defaults2[attr];
      if (item[attr] === void 0) {
        continue;
      }
      var value = item[attr];
      switch (attr) {
        case "inline":
        case "slice":
          if (typeof value === "boolean") {
            result[attr] = value;
          }
          break;
        case "hFlip":
        case "vFlip":
          if (value === true) {
            result[attr] = !result[attr];
          }
          break;
        case "hAlign":
        case "vAlign":
          if (typeof value === "string" && value !== "") {
            result[attr] = value;
          }
          break;
        case "width":
        case "height":
          if (typeof value === "string" && value !== "" || typeof value === "number" && value || value === null) {
            result[attr] = value;
          }
          break;
        case "rotate":
          if (typeof value === "number") {
            result[attr] += value;
          }
          break;
      }
    }
    return result;
  }

  // src/svg/size.ts
  var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
  var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
  function calculateSize(size, ratio, precision) {
    if (ratio === 1) {
      return size;
    }
    precision = precision === void 0 ? 100 : precision;
    if (typeof size === "number") {
      return Math.ceil(size * ratio * precision) / precision;
    }
    if (typeof size !== "string") {
      return size;
    }
    var oldParts = size.split(unitsSplit);
    if (oldParts === null || !oldParts.length) {
      return size;
    }
    var newParts = [];
    var code = oldParts.shift();
    var isNumber = unitsTest.test(code);
    while (true) {
      if (isNumber) {
        var num = parseFloat(code);
        if (isNaN(num)) {
          newParts.push(code);
        } else {
          newParts.push(Math.ceil(num * ratio * precision) / precision);
        }
      } else {
        newParts.push(code);
      }
      code = oldParts.shift();
      if (code === void 0) {
        return newParts.join("");
      }
      isNumber = !isNumber;
    }
  }

  // src/svg/build.ts
  function preserveAspectRatio(props) {
    var result = "";
    switch (props.hAlign) {
      case "left":
        result += "xMin";
        break;
      case "right":
        result += "xMax";
        break;
      default:
        result += "xMid";
    }
    switch (props.vAlign) {
      case "top":
        result += "YMin";
        break;
      case "bottom":
        result += "YMax";
        break;
      default:
        result += "YMid";
    }
    result += props.slice ? " slice" : " meet";
    return result;
  }
  function iconToSVG(icon, customisations) {
    var box = {
      left: icon.left,
      top: icon.top,
      width: icon.width,
      height: icon.height
    };
    var body = icon.body;
    [icon, customisations].forEach(function (props) {
      var transformations = [];
      var hFlip = props.hFlip;
      var vFlip = props.vFlip;
      var rotation = props.rotate;
      if (hFlip) {
        if (vFlip) {
          rotation += 2;
        } else {
          transformations.push("translate(" + (box.width + box.left) + " " + (0 - box.top) + ")");
          transformations.push("scale(-1 1)");
          box.top = box.left = 0;
        }
      } else if (vFlip) {
        transformations.push("translate(" + (0 - box.left) + " " + (box.height + box.top) + ")");
        transformations.push("scale(1 -1)");
        box.top = box.left = 0;
      }
      var tempValue;
      if (rotation < 0) {
        rotation -= Math.floor(rotation / 4) * 4;
      }
      rotation = rotation % 4;
      switch (rotation) {
        case 1:
          tempValue = box.height / 2 + box.top;
          transformations.unshift("rotate(90 " + tempValue + " " + tempValue + ")");
          break;
        case 2:
          transformations.unshift("rotate(180 " + (box.width / 2 + box.left) + " " + (box.height / 2 + box.top) + ")");
          break;
        case 3:
          tempValue = box.width / 2 + box.left;
          transformations.unshift("rotate(-90 " + tempValue + " " + tempValue + ")");
          break;
      }
      if (rotation % 2 === 1) {
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
        body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
      }
    });
    var width, height;
    if (customisations.width === null && customisations.height === null) {
      height = "1em";
      width = calculateSize(height, box.width / box.height);
    } else if (customisations.width !== null && customisations.height !== null) {
      width = customisations.width;
      height = customisations.height;
    } else if (customisations.height !== null) {
      height = customisations.height;
      width = calculateSize(height, box.width / box.height);
    } else {
      width = customisations.width;
      height = calculateSize(width, box.height / box.width);
    }
    if (width === "auto") {
      width = box.width;
    }
    if (height === "auto") {
      height = box.height;
    }
    width = typeof width === "string" ? width : width + "";
    height = typeof height === "string" ? height : height + "";
    var result = {
      attributes: {
        width: width,
        height: height,
        preserveAspectRatio: preserveAspectRatio(customisations),
        viewBox: box.left + " " + box.top + " " + box.width + " " + box.height
      },
      body: body
    };
    if (customisations.inline) {
      result.inline = true;
    }
    return result;
  }

  // src/builder/functions.ts
  function buildIcon(icon, customisations) {
    return iconToSVG(fullIcon(icon), customisations ? mergeCustomisations(defaults, customisations) : defaults);
  }

  // src/svg/id.ts
  var regex = /\sid="(\S+)"/g;
  var randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
  var counter = 0;
  function replaceIDs(body, prefix) {
    if ( prefix === void 0 ) prefix = randomPrefix;

    var ids = [];
    var match;
    while (match = regex.exec(body)) {
      ids.push(match[1]);
    }
    if (!ids.length) {
      return body;
    }
    ids.forEach(function (id) {
      var newID = typeof prefix === "function" ? prefix(id) : prefix + counter++;
      var escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + "$3");
    });
    return body;
  }

  // src/browser-storage/index.ts
  var cacheVersion = "iconify2";
  var cachePrefix = "iconify";
  var countKey = cachePrefix + "-count";
  var versionKey = cachePrefix + "-version";
  var hour = 36e5;
  var cacheExpiration = 168;
  var config = {
    local: true,
    session: true
  };
  var loaded = false;
  var count = {
    local: 0,
    session: 0
  };
  var emptyList = {
    local: [],
    session: []
  };
  var _window$2 = typeof window === "undefined" ? {} : window;
  function getGlobal$1(key) {
    var attr = key + "Storage";
    try {
      if (_window$2 && _window$2[attr] && typeof _window$2[attr].length === "number") {
        return _window$2[attr];
      }
    } catch (err) {
    }
    config[key] = false;
    return null;
  }
  function setCount(storage, key, value) {
    try {
      storage.setItem(countKey, value + "");
      count[key] = value;
      return true;
    } catch (err) {
      return false;
    }
  }
  function getCount(storage) {
    var count2 = storage.getItem(countKey);
    if (count2) {
      var total = parseInt(count2);
      return total ? total : 0;
    }
    return 0;
  }
  function initCache(storage, key) {
    try {
      storage.setItem(versionKey, cacheVersion);
    } catch (err) {
    }
    setCount(storage, key, 0);
  }
  function destroyCache(storage) {
    try {
      var total = getCount(storage);
      for (var i = 0; i < total; i++) {
        storage.removeItem(cachePrefix + i);
      }
    } catch (err) {
    }
  }
  var loadCache = function () {
    if (loaded) {
      return;
    }
    loaded = true;
    var minTime = Math.floor(Date.now() / hour) - cacheExpiration;
    function load(key) {
      var func = getGlobal$1(key);
      if (!func) {
        return;
      }
      var getItem = function (index) {
        var name = cachePrefix + index;
        var item = func.getItem(name);
        if (typeof item !== "string") {
          return false;
        }
        var valid = true;
        try {
          var data = JSON.parse(item);
          if (typeof data !== "object" || typeof data.cached !== "number" || data.cached < minTime || typeof data.provider !== "string" || typeof data.data !== "object" || typeof data.data.prefix !== "string") {
            valid = false;
          } else {
            var provider = data.provider;
            var prefix = data.data.prefix;
            var storage = getStorage(provider, prefix);
            valid = addIconSet(storage, data.data).length > 0;
          }
        } catch (err) {
          valid = false;
        }
        if (!valid) {
          func.removeItem(name);
        }
        return valid;
      };
      try {
        var version = func.getItem(versionKey);
        if (version !== cacheVersion) {
          if (version) {
            destroyCache(func);
          }
          initCache(func, key);
          return;
        }
        var total = getCount(func);
        for (var i = total - 1; i >= 0; i--) {
          if (!getItem(i)) {
            if (i === total - 1) {
              total--;
            } else {
              emptyList[key].push(i);
            }
          }
        }
        setCount(func, key, total);
      } catch (err) {
      }
    }
    for (var key in config) {
      load(key);
    }
  };
  var storeCache = function (provider, data) {
    if (!loaded) {
      loadCache();
    }
    function store(key) {
      if (!config[key]) {
        return false;
      }
      var func = getGlobal$1(key);
      if (!func) {
        return false;
      }
      var index = emptyList[key].shift();
      if (index === void 0) {
        index = count[key];
        if (!setCount(func, key, index + 1)) {
          return false;
        }
      }
      try {
        var item = {
          cached: Math.floor(Date.now() / hour),
          provider: provider,
          data: data
        };
        func.setItem(cachePrefix + index, JSON.stringify(item));
      } catch (err) {
        return false;
      }
      return true;
    }
    if (!store("local")) {
      store("session");
    }
  };

  // src/cache.ts
  var cache = {};

  // src/browser-storage/functions.ts
  function toggleBrowserCache(storage, value) {
    switch (storage) {
      case "local":
      case "session":
        config[storage] = value;
        break;
      case "all":
        for (var key in config) {
          config[key] = value;
        }
        break;
    }
  }

  // src/api/modules.ts
  var storage = Object.create(null);
  function setAPIModule(provider, item) {
    storage[provider] = item;
  }
  function getAPIModule(provider) {
    return storage[provider] || storage[""];
  }

  // src/api/config.ts
  function createAPIConfig(source) {
    var resources;
    if (typeof source.resources === "string") {
      resources = [source.resources];
    } else {
      resources = source.resources;
      if (!(resources instanceof Array) || !resources.length) {
        return null;
      }
    }
    var result = {
      resources: resources,
      path: source.path === void 0 ? "/" : source.path,
      maxURL: source.maxURL ? source.maxURL : 500,
      rotate: source.rotate ? source.rotate : 750,
      timeout: source.timeout ? source.timeout : 5e3,
      random: source.random === true,
      index: source.index ? source.index : 0,
      dataAfterTimeout: source.dataAfterTimeout !== false
    };
    return result;
  }
  var configStorage = Object.create(null);
  var fallBackAPISources = [
    "https://api.simplesvg.com",
    "https://api.unisvg.com"
  ];
  var fallBackAPI = [];
  while (fallBackAPISources.length > 0) {
    if (fallBackAPISources.length === 1) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      if (Math.random() > 0.5) {
        fallBackAPI.push(fallBackAPISources.shift());
      } else {
        fallBackAPI.push(fallBackAPISources.pop());
      }
    }
  }
  configStorage[""] = createAPIConfig({
    resources: ["https://api.iconify.design"].concat(fallBackAPI)
  });
  function addAPIProvider(provider, customConfig) {
    var config = createAPIConfig(customConfig);
    if (config === null) {
      return false;
    }
    configStorage[provider] = config;
    return true;
  }
  function getAPIConfig(provider) {
    return configStorage[provider];
  }
  function listAPIProviders() {
    return Object.keys(configStorage);
  }

  // src/api/params.ts
  var mergeParams = function (base, params) {
    var result = base, hasParams = result.indexOf("?") !== -1;
    function paramToString(value) {
      switch (typeof value) {
        case "boolean":
          return value ? "true" : "false";
        case "number":
          return encodeURIComponent(value);
        case "string":
          return encodeURIComponent(value);
        default:
          throw new Error("Invalid parameter");
      }
    }
    Object.keys(params).forEach(function (key) {
      var value;
      try {
        value = paramToString(params[key]);
      } catch (err) {
        return;
      }
      result += (hasParams ? "&" : "?") + encodeURIComponent(key) + "=" + value;
      hasParams = true;
    });
    return result;
  };

  // src/api/modules/jsonp.ts
  var rootVar = null;
  var rootVarName = null;
  var maxLengthCache$1 = Object.create(null);
  var pathCache$1 = Object.create(null);
  function hash(str) {
    var total = 0, i;
    for (i = str.length - 1; i >= 0; i--) {
      total += str.charCodeAt(i);
    }
    return total % 999;
  }
  function getGlobal() {
    if (rootVar === null) {
      var globalRoot = self;
      var prefix = "Iconify";
      var extraPrefix = ".cb";
      if (globalRoot[prefix] === void 0) {
        prefix = "IconifyJSONP";
        extraPrefix = "";
        if (globalRoot[prefix] === void 0) {
          globalRoot[prefix] = Object.create(null);
        }
        rootVar = globalRoot[prefix];
      } else {
        var iconifyRoot = globalRoot[prefix];
        if (iconifyRoot.cb === void 0) {
          iconifyRoot.cb = Object.create(null);
        }
        rootVar = iconifyRoot.cb;
      }
      rootVarName = prefix + extraPrefix + ".{cb}";
    }
    return rootVar;
  }
  function calculateMaxLength$1(provider, prefix) {
    var config = getAPIConfig(provider);
    if (!config) {
      return 0;
    }
    var result;
    if (!config.maxURL) {
      result = 0;
    } else {
      var maxHostLength = 0;
      config.resources.forEach(function (item) {
        var host = item;
        maxHostLength = Math.max(maxHostLength, host.length);
      });
      getGlobal();
      var url = mergeParams(prefix + ".js", {
        icons: "",
        callback: rootVarName
      });
      result = config.maxURL - maxHostLength - config.path.length - url.length;
    }
    var cacheKey = provider + ":" + prefix;
    pathCache$1[cacheKey] = config.path;
    maxLengthCache$1[cacheKey] = result;
    return result;
  }
  var prepare$1 = function (provider, prefix, icons) {
    var results = [];
    var cacheKey = provider + ":" + prefix;
    var maxLength = maxLengthCache$1[cacheKey];
    if (maxLength === void 0) {
      maxLength = calculateMaxLength$1(provider, prefix);
    }
    var type = "icons";
    var item = {
      type: type,
      provider: provider,
      prefix: prefix,
      icons: []
    };
    var length = 0;
    icons.forEach(function (name, index) {
      length += name.length + 1;
      if (length >= maxLength && index > 0) {
        results.push(item);
        item = {
          type: type,
          provider: provider,
          prefix: prefix,
          icons: []
        };
        length = name.length;
      }
      item.icons.push(name);
    });
    results.push(item);
    return results;
  };
  var send$1 = function (host, params, status) {
    if (params.type !== "icons") {
      status.done(void 0, 400);
      return;
    }
    var provider = params.provider;
    var prefix = params.prefix;
    var icons = params.icons;
    var iconsList = icons.join(",");
    var cacheKey = provider + ":" + prefix;
    var cbPrefix = prefix.split("-").shift().slice(0, 3);
    var global = getGlobal();
    var cbCounter = hash(provider + ":" + host + ":" + prefix + ":" + iconsList);
    while (global[cbPrefix + cbCounter] !== void 0) {
      cbCounter++;
    }
    var callbackName = cbPrefix + cbCounter;
    var url = mergeParams(prefix + ".js", {
      icons: iconsList,
      callback: rootVarName.replace("{cb}", callbackName)
    });
    var path = pathCache$1[cacheKey] + url;
    global[callbackName] = function (data) {
      delete global[callbackName];
      status.done(data);
    };
    var uri = host + path;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = uri;
    document.head.appendChild(script);
  };
  var jsonpAPIModule = { prepare: prepare$1, send: send$1 };

  // src/api/modules/fetch.ts
  var maxLengthCache = Object.create(null);
  var pathCache = Object.create(null);
  var detectFetch = function () {
    var callback;
    try {
      callback = fetch;
      if (typeof callback === "function") {
        return callback;
      }
    } catch (err) {
    }
    try {
      var chunk = String.fromCharCode(114) + String.fromCharCode(101);
      var req = global[chunk + "qui" + chunk];
      callback = req("cross-fetch");
      if (typeof callback === "function") {
        return callback;
      }
    } catch (err$1) {
    }
    return null;
  };
  var fetchModule = detectFetch();
  function setFetch$1(fetch2) {
    fetchModule = fetch2;
  }
  function getFetch() {
    return fetchModule;
  }
  function calculateMaxLength(provider, prefix) {
    var config = getAPIConfig(provider);
    if (!config) {
      return 0;
    }
    var result;
    if (!config.maxURL) {
      result = 0;
    } else {
      var maxHostLength = 0;
      config.resources.forEach(function (item) {
        var host = item;
        maxHostLength = Math.max(maxHostLength, host.length);
      });
      var url = mergeParams(prefix + ".json", {
        icons: ""
      });
      result = config.maxURL - maxHostLength - config.path.length - url.length;
    }
    var cacheKey = provider + ":" + prefix;
    pathCache[provider] = config.path;
    maxLengthCache[cacheKey] = result;
    return result;
  }
  var prepare = function (provider, prefix, icons) {
    var results = [];
    var maxLength = maxLengthCache[prefix];
    if (maxLength === void 0) {
      maxLength = calculateMaxLength(provider, prefix);
    }
    var type = "icons";
    var item = {
      type: type,
      provider: provider,
      prefix: prefix,
      icons: []
    };
    var length = 0;
    icons.forEach(function (name, index) {
      length += name.length + 1;
      if (length >= maxLength && index > 0) {
        results.push(item);
        item = {
          type: type,
          provider: provider,
          prefix: prefix,
          icons: []
        };
        length = name.length;
      }
      item.icons.push(name);
    });
    results.push(item);
    return results;
  };
  function getPath(provider) {
    if (typeof provider === "string") {
      if (pathCache[provider] === void 0) {
        var config = getAPIConfig(provider);
        if (!config) {
          return "/";
        }
        pathCache[provider] = config.path;
      }
      return pathCache[provider];
    }
    return "/";
  }
  var send = function (host, params, status) {
    if (!fetchModule) {
      status.done(void 0, 424);
      return;
    }
    var path = getPath(params.provider);
    switch (params.type) {
      case "icons": {
        var prefix = params.prefix;
        var icons = params.icons;
        var iconsList = icons.join(",");
        path += mergeParams(prefix + ".json", {
          icons: iconsList
        });
        break;
      }
      case "custom": {
        var uri = params.uri;
        path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
        break;
      }
      default:
        status.done(void 0, 400);
        return;
    }
    var defaultError = 503;
    fetchModule(host + path).then(function (response) {
      if (response.status !== 200) {
        setTimeout(function () {
          status.done(void 0, response.status);
        });
        return;
      }
      defaultError = 501;
      return response.json();
    }).then(function (data) {
      if (typeof data !== "object" || data === null) {
        setTimeout(function () {
          status.done(void 0, defaultError);
        });
        return;
      }
      setTimeout(function () {
        status.done(data);
      });
    }).catch(function () {
      status.done(void 0, defaultError);
    });
  };
  var fetchAPIModule = {
    prepare: prepare,
    send: send
  };

  // src/icon/sort.ts
  function sortIcons(icons) {
    var result = {
      loaded: [],
      missing: [],
      pending: []
    };
    var storage = Object.create(null);
    icons.sort(function (a, b) {
      if (a.provider !== b.provider) {
        return a.provider.localeCompare(b.provider);
      }
      if (a.prefix !== b.prefix) {
        return a.prefix.localeCompare(b.prefix);
      }
      return a.name.localeCompare(b.name);
    });
    var lastIcon = {
      provider: "",
      prefix: "",
      name: ""
    };
    icons.forEach(function (icon) {
      if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
        return;
      }
      lastIcon = icon;
      var provider = icon.provider;
      var prefix = icon.prefix;
      var name = icon.name;
      if (storage[provider] === void 0) {
        storage[provider] = Object.create(null);
      }
      var providerStorage = storage[provider];
      if (providerStorage[prefix] === void 0) {
        providerStorage[prefix] = getStorage(provider, prefix);
      }
      var localStorage = providerStorage[prefix];
      var list;
      if (localStorage.icons[name] !== void 0) {
        list = result.loaded;
      } else if (prefix === "" || localStorage.missing[name] !== void 0) {
        list = result.missing;
      } else {
        list = result.pending;
      }
      var item = {
        provider: provider,
        prefix: prefix,
        name: name
      };
      list.push(item);
    });
    return result;
  }

  // src/api/callbacks.ts
  var callbacks = Object.create(null);
  var pendingUpdates = Object.create(null);
  function removeCallback(sources, id) {
    sources.forEach(function (source) {
      var provider = source.provider;
      if (callbacks[provider] === void 0) {
        return;
      }
      var providerCallbacks = callbacks[provider];
      var prefix = source.prefix;
      var items = providerCallbacks[prefix];
      if (items) {
        providerCallbacks[prefix] = items.filter(function (row) { return row.id !== id; });
      }
    });
  }
  function updateCallbacks(provider, prefix) {
    if (pendingUpdates[provider] === void 0) {
      pendingUpdates[provider] = Object.create(null);
    }
    var providerPendingUpdates = pendingUpdates[provider];
    if (!providerPendingUpdates[prefix]) {
      providerPendingUpdates[prefix] = true;
      setTimeout(function () {
        providerPendingUpdates[prefix] = false;
        if (callbacks[provider] === void 0 || callbacks[provider][prefix] === void 0) {
          return;
        }
        var items = callbacks[provider][prefix].slice(0);
        if (!items.length) {
          return;
        }
        var storage = getStorage(provider, prefix);
        var hasPending = false;
        items.forEach(function (item) {
          var icons = item.icons;
          var oldLength = icons.pending.length;
          icons.pending = icons.pending.filter(function (icon) {
            if (icon.prefix !== prefix) {
              return true;
            }
            var name = icon.name;
            if (storage.icons[name] !== void 0) {
              icons.loaded.push({
                provider: provider,
                prefix: prefix,
                name: name
              });
            } else if (storage.missing[name] !== void 0) {
              icons.missing.push({
                provider: provider,
                prefix: prefix,
                name: name
              });
            } else {
              hasPending = true;
              return true;
            }
            return false;
          });
          if (icons.pending.length !== oldLength) {
            if (!hasPending) {
              removeCallback([
                {
                  provider: provider,
                  prefix: prefix
                }
              ], item.id);
            }
            item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
          }
        });
      });
    }
  }
  var idCounter = 0;
  function storeCallback(callback, icons, pendingSources) {
    var id = idCounter++;
    var abort = removeCallback.bind(null, pendingSources, id);
    if (!icons.pending.length) {
      return abort;
    }
    var item = {
      id: id,
      icons: icons,
      callback: callback,
      abort: abort
    };
    pendingSources.forEach(function (source) {
      var provider = source.provider;
      var prefix = source.prefix;
      if (callbacks[provider] === void 0) {
        callbacks[provider] = Object.create(null);
      }
      var providerCallbacks = callbacks[provider];
      if (providerCallbacks[prefix] === void 0) {
        providerCallbacks[prefix] = [];
      }
      providerCallbacks[prefix].push(item);
    });
    return abort;
  }

  // src/icon/list.ts
  function listToIcons(list, validate, simpleNames) {
    if ( validate === void 0 ) validate = true;
    if ( simpleNames === void 0 ) simpleNames = false;

    var result = [];
    list.forEach(function (item) {
      var icon = typeof item === "string" ? stringToIcon(item, false, simpleNames) : item;
      if (!validate || validateIcon(icon, simpleNames)) {
        result.push({
          provider: icon.provider,
          prefix: icon.prefix,
          name: icon.name
        });
      }
    });
    return result;
  }

  // src/config.ts
  var defaultConfig = {
    resources: [],
    index: 0,
    timeout: 2e3,
    rotate: 750,
    random: false,
    dataAfterTimeout: false
  };

  // src/query.ts
  function sendQuery(config, payload, query, done, success) {
    var resourcesCount = config.resources.length;
    var startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
    var resources;
    if (config.random) {
      var list = config.resources.slice(0);
      resources = [];
      while (list.length > 1) {
        var nextIndex = Math.floor(Math.random() * list.length);
        resources.push(list[nextIndex]);
        list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
      }
      resources = resources.concat(list);
    } else {
      resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
    }
    var startTime = Date.now();
    var status = "pending";
    var queriesSent = 0;
    var lastError = void 0;
    var timer = null;
    var queue = [];
    var doneCallbacks = [];
    if (typeof done === "function") {
      doneCallbacks.push(done);
    }
    function resetTimer() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
    function abort() {
      if (status === "pending") {
        status = "aborted";
      }
      resetTimer();
      queue.forEach(function (item) {
        if (item.abort) {
          item.abort();
        }
        if (item.status === "pending") {
          item.status = "aborted";
        }
      });
      queue = [];
    }
    function subscribe(callback, overwrite) {
      if (overwrite) {
        doneCallbacks = [];
      }
      if (typeof callback === "function") {
        doneCallbacks.push(callback);
      }
    }
    function getQueryStatus() {
      return {
        startTime: startTime,
        payload: payload,
        status: status,
        queriesSent: queriesSent,
        queriesPending: queue.length,
        subscribe: subscribe,
        abort: abort
      };
    }
    function failQuery() {
      status = "failed";
      doneCallbacks.forEach(function (callback) {
        callback(void 0, lastError);
      });
    }
    function clearQueue() {
      queue = queue.filter(function (item) {
        if (item.status === "pending") {
          item.status = "aborted";
        }
        if (item.abort) {
          item.abort();
        }
        return false;
      });
    }
    function moduleResponse(item, data, error) {
      var isError = data === void 0;
      queue = queue.filter(function (queued) { return queued !== item; });
      switch (status) {
        case "pending":
          break;
        case "failed":
          if (isError || !config.dataAfterTimeout) {
            return;
          }
          break;
        default:
          return;
      }
      if (isError) {
        if (error !== void 0) {
          lastError = error;
        }
        if (!queue.length) {
          if (!resources.length) {
            failQuery();
          } else {
            execNext();
          }
        }
        return;
      }
      resetTimer();
      clearQueue();
      if (success && !config.random) {
        var index = config.resources.indexOf(item.resource);
        if (index !== -1 && index !== config.index) {
          success(index);
        }
      }
      status = "completed";
      doneCallbacks.forEach(function (callback) {
        callback(data);
      });
    }
    function execNext() {
      if (status !== "pending") {
        return;
      }
      resetTimer();
      var resource = resources.shift();
      if (resource === void 0) {
        if (queue.length) {
          var timeout2 = typeof config.timeout === "function" ? config.timeout(startTime) : config.timeout;
          if (timeout2) {
            timer = setTimeout(function () {
              resetTimer();
              if (status === "pending") {
                clearQueue();
                failQuery();
              }
            }, timeout2);
            return;
          }
        }
        failQuery();
        return;
      }
      var item = {
        getQueryStatus: getQueryStatus,
        status: "pending",
        resource: resource,
        done: function (data, error) {
          moduleResponse(item, data, error);
        }
      };
      queue.push(item);
      queriesSent++;
      var timeout = typeof config.rotate === "function" ? config.rotate(queriesSent, startTime) : config.rotate;
      timer = setTimeout(execNext, timeout);
      query(resource, payload, item);
    }
    setTimeout(execNext);
    return getQueryStatus;
  }

  // src/index.ts
  function setConfig(config) {
    if (typeof config !== "object" || typeof config.resources !== "object" || !(config.resources instanceof Array) || !config.resources.length) {
      throw new Error("Invalid Reduncancy configuration");
    }
    var newConfig = Object.create(null);
    var key;
    for (key in defaultConfig) {
      if (config[key] !== void 0) {
        newConfig[key] = config[key];
      } else {
        newConfig[key] = defaultConfig[key];
      }
    }
    return newConfig;
  }
  function initRedundancy(cfg) {
    var config = setConfig(cfg);
    var queries = [];
    function cleanup() {
      queries = queries.filter(function (item) { return item().status === "pending"; });
    }
    function query(payload, queryCallback, doneCallback) {
      var query2 = sendQuery(config, payload, queryCallback, function (data, error) {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      }, function (newIndex) {
        config.index = newIndex;
      });
      queries.push(query2);
      return query2;
    }
    function find(callback) {
      var result = queries.find(function (value) {
        return callback(value);
      });
      return result !== void 0 ? result : null;
    }
    var instance = {
      query: query,
      find: find,
      setIndex: function (index) {
        config.index = index;
      },
      getIndex: function () { return config.index; },
      cleanup: cleanup
    };
    return instance;
  }

  // src/api/query.ts
  function emptyCallback$1() {
  }
  var redundancyCache = Object.create(null);
  function getRedundancyCache(provider) {
    if (redundancyCache[provider] === void 0) {
      var config = getAPIConfig(provider);
      if (!config) {
        return;
      }
      var redundancy = initRedundancy(config);
      var cachedReundancy = {
        config: config,
        redundancy: redundancy
      };
      redundancyCache[provider] = cachedReundancy;
    }
    return redundancyCache[provider];
  }
  function sendAPIQuery(target, query, callback) {
    var redundancy;
    var send;
    if (typeof target === "string") {
      var api = getAPIModule(target);
      if (!api) {
        callback(void 0, 424);
        return emptyCallback$1;
      }
      send = api.send;
      var cached = getRedundancyCache(target);
      if (cached) {
        redundancy = cached.redundancy;
      }
    } else {
      var config = createAPIConfig(target);
      if (config) {
        redundancy = initRedundancy(config);
        var moduleKey = target.resources ? target.resources[0] : "";
        var api$1 = getAPIModule(moduleKey);
        if (api$1) {
          send = api$1.send;
        }
      }
    }
    if (!redundancy || !send) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    return redundancy.query(query, send, callback)().abort;
  }

  // src/api/icons.ts
  function emptyCallback() {
  }
  var pendingIcons = Object.create(null);
  var iconsToLoad = Object.create(null);
  var loaderFlags = Object.create(null);
  var queueFlags = Object.create(null);
  function loadedNewIcons(provider, prefix) {
    if (loaderFlags[provider] === void 0) {
      loaderFlags[provider] = Object.create(null);
    }
    var providerLoaderFlags = loaderFlags[provider];
    if (!providerLoaderFlags[prefix]) {
      providerLoaderFlags[prefix] = true;
      setTimeout(function () {
        providerLoaderFlags[prefix] = false;
        updateCallbacks(provider, prefix);
      });
    }
  }
  var errorsCache = Object.create(null);
  function loadNewIcons(provider, prefix, icons) {
    function err() {
      var key = (provider === "" ? "" : "@" + provider + ":") + prefix;
      var time = Math.floor(Date.now() / 6e4);
      if (errorsCache[key] < time) {
        errorsCache[key] = time;
        console.error('Unable to retrieve icons for "' + key + '" because API is not configured properly.');
      }
    }
    if (iconsToLoad[provider] === void 0) {
      iconsToLoad[provider] = Object.create(null);
    }
    var providerIconsToLoad = iconsToLoad[provider];
    if (queueFlags[provider] === void 0) {
      queueFlags[provider] = Object.create(null);
    }
    var providerQueueFlags = queueFlags[provider];
    if (pendingIcons[provider] === void 0) {
      pendingIcons[provider] = Object.create(null);
    }
    var providerPendingIcons = pendingIcons[provider];
    if (providerIconsToLoad[prefix] === void 0) {
      providerIconsToLoad[prefix] = icons;
    } else {
      providerIconsToLoad[prefix] = providerIconsToLoad[prefix].concat(icons).sort();
    }
    if (!providerQueueFlags[prefix]) {
      providerQueueFlags[prefix] = true;
      setTimeout(function () {
        providerQueueFlags[prefix] = false;
        var icons2 = providerIconsToLoad[prefix];
        delete providerIconsToLoad[prefix];
        var api = getAPIModule(provider);
        if (!api) {
          err();
          return;
        }
        var params = api.prepare(provider, prefix, icons2);
        params.forEach(function (item) {
          sendAPIQuery(provider, item, function (data, error) {
            var storage = getStorage(provider, prefix);
            if (typeof data !== "object") {
              if (error !== 404) {
                return;
              }
              var t = Date.now();
              item.icons.forEach(function (name) {
                storage.missing[name] = t;
              });
            } else {
              try {
                var parsed = addIconSet(storage, data);
                if (!parsed.length) {
                  return;
                }
                var pending = providerPendingIcons[prefix];
                parsed.forEach(function (name) {
                  delete pending[name];
                });
                if (cache.store) {
                  cache.store(provider, data);
                }
              } catch (err2) {
                console.error(err2);
              }
            }
            loadedNewIcons(provider, prefix);
          });
        });
      });
    }
  }
  var isPending = function (icon) {
    var provider = icon.provider;
    var prefix = icon.prefix;
    return pendingIcons[provider] && pendingIcons[provider][prefix] && pendingIcons[provider][prefix][icon.name] !== void 0;
  };
  var loadIcons = function (icons, callback) {
    var cleanedIcons = listToIcons(icons, true, allowSimpleNames());
    var sortedIcons = sortIcons(cleanedIcons);
    if (!sortedIcons.pending.length) {
      var callCallback = true;
      if (callback) {
        setTimeout(function () {
          if (callCallback) {
            callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
          }
        });
      }
      return function () {
        callCallback = false;
      };
    }
    var newIcons = Object.create(null);
    var sources = [];
    var lastProvider, lastPrefix;
    sortedIcons.pending.forEach(function (icon) {
      var provider = icon.provider;
      var prefix = icon.prefix;
      if (prefix === lastPrefix && provider === lastProvider) {
        return;
      }
      lastProvider = provider;
      lastPrefix = prefix;
      sources.push({
        provider: provider,
        prefix: prefix
      });
      if (pendingIcons[provider] === void 0) {
        pendingIcons[provider] = Object.create(null);
      }
      var providerPendingIcons = pendingIcons[provider];
      if (providerPendingIcons[prefix] === void 0) {
        providerPendingIcons[prefix] = Object.create(null);
      }
      if (newIcons[provider] === void 0) {
        newIcons[provider] = Object.create(null);
      }
      var providerNewIcons = newIcons[provider];
      if (providerNewIcons[prefix] === void 0) {
        providerNewIcons[prefix] = [];
      }
    });
    var time = Date.now();
    sortedIcons.pending.forEach(function (icon) {
      var provider = icon.provider;
      var prefix = icon.prefix;
      var name = icon.name;
      var pendingQueue = pendingIcons[provider][prefix];
      if (pendingQueue[name] === void 0) {
        pendingQueue[name] = time;
        newIcons[provider][prefix].push(name);
      }
    });
    sources.forEach(function (source) {
      var provider = source.provider;
      var prefix = source.prefix;
      if (newIcons[provider][prefix].length) {
        loadNewIcons(provider, prefix, newIcons[provider][prefix]);
      }
    });
    return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
  };
  var iconsQueue = Object.create(null);
  var loadIcon = function (icon) {
    if (typeof icon === "string" && iconsQueue[icon]) {
      return iconsQueue[icon];
    }
    var result = new Promise(function (fulfill, reject) {
      var iconObj = typeof icon === "string" ? stringToIcon(icon) : icon;
      loadIcons([iconObj || icon], function (loaded) {
        if (loaded.length && iconObj) {
          var storage = getStorage(iconObj.provider, iconObj.prefix);
          var data = getIconFromStorage(storage, iconObj.name);
          if (data) {
            fulfill(data);
            return;
          }
        }
        reject(icon);
      });
    });
    if (typeof icon === "string") {
      iconsQueue[icon] = result;
    }
    return result;
  };

  /**
   * Names of properties to add to nodes
   */
  var elementFinderProperty = ('iconifyFinder' + Date.now());
  var elementDataProperty = ('iconifyData' + Date.now());

  /**
   * Replace element with SVG
   */
  function renderIconInPlaceholder(placeholder, customisations, iconData, returnString) {
      // Create placeholder. Why placeholder? IE11 doesn't support innerHTML method on SVG.
      var span;
      try {
          span = document.createElement('span');
      }
      catch (err) {
          return returnString ? '' : null;
      }
      var data = iconToSVG(iconData, mergeCustomisations(defaults, customisations));
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
          replaceIDs(data.body) +
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
                      catch (err$1) {
                          //
                      }
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
              customisations: customisations,
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
  function continueObserving(node, root) {
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
      continueObserving(node, root);
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
   * Pause observing node
   */
  function pauseObservingNode(node) {
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
   * Pause observer
   */
  function pauseObserver(root) {
      if (root) {
          var node = findRootNode(root);
          if (node) {
              pauseObservingNode(node);
          }
      }
      else {
          pauseObservingNode();
      }
  }
  /**
   * Resume observer
   */
  function resumeObservingNode(observer) {
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
                      continueObserving(node, root);
                  }
                  else {
                      startObserver(node);
                  }
              }
          }
      });
  }
  /**
   * Resume observer
   */
  function resumeObserver(root) {
      if (root) {
          var node = findRootNode(root);
          if (node) {
              resumeObservingNode(node);
          }
      }
      else {
          resumeObservingNode();
      }
  }
  /**
   * Observe node
   */
  function observe(root, autoRemove) {
      if ( autoRemove === void 0 ) autoRemove = false;

      var node = addRootNode(root, autoRemove);
      startObserver(node);
      return node;
  }
  /**
   * Remove observed node
   */
  function stopObserving(root) {
      var node = findRootNode(root);
      if (node) {
          stopObserver(node);
          removeRootNode(root);
      }
  }

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
  function cleanIconName(name) {
      if (typeof name === 'string') {
          name = stringToIcon(name);
      }
      return name === null || !validateIcon(name) ? null : name;
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
      var iconsToLoad = Object.create(null);
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
                          if (isPending({
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
              var storage = getStorage(provider, prefix);
              if (storage.icons[name] !== void 0) {
                  // Icon exists - pause observer before replacing placeholder
                  if (!paused && node.observer) {
                      pauseObservingNode(node);
                      paused = true;
                  }
                  // Get customisations
                  var customisations = item.customisations !== void 0
                      ? item.customisations
                      : item.finder.customisations(element);
                  // Render icon
                  renderIconInPlaceholder(item, customisations, getIconFromStorage(storage, name));
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
              if (!isPending({ provider: provider, prefix: prefix, name: name })) {
                  // Add icon to loading queue
                  if (iconsToLoad[provider] === void 0) {
                      iconsToLoad[provider] = Object.create(null);
                  }
                  var providerIconsToLoad = iconsToLoad[provider];
                  if (providerIconsToLoad[prefix] === void 0) {
                      providerIconsToLoad[prefix] = Object.create(null);
                  }
                  providerIconsToLoad[prefix][name] = true;
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
              stopObserving(root);
          }
          else if (addTempNode && hasPlaceholders) {
              // Add new temporary node
              observe(root, true);
          }
          else if (paused && node.observer) {
              // Resume observer
              resumeObservingNode(node);
          }
      });
      // Load icons
      Object.keys(iconsToLoad).forEach(function (provider) {
          var providerIconsToLoad = iconsToLoad[provider];
          Object.keys(providerIconsToLoad).forEach(function (prefix) {
              loadIcons(Object.keys(providerIconsToLoad[prefix]).map(function (name) {
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

  // src/customisations/rotate.ts
  function rotateFromString(value, defaultValue) {
    if ( defaultValue === void 0 ) defaultValue = 0;

    var units = value.replace(/^-?[0-9.]*/, "");
    function cleanup(value2) {
      while (value2 < 0) {
        value2 += 4;
      }
      return value2 % 4;
    }
    if (units === "") {
      var num = parseInt(value);
      return isNaN(num) ? 0 : cleanup(num);
    } else if (units !== value) {
      var split = 0;
      switch (units) {
        case "%":
          split = 25;
          break;
        case "deg":
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
    return defaultValue;
  }

  // src/customisations/shorthand.ts
  var separator = /[\s,]+/;
  function flipFromString(custom, flip) {
    flip.split(separator).forEach(function (str) {
      var value = str.trim();
      switch (value) {
        case "horizontal":
          custom.hFlip = true;
          break;
        case "vertical":
          custom.vFlip = true;
          break;
      }
    });
  }
  function alignmentFromString(custom, align) {
    align.split(separator).forEach(function (str) {
      var value = str.trim();
      switch (value) {
        case "left":
        case "center":
        case "right":
          custom.hAlign = value;
          break;
        case "top":
        case "middle":
        case "bottom":
          custom.vAlign = value;
          break;
        case "slice":
        case "crop":
          custom.slice = true;
          break;
        case "meet":
          custom.slice = false;
      }
    });
  }

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
              var value = rotateFromString(getAttribute(element, 'data-rotate'));
              if (value) {
                  result.rotate = value;
              }
          }
          // Shorthand attributes
          if (hasAttribute(element, 'data-flip')) {
              flipFromString(result, getAttribute(element, 'data-flip'));
          }
          if (hasAttribute(element, 'data-align')) {
              alignmentFromString(result, getAttribute(element, 'data-align'));
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
   * Generate icon
   */
  function generateIcon(name, customisations, returnString) {
      // Get icon data
      var iconData = getIconData(name);
      if (!iconData) {
          return null;
      }
      // Split name
      var iconName = stringToIcon(name);
      // Clean up customisations
      var changes = mergeCustomisations(defaults, typeof customisations === 'object' ? customisations : {});
      // Get data
      return renderIconInPlaceholder({
          name: iconName,
      }, changes, iconData, returnString);
  }
  /**
   * Get version
   */
  function getVersion() {
      return '2.1.2';
  }
  /**
   * Generate SVG element
   */
  function renderSVG(name, customisations) {
      return generateIcon(name, customisations, false);
  }
  /**
   * Generate SVG as string
   */
  function renderHTML(name, customisations) {
      return generateIcon(name, customisations, true);
  }
  /**
   * Get rendered icon as object that can be used to create SVG (use replaceIDs on body)
   */
  function renderIcon(name, customisations) {
      // Get icon data
      var iconData = getIconData(name);
      if (!iconData) {
          return null;
      }
      // Clean up customisations
      var changes = mergeCustomisations(defaults, typeof customisations === 'object' ? customisations : {});
      // Get data
      return iconToSVG(iconData, changes);
  }
  /**
   * Scan DOM
   */
  function scan(root) {
      if (root) {
          scanElement(root);
      }
      else {
          scanDOM();
      }
  }
  /**
   * Initialise stuff
   */
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      // Add document.body node
      addBodyNode();
      // Add finder modules
      // addFinder(iconifyIconFinder);
      addFinder(finder);
      var _window$1 = window;
      // Load icons from global "IconifyPreload"
      if (_window$1.IconifyPreload !== void 0) {
          var preload = _window$1.IconifyPreload;
          var err$1 = 'Invalid IconifyPreload syntax.';
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
                          !addCollection(item)) {
                          console.error(err$1);
                      }
                  }
                  catch (e) {
                      console.error(err$1);
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
   * Enable cache
   */
  function enableCache(storage, enable) {
      toggleBrowserCache(storage, enable !== false);
  }
  /**
   * Disable cache
   */
  function disableCache(storage) {
      toggleBrowserCache(storage, true);
  }
  /**
   * Initialise stuff
   */
  // Set API module
  setAPIModule('', getFetch() ? fetchAPIModule : jsonpAPIModule);
  /**
   * Function to enable node-fetch for getting icons on server side
   */
  function setFetch(nodeFetch) {
      setFetch$1(nodeFetch);
      setAPIModule('', fetchAPIModule);
  }
  /**
   * Browser stuff
   */
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      // Set cache and load existing cache
      cache.store = storeCache;
      loadCache();
      var _window = window;
      // Set API from global "IconifyProviders"
      if (_window.IconifyProviders !== void 0) {
          var providers = _window.IconifyProviders;
          if (typeof providers === 'object' && providers !== null) {
              for (var key in providers) {
                  var err = 'IconifyProviders[' + key + '] is invalid.';
                  try {
                      var value = providers[key];
                      if (typeof value !== 'object' ||
                          !value ||
                          value.resources === void 0) {
                          continue;
                      }
                      if (!addAPIProvider(key, value)) {
                          console.error(err);
                      }
                  }
                  catch (e) {
                      console.error(err);
                  }
              }
          }
      }
  }
  /**
   * Internal API
   */
  var _api = {
      getAPIConfig: getAPIConfig,
      setAPIModule: setAPIModule,
      sendAPIQuery: sendAPIQuery,
      setFetch: setFetch,
      listAPIProviders: listAPIProviders,
      mergeParams: mergeParams,
  };
  /**
   * Global variable
   */
  var Iconify = {
      // IconifyAPIInternalFunctions
      _api: _api,
      // IconifyAPIFunctions
      addAPIProvider: addAPIProvider,
      loadIcons: loadIcons,
      loadIcon: loadIcon,
      // IconifyStorageFunctions
      iconExists: iconExists,
      getIcon: getIcon,
      listIcons: listIcons,
      addIcon: addIcon,
      addCollection: addCollection,
      shareStorage: shareStorage,
      // IconifyBuilderFunctions
      replaceIDs: replaceIDs,
      calculateSize: calculateSize,
      buildIcon: buildIcon,
      // IconifyCommonFunctions
      getVersion: getVersion,
      renderSVG: renderSVG,
      renderHTML: renderHTML,
      renderIcon: renderIcon,
      scan: scan,
      observe: observe,
      stopObserving: stopObserving,
      pauseObserver: pauseObserver,
      resumeObserver: resumeObserver,
      // IconifyBrowserCacheFunctions
      enableCache: enableCache,
      disableCache: disableCache,
  };

  exports._api = _api;
  exports.addAPIProvider = addAPIProvider;
  exports.addCollection = addCollection;
  exports.addIcon = addIcon;
  exports.buildIcon = buildIcon;
  exports.calculateSize = calculateSize;
  exports["default"] = Iconify;
  exports.disableCache = disableCache;
  exports.enableCache = enableCache;
  exports.getIcon = getIcon;
  exports.getVersion = getVersion;
  exports.iconExists = iconExists;
  exports.listIcons = listIcons;
  exports.loadIcon = loadIcon;
  exports.loadIcons = loadIcons;
  exports.observe = observe;
  exports.pauseObserver = pauseObserver;
  exports.renderHTML = renderHTML;
  exports.renderIcon = renderIcon;
  exports.renderSVG = renderSVG;
  exports.replaceIDs = replaceIDs;
  exports.resumeObserver = resumeObserver;
  exports.scan = scan;
  exports.shareStorage = shareStorage;
  exports.stopObserving = stopObserving;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});

// Export as ES module
if (typeof exports === 'object') {
	try {
		exports.__esModule = true;
		exports.default = Iconify;
		for (var key in Iconify) {
			exports[key] = Iconify[key];
		}
	} catch (err) {
	}
}


// Export to window or web worker
try {
	if (self.Iconify === void 0) {
		self.Iconify = Iconify;
	}
} catch (err) {
}
