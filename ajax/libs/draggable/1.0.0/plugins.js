(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Plugins", [], factory);
	else if(typeof exports === 'object')
		exports["Plugins"] = factory();
	else
		root["Plugins"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Collidable: () => (/* reexport */ Plugins_Collidable),
  ResizeMirror: () => (/* reexport */ Plugins_ResizeMirror),
  Snappable: () => (/* reexport */ Plugins_Snappable),
  SortAnimation: () => (/* reexport */ Plugins_SortAnimation),
  SwapAnimation: () => (/* reexport */ Plugins_SwapAnimation),
  defaultResizeMirrorOptions: () => (/* reexport */ defaultOptions),
  defaultSortAnimationOptions: () => (/* reexport */ SortAnimation_defaultOptions),
  defaultSwapAnimationOptions: () => (/* reexport */ SwapAnimation_defaultOptions)
});

;// CONCATENATED MODULE: ./src/shared/AbstractPlugin/AbstractPlugin.ts
/**
 * All draggable plugins inherit from this class.
 * @abstract
 * @class AbstractPlugin
 * @module AbstractPlugin
 */
class AbstractPlugin {
    /**
     * AbstractPlugin constructor.
     * @constructs AbstractPlugin
     * @param {Draggable} draggable - Draggable instance
     */
    constructor(draggable) {
        this.draggable = draggable;
    }
    /**
     * Override to add listeners
     * @abstract
     */
    attach() {
        throw new Error('Not Implemented');
    }
    /**
     * Override to remove listeners
     * @abstract
     */
    detach() {
        throw new Error('Not Implemented');
    }
}

;// CONCATENATED MODULE: ./src/shared/utils/closest/closest.ts
/**
 * Get the closest parent element node of a given node that matches the given
 * selector string or matching function
 *
 * @param {Node} node The child element to find a parent of
 * @param {String|Function} selector The string or function to use to match
 *     the parent node
 * @return {Node|null}
 */
function closest(node, value) {
    if (node == null) {
        return null;
    }
    function conditionFn(currentNode) {
        if (currentNode == null || value == null) {
            return false;
        }
        else if (isSelector(value)) {
            return Element.prototype.matches.call(currentNode, value);
        }
        else if (isNodeList(value)) {
            return [...value].includes(currentNode);
        }
        else if (isElement(value)) {
            return value === currentNode;
        }
        else if (isFunction(value)) {
            return value(currentNode);
        }
        else {
            return false;
        }
    }
    let current = node;
    do {
        current =
            current.correspondingUseElement ||
                current.correspondingElement ||
                current;
        if (conditionFn(current)) {
            return current;
        }
        current = current?.parentNode || null;
    } while (current != null &&
        current !== document.body &&
        current !== document);
    return null;
}
function isSelector(value) {
    return Boolean(typeof value === 'string');
}
function isNodeList(value) {
    return Boolean(value instanceof NodeList || value instanceof Array);
}
function isElement(value) {
    return Boolean(value instanceof Node);
}
function isFunction(value) {
    return Boolean(typeof value === 'function');
}

;// CONCATENATED MODULE: ./src/shared/utils/closest/index.ts

/* harmony default export */ const utils_closest = (closest);

;// CONCATENATED MODULE: ./src/shared/AbstractEvent/AbstractEvent.ts
/**
 * All events fired by draggable inherit this class. You can call `cancel()` to
 * cancel a specific event or you can check if an event has been canceled by
 * calling `canceled()`.
 * @abstract
 * @class AbstractEvent
 * @module AbstractEvent
 */
class AbstractEvent {
    /**
     * AbstractEvent constructor.
     * @constructs AbstractEvent
     * @param {T} data - Event data
     */
    constructor(data) {
        this.data = data;
        /**
         * Private instance variable to track canceled state
         * @private
         * @type {Boolean}
         */
        this._canceled = false;
    }
    /**
     * Read-only type
     * @abstract
     * @return {String}
     */
    get type() {
        return this.constructor.type;
    }
    /**
     * Read-only cancelable
     * @abstract
     * @return {Boolean}
     */
    get cancelable() {
        return this.constructor.cancelable;
    }
    /**
     * Cancels the event instance
     * @abstract
     */
    cancel() {
        this._canceled = true;
    }
    /**
     * Check if event has been canceled
     * @abstract
     * @return {Boolean}
     */
    canceled() {
        return this._canceled;
    }
    /**
     * Returns new event instance with existing event data.
     * This method allows for overriding of event data.
     * @param {T} data
     * @return {AbstractEvent}
     */
    clone(data) {
        return new this.constructor({
            ...this.data,
            ...data,
        });
    }
}
/**
 * Event type
 * @static
 * @abstract
 * @property type
 * @type {String}
 */
