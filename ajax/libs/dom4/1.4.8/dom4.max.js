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

  function createDocumentFragment() {
    return document.createDocumentFragment();
  }

  function createElement(nodeName) {
    return document.createElement(nodeName);
  }

  function mutationMacro(nodes) {
    if (nodes.length === 1) {
      return textNodeIfString(nodes[0]);
    }
    for (var
      fragment = createDocumentFragment(),
      list = slice.call(nodes),
      i = 0; i < nodes.length; i++
    ) {
      fragment.appendChild(textNodeIfString(list[i]));
    }
    return fragment;
  }

  function textNodeIfString(node) {
    return typeof node === 'string' ? document.createTextNode(node) : node;
  }

  for(var
    head,
    property,
    TemporaryPrototype,
    TemporaryTokenList,
    wrapVerifyToken,
    document = window.document,
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
    // http://www.w3.org/TR/domcore/#domtokenlist
    verifyToken = function (token) {
      if (!token) {
        throw 'SyntaxError';
      } else if (spaces.test(token)) {
        throw 'InvalidCharacterError';
      }
      return token;
    },
    DOMTokenList = function (node) {
      var
        className = node.className,
        isSVG = typeof className === 'object',
        value = (isSVG ? className.baseVal : className).replace(trim, '')
      ;
      if (value.length) {
        properties.push.apply(
          this,
          value.split(spaces)
        );
      }
      this._isSVG = isSVG;
      this._ = node;
    },
    classListDescriptor = {
      get: function get() {
        return new DOMTokenList(this);
      },
      set: function(){}
    },
    uid = 'dom4-tmp-'.concat(Math.random() * +new Date()).replace('.','-'),
    trim = /^\s+|\s+$/g,
    spaces = /\s+/,
    SPACE = '\x20',
    CLASS_LIST = 'classList',
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
    DocumentFragment = window.DocumentFragment,
    CharacterData = window.CharacterData || window.Node,
    CharacterDataPrototype = CharacterData && CharacterData.prototype,
    DocumentType = window.DocumentType,
    DocumentTypePrototype = DocumentType && DocumentType.prototype,
    ElementPrototype = (window.Element || window.Node || window.HTMLElement).prototype,
    HTMLSelectElement = window.HTMLSelectElement || createElement('select').constructor,
    selectRemove = HTMLSelectElement.prototype.remove,
    ShadowRoot = window.ShadowRoot,
    SVGElement = window.SVGElement,
    // normalizes multiple ids as CSS query
    idSpaceFinder = / /g,
    idSpaceReplacer = '\\ ',
    createQueryMethod = function (methodName) {
      var createArray = methodName === 'querySelectorAll';
      return function (css) {
        var a, i, id, query, nl, selectors, node = this.parentNode;
        if (node) {
          for (
            id = this.getAttribute('id') || uid,
            query = id === uid ? id : id.replace(idSpaceFinder, idSpaceReplacer),
            selectors = css.split(','),
            i = 0; i < selectors.length; i++
          ) {
            selectors[i] = '#' + query + ' ' + selectors[i];
          }
          css = selectors.join(',');
        }
        if (id === uid) this.setAttribute('id', id);
        nl = (node || this)[methodName](css);
        if (id === uid) this.removeAttribute('id');
        // return a list
        if (createArray) {
          i = nl.length;
          a = new Array(i);
          while (i--) a[i] = nl[i];
        }
        // return node or null
        else {
          a = nl;
        }
        return a;
      };
    },
    addQueryAndAll = function (where) {
      if (!('query' in where)) {
        where.query = ElementPrototype.query;
      }
      if (!('queryAll' in where)) {
        where.queryAll = ElementPrototype.queryAll;
      }
    },
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
      'closest', function closest(selector) {
        var parentNode = this, matches;
        while (
          // document has no .matches
          (matches = parentNode && parentNode.matches) &&
          !parentNode.matches(selector)
        ) {
          parentNode = parentNode.parentNode;
        }
        return matches ? parentNode : null;
      },
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
      // WARNING - DEPRECATED - use .replaceWith() instead
      'replace', function replace() {
        this.replaceWith.apply(this, arguments);
      },
      'replaceWith', function replaceWith() {
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
      },
      'query', createQueryMethod('querySelector'),
      'queryAll', createQueryMethod('querySelectorAll')
    ],
    slice = properties.slice,
    i = properties.length; i; i -= 2
  ) {
    property = properties[i - 2];
    if (!(property in ElementPrototype)) {
      ElementPrototype[property] = properties[i - 1];
    }
    if (property === 'remove') {
      // see https://github.com/WebReflection/dom4/issues/19
      HTMLSelectElement.prototype[property] = function () {
        return 0 < arguments.length ?
          selectRemove.apply(this, arguments) :
          ElementPrototype.remove.call(this);
      };
    }
    // see https://github.com/WebReflection/dom4/issues/18
    if (/before|after|replace|remove/.test(property)) {
      if (CharacterData && !(property in CharacterDataPrototype)) {
        CharacterDataPrototype[property] = properties[i - 1];
      }
      if (DocumentType && !(property in DocumentTypePrototype)) {
        DocumentTypePrototype[property] = properties[i - 1];
      }
    }
  }

  // bring query and queryAll to the document too
  addQueryAndAll(document);

  // brings query and queryAll to fragments as well
  if (DocumentFragment) {
    addQueryAndAll(DocumentFragment.prototype);
  } else {
    try {
      addQueryAndAll(createDocumentFragment().constructor.prototype);
    } catch(o_O) {}
  }

  // bring query and queryAll to the ShadowRoot too
  if (ShadowRoot) {
    addQueryAndAll(ShadowRoot.prototype);
  }

  // most likely an IE9 only issue
  // see https://github.com/WebReflection/dom4/issues/6
  if (!createElement('a').matches('a')) {
    ElementPrototype[property] = function(matches){
      return function (selector) {
        return matches.call(
          this.parentNode ?
            this :
            createDocumentFragment().appendChild(this),
          selector
        );
      };
    }(ElementPrototype[property]);
  }

  // used to fix both old webkit and SVG
  DOMTokenList.prototype = {
    length: 0,
    add: function add() {
      for(var j = 0, token; j < arguments.length; j++) {
        token = arguments[j];
        if(!this.contains(token)) {
          properties.push.call(this, property);
        }
      }
      if (this._isSVG) {
        this._.setAttribute('class', '' + this);
      } else {
        this._.className = '' + this;
      }
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
      if (this._isSVG) {
        this._.setAttribute('class', '' + this);
      } else {
        this._.className = '' + this;
      }
    },
    toggle: toggle,
    toString: function toString() {
      return properties.join.call(this, SPACE);
    }
  };

  if (SVGElement && !(CLASS_LIST in SVGElement.prototype)) {
    defineProperty(SVGElement.prototype, CLASS_LIST, classListDescriptor);
  }

  // http://www.w3.org/TR/dom/#domtokenlist
  // iOS 5.1 has completely screwed this property
  // classList in ElementPrototype is false
  // but it's actually there as getter
  if (!(CLASS_LIST in document.documentElement)) {
    defineProperty(ElementPrototype, CLASS_LIST, classListDescriptor);
  } else {
    // iOS 5.1 and Nokia ASHA do not support multiple add or remove
    // trying to detect and fix that in here
    TemporaryTokenList = createElement('div')[CLASS_LIST];
    TemporaryTokenList.add('a', 'b', 'a');
    if ('a\x20b' != TemporaryTokenList) {
      // no other way to reach original methods in iOS 5.1
      TemporaryPrototype = TemporaryTokenList.constructor.prototype;
      if (!('add' in TemporaryPrototype)) {
        // ASHA double fails in here
        TemporaryPrototype = window.TemporaryTokenList.prototype;
      }
      wrapVerifyToken = function (original) {
        return function () {
          var i = 0;
          while (i < arguments.length) {
            original.call(this, arguments[i++]);
          }
        };
      };
      TemporaryPrototype.add = wrapVerifyToken(TemporaryPrototype.add);
      TemporaryPrototype.remove = wrapVerifyToken(TemporaryPrototype.remove);
      // toggle is broken too ^_^ ... let's fix it
      TemporaryPrototype.toggle = toggle;
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

  // requestAnimationFrame partial polyfill
  (function () {
    for (var
      raf,
      rAF = window.requestAnimationFrame,
      cAF = window.cancelAnimationFrame,
      prefixes = ['o', 'ms', 'moz', 'webkit'],
      i = prefixes.length;
      !cAF && i--;
    ) {
      rAF = rAF || window[prefixes[i] + 'RequestAnimationFrame'];
      cAF = window[prefixes[i] + 'CancelAnimationFrame'] ||
            window[prefixes[i] + 'CancelRequestAnimationFrame'];
    }
    if (!cAF) {
      // some FF apparently implemented rAF but no cAF 
      if (rAF) {
        raf = rAF;
        rAF = function (callback) {
          var goOn = true;
          raf(function () {
            if (goOn) callback.apply(this, arguments);
          });
          return function () {
            goOn = false;
          };
        };
        cAF = function (id) {
          id();
        };
      } else {
        rAF = function (callback) {
          return setTimeout(callback, 15, 15);
        };
        cAF = function (id) {
          clearTimeout(id);
        };
      }
    }
    window.requestAnimationFrame = rAF;
    window.cancelAnimationFrame = cAF;
  }());

  // http://www.w3.org/TR/dom/#customevent
  try{new window.CustomEvent('?');}catch(o_O){
    window.CustomEvent = function(
      eventName,
      defaultInitDict
    ){

      // the infamous substitute
      function CustomEvent(type, eventInitDict) {
        /*jshint eqnull:true */
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
        /*jshint validthis:true*/
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