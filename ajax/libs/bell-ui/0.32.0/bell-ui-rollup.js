/**
 * bell-ui.js v0.32.0
 * (c) 2018-2022 
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('yox')) :
  typeof define === 'function' && define.amd ? define(['exports', 'yox'], factory) :
  (global = global || self, factory(global.Bell = {}, global.Yox));
}(this, function (exports, Yox) { 'use strict';

  Yox = Yox && Yox.hasOwnProperty('default') ? Yox['default'] : Yox;

  var template = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-row'+(_p(_K,'autoWrap',_O.autoWrap).value?' bell-row-auto-wrap':'')+(_p(_K,'breakpoint',_O.breakpoint).value?' bell-row-'+_v(_p(_K,'breakpoint',_O.breakpoint).value):'')+(_p(_K,'justify',_O.justify).value?' bell-row-justify-'+_v(_p(_K,'justify',_O.justify).value):'')+(_p(_K,'align',_O.align).value?' bell-row-align-'+_v(_p(_K,'align',_O.align).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var TRUE = true;
  var FALSE = false;
  var NULL = null;
  var UNDEFINED = void 0;
  var RAW_DATE = 'date';
  var RAW_ARRAY = 'array';
  var RAW_STRING = 'string';
  var RAW_BOOLEAN = 'boolean';
  var RAW_NUMERIC = 'numeric';
  var RAW_NUMBER = 'number';
  var RAW_OBJECT = 'object';
  var RAW_FUNCTION = 'function';
  var RAW_HORIZONTAL = 'horizontal';
  var RAW_VERTICAL = 'vertical';
  var RAW_INLINE = 'inline';
  var RAW_SMALL = 'small';
  var RAW_DEFAULT = 'default';
  var RAW_LARGE = 'large';
  var RAW_ALWAYS = 'always';
  var RAW_NEVER = 'never';
  var RAW_HOVER = 'hover';
  var RAW_CLICK = 'click';
  var RAW_CUSTOM = 'custom';
  var RAW_RESIZE = 'resize';
  var RAW_CENTER = 'center';
  var RAW_MIDDLE = 'middle';
  var RAW_WAIT = 'wait';
  var RAW_PROCESS = 'process';
  var RAW_FINISH = 'finish';
  var RAW_STRETCH = 'stretch';
  var RAW_CONTAIN = 'contain';
  // 以后再支持 cover
  var RAW_TOP = 'top';
  var RAW_TOP_START = 'top-start';
  var RAW_TOP_END = 'top-end';
  var RAW_BOTTOM = 'bottom';
  var RAW_BOTTOM_START = 'bottom-start';
  var RAW_BOTTOM_END = 'bottom-end';
  var RAW_LEFT = 'left';
  var RAW_LEFT_START = 'left-start';
  var RAW_LEFT_END = 'left-end';
  var RAW_RIGHT = 'right';
  var RAW_RIGHT_START = 'right-start';
  var RAW_RIGHT_END = 'right-end';
  var RAW_TYPE_PRIMARY = 'primary';
  var RAW_TYPE_SUCCESS = 'success';
  var RAW_TYPE_WARNING = 'warning';
  var RAW_TYPE_ERROR = 'error';
  var RAW_TYPE_INFO = 'info';
  var RAW_TYPE_DASHED = 'dashed';
  var RAW_TYPE_LINK = 'link';
  var RAW_TYPE_TEXT = 'text';
  var RAW_TYPE_TITLE = 'title';
  var RAW_TYPE_CONTENT = 'content';
  var RAW_TYPE_MUTED = 'muted';
  var RAW_TYPE_PURE = 'pure';
  var RAW_SHAPE_CIRCLE = 'circle';
  var RAW_SHAPE_ROUND = 'round';
  var RAW_ALL = 'all';
  var RAW_PARENT = 'parent';
  var RAW_CHILD = 'child';
  var RAW_EVENT_KEYPRESS = 'keypress';
  var RAW_EVENT_KEYDOWN = 'keydown';
  var RAW_EVENT_KEYUP = 'keyup';
  var RAW_EVENT_MOUSEMOVE = 'mousemove';
  var RAW_EVENT_MOUSEUP = 'mouseup';
  var RAW_EVENT_SCROLL = 'scroll';
  var RAW_EVENT_RESIZE = 'resize';
  var RAW_EVENT_BEFORE_DESTROY = 'beforeDestroy';
  var RAW_SLOT_PREFIX = '$slot_';
  var RAW_SLOT_CHILDREN = RAW_SLOT_PREFIX + 'children';
  var RAW_DARK = 'dark';
  var RAW_LIGHT = 'light';
  var RAW_IMAGE_ACCEPT = 'image/png,image/jpeg,image/jpg,image/gif';
  var RAW_THEME_ARRAY = [
      RAW_DARK,
      RAW_LIGHT ];
  var RAW_STATUS_ARRAY = [
      RAW_TYPE_INFO,
      RAW_TYPE_SUCCESS,
      RAW_TYPE_WARNING,
      RAW_TYPE_ERROR ];
  var RAW_TYPE_ARRAY = [
      RAW_TYPE_PRIMARY,
      RAW_TYPE_INFO,
      RAW_TYPE_SUCCESS,
      RAW_TYPE_WARNING,
      RAW_TYPE_ERROR ];
  var RAW_SIZE_ARRAY = [
      RAW_SMALL,
      RAW_DEFAULT,
      RAW_LARGE ];
  var RAW_PLACEMENT_ARRAY = [
      RAW_TOP,
      RAW_TOP_START,
      RAW_TOP_END,
      RAW_BOTTOM,
      RAW_BOTTOM_START,
      RAW_BOTTOM_END,
      RAW_LEFT,
      RAW_LEFT_START,
      RAW_LEFT_END,
      RAW_RIGHT,
      RAW_RIGHT_START,
      RAW_RIGHT_END
  ];
  var RAW_STYLE_TYPE = [
      RAW_STRING,
      RAW_OBJECT,
      RAW_ARRAY ];
  var WINDOW = window;
  var DOCUMENT = document;
  var BODY = DOCUMENT.body;
  var HOVER_DELAY = 100;

  var element = DOCUMENT.createElement('div');
  var prefixs = ['Webkit', 'Moz', 'O', 'ms'];
  function testCSS(property) {
      var upperCase = property.charAt(0).toUpperCase()
          + property.slice(1);
      var list = (property
          + ' '
          + prefixs.join(upperCase + ' ')
          + upperCase).split(' ');
      for (var i = 0, len = list.length; i < len; i++) {
          if (list[i] in element.style) {
              return list[i];
          }
      }
  }
  var screenWidth = WINDOW.screen.availWidth;
  var transitionEnd = testCSS('transition') ? 'transitionend' : '';
  var isMac = /Macintosh/i.test(navigator.userAgent);
  var supportTransform = testCSS('transform') ? TRUE : FALSE;
  var supportFlexGap = testCSS('gap') ? TRUE : FALSE;
  function onTransitionEnd(el, callback) {
      // 如果 el 已经被隐藏，则直接调用 callback
      if (transitionEnd && (el.offsetWidth || el.offsetHeight)) {
          var listener_1 = function () {
              Yox.dom.off(el, transitionEnd, listener_1);
              callback();
          };
          Yox.dom.on(el, transitionEnd, listener_1);
      }
      else {
          Yox.nextTick(callback);
      }
  }
  var supportPageOffset = WINDOW.pageXOffset !== UNDEFINED;
  var isCSS1Compat = DOCUMENT.compatMode === 'CSS1Compat';
  function getPageX() {
      return supportPageOffset
          ? WINDOW.pageXOffset
          : isCSS1Compat
              ? DOCUMENT.documentElement.scrollLeft
              : BODY.scrollLeft;
  }
  function getPageY() {
      return supportPageOffset
          ? WINDOW.pageYOffset
          : isCSS1Compat
              ? DOCUMENT.documentElement.scrollTop
              : BODY.scrollTop;
  }
  var requestAnimationFrame = (WINDOW.requestAnimationFrame ||
      WINDOW['webkitRequestAnimationFrame'] ||
      WINDOW['mozRequestAnimationFrame'] ||
      WINDOW['msRequestAnimationFrame'] ||
      function (callback) {
          return WINDOW.setTimeout(callback, 1000 / 60);
      });
  function readElementRectInfo(element, callback) {
      var rectInfo = element.getBoundingClientRect();
      if (rectInfo.width > 0 || rectInfo.height > 0) {
          callback(rectInfo);
          return;
      }
      setTimeout(function () {
          readElementRectInfo(element, callback);
      }, 20);
  }
  function contains(element, target) {
      if (element.contains && element.contains(target)) {
          return TRUE;
      }
      else if (element.compareDocumentPosition && element.compareDocumentPosition(target) > 16) {
          return TRUE;
      }
      return FALSE;
  }
  function toNumber(value, defaultValue) {
      return Yox.is.numeric(value)
          ? +value
          : defaultValue !== UNDEFINED
              ? defaultValue
              : 0;
  }
  function toString(value, defaultValue) {
      if (value == NULL) {
          return defaultValue !== UNDEFINED
              ? defaultValue
              : '';
      }
      return '' + value;
  }
  function toPixel(value) {
      return value + 'px';
  }
  function toPercent(value) {
      return value + '%';
  }
  function findComponentUpward(parent, componentName) {
      if (typeof componentName === 'string') {
          componentName = [componentName];
      }
      else {
          componentName = componentName;
      }
      while (parent) {
          var name = parent.$options.name;
          if (name && Yox.array.has(componentName, name)) {
              break;
          }
          else {
              parent = parent.$parent;
          }
      }
      return parent;
  }
  function oneOf(values) {
      return function (key, value, componentName) {
          // 只需要检测有值的情况
          if (value === UNDEFINED) {
              return;
          }
          // 传值在枚举值中
          if (Yox.array.has(values, value, FALSE)) {
              return;
          }
          Yox.logger.warn(key + " \u671F\u671B\u662F " + values.join(',') + " \u4E2D\u7684\u503C\uFF0C\u5B9E\u9645\u4F20\u503C [" + value + "]\u3002", componentName);
      };
  }
  function getNowTime() {
      return Date.now();
  }
  var SECOND = 1000;
  var MINUTE = 60 * SECOND;
  var HOUR = 60 * MINUTE;
  var DAY = 24 * HOUR;
  function formatMillisecond(value, options) {
      var format = options.format, trimDay = options.trimDay, trimHour = options.trimHour;
      var showDay = format.indexOf('d') >= 0;
      var showHour = format.indexOf('H') >= 0;
      var showMinute = format.indexOf('m') >= 0;
      var showSecond = format.indexOf('s') >= 0;
      var day = 0;
      if (showDay) {
          day = Math.floor(value / DAY);
          value %= DAY;
      }
      var hour = 0;
      if (showHour) {
          hour = Math.floor(value / HOUR);
          value %= HOUR;
      }
      var minute = 0;
      if (showMinute) {
          minute = Math.floor(value / MINUTE);
          value %= MINUTE;
      }
      var second = 0;
      if (showSecond) {
          second = Math.floor(value / SECOND);
          value %= SECOND;
      }
      if (!day && trimDay) {
          format = format.replace(/dd:/, '').replace(/d:/, '');
          if (!hour && trimHour) {
              format = format.replace(/HH:/, '').replace(/H:/, '');
          }
      }
      return format
          .replace(/dd/, padStart(day))
          .replace(/d/, toString(day))
          .replace(/HH/, padStart(hour))
          .replace(/H/, toString(hour))
          .replace(/mm/, padStart(minute))
          .replace(/m/, toString(minute))
          .replace(/SSS/, padStart(value, 3))
          .replace(/ss/, padStart(second))
          .replace(/s/, toString(second));
  }
  function padStart(value, length) {
      if (length === void 0) { length = 2; }
      var text = toString(value);
      var arrayLength = length - text.length + 1;
      if (arrayLength > 0) {
          return new Array(arrayLength).join('0') + value;
      }
      return text;
  }
  function scrollTo(element, from, to, duration, callback) {
      if (from === void 0) { from = 0; }
      if (duration === void 0) { duration = 500; }
      var difference = Math.abs(from - to);
      var step = duration > 0 ? Math.ceil(difference / duration * 50) : difference;
      function scroll(start, end, step) {
          if (start === end) {
              if (callback) {
                  callback();
              }
              return;
          }
          var duration = (start + step > end) ? end : start + step;
          if (start > end) {
              duration = (start - step < end) ? end : start - step;
          }
          if (element === WINDOW) {
              WINDOW.scrollTo(duration, duration);
          }
          else {
              element.scrollTop = duration;
          }
          requestAnimationFrame(function () {
              scroll(duration, end, step);
          });
      }
      scroll(from, to, step);
  }
  function getStatusIconName(status) {
      return status === RAW_TYPE_SUCCESS
          ? 'checkbox-circle-fill'
          : status === RAW_TYPE_WARNING
              ? 'error-warning-fill'
              : status === RAW_TYPE_ERROR
                  ? 'close-circle-fill'
                  : 'information-fill';
  }
  function spaceListStyle(gaps, vertical, autoWrap, style) {
      var result = [];
      if (gaps) {
          var gapStyle = {};
          var horizontalGap = gaps[0];
          var verticalGap = gaps[1];
          if (supportFlexGap) {
              if (horizontalGap > 0) {
                  gapStyle.columnGap = toPixel(horizontalGap);
              }
              if (verticalGap > 0) {
                  gapStyle.rowGap = toPixel(verticalGap);
              }
          }
          else if (vertical
              || (verticalGap > 0 && autoWrap)) {
              gapStyle.marginBottom = toPixel(-verticalGap);
          }
          if (Yox.object.keys(gapStyle).length > 0) {
              result.push(gapStyle);
          }
      }
      if (style) {
          result.push(style);
      }
      if (result.length > 0) {
          return result;
      }
  }
  function spaceItemStyle(gaps, vertical, autoWrap, style) {
      var result = style || {};
      if (!supportFlexGap && gaps) {
          var horizontalGap = gaps[0];
          var verticalGap = gaps[1];
          if (vertical) {
              if (verticalGap > 0) {
                  result.marginBottom = toPixel(verticalGap);
              }
          }
          else {
              if (horizontalGap > 0) {
                  result.marginRight = toPixel(horizontalGap);
              }
              if (verticalGap > 0 && autoWrap) {
                  result.marginBottom = toPixel(verticalGap);
              }
          }
      }
      if (Yox.object.keys(result).length > 0) {
          return result;
      }
  }
  function getNodesProps(nodes, propName) {
      var result = [];
      Yox.array.each(nodes, function (node) {
          result.push(Yox.is.array(node)
              ? getNodesProps(node, propName)
              : node[propName]);
      });
      return result;
  }
  function renderNodesProps(value) {
      if (Yox.is.array(value)) {
          return value.join(' / ');
      }
      return value;
  }
  function setTreeCheckedKey(treeData, keyName, checked, interact, isTarget, isChecked, addChecked, removeChecked, isIndeterminate, addIndeterminate, removeIndeterminate) {
      var node;
      var parents = [];
      var callFunc = function (node, func) {
          var nodes = [node];
          var keys = [node[keyName]];
          Yox.array.each(parents, function (parent) {
              nodes.unshift(parent);
              keys.unshift(parent[keyName]);
          });
          return func(renderNodesProps(keys), nodes);
      };
      var handleNode = function (child) {
          if (callFunc(child, isTarget)) {
              node = child;
              return FALSE;
          }
          parents.unshift(child);
          if (child.children) {
              var result_1 = UNDEFINED;
              Yox.array.each(child.children, function (child) {
                  return result_1 = handleNode(child);
              });
              if (result_1 === FALSE) {
                  return FALSE;
              }
          }
          parents.shift();
      };
      Yox.array.each(treeData, handleNode);
      if (!node) {
          return;
      }
      var addNode = function (node, addChildren) {
          if (node.disabled) {
              return;
          }
          if (!callFunc(node, isChecked)) {
              callFunc(node, addChecked);
          }
          if (addChildren === TRUE && node.children) {
              parents.unshift(node);
              Yox.array.each(node.children, function (node) {
                  addNode(node, TRUE);
              });
              parents.shift();
              setNodeIndeterminate(node, FLAG_ALL_SELECTED);
          }
      };
      var removeNode = function (node, removeChildren) {
          if (node.disabled) {
              return;
          }
          callFunc(node, removeChecked);
          if (removeChildren === TRUE && node.children) {
              parents.unshift(node);
              Yox.array.each(node.children, function (node) {
                  removeNode(node, TRUE);
              });
              parents.shift();
              setNodeIndeterminate(node, FLAG_NONE_SELECTED);
          }
      };
      var FLAG_ALL_SELECTED = 1;
      var FLAG_NONE_SELECTED = -1;
      var FLAG_PART_SELECTED = 0;
      var getNodeIndeterminate = function (node) {
          // 看下兄弟节点是否全部勾选
          var children = node.children;
          var length = children.length;
          var checkedCount = 0;
          var indeterminateCount = 0;
          for (var i = 0; i < length; i++) {
              if (callFunc(children[i], isChecked)) {
                  checkedCount++;
              }
              if (callFunc(children[i], isIndeterminate)) {
                  indeterminateCount++;
              }
          }
          if (checkedCount === 0) {
              return indeterminateCount > 0
                  ? FLAG_PART_SELECTED
                  : FLAG_NONE_SELECTED;
          }
          if (checkedCount === length) {
              return FLAG_ALL_SELECTED;
          }
          return FLAG_PART_SELECTED;
      };
      var setNodeIndeterminate = function (node, indeterminate) {
          if (!interact) {
              return;
          }
          if (indeterminate === FLAG_PART_SELECTED) {
              if (!callFunc(node, isIndeterminate)) {
                  callFunc(node, addIndeterminate);
              }
          }
          else {
              callFunc(node, removeIndeterminate);
          }
      };
      if (checked) {
          addNode(node, interact);
          if (interact) {
              Yox.array.each(parents.slice(), function (parent) {
                  if (parent.disabled) {
                      return FALSE;
                  }
                  var indeterminate = getNodeIndeterminate(parent);
                  parents.shift();
                  if (indeterminate === FLAG_ALL_SELECTED) {
                      addNode(parent);
                  }
                  else {
                      removeNode(parent);
                  }
                  setNodeIndeterminate(parent, indeterminate);
              });
          }
      }
      else {
          removeNode(node, interact);
          if (interact) {
              Yox.array.each(parents.slice(), function (parent) {
                  if (parent.disabled) {
                      return FALSE;
                  }
                  var indeterminate = getNodeIndeterminate(parent);
                  parents.shift();
                  removeNode(parent);
                  setNodeIndeterminate(parent, indeterminate);
              });
          }
      }
  }

  var responsiveMap = {
      xs: '(max-width: 575px)',
      sm: '(min-width: 576px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 992px)',
      xl: '(min-width: 1200px)',
      xxl: '(min-width: 1600px)',
  };
  var responsiveArray = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  function eachBreakpoints(callback) {
      Yox.array.each(responsiveArray, function (key) {
          callback(key, window.matchMedia(responsiveMap[key]));
      });
  }
  function getCurrentBreakpoint() {
      var result;
      eachBreakpoints(function (breakpoint, mql) {
          if (mql.matches) {
              result = breakpoint;
          }
      });
      return result;
  }
  var store = new Yox({
      data: {
          breakpoint: getCurrentBreakpoint(),
      }
  });
  eachBreakpoints(function (breakpoint, mql) {
      var listener = function (event) {
          if (event.matches) {
              store.set('breakpoint', breakpoint);
          }
          else if (store.get('breakpoint') === breakpoint) {
              store.set('breakpoint', getCurrentBreakpoint());
          }
      };
      mql.addListener(listener);
  });
  function getBreakpoint() {
      return store.get('breakpoint');
  }
  function watchBreakpoint(watcher) {
      store.watch('breakpoint', watcher);
  }
  function unwatchBreakpoint(watcher) {
      store.unwatch('breakpoint', watcher);
  }
  function parseGutter(breakpoint, gutter) {
      if (gutter > 0) {
          return gutter;
      }
      else if (breakpoint && Yox.is.object(gutter)) {
          // 找最接近的
          var startIndex = responsiveArray.indexOf(breakpoint);
          if (startIndex >= 0) {
              for (var i = startIndex; i >= 0; i--) {
                  var value = gutter[responsiveArray[i]];
                  if (value > 0) {
                      return value;
                  }
              }
          }
      }
  }

  var Row = Yox.define({
      template: template,
      name: 'bell-Row',
      propTypes: {
          gutter: {
              type: [RAW_NUMERIC, RAW_OBJECT, RAW_ARRAY],
          },
          justify: {
              type: oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
              value: 'start',
          },
          align: {
              type: oneOf([RAW_TOP, RAW_MIDDLE, RAW_BOTTOM]),
              value: RAW_TOP,
          },
          autoWrap: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              breakpoint: getBreakpoint(),
          };
      },
      computed: {
          responsiveGutter: function () {
              var gutter = this.get('gutter');
              if (gutter) {
                  if (!Yox.is.array(gutter)) {
                      gutter = [gutter];
                  }
                  var breakpoint = this.get('breakpoint');
                  return [
                      parseGutter(breakpoint, gutter[0]),
                      parseGutter(breakpoint, gutter[1]) ];
              }
          },
          inlineStyle: function () {
              var result = [];
              var customStyle = {};
              var responsiveGutter = this.get('responsiveGutter');
              if (responsiveGutter) {
                  if (responsiveGutter[0] > 0) {
                      var horizontalGutter = toPixel(responsiveGutter[0] / -2);
                      customStyle.marginLeft = horizontalGutter;
                      customStyle.marginRight = horizontalGutter;
                  }
                  if (responsiveGutter[1] > 0) {
                      if (supportFlexGap) {
                          customStyle.rowGap = toPixel(responsiveGutter[1]);
                      }
                      else {
                          var verticalGutter = toPixel(responsiveGutter[1] / -2);
                          customStyle.marginTop = verticalGutter;
                          customStyle.marginBottom = verticalGutter;
                      }
                  }
              }
              if (Yox.object.keys(customStyle).length > 0) {
                  result.push(customStyle);
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          }
      },
      watchers: {
          autoWrap: function (autoWrap) {
              this.fire({
                  type: 'change',
                  ns: 'row',
              }, {
                  autoWrap: autoWrap,
              }, TRUE);
          },
          breakpoint: function (breakpoint) {
              this.fire({
                  type: 'change',
                  ns: 'row',
              }, {
                  breakpoint: breakpoint,
              }, TRUE);
          },
          responsiveGutter: function (responsiveGutter) {
              this.fire({
                  type: 'change',
                  ns: 'row',
              }, {
                  responsiveGutter: responsiveGutter,
              }, TRUE);
          }
      },
      afterMount: function () {
          var me = this;
          var watcher = function (value) {
              me.set('breakpoint', value);
          };
          watchBreakpoint(watcher);
          var destroy = function (component) {
              if (component === me) {
                  unwatchBreakpoint(watcher);
                  Yox.lifeCycle.off(RAW_EVENT_BEFORE_DESTROY, destroy);
              }
          };
          Yox.lifeCycle.on(RAW_EVENT_BEFORE_DESTROY, destroy);
      }
  });

  var template$1 = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-col'+(_p(_K,'span',_O.span).value?' bell-col-'+_v(_p(_K,'span',_O.span).value):'')+(_p(_K,'order',_O.order).value?' bell-col-order-'+_v(_p(_K,'order',_O.order).value):'')+(_p(_K,'offset',_O.offset).value?' bell-col-offset-'+_v(_p(_K,'offset',_O.offset).value):'')+(_p(_K,'pull',_O.pull).value?' bell-col-pull-'+_v(_p(_K,'pull',_O.pull).value):'')+(_p(_K,'push',_O.push).value?' bell-col-push-'+_v(_p(_K,'push',_O.push).value):'')+(_p(_K,'responsiveClass',_O.responsiveClass).value?' '+_v(_p(_K,'responsiveClass',_O.responsiveClass).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Col = Yox.define({
      template: template$1,
      name: 'bell-Col',
      propTypes: {
          flex: {
              type: [RAW_NUMBER, RAW_STRING],
          },
          span: {
              type: RAW_NUMERIC,
          },
          order: {
              type: RAW_NUMERIC,
          },
          offset: {
              type: RAW_NUMERIC,
          },
          pull: {
              type: RAW_NUMERIC,
          },
          push: {
              type: RAW_NUMERIC,
          },
          xs: {
              type: [RAW_NUMERIC, RAW_OBJECT],
          },
          sm: {
              type: [RAW_NUMERIC, RAW_OBJECT],
          },
          md: {
              type: [RAW_NUMERIC, RAW_OBJECT],
          },
          lg: {
              type: [RAW_NUMERIC, RAW_OBJECT],
          },
          xl: {
              type: [RAW_NUMERIC, RAW_OBJECT],
          },
          xxl: {
              type: [RAW_NUMERIC, RAW_OBJECT],
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var row = findComponentUpward(options.parent, 'bell-Row');
          return {
              autoWrap: row.get('autoWrap'),
              breakpoint: row.get('breakpoint'),
              responsiveGutter: row.get('responsiveGutter'),
          };
      },
      events: {
          change: {
              listener: function (_, data) {
                  this.set(data);
              },
              ns: 'row',
          }
      },
      computed: {
          responsiveClass: function () {
              var me = this;
              var breakpoint = me.get('breakpoint');
              var breakpointList = responsiveArray.map(function (breakpoint) {
                  return me.get(breakpoint);
              });
              var breakpointName;
              var breakpointConfig;
              var startIndex = responsiveArray.indexOf(breakpoint);
              if (startIndex >= 0) {
                  for (var i = startIndex; i >= 0; i--) {
                      var value = breakpointList[i];
                      if (value) {
                          breakpointName = responsiveArray[i];
                          breakpointConfig = value;
                          break;
                      }
                  }
              }
              if (breakpointConfig) {
                  var result = [];
                  if (Yox.is.object(breakpointConfig)) {
                      var span = breakpointConfig.span, order = breakpointConfig.order, offset = breakpointConfig.offset, pull = breakpointConfig.pull, push = breakpointConfig.push;
                      if (span) {
                          result.push('bell-col-' + breakpointName + '-' + span);
                      }
                      if (order) {
                          result.push('bell-col-' + breakpointName + '-order-' + order);
                      }
                      if (offset) {
                          result.push('bell-col-' + breakpointName + '-offset-' + offset);
                      }
                      if (pull) {
                          result.push('bell-col-' + breakpointName + '-pull-' + pull);
                      }
                      if (push) {
                          result.push('bell-col-' + breakpointName + '-push-' + push);
                      }
                  }
                  else if (Yox.is.numeric(breakpointConfig)) {
                      result.push('bell-col-' + breakpointName + '-' + breakpointConfig);
                  }
                  if (result.length) {
                      return result.join(' ');
                  }
              }
          },
          inlineStyle: function () {
              var result = [];
              var customStyle = {};
              var flex = this.get('flex');
              if (Yox.is.numeric(flex)) {
                  customStyle.flex = flex + " " + flex + " auto";
              }
              else if (flex && Yox.is.string(flex)) {
                  customStyle.flex = /^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)
                      ? "0 0 " + flex
                      : flex;
              }
              var autoWrap = this.get('autoWrap');
              // Hack for Firefox to avoid size issue
              // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
              if (!autoWrap && customStyle.flex) {
                  customStyle.minWidth = 0;
              }
              var responsiveGutter = this.get('responsiveGutter');
              if (responsiveGutter) {
                  if (responsiveGutter[0] > 0) {
                      var horizontalGutter = toPixel(responsiveGutter[0] / 2);
                      customStyle.paddingLeft = horizontalGutter;
                      customStyle.paddingRight = horizontalGutter;
                  }
                  if (responsiveGutter[1] > 0 && !supportFlexGap) {
                      var verticalGutter = toPixel(responsiveGutter[1] / 2);
                      customStyle.paddingTop = verticalGutter;
                      customStyle.paddingBottom = verticalGutter;
                  }
              }
              if (Yox.object.keys(customStyle).length > 0) {
                  result.push(customStyle);
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          }
      },
  });

  var template$2 = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-add-icon'},$6={'class':'bell-add-title'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];($0={children:_k('$slot_icon')||function(){var _N=[];_N.push({context:_D,operator:_z,props:{name:'add-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_p(_K,'title',_O.title).value?_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,events:{click:_f('click','click.add','click','','click','add')},nativeAttrs:{'class':'bell-add'+(_p(_K,'block',_O.block).value?' bell-add-block':'')+(_p(_K,'vertical',_O.vertical).value?' bell-add-vertical':' bell-add-horizontal')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var template$3 = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-icon'+(_p(_K,'name',_O.name).value?' bell-icon-'+_v(_p(_K,'name',_O.name).value):'')+(_p(_K,'spin',_O.spin).value?' bell-icon-spin':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'i',type:3}));}})();

  var Icon = Yox.define({
      template: template$3,
      name: 'bell-Icon',
      propTypes: {
          name: {
              type: RAW_STRING,
              required: TRUE,
          },
          size: {
              type: RAW_NUMERIC,
          },
          color: {
              type: RAW_STRING,
          },
          spin: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          inlineStyle: function () {
              var result = [];
              var customStyle = {};
              var color = this.get('color');
              var size = this.get('size');
              if (color) {
                  customStyle.color = color;
              }
              if (size > 0) {
                  customStyle.fontSize = toPixel(size);
              }
              if (Yox.object.keys(customStyle).length > 0) {
                  result.push(customStyle);
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      }
  });

  var Add = Yox.define({
      template: template$2,
      name: 'bell-Add',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          width: {
              type: RAW_NUMERIC,
              value: 100,
          },
          height: {
              type: RAW_NUMERIC,
              value: 100,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          vertical: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          inlineStyle: function () {
              var result = [];
              var width = this.get('width');
              var height = this.get('height');
              if (this.get('block')) {
                  result.push({
                      height: toPixel(height),
                  });
              }
              else {
                  result.push({
                      width: toPixel(width),
                      height: toPixel(height),
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      },
      components: {
          Icon: Icon,
      }
  });

  var template$4 = (function(){var $1=void 0,$5={'class':'bell-color-swatch-item-color'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'swatchListStyle',_O.swatchListStyle).value?_M.nativeStyles=_b(_p(_K,'swatchListStyle',_O.swatchListStyle).value):$1;return _M}({children:function(){var _N=[];_i(_p(_K,'swatches',_O.swatches),function(_K,_O,_P,_Q){_N.push(function(_M){_s(_K,0,'swatchItemStyle').value?_M.nativeStyles=_b(_s(_K,0,'swatchItemStyle').value):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,nativeStyles:{backgroundColor:_q(_K,_K.length-1).value},operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','onColorClick(this)','click','','onColorClick',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}})},nativeAttrs:{'class':'bell-color-swatch-item',tabindex:'0'},operator:_y,tag:'div',type:3}));});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-color-swatch'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var swatchGaps = [10, 8];
  var ColorSwatch = Yox.define({
      template: template$4,
      name: 'bell-ColorSwatch',
      propTypes: {
          swatches: {
              type: RAW_ARRAY,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          swatchListStyle: function () {
              return spaceListStyle(swatchGaps, FALSE, TRUE, this.get('style'));
          },
          swatchItemStyle: function () {
              return spaceItemStyle(swatchGaps, FALSE, TRUE);
          },
      },
      methods: {
          onColorClick: function (color) {
              this.fire({
                  type: 'change',
                  ns: 'colorSwatch',
              }, {
                  color: color,
              });
          },
      }
  });

  var template$5 = (function(){var $1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({context:_D,nativeAttrs:{'class':'bell-countdown'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',text:_v(_p(_K,'formatedValue',_O.formatedValue).value),type:3}));}})();

  var SECOND$1 = 1000;
  var Countdown = Yox.define({
      template: template$5,
      name: 'bell-Countdown',
      propTypes: {
          value: {
              type: RAW_NUMERIC,
          },
          step: {
              type: RAW_NUMERIC,
          },
          format: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          formatedValue: function () {
              var value = toNumber(this.get('value'));
              var format = this.get('format') || 'HH:mm:ss';
              return formatMillisecond(value, { format: format });
          }
      },
      afterMount: function () {
          var me = this;
          var timer;
          var step;
          var clearTimer = function () {
              if (timer) {
                  clearInterval(timer);
                  timer = UNDEFINED;
              }
          };
          var next = function () {
              var value = toNumber(me.get('value'));
              var isFinish;
              if (value > 0) {
                  var newValue = Math.max(value - step, 0);
                  me.set('value', newValue);
                  isFinish = newValue == 0;
                  me.fire({
                      type: 'change',
                      ns: 'countdown'
                  }, {
                      value: newValue,
                  });
              }
              else {
                  isFinish = TRUE;
              }
              if (isFinish) {
                  clearTimer();
                  me.fire({
                      type: 'finish',
                      ns: 'countdown'
                  });
              }
          };
          me.watch('step', function (newValue) {
              step = toNumber(newValue, SECOND$1);
              clearTimer();
              if (step > 0) {
                  timer = window.setInterval(next, step);
              }
          }, TRUE);
          var destroy = function (component) {
              if (component === me) {
                  clearTimer();
                  Yox.lifeCycle.off(RAW_EVENT_BEFORE_DESTROY, destroy);
              }
          };
          Yox.lifeCycle.on(RAW_EVENT_BEFORE_DESTROY, destroy);
      }
  });

  var template$6 = (function(){var $0,$1=void 0,$3=!0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'draggable',_O.draggable).value?_l(_M,'nativeAttrs','draggable','true'):$1;_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));_p(_K,'needClose',_O.needClose).value?_N.push({context:_D,events:{'click.native':_f('click.native','close.closable','click','native','close','closable',$1,$3)},operator:_z,props:{className:'bell-closable-icon',name:'close-circle-fill'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-closable'+(_p(_K,'showClose',_O.showClose).value===_p(_K,'RAW_ALWAYS',_O.RAW_ALWAYS).value?' bell-closable-show-always':_p(_K,'showClose',_O.showClose).value===_p(_K,'RAW_HOVER',_O.RAW_HOVER).value?' bell-closable-show-hover':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Closable = Yox.define({
      template: template$6,
      name: 'bell-Closable',
      propTypes: {
          needClose: {
              type: RAW_BOOLEAN,
          },
          showClose: {
              type: oneOf([RAW_ALWAYS, RAW_HOVER]),
          },
          draggable: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              RAW_ALWAYS: RAW_ALWAYS,
              RAW_HOVER: RAW_HOVER,
          };
      }
  });

  var template$7 = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-footer-bar'+(_p(_K,'align',_O.align).value?' bell-footer-bar-align-'+_v(_p(_K,'align',_O.align).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var FooterBar = Yox.define({
      template: template$7,
      name: 'bell-FooterBar',
      propTypes: {
          align: {
              type: oneOf(['start', 'end', 'center']),
              value: 'center',
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$8 = (function(){var $0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));}})();

  var ResizeObserver$1 = Yox.define({
      template: template$8,
      name: 'bell-ResizeObserver',
      propTypes: {
          delay: {
              type: RAW_NUMERIC,
          }
      },
      afterMount: function () {
          var me = this;
          var element = me.$el;
          var delay = toNumber(me.get('delay'), 0);
          var timerRef;
          var timerTimestamp;
          var actualWidth;
          var actualHeight;
          var handleResize = function (width, height) {
              if (width > 0 || height > 0) {
                  actualWidth = width;
                  actualHeight = height;
                  // 需要延时的情况下，
                  if (delay > 0) {
                      var now = getNowTime();
                      var rest = timerTimestamp > 0 ? now - timerTimestamp : delay;
                      if (!timerRef) {
                          timerTimestamp = now;
                          timerRef = setTimeout(fireResize, rest);
                          return;
                      }
                      if (rest > 0) {
                          clearTimeout(timerRef);
                          timerRef = setTimeout(fireResize, delay);
                          return;
                      }
                  }
                  fireResize();
              }
          };
          var fireResize = function () {
              if (timerRef) {
                  timerTimestamp = 0;
                  clearTimeout(timerRef);
              }
              me.fire({
                  type: 'resize',
                  ns: 'resizeObserver',
              }, {
                  width: actualWidth,
                  height: actualHeight,
              });
          };
          handleResize(element.clientWidth, element.clientHeight);
          // @ts-ignore
          if (typeof ResizeObserver !== 'undefined') {
              // @ts-ignore
              var resizeObserver_1 = new ResizeObserver(function (entries) {
                  var _a = entries[0].contentRect, width = _a.width, height = _a.height;
                  handleResize(width, height);
              });
              resizeObserver_1.observe(element);
              var destroy_1 = function (component) {
                  if (component === me) {
                      resizeObserver_1.disconnect();
                      Yox.lifeCycle.off(RAW_EVENT_BEFORE_DESTROY, destroy_1);
                  }
              };
              Yox.lifeCycle.on(RAW_EVENT_BEFORE_DESTROY, destroy_1);
          }
      }
  });

  var template$9 = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-menu'+(_p(_K,'mode',_O.mode).value?' bell-menu-'+_v(_p(_K,'mode',_O.mode).value):'')+(!_p(_K,'inner',_O.inner).value&&_p(_K,'theme',_O.theme).value?' bell-menu-'+_v(_p(_K,'theme',_O.theme).value):'')+(_p(_K,'collapsed',_O.collapsed).value?' bell-menu-collapsed':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Menu = Yox.define({
      template: template$9,
      name: 'bell-Menu',
      propTypes: {
          mode: {
              type: oneOf([RAW_HORIZONTAL, RAW_VERTICAL, RAW_INLINE]),
              value: RAW_HORIZONTAL,
          },
          theme: {
              type: oneOf(RAW_THEME_ARRAY),
              value: RAW_LIGHT,
          },
          collapsed: {
              type: RAW_BOOLEAN,
          },
          activeName: {
              type: RAW_STRING,
          },
          openNames: {
              type: RAW_ARRAY,
              value: function () {
                  return [];
              }
          },
          inner: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      watchers: {
          activeName: function (activeName) {
              this.fire({
                  type: 'activeName',
                  ns: 'menu',
              }, { activeName: activeName }, TRUE);
          },
          openNames: function (openNames) {
              this.fire({
                  type: 'openNames',
                  ns: 'menu',
              }, { openNames: openNames }, TRUE);
          },
          collapsed: function (collapsed) {
              this.fire({
                  type: 'change',
                  ns: 'menu',
              }, { collapsed: collapsed }, TRUE);
          },
          theme: function (theme) {
              this.fire({
                  type: 'change',
                  ns: 'menu',
              }, { theme: theme }, TRUE);
          },
          mode: function (mode) {
              this.fire({
                  type: 'change',
                  ns: 'menu',
              }, { mode: mode }, TRUE);
          },
      },
      events: {
          click: {
              listener: function (event, data) {
                  if (event.phase === Yox.Event.PHASE_UPWARD
                      && !this.get('inner')) {
                      this.fire({
                          type: 'change',
                          ns: 'menu',
                      }, {
                          activeName: data.name
                      });
                  }
              },
              ns: 'menuItem',
          },
          isOpen: {
              listener: function (event, data) {
                  if (event.phase === Yox.Event.PHASE_UPWARD
                      && !this.get('inner')) {
                      var isOpen = data.isOpen, name = data.name;
                      var openNames = this.get('openNames');
                      if (openNames) {
                          openNames = this.copy(openNames);
                      }
                      else {
                          openNames = [];
                      }
                      if (isOpen) {
                          openNames.push(name);
                      }
                      else {
                          Yox.array.remove(openNames, name);
                      }
                      this.fire({
                          type: 'change',
                          ns: 'menu',
                      }, {
                          openNames: openNames,
                      });
                  }
              },
              ns: 'subMenu',
          }
      }
  });

  var template$a = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;!_p(_K,'disabled',_O.disabled).value?_l(_M,'events','click',_e('click','click()','click','','click')):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-menu-item'+(_p(_K,'isActive',_O.isActive).value?' bell-menu-item-active':'')+(_p(_K,'disabled',_O.disabled).value?' bell-menu-item-disabled':' bell-menu-item-enabled')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var MenuItem = Yox.define({
      template: template$a,
      name: 'bell-MenuItem',
      propTypes: {
          name: {
              type: RAW_STRING,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var menu = findComponentUpward(options.parent, 'bell-Menu');
          return {
              isActive: menu.get('activeName') === this.get('name'),
          };
      },
      events: {
          activeName: {
              listener: function (_, data) {
                  this.set('isActive', data.activeName === this.get('name'));
              },
              ns: 'menu',
          },
      },
      methods: {
          click: function () {
              this.fire({
                  type: 'click',
                  ns: 'menuItem',
              }, {
                  name: this.get('name')
              });
          }
      }
  });

  var template$b = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-menu-group-title'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3});_p(_K,'$slot_children',_O.$slot_children).value?_N.push({context:_D,operator:_z,props:{inner:$3,mode:_p(_K,'mode',_O.mode).value===_p(_K,'RAW_INLINE',_O.RAW_INLINE).value?_p(_K,'RAW_INLINE',_O.RAW_INLINE).value:_p(_K,'RAW_VERTICAL',_O.RAW_VERTICAL).value},slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_children',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'Menu',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-menu-group'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var MenuGroup = Yox.define({
      template: template$b,
      name: 'bell-MenuGroup',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var menu = findComponentUpward(options.parent, 'bell-Menu');
          return {
              RAW_INLINE: RAW_INLINE,
              RAW_VERTICAL: RAW_VERTICAL,
              mode: menu.get('mode'),
          };
      },
  });

  var template$c = (function(){var $0,$1=void 0,$3=!0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){($0={children:function(){var _N=[];($0=function(_M){!_p(_K,'disabled',_O.disabled).value?_p(_K,'trigger',_O.trigger).value===_p(_K,'RAW_CLICK',_O.RAW_CLICK).value?_l(_M,'events','click',_e('click','toggleVisible()','click','','toggleVisible')):_p(_K,'trigger',_O.trigger).value===_p(_K,'RAW_HOVER',_O.RAW_HOVER).value?(_l(_M,'events','mouseenter',_e('mouseenter','enter()','mouseenter','','enter')),_l(_M,'events','mouseleave',_e('mouseleave','leave()','mouseleave','','leave'))):$1:$1;return _M}({children:_k('$slot_children'),context:_D,operator:_C,ref:'trigger',tag:'slot',type:7}),$0.children&&$0.children.length&&_N.push($0));_p(_K,'visible',_O.visible).value?($0={children:function(){var _N=[];($0=function(_M){!_p(_K,'disabled',_O.disabled).value?_p(_K,'trigger',_O.trigger).value===_p(_K,'RAW_HOVER',_O.RAW_HOVER).value?(_l(_M,'events','mouseenter',_e('mouseenter','enter()','mouseenter','','enter')),_l(_M,'events','mouseleave',_e('mouseleave','leave()','mouseleave','','leave'))):$1:$1;return _M}({children:_k('$slot_overlay'),context:_D,events:{click:_e('click','onOverlayClick()','click','','onOverlayClick')},operator:_C,ref:'overlay',tag:'slot',transition:_c('overlay',_I&&_I.overlay||_J.overlay),type:7}),$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,operator:_B,tag:'portal',type:6},$0.children&&$0.children.length&&_N.push($0)):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,operator:_A,tag:'fragment',type:5},$0.children&&$0.children.length&&_N.push($0));}})();

  var emitter = new Yox();
  /**
   * 有些组件会调用 `event.stop()` 阻止事件冒泡
   *
   * 但是，有些地方需要监听全局点击事件，这些组件的点击事件不能被忽略
   *
   * 因此，我们加一个全局方法，让组件再调用 `event.stop()` 之后再调用 `fireClickEvent()`
   *
   * @param event
   */
  function fireClickEvent(event, isFromPopover) {
      // event 一般会被调用 `event.stop()`
      // 如果直接 fire 原事件，相当于 fire 了一个 stoped 事件，这是不对的
      emitter.fire(new Yox.Event('click', event ? event.originalEvent : UNDEFINED), { isFromPopover: isFromPopover });
  }
  function onClickEvent(listener) {
      emitter.on('click', listener);
  }
  function offClickEvent(listener) {
      emitter.off('click', listener);
  }
  var endDragTime = 0;
  function startDrag() {
      endDragTime = 0;
  }
  function endDrag() {
      endDragTime = Date.now();
  }
  function isClickEvent() {
      // 拖拽结束时，mouseup 之后会紧接着触发 click，此时要判断间隔，如果大于 200ms 才算是 click
      if (endDragTime > 0) {
          return Date.now() - endDragTime > 200;
      }
      return TRUE;
  }
  function onClickEventByEnterPress(instance, handler) {
      var onKeydown = function (event) {
          var originalEvent = event.originalEvent;
          if (originalEvent.keyCode === 13) {
              if (handler) {
                  handler();
              }
              else if (instance.get('isFocus')) {
                  instance.onClick();
              }
          }
      };
      Yox.dom.on(DOCUMENT, RAW_EVENT_KEYDOWN, onKeydown);
      var onDestroy = function (component) {
          if (component === instance) {
              Yox.dom.off(DOCUMENT, RAW_EVENT_KEYDOWN, onKeydown);
              Yox.lifeCycle.off(RAW_EVENT_BEFORE_DESTROY, onDestroy);
          }
      };
      Yox.lifeCycle.on(RAW_EVENT_BEFORE_DESTROY, onDestroy);
  }

  var CLASS_POPOVER = 'bell-popover';
  var CLASS_POPOVER_TRANSITION = 'bell-popover-transition';
  var CLASS_POPOVER_FADE = 'bell-popover-fade';
  var Popover = Yox.define({
      template: template$c,
      name: 'bell-Popover',
      propTypes: {
          placement: {
              type: oneOf(RAW_PLACEMENT_ARRAY),
              value: RAW_BOTTOM,
          },
          trigger: {
              type: oneOf([RAW_HOVER, RAW_CLICK, RAW_CUSTOM]),
              value: RAW_HOVER,
          },
          triggerMutable: {
              type: RAW_BOOLEAN,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          visible: {
              type: RAW_BOOLEAN,
          },
          widthAlign: {
              type: RAW_BOOLEAN,
          },
          showArrow: {
              type: RAW_BOOLEAN,
          },
          showDelay: {
              type: RAW_NUMERIC,
              value: HOVER_DELAY,
          },
          hideDelay: {
              type: RAW_NUMERIC,
              value: 300,
          },
          offsetX: {
              type: RAW_NUMERIC,
          },
          offsetY: {
              type: RAW_NUMERIC,
          },
          gap: {
              type: RAW_NUMERIC,
          },
      },
      data: function () {
          return {
              isHover: FALSE,
              RAW_HOVER: RAW_HOVER,
              RAW_CLICK: RAW_CLICK,
              RAW_CUSTOM: RAW_CUSTOM,
          };
      },
      watchers: {
          disabled: function (value) {
              if (value && this.get('visible')) {
                  this.fireClose();
              }
          }
      },
      methods: {
          onOverlayClick: function (event) {
              event.stop();
              fireClickEvent(event, TRUE);
          },
          enter: function () {
              var me = this;
              me.set('isHover', TRUE);
              if (me.leaveTimer) {
                  clearTimeout(me.leaveTimer);
                  me.leaveTimer = UNDEFINED;
                  return;
              }
              var showDelay = toNumber(me.get('showDelay'));
              if (showDelay > 0) {
                  me.enterTimer = setTimeout(function () {
                      me.enterTimer = UNDEFINED;
                      if (me.get('isHover')) {
                          me.fireOpen();
                      }
                  }, showDelay);
              }
              else {
                  me.fireOpen();
              }
          },
          leave: function () {
              var me = this;
              me.set('isHover', FALSE);
              var hideDelay = toNumber(me.get('hideDelay'));
              if (hideDelay > 0) {
                  me.leaveTimer = setTimeout(function () {
                      me.leaveTimer = UNDEFINED;
                      me.fireClose();
                  }, hideDelay);
              }
              else {
                  me.fireClose();
              }
          },
          fireOpen: function () {
              var me = this;
              if (me.enterTimer) {
                  clearTimeout(me.enterTimer);
                  me.enterTimer = UNDEFINED;
              }
              me.fire({
                  type: 'open',
                  ns: 'popover',
              });
          },
          fireClose: function () {
              var me = this;
              if (me.leaveTimer) {
                  clearTimeout(me.leaveTimer);
                  me.leaveTimer = UNDEFINED;
              }
              me.fire({
                  type: 'close',
                  ns: 'popover',
              });
          },
          toggleVisible: function () {
              if (this.get('visible')) {
                  this.fireClose();
              }
              else {
                  this.fireOpen();
              }
          },
          getOverlayRect: function () {
              var me = this;
              var widthAlign = me.get('widthAlign');
              var placement = me.get('placement') || RAW_BOTTOM;
              var offsetX = toNumber(me.get('offsetX'), 0);
              var offsetY = toNumber(me.get('offsetY'), 0);
              var gap = toNumber(me.get('gap'), 0);
              var triggerElement = me.$refs.trigger;
              var triggerRect = triggerElement.getBoundingClientRect();
              var triggerLeft = getPageX() + triggerRect.left;
              var triggerTop = getPageY() + triggerRect.top;
              var x = 0, y = 0, isVertical = FALSE;
              if (placement === RAW_TOP
                  || placement === RAW_TOP_START
                  || placement === RAW_TOP_END) {
                  y = triggerTop - gap;
                  isVertical = TRUE;
              }
              else if (placement === RAW_BOTTOM
                  || placement === RAW_BOTTOM_START
                  || placement === RAW_BOTTOM_END) {
                  y = triggerTop + triggerRect.height + gap;
                  isVertical = TRUE;
              }
              else if (placement === RAW_LEFT
                  || placement === RAW_LEFT_START
                  || placement === RAW_LEFT_END) {
                  x = triggerLeft - gap;
              }
              else if (placement === RAW_RIGHT
                  || placement === RAW_RIGHT_START
                  || placement === RAW_RIGHT_END) {
                  x = triggerLeft + triggerRect.width + gap;
              }
              if (placement === RAW_TOP
                  || placement === RAW_BOTTOM) {
                  x = triggerLeft + 0.5 * triggerRect.width;
              }
              else if (placement === RAW_TOP_START
                  || placement === RAW_BOTTOM_START) {
                  x = triggerLeft;
              }
              else if (placement === RAW_TOP_END
                  || placement === RAW_BOTTOM_END) {
                  x = triggerLeft + triggerRect.width;
              }
              else if (placement === RAW_LEFT
                  || placement === RAW_RIGHT) {
                  y = triggerTop + 0.5 * triggerRect.height;
              }
              else if (placement === RAW_LEFT_START
                  || placement === RAW_RIGHT_START) {
                  y = triggerTop;
              }
              else if (placement === RAW_LEFT_END
                  || placement === RAW_RIGHT_END) {
                  y = triggerTop + triggerRect.height;
              }
              return {
                  x: x + offsetX,
                  y: y + offsetY,
                  width: isVertical && widthAlign ? triggerRect.width : UNDEFINED,
              };
          },
          refreshOverlayRect: function () {
              var overlayElement = this.$refs.overlay;
              if (!overlayElement) {
                  return;
              }
              var overlayRect = this.getOverlayRect();
              this.setOverlayRect(overlayElement, overlayRect.x, overlayRect.y, overlayRect.width);
          },
          setOverlayRect: function (el, x, y, width) {
              var target = el.style;
              target.left = x != NULL ? toPixel(x) : '';
              target.top = y != NULL ? toPixel(y) : '';
              target.width = width != NULL ? toPixel(width) : '';
          },
      },
      transitions: {
          overlay: {
              enter: function (node) {
                  var me = this;
                  var triggerElement = me.$refs.trigger;
                  var placement = me.get('placement') || RAW_BOTTOM;
                  readElementRectInfo(triggerElement, function () {
                      if (!me.$el || !me.get('visible')) {
                          return;
                      }
                      Yox.dom.addClass(node, CLASS_POPOVER);
                      Yox.dom.addClass(node, 'bell-popover-' + placement);
                      if (me.get('showArrow')) {
                          Yox.dom.addClass(node, 'bell-popover-with-arrow');
                      }
                      var overlayRect = me.getOverlayRect();
                      me.setOverlayRect(node, overlayRect.x, overlayRect.y, overlayRect.width);
                      me.animateTimer = setTimeout(function () {
                          Yox.dom.addClass(node, CLASS_POPOVER_TRANSITION);
                          me.animateTimer = setTimeout(function () {
                              Yox.dom.addClass(node, CLASS_POPOVER_FADE);
                          }, 20);
                      }, 30);
                  });
              },
              leave: function (node, done) {
                  var me = this;
                  Yox.dom.removeClass(node, CLASS_POPOVER_FADE);
                  onTransitionEnd(node, function () {
                      me.setOverlayRect(node, UNDEFINED, UNDEFINED, UNDEFINED);
                      Yox.dom.removeClass(node, CLASS_POPOVER_TRANSITION);
                      Yox.dom.removeClass(node, CLASS_POPOVER);
                      done();
                  });
              }
          }
      },
      afterMount: function () {
          var me = this;
          var onWindowResize = function () {
              me.refreshOverlayRect();
          };
          var onNativeClick = function (event) {
              if (!me.get('visible') || !isClickEvent()) {
                  return;
              }
              var trigger = me.$refs.trigger;
              var overlay = me.$refs.overlay;
              var target = event.originalEvent && event.originalEvent.target;
              if (target && (contains(trigger, target) || contains(overlay, target))) {
                  return;
              }
              if (me.get('trigger') === RAW_CUSTOM) {
                  me.fire({
                      type: 'outside',
                      ns: 'popover',
                  });
              }
              else {
                  me.fireClose();
              }
          };
          var onGlobalClick = function (event, data) {
              if (!data.isFromPopover) {
                  onNativeClick(event);
              }
          };
          Yox.dom.on(WINDOW, RAW_RESIZE, onWindowResize);
          Yox.dom.on(DOCUMENT, RAW_CLICK, onNativeClick);
          onClickEvent(onGlobalClick);
          me.watch(RAW_SLOT_CHILDREN, function () {
              if (me.get('visible') && me.get('triggerMutable')) {
                  me.nextTick(function () {
                      me.refreshOverlayRect();
                  });
              }
          });
          var destroy = function (component) {
              if (component === me) {
                  if (me.enterTimer) {
                      clearTimeout(me.enterTimer);
                  }
                  if (me.leaveTimer) {
                      clearTimeout(me.leaveTimer);
                  }
                  if (me.animateTimer) {
                      clearTimeout(me.animateTimer);
                  }
                  offClickEvent(onGlobalClick);
                  Yox.dom.off(WINDOW, RAW_RESIZE, onWindowResize);
                  Yox.dom.off(DOCUMENT, RAW_CLICK, onNativeClick);
                  Yox.lifeCycle.off(RAW_EVENT_BEFORE_DESTROY, destroy);
              }
          };
          Yox.lifeCycle.on(RAW_EVENT_BEFORE_DESTROY, destroy);
      }
  });

  var template$d = (function(){var $0,$1=void 0,$3=!0,$5='isOpen';return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_p(_K,'mode',_O.mode).value===_p(_K,'RAW_INLINE',_O.RAW_INLINE).value?_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push(function(_M){!_p(_K,'collapsed',_O.collapsed).value?(_l(_M,'lazy','click',300),_l(_M,'events','click',_e('click',"toggle('isOpen')",'click','','toggle',{execute:function(_R,_S){return [$5]}}))):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_title'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));!_p(_K,'collapsed',_O.collapsed).value?_N.push({context:_D,operator:_z,props:{className:'bell-sub-menu-arrow-icon',name:'arrow-down-s-line'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-sub-menu-title'},operator:_y,tag:'div',type:3}));_N.push({context:_D,operator:_z,props:{inner:$3,mode:_p(_K,'mode',_O.mode).value},ref:'menu',slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_children',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'Menu',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-sub-menu'+(_p(_K,'isOpen',_O.isOpen).value?' bell-menu-open':'')+(_p(_K,'isActive',_O.isActive).value?' bell-menu-active':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3})):_N.push({context:_D,operator:_z,props:{gap:'5',placement:_p(_K,'mode',_O.mode).value===_p(_K,'RAW_HORIZONTAL',_O.RAW_HORIZONTAL).value?_p(_K,'RAW_BOTTOM',_O.RAW_BOTTOM).value:_p(_K,'RAW_RIGHT_START',_O.RAW_RIGHT_START).value,trigger:_p(_K,'RAW_CUSTOM',_O.RAW_CUSTOM).value,visible:_p(_K,'isOpen',_O.isOpen).value},slots:{$slot_children:function(_L){var _N=[];_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push(function(_M){!_p(_K,'collapsed',_O.collapsed).value?(_l(_M,'lazy','click',300),_l(_M,'events','click',_e('click',"toggle('isOpen')",'click','','toggle',{execute:function(_R,_S){return [$5]}}))):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_title',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));!_p(_K,'collapsed',_O.collapsed).value?_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-sub-menu-arrow-icon',name:'arrow-down-s-line'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-sub-menu-title'},operator:_y,tag:'div',type:3}));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-sub-menu'+(_p(_K,'isActive',_O.isActive).value?' bell-menu-active':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));return _N.length?_N:$1},$slot_overlay:function(_L){var _N=[];_N.push({children:function(){var _N=[];($0={children:_k('$slot_children',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-menu-overlay'+(_p(_K,'theme',_O.theme).value?' bell-menu-'+_v(_p(_K,'theme',_O.theme).value):'')},operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'Popover',type:4});}})();

  var SubMenu = Yox.define({
      template: template$d,
      name: 'bell-SubMenu',
      propTypes: {
          name: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var menu = findComponentUpward(options.parent, 'bell-Menu');
          var name = this.get('name');
          var openNames = menu.get('openNames');
          return {
              RAW_CUSTOM: RAW_CUSTOM,
              RAW_INLINE: RAW_INLINE,
              RAW_HORIZONTAL: RAW_HORIZONTAL,
              RAW_BOTTOM: RAW_BOTTOM,
              RAW_RIGHT_START: RAW_RIGHT_START,
              isOpen: openNames && Yox.array.has(openNames, name),
              isActive: menu.get('activeName') === name,
              mode: menu.get('mode'),
              theme: menu.get('theme'),
              collapsed: menu.get('collapsed'),
          };
      },
      watchers: {
          isOpen: function (isOpen) {
              var name = this.get('name');
              if (name) {
                  this.fire({
                      type: 'isOpen',
                      ns: 'subMenu',
                  }, {
                      isOpen: isOpen,
                      name: name,
                  });
              }
          }
      },
      events: {
          activeName: {
              listener: function (_, data) {
                  this.set('isActive', data.activeName === this.get('name'));
              },
              ns: 'menu',
          },
          openNames: {
              listener: function (_, data) {
                  this.set('isOpen', data.openNames && Yox.array.has(data.openNames, this.get('name')));
              },
              ns: 'menu',
          },
          change: {
              listener: function (_, data) {
                  this.set(data);
              },
              ns: 'menu',
          },
          click: {
              listener: function () {
                  if (this.get('mode') !== RAW_INLINE) {
                      this.set('isOpen', FALSE);
                  }
              },
              ns: 'menuItem',
          },
          outside: {
              listener: function (event) {
                  event.stop();
                  this.set('isOpen', FALSE);
              },
              ns: 'popover',
          }
      },
      components: {
          Icon: Icon,
          Popover: Popover,
      }
  });

  var template$e = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-text'+(_p(_K,'type',_O.type).value?' bell-text-'+_v(_p(_K,'type',_O.type).value):'')+(_p(_K,'size',_O.size).value?' bell-text-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'bold',_O.bold).value?' bell-text-bold':'')+(_p(_K,'block',_O.block).value?' bell-text-block':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'span',type:3}));}})();

  var Text = Yox.define({
      template: template$e,
      name: 'bell-Text',
      propTypes: {
          type: {
              type: oneOf([
                  RAW_TYPE_PRIMARY,
                  RAW_TYPE_INFO,
                  RAW_TYPE_SUCCESS,
                  RAW_TYPE_WARNING,
                  RAW_TYPE_ERROR,
                  RAW_TYPE_TITLE,
                  RAW_TYPE_CONTENT,
                  RAW_TYPE_MUTED ]),
          },
          size: {
              type: oneOf([RAW_SMALL]),
          },
          bold: {
              type: RAW_BOOLEAN,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      }
  });

  var template$f = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-drawer-title'},$6={'class':'bell-drawer-title-wrapper'},$7={'class':'bell-drawer-extra'},$8={'class':'bell-drawer-header'},$9={'class':'bell-drawer-body'},$10={'class':'bell-drawer-wrapper'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_p(_K,'visible',_O.visible).value?($0={children:function(){var _N=[];_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'showMask',_O.showMask).value?_N.push(function(_M){_p(_K,'maskClosable',_O.maskClosable).value?_l(_M,'events','click',_e('click','close()','click','','close')):$1;return _M}({context:_D,nativeAttrs:{'class':'bell-drawer-mask'},operator:_y,tag:'div',type:3})):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({children:function(){var _N=[];(_p(_K,'$slot_title',_O.$slot_title).value||_p(_K,'$slot_extra',_O.$slot_extra).value)||_p(_K,'closable',_O.closable).value?_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_p(_K,'closable',_O.closable).value?_N.push({context:_D,events:{'click.native':_e('click.native','close()','click','native','close',$1,$1,$3)},operator:_z,props:{className:'bell-drawer-close',name:'close-line'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({children:function(){var _N=[];($0={children:_k('$slot_title'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3});_p(_K,'$slot_extra',_O.$slot_extra).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({children:function(){var _N=[];($0={children:_k('$slot_content'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$9,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$10,nativeStyles:_b(_p(_K,'wrapperStyle',_O.wrapperStyle).value),operator:_y,ref:'wrapper',tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-drawer'+(_p(_K,'placement',_O.placement).value?' bell-drawer-'+_v(_p(_K,'placement',_O.placement).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',transition:_c('drawer',_I&&_I.drawer||_J.drawer),type:3}));return _N.length?_N:$1}(),context:_D,operator:_B,tag:'portal',type:6},$0.children&&$0.children.length&&_N.push($0)):_N.push({isPure:$3,operator:_x,text:'',type:2});}})();

  var CLASS_VISIBLE = 'bell-drawer-visible';
  var CLASS_FADE = 'bell-drawer-fade';
  var Drawer = Yox.define({
      template: template$f,
      model: 'visible',
      name: 'bell-Drawer',
      propTypes: {
          width: {
              type: RAW_STRING,
              value: 378,
          },
          height: {
              type: RAW_STRING,
              value: 378,
          },
          placement: {
              type: oneOf([RAW_LEFT, RAW_RIGHT, RAW_TOP, RAW_BOTTOM]),
              value: RAW_LEFT,
          },
          closable: {
              type: RAW_BOOLEAN,
              value: TRUE,
          },
          showMask: {
              type: RAW_BOOLEAN,
              value: TRUE,
          },
          maskClosable: {
              type: RAW_BOOLEAN,
              value: TRUE,
          },
          visible: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          wrapperStyle: function () {
              var placement = this.get('placement');
              if (placement === RAW_LEFT
                  || placement === RAW_RIGHT) {
                  var width = toNumber(this.get('width'));
                  return {
                      width: toPixel(width)
                  };
              }
              var height = toNumber(this.get('height'));
              return {
                  height: toPixel(height)
              };
          }
      },
      watchers: {
          visible: function (visible) {
              var bodyStyle = BODY.style;
              if (visible) {
                  this.set('bodyOverflow', bodyStyle.overflow);
                  bodyStyle.overflow = 'hidden';
              }
              else {
                  bodyStyle.overflow = this.get('bodyOverflow');
              }
          }
      },
      methods: {
          open: function () {
              this.set('visible', TRUE);
          },
          close: function () {
              this.set('visible', FALSE);
          }
      },
      transitions: {
          drawer: {
              enter: function (node) {
                  var me = this;
                  var drawer = node;
                  var wrapper = me.$refs.wrapper;
                  me.wrapperElement = wrapper;
                  // 设置为 display block
                  Yox.dom.addClass(drawer, CLASS_VISIBLE);
                  me.fire({
                      type: 'open',
                      ns: 'drawer',
                  });
                  setTimeout(function () {
                      if (!me.get('visible')) {
                          return;
                      }
                      Yox.dom.addClass(drawer, CLASS_FADE);
                      onTransitionEnd(wrapper, function () {
                          if (!me.get('visible')) {
                              return;
                          }
                          me.fire({
                              type: 'opened',
                              ns: 'drawer',
                          });
                      });
                  }, 50);
              },
              leave: function (node, done) {
                  var me = this;
                  var drawer = node;
                  var wrapper = me.wrapperElement;
                  me.wrapperElement = UNDEFINED;
                  Yox.dom.removeClass(drawer, CLASS_FADE);
                  me.fire({
                      type: 'close',
                      ns: 'drawer',
                  });
                  onTransitionEnd(wrapper, function () {
                      if (me.get('visible')) {
                          return;
                      }
                      Yox.dom.removeClass(drawer, CLASS_VISIBLE);
                      me.fire({
                          type: 'closed',
                          ns: 'drawer',
                      });
                      done();
                  });
              }
          },
      },
      components: {
          Icon: Icon,
      }
  });

  var template$g = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-guide-title'},$6={'class':'bell-guide-extra'},$7={'class':'bell-guide-header'},$8={'class':'bell-guide-body'},$9={'class':'bell-guide-footer'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];($0={children:_k('$slot_title')||function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'title',_O.title).value),type:1});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_p(_K,'$slot_extra',_O.$slot_extra).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3});_p(_K,'$slot_children',_O.$slot_children).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'$slot_footer',_O.$slot_footer).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_footer'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$9,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-guide'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Guide = Yox.define({
      template: template$g,
      name: 'bell-Guide',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$h = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-breadcrumb'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Breadcrumb = Yox.define({
      template: template$h,
      name: 'bell-Breadcrumb',
      propTypes: {
          separator: {
              type: RAW_STRING,
              value: '/',
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$i = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-breadcrumb-separator'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push(function(_M){_p(_K,'last',_O.last).value?_l(_M,'nativeAttrs','class','bell-breadcrumb-text'):(_l(_M,'nativeAttrs','class','bell-breadcrumb-link'),_l(_M,'events','click',_f('click','click.breadcrumbItem','click','','click','breadcrumbItem')));return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,operator:_y,tag:'span',type:3}));!_p(_K,'last',_O.last).value?_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'span',text:_v(_p(_K,'separator',_O.separator).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-breadcrumb-item'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'span',type:3}));}})();

  var BreadcrumbItem = Yox.define({
      template: template$i,
      name: 'bell-BreadcrumbItem',
      propTypes: {
          last: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var breadcrumb = findComponentUpward(options.parent, 'bell-Breadcrumb');
          return {
              separator: breadcrumb.get('separator')
          };
      }
  });

  var template$j = (function(){var $0,$1=void 0,$3=!0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'disabled',_O.disabled).value?_l(_M,'nativeAttrs','disabled','true'):!_p(_K,'loading',_O.loading).value?_l(_M,'events','click',_e('click','onClick()','click','','onClick')):$1;_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_prefix')||function(){var _N=[];_p(_K,'loading',_O.loading).value?_N.push({context:_D,operator:_z,props:{className:'bell-button-loading-icon',name:'loader-5-line',spin:$3},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));_p(_K,'$slot_children',_O.$slot_children).value?(_p(_K,'loading',_O.loading).value||_p(_K,'$slot_prefix',_O.$slot_prefix).value)||_p(_K,'$slot_suffix',_O.$slot_suffix).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,operator:_y,tag:'span',type:3}):($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0)):_N.push({isPure:$3,operator:_x,text:'',type:2});($0={children:_k('$slot_suffix'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-button'+(_p(_K,'type',_O.type).value?' bell-button-'+_v(_p(_K,'type',_O.type).value):'')+(_p(_K,'size',_O.size).value?' bell-button-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'shape',_O.shape).value?' bell-button-'+_v(_p(_K,'shape',_O.shape).value):'')+(_p(_K,'ghost',_O.ghost).value?' bell-button-ghost':'')+(_p(_K,'loading',_O.loading).value?' bell-button-loading':'')+(_p(_K,'disabled',_O.disabled).value?' bell-button-disabled':' bell-button-enabled')+(_p(_K,'block',_O.block).value?' bell-button-block':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'button',type:3}));}})();

  var Button = Yox.define({
      template: template$j,
      name: 'bell-Button',
      propTypes: {
          type: {
              type: oneOf([
                  RAW_TYPE_PRIMARY,
                  RAW_TYPE_INFO,
                  RAW_TYPE_SUCCESS,
                  RAW_TYPE_WARNING,
                  RAW_TYPE_ERROR,
                  RAW_TYPE_DASHED,
                  RAW_TYPE_LINK,
                  RAW_TYPE_TEXT,
                  RAW_TYPE_PURE ]),
              value: RAW_TYPE_PURE,
          },
          size: {
              type: oneOf([RAW_DEFAULT, RAW_LARGE, RAW_SMALL]),
              value: RAW_DEFAULT,
          },
          shape: {
              type: oneOf([RAW_SHAPE_ROUND, RAW_SHAPE_CIRCLE]),
          },
          ghost: {
              type: RAW_BOOLEAN,
          },
          autoFocus: {
              type: RAW_BOOLEAN,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          loading: {
              type: RAW_BOOLEAN,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      methods: {
          onClick: function () {
              this.fire({
                  type: 'click',
                  ns: 'button',
              });
          }
      },
      components: {
          Icon: Icon,
      },
      beforeCreate: function (options) {
          var props = options.props || (options.props = {});
          var buttonGroup = findComponentUpward(options.parent, 'bell-ButtonGroup');
          if (buttonGroup) {
              // 有 group，则 size、shape 全听 group 的
              if (props.size !== UNDEFINED) {
                  delete props.size;
              }
              if (props.shape !== UNDEFINED) {
                  delete props.shape;
              }
              if (props.disabled === UNDEFINED) {
                  props.disabled = buttonGroup.get('disabled');
              }
          }
          else {
              // 没有 group，则要给 type 和 size 默认值
              if (props.size === UNDEFINED) {
                  props.size = RAW_DEFAULT;
              }
          }
      },
      afterMount: function () {
          if (this.get('autoFocus')) {
              this.$el.focus();
          }
      }
  });

  var template$k = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-button-group'+(_p(_K,'shape',_O.shape).value?' bell-button-group-'+_v(_p(_K,'shape',_O.shape).value):'')+(_p(_K,'size',_O.size).value?' bell-button-group-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'vertical',_O.vertical).value?' bell-button-group-vertical':' bell-button-group-horizontal')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var ButtonGroup = Yox.define({
      template: template$k,
      name: 'bell-ButtonGroup',
      propTypes: {
          size: {
              type: oneOf([RAW_DEFAULT, RAW_LARGE, RAW_SMALL]),
              value: RAW_DEFAULT,
          },
          shape: {
              type: oneOf([RAW_SHAPE_ROUND, RAW_SHAPE_CIRCLE]),
          },
          vertical: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$l = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-input-prepend'},$6={'class':'bell-input-prefix bell-input-prefix-icon-wrapper'},$7={'class':'bell-input-suffix bell-input-suffix-text-wrapper'},$8={'class':'bell-input-suffix bell-input-suffix-icon-wrapper'},$9={'class':'bell-input-suffix bell-input-suffix-icon-wrapper bell-input-secure'},$10='isSecure',$11={'class':'bell-input-suffix bell-input-suffix-icon-wrapper bell-input-clear'},$12={'class':'bell-input-append'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_p(_K,'$slot_prepend',_O.$slot_prepend).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_prepend'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({children:function(){var _N=[];_p(_K,'prefix',_O.prefix).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-input-content-icon',name:_p(_K,'prefix',_O.prefix).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push(function(_M){_p(_K,'maxLength',_O.maxLength).value?_l(_M,'nativeAttrs','maxlength',_m('maxlength',_p(_K,'maxLength',_O.maxLength).value)):$1;_p(_K,'placeholder',_O.placeholder).value?_l(_M,'nativeAttrs','placeholder',_p(_K,'placeholder',_O.placeholder).value):$1;_p(_K,'autoFocus',_O.autoFocus).value?_l(_M,'nativeAttrs','autofocus','true'):$1;_p(_K,'readOnly',_O.readOnly).value?_l(_M,'nativeAttrs','readonly','true'):$1;_p(_K,'spellCheck',_O.spellCheck).value?_l(_M,'nativeAttrs','spellcheck'):$1;_p(_K,'disabled',_O.disabled).value?_l(_M,'nativeAttrs','disabled','true'):(_l(_M,'events','focus',_e('focus','handleFocus()','focus','','handleFocus')),_l(_M,'events','blur',_e('blur','handleBlur()','blur','','handleBlur')),_l(_M,'events','input',_f('input','input.input','input','','input','input')),_l(_M,'events','compositionstart',_f('compositionstart','compositionstart.input','compositionstart','','compositionstart','input')),_l(_M,'events','compositionend',_f('compositionend','compositionend.input','compositionend','','compositionend','input')));return _M}({context:_D,model:_d(_p(_K,'value',_O.value)),nativeAttrs:{'class':'bell-input-el',type:_p(_K,'currentType',_O.currentType).value},operator:_y,ref:'input',tag:'input',type:3}));_p(_K,'hasCount',_O.hasCount).value?_N.push({children:function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_u(($0=_p(_K,'formatValueLength',_O.formatValueLength,_E&&_E.formatValueLength||_F.formatValueLength).value,$0(_p(_K,'value',_O.value).value))).value)+' / '+_v(_p(_K,'maxLength',_O.maxLength).value),type:1});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_p(_K,'suffix',_O.suffix).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-input-content-icon',name:_p(_K,'suffix',_O.suffix).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3}):_p(_K,'secure',_O.secure).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-input-content-icon',name:_p(_K,'isSecure',_O.isSecure).value?'eye-close-line':'eye-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click',"toggle('isSecure')",'click','','toggle',{execute:function(_R,_S){return [$10]}})},nativeAttrs:$9,operator:_y,tag:'div',type:3}):_p(_K,'showClear',_O.showClear).value&&!_p(_K,'disabled',_O.disabled).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-input-content-icon',name:'close-circle-fill'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','handleClearClick()','click','','handleClearClick')},nativeAttrs:$11,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-input-content'+(_p(_K,'prefix',_O.prefix).value?' bell-input-content-with-prefix':'')+(((_p(_K,'hasCount',_O.hasCount).value||_p(_K,'suffix',_O.suffix).value)||_p(_K,'secure',_O.secure).value)||(_p(_K,'showClear',_O.showClear).value&&!_p(_K,'disabled',_O.disabled).value)?' bell-input-content-with-suffix':'')},operator:_y,tag:'div',type:3});_p(_K,'$slot_append',_O.$slot_append).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_append'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$12,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-input'+(_p(_K,'size',_O.size).value?' bell-input-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'status',_O.status).value?' bell-input-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'align',_O.align).value?' bell-input-align-'+_v(_p(_K,'align',_O.align).value):'')+(_p(_K,'block',_O.block).value?' bell-input-block':'')+(_p(_K,'isFocus',_O.isFocus).value?' bell-input-focused':'')+(_p(_K,'disabled',_O.disabled).value?' bell-input-disabled':' bell-input-enabled')+(!_p(_K,'value',_O.value).value?' bell-input-no-value':' bell-input-has-value')+(_p(_K,'$slot_prepend',_O.$slot_prepend).value?' bell-input-with-prepend':'')+(_p(_K,'$slot_append',_O.$slot_append).value?' bell-input-with-append':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var TEXT_TYPE_PASSWORD = 'password';
  var TEXT_TYPE_TEXT = 'text';
  var Input = Yox.define({
      template: template$l,
      name: 'bell-Input',
      propTypes: {
          value: {
              type: [RAW_STRING, RAW_NUMBER],
          },
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          type: {
              type: oneOf([TEXT_TYPE_TEXT, TEXT_TYPE_PASSWORD]),
              value: TEXT_TYPE_TEXT,
          },
          status: {
              type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
          },
          align: {
              type: oneOf([RAW_LEFT, RAW_CENTER, RAW_RIGHT]),
          },
          placeholder: {
              type: RAW_STRING,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          showClear: {
              type: RAW_BOOLEAN,
          },
          secure: {
              type: RAW_BOOLEAN,
          },
          prefix: {
              type: RAW_STRING,
          },
          suffix: {
              type: RAW_STRING,
          },
          autoFocus: {
              type: RAW_BOOLEAN,
          },
          spellCheck: {
              type: RAW_BOOLEAN,
          },
          readOnly: {
              type: RAW_BOOLEAN,
          },
          showCount: {
              type: RAW_BOOLEAN,
          },
          maxLength: {
              type: RAW_NUMERIC,
          },
          width: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          },
      },
      data: function () {
          return {
              isSecure: TRUE,
              isFocus: FALSE,
              currentType: this.get('type'),
              TEXT_TYPE_TEXT: TEXT_TYPE_TEXT,
              TEXT_TYPE_PASSWORD: TEXT_TYPE_PASSWORD,
          };
      },
      computed: {
          hasCount: function () {
              return this.get('showCount') && this.get('maxLength') > 0;
          },
          inlineStyle: function () {
              var result = [];
              var width = this.get('width');
              if (width) {
                  result.push({
                      width: toPixel(width)
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          }
      },
      filters: {
          formatValueLength: function (value) {
              return value
                  ? value.length
                  : 0;
          }
      },
      watchers: {
          value: function (value) {
              this.fire({
                  type: 'change',
                  ns: 'input',
              }, { value: value });
          },
          isSecure: function (isSecure) {
              this.set({
                  currentType: isSecure
                      ? TEXT_TYPE_PASSWORD
                      : TEXT_TYPE_TEXT
              });
          }
      },
      methods: {
          handleFocus: function () {
              this.set('isFocus', TRUE);
              this.fire({
                  type: 'focus',
                  ns: 'input',
              });
          },
          handleBlur: function () {
              this.set('isFocus', FALSE);
              this.fire({
                  type: 'blur',
                  ns: 'input',
              });
          },
          handleClearClick: function () {
              this.set('value', '');
              this.fire({
                  type: 'clear',
                  ns: 'input',
              });
          },
      },
      components: {
          Icon: Icon,
      },
      afterMount: function () {
          var me = this;
          var onKeydown = function (event) {
              if (!me.get('isFocus')) {
                  return;
              }
              var originalEvent = event.originalEvent;
              me.fire(new Yox.Event('keydown.input', originalEvent));
              switch (originalEvent.keyCode) {
                  case 13:
                      me.fire({
                          type: 'enter',
                          ns: 'input',
                      });
                      break;
                  case 38:
                      // 避免光标跑到最前面
                      event.prevent();
                      me.fire({
                          type: 'up',
                          ns: 'input',
                      });
                      break;
                  case 40:
                      // 避免光标跑到最后面
                      event.prevent();
                      me.fire({
                          type: 'down',
                          ns: 'input',
                      });
                      break;
              }
          };
          var onKeyup = function (event) {
              if (!me.get('isFocus')) {
                  return;
              }
              var originalEvent = event.originalEvent;
              me.fire(new Yox.Event('keyup.input', originalEvent));
          };
          var onKeypress = function (event) {
              if (!me.get('isFocus')) {
                  return;
              }
              var originalEvent = event.originalEvent;
              me.fire(new Yox.Event('keypress.input', originalEvent));
          };
          Yox.dom.on(DOCUMENT, RAW_EVENT_KEYDOWN, onKeydown);
          Yox.dom.on(DOCUMENT, RAW_EVENT_KEYUP, onKeyup);
          Yox.dom.on(DOCUMENT, RAW_EVENT_KEYPRESS, onKeypress);
          var destroy = function (component) {
              if (component === me) {
                  Yox.dom.off(DOCUMENT, RAW_EVENT_KEYDOWN, onKeydown);
                  Yox.dom.off(DOCUMENT, RAW_EVENT_KEYUP, onKeyup);
                  Yox.dom.off(DOCUMENT, RAW_EVENT_KEYPRESS, onKeypress);
                  Yox.lifeCycle.off(RAW_EVENT_BEFORE_DESTROY, destroy);
              }
          };
          Yox.lifeCycle.on(RAW_EVENT_BEFORE_DESTROY, destroy);
      }
  });

  var template$m = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-input-number-actions'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,events:{blur:_e('blur','handleBlur()','blur','','handleBlur',$1,$3),compositionend:_e('compositionend','handleCompositionEnd()','compositionend','','handleCompositionEnd',$1,$3),compositionstart:_e('compositionstart','handleCompositionStart()','compositionstart','','handleCompositionStart',$1,$3),down:_e('down','handleDown()','down','','handleDown',$1,$3),enter:_e('enter','handleEnter()','enter','','handleEnter',$1,$3),focus:_e('focus','handleFocus()','focus','','handleFocus',$1,$3),input:_e('input','handleInput()','input','','handleInput',$1,$3),keydown:_e('keydown','handleKeydown()','keydown','','handleKeydown',$1,$3),keyup:_e('keyup','handleKeyup()','keyup','','handleKeyup',$1,$3),up:_e('up','handleUp()','up','','handleUp',$1,$3)},operator:_z,props:{autoFocus:_p(_K,'autoFocus',_O.autoFocus).value,block:_p(_K,'block',_O.block).value,className:_p(_K,'customClassName',_O.customClassName).value,disabled:_p(_K,'disabled',_O.disabled).value,placeholder:_p(_K,'placeholder',_O.placeholder).value,readOnly:_p(_K,'readOnly',_O.readOnly).value,size:_p(_K,'size',_O.size).value,status:_p(_K,'status',_O.status).value,style:_p(_K,'style',_O.style).value,value:_p(_K,'value',_O.value).value,width:_p(_K,'width',_O.width).value},ref:'input',slots:{$slot_append:function(_L){var _N=[];($0={children:_k('$slot_append',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1},$slot_children:function(_L){var _N=[];_N.push({context:_D,nativeAttrs:{'class':'bell-input-number-el',max:_m('max',_p(_K,'max',_O.max).value),min:_m('min',_p(_K,'min',_O.min).value),step:_m('step',_p(_K,'step',_O.step).value),type:'number',value:_p(_K,'value',_O.value).value},operator:_y,ref:'numberInput',tag:'input',type:3});_p(_K,'showStep',_O.showStep).value?_N.push({children:function(){var _N=[];_N.push(function(_M){_p(_K,'upDisabled',_O.upDisabled).value?_l(_M,'nativeAttrs','class','bell-input-number-up bell-input-number-up-disabled'):(_l(_M,'nativeAttrs','class','bell-input-number-up bell-input-number-up-enabled'),_l(_M,'events','click',_e('click','handleUp()','click','','handleUp')));return _M}({children:function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-input-number-up-icon',name:'arrow-up-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'div',type:3}));_N.push(function(_M){_p(_K,'downDisabled',_O.downDisabled).value?_l(_M,'nativeAttrs','class','bell-input-number-down bell-input-number-down-disabled'):(_l(_M,'nativeAttrs','class','bell-input-number-down bell-input-number-down-enabled'),_l(_M,'events','click',_e('click','handleDown()','click','','handleDown')));return _M}({children:function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-input-number-down-icon',name:'arrow-down-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'div',type:3}));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1},$slot_prepend:function(_L){var _N=[];($0={children:_k('$slot_prepend',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'Input',type:4});}})();

  // 数字键 48-57
  // 大键盘 .(190) -(189)
  // 小键盘 .(110) -(109)
  // 删除键 8
  // shift 16
  // ctrl 17
  // alt 18
  // tab 9
  // capslock 20
  // cmd 91、93
  // 方向键 37-40
  // 小键盘数字键 96-105
  function isHelper(keyCode) {
      return keyCode >= 37 && keyCode <= 40
          || keyCode >= 16 && keyCode <= 18
          || keyCode === 8
          || keyCode === 9
          || keyCode === 20
          || keyCode === 91
          || keyCode === 93;
  }
  function isDot(keyCode) {
      return keyCode === 110 || keyCode === 190;
  }
  function isMinus(keyCode) {
      return keyCode === 109 || keyCode === 189;
  }
  function isNumber(keyCode) {
      return (keyCode >= 48 && keyCode <= 57)
          || (keyCode >= 96 && keyCode <= 105);
  }

  var InputNumber = Yox.define({
      template: template$m,
      name: 'bell-InputNumber',
      propTypes: {
          status: {
              type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
          },
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          max: {
              type: RAW_NUMERIC,
          },
          min: {
              type: RAW_NUMERIC,
          },
          value: {
              type: RAW_NUMERIC,
          },
          step: {
              type: RAW_NUMERIC,
              value: 1,
          },
          precision: {
              type: RAW_NUMERIC,
          },
          showStep: {
              type: RAW_BOOLEAN,
          },
          autoFocus: {
              type: RAW_BOOLEAN,
          },
          readOnly: {
              type: RAW_BOOLEAN,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          placeholder: {
              type: RAW_STRING,
          },
          width: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var props = options.props || {};
          return {
              isComposition: FALSE,
              inputStringValue: toString(props.value),
          };
      },
      computed: {
          customClassName: function () {
              var classNames = ['bell-input-number'];
              var className = this.get('className');
              if (className) {
                  classNames.push(className);
              }
              return classNames.join(' ');
          },
          customPrecision: function () {
              return toNumber(this.get('precision'), -1);
          },
          customMin: function () {
              return toNumber(this.get('min'), Number.NEGATIVE_INFINITY);
          },
          customMax: function () {
              return toNumber(this.get('max'), Number.POSITIVE_INFINITY);
          },
          upDisabled: function () {
              if (this.get('disabled') || this.get('readOnly')) {
                  return TRUE;
              }
              return this.get('customMax') - this.get('value') < this.get('step');
          },
          downDisabled: function () {
              if (this.get('disabled') || this.get('readOnly')) {
                  return TRUE;
              }
              return this.get('value') - this.get('customMin') < this.get('step');
          }
      },
      watchers: {
          value: function (value) {
              this.updateInputValue(value);
          },
      },
      methods: {
          handleFocus: function (event) {
              event.stop();
              this.fire({
                  type: 'focus',
                  ns: 'inputNumber',
              });
          },
          handleBlur: function (event) {
              event.stop();
              this.correctValue();
              this.fire({
                  type: 'blur',
                  ns: 'inputNumber',
              });
          },
          handleInput: function (event) {
              event.stop();
              if (this.get('isComposition')) {
                  return;
              }
              this.changeValue();
          },
          handleKeydown: function (event) {
              event.stop();
              if (this.get('isComposition')) {
                  return;
              }
              var _a = event.originalEvent, metaKey = _a.metaKey, ctrlKey = _a.ctrlKey, shiftKey = _a.shiftKey, keyCode = _a.keyCode;
              // 组合键可放行
              if (metaKey || ctrlKey || shiftKey || isHelper(keyCode)) {
                  return;
              }
              // 在这控制一些非法字符，可以避免光标因为重置 value 而跳到最后的问题
              var textInputElement = this.getTextInput();
              var isFirstChar = textInputElement.selectionStart === textInputElement.selectionEnd
                  && textInputElement.selectionStart === 0;
              var inputStringValue = this.get('inputStringValue');
              if (isFirstChar) {
                  if (inputStringValue.indexOf('-') < 0) {
                      // 第一个字符，只能输入 - 和 数字
                      if (isNumber(keyCode) || isMinus(keyCode)) {
                          return;
                      }
                  }
                  event.prevent();
              }
              else {
                  var dotIndex = inputStringValue.indexOf('.');
                  // 不在首位时，只能输入 . 和数字
                  if (isNumber(keyCode)) {
                      var customPrecision = this.get('customPrecision');
                      var precisionLength = dotIndex > 0 ? inputStringValue.substr(dotIndex + 1).length : 0;
                      if (customPrecision >= 0 && precisionLength >= customPrecision) {
                          event.prevent();
                      }
                  }
                  else if (isDot(keyCode)) {
                      if (dotIndex > 0) {
                          event.prevent();
                      }
                  }
                  else {
                      event.prevent();
                  }
              }
          },
          handleKeyup: function (event) {
              event.stop();
          },
          handleEnter: function (event) {
              event.stop();
              this.correctValue();
              this.fire({
                  type: 'enter',
                  ns: 'inputNumber',
              });
          },
          handleUp: function (event) {
              event.stop();
              if (this.get('isComposition')) {
                  return;
              }
              var numberInputElement = this.getNumberInput();
              numberInputElement.stepUp();
              this.getTextInput().value = numberInputElement.value;
              this.changeValue();
          },
          handleDown: function (event) {
              event.stop();
              if (this.get('isComposition')) {
                  return;
              }
              var numberInputElement = this.getNumberInput();
              numberInputElement.stepDown();
              this.getTextInput().value = numberInputElement.value;
              this.changeValue();
          },
          handleCompositionStart: function (event) {
              event.stop();
              this.set('isComposition', TRUE);
          },
          handleCompositionEnd: function (event) {
              event.stop();
              this.set('isComposition', FALSE);
              this.getTextInput().value = this.get('inputStringValue');
          },
          updateInputValue: function (value) {
              this.set({
                  inputStringValue: toString(value),
                  value: toNumber(value, value),
              });
          },
          changeValue: function () {
              var textInputElement = this.getTextInput();
              var oldStringValue = this.get('inputStringValue');
              var newStringValue = textInputElement.value;
              if (newStringValue !== oldStringValue
                  && newStringValue
                  && newStringValue !== '-'
                  && toNumber(newStringValue, FALSE) === FALSE) {
                  // 输入了错误字符
                  textInputElement.value = oldStringValue;
                  return;
              }
              var oldValue = this.get('value');
              this.updateInputValue(newStringValue);
              var newValue = this.get('value');
              if (newValue !== oldValue) {
                  this.fireChange(newValue);
              }
          },
          correctValue: function () {
              var value = this.get('value');
              var newValue = '';
              if (Yox.is.number(value)) {
                  var min = this.get('customMin');
                  var max = this.get('customMax');
                  if (value < min) {
                      newValue = min;
                  }
                  else if (value > max) {
                      newValue = max;
                  }
                  else {
                      return;
                  }
              }
              this.updateInputValue(newValue);
              if (newValue !== value) {
                  this.fireChange(newValue);
              }
          },
          fireChange: function (value) {
              this.fire({
                  type: 'change',
                  ns: 'inputNumber',
              }, {
                  value: value,
              });
          },
          getTextInput: function () {
              return this.$refs.input.$refs.input;
          },
          getNumberInput: function () {
              return this.$refs.numberInput;
          }
      },
      components: {
          Icon: Icon,
          Input: Input,
      },
      afterMount: function () {
          this.watch('inputStringValue', function (value) {
              this.getTextInput().value = value;
              this.getNumberInput().value = value;
          }, TRUE);
      }
  });

  var template$n = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-textarea-word-count'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_N.push(function(_M){_p(_K,'wrap',_O.wrap).value?_l(_M,'nativeAttrs','wrap',_p(_K,'wrap',_O.wrap).value):$1;_p(_K,'placeholder',_O.placeholder).value?_l(_M,'nativeAttrs','placeholder',_p(_K,'placeholder',_O.placeholder).value):$1;_p(_K,'maxLength',_O.maxLength).value?_l(_M,'nativeAttrs','maxlength',_m('maxlength',_p(_K,'maxLength',_O.maxLength).value)):$1;_p(_K,'autoFocus',_O.autoFocus).value?_l(_M,'nativeAttrs','autofocus','true'):$1;_p(_K,'readOnly',_O.readOnly).value?_l(_M,'nativeAttrs','readonly','true'):$1;_p(_K,'spellCheck',_O.spellCheck).value?_l(_M,'nativeAttrs','spellcheck'):$1;_p(_K,'disabled',_O.disabled).value?_l(_M,'nativeAttrs','disabled','true'):(_l(_M,'events','blur',_e('blur','handleBlur()','blur','','handleBlur')),_l(_M,'events','focus',_e('focus','handleFocus()','focus','','handleFocus')));return _M}({context:_D,model:_d(_p(_K,'value',_O.value)),nativeAttrs:{'class':'bell-textarea-el'+(_p(_K,'hasCount',_O.hasCount).value?' bell-textarea-el-with-word-count':'')},nativeStyles:_b(_p(_K,'textareaStyle',_O.textareaStyle).value),operator:_y,tag:'textarea',type:3}));_p(_K,'hasCount',_O.hasCount).value?_N.push({children:function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_u(($0=_p(_K,'formatValueLength',_O.formatValueLength,_E&&_E.formatValueLength||_F.formatValueLength).value,$0(_p(_K,'value',_O.value).value))).value)+' / '+_v(_p(_K,'maxLength',_O.maxLength).value),type:1});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-textarea'+(_p(_K,'size',_O.size).value?' bell-textarea-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'status',_O.status).value?' bell-textarea-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'block',_O.block).value?' bell-textarea-block':'')+(_p(_K,'resize',_O.resize).value===_p(_K,'RAW_HORIZONTAL',_O.RAW_HORIZONTAL).value?' bell-textarea-resize-horizontal':_p(_K,'resize',_O.resize).value===_p(_K,'RAW_VERTICAL',_O.RAW_VERTICAL).value?' bell-textarea-resize-vertical':'')+(_p(_K,'disabled',_O.disabled).value?' bell-textarea-disabled':' bell-textarea-enabled')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var sizes = {};
  var fontSizes = {};
  sizes[RAW_DEFAULT] = 5;
  sizes[RAW_SMALL] = 3;
  sizes[RAW_LARGE] = 8;
  fontSizes[RAW_DEFAULT] = 14;
  fontSizes[RAW_SMALL] = 12;
  fontSizes[RAW_LARGE] = 16;
  var Textarea = Yox.define({
      template: template$n,
      name: 'bell-Textarea',
      propTypes: {
          value: {
              type: RAW_STRING,
          },
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          autoSize: {
              type: [RAW_BOOLEAN, RAW_OBJECT],
          },
          status: {
              type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
          },
          placeholder: {
              type: RAW_STRING,
          },
          rows: {
              type: RAW_NUMERIC,
              value: 3
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          resize: {
              type: oneOf([RAW_HORIZONTAL, RAW_VERTICAL]),
          },
          wrap: {
              type: oneOf(['hard', 'soft']),
          },
          autoFocus: {
              type: RAW_BOOLEAN,
          },
          spellCheck: {
              type: RAW_BOOLEAN,
          },
          readOnly: {
              type: RAW_BOOLEAN,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          showCount: {
              type: RAW_BOOLEAN,
          },
          maxLength: {
              type: RAW_NUMERIC,
          },
          width: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          },
      },
      data: function () {
          return {
              RAW_HORIZONTAL: RAW_HORIZONTAL,
              RAW_VERTICAL: RAW_VERTICAL,
              isFocus: FALSE,
          };
      },
      computed: {
          hasCount: function () {
              return this.get('showCount') && this.get('maxLength') > 0;
          },
          inlineStyle: function () {
              var result = [];
              var width = this.get('width');
              if (width) {
                  result.push({
                      width: toPixel(width)
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
          textareaStyle: function () {
              var rows = this.get('rows');
              var size = this.get('size');
              var autoSize = this.get('autoSize');
              // 单行的高度
              var ROW_HEIGHT = fontSizes[size] * 1.5;
              // 上下 padding + border
              var PADDING_VERTICAL = 2 * (1 + sizes[size]);
              if (autoSize) {
                  var value = this.get('value');
                  if (Yox.is.object(autoSize)) {
                      rows = value ? value.split('\n').length : autoSize.minRows;
                      return {
                          minHeight: toPixel(autoSize.minRows * ROW_HEIGHT + PADDING_VERTICAL),
                          maxHeight: toPixel(autoSize.maxRows * ROW_HEIGHT + PADDING_VERTICAL),
                          height: toPixel(rows * ROW_HEIGHT + PADDING_VERTICAL),
                      };
                  }
                  rows = value ? value.split('\n').length : 1;
                  return {
                      minHeight: toPixel(ROW_HEIGHT + PADDING_VERTICAL),
                      height: toPixel(rows * ROW_HEIGHT + PADDING_VERTICAL),
                  };
              }
              return {
                  height: toPixel(rows * ROW_HEIGHT + PADDING_VERTICAL),
              };
          }
      },
      watchers: {
          value: function (value) {
              this.fire({
                  type: 'change',
                  ns: 'textarea',
              }, { value: value });
          },
      },
      filters: {
          formatValueLength: function (value) {
              return value
                  ? value.length
                  : 0;
          }
      },
      methods: {
          handleFocus: function () {
              this.set('isFocus', TRUE);
              this.fire({
                  type: 'focus',
                  ns: 'textarea',
              });
          },
          handleBlur: function () {
              this.set('isFocus', FALSE);
              this.fire({
                  type: 'blur',
                  ns: 'textarea',
              });
          },
      },
      afterMount: function () {
          var me = this;
          var onKeydown = function (event) {
              if (!me.get('isFocus')) {
                  return;
              }
              var originalEvent = event.originalEvent;
              me.fire(new Yox.Event('keydown.input', originalEvent));
              if (originalEvent.keyCode === 13) {
                  me.fire({
                      type: 'enter',
                      ns: 'textarea',
                  });
              }
          };
          var onKeyup = function (event) {
              if (!me.get('isFocus')) {
                  return;
              }
              var originalEvent = event.originalEvent;
              me.fire(new Yox.Event('keyup.input', originalEvent));
          };
          var onKeypress = function (event) {
              if (!me.get('isFocus')) {
                  return;
              }
              var originalEvent = event.originalEvent;
              me.fire(new Yox.Event('keypress.input', originalEvent));
          };
          Yox.dom.on(DOCUMENT, RAW_EVENT_KEYDOWN, onKeydown);
          Yox.dom.on(DOCUMENT, RAW_EVENT_KEYUP, onKeyup);
          Yox.dom.on(DOCUMENT, RAW_EVENT_KEYPRESS, onKeypress);
          var destroy = function (component) {
              if (component === me) {
                  Yox.dom.off(DOCUMENT, RAW_EVENT_KEYDOWN, onKeydown);
                  Yox.dom.off(DOCUMENT, RAW_EVENT_KEYUP, onKeyup);
                  Yox.dom.off(DOCUMENT, RAW_EVENT_KEYPRESS, onKeypress);
                  Yox.lifeCycle.off(RAW_EVENT_BEFORE_DESTROY, destroy);
              }
          };
          Yox.lifeCycle.on(RAW_EVENT_BEFORE_DESTROY, destroy);
      }
  });

  var template$o = (function(){var $0,$1=void 0,$3=!0,$4=!1,$5={'class':'bell-radio-icon'},$6='isFocus',$7=$3,$8=$4;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;!_p(_K,'disabled',_O.disabled).value?(_l(_M,'nativeAttrs','tabindex','0'),_l(_M,'events','click',_e('click','onClick()','click','','onClick')),_l(_M,'events','focus',_e('focus',"set('isFocus', true)",'focus','','set',{execute:function(_R,_S){return [$6,$7]}})),_l(_M,'events','blur',_e('blur',"set('isFocus', false)",'blur','','set',{execute:function(_R,_S){return [$6,$8]}}))):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$5,operator:_y,tag:'div',type:3});($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-radio'+(_p(_K,'disabled',_O.disabled).value?' bell-radio-disabled':' bell-radio-enabled')+(_p(_K,'checked',_O.checked).value?' bell-radio-checked':'')+(_p(_K,'$slot_children',_O.$slot_children).value?' bell-radio-with-label':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'label',type:3}));}})();

  var Radio = Yox.define({
      template: template$o,
      model: 'checked',
      name: 'bell-Radio',
      propTypes: {
          value: {
              type: [RAW_NUMBER, RAW_BOOLEAN, RAW_STRING],
              required: TRUE,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          checked: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              isFocus: FALSE,
          };
      },
      events: {
          change: {
              listener: function (_, data) {
                  if (data.value !== UNDEFINED) {
                      var value = this.get('value');
                      var checked = data.value == value;
                      this.setChecked(checked);
                  }
                  if (data.disabled !== UNDEFINED) {
                      this.set('disabled', data.disabled);
                  }
              },
              ns: 'radioGroup',
          }
      },
      methods: {
          onClick: function (event) {
              if (event) {
                  event.stop();
              }
              this.setChecked(TRUE);
          },
          setChecked: function (checked) {
              if (this.get('checked') === checked) {
                  return;
              }
              this.set({
                  checked: checked,
              });
              this.fire({
                  type: 'change',
                  ns: 'radio',
              }, {
                  checked: checked,
                  value: this.get('value'),
              });
          },
      },
      beforeCreate: function (options) {
          var props = options.props || (options.props = {});
          var radioGroup = findComponentUpward(options.parent, 'bell-RadioGroup');
          if (radioGroup) {
              if (props.disabled === UNDEFINED) {
                  props.disabled = radioGroup.get('disabled');
              }
              if (props.checked === UNDEFINED) {
                  props.checked = radioGroup.get('value') == props.value;
              }
          }
      },
      afterMount: function () {
          onClickEventByEnterPress(this);
      }
  });

  var template$p = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':(_p(_K,'button',_O.button).value?'bell-radio-button'+(_p(_K,'size',_O.size).value?' bell-radio-button-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'disabled',_O.disabled).value?' bell-radio-button-disabled':' bell-radio-button-enable'):'bell-radio-group'+(_p(_K,'disabled',_O.disabled).value?' bell-radio-group-disabled':' bell-radio-group-enabled'))+(_p(_K,'vertical',_O.vertical).value?' bell-radio-vertical':' bell-radio-horizontal')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var RadioGroup = Yox.define({
      template: template$p,
      name: 'bell-RadioGroup',
      propTypes: {
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          value: {
              type: [RAW_NUMBER, RAW_BOOLEAN, RAW_STRING],
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          vertical: {
              type: RAW_BOOLEAN,
          },
          button: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          },
      },
      watchers: {
          disabled: function (disabled) {
              this.fire({
                  type: 'change',
                  ns: 'radioGroup',
              }, {
                  disabled: disabled,
              }, TRUE);
          },
          value: function (value) {
              this.fire({
                  type: 'change',
                  ns: 'radioGroup',
              }, {
                  value: value,
              }, TRUE);
          }
      },
      events: {
          change: {
              listener: function (event, data) {
                  event.stop();
                  // 只关心选中的
                  if (!data.checked) {
                      return;
                  }
                  var oldValue = this.get('value');
                  var newValue = data.value;
                  if (oldValue !== newValue) {
                      this.set('value', newValue);
                      this.fire({
                          type: 'change',
                          ns: 'radioGroup',
                      }, {
                          value: newValue,
                      });
                  }
              },
              ns: 'radio',
          }
      }
  });

  var template$q = (function(){var $0,$1=void 0,$3=!0,$4=!1,$5={'class':'bell-checkbox-icon'},$6='isFocus',$7=$3,$8=$4;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?(_l(_M,'nativeAttrs','tabindex','0'),_l(_M,'events','click',_e('click','onClick()','click','','onClick')),_l(_M,'events','focus',_e('focus',"set('isFocus', true)",'focus','','set',{execute:function(_R,_S){return [$6,$7]}})),_l(_M,'events','blur',_e('blur',"set('isFocus', false)",'blur','','set',{execute:function(_R,_S){return [$6,$8]}}))):$1;_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$5,operator:_y,tag:'div',type:3});($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-checkbox'+(_p(_K,'disabled',_O.disabled).value?' bell-checkbox-disabled':' bell-checkbox-enabled')+(_p(_K,'checked',_O.checked).value?' bell-checkbox-checked':_p(_K,'indeterminate',_O.indeterminate).value?' bell-checkbox-indeterminate':'')+(_p(_K,'$slot_children',_O.$slot_children).value?' bell-checkbox-with-label':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'label',type:3}));}})();

  var Checkbox = Yox.define({
      template: template$q,
      model: 'checked',
      name: 'bell-Checkbox',
      propTypes: {
          value: {
              type: [RAW_STRING, RAW_NUMBER, RAW_BOOLEAN],
              required: TRUE,
          },
          indeterminate: {
              type: RAW_BOOLEAN,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          checked: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              isFocus: FALSE,
          };
      },
      events: {
          change: {
              listener: function (_, data) {
                  if (data.value !== UNDEFINED) {
                      var value = this.get('value');
                      var checked = Yox.array.has(data.value, value);
                      this.setChecked(checked);
                  }
                  if (data.disabled !== UNDEFINED) {
                      this.set('disabled', data.disabled);
                  }
              },
              ns: 'checkboxGroup',
          }
      },
      methods: {
          onClick: function (event) {
              if (event) {
                  event.stop();
              }
              this.setChecked(!this.get('checked'));
          },
          setChecked: function (checked) {
              if (this.get('checked') === checked) {
                  return;
              }
              this.set({
                  checked: checked,
              });
              this.fire({
                  type: 'change',
                  ns: 'checkbox',
              }, {
                  checked: checked,
                  value: this.get('value'),
              });
          },
      },
      beforeCreate: function (options) {
          var props = options.props || (options.props = {});
          var checkboxGroup = findComponentUpward(options.parent, 'bell-CheckboxGroup');
          if (checkboxGroup) {
              if (props.disabled === UNDEFINED) {
                  props.disabled = checkboxGroup.get('disabled');
              }
              if (props.checked === UNDEFINED) {
                  props.checked = Yox.array.has(checkboxGroup.get('value'), props.value);
              }
          }
      },
      afterMount: function () {
          onClickEventByEnterPress(this);
      }
  });

  var template$r = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-checkbox-group'+(_p(_K,'vertical',_O.vertical).value?' bell-checkbox-vertical':' bell-checkbox-horizontal')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var CheckboxGroup = Yox.define({
      template: template$r,
      name: 'bell-CheckboxGroup',
      propTypes: {
          value: {
              type: RAW_ARRAY,
              value: function () {
                  return [];
              }
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          vertical: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      watchers: {
          disabled: function (disabled) {
              this.fire({
                  type: 'change',
                  ns: 'checkboxGroup',
              }, {
                  disabled: disabled,
              }, TRUE);
          },
          value: function (value) {
              this.fire({
                  type: 'change',
                  ns: 'checkboxGroup',
              }, {
                  value: value
              }, TRUE);
          }
      },
      events: {
          change: {
              listener: function (event, data) {
                  event.stop();
                  var value = this.copy(this.get('value'));
                  var length = value.length;
                  if (data.checked) {
                      if (!Yox.array.has(value, data.value)) {
                          value.push(data.value);
                      }
                  }
                  else {
                      Yox.array.remove(value, data.value);
                  }
                  if (value.length !== length) {
                      this.set({ value: value });
                      this.fire({
                          type: 'change',
                          ns: 'checkboxGroup',
                      }, {
                          value: value
                      });
                  }
              },
              ns: 'checkbox',
          }
      },
  });

  var template$s = (function(){var $1=void 0,$3=!0,$4=!1,$5={'class':'bell-color-picker-value'},$6='isFocus',$7=$3,$8=$4;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{gap:'5',placement:_p(_K,'placement',_O.placement).value,trigger:_p(_K,'RAW_CUSTOM',_O.RAW_CUSTOM).value,visible:_p(_K,'isVisible',_O.isVisible).value},slots:{$slot_children:function(_L){var _N=[];_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?(_l(_M,'nativeAttrs','tabindex','0'),_l(_M,'events','click',_e('click','onClick()','click','','onClick')),_l(_M,'events','focus',_e('focus',"set('isFocus', true)",'focus','','set',{execute:function(_R,_S){return [$6,$7]}})),_l(_M,'events','blur',_e('blur',"set('isFocus', false)",'blur','','set',{execute:function(_R,_S){return [$6,$8]}}))):$1;_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push(function(_M){_p(_K,'colorStyle',_O.colorStyle).value?_M.nativeStyles=_b(_p(_K,'colorStyle',_O.colorStyle).value):$1;return _M}({context:_D,nativeAttrs:{'class':'bell-color-picker-color'},operator:_y,tag:'div',type:3}));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-color-picker'+(_p(_K,'status',_O.status).value?' bell-color-picker-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'size',_O.size).value?' bell-color-picker-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'block',_O.block).value?' bell-color-picker-block':'')+(_p(_K,'isVisible',_O.isVisible).value?' bell-color-picker-opened':'')+(_p(_K,'disabled',_O.disabled).value?' bell-color-picker-disabled':' bell-color-picker-enabled')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));return _N.length?_N:$1},$slot_overlay:function(_L){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{alpha:_p(_K,'alpha',_O.alpha).value,className:'bell-color-picker-overlay',hue:_o(_K,_K.length-1,'hsv.0',$3).value,mode:_p(_K,'mode',_O.mode).value,rgb:_p(_K,'rgb',_O.rgb).value,saturation:_o(_K,_K.length-1,'hsv.1',$3).value,showAlpha:_p(_K,'showAlpha',_O.showAlpha).value,swatches:_p(_K,'swatches',_O.swatches).value,value:_o(_K,_K.length-1,'hsv.2',$3).value},tag:'ColorPanel',type:4});return _N.length?_N:$1}},tag:'Popover',type:4});}})();

  var template$t = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-color-picker-pallete-layer'},$6={'class':'bell-color-picker-pallete'},$7={'class':'bell-color-picker-slider-track bell-color-picker-hue-slider-track'},$8={'class':'bell-color-picker-slider bell-color-picker-hue-slider'},$9={'class':'bell-color-picker-slider-track bell-color-picker-alpha-slider-track'},$10={'class':'bell-color-picker-slider-mask'},$11={'class':'bell-color-picker-slider bell-color-picker-alpha-slider'},$12={'class':'bell-color-picker-mode'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,nativeStyles:_b(_p(_K,'palleteLayerStyle',_O.palleteLayerStyle).value),operator:_y,tag:'div',type:3});_N.push({context:_D,operator:_z,props:{color:_p(_K,'palleteThumbColor',_O.palleteThumbColor).value,style:_p(_K,'palleteThumbStyle',_O.palleteThumbStyle).value},tag:'ColorThumb',type:4});return _N.length?_N:$1}(),context:_D,events:{mousedown:_e('mousedown','onPalleteMouseDown()','mousedown','','onPalleteMouseDown')},nativeAttrs:$6,operator:_y,ref:'pallete',tag:'div',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$7,operator:_y,tag:'div',type:3});_N.push({context:_D,operator:_z,props:{color:_p(_K,'hueThumbColor',_O.hueThumbColor).value,style:_p(_K,'hueThumbStyle',_O.hueThumbStyle).value},tag:'ColorThumb',type:4});return _N.length?_N:$1}(),context:_D,events:{mousedown:_e('mousedown','onHueMouseDown()','mousedown','','onHueMouseDown')},nativeAttrs:$8,operator:_y,ref:'hue',tag:'div',type:3});_p(_K,'showAlpha',_O.showAlpha).value?_N.push({children:function(){var _N=[];_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$9,operator:_y,tag:'div',type:3});_N.push({context:_D,nativeAttrs:$10,nativeStyles:_b(_p(_K,'alphaMaskStyle',_O.alphaMaskStyle).value),operator:_y,tag:'div',type:3});_N.push({context:_D,operator:_z,props:{color:_p(_K,'alphaThumbColor',_O.alphaThumbColor).value,style:_p(_K,'alphaThumbStyle',_O.alphaThumbStyle).value},tag:'ColorThumb',type:4});return _N.length?_N:$1}(),context:_D,events:{mousedown:_e('mousedown','onAlphaMouseDown()','mousedown','','onAlphaMouseDown')},nativeAttrs:$11,operator:_y,ref:'alpha',tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({children:function(){var _N=[];_N.push({context:_D,events:{click:_f('click','modeChange.colorPanel','click','','modeChange','colorPanel',$3)},operator:_z,props:{className:'bell-color-picker-mode-switcher',size:'small',type:'text'},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_u(($0=_p(_K,'formatMode',_O.formatMode,_E&&_E.formatMode||_F.formatMode).value,$0(_p(_K,'mode',_O.mode).value,_p(_K,'showAlpha',_O.showAlpha).value))).value),type:1});return _N.length?_N:$1}},tag:'Button',type:4});_p(_K,'mode',_O.mode).value===_p(_K,'MODE_HEX',_O.MODE_HEX).value?_N.push({context:_D,operator:_z,props:{alpha:_p(_K,'showAlpha',_O.showAlpha).value?_p(_K,'alpha',_O.alpha).value:$1,rgb:_p(_K,'rgb',_O.rgb).value},tag:'HexInput',type:4}):_p(_K,'mode',_O.mode).value===_p(_K,'MODE_RGB',_O.MODE_RGB).value?_N.push({context:_D,operator:_z,props:{alpha:_p(_K,'showAlpha',_O.showAlpha).value?_p(_K,'alpha',_O.alpha).value:$1,rgb:_p(_K,'rgb',_O.rgb).value},tag:'RgbInput',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$12,operator:_y,tag:'div',type:3});_p(_K,'swatches',_O.swatches).value&&(_o(_K,_K.length-1,'swatches.length',$3).value>0)?_N.push({context:_D,events:{change:_e('change','onSwatchChange()','change','','onSwatchChange',$1,$3)},operator:_z,props:{swatches:_p(_K,'swatches',_O.swatches).value},tag:'ColorSwatch',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-color-picker-panel'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3});}})();

  var template$u = (function(){var $1=void 0,$5={'class':'bell-color-picker-thumb-color'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,nativeStyles:_b(_p(_K,'colorStyle',_O.colorStyle).value),operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-color-picker-thumb'},operator:_y,tag:'div',type:3}));}})();

  var ColorThumb = Yox.define({
      template: template$u,
      name: 'bell-ColorThumb',
      propTypes: {
          color: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          colorStyle: function () {
              var color = this.get('color');
              return {
                  backgroundColor: color,
              };
          },
      },
  });

  var template$v = (function(){var $1=void 0,$3=!0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,events:{blur:_e('blur','onSubmit()','blur','','onSubmit',$1,$3),change:_e('change','onChange()','change','','onChange',$1,$3),enter:_e('enter','onSubmit()','enter','','onSubmit',$1,$3)},operator:_z,props:{align:'center',block:$3,className:'bell-color-picker-hex-input',size:'small',value:_p(_K,'value',_O.value).value},tag:'Input',type:4});}})();

  var MODE_HEX = 'hex';
  var MODE_RGB = 'rgb';
  var COLOR_DEFAULT = '#000';
  // 0 ≤ hue ＜ 360
  function normalizeHue(hue) {
      return 359.9999 * (hue > 1 ? 1 : hue < 0 ? 0 : hue);
  }
  // 0 ≤ saturation ≤ 1
  function normalizeSaturation(saturation) {
      return saturation > 1 ? 1 : saturation < 0 ? 0 : saturation;
  }
  // 0 ≤ value ≤ 1
  function normalizeValue(value) {
      return normalizeSaturation(value);
  }
  function normalizeAlpha(alpha) {
      return alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;
  }
  function getColorByName(color) {
      var ctx = DOCUMENT
          .createElement('canvas')
          .getContext('2d');
      ctx.fillStyle = color;
      return ctx.fillStyle;
  }
  function getModeByColor(color) {
      if (typeof color === 'string') {
          if (/^\s*#/.test(color)) {
              return MODE_HEX;
          }
          if (/rgb/i.test(color)) {
              return MODE_RGB;
          }
      }
  }
  function hsv2rgb(h, s, v) {
      var r = 0;
      var g = 0;
      var b = 0;
      if (s === 0) {
          r = g = b = v;
      }
      else {
          var _h = h / 60;
          var i = Math.floor(_h);
          var f = _h - i;
          var p = v * (1 - s);
          var q = v * (1 - f * s);
          var t = v * (1 - (1 - f) * s);
          switch (i) {
              case 0:
                  r = v;
                  g = t;
                  b = p;
                  break;
              case 1:
                  r = q;
                  g = v;
                  b = p;
                  break;
              case 2:
                  r = p;
                  g = v;
                  b = t;
                  break;
              case 3:
                  r = p;
                  g = q;
                  b = v;
                  break;
              case 4:
                  r = t;
                  g = p;
                  b = v;
                  break;
              case 5:
                  r = v;
                  g = p;
                  b = q;
                  break;
          }
      }
      return [
          r * 255,
          g * 255,
          b * 255
      ];
  }
  function rgb2hsv(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var diff = max - min;
      var h = 0;
      var v = max;
      var s = max === 0 ? 0 : diff / max;
      if (max === min) {
          h = 0;
      }
      else if (max === r && g >= b) {
          h = 60 * ((g - b) / diff);
      }
      else if (max === r && g < b) {
          h = 60 * ((g - b) / diff) + 360;
      }
      else if (max === g) {
          h = 60 * ((b - r) / diff) + 120;
      }
      else if (max === b) {
          h = 60 * ((r - g) / diff) + 240;
      }
      return [
          h,
          s,
          v ];
  }
  /**
   * rgb2hex
   *
   * @param {number} r 红色颜色值 0~255
   * @param {number} g 绿色颜色值 0~255
   * @param {number} b 蓝色颜色值 0~255
   * @param {number|void} a 透明度 0~1，默认 1
   */
  function rgb2hex(r, g, b, a) {
      var alphaStr = '';
      if (typeof a === 'number') {
          a = Math.round(255 * a);
          alphaStr = (a | 1 << 8).toString(16).slice(1);
      }
      var colorStr = ((b | g << 8 | r << 16) | 1 << 24).toString(16).slice(1);
      return '#' + colorStr.toUpperCase() + alphaStr.toUpperCase();
  }
  /**
   * hex2rgb
   *
   * @param {string} hex hex颜色值 eg: #000、#325312、#b2c343
   */
  function hex2rgb(hex) {
      hex = hex.replace(/^#/, '');
      var alpha = -1;
      if (hex.length === 8) {
          alpha = parseInt(hex.slice(6, 8), 16) / 255;
          hex = hex.slice(0, 6);
      }
      if (hex.length === 4) {
          alpha = parseInt(new Array(3).join(hex.slice(3, 4)), 16) / 255;
          hex = hex.slice(0, 3);
      }
      if (hex.length === 3) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      var num = parseInt(hex, 16);
      var r = num >> 16;
      var g = (num >> 8) & 255;
      var b = num & 255;
      var rgb = [r, g, b];
      if (alpha >= 0) {
          rgb.push(alpha);
      }
      return rgb;
  }
  function stringifyRgb(rgb, alpha) {
      var separator = ', ';
      var name = 'rgb';
      var value = [
          Math.floor(rgb[0]),
          Math.floor(rgb[1]),
          Math.floor(rgb[2]) ].join(separator);
      if (typeof alpha === 'number') {
          name = 'rgba';
          value += separator + (Math.floor(alpha * 100) / 100);
      }
      return name + "(" + value + ")";
  }
  function parseRgb(rgb) {
      return rgb.replace(/ *rgba?\(([^)]+)\) */i, '$1').split(',').map(function (value) {
          return toNumber(value);
      });
  }
  var converts = {
      rgb: {
          hex: function (color) {
              var value = parseRgb(color);
              return rgb2hex(value[0], value[1], value[2], value[3]);
          }
      },
      hex: {
          rgb: function (color) {
              var rgba = hex2rgb(color);
              return stringifyRgb(rgba, rgba[4]);
          }
      },
  };
  function parseColor(value, alphaEnabled) {
      var mode = getModeByColor(value);
      if (!mode) {
          mode = MODE_HEX;
          if (/^[a-zA-Z]+$/.test(value)) {
              value = getColorByName(value);
          }
          else {
              value = COLOR_DEFAULT;
          }
      }
      var color = value;
      if (mode !== MODE_RGB) {
          color = converts[mode][MODE_RGB](value);
      }
      var rgba = parseRgb(color);
      var hsv = rgb2hsv(rgba[0], rgba[1], rgba[2]);
      return {
          hsv: hsv,
          rgb: [rgba[0], rgba[1], rgba[2]],
          alpha: alphaEnabled && rgba[3] != NULL ? rgba[3] : 1,
      };
  }

  var HexInput = Yox.define({
      template: template$v,
      name: 'bell-HexInput',
      propTypes: {
          rgb: {
              type: RAW_ARRAY,
          },
          alpha: {
              type: RAW_NUMBER,
          },
      },
      data: function () {
          return {
              hexText: '',
          };
      },
      computed: {
          value: function () {
              var rgb = this.get('rgb');
              var alpha = this.get('alpha');
              return rgb2hex(rgb[0], rgb[1], rgb[2], alpha);
          },
      },
      methods: {
          onChange: function (event, data) {
              event.stop();
              this.set({
                  hexText: data.value
              });
          },
          onSubmit: function (event) {
              event.stop();
              var hexText = this.get('hexText');
              if (!hexText) {
                  return;
              }
              this.fire({
                  type: 'colorChange',
                  ns: 'hexInput'
              }, {
                  color: getColorByName(hexText)
              });
          },
      },
      afterMount: function () {
          this.watch('rgb', function () {
              this.set({
                  hexText: this.get('value'),
              });
          }, TRUE);
          this.watch('alpha', function () {
              this.set({
                  hexText: this.get('value'),
              });
          }, TRUE);
      },
      components: {
          Input: Input,
      }
  });

  var template$w = (function(){var $1=void 0,$2=null,$3=!0,$5='redText',$6='greenText',$7='blueText',$8='alphaText',$9={'class':'bell-color-picker-rgb-input'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({children:function(){var _N=[];_N.push({context:_D,events:{blur:_e('blur','onSubmit()','blur','','onSubmit',$1,$3),change:_e('change',"onChange($event, 'redText', $data.value)",'change','','onChange',{execute:function(_R,_S){return [_R,$5,_S.value]}},$3),enter:_e('enter','onSubmit()','enter','','onSubmit',$1,$3)},operator:_z,props:{align:'center',block:$3,size:'small',value:_p(_K,'red',_O.red).value},tag:'Input',type:4});_N.push({context:_D,events:{blur:_e('blur','onSubmit()','blur','','onSubmit',$1,$3),change:_e('change',"onChange($event, 'greenText', $data.value)",'change','','onChange',{execute:function(_R,_S){return [_R,$6,_S.value]}},$3),enter:_e('enter','onSubmit()','enter','','onSubmit',$1,$3)},operator:_z,props:{align:'center',block:$3,size:'small',value:_p(_K,'green',_O.green).value},tag:'Input',type:4});_N.push({context:_D,events:{blur:_e('blur','onSubmit()','blur','','onSubmit',$1,$3),change:_e('change',"onChange($event, 'blueText', $data.value)",'change','','onChange',{execute:function(_R,_S){return [_R,$7,_S.value]}},$3),enter:_e('enter','onSubmit()','enter','','onSubmit',$1,$3)},operator:_z,props:{align:'center',block:$3,size:'small',value:_p(_K,'blue',_O.blue).value},tag:'Input',type:4});_p(_K,'alpha',_O.alpha).value!=$2?_N.push({context:_D,events:{blur:_e('blur','onSubmit()','blur','','onSubmit',$1,$3),change:_e('change',"onChange($event, 'alphaText', $data.value)",'change','','onChange',{execute:function(_R,_S){return [_R,$8,_S.value]}},$3),enter:_e('enter','onSubmit()','enter','','onSubmit',$1,$3)},operator:_z,props:{align:'center',block:$3,size:'small',value:_p(_K,'alphaPercent',_O.alphaPercent).value},tag:'Input',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$9,operator:_y,tag:'div',type:3});}})();

  var RgbInput = Yox.define({
      template: template$w,
      name: 'bell-RgbInput',
      propTypes: {
          rgb: {
              type: RAW_ARRAY,
          },
          alpha: {
              type: RAW_NUMBER,
          },
      },
      data: function () {
          return {
              redText: '',
              greenText: '',
              blueText: '',
              alphaText: '',
          };
      },
      computed: {
          red: function () {
              var rgb = this.get('rgb');
              return rgb
                  ? toString(Math.floor(rgb[0]))
                  : '';
          },
          green: function () {
              var rgb = this.get('rgb');
              return rgb
                  ? toString(Math.floor(rgb[1]))
                  : '';
          },
          blue: function () {
              var rgb = this.get('rgb');
              return rgb
                  ? toString(Math.floor(rgb[2]))
                  : '';
          },
          alphaPercent: function () {
              var alpha = this.get('alpha');
              if (typeof alpha === 'number') {
                  return Math.floor(alpha * 100) + '%';
              }
              return '';
          }
      },
      methods: {
          onChange: function (event, name, value) {
              event.stop();
              this.set(name, value);
          },
          onSubmit: function (event) {
              event.stop();
              var redText = this.get('redText');
              var greenText = this.get('greenText');
              var blueText = this.get('blueText');
              var alphaText = this.get('alphaText');
              if (!redText
                  || !greenText
                  || !blueText
                  || (this.get('alphaPercent') && !alphaText)) {
                  return;
              }
              var alphaMatch = alphaText.match(/\s*(\d+)%\s*/);
              var rgb = stringifyRgb([
                  toNumber(redText),
                  toNumber(greenText),
                  toNumber(blueText) ], alphaMatch ? (toNumber(alphaMatch[1]) / 100) : UNDEFINED);
              this.fire({
                  type: 'colorChange',
                  ns: 'rgbInput'
              }, {
                  color: getColorByName(rgb)
              });
          },
      },
      afterMount: function () {
          this.watch('rgb', function () {
              this.set({
                  redText: this.get('red'),
                  greenText: this.get('green'),
                  blueText: this.get('blue'),
              });
          }, TRUE);
          this.watch('alpha', function () {
              this.set({
                  alphaText: this.get('alphaPercent')
              });
          }, TRUE);
      },
      components: {
          Input: Input,
      }
  });

  var ColorPanel = Yox.define({
      template: template$t,
      name: 'bell-ColorPanel',
      propTypes: {
          mode: {
              type: oneOf([MODE_HEX, MODE_RGB]),
          },
          swatches: {
              type: RAW_ARRAY,
          },
          showAlpha: {
              type: RAW_BOOLEAN,
          },
          rgb: {
              type: RAW_ARRAY,
          },
          // 色调
          hue: {
              type: RAW_NUMERIC,
          },
          // 饱和度
          saturation: {
              type: RAW_NUMERIC,
          },
          // 明度
          value: {
              type: RAW_NUMERIC,
          },
          // 透明度
          alpha: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
      },
      data: function () {
          return {
              MODE_HEX: MODE_HEX,
              MODE_RGB: MODE_RGB,
          };
      },
      computed: {
          palleteLayerStyle: function () {
              var hueThumbColor = this.get('hueThumbColor');
              return {
                  backgroundImage: "linear-gradient(90deg, white, " + hueThumbColor + ")"
              };
          },
          palleteThumbStyle: function () {
              var saturation = this.get('saturation');
              var value = this.get('value');
              return {
                  left: saturation * 100 + "%",
                  bottom: value * 100 + "%",
              };
          },
          palleteThumbColor: function () {
              var rgb = this.get('rgb');
              if (rgb) {
                  return stringifyRgb(rgb);
              }
          },
          hueThumbStyle: function () {
              var hue = this.get('hue');
              return {
                  left: (hue / 359.9999) * 100 + "%",
              };
          },
          hueThumbColor: function () {
              var hue = this.get('hue');
              return "hsl(" + hue + ", 100%, 50%)";
          },
          alphaMaskStyle: function () {
              var rgb = this.get('rgb');
              if (rgb) {
                  return {
                      backgroundImage: "linear-gradient(to right, " + stringifyRgb(rgb, 0) + " 0%, " + stringifyRgb(rgb, 1) + " 100%)"
                  };
              }
          },
          alphaThumbStyle: function () {
              var alpha = this.get('alpha');
              return {
                  left: alpha * 100 + "%",
              };
          },
          alphaThumbColor: function () {
              var rgb = this.get('rgb');
              if (rgb) {
                  var alpha = this.get('alpha');
                  return stringifyRgb(rgb, alpha);
              }
          },
      },
      filters: {
          formatMode: function (mode, showAlpha) {
              return mode.toUpperCase() + (showAlpha ? 'A' : '');
          }
      },
      methods: {
          onSwatchChange: function (event, data) {
              event.stop();
              this.fire({
                  type: 'colorChange',
                  ns: 'colorPanel',
              }, {
                  color: data.color,
              });
          },
      },
      afterMount: function () {
          var me = this;
          var palleteEl;
          var hueEl;
          var alphaEl;
          var onPalleteMouseDown = function (event) {
              event.stop();
              palleteEl = me.$refs.pallete;
              if (!palleteEl) {
                  return;
              }
              startDrag();
              Yox.dom.on(DOCUMENT, RAW_EVENT_MOUSEMOVE, onPalleteMouseMove);
              Yox.dom.on(DOCUMENT, RAW_EVENT_MOUSEUP, onPalleteMouseUp);
          };
          var onPalleteMouseMove = function (event) {
              var mouseEvent = event.originalEvent;
              var rect = palleteEl.getBoundingClientRect();
              var saturation = (mouseEvent.clientX - rect.left) / rect.width;
              var value = (rect.bottom - mouseEvent.clientY) / rect.height;
              me.fire({
                  type: 'hsvChange',
                  ns: 'colorPanel',
              }, {
                  hsv: [
                      me.get('hue'),
                      normalizeSaturation(saturation),
                      normalizeValue(value) ]
              });
          };
          var onPalleteMouseUp = function () {
              Yox.dom.off(DOCUMENT, RAW_EVENT_MOUSEMOVE, onPalleteMouseMove);
              Yox.dom.off(DOCUMENT, RAW_EVENT_MOUSEUP, onPalleteMouseUp);
              palleteEl = UNDEFINED;
              endDrag();
          };
          var onHueMouseDown = function (event) {
              event.stop();
              hueEl = me.$refs.hue;
              if (!hueEl) {
                  return;
              }
              startDrag();
              Yox.dom.on(DOCUMENT, RAW_EVENT_MOUSEMOVE, onHueMouseMove);
              Yox.dom.on(DOCUMENT, RAW_EVENT_MOUSEUP, onHueMouseUp);
          };
          var onHueMouseMove = function (event) {
              var mouseEvent = event.originalEvent;
              var rect = hueEl.getBoundingClientRect();
              var hue = (mouseEvent.clientX - rect.left) / rect.width;
              me.fire({
                  type: 'hsvChange',
                  ns: 'colorPanel',
              }, {
                  hsv: [
                      normalizeHue(hue),
                      me.get('saturation'),
                      me.get('value') ]
              });
          };
          var onHueMouseUp = function () {
              Yox.dom.off(DOCUMENT, RAW_EVENT_MOUSEMOVE, onHueMouseMove);
              Yox.dom.off(DOCUMENT, RAW_EVENT_MOUSEUP, onHueMouseUp);
              hueEl = UNDEFINED;
              endDrag();
          };
          var onAlphaMouseDown = function (event) {
              event.stop();
              alphaEl = me.$refs.alpha;
              if (!alphaEl) {
                  return;
              }
              startDrag();
              Yox.dom.on(DOCUMENT, RAW_EVENT_MOUSEMOVE, onAlphaMouseMove);
              Yox.dom.on(DOCUMENT, RAW_EVENT_MOUSEUP, onAlphaMouseUp);
          };
          var onAlphaMouseMove = function (event) {
              var mouseEvent = event.originalEvent;
              var rect = alphaEl.getBoundingClientRect();
              var alpha = (mouseEvent.clientX - rect.left) / rect.width;
              me.fire({
                  type: 'alphaChange',
                  ns: 'colorPanel',
              }, {
                  alpha: normalizeAlpha(alpha),
              });
          };
          var onAlphaMouseUp = function () {
              Yox.dom.off(DOCUMENT, RAW_EVENT_MOUSEMOVE, onAlphaMouseMove);
              Yox.dom.off(DOCUMENT, RAW_EVENT_MOUSEUP, onAlphaMouseUp);
              alphaEl = UNDEFINED;
              endDrag();
          };
          // @ts-ignore
          me.onPalleteMouseDown = onPalleteMouseDown;
          // @ts-ignore
          me.onHueMouseDown = onHueMouseDown;
          // @ts-ignore
          me.onAlphaMouseDown = onAlphaMouseDown;
      },
      components: {
          Button: Button,
          ColorSwatch: ColorSwatch,
          ColorThumb: ColorThumb,
          HexInput: HexInput,
          RgbInput: RgbInput,
      }
  });

  var ColorPicker = Yox.define({
      template: template$s,
      name: 'bell-ColorPicker',
      propTypes: {
          status: {
              type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
          },
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          placement: {
              type: oneOf(RAW_PLACEMENT_ARRAY),
              value: RAW_BOTTOM_START,
          },
          defaultValue: {
              type: RAW_STRING,
          },
          value: {
              type: RAW_STRING,
          },
          modes: {
              type: RAW_ARRAY,
          },
          swatches: {
              type: RAW_ARRAY,
          },
          showAlpha: {
              type: RAW_BOOLEAN,
          },
          width: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          var modes = this.get('modes');
          var mode = modes && modes[0] || MODE_HEX;
          var value = this.get('value');
          if (!value) {
              value = this.get('defaultValue') || COLOR_DEFAULT;
          }
          var _a = parseColor(value, this.get('showAlpha')), rgb = _a.rgb, hsv = _a.hsv, alpha = _a.alpha;
          return {
              RAW_CUSTOM: RAW_CUSTOM,
              isFocus: FALSE,
              isVisible: FALSE,
              mode: mode,
              rgb: rgb,
              hsv: hsv,
              alpha: alpha,
          };
      },
      computed: {
          inlineStyle: function () {
              var result = [];
              var width = this.get('width');
              if (width) {
                  result.push({
                      width: toPixel(width)
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
          colorStyle: function () {
              var rgb = this.get('rgb');
              if (rgb) {
                  var alpha = this.get('alpha');
                  return {
                      backgroundColor: stringifyRgb(rgb, alpha),
                  };
              }
          },
          colorValue: function () {
              var showAlpha = this.get('showAlpha');
              var alpha = UNDEFINED;
              if (showAlpha) {
                  alpha = this.get('alpha');
              }
              var mode = this.get('mode');
              var rgb = this.get('rgb');
              if (mode === MODE_HEX) {
                  return rgb2hex(rgb[0], rgb[1], rgb[2], alpha);
              }
              else if (mode === MODE_RGB) {
                  return stringifyRgb(rgb, alpha);
              }
              return '';
          }
      },
      watchers: {
          value: function (value) {
              // @ts-ignore
              this.setColor(value);
          },
          showAlpha: function () {
              this.set({
                  alpha: 1,
              });
              // @ts-ignore
              this.fireChange();
          }
      },
      events: {
          outside: {
              listener: function (event) {
                  event.stop();
                  this.set({
                      isVisible: FALSE,
                  });
              },
              ns: 'popover',
          },
          hsvChange: {
              listener: function (event, data) {
                  event.stop();
                  var hsv = data.hsv;
                  this.set({
                      hsv: hsv,
                      rgb: hsv2rgb(hsv[0], hsv[1], hsv[2])
                  });
                  // @ts-ignore
                  this.fireChange();
              },
              ns: 'colorPanel'
          },
          colorChange: function (event, data) {
              if (event.phase !== Yox.Event.PHASE_UPWARD) {
                  return;
              }
              event.stop();
              // @ts-ignore
              if (this.setColor(data.color)) {
                  // @ts-ignore
                  this.fireChange();
              }
          },
          alphaChange: {
              listener: function (event, data) {
                  event.stop();
                  this.set(data);
                  // @ts-ignore
                  this.fireChange();
              },
              ns: 'colorPanel'
          },
          modeChange: {
              listener: function (event) {
                  event.stop();
                  var modes = this.get('modes');
                  if (!modes) {
                      return;
                  }
                  var mode = this.get('mode');
                  var index = modes.indexOf(mode);
                  var newIndex = index + 1;
                  if (newIndex >= modes.length) {
                      newIndex = 0;
                  }
                  this.set({
                      mode: modes[newIndex]
                  });
                  // @ts-ignore
                  this.fireChange();
              },
              ns: 'colorPanel'
          }
      },
      methods: {
          onClick: function (event) {
              this.toggle('isVisible');
              fireClickEvent(event);
          },
          setColor: function (value) {
              var _a = parseColor(value, this.get('showAlpha')), rgb = _a.rgb, hsv = _a.hsv, alpha = _a.alpha;
              var oldRgb = this.get('rgb');
              // hex 转 hsv，有时因为精度会导致值不一样
              // 这里用 rgb 判断一下，如果新旧值相同，则不再转 hsv
              if (rgb2hex(rgb[0], rgb[1], rgb[2]) === rgb2hex(oldRgb[0], oldRgb[1], oldRgb[2])) {
                  return;
              }
              this.set({
                  rgb: rgb,
                  hsv: hsv,
                  alpha: alpha,
              });
              return TRUE;
          },
          fireChange: function () {
              var value = this.get('colorValue');
              this.set('value', value);
              this.fire({
                  type: 'change',
                  ns: 'colorPicker',
              }, {
                  value: value,
              });
          }
      },
      afterMount: function () {
          onClickEventByEnterPress(this);
      },
      components: {
          Popover: Popover,
          ColorPanel: ColorPanel,
      }
  });

  var template$x = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-slider-bar'},$6={'class':'bell-slider-stop'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?_l(_M,'events','mousedown',_e('mousedown','onTrackMouseDown()','mousedown','','onTrackMouseDown')):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,nativeStyles:_b(_p(_K,'vertical',_O.vertical).value?_u(($0=_p(_K,'formatBarStyle',_O.formatBarStyle,_E&&_E.formatBarStyle||_F.formatBarStyle).value,$0(_p(_K,'valuePercentArray',_O.valuePercentArray).value,_p(_K,'reverse',_O.reverse).value,'bottom','top'))).value:_u(($0=_p(_K,'formatBarStyle',_O.formatBarStyle,_E&&_E.formatBarStyle||_F.formatBarStyle).value,$0(_p(_K,'valuePercentArray',_O.valuePercentArray).value,_p(_K,'reverse',_O.reverse).value,'left','right'))).value),operator:_y,tag:'div',type:3});_p(_K,'showStops',_O.showStops).value?_i(_p(_K,'stops',_O.stops),function(_K,_O,_P,_Q){_N.push({context:_D,key:_r(_K,'value',_O.value).value,nativeAttrs:$6,nativeStyles:_b(_r(_K,'style',_O.style).value),operator:_y,tag:'div',type:3});}):_N.push({isPure:$3,operator:_x,text:'',type:2});_i(_p(_K,'valuePercentArray',_O.valuePercentArray),function(_K,_O,_P,_Q,index){_N.push({context:_D,operator:_z,props:{content:_s(_K,0,'formatTooltip').value?_u(($0=_s(_K,0,'formatTooltip').value,$0(_r(_K,'value',_O.value).value))).value:_r(_K,'value',_O.value).value,mode:_s(_K,0,'RAW_CUSTOM').value,placement:_s(_K,0,'vertical').value?_s(_K,0,'RAW_RIGHT').value:_s(_K,0,'RAW_TOP').value,visible:_s(_K,0,'showTooltipIndex').value===index},slots:{$slot_children:function(_L){var _N=[];_N.push(function(_M){!_s(_K,0,'disabled').value?(_l(_M,'nativeAttrs','tabindex','0'),_l(_M,'lazy','mouseenter',200),_l(_M,'lazy','mouseleave',200),_l(_M,'events','mouseenter',_e('mouseenter','onThumbMouseEnter($event, index)','mouseenter','','onThumbMouseEnter',{execute:function(_R,_S){return [_R,index]}})),_l(_M,'events','mouseleave',_e('mouseleave','onThumbMouseLeave($event, index)','mouseleave','','onThumbMouseLeave',{execute:function(_R,_S){return [_R,index]}}))):$1;return _M}({context:_D,nativeAttrs:{'class':'bell-slider-thumb'+(_s(_K,0,'hoverThumbIndex').value===index?' bell-slider-thumb-hover':'')+(_s(_K,0,'dragThumbIndex').value===index?' bell-slider-thumb-dragging':'')},nativeStyles:_b(_s(_K,0,'vertical').value?_u(($0=_p(_K,'formatThumbStyle',_O.formatThumbStyle,_E&&_E.formatThumbStyle||_F.formatThumbStyle).value,$0(_r(_K,'percent',_O.percent).value,_s(_K,0,'reverse').value?'top':'bottom'))).value:_u(($0=_p(_K,'formatThumbStyle',_O.formatThumbStyle,_E&&_E.formatThumbStyle||_F.formatThumbStyle).value,$0(_r(_K,'percent',_O.percent).value,_s(_K,0,'reverse').value?'right':'left'))).value),operator:_y,tag:'div',type:3}));return _N.length?_N:$1}},tag:'Tooltip',type:4});});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-slider-track'},operator:_y,tag:'div',type:3}));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-slider'+(_p(_K,'vertical',_O.vertical).value?' bell-slider-vertical':' bell-slider-horizontal')+(_p(_K,'disabled',_O.disabled).value?' bell-slider-disabled':' bell-slider-enabled')+(_p(_K,'block',_O.block).value?' bell-slider-block':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var template$y = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-popover-arrow'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,events:{close:_e('close','onPopoverClose()','close','','onPopoverClose',$1,$3),open:_e('open','onPopoverOpen()','open','','onPopoverOpen',$1,$3),outside:_e('outside','onPopoverOutside()','outside','','onPopoverOutside',$1,$3)},operator:_z,props:{disabled:_p(_K,'disabled',_O.disabled).value,offsetX:_p(_K,'offsetX',_O.offsetX).value,offsetY:_p(_K,'offsetY',_O.offsetY).value,placement:_p(_K,'placement',_O.placement).value,showArrow:$3,showDelay:_p(_K,'delay',_O.delay).value,trigger:_p(_K,'mode',_O.mode).value,triggerMutable:$3,visible:_p(_K,'isVisible',_O.isVisible).value},slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_children',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1},$slot_overlay:function(_L){var _N=[];_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push(function(_M){_p(_K,'contentStyle',_O.contentStyle).value?_M.nativeStyles=_b(_p(_K,'contentStyle',_O.contentStyle).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_content',_L)||function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'content',_O.content).value),type:1});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-popover-content'},operator:_y,tag:'div',type:3}));_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$5,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-tooltip'+(_p(_K,'theme',_O.theme).value?' bell-tooltip-'+_v(_p(_K,'theme',_O.theme).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));return _N.length?_N:$1}},tag:'Popover',type:4});}})();

  var Tooltip = Yox.define({
      template: template$y,
      name: 'bell-Tooltip',
      propTypes: {
          content: {
              type: [RAW_STRING, RAW_NUMBER],
          },
          theme: {
              type: oneOf(RAW_THEME_ARRAY),
              value: RAW_DARK,
          },
          placement: {
              type: oneOf(RAW_PLACEMENT_ARRAY),
              value: RAW_BOTTOM,
          },
          defaultVisible: {
              type: RAW_BOOLEAN,
          },
          visible: {
              type: RAW_BOOLEAN,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          delay: {
              type: RAW_NUMERIC,
              value: HOVER_DELAY,
          },
          trigger: {
              type: oneOf([RAW_HOVER, RAW_CLICK]),
              value: RAW_HOVER,
          },
          maxWidth: {
              type: RAW_NUMERIC,
          },
          maxHeight: {
              type: RAW_NUMERIC,
          },
          offsetX: {
              type: RAW_NUMERIC,
          },
          offsetY: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          var visible = this.get('visible');
          var defaultVisible = this.get('defaultVisible');
          return {
              isVisible: typeof visible === 'boolean'
                  ? visible
                  : typeof defaultVisible === 'boolean'
                      ? defaultVisible
                      : FALSE,
          };
      },
      computed: {
          mode: function () {
              var visible = this.get('visible');
              return typeof visible === 'boolean'
                  ? RAW_CUSTOM
                  : this.get('trigger');
          },
          contentStyle: function () {
              var maxWidth = this.get('maxWidth');
              var maxHeight = this.get('maxHeight');
              if (maxWidth || maxHeight) {
                  var result = {};
                  if (maxWidth) {
                      result.maxWidth = toPixel(maxWidth);
                  }
                  if (maxHeight) {
                      result.maxHeight = toPixel(maxHeight);
                  }
                  return result;
              }
          },
      },
      watchers: {
          visible: function (value) {
              this.set({
                  isVisible: value,
              });
          }
      },
      methods: {
          onPopoverOpen: function (event) {
              event.stop();
              this.set('isVisible', TRUE);
              // @ts-ignore
              this.fireChange(TRUE);
          },
          onPopoverClose: function (event) {
              event.stop();
              this.set('isVisible', FALSE);
              // @ts-ignore
              this.fireChange(FALSE);
          },
          onPopoverOutside: function (event) {
              event.stop();
              this.fire({
                  type: 'outside',
                  ns: 'tooltip',
              });
          },
          fireChange: function (visible) {
              if (this.get('visible') !== visible) {
                  this.fire({
                      type: 'change',
                      ns: 'tooltip',
                  }, {
                      visible: visible,
                  });
              }
          },
      },
      components: {
          Popover: Popover,
      },
  });

  function getPercentByValue(min, max, rawValue) {
      var range = max - min;
      var value = toNumber(rawValue);
      if (value > max) {
          value = max;
      }
      else if (value < min) {
          value = min;
      }
      return range > 0
          ? (value - min) / range * 100
          : 0;
  }
  var Slider = Yox.define({
      template: template$x,
      name: 'bell-Slider',
      propTypes: {
          value: {
              type: [RAW_NUMERIC, RAW_ARRAY],
              value: 0,
          },
          max: {
              type: RAW_NUMERIC,
              value: 100,
          },
          min: {
              type: RAW_NUMERIC,
              value: 0,
          },
          step: {
              type: RAW_NUMERIC,
              value: 1,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          vertical: {
              type: RAW_BOOLEAN,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          reverse: {
              type: RAW_BOOLEAN,
          },
          showStops: {
              type: RAW_BOOLEAN,
          },
          showTooltip: {
              type: RAW_BOOLEAN,
          },
          formatTooltip: {
              type: RAW_FUNCTION,
          },
          width: {
              type: RAW_NUMERIC,
          },
          height: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              RAW_TOP: RAW_TOP,
              RAW_RIGHT: RAW_RIGHT,
              RAW_CUSTOM: RAW_CUSTOM,
              innerValue: this.get('value'),
              hoverThumbIndex: -1,
              dragThumbIndex: -1,
              showTooltipIndex: -1,
          };
      },
      computed: {
          isRange: function () {
              var value = this.get('value');
              return Yox.is.array(value);
          },
          minNumber: function () {
              return toNumber(this.get('min'));
          },
          maxNumber: function () {
              return toNumber(this.get('max'));
          },
          stepNumber: function () {
              return toNumber(this.get('step'));
          },
          valuePercentArray: {
              deps: ['innerValue', 'innerValue.*'],
              get: function () {
                  var min = this.get('minNumber');
                  var max = this.get('maxNumber');
                  var innerValue = this.get('innerValue');
                  if (Yox.is.array(innerValue)) {
                      return [
                          {
                              value: innerValue[0],
                              percent: getPercentByValue(min, max, innerValue[0])
                          },
                          {
                              value: innerValue[1],
                              percent: getPercentByValue(min, max, innerValue[1])
                          } ];
                  }
                  return [
                      {
                          value: innerValue,
                          percent: getPercentByValue(min, max, innerValue),
                      }
                  ];
              }
          },
          stops: function () {
              var vertical = this.get('vertical');
              var reverse = this.get('reverse');
              var min = this.get('minNumber');
              var max = this.get('maxNumber');
              var step = this.get('stepNumber');
              var range = max - min;
              var result = [];
              if (max - min > step) {
                  var count = Math.floor(range / step);
                  var interval = 100 / count;
                  for (var i = 1; i < count; i++) {
                      var value = i * interval;
                      var percent = value + '%';
                      result.push({
                          value: value,
                          style: vertical
                              ? (reverse ? { top: percent } : { bottom: percent })
                              : (reverse ? { right: percent } : { left: percent })
                      });
                  }
              }
              return result;
          },
          inlineStyle: function () {
              var result = [];
              var width = this.get('width');
              var height = this.get('height');
              if (width || height) {
                  var customStyle = {};
                  if (width) {
                      customStyle.width = toPixel(width);
                  }
                  if (height) {
                      customStyle.height = toPixel(height);
                  }
                  result.push(customStyle);
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      },
      filters: {
          formatBarStyle: function (valuePercentArray, reverse, fromName, toName) {
              var _a;
              var fromPercnet = valuePercentArray[0].percent;
              var toPercent;
              if (valuePercentArray[1]) {
                  toPercent = valuePercentArray[1].percent;
                  if (fromPercnet > toPercent) {
                      fromPercnet = valuePercentArray[1].percent;
                      toPercent = valuePercentArray[0].percent;
                  }
              }
              else {
                  toPercent = fromPercnet;
                  fromPercnet = 0;
              }
              if (reverse) {
                  var temp = fromName;
                  fromName = toName;
                  toName = temp;
              }
              return _a = {},
                  _a[fromName] = fromPercnet + '%',
                  _a[toName] = (100 - toPercent) + '%',
                  _a;
          },
          formatThumbStyle: function (percent, name) {
              var _a;
              return _a = {},
                  _a[name] = percent + '%',
                  _a;
          }
      },
      events: {
          outside: {
              listener: function (event) {
                  if (event.phase !== Yox.Event.PHASE_UPWARD) {
                      return;
                  }
                  event.stop();
                  this.set('showTooltipIndex', -1);
              },
              ns: 'tooltip'
          }
      },
      watchers: {
          value: function (value) {
              if (this.get('hoverThumbIndex') < 0
                  && this.get('dragThumbIndex') < 0) {
                  this.set('innerValue', value);
              }
          },
          hoverThumbIndex: function (index) {
              if (index >= 0) {
                  this.set('showTooltipIndex', this.get('showTooltip') ? index : -1);
              }
              else if (this.get('dragThumbIndex') < 0) {
                  this.set('showTooltipIndex', -1);
              }
          },
          dragThumbIndex: function (index) {
              if (index < 0 && this.get('hoverThumbIndex') < 0) {
                  this.set('showTooltipIndex', -1);
              }
          },
      },
      methods: {
          onThumbMouseEnter: function (event, index) {
              event.stop();
              var dragThumbIndex = this.get('dragThumbIndex');
              if (dragThumbIndex >= 0) {
                  if (dragThumbIndex === index) {
                      this.set('hoverThumbIndex', index);
                  }
              }
              else {
                  this.set('hoverThumbIndex', index);
              }
          },
          onThumbMouseLeave: function (event) {
              event.stop();
              this.set('hoverThumbIndex', -1);
          },
      },
      afterMount: function () {
          var me = this;
          var element;
          var dragThumbIndex = -1;
          var min = 0;
          var max = 0;
          var step = 0;
          var onTrackMouseDown = function (event) {
              event.stop();
              element = event.originalEvent.currentTarget;
              if (!element) {
                  return;
              }
              max = me.get('maxNumber');
              min = me.get('minNumber');
              step = me.get('stepNumber');
              var ratio = getRatio(event);
              dragThumbIndex = 0;
              if (me.get('isRange')) {
                  // 当前坐标距离哪个 thumb 近就移动哪个
                  var percent = ratio * 100;
                  var valuePercentArray = me.get('valuePercentArray');
                  if (Math.abs(valuePercentArray[0].percent - percent) > Math.abs(valuePercentArray[1].percent - percent)) {
                      dragThumbIndex = 1;
                  }
                  updatePosition(ratio, dragThumbIndex);
              }
              else {
                  updatePosition(ratio);
              }
              me.set('dragThumbIndex', dragThumbIndex);
              startDrag();
              Yox.dom.on(DOCUMENT, RAW_EVENT_MOUSEMOVE, onTrackMouseMove);
              Yox.dom.on(DOCUMENT, RAW_EVENT_MOUSEUP, onTrackMouseUp);
          };
          var onTrackMouseMove = function (event) {
              updatePosition(getRatio(event), dragThumbIndex);
          };
          var onTrackMouseUp = function () {
              Yox.dom.off(DOCUMENT, RAW_EVENT_MOUSEMOVE, onTrackMouseMove);
              Yox.dom.off(DOCUMENT, RAW_EVENT_MOUSEUP, onTrackMouseUp);
              me.set('dragThumbIndex', -1);
              element = UNDEFINED;
              endDrag();
          };
          var getRatio = function (event) {
              var mouseEvent = event.originalEvent;
              var rect = element.getBoundingClientRect();
              var ratio = me.get('vertical')
                  ? (rect.bottom - mouseEvent.clientY) / rect.height
                  : (mouseEvent.clientX - rect.left) / rect.width;
              if (ratio < 0) {
                  ratio = 0;
              }
              else if (ratio > 1) {
                  ratio = 1;
              }
              return me.get('reverse') ? (1 - ratio) : ratio;
          };
          var updatePosition = function (ratio, index) {
              var newValue = (max - min) * ratio + min;
              if (step > 0) {
                  var count = Math.round(newValue / step);
                  newValue = step * count;
              }
              if (me.get('isRange')) {
                  me.set('innerValue.' + index, newValue);
                  var value = me.copy(me.get('innerValue'));
                  // 交换值
                  if (value[0] > value[1]) {
                      var temp = value[0];
                      value[0] = value[1];
                      value[1] = temp;
                  }
                  me.set('value', value);
              }
              else {
                  me.set({
                      innerValue: newValue,
                      value: newValue,
                  });
              }
          };
          // @ts-ignore
          this.onTrackMouseDown = onTrackMouseDown;
      },
      components: {
          Tooltip: Tooltip,
      },
  });

  var template$z = (function(){var $0,$1=void 0,$3=!0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_i(_p(_K,'$slot_children',_O.$slot_children),function(_K,_O,_P,_Q){_r(_K,'type',_O.type).value!==2?_N.push(function(_M){_p(_K,'itemStyle',_O.itemStyle).value?_M.nativeStyles=_b(_p(_K,'itemStyle',_O.itemStyle).value):$1;return _M}({children:function(){var _N=[];($0=_q(_K,_K.length-1).value,$0?_N.push($0):$1);return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-space-item'},operator:_y,tag:'div',type:3})):_N.push({isPure:$3,operator:_x,text:'',type:2});});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-space'+(_p(_K,'vertical',_O.vertical).value?' bell-space-vertical':' bell-space-horizontal')+(_p(_K,'align',_O.align).value?' bell-space-align-'+_v(_p(_K,'align',_O.align).value):'')+(_p(_K,'autoWrap',_O.autoWrap).value?' bell-space-auto-wrap':'')+(_p(_K,'block',_O.block).value?' bell-space-block':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Space = Yox.define({
      template: template$z,
      name: 'bell-Space',
      propTypes: {
          size: {
              type: [RAW_NUMERIC, RAW_ARRAY],
              value: [8, 10],
          },
          align: {
              type: oneOf(['start', 'end', 'center', 'baseline']),
              value: 'center',
          },
          block: {
              type: RAW_BOOLEAN,
          },
          vertical: {
              type: RAW_BOOLEAN,
          },
          autoWrap: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          sizeArray: function () {
              var size = this.get('size');
              if (size == NULL) {
                  return;
              }
              // 配置两个方向的间距
              if (Yox.is.array(size) && (size[0] > 0 || size[1] > 0)) {
                  return size;
              }
              // 配置一个方向的间距
              var value = toNumber(size);
              if (value > 0) {
                  return [value];
              }
          },
          inlineStyle: function () {
              return spaceListStyle(this.get('sizeArray'), this.get('vertical'), this.get('autoWrap'), this.get('style'));
          },
          itemStyle: function () {
              return spaceItemStyle(this.get('sizeArray'), this.get('vertical'), this.get('autoWrap'));
          },
      }
  });

  var template$A = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-statistic-title'},$6={'class':'bell-statistic-header'},$7={'class':'bell-statistic-content-prefix'},$8={'class':'bell-statistic-content-value'},$9={'class':'bell-statistic-content-suffix'},$10={rows:1};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3});($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3});_N.push({context:_D,operator:_z,props:{loading:_p(_K,'loading',_O.loading).value,text:$10},slots:{$slot_children:function(_L){var _N=[];_N.push(function(_M){_p(_K,'color',_O.color).value?_M.nativeStyles={color:_p(_K,'color',_O.color).value}:$1;return _M}({children:function(){var _N=[];_p(_K,'prefix',_O.prefix).value||_p(_K,'$slot_prefix',_O.$slot_prefix).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_prefix',_L)||function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'prefix',_O.prefix).value),type:1});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({context:_D,nativeAttrs:$8,operator:_y,tag:'div',text:_v(_p(_K,'value',_O.value).value),type:3});_p(_K,'suffix',_O.suffix).value||_p(_K,'$slot_suffix',_O.$slot_suffix).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_suffix',_L)||function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'suffix',_O.suffix).value),type:1});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$9,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-statistic-content'},operator:_y,tag:'div',type:3}));return _N.length?_N:$1}},tag:'Skeleton',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-statistic'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var template$B = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-skeleton-header'},$6={'class':'bell-skeleton-text-row'},$7={'class':'bell-skeleton-text'},$8={'class':'bell-skeleton-content'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_p(_K,'loading',_O.loading).value?_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'imageSize',_O.imageSize).value?_N.push({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:{'class':'bell-skeleton-image bell-skeleton-image-'+_v(_p(_K,'imageShape',_O.imageShape).value)},nativeStyles:{height:_p(_K,'imageSize',_O.imageSize).value,width:_p(_K,'imageSize',_O.imageSize).value},operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({children:function(){var _N=[];_p(_K,'computedText',_O.computedText).value?_N.push({children:function(){var _N=[];_i(_p(_K,'computedText',_O.computedText),function(_K,_O,_P,_Q,index){_N.push({context:_D,nativeAttrs:$6,nativeStyles:{width:_r(_K,'width',_O.width).value},operator:_y,tag:'li',type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'ul',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-skeleton'+(_p(_K,'active',_O.active).value?' bell-skeleton-active':'')+(_p(_K,'imageSize',_O.imageSize).value?' bell-skeleton-with-image':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3})):($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));}})();

  var Skeleton = Yox.define({
      template: template$B,
      name: 'bell-Skeleton',
      propTypes: {
          text: {
              type: [RAW_BOOLEAN, RAW_OBJECT],
              value: TRUE,
          },
          image: {
              type: [RAW_BOOLEAN, RAW_OBJECT],
          },
          loading: {
              type: RAW_BOOLEAN,
          },
          active: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          computedText: function () {
              var text = this.get('text');
              if (text) {
                  var rows = 3;
                  if (Yox.is.object(text) && text.rows) {
                      rows = text.rows;
                  }
                  var allWidth = Yox.is.array(text.width) ? text.width : [];
                  var lastWidth = Yox.is.number(text.width) ? text.width : (rows > 1 ? '60%' : '100%');
                  var result = [];
                  for (var i = 0; i < rows; i++) {
                      var width = allWidth[i] || (i === rows - 1 ? lastWidth : '100%');
                      result.push({
                          width: Yox.is.number(width) ? toPixel(width) : width
                      });
                  }
                  return result;
              }
          },
          imageSize: function () {
              var image = this.get('image');
              if (image) {
                  var size = 48;
                  if (Yox.is.object(image)) {
                      if (Yox.is.number(image.size)) {
                          size = image.size;
                      }
                      if (image.size === RAW_SMALL) {
                          size = 36;
                      }
                      if (image.size === RAW_LARGE) {
                          size = 60;
                      }
                  }
                  return toPixel(size);
              }
          },
          imageShape: function () {
              var image = this.get('image');
              if (image) {
                  var defaultShape = RAW_SHAPE_CIRCLE;
                  if (Yox.is.boolean(image)) {
                      return defaultShape;
                  }
                  if (image.shape === RAW_SHAPE_ROUND) {
                      return RAW_SHAPE_ROUND;
                  }
                  return defaultShape;
              }
          }
      }
  });

  var Statistic = Yox.define({
      template: template$A,
      name: 'bell-Statistic',
      propTypes: {
          title: {
              type: RAW_STRING,
              required: TRUE,
          },
          value: {
              type: [RAW_STRING, RAW_NUMBER],
          },
          loading: {
              type: RAW_BOOLEAN,
          },
          prefix: {
              type: RAW_STRING,
          },
          suffix: {
              type: RAW_STRING,
          },
          color: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      components: {
          Skeleton: Skeleton,
      }
  });

  var template$C = (function(){var $0,$1=void 0,$3=!0,$4=!1,$5={'class':'bell-switch-thumb'},$6={'class':'bell-switch-label'},$7='isFocus',$8=$3,$9=$4;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;!_p(_K,'disabled',_O.disabled).value&&!_p(_K,'loading',_O.loading).value?(_l(_M,'nativeAttrs','tabindex','0'),_l(_M,'events','click',_e('click','onClick()','click','','onClick')),_l(_M,'events','focus',_e('focus',"set('isFocus', true)",'focus','','set',{execute:function(_R,_S){return [$7,$8]}})),_l(_M,'events','blur',_e('blur',"set('isFocus', false)",'blur','','set',{execute:function(_R,_S){return [$7,$9]}}))):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$5,operator:_y,tag:'div',type:3});_p(_K,'$slot_on',_O.$slot_on).value||_p(_K,'$slot_off',_O.$slot_off).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_'+(_p(_K,'checked',_O.checked).value?'on':'off')),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-switch'+(_p(_K,'size',_O.size).value?' bell-switch-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'checked',_O.checked).value?' bell-switch-checked':'')+(_p(_K,'loading',_O.loading).value?' bell-switch-loading':_p(_K,'disabled',_O.disabled).value?' bell-switch-disabled':' bell-switch-enabled')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Switch = Yox.define({
      template: template$C,
      model: 'checked',
      name: 'bell-Switch',
      propTypes: {
          size: {
              type: oneOf([RAW_DEFAULT, RAW_SMALL]),
              value: RAW_DEFAULT,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          checked: {
              type: RAW_BOOLEAN,
          },
          loading: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              isFocus: FALSE,
          };
      },
      methods: {
          onClick: function (event) {
              if (event) {
                  event.stop();
              }
              this.fire({
                  type: 'change',
                  ns: 'switch',
              }, {
                  checked: this.toggle('checked')
              });
          }
      },
      afterMount: function () {
          onClickEventByEnterPress(this);
      }
  });

  var template$D = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-steps'+(_p(_K,'size',_O.size).value?' bell-steps-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'vertical',_O.vertical).value?' bell-steps-vertical':' bell-steps-horizontal')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  function setStepIndex(children) {
      children.forEach(function (vnode, index) {
          if (vnode.tag === 'Step') {
              vnode.props.index = index;
          }
      });
  }

  var Steps = Yox.define({
      template: template$D,
      name: 'bell-Steps',
      propTypes: {
          current: {
              type: RAW_NUMERIC,
              value: 0,
          },
          status: {
              type: oneOf([RAW_WAIT, RAW_PROCESS, RAW_FINISH, RAW_TYPE_ERROR]),
              value: RAW_PROCESS,
          },
          size: {
              type: oneOf([RAW_SMALL]),
          },
          vertical: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      beforeRender: function () {
          var children = this.get(RAW_SLOT_CHILDREN);
          if (children) {
              setStepIndex(children);
          }
      },
      watchers: {
          current: function (current) {
              this.fire({
                  type: 'currentChange',
                  ns: 'steps'
              }, {
                  current: current,
              }, TRUE);
          },
          status: function (status) {
              this.fire({
                  type: 'statusChange',
                  ns: 'steps'
              }, {
                  status: status,
              }, TRUE);
          }
      },
  });

  var template$E = (function(){var $1=void 0,$3=!0,$5={'class':'bell-step-indicator'},$6={'class':'bell-step-title'},$7={'class':'bell-step-description'},$8={'class':'bell-step-content'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_p(_K,'stepStatus',_O.stepStatus).value===_p(_K,'RAW_FINISH',_O.RAW_FINISH).value?_N.push({context:_D,operator:_z,props:{className:'bell-step-icon',name:'check-fill'},tag:'Icon',type:4}):_p(_K,'stepStatus',_O.stepStatus).value===_p(_K,'RAW_TYPE_ERROR',_O.RAW_TYPE_ERROR).value?_N.push({context:_D,operator:_z,props:{className:'bell-step-icon',name:'close-fill'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'stepNumber',_O.stepNumber).value),type:1});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3});_p(_K,'description',_O.description).value?_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'div',text:_v(_p(_K,'description',_O.description).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-step'+(_p(_K,'stepStatus',_O.stepStatus).value?' bell-step-'+_v(_p(_K,'stepStatus',_O.stepStatus).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Step = Yox.define({
      template: template$E,
      name: 'bell-Step',
      propTypes: {
          index: {
              type: RAW_NUMBER,
              required: TRUE,
          },
          title: {
              type: RAW_STRING,
              required: TRUE,
          },
          description: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var steps = findComponentUpward(options.parent, 'bell-Steps');
          return {
              RAW_FINISH: RAW_FINISH,
              RAW_TYPE_ERROR: RAW_TYPE_ERROR,
              current: steps.get('current'),
              status: steps.get('status'),
          };
      },
      computed: {
          stepStatus: function () {
              var index = this.get('index');
              var current = this.get('current');
              if (index < current) {
                  return RAW_FINISH;
              }
              if (index > current) {
                  return RAW_WAIT;
              }
              return this.get('status');
          },
          stepNumber: function () {
              return this.get('index') + 1;
          }
      },
      events: {
          currentChange: {
              listener: function (_, data) {
                  this.set({
                      current: data.current,
                  });
              },
              ns: 'steps',
          },
          statusChange: {
              listener: function (_, data) {
                  this.set({
                      status: data.status,
                  });
              },
              ns: 'steps',
          },
      },
      components: {
          Icon: Icon,
      }
  });

  var template$F = (function(){var $0,$1=void 0,$3=!0,$4=!1,$5={'class':'bell-select-prefix'},$6={'class':'bell-select-placeholder'},$7={'class':'bell-select-values'},$8='isFocus',$9=$3,$10=$4,$11={'class':'bell-select-overlay'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{gap:'5',placement:_p(_K,'placement',_O.placement).value,trigger:_p(_K,'RAW_CUSTOM',_O.RAW_CUSTOM).value,triggerMutable:_p(_K,'multiple',_O.multiple).value,visible:_p(_K,'isVisible',_O.isVisible).value,widthAlign:$3},slots:{$slot_children:function(_L){var _N=[];_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?(_l(_M,'nativeAttrs','tabindex','0'),_l(_M,'events','click',_e('click','onClick()','click','','onClick')),_l(_M,'events','focus',_e('focus',"set('isFocus', true)",'focus','','set',{execute:function(_R,_S){return [$8,$9]}})),_l(_M,'events','blur',_e('blur',"set('isFocus', false)",'blur','','set',{execute:function(_R,_S){return [$8,$10]}}))):$1;_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_p(_K,'prefix',_O.prefix).value||_p(_K,'$slot_prefix',_O.$slot_prefix).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_prefix',_L)||function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-select-prefix-icon',name:_p(_K,'prefix',_O.prefix).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_o(_K,_K.length-1,'selectedOptions.length',$3).value===0?_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'placeholder',_O.placeholder).value),type:3}):_p(_K,'multiple',_O.multiple).value?_N.push({children:function(){var _N=[];_i(_p(_K,'selectedOptions',_O.selectedOptions),function(_K,_O,_P,_Q,index){_N.push({context:_D,events:{close:_e('close','onOptionRemove($event, index)','close','','onOptionRemove',{execute:function(_R,_S){return [_R,index]}},$3)},operator:_z,parent:_L,props:{closable:$3},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_r(_K,'text',_O.text).value),type:1});return _N.length?_N:$1}},tag:'Tag',type:4});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({context:_D,nativeAttrs:{'class':'bell-select-value',title:_o(_K,_K.length-1,'selectedOptions.0.text',$3).value},operator:_y,tag:'div',text:_v(_o(_K,_K.length-1,'selectedOptions.0.text',$3).value),type:3});_p(_K,'showClear',_O.showClear).value&&_o(_K,_K.length-1,'selectedOptions.length',$3).value?_N.push({context:_D,events:{'click.native':_e('click.native','onClearClick()','click','native','onClearClick',$1,$1,$3)},operator:_z,parent:_L,props:{className:'bell-select-clear-icon',name:'close-circle-fill'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-select-arrow-icon',name:'arrow-down-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-select'+(_p(_K,'status',_O.status).value?' bell-select-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'size',_O.size).value?' bell-select-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'block',_O.block).value?' bell-select-block':'')+(_p(_K,'isVisible',_O.isVisible).value?' bell-select-opened':'')+(_p(_K,'showClear',_O.showClear).value?' bell-select-with-clear':'')+(_p(_K,'placement',_O.placement).value===_p(_K,'RAW_TOP',_O.RAW_TOP).value?' bell-select-reversed':'')+(_p(_K,'disabled',_O.disabled).value?' bell-select-disabled':' bell-select-enabled')+(_p(_K,'prefix',_O.prefix).value||_p(_K,'$slot_prefix',_O.$slot_prefix).value?' bell-select-with-prefix':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));return _N.length?_N:$1},$slot_overlay:function(_L){var _N=[];_N.push({children:function(){var _N=[];_p(_K,'options',_O.options).value?_i(_p(_K,'options',_O.options),function(_K,_O,_P,_Q){_N.push({context:_D,operator:_z,parent:_L,props:{disabled:_r(_K,'disabled',_O.disabled).value,text:_r(_K,'text',_O.text).value,value:_r(_K,'value',_O.value).value},tag:'Option',type:4});},function(){_N.push({context:_D,operator:_z,parent:_L,props:{simple:$3},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:'暂无数据',type:1});return _N.length?_N:$1}},tag:'Empty',type:4});}):($0={children:_k('$slot_children',_L)||function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{simple:$3},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:'暂无数据',type:1});return _N.length?_N:$1}},tag:'Empty',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$11,operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'Popover',type:4});}})();

  var template$G = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-tag-icon'},$6={'class':'bell-tag-content'},$7={'class':'bell-tag-close'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'customColor',_O.customColor).value||_p(_K,'style',_O.style).value?_M.nativeStyles=_b([_p(_K,'customColor',_O.customColor).value?{backgroundColor:!_p(_K,'checkable',_O.checkable).value||_p(_K,'checked',_O.checked).value?_p(_K,'customColor',_O.customColor).value:$1,color:_p(_K,'checkable',_O.checkable).value&&!_p(_K,'checked',_O.checked).value?_p(_K,'customColor',_O.customColor).value:$1}:$1,_p(_K,'style',_O.style).value]):$1;_p(_K,'checkable',_O.checkable).value?_l(_M,'events','click',_e('click','toggleChecked()','click','','toggleChecked')):$1;return _M}({children:function(){var _N=[];_p(_K,'$slot_icon',_O.$slot_icon).value||_p(_K,'icon',_O.icon).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_icon')||function(){var _N=[];_N.push({context:_D,operator:_z,props:{name:_p(_K,'icon',_O.icon).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3});_p(_K,'closable',_O.closable).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{name:'close-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_f('click','close.tag','click','','close','tag')},nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-tag'+(_p(_K,'type',_O.type).value?' bell-tag-'+_v(_p(_K,'type',_O.type).value):'')+(_p(_K,'presetName',_O.presetName).value?' bell-tag-'+_v(_p(_K,'presetName',_O.presetName).value):'')+(_p(_K,'customColor',_O.customColor).value?' bell-tag-pure':'')+(_p(_K,'checkable',_O.checkable).value?' bell-tag-checkable':'')+(_p(_K,'closable',_O.closable).value?' bell-tag-closable':'')+(_p(_K,'checked',_O.checked).value?' bell-tag-checked':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Tag = Yox.define({
      template: template$G,
      name: 'bell-Tag',
      propTypes: {
          type: {
              type: oneOf(RAW_TYPE_ARRAY),
          },
          checkable: {
              type: RAW_BOOLEAN,
          },
          closable: {
              type: RAW_BOOLEAN,
          },
          checked: {
              type: RAW_BOOLEAN,
          },
          color: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          presetName: function () {
              var color = this.get('color');
              if (color && /^[a-z]+$/.test(color)) {
                  return color;
              }
          },
          customColor: function () {
              var color = this.get('color');
              if (color && (/^#[\w\d]+$/.test(color) || /rgb/i.test(color))) {
                  return color;
              }
          },
      },
      methods: {
          toggleChecked: function () {
              this.fire({
                  type: 'change',
                  ns: 'tag',
              }, {
                  checked: !this.get('checked'),
              });
          }
      },
      components: {
          Icon: Icon,
      }
  });

  var template$H = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-empty'+(_p(_K,'simple',_O.simple).value?' bell-empty-simple':'')+(_p(_K,'$slot_children',_O.$slot_children).value?' bell-empty-with-content':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Empty = Yox.define({
      template: template$H,
      name: 'bell-Empty',
      propTypes: {
          simple: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          space: {
              type: RAW_NUMERIC,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          inlineStyle: function () {
              var result = [];
              var space = toNumber(this.get('space'));
              if (space > 0) {
                  result.push({
                      marginTop: toPixel(space),
                      marginBottom: toPixel(space),
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          }
      },
  });

  var template$I = (function(){var $0,$1=void 0,$3=!0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;_p(_K,'text',_O.text).value?_l(_M,'nativeAttrs','title',_p(_K,'text',_O.text).value):$1;!_p(_K,'disabled',_O.disabled).value?_l(_M,'events','click',_e('click','onClick()','click','','onClick')):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children')||function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'text',_O.text).value),type:1});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-select-option'+(_p(_K,'disabled',_O.disabled).value?' bell-select-option-disabled':' bell-select-option-enabled')+(_p(_K,'isSelected',_O.isSelected).value?' bell-select-option-active':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  function isOptionSelected(values, value) {
      return Yox.is.array(values)
          ? Yox.array.has(values, value, FALSE)
          : values == value;
  }
  function getOptionsByChildren(instance, children) {
      var result = [];
      var next = function (children) {
          children.forEach(function (vnode) {
              var tag = vnode.tag, props = vnode.props, slots = vnode.slots;
              if (tag === 'Option' && props) {
                  var text = props.text, value = props.value;
                  result.push({
                      text: text,
                      value: value,
                  });
              }
              else if (tag === 'OptionGroup' && slots && slots[RAW_SLOT_CHILDREN]) {
                  var children_1 = slots[RAW_SLOT_CHILDREN](instance);
                  if (children_1) {
                      next(children_1);
                  }
              }
          });
      };
      next(children);
      return result;
  }

  var Option = Yox.define({
      template: template$I,
      name: 'bell-Option',
      propTypes: {
          value: {
              type: [RAW_STRING, RAW_NUMBER],
              required: TRUE,
          },
          text: {
              type: RAW_STRING,
              required: TRUE,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var select = findComponentUpward(options.parent, 'bell-Select');
          var props = options.props || {};
          return {
              isSelected: select
                  ? isOptionSelected(select.get('value'), props.value)
                  : FALSE
          };
      },
      events: {
          change: {
              listener: function (_, data) {
                  this.set({
                      isSelected: isOptionSelected(data.value, this.get('value'))
                  });
              },
              ns: 'select'
          }
      },
      methods: {
          onClick: function () {
              this.fire({
                  type: 'click',
                  ns: 'option',
              }, {
                  value: this.get('value'),
              });
          }
      }
  });

  var Select = Yox.define({
      template: template$F,
      name: 'bell-Select',
      propTypes: {
          options: {
              type: RAW_ARRAY,
          },
          placeholder: {
              type: RAW_STRING,
              value: '请选择...'
          },
          value: {
              type: [RAW_ARRAY, RAW_STRING, RAW_NUMBER],
          },
          status: {
              type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
          },
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          placement: {
              type: oneOf([RAW_TOP, RAW_BOTTOM]),
              value: RAW_BOTTOM,
          },
          multiple: {
              type: RAW_BOOLEAN,
          },
          showClear: {
              type: RAW_BOOLEAN,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          prefix: {
              type: RAW_STRING,
          },
          width: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              RAW_TOP: RAW_TOP,
              RAW_CUSTOM: RAW_CUSTOM,
              isFocus: FALSE,
              isVisible: FALSE,
          };
      },
      computed: {
          allOptions: function () {
              var options = this.get('options');
              if (options) {
                  return options;
              }
              var children = this.get(RAW_SLOT_CHILDREN);
              if (children) {
                  return getOptionsByChildren(this, children);
              }
              return [];
          },
          selectedOptions: function () {
              var value = this.get('value');
              var allOptions = this.get('allOptions');
              var result = [];
              Yox.array.each(allOptions, function (item) {
                  if (isOptionSelected(value, item.value)) {
                      result.push(item);
                  }
              });
              return result;
          },
          inlineStyle: function () {
              var result = [];
              var width = this.get('width');
              if (width) {
                  result.push({
                      width: toPixel(width)
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      },
      events: {
          click: {
              listener: function (event, data) {
                  event.stop();
                  this.selectOption(data.value);
                  if (!this.get('multiple')) {
                      this.set('isVisible', FALSE);
                  }
              },
              ns: 'option',
          },
          outside: {
              listener: function (event) {
                  event.stop();
                  this.set('isVisible', FALSE);
              },
              ns: 'popover',
          }
      },
      methods: {
          onClick: function (event) {
              this.toggle('isVisible');
              fireClickEvent(event);
          },
          onClearClick: function (event) {
              // 停止冒泡，否则会展开下拉框
              event.stop();
              fireClickEvent(event);
              this.set('value', UNDEFINED);
              this.fireChange(UNDEFINED);
          },
          onOptionRemove: function (event, index) {
              event.stop();
              this.removeAt('value', index);
              this.fireChange(this.get('value'));
          },
          selectOption: function (value) {
              var me = this;
              var values = me.get('value');
              if (me.get('multiple')) {
                  if (Yox.is.array(values)
                      && Yox.array.has(values, value)) {
                      return;
                  }
                  me.append('value', value);
                  me.fireChange(me.get('value'));
              }
              else {
                  if (values !== value) {
                      me.set('value', value);
                      me.fireChange(value);
                  }
              }
          },
          deselectOption: function (value) {
              var me = this;
              var values = me.get('value');
              if (me.get('multiple')) {
                  var selectedIndex = Yox.is.array(values)
                      ? Yox.array.indexOf(values, value)
                      : -1;
                  if (selectedIndex < 0) {
                      return;
                  }
                  me.removeAt('value', selectedIndex);
                  me.fireChange(me.get('value'));
              }
              else {
                  if (values !== value) {
                      return;
                  }
                  me.set('value', UNDEFINED);
                  me.fireChange(UNDEFINED);
              }
          },
          fireChange: function (value) {
              this.fire({
                  type: 'change',
                  ns: 'select',
              }, {
                  value: value,
              });
              this.fire({
                  type: 'change',
                  ns: 'select',
              }, {
                  value: value,
              }, TRUE);
          }
      },
      afterMount: function () {
          onClickEventByEnterPress(this);
      },
      components: {
          Tag: Tag,
          Icon: Icon,
          Empty: Empty,
          Popover: Popover,
          Option: Option,
      },
  });

  var template$J = (function(){var $0,$1=void 0,$5={'class':'bell-select-option-group-title'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'div',text:_v(_p(_K,'label',_O.label).value),type:3});($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-select-option-group'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var OptionGroup = Yox.define({
      template: template$J,
      name: 'bell-OptionGroup',
      propTypes: {
          label: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$K = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-pagination-total'},$6={'class':'bell-pagination-separator'},$7={'class':'bell-pagination-count'},$8={'class':'bell-pagination-simple'},$9={'class':'bell-pagination-ellipsis'},$10=5,$11={'class':'bell-pagination-list'},$12={'class':'bell-pagination-jumper'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'showTotal',_O.showTotal).value?_N.push({children:function(){var _N=[];_N.push({isPure:$3,operator:_w,text:'共 '+_v(_p(_K,'total',_O.total).value)+' 条',type:1});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'span',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_o(_K,_K.length-1,'pageSizeList.length',$3).value>0?_N.push({context:_D,model:_d(_p(_K,'pageSize',_O.pageSize)),operator:_z,props:{placement:_p(_K,'placement',_O.placement).value,size:_p(_K,'size',_O.size).value},slots:{$slot_children:function(_L){var _N=[];_i(_p(_K,'pageSizeList',_O.pageSizeList),function(_K,_O,_P,_Q){_N.push({context:_D,operator:_z,parent:_L,props:{text:_r(_K,'text',_O.text).value,value:_r(_K,'value',_O.value).value},tag:'Option',type:4});});return _N.length?_N:$1}},tag:'Select',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'simple',_O.simple).value?_N.push({children:function(){var _N=[];_N.push(function(_M){_p(_K,'current',_O.current).value!==1?(_l(_M,'events','click.native',_e('click.native','onPrevPageClick()','click','native','onPrevPageClick',$1,$1,$3)),_l(_M,'events','focus.native',_e('focus.native','onPrevPageFocus()','focus','native','onPrevPageFocus',$1,$1,$3)),_l(_M,'events','blur.native',_e('blur.native','onPrevPageBlur()','blur','native','onPrevPageBlur',$1,$1,$3))):$1;return _M}({context:_D,key:'prev',operator:_z,props:{disabled:_p(_K,'current',_O.current).value===1},slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_prev',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'PrevPage',type:4}));_N.push({context:_D,model:_d(_p(_K,'page',_O.page)),operator:_z,props:{className:'bell-pagination-simple-input',size:_p(_K,'size',_O.size).value},ref:'simpleInput',tag:'Input',type:4});_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$6,operator:_y,tag:'span',text:'/',type:3});_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'span',text:_v(_p(_K,'count',_O.count).value),type:3});_N.push(function(_M){_p(_K,'current',_O.current).value!==_p(_K,'count',_O.count).value?(_l(_M,'events','click.native',_e('click.native','onNextPageClick()','click','native','onNextPageClick',$1,$1,$3)),_l(_M,'events','focus.native',_e('focus.native','onNextPageFocus()','focus','native','onNextPageFocus',$1,$1,$3)),_l(_M,'events','blur.native',_e('blur.native','onNextPageBlur()','blur','native','onNextPageBlur',$1,$1,$3))):$1;return _M}({context:_D,key:'next',operator:_z,props:{disabled:_p(_K,'current',_O.current).value===_p(_K,'count',_O.count).value},slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_next',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'NextPage',type:4}));return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3}):_N.push({children:function(){var _N=[];_N.push(function(_M){_p(_K,'current',_O.current).value!==1?(_l(_M,'events','click.native',_e('click.native','onPrevPageClick()','click','native','onPrevPageClick',$1,$1,$3)),_l(_M,'events','focus.native',_e('focus.native','onPrevPageFocus()','focus','native','onPrevPageFocus',$1,$1,$3)),_l(_M,'events','blur.native',_e('blur.native','onPrevPageBlur()','blur','native','onPrevPageBlur',$1,$1,$3))):$1;return _M}({context:_D,key:'prev',operator:_z,props:{disabled:_p(_K,'current',_O.current).value===1},slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_prev',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'PrevPage',type:4}));_i(_p(_K,'pageList',_O.pageList),function(_K,_O,_P,_Q){_r(_K,'prev',_O.prev).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-pagination-icon',name:'arrow-left-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','decreaseCurrent(5)','click','','decreaseCurrent',{execute:function(_R,_S){return [$10]}})},key:'prev-ellipsis',nativeAttrs:$9,operator:_y,tag:'div',type:3}):_r(_K,'next',_O.next).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-pagination-icon',name:'arrow-right-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','increaseCurrent(5)','click','','increaseCurrent',{execute:function(_R,_S){return [$10]}})},key:'next-ellipsis',nativeAttrs:$9,operator:_y,tag:'div',type:3}):_N.push(function(_M){!_r(_K,'active',_O.active).value?(_l(_M,'nativeAttrs','tabindex','0'),_l(_M,'events','click',_e('click','onPageClick(this.value)','click','','onPageClick',{execute:function(_R,_S){return [_r(_K,'value',_O.value).value]}})),_l(_M,'events','focus',_e('focus','onPageFocus(this.value)','focus','','onPageFocus',{execute:function(_R,_S){return [_r(_K,'value',_O.value).value]}})),_l(_M,'events','blur',_e('blur','onPageBlur(this.value)','blur','','onPageBlur',{execute:function(_R,_S){return [_r(_K,'value',_O.value).value]}}))):$1;return _M}({context:_D,key:'page'+_v(_r(_K,'value',_O.value).value),nativeAttrs:{'class':'bell-pagination-item'+(_r(_K,'active',_O.active).value?' bell-pagination-item-active':'')},operator:_y,tag:'div',text:_v(_r(_K,'value',_O.value).value),type:3}));});_N.push(function(_M){_p(_K,'current',_O.current).value!==_p(_K,'count',_O.count).value?(_l(_M,'events','click.native',_e('click.native','onNextPageClick()','click','native','onNextPageClick',$1,$1,$3)),_l(_M,'events','focus.native',_e('focus.native','onNextPageFocus()','focus','native','onNextPageFocus',$1,$1,$3)),_l(_M,'events','blur.native',_e('blur.native','onNextPageBlur()','blur','native','onNextPageBlur',$1,$1,$3))):$1;return _M}({context:_D,key:'next',operator:_z,props:{disabled:_p(_K,'current',_O.current).value===_p(_K,'count',_O.count).value},slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_next',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'NextPage',type:4}));return _N.length?_N:$1}(),context:_D,nativeAttrs:$11,operator:_y,tag:'div',type:3});_p(_K,'showJumper',_O.showJumper).value?_N.push({children:function(){var _N=[];_N.push({context:_D,model:_d(_p(_K,'page',_O.page)),operator:_z,props:{className:'bell-pagination-jumper-input',placeholder:'请输入页码',size:_p(_K,'size',_O.size).value},ref:'jumperInput',tag:'Input',type:4});_N.push({context:_D,events:{click:_e('click','onJumpClick()','click','','onJumpClick',$1,$3)},operator:_z,props:{size:_p(_K,'size',_O.size).value,type:'primary'},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:'跳转',type:1});return _N.length?_N:$1}},tag:'Button',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$12,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-pagination'+(_p(_K,'size',_O.size).value?' bell-pagination-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'total',_O.total).value==0?' bell-pagination-hidden':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var template$L = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_p(_K,'$slot_children',_O.$slot_children).value?_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?_l(_M,'nativeAttrs','tabindex','0'):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-pagination-custom-prev'+(_p(_K,'disabled',_O.disabled).value?' bell-pagination-custom-disabled':'')},operator:_y,tag:'div',type:3})):_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?_l(_M,'nativeAttrs','tabindex','0'):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-pagination-icon',name:'arrow-left-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-pagination-item bell-pagination-prev'+(_p(_K,'disabled',_O.disabled).value?' bell-pagination-item-disabled':'')},operator:_y,tag:'div',type:3}));}})();

  var PrevPage = Yox.define({
      template: template$L,
      propTypes: {
          disabled: {
              type: RAW_BOOLEAN,
          },
      }
  });

  var template$M = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_p(_K,'$slot_children',_O.$slot_children).value?_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?_l(_M,'nativeAttrs','tabindex','0'):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-pagination-custom-next'+(_p(_K,'disabled',_O.disabled).value?' bell-pagination-custom-disabled':'')},operator:_y,tag:'div',type:3})):_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?_l(_M,'nativeAttrs','tabindex','0'):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-pagination-icon',name:'arrow-right-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-pagination-item bell-pagination-next'+(_p(_K,'disabled',_O.disabled).value?' bell-pagination-item-disabled':'')},operator:_y,tag:'div',type:3}));}})();

  var NextPage = Yox.define({
      template: template$M,
      propTypes: {
          disabled: {
              type: RAW_BOOLEAN,
          },
      }
  });

  var Pagination = Yox.define({
      template: template$K,
      model: 'current',
      name: 'bell-Pagination',
      propTypes: {
          size: {
              type: oneOf([RAW_DEFAULT, RAW_SMALL]),
              value: RAW_DEFAULT,
          },
          simple: {
              type: RAW_BOOLEAN,
          },
          total: {
              type: RAW_NUMERIC,
              required: TRUE,
          },
          current: {
              type: RAW_NUMERIC,
              value: 1,
          },
          pageSize: {
              type: RAW_NUMERIC,
              value: 10,
          },
          pageSizeOptions: {
              type: RAW_ARRAY,
          },
          showJumper: {
              type: RAW_BOOLEAN,
          },
          showTotal: {
              type: RAW_BOOLEAN,
          },
          placement: {
              type: oneOf([RAW_TOP, RAW_BOTTOM]),
              value: RAW_BOTTOM,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              page: '',
              focused: '',
          };
      },
      computed: {
          pageList: function () {
              var result = [];
              var current = toNumber(this.get('current'));
              var count = toNumber(this.get('count'));
              if (count === 0) {
                  return result;
              }
              // 先用 current 拆出中间的 5 个页码
              var start = current - 2;
              var end = current + 2;
              if (start < 1) {
                  start = 1;
                  end = Math.min(count, start + 4);
              }
              if (end > count) {
                  end = count;
                  start = Math.max(1, end - 4);
              }
              for (var i = start; i <= end; i++) {
                  result.push({
                      value: i,
                      active: i === current,
                  });
              }
              if (start > 1) {
                  // 和第一页至少隔了一个页码
                  if (start - 1 > 1) {
                      result.unshift({
                          prev: TRUE,
                      });
                  }
                  result.unshift({
                      value: 1,
                      active: 1 === current,
                  });
              }
              if (end < count) {
                  // 和最后一页至少隔了一个页码
                  if (count - end > 1) {
                      result.push({
                          next: TRUE,
                      });
                  }
                  result.push({
                      value: count,
                      active: count === current,
                  });
              }
              return result;
          },
          pageSizeList: function () {
              var result = [];
              var pageSizeOptions = this.get('pageSizeOptions');
              if (pageSizeOptions) {
                  Yox.array.each(pageSizeOptions, function (value) {
                      result.push({
                          text: value + ' 条/页',
                          value: value,
                      });
                  });
              }
              return result;
          },
          count: function () {
              var total = this.get('total');
              var pageSize = this.get('pageSize');
              return Math.ceil(total / pageSize);
          }
      },
      events: [
          {
              type: 'change',
              ns: 'select',
              listener: function (event, data) {
                  if (event.phase !== Yox.Event.PHASE_UPWARD) {
                      return;
                  }
                  event.stop();
                  // @ts-ignore
                  this.fire({
                      type: 'change',
                      ns: 'pagination',
                  }, {
                      pageSize: data.value
                  });
              }
          },
          {
              type: 'change',
              ns: 'input',
              listener: function (event) {
                  if (event.phase !== Yox.Event.PHASE_UPWARD) {
                      return;
                  }
                  // @ts-ignore
                  event.stop();
              }
          },
          {
              type: 'enter',
              ns: 'input',
              listener: function (event) {
                  if (event.phase !== Yox.Event.PHASE_UPWARD) {
                      return;
                  }
                  event.stop();
                  // @ts-ignore
                  this.onJumpClick();
              }
          }
      ],
      watchers: {
          current: function (current) {
              this.set('page', current);
          }
      },
      methods: {
          onPageClick: function (page) {
              this.setCurrent(page);
          },
          onPageFocus: function (page) {
              this.set({
                  focused: page + "_page",
              });
          },
          onPageBlur: function (page) {
              if (this.get('focused') === page + "_page") {
                  this.set({
                      focused: '',
                  });
              }
          },
          onPrevPageClick: function () {
              this.decreaseCurrent(1);
          },
          onPrevPageFocus: function () {
              this.set({
                  focused: 'prev_page',
              });
          },
          onPrevPageBlur: function () {
              if (this.get('focused') === 'prev_page') {
                  this.set({
                      focused: '',
                  });
              }
          },
          onNextPageClick: function () {
              this.increaseCurrent(1);
          },
          onNextPageFocus: function () {
              this.set({
                  focused: 'next_page',
              });
          },
          onNextPageBlur: function () {
              if (this.get('focused') === 'next_page') {
                  this.set({
                      focused: '',
                  });
              }
          },
          onJumpClick: function () {
              var page = this.get('page');
              if (page) {
                  if (Yox.is.numeric(page)) {
                      page = +page;
                      if (page > this.get('count')) {
                          this.showError('max');
                      }
                      else if (page <= 0) {
                          this.showError('min');
                      }
                      else {
                          this.setCurrent(page);
                      }
                  }
                  else {
                      this.showError('pattern');
                  }
              }
              else {
                  this.showError('empty');
              }
          },
          showError: function (error) {
              this.fire({
                  type: 'error',
                  ns: 'pagination',
              }, {
                  error: error,
              });
          },
          setCurrent: function (current) {
              if (this.get('current') === current) {
                  return;
              }
              this.set('current', current);
              this.fire({
                  type: 'change',
                  ns: 'pagination',
              }, {
                  current: current,
              });
          },
          decreaseCurrent: function (step) {
              var value = toNumber(this.get('current'), 1) - step;
              this.setCurrent(value < 1 ? 1 : value);
          },
          increaseCurrent: function (step) {
              var value = toNumber(this.get('current'), 1) + step;
              var count = this.get('count');
              this.setCurrent(value > count ? count : value);
          }
      },
      afterMount: function () {
          var me = this;
          onClickEventByEnterPress(me, function () {
              var focused = me.get('focused');
              if (focused) {
                  var parts = focused.split('_');
                  if (parts[1] === 'page') {
                      if (parts[0] === 'prev') {
                          me.onPrevPageClick();
                      }
                      else if (parts[0] === 'next') {
                          me.onNextPageClick();
                      }
                      else {
                          me.onPageClick(toNumber(parts[0]));
                      }
                  }
              }
          });
      },
      components: {
          Icon: Icon,
          Input: Input,
          Button: Button,
          Select: Select,
          PrevPage: PrevPage,
          NextPage: NextPage,
      }
  });

  var template$N = (function(){var $0,$1=void 0,$4=!1;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'draggable',_O.draggable).value?(_l(_M,'events','dragenter',_e('dragenter','handleDragenter()','dragenter','','handleDragenter')),_l(_M,'events','dragleave',_e('dragleave','handleDragleave()','dragleave','','handleDragleave')),_l(_M,'events','dragover',_e('dragover','handleDragover()','dragover','','handleDragover')),_l(_M,'events','drop',_e('drop','handleDrop()','drop','','handleDrop'))):$1;_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));_N.push({children:function(){var _N=[];_N.push({context:_D,events:{change:_e('change','handleChange()','change','','handleChange')},nativeAttrs:{accept:_p(_K,'accept',_O.accept).value,multiple:_n('multiple',_p(_K,'multiple',_O.multiple).value,$4),type:'file'},operator:_y,ref:'input',tag:'input',type:3});return _N.length?_N:$1}(),context:_D,operator:_y,ref:'form',tag:'form',type:3});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','handleClick()','click','','handleClick')},nativeAttrs:{'class':'bell-upload'+(_p(_K,'isFileHover',_O.isFileHover).value?' bell-upload-file-hover':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  // 本地文件用负数，避免和数据库自增 id 冲突
  var guid = -1;
  var Upload = Yox.define({
      template: template$N,
      name: 'bell-Upload',
      propTypes: {
          index: {
              type: RAW_NUMERIC,
          },
          draggable: {
              type: RAW_BOOLEAN,
          },
          multiple: {
              type: RAW_BOOLEAN,
          },
          accept: {
              type: RAW_STRING,
          },
          beforeUpload: {
              type: RAW_FUNCTION,
          },
          upload: {
              type: RAW_FUNCTION,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              isFileHover: FALSE,
          };
      },
      computed: {
          acceptPattern: function () {
              var accept = this.get('accept');
              return accept
                  ? new RegExp('(' + accept.replace(/\*/g, '.').replace(/\s*,\s*/g, '|') + ')')
                  : UNDEFINED;
          }
      },
      methods: {
          beforeUpload: function (fileList) {
              var me = this;
              var acceptPattern = me.get('acceptPattern');
              var formatedFileList = Yox.array.toArray(fileList)
                  .filter(function (file) {
                  return acceptPattern
                      ? acceptPattern.test(file.type)
                      : TRUE;
              })
                  .map(function (file) {
                  return {
                      // 用字符串类型表示本地文件
                      id: toString(guid--),
                      file: file,
                      name: file.name,
                      size: file.size,
                  };
              });
              if (formatedFileList.length > 1
                  && !me.get('multiple')) {
                  formatedFileList.length = 1;
              }
              var beforeUpload = me.get('beforeUpload');
              if (beforeUpload) {
                  var index = me.get('index');
                  beforeUpload({
                      index: index,
                      fileList: formatedFileList,
                      callback: function (result) {
                          if (Yox.is.array(result)) {
                              Yox.array.each(result, function (item) {
                                  me.upload(item);
                              });
                          }
                          else if (result) {
                              me.upload(result);
                          }
                      }
                  });
                  return;
              }
              Yox.array.each(formatedFileList, function (item) {
                  me.upload(item);
              });
          },
          upload: function (file) {
              var me = this;
              var index = me.get('index');
              var upload = me.get('upload');
              upload({
                  index: index,
                  id: file.id,
                  file: file.file,
                  onStart: function () {
                      me.fire({
                          type: 'start',
                          ns: 'upload',
                      }, file);
                  },
                  onEnd: function () {
                      me.fire({
                          type: 'end',
                          ns: 'upload',
                      }, file);
                      me.reset();
                  },
                  onAbort: function () {
                      me.fire({
                          type: 'abort',
                          ns: 'upload',
                      }, file);
                  },
                  onError: function () {
                      me.fire({
                          type: 'error',
                          ns: 'upload',
                      }, file);
                  },
                  onProgress: function (progress) {
                      me.fire({
                          type: 'progress',
                          ns: 'upload',
                      }, {
                          id: file.id,
                          file: file.file,
                          progress: progress,
                      });
                  },
                  onSuccess: function (response) {
                      me.fire({
                          type: 'success',
                          ns: 'upload',
                      }, {
                          id: file.id,
                          file: file.file,
                          response: response,
                      });
                  }
              });
          },
          reset: function () {
              // 重置一下，这样再次选择相同文件才能生效
              this.$refs.form.reset();
          },
          handleClick: function () {
              this.$refs.input.click();
          },
          handleDragenter: function () {
              this.set('isFileHover', TRUE);
          },
          handleDragleave: function () {
              this.set('isFileHover', FALSE);
          },
          handleDragover: function (event) {
              // 默认情况下，元素是不允许放置的
              event.prevent();
          },
          handleDrop: function (event) {
              event.prevent();
              this.set('isFileHover', FALSE);
              this.beforeUpload(event.originalEvent.dataTransfer.files);
          },
          handleChange: function (event) {
              this.beforeUpload(event.originalEvent.target.files);
          }
      }
  });

  var template$O = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-alert-indicator'},$6={'class':'bell-alert-title'},$7={'class':'bell-alert-content'},$8={'class':'bell-alert-close'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'showIcon',_O.showIcon).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{name:_p(_K,'iconName',_O.iconName).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'title',_O.title).value?_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'$slot_children',_O.$slot_children).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'closable',_O.closable).value||_p(_K,'$slot_close',_O.$slot_close).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_close')||function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-alert-close-icon',name:'close-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,events:{click:_f('click','close.alert','click','','close','alert')},nativeAttrs:$8,operator:_y,ref:'close',tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-alert'+(_p(_K,'status',_O.status).value?' bell-alert-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'banner',_O.banner).value?' bell-alert-banner':'')+(_p(_K,'title',_O.title).value?' bell-alert-with-title':'')+(_p(_K,'showIcon',_O.showIcon).value?' bell-alert-with-icon':'')+(_p(_K,'closable',_O.closable).value||_p(_K,'$slot_close',_O.$slot_close).value?' bell-alert-with-close':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Alert = Yox.define({
      template: template$O,
      name: 'bell-Alert',
      propTypes: {
          status: {
              type: oneOf(RAW_STATUS_ARRAY),
              value: RAW_TYPE_WARNING,
          },
          title: {
              type: RAW_STRING,
          },
          showIcon: {
              type: RAW_BOOLEAN,
          },
          banner: {
              type: RAW_BOOLEAN,
          },
          closable: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          iconName: function () {
              return getStatusIconName(this.get('status'));
          },
      },
      components: {
          Icon: Icon,
      }
  });

  var template$P = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-article-title'},$6={'class':'bell-article-sub-title'},$7={'class':'bell-article-cover'},$8={'class':'bell-article-content'},$9={'class':'bell-article-signature'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'title',_O.title).value?_N.push({children:function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'title',_O.title).value),type:1});_p(_K,'showLink',_O.showLink).value?_N.push({context:_D,events:{'click.native':_f('click.native','link.article','click','native','link','article',$1,$3)},operator:_z,props:{className:'bell-article-link',name:'links-line'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'subTitle',_O.subTitle).value?_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'subTitle',_O.subTitle).value),type:3}):_p(_K,'$slot_subTitle',_O.$slot_subTitle).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_subTitle'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'$slot_cover',_O.$slot_cover).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_cover'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({children:function(){var _N=[];($0={children:_k('$slot_content'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});_p(_K,'signature',_O.signature).value?_N.push({context:_D,nativeAttrs:$9,operator:_y,tag:'div',text:_v(_p(_K,'signature',_O.signature).value),type:3}):_p(_K,'$slot_signature',_O.$slot_signature).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_signature'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$9,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-article'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Article = Yox.define({
      template: template$P,
      name: 'bell-Article',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          showLink: {
              type: RAW_BOOLEAN,
          },
          subTitle: {
              type: RAW_STRING,
          },
          signature: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      components: {
          Icon: Icon,
      }
  });

  var template$Q = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-analysis-title'},$6={'class':'bell-analysis-header'},$7={'class':'bell-analysis-value'},$8={'class':'bell-analysis-content-wrapper'},$9={'class':'bell-analysis-content'},$10={'class':'bell-analysis-footer'},$11={rows:3};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3});_p(_K,'tooltip',_O.tooltip).value?_N.push({context:_D,operator:_z,props:{content:_p(_K,'tooltip',_O.tooltip).value,placement:_p(_K,'RAW_TOP',_O.RAW_TOP).value},slots:{$slot_children:function(_L){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-analysis-icon-question',name:'question-line'},tag:'Icon',type:4});return _N.length?_N:$1}},tag:'Tooltip',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3});_N.push({context:_D,operator:_z,props:{className:'bell-analysis-skeleton',loading:_p(_K,'loading',_O.loading).value,text:$11},slots:{$slot_children:function(_L){var _N=[];_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'div',text:_v(_p(_K,'value',_O.value).value),type:3});_p(_K,'$slot_content',_O.$slot_content).value?_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];($0={children:_k('$slot_content',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$9,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({children:function(){var _N=[];($0={children:_k('$slot_footer',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$10,operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'Skeleton',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-analysis'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Analysis = Yox.define({
      template: template$Q,
      name: 'bell-Analysis',
      propTypes: {
          title: {
              type: RAW_STRING,
              required: TRUE,
          },
          value: {
              type: [RAW_STRING, RAW_NUMBER],
          },
          tooltip: {
              type: RAW_STRING,
          },
          loading: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              RAW_TOP: RAW_TOP,
          };
      },
      components: {
          Icon: Icon,
          Tooltip: Tooltip,
          Skeleton: Skeleton,
      },
  });

  var template$R = (function(){var $1=void 0,$3=!0,$5={'class':'bell-analysis-field-label'},$6={'class':'bell-analysis-field-value'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'span',text:_v(_p(_K,'label',_O.label).value),type:3});_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'span',text:_v(_p(_K,'value',_O.value).value),type:3});_p(_K,'up',_O.up).value?_N.push({context:_D,operator:_z,props:{className:'bell-analysis-field-icon-up',name:'arrow-up-s-fill'},tag:'Icon',type:4}):_p(_K,'down',_O.down).value?_N.push({context:_D,operator:_z,props:{className:'bell-analysis-field-icon-down',name:'arrow-down-s-fill'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-analysis-field'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var AnalysisField = Yox.define({
      template: template$R,
      name: 'bell-AnalysisField',
      propTypes: {
          label: {
              type: RAW_STRING,
              required: TRUE,
          },
          value: {
              type: [RAW_STRING, RAW_NUMBER],
          },
          up: {
              type: RAW_BOOLEAN,
          },
          down: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      components: {
          Icon: Icon,
      }
  });

  var template$S = (function(){var $1=void 0,$3=!0,$5={'class':'bell-spin-dot-item'},$6={'class':'bell-spin-dot-list'},$7={'class':'bell-spin-text'},$8={'class':'bell-spin-wrapper'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:[{context:_D,isPure:$3,isStatic:$3,nativeAttrs:$5,operator:_y,tag:'i',type:3},{context:_D,isPure:$3,isStatic:$3,nativeAttrs:$5,operator:_y,tag:'i',type:3},{context:_D,isPure:$3,isStatic:$3,nativeAttrs:$5,operator:_y,tag:'i',type:3},{context:_D,isPure:$3,isStatic:$3,nativeAttrs:$5,operator:_y,tag:'i',type:3}],context:_D,isPure:$3,isStatic:$3,nativeAttrs:$6,operator:_y,tag:'div',type:3});_p(_K,'text',_O.text).value?_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'div',text:_v(_p(_K,'text',_O.text).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-spin'+(_p(_K,'size',_O.size).value?' bell-spin-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'fixed',_O.fixed).value?' bell-spin-fixed':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Spin = Yox.define({
      template: template$S,
      name: 'bell-Spin',
      propTypes: {
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          fixed: {
              type: RAW_BOOLEAN,
          },
          text: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          },
      },
  });

  var template$T = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-split-button-menu'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{className:'bell-split-button'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):''),size:_p(_K,'size',_O.size).value,style:_p(_K,'style',_O.style).value},slots:{$slot_children:function(_L){var _N=[];_N.push({context:_D,events:{click:_e('click','onButtonClick()','click','','onButtonClick',$1,$3)},operator:_z,parent:_L,props:{disabled:_p(_K,'disabled',_O.disabled).value,loading:_p(_K,'loading',_O.loading).value,type:_p(_K,'type',_O.type).value},slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_children',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'Button',type:4});_N.push({context:_D,operator:_z,parent:_L,props:{disabled:_p(_K,'disabled',_O.disabled).value||_p(_K,'loading',_O.loading).value,gap:'5',placement:_p(_K,'placement',_O.placement).value,trigger:_p(_K,'RAW_CLICK',_O.RAW_CLICK).value,visible:_p(_K,'isMenuVisible',_O.isMenuVisible).value},slots:{$slot_children:function(_L){var _N=[];_N.push(function(_M){_p(_K,'loading',_O.loading).value?_l(_M,'props','className','bell-button-loading'):$1;return _M}({context:_D,operator:_z,parent:_L,props:{disabled:_p(_K,'disabled',_O.disabled).value,type:_p(_K,'type',_O.type).value},slots:{$slot_children:function(_L){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{name:'arrow-down-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}},tag:'Button',type:4}));return _N.length?_N:$1},$slot_overlay:function(_L){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'menu',_O.menu),function(_K,_O,_P,_Q,index){_N.push(function(_M){!_r(_K,'disabled',_O.disabled).value?_l(_M,'events','click',_e('click','onItemClick(this, index)','click','','onItemClick',{execute:function(_R,_S){return [_q(_K,_K.length-1).value,index]}})):$1;return _M}({context:_D,nativeAttrs:{'class':'bell-split-button-menu-item'+(_r(_K,'disabled',_O.disabled).value?' bell-split-button-menu-item-disabled':' bell-split-button-menu-item-enabled')},operator:_y,tag:'div',text:_v(_r(_K,'text',_O.text).value),type:3}));});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'Popover',type:4});return _N.length?_N:$1}},tag:'ButtonGroup',type:4});}})();

  var SplitButton = Yox.define({
      template: template$T,
      name: 'bell-SplitButton',
      propTypes: {
          type: {
              type: oneOf([
                  RAW_TYPE_PRIMARY,
                  RAW_TYPE_INFO,
                  RAW_TYPE_SUCCESS,
                  RAW_TYPE_WARNING,
                  RAW_TYPE_ERROR ]),
          },
          size: {
              type: oneOf([RAW_DEFAULT, RAW_LARGE, RAW_SMALL]),
              value: RAW_DEFAULT,
          },
          placement: {
              type: oneOf(RAW_PLACEMENT_ARRAY),
              value: RAW_BOTTOM_END,
          },
          menu: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          loading: {
              type: RAW_BOOLEAN,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              RAW_CLICK: RAW_CLICK,
              isMenuVisible: FALSE,
          };
      },
      events: {
          click: function (event) {
              if (event.phase === Yox.Event.PHASE_UPWARD) {
                  event.stop();
                  fireClickEvent(event);
              }
          },
          open: function (event) {
              event.stop();
              this.set('isMenuVisible', TRUE);
          },
          close: function (event) {
              event.stop();
              this.set('isMenuVisible', FALSE);
          }
      },
      methods: {
          onButtonClick: function (event) {
              event.stop();
              fireClickEvent(event);
              this.fire({
                  type: 'click',
                  ns: 'splitButton',
              });
          },
          onItemClick: function (item, index) {
              this.set('isMenuVisible', FALSE);
              this.fire({
                  type: 'select',
                  ns: 'splitButton',
              }, {
                  item: item,
                  index: index,
              });
          }
      },
      components: {
          Icon: Icon,
          Button: Button,
          ButtonGroup: ButtonGroup,
          Popover: Popover,
      },
  });

  var template$U = (function(){var $0,$1=void 0,$3=!0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_p(_K,'isVisible',_O.isVisible).value?($0={children:function(){var _N=[];_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{name:'arrow-up-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_f('click','click.backTop','click','','click','backTop')},nativeAttrs:{'class':'bell-backtop'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',transition:_c('backTop',_I&&_I.backTop||_J.backTop),type:3}));return _N.length?_N:$1}(),context:_D,operator:_B,tag:'portal',type:6},$0.children&&$0.children.length&&_N.push($0)):_N.push({isPure:$3,operator:_x,text:'',type:2});}})();

  var CLASS_VISIBLE$1 = 'bell-backtop-visible';
  var CLASS_FADE$1 = 'bell-backtop-fade';
  var BackTop = Yox.define({
      template: template$U,
      name: 'bell-BackTop',
      propTypes: {
          target: {
              type: RAW_STRING,
          },
          bottom: {
              type: RAW_NUMERIC,
          },
          right: {
              type: RAW_NUMERIC,
          },
          height: {
              type: RAW_NUMERIC,
              value: 0,
          },
          duration: {
              type: RAW_NUMERIC,
              value: 500,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              isVisible: FALSE,
          };
      },
      computed: {
          inlineStyle: function () {
              var result = [];
              var customStyle = {};
              var bottom = this.get('bottom');
              var right = this.get('right');
              if (bottom) {
                  customStyle.bottom = toPixel(bottom);
              }
              if (right) {
                  customStyle.right = toPixel(right);
              }
              if (Yox.object.keys(customStyle).length > 0) {
                  result.push(customStyle);
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      },
      transitions: {
          backTop: {
              enter: function (node) {
                  var me = this;
                  // 设置为 display block
                  Yox.dom.addClass(node, CLASS_VISIBLE$1);
                  setTimeout(function () {
                      if (!me.get('isVisible')) {
                          return;
                      }
                      Yox.dom.addClass(node, CLASS_FADE$1);
                  }, 50);
              },
              leave: function (node, done) {
                  var me = this;
                  Yox.dom.removeClass(node, CLASS_FADE$1);
                  onTransitionEnd(node, function () {
                      if (me.get('isVisible')) {
                          return;
                      }
                      Yox.dom.removeClass(node, CLASS_VISIBLE$1);
                      done();
                  });
              }
          },
      },
      components: {
          Icon: Icon,
      },
      afterMount: function () {
          var me = this;
          var container = DOCUMENT;
          var containerElement = DOCUMENT.documentElement;
          var target = me.get('target');
          if (target) {
              containerElement = Yox.dom.find(target);
              if (!containerElement) {
                  Yox.logger.fatal("target is not existed: " + target);
                  return;
              }
              container = containerElement;
          }
          var height = toNumber(me.get('height'));
          var onRefresh = function () {
              me.set({
                  isVisible: containerElement.scrollTop >= height
              });
          };
          var duration = toNumber(this.get('duration'));
          me.on('click', function () {
              scrollTo(containerElement, containerElement.scrollTop, 0, duration);
          });
          Yox.dom.on(container, RAW_EVENT_SCROLL, onRefresh);
          Yox.dom.on(WINDOW, RAW_EVENT_RESIZE, onRefresh);
          var destroy = function (component) {
              if (component === me) {
                  Yox.dom.off(container, RAW_EVENT_SCROLL, onRefresh);
                  Yox.dom.off(WINDOW, RAW_EVENT_RESIZE, onRefresh);
                  Yox.lifeCycle.off(RAW_EVENT_BEFORE_DESTROY, destroy);
              }
          };
          Yox.lifeCycle.on(RAW_EVENT_BEFORE_DESTROY, destroy);
      }
  });

  var template$V = (function(){var $0,$1=void 0,$3=!0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;_p(_K,'clickable',_O.clickable).value?_l(_M,'events','click',_f('click','click','click','','click')):$1;return _M}({children:function(){var _N=[];_p(_K,'url',_O.url).value||_p(_K,'src',_O.src).value?_N.push(function(_M){_p(_K,'url',_O.url).value?_l(_M,'nativeAttrs','src',_p(_K,'formatUrl',_O.formatUrl).value?_u(($0=_p(_K,'formatUrl',_O.formatUrl,_E&&_E.formatUrl||_F.formatUrl).value,$0({height:_p(_K,'sizeValue',_O.sizeValue).value,responsive:$3,url:_p(_K,'url',_O.url).value,width:_p(_K,'sizeValue',_O.sizeValue).value}))).value:_p(_K,'url',_O.url).value):_l(_M,'nativeAttrs','src',_p(_K,'src',_O.src).value);_p(_K,'srcSet',_O.srcSet).value?_l(_M,'nativeAttrs','srcset',_p(_K,'srcSet',_O.srcSet).value):$1;_p(_K,'alt',_O.alt).value?_l(_M,'nativeAttrs','alt',_p(_K,'alt',_O.alt).value):$1;return _M}({context:_D,events:{error:_f('error','error.avatar','error','','error','avatar')},nativeAttrs:{draggable:'false'},operator:_y,tag:'img',type:3})):_p(_K,'$slot_icon',_O.$slot_icon).value?($0={children:_k('$slot_icon'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0)):_p(_K,'text',_O.text).value?_N.push(function(_M){_p(_K,'textStyle',_O.textStyle).value?_M.nativeStyles=_b(_p(_K,'textStyle',_O.textStyle).value):$1;return _M}({context:_D,nativeAttrs:{'class':'bell-avatar-text'},operator:_y,ref:'text',tag:'span',text:_v(_p(_K,'text',_O.text).value),type:3})):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-avatar'+(_p(_K,'shape',_O.shape).value?' bell-avatar-'+_v(_p(_K,'shape',_O.shape).value):'')+(_p(_K,'src',_O.src).value?' bell-avatar-image':'')+(_p(_K,'clickable',_O.clickable).value?' bell-avatar-clickable':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var SPACE_HORIZONTAL = 8;
  var SIZE_DEFAULT = 32;
  var SIZE_SMALL = 24;
  var SIZE_LARGE = 40;
  var Avatar = Yox.define({
      template: template$V,
      name: 'bell-Avatar',
      propTypes: {
          size: {
              type: [RAW_STRING, RAW_NUMERIC],
              value: RAW_DEFAULT,
          },
          shape: {
              type: oneOf([RAW_SHAPE_CIRCLE]),
          },
          text: {
              type: RAW_STRING,
          },
          url: {
              type: RAW_STRING,
          },
          formatUrl: {
              type: RAW_FUNCTION,
          },
          src: {
              type: RAW_STRING,
          },
          srcSet: {
              type: RAW_STRING,
          },
          alt: {
              type: RAW_STRING,
          },
          color: {
              type: RAW_STRING,
          },
          fontSize: {
              type: RAW_NUMERIC,
          },
          backgroundColor: {
              type: RAW_STRING,
          },
          clickable: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          sizeValue: function () {
              var size = this.get('size');
              var value = toNumber(size);
              if (value > 0) {
                  return value;
              }
              if (size === RAW_SMALL) {
                  return SIZE_SMALL;
              }
              if (size === RAW_LARGE) {
                  return SIZE_LARGE;
              }
              return SIZE_DEFAULT;
          },
          inlineStyle: function () {
              var result = [];
              var customStyle = {};
              var sizeValue = this.get('sizeValue');
              customStyle.width = toPixel(sizeValue);
              customStyle.height = toPixel(sizeValue);
              var backgroundColor = this.get('backgroundColor');
              if (backgroundColor) {
                  customStyle.backgroundColor = backgroundColor;
              }
              if (Yox.object.keys(customStyle).length > 0) {
                  result.push(customStyle);
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
          textStyle: function () {
              var customStyle = {};
              var color = this.get('color');
              var fontSize = this.get('fontSize');
              if (color) {
                  customStyle.color = color;
              }
              if (fontSize) {
                  customStyle.fontSize = toPixel(fontSize);
              }
              if (Yox.object.keys(customStyle).length > 0) {
                  return customStyle;
              }
          }
      },
      afterMount: function () {
          var me = this;
          me.watch('text', function () {
              me.nextTick(function () {
                  var element = me.$refs && me.$refs.text;
                  if (!element) {
                      return;
                  }
                  var scale = element.offsetWidth
                      ? (me.$el.offsetWidth - SPACE_HORIZONTAL) / element.offsetWidth
                      : 1;
                  element.style.transform = "scale(" + Math.min(scale, 1) + ") translateX(-50%)";
              });
          }, TRUE);
      }
  });

  var template$W = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-badge-dot'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));!_p(_K,'hidden',_O.hidden).value?(_p(_K,'dot',_O.dot).value?_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$5,operator:_y,tag:'span',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2}),_p(_K,'text',_O.text).value||_u(($0=_p(_K,'isNumeric',_O.isNumeric,_E&&_E.isNumeric||_F.isNumeric).value,$0(_p(_K,'count',_O.count).value))).value?_N.push({context:_D,nativeAttrs:{'class':'bell-badge-text'+(_p(_K,'$slot_children',_O.$slot_children).value?' bell-badge-text-append':'')},operator:_y,tag:'span',text:_v(_p(_K,'text',_O.text).value||_u(($0=_p(_K,'formatText',_O.formatText,_E&&_E.formatText||_F.formatText).value,$0(_p(_K,'count',_O.count).value,_p(_K,'max',_O.max).value))).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2})):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-badge'+(_p(_K,'status',_O.status).value?'-status':'')+(_p(_K,'status',_O.status).value?' bell-badge-status-'+_v(_p(_K,'status',_O.status).value):_p(_K,'type',_O.type).value?' bell-badge-'+_v(_p(_K,'type',_O.type).value):'')+(_p(_K,'dot',_O.dot).value&&_p(_K,'text',_O.text).value?' bell-badge-with-dot-text':'')+(_p(_K,'ripple',_O.ripple).value?' bell-badge-ripple':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Badge = Yox.define({
      template: template$W,
      name: 'bell-Badge',
      propTypes: {
          type: {
              type: oneOf(RAW_TYPE_ARRAY),
              value: RAW_TYPE_ERROR,
          },
          status: {
              type: oneOf([
                  RAW_TYPE_INFO,
                  RAW_TYPE_SUCCESS,
                  RAW_TYPE_ERROR,
                  RAW_TYPE_WARNING,
                  RAW_DEFAULT,
                  'processing' ]),
          },
          text: {
              type: [RAW_STRING, RAW_NUMBER],
          },
          count: {
              type: RAW_NUMERIC,
          },
          max: {
              type: RAW_NUMERIC,
              value: 99,
          },
          dot: {
              type: RAW_BOOLEAN,
          },
          hidden: {
              type: RAW_BOOLEAN,
          },
          ripple: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      filters: {
          isNumeric: Yox.is.numeric,
          formatText: function (count, max) {
              count = Yox.is.numeric(count) ? +count : 0;
              max = Yox.is.numeric(max) ? +max : 1;
              return max < count
                  ? max + '+'
                  : count;
          }
      }
  });

  var template$X = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-date-picker-header-button'},$6=-12,$7=-1,$8={'class':'bell-date-picker-prev'},$9={'class':'bell-date-picker-header-year'},$10='type',$11={'class':'bell-date-picker-header-month'},$12=1,$13=12,$14={'class':'bell-date-picker-next'},$15={'class':'bell-date-picker-header'},$16={'class':'bell-date-picker-col'},$17={'class':'bell-date-picker-weeks'},$18={'class':'bell-date-picker-text'},$19={'class':'bell-date-picker-row'},$20={'class':'bell-date-picker-days'},$21={'class':'bell-date-picker-body'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_DATE',_O.RAW_TYPE_DATE).value?_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offset(-12)','click','','offset',{execute:function(_R,_S){return [$6]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offset(-1)','click','','offset',{execute:function(_R,_S){return [$7]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});_N.push(function(_M){_p(_K,'canPickYear',_O.canPickYear).value?(_l(_M,'nativeAttrs','class','bell-date-picker-header-link'),_l(_M,'events','click',_e('click',"set('type', RAW_TYPE_YEAR)",'click','','set',{execute:function(_R,_S){return [$10,_p(_K,'RAW_TYPE_YEAR',_O.RAW_TYPE_YEAR).value]}}))):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$9,operator:_y,tag:'span',text:_v(_o(_K,_K.length-1,'date.year',$3).value),type:3});_N.push({isPure:$3,operator:_w,text:'年',type:1});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'span',type:3}));_N.push(function(_M){_p(_K,'canPickMonth',_O.canPickMonth).value?(_l(_M,'nativeAttrs','class','bell-date-picker-header-link'),_l(_M,'events','click',_e('click',"set('type', RAW_TYPE_MONTH)",'click','','set',{execute:function(_R,_S){return [$10,_p(_K,'RAW_TYPE_MONTH',_O.RAW_TYPE_MONTH).value]}}))):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$11,operator:_y,tag:'span',text:_v(_o(_K,_K.length-1,'date.month',$3).value),type:3});_N.push({isPure:$3,operator:_w,text:'月',type:1});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'span',type:3}));_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offset(1)','click','','offset',{execute:function(_R,_S){return [$12]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offset(12)','click','','offset',{execute:function(_R,_S){return [$13]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$14,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$15,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'weeks',_O.weeks),function(_K,_O,_P,_Q){_N.push({context:_D,nativeAttrs:$16,operator:_y,tag:'div',text:_v(_q(_K,_K.length-1).value),type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$17,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_i(_p(_K,'datasource',_O.datasource),function(_K,_O,_P,_Q){_N.push({children:function(){var _N=[];_i(_r(_K,'list',_O.list),function(_K,_O,_P,_Q){_N.push(function(_M){_u(($0=_p(_K,'isEnabled',_O.isEnabled,_E&&_E.isEnabled||_F.isEnabled).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'disabledDate').value))).value?_l(_M,'events','click',_e('click','click(this)','click','','click',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}})):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$18,operator:_y,tag:'div',text:_v(_r(_K,'date',_O.date).value),type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-date-picker-col'+(_u(($0=_p(_K,'isEnabled',_O.isEnabled,_E&&_E.isEnabled||_F.isEnabled).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'disabledDate').value))).value?' bell-date-picker-col-enabled'+(_u(($0=_p(_K,'isCurrentMonth',_O.isCurrentMonth,_E&&_E.isCurrentMonth||_F.isCurrentMonth).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'date').value))).value?' bell-date-picker-col-current-month'+(_u(($0=_p(_K,'isChecked',_O.isChecked,_E&&_E.isChecked||_F.isChecked).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'checkedTimestamps').value))).value?' bell-date-picker-col-checked':''):' bell-date-picker-col-adjacent-month'):' bell-date-picker-col-disabled')},operator:_y,tag:'div',type:3}));});return _N.length?_N:$1}(),context:_D,nativeAttrs:$19,operator:_y,tag:'div',type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$20,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$21,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-date-picker-date bell-date-picker-panel'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3})):_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_YEAR',_O.RAW_TYPE_YEAR).value?_N.push({context:_D,operator:_z,props:{checkedYear:_o(_K,_K.length-1,'date.year',$3).value},tag:'DateYear',type:4}):_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_MONTH',_O.RAW_TYPE_MONTH).value?_N.push({context:_D,operator:_z,props:{checkedMonth:_o(_K,_K.length-1,'date.month',$3).value,checkedYear:_o(_K,_K.length-1,'date.year',$3).value},tag:'DateMonth',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});}})();

  var template$Y = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-date-picker-header-button'},$6='year',$7=10,$8=1,$9={'class':'bell-date-picker-prev'},$10={'class':'bell-date-picker-header-year'},$11='type',$12={'class':'bell-date-picker-next'},$13={'class':'bell-date-picker-header'},$14={'class':'bell-date-picker-text'},$15={'class':'bell-date-picker-row'},$16={'class':'bell-date-picker-body'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_MONTH',_O.RAW_TYPE_MONTH).value?_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click',"decrease('year', 10)",'click','','decrease',{execute:function(_R,_S){return [$6,$7]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click',"decrease('year', 1)",'click','','decrease',{execute:function(_R,_S){return [$6,$8]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$9,operator:_y,tag:'div',type:3});_N.push(function(_M){_p(_K,'canPickYear',_O.canPickYear).value?(_l(_M,'nativeAttrs','class','bell-date-picker-header-link'),_l(_M,'events','click',_e('click',"set('type', RAW_TYPE_YEAR)",'click','','set',{execute:function(_R,_S){return [$11,_p(_K,'RAW_TYPE_YEAR',_O.RAW_TYPE_YEAR).value]}}))):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$10,operator:_y,tag:'span',text:_v(_p(_K,'year',_O.year).value),type:3});_N.push({isPure:$3,operator:_w,text:'年',type:1});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'span',type:3}));_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click',"increase('year', 1)",'click','','increase',{execute:function(_R,_S){return [$6,$8]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click',"increase('year', 10)",'click','','increase',{execute:function(_R,_S){return [$6,$7]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$12,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$13,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_i(_p(_K,'datasource',_O.datasource),function(_K,_O,_P,_Q){_N.push({children:function(){var _N=[];_i(_q(_K,_K.length-1),function(_K,_O,_P,_Q){_N.push({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$14,operator:_y,tag:'div',text:_v(_r(_K,'text',_O.text).value),type:3});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','click(this)','click','','click',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}})},nativeAttrs:{'class':'bell-date-picker-col bell-date-picker-col-enabled'+(_u(($0=_p(_K,'isChecked',_O.isChecked,_E&&_E.isChecked||_F.isChecked).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'checkedTimestamps').value))).value?' bell-date-picker-col-checked':'')},operator:_y,tag:'div',type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$15,operator:_y,tag:'div',type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$16,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-date-picker-month bell-date-picker-panel'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3})):_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_YEAR',_O.RAW_TYPE_YEAR).value?_N.push({context:_D,operator:_z,props:{checkedYear:_p(_K,'year',_O.year).value},tag:'DateYear',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});}})();

  var template$Z = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-date-picker-header-button bell-date-picker-prev'},$6='year',$7={'class':'bell-date-picker-header-year'},$8={'class':'bell-date-picker-header-separator'},$9={'class':'bell-date-picker-header-button bell-date-picker-next'},$10={'class':'bell-date-picker-header'},$11={'class':'bell-date-picker-text'},$12={'class':'bell-date-picker-row'},$13={'class':'bell-date-picker-body'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click',"decrease('year', count)",'click','','decrease',{execute:function(_R,_S){return [$6,_p(_K,'count',_O.count).value]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'span',text:_v(_p(_K,'year',_O.year).value),type:3});_N.push({isPure:$3,operator:_w,text:'年',type:1});_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$8,operator:_y,tag:'span',text:'-',type:3});_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'span',text:_v((_p(_K,'year',_O.year).value+_p(_K,'count',_O.count).value)-1),type:3});_N.push({isPure:$3,operator:_w,text:'年',type:1});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click',"increase('year', count)",'click','','increase',{execute:function(_R,_S){return [$6,_p(_K,'count',_O.count).value]}})},nativeAttrs:$9,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$10,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_i(_p(_K,'datasource',_O.datasource),function(_K,_O,_P,_Q){_N.push({children:function(){var _N=[];_i(_q(_K,_K.length-1),function(_K,_O,_P,_Q){_N.push({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$11,operator:_y,tag:'div',text:_v(_q(_K,_K.length-1).value),type:3});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','click(this)','click','','click',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}})},nativeAttrs:{'class':'bell-date-picker-col bell-date-picker-col-enabled'+(_u(($0=_p(_K,'isChecked',_O.isChecked,_E&&_E.isChecked||_F.isChecked).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'checkedYears').value))).value?' bell-date-picker-col-checked':'')},operator:_y,tag:'div',type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$12,operator:_y,tag:'div',type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$13,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-date-picker-year bell-date-picker-panel'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var WEEKS = ['日', '一', '二', '三', '四', '五', '六'];
  var SECOND$2 = 1000;
  var MINUTE$1 = 60 * SECOND$2;
  var HOUR$1 = 60 * MINUTE$1;
  var DAY$1 = 24 * HOUR$1;
  var STABLE_DURATION = 41 * DAY$1;
  var MONTHS = [
      '一月', '二月', '三月', '四月', '五月',
      '六月', '七月', '八月', '九月', '十月',
      '十一月', '十二月'
  ];
  var RAW_TYPE_DATE = 'date';
  var RAW_TYPE_DATE_RANGE = 'dateRange';
  var RAW_TYPE_WEEK = 'week';
  var RAW_TYPE_YEAR = 'year';
  var RAW_TYPE_MONTH = 'month';
  function toSimpleDate(date) {
      var result = toDate(date);
      return {
          year: result.getFullYear(),
          month: result.getMonth() + 1,
          date: result.getDate(),
          timestamp: result.getTime(),
      };
  }
  function toDate(date) {
      var result;
      if (date instanceof Date) {
          result = date;
      }
      else {
          result = new Date(date);
      }
      // 碰到过夏令时问题，问题描述如下：
      // time 每次递增 DAY，期望下次的时分秒是相同的，即 00:00:00
      // 但是碰到夏令时问题后，小时会有不同，非常坑爹
      // 因此这里要检查小时是否为 0
      result.setHours(0, 0, 0, 0);
      return result;
  }
  function toTimestamp(date) {
      return toDate(date || new Date()).getTime();
  }
  function offsetMonth(timestamp, offset) {
      var date = new Date(timestamp);
      date.setDate(1);
      date.setMonth(date.getMonth() + offset);
      return date.getTime();
  }
  function firstDateInWeek(date) {
      var day = date.getDay();
      return new Date(date.getTime() - day * DAY$1);
  }
  function lastDateInWeek(date) {
      var day = date.getDay();
      return new Date(date.getTime() - (6 - day) * DAY$1);
  }
  function firstDateInMonth(date) {
      date.setDate(1);
      return date;
  }
  function lastDateInMonth(date) {
      date.setDate(1);
      date.setMonth(date.getMonth() + 1);
      return new Date(date.getTime() - DAY$1);
  }
  function createYearViewDatasource(startYear, count) {
      var result = [], list = [];
      for (var i = 0; i < count; i++) {
          list.push(i + startYear);
          if (i % 4 === 3) {
              result.push(list);
              list = [];
          }
      }
      return result;
  }
  function createMonthViewDatasource(year) {
      var result = [], list = [], date = new Date();
      date.setFullYear(year);
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      for (var i = 0, len = MONTHS.length; i < len; i++) {
          date.setMonth(i);
          list.push({
              timestamp: date.getTime(),
              year: year,
              month: i + 1,
              text: MONTHS[i],
          });
          if (i % 4 === 3) {
              result.push(list);
              list = [];
          }
      }
      return result;
  }
  function createDateViewDatasource(timestamp) {
      var startDate = firstDateInWeek(firstDateInMonth(new Date(timestamp))).getTime();
      var endDate = lastDateInWeek(lastDateInMonth(new Date(timestamp))).getTime();
      var duration = endDate - startDate;
      var offset = STABLE_DURATION - duration;
      if (offset > 0) {
          endDate += offset;
      }
      var result = [], list = [];
      for (var i = 0, time = startDate; time <= endDate; i++, time += DAY$1) {
          list.push(toSimpleDate(time));
          if (i % 7 === 6) {
              result.push({
                  start: list[0],
                  end: list[list.length - 1],
                  list: list,
              });
              list = [];
          }
      }
      return result;
  }
  /**
   * yyyy -> 2019
   * M    -> 1
   * MM   -> 01
   * d    -> 1
   * dd   -> 01
   */
  function formatDate(date, format) {
      return format
          .replace(/yyyy/i, toString(date.getFullYear()))
          .replace(/MM/i, padStart(date.getMonth() + 1))
          .replace(/M/i, toString(date.getMonth() + 1))
          .replace(/dd/i, padStart(date.getDate()))
          .replace(/d/i, toString(date.getDate()));
  }

  var DateYear = Yox.define({
      template: template$Z,
      propTypes: {
          defaultDate: {
              type: [RAW_DATE, RAW_NUMBER],
          },
          checkedDate: {
              type: [RAW_DATE, RAW_NUMBER, RAW_ARRAY],
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var props = options.props || {};
          var date = props.defaultDate;
          if (!date) {
              if (Yox.is.array(props.checkedDate)) {
                  date = props.checkedDate[0];
              }
              else {
                  date = props.checkedDate;
              }
          }
          return {
              year: (date ? toDate(date) : new Date()).getFullYear(),
              count: 12,
          };
      },
      computed: {
          datasource: function () {
              return createYearViewDatasource(this.get('year'), this.get('count'));
          },
          checkedYears: function () {
              var checkedDate = this.get('checkedDate');
              if (Yox.is.array(checkedDate)) {
                  return checkedDate.map(function (date) {
                      return date ? toDate(date).getFullYear() : 0;
                  });
              }
              return [checkedDate ? toDate(checkedDate).getFullYear() : 0];
          }
      },
      filters: {
          isChecked: function (year, checkedYears) {
              return Yox.array.has(checkedYears, year);
          }
      },
      methods: {
          click: function (item) {
              this.fire({
                  type: 'change',
                  ns: 'year',
              }, {
                  year: item,
              });
          }
      },
      components: {
          Icon: Icon,
      }
  });

  function toMonthTimestamp(date) {
      if (date) {
          date = toDate(date);
          date.setDate(1);
          return date.getTime();
      }
      return 0;
  }
  var DateMonth = Yox.define({
      template: template$Y,
      propTypes: {
          defaultDate: {
              type: RAW_NUMBER,
          },
          checkedDate: {
              type: [RAW_DATE, RAW_NUMBER, RAW_ARRAY],
          },
          canPickYear: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var props = options.props || {};
          var date = props.defaultDate;
          if (!date) {
              if (Yox.is.array(props.checkedDate)) {
                  date = props.checkedDate[0];
              }
              else {
                  date = props.checkedDate;
              }
          }
          return {
              type: RAW_TYPE_MONTH,
              RAW_TYPE_YEAR: RAW_TYPE_YEAR,
              RAW_TYPE_MONTH: RAW_TYPE_MONTH,
              year: (date ? toDate(date) : new Date()).getFullYear(),
          };
      },
      components: {
          Icon: Icon,
          DateYear: DateYear,
      },
      computed: {
          datasource: function () {
              return createMonthViewDatasource(this.get('year'));
          },
          checkedTimestamps: function () {
              var checkedDate = this.get('checkedDate');
              if (Yox.is.array(checkedDate)) {
                  return checkedDate.map(toMonthTimestamp);
              }
              return [toMonthTimestamp(checkedDate)];
          }
      },
      filters: {
          isChecked: function (item, checkedTimestamps) {
              return Yox.array.has(checkedTimestamps, item.timestamp);
          }
      },
      events: {
          change: {
              listener: function (event, data) {
                  event.stop();
                  this.set({
                      type: RAW_TYPE_MONTH,
                      year: data.year,
                  });
              },
              ns: 'year',
          },
      },
      methods: {
          click: function (item) {
              this.fire({
                  type: 'change',
                  ns: 'month',
              }, item);
          }
      }
  });

  var DateView = Yox.define({
      template: template$X,
      propTypes: {
          defaultDate: {
              type: [RAW_DATE, RAW_NUMBER],
          },
          checkedDate: {
              type: [RAW_DATE, RAW_NUMBER, RAW_ARRAY],
          },
          disabledDate: {
              type: RAW_FUNCTION,
          },
          canPickYear: {
              type: RAW_BOOLEAN,
          },
          canPickMonth: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var props = options.props || {};
          var date = props.defaultDate;
          if (!date) {
              if (Yox.is.array(props.checkedDate)) {
                  date = props.checkedDate[0];
              }
              else {
                  date = props.checkedDate;
              }
          }
          return {
              type: RAW_TYPE_DATE,
              RAW_TYPE_DATE: RAW_TYPE_DATE,
              RAW_TYPE_YEAR: RAW_TYPE_YEAR,
              RAW_TYPE_MONTH: RAW_TYPE_MONTH,
              weeks: WEEKS,
              timestamp: toTimestamp(date),
          };
      },
      computed: {
          date: function () {
              return toSimpleDate(this.get('timestamp'));
          },
          datasource: function () {
              return createDateViewDatasource(this.get('timestamp'));
          },
          checkedTimestamps: function () {
              var checkedDate = this.get('checkedDate');
              if (Yox.is.array(checkedDate)) {
                  return checkedDate.map(function (date) {
                      return date ? toTimestamp(date) : 0;
                  });
              }
              return [checkedDate ? toTimestamp(checkedDate) : 0];
          }
      },
      components: {
          Icon: Icon,
          DateYear: DateYear,
          DateMonth: DateMonth,
      },
      filters: {
          isCurrentMonth: function (item, date) {
              return date.year === item.year && date.month === item.month;
          },
          isEnabled: function (item, disabledDate) {
              return disabledDate
                  ? disabledDate(item)
                  : TRUE;
          },
          isChecked: function (item, checkedTimestamps) {
              return Yox.array.has(checkedTimestamps, item.timestamp);
          }
      },
      events: [
          {
              type: 'change',
              ns: 'year',
              listener: function (event, data) {
                  event.stop();
                  // @ts-ignore
                  var date = new Date(this.get('timestamp'));
                  date.setFullYear(data.year);
                  // @ts-ignore
                  this.set({
                      type: RAW_TYPE_DATE,
                      timestamp: date.getTime()
                  });
              }
          },
          {
              type: 'change',
              ns: 'month',
              listener: function (event, data) {
                  event.stop();
                  // @ts-ignore
                  var date = new Date(this.get('timestamp'));
                  date.setMonth(data.month - 1);
                  // @ts-ignore
                  this.set({
                      type: RAW_TYPE_DATE,
                      timestamp: date.getTime()
                  });
              }
          }
      ],
      methods: {
          offset: function (offset) {
              this.set('timestamp', offsetMonth(this.get('timestamp'), offset));
          },
          click: function (item) {
              this.fire({
                  type: 'change',
                  ns: 'date',
              }, item);
          }
      }
  });

  var template$_ = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-date-picker-header-button'},$6=-12,$7=-1,$8={'class':'bell-date-picker-prev'},$9={'class':'bell-date-picker-header-year'},$10={'class':'bell-date-picker-header-month'},$11=1,$12=12,$13={'class':'bell-date-picker-next'},$14={'class':'bell-date-picker-header'},$15={'class':'bell-date-picker-col'},$16={'class':'bell-date-picker-weeks'},$17={'class':'bell-date-picker-text'},$18={'class':'bell-date-picker-row'},$19={'class':'bell-date-picker-days'},$20={'class':'bell-date-picker-body'},$21={'class':'bell-date-picker-panel'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offsetStart(-12)','click','','offsetStart',{execute:function(_R,_S){return [$6]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offsetStart(-1)','click','','offsetStart',{execute:function(_R,_S){return [$7]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});_N.push({context:_D,nativeAttrs:$9,operator:_y,tag:'span',text:_v(_o(_K,_K.length-1,'startDate.year',$3).value),type:3});_N.push({isPure:$3,operator:_w,text:'年',type:1});_N.push({context:_D,nativeAttrs:$10,operator:_y,tag:'span',text:_v(_o(_K,_K.length-1,'startDate.month',$3).value),type:3});_N.push({isPure:$3,operator:_w,text:'月',type:1});_p(_K,'splitPanel',_O.splitPanel).value?_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offsetStart(1)','click','','offsetStart',{execute:function(_R,_S){return [$11]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offsetStart(12)','click','','offsetStart',{execute:function(_R,_S){return [$12]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$13,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$14,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'weeks',_O.weeks),function(_K,_O,_P,_Q){_N.push({context:_D,nativeAttrs:$15,operator:_y,tag:'div',text:_v(_q(_K,_K.length-1).value),type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$16,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_i(_p(_K,'startDatasource',_O.startDatasource),function(_K,_O,_P,_Q){_N.push({children:function(){var _N=[];_i(_r(_K,'list',_O.list),function(_K,_O,_P,_Q){_N.push(function(_M){_s(_K,0,'pinDate').value?_l(_M,'events','mouseenter',_e('mouseenter','hover(this)','mouseenter','','hover',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}})):$1;_u(($0=_p(_K,'isEnabled',_O.isEnabled,_E&&_E.isEnabled||_F.isEnabled).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'disabledDate').value))).value?_l(_M,'events','click',_e('click','click(this)','click','','click',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}})):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$17,operator:_y,tag:'div',text:_v(_r(_K,'date',_O.date).value),type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-date-picker-col'+(_u(($0=_p(_K,'isEnabled',_O.isEnabled,_E&&_E.isEnabled||_F.isEnabled).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'disabledDate').value))).value?' bell-date-picker-col-enabled'+(_u(($0=_p(_K,'isCurrentMonth',_O.isCurrentMonth,_E&&_E.isCurrentMonth||_F.isCurrentMonth).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'startDate').value))).value?' bell-date-picker-col-current-month'+(_r(_K,'timestamp',_O.timestamp).value===_s(_K,0,'computedCheckedStartTimestamp').value?' bell-date-picker-col-checked'+(_s(_K,0,'computedCheckedEndTimestamp').value?' bell-date-picker-col-start':' bell-date-picker-col-range'):'')+(_r(_K,'timestamp',_O.timestamp).value===_s(_K,0,'computedCheckedEndTimestamp').value?' bell-date-picker-col-checked bell-date-picker-col-end':'')+((_s(_K,0,'computedCheckedStartTimestamp').value<_r(_K,'timestamp',_O.timestamp).value)&&(_s(_K,0,'computedCheckedEndTimestamp').value>_r(_K,'timestamp',_O.timestamp).value)?' bell-date-picker-col-range':''):' bell-date-picker-col-adjacent-month'):' bell-date-picker-col-disabled')},operator:_y,tag:'div',type:3}));});return _N.length?_N:$1}(),context:_D,nativeAttrs:$18,operator:_y,tag:'div',type:3});});return _N.length?_N:$1}(),context:_D,events:{mouseleave:_e('mouseleave','leave()','mouseleave','','leave')},nativeAttrs:$19,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$20,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$21,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_p(_K,'splitPanel',_O.splitPanel).value?_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offsetEnd(-12)','click','','offsetEnd',{execute:function(_R,_S){return [$6]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offsetEnd(-1)','click','','offsetEnd',{execute:function(_R,_S){return [$7]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({context:_D,nativeAttrs:$9,operator:_y,tag:'span',text:_v(_o(_K,_K.length-1,'endDate.year',$3).value),type:3});_N.push({isPure:$3,operator:_w,text:'年',type:1});_N.push({context:_D,nativeAttrs:$10,operator:_y,tag:'span',text:_v(_o(_K,_K.length-1,'endDate.month',$3).value),type:3});_N.push({isPure:$3,operator:_w,text:'月',type:1});_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offsetEnd(1)','click','','offsetEnd',{execute:function(_R,_S){return [$11]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offsetEnd(12)','click','','offsetEnd',{execute:function(_R,_S){return [$12]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$13,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$14,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'weeks',_O.weeks),function(_K,_O,_P,_Q){_N.push({context:_D,nativeAttrs:$15,operator:_y,tag:'div',text:_v(_q(_K,_K.length-1).value),type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$16,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_i(_p(_K,'endDatasource',_O.endDatasource),function(_K,_O,_P,_Q){_N.push({children:function(){var _N=[];_i(_r(_K,'list',_O.list),function(_K,_O,_P,_Q){_N.push(function(_M){_s(_K,0,'pinDate').value?_l(_M,'events','mouseenter',_e('mouseenter','hover(this)','mouseenter','','hover',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}})):$1;_u(($0=_p(_K,'isEnabled',_O.isEnabled,_E&&_E.isEnabled||_F.isEnabled).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'disabledDate').value))).value?_l(_M,'events','click',_e('click','click(this)','click','','click',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}})):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$17,operator:_y,tag:'div',text:_v(_r(_K,'date',_O.date).value),type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-date-picker-col'+(_u(($0=_p(_K,'isEnabled',_O.isEnabled,_E&&_E.isEnabled||_F.isEnabled).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'disabledDate').value))).value?' bell-date-picker-col-enabled'+(_u(($0=_p(_K,'isCurrentMonth',_O.isCurrentMonth,_E&&_E.isCurrentMonth||_F.isCurrentMonth).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'endDate').value))).value?' bell-date-picker-col-current-month'+(_r(_K,'timestamp',_O.timestamp).value===_s(_K,0,'computedCheckedStartTimestamp').value?' bell-date-picker-col-checked'+(_s(_K,0,'computedCheckedEndTimestamp').value?' bell-date-picker-col-start':' bell-date-picker-col-range'):'')+(_r(_K,'timestamp',_O.timestamp).value===_s(_K,0,'computedCheckedEndTimestamp').value?' bell-date-picker-col-checked bell-date-picker-col-end':'')+((_s(_K,0,'computedCheckedStartTimestamp').value<_r(_K,'timestamp',_O.timestamp).value)&&(_s(_K,0,'computedCheckedEndTimestamp').value>_r(_K,'timestamp',_O.timestamp).value)?' bell-date-picker-col-range':''):' bell-date-picker-col-adjacent-month'):' bell-date-picker-col-disabled')},operator:_y,tag:'div',type:3}));});return _N.length?_N:$1}(),context:_D,nativeAttrs:$18,operator:_y,tag:'div',type:3});});return _N.length?_N:$1}(),context:_D,events:{mouseleave:_e('mouseleave','leave()','mouseleave','','leave')},nativeAttrs:$19,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$20,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$21,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-date-picker-daterange'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  function getEndTimestamp(startTimestamp, endTimestamp) {
      var startDate = new Date(startTimestamp);
      var endDate = new Date(endTimestamp);
      startDate.setDate(1);
      endDate.setDate(1);
      if (endDate.getTime() > startDate.getTime()) {
          return endDate.getTime();
      }
      return offsetMonth(endTimestamp, 1);
  }
  var DateRange = Yox.define({
      template: template$_,
      propTypes: {
          splitPanel: {
              type: RAW_BOOLEAN,
          },
          defaultStartDate: {
              type: [RAW_DATE, RAW_NUMBER],
          },
          checkedStartDate: {
              type: [RAW_DATE, RAW_NUMBER],
          },
          defaultEndDate: {
              type: [RAW_DATE, RAW_NUMBER],
          },
          checkedEndDate: {
              type: [RAW_DATE, RAW_NUMBER],
          },
          disabledDate: {
              type: RAW_FUNCTION,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var props = options.props || {};
          var startTimestamp = toTimestamp(props.defaultStartDate || props.checkedStartDate);
          var endTimestamp = toTimestamp(props.defaultEndDate || props.checkedEndDate || startTimestamp);
          return {
              weeks: WEEKS,
              startTimestamp: startTimestamp,
              endTimestamp: getEndTimestamp(startTimestamp, endTimestamp),
              // 点击后钉住的日期
              pinDate: UNDEFINED,
              // 当 pinDate 存在时，tempDate 是 hover 时临时选中的开始或结束日期
              tempDate: UNDEFINED,
          };
      },
      computed: {
          startDate: function () {
              return toSimpleDate(this.get('startTimestamp'));
          },
          endDate: function () {
              return toSimpleDate(this.get('endTimestamp'));
          },
          startDatasource: function () {
              return createDateViewDatasource(this.get('startTimestamp'));
          },
          endDatasource: function () {
              return createDateViewDatasource(this.get('endTimestamp'));
          },
          checkedStartTimestamp: function () {
              var checkedStartDate = this.get('checkedStartDate');
              return checkedStartDate
                  ? toTimestamp(checkedStartDate)
                  : 0;
          },
          checkedEndTimestamp: function () {
              var checkedEndDate = this.get('checkedEndDate');
              return checkedEndDate
                  ? toTimestamp(checkedEndDate)
                  : 0;
          },
          computedCheckedStartTimestamp: function () {
              var pinDate = this.get('pinDate');
              if (!pinDate) {
                  return this.get('checkedStartTimestamp');
              }
              var tempDate = this.get('tempDate');
              return tempDate
                  ? Math.min(pinDate.timestamp, tempDate.timestamp)
                  : pinDate.timestamp;
          },
          computedCheckedEndTimestamp: function () {
              var pinDate = this.get('pinDate');
              if (!pinDate) {
                  return this.get('checkedEndTimestamp');
              }
              var tempDate = this.get('tempDate');
              return tempDate
                  ? Math.max(pinDate.timestamp, tempDate.timestamp)
                  : 0;
          },
      },
      watchers: {
          checkedStartDate: function (value) {
              if (value) {
                  this.set('startTimestamp', toTimestamp(value));
              }
          },
          checkedEndDate: function (value) {
              var startTimestamp = this.get('startTimestamp');
              if (startTimestamp && value) {
                  this.set('endTimestamp', getEndTimestamp(startTimestamp, toTimestamp(value)));
              }
          }
      },
      filters: {
          isCurrentMonth: function (item, base) {
              return base.year === item.year && base.month === item.month;
          },
          isEnabled: function (item, disabledDate) {
              return disabledDate
                  ? disabledDate(item)
                  : TRUE;
          },
      },
      methods: {
          offsetStart: function (offset) {
              this.set('startTimestamp', offsetMonth(this.get('startTimestamp'), offset));
              if (!this.get('splitPanel')) {
                  this.set('endTimestamp', offsetMonth(this.get('endTimestamp'), offset));
              }
          },
          offsetEnd: function (offset) {
              this.set('endTimestamp', offsetMonth(this.get('endTimestamp'), offset));
              if (!this.get('splitPanel')) {
                  this.set('startTimestamp', offsetMonth(this.get('startTimestamp'), offset));
              }
          },
          hover: function (item) {
              var pinDate = this.get('pinDate');
              if (pinDate) {
                  this.set('tempDate', pinDate.timestamp !== item.timestamp ? item : UNDEFINED);
              }
          },
          leave: function () {
              this.set('tempDate', UNDEFINED);
          },
          click: function (item) {
              var me = this;
              var pinDate = me.get('pinDate');
              if (!pinDate) {
                  me.set('pinDate', item);
                  return;
              }
              if (pinDate.timestamp === item.timestamp) {
                  return;
              }
              if (item.timestamp > pinDate.timestamp) {
                  me.fire({
                      type: 'change',
                      ns: 'range',
                  }, {
                      start: pinDate,
                      end: item,
                  });
              }
              else {
                  me.fire({
                      type: 'change',
                      ns: 'range',
                  }, {
                      start: item,
                      end: pinDate,
                  });
              }
              // 等外部更新完 start 和 end 再重置，避免闪烁
              me.nextTick(function () {
                  me.set({
                      pinDate: UNDEFINED,
                      tempDate: UNDEFINED,
                  });
              });
          },
      },
      components: {
          Icon: Icon,
      }
  });

  var template$$ = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-date-picker-header-button'},$6=-12,$7=-1,$8={'class':'bell-date-picker-prev'},$9={'class':'bell-date-picker-header-year'},$10='type',$11={'class':'bell-date-picker-header-month'},$12=12,$13=1,$14={'class':'bell-date-picker-next'},$15={'class':'bell-date-picker-header'},$16={'class':'bell-date-picker-col'},$17={'class':'bell-date-picker-weeks'},$18={'class':'bell-date-picker-text'},$19={'class':'bell-date-picker-row'},$20={'class':'bell-date-picker-days'},$21={'class':'bell-date-picker-body'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_WEEK',_O.RAW_TYPE_WEEK).value?_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offset(-12)','click','','offset',{execute:function(_R,_S){return [$6]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-left-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offset(-1)','click','','offset',{execute:function(_R,_S){return [$7]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});_N.push(function(_M){_p(_K,'canPickYear',_O.canPickYear).value?(_l(_M,'nativeAttrs','class','bell-date-picker-header-link'),_l(_M,'events','click',_e('click',"set('type', RAW_TYPE_YEAR)",'click','','set',{execute:function(_R,_S){return [$10,_p(_K,'RAW_TYPE_YEAR',_O.RAW_TYPE_YEAR).value]}}))):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$9,operator:_y,tag:'span',text:_v(_o(_K,_K.length-1,'date.year',$3).value),type:3});_N.push({isPure:$3,operator:_w,text:'年',type:1});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'span',type:3}));_N.push(function(_M){_p(_K,'canPickMonth',_O.canPickMonth).value?(_l(_M,'nativeAttrs','class','bell-date-picker-header-link'),_l(_M,'events','click',_e('click',"set('type', RAW_TYPE_MONTH)",'click','','set',{execute:function(_R,_S){return [$10,_p(_K,'RAW_TYPE_MONTH',_O.RAW_TYPE_MONTH).value]}}))):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$11,operator:_y,tag:'span',text:_v(_o(_K,_K.length-1,'date.month',$3).value),type:3});_N.push({isPure:$3,operator:_w,text:'月',type:1});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'span',type:3}));_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offset(12)','click','','offset',{execute:function(_R,_S){return [$12]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-date-picker-header-icon',name:'arrow-right-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','offset(1)','click','','offset',{execute:function(_R,_S){return [$13]}})},nativeAttrs:$5,operator:_y,tag:'span',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$14,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$15,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'weeks',_O.weeks),function(_K,_O,_P,_Q){_N.push({context:_D,nativeAttrs:$16,operator:_y,tag:'div',text:_v(_q(_K,_K.length-1).value),type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$17,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_i(_p(_K,'datasource',_O.datasource),function(_K,_O,_P,_Q,rowIndex){_N.push({children:function(){var _N=[];_i(_r(_K,'list',_O.list),function(_K,_O,_P,_Q,colIndex){_N.push(function(_M){_u(($0=_p(_K,'isEnabled',_O.isEnabled,_E&&_E.isEnabled||_F.isEnabled).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'disabledDate').value))).value?_l(_M,'events','click',_e('click','click(../rowIndex)','click','','click',{execute:function(_R,_S){return [rowIndex]}})):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$18,operator:_y,tag:'div',text:_v(_r(_K,'date',_O.date).value),type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-date-picker-col'+(_u(($0=_p(_K,'isEnabled',_O.isEnabled,_E&&_E.isEnabled||_F.isEnabled).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'disabledDate').value))).value?' bell-date-picker-col-enabled'+(_u(($0=_p(_K,'isCurrentMonth',_O.isCurrentMonth,_E&&_E.isCurrentMonth||_F.isCurrentMonth).value,$0(_q(_K,_K.length-1).value,_s(_K,0,'date').value))).value?' bell-date-picker-col-current-month':' bell-date-picker-col-adjacent-month'):' bell-date-picker-col-disabled')+((_s(_K,0,'checkedTimestamp').value>=_o(_K,_K.length-2,'start.timestamp').value)&&(_s(_K,0,'checkedTimestamp').value<_o(_K,_K.length-2,'end.timestamp').value)?colIndex===0?' bell-date-picker-col-checked bell-date-picker-col-start':colIndex===(_Q-1)?' bell-date-picker-col-checked bell-date-picker-col-end':' bell-date-picker-col-range':'')},operator:_y,tag:'div',type:3}));});return _N.length?_N:$1}(),context:_D,nativeAttrs:$19,operator:_y,tag:'div',type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$20,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$21,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-date-picker-week bell-date-picker-panel'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3})):_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_YEAR',_O.RAW_TYPE_YEAR).value?_N.push({context:_D,operator:_z,props:{checkedYear:_o(_K,_K.length-1,'date.year',$3).value},tag:'DateYear',type:4}):_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_MONTH',_O.RAW_TYPE_MONTH).value?_N.push({context:_D,operator:_z,props:{checkedMonth:_o(_K,_K.length-1,'date.month',$3).value,checkedYear:_o(_K,_K.length-1,'date.year',$3).value},tag:'DateMonth',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});}})();

  var DateWeek = Yox.define({
      template: template$$,
      propTypes: {
          defaultDate: {
              type: [RAW_DATE, RAW_NUMBER],
          },
          checkedDate: {
              type: [RAW_DATE, RAW_NUMBER],
          },
          disabledDate: {
              type: RAW_FUNCTION,
          },
          canPickYear: {
              type: RAW_BOOLEAN,
          },
          canPickMonth: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var props = options.props || {};
          return {
              type: RAW_TYPE_WEEK,
              RAW_TYPE_WEEK: RAW_TYPE_WEEK,
              RAW_TYPE_YEAR: RAW_TYPE_YEAR,
              RAW_TYPE_MONTH: RAW_TYPE_MONTH,
              weeks: WEEKS,
              timestamp: toTimestamp(props.defaultDate || props.checkedDate),
          };
      },
      computed: {
          date: function () {
              var checkedDate = this.get('checkedDate');
              return toSimpleDate(checkedDate
                  ? toTimestamp(checkedDate)
                  : this.get('timestamp'));
          },
          datasource: function () {
              var date = this.get('date');
              return createDateViewDatasource(date.timestamp);
          },
          checkedTimestamp: function () {
              var checkedDate = this.get('checkedDate');
              return checkedDate ? toTimestamp(checkedDate) : 0;
          },
      },
      components: {
          Icon: Icon,
          DateYear: DateYear,
          DateMonth: DateMonth,
      },
      filters: {
          isCurrentMonth: function (item, date) {
              return date.year === item.year && date.month === item.month;
          },
          isEnabled: function (item, disabledDate) {
              return disabledDate
                  ? disabledDate(item)
                  : TRUE;
          },
      },
      events: [
          {
              type: 'change',
              ns: 'year',
              listener: function (event, data) {
                  event.stop();
                  // @ts-ignore
                  var date = new Date(this.get('timestamp'));
                  date.setFullYear(data.year);
                  // @ts-ignore
                  this.set({
                      type: RAW_TYPE_WEEK,
                      timestamp: date.getTime()
                  });
              }
          },
          {
              type: 'change',
              ns: 'month',
              listener: function (event, data) {
                  event.stop();
                  // @ts-ignore
                  var date = new Date(this.get('timestamp'));
                  date.setMonth(data.month - 1);
                  // @ts-ignore
                  this.set({
                      type: RAW_TYPE_WEEK,
                      timestamp: date.getTime()
                  });
              }
          } ],
      methods: {
          offset: function (offset) {
              this.set('timestamp', offsetMonth(this.get('timestamp'), offset));
          },
          click: function (colIndex) {
              var _a = this.get("datasource." + colIndex), start = _a.start, end = _a.end;
              this.fire({
                  type: 'change',
                  ns: 'week',
              }, {
                  start: start,
                  end: end,
              });
          },
      }
  });

  var template$10 = (function(){var $1=void 0,$3=!0,$4=!1,$5={'class':'bell-date-picker-values'},$6={'class':'bell-date-picker-separator'},$7={'class':'bell-date-picker-value'},$8={'class':'bell-date-picker-placeholder'},$9='isFocus',$10=$3,$11=$4,$12={'class':'bell-date-picker-shortcut-item'},$13={'class':'bell-date-picker-shortcut'},$14={'class':'bell-date-picker-overlay'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{gap:'5',placement:_p(_K,'placement',_O.placement).value,trigger:_p(_K,'RAW_CUSTOM',_O.RAW_CUSTOM).value,triggerMutable:_p(_K,'multiple',_O.multiple).value,visible:_p(_K,'isVisible',_O.isVisible).value},slots:{$slot_children:function(_L){var _N=[];_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?(_l(_M,'nativeAttrs','tabindex','0'),_l(_M,'events','click',_e('click','onClick()','click','','onClick')),_l(_M,'events','focus',_e('focus',"set('isFocus', true)",'focus','','set',{execute:function(_R,_S){return [$9,$10]}})),_l(_M,'events','blur',_e('blur',"set('isFocus', false)",'blur','','set',{execute:function(_R,_S){return [$9,$11]}}))):$1;_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_o(_K,_K.length-1,'formatedValues.length',$3).value>0?(_p(_K,'multiple',_O.multiple).value&&(_p(_K,'type',_O.type).value!==_p(_K,'RAW_TYPE_DATE_RANGE',_O.RAW_TYPE_DATE_RANGE).value))&&(_p(_K,'type',_O.type).value!==_p(_K,'RAW_TYPE_WEEK',_O.RAW_TYPE_WEEK).value)?_N.push({children:function(){var _N=[];_i(_p(_K,'formatedValues',_O.formatedValues),function(_K,_O,_P,_Q,index){_N.push({context:_D,events:{close:_e('close','onItemRemove($event, index)','close','','onItemRemove',{execute:function(_R,_S){return [_R,index]}},$3)},operator:_z,parent:_L,props:{closable:$3},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_q(_K,_K.length-1).value),type:1});return _N.length?_N:$1}},tag:'Tag',type:4});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({children:function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_o(_K,_K.length-1,'formatedValues.0',$3).value),type:1});_o(_K,_K.length-1,'formatedValues.1',$3).value?(_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$6,operator:_y,tag:'span',text:'至',type:3}),_N.push({isPure:$3,operator:_w,text:_v(_o(_K,_K.length-1,'formatedValues.1',$3).value),type:1})):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({context:_D,nativeAttrs:$8,operator:_y,tag:'div',text:_v(_p(_K,'placeholder',_O.placeholder).value),type:3});_p(_K,'showClear',_O.showClear).value&&_o(_K,_K.length-1,'formatedValues.length',$3).value?_N.push({context:_D,events:{'click.native':_e('click.native','onClearClick()','click','native','onClearClick',$1,$1,$3)},operator:_z,parent:_L,props:{className:'bell-date-picker-clear-icon',name:'close-circle-fill'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-date-picker-calendar-icon',name:'calendar-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-date-picker'+(_p(_K,'status',_O.status).value?' bell-date-picker-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'size',_O.size).value?' bell-date-picker-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'block',_O.block).value?' bell-date-picker-block':'')+(_p(_K,'isVisible',_O.isVisible).value?' bell-date-picker-opened':'')+(_p(_K,'showClear',_O.showClear).value?' bell-date-picker-with-clear':'')+(_p(_K,'disabled',_O.disabled).value?' bell-date-picker-disabled':' bell-date-picker-enabled')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));return _N.length?_N:$1},$slot_overlay:function(_L){var _N=[];_N.push({children:function(){var _N=[];_p(_K,'shortcuts',_O.shortcuts).value&&(_o(_K,_K.length-1,'shortcuts.length',$3).value>0)?_N.push({children:function(){var _N=[];_i(_p(_K,'shortcuts',_O.shortcuts),function(_K,_O,_P,_Q){_N.push({context:_D,events:{click:_e('click','onShortcutClick(this)','click','','onShortcutClick',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}})},nativeAttrs:$12,operator:_y,tag:'div',text:_v(_r(_K,'text',_O.text).value),type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$13,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_DATE',_O.RAW_TYPE_DATE).value?_N.push({context:_D,operator:_z,parent:_L,props:{canPickMonth:$3,canPickYear:$3,checkedDate:_p(_K,'value',_O.value).value,defaultDate:_o(_K,_K.length-1,'defaultSimpleDate.timestamp',$3).value,disabledDate:_p(_K,'disabledDate',_O.disabledDate).value},tag:'DateView',type:4}):_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_DATE_RANGE',_O.RAW_TYPE_DATE_RANGE).value?_N.push({context:_D,operator:_z,parent:_L,props:{checkedEndDate:_o(_K,_K.length-1,'value.1',$3).value,checkedStartDate:_o(_K,_K.length-1,'value.0',$3).value,defaultEndDate:_o(_K,_K.length-1,'defaultSimpleDate.timestamp',$3).value,defaultStartDate:_o(_K,_K.length-1,'defaultSimpleDate.timestamp',$3).value,disabledDate:_p(_K,'disabledDate',_O.disabledDate).value,splitPanel:_p(_K,'splitPanel',_O.splitPanel).value},tag:'DateRange',type:4}):_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_WEEK',_O.RAW_TYPE_WEEK).value?_N.push({context:_D,operator:_z,parent:_L,props:{canPickMonth:$3,canPickYear:$3,checkedDate:_o(_K,_K.length-1,'value.0',$3).value,defaultDate:_o(_K,_K.length-1,'defaultSimpleDate.timestamp',$3).value},tag:'DateWeek',type:4}):_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_YEAR',_O.RAW_TYPE_YEAR).value?_N.push({context:_D,operator:_z,parent:_L,props:{checkedDate:_p(_K,'value',_O.value).value,defaultDate:_o(_K,_K.length-1,'defaultSimpleDate.timestamp',$3).value},tag:'DateYear',type:4}):_p(_K,'type',_O.type).value===_p(_K,'RAW_TYPE_MONTH',_O.RAW_TYPE_MONTH).value?_N.push({context:_D,operator:_z,parent:_L,props:{canPickYear:$3,checkedDate:_p(_K,'value',_O.value).value,defaultDate:_o(_K,_K.length-1,'defaultSimpleDate.timestamp',$3).value},tag:'DateMonth',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$14,operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'Popover',type:4});}})();

  var YEAR_FORMAT = 'yyyy';
  var MONTH_FORMAT = 'yyyy-MM';
  var DATE_FORMAT = 'yyyy-MM-dd';
  var defaultFormat = {};
  defaultFormat[RAW_TYPE_DATE] = DATE_FORMAT;
  defaultFormat[RAW_TYPE_DATE_RANGE] = DATE_FORMAT;
  defaultFormat[RAW_TYPE_WEEK] = DATE_FORMAT;
  defaultFormat[RAW_TYPE_MONTH] = MONTH_FORMAT;
  defaultFormat[RAW_TYPE_YEAR] = YEAR_FORMAT;
  var DatePicker = Yox.define({
      template: template$10,
      name: 'bell-DatePicker',
      propTypes: {
          type: {
              type: oneOf([RAW_TYPE_DATE, RAW_TYPE_DATE_RANGE, RAW_TYPE_WEEK, RAW_TYPE_YEAR, RAW_TYPE_MONTH]),
              value: RAW_TYPE_DATE,
          },
          status: {
              type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
          },
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          splitPanel: {
              type: RAW_BOOLEAN,
          },
          defaultDate: {
              type: RAW_DATE,
          },
          value: {
              type: function (key, value) {
              }
          },
          shortcuts: {
              type: RAW_ARRAY,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          multiple: {
              type: RAW_BOOLEAN,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          placement: {
              type: oneOf(RAW_PLACEMENT_ARRAY),
              value: RAW_BOTTOM_START,
          },
          placeholder: {
              type: RAW_STRING,
              value: '请选择日期...'
          },
          format: {
              type: RAW_STRING,
          },
          disabledDate: {
              type: RAW_FUNCTION,
          },
          showClear: {
              type: RAW_BOOLEAN,
          },
          width: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var props = options.props || {};
          return {
              RAW_TYPE_DATE: RAW_TYPE_DATE,
              RAW_TYPE_DATE_RANGE: RAW_TYPE_DATE_RANGE,
              RAW_TYPE_WEEK: RAW_TYPE_WEEK,
              RAW_TYPE_YEAR: RAW_TYPE_YEAR,
              RAW_TYPE_MONTH: RAW_TYPE_MONTH,
              RAW_CUSTOM: RAW_CUSTOM,
              isFocus: FALSE,
              isVisible: FALSE,
              formatText: props.format || defaultFormat[props.type || RAW_TYPE_DATE]
          };
      },
      components: {
          Tag: Tag,
          Popover: Popover,
          DateView: DateView,
          DateRange: DateRange,
          DateWeek: DateWeek,
          DateMonth: DateMonth,
          DateYear: DateYear,
      },
      computed: {
          inlineStyle: function () {
              var result = [];
              var width = this.get('width');
              if (width) {
                  result.push({
                      width: toPixel(width)
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
          defaultSimpleDate: function () {
              var defaultDate = this.get('defaultDate');
              return toSimpleDate(toTimestamp(defaultDate));
          },
          formatedValues: function () {
              var value = this.get('value');
              var formatText = this.get('formatText');
              if (Yox.is.array(value)) {
                  return value.map(function (date) {
                      return formatDate(date, formatText);
                  });
              }
              else if (value) {
                  return [formatDate(value, formatText)];
              }
              return [];
          },
      },
      events: [
          {
              type: 'change',
              ns: 'date',
              listener: function (event, data) {
                  event.stop();
                  // @ts-ignore
                  this.dateChange(data.timestamp);
              }
          },
          {
              type: 'change',
              ns: 'year',
              listener: function (event, data) {
                  event.stop();
                  var date = new Date();
                  date.setFullYear(data.year);
                  // @ts-ignore
                  this.dateChange(toTimestamp(date), YEAR_FORMAT);
              }
          },
          {
              type: 'change',
              ns: 'month',
              listener: function (event, data) {
                  event.stop();
                  var date = new Date();
                  date.setFullYear(data.year);
                  date.setMonth(data.month - 1);
                  // @ts-ignore
                  this.dateChange(toTimestamp(date), MONTH_FORMAT);
              }
          },
          {
              type: 'change',
              ns: 'week',
              listener: function (event, data) {
                  event.stop();
                  // @ts-ignore
                  this.dateRangeChange(data.start.timestamp, data.end.timestamp);
              }
          },
          {
              type: 'change',
              ns: 'range',
              listener: function (event, data) {
                  event.stop();
                  // @ts-ignore
                  this.dateRangeChange(data.start.timestamp, data.end.timestamp);
              }
          },
          {
              listener: function (event) {
                  event.stop();
                  // @ts-ignore
                  this.set('isVisible', FALSE);
              },
              type: 'outside',
              ns: 'popover',
          }
      ],
      methods: {
          onClick: function (event) {
              this.toggle('isVisible');
              fireClickEvent(event);
          },
          onClearClick: function (event) {
              // 停止冒泡，否则会展开下拉框
              event.stop();
              fireClickEvent(event);
              var value = this.get('multiple') ? [] : UNDEFINED;
              this.set('value', value);
              this.fire({
                  type: 'clear',
                  ns: 'datePicker',
              }, TRUE);
              this.fireChange(value);
          },
          onItemRemove: function (event, index) {
              event.stop();
              this.removeAt('value', index);
              this.fireChange(this.get('value'));
          },
          onShortcutClick: function (data) {
              var value = data.onClick.call(this);
              if (Yox.is.array(value)) {
                  if (!value[0] || !value[1]) {
                      Yox.logger.warn("shortcuts value \u4F20\u503C\u9519\u8BEF");
                      return;
                  }
                  this.dateRangeChange(toTimestamp(value[0]), toTimestamp(value[1]));
              }
              else {
                  if (!value) {
                      Yox.logger.warn("shortcuts value \u4F20\u503C\u9519\u8BEF");
                      return;
                  }
                  var type = this.get('type');
                  if (type === RAW_TYPE_DATE_RANGE || type === RAW_TYPE_WEEK) {
                      Yox.logger.warn("shortcuts value \u9700\u8FD4\u56DE\u6570\u7EC4\u7C7B\u578B");
                      return;
                  }
                  this.dateChange(toTimestamp(value));
              }
          },
          dateChange: function (timestamp, dateFormat) {
              if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
              var me = this;
              var value = me.get('value');
              var date = new Date(timestamp);
              if (me.get('multiple')) {
                  if (Yox.is.array(value)) {
                      // 判断年月日是否存在
                      var format_1 = formatDate(date, dateFormat);
                      var existed_1 = FALSE;
                      Yox.array.each(value, function (item) {
                          if (format_1 === formatDate(item, dateFormat)) {
                              existed_1 = TRUE;
                              return FALSE;
                          }
                      });
                      if (!existed_1) {
                          me.append('value', date);
                          me.fireChange(me.get('value'));
                      }
                  }
                  else {
                      me.append('value', date);
                      me.fireChange(me.get('value'));
                  }
              }
              else {
                  me.set('value', date);
                  me.fireChange(date);
              }
              if (!me.get('multiple')) {
                  me.nextTick(function () {
                      me.set('isVisible', FALSE);
                  });
              }
          },
          dateRangeChange: function (start, end) {
              var value = [new Date(start), new Date(end)];
              this.set('value', value);
              this.fireChange(value);
              if (!this.get('multiple')) {
                  this.nextTick(function () {
                      this.set('isVisible', FALSE);
                  });
              }
          },
          fireChange: function (value) {
              this.fire({
                  type: 'change',
                  ns: 'datePicker',
              }, {
                  value: value,
              });
          }
      },
      afterMount: function () {
          onClickEventByEnterPress(this);
      }
  });

  var template$11 = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-time-picker-panel-column'},$6={'class':'bell-time-picker-panel-columns'},$7={'class':'bell-time-picker-panel-footer'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{className:'bell-time-picker-panel'},slots:{$slot_children:function(_L){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'hourList',_O.hourList),function(_K,_O,_P,_Q,index){_N.push({context:_D,events:{click:_e('click','onHourClick(index)','click','','onHourClick',{execute:function(_R,_S){return [index]}})},key:_q(_K,_K.length-1).value,nativeAttrs:{'class':'bell-time-picker-panel-row'+(index===_s(_K,0,'hourIndex').value?' bell-time-picker-panel-row-active':'')},operator:_y,tag:'li',text:_v(_u(($0=_p(_K,'padStart',_O.padStart,_E&&_E.padStart||_F.padStart).value,$0(_q(_K,_K.length-1).value))).value),type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,ref:'hourList',tag:'ul',type:3});_N.push({children:function(){var _N=[];_i(_p(_K,'minuteList',_O.minuteList),function(_K,_O,_P,_Q,index){_N.push({context:_D,events:{click:_e('click','onMinuteClick(index)','click','','onMinuteClick',{execute:function(_R,_S){return [index]}})},key:_q(_K,_K.length-1).value,nativeAttrs:{'class':'bell-time-picker-panel-row'+(index===_s(_K,0,'minuteIndex').value?' bell-time-picker-panel-row-active':'')},operator:_y,tag:'li',text:_v(_u(($0=_p(_K,'padStart',_O.padStart,_E&&_E.padStart||_F.padStart).value,$0(_q(_K,_K.length-1).value))).value),type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,ref:'minuteList',tag:'ul',type:3});_o(_K,_K.length-1,'secondList.length',$3).value>0?_N.push({children:function(){var _N=[];_i(_p(_K,'secondList',_O.secondList),function(_K,_O,_P,_Q,index){_N.push({context:_D,events:{click:_e('click','onSecondClick(index)','click','','onSecondClick',{execute:function(_R,_S){return [index]}})},key:_q(_K,_K.length-1).value,nativeAttrs:{'class':'bell-time-picker-panel-row'+(index===_s(_K,0,'secondIndex').value?' bell-time-picker-panel-row-active':'')},operator:_y,tag:'li',text:_v(_u(($0=_p(_K,'padStart',_O.padStart,_E&&_E.padStart||_F.padStart).value,$0(_q(_K,_K.length-1).value))).value),type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,ref:'secondList',tag:'ul',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,events:{click:_e('click','onNowClick()','click','','onNowClick',$1,$3)},operator:_z,parent:_L,props:{size:'small'},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:'此刻',type:1});return _N.length?_N:$1}},tag:'Button',type:4});_N.push({context:_D,events:{click:_e('click','onSubmitClick()','click','','onSubmitClick',$1,$3)},operator:_z,parent:_L,props:{disabled:!_p(_K,'hasValue',_O.hasValue).value,size:'small',type:'primary'},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:'确定',type:1});return _N.length?_N:$1}},tag:'Button',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'ResizeObserver',type:4});}})();

  function toTimeProps(value, hourList, minuteList, secondList) {
      var result = {
          hour: -1,
          minute: -1,
          second: -1,
          hourIndex: -1,
          minuteIndex: -1,
          secondIndex: -1,
          text: '',
      };
      var date;
      if (value instanceof Date) {
          date = value;
      }
      else if (typeof value === 'number' && value > 0) {
          date = new Date(value);
      }
      if (date) {
          var hour = date.getHours();
          var minute = date.getMinutes();
          var second = date.getSeconds();
          var hourIndex = hourList.indexOf(hour);
          var minuteIndex = minuteList.indexOf(minute);
          var secondIndex = secondList.indexOf(second);
          if (hourIndex >= 0) {
              result.hour = hour;
              result.hourIndex = hourIndex;
          }
          if (minuteIndex >= 0) {
              result.minute = minute;
              result.minuteIndex = minuteIndex;
          }
          if (secondIndex >= 0) {
              result.second = second;
              result.secondIndex = secondIndex;
          }
          result.text = formatTime(result.hour, result.minute, secondList.length > 0 ? result.second : -1);
      }
      return result;
  }
  function formatTime(hour, minute, second) {
      var list = [];
      if (hour >= 0) {
          list.push(padStart(hour));
      }
      if (minute >= 0) {
          list.push(padStart(minute));
      }
      if (second >= 0) {
          list.push(padStart(second));
      }
      return list.join(':');
  }
  function createRangeList(start, end, step) {
      var list = [];
      for (var i = start; i <= end; i += step) {
          list.push(i);
      }
      return list;
  }
  function getValidTimeItemIndex(listLength, index) {
      return index >= 0 && index < listLength
          ? index
          : -1;
  }
  function scrollTimeItemInToView(listElement, index, animated) {
      var itemElement = listElement.children[index];
      if (!itemElement) {
          return;
      }
      scrollTo(listElement, listElement.scrollTop, itemElement.offsetHeight * index, animated ? 600 : 0);
  }

  var TimePanel = Yox.define({
      template: template$11,
      propTypes: {
          hourList: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          hourIndex: {
              type: RAW_NUMBER,
          },
          minuteList: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          minuteIndex: {
              type: RAW_NUMBER,
          },
          secondList: {
              type: RAW_ARRAY,
          },
          secondIndex: {
              type: RAW_NUMBER,
          },
      },
      computed: {
          showSecond: function () {
              return this.get('secondList.length') > 0;
          },
          validHourIndex: function () {
              return getValidTimeItemIndex(this.get('hourList.length'), this.get('hourIndex'));
          },
          validMinuteIndex: function () {
              return getValidTimeItemIndex(this.get('minuteList.length'), this.get('minuteIndex'));
          },
          validSecondIndex: function () {
              return getValidTimeItemIndex(this.get('secondList.length'), this.get('secondIndex'));
          },
          hasValue: function () {
              return this.get('validHourIndex') >= 0
                  && this.get('validMinuteIndex') >= 0
                  && (!this.get('showSecond') || this.get('validSecondIndex') >= 0);
          },
      },
      watchers: {
          hourIndex: function () {
              this.scrollHourIntoView(TRUE);
          },
          minuteIndex: function () {
              this.scrollMinuteIntoView(TRUE);
          },
          secondIndex: function () {
              this.scrollSecondIntoView(TRUE);
          },
      },
      events: {
          resize: {
              listener: function (event, data) {
                  if (event.phase !== Yox.Event.PHASE_UPWARD) {
                      return;
                  }
                  event.stop();
                  if (data.height > 0) {
                      this.scrollHourIntoView();
                      this.scrollMinuteIntoView();
                      this.scrollSecondIntoView();
                  }
              },
              ns: 'resizeObserver'
          }
      },
      filters: {
          padStart: padStart,
      },
      methods: {
          scrollHourIntoView: function (animated) {
              var hourIndex = this.get('hourIndex');
              if (hourIndex >= 0) {
                  scrollTimeItemInToView(this.$refs.hourList, hourIndex, animated);
              }
          },
          scrollMinuteIntoView: function (animated) {
              var minuteIndex = this.get('minuteIndex');
              if (minuteIndex >= 0) {
                  scrollTimeItemInToView(this.$refs.minuteList, minuteIndex, animated);
              }
          },
          scrollSecondIntoView: function (animated) {
              var secondIndex = this.get('secondIndex');
              if (secondIndex >= 0) {
                  scrollTimeItemInToView(this.$refs.secondList, secondIndex, animated);
              }
          },
          onHourClick: function (hourIndex) {
              var minuteIndex = this.get('validMinuteIndex');
              if (minuteIndex < 0) {
                  minuteIndex = 0;
              }
              var secondIndex = this.get('validSecondIndex');
              if (this.get('showSecond') && secondIndex < 0) {
                  secondIndex = 0;
              }
              this.fireChange(hourIndex, minuteIndex, secondIndex);
          },
          onMinuteClick: function (minuteIndex) {
              var hourIndex = this.get('validHourIndex');
              if (hourIndex < 0) {
                  hourIndex = 0;
              }
              var secondIndex = this.get('validSecondIndex');
              if (this.get('showSecond') && secondIndex < 0) {
                  secondIndex = 0;
              }
              this.fireChange(hourIndex, minuteIndex, secondIndex);
          },
          onSecondClick: function (secondIndex) {
              var hourIndex = this.get('validHourIndex');
              if (hourIndex < 0) {
                  hourIndex = 0;
              }
              var minuteIndex = this.get('validMinuteIndex');
              if (minuteIndex < 0) {
                  minuteIndex = 0;
              }
              this.fireChange(hourIndex, minuteIndex, secondIndex);
          },
          onNowClick: function () {
              var date = new Date(getNowTime());
              var hour = date.getHours();
              var hourIndex = -1;
              var hourList = this.get('hourList');
              if (hourList) {
                  hourIndex = hourList.indexOf(hour);
              }
              var minute = date.getMinutes();
              var minuteIndex = -1;
              var minuteList = this.get('minuteList');
              if (minuteList) {
                  minuteIndex = minuteList.indexOf(minute);
              }
              var second = date.getMinutes();
              var secondIndex = -1;
              var secondList = this.get('secondList');
              if (this.get('showSecond') && secondList) {
                  secondIndex = secondList.indexOf(second);
              }
              this.fireChange(hourIndex, minuteIndex, secondIndex);
              this.fire({
                  type: 'submit',
                  ns: 'timePanel',
              }, {
                  hour: hour,
                  minute: minute,
                  second: second,
              });
          },
          onSubmitClick: function () {
              var hour = -1;
              var minute = -1;
              var second = -1;
              var hourIndex = this.get('validHourIndex');
              if (hourIndex >= 0) {
                  hour = this.get('hourList')[hourIndex];
              }
              var minuteIndex = this.get('validMinuteIndex');
              if (minuteIndex >= 0) {
                  minute = this.get('minuteList')[minuteIndex];
              }
              var secondIndex = this.get('validSecondIndex');
              if (this.get('showSecond') && secondIndex >= 0) {
                  second = this.get('secondList')[secondIndex];
              }
              this.fire({
                  type: 'submit',
                  ns: 'timePanel',
              }, {
                  hour: hour,
                  minute: minute,
                  second: second,
              });
          },
          fireChange: function (hourIndex, minuteIndex, secondIndex) {
              this.fire({
                  type: 'change',
                  ns: 'timePanel',
              }, {
                  hourIndex: hourIndex,
                  minuteIndex: minuteIndex,
                  secondIndex: secondIndex,
              });
          },
      },
      components: {
          Button: Button,
          ResizeObserver: ResizeObserver$1,
      },
  });

  var template$12 = (function(){var $1=void 0,$3=!0,$4=!1,$5={'class':'bell-time-picker-value'},$6={'class':'bell-time-picker-placeholder'},$7='isFocus',$8=$3,$9=$4,$10={'class':'bell-time-picker-overlay'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{gap:'5',placement:_p(_K,'placement',_O.placement).value,trigger:_p(_K,'RAW_CUSTOM',_O.RAW_CUSTOM).value,visible:_p(_K,'isVisible',_O.isVisible).value},slots:{$slot_children:function(_L){var _N=[];_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?(_l(_M,'nativeAttrs','tabindex','0'),_l(_M,'events','click',_e('click','onClick()','click','','onClick')),_l(_M,'events','focus',_e('focus',"set('isFocus', true)",'focus','','set',{execute:function(_R,_S){return [$7,$8]}})),_l(_M,'events','blur',_e('blur',"set('isFocus', false)",'blur','','set',{execute:function(_R,_S){return [$7,$9]}}))):$1;_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_p(_K,'text',_O.text).value?_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'div',text:_v(_p(_K,'text',_O.text).value),type:3}):_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'placeholder',_O.placeholder).value),type:3});_p(_K,'showClear',_O.showClear).value&&_p(_K,'hasValue',_O.hasValue).value?_N.push({context:_D,events:{'click.native':_e('click.native','onClearClick()','click','native','onClearClick',$1,$1,$3)},operator:_z,parent:_L,props:{className:'bell-time-picker-clear-icon',name:'close-circle-fill'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-time-picker-time-icon',name:'time-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-time-picker'+(_p(_K,'status',_O.status).value?' bell-time-picker-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'size',_O.size).value?' bell-time-picker-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'block',_O.block).value?' bell-time-picker-block':'')+(_p(_K,'isVisible',_O.isVisible).value?' bell-time-picker-opened':'')+(_p(_K,'showClear',_O.showClear).value?' bell-time-picker-with-clear':'')+(_p(_K,'disabled',_O.disabled).value?' bell-time-picker-disabled':' bell-time-picker-enabled')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));return _N.length?_N:$1},$slot_overlay:function(_L){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{hourIndex:_p(_K,'isVisible',_O.isVisible).value?_p(_K,'hourIndex',_O.hourIndex).value:-1,hourList:_p(_K,'hourList',_O.hourList).value,minuteIndex:_p(_K,'isVisible',_O.isVisible).value?_p(_K,'minuteIndex',_O.minuteIndex).value:-1,minuteList:_p(_K,'minuteList',_O.minuteList).value,secondIndex:_p(_K,'isVisible',_O.isVisible).value?_p(_K,'secondIndex',_O.secondIndex).value:-1,secondList:_p(_K,'secondList',_O.secondList).value},tag:'TimePanel',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$10,operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'Popover',type:4});}})();

  var DEFAULT_HOUR_STEP = 1;
  var DEFAULT_MINUTE_STEP = 1;
  var DEFAULT_SECOND_STEP = 1;
  var TimePicker = Yox.define({
      template: template$12,
      name: 'bell-TimePicker',
      propTypes: {
          status: {
              type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
          },
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          placement: {
              type: oneOf(RAW_PLACEMENT_ARRAY),
              value: RAW_BOTTOM_START,
          },
          defaultValue: {
              type: function (key, value) {
              }
          },
          placeholder: {
              type: RAW_STRING,
              value: '请选择时间...'
          },
          showClear: {
              type: RAW_BOOLEAN,
          },
          format: {
              type: RAW_STRING,
          },
          hourStep: {
              type: RAW_NUMERIC,
          },
          minuteStep: {
              type: RAW_NUMERIC,
          },
          secondStep: {
              type: RAW_NUMERIC,
          },
          width: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var props = toTimeProps(options.props && options.props.defaultValue, this.get('hourList'), this.get('minuteList'), this.get('secondList'));
          props.isFocus = FALSE;
          props.isVisible = FALSE;
          props.RAW_CUSTOM = RAW_CUSTOM;
          return props;
      },
      components: {
          Popover: Popover,
          TimePanel: TimePanel,
      },
      computed: {
          inlineStyle: function () {
              var result = [];
              var width = this.get('width');
              if (width) {
                  result.push({
                      width: toPixel(width)
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
          needSecond: function () {
              return this.get('format') !== 'HH:mm';
          },
          hourList: function () {
              var hourStep = toNumber(this.get('hourStep'), DEFAULT_HOUR_STEP);
              return createRangeList(0, 23, hourStep);
          },
          minuteList: function () {
              var minuteStep = toNumber(this.get('minuteStep'), DEFAULT_MINUTE_STEP);
              return createRangeList(0, 59, minuteStep);
          },
          secondList: function () {
              if (this.get('needSecond')) {
                  var secondStep = toNumber(this.get('secondStep'), DEFAULT_SECOND_STEP);
                  return createRangeList(0, 59, secondStep);
              }
              return [];
          },
          hasValue: function () {
              return this.get('hour') >= 0
                  && this.get('minute') >= 0
                  && (!this.get('needSecond') || this.get('second') >= 0);
          }
      },
      events: {
          change: {
              listener: function (event, data) {
                  event.stop();
                  var hourIndex = data.hourIndex, minuteIndex = data.minuteIndex, secondIndex = data.secondIndex;
                  this.set({
                      hourIndex: hourIndex,
                      minuteIndex: minuteIndex,
                      secondIndex: secondIndex,
                      text: formatTime(this.get('hourList')[hourIndex], this.get('minuteList')[minuteIndex], this.get('secondList')[secondIndex])
                  });
              },
              ns: 'timePanel',
          },
          submit: {
              listener: function (event, data) {
                  event.stop();
                  var hour = data.hour, minute = data.minute, second = data.second;
                  this.set({
                      hour: hour,
                      minute: minute,
                      second: second,
                      isVisible: FALSE,
                      text: formatTime(hour, minute, second),
                  });
                  this.fireChange(hour, minute, second);
              },
              ns: 'timePanel',
          },
          outside: {
              listener: function (event) {
                  event.stop();
                  this.set({
                      isVisible: FALSE,
                      text: formatTime(this.get('hour'), this.get('minute'), this.get('second'))
                  });
              },
              ns: 'popover',
          }
      },
      methods: {
          onClick: function (event) {
              this.toggle('isVisible');
              fireClickEvent(event);
          },
          onClearClick: function (event) {
              // 停止冒泡，否则会展开下拉框
              event.stop();
              fireClickEvent(event);
              var props = toTimeProps(UNDEFINED, this.get('hourList'), this.get('minuteList'), this.get('secondList'));
              this.set(props);
              this.fireChange(props.hour, props.minute, props.second);
          },
          fireChange: function (hour, minute, second) {
              var data = {
                  hour: hour,
                  minute: minute,
              };
              if (this.get('needSecond')) {
                  data.second = second;
              }
              this.fire({
                  type: 'change',
                  ns: 'timePicker',
              }, data);
          }
      },
      afterMount: function () {
          onClickEventByEnterPress(this);
      }
  });

  var template$13 = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-image-picker-image-name'},$6={'class':'bell-image-picker-footer bell-image-picker-footer-disabled'},$7={'class':'bell-image-picker-message'},$8={'class':'bell-image-picker-mask'},$9={'class':'bell-image-picker-image-size'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_i(_p(_K,'imageList',_O.imageList),function(_K,_O,_P,_Q,index){_N.push(function(_M){_s(_K,0,'canDraggable').value?(_l(_M,'events','dragstart.native',_e('dragstart.native','handleDragStart(index)','dragstart','native','handleDragStart',{execute:function(_R,_S){return [index]}},$1,$3)),_l(_M,'events','dragend.native',_e('dragend.native','handleDragEnd()','dragend','native','handleDragEnd',$1,$1,$3)),_l(_M,'events','dragover.native',_e('dragover.native','handleDragOver(index)','dragover','native','handleDragOver',{execute:function(_R,_S){return [index]}},$1,$3)),_l(_M,'events','dragenter.native',_e('dragenter.native','handleDragEnter(index)','dragenter','native','handleDragEnter',{execute:function(_R,_S){return [index]}},$1,$3)),_l(_M,'events','dragleave.native',_e('dragleave.native','handleDragLeave(index)','dragleave','native','handleDragLeave',{execute:function(_R,_S){return [index]}},$1,$3)),_l(_M,'events','drop.native',_e('drop.native','handleDragDrop(index)','drop','native','handleDragDrop',{execute:function(_R,_S){return [index]}},$1,$3))):$1;_s(_K,0,'imageItemStyle').value?_l(_M,'props','style',_s(_K,0,'imageItemStyle').value):$1;return _M}({context:_D,events:{close:_e('close','removeItem($event, index)','close','','removeItem',{execute:function(_R,_S){return [_R,index]}},$3),'mouseenter.native':_e('mouseenter.native','handleMouseEnter(index)','mouseenter','native','handleMouseEnter',{execute:function(_R,_S){return [index]}},$1,$3),'mouseleave.native':_e('mouseleave.native','handleMouseLeave(index)','mouseleave','native','handleMouseLeave',{execute:function(_R,_S){return [index]}},$1,$3)},key:_r(_K,'id',_O.id).value,operator:_z,props:{className:'bell-image-picker-item bell-image-picker-card'+(_s(_K,0,'needSize').value?' bell-image-picker-card-show-size-'+_v(_s(_K,0,'showSize').value):''),draggable:_s(_K,0,'canDraggable').value,needClose:!_s(_K,0,'readOnly').value&&(_s(_K,0,'draggingIndex').value<0)},slots:{$slot_children:function(_L){var _N=[];(_r(_K,'thumbnail',_O.thumbnail).value||_r(_K,'url',_O.url).value)||_r(_K,'base64',_O.base64).value?_N.push(function(_M){_r(_K,'thumbnail',_O.thumbnail).value||_r(_K,'url',_O.url).value?_l(_M,'nativeAttrs','src',_s(_K,0,'formatImageUrl').value?_u(($0=_s(_K,0,'formatImageUrl').value,$0({height:_s(_K,0,'customImageHeight').value,responsive:$3,url:_r(_K,'thumbnail',_O.thumbnail).value||_r(_K,'url',_O.url).value,width:_s(_K,0,'customImageWidth').value}))).value:_r(_K,'thumbnail',_O.thumbnail).value||_r(_K,'url',_O.url).value):_r(_K,'base64',_O.base64).value?_l(_M,'nativeAttrs','src',_r(_K,'base64',_O.base64).value):$1;_r(_K,'name',_O.name).value?_l(_M,'nativeAttrs','alt',_r(_K,'name',_O.name).value):$1;_s(_K,0,'draggingIndex').value<0?_l(_M,'events','click',_e('click','handleImageClick(this, index)','click','','handleImageClick',{execute:function(_R,_S){return [_q(_K,_K.length-1).value,index]}})):$1;return _M}({context:_D,nativeAttrs:{draggable:'false'},operator:_y,tag:'img',type:3})):_r(_K,'name',_O.name).value?_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'div',text:_v(_r(_K,'name',_O.name).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_r(_K,'status',_O.status).value===_s(_K,0,'STATUS_UPLOADING').value?_N.push({children:function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'uploadingTitle',_O.uploadingTitle).value||'正在上传...'),type:1});_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-image-picker-progress',manual:$3,outside:$3,percent:_r(_K,'progress',_O.progress).value>0?_r(_K,'progress',_O.progress).value*100:0},tag:'LoadingBar',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):(_r(_K,'status',_O.status).value===_s(_K,0,'STATUS_ERROR').value)||(_r(_K,'status',_O.status).value==_s(_K,0,'STATUS_FAILURE').value)?_N.push({children:function(){var _N=[];_N.push({context:_D,html:_v(_r(_K,'message',_O.message).value),nativeAttrs:$7,operator:_y,tag:'div',type:3});_N.push({context:_D,operator:_z,parent:_L,props:{accept:_s(_K,0,'accept').value,beforeUpload:_s(_K,0,'beforeReuploadImage').value,className:'bell-image-picker-footer bell-image-picker-footer-enabled',index:index},ref:'reupload',slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'uploadText',_O.uploadText).value),type:1});return _N.length?_N:$1}},tag:'Upload',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3}):_s(_K,0,'needSize').value&&(_r(_K,'size',_O.size).value>0)?_N.push({context:_D,nativeAttrs:$9,operator:_y,tag:'div',text:_v(_u(($0=_p(_K,'formatFileSize',_O.formatFileSize,_E&&_E.formatFileSize||_F.formatFileSize).value,$0(_r(_K,'size',_O.size).value))).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}},tag:'Closable',type:4}));});!_p(_K,'readOnly',_O.readOnly).value&&(_p(_K,'restCount',_O.restCount).value>0)?_N.push(function(_M){_s(_K,0,'imageItemStyle').value?_l(_M,'props','style',_s(_K,0,'imageItemStyle').value):$1;return _M}({context:_D,operator:_z,props:{accept:_p(_K,'accept',_O.accept).value,beforeUpload:_p(_K,'beforeUploadImage',_O.beforeUploadImage).value,className:'bell-image-picker-item',draggable:$3,multiple:_p(_K,'restCount',_O.restCount).value>1},ref:'upload',slots:{$slot_children:function(_L){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{block:$3,height:_p(_K,'imageHeight',_O.imageHeight).value,title:_p(_K,'uploadText',_O.uploadText).value,vertical:$3,width:_p(_K,'imageWidth',_O.imageWidth).value},tag:'Add',type:4});return _N.length?_N:$1}},tag:'Upload',type:4})):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-image-picker'+(_p(_K,'imageMode',_O.imageMode).value?' bell-image-picker-'+_v(_p(_K,'imageMode',_O.imageMode).value):'')+(_p(_K,'imageHeight',_O.imageHeight).value<=100?' bell-image-picker-small':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var template$14 = (function(){var $1=void 0,$5={'class':'bell-loadingbar-indicator'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,nativeStyles:_b(_p(_K,'indicatorStyle',_O.indicatorStyle).value),operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-loadingbar'+(_p(_K,'type',_O.type).value?' bell-loadingbar-'+_v(_p(_K,'type',_O.type).value):'')+(_p(_K,'fixed',_O.fixed).value?' bell-loadingbar-fixed':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var LoadingBar = Yox.define({
      template: template$14,
      name: 'bell-LoadingBar',
      propTypes: {
          type: {
              type: oneOf(RAW_TYPE_ARRAY),
              value: RAW_TYPE_PRIMARY,
          },
          height: {
              type: RAW_NUMERIC,
              value: 2,
          },
          percent: {
              type: RAW_NUMBER,
              value: 0,
          },
          color: {
              type: RAW_STRING,
          },
          fixed: {
              type: RAW_BOOLEAN,
          },
          manual: {
              type: RAW_BOOLEAN,
          },
          outside: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          inlineStyle: function () {
              var result = [];
              var outside = this.get('outside');
              if (outside) {
                  var height = toNumber(this.get('height'));
                  result.push({
                      top: toPixel(-height)
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
          indicatorStyle: function () {
              var percent = this.get('percent');
              var height = this.get('height');
              var color = this.get('color');
              var result = {
                  width: toPercent(percent),
                  height: toPixel(height),
              };
              if (color) {
                  result.color = color;
              }
              return result;
          }
      },
      afterMount: function () {
          var me = this;
          var timer;
          var next = function () {
              timer = window.setTimeout(function () {
                  timer = UNDEFINED;
                  var value = me.increase('percent', Math.floor(Math.random() * 10), 98);
                  if (value < 98) {
                      next();
                  }
              }, 300);
          };
          me.watch('manual', function (manual) {
              if (manual) {
                  if (timer) {
                      clearTimeout(timer);
                      timer = UNDEFINED;
                  }
              }
              else {
                  next();
              }
          }, TRUE);
          var destroy = function (component) {
              if (component === me) {
                  if (timer) {
                      clearTimeout(timer);
                      timer = UNDEFINED;
                  }
                  Yox.lifeCycle.off(RAW_EVENT_BEFORE_DESTROY, destroy);
              }
          };
          Yox.lifeCycle.on(RAW_EVENT_BEFORE_DESTROY, destroy);
      }
  });

  var STATUS_UPLOADING = 'uploading';
  var STATUS_ERROR = 'error';
  var STATUS_FAILURE = 'failure';
  var KB = 1024;
  var MB = 1024 * KB;
  var GB = 1024 * MB;
  var formatDurationOptinos = {
      format: 'd:HH:mm:ss',
      trimDay: TRUE,
      trimHour: TRUE,
  };
  function readLocalFile(item) {
      return new Promise(function (resolve) {
          var file = item.file;
          if (file.type.indexOf('image') >= 0) {
              var reader = new FileReader();
              reader.onload = function (event) {
                  var base64 = event.target.result;
                  item.base64 = base64;
                  var image = new Image();
                  image.src = base64;
                  image.onload = function () {
                      item.width = image.naturalWidth;
                      item.height = image.naturalHeight;
                      image.onload = image.onerror = NULL;
                      resolve(item);
                  };
                  image.onerror = function () {
                      item.status = STATUS_ERROR;
                      item.message = 'error';
                      image.onload = image.onerror = NULL;
                      resolve(item);
                  };
              };
              reader.onerror = function () {
                  item.status = STATUS_ERROR;
                  item.message = 'error';
                  resolve(item);
              };
              reader.readAsDataURL(file);
          }
          else {
              var video_1 = DOCUMENT.createElement('video');
              video_1.preload = 'metadata';
              video_1.src = URL.createObjectURL(file);
              video_1.onloadedmetadata = function () {
                  URL.revokeObjectURL(video_1.src);
                  item.width = video_1.videoWidth;
                  item.height = video_1.videoHeight;
                  item.duration = video_1.duration;
                  video_1.onloadedmetadata = video_1.onerror = NULL;
                  resolve(item);
              };
              video_1.onerror = function () {
                  item.status = STATUS_ERROR;
                  item.message = 'error';
                  video_1.onloadedmetadata = video_1.onerror = NULL;
                  resolve(item);
              };
          }
      });
  }
  function validateFile(item, minSize, maxSize, minRatio, maxRatio, minWidth, maxWidth, minHeight, maxHeight, minDuration, maxDuration) {
      var errors = [];
      if (minSize > 0) {
          if (item.size < minSize) {
              errors.push("\u5927\u5C0F\u4E0D\u80FD\u5C0F\u4E8E " + formatFileSize(minSize));
          }
      }
      if (maxSize > 0) {
          if (item.size > maxSize) {
              errors.push("\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 " + formatFileSize(maxSize));
          }
      }
      if (item.height > 0) {
          var ratio = item.width / item.height;
          if (minRatio > 0) {
              if (ratio < minRatio) {
                  errors.push("\u5BBD\u9AD8\u6BD4\u4E0D\u80FD\u5C0F\u4E8E " + minRatio);
              }
          }
          if (maxRatio > 0) {
              if (ratio > maxRatio) {
                  errors.push("\u5BBD\u9AD8\u6BD4\u4E0D\u80FD\u5927\u4E8E " + maxRatio);
              }
          }
      }
      if (minWidth > 0) {
          if (item.width < minWidth) {
              errors.push("\u5BBD\u5EA6\u4E0D\u80FD\u5C0F\u4E8E " + minWidth + "px");
          }
      }
      if (minHeight > 0) {
          if (item.height < minHeight) {
              errors.push("\u9AD8\u5EA6\u4E0D\u80FD\u5C0F\u4E8E " + minHeight + "px");
          }
      }
      if (maxWidth > 0) {
          if (item.width > maxWidth) {
              errors.push("\u5BBD\u5EA6\u4E0D\u80FD\u5927\u4E8E " + maxWidth + "px");
          }
      }
      if (maxHeight > 0) {
          if (item.height > maxHeight) {
              errors.push("\u9AD8\u5EA6\u4E0D\u80FD\u5927\u4E8E " + maxHeight + "px");
          }
      }
      if (minDuration > 0) {
          if (item.duration < minDuration) {
              errors.push("\u65F6\u957F\u4E0D\u80FD\u5C0F\u4E8E " + formatMillisecond(minDuration * 1000, formatDurationOptinos));
          }
      }
      if (maxDuration > 0) {
          if (item.duration > maxDuration) {
              errors.push("\u65F6\u957F\u4E0D\u80FD\u8D85\u8FC7 " + formatMillisecond(maxDuration * 1000, formatDurationOptinos));
          }
      }
      return errors;
  }
  function formatFileSize(size) {
      if (size >= GB) {
          return (size / GB).toFixed(1) + ' G';
      }
      if (size >= MB) {
          return (size / MB).toFixed(1) + ' MB';
      }
      return (size / KB).toFixed(1) + ' KB';
  }

  var CLASS_CARD_MOUSE_ENTER = 'bell-image-picker-card-mouse-enter';
  var CLASS_CARD_DRAG_ENTER = 'bell-image-picker-card-drag-enter';
  var ImagePicker = Yox.define({
      template: template$13,
      name: 'bell-ImagePicker',
      propTypes: {
          imageList: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          imageWidth: {
              type: RAW_NUMERIC,
              value: 80,
          },
          imageHeight: {
              type: RAW_NUMERIC,
              value: 80,
          },
          imageMode: {
              type: oneOf([RAW_STRETCH, RAW_CONTAIN]),
              value: RAW_CONTAIN,
          },
          gap: {
              type: RAW_ARRAY,
              value: [8, 10],
          },
          minSize: {
              type: RAW_NUMERIC,
          },
          maxSize: {
              type: RAW_NUMERIC,
          },
          maxCount: {
              type: RAW_NUMERIC,
          },
          minRatio: {
              type: RAW_NUMERIC,
          },
          maxRatio: {
              type: RAW_NUMERIC,
          },
          minWidth: {
              type: RAW_NUMERIC,
          },
          maxWidth: {
              type: RAW_NUMERIC,
          },
          minHeight: {
              type: RAW_NUMERIC,
          },
          maxHeight: {
              type: RAW_NUMERIC,
          },
          minDuration: {
              type: RAW_NUMERIC,
          },
          maxDuration: {
              type: RAW_NUMERIC,
          },
          accept: {
              type: RAW_STRING,
              value: RAW_IMAGE_ACCEPT,
          },
          formatImageUrl: {
              type: RAW_FUNCTION,
          },
          cropImage: {
              type: RAW_FUNCTION,
          },
          uploadTitle: {
              type: RAW_STRING,
          },
          uploadingTitle: {
              type: RAW_STRING,
          },
          uploadImage: {
              type: RAW_FUNCTION,
          },
          showSize: {
              type: oneOf([RAW_ALWAYS, RAW_HOVER, RAW_NEVER]),
              value: RAW_ALWAYS,
          },
          readOnly: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          var me = this;
          return {
              RAW_NEVER: RAW_NEVER,
              STATUS_UPLOADING: STATUS_UPLOADING,
              STATUS_ERROR: STATUS_ERROR,
              STATUS_FAILURE: STATUS_FAILURE,
              draggingIndex: -1,
              uploadingCount: 0,
              beforeReuploadImage: function (data) {
                  var index = data.index, fileList = data.fileList;
                  readLocalFile(fileList[0]).then(function (item) {
                      me.validateImageList([item]);
                      var reupload = me.$refs.reupload;
                      reupload.reset();
                      me.replaceItem(item, index);
                  });
              },
              beforeUploadImage: function (data) {
                  var restCount = me.get('restCount');
                  var fileList = data.fileList;
                  // 校验可选数量
                  if (fileList.length > restCount) {
                      if (me.get('isVideoUploader')) {
                          me.fireError("\u4EC5\u53EF\u4EE5\u9009\u62E9 " + restCount + " \u4E2A\u89C6\u9891");
                      }
                      else {
                          me.fireError("\u4EC5\u53EF\u4EE5\u9009\u62E9 " + restCount + " \u5F20\u56FE\u7247");
                      }
                      return;
                  }
                  Promise.all(fileList.map(readLocalFile))
                      .then(function (newList) {
                      me.validateImageList(newList);
                      var upload = me.$refs.upload;
                      upload.reset();
                      me.appendItems(newList);
                  });
              }
          };
      },
      computed: {
          needSize: function () {
              var showSize = this.get('showSize');
              return showSize && showSize !== RAW_NEVER;
          },
          isVideoUploader: function () {
              var accept = this.get('accept');
              return accept ? accept.indexOf('video') >= 0 : FALSE;
          },
          uploadText: function () {
              var uploadTitle = this.get('uploadTitle');
              var isVideoUploader = this.get('isVideoUploader');
              return uploadTitle || (isVideoUploader ? '上传视频' : '上传图片');
          },
          restCount: function () {
              var imageCount = this.get('imageList.length');
              var maxCount = this.get('maxCount');
              return maxCount - imageCount;
          },
          canDraggable: function () {
              var uploadingCount = this.get('uploadingCount');
              var readOnly = this.get('readOnly');
              var imageList = this.get('imageList');
              return !uploadingCount && !readOnly && imageList.length > 1;
          },
          inlineStyle: function () {
              return spaceListStyle(this.get('gap'), FALSE, TRUE, this.get('style'));
          },
          imageItemStyle: function () {
              var imageWidth = this.get('imageWidth');
              var imageHeight = this.get('imageHeight');
              return spaceItemStyle(this.get('gap'), FALSE, TRUE, {
                  width: toPixel(imageWidth),
                  height: toPixel(imageHeight),
              });
          },
      },
      filters: {
          formatFileSize: formatFileSize,
      },
      methods: {
          handleImageClick: function (image, index) {
              this.fire({
                  type: 'preview',
                  ns: 'imagePicker'
              }, {
                  image: image,
                  index: index,
              });
          },
          getImageIndexById: function (id) {
              var imageList = this.get('imageList');
              for (var i = 0, len = imageList.length; i < len; i++) {
                  if (id === imageList[i].id) {
                      return i;
                  }
              }
              return -1;
          },
          validateImageList: function (imageList) {
              var me = this;
              var minSize = toNumber(me.get('minSize'));
              var maxSize = toNumber(me.get('maxSize'));
              var minRatio = toNumber(me.get('minRatio'));
              var maxRatio = toNumber(me.get('maxRatio'));
              var minWidth = toNumber(me.get('minWidth'));
              var minHeight = toNumber(me.get('minHeight'));
              var maxWidth = toNumber(me.get('maxWidth'));
              var maxHeight = toNumber(me.get('maxHeight'));
              var minDuration = toNumber(me.get('minDuration'));
              var maxDuration = toNumber(me.get('maxDuration'));
              for (var i = 0, len = imageList.length; i < len; i++) {
                  var item = imageList[i];
                  var errors = validateFile(item, minSize, maxSize, minRatio, maxRatio, minWidth, maxWidth, minHeight, maxHeight, minDuration, maxDuration);
                  if (errors.length) {
                      item.status = STATUS_ERROR;
                      item.message = errors.join('<br>');
                  }
              }
          },
          checkReady: function () {
              var result = {
                  hasLocal: FALSE,
                  hasUploading: FALSE,
                  hasError: FALSE,
              };
              var imageList = this.get('imageList');
              for (var i = 0, len = imageList.length; i < len; i++) {
                  if (imageList[i].status === STATUS_UPLOADING) {
                      result.hasUploading = TRUE;
                  }
                  else if (imageList[i].status === STATUS_ERROR || imageList[i].status === STATUS_FAILURE) {
                      result.hasError = TRUE;
                  }
                  if (!imageList[i].url) {
                      result.hasLocal = TRUE;
                  }
              }
              return result;
          },
          appendItems: function (items) {
              var me = this;
              var imageList = me.copy(me.get('imageList'));
              var length = imageList.length;
              items.forEach(function (item) {
                  imageList.push(item);
              });
              me.set('imageList', imageList);
              me.fireChange();
              items.forEach(function (item, index) {
                  me.uploadItem(item.id, length + index);
              });
          },
          replaceItem: function (item, index) {
              var me = this;
              var imageList = me.copy(me.get('imageList'));
              imageList.splice(index, 1, item);
              me.set('imageList', imageList);
              me.fireChange();
              me.uploadItem(item.id, index);
          },
          removeItem: function (event, index) {
              event.stop();
              this.removeAt('imageList', index);
              this.fireChange();
          },
          upload: function () {
              var me = this;
              var imageList = me.get('imageList');
              Yox.array.each(imageList, function (item, index) {
                  me.uploadItem(item.id, index);
              });
          },
          uploadItem: function (id, index) {
              var me = this;
              var item = me.get("imageList." + index);
              // 如果校验未通过，或者已上传成功，则直接返回
              if (item.status === STATUS_ERROR || item.url) {
                  return;
              }
              var uploadHandler = function (item) {
                  var uploadImage = me.get('uploadImage');
                  me.increase('uploadingCount');
                  uploadImage({
                      id: item.id,
                      file: item.file,
                      onStart: function () {
                          var index = me.getImageIndexById(id);
                          if (index >= 0) {
                              me.set("imageList." + index + ".status", STATUS_UPLOADING);
                              me.set("imageList." + index + ".progress", 0);
                              me.fireChange();
                          }
                      },
                      onError: function (error) {
                          var index = me.getImageIndexById(id);
                          if (index >= 0) {
                              me.set("imageList." + index + ".status", STATUS_FAILURE);
                              me.set("imageList." + index + ".message", error || '上传失败');
                              me.decrease('uploadingCount');
                              me.fireChange();
                          }
                      },
                      onProgress: function (progress) {
                          var index = me.getImageIndexById(id);
                          if (index >= 0) {
                              me.set("imageList." + index + ".progress", progress);
                              me.fireChange();
                          }
                      },
                      onSuccess: function (data) {
                          var index = me.getImageIndexById(id);
                          if (index >= 0) {
                              me.set("imageList." + index, data);
                              me.decrease('uploadingCount');
                              me.fireChange();
                          }
                      }
                  });
              };
              var cropImage = me.get('cropImage');
              if (item.base64 && cropImage) {
                  cropImage({
                      index: index,
                      base64: item.base64,
                      callback: function (result) {
                          Yox.object.extend(item, result);
                          uploadHandler(item);
                      }
                  });
              }
              else {
                  uploadHandler(item);
              }
          },
          fireError: function (error) {
              this.fire({
                  type: 'error',
                  ns: 'imagePicker'
              }, {
                  error: error
              });
          },
          fireChange: function () {
              this.fire({
                  type: 'change',
                  ns: 'imagePicker'
              }, {
                  imageList: this.get('imageList')
              });
          },
          addImgWrapperItemClass: function (index, className) {
              var element = this.$el;
              var targetChild = element.children[index];
              if (targetChild) {
                  Yox.dom.addClass(targetChild, className);
              }
          },
          removeImgWrapperItemClass: function (index, className) {
              var element = this.$el;
              var targetChild = element.children[index];
              if (targetChild) {
                  Yox.dom.removeClass(targetChild, className);
              }
          },
          handleMouseEnter: function (index) {
              // https://stackoverflow.com/questions/11989289/css-html5-hover-state-remains-after-drag-and-drop
              // drag 拖拽的时候，hover 状态仍然会保留，改用监听 mouseenter 和 mouseleave 来添加删除 class
              // 并在 dragstart 的时候删除添加的 class，使 active 状态失效
              this.addImgWrapperItemClass(index, CLASS_CARD_MOUSE_ENTER);
          },
          handleMouseLeave: function (index) {
              this.removeImgWrapperItemClass(index, CLASS_CARD_MOUSE_ENTER);
          },
          handleDragStart: function (index) {
              this.set('draggingIndex', index);
              this.removeImgWrapperItemClass(index, CLASS_CARD_MOUSE_ENTER);
          },
          handleDragEnd: function () {
              // https://stackoverflow.com/questions/38111946/is-there-a-defined-ordering-between-dragend-and-drop-events
              // dragend 事件会在 drop 事件之后触发，做一些清理工作
              this.set('draggingIndex', -1);
          },
          handleDragOver: function (index) {
              var draggingIndex = this.get('draggingIndex');
              if (draggingIndex < 0) {
                  return FALSE;
              }
              if (draggingIndex !== index) {
                  this.addImgWrapperItemClass(index, CLASS_CARD_DRAG_ENTER);
              }
              // https://hijiangtao.github.io/2020/05/04/Drag-and-Drop-note/
              // 返回 false, 阻止浏览器这种默认行为
              return FALSE;
          },
          handleDragEnter: function (index) {
              var draggingIndex = this.get('draggingIndex');
              if (draggingIndex < 0) {
                  return FALSE;
              }
              if (draggingIndex !== index) {
                  this.addImgWrapperItemClass(index, CLASS_CARD_DRAG_ENTER);
              }
              return FALSE;
          },
          handleDragLeave: function (index) {
              var draggingIndex = this.get('draggingIndex');
              if (draggingIndex < 0) {
                  return;
              }
              this.removeImgWrapperItemClass(index, CLASS_CARD_DRAG_ENTER);
          },
          handleDragDrop: function (index) {
              var draggingIndex = this.get('draggingIndex');
              if (draggingIndex < 0) {
                  return FALSE;
              }
              var imageList = this.get('imageList');
              if (draggingIndex >= 0
                  && draggingIndex < imageList.length
                  && draggingIndex !== index) {
                  this.removeImgWrapperItemClass(index, CLASS_CARD_DRAG_ENTER);
                  var startImageItem = imageList[draggingIndex];
                  var newImageList = this.copy(imageList);
                  if (draggingIndex < index) {
                      newImageList.splice(index + 1, 0, startImageItem);
                      newImageList.splice(draggingIndex, 1);
                  }
                  else {
                      newImageList.splice(index, 0, startImageItem);
                      newImageList.splice(draggingIndex + 1, 1);
                  }
                  this.set('imageList', newImageList);
                  this.fireChange();
              }
              this.set('draggingIndex', -1);
              return FALSE;
          },
      },
      components: {
          Add: Add,
          Icon: Icon,
          Space: Space,
          Button: Button,
          Upload: Upload,
          Closable: Closable,
          LoadingBar: LoadingBar,
      },
  });

  var template$15 = (function(){var $0,$1=void 0,$3=!0,$5='useFallback',$6=$3,$7={'class':'bell-image-message'},$8={'class':'bell-image-action'},$9={'class':'bell-image-mask'},$10={'class':'bell-image-footer bell-image-footer-disabled'},$11={'class':'bell-image-footer bell-image-footer-enabled'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];(_o(_K,_K.length-1,'image.url',$3).value||_o(_K,_K.length-1,'image.base64',$3).value)||_p(_K,'fallback',_O.fallback).value?_N.push(function(_M){_p(_K,'useFallback',_O.useFallback).value&&_p(_K,'fallback',_O.fallback).value?_l(_M,'nativeAttrs','src',_p(_K,'fallback',_O.fallback).value):_o(_K,_K.length-1,'image.base64',$3).value?_l(_M,'nativeAttrs','src',_o(_K,_K.length-1,'image.base64',$3).value):_l(_M,'nativeAttrs','src',_p(_K,'formatImageUrl',_O.formatImageUrl).value?_u(($0=_p(_K,'formatImageUrl',_O.formatImageUrl,_E&&_E.formatImageUrl||_F.formatImageUrl).value,$0({height:_p(_K,'heightNumber',_O.heightNumber).value,responsive:$3,url:_o(_K,_K.length-1,'image.url',$3).value,width:_p(_K,'widthNumber',_O.widthNumber).value}))).value:_o(_K,_K.length-1,'image.url',$3).value);_p(_K,'alt',_O.alt).value?_l(_M,'nativeAttrs','alt',_p(_K,'alt',_O.alt).value):$1;return _M}({context:_D,events:{error:_e('error',"set('useFallback', true)",'error','','set',{execute:function(_R,_S){return [$5,$6]}})},nativeAttrs:{draggable:'false'},operator:_y,tag:'img',type:3})):_N.push({children:function(){var _N=[];($0={children:_k('$slot_placeholder'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-image-placeholder'+(!_p(_K,'$slot_placeholder',_O.$slot_placeholder).value?_p(_K,'isVideoUploader',_O.isVideoUploader).value?' bell-video-placeholder-default':' bell-image-placeholder-default':'')},operator:_y,tag:'div',type:3});(_o(_K,_K.length-1,'image.message',$3).value||_p(_K,'showPreview',_O.showPreview).value)||_p(_K,'showDelete',_O.showDelete).value?_N.push({children:function(){var _N=[];_o(_K,_K.length-1,'image.message',$3).value?_N.push({context:_D,html:_v(_o(_K,_K.length-1,'image.message',$3).value),nativeAttrs:$7,operator:_y,tag:'div',type:3}):(_p(_K,'showPreview',_O.showPreview).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{name:'zoom-in-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','previewImage()','click','','previewImage')},nativeAttrs:$8,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2}),_p(_K,'showDelete',_O.showDelete).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{name:'delete-bin-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','deleteImage()','click','','deleteImage')},nativeAttrs:$8,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2}));return _N.length?_N:$1}(),context:_D,nativeAttrs:$9,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'uploadTitle',_O.uploadTitle).value?_p(_K,'uploadImage',_O.uploadImage).value?_p(_K,'isUploading',_O.isUploading).value?_N.push({children:function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'uploadingTitle',_O.uploadingTitle).value),type:1});_N.push({context:_D,operator:_z,props:{className:'bell-image-progress',manual:$3,outside:$3,percent:_o(_K,_K.length-1,'image.progress',$3).value>0?_o(_K,_K.length-1,'image.progress',$3).value*100:0},tag:'LoadingBar',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$10,operator:_y,tag:'div',type:3}):_N.push({context:_D,operator:_z,props:{accept:_p(_K,'accept',_O.accept).value,beforeUpload:_p(_K,'beforeUploadImage',_O.beforeUploadImage).value,className:'bell-image-footer bell-image-footer-enabled'},ref:'upload',slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'uploadTitle',_O.uploadTitle).value),type:1});return _N.length?_N:$1}},tag:'Upload',type:4}):_N.push({context:_D,events:{click:_f('click','uploadClick.image','click','','uploadClick','image')},nativeAttrs:$11,operator:_y,tag:'div',text:_v(_p(_K,'uploadTitle',_O.uploadTitle).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-image'+(_p(_K,'simple',_O.simple).value?' bell-image-simple':' bell-image-bordered')+(_p(_K,'mode',_O.mode).value?' bell-image-'+_v(_p(_K,'mode',_O.mode).value):'')+(_p(_K,'heightNumber',_O.heightNumber).value<=100?' bell-image-small':'')+(_p(_K,'heightNumber',_O.heightNumber).value<=70?' bell-image-mini':'')+(_p(_K,'uploadTitle',_O.uploadTitle).value?' bell-image-with-upload':'')+(_o(_K,_K.length-1,'image.message',$3).value?' bell-image-with-message':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Image$1 = Yox.define({
      template: template$15,
      name: 'bell-Image',
      propTypes: {
          width: {
              type: RAW_NUMERIC,
              value: 60,
          },
          height: {
              type: RAW_NUMERIC,
              value: 60,
          },
          mode: {
              type: oneOf([RAW_STRETCH, RAW_CONTAIN]),
              value: RAW_STRETCH,
          },
          minSize: {
              type: RAW_NUMERIC,
          },
          maxSize: {
              type: RAW_NUMERIC,
          },
          minRatio: {
              type: RAW_NUMERIC,
          },
          maxRatio: {
              type: RAW_NUMERIC,
          },
          minWidth: {
              type: RAW_NUMERIC,
          },
          maxWidth: {
              type: RAW_NUMERIC,
          },
          minHeight: {
              type: RAW_NUMERIC,
          },
          maxHeight: {
              type: RAW_NUMERIC,
          },
          minDuration: {
              type: RAW_NUMERIC,
          },
          maxDuration: {
              type: RAW_NUMERIC,
          },
          simple: {
              type: RAW_BOOLEAN,
          },
          showPreview: {
              type: RAW_BOOLEAN,
          },
          showDelete: {
              type: RAW_BOOLEAN,
          },
          url: {
              type: RAW_STRING,
          },
          alt: {
              type: RAW_STRING,
          },
          fallback: {
              type: RAW_STRING,
          },
          formatImageUrl: {
              type: RAW_FUNCTION,
          },
          uploadTitle: {
              type: RAW_STRING,
          },
          uploadingTitle: {
              type: RAW_STRING,
              value: '正在上传...',
          },
          uploadImage: {
              type: RAW_FUNCTION,
          },
          cropImage: {
              type: RAW_FUNCTION,
          },
          accept: {
              type: RAW_STRING,
              value: RAW_IMAGE_ACCEPT,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          var me = this;
          return {
              useFallback: FALSE,
              image: {
                  url: me.get('url'),
                  base64: '',
                  status: UNDEFINED,
                  progress: 0,
                  message: '',
              },
              beforeUploadImage: function (data) {
                  var fileList = data.fileList;
                  readLocalFile(fileList[0]).then(function (image) {
                      // @ts-ignore
                      me.validateImage(image);
                      me.set({
                          image: image,
                      });
                      var upload = me.$refs.upload;
                      upload.reset();
                      // @ts-ignore
                      me.uploadImage(image);
                  });
              },
          };
      },
      computed: {
          isUploading: function () {
              return this.get('image.status') === STATUS_UPLOADING;
          },
          isVideoUploader: function () {
              var accept = this.get('accept');
              return accept ? accept.indexOf('video') >= 0 : FALSE;
          },
          widthNumber: function () {
              return toNumber(this.get('width'));
          },
          heightNumber: function () {
              return toNumber(this.get('height'));
          },
          inlineStyle: function () {
              var result = [];
              var widthNumber = this.get('widthNumber');
              var heightNumber = this.get('heightNumber');
              result.push({
                  width: toPixel(widthNumber),
                  height: toPixel(heightNumber),
              });
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      },
      watchers: {
          url: function (url) {
              this.set('image.url', url);
          },
          'image.url': function () {
              this.set('useFallback', FALSE);
          },
          'image.base64': function () {
              this.set('useFallback', FALSE);
          }
      },
      methods: {
          validateImage: function (image) {
              var me = this;
              var minSize = toNumber(me.get('minSize'));
              var maxSize = toNumber(me.get('maxSize'));
              var minRatio = toNumber(me.get('minRatio'));
              var maxRatio = toNumber(me.get('maxRatio'));
              var minWidth = toNumber(me.get('minWidth'));
              var minHeight = toNumber(me.get('minHeight'));
              var maxWidth = toNumber(me.get('maxWidth'));
              var maxHeight = toNumber(me.get('maxHeight'));
              var minDuration = toNumber(me.get('minDuration'));
              var maxDuration = toNumber(me.get('maxDuration'));
              var errors = validateFile(image, minSize, maxSize, minRatio, maxRatio, minWidth, maxWidth, minHeight, maxHeight, minDuration, maxDuration);
              if (errors.length) {
                  image.status = STATUS_ERROR;
                  image.message = errors.join('<br>');
              }
          },
          previewImage: function (event) {
              event.stop();
              this.fire({
                  type: 'preview',
                  ns: 'image',
              }, {
                  url: this.get('image.url'),
              });
          },
          deleteImage: function (event) {
              event.stop();
              this.fire({
                  type: 'delete',
                  ns: 'image',
              });
          },
          uploadImage: function (image) {
              var me = this;
              // 如果校验未通过，或者已上传成功，则直接返回
              if (image.status === STATUS_ERROR || image.url) {
                  return;
              }
              var uploadHandler = function (image) {
                  var uploadImage = me.get('uploadImage');
                  uploadImage({
                      id: image.id,
                      file: image.file,
                      onStart: function () {
                          me.set('image.status', STATUS_UPLOADING);
                          me.set('image.progress', 0);
                      },
                      onError: function (error) {
                          me.set('image.status', STATUS_FAILURE);
                          me.set('image.message', error || '上传失败');
                      },
                      onProgress: function (progress) {
                          me.set('image.progress', progress);
                      },
                      onSuccess: function (data) {
                          me.set('image.status', UNDEFINED);
                          me.fire({
                              type: 'uploadSuccess',
                              ns: 'image',
                          }, {
                              image: data,
                          });
                      }
                  });
              };
              var cropImage = me.get('cropImage');
              if (image.base64 && cropImage) {
                  cropImage({
                      base64: image.base64,
                      callback: function (result) {
                          Yox.object.extend(image, result);
                          uploadHandler(image);
                      }
                  });
              }
              else {
                  uploadHandler(image);
              }
          }
      },
      components: {
          Icon: Icon,
          Upload: Upload,
          LoadingBar: LoadingBar,
      }
  });

  var template$16 = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-carousel-item'},$6={'class':'bell-carousel-list'},$7=0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'$slot_children',_O.$slot_children),function(_K,_O,_P,_Q){_r(_K,'type',_O.type).value!==2?_N.push({context:_D,operator:_z,props:{delay:'1000'},slots:{$slot_children:function(_L){var _N=[];_N.push({children:function(){var _N=[];($0=_q(_K,_K.length-1).value,$0?_N.push($0):$1);return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'ResizeObserver',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,ref:'list',tag:'div',type:3});_p(_K,'count',_O.count).value>1?_N.push({children:function(){var _N=[];_j($7,_p(_K,'count',_O.count).value,$1,function(_K,_O,_P,_Q,i){_N.push(function(_M){_s(_K,0,'trigger').value===_s(_K,0,'RAW_CLICK').value?_l(_M,'events','click',_e('click','go(i)','click','','go',{execute:function(_R,_S){return [i]}})):_l(_M,'events','mouseenter',_e('mouseenter','go(i)','mouseenter','','go',{execute:function(_R,_S){return [i]}}));return _M}({context:_D,nativeAttrs:{'class':'bell-carousel-indicator-item'+(_s(_K,0,'index').value===i?' bell-carousel-indicator-item-active':'')},operator:_y,tag:'div',type:3}));});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-carousel-indicator'+(_p(_K,'indicatorType',_O.indicatorType).value?' bell-carousel-indicator-'+_v(_p(_K,'indicatorType',_O.indicatorType).value):'')+(_p(_K,'indicatorPosition',_O.indicatorPosition).value?' bell-carousel-indicator-'+_v(_p(_K,'indicatorPosition',_O.indicatorPosition).value):'')},operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-carousel'+(_p(_K,'direction',_O.direction).value?' bell-carousel-'+_v(_p(_K,'direction',_O.direction).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Carousel = Yox.define({
      template: template$16,
      name: 'bell-Carousel',
      propTypes: {
          autoPlay: {
              type: RAW_BOOLEAN,
          },
          interval: {
              type: RAW_NUMERIC,
              value: 3000,
          },
          trigger: {
              type: oneOf([RAW_CLICK, RAW_HOVER]),
              value: RAW_CLICK
          },
          indicatorType: {
              type: oneOf(['dot', 'line']),
              value: 'dot'
          },
          indicatorPosition: {
              type: oneOf([
                  RAW_TOP,
                  RAW_RIGHT,
                  RAW_BOTTOM,
                  RAW_LEFT ]),
              value: RAW_BOTTOM,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              RAW_CLICK: RAW_CLICK,
              RAW_HOVER: RAW_HOVER,
              RAW_TOP: RAW_TOP,
              RAW_RIGHT: RAW_RIGHT,
              RAW_BOTTOM: RAW_BOTTOM,
              RAW_LEFT: RAW_LEFT,
              index: 0,
              size: UNDEFINED,
          };
      },
      computed: {
          count: function () {
              return this.get(RAW_SLOT_CHILDREN + ".length") || 0;
          },
          direction: function () {
              var indicatorPosition = this.get('indicatorPosition');
              return indicatorPosition === 'left' || indicatorPosition === 'right'
                  ? RAW_VERTICAL
                  : RAW_HORIZONTAL;
          },
          inlineStyle: function () {
              var result = [];
              var size = this.get('size');
              if (size) {
                  result.push({
                      width: toPixel(size.width),
                      height: toPixel(size.height),
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      },
      events: {
          resize: {
              listener: function (event, data) {
                  if (event.phase !== Yox.Event.PHASE_UPWARD) {
                      return;
                  }
                  event.stop();
                  this.set('size', data);
              },
              ns: 'resizeObserver'
          }
      },
      watchers: {
          index: function (value) {
              // @ts-ignore
              this.move(value, TRUE);
          },
          direction: function () {
              // @ts-ignore
              this.move(this.get('index'));
          }
      },
      methods: {
          go: function (index) {
              this.set('index', index);
          },
          prev: function () {
              var index = this.get('index') - 1;
              var count = this.get('count');
              // @ts-ignore
              this.go(index < 0 ? (count - 1) : index);
          },
          next: function () {
              var index = this.get('index') + 1;
              var count = this.get('count');
              // @ts-ignore
              this.go(index === count ? 0 : index);
          },
          move: function (index, animated) {
              var size = this.get('size');
              if (!size) {
                  return;
              }
              var element = this.$refs.list;
              element.style.transitionDuration = animated ? '0.2s' : '';
              element.style.transform = this.get('direction') === RAW_HORIZONTAL
                  ? ('translateX(-' + toPixel(index * size.width) + ')')
                  : ('translateY(-' + toPixel(index * size.height) + ')');
          }
      },
      components: {
          ResizeObserver: ResizeObserver$1
      },
      afterMount: function () {
          var me = this;
          // 自动播放
          var autoPlayTimer;
          var autoPlayHandler = function () {
              // @ts-ignore
              me.next();
              autoPlayTimer = window.setTimeout(autoPlayHandler, me.get('interval'));
          };
          me.watch('autoPlay', function (newValue) {
              if (newValue) {
                  autoPlayTimer = window.setTimeout(autoPlayHandler, me.get('interval'));
              }
              else if (autoPlayTimer) {
                  clearTimeout(autoPlayTimer);
                  autoPlayTimer = 0;
              }
          }, TRUE);
          var destroy = function (component) {
              if (component === me) {
                  if (autoPlayTimer) {
                      clearTimeout(autoPlayTimer);
                  }
                  Yox.lifeCycle.off(RAW_EVENT_BEFORE_DESTROY, destroy);
              }
          };
          Yox.lifeCycle.on(RAW_EVENT_BEFORE_DESTROY, destroy);
      },
  });

  var template$17 = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-collapse'+(_p(_K,'simple',_O.simple).value?' bell-collapse-simple':' bell-collapse-bordered')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Collapse = Yox.define({
      template: template$17,
      name: 'bell-Collapse',
      propTypes: {
          value: {
              type: [RAW_STRING, RAW_NUMBER, RAW_ARRAY],
          },
          accordion: {
              type: RAW_BOOLEAN,
          },
          simple: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      watchers: {
          value: function (value) {
              this.fire({
                  type: 'change',
                  ns: 'collapse',
              }, {
                  value: value,
              }, TRUE);
          }
      },
      events: {
          toggle: {
              listener: function (event, data) {
                  if (event.phase === Yox.Event.PHASE_UPWARD) {
                      event.stop();
                      var name = data.name, opened = data.opened;
                      var value = this.get('value');
                      if (this.get('accordion')) {
                          value = opened ? name : UNDEFINED;
                      }
                      else {
                          value = Yox.is.array(value) ? this.copy(value) : [];
                          if (opened) {
                              if (!Yox.array.has(value, name, FALSE)) {
                                  value.push(name);
                              }
                          }
                          else {
                              Yox.array.remove(value, name, FALSE);
                          }
                      }
                      this.set('value', value);
                  }
              },
              ns: 'collapseItem'
          }
      }
  });

  var template$18 = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-collapse-title'},$6={'class':'bell-collapse-title-wrapper'},$7={'class':'bell-collapse-extra'},$8={'class':'bell-collapse-content'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?_l(_M,'events','click',_e('click','onClick()','click','','onClick')):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-collapse-arrow-icon',name:'arrow-right-s-line'},tag:'Icon',type:4});_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3});_p(_K,'$slot_extra',_O.$slot_extra).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-collapse-header'},operator:_y,tag:'div',type:3}));_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-collapse-item'+(_p(_K,'opened',_O.opened).value?' bell-collapse-opened':'')+(_p(_K,'disabled',_O.disabled).value?' bell-collapse-disabled':' bell-collapse-enabled')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var CollapseItem = Yox.define({
      template: template$18,
      name: 'bell-CollapseItem',
      propTypes: {
          title: {
              type: RAW_STRING,
              required: TRUE,
          },
          name: {
              type: [RAW_STRING, RAW_NUMBER],
              required: TRUE,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var collapse = findComponentUpward(options.parent, 'bell-Collapse');
          var opened = FALSE;
          if (collapse) {
              var name = this.get('name');
              var value = collapse.get('value');
              opened = Yox.is.array(value)
                  ? Yox.array.has(value, name, FALSE)
                  : value == name;
          }
          return {
              opened: opened,
          };
      },
      events: {
          change: {
              listener: function (event, data) {
                  // 只接收父级事件，再上一级的就不管了
                  // 避免嵌套面板的问题
                  if (event.target !== this.$parent) {
                      return;
                  }
                  var name = this.get('name');
                  this.set('opened', Yox.is.array(data.value)
                      ? Yox.array.has(data.value, name, FALSE)
                      : data.value == name);
              },
              ns: 'collapse',
          }
      },
      methods: {
          onClick: function () {
              this.fire({
                  type: 'toggle',
                  ns: 'collapseItem',
              }, {
                  name: this.get('name'),
                  opened: !this.get('opened'),
              });
          },
      },
      components: {
          Icon: Icon,
      }
  });

  var template$19 = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-card bell-card-shadow-'+_v(_p(_K,'shadow',_O.shadow).value)+(_p(_K,'simple',_O.simple).value?' bell-card-simple':' bell-card-bordered')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Card = Yox.define({
      template: template$19,
      name: 'bell-Card',
      propTypes: {
          simple: {
              type: RAW_BOOLEAN,
          },
          shadow: {
              type: oneOf([RAW_ALWAYS, RAW_HOVER, RAW_NEVER]),
              value: RAW_ALWAYS,
          },
          width: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          inlineStyle: function () {
              var result = [];
              var width = this.get('width');
              if (width) {
                  result.push({
                      width: toPixel(width)
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      }
  });

  var template$1a = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-card-header-title'},$6={'class':'bell-card-header-extra'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];($0={children:_k('$slot_title'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_p(_K,'$slot_extra',_O.$slot_extra).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-card-header'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var CardHeader = Yox.define({
      template: template$1a,
      name: 'bell-CardHeader',
      propTypes: {
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          },
      },
  });

  var template$1b = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-card-media-title'},$6={'class':'bell-card-media-sub-title'},$7={'class':'bell-card-media-info'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));_p(_K,'$slot_title',_O.$slot_title).value||_p(_K,'$slot_subTitle',_O.$slot_subTitle).value?_N.push({children:function(){var _N=[];_p(_K,'$slot_title',_O.$slot_title).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_title'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'$slot_subTitle',_O.$slot_subTitle).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_subTitle'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-card-media'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var CardMedia = Yox.define({
      template: template$1b,
      name: 'bell-CardMedia',
      propTypes: {
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1c = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-card-body'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var CardBody = Yox.define({
      template: template$1c,
      name: 'bell-CardBody',
      propTypes: {
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1d = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-card-footer'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var CardFooter = Yox.define({
      template: template$1d,
      name: 'bell-CardFooter',
      propTypes: {
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1e = (function(){var $1=void 0,$3=!0,$4=!1,$5={'class':'bell-cascader-placeholder'},$6={'class':'bell-cascader-values'},$7='isFocus',$8=$3,$9=$4,$10={'class':'bell-cascader-overlay'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{gap:'5',placement:_p(_K,'placement',_O.placement).value,trigger:_p(_K,'RAW_CUSTOM',_O.RAW_CUSTOM).value,triggerMutable:_p(_K,'multiple',_O.multiple).value,visible:_p(_K,'isVisible',_O.isVisible).value,widthAlign:!_p(_K,'options',_O.options).value||!_o(_K,_K.length-1,'options.length',$3).value},slots:{$slot_children:function(_L){var _N=[];_N.push(function(_M){!_p(_K,'disabled',_O.disabled).value?(_l(_M,'nativeAttrs','tabindex','0'),_l(_M,'events','click',_e('click','onClick()','click','','onClick')),_l(_M,'events','focus',_e('focus',"set('isFocus', true)",'focus','','set',{execute:function(_R,_S){return [$7,$8]}})),_l(_M,'events','blur',_e('blur',"set('isFocus', false)",'blur','','set',{execute:function(_R,_S){return [$7,$9]}}))):$1;_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_o(_K,_K.length-1,'actualOptions.length',$3).value===0?_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'div',text:_v(_p(_K,'placeholder',_O.placeholder).value),type:3}):_p(_K,'multiple',_O.multiple).value?_N.push({children:function(){var _N=[];_i(_p(_K,'actualOptions',_O.actualOptions),function(_K,_O,_P,_Q,index){_N.push({context:_D,events:{close:_e('close','onOptionRemove($event, index)','close','','onOptionRemove',{execute:function(_R,_S){return [_R,index]}},$3)},operator:_z,parent:_L,props:{closable:$3},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_o(_K,_K.length-1,['actualTexts',index].join('.'),$3).value),type:1});return _N.length?_N:$1}},tag:'Tag',type:4});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({context:_D,nativeAttrs:{'class':'bell-cascader-value',title:_o(_K,_K.length-1,'actualTexts.0',$3).value},operator:_y,tag:'div',text:_v(_o(_K,_K.length-1,'actualTexts.0',$3).value),type:3});_p(_K,'showClear',_O.showClear).value&&_o(_K,_K.length-1,'actualOptions.length',$3).value?_N.push({context:_D,events:{'click.native':_e('click.native','onClearClick()','click','native','onClearClick',$1,$1,$3)},operator:_z,parent:_L,props:{className:'bell-cascader-clear-icon',name:'close-circle-fill'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-cascader-arrow-icon',name:'arrow-down-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-cascader'+(_p(_K,'status',_O.status).value?' bell-cascader-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'size',_O.size).value?' bell-cascader-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'block',_O.block).value?' bell-cascader-block':'')+(_p(_K,'isVisible',_O.isVisible).value?' bell-cascader-opened':'')+(_p(_K,'showClear',_O.showClear).value?' bell-cascader-with-clear':'')+(_p(_K,'isReversed',_O.isReversed).value?' bell-cascader-reversed':'')+(_p(_K,'disabled',_O.disabled).value?' bell-cascader-disabled':' bell-cascader-enabled')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));return _N.length?_N:$1},$slot_overlay:function(_L){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{checkedValues:_p(_K,'checkedValues',_O.checkedValues).value,indeterminateValues:_p(_K,'indeterminateValues',_O.indeterminateValues).value,level:0,loadData:_p(_K,'loadData',_O.loadData).value,loadingValues:_p(_K,'loadingValues',_O.loadingValues).value,multiple:_p(_K,'multiple',_O.multiple).value,options:_p(_K,'options',_O.options).value,selectedValues:_p(_K,'selectedValues',_O.selectedValues).value},tag:'CascaderOptions',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$10,operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'Popover',type:4});}})();

  var template$1f = (function(){var $0,$1=void 0,$3=!0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){($0={children:function(){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'options',_O.options),function(_K,_O,_P,_Q,index){_N.push({context:_D,operator:_z,props:{checkable:_s(_K,0,'multiple').value,checkedValues:_s(_K,0,'currentCheckedValues').value,indeterminateValues:_s(_K,0,'currentIndeterminateValues').value,index:index,level:_s(_K,0,'level').value,loadData:_s(_K,0,'loadData').value,loadingValues:_s(_K,0,'currentLoadingValues').value,option:_q(_K,_K.length-1).value,selectedValue:_s(_K,0,'currentSelectedValue').value},tag:'CascaderOption',type:4});},function(){_N.push({context:_D,operator:_z,props:{simple:$3},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:'暂无数据',type:1});return _N.length?_N:$1}},tag:'Empty',type:4});});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-cascader-options'+(!_o(_K,_K.length-1,'options.length',$3).value?' bell-cascader-options-empty':'')},operator:_y,tag:'div',type:3});_p(_K,'currentSelectedOption',_O.currentSelectedOption).value&&_o(_K,_K.length-1,'currentSelectedOption.children',$3).value?_N.push({context:_D,operator:_z,props:{checkedValues:_p(_K,'checkedValues',_O.checkedValues).value,indeterminateValues:_p(_K,'indeterminateValues',_O.indeterminateValues).value,level:_p(_K,'level',_O.level).value+1,loadData:_p(_K,'loadData',_O.loadData).value,loadingValues:_p(_K,'loadingValues',_O.loadingValues).value,multiple:_p(_K,'multiple',_O.multiple).value,options:_o(_K,_K.length-1,'currentSelectedOption.children',$3).value,selectedValues:_p(_K,'selectedValues',_O.selectedValues).value},tag:'CascaderOptions',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,operator:_A,tag:'fragment',type:5},$0.children&&$0.children.length&&_N.push($0));}})();

  var template$1g = (function(){var $1=void 0,$3=!0,$4=!1,$5={'class':'bell-cascader-option-text'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_o(_K,_K.length-1,'option.text',$3).value?_l(_M,'nativeAttrs','title',_o(_K,_K.length-1,'option.text',$3).value):$1;_p(_K,'interactive',_O.interactive).value?_l(_M,'events','click',_e('click','onClick()','click','','onClick')):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_p(_K,'checkable',_O.checkable).value?_N.push({context:_D,events:{change:_e('change','onCheckboxChange()','change','','onCheckboxChange',$1,$3)},operator:_z,props:{checked:_p(_K,'checked',_O.checked).value,disabled:!_p(_K,'interactive',_O.interactive).value,indeterminate:_p(_K,'indeterminate',_O.indeterminate).value},tag:'Checkbox',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({isPure:$3,operator:_w,text:_v(_o(_K,_K.length-1,'option.text',$3).value),type:1});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_p(_K,'loading',_O.loading).value?_N.push({context:_D,operator:_z,props:{className:'bell-cascader-option-loading',name:'loader-5-line',spin:$3},tag:'Icon',type:4}):_o(_K,_K.length-1,'option.children',$3).value?_N.push({context:_D,operator:_z,props:{className:'bell-cascader-option-expand',name:'arrow-right-s-line',spin:$4},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-cascader-option'+(_p(_K,'selected',_O.selected).value?' bell-cascader-option-selected':'')+(_p(_K,'checked',_O.checked).value?' bell-cascader-option-checked':'')+(_o(_K,_K.length-1,'option.disabled',$3).value?' bell-cascader-option-disabled':' bell-cascader-option-enabled')},operator:_y,tag:'div',type:3}));}})();

  var CascaderOption = Yox.define({
      template: template$1g,
      name: 'bell-CascaderOption',
      propTypes: {
          level: {
              type: RAW_NUMBER,
              required: TRUE,
          },
          index: {
              type: RAW_NUMBER,
              required: TRUE,
          },
          option: {
              type: RAW_OBJECT,
              required: TRUE,
          },
          checkable: {
              type: RAW_BOOLEAN,
          },
          loadData: {
              type: RAW_FUNCTION,
          },
          loadingValues: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          selectedValue: {
              type: [RAW_STRING, RAW_NUMBER],
              required: TRUE,
          },
          checkedValues: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          indeterminateValues: {
              type: RAW_ARRAY,
              required: TRUE,
          },
      },
      computed: {
          interactive: function () {
              return !this.get('option.disabled') && !this.get('loading');
          },
          loading: function () {
              return Yox.array.has(this.get('loadingValues'), this.get('option.value'));
          },
          selected: function () {
              return this.get('option.value') == this.get('selectedValue');
          },
          checked: function () {
              if (this.get('indeterminate')) {
                  return FALSE;
              }
              return Yox.array.has(this.get('checkedValues'), this.get('option.value'));
          },
          indeterminate: function () {
              return Yox.array.has(this.get('indeterminateValues'), this.get('option.value'));
          },
      },
      methods: {
          onClick: function () {
              var me = this;
              var option = me.get('option');
              var level = me.get('level');
              var options = [];
              var values = [];
              options[level] = option;
              values[level] = option.value;
              var isLeaf = !option.children && option.isLeaf !== FALSE;
              me.fire({
                  type: 'select',
                  ns: 'cascaderOption'
              }, {
                  options: options,
                  values: values,
                  level: level,
                  checked: me.get('checked'),
                  index: me.get('index'),
                  isLeaf: isLeaf,
              });
              var loadData = me.get('loadData');
              if (loadData && option.isLeaf === FALSE) {
                  me.fire({
                      type: 'loading',
                      ns: 'cascaderOption'
                  }, {
                      options: options,
                      values: values,
                      level: level,
                      loading: TRUE,
                  });
                  loadData(option)
                      .then(function (children) {
                      delete option.isLeaf;
                      if (children && children.length > 0) {
                          option.children = children;
                      }
                  })
                      .finally(function () {
                      me.fire({
                          type: 'loading',
                          ns: 'cascaderOption'
                      }, {
                          options: options,
                          values: values,
                          level: level,
                          loading: FALSE,
                      });
                  });
              }
          },
          onCheckboxChange: function (event, data) {
              event.stop();
              var option = this.get('option');
              var level = this.get('level');
              var options = [];
              var values = [];
              options[level] = option;
              values[level] = option.value;
              this.fire({
                  type: 'check',
                  ns: 'cascaderOption'
              }, {
                  options: options,
                  values: values,
                  level: level,
                  checked: data.checked,
              });
          }
      },
      components: {
          Icon: Icon,
          Checkbox: Checkbox,
      }
  });

  var CascaderOptions = Yox.define({
      template: template$1f,
      name: 'bell-CascaderOptions',
      propTypes: {
          level: {
              type: RAW_NUMBER,
              required: TRUE,
          },
          options: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          multiple: {
              type: RAW_BOOLEAN,
          },
          loadData: {
              type: RAW_FUNCTION,
          },
          loadingValues: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          checkedValues: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          selectedValues: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          indeterminateValues: {
              type: RAW_ARRAY,
              required: TRUE,
          },
      },
      computed: {
          currentLoadingValues: function () {
              var result = [];
              var loadingValues = this.get('loadingValues');
              var level = this.get('level');
              Yox.array.each(loadingValues, function (values) {
                  if (values.length === level + 1) {
                      result.push(values[level]);
                  }
              });
              return result;
          },
          currentCheckedValues: function () {
              var result = [];
              var checkedValues = this.get('checkedValues');
              var level = this.get('level');
              Yox.array.each(checkedValues, function (values) {
                  if (values.length === level + 1) {
                      result.push(values[level]);
                  }
              });
              return result;
          },
          currentIndeterminateValues: function () {
              var result = [];
              var indeterminateValues = this.get('indeterminateValues');
              var level = this.get('level');
              Yox.array.each(indeterminateValues, function (values) {
                  var value = values[level];
                  if (!Yox.array.has(indeterminateValues, value)) {
                      result.push(value);
                  }
              });
              return result;
          },
          currentSelectedValue: function () {
              var level = this.get('level');
              return this.get("selectedValues." + level);
          },
          currentSelectedOption: {
              deps: ['options.length', 'options.*.value', 'currentLoadingValues', 'currentSelectedValue'],
              get: function () {
                  var currentSelectedValue = this.get('currentSelectedValue');
                  if (currentSelectedValue !== UNDEFINED) {
                      var options = this.get('options');
                      for (var i = 0, len = options.length; i < len; i++) {
                          if (options[i].value == currentSelectedValue) {
                              return options[i];
                          }
                      }
                  }
              }
          }
      },
      events: {
          loadingStart: {
              listener: function (_, data) {
                  // @ts-ignore
                  this.addLevelInfoIfNeeded(data);
              },
              ns: 'cascaderOption'
          },
          loadingEnd: {
              listener: function (_, data) {
                  // @ts-ignore
                  this.addLevelInfoIfNeeded(data);
              },
              ns: 'cascaderOption'
          },
          select: {
              listener: function (_, data) {
                  // @ts-ignore
                  this.addLevelInfoIfNeeded(data);
              },
              ns: 'cascaderOption'
          },
          check: {
              listener: function (_, data) {
                  // @ts-ignore
                  this.addLevelInfoIfNeeded(data);
              },
              ns: 'cascaderOption'
          }
      },
      methods: {
          addLevelInfoIfNeeded: function (data) {
              var level = this.get('level');
              if (data.level !== level) {
                  var currentSelectedOption = this.get('currentSelectedOption');
                  if (currentSelectedOption) {
                      data.options[level] = currentSelectedOption;
                      data.values[level] = currentSelectedOption.value;
                  }
                  return TRUE;
              }
          }
      },
      components: {
          Icon: Icon,
          CascaderOption: CascaderOption,
      }
  });
  CascaderOptions.components.CascaderOptions = CascaderOptions;

  function formatOptions(options, values, multiple) {
      if (!options) {
          options = [];
      }
      if (!values) {
          values = [];
      }
      if (values.length > 0 && !multiple) {
          values = [
              values
          ];
      }
      var checkedOptions = [];
      var indeterminateOptions = [];
      setCheckedOptions(options, checkedOptions, indeterminateOptions, values, values.map(function () {
          return TRUE;
      }));
      return {
          checkedOptions: checkedOptions,
          selectedOptions: checkedOptions[0] || [],
          indeterminateOptions: indeterminateOptions,
      };
  }
  function setCheckedOptions(options, checkedOptions, indeterminateOptions, values, checked) {
      var checkedKeys = getNodesProps(checkedOptions, 'value').map(renderNodesProps);
      var indeterminateKeys = getNodesProps(indeterminateOptions, 'value').map(renderNodesProps);
      var isChecked = function (key) {
          return checkedKeys.indexOf(key) >= 0;
      };
      var addChecked = function (key, options) {
          checkedOptions.push(options);
          checkedKeys.push(key);
      };
      var removeChecked = function (key) {
          var index = checkedKeys.indexOf(key);
          if (index >= 0) {
              checkedOptions.splice(index, 1);
              checkedKeys.splice(index, 1);
          }
      };
      var isIndeterminate = function (key) {
          return indeterminateKeys.indexOf(key) >= 0;
      };
      var addIndeterminate = function (key, options) {
          indeterminateOptions.push(options);
          indeterminateKeys.push(key);
      };
      var removeIndeterminate = function (key) {
          var index = indeterminateKeys.indexOf(key);
          if (index >= 0) {
              indeterminateOptions.splice(index, 1);
              indeterminateKeys.splice(index, 1);
          }
      };
      var _loop_1 = function (i, len) {
          var key = renderNodesProps(values[i]);
          setTreeCheckedKey(options, 'value', checked[i], TRUE, function (k) {
              return k === key;
          }, isChecked, addChecked, removeChecked, isIndeterminate, addIndeterminate, removeIndeterminate);
      };
      for (var i = 0, len = values.length; i < len; i++) {
          _loop_1(i, len);
      }
  }

  var Cascader = Yox.define({
      template: template$1e,
      name: 'bell-Cascader',
      propTypes: {
          options: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          placeholder: {
              type: RAW_STRING,
              value: '请选择...'
          },
          value: {
              type: RAW_ARRAY,
          },
          status: {
              type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
          },
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          placement: {
              type: oneOf([RAW_TOP, RAW_TOP_START, RAW_TOP_END, RAW_BOTTOM, RAW_BOTTOM_START, RAW_BOTTOM_END]),
              value: RAW_BOTTOM_START,
          },
          multiple: {
              type: RAW_BOOLEAN,
          },
          showClear: {
              type: RAW_BOOLEAN,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          changeOnSelect: {
              type: RAW_BOOLEAN,
          },
          showCheckedStrategy: {
              type: oneOf([RAW_ALL, RAW_PARENT, RAW_CHILD]),
              value: RAW_PARENT,
          },
          loadData: {
              type: RAW_FUNCTION,
          },
          width: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          var data = formatOptions(this.get('options'), this.get('value'), this.get('multiple'));
          return {
              RAW_CUSTOM: RAW_CUSTOM,
              isFocus: FALSE,
              isVisible: FALSE,
              loadingOptions: [],
              checkedOptions: data.checkedOptions,
              selectedOptions: data.selectedOptions,
              indeterminateOptions: data.indeterminateOptions,
          };
      },
      computed: {
          actualOptions: function () {
              var showCheckedStrategy = this.get('showCheckedStrategy');
              var checkedOptions = this.get('checkedOptions');
              if (showCheckedStrategy === RAW_ALL) {
                  return checkedOptions;
              }
              var showChildStrategy = showCheckedStrategy === RAW_CHILD;
              var actualOptions = [];
              var checkedValues = this.get('checkedValues');
              var checkedKeys = checkedValues.map(renderNodesProps);
              Yox.array.each(checkedOptions, function (options, index) {
                  var isParentChecked = FALSE;
                  var values = checkedValues[index];
                  if (values.length > 1) {
                      var copyed = values.slice();
                      copyed.pop();
                      var parentKey = renderNodesProps(copyed);
                      isParentChecked = checkedKeys.indexOf(parentKey) >= 0;
                  }
                  if (Yox.array.last(options).children) {
                      // branch 节点，父级没选中时有效
                      // 如果父级选中了，则有效的是父级
                      if (!showChildStrategy && !isParentChecked) {
                          actualOptions.push(options);
                      }
                  }
                  else {
                      // leaf 节点
                      if (showChildStrategy || !isParentChecked) {
                          actualOptions.push(options);
                      }
                  }
              });
              return actualOptions;
          },
          actualValues: function () {
              return getNodesProps(this.get('actualOptions'), 'value');
          },
          actualTexts: function () {
              var texts = getNodesProps(this.get('actualOptions'), 'text');
              if (this.get('multiple')) {
                  return texts.map(function (item) {
                      return Yox.array.last(item);
                  });
              }
              return texts.map(renderNodesProps);
          },
          loadingValues: function () {
              return getNodesProps(this.get('loadingOptions'), 'value');
          },
          checkedValues: function () {
              return getNodesProps(this.get('checkedOptions'), 'value');
          },
          selectedValues: function () {
              return getNodesProps(this.get('selectedOptions'), 'value');
          },
          indeterminateValues: function () {
              return getNodesProps(this.get('indeterminateOptions'), 'value');
          },
          isReversed: function () {
              var placement = this.get('placement');
              return placement.indexOf(RAW_TOP) >= 0;
          },
          inlineStyle: function () {
              var result = [];
              var width = this.get('width');
              if (width) {
                  result.push({
                      width: toPixel(width)
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      },
      events: {
          loading: {
              listener: function (event, data) {
                  event.stop();
                  if (data.loading) {
                      this.append('loadingOptions', data.options);
                  }
                  else {
                      var loadingKeys = this.get('loadingValues').map(renderNodesProps);
                      var loadingKey = renderNodesProps(data.values);
                      var index = loadingKeys.indexOf(loadingKey);
                      if (index >= 0) {
                          this.removeAt('loadingOptions', index);
                      }
                  }
              },
              ns: 'cascaderOption',
          },
          select: {
              listener: function (event, data) {
                  event.stop();
                  var me = this;
                  var isLeafOption = data.isLeaf;
                  me.set({
                      selectedOptions: data.options,
                  });
                  if (me.get('multiple')) {
                      if (isLeafOption) {
                          me.setOptionChecked(data.values, !data.checked);
                      }
                  }
                  else {
                      if (isLeafOption || me.get('changeOnSelect')) {
                          me.setCheckedOptions([data.options]);
                      }
                      if (isLeafOption) {
                          this.set({
                              isVisible: FALSE,
                          });
                      }
                  }
              },
              ns: 'cascaderOption',
          },
          check: {
              listener: function (event, data) {
                  event.stop();
                  this.setOptionChecked(data.values, data.checked);
              },
              ns: 'cascaderOption',
          },
          outside: {
              listener: function (event) {
                  event.stop();
                  this.set('isVisible', FALSE);
              },
              ns: 'popover',
          },
      },
      methods: {
          onClick: function (event) {
              this.toggle('isVisible');
              fireClickEvent(event);
          },
          onClearClick: function (event) {
              // 停止冒泡，否则会展开下拉框
              event.stop();
              fireClickEvent(event);
              this.set({
                  indeterminateOptions: [],
              });
              this.setCheckedOptions([]);
          },
          onOptionRemove: function (event, index) {
              event.stop();
              var value = this.get("actualValues." + index);
              this.setOptionChecked(value, FALSE);
          },
          setOptionChecked: function (value, checked) {
              var me = this;
              var checkedOptions = me.copy(me.get('checkedOptions'));
              var indeterminateOptions = me.copy(me.get('indeterminateOptions'));
              setCheckedOptions(me.get('options'), checkedOptions, indeterminateOptions, [value], [checked]);
              me.set({
                  indeterminateOptions: indeterminateOptions,
              });
              me.setCheckedOptions(checkedOptions);
          },
          setCheckedOptions: function (checkedOptions) {
              var me = this;
              if (checkedOptions === me.get('checkedOptions')) {
                  return;
              }
              me.set({
                  checkedOptions: checkedOptions
              });
              var value = me.get('actualValues');
              if (!me.get('multiple') && value.length === 1) {
                  value = value[0];
              }
              me.set({
                  value: value,
              });
              me.fire({
                  type: 'change',
                  ns: 'cascader',
              }, {
                  value: value,
              });
          },
      },
      afterMount: function () {
          onClickEventByEnterPress(this);
      },
      beforePropsUpdate: function (props) {
          var options = props.options, value = props.value, multiple = props.multiple;
          if (options !== this.get('options')
              || (value !== UNDEFINED && value !== this.get('value'))) {
              this.set(formatOptions(options, value, multiple));
          }
      },
      components: {
          Tag: Tag,
          Icon: Icon,
          Empty: Empty,
          Popover: Popover,
          CascaderOptions: CascaderOptions,
      },
  });

  var template$1h = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-page-header-tags bell-page-header-flex'},$6={'class':'bell-page-header-extra'},$7={'class':'bell-page-header-header'},$8={'class':'bell-page-header-body'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_breadcrumb'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));_N.push({children:function(){var _N=[];_p(_K,'showBack',_O.showBack).value?_N.push({context:_D,events:{'click.native':_f('click.native','back.pageHeader','click','native','back','pageHeader',$1,$3)},operator:_z,props:{className:'bell-page-header-back',name:'arrow-left-line'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({context:_D,nativeAttrs:{'class':'bell-page-header-title'+(!_p(_K,'$slot_tags',_O.$slot_tags).value?' bell-page-header-flex':'')},operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3});_p(_K,'$slot_tags',_O.$slot_tags).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_tags'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'$slot_extra',_O.$slot_extra).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3});_p(_K,'$slot_content',_O.$slot_content).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_content'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-page-header'+(_p(_K,'showBack',_O.showBack).value?' bell-page-header-with-back':'')+(_p(_K,'$slot_tags',_O.$slot_tags).value?' bell-page-header-with-tags':'')+(_p(_K,'$slot_extra',_O.$slot_extra).value?' bell-page-header-with-extra':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var PageHeader = Yox.define({
      template: template$1h,
      name: 'bell-PageHeader',
      propTypes: {
          title: {
              type: RAW_STRING,
              required: TRUE,
          },
          showBack: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      components: {
          Icon: Icon,
      }
  });

  var template$1i = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-layout'+(_p(_K,'vertical',_O.vertical).value?' bell-layout-vertical':' bell-layout-horizontal')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Layout = Yox.define({
      template: template$1i,
      name: 'bell-Layout',
      propTypes: {
          vertical: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      }
  });

  var template$1j = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-layout-header-content'},$6={'class':'bell-layout-header-extra'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_p(_K,'$slot_extra',_O.$slot_extra).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-layout-header'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var LayoutHeader = Yox.define({
      template: template$1j,
      name: 'bell-LayoutHeader',
      propTypes: {
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1k = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-layout-content'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var LayoutContent = Yox.define({
      template: template$1k,
      name: 'bell-LayoutContent',
      propTypes: {
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1l = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-layout-footer'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var LayoutFooter = Yox.define({
      template: template$1l,
      name: 'bell-LayoutFooter',
      propTypes: {
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1m = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-layout-sider-logo'},$6='collapsed';return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_p(_K,'$slot_logo',_O.$slot_logo).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_logo'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));_p(_K,'showTrigger',_O.showTrigger).value?_N.push(function(_M){_p(_K,'triggerStyle',_O.triggerStyle).value?_M.nativeStyles=_b(_p(_K,'triggerStyle',_O.triggerStyle).value):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-layout-sider-trigger-icon',name:'arrow-left-s-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click',"toggle('collapsed')",'click','','toggle',{execute:function(_R,_S){return [$6]}})},nativeAttrs:{'class':'bell-layout-sider-trigger'},operator:_y,tag:'div',type:3})):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-layout-sider'+(_p(_K,'collapsed',_O.collapsed).value?' bell-layout-sider-collapsed':'')+(_p(_K,'showTrigger',_O.showTrigger).value?' bell-layout-sider-with-trigger':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var LayoutSider = Yox.define({
      template: template$1m,
      model: 'collapsed',
      name: 'bell-LayoutSider',
      propTypes: {
          showTrigger: {
              type: RAW_BOOLEAN,
          },
          collapsed: {
              type: RAW_BOOLEAN,
          },
          width: {
              type: RAW_NUMERIC,
              value: 200
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          customWidth: function () {
              if (this.get('collapsed')) {
                  return 80;
              }
              return toNumber(this.get('width'));
          },
          inlineStyle: function () {
              var result = [];
              var customWidth = this.get('customWidth');
              if (customWidth) {
                  result.push({
                      flex: '0 0 ' + toPixel(customWidth),
                      width: toPixel(customWidth),
                      minWidth: toPixel(customWidth),
                      maxWidth: toPixel(customWidth),
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
          triggerStyle: function () {
              var customWidth = this.get('customWidth');
              if (customWidth) {
                  return {
                      width: toPixel(customWidth)
                  };
              }
          },
      },
      components: {
          Icon: Icon,
      }
  });

  var template$1n = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'target',_O.target).value?_l(_M,'nativeAttrs','target',_p(_K,'target',_O.target).value):$1;_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;!_p(_K,'href',_O.href).value&&!_p(_K,'disabled',_O.disabled).value?_l(_M,'events','click',_f('click','click.link','click','','click','link')):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-link'+(_p(_K,'type',_O.type).value?' bell-link-'+_v(_p(_K,'type',_O.type).value):'')+(_p(_K,'size',_O.size).value?' bell-link-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'underline',_O.underline).value?' bell-link-underline':'')+(_p(_K,'disabled',_O.disabled).value?' bell-link-disabled':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):''),href:_p(_K,'href',_O.href).value||'javascript:void(0)'},operator:_y,tag:'a',type:3}));}})();

  var Link = Yox.define({
      template: template$1n,
      name: 'bell-Link',
      propTypes: {
          type: {
              type: oneOf([
                  RAW_TYPE_PRIMARY,
                  RAW_TYPE_INFO,
                  RAW_TYPE_SUCCESS,
                  RAW_TYPE_WARNING,
                  RAW_TYPE_ERROR,
                  RAW_TYPE_TITLE,
                  RAW_TYPE_CONTENT,
                  RAW_TYPE_MUTED ]),
              value: RAW_TYPE_PRIMARY,
          },
          size: {
              type: oneOf([RAW_SMALL]),
          },
          underline: {
              type: RAW_BOOLEAN,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          href: {
              type: RAW_STRING,
          },
          target: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      }
  });

  var template$1o = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-list-header'},$6={'class':'bell-list-body'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'$slot_header',_O.$slot_header).value?(_N.push({children:function(){var _N=[];($0={children:_k('$slot_header'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}),_N.push({children:function(){var _N=[];($0={children:_k('$slot_children')||function(){var _N=[];_N.push({context:_D,operator:_z,slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_empty',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'ListEmpty',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3})):($0={children:_k('$slot_children')||function(){var _N=[];_N.push({context:_D,operator:_z,slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_empty',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'ListEmpty',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));_p(_K,'loading',_O.loading).value?_N.push({context:_D,operator:_z,props:{fixed:$3,size:'large'},tag:'Spin',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-list'+(_p(_K,'size',_O.size).value?' bell-list-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'simple',_O.simple).value?' bell-list-simple':' bell-list-bordered')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var template$1p = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-list-empty'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({children:function(){var _N=[];($0={children:_k('$slot_children')||function(){var _N=[];_N.push({context:_D,operator:_z,slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:'暂无数据',type:1});return _N.length?_N:$1}},tag:'Empty',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});}})();

  var ListEmpty = Yox.define({
      template: template$1p,
      components: {
          Empty: Empty,
      }
  });

  var List = Yox.define({
      template: template$1o,
      name: 'bell-List',
      propTypes: {
          simple: {
              type: RAW_BOOLEAN,
          },
          loading: {
              type: RAW_BOOLEAN,
          },
          clickable: {
              type: RAW_BOOLEAN,
          },
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      components: {
          Spin: Spin,
          ListEmpty: ListEmpty,
      }
  });

  var template$1q = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;_p(_K,'clickable',_O.clickable).value?_l(_M,'events','click',_f('click','click.listItem','click','','click','listItem')):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-list-item'+(_p(_K,'clickable',_O.clickable).value?' bell-list-item-clickable':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var ListItem = Yox.define({
      template: template$1q,
      name: 'bell-ListItem',
      propTypes: {
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var list = findComponentUpward(options.parent, 'bell-List');
          return {
              clickable: list
                  ? list.get('clickable')
                  : FALSE
          };
      }
  });

  var template$1r = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-result-indicator'},$6={'class':'bell-result-title'},$7={'class':'bell-result-sub-title'},$8={'class':'bell-result-extra'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];($0={children:_k('$slot_icon')||function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-result-icon',name:_p(_K,'iconName',_O.iconName).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_p(_K,'title',_O.title).value?_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'subTitle',_O.subTitle).value?_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'div',text:_v(_p(_K,'subTitle',_O.subTitle).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'$slot_extra',_O.$slot_extra).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-result'+(_p(_K,'status',_O.status).value?' bell-result-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Result = Yox.define({
      template: template$1r,
      name: 'bell-Result',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          subTitle: {
              type: RAW_STRING,
          },
          status: {
              type: oneOf(RAW_STATUS_ARRAY),
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          iconName: function () {
              return getStatusIconName(this.get('status'));
          }
      },
      components: {
          Icon: Icon,
      }
  });

  var template$1s = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-exception-title'},$6={'class':'bell-exception-sub-title'},$7={'class':'bell-exception-extra'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'title',_O.title).value?_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'subTitle',_O.subTitle).value?_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'subTitle',_O.subTitle).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'$slot_extra',_O.$slot_extra).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-exception'+(_p(_K,'status',_O.status).value?' bell-exception-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Exception = Yox.define({
      template: template$1s,
      name: 'bell-Exception',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          subTitle: {
              type: RAW_STRING,
          },
          status: {
              type: oneOf([403, 404, 500]),
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1t = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-divider-text'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'$slot_children',_O.$slot_children).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-divider'+(_p(_K,'vertical',_O.vertical).value?' bell-divider-vertical':' bell-divider-horizontal')+(_p(_K,'dashed',_O.dashed).value?' bell-divider-dashed':'')+(_p(_K,'align',_O.align).value?' bell-divider-'+_v(_p(_K,'align',_O.align).value):'')+(_p(_K,'$slot_children',_O.$slot_children).value?' bell-divider-with-text':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Divider = Yox.define({
      template: template$1t,
      name: 'bell-Divider',
      propTypes: {
          vertical: {
              type: RAW_BOOLEAN,
          },
          dashed: {
              type: RAW_BOOLEAN,
          },
          align: {
              type: oneOf([RAW_CENTER, RAW_LEFT, RAW_RIGHT]),
              value: RAW_CENTER,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1u = (function(){var $0,$1=void 0,$3=!0,$5={viewBox:'0 0 100 100'},$6={'class':'bell-circle-content'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,isSvg:$3,nativeAttrs:{d:_p(_K,'path',_O.path).value,'fill-opacity':'0',stroke:_p(_K,'trailColor',_O.trailColor).value,'stroke-width':_p(_K,'trailWidth',_O.trailWidth).value},nativeStyles:_b(_p(_K,'trailStyle',_O.trailStyle).value),operator:_y,tag:'path',type:3});_N.push({context:_D,isSvg:$3,nativeAttrs:{d:_p(_K,'path',_O.path).value,'fill-opacity':'0',stroke:_p(_K,'strokeColor',_O.strokeColor).value,'stroke-linecap':_p(_K,'strokeLinecap',_O.strokeLinecap).value,'stroke-width':_p(_K,'strokeWidth',_O.strokeWidth).value},nativeStyles:_b(_p(_K,'pathStyle',_O.pathStyle).value),operator:_y,tag:'path',type:3});return _N.length?_N:$1}(),context:_D,isSvg:$3,nativeAttrs:$5,operator:_y,tag:'svg',type:3});_p(_K,'$slot_children',_O.$slot_children).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-circle'+(_p(_K,'dashboard',_O.dashboard).value?' bell-circle-dashboard':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Circle = Yox.define({
      template: template$1u,
      name: 'bell-Circle',
      propTypes: {
          dashboard: {
              type: RAW_BOOLEAN,
          },
          percent: {
              type: RAW_NUMERIC,
              value: 0,
          },
          size: {
              type: RAW_NUMERIC,
              value: 120,
          },
          strokeWidth: {
              type: RAW_NUMERIC,
              value: 6,
          },
          strokeColor: {
              type: RAW_STRING,
              value: '#2db7f5',
          },
          strokeLinecap: {
              type: oneOf(['square', 'round']),
              value: 'round',
          },
          trailWidth: {
              type: RAW_NUMERIC,
              value: 5,
          },
          trailColor: {
              type: RAW_STRING,
              value: '#eaeef2',
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          computedStrokeWidth: function () {
              return this.get('percent') === 0 && this.get('dashboard')
                  ? 0
                  : this.get('strokeWidth');
          },
          inlineStyle: function () {
              var result = [];
              var size = this.get('size');
              if (size) {
                  result.push({
                      width: toPixel(size),
                      height: toPixel(size),
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
          trailStyle: function () {
              if (this.get('dashboard')) {
                  var len = this.get('len');
                  return {
                      strokeDasharray: len - 75 + "px " + len + "px",
                      strokeDashoffset: "-" + 75 / 2 + "px",
                      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
                  };
              }
          },
          pathStyle: function () {
              var percent = this.get('percent');
              var len = this.get('len');
              if (this.get('dashboard')) {
                  return {
                      strokeDasharray: (percent / 100) * (len - 75) + "px " + len + "px",
                      strokeDashoffset: "-" + 75 / 2 + "px",
                      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s'
                  };
              }
              return {
                  strokeDasharray: len + "px " + len + "px",
                  strokeDashoffset: ((100 - percent) / 100 * len) + "px",
                  transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
              };
          },
          radius: function () {
              return 50 - this.get('strokeWidth') / 2;
          },
          len: function () {
              return Math.PI * 2 * this.get('radius');
          },
          path: function () {
              var radius = this.get('radius');
              if (this.get('dashboard')) {
                  return "M 50,50 m 0," + radius + "\n        a " + radius + "," + radius + " 0 1 1 0,-" + 2 * radius + "\n        a " + radius + "," + radius + " 0 1 1 0," + 2 * radius;
              }
              else {
                  return "M 50,50 m 0,-" + radius + "\n        a " + radius + "," + radius + " 0 1 1 0," + 2 * radius + "\n        a " + radius + "," + radius + " 0 1 1 0,-" + 2 * radius;
              }
          }
      }
  });

  var template$1v = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-popconfirm-indicator'},$6={'class':'bell-popconfirm-title'},$7={'class':'bell-popconfirm-footer'},$8={'class':'bell-popover-arrow'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{placement:_p(_K,'placement',_O.placement).value,showArrow:$3,trigger:_p(_K,'RAW_CLICK',_O.RAW_CLICK).value,visible:_p(_K,'isVisible',_O.isVisible).value},ref:'popover',slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_children',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1},$slot_overlay:function(_L){var _N=[];_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push(function(_M){_p(_K,'contentStyle',_O.contentStyle).value?_M.nativeStyles=_b(_p(_K,'contentStyle',_O.contentStyle).value):$1;return _M}({children:function(){var _N=[];_p(_K,'showIcon',_O.showIcon).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{name:_p(_K,'iconName',_O.iconName).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,events:{click:_e('click','onCancelClick()','click','','onCancelClick',$1,$3)},operator:_z,parent:_L,props:{autoFocus:$3,size:'small'},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'cancelText',_O.cancelText).value),type:1});return _N.length?_N:$1}},tag:'Button',type:4});_N.push({context:_D,events:{click:_e('click','onOkClick()','click','','onOkClick',$1,$3)},operator:_z,parent:_L,props:{size:'small',type:_p(_K,'okType',_O.okType).value||_p(_K,'status',_O.status).value},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'okText',_O.okText).value),type:1});return _N.length?_N:$1}},tag:'Button',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-popover-content'},operator:_y,tag:'div',type:3}));_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$8,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-popconfirm'+(_p(_K,'status',_O.status).value?' bell-popconfirm-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'showIcon',_O.showIcon).value?' bell-popconfirm-with-icon':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));return _N.length?_N:$1}},tag:'Popover',type:4});}})();

  var Popconfirm = Yox.define({
      template: template$1v,
      name: 'bell-Popconfirm',
      propTypes: {
          status: {
              type: oneOf(RAW_STATUS_ARRAY),
              value: RAW_TYPE_WARNING,
          },
          showIcon: {
              type: RAW_BOOLEAN,
          },
          title: {
              type: RAW_STRING,
          },
          okText: {
              type: RAW_STRING,
              value: '确定',
          },
          okType: {
              type: RAW_STRING,
          },
          cancelText: {
              type: RAW_STRING,
              value: '取消',
          },
          maxWidth: {
              type: RAW_NUMERIC,
          },
          maxHeight: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              RAW_CLICK: RAW_CLICK,
              isVisible: FALSE,
          };
      },
      computed: {
          iconName: function () {
              return getStatusIconName(this.get('status'));
          },
          contentStyle: function () {
              var customStyle = {};
              var maxWidth = this.get('maxWidth');
              var maxHeight = this.get('maxHeight');
              if (maxWidth) {
                  customStyle.maxWidth = toPixel(maxWidth);
              }
              if (maxHeight) {
                  customStyle.maxHeight = toPixel(maxHeight);
              }
              if (Yox.object.keys(customStyle).length > 0) {
                  return customStyle;
              }
          }
      },
      events: {
          open: {
              listener: function (event) {
                  event.stop();
                  this.set('isVisible', TRUE);
              },
              ns: 'popover',
          },
          close: {
              listener: function (event) {
                  event.stop();
                  this.set('isVisible', FALSE);
              },
              ns: 'popover',
          }
      },
      methods: {
          onCancelClick: function (event) {
              event.stop();
              fireClickEvent(event, TRUE);
              this.set('isVisible', FALSE);
              this.fire({
                  type: 'cancel',
                  ns: 'popconfirm',
              });
          },
          onOkClick: function (event) {
              event.stop();
              fireClickEvent(event, TRUE);
              this.set('isVisible', FALSE);
              this.fire({
                  type: 'ok',
                  ns: 'popconfirm',
              });
          }
      },
      components: {
          Button: Button,
          Popover: Popover,
      },
  });

  var template$1w = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-progress-text'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'inside',_O.inside).value?_N.push({context:_D,operator:_z,props:{inside:_p(_K,'inside',_O.inside).value,percent:_p(_K,'percent',_O.percent).value,thickness:_p(_K,'thickness',_O.thickness).value,vertical:_p(_K,'vertical',_O.vertical).value},slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_children',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'ProgressTrack',type:4}):(_N.push({context:_D,operator:_z,props:{inside:_p(_K,'inside',_O.inside).value,percent:_p(_K,'percent',_O.percent).value,thickness:_p(_K,'thickness',_O.thickness).value,vertical:_p(_K,'vertical',_O.vertical).value},tag:'ProgressTrack',type:4}),_p(_K,'$slot_children',_O.$slot_children).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2}));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-progress'+(_p(_K,'status',_O.status).value?' bell-progress-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'active',_O.active).value?' bell-progress-active':'')+(_p(_K,'inside',_O.inside).value?' bell-progress-inside':' bell-progress-outside')+(_p(_K,'vertical',_O.vertical).value?' bell-progress-vertical':' bell-progress-horizontal')+(!_p(_K,'inside',_O.inside).value&&!_p(_K,'vertical',_O.vertical).value&&_p(_K,'$slot_children',_O.$slot_children).value?' bell-progress-with-text':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var template$1x = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-progress-text'},$6={'class':'bell-progress-bar'},$7={'class':'bell-progress-track'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_p(_K,'inside',_O.inside).value?_p(_K,'$slot_children',_O.$slot_children).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,nativeStyles:_b(_p(_K,'barStyle',_O.barStyle).value),operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,nativeStyles:_b(_p(_K,'inlineStyle',_O.inlineStyle).value),operator:_y,tag:'div',type:3});}})();

  var ProgressTrack = Yox.define({
      template: template$1x,
      propTypes: {
          vertical: {
              type: RAW_BOOLEAN,
          },
          inside: {
              type: RAW_BOOLEAN,
          },
          thickness: {
              type: RAW_NUMERIC,
          },
          percent: {
              type: RAW_NUMERIC,
          },
      },
      computed: {
          inlineStyle: function () {
              var vertical = this.get('vertical');
              var thickness = this.get('thickness');
              if (vertical) {
                  return {
                      width: toPixel(thickness)
                  };
              }
              return {
                  height: toPixel(thickness)
              };
          },
          barStyle: function () {
              var vertical = this.get('vertical');
              var thickness = this.get('thickness');
              var percent = this.get('percent');
              if (vertical) {
                  return {
                      width: toPixel(thickness),
                      height: toPercent(percent),
                  };
              }
              return {
                  width: toPercent(percent),
                  height: toPixel(thickness),
                  lineHeight: toPixel(thickness),
              };
          },
      }
  });

  var Progress = Yox.define({
      template: template$1w,
      name: 'bell-Progress',
      propTypes: {
          percent: {
              type: RAW_NUMERIC,
              value: 0,
          },
          status: {
              type: oneOf(RAW_STATUS_ARRAY),
          },
          thickness: {
              type: RAW_STRING,
              value: 8,
          },
          inside: {
              type: RAW_BOOLEAN,
          },
          vertical: {
              type: RAW_BOOLEAN,
          },
          active: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      components: {
          ProgressTrack: ProgressTrack,
      }
  });

  var template$1y = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_i(_p(_K,'data',_O.data),function(_K,_O,_P,_Q,index){_N.push({context:_D,operator:_z,props:{block:_s(_K,0,'blockNode').value,checkable:_s(_K,0,'checkable').value,checkedKeys:_s(_K,0,'innerCheckedKeys').value,expandedKeys:_s(_K,0,'innerExpandedKeys').value,indeterminateKeys:_s(_K,0,'innerIndeterminateKeys').value,last:index===(_Q-1),level:0,loadData:_s(_K,0,'loadData').value,loadingKeys:_s(_K,0,'innerLoadingKeys').value,node:_q(_K,_K.length-1).value,selectable:_s(_K,0,'selectable').value,selectedKeys:_s(_K,0,'innerSelectedKeys').value,showIndeterminate:!_s(_K,0,'checkStrictly').value,showLine:_s(_K,0,'showLine').value},slots:{$slot_branchIcon:function(_L){var _N=[];($0={children:_k('$slot_branchIcon',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1},$slot_leafIcon:function(_L){var _N=[];($0={children:_k('$slot_leafIcon',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1},$slot_switcherIcon:function(_L){var _N=[];($0={children:_k('$slot_switcherIcon',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'TreeNode',type:4});});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-tree'+(_p(_K,'showLine',_O.showLine).value?' bell-tree-show-line':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var template$1z = (function(){var $0,$1=void 0,$3=!0,$4=!1,$5={'class':'bell-tree-indent-unit'},$6=0,$7={'class':'bell-tree-indent'},$8={'class':'bell-tree-node-title'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){($0={children:function(){var _N=[];_N.push({children:function(){var _N=[];_p(_K,'level',_O.level).value>0?_N.push({children:function(){var _N=[];_j($6,_p(_K,'level',_O.level).value,$1,function(_K,_O,_P,_Q){_N.push({context:_D,isPure:$3,isStatic:$3,nativeAttrs:$5,operator:_y,tag:'div',type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push(function(_M){!_p(_K,'isLeaf',_O.isLeaf).value&&!_p(_K,'loading',_O.loading).value?_l(_M,'events','click',_e('click','onExpandClick()','click','','onExpandClick')):$1;return _M}({children:function(){var _N=[];!_p(_K,'isLeaf',_O.isLeaf).value?($0={children:_k('$slot_switcherIcon')||function(){var _N=[];_p(_K,'loading',_O.loading).value?_N.push({context:_D,operator:_z,props:{className:'bell-tree-loading-icon',name:'loader-5-line',size:'14',spin:$3},tag:'Icon',type:4}):_p(_K,'showLine',_O.showLine).value?_N.push({context:_D,operator:_z,props:{className:'',name:_p(_K,'expanded',_O.expanded).value?'checkbox-indeterminate-line':'add-box-line',size:'14',spin:$4},tag:'Icon',type:4}):_N.push({context:_D,operator:_z,props:{className:'',name:_p(_K,'expanded',_O.expanded).value?'arrow-drop-down-fill':'arrow-drop-right-fill',size:'24',spin:$4},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0)):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-tree-switcher'},operator:_y,tag:'div',type:3}));_p(_K,'checkable',_O.checkable).value?_N.push({context:_D,events:{change:_e('change','onCheckboxChange()','change','','onCheckboxChange',$1,$3)},operator:_z,props:{checked:_p(_K,'checked',_O.checked).value,disabled:_o(_K,_K.length-1,'node.disabled',$3).value,indeterminate:_p(_K,'indeterminate',_O.indeterminate).value},tag:'Checkbox',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push(function(_M){!_o(_K,_K.length-1,'node.disabled',$3).value?_p(_K,'selectable',_O.selectable).value?_l(_M,'events','click',_e('click','onSelectClick()','click','','onSelectClick')):_p(_K,'checkable',_O.checkable).value?_l(_M,'events','click',_e('click','onCheckClick()','click','','onCheckClick')):$1:$1;return _M}({children:function(){var _N=[];_p(_K,'isLeaf',_O.isLeaf).value?($0={children:_k('$slot_leafIcon'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0)):($0={children:_k('$slot_branchIcon'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));_N.push({context:_D,nativeAttrs:$8,operator:_y,tag:'div',text:_v(_o(_K,_K.length-1,'node.title',$3).value),type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-tree-node-content',title:_o(_K,_K.length-1,'node.title',$3).value},operator:_y,tag:'div',type:3}));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-tree-node'+(_p(_K,'isLeaf',_O.isLeaf).value?' bell-tree-node-leaf':'')+(_p(_K,'block',_O.block).value?' bell-tree-node-block':'')+(_p(_K,'last',_O.last).value?' bell-tree-node-last':'')+(_p(_K,'expanded',_O.expanded).value?' bell-tree-node-expanded':'')+(_p(_K,'selected',_O.selected).value?' bell-tree-node-selected':'')+(_o(_K,_K.length-1,'node.disabled',$3).value?' bell-tree-node-disabled':_p(_K,'selectable',_O.selectable).value?' bell-tree-node-selectable':'')},operator:_y,tag:'div',type:3});_p(_K,'expanded',_O.expanded).value&&_p(_K,'hasChildren',_O.hasChildren).value?_i(_o(_K,_K.length-1,'node.children',$3),function(_K,_O,_P,_Q,index){_N.push({context:_D,operator:_z,props:{block:_s(_K,0,'block').value,checkable:_s(_K,0,'checkable').value,checkedKeys:_s(_K,0,'checkedKeys').value,expandedKeys:_s(_K,0,'expandedKeys').value,indeterminateKeys:_s(_K,0,'indeterminateKeys').value,last:index===(_Q-1),level:_s(_K,0,'level').value+1,loadData:_s(_K,0,'loadData').value,loadingKeys:_s(_K,0,'loadingKeys').value,node:_q(_K,_K.length-1).value,selectable:_s(_K,0,'selectable').value,selectedKeys:_s(_K,0,'selectedKeys').value,showIndeterminate:_s(_K,0,'showIndeterminate').value,showLine:_s(_K,0,'showLine').value},slots:{$slot_branchIcon:function(_L){var _N=[];($0={children:_k('$slot_branchIcon',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1},$slot_leafIcon:function(_L){var _N=[];($0={children:_k('$slot_leafIcon',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1},$slot_switcherIcon:function(_L){var _N=[];($0={children:_k('$slot_switcherIcon',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}},tag:'TreeNode',type:4});}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,operator:_A,tag:'fragment',type:5},$0.children&&$0.children.length&&_N.push($0));}})();

  var TreeNode = Yox.define({
      template: template$1z,
      name: 'bell-TreeNode',
      propTypes: {
          loadingKeys: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          expandedKeys: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          selectedKeys: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          checkedKeys: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          indeterminateKeys: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          selectable: {
              type: RAW_BOOLEAN,
          },
          checkable: {
              type: RAW_BOOLEAN,
          },
          block: {
              type: RAW_BOOLEAN,
          },
          showLine: {
              type: RAW_BOOLEAN,
          },
          showIndeterminate: {
              type: RAW_BOOLEAN,
          },
          loadData: {
              type: RAW_FUNCTION,
          },
          last: {
              type: RAW_BOOLEAN,
          },
          level: {
              type: RAW_NUMERIC,
          },
          node: {
              type: RAW_OBJECT,
          },
      },
      computed: {
          loading: function () {
              var loadingKeys = this.get('loadingKeys');
              var key = this.get('node.key');
              return Yox.array.has(loadingKeys, key);
          },
          expanded: function () {
              var expandedKeys = this.get('expandedKeys');
              var key = this.get('node.key');
              return Yox.array.has(expandedKeys, key);
          },
          checked: function () {
              if (this.get('checkable')) {
                  var checkedKeys = this.get('checkedKeys');
                  var key = this.get('node.key');
                  return Yox.array.has(checkedKeys, key);
              }
              return FALSE;
          },
          indeterminate: function () {
              if (this.get('showIndeterminate') && !this.get('checked')) {
                  var indeterminateKeys = this.get('indeterminateKeys');
                  var key = this.get('node.key');
                  return Yox.array.has(indeterminateKeys, key);
              }
              return FALSE;
          },
          selected: function () {
              if (this.get('selectable') && !this.get('node.disabled')) {
                  var selectedKeys = this.get('selectedKeys');
                  var key = this.get('node.key');
                  return Yox.array.has(selectedKeys, key);
              }
              return FALSE;
          },
          hasChildren: function () {
              var children = this.get('node.children');
              return children && children.length > 0;
          },
          isLeaf: function () {
              if (this.get('node.isLeaf') === FALSE) {
                  return FALSE;
              }
              return !this.get('hasChildren');
          }
      },
      methods: {
          onExpandClick: function () {
              var me = this;
              var node = me.get('node');
              var expanded = !me.get('expanded');
              var fireExpandEvent = function () {
                  me.fire({
                      type: 'expand',
                      ns: 'treeNode'
                  }, {
                      node: node,
                      expanded: expanded,
                  });
              };
              if (expanded) {
                  // 如果是展开，需判断是否要加载数据
                  var loadData = me.get('loadData');
                  if (loadData && node.isLeaf === FALSE) {
                      me.fire({
                          type: 'loading',
                          ns: 'treeNode'
                      }, {
                          node: node,
                          loading: TRUE,
                      });
                      loadData(node)
                          .then(function (children) {
                          delete node.isLeaf;
                          if (children && children.length > 0) {
                              node.children = children;
                              fireExpandEvent();
                          }
                      })
                          .finally(function () {
                          me.fire({
                              type: 'loading',
                              ns: 'treeNode'
                          }, {
                              node: node,
                              loading: FALSE,
                          });
                      });
                      return;
                  }
              }
              fireExpandEvent();
          },
          onSelectClick: function (event) {
              var node = this.get('node');
              var selected = this.get('selected');
              var originalEvent = event.originalEvent;
              this.fire({
                  type: 'select',
                  ns: 'treeNode'
              }, {
                  node: node,
                  selected: !selected,
                  multiple: isMac
                      ? originalEvent.metaKey
                      : originalEvent.ctrlKey
              });
          },
          onCheckClick: function () {
              // @ts-ignore
              this.fireCheck(!this.get('checked'));
          },
          onCheckboxChange: function (event, data) {
              event.stop();
              // @ts-ignore
              this.fireCheck(data.checked);
          },
          fireCheck: function (checked) {
              var node = this.get('node');
              this.fire({
                  type: 'check',
                  ns: 'treeNode'
              }, {
                  node: node,
                  checked: checked,
              });
          }
      },
      components: {
          Icon: Icon,
          Checkbox: Checkbox,
      }
  });
  TreeNode.components.TreeNode = TreeNode;

  function getLastNodeKey(nodes) {
      var node = Yox.array.last(nodes);
      return node.key;
  }
  function expandAll(data, expandedKeys) {
      var handleNode = function (child) {
          if (child.children && child.children.length) {
              if (!Yox.array.has(expandedKeys, child.key)) {
                  expandedKeys.push(child.key);
              }
              Yox.array.each(child.children, handleNode);
          }
      };
      Yox.array.each(data, handleNode);
  }
  function formatExpandedKeys(data, expandedKeys, defaultExpandAll) {
      var result = expandedKeys
          ? expandedKeys.slice()
          : [];
      var parents = [];
      var handleNode = function (child) {
          if (Yox.array.has(result, child.key)) {
              Yox.array.each(parents, function (parent) {
                  if (!Yox.array.has(result, parent.key)) {
                      result.push(parent.key);
                  }
              });
          }
          parents.push(child);
          if (child.children) {
              Yox.array.each(child.children, handleNode);
          }
          parents.pop();
      };
      Yox.array.each(data, handleNode);
      if (defaultExpandAll) {
          expandAll(data, result);
      }
      return result;
  }
  function formatSelectedKeys(selectedKeys) {
      return selectedKeys
          ? selectedKeys.slice()
          : [];
  }
  function formatCheckedKeys(data, checkedKeys, checkStrictly) {
      var result = checkedKeys
          ? checkedKeys.slice()
          : [];
      var checkedNodes = [];
      var indeterminateNodes = [];
      setCheckedKey(data, checkedNodes, indeterminateNodes, result, result.map(function () {
          return TRUE;
      }), checkStrictly);
      return {
          checkedNodes: checkedNodes,
          indeterminateNodes: indeterminateNodes,
      };
  }
  function setCheckedKey(data, checkedNodes, indeterminateNodes, keys, checked, checkStrictly) {
      var checkedKeys = getNodesProps(checkedNodes, 'key').map(renderNodesProps);
      var indeterminateKeys = getNodesProps(indeterminateNodes, 'key').map(renderNodesProps);
      var interact = !checkStrictly;
      var isChecked = function (key) {
          return checkedKeys.indexOf(key) >= 0;
      };
      var addChecked = function (key, nodes) {
          checkedNodes.push(nodes);
          checkedKeys.push(key);
      };
      var removeChecked = function (key) {
          var index = checkedKeys.indexOf(key);
          if (index >= 0) {
              checkedNodes.splice(index, 1);
              checkedKeys.splice(index, 1);
          }
      };
      var isIndeterminate = function (key) {
          return indeterminateKeys.indexOf(key) >= 0;
      };
      var addIndeterminate = function (key, nodes) {
          indeterminateNodes.push(nodes);
          indeterminateKeys.push(key);
      };
      var removeIndeterminate = function (key) {
          var index = indeterminateKeys.indexOf(key);
          if (index >= 0) {
              indeterminateNodes.splice(index, 1);
              indeterminateKeys.splice(index, 1);
          }
      };
      var _loop_1 = function (i, len) {
          var key = keys[i];
          setTreeCheckedKey(data, 'key', checked[i], interact, function (k, nodes) {
              return Yox.array.last(nodes).key === key;
          }, isChecked, addChecked, removeChecked, isIndeterminate, addIndeterminate, removeIndeterminate);
      };
      for (var i = 0, len = keys.length; i < len; i++) {
          _loop_1(i, len);
      }
  }

  var Tree = Yox.define({
      template: template$1y,
      name: 'bell-Tree',
      propTypes: {
          data: {
              type: RAW_ARRAY,
          },
          defaultExpandedKeys: {
              type: RAW_ARRAY,
          },
          defaultSelectedKeys: {
              type: RAW_ARRAY,
          },
          defaultCheckedKeys: {
              type: RAW_ARRAY,
          },
          defaultExpandAll: {
              type: RAW_BOOLEAN,
          },
          expandedKeys: {
              type: RAW_ARRAY,
          },
          selectedKeys: {
              type: RAW_ARRAY,
          },
          checkedKeys: {
              type: RAW_ARRAY,
          },
          showCheckedStrategy: {
              type: oneOf([RAW_ALL, RAW_PARENT, RAW_CHILD]),
              value: RAW_ALL,
          },
          checkStrictly: {
              type: RAW_BOOLEAN,
          },
          selectable: {
              type: RAW_BOOLEAN,
          },
          checkable: {
              type: RAW_BOOLEAN,
          },
          multiple: {
              type: RAW_BOOLEAN,
          },
          showLine: {
              type: RAW_BOOLEAN,
          },
          blockNode: {
              type: RAW_BOOLEAN,
          },
          loadData: {
              type: RAW_FUNCTION,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          var data = this.get('data');
          var expandedKeys = this.get('expandedKeys');
          var defaultExpandedKeys = this.get('defaultExpandedKeys');
          var innerExpandedKeys = formatExpandedKeys(data, expandedKeys || defaultExpandedKeys, this.get('defaultExpandAll'));
          var selectedKeys = this.get('selectedKeys');
          var defaultSelectedKeys = this.get('defaultSelectedKeys');
          var innerSelectedKeys = formatSelectedKeys(selectedKeys || defaultSelectedKeys);
          var checkedKeys = this.get('checkedKeys');
          var defaultCheckedKeys = this.get('defaultCheckedKeys');
          var checkedResult = formatCheckedKeys(data, checkedKeys || defaultCheckedKeys, this.get('checkStrictly'));
          return {
              innerLoadingKeys: [],
              innerExpandedKeys: innerExpandedKeys,
              innerSelectedKeys: innerSelectedKeys,
              innerCheckedNodes: checkedResult.checkedNodes,
              innerIndeterminateNodes: checkedResult.indeterminateNodes,
          };
      },
      computed: {
          actualNodes: function () {
              var showCheckedStrategy = this.get('showCheckedStrategy');
              var innerCheckedNodes = this.get('innerCheckedNodes');
              if (showCheckedStrategy === RAW_ALL) {
                  return innerCheckedNodes;
              }
              var showChildStrategy = showCheckedStrategy === RAW_CHILD;
              var actualNodes = [];
              var innerCheckedKeys = this.get('innerCheckedKeys');
              Yox.array.each(innerCheckedNodes, function (nodes) {
                  var isParentChecked = FALSE;
                  if (nodes.length > 1) {
                      var parentKey = nodes[nodes.length - 2].key;
                      isParentChecked = innerCheckedKeys.indexOf(parentKey) >= 0;
                  }
                  if (Yox.array.last(nodes).children) {
                      // branch 节点，父级没选中时有效
                      // 如果父级选中了，则有效的是父级
                      if (!showChildStrategy && !isParentChecked) {
                          actualNodes.push(nodes);
                      }
                  }
                  else {
                      // leaf 节点
                      if (showChildStrategy || !isParentChecked) {
                          actualNodes.push(nodes);
                      }
                  }
              });
              return actualNodes;
          },
          actualKeys: function () {
              var actualNodes = this.get('actualNodes');
              return actualNodes.map(getLastNodeKey);
          },
          innerCheckedKeys: function () {
              var innerCheckedNodes = this.get('innerCheckedNodes');
              return innerCheckedNodes.map(getLastNodeKey);
          },
          innerIndeterminateKeys: function () {
              var innerIndeterminateNodes = this.get('innerIndeterminateNodes');
              return innerIndeterminateNodes.map(getLastNodeKey);
          }
      },
      events: {
          loading: {
              listener: function (event, data) {
                  event.stop();
                  var loadingKeys = this.copy(this.get('innerLoadingKeys'));
                  var node = data.node, loading = data.loading;
                  var key = node.key;
                  if (loading) {
                      loadingKeys.push(key);
                  }
                  else {
                      Yox.array.remove(loadingKeys, key);
                  }
                  this.set({
                      innerLoadingKeys: loadingKeys,
                  });
              },
              ns: 'treeNode'
          },
          expand: {
              listener: function (event, data) {
                  event.stop();
                  var expandedKeys = this.copy(this.get('innerExpandedKeys'));
                  var node = data.node, expanded = data.expanded;
                  var key = node.key;
                  if (expanded) {
                      expandedKeys.push(key);
                  }
                  else {
                      Yox.array.remove(expandedKeys, key);
                  }
                  this.set({
                      expandedKeys: expandedKeys,
                      innerExpandedKeys: expandedKeys,
                  });
                  this.fire({
                      type: 'expand',
                      ns: 'tree'
                  }, {
                      expandedKeys: expandedKeys,
                      node: node,
                  });
              },
              ns: 'treeNode'
          },
          select: {
              listener: function (event, data) {
                  event.stop();
                  var selectedKeys = this.copy(this.get('innerSelectedKeys'));
                  var node = data.node, selected = data.selected;
                  var key = node.key;
                  if (selected) {
                      if (this.get('multiple') && data.multiple) {
                          selectedKeys.push(key);
                      }
                      else {
                          selectedKeys.length = 1;
                          selectedKeys[0] = key;
                      }
                  }
                  else {
                      if (this.get('multiple') && !data.multiple && selectedKeys.length > 1) {
                          selectedKeys.length = 1;
                          selectedKeys[0] = key;
                      }
                      else {
                          Yox.array.remove(selectedKeys, key);
                      }
                  }
                  this.set({
                      selectedKeys: selectedKeys,
                      innerSelectedKeys: selectedKeys,
                  });
                  this.fire({
                      type: 'select',
                      ns: 'tree'
                  }, {
                      selectedKeys: selectedKeys,
                      node: node,
                  });
              },
              ns: 'treeNode'
          },
          check: {
              listener: function (event, data) {
                  event.stop();
                  var innerCheckedNodes = this.copy(this.get('innerCheckedNodes'));
                  var innerIndeterminateNodes = this.copy(this.get('innerIndeterminateNodes'));
                  var node = data.node, checked = data.checked;
                  setCheckedKey(this.get('data'), innerCheckedNodes, innerIndeterminateNodes, [node.key], [checked], this.get('checkStrictly'));
                  this.set({
                      innerCheckedNodes: innerCheckedNodes,
                      innerIndeterminateNodes: innerIndeterminateNodes,
                  });
                  var checkedKeys = this.get('actualKeys');
                  this.set({
                      checkedKeys: checkedKeys,
                  });
                  this.fire({
                      type: 'check',
                      ns: 'tree'
                  }, {
                      checkedKeys: checkedKeys,
                      node: node,
                  });
              },
              ns: 'treeNode'
          }
      },
      beforePropsUpdate: function (props) {
          var data = props.data, expandedKeys = props.expandedKeys, defaultExpandAll = props.defaultExpandAll, selectedKeys = props.selectedKeys, checkedKeys = props.checkedKeys, checkStrictly = props.checkStrictly;
          if (data !== this.get('data')
              || (expandedKeys !== UNDEFINED && expandedKeys !== this.get('expandedKeys'))) {
              this.set({
                  innerExpandedKeys: formatExpandedKeys(data, expandedKeys, defaultExpandAll)
              });
          }
          if (selectedKeys !== UNDEFINED && selectedKeys !== this.get('selectedKeys')) {
              this.set({
                  selectedKeys: formatSelectedKeys(selectedKeys)
              });
          }
          if (data !== this.get('data')
              || (checkedKeys !== UNDEFINED && checkedKeys !== this.get('checkedKeys'))
              || (checkStrictly !== UNDEFINED && checkStrictly !== this.get('checkStrictly'))) {
              var checkedResult = formatCheckedKeys(data, checkedKeys, checkStrictly);
              this.set({
                  innerCheckedNodes: checkedResult.checkedNodes,
                  innerIndeterminateNodes: checkedResult.indeterminateNodes,
              });
          }
      },
      components: {
          Icon: Icon,
          TreeNode: TreeNode,
      }
  });

  var template$1A = (function(){var $0,$1=void 0,$3=!0,$5={type:'hidden'},$6=1,$7={'class':'bell-rate-text'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;!_p(_K,'readOnly',_O.readOnly).value?_l(_M,'events','mouseleave',_e('mouseleave','handleLeave()','mouseleave','','handleLeave')):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,model:_d(_p(_K,'value',_O.value)),nativeAttrs:$5,operator:_y,tag:'input',type:3});_j($6,_p(_K,'count',_O.count).value,$3,function(_K,_O,_P,_Q){_N.push(function(_M){!_s(_K,0,'readOnly').value?(_l(_M,'events','mousemove.native',_e('mousemove.native','handleMove($event, this)','mousemove','native','handleMove',{execute:function(_R,_S){return [_R,_O]}},$1,$3)),_l(_M,'events','click.native',_e('click.native','handleClick($event, this)','click','native','handleClick',{execute:function(_R,_S){return [_R,_O]}},$1,$3))):$1;return _M}({context:_D,operator:_z,props:{className:'bell-rate-icon-full'+((_s(_K,0,'activeValue').value-_O)>=0?' bell-rate-icon-active':''),name:_s(_K,0,'iconName').value,size:_s(_K,0,'iconSize').value},slots:{$slot_children:function(_L){var _N=[];_s(_K,0,'half').value?_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-rate-icon-half'+((_s(_K,0,'activeValue').value-_O)>=-0.5?' bell-rate-icon-active':''),name:_s(_K,0,'iconName').value,size:_s(_K,0,'iconSize').value},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}},tag:'Icon',type:4}));});_p(_K,'$slot_children',_O.$slot_children).value||_p(_K,'texts',_O.texts).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_children')||function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_o(_K,_K.length-1,['texts',_p(_K,'activeValue',_O.activeValue).value-1].join('.'),$3).value),type:1});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-rate'+(_p(_K,'type',_O.type).value?' bell-rate-'+_v(_p(_K,'type',_O.type).value):'')+(_p(_K,'readOnly',_O.readOnly).value?' bell-rate-dead':' bell-rate-live')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Rate = Yox.define({
      template: template$1A,
      name: 'bell-Rate',
      propTypes: {
          count: {
              type: RAW_NUMERIC,
              value: 5,
          },
          value: {
              type: RAW_NUMERIC,
              value: 0,
          },
          half: {
              type: RAW_BOOLEAN,
          },
          readOnly: {
              type: RAW_BOOLEAN,
          },
          texts: {
              type: RAW_ARRAY,
          },
          type: {
              type: oneOf(RAW_TYPE_ARRAY),
              value: RAW_TYPE_WARNING,
          },
          iconName: {
              type: RAW_STRING,
              value: 'star-fill',
          },
          iconSize: {
              type: RAW_NUMERIC,
              value: 18,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              hoverValue: -1,
          };
      },
      computed: {
          activeValue: function () {
              var hoverValue = this.get('hoverValue');
              return hoverValue < 0
                  ? this.get('value')
                  : hoverValue;
          }
      },
      methods: {
          handleMove: function (event, value) {
              var mouseEvent = event.originalEvent;
              if (this.hoverOnHalfIcon(mouseEvent.target)) {
                  value -= 0.5;
              }
              this.set({
                  hoverValue: value
              });
          },
          handleLeave: function () {
              var value = this.get('value');
              this.set({
                  hoverValue: value >= 0 ? value : -1
              });
          },
          handleClick: function (event, value) {
              var clickEvent = event.originalEvent;
              if (this.hoverOnHalfIcon(clickEvent.target)) {
                  value -= 0.5;
              }
              this.set('value', value);
              this.fire({
                  type: 'change',
                  ns: 'rate',
              }, {
                  value: value
              });
          },
          hoverOnHalfIcon: function (element) {
              return Yox.string.has(element.className, 'half');
          }
      },
      components: {
          Icon: Icon,
      }
  });

  var template$1B = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-tabs-bar'},$6={'class':'bell-tabs-content'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'tabs',_O.tabs),function(_K,_O,_P,_Q){_N.push(function(_M){!_r(_K,'disabled',_O.disabled).value?_l(_M,'events','click',_e('click','handleClickTab(this)','click','','handleClickTab',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}})):$1;return _M}({children:function(){var _N=[];_r(_K,'icon',_O.icon).value?_N.push({context:_D,operator:_z,props:{className:'bell-tabs-tab-icon',name:_r(_K,'icon',_O.icon).value},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({isPure:$3,operator:_w,text:_v(_r(_K,'label',_O.label).value),type:1});_s(_K,_K.length-2,'closable').value?_N.push({context:_D,events:{'click.native':_e('click.native','handleCloseTab(this)','click','native','handleCloseTab',{execute:function(_R,_S){return [_q(_K,_K.length-1).value]}},$1,$3)},operator:_z,props:{className:'bell-tabs-tab-close-icon',name:'close-line'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-tabs-tab'+(_r(_K,'disabled',_O.disabled).value?' bell-tabs-tab-disabled':' bell-tabs-tab-enabled')+(_r(_K,'name',_O.name).value===_s(_K,_K.length-2,'value').value?' bell-tabs-tab-active':'')},operator:_y,tag:'div',type:3}));});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-tabs-nav'+(_p(_K,'closable',_O.closable).value?' bell-tabs-nav-closable':'')},operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-tabs'+(_p(_K,'type',_O.type).value?' bell-tabs-'+_v(_p(_K,'type',_O.type).value):'')+(_p(_K,'size',_O.size).value?' bell-tabs-'+_v(_p(_K,'size',_O.size).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Tabs = Yox.define({
      template: template$1B,
      name: 'bell-Tabs',
      propTypes: {
          type: {
              type: oneOf(['card']),
          },
          size: {
              type: oneOf([RAW_DEFAULT, RAW_SMALL, RAW_LARGE]),
              value: RAW_DEFAULT,
          },
          closable: {
              type: RAW_BOOLEAN,
          },
          value: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              tabs: [],
          };
      },
      events: {
          add: {
              listener: function (event, data) {
                  if (event.phase !== Yox.Event.PHASE_UPWARD) {
                      return;
                  }
                  var target = event.target;
                  var tabName = target.get('name');
                  this.append('tabs', {
                      name: tabName,
                      icon: target.get('icon'),
                      label: target.get('label'),
                      disabled: target.get('disabled'),
                  });
                  if (data.isActive) {
                      this.set({
                          value: tabName,
                      });
                  }
              },
              ns: 'tabPanel',
          },
          remove: {
              listener: function (event) {
                  if (event.phase !== Yox.Event.PHASE_UPWARD) {
                      return;
                  }
                  var target = event.target;
                  var tabName = target.get('name');
                  var tabs = this.get('tabs');
                  var newTabs = tabs.filter(function (item) {
                      return item.name !== tabName;
                  });
                  this.set({
                      tabs: newTabs
                  });
                  if (this.get('value') === tabName) {
                      this.set('value', newTabs[0] ? newTabs[0].name : UNDEFINED);
                  }
              },
              ns: 'tabPanel',
          },
          update: {
              listener: function (event) {
                  if (event.phase !== Yox.Event.PHASE_UPWARD) {
                      return;
                  }
                  var me = this;
                  var target = event.target;
                  var tabName = target.get('name');
                  var tabs = me.get('tabs');
                  Yox.array.each(tabs, function (item, index) {
                      if (item.name === tabName) {
                          me.set("tabs." + index, {
                              name: tabName,
                              icon: target.get('icon'),
                              label: target.get('label'),
                              disabled: target.get('disabled'),
                          });
                          return FALSE;
                      }
                  });
              },
              ns: 'tabPanel',
          }
      },
      watchers: {
          value: function (value) {
              this.fire({
                  type: 'change',
                  ns: 'tabs',
              }, { value: value }, TRUE);
          },
      },
      methods: {
          handleCloseTab: function (tab) {
              this.fire({
                  type: 'tabRemove',
                  ns: 'tabs',
              }, {
                  name: tab.name
              });
          },
          handleClickTab: function (tab) {
              this.set({
                  value: tab.name,
              });
          }
      },
      components: {
          Icon: Icon,
      }
  });

  var template$1C = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-tabs-panel'+(_p(_K,'isActive',_O.isActive).value?' bell-tabs-panel-active':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var TabPanel = Yox.define({
      template: template$1C,
      name: 'bell-TabPanel',
      propTypes: {
          name: {
              type: RAW_STRING,
          },
          icon: {
              type: RAW_STRING,
          },
          label: {
              type: RAW_STRING,
              required: TRUE,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          return {
              isActive: FALSE,
          };
      },
      watchers: {
          name: function () {
              this.updatePanel();
          },
          icon: function () {
              this.updatePanel();
          },
          label: function () {
              this.updatePanel();
          },
          disabled: function () {
              this.updatePanel();
          },
      },
      events: {
          change: {
              listener: function (_, data) {
                  this.set({
                      isActive: this.get('name') == data.value
                  });
              },
              ns: 'tabs',
          }
      },
      methods: {
          updatePanel: function () {
              this.fire({
                  type: 'update',
                  ns: 'tabPanel',
              });
          }
      },
      afterMount: function () {
          var tabs = findComponentUpward(this.$parent, 'bell-Tabs');
          var index = Yox.array.indexOf(tabs.$children, this);
          var name = this.get('name');
          if (name == NULL) {
              name = '' + index;
              this.set('name', name);
          }
          var value = tabs.get('value');
          if (value == NULL && index === 0) {
              value = name;
          }
          var isActive = value === name;
          this.set('isActive', isActive);
          this.fire({
              type: 'add',
              ns: 'tabPanel',
          }, {
              isActive: isActive,
          });
      },
      beforeDestroy: function () {
          this.fire({
              type: 'remove',
              ns: 'tabPanel',
          });
      }
  });

  var template$1D = (function(){var $0,$1=void 0,$3=!0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{gap:'5',placement:_p(_K,'placement',_O.placement).value,trigger:_p(_K,'trigger',_O.trigger).value,triggerMutable:$3,visible:_p(_K,'visible',_O.visible).value},slots:{$slot_children:function(_L){var _N=[];($0={children:_k('$slot_children',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1},$slot_overlay:function(_L){var _N=[];_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_overlay',_L),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-dropdown-overlay'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));return _N.length?_N:$1}},tag:'Popover',type:4});}})();

  var Dropdown = Yox.define({
      template: template$1D,
      name: 'bell-Dropdown',
      propTypes: {
          placement: {
              type: oneOf(RAW_PLACEMENT_ARRAY),
              value: RAW_BOTTOM,
          },
          trigger: {
              type: oneOf([RAW_HOVER, RAW_CLICK, RAW_CUSTOM]),
              value: RAW_HOVER,
          },
          visible: {
              type: RAW_BOOLEAN,
          },
          maxHeight: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          inlineStyle: function () {
              var result = [];
              var maxHeight = this.get('maxHeight');
              if (maxHeight) {
                  result.push({
                      maxHeight: toPixel(maxHeight)
                  });
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      },
      events: {
          click: {
              listener: function (event) {
                  event.stop();
                  fireClickEvent(event, TRUE);
                  this.fire({
                      type: 'close',
                      ns: 'dropdown',
                  });
              },
              ns: 'dropdownItem',
          },
          open: {
              listener: function (event) {
                  event.stop();
                  this.fire({
                      type: 'open',
                      ns: 'dropdown',
                  });
              },
              ns: 'popover',
          },
          close: {
              listener: function (event) {
                  event.stop();
                  this.fire({
                      type: 'close',
                      ns: 'dropdown',
                  });
              },
              ns: 'popover',
          },
          outside: {
              listener: function (event) {
                  event.stop();
                  this.fire({
                      type: 'outside',
                      ns: 'dropdown',
                  });
              },
              ns: 'popover',
          }
      },
      components: {
          Popover: Popover,
      }
  });

  var template$1E = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;!_p(_K,'disabled',_O.disabled).value?_l(_M,'events','click',_f('click','click.dropdownItem','click','','click','dropdownItem')):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-dropdown-item'+(_p(_K,'divided',_O.divided).value?' bell-dropdown-item-divided':'')+(_p(_K,'active',_O.active).value?' bell-dropdown-item-active':'')+(_p(_K,'disabled',_O.disabled).value?' bell-dropdown-item-disabled':' bell-dropdown-item-enabled')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var DropdownItem = Yox.define({
      template: template$1E,
      name: 'bell-DropdownItem',
      propTypes: {
          name: {
              type: RAW_STRING,
          },
          divided: {
              type: RAW_BOOLEAN,
          },
          disabled: {
              type: RAW_BOOLEAN,
          },
          active: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1F = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-dropdown-menu'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var DropdownMenu = Yox.define({
      template: template$1F,
      name: 'bell-DropdownMenu',
      propTypes: {
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1G = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-description-title'},$6={'class':'bell-description-extra'},$7={'class':'bell-description-header'},$8={'class':'bell-description-item-label'},$9={'class':'bell-description-item-content'},$10={'class':'bell-description-item-wrapper'},$11={'class':'bell-description-row'},$12={'class':'bell-description-table'},$13={'class':'bell-description-cell bell-description-item-label'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'title',_O.title).value?_N.push({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$5,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3});_p(_K,'$slot_extra',_O.$slot_extra).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'simple',_O.simple).value?_N.push({children:function(){var _N=[];_i(_p(_K,'cells',_O.cells),function(_K,_O,_P,_Q,rowIndex){_N.push({children:function(){var _N=[];_i(_q(_K,_K.length-1),function(_K,_O,_P,_Q,colIndex){_N.push(function(_M){_r(_K,'span',_O.span).value>1?_l(_M,'nativeAttrs','colspan',_m('colspan',(_r(_K,'span',_O.span).value*2)-1)):$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,nativeAttrs:$8,operator:_y,tag:'div',text:_v(_r(_K,'label',_O.label).value),type:3});_N.push({children:function(){var _N=[];($0={children:_k('$slot_'+(_r(_K,'name',_O.name).value)),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$9,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$10,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-description-cell'},operator:_y,tag:'td',type:3}));});return _N.length?_N:$1}(),context:_D,nativeAttrs:$11,operator:_y,tag:'tr',type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$12,operator:_y,tag:'table',type:3}):_N.push({children:function(){var _N=[];_i(_p(_K,'cells',_O.cells),function(_K,_O,_P,_Q,rowIndex){_N.push({children:function(){var _N=[];_i(_q(_K,_K.length-1),function(_K,_O,_P,_Q,colIndex){_N.push({context:_D,nativeAttrs:$13,operator:_y,tag:'td',text:_v(_r(_K,'label',_O.label).value),type:3});_N.push(function(_M){_r(_K,'span',_O.span).value>1?_l(_M,'nativeAttrs','colspan',_m('colspan',(_r(_K,'span',_O.span).value*2)-1)):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_'+(_r(_K,'name',_O.name).value)),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-description-cell bell-description-item-content'},operator:_y,tag:'td',type:3}));});return _N.length?_N:$1}(),context:_D,nativeAttrs:$11,operator:_y,tag:'tr',type:3});});return _N.length?_N:$1}(),context:_D,nativeAttrs:$12,operator:_y,tag:'table',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-description'+(_p(_K,'simple',_O.simple).value?' bell-description-simple':' bell-description-bordered'+(_p(_K,'size',_O.size).value?' bell-description-'+_v(_p(_K,'size',_O.size).value):''))+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  function addSlots2Props(instance, children, props, column) {
      var cells = [];
      var columnArray;
      var columnItem;
      var columnSpanSum = 0;
      var index = 0;
      children.forEach(function (vnode) {
          if (vnode.tag === 'DescriptionItem') {
              var _a = vnode.props, label = _a.label, span = _a.span;
              var name = 'cell' + index++;
              if (!columnArray) {
                  columnArray = [];
                  cells.push(columnArray);
              }
              var spanCount = toNumber(span, 1);
              if (spanCount > column - columnSpanSum) {
                  spanCount = column - columnSpanSum;
              }
              columnItem = {
                  label: label,
                  name: name,
                  span: spanCount,
              };
              columnArray.push(columnItem);
              props[RAW_SLOT_PREFIX + name] = vnode.slots[RAW_SLOT_CHILDREN](instance);
              columnSpanSum += columnItem.span;
              if (columnSpanSum >= column) {
                  columnArray = columnItem = UNDEFINED;
                  columnSpanSum = 0;
              }
          }
      });
      if (columnItem && columnArray) {
          columnItem.span = column - columnArray.length + 1;
      }
      props.cells = cells;
  }

  var COLUMN_DEFAULT = 3;
  var Description = Yox.define({
      template: template$1G,
      name: 'bell-Description',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          simple: {
              type: RAW_BOOLEAN,
          },
          size: {
              type: oneOf(RAW_SIZE_ARRAY),
              value: RAW_DEFAULT,
          },
          column: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      beforeRender: function (props) {
          var children = this.get(RAW_SLOT_CHILDREN);
          if (children) {
              addSlots2Props(this, children, props, this.get('column') || COLUMN_DEFAULT);
          }
      }
  });

  var DescriptionItem = Yox.define({
      name: 'bell-DescriptionItem',
      propTypes: {
          label: {
              type: RAW_STRING,
          },
          span: {
              type: RAW_NUMERIC,
          }
      },
  });

  var template$1H = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-timeline'+(_p(_K,'pending',_O.pending).value?' bell-timeline-pending':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var Timeline = Yox.define({
      template: template$1H,
      name: 'bell-Timeline',
      propTypes: {
          pending: {
              type: RAW_BOOLEAN,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1I = (function(){var $0,$1=void 0,$5={'class':'bell-timeline-custom'},$6={'class':'bell-timeline-content'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'$slot_dot',_O.$slot_dot).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_dot'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push(function(_M){_p(_K,'color',_O.color).value?_M.nativeStyles={borderColor:_p(_K,'color',_O.color).value}:$1;return _M}({context:_D,nativeAttrs:{'class':'bell-timeline-dot'},operator:_y,tag:'div',type:3}));_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-timeline-item'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var TimelineItem = Yox.define({
      template: template$1I,
      name: 'bell-TimelineItem',
      propTypes: {
          color: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
  });

  var template$1J = (function(){var $0,$1=void 0;return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-form'+(_p(_K,'layout',_O.layout).value?' bell-form-'+_v(_p(_K,'layout',_O.layout).value):'')+(_p(_K,'showColon',_O.showColon).value?' bell-form-colon':'')+(_p(_K,'labelAlign',_O.labelAlign).value?' bell-form-label-'+_v(_p(_K,'labelAlign',_O.labelAlign).value):'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var formInlineItemGaps = [16, 26];

  var Form = Yox.define({
      template: template$1J,
      name: 'bell-Form',
      propTypes: {
          layout: {
              type: oneOf([RAW_INLINE, RAW_HORIZONTAL, RAW_VERTICAL]),
              value: RAW_HORIZONTAL,
          },
          showColon: {
              type: RAW_BOOLEAN,
          },
          scrollToFirstError: {
              type: RAW_BOOLEAN,
          },
          labelAlign: {
              type: oneOf([RAW_LEFT, RAW_RIGHT]),
              value: RAW_RIGHT,
          },
          labelWidth: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          inlineStyle: function () {
              var layout = this.get('layout');
              var style = this.get('style');
              if (layout === RAW_INLINE) {
                  return spaceListStyle(formInlineItemGaps, FALSE, TRUE, style);
              }
              return style;
          }
      },
      watchers: {
          layout: function (value) {
              this.fire({
                  type: 'layoutChange',
                  ns: 'form',
              }, {
                  layout: value,
              }, TRUE);
          }
      },
      methods: {
          validate: function (errors) {
              this.fire({
                  type: 'validate',
                  ns: 'form',
              }, {
                  errors: errors,
                  hasScrolled: FALSE,
                  scrollToFirstError: this.get('scrollToFirstError'),
              }, TRUE);
          },
      }
  });

  var template$1K = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-form-item-tooltip'},$6={'class':'bell-form-item-controls'},$7={'class':'bell-form-item-extra'},$8={'class':'bell-form-item-message'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_p(_K,'label',_O.label).value||_p(_K,'$slot_label',_O.$slot_label).value?_N.push(function(_M){_p(_K,'itemLabelWidth',_O.itemLabelWidth).value?_M.nativeStyles={flex:'0 0 '+_p(_K,'itemLabelWidth',_O.itemLabelWidth).value}:$1;return _M}({children:function(){var _N=[];($0={children:_k('$slot_label')||function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'label',_O.label).value),type:1});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));_p(_K,'$slot_tooltip',_O.$slot_tooltip).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_tooltip'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'span',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-form-item-label'+(_p(_K,'showRequiredMark',_O.showRequiredMark).value?' bell-form-item-label-required':'')},operator:_y,tag:'label',type:3})):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push(function(_M){_p(_K,'itemLabelWidth',_O.itemLabelWidth).value&&!_p(_K,'label',_O.label).value&&!_p(_K,'$slot_label',_O.$slot_label).value?_M.nativeStyles={marginLeft:_p(_K,'itemLabelWidth',_O.itemLabelWidth).value}:$1;return _M}({children:function(){var _N=[];_N.push({children:function(){var _N=[];($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3});_p(_K,'extra',_O.extra).value?_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'div',text:_v(_p(_K,'extra',_O.extra).value),type:3}):_p(_K,'$slot_extra',_O.$slot_extra).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_extra'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'showItemMessage',_O.showItemMessage).value?_N.push({context:_D,nativeAttrs:$8,operator:_y,tag:'div',text:_v(_p(_K,'itemMessage',_O.itemMessage).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-form-item-wrapper'},operator:_y,tag:'div',type:3}));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-form-item'+(_p(_K,'extra',_O.extra).value||_p(_K,'$slot_extra',_O.$slot_extra).value?' bell-form-item-with-extra':'')+(_p(_K,'showItemMessage',_O.showItemMessage).value?' bell-form-item-with-message':'')+(_p(_K,'adaptive',_O.adaptive).value?' bell-form-item-adaptive':'')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));}})();

  var FormItem = Yox.define({
      template: template$1K,
      name: 'bell-FormItem',
      propTypes: {
          prop: {
              type: RAW_STRING,
          },
          label: {
              type: RAW_STRING,
          },
          showRequiredMark: {
              type: RAW_BOOLEAN,
          },
          showMessage: {
              type: RAW_BOOLEAN,
              value: TRUE,
          },
          adaptive: {
              type: RAW_BOOLEAN,
          },
          message: {
              type: RAW_STRING,
          },
          extra: {
              type: RAW_STRING,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function (options) {
          var form = findComponentUpward(options.parent, 'bell-Form');
          return {
              RAW_HORIZONTAL: RAW_HORIZONTAL,
              error: UNDEFINED,
              formLayout: form.get('layout'),
              formLabelWidth: form.get('labelWidth'),
          };
      },
      computed: {
          inlineStyle: function () {
              var formLayout = this.get('formLayout');
              var style = this.get('style');
              if (formLayout === RAW_INLINE) {
                  return spaceItemStyle(formInlineItemGaps, FALSE, TRUE, style);
              }
              return style;
          },
          itemLabelWidth: function () {
              var formLayout = this.get('formLayout');
              var formLabelWidth = this.get('formLabelWidth');
              return formLayout === RAW_HORIZONTAL && formLabelWidth
                  ? toPixel(formLabelWidth)
                  : '';
          },
          itemMessage: function () {
              return this.get('error') || this.get('message');
          },
          showItemMessage: function () {
              return this.get('showMessage') && this.get('itemMessage');
          },
      },
      events: {
          layoutChange: {
              listener: function (_, data) {
                  this.set({
                      formLayout: data.layout,
                  });
              },
              ns: 'form',
          },
          validate: {
              listener: function (_, data) {
                  var errors = data.errors;
                  var error = errors
                      ? errors[this.get('prop')]
                      : UNDEFINED;
                  this.set({
                      error: error
                  });
                  if (!data.hasScrolled && data.scrollToFirstError) {
                      var el = this.$el;
                      if (el.scrollIntoView) {
                          el.scrollIntoView();
                      }
                      data.hasScrolled = TRUE;
                  }
              },
              ns: 'form',
          }
      }
  });

  var template$1L = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-dialog-title'},$6={'class':'bell-dialog-header'},$7={'class':'bell-dialog-body'},$8={'class':'bell-dialog-footer'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_p(_K,'visible',_O.visible).value?($0={children:function(){var _N=[];_N.push(function(_M){_p(_K,'style',_O.style).value?_M.nativeStyles=_b(_p(_K,'style',_O.style).value):$1;return _M}({children:function(){var _N=[];_p(_K,'showMask',_O.showMask).value?_N.push(function(_M){_p(_K,'maskClosable',_O.maskClosable).value?_l(_M,'events','click',_e('click','close()','click','','close')):$1;return _M}({context:_D,nativeAttrs:{'class':'bell-dialog-mask'},operator:_y,tag:'div',type:3})):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push(function(_M){_p(_K,'wrapperStyle',_O.wrapperStyle).value?_M.nativeStyles=_b(_p(_K,'wrapperStyle',_O.wrapperStyle).value):$1;return _M}({children:function(){var _N=[];_p(_K,'$slot_children',_O.$slot_children).value?($0={children:_k('$slot_children'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0)):((_p(_K,'title',_O.title).value||_p(_K,'$slot_title',_O.$slot_title).value)||_p(_K,'closable',_O.closable).value?_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];($0={children:_k('$slot_title')||function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'title',_O.title).value),type:1});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_p(_K,'closable',_O.closable).value?_N.push({context:_D,events:{'click.native':_e('click.native','close()','click','native','close',$1,$1,$3)},operator:_z,props:{className:'bell-dialog-close',name:'close-line'},tag:'Icon',type:4}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2}),_p(_K,'$slot_content',_O.$slot_content).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_content'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2}),_p(_K,'$slot_footer',_O.$slot_footer).value?_N.push({children:function(){var _N=[];($0={children:_k('$slot_footer'),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2}));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-dialog-wrapper'},operator:_y,ref:'wrapper',tag:'div',type:3}));return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-dialog'+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',transition:_c('dialog',_I&&_I.dialog||_J.dialog),type:3}));return _N.length?_N:$1}(),context:_D,operator:_B,tag:'portal',type:6},$0.children&&$0.children.length&&_N.push($0)):_N.push({isPure:$3,operator:_x,text:'',type:2});}})();

  var CLASS_VISIBLE$2 = 'bell-dialog-visible';
  var CLASS_FADE$2 = 'bell-dialog-fade';
  var Dialog = Yox.define({
      template: template$1L,
      model: 'visible',
      name: 'bell-Dialog',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          visible: {
              type: RAW_BOOLEAN,
          },
          showMask: {
              type: RAW_BOOLEAN,
              value: TRUE,
          },
          closable: {
              type: RAW_BOOLEAN,
              value: TRUE,
          },
          maskClosable: {
              type: RAW_BOOLEAN,
              value: TRUE,
          },
          width: {
              type: RAW_NUMERIC,
              value: screenWidth > 1024 ? 500 : 300,
          },
          height: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      computed: {
          wrapperStyle: function () {
              var width = this.get('width');
              var height = this.get('height');
              if (width || height) {
                  var result = {};
                  if (width) {
                      result.width = toPixel(width);
                  }
                  if (height) {
                      result.height = toPixel(height);
                  }
                  return result;
              }
          },
      },
      watchers: {
          visible: function (visible) {
              var bodyStyle = BODY.style;
              if (visible) {
                  this.set('bodyOverflow', bodyStyle.overflow);
                  bodyStyle.overflow = 'hidden';
              }
              else {
                  bodyStyle.overflow = this.get('bodyOverflow');
              }
          }
      },
      methods: {
          open: function () {
              this.set('visible', TRUE);
          },
          close: function () {
              this.set('visible', FALSE);
          }
      },
      transitions: {
          dialog: {
              enter: function (node) {
                  var me = this;
                  var dialog = node;
                  var wrapper = me.$refs.wrapper;
                  me.wrapperElement = wrapper;
                  // 设置为 display block
                  Yox.dom.addClass(dialog, CLASS_VISIBLE$2);
                  me.fire({
                      type: 'open',
                      ns: 'dialog',
                  });
                  setTimeout(function () {
                      if (!me.get('visible')) {
                          return;
                      }
                      Yox.dom.addClass(dialog, CLASS_FADE$2);
                      onTransitionEnd(wrapper, function () {
                          if (!me.get('visible')) {
                              return;
                          }
                          me.fire({
                              type: 'opened',
                              ns: 'dialog',
                          });
                      });
                  }, 50);
              },
              leave: function (node, done) {
                  var me = this;
                  var dialog = node;
                  var wrapper = me.wrapperElement;
                  me.wrapperElement = UNDEFINED;
                  Yox.dom.removeClass(dialog, CLASS_FADE$2);
                  me.fire({
                      type: 'close',
                      ns: 'dialog',
                  });
                  onTransitionEnd(wrapper, function () {
                      if (me.get('visible')) {
                          return;
                      }
                      Yox.dom.removeClass(dialog, CLASS_VISIBLE$2);
                      me.fire({
                          type: 'closed',
                          ns: 'dialog',
                      });
                      done();
                  });
              }
          },
      },
      components: {
          Icon: Icon,
      }
  });

  var template$1M = (function(){var $0,$1=void 0,$3=!0,$5={'class':'bell-table-sorter'},$6={'class':'bell-table-header'},$7={'class':'bell-table-body'},$8={'class':'bell-table-empty'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,events:{resize:_e('resize','onResize()','resize','','onResize',$1,$3)},operator:_z,slots:{$slot_children:function(_L){var _N=[];_N.push(function(_M){_p(_K,'inlineStyle',_O.inlineStyle).value?_M.nativeStyles=_b(_p(_K,'inlineStyle',_O.inlineStyle).value):$1;return _M}({children:function(){var _N=[];_p(_K,'colWidths',_O.colWidths).value?(_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'columns',_O.columns),function(_K,_O,_P,_Q,index){_N.push({context:_D,nativeAttrs:{width:_o(_K,0,['colWidths',index].join('.')).value},operator:_y,tag:'col',type:3});});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'colgroup',type:3});_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_i(_p(_K,'columns',_O.columns),function(_K,_O,_P,_Q){_N.push(function(_M){_r(_K,'align',_O.align).value?_l(_M,'nativeAttrs','class','bell-table-'+_v(_r(_K,'align',_O.align).value)):$1;return _M}({children:function(){var _N=[];_r(_K,'key',_O.key).value==='selection'?_o(_K,_K.length-1,'list.length',$3).value>0?_N.push({context:_D,events:{change:_e('change','allCheckedChange()','change','','allCheckedChange',$1,$3)},operator:_z,parent:_L,props:{checked:_s(_K,0,'allChecked').value},tag:'Checkbox',type:4}):_N.push({context:_D,operator:_z,parent:_L,props:{disabled:$3},tag:'Checkbox',type:4}):(_N.push({isPure:$3,operator:_w,text:_v(_r(_K,'title',_O.title).value),type:1}),_r(_K,'sortable',_O.sortable).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-table-sort-asc'+((_s(_K,0,'sortKey').value===_r(_K,'key',_O.key).value)&&(_s(_K,0,'sortOrder').value===_s(_K,0,'SORT_ORDER_ASC').value)?' bell-table-sort-active':''),name:'arrow-up-s-fill'},tag:'Icon',type:4});_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-table-sort-desc'+((_s(_K,0,'sortKey').value===_r(_K,'key',_O.key).value)&&(_s(_K,0,'sortOrder').value===_s(_K,0,'SORT_ORDER_DESC').value)?' bell-table-sort-active':''),name:'arrow-down-s-fill'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','sortColumn(this.key, ~/sortKey === this.key && ~/sortOrder === ~/SORT_ORDER_ASC ? ~/SORT_ORDER_DESC : ~/SORT_ORDER_ASC)','click','','sortColumn',{execute:function(_R,_S){return [_r(_K,'key',_O.key).value,(_s(_K,0,'sortKey').value===_r(_K,'key',_O.key).value)&&(_s(_K,0,'sortOrder').value===_s(_K,0,'SORT_ORDER_ASC').value)?_s(_K,0,'SORT_ORDER_DESC').value:_s(_K,0,'SORT_ORDER_ASC').value]}})},nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2}));return _N.length?_N:$1}(),context:_D,operator:_y,tag:'td',type:3}));});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'tr',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:$6,operator:_y,tag:'thead',type:3});_o(_K,_K.length-1,'list.length',$3).value>0?_N.push({children:function(){var _N=[];($0={children:_k('$slot_children',_L)||function(){var _N=[];_i(_p(_K,'list',_O.list),function(_K,_O,_P,_Q,index){_N.push({children:function(){var _N=[];_i(_s(_K,0,'columns'),function(_K,_O,_P,_Q){_r(_K,'actions',_O.actions).value&&_o(_K,_K.length-1,'actions.length').value?_N.push(function(_M){_r(_K,'align',_O.align).value?_l(_M,'nativeAttrs','class','bell-table-'+_v(_r(_K,'align',_O.align).value)):$1;return _M}({children:function(){var _N=[];_i(_r(_K,'actions',_O.actions),function(_K,_O,_P,_Q){_N.push({context:_D,events:{click:_e('click','clickButton(this, list[index], index)','click','','clickButton',{execute:function(_R,_S){return [_q(_K,_K.length-1).value,_o(_K,_K.length-1,['list',index].join('.'),$3).value,index]}},$3)},operator:_z,parent:_L,props:{block:_r(_K,'block',_O.block).value,className:_r(_K,'className',_O.className).value,disabled:_r(_K,'disabled',_O.disabled).value,shape:_r(_K,'shape',_O.shape).value,size:_r(_K,'size',_O.size).value,type:_r(_K,'type',_O.type).value},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_r(_K,'text',_O.text).value),type:1});return _N.length?_N:$1}},tag:'Button',type:4});});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'td',type:3})):_o(_K,_K.length-1,['list',index,_r(_K,'key',_O.key).value].join('.'),$3).value!==$1?_N.push(function(_M){_r(_K,'align',_O.align).value?_l(_M,'nativeAttrs','class','bell-table-'+_v(_r(_K,'align',_O.align).value)):$1;return _M}({children:function(){var _N=[];_r(_K,'dangerous',_O.dangerous).value?_N.push({context:_D,html:_v(_o(_K,_K.length-1,['list',index,_r(_K,'key',_O.key).value].join('.'),$3).value),operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_w,text:_v(_o(_K,_K.length-1,['list',index,_r(_K,'key',_O.key).value].join('.'),$3).value),type:1});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'td',type:3})):_r(_K,'key',_O.key).value==='selection'?_N.push(function(_M){_r(_K,'align',_O.align).value?_l(_M,'nativeAttrs','class','bell-table-'+_v(_r(_K,'align',_O.align).value)):$1;return _M}({children:function(){var _N=[];_N.push({context:_D,events:{change:_e('change','rowCheckedChange($event, $data, index)','change','','rowCheckedChange',{execute:function(_R,_S){return [_R,_S,index]}},$3)},operator:_z,parent:_L,props:{checked:_u(($0=_p(_K,'inArray',_O.inArray,_E&&_E.inArray||_F.inArray).value,$0(_p(_K,'selection',_O.selection).value,_o(_K,_K.length-1,['list',index,'key'].join('.'),$3).value))).value},tag:'Checkbox',type:4});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'td',type:3})):_N.push(function(_M){_r(_K,'align',_O.align).value?_l(_M,'nativeAttrs','class','bell-table-'+_v(_r(_K,'align',_O.align).value)):$1;return _M}({children:function(){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_r(_K,'key',_O.key).value)+' is not found.',type:1});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'td',type:3}));});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'tr',type:3});});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'tbody',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,operator:_y,tag:'table',type:3}),_o(_K,_K.length-1,'list.length',$3).value===0?_N.push({children:function(){var _N=[];($0={children:_k('$slot_empty',_L)||function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:'暂无数据',type:1});return _N.length?_N:$1}},tag:'Empty',type:4});return _N.length?_N:$1}(),context:_D,operator:_C,tag:'slot',type:7},$0.children&&$0.children.length&&_N.push($0));return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2})):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-table'+(_p(_K,'stripe',_O.stripe).value?' bell-table-stripe':'')+(_p(_K,'simple',_O.simple).value?' bell-table-simple':' bell-table-bordered')+(_p(_K,'className',_O.className).value?' '+_v(_p(_K,'className',_O.className).value):'')},operator:_y,tag:'div',type:3}));return _N.length?_N:$1}},tag:'ResizeObserver',type:4});}})();

  var SORT_ORDER_ASC = 'asc';
  var SORT_ORDER_DESC = 'desc';
  var Table = Yox.define({
      template: template$1M,
      name: 'bell-Table',
      propTypes: {
          list: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          columns: {
              type: RAW_ARRAY,
              required: TRUE,
          },
          selection: {
              type: RAW_ARRAY,
          },
          stripe: {
              type: RAW_BOOLEAN,
          },
          simple: {
              type: RAW_BOOLEAN,
          },
          height: {
              type: RAW_NUMERIC,
          },
          width: {
              type: RAW_NUMERIC,
          },
          className: {
              type: RAW_STRING,
          },
          style: {
              type: RAW_STYLE_TYPE,
          }
      },
      data: function () {
          var sortKey = UNDEFINED;
          var sortOrder = UNDEFINED;
          Yox.array.each(this.get('columns'), function (item) {
              if (item.defaultSortOrder) {
                  sortKey = item.key;
                  sortOrder = item.defaultSortOrder;
              }
          });
          return {
              SORT_ORDER_ASC: SORT_ORDER_ASC,
              SORT_ORDER_DESC: SORT_ORDER_DESC,
              colWidths: UNDEFINED,
              sortKey: sortKey,
              sortOrder: sortOrder,
          };
      },
      computed: {
          allChecked: {
              deps: ['selection', 'selection.length'],
              get: function () {
                  var selection = this.get('selection');
                  var list = this.get('list');
                  return selection && list
                      && selection.length > 0
                      && selection.length === list.length;
              },
              set: function (checked) {
                  var selection = this.get('selection');
                  if (checked) {
                      selection = this.get('list').map(function (item) {
                          return item.key;
                      });
                  }
                  else {
                      selection = [];
                  }
                  this.set('selection', selection);
              }
          },
          inlineStyle: function () {
              var result = [];
              var customStyle = {};
              var width = this.get('width');
              var height = this.get('height');
              if (width) {
                  customStyle.width = toPixel(width);
                  customStyle.overflowX = 'auto';
              }
              if (height) {
                  customStyle.height = toPixel(height);
                  customStyle.overflowY = 'auto';
              }
              if (Yox.object.keys(customStyle).length > 0) {
                  result.push(customStyle);
              }
              var style = this.get('style');
              if (style) {
                  result.push(style);
              }
              if (result.length > 0) {
                  return result;
              }
          },
      },
      watchers: {
          selection: function (selection) {
              this.fire('change.table', {
                  selection: selection,
              });
          }
      },
      filters: {
          inArray: Yox.array.has,
      },
      methods: {
          onResize: function (_, data) {
              this.updateColumnWidths(data.width);
          },
          allCheckedChange: function (event, data) {
              event.stop();
              this.set('allChecked', data.checked);
          },
          rowCheckedChange: function (event, data, index) {
              event.stop();
              var selection = this.get('selection');
              var key = this.get("list." + index + ".key");
              if (data.checked) {
                  if (!Yox.is.array(selection) || !Yox.array.has(selection, key)) {
                      this.append('selection', key);
                  }
              }
              else {
                  this.remove('selection', key);
              }
          },
          clickButton: function (button, item, index) {
              button.onClick(item, index);
          },
          sortColumn: function (key, order) {
              this.set({
                  sortKey: key,
                  sortOrder: order,
              });
              this.fire('sort', {
                  key: key,
                  order: order,
              });
          },
          updateColumnWidths: function (totalWidth) {
              var columns = this.get('columns');
              if (!columns || !columns.length) {
                  return;
              }
              var colWidths = [], noWidths = [], widthSum = 0;
              Yox.array.each(columns, function (col, index) {
                  if (col.width > 0) {
                      colWidths[index] = col.width;
                      widthSum += col.width;
                  }
                  else if (col.key === 'selection') {
                      colWidths[index] = 50;
                      widthSum += 50;
                  }
                  else {
                      noWidths.push(index);
                  }
              });
              totalWidth -= widthSum;
              var noCount = noWidths.length;
              if (totalWidth > 0 && noCount) {
                  Yox.array.each(noWidths, function (index) {
                      var colWidth = Math.floor(totalWidth / noCount);
                      colWidths[index] = colWidth;
                      totalWidth -= colWidth;
                      noCount--;
                  });
              }
              this.set('colWidths', colWidths);
          }
      },
      components: {
          Icon: Icon,
          Empty: Empty,
          Button: Button,
          Checkbox: Checkbox,
          ResizeObserver: ResizeObserver$1,
      }
  });

  var instance = UNDEFINED;
  function add(props) {
      var newProps = props ? Yox.object.copy(props) : {};
      newProps.fixed = TRUE;
      instance = new Yox(Yox.object.extend({
          el: BODY,
          props: newProps,
      }, LoadingBar));
      return instance;
  }
  function remove() {
      if (instance) {
          instance.destroy();
          instance = UNDEFINED;
      }
  }
  Yox.prototype.$loadingBar = {
      // 开始从 0 显示进度条，并自动加载进度
      start: function (options) {
          if (instance) {
              remove();
          }
          return add(options);
      },
      // 结束进度条，自动补全剩余进度
      finish: function () {
          if (instance) {
              instance.set('percent', 100);
              setTimeout(remove, 300);
          }
      },
      // 精确加载到指定的进度
      update: function (data) {
          if (instance) {
              instance.set(data);
          }
      }
  };

  var template$1N = (function(){var $1=void 0,$3=!0,$5={'class':'bell-message-indicator'},$6={'class':'bell-message-content'},$7={'class':'bell-message-close'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({children:function(){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{name:_p(_K,'iconName',_O.iconName).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'content',_O.content).value),type:3});_p(_K,'closable',_O.closable).value?_N.push({children:function(){var _N=[];_N.push({context:_D,events:{'click.native':_e('click.native','hide()','click','native','hide',$1,$1,$3)},operator:_z,props:{className:'bell-message-close-icon',name:'close-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$7,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-message'+(_p(_K,'status',_O.status).value?' bell-message-'+_v(_p(_K,'status',_O.status).value):'')+(_p(_K,'closable',_O.closable).value?' bell-message-with-close':'')},operator:_y,tag:'div',type:3});}})();

  var CLASS_VISIBLE$3 = 'bell-message-visible';
  var CLASS_FADE$3 = 'bell-message-fade';
  var Message = Yox.define({
      template: template$1N,
      name: 'bell-Message',
      propTypes: {
          status: {
              type: oneOf(RAW_STATUS_ARRAY),
              value: RAW_TYPE_INFO,
          },
          content: {
              type: RAW_STRING,
              required: TRUE,
          },
          closable: {
              type: RAW_BOOLEAN,
          },
          duration: {
              type: RAW_NUMERIC,
              value: 2000,
          },
          gap: {
              type: RAW_NUMERIC,
              value: 12,
          },
          top: {
              type: RAW_NUMERIC,
              value: 15,
          },
      },
      data: function () {
          return {
              isVisible: FALSE,
              actualTop: 0,
          };
      },
      computed: {
          iconName: function () {
              return getStatusIconName(this.get('status'));
          },
      },
      methods: {
          move: function (distance) {
              var me = this;
              if (!me.get('isVisible')) {
                  return;
              }
              var element = me.$el;
              if (element) {
                  var gap = toNumber(this.get('gap'));
                  var actualTop = this.get('actualTop') - distance - gap;
                  me.set({
                      actualTop: actualTop,
                  });
                  element.style.top = toPixel(actualTop);
              }
          },
          show: function (height, count) {
              var me = this;
              if (me.get('isVisible')) {
                  return;
              }
              var gap = toNumber(this.get('gap'));
              var top = toNumber(this.get('top')) + height + count * gap;
              me.set({
                  isVisible: TRUE,
                  actualTop: top,
              });
              var element = me.$el;
              Yox.dom.addClass(element, CLASS_VISIBLE$3);
              element.style.top = toPixel(top);
              setTimeout(function () {
                  if (!me.$el) {
                      return;
                  }
                  Yox.dom.addClass(element, CLASS_FADE$3);
                  var duration = toNumber(me.get('duration'));
                  if (duration > 0) {
                      setTimeout(function () {
                          if (me.$el) {
                              me.hide();
                          }
                      }, duration);
                  }
              }, 50);
          },
          hide: function () {
              var me = this;
              if (!me.get('isVisible')) {
                  return;
              }
              me.set({
                  isVisible: FALSE,
              });
              var element = me.$el;
              Yox.dom.removeClass(element, CLASS_FADE$3);
              onTransitionEnd(element, function () {
                  if (!me.$el) {
                      return;
                  }
                  Yox.dom.removeClass(element, CLASS_VISIBLE$3);
                  me.fire({
                      type: 'hide',
                      ns: 'message',
                  });
              });
          }
      },
      components: {
          Icon: Icon,
      },
  });

  var map = {};
  function addComponent(component, props, hideEvent, onClose) {
      var instance = new Yox(Yox.object.extend({
          el: BODY,
          props: props,
      }, component));
      instance.on(hideEvent, function () {
          if (onClose) {
              onClose();
          }
          instance.destroy();
          // 通知后面的移位
          var originalList = map[hideEvent];
          var copyList = originalList.slice();
          var removed = UNDEFINED;
          for (var i = 0, len = copyList.length; i < len; i++) {
              var item = copyList[i];
              if (item.instance === instance) {
                  removed = item;
                  originalList.splice(i, 1);
              }
              else if (removed) {
                  // @ts-ignore
                  item.instance.move(removed.height);
              }
          }
      });
      setTimeout(function () {
          if (instance.$el) {
              var list = map[hideEvent] || (map[hideEvent] = []);
              var height = 0;
              var count = list.length;
              for (var i = 0; i < count; i++) {
                  height += list[i].height;
              }
              // @ts-ignore
              instance.show(height, count);
              list.push({
                  instance: instance,
                  height: instance.$el.clientHeight,
              });
          }
      }, 300);
  }

  var config = {};
  function addMessage(status, arg) {
      var props = { status: status };
      var onClose;
      Yox.object.extend(props, config);
      if (Yox.is.string(arg)) {
          props.content = arg;
      }
      else {
          onClose = arg.onClose;
          Yox.object.extend(props, arg);
      }
      addComponent(Message, props, 'hide.message', onClose);
  }
  Yox.prototype.$message = {
      success: function (arg) {
          addMessage('success', arg);
      },
      info: function (arg) {
          addMessage('info', arg);
      },
      warning: function (arg) {
          addMessage('warning', arg);
      },
      error: function (arg) {
          addMessage('error', arg);
      },
      config: function (arg) {
          Yox.object.extend(config, arg);
      }
  };

  var template$1O = (function(){var $1=void 0,$3=!0,$4=!1,$5={'class':'bell-modal-indicator'},$6={'class':'bell-modal-title'},$7={'class':'bell-modal-content'},$8={'class':'bell-modal-footer'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{className:'bell-modal bell-modal-alert'+(_p(_K,'title',_O.title).value?' bell-modal-with-title':''),maskClosable:$4,showMask:$3,width:_p(_K,'width',_O.width).value},ref:'dialog',slots:{$slot_children:function(_L){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-modal-indicator-icon',name:_p(_K,'iconName',_O.iconName).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_p(_K,'title',_O.title).value?_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'div',text:_v(_p(_K,'content',_O.content).value),type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,events:{click:_e('click','ok()','click','','ok',$1,$3)},operator:_z,parent:_L,props:{autoFocus:$3,type:_p(_K,'okType',_O.okType).value},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'okText',_O.okText).value),type:1});return _N.length?_N:$1}},tag:'Button',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'Dialog',type:4});}})();

  var Alert$1 = Yox.define({
      template: template$1O,
      name: 'bell-Alert',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          content: {
              type: RAW_STRING,
              required: TRUE,
          },
          closable: {
              type: RAW_BOOLEAN,
          },
          width: {
              type: RAW_NUMERIC,
              value: screenWidth > 1024 ? 400 : 300,
          },
          okText: {
              type: RAW_STRING,
              value: '我知道了'
          },
          okType: {
              type: oneOf(RAW_TYPE_ARRAY),
              value: RAW_TYPE_PRIMARY,
          },
          onOk: {
              type: RAW_FUNCTION,
          }
      },
      data: function () {
          return {
              iconName: getStatusIconName(RAW_TYPE_INFO),
          };
      },
      events: {
          closed: {
              listener: function (event) {
                  event.stop();
                  this.destroy();
              },
              ns: 'dialog',
          }
      },
      methods: {
          ok: function () {
              this.$refs.dialog.close();
              var onOk = this.get('onOk');
              if (onOk) {
                  onOk();
              }
          }
      },
      components: {
          Button: Button,
          Dialog: Dialog,
      },
      afterMount: function () {
          var me = this;
          setTimeout(function () {
              if (me.$refs) {
                  me.$refs.dialog.open();
              }
          }, 30);
      }
  });

  var template$1P = (function(){var $1=void 0,$3=!0,$4=!1,$5={'class':'bell-modal-indicator'},$6={'class':'bell-modal-title'},$7={'class':'bell-modal-content'},$8={'class':'bell-modal-footer'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({context:_D,operator:_z,props:{className:'bell-modal bell-modal-confirm'+(_p(_K,'title',_O.title).value?' bell-modal-with-title':''),maskClosable:$4,showMask:$3,width:_p(_K,'width',_O.width).value},ref:'dialog',slots:{$slot_children:function(_L){var _N=[];_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,parent:_L,props:{className:'bell-modal-indicator-icon',name:_p(_K,'iconName',_O.iconName).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3});_p(_K,'title',_O.title).value?_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'div',text:_v(_p(_K,'content',_O.content).value),type:3});_N.push({children:function(){var _N=[];_N.push({context:_D,events:{click:_e('click','cancel()','click','','cancel',$1,$3)},operator:_z,parent:_L,props:{autoFocus:$3,type:_p(_K,'cancelType',_O.cancelType).value},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'cancelText',_O.cancelText).value),type:1});return _N.length?_N:$1}},tag:'Button',type:4});_N.push({context:_D,events:{click:_e('click','ok()','click','','ok',$1,$3)},operator:_z,parent:_L,props:{type:_p(_K,'okType',_O.okType).value},slots:{$slot_children:function(_L){var _N=[];_N.push({isPure:$3,operator:_w,text:_v(_p(_K,'okText',_O.okText).value),type:1});return _N.length?_N:$1}},tag:'Button',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$8,operator:_y,tag:'div',type:3});return _N.length?_N:$1}},tag:'Dialog',type:4});}})();

  var Confirm = Yox.define({
      template: template$1P,
      name: 'bell-Confirm',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          content: {
              type: RAW_STRING,
              required: TRUE,
          },
          closable: {
              type: RAW_BOOLEAN,
          },
          width: {
              type: RAW_NUMERIC,
              value: screenWidth > 1024 ? 400 : 300,
          },
          okText: {
              type: RAW_STRING,
              value: '确定',
          },
          okType: {
              type: oneOf(RAW_TYPE_ARRAY),
              value: RAW_TYPE_PRIMARY,
          },
          onOk: {
              type: RAW_FUNCTION,
          },
          cancelText: {
              type: RAW_STRING,
              value: '取消',
          },
          cancelType: {
              type: oneOf(RAW_TYPE_ARRAY),
          },
          onCancel: {
              type: RAW_FUNCTION,
          }
      },
      data: function () {
          return {
              iconName: getStatusIconName(RAW_TYPE_WARNING),
          };
      },
      events: {
          closed: {
              listener: function (event) {
                  event.stop();
                  this.destroy();
              },
              ns: 'dialog',
          }
      },
      methods: {
          ok: function () {
              this.$refs.dialog.close();
              var onOk = this.get('onOk');
              if (onOk) {
                  onOk();
              }
          },
          cancel: function () {
              this.$refs.dialog.close();
              var onCancel = this.get('onCancel');
              if (onCancel) {
                  onCancel();
              }
          },
      },
      components: {
          Button: Button,
          Dialog: Dialog,
      },
      afterMount: function () {
          var me = this;
          setTimeout(function () {
              if (me.$refs) {
                  me.$refs.dialog.open();
              }
          }, 30);
      }
  });

  var prototype = Yox.prototype;
  prototype.$alert = function (data) {
      var props = {};
      if (Yox.is.object(data)) {
          var obj = data;
          props.closable = obj.closable;
          props.title = obj.title;
          props.content = obj.content;
          props.width = obj.width;
          props.okText = obj.okText;
          props.okType = obj.okType;
          props.onOk = obj.onOk;
      }
      else {
          props.content = data;
      }
      new Yox(Yox.object.extend({
          el: BODY,
          props: props,
      }, Alert$1));
  };
  prototype.$confirm = function (data) {
      var props = {};
      if (Yox.is.object(data)) {
          var obj = data;
          props.closable = obj.closable;
          props.title = obj.title;
          props.content = obj.content;
          props.width = obj.width;
          props.okText = obj.okText;
          props.okType = obj.okType;
          props.onOk = obj.onOk;
          props.cancelText = obj.cancelText;
          props.cancelType = obj.cancelType;
          props.onCancel = obj.onCancel;
      }
      else {
          props.content = data;
      }
      new Yox(Yox.object.extend({
          el: BODY,
          props: props,
      }, Confirm));
  };

  var template$1Q = (function(){var $1=void 0,$3=!0,$5={'class':'bell-notification-indicator'},$6={'class':'bell-notification-title'},$7={'class':'bell-notification-content'},$8={'class':'bell-notification-close'};return function(_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x,_y,_z,_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_O,_P,_N){_N.push({children:function(){var _N=[];_p(_K,'status',_O.status).value?_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{name:_p(_K,'iconName',_O.iconName).value},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,nativeAttrs:$5,operator:_y,tag:'div',type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'title',_O.title).value?_N.push({context:_D,nativeAttrs:$6,operator:_y,tag:'div',text:_v(_p(_K,'title',_O.title).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_p(_K,'content',_O.content).value?_N.push({context:_D,nativeAttrs:$7,operator:_y,tag:'div',text:_v(_p(_K,'content',_O.content).value),type:3}):_N.push({isPure:$3,operator:_x,text:'',type:2});_N.push({children:function(){var _N=[];_N.push({context:_D,operator:_z,props:{className:'bell-notification-close-icon',name:'close-line'},tag:'Icon',type:4});return _N.length?_N:$1}(),context:_D,events:{click:_e('click','hide()','click','','hide')},nativeAttrs:$8,operator:_y,tag:'div',type:3});return _N.length?_N:$1}(),context:_D,nativeAttrs:{'class':'bell-notification'+(_p(_K,'status',_O.status).value?' bell-notification-'+_v(_p(_K,'status',_O.status).value)+' bell-notification-with-icon':'')+(_p(_K,'title',_O.title).value?' bell-notification-with-title':'')},operator:_y,tag:'div',type:3});}})();

  var CLASS_VISIBLE$4 = 'bell-notification-visible';
  var CLASS_FADE$4 = 'bell-notification-fade';
  var Notification = Yox.define({
      template: template$1Q,
      name: 'bell-Notification',
      propTypes: {
          title: {
              type: RAW_STRING,
          },
          content: {
              type: RAW_STRING,
          },
          status: {
              type: oneOf(RAW_STATUS_ARRAY),
          },
          duration: {
              type: RAW_NUMERIC,
              value: 4500,
          },
          gap: {
              type: RAW_NUMERIC,
              value: 16,
          },
          right: {
              type: RAW_NUMERIC,
              value: 15,
          },
          width: {
              type: RAW_NUMERIC,
              value: 320,
          },
      },
      data: function () {
          return {
              isVisible: FALSE,
              actualTop: 0,
          };
      },
      computed: {
          iconName: function () {
              return getStatusIconName(this.get('status'));
          },
      },
      methods: {
          move: function (distance) {
              var me = this;
              if (!me.get('isVisible')) {
                  return;
              }
              var element = me.$el;
              if (element) {
                  var gap = toNumber(this.get('gap'));
                  var actualTop = this.get('actualTop') - distance - gap;
                  me.set({
                      actualTop: actualTop,
                  });
                  element.style.top = toPixel(actualTop);
              }
          },
          show: function (height, count) {
              var me = this;
              if (me.get('isVisible')) {
                  return;
              }
              var gap = toNumber(this.get('gap'));
              var width = toNumber(this.get('width'));
              var right = toNumber(this.get('right'));
              var top = 24 + height + count * gap;
              me.set({
                  isVisible: TRUE,
                  actualTop: top,
              });
              var element = me.$el;
              Yox.dom.addClass(element, CLASS_VISIBLE$4);
              element.style.top = toPixel(top);
              element.style.right = toPixel(right);
              element.style.width = toPixel(width);
              setTimeout(function () {
                  if (!me.$el) {
                      return;
                  }
                  Yox.dom.addClass(element, CLASS_FADE$4);
                  var duration = toNumber(me.get('duration'));
                  if (duration > 0) {
                      setTimeout(function () {
                          if (me.$el) {
                              me.hide();
                          }
                      }, duration);
                  }
              }, 50);
          },
          hide: function () {
              var me = this;
              if (!me.get('isVisible')) {
                  return;
              }
              me.set({
                  isVisible: FALSE,
              });
              var element = me.$el;
              Yox.dom.removeClass(element, CLASS_FADE$4);
              onTransitionEnd(element, function () {
                  if (!me.$el) {
                      return;
                  }
                  Yox.dom.removeClass(element, CLASS_VISIBLE$4);
                  me.fire({
                      type: 'hide',
                      ns: 'notification',
                  });
              });
          }
      },
      components: {
          Icon: Icon,
      }
  });

  var config$1 = {};
  function addNotification(status, arg) {
      var props = { status: status };
      var onClose;
      // 先写 config，可支持 arg 覆盖全局配置
      Yox.object.extend(props, config$1);
      if (Yox.is.string(arg)) {
          props.content = arg;
      }
      else {
          onClose = arg.onClose;
          Yox.object.extend(props, arg);
      }
      addComponent(Notification, props, 'hide.notification', onClose);
  }
  Yox.prototype.$notification = {
      open: function (props) {
          addNotification('', props);
      },
      success: function (props) {
          addNotification('success', props);
      },
      info: function (props) {
          addNotification('info', props);
      },
      warning: function (props) {
          addNotification('warning', props);
      },
      error: function (props) {
          addNotification('error', props);
      },
      config: function (options) {
          Yox.object.extend(config$1, options);
      }
  };

  /**
   * 版本
   */
  var version = "0.32.0";
  /**
   * 安装插件
   */
  function install(Yox) {
      Yox.component({
          Row: Row,
          Col: Col,
          Add: Add,
          ColorSwatch: ColorSwatch,
          Countdown: Countdown,
          Closable: Closable,
          FooterBar: FooterBar,
          ResizeObserver: ResizeObserver$1,
          Menu: Menu,
          MenuItem: MenuItem,
          MenuGroup: MenuGroup,
          SubMenu: SubMenu,
          Icon: Icon,
          Text: Text,
          Drawer: Drawer,
          Guide: Guide,
          Breadcrumb: Breadcrumb,
          BreadcrumbItem: BreadcrumbItem,
          Button: Button,
          ButtonGroup: ButtonGroup,
          Input: Input,
          InputNumber: InputNumber,
          Textarea: Textarea,
          Radio: Radio,
          RadioGroup: RadioGroup,
          Checkbox: Checkbox,
          CheckboxGroup: CheckboxGroup,
          ColorPicker: ColorPicker,
          Slider: Slider,
          Space: Space,
          Statistic: Statistic,
          Switch: Switch,
          Skeleton: Skeleton,
          Steps: Steps,
          Step: Step,
          Select: Select,
          Option: Option,
          OptionGroup: OptionGroup,
          Pagination: Pagination,
          DatePicker: DatePicker,
          TimePicker: TimePicker,
          ImagePicker: ImagePicker,
          Image: Image$1,
          Upload: Upload,
          Tooltip: Tooltip,
          Alert: Alert,
          Article: Article,
          Analysis: Analysis,
          AnalysisField: AnalysisField,
          Spin: Spin,
          SplitButton: SplitButton,
          BackTop: BackTop,
          Avatar: Avatar,
          Badge: Badge,
          Card: Card,
          CardHeader: CardHeader,
          CardMedia: CardMedia,
          CardBody: CardBody,
          CardFooter: CardFooter,
          Cascader: Cascader,
          PageHeader: PageHeader,
          Layout: Layout,
          LayoutHeader: LayoutHeader,
          LayoutContent: LayoutContent,
          LayoutFooter: LayoutFooter,
          LayoutSider: LayoutSider,
          Carousel: Carousel,
          Collapse: Collapse,
          CollapseItem: CollapseItem,
          Link: Link,
          List: List,
          ListItem: ListItem,
          Empty: Empty,
          Result: Result,
          Exception: Exception,
          Divider: Divider,
          Circle: Circle,
          Progress: Progress,
          Popover: Popover,
          Popconfirm: Popconfirm,
          Tree: Tree,
          Tag: Tag,
          Rate: Rate,
          Tabs: Tabs,
          TabPanel: TabPanel,
          Dropdown: Dropdown,
          DropdownItem: DropdownItem,
          DropdownMenu: DropdownMenu,
          Description: Description,
          DescriptionItem: DescriptionItem,
          Timeline: Timeline,
          TimelineItem: TimelineItem,
          Form: Form,
          FormItem: FormItem,
          Dialog: Dialog,
          Table: Table,
      });
  }

  exports.install = install;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bell-ui-rollup.js.map
