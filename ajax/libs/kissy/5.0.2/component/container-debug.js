/*
Copyright 2014, modulex-component@1.0.3
MIT Licensed
build time: Thu, 16 Oct 2014 07:30:48 GMT
*/
modulex.add("component/container", ["util","component/control"], function(require, exports, module) {
var _util_ = require("util");
var componentControl = require("component/control");
/*
combined modules:
component/container
*/
var componentContainer;
componentContainer = function (exports) {
  /**
   * @ignore
   * component hierarchy management
   * @author yiminghe@gmail.com
   */
  var util = _util_;
  var Control = componentControl;
  var Manager = Control.Manager;
  function defAddChild(e) {
    var self = this;
    var c = e.component, children = self.get('children'), index = e.index;
    children.splice(index, 0, c);
    // construct
    children = self.get('children');
    c = children[index];
    // in case dom node
    if (c.setInternal) {
      c.setInternal('parent', self);
    }
    // NOTE 20140618
    // child can not render into a documentFragment(parent is not in dom tree)
    if (self.get('rendered')) {
      self.renderChild(index);
    }
    self.fire('afterAddChild', {
      component: c,
      index: index
    });
  }
  function defRemoveChild(e) {
    var self = this;
    var c = e.component, destroy = e.destroy, children = self.get('children'), index = e.index;
    if (index !== -1) {
      children.splice(index, 1);
    }
    if (c.setInternal) {
      c.setInternal('parent', null);
    }
    // c is still json
    if (c.destroy) {
      c.destroy(destroy);
    } else if (c.isNode) {
      if (destroy) {
        c.remove();
      }
    }
    self.fire('afterRemoveChild', {
      component: c,
      index: index
    });
  }
  /**
   * Base Container class for KISSY Component.
   * @extends KISSY.Component.Control
   * @class KISSY.Component.Container
   */
  exports = Control.extend({
    isContainer: true,
    initializer: function () {
      var self = this, prefixCls = self.get('prefixCls'), defaultChildCfg = self.get('defaultChildCfg');
      self.publish('beforeAddChild', {
        defaultFn: defAddChild,
        defaultTargetOnly: true
      });
      self.publish('beforeRemoveChild', {
        defaultFn: defRemoveChild,
        defaultTargetOnly: true
      });
      defaultChildCfg.prefixCls = defaultChildCfg.prefixCls || prefixCls;
    },
    decorateDom: function () {
      var self = this, childrenContainerEl = self.getChildrenContainerEl(), defaultChildCfg = self.get('defaultChildCfg'), prefixCls = defaultChildCfg.prefixCls, defaultChildXClass = defaultChildCfg.xclass, childrenComponents = [], children = childrenContainerEl.children();
      children.each(function (c) {
        var ChildUI = self.getComponentConstructorByNode(prefixCls, c) || defaultChildXClass && Manager.getConstructorByXClass(defaultChildXClass);
        if (ChildUI) {
          childrenComponents.push(new ChildUI(util.merge(defaultChildCfg, { srcNode: c })));
        } else {
          childrenComponents.push(c);
        }
      });
      self.set('children', childrenComponents);
    },
    createDom: function () {
      this.createChildren();
    },
    renderUI: function () {
      this.renderChildren();
    },
    renderChildren: function () {
      var i, self = this, children = self.get('children');
      for (i = 0; i < children.length; i++) {
        self.renderChild(i);
      }
    },
    createChildren: function () {
      var i, self = this, children = self.get('children');
      for (i = 0; i < children.length; i++) {
        self.createChild(i);
      }
    },
    addChild: function (c, index) {
      var self = this, children = self.get('children');
      if (index === undefined) {
        index = children.length;
      }
      self.fire('beforeAddChild', {
        component: c,
        index: index
      });
      return children[index];
    },
    renderChild: function (childIndex) {
      var self = this;
      var children = self.get('children');
      var c = self.createChild(childIndex);
      if (!c.isNode) {
        c.render();
      }
      self.fire('afterRenderChild', {
        component: children[childIndex],
        index: childIndex
      });
    },
    createChild: function (childIndex) {
      var self = this, c, elBefore, domContentEl, children = self.get('children'), cEl, contentEl;
      c = children[childIndex];
      contentEl = self.getChildrenContainerEl();
      domContentEl = contentEl[0];
      elBefore = domContentEl.children[childIndex] || null;
      if (c.isNode) {
        cEl = c.isNode ? c[0] : c.el;
        if (cEl.parentNode !== domContentEl) {
          domContentEl.insertBefore(cEl, elBefore);
        }
      } else {
        if (c.get('rendered')) {
          cEl = c.isNode ? c[0] : c.el;
          if (cEl.parentNode !== domContentEl) {
            domContentEl.insertBefore(cEl, elBefore);
          }
        } else {
          if (elBefore) {
            c.set('elBefore', elBefore);
          } else {
            c.set('render', contentEl);
          }
          c.create();
        }
      }
      self.fire('afterCreateChild', {
        component: c,
        index: childIndex
      });
      return c;
    },
    addChildren: function (children) {
      var i, l = children.length;
      for (i = 0; i < l; i++) {
        this.addChild(children[i]);
      }
    },
    removeChild: function (c, destroy) {
      if (destroy === undefined) {
        destroy = true;
      }
      this.fire('beforeRemoveChild', {
        component: c,
        index: util.indexOf(c, this.get('children')),
        destroy: destroy
      });
    },
    removeChildren: function (destroy) {
      var self = this, i, t = [].concat(self.get('children'));
      for (i = 0; i < t.length; i++) {
        self.removeChild(t[i], false);
      }
      if (destroy !== false && self.$el) {
        self.getChildrenContainerEl()[0].innerHTML = '';
      }
      return self;
    },
    getChildAt: function (index) {
      var children = this.get('children');
      return children[index] || null;
    },
    getChildrenContainerEl: function () {
      return this.$el;
    },
    destructor: function (destroy) {
      this.removeChildren(destroy);
    }
  }, {
    ATTRS: {
      children: {
        valueFn: function () {
          return [];
        },
        getter: function (v) {
          var defaultChildCfg = null, i, c, self = this;
          for (i = 0; i < v.length; i++) {
            c = v[i];
            if (!c.isControl && !c.isNode) {
              defaultChildCfg = defaultChildCfg || self.get('defaultChildCfg');
              util.mix(c, defaultChildCfg, false);
              v[i] = this.createComponent(c);
            }
          }
          return v;
        },
        setter: function (v) {
          var i, c;
          for (i = 0; i < v.length; i++) {
            c = v[i];
            if (c.isControl) {
              c.setInternal('parent', this);
            }
          }
        }
      },
      defaultChildCfg: {
        valueFn: function () {
          return {};
        }
      }
    },
    name: 'container'
  });
  return exports;
}();
module.exports = componentContainer;
});