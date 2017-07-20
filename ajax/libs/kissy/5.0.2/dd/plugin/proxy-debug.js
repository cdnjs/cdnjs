/*
Copyright 2014, modulex-dd@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 07:15:25 GMT
*/
modulex.add("dd/plugin/proxy", ["dd","base"], function(require, exports, module) {
var dd = require("dd");
var base = require("base");
/*
combined modules:
dd/plugin/proxy
*/
var ddPluginProxy;
ddPluginProxy = function (exports) {
  /**
   * @ignore
   * generate proxy drag object,
   * @author yiminghe@gmail.com
   */
  var DD = dd, Base = base;
  var DDM = DD.DDM, PROXY_EVENT = '.-ks-proxy' + +new Date();
  /**
   * @extends KISSY.Base
   * @class KISSY.DD.Plugin.Proxy
   * Proxy plugin to provide abilities for draggable tp create a proxy drag node,
   * instead of dragging the original node.
   */
  exports = Base.extend({
    pluginId: 'dd/plugin/proxy',
    pluginInitializer: function (drag) {
      var self = this;
      function start() {
        var node = self.get('node'), dragNode = drag.get('node');
        if (!self.get('proxyNode')) {
          if (typeof node === 'function') {
            node = node(drag);
            node.addClass('ks-dd-proxy');
            self.set('proxyNode', node);
          }
        } else {
          node = self.get('proxyNode');
        }
        node.show();
        dragNode.parent().append(node);
        DDM.cacheWH(node);
        node.offset(dragNode.offset());
        drag.setInternal('dragNode', dragNode);
        drag.setInternal('node', node);
      }
      function end() {
        var node = self.get('proxyNode'), dragNode = drag.get('dragNode');
        if (self.get('moveOnEnd')) {
          dragNode.offset(node.offset());
        }
        if (self.get('destroyOnEnd')) {
          node.remove();
          self.set('proxyNode', 0);
        } else {
          node.hide();
        }
        drag.setInternal('node', dragNode);
      }
      drag.on('dragstart' + PROXY_EVENT, start).on('dragend' + PROXY_EVENT, end);
    },
    pluginDestructor: function (drag) {
      drag.detach(PROXY_EVENT);
    }
  }, {
    ATTRS: {
      node: {
        value: function (drag) {
          return drag.get('node').clone(true);
        }
      },
      destroyOnEnd: { value: false },
      moveOnEnd: { value: true },
      proxyNode: {}
    }
  });
  return exports;
}();
module.exports = ddPluginProxy;
});