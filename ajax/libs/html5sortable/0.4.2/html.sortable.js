;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.sortable = factory();
  }
}(this, function() {
/*
 * HTML5 Sortable library
 * https://github.com/voidberg/html5sortable
 *
 * Original code copyright 2012 Ali Farhadi.
 * This version is mantained by Alexandru Badiu <andu@ctrlz.ro> & Lukas Oppermann <lukas@vea.re>
 * jQuery-independent implementation by Nazar Mokrynskyi <nazar@mokrynskyi.com>
 *
 * Released under the MIT license.
 */
'use strict';
/*
 * variables global to the plugin
 */
var dragging;
var draggingHeight;
var placeholders = [];
var sortables = [];
/**
 * Get or set data on element
 * @param {Element} element
 * @param {string} key
 * @param {*} value
 * @return {*}
 */
var _data = function(element, key, value) {
  if (value === undefined) {
    return element && element.h5s && element.h5s.data && element.h5s.data[key];
  } else {
    element.h5s = element.h5s || {};
    element.h5s.data = element.h5s.data || {};
    element.h5s.data[key] = value;
  }
};
/**
 * Remove data from element
 * @param {Element} element
 */
var _removeData = function(element) {
  if (element.h5s) {
    delete element.h5s.data;
  }
};
/**
 * Cross-browser shortcut for actual `Element.matches` method,
 * which has vendor prefix in older browsers
 */
var matches;
switch (true) {
  case 'matches' in window.Element.prototype:
    matches = 'matches';
    break;
  case 'mozMatchesSelector' in window.Element.prototype:
    matches = 'mozMatchesSelector';
    break;
  case 'msMatchesSelector' in window.Element.prototype:
    matches = 'msMatchesSelector';
    break;
  case 'webkitMatchesSelector' in window.Element.prototype:
    matches = 'webkitMatchesSelector';
    break;
}
/**
 * Filter only wanted nodes
 * @param {Array|NodeList} nodes
 * @param {Array/string} wanted
 * @returns {Array}
 */
var _filter = function(nodes, wanted) {
  if (!wanted) {
    return Array.prototype.slice.call(nodes);
  }
  var result = [];
  for (var i = 0; i < nodes.length; ++i) {
    if (typeof wanted === 'string' && nodes[i][matches](wanted)) {
      result.push(nodes[i]);
    }
    if (wanted.indexOf(nodes[i]) !== -1) {
      result.push(nodes[i]);
    }
  }
  return result;
};
/**
 * @param {Array|Element} element
 * @param {Array|string} event
 * @param {Function} callback
 */
var _on = function(element, event, callback) {
  if (element instanceof Array) {
    for (var i = 0; i < element.length; ++i) {
      _on(element[i], event, callback);
    }
    return;
  }
  element.addEventListener(event, callback);
  element.h5s = element.h5s || {};
  element.h5s.events = element.h5s.events || {};
  element.h5s.events[event] = callback;
};
/**
 * @param {Array|Element} element
 * @param {Array|string} event
 */
var _off = function(element, event) {
  if (element instanceof Array) {
    for (var i = 0; i < element.length; ++i) {
      _off(element[i], event);
    }
    return;
  }
  if (element.h5s && element.h5s.events && element.h5s.events[event]) {
    element.removeEventListener(event, element.h5s.events[event]);
    delete element.h5s.events[event];
  }
};
/**
 * @param {Array|Element} element
 * @param {string} attribute
 * @param {*} value
 */
var _attr = function(element, attribute, value) {
  if (element instanceof Array) {
    for (var i = 0; i < element.length; ++i) {
      _attr(element[i], attribute, value);
    }
    return;
  }
  element.setAttribute(attribute, value);
};
/**
 * @param {Array|Element} element
 * @param {string} attribute
 */
var _removeAttr = function(element, attribute) {
  if (element instanceof Array) {
    for (var i = 0; i < element.length; ++i) {
      _removeAttr(element[i], attribute);
    }
    return;
  }
  element.removeAttribute(attribute);
};
/**
 * @param {Element} element
 * @returns {{left: *, top: *}}
 */
var _offset = function(element) {
  var rect = element.getClientRects()[0];
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
};
/*
 * remove event handlers from items
 * @param {Array|NodeList} items
 */
var _removeItemEvents = function(items) {
  _off(items, 'dragstart');
  _off(items, 'dragend');
  _off(items, 'selectstart');
  _off(items, 'dragover');
  _off(items, 'dragenter');
  _off(items, 'drop');
};
/*
 * Remove event handlers from sortable
 * @param {Element} sortable a single sortable
 */
var _removeSortableEvents = function(sortable) {
  _off(sortable, 'dragover');
  _off(sortable, 'dragenter');
  _off(sortable, 'drop');
};
/*
 * Attach ghost to dataTransfer object
 * @param {Event} original event
 * @param {object} ghost-object with item, x and y coordinates
 */
var _attachGhost = function(event, ghost) {
  // this needs to be set for HTML5 drag & drop to work
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text', '');

  // check if setDragImage method is available
  if (event.dataTransfer.setDragImage) {
    event.dataTransfer.setDragImage(ghost.draggedItem, ghost.x, ghost.y);
  }
};
/**
 * _addGhostPos clones the dragged item and adds it as a Ghost item
 * @param {Event} event - the event fired when dragstart is triggered
 * @param {object} ghost - .draggedItem = Element
 */
var _addGhostPos = function(event, ghost) {
  if (!ghost.x) {
    ghost.x = parseInt(event.pageX - _offset(ghost.draggedItem).left);
  }
  if (!ghost.y) {
    ghost.y = parseInt(event.pageY - _offset(ghost.draggedItem).top);
  }
  return ghost;
};
/**
 * _makeGhost decides which way to make a ghost and passes it to attachGhost
 * @param {Element} draggedItem - the item that the user drags
 */
var _makeGhost = function(draggedItem) {
  return {
    draggedItem: draggedItem
  };
};
/**
 * _getGhost constructs ghost and attaches it to dataTransfer
 * @param {Event} event - the original drag event object
 * @param {Element} draggedItem - the item that the user drags
 */
// TODO: could draggedItem be replaced by event.target in all instances
var _getGhost = function(event, draggedItem) {
  // add ghost item & draggedItem to ghost object
  var ghost = _makeGhost(draggedItem);
  // attach ghost position
  ghost = _addGhostPos(event, ghost);
  // attach ghost to dataTransfer
  _attachGhost(event, ghost);
};
/*
 * Remove data from sortable
 * @param {Element} sortable a single sortable
 */
var _removeSortableData = function(sortable) {
  _removeData(sortable);
  _removeAttr(sortable, 'aria-dropeffect');
};
/*
 * Remove data from items
 * @param {Array|Element} items
 */
var _removeItemData = function(items) {
  _removeAttr(items, 'aria-grabbed');
  _removeAttr(items, 'draggable');
  _removeAttr(items, 'role');
};
/*
 * Check if two lists are connected
 * @param {Element} curList
 * @param {Element} destList
 */
var _listsConnected = function(curList, destList) {
  if (curList === destList) {
    return true;
  }
  if (_data(curList, 'connectWith') !== undefined) {
    return _data(curList, 'connectWith') === _data(destList, 'connectWith');
  }
  return false;
};
var _getHandles = function(items, handle) {
  var result = [];
  var handles;
  if (!handle) {
    return items;
  }
  for (var i = 0; i < items.length; ++i) {
    handles = items[i].querySelectorAll(handle);
    result = result.concat(Array.prototype.slice.call(handles));
  }
  return result;
};
/*
 * Destroy the sortable
 * @param {Element} sortableElement a single sortable
 */
var _destroySortable = function(sortableElement) {
  var opts = _data(sortableElement, 'opts') || {};
  var items = _filter(sortableElement.children, opts.items);
  var handles = _getHandles(items, opts.handle);
  // remove event handlers & data from sortable
  _removeSortableEvents(sortableElement);
  _removeSortableData(sortableElement);
  // remove event handlers & data from items
  _off(handles, 'mousedown');
  _removeItemEvents(items);
  _removeItemData(items);
};
/*
 * Enable the sortable
 * @param {Element} sortableElement a single sortable
 */
var _enableSortable = function(sortableElement) {
  var opts = _data(sortableElement, 'opts');
  var items = _filter(sortableElement.children, opts.items);
  var handles = _getHandles(items, opts.handle);
  _attr(sortableElement, 'aria-dropeffect', 'move');
  _attr(handles, 'draggable', 'true');
  // IE FIX for ghost
  // can be disabled as it has the side effect that other events
  // (e.g. click) will be ignored
  var spanEl = (document || window.document).createElement('span');
  if (typeof spanEl.dragDrop === 'function' && !opts.disableIEFix) {
    _on(handles, 'mousedown', function() {
      if (items.indexOf(this) !== -1) {
        this.dragDrop();
      } else {
        var parent = this.parentElement;
        while (items.indexOf(parent) === -1) {
          parent = parent.parentElement;
        }
        parent.dragDrop();
      }
    });
  }
};
/*
 * Disable the sortable
 * @param {Element} sortableElement a single sortable
 */
var _disableSortable = function(sortableElement) {
  var opts = _data(sortableElement, 'opts');
  var items = _filter(sortableElement.children, opts.items);
  var handles = _getHandles(items, opts.handle);
  _attr(sortableElement, 'aria-dropeffect', 'none');
  _attr(handles, 'draggable', 'false');
  _off(handles, 'mousedown');
};
/*
 * Reload the sortable
 * @param {Element} sortableElement a single sortable
 * @description events need to be removed to not be double bound
 */
var _reloadSortable = function(sortableElement) {
  var opts = _data(sortableElement, 'opts');
  var items = _filter(sortableElement.children, opts.items);
  var handles = _getHandles(items, opts.handle);
  // remove event handlers from items
  _removeItemEvents(items);
  _off(handles, 'mousedown');
  // remove event handlers from sortable
  _removeSortableEvents(sortableElement);
};
/**
 * Get position of the element relatively to its sibling elements
 * @param {Element} element
 * @returns {number}
 */
var _index = function(element) {
  if (!element.parentElement) {
    return 0;
  }
  return Array.prototype.indexOf.call(element.parentElement.children, element);
};
/**
 * Whether element is in DOM
 * @param {Element} element
 * @returns {boolean}
 */
var _attached = function(element) {
  return !!element.parentNode;
};
/**
 * Convert HTML string into DOM element
 * @param {Element|string} html
 * @returns {Element}
 */
var _html2element = function(html) {
  if (typeof html !== 'string') {
    return html;
  }
  var div = document.createElement('div');
  div.innerHTML	= html;
  return div.firstChild;
};
/**
 * Insert before target
 * @param {Element} target
 * @param {Element} element
 */
var _before = function(target, element) {
  target.parentElement.insertBefore(
    element,
    target
  );
};
/**
 * Insert after target
 * @param {Element} target
 * @param {Element} element
 */
var _after = function(target, element) {
  target.parentElement.insertBefore(
    element,
    target.nextElementSibling
  );
};
/**
 * Detach element from DOM
 * @param {Element} element
 */
var _detach = function(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
};
/**
 * Make native event that can be dispatched afterwards
 * @param {string} name
 * @param {object} detail
 * @returns {CustomEvent}
 */
var _makeEvent = function(name, detail) {
  var e = document.createEvent('Event');
  if (detail) {
    e.detail = detail;
  }
  e.initEvent(name, false, true);
  return e;
};
/**
 * @param {Element} sortableElement
 * @param {CustomEvent} event
 */
var _dispatchEventOnConnected = function(sortableElement, event) {
  sortables.forEach(function(target) {
    if (_listsConnected(sortableElement, target)) {
      target.dispatchEvent(event);
    }
  });
};
/*
 * Public sortable object
 * @param {Array|NodeList} sortableElements
 * @param {object|string} options|method
 */
var sortable = function(sortableElements, options) {

  var method = String(options);

  options = (function(options) {
    var result = {
      connectWith: false,
      placeholder: null,
      // dragImage can be null or a Element
      dragImage: null,
      disableIEFix: false,
      placeholderClass: 'sortable-placeholder',
      draggingClass: 'sortable-dragging',
      hoverClass: false
    };
    for (var option in options) {
      result[option] = options[option];
    }
    return result;
  })(options);

  if (typeof sortableElements === 'string') {
    sortableElements = document.querySelectorAll(sortableElements);
  }

  if (sortableElements instanceof window.Element) {
    sortableElements = [sortableElements];
  }

  sortableElements = Array.prototype.slice.call(sortableElements);

  /* TODO: maxstatements should be 25, fix and remove line below */
  /*jshint maxstatements:false */
  sortableElements.forEach(function(sortableElement) {

    if (/enable|disable|destroy/.test(method)) {
      sortable[method](sortableElement);
      return;
    }

    // get options & set options on sortable
    options = _data(sortableElement, 'opts') || options;
    _data(sortableElement, 'opts', options);
    // reset sortable
    _reloadSortable(sortableElement);
    // initialize
    var items = _filter(sortableElement.children, options.items);
    var index;
    var startParent;
    var placeholder = options.placeholder;
    if (!placeholder) {
      placeholder = document.createElement(
        /^ul|ol$/i.test(sortableElement.tagName) ? 'li' : 'div'
      );
    }
    placeholder = _html2element(placeholder);
    placeholder.classList.add.apply(
      placeholder.classList,
      options.placeholderClass.split(' ')
    );

    // setup sortable ids
    if (!sortableElement.getAttribute('data-sortable-id')) {
      var id = sortables.length;
      sortables[id] = sortableElement;
      _attr(sortableElement, 'data-sortable-id', id);
      _attr(items, 'data-item-sortable-id', id);
    }

    _data(sortableElement, 'items', options.items);
    placeholders.push(placeholder);
    if (options.connectWith) {
      _data(sortableElement, 'connectWith', options.connectWith);
    }

    _enableSortable(sortableElement);
    _attr(items, 'role', 'option');
    _attr(items, 'aria-grabbed', 'false');

    // Mouse over class
    if (options.hoverClass) {
      var hoverClass = 'sortable-over';
      if (typeof options.hoverClass === 'string') {
        hoverClass = options.hoverClass;
      }

      _on(items, 'mouseenter', function() {
        this.classList.add(hoverClass);
      });
      _on(items, 'mouseleave', function() {
        this.classList.remove(hoverClass);
      });
    }

    // Handle drag events on draggable items
    _on(items, 'dragstart', function(e) {
      e.stopImmediatePropagation();

      if (options.dragImage) {
        _attachGhost(e, {
          draggedItem: options.dragImage,
          x: 0,
          y: 0
        });
        console.log('WARNING: dragImage option is deprecated' +
        ' and will be removed in the future!');
      } else {
        // add transparent clone or other ghost to cursor
        _getGhost(e, this);
      }
      // cache selsection & add attr for dragging
      this.classList.add(options.draggingClass);
      dragging = this;
      _attr(dragging, 'aria-grabbed', 'true');
      // grab values
      index = _index(dragging);
      draggingHeight = parseInt(window.getComputedStyle(dragging).height);
      startParent = this.parentElement;
      // dispatch sortstart event on each element in group
      _dispatchEventOnConnected(sortableElement, _makeEvent('sortstart', {
        item: dragging,
        placeholder: placeholder,
        startparent: startParent
      }));
    });
    // Handle drag events on draggable items
    _on(items, 'dragend', function() {
      var newParent;
      if (!dragging) {
        return;
      }
      // remove dragging attributes and show item
      dragging.classList.remove(options.draggingClass);
      _attr(dragging, 'aria-grabbed', 'false');
      dragging.style.display = dragging.oldDisplay;
      delete dragging.oldDisplay;

      placeholders.forEach(_detach);
      newParent = this.parentElement;
      _dispatchEventOnConnected(sortableElement, _makeEvent('sortstop', {
        item: dragging,
        startparent: startParent
      }));
      if (index !== _index(dragging) || startParent !== newParent) {
        _dispatchEventOnConnected(sortableElement, _makeEvent('sortupdate', {
          item: dragging,
          index: _filter(newParent.children, _data(newParent, 'items'))
            .indexOf(dragging),
          oldindex: items.indexOf(dragging),
          elementIndex: _index(dragging),
          oldElementIndex: index,
          startparent: startParent,
          endparent: newParent
        }));
      }
      dragging = null;
      draggingHeight = null;
    });
    // Handle drop event on sortable & placeholder
    // TODO: REMOVE placeholder?????
    _on([sortableElement, placeholder], 'drop', function(e) {
      var visiblePlaceholder;
      if (!_listsConnected(sortableElement, dragging.parentElement)) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      visiblePlaceholder = placeholders.filter(_attached)[0];
      _after(visiblePlaceholder, dragging);
      dragging.dispatchEvent(_makeEvent('dragend'));
    });

    // Handle dragover and dragenter events on draggable items
    var onDragOverEnter = function(e) {
      if (!_listsConnected(sortableElement, dragging.parentElement)) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'move';
      if (items.indexOf(this) !== -1) {
        var thisHeight = parseInt(window.getComputedStyle(this).height);
        var placeholderIndex = _index(placeholder);
        var thisIndex = _index(this);
        if (options.forcePlaceholderSize) {
          placeholder.style.height = draggingHeight + 'px';
        }

        // Check if `this` is bigger than the draggable. If it is, we have to define a dead zone to prevent flickering
        if (thisHeight > draggingHeight) {
          // Dead zone?
          var deadZone = thisHeight - draggingHeight;
          var offsetTop = _offset(this).top;
          if (placeholderIndex < thisIndex &&
              e.pageY < offsetTop + deadZone) {
            return;
          }
          if (placeholderIndex > thisIndex &&
              e.pageY > offsetTop + thisHeight - deadZone) {
            return;
          }
        }

        if (dragging.oldDisplay === undefined) {
          dragging.oldDisplay = dragging.style.display;
        }
        dragging.style.display = 'none';
        if (placeholderIndex < thisIndex) {
          _after(this, placeholder);
        } else {
          _before(this, placeholder);
        }
        // Intentionally violated chaining, it is more complex otherwise
        placeholders
          .filter(function(element) {return element !== placeholder;})
          .forEach(_detach);
      } else {
        if (placeholders.indexOf(this) === -1 &&
            !_filter(this.children, options.items).length) {
          placeholders.forEach(_detach);
          this.appendChild(placeholder);
        }
      }
    };
    _on(items.concat(sortableElement), 'dragover', onDragOverEnter);
    _on(items.concat(sortableElement), 'dragenter', onDragOverEnter);
  });

  return sortableElements;
};

sortable.destroy = function(sortableElement) {
  _destroySortable(sortableElement);
};

sortable.enable = function(sortableElement) {
  _enableSortable(sortableElement);
};

sortable.disable = function(sortableElement) {
  _disableSortable(sortableElement);
};


return sortable;
}));
