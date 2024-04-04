var _a;
import { getFallback, TolgeeCore } from "@tolgee/core";
export * from "@tolgee/core";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
const DEVTOOLS_ID = "__tolgee_dev_tools";
const PREFERRED_LANGUAGES_LOCAL_STORAGE_KEY = "__tolgee_preferredLanguages";
const TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE = "data-tolgee-key-only";
const TOLGEE_RESTRICT_ATTRIBUTE = "data-tolgee-restricted";
const TOLGEE_ATTRIBUTE_NAME = "_tolgee";
const TOLGEE_HIGHLIGHTER_CLASS = "_tolgee-highlighter";
function isSSR() {
  var _a2, _b;
  return typeof ((_b = (_a2 = globalThis.window) == null ? void 0 : _a2.document) == null ? void 0 : _b.createElement) === "undefined";
}
function throwIfSSR(origin) {
  if (isSSR()) {
    throw new Error(`${origin}: Can't run on the server`);
  }
}
function DomHelper(options) {
  function getParentElement(node) {
    if (node.parentElement) {
      return node.parentElement;
    }
    if (node.ownerElement) {
      return node.ownerElement || void 0;
    }
  }
  const self2 = Object.freeze({
    getSuitableParent(node) {
      const domParent = getParentElement(node);
      if (domParent === void 0) {
        console.error(node);
        throw new Error("No suitable parent found for node above.");
      }
      if (!options.passToParent) {
        return domParent;
      }
      if (Array.isArray(options.passToParent)) {
        const tagNameEquals = (elementTagName) => domParent.tagName.toLowerCase() === elementTagName.toLowerCase();
        if (options.passToParent.findIndex(tagNameEquals) === -1) {
          return domParent;
        }
      }
      if (typeof options.passToParent === "function") {
        if (!options.passToParent(domParent)) {
          return domParent;
        }
      }
      return self2.getSuitableParent(domParent);
    }
  });
  return self2;
}
function initElementMeta(element) {
  return {
    element,
    nodes: /* @__PURE__ */ new Map()
  };
}
function initNodeMeta(oldTextContent, keys) {
  return {
    oldTextContent,
    keys
  };
}
const HIGHLIGHTER_BASE_STYLE = {
  position: "fixed",
  boxSizing: "content-box",
  zIndex: String(Number.MAX_SAFE_INTEGER),
  contain: "layout",
  display: "block",
  borderStyle: "solid",
  borderRadius: "4px"
};
function ElementHighlighter({ highlightColor, highlightWidth }) {
  function initHighlightFunction(element, elementMeta) {
    elementMeta.highlight = () => {
      if (!element.isConnected) {
        return;
      }
      let highlightEl = elementMeta.highlightEl;
      if (!highlightEl) {
        highlightEl = document.createElement("div");
        highlightEl.classList.add(TOLGEE_HIGHLIGHTER_CLASS);
        Object.entries(HIGHLIGHTER_BASE_STYLE).forEach(([key, value]) => {
          highlightEl.style[key] = value;
        });
        highlightEl.style.borderColor = highlightColor;
        elementMeta.highlightEl = highlightEl;
        document.body.appendChild(highlightEl);
      }
      const shape = element.getBoundingClientRect();
      highlightEl.style.borderWidth = highlightWidth + "px";
      highlightEl.style.top = shape.top - highlightWidth + "px";
      highlightEl.style.left = shape.left - highlightWidth + "px";
      highlightEl.style.width = shape.width + "px";
      highlightEl.style.height = shape.height + "px";
    };
  }
  function initUnhighlightFunction(element, elementMeta) {
    elementMeta.unhighlight = () => {
      var _a2;
      (_a2 = elementMeta.highlightEl) == null ? void 0 : _a2.remove();
      elementMeta.highlightEl = void 0;
    };
  }
  return Object.freeze({
    initHighlighter(element, elementMeta) {
      initHighlightFunction(element, elementMeta);
      initUnhighlightFunction(element, elementMeta);
    }
  });
}
function getNodeText(node) {
  return node.textContent;
}
function setNodeText(node, text) {
  node.textContent = text;
}
function compareDescriptors(descriptor, criteria) {
  var _a2;
  const keyMatches = descriptor.key === void 0 || criteria.key === void 0 || criteria.key === descriptor.key;
  const nsMatches = descriptor.ns === void 0 || criteria.ns === void 0 || ((_a2 = descriptor.ns) == null ? void 0 : _a2.findIndex((ns) => {
    var _a3;
    return (_a3 = criteria.ns) == null ? void 0 : _a3.includes(ns);
  })) !== -1;
  return keyMatches && nsMatches;
}
const eCapture = {
  capture: true
};
const ePassive = {
  capture: true,
  passive: true
};
const MODIFIER_MAP = /* @__PURE__ */ new Map([
  ["Control", "ctrlKey"],
  ["Alt", "altKey"],
  ["Meta", "metaKey"],
  ["Shift", "shiftKey"]
]);
function MouseEventHandler({
  highlightKeys,
  elementStore,
  onClick,
  options
}) {
  var _a2, _b;
  const keysDown = /* @__PURE__ */ new Set();
  let highlighted;
  let cursorPosition;
  let subscribedEvents = [];
  const documentOrShadowRoot = ((_a2 = options.targetElement) == null ? void 0 : _a2.getRootNode()) || document;
  const targetDocument = ((_b = options.targetElement) == null ? void 0 : _b.ownerDocument) || document;
  function highlight(el) {
    var _a3;
    if (highlighted !== el) {
      unhighlight();
      const meta = elementStore.get(el);
      if (meta) {
        meta.preventClean = true;
        (_a3 = meta.highlight) == null ? void 0 : _a3.call(meta);
        highlighted = el;
      }
    }
  }
  function unhighlight() {
    var _a3;
    const meta = elementStore.get(highlighted);
    if (meta) {
      meta.preventClean = false;
      (_a3 = meta.unhighlight) == null ? void 0 : _a3.call(meta);
      highlighted = void 0;
    }
  }
  function updateHighlight() {
    const position = cursorPosition;
    let newHighlighted;
    if (position && areKeysDown()) {
      const elements = documentOrShadowRoot.elementsFromPoint(position.x, position.y) || [];
      newHighlighted = getClosestTolgeeElement(elements);
    }
    highlight(newHighlighted);
  }
  function updateCursorPosition(position) {
    cursorPosition = position;
    updateHighlight();
  }
  function updateModifiers(e) {
    for (const [modifier, modifierProperty] of MODIFIER_MAP.entries()) {
      if (keysDown.has(modifier) && !e[modifierProperty]) {
        keysDown.delete(modifier);
      } else if (!keysDown.has(modifier) && e[modifierProperty]) {
        keysDown.add(modifier);
      }
    }
  }
  function blockEvents(e) {
    updateModifiers(e);
    if (areKeysDown() && !isInUiDialog(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  function onMouseMove(e) {
    updateModifiers(e);
    updateCursorPosition({ x: e.clientX, y: e.clientY });
  }
  function onKeyDown(e) {
    updateModifiers(e);
    updateHighlight();
  }
  function onKeyUp(e) {
    updateModifiers(e);
    updateHighlight();
  }
  function onScroll() {
    var _a3;
    const meta = elementStore.get(highlighted);
    (_a3 = meta == null ? void 0 : meta.highlight) == null ? void 0 : _a3.call(meta);
  }
  function handleClick(e) {
    blockEvents(e);
    updateModifiers(e);
    updateCursorPosition({ x: e.clientX, y: e.clientY });
    if (areKeysDown() && highlighted) {
      onClick(e, highlighted);
      unhighlight();
    }
  }
  function subscribe(type, listener, options2) {
    targetDocument.addEventListener(type, listener, options2);
    subscribedEvents.push([type, listener, options2]);
  }
  function initEventListeners() {
    subscribe("keydown", onKeyDown, eCapture);
    subscribe("keyup", onKeyUp, eCapture);
    subscribe("mousemove", onMouseMove, ePassive);
    subscribe("scroll", onScroll, ePassive);
    subscribe("click", handleClick, eCapture);
    subscribe("mouseenter", blockEvents, eCapture);
    subscribe("mouseover", blockEvents, eCapture);
    subscribe("mouseout", blockEvents, eCapture);
    subscribe("mouseleave", blockEvents, eCapture);
    subscribe("mousedown", blockEvents, eCapture);
    subscribe("mouseup", blockEvents, eCapture);
  }
  function removeEventListeners() {
    for (const params of subscribedEvents) {
      targetDocument.removeEventListener(...params);
    }
    subscribedEvents = [];
  }
  function isInUiDialog(element) {
    return Boolean(findAncestor(element, (el) => el.id === DEVTOOLS_ID));
  }
  function getClosestTolgeeElement(elements) {
    for (const element of elements) {
      const result = findAncestor(
        element,
        (el) => elementStore.get(el)
      );
      if (result !== void 0) {
        return result || void 0;
      }
    }
  }
  function findAncestor(element, func) {
    if (element.id === DEVTOOLS_ID) {
      return null;
    }
    if (func(element)) {
      return element;
    }
    if (element == null ? void 0 : element.parentElement) {
      return findAncestor(element.parentElement, func);
    }
    return void 0;
  }
  function areKeysDown() {
    for (const key of highlightKeys) {
      if (!keysDown.has(key)) {
        return false;
      }
    }
    return true;
  }
  return Object.freeze({
    stop() {
      removeEventListeners();
    },
    run() {
      initEventListeners();
    }
  });
}
function ElementRegistry(options, elementStore, onClick) {
  const elementHighlighter = ElementHighlighter({
    highlightColor: options.highlightColor,
    highlightWidth: options.highlightWidth
  });
  const eventHandler = MouseEventHandler({
    highlightKeys: options.highlightKeys,
    elementStore,
    onClick(event, el) {
      const meta = elementStore.get(el);
      onClick({
        event,
        keysAndDefaults: getKeysAndDefaults(meta)
      });
    },
    options
  });
  function isRestricted(element) {
    const restrictedElements = options.restrictedElements;
    return restrictedElements.indexOf(element.tagName.toLowerCase()) !== -1 || element.closest(`[${TOLGEE_RESTRICT_ATTRIBUTE}]`) !== null;
  }
  function cleanElementInactiveNodes(meta, removedNodes) {
    for (const [key] of meta.nodes) {
      if (removedNodes.has(key)) {
        meta.nodes.delete(key);
      }
    }
  }
  function cleanElement(element, meta) {
    var _a2;
    if (meta.highlightEl) {
      (_a2 = meta.unhighlight) == null ? void 0 : _a2.call(meta);
    }
    element.removeAttribute(TOLGEE_ATTRIBUTE_NAME);
    elementStore.remove(element);
  }
  function getKeyOptions(meta) {
    const nodes = Array.from(meta.nodes.values());
    return nodes.reduce(
      (acc, curr) => [
        ...acc,
        ...curr.keys.map((k) => ({
          key: k.key,
          defaultValue: k.defaultValue,
          ns: k.ns
        }))
      ],
      []
    );
  }
  function getKeysAndDefaults(meta) {
    return getKeyOptions(meta);
  }
  return Object.freeze({
    register(element, node, nodeMeta) {
      if (isRestricted(element)) {
        return;
      }
      const tolgeeElement = element;
      let elementMeta = elementStore.get(tolgeeElement);
      if (!elementMeta) {
        elementMeta = initElementMeta(tolgeeElement);
        elementStore.set(tolgeeElement, elementMeta);
        tolgeeElement.setAttribute(TOLGEE_ATTRIBUTE_NAME, "true");
      }
      elementMeta.nodes.set(node, nodeMeta);
      elementHighlighter.initHighlighter(tolgeeElement, elementMeta);
    },
    forEachElement: elementStore.forEachElement,
    cleanupLingeringKeyAttributes() {
      elementStore.forEachElement((element, meta) => {
        if (meta.preventClean) {
          return;
        }
        for (const [node] of meta.nodes) {
          if (node.nodeType === Node.ATTRIBUTE_NODE) {
            const attr = node;
            if (attr.name === TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE && attr.ownerElement === null) {
              meta.nodes.delete(attr);
            }
          }
        }
        if (meta.nodes.size === 0) {
          cleanElement(element, meta);
        }
      });
    },
    cleanupRemovedNodes(removedNodes) {
      elementStore.forEachElement((element, meta) => {
        if (meta.preventClean) {
          return;
        }
        if (!removedNodes.has(element)) {
          cleanElementInactiveNodes(meta, removedNodes);
        }
        if (removedNodes.has(element) || meta.nodes.size === 0) {
          cleanElement(element, meta);
        }
      });
    },
    findAll(key, ns) {
      const result = [];
      elementStore.forEachElement((_, meta) => {
        for (const nodeMeta of meta.nodes.values()) {
          const fits = nodeMeta.keys.find(
            (val) => compareDescriptors(
              { key, ns: getFallback(ns) },
              { key: val.key, ns: getFallback(val.ns) }
            )
          );
          if (fits) {
            result.push(meta);
            break;
          }
        }
      });
      return result;
    },
    run(mouseHighlight) {
      if (mouseHighlight) {
        eventHandler.run();
      }
    },
    stop() {
      eventHandler.stop();
      elementStore.forEachElement((_, meta) => {
        var _a2;
        if (meta.highlightEl) {
          (_a2 = meta.unhighlight) == null ? void 0 : _a2.call(meta);
        }
      });
    }
  });
}
function ElementStore() {
  const registredElements = /* @__PURE__ */ new Map();
  return Object.freeze({
    set(el, meta) {
      registredElements.set(el, meta);
    },
    get(el) {
      return el && registredElements.get(el);
    },
    remove(el) {
      return registredElements.delete(el);
    },
    forEachElement(callback) {
      registredElements.forEach((value, key) => callback(key, value));
    }
  });
}
function NodeHandler(options, wrapper) {
  const self2 = Object.freeze({
    handleAttributes(node, includeChild = true) {
      const result = [];
      const tagAttributes = Object.fromEntries(
        Object.entries(options.tagAttributes).map(([tag, attributes]) => [
          tag.toUpperCase(),
          attributes
        ])
      );
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        let attributes = tagAttributes[element.tagName.toUpperCase()] ?? [];
        if ("*" in tagAttributes) {
          attributes = attributes.concat(tagAttributes["*"]);
        }
        result.push(
          ...attributes.filter((attrName) => element.hasAttribute(attrName)).map((attrName) => element.getAttributeNode(attrName)).filter(
            (attrNode) => wrapper.testAttribute(attrNode)
          )
        );
      }
      if (includeChild) {
        const walker = document.createTreeWalker(
          node,
          NodeFilter.SHOW_ELEMENT,
          (f) => {
            var _a2, _b;
            return ((_a2 = tagAttributes[f.tagName.toUpperCase()]) == null ? void 0 : _a2.some(
              (t) => f.hasAttribute(t)
            )) || ((_b = tagAttributes["*"]) == null ? void 0 : _b.some((t) => f.hasAttribute(t))) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
          }
        );
        while (walker.nextNode()) {
          const element = walker.currentNode;
          let attributes = tagAttributes[element.tagName.toUpperCase()] ?? [];
          if ("*" in tagAttributes) {
            attributes = attributes.concat(tagAttributes["*"]);
          }
          result.push(
            ...attributes.filter((attrName) => element.hasAttribute(attrName)).map((attrName) => element.getAttributeNode(attrName)).filter(
              (attrNode) => wrapper.testAttribute(attrNode)
            )
          );
        }
      }
      return result;
    },
    handleChildList(node) {
      const result = [];
      result.push(...node.flatMap((n) => self2.handleAttributes(n, true)));
      result.push(...node.flatMap((n) => self2.handleText(n)));
      return result;
    },
    handleText(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return wrapper.testTextNode(node) ? [node] : [];
      }
      const nodes = [];
      const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        (f) => wrapper.testTextNode(f) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      );
      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }
      return nodes;
    }
  });
  return self2;
}
function GeneralObserver() {
  let isObserving = false;
  let instance;
  const elementStore = ElementStore();
  function createRunningInstance({
    mouseHighlight,
    options,
    wrapper,
    onClick
  }) {
    if (isSSR()) {
      return {
        stop() {
          isObserving = false;
        },
        wrapper
      };
    }
    const domHelper = DomHelper(options);
    const nodeHandler = NodeHandler(options, wrapper);
    const elementRegistry = ElementRegistry(options, elementStore, onClick);
    function handleNodes(nodes) {
      for (const textNode of nodes) {
        const oldTextContent = getNodeText(textNode);
        const result = oldTextContent ? wrapper.unwrap(oldTextContent) : null;
        if (result) {
          const { text, keys } = result;
          setNodeText(textNode, text);
          const nodeMeta = initNodeMeta(oldTextContent, keys);
          const parentElement = domHelper.getSuitableParent(textNode);
          elementRegistry.register(parentElement, textNode, nodeMeta);
        }
      }
    }
    function handleKeyAttributeAttr(attr) {
      const parentElement = domHelper.getSuitableParent(attr);
      elementRegistry.register(parentElement, attr, {
        oldTextContent: "",
        keys: [{ key: getNodeText(attr) }],
        keyAttributeOnly: true
      });
    }
    function handleKeyAttribute(node, includeChild) {
      if (node.nodeType === Node.ATTRIBUTE_NODE) {
        const attr = node;
        if (attr.name === TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE) {
          handleKeyAttributeAttr(attr);
          return;
        }
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        const attr = element.getAttributeNode(
          TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE
        );
        if (attr) {
          handleKeyAttributeAttr(attr);
        }
      }
      if (!includeChild) {
        return;
      }
      const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_ELEMENT,
        (e) => e.hasAttribute(TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      );
      while (walker.nextNode()) {
        const attr = walker.currentNode.getAttributeNode(
          TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE
        );
        handleKeyAttributeAttr(attr);
      }
    }
    const observer = new MutationObserver((mutationsList) => {
      if (!isObserving) {
        return;
      }
      const removedNodes = mutationsList.filter((m) => m.type === "childList").flatMap((m) => Array.from(m.removedNodes));
      const removedNodesSet = new Set(removedNodes);
      for (const node of removedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          for (let i = 0; i < node.attributes.length; i++) {
            removedNodesSet.add(node.attributes[i]);
          }
        }
        const treeWalker = document.createTreeWalker(
          node,
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
        );
        while (treeWalker.nextNode()) {
          const currentNode = treeWalker.currentNode;
          if (currentNode.nodeType === Node.ELEMENT_NODE) {
            const element = currentNode;
            for (let i = 0; i < element.attributes.length; i++) {
              removedNodesSet.add(element.attributes[i]);
            }
          }
          removedNodesSet.add(currentNode);
        }
      }
      if (removedNodesSet.size > 0) {
        elementRegistry.cleanupRemovedNodes(removedNodesSet);
      }
      if (mutationsList.some(
        (m) => m.type === "attributes" && m.attributeName === TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE
      )) {
        elementRegistry.cleanupLingeringKeyAttributes();
      }
      const result = /* @__PURE__ */ new Set();
      for (const mutation of mutationsList) {
        switch (mutation.type) {
          case "characterData":
            nodeHandler.handleText(mutation.target).forEach((t) => result.add(t));
            break;
          case "childList":
            handleKeyAttribute(mutation.target, true);
            if (mutation.addedNodes.length > 0) {
              nodeHandler.handleChildList(Array.from(mutation.addedNodes)).forEach((t) => result.add(t));
            }
            if (mutation.removedNodes.length > 0) {
              nodeHandler.handleChildList(Array.from(mutation.removedNodes)).forEach((t) => result.delete(t));
            }
            break;
          case "attributes":
            if (mutation.attributeName === TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE) {
              handleKeyAttribute(mutation.target, false);
            }
            nodeHandler.handleAttributes(mutation.target, false).forEach((t) => result.add(t));
            break;
        }
      }
      handleNodes([...result]);
    });
    const targetElement = options.targetElement || document.body;
    isObserving = true;
    elementRegistry.run(mouseHighlight);
    handleKeyAttribute(targetElement, true);
    handleNodes(nodeHandler.handleChildList([targetElement]));
    const monitorAttributeList = /* @__PURE__ */ new Set();
    monitorAttributeList.add(TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE);
    Object.values(options.tagAttributes).forEach(
      (attrs) => attrs.forEach((attr) => monitorAttributeList.add(attr.toLowerCase()))
    );
    observer.observe(targetElement, {
      attributes: true,
      attributeFilter: [...monitorAttributeList],
      childList: true,
      subtree: true,
      characterData: true
    });
    return {
      stop() {
        isObserving = false;
        elementRegistry.stop();
        observer.disconnect();
      },
      elementRegistry,
      wrapper
    };
  }
  const self2 = Object.freeze({
    run(props) {
      instance = createRunningInstance(props);
    },
    stop() {
      instance == null ? void 0 : instance.stop();
    },
    forEachElement(callback) {
      var _a2, _b;
      (_b = (_a2 = instance == null ? void 0 : instance.elementRegistry) == null ? void 0 : _a2.forEachElement) == null ? void 0 : _b.call(_a2, callback);
    },
    highlight(key, ns) {
      var _a2;
      const elements = ((_a2 = instance == null ? void 0 : instance.elementRegistry) == null ? void 0 : _a2.findAll(key, ns)) || [];
      elements.forEach((el) => {
        var _a3;
        return (_a3 = el.highlight) == null ? void 0 : _a3.call(el);
      });
      return {
        unhighlight() {
          elements.forEach((el) => {
            var _a3;
            return (_a3 = el.unhighlight) == null ? void 0 : _a3.call(el);
          });
        }
      };
    },
    findPositions(key, ns) {
      var _a2;
      const elements = ((_a2 = instance == null ? void 0 : instance.elementRegistry) == null ? void 0 : _a2.findAll(key, ns)) || [];
      const result = [];
      elements.sort((a, b) => {
        if (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1;
        } else {
          return 1;
        }
      });
      elements.forEach((meta) => {
        const shape = meta.element.getBoundingClientRect();
        meta.nodes.forEach((node) => {
          node.keys.forEach((val) => {
            if (compareDescriptors(
              { key, ns: getFallback(ns) },
              { key: val.key, ns: getFallback(val.ns) }
            ))
              result.push({
                position: {
                  x: shape.x,
                  y: shape.y,
                  width: shape.width,
                  height: shape.height
                },
                keyName: val.key,
                keyNamespace: val.ns || ""
              });
          });
        });
      });
      return result;
    },
    unwrap(text) {
      if (instance) {
        return instance.wrapper.unwrap(text);
      }
      return {
        text,
        keys: []
      };
    },
    wrap(props) {
      if (instance) {
        return instance.wrapper.wrap(props);
      }
      return props.translation || "";
    }
  });
  return self2;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var text_min = {};
