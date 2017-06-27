/*!
 * mdui v0.1.2 (http://mdui.org)
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
   * ************   Dom 操作库   ************
   * =============================================================================
   *
   * Inspired by https://github.com/nolimits4web/Framework7
   * https://github.com/nolimits4web/Framework7/blob/master/LICENSE
   */
  var $ = {};
  (function () {

    /**
     * 是否是数组
     * @param arr
     * @returns {boolean}
     */
    $.isArray = function (arr) {
      return Object.prototype.toString.apply(arr) === '[object Array]';
    };

    /**
     * nodeList 转换为数组
     * @param nodeList
     * @returns {Array}
     */
    $.toArray = function (nodeList) {
      var i;
      var arr = [];
      for (i = 0; i < nodeList.length; i++) {
        if (nodeList[i]) {
          arr.push(nodeList[i]);
        }
      }

      return arr;
    };

    /**
     * 循环数组或对象
     * @param obj
     * @param callback
     */
    $.each = function (obj, callback) {
      var i;
      var prop;
      if (!obj) {
        return;
      }

      if ($.isArray(obj)) {
        // Array
        for (i = 0; i < obj.length; i++) {
          if (callback(i, obj[i]) === false) {
            break;
          }
        }
      } else {
        // Object
        for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if (callback(prop, obj[prop]) === false) {
              break;
            }
          }
        }
      }
    };

    /**
     * 去除数组中的重复值
     * @param arr
     * @returns {Array}
     */
    $.unique = function (arr) {
      var unique = [];
      for (var i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) {
          unique.push(arr[i]);
        }
      }

      return unique;
    };

    var _queueData = [];
    /**
     * 写入队列
     * @param name 队列名
     * @param func 函数名，没有函数名时，返回所有队列
     */
    $.queue = function (name, func) {
      if (typeof _queueData[name] === 'undefined') {
        _queueData[name] = [];
      }

      if (typeof func === 'undefined') {
        return _queueData[name];
      }

      _queueData[name].push(func);
    };

    /**
     * 从队列中移除一个函数，并执行该函数
     * @param name 队列名
     */
    $.dequeue = function (name) {
      if (typeof _queueData[name] !== 'undefined' && _queueData[name].length) {
        (_queueData[name].shift())();
      }
    };

    /**
     * 合并参数
     * @param defaults
     * @param params
     * @returns {*}
     */
    $.extend = function (defaults, params) {
      $.each(defaults, function (key, value) {
        if (typeof params[key] === 'undefined') {
          params[key] = value;
        }
      });

      return params;
    };

    /**
     * 在 dom 元素上存储、读取数据
     * @param dom
     * @param key
     * @param value
     *
     * $.data(dom, key);          读取指定键名的数据
     * $.data(dom, key, value);   写入指定键名的数据
     * $.data(dom, key, null);    删除指定键名的数据
     * $.data(dom, object);       批量写入数据
     */
    $.data = function (dom, key, value) {
      if (!dom.mduiDomDataStorage) {
        dom.mduiDomDataStorage = {};
      }

      var dataStorage = dom.mduiDomDataStorage;

      if (typeof value === 'undefined') {

        // 读取单个数据
        if (typeof key === 'string') {
          if (key in dataStorage) {
            return dataStorage[key];
          } else {
            return null;
          }
        }

        // 批量写入数据
        else if (typeof key === 'object') {
          $.each(key, function (k, v) {
            dataStorage[k] = v;
          });
        }
      }

      // 删除数据
      else if (value === null) {
        if (dataStorage[key]) {
          dataStorage[key] = null;
          delete dataStorage[key];
        }
      }

      // 写入数据
      else {
        dataStorage[key] = value;
      }
    };

    /**
     * 获取元素的最终样式
     * @param dom
     * @param prop 可选
     * @returns {*}
     */
    $.getStyle = function (dom, prop) {
      var style = window.getComputedStyle(dom, null);
      if (arguments.length === 1) {
        return style;
      }

      return style.getPropertyValue(prop);
    };

    /**
     * 获取元素相对于 document 的偏移
     * @param dom
     * @returns {{top: number, left: number}}
     */
    $.offset = function (dom) {
      var box = dom.getBoundingClientRect();
      var body = document.body;
      var clientTop  = dom.clientTop  || body.clientTop  || 0;
      var clientLeft = dom.clientLeft || body.clientLeft || 0;
      var scrollTop  = window.pageYOffset || dom.scrollTop;
      var scrollLeft = window.pageXOffset || dom.scrollLeft;
      return {
        top: box.top  + scrollTop  - clientTop,
        left: box.left + scrollLeft - clientLeft,
      };
    };

    /**
     * 设置 transform 属性
     * @param dom
     * @param transform
     */
    $.transform = function (dom, transform) {
      dom.style.webkitTransform =
        dom.style.transform = transform;
    };

    /**
     * 设置 transform-origin 属性
     * @param dom
     * @param transformOrigin
     */
    $.transformOrigin = function (dom, transformOrigin) {
      dom.style.webkitTransformOrigin =
        dom.style.transformOrigin = transformOrigin;
    };

    /**
     * 设置 transition 过渡时间
     * @param dom
     * @param duration
     */
    $.transition = function (dom, duration) {
      if (typeof duration !== 'string') {
        duration = duration + 'ms';
      }

      dom.style.webkitTransitionDuration =
        dom.style.transitionDuration = duration;
    };

    /**
     * 执行 document.querySelectorAll，并把结果转换为数组
     * @param selector
     * @param parent
     * @returns {Array}
     */
    $.queryAll = function (selector, parent) {
      if (arguments.length === 1) {
        parent = document;
      }

      return $.toArray(parent.querySelectorAll(selector));
    };

    /**
     * 执行 document.querySelector
     * @param selector
     * @param parent
     * @returns {Element}
     */
    $.query = function (selector, parent) {
      if (arguments.length === 1) {
        parent = document;
      }

      return parent.querySelector(selector);
    };

    /**
     * 执行 document.getElementById
     * @param id
     * @param parent
     * @returns {Element}
     */
    $.queryId = function (id, parent) {
      if (arguments.length === 1) {
        parent = document;
      }

      return parent.getElementById(id);
    };

    /**
     * @param dom
     * @param selector
     * @returns {*}
     */
    $.is = function (dom, selector) {
      var compareWith;

      if (typeof selector === 'string') {
        if (dom === document) {
          return selector === document;
        }

        if (dom === window) {
          return selector === window;
        }

        if (dom.matches) {
          return dom.matches(selector);
        } else if (dom.webkitMatchesSelector) {
          return dom.webkitMatchesSelector(selector);
        } else if (dom.mozMatchesSelector) {
          return dom.mozMatchesSelector(selector);
        } else if (dom.msMatchesSelector) {
          return dom.msMatchesSelector(selector);
        } else {
          compareWith = $.queryAll(selector);
          return (compareWith.indexOf(dom) !== -1);
        }
      } else if (selector === document) {
        return dom === document;
      } else if (selector === window) {
        return dom === window;
      } else if (selector.nodeType) {
        return dom === selector;
      } else if (selector[0].nodeType) {
        compareWith = $.toArray(selector);
        return (compareWith.indexOf(dom) !== -1);
      }

      return false;
    };

    /**
     * 查找含有指定 css 选择器的父节点
     * @param dom
     * @param selector
     * @returns {*}
     */
    $.parent = function (dom, selector) {
      var parent = dom.parentNode;
      if (parent !== null) {
        if (selector) {
          if ($.is(parent, selector)) {
            return parent;
          }
        } else {
          return parent;
        }
      }

      return undefined;
    };

    /**
     * 查找含有指定选择器的所有父元素
     * @param dom
     * @param selector
     * @returns {Array}
     */
    $.parents = function (dom, selector) {
      var parents = [];
      var parent = dom.parentNode;
      while (parent) {
        if (selector) {
          if ($.is(parent, selector)) {
            parents.push(parent);
          }
        } else {
          parents.push(parent);
        }

        parent = parent.parentNode;
      }

      return $.unique(parents);
    };

    /**
     * dom 元素是否包含在 parent 元素内
     * @param parent
     * @param dom
     * @returns {boolean}
     */
    $.contains = function (parent, dom) {
      var tmp = dom.parentNode;
      while (tmp) {
        if ($.is(tmp, parent)) {
          return true;
        }

        tmp = tmp.parentNode;
      }

      return false;
    };

    /**
     * 设置 transition 动画时间
     * @param dom
     * @param duration
     */
    $.transition = function (dom, duration) {
      if (typeof duration !== 'string') {
        duration = duration + 'ms';
      }

      dom.style.webkitTransitionDuration = dom.style.transitionDuration = duration;
    };

    /**
     * 事件绑定
     * @param dom
     * @param eventName 多个事件用空格分割
     * @param targetSelector
     * @param listener
     * @param capture
     */
    $.on = function (dom, eventName, targetSelector, listener, capture) {
      // 处理委托事件
      function handleLiveEvent(e) {
        var target = e.target;
        if ($.is(target, targetSelector)) {
          listener.call(target, e);
        } else {
          var parents = $.parents(target);
          for (var k = 0; k < parents.length; k++) {
            if ($.is(parents[k], targetSelector)) {
              listener.call(parents[k], e);
            }
          }
        }
      }

      var events = eventName.split(' ');
      var i;
      if (typeof targetSelector === 'function' || targetSelector === false) {
        if (typeof targetSelector === 'function') {
          listener = arguments[2];
          capture = arguments[3] || false;
        }

        for (i = 0; i < events.length; i++) {
          dom.addEventListener(events[i], listener, capture);
        }
      } else {
        // Live events
        for (i = 0; i < events.length; i++) {
          if (!dom.domLiveListeners) {
            dom.domLiveListeners = [];
          }

          dom.domLiveListeners.push({ listener: listener, liveListener: handleLiveEvent });
          dom.addEventListener(events[i], handleLiveEvent, capture);
        }
      }
    };

    /**
     * 解除事件绑定
     * @param dom
     * @param eventName
     * @param targetSelector
     * @param listener
     * @param capture
     */
    $.off = function (dom, eventName, targetSelector, listener, capture) {
      var events = eventName.split(' ');
      for (var i = 0; i < events.length; i++) {
        if (typeof targetSelector === 'function') {
          listener = arguments[2];
          capture = arguments[3] || false;
          dom.removeEventListener(events[i], listener, capture);
        } else {
          // Live event
          if (dom.domLiveListeners) {
            for (var j = 0; j < dom.domLiveListeners.length; j++) {
              if (dom.domLiveListeners[j].listener === listener) {
                dom.removeEventListener(events[i], dom.domLiveListeners[j].liveListener, capture);
              }
            }
          }
        }
      }
    };

    /**
     * 事件绑定，只触发一次
     * @param dom
     * @param eventName
     * @param targetSelector
     * @param listener
     * @param capture
     * @returns {*}
     */
    $.one = function (dom, eventName, targetSelector, listener, capture) {
      if (typeof targetSelector === 'function') {
        listener = arguments[2];
        capture = arguments[3];
        targetSelector = false;
      }

      function proxy(e) {
        listener.call(e.target, e);
        $.off(dom, eventName, targetSelector, proxy, capture);
      }

      $.on(dom, eventName, targetSelector, proxy, capture);
    };

    /**
     * 触发事件
     * @param dom
     * @param eventName
     * @param eventData
     */
    $.trigger = function (dom, eventName, eventData) {
      var events = eventName.split(' ');
      for (var i = 0; i < events.length; i++) {
        var evt;
        try {
          evt = new CustomEvent(events[i], { detail: eventData, bubbles: true, cancelable: true });
        } catch (e) {
          evt = document.createEvent('Event');
          evt.initEvent(events[i], true, true);
          evt.detail = eventData;
        }

        dom.dispatchEvent(evt);
      }
    };

    /**
     * transition 动画结束回调
     * @param dom
     * @param callback
     */
    $.transitionEnd = function (dom, callback) {
      var events = [
        'webkitTransitionEnd',
        'transitionend',
      ];
      var i;
      function fireCallback(e) {
        if (e.target !== dom) {
          return;
        }

        callback.call(dom, e);
        for (i = 0; i < events.length; i++) {
          $.off(dom, events[i], fireCallback);
        }
      }

      if (callback) {
        for (i = 0; i < events.length; i++) {
          $.on(dom, events[i], fireCallback);
        }
      }
    };

    /**
     * 重绘
     * @param dom
     * @returns {number}
     */
    $.relayout = function (dom) {
      return dom.clientLeft;
    };

    $.requestAnimationFrame = function (callback) {
      var raf = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame;
      if (raf) {
        return raf(callback);
      } else {
        return window.setTimeout(callback, 1000 / 60);
      }
    };

    $.cancelAnimationFrame = function (id) {
      var caf = window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame;
      if (caf) {
        return caf(id);
      } else {
        return window.clearTimeout(id);
      }
    };

    /**
     * 创建 Node 数组
     * @param selector 选择器或 html 字符串
     * @returns {Array}
     */
    $.dom = function (selector) {
      var tempParent;

      if (!selector) {
        return [];
      }

      // String
      if (typeof selector === 'string') {
        selector = selector.trim();
        if (selector.indexOf('<') >= 0 && selector.indexOf('>') >= 0) {
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
          return $.toArray(tempParent.childNodes);
        } else {
          if (selector[0] === '#' &&  !selector.match(/[ .<>:~]/)) {
            // ID 选择器
            return [$.queryId(selector.split('#')[1])];
          } else {
            // 其他选择器
            return $.queryAll(selector);
          }
        }
      }

      // Node
      else if (selector.nodeType || selector === window || selector === document) {
        return [selector];
      }

      // Array of elements
      else if (selector.length > 0 && selector[0].nodeType) {
        return $.toArray(selector);
      }

      return [];
    };

    /**
     * 获取含指定 css 的直接子元素数组
     * @param dom
     * @param selector
     * @returns {Array}
     */
    $.children = function (dom, selector) {
      var children = [];
      var childNodes = dom.childNodes;

      if (!selector) {
        return $.toArray(childNodes);
      }

      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1 && $.is(childNodes[i], selector)) {
          children.push(childNodes[i]);
        }
      }

      return children.length ? children : null;
    };

    /**
     * 获取含指定 css 的第一个直接子元素
     * @param dom
     * @param selector
     * @returns {*}
     */
    $.child = function (dom, selector) {
      var childNodes = dom.childNodes;

      if (!selector) {
        return childNodes[0];
      }

      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1 && $.is(childNodes[i], selector)) {
          return childNodes[i];
        }
      }

      return null;
    };

    /**
     * 移除 dom 元素
     * @param dom
     */
    $.remove = function (dom) {
      if (dom) {
        dom.parentNode.removeChild(dom);
      }
    };

    /**
     * 移除 dom 元素中所有的子元素
     * @param dom
     */
    $.empty = function (dom) {
      if (!dom) {
        return;
      }

      if (dom.nodeType !== 1) {
        return;
      }

      for (var i = 0; i < dom.childNodes.length; i++) {
        $.remove(dom.childNodes[i]);
      }

      dom.textContent = '';
    };

    /**
     * 把 newChild 添加到 dom 元素内的最前面
     * @param dom
     * @param newChild
     */
    $.prepend = function (dom, newChild) {
      dom.insertBefore(newChild, dom.childNodes[0]);
    };

    /**
     * Dom 加载完毕后
     * @param fn
     */
    $.ready = function (fn) {
      document.addEventListener('DOMContentLoaded', function () {
        fn();
      });
    };

    /**
     * 解析 DATA API 参数
     * @param str
     * @returns {{}}
     */
    $.parseOptions = function (str) {
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
     * 触发插件的事件
     * @param eventName 事件名
     * @param pluginName 插件名
     * @param inst 插件实例
     * @param trigger 在该元素上触发
     * @param obj 事件参数
     */
    $.pluginEvent = function (eventName, pluginName, inst, trigger, obj) {
      if (typeof obj === 'undefined') {
        obj = {};
      }

      obj.inst = inst;

      var fullEventName = eventName + '.mdui.' + pluginName;

      // jQuery 事件
      if (typeof jQuery !== 'undefined') {
        jQuery(trigger).trigger(fullEventName, obj);
      }

      // 原生js事件
      $.trigger(trigger, fullEventName, obj);
    };

  })();


  /**
   * =============================================================================
   * ************   检测支持的特性   ************
   * =============================================================================
   */

  (function () {
    mdui.support = {
      touch: !!('ontouchstart' in window),
    };
  })();


  /**
   * 触摸或鼠标事件
   */
  mdui.touchEvents = {
    start: mdui.support.touch ? 'touchstart' : 'mousedown',
    move: mdui.support.touch ? 'touchmove' : 'mousemove',
    end: mdui.support.touch ? 'touchend' : 'mouseup',
  };

  /**
   * 判断窗口大小
   */
  mdui.screen = {
    xs: function () {
      return window.innerWidth < 600;
    },

    sm: function () {
      return window.innerWidth >= 600 && window.innerWidth < 1024;
    },

    md: function () {
      return window.innerWidth >= 1024 && window.innerWidth < 1440;
    },

    lg: function () {
      return window.innerWidth >= 1440 && window.innerWidth < 1920;
    },

    xl: function () {
      return window.innerWidth >= 1920;
    },

    xsDown: function () {
      return window.innerWidth < 600;
    },

    smDown: function () {
      return window.innerWidth < 1024;
    },

    mdDown: function () {
      return window.innerWidth < 1440;
    },

    lgDown: function () {
      return window.innerWidth < 1920;
    },

    xlDown: function () {
      return true;
    },

    xsUp: function () {
      return true;
    },

    smUp: function () {
      return window.innerWidth >= 600;
    },

    mdUp: function () {
      return window.innerWidth >= 1024;
    },

    lgUp: function () {
      return window.innerWidth >= 1440;
    },

    xlUp: function () {
      return window.innerWidth >= 1920;
    },

  };

  /**
   * 创建遮罩层并显示
   * @param zIndex 遮罩层的 z_index
   * @returns {Element}
   */
  mdui.showOverlay = function (zIndex) {
    var overlay = $.dom('<div class="mdui-overlay">')[0];
    document.body.appendChild(overlay);

    $.relayout(overlay);

    if (typeof zIndex === 'undefined') {
      zIndex = 2000;
    }

    overlay.style['z-index'] = zIndex;
    overlay.classList.add('mdui-overlay-show');

    return overlay;
  };

  /**
   * 隐藏遮罩层
   * @param overlay 指定遮罩层元素，若没有该参数，则移除所有遮罩层
   */
  mdui.hideOverlay = function (overlay) {
    var overlays;
    if (typeof overlay === 'undefined') {
      overlays = $.queryAll('.mdui-overlay');
    } else {
      overlays = [overlay];
    }

    $.each(overlays, function (i, overlay) {
      overlay.classList.remove('mdui-overlay-show');
      $.transitionEnd(overlay, function () {
        $.remove(overlay);
      });
    });
  };

  /**
   * 锁定屏幕
   */
  mdui.lockScreen = function () {
    var body = document.body;
    var oldWindowWidth = body.clientWidth;

    // 不直接把 body 设为 box-sizing: border-box，避免污染全局样式
    var oldBodyPaddingLeft = parseFloat($.getStyle(body, 'padding-left'));
    var oldBodyPaddingRight = parseFloat($.getStyle(body, 'padding-right'));

    document.body.classList.add('mdui-locked');
    document.body.style.width = oldWindowWidth - oldBodyPaddingLeft - oldBodyPaddingRight + 'px';
  };

  /**
   * 解除屏幕锁定
   */
  mdui.unlockScreen = function () {
    document.body.classList.remove('mdui-locked');
    document.body.style.width = '';
  };

  /**
   * 函数节流
   * @param fn
   * @param delay
   * @returns {Function}
   */
  mdui.throttle = function (fn, delay) {
    var timer = null;

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
  };

  /**
   * 生成唯一 id
   * @param pluginName 插件名，若传入该参数，guid 将以该参数作为前缀
   * @returns {string}
   */
  mdui.guid = function (pluginName) {
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
  };

  $.ready(function () {
    // 避免页面加载完后直接执行css动画
    // https://css-tricks.com/transitions-only-after-page-load/

    setTimeout(function () {
      document.body.classList.add('mdui-loaded');
    }, 0);

    // 支持触摸时在 body 添加 mdui-support-touch
    if (mdui.support.touch) {
      document.body.classList.add('mdui-support-touch');
    }

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
      tolerance: 5,                                // 滚动条滚动多少距离开始隐藏或显示元素，{down: num, up: num}，或数字
      offset: 0,                                   // 在页面顶部多少距离内滚动不会隐藏元素
      initialClass: 'mdui-headroom',               // 初始化时添加的类
      pinnedClass: 'mdui-headroom-pinned-top',     // 元素固定时添加的类
      unpinnedClass: 'mdui-headroom-unpinned-top', // 元素隐藏时添加的类
    };

    /**
     * Headroom
     * @param selector
     * @param opts
     * @constructor
     */
    function Headroom(selector, opts) {
      var _this = this;

      _this.headroom = $.dom(selector)[0];
      if (typeof _this.headroom === 'undefined') {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = $.data(_this.headroom, 'mdui.headroom');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend(DEFAULT, (opts || {}));

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
      _this.headroom.classList.add(_this.options.initialClass);
      _this.headroom.classList.remove(
        _this.options.pinnedClass,
        _this.options.unpinnedClass
      );

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
        $.on(window, 'scroll', function () {
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
      _this.animationFrameId = $.requestAnimationFrame(function () {
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
     * 固定住
     */
    Headroom.prototype.pin = function () {
      var _this = this;

      if (
        _this.state === 'pinning' ||
        _this.state === 'pinned' ||
        !_this.headroom.classList.contains(_this.options.initialClass)
      ) {
        return;
      }

      _this.state = 'pinning';
      _this.headroom.classList.remove(_this.options.unpinnedClass);
      _this.headroom.classList.add(_this.options.pinnedClass);
      $.pluginEvent('pin', 'headroom', _this, _this.headroom);

      $.transitionEnd(_this.headroom, function () {
        if (_this.state === 'pinning') {
          _this.state = 'pinned';
          $.pluginEvent('pinned', 'headroom', _this, _this.headroom);
        }
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
        !_this.headroom.classList.contains(_this.options.initialClass)
      ) {
        return;
      }

      _this.state = 'unpinning';
      _this.headroom.classList.remove(_this.options.pinnedClass);
      _this.headroom.classList.add(_this.options.unpinnedClass);
      $.pluginEvent('unpin', 'headroom', _this, _this.headroom);

      $.transitionEnd(_this.headroom, function () {
        if (_this.state === 'unpinning') {
          _this.state = 'unpinned';
          $.pluginEvent('unpinned', 'headroom', _this, _this.headroom);
        }
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
        _this.headroom.classList.remove(
          _this.options.initialClass,
          _this.options.pinnedClass,
          _this.options.unpinnedClass
        );
        $.off(window, 'scroll', function () {
          _this._scroll();
        });

        $.cancelAnimationFrame(_this.animationFrameId);
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

  $.ready(function () {

    $.each($.queryAll('[mdui-headroom]'), function (i, target) {
      var options = $.parseOptions(target.getAttribute('mdui-headroom'));

      var inst = $.data(target, 'mdui.headroom');
      if (!inst) {
        inst = new mdui.Headroom(target, options);
        $.data(target, 'mdui.headroom', inst);
      }
    });
  });


  /**
   * =============================================================================
   * ************   供 Collapse、 Panel 调用的折叠内容块插件   ************
   * =============================================================================
   */
  $.Collapse = (function () {

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

      _this.classes = $.extend(CLASS, classes || {});
      _this.namespace = (typeof namespace === 'undefined' || !namespace) ? NAMESPACE : namespace;

      // 折叠面板元素
      _this.collapse = $.dom(selector)[0];
      if (typeof _this.collapse === 'undefined') {
        return;
      }

      _this.options = $.extend(DEFAULT, (opts || {}));

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = $.data(_this.collapse, 'mdui.' + _this.namespace);
      if (oldInst) {
        return oldInst;
      }

      $.on(_this.collapse, 'click', '.' + _this.classes.header, function (e) {
        var item = $.parent(this, '.' + _this.classes.item);
        if ($.child(_this.collapse, item)) {
          _this.toggle(item);
        }
      });
    }

    /**
     * 指定 item 是否处于打开状态
     * @param item
     * @returns {boolean}
     * @private
     */
    Collapse.prototype._isOpen = function (item) {
      return item.classList.contains(this.classes.itemOpen);
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
        var items = $.children(_this.collapse, '.' + _this.classes.item);
        return items[item];
      }

      return $.dom(item)[0];
    };

    /**
     * 打开指定面板项
     * @param item 面板项的索引号或 DOM 元素或 CSS 选择器
     */
    Collapse.prototype.open = function (item) {
      var _this = this;
      item = _this._getItem(item);

      if (_this._isOpen(item)) {
        return;
      }

      // 关闭其他项
      if (_this.options.accordion) {
        $.each($.children(_this.collapse, '.' + _this.classes.itemOpen), function (i, temp) {
          if (temp !== item) {
            _this.close(temp);
          }
        });
      }

      var content = $.child(item, '.' + _this.classes.body);
      content.style.height = content.scrollHeight + 'px';

      $.transitionEnd(content, function () {
        if (_this._isOpen(item)) {
          $.transition(content, 0);
          content.style.height = 'auto';
          $.relayout(content);
          $.transition(content, '');
          $.pluginEvent('opened', _this.namespace, _this, item);
        } else {
          content.style.height = '';
        }
      });

      $.pluginEvent('open', _this.namespace, _this, item);
      item.classList.add(_this.classes.itemOpen);
    };

    /**
     * 关闭指定项
     * @param item 面板项的索引号或 DOM 元素或 CSS 选择器
     */
    Collapse.prototype.close = function (item) {
      var _this = this;
      item = _this._getItem(item);

      if (!_this._isOpen(item)) {
        return;
      }

      var content = $.child(item, '.' + _this.classes.body);
      item.classList.remove(_this.classes.itemOpen);
      $.transition(content, 0);
      content.style.height = content.scrollHeight + 'px';
      $.relayout(content);

      $.transition(content, '');
      content.style.height = '';
      $.pluginEvent('close', _this.namespace, _this, item);

      $.transitionEnd(content, function () {
        if (_this._isOpen(item)) {
          $.transition(content, 0);
          content.style.height = 'auto';
          $.relayout(content);
          $.transition(content, '');
        } else {
          content.style.height = '';
          $.pluginEvent('closed', _this.namespace, _this, item);
        }
      });
    };

    /**
     * 切换指定项的状态
     * @param item 面板项的索引号或 DOM 元素或 CSS 选择器
     */
    Collapse.prototype.toggle = function (item) {
      var _this = this;
      item = _this._getItem(item);

      if (_this._isOpen(item)) {
        _this.close(item);
      } else {
        _this.open(item);
      }
    };

    /**
     * 打开所有项
     */
    Collapse.prototype.openAll = function () {
      var _this = this;

      $.each($.children(_this.collapse, '.' + _this.classes.item), function (i, item) {
        if (!_this._isOpen(item)) {
          _this.open(item);
        }
      });
    };

    /**
     * 关闭所有项
     */
    Collapse.prototype.closeAll = function () {
      var _this = this;

      $.each($.children(_this.collapse, '.' + _this.classes.item), function (i, item) {
        if (_this._isOpen(item)) {
          _this.close(item);
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
      return new $.Collapse(selector, opts);
    }

    return Collapse;
  })();


  /**
   * =============================================================================
   * ************   Collapse 自定义属性   ************
   * =============================================================================
   */

  $.ready(function () {

    // 实例化插件
    $.each($.queryAll('[mdui-collapse]'), function (i, target) {
      var options = $.parseOptions(target.getAttribute('mdui-collapse'));

      var inst = $.data(target, 'mdui.collapse');
      if (!inst) {
        inst = new mdui.Collapse(target, options);
        $.data(target, 'mdui.collapse', inst);
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
      _this.table = $.dom(selector)[0];
      _this.init();
    }

    /**
     * 初始化
     */
    Table.prototype.init = function () {
      var _this = this;

      _this.thRow = $.query('thead tr', _this.table);
      _this.tdRows = $.queryAll('tbody tr', _this.table);
      _this.tdCheckboxs = [];
      _this.selectable = _this.table.classList.contains('mdui-table-selectable');

      _this.updateTdCheckbox();
      _this.updateThCheckbox();
      _this.updateNumericCol();
    };

    /**
     * 更新表格行的 checkbox
     */
    Table.prototype.updateTdCheckbox = function () {
      var _this = this;
      var td;
      var tdCheckbox;
      _this.tdCheckboxs = [];

      $.each(_this.tdRows, function (i, tdRow) {
        // 移除旧的 checkbox
        tdCheckbox = $.query('.mdui-table-cell-checkbox', tdRow);
        if (tdCheckbox) {
          $.remove(tdCheckbox);
        }

        // 创建新的 checkbox
        if (_this.selectable) {
          // 创建 DOM
          td = $.dom(checkboxHTML('td'))[0];
          $.prepend(tdRow, td);

          var checkbox = $.query('input[type="checkbox"]', td);

          // 默认选中的行
          if (tdRow.classList.contains('mdui-table-row-selected')) {
            checkbox.checked = true;
          }

          // 绑定事件
          $.on(checkbox, 'change', function () {
            tdRow.classList[checkbox.checked ? 'add' : 'remove']('mdui-table-row-selected');
          });

          _this.tdCheckboxs.push(checkbox);
        }
      });
    };

    /**
     * 更新表头的 checkbox
     */
    Table.prototype.updateThCheckbox = function () {
      var _this = this;
      var thCheckbox;

      // 移除旧的 checkbox
      thCheckbox = $.query('.mdui-table-cell-checkbox', _this.thRow);
      if (thCheckbox) {
        $.remove(thCheckbox);
      }

      if (!_this.selectable) {
        return;
      }

      // 创建 DOM
      var th = $.dom(checkboxHTML('th'))[0];
      $.prepend(_this.thRow, th);

      // 绑定事件
      thCheckbox = $.query('input[type="checkbox"]', th);
      $.on(thCheckbox, 'change', function () {

        $.each(_this.tdCheckboxs, function (i, checkbox) {
          checkbox.checked = thCheckbox.checked;
        });

        $.each(_this.tdRows, function (i, row) {
          row.classList[thCheckbox.checked ? 'add' : 'remove']('mdui-table-row-selected');
        });

      });
    };

    /**
     * 更新数值列
     */
    Table.prototype.updateNumericCol = function () {
      var _this = this;

      var ths = $.queryAll('th', _this.thRow);
      $.each(ths, function (i, th) {
        $.each(_this.tdRows, function (j, tdRow) {
          var method = th.classList.contains('mdui-table-col-numeric') ? 'add' : 'remove';
          var td = $.queryAll('td', tdRow)[i];
          if (td) {
            td.classList[method]('mdui-table-col-numeric');
          }
        });
      });
    };

    $.ready(function () {
      // 实例化表格
      var tables = $.queryAll('.mdui-table');
      $.each(tables, function (i, table) {
        var inst = new Table(table);
        $.data(table, 'mdui.table', inst);
      });
    });

    /**
     * 更新表格
     */
    mdui.updateTables = function () {
      var tables;

      if (arguments.length === 1) {
        tables = $.dom(arguments[0]);
      } else {
        tables = $.queryAll('.mdui-table');
      }

      $.each(tables, function (i, table) {
        var inst = $.data(table, 'mdui.table');
        inst.init();
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
       * 显示涟漪动画
       * @param e
       * @param element
       */
      show: function (e, element) {

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
        var box = element.getBoundingClientRect();
        var offset = $.offset(element);
        var center = {
          x: touchStartX - offset.left,
          y: touchStartY - offset.top,
        };

        var height = box.height;
        var width = box.width;
        var diameter = Math.max(
          Math.pow((Math.pow(height, 2) + Math.pow(width, 2)), 0.5), 48
        );

        // 涟漪扩散动画
        var translate =
          'translate3d(' + (-center.x + width / 2) + 'px, ' + (-center.y + height / 2) + 'px, 0) ' +
          'scale(1)';

        // 涟漪的 DOM 结构
        var ripple = $.dom('<div class="mdui-ripple-wave" style="' +
          'width: ' + diameter + 'px; ' +
          'height: ' + diameter + 'px; ' +
          'margin-top:-' + diameter / 2 + 'px; ' +
          'margin-left:-' + diameter / 2 + 'px; ' +
          'left:' + center.x + 'px; ' +
          'top:' + center.y + 'px;">' +
          '</div>')[0];

        // 缓存动画效果
        $.data(ripple, {
          translate: translate,
        });

        $.prepend(element, ripple);
        $.relayout(ripple);
        $.transform(ripple, translate);
      },

      /**
       * 隐藏涟漪动画
       * @param e
       * @param element
       */
      hide: function (e, element) {
        element = element || this;

        var ripples = $.children(element, '.mdui-ripple-wave');

        $.each(ripples, function (i, ripple) {
          removeRipple(ripple);
        });

        if (mdui.support.touch) {
          $.off(element, 'touchmove touchend touchcancel', Ripple.hide);
        }

        $.off(element, 'mousemove mouseup mouseleave', Ripple.hide);
      },
    };

    /**
     * 隐藏并移除涟漪
     * @param ripple
     */
    function removeRipple(ripple) {
      if (!ripple || $.data(ripple, 'isRemoved')) {
        return;
      }

      $.data(ripple, 'isRemoved', true);

      var removeTimeout = setTimeout(function () {
        $.remove(ripple);
      }, 400);

      ripple.classList.add('mdui-ripple-wave-fill');
      var translate = $.data(ripple, 'translate');
      $.transform(ripple, translate.replace('scale(1)', 'scale(1.01)'));
      $.transitionEnd(ripple, function (e) {
        clearTimeout(removeTimeout);

        var ripple = e.target;
        ripple.classList.add('mdui-ripple-wave-out');
        $.transform(ripple, translate.replace('scale(1)', 'scale(1.01)'));

        removeTimeout = setTimeout(function () {
          $.remove(ripple);
        }, 700);

        setTimeout(function () {
          $.transitionEnd(ripple, function (e) {
            clearTimeout(removeTimeout);
            $.remove(e.target);
          });
        }, 0);
      });
    }

    /**
     * touch 事件后的 500ms 内禁用 mousedown 事件
     */
    var TouchHandler = {
      touches: 0,

      allowEvent: function (e) {
        var allow = true;

        if (e.type === 'mousedown' && TouchHandler.touches) {
          allow = false;
        }

        return allow;
      },

      registerEvent: function (e) {
        var eType = e.type;

        if (eType === 'touchstart') {
          TouchHandler.touches += 1;
        } else if (['touchmove', 'touchend', 'touchcancel'].indexOf(eType) > -1) {
          setTimeout(function () {
            if (TouchHandler.touches) {
              TouchHandler.touches -= 1;
            }
          }, 500);
        }
      },
    };

    /**
     * 找到含 .mdui-ripple 类的元素
     * @param e
     * @returns {*}
     */
    function getRippleElement(e) {
      if (TouchHandler.allowEvent(e) === false) {
        return null;
      }

      var element = null;
      var target = e.target;
      var rippleParents;

      if (target.classList.contains('mdui-ripple')) {
        element = target;
      } else {
        rippleParents = $.parents(target, '.mdui-ripple');
        if (rippleParents.length) {
          element = rippleParents[0];
        }
      }

      return element;
    }

    /**
     * 显示涟漪，并绑定 touchend 等事件
     * @param e
     */
    function showRipple(e) {
      var element = getRippleElement(e);

      if (element !== null) {

        // 禁用状态的元素上不产生涟漪效果
        if (element.disabled || element.getAttribute('disabled')) {
          return;
        }

        TouchHandler.registerEvent(e);

        Ripple.show(e, element);

        if (mdui.support.touch) {
          $.on(element, 'touchmove touchend touchcancel', Ripple.hide);
        }

        $.on(element, 'mousemove mouseup mouseleave', Ripple.hide);
      }
    }

    // 初始化绑定的事件
    if (mdui.support.touch) {
      $.on(document, 'touchstart', showRipple);
      $.on(document, 'touchmove touchend touchcancel', TouchHandler.registerEvent);
    }

    $.on(document, 'mousedown', showRipple);
  })();


  /**
   * =============================================================================
   * ************   Text Field 文本框   ************
   * =============================================================================
   */

  (function () {

    var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];

    var classNames = {
      field: 'mdui-textfield',
      input: 'mdui-textfield-input',
      focus: 'mdui-textfield-focus',
      notEmpty: 'mdui-textfield-not-empty',
      disabled: 'mdui-textfield-disabled',
      invalid: 'mdui-textfield-invalid',
      expanded: 'mdui-textfield-expanded',
    };

    /**
     * 输入框事件
     * @param e
     */
    var inputEvent = function (e) {
      var input = e.target;
      var event = e.type;
      var value = input.value;

      // reInit 为 true 时，需要重新初始化文本框
      var reInit;
      if (
        typeof e.detail === 'object' &&
        typeof e.detail.reInit !== 'undefined' &&
        e.detail.reInit
      ) {
        reInit = e.detail.reInit;
      } else {
        reInit = false;
      }

      // domLoadedEvent 为 true 时，为 DOM 加载完毕后自动触发的事件
      var domLoadedEvent;
      if (
        typeof e.detail === 'object' &&
        typeof e.detail.domLoadedEvent !== 'undefined' &&
        e.detail.domLoadedEvent
      ) {
        domLoadedEvent = e.detail.domLoadedEvent;
      } else {
        domLoadedEvent = false;
      }

      // 文本框类型
      var type = input.getAttribute('type') || '';
      if (notInputs.indexOf(type) >= 0) {
        return;
      }

      var textField = $.parents(input, '.' + classNames.field)[0];

      // 输入框是否聚焦
      if (event === 'focus') {
        textField.classList.add(classNames.focus);
      }

      if (event === 'blur') {
        textField.classList.remove(classNames.focus);
      }

      // 输入框是否为空
      if (event === 'blur' || event === 'input') {
        if (value && value !== '') {
          textField.classList.add(classNames.notEmpty);
        } else {
          textField.classList.remove(classNames.notEmpty);
        }
      }

      // 输入框是否禁用
      if (input.disabled) {
        textField.classList.add(classNames.disabled);
      } else {
        textField.classList.remove(classNames.disabled);
      }

      // 表单验证
      if ((event === 'input' || event === 'blur') && !domLoadedEvent) {
        if (input.validity) {
          if (input.validity.valid) {
            textField.classList.remove(classNames.invalid);
          } else {
            textField.classList.add(classNames.invalid);
          }
        }
      }

      // textarea 高度自动调整
      if (e.target.nodeName.toLowerCase() === 'textarea') {
        input.style.height = '';
        var height = input.offsetHeight;
        var diff = height - input.clientHeight;
        var scrollHeight = input.scrollHeight;

        if (scrollHeight + diff > height) {
          var newAreaHeight = scrollHeight + diff;
          input.style.height = newAreaHeight + 'px';
        }
      }

      // 实时字数统计
      var counter;
      if (reInit) {
        textField.classList.remove('mdui-textfield-has-counter');
        counter = $.query('.mdui-textfield-counter', textField);
        if (counter) {
          $.remove(counter);
        }
      }

      var maxlength = input.getAttribute('maxlength');
      if (maxlength) {
        if (reInit || domLoadedEvent) {
          counter = $.dom(
            '<div class="mdui-textfield-counter">' +
              '<span class="mdui-textfield-counter-inputed"></span> / ' + maxlength +
            '</div>'
          )[0];
          textField.appendChild(counter);

          // 如果没有 .mdui-textfield-error 作为占位，需要增加 .mdui-textfield 的下边距，
          // 使 .mdui-textfield-counter 不会覆盖在文本框上
          if (!$.query('.mdui-textfield-error', textField)) {
            textField.classList.add('mdui-textfield-has-counter');
          }
        }

        // 字符长度，确保统计方式和 maxlength 一致
        var inputed = input.value.length + input.value.split('\n').length - 1;
        $.query('.mdui-textfield-counter-inputed', textField).innerText = inputed.toString();
      }

    };

    // 绑定事件
    var inputSelector = '.' + classNames.field + ' input, .' + classNames.field + ' textarea';
    $.on(document, 'input focus blur', inputSelector, inputEvent, true);

    // 可展开文本框展开
    $.on(document, 'click', '.mdui-textfield-expandable .mdui-textfield-icon', function () {
      var _this = this;
      var textField = $.parents(_this, '.' + classNames.field)[0];
      var input = $.query('.' + classNames.input, textField);

      textField.classList.add(classNames.expanded);
      input.focus();
    });

    // 可展开文本框关闭
    $.on(document, 'click', '.mdui-textfield-expandable .mdui-textfield-close', function () {
      var _this = this;
      var textField = $.parents(_this, '.' + classNames.field)[0];
      var input = $.query('.' + classNames.input, textField);

      textField.classList.remove(classNames.expanded);
      input.value = '';
    });

    /**
     * 通过 JS 更新了表单内容，需要重新进行表单处理
     * @param dom 如果传入了 .mdui-textfield 所在的 DOM 元素，则更新该文本框；否则，更新所有文本框
     */
    mdui.updateTextFields = function () {
      var textfields;
      var input;

      if (arguments.length === 1) {
        textfields = $.dom(arguments[0]);
      } else {
        textfields = $.queryAll('.mdui-textfield');
      }

      $.each(textfields, function (i, textfield) {
        input = $.query('.mdui-textfield-input', textfield);
        if (input) {
          $.trigger(input, 'input', {
            reInit: true,
          });
        }
      });
    };

    $.ready(function () {

      // DOM 加载完后自动执行
      $.each($.queryAll('.mdui-textfield-input'), function (i, input) {
        $.trigger(input, 'input', {
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
     * @param slider
     */
    var updateValueStyle = function (slider) {
      var track = $.data(slider, 'track');
      var fill = $.data(slider, 'fill');
      var thumb = $.data(slider, 'thumb');
      var input = $.data(slider, 'input');
      var min = $.data(slider, 'min');
      var max = $.data(slider, 'max');
      var isDisabled = $.data(slider, 'disabled');
      var isDiscrete = $.data(slider, 'discrete');
      var thumbText = $.data(slider, 'thumbText');
      var percent = (input.value - min) / (max - min) * 100;

      fill.style.width = percent + '%';
      track.style.width = 100 - percent + '%';

      if (isDisabled) {
        fill.style['padding-right'] = '6px';
        track.style['padding-left'] = '6px';
      }

      thumb.style.left = percent + '%';

      if (isDiscrete) {
        thumbText.textContent = input.value;
      }

      slider.classList[parseFloat(percent) === 0 ? 'add' : 'remove']('mdui-slider-zero');
    };

    /**
     * 重新初始化
     * @param slider
     */
    var reInit = function (slider) {
      var track = $.dom('<div class="mdui-slider-track"></div>')[0];
      var fill = $.dom('<div class="mdui-slider-fill"></div>')[0];
      var thumb = $.dom('<div class="mdui-slider-thumb"></div>')[0];
      var input = $.query('input[type="range"]', slider);

      // 禁用状态
      var isDisabled = input.disabled;
      slider.classList[isDisabled ? 'add' : 'remove']('mdui-slider-disabled');

      // 重新填充 HTML
      $.remove($.query('.mdui-slider-track', slider));
      slider.appendChild(track);

      $.remove($.query('.mdui-slider-fill', slider));
      slider.appendChild(fill);

      $.remove($.query('.mdui-slider-thumb', slider));
      slider.appendChild(thumb);

      // 间续型滑块
      var isDiscrete = slider.classList.contains('mdui-slider-discrete');

      var thumbText;
      if (isDiscrete) {
        thumbText = $.dom('<span></span>')[0];

        $.empty(thumb);
        thumb.appendChild(thumbText);
      }

      $.data(slider, {
        track: track,
        fill: fill,
        thumb: thumb,
        input: input,
        min: input.getAttribute('min'),   // 滑块最小值
        max: input.getAttribute('max'),   // 滑块最大值
        disabled: isDisabled,             // 是否禁用状态
        discrete: isDiscrete,             // 是否是间续型滑块
        thumbText: thumbText,             // 间续型滑块的数值
      });

      // 设置默认值
      updateValueStyle(slider);
    };

    /**
     * 滑动滑块事件
     */
    $.on(document, 'input change', '.mdui-slider input[type="range"]', function () {
      var slider = $.parent(this, '.mdui-slider');
      updateValueStyle(slider);
    });

    /**
     * 开始触摸滑块事件
     */
    $.on(document, mdui.touchEvents.start, '.mdui-slider input[type="range"]', function () {
      var slider = $.parent(this, '.mdui-slider');
      if (!this.disabled) {
        slider.classList.add('mdui-slider-focus');
      }
    });

    /**
     * 结束触摸滑块事件
     */
    $.on(document, mdui.touchEvents.end, '.mdui-slider input[type="range"]', function () {
      var slider = $.parent(this, '.mdui-slider');
      if (!this.disabled) {
        slider.classList.remove('mdui-slider-focus');
      }
    });

    /**
     * 页面加载完后自动初始化
     */
    $.ready(function () {
      var sliders = $.queryAll('.mdui-slider');
      $.each(sliders, function (i, slider) {
        reInit(slider);
      });
    });

    /**
     * 重新初始化滑块
     */
    mdui.updateSliders = function () {
      var sliders;

      if (arguments.length === 1) {
        sliders = $.dom(arguments[0]);
      } else {
        sliders = $.queryAll('.mdui-slider');
      }

      $.each(sliders, function (i, slider) {
        reInit(slider);
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
     * @param selector 选择器或 HTML 字符串或 DOM 元素
     * @param opts
     * @constructor
     */
    function Fab(selector, opts) {
      var _this = this;

      _this.fab = $.dom(selector)[0];
      if (typeof _this.fab === 'undefined') {
        return;
      }

      // 已通过 data 属性实例化过，不再重复实例化
      var oldInst = $.data(_this.fab, 'mdui.fab');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend(DEFAULT, (opts || {}));
      _this.state = 'closed';

      _this.btn = $.child(_this.fab, '.mdui-fab');
      _this.dial = $.child(_this.fab, '.mdui-fab-dial');
      _this.dialBtns = $.queryAll('.mdui-fab', _this.dial);

      // 支持 touch 时，始终在 touchstart 时切换，不受 trigger 参数影响
      if (mdui.support.touch) {
        $.on(_this.btn, 'touchstart', function () {
          _this.open();
        });

        $.on(document, 'touchend', function (e) {
          if (!$.parents(e.target, '.mdui-fab-wrapper').length) {
            _this.close();
          }
        });
      }

      // 不支持touch
      else {

        // 点击切换
        if (_this.options.trigger === 'click') {
          $.on(_this.btn, 'click', function () {
            _this.toggle();
          });
        }

        // 鼠标悬浮切换
        if (_this.options.trigger === 'hover') {
          $.on(_this.fab, 'mouseenter', function () {
            _this.open();
          });

          $.on(_this.fab, 'mouseleave', function () {
            _this.close();
          });
        }
      }
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
      $.each(_this.dialBtns, function (index, btn) {
        btn.style['transition-delay'] = 15 * (_this.dialBtns.length - index) + 'ms';
      });

      _this.dial.classList.add('mdui-fab-dial-show');

      // 如果按钮中存在 .mdui-fab-opened 的图标，则进行图标切换
      if ($.query('.mdui-fab-opened', _this.btn)) {
        _this.btn.classList.add('mdui-fab-opened');
      }

      _this.state = 'opening';
      $.pluginEvent('open', 'fab', _this, _this.fab);

      // 打开顺序为从下到上逐个打开，最上面的打开后才表示动画完成
      $.transitionEnd(_this.dialBtns[0], function () {
        if (_this.btn.classList.contains('mdui-fab-opened')) {
          _this.state = 'opened';
          $.pluginEvent('opened', 'fab', _this, _this.fab);
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
      $.each(_this.dialBtns, function (index, btn) {
        btn.style['transition-delay'] = 15 * index + 'ms';
      });

      _this.dial.classList.remove('mdui-fab-dial-show');
      _this.btn.classList.remove('mdui-fab-opened');
      _this.state = 'closing';
      $.pluginEvent('close', 'fab', _this, _this.fab);

      // 从上往下依次关闭，最后一个关闭后才表示动画完成
      $.transitionEnd(_this.dialBtns[_this.dialBtns.length - 1], function () {
        if (!_this.btn.classList.contains('mdui-fab-opened')) {
          _this.state = 'closed';
          $.pluginEvent('closed', 'fab', _this, _this.fab);
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
      this.fab.classList.remove('mdui-fab-hide');
    };

    /**
     * 以动画的形式隐藏浮动操作按钮
     */
    Fab.prototype.hide = function () {
      this.fab.classList.add('mdui-fab-hide');
    };

    return Fab;
  })();


  /**
   * =============================================================================
   * ************   Fab DATA API   ************
   * =============================================================================
   */

  $.ready(function () {

    // mouseenter 不冒泡，无法进行事件委托，这里用 mouseover 代替。
    // 不管是 click 、 mouseover 还是 touchstart ，都先初始化。
    var event = mdui.support.touch ? 'touchstart' : 'click mouseover';

    $.on(document, event, '[mdui-fab]', function (e) {
      var _this = this;
      var eventType = e.type;

      var inst = $.data(_this, 'mdui.fab');
      if (!inst) {
        var options = $.parseOptions(_this.getAttribute('mdui-fab'));
        inst = new mdui.Fab(_this, options);
        $.data(_this, 'mdui.fab', inst);

        // 判断当前事件
        if (eventType === 'touchstart') {
          inst.open();
        }else if (
          (inst.options.trigger === 'click' && eventType === 'click') ||
          (inst.options.trigger === 'hover' && eventType === 'mouseover')
        ) {
          inst.open();
        }
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

  $.ready(function () {

    // 滚动时隐藏应用栏
    $.each($.queryAll('.mdui-appbar-scroll-hide'), function (i, appbar) {
      $.data(appbar, 'mdui.headroom', new mdui.Headroom(appbar));
    });

    // 滚动时只隐藏应用栏中的工具栏
    $.each($.queryAll('.mdui-appbar-scroll-toolbar-hide'), function (i, appbar) {
      var inst = new mdui.Headroom('.mdui-appbar-scroll-toolbar-hide', {
        pinnedClass: 'mdui-headroom-pinned-toolbar',
        unpinnedClass: 'mdui-headroom-unpinned-toolbar',
      });
      $.data(appbar, 'mdui.headroom', inst);
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

    /**
     * 选项卡
     * @param selector
     * @param opts
     * @returns {*}
     * @constructor
     */
    function Tab(selector, opts) {
      var _this = this;
      var trigger;

      _this.tab = $.dom(selector)[0];
      if (typeof _this.tab === 'undefined') {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = $.data(_this.tab, 'mdui.tab');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend(DEFAULT, (opts || {}));
      _this.tabs = $.children(_this.tab, 'a');

      _this.indicator = $.dom('<div class="mdui-tab-indicator"></div>')[0];

      // 选项卡下面添加的指示符
      _this.tab.appendChild(_this.indicator);

      // 触发方式
      if (mdui.support.touch) {
        trigger = 'touchend';
      } else if (_this.options.trigger === 'hover') {
        trigger = 'mouseenter';
      } else {
        trigger = 'click';
      }

      // 根据 url hash 获取默认激活的选项卡
      var hash = location.hash;
      if (hash) {
        $.each(_this.tabs, function (i, tab) {
          if (tab.getAttribute('href') === hash) {
            _this.activeIndex = i;
            return false;
          }
        });
      }

      // 含 mdui-tab-active 的元素默认激活
      if (typeof _this.activeIndex === 'undefined') {
        $.each(_this.tabs, function (i, tab) {
          if (tab.classList.contains('mdui-tab-active')) {
            _this.activeIndex = i;
            return false;
          }
        });
      }

      // 默认激活第一个选项卡
      if (typeof _this.activeIndex === 'undefined') {
        _this.activeIndex = 0;
      }

      // 设置激活状态选项卡
      _this._setActive();

      // 监听窗口大小变化事件，调整指示器位置
      $.on(window, 'resize', mdui.throttle(function () {
        _this._setIndicatorPosition();
      }, 100));

      // 监听点击选项卡事件
      $.each(_this.tabs, function (i, tab) {
        $.on(tab, trigger, function (e) {
          if (tab.getAttribute('disabled') !== null) {
            e.preventDefault();
            return;
          }

          _this.activeIndex = i;
          _this._setActive();
        });

        $.on(tab, 'click', function (e) {
          // 阻止链接的默认点击动作
          if (tab.getAttribute('href').indexOf('#') === 0) {
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

      $.each(_this.tabs, function (i, tab) {
        var targetId = tab.getAttribute('href');
        var targetContent;

        if (tab.getAttribute('disabled') !== null) {
          if (targetId.indexOf('#') === 0) {
            targetContent = $.query(targetId);
            if (targetContent) {
              targetContent.style.display = 'none';
            }
          }

          return;
        }

        // 选项卡激活状态
        if (i === _this.activeIndex) {
          $.pluginEvent('change', 'tab', _this, _this.tab, {
            index: _this.activeIndex,
            target: tab,
          });
          $.pluginEvent('show', 'tab', _this, tab);

          if (!tab.classList.contains('mdui-tab-active')) {
            tab.classList.add('mdui-tab-active');
          }
        } else {
          if (tab.classList.contains('mdui-tab-active')) {
            tab.classList.remove('mdui-tab-active');
          }
        }

        // 选项卡内容显示切换
        if (targetId.indexOf('#') === 0) {
          targetContent = $.query(targetId);
          if (targetContent) {
            if (i === _this.activeIndex) {
              targetContent.style.display = 'block';
            } else {
              targetContent.style.display = 'none';
            }
          }
        }

      });

      _this._setIndicatorPosition();
    };

    /**
     * 设置选项卡指示器的位置
     */
    Tab.prototype._setIndicatorPosition = function () {
      var _this = this;

      var activeTab = _this.tabs[_this.activeIndex];
      if (activeTab.getAttribute('disabled') !== null) {
        return;
      }

      var activeTabOffset = $.offset(activeTab);
      _this.indicator.style.left =
        activeTabOffset.left + _this.tab.scrollLeft - _this.tab.getBoundingClientRect().left + 'px';
      _this.indicator.style.width = $.getStyle(activeTab, 'width');
    };

    /**
     * 切换到下一个选项卡
     */
    Tab.prototype.next = function () {
      var _this = this;

      if (_this.tabs.length > _this.activeIndex + 1) {
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
        _this.activeIndex = _this.tabs.length - 1;
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
        $.each(_this.tabs, function (i, tab) {
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

  $.ready(function () {

    // 实例化插件
    $.each($.queryAll('[mdui-tab]'), function (i, target) {
      var options = $.parseOptions(target.getAttribute('mdui-tab'));

      var inst = $.data(target, 'mdui.tab');
      if (!inst) {
        inst = new mdui.Tab(target, options);
        $.data(target, 'mdui.tab', inst);
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

    /**
     * 抽屉栏实例
     * @param selector 选择器或 HTML 字符串或 DOM 元素
     * @param opts
     * @constructor
     */
    function Drawer(selector, opts) {
      var _this = this;

      _this.drawer = $.dom(selector)[0];
      if (typeof _this.drawer === 'undefined') {
        return;
      }

      var oldInst = $.data(_this.drawer, 'mdui.drawer');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend(DEFAULT, (opts || {}));

      _this.overlay = false; // 是否显示着遮罩层
      _this.position = _this.drawer.classList.contains('mdui-drawer-right') ? 'right' : 'left';

      if (_this.drawer.classList.contains('mdui-drawer-close')) {
        _this.state = 'closed';
      } else if (_this.drawer.classList.contains('mdui-drawer-open')) {
        _this.state = 'opened';
      } else if (mdui.screen.mdUp()) {
        _this.state = 'opened';
      } else {
        _this.state = 'closed';
      }

      // 浏览器窗口大小调整时
      $.on(window, 'resize', mdui.throttle(function () {
        // 由手机平板切换到桌面时
        if (mdui.screen.mdUp()) {
          // 如果显示着遮罩，则隐藏遮罩
          if (_this.overlay && !_this.options.overlay) {
            mdui.hideOverlay();
            _this.overlay = false;

            mdui.unlockScreen();
          }

          // 没有强制关闭，则状态为打开状态
          if (!_this.drawer.classList.contains('mdui-drawer-close')) {
            _this.state = 'opened';
          }
        }

        // 由桌面切换到手机平板时。如果抽屉栏是打开着的且没有遮罩层，则关闭抽屉栏
        else {
          if (!_this.overlay && _this.state === 'opened') {
            // 抽屉栏处于强制打开状态，添加遮罩
            if (_this.drawer.classList.contains('mdui-drawer-open')) {
              mdui.showOverlay();
              _this.overlay = true;

              mdui.lockScreen();

              $.one($.query('.mdui-overlay'), 'click', function () {
                _this.close();
              });
            } else {
              _this.state = 'closed';
            }
          }
        }

      }, 100));

      // 不支持 touch 的设备默认隐藏滚动条，鼠标移入时显示滚动条；支持 touch 的设备会自动隐藏滚动条
      if (!mdui.support.touch) {
        _this.drawer.style['overflow-y'] = 'hidden';
        _this.drawer.classList.add('mdui-drawer-scrollbar');
      }

      // 绑定关闭按钮事件
      var closes = $.queryAll('[mdui-drawer-close]', _this.drawer);
      $.each(closes, function (i, close) {
        $.on(close, 'click', function () {
          _this.close();
        });
      });
    }

    /**
     * 打开抽屉栏
     */
    Drawer.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      _this.drawer.classList.remove('mdui-drawer-close');
      _this.drawer.classList.add('mdui-drawer-open');

      _this.state = 'opening';
      $.pluginEvent('open', 'drawer', _this, _this.drawer);

      if (!_this.options.overlay) {
        document.body.classList.add('mdui-drawer-body-' + _this.position);
      }

      $.transitionEnd(_this.drawer, function () {
        if (_this.drawer.classList.contains('mdui-drawer-open')) {
          _this.state = 'opened';
          $.pluginEvent('opened', 'drawer', _this, _this.drawer);
        }
      });

      if (!mdui.screen.mdUp() || _this.options.overlay) {
        mdui.showOverlay();
        _this.overlay = true;

        mdui.lockScreen();

        $.one($.query('.mdui-overlay'), 'click', function () {
          _this.close();
        });
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

      _this.drawer.classList.add('mdui-drawer-close');
      _this.drawer.classList.remove('mdui-drawer-open');
      _this.state = 'closing';
      $.pluginEvent('close', 'drawer', _this, _this.drawer);

      if (!_this.options.overlay) {
        document.body.classList.remove('mdui-drawer-body-' + _this.position);
      }

      $.transitionEnd(_this.drawer, function () {
        if (!_this.drawer.classList.contains('mdui-drawer-open')) {
          _this.state = 'closed';
          $.pluginEvent('closed', 'drawer', _this, _this.drawer);
        }
      });

      if (_this.overlay) {
        mdui.hideOverlay();
        _this.overlay = false;

        mdui.unlockScreen();
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

  $.ready(function () {

    // 实例化插件
    $.each($.queryAll('[mdui-drawer]'), function (i, target) {
      var options = $.parseOptions(target.getAttribute('mdui-drawer'));
      var selector = options.target;
      delete options.target;

      var drawer = $.dom(selector)[0];

      var inst = $.data(drawer, 'mdui.drawer');
      if (!inst) {
        inst = new mdui.Drawer(drawer, options);
        $.data(drawer, 'mdui.drawer', inst);
      }

      $.on(target, 'click', function () {
        inst.toggle();
      });
    });

  });


  /**
   * =============================================================================
   * ************   Dialog 提示框   ************
   * =============================================================================
   */

  mdui.Dialog = (function () {

    /**
     * 默认参数
     */
    var DEFAULT = {
      history: true,                // 监听 hashchange 事件
      overlay: true,                // 打开提示框时显示遮罩
      modal: false,                 // 是否模态化提示框，为 false 时点击提示框外面区域关闭提示框，为 true 时不关闭
      closeOnEsc: true,             // 按下 esc 关闭提示框
      closeOnCancel: true,          // 按下取消按钮时关闭提示框
      closeOnConfirm: true,         // 按下确认按钮时关闭提示框
      destroyOnClosed: false,        // 关闭后销毁
    };

    /**
     * 遮罩层元素
     */
    var overlay;

    /**
     * 当前提示框
     */
    var current;

    /**
     * 队列名
     * @type {string}
     */
    var queueName = '__md_dialog';

    /**
     * 窗口宽度变化，或提示框内容变化时，调整提示框位置和提示框内的滚动条
     */
    var readjust = function () {
      if (!current) {
        return;
      }

      var dialog = current.dialog;

      var dialogTitle = $.child(dialog, '.mdui-dialog-title');
      var dialogContent = $.child(dialog, '.mdui-dialog-content');
      var dialogActions = $.child(dialog, '.mdui-dialog-actions');

      // 调整 dialog 的 top 和 height 值
      dialog.style.height = '';
      if (dialogContent) {
        dialogContent.style.height = '';
      }

      var dialogHeight = dialog.clientHeight;
      dialog.style.top = ((window.innerHeight - dialogHeight) / 2) + 'px';
      dialog.style.height = dialogHeight + 'px';

      // 调整 mdui-dialog-content 的高度
      var dialogTitleHeight = dialogTitle ? dialogTitle.scrollHeight : 0;
      var dialogActionsHeight = dialogActions ? dialogActions.scrollHeight : 0;
      if (dialogContent) {
        dialogContent.style.height = dialogHeight - dialogTitleHeight - dialogActionsHeight + 'px';
      }
    };

    /**
     * hashchange 事件触发时关闭提示框
     */
    var hashchangeEvent = function () {
      if (location.hash.substring(1).indexOf('&mdui-dialog') < 0) {
        current.close(true);
      }
    };

    /**
     * 点击遮罩层关闭提示框
     * @param e
     */
    var overlayClick = function (e) {
      if (e.target.classList.contains('mdui-overlay')) {
        current.close();
      }
    };

    /**
     * 提示框实例
     * @param selector 选择器或 HTML 字符串或 DOM 元素
     * @param opts
     * @constructor
     */
    function Dialog(selector, opts) {
      var _this = this;

      // 提示框元素
      _this.dialog = $.dom(selector)[0];
      if (typeof _this.dialog === 'undefined') {
        return;
      }

      // 已通过 data 属性实例化过，不再重复实例化
      var oldInst = $.data(_this.dialog, 'mdui.dialog');
      if (oldInst) {
        return oldInst;
      }

      // 如果提示框元素没有在当前文档中，则需要添加
      if (!document.body.contains(_this.dialog)) {
        _this.append = true;
        document.body.appendChild(_this.dialog);
      }

      _this.options = $.extend(DEFAULT, (opts || {}));
      _this.state = 'closed';

      // 在不支持触摸的设备上美化滚动条
      if (!mdui.support.touch) {
        var content = $.query('.mdui-dialog-content', _this.dialog);
        if (content) {
          content.classList.add('mdui-dialog-scrollbar');
        }
      }

      // 绑定取消按钮事件
      var cancels = $.queryAll('[mdui-dialog-cancel]', _this.dialog);
      $.each(cancels, function (i, cancel) {
        $.on(cancel, 'click', function () {
          $.pluginEvent('cancel', 'dialog', _this, _this.dialog);
          if (_this.options.closeOnCancel) {
            _this.close();
          }
        });
      });

      // 绑定确认按钮事件
      var confirms = $.queryAll('[mdui-dialog-confirm]', _this.dialog);
      $.each(confirms, function (i, confirm) {
        $.on(confirm, 'click', function () {
          $.pluginEvent('confirm', 'dialog', _this, _this.dialog);
          if (_this.options.closeOnConfirm) {
            _this.close();
          }
        });
      });

      // 绑定关闭按钮事件
      var closes = $.queryAll('[mdui-dialog-close]', _this.dialog);
      $.each(closes, function (i, close) {
        $.on(close, 'click', function () {
          _this.close();
        });
      });
    }

    /**
     * 打开提示框
     */
    Dialog.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      // 如果当前有正在打开或已经打开的对话框,或队列不为空，则先加入队列，等旧对话框开始关闭时再打开
      if (
        (current && (current.state === 'opening' || current.state === 'opened')) ||
        $.queue(queueName).length
      ) {
        $.queue(queueName, function () {
          _this.open();
        });

        return;
      }

      current = _this;

      mdui.lockScreen();
      _this.dialog.style.display = 'block';

      readjust();
      $.on(window, 'resize', mdui.throttle(function () {
        readjust();
      }, 100));

      // 打开消息框
      _this.dialog.classList.add('mdui-dialog-open');
      _this.state = 'opening';
      $.pluginEvent('open', 'dialog', _this, _this.dialog);

      // 打开提示框动画完成后
      $.transitionEnd(_this.dialog, function () {
        if (_this.dialog.classList.contains('mdui-dialog-open')) {
          _this.state = 'opened';
          $.pluginEvent('opened', 'dialog', _this, _this.dialog);
        }
      });

      // 不存在遮罩层元素时，添加遮罩层
      if (!overlay) {
        overlay = mdui.showOverlay();
      }

      // 点击遮罩层时是否关闭提示框
      $[_this.options.modal ? 'off' : 'on'](overlay, 'click', overlayClick);

      // 是否显示遮罩层，不显示时，把遮罩层背景透明
      overlay.style.opacity = _this.options.overlay ? '' : 0;

      if (_this.options.history) {
        // 如果 hash 中原来就有 &mdui-dialog，先删除，避免后退历史纪录后仍然有 &mdui-dialog 导致无法关闭
        var hash = location.hash.substring(1);
        if (hash.indexOf('&mdui-dialog') > -1) {
          hash = hash.replace(/&mdui-dialog/g, '');
        }

        // 后退按钮关闭对话框
        location.hash = hash + '&mdui-dialog';
        $.on(window, 'hashchange', hashchangeEvent);
      }
    };

    /**
     * 关闭提示框
     */
    Dialog.prototype.close = function () {
      var _this = this;

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      current = null;
      _this.dialog.classList.remove('mdui-dialog-open');
      _this.state = 'closing';
      $.pluginEvent('close', 'dialog', _this, _this.dialog);

      // 所有提示框都关闭，且当前没有打开的提示框时，隐藏遮罩
      if ($.queue(queueName).length === 0) {
        mdui.hideOverlay(overlay);
        overlay = null;
      }

      $.transitionEnd(_this.dialog, function () {
        if (!_this.dialog.classList.contains('mdui-dialog-open')) {

          _this.state = 'closed';
          $.pluginEvent('closed', 'dialog', _this, _this.dialog);

          _this.dialog.style.display = 'none';

          // 所有提示框都关闭，且当前没有打开的提示框时，解锁屏幕
          if ($.queue(queueName).length === 0 && !current) {
            mdui.unlockScreen();
          }

          $.off(window, 'resize', readjust);

          if (_this.options.destroyOnClosed) {
            _this.destroy();
          }
        }
      });

      if (_this.options.history && $.queue(queueName).length === 0) {
        // 是否需要后退历史纪录，默认为 false。
        // 为 false 时是通过 js 关闭，需要后退一个历史记录
        // 为 true 时是通过后退按钮关闭，不需要后退历史记录
        if (!arguments[0]) {
          window.history.back();
        }

        $.off(window, 'hashchange', hashchangeEvent);
      }

      // 关闭旧对话框，打开新对话框。
      // 加一点延迟，仅仅为了视觉效果更好。不加延时也不影响功能
      setTimeout(function () {
        $.dequeue(queueName);
      }, 100);
    };

    /**
     * 切换提示框打开/关闭状态
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
     * 获取提示框状态
     * @returns {'opening'|'opened'|'closing'|'closed'}
     */
    Dialog.prototype.getState = function () {
      return this.state;
    };

    /**
     * 销毁提示框
     */
    Dialog.prototype.destroy = function () {
      var _this = this;

      if (_this.append) {
        $.remove(_this.dialog);
      }

      $.data(_this.dialog, 'mdui.dialog', null);

      if (current === _this) {
        mdui.unlockScreen();
        mdui.hideOverlay();
      }
    };

    /**
     * 提示框内容变化时，需要调用该方法来调整提示框位置和滚动条高度
     */
    Dialog.prototype.handleUpdate = function () {
      readjust();
    };

    // esc 按下时关闭对话框
    $.on(document, 'keydown', function (e) {
      if (current && current.options.closeOnEsc && current.state === 'opened' && e.keyCode === 27) {
        current.close();
      }
    });

    return Dialog;

  })();


  /**
   * =============================================================================
   * ************   Dialog DATA API   ************
   * =============================================================================
   */

  $.ready(function () {

    $.on(document, 'click', '[mdui-dialog]', function () {
      var _this = this;
      var options = $.parseOptions(_this.getAttribute('mdui-dialog'));
      var selector = options.target;
      delete options.target;

      var dialog = $.dom(selector)[0];

      var inst = $.data(dialog, 'mdui.dialog');
      if (!inst) {
        inst = new mdui.Dialog(dialog, options);
        $.data(dialog, 'mdui.dialog', inst);
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
      modal: false,             // 是否模态化提示框
      closeOnEsc: true,         // 按下 esc 时关闭提示框
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
      close: true,                // 点击按钮后关闭提示框
      onClick: function (inst) {  // 点击按钮的回调
      },
    };

    // 合并参数
    options = $.extend(DEFAULT, (options || {}));
    $.each(options.buttons, function (i, button) {
      options.buttons[i] = $.extend(DEFAULT_BUTTON, button);
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
      var buttons = $.queryAll('.mdui-dialog-actions .mdui-btn', inst.dialog);
      $.each(buttons, function (i, button) {
        $.on(button, 'click', function () {
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
      $.on(inst.dialog, 'open.mdui.dialog', function () {
        options.onOpen(inst);
      });

      $.on(inst.dialog, 'opened.mdui.dialog', function () {
        options.onOpened(inst);
      });

      $.on(inst.dialog, 'close.mdui.dialog', function () {
        options.onClose(inst);
      });

      $.on(inst.dialog, 'closed.mdui.dialog', function () {
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

    if (typeof onConfirm === 'undefined') {
      onConfirm = function () {};
    }

    if (typeof options === 'undefined') {
      options = {};
    }

    /**
     * 默认参数
     */
    var DEFAULT = {
      confirmText: 'ok',             // 按钮上的文本
      history: true,                 // 监听 hashchange 事件
      modal: false,                  // 是否模态化提示框，为 false 时点击提示框外面区域关闭提示框，为 true 时不关闭
      closeOnEsc: true,              // 按下 esc 关闭提示框
    };

    options = $.extend(DEFAULT, options);

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

    if (typeof onConfirm === 'undefined') {
      onConfirm = function () {};
    }

    if (typeof onCancel === 'undefined') {
      onCancel = function () {};
    }

    if (typeof options === 'undefined') {
      options = {};
    }

    /**
     * 默认参数
     */
    var DEFAULT = {
      confirmText: 'ok',            // 确认按钮的文本
      cancelText: 'cancel',         // 取消按钮的文本
      history: true,                // 监听 hashchange 事件
      modal: false,                 // 是否模态化提示框，为 false 时点击提示框外面区域关闭提示框，为 true 时不关闭
      closeOnEsc: true,             // 按下 esc 关闭提示框
    };

    options = $.extend(DEFAULT, options);

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

    if (typeof onConfirm === 'undefined') {
      onConfirm = function () {};
    }

    if (typeof onCancel === 'undefined') {
      onCancel = function () {};
    }

    if (typeof options === 'undefined') {
      options = {};
    }

    /**
     * 默认参数
     */
    var DEFAULT = {
      confirmText: 'ok',        // 确认按钮的文本
      cancelText: 'cancel',     // 取消按钮的文本
      history: true,            // 监听 hashchange 事件
      modal: false,             // 是否模态化提示框，为 false 时点击提示框外面区域关闭提示框，为 true 时不关闭
      closeOnEsc: true,         // 按下 esc 关闭提示框
      type: 'text',             // 输入框类型，text: 单行文本框 textarea: 多行文本框
      maxlength: '',            // 最大输入字符数
      defaultValue: '',         // 输入框中的默认文本
    };

    options = $.extend(DEFAULT, options);

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
            var value = $.query('.mdui-textfield-input', inst.dialog).value;
            onCancel(value, inst);
          },
        },
        {
          text: options.confirmText,
          bold: false,
          close: true,
          onClick: function (inst) {
            var value = $.query('.mdui-textfield-input', inst.dialog).value;
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
        var input = $.query('.mdui-textfield-input', inst.dialog);
        mdui.updateTextFields(input);

        // 聚焦到输入框
        input.focus();

        // 如果是多行输入框，监听输入框的 input 事件，更新提示框高度
        if (options.type === 'textarea') {
          $.on(input, 'input', function () {
            inst.handleUpdate();
          });
        }

        // 有字符数限制时，加载完文本框后 DOM 会变化，需要更新提示框高度
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
     * 设置 Tooltip 的位置
     * @param inst
     */
    function setPosition(inst) {
      var marginLeft;
      var marginTop;
      var position;

      // 触发的元素
      var targetProps = inst.target.getBoundingClientRect();

      // 触发的元素和 Tooltip 之间的距离
      var targetMargin = (mdui.support.touch ? 24 : 14);

      // Tooltip 的宽度和高度
      var tooltipWidth = inst.tooltip.offsetWidth;
      var tooltipHeight = inst.tooltip.offsetHeight;

      // Tooltip 的方向
      position = inst.options.position;

      // 自动判断位置，加 2px，使 Tooltip 距离窗口边框至少有 2px 的间距
      if (['bottom', 'top', 'left', 'right'].indexOf(position) === -1) {
        if (
          targetProps.top + targetProps.height + targetMargin + tooltipHeight + 2 <
          document.documentElement.clientHeight
        ) {
          position = 'bottom';
        } else if (targetMargin + tooltipHeight + 2 < targetProps.top) {
          position = 'top';
        } else if (targetMargin + tooltipWidth + 2 < targetProps.left) {
          position = 'left';
        } else if (
          targetProps.width + targetMargin + tooltipWidth + 2 <
          document.documentElement.clientWidth - targetProps.left
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
          $.transformOrigin(inst.tooltip, 'top center');
          break;
        case 'top':
          marginLeft = -1 * (tooltipWidth / 2);
          marginTop = -1 * (tooltipHeight + (targetProps.height / 2) + targetMargin);
          $.transformOrigin(inst.tooltip, 'bottom center');
          break;
        case 'left':
          marginLeft = -1 * (tooltipWidth + (targetProps.width / 2) + targetMargin);
          marginTop = -1 * (tooltipHeight / 2);
          $.transformOrigin(inst.tooltip, 'center right');
          break;
        case 'right':
          marginLeft = (targetProps.width / 2) + targetMargin;
          marginTop = -1 * (tooltipHeight / 2);
          $.transformOrigin(inst.tooltip, 'center left');
          break;
      }

      var targetOffset = $.offset(inst.target);
      inst.tooltip.style.top = targetOffset.top + (targetProps.height / 2) + 'px';
      inst.tooltip.style.left = targetOffset.left + (targetProps.width / 2) + 'px';
      inst.tooltip.style['margin-left'] = marginLeft + 'px';
      inst.tooltip.style['margin-top'] = marginTop + 'px';
    }

    /**
     * Tooltip 实例
     * @param selector
     * @param opts
     * @constructor
     */
    function Tooltip(selector, opts) {
      var _this = this;

      _this.target = $.dom(selector)[0];
      if (typeof _this.target === 'undefined') {
        return;
      }

      // 已通过 data 属性实例化过，不再重复实例化
      var oldInst = $.data(_this.target, 'mdui.tooltip');
      if (oldInst) {
        return oldInst;
      }

      _this.options = $.extend(DEFAULT, (opts || {}));
      _this.state = 'closed';

      // 创建 Tooltip HTML
      var guid = mdui.guid();
      _this.tooltip = $.dom(
        '<div class="mdui-tooltip ' +
          (mdui.support.touch ? 'mdui-tooltip-mobile' : 'mdui-tooltip-desktop') +
          '" id="mdui-tooltip-' + guid + '">' +
          _this.options.content + '</div>'
      )[0];
      document.body.appendChild(_this.tooltip);

      // 绑定事件
      var openEvent = mdui.support.touch ? 'touchstart' : 'mouseenter';
      var closeEvent = mdui.support.touch ? 'touchend' : 'mouseleave';
      $.on(_this.target, openEvent, function () {
        _this.open();
      });

      $.on(_this.target, closeEvent, function () {
        _this.close();
      });
    }

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
      var dataOpts = $.parseOptions(_this.target.getAttribute('mdui-tooltip'));
      _this.options = $.extend(_this.options, dataOpts);

      if (opts) {
        _this.options = $.extend(_this.options, opts);
      }

      if (oldOpts.content !== _this.options.content) {
        _this.tooltip.innerHTML = _this.options.content;
      }

      setPosition(_this);

      _this.timeoutId = setTimeout(function () {
        _this.tooltip.classList.add('mdui-tooltip-open');
        _this.state = 'opening';
        $.pluginEvent('open', 'tooltip', _this, _this.target);

        $.transitionEnd(_this.tooltip, function () {
          if (_this.tooltip.classList.contains('mdui-tooltip-open')) {
            _this.state = 'opened';
            $.pluginEvent('opened', 'tooltip', _this, _this.target);
          }
        });
      }, _this.options.delay);
    };

    /**
     * 关闭 Tooltip
     */
    Tooltip.prototype.close = function () {
      var _this = this;

      if (_this.state === 'closing' || _this.state === 'closed') {
        return;
      }

      clearTimeout(_this.timeoutId);
      _this.tooltip.classList.remove('mdui-tooltip-open');
      _this.state = 'closing';
      $.pluginEvent('close', 'tooltip', _this, _this.target);

      $.transitionEnd(_this.tooltip, function () {
        if (!_this.tooltip.classList.contains('mdui-tooltip-open')) {
          _this.state = 'closed';
          $.pluginEvent('closed', 'tooltip', _this, _this.target);
        }
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

  (function () {
    // mouseenter 不能冒泡，所以这里用 mouseover 代替
    var event = mdui.support.touch ? 'touchstart' : 'mouseover';

    $.on(document, event, '[mdui-tooltip]', function () {
      var _this = this;

      var inst = $.data(_this, 'mdui.tooltip');
      if (!inst) {
        var options = $.parseOptions(_this.getAttribute('mdui-tooltip'));
        inst = new mdui.Tooltip(_this, options);
        $.data(_this, 'mdui.tooltip', inst);

        inst.open();
      }
    });
  })();


  /**
   * =============================================================================
   * ************   Snackbar   ************
   * =============================================================================
   */

  (function () {

    /**
     * 当前打开着的 Snackbar
     */
    var current;

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
      if (
        !e.target.classList.contains('mdui-snackbar') &&
        !$.parents(e.target, '.mdui-snackbar').length
      ) {
        current.close();
      }
    };

    /**
     * Snackbar 实例
     * @param opts
     * @constructor
     */
    function Snackbar(opts) {
      var _this = this;

      _this.options = $.extend(DEFAULT, (opts || {}));

      // message 参数必须
      if (!_this.options.message) {
        return;
      }

      _this.state = 'closed';

      // 按钮颜色
      var buttonColorStyle = '';
      var buttonColorClass = '';

      if (
        _this.options.buttonColor.indexOf('#') === 0 ||
        _this.options.buttonColor.indexOf('rgb') === 0
      ) {
        buttonColorStyle = 'style="color:' + _this.options.buttonColor + '"';
      }else if (_this.options.buttonColor !== '') {
        buttonColorClass = 'mdui-text-color-' + _this.options.buttonColor;
      }

      // 添加 HTML
      var tpl =
        '<div class="mdui-snackbar ' +
            (mdui.screen.mdUp() ? 'mdui-snackbar-desktop' : 'mdui-snackbar-mobile') +
        '">' +
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
        '</div>';
      _this.snackbar = $.dom(tpl)[0];
      document.body.appendChild(_this.snackbar);

      // 设置位置
      $.transform(_this.snackbar, 'translateY(' + _this.snackbar.clientHeight + 'px)');
      _this.snackbar.style.left = (document.body.clientWidth - _this.snackbar.clientWidth) / 2 + 'px';
      _this.snackbar.classList.add('mdui-snackbar-transition');
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
      if (current) {
        $.queue(queueName, function () {
          _this.open();
        });

        return;
      }

      current = _this;

      // 开始打开
      _this.state = 'opening';
      $.transform(_this.snackbar, 'translateY(0)');

      $.transitionEnd(_this.snackbar, function () {
        if (_this.state !== 'opening') {
          return;
        }

        _this.state = 'opened';

        // 有按钮时绑定事件
        if (_this.options.buttonText) {
          var action = $.query('.mdui-snackbar-action', _this.snackbar);
          $.on(action, 'click', function () {
            _this.options.onButtonClick();
            if (_this.options.closeOnButtonClick) {
              _this.close();
            }
          });
        }

        // 点击 Snackbar 的事件
        $.on(_this.snackbar, 'click', function (e) {
          if (!e.target.classList.contains('mdui-snackbar-action')) {
            _this.options.onClick();
          }
        });

        // 点击 Snackbar 外面的区域关闭
        if (_this.options.closeOnOutsideClick) {
          $.on(document, mdui.support.touch ? 'touchstart' : 'click', closeOnOutsideClick);
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

      if (typeof _this.timeoutId !== 'undefined') {
        clearTimeout(_this.timeoutId);
      }

      if (_this.options.closeOnOutsideClick) {
        $.off(document, mdui.support.touch ? 'touchstart' : 'click', closeOnOutsideClick);
      }

      _this.state = 'closing';
      $.transform(_this.snackbar, 'translateY(' + _this.snackbar.clientHeight + 'px)');
      _this.options.onClose();

      $.transitionEnd(_this.snackbar, function () {
        if (_this.state !== 'closing') {
          return;
        }

        current = null;
        _this.state = 'closed';
        $.remove(_this.snackbar);
        $.dequeue(queueName);
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
    $.on(document, 'click', '.mdui-bottom-nav>a', function () {
      var _this = this;
      var bottomNav = $.parent(_this, '.mdui-bottom-nav');
      var items = $.children(bottomNav, 'a');

      $.each(items, function (i, curItem) {
        if (_this === curItem) {
          $.pluginEvent('change', 'bottomNav', null, bottomNav, {
            index: i,
          });

          curItem.classList.add('mdui-bottom-nav-active');
        } else {
          curItem.classList.remove('mdui-bottom-nav-active');
        }
      });
    });

    // 滚动时隐藏 mdui-bottom-nav-scroll-hide
    $.each($.queryAll('.mdui-bottom-nav-scroll-hide'), function (i, bottomNav) {
      var inst = new mdui.Headroom(bottomNav, {
        pinnedClass: 'mdui-headroom-pinned-down',
        unpinnedClass: 'mdui-headroom-unpinned-down',
      });
      $.data(bottomNav, 'mdui.headroom', inst);
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
      var i = arguments.length === 1 ? arguments[0] : false;

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
      var layer;
      if (spinner.classList.contains('mdui-spinner-colorful')) {
        layer = layerHTML('1') + layerHTML('2') + layerHTML('3') + layerHTML('4');
      } else {
        layer = layerHTML();
      }

      spinner.innerHTML = layer;
    };

    /**
     * 页面加载完后自动填充 HTML 结构
     */
    $.ready(function () {
      var spinners = $.queryAll('.mdui-spinner');
      $.each(spinners, function (i, spinner) {
        fillHTML(spinner);
      });
    });

    /**
     * 更新圆形进度条
     */
    mdui.updateSpinners = function () {
      var spinners;

      if (arguments.length === 1) {
        spinners = $.dom(arguments[0]);
      } else {
        spinners = $.queryAll('.mdui-spinner');
      }

      $.each(spinners, function (i, spinner) {
        fillHTML(spinner);
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
      return new $.Collapse(selector, opts, {
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

  $.ready(function () {

    // 实例化插件
    $.each($.queryAll('[mdui-panel]'), function (i, target) {
      var options = $.parseOptions(target.getAttribute('mdui-panel'));

      var inst = $.data(target, 'mdui.panel');
      if (!inst) {
        inst = new mdui.Panel(target, options);
        $.data(target, 'mdui.panel', inst);
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
     * 类名
     */
    var CLASS = {
      menu: 'mdui-menu',                    // 菜单基础类
      cascade: 'mdui-menu-cascade',         // 级联菜单
      open: 'mdui-menu-open',               // 打开状态的菜单
      item: 'mdui-menu-item',               // 菜单条目
      active: 'mdui-menu-item-active',      // 激活状态的菜单
      divider: 'mdui-divider',              // 分隔线
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
      var windowHeight = document.documentElement.clientHeight;
      var windowWidth = document.documentElement.clientWidth;

      // 配置参数
      var gutter = _this.options.gutter;
      var isCovered = _this.isCovered;
      var isFixed = _this.options.fixed;

      // 动画方向参数
      var transformOriginX;
      var transformOriginY;

      // 菜单的原始宽度和高度
      var menuWidth = parseFloat($.getStyle(_this.menu, 'width'));
      var menuHeight = parseFloat($.getStyle(_this.menu, 'height'));

      var anchor = _this.anchor;

      // 触发菜单的元素在窗口中的位置
      var anchorTmp = anchor.getBoundingClientRect();
      var anchorTop = anchorTmp.top;
      var anchorLeft = anchorTmp.left;
      var anchorHeight = anchorTmp.height;
      var anchorWidth = anchorTmp.width;
      var anchorBottom = windowHeight - anchorTop - anchorHeight;
      var anchorRight = windowWidth - anchorLeft - anchorWidth;

      // 触发元素相对其拥有定位属性的父元素的位置
      var anchorOffsetTop = anchor.offsetTop;
      var anchorOffsetLeft = anchor.offsetLeft;

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
        if (!_this.menu.classList.contains('mdui-menu-cascade')) {
          if (menuHeight + gutter * 2 > windowHeight) {
            menuHeightTemp = windowHeight - gutter * 2;
            _this.menu.style.height = menuHeightTemp + 'px';
          }
        }

        menuTop =
          (windowHeight - menuHeightTemp) / 2 +
          (isFixed ? 0 : (anchorOffsetTop - anchorTop));
      }

      _this.menu.style.top = menuTop + 'px';

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
          _this.menu.style.width = menuWidthTemp + 'px';
        }

        menuLeft =
          (windowWidth - menuWidthTemp) / 2 +
          (isFixed ? 0 : anchorOffsetLeft - anchorLeft);
      }

      _this.menu.style.left = menuLeft + 'px';

      // 设置菜单动画方向
      $.transformOrigin(_this.menu, transformOriginX + ' ' + transformOriginY);
    };

    /**
     * 调整子菜单的位置
     * @param submenu
     */
    var readjustSubmenu = function (submenu) {
      var item = $.parent(submenu, '.' + CLASS.item);

      var submenuTop;
      var submenuLeft;

      // 子菜单位置和方向
      var position; // top、bottom
      var align; // left、right

      // window 窗口的宽度和高度
      var windowHeight = document.documentElement.clientHeight;
      var windowWidth = document.documentElement.clientWidth;

      // 动画方向参数
      var transformOriginX;
      var transformOriginY;

      // 子菜单的原始宽度和高度
      var submenuWidth = parseFloat($.getStyle(submenu, 'width'));
      var submenuHeight = parseFloat($.getStyle(submenu, 'height'));

      // 触发子菜单的菜单项的宽度高度
      var itemTmp = item.getBoundingClientRect();
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

      submenu.style.top = submenuTop + 'px';

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

      submenu.style.left = submenuLeft + 'px';

      // 设置菜单动画方向
      $.transformOrigin(submenu, transformOriginX + ' ' + transformOriginY);
    };

    /**
     * 打开子菜单
     * @param submenu
     */
    var openSubMenu = function (submenu) {
      readjustSubmenu(submenu);
      submenu.classList.add(CLASS.open);

      // 菜单项上添加激活状态的样式
      var item = $.parent(submenu, '.' + CLASS.item);
      item.classList.add(CLASS.active);
    };

    /**
     * 关闭子菜单，及其嵌套的子菜单
     * @param submenu
     */
    var closeSubMenu = function (submenu) {
      var item;

      // 关闭子菜单
      submenu.classList.remove(CLASS.open);

      // 移除激活状态的样式
      item = $.parent(submenu, '.' + CLASS.item);
      item.classList.remove(CLASS.active);

      // 循环关闭嵌套的子菜单
      var submenus = $.queryAll('.' + CLASS.menu, submenu);
      $.each(submenus, function (i, tmp) {
        tmp.classList.remove(CLASS.open);

        // 移除激活状态的样式
        item = $.parent(tmp, '.' + CLASS.item);
        item.classList.remove(CLASS.active);
      });
    };

    /**
     * 切换子菜单状态
     * @param submenu
     */
    var toggleSubMenu = function (submenu) {
      if (submenu.classList.contains(CLASS.open)) {
        closeSubMenu(submenu);
      } else {
        openSubMenu(submenu);
      }
    };

    /**
     * 绑定子菜单事件
     * @param inst 实例
     */
    var bindSubMenuEvent = function (inst) {
      var trigger;
      var delay;

      if (inst.options.subMenuTrigger === 'hover' && !mdui.support.touch) {
        trigger = 'mouseover mouseout';
        delay = inst.options.subMenuDelay;
      } else {
        trigger = 'click';
        delay = 0;
      }

      // subMneuTrigger: 'click'
      if (trigger === 'click') {
        $.on(inst.menu, trigger, '.' + CLASS.item, function (e) {
          var _this = this;

          // 禁用状态菜单不操作
          if (_this.getAttribute('disabled') !== null) {
            return;
          }

          // 没有点击在子菜单的菜单项上时，不操作（点在了子菜单的空白区域、或分隔线上）
          if ($.is(e.target, '.' + CLASS.menu) || $.is(e.target, '.' + CLASS.divider)) {
            return;
          }

          // 阻止冒泡，点击菜单项时只在最后一级的 mdui-menu-item 上生效，不向上冒泡
          if ($.parents(e.target, '.' + CLASS.item)[0] !== _this) {
            return;
          }

          var submenu = $.child(_this, '.' + CLASS.menu);

          // 先关闭除当前子菜单外的所有同级子菜单
          var menu = $.parent(_this, '.' + CLASS.menu);
          var items = $.children(menu, '.' + CLASS.item);
          $.each(items, function (i, item) {
            var tmpSubmenu = $.child(item, '.' + CLASS.menu);
            if (
              tmpSubmenu &&
              (!submenu || !$.is(tmpSubmenu, submenu))
            ) {
              closeSubMenu(tmpSubmenu);
            }
          });

          // 切换当前子菜单
          if (submenu) {
            toggleSubMenu(submenu);
          }
        });
      }

      // subMenuTrigger: 'hover'
      else {

        // 临时存储 setTimeout 对象
        var timeout;

        var timeoutOpen;
        var timeoutClose;

        $.on(inst.menu, trigger, '.' + CLASS.item, function (e) {
          var _this = this;
          var eventType = e.type;
          var relatedTarget = e.relatedTarget;

          // 禁用状态的菜单不操作
          if (_this.getAttribute('disabled') !== null) {
            return;
          }

          // 用 mouseover 模拟 mouseenter
          if (eventType === 'mouseover') {
            if (_this !== relatedTarget && $.contains(_this, relatedTarget)) {
              return;
            }
          }

          // 用 mouseout 模拟 mouseleave
          else if (eventType === 'mouseout') {
            if (_this === relatedTarget || $.contains(_this, relatedTarget)) {
              return;
            }
          }

          // 当前菜单项下的子菜单，未必存在
          var submenu = $.child(_this, '.' + CLASS.menu);

          // 鼠标移入菜单项时，显示菜单项下的子菜单
          if (eventType === 'mouseover') {
            if (submenu) {

              // 当前子菜单准备打开时，如果当前子菜单正准备着关闭，不用再关闭了
              var tmpClose = $.data(submenu, 'timeoutClose.mdui.menu');
              if (tmpClose) {
                clearTimeout(tmpClose);
              }

              // 如果当前子菜单已经打开，不操作
              if (submenu.classList.contains(CLASS.open)) {
                return;
              }

              // 当前子菜单准备打开时，其他准备打开的子菜单不用再打开了
              clearTimeout(timeoutOpen);

              // 准备打开当前子菜单
              timeout = timeoutOpen = setTimeout(function () {
                openSubMenu(submenu);
              }, delay);

              $.data(submenu, 'timeoutOpen.mdui.menu', timeout);
            }
          }

          // 鼠标移出菜单项时，关闭菜单项下的子菜单
          else if (eventType === 'mouseout') {
            if (submenu) {

              // 鼠标移出菜单项时，如果当前菜单项下的子菜单正准备打开，不用再打开了
              var tmpOpen = $.data(submenu, 'timeoutOpen.mdui.menu');
              if (tmpOpen) {
                clearTimeout(tmpOpen);
              }

              // 准备关闭当前子菜单
              timeout = timeoutClose = setTimeout(function () {
                closeSubMenu(submenu);
              }, delay);

              $.data(submenu, 'timeoutClose.mdui.menu', timeout);
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
      _this.anchor = $.dom(anchorSelector)[0];
      if (typeof _this.anchor === 'undefined') {
        return;
      }

      // 已通过自定义属性实例化过，不再重复实例化
      var oldInst = $.data(_this.anchor, 'mdui.menu');
      if (oldInst) {
        return oldInst;
      }

      _this.menu = $.dom(menuSelector)[0];

      // 触发菜单的元素 和 菜单必须时同级的元素，否则菜单可能不能定位
      if (!$.child(_this.anchor.parentNode, _this.menu)) {
        return;
      }

      _this.options = $.extend(DEFAULT, (opts || {}));
      _this.state = 'closed';

      // 是否是级联菜单
      _this.isCascade = _this.menu.classList.contains(CLASS.cascade);

      // covered 参数处理
      if (_this.options.covered === 'auto') {
        _this.isCovered = !_this.isCascade;
      } else {
        _this.isCovered = _this.options.covered;
      }

      // 点击触发菜单切换
      $.on(_this.anchor, 'click', function () {
        _this.toggle();
      });

      // 点击菜单外面区域关闭菜单
      $.on(document, 'click touchstart', function (e) {
        if (
          (_this.state === 'opening' || _this.state === 'opened') &&
          !$.is(e.target, _this.menu) &&
          !$.contains(_this.menu, e.target) &&
          !$.is(e.target, _this.anchor) &&
          !$.contains(_this.anchor, e.target)
        ) {
          _this.close();
        }
      });

      // 点击不含子菜单的菜单条目关闭菜单
      $.on(document, 'click', '.' + CLASS.item, function () {
        if (!$.query('.' + CLASS.menu, this) && this.getAttribute('disabled') === null) {
          _this.close();
        }
      });

      // 绑定点击或鼠标移入含子菜单的条目的事件
      bindSubMenuEvent(_this);

      // 窗口大小变化时，重新调整菜单位置
      $.on(window, 'resize', mdui.throttle(function () {
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
     * 打开菜单
     */
    Menu.prototype.open = function () {
      var _this = this;

      if (_this.state === 'opening' || _this.state === 'opened') {
        return;
      }

      _this.state = 'opening';

      // 调整菜单位置
      readjust(_this);

      // 菜单隐藏状态使用使用 fixed 定位。
      _this.menu.style.position = _this.options.fixed ? 'fixed' : 'absolute';

      // 打开菜单
      _this.menu.classList.add(CLASS.open);
      $.pluginEvent('open', 'menu', _this, _this.menu);

      // 打开动画完成后
      $.transitionEnd(_this.menu, function () {

        // 如果打开动画结束前，菜单状态已经改变了，则不触发 opened 事件
        if (_this.state !== 'opening') {
          return;
        }

        _this.state = 'opened';
        $.pluginEvent('opened', 'menu', _this, _this.menu);
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

      _this.menu.classList.remove(CLASS.open);
      _this.state = 'closing';
      $.pluginEvent('close', 'menu', _this, _this.menu);

      // 菜单开始关闭时，关闭所有子菜单
      $.each($.queryAll('.mdui-menu', _this.menu), function (i, submenu) {
        closeSubMenu(submenu);
      });

      // 关闭动画完成后
      $.transitionEnd(_this.menu, function () {

        // 如果关闭动画完成前，菜单状态又改变了，则不触发 closed 事件
        if (_this.state !== 'closing') {
          return;
        }

        _this.state = 'closed';
        $.pluginEvent('closed', 'menu', _this, _this.menu);

        // 关闭后，恢复菜单样式到默认状态
        _this.menu.style.top = '';
        _this.menu.style.left = '';
        _this.menu.style.width = '';

        // 关闭后，恢复 fixed 定位
        _this.menu.style.position = 'fixed';
      });
    };

    return Menu;
  })();


  /**
   * =============================================================================
   * ************   Menu 自定义属性 API   ************
   * =============================================================================
   */

  $.ready(function () {

    $.on(document, 'click', '[mdui-menu]', function () {
      var _this = this;

      var inst = $.data(_this, 'mdui.menu');
      if (!inst) {
        var options = $.parseOptions(_this.getAttribute('mdui-menu'));
        var menuSelector = options.target;
        delete options.target;

        inst = new mdui.Menu(_this, menuSelector, options);
        $.data(_this, 'mdui.menu', inst);

        inst.toggle();
      }
    });
  });


  /* jshint ignore:start */
  window.mdui = mdui;
})(window, document);
/* jshint ignore:end */
