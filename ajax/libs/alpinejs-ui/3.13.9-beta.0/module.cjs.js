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

// packages/ui/builds/module.js
var module_exports = {};
__export(module_exports, {
  default: () => module_default,
  ui: () => src_default
});
module.exports = __toCommonJS(module_exports);

// packages/ui/src/list-context.js
function generateContext(Alpine2, multiple, orientation, activateSelectedOrFirst) {
  return {
    /**
     * Main state...
     */
    items: [],
    activeKey: switchboard(),
    orderedKeys: [],
    activatedByKeyPress: false,
    /**
     *  Initialization...
     */
    activateSelectedOrFirst: Alpine2.debounce(function() {
      activateSelectedOrFirst(false);
    }),
    registerItemsQueue: [],
    registerItem(key, el, value, disabled) {
      if (this.registerItemsQueue.length === 0) {
        queueMicrotask(() => {
          if (this.registerItemsQueue.length > 0) {
            this.items = this.items.concat(this.registerItemsQueue);
            this.registerItemsQueue = [];
            this.reorderKeys();
            this.activateSelectedOrFirst();
          }
        });
      }
      let item = {
        key,
        el,
        value,
        disabled
      };
      this.registerItemsQueue.push(item);
    },
    unregisterKeysQueue: [],
    unregisterItem(key) {
      if (this.unregisterKeysQueue.length === 0) {
        queueMicrotask(() => {
          if (this.unregisterKeysQueue.length > 0) {
            this.items = this.items.filter((i) => !this.unregisterKeysQueue.includes(i.key));
            this.orderedKeys = this.orderedKeys.filter((i) => !this.unregisterKeysQueue.includes(i));
            this.unregisterKeysQueue = [];
            this.reorderKeys();
            this.activateSelectedOrFirst();
          }
        });
      }
      this.unregisterKeysQueue.push(key);
    },
    getItemByKey(key) {
      return this.items.find((i) => i.key === key);
    },
    getItemByValue(value) {
      return this.items.find((i) => Alpine2.raw(i.value) === Alpine2.raw(value));
    },
    getItemByEl(el) {
      return this.items.find((i) => i.el === el);
    },
    getItemsByValues(values) {
      let rawValues = values.map((i) => Alpine2.raw(i));
      let filteredValue = this.items.filter((i) => rawValues.includes(Alpine2.raw(i.value)));
      filteredValue = filteredValue.slice().sort((a, b) => {
        let position = a.el.compareDocumentPosition(b.el);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING)
          return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING)
          return 1;
        return 0;
      });
      return filteredValue;
    },
    getActiveItem() {
      if (!this.hasActive())
        return null;
      let item = this.items.find((i) => i.key === this.activeKey.get());
      if (!item)
        this.deactivateKey(this.activeKey.get());
      return item;
    },
    activateItem(item) {
      if (!item)
        return;
      this.activateKey(item.key);
    },
    /**
     * Handle elements...
     */
    reorderKeys: Alpine2.debounce(function() {
      this.orderedKeys = this.items.map((i) => i.key);
      this.orderedKeys = this.orderedKeys.slice().sort((a, z) => {
        if (a === null || z === null)
          return 0;
        let aEl = this.items.find((i) => i.key === a).el;
        let zEl = this.items.find((i) => i.key === z).el;
        let position = aEl.compareDocumentPosition(zEl);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING)
          return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING)
          return 1;
        return 0;
      });
      if (!this.orderedKeys.includes(this.activeKey.get()))
        this.deactivateKey(this.activeKey.get());
    }),
    getActiveKey() {
      return this.activeKey.get();
    },
    activeEl() {
      if (!this.activeKey.get())
        return;
      return this.items.find((i) => i.key === this.activeKey.get()).el;
    },
    isActiveEl(el) {
      let key = this.items.find((i) => i.el === el);
      return this.activeKey.is(key);
    },
    activateEl(el) {
      let item = this.items.find((i) => i.el === el);
      this.activateKey(item.key);
    },
    isDisabledEl(el) {
      return this.items.find((i) => i.el === el).disabled;
    },
    get isScrollingTo() {
      return this.scrollingCount > 0;
    },
    scrollingCount: 0,
    activateAndScrollToKey(key, activatedByKeyPress) {
      if (!this.getItemByKey(key))
        return;
      this.scrollingCount++;
      this.activateKey(key, activatedByKeyPress);
      let targetEl = this.items.find((i) => i.key === key).el;
      targetEl.scrollIntoView({ block: "nearest" });
      setTimeout(() => {
        this.scrollingCount--;
      }, 25);
    },
    /**
     * Handle disabled keys...
     */
    isDisabled(key) {
      let item = this.items.find((i) => i.key === key);
      if (!item)
        return false;
      return item.disabled;
    },
    get nonDisabledOrderedKeys() {
      return this.orderedKeys.filter((i) => !this.isDisabled(i));
    },
    /**
     * Handle activated keys...
     */
    hasActive() {
      return !!this.activeKey.get();
    },
    /**
     * Return true if the latest active element was activated
     * by the user (i.e. using the arrow keys) and false if was
     * activated automatically by alpine (i.e. first element automatically
     * activated after filtering the list)
     */
    wasActivatedByKeyPress() {
      return this.activatedByKeyPress;
    },
    isActiveKey(key) {
      return this.activeKey.is(key);
    },
    activateKey(key, activatedByKeyPress = false) {
      if (this.isDisabled(key))
        return;
      this.activeKey.set(key);
      this.activatedByKeyPress = activatedByKeyPress;
    },
    deactivateKey(key) {
      if (this.activeKey.get() === key) {
        this.activeKey.set(null);
        this.activatedByKeyPress = false;
      }
    },
    deactivate() {
      if (!this.activeKey.get())
        return;
      if (this.isScrollingTo)
        return;
      this.activeKey.set(null);
      this.activatedByKeyPress = false;
    },
    /**
     * Handle active key traversal...
     */
    nextKey() {
      if (!this.activeKey.get())
        return;
      let index = this.nonDisabledOrderedKeys.findIndex((i) => i === this.activeKey.get());
      return this.nonDisabledOrderedKeys[index + 1];
    },
    prevKey() {
      if (!this.activeKey.get())
        return;
      let index = this.nonDisabledOrderedKeys.findIndex((i) => i === this.activeKey.get());
      return this.nonDisabledOrderedKeys[index - 1];
    },
    firstKey() {
      return this.nonDisabledOrderedKeys[0];
    },
    lastKey() {
      return this.nonDisabledOrderedKeys[this.nonDisabledOrderedKeys.length - 1];
    },
    searchQuery: "",
    clearSearch: Alpine2.debounce(function() {
      this.searchQuery = "";
    }, 350),
    searchKey(query) {
      this.clearSearch();
      this.searchQuery += query;
      let foundKey;
      for (let key in this.items) {
        let content = this.items[key].el.textContent.trim().toLowerCase();
        if (content.startsWith(this.searchQuery)) {
          foundKey = this.items[key].key;
          break;
        }
      }
      if (!this.nonDisabledOrderedKeys.includes(foundKey))
        return;
      return foundKey;
    },
    activateByKeyEvent(e, searchable = false, isOpen = () => false, open = () => {
    }, setIsTyping) {
      let targetKey, hasActive;
      setIsTyping(true);
      let activatedByKeyPress = true;
      switch (e.key) {
        case ["ArrowDown", "ArrowRight"][orientation === "vertical" ? 0 : 1]:
          e.preventDefault();
          e.stopPropagation();
          setIsTyping(false);
          if (!isOpen()) {
            open();
            break;
          }
          this.reorderKeys();
          hasActive = this.hasActive();
          targetKey = hasActive ? this.nextKey() : this.firstKey();
          break;
        case ["ArrowUp", "ArrowLeft"][orientation === "vertical" ? 0 : 1]:
          e.preventDefault();
          e.stopPropagation();
          setIsTyping(false);
          if (!isOpen()) {
            open();
            break;
          }
          this.reorderKeys();
          hasActive = this.hasActive();
          targetKey = hasActive ? this.prevKey() : this.lastKey();
          break;
        case "Home":
        case "PageUp":
          if (e.key == "Home" && e.shiftKey)
            return;
          e.preventDefault();
          e.stopPropagation();
          setIsTyping(false);
          this.reorderKeys();
          hasActive = this.hasActive();
          targetKey = this.firstKey();
          break;
        case "End":
        case "PageDown":
          if (e.key == "End" && e.shiftKey)
            return;
          e.preventDefault();
          e.stopPropagation();
          setIsTyping(false);
          this.reorderKeys();
          hasActive = this.hasActive();
          targetKey = this.lastKey();
          break;
        default:
          activatedByKeyPress = this.activatedByKeyPress;
          if (searchable && e.key.length === 1) {
            targetKey = this.searchKey(e.key);
          }
          break;
      }
      if (targetKey) {
        this.activateAndScrollToKey(targetKey, activatedByKeyPress);
      }
    }
  };
}
function renderHiddenInputs(Alpine2, el, name, value) {
  let newInputs = generateInputs(name, value);
  newInputs.forEach((i) => i._x_hiddenInput = true);
  newInputs.forEach((i) => i._x_ignore = true);
  let children = el.children;
  let oldInputs = [];
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (child._x_hiddenInput)
      oldInputs.push(child);
    else
      break;
  }
  Alpine2.mutateDom(() => {
    oldInputs.forEach((i) => i.remove());
    newInputs.reverse().forEach((i) => el.prepend(i));
  });
}
function generateInputs(name, value, carry = []) {
  if (isObjectOrArray(value)) {
    for (let key in value) {
      carry = carry.concat(
        generateInputs(`${name}[${key}]`, value[key])
      );
    }
  } else {
    let el = document.createElement("input");
    el.setAttribute("type", "hidden");
    el.setAttribute("name", name);
    el.setAttribute("value", "" + value);
    return [el];
  }
  return carry;
}
function isObjectOrArray(subject) {
  return typeof subject === "object" && subject !== null;
}
function switchboard(value) {
  let lookup = {};
  let current;
  let changeTracker = Alpine.reactive({ state: false });
  let get = () => {
    if (changeTracker.state) {
    }
    return current;
  };
  let set = (newValue) => {
    if (newValue === current)
      return;
    if (current !== void 0)
      lookup[current].state = false;
    current = newValue;
    if (lookup[newValue] === void 0) {
      lookup[newValue] = Alpine.reactive({ state: true });
    } else {
      lookup[newValue].state = true;
    }
    changeTracker.state = !changeTracker.state;
  };
  let is = (comparisonValue) => {
    if (lookup[comparisonValue] === void 0) {
      lookup[comparisonValue] = Alpine.reactive({ state: false });
      return lookup[comparisonValue].state;
    }
    return !!lookup[comparisonValue].state;
  };
  value === void 0 || set(value);
  return { get, set, is };
}

