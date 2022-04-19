// src/internal/dom.ts
var STYLE_ELEMENT_ID = "__twind";
var getStyleElement = (nonce) => {
  let element = self[STYLE_ELEMENT_ID];
  if (!element) {
    element = document.head.appendChild(document.createElement("style"));
    element.id = STYLE_ELEMENT_ID;
    nonce && (element.nonce = nonce);
    element.appendChild(document.createTextNode(""));
  }
  return element;
};

// src/sheets/index.ts
var domSheet = ({
  nonce,
  target = getStyleElement(nonce)
} = {}) => {
  const offset = target.childNodes.length;
  return {
    target,
    insert: (rule, index) => target.insertBefore(document.createTextNode(rule), target.childNodes[offset + index])
  };
};
var createStorage = () => {
  const callbacks = [];
  let state = [];
  const invoke = (callback, index) => state[index] = callback(state[index]);
  return {
    init: (callback) => invoke(callback, callbacks.push(callback) - 1),
    reset: (snapshot = []) => {
      ;
      [snapshot, state] = [state, snapshot];
      callbacks.forEach(invoke);
      return snapshot;
    }
  };
};
var virtualSheet = () => {
  const storage = createStorage();
  let target;
  storage.init((value = []) => target = value);
  return Object.defineProperties({
    get target() {
      return [...target];
    },
    insert: (rule, index) => target.splice(index, 0, rule)
  }, Object.getOwnPropertyDescriptors(storage));
};
var getStyleTagProperties = (sheet) => ({
  id: STYLE_ELEMENT_ID,
  textContent: (Array.isArray(sheet) ? sheet : sheet.target).join("")
});
var getStyleTag = (sheet, attributes) => {
  const {id, textContent} = getStyleTagProperties(sheet);
  attributes = {...attributes, id};
  return `<style${Object.keys(attributes).reduce((attrs, key) => `${attrs} ${key}=${JSON.stringify(attributes[key])}`, "")}>${textContent}</style>`;
};
export {
  domSheet,
  getStyleTag,
  getStyleTagProperties,
  virtualSheet
};
//# sourceMappingURL=sheets.js.map
