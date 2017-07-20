/*
Copyright 2014, modulex-component@1.0.3
MIT Licensed
build time: Thu, 16 Oct 2014 07:30:48 GMT
*/
modulex.add("component/extension/delegate-children", ["event-dom/gesture/basic","event-dom/gesture/tap","component/control"], function(require, exports, module) {
var eventDomGestureBasic = require("event-dom/gesture/basic");
var eventDomGestureTap = require("event-dom/gesture/tap");
var componentControl = require("component/control");
/*
combined modules:
component/extension/delegate-children
*/
var componentExtensionDelegateChildren;
componentExtensionDelegateChildren = function (exports) {
  /**
   * @ignore
   * delegate events for children
   * @author yiminghe@gmail.com
   */
  var Manager = componentControl.Manager;
  var BasicGesture = eventDomGestureBasic;
  var TapGesture = eventDomGestureTap;
  function onRenderChild(e) {
    if (e.target === this) {
      var child = e.component, el = child.$el;
      el.addClass(this.__childClsTag);
    }
  }
  function onRemoveChild(e) {
    if (e.target === this) {
      var child = e.component, el = child.$el;
      if (el) {
        el.removeClass(this.__childClsTag);
      }
    }
  }
  var guid = 1;
  /**
   * delegate events for component's children. for mixin.
   * @class KISSY.Component.Extension.DelegateChildren
   */
  function DelegateChildren() {
    var self = this;
    self.__childClsTag = 'ks-component-child' + guid++;
    self.on('afterRenderChild', onRenderChild, self).on('afterRemoveChild', onRemoveChild, self);
  }
  DelegateChildren.prototype = {
    handleChildrenEvents: function (e) {
      if (!this.get('disabled')) {
        var control = this.getOwnerControl(e);
        if (control && !control.get('disabled')) {
          // e.stopPropagation();
          // Child control identified; forward the event.
          switch (e.type) {
          case BasicGesture.START:
            control.handleMouseDown(e);
            break;
          case BasicGesture.END:
            control.handleMouseUp(e);
            break;
          case TapGesture.TAP:
            control.handleClick(e);
            break;
          case 'mouseenter':
            control.handleMouseEnter(e);
            break;
          case 'mouseleave':
            control.handleMouseLeave(e);
            break;
          case 'contextmenu':
            control.handleContextMenu(e);
            break;
          default:
            throw new Error(e.type + ' unhandled!');
          }
        }
      }
    },
    __bindUI: function () {
      var self = this, events = BasicGesture.START + ' ' + BasicGesture.END + ' ' + TapGesture.TAP;
      events += ' mouseenter mouseleave contextmenu';
      self.$el.delegate(events, '.' + self.__childClsTag, self.handleChildrenEvents, self);
    },
    /**
     * Get child component which contains current event target node.
     * @protected
     * @param {KISSY.Event.DomEvent.Object} e event
     * @return {KISSY.Component.Control}
     */
    getOwnerControl: function (e) {
      return Manager.getComponent(e.currentTarget.id);
    }
  };
  exports = DelegateChildren;
  return exports;
}();
module.exports = componentExtensionDelegateChildren;
});