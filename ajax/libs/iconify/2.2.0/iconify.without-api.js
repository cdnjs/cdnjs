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
* @version 2.2.0
*/
var Iconify = (function (exports) {
  'use strict';

  const matchName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  const iconDefaults = Object.freeze({
    left: 0,
    top: 0,
    width: 16,
    height: 16,
    rotate: 0,
    vFlip: false,
    hFlip: false
  });
  function fullIcon(data) {
    return { ...iconDefaults, ...data };
  }

  function mergeIconData(icon, alias) {
    const result = { ...icon };
    for (const key in iconDefaults) {
      const prop = key;
      if (alias[prop] !== void 0) {
        const value = alias[prop];
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

  function getIconData$1(data, name, full = false) {
    function getIcon(name2, iteration) {
      if (data.icons[name2] !== void 0) {
        return Object.assign({}, data.icons[name2]);
      }
      if (iteration > 5) {
        return null;
      }
      if (data.aliases?.[name2] !== void 0) {
        const item = data.aliases?.[name2];
        const result2 = getIcon(item.parent, iteration + 1);
        if (result2) {
          return mergeIconData(result2, item);
        }
        return result2;
      }
      if (iteration === 0 && data.chars?.[name2] !== void 0) {
        return getIcon(data.chars?.[name2], iteration + 1);
      }
      return null;
    }
    const result = getIcon(name, 0);
    if (result) {
      for (const key in iconDefaults) {
        if (result[key] === void 0 && data[key] !== void 0) {
          result[key] = data[key];
        }
      }
    }
    return result && full ? fullIcon(result) : result;
  }

  const matchChar = /^[a-f0-9]+(-[a-f0-9]+)*$/;
  function validateIconProps(item, fix) {
    for (const key in item) {
      const attr = key;
      const value = item[attr];
      const type = typeof value;
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
    const fix = !!options?.fix;
    if (typeof obj !== "object" || obj === null || typeof obj.icons !== "object" || !obj.icons) {
      throw new Error("Bad icon set");
    }
    const data = obj;
    if (typeof options?.prefix === "string") {
      data.prefix = options.prefix;
    } else if (typeof data.prefix !== "string" || !data.prefix.match(matchName)) {
      throw new Error("Invalid prefix");
    }
    if (typeof options?.provider === "string") {
      data.provider = options.provider;
    } else if (data.provider !== void 0) {
      const value = data.provider;
      if (typeof value !== "string" || value !== "" && !value.match(matchName)) {
        if (fix) {
          delete data.provider;
        } else {
          throw new Error("Invalid provider");
        }
      }
    }
    const icons = data.icons;
    Object.keys(icons).forEach((name) => {
      if (!name.match(matchName)) {
        if (fix) {
          delete icons[name];
          return;
        }
        throw new Error(`Invalid icon name: "${name}"`);
      }
      const item = icons[name];
      if (typeof item !== "object" || item === null || typeof item.body !== "string") {
        if (fix) {
          delete icons[name];
          return;
        }
        throw new Error(`Invalid icon: "${name}"`);
      }
      const key = typeof item.parent === "string" ? "parent" : validateIconProps(item, fix);
      if (key !== null) {
        if (fix) {
          delete icons[name];
          return;
        }
        throw new Error(`Invalid property "${key}" in icon "${name}"`);
      }
    });
    if (data.not_found !== void 0 && !(data.not_found instanceof Array)) {
      if (fix) {
        delete data.not_found;
      } else {
        throw new Error("Invalid not_found list");
      }
    }
    if (!Object.keys(data.icons).length && !data.not_found?.length) {
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
      let validateAlias = function(name, iteration) {
        if (validatedAliases.has(name)) {
          return !failedAliases.has(name);
        }
        const item = aliases[name];
        if (iteration > 5 || typeof item !== "object" || item === null || typeof item.parent !== "string" || !name.match(matchName)) {
          if (fix) {
            delete aliases[name];
            failedAliases.add(name);
            return false;
          }
          throw new Error(`Invalid icon alias: "${name}"`);
        }
        const parent = item.parent;
        if (data.icons[parent] === void 0) {
          if (aliases[parent] === void 0 || !validateAlias(parent, iteration + 1)) {
            if (fix) {
              delete aliases[name];
              failedAliases.add(name);
              return false;
            }
            throw new Error(`Missing parent icon for alias "${name}`);
          }
        }
        if (fix && item.body !== void 0) {
          delete item.body;
        }
        const key = item.body !== void 0 ? "body" : validateIconProps(item, fix);
        if (key !== null) {
          if (fix) {
            delete aliases[name];
            failedAliases.add(name);
            return false;
          }
          throw new Error(`Invalid property "${key}" in alias "${name}"`);
        }
        validatedAliases.add(name);
        return true;
      };
      const aliases = data.aliases;
      const validatedAliases = new Set();
      const failedAliases = new Set();
      Object.keys(aliases).forEach((name) => {
        validateAlias(name, 0);
      });
      if (fix && !Object.keys(data.aliases).length) {
        delete data.aliases;
      }
    }
    Object.keys(iconDefaults).forEach((prop) => {
      const expectedType = typeof iconDefaults[prop];
      const actualType = typeof data[prop];
      if (actualType !== "undefined" && actualType !== expectedType) {
        throw new Error(`Invalid value type for "${prop}"`);
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
      const chars = data.chars;
      Object.keys(chars).forEach((char) => {
        if (!matchChar.exec(char) || typeof chars[char] !== "string") {
          if (fix) {
            delete chars[char];
            return;
          }
          throw new Error(`Invalid character "${char}"`);
        }
        const target = chars[char];
        if (data.icons[target] === void 0 && data.aliases?.[target] === void 0) {
          if (fix) {
            delete chars[char];
            return;
          }
          throw new Error(`Character "${char}" points to missing icon "${target}"`);
        }
      });
      if (fix && !Object.keys(data.chars).length) {
        delete data.chars;
      }
    }
    return data;
  }

  function isVariation(item) {
    for (const key in iconDefaults) {
      if (item[key] !== void 0) {
        return true;
      }
    }
    return false;
  }
  function parseIconSet(data, callback, options) {
    options = options || {};
    const names = [];
    if (typeof data !== "object" || typeof data.icons !== "object") {
      return names;
    }
    const validate = options.validate;
    if (validate !== false) {
      try {
        validateIconSet(data, typeof validate === "object" ? validate : { fix: true });
      } catch (err) {
        return names;
      }
    }
    if (data.not_found instanceof Array) {
      data.not_found.forEach((name) => {
        callback(name, null);
        names.push(name);
      });
    }
    const icons = data.icons;
    Object.keys(icons).forEach((name) => {
      const iconData = getIconData$1(data, name, true);
      if (iconData) {
        callback(name, iconData);
        names.push(name);
      }
    });
    const parseAliases = options.aliases || "all";
    if (parseAliases !== "none" && typeof data.aliases === "object") {
      const aliases = data.aliases;
      Object.keys(aliases).forEach((name) => {
        if (parseAliases === "variations" && isVariation(aliases[name])) {
          return;
        }
        const iconData = getIconData$1(data, name, true);
        if (iconData) {
          callback(name, iconData);
          names.push(name);
        }
      });
    }
    return names;
  }

  const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
    const colonSeparated = value.split(":");
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
      const name2 = colonSeparated.pop();
      const prefix = colonSeparated.pop();
      const result = {
        provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
        prefix,
        name: name2
      };
      return validate && !validateIcon(result) ? null : result;
    }
    const name = colonSeparated[0];
    const dashSeparated = name.split("-");
    if (dashSeparated.length > 1) {
      const result = {
        provider,
        prefix: dashSeparated.shift(),
        name: dashSeparated.join("-")
      };
      return validate && !validateIcon(result) ? null : result;
    }
    if (allowSimpleName && provider === "") {
      const result = {
        provider,
        prefix: "",
        name
      };
      return validate && !validateIcon(result, allowSimpleName) ? null : result;
    }
    return null;
  };
  const validateIcon = (icon, allowSimpleName) => {
    if (!icon) {
      return false;
    }
    return !!((icon.provider === "" || icon.provider.match(matchName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchName)) && icon.name.match(matchName));
  };

  const storageVersion = 1;
  let storage$1 = /* @__PURE__ */ Object.create(null);
  try {
    const w = window || self;
    if (w?._iconifyStorage.version === storageVersion) {
      storage$1 = w._iconifyStorage.storage;
    }
  } catch (err) {
  }
  function shareStorage() {
    try {
      const w = window || self;
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
      provider,
      prefix,
      icons: /* @__PURE__ */ Object.create(null),
      missing: /* @__PURE__ */ Object.create(null)
    };
  }
  function getStorage(provider, prefix) {
    if (storage$1[provider] === void 0) {
      storage$1[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerStorage = storage$1[provider];
    if (providerStorage[prefix] === void 0) {
      providerStorage[prefix] = newStorage(provider, prefix);
    }
    return providerStorage[prefix];
  }
  function addIconSet(storage2, data) {
    const t = Date.now();
    return parseIconSet(data, (name, icon) => {
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
    const value = storage2.icons[name];
    return value === void 0 ? null : value;
  }
  function listIcons(provider, prefix) {
    let allIcons = [];
    let providers;
    if (typeof provider === "string") {
      providers = [provider];
    } else {
      providers = Object.keys(storage$1);
    }
    providers.forEach((provider2) => {
      let prefixes;
      if (typeof provider2 === "string" && typeof prefix === "string") {
        prefixes = [prefix];
      } else {
        prefixes = storage$1[provider2] === void 0 ? [] : Object.keys(storage$1[provider2]);
      }
      prefixes.forEach((prefix2) => {
        const storage2 = getStorage(provider2, prefix2);
        const icons = Object.keys(storage2.icons).map((name) => (provider2 !== "" ? "@" + provider2 + ":" : "") + prefix2 + ":" + name);
        allIcons = allIcons.concat(icons);
      });
    });
    return allIcons;
  }

  let simpleNames = false;
  function allowSimpleNames(allow) {
    if (typeof allow === "boolean") {
      simpleNames = allow;
    }
    return simpleNames;
  }
  function getIconData(name) {
    const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
    return icon ? getIconFromStorage(getStorage(icon.provider, icon.prefix), icon.name) : null;
  }
  function addIcon(name, data) {
    const icon = stringToIcon(name, true, simpleNames);
    if (!icon) {
      return false;
    }
    const storage = getStorage(icon.provider, icon.prefix);
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
      let added = false;
      parseIconSet(data, (name, icon) => {
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
      provider,
      prefix: data.prefix,
      name: "a"
    })) {
      return false;
    }
    const storage = getStorage(provider, data.prefix);
    return !!addIconSet(storage, data);
  }
  function iconExists(name) {
    return getIconData(name) !== null;
  }
  function getIcon(name) {
    const result = getIconData(name);
    return result ? { ...result } : null;
  }

  const defaults = Object.freeze({
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
    const result = {};
    for (const key in defaults2) {
      const attr = key;
      result[attr] = defaults2[attr];
      if (item[attr] === void 0) {
        continue;
      }
      const value = item[attr];
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

  const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
  const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
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
    const oldParts = size.split(unitsSplit);
    if (oldParts === null || !oldParts.length) {
      return size;
    }
    const newParts = [];
    let code = oldParts.shift();
    let isNumber = unitsTest.test(code);
    while (true) {
      if (isNumber) {
        const num = parseFloat(code);
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

  function preserveAspectRatio(props) {
    let result = "";
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
    const box = {
      left: icon.left,
      top: icon.top,
      width: icon.width,
      height: icon.height
    };
    let body = icon.body;
    [icon, customisations].forEach((props) => {
      const transformations = [];
      const hFlip = props.hFlip;
      const vFlip = props.vFlip;
      let rotation = props.rotate;
      if (hFlip) {
        if (vFlip) {
          rotation += 2;
        } else {
          transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
          transformations.push("scale(-1 1)");
          box.top = box.left = 0;
        }
      } else if (vFlip) {
        transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
        transformations.push("scale(1 -1)");
        box.top = box.left = 0;
      }
      let tempValue;
      if (rotation < 0) {
        rotation -= Math.floor(rotation / 4) * 4;
      }
      rotation = rotation % 4;
      switch (rotation) {
        case 1:
          tempValue = box.height / 2 + box.top;
          transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
          break;
        case 2:
          transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
          break;
        case 3:
          tempValue = box.width / 2 + box.left;
          transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
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
    let width, height;
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
    width = typeof width === "string" ? width : width.toString() + "";
    height = typeof height === "string" ? height : height.toString() + "";
    const result = {
      attributes: {
        width,
        height,
        preserveAspectRatio: preserveAspectRatio(customisations),
        viewBox: box.left.toString() + " " + box.top.toString() + " " + box.width.toString() + " " + box.height.toString()
      },
      body
    };
    if (customisations.inline) {
      result.inline = true;
    }
    return result;
  }

  function buildIcon(icon, customisations) {
    return iconToSVG(fullIcon(icon), customisations ? mergeCustomisations(defaults, customisations) : defaults);
  }

  const regex = /\sid="(\S+)"/g;
  const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
  let counter = 0;
  function replaceIDs(body, prefix = randomPrefix) {
    const ids = [];
    let match;
    while (match = regex.exec(body)) {
      ids.push(match[1]);
    }
    if (!ids.length) {
      return body;
    }
    ids.forEach((id) => {
      const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
      const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + "$3");
    });
    return body;
  }

  /**
   * Names of properties to add to nodes
   */
  const elementFinderProperty = ('iconifyFinder' + Date.now());
  const elementDataProperty = ('iconifyData' + Date.now());

  /**
   * Replace element with SVG
   */
  function renderIconInPlaceholder(placeholder, customisations, iconData, returnString) {
      // Create placeholder. Why placeholder? IE11 doesn't support innerHTML method on SVG.
      let span;
      try {
          span = document.createElement('span');
      }
      catch (err) {
          return returnString ? '' : null;
      }
      const data = iconToSVG(iconData, mergeCustomisations(defaults, customisations));
      // Placeholder properties
      const placeholderElement = placeholder.element;
      const finder = placeholder.finder;
      const name = placeholder.name;
      // Get class name
      const placeholderClassName = placeholderElement
          ? placeholderElement.getAttribute('class')
          : '';
      const filteredClassList = finder
          ? finder.classFilter(placeholderClassName ? placeholderClassName.split(/\s+/) : [])
          : [];
      const className = 'iconify iconify--' +
          name.prefix +
          (name.provider === '' ? '' : ' iconify--' + name.provider) +
          (filteredClassList.length ? ' ' + filteredClassList.join(' ') : '');
      // Generate SVG as string
      const html = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="' +
          className +
          '">' +
          replaceIDs(data.body) +
          '</svg>';
      // Set HTML for placeholder
      span.innerHTML = html;
      // Get SVG element
      const svg = span.childNodes[0];
      const svgStyle = svg.style;
      // Add attributes
      const svgAttributes = data.attributes;
      Object.keys(svgAttributes).forEach((attr) => {
          svg.setAttribute(attr, svgAttributes[attr]);
      });
      // Add custom styles
      if (data.inline) {
          svgStyle.verticalAlign = '-0.125em';
      }
      // Copy stuff from placeholder
      if (placeholderElement) {
          // Copy attributes
          const placeholderAttributes = placeholderElement.attributes;
          for (let i = 0; i < placeholderAttributes.length; i++) {
              const item = placeholderAttributes.item(i);
              if (item) {
                  const name = item.name;
                  if (name !== 'class' &&
                      name !== 'style' &&
                      svgAttributes[name] === void 0) {
                      try {
                          svg.setAttribute(name, item.value);
                      }
                      catch (err) {
                          //
                      }
                  }
              }
          }
          // Copy styles
          const placeholderStyle = placeholderElement.style;
          for (let i = 0; i < placeholderStyle.length; i++) {
              const attr = placeholderStyle[i];
              svgStyle[attr] = placeholderStyle[attr];
          }
      }
      // Store finder specific data
      if (finder) {
          const elementData = {
              name: name,
              status: 'loaded',
              customisations: customisations,
          };
          svg[elementDataProperty] = elementData;
          svg[elementFinderProperty] = finder;
      }
      // Get result
      const result = returnString ? span.innerHTML : svg;
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
  let nodes = [];
  /**
   * Find node
   */
  function findRootNode(node) {
      for (let i = 0; i < nodes.length; i++) {
          const item = nodes[i];
          const root = typeof item.node === 'function' ? item.node() : item.node;
          if (root === node) {
              return item;
          }
      }
  }
  /**
   * Add extra root node
   */
  function addRootNode(root, autoRemove = false) {
      let node = findRootNode(root);
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
          node: () => {
              return document.documentElement;
          },
      });
  }
  /**
   * Remove root node
   */
  function removeRootNode(root) {
      nodes = nodes.filter((node) => {
          const element = typeof node.node === 'function' ? node.node() : node.node;
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
      const doc = document;
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
  let callback = null;
  /**
   * Parameters for mutation observer
   */
  const observerParams = {
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
      const observer = node.observer;
      if (!observer.pendingScan) {
          observer.pendingScan = setTimeout(() => {
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
      const observer = node.observer;
      if (!observer.pendingScan) {
          for (let i = 0; i < mutations.length; i++) {
              const item = mutations[i];
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
      let observer = node.observer;
      if (observer && observer.instance) {
          // Already started
          return;
      }
      const root = typeof node.node === 'function' ? node.node() : node.node;
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
      const observer = node.observer;
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
      const isRestart = callback !== null;
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
      (node ? [node] : listRootNodes()).forEach((node) => {
          if (!node.observer) {
              node.observer = {
                  paused: 1,
              };
              return;
          }
          const observer = node.observer;
          observer.paused++;
          if (observer.paused > 1 || !observer.instance) {
              return;
          }
          // Disconnect observer
          const instance = observer.instance;
          // checkMutations(node, instance.takeRecords());
          instance.disconnect();
      });
  }
  /**
   * Pause observer
   */
  function pauseObserver(root) {
      if (root) {
          const node = findRootNode(root);
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
      (observer ? [observer] : listRootNodes()).forEach((node) => {
          if (!node.observer) {
              // Start observer
              startObserver(node);
              return;
          }
          const observer = node.observer;
          if (observer.paused) {
              observer.paused--;
              if (!observer.paused) {
                  // Start / resume
                  const root = typeof node.node === 'function' ? node.node() : node.node;
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
          const node = findRootNode(root);
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
  function observe(root, autoRemove = false) {
      const node = addRootNode(root, autoRemove);
      startObserver(node);
      return node;
  }
  /**
   * Remove observed node
   */
  function stopObserving(root) {
      const node = findRootNode(root);
      if (node) {
          stopObserver(node);
          removeRootNode(root);
      }
  }

  function sortIcons(icons) {
    const result = {
      loaded: [],
      missing: [],
      pending: []
    };
    const storage = /* @__PURE__ */ Object.create(null);
    icons.sort((a, b) => {
      if (a.provider !== b.provider) {
        return a.provider.localeCompare(b.provider);
      }
      if (a.prefix !== b.prefix) {
        return a.prefix.localeCompare(b.prefix);
      }
      return a.name.localeCompare(b.name);
    });
    let lastIcon = {
      provider: "",
      prefix: "",
      name: ""
    };
    icons.forEach((icon) => {
      if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
        return;
      }
      lastIcon = icon;
      const provider = icon.provider;
      const prefix = icon.prefix;
      const name = icon.name;
      if (storage[provider] === void 0) {
        storage[provider] = /* @__PURE__ */ Object.create(null);
      }
      const providerStorage = storage[provider];
      if (providerStorage[prefix] === void 0) {
        providerStorage[prefix] = getStorage(provider, prefix);
      }
      const localStorage = providerStorage[prefix];
      let list;
      if (localStorage.icons[name] !== void 0) {
        list = result.loaded;
      } else if (prefix === "" || localStorage.missing[name] !== void 0) {
        list = result.missing;
      } else {
        list = result.pending;
      }
      const item = {
        provider,
        prefix,
        name
      };
      list.push(item);
    });
    return result;
  }

  const callbacks = /* @__PURE__ */ Object.create(null);
  const pendingUpdates = /* @__PURE__ */ Object.create(null);
  function removeCallback(sources, id) {
    sources.forEach((source) => {
      const provider = source.provider;
      if (callbacks[provider] === void 0) {
        return;
      }
      const providerCallbacks = callbacks[provider];
      const prefix = source.prefix;
      const items = providerCallbacks[prefix];
      if (items) {
        providerCallbacks[prefix] = items.filter((row) => row.id !== id);
      }
    });
  }
  function updateCallbacks(provider, prefix) {
    if (pendingUpdates[provider] === void 0) {
      pendingUpdates[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerPendingUpdates = pendingUpdates[provider];
    if (!providerPendingUpdates[prefix]) {
      providerPendingUpdates[prefix] = true;
      setTimeout(() => {
        providerPendingUpdates[prefix] = false;
        if (callbacks[provider] === void 0 || callbacks[provider][prefix] === void 0) {
          return;
        }
        const items = callbacks[provider][prefix].slice(0);
        if (!items.length) {
          return;
        }
        const storage = getStorage(provider, prefix);
        let hasPending = false;
        items.forEach((item) => {
          const icons = item.icons;
          const oldLength = icons.pending.length;
          icons.pending = icons.pending.filter((icon) => {
            if (icon.prefix !== prefix) {
              return true;
            }
            const name = icon.name;
            if (storage.icons[name] !== void 0) {
              icons.loaded.push({
                provider,
                prefix,
                name
              });
            } else if (storage.missing[name] !== void 0) {
              icons.missing.push({
                provider,
                prefix,
                name
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
                  provider,
                  prefix
                }
              ], item.id);
            }
            item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
          }
        });
      });
    }
  }
  let idCounter = 0;
  function storeCallback(callback, icons, pendingSources) {
    const id = idCounter++;
    const abort = removeCallback.bind(null, pendingSources, id);
    if (!icons.pending.length) {
      return abort;
    }
    const item = {
      id,
      icons,
      callback,
      abort
    };
    pendingSources.forEach((source) => {
      const provider = source.provider;
      const prefix = source.prefix;
      if (callbacks[provider] === void 0) {
        callbacks[provider] = /* @__PURE__ */ Object.create(null);
      }
      const providerCallbacks = callbacks[provider];
      if (providerCallbacks[prefix] === void 0) {
        providerCallbacks[prefix] = [];
      }
      providerCallbacks[prefix].push(item);
    });
    return abort;
  }

  const storage = /* @__PURE__ */ Object.create(null);
  function getAPIModule(provider) {
    return storage[provider] || storage[""];
  }

  function listToIcons(list, validate = true, simpleNames = false) {
    const result = [];
    list.forEach((item) => {
      const icon = typeof item === "string" ? stringToIcon(item, false, simpleNames) : item;
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
  function sendQuery(config, payload, query, done) {
    const resourcesCount = config.resources.length;
    const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
    let resources;
    if (config.random) {
      let list = config.resources.slice(0);
      resources = [];
      while (list.length > 1) {
        const nextIndex = Math.floor(Math.random() * list.length);
        resources.push(list[nextIndex]);
        list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
      }
      resources = resources.concat(list);
    } else {
      resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
    }
    const startTime = Date.now();
    let status = "pending";
    let queriesSent = 0;
    let lastError;
    let timer = null;
    let queue = [];
    let doneCallbacks = [];
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
      queue.forEach((item) => {
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
        startTime,
        payload,
        status,
        queriesSent,
        queriesPending: queue.length,
        subscribe,
        abort
      };
    }
    function failQuery() {
      status = "failed";
      doneCallbacks.forEach((callback) => {
        callback(void 0, lastError);
      });
    }
    function clearQueue() {
      queue.forEach((item) => {
        if (item.status === "pending") {
          item.status = "aborted";
        }
      });
      queue = [];
    }
    function moduleResponse(item, response, data) {
      const isError = response !== "success";
      queue = queue.filter((queued) => queued !== item);
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
      if (response === "abort") {
        lastError = data;
        failQuery();
        return;
      }
      if (isError) {
        lastError = data;
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
      if (!config.random) {
        const index = config.resources.indexOf(item.resource);
        if (index !== -1 && index !== config.index) {
          config.index = index;
        }
      }
      status = "completed";
      doneCallbacks.forEach((callback) => {
        callback(data);
      });
    }
    function execNext() {
      if (status !== "pending") {
        return;
      }
      resetTimer();
      const resource = resources.shift();
      if (resource === void 0) {
        if (queue.length) {
          timer = setTimeout(() => {
            resetTimer();
            if (status === "pending") {
              clearQueue();
              failQuery();
            }
          }, config.timeout);
          return;
        }
        failQuery();
        return;
      }
      const item = {
        status: "pending",
        resource,
        callback: (status2, data) => {
          moduleResponse(item, status2, data);
        }
      };
      queue.push(item);
      queriesSent++;
      timer = setTimeout(execNext, config.rotate);
      query(resource, payload, item.callback);
    }
    setTimeout(execNext);
    return getQueryStatus;
  }

  // src/index.ts
  function setConfig(config) {
    if (typeof config !== "object" || typeof config.resources !== "object" || !(config.resources instanceof Array) || !config.resources.length) {
      throw new Error("Invalid Reduncancy configuration");
    }
    const newConfig = /* @__PURE__ */ Object.create(null);
    let key;
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
    const config = setConfig(cfg);
    let queries = [];
    function cleanup() {
      queries = queries.filter((item) => item().status === "pending");
    }
    function query(payload, queryCallback, doneCallback) {
      const query2 = sendQuery(config, payload, queryCallback, (data, error) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      });
      queries.push(query2);
      return query2;
    }
    function find(callback) {
      const result = queries.find((value) => {
        return callback(value);
      });
      return result !== void 0 ? result : null;
    }
    const instance = {
      query,
      find,
      setIndex: (index) => {
        config.index = index;
      },
      getIndex: () => config.index,
      cleanup
    };
    return instance;
  }

  function createAPIConfig(source) {
    let resources;
    if (typeof source.resources === "string") {
      resources = [source.resources];
    } else {
      resources = source.resources;
      if (!(resources instanceof Array) || !resources.length) {
        return null;
      }
    }
    const result = {
      resources,
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
  const configStorage = /* @__PURE__ */ Object.create(null);
  const fallBackAPISources = [
    "https://api.simplesvg.com",
    "https://api.unisvg.com"
  ];
  const fallBackAPI = [];
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
  function getAPIConfig(provider) {
    return configStorage[provider];
  }

  function emptyCallback$1() {
  }
  const redundancyCache = /* @__PURE__ */ Object.create(null);
  function getRedundancyCache(provider) {
    if (redundancyCache[provider] === void 0) {
      const config = getAPIConfig(provider);
      if (!config) {
        return;
      }
      const redundancy = initRedundancy(config);
      const cachedReundancy = {
        config,
        redundancy
      };
      redundancyCache[provider] = cachedReundancy;
    }
    return redundancyCache[provider];
  }
  function sendAPIQuery(target, query, callback) {
    let redundancy;
    let send;
    if (typeof target === "string") {
      const api = getAPIModule(target);
      if (!api) {
        callback(void 0, 424);
        return emptyCallback$1;
      }
      send = api.send;
      const cached = getRedundancyCache(target);
      if (cached) {
        redundancy = cached.redundancy;
      }
    } else {
      const config = createAPIConfig(target);
      if (config) {
        redundancy = initRedundancy(config);
        const moduleKey = target.resources ? target.resources[0] : "";
        const api = getAPIModule(moduleKey);
        if (api) {
          send = api.send;
        }
      }
    }
    if (!redundancy || !send) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    return redundancy.query(query, send, callback)().abort;
  }

  const cache = {};

  function emptyCallback() {
  }
  const pendingIcons = /* @__PURE__ */ Object.create(null);
  const iconsToLoad = /* @__PURE__ */ Object.create(null);
  const loaderFlags = /* @__PURE__ */ Object.create(null);
  const queueFlags = /* @__PURE__ */ Object.create(null);
  function loadedNewIcons(provider, prefix) {
    if (loaderFlags[provider] === void 0) {
      loaderFlags[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerLoaderFlags = loaderFlags[provider];
    if (!providerLoaderFlags[prefix]) {
      providerLoaderFlags[prefix] = true;
      setTimeout(() => {
        providerLoaderFlags[prefix] = false;
        updateCallbacks(provider, prefix);
      });
    }
  }
  const errorsCache = /* @__PURE__ */ Object.create(null);
  function loadNewIcons(provider, prefix, icons) {
    function err() {
      const key = (provider === "" ? "" : "@" + provider + ":") + prefix;
      const time = Math.floor(Date.now() / 6e4);
      if (errorsCache[key] < time) {
        errorsCache[key] = time;
        console.error('Unable to retrieve icons for "' + key + '" because API is not configured properly.');
      }
    }
    if (iconsToLoad[provider] === void 0) {
      iconsToLoad[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerIconsToLoad = iconsToLoad[provider];
    if (queueFlags[provider] === void 0) {
      queueFlags[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerQueueFlags = queueFlags[provider];
    if (pendingIcons[provider] === void 0) {
      pendingIcons[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerPendingIcons = pendingIcons[provider];
    if (providerIconsToLoad[prefix] === void 0) {
      providerIconsToLoad[prefix] = icons;
    } else {
      providerIconsToLoad[prefix] = providerIconsToLoad[prefix].concat(icons).sort();
    }
    if (!providerQueueFlags[prefix]) {
      providerQueueFlags[prefix] = true;
      setTimeout(() => {
        providerQueueFlags[prefix] = false;
        const icons2 = providerIconsToLoad[prefix];
        delete providerIconsToLoad[prefix];
        const api = getAPIModule(provider);
        if (!api) {
          err();
          return;
        }
        const params = api.prepare(provider, prefix, icons2);
        params.forEach((item) => {
          sendAPIQuery(provider, item, (data, error) => {
            const storage = getStorage(provider, prefix);
            if (typeof data !== "object") {
              if (error !== 404) {
                return;
              }
              const t = Date.now();
              item.icons.forEach((name) => {
                storage.missing[name] = t;
              });
            } else {
              try {
                const parsed = addIconSet(storage, data);
                if (!parsed.length) {
                  return;
                }
                const pending = providerPendingIcons[prefix];
                parsed.forEach((name) => {
                  delete pending[name];
                });
                if (cache.store) ;
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
  const isPending = (icon) => {
    const provider = icon.provider;
    const prefix = icon.prefix;
    return pendingIcons[provider] && pendingIcons[provider][prefix] && pendingIcons[provider][prefix][icon.name] !== void 0;
  };
  const loadIcons = (icons, callback) => {
    const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
    const sortedIcons = sortIcons(cleanedIcons);
    if (!sortedIcons.pending.length) {
      let callCallback = true;
      if (callback) {
        setTimeout(() => {
          if (callCallback) {
            callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
          }
        });
      }
      return () => {
        callCallback = false;
      };
    }
    const newIcons = /* @__PURE__ */ Object.create(null);
    const sources = [];
    let lastProvider, lastPrefix;
    sortedIcons.pending.forEach((icon) => {
      const provider = icon.provider;
      const prefix = icon.prefix;
      if (prefix === lastPrefix && provider === lastProvider) {
        return;
      }
      lastProvider = provider;
      lastPrefix = prefix;
      sources.push({
        provider,
        prefix
      });
      if (pendingIcons[provider] === void 0) {
        pendingIcons[provider] = /* @__PURE__ */ Object.create(null);
      }
      const providerPendingIcons = pendingIcons[provider];
      if (providerPendingIcons[prefix] === void 0) {
        providerPendingIcons[prefix] = /* @__PURE__ */ Object.create(null);
      }
      if (newIcons[provider] === void 0) {
        newIcons[provider] = /* @__PURE__ */ Object.create(null);
      }
      const providerNewIcons = newIcons[provider];
      if (providerNewIcons[prefix] === void 0) {
        providerNewIcons[prefix] = [];
      }
    });
    const time = Date.now();
    sortedIcons.pending.forEach((icon) => {
      const provider = icon.provider;
      const prefix = icon.prefix;
      const name = icon.name;
      const pendingQueue = pendingIcons[provider][prefix];
      if (pendingQueue[name] === void 0) {
        pendingQueue[name] = time;
        newIcons[provider][prefix].push(name);
      }
    });
    sources.forEach((source) => {
      const provider = source.provider;
      const prefix = source.prefix;
      if (newIcons[provider][prefix].length) {
        loadNewIcons(provider, prefix, newIcons[provider][prefix]);
      }
    });
    return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
  };

  /**
   * List of modules
   */
  const finders = [];
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
      const keys1 = Object.keys(list1);
      const keys2 = Object.keys(list2);
      if (keys1.length !== keys2.length) {
          return false;
      }
      for (let i = 0; i < keys1.length; i++) {
          const key = keys1[i];
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
      const results = [];
      finders.forEach((finder) => {
          const elements = finder.find(root);
          Array.prototype.forEach.call(elements, (item) => {
              const element = item;
              if (element[elementFinderProperty] !== void 0 &&
                  element[elementFinderProperty] !== finder) {
                  // Element is assigned to a different finder
                  return;
              }
              // Get icon name
              const name = cleanIconName(finder.name(element));
              if (name === null) {
                  // Invalid name - do not assign this finder to element
                  return;
              }
              // Assign finder to element and add it to results
              element[elementFinderProperty] = finder;
              const placeholder = {
                  element,
                  finder,
                  name,
              };
              results.push(placeholder);
          });
      });
      // Find all modified SVG
      const elements = root.querySelectorAll('svg.iconify');
      Array.prototype.forEach.call(elements, (item) => {
          const element = item;
          const finder = element[elementFinderProperty];
          const data = element[elementDataProperty];
          if (!finder || !data) {
              return;
          }
          // Get icon name
          const name = cleanIconName(finder.name(element));
          if (name === null) {
              // Invalid name
              return;
          }
          let updated = false;
          let customisations;
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
              const placeholder = {
                  element,
                  finder,
                  name,
                  customisations,
              };
              results.push(placeholder);
          }
      });
      return results;
  }

  /**
   * Flag to avoid scanning DOM too often
   */
  let scanQueued = false;
  /**
   * Icons have been loaded
   */
  function checkPendingIcons() {
      if (!scanQueued) {
          scanQueued = true;
          setTimeout(() => {
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
  const compareIcons = (icon1, icon2) => {
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
      const node = findRootNode(root);
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
  function scanDOM(node, addTempNode = false) {
      scanQueued = false;
      // List of icons to load: [provider][prefix][name] = boolean
      const iconsToLoad = Object.create(null);
      // Get placeholders
      (node ? [node] : listRootNodes()).forEach((node) => {
          const root = typeof node.node === 'function' ? node.node() : node.node;
          if (!root || !root.querySelectorAll) {
              return;
          }
          // Track placeholders
          let hasPlaceholders = false;
          // Observer
          let paused = false;
          // Find placeholders
          findPlaceholders(root).forEach((item) => {
              const element = item.element;
              const iconName = item.name;
              const provider = iconName.provider;
              const prefix = iconName.prefix;
              const name = iconName.name;
              let data = element[elementDataProperty];
              // Icon has not been updated since last scan
              if (data !== void 0 && compareIcons(data.name, iconName)) {
                  // Icon name was not changed and data is set - quickly return if icon is missing or still loading
                  switch (data.status) {
                      case 'missing':
                          return;
                      case 'loading':
                          if (isPending({
                              provider,
                              prefix,
                              name,
                          })) {
                              // Pending
                              hasPlaceholders = true;
                              return;
                          }
                  }
              }
              // Check icon
              const storage = getStorage(provider, prefix);
              if (storage.icons[name] !== void 0) {
                  // Icon exists - pause observer before replacing placeholder
                  if (!paused && node.observer) {
                      pauseObservingNode(node);
                      paused = true;
                  }
                  // Get customisations
                  const customisations = item.customisations !== void 0
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
              if (!isPending({ provider, prefix, name })) {
                  // Add icon to loading queue
                  if (iconsToLoad[provider] === void 0) {
                      iconsToLoad[provider] = Object.create(null);
                  }
                  const providerIconsToLoad = iconsToLoad[provider];
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
      Object.keys(iconsToLoad).forEach((provider) => {
          const providerIconsToLoad = iconsToLoad[provider];
          Object.keys(providerIconsToLoad).forEach((prefix) => {
              loadIcons(Object.keys(providerIconsToLoad[prefix]).map((name) => {
                  const icon = {
                      provider,
                      prefix,
                      name,
                  };
                  return icon;
              }), checkPendingIcons);
          });
      });
  }

  function rotateFromString(value, defaultValue = 0) {
    const units = value.replace(/^-?[0-9.]*/, "");
    function cleanup(value2) {
      while (value2 < 0) {
        value2 += 4;
      }
      return value2 % 4;
    }
    if (units === "") {
      const num = parseInt(value);
      return isNaN(num) ? 0 : cleanup(num);
    } else if (units !== value) {
      let split = 0;
      switch (units) {
        case "%":
          split = 25;
          break;
        case "deg":
          split = 90;
      }
      if (split) {
        let num = parseFloat(value.slice(0, value.length - units.length));
        if (isNaN(num)) {
          return 0;
        }
        num = num / split;
        return num % 1 === 0 ? cleanup(num) : 0;
      }
    }
    return defaultValue;
  }

  const separator = /[\s,]+/;
  function flipFromString(custom, flip) {
    flip.split(separator).forEach((str) => {
      const value = str.trim();
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
    align.split(separator).forEach((str) => {
      const value = str.trim();
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
      const value = element.getAttribute(key);
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
  const booleanAttributes = [
      'inline',
      'hFlip',
      'vFlip',
  ];
  /**
   * String attributes
   */
  const stringAttributes = [
      'width',
      'height',
  ];
  /**
   * Class names
   */
  const mainClass = 'iconify';
  const inlineClass = 'iconify-inline';
  /**
   * Selector combining class names and tags
   */
  const selector = 'i.' +
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
  const finder = {
      /**
       * Find all elements
       */
      find: (root) => root.querySelectorAll(selector),
      /**
       * Get icon name from element
       */
      name: (element) => {
          if (hasAttribute(element, 'data-icon')) {
              return getAttribute(element, 'data-icon');
          }
          return null;
      },
      /**
       * Get customisations list from element
       */
      customisations: (element, defaultValues = {
          inline: false,
      }) => {
          const result = defaultValues;
          // Check class list for inline class
          const className = element.getAttribute('class');
          const classList = className ? className.split(/\s+/) : [];
          if (classList.indexOf(inlineClass) !== -1) {
              result.inline = true;
          }
          // Rotation
          if (hasAttribute(element, 'data-rotate')) {
              const value = rotateFromString(getAttribute(element, 'data-rotate'));
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
          booleanAttributes.forEach((attr) => {
              if (hasAttribute(element, 'data-' + attr)) {
                  const value = getBooleanAttribute(element, 'data-' + attr);
                  if (typeof value === 'boolean') {
                      result[attr] = value;
                  }
              }
          });
          // String attributes
          stringAttributes.forEach((attr) => {
              if (hasAttribute(element, 'data-' + attr)) {
                  const value = getAttribute(element, 'data-' + attr);
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
      classFilter: (classList) => {
          const result = [];
          classList.forEach((className) => {
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
      const iconData = getIconData(name);
      if (!iconData) {
          return null;
      }
      // Split name
      const iconName = stringToIcon(name);
      // Clean up customisations
      const changes = mergeCustomisations(defaults, typeof customisations === 'object' ? customisations : {});
      // Get data
      return renderIconInPlaceholder({
          name: iconName,
      }, changes, iconData, returnString);
  }
  /**
   * Get version
   */
  function getVersion() {
      return '2.2.0';
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
      const iconData = getIconData(name);
      if (!iconData) {
          return null;
      }
      // Clean up customisations
      const changes = mergeCustomisations(defaults, typeof customisations === 'object' ? customisations : {});
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
      const _window = window;
      // Load icons from global "IconifyPreload"
      if (_window.IconifyPreload !== void 0) {
          const preload = _window.IconifyPreload;
          const err = 'Invalid IconifyPreload syntax.';
          if (typeof preload === 'object' && preload !== null) {
              (preload instanceof Array ? preload : [preload]).forEach((item) => {
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
      setTimeout(() => {
          initObserver(scanDOM);
          scanDOM();
      });
  }

  /**
   * Global variable
   */
  const Iconify = {
      // IconifyStorageFunctions
      iconExists,
      getIcon,
      listIcons,
      addIcon,
      addCollection,
      shareStorage,
      // IconifyBuilderFunctions
      replaceIDs,
      calculateSize,
      buildIcon,
      // IconifyCommonFunctions
      getVersion,
      renderSVG,
      renderHTML,
      renderIcon,
      scan,
      observe,
      stopObserving,
      pauseObserver,
      resumeObserver,
  };

  exports.addCollection = addCollection;
  exports.addIcon = addIcon;
  exports.buildIcon = buildIcon;
  exports.calculateSize = calculateSize;
  exports["default"] = Iconify;
  exports.getIcon = getIcon;
  exports.getVersion = getVersion;
  exports.iconExists = iconExists;
  exports.listIcons = listIcons;
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