// packages/ui/src/combobox.js
function combobox_default(Alpine2) {
  Alpine2.directive("combobox", (el, directive, { evaluate }) => {
    if (directive.value === "input")
      handleInput(el, Alpine2);
    else if (directive.value === "button")
      handleButton(el, Alpine2);
    else if (directive.value === "label")
      handleLabel(el, Alpine2);
    else if (directive.value === "options")
      handleOptions(el, Alpine2);
    else if (directive.value === "option")
      handleOption(el, Alpine2, directive, evaluate);
    else
      handleRoot(el, Alpine2);
  }).before("bind");
  Alpine2.magic("combobox", (el) => {
    let data = Alpine2.$data(el);
    return {
      get value() {
        return data.__value;
      },
      get isOpen() {
        return data.__isOpen;
      },
      get isDisabled() {
        return data.__isDisabled;
      },
      get activeOption() {
        var _a;
        let active = (_a = data.__context) == null ? void 0 : _a.getActiveItem();
        return active && active.value;
      },
      get activeIndex() {
        var _a;
        let active = (_a = data.__context) == null ? void 0 : _a.getActiveItem();
        if (active) {
          return Object.values(Alpine2.raw(data.__context.items)).findIndex((i) => Alpine2.raw(active) == Alpine2.raw(i));
        }
        return null;
      }
    };
  });
  Alpine2.magic("comboboxOption", (el) => {
    let data = Alpine2.$data(el);
    let optionEl = Alpine2.findClosest(el, (i) => {
      return i.hasAttribute("x-combobox:option");
    });
    if (!optionEl)
      throw "No x-combobox:option directive found...";
    return {
      get isActive() {
        return data.__context.isActiveKey(Alpine2.$data(optionEl).__optionKey);
      },
      get isSelected() {
        return data.__isSelected(optionEl);
      },
      get isDisabled() {
        return data.__context.isDisabled(Alpine2.$data(optionEl).__optionKey);
      }
    };
  });
}
function handleRoot(el, Alpine2) {
  Alpine2.bind(el, {
    // Setup...
    "x-id"() {
      return ["alpine-combobox-button", "alpine-combobox-options", "alpine-combobox-label"];
    },
    "x-modelable": "__value",
    // Initialize...
    "x-data"() {
      return {
        /**
         * Combobox state...
         */
        __ready: false,
        __value: null,
        __isOpen: false,
        __context: void 0,
        __isMultiple: void 0,
        __isStatic: false,
        __isDisabled: void 0,
        __displayValue: void 0,
        __compareBy: null,
        __inputName: null,
        __isTyping: false,
        __hold: false,
        /**
         * Combobox initialization...
         */
        init() {
          this.__isMultiple = Alpine2.extractProp(el, "multiple", false);
          this.__isDisabled = Alpine2.extractProp(el, "disabled", false);
          this.__inputName = Alpine2.extractProp(el, "name", null);
          this.__nullable = Alpine2.extractProp(el, "nullable", false);
          this.__compareBy = Alpine2.extractProp(el, "by");
          this.__context = generateContext(Alpine2, this.__isMultiple, "vertical", () => this.__activateSelectedOrFirst());
          let defaultValue = Alpine2.extractProp(el, "default-value", this.__isMultiple ? [] : null);
          this.__value = defaultValue;
          queueMicrotask(() => {
            Alpine2.effect(() => {
              this.__inputName && renderHiddenInputs(Alpine2, this.$el, this.__inputName, this.__value);
            });
            Alpine2.effect(() => !this.__isMultiple && this.__resetInput());
          });
        },
        __startTyping() {
          this.__isTyping = true;
        },
        __stopTyping() {
          this.__isTyping = false;
        },
        __resetInput() {
          let input = this.$refs.__input;
          if (!input)
            return;
          let value = this.__getCurrentValue();
          input.value = value;
        },
        __getCurrentValue() {
          if (!this.$refs.__input)
            return "";
          if (!this.__value)
            return "";
          if (this.__displayValue)
            return this.__displayValue(this.__value);
          if (typeof this.__value === "string")
            return this.__value;
          return "";
        },
        __open() {
          if (this.__isOpen)
            return;
          this.__isOpen = true;
          let input = this.$refs.__input;
          if (input) {
            let value = input.value;
            let { selectionStart, selectionEnd, selectionDirection } = input;
            input.value = "";
            input.dispatchEvent(new Event("change"));
            input.value = value;
            if (selectionDirection !== null) {
              input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
            } else {
              input.setSelectionRange(selectionStart, selectionEnd);
            }
          }
          let nextTick = (callback) => requestAnimationFrame(() => requestAnimationFrame(callback));
          nextTick(() => {
            this.$refs.__input.focus({ preventScroll: true });
            this.__activateSelectedOrFirst();
          });
        },
        __close() {
          this.__isOpen = false;
          this.__context.deactivate();
        },
        __activateSelectedOrFirst(activateSelected = true) {
          if (!this.__isOpen)
            return;
          if (this.__context.hasActive() && this.__context.wasActivatedByKeyPress())
            return;
          let firstSelectedValue;
          if (this.__isMultiple) {
            let selectedItem = this.__context.getItemsByValues(this.__value);
            firstSelectedValue = selectedItem.length ? selectedItem[0].value : null;
          } else {
            firstSelectedValue = this.__value;
          }
          let firstSelected = null;
          if (activateSelected && firstSelectedValue) {
            firstSelected = this.__context.getItemByValue(firstSelectedValue);
          }
          if (firstSelected) {
            this.__context.activateAndScrollToKey(firstSelected.key);
            return;
          }
          this.__context.activateAndScrollToKey(this.__context.firstKey());
        },
        __selectActive() {
          let active = this.__context.getActiveItem();
          if (active)
            this.__toggleSelected(active.value);
        },
        __selectOption(el2) {
          let item = this.__context.getItemByEl(el2);
          if (item)
            this.__toggleSelected(item.value);
        },
        __isSelected(el2) {
          let item = this.__context.getItemByEl(el2);
          if (!item)
            return false;
          if (item.value === null || item.value === void 0)
            return false;
          return this.__hasSelected(item.value);
        },
        __toggleSelected(value) {
          if (!this.__isMultiple) {
            this.__value = value;
            return;
          }
          let index = this.__value.findIndex((j) => this.__compare(j, value));
          if (index === -1) {
            this.__value.push(value);
          } else {
            this.__value.splice(index, 1);
          }
        },
        __hasSelected(value) {
          if (!this.__isMultiple)
            return this.__compare(this.__value, value);
          return this.__value.some((i) => this.__compare(i, value));
        },
        __compare(a, b) {
          let by = this.__compareBy;
          if (!by)
            by = (a2, b2) => Alpine2.raw(a2) === Alpine2.raw(b2);
          if (typeof by === "string") {
            let property = by;
            by = (a2, b2) => {
              if (!a2 || typeof a2 !== "object" || (!b2 || typeof b2 !== "object")) {
                return Alpine2.raw(a2) === Alpine2.raw(b2);
              }
              return a2[property] === b2[property];
            };
          }
          return by(a, b);
        }
      };
    },
    // Register event listeners..
    "@mousedown.window"(e) {
      if (!!!this.$refs.__input.contains(e.target) && !this.$refs.__button.contains(e.target) && !this.$refs.__options.contains(e.target)) {
        this.__close();
        this.__resetInput();
      }
    }
  });
}
function handleInput(el, Alpine2) {
  Alpine2.bind(el, {
    // Setup...
    "x-ref": "__input",
    ":id"() {
      return this.$id("alpine-combobox-input");
    },
    // Accessibility attributes...
    "role": "combobox",
    "tabindex": "0",
    "aria-autocomplete": "list",
    // We need to defer this evaluation a bit because $refs that get declared later
    // in the DOM aren't available yet when x-ref is the result of an Alpine.bind object.
    async ":aria-controls"() {
      return await microtask(() => this.$refs.__options && this.$refs.__options.id);
    },
    ":aria-expanded"() {
      return this.$data.__isDisabled ? void 0 : this.$data.__isOpen;
    },
    ":aria-multiselectable"() {
      return this.$data.__isMultiple ? true : void 0;
    },
    ":aria-activedescendant"() {
      if (!this.$data.__context.hasActive())
        return;
      let active = this.$data.__context.getActiveItem();
      return active ? active.el.id : null;
    },
    ":aria-labelledby"() {
      return this.$refs.__label ? this.$refs.__label.id : this.$refs.__button ? this.$refs.__button.id : null;
    },
    // Initialize...
    "x-init"() {
      let displayValueFn = Alpine2.extractProp(this.$el, "display-value");
      if (displayValueFn)
        this.$data.__displayValue = displayValueFn;
    },
    // Register listeners...
    "@input.stop"(e) {
      if (this.$data.__isTyping) {
        this.$data.__open();
        this.$dispatch("change");
      }
    },
    "@blur"() {
      this.$data.__stopTyping(false);
    },
    "@keydown"(e) {
      queueMicrotask(() => this.$data.__context.activateByKeyEvent(e, false, () => this.$data.__isOpen, () => this.$data.__open(), (state) => this.$data.__isTyping = state));
    },
    "@keydown.enter.prevent.stop"() {
      this.$data.__selectActive();
      this.$data.__stopTyping();
      if (!this.$data.__isMultiple) {
        this.$data.__close();
        this.$data.__resetInput();
      }
    },
    "@keydown.escape.prevent"(e) {
      if (!this.$data.__static)
        e.stopPropagation();
      this.$data.__stopTyping();
      this.$data.__close();
      this.$data.__resetInput();
    },
    "@keydown.tab"() {
      this.$data.__stopTyping();
      if (this.$data.__isOpen) {
        this.$data.__close();
      }
      this.$data.__resetInput();
    },
    "@keydown.backspace"(e) {
      if (this.$data.__isMultiple)
        return;
      if (!this.$data.__nullable)
        return;
      let input = e.target;
      requestAnimationFrame(() => {
        if (input.value === "") {
          this.$data.__value = null;
          let options = this.$refs.__options;
          if (options) {
            options.scrollTop = 0;
          }
          this.$data.__context.deactivate();
        }
      });
    }
  });
}
function handleButton(el, Alpine2) {
  Alpine2.bind(el, {
    // Setup...
    "x-ref": "__button",
    ":id"() {
      return this.$id("alpine-combobox-button");
    },
    // Accessibility attributes...
    "aria-haspopup": "true",
    // We need to defer this evaluation a bit because $refs that get declared later
    // in the DOM aren't available yet when x-ref is the result of an Alpine.bind object.
    async ":aria-controls"() {
      return await microtask(() => this.$refs.__options && this.$refs.__options.id);
    },
    ":aria-labelledby"() {
      return this.$refs.__label ? [this.$refs.__label.id, this.$el.id].join(" ") : null;
    },
    ":aria-expanded"() {
      return this.$data.__isDisabled ? null : this.$data.__isOpen;
    },
    ":disabled"() {
      return this.$data.__isDisabled;
    },
    "tabindex": "-1",
    // Initialize....
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
    },
    // Register listeners...
    "@click"(e) {
      if (this.$data.__isDisabled)
        return;
      if (this.$data.__isOpen) {
        this.$data.__close();
        this.$data.__resetInput();
      } else {
        e.preventDefault();
        this.$data.__open();
      }
      this.$nextTick(() => this.$refs.__input.focus({ preventScroll: true }));
    }
  });
}
function handleLabel(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "__label",
    ":id"() {
      return this.$id("alpine-combobox-label");
    },
    "@click"() {
      this.$refs.__input.focus({ preventScroll: true });
    }
  });
}
function handleOptions(el, Alpine2) {
  Alpine2.bind(el, {
    // Setup...
    "x-ref": "__options",
    ":id"() {
      return this.$id("alpine-combobox-options");
    },
    // Accessibility attributes...
    "role": "listbox",
    ":aria-labelledby"() {
      return this.$refs.__label ? this.$refs.__label.id : this.$refs.__button ? this.$refs.__button.id : null;
    },
    // Initialize...
    "x-init"() {
      this.$data.__isStatic = Alpine2.bound(this.$el, "static", false);
      if (Alpine2.bound(this.$el, "hold")) {
        this.$data.__hold = true;
      }
    },
    "x-show"() {
      return this.$data.__isStatic ? true : this.$data.__isOpen;
    }
  });
}
function handleOption(el, Alpine2) {
  Alpine2.bind(el, {
    // Setup...
    "x-id"() {
      return ["alpine-combobox-option"];
    },
    ":id"() {
      return this.$id("alpine-combobox-option");
    },
    // Accessibility attributes...
    "role": "option",
    ":tabindex"() {
      return this.$comboboxOption.isDisabled ? void 0 : "-1";
    },
    // Only the active element should have aria-selected="true"...
    "x-effect"() {
      this.$comboboxOption.isSelected ? el.setAttribute("aria-selected", true) : el.setAttribute("aria-selected", false);
    },
    ":aria-disabled"() {
      return this.$comboboxOption.isDisabled;
    },
    // Initialize...
    "x-data"() {
      return {
        "__optionKey": null,
        init() {
          this.__optionKey = (Math.random() + 1).toString(36).substring(7);
          let value = Alpine2.extractProp(this.$el, "value");
          let disabled = Alpine2.extractProp(this.$el, "disabled", false, false);
          this.__context.registerItem(this.__optionKey, this.$el, value, disabled);
        },
        destroy() {
          this.__context.unregisterItem(this.__optionKey);
        }
      };
    },
    // Register listeners...
    "@click"() {
      if (this.$comboboxOption.isDisabled)
        return;
      this.__selectOption(this.$el);
      if (!this.__isMultiple) {
        this.__close();
        this.__resetInput();
      }
      this.$nextTick(() => this.$refs.__input.focus({ preventScroll: true }));
    },
    "@mouseenter"(e) {
      this.__context.activateEl(this.$el);
    },
    "@mousemove"(e) {
      if (this.__context.isActiveEl(this.$el))
        return;
      this.__context.activateEl(this.$el);
    },
    "@mouseleave"(e) {
      if (this.__hold)
        return;
      this.__context.deactivate();
    }
  });
}
function microtask(callback) {
  return new Promise((resolve) => queueMicrotask(() => resolve(callback())));
}

