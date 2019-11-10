/*!
 * mdui v0.2.1 (http://mdui.org)
 * Copyright 2016-2017 zdhxiong
 * Licensed under MIT
 */
/* jshint ignore:start */
;(function (window, document, undefined) {
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
   * =============================================================================
   * ************   JavaScript 工具库，语法和 jQuery 类似   ************
   * =============================================================================
   */
  /* jshint ignore:start */
  var $ = (function (window, document, undefined) {
    'use strict';
  /* jshint ignore:end */


    var emptyArray = [];
    var slice = emptyArray.slice;
    var concat = emptyArray.concat;
    var isArray = Array.isArray;

    var documentElement = document.documentElement;

    /**
     * 是否是类数组的数据
     * @param obj
     * @returns {boolean}
     */
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
      var i;
      var prop;

      if (isArrayLike(obj)) {
        for (i = 0; i < obj.length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            return obj;
          }
        }
      } else {
        for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if (callback.call(obj[prop], prop, obj[prop]) === false) {
              return obj;
            }
          }
        }
      }

      return obj;
    }

    function map(elems, callback) {
      var value;
      var ret = [];

      each(elems, function (i, elem) {
        value = callback(elem, i);
        if (value !== null && value !== undefined) {
          ret.push(value);
        }
      });

      return concat.apply([], ret);
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
     * 返回去重后的数组
     * @param arr
     * @returns {Array}
     */
    function unique(arr) {
      var unique = [];
      for (var i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) {
          unique.push(arr[i]);
        }
      }

      return unique;
    }

    /**
     * 是否是 null
     * @param obj
     * @returns {boolean}
     */
    function isNull(obj) {
      return obj === null;
    }

    /**
     * 判断一个节点名
     * @param ele
     * @param name
     * @returns {boolean}
     */
    function nodeName(ele, name) {
      return ele.nodeName && ele.nodeName.toLowerCase() === name.toLowerCase();
    }

    function isFunction(fn) {
      return typeof fn === 'function';
    }

    function isString(obj) {
      return typeof obj === 'string';
    }

    function isObject(obj) {
      return typeof obj === 'object';
    }

    /**
     * 除去 null 后的 object 类型
     * @param obj
     * @returns {*|boolean}
     */
    function isObjectLike(obj) {
      return isObject(obj) && !isNull(obj);
    }

    function isWindow(win) {
      return win && win === win.window;
    }

    function isDocument(doc) {
      return doc && doc.nodeType === doc.DOCUMENT_NODE;
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


    var JQ = function (arr) {
      var _this = this;

      for (var i = 0; i < arr.length; i++) {
        _this[i] = arr[i];
      }

      _this.length = arr.length;

      return this;
    };

    /**
     * @param selector {String|Function|Node|Window|NodeList|Array|JQ=}
     * @returns {JQ}
     */
    var $ = function (selector) {
      var arr = [];
      var i = 0;

      if (!selector) {
        return new JQ(arr);
      }

      if (selector instanceof JQ) {
        return selector;
      }

      if (isString(selector)) {
        var els;
        var tempParent;
        selector = selector.trim();

        // 创建 HTML 字符串
        if (selector[0] === '<' && selector[selector.length - 1] === '>') {
          // HTML
          var toCreate = 'div';
          if (selector.indexOf('<li') === 0) {
            toCreate = 'ul';
          }

          if (selector.indexOf('<tr') === 0) {
            toCreate = 'tbody';
          }

          if (selector.indexOf('<td') === 0 || selector.indexOf('<th') === 0) {
            toCreate = 'tr';
          }

          if (selector.indexOf('<tbody') === 0) {
            toCreate = 'table';
          }

          if (selector.indexOf('<option') === 0) {
            toCreate = 'select';
          }

          tempParent = document.createElement(toCreate);
          tempParent.innerHTML = selector;
          for (i = 0; i < tempParent.childNodes.length; i++) {
            arr.push(tempParent.childNodes[i]);
          }
        }

        // 选择器
        else {

          // id 选择器
          if (selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            els = [document.getElementById(selector.slice(1))];
          }

          // 其他选择器
          else {
            els = document.querySelectorAll(selector);
          }

          for (i = 0; i < els.length; i++) {
            if (els[i]) {
              arr.push(els[i]);
            }
          }
        }
      }

      // function
      else if (isFunction(selector)) {
        return $(document).ready(selector);
      }

      // Node
      else if (selector.nodeType || selector === window || selector === document) {
        arr.push(selector);
      }

      // NodeList
      else if (selector.length > 0 && selector[0].nodeType) {
        for (i = 0; i < selector.length; i++) {
          arr.push(selector[i]);
        }
      }

      return new JQ(arr);
    };

    $.fn = JQ.prototype;

    /**
     * 扩展函数和原型属性
     * @param obj
     */
    $.extend = $.fn.extend = function (obj) {
      if (obj === undefined) {
        return this;
      }

      var length = arguments.length;
      var prop;
      var i;
      var options;

      // $.extend(obj)
      if (length === 1) {
        for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            this[prop] = obj[prop];
          }
        }

        return this;
      }

      // $.extend({}, defaults[, obj])
      for (i = 1; i < length; i++) {
        options = arguments[i];
        for (prop in options) {
          if (options.hasOwnProperty(prop)) {
            obj[prop] = options[prop];
          }
        }
      }

      return obj;
    };

    $.extend({

      /**
       * 遍历对象
       * @param obj {String|Array|Object}
       * @param callback {Function}
       * @returns {Array|Object}
       */
      each: each,

      /**
       * 合并两个数组，返回的结果会修改第一个数组的内容
       * @param first {Array}
       * @param second {Array}
       * @returns {Array}
       */
      merge: merge,

      /**
       * 删除数组中重复元素
       * @param arr {Array}
       * @returns {Array}
       */
      unique: unique,

      /**
       * 通过遍历集合中的节点对象，通过函数返回一个新的数组，null 或 undefined 将被过滤掉。
       * @param elems
       * @param callback
       * @returns {Array}
       */
      map: map,

      /**
       * 一个 DOM 节点是否包含另一个 DOM 节点
       * @param parent {Node} 父节点
       * @param node {Node} 子节点
       * @returns {Boolean}
       */
      contains: function (parent, node) {
        if (parent && !node) {
          return documentElement.contains(parent);
        }

        return parent !== node && parent.contains(node);
      },

      /**
       * 将数组或对象序列化
       * @param obj
       * @returns {String}
       */
      param: function (obj) {
        if (!isObjectLike(obj)) {
          return '';
        }

        var args = [];
        each(obj, function (key, value) {
          destructure(key, value);
        });

        return args.join('&');

        function destructure(key, value) {
          var keyTmp;

          if (isObjectLike(value)) {
            each(value, function (i, v) {
              if (isArray(value) && !isObjectLike(v)) {
                keyTmp = '';
              } else {
                keyTmp = i;
              }

              destructure(key + '[' + keyTmp + ']', v);
            });
          } else {
            if (!isNull(value) && value !== '') {
              keyTmp = '=' + encodeURIComponent(value);
            } else {
              keyTmp = '';
            }

            args.push(encodeURIComponent(key) + keyTmp);
          }
        }
      },
    });

    $.fn.extend({

      /**
       * 遍历对象
       * @param callback {Function}
       * @return {JQ}
       */
      each: function (callback) {
        return each(this, callback);
      },

      /**
       * 通过遍历集合中的节点对象，通过函数返回一个新的对象，null 或 undefined 将被过滤掉。
       * @param callback {Function}
       * @returns {JQ}
       */
      map: function (callback) {
        return new JQ(map(this, function (el, i) {
          return callback.call(el, i, el);
        }));
      },

      /**
       * 获取指定 DOM 元素，没有 index 参数时，获取所有 DOM 的数组
       * @param index {Number=}
       * @returns {Node|Array}
       */
      get: function (index) {
        return index === undefined ?
          slice.call(this) :
          this[index >= 0 ? index : index + this.length];
      },

      /**
       * array中提取的方法。从start开始，如果end 指出。提取不包含end位置的元素。
       * @param argument {start, end}
       * @returns {JQ}
       */
      slice: function (argument) {
        return new JQ(slice.apply(this, arguments));
      },

      /**
       * 筛选元素集合
       * @param selector {String|JQ|Node|Function}
       * @returns {JQ}
       */
      filter: function (selector) {
        if (isFunction(selector)) {
          return this.map(function (index, ele) {
            return selector.call(ele, index, ele) ? ele : undefined;
          });
        } else {
          var $selector = $(selector);
          return this.map(function (index, ele) {
            return $selector.index(ele) > -1 ? ele : undefined;
          });
        }
      },

      /**
       * 从元素集合中删除指定的元素
       * @param selector {String|Node|JQ|Function}
       * @return {JQ}
       */
      not: function (selector) {
        var $excludes = this.filter(selector);
        return this.map(function (index, ele) {
          return $excludes.index(ele) > -1 ? undefined : ele;
        });
      },

      /**
       * 获取元素相对于 document 的偏移
       * @returns {Object}
       */
      offset: function () {
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
      offsetParent: function () {
        return this.map(function () {
          var offsetParent = this.offsetParent;

          while (offsetParent && $(offsetParent).css('position') === 'static') {
            offsetParent = offsetParent.offsetParent;
          }

          return offsetParent || documentElement;
        });
      },

      /**
       * 获取元素相对于父元素的偏移
       * @return {Object}
       */
      position: function () {
        var _this = this;

        if (!_this[0]) {
          return null;
        }

        var offsetParent;
        var offset;
        var parentOffset = {
          top: 0,
          left: 0,
        };

        if (_this.css('position') === 'fixed') {
          offset = _this[0].getBoundingClientRect();
        } else {
          offsetParent = _this.offsetParent();
          offset = _this.offset();
          if (!nodeName(offsetParent[0], 'html')) {
            parentOffset = offsetParent.offset();
          }

          parentOffset = {
            top: parentOffset.top + offsetParent.css('borderTopWidth'),
            left: parentOffset.left + offsetParent.css('borderLeftWidth'),
          };
        }

        return {
          top: offset.top - parentOffset.top - _this.css('marginTop'),
          left: offset.left - parentOffset.left - _this.css('marginLeft'),
          width: offset.width,
          height: offset.height,
        };
      },

      /**
       * 显示指定元素
       * @returns {JQ}
       */
      show: function () {
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
      hide: function () {
        return this.each(function () {
          this.style.display = 'none';
        });
      },

      /**
       * 切换元素的显示状态
       * @returns {JQ}
       */
      toggle: function () {
        return this.each(function () {
          this.style.display = this.style.display === 'none' ? '' : 'none';
        });
      },

      /**
       * 是否含有指定的 CSS 类
       * @param className {String}
       * @returns {boolean}
       */
      hasClass: function (className) {
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
      removeAttr: function (attr) {
        return this.each(function () {
          this.removeAttribute(attr);
        });
      },

      /**
       * 删除属性值
       * @param name {String}
       * @returns {JQ}
       */
      removeProp: function (name) {
        return this.each(function () {
          try {
            delete this[name];
          } catch (e) {}
        });
      },

      /**
       * 获取当前对象中第n个元素
       * @param index {Number}
       * @returns {JQ}
       */
      eq: function (index) {
        var ret = index === -1 ? this.slice(index) : this.slice(index, +index + 1);
        return new JQ(ret);
      },

      /**
       * 获取对象中第一个元素
       * @returns {JQ}
       */
      first: function () {
        return this.eq(0);
      },

      /**
       * 获取对象中最后一个元素
       * @returns {JQ}
       */
      last: function () {
        return this.eq(-1);
      },

      /**
       * 获取一个元素的位置。
       * 当 ele 参数没有给出时，返回当前元素在兄弟节点中的位置。
       * 有给出了 ele 参数时，返回 ele 元素在当前对象中的位置
       * @param ele {Selector|Node=}
       * @returns {Number}
       */
      index: function (ele) {
        if (!ele) {
          // 获取当前 JQ 对象的第一个元素在同辈元素中的位置
          return this.eq(0).parent().children().get().indexOf(this[0]);
        } else if (isString(ele)) {
          // 返回当前 JQ 对象的第一个元素在指定选择器对应的元素中的位置
          return $(ele).eq(0).parent().children().get().indexOf(this[0]);
        } else {
          // 返回指定元素在当前 JQ 对象中的位置
          return this.get().indexOf(ele);
        }
      },

      /**
       * 根据选择器、DOM元素或 JQ 对象来检测匹配元素集合，
       * 如果其中至少有一个元素符合这个给定的表达式就返回true
       * @param selector {String|Node|NodeList|Array|JQ|Window}
       * @returns boolean
       */
      is: function (selector) {
        var _this = this[0];

        if (!_this || selector === undefined || selector === null) {
          return false;
        }

        var $compareWith;
        var i;
        if (isString(selector)) {
          if (_this === document || _this === window) {
            return false;
          }

          var matchesSelector =
            _this.matches ||
            _this.matchesSelector ||
            _this.webkitMatchesSelector ||
            _this.mozMatchesSelector ||
            _this.oMatchesSelector ||
            _this.msMatchesSelector;

          return matchesSelector.call(_this, selector);
        } else if (selector === document || selector === window) {
          return _this === selector;
        } else {
          if (selector.nodeType || isArrayLike(selector)) {
            $compareWith = selector.nodeType ? [selector] : selector;
            for (i = 0; i < $compareWith.length; i++) {
              if ($compareWith[i] === _this) {
                return true;
              }
            }

            return false;
          }

          return false;
        }
      },

      /**
       * 根据 CSS 选择器找到后代节点的集合
       * @param selector {String}
       * @returns {JQ}
       */
      find: function (selector) {
        var foundElements = [];

        this.each(function (i, _this) {
          merge(foundElements, _this.querySelectorAll(selector));
        });

        return new JQ(foundElements);
      },

      /**
       * 找到直接子元素的元素集合
       * @param selector {String=}
       * @returns {JQ}
       */
      children: function (selector) {
        var children = [];
        this.each(function (i, _this) {
          each(_this.childNodes, function (i, childNode) {
            if (childNode.nodeType !== 1) {
              return true;
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
      has: function (selector) {
        var $targets = isString(selector) ? this.find(selector) : $(selector);
        var len = $targets.length;
        return this.filter(function () {
          for (var i = 0; i < len; i++) {
            if ($.contains(this, $targets[i])) {
              return true;
            }
          }
        });
      },

      /**
       * 取得同辈元素的集合
       * @param selector {String=}
       * @returns {JQ}
       */
      siblings: function (selector) {
        return this.prevAll(selector).add(this.nextAll(selector));
      },

      /**
       * 返回首先匹配到的父节点，包含父节点
       * @param selector {String}
       * @returns {JQ}
       */
      closest: function (selector) {
        var _this = this;

        if (!_this.is(selector)) {
          _this = _this.parents(selector).eq(0);
        }

        return _this;
      },

      /**
       * 删除所有匹配的元素
       * @returns {JQ}
       */
      remove: function () {
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
      add: function (selector) {
        return new JQ(unique(merge(this.get(), $(selector))));
      },

      /**
       * 删除子节点
       * @returns {JQ}
       */
      empty: function () {
        return this.each(function () {
          this.innerHTML = '';
        });
      },

      /**
       * 通过深度克隆来复制集合中的所有元素。
       * (通过原生 cloneNode 方法深度克隆来复制集合中的所有元素。此方法不会有数据和事件处理程序复制到新的元素。这点和jquery中利用一个参数来确定是否复制数据和事件处理不相同。)
       * @returns {JQ}
       */
      clone: function () {
        return this.map(function () {
          return this.cloneNode(true);
        });
      },

      /**
       * 用新元素替换当前元素
       * @param newContent {String|Node|NodeList|JQ}
       * @returns {JQ}
       */
      replaceWith: function (newContent) {
        return this.before(newContent).remove();
      },

      /**
       * 将表单元素的值组合成键值对数组
       * @returns {Array}
       */
      serializeArray: function () {
        var result = [];
        var $ele;
        var type;
        var ele = this[0];

        if (!ele || !ele.elements) {
          return result;
        }

        $(slice.call(ele.elements)).each(function () {
          $ele = $(this);
          type = $ele.attr('type');
          if (
            this.nodeName.toLowerCase() !== 'fieldset' &&
            !this.disabled &&
            ['submit', 'reset', 'button'].indexOf(type) === -1 &&
            (['radio', 'checkbox'].indexOf(type) === -1 || this.checked)
          ) {
            result.push({
              name: $ele.attr('name'),
              value: $ele.val(),
            });
          }
        });

        return result;
      },

      /**
       * 将表单元素或对象序列化
       * @returns {String}
       */
      serialize: function () {
        var result = [];
        each(this.serializeArray(), function (i, elm) {
          result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value));
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
        } else {
          // 设置值
          return this.each(function (i, ele) {
            ele[props[nameIndex]] = value;
          });
        }
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
      var set = function (ele, key, value) {
        if (nameIndex === 0) {
          ele.setAttribute(key, value);
        } else if (nameIndex === 1) {
          ele[key] = value;
        } else {
          ele.style[key] = value;
        }
      };

      var get = function (ele, key) {
        if (!ele) {
          return undefined;
        }

        var value;
        if (nameIndex === 0) {
          value = ele.getAttribute(key);
        } else if (nameIndex === 1) {
          value = ele[key];
        } else {
          value = window.getComputedStyle(ele, null).getPropertyValue(key);
        }

        return value;
      };

      $.fn[name] = function (key, value) {
        var argLength = arguments.length;

        if (argLength === 1 && isString(key)) {
          // 获取值
          return get(this[0], key);
        } else {
          // 设置值
          return this.each(function (i, ele) {
            if (argLength === 2) {
              set(ele, key, value);
            } else {
              each(key, function (k, v) {
                set(ele, k, v);
              });
            }
          });
        }
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
      $.fn[name + 'Class'] = function (className) {
        if (!className) {
          return this;
        }

        var classes = className.split(' ');
        return this.each(function (i, ele) {
          each(classes, function (j, cls) {
            ele.classList[name](cls);
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
          var ele = this[0];

          if (isWindow(ele)) {
            return ele['inner' + prop];
          }

          if (isDocument(ele)) {
            return ele.documentElement['scroll' + prop];
          }

          var $ele = $(ele);

          // IE10、IE11 在 box-sizing:border-box 时，不会包含 padding，这里进行修复
          var IEFixValue = 0;
          if ('ActiveXObject' in window) { // 判断是 IE 浏览器
            if ($ele.css('box-sizing') === 'border-box') {
              IEFixValue =
                parseFloat($ele.css('padding-' + (name === 'width' ? 'left' : 'top'))) +
                parseFloat($ele.css('padding-' + (name === 'width' ? 'right' : 'bottom')));
            }
          }

          return parseFloat($(ele).css(name)) + IEFixValue;
        } else {
          // 设置
          if (!isNaN(Number(val)) && val !== '') {
            val += 'px';
          }

          return this.css(name, val);
        }
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
      $.fn['inner' + prop] = function () {
        var value = this[name]();
        var $ele = $(this[0]);

        if ($ele.css('box-sizing') !== 'border-box') {
          value += parseFloat($ele.css('padding-' + (name === 'width' ? 'left' : 'top')));
          value += parseFloat($ele.css('padding-' + (name === 'width' ? 'right' : 'bottom')));
        }

        return value;
      };
    });

    var dir = function (nodes, selector, nameIndex, node) {
      var ret = [];
      var ele;
      nodes.each(function (j, _this) {
        ele = _this[node];
        while (ele) {
          if (nameIndex === 2) {
            // prevUntil
            if (!selector || (selector && $(ele).is(selector))) {
              break;
            }

            ret.push(ele);
          } else if (nameIndex === 0) {
            // prev
            if (!selector || (selector && $(ele).is(selector))) {
              ret.push(ele);
            }

            break;
          } else {
            // prevAll
            if (!selector || (selector && $(ele).is(selector))) {
              ret.push(ele);
            }
          }

          ele = ele[node];
        }
      });

      return new JQ(unique(ret));
    };

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
      $.fn['prev' + name] = function (selector) {

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
      $.fn['next' + name] = function (selector) {
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
      $.fn['parent' + name] = function (selector) {

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

        if (isString(newChild)) {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          newChilds = slice.call(tempDiv.childNodes);
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
        var $ele = $(selector);
        return this.each(function (i, _this) {
          $ele.each(function (j, ele) {
            ele.parentNode.insertBefore(
              $ele.length === 1 ? _this : _this.cloneNode(true),
              nameIndex === 0 ? ele : ele.nextSibling
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



    (function () {
      var dataNS = 'mduiElementDataStorage';

      $.extend({
        /**
         * 在指定元素上存储数据，或从指定元素上读取数据
         * @param ele 必须， DOM 元素
         * @param key 必须，键名
         * @param value 可选，值
         */
        data: function (ele, key, value) {
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
            each(ele.attributes, function (i, attribute) {
              var name = attribute.name;
              if (name.indexOf('data-') === 0) {
                var prop = name.slice(5).replace(/-./g, function (u) {
                  // 横杠转为驼峰法
                  return u.charAt(1).toUpperCase();
                });

                result[prop] = attribute.value;
              }
            });

            if (ele[dataNS]) {
              each(ele[dataNS], function (k, v) {
                result[k] = v;
              });
            }

            return result;
          } else {
            // 获取指定值
            if (ele[dataNS] && (key in ele[dataNS])) {
              return ele[dataNS][key];
            } else {
              var dataKey = ele.getAttribute('data-' + key);
              if (dataKey) {
                return dataKey;
              } else {
                return undefined;
              }
            }
          }

          // 设置值
          if (!ele[dataNS]) {
            ele[dataNS] = {};
          }

          each(data, function (k, v) {
            ele[dataNS][k] = v;
          });
        },

        /**
         * 移除指定元素上存放的数据
         * @param ele 必须，DOM 元素
         * @param key 必须，键名
         */
        removeData: function (ele, key) {
          if (ele[dataNS] && ele[dataNS][key]) {
            ele[dataNS][key] = null;
            delete ele.mduiElementDataStorage[key];
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
        data: function (key, value) {
          if (value === undefined) {
            // 获取值
            if (this[0]) {
              return $.data(this[0], key);
            } else {
              return undefined;
            }
          } else {
            // 设置值
            return this.each(function (i, ele) {
              $.data(ele, key, value);
            });
          }
        },

        /**
         * 移除元素上存储的数据
         * @param key 必须
         * @returns {*}
         */
        removeData: function (key) {
          return this.each(function (i, ele) {
            $.removeData(ele, key);
          });
        },

      });
    })();


    (function () {
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
      var _elementId = 1;

      var fnFalse = function () {
        return false;
      };

      $.fn.extend({
        /**
         * DOM 加载完毕后调用的函数
         * @param callback
         * @returns {ready}
         */
        ready: function (callback) {
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
        on: function (eventName, selector, data, callback, one) {
          var _this = this;

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
              _this.on(type, selector, data, fn);
            });

            return _this;
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
              _this.off(eventName, selector, callback);
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
        one: function (eventName, selector, data, callback) {
          var _this = this;

          if (!isString(eventName)) {
            each(eventName, function (type, fn) {
              type.split(' ').forEach(function (eName) {
                _this.on(eName, selector, data, fn, 1);
              });
            });
          } else {
            eventName.split(' ').forEach(function (eName) {
              _this.on(eName, selector, data, callback, 1);
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
        off: function (eventName, selector, callback) {
          var _this = this;

          // event 使用 事件:函数 键值对
          // event = {
          //   'event1': callback1,
          //   'event2': callback2
          // }
          //
          // $().off(event, selector)
          if (eventName && !isString(eventName)) {
            each(eventName, function (type, fn) {
              _this.off(type, selector, fn);
            });

            return _this;
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

          return _this.each(function () {
            remove(this, eventName, callback, selector);
          });
        },

        /**
         * 触发一个事件
         * @param eventName
         * @param data
         * @returns {*|JQ}
         */
        trigger: function (eventName, data) {
          if (!isString(eventName)) {
            return;
          }

          var evt;
          try {
            evt = new CustomEvent(eventName, { detail: data, bubbles: true, cancelable: true });
          } catch (e) {
            evt = document.createEvent('Event');
            evt.initEvent(eventName, true, true);
            evt.detail = data;
          }

          evt._data = data;

          return this.each(function () {
            this.dispatchEvent(evt);
          });
        },
      });

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

          var callFn = function (e, ele) {
            var result = func.apply(ele, e._data === undefined ? [e] : [e].concat(e._data));
            if (result === false) {
              e.preventDefault();
              e.stopPropagation();
            }
          };

          var proxyfn = handler.proxy = function (e) {
            e.data = data;

            // 事件代理
            if (selector) {
              $(element).find(selector).get().reverse().forEach(function (ele) {
                if (ele === e.target || $.contains(ele, e.target)) {
                  callFn(e, ele);
                }
              });
            }

            // 不使用事件代理
            else {
              callFn(e, element);
            }
          };

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

      /**
       * 为元素赋予一个唯一的ID
       * @param element
       * @returns {number|*}
       */
      function getElementId(element) {
        return element._elementId || (element._elementId = _elementId++);
      }

      /**
       * 获取匹配的事件
       * @param element
       * @param eventName
       * @param func
       * @param selector
       * @returns {Array.<T>}
       */
      function getHandlers(element, eventName, func, selector) {
        return (handlers[getElementId(element)] || []).filter(function (handler) {

          return handler &&
            (!eventName  || handler.e === eventName) &&
            (!func || handler.fn.toString() === func.toString()) &&
            (!selector || handler.sel === selector);
        });
      }

    })();


  /* jshint ignore:start */
    return $;
  })(window, document);
  /* jshint ignore:end */


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

    /**
     * 生成唯一 id
     * @param pluginName 插件名，若传入该参数，guid 将以该参数作为前缀
     * @returns {string}
     */
    guid: function (pluginName) {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      var guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      if (pluginName) {
        guid = 'mdui-' + pluginName + '-' + guid;
      }

      return guid;
    },

  });


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
    $('[mdui-headroom]').each(function () {
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

    // 类名
    var CLASS = {
      item: 'mdui-collapse-item',           // item 类名
      itemOpen: 'mdui-collapse-item-open',  // 打开状态的 item
      header: 'mdui-collapse-item-header',  // item 中的 header 类名
      body: 'mdui-collapse-item-body',      // item 中的 body 类名
    };

    // 命名空间
    var NAMESPACE = 'collapse';

    /**
     * 折叠内容块
     * @param selector
     * @param opts
     * @param classes
     * @param namespace
     * @constructor
     */
    function Collapse(selector, opts, classes, namespace) {
      var _this = this;

      _this.classes = $.extend({}, CLASS, classes || {});
      _this.namespace = namespace ? namespace : NAMESPACE;

      // 折叠面板元素
      _this.$collapse = $(selector).eq(0);
      if (!_this.$collapse.length) {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = _this.$collapse.data('mdui.' + _this.namespace);
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend({}, DEFAULT, (opts || {}));

      _this.$collapse.on('click', '.' + _this.classes.header, function () {
        var $item = $(this).parent('.' + _this.classes.item);
        if (_this.$collapse.children($item).length) {
          _this.toggle($item);
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
      return $item.hasClass(this.classes.itemOpen);
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
        return _this.$collapse.children('.' + _this.classes.item).eq(item);
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

        componentEvent('opened', inst.namespace, inst, $item[0]);
      } else {
        $content.height('');

        componentEvent('closed', inst.namespace, inst, $item[0]);
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
        _this.$collapse.children('.' + _this.classes.itemOpen).each(function () {
          var $tmpItem = $(this);

          if ($tmpItem !== $item) {
            _this.close($tmpItem);
          }
        });
      }

      var $content = $item.children('.' + _this.classes.body);

      $content
        .height($content[0].scrollHeight)
        .transitionEnd(function () {
          transitionEnd(_this, $content, $item);
        });

      componentEvent('open', _this.namespace, _this, $item[0]);

      $item.addClass(_this.classes.itemOpen);
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

      var $content = $item.children('.' + _this.classes.body);

      componentEvent('close', _this.namespace, _this, $item[0]);

      $item.removeClass(_this.classes.itemOpen);

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

      _this.$collapse.children('.' + _this.classes.item).each(function () {
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

      _this.$collapse.children('.' + _this.classes.item).each(function () {
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
      return new CollapsePrivate(selector, opts);
    }

    return Collapse;
  })();


  /**
   * =============================================================================
   * ************   Collapse 自定义属性   ************
   * =============================================================================
   */

  $(function () {
    $('[mdui-collapse]').each(function () {
      var $this = $(this);
      var options = parseOptions($this.attr('mdui-collapse'));

      var inst = $this.data('mdui.collapse');
      if (!inst) {
        inst = new mdui.Collapse($this, options);
        $this.data('mdui.collapse', inst);
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

        // 所有行都选中后，选中表头；否则，不选中表头
        _this.$thCheckbox[0].checked = _this.selectedRow === _this.$tdRows.length;

        // 绑定事件
        $checkbox.on('change', function () {
          if ($checkbox[0].checked) {
            $tdRow.addClass('mdui-table-row-selected');
            _this.selectedRow++;
          } else {
            $tdRow.removeClass('mdui-table-row-selected');
            _this.selectedRow--;
          }

          // 所有行都选中后，选中表头；否则，不选中表头
          _this.$thCheckbox[0].checked = _this.selectedRow === _this.$tdRows.length;
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

    $(function () {
      // 实例化表格
      $('.mdui-table').each(function () {
        var $table = $(this);
        if (!$table.data('mdui.table')) {
          $table.data('mdui.table', new Table($table));
        }
      });
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
        typeof obj[prop] !== 'undefined' &&
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
        $input.height('');
        var height = input.offsetHeight;
        var diff = height - input.clientHeight;
        var scrollHeight = input.scrollHeight;

        if (scrollHeight + diff > height) {
          var newAreaHeight = scrollHeight + diff;
          $input.height(newAreaHeight);
        }
      }

      // 实时字数统计
      if (reInit) {
        $textField
          .removeClass('mdui-textfield-has-counter')
          .find('.mdui-textfield-counter')
          .remove();
      }

      var maxlength = $input.attr('maxlength');
      if (maxlength) {
        if (reInit || domLoadedEvent) {
          $('<div class="mdui-textfield-counter">' +
              '<span class="mdui-textfield-counter-inputed"></span> / ' + maxlength +
            '</div>').appendTo($textField);

          // 如果没有 .mdui-textfield-error 作为占位，需要增加 .mdui-textfield 的下边距，
          // 使 .mdui-textfield-counter 不会覆盖在文本框上
          if (!$textField.find('.mdui-textfield-error').length) {
            $textField.addClass('mdui-textfield-has-counter');
          }
        }

        // 字符长度，确保统计方式和 maxlength 一致
        var inputed = value.length + value.split('\n').length - 1;
        $textField.find('.mdui-textfield-counter-inputed').text(inputed.toString());
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

    $(function () {
      // DOM 加载完后自动执行
      $('.mdui-textfield-input').each(function () {
        $(this).trigger('input', {
          domLoadedEvent: true,
        });
      });
    });

  })();


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
     * 页面加载完后自动初始化
     */
    $(function () {
      $('.mdui-slider').each(function () {
        reInit($(this));
      });
    });

    /**
     * 重新初始化滑块
     */
    mdui.updateSliders = function () {
      $(arguments.length ? arguments[0] : '.mdui-slider').each(function () {
        reInit($(this));
      });
    };
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

      _this.$dial.addClass('mdui-fab-dial-show');

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
   * ************   Appbar   ************
   * =============================================================================
   * 滚动时自动隐藏应用栏
   * mdui-appbar-scroll-hide
   * mdui-appbar-scroll-toolbar-hide
   */

  $(function () {
    // 滚动时隐藏应用栏
    $('.mdui-appbar-scroll-hide').each(function () {
      var $this = $(this);
      $this.data('mdui.headroom', new mdui.Headroom($this));
    });

    // 滚动时只隐藏应用栏中的工具栏
    $('.mdui-appbar-scroll-toolbar-hide').each(function () {
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
      _this.activeIndex = false;

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

      // 默认激活第一个选项卡
      if (_this.activeIndex === false) {
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
        var $tab = $(tab);

        // 点击或鼠标移入触发的事件
        var clickEvent = function (e) {
          // 禁用状态的选项无法选中
          if (isDisabled($tab)) {
            e.preventDefault();
            return;
          }

          _this.activeIndex = i;
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
      });
    }

    /**
     * 设置激活状态的选项卡
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
              target: tab,
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

      var $activeTab = _this.$tabs.eq(_this.activeIndex);
      if (isDisabled($activeTab)) {
        return;
      }

      var activeTabOffset = $activeTab.offset();
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
     */
    Tab.prototype.handleUpdate = function () {
      this._setIndicatorPosition();
    };

    return Tab;
  })();


  /**
   * =============================================================================
   * ************   Tab 自定义属性 API   ************
   * =============================================================================
   */

  $(function () {
    $('[mdui-tab]').each(function () {
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
    }

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
    $('[mdui-drawer]').each(function () {
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
     * @type {string}
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
      $dialogContent.height(
        dialogHeight -
        ($dialogTitle.height() || 0) -
        ($dialogActions.height() || 0)
      );
    };

    /**
     * hashchange 事件触发时关闭对话框
     */
    var hashchangeEvent = function () {
      if (location.hash.substring(1).indexOf('&mdui-dialog') < 0) {
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
        // 如果 hash 中原来就有 &mdui-dialog，先删除，避免后退历史纪录后仍然有 &mdui-dialog 导致无法关闭
        var hash = location.hash.substring(1);
        if (hash.indexOf('&mdui-dialog') > -1) {
          hash = hash.replace(/&mdui-dialog/g, '');
        }

        // 后退按钮关闭对话框
        location.hash = hash + '&mdui-dialog';
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
          if (!arguments[0]) {
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

    return mdui.dialog({
      title: title,
      content: content,
      buttons: [
        {
          text: options.cancelText,
          bold: false,
          close: true,
          onClick: function (inst) {
            var value = inst.$dialog.find('.mdui-textfield-input').val();
            onCancel(value, inst);
          },
        },
        {
          text: options.confirmText,
          bold: false,
          close: true,
          onClick: function (inst) {
            var value = inst.$dialog.find('.mdui-textfield-input').val();
            onConfirm(value, inst);
          },
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
      var guid = $.guid('tooltip');
      _this.$tooltip = $(
        '<div class="mdui-tooltip" id="mdui-tooltip-' + guid + '">' +
          _this.options.content +
        '</div>'
      ).appendTo(document.body);

      // 绑定事件
      _this.$target
        .on('touchstart mouseenter', function (e) {
          if (!TouchHandler.isAllow(e)) {
            return;
          }

          TouchHandler.register(e);

          _this.open();
        })
        .on('touchend mouseleave', function (e) {
          if (!TouchHandler.isAllow(e)) {
            return;
          }

          _this.close();
        })
        .on(TouchHandler.unlock, TouchHandler.register);
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

      var oldOpts = _this.options;

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

        inst.open();
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
      message: '',                    // 文本内容
      timeout: 4000,                  // 在用户没有操作时多长时间自动隐藏
      buttonText: '',                 // 按钮的文本
      buttonColor: '',                // 按钮的颜色，支持 blue #90caf9 rgba(...)
      closeOnButtonClick: true,       // 点击按钮时关闭
      closeOnOutsideClick: true,      // 触摸或点击屏幕其他地方时关闭
      onClick: function () {          // 在 Snackbar 上点击的回调
      },

      onButtonClick: function () {    // 点击按钮的回调
      },

      onClose: function () {          // 关闭动画开始时的回调
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
     * @param opts
     * @constructor
     */
    function Snackbar(opts) {
      var _this = this;

      _this.options = $.extend({}, DEFAULT, (opts || {}));

      // message 参数必须
      if (!_this.options.message) {
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
            _this.options.message +
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
      _this.$snackbar
        .transform('translateY(' + _this.$snackbar[0].clientHeight + 'px)')
        .css('left', (document.body.clientWidth - _this.$snackbar[0].clientWidth) / 2 + 'px')
        .addClass('mdui-snackbar-transition');
    }

    /**
     * 打开 Snackbar
     */
    Snackbar.prototype.open = function () {
      var _this = this;

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
      _this.$snackbar
        .transform('translateY(0)')
        .transitionEnd(function () {
          if (_this.state !== 'opening') {
            return;
          }

          _this.state = 'opened';

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
          _this.timeoutId = setTimeout(function () {
            _this.close();
          }, _this.options.timeout);
        });
    };

    /**
     * 关闭 Snackbar
     */
    Snackbar.prototype.close = function () {
      var _this = this;

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

      _this.$snackbar
        .transform('translateY(' + _this.$snackbar[0].clientHeight + 'px)')
        .transitionEnd(function () {
          if (_this.state !== 'closing') {
            return;
          }

          currentInst = null;
          _this.state = 'closed';
          _this.$snackbar.remove();
          queue.dequeue(queueName);
        });
    };

    /**
     * 打开 Snackbar
     * @param params
     */
    mdui.snackbar = function (params) {
      var inst = new Snackbar(params);

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
    $('.mdui-bottom-nav-scroll-hide').each(function () {
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
      $('.mdui-spinner').each(function () {
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
      return new CollapsePrivate(selector, opts, {
        item: 'mdui-panel-item',
        itemOpen: 'mdui-panel-item-open',
        header: 'mdui-panel-item-header',
        body: 'mdui-panel-item-body',
      }, 'panel');
    }

    return Panel;

  })();


  /**
   * =============================================================================
   * ************   Expansion panel 自定义属性   ************
   * =============================================================================
   */

  $(function () {
    $('[mdui-panel]').each(function () {
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
        if (!_this.$menu.hasClass('mdui-menu-cascade')) {
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
  window.mdui = mdui;
})(window, document);
/* jshint ignore:end */
