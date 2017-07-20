modulex.add("toolbar", ["component/container","component/extension/delegate-children","util","node"], function(require, exports, module) {
var componentContainer = require("component/container");
var componentExtensionDelegateChildren = require("component/extension/delegate-children");
var _util_ = require("util");
var node = require("node");
/*
combined modules:
toolbar
*/
var toolbar;
toolbar = function (exports) {
  /**
   * @ignore
   * Toolbar for KISSY.
   * @author yiminghe@gmail.com
   */
  var Container = componentContainer;
  var DelegateChildrenExtension = componentExtensionDelegateChildren;
  var util = _util_;
  var KeyCode = node.Event.KeyCode;
  function getNextEnabledItem(index, direction, self) {
    var children = self.get('children'), count = 0, childrenLength = children.length;
    if (index === undefined) {
      if (direction === 1) {
        index = 0;
      } else {
        index = childrenLength - 1;
      }
      if (!children[index].get('disabled')) {
        return children[index];
      }
    }
    do {
      count++;
      index = (index + childrenLength + direction) % childrenLength;
    } while (count < childrenLength && children[index].get('disabled'));
    if (count !== childrenLength) {
      return children[index];
    }
    return null;
  }
  function afterCollapsedChange(e) {
    var self = this;
    if (e.newVal) {
      self.set('expandedItem', null);
    } else {
      self.set('expandedItem', e.target);
    }
  }
  function afterHighlightedChange(e) {
    var self = this, expandedItem, children, target = e.target;
    if (self !== target && (target.isMenuItem || target.isButton)) {
      if (e.newVal) {
        children = self.get('children');
        if ((expandedItem = self.get('expandedItem')) && util.inArray(target, children)) {
          // in case collapse false modify highlightedItem
          self.set('expandedItem', target.isMenuButton ? target : null);
        }
        self.set('highlightedItem', target);
      } else {
        if (!e.byPassSetToolbarHighlightedItem) {
          self.set('highlightedItem', null);
        }
      }
    }
  }
  function getChildByHighlightedItem(toolbar) {
    var children = toolbar.get('children'), i, child;
    for (i = 0; i < children.length; i++) {
      child = children[i];
      if (child.get('highlighted') || child.isMenuButton && !child.get('collapsed')) {
        return child;
      }
    }
    return null;
  }
  /**
   * Toolbar component for KISSY. xclass: 'toolbar'.
   * @class KISSY.Toolbar
   * @extends KISSY.Component.Container
   */
  exports = Container.extend([DelegateChildrenExtension], {
    beforeCreateDom: function (renderData) {
      renderData.elAttrs.role = 'toolbar';
    },
    bindUI: function () {
      var self = this;
      self.on('afterCollapsedChange', afterCollapsedChange, self);
      self.on('afterHighlightedChange', afterHighlightedChange, self);
    },
    handleBlurInternal: function (e) {
      var self = this, highlightedItem;
      self.callSuper(e);
      self.set('expandedItem', null);
      if (highlightedItem = self.get('highlightedItem')) {
        highlightedItem.set('highlighted', false);
      }
    },
    getNextItemByKeyDown: function (e, current) {
      var self = this, children = self.get('children'), childIndex = current && util.indexOf(current, children);
      if (current) {
        if (current.handleKeyDownInternal(e)) {
          return true;
        }
      }
      if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) {
        return false;
      }
      switch (e.keyCode) {
      case KeyCode.ESC:
        self.getKeyEventTarget().fire('blur');
        return true;
      case KeyCode.HOME:
        current = getNextEnabledItem(undefined, 1, self);
        break;
      case KeyCode.END:
        current = getNextEnabledItem(undefined, -1, self);
        break;
      case KeyCode.UP:
        current = getNextEnabledItem(childIndex, -1, self);
        break;
      case KeyCode.LEFT:
        current = getNextEnabledItem(childIndex, -1, self);
        break;
      case KeyCode.DOWN:
        current = getNextEnabledItem(childIndex, 1, self);
        break;
      case KeyCode.RIGHT:
        current = getNextEnabledItem(childIndex, 1, self);
        break;
      default:
        return false;
      }
      return current;
    },
    handleKeyDownInternal: function (e) {
      var self = this, currentChild = getChildByHighlightedItem(self), nextHighlightedItem = self.getNextItemByKeyDown(e, currentChild);
      if (typeof nextHighlightedItem === 'boolean') {
        return nextHighlightedItem;
      }
      if (nextHighlightedItem) {
        nextHighlightedItem.set('highlighted', true);
      }
      return true;
    },
    _onSetHighlightedItem: function (item, e) {
      var id, itemEl, self = this, prevVal = e && e.prevVal, children = self.get('children'), el = self.el;
      if (prevVal && util.inArray(prevVal, children)) {
        prevVal.set('highlighted', false, { data: { byPassSetToolbarHighlightedItem: 1 } });
      }
      if (item) {
        if (el.ownerDocument.activeElement !== el) {
          self.focus();
        }
        itemEl = item.el;
        id = itemEl.id;
        if (!id) {
          itemEl.id = id = util.guid('ks-toolbar-item');
        }
        el.setAttribute('aria-activedescendant', id);
      } else {
        el.setAttribute('aria-activedescendant', '');
      }
    },
    _onSetExpandedItem: function (v, e) {
      if (e && e.prevVal) {
        e.prevVal.set('collapsed', true);
      }
      if (v) {
        v.set('collapsed', false);
      }
    }
  }, {
    xclass: 'toolbar',
    version: '1.0.1',
    ATTRS: {
      allowTextSelection: { value: true },
      focusable: { value: true },
      handleGestureEvents: { value: true },
      highlightedItem: {},
      expandedItem: {},
      defaultChildCfg: {
        valueFn: function () {
          return {
            xclass: 'button',
            handleGestureEvents: false,
            focusable: false
          };
        }
      }
    }
  });
  return exports;
}();
module.exports = toolbar;
});