AbstractEvent.type = 'event';
/**
 * Event cancelable
 * @static
 * @abstract
 * @property cancelable
 * @type {Boolean}
 */
AbstractEvent.cancelable = false;

;// CONCATENATED MODULE: ./src/shared/AbstractEvent/index.ts


;// CONCATENATED MODULE: ./src/Plugins/Collidable/CollidableEvent/CollidableEvent.js


/**
 * Base collidable event
 * @class CollidableEvent
 * @module CollidableEvent
 * @extends AbstractEvent
 */
class CollidableEvent extends AbstractEvent {
  static type = 'collidable';

  /**
   * Drag event that triggered this colliable event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  get dragEvent() {
    return this.data.dragEvent;
  }
}

/**
 * Collidable in event
 * @class CollidableInEvent
 * @module CollidableInEvent
 * @extends CollidableEvent
 */
class CollidableInEvent extends CollidableEvent {
  static type = 'collidable:in';

  /**
   * Element you are currently colliding with
   * @property collidingElement
   * @type {HTMLElement}
   * @readonly
   */
  get collidingElement() {
    return this.data.collidingElement;
  }
}

/**
 * Collidable out event
 * @class CollidableOutEvent
 * @module CollidableOutEvent
 * @extends CollidableEvent
 */
class CollidableOutEvent extends CollidableEvent {
  static type = 'collidable:out';

  /**
   * Element you were previously colliding with
   * @property collidingElement
   * @type {HTMLElement}
   * @readonly
   */
  get collidingElement() {
    return this.data.collidingElement;
  }
}
;// CONCATENATED MODULE: ./src/Plugins/Collidable/CollidableEvent/index.js

;// CONCATENATED MODULE: ./src/Plugins/Collidable/Collidable.js



const onDragMove = Symbol('onDragMove');
const onDragStop = Symbol('onDragStop');
const onRequestAnimationFrame = Symbol('onRequestAnimationFrame');

/**
 * Collidable plugin which detects colliding elements while dragging
 * @class Collidable
 * @module Collidable
 * @extends AbstractPlugin
 */
class Collidable extends AbstractPlugin {
  /**
   * Collidable constructor.
   * @constructs Collidable
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * Keeps track of currently colliding elements
     * @property {HTMLElement|null} currentlyCollidingElement
     * @type {HTMLElement|null}
     */
    this.currentlyCollidingElement = null;

    /**
     * Keeps track of currently colliding elements
     * @property {HTMLElement|null} lastCollidingElement
     * @type {HTMLElement|null}
     */
    this.lastCollidingElement = null;

    /**
     * Animation frame for finding colliding elements
     * @property {Number|null} currentAnimationFrame
     * @type {Number|null}
     */
    this.currentAnimationFrame = null;
    this[onDragMove] = this[onDragMove].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);
    this[onRequestAnimationFrame] = this[onRequestAnimationFrame].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable.on('drag:move', this[onDragMove]).on('drag:stop', this[onDragStop]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable.off('drag:move', this[onDragMove]).off('drag:stop', this[onDragStop]);
  }

  /**
   * Returns current collidables based on `collidables` option
   * @return {HTMLElement[]}
   */
  getCollidables() {
    const collidables = this.draggable.options.collidables;
    if (typeof collidables === 'string') {
      return Array.prototype.slice.call(document.querySelectorAll(collidables));
    } else if (collidables instanceof NodeList || collidables instanceof Array) {
      return Array.prototype.slice.call(collidables);
    } else if (collidables instanceof HTMLElement) {
      return [collidables];
    } else if (typeof collidables === 'function') {
      return collidables();
    } else {
      return [];
    }
  }