// packages/ui/src/dialog.js
function dialog_default(Alpine2) {
  Alpine2.directive("dialog", (el, directive) => {
    if (directive.value === "overlay")
      handleOverlay(el, Alpine2);
    else if (directive.value === "panel")
      handlePanel(el, Alpine2);
    else if (directive.value === "title")
      handleTitle(el, Alpine2);
    else if (directive.value === "description")
      handleDescription(el, Alpine2);
    else
      handleRoot2(el, Alpine2);
  });
  Alpine2.magic("dialog", (el) => {
    let $data = Alpine2.$data(el);
    return {
      // Kept here for legacy. Remove after out of beta.
      get open() {
        return $data.__isOpen;
      },
      get isOpen() {
        return $data.__isOpen;
      },
      close() {
        $data.__close();
      }
    };
  });
}
function handleRoot2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-data"() {
      return {
        init() {
          Alpine2.bound(el, "open") !== void 0 && Alpine2.effect(() => {
            this.__isOpenState = Alpine2.bound(el, "open");
          });
          if (Alpine2.bound(el, "initial-focus") !== void 0)
            this.$watch("__isOpenState", () => {
              if (!this.__isOpenState)
                return;
              setTimeout(() => {
                Alpine2.bound(el, "initial-focus").focus();
              }, 0);
            });
        },
        __isOpenState: false,
        __close() {
          if (Alpine2.bound(el, "open"))
            this.$dispatch("close");
          else
            this.__isOpenState = false;
        },
        get __isOpen() {
          return Alpine2.bound(el, "static", this.__isOpenState);
        }
      };
    },
    "x-modelable": "__isOpenState",
    "x-id"() {
      return ["alpine-dialog-title", "alpine-dialog-description"];
    },
    "x-show"() {
      return this.__isOpen;
    },
    "x-trap.inert.noscroll"() {
      return this.__isOpen;
    },
    "@keydown.escape"() {
      this.__close();
    },
    ":aria-labelledby"() {
      return this.$id("alpine-dialog-title");
    },
    ":aria-describedby"() {
      return this.$id("alpine-dialog-description");
    },
    "role": "dialog",
    "aria-modal": "true"
  });
}
function handleOverlay(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      if (this.$data.__isOpen === void 0)
        console.warn('"x-dialog:overlay" is missing a parent element with "x-dialog".');
    },
    "x-show"() {
      return this.__isOpen;
    },
    "@click.prevent.stop"() {
      this.$data.__close();
    }
  });
}
function handlePanel(el, Alpine2) {
  Alpine2.bind(el, {
    "@click.outside"() {
      this.$data.__close();
    },
    "x-show"() {
      return this.$data.__isOpen;
    }
  });
}
function handleTitle(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      if (this.$data.__isOpen === void 0)
        console.warn('"x-dialog:title" is missing a parent element with "x-dialog".');
    },
    ":id"() {
      return this.$id("alpine-dialog-title");
    }
  });
}
function handleDescription(el, Alpine2) {
  Alpine2.bind(el, {
    ":id"() {
      return this.$id("alpine-dialog-description");
    }
  });
}

