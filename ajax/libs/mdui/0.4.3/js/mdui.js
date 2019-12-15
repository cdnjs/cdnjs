/*!
 * mdui v0.4.3 (https://mdui.org)
 * Copyright 2016-2019 zdhxiong
 * Licensed under MIT
 */
/* jshint ignore:start */
;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.mdui = factory());
}(this, (function() {
  'use strict';

  /* jshint ignore:end */
  var mdui = {};

  /**
   * =============================================================================
   * ************   浏览器兼容性问题修复   ************
   * =============================================================================
   */

  /**
   * requestAnimationFrame
   * cancelAnimationFrame
   */
  (function () {
    var lastTime = 0;

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = window.webkitRequestAnimationFrame;
      window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));

        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
          }, timeToCall);

        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  })();


  /**
   * JQ 1.0.0 (https://github.com/zdhxiong/mdui.JQ#readme)
   * Copyright 2018-2018 zdhxiong
   * Licensed under MIT
   */
  var $ = (function () {
    'use strict';

    var JQ = function JQ(arr) {
      var self = this;

      for (var i = 0; i < arr.length; i += 1) {
        self[i] = arr[i];
      }

      self.length = arr.length;

      return this;
    };

    function $(selector) {
      var arr = [];

      if (!selector) {
        return new JQ(arr);
      }

      if (selector instanceof JQ) {
        return selector;
      }

      if (typeof selector === 'string') {
        var html = selector.trim();

        if (html[0] === '<' && html[html.length - 1] === '>') {
          // 创建 HTML 字符串
          var toCreate = 'div';

          if (html.indexOf('<li') === 0) {
            toCreate = 'ul';
          }

          if (html.indexOf('<tr') === 0) {
            toCreate = 'tbody';
          }

          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) {
            toCreate = 'tr';
          }

          if (html.indexOf('<tbody') === 0) {
            toCreate = 'table';
          }

          if (html.indexOf('<option') === 0) {
            toCreate = 'select';
          }

          var tempParent = document.createElement(toCreate);
          tempParent.innerHTML = html;

          for (var i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          // 选择器
          var elems = selector[0] === '#' && !selector.match(/[ .<>:~]/)
            ? [document.getElementById(selector.slice(1))]
            : document.querySelectorAll(selector);

          for (var i$1 = 0; i$1 < elems.length; i$1 += 1) {
            if (elems[i$1]) {
              arr.push(elems[i$1]);
            }
          }
        }
      } else if (typeof selector === 'function') {
        // function
        return $(document).ready(selector);
      } else if (selector.nodeType || selector === window || selector === document) {
        // Node
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // NodeList
        for (var i$2 = 0; i$2 < selector.length; i$2 += 1) {
          arr.push(selector[i$2]);
        }
      }

      return new JQ(arr);
    }

    $.fn = JQ.prototype;

    function extend() {
      var this$1 = this;
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (!args.length) {
        return this;
      }

      // $.extend(obj)
      if (args.length === 1) {
        Object.keys(args[0]).forEach(function (prop) {
          this$1[prop] = args[0][prop];
        });

        return this;
      }

      // $.extend({}, defaults[, obj])
      var target = args.shift();

      var loop = function ( i ) {
        Object.keys(args[i]).forEach(function (prop) {
          target[prop] = args[i][prop];
        });
      };

      for (var i = 0; i < args.length; i += 1) loop( i );

      return target;
    }

    $.fn.extend = extend;
    $.extend = extend;

    /**
     * 判断一个节点名
     * @param ele
     * @param name
     * @returns {boolean}
     */
    function isNodeName(ele, name) {
      return ele.nodeName && ele.nodeName.toLowerCase() === name.toLowerCase();
    }

    /**
     * 除去 null 后的 object 类型
     * @param obj
     * @returns {*|boolean}
     */
    function isObjectLike(obj) {
      return typeof obj === 'object' && obj !== null;
    }

    function isFunction(fn) {
      return typeof fn === 'function';
    }

    function isString(obj) {
      return typeof obj === 'string';
    }

    function isWindow(win) {
      return win && win === win.window;
    }

    function isDocument(doc) {
      return doc && doc.nodeType === doc.DOCUMENT_NODE;
    }

    function isArrayLike(obj) {
      return typeof obj.length === 'number';
    }

    /**
     * 循环数组或对象
     * @param obj
     * @param callback
     * @returns {*}
     */
    function each(obj, callback) {
      if (isArrayLike(obj)) {
        for (var i = 0; i < obj.length; i += 1) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            return obj;
          }
        }
      } else {
        var keys = Object.keys(obj);
        for (var i$1 = 0; i$1 < keys.length; i$1 += 1) {
          if (callback.call(obj[keys[i$1]], keys[i$1], obj[keys[i$1]]) === false) {
            return obj;
          }
        }
      }

      return obj;
    }

    /**
     * 遍历数组或对象，通过函数返回一个新的数组或对象，null 和 undefined 将被过滤掉。
     * @param elems
     * @param callback
     * @returns {Array}
     */
    function map(elems, callback) {
      var ref;

      var value;
      var ret = [];

      each(elems, function (i, elem) {
        value = callback(elem, i);

        if (value !== null && value !== undefined) {
          ret.push(value);
        }
      });

      return (ref = []).concat.apply(ref, ret);
    }

    /**
     * 把对象合并到第一个参数中，并返回第一个参数
     * @param first
     * @param second
     * @returns {*}
     */
    function merge(first, second) {
      each(second, function (i, val) {
        first.push(val);
      });

      return first;
    }

    /**
     * 删除数组中重复元素
     * @param arr {Array}
     * @returns {Array}
     */
    function unique(arr) {
      var result = [];

      for (var i = 0; i < arr.length; i += 1) {
        if (result.indexOf(arr[i]) === -1) {
          result.push(arr[i]);
        }
      }

      return result;
    }

    var elementDisplay = {};

    /**
     * 获取元素的默认 display 样式值，用于 .show() 方法
     * @param nodeName
     * @returns {*}
     */
    function defaultDisplay(nodeName) {
      var element;
      var display;

      if (!elementDisplay[nodeName]) {
        element = document.createElement(nodeName);
        document.body.appendChild(element);
        display = getComputedStyle(element, '').getPropertyValue('display');
        element.parentNode.removeChild(element);
        if (display === 'none') {
          display = 'block';
        }

        elementDisplay[nodeName] = display;
      }

      return elementDisplay[nodeName];
    }

    $.extend({
      each: each,
      merge: merge,
      unique: unique,
      map: map,

      /**
       * 一个 DOM 节点是否包含另一个 DOM 节点
       * @param parent {Node} 父节点
       * @param node {Node} 子节点
       * @returns {Boolean}
       */
      contains: function contains(parent, node) {
        if (parent && !node) {
          return document.documentElement.contains(parent);
        }

        return parent !== node && parent.contains(node);
      },

      /**
       * 将数组或对象序列化
       * @param obj
       * @returns {String}
       */
      param: function param(obj) {
        if (!isObjectLike(obj)) {
          return '';
        }

        var args = [];

        function destructure(key, value) {
          var keyTmp;

          if (isObjectLike(value)) {
            each(value, function (i, v) {
              if (Array.isArray(value) && !isObjectLike(v)) {
                keyTmp = '';
              } else {
                keyTmp = i;
              }

              destructure((key + "[" + keyTmp + "]"), v);
            });
          } else {
            if (value !== null && value !== '') {
              keyTmp = "=" + (encodeURIComponent(value));
            } else {
              keyTmp = '';
            }

            args.push(encodeURIComponent(key) + keyTmp);
          }
        }

        each(obj, function (key, value) {
          destructure(key, value);
        });

        return args.join('&');
      },
    });

    $.fn.extend({
      /**
       * 遍历对象
       * @param callback {Function}
       * @return {JQ}
       */
      each: function each$1(callback) {
        return each(this, callback);
      },

      /**
       * 通过遍历集合中的节点对象，通过函数返回一个新的对象，null 或 undefined 将被过滤掉。
       * @param callback {Function}
       * @returns {JQ}
       */
      map: function map$1(callback) {
        return new JQ(map(this, function (el, i) { return callback.call(el, i, el); }));
      },

      /**
       * 获取指定 DOM 元素，没有 index 参数时，获取所有 DOM 的数组
       * @param index {Number=}
       * @returns {Node|Array}
       */
      get: function get(index) {
        return index === undefined
          ? [].slice.call(this)
          : this[index >= 0 ? index : index + this.length];
      },

      /**
       * array中提取的方法。从start开始，如果end 指出。提取不包含end位置的元素。
       * @param args {start, end}
       * @returns {JQ}
       */
      slice: function slice() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new JQ([].slice.apply(this, args));
      },

      /**
       * 筛选元素集合
       * @param selector {String|JQ|Node|Function}
       * @returns {JQ}
       */
      filter: function filter(selector) {
        if (isFunction(selector)) {
          return this.map(function (index, ele) { return (selector.call(ele, index, ele) ? ele : undefined); });
        }

        var $selector = $(selector);

        return this.map(function (index, ele) { return ($selector.index(ele) > -1 ? ele : undefined); });
      },

      /**
       * 从元素集合中删除指定的元素
       * @param selector {String|Node|JQ|Function}
       * @return {JQ}
       */
      not: function not(selector) {
        var $excludes = this.filter(selector);

        return this.map(function (index, ele) { return ($excludes.index(ele) > -1 ? undefined : ele); });
      },

      /**
       * 获取元素相对于 document 的偏移
       * @returns {Object}
       */
      offset: function offset() {
        if (this[0]) {
          var offset = this[0].getBoundingClientRect();

          return {
            left: offset.left + window.pageXOffset,
            top: offset.top + window.pageYOffset,
            width: offset.width,
            height: offset.height,
          };
        }

        return null;
      },

      /**
       * 返回最近的用于定位的父元素
       * @returns {*|JQ}
       */
      offsetParent: function offsetParent() {
        return this.map(function () {
          var parent = this.offsetParent;

          while (parent && $(parent).css('position') === 'static') {
            parent = parent.offsetParent;
          }

          return parent || document.documentElement;
        });
      },

      /**
       * 获取元素相对于父元素的偏移
       * @return {Object}
       */
      position: function position() {
        var self = this;

        if (!self[0]) {
          return null;
        }

        var offsetParent;
        var offset;
        var parentOffset = {
          top: 0,
          left: 0,
        };

        if (self.css('position') === 'fixed') {
          offset = self[0].getBoundingClientRect();
        } else {
          offsetParent = self.offsetParent();
          offset = self.offset();
          if (!isNodeName(offsetParent[0], 'html')) {
            parentOffset = offsetParent.offset();
          }

          parentOffset = {
            top: parentOffset.top + offsetParent.css('borderTopWidth'),
            left: parentOffset.left + offsetParent.css('borderLeftWidth'),
          };
        }

        return {
          top: offset.top - parentOffset.top - self.css('marginTop'),
          left: offset.left - parentOffset.left - self.css('marginLeft'),
          width: offset.width,
          height: offset.height,
        };
      },

      /**
       * 显示指定元素
       * @returns {JQ}
       */
      show: function show() {
        return this.each(function () {
          if (this.style.display === 'none') {
            this.style.display = '';
          }

          if (window.getComputedStyle(this, '').getPropertyValue('display') === 'none') {
            this.style.display = defaultDisplay(this.nodeName);
          }
        });
      },

      /**
       * 隐藏指定元素
       * @returns {JQ}
       */
      hide: function hide() {
        return this.each(function () {
          this.style.display = 'none';
        });
      },

      /**
       * 切换元素的显示状态
       * @returns {JQ}
       */
      toggle: function toggle() {
        return this.each(function () {
          this.style.display = this.style.display === 'none' ? '' : 'none';
        });
      },

      /**
       * 是否含有指定的 CSS 类
       * @param className {String}
       * @returns {boolean}
       */
      hasClass: function hasClass(className) {
        if (!this[0] || !className) {
          return false;
        }

        return this[0].classList.contains(className);
      },

      /**
       * 移除指定属性
       * @param attr {String}
       * @returns {JQ}
       */
      removeAttr: function removeAttr(attr) {
        return this.each(function () {
          this.removeAttribute(attr);
        });
      },

      /**
       * 删除属性值
       * @param name {String}
       * @returns {JQ}
       */
      removeProp: function removeProp(name) {
        return this.each(function () {
          try {
            delete this[name];
          } catch (e) {
            // empty
          }
        });
      },

      /**
       * 获取当前对象中第n个元素
       * @param index {Number}
       * @returns {JQ}
       */
      eq: function eq(index) {
        var ret = index === -1
          ? this.slice(index)
          : this.slice(index, +index + 1);

        return new JQ(ret);
      },

      /**
       * 获取对象中第一个元素
       * @returns {JQ}
       */
      first: function first() {
        return this.eq(0);
      },

      /**
       * 获取对象中最后一个元素
       * @returns {JQ}
       */
      last: function last() {
        return this.eq(-1);
      },

      /**
       * 获取一个元素的位置。
       * 当 elem 参数没有给出时，返回当前元素在兄弟节点中的位置。
       * 有给出了 elem 参数时，返回 elem 元素在当前对象中的位置
       * @param elem {Selector|Node=}
       * @returns {Number}
       */
      index: function index(elem) {
        if (!elem) {
          // 获取当前 JQ 对象的第一个元素在同辈元素中的位置
          return this
            .eq(0)
            .parent()
            .children()
            .get()
            .indexOf(this[0]);
        }

        if (isString(elem)) {
          // 返回当前 JQ 对象的第一个元素在指定选择器对应的元素中的位置
          return $(elem)
            .eq(0)
            .parent()
            .children()
            .get()
            .indexOf(this[0]);
        }

        // 返回指定元素在当前 JQ 对象中的位置
        return this
          .get()
          .indexOf(elem);
      },

      /**
       * 根据选择器、DOM元素或 JQ 对象来检测匹配元素集合，
       * 如果其中至少有一个元素符合这个给定的表达式就返回true
       * @param selector {String|Node|NodeList|Array|JQ|Window}
       * @returns boolean
       */
      is: function is(selector) {
        var self = this[0];

        if (!self || selector === undefined || selector === null) {
          return false;
        }

        if (isString(selector)) {
          if (self === document || self === window) {
            return false;
          }

          var matchesSelector = self.matches
            || self.matchesSelector
            || self.webkitMatchesSelector
            || self.mozMatchesSelector
            || self.oMatchesSelector
            || self.msMatchesSelector;

          return matchesSelector.call(self, selector);
        }

        if (selector === document || selector === window) {
          return self === selector;
        }

        if (selector.nodeType || isArrayLike(selector)) {
          var $compareWith = selector.nodeType ? [selector] : selector;

          for (var i = 0; i < $compareWith.length; i += 1) {
            if ($compareWith[i] === self) {
              return true;
            }
          }

          return false;
        }

        return false;
      },

      /**
       * 根据 CSS 选择器找到后代节点的集合
       * @param selector {String}
       * @returns {JQ}
       */
      find: function find(selector) {
        var foundElements = [];

        this.each(function (i, _this) {
          var nodeType = _this.nodeType;

          if (nodeType !== 1 && nodeType !== 9) {
            // 不是 element 和 document 则跳过
            return;
          }

          merge(foundElements, _this.querySelectorAll(selector));
        });

        return new JQ(foundElements);
      },

      /**
       * 找到直接子元素的元素集合
       * @param selector {String=}
       * @returns {JQ}
       */
      children: function children(selector) {
        var children = [];

        this.each(function (_, _this) {
          each(_this.childNodes, function (__, childNode) {
            if (childNode.nodeType !== 1) {
              return;
            }

            if (!selector || (selector && $(childNode).is(selector))) {
              children.push(childNode);
            }
          });
        });

        return new JQ(unique(children));
      },

      /**
       * 保留含有指定子元素的元素，去掉不含有指定子元素的元素
       * @param selector {String|Node|JQ|NodeList|Array}
       * @return {JQ}
       */
      has: function has(selector) {
        var $targets = isString(selector) ? this.find(selector) : $(selector);
        var length = $targets.length;

        return this.filter(function () {
          for (var i = 0; i < length; i += 1) {
            if ($.contains(this, $targets[i])) {
              return true;
            }
          }

          return false;
        });
      },

      /**
       * 取得同辈元素的集合
       * @param selector {String=}
       * @returns {JQ}
       */
      siblings: function siblings(selector) {
        return this.prevAll(selector).add(this.nextAll(selector));
      },

      /**
       * 返回首先匹配到的父节点，包含父节点
       * @param selector {String}
       * @returns {JQ}
       */
      closest: function closest(selector) {
        var self = this;

        if (!self.is(selector)) {
          self = self.parents(selector).eq(0);
        }

        return self;
      },

      /**
       * 删除所有匹配的元素
       * @returns {JQ}
       */
      remove: function remove() {
        return this.each(function (i, _this) {
          if (_this.parentNode) {
            _this.parentNode.removeChild(_this);
          }
        });
      },

      /**
       * 添加匹配的元素到当前对象中
       * @param selector {String|JQ}
       * @returns {JQ}
       */
      add: function add(selector) {
        return new JQ(unique(merge(this.get(), $(selector))));
      },

      /**
       * 删除子节点
       * @returns {JQ}
       */
      empty: function empty() {
        return this.each(function () {
          this.innerHTML = '';
        });
      },

      /**
       * 通过深度克隆来复制集合中的所有元素。
       * (通过原生 cloneNode 方法深度克隆来复制集合中的所有元素。此方法不会有数据和事件处理程序复制到新的元素。这点和jquery中利用一个参数来确定是否复制数据和事件处理不相同。)
       * @returns {JQ}
       */
      clone: function clone() {
        return this.map(function () {
          return this.cloneNode(true);
        });
      },

      /**
       * 用新元素替换当前元素
       * @param newContent {String|Node|NodeList|JQ}
       * @returns {JQ}
       */
      replaceWith: function replaceWith(newContent) {
        return this.before(newContent).remove();
      },

      /**
       * 将表单元素的值组合成键值对数组
       * @returns {Array}
       */
      serializeArray: function serializeArray() {
        var result = [];
        var elem = this[0];

        if (!elem || !elem.elements) {
          return result;
        }

        $([].slice.call(elem.elements)).each(function () {
          var $elem = $(this);
          var type = $elem.attr('type');
          if (
            this.nodeName.toLowerCase() !== 'fieldset'
            && !this.disabled
            && ['submit', 'reset', 'button'].indexOf(type) === -1
            && (['radio', 'checkbox'].indexOf(type) === -1 || this.checked)
          ) {
            result.push({
              name: $elem.attr('name'),
              value: $elem.val(),
            });
          }
        });

        return result;
      },

      /**
       * 将表单元素或对象序列化
       * @returns {String}
       */
      serialize: function serialize() {
        var result = [];

        each(this.serializeArray(), function (i, elem) {
          result.push(((encodeURIComponent(elem.name)) + "=" + (encodeURIComponent(elem.value))));
        });

        return result.join('&');
      },
    });

    /**
     * val - 获取或设置元素的值
     * @param value {String=}
     * @return {*|JQ}
     */
    /**
     * html - 获取或设置元素的 HTML
     * @param value {String=}
     * @return {*|JQ}
     */
    /**
     * text - 获取或设置元素的内容
     * @param value {String=}
     * @return {*|JQ}
     */
    each(['val', 'html', 'text'], function (nameIndex, name) {
      var props = {
        0: 'value',
        1: 'innerHTML',
        2: 'textContent',
      };

      var defaults = {
        0: undefined,
        1: undefined,
        2: null,
      };

      $.fn[name] = function (value) {
        if (value === undefined) {
          // 获取值
          return this[0] ? this[0][props[nameIndex]] : defaults[nameIndex];
        }

        // 设置值
        return this.each(function (i, elem) {
          elem[props[nameIndex]] = value;
        });
      };
    });

    /**
     * attr - 获取或设置元素的属性值
     * @param {name|props|key,value=}
     * @return {String|JQ}
     */
    /**
     * prop - 获取或设置元素的属性值
     * @param {name|props|key,value=}
     * @return {String|JQ}
     */
    /**
     * css - 获取或设置元素的样式
     * @param {name|props|key,value=}
     * @return {String|JQ}
     */
    each(['attr', 'prop', 'css'], function (nameIndex, name) {
      function set(elem, key, value) {
        if (nameIndex === 0) {
          elem.setAttribute(key, value);
        } else if (nameIndex === 1) {
          elem[key] = value;
        } else {
          elem.style[key] = value;
        }
      }

      function get(elem, key) {
        if (!elem) {
          return undefined;
        }

        if (nameIndex === 0) {
          return elem.getAttribute(key);
        }

        if (nameIndex === 1) {
          return elem[key];
        }

        return window.getComputedStyle(elem, null).getPropertyValue(key);
      }

      $.fn[name] = function (key, value) {
        var argLength = arguments.length;

        if (argLength === 1 && isString(key)) {
          // 获取值
          return get(this[0], key);
        }

        // 设置值
        return this.each(function (i, elem) {
          if (argLength === 2) {
            set(elem, key, value);
          } else {
            each(key, function (k, v) {
              set(elem, k, v);
            });
          }
        });
      };
    });

    /**
     * addClass - 添加 CSS 类，多个类名用空格分割
     * @param className {String}
     * @return {JQ}
     */
    /**
     * removeClass - 移除 CSS 类，多个类名用空格分割
     * @param className {String}
     * @return {JQ}
     */
    /**
     * toggleClass - 切换 CSS 类名，多个类名用空格分割
     * @param className {String}
     * @return {JQ}
     */
    each(['add', 'remove', 'toggle'], function (nameIndex, name) {
      $.fn[(name + "Class")] = function (className) {
        if (!className) {
          return this;
        }

        var classes = className.split(' ');

        return this.each(function (i, elem) {
          each(classes, function (j, cls) {
            elem.classList[name](cls);
          });
        });
      };
    });

    /**
     * width - 获取元素的宽度
     * @return {Number}
     */
    /**
     * height - 获取元素的高度
     * @return {Number}
     */
    each({
      Width: 'width',
      Height: 'height',
    }, function (prop, name) {
      $.fn[name] = function (val) {
        if (val === undefined) {
          // 获取
          var elem = this[0];

          if (isWindow(elem)) {
            return elem[("inner" + prop)];
          }

          if (isDocument(elem)) {
            return elem.documentElement[("scroll" + prop)];
          }

          var $elem = $(elem);

          // IE10、IE11 在 box-sizing:border-box 时，不会包含 padding 和 border，这里进行修复
          var IEFixValue = 0;
          var isWidth = name === 'width';
          if ('ActiveXObject' in window) { // 判断是 IE 浏览器
            if ($elem.css('box-sizing') === 'border-box') {
              IEFixValue = parseFloat($elem.css(("padding-" + (isWidth ? 'left' : 'top'))))
                + parseFloat($elem.css(("padding-" + ((isWidth ? 'right' : 'bottom')))))
                + parseFloat($elem.css(("border-" + (isWidth ? 'left' : 'top') + "-width")))
                + parseFloat($elem.css(("border-" + (isWidth ? 'right' : 'bottom') + "-width")));
            }
          }

          return parseFloat($(elem).css(name)) + IEFixValue;
        }

        // 设置
        /* eslint no-restricted-globals: 0 */
        if (!isNaN(Number(val)) && val !== '') {
          val += 'px';
        }

        return this.css(name, val);
      };
    });

    /**
     * innerWidth - 获取元素的宽度，包含内边距
     * @return {Number}
     */
    /**
     * innerHeight - 获取元素的高度，包含内边距
     * @return {Number}
     */
    each({
      Width: 'width',
      Height: 'height',
    }, function (prop, name) {
      $.fn[("inner" + prop)] = function () {
        var value = this[name]();
        var $elem = $(this[0]);

        if ($elem.css('box-sizing') !== 'border-box') {
          value += parseFloat($elem.css(("padding-" + (name === 'width' ? 'left' : 'top'))));
          value += parseFloat($elem.css(("padding-" + (name === 'width' ? 'right' : 'bottom'))));
        }

        return value;
      };
    });

    function dir(nodes, selector, nameIndex, node) {
      var ret = [];
      var elem;

      nodes.each(function (j, _this) {
        elem = _this[node];
        while (elem) {
          if (nameIndex === 2) {
            // prevUntil
            if (!selector || (selector && $(elem).is(selector))) {
              break;
            }

            ret.push(elem);
          } else if (nameIndex === 0) {
            // prev
            if (!selector || (selector && $(elem).is(selector))) {
              ret.push(elem);
            }

            break;
          } else if (!selector || (selector && $(elem).is(selector))) {
            // prevAll
            ret.push(elem);
          }

          elem = elem[node];
        }
      });

      return new JQ(unique(ret));
    }

    /**
     * prev - 取得前一个匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * prevAll - 取得前面所有匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * prevUntil - 取得前面的所有元素，直到遇到匹配的元素，不包含匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    each(['', 'All', 'Until'], function (nameIndex, name) {
      $.fn[("prev" + name)] = function (selector) {
        // prevAll、prevUntil 需要把元素的顺序倒序处理，以便和 jQuery 的结果一致
        var $nodes = nameIndex === 0 ? this : $(this.get().reverse());

        return dir($nodes, selector, nameIndex, 'previousElementSibling');
      };
    });

    /**
     * next - 取得后一个匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * nextAll - 取得后面所有匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * nextUntil - 取得后面所有匹配的元素，直到遇到匹配的元素，不包含匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    each(['', 'All', 'Until'], function (nameIndex, name) {
      $.fn[("next" + name)] = function (selector) {
        return dir(this, selector, nameIndex, 'nextElementSibling');
      };
    });

    /**
     * parent - 取得匹配的直接父元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * parents - 取得所有匹配的父元素
     * @param selector {String=}
     * @return {JQ}
     */
    /**
     * parentUntil - 取得所有的父元素，直到遇到匹配的元素，不包含匹配的元素
     * @param selector {String=}
     * @return {JQ}
     */
    each(['', 's', 'sUntil'], function (nameIndex, name) {
      $.fn[("parent" + name)] = function (selector) {
        // parents、parentsUntil 需要把元素的顺序反向处理，以便和 jQuery 的结果一致
        var $nodes = nameIndex === 0 ? this : $(this.get().reverse());

        return dir($nodes, selector, nameIndex, 'parentNode');
      };
    });

    /**
     * append - 在元素内部追加内容
     * @param newChild {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * prepend - 在元素内部前置内容
     * @param newChild {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    each(['append', 'prepend'], function (nameIndex, name) {
      $.fn[name] = function (newChild) {
        var newChilds;
        var copyByClone = this.length > 1;

        if (isString(newChild) && (newChild[0] !== '<' || newChild[newChild.length - 1] !== '>')) {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          newChilds = [].slice.call(tempDiv.childNodes);
        } else {
          newChilds = $(newChild).get();
        }

        if (nameIndex === 1) {
          // prepend
          newChilds.reverse();
        }

        return this.each(function (i, _this) {
          each(newChilds, function (j, child) {
            // 一个元素要同时追加到多个元素中，需要先复制一份，然后追加
            if (copyByClone && i > 0) {
              child = child.cloneNode(true);
            }

            if (nameIndex === 0) {
              // append
              _this.appendChild(child);
            } else {
              // prepend
              _this.insertBefore(child, _this.childNodes[0]);
            }
          });
        });
      };
    });

    /**
     * insertBefore - 插入到指定元素的前面
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * insertAfter - 插入到指定元素的后面
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    each(['insertBefore', 'insertAfter'], function (nameIndex, name) {
      $.fn[name] = function (selector) {
        var $elem = $(selector);

        return this.each(function (i, _this) {
          $elem.each(function (j, elem) {
            elem.parentNode.insertBefore(
              $elem.length === 1 ? _this : _this.cloneNode(true),
              nameIndex === 0 ? elem : elem.nextSibling
            );
          });
        });
      };
    });

    /**
     * appendTo - 追加到指定元素内容
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * prependTo - 前置到指定元素内部
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * before - 插入到指定元素前面
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * after - 插入到指定元素后面
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    /**
     * replaceAll - 替换掉指定元素
     * @param selector {String|Node|NodeList|JQ}
     * @return {JQ}
     */
    each({
      appendTo: 'append',
      prependTo: 'prepend',
      before: 'insertBefore',
      after: 'insertAfter',
      replaceAll: 'replaceWith',
    }, function (name, original) {
      $.fn[name] = function (selector) {
        $(selector)[original](this);
        return this;
      };
    });

    var dataNS = 'mduiElementDataStorage';

    $.extend({
      /**
       * 在指定元素上存储数据，或从指定元素上读取数据
       * @param elem 必须， DOM 元素
       * @param key 必须，键名
       * @param value 可选，值
       */
      data: function data(elem, key, value) {
        var data = {};

        if (value !== undefined) {
          // 根据 key、value 设置值
          data[key] = value;
        } else if (isObjectLike(key)) {
          // 根据键值对设置值
          data = key;
        } else if (key === undefined) {
          // 获取所有值
          var result = {};

          each(elem.attributes, function (i, attribute) {
            var name = attribute.name;

            if (name.indexOf('data-') === 0) {
              var prop = name.slice(5).replace(/-./g, function (u) { return u.charAt(1).toUpperCase(); });

              result[prop] = attribute.value;
            }
          });

          if (elem[dataNS]) {
            each(elem[dataNS], function (k, v) {
              result[k] = v;
            });
          }

          return result;
        } else if (elem[dataNS] && (key in elem[dataNS])) {
          // 获取指定值
          return elem[dataNS][key];
        } else {
          // 从 data- 中获取指定值
          var dataKey = elem.getAttribute(("data-" + key));

          if (dataKey) {
            return dataKey;
          }

          return undefined;
        }

        // 设置值
        if (!elem[dataNS]) {
          elem[dataNS] = {};
        }

        each(data, function (k, v) {
          elem[dataNS][k] = v;
        });

        return undefined;
      },

      /**
       * 移除指定元素上存放的数据
       * @param elem 必须，DOM 元素
       * @param key 必须，键名
       */
      removeData: function removeData(elem, key) {
        if (elem[dataNS] && elem[dataNS][key]) {
          elem[dataNS][key] = null;
          delete elem[dataNS][key];
        }
      },
    });

    $.fn.extend({
      /**
       * 在元素上读取或设置数据
       * @param key 必须
       * @param value
       * @returns {*}
       */
      data: function data(key, value) {
        if (value === undefined) {
          if (isObjectLike(key)) {
            // 同时设置多个值
            return this.each(function (i, elem) {
              $.data(elem, key);
            });
          }

          if (this[0]) {
            // 获取值
            return $.data(this[0], key);
          }

          return undefined;
        }

        // 设置值
        return this.each(function (i, elem) {
          $.data(elem, key, value);
        });
      },

      /**
       * 移除元素上存储的数据
       * @param key 必须
       * @returns {*}
       */
      removeData: function removeData(key) {
        return this.each(function (i, elem) {
          $.removeData(elem, key);
        });
      },
    });

    !function(){try{return new e("test")}catch(e){}var e=function(e,t){t=t||{bubbles:!1,cancelable:!1};var n=document.createEvent("MouseEvent");return n.initMouseEvent(e,t.bubbles,t.cancelable,window,0,0,0,0,0,!1,!1,!1,!1,0,null),n};e.prototype=Event.prototype,window.MouseEvent=e;}();

    !function(){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}"function"!=typeof window.CustomEvent&&(t.prototype=window.Event.prototype,window.CustomEvent=t);}();

    // 存储事件
    var handlers = {
      // i: { // 元素ID
      //   j: { // 事件ID
      //     e: 事件名
      //     fn: 事件处理函数
      //     i: 事件ID
      //     proxy:
      //     sel: 选择器
      //   }
      // }
    };

    // 元素ID
    var mduiElementId = 1;

    function fnFalse() {
      return false;
    }

    /**
     * 为元素赋予一个唯一的ID
     * @param element
     * @returns {number|*}
     */
    function getElementId(element) {
      if (!element.mduiElementId) {
        mduiElementId += 1;
        element.mduiElementId = mduiElementId;
      }

      return element.mduiElementId;
    }

    /**
     * 获取匹配的事件
     * @param element
     * @param eventName
     * @param func
     * @param selector
     * @returns {Array}
     */
    function getHandlers(element, eventName, func, selector) {
      return (handlers[getElementId(element)] || []).filter(function (handler) { return handler
        && (!eventName || handler.e === eventName)
        && (!func || handler.fn.toString() === func.toString())
        && (!selector || handler.sel === selector); });
    }

    /**
     * 添加事件监听
     * @param element
     * @param eventName
     * @param func
     * @param data
     * @param selector
     */
    function add(element, eventName, func, data, selector) {
      var elementId = getElementId(element);

      if (!handlers[elementId]) {
        handlers[elementId] = [];
      }

      // 传入 data.useCapture 来设置 useCapture: true
      var useCapture = false;
      if (isObjectLike(data) && data.useCapture) {
        useCapture = true;
      }

      eventName.split(' ').forEach(function (event) {
        var handler = {
          e: event,
          fn: func,
          sel: selector,
          i: handlers[elementId].length,
        };

        function callFn(e, elem) {
          // 因为鼠标事件模拟事件的 detail 属性是只读的，因此在 e._detail 中存储参数
          /* eslint no-underscore-dangle: 0 */
          var result = func.apply(elem, e._detail === undefined ? [e] : [e].concat(e._detail));

          if (result === false) {
            e.preventDefault();
            e.stopPropagation();
          }
        }

        function proxyfn(e) {
          e._data = data;

          if (selector) {
            // 事件代理
            $(element)
              .find(selector)
              .get()
              .reverse()
              .forEach(function (elem) {
                if (elem === e.target || $.contains(elem, e.target)) {
                  callFn(e, elem);
                }
              });
          } else {
            // 不使用事件代理
            callFn(e, element);
          }
        }

        handler.proxy = proxyfn;
        handlers[elementId].push(handler);
        element.addEventListener(handler.e, proxyfn, useCapture);
      });
    }

    /**
     * 移除事件监听
     * @param element
     * @param eventName
     * @param func
     * @param selector
     */
    function remove(element, eventName, func, selector) {
      (eventName || '').split(' ').forEach(function (event) {
        getHandlers(element, event, func, selector).forEach(function (handler) {
          delete handlers[getElementId(element)][handler.i];
          element.removeEventListener(handler.e, handler.proxy, false);
        });
      });
    }

    $.fn.extend({
      /**
       * DOM 加载完毕后调用的函数
       * @param callback
       * @returns {ready}
       */
      ready: function ready(callback) {
        if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
          callback($);
        } else {
          document.addEventListener('DOMContentLoaded', function () {
            callback($);
          }, false);
        }

        return this;
      },

      /**
       * 绑定事件
       *
       * $().on({eventName: fn}, selector, data);
       * $().on({eventName: fn}, selector)
       * $().on({eventName: fn})
       * $().on(eventName, selector, data, fn);
       * $().on(eventName, selector, fn);
       * $().on(eventName, data, fn);
       * $().on(eventName, fn);
       * $().on(eventName, false);
       *
       * @param eventName
       * @param selector
       * @param data
       * @param callback
       * @param one 是否是 one 方法，只在 JQ 内部使用
       * @returns
       */
      on: function on(eventName, selector, data, callback, one) {
        var self = this;

        // 默认
        // $().on(event, selector, data, callback)

        // event 使用 事件:函数 键值对
        // event = {
        //   'event1': callback1,
        //   'event2': callback2
        // }
        //
        // $().on(event, selector, data)
        if (eventName && !isString(eventName)) {
          each(eventName, function (type, fn) {
            self.on(type, selector, data, fn);
          });

          return self;
        }

        // selector 不存在
        // $().on(event, data, callback)
        if (!isString(selector) && !isFunction(callback) && callback !== false) {
          callback = data;
          data = selector;
          selector = undefined;
        }

        // data 不存在
        // $().on(event, callback)
        if (isFunction(data) || data === false) {
          callback = data;
          data = undefined;
        }

        // callback 为 false
        // $().on(event, false)
        if (callback === false) {
          callback = fnFalse;
        }

        if (one === 1) {
          var origCallback = callback;
          callback = function () {
            self.off(eventName, selector, callback);
            /* eslint prefer-rest-params: 0 */
            return origCallback.apply(this, arguments);
          };
        }

        return this.each(function () {
          add(this, eventName, callback, data, selector);
        });
      },

      /**
       * 绑定事件，只触发一次
       * @param eventName
       * @param selector
       * @param data
       * @param callback
       */
      one: function one(eventName, selector, data, callback) {
        var self = this;

        if (!isString(eventName)) {
          each(eventName, function (type, fn) {
            type.split(' ').forEach(function (eName) {
              self.on(eName, selector, data, fn, 1);
            });
          });
        } else {
          eventName.split(' ').forEach(function (eName) {
            self.on(eName, selector, data, callback, 1);
          });
        }

        return this;
      },

      /**
       * 取消绑定事件
       *
       * $().off(eventName, selector);
       * $().off(eventName, callback);
       * $().off(eventName, false);
       *
       */
      off: function off(eventName, selector, callback) {
        var self = this;

        // event 使用 事件:函数 键值对
        // event = {
        //   'event1': callback1,
        //   'event2': callback2
        // }
        //
        // $().off(event, selector)
        if (eventName && !isString(eventName)) {
          each(eventName, function (type, fn) {
            self.off(type, selector, fn);
          });

          return self;
        }

        // selector 不存在
        // $().off(event, callback)
        if (!isString(selector) && !isFunction(callback) && callback !== false) {
          callback = selector;
          selector = undefined;
        }

        // callback 为 false
        // $().off(event, false)
        if (callback === false) {
          callback = fnFalse;
        }

        return self.each(function () {
          remove(this, eventName, callback, selector);
        });
      },

      /**
       * 触发一个事件
       * @param eventName
       * @param data
       * @returns {*|JQ}
       */
      trigger: function trigger(eventName, data) {
        var isMouseEvent = ['click', 'mousedown', 'mouseup', 'mousemove'].indexOf(eventName) > -1;
        var evt;

        if (isMouseEvent) {
          // Note: MouseEvent 无法传入 detail 参数
          evt = new MouseEvent(eventName, {
            bubbles: true,
            cancelable: true,
          });
        } else {
          evt = new CustomEvent(eventName, {
            detail: data,
            bubbles: true,
            cancelable: true,
          });
        }

        evt._detail = data;

        return this.each(function () {
          this.dispatchEvent(evt);
        });
      },
    });

    var globalOptions = {};
    var jsonpID = 0;

    // 全局事件名
    var ajaxEvent = {
      ajaxStart: 'start.mdui.ajax',
      ajaxSuccess: 'success.mdui.ajax',
      ajaxError: 'error.mdui.ajax',
      ajaxComplete: 'complete.mdui.ajax',
    };

    /**
     * 判断此请求方法是否通过查询字符串提交参数
     * @param method 请求方法，大写
     * @returns {boolean}
     */
    function isQueryStringData(method) {
      return ['GET', 'HEAD'].indexOf(method) >= 0;
    }

    /**
     * 添加参数到 URL 上，且 URL 中不存在 ? 时，自动把第一个 & 替换为 ?
     * @param url
     * @param query 参数 key=value
     * @returns {string}
     */
    function appendQuery(url, query) {
      return ((url + "&" + query)).replace(/[&?]{1,2}/, '?');
    }

    $.extend({

      /**
       * 为 ajax 请求设置全局配置参数
       * @param options
       */
      ajaxSetup: function ajaxSetup(options) {
        $.extend(globalOptions, options || {});
      },

      /**
       * 发送 ajax 请求
       * @param options
       */
      ajax: function ajax(options) {
        // 配置参数
        var defaults = {
          // 请求方式
          method: 'GET',
          // 请求的数据，查询字符串或对象
          data: false,
          // 是否把数据转换为查询字符串发送，为 false 时不进行自动转换。
          processData: true,
          // 是否为异步请求
          async: true,
          // 是否从缓存中读取，只对 GET/HEAD 请求有效，dataType 为 jsonp 时为 false
          cache: true,
          // HTTP 访问认证的用户名
          username: '',
          // HTTP 访问认证的密码
          password: '',
          // 一个键值对，随着请求一起发送
          headers: {},
          // 设置 XHR 对象
          xhrFields: {},
          // 一个 HTTP 代码和函数的对象
          statusCode: {},
          // 预期服务器返回的数据类型 text、json、jsonp
          dataType: 'text',
          // jsonp 请求的回调函数名称
          jsonp: 'callback',
          // （string 或 Function）使用指定的回调函数名代替自动生成的回调函数名
          jsonpCallback: function () {
            jsonpID += 1;

            return ("mduijsonp_" + (Date.now()) + "_" + jsonpID);
          },
          // 发送信息至服务器时内容编码类型
          contentType: 'application/x-www-form-urlencoded',
          // 设置请求超时时间（毫秒）
          timeout: 0,
          // 是否在 document 上触发全局 ajax 事件
          global: true,
          // beforeSend:    function (XMLHttpRequest) 请求发送前执行，返回 false 可取消本次 ajax 请求
          // success:       function (data, textStatus, XMLHttpRequest) 请求成功时调用
          // error:         function (XMLHttpRequest, textStatus) 请求失败时调用
          // statusCode:    {404: function ()}
          //                200-299之间的状态码表示成功，参数和 success 回调一样；其他状态码表示失败，参数和 error 回调一样
          // complete:      function (XMLHttpRequest, textStatus) 请求完成后回调函数 (请求成功或失败之后均调用)
        };

        // 回调函数
        var callbacks = [
          'beforeSend',
          'success',
          'error',
          'statusCode',
          'complete' ];

        // 是否已取消请求
        var isCanceled = false;

        // 保存全局配置
        var globals = globalOptions;

        // 事件参数
        var eventParams = {};

        // 合并全局参数到默认参数，全局回调函数不覆盖
        each(globals, function (key, value) {
          if (callbacks.indexOf(key) < 0) {
            defaults[key] = value;
          }
        });

        // 参数合并
        options = $.extend({}, defaults, options);

        /**
         * 触发全局事件
         * @param event string 事件名
         * @param xhr XMLHttpRequest 事件参数
         */
        function triggerEvent(event, xhr) {
          if (options.global) {
            $(document).trigger(event, xhr);
          }
        }

        /**
         * 触发 XHR 回调和事件
         * @param callback string 回调函数名称
         * @param args
         */
        function triggerCallback(callback) {
          var args = [], len = arguments.length - 1;
          while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

          var result1;
          var result2;

          if (callback) {
            // 全局回调
            if (callback in globals) {
              result1 = globals[callback].apply(globals, args);
            }

            // 自定义回调
            if (options[callback]) {
              result2 = options[callback].apply(options, args);
            }

            // beforeSend 回调返回 false 时取消 ajax 请求
            if (callback === 'beforeSend' && (result1 === false || result2 === false)) {
              isCanceled = true;
            }
          }
        }

        // 请求方式转为大写
        var method = options.method.toUpperCase();

        // 默认使用当前页面 URL
        if (!options.url) {
          options.url = window.location.toString();
        }

        // 需要发送的数据
        // GET/HEAD 请求和 processData 为 true 时，转换为查询字符串格式，特殊格式不转换
        var sendData;
        if (
          (isQueryStringData(method) || options.processData)
          && options.data
          && [ArrayBuffer, Blob, Document, FormData].indexOf(options.data.constructor) < 0
        ) {
          sendData = isString(options.data) ? options.data : $.param(options.data);
        } else {
          sendData = options.data;
        }

        // 对于 GET、HEAD 类型的请求，把 data 数据添加到 URL 中
        if (isQueryStringData(method) && sendData) {
          // 查询字符串拼接到 URL 中
          options.url = appendQuery(options.url, sendData);
          sendData = null;
        }

        // JSONP
        if (options.dataType === 'jsonp') {
          // URL 中添加自动生成的回调函数名
          var callbackName = isFunction(options.jsonpCallback)
            ? options.jsonpCallback()
            : options.jsonpCallback;
          var requestUrl = appendQuery(options.url, ((options.jsonp) + "=" + callbackName));

          eventParams.options = options;

          triggerEvent(ajaxEvent.ajaxStart, eventParams);
          triggerCallback('beforeSend', null);

          if (isCanceled) {
            return undefined;
          }

          var abortTimeout;

          // 创建 script
          var script = document.createElement('script');
          script.type = 'text/javascript';

          // 创建 script 失败
          script.onerror = function () {
            if (abortTimeout) {
              clearTimeout(abortTimeout);
            }

            triggerEvent(ajaxEvent.ajaxError, eventParams);
            triggerCallback('error', null, 'scripterror');

            triggerEvent(ajaxEvent.ajaxComplete, eventParams);
            triggerCallback('complete', null, 'scripterror');
          };

          script.src = requestUrl;

          // 处理
          window[callbackName] = function (data) {
            if (abortTimeout) {
              clearTimeout(abortTimeout);
            }

            eventParams.data = data;

            triggerEvent(ajaxEvent.ajaxSuccess, eventParams);
            triggerCallback('success', data, 'success', null);

            $(script).remove();
            script = null;
            delete window[callbackName];
          };

          $('head').append(script);

          if (options.timeout > 0) {
            abortTimeout = setTimeout(function () {
              $(script).remove();
              script = null;

              triggerEvent(ajaxEvent.ajaxError, eventParams);
              triggerCallback('error', null, 'timeout');
            }, options.timeout);
          }

          return undefined;
        }

        // GET/HEAD 请求的缓存处理
        if (isQueryStringData(method) && !options.cache) {
          options.url = appendQuery(options.url, ("_=" + (Date.now())));
        }

        // 创建 XHR
        var xhr = new XMLHttpRequest();

        xhr.open(method, options.url, options.async, options.username, options.password);

        if (
          options.contentType
          || (
            sendData
            && !isQueryStringData(method)
            && options.contentType !== false
          )
        ) {
          xhr.setRequestHeader('Content-Type', options.contentType);
        }

        // 设置 Accept
        if (options.dataType === 'json') {
          xhr.setRequestHeader('Accept', 'application/json, text/javascript');
        }

        // 添加 headers
        if (options.headers) {
          each(options.headers, function (key, value) {
            xhr.setRequestHeader(key, value);
          });
        }

        // 检查是否是跨域请求
        if (options.crossDomain === undefined) {
          options.crossDomain = /^([\w-]+:)?\/\/([^/]+)/.test(options.url)
            && RegExp.$2 !== window.location.host;
        }

        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }

        if (options.xhrFields) {
          each(options.xhrFields, function (key, value) {
            xhr[key] = value;
          });
        }

        eventParams.xhr = xhr;
        eventParams.options = options;

        var xhrTimeout;

        xhr.onload = function () {
          if (xhrTimeout) {
            clearTimeout(xhrTimeout);
          }

          // 包含成功或错误代码的字符串
          var textStatus;

          // AJAX 返回的 HTTP 响应码是否表示成功
          var isHttpStatusSuccess = (xhr.status >= 200 && xhr.status < 300) || xhr.status === 0;

          var responseData;

          if (isHttpStatusSuccess) {
            if (xhr.status === 204 || method === 'HEAD') {
              textStatus = 'nocontent';
            } else if (xhr.status === 304) {
              textStatus = 'notmodified';
            } else {
              textStatus = 'success';
            }

            if (options.dataType === 'json') {
              try {
                responseData = JSON.parse(xhr.responseText);
                eventParams.data = responseData;
              } catch (err) {
                textStatus = 'parsererror';

                triggerEvent(ajaxEvent.ajaxError, eventParams);
                triggerCallback('error', xhr, textStatus);
              }

              if (textStatus !== 'parsererror') {
                triggerEvent(ajaxEvent.ajaxSuccess, eventParams);
                triggerCallback('success', responseData, textStatus, xhr);
              }
            } else {
              responseData = xhr.responseType === 'text' || xhr.responseType === ''
                ? xhr.responseText
                : xhr.response;
              eventParams.data = responseData;

              triggerEvent(ajaxEvent.ajaxSuccess, eventParams);
              triggerCallback('success', responseData, textStatus, xhr);
            }
          } else {
            textStatus = 'error';

            triggerEvent(ajaxEvent.ajaxError, eventParams);
            triggerCallback('error', xhr, textStatus);
          }

          // statusCode
          each([globals.statusCode, options.statusCode], function (i, func) {
            if (func && func[xhr.status]) {
              if (isHttpStatusSuccess) {
                func[xhr.status](responseData, textStatus, xhr);
              } else {
                func[xhr.status](xhr, textStatus);
              }
            }
          });

          triggerEvent(ajaxEvent.ajaxComplete, eventParams);
          triggerCallback('complete', xhr, textStatus);
        };

        xhr.onerror = function () {
          if (xhrTimeout) {
            clearTimeout(xhrTimeout);
          }

          triggerEvent(ajaxEvent.ajaxError, eventParams);
          triggerCallback('error', xhr, xhr.statusText);

          triggerEvent(ajaxEvent.ajaxComplete, eventParams);
          triggerCallback('complete', xhr, 'error');
        };

        xhr.onabort = function () {
          var textStatus = 'abort';

          if (xhrTimeout) {
            textStatus = 'timeout';
            clearTimeout(xhrTimeout);
          }

          triggerEvent(ajaxEvent.ajaxError, eventParams);
          triggerCallback('error', xhr, textStatus);

          triggerEvent(ajaxEvent.ajaxComplete, eventParams);
          triggerCallback('complete', xhr, textStatus);
        };

        // ajax start 回调
        triggerEvent(ajaxEvent.ajaxStart, eventParams);
        triggerCallback('beforeSend', xhr);

        if (isCanceled) {
          return xhr;
        }

        // Timeout
        if (options.timeout > 0) {
          xhrTimeout = setTimeout(function () {
            xhr.abort();
          }, options.timeout);
        }

        // 发送 XHR
        xhr.send(sendData);

        return xhr;
      },
    });

    // 监听全局事件
    //
    // 通过 $(document).on('success.mdui.ajax', function (event, params) {}) 调用时，包含两个参数
    // event: 事件对象
    // params: {
    //   xhr: XMLHttpRequest 对象
    //   options: ajax 请求的配置参数
    //   data: ajax 请求返回的数据
    // }

    // 全局 Ajax 事件快捷方法
    // $(document).ajaxStart(function (event, xhr, options) {})
    // $(document).ajaxSuccess(function (event, xhr, options, data) {})
    // $(document).ajaxError(function (event, xhr, options) {})
    // $(document).ajaxComplete(function (event, xhr, options) {})
    each(ajaxEvent, function (name, eventName) {
      $.fn[name] = function (fn) {
        return this.on(eventName, function (e, params) {
          fn(e, params.xhr, params.options, params.data);
        });
      };
    });

    return $;

  }());


  /**
   * =============================================================================
   * ************   定义全局变量   ************
   * =============================================================================
   */

  var $document = $(document);
  var $window = $(window);

  /**
   * 队列 -- 当前队列的 api 和 jquery 不一样，所以不打包进 mdui.JQ 里
   */
  var queue = {};
  (function () {
    var queueData = [];

    /**
     * 写入队列
     * @param queueName 对列名
     * @param func 函数名，该参数为空时，返回所有队列
     */
    queue.queue = function (queueName, func) {
      if (queueData[queueName] === undefined) {
        queueData[queueName] = [];
      }

      if (func === undefined) {
        return queueData[queueName];
      }

      queueData[queueName].push(func);
    };

    /**
     * 从队列中移除第一个函数，并执行该函数
     * @param queueName
     */
    queue.dequeue = function (queueName) {
      if (queueData[queueName] !== undefined && queueData[queueName].length) {
        (queueData[queueName].shift())();
      }
    };

  })();

  /**
   * touch 事件后的 500ms 内禁用 mousedown 事件
   *
   * 不支持触控的屏幕上事件顺序为 mousedown -> mouseup -> click
   * 支持触控的屏幕上事件顺序为 touchstart -> touchend -> mousedown -> mouseup -> click
   */
  var TouchHandler = {
    touches: 0,

    /**
     * 该事件是否被允许
     * 在执行事件前调用该方法判断事件是否可以执行
     * @param e
     * @returns {boolean}
     */
    isAllow: function (e) {
      var allow = true;

      if (
        TouchHandler.touches &&
        [
          'mousedown',
          'mouseup',
          'mousemove',
          'click',
          'mouseover',
          'mouseout',
          'mouseenter',
          'mouseleave',
        ].indexOf(e.type) > -1
      ) {
        // 触发了 touch 事件后阻止鼠标事件
        allow = false;
      }

      return allow;
    },

    /**
     * 在 touchstart 和 touchmove、touchend、touchcancel 事件中调用该方法注册事件
     * @param e
     */
    register: function (e) {
      if (e.type === 'touchstart') {
        // 触发了 touch 事件
        TouchHandler.touches += 1;
      } else if (['touchmove', 'touchend', 'touchcancel'].indexOf(e.type) > -1) {
        // touch 事件结束 500ms 后解除对鼠标事件的阻止
        setTimeout(function () {
          if (TouchHandler.touches) {
            TouchHandler.touches -= 1;
          }
        }, 500);
      }
    },

    start: 'touchstart mousedown',
    move: 'touchmove mousemove',
    end: 'touchend mouseup',
    cancel: 'touchcancel mouseleave',
    unlock: 'touchend touchmove touchcancel',
  };

  // 测试事件
  // 在每一个事件中都使用 TouchHandler.isAllow(e) 判断事件是否可执行
  // 在 touchstart 和 touchmove、touchend、touchcancel
  // (function () {
  //
  //   $document
  //     .on(TouchHandler.start, function (e) {
  //       if (!TouchHandler.isAllow(e)) {
  //         return;
  //       }
  //       TouchHandler.register(e);
  //       console.log(e.type);
  //     })
  //     .on(TouchHandler.move, function (e) {
  //       if (!TouchHandler.isAllow(e)) {
  //         return;
  //       }
  //       console.log(e.type);
  //     })
  //     .on(TouchHandler.end, function (e) {
  //       if (!TouchHandler.isAllow(e)) {
  //         return;
  //       }
  //       console.log(e.type);
  //     })
  //     .on(TouchHandler.unlock, TouchHandler.register);
  // })();

  $(function () {
    // 避免页面加载完后直接执行css动画
    // https://css-tricks.com/transitions-only-after-page-load/

    setTimeout(function () {
      $('body').addClass('mdui-loaded');
    }, 0);
  });


  /**
   * =============================================================================
   * ************   MDUI 内部使用的函数   ************
   * =============================================================================
   */

  /**
   * 解析 DATA API 的参数
   * @param str
   * @returns {*}
   */
  var parseOptions = function (str) {
    var options = {};

    if (str === null || !str) {
      return options;
    }

    if (typeof str === 'object') {
      return str;
    }

    /* jshint ignore:start */
    var start = str.indexOf('{');
    try {
      options = (new Function('',
        'var json = ' + str.substr(start) +
        '; return JSON.parse(JSON.stringify(json));'))();
    } catch (e) {
    }
    /* jshint ignore:end */

    return options;
  };

  /**
   * 绑定组件的事件
   * @param eventName 事件名
   * @param pluginName 插件名
   * @param inst 插件实例
   * @param trigger 在该元素上触发
   * @param obj 事件参数
   */
  var componentEvent = function (eventName, pluginName, inst, trigger, obj) {
    if (!obj) {
      obj = {};
    }

    obj.inst = inst;

    var fullEventName = eventName + '.mdui.' + pluginName;

    // jQuery 事件
    if (typeof jQuery !== 'undefined') {
      jQuery(trigger).trigger(fullEventName, obj);
    }

    // JQ 事件
    $(trigger).trigger(fullEventName, obj);
  };


  /**
   * =============================================================================
   * ************   开放的常用方法   ************
   * =============================================================================
   */

  $.fn.extend({

    /**
     * 执行强制重绘
     */
    reflow: function () {
      return this.each(function () {
        return this.clientLeft;
      });
    },

    /**
     * 设置 transition 时间
     * @param duration
     */
    transition: function (duration) {
      if (typeof duration !== 'string') {
        duration = duration + 'ms';
      }

      return this.each(function () {
        this.style.webkitTransitionDuration = duration;
        this.style.transitionDuration = duration;
      });
    },

    /**
     * transition 动画结束回调
     * @param callback
     * @returns {transitionEnd}
     */
    transitionEnd: function (callback) {
      var events = [
          'webkitTransitionEnd',
          'transitionend',
        ];
      var i;
      var _this = this;

      function fireCallBack(e) {
        if (e.target !== this) {
          return;
        }

        callback.call(this, e);

        for (i = 0; i < events.length; i++) {
          _this.off(events[i], fireCallBack);
        }
      }

      if (callback) {
        for (i = 0; i < events.length; i++) {
          _this.on(events[i], fireCallBack);
        }
      }

      return this;
    },

    /**
     * 设置 transform-origin 属性
     * @param transformOrigin
     */
    transformOrigin: function (transformOrigin) {
      return this.each(function () {
        this.style.webkitTransformOrigin = transformOrigin;
        this.style.transformOrigin = transformOrigin;
      });
    },

    /**
     * 设置 transform 属性
     * @param transform
     */
    transform: function (transform) {
      return this.each(function () {
        this.style.webkitTransform = transform;
        this.style.transform = transform;
      });
    },

  });

  $.extend({
    /**
     * 创建并显示遮罩
     * @param zIndex 遮罩层的 z-index
     */
    showOverlay: function (zIndex) {
      var $overlay = $('.mdui-overlay');

      if ($overlay.length) {
        $overlay.data('isDeleted', 0);

        if (zIndex !== undefined) {
          $overlay.css('z-index', zIndex);
        }
      } else {
        if (zIndex === undefined) {
          zIndex = 2000;
        }

        $overlay = $('<div class="mdui-overlay">')
          .appendTo(document.body)
          .reflow()
          .css('z-index', zIndex);
      }

      var level = $overlay.data('overlay-level') || 0;
      return $overlay
        .data('overlay-level', ++level)
        .addClass('mdui-overlay-show');
    },

    /**
     * 隐藏遮罩层
     * @param force 是否强制隐藏遮罩
     */
    hideOverlay: function (force) {
      var $overlay = $('.mdui-overlay');

      if (!$overlay.length) {
        return;
      }

      var level = force ? 1 : $overlay.data('overlay-level');
      if (level > 1) {
        $overlay.data('overlay-level', --level);
        return;
      }

      $overlay
        .data('overlay-level', 0)
        .removeClass('mdui-overlay-show')
        .data('isDeleted', 1)
        .transitionEnd(function () {
          if ($overlay.data('isDeleted')) {
            $overlay.remove();
          }
        });
    },

    /**
     * 锁定屏幕
     */
    lockScreen: function () {
      var $body = $('body');

      // 不直接把 body 设为 box-sizing: border-box，避免污染全局样式
      var newBodyWidth = $body.width();

      $body
        .addClass('mdui-locked')
        .width(newBodyWidth);

      var level = $body.data('lockscreen-level') || 0;
      $body.data('lockscreen-level', ++level);
    },

    /**
     * 解除屏幕锁定
     * @param force 是否强制解锁屏幕
     */
    unlockScreen: function (force) {
      var $body = $('body');

      var level = force ? 1 : $body.data('lockscreen-level');
      if (level > 1) {
        $body.data('lockscreen-level', --level);
        return;
      }

      $body
        .data('lockscreen-level', 0)
        .removeClass('mdui-locked')
        .width('');
    },

    /**
     * 函数节流
     * @param fn
     * @param delay
     * @returns {Function}
     */
    throttle: function (fn, delay) {
      var timer = null;
      if (!delay || delay < 16) {
        delay = 16;
      }

      return function () {
        var _this = this;
        var args = arguments;

        if (timer === null) {
          timer = setTimeout(function () {
            fn.apply(_this, args);
            timer = null;
          }, delay);
        }
      };
    },
  });

  /**
   * 生成唯一 id
   * @param string name id的名称，若该名称对于的guid不存在，则生成新的guid并返回；若已存在，则返回原有guid
   * @returns {string}
   */
  (function () {
    var GUID = {};

    $.extend({
      guid: function (name) {
        if (typeof name !== 'undefined' && typeof GUID[name] !== 'undefined') {
          return GUID[name];
        }

        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }

        var guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

        if (typeof name !== 'undefined') {
          GUID[name] = guid;
        }

        return guid;
      },
    });
  })();


  /**
   * =============================================================================
   * ************   Mutation   ************
   * =============================================================================
   */

  (function () {
    /**
     * API 初始化代理, 当 DOM 突变再次执行代理的初始化函数. 使用方法:
     *
     * 1. 代理组件 API 执行初始化函数, selector 必须为字符串.
     *    mdui.mutation(selector, apiInit);
     *    mutation 会执行 $(selector).each(apiInit)
     *
     * 2. 突变时, 再次执行代理的初始化函数
     *    mdui.mutation()        等价 $(document).mutation()
     *    $(selector).mutation() 在 selector 节点内进行 API 初始化
     *
     * 原理:
     *
     *    mutation 执行了 $().data('mdui.mutation', [selector]).
     *    当元素被重构时, 该数据会丢失, 由此判断是否突变.
     *
     * 提示:
     *
     *    类似 Drawer 可以使用委托事件完成.
     *    类似 Collapse 需要知道 DOM 发生突变, 并再次进行初始化.
     */
    var entries = { };

    function mutation(selector, apiInit, that, i, item) {
      var $this = $(that);
      var m = $this.data('mdui.mutation');

      if (!m) {
        m = [];
        $this.data('mdui.mutation', m);
      }

      if (m.indexOf(selector) === -1) {
        m.push(selector);
        apiInit.call(that, i, item);
      }
    }

    $.fn.extend({
      mutation: function () {
        return this.each(function (i, item) {
          var $this = $(this);
          $.each(entries, function (selector, apiInit) {
            if ($this.is(selector)) {
              mutation(selector, apiInit, $this[0], i, item);
            }

            $this.find(selector).each(function (i, item) {
              mutation(selector, apiInit, this, i, item);
            });
          });
        });
      },
    });

    mdui.mutation = function (selector, apiInit) {
      if (typeof selector !== 'string' || typeof apiInit !== 'function') {
        $(document).mutation();
        return;
      }

      entries[selector] = apiInit;
      $(selector).each(function (i, item) {
        mutation(selector, apiInit, this, i, item);
      });
    };

  })();


  /**
   * =============================================================================
   * ************   Headroom.js   ************
   * =============================================================================
   */

  mdui.Headroom = (function () {

    /**
     * 默认参数
     * @type {{}}
     */
    var DEFAULT = {
      tolerance: 5,                                 // 滚动条滚动多少距离开始隐藏或显示元素，{down: num, up: num}，或数字
      offset: 0,                                    // 在页面顶部多少距离内滚动不会隐藏元素
      initialClass: 'mdui-headroom',                // 初始化时添加的类
      pinnedClass: 'mdui-headroom-pinned-top',      // 元素固定时添加的类
      unpinnedClass: 'mdui-headroom-unpinned-top',  // 元素隐藏时添加的类
    };

    /**
     * Headroom
     * @param selector
     * @param opts
     * @constructor
     */
    function Headroom(selector, opts) {
      var _this = this;

      _this.$headroom = $(selector).eq(0);
      if (!_this.$headroom.length) {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = _this.$headroom.data('mdui.headroom');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));

      // 数值转为 {down: bum, up: num}
      var tolerance = _this.options.tolerance;
      if (tolerance !== Object(tolerance)) {
        _this.options.tolerance = {
          down: tolerance,
          up: tolerance,
        };
      }

      _this._init();
    }

    /**
     * 初始化
     * @private
     */
    Headroom.prototype._init = function () {
      var _this = this;

      _this.state = 'pinned';
      _this.$headroom
        .addClass(_this.options.initialClass)
        .removeClass(_this.options.pinnedClass + ' ' + _this.options.unpinnedClass);

      _this.inited = false;
      _this.lastScrollY = 0;

      _this._attachEvent();
    };

    /**
     * 监听滚动事件
     * @private
     */
    Headroom.prototype._attachEvent = function () {
      var _this = this;

      if (!_this.inited) {
        _this.lastScrollY = window.pageYOffset;
        _this.inited = true;

        $window.on('scroll', function () {
          _this._scroll();
        });
      }
    };

    /**
     * 滚动时的处理
     * @private
     */
    Headroom.prototype._scroll = function () {
      var _this = this;
      _this.rafId = window.requestAnimationFrame(function () {
        var currentScrollY = window.pageYOffset;
        var direction = currentScrollY > _this.lastScrollY ? 'down' : 'up';
        var toleranceExceeded =
          Math.abs(currentScrollY - _this.lastScrollY) >=
          _this.options.tolerance[direction];

        if (
          currentScrollY > _this.lastScrollY &&
          currentScrollY >= _this.options.offset &&
          toleranceExceeded) {
          _this.unpin();
        } else if (
          (currentScrollY < _this.lastScrollY && toleranceExceeded) ||
          currentScrollY <= _this.options.offset
        ) {
          _this.pin();
        }

        _this.lastScrollY = currentScrollY;
      });
    };

    /**
     * 动画结束回调
     * @param inst
     */
    var transitionEnd = function (inst) {
      if (inst.state === 'pinning') {
        inst.state = 'pinned';
        componentEvent('pinned', 'headroom', inst, inst.$headroom);
      }

      if (inst.state === 'unpinning') {
        inst.state = 'unpinned';
        componentEvent('unpinned', 'headroom', inst, inst.$headroom);
      }
    };

    /**
     * 固定住
     */
    Headroom.prototype.pin = function () {
      var _this = this;

      if (
        _this.state === 'pinning' ||
        _this.state === 'pinned' ||
        !_this.$headroom.hasClass(_this.options.initialClass)
      ) {
        return;
      }

      componentEvent('pin', 'headroom', _this, _this.$headroom);

      _this.state = 'pinning';

      _this.$headroom
        .removeClass(_this.options.unpinnedClass)
        .addClass(_this.options.pinnedClass)
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    /**
     * 不固定住
     */
    Headroom.prototype.unpin = function () {
      var _this = this;

      if (
        _this.state === 'unpinning' ||
        _this.state === 'unpinned' ||
        !_this.$headroom.hasClass(_this.options.initialClass)
      ) {
        return;
      }

      componentEvent('unpin', 'headroom', _this, _this.$headroom);

      _this.state = 'unpinning';

      _this.$headroom
        .removeClass(_this.options.pinnedClass)
        .addClass(_this.options.unpinnedClass)
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    /**
     * 启用
     */
    Headroom.prototype.enable = function () {
      var _this = this;

      if (!_this.inited) {
        _this._init();
      }
    };

    /**
     * 禁用
     */
    Headroom.prototype.disable = function () {
      var _this = this;

      if (_this.inited) {
        _this.inited = false;
        _this.$headroom
          .removeClass([
            _this.options.initialClass,
            _this.options.pinnedClass,
            _this.options.unpinnedClass,
          ].join(' '));

        $window.off('scroll', function () {
          _this._scroll();
        });

        window.cancelAnimationFrame(_this.rafId);
      }
    };

    /**
     * 获取当前状态 pinning | pinned | unpinning | unpinned
     */
    Headroom.prototype.getState = function () {
      return this.state;
    };

    return Headroom;

  })();


  /**
   * =============================================================================
   * ************   Headroom 自定义属性 API   ************
   * =============================================================================
   */

  $(function () {
    mdui.mutation('[mdui-headroom]', function () {
      var $this = $(this);
      var options = parseOptions($this.attr('mdui-headroom'));

      var inst = $this.data('mdui.headroom');
      if (!inst) {
        inst = new mdui.Headroom($this, options);
        $this.data('mdui.headroom', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   供 Collapse、 Panel 调用的折叠内容块插件   ************
   * =============================================================================
   */
  var CollapsePrivate = (function () {

    /**
     * 默认参数
     */
    var DEFAULT = {
      accordion: false,                             // 是否使用手风琴效果
    };

    /**
     * 折叠内容块
     * @param selector
     * @param opts
     * @param namespace
     * @constructor
     */
    function Collapse(selector, opts, namespace) {
      var _this = this;

      // 命名空间
      _this.ns = namespace;

      // 类名
      var classpPefix = 'mdui-' + _this.ns + '-item';
      _this.class_item = classpPefix;
      _this.class_item_open = classpPefix + '-open';
      _this.class_header = classpPefix + '-header';
      _this.class_body = classpPefix + '-body';

      // 折叠面板元素
      _this.$collapse = $(selector).eq(0);
      if (!_this.$collapse.length) {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = _this.$collapse.data('mdui.' + _this.ns);
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));

      _this.$collapse.on('click', '.' + _this.class_header, function () {
        var $item = $(this).parent('.' + _this.class_item);
        if (_this.$collapse.children($item).length) {
          _this.toggle($item);
        }
      });

      // 绑定关闭按钮
      _this.$collapse.on('click', '[mdui-' + _this.ns + '-item-close]', function () {
        var $item = $(this).parents('.' + _this.class_item).eq(0);
        if (_this._isOpen($item)) {
          _this.close($item);
        }
      });
    }

    /**
     * 指定 item 是否处于打开状态
     * @param $item
     * @returns {boolean}
     * @private
     */
    Collapse.prototype._isOpen = function ($item) {
      return $item.hasClass(this.class_item_open);
    };

    /**
     * 获取指定 item
     * @param item
     * @returns {*}
     * @private
     */
    Collapse.prototype._getItem = function (item) {
      var _this = this;

      if (parseInt(item) === item) {
        // item 是索引号
        return _this.$collapse.children('.' + _this.class_item).eq(item);
      }

      return $(item).eq(0);
    };

    /**
     * 动画结束回调
     * @param inst
     * @param $content
     * @param $item
     */
    var transitionEnd = function (inst, $content, $item) {
      if (inst._isOpen($item)) {
        $content
          .transition(0)
          .height('auto')
          .reflow()
          .transition('');

        componentEvent('opened', inst.ns, inst, $item[0]);
      } else {
        $content.height('');

        componentEvent('closed', inst.ns, inst, $item[0]);
      }
    };

    /**
     * 打开指定面板项
     * @param item 面板项的索引号或 DOM 元素或 CSS 选择器
     */
    Collapse.prototype.open = function (item) {
      var _this = this;
      var $item = _this._getItem(item);

      if (_this._isOpen($item)) {
        return;
      }

      // 关闭其他项
      if (_this.options.accordion) {
        _this.$collapse.children('.' + _this.class_item_open).each(function () {
          var $tmpItem = $(this);

          if ($tmpItem !== $item) {
            _this.close($tmpItem);
          }
        });
      }

      var $content = $item.children('.' + _this.class_body);

      $content
        .height($content[0].scrollHeight)
        .transitionEnd(function () {
          transitionEnd(_this, $content, $item);
        });

      componentEvent('open', _this.ns, _this, $item[0]);

      $item.addClass(_this.class_item_open);
    };

    /**
     * 关闭指定项
     * @param item 面板项的索引号或 DOM 元素或 CSS 选择器
     */
    Collapse.prototype.close = function (item) {
      var _this = this;
      var $item = _this._getItem(item);

      if (!_this._isOpen($item)) {
        return;
      }

      var $content = $item.children('.' + _this.class_body);

      componentEvent('close', _this.ns, _this, $item[0]);

      $item.removeClass(_this.class_item_open);

      $content
        .transition(0)
        .height($content[0].scrollHeight)
        .reflow()
        .transition('')
        .height('')
        .transitionEnd(function () {
          transitionEnd(_this, $content, $item);
        });
    };

    /**
     * 切换指定项的状态
     * @param item 面板项的索引号或 DOM 元素或 CSS 选择器或 JQ 对象
     */
    Collapse.prototype.toggle = function (item) {
      var _this = this;
      var $item = _this._getItem(item);

      if (_this._isOpen($item)) {
        _this.close($item);
      } else {
        _this.open($item);
      }
    };

    /**
     * 打开所有项
     */
    Collapse.prototype.openAll = function () {
      var _this = this;

      _this.$collapse.children('.' + _this.class_item).each(function () {
        var $tmpItem = $(this);

        if (!_this._isOpen($tmpItem)) {
          _this.open($tmpItem);
        }
      });
    };

    /**
     * 关闭所有项
     */
    Collapse.prototype.closeAll = function () {
      var _this = this;

      _this.$collapse.children('.' + _this.class_item).each(function () {
        var $tmpItem = $(this);

        if (_this._isOpen($tmpItem)) {
          _this.close($tmpItem);
        }
      });
    };

    return Collapse;
  })();

  /**
   * =============================================================================
   * ************   Collapse 折叠内容块插件   ************
   * =============================================================================
   */
  mdui.Collapse = (function () {

    function Collapse(selector, opts) {
      return new CollapsePrivate(selector, opts, 'collapse');
    }

    return Collapse;
  })();


  /**
   * =============================================================================
   * ************   Collapse 自定义属性   ************
   * =============================================================================
   */

  $(function () {
    mdui.mutation('[mdui-collapse]', function () {
      var $target = $(this);

      var inst = $target.data('mdui.collapse');
      if (!inst) {
        var options = parseOptions($target.attr('mdui-collapse'));
        inst = new mdui.Collapse($target, options);
        $target.data('mdui.collapse', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   Table 表格   ************
   * =============================================================================
   */

  (function () {

    /**
     * 生成 checkbox 的 HTML 结构
     * @param tag
     * @returns {string}
     */
    var checkboxHTML = function (tag) {
      return '<' + tag + ' class="mdui-table-cell-checkbox">' +
               '<label class="mdui-checkbox">' +
                 '<input type="checkbox"/>' +
                 '<i class="mdui-checkbox-icon"></i>' +
               '</label>' +
             '</' + tag + '>';
    };

    /**
     * Table 表格
     * @param selector
     * @constructor
     */
    function Table(selector) {
      var _this = this;

      _this.$table = $(selector).eq(0);

      if (!_this.$table.length) {
        return;
      }

      _this.init();
    }

    /**
     * 初始化
     */
    Table.prototype.init = function () {
      var _this = this;

      _this.$thRow = _this.$table.find('thead tr');
      _this.$tdRows = _this.$table.find('tbody tr');
      _this.$tdCheckboxs = $();
      _this.selectable = _this.$table.hasClass('mdui-table-selectable');
      _this.selectedRow = 0;

      _this._updateThCheckbox();
      _this._updateTdCheckbox();
      _this._updateNumericCol();
    };

    /**
     * 更新表头 checkbox 的状态
     */
    Table.prototype._updateThCheckboxStatus = function () {
      var _this = this;
      var checkbox = _this.$thCheckbox[0];

      checkbox.checked = _this.selectedRow === _this.$tdRows.length;
      checkbox.indeterminate = _this.selectedRow && _this.selectedRow !== _this.$tdRows.length;
    };

    /**
     * 更新表格行的 checkbox
     */
    Table.prototype._updateTdCheckbox = function () {
      var _this = this;

      _this.$tdRows.each(function () {
        var $tdRow = $(this);

        // 移除旧的 checkbox
        $tdRow.find('.mdui-table-cell-checkbox').remove();

        if (!_this.selectable) {
          return;
        }

        // 创建 DOM
        var $checkbox = $(checkboxHTML('td'))
          .prependTo($tdRow)
          .find('input[type="checkbox"]');

        // 默认选中的行
        if ($tdRow.hasClass('mdui-table-row-selected')) {
          $checkbox[0].checked = true;
          _this.selectedRow++;
        }

        _this._updateThCheckboxStatus();

        // 绑定事件
        $checkbox.on('change', function () {
          if ($checkbox[0].checked) {
            $tdRow.addClass('mdui-table-row-selected');
            _this.selectedRow++;
          } else {
            $tdRow.removeClass('mdui-table-row-selected');
            _this.selectedRow--;
          }

          _this._updateThCheckboxStatus();
        });

        _this.$tdCheckboxs = _this.$tdCheckboxs.add($checkbox);
      });
    };

    /**
     * 更新表头的 checkbox
     */
    Table.prototype._updateThCheckbox = function () {
      var _this = this;

      // 移除旧的 checkbox
      _this.$thRow.find('.mdui-table-cell-checkbox').remove();

      if (!_this.selectable) {
        return;
      }

      _this.$thCheckbox = $(checkboxHTML('th'))
        .prependTo(_this.$thRow)
        .find('input[type="checkbox"]')
        .on('change', function () {

          var isCheckedAll = _this.$thCheckbox[0].checked;
          _this.selectedRow = isCheckedAll ? _this.$tdRows.length : 0;

          _this.$tdCheckboxs.each(function (i, checkbox) {
            checkbox.checked = isCheckedAll;
          });

          _this.$tdRows.each(function (i, row) {
            $(row)[isCheckedAll ? 'addClass' : 'removeClass']('mdui-table-row-selected');
          });
        });
    };

    /**
     * 更新数值列
     */
    Table.prototype._updateNumericCol = function () {
      var _this = this;
      var $th;
      var $tdRow;

      _this.$thRow.find('th').each(function (i, th) {
        $th = $(th);

        _this.$tdRows.each(function () {
          $tdRow = $(this);
          var method = $th.hasClass('mdui-table-col-numeric') ? 'addClass' : 'removeClass';
          $tdRow.find('td').eq(i)[method]('mdui-table-col-numeric');
        });
      });
    };

    /**
     * 初始化表格
     */
    mdui.mutation('.mdui-table', function () {
      var $table = $(this);
      if (!$table.data('mdui.table')) {
        $table.data('mdui.table', new Table($table));
      }
    });

    /**
     * 更新表格
     */
    mdui.updateTables = function () {
      $(arguments.length ? arguments[0] : '.mdui-table').each(function () {
        var $table = $(this);
        var inst = $table.data('mdui.table');

        if (inst) {
          inst.init();
        } else {
          $table.data('mdui.table', new Table($table));
        }
      });
    };

  })();


  /**
   * =============================================================================
   * ************   涟漪   ************
   * =============================================================================
   *
   * Inspired by https://github.com/nolimits4web/Framework7/blob/master/src/js/fast-clicks.js
   * https://github.com/nolimits4web/Framework7/blob/master/LICENSE
   *
   * Inspired by https://github.com/fians/Waves
   */

  (function () {

    var Ripple = {

      /**
       * 延时，避免手指滑动时也触发涟漪（单位：毫秒）
       */
      delay: 200,

      /**
       * 显示涟漪动画
       * @param e
       * @param $ripple
       */
      show: function (e, $ripple) {

        // 鼠标右键不产生涟漪
        if (e.button === 2) {
          return;
        }

        // 点击位置坐标
        var tmp;
        if ('touches' in e && e.touches.length) {
          tmp = e.touches[0];
        } else {
          tmp = e;
        }

        var touchStartX = tmp.pageX;
        var touchStartY = tmp.pageY;

        // 涟漪位置
        var offset = $ripple.offset();
        var center = {
          x: touchStartX - offset.left,
          y: touchStartY - offset.top,
        };

        var height = $ripple.innerHeight();
        var width = $ripple.innerWidth();
        var diameter = Math.max(
          Math.pow((Math.pow(height, 2) + Math.pow(width, 2)), 0.5), 48
        );

        // 涟漪扩散动画
        var translate =
          'translate3d(' + (-center.x + width / 2) + 'px, ' + (-center.y + height / 2) + 'px, 0) ' +
          'scale(1)';

        // 涟漪的 DOM 结构
        $('<div class="mdui-ripple-wave" style="' +
          'width: ' + diameter + 'px; ' +
          'height: ' + diameter + 'px; ' +
          'margin-top:-' + diameter / 2 + 'px; ' +
          'margin-left:-' + diameter / 2 + 'px; ' +
          'left:' + center.x + 'px; ' +
          'top:' + center.y + 'px;">' +
          '</div>')

          // 缓存动画效果
          .data('translate', translate)

          .prependTo($ripple)
          .reflow()
          .transform(translate);
      },

      /**
       * 隐藏涟漪动画
       */
      hide: function (e, element) {
        var $ripple = $(element || this);

        $ripple.children('.mdui-ripple-wave').each(function () {
          removeRipple($(this));
        });

        $ripple.off('touchmove touchend touchcancel mousemove mouseup mouseleave', Ripple.hide);
      },
    };

    /**
     * 隐藏并移除涟漪
     * @param $wave
     */
    function removeRipple($wave) {
      if (!$wave.length || $wave.data('isRemoved')) {
        return;
      }

      $wave.data('isRemoved', true);

      var removeTimeout = setTimeout(function () {
        $wave.remove();
      }, 400);

      var translate = $wave.data('translate');

      $wave
        .addClass('mdui-ripple-wave-fill')
        .transform(translate.replace('scale(1)', 'scale(1.01)'))
        .transitionEnd(function () {
          clearTimeout(removeTimeout);

          $wave
            .addClass('mdui-ripple-wave-out')
            .transform(translate.replace('scale(1)', 'scale(1.01)'));

          removeTimeout = setTimeout(function () {
            $wave.remove();
          }, 700);

          setTimeout(function () {
            $wave.transitionEnd(function () {
              clearTimeout(removeTimeout);
              $wave.remove();
            });
          }, 0);
        });
    }

    /**
     * 显示涟漪，并绑定 touchend 等事件
     * @param e
     */
    function showRipple(e) {
      if (!TouchHandler.isAllow(e)) {
        return;
      }

      TouchHandler.register(e);

      // Chrome 59 点击滚动条时，会在 document 上触发事件
      if (e.target === document) {
        return;
      }

      var $ripple;
      var $target = $(e.target);

      // 获取含 .mdui-ripple 类的元素
      if ($target.hasClass('mdui-ripple')) {
        $ripple = $target;
      } else {
        $ripple = $target.parents('.mdui-ripple').eq(0);
      }

      if ($ripple.length) {

        // 禁用状态的元素上不产生涟漪效果
        if ($ripple[0].disabled || $ripple.attr('disabled') !== null) {
          return;
        }

        if (e.type === 'touchstart') {
          var hidden = false;

          // toucstart 触发指定时间后开始涟漪动画
          var timer = setTimeout(function () {
            timer = null;
            Ripple.show(e, $ripple);
          }, Ripple.delay);

          var hideRipple = function (hideEvent) {
            // 如果手指没有移动，且涟漪动画还没有开始，则开始涟漪动画
            if (timer) {
              clearTimeout(timer);
              timer = null;
              Ripple.show(e, $ripple);
            }

            if (!hidden) {
              hidden = true;
              Ripple.hide(hideEvent, $ripple);
            }
          };

          // 手指移动后，移除涟漪动画
          var touchMove = function (moveEvent) {
            if (timer) {
              clearTimeout(timer);
              timer = null;
            }

            hideRipple(moveEvent);
          };

          $ripple
            .on('touchmove', touchMove)
            .on('touchend touchcancel', hideRipple);

        } else {
          Ripple.show(e, $ripple);
          $ripple.on('touchmove touchend touchcancel mousemove mouseup mouseleave', Ripple.hide);
        }
      }
    }

    // 初始化绑定的事件
    $document
      .on(TouchHandler.start, showRipple)
      .on(TouchHandler.unlock, TouchHandler.register);
  })();


  /**
   * =============================================================================
   * ************   Text Field 文本框   ************
   * =============================================================================
   */

  (function () {

    var getProp = function (obj, prop) {
      return (
        typeof obj === 'object' &&
        obj !== null &&
        obj[prop] !== undefined &&
        obj[prop]
      ) ? obj[prop] : false;
    };

    /**
     * 输入框事件
     * @param e
     */
    var inputEvent = function (e) {
      var input = e.target;
      var $input = $(input);
      var event = e.type;
      var value = $input.val();

      // reInit 为 true 时，需要重新初始化文本框
      var reInit = getProp(e.detail, 'reInit');

      // domLoadedEvent 为 true 时，为 DOM 加载完毕后自动触发的事件
      var domLoadedEvent = getProp(e.detail, 'domLoadedEvent');

      // 文本框类型
      var type = $input.attr('type') || '';
      if (['checkbox', 'button', 'submit', 'range', 'radio', 'image'].indexOf(type) >= 0) {
        return;
      }

      var $textField = $input.parent('.mdui-textfield');

      // 输入框是否聚焦
      if (event === 'focus') {
        $textField.addClass('mdui-textfield-focus');
      }

      if (event === 'blur') {
        $textField.removeClass('mdui-textfield-focus');
      }

      // 输入框是否为空
      if (event === 'blur' || event === 'input') {
        $textField[(value && value !== '') ? 'addClass' : 'removeClass']('mdui-textfield-not-empty');
      }

      // 输入框是否禁用
      $textField[input.disabled ? 'addClass' : 'removeClass']('mdui-textfield-disabled');

      // 表单验证
      if ((event === 'input' || event === 'blur') && !domLoadedEvent) {
        if (input.validity) {
          var method = input.validity.valid ? 'removeClass' : 'addClass';
          $textField[method]('mdui-textfield-invalid-html5');
        }
      }

      // textarea 高度自动调整
      if (e.target.nodeName.toLowerCase() === 'textarea') {

        // IE bug：textarea 的值仅为多个换行，不含其他内容时，textarea 的高度不准确
        //         此时，在计算高度前，在值的开头加入一个空格，计算完后，移除空格
        var inputValue = $input.val();
        var hasExtraSpace = false;
        if (inputValue.replace(/[\r\n]/g, '') === '') {
          $input.val(' ' + inputValue);
          hasExtraSpace = true;
        }

        // 设置 textarea 高度
        $input.height('');
        var height = $input.height();
        var scrollHeight = input.scrollHeight;

        if (scrollHeight > height) {
          $input.height(scrollHeight);
        }

        // 计算完，还原 textarea 的值
        if (hasExtraSpace) {
          $input.val(inputValue);
        }
      }

      // 实时字数统计
      if (reInit) {
        $textField
          .find('.mdui-textfield-counter')
          .remove();
      }

      var maxlength = $input.attr('maxlength');
      if (maxlength) {
        if (reInit || domLoadedEvent) {
          $('<div class="mdui-textfield-counter">' +
              '<span class="mdui-textfield-counter-inputed"></span> / ' + maxlength +
            '</div>').appendTo($textField);
        }

        $textField.find('.mdui-textfield-counter-inputed').text(value.length.toString());
      }

      // 含 帮助文本、错误提示、字数统计 时，增加文本框底部内边距
      if (
        $textField.find('.mdui-textfield-helper').length ||
        $textField.find('.mdui-textfield-error').length ||
        maxlength
      ) {
        $textField.addClass('mdui-textfield-has-bottom');
      }
    };

    // 绑定事件
    $document.on('input focus blur', '.mdui-textfield-input', { useCapture: true }, inputEvent);

    // 可展开文本框展开
    $document.on('click', '.mdui-textfield-expandable .mdui-textfield-icon', function () {
      $(this)

        // 展开文本框
        .parents('.mdui-textfield')
        .addClass('mdui-textfield-expanded')

        // 聚焦到输入框
        .find('.mdui-textfield-input')[0].focus();
    });

    // 可展开文本框关闭
    $document.on('click', '.mdui-textfield-expanded .mdui-textfield-close', function () {
      $(this)

        // 关闭文本框
        .parents('.mdui-textfield')
        .removeClass('mdui-textfield-expanded')

        // 清空输入框
        .find('.mdui-textfield-input')
        .val('');
    });

    /**
     * 通过 JS 更新了表单内容，需要重新进行表单处理
     * @param- 如果传入了 .mdui-textfield 所在的 DOM 元素，则更新该文本框；否则，更新所有文本框
     */
    mdui.updateTextFields = function () {
      $(arguments.length ? arguments[0] : '.mdui-textfield').each(function () {
        $(this)
          .find('.mdui-textfield-input')
          .trigger('input', {
            reInit: true,
          });
      });
    };
  })();

  $(function () {
    /**
     * 初始化文本框
     */
    mdui.mutation('.mdui-textfield', function () {
      $(this)
        .find('.mdui-textfield-input')
        .trigger('input', {
          domLoadedEvent: true,
        });
    });
  });


  /**
   * =============================================================================
   * ************   Slider 滑块   ************
   * =============================================================================
   */

  (function () {

    /**
     * 滑块的值变更后修改滑块样式
     * @param $slider
     */
    var updateValueStyle = function ($slider) {
      var data = $slider.data();

      var $track = data.$track;
      var $fill = data.$fill;
      var $thumb = data.$thumb;
      var $input = data.$input;
      var min = data.min;
      var max = data.max;
      var isDisabled = data.disabled;
      var isDiscrete = data.discrete;
      var $thumbText = data.$thumbText;
      var value = $input.val();
      var percent = (value - min) / (max - min) * 100;

      $fill.width(percent + '%');
      $track.width((100 - percent) + '%');

      if (isDisabled) {
        $fill.css('padding-right', '6px');
        $track.css('padding-left', '6px');
      }

      $thumb.css('left', percent + '%');

      if (isDiscrete) {
        $thumbText.text(value);
      }

      $slider[parseFloat(percent) === 0 ? 'addClass' : 'removeClass']('mdui-slider-zero');
    };

    /**
     * 重新初始化
     * @param $slider
     */
    var reInit = function ($slider) {
      var $track = $('<div class="mdui-slider-track"></div>');
      var $fill = $('<div class="mdui-slider-fill"></div>');
      var $thumb = $('<div class="mdui-slider-thumb"></div>');
      var $input = $slider.find('input[type="range"]');

      // 禁用状态
      var isDisabled = $input[0].disabled;
      $slider[isDisabled ? 'addClass' : 'removeClass']('mdui-slider-disabled');

      // 重新填充 HTML
      $slider.find('.mdui-slider-track').remove();
      $slider.find('.mdui-slider-fill').remove();
      $slider.find('.mdui-slider-thumb').remove();
      $slider.append($track).append($fill).append($thumb);

      // 间续型滑块
      var isDiscrete = $slider.hasClass('mdui-slider-discrete');

      var $thumbText;
      if (isDiscrete) {
        $thumbText = $('<span></span>');
        $thumb.empty().append($thumbText);
      }

      $slider.data({
        $track: $track,
        $fill: $fill,
        $thumb: $thumb,
        $input: $input,
        min: $input.attr('min'),    // 滑块最小值
        max: $input.attr('max'),    // 滑块最大值
        disabled: isDisabled,       // 是否禁用状态
        discrete: isDiscrete,       // 是否是间续型滑块
        $thumbText: $thumbText,      // 间续型滑块的数值
      });

      // 设置默认值
      updateValueStyle($slider);
    };

    var rangeSelector = '.mdui-slider input[type="range"]';

    $document

      // 滑动滑块事件
      .on('input change', rangeSelector, function () {
        var $slider = $(this).parent();
        updateValueStyle($slider);
      })

      // 开始触摸滑块事件
      .on(TouchHandler.start, rangeSelector, function (e) {
        if (!TouchHandler.isAllow(e)) {
          return;
        }

        TouchHandler.register(e);

        if (!this.disabled) {
          var $slider = $(this).parent();
          $slider.addClass('mdui-slider-focus');
        }
      })

      // 结束触摸滑块事件
      .on(TouchHandler.end, rangeSelector, function (e) {
        if (!TouchHandler.isAllow(e)) {
          return;
        }

        if (!this.disabled) {
          var $slider = $(this).parent();
          $slider.removeClass('mdui-slider-focus');
        }
      })

      .on(TouchHandler.unlock, rangeSelector, TouchHandler.register);

    /**
     * 重新初始化滑块（强制重新初始化）
     */
    mdui.updateSliders = function () {
      $(arguments.length ? arguments[0] : '.mdui-slider').each(function () {
        reInit($(this));
      });
    };

    $(function () {
      /**
       * 页面加载完后自动初始化（未初始化时，可以调用该方法初始化）
       */
      mdui.mutation('.mdui-slider', function () {
        reInit($(this));
      });
    });
  })();


  /**
   * =============================================================================
   * ************   Fab 浮动操作按钮   ************
   * =============================================================================
   */

  mdui.Fab = (function () {

    /**
     * 默认参数
     * @type {{}}
     */
    var DEFAULT = {
      trigger: 'hover',      // 触发方式 ['hover', 'click']
    };

    /**
     * 浮动操作按钮实例
     * @param selector 选择器或 HTML 字符串或 DOM 元素或 JQ 对象
     * @param opts
     * @constructor
     */
    function Fab(selector, opts) {
      var _this = this;

      _this.$fab = $(selector).eq(0);
      if (!_this.$fab.length) {
        return;
      }

      // 已通过 data 属性实例化过，不再重复实例化
      var oldInst = _this.$fab.data('mdui.fab');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));
      _this.state = 'closed';

      _this.$btn = _this.$fab.find('.mdui-fab');
      _this.$dial = _this.$fab.find('.mdui-fab-dial');
      _this.$dialBtns = _this.$dial.find('.mdui-fab');

      if (_this.options.trigger === 'hover') {
        _this.$btn
          .on('touchstart mouseenter', function () {
            _this.open();
          });

        _this.$fab
          .on('mouseleave', function () {
            _this.close();
          });
      }

      if (_this.options.trigger === 'click') {
        _this.$btn
          .on(TouchHandler.start, function () {
            _this.open();
          });
      }

      // 触摸屏幕其他地方关闭快速拨号
      $document.on(TouchHandler.start, function (e) {
        if (!$(e.target).parents('.mdui-fab-wrapper').length) {
          _this.close();
        }
      });
    }

    /**
     * 打开菜单
     */
    Fab.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      // 为菜单中的按钮添加不同的 transition-delay
      _this.$dialBtns.each(function (index, btn) {
        btn.style['transition-delay'] = btn.style['-webkit-transition-delay'] =
          15 * (_this.$dialBtns.length - index) + 'ms';
      });

      _this.$dial
        .css('height', 'auto')
        .addClass('mdui-fab-dial-show');

      // 如果按钮中存在 .mdui-fab-opened 的图标，则进行图标切换
      if (_this.$btn.find('.mdui-fab-opened').length) {
        _this.$btn.addClass('mdui-fab-opened');
      }

      _this.state = 'opening';
      componentEvent('open', 'fab', _this, _this.$fab);

      // 打开顺序为从下到上逐个打开，最上面的打开后才表示动画完成
      _this.$dialBtns.eq(0).transitionEnd(function () {
        if (_this.$btn.hasClass('mdui-fab-opened')) {
          _this.state = 'opened';
          componentEvent('opened', 'fab', _this, _this.$fab);
        }
      });
    };

    /**
     * 关闭菜单
     */
    Fab.prototype.close = function () {
      var _this = this;

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      // 为菜单中的按钮添加不同的 transition-delay
      _this.$dialBtns.each(function (index, btn) {
        btn.style['transition-delay'] = btn.style['-webkit-transition-delay'] = 15 * index + 'ms';
      });

      _this.$dial.removeClass('mdui-fab-dial-show');
      _this.$btn.removeClass('mdui-fab-opened');
      _this.state = 'closing';
      componentEvent('close', 'fab', _this, _this.$fab);

      // 从上往下依次关闭，最后一个关闭后才表示动画完成
      _this.$dialBtns.eq(-1).transitionEnd(function () {
        if (!_this.$btn.hasClass('mdui-fab-opened')) {
          _this.state = 'closed';
          componentEvent('closed', 'fab', _this, _this.$fab);
          _this.$dial.css('height', 0);
        }
      });
    };

    /**
     * 切换菜单的打开状态
     */
    Fab.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    /**
     * 获取当前菜单状态
     * @returns {'opening'|'opened'|'closing'|'closed'}
     */
    Fab.prototype.getState = function () {
      return this.state;
    };

    /**
     * 以动画的形式显示浮动操作按钮
     */
    Fab.prototype.show = function () {
      this.$fab.removeClass('mdui-fab-hide');
    };

    /**
     * 以动画的形式隐藏浮动操作按钮
     */
    Fab.prototype.hide = function () {
      this.$fab.addClass('mdui-fab-hide');
    };

    return Fab;
  })();


  /**
   * =============================================================================
   * ************   Fab DATA API   ************
   * =============================================================================
   */

  $(function () {
    // mouseenter 不冒泡，无法进行事件委托，这里用 mouseover 代替。
    // 不管是 click 、 mouseover 还是 touchstart ，都先初始化。

    $document.on('touchstart mousedown mouseover', '[mdui-fab]', function (e) {
      var $this = $(this);

      var inst = $this.data('mdui.fab');
      if (!inst) {
        var options = parseOptions($this.attr('mdui-fab'));
        inst = new mdui.Fab($this, options);
        $this.data('mdui.fab', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   Select 下拉选择   ************
   * =============================================================================
   */

  mdui.Select = (function () {

    /**
     * 默认参数
     */
    var DEFAULT = {
      position: 'auto',                // 下拉框位置，auto、bottom、top
      gutter: 16,                      // 菜单与窗口上下边框至少保持多少间距
    };

    /**
     * 调整菜单位置
     * @param _this Select 实例
     */
    var readjustMenu = function (_this) {
      // 窗口高度
      var windowHeight = $window.height();

      // 配置参数
      var gutter = _this.options.gutter;
      var position = _this.options.position;

      // mdui-select 高度
      var selectHeight = parseInt(_this.$select.height());

      // 菜单项高度
      var $menuItemFirst = _this.$items.eq(0);
      var menuItemHeight = parseInt($menuItemFirst.height());
      var menuItemMargin = parseInt($menuItemFirst.css('margin-top'));

      // 菜单高度
      var menuWidth = parseFloat(_this.$select.width() + 0.01); // 必须比真实宽度多一点，不然会出现省略号
      var menuHeight = menuItemHeight * _this.size + menuItemMargin * 2;

      // var menuRealHeight = menuItemHeight * _this.$items.length + menuItemMargin * 2;

      // 菜单是否出现了滚动条
      //var isMenuScrollable = menuRealHeight > menuHeight;

      // select 在窗口中的位置
      var selectTop = _this.$select[0].getBoundingClientRect().top;

      var transformOriginY;
      var menuMarginTop;

      // position 为 auto 时
      if (position === 'auto') {

        // 菜单高度不能超过窗口高度
        var heightTemp = windowHeight - gutter * 2;
        if (menuHeight > heightTemp) {
          menuHeight = heightTemp;
        }

        // 菜单的 margin-top
        menuMarginTop = -(
          menuItemMargin + _this.selectedIndex * menuItemHeight +
          (menuItemHeight - selectHeight) / 2
        );
        var menuMarginTopMax = -(
          menuItemMargin + (_this.size - 1) * menuItemHeight +
          (menuItemHeight - selectHeight) / 2
        );
        if (menuMarginTop < menuMarginTopMax) {
          menuMarginTop = menuMarginTopMax;
        }

        // 菜单不能超出窗口
        var menuTop = selectTop + menuMarginTop;

        if (menuTop < gutter) {
          // 不能超出窗口上方
          menuMarginTop = -(selectTop - gutter);
        } else if (menuTop + menuHeight + gutter > windowHeight) {
          // 不能超出窗口下方
          menuMarginTop = -(selectTop + menuHeight + gutter - windowHeight);
        }

        // transform 的 Y 轴坐标
        transformOriginY = (_this.selectedIndex * menuItemHeight + menuItemHeight / 2 + menuItemMargin) + 'px';
      } else if (position === 'bottom') {
        menuMarginTop = selectHeight;
        transformOriginY = '0px';
      } else if (position === 'top') {
        menuMarginTop = -menuHeight - 1;
        transformOriginY = '100%';
      }

      // 设置样式
      _this.$select.width(menuWidth);
      _this.$menu
        .width(menuWidth)
        .height(menuHeight)
        .css({
          'margin-top': menuMarginTop + 'px',
          'transform-origin':
          'center ' + transformOriginY + ' 0',
        });
    };

    /**
     * 下拉选择
     * @param selector
     * @param opts
     * @constructor
     */
    function Select(selector, opts) {
      var _this = this;

      var $selectNative =  _this.$selectNative = $(selector).eq(0);
      if (!$selectNative.length) {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = $selectNative.data('mdui.select');
      if (oldInst) {
        return oldInst;
      }

      $selectNative.hide();

      _this.options = $.extend({}, DEFAULT, (opts || {}));

      // 为当前 select 生成唯一 ID
      _this.uniqueID = $.guid();

      _this.state = 'closed';

      // 生成 select
      _this.handleUpdate();

      // 点击 select 外面区域关闭
      $document.on('click touchstart', function (e) {
        var $target = $(e.target);
        if (
          (_this.state === 'opening' || _this.state === 'opened') &&
          !$target.is(_this.$select) &&
          !$.contains(_this.$select[0], $target[0])
        ) {
          _this.close();
        }
      });
    }

    /**
     * 对原生 select 组件进行了修改后，需要调用该方法
     */
    Select.prototype.handleUpdate = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      }

      var $selectNative = _this.$selectNative;

      // 当前的值和文本
      _this.value = $selectNative.val();
      _this.text = '';

      // 生成 HTML
      // 菜单项
      _this.$items = $();
      $selectNative.find('option').each(function (index, option) {
        var data = {
          value: option.value,
          text: option.textContent,
          disabled: option.disabled,
          selected: _this.value === option.value,
          index: index,
        };

        if (_this.value === data.value) {
          _this.text = data.text;
          _this.selectedIndex = index;
        }

        _this.$items = _this.$items.add(
          $('<div class="mdui-select-menu-item mdui-ripple"' +
            (data.disabled ? ' disabled' : '') +
            (data.selected ? ' selected' : '') + '>' + data.text + '</div>')
            .data(data)
        );
      });

      // selected
      _this.$selected = $('<span class="mdui-select-selected">' + _this.text + '</span>');

      // select
      _this.$select =
        $(
          '<div class="mdui-select mdui-select-position-' + _this.options.position + '" ' +
          'style="' + _this.$selectNative.attr('style') + '" ' +
          'id="' + _this.uniqueID + '"></div>'
        )
          .show()
          .append(_this.$selected);

      // menu
      _this.$menu =
        $('<div class="mdui-select-menu"></div>')
          .appendTo(_this.$select)
          .append(_this.$items);

      $('#' + _this.uniqueID).remove();
      $selectNative.after(_this.$select);

      // 根据 select 的 size 属性设置高度，默认为 6
      _this.size = parseInt(_this.$selectNative.attr('size'));

      if (!_this.size || _this.size < 0) {
        _this.size = _this.$items.length;
        if (_this.size > 8) {
          _this.size = 8;
        }
      }

      // 点击选项时关闭下拉菜单
      _this.$items.on('click', function () {
        if (_this.state === 'closing') {
          return;
        }

        var $item = $(this);

        if ($item.data('disabled')) {
          return;
        }

        var itemData = $item.data();

        _this.$selected.text(itemData.text);
        $selectNative.val(itemData.value);
        _this.$items.removeAttr('selected');
        $item.attr('selected', '');
        _this.selectedIndex = itemData.index;
        _this.value = itemData.value;
        _this.text = itemData.text;
        $selectNative.trigger('change');

        _this.close();
      });

      // 点击 select 时打开下拉菜单
      _this.$select.on('click', function (e) {
        var $target = $(e.target);

        // 在菜单上点击时不打开
        if ($target.is('.mdui-select-menu') || $target.is('.mdui-select-menu-item')) {
          return;
        }

        _this.toggle();
      });
    };

    /**
     * 动画结束回调
     * @param inst
     */
    var transitionEnd = function (inst) {
      inst.$select.removeClass('mdui-select-closing');

      if (inst.state === 'opening') {
        inst.state = 'opened';
        componentEvent('opened', 'select', inst, inst.$selectNative);

        inst.$menu.css('overflow-y', 'auto');
      }

      if (inst.state === 'closing') {
        inst.state = 'closed';
        componentEvent('closed', 'select', inst, inst.$selectNative);

        // 恢复样式
        inst.$select.width('');
        inst.$menu.css({
          'margin-top': '',
          height: '',
          width: '',
        });
      }
    };

    /**
     * 打开 Select
     */
    Select.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      _this.state = 'opening';
      componentEvent('open', 'select', _this, _this.$selectNative);

      readjustMenu(_this);

      _this.$select.addClass('mdui-select-open');

      _this.$menu.transitionEnd(function () {
        transitionEnd(_this);
      });
    };

    /**
     * 关闭 Select
     */
    Select.prototype.close = function () {
      var _this = this;

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      _this.state = 'closing';
      componentEvent('close', 'select', _this, _this.$selectNative);

      _this.$menu.css('overflow-y', '');

      _this.$select
        .removeClass('mdui-select-open')
        .addClass('mdui-select-closing');
      _this.$menu.transitionEnd(function () {
        transitionEnd(_this);
      });
    };

    /**
     * 切换 Select 显示状态
     */
    Select.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    return Select;
  })();


  /**
   * =============================================================================
   * ************   Select 下拉选择   ************
   * =============================================================================
   */

  $(function () {
    mdui.mutation('[mdui-select]', function () {
      var $this = $(this);
      var inst = $this.data('mdui.select');
      if (!inst) {
        inst = new mdui.Select($this, parseOptions($this.attr('mdui-select')));
        $this.data('mdui.select', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   Appbar   ************
   * =============================================================================
   * 滚动时自动隐藏应用栏
   * mdui-appbar-scroll-hide
   * mdui-appbar-scroll-toolbar-hide
   */

  $(function () {
    // 滚动时隐藏应用栏
    mdui.mutation('.mdui-appbar-scroll-hide', function () {
      var $this = $(this);
      $this.data('mdui.headroom', new mdui.Headroom($this));
    });

    // 滚动时只隐藏应用栏中的工具栏
    mdui.mutation('.mdui-appbar-scroll-toolbar-hide', function () {
      var $this = $(this);
      var inst = new mdui.Headroom($this, {
        pinnedClass: 'mdui-headroom-pinned-toolbar',
        unpinnedClass: 'mdui-headroom-unpinned-toolbar',
      });
      $this.data('mdui.headroom', inst);
    });
  });


  /**
   * =============================================================================
   * ************   Tab   ************
   * =============================================================================
   */

  mdui.Tab = (function () {

    var DEFAULT = {
      trigger: 'click',       // 触发方式 click: 鼠标点击切换 hover: 鼠标悬浮切换
      //animation: false,       // 切换时是否显示动画
      loop: false,            // 为true时，在最后一个选项卡时调用 next() 方法会回到第一个选项卡
    };

    // 元素是否已禁用
    var isDisabled = function ($ele) {
      return $ele[0].disabled || $ele.attr('disabled') !== null;
    };

    /**
     * 选项卡
     * @param selector
     * @param opts
     * @returns {*}
     * @constructor
     */
    function Tab(selector, opts) {
      var _this = this;

      _this.$tab = $(selector).eq(0);
      if (!_this.$tab.length) {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = _this.$tab.data('mdui.tab');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));
      _this.$tabs = _this.$tab.children('a');
      _this.$indicator = $('<div class="mdui-tab-indicator"></div>').appendTo(_this.$tab);
      _this.activeIndex = false; // 为 false 时表示没有激活的选项卡，或不存在选项卡

      // 根据 url hash 获取默认激活的选项卡
      var hash = location.hash;
      if (hash) {
        _this.$tabs.each(function (i, tab) {
          if ($(tab).attr('href') === hash) {
            _this.activeIndex = i;
            return false;
          }
        });
      }

      // 含 mdui-tab-active 的元素默认激活
      if (_this.activeIndex === false) {
        _this.$tabs.each(function (i, tab) {
          if ($(tab).hasClass('mdui-tab-active')) {
            _this.activeIndex = i;
            return false;
          }
        });
      }

      // 存在选项卡时，默认激活第一个选项卡
      if (_this.$tabs.length && _this.activeIndex === false) {
        _this.activeIndex = 0;
      }

      // 设置激活状态选项卡
      _this._setActive();

      // 监听窗口大小变化事件，调整指示器位置
      $window.on('resize', $.throttle(function () {
        _this._setIndicatorPosition();
      }, 100));

      // 监听点击选项卡事件
      _this.$tabs.each(function (i, tab) {
        _this._bindTabEvent(tab);
      });
    }

    /**
     * 绑定在 Tab 上点击或悬浮的事件
     * @private
     */
    Tab.prototype._bindTabEvent = function (tab) {
      var _this = this;
      var $tab = $(tab);

      // 点击或鼠标移入触发的事件
      var clickEvent = function (e) {
        // 禁用状态的选项无法选中
        if (isDisabled($tab)) {
          e.preventDefault();
          return;
        }

        _this.activeIndex = _this.$tabs.index(tab);
        _this._setActive();
      };

      // 无论 trigger 是 click 还是 hover，都会响应 click 事件
      $tab.on('click', clickEvent);

      // trigger 为 hover 时，额外响应 mouseenter 事件
      if (_this.options.trigger === 'hover') {
        $tab.on('mouseenter', clickEvent);
      }

      $tab.on('click', function (e) {
        // 阻止链接的默认点击动作
        if ($tab.attr('href').indexOf('#') === 0) {
          e.preventDefault();
        }
      });
    };

    /**
     * 设置激活状态的选项卡
     * @private
     */
    Tab.prototype._setActive = function () {
      var _this = this;

      _this.$tabs.each(function (i, tab) {
        var $tab = $(tab);
        var targetId = $tab.attr('href');

        // 设置选项卡激活状态
        if (i === _this.activeIndex && !isDisabled($tab)) {
          if (!$tab.hasClass('mdui-tab-active')) {
            componentEvent('change', 'tab', _this, _this.$tab, {
              index: _this.activeIndex,
              id: targetId.substr(1),
            });
            componentEvent('show', 'tab', _this, $tab);

            $tab.addClass('mdui-tab-active');
          }

          $(targetId).show();
          _this._setIndicatorPosition();
        } else {
          $tab.removeClass('mdui-tab-active');
          $(targetId).hide();
        }
      });
    };

    /**
     * 设置选项卡指示器的位置
     */
    Tab.prototype._setIndicatorPosition = function () {
      var _this = this;
      var $activeTab;
      var activeTabOffset;

      // 选项卡数量为 0 时，不显示指示器
      if (_this.activeIndex === false) {
        _this.$indicator.css({
          left: 0,
          width: 0,
        });

        return;
      }

      $activeTab = _this.$tabs.eq(_this.activeIndex);
      if (isDisabled($activeTab)) {
        return;
      }

      activeTabOffset = $activeTab.offset();
      _this.$indicator.css({
        left: activeTabOffset.left + _this.$tab[0].scrollLeft -
              _this.$tab[0].getBoundingClientRect().left + 'px',
        width: $activeTab.width() + 'px',
      });
    };

    /**
     * 切换到下一个选项卡
     */
    Tab.prototype.next = function () {
      var _this = this;

      if (_this.activeIndex === false) {
        return;
      }

      if (_this.$tabs.length > _this.activeIndex + 1) {
        _this.activeIndex++;
      } else if (_this.options.loop) {
        _this.activeIndex = 0;
      }

      _this._setActive();
    };

    /**
     * 切换到上一个选项卡
     */
    Tab.prototype.prev = function () {
      var _this = this;

      if (_this.activeIndex === false) {
        return;
      }

      if (_this.activeIndex > 0) {
        _this.activeIndex--;
      } else if (_this.options.loop) {
        _this.activeIndex = _this.$tabs.length - 1;
      }

      _this._setActive();
    };

    /**
     * 显示指定序号或指定id的选项卡
     * @param index 从0开始的序号，或以#开头的id
     */
    Tab.prototype.show = function (index) {
      var _this = this;

      if (_this.activeIndex === false) {
        return;
      }

      if (parseInt(index) === index) {
        _this.activeIndex = index;
      } else {
        _this.$tabs.each(function (i, tab) {
          if (tab.id === index) {
            _this.activeIndex = i;
            return false;
          }
        });
      }

      _this._setActive();
    };

    /**
     * 在父元素的宽度变化时，需要调用该方法重新调整指示器位置
     * 在添加或删除选项卡时，需要调用该方法
     */
    Tab.prototype.handleUpdate = function () {
      var _this = this;

      var $oldTabs = _this.$tabs;               // 旧的 tabs JQ对象
      var $newTabs = _this.$tab.children('a');  // 新的 tabs JQ对象
      var oldTabsEle = $oldTabs.get();          // 旧 tabs 的元素数组
      var newTabsEle = $newTabs.get();          // 新的 tabs 元素数组

      if (!$newTabs.length) {
        _this.activeIndex = false;
        _this.$tabs = $newTabs;
        _this._setIndicatorPosition();

        return;
      }

      // 重新遍历选项卡，找出新增的选项卡
      $newTabs.each(function (i, tab) {
        // 有新增的选项卡
        if (oldTabsEle.indexOf(tab) < 0) {
          _this._bindTabEvent(tab);

          if (_this.activeIndex === false) {
            _this.activeIndex = 0;
          } else if (i <= _this.activeIndex) {
            _this.activeIndex++;
          }
        }
      });

      // 找出被移除的选项卡
      $oldTabs.each(function (i, tab) {
        // 有被移除的选项卡
        if (newTabsEle.indexOf(tab) < 0) {

          if (i < _this.activeIndex) {
            _this.activeIndex--;
          } else if (i === _this.activeIndex) {
            _this.activeIndex = 0;
          }
        }
      });

      _this.$tabs = $newTabs;

      _this._setActive();
    };

    return Tab;
  })();


  /**
   * =============================================================================
   * ************   Tab 自定义属性 API   ************
   * =============================================================================
   */

  $(function () {
    mdui.mutation('[mdui-tab]', function () {
      var $this = $(this);
      var inst = $this.data('mdui.tab');
      if (!inst) {
        inst = new mdui.Tab($this, parseOptions($this.attr('mdui-tab')));
        $this.data('mdui.tab', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   Drawer 抽屉栏   ************
   * =============================================================================
   *
   * 在桌面设备上默认显示抽屉栏，不显示遮罩层
   * 在手机和平板设备上默认不显示抽屉栏，始终显示遮罩层，且覆盖导航栏
   */

  mdui.Drawer = (function () {

    /**
     * 默认参数
     * @type {{}}
     */
    var DEFAULT = {
      // 在桌面设备上是否显示遮罩层。手机和平板不受这个参数影响，始终会显示遮罩层
      overlay: false,

      // 是否开启手势
      swipe: false,
    };

    var isDesktop = function () {
      return $window.width() >= 1024;
    };

    /**
     * 抽屉栏实例
     * @param selector 选择器或 HTML 字符串或 DOM 元素
     * @param opts
     * @constructor
     */
    function Drawer(selector, opts) {
      var _this = this;

      _this.$drawer = $(selector).eq(0);
      if (!_this.$drawer.length) {
        return;
      }

      var oldInst = _this.$drawer.data('mdui.drawer');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));

      _this.overlay = false; // 是否显示着遮罩层
      _this.position = _this.$drawer.hasClass('mdui-drawer-right') ? 'right' : 'left';

      if (_this.$drawer.hasClass('mdui-drawer-close')) {
        _this.state = 'closed';
      } else if (_this.$drawer.hasClass('mdui-drawer-open')) {
        _this.state = 'opened';
      } else if (isDesktop()) {
        _this.state = 'opened';
      } else {
        _this.state = 'closed';
      }

      // 浏览器窗口大小调整时
      $window.on('resize', $.throttle(function () {
        // 由手机平板切换到桌面时
        if (isDesktop()) {
          // 如果显示着遮罩，则隐藏遮罩
          if (_this.overlay && !_this.options.overlay) {
            $.hideOverlay();
            _this.overlay = false;
            $.unlockScreen();
          }

          // 没有强制关闭，则状态为打开状态
          if (!_this.$drawer.hasClass('mdui-drawer-close')) {
            _this.state = 'opened';
          }
        }

        // 由桌面切换到手机平板时。如果抽屉栏是打开着的且没有遮罩层，则关闭抽屉栏
        else {
          if (!_this.overlay && _this.state === 'opened') {
            // 抽屉栏处于强制打开状态，添加遮罩
            if (_this.$drawer.hasClass('mdui-drawer-open')) {
              $.showOverlay();
              _this.overlay = true;
              $.lockScreen();

              $('.mdui-overlay').one('click', function () {
                _this.close();
              });
            } else {
              _this.state = 'closed';
            }
          }
        }
      }, 100));

      // 绑定关闭按钮事件
      _this.$drawer.find('[mdui-drawer-close]').each(function () {
        $(this).on('click', function () {
          _this.close();
        });
      });

      swipeSupport(_this);
    }

    /**
     * 滑动手势支持
     * @param _this
     */
    var swipeSupport = function (_this) {
      // 抽屉栏滑动手势控制
      var openNavEventHandler;
      var touchStartX;
      var touchStartY;
      var swipeStartX;
      var swiping = false;
      var maybeSwiping = false;
      var $body = $('body');

      // 手势触发的范围
      var swipeAreaWidth = 24;

      function enableSwipeHandling() {
        if (!openNavEventHandler) {
          $body.on('touchstart', onBodyTouchStart);
          openNavEventHandler = onBodyTouchStart;
        }
      }

      function setPosition(translateX, closeTransform) {
        var rtlTranslateMultiplier = _this.position === 'right' ? -1 : 1;
        var transformCSS = 'translate(' + (-1 * rtlTranslateMultiplier * translateX) + 'px, 0) !important;';
        _this.$drawer.css(
          'cssText',
          'transform:' + transformCSS + (closeTransform ? 'transition: initial !important;' : '')
        );
      }

      function cleanPosition() {
        _this.$drawer.css({
          transform: '',
          transition: '',
        });
      }

      function getMaxTranslateX() {
        return _this.$drawer.width() + 10;
      }

      function getTranslateX(currentX) {
        return Math.min(
          Math.max(
            swiping === 'closing' ? (swipeStartX - currentX) : (getMaxTranslateX() + swipeStartX - currentX),
            0
          ),
          getMaxTranslateX()
        );
      }

      function onBodyTouchStart(event) {
        touchStartX = event.touches[0].pageX;
        if (_this.position === 'right') {
          touchStartX = $body.width() - touchStartX;
        }

        touchStartY = event.touches[0].pageY;

        if (_this.state !== 'opened') {
          if (touchStartX > swipeAreaWidth || openNavEventHandler !== onBodyTouchStart) {
            return;
          }
        }

        maybeSwiping = true;

        $body.on({
          touchmove: onBodyTouchMove,
          touchend: onBodyTouchEnd,
          touchcancel: onBodyTouchMove,
        });
      }

      function onBodyTouchMove(event) {
        var touchX = event.touches[0].pageX;
        if (_this.position === 'right') {
          touchX = $body.width() - touchX;
        }

        var touchY = event.touches[0].pageY;

        if (swiping) {
          setPosition(getTranslateX(touchX), true);
        } else if (maybeSwiping) {
          var dXAbs = Math.abs(touchX - touchStartX);
          var dYAbs = Math.abs(touchY - touchStartY);
          var threshold = 8;

          if (dXAbs > threshold && dYAbs <= threshold) {
            swipeStartX = touchX;
            swiping = _this.state === 'opened' ? 'closing' : 'opening';
            $.lockScreen();
            setPosition(getTranslateX(touchX), true);
          } else if (dXAbs <= threshold && dYAbs > threshold) {
            onBodyTouchEnd();
          }
        }
      }

      function onBodyTouchEnd(event) {
        if (swiping) {
          var touchX = event.changedTouches[0].pageX;
          if (_this.position === 'right') {
            touchX = $body.width() - touchX;
          }

          var translateRatio = getTranslateX(touchX) / getMaxTranslateX();

          maybeSwiping = false;
          var swipingState = swiping;
          swiping = null;

          if (swipingState === 'opening') {
            if (translateRatio < 0.92) {
              cleanPosition();
              _this.open();
            } else {
              cleanPosition();
            }
          } else {
            if (translateRatio > 0.08) {
              cleanPosition();
              _this.close();
            } else {
              cleanPosition();
            }
          }

          $.unlockScreen();
        } else {
          maybeSwiping = false;
        }

        $body.off({
          touchmove: onBodyTouchMove,
          touchend: onBodyTouchEnd,
          touchcancel: onBodyTouchMove,
        });
      }

      if (_this.options.swipe) {
        enableSwipeHandling();
      }
    };

    /**
     * 动画结束回调
     * @param inst
     */
    var transitionEnd = function (inst) {
      if (inst.$drawer.hasClass('mdui-drawer-open')) {
        inst.state = 'opened';
        componentEvent('opened', 'drawer', inst, inst.$drawer);
      } else {
        inst.state = 'closed';
        componentEvent('closed', 'drawer', inst, inst.$drawer);
      }
    };

    /**
     * 打开抽屉栏
     */
    Drawer.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      _this.state = 'opening';
      componentEvent('open', 'drawer', _this, _this.$drawer);

      if (!_this.options.overlay) {
        $('body').addClass('mdui-drawer-body-' + _this.position);
      }

      _this.$drawer
        .removeClass('mdui-drawer-close')
        .addClass('mdui-drawer-open')
        .transitionEnd(function () {
          transitionEnd(_this);
        });

      if (!isDesktop() || _this.options.overlay) {
        _this.overlay = true;
        $.showOverlay().one('click', function () {
          _this.close();
        });

        $.lockScreen();
      }
    };

    /**
     * 关闭抽屉栏
     */
    Drawer.prototype.close = function () {
      var _this = this;

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      _this.state = 'closing';
      componentEvent('close', 'drawer', _this, _this.$drawer);

      if (!_this.options.overlay) {
        $('body').removeClass('mdui-drawer-body-' + _this.position);
      }

      _this.$drawer
        .addClass('mdui-drawer-close')
        .removeClass('mdui-drawer-open')
        .transitionEnd(function () {
          transitionEnd(_this);
        });

      if (_this.overlay) {
        $.hideOverlay();
        _this.overlay = false;
        $.unlockScreen();
      }
    };

    /**
     * 切换抽屉栏打开/关闭状态
     */
    Drawer.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    /**
     * 获取抽屉栏状态
     * @returns {'opening'|'opened'|'closing'|'closed'}
     */
    Drawer.prototype.getState = function () {
      return this.state;
    };

    return Drawer;

  })();


  /**
   * =============================================================================
   * ************   Drawer 自定义属性 API   ************
   * =============================================================================
   */

  $(function () {
    mdui.mutation('[mdui-drawer]', function () {
      var $this = $(this);
      var options = parseOptions($this.attr('mdui-drawer'));
      var selector = options.target;
      delete options.target;

      var $drawer = $(selector).eq(0);

      var inst = $drawer.data('mdui.drawer');
      if (!inst) {
        inst = new mdui.Drawer($drawer, options);
        $drawer.data('mdui.drawer', inst);
      }

      $this.on('click', function () {
        inst.toggle();
      });

    });
  });


  /**
   * =============================================================================
   * ************   Dialog 对话框   ************
   * =============================================================================
   */

  mdui.Dialog = (function () {

    /**
     * 默认参数
     */
    var DEFAULT = {
      history: true,                // 监听 hashchange 事件
      overlay: true,                // 打开对话框时是否显示遮罩
      modal: false,                 // 是否模态化对话框，为 false 时点击对话框外面区域关闭对话框，为 true 时不关闭
      closeOnEsc: true,             // 按下 esc 关闭对话框
      closeOnCancel: true,          // 按下取消按钮时关闭对话框
      closeOnConfirm: true,         // 按下确认按钮时关闭对话框
      destroyOnClosed: false,        // 关闭后销毁
    };

    /**
     * 遮罩层元素
     */
    var $overlay;

    /**
     * 窗口是否已锁定
     */
    var isLockScreen;

    /**
     * 当前对话框实例
     */
    var currentInst;

    /**
     * 队列名
     */
    var queueName = '__md_dialog';

    /**
     * 窗口宽度变化，或对话框内容变化时，调整对话框位置和对话框内的滚动条
     */
    var readjust = function () {
      if (!currentInst) {
        return;
      }

      var $dialog = currentInst.$dialog;

      var $dialogTitle = $dialog.children('.mdui-dialog-title');
      var $dialogContent = $dialog.children('.mdui-dialog-content');
      var $dialogActions = $dialog.children('.mdui-dialog-actions');

      // 调整 dialog 的 top 和 height 值
      $dialog.height('');
      $dialogContent.height('');

      var dialogHeight = $dialog.height();
      $dialog.css({
        top: (($window.height() - dialogHeight) / 2) + 'px',
        height: dialogHeight + 'px',
      });

      // 调整 mdui-dialog-content 的高度
      $dialogContent.height(dialogHeight - ($dialogTitle.height() || 0) - ($dialogActions.height() || 0));
    };

    /**
     * hashchange 事件触发时关闭对话框
     */
    var hashchangeEvent = function () {
      if (location.hash.substring(1).indexOf('mdui-dialog') < 0) {
        currentInst.close(true);
      }
    };

    /**
     * 点击遮罩层关闭对话框
     * @param e
     */
    var overlayClick = function (e) {
      if ($(e.target).hasClass('mdui-overlay') && currentInst) {
        currentInst.close();
      }
    };

    /**
     * 对话框实例
     * @param selector 选择器或 HTML 字符串或 DOM 元素
     * @param opts
     * @constructor
     */
    function Dialog(selector, opts) {
      var _this = this;

      // 对话框元素
      _this.$dialog = $(selector).eq(0);
      if (!_this.$dialog.length) {
        return;
      }

      // 已通过 data 属性实例化过，不再重复实例化
      var oldInst = _this.$dialog.data('mdui.dialog');
      if (oldInst) {
        return oldInst;
      }

      // 如果对话框元素没有在当前文档中，则需要添加
      if (!$.contains(document.body, _this.$dialog[0])) {
        _this.append = true;
        $('body').append(_this.$dialog);
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));
      _this.state = 'closed';

      // 绑定取消按钮事件
      _this.$dialog.find('[mdui-dialog-cancel]').each(function () {
        $(this).on('click', function () {
          componentEvent('cancel', 'dialog', _this, _this.$dialog);
          if (_this.options.closeOnCancel) {
            _this.close();
          }
        });
      });

      // 绑定确认按钮事件
      _this.$dialog.find('[mdui-dialog-confirm]').each(function () {
        $(this).on('click', function () {
          componentEvent('confirm', 'dialog', _this, _this.$dialog);
          if (_this.options.closeOnConfirm) {
            _this.close();
          }
        });
      });

      // 绑定关闭按钮事件
      _this.$dialog.find('[mdui-dialog-close]').each(function () {
        $(this).on('click', function () {
          _this.close();
        });
      });
    }

    /**
     * 动画结束回调
     * @param inst
     */
    var transitionEnd = function (inst) {
      if (inst.$dialog.hasClass('mdui-dialog-open')) {
        inst.state = 'opened';
        componentEvent('opened', 'dialog', inst, inst.$dialog);
      } else {
        inst.state = 'closed';
        componentEvent('closed', 'dialog', inst, inst.$dialog);

        inst.$dialog.hide();

        // 所有对话框都关闭，且当前没有打开的对话框时，解锁屏幕
        if (queue.queue(queueName).length === 0 && !currentInst && isLockScreen) {
          $.unlockScreen();
          isLockScreen = false;
        }

        $window.off('resize', $.throttle(function () {
          readjust();
        }, 100));

        if (inst.options.destroyOnClosed) {
          inst.destroy();
        }
      }
    };

    /**
     * 打开指定对话框
     * @private
     */
    Dialog.prototype._doOpen = function () {
      var _this = this;

      currentInst = _this;

      if (!isLockScreen) {
        $.lockScreen();
        isLockScreen = true;
      }

      _this.$dialog.show();

      readjust();
      $window.on('resize', $.throttle(function () {
        readjust();
      }, 100));

      // 打开消息框
      _this.state = 'opening';
      componentEvent('open', 'dialog', _this, _this.$dialog);

      _this.$dialog
        .addClass('mdui-dialog-open')
        .transitionEnd(function () {
          transitionEnd(_this);
        });

      // 不存在遮罩层元素时，添加遮罩层
      if (!$overlay) {
        $overlay = $.showOverlay(5100);
      }

      $overlay

        // 点击遮罩层时是否关闭对话框
        [_this.options.modal ? 'off' : 'on']('click', overlayClick)

        // 是否显示遮罩层，不显示时，把遮罩层背景透明
        .css('opacity', _this.options.overlay ? '' : 0);

      if (_this.options.history) {
        // 如果 hash 中原来就有 mdui-dialog，先删除，避免后退历史纪录后仍然有 mdui-dialog 导致无法关闭
        // 包括 mdui-dialog 和 &mdui-dialog 和 ?mdui-dialog
        var hash = location.hash.substring(1);
        if (hash.indexOf('mdui-dialog') > -1) {
          hash = hash.replace(/[&?]?mdui-dialog/g, '');
        }

        // 后退按钮关闭对话框
        if (hash) {
          location.hash = hash + (hash.indexOf('?') > -1 ? '&' : '?') + 'mdui-dialog';
        } else {
          location.hash = 'mdui-dialog';
        }

        $window.on('hashchange', hashchangeEvent);
      }
    };

    /**
     * 打开对话框
     */
    Dialog.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      // 如果当前有正在打开或已经打开的对话框,或队列不为空，则先加入队列，等旧对话框开始关闭时再打开
      if (
        (currentInst && (currentInst.state === 'opening' || currentInst.state === 'opened')) ||
        queue.queue(queueName).length
      ) {
        queue.queue(queueName, function () {
          _this._doOpen();
        });

        return;
      }

      _this._doOpen();
    };

    /**
     * 关闭对话框
     */
    Dialog.prototype.close = function () {
      var _this = this;
      var _arguments = arguments;

      // setTimeout 的作用是：
      // 当同时关闭一个对话框，并打开另一个对话框时，使打开对话框的操作先执行，以使需要打开的对话框先加入队列
      setTimeout(function () {
        if (_this.state === 'closing' || _this.state === 'closed') {
          return;
        }

        currentInst = null;

        _this.state = 'closing';
        componentEvent('close', 'dialog', _this, _this.$dialog);

        // 所有对话框都关闭，且当前没有打开的对话框时，隐藏遮罩
        if (queue.queue(queueName).length === 0 && $overlay) {
          $.hideOverlay();
          $overlay = null;
        }

        _this.$dialog
          .removeClass('mdui-dialog-open')
          .transitionEnd(function () {
            transitionEnd(_this);
          });

        if (_this.options.history && queue.queue(queueName).length === 0) {
          // 是否需要后退历史纪录，默认为 false。
          // 为 false 时是通过 js 关闭，需要后退一个历史记录
          // 为 true 时是通过后退按钮关闭，不需要后退历史记录
          if (!_arguments[0]) {
            window.history.back();
          }

          $window.off('hashchange', hashchangeEvent);
        }

        // 关闭旧对话框，打开新对话框。
        // 加一点延迟，仅仅为了视觉效果更好。不加延时也不影响功能
        setTimeout(function () {
          queue.dequeue(queueName);
        }, 100);
      }, 0);
    };

    /**
     * 切换对话框打开/关闭状态
     */
    Dialog.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    /**
     * 获取对话框状态
     * @returns {'opening'|'opened'|'closing'|'closed'}
     */
    Dialog.prototype.getState = function () {
      return this.state;
    };

    /**
     * 销毁对话框
     */
    Dialog.prototype.destroy = function () {
      var _this = this;

      if (_this.append) {
        _this.$dialog.remove();
      }

      _this.$dialog.removeData('mdui.dialog');

      if (queue.queue(queueName).length === 0 && !currentInst) {
        if ($overlay) {
          $.hideOverlay();
          $overlay = null;
        }

        if (isLockScreen) {
          $.unlockScreen();
          isLockScreen = false;
        }
      }
    };

    /**
     * 对话框内容变化时，需要调用该方法来调整对话框位置和滚动条高度
     */
    Dialog.prototype.handleUpdate = function () {
      readjust();
    };

    // esc 按下时关闭对话框
    $document.on('keydown', function (e) {
      if (
        currentInst &&
        currentInst.options.closeOnEsc &&
        currentInst.state === 'opened' &&
        e.keyCode === 27
      ) {
        currentInst.close();
      }
    });

    return Dialog;

  })();


  /**
   * =============================================================================
   * ************   Dialog DATA API   ************
   * =============================================================================
   */

  $(function () {
    $document.on('click', '[mdui-dialog]', function () {
      var $this = $(this);
      var options = parseOptions($this.attr('mdui-dialog'));
      var selector = options.target;
      delete options.target;

      var $dialog = $(selector).eq(0);

      var inst = $dialog.data('mdui.dialog');
      if (!inst) {
        inst = new mdui.Dialog($dialog, options);
        $dialog.data('mdui.dialog', inst);
      }

      inst.open();
    });
  });


  /**
   * =============================================================================
   * ************   mdui.dialog(options)   ************
   * =============================================================================
   */

  mdui.dialog = function (options) {

    /**
     * 默认参数
     */
    var DEFAULT = {
      title: '',                // 标题
      content: '',              // 文本
      buttons: [],              // 按钮
      stackedButtons: false,    // 垂直排列按钮
      cssClass: '',             // 在 Dialog 上添加的 CSS 类
      history: true,            // 监听 hashchange 事件
      overlay: true,            // 是否显示遮罩
      modal: false,             // 是否模态化对话框
      closeOnEsc: true,         // 按下 esc 时关闭对话框
      destroyOnClosed: true,    // 关闭后销毁
      onOpen: function () {     // 打开动画开始时的回调
      },

      onOpened: function () {   // 打开动画结束后的回调
      },

      onClose: function () {    // 关闭动画开始时的回调
      },

      onClosed: function () {   // 关闭动画结束时的回调
      },
    };

    /**
     * 按钮的默认参数
     */
    var DEFAULT_BUTTON = {
      text: '',                   // 按钮文本
      bold: false,                // 按钮文本是否加粗
      close: true,                // 点击按钮后关闭对话框
      onClick: function (inst) {  // 点击按钮的回调
      },
    };

    // 合并参数
    options = $.extend({}, DEFAULT, (options || {}));
    $.each(options.buttons, function (i, button) {
      options.buttons[i] = $.extend({}, DEFAULT_BUTTON, button);
    });

    // 按钮的 HTML
    var buttonsHTML = '';
    if (options.buttons.length) {
      buttonsHTML =
        '<div class="mdui-dialog-actions ' +
          (options.stackedButtons ? 'mdui-dialog-actions-stacked' : '') +
        '">';
      $.each(options.buttons, function (i, button) {
        buttonsHTML +=
          '<a href="javascript:void(0)" ' +
            'class="mdui-btn mdui-ripple mdui-text-color-primary ' +
            (button.bold ? 'mdui-btn-bold' : '') + '">' +
            button.text +
          '</a>';
      });

      buttonsHTML += '</div>';
    }

    // Dialog 的 HTML
    var HTML =
      '<div class="mdui-dialog ' + options.cssClass + '">' +
        (options.title ? '<div class="mdui-dialog-title">' + options.title + '</div>' : '') +
        (options.content ? '<div class="mdui-dialog-content">' + options.content + '</div>' : '') +
        buttonsHTML +
      '</div>';

    // 实例化 Dialog
    var inst = new mdui.Dialog(HTML, {
      history: options.history,
      overlay: options.overlay,
      modal: options.modal,
      closeOnEsc: options.closeOnEsc,
      destroyOnClosed: options.destroyOnClosed,
    });

    // 绑定按钮事件
    if (options.buttons.length) {
      inst.$dialog.find('.mdui-dialog-actions .mdui-btn').each(function (i, button) {
        $(button).on('click', function () {
          if (typeof options.buttons[i].onClick === 'function') {
            options.buttons[i].onClick(inst);
          }

          if (options.buttons[i].close) {
            inst.close();
          }
        });
      });
    }

    // 绑定打开关闭事件
    if (typeof options.onOpen === 'function') {
      inst.$dialog
        .on('open.mdui.dialog', function () {
          options.onOpen(inst);
        })
        .on('opened.mdui.dialog', function () {
          options.onOpened(inst);
        })
        .on('close.mdui.dialog', function () {
          options.onClose(inst);
        })
        .on('closed.mdui.dialog', function () {
          options.onClosed(inst);
        });
    }

    inst.open();

    return inst;
  };


  /**
   * =============================================================================
   * ************   mdui.alert(text, title, onConfirm, options)   ************
   * ************   mdui.alert(text, onConfirm, options)   ************
   * =============================================================================
   */

  mdui.alert = function (text, title, onConfirm, options) {

    // title 参数可选
    if (typeof title === 'function') {
      title = '';
      onConfirm = arguments[1];
      options = arguments[2];
    }

    if (onConfirm === undefined) {
      onConfirm = function () {};
    }

    if (options === undefined) {
      options = {};
    }

    /**
     * 默认参数
     */
    var DEFAULT = {
      confirmText: 'ok',             // 按钮上的文本
      history: true,                 // 监听 hashchange 事件
      modal: false,                  // 是否模态化对话框，为 false 时点击对话框外面区域关闭对话框，为 true 时不关闭
      closeOnEsc: true,              // 按下 esc 关闭对话框
    };

    options = $.extend({}, DEFAULT, options);

    return mdui.dialog({
      title: title,
      content: text,
      buttons: [
        {
          text: options.confirmText,
          bold: false,
          close: true,
          onClick: onConfirm,
        },
      ],
      cssClass: 'mdui-dialog-alert',
      history: options.history,
      modal: options.modal,
      closeOnEsc: options.closeOnEsc,
    });
  };


  /**
   * =============================================================================
   * ************   mdui.confirm(text, title, onConfirm, onCancel, options)   ************
   * ************   mdui.confirm(text, onConfirm, onCancel, options)          ************
   * =============================================================================
   */

  mdui.confirm = function (text, title, onConfirm, onCancel, options) {

    // title 参数可选
    if (typeof title === 'function') {
      title = '';
      onConfirm = arguments[1];
      onCancel = arguments[2];
      options = arguments[3];
    }

    if (onConfirm === undefined) {
      onConfirm = function () {};
    }

    if (onCancel === undefined) {
      onCancel = function () {};
    }

    if (options === undefined) {
      options = {};
    }

    /**
     * 默认参数
     */
    var DEFAULT = {
      confirmText: 'ok',            // 确认按钮的文本
      cancelText: 'cancel',         // 取消按钮的文本
      history: true,                // 监听 hashchange 事件
      modal: false,                 // 是否模态化对话框，为 false 时点击对话框外面区域关闭对话框，为 true 时不关闭
      closeOnEsc: true,             // 按下 esc 关闭对话框
    };

    options = $.extend({}, DEFAULT, options);

    return mdui.dialog({
      title: title,
      content: text,
      buttons: [
        {
          text: options.cancelText,
          bold: false,
          close: true,
          onClick: onCancel,
        },
        {
          text: options.confirmText,
          bold: false,
          close: true,
          onClick: onConfirm,
        },
      ],
      cssClass: 'mdui-dialog-confirm',
      history: options.history,
      modal: options.modal,
      closeOnEsc: options.closeOnEsc,
    });
  };


  /**
   * =============================================================================
   * ************   mdui.prompt(label, title, onConfirm, onCancel, options)   ************
   * ************   mdui.prompt(label, onConfirm, onCancel, options)          ************
   * =============================================================================
   */

  mdui.prompt = function (label, title, onConfirm, onCancel, options) {

    // title 参数可选
    if (typeof title === 'function') {
      title = '';
      onConfirm = arguments[1];
      onCancel = arguments[2];
      options = arguments[3];
    }

    if (onConfirm === undefined) {
      onConfirm = function () {};
    }

    if (onCancel === undefined) {
      onCancel = function () {};
    }

    if (options === undefined) {
      options = {};
    }

    /**
     * 默认参数
     */
    var DEFAULT = {
      confirmText: 'ok',        // 确认按钮的文本
      cancelText: 'cancel',     // 取消按钮的文本
      history: true,            // 监听 hashchange 事件
      modal: false,             // 是否模态化对话框，为 false 时点击对话框外面区域关闭对话框，为 true 时不关闭
      closeOnEsc: true,         // 按下 esc 关闭对话框
      type: 'text',             // 输入框类型，text: 单行文本框 textarea: 多行文本框
      maxlength: '',            // 最大输入字符数
      defaultValue: '',         // 输入框中的默认文本
      confirmOnEnter: false,    // 按下 enter 确认输入内容
    };

    options = $.extend({}, DEFAULT, options);

    var content =
      '<div class="mdui-textfield">' +
        (label ? '<label class="mdui-textfield-label">' + label + '</label>' : '') +
        (options.type === 'text' ?
          '<input class="mdui-textfield-input" type="text" ' +
            'value="' + options.defaultValue + '" ' +
            (options.maxlength ? ('maxlength="' + options.maxlength + '"') : '') + '/>' :
          '') +
        (options.type === 'textarea' ?
          '<textarea class="mdui-textfield-input" ' +
            (options.maxlength ? ('maxlength="' + options.maxlength + '"') : '') + '>' +
              options.defaultValue +
          '</textarea>' :
          '') +
      '</div>';

    var onCancelClick = onCancel;
    if (typeof onCancel === 'function') {
      onCancelClick = function (inst) {
        var value = inst.$dialog.find('.mdui-textfield-input').val();
        onCancel(value, inst);
      }
    }

    var onConfirmClick = onConfirm;
    if (typeof onConfirm === 'function') {
      onConfirmClick = function (inst) {
        var value = inst.$dialog.find('.mdui-textfield-input').val();
        onConfirm(value, inst);
      }
    }

    return mdui.dialog({
      title: title,
      content: content,
      buttons: [
        {
          text: options.cancelText,
          bold: false,
          close: true,
          onClick: onCancelClick,
        },
        {
          text: options.confirmText,
          bold: false,
          close: true,
          onClick: onConfirmClick,
        },
      ],
      cssClass: 'mdui-dialog-prompt',
      history: options.history,
      modal: options.modal,
      closeOnEsc: options.closeOnEsc,
      onOpen: function (inst) {

        // 初始化输入框
        var $input = inst.$dialog.find('.mdui-textfield-input');
        mdui.updateTextFields($input);

        // 聚焦到输入框
        $input[0].focus();

        // 捕捉文本框回车键，在单行文本框的情况下触发回调
        if (options.type === 'text' && options.confirmOnEnter === true) {
          $input.on('keydown', function (event) {
            if (event.keyCode === 13) {
              var value = inst.$dialog.find('.mdui-textfield-input').val();
              onConfirm(value, inst);
              inst.close();
            }
          });
        }

        // 如果是多行输入框，监听输入框的 input 事件，更新对话框高度
        if (options.type === 'textarea') {
          $input.on('input', function () {
            inst.handleUpdate();
          });
        }

        // 有字符数限制时，加载完文本框后 DOM 会变化，需要更新对话框高度
        if (options.maxlength) {
          inst.handleUpdate();
        }
      },
    });

  };


  /**
   * =============================================================================
   * ************   ToolTip 工具提示   ************
   * =============================================================================
   */

  mdui.Tooltip = (function () {

    /**
     * 默认参数
     */
    var DEFAULT = {
      position: 'auto',     // 提示所在位置
      delay: 0,             // 延迟，单位毫秒
      content: '',          // 提示文本，允许包含 HTML
    };

    /**
     * 是否是桌面设备
     * @returns {boolean}
     */
    var isDesktop = function () {
      return $window.width() > 1024;
    };

    /**
     * 设置 Tooltip 的位置
     * @param inst
     */
    function setPosition(inst) {
      var marginLeft;
      var marginTop;
      var position;

      // 触发的元素
      var targetProps = inst.$target[0].getBoundingClientRect();

      // 触发的元素和 Tooltip 之间的距离
      var targetMargin = (isDesktop() ? 14 : 24);

      // Tooltip 的宽度和高度
      var tooltipWidth = inst.$tooltip[0].offsetWidth;
      var tooltipHeight = inst.$tooltip[0].offsetHeight;

      // Tooltip 的方向
      position = inst.options.position;

      // 自动判断位置，加 2px，使 Tooltip 距离窗口边框至少有 2px 的间距
      if (['bottom', 'top', 'left', 'right'].indexOf(position) === -1) {
        if (
          targetProps.top + targetProps.height + targetMargin + tooltipHeight + 2 <
          $window.height()
        ) {
          position = 'bottom';
        } else if (targetMargin + tooltipHeight + 2 < targetProps.top) {
          position = 'top';
        } else if (targetMargin + tooltipWidth + 2 < targetProps.left) {
          position = 'left';
        } else if (
          targetProps.width + targetMargin + tooltipWidth + 2 <
          $window.width() - targetProps.left
        ) {
          position = 'right';
        } else {
          position = 'bottom';
        }
      }

      // 设置位置
      switch (position) {
        case 'bottom':
          marginLeft = -1 * (tooltipWidth / 2);
          marginTop = (targetProps.height / 2) + targetMargin;
          inst.$tooltip.transformOrigin('top center');
          break;
        case 'top':
          marginLeft = -1 * (tooltipWidth / 2);
          marginTop = -1 * (tooltipHeight + (targetProps.height / 2) + targetMargin);
          inst.$tooltip.transformOrigin('bottom center');
          break;
        case 'left':
          marginLeft = -1 * (tooltipWidth + (targetProps.width / 2) + targetMargin);
          marginTop = -1 * (tooltipHeight / 2);
          inst.$tooltip.transformOrigin('center right');
          break;
        case 'right':
          marginLeft = (targetProps.width / 2) + targetMargin;
          marginTop = -1 * (tooltipHeight / 2);
          inst.$tooltip.transformOrigin('center left');
          break;
      }

      var targetOffset = inst.$target.offset();
      inst.$tooltip.css({
        top: targetOffset.top + (targetProps.height / 2) + 'px',
        left: targetOffset.left + (targetProps.width / 2) + 'px',
        'margin-left': marginLeft + 'px',
        'margin-top': marginTop + 'px',
      });
    }

    /**
     * Tooltip 实例
     * @param selector
     * @param opts
     * @constructor
     */
    function Tooltip(selector, opts) {
      var _this = this;

      _this.$target = $(selector).eq(0);
      if (!_this.$target.length) {
        return;
      }

      // 已通过 data 属性实例化过，不再重复实例化
      var oldInst = _this.$target.data('mdui.tooltip');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));
      _this.state = 'closed';

      // 创建 Tooltip HTML
      _this.$tooltip = $(
        '<div class="mdui-tooltip" id="' + $.guid() + '">' +
          _this.options.content +
        '</div>'
      ).appendTo(document.body);

      // 绑定事件。元素处于 disabled 状态时无法触发鼠标事件，为了统一，把 touch 事件也禁用
      _this.$target
        .on('touchstart mouseenter', function (e) {
          if (this.disabled) {
            return;
          }

          if (!TouchHandler.isAllow(e)) {
            return;
          }

          TouchHandler.register(e);

          _this.open();
        })
        .on('touchend mouseleave', function (e) {
          if (this.disabled) {
            return;
          }

          if (!TouchHandler.isAllow(e)) {
            return;
          }

          _this.close();
        })
        .on(TouchHandler.unlock, function (e) {
          if (this.disabled) {
            return;
          }

          TouchHandler.register(e);
        });
    }

    /**
     * 动画结束回调
     * @private
     */
    var transitionEnd = function (inst) {
      if (inst.$tooltip.hasClass('mdui-tooltip-open')) {
        inst.state = 'opened';
        componentEvent('opened', 'tooltip', inst, inst.$target);
      } else {
        inst.state = 'closed';
        componentEvent('closed', 'tooltip', inst, inst.$target);
      }
    };

    /**
     * 执行打开 Tooltip
     * @private
     */
    Tooltip.prototype._doOpen = function () {
      var _this = this;

      _this.state = 'opening';
      componentEvent('open', 'tooltip', _this, _this.$target);

      _this.$tooltip
        .addClass('mdui-tooltip-open')
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    /**
     * 打开 Tooltip
     * @param opts 允许每次打开时设置不同的参数
     */
    Tooltip.prototype.open = function (opts) {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      var oldOpts = $.extend({}, _this.options);

      // 合并 data 属性参数
      $.extend(_this.options, parseOptions(_this.$target.attr('mdui-tooltip')));
      if (opts) {
        $.extend(_this.options, opts);
      }

      // tooltip 的内容有更新
      if (oldOpts.content !== _this.options.content) {
        _this.$tooltip.html(_this.options.content);
      }

      setPosition(_this);

      if (_this.options.delay) {
        _this.timeoutId = setTimeout(function () {
          _this._doOpen();
        }, _this.options.delay);
      } else {
        _this.timeoutId = false;
        _this._doOpen();
      }
    };

    /**
     * 关闭 Tooltip
     */
    Tooltip.prototype.close = function () {
      var _this = this;

      if (_this.timeoutId) {
        clearTimeout(_this.timeoutId);
        _this.timeoutId = false;
      }

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      _this.state = 'closing';
      componentEvent('close', 'tooltip', _this, _this.$target);

      _this.$tooltip
        .removeClass('mdui-tooltip-open')
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    /**
     * 切换 Tooltip 状态
     */
    Tooltip.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    /**
     * 获取 Tooltip 状态
     * @returns {'opening'|'opened'|'closing'|'closed'}
     */
    Tooltip.prototype.getState = function () {
      return this.state;
    };

    /**
     * 销毁 Tooltip
     */
    /*Tooltip.prototype.destroy = function () {
      var _this = this;
      clearTimeout(_this.timeoutId);
      $.data(_this.target, 'mdui.tooltip', null);
      $.remove(_this.tooltip);
    };*/

    return Tooltip;

  })();


  /**
   * =============================================================================
   * ************   Tooltip DATA API   ************
   * =============================================================================
   */

  $(function () {
    // mouseenter 不能冒泡，所以这里用 mouseover 代替
    $document.on('touchstart mouseover', '[mdui-tooltip]', function () {
      var $this = $(this);

      var inst = $this.data('mdui.tooltip');
      if (!inst) {
        var options = parseOptions($this.attr('mdui-tooltip'));
        inst = new mdui.Tooltip($this, options);
        $this.data('mdui.tooltip', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   Snackbar   ************
   * =============================================================================
   */

  (function () {

    /**
     * 当前打开着的 Snackbar
     */
    var currentInst;

    /**
     * 对列名
     * @type {string}
     */
    var queueName = '__md_snackbar';

    var DEFAULT = {
      timeout: 4000,                  // 在用户没有操作时多长时间自动隐藏
      buttonText: '',                 // 按钮的文本
      buttonColor: '',                // 按钮的颜色，支持 blue #90caf9 rgba(...)
      position: 'bottom',             // 位置 bottom、top、left-top、left-bottom、right-top、right-bottom
      closeOnButtonClick: true,       // 点击按钮时关闭
      closeOnOutsideClick: true,      // 触摸或点击屏幕其他地方时关闭
      onClick: function () {          // 在 Snackbar 上点击的回调
      },

      onButtonClick: function () {    // 点击按钮的回调
      },

      onOpen: function () {           // 打开动画开始时的回调
      },

      onOpened: function () {         // 打开动画结束时的回调
      },

      onClose: function () {          // 关闭动画开始时的回调
      },

      onClosed: function () {         // 打开动画结束时的回调
      },
    };

    /**
     * 点击 Snackbar 外面的区域关闭
     * @param e
     */
    var closeOnOutsideClick = function (e) {
      var $target = $(e.target);
      if (!$target.hasClass('mdui-snackbar') && !$target.parents('.mdui-snackbar').length) {
        currentInst.close();
      }
    };

    /**
     * Snackbar 实例
     * @param message
     * @param opts
     * @constructor
     */
    function Snackbar(message, opts) {
      var _this = this;

      _this.message = message;
      _this.options = $.extend({}, DEFAULT, (opts || {}));

      // message 参数必须
      if (!_this.message) {
        return;
      }

      _this.state = 'closed';

      _this.timeoutId = false;

      // 按钮颜色
      var buttonColorStyle = '';
      var buttonColorClass = '';

      if (
        _this.options.buttonColor.indexOf('#') === 0 ||
        _this.options.buttonColor.indexOf('rgb') === 0
      ) {
        buttonColorStyle = 'style="color:' + _this.options.buttonColor + '"';
      } else if (_this.options.buttonColor !== '') {
        buttonColorClass = 'mdui-text-color-' + _this.options.buttonColor;
      }

      // 添加 HTML
      _this.$snackbar = $(
        '<div class="mdui-snackbar">' +
          '<div class="mdui-snackbar-text">' +
            _this.message +
          '</div>' +
          (_this.options.buttonText ?
            ('<a href="javascript:void(0)" ' +
            'class="mdui-snackbar-action mdui-btn mdui-ripple mdui-ripple-white ' +
              buttonColorClass + '" ' +
              buttonColorStyle + '>' +
              _this.options.buttonText +
            '</a>') :
            ''
          ) +
        '</div>')
        .appendTo(document.body);

      // 设置位置
      _this._setPosition('close');

      _this.$snackbar
        .reflow()
        .addClass('mdui-snackbar-' + _this.options.position);
    }

    /**
     * 设置 Snackbar 的位置
     * @param state
     * @private
     */
    Snackbar.prototype._setPosition = function (state) {
      var _this = this;

      var snackbarHeight = _this.$snackbar[0].clientHeight;
      var position = _this.options.position;

      var translateX;
      var translateY;

      // translateX
      if (position === 'bottom' || position === 'top') {
        translateX = '-50%';
      } else {
        translateX = '0';
      }

      // translateY
      if (state === 'open') {
        translateY = '0';
      } else {
        if (position === 'bottom') {
          translateY = snackbarHeight;
        }

        if (position === 'top') {
          translateY = -snackbarHeight;
        }

        if (position === 'left-top' || position === 'right-top') {
          translateY = -snackbarHeight - 24;
        }

        if (position === 'left-bottom' || position === 'right-bottom') {
          translateY = snackbarHeight + 24;
        }
      }

      _this.$snackbar.transform('translate(' + translateX + ',' + translateY + 'px)');
    };

    /**
     * 打开 Snackbar
     */
    Snackbar.prototype.open = function () {
      var _this = this;

      if (!_this.message) {
        return;
      }

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      // 如果当前有正在显示的 Snackbar，则先加入队列，等旧 Snackbar 关闭后再打开
      if (currentInst) {
        queue.queue(queueName, function () {
          _this.open();
        });

        return;
      }

      currentInst = _this;

      // 开始打开
      _this.state = 'opening';
      _this.options.onOpen();

      _this._setPosition('open');

      _this.$snackbar
        .transitionEnd(function () {
          if (_this.state !== 'opening') {
            return;
          }

          _this.state = 'opened';
          _this.options.onOpened();

          // 有按钮时绑定事件
          if (_this.options.buttonText) {
            _this.$snackbar
              .find('.mdui-snackbar-action')
              .on('click', function () {
                _this.options.onButtonClick();
                if (_this.options.closeOnButtonClick) {
                  _this.close();
                }
              });
          }

          // 点击 snackbar 的事件
          _this.$snackbar.on('click', function (e) {
            if (!$(e.target).hasClass('mdui-snackbar-action')) {
              _this.options.onClick();
            }
          });

          // 点击 Snackbar 外面的区域关闭
          if (_this.options.closeOnOutsideClick) {
            $document.on(TouchHandler.start, closeOnOutsideClick);
          }

          // 超时后自动关闭
          if (_this.options.timeout) {
            _this.timeoutId = setTimeout(function () {
              _this.close();
            }, _this.options.timeout);
          }
        });
    };

    /**
     * 关闭 Snackbar
     */
    Snackbar.prototype.close = function () {
      var _this = this;

      if (!_this.message) {
        return;
      }

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      if (_this.timeoutId) {
        clearTimeout(_this.timeoutId);
      }

      if (_this.options.closeOnOutsideClick) {
        $document.off(TouchHandler.start, closeOnOutsideClick);
      }

      _this.state = 'closing';
      _this.options.onClose();

      _this._setPosition('close');

      _this.$snackbar
        .transitionEnd(function () {
          if (_this.state !== 'closing') {
            return;
          }

          currentInst = null;
          _this.state = 'closed';
          _this.options.onClosed();
          _this.$snackbar.remove();
          queue.dequeue(queueName);
        });
    };

    /**
     * 打开 Snackbar
     * @param message
     * @param opts
     */
    mdui.snackbar = function (message, opts) {
      if (typeof message !== 'string') {
        opts = message;
        message = opts.message;
      }

      var inst = new Snackbar(message, opts);

      inst.open();
      return inst;
    };

  })();


  /**
   * =============================================================================
   * ************   Bottom navigation 底部导航栏   ************
   * =============================================================================
   */

  (function () {

    // 切换导航项
    $document.on('click', '.mdui-bottom-nav>a', function () {
      var $this = $(this);
      var $bottomNav = $this.parent();
      var isThis;
      $bottomNav.children('a').each(function (i, item) {
        isThis = $this.is(item);
        if (isThis) {
          componentEvent('change', 'bottomNav', null, $bottomNav, {
            index: i,
          });
        }

        $(item)[isThis ? 'addClass' : 'removeClass']('mdui-bottom-nav-active');
      });
    });

    // 滚动时隐藏 mdui-bottom-nav-scroll-hide
    mdui.mutation('.mdui-bottom-nav-scroll-hide', function () {
      var $this = $(this);
      var inst = new mdui.Headroom($this, {
        pinnedClass: 'mdui-headroom-pinned-down',
        unpinnedClass: 'mdui-headroom-unpinned-down',
      });
      $this.data('mdui.headroom', inst);
    });

  })();


  /**
   * =============================================================================
   * ************   Spinner 圆形进度条   ************
   * =============================================================================
   */

  (function () {
    /**
     * layer 的 HTML 结构
     */
    var layerHTML = function () {
      var i = arguments.length ? arguments[0] : false;

      return '<div class="mdui-spinner-layer ' + (i ? 'mdui-spinner-layer-' + i : '') + '">' +
                 '<div class="mdui-spinner-circle-clipper mdui-spinner-left">' +
               '<div class="mdui-spinner-circle"></div>' +
               '</div>' +
               '<div class="mdui-spinner-gap-patch">' +
                 '<div class="mdui-spinner-circle"></div>' +
               '</div>' +
               '<div class="mdui-spinner-circle-clipper mdui-spinner-right">' +
                 '<div class="mdui-spinner-circle"></div>' +
               '</div>' +
             '</div>';
    };

    /**
     * 填充 HTML
     * @param spinner
     */
    var fillHTML = function (spinner) {
      var $spinner = $(spinner);
      var layer;
      if ($spinner.hasClass('mdui-spinner-colorful')) {
        layer = layerHTML('1') + layerHTML('2') + layerHTML('3') + layerHTML('4');
      } else {
        layer = layerHTML();
      }

      $spinner.html(layer);
    };

    /**
     * 页面加载完后自动填充 HTML 结构
     */
    $(function () {
      mdui.mutation('.mdui-spinner', function () {
        fillHTML(this);
      });
    });

    /**
     * 更新圆形进度条
     */
    mdui.updateSpinners = function () {
      $(arguments.length ? arguments[0] : '.mdui-spinner').each(function () {
        fillHTML(this);
      });
    };

  })();


  /**
   * =============================================================================
   * ************   Expansion panel 可扩展面板   ************
   * =============================================================================
   */

  mdui.Panel = (function () {

    function Panel(selector, opts) {
      return new CollapsePrivate(selector, opts, 'panel');
    }

    return Panel;

  })();


  /**
   * =============================================================================
   * ************   Expansion panel 自定义属性   ************
   * =============================================================================
   */

  $(function () {
    mdui.mutation('[mdui-panel]', function () {
      var $target = $(this);

      var inst = $target.data('mdui.panel');
      if (!inst) {
        var options = parseOptions($target.attr('mdui-panel'));
        inst = new mdui.Panel($target, options);
        $target.data('mdui.panel', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   Menu 菜单   ************
   * =============================================================================
   */

  mdui.Menu = (function () {

    /**
     * 默认参数
     */
    var DEFAULT = {
      position: 'auto',         // 菜单位置 top、bottom、center、auto
      align: 'auto',            // 菜单和触发它的元素的对齐方式 left、right、center、auto
      gutter: 16,               // 菜单距离窗口边缘的最小距离，单位 px
      fixed: false,             // 是否使菜单固定在窗口，不随滚动条滚动
      covered: 'auto',          // 菜单是否覆盖在触发它的元素上，true、false。auto 时简单菜单覆盖，级联菜单不覆盖
      subMenuTrigger: 'hover',  // 子菜单的触发方式 hover、click
      subMenuDelay: 200,        // 子菜单的触发延时，仅在 submenuTrigger 为 hover 有效
    };

    /**
     * 调整主菜单位置
     * @param _this 实例
     */
    var readjust = function (_this) {
      var menuLeft;
      var menuTop;

      // 菜单位置和方向
      var position;
      var align;

      // window 窗口的宽度和高度
      var windowHeight = $window.height();
      var windowWidth = $window.width();

      // 配置参数
      var gutter = _this.options.gutter;
      var isCovered = _this.isCovered;
      var isFixed = _this.options.fixed;

      // 动画方向参数
      var transformOriginX;
      var transformOriginY;

      // 菜单的原始宽度和高度
      var menuWidth = _this.$menu.width();
      var menuHeight = _this.$menu.height();

      var $anchor = _this.$anchor;

      // 触发菜单的元素在窗口中的位置
      var anchorTmp = $anchor[0].getBoundingClientRect();
      var anchorTop = anchorTmp.top;
      var anchorLeft = anchorTmp.left;
      var anchorHeight = anchorTmp.height;
      var anchorWidth = anchorTmp.width;
      var anchorBottom = windowHeight - anchorTop - anchorHeight;
      var anchorRight = windowWidth - anchorLeft - anchorWidth;

      // 触发元素相对其拥有定位属性的父元素的位置
      var anchorOffsetTop = $anchor[0].offsetTop;
      var anchorOffsetLeft = $anchor[0].offsetLeft;

      // ===============================
      // ================= 自动判断菜单位置
      // ===============================
      if (_this.options.position === 'auto') {

        // 判断下方是否放得下菜单
        if (anchorBottom + (isCovered ? anchorHeight : 0) > menuHeight + gutter) {
          position = 'bottom';
        }

        // 判断上方是否放得下菜单
        else if (anchorTop + (isCovered ? anchorHeight : 0) > menuHeight + gutter) {
          position = 'top';
        }

        // 上下都放不下，居中显示
        else {
          position = 'center';
        }
      } else {
        position = _this.options.position;
      }

      // ===============================
      // ============== 自动判断菜单对齐方式
      // ===============================
      if (_this.options.align === 'auto') {

        // 判断右侧是否放得下菜单
        if (anchorRight + anchorWidth > menuWidth + gutter) {
          align = 'left';
        }

        // 判断左侧是否放得下菜单
        else if (anchorLeft + anchorWidth > menuWidth + gutter) {
          align = 'right';
        }

        // 左右都放不下，居中显示
        else {
          align = 'center';
        }
      } else {
        align = _this.options.align;
      }

      // ===============================
      // ==================== 设置菜单位置
      // ===============================
      if (position === 'bottom') {
        transformOriginY = '0';

        menuTop =
          (isCovered ? 0 : anchorHeight) +
          (isFixed ? anchorTop : anchorOffsetTop);

      } else if (position === 'top') {
        transformOriginY = '100%';

        menuTop =
          (isCovered ? anchorHeight : 0) +
          (isFixed ? (anchorTop - menuHeight) : (anchorOffsetTop - menuHeight));

      } else {
        transformOriginY = '50%';

        // =====================在窗口中居中
        // 显示的菜单的高度，简单菜单高度不超过窗口高度，若超过了则在菜单内部显示滚动条
        // 级联菜单内部不允许出现滚动条
        var menuHeightTemp = menuHeight;

        // 简单菜单比窗口高时，限制菜单高度
        if (!_this.isCascade) {
          if (menuHeight + gutter * 2 > windowHeight) {
            menuHeightTemp = windowHeight - gutter * 2;
            _this.$menu.height(menuHeightTemp);
          }
        }

        menuTop =
          (windowHeight - menuHeightTemp) / 2 +
          (isFixed ? 0 : (anchorOffsetTop - anchorTop));
      }

      _this.$menu.css('top', menuTop + 'px');

      // ===============================
      // ================= 设置菜单对齐方式
      // ===============================
      if (align === 'left') {
        transformOriginX = '0';

        menuLeft = isFixed ? anchorLeft : anchorOffsetLeft;

      } else if (align === 'right') {
        transformOriginX = '100%';

        menuLeft = isFixed ?
          (anchorLeft + anchorWidth - menuWidth) :
          (anchorOffsetLeft + anchorWidth - menuWidth);
      } else {
        transformOriginX = '50%';

        //=======================在窗口中居中
        // 显示的菜单的宽度，菜单宽度不能超过窗口宽度
        var menuWidthTemp = menuWidth;

        // 菜单比窗口宽，限制菜单宽度
        if (menuWidth + gutter * 2 > windowWidth) {
          menuWidthTemp = windowWidth - gutter * 2;
          _this.$menu.width(menuWidthTemp);
        }

        menuLeft =
          (windowWidth - menuWidthTemp) / 2 +
          (isFixed ? 0 : anchorOffsetLeft - anchorLeft);
      }

      _this.$menu.css('left', menuLeft + 'px');

      // 设置菜单动画方向
      _this.$menu.transformOrigin(transformOriginX + ' ' + transformOriginY);
    };

    /**
     * 调整子菜单的位置
     * @param $submenu
     */
    var readjustSubmenu = function ($submenu) {
      var $item = $submenu.parent('.mdui-menu-item');

      var submenuTop;
      var submenuLeft;

      // 子菜单位置和方向
      var position; // top、bottom
      var align; // left、right

      // window 窗口的宽度和高度
      var windowHeight = $window.height();
      var windowWidth = $window.width();

      // 动画方向参数
      var transformOriginX;
      var transformOriginY;

      // 子菜单的原始宽度和高度
      var submenuWidth = $submenu.width();
      var submenuHeight = $submenu.height();

      // 触发子菜单的菜单项的宽度高度
      var itemTmp = $item[0].getBoundingClientRect();
      var itemWidth = itemTmp.width;
      var itemHeight = itemTmp.height;
      var itemLeft = itemTmp.left;
      var itemTop = itemTmp.top;

      // ===================================
      // ===================== 判断菜单上下位置
      // ===================================

      // 判断下方是否放得下菜单
      if (windowHeight - itemTop > submenuHeight) {
        position = 'bottom';
      }

      // 判断上方是否放得下菜单
      else if (itemTop + itemHeight > submenuHeight) {
        position = 'top';
      }

      // 默认放在下方
      else {
        position = 'bottom';
      }

      // ====================================
      // ====================== 判断菜单左右位置
      // ====================================

      // 判断右侧是否放得下菜单
      if (windowWidth - itemLeft - itemWidth > submenuWidth) {
        align = 'left';
      }

      // 判断左侧是否放得下菜单
      else if (itemLeft > submenuWidth) {
        align = 'right';
      }

      // 默认放在右侧
      else {
        align = 'left';
      }

      // ===================================
      // ======================== 设置菜单位置
      // ===================================
      if (position === 'bottom') {
        transformOriginY = '0';
        submenuTop = '0';
      } else if (position === 'top') {
        transformOriginY = '100%';
        submenuTop = -submenuHeight + itemHeight;
      }

      $submenu.css('top', submenuTop + 'px');

      // ===================================
      // ===================== 设置菜单对齐方式
      // ===================================
      if (align === 'left') {
        transformOriginX = '0';
        submenuLeft = itemWidth;
      } else if (align === 'right') {
        transformOriginX = '100%';
        submenuLeft = -submenuWidth;
      }

      $submenu.css('left', submenuLeft + 'px');

      // 设置菜单动画方向
      $submenu.transformOrigin(transformOriginX + ' ' + transformOriginY);
    };

    /**
     * 打开子菜单
     * @param $submenu
     */
    var openSubMenu = function ($submenu) {
      readjustSubmenu($submenu);

      $submenu
        .addClass('mdui-menu-open')
        .parent('.mdui-menu-item')
        .addClass('mdui-menu-item-active');
    };

    /**
     * 关闭子菜单，及其嵌套的子菜单
     * @param $submenu
     */
    var closeSubMenu = function ($submenu) {
      // 关闭子菜单
      $submenu
        .removeClass('mdui-menu-open')
        .addClass('mdui-menu-closing')
        .transitionEnd(function () {
          $submenu.removeClass('mdui-menu-closing');
        })

        // 移除激活状态的样式
        .parent('.mdui-menu-item')
        .removeClass('mdui-menu-item-active');

      // 循环关闭嵌套的子菜单
      $submenu.find('.mdui-menu').each(function () {
        var $subSubmenu = $(this);
        $subSubmenu
          .removeClass('mdui-menu-open')
          .addClass('mdui-menu-closing')
          .transitionEnd(function () {
            $subSubmenu.removeClass('mdui-menu-closing');
          })
          .parent('.mdui-menu-item')
          .removeClass('mdui-menu-item-active');
      });
    };

    /**
     * 切换子菜单状态
     * @param $submenu
     */
    var toggleSubMenu = function ($submenu) {
      if ($submenu.hasClass('mdui-menu-open')) {
        closeSubMenu($submenu);
      } else {
        openSubMenu($submenu);
      }
    };

    /**
     * 绑定子菜单事件
     * @param inst 实例
     */
    var bindSubMenuEvent = function (inst) {
      // 点击打开子菜单
      inst.$menu.on('click', '.mdui-menu-item', function (e) {
        var $this = $(this);
        var $target = $(e.target);

        // 禁用状态菜单不操作
        if ($this.attr('disabled') !== null) {
          return;
        }

        // 没有点击在子菜单的菜单项上时，不操作（点在了子菜单的空白区域、或分隔线上）
        if ($target.is('.mdui-menu') || $target.is('.mdui-divider')) {
          return;
        }

        // 阻止冒泡，点击菜单项时只在最后一级的 mdui-menu-item 上生效，不向上冒泡
        if (!$target.parents('.mdui-menu-item').eq(0).is($this)) {
          return;
        }

        // 当前菜单的子菜单
        var $submenu = $this.children('.mdui-menu');

        // 先关闭除当前子菜单外的所有同级子菜单
        $this.parent('.mdui-menu').children('.mdui-menu-item').each(function () {
          var $tmpSubmenu = $(this).children('.mdui-menu');
          if (
            $tmpSubmenu.length &&
            (!$submenu.length || !$tmpSubmenu.is($submenu))
          ) {
            closeSubMenu($tmpSubmenu);
          }
        });

        // 切换当前子菜单
        if ($submenu.length) {
          toggleSubMenu($submenu);
        }
      });

      if (inst.options.subMenuTrigger === 'hover') {
        // 临时存储 setTimeout 对象
        var timeout;

        var timeoutOpen;
        var timeoutClose;

        inst.$menu.on('mouseover mouseout', '.mdui-menu-item', function (e) {
          var $this = $(this);
          var eventType = e.type;
          var $relatedTarget = $(e.relatedTarget);

          // 禁用状态的菜单不操作
          if ($this.attr('disabled') !== null) {
            return;
          }

          // 用 mouseover 模拟 mouseenter
          if (eventType === 'mouseover') {
            if (!$this.is($relatedTarget) && $.contains($this[0], $relatedTarget[0])) {
              return;
            }
          }

          // 用 mouseout 模拟 mouseleave
          else if (eventType === 'mouseout') {
            if ($this.is($relatedTarget) || $.contains($this[0], $relatedTarget[0])) {
              return;
            }
          }

          // 当前菜单项下的子菜单，未必存在
          var $submenu = $this.children('.mdui-menu');

          // 鼠标移入菜单项时，显示菜单项下的子菜单
          if (eventType === 'mouseover') {
            if ($submenu.length) {

              // 当前子菜单准备打开时，如果当前子菜单正准备着关闭，不用再关闭了
              var tmpClose = $submenu.data('timeoutClose.mdui.menu');
              if (tmpClose) {
                clearTimeout(tmpClose);
              }

              // 如果当前子菜单已经打开，不操作
              if ($submenu.hasClass('mdui-menu-open')) {
                return;
              }

              // 当前子菜单准备打开时，其他准备打开的子菜单不用再打开了
              clearTimeout(timeoutOpen);

              // 准备打开当前子菜单
              timeout = timeoutOpen = setTimeout(function () {
                openSubMenu($submenu);
              }, inst.options.subMenuDelay);

              $submenu.data('timeoutOpen.mdui.menu', timeout);
            }
          }

          // 鼠标移出菜单项时，关闭菜单项下的子菜单
          else if (eventType === 'mouseout') {
            if ($submenu.length) {

              // 鼠标移出菜单项时，如果当前菜单项下的子菜单正准备打开，不用再打开了
              var tmpOpen = $submenu.data('timeoutOpen.mdui.menu');
              if (tmpOpen) {
                clearTimeout(tmpOpen);
              }

              // 准备关闭当前子菜单
              timeout = timeoutClose = setTimeout(function () {
                closeSubMenu($submenu);
              }, inst.options.subMenuDelay);

              $submenu.data('timeoutClose.mdui.menu', timeout);
            }
          }
        });
      }
    };

    /**
     * 菜单
     * @param anchorSelector 点击该元素触发菜单
     * @param menuSelector 菜单
     * @param opts 配置项
     * @constructor
     */
    function Menu(anchorSelector, menuSelector, opts) {
      var _this = this;

      // 触发菜单的元素
      _this.$anchor = $(anchorSelector).eq(0);
      if (!_this.$anchor.length) {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = _this.$anchor.data('mdui.menu');
      if (oldInst) {
        return oldInst;
      }

      _this.$menu = $(menuSelector).eq(0);

      // 触发菜单的元素 和 菜单必须是同级的元素，否则菜单可能不能定位
      if (!_this.$anchor.siblings(_this.$menu).length) {
        return;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));
      _this.state = 'closed';

      // 是否是级联菜单
      _this.isCascade = _this.$menu.hasClass('mdui-menu-cascade');

      // covered 参数处理
      if (_this.options.covered === 'auto') {
        _this.isCovered = !_this.isCascade;
      } else {
        _this.isCovered = _this.options.covered;
      }

      // 点击触发菜单切换
      _this.$anchor.on('click', function () {
        _this.toggle();
      });

      // 点击菜单外面区域关闭菜单
      $document.on('click touchstart', function (e) {
        var $target = $(e.target);
        if (
          (_this.state === 'opening' || _this.state === 'opened') &&
            !$target.is(_this.$menu) &&
            !$.contains(_this.$menu[0], $target[0]) &&
            !$target.is(_this.$anchor) &&
            !$.contains(_this.$anchor[0], $target[0])
        ) {
          _this.close();
        }
      });

      // 点击不含子菜单的菜单条目关闭菜单
      $document.on('click', '.mdui-menu-item', function (e) {
        var $this = $(this);
        if (!$this.find('.mdui-menu').length && $this.attr('disabled') === null) {
          _this.close();
        }
      });

      // 绑定点击或鼠标移入含子菜单的条目的事件
      bindSubMenuEvent(_this);

      // 窗口大小变化时，重新调整菜单位置
      $window.on('resize', $.throttle(function () {
        readjust(_this);
      }, 100));
    }

    /**
     * 切换菜单状态
     */
    Menu.prototype.toggle = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        _this.close();
      } else if (_this.state === 'closing' || _this.state === 'closed') {
        _this.open();
      }
    };

    /**
     * 动画结束回调
     * @param inst
     */
    var transitionEnd = function (inst) {
      inst.$menu.removeClass('mdui-menu-closing');

      if (inst.state === 'opening') {
        inst.state = 'opened';
        componentEvent('opened', 'menu', inst, inst.$menu);
      }

      if (inst.state === 'closing') {
        inst.state = 'closed';
        componentEvent('closed', 'menu', inst, inst.$menu);

        // 关闭后，恢复菜单样式到默认状态，并恢复 fixed 定位
        inst.$menu.css({
          top: '',
          left: '',
          width: '',
          position: 'fixed',
        });
      }
    };

    /**
     * 打开菜单
     */
    Menu.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      _this.state = 'opening';
      componentEvent('open', 'menu', _this, _this.$menu);

      // 调整菜单位置
      readjust(_this);

      _this.$menu

        // 菜单隐藏状态使用使用 fixed 定位。
        .css('position', _this.options.fixed ? 'fixed' : 'absolute')

        // 打开菜单
        .addClass('mdui-menu-open')

        // 打开动画完成后
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    /**
     * 关闭菜单
     */
    Menu.prototype.close = function () {
      var _this = this;
      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      _this.state = 'closing';
      componentEvent('close', 'menu', _this, _this.$menu);

      // 菜单开始关闭时，关闭所有子菜单
      _this.$menu.find('.mdui-menu').each(function () {
        closeSubMenu($(this));
      });

      _this.$menu
        .removeClass('mdui-menu-open')
        .addClass('mdui-menu-closing')
        .transitionEnd(function () {
          transitionEnd(_this);
        });
    };

    return Menu;
  })();


  /**
   * =============================================================================
   * ************   Menu 自定义属性 API   ************
   * =============================================================================
   */

  $(function () {
    $document.on('click', '[mdui-menu]', function () {
      var $this = $(this);

      var inst = $this.data('mdui.menu');
      if (!inst) {
        var options = parseOptions($this.attr('mdui-menu'));
        var menuSelector = options.target;
        delete options.target;

        inst = new mdui.Menu($this, menuSelector, options);
        $this.data('mdui.menu', inst);

        inst.toggle();
      }
    });
  });


  /* jshint ignore:start */
  mdui.JQ = $;
  return mdui;
})));
/* jshint ignore:end */