  /**
   * Drag move handler
   * @private
   * @param {DragMoveEvent} event - Drag move event
   */
  [onDragMove](event) {
    const target = event.sensorEvent.target;
    this.currentAnimationFrame = requestAnimationFrame(this[onRequestAnimationFrame](target));
    if (this.currentlyCollidingElement) {
      event.cancel();
    }
    const collidableInEvent = new CollidableInEvent({
      dragEvent: event,
      collidingElement: this.currentlyCollidingElement
    });
    const collidableOutEvent = new CollidableOutEvent({
      dragEvent: event,
      collidingElement: this.lastCollidingElement
    });
    const enteringCollidable = Boolean(this.currentlyCollidingElement && this.lastCollidingElement !== this.currentlyCollidingElement);
    const leavingCollidable = Boolean(!this.currentlyCollidingElement && this.lastCollidingElement);
    if (enteringCollidable) {
      if (this.lastCollidingElement) {
        this.draggable.trigger(collidableOutEvent);
      }
      this.draggable.trigger(collidableInEvent);
    } else if (leavingCollidable) {
      this.draggable.trigger(collidableOutEvent);
    }
    this.lastCollidingElement = this.currentlyCollidingElement;
  }

  /**
   * Drag stop handler
   * @private
   * @param {DragStopEvent} event - Drag stop event
   */
  [onDragStop](event) {
    const lastCollidingElement = this.currentlyCollidingElement || this.lastCollidingElement;
    const collidableOutEvent = new CollidableOutEvent({
      dragEvent: event,
      collidingElement: lastCollidingElement
    });
    if (lastCollidingElement) {
      this.draggable.trigger(collidableOutEvent);
    }
    this.lastCollidingElement = null;
    this.currentlyCollidingElement = null;
  }

  /**
   * Animation frame function
   * @private
   * @param {HTMLElement} target - Current move target
   * @return {Function}
   */
  [onRequestAnimationFrame](target) {
    return () => {
      const collidables = this.getCollidables();
      this.currentlyCollidingElement = utils_closest(target, element => collidables.includes(element));
    };
  }
}
;// CONCATENATED MODULE: ./src/Plugins/Collidable/index.js

/* harmony default export */ const Plugins_Collidable = (Collidable);

;// CONCATENATED MODULE: ./src/shared/utils/requestNextAnimationFrame/requestNextAnimationFrame.ts
function requestNextAnimationFrame(callback) {
    return requestAnimationFrame(() => {
        requestAnimationFrame(callback);
    });
}

;// CONCATENATED MODULE: ./src/shared/utils/requestNextAnimationFrame/index.ts

/* harmony default export */ const utils_requestNextAnimationFrame = (requestNextAnimationFrame);

;// CONCATENATED MODULE: ./src/Plugins/ResizeMirror/ResizeMirror.js


const onMirrorCreated = Symbol('onMirrorCreated');
const onMirrorDestroy = Symbol('onMirrorDestroy');
const onDragOver = Symbol('onDragOver');
const resize = Symbol('resize');

/**
 * ResizeMirror default options
 * @property {Object} defaultOptions
 * @type {Object}
 */
const defaultOptions = {};

/**
 * The ResizeMirror plugin resizes the mirror element to the dimensions of the draggable element that the mirror is hovering over
 * @class ResizeMirror
 * @module ResizeMirror
 * @extends AbstractPlugin
 */
class ResizeMirror extends AbstractPlugin {
  /**
   * ResizeMirror constructor.
   * @constructs ResizeMirror
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * ResizeMirror options
     * @property {Object} options
     * @type {Object}
     */
    this.options = {
      ...defaultOptions,
      ...this.getOptions()
    };

    /**
     * ResizeMirror remembers the last width when resizing the mirror
     * to avoid additional writes to the DOM
     * @property {number} lastWidth
     */
    this.lastWidth = 0;

    /**
     * ResizeMirror remembers the last height when resizing the mirror
     * to avoid additional writes to the DOM
     * @property {number} lastHeight
     */
    this.lastHeight = 0;

    /**
     * Keeps track of the mirror element
     * @property {HTMLElement} mirror
     */
    this.mirror = null;
    this[onMirrorCreated] = this[onMirrorCreated].bind(this);
    this[onMirrorDestroy] = this[onMirrorDestroy].bind(this);
    this[onDragOver] = this[onDragOver].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable.on('mirror:created', this[onMirrorCreated]).on('drag:over', this[onDragOver]).on('drag:over:container', this[onDragOver]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable.off('mirror:created', this[onMirrorCreated]).off('mirror:destroy', this[onMirrorDestroy]).off('drag:over', this[onDragOver]).off('drag:over:container', this[onDragOver]);
  }

