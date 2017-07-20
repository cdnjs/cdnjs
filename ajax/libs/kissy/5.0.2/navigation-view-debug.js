/*
Copyright 2014, modulex-navigation-view@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 08:10:16 GMT
*/
modulex.add("navigation-view", ["util","component/container","component/control","component/extension/content-box","feature"], function(require, exports, module) {
var _util_ = require("util");
var componentContainer = require("component/container");
var componentControl = require("component/control");
var componentExtensionContentBox = require("component/extension/content-box");
var feature = require("feature");
/*
combined modules:
navigation-view
*/
var navigationView;
navigationView = function (exports) {
  /**
   * navigation view to accommodate multiple views
   * @author yiminghe@gmail.com
   */
  var util = _util_;
  var vendorInfo = feature.getCssVendorInfo('animation');
  var vendorPrefix = vendorInfo && vendorInfo.propertyNamePrefix;
  var ANIMATION_END_EVENT = vendorPrefix ? vendorPrefix.toLowerCase() + 'AnimationEnd' : // https://github.com/kissyteam/kissy/issues/538
  'animationend webkitAnimationEnd';
  var Container = componentContainer;
  var Control = componentControl;
  var ContentBox = componentExtensionContentBox;
  function getAnimCss(prefixCls, animation, enter) {
    return prefixCls + 'navigation-view-' + ('anim-' + animation + '-' + (enter ? 'enter' : 'leave')) + ' ' + prefixCls + 'navigation-view-anim-ing';
  }
  function getAnimValueFromView(view, enter, backward) {
    var animation = view.get('animation');
    if (typeof animation === 'string') {
      return animation;
    }
    var animationValue;
    if (backward) {
      animationValue = enter ? animation[1] : animation[0];
    } else {
      animationValue = enter ? animation[0] : animation[1];
    }
    return animationValue;
  }
  function transition(view, enter, backward) {
    clearAnimCss(view);
    var animationValue = getAnimValueFromView(view, enter, backward);
    if (animationValue === 'none') {
      if (enter) {
        view.show();
      } else {
        view.hide();
      }
      return;
    }
    view.show();
    view.$el.addClass(view._viewAnimCss = getAnimCss(view.get('prefixCls'), animationValue, enter));
  }
  function loadingTransition(loadingView, view, enter, backward) {
    clearAnimCss(loadingView);
    var animationValue = getAnimValueFromView(view, enter, backward);
    if (animationValue === 'none') {
      if (enter) {
        loadingView.show();
      } else {
        loadingView.hide();
      }
      return;
    }
    loadingView.show();
    loadingView.$el.addClass(loadingView._viewAnimCss = getAnimCss(view.get('prefixCls'), animationValue, enter));
  }
  function clearAnimCss(self) {
    if (self._viewAnimCss) {
      self.$el.removeClass(self._viewAnimCss);
      self._viewAnimCss = null;
    }
  }
  var LoadingView = Control.extend({
    bindUI: function () {
      var self = this;
      self.$el.on(ANIMATION_END_EVENT, function () {
        clearAnimCss(self);
        if (!self.active) {
          self.hide();
        }
      });
    },
    transition: function (enter, backward) {
      var self = this;
      self.active = enter;
      loadingTransition(self, self.navigationView.get('activeView'), enter, backward);
    }
  }, {
    xclass: 'navigation-view-loading',
    version: '1.0.1',
    ATTRS: {
      handleGestureEvents: { value: false },
      focusable: { value: false },
      allowTextSelection: { value: true },
      visible: { value: false }
    }
  });
  function getViewInstance(navigationView, config) {
    var children = navigationView.get('children');
    var viewId = config.viewId;
    for (var i = 0; i < children.length; i++) {
      if (children[i].constructor.xclass === config.xclass) {
        if (viewId) {
          if (children[i].get('viewId') === viewId) {
            return children[i];
          }
        } else {
          return children[i];
        }
      }
    }
    return null;
  }
  function switchTo(navigationView, viewConfig, backward) {
    var loadingView = navigationView.loadingView;
    var view = viewConfig.view;
    var fromCache = viewConfig.fromCache;
    var oldView = navigationView.get('activeView');
    navigationView.fire('beforeInnerViewChange', {
      oldView: oldView,
      newView: view,
      backward: backward
    });
    if (oldView && oldView.leave) {
      oldView.leave();
    }
    navigationView.set('activeView', view);
    if (view.enter) {
      view.enter({ fromCache: fromCache });
    }
    var promise = view.promise;
    if (promise) {
      if (oldView) {
        transition(oldView, false, backward);
        loadingView.transition(true, backward);
      } else {
        loadingView.show();
      }
      promise.then(function () {
        if (navigationView.get('activeView') === view) {
          loadingView.hide();
          view.show();
          navigationView.fire('afterInnerViewChange', {
            newView: view,
            oldView: oldView,
            backward: backward
          });
        }
      });
    } else {
      // is loading and not first view
      if (loadingView.get('visible')) {
        loadingView.transition(false, backward);
        transition(view, true, backward);
      } else if (oldView) {
        transition(oldView, false, backward);
        transition(view, true, backward);
      } else {
        view.show();
      }
      navigationView.fire('afterInnerViewChange', {
        newView: view,
        oldView: oldView,
        backward: backward
      });
    }
    gc(navigationView);
  }
  function gc(navigationView) {
    var children = navigationView.get('children').concat();
    var viewCacheSize = navigationView.get('viewCacheSize');
    if (children.length <= viewCacheSize) {
      return;
    }
    var removedSize = Math.floor(viewCacheSize / 3);
    children.sort(function (a, b) {
      return a.timeStamp - b.timeStamp;
    });
    for (var i = 0; i < removedSize; i++) {
      navigationView.removeChild(children[i]);
    }
  }
  function onViewAnimEnd() {
    var self = this;
    clearAnimCss(self);
    if (self.get('navigationView').get('activeView') === self) {
      self.show();
    } else {
      self.hide();
    }
  }
  function createView(self, config) {
    var view = getViewInstance(self, config);
    var fromCache = !!view;
    if (view) {
      view.set(config);
    } else {
      view = self.addChild(config);
      view.$el.on(ANIMATION_END_EVENT, onViewAnimEnd, view);
    }
    view.timeStamp = util.now();
    return {
      view: view,
      fromCache: fromCache
    };
  }
  exports = Container.extend([ContentBox], {
    initializer: function () {
      this.viewStack = [];
    },
    createDom: function () {
      var self = this;
      var loadingHtml = self.get('loadingHtml');
      if (loadingHtml !== false) {
        self.loadingView = new LoadingView({
          content: loadingHtml,
          render: self.contentEl
        }).render();
        self.loadingView.navigationView = self;
      }
    },
    _onSetLoadingHtml: function (v) {
      if (this.loadingView) {
        this.loadingView.set('content', v);
      }
    },
    push: function (config) {
      var self = this, viewStack = self.viewStack;
      config.animation = config.animation || self.get('animation');
      config.navigationView = self;
      viewStack.push(config);
      switchTo(self, createView(self, config));
    },
    replace: function (config) {
      var self = this, viewStack = self.viewStack;
      if (viewStack.length) {
        util.mix(viewStack[viewStack.length - 1], config);
        self.get('activeView').set(config);
      }
    },
    pop: function (config) {
      var self = this, viewStack = self.viewStack;
      if (viewStack.length > 1) {
        viewStack.pop();
        config = viewStack[viewStack.length - 1];
        switchTo(self, createView(self, config), true);
      }
    }
  }, {
    xclass: 'navigation-view',
    ATTRS: {
      animation: {
        valueFn: function () {
          return [
            'slide-right',
            'slide-left'
          ];
        }
      },
      loadingHtml: { sync: 0 },
      handleGestureEvents: { value: false },
      viewCacheSize: { value: 10 },
      focusable: { value: false },
      allowTextSelection: { value: true },
      defaultChildCfg: {
        valueFn: function () {
          return {
            handleGestureEvents: false,
            visible: false,
            allowTextSelection: true
          };
        }
      }
    }
  });
  return exports;
}();
module.exports = navigationView;
});