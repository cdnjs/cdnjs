/*
Copyright 2014, modulex-scroll-view@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 08:08:10 GMT
*/
modulex.add("scroll-view/base", ["anim/timer","component/container","component/extension/content-box","node","feature","util"], function(require, exports, module) {
var animTimer = require("anim/timer");
var componentContainer = require("component/container");
var componentExtensionContentBox = require("component/extension/content-box");
var _node_ = require("node");
var feature = require("feature");
var _util_ = require("util");
/*
combined modules:
scroll-view/base
*/
var scrollViewBase;
scrollViewBase = function (exports) {
  /**
   * @ignore
   * scroll-view control
   * @author yiminghe@gmail.com
   */
  var TimerAnim = animTimer;
  var Container = componentContainer;
  var ContentBox = componentExtensionContentBox;
  var $ = _node_, KeyCode = $.Event.KeyCode;
  // http://www.html5rocks.com/en/tutorials/speed/html5/
  var Feature = feature,
    //        MARKER_CLS = 'ks-scroll-view-marker',
    transformVendorInfo = Feature.getCssVendorInfo('transform'), floor = Math.floor, transformProperty;
  var isTransform3dSupported = Feature.isTransform3dSupported();
  // http://www.html5rocks.com/en/tutorials/speed/html5/
  var supportCss3 = !!transformVendorInfo;
  var util = _util_;
  var methods = {
    initializer: function () {
      this.scrollAnims = [];
    },
    bindUI: function () {
      var self = this, $el = self.$el;
      $el.on('mousewheel', self.handleMouseWheel, self).on('scroll', onElScroll, self);
    },
    syncUI: function () {
      this.sync();
    },
    sync: function () {
      var self = this, el = self.el, contentEl = self.contentEl;
      // consider pull to refresh
      // refresh label will be prepended to el
      // contentEl must be absolute
      // or else
      // relative is weird, should math.max(contentEl.scrollHeight,el.scrollHeight)
      // will affect pull to refresh
      var scrollHeight = Math.max(contentEl.offsetHeight, contentEl.scrollHeight), scrollWidth = Math.max(contentEl.offsetWidth, contentEl.scrollWidth);
      var clientHeight = el.clientHeight, clientWidth = el.clientWidth;
      self.set('dimension', {
        scrollHeight: scrollHeight,
        scrollWidth: scrollWidth,
        clientWidth: clientWidth,
        clientHeight: clientHeight
      });
    },
    _onSetDimension: reflow,
    handleKeyDownInternal: function (e) {
      // no need to process disabled (already processed by Component)
      var target = e.target, $target = $(target), nodeName = $target.nodeName();
      // editable element
      if (nodeName === 'input' || nodeName === 'textarea' || nodeName === 'select' || $target.hasAttr('contenteditable')) {
        return undefined;
      }
      var self = this, keyCode = e.keyCode, scrollStep = self.getScrollStep(), ok;
      var allowX = self.allowScroll.left;
      var allowY = self.allowScroll.top;
      if (allowY) {
        var scrollStepY = scrollStep.top, clientHeight = self.clientHeight, scrollTop = self.get('scrollTop');
        if (keyCode === KeyCode.DOWN) {
          self.scrollToWithBounds({ top: scrollTop + scrollStepY });
          ok = true;
        } else if (keyCode === KeyCode.UP) {
          self.scrollToWithBounds({ top: scrollTop - scrollStepY });
          ok = true;
        } else if (keyCode === KeyCode.PAGE_DOWN) {
          self.scrollToWithBounds({ top: scrollTop + clientHeight });
          ok = true;
        } else if (keyCode === KeyCode.PAGE_UP) {
          self.scrollToWithBounds({ top: scrollTop - clientHeight });
          ok = true;
        }
      }
      if (allowX) {
        var scrollStepX = scrollStep.left;
        var scrollLeft = self.get('scrollLeft');
        if (keyCode === KeyCode.RIGHT) {
          self.scrollToWithBounds({ left: scrollLeft + scrollStepX });
          ok = true;
        } else if (keyCode === KeyCode.LEFT) {
          self.scrollToWithBounds({ left: scrollLeft - scrollStepX });
          ok = true;
        }
      }
      return ok;
    },
    getScrollStep: function () {
      var self = this;
      if (self.scrollStep) {
        return self.scrollStep;
      }
      var elDoc = $(this.get('el')[0].ownerDocument);
      var clientHeight = self.clientHeight;
      var clientWidth = self.clientWidth;
      self.scrollStep = {
        top: Math.max(clientHeight * clientHeight * 0.7 / elDoc.height(), 20),
        left: Math.max(clientWidth * clientWidth * 0.7 / elDoc.width(), 20)
      };
      return self.scrollStep;
    },
    handleMouseWheel: function (e) {
      if (this.get('disabled')) {
        return;
      }
      var max, min, self = this, scrollStep = self.getScrollStep(), deltaY, deltaX, maxScroll = self.maxScroll, minScroll = self.minScroll;
      if ((deltaY = e.deltaY) && self.allowScroll.top) {
        var scrollTop = self.get('scrollTop');
        max = maxScroll.top;
        min = minScroll.top;
        if (!(scrollTop <= min && deltaY > 0 || scrollTop >= max && deltaY < 0)) {
          self.scrollToWithBounds({ top: scrollTop - e.deltaY * scrollStep.top });
          e.preventDefault();
        }
      }
      if ((deltaX = e.deltaX) && self.allowScroll.left) {
        var scrollLeft = self.get('scrollLeft');
        max = maxScroll.left;
        min = minScroll.left;
        if (!(scrollLeft <= min && deltaX > 0 || scrollLeft >= max && deltaX < 0)) {
          self.scrollToWithBounds({ left: scrollLeft - e.deltaX * scrollStep.left });
          e.preventDefault();
        }
      }
    },
    stopAnimation: function () {
      var self = this;
      if (self.scrollAnims.length) {
        util.each(self.scrollAnims, function (scrollAnim) {
          scrollAnim.stop();
        });
        self.scrollAnims = [];
      }
      self.scrollToWithBounds({
        left: self.get('scrollLeft'),
        top: self.get('scrollTop')
      });
    },
    _uiSetPageIndex: function (v) {
      this.scrollToPage(v);
    },
    getPageIndexFromXY: function (v, allowX, direction) {
      var pagesOffset = this.pagesOffset.concat([]);
      var p2 = allowX ? 'left' : 'top';
      var i, offset;
      pagesOffset.sort(function (e1, e2) {
        return e1[p2] - e2[p2];
      });
      if (direction > 0) {
        for (i = 0; i < pagesOffset.length; i++) {
          offset = pagesOffset[i];
          if (offset[p2] >= v) {
            return offset.index;
          }
        }
      } else {
        for (i = pagesOffset.length - 1; i >= 0; i--) {
          offset = pagesOffset[i];
          if (offset[p2] <= v) {
            return offset.index;
          }
        }
      }
      return undefined;
    },
    scrollToPage: function (index, animCfg) {
      var self = this, pageOffset;
      if ((pageOffset = self.pagesOffset) && pageOffset[index]) {
        self.set('pageIndex', index);
        self.scrollTo(pageOffset[index], animCfg);
      }
    },
    scrollToWithBounds: function (cfg, anim) {
      var self = this;
      var maxScroll = self.maxScroll;
      var minScroll = self.minScroll;
      if (cfg.left) {
        cfg.left = Math.min(Math.max(cfg.left, minScroll.left), maxScroll.left);
      }
      if (cfg.top) {
        cfg.top = Math.min(Math.max(cfg.top, minScroll.top), maxScroll.top);
      }
      self.scrollTo(cfg, anim);
    },
    scrollTo: function (cfg, animCfg) {
      var self = this, left = cfg.left, top = cfg.top;
      if (animCfg) {
        var node = {}, to = {};
        if (left !== undefined) {
          to.scrollLeft = left;
          node.scrollLeft = self.get('scrollLeft');
        }
        if (top !== undefined) {
          to.scrollTop = top;
          node.scrollTop = self.get('scrollTop');
        }
        animCfg.frame = frame;
        animCfg.node = node;
        animCfg.to = to;
        var anim;
        self.scrollAnims.push(anim = new TimerAnim(animCfg));
        anim.scrollView = self;
        anim.run();
      } else {
        if (left !== undefined) {
          self.set('scrollLeft', left);
        }
        if (top !== undefined) {
          self.set('scrollTop', top);
        }
      }
    },
    _onSetScrollLeft: function (v) {
      this.contentEl.style.left = -v + 'px';
    },
    _onSetScrollTop: function (v) {
      this.contentEl.style.top = -v + 'px';
    }
  };
  if (supportCss3) {
    transformProperty = transformVendorInfo.propertyName;
    methods._onSetScrollLeft = function (v) {
      this.contentEl.style[transformProperty] = 'translateX(' + floor(0 - v) + 'px)' + ' translateY(' + floor(0 - this.get('scrollTop')) + 'px)' + (isTransform3dSupported ? ' translateZ(0)' : '');
    };
    methods._onSetScrollTop = function (v) {
      this.contentEl.style[transformProperty] = 'translateX(' + floor(0 - this.get('scrollLeft')) + 'px)' + ' translateY(' + floor(0 - v) + 'px)' + (isTransform3dSupported ? ' translateZ(0)' : '');
    };
  }
  function onElScroll() {
    var self = this, el = self.el, scrollTop = el.scrollTop, scrollLeft = el.scrollLeft;
    if (scrollTop) {
      self.set('scrollTop', scrollTop + self.get('scrollTop'));
    }
    if (scrollLeft) {
      self.set('scrollLeft', scrollLeft + self.get('scrollLeft'));
    }
    el.scrollTop = el.scrollLeft = 0;
  }
  function frame(anim, fx) {
    anim.scrollView.set(fx.prop, fx.val);
  }
  function reflow(v, e) {
    var self = this, $contentEl = self.$contentEl;
    // consider pull to refresh
    // refresh label will be prepended to el
    // contentEl must be absolute
    // or else
    // relative is weird, should math.max(contentEl.scrollHeight,el.scrollHeight)
    // will affect pull to refresh
    var scrollHeight = v.scrollHeight, scrollWidth = v.scrollWidth;
    var clientHeight = v.clientHeight, allowScroll, clientWidth = v.clientWidth;
    var prevVal = e && e.prevVal || {};
    if (prevVal.scrollHeight === scrollHeight && prevVal.scrollWidth === scrollWidth && clientHeight === prevVal.clientHeight && clientWidth === prevVal.clientWidth) {
      return;
    }
    self.scrollHeight = scrollHeight;
    self.scrollWidth = scrollWidth;
    self.clientHeight = clientHeight;
    self.clientWidth = clientWidth;
    allowScroll = self.allowScroll = {};
    if (scrollHeight > clientHeight) {
      allowScroll.top = 1;
    }
    if (scrollWidth > clientWidth) {
      allowScroll.left = 1;
    }
    self.minScroll = {
      left: 0,
      top: 0
    };
    var maxScrollLeft, maxScrollTop;
    self.maxScroll = {
      left: maxScrollLeft = scrollWidth - clientWidth,
      top: maxScrollTop = scrollHeight - clientHeight
    };
    delete self.scrollStep;
    var snap = self.get('snap'), scrollLeft = self.get('scrollLeft'), scrollTop = self.get('scrollTop');
    if (snap) {
      var elOffset = $contentEl.offset();
      var pages = self.pages = typeof snap === 'string' ? $contentEl.all(snap) : $contentEl.children(), pageIndex = self.get('pageIndex'), pagesOffset = self.pagesOffset = [];
      pages.each(function (p, i) {
        var offset = p.offset(), left = offset.left - elOffset.left, top = offset.top - elOffset.top;
        if (left <= maxScrollLeft && top <= maxScrollTop) {
          pagesOffset[i] = {
            left: left,
            top: top,
            index: i
          };
        }
      });
      if (pageIndex) {
        self.scrollToPage(pageIndex);
        return;
      }
    }
    // in case content is reduces
    self.scrollToWithBounds({
      left: scrollLeft,
      top: scrollTop
    });
    self.fire('reflow', v);
  }
  /**
   * Make container scrollable.
   * module scroll-view will be this class on non-touch device
   * @class KISSY.ScrollView.Base
   * @extend KISSY.Component.Container
   */
  exports = Container.extend([ContentBox], methods, {
    version: '1.0.1',
    ATTRS: {
      focusable: { value: true },
      allowTextSelection: { value: true },
      handleGestureEvents: { value: false },
      scrollLeft: {
        render: 1,
        value: 0
      },
      scrollTop: {
        render: 1,
        value: 0
      },
      dimension: {},
      snap: { value: false },
      pageIndex: { value: 0 }
    },
    xclass: 'scroll-view'
  });
  return exports;
}();
module.exports = scrollViewBase;
});