  /**
   * Returns options passed through draggable
   * @return {Object}
   */
  getOptions() {
    return this.draggable.options.resizeMirror || {};
  }

  /**
   * Mirror created handler
   * @param {MirrorCreatedEvent} mirrorEvent
   * @private
   */
  [onMirrorCreated]({
    mirror
  }) {
    this.mirror = mirror;
  }

  /**
   * Mirror destroy handler
   * @param {MirrorDestroyEvent} mirrorEvent
   * @private
   */
  [onMirrorDestroy]() {
    this.mirror = null;
  }

  /**
   * Drag over handler
   * @param {DragOverEvent | DragOverContainer} dragEvent
   * @private
   */
  [onDragOver](dragEvent) {
    this[resize](dragEvent);
  }

  /**
   * Resize function for
   * @param {DragOverEvent | DragOverContainer} dragEvent
   * @private
   */
  [resize]({
    overContainer,
    over
  }) {
    requestAnimationFrame(() => {
      if (!this.mirror.parentNode) {
        return;
      }
      if (this.mirror.parentNode !== overContainer) {
        overContainer.appendChild(this.mirror);
      }
      const overElement = over || this.draggable.getDraggableElementsForContainer(overContainer)[0];
      if (!overElement) {
        return;
      }
      utils_requestNextAnimationFrame(() => {
        const overRect = overElement.getBoundingClientRect();
        if (this.lastHeight === overRect.height && this.lastWidth === overRect.width) {
          return;
        }
        this.mirror.style.width = `${overRect.width}px`;
        this.mirror.style.height = `${overRect.height}px`;
        this.lastWidth = overRect.width;
        this.lastHeight = overRect.height;
      });
    });
  }
}
;// CONCATENATED MODULE: ./src/Plugins/ResizeMirror/index.js

/* harmony default export */ const Plugins_ResizeMirror = (ResizeMirror);

;// CONCATENATED MODULE: ./src/Plugins/Snappable/SnappableEvent/SnappableEvent.js


/**
 * Base snap event
 * @class SnapEvent
 * @module SnapEvent
 * @extends AbstractEvent
 */
class SnapEvent extends AbstractEvent {
  static type = 'snap';

  /**
   * Drag event that triggered this snap event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  get dragEvent() {
    return this.data.dragEvent;
  }

  /**
   * Snappable element
   * @property snappable
   * @type {HTMLElement}
   * @readonly
   */
  get snappable() {
    return this.data.snappable;
  }
}

/**
 * Snap in event
 * @class SnapInEvent
 * @module SnapInEvent
 * @extends SnapEvent
 */
class SnapInEvent extends SnapEvent {
  static type = 'snap:in';
  static cancelable = true;
}

/**
 * Snap out event
 * @class SnapOutEvent
 * @module SnapOutEvent
 * @extends SnapEvent
 */
class SnapOutEvent extends SnapEvent {
  static type = 'snap:out';
  static cancelable = true;
}
;// CONCATENATED MODULE: ./src/Plugins/Snappable/SnappableEvent/index.js

;// CONCATENATED MODULE: ./src/Plugins/Snappable/Snappable.js


const onDragStart = Symbol('onDragStart');
const Snappable_onDragStop = Symbol('onDragStop');
const Snappable_onDragOver = Symbol('onDragOver');
const onDragOut = Symbol('onDragOut');
const Snappable_onMirrorCreated = Symbol('onMirrorCreated');
const Snappable_onMirrorDestroy = Symbol('onMirrorDestroy');

/**
 * Snappable plugin which snaps draggable elements into place
 * @class Snappable
 * @module Snappable
 * @extends AbstractPlugin
 */
class Snappable extends AbstractPlugin {
  /**
   * Snappable constructor.
   * @constructs Snappable
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * Keeps track of the first source element
     * @property {HTMLElement|null} firstSource
     */
    this.firstSource = null;

