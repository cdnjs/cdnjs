// TypeIt by Alex MacArthur - https://typeitjs.com
var isArray = (thing) => Array.isArray(thing);
var asArray = (value) => {
  return isArray(value) ? value : [value];
};
const Queue = function(initialItems) {
  const add = function(steps) {
    _queue = _queue.concat(asArray(steps));
    return this;
  };
  const set = function(index, item) {
    _queue[index] = item;
  };
  const reset = function() {
    _queue = _queue.map((item) => {
      delete item.done;
      return item;
    });
  };
  const getItems = () => _queue.filter((i) => !i.done);
  const markDone = (index) => {
    _queue[index].done = true;
  };
  let _queue = [];
  add(initialItems);
  return {
    add,
    set,
    reset,
    getItems,
    markDone
  };
};
var toArray = (val) => {
  return Array.from(val);
};
var createTextNode = (content) => {
  return document.createTextNode(content);
};
const expandTextNodes = (element) => {
  [...element.childNodes].forEach((child) => {
    if (child.nodeValue) {
      [...child.nodeValue].forEach((c) => {
        child.parentNode.insertBefore(createTextNode(c), child);
      });
      child.remove();
      return;
    }
    expandTextNodes(child);
  });
  return element;
};
var getParsedBody = (content) => {
  let doc = document.implementation.createHTMLDocument();
  doc.body.innerHTML = content;
  return expandTextNodes(doc.body);
};
const DATA_ATTRIBUTE = "data-typeit-id";
const CURSOR_CLASS = "ti-cursor";
const START = "START";
const END = "END";
const DEFAULT_STATUSES = {
  started: false,
  completed: false,
  frozen: false,
  destroyed: false
};
const DEFAULT_OPTIONS = {
  breakLines: true,
  cursor: true,
  cursorChar: "|",
  cursorSpeed: 1e3,
  deleteSpeed: null,
  html: true,
  lifeLike: true,
  loop: false,
  loopDelay: 750,
  nextStringDelay: 750,
  speed: 100,
  startDelay: 250,
  startDelete: false,
  strings: [],
  waitUntilVisible: false,
  beforeString: () => {
  },
  afterString: () => {
  },
  beforeStep: () => {
  },
  afterStep: () => {
  },
  afterComplete: () => {
  }
};
function walkElementNodes(element, shouldReverse = false) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_ALL, {
    acceptNode: (node) => {
      var _a;
      return ((_a = node == null ? void 0 : node.classList) == null ? void 0 : _a.contains(CURSOR_CLASS)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  let nextNode;
  let nodes = [];
  while (nextNode = walker.nextNode()) {
    nextNode.originalParent = nextNode.parentNode;
    nodes.push(nextNode);
  }
  return shouldReverse ? nodes.reverse() : nodes;
}
function chunkStringAsHtml(string) {
  return walkElementNodes(getParsedBody(string));
}
function maybeChunkStringAsHtml(str, asHtml = true) {
  return asHtml ? chunkStringAsHtml(str) : toArray(str).map(createTextNode);
}
var createElement = (el) => {
  return document.createElement(el);
};
var appendStyleBlock = (styles, id = "") => {
  let styleBlock = createElement("style");
  styleBlock.id = id;
  styleBlock.appendChild(createTextNode(styles));
  document.head.appendChild(styleBlock);
};
const isNumber = (value) => {
  return Number.isInteger(value);
};
const select = (selector, element = document, all = false) => {
  return element[`querySelector${all ? "All" : ""}`](selector);
};
var isInput = (el) => {
  return "value" in el;
};
const getAllChars = (element) => {
  if (isInput(element)) {
    return toArray(element.value);
  }
  return walkElementNodes(element, true).filter((c) => !(c.childNodes.length > 0));
};
const calculateStepsToSelector = (selector, element, to = START) => {
  let isMovingToLast = new RegExp(END, "i").test(to);
  let selectedElement = selector ? select(selector, element) : element;
  let selectedElementNodes = walkElementNodes(selectedElement, true);
  let selectedElementFirstChild = selectedElementNodes[0];
  let selectedElementLastChild = selectedElementNodes[selectedElementNodes.length - 1];
  let isMovingToEndOfRootElement = isMovingToLast && !selector;
  let childIndex = isMovingToEndOfRootElement ? 0 : getAllChars(element).findIndex((character) => {
    return character.isSameNode(isMovingToLast ? selectedElementFirstChild : selectedElementLastChild);
  });
  if (isMovingToLast)
    childIndex--;
  return childIndex + 1;
};
var calculateCursorSteps = ({
  el,
  move,
  cursorPos,
  to
}) => {
  if (isNumber(move)) {
    return move * -1;
  }
  let childIndex = calculateStepsToSelector(move, el, to);
  return childIndex - cursorPos;
};
var calculateDelay = (delayArg) => {
  if (!isArray(delayArg)) {
    delayArg = [delayArg / 2, delayArg / 2];
  }
  return delayArg;
};
var randomInRange = (value, range2) => {
  return Math.abs(Math.random() * (value + range2 - (value - range2)) + (value - range2));
};
let range = (val) => val / 2;
function calculatePace(options) {
  let { speed, deleteSpeed, lifeLike } = options;
  deleteSpeed = deleteSpeed !== null ? deleteSpeed : speed / 3;
  return lifeLike ? [
    randomInRange(speed, range(speed)),
    randomInRange(deleteSpeed, range(deleteSpeed))
  ] : [speed, deleteSpeed];
}
var destroyTimeouts = (timeouts) => {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  return [];
};
var generateHash = () => {
  return Math.random().toString().substring(2, 9);
};
var fireWhenVisible = (element, func) => {
  let observer = new IntersectionObserver((entries, observer2) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        func();
        observer2.unobserve(element);
      }
    });
  }, { threshold: 1 });
  observer.observe(element);
};
const handleFunctionalArg = (arg) => {
  return typeof arg === "function" ? arg() : arg;
};
const isBodyElement = (node) => (node == null ? void 0 : node.tagName) === "BODY";
const insertIntoElement = (originalTarget, character) => {
  if (isInput(originalTarget)) {
    originalTarget.value = `${originalTarget.value}${character.textContent}`;
    return;
  }
  character.innerHTML = "";
  let target = isBodyElement(character.originalParent) ? originalTarget : character.originalParent || originalTarget;
  target.insertBefore(character, select("." + CURSOR_CLASS, target) || null);
};
const updateCursorPosition = (steps, cursorPosition, printedCharacters) => {
  return Math.min(Math.max(cursorPosition + steps, 0), printedCharacters.length);
};
var merge = (originalObj, newObj) => {
  return Object.assign({}, originalObj, newObj);
};
var removeNode = (node) => {
  if (!node)
    return;
  const nodeParent = node.parentNode;
  const nodeToRemove = nodeParent.childNodes.length > 1 ? node : nodeParent;
  nodeToRemove.remove();
};
var repositionCursor = (element, allChars, newCursorPosition) => {
  let nodeToInsertBefore = allChars[newCursorPosition - 1];
  let cursor = select(`.${CURSOR_CLASS}`, element);
  element = (nodeToInsertBefore == null ? void 0 : nodeToInsertBefore.parentNode) || element;
  element.insertBefore(cursor, nodeToInsertBefore || null);
};
function selectorToElement(thing) {
  return typeof thing === "string" ? select(thing) : thing;
}
const isNonVoidElement = (el) => /<(.+)>(.*?)<\/(.+)>/.test(el.outerHTML);
const wait = async (callback, delay, timeouts) => {
  return new Promise((resolve) => {
    const cb = async () => {
      await callback();
      resolve();
    };
    timeouts.push(setTimeout(cb, delay));
  });
};
const cursorFontStyles = {
  "font-family": "",
  "font-weight": "",
  "font-size": "",
  "font-style": "",
  "line-height": "",
  color: "",
  "margin-left": "-.125em",
  "margin-right": ".125em"
};
const setCursorStyles = (id, options, element) => {
  let rootSelector = `[${DATA_ATTRIBUTE}='${id}']`;
  let cursorSelector = `${rootSelector} .${CURSOR_CLASS}`;
  let computedStyles = getComputedStyle(element);
  let customProperties = Object.entries(cursorFontStyles).reduce((accumulator, [item, value]) => {
    return `${accumulator} ${item}: var(--ti-cursor-${item}, ${value || computedStyles[item]});`;
  }, "");
  appendStyleBlock(`@keyframes blink-${id} { 0% {opacity: 0} 49% {opacity: 0} 50% {opacity: 1} } ${cursorSelector} { display: inline; letter-spacing: -1em; ${customProperties} animation: blink-${id} ${options.cursorSpeed / 1e3}s infinite; } ${cursorSelector}.with-delay { animation-delay: 500ms; } ${cursorSelector}.disabled { animation: none; }`, id);
};
function TypeIt(element, options = {}) {
  const _wait = async (callback, delay, silent = false) => {
    if (_statuses.frozen) {
      await new Promise((resolve) => {
        this.unfreeze = () => {
          _statuses.frozen = false;
          resolve();
        };
      });
    }
    silent || await _opts.beforeStep(this);
    await wait(callback, delay, _timeouts);
    silent || await _opts.afterStep(this);
  };
  const _elementIsInput = () => isInput(_element);
  const _getPace = (index) => calculatePace(_opts)[index];
  const _getAllChars = () => getAllChars(_element);
  const _getActionPace = (instant, paceIndex = 0) => {
    return instant ? _getPace(paceIndex) : 0;
  };
  const _maybeAppendPause = (opts = {}) => {
    let delay = opts["delay"];
    delay && _queue.add(() => _pause(delay));
  };
  const _queueAndReturn = (steps, opts) => {
    _queue.add(steps);
    _maybeAppendPause(opts);
    return this;
  };
  const _generateTemporaryOptionQueueItems = (newOptions = {}) => {
    return [
      () => _options(newOptions),
      () => _options(_opts)
    ];
  };
  const _addSplitPause = (items) => {
    let delay = _opts.nextStringDelay;
    _queue.add([
      () => _pause(delay[0]),
      ...items,
      () => _pause(delay[1])
    ]);
  };
  const _setUpCursor = () => {
    if (_elementIsInput()) {
      return;
    }
    let cursor = createElement("span");
    cursor.className = CURSOR_CLASS;
    if (!_shouldRenderCursor) {
      cursor.style.visibility = "hidden";
      return cursor;
    }
    cursor.innerHTML = getParsedBody(_opts.cursorChar).innerHTML;
    return cursor;
  };
  const _attachCursor = async () => {
    !_elementIsInput() && _element.appendChild(_cursor);
    _shouldRenderCursor && setCursorStyles(_id, _opts, _element);
  };
  const _disableCursorBlink = (shouldDisable) => {
    if (_shouldRenderCursor) {
      _cursor.classList.toggle("disabled", shouldDisable);
      _cursor.classList.toggle("with-delay", !shouldDisable);
    }
  };
  const _generateQueue = () => {
    let strings = _opts.strings.filter((string) => !!string);
    strings.forEach((string, index) => {
      let chars = maybeChunkStringAsHtml(string, _opts.html);
      _queue.add(() => _type({ chars }));
      if (index + 1 === strings.length) {
        return;
      }
      const splitPauseArgs = [
        _opts.breakLines ? () => _type({
          chars: [createElement("BR")],
          silent: true
        }) : () => _delete({ num: chars.length })
      ];
      _addSplitPause(splitPauseArgs);
    });
  };
  const _prepLoop = async (delay) => {
    _cursorPosition && await _move({ value: _cursorPosition });
    _queue.reset();
    _queue.set(0, () => _pause(delay));
    await _delete({ num: null });
  };
  const _maybePrependHardcodedStrings = (strings) => {
    let existingMarkup = _element.innerHTML;
    if (!existingMarkup) {
      return strings;
    }
    _element.innerHTML = "";
    if (_opts.startDelete) {
      _element.innerHTML = existingMarkup;
      expandTextNodes(_element);
      _addSplitPause([
        () => _delete({ num: null })
      ]);
      return strings;
    }
    let hardCodedStrings = existingMarkup.trim().split(/<br(?:\s*?)(?:\/)?>/);
    return hardCodedStrings.concat(strings);
  };
  const _fire = async () => {
    _statuses.started = true;
    let queueItems = _queue.getItems();
    try {
      for (let i = 0; i < queueItems.length; i++) {
        await queueItems[i]();
        _queue.markDone(i);
        _disableCursorBlink(false);
      }
      _statuses.completed = true;
      await _opts.afterComplete(this);
      if (!_opts.loop) {
        throw "";
      }
      let delay = _opts.loopDelay;
      _wait(async () => {
        await _prepLoop(delay[0]);
        _fire();
      }, delay[1]);
    } catch (e) {
    }
    return this;
  };
  const _pause = (time = 0) => {
    return _wait(() => {
    }, time);
  };
  const _move = async ({
    value,
    to = START,
    instant = false
  }) => {
    _disableCursorBlink(true);
    let numberOfSteps = calculateCursorSteps({
      el: _element,
      move: value,
      cursorPos: _cursorPosition,
      to
    });
    let moveCursor = () => {
      _cursorPosition = updateCursorPosition(numberOfSteps < 0 ? -1 : 1, _cursorPosition, _getAllChars());
      repositionCursor(_element, _getAllChars(), _cursorPosition);
    };
    await _wait(async () => {
      for (let i = 0; i < Math.abs(numberOfSteps); i++) {
        instant ? moveCursor() : await _wait(moveCursor, _getPace(0));
      }
    }, _getActionPace(instant));
  };
  const _type = ({
    chars,
    silent = false,
    instant = false
  }) => {
    _disableCursorBlink(true);
    return _wait(async () => {
      const insert = (character) => insertIntoElement(_element, character);
      silent || await _opts.beforeString(chars, this);
      for (let char of chars) {
        instant || isNonVoidElement(char) ? insert(char) : await _wait(() => insert(char), _getPace(0));
      }
      silent || await _opts.afterString(chars, this);
    }, _getActionPace(instant), true);
  };
  const _options = async (opts) => {
    _opts = merge(_opts, opts);
    return;
  };
  const _empty = async () => {
    if (_elementIsInput()) {
      _element.value = "";
      return;
    }
    _getAllChars().forEach((n) => {
      removeNode(n);
    });
    return;
  };
  const _delete = async ({
    num = null,
    instant = false,
    to = START
  }) => {
    _disableCursorBlink(true);
    await _wait(async () => {
      let rounds = isNumber(num) || _elementIsInput() ? num : calculateCursorSteps({
        el: _element,
        move: num,
        cursorPos: _cursorPosition,
        to
      });
      const deleteIt = () => {
        let allChars = _getAllChars();
        if (!allChars.length)
          return;
        if (_elementIsInput()) {
          _element.value = _element.value.slice(0, -1);
        } else {
          removeNode(allChars[_cursorPosition]);
        }
      };
      for (let i = 0; i < rounds; i++) {
        instant ? deleteIt() : await _wait(deleteIt, _getPace(1));
      }
    }, _getActionPace(instant, 1));
    if (num === null && _getAllChars().length - 1 > 0) {
      await _delete({ num: null });
    }
  };
  this.break = function(actionOpts) {
    return _queueAndReturn(() => _type({ chars: [createElement("BR")], silent: true }), actionOpts);
  };
  this.delete = function(numCharacters = null, actionOpts = {}) {
    numCharacters = handleFunctionalArg(numCharacters);
    let bookEndQueueItems = _generateTemporaryOptionQueueItems(actionOpts);
    let num = numCharacters;
    let { instant, to } = actionOpts;
    return _queueAndReturn([
      bookEndQueueItems[0],
      () => _delete({ num, instant, to }),
      bookEndQueueItems[1]
    ], actionOpts);
  };
  this.empty = function(actionOpts = {}) {
    return _queueAndReturn(_empty, actionOpts);
  };
  this.exec = function(func, actionOpts) {
    let bookEndQueueItems = _generateTemporaryOptionQueueItems(actionOpts);
    return _queueAndReturn([bookEndQueueItems[0], func, bookEndQueueItems[1]], actionOpts);
  };
  this.move = function(movementArg, actionOpts = {}) {
    movementArg = handleFunctionalArg(movementArg);
    let bookEndQueueItems = _generateTemporaryOptionQueueItems(actionOpts);
    let { instant, to } = actionOpts;
    let moveArgs = {
      value: movementArg === null ? "" : movementArg,
      to,
      instant
    };
    return _queueAndReturn([
      bookEndQueueItems[0],
      () => _move(moveArgs),
      bookEndQueueItems[1]
    ], actionOpts);
  };
  this.options = function(opts) {
    opts = handleFunctionalArg(opts);
    return _queueAndReturn(() => _options(opts), opts);
  };
  this.pause = function(milliseconds, actionOpts = {}) {
    return _queueAndReturn(() => _pause(handleFunctionalArg(milliseconds)), actionOpts);
  };
  this.type = function(string, actionOpts = {}) {
    string = handleFunctionalArg(string);
    let bookEndQueueItems = _generateTemporaryOptionQueueItems(actionOpts);
    let chars = maybeChunkStringAsHtml(string, _opts.html);
    let { instant } = actionOpts;
    let itemsToQueue = [
      bookEndQueueItems[0],
      () => _type({ chars, instant }),
      bookEndQueueItems[1]
    ];
    return _queueAndReturn(itemsToQueue, actionOpts);
  };
  this.is = function(key) {
    return _statuses[key];
  };
  this.destroy = function(shouldRemoveCursor = true) {
    _timeouts = destroyTimeouts(_timeouts);
    handleFunctionalArg(shouldRemoveCursor) && removeNode(_cursor);
    _statuses.destroyed = true;
  };
  this.freeze = function() {
    _statuses.frozen = true;
  };
  this.unfreeze = function() {
  };
  this.reset = function() {
    !this.is("destroyed") && this.destroy();
    _queue.reset();
    _cursorPosition = 0;
    for (let property in _statuses) {
      _statuses[property] = false;
    }
    _element[_elementIsInput() ? "value" : "innerHTML"] = "";
    return this;
  };
  this.go = function() {
    if (_statuses.started) {
      return this;
    }
    _attachCursor();
    if (!_opts.waitUntilVisible) {
      _fire();
      return this;
    }
    fireWhenVisible(_element, _fire.bind(this));
    return this;
  };
  this.getQueue = () => _queue;
  this.getOptions = () => _opts;
  this.updateOptions = (options2) => _options(options2);
  this.getElement = () => _element;
  let _element = selectorToElement(element);
  let _timeouts = [];
  let _cursorPosition = 0;
  let _statuses = merge({}, DEFAULT_STATUSES);
  let _opts = merge(DEFAULT_OPTIONS, options);
  _opts = merge(_opts, {
    html: !_elementIsInput() && _opts.html,
    nextStringDelay: calculateDelay(_opts.nextStringDelay),
    loopDelay: calculateDelay(_opts.loopDelay)
  });
  let _id = generateHash();
  let _queue = Queue([() => _pause(_opts.startDelay)]);
  _element.dataset.typeitId = _id;
  appendStyleBlock(`[${DATA_ATTRIBUTE}]:before {content: '.'; display: inline-block; width: 0; visibility: hidden;}`);
  let _shouldRenderCursor = _opts.cursor && !_elementIsInput();
  let _cursor = _setUpCursor();
  _opts.strings = _maybePrependHardcodedStrings(asArray(_opts.strings));
  if (_opts.strings.length) {
    _generateQueue();
  }
}
export { TypeIt as default };
