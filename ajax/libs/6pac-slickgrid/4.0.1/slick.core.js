/***
 * Contains core SlickGrid classes.
 * @module Core
 * @namespace Slick
 */

(function (window) {
  /***
   * An event object for passing data to event handlers and letting them control propagation.
   * <p>This is pretty much identical to how W3C and jQuery implement events.</p>
   * @class EventData
   * @constructor
   */
  function EventData(event, args) {
    this.event = event;
    let nativeEvent = event;
    let arguments_ = args;
    let isPropagationStopped = false;
    let isImmediatePropagationStopped = false;
    let isDefaultPrevented = false;
    let returnValues = [];
    let returnValue = undefined;

    // when we already have an event, we want to keep some of the event properties
    // looping through some props is the only way to keep and sync these properties to the returned EventData
    if (event) {
      const eventProps = [
        'altKey', 'ctrlKey', 'metaKey', 'shiftKey', 'key', 'keyCode',
        'clientX', 'clientY', 'offsetX', 'offsetY', 'pageX', 'pageY',
        'bubbles', 'type', 'which', 'x', 'y'
      ];
      for (let key of eventProps) {
        this[key] = event[key];
      }
    }
    this.target = nativeEvent ? nativeEvent.target : undefined;

    /***
     * Stops event from propagating up the DOM tree.
     * @method stopPropagation
     */
    this.stopPropagation = function () {
      isPropagationStopped = true;
      if (nativeEvent) {
        nativeEvent.stopPropagation();
      }
    };

    /***
     * Returns whether stopPropagation was called on this event object.
     * @method isPropagationStopped
     * @return {Boolean}
     */
    this.isPropagationStopped = function () {
      return isPropagationStopped;
    };

    /***
     * Prevents the rest of the handlers from being executed.
     * @method stopImmediatePropagation
     */
    this.stopImmediatePropagation = function () {
      isImmediatePropagationStopped = true;
      if (nativeEvent) {
        nativeEvent.stopImmediatePropagation();
      }
    };

    /***
     * Returns whether stopImmediatePropagation was called on this event object.\
     * @method isImmediatePropagationStopped
     * @return {Boolean}
     */
    this.isImmediatePropagationStopped = function () {
      return isImmediatePropagationStopped;
    };

    this.getNativeEvent = function() {
      return nativeEvent;
    }

    this.preventDefault = function() {
      if (nativeEvent) {
        nativeEvent.preventDefault();
      }
      isDefaultPrevented = true;
    }

    this.isDefaultPrevented = function() {
      if (nativeEvent) {
        return nativeEvent.defaultPrevented;
      }
      return isDefaultPrevented;
    }

    this.addReturnValue = function(value) {
      returnValues.push(value);
      if(returnValue === undefined && value !== undefined) {
        returnValue = value;
      }
    }

    this.getReturnValue = function() {
      return returnValue;
    }

    this.getArguments = function() {
      return arguments_;
    }
  }

  /***
   * A simple publisher-subscriber implementation.
   * @class Event
   * @constructor
   */
  function Event() {
    var handlers = [];

    /***
     * Adds an event handler to be called when the event is fired.
     * <p>Event handler will receive two arguments - an <code>EventData</code> and the <code>data</code>
     * object the event was fired with.<p>
     * @method subscribe
     * @param fn {Function} Event handler.
     */
    this.subscribe = function (fn) {
      handlers.push(fn);
    };

    /***
     * Removes an event handler added with <code>subscribe(fn)</code>.
     * @method unsubscribe
     * @param fn {Function} Event handler to be removed.
     */
    this.unsubscribe = function (fn) {
      for (var i = handlers.length - 1; i >= 0; i--) {
        if (handlers[i] === fn) {
          handlers.splice(i, 1);
        }
      }
    };

    /***
     * Fires an event notifying all subscribers.
     * @method notify
     * @param args {Object} Additional data object to be passed to all handlers.
     * @param e {EventData}
     *      Optional.
     *      An <code>EventData</code> object to be passed to all handlers.
     *      For DOM events, an existing W3C/jQuery event object can be passed in.
     * @param scope {Object}
     *      Optional.
     *      The scope ("this") within which the handler will be executed.
     *      If not specified, the scope will be set to the <code>Event</code> instance.
     */
    this.notify = function (args, e, scope) {
      if (!(e instanceof EventData)) {
        e = new EventData(e, args);
      }
      scope = scope || this;

      for (var i = 0; i < handlers.length && !(e.isPropagationStopped() || e.isImmediatePropagationStopped()); i++) {
        const returnValue = handlers[i].call(scope, e, args);
        e.addReturnValue(returnValue);
      }

      return e;
    };
  }

  function EventHandler() {
    var handlers = [];

    this.subscribe = function (event, handler) {
      handlers.push({
        event: event,
        handler: handler
      });
      event.subscribe(handler);

      return this;  // allow chaining
    };

    this.unsubscribe = function (event, handler) {
      var i = handlers.length;
      while (i--) {
        if (handlers[i].event === event &&
            handlers[i].handler === handler) {
          handlers.splice(i, 1);
          event.unsubscribe(handler);
          return;
        }
      }

      return this;  // allow chaining
    };

    this.unsubscribeAll = function () {
      var i = handlers.length;
      while (i--) {
        handlers[i].event.unsubscribe(handlers[i].handler);
      }
      handlers = [];

      return this;  // allow chaining
    };
  }

  /***
   * A structure containing a range of cells.
   * @class Range
   * @constructor
   * @param fromRow {Integer} Starting row.
   * @param fromCell {Integer} Starting cell.
   * @param toRow {Integer} Optional. Ending row. Defaults to <code>fromRow</code>.
   * @param toCell {Integer} Optional. Ending cell. Defaults to <code>fromCell</code>.
   */
  function Range(fromRow, fromCell, toRow, toCell) {
    if (toRow === undefined && toCell === undefined) {
      toRow = fromRow;
      toCell = fromCell;
    }

    /***
     * @property fromRow
     * @type {Integer}
     */
    this.fromRow = Math.min(fromRow, toRow);

    /***
     * @property fromCell
     * @type {Integer}
     */
    this.fromCell = Math.min(fromCell, toCell);

    /***
     * @property toRow
     * @type {Integer}
     */
    this.toRow = Math.max(fromRow, toRow);

    /***
     * @property toCell
     * @type {Integer}
     */
    this.toCell = Math.max(fromCell, toCell);

    /***
     * Returns whether a range represents a single row.
     * @method isSingleRow
     * @return {Boolean}
     */
    this.isSingleRow = function () {
      return this.fromRow == this.toRow;
    };

    /***
     * Returns whether a range represents a single cell.
     * @method isSingleCell
     * @return {Boolean}
     */
    this.isSingleCell = function () {
      return this.fromRow == this.toRow && this.fromCell == this.toCell;
    };

    /***
     * Returns whether a range contains a given cell.
     * @method contains
     * @param row {Integer}
     * @param cell {Integer}
     * @return {Boolean}
     */
    this.contains = function (row, cell) {
      return row >= this.fromRow && row <= this.toRow &&
          cell >= this.fromCell && cell <= this.toCell;
    };

    /***
     * Returns a readable representation of a range.
     * @method toString
     * @return {String}
     */
    this.toString = function () {
      if (this.isSingleCell()) {
        return "(" + this.fromRow + ":" + this.fromCell + ")";
      }
      else {
        return "(" + this.fromRow + ":" + this.fromCell + " - " + this.toRow + ":" + this.toCell + ")";
      }
    };
  }


  /***
   * A base class that all special / non-data rows (like Group and GroupTotals) derive from.
   * @class NonDataItem
   * @constructor
   */
  function NonDataItem() {
    this.__nonDataRow = true;
  }


  /***
   * Information about a group of rows.
   * @class Group
   * @extends Slick.NonDataItem
   * @constructor
   */
  function Group() {
    this.__group = true;

    /**
     * Grouping level, starting with 0.
     * @property level
     * @type {Number}
     */
    this.level = 0;

    /***
     * Number of rows in the group.
     * @property count
     * @type {Integer}
     */
    this.count = 0;

    /***
     * Grouping value.
     * @property value
     * @type {Object}
     */
    this.value = null;

    /***
     * Formatted display value of the group.
     * @property title
     * @type {String}
     */
    this.title = null;

    /***
     * Whether a group is collapsed.
     * @property collapsed
     * @type {Boolean}
     */
    this.collapsed = false;

    /***
     * Whether a group selection checkbox is checked.
     * @property selectChecked
     * @type {Boolean}
     */
    this.selectChecked = false;

    /***
     * GroupTotals, if any.
     * @property totals
     * @type {GroupTotals}
     */
    this.totals = null;

    /**
     * Rows that are part of the group.
     * @property rows
     * @type {Array}
     */
    this.rows = [];

    /**
     * Sub-groups that are part of the group.
     * @property groups
     * @type {Array}
     */
    this.groups = null;

    /**
     * A unique key used to identify the group.  This key can be used in calls to DataView
     * collapseGroup() or expandGroup().
     * @property groupingKey
     * @type {Object}
     */
    this.groupingKey = null;
  }

  Group.prototype = new NonDataItem();

  /***
   * Compares two Group instances.
   * @method equals
   * @return {Boolean}
   * @param group {Group} Group instance to compare to.
   */
  Group.prototype.equals = function (group) {
    return this.value === group.value &&
        this.count === group.count &&
        this.collapsed === group.collapsed &&
        this.title === group.title;
  };

  /***
   * Information about group totals.
   * An instance of GroupTotals will be created for each totals row and passed to the aggregators
   * so that they can store arbitrary data in it.  That data can later be accessed by group totals
   * formatters during the display.
   * @class GroupTotals
   * @extends Slick.NonDataItem
   * @constructor
   */
  function GroupTotals() {
    this.__groupTotals = true;

    /***
     * Parent Group.
     * @param group
     * @type {Group}
     */
    this.group = null;

    /***
     * Whether the totals have been fully initialized / calculated.
     * Will be set to false for lazy-calculated group totals.
     * @param initialized
     * @type {Boolean}
     */
    this.initialized = false;
  }

  GroupTotals.prototype = new NonDataItem();

  /***
   * A locking helper to track the active edit controller and ensure that only a single controller
   * can be active at a time.  This prevents a whole class of state and validation synchronization
   * issues.  An edit controller (such as SlickGrid) can query if an active edit is in progress
   * and attempt a commit or cancel before proceeding.
   * @class EditorLock
   * @constructor
   */
  function EditorLock() {
    var activeEditController = null;

    /***
     * Returns true if a specified edit controller is active (has the edit lock).
     * If the parameter is not specified, returns true if any edit controller is active.
     * @method isActive
     * @param editController {EditController}
     * @return {Boolean}
     */
    this.isActive = function (editController) {
      return (editController ? activeEditController === editController : activeEditController !== null);
    };

    /***
     * Sets the specified edit controller as the active edit controller (acquire edit lock).
     * If another edit controller is already active, and exception will be throw new Error(.
     * @method activate
     * @param editController {EditController} edit controller acquiring the lock
     */
    this.activate = function (editController) {
      if (editController === activeEditController) { // already activated?
        return;
      }
      if (activeEditController !== null) {
        throw new Error("SlickGrid.EditorLock.activate: an editController is still active, can't activate another editController");
      }
      if (!editController.commitCurrentEdit) {
        throw new Error("SlickGrid.EditorLock.activate: editController must implement .commitCurrentEdit()");
      }
      if (!editController.cancelCurrentEdit) {
        throw new Error("SlickGrid.EditorLock.activate: editController must implement .cancelCurrentEdit()");
      }
      activeEditController = editController;
    };

    /***
     * Unsets the specified edit controller as the active edit controller (release edit lock).
     * If the specified edit controller is not the active one, an exception will be throw new Error(.
     * @method deactivate
     * @param editController {EditController} edit controller releasing the lock
     */
    this.deactivate = function (editController) {
      if (!activeEditController) {
        return;
      }
      if (activeEditController !== editController) {
        throw new Error("SlickGrid.EditorLock.deactivate: specified editController is not the currently active one");
      }
      activeEditController = null;
    };

    /***
     * Attempts to commit the current edit by calling "commitCurrentEdit" method on the active edit
     * controller and returns whether the commit attempt was successful (commit may fail due to validation
     * errors, etc.).  Edit controller's "commitCurrentEdit" must return true if the commit has succeeded
     * and false otherwise.  If no edit controller is active, returns true.
     * @method commitCurrentEdit
     * @return {Boolean}
     */
    this.commitCurrentEdit = function () {
      return (activeEditController ? activeEditController.commitCurrentEdit() : true);
    };

    /***
     * Attempts to cancel the current edit by calling "cancelCurrentEdit" method on the active edit
     * controller and returns whether the edit was successfully cancelled.  If no edit controller is
     * active, returns true.
     * @method cancelCurrentEdit
     * @return {Boolean}
     */
    this.cancelCurrentEdit = function cancelCurrentEdit() {
      return (activeEditController ? activeEditController.cancelCurrentEdit() : true);
    };
  }

  function regexSanitizer(dirtyHtml) {
     return dirtyHtml.replace(/(\b)(on[a-z]+)(\s*)=|javascript:([^>]*)[^>]*|(<\s*)(\/*)script([<>]*).*(<\s*)(\/*)script(>*)|(&lt;)(\/*)(script|script defer)(.*)(&gt;|&gt;">)/gi, '');
  }

  function calculateAvailableSpace(element) {
    let bottom = 0, top = 0, left = 0, right = 0;

    const windowHeight = window.innerHeight || 0;
    const windowWidth = window.innerWidth || 0;
    const scrollPosition = windowScrollPosition();
    const pageScrollTop = scrollPosition.top;
    const pageScrollLeft = scrollPosition.left;
    const elmOffset = offset(element);

    if (elmOffset) {
      const elementOffsetTop = elmOffset.top || 0;
      const elementOffsetLeft = elmOffset.left || 0;
      top = elementOffsetTop - pageScrollTop;
      bottom = windowHeight - (elementOffsetTop - pageScrollTop);
      left = elementOffsetLeft - pageScrollLeft;
      right = windowWidth - (elementOffsetLeft - pageScrollLeft);
    }

    return { top, bottom, left, right };
  }

  /**
   * Create a DOM Element with any optional attributes or properties.
   * It will only accept valid DOM element properties that `createElement` would accept.
   * For example: `createDomElement('div', { className: 'my-css-class' })`,
   * for style or dataset you need to use nested object `{ style: { display: 'none' }}
   * The last argument is to optionally append the created element to a parent container element.
   * @param {String} tagName - html tag
   * @param {Object} options - element properties
   * @param {[HTMLElement]} appendToParent - parent element to append to
   */
  function createDomElement(tagName, elementOptions, appendToParent) {
    const elm = document.createElement(tagName);

    if (elementOptions) {
      Object.keys(elementOptions).forEach((elmOptionKey) => {
        const elmValue = elementOptions[elmOptionKey];
        if (typeof elmValue === 'object') {
          Object.assign(elm[elmOptionKey], elmValue);
        } else {
          elm[elmOptionKey] = (elementOptions)[elmOptionKey];
        }
      });
    }
    if (appendToParent && appendToParent.appendChild) {
      appendToParent.appendChild(elm);
    }
    return elm;
  }

  /**
   * Debounce to delay JS callback execution, a wait of (-1) could be provided to execute callback without delay.
   * @param {Function} callback - callback method to execute
   * @param {Number} wait - delay to wait before execution or -1 delay
   */
  function debounce(callback, wait) {
    let timeoutId = null;
    return (...args) => {
      if (wait >= 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(null, args), wait);
      } else {
        callback.apply(null);
      }
    };
  }

  function emptyElement(element) {
    if (element && element.firstChild) {
      while (element.firstChild) {
        if (element.lastChild) {
          element.removeChild(element.lastChild);
        }
      }
    }
    return element;
  }

  function innerSize(elm, type) {
    let size = 0;

    if (elm) {
      const clientSize = type === 'height' ? 'clientHeight' : 'clientWidth';
      const sides = type === 'height' ? ['top', 'bottom'] : ['left', 'right'];
      size = elm[clientSize];
      for (const side of sides) {
        const sideSize = (parseFloat(getElementProp(elm, `padding-${side}`)) || 0);
        size -= sideSize;
      }
    }
    return size;
  }

  function getElementProp(elm, property) {
    if (elm && elm.getComputedStyle) {
      return window.getComputedStyle(elm, null).getPropertyValue(property);
    }
    return null;
  }

  function isEmptyObject(obj) {
    if (obj === null || obj === undefined) {
      return true;
    }
    return Object.entries(obj).length === 0;
  }

  function noop() { }

  function offset(el) {
    if (!el || !el.getBoundingClientRect) {
      return undefined;
    }
    const box = el.getBoundingClientRect();
    const docElem = document.documentElement;

    return {
      top: box.top + window.pageYOffset - docElem.clientTop,
      left: box.left + window.pageXOffset - docElem.clientLeft
    };
  }

  function windowScrollPosition() {
    return {
      left: window.pageXOffset || document.documentElement.scrollLeft || 0,
      top: window.pageYOffset || document.documentElement.scrollTop || 0,
    };
  }

  function width(el, value) {
    if (!el || !el.getBoundingClientRect) return;
    if (value === undefined) {
      return el.getBoundingClientRect().width
    }
    setStyleSize(el, "width", value);
  }

  function height(el, value) {
    if (!el) return;
    if (value === undefined) {
      return el.getBoundingClientRect().height;
    }
    setStyleSize(el, "height", value);
  }

  function setStyleSize(el, style, val) {
    if (typeof val === 'function') {
      val = val();
    } else if (typeof val === 'string') {
      el.style[style] = val;
    } else {
      el.style[style] = val + 'px';
    }
  }

  function contains(parent, child) {
    if (!parent || !child) {
      return false;
    }

    const parentList = parents(child);
    return !parentList.every(function (p) {
      if(parent == p) {
        return false;
      }
      return true;
    });
  }

  function isHidden(el) {
    return el.offsetWidth === 0 && el.offsetHeight === 0;
  }

  function parents(el, selector) {
    const parents = [];
    const visible = selector == ":visible";
    const hidden = selector == ":hidden";

    while ((el = el.parentNode) && el !== document) {
      if (!el || !el.parentNode) {
        break;
      }
      if (hidden) {
        if(isHidden(el)) {
          parents.push(el);
        }
      } else if (visible) {
        if(!isHidden(el)) {
          parents.push(el);
        }
      } else if (!selector || el.matches(selector)) {
        parents.push(el);
      }
    }
    return parents;
  }

  function toFloat(value) {
    var x = parseFloat(value);
    if (isNaN(x)) {
      return 0;
    }
    return x;
  }

  function show(el, type) {
    type = type ? type : "";
    if (Array.isArray(el)) {
      el.forEach(function (e) {
        e.style.display = type;
      })
    } else {
      el.style.display = type;
    }
  }

  function hide(el) {
    if (Array.isArray(el)) {
      el.forEach(function (e) {
        e.style.display = "none";
      });
    } else {
      el.style.display = "none";
    }
  }

  function slideUp(el, callback) {
    return slideAnimation(el, 'slideUp', callback);
  }

  function slideDown(el, callback) {
    return slideAnimation(el, 'slideDown', callback);
  }

  function slideAnimation(el, slideDirection, callback) {
    if (window.jQuery !== undefined) {
      window.jQuery(el)[slideDirection]("fast", callback);
      return;
    }
    (slideDirection === 'slideUp') ? hide(el) : show(el);
    callback();
  }

  // jQuery's extend
  var getProto = Object.getPrototypeOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call( Object );
  function isFunction( obj ) {
    return typeof obj === "function" && typeof obj.nodeType !== "number" &&
      typeof obj.item !== "function";
  }
  function isPlainObject( obj ) {
    var proto, Ctor;
    if ( !obj || toString.call( obj ) !== "[object Object]" ) {
      return false;
    }

    proto = getProto( obj );
    if ( !proto ) {
      return true;
    }
    Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
    return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
  }
  function extend() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[ 0 ],
      i = 1,
      length = arguments.length,
      deep = false;

    if (typeof target === "boolean") {
      deep = target;
      target = arguments[ i ] || {};
      i++;
    } else {
      target = target || {}
    }
    if (typeof target !== "object" && !isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for ( ; i < length; i++ ) {
      if ( ( options = arguments[ i ] ) != null ) {
        for ( name in options ) {
          copy = options[ name ];
          if ( name === "__proto__" || target === copy ) {
            continue;
          }
          if ( deep && copy && ( isPlainObject( copy ) ||
            ( copyIsArray = Array.isArray( copy ) ) ) ) {
            src = target[ name ];
            if ( copyIsArray && !Array.isArray( src ) ) {
              clone = [];
            } else if ( !copyIsArray && !isPlainObject( src ) ) {
              clone = {};
            } else {
              clone = src;
            }
            copyIsArray = false;
            target[ name ] = extend( deep, clone, copy );
          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }
    return target;
  }

  /**
   * A simple binding event service to keep track of all JavaScript events with callback listeners,
   * it allows us to unbind event(s) and their listener(s) by calling a simple unbind method call.
   * Unbinding is a necessary step to make sure that all event listeners are removed to avoid memory leaks when destroing the grid
   */
  function BindingEventService() {
    this.boundedEvents = [];

    this.destroy = function () {
      this.unbindAll();
      this.boundedEvents = [];
    }

    /** Bind an event listener to any element */
    this.bind = function (element, eventName, listener, options) {
      element.addEventListener(eventName, listener, options);
      this.boundedEvents.push({ element: element, eventName, listener });
    }

    /** Unbind all will remove every every event handlers that were bounded earlier */
    this.unbind = function (element, eventName, listener) {
      if (element && element.removeEventListener) {
        element.removeEventListener(eventName, listener);
      }
    }

    this.unbindByEventName = function (element, eventName) {
      const boundedEvent = this.boundedEvents.find(e => e.element === element && e.eventName === eventName);
      if (boundedEvent) {
        this.unbind(boundedEvent.element, boundedEvent.eventName, boundedEvent.listener);
      }
    }

    /** Unbind all will remove every every event handlers that were bounded earlier */
    this.unbindAll = function () {
      while (this.boundedEvents.length > 0) {
        const boundedEvent = this.boundedEvents.pop();
        const { element, eventName, listener } = boundedEvent;
        this.unbind(element, eventName, listener);
      }
    }
  }

  // export Slick namespace on both global & window objects
  window.Slick = {
    "Event": Event,
    "EventData": EventData,
    "EventHandler": EventHandler,
    "Range": Range,
    "NonDataRow": NonDataItem,
    "Group": Group,
    "GroupTotals": GroupTotals,
    "RegexSanitizer": regexSanitizer,
    "EditorLock": EditorLock,
    "BindingEventService": BindingEventService,
    "Utils": {
      "debounce": debounce,
      "extend": extend,
      "calculateAvailableSpace": calculateAvailableSpace,
      "createDomElement": createDomElement,
      "emptyElement": emptyElement,
      "innerSize": innerSize,
      "isEmptyObject": isEmptyObject,
      "noop": noop,
      "offset": offset,
      "height": height,
      "width": width,
      "setStyleSize": setStyleSize,
      "contains": contains,
      "toFloat": toFloat,
      "parents": parents,
      "show": show,
      "hide": hide,
      "slideUp": slideUp,
      "slideDown": slideDown,
      "storage": {
        // https://stackoverflow.com/questions/29222027/vanilla-alternative-to-jquery-data-function-any-native-javascript-alternati
        _storage: new WeakMap(),
        put: function (element, key, obj) {
          if (!this._storage.has(element)) {
            this._storage.set(element, new Map());
          }
          this._storage.get(element).set(key, obj);
        },
        get: function (element, key) {
          const el = this._storage.get(element);
          if (el) {
            return el.get(key);
          }
          return null;
        },
        remove: function (element, key) {
          var ret = this._storage.get(element).delete(key);
          if (!this._storage.get(element).size === 0) {
            this._storage.delete(element);
          }
          return ret;
        }
      }
    },

    /***
     * A global singleton editor lock.
     * @class GlobalEditorLock
     * @static
     * @constructor
     */
    "GlobalEditorLock": new EditorLock(),

    "keyCode": {
      SPACE: 8,
      BACKSPACE: 8,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      INSERT: 45,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      RIGHT: 39,
      TAB: 9,
      UP: 38,
      A: 65
    },
    "preClickClassName": "slick-edit-preclick",

    "GridAutosizeColsMode": {
      None: 'NOA',
      LegacyOff: 'LOF',
      LegacyForceFit: 'LFF',
      IgnoreViewport: 'IGV',
      FitColsToViewport: 'FCV',
      FitViewportToCols: 'FVC'
    },

    "ColAutosizeMode": {
      Locked: 'LCK',
      Guide: 'GUI',
      Content: 'CON',
      ContentExpandOnly: 'CXO',
      ContentIntelligent: 'CTI'
    },

    "RowSelectionMode": {
      FirstRow: 'FS1',
      FirstNRows: 'FSN',
      AllRows: 'ALL',
      LastRow: 'LS1'
    },

    "ValueFilterMode": {
      None: 'NONE',
      DeDuplicate: 'DEDP',
      GetGreatestAndSub: 'GR8T',
      GetLongestTextAndSub: 'LNSB',
      GetLongestText: 'LNSC'
    },

    "WidthEvalMode": {
      Auto: 'AUTO',
      TextOnly: 'CANV',
      HTML: 'HTML'
    }
  }

  /*  eslint-disable no-undef */
  // also add to global object when exist
  if (typeof global !== "undefined") {
    global.Slick = window.Slick;
  }
  /*  eslint-enable no-undef */
})(window);