// packages/ui/src/disclosure.js
function disclosure_default(Alpine2) {
  Alpine2.directive("disclosure", (el, directive) => {
    if (!directive.value)
      handleRoot3(el, Alpine2);
    else if (directive.value === "panel")
      handlePanel2(el, Alpine2);
    else if (directive.value === "button")
      handleButton2(el, Alpine2);
  }).before("bind");
  Alpine2.magic("disclosure", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isOpen() {
        return $data.__isOpen;
      },
      close() {
        $data.__close();
      }
    };
  });
}
function handleRoot3(el, Alpine2) {
  Alpine2.bind(el, {
    "x-modelable": "__isOpen",
    "x-data"() {
      return {
        // The panel will call this...
        // We can't do this inside a microtask in x-init because, when default-open is set to "true",
        // It will cause the panel to transition in for the first time, instead of showing instantly...
        __determineDefaultOpenState() {
          let defaultIsOpen = Boolean(Alpine2.bound(this.$el, "default-open", false));
          if (defaultIsOpen)
            this.__isOpen = defaultIsOpen;
        },
        __isOpen: false,
        __close() {
          this.__isOpen = false;
        },
        __toggle() {
          this.__isOpen = !this.__isOpen;
        }
      };
    },
    "x-id"() {
      return ["alpine-disclosure-panel"];
    }
  });
}
function handleButton2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
    },
    "@click"() {
      this.$data.__isOpen = !this.$data.__isOpen;
    },
    ":aria-expanded"() {
      return this.$data.__isOpen;
    },
    ":aria-controls"() {
      return this.$data.$id("alpine-disclosure-panel");
    },
    "@keydown.space.prevent.stop"() {
      this.$data.__toggle();
    },
    "@keydown.enter.prevent.stop"() {
      this.$data.__toggle();
    },
    // Required for firefox, event.preventDefault() in handleKeyDown for
    // the Space key doesn't cancel the handleKeyUp, which in turn
    // triggers a *click*.
    "@keyup.space.prevent"() {
    }
  });
}
function handlePanel2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__determineDefaultOpenState();
    },
    "x-show"() {
      return this.$data.__isOpen;
    },
    ":id"() {
      return this.$data.$id("alpine-disclosure-panel");
    }
  });
}

