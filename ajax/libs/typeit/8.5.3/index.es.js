// TypeIt by Alex MacArthur - https://typeitjs.com
var isArray = (thing) => Array.isArray(thing);

var asArray = (value) => {
  return isArray(value) ? value : [value];
};

let Queue = function(initialItems) {
  let add = function(steps) {
    asArray(steps).forEach((step) => _q.set(Symbol(step.char?.innerText), { ...step }));
    return this;
  };
  let getTypeable = () => rawValues().filter((value) => value.typeable);
  let set = function(index, item) {
    let keys = _q.keys();
    _q.set(keys[index], item);
  };
  let reset = function() {
    _q.forEach((item) => delete item.done);
  };
  let wipe = function() {
    _q = /* @__PURE__ */ new Map();
    add(initialItems);
  };
  let getQueue = () => _q;
  let rawValues = () => Array.from(_q.values());
  let destroy = (key) => _q.delete(key);
  let getItems = (all = false) => all ? rawValues() : rawValues().filter((i) => !i.done);
  let done = (key, shouldDestroy = false) => shouldDestroy ? _q.delete(key) : _q.get(key).done = true;
  let _q = /* @__PURE__ */ new Map();
  add(initialItems);
  return {
    add,
    set,
    wipe,
    reset,
    destroy,
    done,
    getItems,
    getQueue,
    getTypeable
  };
};

var toArray = (val) => Array.from(val);

var createTextNode = (content) => document.createTextNode(content);

