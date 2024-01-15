// TypeIt by Alex MacArthur - https://typeitjs.com
const isArray = (thing) => Array.isArray(thing);

const asArray = (value) => isArray(value) ? value : [value];

let Queue = function(initialItems) {
  let add = function(steps) {
    asArray(steps).forEach((step) => {
      return _q.set(Symbol(step.char?.innerText), buildQueueItem({ ...step }));
    });
    return this;
  };
  let getTypeable = () => rawValues().filter((value) => value.typeable);
  let set = function(index, item) {
    let keys = [..._q.keys()];
    _q.set(keys[index], buildQueueItem(item));
  };
  let buildQueueItem = (queueItem) => {
    queueItem.shouldPauseCursor = function() {
      return Boolean(this.typeable || this.cursorable || this.deletable);
    };
    return queueItem;
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
    done,
    reset,
    destroy,
    getItems,
    getQueue,
    getTypeable
  };
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
  cursor: {
    autoPause: true,
    autoPauseDelay: 500,
    animation: {
      frames: [0, 0, 1].map((n) => {
        return { opacity: n };
      }),
      options: {
        iterations: Infinity,
        easing: "steps(2, start)",
        fill: "forwards"
      }
    }
  },
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

const createElement = (el) => document.createElement(el);

const createTextNode = (content) => document.createTextNode(content);

const appendStyleBlock = (styles, id = "") => {
  let styleBlock = createElement("style");
  styleBlock.id = id;
  styleBlock.appendChild(createTextNode(styles));
  document.head.appendChild(styleBlock);
};

const calculateDelay = (delayArg) => {
  if (!isArray(delayArg)) {
    delayArg = [delayArg / 2, delayArg / 2];
  }
  return delayArg;
};

const randomInRange = (value, range) => {
  return Math.abs(
    Math.random() * (value + range - (value - range)) + (value - range)
  );
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

const toArray = (val) => Array.from(val);

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

const getParsedBody = (content) => {
  let doc = document.implementation.createHTMLDocument();
  doc.body.innerHTML = content;
  return expandTextNodes(doc.body);
};

function walkElementNodes(element, shouldReverse = false, shouldIncludeCursor = false) {
  let cursor = element.querySelector(`.${CURSOR_CLASS}`);
  let walker = document.createTreeWalker(element, NodeFilter.SHOW_ALL, {
    acceptNode: (node) => {
      if (cursor && shouldIncludeCursor) {
        if (node.classList?.contains(CURSOR_CLASS)) {
          return NodeFilter.FILTER_ACCEPT;
        }
        if (cursor.contains(node)) {
          return NodeFilter.FILTER_REJECT;
        }
      }
      return node.classList?.contains(CURSOR_CLASS) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  let nextNode;
  let nodes = [];
  while (nextNode = walker.nextNode()) {
    if (!nextNode.originalParent) {
      nextNode.originalParent = nextNode.parentNode;
    }
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

const isNumber = (value) => Number.isInteger(value);

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

const destroyTimeouts = (timeouts) => {
  timeouts.forEach(clearTimeout);
  return [];
};

const duplicate = (value, times) => new Array(times).fill(value);

let beforePaint = (cb) => {
  return new Promise((resolve) => {
    requestAnimationFrame(async () => {
      resolve(await cb());
    });
  });
};

let getAnimationFromElement = (element) => {
  return element?.getAnimations().find((animation) => {
    return animation.id === element.dataset.tiAnimationId;
  });
};

let setCursorAnimation = ({
  cursor,
  frames,
  options
}) => {
  let animation = cursor.animate(frames, options);
  animation.pause();
  animation.id = cursor.dataset.tiAnimationId;
  beforePaint(() => {
    beforePaint(() => {
      animation.play();
    });
  });
  return animation;
};

let rebuildCursorAnimation = ({
  cursor,
  options,
  cursorOptions
}) => {
  if (!cursor || !cursorOptions)
    return;
  let animation = getAnimationFromElement(cursor);
  let oldCurrentTime;
  if (animation) {
    options.delay = animation.effect.getComputedTiming().delay;
    oldCurrentTime = animation.currentTime;
    animation.cancel();
  }
  let newAnimation = setCursorAnimation({
    cursor,
    frames: cursorOptions.animation.frames,
    options
  });
  if (oldCurrentTime) {
    newAnimation.currentTime = oldCurrentTime;
  }
  return newAnimation;
};

let execute = (queueItem) => queueItem.func?.call(null);
let fireItem = async ({
  index,
  queueItems,
  wait,
  cursor,
  cursorOptions
}) => {
  let queueItem = queueItems[index][1];
  let instantQueue = [];
  let tempIndex = index;
  let futureItem = queueItem;
  let shouldBeGrouped = () => futureItem && !futureItem.delay;
  let shouldPauseCursor = queueItem.shouldPauseCursor() && cursorOptions.autoPause;
  while (shouldBeGrouped()) {
    instantQueue.push(futureItem);
    shouldBeGrouped() && tempIndex++;
    futureItem = queueItems[tempIndex] ? queueItems[tempIndex][1] : null;
  }
  if (instantQueue.length) {
    await beforePaint(async () => {
      for (let q of instantQueue) {
        await execute(q);
      }
    });
    return tempIndex - 1;
  }
  let animation = getAnimationFromElement(cursor);
  let options;
  if (animation) {
    options = {
      ...animation.effect.getComputedTiming(),
      delay: shouldPauseCursor ? cursorOptions.autoPauseDelay : 0
    };
  }
  await wait(async () => {
    if (animation && shouldPauseCursor) {
      animation.cancel();
    }
    await beforePaint(() => {
      execute(queueItem);
    });
  }, queueItem.delay);
  await rebuildCursorAnimation({
    cursor,
    options,
    cursorOptions
  });
  return index;
};

const fireWhenVisible = (element, func) => {
  let observer = new IntersectionObserver(
    (entries, observer2) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          func();
          observer2.unobserve(element);
        }
      });
    },
    { threshold: 1 }
  );
  observer.observe(element);
};

const generateHash = () => Math.random().toString().substring(2, 9);

const isInput = (el) => {
  return "value" in el;
};

let getAllChars = (element) => {
  if (isInput(element)) {
    return toArray(element.value);
  }
  return walkElementNodes(element, true).filter(
    (c) => !(c.childNodes.length > 0)
  );
};

let handleFunctionalArg = (arg) => {
  return typeof arg === "function" ? arg() : arg;
};

let select = (selector, element = document, all = false) => {
  return element[`querySelector${all ? "All" : ""}`](selector);
};

let isBodyElement = (node) => /body/i.test(node?.tagName);

let insertIntoElement = (originalTarget, character) => {
  if (isInput(originalTarget)) {
    originalTarget.value = `${originalTarget.value}${character.textContent}`;
    return;
  }
  character.innerHTML = "";
  let target = isBodyElement(character.originalParent) ? originalTarget : (
    // If we add one-off fresh elements, there will be no
    // "originalParent", so always fall back to the default target.
    character.originalParent || originalTarget
  );
  target.insertBefore(
    character,
    select("." + CURSOR_CLASS, target) || null
  );
};

const isNonVoidElement = (el) => /<(.+)>(.*?)<\/(.+)>/.test(el.outerHTML);

const merge = (originalObj, newObj) => Object.assign({}, originalObj, newObj);

let processCursorOptions = (cursorOptions) => {
  if (typeof cursorOptions === "object") {
    let newOptions = {};
    let { frames: defaultFrames, options: defaultOptions } = DEFAULT_OPTIONS.cursor.animation;
    newOptions.animation = cursorOptions.animation || {};
    newOptions.animation.frames = cursorOptions.animation?.frames || defaultFrames;
    newOptions.animation.options = merge(
      defaultOptions,
      cursorOptions.animation?.options || {}
    );
    newOptions.autoPause = cursorOptions.autoPause ?? DEFAULT_OPTIONS.cursor.autoPause;
    newOptions.autoPauseDelay = cursorOptions.autoPauseDelay || DEFAULT_OPTIONS.cursor.autoPauseDelay;
    return newOptions;
  }
  if (cursorOptions === true) {
    return DEFAULT_OPTIONS.cursor;
  }
  return cursorOptions;
};

const removeNode = (node, rootElement) => {
  if (!node)
    return;
  let nodeParent = node.parentNode;
  let nodeToRemove = nodeParent.childNodes.length > 1 || nodeParent.isSameNode(rootElement) ? (
    // This parent still needs to exist.
    node
  ) : (
    // There's nothing else in there, so just delete the entire thing.
    // By doing this, we clean up markup as we go along.
    nodeParent
  );
  nodeToRemove.remove();
};

const repositionCursor = (element, allChars, newCursorPosition) => {
  let nodeToInsertBefore = allChars[newCursorPosition - 1];
  let cursor = select(`.${CURSOR_CLASS}`, element);
  element = nodeToInsertBefore?.parentNode || element;
  element.insertBefore(cursor, nodeToInsertBefore || null);
};

function selectorToElement(thing) {
  return typeof thing === "string" ? select(thing) : thing;
}

let cursorFontStyles = {
  "font-family": "",
  "font-weight": "",
  "font-size": "",
  "font-style": "",
  "line-height": "",
  color: "",
  transform: "translateX(-.125em)"
};
let setCursorStyles = (id, element) => {
  let rootSelector = `[${DATA_ATTRIBUTE}='${id}']`;
  let cursorSelector = `${rootSelector} .${CURSOR_CLASS}`;
  let computedStyles = getComputedStyle(element);
  let customProperties = Object.entries(cursorFontStyles).reduce(
    (accumulator, [item, value]) => {
      return `${accumulator} ${item}: var(--ti-cursor-${item}, ${value || computedStyles[item]});`;
    },
    ""
  );
  appendStyleBlock(
    `${cursorSelector} { display: inline-block; width: 0; ${customProperties} }`,
    id
  );
};

function splitOnBreak(str) {
  return str.replace(/<!--(.+?)-->/g, "").trim().split(/<br(?:\s*?)(?:\/)?>/);
}

let updateCursorPosition = (steps, cursorPosition, printedCharacters) => {
  return Math.min(
    Math.max(cursorPosition + steps, 0),
    printedCharacters.length
  );
};

let wait = (callback, delay, timeouts) => {
  return new Promise((resolve) => {
    let cb = async () => {
      await callback();
      resolve();
    };
    timeouts.push(setTimeout(cb, delay || 0));
  });
};

class TypeIt {
  element;
  timeouts;
  cursorPosition;
  predictedCursorPosition;
  statuses = {
    started: false,
    completed: false,
    frozen: false,
    destroyed: false
  };
  opts;
  id;
  queue;
  cursor;
  unfreeze = () => {
  };
  constructor(element, options = {}) {
    this.opts = merge(DEFAULT_OPTIONS, options);
    this.element = selectorToElement(element);
    this.timeouts = [];
    this.cursorPosition = 0;
    this.unfreeze = () => {
    };
    this.predictedCursorPosition = null;
    this.statuses = merge({}, DEFAULT_STATUSES);
    this.id = generateHash();
    this.queue = Queue([{ delay: this.opts.startDelay }]);
    this.#buildOptions(options);
    this.cursor = this.#setUpCursor();
    this.element.dataset.typeitId = this.id;
    appendStyleBlock(PLACEHOLDER_CSS);
    if (this.opts.strings.length) {
      this.#generateQueue();
    }
  }
  /**
   * Can only be called once.
   */
  go() {
    if (this.statuses.started) {
      return this;
    }
    this.#attachCursor();
    if (!this.opts.waitUntilVisible) {
      this.#fire();
      return this;
    }
    fireWhenVisible(this.element, this.#fire.bind(this));
    return this;
  }
  destroy(shouldRemoveCursor = true) {
    this.timeouts = destroyTimeouts(this.timeouts);
    handleFunctionalArg(shouldRemoveCursor) && this.cursor && this.#removeNode(this.cursor);
    this.statuses.destroyed = true;
  }
  reset(rebuild) {
    !this.is("destroyed") && this.destroy();
    if (rebuild) {
      this.queue.wipe();
      rebuild(this);
    } else {
      this.queue.reset();
    }
    this.cursorPosition = 0;
    for (let property in this.statuses) {
      this.statuses[property] = false;
    }
    this.element[this.#elementIsInput() ? "value" : "innerHTML"] = "";
    return this;
  }
  is = function(key) {
    return this.statuses[key];
  };
  type(string, actionOpts = {}) {
    string = handleFunctionalArg(string);
    let { instant } = actionOpts;
    let bookEndQueueItems = this.#generateTemporaryOptionQueueItems(actionOpts);
    let chars = maybeChunkStringAsHtml(string, this.opts.html);
    let charsAsQueueItems = chars.map((char) => {
      return {
        func: () => this.#type(char),
        char,
        delay: instant || isNonVoidElement(char) ? 0 : this.#getPace(),
        typeable: char.nodeType === Node.TEXT_NODE
      };
    });
    let itemsToQueue = [
      bookEndQueueItems[0],
      { func: async () => await this.opts.beforeString(string, this) },
      ...charsAsQueueItems,
      { func: async () => await this.opts.afterString(string, this) },
      bookEndQueueItems[1]
    ];
    return this.#queueAndReturn(itemsToQueue, actionOpts);
  }
  break(actionOpts = {}) {
    return this.#queueAndReturn(
      {
        func: () => this.#type(createElement("BR")),
        typeable: true
      },
      actionOpts
    );
  }
  move(movementArg, actionOpts = {}) {
    movementArg = handleFunctionalArg(movementArg);
    let bookEndQueueItems = this.#generateTemporaryOptionQueueItems(actionOpts);
    let { instant, to } = actionOpts;
    let numberOfSteps = countStepsToSelector({
      queueItems: this.queue.getTypeable(),
      selector: movementArg === null ? "" : movementArg,
      to,
      cursorPosition: this.#derivedCursorPosition
    });
    let directionalStep = numberOfSteps < 0 ? -1 : 1;
    this.predictedCursorPosition = this.#derivedCursorPosition + numberOfSteps;
    return this.#queueAndReturn(
      [
        bookEndQueueItems[0],
        ...duplicate(
          {
            func: () => this.#move(directionalStep),
            delay: instant ? 0 : this.#getPace(),
            cursorable: true
          },
          Math.abs(numberOfSteps)
        ),
        bookEndQueueItems[1]
      ],
      actionOpts
    );
  }
  exec(func, actionOpts = {}) {
    let bookEndQueueItems = this.#generateTemporaryOptionQueueItems(actionOpts);
    return this.#queueAndReturn(
      [bookEndQueueItems[0], { func: () => func(this) }, bookEndQueueItems[1]],
      actionOpts
    );
  }
  options(opts, actionOpts = {}) {
    opts = handleFunctionalArg(opts);
    this.#updateOptions(opts);
    return this.#queueAndReturn({}, actionOpts);
  }
  pause(milliseconds, actionOpts = {}) {
    return this.#queueAndReturn(
      { delay: handleFunctionalArg(milliseconds) },
      actionOpts
    );
  }
  delete(numCharacters = null, actionOpts = {}) {
    numCharacters = handleFunctionalArg(numCharacters);
    let bookEndQueueItems = this.#generateTemporaryOptionQueueItems(actionOpts);
    let num = numCharacters;
    let { instant, to } = actionOpts;
    let typeableQueueItems = this.queue.getTypeable();
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
        cursorPosition: this.#derivedCursorPosition,
        to
      });
    })();
    return this.#queueAndReturn(
      [
        bookEndQueueItems[0],
        ...duplicate(
          {
            func: this.#delete.bind(this),
            delay: instant ? 0 : this.#getPace(1),
            deletable: true
          },
          rounds
        ),
        bookEndQueueItems[1]
      ],
      actionOpts
    );
  }
  freeze() {
    this.statuses.frozen = true;
  }
  /**
   * Like `.go()`, but more... "off the grid."
   *
   * - won't trigger `afterComplete` callback
   * - items won't be replayed after `.reset()`
   *
   * When called, all non-done items will be "flushed" --
   * that is, executed, but not remembered.
   */
  flush(cb = () => {
  }) {
    this.#attachCursor();
    this.#fire(false).then(cb);
    return this;
  }
  getQueue() {
    return this.queue;
  }
  getOptions() {
    return this.opts;
  }
  updateOptions(options) {
    return this.#updateOptions(options);
  }
  getElement() {
    return this.element;
  }
  empty(actionOpts = {}) {
    return this.#queueAndReturn({ func: this.#empty.bind(this) }, actionOpts);
  }
  async #empty() {
    if (this.#elementIsInput()) {
      this.element.value = "";
      return;
    }
    this.#allChars.forEach(this.#removeNode.bind(this));
    return;
  }
  /**
   * Execute items in the queue.
   *
   * @param remember If false, each queue item will be destroyed once executed.
   * @returns
   */
  async #fire(remember = true) {
    this.statuses.started = true;
    let cleanUp = (qKey) => {
      this.queue.done(qKey, !remember);
    };
    try {
      let queueItems = [...this.queue.getQueue()];
      for (let index = 0; index < queueItems.length; index++) {
        let [queueKey, queueItem] = queueItems[index];
        if (queueItem.done)
          continue;
        if (!queueItem.deletable || queueItem.deletable && this.#allChars.length) {
          let newIndex = await this.#fireItemWithContext(index, queueItems);
          Array(newIndex - index).fill(index + 1).map((x, y) => x + y).forEach((i) => {
            let [key] = queueItems[i];
            cleanUp(key);
          });
          index = newIndex;
        }
        cleanUp(queueKey);
      }
      if (!remember) {
        return this;
      }
      this.statuses.completed = true;
      await this.opts.afterComplete(this);
      if (!this.opts.loop) {
        throw "";
      }
      let delay = this.opts.loopDelay;
      this.#wait(async () => {
        await this.#prepLoop(delay[0]);
        this.#fire();
      }, delay[1]);
    } catch (e) {
    }
    return this;
  }
  async #move(step) {
    this.cursorPosition = updateCursorPosition(
      step,
      this.cursorPosition,
      this.#allChars
    );
    repositionCursor(this.element, this.#allChars, this.cursorPosition);
  }
  /**
   * 1. Reset queue.
   * 2. Reset initial pause.
   */
  async #prepLoop(delay) {
    let derivedCursorPosition = this.#derivedCursorPosition;
    derivedCursorPosition && await this.#move({ value: derivedCursorPosition });
    let queueItems = this.#allChars.map((c) => {
      return [
        Symbol(),
        {
          func: this.#delete.bind(this),
          delay: this.#getPace(1),
          deletable: true,
          shouldPauseCursor: () => true
        }
      ];
    });
    for (let index = 0; index < queueItems.length; index++) {
      await this.#fireItemWithContext(index, queueItems);
    }
    this.queue.reset();
    this.queue.set(0, { delay });
  }
  #fireItemWithContext(index, queueItems) {
    return fireItem({
      index,
      queueItems,
      wait: this.#wait.bind(this),
      cursor: this.cursor,
      cursorOptions: this.opts.cursor
    });
  }
  async #wait(callback, delay, silent = false) {
    if (this.statuses.frozen) {
      await new Promise((resolve) => {
        this.unfreeze = () => {
          this.statuses.frozen = false;
          resolve();
        };
      });
    }
    silent || await this.opts.beforeStep(this);
    await wait(callback, delay, this.timeouts);
    silent || await this.opts.afterStep(this);
  }
  /**
   * Attach it to the DOM so, along with the required CSS transition.
   */
  async #attachCursor() {
    !this.#elementIsInput() && this.cursor && this.element.appendChild(this.cursor);
    if (this.#shouldRenderCursor) {
      setCursorStyles(this.id, this.element);
      this.cursor.dataset.tiAnimationId = this.id;
      let { animation } = this.opts.cursor;
      let { frames, options } = animation;
      setCursorAnimation({
        frames,
        cursor: this.cursor,
        options: {
          duration: this.opts.cursorSpeed,
          ...options
        }
      });
    }
  }
  #elementIsInput() {
    return isInput(this.element);
  }
  #queueAndReturn(steps, opts) {
    this.queue.add(steps);
    this.#maybeAppendPause(opts);
    return this;
  }
  #maybeAppendPause(opts = {}) {
    let delay = opts.delay;
    delay && this.queue.add({ delay });
  }
  #generateTemporaryOptionQueueItems(newOptions = {}) {
    return [
      { func: () => this.#updateOptions(newOptions) },
      { func: () => this.#updateOptions(this.opts) }
    ];
  }
  async #updateOptions(opts) {
    this.opts = merge(this.opts, opts);
  }
  /**
   * Based on provided strings, generate a TypeIt queue
   * to be fired for each character in the string.
   */
  #generateQueue() {
    let strings = this.opts.strings.filter((string) => !!string);
    strings.forEach((string, index) => {
      this.type(string);
      if (index + 1 === strings.length) {
        return;
      }
      let splitItems = this.opts.breakLines ? [{ func: () => this.#type(createElement("BR")), typeable: true }] : duplicate(
        {
          func: this.#delete.bind(this),
          delay: this.#getPace(1)
        },
        this.queue.getTypeable().length
      );
      this.#addSplitPause(splitItems);
    });
  }
  #buildOptions = (options) => {
    options.cursor = processCursorOptions(
      options.cursor ?? DEFAULT_OPTIONS.cursor
    );
    this.opts.strings = this.#prependHardcodedStrings(
      asArray(this.opts.strings)
    );
    this.opts = merge(this.opts, {
      html: !this.#isInput && this.opts.html,
      nextStringDelay: calculateDelay(this.opts.nextStringDelay),
      loopDelay: calculateDelay(this.opts.loopDelay)
    });
  };
  #prependHardcodedStrings(strings) {
    let existingMarkup = this.element.innerHTML;
    if (!existingMarkup) {
      return strings;
    }
    this.element.innerHTML = "";
    if (this.opts.startDelete) {
      this.element.innerHTML = existingMarkup;
      expandTextNodes(this.element);
      this.#addSplitPause(
        duplicate(
          {
            func: this.#delete.bind(this),
            delay: this.#getPace(1),
            deletable: true
          },
          this.#allChars.length
        )
      );
      return strings;
    }
    return splitOnBreak(existingMarkup).concat(strings);
  }
  /**
   * Provided it's a non-form element and the options is provided,
   * set up the cursor element for the animation.
   */
  #setUpCursor() {
    if (this.#isInput) {
      return null;
    }
    let cursor = createElement("span");
    cursor.className = CURSOR_CLASS;
    if (!this.#shouldRenderCursor) {
      cursor.style.visibility = "hidden";
      return cursor;
    }
    cursor.innerHTML = getParsedBody(this.opts.cursorChar).innerHTML;
    return cursor;
  }
  #addSplitPause(items) {
    let delay = this.opts.nextStringDelay;
    this.queue.add([{ delay: delay[0] }, ...items, { delay: delay[1] }]);
  }
  #type(char) {
    insertIntoElement(this.element, char);
  }
  #delete() {
    if (!this.#allChars.length)
      return;
    if (this.#isInput) {
      this.element.value = this.element.value.slice(0, -1);
    } else {
      this.#removeNode(this.#allChars[this.cursorPosition]);
    }
  }
  #removeNode(node) {
    removeNode(node, this.element);
  }
  #getPace(index = 0) {
    return calculatePace(this.opts)[index];
  }
  get #derivedCursorPosition() {
    return this.predictedCursorPosition ?? this.cursorPosition;
  }
  get #isInput() {
    return isInput(this.element);
  }
  get #shouldRenderCursor() {
    return !!this.opts.cursor && !this.#isInput;
  }
  get #allChars() {
    return getAllChars(this.element);
  }
}

export { TypeIt as default };