    /**
     * Keeps track of the mirror element
     * @property {HTMLElement} mirror
     */
    this.mirror = null;
    this[onDragStart] = this[onDragStart].bind(this);
    this[Snappable_onDragStop] = this[Snappable_onDragStop].bind(this);
    this[Snappable_onDragOver] = this[Snappable_onDragOver].bind(this);
    this[onDragOut] = this[onDragOut].bind(this);
    this[Snappable_onMirrorCreated] = this[Snappable_onMirrorCreated].bind(this);
    this[Snappable_onMirrorDestroy] = this[Snappable_onMirrorDestroy].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable.on('drag:start', this[onDragStart]).on('drag:stop', this[Snappable_onDragStop]).on('drag:over', this[Snappable_onDragOver]).on('drag:out', this[onDragOut]).on('droppable:over', this[Snappable_onDragOver]).on('droppable:out', this[onDragOut]).on('mirror:created', this[Snappable_onMirrorCreated]).on('mirror:destroy', this[Snappable_onMirrorDestroy]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable.off('drag:start', this[onDragStart]).off('drag:stop', this[Snappable_onDragStop]).off('drag:over', this[Snappable_onDragOver]).off('drag:out', this[onDragOut]).off('droppable:over', this[Snappable_onDragOver]).off('droppable:out', this[onDragOut]).off('mirror:created', this[Snappable_onMirrorCreated]).off('mirror:destroy', this[Snappable_onMirrorDestroy]);
  }

  /**
   * Drag start handler
   * @private
   * @param {DragStartEvent} event - Drag start event
   */
  [onDragStart](event) {
    if (event.canceled()) {
      return;
    }
    this.firstSource = event.source;
  }

  /**
   * Drag stop handler
   * @private
   * @param {DragStopEvent} event - Drag stop event
   */
  [Snappable_onDragStop]() {
    this.firstSource = null;
  }

  /**
   * Drag over handler
   * @private
   * @param {DragOverEvent|DroppableOverEvent} event - Drag over event
   */
  [Snappable_onDragOver](event) {
    if (event.canceled()) {
      return;
    }
    const source = event.source || event.dragEvent.source;
    if (source === this.firstSource) {
      this.firstSource = null;
      return;
    }
    const snapInEvent = new SnapInEvent({
      dragEvent: event,
      snappable: event.over || event.droppable
    });
    this.draggable.trigger(snapInEvent);
    if (snapInEvent.canceled()) {
      return;
    }
    if (this.mirror) {
      this.mirror.style.display = 'none';
    }
    source.classList.remove(...this.draggable.getClassNamesFor('source:dragging'));
    source.classList.add(...this.draggable.getClassNamesFor('source:placed'));

    // Need to cancel this in drag out
    setTimeout(() => {
      source.classList.remove(...this.draggable.getClassNamesFor('source:placed'));
    }, this.draggable.options.placedTimeout);
  }

  /**
   * Drag out handler
   * @private
   * @param {DragOutEvent|DroppableOutEvent} event - Drag out event
   */
  [onDragOut](event) {
    if (event.canceled()) {
      return;
    }
    const source = event.source || event.dragEvent.source;
    const snapOutEvent = new SnapOutEvent({
      dragEvent: event,
      snappable: event.over || event.droppable
    });
    this.draggable.trigger(snapOutEvent);
    if (snapOutEvent.canceled()) {
      return;
    }
    if (this.mirror) {
      this.mirror.style.display = '';
    }
    source.classList.add(...this.draggable.getClassNamesFor('source:dragging'));
  }

  /**
   * Mirror created handler
   * @param {MirrorCreatedEvent} mirrorEvent
   * @private
   */
  [Snappable_onMirrorCreated]({
    mirror
  }) {
    this.mirror = mirror;
  }

  /**
   * Mirror destroy handler
   * @param {MirrorDestroyEvent} mirrorEvent
   * @private
   */
  [Snappable_onMirrorDestroy]() {
    this.mirror = null;
  }
}
;// CONCATENATED MODULE: ./src/Plugins/Snappable/index.js

/* harmony default export */ const Plugins_Snappable = (Snappable);

;// CONCATENATED MODULE: ./src/Plugins/SwapAnimation/SwapAnimation.ts

/**
 * SwapAnimation default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.duration
 * @property {String} defaultOptions.easingFunction
 * @property {Boolean} defaultOptions.horizontal
 * @type {Object}
 */
