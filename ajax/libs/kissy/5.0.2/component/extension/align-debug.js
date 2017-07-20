/*
Copyright 2014, modulex-component@1.0.3
MIT Licensed
build time: Thu, 16 Oct 2014 07:30:48 GMT
*/
modulex.add("component/extension/align", ["util","node","ua"], function(require, exports, module) {
var _util_ = require("util");
var node = require("node");
var ua = require("ua");
/*
combined modules:
component/extension/align
*/
var componentExtensionAlign;
componentExtensionAlign = function (exports) {
  /**
   * @ignore
   * Component.Extension.Align
   * @author yiminghe@gmail.com, qiaohua@taobao.com
   */
  var util = _util_;
  var win = window, $ = node, UA = ua;
  // http://yiminghe.iteye.com/blog/1124720
  /**
   * @ignore
   * 得到会导致元素显示不全的祖先元素
   */
  function getOffsetParent(element) {
    // ie 这个也不是完全可行
    /*
     <div style="width: 50px;height: 100px;overflow: hidden">
     <div style="width: 50px;height: 100px;position: relative;" id="d6">
     元素 6 高 100px 宽 50px<br/>
     </div>
     </div>
     */
    // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
    //  In other browsers it only includes elements with position absolute, relative or
    // fixed, not elements with overflow set to auto or scroll.
    //        if (UA.ie && ieMode < 8) {
    //            return element.offsetParent;
    //        }
    // 统一的 offsetParent 方法
    var doc = element.ownerDocument, body = doc.body, parent, positionStyle = $(element).css('position'), skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';
    if (!skipStatic) {
      return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
    }
    for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
      positionStyle = $(parent).css('position');
      if (positionStyle !== 'static') {
        return parent;
      }
    }
    return null;
  }
  /**
   * @ignore
   * 获得元素的显示部分的区域
   */
  function getVisibleRectForElement(element) {
    var visibleRect = {
        left: 0,
        right: Infinity,
        top: 0,
        bottom: Infinity
      }, el, scrollX, scrollY, winSize, doc = element.ownerDocument, $win = $(doc).getWindow(), body = doc.body, documentElement = doc.documentElement;
    // Determine the size of the visible rect by climbing the dom accounting for
    // all scrollable containers.
    for (el = element; el = getOffsetParent(el);) {
      // clientWidth is zero for inline block elements in ie.
      if ((!UA.ie || el.clientWidth !== 0) && (el !== body && el !== documentElement && $(el).css('overflow') !== 'visible')) {
        var pos = $(el).offset();
        // add border
        pos.left += el.clientLeft;
        pos.top += el.clientTop;
        visibleRect.top = Math.max(visibleRect.top, pos.top);
        visibleRect.right = Math.min(visibleRect.right, // consider area without scrollBar
        pos.left + el.clientWidth);
        visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
        visibleRect.left = Math.max(visibleRect.left, pos.left);
      }
    }
    // Clip by window's viewport.
    scrollX = $win.scrollLeft();
    scrollY = $win.scrollTop();
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    winSize = {
      width: $win.width(),
      height: $win.height()
    };
    visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
    return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
  }
  function getElFuturePos(elRegion, refNodeRegion, points, offset) {
    var xy, diff, p1, p2;
    xy = {
      left: elRegion.left,
      top: elRegion.top
    };
    p1 = getAlignOffset(refNodeRegion, points[0]);
    p2 = getAlignOffset(elRegion, points[1]);
    diff = [
      p2.left - p1.left,
      p2.top - p1.top
    ];
    return {
      left: xy.left - diff[0] + +offset[0],
      top: xy.top - diff[1] + +offset[1]
    };
  }
  function isFailX(elFuturePos, elRegion, visibleRect) {
    return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
  }
  function isFailY(elFuturePos, elRegion, visibleRect) {
    return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
  }
  function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
    var pos = util.clone(elFuturePos), size = {
        width: elRegion.width,
        height: elRegion.height
      };
    if (overflow.adjustX && pos.left < visibleRect.left) {
      pos.left = visibleRect.left;
    }
    // Left edge inside and right edge outside viewport, try to resize it.
    if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
      size.width -= pos.left + size.width - visibleRect.right;
    }
    // Right edge outside viewport, try to move it.
    if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
      // 保证左边界和可视区域左边界对齐
      pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
    }
    // Top edge outside viewport, try to move it.
    if (overflow.adjustY && pos.top < visibleRect.top) {
      pos.top = visibleRect.top;
    }
    // Top edge inside and bottom edge outside viewport, try to resize it.
    if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
      size.height -= pos.top + size.height - visibleRect.bottom;
    }
    // Bottom edge outside viewport, try to move it.
    if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
      // 保证上边界和可视区域上边界对齐
      pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
    }
    return util.mix(pos, size);
  }
  function flip(points, reg, map) {
    var ret = [];
    util.each(points, function (p) {
      ret.push(p.replace(reg, function (m) {
        return map[m];
      }));
    });
    return ret;
  }
  function flipOffset(offset, index) {
    offset[index] = -offset[index];
    return offset;
  }
  /**
   * @class KISSY.Component.Extension.Align
   * Align extension class.Align component with specified element.
   */
  function Align() {
  }
  Align.__getOffsetParent = getOffsetParent;
  Align.__getVisibleRectForElement = getVisibleRectForElement;
  Align.ATTRS = {
    /**
     * alignment config.
     * @type {Object}
     * @property align
     *
     * for example:
     *      @example
     *      {
         *        node: null,         // 参考元素, falsy 或 window 为可视区域, 'trigger' 为触发元素, 其他为指定元素
         *        points: ['cc','cc'], // ['tr', 'tl'] 表示 overlay 的 tl 与参考节点的 tr 对齐
         *        offset: [0, 0]      // 有效值为 [n, m]
         *      }
     */
    /**
     * alignment config.
     * @cfg {Object} align
     *
     * for example:
     *      @example
     *      {
         *        node: null,         // 参考元素, falsy 或 window 为可视区域, 'trigger' 为触发元素, 其他为指定元素
         *        points: ['cc','cc'], // ['tr', 'tl'] 表示 overlay 的 tl 与参考节点的 tr 对齐
         *        offset: [0, 0]      // 有效值为 [n, m]
         *      }
     */
    /**
     * @ignore
     */
    align: {
      valueFn: function () {
        return {};
      }
    }
  };
  function getRegion(node) {
    var offset, w, h, domNode = node[0];
    if (!util.isWindow(domNode)) {
      offset = node.offset();
      w = node.outerWidth();
      h = node.outerHeight();
    } else {
      var $win = $(domNode).getWindow();
      offset = {
        left: $win.scrollLeft(),
        top: $win.scrollTop()
      };
      w = $win.width();
      h = $win.height();
    }
    offset.width = w;
    offset.height = h;
    return offset;
  }
  /**
   * 获取 node 上的 align 对齐点 相对于页面的坐标
   * @param region
   * @param align
   * @ignore
   */
  function getAlignOffset(region, align) {
    var V = align.charAt(0), H = align.charAt(1), w = region.width, h = region.height, x, y;
    x = region.left;
    y = region.top;
    if (V === 'c') {
      y += h / 2;
    } else if (V === 'b') {
      y += h;
    }
    if (H === 'c') {
      x += w / 2;
    } else if (H === 'r') {
      x += w;
    }
    return {
      left: x,
      top: y
    };
  }
  function beforeVisibleChange(e) {
    if (e.target === this && e.newVal) {
      realign.call(this);
    }
  }
  function onResize() {
    if (this.get('visible')) {
      realign.call(this);
    }
  }
  function realign() {
    this._onSetAlign(this.get('align'));
  }
  Align.prototype = {
    __bindUI: function () {
      // auto align on window resize or before el show
      var self = this;
      self.on('beforeVisibleChange', beforeVisibleChange, self);
      self.$el.getWindow().on('resize', onResize, self);
    },
    _onSetAlign: function (v) {
      if (v && v.points) {
        this.align(v.node, v.points, v.offset, v.overflow);
      }
    },
    /*
     * 对齐 Overlay 到 node 的 points 点, 偏移 offset 处
     * @ignore
     * @param {Element} node 参照元素, 可取配置选项中的设置, 也可是一元素
     * @param {String[]} points 对齐方式
     * @param {Number[]} [offset] 偏移
     * @chainable
     */
    align: function (refNode, points, offset, overflow) {
      refNode = $(refNode || win);
      offset = offset && [].concat(offset) || [
        0,
        0
      ];
      overflow = overflow || {};
      var self = this, el = self.$el, fail = 0;
      // 当前节点可以被放置的显示区域
      var visibleRect = getVisibleRectForElement(el[0]);
      // 当前节点所占的区域, left/top/width/height
      var elRegion = getRegion(el);
      // 参照节点所占的区域, left/top/width/height
      var refNodeRegion = getRegion(refNode);
      // 当前节点将要被放置的位置
      var elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset);
      // 当前节点将要所处的区域
      var newElRegion = util.merge(elRegion, elFuturePos);
      // 如果可视区域不能完全放置当前节点时允许调整
      if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
        // 如果横向不能放下
        if (isFailX(elFuturePos, elRegion, visibleRect)) {
          fail = 1;
          // 对齐位置反下
          points = flip(points, /[lr]/gi, {
            l: 'r',
            r: 'l'
          });
          // 偏移量也反下
          offset = flipOffset(offset, 0);
        }
        // 如果纵向不能放下
        if (isFailY(elFuturePos, elRegion, visibleRect)) {
          fail = 1;
          // 对齐位置反下
          points = flip(points, /[tb]/gi, {
            t: 'b',
            b: 't'
          });
          // 偏移量也反下
          offset = flipOffset(offset, 1);
        }
        // 如果失败，重新计算当前节点将要被放置的位置
        if (fail) {
          elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset);
          util.mix(newElRegion, elFuturePos);
        }
        var newOverflowCfg = {};
        // 检查反下后的位置是否可以放下了
        // 如果仍然放不下只有指定了可以调整当前方向才调整
        newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);
        newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);
        // 确实要调整，甚至可能会调整高度宽度
        if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
          newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg);
        }
      }
      // https://github.com/kissyteam/kissy/issues/190
      // http://localhost:8888/kissy/src/overlay/demo/other/relative_align/align.html
      // 相对于屏幕位置没变，而 left/top 变了
      // 例如 <div 'relative'><el absolute></div>
      self.set({
        x: newElRegion.left,
        y: newElRegion.top
      }, { force: 1 });
      // need judge to in case set fixed with in css on height auto element
      if (newElRegion.width !== elRegion.width) {
        self.set('width', el.width() + newElRegion.width - elRegion.width);
      }
      if (newElRegion.height !== elRegion.height) {
        self.set('height', el.height() + newElRegion.height - elRegion.height);
      }
      return self;
    },
    /**
     * Make current element center within node.
     * @param {undefined|String|HTMLElement|KISSY.Node} node
     * Same as node config of {@link KISSY.Component.Extension.Align#cfg-align}
     * @chainable
     */
    center: function (node) {
      var self = this;
      self.set('align', {
        node: node,
        points: [
          'cc',
          'cc'
        ],
        offset: [
          0,
          0
        ]
      });
      return self;
    },
    __destructor: function () {
      var self = this;
      if (self.$el) {
        self.$el.getWindow().detach('resize', onResize, self);
      }
    }
  };
  exports = Align;
  return exports;
}();
module.exports = componentExtensionAlign;
});