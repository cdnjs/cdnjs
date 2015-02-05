/*!
Copyright (C) 2013 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function(window){'use strict';
  /* jshint loopfunc: true, noempty: false*/
  // http://www.w3.org/TR/dom/#element
  function textNodeIfString(node) {
    return typeof node === 'string' ? window.document.createTextNode(node) : node;
  }
  function mutationMacro(nodes) {
    if (nodes.length === 1) {
      return textNodeIfString(nodes[0]);
    }
    for (var
      fragment = window.document.createDocumentFragment(),
      list = slice.call(nodes),
      i = 0; i < nodes.length; i++
    ) {
      fragment.appendChild(textNodeIfString(list[i]));
    }
    return fragment;
  }
  for(var
    defineProperty = Object.defineProperty || function (object, property, descriptor) {
      object.__defineGetter__(property, descriptor.get);
    },
    indexOf = [].indexOf || function indexOf(value){
      var length = this.length;
      while(length--) {
        if (this[length] === value) {
          break;
        }
      }
      return length;
    },
    head,
    property,
    verifyToken,
    DOMTokenList,
    trim = /^\s+|\s+$/g,
    spaces = /\s+/,
    SPACE = '\x20',
    toggle = function toggle(token, force) {
      if (this.contains(token)) {
        if (!force) {
          // force is not true (either false or omitted)
          this.remove(token);
        }
      } else if(force === undefined || force) {
        force = true;
        this.add(token);
      }
      return !!force;
    },
    ElementPrototype = (window.Element || window.Node || window.HTMLElement).prototype,
    properties = [
      'matches', (
        ElementPrototype.matchesSelector ||
        ElementPrototype.webkitMatchesSelector ||
        ElementPrototype.khtmlMatchesSelector ||
        ElementPrototype.mozMatchesSelector ||
        ElementPrototype.msMatchesSelector ||
        ElementPrototype.oMatchesSelector ||
        function matches(selector) {
          var parentNode = this.parentNode;
          return !!parentNode && -1 < indexOf.call(
            parentNode.querySelectorAll(selector),
            this
          );
        }
      ),
      'prepend', function prepend() {
        var firstChild = this.firstChild,
            node = mutationMacro(arguments);
        if (firstChild) {
          this.insertBefore(node, firstChild);
        } else {
          this.appendChild(node);
        }
      },
      'append', function append() {
        this.appendChild(mutationMacro(arguments));
      },
      'before', function before() {
        var parentNode = this.parentNode;
        if (parentNode) {
          parentNode.insertBefore(
            mutationMacro(arguments), this
          );
        }
      },
      'after', function after() {
        var parentNode = this.parentNode,
            nextSibling = this.nextSibling,
            node = mutationMacro(arguments);
        if (parentNode) {
          if (nextSibling) {
            parentNode.insertBefore(node, nextSibling);
          } else {
            parentNode.appendChild(node);
          }
        }
      },
      'replace', function replace() {
        var parentNode = this.parentNode;
        if (parentNode) {
          parentNode.replaceChild(
            mutationMacro(arguments),
            this
          );
        }
      },
      'remove', function remove() {
        var parentNode = this.parentNode;
        if (parentNode) {
          parentNode.removeChild(this);
        }
      }
    ],
    slice = properties.slice,
    i = properties.length; i; i -= 2
  ) {
    property = properties[i - 2];
    if (!(property in ElementPrototype)) {
      ElementPrototype[property] = properties[i - 1];
    }
  }
  // http://www.w3.org/TR/dom/#domtokenlist
  // iOS 5.1 has completely screwed this property
  // classList in ElementPrototype is false
  // but it's actually there as getter
  if (!('classList' in document.documentElement)) {
    // http://www.w3.org/TR/domcore/#domtokenlist
    verifyToken = function (token) {
      if (!token) {
        throw 'SyntaxError';
      } else if (spaces.test(token)) {
        throw 'InvalidCharacterError';
      }
      return token;
    };
    DOMTokenList = function (node) {
      var className = node.className.replace(trim, '');
      if (className.length) {
        properties.push.apply(
          this,
          className.split(spaces)
        );
      }
      this._ = node;
    };
    DOMTokenList.prototype = {
      length: 0,
      add: function add() {
        for(var j = 0, token; j < arguments.length; j++) {
          token = arguments[j];
          if(!this.contains(token)) {
            properties.push.call(this, property);
          }
        }
        this._.className = '' + this;
      },
      contains: (function(indexOf){
        return function contains(token) {
          i = indexOf.call(this, property = verifyToken(token));
          return -1 < i;
        };
      }([].indexOf || function (token) {
        i = this.length;
        while(i-- && this[i] !== token){}
        return i;
      })),
      item: function item(i) {
        return this[i] || null;
      },
      remove: function remove() {
        for(var j = 0, token; j < arguments.length; j++) {
          token = arguments[j];
          if(this.contains(token)) {
            properties.splice.call(this, i, 1);
          }
        }
        this._.className = '' + this;
      },
      toggle: toggle,
      toString: function toString() {
        return properties.join.call(this, SPACE);
      }
    };
    defineProperty(ElementPrototype, 'classList', {
      get: function get() {
        return new DOMTokenList(this);
      },
      set: function(){}
    });
  } else {
    // iOS 5.1 and Nokia ASHA do not support multiple add or remove
    // trying to detect and fix that in here
    DOMTokenList = document.createElement('div').classList;
    DOMTokenList.add('a', 'b', 'a');
    if ('a\x20b' != DOMTokenList) {
      // no other way to reach original methods in iOS 5.1
      ElementPrototype = DOMTokenList.constructor.prototype;
      if (!('add' in ElementPrototype)) {
        // ASHA double fails in here
        ElementPrototype = window.DOMTokenList.prototype;
      }
      verifyToken = function (original) {
        return function () {
          var i = 0;
          while (i < arguments.length) {
            original.call(this, arguments[i++]);
          }
        };
      };
      ElementPrototype.add = verifyToken(ElementPrototype.add);
      ElementPrototype.remove = verifyToken(ElementPrototype.remove);
      // toggle is broken too ^_^ ... let's fix it
      ElementPrototype.toggle = toggle;
    }
  }

  if (!('head' in document)) {
    defineProperty(document, 'head', {
      get: function () {
        return head || (
          head = document.getElementsByTagName('head')[0]
        );
      }
    });
  }

  // http://www.w3.org/TR/dom/#customevent
  try{new window.CustomEvent('?')}catch(o_O){
    window.CustomEvent = function(
      eventName,
      defaultInitDict
    ){

      // the infamous substitute
      function CustomEvent(type, eventInitDict) {
        var event = document.createEvent(eventName);
        if (typeof type != 'string') {
          throw new Error('An event name must be provided');
        }
        if (eventName == 'Event') {
          event.initCustomEvent = initCustomEvent;
        }
        if (eventInitDict == null) {
          eventInitDict = defaultInitDict;
        }
        event.initCustomEvent(
          type,
          eventInitDict.bubbles,
          eventInitDict.cancelable,
          eventInitDict.detail
        );
        return event;
      }

      // attached at runtime
      function initCustomEvent(
        type, bubbles, cancelable, detail
      ) {
        this.initEvent(type, bubbles, cancelable);
        this.detail = detail;
      }

      // that's it
      return CustomEvent;
    }(
      // is this IE9 or IE10 ?
      // where CustomEvent is there
      // but not usable as construtor ?
      window.CustomEvent ?
        // use the CustomEvent interface in such case
        'CustomEvent' : 'Event',
        // otherwise the common compatible one
      {
        bubbles: false,
        cancelable: false,
        detail: null
      }
    );
  }

}(window));