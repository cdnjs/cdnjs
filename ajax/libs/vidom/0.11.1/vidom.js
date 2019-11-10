/**
 * Vidom
 * @author Filatov Dmitry <dfilatov@inbox.ru>
 * @version 0.11.1
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.vidom = {}));
}(this, function (exports) { 'use strict';

    var AMP_RE = /&/g,
        QUOT_RE = /"/g;
    function escapeAttr(str) {
      str = str + '';
      var i = str.length,
          escapes = 0; // 1 — escape '&', 2 — escape '"'

      while (i-- > 0) {
        switch (str.charCodeAt(i)) {
          case 38:
            escapes |= 1;
            break;

          case 34:
            escapes |= 2;
            break;
        }
      }

      if ((escapes & 1) === 1) {
        str = str.replace(AMP_RE, '&amp;');
      }

      if ((escapes & 2) === 2) {
        str = str.replace(QUOT_RE, '&quot;');
      }

      return str;
    }

    function isInArray(arr, item) {
      var len = arr.length;
      var i = 0;

      while (i < len) {
        if (arr[i++] == item) {
          return true;
        }
      }

      return false;
    }

    var DASHERIZE_RE = /([^A-Z]+)([A-Z])/g;
    function dasherize(str) {
      return str.replace(DASHERIZE_RE, '$1-$2').toLowerCase();
    }

    function merge(source1, source2, overrideWithUndefined) {
      var res = {};

      for (var key in source1) {
        res[key] = source1[key];
      }

      for (var _key in source2) {
        var val = source2[_key];

        if (overrideWithUndefined || typeof val !== 'undefined') {
          res[_key] = val;
        }
      }

      return res;
    }

    /** @const */
    var IS_DEBUG =  'development' === 'development';

    function setAttr(node, name, val) {
      if (name === 'type' && node.tagName === 'INPUT') {
        var value = node.value; // value will be lost in IE if type is changed

        node.setAttribute(name, '' + val);
        node.value = value;
      } else {
        node.setAttribute(getAttrName(name), '' + val);
      }
    }

    function setBooleanAttr(node, name, val) {
      if (val) {
        setAttr(node, name, val);
      } else {
        removeAttr(node, name);
      }
    }

    function setProp(node, name, val) {
      node[name] = val;
    }

    function setObjProp(node, name, val) {
      {
        var typeOfVal = typeof val;

        if (typeOfVal !== 'object') {
          throw TypeError("vidom: \"" + name + "\" attribute value must be an object, not a " + typeOfVal);
        }
      }

      var prop = node[name];

      for (var i in val) {
        prop[i] = val[i] == null ? '' : val[i];
      }
    }

    function setPropWithCheck(node, name, val) {
      if (name === 'value' && node.tagName === 'SELECT') {
        setSelectValue(node, val);
      } else if (node[name] !== val) {
        node[name] = val;
      }
    }

    function removeAttr(node, name) {
      node.removeAttribute(getAttrName(name));
    }

    function removeProp(node, name) {
      if (name === 'style') {
        node[name].cssText = '';
      } else if (name === 'value' && node.tagName === 'SELECT') {
        removeSelectValue(node);
      } else {
        node[name] = getDefaultPropVal(node.tagName, name);
      }
    }

    function setSelectValue(node, value) {
      var isMultiple = Array.isArray(value);

      if (isMultiple) {
        var options = node.options,
            len = options.length;
        var i = 0,
            optionNode;

        while (i < len) {
          optionNode = options[i++];
          optionNode.selected = value != null && isInArray(value, optionNode.value);
        }
      } else {
        node.value = value;
      }
    }

    function removeSelectValue(node) {
      var options = node.options,
          len = options.length;
      var i = 0;

      while (i < len) {
        options[i++].selected = false;
      }
    }

    function attrToString(name, value) {
      var attrName = getAttrName(name);
      return attrName && attrName + '="' + escapeAttr(value) + '"';
    }

    function booleanAttrToString(name, value) {
      return value ? getAttrName(name) : '';
    }

    function overloadedBooleanAttrToString(name, value) {
      return typeof value === 'boolean' ? booleanAttrToString(name, value) : attrToString(name, value);
    }

    function stylePropToString(name, value) {
      var styles = '',
          i;

      for (i in value) {
        if (value[i] != null) {
          styles += dasherize(i) + ':' + value[i] + ';';
        }
      }

      return styles ? name + '="' + styles + '"' : styles;
    }

    var defaultNodes = Object.create(null),
        defaultPropVals = Object.create(null);

    function getDefaultPropVal(tag, attrName) {
      var key = tag + ":" + attrName;

      if (key in defaultPropVals) {
        return defaultPropVals[key];
      }

      var node = tag in defaultNodes ? defaultNodes[tag] : defaultNodes[tag] = document.createElement(tag);
      return defaultPropVals[key] = node[attrName];
    }

    var VALID_ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",
        VALID_ATTRIBUTE_NAME_CHAR = VALID_ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",
        VALID_ATTRIBUTE_NAME_RE = new RegExp("^[" + VALID_ATTRIBUTE_NAME_START_CHAR + "][" + VALID_ATTRIBUTE_NAME_CHAR + "]*$"),
        attrNames = Object.create(null);

    function getAttrName(attrName) {
      return attrName in attrNames ? attrNames[attrName] : attrNames[attrName] = VALID_ATTRIBUTE_NAME_RE.test(attrName) ? attrName.toLowerCase() : '';
    }

    var DEFAULT_ATTR_CFG = {
      set: setAttr,
      remove: removeAttr,
      toString: attrToString
    },
        BOOLEAN_ATTR_CFG = merge(DEFAULT_ATTR_CFG, {
      set: setBooleanAttr,
      toString: booleanAttrToString
    }),
        OVERLOADED_BOOLEAN_ATTR_CFG = merge(BOOLEAN_ATTR_CFG, {
      toString: overloadedBooleanAttrToString
    }),
        DEFAULT_PROP_CFG = {
      set: setProp,
      remove: removeProp,
      toString: attrToString
    },
        BOOLEAN_PROP_CFG = merge(DEFAULT_PROP_CFG, {
      toString: booleanAttrToString
    }),
        attrsCfg = Object.create(null);
    attrNames.acceptCharset = 'accept-charset';
    attrNames.className = 'class';
    attrNames.htmlFor = 'for';
    attrNames.httpEquiv = 'http-equiv';
    attrsCfg.autoPlay = BOOLEAN_ATTR_CFG;
    attrsCfg.checked = BOOLEAN_PROP_CFG;
    attrsCfg.controls = DEFAULT_PROP_CFG;
    attrsCfg.disabled = BOOLEAN_ATTR_CFG;
    attrsCfg.download = OVERLOADED_BOOLEAN_ATTR_CFG;
    attrsCfg.id = DEFAULT_PROP_CFG;
    attrsCfg.ismap = BOOLEAN_ATTR_CFG;
    attrsCfg.loop = DEFAULT_PROP_CFG;
    attrsCfg.multiple = BOOLEAN_PROP_CFG;
    attrsCfg.muted = DEFAULT_PROP_CFG;
    attrsCfg.open = BOOLEAN_ATTR_CFG;
    attrsCfg.readOnly = BOOLEAN_PROP_CFG;
    attrsCfg.selected = BOOLEAN_PROP_CFG;
    attrsCfg.srcDoc = DEFAULT_PROP_CFG;
    attrsCfg.style = {
      set: setObjProp,
      remove: removeProp,
      toString: stylePropToString
    };
    attrsCfg.value = {
      set: setPropWithCheck,
      remove: removeProp,
      toString: attrToString
    };
    function domAttrs (attrName) {
      return attrName in attrsCfg ? attrsCfg[attrName] : DEFAULT_ATTR_CFG;
    }

    function append(parent, child) {
      if (Array.isArray(parent)) {
        insertBefore(child, parent[1]);
      } else if (Array.isArray(child)) {
        var currentChild = child[0],
            nextChild;
        var lastChild = child[1];

        while (currentChild !== lastChild) {
          nextChild = currentChild.nextSibling;
          parent.appendChild(currentChild);
          currentChild = nextChild;
        }

        parent.appendChild(lastChild);
      } else {
        parent.appendChild(child);
      }
    }

    function remove(child) {
      if (Array.isArray(child)) {
        var currentChild = child[0],
            nextChild;
        var lastChild = child[1],
            parent = lastChild.parentNode;

        while (currentChild !== lastChild) {
          nextChild = currentChild.nextSibling;
          parent.removeChild(currentChild);
          currentChild = nextChild;
        }

        parent.removeChild(lastChild);
      } else {
        child.parentNode.removeChild(child);
      }
    }

    function insertBefore(child, beforeChild) {
      if (Array.isArray(beforeChild)) {
        beforeChild = beforeChild[0];
      }

      if (Array.isArray(child)) {
        var currentChild = child[0],
            nextChild;
        var lastChild = child[1],
            parent = lastChild.parentNode;

        while (currentChild !== lastChild) {
          nextChild = currentChild.nextSibling;
          parent.insertBefore(currentChild, beforeChild);
          currentChild = nextChild;
        }

        parent.insertBefore(lastChild, beforeChild);
      } else {
        beforeChild.parentNode.insertBefore(child, beforeChild);
      }
    }

    function move(child, toChild, after) {
      if (after) {
        if (Array.isArray(toChild)) {
          toChild = toChild[1];
        }

        var nextSibling = toChild.nextSibling;

        if (nextSibling) {
          insertBefore(child, nextSibling);
        } else {
          append(toChild.parentNode, child);
        }
      } else {
        insertBefore(child, toChild);
      }
    }

    function replace(old, replacement) {
      if (Array.isArray(old)) {
        insertBefore(replacement, old);
        remove(old);
      } else {
        old.parentNode.replaceChild(replacement, old);
      }
    }

    function removeChildren(from) {
      if (Array.isArray(from)) {
        var currentChild = from[0].nextSibling,
            nextChild;
        var lastChild = from[1],
            parent = lastChild.parentNode;

        while (currentChild !== lastChild) {
          nextChild = currentChild.nextSibling;
          parent.removeChild(currentChild);
          currentChild = nextChild;
        }
      } else {
        from.textContent = '';
      }
    }

    function updateText(node, text, escape) {
      if (Array.isArray(node)) {
        var beforeChild = node[1],
            previousChild = beforeChild.previousSibling;

        if (previousChild === node[0]) {
          beforeChild.parentNode.insertBefore(document.createTextNode(text), beforeChild);
        } else {
          previousChild.nodeValue = text;
        }
      } else if (escape) {
        var firstChild = node.firstChild;

        if (firstChild) {
          firstChild.nodeValue = text;
        } else {
          node.textContent = text;
        }
      } else {
        node.innerHTML = text;
      }
    }

    function removeText(from) {
      if (Array.isArray(from)) {
        var child = from[0].nextSibling;
        child.parentNode.removeChild(child);
      } else {
        from.textContent = '';
      }
    }

    var domOps = {
      append: append,
      remove: remove,
      insertBefore: insertBefore,
      move: move,
      replace: replace,
      removeChildren: removeChildren,
      updateText: updateText,
      removeText: removeText
    };

    var ID_PROP = typeof Symbol === 'undefined' ? '__vidom__id__' : Symbol();
    var counter = 1;

    function getDomNodeId(node, onlyGet) {
      return ID_PROP in node ? node[ID_PROP] : onlyGet ? null : node[ID_PROP] = counter++;
    }

    var ua = typeof navigator === 'undefined' ? '' : navigator.userAgent,
        platform = typeof navigator === 'undefined' ? '' : navigator.platform;
    var isTrident = ua.indexOf('Trident') > -1;
    var isEdge = ua.indexOf('Edge') > -1;
    var isIos = /iPad|iPhone|iPod/.test(platform);

    var MOUSE_NATIVE_EVENTS = ['click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];
    var BUBBLEABLE_NATIVE_EVENTS = ['animationend', 'animationiteration', 'animationstart', 'blur', 'change', 'contextmenu', 'copy', 'cut', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'focus', 'input', 'keydown', 'keypress', 'keyup', 'paste', 'pointerover', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'submit', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'transitionend', 'wheel'],
        NON_BUBBLEABLE_NATIVE_EVENTS = ['canplay', 'canplaythrough', 'complete', 'durationchange', 'emptied', 'ended', 'error', 'gotpointercapture', 'load', 'loadeddata', 'loadedmetadata', 'loadstart', 'lostpointercapture', 'mouseenter', 'mouseleave', 'pause', 'play', 'playing', 'pointerenter', 'pointerleave', 'progress', 'ratechange', 'scroll', 'seeked', 'seeking', 'select', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];

    if (isIos) {
      NON_BUBBLEABLE_NATIVE_EVENTS = [].concat(NON_BUBBLEABLE_NATIVE_EVENTS, MOUSE_NATIVE_EVENTS);
    } else {
      BUBBLEABLE_NATIVE_EVENTS = [].concat(BUBBLEABLE_NATIVE_EVENTS, MOUSE_NATIVE_EVENTS);
    }

    var listenersStorage = Object.create(null),
        eventsCfg = Object.create(null);
    var areListenersEnabled = true;

    function globalEventListener(e, type) {
      if (type === void 0) {
        type = e.type;
      }

      if (!areListenersEnabled) {
        return;
      }

      var target = e.target,
          listenersCount = eventsCfg[type].listenersCount,
          listener,
          domNodeId;

      while (listenersCount && target && target !== document) {
        // need to check target for detached dom
        if (domNodeId = getDomNodeId(target, true)) {
          if (domNodeId in listenersStorage) {
            listener = listenersStorage[domNodeId][type];

            if (listener != null) {
              listener(e);

              if (--listenersCount === 0 || e.cancelBubble) {
                return;
              }
            }
          }
        }

        target = target.parentNode;
      }
    }

    function eventListener(e) {
      if (areListenersEnabled) {
        listenersStorage[getDomNodeId(e.currentTarget)][e.type](e);
      }
    }

    if (typeof document !== 'undefined') {
      (function () {
        var focusEvents = {
          focus: 'focusin',
          blur: 'focusout'
        };
        var i = 0,
            isBubblingFocusSupported = true,
            type;
        var matchFirefox = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/);

        if (matchFirefox !== null && Number(matchFirefox[1]) < 52) {
          isBubblingFocusSupported = false;
        }

        while (i < BUBBLEABLE_NATIVE_EVENTS.length) {
          type = BUBBLEABLE_NATIVE_EVENTS[i++];
          eventsCfg[type] = {
            type: type,
            bubbles: true,
            listenersCount: 0,
            set: false,
            setup: type in focusEvents ? isBubblingFocusSupported ? function () {
              var type = this.type;
              document.addEventListener(focusEvents[type], function (e) {
                globalEventListener(e, type);
              });
            } : function () {
              document.addEventListener(this.type, globalEventListener, true);
            } : null
          };
        }

        i = 0;

        while (i < NON_BUBBLEABLE_NATIVE_EVENTS.length) {
          eventsCfg[NON_BUBBLEABLE_NATIVE_EVENTS[i++]] = {
            type: type,
            bubbles: false,
            set: false,
            setup: null
          };
        }
      })();
    }

    function doAddListener(cfg, domNode, type) {
      if (cfg.bubbles) {
        ++cfg.listenersCount;
      } else {
        domNode.addEventListener(type, eventListener, false);
      }
    }

    function addListener(domNode, type, listener) {
      if (!(type in eventsCfg)) {
        return;
      }

      var cfg = eventsCfg[type];

      if (!cfg.set) {
        if (cfg.setup !== null) {
          cfg.setup();
        } else if (cfg.bubbles) {
          document.addEventListener(type, globalEventListener, false);
        }

        cfg.set = true;
      }

      var domNodeId = getDomNodeId(domNode);
      var listeners;

      if (domNodeId in listenersStorage) {
        listeners = listenersStorage[domNodeId];

        if (listeners[type] == null) {
          doAddListener(cfg, domNode, type);
        }
      } else {
        listeners = listenersStorage[domNodeId] = Object.create(null);
        doAddListener(cfg, domNode, type);
      }

      listeners[type] = listener;
    }

    function doRemoveListener(cfg, domNode, type) {
      if (cfg.bubbles) {
        --cfg.listenersCount;
      } else {
        domNode.removeEventListener(type, eventListener);
      }
    }

    function removeListener(domNode, type) {
      var domNodeId = getDomNodeId(domNode, true);

      if (domNodeId !== null) {
        if (domNodeId in listenersStorage) {
          var listeners = listenersStorage[domNodeId];
          listeners[type] = null;
          doRemoveListener(eventsCfg[type], domNode, type);
        }
      }
    }

    function removeListeners(domNode) {
      var domNodeId = getDomNodeId(domNode, true);

      if (domNodeId !== null && domNodeId in listenersStorage) {
        var listeners = listenersStorage[domNodeId];

        for (var type in listeners) {
          if (listeners[type] !== null) {
            doRemoveListener(eventsCfg[type], domNode, type);
          }
        }

        delete listenersStorage[domNodeId];
      }
    }

    function disableListeners() {
      areListenersEnabled = false;
    }

    function enableListeners() {
      areListenersEnabled = true;
    }

    var NS = Object.create(null);
    NS.html = 'http://www.w3.org/1999/xhtml';
    NS.svg = 'http://www.w3.org/2000/svg';
    NS.math = 'http://www.w3.org/1998/Math/MathML';
    function getNs(domNode) {
      return Array.isArray(domNode) ? getParentNs(domNode) : domNode.namespaceURI === NS.html ? null : domNode.namespaceURI;
    }
    function getParentNs(domNode) {
      return getNs((Array.isArray(domNode) ? domNode[domNode.length - 1] : domNode).parentNode);
    }

    var ATTRS_TO_EVENTS = ['onAnimationEnd', 'onAnimationIteration', 'onAnimationStart', 'onBlur', 'onCanPlay', 'onCanPlayThrough', 'onChange', 'onClick', 'onComplete', 'onContextMenu', 'onCopy', 'onCut', 'onDblClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onDurationChange', 'onEmptied', 'onEnded', 'onError', 'onFocus', 'onGotPointerCapture', 'onInput', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onLoad', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onLostPointerCapture', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onPaste', 'onPause', 'onPlay', 'onPlaying', 'onPointerCancel', 'onPointerDown', 'onPointerEnter', 'onPointerLeave', 'onPointerMove', 'onPointerOut', 'onPointerOver', 'onPointerUp', 'onProgress', 'onRateChange', 'onScroll', 'onSeeked', 'onSeeking', 'onSelect', 'onStalled', 'onSubmit', 'onSuspend', 'onTimeUpdate', 'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'onTransitionEnd', 'onVolumeChange', 'onWaiting', 'onWheel'].reduce(function (res, attr) {
      res[attr] = attr.substr(2).toLowerCase();
      return res;
    }, Object.create(null));

    function appendChild(parentElement, childElement) {
      var parentDomNode = parentElement.getDomNode();
      domOps.append(parentDomNode, childElement.renderToDom(getNs(parentDomNode)));
      childElement.mount();
    }

    function insertChild(childElement, beforeChildElement) {
      var beforeChildDomNode = beforeChildElement.getDomNode();
      domOps.insertBefore(childElement.renderToDom(getParentNs(beforeChildDomNode)), beforeChildDomNode);
      childElement.mount();
    }

    function removeChild(childElement) {
      var childDomNode = childElement.getDomNode();
      childElement.unmount();
      domOps.remove(childDomNode);
    }

    function moveChild(childElement, toChildelement, after) {
      var activeDomNode = document.activeElement;
      disableListeners();
      domOps.move(childElement.getDomNode(), toChildelement.getDomNode(), after);

      if (document.activeElement !== activeDomNode) {
        activeDomNode.focus();
      }

      enableListeners();
    }

    function removeChildren$1(parentElement) {
      var parentDomNode = parentElement.getDomNode(),
          childNodes = parentElement.children,
          len = childNodes.length;
      var j = 0;

      while (j < len) {
        childNodes[j++].unmount();
      }

      domOps.removeChildren(parentDomNode);
    }

    function replace$1(oldElement, newElement) {
      var oldDomNode = oldElement.getDomNode();
      oldElement.unmount();
      domOps.replace(oldDomNode, newElement.renderToDom(getParentNs(oldDomNode)));
      newElement.mount();
    }

    function updateAttr(element, attrName, attrVal) {
      var domNode = element.getDomNode();

      if (attrName in ATTRS_TO_EVENTS) {
        addListener(domNode, ATTRS_TO_EVENTS[attrName], attrVal);
      } else {
        domAttrs(attrName).set(domNode, attrName, attrVal);
      }
    }

    function removeAttr$1(element, attrName) {
      var domNode = element.getDomNode();

      if (attrName in ATTRS_TO_EVENTS) {
        removeListener(domNode, ATTRS_TO_EVENTS[attrName]);
      } else {
        domAttrs(attrName).remove(domNode, attrName);
      }
    }

    function updateText$1(element, text, escape) {
      domOps.updateText(element.getDomNode(), text, escape);
    }

    function removeText$1(element) {
      domOps.removeText(element.getDomNode());
    }

    var patchOps = {
      appendChild: appendChild,
      insertChild: insertChild,
      removeChild: removeChild,
      moveChild: moveChild,
      removeChildren: removeChildren$1,
      replace: replace$1,
      updateAttr: updateAttr,
      removeAttr: removeAttr$1,
      updateText: updateText$1,
      removeText: removeText$1
    };

    function checkReuse(node, name) {
      if (node.getDomNode()) {
        throw Error("vidom: Detected unexpected attempt to reuse the same node \"" + name + "\".");
      }
    }

    function checkChildren(children) {
      var keys = Object.create(null),
          len = children.length;
      var i = 0,
          child;

      while (i < len) {
        child = children[i++];

        if (child.key != null) {
          if (child.key in keys) {
            throw Error('vidom: Childrens\' keys must be unique across the children. ' + ("Found duplicate of \"" + child.key + "\" key."));
          } else {
            keys[child.key] = true;
          }
        }
      }
    }

    function patchChildren(elementA, elementB) {
      var childrenA = elementA.children,
          childrenB = elementB.children,
          childrenALen = childrenA.length,
          childrenBLen = childrenB.length;

      if (childrenALen === 1 && childrenBLen === 1) {
        childrenA[0].patch(childrenB[0]);
        return;
      }

      var leftIdxA = 0,
          rightIdxA = childrenALen - 1,
          leftChildA = childrenA[leftIdxA],
          leftChildAKey = leftChildA.key,
          rightChildA = childrenA[rightIdxA],
          rightChildAKey = rightChildA.key,
          leftIdxB = 0,
          rightIdxB = childrenBLen - 1,
          leftChildB = childrenB[leftIdxB],
          leftChildBKey = leftChildB.key,
          rightChildB = childrenB[rightIdxB],
          rightChildBKey = rightChildB.key,
          updateIdxs = 0,
          // 1 — left A, 2 — right A, 4 — left B, 8 — right B
      childrenAKeys = null,
          foundAChildIdx,
          foundAChild;
      var childrenAIndicesToSkip = Object.create(null);

      while (leftIdxA <= rightIdxA && leftIdxB <= rightIdxB) {
        if (leftIdxA in childrenAIndicesToSkip) {
          updateIdxs = 1;
        } else if (rightIdxA in childrenAIndicesToSkip) {
          updateIdxs = 2;
        } else if (leftChildAKey === leftChildBKey) {
          leftChildA.patch(leftChildB);
          updateIdxs = 5;
        } else if (rightChildAKey === rightChildBKey) {
          rightChildA.patch(rightChildB);
          updateIdxs = 10;
        } else if (leftChildAKey !== null && leftChildAKey === rightChildBKey) {
          patchOps.moveChild(leftChildA, rightChildA, true);
          leftChildA.patch(rightChildB);
          updateIdxs = 9;
        } else if (rightChildAKey !== null && rightChildAKey === leftChildBKey) {
          patchOps.moveChild(rightChildA, leftChildA, false);
          rightChildA.patch(leftChildB);
          updateIdxs = 6;
        } else if (leftChildAKey !== null && leftChildBKey === null) {
          patchOps.insertChild(leftChildB, leftChildA);
          updateIdxs = 4;
        } else if (leftChildAKey === null && leftChildBKey !== null) {
          patchOps.removeChild(leftChildA);
          updateIdxs = 1;
        } else {
          if (childrenAKeys === null) {
            childrenAKeys = buildKeys(childrenA, leftIdxA, rightIdxA);
          }

          if (leftChildBKey in childrenAKeys) {
            foundAChildIdx = childrenAKeys[leftChildBKey];
            foundAChild = childrenA[foundAChildIdx];
            childrenAIndicesToSkip[foundAChildIdx] = true;
            patchOps.moveChild(foundAChild, leftChildA, false);
            foundAChild.patch(leftChildB);
          } else {
            patchOps.insertChild(leftChildB, leftChildA);
          }

          updateIdxs = 4;
        }

        if ((updateIdxs & 1) === 1) {
          if (++leftIdxA <= rightIdxA) {
            leftChildA = childrenA[leftIdxA];
            leftChildAKey = leftChildA.key;
          }
        }

        if ((updateIdxs & 2) === 2) {
          if (--rightIdxA >= leftIdxA) {
            rightChildA = childrenA[rightIdxA];
            rightChildAKey = rightChildA.key;
          }
        }

        if ((updateIdxs & 4) === 4) {
          if (++leftIdxB <= rightIdxB) {
            leftChildB = childrenB[leftIdxB];
            leftChildBKey = leftChildB.key;
          }
        }

        if ((updateIdxs & 8) === 8) {
          if (--rightIdxB >= leftIdxB) {
            rightChildB = childrenB[rightIdxB];
            rightChildBKey = rightChildB.key;
          }
        }

        updateIdxs = 0;
      }

      while (leftIdxA <= rightIdxA) {
        if (!(leftIdxA in childrenAIndicesToSkip)) {
          patchOps.removeChild(childrenA[leftIdxA]);
        }

        ++leftIdxA;
      }

      while (leftIdxB <= rightIdxB) {
        if (rightIdxB < childrenBLen - 1) {
          patchOps.insertChild(childrenB[leftIdxB], childrenB[rightIdxB + 1]);
        } else {
          patchOps.appendChild(elementB, childrenB[leftIdxB]);
        }

        ++leftIdxB;
      }
    }

    function buildKeys(children, idxFrom, idxTo) {
      var res = Object.create(null);
      var childKey;

      while (idxFrom < idxTo) {
        childKey = children[idxFrom].key;

        if (childKey !== null) {
          res[childKey] = idxFrom;
        }

        ++idxFrom;
      }

      return res;
    }

    var AMP_RE$1 = /&/g,
        LT_RE = /</g,
        GT_RE = />/g;
    function escapeHtml(str) {
      str = str + '';
      var i = str.length,
          escapes = 0; // 1 — escape '&', 2 — escape '<', 4 — escape '>'

      while (i-- > 0) {
        switch (str.charCodeAt(i)) {
          case 38:
            escapes |= 1;
            break;

          case 60:
            escapes |= 2;
            break;

          case 62:
            escapes |= 4;
            break;
        }
      }

      if ((escapes & 1) === 1) {
        str = str.replace(AMP_RE$1, '&amp;');
      }

      if ((escapes & 2) === 2) {
        str = str.replace(LT_RE, '&lt;');
      }

      if ((escapes & 4) === 4) {
        str = str.replace(GT_RE, '&gt;');
      }

      return str;
    }

    var obj = Object.create(null);

    {
      Object.freeze(obj);
    }

    var elementProtos = Object.create(null);
    function createElement(tag, ns) {
      var baseElement;

      if (ns === null) {
        baseElement = tag in elementProtos ? elementProtos[tag] : elementProtos[tag] = tag === '!' ? document.createComment('') : document.createElement(tag);
      } else {
        var key = ns + ":" + tag;
        baseElement = key in elementProtos ? elementProtos[key] : elementProtos[key] = document.createElementNS(ns, tag);
      }

      return baseElement.cloneNode();
    }

    var TOP_LEVEL_NS_TAGS = {
      'http://www.w3.org/2000/svg': 'svg',
      'http://www.w3.org/1998/Math/MathML': 'math'
    },
        parentTags = {
      thead: 'table',
      tbody: 'table',
      tfoot: 'table',
      tr: 'tbody',
      td: 'tr'
    },
        helperDomNodes = Object.create(null);
    function createElementByHtml(html, tag, ns) {
      var parentTag = parentTags[tag] || 'div',
          helperDomNode = helperDomNodes[parentTag] || (helperDomNodes[parentTag] = document.createElement(parentTag));

      if (!ns || !TOP_LEVEL_NS_TAGS[ns] || TOP_LEVEL_NS_TAGS[ns] === tag) {
        helperDomNode.innerHTML = html;
        return helperDomNode.removeChild(helperDomNode.firstChild);
      }

      var topLevelTag = TOP_LEVEL_NS_TAGS[ns];
      helperDomNode.innerHTML = "<" + topLevelTag + " xmlns=\"" + ns + "\">" + html + "</" + topLevelTag + ">";
      return helperDomNode.removeChild(helperDomNode.firstChild).firstChild;
    }

    function restrictObjProp(obj, prop) {
      var hiddenProp = "__" + prop + "__";
      Object.defineProperty(obj, prop, {
        get: function get() {
          return obj[hiddenProp];
        },
        set: function set(value) {
          if (obj.__isFrozen) {
            throw TypeError("vidom: " + prop + " is readonly");
          }

          obj[hiddenProp] = value;
        }
      });
    }

    var ELEMENT_TYPE_TAG = 1;
    var ELEMENT_TYPE_TEXT = 2;
    var ELEMENT_TYPE_FRAGMENT = 3;
    var ELEMENT_TYPE_COMPONENT = 4;
    var ELEMENT_TYPE_FUNCTION_COMPONENT = 5;

    function normalizeNode(obj) {
      if (obj == null) {
        return null;
      }

      var typeOfObj = typeof obj;

      if (typeOfObj !== 'object') {
        return typeOfObj === 'string' ? obj || null : typeOfObj === 'boolean' ? null : '' + obj;
      }

      if (!Array.isArray(obj)) {
        return obj;
      }

      if (obj.length === 0) {
        return null;
      }

      var res = obj,
          i = 0,
          hasContentBefore = false,
          child;
      var len = obj.length,
          alreadyNormalizeChildren = Object.create(null);

      while (i < len) {
        child = i in alreadyNormalizeChildren ? alreadyNormalizeChildren[i] : normalizeNode(obj[i]);

        if (child === null) {
          if (res !== null) {
            if (!hasContentBefore) {
              res = null;
            } else if (res === obj) {
              res = obj.slice(0, i);
            }
          }
        } else if (typeof child === 'object') {
          if (Array.isArray(child)) {
            res = hasContentBefore ? (res === obj ? res.slice(0, i) : Array.isArray(res) ? res : [nodeToElement(res)]).concat(child) : child;
          } else if (res !== obj) {
            if (!hasContentBefore) {
              res = child;
            } else if (Array.isArray(res)) {
              res.push(child);
            } else {
              res = [nodeToElement(res), child];
            }
          } else if (child !== obj[i]) {
            if (hasContentBefore) {
              res = res.slice(0, i);
              res.push(child);
            } else {
              res = child;
            }
          }

          hasContentBefore = true;
        } else {
          var nextChild = void 0,
              j = i; // join all next text nodes

          while (++j < len) {
            nextChild = alreadyNormalizeChildren[j] = normalizeNode(obj[j]);

            if (typeof nextChild === 'string') {
              child += nextChild;
            } else if (nextChild !== null) {
              break;
            }
          }

          if (hasContentBefore) {
            if (Array.isArray(res)) {
              if (res === obj) {
                res = res.slice(0, i);
              }

              res.push(nodeToElement(child));
            } else {
              res = [res, nodeToElement(child)];
            }
          } else {
            res = '' + child;
          }

          i = j - 1;
          hasContentBefore = true;
        }

        ++i;
      }

      return res;
    }

    function nodeToElement(obj) {
      return typeof obj === 'object' ? obj : createElement$1('plaintext', null, null, obj);
    }

    var SHORT_TAGS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'].reduce(function (res, tag) {
      res[tag] = true;
      return res;
    }, Object.create(null)),
        USE_DOM_STRINGS = isTrident || isEdge;
    function TagElement(tag, key, attrs, children, ref, escapeChildren) {
      {
        restrictObjProp(this, 'type');
        restrictObjProp(this, 'tag');
        restrictObjProp(this, 'key');
        restrictObjProp(this, 'attrs');
        restrictObjProp(this, 'children');
        restrictObjProp(this, 'ref');
        this.__isFrozen = false;
      }

      this.type = ELEMENT_TYPE_TAG;
      this.tag = tag;
      this.key = key == null ? null : key;
      this.attrs = attrs || obj;
      this.children = processChildren(children);
      this.ref = ref == null ? null : ref;

      {
        checkAttrs(this.attrs);
        Object.freeze(this.attrs);

        if (Array.isArray(this.children)) {
          Object.freeze(this.children);
        }

        this.__isFrozen = true;
      }

      this._domNode = null;
      this._ns = tag in NS ? NS[tag] : null;
      this._escapeChildren = escapeChildren !== false;
      this._ctx = obj;
    }
    TagElement.prototype = {
      getDomNode: function getDomNode() {
        return this._domNode;
      },
      setCtx: function setCtx(ctx) {
        if (ctx !== obj) {
          this._ctx = ctx;
          var children = this.children;

          if (children !== null && typeof children !== 'string') {
            var len = children.length;
            var i = 0;

            while (i < len) {
              children[i++].setCtx(ctx);
            }
          }
        }

        return this;
      },
      renderToDom: function renderToDom(parentNs) {
        {
          checkReuse(this, this.tag);
        }

        var tag = this.tag,
            children = this.children,
            ns = this._ns || parentNs;

        if (USE_DOM_STRINGS && children && typeof children !== 'string') {
          var _domNode = createElementByHtml(this.renderToString(), tag, ns);

          this.adoptDom([_domNode], 0);
          return _domNode;
        }

        var domNode = this._domNode = createElement(tag, ns),
            attrs = this.attrs;

        if (children !== null) {
          if (typeof children === 'string') {
            this._escapeChildren ? domNode.textContent = children : domNode.innerHTML = children;
          } else {
            var i = 0;
            var len = children.length;

            while (i < len) {
              domNode.appendChild(children[i++].renderToDom(ns));
            }
          }
        }

        if (attrs !== obj) {
          var name, value;

          for (name in attrs) {
            if ((value = attrs[name]) != null) {
              if (name in ATTRS_TO_EVENTS) {
                addListener(domNode, ATTRS_TO_EVENTS[name], value);
              } else {
                domAttrs(name).set(domNode, name, value);
              }
            }
          }
        }

        return domNode;
      },
      renderToString: function renderToString() {
        var tag = this.tag;

        if (tag === '!') {
          return '<!---->';
        }

        var ns = this._ns,
            attrs = this.attrs;
        var children = this.children,
            res = '<' + tag;

        if (ns !== null) {
          res += ' xmlns="' + ns + '"';
        }

        if (attrs !== obj) {
          var name, value, attrHtml;

          for (name in attrs) {
            value = attrs[name];

            if (value != null) {
              if (name === 'value') {
                switch (tag) {
                  case 'textarea':
                    children = value;
                    continue;

                  case 'select':
                    this.setCtx({
                      value: value,
                      multiple: attrs.multiple
                    });
                    continue;

                  case 'option':
                    var ctx = this._ctx;

                    if (ctx.multiple ? isInArray(ctx.value, value) : ctx.value === value) {
                      res += ' ' + domAttrs('selected').toString('selected', true);
                    }

                }
              }

              if (!(name in ATTRS_TO_EVENTS) && (attrHtml = domAttrs(name).toString(name, value)) !== '') {
                res += ' ' + attrHtml;
              }
            }
          }
        }

        if (tag in SHORT_TAGS) {
          res += '/>';
        } else {
          res += '>';

          if (children !== null) {
            if (typeof children === 'string') {
              res += this._escapeChildren ? escapeHtml(children) : children;
            } else {
              var i = 0;
              var len = children.length;

              while (i < len) {
                res += children[i++].renderToString();
              }
            }
          }

          res += '</' + tag + '>';
        }

        return res;
      },
      adoptDom: function adoptDom(domNodes, domIdx) {
        {
          checkReuse(this, this.tag);
        }

        var domNode = this._domNode = domNodes[domIdx],
            attrs = this.attrs,
            children = this.children;

        if (attrs !== obj) {
          var name, value;

          for (name in attrs) {
            if ((value = attrs[name]) != null && name in ATTRS_TO_EVENTS) {
              addListener(domNode, ATTRS_TO_EVENTS[name], value);
            }
          }
        }

        if (children !== null && typeof children !== 'string') {
          var i = 0;
          var len = children.length;

          if (len > 0) {
            var domChildren = domNode.childNodes;
            var domChildIdx = 0;

            while (i < len) {
              domChildIdx = children[i++].adoptDom(domChildren, domChildIdx);
            }
          }
        }

        return domIdx + 1;
      },
      mount: function mount() {
        var children = this.children;

        if (children !== null && typeof children !== 'string') {
          var i = 0;
          var len = children.length;

          while (i < len) {
            children[i++].mount();
          }
        }

        if (this.ref !== null) {
          this.ref(this._domNode);
        }
      },
      unmount: function unmount() {
        var children = this.children;

        if (children && typeof children !== 'string') {
          var i = 0;
          var len = children.length;

          while (i < len) {
            children[i++].unmount();
          }
        }

        removeListeners(this._domNode);
        this._domNode = null;

        if (this.ref !== null) {
          this.ref(null);
        }
      },
      clone: function clone(attrs, children, ref) {
        var res = new TagElement(this.tag, this.key);

        {
          res.__isFrozen = false;
        }

        res.attrs = attrs == null ? this.attrs : merge(this.attrs, attrs);
        res.children = children == null ? this.children : processChildren(children);
        res.ref = ref == null ? this.ref : ref;

        {
          res.__isFrozen = true;
        }

        res._escapeChildren = this._escapeChildren;
        res._ctx = this._ctx;
        return res;
      },
      patch: function patch(element) {
        if (this === element) {
          this._patchChildren(element);
        } else if (this.type === element.type && this.tag === element.tag && this._ns === element._ns) {
          element._domNode = this._domNode;

          this._patchAttrs(element);

          this._patchChildren(element);

          this._patchRef(element);
        } else {
          patchOps.replace(this, element);
        }
      },
      _patchChildren: function _patchChildren(element) {
        var childrenA = this.children,
            childrenB = element.children;

        if (childrenA === null && childrenB === null) {
          return;
        }

        var isChildrenAText = typeof childrenA === 'string',
            isChildrenBText = typeof childrenB === 'string';

        if (isChildrenBText) {
          if (isChildrenAText) {
            if (childrenA !== childrenB) {
              patchOps.updateText(this, childrenB, element._escapeChildren);
            }

            return;
          }

          if (childrenA !== null && childrenA.length > 0) {
            patchOps.removeChildren(this);
          }

          if (childrenB !== '') {
            patchOps.updateText(this, childrenB, element._escapeChildren);
          }

          return;
        }

        if (childrenB === null || childrenB.length === 0) {
          if (childrenA) {
            if (isChildrenAText) {
              patchOps.removeText(this);
            } else if (childrenA.length > 0) {
              patchOps.removeChildren(this);
            }
          }

          return;
        }

        if (isChildrenAText && childrenA !== '') {
          patchOps.removeText(this);
        }

        if (isChildrenAText || childrenA === null || childrenA.length === 0) {
          var childrenBLen = childrenB.length;
          var iB = 0;

          while (iB < childrenBLen) {
            patchOps.appendChild(element, childrenB[iB++]);
          }

          return;
        }

        patchChildren(this, element);
      },
      _patchAttrs: function _patchAttrs(element) {
        var attrsA = this.attrs,
            attrsB = element.attrs;

        if (attrsA === attrsB) {
          return;
        }

        var attrName;

        if (attrsB !== obj) {
          var attrAVal, attrBVal, isAttrAValArray, isAttrBValArray;

          for (attrName in attrsB) {
            attrBVal = attrsB[attrName];

            if (attrsA === obj || (attrAVal = attrsA[attrName]) == null) {
              if (attrBVal != null) {
                patchOps.updateAttr(this, attrName, attrBVal);
              }
            } else if (attrBVal == null) {
              patchOps.removeAttr(this, attrName);
            } else if (typeof attrBVal === 'object' && typeof attrAVal === 'object') {
              isAttrBValArray = Array.isArray(attrBVal);
              isAttrAValArray = Array.isArray(attrAVal);

              if (isAttrBValArray || isAttrAValArray) {
                if (isAttrBValArray && isAttrAValArray) {
                  this._patchAttrArr(attrName, attrAVal, attrBVal);
                } else {
                  patchOps.updateAttr(this, attrName, attrBVal);
                }
              } else {
                this._patchAttrObj(attrName, attrAVal, attrBVal);
              }
            } else if (attrAVal !== attrBVal) {
              patchOps.updateAttr(this, attrName, attrBVal);
            }
          }
        }

        if (attrsA !== obj) {
          for (attrName in attrsA) {
            if ((attrsB === obj || !(attrName in attrsB)) && attrsA[attrName] != null) {
              patchOps.removeAttr(this, attrName);
            }
          }
        }
      },
      _patchAttrArr: function _patchAttrArr(attrName, arrA, arrB) {
        if (arrA === arrB) {
          return;
        }

        var lenA = arrA.length;
        var hasDiff = false;

        if (lenA === arrB.length) {
          var i = 0;

          while (!hasDiff && i < lenA) {
            if (arrA[i] != arrB[i]) {
              hasDiff = true;
            }

            ++i;
          }
        } else {
          hasDiff = true;
        }

        if (hasDiff) {
          patchOps.updateAttr(this, attrName, arrB);
        }
      },
      _patchAttrObj: function _patchAttrObj(attrName, objA, objB) {
        if (objA === objB) {
          return;
        }

        var diffObj = Object.create(null);
        var hasDiff = false;

        for (var i in objB) {
          if (objA[i] != objB[i]) {
            hasDiff = true;
            diffObj[i] = objB[i];
          }
        }

        for (var _i in objA) {
          if (objA[_i] != null && !(_i in objB)) {
            hasDiff = true;
            diffObj[_i] = null;
          }
        }

        if (hasDiff) {
          patchOps.updateAttr(this, attrName, diffObj);
        }
      },
      _patchRef: function _patchRef(element) {
        if (this.ref !== null) {
          if (this.ref !== element.ref) {
            this.ref(null);

            if (element.ref !== null) {
              element.ref(element._domNode);
            }
          }
        } else if (element.ref !== null) {
          element.ref(element._domNode);
        }
      }
    };

    function processChildren(children) {
      var normalizedChildren = normalizeNode(children),
          res = normalizedChildren !== null && typeof normalizedChildren === 'object' && !Array.isArray(normalizedChildren) ? [normalizedChildren] : normalizedChildren;

      {
        if (Array.isArray(res)) {
          checkChildren(res);
        }
      }

      return res;
    }

    function checkAttrs(attrs) {
      for (var name in attrs) {
        if (name.substr(0, 2) === 'on' && !(name in ATTRS_TO_EVENTS)) {
          throw Error("vidom: Unsupported type of dom event listener \"" + name + "\".");
        }
      }
    }

    function noOp() {}

    var raf = typeof window !== 'undefined' && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) || function (callback) {
      setTimeout(callback, 1000 / 60);
    };

    var batch = [];

    function compareBatchItems(itemA, itemB) {
      return itemA.priority - itemB.priority;
    }

    function applyBatch() {
      var i = 0;

      while (i < batch.length) {
        batch.sort(compareBatchItems);
        var batchLen = batch.length;

        while (i < batchLen) {
          var _batch = batch[i++],
              fn = _batch.fn,
              ctx = _batch.ctx;
          fn.call(ctx);
        }

        if (batch.length > batchLen) {
          batch = batch.slice(batchLen);
          i = 0;
        }
      }

      batch = [];
    }

    function rafBatch(item) {
      if (batch.push(item) === 1) {
        raf(applyBatch);
      }
    }

    var globalConsole = typeof console == 'undefined' ? null : console,
        consoleWrapper = {},
        PREFIXES = {
      log: '',
      info: '',
      warn: 'Warning!',
      error: 'Error!'
    };
    ['log', 'info', 'warn', 'error'].forEach(function (name) {
      consoleWrapper[name] = globalConsole ? globalConsole[name] ? function (arg1, arg2, arg3, arg4, arg5) {
        // IE9: console methods aren't functions
        var arg0 = PREFIXES[name];

        switch (arguments.length) {
          case 1:
            globalConsole[name](arg0, arg1);
            break;

          case 2:
            globalConsole[name](arg0, arg1, arg2);
            break;

          case 3:
            globalConsole[name](arg0, arg1, arg2, arg3);
            break;

          case 4:
            globalConsole[name](arg0, arg1, arg2, arg3, arg4);
            break;

          case 5:
            globalConsole[name](arg0, arg1, arg2, arg3, arg4, arg5);
            break;
        }
      } : function () {
        globalConsole.log.apply(globalConsole, arguments);
      } : noOp;
    });

    function nodeToElement$1(node) {
      var normalizedNode = normalizeNode(node);
      return normalizedNode === null ? createElement$1('!') : typeof normalizedNode === 'object' ? Array.isArray(normalizedNode) ? createElement$1('fragment', null, null, normalizedNode) : normalizedNode : createElement$1('plaintext', null, null, normalizedNode);
    }

    function Emitter() {
      this._listeners = Object.create(null);
    }

    Emitter.prototype = {
      on: function on(event, fn, fnCtx) {
        if (fnCtx === void 0) {
          fnCtx = null;
        }

        (this._listeners[event] || (this._listeners[event] = [])).push({
          fn: fn,
          fnCtx: fnCtx
        });
        return this;
      },
      off: function off(event, fn, fnCtx) {
        if (fnCtx === void 0) {
          fnCtx = null;
        }

        var eventListeners = this._listeners[event];

        if (eventListeners) {
          var i = 0,
              eventListener;

          while (i < eventListeners.length) {
            eventListener = eventListeners[i];

            if (eventListener.fn === fn && eventListener.fnCtx === fnCtx) {
              eventListeners.splice(i, 1);
              break;
            }

            i++;
          }
        }

        return this;
      },
      emit: function emit(event) {
        var eventListeners = this._listeners[event];

        if (eventListeners) {
          var i = 0;

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          while (i < eventListeners.length) {
            var _eventListeners = eventListeners[i++],
                fn = _eventListeners.fn,
                fnCtx = _eventListeners.fnCtx;
            fn.call.apply(fn, [fnCtx].concat(args));
          }
        }

        return this;
      }
    };

    var mountedElements = Object.create(null);
    var counter$1 = 0;

    function mountToDomNode(domNode, node, ctx, cb, syncMode) {
      var domNodeId = getDomNodeId(domNode);
      var mounted = mountedElements[domNodeId],
          mountId;

      if (mounted && mounted.tree !== null) {
        mountId = ++mounted.id;

        var patchFn = function patchFn() {
          mounted = mountedElements[domNodeId];

          if (mounted && mounted.id === mountId) {
            var prevTree = mounted.tree,
                newTree = nodeToElement$1(node);

            if (ctx) {
              newTree.setCtx(ctx);
            }

            prevTree.patch(newTree);
            mounted.tree = newTree;
            callCb(cb);

            {
              hook.emit('replace', prevTree, newTree);
            }
          }
        };

        if (syncMode) {
          patchFn();
        } else {
          rafBatch({
            priority: 0,
            fn: patchFn
          });
        }
      } else {
        mounted = mountedElements[domNodeId] = {
          tree: null,
          id: mountId = ++counter$1
        };

        if (domNode.childNodes.length > 0) {
          var topDomChildNodes = collectTopDomChildNodes(domNode);

          if (topDomChildNodes === null) {
            domNode.textContent = '';
          } else {
            var tree = mounted.tree = nodeToElement$1(node);

            if (ctx) {
              tree.setCtx(ctx);
            }

            tree.adoptDom(topDomChildNodes, 0);
            tree.mount();
            callCb(cb);

            {
              hook.emit('mount', tree);
            }

            return;
          }
        }

        var renderFn = function renderFn() {
          var mounted = mountedElements[domNodeId];

          if (mounted && mounted.id === mountId) {
            var _tree = mounted.tree = nodeToElement$1(node);

            if (ctx) {
              _tree.setCtx(ctx);
            }

            domOps.append(domNode, _tree.renderToDom(getNs(domNode)));

            _tree.mount();

            callCb(cb);

            {
              hook.emit('mount', _tree);
            }
          }
        };

        if (syncMode) {
          renderFn();
        } else {
          rafBatch({
            priority: 0,
            fn: renderFn
          });
        }
      }
    }

    function unmountFromDomNode(domNode, cb, syncMode) {
      var domNodeId = getDomNodeId(domNode);
      var mounted = mountedElements[domNodeId];

      if (mounted) {
        var mountId = ++mounted.id,
            unmountFn = function unmountFn() {
          mounted = mountedElements[domNodeId];

          if (mounted && mounted.id === mountId) {
            delete mountedElements[domNodeId];
            var tree = mounted.tree;

            if (tree !== null) {
              var treeDomNode = tree.getDomNode();
              tree.unmount();
              domOps.remove(treeDomNode);
            }

            callCb(cb);

            {
              tree && hook.emit('unmount', tree);
            }
          }
        };

        if (mounted.tree) {
          if (syncMode) {
            unmountFn();
          } else {
            rafBatch({
              priority: 0,
              fn: unmountFn
            });
          }
        } else if (!syncMode) {
          callCb(cb);
        }
      } else if (!syncMode) {
        callCb(cb);
      }
    }

    function callCb(cb) {
      if (cb) {
        cb();
      }
    }

    function collectTopDomChildNodes(node) {
      var childNodes = node.childNodes,
          len = childNodes.length;
      var i = 0,
          res = null,
          childNode;

      while (i < len) {
        childNode = childNodes[i++];

        if (res) {
          res.push(childNode);
        } else if (childNode.nodeType === Node.COMMENT_NODE && childNode.textContent === 'vidom') {
          res = [];
        }
      }

      return res;
    }

    function mount(domNode, tree, ctx, cb) {
      if (typeof ctx === 'function') {
        cb = ctx;
        ctx = this;
      }

      mountToDomNode(domNode, tree, ctx, cb, false);
    }
    function mountSync(domNode, tree, ctx) {
      mountToDomNode(domNode, tree, ctx, null, true);
    }
    function unmount(domNode, cb) {
      unmountFromDomNode(domNode, cb, false);
    }
    function unmountSync(domNode) {
      unmountFromDomNode(domNode, null, true);
    }
    function getMountedRootNodes() {
      var res = [];

      for (var domNodeId in mountedElements) {
        var tree = mountedElements[domNodeId].tree;

        if (tree) {
          res.push(tree);
        }
      }

      return res;
    }

    var hook = new Emitter();
    hook.getRootNodes = getMountedRootNodes;

    {
      if (typeof window !== 'undefined') {
        window['__vidom__hook__'] = hook;
      }
    }

    var componentId = 1;

    function initComponent() {
      this.onInit();
    }

    function mountComponent() {
      this.__isMounted = true;
      this.__prevState = this.state;
      this.getRootElement().mount();
      this.onMount();
    }

    function unmountComponent() {
      this.__isMounted = false;
      this.getRootElement().unmount();
      this.onUnmount();
    }

    function patchComponent(nextAttrs, nextChildren, nextContext, byParent) {
      if (byParent) {
        this.__prevAttrs = this.attrs;
        this.__prevChildren = this.children;
        this.__prevContext = this.context;

        {
          this.__isFrozen = false;
        }

        this.attrs = this.__buildAttrs(nextAttrs);
        this.children = nextChildren;
        this.context = nextContext;

        {
          this.__isFrozen = true;
        }
      }

      this.__isUpdating = true;
      this.onChange(this.__prevAttrs, this.__prevChildren, this.__prevState, this.__prevContext);
      this.__isUpdating = false;
      var shouldRerender = this.shouldRerender(this.__prevAttrs, this.__prevChildren, this.__prevState, this.__prevContext);

      {
        var shouldRerenderResType = typeof shouldRerender;

        if (shouldRerenderResType !== 'boolean') {
          var name = getComponentName(this);
          consoleWrapper.warn(name + "#shouldRerender() should return boolean instead of " + shouldRerenderResType);
        }
      }

      if (shouldRerender) {
        var prevRootElem = this.getRootElement();
        this.__rootElement = this.render();
        prevRootElem.patch(this.__rootElement);
      }

      this.onUpdate(this.__prevAttrs, this.__prevChildren, this.__prevState, this.__prevContext);
      this.__prevAttrs = this.attrs;
      this.__prevChildren = this.children;
      this.__prevState = this.state;
      this.__prevContext = this.context;
    }

    function shouldComponentRerender() {
      return true;
    }

    function onComponentRender() {
      return null;
    }

    function renderComponentToDom(parentNs) {
      return this.getRootElement().renderToDom(parentNs);
    }

    function renderComponentToString() {
      return this.getRootElement().renderToString();
    }

    function adoptComponentDom(domNode, domIdx) {
      return this.getRootElement().adoptDom(domNode, domIdx);
    }

    function getComponentDomNode() {
      return this.getRootElement().getDomNode();
    }

    function requestChildContext() {
      return obj;
    }

    function setComponentState(state) {
      {
        if (this.__disallowSetState) {
          var name = getComponentName(this);
          consoleWrapper.warn(name + "#setState() should not be called during rendering");
        }

        this.__isFrozen = false;
      }

      this.state = this.state === obj ? state : merge(this.state, state, true);

      {
        Object.freeze(this.state);
        this.__isFrozen = true;
      }

      this.update();
    }

    function renderComponent() {
      {
        this.__disallowSetState = true;
      }

      var rootElem = nodeToElement$1(this.onRender());

      {
        this.__disallowSetState = false;
      }

      var childCtx = this.onChildContextRequest(),
          rootElemCtx = childCtx === obj ? this.context : this.context === obj ? childCtx : merge(this.context, childCtx);

      {
        Object.freeze(rootElemCtx);
      }

      rootElem.setCtx(rootElemCtx);
      return rootElem;
    }

    function updateComponent() {
      if (this.__isUpdating || !this.isMounted()) {
        return;
      }

      this.__isUpdating = true;
      rafBatch({
        priority: this.__id,
        fn: applyUpdate,
        ctx: this
      });
    }

    function applyUpdate() {
      if (this.__isUpdating && this.isMounted()) {
        {
          var prevRootElem = this.__rootElement;
          this.patch(this.attrs, this.children, this.context, false);
          hook.emit('replace', prevRootElem, this.__rootElement);
        }
      }
    }

    function getComponentRootElem() {
      return this.__rootElement === null ? this.__rootElement = this.render() : this.__rootElement;
    }

    function isComponentMounted() {
      return this.__isMounted;
    }

    function onComponentRefRequest() {
      return this;
    }

    function buildComponentAttrs(attrs) {
      if (attrs === this.attrs) {
        return attrs;
      }

      var defaultAttrs = this.constructor.defaultAttrs,
          hasDefaultAttrs = defaultAttrs != null,
          res = attrs === obj ? hasDefaultAttrs ? defaultAttrs : attrs : hasDefaultAttrs ? merge(defaultAttrs, attrs) : attrs;

      {
        Object.freeze(res);
      }

      return res;
    }

    function getComponentName(component) {
      return component.constructor.name || 'Component';
    }

    function createComponent(props, staticProps) {
      var res = function res(attrs, children, ctx) {
        {
          restrictObjProp(this, 'attrs');
          restrictObjProp(this, 'children');
          restrictObjProp(this, 'state');
          restrictObjProp(this, 'context');
          this.__isFrozen = false;
          this.__disallowSetState = false;
        }

        this.attrs = this.__buildAttrs(attrs);
        this.children = children;
        this.state = obj;
        this.context = ctx;

        {
          this.__isFrozen = true;
        }

        this.__id = componentId++;
        this.__isMounted = false;
        this.__isUpdating = false;
        this.__rootElement = null;
        this.__prevAttrs = this.attrs;
        this.__prevChildren = this.children;
        this.__prevState = obj;
        this.__prevContext = this.context;
      },
          ptp = {
        constructor: res,
        init: initComponent,
        onInit: noOp,
        mount: mountComponent,
        unmount: unmountComponent,
        onMount: noOp,
        onUnmount: noOp,
        onChange: noOp,
        shouldRerender: shouldComponentRerender,
        onRender: onComponentRender,
        onUpdate: noOp,
        isMounted: isComponentMounted,
        setState: setComponentState,
        renderToDom: renderComponentToDom,
        renderToString: renderComponentToString,
        adoptDom: adoptComponentDom,
        getDomNode: getComponentDomNode,
        getRootElement: getComponentRootElem,
        render: renderComponent,
        update: updateComponent,
        patch: patchComponent,
        onChildContextRequest: requestChildContext,
        onRefRequest: onComponentRefRequest,
        __buildAttrs: buildComponentAttrs
      };

      for (var i in props) {
        ptp[i] = props[i];
      }

      res.prototype = ptp;

      for (var _i in staticProps) {
        res[_i] = staticProps[_i];
      }

      res['__vidom__component__'] = true;
      return res;
    }

    var Input = createComponent({
      onInit: function onInit() {
        var _this = this;

        this._addAttrs = {
          onChange: null,
          onInput: function onInput(e) {
            _this.onInput(e);
          }
        };
      },
      onRender: function onRender() {
        return new TagElement('input', null, merge(this.attrs, this._addAttrs));
      },
      onInput: function onInput(e) {
        var _this$attrs = this.attrs,
            onChange = _this$attrs.onChange,
            _this$attrs$value = _this$attrs.value,
            value = _this$attrs$value === void 0 ? '' : _this$attrs$value,
            control = this.getDomNode();

        if (value !== control.value) {
          if (onChange) {
            onChange(e);
          }

          applyBatch();

          if (this.isMounted()) {
            var _value = this.attrs.value; // attrs could be changed during applyBatch()

            if (typeof _value !== 'undefined' && control.value !== _value) {
              control.value = _value;
            }
          }
        }
      },
      onRefRequest: function onRefRequest() {
        return this.getDomNode();
      }
    });

    var namedRadioInputs = Object.create(null);
    var Radio = createComponent({
      onInit: function onInit() {
        var _this = this;

        this._addAttrs = {
          onChange: function onChange(e) {
            _this.onInputChange(e);
          }
        };
      },
      onRender: function onRender() {
        return new TagElement('input', null, merge(this.attrs, this._addAttrs));
      },
      onMount: function onMount() {
        var name = this.attrs.name;

        if (name) {
          addToNamedRadioInputs(name, this);
        }
      },
      onUpdate: function onUpdate(_ref) {
        var prevName = _ref.name;
        var name = this.attrs.name;

        if (name !== prevName) {
          if (prevName) {
            removeFromNamedRadioInputs(prevName, this);
          }

          if (name) {
            addToNamedRadioInputs(name, this);
          }
        }
      },
      onUnmount: function onUnmount() {
        var name = this.attrs.name;

        if (name) {
          removeFromNamedRadioInputs(name, this);
        }
      },
      onInputChange: function onInputChange(e) {
        var onChange = this.attrs.onChange;

        if (onChange) {
          onChange(e);
        }

        applyBatch();

        if (this.isMounted()) {
          var control = this.getDomNode(),
              _this$attrs = this.attrs,
              name = _this$attrs.name,
              checked = _this$attrs.checked; // attrs could be changed during applyBatch()

          if (typeof checked !== 'undefined' && control.checked !== checked) {
            if (name) {
              var radioInputs = namedRadioInputs[name],
                  len = radioInputs.length;

              var i = 0,
                  radioInput,
                  _checked;

              while (i < len) {
                radioInput = radioInputs[i++];
                _checked = radioInput.attrs.checked;

                if (typeof _checked !== 'undefined') {
                  var radioControl = radioInput.getDomNode();

                  if (_checked !== radioControl.checked) {
                    radioControl.checked = _checked;
                  }
                }
              }
            } else {
              control.checked = checked;
            }
          }
        }
      },
      onRefRequest: function onRefRequest() {
        return this.getDomNode();
      }
    });

    function addToNamedRadioInputs(name, input) {
      if (name in namedRadioInputs) {
        namedRadioInputs[name].push(input);
      } else {
        namedRadioInputs[name] = [input];
      }
    }

    function removeFromNamedRadioInputs(name, input) {
      var radioInputs = namedRadioInputs[name],
          len = radioInputs.length;
      var i = 0;

      while (i < len) {
        if (radioInputs[i] === input) {
          if (len === 1) {
            delete namedRadioInputs[name];
          } else {
            radioInputs.splice(i, 1);
          }

          return;
        }

        i++;
      }
    }

    var CheckBox = createComponent({
      onInit: function onInit() {
        var _this = this;

        this._addAttrs = {
          onChange: function onChange(e) {
            _this.onInputChange(e);
          }
        };
      },
      onRender: function onRender() {
        return new TagElement('input', null, merge(this.attrs, this._addAttrs));
      },
      onInputChange: function onInputChange(e) {
        var onChange = this.attrs.onChange;

        if (onChange) {
          onChange(e);
        }

        applyBatch();

        if (this.isMounted()) {
          var control = this.getDomNode(),
              checked = this.attrs.checked; // attrs could be changed during applyBatch()

          if (typeof checked !== 'undefined' && control.checked !== checked) {
            control.checked = checked;
          }
        }
      },
      onRefRequest: function onRefRequest() {
        return this.getDomNode();
      }
    });

    var File = createComponent({
      onRender: function onRender() {
        return new TagElement('input', null, this.attrs);
      },
      onRefRequest: function onRefRequest() {
        return this.getDomNode();
      }
    });

    function ComponentElement(component, key, attrs, children, ref) {
      {
        restrictObjProp(this, 'type');
        restrictObjProp(this, 'key');
        restrictObjProp(this, 'attrs');
        restrictObjProp(this, 'children');
        restrictObjProp(this, 'ref');
        this.__isFrozen = false;
      }

      this.type = ELEMENT_TYPE_COMPONENT;
      this.key = key == null ? null : key;
      this.attrs = attrs || obj;
      this.children = children;
      this.ref = ref == null ? null : ref;

      if (component === Input) {
        switch (this.attrs.type) {
          case 'radio':
            this.component = Radio;
            break;

          case 'checkbox':
            this.component = CheckBox;
            break;

          case 'file':
            this.component = File;
            break;

          default:
            this.component = component;
        }
      } else {
        this.component = component;
      }

      {
        Object.freeze(this.attrs);
        this.__isFrozen = true;
      }

      this._instance = null;
      this._ctx = obj;
    }
    ComponentElement.prototype = {
      getDomNode: function getDomNode() {
        return this._instance === null ? null : this._instance.getDomNode();
      },
      setCtx: function setCtx(ctx) {
        this._ctx = ctx;
        return this;
      },
      renderToDom: function renderToDom(parentNs) {
        {
          checkReuse(this, this.component.name || 'Anonymous');
        }

        return this._getInstance().renderToDom(parentNs);
      },
      renderToString: function renderToString() {
        return this._getInstance().renderToString();
      },
      adoptDom: function adoptDom(domNode, domIdx) {
        {
          checkReuse(this, this.component.name || 'Anonymous');
        }

        return this._getInstance().adoptDom(domNode, domIdx);
      },
      mount: function mount() {
        this._instance.mount();

        if (this.ref !== null) {
          this.ref(this._instance.onRefRequest());
        }
      },
      unmount: function unmount() {
        if (this._instance !== null) {
          this._instance.unmount();

          this._instance = null;
        }

        if (this.ref !== null) {
          this.ref(null);
        }
      },
      clone: function clone(attrs, children, ref) {
        var res = new ComponentElement(this.component, this.key);

        {
          res.__isFrozen = false;
        }

        res.attrs = attrs == null ? this.attrs : merge(this.attrs, attrs);
        res.children = children == null ? this.children : children;
        res.ref = ref == null ? this.ref : ref;

        {
          res.__isFrozen = true;
        }

        res._ctx = this._ctx;
        return res;
      },
      patch: function patch(element) {
        var instance = this._getInstance();

        if (this === element) {
          instance.patch(element.attrs, element.children, element._ctx, true);
        } else if (this.type === element.type && this.component === element.component) {
          instance.patch(element.attrs, element.children, element._ctx, true);
          element._instance = instance;

          this._patchRef(element);
        } else {
          patchOps.replace(this, element);
          this._instance = null;
        }
      },
      _patchRef: function _patchRef(element) {
        if (this.ref !== null) {
          if (this.ref !== element.ref) {
            this.ref(null);

            if (element.ref !== null) {
              element.ref(element._instance.onRefRequest());
            }
          }
        } else if (element.ref !== null) {
          element.ref(element._instance.onRefRequest());
        }
      },
      _getInstance: function _getInstance() {
        if (this._instance === null) {
          this._instance = new this.component(this.attrs, this.children, this._ctx);

          this._instance.init();
        }

        return this._instance;
      }
    };

    function FunctionComponentElement(component, key, attrs, children) {
      {
        restrictObjProp(this, 'type');
        restrictObjProp(this, 'key');
        restrictObjProp(this, 'attrs');
        restrictObjProp(this, 'children');
        this.__isFrozen = false;
      }

      this.type = ELEMENT_TYPE_FUNCTION_COMPONENT;
      this.component = component;
      this.key = key == null ? null : key;
      this.attrs = attrs || obj;
      this.children = children;

      {
        Object.freeze(this.attrs);
        this.__isFrozen = true;
      }

      this._rootElement = null;
      this._ctx = obj;
    }
    FunctionComponentElement.prototype = {
      getDomNode: function getDomNode() {
        return this._rootElement === null ? null : this._rootElement.getDomNode();
      },
      setCtx: function setCtx(ctx) {
        this._ctx = ctx;
        return this;
      },
      renderToDom: function renderToDom(parentNs) {
        {
          checkReuse(this, this.component.name || 'Anonymous');
        }

        return this._getRootElement().renderToDom(parentNs);
      },
      renderToString: function renderToString() {
        return this._getRootElement().renderToString();
      },
      adoptDom: function adoptDom(domNode, domIdx) {
        {
          checkReuse(this, this.component.name || 'Anonymous');
        }

        return this._getRootElement().adoptDom(domNode, domIdx);
      },
      mount: function mount() {
        this._getRootElement().mount();
      },
      unmount: function unmount() {
        if (this._rootElement !== null) {
          this._rootElement.unmount();

          this._rootElement = null;
        }
      },
      clone: function clone(attrs, children) {
        var res = new FunctionComponentElement(this.component, this.key);

        {
          res.__isFrozen = false;
        }

        res.attrs = attrs == null ? this.attrs : merge(this.attrs, attrs);
        res.children = children == null ? this.children : children;

        {
          res.__isFrozen = true;
        }

        res._ctx = this._ctx;
        return res;
      },
      patch: function patch(element) {
        if (this === element) {
          var prevRootElement = this._getRootElement();

          this._rootElement = null;
          prevRootElement.patch(this._getRootElement());
        } else if (this.type === element.type && this.component === element.component) {
          this._getRootElement().patch(element._getRootElement());

          this._rootElement = null;
        } else {
          patchOps.replace(this, element);
          this._rootElement = null;
        }
      },
      _getRootElement: function _getRootElement() {
        if (this._rootElement !== null) {
          return this._rootElement;
        }

        var attrs = this.attrs,
            component = this.component,
            defaultAttrs = component.defaultAttrs,
            hasDefaultAttrs = defaultAttrs != null,
            resAttrs = attrs === obj ? hasDefaultAttrs ? defaultAttrs : attrs : hasDefaultAttrs ? merge(defaultAttrs, attrs) : attrs;

        {
          Object.freeze(resAttrs);
        }

        this._rootElement = nodeToElement$1(component(resAttrs, this.children, this._ctx));

        this._rootElement.setCtx(this._ctx);

        return this._rootElement;
      }
    };

    function FragmentElement(key, children) {
      {
        restrictObjProp(this, 'type');
        restrictObjProp(this, 'key');
        restrictObjProp(this, 'children');
        this.__isFrozen = false;
      }

      this.type = ELEMENT_TYPE_FRAGMENT;
      this.key = key == null ? null : key;
      this.children = processChildren$1(children);

      {
        if (Array.isArray(this.children)) {
          Object.freeze(this.children);
        }

        this.__isFrozen = true;
      }

      this._domNode = null;
      this._ctx = obj;
    }
    FragmentElement.prototype = {
      getDomNode: function getDomNode() {
        return this._domNode;
      },
      setCtx: function setCtx(ctx) {
        if (ctx !== obj) {
          this._ctx = ctx;
          var children = this.children;

          if (children !== null) {
            var len = children.length;
            var i = 0;

            while (i < len) {
              children[i++].setCtx(ctx);
            }
          }
        }

        return this;
      },
      renderToDom: function renderToDom(parentNs) {
        {
          checkReuse(this, 'fragment');
        }

        var children = this.children,
            domNode = [createElement('!', null), createElement('!', null)],
            domFragment = document.createDocumentFragment();
        domFragment.appendChild(domNode[0]);

        if (children !== null) {
          var len = children.length;
          var i = 0;

          while (i < len) {
            domFragment.appendChild(children[i++].renderToDom(parentNs));
          }
        }

        domFragment.appendChild(domNode[1]);
        this._domNode = domNode;
        return domFragment;
      },
      renderToString: function renderToString() {
        var children = this.children;
        var res = '<!---->';

        if (children !== null) {
          var i = children.length - 1;

          while (i >= 0) {
            res = children[i--].renderToString() + res;
          }
        }

        return '<!---->' + res;
      },
      adoptDom: function adoptDom(domNodes, domIdx) {
        {
          checkReuse(this, 'fragment');
        }

        var domNode = [domNodes[domIdx++]],
            children = this.children;

        if (children !== null) {
          var len = children.length;
          var i = 0;

          while (i < len) {
            domIdx = children[i++].adoptDom(domNodes, domIdx);
          }
        }

        domNode.push(domNodes[domIdx]);
        this._domNode = domNode;
        return domIdx + 1;
      },
      mount: function mount() {
        var children = this.children;

        if (children !== null) {
          var i = 0;
          var len = children.length;

          while (i < len) {
            children[i++].mount();
          }
        }
      },
      unmount: function unmount() {
        var children = this.children;

        if (children !== null) {
          var len = children.length;
          var i = 0;

          while (i < len) {
            children[i++].unmount();
          }
        }

        this._domNode = null;
      },
      clone: function clone(children) {
        var res = new FragmentElement(this.key);

        {
          res.__isFrozen = false;
        }

        res.children = children == null ? this.children : processChildren$1(children);

        {
          res.__isFrozen = true;
        }

        res._ctx = this._ctx;
        return res;
      },
      patch: function patch(element) {
        if (this === element) {
          this._patchChildren(element);
        } else if (this.type === element.type) {
          element._domNode = this._domNode;

          this._patchChildren(element);
        } else {
          patchOps.replace(this, element);
        }
      },
      _patchChildren: function _patchChildren(element) {
        var childrenA = this.children,
            childrenB = element.children;

        if (childrenA === null && childrenB === null) {
          return;
        }

        if (childrenB === null || childrenB.length === 0) {
          if (childrenA !== null && childrenA.length > 0) {
            patchOps.removeChildren(this);
          }

          return;
        }

        if (childrenA === null || childrenA.length === 0) {
          var childrenBLen = childrenB.length;
          var iB = 0;

          while (iB < childrenBLen) {
            patchOps.appendChild(element, childrenB[iB++]);
          }

          return;
        }

        patchChildren(this, element);
      }
    };

    function processChildren$1(children) {
      var normalizedChildren = normalizeNode(children),
          res = normalizedChildren !== null && !Array.isArray(normalizedChildren) ? [typeof normalizedChildren === 'string' ? nodeToElement$1(normalizedChildren) : normalizedChildren] : normalizedChildren;

      {
        if (Array.isArray(res)) {
          checkChildren(res);
        }
      }

      return res;
    }

    function TextElement(key, children) {
      {
        restrictObjProp(this, 'type');
        restrictObjProp(this, 'key');
        restrictObjProp(this, 'children');
        this.__isFrozen = false;
      }

      this.type = ELEMENT_TYPE_TEXT;
      this.key = key == null ? null : key;
      this.children = processChildren$2(children);

      {
        this.__isFrozen = true;
      }

      this._domNode = null;
    }
    TextElement.prototype = {
      getDomNode: function getDomNode() {
        return this._domNode;
      },
      setCtx: function setCtx() {
        return this;
      },
      renderToDom: function renderToDom() {
        {
          checkReuse(this, 'text');
        }

        var domFragment = document.createDocumentFragment(),
            domNode = [createElement('!', null), createElement('!', null)],
            children = this.children;
        domFragment.appendChild(domNode[0]);

        if (children !== null) {
          domFragment.appendChild(document.createTextNode(children));
        }

        domFragment.appendChild(domNode[1]);
        this._domNode = domNode;
        return domFragment;
      },
      renderToString: function renderToString() {
        return '<!---->' + (this.children ? escapeHtml(this.children) : '') + '<!---->';
      },
      adoptDom: function adoptDom(domNodes, domIdx) {
        {
          checkReuse(this, 'text');
        }

        var domNode = [domNodes[domIdx++]];

        if (this.children) {
          domIdx++;
        }

        domNode.push(domNodes[domIdx++]);
        this._domNode = domNode;
        return domIdx;
      },
      mount: noOp,
      unmount: function unmount() {
        this._domNode = null;
      },
      clone: function clone(children) {
        var res = new TextElement(this.key);

        {
          res.__isFrozen = false;
        }

        res.children = children == null ? this.children : processChildren$2(children);

        {
          res.__isFrozen = true;
        }

        return res;
      },
      patch: function patch(element) {
        if (this !== element) {
          if (this.type === element.type) {
            element._domNode = this._domNode;

            this._patchChildren(element);
          } else {
            patchOps.replace(this, element);
          }
        }
      },
      _patchChildren: function _patchChildren(element) {
        var childrenA = this.children,
            childrenB = element.children;

        if (childrenA !== childrenB) {
          if (childrenB) {
            patchOps.updateText(this, childrenB, false);
          } else if (childrenA) {
            patchOps.removeText(this);
          }
        }
      }
    };

    function processChildren$2(children) {
      if (children == null) {
        return null;
      }

      switch (typeof children) {
        case 'string':
          return children;

        case 'boolean':
          return null;

        default:
          return '' + children;
      }
    }

    var TextArea = createComponent({
      onInit: function onInit() {
        var _this = this;

        this._addAttrs = {
          onChange: null,
          onInput: function onInput(e) {
            _this.onInput(e);
          }
        };
      },
      onRender: function onRender() {
        return new TagElement('textarea', null, merge(this.attrs, this._addAttrs));
      },
      onInput: function onInput(e) {
        var _this$attrs = this.attrs,
            onChange = _this$attrs.onChange,
            _this$attrs$value = _this$attrs.value,
            value = _this$attrs$value === void 0 ? '' : _this$attrs$value,
            control = this.getDomNode();

        if (value !== control.value) {
          if (onChange) {
            onChange(e);
          }

          applyBatch();

          if (this.isMounted()) {
            var _value = this.attrs.value; // attrs could be changed during applyBatch()

            if (typeof _value !== 'undefined' && control.value !== _value) {
              control.value = _value;
            }
          }
        }
      },
      onRefRequest: function onRefRequest() {
        return this.getDomNode();
      }
    });

    var Select = createComponent({
      onInit: function onInit() {
        var _this = this;

        this._addAttrs = {
          onChange: function onChange(e) {
            _this.onInputChange(e);
          }
        };
      },
      onRender: function onRender() {
        return new TagElement('select', null, merge(this.attrs, this._addAttrs), this.children);
      },
      onInputChange: function onInputChange(e) {
        var target = e.target,
            _this$attrs = this.attrs,
            onChange = _this$attrs.onChange,
            multiple = _this$attrs.multiple;

        if (onChange) {
          if (multiple) {
            var newValue = [],
                options = target.options,
                len = options.length;
            var i = 0,
                option;

            while (i < len) {
              option = options[i++];

              if (option.selected) {
                newValue.push(option.value);
              }
            }

            onChange(e, newValue);
          } else {
            onChange(e);
          }
        }

        applyBatch();

        if (this.isMounted()) {
          var _this$attrs2 = this.attrs,
              value = _this$attrs2.value,
              _multiple = _this$attrs2.multiple; // attrs could be changed during applyBatch()

          if (typeof value !== 'undefined') {
            if (_multiple) {
              var _options = target.options,
                  _len = _options.length;

              var _i = 0,
                  _option;

              while (_i < _len) {
                _option = _options[_i++];
                _option.selected = isInArray(value, _option.value);
              }
            } else if (target.value != value) {
              target.value = value;
            }
          }
        }
      },
      onRefRequest: function onRefRequest() {
        return this.getDomNode();
      }
    });

    function createElement$1(type, key, attrs, children, ref, escapeChildren) {
      switch (typeof type) {
        case 'string':
          switch (type) {
            case 'fragment':
              return new FragmentElement(key, children);

            case 'plaintext':
              return new TextElement(key, children);

            case 'input':
              return new ComponentElement(Input, key, attrs, children, ref);

            case 'textarea':
              return new ComponentElement(TextArea, key, attrs, children, ref);

            case 'select':
              return new ComponentElement(Select, key, attrs, children, ref);

            default:
              return new TagElement(type, key, attrs, children, ref, escapeChildren);
          }

        case 'function':
          return type.__vidom__component__ ? new ComponentElement(type, key, attrs, children, ref) : new FunctionComponentElement(type, key, attrs, children);

        default:
          {
            throw TypeError('vidom: Unexpected type of element is passed to the elements factory.');
          }

      }
    }

    var slice = Array.prototype.slice;
    function h(type, props) {
      var hasNonAttrsProps = false,
          attrs = null,
          key = null,
          ref = null,
          children = arguments.length > 2 ? arguments.length > 3 ? slice.call(arguments, 2) : arguments[2] : null,
          escapeChildren;

      if (props) {
        for (var i in props) {
          switch (i) {
            case 'key':
              key = props[i];
              hasNonAttrsProps = true;
              break;

            case 'ref':
              ref = props[i];
              hasNonAttrsProps = true;
              break;

            case 'html':
              children = props[i];
              escapeChildren = false;
              hasNonAttrsProps = true;
              break;

            default:
              if (attrs === null) {
                attrs = Object.create(null);
              }

              attrs[i] = props[i];
          }
        }
      }

      return createElement$1(type, key, hasNonAttrsProps ? attrs : props, children, ref, escapeChildren);
    }

    function renderToString(node) {
      return '<!--vidom-->' + nodeToElement$1(node).renderToString();
    }

    var Component = createComponent();

    function nodeToElements(node) {
      var normalizedNode = normalizeNode(node);
      return normalizedNode === null ? [] : typeof normalizedNode === 'string' ? [createElement$1('plaintext', null, null, normalizedNode)] : Array.isArray(normalizedNode) ? normalizedNode : [normalizedNode];
    }

    exports.Component = Component;
    exports.IS_DEBUG = IS_DEBUG;
    exports.console = consoleWrapper;
    exports.createComponent = createComponent;
    exports.elem = createElement$1;
    exports.getMountedRootNodes = getMountedRootNodes;
    exports.h = h;
    exports.mount = mount;
    exports.mountSync = mountSync;
    exports.renderToString = renderToString;
    exports.toElem = nodeToElement$1;
    exports.toElems = nodeToElements;
    exports.unmount = unmount;
    exports.unmountSync = unmountSync;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