// packages/ui/src/listbox.js
function listbox_default(Alpine2) {
  Alpine2.directive("listbox", (el, directive) => {
    if (!directive.value)
      handleRoot4(el, Alpine2);
    else if (directive.value === "label")
      handleLabel2(el, Alpine2);
    else if (directive.value === "button")
      handleButton3(el, Alpine2);
    else if (directive.value === "options")
      handleOptions2(el, Alpine2);
    else if (directive.value === "option")
      handleOption2(el, Alpine2);
  }).before("bind");
  Alpine2.magic("listbox", (el) => {
    let data = Alpine2.$data(el);
    return {
      // @deprecated:
      get selected() {
        return data.__value;
      },
      // @deprecated:
      get active() {
        let active = data.__context.getActiveItem();
        return active && active.value;
      },
      get value() {
        return data.__value;
      },
      get isOpen() {
        return data.__isOpen;
      },
      get isDisabled() {
        return data.__isDisabled;
      },
      get activeOption() {
        let active = data.__context.getActiveItem();
        return active && active.value;
      },
      get activeIndex() {
        let active = data.__context.getActiveItem();
        return active && active.key;
      }
    };
  });
  Alpine2.magic("listboxOption", (el) => {
    let data = Alpine2.$data(el);
    let optionEl = Alpine2.findClosest(el, (i) => {
      return i.hasAttribute("x-listbox:option");
    });
    if (!optionEl)
      throw "No x-listbox:option directive found...";
    return {
      get isActive() {
        return data.__context.isActiveKey(Alpine2.$data(optionEl).__optionKey);
      },
      get isSelected() {
        return data.__isSelected(optionEl);
      },
      get isDisabled() {
        return data.__context.isDisabled(Alpine2.$data(optionEl).__optionKey);
      }
    };
  });
}
function handleRoot4(el, Alpine2) {
  Alpine2.bind(el, {
    // Setup...
    "x-id"() {
      return ["alpine-listbox-button", "alpine-listbox-options", "alpine-listbox-label"];
    },
    "x-modelable": "__value",
    // Initialize...
    "x-data"() {
      return {
        /**
         * Listbox state...
         */
        __ready: false,
        __value: null,
        __isOpen: false,
        __context: void 0,
        __isMultiple: void 0,
        __isStatic: false,
        __isDisabled: void 0,
        __compareBy: null,
        __inputName: null,
        __orientation: "vertical",
        __hold: false,
        /**
         * Listbox initialization...
         */
        init() {
          this.__isMultiple = Alpine2.extractProp(el, "multiple", false);
          this.__isDisabled = Alpine2.extractProp(el, "disabled", false);
          this.__inputName = Alpine2.extractProp(el, "name", null);
          this.__compareBy = Alpine2.extractProp(el, "by");
          this.__orientation = Alpine2.extractProp(el, "horizontal", false) ? "horizontal" : "vertical";
          this.__context = generateContext(Alpine2, this.__isMultiple, this.__orientation, () => this.__activateSelectedOrFirst());
          let defaultValue = Alpine2.extractProp(el, "default-value", this.__isMultiple ? [] : null);
          this.__value = defaultValue;
          queueMicrotask(() => {
            Alpine2.effect(() => {
              this.__inputName && renderHiddenInputs(Alpine2, this.$el, this.__inputName, this.__value);
            });
            Alpine2.effect(() => {
              this.__resetInput();
            });
          });
        },
        __resetInput() {
          let input = this.$refs.__input;
          if (!input)
            return;
          let value = this.$data.__getCurrentValue();
          input.value = value;
        },
        __getCurrentValue() {
          if (!this.$refs.__input)
            return "";
          if (!this.__value)
            return "";
          if (this.$data.__displayValue && this.__value !== void 0)
            return this.$data.__displayValue(this.__value);
          if (typeof this.__value === "string")
            return this.__value;
          return "";
        },
        __open() {
          if (this.__isOpen)
            return;
          this.__isOpen = true;
          this.__activateSelectedOrFirst();
          let nextTick = (callback) => requestAnimationFrame(() => requestAnimationFrame(callback));
          nextTick(() => this.$refs.__options.focus({ preventScroll: true }));
        },
        __close() {
          this.__isOpen = false;
          this.__context.deactivate();
          this.$nextTick(() => this.$refs.__button.focus({ preventScroll: true }));
        },
        __activateSelectedOrFirst(activateSelected = true) {
          if (!this.__isOpen)
            return;
          if (this.__context.getActiveKey()) {
            this.__context.activateAndScrollToKey(this.__context.getActiveKey());
            return;
          }
          let firstSelectedValue;
          if (this.__isMultiple) {
            firstSelectedValue = this.__value.find((i) => {
              return !!this.__context.getItemByValue(i);
            });
          } else {
            firstSelectedValue = this.__value;
          }
          if (activateSelected && firstSelectedValue) {
            let firstSelected = this.__context.getItemByValue(firstSelectedValue);
            firstSelected && this.__context.activateAndScrollToKey(firstSelected.key);
          } else {
            this.__context.activateAndScrollToKey(this.__context.firstKey());
          }
        },
        __selectActive() {
          let active = this.$data.__context.getActiveItem();
          if (active)
            this.__toggleSelected(active.value);
        },
        __selectOption(el2) {
          let item = this.__context.getItemByEl(el2);
          if (item)
            this.__toggleSelected(item.value);
        },
        __isSelected(el2) {
          let item = this.__context.getItemByEl(el2);
          if (!item)
            return false;
          if (item.value === null || item.value === void 0)
            return false;
          return this.__hasSelected(item.value);
        },
        __toggleSelected(value) {
          if (!this.__isMultiple) {
            this.__value = value;
            return;
          }
          let index = this.__value.findIndex((j) => this.__compare(j, value));
          if (index === -1) {
            this.__value.push(value);
          } else {
            this.__value.splice(index, 1);
          }
        },
        __hasSelected(value) {
          if (!this.__isMultiple)
            return this.__compare(this.__value, value);
          return this.__value.some((i) => this.__compare(i, value));
        },
        __compare(a, b) {
          let by = this.__compareBy;
          if (!by)
            by = (a2, b2) => Alpine2.raw(a2) === Alpine2.raw(b2);
          if (typeof by === "string") {
            let property = by;
            by = (a2, b2) => {
              if (!a2 || typeof a2 !== "object" || (!b2 || typeof b2 !== "object")) {
                return Alpine2.raw(a2) === Alpine2.raw(b2);
              }
              return a2[property] === b2[property];
            };
          }
          return by(a, b);
        }
      };
    }
  });
}
function handleLabel2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "__label",
    ":id"() {
      return this.$id("alpine-listbox-label");
    },
    "@click"() {
      this.$refs.__button.focus({ preventScroll: true });
    }
  });
}
function handleButton3(el, Alpine2) {
  Alpine2.bind(el, {
    // Setup...
    "x-ref": "__button",
    ":id"() {
      return this.$id("alpine-listbox-button");
    },
    // Accessibility attributes...
    "aria-haspopup": "true",
    ":aria-labelledby"() {
      return this.$id("alpine-listbox-label");
    },
    ":aria-expanded"() {
      return this.$data.__isOpen;
    },
    ":aria-controls"() {
      return this.$data.__isOpen && this.$id("alpine-listbox-options");
    },
    // Initialize....
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
    },
    // Register listeners...
    "@click"() {
      this.$data.__open();
    },
    "@keydown"(e) {
      if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.stopPropagation();
        e.preventDefault();
        this.$data.__open();
      }
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__open();
    },
    "@keydown.enter.stop.prevent"() {
      this.$data.__open();
    }
  });
}
function handleOptions2(el, Alpine2) {
  Alpine2.bind(el, {
    // Setup...
    "x-ref": "__options",
    ":id"() {
      return this.$id("alpine-listbox-options");
    },
    // Accessibility attributes...
    "role": "listbox",
    tabindex: "0",
    ":aria-orientation"() {
      return this.$data.__orientation;
    },
    ":aria-labelledby"() {
      return this.$id("alpine-listbox-button");
    },
    ":aria-activedescendant"() {
      if (!this.$data.__context.hasActive())
        return;
      let active = this.$data.__context.getActiveItem();
      return active ? active.el.id : null;
    },
    // Initialize...
    "x-init"() {
      this.$data.__isStatic = Alpine2.extractProp(this.$el, "static", false);
      if (Alpine2.bound(this.$el, "hold")) {
        this.$data.__hold = true;
      }
    },
    "x-show"() {
      return this.$data.__isStatic ? true : this.$data.__isOpen;
    },
    "x-trap"() {
      return this.$data.__isOpen;
    },
    "@click.outside"() {
      this.$data.__close();
    },
    "@keydown.escape.stop.prevent"() {
      this.$data.__close();
    },
    "@focus"() {
      this.$data.__activateSelectedOrFirst();
    },
    "@keydown"(e) {
      queueMicrotask(() => this.$data.__context.activateByKeyEvent(e, true, () => this.$data.__isOpen, () => this.$data.__open(), () => {
      }));
    },
    "@keydown.enter.stop.prevent"() {
      this.$data.__selectActive();
      this.$data.__isMultiple || this.$data.__close();
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__selectActive();
      this.$data.__isMultiple || this.$data.__close();
    }
  });
}
function handleOption2(el, Alpine2) {
  Alpine2.bind(el, () => {
    return {
      "x-id"() {
        return ["alpine-listbox-option"];
      },
      ":id"() {
        return this.$id("alpine-listbox-option");
      },
      // Accessibility attributes...
      "role": "option",
      ":tabindex"() {
        return this.$listboxOption.isDisabled ? false : "-1";
      },
      ":aria-selected"() {
        return this.$listboxOption.isSelected;
      },
      // Initialize...
      "x-data"() {
        return {
          "__optionKey": null,
          init() {
            this.__optionKey = (Math.random() + 1).toString(36).substring(7);
            let value = Alpine2.extractProp(el, "value");
            let disabled = Alpine2.extractProp(el, "disabled", false, false);
            this.$data.__context.registerItem(this.__optionKey, el, value, disabled);
          },
          destroy() {
            this.$data.__context.unregisterItem(this.__optionKey);
          }
        };
      },
      // Register listeners...
      "@click"() {
        if (this.$listboxOption.isDisabled)
          return;
        this.$data.__selectOption(el);
        this.$data.__isMultiple || this.$data.__close();
      },
      "@mouseenter"() {
        this.$data.__context.activateEl(el);
      },
      "@mouseleave"() {
        this.$data.__hold || this.$data.__context.deactivate();
      }
    };
  });
}

