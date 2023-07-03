/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt or license.gpl.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 3.1.1
*/
var Iconify = (function (exports) {
  'use strict';

  const defaultIconDimensions = Object.freeze(
    {
      left: 0,
      top: 0,
      width: 16,
      height: 16
    }
  );
  const defaultIconTransformations = Object.freeze({
    rotate: 0,
    vFlip: false,
    hFlip: false
  });
  const defaultIconProps = Object.freeze({
    ...defaultIconDimensions,
    ...defaultIconTransformations
  });
  const defaultExtendedIconProps = Object.freeze({
    ...defaultIconProps,
    body: "",
    hidden: false
  });

  function mergeIconTransformations(obj1, obj2) {
    const result = {};
    if (!obj1.hFlip !== !obj2.hFlip) {
      result.hFlip = true;
    }
    if (!obj1.vFlip !== !obj2.vFlip) {
      result.vFlip = true;
    }
    const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
    if (rotate) {
      result.rotate = rotate;
    }
    return result;
  }

  function mergeIconData(parent, child) {
    const result = mergeIconTransformations(parent, child);
    for (const key in defaultExtendedIconProps) {
      if (key in defaultIconTransformations) {
        if (key in parent && !(key in result)) {
          result[key] = defaultIconTransformations[key];
        }
      } else if (key in child) {
        result[key] = child[key];
      } else if (key in parent) {
        result[key] = parent[key];
      }
    }
    return result;
  }

  function getIconsTree(data, names) {
    const icons = data.icons;
    const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
    const resolved = /* @__PURE__ */ Object.create(null);
    function resolve(name) {
      if (icons[name]) {
        return resolved[name] = [];
      }
      if (!(name in resolved)) {
        resolved[name] = null;
        const parent = aliases[name] && aliases[name].parent;
        const value = parent && resolve(parent);
        if (value) {
          resolved[name] = [parent].concat(value);
        }
      }
      return resolved[name];
    }
    (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
    return resolved;
  }

  function internalGetIconData(data, name, tree) {
    const icons = data.icons;
    const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
    let currentProps = {};
    function parse(name2) {
      currentProps = mergeIconData(
        icons[name2] || aliases[name2],
        currentProps
      );
    }
    parse(name);
    tree.forEach(parse);
    return mergeIconData(data, currentProps);
  }

  function parseIconSet(data, callback) {
    const names = [];
    if (typeof data !== "object" || typeof data.icons !== "object") {
      return names;
    }
    if (data.not_found instanceof Array) {
      data.not_found.forEach((name) => {
        callback(name, null);
        names.push(name);
      });
    }
    const tree = getIconsTree(data);
    for (const name in tree) {
      const item = tree[name];
      if (item) {
        callback(name, internalGetIconData(data, name, item));
        names.push(name);
      }
    }
    return names;
  }

  const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
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
        // Allow provider without '@': "provider:prefix:name"
        provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
        prefix,
        name: name2
      };
      return validate && !validateIconName(result) ? null : result;
    }
    const name = colonSeparated[0];
    const dashSeparated = name.split("-");
    if (dashSeparated.length > 1) {
      const result = {
        provider,
        prefix: dashSeparated.shift(),
        name: dashSeparated.join("-")
      };
      return validate && !validateIconName(result) ? null : result;
    }
    if (allowSimpleName && provider === "") {
      const result = {
        provider,
        prefix: "",
        name
      };
      return validate && !validateIconName(result, allowSimpleName) ? null : result;
    }
    return null;
  };
  const validateIconName = (icon, allowSimpleName) => {
    if (!icon) {
      return false;
    }
    return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
  };

  const optionalPropertyDefaults = {
    provider: "",
    aliases: {},
    not_found: {},
    ...defaultIconDimensions
  };
  function checkOptionalProps(item, defaults) {
    for (const prop in defaults) {
      if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
        return false;
      }
    }
    return true;
  }
  function quicklyValidateIconSet(obj) {
    if (typeof obj !== "object" || obj === null) {
      return null;
    }
    const data = obj;
    if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
      return null;
    }
    if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
      return null;
    }
    const icons = data.icons;
    for (const name in icons) {
      const icon = icons[name];
      if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )) {
        return null;
      }
    }
    const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
    for (const name in aliases) {
      const icon = aliases[name];
      const parent = icon.parent;
      if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )) {
        return null;
      }
    }
    return data;
  }

  const dataStorage = /* @__PURE__ */ Object.create(null);
  function newStorage(provider, prefix) {
    return {
      provider,
      prefix,
      icons: /* @__PURE__ */ Object.create(null),
      missing: /* @__PURE__ */ new Set()
    };
  }
  function getStorage(provider, prefix) {
    const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
    return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
  }
  function addIconSet(storage, data) {
    if (!quicklyValidateIconSet(data)) {
      return [];
    }
    return parseIconSet(data, (name, icon) => {
      if (icon) {
        storage.icons[name] = icon;
      } else {
        storage.missing.add(name);
      }
    });
  }
  function addIconToStorage(storage, name, icon) {
    try {
      if (typeof icon.body === "string") {
        storage.icons[name] = { ...icon };
        return true;
      }
    } catch (err) {
    }
    return false;
  }
  function listIcons(provider, prefix) {
    let allIcons = [];
    const providers = typeof provider === "string" ? [provider] : Object.keys(dataStorage);
    providers.forEach((provider2) => {
      const prefixes = typeof provider2 === "string" && typeof prefix === "string" ? [prefix] : Object.keys(dataStorage[provider2] || {});
      prefixes.forEach((prefix2) => {
        const storage = getStorage(provider2, prefix2);
        allIcons = allIcons.concat(
          Object.keys(storage.icons).map(
            (name) => (provider2 !== "" ? "@" + provider2 + ":" : "") + prefix2 + ":" + name
          )
        );
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
    if (icon) {
      const storage = getStorage(icon.provider, icon.prefix);
      const iconName = icon.name;
      return storage.icons[iconName] || (storage.missing.has(iconName) ? null : void 0);
    }
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
      provider = data.provider || "";
    }
    if (simpleNames && !provider && !data.prefix) {
      let added = false;
      if (quicklyValidateIconSet(data)) {
        data.prefix = "";
        parseIconSet(data, (name, icon) => {
          if (icon && addIcon(name, icon)) {
            added = true;
          }
        });
      }
      return added;
    }
    const prefix = data.prefix;
    if (!validateIconName({
      provider,
      prefix,
      name: "a"
    })) {
      return false;
    }
    const storage = getStorage(provider, prefix);
    return !!addIconSet(storage, data);
  }
  function iconExists(name) {
    return !!getIconData(name);
  }
  function getIcon(name) {
    const result = getIconData(name);
    return result ? {
      ...defaultIconProps,
      ...result
    } : null;
  }

  const defaultIconSizeCustomisations = Object.freeze({
    width: null,
    height: null
  });
  const defaultIconCustomisations = Object.freeze({
    // Dimensions
    ...defaultIconSizeCustomisations,
    // Transformations
    ...defaultIconTransformations
  });

  const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
  const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
  function calculateSize(size, ratio, precision) {
    if (ratio === 1) {
      return size;
    }
    precision = precision || 100;
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

  const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
  function iconToSVG(icon, customisations) {
    const fullIcon = {
      ...defaultIconProps,
      ...icon
    };
    const fullCustomisations = {
      ...defaultIconCustomisations,
      ...customisations
    };
    const box = {
      left: fullIcon.left,
      top: fullIcon.top,
      width: fullIcon.width,
      height: fullIcon.height
    };
    let body = fullIcon.body;
    [fullIcon, fullCustomisations].forEach((props) => {
      const transformations = [];
      const hFlip = props.hFlip;
      const vFlip = props.vFlip;
      let rotation = props.rotate;
      if (hFlip) {
        if (vFlip) {
          rotation += 2;
        } else {
          transformations.push(
            "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
          );
          transformations.push("scale(-1 1)");
          box.top = box.left = 0;
        }
      } else if (vFlip) {
        transformations.push(
          "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
        );
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
          transformations.unshift(
            "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
          );
          break;
        case 2:
          transformations.unshift(
            "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
          );
          break;
        case 3:
          tempValue = box.width / 2 + box.left;
          transformations.unshift(
            "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
          );
          break;
      }
      if (rotation % 2 === 1) {
        if (box.left !== box.top) {
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
    const customisationsWidth = fullCustomisations.width;
    const customisationsHeight = fullCustomisations.height;
    const boxWidth = box.width;
    const boxHeight = box.height;
    let width;
    let height;
    if (customisationsWidth === null) {
      height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
      width = calculateSize(height, boxWidth / boxHeight);
    } else {
      width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
      height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    }
    const attributes = {};
    const setAttr = (prop, value) => {
      if (!isUnsetKeyword(value)) {
        attributes[prop] = value.toString();
      }
    };
    setAttr("width", width);
    setAttr("height", height);
    attributes.viewBox = box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString();
    return {
      attributes,
      body
    };
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
    const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
    ids.forEach((id) => {
      const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
      const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      body = body.replace(
        // Allowed characters before id: [#;"]
        // Allowed characters after id: [)"], .[a-z]
        new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
        "$1" + newID + suffix + "$3"
      );
    });
    body = body.replace(new RegExp(suffix, "g"), "");
    return body;
  }

  function mergeCustomisations(defaults, item) {
    const result = {
      ...defaults
    };
    for (const key in item) {
      const value = item[key];
      const valueType = typeof value;
      if (key in defaultIconSizeCustomisations) {
        if (value === null || value && (valueType === "string" || valueType === "number")) {
          result[key] = value;
        }
      } else if (valueType === typeof result[key]) {
        result[key] = key === "rotate" ? value % 4 : value;
      }
    }
    return result;
  }

  const defaultExtendedIconCustomisations = {
      ...defaultIconCustomisations,
      inline: false,
  };
  /**
   * Class names
   */
  const blockClass = 'iconify';
  const inlineClass = 'iconify-inline';
  /**
   * Names of properties to add to nodes
   */
  const elementDataProperty = ('iconifyData' + Date.now());

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
      // Create item, add it to list
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
      nodes = nodes.filter((node) => root !== node &&
          root !== (typeof node.node === 'function' ? node.node() : node.node));
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
      if (doc.readyState && doc.readyState !== 'loading') {
          callback();
      }
      else {
          doc.addEventListener('DOMContentLoaded', callback);
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
                      item.target[elementDataProperty] !==
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
      if (!root || !window) {
          // document.body is not available yet or window is missing
          return;
      }
      if (!observer) {
          observer = {
              paused: 0,
          };
          node.observer = observer;
      }
      // Create new instance, observe
      observer.instance = new window.MutationObserver(checkMutations.bind(null, node));
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
      const providerStorage = storage[provider] || (storage[provider] = /* @__PURE__ */ Object.create(null));
      const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
      let list;
      if (name in localStorage.icons) {
        list = result.loaded;
      } else if (prefix === "" || localStorage.missing.has(name)) {
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

  function removeCallback(storages, id) {
    storages.forEach((storage) => {
      const items = storage.loaderCallbacks;
      if (items) {
        storage.loaderCallbacks = items.filter((row) => row.id !== id);
      }
    });
  }
  function updateCallbacks(storage) {
    if (!storage.pendingCallbacksFlag) {
      storage.pendingCallbacksFlag = true;
      setTimeout(() => {
        storage.pendingCallbacksFlag = false;
        const items = storage.loaderCallbacks ? storage.loaderCallbacks.slice(0) : [];
        if (!items.length) {
          return;
        }
        let hasPending = false;
        const provider = storage.provider;
        const prefix = storage.prefix;
        items.forEach((item) => {
          const icons = item.icons;
          const oldLength = icons.pending.length;
          icons.pending = icons.pending.filter((icon) => {
            if (icon.prefix !== prefix) {
              return true;
            }
            const name = icon.name;
            if (storage.icons[name]) {
              icons.loaded.push({
                provider,
                prefix,
                name
              });
            } else if (storage.missing.has(name)) {
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
              removeCallback([storage], item.id);
            }
            item.callback(
              icons.loaded.slice(0),
              icons.missing.slice(0),
              icons.pending.slice(0),
              item.abort
            );
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
    pendingSources.forEach((storage) => {
      (storage.loaderCallbacks || (storage.loaderCallbacks = [])).push(item);
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
      const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames) : item;
      if (icon) {
        result.push(icon);
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
  function initRedundancy(cfg) {
    const config = {
      ...defaultConfig,
      ...cfg
    };
    let queries = [];
    function cleanup() {
      queries = queries.filter((item) => item().status === "pending");
    }
    function query(payload, queryCallback, doneCallback) {
      const query2 = sendQuery(
        config,
        payload,
        queryCallback,
        (data, error) => {
          cleanup();
          if (doneCallback) {
            doneCallback(data, error);
          }
        }
      );
      queries.push(query2);
      return query2;
    }
    function find(callback) {
      return queries.find((value) => {
        return callback(value);
      }) || null;
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
      // API hosts
      resources,
      // Root path
      path: source.path || "/",
      // URL length limit
      maxURL: source.maxURL || 500,
      // Timeout before next host is used.
      rotate: source.rotate || 750,
      // Timeout before failing query.
      timeout: source.timeout || 5e3,
      // Randomise default API end point.
      random: source.random === true,
      // Start index
      index: source.index || 0,
      // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
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
    if (!redundancyCache[provider]) {
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

  const browserCacheVersion = "iconify2";
  const browserCachePrefix = "iconify";
  const browserCacheCountKey = browserCachePrefix + "-count";
  const browserCacheVersionKey = browserCachePrefix + "-version";
  const browserStorageHour = 36e5;
  const browserStorageCacheExpiration = 168;

  function getStoredItem(func, key) {
    try {
      return func.getItem(key);
    } catch (err) {
    }
  }
  function setStoredItem(func, key, value) {
    try {
      func.setItem(key, value);
      return true;
    } catch (err) {
    }
  }
  function removeStoredItem(func, key) {
    try {
      func.removeItem(key);
    } catch (err) {
    }
  }

  function setBrowserStorageItemsCount(storage, value) {
    return setStoredItem(storage, browserCacheCountKey, value.toString());
  }
  function getBrowserStorageItemsCount(storage) {
    return parseInt(getStoredItem(storage, browserCacheCountKey)) || 0;
  }

  const browserStorageConfig = {
    local: true,
    session: true
  };
  const browserStorageEmptyItems = {
    local: /* @__PURE__ */ new Set(),
    session: /* @__PURE__ */ new Set()
  };
  let browserStorageStatus = false;
  function setBrowserStorageStatus(status) {
    browserStorageStatus = status;
  }

  let _window = typeof window === "undefined" ? {} : window;
  function getBrowserStorage(key) {
    const attr = key + "Storage";
    try {
      if (_window && _window[attr] && typeof _window[attr].length === "number") {
        return _window[attr];
      }
    } catch (err) {
    }
    browserStorageConfig[key] = false;
  }

  function iterateBrowserStorage(key, callback) {
    const func = getBrowserStorage(key);
    if (!func) {
      return;
    }
    const version = getStoredItem(func, browserCacheVersionKey);
    if (version !== browserCacheVersion) {
      if (version) {
        const total2 = getBrowserStorageItemsCount(func);
        for (let i = 0; i < total2; i++) {
          removeStoredItem(func, browserCachePrefix + i.toString());
        }
      }
      setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
      setBrowserStorageItemsCount(func, 0);
      return;
    }
    const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
    const parseItem = (index) => {
      const name = browserCachePrefix + index.toString();
      const item = getStoredItem(func, name);
      if (typeof item !== "string") {
        return;
      }
      try {
        const data = JSON.parse(item);
        if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
        callback(data, index)) {
          return true;
        }
      } catch (err) {
      }
      removeStoredItem(func, name);
    };
    let total = getBrowserStorageItemsCount(func);
    for (let i = total - 1; i >= 0; i--) {
      if (!parseItem(i)) {
        if (i === total - 1) {
          total--;
          setBrowserStorageItemsCount(func, total);
        } else {
          browserStorageEmptyItems[key].add(i);
        }
      }
    }
  }

  function initBrowserStorage() {
    if (browserStorageStatus) {
      return;
    }
    setBrowserStorageStatus(true);
    for (const key in browserStorageConfig) {
      iterateBrowserStorage(key, (item) => {
        const iconSet = item.data;
        const provider = item.provider;
        const prefix = iconSet.prefix;
        const storage = getStorage(
          provider,
          prefix
        );
        if (!addIconSet(storage, iconSet).length) {
          return false;
        }
        const lastModified = iconSet.lastModified || -1;
        storage.lastModifiedCached = storage.lastModifiedCached ? Math.min(storage.lastModifiedCached, lastModified) : lastModified;
        return true;
      });
    }
  }

  function updateLastModified(storage, lastModified) {
    const lastValue = storage.lastModifiedCached;
    if (
      // Matches or newer
      lastValue && lastValue >= lastModified
    ) {
      return lastValue === lastModified;
    }
    storage.lastModifiedCached = lastModified;
    if (lastValue) {
      for (const key in browserStorageConfig) {
        iterateBrowserStorage(key, (item) => {
          const iconSet = item.data;
          return item.provider !== storage.provider || iconSet.prefix !== storage.prefix || iconSet.lastModified === lastModified;
        });
      }
    }
    return true;
  }
  function storeInBrowserStorage(storage, data) {
    if (!browserStorageStatus) {
      initBrowserStorage();
    }
    function store(key) {
      let func;
      if (!browserStorageConfig[key] || !(func = getBrowserStorage(key))) {
        return;
      }
      const set = browserStorageEmptyItems[key];
      let index;
      if (set.size) {
        set.delete(index = Array.from(set).shift());
      } else {
        index = getBrowserStorageItemsCount(func);
        if (!setBrowserStorageItemsCount(func, index + 1)) {
          return;
        }
      }
      const item = {
        cached: Math.floor(Date.now() / browserStorageHour),
        provider: storage.provider,
        data
      };
      return setStoredItem(
        func,
        browserCachePrefix + index.toString(),
        JSON.stringify(item)
      );
    }
    if (data.lastModified && !updateLastModified(storage, data.lastModified)) {
      return;
    }
    if (!Object.keys(data.icons).length) {
      return;
    }
    if (data.not_found) {
      data = Object.assign({}, data);
      delete data.not_found;
    }
    if (!store("local")) {
      store("session");
    }
  }

  function emptyCallback() {
  }
  function loadedNewIcons(storage) {
    if (!storage.iconsLoaderFlag) {
      storage.iconsLoaderFlag = true;
      setTimeout(() => {
        storage.iconsLoaderFlag = false;
        updateCallbacks(storage);
      });
    }
  }
  function loadNewIcons(storage, icons) {
    if (!storage.iconsToLoad) {
      storage.iconsToLoad = icons;
    } else {
      storage.iconsToLoad = storage.iconsToLoad.concat(icons).sort();
    }
    if (!storage.iconsQueueFlag) {
      storage.iconsQueueFlag = true;
      setTimeout(() => {
        storage.iconsQueueFlag = false;
        const { provider, prefix } = storage;
        const icons2 = storage.iconsToLoad;
        delete storage.iconsToLoad;
        let api;
        if (!icons2 || !(api = getAPIModule(provider))) {
          return;
        }
        const params = api.prepare(provider, prefix, icons2);
        params.forEach((item) => {
          sendAPIQuery(provider, item, (data) => {
            if (typeof data !== "object") {
              item.icons.forEach((name) => {
                storage.missing.add(name);
              });
            } else {
              try {
                const parsed = addIconSet(
                  storage,
                  data
                );
                if (!parsed.length) {
                  return;
                }
                const pending = storage.pendingIcons;
                if (pending) {
                  parsed.forEach((name) => {
                    pending.delete(name);
                  });
                }
                storeInBrowserStorage(storage, data);
              } catch (err) {
                console.error(err);
              }
            }
            loadedNewIcons(storage);
          });
        });
      });
    }
  }
  const isPending = (icon) => {
    const storage = getStorage(
      icon.provider,
      icon.prefix
    );
    const pending = storage.pendingIcons;
    return !!(pending && pending.has(icon.name));
  };
  const loadIcons = (icons, callback) => {
    const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
    const sortedIcons = sortIcons(cleanedIcons);
    if (!sortedIcons.pending.length) {
      let callCallback = true;
      if (callback) {
        setTimeout(() => {
          if (callCallback) {
            callback(
              sortedIcons.loaded,
              sortedIcons.missing,
              sortedIcons.pending,
              emptyCallback
            );
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
      const { provider, prefix } = icon;
      if (prefix === lastPrefix && provider === lastProvider) {
        return;
      }
      lastProvider = provider;
      lastPrefix = prefix;
      sources.push(getStorage(provider, prefix));
      const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
      if (!providerNewIcons[prefix]) {
        providerNewIcons[prefix] = [];
      }
    });
    sortedIcons.pending.forEach((icon) => {
      const { provider, prefix, name } = icon;
      const storage = getStorage(provider, prefix);
      const pendingQueue = storage.pendingIcons || (storage.pendingIcons = /* @__PURE__ */ new Set());
      if (!pendingQueue.has(name)) {
        pendingQueue.add(name);
        newIcons[provider][prefix].push(name);
      }
    });
    sources.forEach((storage) => {
      const { provider, prefix } = storage;
      if (newIcons[provider][prefix].length) {
        loadNewIcons(storage, newIcons[provider][prefix]);
      }
    });
    return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
  };

  /**
   * Compare props
   */
  function propsChanged(props1, props2) {
      if (props1.name !== props2.name || props1.mode !== props2.mode) {
          return true;
      }
      const customisations1 = props1.customisations;
      const customisations2 = props2.customisations;
      for (const key in defaultExtendedIconCustomisations) {
          if (customisations1[key] !== customisations2[key]) {
              return true;
          }
      }
      return false;
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

  /**
   * Size attributes
   */
  const sizeAttributes = ['width', 'height'];
  /**
   * Boolean attributes
   */
  const booleanAttributes = [
      'inline',
      'hFlip',
      'vFlip',
  ];
  /**
   * Get attribute value
   */
  function getBooleanAttribute(value, key) {
      if (value === key || value === 'true') {
          return true;
      }
      if (value === '' || value === 'false') {
          return false;
      }
      return null;
  }
  /**
   * Get element properties from HTML element
   */
  function getElementProps(element) {
      // Get icon name
      const name = element.getAttribute('data-icon');
      const icon = typeof name === 'string' && stringToIcon(name, true);
      if (!icon) {
          return null;
      }
      // Get defaults and inline
      const customisations = {
          ...defaultExtendedIconCustomisations,
          inline: element.classList && element.classList.contains(inlineClass),
      };
      // Get dimensions
      sizeAttributes.forEach((attr) => {
          const value = element.getAttribute('data-' + attr);
          if (value) {
              customisations[attr] = value;
          }
      });
      // Get rotation
      const rotation = element.getAttribute('data-rotate');
      if (typeof rotation === 'string') {
          customisations.rotate = rotateFromString(rotation);
      }
      // Get flip shorthand
      const flip = element.getAttribute('data-flip');
      if (typeof flip === 'string') {
          flipFromString(customisations, flip);
      }
      // Boolean attributes
      booleanAttributes.forEach((attr) => {
          const key = 'data-' + attr;
          const value = getBooleanAttribute(element.getAttribute(key), key);
          if (typeof value === 'boolean') {
              customisations[attr] = value;
          }
      });
      // Get render mode. Not checking actual value because incorrect values are treated as inline
      const mode = element.getAttribute('data-mode');
      return {
          name,
          icon,
          customisations,
          mode,
      };
  }

  /**
   * Selector combining class names and tags
   */
  const selector = 'svg.' +
      blockClass +
      ', i.' +
      blockClass +
      ', span.' +
      blockClass +
      ', i.' +
      inlineClass +
      ', span.' +
      inlineClass;
  /**
   * Find all parent nodes in DOM
   */
  function scanRootNode(root) {
      const nodes = [];
      root.querySelectorAll(selector).forEach((node) => {
          // Get props, ignore SVG rendered outside of SVG framework
          const props = node[elementDataProperty] || node.tagName.toLowerCase() !== 'svg'
              ? getElementProps(node)
              : null;
          if (props) {
              nodes.push({
                  node,
                  props,
              });
          }
      });
      return nodes;
  }

  function iconToHTML(body, attributes) {
    let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
    for (const attr in attributes) {
      renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
  }

  let policy;
  function createPolicy() {
    try {
      policy = window.trustedTypes.createPolicy("iconify", {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        createHTML: (s) => s
      });
    } catch (err) {
      policy = null;
    }
  }
  function cleanUpInnerHTML(html) {
    if (policy === void 0) {
      createPolicy();
    }
    return policy ? policy.createHTML(html) : html;
  }

  /**
   * Get classes to add from icon name
   */
  function iconClasses(iconName) {
      const classesToAdd = new Set(['iconify']);
      ['provider', 'prefix'].forEach((attr) => {
          if (iconName[attr]) {
              classesToAdd.add('iconify--' + iconName[attr]);
          }
      });
      return classesToAdd;
  }
  /**
   * Add classes to SVG, removing previously added classes, keeping custom classes
   */
  function applyClasses(svg, classes, previouslyAddedClasses, placeholder) {
      const svgClasses = svg.classList;
      // Copy classes from placeholder
      if (placeholder) {
          const placeholderClasses = placeholder.classList;
          Array.from(placeholderClasses).forEach((item) => {
              svgClasses.add(item);
          });
      }
      // Add new classes
      const addedClasses = [];
      classes.forEach((item) => {
          if (!svgClasses.contains(item)) {
              // Add new class
              svgClasses.add(item);
              addedClasses.push(item);
          }
          else if (previouslyAddedClasses.has(item)) {
              // Was added before: keep it
              addedClasses.push(item);
          }
      });
      // Remove previously added classes
      previouslyAddedClasses.forEach((item) => {
          if (!classes.has(item)) {
              // Class that was added before, but no longer needed
              svgClasses.remove(item);
          }
      });
      return addedClasses;
  }

  /**
   * Copy old styles, apply new styles
   */
  function applyStyle(svg, styles, previouslyAddedStyles) {
      const svgStyle = svg.style;
      // Remove previously added styles
      (previouslyAddedStyles || []).forEach((prop) => {
          svgStyle.removeProperty(prop);
      });
      // Apply new styles, ignoring styles that already exist
      const appliedStyles = [];
      for (const prop in styles) {
          if (!svgStyle.getPropertyValue(prop)) {
              appliedStyles.push(prop);
              svgStyle.setProperty(prop, styles[prop]);
          }
      }
      return appliedStyles;
  }

  /**
   * Render icon as inline SVG
   */
  function renderInlineSVG(element, props, iconData) {
      // Create placeholder. Why placeholder? innerHTML setter on SVG does not work in some environments.
      let span;
      try {
          span = document.createElement('span');
      }
      catch (err) {
          return element;
      }
      // Generate data to render
      const customisations = props.customisations;
      const renderData = iconToSVG(iconData, customisations);
      // Get old data
      const oldData = element[elementDataProperty];
      // Generate SVG
      const html = iconToHTML(replaceIDs(renderData.body), {
          'aria-hidden': 'true',
          'role': 'img',
          ...renderData.attributes,
      });
      span.innerHTML = cleanUpInnerHTML(html);
      // Get SVG element
      const svg = span.childNodes[0];
      // Add attributes
      const placeholderAttributes = element.attributes;
      for (let i = 0; i < placeholderAttributes.length; i++) {
          const item = placeholderAttributes.item(i);
          const name = item.name;
          if (name !== 'class' && !svg.hasAttribute(name)) {
              svg.setAttribute(name, item.value);
          }
      }
      // Add classes
      const classesToAdd = iconClasses(props.icon);
      const addedClasses = applyClasses(svg, classesToAdd, new Set(oldData && oldData.addedClasses), element);
      // Update style
      const addedStyles = applyStyle(svg, customisations.inline
          ? {
              'vertical-align': '-0.125em',
          }
          : {}, oldData && oldData.addedStyles);
      // Add data to element
      const newData = {
          ...props,
          status: 'loaded',
          addedClasses,
          addedStyles,
      };
      svg[elementDataProperty] = newData;
      // Replace old element
      if (element.parentNode) {
          element.parentNode.replaceChild(svg, element);
      }
      return svg;
  }

  function encodeSVGforURL(svg) {
    return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
  }
  function svgToData(svg) {
    return "data:image/svg+xml," + encodeSVGforURL(svg);
  }
  function svgToURL(svg) {
    return 'url("' + svgToData(svg) + '")';
  }

  const commonProps = {
      display: 'inline-block',
  };
  const monotoneProps = {
      'background-color': 'currentColor',
  };
  const coloredProps = {
      'background-color': 'transparent',
  };
  // Dynamically add common props to variables above
  const propsToAdd = {
      image: 'var(--svg)',
      repeat: 'no-repeat',
      size: '100% 100%',
  };
  const propsToAddTo = {
      '-webkit-mask': monotoneProps,
      'mask': monotoneProps,
      'background': coloredProps,
  };
  for (const prefix in propsToAddTo) {
      const list = propsToAddTo[prefix];
      for (const prop in propsToAdd) {
          list[prefix + '-' + prop] = propsToAdd[prop];
      }
  }
  /**
   * Fix size: add 'px' to numbers
   */
  function fixSize(value) {
      return value + (value.match(/^[-0-9.]+$/) ? 'px' : '');
  }
  /**
   * Render icon as inline SVG
   */
  function renderBackground(element, props, iconData, useMask) {
      // Generate data to render
      const customisations = props.customisations;
      const renderData = iconToSVG(iconData, customisations);
      const renderAttribs = renderData.attributes;
      // Get old data
      const oldData = element[elementDataProperty];
      // Generate SVG
      const html = iconToHTML(renderData.body, {
          ...renderAttribs,
          width: iconData.width + '',
          height: iconData.height + '',
      });
      // Add classes
      const classesToAdd = iconClasses(props.icon);
      const addedClasses = applyClasses(element, classesToAdd, new Set(oldData && oldData.addedClasses));
      // Update style
      const url = svgToURL(html);
      const newStyles = {
          '--svg': url,
          'width': fixSize(renderAttribs.width),
          'height': fixSize(renderAttribs.height),
          ...commonProps,
          ...(useMask ? monotoneProps : coloredProps),
      };
      if (customisations.inline) {
          newStyles['vertical-align'] = '-0.125em';
      }
      const addedStyles = applyStyle(element, newStyles, oldData && oldData.addedStyles);
      // Add data to element
      const newData = {
          ...props,
          status: 'loaded',
          addedClasses,
          addedStyles,
      };
      element[elementDataProperty] = newData;
      return element;
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
   * Scan node for placeholders
   */
  function scanDOM(rootNode, addTempNode = false) {
      // List of icons to load: [provider][prefix] = Set<name>
      const iconsToLoad = Object.create(null);
      function getIcon(icon, load) {
          const { provider, prefix, name } = icon;
          const storage = getStorage(provider, prefix);
          const storedIcon = storage.icons[name];
          if (storedIcon) {
              return {
                  status: 'loaded',
                  icon: storedIcon,
              };
          }
          if (storage.missing.has(name)) {
              return {
                  status: 'missing',
              };
          }
          if (load && !isPending(icon)) {
              const providerIconsToLoad = iconsToLoad[provider] ||
                  (iconsToLoad[provider] = Object.create(null));
              const set = providerIconsToLoad[prefix] ||
                  (providerIconsToLoad[prefix] = new Set());
              set.add(name);
          }
          return {
              status: 'loading',
          };
      }
      // Parse all root nodes
      (rootNode ? [rootNode] : listRootNodes()).forEach((observedNode) => {
          const root = typeof observedNode.node === 'function'
              ? observedNode.node()
              : observedNode.node;
          if (!root || !root.querySelectorAll) {
              return;
          }
          // Track placeholders
          let hasPlaceholders = false;
          // Observer
          let paused = false;
          /**
           * Render icon
           */
          function render(element, props, iconData) {
              if (!paused) {
                  paused = true;
                  pauseObservingNode(observedNode);
              }
              if (element.tagName.toUpperCase() !== 'SVG') {
                  // Check for one of style modes
                  const mode = props.mode;
                  const isMask = mode === 'mask' ||
                      (mode === 'bg'
                          ? false
                          : mode === 'style'
                              ? iconData.body.indexOf('currentColor') !== -1
                              : null);
                  if (typeof isMask === 'boolean') {
                      renderBackground(element, props, {
                          ...defaultIconProps,
                          ...iconData,
                      }, isMask);
                      return;
                  }
              }
              renderInlineSVG(element, props, iconData);
          }
          // Find all elements
          scanRootNode(root).forEach(({ node, props }) => {
              // Check if item already has props
              const oldData = node[elementDataProperty];
              if (!oldData) {
                  // New icon without data
                  const { status, icon } = getIcon(props.icon, true);
                  if (icon) {
                      // Ready to render!
                      render(node, props, icon);
                      return;
                  }
                  // Loading or missing
                  hasPlaceholders = hasPlaceholders || status === 'loading';
                  node[elementDataProperty] = {
                      ...props,
                      status,
                  };
                  return;
              }
              // Previously found icon
              let item;
              if (!propsChanged(oldData, props)) {
                  // Props have not changed. Check status
                  const oldStatus = oldData.status;
                  if (oldStatus !== 'loading') {
                      return;
                  }
                  item = getIcon(props.icon, false);
                  if (!item.icon) {
                      // Nothing to render
                      oldData.status = item.status;
                      return;
                  }
              }
              else {
                  // Properties have changed: load icon if name has changed
                  item = getIcon(props.icon, oldData.name !== props.name);
                  if (!item.icon) {
                      // Cannot render icon: update status and props
                      hasPlaceholders =
                          hasPlaceholders || item.status === 'loading';
                      Object.assign(oldData, {
                          ...props,
                          status: item.status,
                      });
                      return;
                  }
              }
              // Re-render icon
              render(node, props, item.icon);
          });
          // Observed node stuff
          if (observedNode.temporary && !hasPlaceholders) {
              // Remove temporary node
              stopObserving(root);
          }
          else if (addTempNode && hasPlaceholders) {
              // Add new temporary node
              observe(root, true);
          }
          else if (paused && observedNode.observer) {
              // Resume observer
              resumeObservingNode(observedNode);
          }
      });
      // Load icons
      for (const provider in iconsToLoad) {
          const providerIconsToLoad = iconsToLoad[provider];
          for (const prefix in providerIconsToLoad) {
              const set = providerIconsToLoad[prefix];
              loadIcons(Array.from(set).map((name) => ({
                  provider,
                  prefix,
                  name,
              })), checkPendingIcons);
          }
      }
  }
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

  function generateIcon(name, customisations, returnString = false) {
      // Get icon data
      const iconData = getIconData(name);
      if (!iconData) {
          return null;
      }
      // Split name
      const iconName = stringToIcon(name);
      // Clean up customisations
      const changes = mergeCustomisations(defaultExtendedIconCustomisations, customisations || {});
      // Get data
      const result = renderInlineSVG(document.createElement('span'), {
          name,
          icon: iconName,
          customisations: changes,
      }, iconData);
      return returnString
          ? result.outerHTML
          : result;
  }
  /**
   * Get version
   */
  function getVersion() {
      return '3.1.1';
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
      const changes = mergeCustomisations(defaultExtendedIconCustomisations, customisations || {});
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
      // IconifyBuilderFunctions
      replaceIDs,
      calculateSize,
      buildIcon: iconToSVG,
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
  exports.buildIcon = iconToSVG;
  exports.calculateSize = calculateSize;
  exports.default = Iconify;
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
