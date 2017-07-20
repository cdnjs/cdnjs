/*
Copyright 2014, modulex-scroll-view@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 08:08:10 GMT
*/
modulex.add("scroll-view/plugin/pull-to-refresh", ["base","util","node","feature"], function(require, exports, module) {
var base = require("base");
var _util_ = require("util");
var node = require("node");
var feature = require("feature");
/*
combined modules:
scroll-view/plugin/pull-to-refresh
*/
var scrollViewPluginPullToRefresh;
scrollViewPluginPullToRefresh = function (exports) {
  /**
   * @ignore
   * pull-to-refresh plugin for KISSY scroll-view
   * @author yiminghe@gmail.com
   */
  var Base = base;
  var util = _util_;
  var $ = node;
  var substitute = _util_.substitute;
  var transformVendorInfo = feature.getCssVendorInfo('transform');
  var transformProperty = transformVendorInfo && transformVendorInfo.propertyName;
  function setState(self, state, direction) {
    self.isLoading = state === 'loading';
    var prefixCls = self.scrollView.get('prefixCls'), $el = self.get$El(direction);
    $el.attr('class', prefixCls + 'scroll-view-pull-' + direction + '-to-refresh ' + prefixCls + 'scroll-view-' + state);
    self.get$LabelEl(direction).html(self.getStateHtml(direction, state));
  }
  /**
   * pull to refresh plugin for ScrollView
   * @class KISSY.ScrollView.Plugin.PullToRefresh
   * @extend KISSY.Base
   */
  exports = Base.extend({
    pluginId: this.name,
    get$El: function (direction) {
      return this['$' + direction + 'El'];
    },
    getEl: function (direction) {
      return this.get$El(direction)[0];
    },
    get$LabelEl: function (direction) {
      return this['$' + direction + 'LabelEl'];
    },
    getStateHtml: function (direction, state) {
      direction = util.ucfirst(direction);
      return this.get(state + direction + 'Html');
    },
    _onSetPullUpState: function (state) {
      setState(this, state, 'up');
    },
    _onSetPullDownState: function (state) {
      setState(this, state, 'down');
    },
    _onScrollMove: function () {
      var self = this;
      if (self.isLoading) {
        return;
      }
      var b = self.scrollView.get('scrollTop');
      if (b < 0) {
        if (self.get$El('down')) {
          self.set('pullDownState', b > -self.pulldownElHeight ? 'pulling' : 'releasing');
        }
      } else if (b > self.scrollView.maxScroll.top) {
        if (self.get$El('up')) {
          self.set('pullUpState', b < self.scrollView.maxScroll.top + self.pullupElHeight ? 'pulling' : 'releasing');
        }
      }
    },
    _onDragEnd: function () {
      var self = this;
      if (self.isLoading) {
        return;
      }
      var loadFn;
      var callback;
      var scrollView = self.scrollView;
      var b = scrollView.get('scrollTop');
      if (self.get$El('down') && b < -self.pulldownElHeight) {
        scrollView.minScroll.top = -self.pulldownElHeight;
        loadFn = self.get('pullDownLoadFn');
        self.set('pullDownState', 'loading');
        callback = function () {
          scrollView.scrollTo({ top: -self.pulldownElHeight });
          scrollView.scrollTo({ top: scrollView.minScroll.top }, {
            duration: scrollView.get('snapDuration'),
            easing: scrollView.get('snapEasing')
          });
          self.set('pullDownState', 'pulling');
        };
      } else if (self.get$El('up') && b > scrollView.maxScroll.top + self.pullupElHeight) {
        scrollView.maxScroll.top += self.pullupElHeight;
        loadFn = self.get('pullUpLoadFn');
        self.set('pullUpState', 'loading');
        callback = function () {
          scrollView.scrollTo({ top: scrollView.maxScroll.top + self.pullupElHeight });
          scrollView.scrollTo({ top: scrollView.maxScroll.top }, {
            duration: scrollView.get('snapDuration'),
            easing: scrollView.get('snapEasing')
          });
          self.set('pullUpState', 'pulling');
        };
      }
      if (loadFn) {
        loadFn.call(self, callback);
      }
    },
    _onSetScrollTop: function (v) {
      v = v.newVal;
      var self = this;
      if (self.get$El('down') && v < 0) {
        self.getEl('down').style[transformProperty] = 'translate3d(0,' + -v + 'px,0)';
      }
      if (self.get$El('up')) {
        var maxTop = self.scrollView.maxScroll.top;
        if (self.isLoading) {
          maxTop -= self.pullupElHeight;
        }
        if (v > maxTop) {
          self.getEl('up').style[transformProperty] = 'translate3d(0,' + (maxTop - v) + 'px,0)';
        }
      }
    },
    pluginRenderUI: function (scrollView) {
      var self = this;
      self.scrollView = scrollView;
      var direction = [];
      if (self.get('pullUpLoadFn')) {
        direction.push('up');
      }
      if (self.get('pullDownLoadFn')) {
        direction.push('down');
      }
      var prefixCls = scrollView.get('prefixCls');
      util.each(direction, function (d) {
        var $el = $(substitute('<div class="{prefixCls}scroll-view-pull-{d}-to-refresh" ontouchmove="return false;">' + '<div class="{prefixCls}scroll-view-pull-{d}-to-refresh-content">' + '<span class="{prefixCls}scroll-view-pull-{d}-icon"></span>' + '<span class="{prefixCls}scroll-view-pull-{d}-label"></span>' + '</div>' + '</div>', {
          prefixCls: prefixCls,
          d: d
        }));
        self['$' + d + 'LabelEl'] = $el.one('.' + prefixCls + 'scroll-view-pull-' + d + '-label');
        scrollView.get('el').prepend($el);
        self['$' + d + 'El'] = $el;
        self['pull' + d + 'ElHeight'] = $el.height();
      });
    },
    pluginBindUI: function (scrollView) {
      var self = this;
      scrollView.on('touchMove', self._onScrollMove, self);
      scrollView.on('touchEnd', self._onDragEnd, self);
      scrollView.on('afterScrollTopChange', self._onSetScrollTop, self);
    },
    pluginDestructor: function (scrollView) {
      var self = this;
      if (self.get$El('up')) {
        self.get$El('up').remove();
      }
      if (self.get$El('down')) {
        self.get$El('down').remove();
      }
      scrollView.detach('touchMove', self._onScrollMove, self);
      scrollView.detach('touchEnd', self._onDragEnd, self);
      scrollView.detach('afterScrollTopChange', self._onSetScrollTop, self);
    }
  }, {
    ATTRS: {
      pullingDownHtml: { value: 'Pull down to refresh...' },
      pullingUpHtml: { value: 'Pull up to refresh...' },
      releasingUpHtml: { value: 'release to refresh...' },
      releasingDownHtml: { value: 'release to refresh...' },
      loadingUpHtml: { value: 'loading...' },
      loadingDownHtml: { value: 'loading...' },
      pullUpLoadFn: {},
      pullDownLoadFn: {},
      pullUpState: {},
      pullDownState: {}
    }
  });
  return exports;
}();
module.exports = scrollViewPluginPullToRefresh;
});