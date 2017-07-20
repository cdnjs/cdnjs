/*
Copyright 2014, modulex-button@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 07:32:08 GMT
*/
modulex.add("button", ["node","component/control"], function(require, exports, module) {
var node = require("node");
var componentControl = require("component/control");
/*
combined modules:
button
*/
var button;
button = function (exports) {
  /**
   * @ignore
   * Button control
   * @author yiminghe@gmail.com
   */
  var $ = node;
  var Control = componentControl;
  var KeyCode = $.Event.KeyCode;
  /**
   * Button.
   * @extends Component.Control
   * @class Button
   */
  exports = Control.extend({
    isButton: 1,
    beforeCreateDom: function (renderData) {
      var self = this;
      var elAttrs = renderData.elAttrs;
      elAttrs.role = 'button';
      if (renderData.tooltip) {
        elAttrs.title = renderData.tooltip;
      }
      if (renderData['aria-describedby']) {
        elAttrs['aria-describedby'] = renderData.describedby;
      }
      if (renderData.checked) {
        renderData.elCls.push(self.getBaseCssClasses('checked'));
      }
    },
    bindUI: function () {
      this.$el.on('keyup', this.handleKeyDownInternal, this);
    },
    handleKeyDownInternal: function (e) {
      if (e.keyCode === KeyCode.ENTER && e.type === 'keydown' || e.keyCode === KeyCode.SPACE && e.type === 'keyup') {
        return this.handleClickInternal(e);
      }
      return e.keyCode === KeyCode.SPACE;
    },
    handleClickInternal: function () {
      var self = this;
      self.callSuper();
      if (self.get('checkable')) {
        self.set('checked', !self.get('checked'));
      }
      self.fire('click');
    },
    _onSetChecked: function (v) {
      var self = this, cls = self.getBaseCssClasses('checked');
      self.$el[v ? 'addClass' : 'removeClass'](cls);
    },
    _onSetTooltip: function (title) {
      this.el.setAttribute('title', title);
    },
    _onSetDescribedby: function (describedby) {
      this.el.setAttribute('aria-describedby', describedby);
    }
  }, {
    version: '1.0.1',
    ATTRS: {
      handleGestureEvents: { value: true },
      focusable: { value: true },
      allowTextSelection: { value: false },
      value: {},
      describedby: {
        value: '',
        render: 1,
        sync: 0
      },
      tooltip: {
        value: '',
        render: 1,
        sync: 0
      },
      checkable: {},
      checked: {
        value: false,
        render: 1,
        sync: 0
      }
    },
    xclass: 'button'
  });
  return exports;
}();
module.exports = button;
});