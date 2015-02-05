/*!
Copyright (C) 2014 by WebReflection

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
(function(window, document, Object, REGISTER_ELEMENT){'use strict';

// in case it's there or already patched
if (REGISTER_ELEMENT in document) return;

var
  ADD_EVENT_LISTENER = 'addEventListener',
  PROTOTYPE = 'prototype',
  EXTENDS = 'extends',
  /*
  DOM_ATTR_MODIFIED = 'DOMAttrModified',
  GET_ATTRIBUTE = 'getAttribute',
  SET_ATTRIBUTE = 'setAttribute',
  REMOVE_ATTRIBUTE = 'removeAttribute',
  */
  validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
  invalidNames = [
    'ANNOTATION-XML',
    'COLOR-PROFILE',
    'FONT-FACE',
    'FONT-FACE-SRC',
    'FONT-FACE-URI',
    'FONT-FACE-FORMAT',
    'FONT-FACE-NAME',
    'MISSING-GLYPH'
  ],
  types = [],
  protos = [],
  query = [],
  indexOf = types.indexOf || function (v) {
    for(var i = this.length; i-- && this[i] !== v;){}
    return i;
  },
  forEach = types.forEach || function (f, c) {
    for (var i = 0, length = this.length; i < length; i++) {
      f.call(c, this[i]);
    }
  },
  hOP = types.hasOwnProperty,
  iPO = types.isPrototypeOf,
  // documentElement = document.documentElement,
  createElement = document.createElement,
  defineProperty = Object.defineProperty,
  gOPD = Object.getOwnPropertyDescriptor,
  gOPN = Object.getOwnPropertyNames,
  gPO = Object.getPrototypeOf,
  setListener = false,
  attributeChangedAble = false,
  setPrototype = Object.setPrototypeOf || (
    Object.__proto__ ?
      function (o, p) {
        o.__proto__ = p;
        return o;
      } : (
    'getOwnPropertyDescriptor' in Object ?
      (function(){
        function setProperties(o, p) {
          for (var
            key,
            names = gOPN(p),
            i = 0, length = names.length;
            i < length; i++
          ) {
            key = names[i];
            if (!hOP.call(o, key)) {
              defineProperty(o, key, gOPD(p, key));
            }
          }
        }
        return function (o, p) {
          do {
            setProperties(o, p);
          } while (p = gPO(p));
          return o;
        };
      }()) :
      function (o, p) {
        for (var key in p) {
          o[key] = p[key];
        }
        return o;
      }
  )),
  HTMLElementPrototype = (
    window.HTMLElement ||
    window.Element ||
    window.Node
  )[PROTOTYPE],
  cloneNode = HTMLElementPrototype.cloneNode,
  noOp = function(){}
  /*, attrModified,
    DOMAttrModified = function(e) {
    attributeChangedAble = true;
    documentElement.removeEventListener(
      DOM_ATTR_MODIFIED,
      DOMAttrModified
    );
  }*/
;

/*
// Fixing WebKit DOMAttrModified
// inspired by the method used in the folwoing link
// http://engineering.silk.co/post/31921750832/mutation-events-what-happens
documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, DOMAttrModified);
documentElement[SET_ATTRIBUTE](REGISTER_ELEMENT, 1);
documentElement[REMOVE_ATTRIBUTE](REGISTER_ELEMENT);
if (attributeChangedAble) {
  attrModified = DOM_ATTR_MODIFIED;
} else {
  attrModified = 'DOMSubtreeModified';
  (function(
    originalGetAttribute,
    originalSetAttribute,
    originalRemoveAttribute
  ){
    function setupAndDispatch(self, name, was, is, removal) {
      var e = document.createEvent('MutationEvent');
      e.initMutationEvent(
        DOM_ATTR_MODIFIED,
        true,
        false,
        self,
        was,
        is,
        name,
        removal ? e.REMOVAL : (
          was == null ? e.ADDITION : e.MODIFICATION
        )
      );
      self.dispatchEvent(e);
    }
    HTMLElementPrototype[SET_ATTRIBUTE] = function setAttribute(name, value) {
      var is, self = this, was = originalGetAttribute.call(self, name);
      originalSetAttribute.call(self, name, value);
      is = originalGetAttribute.call(self, name);
      if (is !== was) {
        setupAndDispatch(self, name, was, is, false);
      }
    };
    HTMLElementPrototype[REMOVE_ATTRIBUTE] = function removeAttribute(name) {
      var self = this, was = originalGetAttribute.call(self, name);
      originalRemoveAttribute.call(self, name);
      setupAndDispatch(self, name, was, '', true);
    };
  }(
    HTMLElementPrototype[GET_ATTRIBUTE],
    HTMLElementPrototype[SET_ATTRIBUTE],
    HTMLElementPrototype[REMOVE_ATTRIBUTE]
  ));
}
*/

