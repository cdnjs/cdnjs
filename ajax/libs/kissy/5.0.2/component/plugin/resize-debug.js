/*
Copyright 2014, modulex-component@1.0.3
MIT Licensed
build time: Thu, 16 Oct 2014 07:30:48 GMT
*/
modulex.add("component/plugin/resize", ["resizable"], function(require, exports, module) {
var resizable = require("resizable");
/*
combined modules:
component/plugin/resize
*/
var componentPluginResize;
componentPluginResize = function (exports) {
  /**
   * @ignore
   * resize plugin for kissy component
   * @author yiminghe@gmail.com
   */
  var Resizable = resizable;
  /**
   * resize plugin for kissy component
   *
   *      @example
   *      var o =new Overlay.Dialog({
       *          plugins:[
       *              new ResizePlugin({
       *                  handles: ['t','tr']
       *              })
       *          ]
       *      })
   *      // or
   *      o.plug(new ResizePlugin({
       *          handles: ['t','tr']
       *      });
   *
   *
   * @class KISSY.Component.Plugin.Resize
   * @extends KISSY.Resizable
   */
  exports = Resizable.extend({
    pluginBindUI: function (component) {
      var $el = component.$el, self = this;
      self.set('node', $el);
      self.set('prefixCls', component.get('prefixCls'));
      self.on('resizeEnd', function () {
        var offset = $el.offset();
        component.setInternal('xy', [
          offset.left,
          offset.top
        ]);
        component.setInternal('width', $el.width());
        component.setInternal('height', $el.height());
      });
    },
    pluginDestructor: function () {
      this.destroy();
    }
  });
  return exports;
}();
module.exports = componentPluginResize;
});