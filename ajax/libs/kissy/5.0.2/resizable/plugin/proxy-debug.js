/*
Copyright 2014, modulex-resizable@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 07:17:59 GMT
*/
modulex.add("resizable/plugin/proxy", ["base","node"], function(require, exports, module) {
var base = require("base");
var _node_ = require("node");
/*
combined modules:
resizable/plugin/proxy
*/
var resizablePluginProxy;
resizablePluginProxy = function (exports) {
  /**
   * resize proxy plugin for resizable.
   * same with dd/plugin/proxy
   * @ignore
   * @author yiminghe@gmail.com
   */
  var Base = base;
  var $ = _node_, PROXY_EVENT = '.-ks-proxy' + +new Date();
  /**
   * proxy plugin for resizable
   * @class KISSY.Resizable.Plugin.Proxy
   */
  exports = Base.extend({
    pluginId: 'resizable/plugin/proxy',
    pluginInitializer: function (resizable) {
      var self = this, hideNodeOnResize = self.get('hideNodeOnResize');
      function start() {
        var node = self.get('node'), dragNode = resizable.get('node');
        if (!self.get('proxyNode')) {
          if (typeof node === 'function') {
            node = node(resizable);
            self.set('proxyNode', node);
          }
        } else {
          node = self.get('proxyNode');
        }
        node.show();
        dragNode.parent().append(node);
        node.css({
          left: dragNode.css('left'),
          top: dragNode.css('top'),
          width: dragNode.width(),
          height: dragNode.height()
        });
        if (hideNodeOnResize) {
          dragNode.css('visibility', 'hidden');
        }
      }
      function beforeResize(e) {
        e.preventDefault();
        self.get('proxyNode').css(e.region);
      }
      function end() {
        var node = self.get('proxyNode'), dragNode = resizable.get('node');
        dragNode.css({
          left: node.css('left'),
          top: node.css('top'),
          width: node.width(),
          height: node.height()
        });
        if (self.get('destroyOnEnd')) {
          node.remove();
          self.set('proxyNode', 0);
        } else {
          node.hide();
        }
        if (hideNodeOnResize) {
          dragNode.css('visibility', '');
        }
      }
      resizable.on('resizeStart' + PROXY_EVENT, start).on('beforeResize' + PROXY_EVENT, beforeResize).on('resizeEnd' + PROXY_EVENT, end);
    },
    pluginDestructor: function (resizable) {
      resizable.detach(PROXY_EVENT);
    }
  }, {
    ATTRS: {
      node: {
        value: function (resizable) {
          return $('<div class="' + resizable.get('prefixCls') + 'resizable-proxy"></div>');
        }
      },
      proxyNode: {},
      hideNodeOnResize: { value: false },
      destroyOnEnd: { value: false }
    }
  });
  return exports;
}();
module.exports = resizablePluginProxy;
});