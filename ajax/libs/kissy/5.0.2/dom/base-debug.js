/*
Copyright 2014, modulex-dom@1.0.2
MIT Licensed
build time: Thu, 16 Oct 2014 04:16:49 GMT
*/
modulex.add("dom/base", ["modulex-util","modulex-ua","modulex-feature","dom/selector"], function(require, exports, module) {
var modulexUtil = require("modulex-util");
var modulexUa = require("modulex-ua");
var modulexFeature = require("modulex-feature");
var domSelector = require("dom/selector");
/*
combined modules:
dom/base
dom/base/api
dom/base/attr
dom/base/class
dom/base/class-list
dom/base/create
dom/base/data
dom/base/insertion
dom/base/offset
dom/base/style
dom/base/selector
dom/base/traversal
*/
var domBaseApi, domBaseAttr, domBaseClassList, domBaseCreate, domBaseData, domBaseInsertion, domBaseOffset, domBaseStyle, domBaseSelector, domBaseTraversal, domBaseClass, domBase;
domBaseApi = function (exports) {
  exports = {};
  /**
   * @ignore
   * dom
   * @author yiminghe@gmail.com, lifesinger@gmail.com
   */
  var util = modulexUtil;
  var WINDOW = window;
  var DOCUMENT = WINDOW.document;
  var UA = modulexUa;
  var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
  /**
   * Dom Element node type.
   * @enum {Number} KISSY.DOM.NodeType
   */
  var NodeType = {
    /**
     * element type
     */
    ELEMENT_NODE: 1,
    /**
     * attribute node type
     */
    ATTRIBUTE_NODE: 2,
    /**
     * text node type
     */
    TEXT_NODE: 3,
    /**
     * cdata node type
     */
    CDATA_SECTION_NODE: 4,
    /**
     * entity reference node type
     */
    ENTITY_REFERENCE_NODE: 5,
    /**
     * entity node type
     */
    ENTITY_NODE: 6,
    /**
     * processing instruction node type
     */
    PROCESSING_INSTRUCTION_NODE: 7,
    /**
     * comment node type
     */
    COMMENT_NODE: 8,
    /**
     * document node type
     */
    DOCUMENT_NODE: 9,
    /**
     * document type
     */
    DOCUMENT_TYPE_NODE: 10,
    /**
     * document fragment type
     */
    DOCUMENT_FRAGMENT_NODE: 11,
    /**
     * notation type
     */
    NOTATION_NODE: 12
  };
  /**
   * KISSY Dom Utils.
   * Provides Dom helper methods.
   * @class KISSY.DOM
   * @singleton
   */
  var Dom = exports = {
    version: '1.0.2',
    isCustomDomain: function (win) {
      win = win || WINDOW;
      win = Dom.get(win);
      var domain = win.document.domain;
      var hostname = win.location.hostname;
      return domain !== hostname && domain !== '[' + hostname + ']';
    },
    getEmptyIframeSrc: function (win) {
      win = win || WINDOW;
      win = Dom.get(win);
      if (UA.ie && Dom.isCustomDomain(win)) {
        return 'javascript:void(function(){' + encodeURIComponent('document.open();' + 'document.domain="' + win.document.domain + '";' + 'document.close();') + '}())';
      }
      return '';
    },
    NodeType: NodeType,
    getWindow: function (elem) {
      if (!elem) {
        return WINDOW;
      }
      elem = Dom.get(elem);
      if (util.isWindow(elem)) {
        return elem;
      }
      var doc = elem;
      if (doc.nodeType !== NodeType.DOCUMENT_NODE) {
        doc = elem.ownerDocument;
      }
      return doc.defaultView || doc.parentWindow;
    },
    getDocument: function (elem) {
      if (!elem) {
        return DOCUMENT;
      }
      elem = Dom.get(elem);
      return util.isWindow(elem) ? elem.document : elem.nodeType === NodeType.DOCUMENT_NODE ? elem : elem.ownerDocument;
    },
    isDomNodeList: function (o) {
      return o && !o.nodeType && o.item && !o.setTimeout;
    },
    nodeName: function (selector) {
      var el = Dom.get(selector);
      var nodeName = el.nodeName.toLowerCase();
      if (UA.ie) {
        var scopeName = el.scopeName;
        if (scopeName && scopeName !== 'HTML') {
          nodeName = scopeName.toLowerCase() + ':' + nodeName;
        }
      }
      return nodeName;
    },
    _RE_NUM_NO_PX: new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i')
  };
  return exports;
}();
domBaseAttr = function (exports) {
  exports = {};
  var util = modulexUtil;
  var Dom = domBaseApi;
  var doc = document;
  var NodeType = Dom.NodeType;
  var docElement = doc && doc.documentElement;
  var EMPTY = '';
  var nodeName = Dom.nodeName;
  var R_BOOLEAN = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;
  var R_FOCUSABLE = /^(?:button|input|object|select|textarea)$/i;
  var R_CLICKABLE = /^a(?:rea)?$/i;
  var R_INVALID_CHAR = /:|^on/;
  var R_RETURN = /\r/g;
  var attrFix = {};
  var attrFn = {
    val: 1,
    css: 1,
    html: 1,
    text: 1,
    data: 1,
    width: 1,
    height: 1,
    offset: 1,
    scrollTop: 1,
    scrollLeft: 1
  };
  var attrHooks = {
    tabindex: {
      get: function (el) {
        var attributeNode = el.getAttributeNode('tabindex');
        return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : R_FOCUSABLE.test(el.nodeName) || R_CLICKABLE.test(el.nodeName) && el.href ? 0 : undefined;
      }
    }
  };
  var propFix = {
    hidefocus: 'hideFocus',
    tabindex: 'tabIndex',
    readonly: 'readOnly',
    'for': 'htmlFor',
    'class': 'className',
    maxlength: 'maxLength',
    cellspacing: 'cellSpacing',
    cellpadding: 'cellPadding',
    rowspan: 'rowSpan',
    colspan: 'colSpan',
    usemap: 'useMap',
    frameborder: 'frameBorder',
    contenteditable: 'contentEditable'
  };
  var boolHook = {
    get: function (elem, name) {
      return Dom.prop(elem, name) ? name.toLowerCase() : undefined;
    },
    set: function (elem, value, name) {
      var propName;
      if (value === false) {
        Dom.removeAttr(elem, name);
      } else {
        propName = propFix[name] || name;
        if (propName in elem) {
          elem[propName] = true;
        }
        elem.setAttribute(name, name.toLowerCase());
      }
      return name;
    }
  };
  var propHooks = {};
  var attrNodeHook = {};
  var valHooks = {
    select: {
      get: function (elem) {
        var index = elem.selectedIndex;
        var options = elem.options;
        var ret, i, len;
        var one = String(elem.type) === 'select-one';
        if (index < 0) {
          return null;
        } else if (one) {
          return Dom.val(options[index]);
        }
        ret = [];
        i = 0;
        len = options.length;
        for (; i < len; ++i) {
          if (options[i].selected) {
            ret.push(Dom.val(options[i]));
          }
        }
        return ret;
      },
      set: function (elem, value) {
        var values = util.makeArray(value);
        var opts = elem.options;
        util.each(opts, function (opt) {
          opt.selected = util.inArray(Dom.val(opt), values);
        });
        if (!values.length) {
          elem.selectedIndex = -1;
        }
        return values;
      }
    }
  };
  util.each([
    'radio',
    'checkbox'
  ], function (r) {
    valHooks[r] = {
      get: function (elem) {
        return elem.getAttribute('value') === null ? 'on' : elem.value;
      },
      set: function (elem, value) {
        if (util.isArray(value)) {
          elem.checked = util.inArray(Dom.val(elem), value);
          return 1;
        }
        return undefined;
      }
    };
  });
  attrHooks.style = {
    get: function (el) {
      return el.style.cssText;
    }
  };
  function toStr(value) {
    return value == null ? '' : value + '';
  }
  function getProp(elem, name) {
    name = propFix[name] || name;
    var hook = propHooks[name];
    if (hook && hook.get) {
      return hook.get(elem, name);
    } else {
      return elem[name];
    }
  }
  util.mix(Dom, {
    _valHooks: valHooks,
    _propFix: propFix,
    _attrHooks: attrHooks,
    _propHooks: propHooks,
    _attrNodeHook: attrNodeHook,
    _attrFix: attrFix,
    prop: function (selector, name, value) {
      var elems = Dom.query(selector);
      var i, elem, hook;
      if (typeof name === 'object') {
        util.each(name, function (v, k) {
          Dom.prop(elems, k, v);
        });
        return undefined;
      }
      name = propFix[name] || name;
      hook = propHooks[name];
      if (value !== undefined) {
        for (i = elems.length - 1; i >= 0; i--) {
          elem = elems[i];
          if (hook && hook.set) {
            hook.set(elem, value, name);
          } else {
            elem[name] = value;
          }
        }
      } else {
        if (elems.length) {
          return getProp(elems[0], name);
        }
      }
      return undefined;
    },
    hasProp: function (selector, name) {
      var elems = Dom.query(selector);
      var i, el;
      var len = elems.length;
      for (i = 0; i < len; i++) {
        el = elems[i];
        if (getProp(el, name) !== undefined) {
          return true;
        }
      }
      return false;
    },
    removeProp: function (selector, name) {
      name = propFix[name] || name;
      var elems = Dom.query(selector);
      var i, el;
      for (i = elems.length - 1; i >= 0; i--) {
        el = elems[i];
        try {
          el[name] = undefined;
          delete el[name];
        } catch (e) {
        }
      }
    },
    attr: function (selector, name, val, pass) {
      var els = Dom.query(selector);
      var el = els[0];
      var attrNormalizer, i, ret;
      if (typeof name === 'object') {
        pass = val;
        for (var k in name) {
          Dom.attr(els, k, name[k], pass);
        }
        return undefined;
      }
      if (pass && attrFn[name]) {
        return Dom[name](selector, val);
      }
      name = name.toLowerCase();
      if (pass && attrFn[name]) {
        return Dom[name](selector, val);
      }
      name = attrFix[name] || name;
      if (R_BOOLEAN.test(name)) {
        attrNormalizer = boolHook;
      } else if (R_INVALID_CHAR.test(name)) {
        attrNormalizer = attrNodeHook;
      } else {
        attrNormalizer = attrHooks[name];
      }
      if (val === undefined) {
        if (el && el.nodeType === NodeType.ELEMENT_NODE) {
          if (nodeName(el) === 'form') {
            attrNormalizer = attrNodeHook;
          }
          if (attrNormalizer && attrNormalizer.get) {
            return attrNormalizer.get(el, name);
          }
          ret = el.getAttribute(name);
          if (ret === '') {
            var attrNode = el.getAttributeNode(name);
            if (!attrNode || !attrNode.specified) {
              return undefined;
            }
          }
          return ret === null ? undefined : ret;
        }
      } else {
        for (i = els.length - 1; i >= 0; i--) {
          el = els[i];
          if (el && el.nodeType === NodeType.ELEMENT_NODE) {
            if (nodeName(el) === 'form') {
              attrNormalizer = attrNodeHook;
            }
            if (attrNormalizer && attrNormalizer.set) {
              attrNormalizer.set(el, val, name);
            } else {
              el.setAttribute(name, EMPTY + val);
            }
          }
        }
      }
      return undefined;
    },
    removeAttr: function (selector, name) {
      name = name.toLowerCase();
      name = attrFix[name] || name;
      var els = Dom.query(selector);
      var propName, el, i;
      for (i = els.length - 1; i >= 0; i--) {
        el = els[i];
        if (el.nodeType === NodeType.ELEMENT_NODE) {
          el.removeAttribute(name);
          if (R_BOOLEAN.test(name) && (propName = propFix[name] || name) in el) {
            el[propName] = false;
          }
        }
      }
    },
    hasAttr: docElement && !docElement.hasAttribute ? function (selector, name) {
      name = name.toLowerCase();
      var elems = Dom.query(selector);
      var i, el, attrNode;
      for (i = 0; i < elems.length; i++) {
        el = elems[i];
        attrNode = el.getAttributeNode(name);
        if (attrNode && attrNode.specified) {
          return true;
        }
      }
      return false;
    } : function (selector, name) {
      var elems = Dom.query(selector);
      var len = elems.length;
      for (var i = 0; i < len; i++) {
        if (elems[i].hasAttribute(name)) {
          return true;
        }
      }
      return false;
    },
    val: function (selector, value) {
      var hook, ret, elem, els, i, val;
      if (value === undefined) {
        elem = Dom.get(selector);
        if (elem) {
          hook = valHooks[nodeName(elem)] || valHooks[elem.type];
          if (hook && 'get' in hook && (ret = hook.get(elem, 'value')) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === 'string' ? ret.replace(R_RETURN, '') : ret == null ? '' : ret;
        }
        return undefined;
      }
      els = Dom.query(selector);
      for (i = els.length - 1; i >= 0; i--) {
        elem = els[i];
        if (elem.nodeType !== 1) {
          return undefined;
        }
        val = value;
        if (val == null) {
          val = '';
        } else if (typeof val === 'number') {
          val += '';
        } else if (util.isArray(val)) {
          val = util.map(val, toStr);
        }
        hook = valHooks[nodeName(elem)] || valHooks[elem.type];
        var hookHasSet = hook && 'set' in hook;
        if (!hookHasSet || hook.set(elem, val, 'value') === undefined) {
          elem.value = val;
        }
      }
      return undefined;
    },
    text: function (selector, val) {
      var el, els, i, nodeType;
      if (val === undefined) {
        el = Dom.get(selector);
        return Dom._getText(el);
      } else {
        els = Dom.query(selector);
        for (i = els.length - 1; i >= 0; i--) {
          el = els[i];
          nodeType = el.nodeType;
          if (nodeType === NodeType.ELEMENT_NODE) {
            Dom.cleanData(el.getElementsByTagName('*'));
            if ('textContent' in el) {
              el.textContent = val;
            } else {
              el.innerText = val;
            }
          } else if (nodeType === NodeType.TEXT_NODE || nodeType === NodeType.CDATA_SECTION_NODE) {
            el.nodeValue = val;
          }
        }
      }
      return undefined;
    },
    _getText: function (el) {
      return el.textContent;
    }
  });
  return exports;
}();
domBaseClassList = function (exports) {
  exports = {};
  var Feature = modulexFeature;
  if (!Feature.isClassListSupported()) {
    var util = modulexUtil;
    var SPACE = ' ';
    var RE_CLASS = /[\n\t\r]/g;
    var norm = function (elemClass) {
      return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
    };
    exports = {
      _hasClass: function (elem, classNames) {
        var elemClass = elem.className;
        var className, cl, j;
        if (elemClass) {
          className = norm(elemClass);
          for (j = 0, cl = classNames.length; j < cl; j++) {
            if (className.indexOf(SPACE + classNames[j] + SPACE) < 0) {
              return false;
            }
          }
          return true;
        }
        return false;
      },
      _addClass: function (elem, classNames) {
        var elemClass = elem.className;
        var normClassName, setClass, j;
        var cl = classNames.length;
        if (elemClass) {
          normClassName = norm(elemClass);
          setClass = elemClass;
          j = 0;
          for (; j < cl; j++) {
            if (normClassName.indexOf(SPACE + classNames[j] + SPACE) < 0) {
              setClass += SPACE + classNames[j];
            }
          }
          setClass = util.trim(setClass);
        } else {
          setClass = classNames.join(' ');
        }
        elem.className = setClass;
      },
      _removeClass: function (elem, classNames) {
        var elemClass = elem.className;
        var className, j, needle;
        var cl = classNames.length;
        if (elemClass && cl) {
          className = norm(elemClass);
          j = 0;
          for (; j < cl; j++) {
            needle = SPACE + classNames[j] + SPACE;
            while (className.indexOf(needle) >= 0) {
              className = className.replace(needle, SPACE);
            }
          }
          elem.className = util.trim(className);
        }
      },
      _toggleClass: function (elem, classNames, force) {
        var j, className, result, method;
        var self = this;
        var removed = [];
        var added = [];
        var cl = classNames.length;
        for (j = 0; j < cl; j++) {
          className = classNames[j];
          result = self._hasClass(elem, [className]);
          method = result ? force !== true && 'remove' : force !== false && 'add';
          if (method === 'remove') {
            removed.push(className);
          } else if (method === 'add') {
            added.push(className);
          }
        }
        if (added.length) {
          self._addClass(elem, added);
        }
        if (removed.length) {
          self._removeClass(elem, removed);
        }
      }
    };
  }
  return exports;
}();
domBaseCreate = function (exports) {
  exports = {};
  var util = modulexUtil;
  var undef;
  var Dom = domBaseApi;
  var doc = document, NodeType = Dom.NodeType, UA = modulexUa, ie = UA.ieMode, DIV = 'div', PARENT_NODE = 'parentNode', DEFAULT_DIV = doc && doc.createElement(DIV), R_XHTML_TAG = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, RE_TAG = /<([\w:]+)/, R_LEADING_WHITESPACE = /^\s+/, R_TAIL_WHITESPACE = /\s+$/, oldIE = !!(ie && ie < 9), lostLeadingTailWhitespace = oldIE, R_HTML = /<|&#?\w+;/, supportOuterHTML = doc && 'outerHTML' in doc.documentElement, RE_SIMPLE_TAG = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
  var creators = Dom._creators = { div: defaultCreator }, creatorsMap = {
      area: 'map',
      thead: 'table',
      td: 'tr',
      th: 'tr',
      tr: 'tbody',
      tbody: 'table',
      tfoot: 'table',
      caption: 'table',
      colgroup: 'table',
      col: 'colgroup',
      legend: 'fieldset'
    }, p;
  var tagTpl = '<{tag}>{html}</{tag}>';
  for (p in creatorsMap) {
    (function (tag) {
      creators[p] = function (html, ownerDoc) {
        return Dom.create(util.substitute(tagTpl, {
          tag: tag,
          html: html
        }), undef, ownerDoc);
      };
    }(creatorsMap[p]));
  }
  creators.option = creators.optgroup = function (html, ownerDoc) {
    return Dom.create('<select multiple="multiple">' + html + '</select>', undefined, ownerDoc);
  };
  creatorsMap.option = creatorsMap.optgroup = 1;
  function getElementsByTagName(el, tag) {
    return el.getElementsByTagName(tag);
  }
  function getHolderDiv(ownerDoc, clear) {
    var holder = ownerDoc && ownerDoc !== doc ? ownerDoc.createElement(DIV) : DEFAULT_DIV;
    if (clear && holder === DEFAULT_DIV) {
      holder.innerHTML = '';
    }
    return holder;
  }
  function defaultCreator(html, ownerDoc) {
    var frag = getHolderDiv(ownerDoc);
    frag.innerHTML = 'm<div>' + html + '<' + '/div>';
    return frag.lastChild;
  }
  function _empty(node) {
    try {
      node.innerHTML = '';
      return;
    } catch (e) {
    }
    for (var c; c = node.lastChild;) {
      _destroy(c, node);
    }
  }
  function _destroy(node, parent) {
    if (parent) {
      if (oldIE && parent.canHaveChildren && 'removeNode' in node) {
        if (node.firstChild) {
          _empty(node);
        }
        node.removeNode(false);
      } else {
        parent.removeChild(node);
      }
    }
  }
  util.mix(Dom, {
    create: function (html, attrs, ownerDoc, _trim) {
      var ret = null;
      if (!html) {
        return ret;
      }
      if (html.nodeType) {
        return Dom.clone(html);
      }
      if (typeof html !== 'string') {
        return ret;
      }
      if (_trim === undefined) {
        _trim = true;
      }
      if (_trim) {
        html = util.trim(html);
      }
      var creators = Dom._creators, holder, whitespaceMatch, context = ownerDoc || doc, m, tag = DIV, k, nodes;
      if (!R_HTML.test(html)) {
        ret = context.createTextNode(html);
      } else if (m = RE_SIMPLE_TAG.exec(html)) {
        ret = context.createElement(m[1]);
      } else {
        html = html.replace(R_XHTML_TAG, '<$1><' + '/$2>');
        if ((m = RE_TAG.exec(html)) && (k = m[1])) {
          tag = k.toLowerCase();
        }
        holder = (creators[tag] || defaultCreator)(html, context);
        if (lostLeadingTailWhitespace && (whitespaceMatch = html.match(R_LEADING_WHITESPACE))) {
          holder.insertBefore(context.createTextNode(whitespaceMatch[0]), holder.firstChild);
        }
        if (lostLeadingTailWhitespace && /\S/.test(html) && (whitespaceMatch = html.match(R_TAIL_WHITESPACE))) {
          holder.appendChild(context.createTextNode(whitespaceMatch[0]));
        }
        nodes = holder.childNodes;
        if (nodes.length === 1) {
          ret = nodes[0][PARENT_NODE].removeChild(nodes[0]);
        } else if (nodes.length) {
          ret = nodeListToFragment(nodes);
        } else {
          console.error(html + ' : create node error');
        }
      }
      return attrs ? setAttributes(ret, attrs) : ret;
    },
    _fixCloneAttributes: function (src, dest) {
      var nodeName = src.nodeName.toLowerCase();
      var type = (src.type || '').toLowerCase();
      var srcValue, srcChecked;
      if (nodeName === 'textarea') {
        dest.defaultValue = src.defaultValue;
        dest.value = src.value;
      } else if (nodeName === 'input' && (type === 'checkbox' || type === 'radio')) {
        srcChecked = src.checked;
        if (srcChecked) {
          dest.defaultChecked = dest.checked = srcChecked;
        }
        srcValue = src.value;
        if (dest.value !== srcValue) {
          dest.value = srcValue;
        }
      }
    },
    _defaultCreator: defaultCreator,
    html: function (selector, htmlString, loadScripts) {
      var els = Dom.query(selector), el = els[0], success = false, valNode, i, elem;
      if (!el) {
        return null;
      }
      if (htmlString === undefined) {
        if (el.nodeType === NodeType.ELEMENT_NODE) {
          return el.innerHTML;
        } else if (el.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
          var holder = getHolderDiv(el.ownerDocument, 1);
          holder.appendChild(el);
          return holder.innerHTML;
        } else {
          return null;
        }
      } else {
        htmlString += '';
        if (!htmlString.match(/<(?:script|style|link)/i) && (!lostLeadingTailWhitespace || !htmlString.match(R_LEADING_WHITESPACE)) && !creatorsMap[(htmlString.match(RE_TAG) || [
            '',
            ''
          ])[1].toLowerCase()]) {
          try {
            for (i = els.length - 1; i >= 0; i--) {
              elem = els[i];
              if (elem.nodeType === NodeType.ELEMENT_NODE) {
                Dom.cleanData(getElementsByTagName(elem, '*'));
                elem.innerHTML = htmlString;
              }
            }
            success = true;
          } catch (e) {
          }
        }
        if (!success) {
          valNode = Dom.create(htmlString, 0, el.ownerDocument, 0);
          Dom.empty(els);
          Dom.append(valNode, els, loadScripts);
        }
      }
      return undefined;
    },
    outerHtml: function (selector, htmlString, loadScripts) {
      var els = Dom.query(selector), holder, i, valNode, length = els.length, el = els[0];
      if (!el) {
        return null;
      }
      if (htmlString === undefined) {
        if (supportOuterHTML && el.nodeType !== NodeType.DOCUMENT_FRAGMENT_NODE) {
          return el.outerHTML;
        } else {
          holder = getHolderDiv(el.ownerDocument, 1);
          holder.appendChild(Dom.clone(el, true));
          return holder.innerHTML;
        }
      } else {
        htmlString += '';
        if (!htmlString.match(/<(?:script|style|link)/i) && supportOuterHTML) {
          for (i = length - 1; i >= 0; i--) {
            el = els[i];
            if (el.nodeType === NodeType.ELEMENT_NODE) {
              Dom.cleanData(el, 1);
              el.outerHTML = htmlString;
            }
          }
        } else {
          valNode = Dom.create(htmlString, 0, el.ownerDocument, 0);
          Dom.insertBefore(valNode, els, loadScripts);
          Dom.remove(els);
        }
      }
      return undefined;
    },
    remove: function (selector, keepData) {
      var el, els = Dom.query(selector), all, DOMEvent = module.require('event/dom'), i;
      for (i = els.length - 1; i >= 0; i--) {
        el = els[i];
        if (!keepData && el.nodeType === NodeType.ELEMENT_NODE) {
          all = util.makeArray(getElementsByTagName(el, '*'));
          all.push(el);
          Dom.removeData(all);
          if (DOMEvent) {
            DOMEvent.detach(all);
          }
        }
        _destroy(el, el.parentNode);
      }
    },
    clone: function (selector, deep, withDataAndEvent, deepWithDataAndEvent) {
      if (typeof deep === 'object') {
        deepWithDataAndEvent = deep.deepWithDataAndEvent;
        withDataAndEvent = deep.withDataAndEvent;
        deep = deep.deep;
      }
      var elem = Dom.get(selector), clone, _fixCloneAttributes = Dom._fixCloneAttributes, elemNodeType;
      if (!elem) {
        return null;
      }
      elemNodeType = elem.nodeType;
      clone = elem.cloneNode(deep);
      if (elemNodeType === NodeType.ELEMENT_NODE || elemNodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
        if (_fixCloneAttributes && elemNodeType === NodeType.ELEMENT_NODE) {
          _fixCloneAttributes(elem, clone);
        }
        if (deep && _fixCloneAttributes) {
          processAll(_fixCloneAttributes, elem, clone);
        }
      }
      if (withDataAndEvent) {
        cloneWithDataAndEvent(elem, clone);
        if (deep && deepWithDataAndEvent) {
          processAll(cloneWithDataAndEvent, elem, clone);
        }
      }
      return clone;
    },
    empty: function (selector) {
      var els = Dom.query(selector), el, i;
      for (i = els.length - 1; i >= 0; i--) {
        el = els[i];
        Dom.remove(el.childNodes);
      }
    },
    _nodeListToFragment: nodeListToFragment
  });
  Dom.outerHTML = Dom.outerHtml;
  function processAll(fn, elem, clone) {
    var elemNodeType = elem.nodeType;
    if (elemNodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
      var eCs = elem.childNodes, cloneCs = clone.childNodes, fIndex = 0;
      while (eCs[fIndex]) {
        if (cloneCs[fIndex]) {
          processAll(fn, eCs[fIndex], cloneCs[fIndex]);
        }
        fIndex++;
      }
    } else if (elemNodeType === NodeType.ELEMENT_NODE) {
      var elemChildren = getElementsByTagName(elem, '*'), cloneChildren = getElementsByTagName(clone, '*'), cIndex = 0;
      while (elemChildren[cIndex]) {
        if (cloneChildren[cIndex]) {
          fn(elemChildren[cIndex], cloneChildren[cIndex]);
        }
        cIndex++;
      }
    }
  }
  function cloneWithDataAndEvent(src, dest) {
    var DOMEvent = module.require('event/dom'), srcData, d;
    if (dest.nodeType === NodeType.ELEMENT_NODE && !Dom.hasData(src)) {
      return;
    }
    srcData = Dom.data(src);
    for (d in srcData) {
      Dom.data(dest, d, srcData[d]);
    }
    if (DOMEvent) {
      DOMEvent.clone(src, dest);
    }
  }
  function setAttributes(elem, attrs) {
    var nodeType = elem.nodeType;
    if (nodeType === NodeType.ELEMENT_NODE) {
      Dom.attr(elem, attrs, true);
    } else if (nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
      Dom.attr(elem.childNodes, attrs, true);
    }
    return elem;
  }
  function nodeListToFragment(nodes) {
    var ret = null, i, ownerDoc, len;
    if (nodes && (nodes.push || nodes.item) && nodes[0]) {
      ownerDoc = nodes[0].ownerDocument;
      ret = ownerDoc.createDocumentFragment();
      nodes = util.makeArray(nodes);
      for (i = 0, len = nodes.length; i < len; i++) {
        ret.appendChild(nodes[i]);
      }
    } else {
      console.error('Unable to convert ' + nodes + ' to fragment.');
    }
    return ret;
  }
  return exports;
}();
domBaseData = function (exports) {
  exports = {};
  var util = modulexUtil;
  var Dom = domBaseApi;
  var win = window, EXPANDO = '_ks_data_' + util.now(), dataCache = {}, winDataCache = {}, noData = {
      applet: 1,
      object: 1,
      embed: 1
    };
  var commonOps = {
    hasData: function (cache, name) {
      if (cache) {
        if (name !== undefined) {
          if (name in cache) {
            return true;
          }
        } else if (!util.isEmptyObject(cache)) {
          return true;
        }
      }
      return false;
    }
  };
  var objectOps = {
    hasData: function (ob, name) {
      if (ob == win) {
        return objectOps.hasData(winDataCache, name);
      }
      var thisCache = ob[EXPANDO];
      return commonOps.hasData(thisCache, name);
    },
    data: function (ob, name, value) {
      if (ob == win) {
        return objectOps.data(winDataCache, name, value);
      }
      var cache = ob[EXPANDO];
      if (value !== undefined) {
        cache = ob[EXPANDO] = ob[EXPANDO] || {};
        cache[name] = value;
      } else {
        if (name !== undefined) {
          return cache && cache[name];
        } else {
          cache = ob[EXPANDO] = ob[EXPANDO] || {};
          return cache;
        }
      }
    },
    removeData: function (ob, name) {
      if (ob == win) {
        return objectOps.removeData(winDataCache, name);
      }
      var cache = ob[EXPANDO];
      if (name !== undefined) {
        delete cache[name];
        if (util.isEmptyObject(cache)) {
          objectOps.removeData(ob);
        }
      } else {
        try {
          delete ob[EXPANDO];
        } catch (e) {
          ob[EXPANDO] = undefined;
        }
      }
    }
  };
  var domOps = {
    hasData: function (elem, name) {
      var key = elem[EXPANDO];
      if (!key) {
        return false;
      }
      var thisCache = dataCache[key];
      return commonOps.hasData(thisCache, name);
    },
    data: function (elem, name, value) {
      if (noData[elem.nodeName.toLowerCase()]) {
        return undefined;
      }
      var key = elem[EXPANDO], cache;
      if (!key) {
        if (name !== undefined && value === undefined) {
          return undefined;
        }
        key = elem[EXPANDO] = util.guid();
      }
      cache = dataCache[key];
      if (value !== undefined) {
        cache = dataCache[key] = dataCache[key] || {};
        cache[name] = value;
      } else {
        if (name !== undefined) {
          return cache && cache[name];
        } else {
          cache = dataCache[key] = dataCache[key] || {};
          return cache;
        }
      }
    },
    removeData: function (elem, name) {
      var key = elem[EXPANDO], cache;
      if (!key) {
        return;
      }
      cache = dataCache[key];
      if (name !== undefined) {
        delete cache[name];
        if (util.isEmptyObject(cache)) {
          domOps.removeData(elem);
        }
      } else {
        delete dataCache[key];
        try {
          delete elem[EXPANDO];
        } catch (e) {
          elem[EXPANDO] = undefined;
        }
        if (elem.removeAttribute) {
          elem.removeAttribute(EXPANDO);
        }
      }
    }
  };
  util.mix(Dom, {
    __EXPANDO: EXPANDO,
    hasData: function (selector, name) {
      var ret = false, elems = Dom.query(selector);
      for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (elem.nodeType) {
          ret = domOps.hasData(elem, name);
        } else {
          ret = objectOps.hasData(elem, name);
        }
        if (ret) {
          return ret;
        }
      }
      return ret;
    },
    data: function (selector, name, data) {
      var elems = Dom.query(selector), elem = elems[0];
      if (typeof name === 'object') {
        for (var k in name) {
          Dom.data(elems, k, name[k]);
        }
        return undefined;
      }
      if (data === undefined) {
        if (elem) {
          if (elem.nodeType) {
            return domOps.data(elem, name);
          } else {
            return objectOps.data(elem, name);
          }
        }
      } else {
        for (var i = elems.length - 1; i >= 0; i--) {
          elem = elems[i];
          if (elem.nodeType) {
            domOps.data(elem, name, data);
          } else {
            objectOps.data(elem, name, data);
          }
        }
      }
      return undefined;
    },
    removeData: function (selector, name) {
      var els = Dom.query(selector), elem, i;
      for (i = els.length - 1; i >= 0; i--) {
        elem = els[i];
        if (elem.nodeType) {
          domOps.removeData(elem, name);
        } else {
          objectOps.removeData(elem, name);
        }
      }
    },
    cleanData: function (selector, deep) {
      var els = Dom.query(selector), elem, i;
      var DOMEvent = module.require('event/dom');
      for (i = els.length - 1; i >= 0; i--) {
        elem = els[i];
        if (elem.nodeType) {
          var descendants = deep && util.makeArray(elem.getElementsByTagName('*')) || [];
          descendants.push(elem);
          for (var j = 0, len = descendants.length; j < len; j++) {
            domOps.removeData(descendants[j]);
          }
          if (DOMEvent) {
            DOMEvent.detach(descendants);
          }
        } else {
          objectOps.removeData(elem);
        }
      }
    }
  });
  return exports;
}();
domBaseInsertion = function (exports) {
  exports = {};
  var util = modulexUtil;
  var Dom = domBaseApi;
  var PARENT_NODE = 'parentNode', NodeType = Dom.NodeType, RE_FORM_EL = /^(?:button|input|object|select|textarea)$/i, getNodeName = Dom.nodeName, makeArray = util.makeArray, splice = [].splice, NEXT_SIBLING = 'nextSibling', R_SCRIPT_TYPE = /\/(java|ecma)script/i;
  function isJs(el) {
    return !el.type || R_SCRIPT_TYPE.test(el.type);
  }
  function filterScripts(nodes, scripts) {
    var ret = [], i, el, nodeName;
    for (i = 0; nodes[i]; i++) {
      el = nodes[i];
      nodeName = getNodeName(el);
      if (el.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
        ret.push.apply(ret, filterScripts(makeArray(el.childNodes), scripts));
      } else if (nodeName === 'script' && isJs(el)) {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
        if (scripts) {
          scripts.push(el);
        }
      } else {
        if (el.nodeType === NodeType.ELEMENT_NODE && !RE_FORM_EL.test(nodeName)) {
          var tmp = [], s, j, ss = el.getElementsByTagName('script');
          for (j = 0; j < ss.length; j++) {
            s = ss[j];
            if (isJs(s)) {
              tmp.push(s);
            }
          }
          splice.apply(nodes, [
            i + 1,
            0
          ].concat(tmp));
        }
        ret.push(el);
      }
    }
    return ret;
  }
  function evalScript(el) {
    if (el.src) {
      require.load(el.src);
    } else {
      var code = util.trim(el.text || el.textContent || el.innerHTML || '');
      if (code) {
        util.globalEval(code);
      }
    }
  }
  function insertion(newNodes, refNodes, fn, scripts) {
    newNodes = Dom.query(newNodes);
    if (scripts) {
      scripts = [];
    }
    newNodes = filterScripts(newNodes, scripts);
    if (Dom._fixInsertionChecked) {
      Dom._fixInsertionChecked(newNodes);
    }
    refNodes = Dom.query(refNodes);
    var newNodesLength = newNodes.length, newNode, i, refNode, node, clonedNode, refNodesLength = refNodes.length;
    if (!newNodesLength && (!scripts || !scripts.length) || !refNodesLength) {
      return;
    }
    newNode = Dom._nodeListToFragment(newNodes);
    if (refNodesLength > 1) {
      clonedNode = Dom.clone(newNode, true);
      refNodes = util.makeArray(refNodes);
    }
    for (i = 0; i < refNodesLength; i++) {
      refNode = refNodes[i];
      if (newNode) {
        node = i > 0 ? Dom.clone(clonedNode, true) : newNode;
        fn(node, refNode);
      }
      if (scripts && scripts.length) {
        util.each(scripts, evalScript);
      }
    }
  }
  util.mix(Dom, {
    _fixInsertionChecked: null,
    insertBefore: function (newNodes, refNodes, loadScripts) {
      insertion(newNodes, refNodes, function (newNode, refNode) {
        if (refNode[PARENT_NODE]) {
          refNode[PARENT_NODE].insertBefore(newNode, refNode);
        }
      }, loadScripts);
    },
    insertAfter: function (newNodes, refNodes, loadScripts) {
      insertion(newNodes, refNodes, function (newNode, refNode) {
        if (refNode[PARENT_NODE]) {
          refNode[PARENT_NODE].insertBefore(newNode, refNode[NEXT_SIBLING]);
        }
      }, loadScripts);
    },
    appendTo: function (newNodes, parents, loadScripts) {
      insertion(newNodes, parents, function (newNode, parent) {
        parent.appendChild(newNode);
      }, loadScripts);
    },
    prependTo: function (newNodes, parents, loadScripts) {
      insertion(newNodes, parents, function (newNode, parent) {
        parent.insertBefore(newNode, parent.firstChild);
      }, loadScripts);
    },
    wrapAll: function (wrappedNodes, wrapperNode) {
      wrapperNode = Dom.clone(Dom.get(wrapperNode), true);
      wrappedNodes = Dom.query(wrappedNodes);
      if (wrappedNodes[0].parentNode) {
        Dom.insertBefore(wrapperNode, wrappedNodes[0]);
      }
      var c;
      while ((c = wrapperNode.firstChild) && c.nodeType === 1) {
        wrapperNode = c;
      }
      Dom.appendTo(wrappedNodes, wrapperNode);
    },
    wrap: function (wrappedNodes, wrapperNode) {
      wrappedNodes = Dom.query(wrappedNodes);
      wrapperNode = Dom.get(wrapperNode);
      util.each(wrappedNodes, function (w) {
        Dom.wrapAll(w, wrapperNode);
      });
    },
    wrapInner: function (wrappedNodes, wrapperNode) {
      wrappedNodes = Dom.query(wrappedNodes);
      wrapperNode = Dom.get(wrapperNode);
      util.each(wrappedNodes, function (w) {
        var contents = w.childNodes;
        if (contents.length) {
          Dom.wrapAll(contents, wrapperNode);
        } else {
          w.appendChild(wrapperNode);
        }
      });
    },
    unwrap: function (wrappedNodes) {
      wrappedNodes = Dom.query(wrappedNodes);
      util.each(wrappedNodes, function (w) {
        var p = w.parentNode;
        Dom.replaceWith(p, p.childNodes);
      });
    },
    replaceWith: function (selector, newNodes) {
      var nodes = Dom.query(selector);
      newNodes = Dom.query(newNodes);
      Dom.remove(newNodes, true);
      Dom.insertBefore(newNodes, nodes);
      Dom.remove(nodes);
    }
  });
  util.each({
    prepend: 'prependTo',
    append: 'appendTo',
    before: 'insertBefore',
    after: 'insertAfter'
  }, function (value, key) {
    Dom[key] = Dom[value];
  });
  return exports;
}();
domBaseOffset = function (exports) {
  exports = {};
  var util = modulexUtil;
  var Dom = domBaseApi;
  var win = window, UA = modulexUa, doc = win.document, NodeType = Dom.NodeType, docElem = doc && doc.documentElement, getWindow = Dom.getWindow, CSS1Compat = 'CSS1Compat', compatMode = 'compatMode', MAX = Math.max, POSITION = 'position', RELATIVE = 'relative', DOCUMENT = 'document', BODY = 'body', DOC_ELEMENT = 'documentElement', VIEWPORT = 'viewport', SCROLL = 'scroll', CLIENT = 'client', LEFT = 'left', TOP = 'top', SCROLL_LEFT = SCROLL + 'Left', SCROLL_TOP = SCROLL + 'Top';
  util.mix(Dom, {
    offset: function (selector, coordinates, relativeWin) {
      var elem;
      if (coordinates === undefined) {
        elem = Dom.get(selector);
        var ret;
        if (elem) {
          ret = getOffset(elem, relativeWin);
        }
        return ret;
      }
      var els = Dom.query(selector), i;
      for (i = els.length - 1; i >= 0; i--) {
        elem = els[i];
        setOffset(elem, coordinates);
      }
      return undefined;
    },
    scrollIntoView: function (selector, container, alignWithTop, allowHorizontalScroll) {
      var elem, onlyScrollIfNeeded;
      if (!(elem = Dom.get(selector))) {
        return;
      }
      if (container) {
        container = Dom.get(container);
      }
      if (!container) {
        container = elem.ownerDocument;
      }
      if (container.nodeType === NodeType.DOCUMENT_NODE) {
        container = getWindow(container);
      }
      if (typeof alignWithTop === 'object') {
        allowHorizontalScroll = alignWithTop.allowHorizontalScroll;
        onlyScrollIfNeeded = alignWithTop.onlyScrollIfNeeded;
        alignWithTop = alignWithTop.alignWithTop;
      }
      allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;
      var isWin = util.isWindow(container), elemOffset = Dom.offset(elem), eh = Dom.outerHeight(elem), ew = Dom.outerWidth(elem), containerOffset, ch, cw, containerScroll, diffTop, diffBottom, win, winScroll, ww, wh;
      if (isWin) {
        win = container;
        wh = Dom.height(win);
        ww = Dom.width(win);
        winScroll = {
          left: Dom.scrollLeft(win),
          top: Dom.scrollTop(win)
        };
        diffTop = {
          left: elemOffset[LEFT] - winScroll[LEFT],
          top: elemOffset[TOP] - winScroll[TOP]
        };
        diffBottom = {
          left: elemOffset[LEFT] + ew - (winScroll[LEFT] + ww),
          top: elemOffset[TOP] + eh - (winScroll[TOP] + wh)
        };
        containerScroll = winScroll;
      } else {
        containerOffset = Dom.offset(container);
        ch = container.clientHeight;
        cw = container.clientWidth;
        containerScroll = {
          left: Dom.scrollLeft(container),
          top: Dom.scrollTop(container)
        };
        diffTop = {
          left: elemOffset[LEFT] - (containerOffset[LEFT] + (parseFloat(Dom.css(container, 'borderLeftWidth')) || 0)),
          top: elemOffset[TOP] - (containerOffset[TOP] + (parseFloat(Dom.css(container, 'borderTopWidth')) || 0))
        };
        diffBottom = {
          left: elemOffset[LEFT] + ew - (containerOffset[LEFT] + cw + (parseFloat(Dom.css(container, 'borderRightWidth')) || 0)),
          top: elemOffset[TOP] + eh - (containerOffset[TOP] + ch + (parseFloat(Dom.css(container, 'borderBottomWidth')) || 0))
        };
      }
      if (onlyScrollIfNeeded) {
        if (diffTop.top < 0 || diffBottom.top > 0) {
          if (alignWithTop === true) {
            Dom.scrollTop(container, containerScroll.top + diffTop.top);
          } else if (alignWithTop === false) {
            Dom.scrollTop(container, containerScroll.top + diffBottom.top);
          } else {
            if (diffTop.top < 0) {
              Dom.scrollTop(container, containerScroll.top + diffTop.top);
            } else {
              Dom.scrollTop(container, containerScroll.top + diffBottom.top);
            }
          }
        }
      } else {
        alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
        if (alignWithTop) {
          Dom.scrollTop(container, containerScroll.top + diffTop.top);
        } else {
          Dom.scrollTop(container, containerScroll.top + diffBottom.top);
        }
      }
      if (allowHorizontalScroll) {
        if (onlyScrollIfNeeded) {
          if (diffTop.left < 0 || diffBottom.left > 0) {
            if (alignWithTop === true) {
              Dom.scrollLeft(container, containerScroll.left + diffTop.left);
            } else if (alignWithTop === false) {
              Dom.scrollLeft(container, containerScroll.left + diffBottom.left);
            } else {
              if (diffTop.left < 0) {
                Dom.scrollLeft(container, containerScroll.left + diffTop.left);
              } else {
                Dom.scrollLeft(container, containerScroll.left + diffBottom.left);
              }
            }
          }
        } else {
          alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
          if (alignWithTop) {
            Dom.scrollLeft(container, containerScroll.left + diffTop.left);
          } else {
            Dom.scrollLeft(container, containerScroll.left + diffBottom.left);
          }
        }
      }
    },
    docWidth: 0,
    docHeight: 0,
    viewportHeight: 0,
    viewportWidth: 0,
    scrollTop: 0,
    scrollLeft: 0
  });
  util.each([
    'Left',
    'Top'
  ], function (name, i) {
    var method = SCROLL + name;
    Dom[method] = function (elem, v) {
      if (typeof elem === 'number') {
        return arguments.callee(win, elem);
      }
      elem = Dom.get(elem);
      var ret, left, top, w, d;
      if (elem && elem.nodeType === NodeType.ELEMENT_NODE) {
        if (v !== undefined) {
          elem[method] = parseFloat(v);
        } else {
          ret = elem[method];
        }
      } else {
        w = getWindow(elem);
        if (v !== undefined) {
          v = parseFloat(v);
          left = name === 'Left' ? v : Dom.scrollLeft(w);
          top = name === 'Top' ? v : Dom.scrollTop(w);
          w.scrollTo(left, top);
        } else {
          ret = w['page' + (i ? 'Y' : 'X') + 'Offset'];
          if (typeof ret !== 'number') {
            d = w[DOCUMENT];
            ret = d[DOC_ELEMENT][method];
            if (typeof ret !== 'number') {
              ret = d[BODY][method];
            }
          }
        }
      }
      return ret;
    };
  });
  util.each([
    'Width',
    'Height'
  ], function (name) {
    Dom['doc' + name] = function (refWin) {
      refWin = Dom.get(refWin);
      var d = Dom.getDocument(refWin);
      return MAX(d[DOC_ELEMENT][SCROLL + name], d[BODY][SCROLL + name], Dom[VIEWPORT + name](d));
    };
    Dom[VIEWPORT + name] = function (refWin) {
      refWin = Dom.get(refWin);
      var win = getWindow(refWin);
      var ret = win['inner' + name];
      if (UA.mobile && ret) {
        return ret;
      }
      var prop = CLIENT + name, doc = win[DOCUMENT], body = doc[BODY], documentElement = doc[DOC_ELEMENT], documentElementProp = documentElement[prop];
      return doc[compatMode] === CSS1Compat && documentElementProp || body && body[prop] || documentElementProp;
    };
  });
  function getClientPosition(elem) {
    var box, x, y, doc = elem.ownerDocument, body = doc.body;
    if (!elem.getBoundingClientRect) {
      return {
        left: 0,
        top: 0
      };
    }
    box = elem.getBoundingClientRect();
    x = box[LEFT];
    y = box[TOP];
    x -= docElem.clientLeft || body.clientLeft || 0;
    y -= docElem.clientTop || body.clientTop || 0;
    return {
      left: x,
      top: y
    };
  }
  function getPageOffset(el) {
    var pos = getClientPosition(el), w = getWindow(el);
    pos.left += Dom[SCROLL_LEFT](w);
    pos.top += Dom[SCROLL_TOP](w);
    return pos;
  }
  function getOffset(el, relativeWin) {
    var position = {
        left: 0,
        top: 0
      }, currentWin = getWindow(el), offset, currentEl = el;
    relativeWin = relativeWin || currentWin;
    do {
      offset = currentWin == relativeWin ? getPageOffset(currentEl) : getClientPosition(currentEl);
      position.left += offset.left;
      position.top += offset.top;
    } while (currentWin && currentWin != relativeWin && (currentEl = currentWin.frameElement) && (currentWin = currentWin.parent));
    return position;
  }
  function setOffset(elem, offset) {
    if (Dom.css(elem, POSITION) === 'static') {
      elem.style[POSITION] = RELATIVE;
    }
    var old = getOffset(elem), ret = {}, current, key;
    for (key in offset) {
      current = parseFloat(Dom.css(elem, key)) || 0;
      ret[key] = current + offset[key] - old[key];
    }
    Dom.css(elem, ret);
  }
  return exports;
}();
domBaseStyle = function (exports) {
  exports = {};
  var util = modulexUtil;
  var Dom = domBaseApi;
  var globalWindow = window, getCssVendorInfo = modulexFeature.getCssVendorInfo, UA = modulexUa, BOX_MODELS = [
      'margin',
      'border',
      'padding'
    ], CONTENT_INDEX = -1, PADDING_INDEX = 2, BORDER_INDEX = 1, MARGIN_INDEX = 0, getNodeName = Dom.nodeName, doc = globalWindow.document || {}, RE_MARGIN = /^margin/, WIDTH = 'width', HEIGHT = 'height', DISPLAY = 'display', OLD_DISPLAY = DISPLAY + util.now(), NONE = 'none', cssNumber = {
      fillOpacity: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      orphans: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1
    }, EMPTY = '', DEFAULT_UNIT = 'px', NO_PX_REG = /\d(?!px)[a-z%]+$/i, cssHooks = {}, cssProps = {}, defaultDisplay = {}, userSelectVendorInfo = getCssVendorInfo('userSelect'), userSelectProperty = userSelectVendorInfo && userSelectVendorInfo.propertyName, camelCase = util.camelCase;
  cssProps['float'] = 'cssFloat';
  function normalizeCssPropName(name) {
    if (cssProps[name]) {
      return cssProps[name];
    }
    var vendor = getCssVendorInfo(name);
    return vendor && vendor.propertyName || name;
  }
  function getDefaultDisplay(tagName) {
    var body, oldDisplay = defaultDisplay[tagName], elem;
    if (!defaultDisplay[tagName]) {
      body = doc.body || doc.documentElement;
      elem = doc.createElement(tagName);
      Dom.prepend(elem, body);
      oldDisplay = Dom.css(elem, 'display');
      body.removeChild(elem);
      defaultDisplay[tagName] = oldDisplay;
    }
    return oldDisplay;
  }
  util.mix(Dom, {
    _cssHooks: cssHooks,
    _cssProps: cssProps,
    _getComputedStyle: function (elem, name, computedStyle) {
      var val = '', width, minWidth, maxWidth, style, d = elem.ownerDocument;
      name = normalizeCssPropName(name);
      if (computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null)) {
        val = computedStyle.getPropertyValue(name) || computedStyle[name];
      }
      if (val === '' && !Dom.contains(d, elem)) {
        val = elem.style[name];
      }
      if (Dom._RE_NUM_NO_PX.test(val) && RE_MARGIN.test(name)) {
        style = elem.style;
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = val;
        val = computedStyle.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
      return val;
    },
    style: function (selector, name, val) {
      var els = Dom.query(selector), k, ret, elem = els[0], i;
      if (typeof name === 'object') {
        for (k in name) {
          k = camelCase(k);
          for (i = els.length - 1; i >= 0; i--) {
            style(els[i], k, name[k], 1);
          }
        }
        return undefined;
      }
      name = camelCase(name);
      if (val === undefined) {
        ret = '';
        if (elem) {
          ret = style(elem, name, val, 1);
        }
        return ret;
      } else {
        for (i = els.length - 1; i >= 0; i--) {
          style(els[i], name, val, 1);
        }
      }
      return undefined;
    },
    css: function (selector, name, val) {
      var els = Dom.query(selector), elem = els[0], k, hook, ret, i;
      if (typeof name === 'object') {
        for (k in name) {
          for (i = els.length - 1; i >= 0; i--) {
            style(els[i], k, name[k]);
          }
        }
        return undefined;
      }
      name = camelCase(name);
      hook = cssHooks[name];
      if (val === undefined) {
        ret = '';
        if (elem) {
          if (!(hook && 'get' in hook && (ret = hook.get(elem, true)) !== undefined)) {
            ret = Dom._getComputedStyle(elem, name);
          }
        }
        return typeof ret === 'undefined' ? '' : ret;
      } else {
        for (i = els.length - 1; i >= 0; i--) {
          style(els[i], name, val, 1);
        }
      }
      return undefined;
    },
    show: function (selector) {
      var els = Dom.query(selector), tagName, old, elem, i;
      for (i = els.length - 1; i >= 0; i--) {
        elem = els[i];
        elem.style[DISPLAY] = Dom.data(elem, OLD_DISPLAY) || EMPTY;
        if (Dom.css(elem, DISPLAY) === NONE) {
          tagName = elem.tagName.toLowerCase();
          old = getDefaultDisplay(tagName);
          Dom.data(elem, OLD_DISPLAY, old);
          elem.style[DISPLAY] = old;
        }
      }
    },
    hide: function (selector) {
      var els = Dom.query(selector), elem, i;
      for (i = els.length - 1; i >= 0; i--) {
        elem = els[i];
        var style = elem.style, old = style[DISPLAY];
        if (old !== NONE) {
          if (old) {
            Dom.data(elem, OLD_DISPLAY, old);
          }
          style[DISPLAY] = NONE;
        }
      }
    },
    toggle: function (selector) {
      var els = Dom.query(selector), elem, i;
      for (i = els.length - 1; i >= 0; i--) {
        elem = els[i];
        if (Dom.css(elem, DISPLAY) === NONE) {
          Dom.show(elem);
        } else {
          Dom.hide(elem);
        }
      }
    },
    addStyleSheet: function (refWin, cssText, id) {
      if (typeof refWin === 'string') {
        id = cssText;
        cssText = refWin;
        refWin = globalWindow;
      }
      var doc = Dom.getDocument(refWin), elem;
      if (id && (id = id.replace('#', EMPTY))) {
        elem = Dom.get('#' + id, doc);
      }
      if (elem) {
        return;
      }
      elem = Dom.create('<style>', { id: id }, doc);
      Dom.get('head', doc).appendChild(elem);
      if (elem.styleSheet) {
        elem.styleSheet.cssText = cssText;
      } else {
        elem.appendChild(doc.createTextNode(cssText));
      }
    },
    unselectable: userSelectProperty ? function (selector) {
      var els = Dom.query(selector);
      for (var j = els.length - 1; j >= 0; j--) {
        els[j].style[userSelectProperty] = 'none';
      }
    } : function (selector) {
      var _els = Dom.query(selector), elem, j, e, i = 0, excludes, style, els;
      excludes = [
        'iframe',
        'textarea',
        'input',
        'select'
      ];
      for (j = _els.length - 1; j >= 0; j--) {
        elem = _els[j];
        style = elem.style;
        els = elem.getElementsByTagName('*');
        elem.setAttribute('unselectable', 'on');
        while (e = els[i++]) {
          if (!util.inArray(getNodeName(e), excludes)) {
            e.setAttribute('unselectable', 'on');
          }
        }
      }
    },
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
    width: 0,
    height: 0
  });
  util.each([
    WIDTH,
    HEIGHT
  ], function (name) {
    Dom['inner' + util.ucfirst(name)] = function (selector) {
      var el = Dom.get(selector);
      return el && getWHIgnoreDisplay(el, name, PADDING_INDEX);
    };
    Dom['outer' + util.ucfirst(name)] = function (selector, includeMargin) {
      var el = Dom.get(selector);
      return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
    };
    var which = name === WIDTH ? [
      'Left',
      'Right'
    ] : [
      'Top',
      'Bottom'
    ];
    Dom[name] = function (selector, val) {
      var elem = Dom.get(selector);
      if (val !== undefined) {
        if (elem) {
          var computedStyle = getComputedStyle(elem);
          var isBorderBox = isBorderBoxFn(elem, computedStyle);
          if (isBorderBox) {
            val += getPBMWidth(elem, [
              'padding',
              'border'
            ], which, computedStyle);
          }
          return Dom.css(elem, name, val);
        }
        return undefined;
      }
      return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
    };
    cssHooks[name] = {
      get: function (elem, computed) {
        var val;
        if (computed) {
          val = getWHIgnoreDisplay(elem, name) + 'px';
        }
        return val;
      }
    };
  });
  var cssShow = {
    position: 'absolute',
    visibility: 'hidden',
    display: 'block'
  };
  util.each([
    'left',
    'top'
  ], function (name) {
    cssHooks[name] = {
      get: function (el, computed) {
        var val, isAutoPosition, position;
        if (computed) {
          position = Dom.css(el, 'position');
          if (position === 'static') {
            return 'auto';
          }
          val = Dom._getComputedStyle(el, name);
          isAutoPosition = val === 'auto';
          if (isAutoPosition && position === 'relative') {
            return '0px';
          }
          if (isAutoPosition || NO_PX_REG.test(val)) {
            val = getPosition(el)[name] + 'px';
          }
        }
        return val;
      }
    };
  });
  function swap(elem, options, callback) {
    var old = {}, style = elem.style, name;
    for (name in options) {
      old[name] = style[name];
      style[name] = options[name];
    }
    callback.call(elem);
    for (name in options) {
      style[name] = old[name];
    }
  }
  function style(elem, name, val, camelCased) {
    var elStyle, ret, hook;
    if (!(elStyle = elem.style)) {
      return undefined;
    }
    name = camelCased ? name : camelCase(name);
    hook = cssHooks[name];
    name = normalizeCssPropName(name);
    if (val !== undefined) {
      if (val === null || val === EMPTY) {
        val = EMPTY;
      } else if (!isNaN(Number(val)) && !cssNumber[name]) {
        val += DEFAULT_UNIT;
      }
      if (hook && hook.set) {
        val = hook.set(elem, val);
      }
      if (val !== undefined) {
        try {
          elStyle[name] = val;
        } catch (e) {
        }
        if (val === EMPTY && elStyle.removeAttribute) {
          elStyle.removeAttribute(name);
        }
      }
      if (!elStyle.cssText) {
        if (UA.webkit) {
          elStyle = elem.outerHTML;
        }
        elem.removeAttribute('style');
      }
      return undefined;
    } else {
      if (!(hook && 'get' in hook && (ret = hook.get(elem, false)) !== undefined)) {
        ret = elStyle[name];
      }
      return ret === undefined ? '' : ret;
    }
  }
  function getWHIgnoreDisplay(elem) {
    var val, args = arguments;
    if (elem.offsetWidth !== 0) {
      val = getWH.apply(undefined, args);
    } else {
      swap(elem, cssShow, function () {
        val = getWH.apply(undefined, args);
      });
    }
    return val;
  }
  function getPBMWidth(elem, props, which, computedStyle) {
    var value = 0, prop, j, i;
    for (j = 0; j < props.length; j++) {
      prop = props[j];
      if (prop) {
        for (i = 0; i < which.length; i++) {
          var cssProp;
          if (prop === 'border') {
            cssProp = prop + which[i] + 'Width';
          } else {
            cssProp = prop + which[i];
          }
          value += parseFloat(Dom._getComputedStyle(elem, cssProp, computedStyle)) || 0;
        }
      }
    }
    return value;
  }
  function isBorderBoxFn(elem, computedStyle) {
    return Dom._getComputedStyle(elem, 'boxSizing', computedStyle) === 'border-box';
  }
  function getComputedStyle(elem) {
    var doc = elem.ownerDocument, computedStyle;
    if (doc.defaultView) {
      computedStyle = doc.defaultView.getComputedStyle(elem, null);
    }
    return computedStyle;
  }
  function getWH(elem, name, extra) {
    if (util.isWindow(elem)) {
      return name === WIDTH ? Dom.viewportWidth(elem) : Dom.viewportHeight(elem);
    } else if (elem.nodeType === 9) {
      return name === WIDTH ? Dom.docWidth(elem) : Dom.docHeight(elem);
    }
    var which = name === WIDTH ? [
        'Left',
        'Right'
      ] : [
        'Top',
        'Bottom'
      ], borderBoxValue = name === WIDTH ? elem.offsetWidth : elem.offsetHeight;
    var computedStyle = getComputedStyle(elem);
    var isBorderBox = isBorderBoxFn(elem, computedStyle);
    var cssBoxValue = 0;
    if (borderBoxValue == null || borderBoxValue <= 0) {
      borderBoxValue = undefined;
      cssBoxValue = Dom._getComputedStyle(elem, name, computedStyle);
      if (cssBoxValue == null || Number(cssBoxValue) < 0) {
        cssBoxValue = elem.style[name] || 0;
      }
      cssBoxValue = parseFloat(cssBoxValue) || 0;
    }
    if (extra === undefined) {
      extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
    }
    var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
    var val = borderBoxValue || cssBoxValue;
    if (extra === CONTENT_INDEX) {
      if (borderBoxValueOrIsBorderBox) {
        return val - getPBMWidth(elem, [
          'border',
          'padding'
        ], which, computedStyle);
      } else {
        return cssBoxValue;
      }
    } else if (borderBoxValueOrIsBorderBox) {
      return val + (extra === BORDER_INDEX ? 0 : extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
    } else {
      return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
    }
  }
  var ROOT_REG = /^(?:body|html)$/i;
  function getPosition(el) {
    var offsetParent, offset, parentOffset = {
        top: 0,
        left: 0
      };
    if (Dom.css(el, 'position') === 'fixed') {
      offset = el.getBoundingClientRect();
    } else {
      offsetParent = getOffsetParent(el);
      offset = Dom.offset(el);
      parentOffset = Dom.offset(offsetParent);
      parentOffset.top += parseFloat(Dom.css(offsetParent, 'borderTopWidth')) || 0;
      parentOffset.left += parseFloat(Dom.css(offsetParent, 'borderLeftWidth')) || 0;
    }
    offset.top -= parseFloat(Dom.css(el, 'marginTop')) || 0;
    offset.left -= parseFloat(Dom.css(el, 'marginLeft')) || 0;
    return {
      top: offset.top - parentOffset.top,
      left: offset.left - parentOffset.left
    };
  }
  function getOffsetParent(el) {
    var offsetParent = el.offsetParent || (el.ownerDocument || doc).body;
    while (offsetParent && !ROOT_REG.test(offsetParent.nodeName) && Dom.css(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent;
  }
  return exports;
}();
domBaseSelector = function (exports) {
  exports = {};
  var Dom = domBaseApi;
  var util = modulexUtil;
  var querySelectorAll = domSelector;
  var doc = document, docElem = doc.documentElement, matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector, supportGetElementsByClassName = 'getElementsByClassName' in doc, isArray = util.isArray, getElementsByClassName, makeArray = util.makeArray, isDomNodeList = Dom.isDomNodeList, SPACE = ' ', push = Array.prototype.push, rClassSelector = /^\.([\w-]+)$/, rIdSelector = /^#([\w-]+)$/, rTagSelector = /^([\w-])+$/, rTagIdSelector = /^([\w-]+)#([\w-]+)$/, rSimpleSelector = /^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/, trim = util.trim;
  if (!supportGetElementsByClassName) {
    getElementsByClassName = function (el, match) {
      var result = [], elements = el.getElementsByTagName('*'), i, elem;
      match = ' ' + match + ' ';
      for (i = 0; i < elements.length; i++) {
        elem = elements[i];
        if ((' ' + (elem.className || elem.getAttribute('class')) + ' ').indexOf(match) > -1) {
          result.push(elem);
        }
      }
      return result;
    };
  } else {
    getElementsByClassName = function (el, match) {
      return el.getElementsByClassName(match);
    };
  }
  function queryEach(f) {
    var self = this, l = self.length, i;
    for (i = 0; i < l; i++) {
      if (f(self[i], i) === false) {
        break;
      }
    }
  }
  function checkSelectorAndReturn(selector) {
    var name = selector.substr(1);
    if (!name) {
      throw new Error('An invalid or illegal string was specified for selector.');
    }
    return name;
  }
  function makeMatch(selector) {
    var s = selector.charAt(0);
    if (s === '#') {
      return makeIdMatch(checkSelectorAndReturn(selector));
    } else if (s === '.') {
      return makeClassMatch(checkSelectorAndReturn(selector));
    } else {
      return makeTagMatch(selector);
    }
  }
  function makeIdMatch(id) {
    return function (elem) {
      var match = Dom._getElementById(id, doc);
      return match && Dom._contains(elem, match) ? [match] : [];
    };
  }
  function makeClassMatch(className) {
    return function (elem) {
      return getElementsByClassName(elem, className);
    };
  }
  function makeTagMatch(tagName) {
    return function (elem) {
      return elem.getElementsByTagName(tagName);
    };
  }
  function isSimpleSelector(selector) {
    var complexReg = /,|\+|=|~|\[|\]|:|>|\||\$|\^|\*|\(|\)|[\w-]+\.[\w-]+|[\w-]+#[\w-]+/;
    return !selector.match(complexReg);
  }
  function query(selector, context) {
    var ret, i, el, simpleContext, isSelectorString = typeof selector === 'string', contexts = context !== undefined ? query(context) : (simpleContext = 1) && [doc], contextsLen = contexts.length;
    if (!selector) {
      ret = [];
    } else if (isSelectorString) {
      selector = trim(selector);
      if (simpleContext) {
        if (selector === 'body') {
          ret = [doc.body];
        } else if (rClassSelector.test(selector)) {
          ret = makeArray(getElementsByClassName(doc, RegExp.$1));
        } else if (rTagIdSelector.test(selector)) {
          el = Dom._getElementById(RegExp.$2, doc);
          ret = el && el.nodeName.toLowerCase() === RegExp.$1 ? [el] : [];
        } else if (rIdSelector.test(selector)) {
          el = Dom._getElementById(selector.substr(1), doc);
          ret = el ? [el] : [];
        } else if (rTagSelector.test(selector)) {
          ret = makeArray(doc.getElementsByTagName(selector));
        } else if (isSimpleSelector(selector)) {
          var parts = selector.split(/\s+/), partsLen, parents = contexts, parentIndex, parentsLen;
          for (i = 0, partsLen = parts.length; i < partsLen; i++) {
            parts[i] = makeMatch(parts[i]);
          }
          for (i = 0, partsLen = parts.length; i < partsLen; i++) {
            var part = parts[i], newParents = [], matches;
            for (parentIndex = 0, parentsLen = parents.length; parentIndex < parentsLen; parentIndex++) {
              matches = part(parents[parentIndex]);
              newParents.push.apply(newParents, makeArray(matches));
            }
            parents = newParents;
            if (!parents.length) {
              break;
            }
          }
          ret = parents && parents.length > 1 ? Dom.unique(parents) : parents;
        }
      }
      if (!ret) {
        ret = [];
        for (i = 0; i < contextsLen; i++) {
          push.apply(ret, Dom._selectInternal(selector, contexts[i]));
        }
        if (ret.length > 1 && contextsLen > 1) {
          Dom.unique(ret);
        }
      }
    } else {
      if (selector.nodeType || util.isWindow(selector)) {
        ret = [selector];
      } else if (selector.getDOMNodes) {
        ret = selector.getDOMNodes();
      } else if (isArray(selector)) {
        ret = selector;
      } else if (isDomNodeList(selector)) {
        ret = makeArray(selector);
      } else {
        ret = [selector];
      }
      if (!simpleContext) {
        var tmp = ret, ci, len = tmp.length;
        ret = [];
        for (i = 0; i < len; i++) {
          for (ci = 0; ci < contextsLen; ci++) {
            if (Dom._contains(contexts[ci], tmp[i])) {
              ret.push(tmp[i]);
              break;
            }
          }
        }
      }
    }
    ret.each = queryEach;
    return ret;
  }
  function hasSingleClass(el, cls) {
    var className = el && getAttr(el, 'class');
    return className && (className = className.replace(/[\r\t\n]/g, SPACE)) && (SPACE + className + SPACE).indexOf(SPACE + cls + SPACE) > -1;
  }
  function getAttr(el, name) {
    var ret = el && el.getAttributeNode(name);
    if (ret && ret.specified) {
      return 'value' in ret ? ret.value : ret.nodeValue;
    }
    return undefined;
  }
  function isTag(el, value) {
    return value === '*' || el.nodeName.toLowerCase() === value.toLowerCase();
  }
  var compareNodeOrder = 'sourceIndex' in docElem ? function (a, b) {
    return a.sourceIndex - b.sourceIndex;
  } : function (a, b) {
    if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
      return a.compareDocumentPosition ? -1 : 1;
    }
    var bit = a.compareDocumentPosition(b) & 4;
    return bit ? -1 : 1;
  };
  var matchesInternal = querySelectorAll && querySelectorAll.matches ? querySelectorAll.matches : function (str, seeds) {
    var ret = [], i = 0, n, len = seeds.length;
    for (; i < len; i++) {
      n = seeds[i];
      if (matches.call(n, str)) {
        ret.push(n);
      }
    }
    return ret;
  };
  util.mix(Dom, {
    _getElementsByTagName: function (name, context) {
      return makeArray(context.querySelectorAll(name));
    },
    _getElementById: function (id, doc) {
      return doc.getElementById(id);
    },
    _getSimpleAttr: getAttr,
    _isTag: isTag,
    _hasSingleClass: hasSingleClass,
    _selectInternal: querySelectorAll || function (str, context) {
      return makeArray(context.querySelectorAll(str));
    },
    query: query,
    get: function (selector, context) {
      return query(selector, context)[0] || null;
    },
    unique: function () {
      var hasDuplicate, baseHasDuplicate = true;
      [
        0,
        0
      ].sort(function () {
        baseHasDuplicate = false;
        return 0;
      });
      function sortOrder(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        return compareNodeOrder(a, b);
      }
      return function (elements) {
        hasDuplicate = baseHasDuplicate;
        elements.sort(sortOrder);
        if (hasDuplicate) {
          var i = 1, len = elements.length;
          while (i < len) {
            if (elements[i] === elements[i - 1]) {
              elements.splice(i, 1);
              --len;
            } else {
              i++;
            }
          }
        }
        return elements;
      };
    }(),
    filter: function (selector, filter, context) {
      var elems = query(selector, context), id, tag, match, cls, ret = [];
      if (typeof filter === 'string' && (filter = trim(filter)) && (match = rSimpleSelector.exec(filter))) {
        id = match[1];
        tag = match[2];
        cls = match[3];
        if (!id) {
          filter = function (elem) {
            var tagRe = true, clsRe = true;
            if (tag) {
              tagRe = isTag(elem, tag);
            }
            if (cls) {
              clsRe = hasSingleClass(elem, cls);
            }
            return clsRe && tagRe;
          };
        } else if (id && !tag && !cls) {
          filter = function (elem) {
            return getAttr(elem, 'id') === id;
          };
        }
      }
      if (typeof filter === 'function') {
        ret = util.filter(elems, filter);
      } else {
        ret = matchesInternal(filter, elems);
      }
      return ret;
    },
    test: function (selector, filter, context) {
      var elements = query(selector, context);
      return elements.length && Dom.filter(elements, filter, context).length === elements.length;
    }
  });
  return exports;
}();
domBaseTraversal = function (exports) {
  exports = {};
  var util = modulexUtil;
  var Dom = domBaseApi;
  var NodeType = Dom.NodeType, CONTAIN_MASK = 16;
  util.mix(Dom, {
    _contains: function (a, b) {
      return !!(a.compareDocumentPosition(b) & CONTAIN_MASK);
    },
    closest: function (selector, filter, context, allowTextNode) {
      return nth(selector, filter, 'parentNode', function (elem) {
        return elem.nodeType !== NodeType.DOCUMENT_FRAGMENT_NODE;
      }, context, true, allowTextNode);
    },
    parent: function (selector, filter, context) {
      return nth(selector, filter, 'parentNode', function (elem) {
        return elem.nodeType !== NodeType.DOCUMENT_FRAGMENT_NODE;
      }, context, undefined);
    },
    first: function (selector, filter, allowTextNode) {
      var elem = Dom.get(selector);
      return nth(elem && elem.firstChild, filter, 'nextSibling', undefined, undefined, true, allowTextNode);
    },
    last: function (selector, filter, allowTextNode) {
      var elem = Dom.get(selector);
      return nth(elem && elem.lastChild, filter, 'previousSibling', undefined, undefined, true, allowTextNode);
    },
    next: function (selector, filter, allowTextNode) {
      return nth(selector, filter, 'nextSibling', undefined, undefined, undefined, allowTextNode);
    },
    prev: function (selector, filter, allowTextNode) {
      return nth(selector, filter, 'previousSibling', undefined, undefined, undefined, allowTextNode);
    },
    siblings: function (selector, filter, allowTextNode) {
      return getSiblings(selector, filter, true, allowTextNode);
    },
    children: function (selector, filter) {
      return getSiblings(selector, filter, undefined);
    },
    contents: function (selector, filter) {
      return getSiblings(selector, filter, undefined, 1);
    },
    contains: function (container, contained) {
      container = Dom.get(container);
      contained = Dom.get(contained);
      if (container && contained) {
        return Dom._contains(container, contained);
      }
      return false;
    },
    index: function (selector, s2) {
      var els = Dom.query(selector), c, n = 0, p, els2, el = els[0];
      if (!s2) {
        p = el && el.parentNode;
        if (!p) {
          return -1;
        }
        c = el;
        while (c = c.previousSibling) {
          if (c.nodeType === NodeType.ELEMENT_NODE) {
            n++;
          }
        }
        return n;
      }
      els2 = Dom.query(s2);
      if (typeof s2 === 'string') {
        return util.indexOf(el, els2);
      }
      return util.indexOf(els2[0], els);
    },
    equals: function (n1, n2) {
      n1 = Dom.query(n1);
      n2 = Dom.query(n2);
      if (n1.length !== n2.length) {
        return false;
      }
      for (var i = n1.length; i >= 0; i--) {
        if (n1[i] !== n2[i]) {
          return false;
        }
      }
      return true;
    }
  });
  function nth(elem, filter, direction, extraFilter, context, includeSef, allowTextNode) {
    if (!(elem = Dom.get(elem))) {
      return null;
    }
    if (filter === 0) {
      return elem;
    }
    if (!includeSef) {
      elem = elem[direction];
    }
    if (!elem) {
      return null;
    }
    context = context && Dom.get(context) || null;
    if (filter === undefined) {
      filter = 1;
    }
    var ret = [], isArray = util.isArray(filter), fi, filterLength;
    if (typeof filter === 'number') {
      fi = 0;
      filterLength = filter;
      filter = function () {
        return ++fi === filterLength;
      };
    }
    while (elem && elem !== context) {
      if ((elem.nodeType === NodeType.ELEMENT_NODE || elem.nodeType === NodeType.TEXT_NODE && allowTextNode) && testFilter(elem, filter) && (!extraFilter || extraFilter(elem))) {
        ret.push(elem);
        if (!isArray) {
          break;
        }
      }
      elem = elem[direction];
    }
    return isArray ? ret : ret[0] || null;
  }
  function testFilter(elem, filter) {
    if (!filter) {
      return true;
    }
    if (util.isArray(filter)) {
      var i, l = filter.length;
      if (!l) {
        return true;
      }
      for (i = 0; i < l; i++) {
        if (Dom.test(elem, filter[i])) {
          return true;
        }
      }
    } else if (Dom.test(elem, filter)) {
      return true;
    }
    return false;
  }
  function getSiblings(selector, filter, parent, allowText) {
    var ret = [], tmp, i, el, elem = Dom.get(selector), parentNode = elem;
    if (elem && parent) {
      parentNode = elem.parentNode;
    }
    if (parentNode) {
      tmp = util.makeArray(parentNode.childNodes);
      for (i = 0; i < tmp.length; i++) {
        el = tmp[i];
        if (!allowText && el.nodeType !== NodeType.ELEMENT_NODE) {
          continue;
        }
        if (el === elem) {
          continue;
        }
        ret.push(el);
      }
      if (filter) {
        ret = Dom.filter(ret, filter);
      }
    }
    return ret;
  }
  return exports;
}();
domBaseClass = function (exports) {
  exports = {};
  var Dom = domBaseApi;
  var util = modulexUtil;
  var slice = [].slice;
  var NodeType = Dom.NodeType;
  var RE_SPLIT = /[\.\s]\s*\.?/;
  function strToArray(str) {
    str = util.trim(str || '');
    var arr = str.split(RE_SPLIT);
    var newArr = [];
    var v;
    var l = arr.length;
    var i = 0;
    for (; i < l; i++) {
      if (v = arr[i]) {
        newArr.push(v);
      }
    }
    return newArr;
  }
  function batchClassList(method) {
    return function (elem, classNames) {
      var i, l, className;
      var classList = elem.classList;
      var extraArgs = slice.call(arguments, 2);
      for (i = 0, l = classNames.length; i < l; i++) {
        if (className = classNames[i]) {
          classList[method].apply(classList, [className].concat(extraArgs));
        }
      }
    };
  }
  function batchEls(method) {
    return function (selector, className) {
      var classNames = strToArray(className);
      var extraArgs = slice.call(arguments, 2);
      Dom.query(selector).each(function (elem) {
        if (elem.nodeType === NodeType.ELEMENT_NODE) {
          Dom[method].apply(Dom, [
            elem,
            classNames
          ].concat(extraArgs));
        }
      });
    };
  }
  util.mix(Dom, {
    _hasClass: function (elem, classNames) {
      var i, l, className;
      var classList = elem.classList;
      if (classList.length) {
        for (i = 0, l = classNames.length; i < l; i++) {
          className = classNames[i];
          if (className && !classList.contains(className)) {
            return false;
          }
        }
        return true;
      }
      return false;
    },
    _addClass: batchClassList('add'),
    _removeClass: batchClassList('remove'),
    _toggleClass: batchClassList('toggle'),
    hasClass: function (selector, className) {
      var ret = false;
      className = strToArray(className);
      Dom.query(selector).each(function (elem) {
        if (elem.nodeType === NodeType.ELEMENT_NODE && Dom._hasClass(elem, className)) {
          ret = true;
          return false;
        }
        return undefined;
      });
      return ret;
    },
    replaceClass: function (selector, oldClassName, newClassName) {
      Dom.removeClass(selector, oldClassName);
      Dom.addClass(selector, newClassName);
    },
    addClass: batchEls('_addClass'),
    removeClass: batchEls('_removeClass'),
    toggleClass: batchEls('_toggleClass')
  });
  util.mix(Dom, domBaseClassList);
  return exports;
}();
domBase = function (exports) {
  exports = {};
  var Dom = domBaseApi;
  domBaseAttr;
  domBaseClass;
  domBaseCreate;
  domBaseData;
  domBaseInsertion;
  domBaseOffset;
  domBaseStyle;
  domBaseSelector;
  domBaseTraversal;
  exports = Dom;
  module.exports.version = '1.0.2';
  return exports;
}();
module.exports = domBase;
});