(function(scope) {
  function B(r, e) {
    var f;
    return r instanceof Buffer ? f = r : f = Buffer.from(r.buffer, r.byteOffset, r.byteLength), f.toString(e);
  }
  var w = function(r) {
    return Buffer.from(r);
  };
  function h(r) {
    for (var e = 0, f = Math.min(256 * 256, r.length + 1), n = new Uint16Array(f), i = [], o = 0; ; ) {
      var t = e < r.length;
      if (!t || o >= f - 1) {
        var s = n.subarray(0, o), m = s;
        if (i.push(String.fromCharCode.apply(null, m)), !t)
          return i.join("");
        r = r.subarray(e), e = 0, o = 0;
      }
      var a = r[e++];
      if ((a & 128) === 0)
        n[o++] = a;
      else if ((a & 224) === 192) {
        var d = r[e++] & 63;
        n[o++] = (a & 31) << 6 | d;
      } else if ((a & 240) === 224) {
        var d = r[e++] & 63, l = r[e++] & 63;
        n[o++] = (a & 31) << 12 | d << 6 | l;
      } else if ((a & 248) === 240) {
        var d = r[e++] & 63, l = r[e++] & 63, R = r[e++] & 63, c = (a & 7) << 18 | d << 12 | l << 6 | R;
        c > 65535 && (c -= 65536, n[o++] = c >>> 10 & 1023 | 55296, c = 56320 | c & 1023), n[o++] = c;
      }
    }
  }
  function F(r) {
    for (var e = 0, f = r.length, n = 0, i = Math.max(32, f + (f >>> 1) + 7), o = new Uint8Array(i >>> 3 << 3); e < f; ) {
      var t = r.charCodeAt(e++);
      if (t >= 55296 && t <= 56319) {
        if (e < f) {
          var s = r.charCodeAt(e);
          (s & 64512) === 56320 && (++e, t = ((t & 1023) << 10) + (s & 1023) + 65536);
        }
        if (t >= 55296 && t <= 56319)
          continue;
      }
      if (n + 4 > o.length) {
        i += 8, i *= 1 + e / r.length * 2, i = i >>> 3 << 3;
        var m = new Uint8Array(i);
        m.set(o), o = m;
      }
      if ((t & 4294967168) === 0) {
        o[n++] = t;
        continue;
      } else if ((t & 4294965248) === 0)
        o[n++] = t >>> 6 & 31 | 192;
      else if ((t & 4294901760) === 0)
        o[n++] = t >>> 12 & 15 | 224, o[n++] = t >>> 6 & 63 | 128;
      else if ((t & 4292870144) === 0)
        o[n++] = t >>> 18 & 7 | 240, o[n++] = t >>> 12 & 63 | 128, o[n++] = t >>> 6 & 63 | 128;
      else
        continue;
      o[n++] = t & 63 | 128;
    }
    return o.slice ? o.slice(0, n) : o.subarray(0, n);
  }
  var u = "Failed to ", p = function(r, e, f) {
    if (r)
      throw new Error("".concat(u).concat(e, ": the '").concat(f, "' option is unsupported."));
  };
  var x = typeof Buffer == "function" && Buffer.from;
  var A = x ? w : F;
  function v() {
    this.encoding = "utf-8";
  }
  v.prototype.encode = function(r, e) {
    return p(e && e.stream, "encode", "stream"), A(r);
  };
  function U(r) {
    var e;
    try {
      var f = new Blob([r], { type: "text/plain;charset=UTF-8" });
      e = URL.createObjectURL(f);
      var n = new XMLHttpRequest();
      return n.open("GET", e, false), n.send(), n.responseText;
    } finally {
      e && URL.revokeObjectURL(e);
    }
  }
  var O = !x && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", S = ["utf-8", "utf8", "unicode-1-1-utf-8"], T = h;
  x ? T = B : O && (T = function(r) {
    try {
      return U(r);
    } catch (e) {
      return h(r);
    }
  });
  var y = "construct 'TextDecoder'", E = "".concat(u, " ").concat(y, ": the ");
  function g(r, e) {
    p(e && e.fatal, y, "fatal"), r = r || "utf-8";
    var f;
    if (x ? f = Buffer.isEncoding(r) : f = S.indexOf(r.toLowerCase()) !== -1, !f)
      throw new RangeError("".concat(E, " encoding label provided ('").concat(r, "') is invalid."));
    this.encoding = r, this.fatal = false, this.ignoreBOM = false;
  }
  g.prototype.decode = function(r, e) {
    p(e && e.stream, "decode", "stream");
    var f;
    return r instanceof Uint8Array ? f = r : r.buffer instanceof ArrayBuffer ? f = new Uint8Array(r.buffer) : f = new Uint8Array(r), T(f, this.encoding);
  };
  scope.TextEncoder = scope.TextEncoder || v;
  scope.TextDecoder = scope.TextDecoder || g;
})(typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal);
const FastTextEncoding = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: text_min
}, [text_min]);
(_a = console.assert) == null ? void 0 : _a.call(console, FastTextEncoding);
const INVISIBLE_CHARACTERS = ["‌", "‍"];
const INVISIBLE_REGEX = RegExp(
  `([${INVISIBLE_CHARACTERS.join("")}]{9})+`,
  "gu"
);
function toBytes(text) {
  return Array.from(new TextEncoder().encode(text));
}
function fromBytes(bytes) {
  return new TextDecoder().decode(new Uint8Array(bytes));
}
function padToWholeBytes(binary) {
  const needsToAdd = 8 - binary.length;
  return "0".repeat(needsToAdd) + binary;
}
function encodeMessage(text) {
  const bytes = toBytes(text).map(Number);
  const binary = bytes.map((byte) => padToWholeBytes(byte.toString(2)) + "0").join("");
  const result = Array.from(binary).map((b) => INVISIBLE_CHARACTERS[Number(b)]).join("");
  return result;
}
function decodeMessage(message) {
  const binary = Array.from(message).map((character) => {
    return INVISIBLE_CHARACTERS.indexOf(character);
  }).map(String).join("");
  const textBytes = binary.match(/(.{9})/g);
  const codes = Uint8Array.from(
    (textBytes == null ? void 0 : textBytes.map((byte) => parseInt(byte.slice(0, 8), 2))) || []
  );
  return fromBytes(codes);
}
function decodeFromText(text) {
  var _a2;
  const invisibleMessages = (_a2 = text.match(INVISIBLE_REGEX)) == null ? void 0 : _a2.filter((m) => m.length > 8);
  return (invisibleMessages == null ? void 0 : invisibleMessages.map(decodeMessage)) || [];
}
function removeSecrets(text) {
  return text.replace(INVISIBLE_REGEX, "");
}
function stringToCodePoints(text) {
  const result = [];
  for (const codePoint of text) {
    result.push(codePoint.codePointAt(0));
  }
  return result;
}
function ValueMemory() {
  const values = [];
  return Object.freeze({
    valueToNumber(key) {
      let index = values.indexOf(key);
      if (index === -1) {
        index = values.length;
        values.push(key);
      }
      return index;
    },
    numberToValue(num) {
      return values[num];
    }
  });
}
function InvisibleWrapper({ fullKeyEncode }) {
  const keyMemory = ValueMemory();
  function encodeValue(data) {
    const value = {
      k: data.key,
      n: data.ns || void 0,
      d: data.defaultValue
    };
    return JSON.stringify(value);
  }
  function decodeValue(value) {
    try {
      return JSON.parse(value || "{}");
    } catch (e) {
      console.error(e);
      return void 0;
    }
  }
  function getMessage(message) {
    if (message.length <= 4) {
      const [valueCode] = stringToCodePoints(message);
      return keyMemory.numberToValue(valueCode);
    } else {
      return message;
    }
  }
  return Object.freeze({
    unwrap(text) {
      const keysAndParams = [];
      const messages = decodeFromText(text);
      messages.forEach((encodedValue) => {
        const message = getMessage(encodedValue);
        const decodedVal = decodeValue(message);
        if (decodedVal) {
          const { k: key, d: defaultValue, n: ns } = decodedVal;
          keysAndParams.push({
            key,
            defaultValue,
            ns
          });
        }
      });
      const result = removeSecrets(text);
      return { text: result, keys: keysAndParams };
    },
    wrap({ key, defaultValue, translation, ns }) {
      let invisibleMark;
      if (fullKeyEncode) {
        const encodedValue = encodeValue({ key, ns });
        invisibleMark = encodeMessage(encodedValue);
      } else {
        const encodedValue = encodeValue({ key, ns, defaultValue });
        const code = keyMemory.valueToNumber(encodedValue);
        invisibleMark = encodeMessage(String.fromCodePoint(code));
      }
      const value = translation || "";
      return typeof value === "string" ? value + invisibleMark : value;
    },
    testTextNode(textNode) {
      var _a2, _b;
      return (((_a2 = textNode.textContent) == null ? void 0 : _a2.includes(
        `${INVISIBLE_CHARACTERS[0]}${INVISIBLE_CHARACTERS[0]}`
      )) || ((_b = textNode.textContent) == null ? void 0 : _b.includes(
        `${INVISIBLE_CHARACTERS[1]}${INVISIBLE_CHARACTERS[0]}`
      ))) ?? false;
    },
    testAttribute(attribute) {
      return attribute.value.includes(
        `${INVISIBLE_CHARACTERS[0]}${INVISIBLE_CHARACTERS[0]}`
      ) || attribute.value.includes(
        `${INVISIBLE_CHARACTERS[1]}${INVISIBLE_CHARACTERS[0]}`
      );
    }
  });
}
const InvisibleObserver = () => () => {
  const observer = GeneralObserver();
  const self2 = Object.freeze({
    ...observer,
    run(props) {
      const wrapper = InvisibleWrapper({
        fullKeyEncode: props.options.fullKeyEncode
      });
      observer.run({ ...props, wrapper });
    },
    retranslate() {
    },
    outputNotFormattable: false
  });
  return self2;
};
function isCharEscaped(position, fullString) {
  let escapeCharsCount = 0;
  while (position > -1 && fullString[position - 1] === "\\") {
    escapeCharsCount++;
    position--;
  }
  return escapeCharsCount % 2 == 1;
}
function TextWrapper({
  inputPrefix,
  inputSuffix,
  translate
}) {
  function getRawUnWrapRegex() {
    const escapedPrefix = escapeForRegExp(inputPrefix);
    const escapedSuffix = escapeForRegExp(inputSuffix);
    return `(\\\\?)(${escapedPrefix}(.*?)${escapedSuffix})`;
  }
  function parseUnwrapped(unwrappedString) {
    let escaped = false;
    let actual = "";
    let paramName = "";
    let readingState = "KEY";
    const result = {
      key: "",
      ns: void 0,
      params: {},
      defaultValue: void 0
    };
    const addNamespace = (ns) => {
      result.ns = ns;
    };
    for (const char of unwrappedString) {
      if (char === "\\" && !escaped) {
        escaped = true;
        continue;
      }
      if (escaped) {
        escaped = false;
        actual += char;
        continue;
      }
      if (readingState === "KEY" && char === ",") {
        readingState = "DEFAULT_VALUE";
        result.key = actual;
        actual = "";
        continue;
      }
      if (readingState === "KEY" && char === "|") {
        readingState = "NAMESPACE";
        result.key = actual;
        actual = "";
        continue;
      }
      if (readingState === "NAMESPACE" && char === ",") {
        readingState = "DEFAULT_VALUE";
        addNamespace(actual);
        actual = "";
        continue;
      }
      if (readingState === "KEY" && char === ":") {
        readingState = "PARAM_NAME";
        result.key = actual;
        actual = "";
        continue;
      }
      if (readingState === "DEFAULT_VALUE" && char === ":") {
        readingState = "PARAM_NAME";
        result.defaultValue = actual;
        actual = "";
        continue;
      }
      if (readingState === "PARAM_NAME" && char === ":") {
        readingState = "PARAM_VALUE";
        paramName = actual;
        actual = "";
        continue;
      }
      if (readingState === "PARAM_VALUE" && char === ",") {
        readingState = "PARAM_NAME";
        result.params[paramName] = actual;
        actual = "";
        continue;
      }
      actual += char;
    }
    if (readingState === "KEY") {
      result.key = actual;
    }
    if (readingState === "DEFAULT_VALUE") {
      result.defaultValue = actual;
    }
    if (readingState === "PARAM_VALUE") {
      result.params[paramName] = actual;
    }
    if (readingState === "NAMESPACE") {
      addNamespace(actual);
    }
    return result;
  }
  function getTranslatedWithMetadata(text) {
    const { key, params, defaultValue, ns } = parseUnwrapped(text);
    const translated = translate({
      key,
      params,
      defaultValue,
      ns,
      noWrap: true
    });
    return { translated, key, params, defaultValue, ns };
  }
  function escapeForRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function escapeParam(param) {
    if (typeof param === "string") {
      return param.replace(/[,:|\\]/gs, "\\$&");
    }
    if (typeof param === "number" || typeof param === "bigint") {
      return param.toString();
    }
    console.warn(
      `Parameters of type "${typeof param}" are not supported in "text" wrapper mode.`
    );
    return param;
  }
  return Object.freeze({
    wrap({ key, params, defaultValue, ns }) {
      let paramString = Object.entries(params || {}).map(
        ([name, value]) => `${escapeParam(name)}:${escapeParam(value)}`
      ).join(",");
      paramString = paramString.length ? `:${paramString}` : "";
      const defaultString = defaultValue !== void 0 ? `,${escapeParam(defaultValue)}` : "";
      const nsArray = typeof ns === "string" ? [ns] : ns;
      const namespaces = (nsArray == null ? void 0 : nsArray.length) ? `|${nsArray.map((ns2) => escapeParam(ns2)).join("|")}` : "";
      return `${inputPrefix}${escapeParam(
        key
      )}${namespaces}${defaultString}${paramString}${inputSuffix}`;
    },
    unwrap(text) {
      const matchRegexp = new RegExp(getRawUnWrapRegex(), "gs");
      const keysAndParams = [];
      let matched = false;
      let match;
      let start = 0;
      let result = "";
      while ((match = matchRegexp.exec(text)) !== null) {
        let pre = match[1];
        const [fullMatch, _, wrapped, unwrapped] = match;
        const { index, input } = match;
        result += input.substr(start, index - start);
        start = index + fullMatch.length;
        if (pre === "\\") {
          if (!isCharEscaped(index, text)) {
            result += wrapped;
            continue;
          }
          pre = "";
        }
        const translated = getTranslatedWithMetadata(unwrapped);
        keysAndParams.push({
          key: translated.key,
          params: translated.params,
          defaultValue: translated.defaultValue,
          ns: translated.ns
        });
        matched = true;
        result += pre + translated.translated;
      }
      result += text.substring(start);
      if (matched) {
        return { text: result, keys: keysAndParams };
      }
      return { text, keys: [] };
    },
    testTextNode(textNode) {
      var _a2, _b;
      return (((_a2 = textNode.textContent) == null ? void 0 : _a2.includes(inputPrefix)) && ((_b = textNode.textContent) == null ? void 0 : _b.includes(inputSuffix))) ?? false;
    },
    testAttribute(attribute) {
      return attribute.value.includes(inputPrefix) && attribute.value.includes(inputSuffix);
    }
  });
}
const TextObserver = () => () => {
  const observer = GeneralObserver();
  const self2 = Object.freeze({
    ...observer,
    run(props) {
      const wrapper = TextWrapper({
        inputPrefix: props.options.inputPrefix,
        inputSuffix: props.options.inputSuffix,
        translate: props.translate
      });
      observer.run({ ...props, wrapper });
    },
    retranslate() {
      observer.forEachElement((_, elMeta) => {
        for (const [node, nodeMeta] of elMeta.nodes.entries()) {
          if (nodeMeta.keyAttributeOnly) {
            return;
          }
          const result = observer.unwrap(nodeMeta.oldTextContent);
          if (result) {
            setNodeText(node, result.text);
          }
        }
      });
    },
    outputNotFormattable: true
  });
  return self2;
};
const ObserverPlugin = () => (tolgee, tools) => {
  if (tolgee.getInitialOptions().observerType === "text") {
    tools.setObserver(TextObserver());
  } else {
    tools.setObserver(InvisibleObserver());
  }
  return tolgee;
};
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function readChar(char) {
  const idx = alphabet.indexOf(char);
  if (idx === -1) {
    throw new Error("Invalid character found: " + char);
  }
  return idx;
}
function arrayBufferToString(buffer) {
  const bufView = new Uint8Array(buffer);
  const length = bufView.length;
  let result = "";
  let addition = Math.pow(2, 16) - 1;
  for (let i = 0; i < length; i += addition) {
    if (i + addition > length) {
      addition = length - i;
    }
    result += String.fromCharCode.apply(
      null,
      // @ts-ignore
      bufView.subarray(i, i + addition)
    );
  }
  return result;
}
function base32Decode(input) {
  input = input.toUpperCase();
  const length = input.length;
  let bits = 0;
  let value = 0;
  let index = 0;
  const output = new Uint8Array(length * 5 / 8 | 0);
  for (let i = 0; i < length; i++) {
    value = value << 5 | readChar(input[i]);
    bits += 5;
    if (bits >= 8) {
      output[index++] = value >>> bits - 8 & 255;
      bits -= 8;
    }
  }
  return arrayBufferToString(output.buffer);
}
function getProjectIdFromApiKey(key) {
  if (!key) {
    return void 0;
  }
  try {
    const [prefix, rest] = key.split("_");
    if (prefix === "tgpak") {
      const [projectId] = base32Decode(rest).split("_");
      return Number(projectId);
    }
  } catch {
    console.warn("Tolgee: Api key can't be parsed");
  }
  return void 0;
}
function getApiKeyType(key) {
  if (!key) {
    return void 0;
  }
  const [prefix] = key.split("_");
  if (prefix === "tgpak") {
    return "tgpak";
  } else if (prefix === "tgpat") {
    return "tgpat";
  }
  return "legacy";
}
function createDevBackend() {
  return {
    getRecord({ apiUrl, apiKey, language, namespace, projectId, fetch }) {
      const pId = getProjectIdFromApiKey(apiKey) ?? projectId;
      let url = pId !== void 0 ? `${apiUrl}/v2/projects/${pId}/translations/${language}` : `${apiUrl}/v2/projects/translations/${language}`;
      if (namespace) {
        url += `?ns=${namespace}`;
      }
      if (getApiKeyType(apiKey) === "tgpat" && projectId === void 0) {
        throw new Error("You need to specify 'projectId' when using PAT key");
      }
      return fetch(url, {
        headers: {
          "X-API-Key": apiKey || "",
          "Content-Type": "application/json"
        }
      }).then((r) => {
        if (r.ok) {
          return r.json().then((data) => data[language]);
        } else {
          throw new Error(r.statusText);
        }
      });
    }
  };
}
const DevBackend = () => (tolgee, tools) => {
  tools.setDevBackend(createDevBackend());
  return tolgee;
};
function listen(type, callback) {
  const handler = (e) => {
    var _a2, _b;
    if (type.includes((_a2 = e.data) == null ? void 0 : _a2.type)) {
      callback((_b = e.data) == null ? void 0 : _b.data);
    }
  };
  window.addEventListener("message", handler, false);
  return {
    unsubscribe() {
      window.removeEventListener("message", handler);
    }
  };
}
function sendAndRecieve({
  message,
  recievingMessage,
  data,
  attempts = 1,
  timeout = 300
}) {
  let cancelled = false;
  const makeAttempt = () => new Promise((resolve, reject) => {
    const listener = listen(recievingMessage, handler);
    window.postMessage({ type: message, data }, window.origin);
    const timer = setTimeout(expire, timeout);
    function handler(data2) {
      clearTimeout(timer);
      removeEventListener();
      resolve(data2);
    }
    function removeEventListener() {
      listener.unsubscribe();
    }
    function expire() {
      removeEventListener();
      reject();
    }
  });
  const getData = async () => {
    for (let i = 0; i < attempts; i++) {
      if (cancelled) {
        return new Promise(() => {
        });
      }
      try {
        const result = await makeAttempt();
        return result;
      } catch (e) {
        continue;
      }
    }
    if (!cancelled) {
      throw `Didn't recieve ${recievingMessage.join(" or ")} in time.`;
    }
    return new Promise(() => {
    });
  };
  return {
    cancel() {
      cancelled = true;
    },
    promise: getData()
  };
}
function Handshaker() {
  let cancelLast = void 0;
  async function update(data) {
    cancelLast == null ? void 0 : cancelLast();
    const { cancel, promise } = sendAndRecieve({
      message: "TOLGEE_READY",
      recievingMessage: ["TOLGEE_PLUGIN_READY", "TOLGEE_PLUGIN_UPDATED"],
      data,
      attempts: 4
    });
    cancelLast = cancel;
    return promise;
  }
  return {
    update
  };
}
const IN_CONTEXT_FILE = "tolgee-in-context-tools.umd.min.js";
const IN_CONTEXT_UMD_NAME = "@tolgee/in-context-tools";
const IN_CONTEXT_EXPORT_NAME = "InContextTools";
const CDN_URL = "https://cdn.jsdelivr.net/npm";
function injectScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", (e) => reject(e.error));
    document.head.appendChild(script);
  });
}
let injectPromise = null;
function loadInContextLib(version) {
  if (!injectPromise) {
    injectPromise = injectScript(
      `${CDN_URL}/@tolgee/web@${version}/dist/${IN_CONTEXT_FILE}`
    ).then(() => {
      return window[IN_CONTEXT_UMD_NAME][IN_CONTEXT_EXPORT_NAME];
    });
  }
  return injectPromise;
}
const API_KEY_LOCAL_STORAGE = "__tolgee_apiKey";
const API_URL_LOCAL_STORAGE = "__tolgee_apiUrl";
function getCredentials() {
  const apiKey = sessionStorage.getItem(API_KEY_LOCAL_STORAGE) || void 0;
  const apiUrl = sessionStorage.getItem(API_URL_LOCAL_STORAGE) || void 0;
  if (!apiKey || !apiUrl) {
    return void 0;
  }
  return {
    apiKey,
    apiUrl
  };
}
function clearSessionStorage() {
  sessionStorage.removeItem(API_KEY_LOCAL_STORAGE);
  sessionStorage.removeItem(API_URL_LOCAL_STORAGE);
}
function onDocumentReady(callback) {
  if (document.readyState !== "loading") {
    Promise.resolve().then(() => {
      callback();
    });
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", callback);
  }
}
let BrowserExtensionPlugin = () => (tolgee) => tolgee;
const sessionStorageAvailable = () => {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return typeof sessionStorage !== "undefined" && sessionStorage;
  } catch (err) {
    console.error("sessionStorage not available", err);
    return false;
  }
};
if (sessionStorageAvailable()) {
  BrowserExtensionPlugin = () => (tolgee) => {
    const handshaker = Handshaker();
    const getConfig = () => ({
      // prevent extension downloading ui library
      uiPresent: true,
      uiVersion: void 0,
      // tolgee mode
      mode: tolgee.isDev() ? "development" : "production",
      // pass credentials
      config: {
        apiUrl: tolgee.getInitialOptions().apiUrl || "",
        apiKey: tolgee.getInitialOptions().apiKey || ""
      }
    });
    const getTolgeePlugin = async () => {
      const InContextTools = await loadInContextLib(
        "5.22.1-prerelease.d00c62d8.0"
      );
      return (tolgee2) => {
        const credentials2 = getCredentials();
        tolgee2.addPlugin(InContextTools({ credentials: credentials2 }));
        return tolgee2;
      };
    };
    tolgee.on("running", ({ value: isRunning }) => {
      if (isRunning) {
        onDocumentReady(() => {
          handshaker.update(getConfig()).catch(clearSessionStorage);
        });
      }
    });
    const credentials = getCredentials();
    if (credentials) {
      getTolgeePlugin().then((plugin) => {
        tolgee.addPlugin(plugin);
      }).catch((e) => {
        console.error("Tolgee: Failed to load in-context tools");
        console.error(e);
      });
    }
    return tolgee;
  };
}
const CURRENT_LANGUAGE_LOCAL_STORAGE_KEY = "__tolgee_currentLanguage";
function createLanguageStorage() {
  return {
    getLanguage() {
      throwIfSSR("LanguageStorage");
      const storedLanguage = localStorage.getItem(
        CURRENT_LANGUAGE_LOCAL_STORAGE_KEY
      );
      return storedLanguage || void 0;
    },
    setLanguage(language) {
      throwIfSSR("LanguageStorage");
      localStorage.setItem(CURRENT_LANGUAGE_LOCAL_STORAGE_KEY, language);
    }
  };
}
const LanguageStorage = () => (tolgee, tools) => {
  tools.setLanguageStorage(createLanguageStorage());
  return tolgee;
};
function createLanguageDetector() {
  return {
    getLanguage({ availableLanguages }) {
      throwIfSSR("LanguageDetector");
      const preferred = window.navigator.language;
      const exactMatch = availableLanguages.find((l) => l === preferred);
      if (exactMatch) {
        return exactMatch;
      }
      const getTwoLetters = (fullTag) => fullTag.replace(/^(.+?)(-.*)?$/, "$1");
      const preferredTwoLetter = getTwoLetters(window.navigator.language);
      const twoLetterMatch = availableLanguages.find(
        (l) => getTwoLetters(l) === preferredTwoLetter
      );
      if (twoLetterMatch) {
        return twoLetterMatch;
      }
      return void 0;
    }
  };
}
const LanguageDetector = () => (tolgee, tools) => {
  tools.setLanguageDetector(createLanguageDetector());
  return tolgee;
};
function trimSlashes(path) {
  if (path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}
const defaultGetPath = ({ namespace, language, prefix }) => {
  if (namespace) {
    return `${trimSlashes(prefix)}/${namespace}/${language}.json`;
  } else {
    return `${trimSlashes(prefix)}/${language}.json`;
  }
};
function defaultGetData(r) {
  return r.json();
}
const DEFAULT_OPTIONS = {
  prefix: "/i18n",
  getPath: defaultGetPath,
  getData: defaultGetData,
  headers: {
    Accept: "application/json"
  }
};
function createBackendFetch(options) {
  const { prefix, getPath, getData, headers, ...fetchOptions } = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options == null ? void 0 : options.headers
    }
  };
  return {
    getRecord({ namespace, language, fetch }) {
      const path = getPath({
        namespace,
        language,
        prefix
      });
      return fetch(path, { headers, ...fetchOptions }).then((r) => {
        if (!r.ok) {
          throw new Error(`${r.url} ${r.status}`);
        }
        return getData(r);
      });
    }
  };
}
const BackendFetch = (options) => (tolgee, tools) => {
  tools.addBackend(createBackendFetch(options));
  return tolgee;
};
function Tolgee() {
  return TolgeeCore().use(BrowserExtensionPlugin());
}
const DevTools = () => (tolgee) => tolgee;
export {
  BackendFetch,
  BrowserExtensionPlugin,
  DEVTOOLS_ID,
  DevBackend,
  DevTools,
  LanguageDetector,
  LanguageStorage,
  ObserverPlugin,
  PREFERRED_LANGUAGES_LOCAL_STORAGE_KEY,
  TOLGEE_ATTRIBUTE_NAME,
  TOLGEE_RESTRICT_ATTRIBUTE,
  TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE,
  Tolgee,
  getProjectIdFromApiKey
};
//# sourceMappingURL=tolgee-web.production.esm.js.map