const SwapAnimation_defaultOptions = {
    duration: 150,
    easingFunction: 'ease-in-out',
    horizontal: false,
};
/**
 * SwapAnimation plugin adds swap animations for sortable
 * @class SwapAnimation
 * @module SwapAnimation
 * @extends AbstractPlugin
 */
class SwapAnimation extends AbstractPlugin {
    /**
     * SwapAnimation constructor.
     * @constructs SwapAnimation
     * @param {Draggable} draggable - Draggable instance
     */
    constructor(draggable) {
        super(draggable);
        /**
         * SwapAnimation options
         * @property {Object} options
         * @property {Number} defaultOptions.duration
         * @property {String} defaultOptions.easingFunction
         * @type {Object}
         */
        this.options = {
            ...SwapAnimation_defaultOptions,
            ...this.getOptions(),
        };
        /**
         * Last animation frame
         * @property {Number} lastAnimationFrame
         * @type {Number}
         */
        this.lastAnimationFrame = null;
        this.onSortableSorted = this.onSortableSorted.bind(this);
    }
    /**
     * Attaches plugins event listeners
     */
    attach() {
        this.draggable.on('sortable:sorted', this.onSortableSorted);
    }
    /**
     * Detaches plugins event listeners
     */
    detach() {
        this.draggable.off('sortable:sorted', this.onSortableSorted);
    }
    /**
     * Returns options passed through draggable
     * @return {Object}
     */
    getOptions() {
        return this.draggable.options.swapAnimation || {};
    }
    /**
     * Sortable sorted handler
     * @param {SortableSortedEvent} sortableEvent
     * @private
     */
    onSortableSorted({ oldIndex, newIndex, dragEvent }) {
        const { source, over } = dragEvent;
        if (this.lastAnimationFrame) {
            cancelAnimationFrame(this.lastAnimationFrame);
        }
        // Can be done in a separate frame
        this.lastAnimationFrame = requestAnimationFrame(() => {
            if (oldIndex >= newIndex) {
                animate(source, over, this.options);
            }
            else {
                animate(over, source, this.options);
            }
        });
    }
}
/**
 * Animates two elements
 * @param {HTMLElement} from
 * @param {HTMLElement} to
 * @param {Object} options
 * @param {Number} options.duration
 * @param {String} options.easingFunction
 * @param {String} options.horizontal
 * @private
 */
function animate(from, to, { duration, easingFunction, horizontal }) {
    for (const element of [from, to]) {
        element.style.pointerEvents = 'none';
    }
    if (horizontal) {
        const width = from.offsetWidth;
        from.style.transform = `translate3d(${width}px, 0, 0)`;
        to.style.transform = `translate3d(-${width}px, 0, 0)`;
    }
    else {
        const height = from.offsetHeight;
        from.style.transform = `translate3d(0, ${height}px, 0)`;
        to.style.transform = `translate3d(0, -${height}px, 0)`;
    }
    requestAnimationFrame(() => {
        for (const element of [from, to]) {
            element.addEventListener('transitionend', resetElementOnTransitionEnd);
            element.style.transition = `transform ${duration}ms ${easingFunction}`;
            element.style.transform = '';
        }
    });
}
/**
 * Resets animation style properties after animation has completed
 * @param {Event} event
 * @private
 */
function resetElementOnTransitionEnd(event) {
    if (event.target == null || !isHTMLElement(event.target)) {
        return;
    }
    event.target.style.transition = '';
    event.target.style.pointerEvents = '';
    event.target.removeEventListener('transitionend', resetElementOnTransitionEnd);
}
function isHTMLElement(eventTarget) {
    return Boolean('style' in eventTarget);
}

;// CONCATENATED MODULE: ./src/Plugins/SwapAnimation/index.js

/* harmony default export */ const Plugins_SwapAnimation = (SwapAnimation);

;// CONCATENATED MODULE: ./src/Plugins/SortAnimation/SortAnimation.js

const onSortableSorted = Symbol('onSortableSorted');
const onSortableSort = Symbol('onSortableSort');

/**
 * SortAnimation default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.duration
 * @property {String} defaultOptions.easingFunction
 * @type {Object}
 */
const SortAnimation_defaultOptions = {
  duration: 150,
  easingFunction: 'ease-in-out'
};

