/*!
Copyright (C) 2014-2015 by WebReflection

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
var htmlClass = (function (info) {
  // (C) Andrea Giammarchi - @WebReflection - MIT Style
  var
    catchClass = /^[A-Z]+[a-z]/,
    filterBy = function (re) {
      var arr = [], tag;
      for (tag in register) {
        if (re.test(tag)) arr.push(tag);
      }
      return arr;
    },
    add = function (Class, tag) {
      tag = tag.toLowerCase();
      if (!(tag in register)) {
        register[Class] = (register[Class] || []).concat(tag);
        register[tag] = (register[tag.toUpperCase()] = Class);
      }
    },
    register = (Object.create || Object)(null),
    htmlClass = {},
    i, section, tags, Class
  ;
  for (section in info) {
    for (Class in info[section]) {
      tags = info[section][Class];
      register[Class] = tags;
      for (i = 0; i < tags.length; i++) {
        register[tags[i].toLowerCase()] =
        register[tags[i].toUpperCase()] = Class;
      }
    }
  }
  htmlClass.get = function get(tagOrClass) {
    return typeof tagOrClass === 'string' ?
      (register[tagOrClass] || (catchClass.test(tagOrClass) ? [] : '')) :
      filterBy(tagOrClass);
  };
  htmlClass.set = function set(tag, Class) {
    return (catchClass.test(tag) ?
      add(tag, Class) :
      add(Class, tag)
    ), htmlClass;
  };
  return htmlClass;
}({
  "collections": {
    "HTMLAllCollection": [
      "all"
    ],
    "HTMLCollection": [
      "forms"
    ],
    "HTMLFormControlsCollection": [
      "elements"
    ],
    "HTMLOptionsCollection": [
      "options"
    ]
  },
  "elements": {
    "Element": [
      "element"
    ],
    "HTMLAnchorElement": [
      "a"
    ],
    "HTMLAppletElement": [
      "applet"
    ],
    "HTMLAreaElement": [
      "area"
    ],
    "HTMLAttachmentElement": [
      "attachment"
    ],
    "HTMLAudioElement": [
      "audio"
    ],
    "HTMLBRElement": [
      "br"
    ],
    "HTMLBaseElement": [
      "base"
    ],
    "HTMLBodyElement": [
      "body"
    ],
    "HTMLButtonElement": [
      "button"
    ],
    "HTMLCanvasElement": [
      "canvas"
    ],
    "HTMLContentElement": [
      "content"
    ],
    "HTMLDListElement": [
      "dl"
    ],
    "HTMLDataElement": [
      "data"
    ],
    "HTMLDataListElement": [
      "datalist"
    ],
    "HTMLDetailsElement": [
      "details"
    ],
    "HTMLDialogElement": [
      "dialog"
    ],
    "HTMLDirectoryElement": [
      "dir"
    ],
    "HTMLDivElement": [
      "div"
    ],
    "HTMLDocument": [
      "document"
    ],
    "HTMLElement": [
      "element",
      "abbr",
      "address",
      "article",
      "aside",
      "b",
      "bdi",
      "bdo",
      "cite",
      "code",
      "command",
      "dd",
      "dfn",
      "dt",
      "em",
      "figcaption",
      "figure",
      "footer",
      "header",
      "i",
      "kbd",
      "mark",
      "nav",
      "noscript",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "section",
      "small",
      "strong",
      "sub",
      "summary",
      "sup",
      "u",
      "var",
      "wbr"
    ],
    "HTMLEmbedElement": [
      "embed"
    ],
    "HTMLFieldSetElement": [
      "fieldset"
    ],
    "HTMLFontElement": [
      "font"
    ],
    "HTMLFormElement": [
      "form"
    ],
    "HTMLFrameElement": [
      "frame"
    ],
    "HTMLFrameSetElement": [
      "frameset"
    ],
    "HTMLHRElement": [
      "hr"
    ],
    "HTMLHeadElement": [
      "head"
    ],
    "HTMLHeadingElement": [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6"
    ],
    "HTMLHtmlElement": [
      "html"
    ],
    "HTMLIFrameElement": [
      "iframe"
    ],
    "HTMLImageElement": [
      "img"
    ],
    "HTMLInputElement": [
      "input"
    ],
    "HTMLKeygenElement": [
      "keygen"
    ],
    "HTMLLIElement": [
      "li"
    ],
    "HTMLLabelElement": [
      "label"
    ],
    "HTMLLegendElement": [
      "legend"
    ],
    "HTMLLinkElement": [
      "link"
    ],
    "HTMLMapElement": [
      "map"
    ],
    "HTMLMarqueeElement": [
      "marquee"
    ],
    "HTMLMediaElement": [
      "media"
    ],
    "HTMLMenuElement": [
      "menu"
    ],
    "HTMLMenuItemElement": [
      "menuitem"
    ],
    "HTMLMetaElement": [
      "meta"
    ],
    "HTMLMeterElement": [
      "meter"
    ],
    "HTMLModElement": [
      "del",
      "ins"
    ],
    "HTMLOListElement": [
      "ol"
    ],
    "HTMLObjectElement": [
      "object"
    ],
    "HTMLOptGroupElement": [
      "optgroup"
    ],
    "HTMLOptionElement": [
      "option"
    ],
    "HTMLOutputElement": [
      "output"
    ],
    "HTMLParagraphElement": [
      "p"
    ],
    "HTMLParamElement": [
      "param"
    ],
    "HTMLPictureElement": [
      "picture"
    ],
    "HTMLPreElement": [
      "pre"
    ],
    "HTMLProgressElement": [
      "progress"
    ],
    "HTMLQuoteElement": [
      "blockquote",
      "q",
      "quote"
    ],
    "HTMLScriptElement": [
      "script"
    ],
    "HTMLSelectElement": [
      "select"
    ],
    "HTMLShadowElement": [
      "shadow"
    ],
    "HTMLSlotElement": [
      "slot"
    ],
    "HTMLSourceElement": [
      "source"
    ],
    "HTMLSpanElement": [
      "span"
    ],
    "HTMLStyleElement": [
      "style"
    ],
    "HTMLTableCaptionElement": [
      "caption"
    ],
    "HTMLTableCellElement": [
      "td",
      "th"
    ],
    "HTMLTableColElement": [
      "col",
      "colgroup"
    ],
    "HTMLTableElement": [
      "table"
    ],
    "HTMLTableRowElement": [
      "tr"
    ],
    "HTMLTableSectionElement": [
      "thead",
      "tbody",
      "tfoot"
    ],
    "HTMLTemplateElement": [
      "template"
    ],
    "HTMLTextAreaElement": [
      "textarea"
    ],
    "HTMLTimeElement": [
      "time"
    ],
    "HTMLTitleElement": [
      "title"
    ],
    "HTMLTrackElement": [
      "track"
    ],
    "HTMLUListElement": [
      "ul"
    ],
    "HTMLUnknownElement": [
      "unknown",
      "vhgroupv",
      "vkeygen"
    ],
    "HTMLVideoElement": [
      "video"
    ]
  },
  "nodes": {
    "Attr": [
      "node"
    ],
    "Audio": [
      "audio"
    ],
    "CDATASection": [
      "node"
    ],
    "CharacterData": [
      "node"
    ],
    "Comment": [
      "#comment"
    ],
    "Document": [
      "#document"
    ],
    "DocumentFragment": [
      "#document-fragment"
    ],
    "DocumentType": [
      "node"
    ],
    "HTMLDocument": [
      "#document"
    ],
    "Image": [
      "img"
    ],
    "Option": [
      "option"
    ],
    "ProcessingInstruction": [
      "node"
    ],
    "ShadowRoot": [
      "#shadow-root"
    ],
    "Text": [
      "#text"
    ],
    "XMLDocument": [
      "xml"
    ]
  }
}));



// DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
// THIS IS A PROJECT BASED ON A BUILD SYSTEM
// THIS FILE IS JUST WRAPPED UP RESULTING IN
// build/document-register-element.js
// and its .max.js counter part

var
  // IE < 11 only + old WebKit for attributes + feature detection
  EXPANDO_UID = '__' + REGISTER_ELEMENT + (Math.random() * 10e4 >> 0),

  // shortcuts and costants
  ATTACHED = 'attached',
  DETACHED = 'detached',
  EXTENDS = 'extends',
  ADDITION = 'ADDITION',
  MODIFICATION = 'MODIFICATION',
  REMOVAL = 'REMOVAL',
  DOM_ATTR_MODIFIED = 'DOMAttrModified',
  DOM_CONTENT_LOADED = 'DOMContentLoaded',
  DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',
  PREFIX_TAG = '<',
  PREFIX_IS = '=',

  // valid and invalid node names
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

  // registered types and their prototypes
  types = [],
  protos = [],

  // to query subnodes
  query = '',

  // html shortcut used to feature detect
  documentElement = document.documentElement,

  // ES5 inline helpers || basic patches
  indexOf = types.indexOf || function (v) {
    for(var i = this.length; i-- && this[i] !== v;){}
    return i;
  },

  // other helpers / shortcuts
  OP = Object.prototype,
  hOP = OP.hasOwnProperty,
  iPO = OP.isPrototypeOf,

  defineProperty = Object.defineProperty,
  gOPD = Object.getOwnPropertyDescriptor,
  gOPN = Object.getOwnPropertyNames,
  gPO = Object.getPrototypeOf,
  sPO = Object.setPrototypeOf,

  // jshint proto: true
  hasProto = !!Object.__proto__,

  // V1 helpers
  DRECEV1 = '__dreCEv1',
  customElements = window.customElements,
  usableCustomElements = !!(
    customElements &&
    customElements.define &&
    customElements.get &&
    customElements.whenDefined
  ),
  Dict = Object.create || Object,
  Map = window.Map || function Map() {
    var K = [], V = [], i;
    return {
      get: function (k) {
        return V[indexOf.call(K, k)];
      },
      set: function (k, v) {
        i = indexOf.call(K, k);
        if (i < 0) V[K.push(k) - 1] = v;
        else V[i] = v;
      }
    };
  },
  Promise = window.Promise || function (fn) {
    var
      notify = [],
      done = false,
      p = {
        'catch': function () {
          return p;
        },
        'then': function (cb) {
          notify.push(cb);
          if (done) setTimeout(resolve, 1);
          return p;
        }
      }
    ;
    function resolve(value) {
      done = true;
      while (notify.length) notify.shift()(value);
    }
    fn(resolve);
    return p;
  },
  justCreated = false,
  constructors = Dict(null),
  waitingList = Dict(null),
  nodeNames = new Map(),

  // used to create unique instances
  create = Object.create || function Bridge(proto) {
    // silly broken polyfill probably ever used but short enough to work
    return proto ? ((Bridge.prototype = proto), new Bridge()) : this;
  },

  // will set the prototype if possible
  // or copy over all properties
  setPrototype = sPO || (
    hasProto ?
      function (o, p) {
        o.__proto__ = p;
        return o;
      } : (
    (gOPN && gOPD) ?
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
          } while ((p = gPO(p)) && !iPO.call(p, o));
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

  // DOM shortcuts and helpers, if any

  MutationObserver = window.MutationObserver ||
                     window.WebKitMutationObserver,

  HTMLElementPrototype = (
    window.HTMLElement ||
    window.Element ||
    window.Node
  ).prototype,

  IE8 = !iPO.call(HTMLElementPrototype, documentElement),

  safeProperty = IE8 ? function (o, k, d) {
    o[k] = d.value;
    return o;
  } : defineProperty,

  isValidNode = IE8 ?
    function (node) {
      return node.nodeType === 1;
    } :
    function (node) {
      return iPO.call(HTMLElementPrototype, node);
    },

  targets = IE8 && [],

  cloneNode = HTMLElementPrototype.cloneNode,
  dispatchEvent = HTMLElementPrototype.dispatchEvent,
  getAttribute = HTMLElementPrototype.getAttribute,
  hasAttribute = HTMLElementPrototype.hasAttribute,
  removeAttribute = HTMLElementPrototype.removeAttribute,
  setAttribute = HTMLElementPrototype.setAttribute,

  // replaced later on
  createElement = document.createElement,
  patchedCreateElement = createElement,

  // shared observer for all attributes
  attributesObserver = MutationObserver && {
    attributes: true,
    characterData: true,
    attributeOldValue: true
  },

  // useful to detect only if there's no MutationObserver
  DOMAttrModified = MutationObserver || function(e) {
    doesNotSupportDOMAttrModified = false;
    documentElement.removeEventListener(
      DOM_ATTR_MODIFIED,
      DOMAttrModified
    );
  },

  // will both be used to make DOMNodeInserted asynchronous
  asapQueue,
  asapTimer = 0,

  // internal flags
  setListener = false,
  doesNotSupportDOMAttrModified = true,
  dropDomContentLoaded = true,

  // needed for the innerHTML helper
  notFromInnerHTMLHelper = true,

  // optionally defined later on
  onSubtreeModified,
  callDOMAttrModified,
  getAttributesMirror,
  observer,

  // based on setting prototype capability
  // will check proto or the expando attribute
  // in order to setup the node once
  patchIfNotAlready,
  patch
;

// only if needed
if (!(REGISTER_ELEMENT in document)) {

  if (sPO || hasProto) {
      patchIfNotAlready = function (node, proto) {
        if (!iPO.call(proto, node)) {
          setupNode(node, proto);
        }
      };
      patch = setupNode;
  } else {
      patchIfNotAlready = function (node, proto) {
        if (!node[EXPANDO_UID]) {
          node[EXPANDO_UID] = Object(true);
          setupNode(node, proto);
        }
      };
      patch = patchIfNotAlready;
  }

  if (IE8) {
    doesNotSupportDOMAttrModified = false;
    (function (){
      var
        descriptor = gOPD(HTMLElementPrototype, 'addEventListener'),
        addEventListener = descriptor.value,
        patchedRemoveAttribute = function (name) {
          var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
          e.attrName = name;
          e.prevValue = getAttribute.call(this, name);
          e.newValue = null;
          e[REMOVAL] = e.attrChange = 2;
          removeAttribute.call(this, name);
          dispatchEvent.call(this, e);
        },
        patchedSetAttribute = function (name, value) {
          var
            had = hasAttribute.call(this, name),
            old = had && getAttribute.call(this, name),
            e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true})
          ;
          setAttribute.call(this, name, value);
          e.attrName = name;
          e.prevValue = had ? old : null;
          e.newValue = value;
          if (had) {
            e[MODIFICATION] = e.attrChange = 1;
          } else {
            e[ADDITION] = e.attrChange = 0;
          }
          dispatchEvent.call(this, e);
        },
        onPropertyChange = function (e) {
          // jshint eqnull:true
          var
            node = e.currentTarget,
            superSecret = node[EXPANDO_UID],
            propertyName = e.propertyName,
            event
          ;
          if (superSecret.hasOwnProperty(propertyName)) {
            superSecret = superSecret[propertyName];
            event = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
            event.attrName = superSecret.name;
            event.prevValue = superSecret.value || null;
            event.newValue = (superSecret.value = node[propertyName] || null);
            if (event.prevValue == null) {
              event[ADDITION] = event.attrChange = 0;
            } else {
              event[MODIFICATION] = event.attrChange = 1;
            }
            dispatchEvent.call(node, event);
          }
        }
      ;
      descriptor.value = function (type, handler, capture) {
        if (
          type === DOM_ATTR_MODIFIED &&
          this.attributeChangedCallback &&
          this.setAttribute !== patchedSetAttribute
        ) {
          this[EXPANDO_UID] = {
            className: {
              name: 'class',
              value: this.className
            }
          };
          this.setAttribute = patchedSetAttribute;
          this.removeAttribute = patchedRemoveAttribute;
          addEventListener.call(this, 'propertychange', onPropertyChange);
        }
        addEventListener.call(this, type, handler, capture);
      };
      defineProperty(HTMLElementPrototype, 'addEventListener', descriptor);
    }());
  } else if (!MutationObserver) {
    documentElement.addEventListener(DOM_ATTR_MODIFIED, DOMAttrModified);
    documentElement.setAttribute(EXPANDO_UID, 1);
    documentElement.removeAttribute(EXPANDO_UID);
    if (doesNotSupportDOMAttrModified) {
      onSubtreeModified = function (e) {
        var
          node = this,
          oldAttributes,
          newAttributes,
          key
        ;
        if (node === e.target) {
          oldAttributes = node[EXPANDO_UID];
          node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
          for (key in newAttributes) {
            if (!(key in oldAttributes)) {
              // attribute was added
              return callDOMAttrModified(
                0,
                node,
                key,
                oldAttributes[key],
                newAttributes[key],
                ADDITION
              );
            } else if (newAttributes[key] !== oldAttributes[key]) {
              // attribute was changed
              return callDOMAttrModified(
                1,
                node,
                key,
                oldAttributes[key],
                newAttributes[key],
                MODIFICATION
              );
            }
          }
          // checking if it has been removed
          for (key in oldAttributes) {
            if (!(key in newAttributes)) {
              // attribute removed
              return callDOMAttrModified(
                2,
                node,
                key,
                oldAttributes[key],
                newAttributes[key],
                REMOVAL
              );
            }
          }
        }
      };
      callDOMAttrModified = function (
        attrChange,
        currentTarget,
        attrName,
        prevValue,
        newValue,
        action
      ) {
        var e = {
          attrChange: attrChange,
          currentTarget: currentTarget,
          attrName: attrName,
          prevValue: prevValue,
          newValue: newValue
        };
        e[action] = attrChange;
        onDOMAttrModified(e);
      };
      getAttributesMirror = function (node) {
        for (var
          attr, name,
          result = {},
          attributes = node.attributes,
          i = 0, length = attributes.length;
          i < length; i++
        ) {
          attr = attributes[i];
          name = attr.name;
          if (name !== 'setAttribute') {
            result[name] = attr.value;
          }
        }
        return result;
      };
    }
  }

  // set as enumerable, writable and configurable
  document[REGISTER_ELEMENT] = function registerElement(type, options) {
    upperType = type.toUpperCase();
    if (!setListener) {
      // only first time document.registerElement is used
      // we need to set this listener
      // setting it by default might slow down for no reason
      setListener = true;
      if (MutationObserver) {
        observer = (function(attached, detached){
          function checkEmAll(list, callback) {
            for (var i = 0, length = list.length; i < length; callback(list[i++])){}
          }
          return new MutationObserver(function (records) {
            for (var
              current, node, newValue,
              i = 0, length = records.length; i < length; i++
            ) {
              current = records[i];
              if (current.type === 'childList') {
                checkEmAll(current.addedNodes, attached);
                checkEmAll(current.removedNodes, detached);
              } else {
                node = current.target;
                if (notFromInnerHTMLHelper &&
                    node.attributeChangedCallback &&
                    current.attributeName !== 'style') {
                  newValue = getAttribute.call(node, current.attributeName);
                  if (newValue !== current.oldValue) {
                    node.attributeChangedCallback(
                      current.attributeName,
                      current.oldValue,
                      newValue
                    );
                  }
                }
              }
            }
          });
        }(executeAction(ATTACHED), executeAction(DETACHED)));
        observer.observe(
          document,
          {
            childList: true,
            subtree: true
          }
        );
      } else {
        asapQueue = [];
        document.addEventListener('DOMNodeInserted', onDOMNode(ATTACHED));
        document.addEventListener('DOMNodeRemoved', onDOMNode(DETACHED));
      }

      document.addEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
      document.addEventListener('readystatechange', onReadyStateChange);

      HTMLElementPrototype.cloneNode = function (deep) {
        var
          node = cloneNode.call(this, !!deep),
          i = getTypeIndex(node)
        ;
        if (-1 < i) patch(node, protos[i]);
        if (deep) loopAndSetup(node.querySelectorAll(query));
        return node;
      };
    }

    if (-2 < (
      indexOf.call(types, PREFIX_IS + upperType) +
      indexOf.call(types, PREFIX_TAG + upperType)
    )) {
      throwTypeError(type);
    }

    if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
      throw new Error('The type ' + type + ' is invalid');
    }

    var
      constructor = function () {
        return extending ?
          document.createElement(nodeName, upperType) :
          document.createElement(nodeName);
      },
      opt = options || OP,
      extending = hOP.call(opt, EXTENDS),
      nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
      upperType,
      i
    ;

    if (extending && -1 < (
      indexOf.call(types, PREFIX_TAG + nodeName)
    )) {
      throwTypeError(nodeName);
    }

    i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;

    query = query.concat(
      query.length ? ',' : '',
      extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
    );

    constructor.prototype = (
      protos[i] = hOP.call(opt, 'prototype') ?
        opt.prototype :
        create(HTMLElementPrototype)
    );

    loopAndVerify(
      document.querySelectorAll(query),
      ATTACHED
    );

    return constructor;
  };

  document.createElement = (patchedCreateElement = function (localName, typeExtension) {
    var
      is = typeof typeExtension === 'string' ? typeExtension : '',
      node = is ?
        createElement.call(document, localName, is) :
        createElement.call(document, localName),
      name = '' + localName,
      i = indexOf.call(
        types,
        (is ? PREFIX_IS : PREFIX_TAG) +
        (is || name).toUpperCase()
      ),
      setup = -1 < i
    ;
    if (is) {
      node.setAttribute('is', is = is.toLowerCase());
      if (setup) {
        setup = isInQSA(name.toUpperCase(), is);
      }
    }
    notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
    if (setup) patch(node, protos[i]);
    return node;
  });

}

function ASAP() {
  var queue = asapQueue.splice(0, asapQueue.length);
  asapTimer = 0;
  while (queue.length) {
    queue.shift().call(
      null, queue.shift()
    );
  }
}

function loopAndVerify(list, action) {
  for (var i = 0, length = list.length; i < length; i++) {
    verifyAndSetupAndAction(list[i], action);
  }
}

function loopAndSetup(list) {
  for (var i = 0, length = list.length, node; i < length; i++) {
    node = list[i];
    patch(node, protos[getTypeIndex(node)]);
  }
}

function executeAction(action) {
  return function (node) {
    if (isValidNode(node)) {
      verifyAndSetupAndAction(node, action);
      loopAndVerify(
        node.querySelectorAll(query),
        action
      );
    }
  };
}

function getTypeIndex(target) {
  var
    is = getAttribute.call(target, 'is'),
    nodeName = target.nodeName.toUpperCase(),
    i = indexOf.call(
      types,
      is ?
          PREFIX_IS + is.toUpperCase() :
          PREFIX_TAG + nodeName
    )
  ;
  return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
}

function isInQSA(name, type) {
  return -1 < query.indexOf(name + '[is="' + type + '"]');
}

function onDOMAttrModified(e) {
  var
    node = e.currentTarget,
    attrChange = e.attrChange,
    attrName = e.attrName,
    target = e.target
  ;
  if (notFromInnerHTMLHelper &&
      (!target || target === node) &&
      node.attributeChangedCallback &&
      attrName !== 'style' &&
      e.prevValue !== e.newValue) {
    node.attributeChangedCallback(
      attrName,
      attrChange === e[ADDITION] ? null : e.prevValue,
      attrChange === e[REMOVAL] ? null : e.newValue
    );
  }
}

function onDOMNode(action) {
  var executor = executeAction(action);
  return function (e) {
    asapQueue.push(executor, e.target);
    if (asapTimer) clearTimeout(asapTimer);
    asapTimer = setTimeout(ASAP, 1);
  };
}

function onReadyStateChange(e) {
  if (dropDomContentLoaded) {
    dropDomContentLoaded = false;
    e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
  }
  loopAndVerify(
    (e.target || document).querySelectorAll(query),
    e.detail === DETACHED ? DETACHED : ATTACHED
  );
  if (IE8) purge();
}

function patchedSetAttribute(name, value) {
  // jshint validthis:true
  var self = this;
  setAttribute.call(self, name, value);
  onSubtreeModified.call(self, {target: self});
}

function setupNode(node, proto) {
  setPrototype(node, proto);
  if (observer) {
    observer.observe(node, attributesObserver);
  } else {
    if (doesNotSupportDOMAttrModified) {
      node.setAttribute = patchedSetAttribute;
      node[EXPANDO_UID] = getAttributesMirror(node);
      node.addEventListener(DOM_SUBTREE_MODIFIED, onSubtreeModified);
    }
    node.addEventListener(DOM_ATTR_MODIFIED, onDOMAttrModified);
  }
  if (node.createdCallback && notFromInnerHTMLHelper) {
    node.created = true;
    node.createdCallback();
    node.created = false;
  }
}

function purge() {
  for (var
    node,
    i = 0,
    length = targets.length;
    i < length; i++
  ) {
    node = targets[i];
    if (!documentElement.contains(node)) {
      length--;
      targets.splice(i--, 1);
      verifyAndSetupAndAction(node, DETACHED);
    }
  }
}

function throwTypeError(type) {
  throw new Error('A ' + type + ' type is already registered');
}

function verifyAndSetupAndAction(node, action) {
  var
    fn,
    i = getTypeIndex(node)
  ;
  if (-1 < i) {
    patchIfNotAlready(node, protos[i]);
    i = 0;
    if (action === ATTACHED && !node[ATTACHED]) {
      node[DETACHED] = false;
      node[ATTACHED] = true;
      i = 1;
      if (IE8 && indexOf.call(targets, node) < 0) {
        targets.push(node);
      }
    } else if (action === DETACHED && !node[DETACHED]) {
      node[ATTACHED] = false;
      node[DETACHED] = true;
      i = 1;
    }
    if (i && (fn = node[action + 'Callback'])) fn.call(node);
  }
}



// V1 in da House!
function CustomElementsRegistry() {}

CustomElementsRegistry.prototype = {
  constructor: CustomElementsRegistry,
  // a workaround for the stubborn WebKit
  define: usableCustomElements ?
    function (name, Class, options) {
      if (options) {
        define(name, Class, options);
      } else {
        customElements.define(name, Class);
      }
    } :
    define,
  get: usableCustomElements ?
    function (name) {
      return customElements.get(name) || get(name);
    } :
    get,
  whenDefined: usableCustomElements ?
    function (name) {
      return Promise.race(
        customElements.whenDefined,
        whenDefined(name)
      );
    } :
    whenDefined
};

function define(name, Class, options) {
  var
    is = options && options[EXTENDS] || '',
    CProto = Class.prototype,
    proto = create(CProto),
    attributes = Class.observedAttributes || Array.prototype,
    definition = {prototype: proto}
  ;
  // TODO: is this needed at all since it's inherited?
  // defineProperty(proto, 'constructor', {value: Class});
  safeProperty(proto, 'createdCallback', {
      value: function () {
        if (justCreated) justCreated = false;
        else if (!this[DRECEV1]) {
          this[DRECEV1] = true;
          new Class(this);
        }
    }
  });
  safeProperty(proto, 'attributeChangedCallback', {
    value: function (name) {
      if (-1 < indexOf.call(attributes, name))
        CProto.attributeChangedCallback.apply(this, arguments);
    }
  });
  if (CProto.connectedCallback) {
    safeProperty(proto, 'attachedCallback', {
      value: CProto.connectedCallback
    });
  }
  if (CProto.disconnectedCallback) {
    safeProperty(proto, 'detachedCallback', {
      value: CProto.disconnectedCallback
    });
  }
  if (is) definition[EXTENDS] = is;
  document[REGISTER_ELEMENT](name, definition);
  name = name.toUpperCase();
  constructors[name] = {
    constructor: Class,
    create: is ? [is, name] : [name]
  };
  nodeNames.set(Class, name);
  whenDefined(name);
  waitingList[name].r();
}

function get(name) {
  var info = constructors[name.toUpperCase()];
  return info && info.constructor;
}

function whenDefined(name) {
  name = name.toUpperCase();
  if (!(name in waitingList)) {
    waitingList[name] = {};
    waitingList[name].p = new Promise(function (resolve) {
      waitingList[name].r = resolve;
    });
  }
  return waitingList[name].p;
}

function polyfillV1() {
  if (customElements) delete window.customElements;
  defineProperty(window, 'customElements', {
    configurable: true,
    value: new CustomElementsRegistry()
  });
  defineProperty(window, 'CustomElementsRegistry', {
    configurable: true,
    value: CustomElementsRegistry
  });
  for (var
    patchClass = function (name) {
      var Class = window[name];
      if (Class) {
        window[name] = function CustomElementsV1(self) {
          if (!self) self = this;
          if (!self[DRECEV1]) {
            justCreated = true;
            self = document.createElement.apply(
              document,
              constructors[nodeNames.get(self.constructor)].create
            );
            justCreated = false;
            self[DRECEV1] = true;
          }
          return self;
        };
        safeProperty(
          (window[name].prototype = create(Class.prototype)),
          'constructor',
          {configurable: true, writable: true, value: window[name]}
        );
      }
    },
    Classes = htmlClass.get(/^HTML/),
    i = Classes.length;
    i--;
    patchClass(Classes[i])
  ) {}
  (document.createElement = function (name, options) {
    var is = typeof options === 'string' ?
      options : (options && options.is || '');
    return is ?
      patchedCreateElement.call(this, name, is) :
      patchedCreateElement.call(this, name);
  });
}

if (!customElements) polyfillV1();
try {
  (function (DRE, options) {
    options[EXTENDS] = 'a';
    setPrototype(DRE.prototype, HTMLAnchorElement.prototype);
    customElements.define('document-register-element-a', DRE, options);
    documentElement.insertBefore((DRE = new DRE()), documentElement.firstChild);
    documentElement.removeChild(DRE);
  }(function () {}, {}));
} catch(o_O) {
  polyfillV1();
}

}(window, document, Object, 'registerElement'));