function invoke(target, name) {
  (
    target[name] ||
    target[name + 'Callback'] ||
    noOp
  ).call(target);
}

function setupNode(node, proto) {
  setPrototype(node, proto);
  invoke(node, 'created');
}

function setupEachNode(node) {
  setupNode(node, protos[getTypeIndex(node)]);
}

function getTypeIndex(target) {
  return indexOf.call(
    types,
    (target.getAttribute('is') || '').toUpperCase() ||
    target.nodeName
  );
}

function notifyEach(target, callback, context) {
  forEach.call(
    target.querySelectorAll(
      query.join(',')
    ),
    callback,
    context
  );
}

// used only inside onDOMNode
// maybe not needed here
function verifyAndSetupAndAction(node, action) {
  var proto, i = getTypeIndex(node);
  if (-1 < i) {
    proto = protos[i];
    if (gPO(node) !== proto) {
      setupNode(node, proto);
    }
    invoke(node, action);
  }
}

function onDOMNode(whatHappened) {
  function triggerAction(node) {
    verifyAndSetupAndAction(node, whatHappened);
  }
  return function (e) {
    var target = e.target;
    if (iPO.call(HTMLElementPrototype, target)) {
      verifyAndSetupAndAction(target, whatHappened);
      notifyEach(target, triggerAction);
    }
  };
}

// set as enumerable, writable and configurable
document[REGISTER_ELEMENT] = function registerElement(type, options) {
  var upperType = type.toUpperCase();
  if (!setListener) {
    // only first time document.registerElement is used
    // we need to set this listener
    // setting it by default might slow down for no reason
    setListener = true;
    document[ADD_EVENT_LISTENER]('DOMNodeInserted', onDOMNode('attached'));
    document[ADD_EVENT_LISTENER]('DOMNodeRemoved', onDOMNode('detached'));
    document.createElement = function (localName, typeExtension) {
      var i, node = createElement.apply(document, arguments);
      if (typeExtension) {
        node.setAttribute('is', localName = typeExtension.toLowerCase());
      }
      i = indexOf.call(types, localName.toUpperCase());
      if (-1 < i) setupNode(node, protos[i]);
      return node;
    };
    HTMLElementPrototype.cloneNode = function (deep) {
      var
        node = cloneNode.call(this, !!deep),
        i = getTypeIndex(node)
      ;
      if (-1 < i) setupNode(node, protos[i]);
      if (deep) notifyEach(node, setupEachNode);
      return node;
    };
  }
  if (-1 < indexOf.call(types, upperType)) {
    throw new Error('A ' + type + ' type is already registered');
  }
  if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
    throw new Error('The type ' + type + ' is invalid');
  }
  var
    extending = hOP.call(options || type, EXTENDS),
    nodeName = extending ? options[EXTENDS] : upperType,
    i = types.push(upperType) - 1
  ;
  query.push(extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName);
  protos[i] = hOP.call(options, PROTOTYPE) ? options[PROTOTYPE] : HTMLElementPrototype;
  return function () {
    return document.createElement(nodeName, extending && upperType);
  };
};


}(window, document, Object, 'registerElement'));