/**
 * (Added in: v1.0.0-beta.10)
 *
 * SortAnimation plugin adds sort animation for sortable
 * @class SortAnimation
 * @module SortAnimation
 * @extends AbstractPlugin
 */
class SortAnimation extends AbstractPlugin {
  /**
   * SortAnimation constructor.
   * @constructs SortAnimation
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * SortAnimation options
     * @property {Object} options
     * @property {Number} defaultOptions.duration
     * @property {String} defaultOptions.easingFunction
     * @type {Object}
     */
    this.options = {
      ...SortAnimation_defaultOptions,
      ...this.getOptions()
    };

    /**
     * Last animation frame
     * @property {Number} lastAnimationFrame
     * @type {Number}
     */
    this.lastAnimationFrame = null;
    this.lastElements = [];
    this[onSortableSorted] = this[onSortableSorted].bind(this);
    this[onSortableSort] = this[onSortableSort].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable.on('sortable:sort', this[onSortableSort]);
    this.draggable.on('sortable:sorted', this[onSortableSorted]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable.off('sortable:sort', this[onSortableSort]);
    this.draggable.off('sortable:sorted', this[onSortableSorted]);
  }

  /**
   * Returns options passed through draggable
   * @return {Object}
   */
  getOptions() {
    return this.draggable.options.sortAnimation || {};
  }

  /**
   * Sortable sort handler
   * @param {SortableSortEvent} sortableEvent
   * @private
   */
  [onSortableSort]({
    dragEvent
  }) {
    const {
      sourceContainer
    } = dragEvent;
    const elements = this.draggable.getDraggableElementsForContainer(sourceContainer);
    this.lastElements = Array.from(elements).map(el => {
      return {
        domEl: el,
        offsetTop: el.offsetTop,
        offsetLeft: el.offsetLeft
      };
    });
  }

  /**
   * Sortable sorted handler
   * @param {SortableSortedEvent} sortableEvent
   * @private
   */
  [onSortableSorted]({
    oldIndex,
    newIndex
  }) {
    if (oldIndex === newIndex) {
      return;
    }
    const effectedElements = [];
    let start;
    let end;
    let num;
    if (oldIndex > newIndex) {
      start = newIndex;
      end = oldIndex - 1;
      num = 1;
    } else {
      start = oldIndex + 1;
      end = newIndex;
      num = -1;
    }
    for (let i = start; i <= end; i++) {
      const from = this.lastElements[i];
      const to = this.lastElements[i + num];
      effectedElements.push({
        from,
        to
      });
    }
    cancelAnimationFrame(this.lastAnimationFrame);

    // Can be done in a separate frame
    this.lastAnimationFrame = requestAnimationFrame(() => {
      effectedElements.forEach(element => SortAnimation_animate(element, this.options));
    });
  }
}

/**
 * Animates two elements
 * @param {Object} element
 * @param {Object} element.from
 * @param {Object} element.to
 * @param {Object} options
 * @param {Number} options.duration
 * @param {String} options.easingFunction
 * @private
 */
function SortAnimation_animate({
  from,
  to
}, {
  duration,
  easingFunction
}) {
  const domEl = from.domEl;
  const x = from.offsetLeft - to.offsetLeft;
  const y = from.offsetTop - to.offsetTop;
  domEl.style.pointerEvents = 'none';
  domEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  requestAnimationFrame(() => {
    domEl.addEventListener('transitionend', SortAnimation_resetElementOnTransitionEnd);
    domEl.style.transition = `transform ${duration}ms ${easingFunction}`;
    domEl.style.transform = '';
  });
}

/**
 * Resets animation style properties after animation has completed
 * @param {Event} event
 * @private
 */
function SortAnimation_resetElementOnTransitionEnd(event) {
  event.target.style.transition = '';
  event.target.style.pointerEvents = '';
  event.target.removeEventListener('transitionend', SortAnimation_resetElementOnTransitionEnd);
}
;// CONCATENATED MODULE: ./src/Plugins/SortAnimation/index.js

/* harmony default export */ const Plugins_SortAnimation = (SortAnimation);

;// CONCATENATED MODULE: ./src/Plugins/index.js





/******/ 	return __webpack_exports__;
/******/ })()
;
});