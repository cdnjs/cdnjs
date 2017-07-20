/*
Copyright 2014, modulex-node@1.0.1
MIT Licensed
build time: Mon, 20 Oct 2014 04:00:58 GMT
*/
modulex.add("node", ["util","dom","event-dom","anim"], function(require, exports, module) {
var _util_ = require("util");
var dom = require("dom");
var eventDom = require("event-dom");
var anim = require("anim");
/*
combined modules:
node
node/base
node/attach
node/override
node/anim
*/
var nodeBase, nodeAttach, nodeOverride, nodeAnim, node;
nodeBase = function (exports) {
  /**
   * @ignore
   * definition for node and nodelist
   * @author yiminghe@gmail.com, lifesinger@gmail.com
   */
  var util = _util_;
  var Dom = dom;
  var DomEvent = eventDom;
  var AP = Array.prototype, slice = AP.slice, NodeType = Dom.NodeType, push = AP.push, makeArray = util.makeArray, isDomNodeList = Dom.isDomNodeList;
  /**
   * The Node class provides a {@link KISSY.DOM} wrapper for manipulating Dom Node.
   * use KISSY.all/one to retrieve NodeList instances.
   *
   *
   *      @example
   *      KISSY.all('a').attr('href','http://docs.kissyui.com');
   *
   * @class KISSY.Node
   */
  function Node(html, attrs, ownerDocument) {
    var self = this, domNode;
    if (html instanceof Node && arguments.length === 1) {
      return html.slice();
    }
    if (!(self instanceof Node)) {
      return Node.all.apply(Node, arguments);
    }
    // handle Node(''), Node(null), or Node(undefined)
    if (!html) {
      return self;
    } else if (typeof html === 'string') {
      // create from html
      domNode = Dom.create(html, attrs, ownerDocument);
      // ('<p>1</p><p>2</p>') 转换为 Node
      if (domNode.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
        // fragment
        push.apply(this, makeArray(domNode.childNodes));
        return self;
      }
    } else if (util.isArray(html) || isDomNodeList(html)) {
      push.apply(self, makeArray(html));
      return self;
    } else {
      // node, document, window
      domNode = html;
    }
    self[0] = domNode;
    self.length = 1;
    return self;
  }
  Node.prototype = {
    constructor: Node,
    isNode: true,
    /**
     * length of Node
     * @type {Number}
     */
    length: 0,
    /**
     * Get one node at index
     * @param {Number} index Index position.
     * @return {KISSY.Node}
     */
    item: function (index) {
      var self = this;
      index = parseInt(index, 10);
      return typeof index === 'number' && !isNaN(index) && index < self.length ? new Node(self[index]) : null;
    },
    /**
     * return a new Node object which consists of current node list and parameter node list.
     * @param {KISSY.Node} selector Selector string or html string or common dom node.
     * @param {KISSY.Node|Number} [context] Search context for selector
     * @param {Number} [index] Insert position.
     * @return {KISSY.Node} a new Node
     */
    add: function (selector, context, index) {
      if (typeof context === 'number') {
        index = context;
        context = undefined;
      }
      var list = Node.all(selector, context).getDOMNodes(), ret = new Node(this);
      if (index === undefined) {
        push.apply(ret, list);
      } else {
        var args = [
          index,
          0
        ];
        args.push.apply(args, list);
        AP.splice.apply(ret, args);
      }
      return ret;
    },
    /**
     * Get part of node list.
     * Arguments are same with Array.prototype.slice
     * @return {KISSY.Node}
     */
    slice: function () {
      // ie<9 : [1,2].slice(0 - 2,undefined) => []
      // ie<9 : [1,2].slice(0 - 2) => [1,2]
      // fix #85
      return new Node(slice.apply(this, arguments));
    },
    /**
     * Retrieves the DOMNodes.
     */
    getDOMNodes: function () {
      return slice.call(this);
    },
    /**
     * Applies the given function to each Node in the Node.
     * @param {Function} fn The function to apply. It receives 3 arguments:
     * the current node instance, the node's index,
     * and the Node instance
     * @param [context] An optional context to
     * apply the function with Default context is the current Node instance
     * @return {KISSY.Node}
     */
    each: function (fn, context) {
      var self = this;
      util.each(self, function (n, i) {
        n = new Node(n);
        return fn.call(context || n, n, i, self);
      });
      return self;
    },
    /**
     * Retrieves the DOMNode.
     * @return {HTMLElement}
     */
    getDOMNode: function () {
      return this[0];
    },
    /**
     * return last stack node list.
     * @return {KISSY.Node}
     */
    end: function () {
      var self = this;
      return self.__parent || self;
    },
    /**
     * return new Node which contains only nodes which passes filter
     * @param {String|Function} filter
     * @return {KISSY.Node}
     */
    filter: function (filter) {
      return new Node(Dom.filter(this, filter));
    },
    /**
     * Get node list which are descendants of current node list.
     * @param {String} selector Selector string
     * @return {KISSY.Node}
     */
    all: function (selector) {
      var ret, self = this;
      if (self.length > 0) {
        ret = Node.all(selector, self);
      } else {
        ret = new Node();
      }
      ret.__parent = self;
      return ret;
    },
    /**
     * Get node list which match selector under current node list sub tree.
     * @param {String} selector
     * @return {KISSY.Node}
     */
    one: function (selector) {
      var self = this, all = self.all(selector), ret = all.length ? all.slice(0, 1) : null;
      if (ret) {
        ret.__parent = self;
      }
      return ret;
    }
  };
  Node.prototype.find = Node.prototype.all;
  util.mix(Node, {
    /**
     * Get node list from selector or construct new node list from html string.
     * Can also called from KISSY.all
     * @param {String|KISSY.Node} selector Selector string or html string or common dom node.
     * @param {String|KISSY.Node} [context] Search context for selector
     * @return {KISSY.Node}
     * @member KISSY.Node
     * @static
     */
    all: function (selector, context) {
      // are we dealing with html string ?
      // TextNode 仍需要自己 new Node
      if (typeof selector === 'string' && (selector = util.trim(selector)) && selector.length >= 3 && util.startsWith(selector, '<') && util.endsWith(selector, '>')) {
        var attrs;
        if (context) {
          if (context.getDOMNode) {
            context = context[0];
          }
          if (!context.nodeType) {
            attrs = context;
            context = arguments[2];
          }
        }
        return new Node(selector, attrs, context);
      }
      return new Node(Dom.query(selector, context));
    },
    /**
     * Get node list with length of one
     * from selector or construct new node list from html string.
     * @param {String|KISSY.Node} selector Selector string or html string or common dom node.
     * @param {String|KISSY.Node} [context] Search context for selector
     * @return {KISSY.Node}
     * @member KISSY.Node
     * @static
     */
    one: function (selector, context) {
      var all = Node.all(selector, context);
      return all.length ? all.slice(0, 1) : null;
    }
  });
  Node.Event = DomEvent;
  Node.Dom = Dom;
  exports = Node;
  return exports;
}();
nodeAttach = function (exports) {
  var util = _util_;
  var Dom = dom;
  var DomEvent = eventDom;
  var Node = nodeBase;
  var NLP = Node.prototype, makeArray = util.makeArray, DOM_INCLUDES_NORM = [
      'nodeName',
      'isCustomDomain',
      'getEmptyIframeSrc',
      'equals',
      'contains',
      'index',
      'scrollTop',
      'scrollLeft',
      'height',
      'width',
      'innerHeight',
      'innerWidth',
      'outerHeight',
      'outerWidth',
      'addStyleSheet',
      'appendTo',
      'prependTo',
      'insertBefore',
      'before',
      'after',
      'insertAfter',
      'test',
      'hasClass',
      'addClass',
      'removeClass',
      'replaceClass',
      'toggleClass',
      'removeAttr',
      'hasAttr',
      'hasProp',
      'scrollIntoView',
      'remove',
      'empty',
      'removeData',
      'hasData',
      'unselectable',
      'wrap',
      'wrapAll',
      'replaceWith',
      'wrapInner',
      'unwrap'
    ], DOM_INCLUDES_NORM_NODE_LIST = [
      'getWindow',
      'getDocument',
      'filter',
      'first',
      'last',
      'parent',
      'closest',
      'next',
      'prev',
      'clone',
      'siblings',
      'contents',
      'children'
    ], DOM_INCLUDES_NORM_IF = {
      attr: 1,
      text: 0,
      css: 1,
      style: 1,
      val: 0,
      prop: 1,
      offset: 0,
      html: 0,
      outerHTML: 0,
      outerHtml: 0,
      data: 1
    }, EVENT_INCLUDES_SELF = [
      'on',
      'detach',
      'delegate',
      'undelegate'
    ], EVENT_INCLUDES_RET = [
      'fire',
      'fireHandler'
    ];
  Node.KeyCode = DomEvent.KeyCode;
  function accessNorm(fn, self, args) {
    args.unshift(self);
    var ret = Dom[fn].apply(Dom, args);
    if (ret === undefined) {
      return self;
    }
    return ret;
  }
  function accessNormList(fn, self, args) {
    args.unshift(self);
    var ret = Dom[fn].apply(Dom, args);
    if (ret === undefined) {
      return self;
    } else if (ret === null) {
      return null;
    }
    return new Node(ret);
  }
  function accessNormIf(fn, self, index, args) {
    if (args[index] === undefined && !util.isObject(args[0])) {
      args.unshift(self);
      return Dom[fn].apply(Dom, args);
    }
    return accessNorm(fn, self, args);
  }
  util.each(DOM_INCLUDES_NORM, function (k) {
    NLP[k] = function () {
      var args = makeArray(arguments);
      return accessNorm(k, this, args);
    };
  });
  util.each(DOM_INCLUDES_NORM_NODE_LIST, function (k) {
    NLP[k] = function () {
      var args = makeArray(arguments);
      return accessNormList(k, this, args);
    };
  });
  util.each(DOM_INCLUDES_NORM_IF, function (index, k) {
    NLP[k] = function () {
      var args = makeArray(arguments);
      return accessNormIf(k, this, index, args);
    };
  });
  util.each(EVENT_INCLUDES_SELF, function (k) {
    NLP[k] = function () {
      var self = this, args = makeArray(arguments);
      args.unshift(self);
      DomEvent[k].apply(DomEvent, args);
      return self;
    };
  });
  util.each(EVENT_INCLUDES_RET, function (k) {
    NLP[k] = function () {
      var self = this, args = makeArray(arguments);
      args.unshift(self);
      return DomEvent[k].apply(DomEvent, args);
    };
  });
  return exports;
}();
nodeOverride = function (exports) {
  var util = _util_;
  var Dom = dom;
  var Node = nodeBase;
  var NLP = Node.prototype;
  util.each([
    'append',
    'prepend',
    'before',
    'after'
  ], function (insertType) {
    NLP[insertType] = function (html) {
      var newNode = html, self = this;
      if (typeof newNode !== 'object') {
        newNode = Dom.create(newNode + '');
      }
      if (newNode) {
        Dom[insertType](newNode, self);
      }
      return self;
    };
  });
  util.each([
    'wrap',
    'wrapAll',
    'replaceWith',
    'wrapInner'
  ], function (fixType) {
    var orig = NLP[fixType];
    NLP[fixType] = function (others) {
      var self = this;
      if (typeof others === 'string') {
        others = Node.all(others, self[0].ownerDocument);
      }
      return orig.call(self, others);
    };
  });
  return exports;
}();
nodeAnim = function (exports) {
  var Node = nodeBase;
  var Dom = dom;
  var Anim = anim;
  var util = _util_;
  var FX = [
    [
      'height',
      'margin-top',
      'margin-bottom',
      'padding-top',
      'padding-bottom'
    ],
    [
      'width',
      'margin-left',
      'margin-right',
      'padding-left',
      'padding-right'
    ],
    ['opacity']
  ];
  function getFxs(type, num, from) {
    var ret = [], obj = {};
    for (var i = from || 0; i < num; i++) {
      ret.push.apply(ret, FX[i]);
    }
    for (i = 0; i < ret.length; i++) {
      obj[ret[i]] = type;
    }
    return obj;
  }
  util.augment(Node, {
    animate: function () {
      var self = this, l = self.length, needClone = self.length > 1, originArgs = util.makeArray(arguments);
      var cfg = originArgs[0];
      var AnimConstructor = Anim;
      if (cfg.to) {
        AnimConstructor = cfg.Anim || Anim;
      } else {
        cfg = originArgs[1];
        if (cfg) {
          AnimConstructor = cfg.Anim || Anim;
        }
      }
      for (var i = 0; i < l; i++) {
        var elem = self[i];
        var args = needClone ? util.clone(originArgs) : originArgs, arg0 = args[0];
        if (arg0.to) {
          arg0.node = elem;
          new AnimConstructor(arg0).run();
        } else {
          AnimConstructor.apply(undefined, [elem].concat(args)).run();
        }
      }
      return self;
    },
    stop: function (end, clearQueue, queue) {
      var self = this;
      util.each(self, function (elem) {
        Anim.stop(elem, end, clearQueue, queue);
      });
      return self;
    },
    pause: function (end, queue) {
      var self = this;
      util.each(self, function (elem) {
        Anim.pause(elem, queue);
      });
      return self;
    },
    resume: function (end, queue) {
      var self = this;
      util.each(self, function (elem) {
        Anim.resume(elem, queue);
      });
      return self;
    },
    isRunning: function () {
      var self = this;
      for (var i = 0; i < self.length; i++) {
        if (Anim.isRunning(self[i])) {
          return true;
        }
      }
      return false;
    },
    isPaused: function () {
      var self = this;
      for (var i = 0; i < self.length; i++) {
        if (Anim.isPaused(self[i])) {
          return true;
        }
      }
      return false;
    }
  });
  util.each({
    show: getFxs('show', 3),
    hide: getFxs('hide', 3),
    toggle: getFxs('toggle', 3),
    fadeIn: getFxs('show', 3, 2),
    fadeOut: getFxs('hide', 3, 2),
    fadeToggle: getFxs('toggle', 3, 2),
    slideDown: getFxs('show', 1),
    slideUp: getFxs('hide', 1),
    slideToggle: getFxs('toggle', 1)
  }, function (v, k) {
    Node.prototype[k] = function (duration, complete, easing) {
      var self = this;
      if (Dom[k] && !duration) {
        Dom[k](self);
      } else {
        var AnimConstructor = Anim;
        if (typeof duration === 'object') {
          AnimConstructor = duration.Anim || Anim;
        }
        util.each(self, function (elem) {
          new AnimConstructor(elem, v, duration, easing, complete).run();
        });
      }
      return self;
    };
  });
  return exports;
}();
node = function (exports) {
  exports = nodeBase;
  module.exports.version = '1.0.1';
  return exports;
}();
module.exports = node;
});