// packages/ui/src/popover.js
function popover_default(Alpine2) {
  Alpine2.directive("popover", (el, directive) => {
    if (!directive.value)
      handleRoot5(el, Alpine2);
    else if (directive.value === "overlay")
      handleOverlay2(el, Alpine2);
    else if (directive.value === "button")
      handleButton4(el, Alpine2);
    else if (directive.value === "panel")
      handlePanel3(el, Alpine2);
    else if (directive.value === "group")
      handleGroup(el, Alpine2);
  });
  Alpine2.magic("popover", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isOpen() {
        return $data.__isOpenState;
      },
      open() {
        $data.__open();
      },
      close() {
        $data.__close();
      }
    };
  });
}
function handleRoot5(el, Alpine2) {
  Alpine2.bind(el, {
    "x-id"() {
      return ["alpine-popover-button", "alpine-popover-panel"];
    },
    "x-modelable": "__isOpenState",
    "x-data"() {
      return {
        init() {
          if (this.$data.__groupEl) {
            this.$data.__groupEl.addEventListener("__close-others", ({ detail }) => {
              if (detail.el.isSameNode(this.$el))
                return;
              this.__close(false);
            });
          }
        },
        __buttonEl: void 0,
        __panelEl: void 0,
        __isStatic: false,
        get __isOpen() {
          if (this.__isStatic)
            return true;
          return this.__isOpenState;
        },
        __isOpenState: false,
        __open() {
          this.__isOpenState = true;
          this.$dispatch("__close-others", { el: this.$el });
        },
        __toggle() {
          this.__isOpenState ? this.__close() : this.__open();
        },
        __close(el2) {
          if (this.__isStatic)
            return;
          this.__isOpenState = false;
          if (el2 === false)
            return;
          el2 = el2 || this.$data.__buttonEl;
          if (document.activeElement.isSameNode(el2))
            return;
          setTimeout(() => el2.focus());
        },
        __contains(outer, inner) {
          return !!Alpine2.findClosest(inner, (el2) => el2.isSameNode(outer));
        }
      };
    },
    "@keydown.escape.stop.prevent"() {
      this.__close();
    },
    "@focusin.window"() {
      if (this.$data.__groupEl) {
        if (!this.$data.__contains(this.$data.__groupEl, document.activeElement)) {
          this.$data.__close(false);
        }
        return;
      }
      if (!this.$data.__contains(this.$el, document.activeElement)) {
        this.$data.__close(false);
      }
    }
  });
}
function handleButton4(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "button",
    ":id"() {
      return this.$id("alpine-popover-button");
    },
    ":aria-expanded"() {
      return this.$data.__isOpen;
    },
    ":aria-controls"() {
      return this.$data.__isOpen && this.$id("alpine-popover-panel");
    },
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
      this.$data.__buttonEl = this.$el;
    },
    "@click"() {
      this.$data.__toggle();
    },
    "@keydown.tab"(e) {
      if (!e.shiftKey && this.$data.__isOpen) {
        let firstFocusableEl = this.$focus.within(this.$data.__panelEl).getFirst();
        if (firstFocusableEl) {
          e.preventDefault();
          e.stopPropagation();
          this.$focus.focus(firstFocusableEl);
        }
      }
    },
    "@keyup.tab"(e) {
      if (this.$data.__isOpen) {
        let lastEl = this.$focus.previouslyFocused();
        if (!lastEl)
          return;
        if (
          // Make sure the last focused wasn't part of this popover.
          !this.$data.__buttonEl.contains(lastEl) && !this.$data.__panelEl.contains(lastEl) && (lastEl && this.$el.compareDocumentPosition(lastEl) & Node.DOCUMENT_POSITION_FOLLOWING)
        ) {
          e.preventDefault();
          e.stopPropagation();
          this.$focus.within(this.$data.__panelEl).last();
        }
      }
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__toggle();
    },
    "@keydown.enter.stop.prevent"() {
      this.$data.__toggle();
    },
    // This is to stop Firefox from firing a "click".
    "@keyup.space.stop.prevent"() {
    }
  });
}
function handlePanel3(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__isStatic = Alpine2.bound(this.$el, "static", false);
      this.$data.__panelEl = this.$el;
    },
    "x-effect"() {
      this.$data.__isOpen && Alpine2.bound(el, "focus") && this.$focus.first();
    },
    "x-ref": "panel",
    ":id"() {
      return this.$id("alpine-popover-panel");
    },
    "x-show"() {
      return this.$data.__isOpen;
    },
    "@mousedown.window"($event) {
      if (!this.$data.__isOpen)
        return;
      if (this.$data.__contains(this.$data.__buttonEl, $event.target))
        return;
      if (this.$data.__contains(this.$el, $event.target))
        return;
      if (!this.$focus.focusable($event.target)) {
        this.$data.__close();
      }
    },
    "@keydown.tab"(e) {
      if (e.shiftKey && this.$focus.isFirst(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        Alpine2.bound(el, "focus") ? this.$data.__close() : this.$data.__buttonEl.focus();
      } else if (!e.shiftKey && this.$focus.isLast(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        let els = this.$focus.within(document).all();
        let buttonIdx = els.indexOf(this.$data.__buttonEl);
        let nextEls = els.splice(buttonIdx + 1).filter((el2) => !this.$el.contains(el2));
        nextEls[0].focus();
        Alpine2.bound(el, "focus") && this.$data.__close(false);
      }
    }
  });
}
function handleGroup(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "container",
    "x-data"() {
      return {
        __groupEl: this.$el
      };
    }
  });
}
function handleOverlay2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-show"() {
      return this.$data.__isOpen;
    }
  });
}

