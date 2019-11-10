/**
 * Track your elements on the page like a boss.
 *
 * MIT licensed. By Afshin Mehrabani <afshin.meh@gmail.com>
 *
 * This project is a part of Kissui framework.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.kissuiPosition = factory());
    });
  } else {
    root.kissuiPosition = factory(root);
  }
}(this, function () {
  /**
  * To store all available elements with their options
  */
  var _elements = [];

  /**
  * EventListener
  */
  var _events = [];

  // scroll positions to calc the delta variable in _position function
  var _scrollTop = null;
  var _scrollLeft = null;

  /**
  * options
  */
  var _options = {
    //trigger the events on module init?
    //e.g. when an element is already in the viewport and there is a data-kui-position = "in"
    triggerOnInit: true,
    attribute: 'data-kui-position',
    // to use console.log instead of throw Error
    safeMode: false
  };

  /**
  * all possible events
  */
  _options.events = [
    'in',
    'out',
    'middle',
    'top',
    'bottom',
    'left',
    'center',
    'right'
  ];

  /**
  * Developer friendly console.log / throw Error
  *
  */
  function _error (msg) {
    msg = 'Kissui.position: ' + msg;

    if (_options.safeMode == true) {
      console.log(msg);
    } else {
      throw Error(msg);
    }
  };

  /**
  * Find elements or import them via options (later)
  */
  function _populate () {
    var elements = document.querySelectorAll('*[' + _options.attribute + ']');

    for (var i = 0;i < elements.length;i++) {
      var element = elements[i];
      var event = element.getAttribute(_options.attribute);

      _add(element, event);
    }
  };

  /**
  * Adds a new item to _elements array
  *
  */
  function _add (element, event) {
    var events = event.split(' ');
    // is this valid to add this element? e.g. you can't have `blahblah` as event name
    var valid = true;

    for (var i = 0; i < events.length; i++) {
      var ex = events[i];

      if (_options.events.indexOf(ex) == -1) {
        valid = false;
        break;
      }
    }

    if (valid) {
      _elements.push({
        element: element,
        event: event
      });
    } else {
      _error('Invalid event name: `' + event + '`. Skipping ' + element);
    }
  };

  /**
  * Removes all items in _elements
  */
  function _reset () {
     _elements = [];
  };

  /**
  * To bind an event to browser
  *
  */
  function _addEventListener (event, fn) {
    if (window.addEventListener) { // modern browsers including IE9+
      window.addEventListener(event, fn, false);
    } else if (window.attachEvent) { // IE8 and below
      window.attachEvent('on' + event, fn);
    }
  };

  function _between (n, pos, delta) {
    if (delta > 0) {
      if (pos < n && n < (pos + delta)) {
        return true;
      }
    } else {
      if (pos > n && n > (pos + delta)) {
        return true;
      }
    }

    return false;
  };

  /**
  * Check a single element position and return the correct event name
  *
  */
  function _position (element, event) {
    //because we can have compound events
    var elementEvents = event.split(' ');

    //a boolean flag to check if we should trigger the event
    var trigger = true;

    //element's position
    var top = element.getBoundingClientRect().top;
    var bottom = element.getBoundingClientRect().bottom;
    var left = element.getBoundingClientRect().left;
    var right = element.getBoundingClientRect().right;
    var elementHeight = element.getBoundingClientRect().height;
    var elementWidth = element.getBoundingClientRect().width;

    //browser's width and height
    var height = window.innerHeight || document.documentElement.clientHeight;
    // to get the width of viewport WITHOUT scrollbar
    var width = document.body.clientWidth || document.documentElement.clientWidth;

    var topDelta = document.body.scrollTop - _scrollTop;
    var leftDelta = document.body.scrollLeft - _scrollLeft;

    // check `in` event
    if (elementEvents.indexOf('in') > -1) {
     if (top >= 0 && left >= 0 && bottom <= height && right <= width) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `out` event
    if (elementEvents.indexOf('out') > -1) {
     if ((top + elementHeight) < 0 ||
         (left + elementWidth) < 0 ||
         left > width ||
         top > height) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `top` event
    if (elementEvents.indexOf('top') > -1) {
     if (top == 0 || _between(0, top, topDelta)) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `left` event
    if (elementEvents.indexOf('left') > -1) {
     if (left == 0 || _between(0, left, leftDelta)) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `right` event
    if (elementEvents.indexOf('right') > -1) {
     if (right == width || _between(width, right, leftDelta)) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `bottom` event
    if (elementEvents.indexOf('bottom') > -1) {
     if (bottom == height || _between(height, bottom, topDelta)) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `middle` event
    if (elementEvents.indexOf('middle') > -1) {
      if (top + (elementHeight / 2) == (height / 2) || _between((height / 2), top + (elementHeight / 2), topDelta)) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    // check `center` event
    if (elementEvents.indexOf('center') > -1) {
     if (left + (elementWidth / 2) == (width / 2) || _between((width / 2), left + (elementWidth / 2), leftDelta)) {
       trigger = trigger && true;
     } else {
       trigger = false;
     }
    }

    if (trigger) {
      if (element.getAttribute('id')) {
        _emit(element.getAttribute('id'), element);
      }
      _emit(event, element);
      _emit('*', element, event);
    }
  };

  /**
  * Checks a list of elements and emits the correct event name
  *
  */
  function _positions (elements) {
    for (var i = 0; i < elements.length; i++) {
      _position.call(this, elements[i].element, elements[i].event);
    };

    _scrollTop = document.body.scrollTop;
    _scrollLeft = document.body.scrollLeft;
  };

  /**
  * listen to an event
  */
  function _on (event, listener) {
    if (typeof _events[event] !== 'object') {
      _events[event] = [];
    }

    _events[event].push(listener);
  };

  /**
  * Emits an event
  */
  function _emit (event) {
    var i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof _events[event] === 'object') {
      listeners = _events[event].slice();
      length = listeners.length;

      for (i = 0; i < length; i++) {
        listeners[i].apply(this, args);
      }
    }
  };

  /**
  * Removes a listener
  */
  _removeListener = function (event, listener) {
    var idx;

    if (typeof _events[event] === 'object') {
      idx = _events[event].indexOf(listener);

      if (idx > -1) {
        _events[event].splice(idx, 1);
      }
    }
  };

  /**
  * Listen to an event once
  */
  function _once (event, listener) {
    _on(event, function fn () {
      _removeListener(event, fn);
      listener.apply(this, arguments);
    });
  };

  /**
  * Start the module
  */
  function _init () {
    _scrollTop = document.body.scrollTop;
    _scrollLeft = document.body.scrollLeft;

    _populate.call(this);

    if (_options.triggerOnInit == true) {
      _positions.call(this, _elements);
    }

    //after scrolling
    _addEventListener('scroll', _positions.bind(this, _elements));

    //after resizing the browser
    _addEventListener('resize', _positions.bind(this, _elements));
  };

  return {
    _options: _options,
    _elements: _elements,
    on: _on,
    once: _once,
    removeListener: _removeListener,
    init: _init,
    positions: _positions,
    add: _add,
    reset: _reset
  };
}));

/**
 * CSS3 scroll animation
 *
 * MIT licensed. By Afshin Mehrabani <afshin.meh@gmail.com>
 *
 * This project is a part of Kissui framework.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kissuiPosition'], function (kissuiPosition) {
      return (root.kissuiScrollAnim = factory(kissuiPosition));
    });
  } else {
    root.kissuiScrollAnim = factory(root.kissuiPosition);
  }
}(this, function (kissuiPosition) {

  /**
  * options
  */
  var _options = {
    // trigger the events on module init?
    triggerOnInit: true,
    // prefix for all `data-...` attributes
    attributePrefix: 'data-kui-',
    animAttribute: 'anim',
    // when to trigger the animation?
    eventAttribute: 'event',
    // default event to trigger
    defaultEvent: 'in',
    // reset the animation event after element is out of the viewport?
    // enabling this option triggers the event each time it appears in the viewport
    autoReset: true
  };

  /**
  * To store all available elements with their options
  */
  var _elements = [];

  /**
  * Get the attribute name
  *
  */
  function __(name) {
    return _options.attributePrefix + name;
  };

  /**
  * Find elements
  */
  function _populate () {
    //clear old elements first
    _elements = [];

    var elements = document.querySelectorAll('*[' + __(_options.animAttribute) + ']');

    for (var i = 0;i < elements.length;i++) {
      var param = {};
      var element = elements[i];
      var anim = element.getAttribute(__(_options.animAttribute));
      var event = element.getAttribute(__(_options.eventAttribute)) || 'in';

      param[event] = anim;

      _add(element, param);
    }
  };

  /**
  * Adds a new item to _elements array
  *
  * Sample event object:
  * {
  *   'in': 'fadeIn',
  *   'out': 'fadeOut'
  * }
  *
  * See kissui.position for more options to bind events.
  */
  function _add (element, event) {
    var eventObj = {};

    for (var e in event) {
      kissuiPosition.add(element, e);

      eventObj[e] = {
        animation: event[e],
        // adding active flag
        active: false
      };
    }

    kissuiPosition.add(element, 'out');

    // add visibility: hidden to the element
    element.style.opacity = '0';

    _elements.push({
      element: element,
      event: eventObj
    });
  };

  /**
  * Finds an element by looking into the _elements
  *
  */
  function _find (element) {
    for (var i = 0;i < _elements.length; i++) {
      var elx = _elements[i];

      if (element === elx.element) {
        return elx;
      }
    }

    return null;
  };

  /**
  * Attaching corresponded css3 class to the element
  *
  */
  function _attach (element, event) {
    for (var e in element.event) {
      if (e == event && element.event[e].active === false) {

        element.element.style.opacity = '1';
        element.element.className += ' animated ' + element.event[e].animation;


        (function (element, e) {
          _addEventListener(element.element, [
            'webkitAnimationEnd',
            'mozAnimationEnd',
            'MSAnimationEnd',
            'oanimationend',
            'animationend'], function () {
              element.element.className = element.element.className.replace('animated ' + element.event[e].animation, '');

              //set this flag to prevent processing same element twice
              element.event[e].active = true;
            });
        }(element, e));

      }
    }
  };

  /**
  * To bind an event to browser
  *
  */
  function _addEventListener (element, event, fn) {
    // is event an array?
    if (typeof (event) == 'object') {
      for (var i = 0; i < event.length;i++) {
        _addEventListener(element, event[i], fn);
      }
    }

    if (element.addEventListener) { // modern browsers including IE9+
      element.addEventListener(event, fn, false);
    } else if (element.attachEvent) { // IE8 and below
      element.attachEvent('on' + event, fn);
    }
  };

  /**
  * Clear animation, reset `opacity` and `active` flag on an element
  *
  */
  function _resetElement (element) {
    var elx = _find(element)

    for (var e in elx.event) {
      elx.event[e].active = false;
    }

    element.style.opacity = 0;
  };

  /**
  * Set option
  *
  */
  function _setOption (name, value) {
    _options[name] = value;
  };

  /**
  * Set an object of options
  */
  function _setOptions (options) {
    for (var o in options) {
      _setOption(o, options[o]);
    }
  };

  /**
  * Start the module
  */
  function _init () {
    _populate.call(this);

    kissuiPosition.on('*', function (element, event) {
      _attach(_find(element), event);
    });

    // to manage `autoReset`
    kissuiPosition.on('out', function (element) {
      if (_options.autoReset) {
        _resetElement(element);
      }
    });

    kissuiPosition.init();
  };

  _init()

  return {
    _options: _options,
    _elements: _elements,
    init: _init,
    add: _add,
    setOption: _setOption,
    setOptions: _setOptions
  };
}));
