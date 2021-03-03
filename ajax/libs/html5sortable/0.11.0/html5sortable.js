/*
 * HTML5Sortable package
 * https://github.com/lukasoppermann/html5sortable
 *
 * Maintained by Lukas Oppermann <lukas@vea.re>
 *
 * Released under the MIT license.
 */
var sortable = (function () {
  'use strict';

  /**
   * Get or set data on element
   * @param {HTMLElement} element
   * @param {string} key
   * @param {any} value
   * @return {*}
   */
  function addData(element, key, value) {
      if (value === undefined) {
          return element && element.h5s && element.h5s.data && element.h5s.data[key];
      }
      else {
          element.h5s = element.h5s || {};
          element.h5s.data = element.h5s.data || {};
          element.h5s.data[key] = value;
      }
  }
  /**
   * Remove data from element
   * @param {HTMLElement} element
   */
  function removeData(element) {
      if (element.h5s) {
          delete element.h5s.data;
      }
  }

  /* eslint-env browser */
  /**
   * Filter only wanted nodes
   * @param {NodeList|HTMLCollection|Array} nodes
   * @param {String} selector
   * @returns {Array}
   */
  var filter = (function (nodes, selector) {
      if (!(nodes instanceof NodeList || nodes instanceof HTMLCollection || nodes instanceof Array)) {
          throw new Error('You must provide a nodeList/HTMLCollection/Array of elements to be filtered.');
      }
      if (typeof selector !== 'string') {
          return Array.from(nodes);
      }
      return Array.from(nodes).filter(function (item) { return item.nodeType === 1 && item.matches(selector); });
  });

  /* eslint-env browser */
  /* eslint-disable no-use-before-define */
  var stores = new Map();
  /* eslint-enable no-use-before-define */
  /**
   * Stores data & configurations per Sortable
   * @param {Object} config
   */
  var Store = /** @class */ (function () {
      function Store() {
          this._config = new Map(); // eslint-disable-line no-undef
          this._placeholder = undefined; // eslint-disable-line no-undef
          this._data = new Map(); // eslint-disable-line no-undef
      }
      Object.defineProperty(Store.prototype, "config", {
          /**
           * get the configuration map of a class instance
           * @method config
           * @return {object}
           */
          get: function () {
              // transform Map to object
              var config = {};
              this._config.forEach(function (value, key) {
                  config[key] = value;
              });
              // return object
              return config;
          },
          /**
           * set the configuration of a class instance
           * @method config
           * @param {object} config object of configurations
           */
          set: function (config) {
              if (typeof config !== 'object') {
                  throw new Error('You must provide a valid configuration object to the config setter.');
              }
              // combine config with default
              var mergedConfig = Object.assign({}, config);
              // add config to map
              this._config = new Map(Object.entries(mergedConfig));
          },
          enumerable: false,
          configurable: true
      });
      /**
       * set individual configuration of a class instance
       * @method setConfig
       * @param  key valid configuration key
       * @param  value any value
       * @return void
       */
      Store.prototype.setConfig = function (key, value) {
          if (!this._config.has(key)) {
              throw new Error("Trying to set invalid configuration item: " + key);
          }
          // set config
          this._config.set(key, value);
      };
      /**
       * get an individual configuration of a class instance
       * @method getConfig
       * @param  key valid configuration key
       * @return any configuration value
       */
      Store.prototype.getConfig = function (key) {
          if (!this._config.has(key)) {
              throw new Error("Invalid configuration item requested: " + key);
          }
          return this._config.get(key);
      };
      Object.defineProperty(Store.prototype, "placeholder", {
          /**
           * get the placeholder for a class instance
           * @method placeholder
           * @return {HTMLElement|null}
           */
          get: function () {
              return this._placeholder;
          },
          /**
           * set the placeholder for a class instance
           * @method placeholder
           * @param {HTMLElement} placeholder
           * @return {void}
           */
          set: function (placeholder) {
              if (!(placeholder instanceof HTMLElement) && placeholder !== null) {
                  throw new Error('A placeholder must be an html element or null.');
              }
              this._placeholder = placeholder;
          },
          enumerable: false,
          configurable: true
      });
      /**
       * set an data entry
       * @method setData
       * @param {string} key
       * @param {any} value
       * @return {void}
       */
      Store.prototype.setData = function (key, value) {
          if (typeof key !== 'string') {
              throw new Error('The key must be a string.');
          }
          this._data.set(key, value);
      };
      /**
       * get an data entry
       * @method getData
       * @param {string} key an existing key
       * @return {any}
       */
      Store.prototype.getData = function (key) {
          if (typeof key !== 'string') {
              throw new Error('The key must be a string.');
          }
          return this._data.get(key);
      };
      /**
       * delete an data entry
       * @method deleteData
       * @param {string} key an existing key
       * @return {boolean}
       */
      Store.prototype.deleteData = function (key) {
          if (typeof key !== 'string') {
              throw new Error('The key must be a string.');
          }
          return this._data.delete(key);
      };
      return Store;
  }());
  /**
   * @param {HTMLElement} sortableElement
   * @returns {Class: Store}
   */
  var store = (function (sortableElement) {
      // if sortableElement is wrong type
      if (!(sortableElement instanceof HTMLElement)) {
          throw new Error('Please provide a sortable to the store function.');
      }
      // create new instance if not avilable
      if (!stores.has(sortableElement)) {
          stores.set(sortableElement, new Store());
      }
      // return instance
      return stores.get(sortableElement);
  });

  /**
   * @param {Array|HTMLElement} element
   * @param {Function} callback
   * @param {string} event
   */
  function addEventListener(element, eventName, callback) {
      if (element instanceof Array) {
          for (var i = 0; i < element.length; ++i) {
              addEventListener(element[i], eventName, callback);
          }
          return;
      }
      element.addEventListener(eventName, callback);
      store(element).setData("event" + eventName, callback);
  }
  /**
   * @param {Array<HTMLElement>|HTMLElement} element
   * @param {string} eventName
   */
  function removeEventListener(element, eventName) {
      if (element instanceof Array) {
          for (var i = 0; i < element.length; ++i) {
              removeEventListener(element[i], eventName);
          }
          return;
      }
      element.removeEventListener(eventName, store(element).getData("event" + eventName));
      store(element).deleteData("event" + eventName);
  }

  /**
   * @param {Array<HTMLElement>|HTMLElement} element
   * @param {string} attribute
   * @param {string} value
   */
  function addAttribute(element, attribute, value) {
      if (element instanceof Array) {
          for (var i = 0; i < element.length; ++i) {
              addAttribute(element[i], attribute, value);
          }
          return;
      }
      element.setAttribute(attribute, value);
  }
  /**
   * @param {Array|HTMLElement} element
   * @param {string} attribute
   */
  function removeAttribute(element, attribute) {
      if (element instanceof Array) {
          for (var i = 0; i < element.length; ++i) {
              removeAttribute(element[i], attribute);
          }
          return;
      }
      element.removeAttribute(attribute);
  }

  /**
   * @param {HTMLElement} element
   * @returns {Object}
   */
  var offset = (function (element) {
      if (!element.parentElement || element.getClientRects().length === 0) {
          throw new Error('target element must be part of the dom');
      }
      var rect = element.getClientRects()[0];
      return {
          left: rect.left + window.pageXOffset,
          right: rect.right + window.pageXOffset,
          top: rect.top + window.pageYOffset,
          bottom: rect.bottom + window.pageYOffset
      };
  });

  /**
   * Creates and returns a new debounced version of the passed function which will postpone its execution until after wait milliseconds have elapsed
   * @param {Function} func to debounce
   * @param {number} time to wait before calling function with latest arguments, 0 - no debounce
   * @returns {function} - debounced function
   */
  var debounce = (function (func, wait) {
      if (wait === void 0) { wait = 0; }
      var timeout;
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          clearTimeout(timeout);
          timeout = setTimeout(function () {
              func.apply(void 0, args);
          }, wait);
      };
  });

  /* eslint-env browser */
  /**
   * Get position of the element relatively to its sibling elements
   * @param {HTMLElement} element
   * @returns {number}
   */
  var getIndex = (function (element, elementList) {
      if (!(element instanceof HTMLElement) || !(elementList instanceof NodeList || elementList instanceof HTMLCollection || elementList instanceof Array)) {
          throw new Error('You must provide an element and a list of elements.');
      }
      return Array.from(elementList).indexOf(element);
  });

  /* eslint-env browser */
  /**
   * Test whether element is in DOM
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  var isInDom = (function (element) {
      if (!(element instanceof HTMLElement)) {
          throw new Error('Element is not a node element.');
      }
      return element.parentNode !== null;
  });

  /* eslint-env browser */
  /**
   * Insert node before or after target
   * @param {HTMLElement} referenceNode - reference element
   * @param {HTMLElement} newElement - element to be inserted
   * @param {String} position - insert before or after reference element
   */
  var insertNode = function (referenceNode, newElement, position) {
      if (!(referenceNode instanceof HTMLElement) || !(referenceNode.parentElement instanceof HTMLElement)) {
          throw new Error('target and element must be a node');
      }
      referenceNode.parentElement.insertBefore(newElement, (position === 'before' ? referenceNode : referenceNode.nextElementSibling));
  };
  /**
   * Insert before target
   * @param {HTMLElement} target
   * @param {HTMLElement} element
   */
  var insertBefore = function (target, element) { return insertNode(target, element, 'before'); };
  /**
   * Insert after target
   * @param {HTMLElement} target
   * @param {HTMLElement} element
   */
  var insertAfter = function (target, element) { return insertNode(target, element, 'after'); };

  /* eslint-env browser */
  /**
   * Filter only wanted nodes
   * @param {HTMLElement} sortableContainer
   * @param {Function} customSerializer
   * @returns {Array}
   */
  var serialize = (function (sortableContainer, customItemSerializer, customContainerSerializer) {
      if (customItemSerializer === void 0) { customItemSerializer = function (serializedItem, sortableContainer) { return serializedItem; }; }
      if (customContainerSerializer === void 0) { customContainerSerializer = function (serializedContainer) { return serializedContainer; }; }
      // check for valid sortableContainer
      if (!(sortableContainer instanceof HTMLElement) || !sortableContainer.isSortable === true) {
          throw new Error('You need to provide a sortableContainer to be serialized.');
      }
      // check for valid serializers
      if (typeof customItemSerializer !== 'function' || typeof customContainerSerializer !== 'function') {
          throw new Error('You need to provide a valid serializer for items and the container.');
      }
      // get options
      var options = addData(sortableContainer, 'opts');
      var item = options.items;
      // serialize container
      var items = filter(sortableContainer.children, item);
      var serializedItems = items.map(function (item) {
          return {
              parent: sortableContainer,
              node: item,
              html: item.outerHTML,
              index: getIndex(item, items)
          };
      });
      // serialize container
      var container = {
          node: sortableContainer,
          itemCount: serializedItems.length
      };
      return {
          container: customContainerSerializer(container),
          items: serializedItems.map(function (item) { return customItemSerializer(item, sortableContainer); })
      };
  });

  /* eslint-env browser */
  /**
   * create a placeholder element
   * @param {HTMLElement} sortableElement a single sortable
   * @param {string|undefined} placeholder a string representing an html element
   * @param {string} placeholderClasses a string representing the classes that should be added to the placeholder
   */
  var makePlaceholder = (function (sortableElement, placeholder, placeholderClass) {
      var _a;
      if (placeholderClass === void 0) { placeholderClass = 'sortable-placeholder'; }
      if (!(sortableElement instanceof HTMLElement)) {
          throw new Error('You must provide a valid element as a sortable.');
      }
      // if placeholder is not an element
      if (!(placeholder instanceof HTMLElement) && placeholder !== undefined) {
          throw new Error('You must provide a valid element as a placeholder or set ot to undefined.');
      }
      // if no placeholder element is given
      if (placeholder === undefined) {
          if (['UL', 'OL'].includes(sortableElement.tagName)) {
              placeholder = document.createElement('li');
          }
          else if (['TABLE', 'TBODY'].includes(sortableElement.tagName)) {
              placeholder = document.createElement('tr');
              // set colspan to always all rows, otherwise the item can only be dropped in first column
              placeholder.innerHTML = '<td colspan="100"></td>';
          }
          else {
              placeholder = document.createElement('div');
          }
      }
      // add classes to placeholder
      if (typeof placeholderClass === 'string') {
          (_a = placeholder.classList).add.apply(_a, placeholderClass.split(' '));
      }
      return placeholder;
  });

  /* eslint-env browser */
  /**
   * Get height of an element including padding
   * @param {HTMLElement} element an dom element
   */
  var getElementHeight = (function (element) {
      if (!(element instanceof HTMLElement)) {
          throw new Error('You must provide a valid dom element');
      }
      // get calculated style of element
      var style = window.getComputedStyle(element);
      // get only height if element has box-sizing: border-box specified
      if (style.getPropertyValue('box-sizing') === 'border-box') {
          return parseInt(style.getPropertyValue('height'), 10);
      }
      // pick applicable properties, convert to int and reduce by adding
      return ['height', 'padding-top', 'padding-bottom']
          .map(function (key) {
          var int = parseInt(style.getPropertyValue(key), 10);
          return isNaN(int) ? 0 : int;
      })
          .reduce(function (sum, value) { return sum + value; });
  });

  /* eslint-env browser */
  /**
   * Get width of an element including padding
   * @param {HTMLElement} element an dom element
   */
  var getElementWidth = (function (element) {
      if (!(element instanceof HTMLElement)) {
          throw new Error('You must provide a valid dom element');
      }
      // get calculated style of element
      var style = window.getComputedStyle(element);
      // pick applicable properties, convert to int and reduce by adding
      return ['width', 'padding-left', 'padding-right']
          .map(function (key) {
          var int = parseInt(style.getPropertyValue(key), 10);
          return isNaN(int) ? 0 : int;
      })
          .reduce(function (sum, value) { return sum + value; });
  });

  /* eslint-env browser */
  /**
   * get handle or return item
   * @param {Array<HTMLElement>} items
   * @param {string} selector
   */
  var getHandles = (function (items, selector) {
      if (!(items instanceof Array)) {
          throw new Error('You must provide a Array of HTMLElements to be filtered.');
      }
      if (typeof selector !== 'string') {
          return items;
      }
      return items
          // remove items without handle from array
          .filter(function (item) {
          return item.querySelector(selector) instanceof HTMLElement ||
              (item.shadowRoot && item.shadowRoot.querySelector(selector) instanceof HTMLElement);
      })
          // replace item with handle in array
          .map(function (item) {
          return item.querySelector(selector) || (item.shadowRoot && item.shadowRoot.querySelector(selector));
      });
  });

  /**
   * @param {Event} event
   * @returns {HTMLElement}
   */
  var getEventTarget = (function (event) {
      return (event.composedPath && event.composedPath()[0]) || event.target;
  });

  /* eslint-env browser */
  /**
   * defaultDragImage returns the current item as dragged image
   * @param {HTMLElement} draggedElement - the item that the user drags
   * @param {object} elementOffset - an object with the offsets top, left, right & bottom
   * @param {Event} event - the original drag event object
   * @return {object} with element, posX and posY properties
   */
  var defaultDragImage = function (draggedElement, elementOffset, event) {
      return {
          element: draggedElement,
          posX: event.pageX - elementOffset.left,
          posY: event.pageY - elementOffset.top
      };
  };
  /**
   * attaches an element as the drag image to an event
   * @param {Event} event - the original drag event object
   * @param {HTMLElement} draggedElement - the item that the user drags
   * @param {Function} customDragImage - function to create a custom dragImage
   * @return void
   */
  var setDragImage = (function (event, draggedElement, customDragImage) {
      // check if event is provided
      if (!(event instanceof Event)) {
          throw new Error('setDragImage requires a DragEvent as the first argument.');
      }
      // check if draggedElement is provided
      if (!(draggedElement instanceof HTMLElement)) {
          throw new Error('setDragImage requires the dragged element as the second argument.');
      }
      // set default function of none provided
      if (!customDragImage) {
          customDragImage = defaultDragImage;
      }
      // check if setDragImage method is available
      if (event.dataTransfer && event.dataTransfer.setDragImage) {
          // get the elements offset
          var elementOffset = offset(draggedElement);
          // get the dragImage
          var dragImage = customDragImage(draggedElement, elementOffset, event);
          // check if custom function returns correct values
          if (!(dragImage.element instanceof HTMLElement) || typeof dragImage.posX !== 'number' || typeof dragImage.posY !== 'number') {
              throw new Error('The customDragImage function you provided must return and object with the properties element[string], posX[integer], posY[integer].');
          }
          // needs to be set for HTML5 drag & drop to work
          event.dataTransfer.effectAllowed = 'copyMove';
          // Firefox requires it to use the event target's id for the data
          event.dataTransfer.setData('text/plain', getEventTarget(event).id);
          // set the drag image on the event
          event.dataTransfer.setDragImage(dragImage.element, dragImage.posX, dragImage.posY);
      }
  });

  /**
   * Check if curList accepts items from destList
   * @param {sortable} destination the container an item is move to
   * @param {sortable} origin the container an item comes from
   */
  var listsConnected = (function (destination, origin) {
      // check if valid sortable
      if (destination.isSortable === true) {
          var acceptFrom = store(destination).getConfig('acceptFrom');
          // check if acceptFrom is valid
          if (acceptFrom !== null && acceptFrom !== false && typeof acceptFrom !== 'string') {
              throw new Error('HTML5Sortable: Wrong argument, "acceptFrom" must be "null", "false", or a valid selector string.');
          }
          if (acceptFrom !== null) {
              return acceptFrom !== false && acceptFrom.split(',').filter(function (sel) {
                  return sel.length > 0 && origin.matches(sel);
              }).length > 0;
          }
          // drop in same list
          if (destination === origin) {
              return true;
          }
          // check if lists are connected with connectWith
          if (store(destination).getConfig('connectWith') !== undefined && store(destination).getConfig('connectWith') !== null) {
              return store(destination).getConfig('connectWith') === store(origin).getConfig('connectWith');
          }
      }
      return false;
  });

  /**
   * default configurations
   */
  var defaultConfiguration = {
      items: null,
      // deprecated
      connectWith: null,
      // deprecated
      disableIEFix: null,
      acceptFrom: null,
      copy: false,
      placeholder: null,
      placeholderClass: 'sortable-placeholder',
      draggingClass: 'sortable-dragging',
      hoverClass: false,
      dropTargetContainerClass: false,
      debounce: 0,
      throttleTime: 100,
      maxItems: 0,
      itemSerializer: undefined,
      containerSerializer: undefined,
      customDragImage: null,
      orientation: 'vertical'
  };

  /**
   * make sure a function is only called once within the given amount of time
   * @param {Function} fn the function to throttle
   * @param {number} threshold time limit for throttling
   */
  // must use function to keep this context
  function throttle (fn, threshold) {
      var _this = this;
      if (threshold === void 0) { threshold = 250; }
      // check function
      if (typeof fn !== 'function') {
          throw new Error('You must provide a function as the first argument for throttle.');
      }
      // check threshold
      if (typeof threshold !== 'number') {
          throw new Error('You must provide a number as the second argument for throttle.');
      }
      var lastEventTimestamp = null;
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var now = Date.now();
          if (lastEventTimestamp === null || now - lastEventTimestamp >= threshold) {
              lastEventTimestamp = now;
              fn.apply(_this, args);
          }
      };
  }

  /* eslint-env browser */
  /**
   * enable or disable hoverClass on mouseenter/leave if container Items
   * @param {sortable} sortableContainer a valid sortableContainer
   * @param {boolean} enable enable or disable event
   */
  var enableHoverClass = (function (sortableContainer, enable) {
      if (typeof store(sortableContainer).getConfig('hoverClass') === 'string') {
          var hoverClasses_1 = store(sortableContainer).getConfig('hoverClass').split(' ');
          // add class on hover
          if (enable === true) {
              addEventListener(sortableContainer, 'mousemove', throttle(function (event) {
                  // check of no mouse button was pressed when mousemove started == no drag
                  if (event.buttons === 0) {
                      filter(sortableContainer.children, store(sortableContainer).getConfig('items')).forEach(function (item) {
                          var _a, _b;
                          if (item !== event.target) {
                              (_a = item.classList).remove.apply(_a, hoverClasses_1);
                          }
                          else {
                              (_b = item.classList).add.apply(_b, hoverClasses_1);
                          }
                      });
                  }
              }, store(sortableContainer).getConfig('throttleTime')));
              // remove class on leave
              addEventListener(sortableContainer, 'mouseleave', function () {
                  filter(sortableContainer.children, store(sortableContainer).getConfig('items')).forEach(function (item) {
                      var _a;
                      (_a = item.classList).remove.apply(_a, hoverClasses_1);
                  });
              });
              // remove events
          }
          else {
              removeEventListener(sortableContainer, 'mousemove');
              removeEventListener(sortableContainer, 'mouseleave');
          }
      }
  });

  /* eslint-env browser */
  /*
   * variables global to the plugin
   */
  var dragging;
  var draggingHeight;
  var draggingWidth;
  /*
   * Keeps track of the initialy selected list, where 'dragstart' event was triggered
   * It allows us to move the data in between individual Sortable List instances
   */
  // Origin List - data from before any item was changed
  var originContainer;
  var originIndex;
  var originElementIndex;
  var originItemsBeforeUpdate;
  // Previous Sortable Container - we dispatch as sortenter event when a
  // dragged item enters a sortableContainer for the first time
  var previousContainer;
  // Destination List - data from before any item was changed
  var destinationItemsBeforeUpdate;
  /**
   * remove event handlers from items
   * @param {Array|NodeList} items
   */
  var removeItemEvents = function (items) {
      removeEventListener(items, 'dragstart');
      removeEventListener(items, 'dragend');
      removeEventListener(items, 'dragover');
      removeEventListener(items, 'dragenter');
      removeEventListener(items, 'drop');
      removeEventListener(items, 'mouseenter');
      removeEventListener(items, 'mouseleave');
  };
  // Remove container events
  var removeContainerEvents = function (originContainer, previousContainer) {
      if (originContainer) {
          removeEventListener(originContainer, 'dragleave');
      }
      if (previousContainer && (previousContainer !== originContainer)) {
          removeEventListener(previousContainer, 'dragleave');
      }
  };
  /**
   * getDragging returns the current element to drag or
   * a copy of the element.
   * Is Copy Active for sortable
   * @param {HTMLElement} draggedItem - the item that the user drags
   * @param {HTMLElement} sortable a single sortable
   */
  var getDragging = function (draggedItem, sortable) {
      var ditem = draggedItem;
      if (store(sortable).getConfig('copy') === true) {
          ditem = draggedItem.cloneNode(true);
          addAttribute(ditem, 'aria-copied', 'true');
          draggedItem.parentElement.appendChild(ditem);
          ditem.style.display = 'none';
          ditem.oldDisplay = draggedItem.style.display;
      }
      return ditem;
  };
  /**
   * Remove data from sortable
   * @param {HTMLElement} sortable a single sortable
   */
  var removeSortableData = function (sortable) {
      removeData(sortable);
      removeAttribute(sortable, 'aria-dropeffect');
  };
  /**
   * Remove data from items
   * @param {Array<HTMLElement>|HTMLElement} items
   */
  var removeItemData = function (items) {
      removeAttribute(items, 'aria-grabbed');
      removeAttribute(items, 'aria-copied');
      removeAttribute(items, 'draggable');
      removeAttribute(items, 'role');
  };
  /**
   * find sortable from element. travels up parent element until found or null.
   * @param {HTMLElement} element a single sortable
   * @param {Event} event - the current event. We need to pass it to be able to
   * find Sortable whith shadowRoot (document fragment has no parent)
   */
  function findSortable(element, event) {
      if (event.composedPath) {
          return event.composedPath().find(function (el) { return el.isSortable; });
      }
      while (element.isSortable !== true) {
          element = element.parentElement;
      }
      return element;
  }
  /**
   * Dragging event is on the sortable element. finds the top child that
   * contains the element.
   * @param {HTMLElement} sortableElement a single sortable
   * @param {HTMLElement} element is that being dragged
   */
  function findDragElement(sortableElement, element) {
      var options = addData(sortableElement, 'opts');
      var items = filter(sortableElement.children, options.items);
      var itemlist = items.filter(function (ele) {
          return ele.contains(element) || (ele.shadowRoot && ele.shadowRoot.contains(element));
      });
      return itemlist.length > 0 ? itemlist[0] : element;
  }
  /**
   * Destroy the sortable
   * @param {HTMLElement} sortableElement a single sortable
   */
  var destroySortable = function (sortableElement) {
      var opts = addData(sortableElement, 'opts') || {};
      var items = filter(sortableElement.children, opts.items);
      var handles = getHandles(items, opts.handle);
      // disable adding hover class
      enableHoverClass(sortableElement, false);
      // remove event handlers & data from sortable
      removeEventListener(sortableElement, 'dragover');
      removeEventListener(sortableElement, 'dragenter');
      removeEventListener(sortableElement, 'dragstart');
      removeEventListener(sortableElement, 'dragend');
      removeEventListener(sortableElement, 'drop');
      // remove event data from sortable
      removeSortableData(sortableElement);
      // remove event handlers & data from items
      removeEventListener(handles, 'mousedown');
      removeItemEvents(items);
      removeItemData(items);
      removeContainerEvents(originContainer, previousContainer);
      // clear sortable flag
      sortableElement.isSortable = false;
  };
  /**
   * Enable the sortable
   * @param {HTMLElement} sortableElement a single sortable
   */
  var enableSortable = function (sortableElement) {
      var opts = addData(sortableElement, 'opts');
      var items = filter(sortableElement.children, opts.items);
      var handles = getHandles(items, opts.handle);
      addAttribute(sortableElement, 'aria-dropeffect', 'move');
      addData(sortableElement, '_disabled', 'false');
      addAttribute(handles, 'draggable', 'true');
      // enable hover class
      enableHoverClass(sortableElement, true);
      // @todo: remove this fix
      // IE FIX for ghost
      // can be disabled as it has the side effect that other events
      // (e.g. click) will be ignored
      if (opts.disableIEFix === false) {
          var spanEl = (document || window.document).createElement('span');
          if (typeof spanEl.dragDrop === 'function') {
              addEventListener(handles, 'mousedown', function () {
                  if (items.indexOf(this) !== -1) {
                      this.dragDrop();
                  }
                  else {
                      var parent = this.parentElement;
                      while (items.indexOf(parent) === -1) {
                          parent = parent.parentElement;
                      }
                      parent.dragDrop();
                  }
              });
          }
      }
  };
  /**
   * Disable the sortable
   * @param {HTMLElement} sortableElement a single sortable
   */
  var disableSortable = function (sortableElement) {
      var opts = addData(sortableElement, 'opts');
      var items = filter(sortableElement.children, opts.items);
      var handles = getHandles(items, opts.handle);
      addAttribute(sortableElement, 'aria-dropeffect', 'none');
      addData(sortableElement, '_disabled', 'true');
      addAttribute(handles, 'draggable', 'false');
      removeEventListener(handles, 'mousedown');
      enableHoverClass(sortableElement, false);
  };
  /**
   * Reload the sortable
   * @param {HTMLElement} sortableElement a single sortable
   * @description events need to be removed to not be double bound
   */
  var reloadSortable = function (sortableElement) {
      var opts = addData(sortableElement, 'opts');
      var items = filter(sortableElement.children, opts.items);
      var handles = getHandles(items, opts.handle);
      addData(sortableElement, '_disabled', 'false');
      // remove event handlers from items
      removeItemEvents(items);
      removeContainerEvents(originContainer, previousContainer);
      removeEventListener(handles, 'mousedown');
      // remove event handlers from sortable
      removeEventListener(sortableElement, 'dragover');
      removeEventListener(sortableElement, 'dragenter');
      removeEventListener(sortableElement, 'drop');
  };
  /**
   * Public sortable object
   * @param {Array|NodeList} sortableElements
   * @param {object|string} options|method
   */
  function sortable(sortableElements, options) {
      // get method string to see if a method is called
      var method = String(options);
      options = options || {};
      // check if the user provided a selector instead of an element
      if (typeof sortableElements === 'string') {
          sortableElements = document.querySelectorAll(sortableElements);
      }
      // if the user provided an element, return it in an array to keep the return value consistant
      if (sortableElements instanceof HTMLElement) {
          sortableElements = [sortableElements];
      }
      sortableElements = Array.prototype.slice.call(sortableElements);
      if (/serialize/.test(method)) {
          return sortableElements.map(function (sortableContainer) {
              var opts = addData(sortableContainer, 'opts');
              return serialize(sortableContainer, opts.itemSerializer, opts.containerSerializer);
          });
      }
      sortableElements.forEach(function (sortableElement) {
          if (/enable|disable|destroy/.test(method)) {
              return sortable[method](sortableElement);
          }
          // log deprecation
          ['connectWith', 'disableIEFix'].forEach(function (configKey) {
              if (Object.prototype.hasOwnProperty.call(options, configKey) && options[configKey] !== null) {
                  console.warn("HTML5Sortable: You are using the deprecated configuration \"" + configKey + "\". This will be removed in an upcoming version, make sure to migrate to the new options when updating.");
              }
          });
          // merge options with default options
          options = Object.assign({}, defaultConfiguration, store(sortableElement).config, options);
          // init data store for sortable
          store(sortableElement).config = options;
          // set options on sortable
          addData(sortableElement, 'opts', options);
          // property to define as sortable
          sortableElement.isSortable = true;
          // reset sortable
          reloadSortable(sortableElement);
          // initialize
          var listItems = filter(sortableElement.children, options.items);
          // create element if user defined a placeholder element as a string
          var customPlaceholder;
          if (options.placeholder !== null && options.placeholder !== undefined) {
              var tempContainer = document.createElement(sortableElement.tagName);
              if (options.placeholder instanceof HTMLElement) {
                  tempContainer.appendChild(options.placeholder);
              }
              else {
                  tempContainer.innerHTML = options.placeholder;
              }
              customPlaceholder = tempContainer.children[0];
          }
          // add placeholder
          store(sortableElement).placeholder = makePlaceholder(sortableElement, customPlaceholder, options.placeholderClass);
          addData(sortableElement, 'items', options.items);
          if (options.acceptFrom) {
              addData(sortableElement, 'acceptFrom', options.acceptFrom);
          }
          else if (options.connectWith) {
              addData(sortableElement, 'connectWith', options.connectWith);
          }
          enableSortable(sortableElement);
          addAttribute(listItems, 'role', 'option');
          addAttribute(listItems, 'aria-grabbed', 'false');
          /*
           Handle drag events on draggable items
           Handle is set at the sortableElement level as it will bubble up
           from the item
           */
          addEventListener(sortableElement, 'dragstart', function (e) {
              // ignore dragstart events
              var target = getEventTarget(e);
              if (target.isSortable === true) {
                  return;
              }
              e.stopImmediatePropagation();
              if ((options.handle && !target.matches(options.handle)) || target.getAttribute('draggable') === 'false') {
                  return;
              }
              var sortableContainer = findSortable(target, e);
              var dragItem = findDragElement(sortableContainer, target);
              // grab values
              originItemsBeforeUpdate = filter(sortableContainer.children, options.items);
              originIndex = originItemsBeforeUpdate.indexOf(dragItem);
              originElementIndex = getIndex(dragItem, sortableContainer.children);
              originContainer = sortableContainer;
              // add transparent clone or other ghost to cursor
              setDragImage(e, dragItem, options.customDragImage);
              // cache selsection & add attr for dragging
              draggingHeight = getElementHeight(dragItem);
              draggingWidth = getElementWidth(dragItem);
              dragItem.classList.add(options.draggingClass);
              dragging = getDragging(dragItem, sortableContainer);
              addAttribute(dragging, 'aria-grabbed', 'true');
              // dispatch sortstart event on each element in group
              sortableContainer.dispatchEvent(new CustomEvent('sortstart', {
                  detail: {
                      origin: {
                          elementIndex: originElementIndex,
                          index: originIndex,
                          container: originContainer
                      },
                      item: dragging,
                      originalTarget: target
                  }
              }));
          });
          /*
           We are capturing targetSortable before modifications with 'dragenter' event
          */
          addEventListener(sortableElement, 'dragenter', function (e) {
              var target = getEventTarget(e);
              var sortableContainer = findSortable(target, e);
              if (sortableContainer && sortableContainer !== previousContainer) {
                  destinationItemsBeforeUpdate = filter(sortableContainer.children, addData(sortableContainer, 'items'))
                      .filter(function (item) { return item !== store(sortableElement).placeholder; });
                  if (options.dropTargetContainerClass) {
                      sortableContainer.classList.add(options.dropTargetContainerClass);
                  }
                  sortableContainer.dispatchEvent(new CustomEvent('sortenter', {
                      detail: {
                          origin: {
                              elementIndex: originElementIndex,
                              index: originIndex,
                              container: originContainer
                          },
                          destination: {
                              container: sortableContainer,
                              itemsBeforeUpdate: destinationItemsBeforeUpdate
                          },
                          item: dragging,
                          originalTarget: target
                      }
                  }));
                  addEventListener(sortableContainer, 'dragleave', function (e) {
                      // TODO: rename outTarget to be more self-explanatory
                      // e.fromElement for very old browsers, similar to relatedTarget
                      var outTarget = e.relatedTarget || e.fromElement;
                      if (!e.currentTarget.contains(outTarget)) {
                          if (options.dropTargetContainerClass) {
                              sortableContainer.classList.remove(options.dropTargetContainerClass);
                          }
                          sortableContainer.dispatchEvent(new CustomEvent('sortleave', {
                              detail: {
                                  origin: {
                                      elementIndex: originElementIndex,
                                      index: originIndex,
                                      container: sortableContainer
                                  },
                                  item: dragging,
                                  originalTarget: target
                              }
                          }));
                      }
                  });
              }
              previousContainer = sortableContainer;
          });
          /*
           * Dragend Event - https://developer.mozilla.org/en-US/docs/Web/Events/dragend
           * Fires each time dragEvent end, or ESC pressed
           * We are using it to clean up any draggable elements and placeholders
           */
          addEventListener(sortableElement, 'dragend', function (e) {
              if (!dragging) {
                  return;
              }
              dragging.classList.remove(options.draggingClass);
              addAttribute(dragging, 'aria-grabbed', 'false');
              if (dragging.getAttribute('aria-copied') === 'true' && addData(dragging, 'dropped') !== 'true') {
                  dragging.remove();
              }
              dragging.style.display = dragging.oldDisplay;
              delete dragging.oldDisplay;
              var visiblePlaceholder = Array.from(stores.values()).map(function (data) { return data.placeholder; })
                  .filter(function (placeholder) { return placeholder instanceof HTMLElement; })
                  .filter(isInDom)[0];
              if (visiblePlaceholder) {
                  visiblePlaceholder.remove();
              }
              // dispatch sortstart event on each element in group
              sortableElement.dispatchEvent(new CustomEvent('sortstop', {
                  detail: {
                      origin: {
                          elementIndex: originElementIndex,
                          index: originIndex,
                          container: originContainer
                      },
                      item: dragging
                  }
              }));
              previousContainer = null;
              dragging = null;
              draggingHeight = null;
              draggingWidth = null;
          });
          /*
           * Drop Event - https://developer.mozilla.org/en-US/docs/Web/Events/drop
           * Fires when valid drop target area is hit
           */
          addEventListener(sortableElement, 'drop', function (e) {
              if (!listsConnected(sortableElement, dragging.parentElement)) {
                  return;
              }
              e.preventDefault();
              e.stopPropagation();
              addData(dragging, 'dropped', 'true');
              // get the one placeholder that is currently visible
              var visiblePlaceholder = Array.from(stores.values()).map(function (data) {
                  return data.placeholder;
              })
                  // filter only HTMLElements
                  .filter(function (placeholder) { return placeholder instanceof HTMLElement; })
                  // only elements in DOM
                  .filter(isInDom)[0];
              // attach element after placeholder
              insertAfter(visiblePlaceholder, dragging);
              // remove placeholder from dom
              visiblePlaceholder.remove();
              /*
               * Fires Custom Event - 'sortstop'
               */
              sortableElement.dispatchEvent(new CustomEvent('sortstop', {
                  detail: {
                      origin: {
                          elementIndex: originElementIndex,
                          index: originIndex,
                          container: originContainer
                      },
                      item: dragging
                  }
              }));
              var placeholder = store(sortableElement).placeholder;
              var originItems = filter(originContainer.children, options.items)
                  .filter(function (item) { return item !== placeholder; });
              var destinationContainer = this.isSortable === true ? this : this.parentElement;
              var destinationItems = filter(destinationContainer.children, addData(destinationContainer, 'items'))
                  .filter(function (item) { return item !== placeholder; });
              var destinationElementIndex = getIndex(dragging, Array.from(dragging.parentElement.children)
                  .filter(function (item) { return item !== placeholder; }));
              var destinationIndex = getIndex(dragging, destinationItems);
              if (options.dropTargetContainerClass) {
                  destinationContainer.classList.remove(options.dropTargetContainerClass);
              }
              /*
               * When a list item changed container lists or index within a list
               * Fires Custom Event - 'sortupdate'
               */
              if (originElementIndex !== destinationElementIndex || originContainer !== destinationContainer) {
                  sortableElement.dispatchEvent(new CustomEvent('sortupdate', {
                      detail: {
                          origin: {
                              elementIndex: originElementIndex,
                              index: originIndex,
                              container: originContainer,
                              itemsBeforeUpdate: originItemsBeforeUpdate,
                              items: originItems
                          },
                          destination: {
                              index: destinationIndex,
                              elementIndex: destinationElementIndex,
                              container: destinationContainer,
                              itemsBeforeUpdate: destinationItemsBeforeUpdate,
                              items: destinationItems
                          },
                          item: dragging
                      }
                  }));
              }
          });
          var debouncedDragOverEnter = debounce(function (sortableElement, element, pageX, pageY) {
              if (!dragging) {
                  return;
              }
              // set placeholder height if forcePlaceholderSize option is set
              if (options.forcePlaceholderSize) {
                  store(sortableElement).placeholder.style.height = draggingHeight + 'px';
                  store(sortableElement).placeholder.style.width = draggingWidth + 'px';
              }
              // if element the draggedItem is dragged onto is within the array of all elements in list
              // (not only items, but also disabled, etc.)
              if (Array.from(sortableElement.children).indexOf(element) > -1) {
                  var thisHeight = getElementHeight(element);
                  var thisWidth = getElementWidth(element);
                  var placeholderIndex = getIndex(store(sortableElement).placeholder, element.parentElement.children);
                  var thisIndex = getIndex(element, element.parentElement.children);
                  // Check if `element` is bigger than the draggable. If it is, we have to define a dead zone to prevent flickering
                  if (thisHeight > draggingHeight || thisWidth > draggingWidth) {
                      // Dead zone?
                      var deadZoneVertical = thisHeight - draggingHeight;
                      var deadZoneHorizontal = thisWidth - draggingWidth;
                      var offsetTop = offset(element).top;
                      var offsetLeft = offset(element).left;
                      if (placeholderIndex < thisIndex &&
                          ((options.orientation === 'vertical' && pageY < offsetTop) ||
                              (options.orientation === 'horizontal' && pageX < offsetLeft))) {
                          return;
                      }
                      if (placeholderIndex > thisIndex &&
                          ((options.orientation === 'vertical' && pageY > offsetTop + thisHeight - deadZoneVertical) ||
                              (options.orientation === 'horizontal' && pageX > offsetLeft + thisWidth - deadZoneHorizontal))) {
                          return;
                      }
                  }
                  if (dragging.oldDisplay === undefined) {
                      dragging.oldDisplay = dragging.style.display;
                  }
                  if (dragging.style.display !== 'none') {
                      dragging.style.display = 'none';
                  }
                  // To avoid flicker, determine where to position the placeholder
                  // based on where the mouse pointer is relative to the elements
                  // vertical center.
                  var placeAfter = false;
                  try {
                      var elementMiddleVertical = offset(element).top + element.offsetHeight / 2;
                      var elementMiddleHorizontal = offset(element).left + element.offsetWidth / 2;
                      placeAfter = (options.orientation === 'vertical' && (pageY >= elementMiddleVertical)) ||
                          (options.orientation === 'horizontal' && (pageX >= elementMiddleHorizontal));
                  }
                  catch (e) {
                      placeAfter = placeholderIndex < thisIndex;
                  }
                  if (placeAfter) {
                      insertAfter(element, store(sortableElement).placeholder);
                  }
                  else {
                      insertBefore(element, store(sortableElement).placeholder);
                  }
                  // get placeholders from all stores & remove all but current one
                  Array.from(stores.values())
                      // remove empty values
                      .filter(function (data) { return data.placeholder !== undefined; })
                      // foreach placeholder in array if outside of current sorableContainer -> remove from DOM
                      .forEach(function (data) {
                      if (data.placeholder !== store(sortableElement).placeholder) {
                          data.placeholder.remove();
                      }
                  });
              }
              else {
                  // get all placeholders from store
                  var placeholders = Array.from(stores.values())
                      .filter(function (data) { return data.placeholder !== undefined; })
                      .map(function (data) {
                      return data.placeholder;
                  });
                  // check if element is not in placeholders
                  if (placeholders.indexOf(element) === -1 && sortableElement === element && !filter(element.children, options.items).length) {
                      placeholders.forEach(function (element) { return element.remove(); });
                      element.appendChild(store(sortableElement).placeholder);
                  }
              }
          }, options.debounce);
          // Handle dragover and dragenter events on draggable items
          var onDragOverEnter = function (e) {
              var element = e.target;
              var sortableElement = element.isSortable === true ? element : findSortable(element, e);
              element = findDragElement(sortableElement, element);
              if (!dragging || !listsConnected(sortableElement, dragging.parentElement) || addData(sortableElement, '_disabled') === 'true') {
                  return;
              }
              var options = addData(sortableElement, 'opts');
              if (parseInt(options.maxItems) && filter(sortableElement.children, addData(sortableElement, 'items')).length >= parseInt(options.maxItems) && dragging.parentElement !== sortableElement) {
                  return;
              }
              e.preventDefault();
              e.stopPropagation();
              e.dataTransfer.dropEffect = store(sortableElement).getConfig('copy') === true ? 'copy' : 'move';
              debouncedDragOverEnter(sortableElement, element, e.pageX, e.pageY);
          };
          addEventListener(listItems.concat(sortableElement), 'dragover', onDragOverEnter);
          addEventListener(listItems.concat(sortableElement), 'dragenter', onDragOverEnter);
      });
      return sortableElements;
  }
  sortable.destroy = function (sortableElement) {
      destroySortable(sortableElement);
  };
  sortable.enable = function (sortableElement) {
      enableSortable(sortableElement);
  };
  sortable.disable = function (sortableElement) {
      disableSortable(sortableElement);
  };
  /* START.TESTS_ONLY */
  sortable.__testing = {
      // add internal methods here for testing purposes
      data: addData,
      removeItemEvents: removeItemEvents,
      removeItemData: removeItemData,
      removeSortableData: removeSortableData,
      removeContainerEvents: removeContainerEvents
  };

  return sortable;

}());