// packages/ui/src/menu.js
function menu_default(Alpine2) {
  Alpine2.directive("menu", (el, directive) => {
    if (!directive.value)
      handleRoot6(el, Alpine2);
    else if (directive.value === "items")
      handleItems(el, Alpine2);
    else if (directive.value === "item")
      handleItem(el, Alpine2);
    else if (directive.value === "button")
      handleButton5(el, Alpine2);
  }).before("bind");
  Alpine2.magic("menuItem", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isActive() {
        return $data.__activeEl == $data.__itemEl;
      },
      get isDisabled() {
        return $data.__itemEl.__isDisabled.value;
      }
    };
  });
}
function handleRoot6(el, Alpine2) {
  Alpine2.bind(el, {
    "x-id"() {
      return ["alpine-menu-button", "alpine-menu-items"];
    },
    "x-modelable": "__isOpen",
    "x-data"() {
      return {
        __itemEls: [],
        __activeEl: null,
        __isOpen: false,
        __open(activationStrategy) {
          this.__isOpen = true;
          let nextTick = (callback) => requestAnimationFrame(() => requestAnimationFrame(callback));
          nextTick(() => {
            this.$refs.__items.focus({ preventScroll: true });
            activationStrategy && activationStrategy(Alpine2, this.$refs.__items, (el2) => el2.__activate());
          });
        },
        __close(focusAfter = true) {
          this.__isOpen = false;
          focusAfter && this.$nextTick(() => this.$refs.__button.focus({ preventScroll: true }));
        },
        __contains(outer, inner) {
          return !!Alpine2.findClosest(inner, (el2) => el2.isSameNode(outer));
        }
      };
    },
    "@focusin.window"() {
      if (!this.$data.__contains(this.$el, document.activeElement)) {
        this.$data.__close(false);
      }
    }
  });
}
function handleButton5(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "__button",
    "aria-haspopup": "true",
    ":aria-labelledby"() {
      return this.$id("alpine-menu-label");
    },
    ":id"() {
      return this.$id("alpine-menu-button");
    },
    ":aria-expanded"() {
      return this.$data.__isOpen;
    },
    ":aria-controls"() {
      return this.$data.__isOpen && this.$id("alpine-menu-items");
    },
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
    },
    "@click"() {
      this.$data.__open();
    },
    "@keydown.down.stop.prevent"() {
      this.$data.__open();
    },
    "@keydown.up.stop.prevent"() {
      this.$data.__open(dom.last);
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__open();
    },
    "@keydown.enter.stop.prevent"() {
      this.$data.__open();
    }
  });
}
function handleItems(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "__items",
    "aria-orientation": "vertical",
    "role": "menu",
    ":id"() {
      return this.$id("alpine-menu-items");
    },
    ":aria-labelledby"() {
      return this.$id("alpine-menu-button");
    },
    ":aria-activedescendant"() {
      return this.$data.__activeEl && this.$data.__activeEl.id;
    },
    "x-show"() {
      return this.$data.__isOpen;
    },
    "tabindex": "0",
    "@click.outside"() {
      this.$data.__close();
    },
    "@keydown"(e) {
      dom.search(Alpine2, this.$refs.__items, e.key, (el2) => el2.__activate());
    },
    "@keydown.down.stop.prevent"() {
      if (this.$data.__activeEl)
        dom.next(Alpine2, this.$data.__activeEl, (el2) => el2.__activate());
      else
        dom.first(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.up.stop.prevent"() {
      if (this.$data.__activeEl)
        dom.previous(Alpine2, this.$data.__activeEl, (el2) => el2.__activate());
      else
        dom.last(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.home.stop.prevent"() {
      dom.first(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.end.stop.prevent"() {
      dom.last(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.page-up.stop.prevent"() {
      dom.first(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.page-down.stop.prevent"() {
      dom.last(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.escape.stop.prevent"() {
      this.$data.__close();
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__activeEl && this.$data.__activeEl.click();
    },
    "@keydown.enter.stop.prevent"() {
      this.$data.__activeEl && this.$data.__activeEl.click();
    },
    // Required for firefox, event.preventDefault() in handleKeyDown for
    // the Space key doesn't cancel the handleKeyUp, which in turn
    // triggers a *click*.
    "@keyup.space.prevent"() {
    }
  });
}
function handleItem(el, Alpine2) {
  Alpine2.bind(el, () => {
    return {
      "x-data"() {
        return {
          __itemEl: this.$el,
          init() {
            let els = Alpine2.raw(this.$data.__itemEls);
            let inserted = false;
            for (let i = 0; i < els.length; i++) {
              if (els[i].compareDocumentPosition(this.$el) & Node.DOCUMENT_POSITION_PRECEDING) {
                els.splice(i, 0, this.$el);
                inserted = true;
                break;
              }
            }
            if (!inserted)
              els.push(this.$el);
            this.$el.__activate = () => {
              this.$data.__activeEl = this.$el;
              this.$el.scrollIntoView({ block: "nearest" });
            };
            this.$el.__deactivate = () => {
              this.$data.__activeEl = null;
            };
            this.$el.__isDisabled = Alpine2.reactive({ value: false });
            queueMicrotask(() => {
              this.$el.__isDisabled.value = Alpine2.bound(this.$el, "disabled", false);
            });
          },
          destroy() {
            let els = this.$data.__itemEls;
            els.splice(els.indexOf(this.$el), 1);
          }
        };
      },
      "x-id"() {
        return ["alpine-menu-item"];
      },
      ":id"() {
        return this.$id("alpine-menu-item");
      },
      ":tabindex"() {
        return this.__itemEl.__isDisabled.value ? false : "-1";
      },
      "role": "menuitem",
      "@mousemove"() {
        this.__itemEl.__isDisabled.value || this.$menuItem.isActive || this.__itemEl.__activate();
      },
      "@mouseleave"() {
        this.__itemEl.__isDisabled.value || !this.$menuItem.isActive || this.__itemEl.__deactivate();
      }
    };
  });
}
var dom = {
  first(Alpine2, parent, receive = (i) => i, fallback = () => {
  }) {
    let first = Alpine2.$data(parent).__itemEls[0];
    if (!first)
      return fallback();
    if (first.tagName.toLowerCase() === "template") {
      return this.next(Alpine2, first, receive);
    }
    if (first.__isDisabled.value)
      return this.next(Alpine2, first, receive);
    return receive(first);
  },
  last(Alpine2, parent, receive = (i) => i, fallback = () => {
  }) {
    let last = Alpine2.$data(parent).__itemEls.slice(-1)[0];
    if (!last)
      return fallback();
    if (last.__isDisabled.value)
      return this.previous(Alpine2, last, receive);
    return receive(last);
  },
  next(Alpine2, el, receive = (i) => i, fallback = () => {
  }) {
    if (!el)
      return fallback();
    let els = Alpine2.$data(el).__itemEls;
    let next = els[els.indexOf(el) + 1];
    if (!next)
      return fallback();
    if (next.__isDisabled.value || next.tagName.toLowerCase() === "template")
      return this.next(Alpine2, next, receive, fallback);
    return receive(next);
  },
  previous(Alpine2, el, receive = (i) => i, fallback = () => {
  }) {
    if (!el)
      return fallback();
    let els = Alpine2.$data(el).__itemEls;
    let prev = els[els.indexOf(el) - 1];
    if (!prev)
      return fallback();
    if (prev.__isDisabled.value || prev.tagName.toLowerCase() === "template")
      return this.previous(Alpine2, prev, receive, fallback);
    return receive(prev);
  },
  searchQuery: "",
  debouncedClearSearch: void 0,
  clearSearch(Alpine2) {
    if (!this.debouncedClearSearch) {
      this.debouncedClearSearch = Alpine2.debounce(function() {
        this.searchQuery = "";
      }, 350);
    }
    this.debouncedClearSearch();
  },
  search(Alpine2, parent, key, receiver) {
    if (key.length > 1)
      return;
    this.searchQuery += key;
    let els = Alpine2.raw(Alpine2.$data(parent).__itemEls);
    let el = els.find((el2) => {
      return el2.textContent.trim().toLowerCase().startsWith(this.searchQuery);
    });
    el && !el.__isDisabled.value && receiver(el);
    this.clearSearch(Alpine2);
  }
};

// packages/ui/src/switch.js
function switch_default(Alpine2) {
  Alpine2.directive("switch", (el, directive) => {
    if (directive.value === "group")
      handleGroup2(el, Alpine2);
    else if (directive.value === "label")
      handleLabel3(el, Alpine2);
    else if (directive.value === "description")
      handleDescription2(el, Alpine2);
    else
      handleRoot7(el, Alpine2);
  }).before("bind");
  Alpine2.magic("switch", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isChecked() {
        return $data.__value === true;
      }
    };
  });
}
function handleGroup2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-id"() {
      return ["alpine-switch-label", "alpine-switch-description"];
    },
    "x-data"() {
      return {
        __hasLabel: false,
        __hasDescription: false,
        __switchEl: void 0
      };
    }
  });
}
function handleRoot7(el, Alpine2) {
  Alpine2.bind(el, {
    "x-modelable": "__value",
    "x-data"() {
      return {
        init() {
          queueMicrotask(() => {
            this.__value = Alpine2.bound(this.$el, "default-checked", false);
            this.__inputName = Alpine2.bound(this.$el, "name", false);
            this.__inputValue = Alpine2.bound(this.$el, "value", "on");
            this.__inputId = "alpine-switch-" + Date.now();
          });
        },
        __value: void 0,
        __inputName: void 0,
        __inputValue: void 0,
        __inputId: void 0,
        __toggle() {
          this.__value = !this.__value;
        }
      };
    },
    "x-effect"() {
      let value = this.__value;
      if (!this.__inputName)
        return;
      let nextEl = this.$el.nextElementSibling;
      if (nextEl && String(nextEl.id) === String(this.__inputId)) {
        nextEl.remove();
      }
      if (value) {
        let input = document.createElement("input");
        input.type = "hidden";
        input.value = this.__inputValue;
        input.name = this.__inputName;
        input.id = this.__inputId;
        this.$el.after(input);
      }
    },
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
      this.$data.__switchEl = this.$el;
    },
    "role": "switch",
    "tabindex": "0",
    ":aria-checked"() {
      return !!this.__value;
    },
    ":aria-labelledby"() {
      return this.$data.__hasLabel && this.$id("alpine-switch-label");
    },
    ":aria-describedby"() {
      return this.$data.__hasDescription && this.$id("alpine-switch-description");
    },
    "@click.prevent"() {
      this.__toggle();
    },
    "@keyup"(e) {
      if (e.key !== "Tab")
        e.preventDefault();
      if (e.key === " ")
        this.__toggle();
    },
    // This is needed so that we can "cancel" the click event when we use the `Enter` key on a button.
    "@keypress.prevent"() {
    }
  });
}
function handleLabel3(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__hasLabel = true;
    },
    ":id"() {
      return this.$id("alpine-switch-label");
    },
    "@click"() {
      this.$data.__switchEl.click();
      this.$data.__switchEl.focus({ preventScroll: true });
    }
  });
}
function handleDescription2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__hasDescription = true;
    },
    ":id"() {
      return this.$id("alpine-switch-description");
    }
  });
}

