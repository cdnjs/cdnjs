var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/morph/builds/module.js
var module_exports = {};
__export(module_exports, {
  default: () => module_default,
  morph: () => src_default
});
module.exports = __toCommonJS(module_exports);

// packages/morph/src/morph.js
function morph(from, toHtml, options) {
  monkeyPatchDomSetAttributeToAllowAtSymbols();
  let fromEl;
  let toEl;
  let key, lookahead, updating, updated, removing, removed, adding, added;
  function assignOptions(options2 = {}) {
    let defaultGetKey = (el) => el.getAttribute("key");
    let noop = () => {
    };
    updating = options2.updating || noop;
    updated = options2.updated || noop;
    removing = options2.removing || noop;
    removed = options2.removed || noop;
    adding = options2.adding || noop;
    added = options2.added || noop;
    key = options2.key || defaultGetKey;
    lookahead = options2.lookahead || false;
  }
  function patch(from2, to) {
    if (differentElementNamesTypesOrKeys(from2, to)) {
      return swapElements(from2, to);
    }
    let updateChildrenOnly = false;
    if (shouldSkip(updating, from2, to, () => updateChildrenOnly = true))
      return;
    if (from2.nodeType === 1 && window.Alpine) {
      window.Alpine.cloneNode(from2, to);
    }
    if (textOrComment(to)) {
      patchNodeValue(from2, to);
      updated(from2, to);
      return;
    }
    if (!updateChildrenOnly) {
      patchAttributes(from2, to);
    }
    updated(from2, to);
    patchChildren(from2, to);
  }
  function differentElementNamesTypesOrKeys(from2, to) {
    return from2.nodeType != to.nodeType || from2.nodeName != to.nodeName || getKey(from2) != getKey(to);
  }
  function swapElements(from2, to) {
    if (shouldSkip(removing, from2))
      return;
    let toCloned = to.cloneNode(true);
    if (shouldSkip(adding, toCloned))
      return;
    from2.replaceWith(toCloned);
    removed(from2);
    added(toCloned);
  }
  function patchNodeValue(from2, to) {
    let value = to.nodeValue;
    if (from2.nodeValue !== value) {
      from2.nodeValue = value;
    }
  }
  function patchAttributes(from2, to) {
    if (from2._x_transitioning)
      return;
    if (from2._x_isShown && !to._x_isShown) {
      return;
    }
    if (!from2._x_isShown && to._x_isShown) {
      return;
    }
    let domAttributes = Array.from(from2.attributes);
    let toAttributes = Array.from(to.attributes);
    for (let i = domAttributes.length - 1; i >= 0; i--) {
      let name = domAttributes[i].name;
      if (!to.hasAttribute(name)) {
        from2.removeAttribute(name);
      }
    }
    for (let i = toAttributes.length - 1; i >= 0; i--) {
      let name = toAttributes[i].name;
      let value = toAttributes[i].value;
      if (from2.getAttribute(name) !== value) {
        from2.setAttribute(name, value);
      }
    }
  }
  function patchChildren(from2, to) {
    if (from2._x_teleport)
      from2 = from2._x_teleport;
    if (to._x_teleport)
      to = to._x_teleport;
    let fromKeys = keyToMap(from2.children);
    let fromKeyHoldovers = {};
    let currentTo = getFirstNode(to);
    let currentFrom = getFirstNode(from2);
    while (currentTo) {
      seedingMatchingId(currentTo, currentFrom);
      let toKey = getKey(currentTo);
      let fromKey = getKey(currentFrom);
      if (!currentFrom) {
        if (toKey && fromKeyHoldovers[toKey]) {
          let holdover = fromKeyHoldovers[toKey];
          from2.appendChild(holdover);
          currentFrom = holdover;
        } else {
          if (!shouldSkip(adding, currentTo)) {
            let clone = currentTo.cloneNode(true);
            from2.appendChild(clone);
            added(clone);
          }
          currentTo = getNextSibling(to, currentTo);
          continue;
        }
      }
      let isIf = (node) => node && node.nodeType === 8 && node.textContent === "[if BLOCK]><![endif]";
      let isEnd = (node) => node && node.nodeType === 8 && node.textContent === "[if ENDBLOCK]><![endif]";
      if (isIf(currentTo) && isIf(currentFrom)) {
        let nestedIfCount = 0;
        let fromBlockStart = currentFrom;
        while (currentFrom) {
          let next = getNextSibling(from2, currentFrom);
          if (isIf(next)) {
            nestedIfCount++;
          } else if (isEnd(next) && nestedIfCount > 0) {
            nestedIfCount--;
          } else if (isEnd(next) && nestedIfCount === 0) {
            currentFrom = next;
            break;
          }
          currentFrom = next;
        }
        let fromBlockEnd = currentFrom;
        nestedIfCount = 0;
        let toBlockStart = currentTo;
        while (currentTo) {
          let next = getNextSibling(to, currentTo);
          if (isIf(next)) {
            nestedIfCount++;
          } else if (isEnd(next) && nestedIfCount > 0) {
            nestedIfCount--;
          } else if (isEnd(next) && nestedIfCount === 0) {
            currentTo = next;
            break;
          }
          currentTo = next;
        }
        let toBlockEnd = currentTo;
        let fromBlock = new Block(fromBlockStart, fromBlockEnd);
        let toBlock = new Block(toBlockStart, toBlockEnd);
        patchChildren(fromBlock, toBlock);
        continue;
      }
      if (currentFrom.nodeType === 1 && lookahead && !currentFrom.isEqualNode(currentTo)) {
        let nextToElementSibling = getNextSibling(to, currentTo);
        let found = false;
        while (!found && nextToElementSibling) {
          if (nextToElementSibling.nodeType === 1 && currentFrom.isEqualNode(nextToElementSibling)) {
            found = true;
            currentFrom = addNodeBefore(from2, currentTo, currentFrom);
            fromKey = getKey(currentFrom);
          }
          nextToElementSibling = getNextSibling(to, nextToElementSibling);
        }
      }
      if (toKey !== fromKey) {
        if (!toKey && fromKey) {
          fromKeyHoldovers[fromKey] = currentFrom;
          currentFrom = addNodeBefore(from2, currentTo, currentFrom);
          fromKeyHoldovers[fromKey].remove();
          currentFrom = getNextSibling(from2, currentFrom);
          currentTo = getNextSibling(to, currentTo);
          continue;
        }
        if (toKey && !fromKey) {
          if (fromKeys[toKey]) {
            currentFrom.replaceWith(fromKeys[toKey]);
            currentFrom = fromKeys[toKey];
          }
        }
        if (toKey && fromKey) {
          let fromKeyNode = fromKeys[toKey];
          if (fromKeyNode) {
            fromKeyHoldovers[fromKey] = currentFrom;
            currentFrom.replaceWith(fromKeyNode);
            currentFrom = fromKeyNode;
          } else {
            fromKeyHoldovers[fromKey] = currentFrom;
            currentFrom = addNodeBefore(from2, currentTo, currentFrom);
            fromKeyHoldovers[fromKey].remove();
            currentFrom = getNextSibling(from2, currentFrom);
            currentTo = getNextSibling(to, currentTo);
            continue;
          }
        }
      }
      let currentFromNext = currentFrom && getNextSibling(from2, currentFrom);
      patch(currentFrom, currentTo);
      currentTo = currentTo && getNextSibling(to, currentTo);
      currentFrom = currentFromNext;
    }
    let removals = [];
    while (currentFrom) {
      if (!shouldSkip(removing, currentFrom))
        removals.push(currentFrom);
      currentFrom = getNextSibling(from2, currentFrom);
    }
    while (removals.length) {
      let domForRemoval = removals.shift();
      domForRemoval.remove();
      removed(domForRemoval);
    }
  }
  function getKey(el) {
    return el && el.nodeType === 1 && key(el);
  }
  function keyToMap(els) {
    let map = {};
    for (let el of els) {
      let theKey = getKey(el);
      if (theKey) {
        map[theKey] = el;
      }
    }
    return map;
  }
  function addNodeBefore(parent, node, beforeMe) {
    if (!shouldSkip(adding, node)) {
      let clone = node.cloneNode(true);
      parent.insertBefore(clone, beforeMe);
      added(clone);
      return clone;
    }
    return node;
  }
  assignOptions(options);
  fromEl = from;
  toEl = typeof toHtml === "string" ? createElement(toHtml) : toHtml;
  if (window.Alpine && window.Alpine.closestDataStack && !from._x_dataStack) {
    toEl._x_dataStack = window.Alpine.closestDataStack(from);
    toEl._x_dataStack && window.Alpine.cloneNode(from, toEl);
  }
  patch(from, toEl);
  fromEl = void 0;
  toEl = void 0;
  return from;
}
morph.step = () => {
};
morph.log = () => {
};
function shouldSkip(hook, ...args) {
  let skip = false;
  hook(...args, () => skip = true);
  return skip;
}
var patched = false;
function createElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
}
function textOrComment(el) {
  return el.nodeType === 3 || el.nodeType === 8;
}
var Block = class {
  constructor(start, end) {
    this.startComment = start;
    this.endComment = end;
  }
  get children() {
    let children = [];
    let currentNode = this.startComment.nextSibling;
    while (currentNode && currentNode !== this.endComment) {
      children.push(currentNode);
      currentNode = currentNode.nextSibling;
    }
    return children;
  }
  appendChild(child) {
    this.endComment.before(child);
  }
  get firstChild() {
    let first = this.startComment.nextSibling;
    if (first === this.endComment)
      return;
    return first;
  }
  nextNode(reference) {
    let next = reference.nextSibling;
    if (next === this.endComment)
      return;
    return next;
  }
  insertBefore(newNode, reference) {
    reference.before(newNode);
    return newNode;
  }
};
function getFirstNode(parent) {
  return parent.firstChild;
}
function getNextSibling(parent, reference) {
  let next;
  if (parent instanceof Block) {
    next = parent.nextNode(reference);
  } else {
    next = reference.nextSibling;
  }
  return next;
}
function monkeyPatchDomSetAttributeToAllowAtSymbols() {
  if (patched)
    return;
  patched = true;
  let original = Element.prototype.setAttribute;
  let hostDiv = document.createElement("div");
  Element.prototype.setAttribute = function newSetAttribute(name, value) {
    if (!name.includes("@")) {
      return original.call(this, name, value);
    }
    hostDiv.innerHTML = `<span ${name}="${value}"></span>`;
    let attr = hostDiv.firstElementChild.getAttributeNode(name);
    hostDiv.firstElementChild.removeAttributeNode(attr);
    this.setAttributeNode(attr);
  };
}
function seedingMatchingId(to, from) {
  let fromId = from && from._x_bindings && from._x_bindings.id;
  if (!fromId)
    return;
  to.setAttribute("id", fromId);
  to.id = fromId;
}

// packages/morph/src/index.js
function src_default(Alpine) {
  Alpine.morph = morph;
}

// packages/morph/builds/module.js
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  morph
});