let expandTextNodes = (element) => {
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
const PLACEHOLDER_CSS = `[${DATA_ATTRIBUTE}]:before {content: '.'; display: inline-block; width: 0; visibility: hidden;}`;

function walkElementNodes(element, shouldReverse = false) {
  let walker = document.createTreeWalker(element, NodeFilter.SHOW_ALL, {
    acceptNode: (node) => {
      return node.classList?.contains(CURSOR_CLASS) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
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

var createElement = (el) => document.createElement(el);

var appendStyleBlock = (styles, id = "") => {
  let styleBlock = createElement("style");
  styleBlock.id = id;
  styleBlock.appendChild(createTextNode(styles));
  document.head.appendChild(styleBlock);
};

var calculateDelay = (delayArg) => {
  if (!isArray(delayArg)) {
    delayArg = [delayArg / 2, delayArg / 2];
  }
  return delayArg;
};

var randomInRange = (value, range) => {
  return Math.abs(Math.random() * (value + range - (value - range)) + (value - range));
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
  timeouts.forEach(clearTimeout);
  return [];
};

var generateHash = () => Math.random().toString().substring(2, 9);

var isInput = (el) => "value" in el;

let getAllChars = (element) => {
  if (isInput(element)) {
    return toArray(element.value);
  }
  return walkElementNodes(element, true).filter((c) => !(c.childNodes.length > 0));
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

let handleFunctionalArg = (arg) => {
  return typeof arg === "function" ? arg() : arg;
};

var isNumber = (value) => Number.isInteger(value);

let select = (selector, element = document, all = false) => {
  return element[`querySelector${all ? "All" : ""}`](selector);
};

let isBodyElement = (node) => node?.tagName === "BODY";
let insertIntoElement = (originalTarget, character) => {
  if (isInput(originalTarget)) {
    originalTarget.value = `${originalTarget.value}${character.textContent}`;
    return;
  }
  character.innerHTML = "";
  let target = isBodyElement(character.originalParent) ? originalTarget : character.originalParent || originalTarget;
  target.insertBefore(character, select("." + CURSOR_CLASS, target) || null);
};

let updateCursorPosition = (steps, cursorPosition, printedCharacters) => {
  return Math.min(Math.max(cursorPosition + steps, 0), printedCharacters.length);
};

var merge = (originalObj, newObj) => Object.assign({}, originalObj, newObj);

var removeNode = (node) => {
  if (!node)
    return;
  let nodeParent = node.parentNode;
  let nodeToRemove = nodeParent.childNodes.length > 1 ? node : nodeParent;
  nodeToRemove.remove();
};

var repositionCursor = (element, allChars, newCursorPosition) => {
  let nodeToInsertBefore = allChars[newCursorPosition - 1];
  let cursor = select(`.${CURSOR_CLASS}`, element);
  element = nodeToInsertBefore?.parentNode || element;
  element.insertBefore(cursor, nodeToInsertBefore || null);
};

function selectorToElement(thing) {
  return typeof thing === "string" ? select(thing) : thing;
}

var isNonVoidElement = (el) => /<(.+)>(.*?)<\/(.+)>/.test(el.outerHTML);

let wait = async (callback, delay, timeouts) => {
  return new Promise((resolve) => {
    let cb = async () => {
      await callback();
      resolve();
    };
    timeouts.push(setTimeout(cb, delay || 0));
  });
};

let cursorFontStyles = {
  "font-family": "",
  "font-weight": "",
  "font-size": "",
  "font-style": "",
  "line-height": "",
  color: "",
  "margin-left": "-.125em",
  "margin-right": ".125em"
};
let setCursorStyles = (id, options, element) => {
  let rootSelector = `[${DATA_ATTRIBUTE}='${id}']`;
  let cursorSelector = `${rootSelector} .${CURSOR_CLASS}`;
  let computedStyles = getComputedStyle(element);
  let customProperties = Object.entries(cursorFontStyles).reduce((accumulator, [item, value]) => {
    return `${accumulator} ${item}: var(--ti-cursor-${item}, ${value || computedStyles[item]});`;
  }, "");
  appendStyleBlock(`@keyframes blink-${id} { 0% {opacity: 0} 49% {opacity: 0} 50% {opacity: 1} } ${cursorSelector} { display: inline; letter-spacing: -1em; ${customProperties} animation: blink-${id} ${options.cursorSpeed / 1e3}s infinite; } ${cursorSelector}.with-delay { animation-delay: 500ms; } ${cursorSelector}.disabled { animation: none; }`, id);
};

var duplicate = (value, times) => new Array(times).fill(value);

const countStepsToSelector = ({
  queueItems,
  selector,
  cursorPosition,
  to
}) => {
  if (isNumber(selector)) {
    return selector * -1;
  }
  let isMovingToEnd = new RegExp(END, "i").test(to);
  let selectorIndex = selector ? [...queueItems].reverse().findIndex(({ char }) => {
    let parentElement = char.parentElement;
    let parentMatches = parentElement.matches(selector);
    if (isMovingToEnd && parentMatches) {
      return true;
    }
    return parentMatches && parentElement.firstChild.isSameNode(char);
  }) : -1;
  if (selectorIndex < 0) {
    selectorIndex = isMovingToEnd ? 0 : queueItems.length - 1;
  }
  let offset = isMovingToEnd ? 0 : 1;
  return selectorIndex - cursorPosition + offset;
};

let fireItem = async (queueItem, wait) => {
  let execute = async () => queueItem.func?.call(globalThis);
  if (queueItem.delay) {
    await wait(async () => {
      await execute();
    }, queueItem.delay);
  } else {
    await execute();
  }
};

const TypeIt = function(element, options = {}) {
  let _wait = async (callback, delay, silent = false) => {
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
  let _elementIsInput = () => isInput(_element);
  let _getPace = (index = 0) => calculatePace(_opts)[index];
  let _getAllChars = () => getAllChars(_element);
  let _maybeAppendPause = (opts = {}) => {
    let delay = opts.delay;
    delay && _queue.add({ delay });
  };
  let _queueAndReturn = (steps, opts) => {
    _queue.add(steps);
    _maybeAppendPause(opts);
    return this;
  };
  let _getDerivedCursorPosition = () => _predictedCursorPosition ?? _cursorPosition;
  let _generateTemporaryOptionQueueItems = (newOptions = {}) => {
    return [
      { func: () => _options(newOptions) },
      { func: () => _options(_opts) }
    ];
  };
  let _addSplitPause = (items) => {
    let delay = _opts.nextStringDelay;
    _queue.add([{ delay: delay[0] }, ...items, { delay: delay[1] }]);
  };
  let _setUpCursor = () => {
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
  let _attachCursor = async () => {
    !_elementIsInput() && _cursor && _element.appendChild(_cursor);
    _shouldRenderCursor && setCursorStyles(_id, _opts, _element);
  };
  let _disableCursorBlink = (shouldDisable) => {
    if (_shouldRenderCursor && _cursor) {
      _cursor.classList.toggle("disabled", shouldDisable);
      _cursor.classList.toggle("with-delay", !shouldDisable);
    }
  };
  let _generateQueue = () => {
    let strings = _opts.strings.filter((string) => !!string);
    strings.forEach((string, index) => {
      this.type(string);
      if (index + 1 === strings.length) {
        return;
      }
      let splitItems = _opts.breakLines ? [{ func: () => _type(createElement("BR")), typeable: true }] : duplicate({
        func: _delete,
        delay: _getPace(1)
      }, _queue.getTypeable().length);
      _addSplitPause(splitItems);
    });
  };
  let _prepLoop = async (delay) => {
    let derivedCursorPosition = _getDerivedCursorPosition();
    derivedCursorPosition && await _move({ value: derivedCursorPosition });
    for (let _i of _queue.getTypeable()) {
      await _wait(_delete, _getPace(1));
    }
    _queue.reset();
    _queue.set(0, { delay });
  };
  let _maybePrependHardcodedStrings = (strings) => {
    let existingMarkup = _element.innerHTML;
    if (!existingMarkup) {
      return strings;
    }
    _element.innerHTML = "";
    if (_opts.startDelete) {
      _element.innerHTML = existingMarkup;
      expandTextNodes(_element);
      _addSplitPause([{ func: _delete }]);
      return strings;
    }
    let hardCodedStrings = existingMarkup.replace(/<!--(.+?)-->/g, "").trim().split(/<br(?:\s*?)(?:\/)?>/);
    return hardCodedStrings.concat(strings);
  };
  let _fire = async (remember = true) => {
    _statuses.started = true;
    try {
      for (let [queueKey, queueItem] of _queue.getQueue()) {
        if (queueItem.done)
          continue;
        if (queueItem.typeable && !_statuses.frozen)
          _disableCursorBlink(true);
        await fireItem(queueItem, _wait);
        _disableCursorBlink(false);
        _queue.done(queueKey, !remember);
      }
      if (!remember) {
        return this;
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
  let _move = async (step) => {
    _cursorPosition = updateCursorPosition(step, _cursorPosition, _getAllChars());
    repositionCursor(_element, _getAllChars(), _cursorPosition);
  };
  let _type = (char) => insertIntoElement(_element, char);
  let _options = async (opts) => _opts = merge(_opts, opts);
  let _empty = async () => {
    if (_elementIsInput()) {
      _element.value = "";
      return;
    }
    _getAllChars().forEach(removeNode);
    return;
  };
  let _delete = () => {
    let allChars = _getAllChars();
    if (!allChars.length)
      return;
    if (_elementIsInput()) {
      _element.value = _element.value.slice(0, -1);
    } else {
      removeNode(allChars[_cursorPosition]);
    }
  };
  this.break = function(actionOpts) {
    return _queueAndReturn({
      func: () => _type(createElement("BR")),
      typeable: true
    }, actionOpts);
  };
  this.delete = function(numCharacters = null, actionOpts = {}) {
    numCharacters = handleFunctionalArg(numCharacters);
    let bookEndQueueItems = _generateTemporaryOptionQueueItems(actionOpts);
    let num = numCharacters;
    let { instant, to } = actionOpts;
    let typeableQueueItems = _queue.getTypeable();
    let rounds = (() => {
      if (num === null) {
        return typeableQueueItems.length;
      }
      if (isNumber(num)) {
        return num;
      }
      return countStepsToSelector({
        queueItems: typeableQueueItems,
        selector: num,
        cursorPosition: _getDerivedCursorPosition(),
        to
      });
    })();
    return _queueAndReturn([
      bookEndQueueItems[0],
      ...duplicate({
        func: _delete,
        delay: instant ? 0 : _getPace(1)
      }, rounds),
      bookEndQueueItems[1]
    ], actionOpts);
  };
  this.empty = function(actionOpts = {}) {
    return _queueAndReturn({ func: _empty }, actionOpts);
  };
  this.exec = function(func, actionOpts = {}) {
    let bookEndQueueItems = _generateTemporaryOptionQueueItems(actionOpts);
    return _queueAndReturn([bookEndQueueItems[0], { func: () => func(this) }, bookEndQueueItems[1]], actionOpts);
  };
  this.move = function(movementArg, actionOpts = {}) {
    movementArg = handleFunctionalArg(movementArg);
    let bookEndQueueItems = _generateTemporaryOptionQueueItems(actionOpts);
    let { instant, to } = actionOpts;
    let numberOfSteps = countStepsToSelector({
      queueItems: _queue.getTypeable(),
      selector: movementArg === null ? "" : movementArg,
      to,
      cursorPosition: _getDerivedCursorPosition()
    });
    let directionalStep = numberOfSteps < 0 ? -1 : 1;
    _predictedCursorPosition = _getDerivedCursorPosition() + numberOfSteps;
    return _queueAndReturn([
      bookEndQueueItems[0],
      ...duplicate({
        func: () => _move(directionalStep),
        delay: instant ? 0 : _getPace()
      }, Math.abs(numberOfSteps)),
      bookEndQueueItems[1]
    ], actionOpts);
  };
  this.options = function(opts, actionOpts = {}) {
    opts = handleFunctionalArg(opts);
    _options(opts);
    return _queueAndReturn({}, actionOpts);
  };
  this.pause = function(milliseconds, actionOpts = {}) {
    return _queueAndReturn({ delay: handleFunctionalArg(milliseconds) }, actionOpts);
  };
  this.type = function(string, actionOpts = {}) {
    string = handleFunctionalArg(string);
    let { instant } = actionOpts;
    let bookEndQueueItems = _generateTemporaryOptionQueueItems(actionOpts);
    let chars = maybeChunkStringAsHtml(string, _opts.html);
    let charsAsQueueItems = chars.map((char) => {
      return {
        func: () => _type(char),
        char,
        delay: instant || isNonVoidElement(char) ? 0 : _getPace(),
        typeable: char.nodeType === Node.TEXT_NODE
      };
    });
    let itemsToQueue = [
      bookEndQueueItems[0],
      { func: async () => await _opts.beforeString(string, this) },
      ...charsAsQueueItems,
      { func: async () => await _opts.afterString(string, this) },
      bookEndQueueItems[1]
    ];
    return _queueAndReturn(itemsToQueue, actionOpts);
  };
  this.is = function(key) {
    return _statuses[key];
  };
  this.destroy = function(shouldRemoveCursor = true) {
    _timeouts = destroyTimeouts(_timeouts);
    handleFunctionalArg(shouldRemoveCursor) && _cursor && removeNode(_cursor);
    _statuses.destroyed = true;
  };
  this.freeze = function() {
    _statuses.frozen = true;
  };
  this.unfreeze = () => {
  };
  this.reset = function(rebuild) {
    !this.is("destroyed") && this.destroy();
    if (rebuild) {
      _queue.wipe();
      rebuild(this);
    } else {
      _queue.reset();
    }
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
  this.flush = function(cb = () => {
  }) {
    _attachCursor();
    _fire(false).then(cb);
    return this;
  };
  this.getQueue = () => _queue;
  this.getOptions = () => _opts;
  this.updateOptions = (options2) => _options(options2);
  this.getElement = () => _element;
  let _element = selectorToElement(element);
  let _timeouts = [];
  let _cursorPosition = 0;
  let _predictedCursorPosition = null;
  let _statuses = merge({}, DEFAULT_STATUSES);
  let _opts = merge(DEFAULT_OPTIONS, options);
  _opts = merge(_opts, {
    html: !_elementIsInput() && _opts.html,
    nextStringDelay: calculateDelay(_opts.nextStringDelay),
    loopDelay: calculateDelay(_opts.loopDelay)
  });
  let _id = generateHash();
  let _queue = Queue([
    {
      func: () => {
      },
      delay: _opts.startDelay
    }
  ]);
  _element.dataset.typeitId = _id;
  appendStyleBlock(PLACEHOLDER_CSS);
  let _shouldRenderCursor = _opts.cursor && !_elementIsInput();
  let _cursor = _setUpCursor();
  _opts.strings = _maybePrependHardcodedStrings(asArray(_opts.strings));
  if (_opts.strings.length) {
    _generateQueue();
  }
};

export { TypeIt as default };