// packages/ui/src/radio.js
function radio_default(Alpine2) {
  Alpine2.directive("radio", (el, directive) => {
    if (!directive.value)
      handleRoot8(el, Alpine2);
    else if (directive.value === "option")
      handleOption3(el, Alpine2);
    else if (directive.value === "label")
      handleLabel4(el, Alpine2);
    else if (directive.value === "description")
      handleDescription3(el, Alpine2);
  }).before("bind");
  Alpine2.magic("radioOption", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isActive() {
        return $data.__option === $data.__active;
      },
      get isChecked() {
        return $data.__option === $data.__value;
      },
      get isDisabled() {
        let disabled = $data.__disabled;
        if ($data.__rootDisabled)
          return true;
        return disabled;
      }
    };
  });
}
function handleRoot8(el, Alpine2) {
  Alpine2.bind(el, {
    "x-modelable": "__value",
    "x-data"() {
      return {
        init() {
          queueMicrotask(() => {
            this.__rootDisabled = Alpine2.bound(el, "disabled", false);
            this.__value = Alpine2.bound(this.$el, "default-value", false);
            this.__inputName = Alpine2.bound(this.$el, "name", false);
            this.__inputId = "alpine-radio-" + Date.now();
          });
          this.$nextTick(() => {
            let walker = document.createTreeWalker(
              this.$el,
              NodeFilter.SHOW_ELEMENT,
              {
                acceptNode: (node) => {
                  if (node.getAttribute("role") === "radio")
                    return NodeFilter.FILTER_REJECT;
                  if (node.hasAttribute("role"))
                    return NodeFilter.FILTER_SKIP;
                  return NodeFilter.FILTER_ACCEPT;
                }
              },
              false
            );
            while (walker.nextNode())
              walker.currentNode.setAttribute("role", "none");
          });
        },
        __value: void 0,
        __active: void 0,
        __rootEl: this.$el,
        __optionValues: [],
        __disabledOptions: /* @__PURE__ */ new Set(),
        __optionElsByValue: /* @__PURE__ */ new Map(),
        __hasLabel: false,
        __hasDescription: false,
        __rootDisabled: false,
        __inputName: void 0,
        __inputId: void 0,
        __change(value) {
          if (this.__rootDisabled)
            return;
          this.__value = value;
        },
        __addOption(option, el2, disabled) {
          let options = Alpine2.raw(this.__optionValues);
          let els = options.map((i) => this.__optionElsByValue.get(i));
          let inserted = false;
          for (let i = 0; i < els.length; i++) {
            if (els[i].compareDocumentPosition(el2) & Node.DOCUMENT_POSITION_PRECEDING) {
              options.splice(i, 0, option);
              this.__optionElsByValue.set(option, el2);
              inserted = true;
              break;
            }
          }
          if (!inserted) {
            options.push(option);
            this.__optionElsByValue.set(option, el2);
          }
          disabled && this.__disabledOptions.add(option);
        },
        __isFirstOption(option) {
          return this.__optionValues.indexOf(option) === 0;
        },
        __setActive(option) {
          this.__active = option;
        },
        __focusOptionNext() {
          let option = this.__active;
          let all = this.__optionValues.filter((i) => !this.__disabledOptions.has(i));
          let next = all[this.__optionValues.indexOf(option) + 1];
          next = next || all[0];
          this.__optionElsByValue.get(next).focus();
          this.__change(next);
        },
        __focusOptionPrev() {
          let option = this.__active;
          let all = this.__optionValues.filter((i) => !this.__disabledOptions.has(i));
          let prev = all[all.indexOf(option) - 1];
          prev = prev || all.slice(-1)[0];
          this.__optionElsByValue.get(prev).focus();
          this.__change(prev);
        }
      };
    },
    "x-effect"() {
      let value = this.__value;
      if (!this.__inputName)
        return;
      let nextEl = this.$el.nextElementSibling;
      if (nextEl && String(nextEl.id) === String(this.__inputId)) {
        nextEl.remove();
      }
      if (value) {
        let input = document.createElement("input");
        input.type = "hidden";
        input.value = value;
        input.name = this.__inputName;
        input.id = this.__inputId;
        this.$el.after(input);
      }
    },
    "role": "radiogroup",
    "x-id"() {
      return ["alpine-radio-label", "alpine-radio-description"];
    },
    ":aria-labelledby"() {
      return this.__hasLabel && this.$id("alpine-radio-label");
    },
    ":aria-describedby"() {
      return this.__hasDescription && this.$id("alpine-radio-description");
    },
    "@keydown.up.prevent.stop"() {
      this.__focusOptionPrev();
    },
    "@keydown.left.prevent.stop"() {
      this.__focusOptionPrev();
    },
    "@keydown.down.prevent.stop"() {
      this.__focusOptionNext();
    },
    "@keydown.right.prevent.stop"() {
      this.__focusOptionNext();
    }
  });
}
function handleOption3(el, Alpine2) {
  Alpine2.bind(el, {
    "x-data"() {
      return {
        init() {
          queueMicrotask(() => {
            this.__disabled = Alpine2.bound(el, "disabled", false);
            this.__option = Alpine2.bound(el, "value");
            this.$data.__addOption(this.__option, this.$el, this.__disabled);
          });
        },
        __option: void 0,
        __disabled: false,
        __hasLabel: false,
        __hasDescription: false
      };
    },
    "x-id"() {
      return ["alpine-radio-label", "alpine-radio-description"];
    },
    "role": "radio",
    ":aria-checked"() {
      return this.$radioOption.isChecked;
    },
    ":aria-disabled"() {
      return this.$radioOption.isDisabled;
    },
    ":aria-labelledby"() {
      return this.__hasLabel && this.$id("alpine-radio-label");
    },
    ":aria-describedby"() {
      return this.__hasDescription && this.$id("alpine-radio-description");
    },
    ":tabindex"() {
      if (this.$radioOption.isDisabled)
        return -1;
      if (this.$radioOption.isChecked)
        return 0;
      if (!this.$data.__value && this.$data.__isFirstOption(this.$data.__option))
        return 0;
      return -1;
    },
    "@click"() {
      if (this.$radioOption.isDisabled)
        return;
      this.$data.__change(this.$data.__option);
      this.$el.focus();
    },
    "@focus"() {
      if (this.$radioOption.isDisabled)
        return;
      this.$data.__setActive(this.$data.__option);
    },
    "@blur"() {
      if (this.$data.__active === this.$data.__option)
        this.$data.__setActive(void 0);
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__change(this.$data.__option);
    }
  });
}
function handleLabel4(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__hasLabel = true;
    },
    ":id"() {
      return this.$id("alpine-radio-label");
    }
  });
}
function handleDescription3(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__hasDescription = true;
    },
    ":id"() {
      return this.$id("alpine-radio-description");
    }
  });
}

// packages/ui/src/tabs.js
function tabs_default(Alpine2) {
  Alpine2.directive("tabs", (el, directive) => {
    if (!directive.value)
      handleRoot9(el, Alpine2);
    else if (directive.value === "list")
      handleList(el, Alpine2);
    else if (directive.value === "tab")
      handleTab(el, Alpine2);
    else if (directive.value === "panels")
      handlePanels(el, Alpine2);
    else if (directive.value === "panel")
      handlePanel4(el, Alpine2);
  }).before("bind");
  Alpine2.magic("tab", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isSelected() {
        return $data.__selectedIndex === $data.__tabs.indexOf($data.__tabEl);
      },
      get isDisabled() {
        return $data.__isDisabled;
      }
    };
  });
  Alpine2.magic("panel", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isSelected() {
        return $data.__selectedIndex === $data.__panels.indexOf($data.__panelEl);
      }
    };
  });
}
function handleRoot9(el, Alpine2) {
  Alpine2.bind(el, {
    "x-modelable": "__selectedIndex",
    "x-data"() {
      return {
        init() {
          queueMicrotask(() => {
            let defaultIndex = this.__selectedIndex || Number(Alpine2.bound(this.$el, "default-index", 0));
            let tabs = this.__activeTabs();
            let clamp = (number, min, max) => Math.min(Math.max(number, min), max);
            this.__selectedIndex = clamp(defaultIndex, 0, tabs.length - 1);
            Alpine2.effect(() => {
              this.__manualActivation = Alpine2.bound(this.$el, "manual", false);
            });
          });
        },
        __tabs: [],
        __panels: [],
        __selectedIndex: null,
        __tabGroupEl: void 0,
        __manualActivation: false,
        __addTab(el2) {
          this.__tabs.push(el2);
        },
        __addPanel(el2) {
          this.__panels.push(el2);
        },
        __selectTab(el2) {
          this.__selectedIndex = this.__tabs.indexOf(el2);
        },
        __activeTabs() {
          return this.__tabs.filter((i) => !i.__disabled);
        }
      };
    }
  });
}
function handleList(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__tabGroupEl = this.$el;
    }
  });
}
function handleTab(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
    },
    "x-data"() {
      return {
        init() {
          this.__tabEl = this.$el;
          this.$data.__addTab(this.$el);
          this.__tabEl.__disabled = Alpine2.bound(this.$el, "disabled", false);
          this.__isDisabled = this.__tabEl.__disabled;
        },
        __tabEl: void 0,
        __isDisabled: false
      };
    },
    "@click"() {
      if (this.$el.__disabled)
        return;
      this.$data.__selectTab(this.$el);
      this.$el.focus();
    },
    "@keydown.enter.prevent.stop"() {
      this.__selectTab(this.$el);
    },
    "@keydown.space.prevent.stop"() {
      this.__selectTab(this.$el);
    },
    "@keydown.home.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).first();
    },
    "@keydown.page-up.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).first();
    },
    "@keydown.end.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).last();
    },
    "@keydown.page-down.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).last();
    },
    "@keydown.down.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().next();
    },
    "@keydown.right.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().next();
    },
    "@keydown.up.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().prev();
    },
    "@keydown.left.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().prev();
    },
    ":tabindex"() {
      return this.$tab.isSelected ? 0 : -1;
    },
    "@focus"() {
      if (this.$data.__manualActivation) {
        this.$el.focus();
      } else {
        if (this.$el.__disabled)
          return;
        this.$data.__selectTab(this.$el);
        this.$el.focus();
      }
    }
  });
}
function handlePanels(el, Alpine2) {
  Alpine2.bind(el, {
    //
  });
}
function handlePanel4(el, Alpine2) {
  Alpine2.bind(el, {
    ":tabindex"() {
      return this.$panel.isSelected ? 0 : -1;
    },
    "x-data"() {
      return {
        init() {
          this.__panelEl = this.$el;
          this.$data.__addPanel(this.$el);
        },
        __panelEl: void 0
      };
    },
    "x-show"() {
      return this.$panel.isSelected;
    }
  });
}

// packages/ui/src/index.js
function src_default(Alpine2) {
  combobox_default(Alpine2);
  dialog_default(Alpine2);
  disclosure_default(Alpine2);
  listbox_default(Alpine2);
  menu_default(Alpine2);
  switch_default(Alpine2);
  popover_default(Alpine2);
  radio_default(Alpine2);
  tabs_default(Alpine2);
}

// packages/ui/builds/module.js
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ui
});
