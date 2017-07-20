/*
Copyright 2014, modulex-tree@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 08:02:39 GMT
*/
modulex.add("tree", ["component/extension/delegate-children","event-dom/gesture/tap","util","xtemplate/runtime","component/container","node","component/extension/content-box"], function(require, exports, module) {
var componentExtensionDelegateChildren = require("component/extension/delegate-children");
var eventDomGestureTap = require("event-dom/gesture/tap");
var _util_ = require("util");
var xtemplateRuntime = require("xtemplate/runtime");
var componentContainer = require("component/container");
var node = require("node");
var componentExtensionContentBox = require("component/extension/content-box");
/*
combined modules:
tree
tree/control
tree/node
tree/xtpl/node-render
tree/xtpl/node
tree/tree-manager
tree/check-node
tree/check-tree
*/
var treeXtplNode, treeTreeManager, treeXtplNodeRender, treeNode, treeCheckNode, treeCheckTree, treeControl, _tree_;
treeXtplNode = function (exports) {
  /*compiled by xtemplate#3.3.1*/
  var ret = exports = function node(undefined) {
    var t;
    var t0;
    var t1;
    var t2;
    var t3;
    var t4;
    var t5;
    var t6;
    var t7;
    var t8;
    var t9;
    var tpl = this;
    var root = tpl.root;
    var buffer = tpl.buffer;
    var scope = tpl.scope;
    var runtime = tpl.runtime;
    var name = tpl.name;
    var pos = tpl.pos;
    var data = scope.data;
    var affix = scope.affix;
    var nativeCommands = root.nativeCommands;
    var utils = root.utils;
    var callFnUtil = utils['callFn'];
    var callCommandUtil = utils['callCommand'];
    var rangeCommand = nativeCommands['range'];
    var foreachCommand = nativeCommands['foreach'];
    var forinCommand = nativeCommands['forin'];
    var eachCommand = nativeCommands['each'];
    var withCommand = nativeCommands['with'];
    var ifCommand = nativeCommands['if'];
    var setCommand = nativeCommands['set'];
    var includeCommand = nativeCommands['include'];
    var parseCommand = nativeCommands['parse'];
    var extendCommand = nativeCommands['extend'];
    var blockCommand = nativeCommands['block'];
    var macroCommand = nativeCommands['macro'];
    var debuggerCommand = nativeCommands['debugger'];
    function func1(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n        ';
      pos.line = 3;
      var callRet2;
      callRet2 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['selected']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet2);
      buffer.data += '\r\n     ';
      return buffer;
    }
    function func5(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n    <div class="';
      pos.line = 9;
      var exp7 = 'checked';
      var id6 = (t = affix.checkState) !== undefined ? t : (t = data.checkState) !== undefined ? t : scope.resolveLooseUp(['checkState']);
      exp7 = 'checked' + id6;
      var callRet8;
      callRet8 = callFnUtil(tpl, scope, {
        escape: 1,
        params: [exp7]
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet8);
      buffer.data += ' ';
      var callRet9;
      callRet9 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['checked']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet9);
      buffer.data += '"></div>\r\n    ';
      return buffer;
    }
    function func15(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\nstyle="display:none"\r\n';
      return buffer;
    }
    buffer.data += '<div class="';
    var callRet0;
    callRet0 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['row']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '\r\n     ';
    pos.line = 2;
    pos.line = 2;
    var id3 = (t = affix.selected) !== undefined ? t : (t = data.selected) !== undefined ? t : scope.resolveLooseUp(['selected']);
    buffer = ifCommand.call(tpl, scope, {
      params: [id3],
      fn: func1
    }, buffer);
    buffer.data += '\r\n     ">\r\n    <div class="';
    pos.line = 6;
    var callRet4;
    callRet4 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['expand-icon']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet4);
    buffer.data += '">\r\n    </div>\r\n    ';
    pos.line = 8;
    pos.line = 8;
    var id10 = (t = affix.checkable) !== undefined ? t : (t = data.checkable) !== undefined ? t : scope.resolveLooseUp(['checkable']);
    buffer = ifCommand.call(tpl, scope, {
      params: [id10],
      fn: func5
    }, buffer);
    buffer.data += '\r\n    <div class="';
    pos.line = 11;
    var callRet11;
    callRet11 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['icon']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet11);
    buffer.data += '">\r\n\r\n    </div>\r\n    <div class="';
    pos.line = 14;
    var callRet12;
    callRet12 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet12);
    buffer.data += '">';
    var id13 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
    buffer = buffer.write(id13);
    buffer.data += '</div>\r\n</div>\r\n<div class="';
    pos.line = 16;
    var callRet14;
    callRet14 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['children']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet14);
    buffer.data += '"\r\n';
    pos.line = 17;
    var id16 = (t = affix.expanded) !== undefined ? t : (t = data.expanded) !== undefined ? t : scope.resolveLooseUp(['expanded']);
    buffer = ifCommand.call(tpl, scope, {
      params: [!id16],
      fn: func15
    }, buffer);
    buffer.data += '\r\n>\r\n</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
treeTreeManager = function (exports) {
  /**
   * @ignore
   * tree management utils
   * @author yiminghe@gmail.com
   */
  var DelegateChildrenExtension = componentExtensionDelegateChildren;
  var TapGesture = eventDomGestureTap;
  var util = _util_;
  /**
   * Manage tree node for tree root
   * @class KISSY.Tree.Manager
   */
  function TreeManager() {
  }
  TreeManager.ATTRS = {
    allowTextSelection: { value: true },
    focusable: { value: true },
    handleGestureEvents: { value: true },
    /**
     * Whether show root node.
     * Defaults to: true.
     * @cfg {Boolean} showRootNode
     */
    /**
     * @ignore
     */
    showRootNode: {
      value: true,
      render: 1
    },
    /**
     * Current selected tree node.
     * @property {KISSY.Tree.Node} selectedItem
     * @readonly
     */
    /**
     * @ignore
     */
    selectedItem: {}
  };
  util.augment(TreeManager, DelegateChildrenExtension, {
    isTree: 1,
    __bindUI: function () {
      var self = this, prefixCls = self.get('prefixCls'), delegateCls = prefixCls + 'tree-node';
      self.$el.delegate(TapGesture.TAP, '.' + delegateCls, self.handleChildrenEvents, self);
    },
    // 单选
    _onSetSelectedItem: function (n, ev) {
      // 仅用于排他性
      if (n && ev.prevVal) {
        ev.prevVal.set('selected', false, { data: { byPassSetTreeSelectedItem: 1 } });
      }
    },
    _onSetShowRootNode: function (v) {
      this.get('rowEl')[v ? 'show' : 'hide']();
    }
  });
  exports = TreeManager;
  return exports;
}();
treeXtplNodeRender = function (exports) {
  var tpl = treeXtplNode;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
treeNode = function (exports) {
  var Container = componentContainer;
  var util = _util_;
  var $ = node, KeyCode = node.Event.KeyCode;
  var SELECTED_CLS = 'selected', EXPAND_EL_CLS = 'expand-icon', COMMON_EXPAND_EL_CLS = 'expand-icon-{t}', EXPAND_ICON_EL_FILE_CLS = [COMMON_EXPAND_EL_CLS].join(' '), EXPAND_ICON_EL_FOLDER_EXPAND_CLS = [COMMON_EXPAND_EL_CLS + 'minus'].join(' '), EXPAND_ICON_EL_FOLDER_COLLAPSE_CLS = [COMMON_EXPAND_EL_CLS + 'plus'].join(' '), ICON_EL_FILE_CLS = ['file-icon'].join(' '), ICON_EL_FOLDER_EXPAND_CLS = ['expanded-folder-icon'].join(' '), ICON_EL_FOLDER_COLLAPSE_CLS = ['collapsed-folder-icon'].join(' '), ROW_EL_CLS = 'row', CHILDREN_CLS = 'children', CHILDREN_CLS_L = 'lchildren';
  var TreeNodeTpl = treeXtplNodeRender;
  var ContentBox = componentExtensionContentBox;
  exports = Container.extend([ContentBox], {
    beforeCreateDom: function (renderData) {
      util.mix(renderData.elAttrs, {
        role: 'tree-node',
        'aria-labelledby': 'ks-content' + renderData.id,
        'aria-expanded': renderData.expanded ? 'true' : 'false',
        'aria-selected': renderData.selected ? 'true' : 'false',
        'aria-level': renderData.depth,
        title: renderData.tooltip
      });
    },
    bindUI: function () {
      this.on('afterAddChild', onAddChild);
      this.on('afterRemoveChild', onRemoveChild);
      this.on('afterAddChild afterRemoveChild', syncAriaSetSize);
    },
    syncUI: function () {
      refreshCss(this);
      syncAriaSetSize.call(this, { target: this });
    },
    handleKeyDownInternal: function (e) {
      var self = this, processed = true, tree = self.get('tree'), expanded = self.get('expanded'), nodeToBeSelected, isLeaf = self.get('isLeaf'), children = self.get('children'), keyCode = e.keyCode;
      switch (keyCode) {
      case KeyCode.ENTER:
        return self.handleClickInternal(e);
      case KeyCode.HOME:
        nodeToBeSelected = tree;
        break;
      case KeyCode.END:
        nodeToBeSelected = getLastVisibleDescendant(tree);
        break;
      case KeyCode.UP:
        nodeToBeSelected = getPreviousVisibleNode(self);
        break;
      case KeyCode.DOWN:
        nodeToBeSelected = getNextVisibleNode(self);
        break;
      case KeyCode.LEFT:
        if (expanded && (children.length || isLeaf === false)) {
          self.set('expanded', false);
        } else {
          nodeToBeSelected = self.get('parent');
        }
        break;
      case KeyCode.RIGHT:
        if (children.length || isLeaf === false) {
          if (!expanded) {
            self.set('expanded', true);
          } else {
            nodeToBeSelected = children[0];
          }
        }
        break;
      default:
        processed = false;
        break;
      }
      if (nodeToBeSelected) {
        nodeToBeSelected.select();
      }
      return processed;
    },
    next: function () {
      var self = this, parent = self.get('parent'), siblings, index;
      if (!parent) {
        return null;
      }
      siblings = parent.get('children');
      index = util.indexOf(self, siblings);
      if (index === siblings.length - 1) {
        return null;
      }
      return siblings[index + 1];
    },
    prev: function () {
      var self = this, parent = self.get('parent'), siblings, index;
      if (!parent) {
        return null;
      }
      siblings = parent.get('children');
      index = util.indexOf(self, siblings);
      if (index === 0) {
        return null;
      }
      return siblings[index - 1];
    },
    select: function () {
      this.set('selected', true);
    },
    handleClickInternal: function (e) {
      e.stopPropagation();
      var self = this, target = $(e.target), expanded = self.get('expanded'), tree = self.get('tree');
      tree.focus();
      self.callSuper(e);
      if (target.equals(self.get('expandIconEl'))) {
        self.set('expanded', !expanded);
      } else {
        self.select();
        self.fire('click', { domEvent: e });
      }
      return true;
    },
    createChildren: function () {
      var self = this;
      self.renderChildren.apply(self, arguments);
      if (self === self.get('tree')) {
        updateSubTreeStatus(self, self, -1, 0);
      }
    },
    refreshCss: function (isNodeSingleOrLast, isNodeLeaf) {
      var self = this, iconEl = self.get('iconEl'), iconElCss, expandElCss, expandIconEl = self.get('expandIconEl'), childrenEl = self.getChildrenContainerEl();
      if (isNodeLeaf) {
        iconElCss = ICON_EL_FILE_CLS;
        expandElCss = EXPAND_ICON_EL_FILE_CLS;
      } else {
        var expanded = self.get('expanded');
        if (expanded) {
          iconElCss = ICON_EL_FOLDER_EXPAND_CLS;
          expandElCss = EXPAND_ICON_EL_FOLDER_EXPAND_CLS;
        } else {
          iconElCss = ICON_EL_FOLDER_COLLAPSE_CLS;
          expandElCss = EXPAND_ICON_EL_FOLDER_COLLAPSE_CLS;
        }
      }
      iconEl[0].className = self.getBaseCssClasses(iconElCss);
      expandIconEl[0].className = self.getBaseCssClasses([
        EXPAND_EL_CLS,
        util.substitute(expandElCss, { t: isNodeSingleOrLast ? 'l' : 't' })
      ]);
      childrenEl[0].className = self.getBaseCssClasses(isNodeSingleOrLast ? CHILDREN_CLS_L : CHILDREN_CLS);
    },
    _onSetDepth: function (v) {
      this.el.setAttribute('aria-level', v);
    },
    getChildrenContainerEl: function () {
      return this.get('childrenEl');
    },
    _onSetExpanded: function (v) {
      var self = this, childrenEl = self.getChildrenContainerEl();
      childrenEl[v ? 'show' : 'hide']();
      self.el.setAttribute('aria-expanded', v);
      refreshCss(self);
      self.fire(v ? 'expand' : 'collapse');
    },
    _onSetSelected: function (v, e) {
      var self = this, rowEl = self.get('rowEl');
      rowEl[v ? 'addClass' : 'removeClass'](self.getBaseCssClasses(SELECTED_CLS));
      self.el.setAttribute('aria-selected', v);
      var tree = this.get('tree');
      if (!(e && e.byPassSetTreeSelectedItem)) {
        tree.set('selectedItem', v ? this : null);
      }
    },
    expandAll: function () {
      var self = this;
      self.set('expanded', true);
      util.each(self.get('children'), function (c) {
        c.expandAll();
      });
    },
    collapseAll: function () {
      var self = this;
      self.set('expanded', false);
      util.each(self.get('children'), function (c) {
        c.collapseAll();
      });
    }
  }, {
    ATTRS: {
      allowTextSelection: { value: true },
      focusable: { value: false },
      handleGestureEvents: { value: false },
      contentTpl: { value: TreeNodeTpl },
      isLeaf: {
        render: 1,
        sync: 0,
        parse: function (el) {
          var self = this;
          if (el.hasClass(self.getBaseCssClass('leaf'))) {
            return true;
          } else if (el.hasClass(self.getBaseCssClass('folder'))) {
            return false;
          }
          return undefined;
        }
      },
      rowEl: {
        selector: function () {
          return '.' + this.getBaseCssClass(ROW_EL_CLS);
        }
      },
      childrenEl: {
        selector: function () {
          return '.' + this.getBaseCssClass(CHILDREN_CLS);
        }
      },
      expandIconEl: {
        selector: function () {
          return '.' + this.getBaseCssClass(EXPAND_EL_CLS);
        }
      },
      iconEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('icon');
        }
      },
      selected: {
        render: 1,
        sync: 0
      },
      expanded: {
        sync: 0,
        value: false,
        render: 1,
        parse: function () {
          return this.get('childrenEl').css('display') !== 'none';
        }
      },
      tooltip: {
        render: 1,
        sync: 0
      },
      tree: {
        getter: function () {
          var self = this, from = self;
          while (from && !from.isTree) {
            from = from.get('parent');
          }
          return from;
        }
      },
      depth: {
        render: 1,
        sync: 0
      },
      defaultChildCfg: {
        valueFn: function () {
          return { xclass: 'tree-node' };
        }
      }
    },
    xclass: 'tree-node'
  });
  function onAddChild(e) {
    var self = this;
    if (e.target === self) {
      updateSubTreeStatus(self, e.component, self.get('depth'), e.index);
    }
  }
  function onRemoveChild(e) {
    var self = this;
    if (e.target === self) {
      recursiveSetDepth(self.get('tree'), e.component);
      refreshCssForSelfAndChildren(self, e.index);
    }
  }
  function syncAriaSetSize(e) {
    var self = this;
    if (e.target === self) {
      self.el.setAttribute('aria-setsize', self.get('children').length);
    }
  }
  function isNodeSingleOrLast(self) {
    var parent = self.get('parent'), children = parent && parent.get('children'), lastChild = children && children[children.length - 1];
    return !lastChild || lastChild === self;
  }
  function isNodeLeaf(self) {
    var isLeaf = self.get('isLeaf');
    return !(isLeaf === false || isLeaf === undefined && self.get('children').length);
  }
  function getLastVisibleDescendant(self) {
    var children = self.get('children');
    if (!self.get('expanded') || !children.length) {
      return self;
    }
    return getLastVisibleDescendant(children[children.length - 1]);
  }
  function getPreviousVisibleNode(self) {
    var prev = self.prev();
    if (!prev) {
      prev = self.get('parent');
    } else {
      prev = getLastVisibleDescendant(prev);
    }
    return prev;
  }
  function getNextVisibleNode(self) {
    var children = self.get('children'), n, parent;
    if (self.get('expanded') && children.length) {
      return children[0];
    }
    n = self.next();
    parent = self;
    while (!n && (parent = parent.get('parent'))) {
      n = parent.next();
    }
    return n;
  }
  function refreshCss(self) {
    self.refreshCss(isNodeSingleOrLast(self), isNodeLeaf(self));
  }
  function updateSubTreeStatus(self, c, depth, index) {
    var tree = self.get('tree');
    if (tree) {
      recursiveSetDepth(tree, c, depth + 1);
      refreshCssForSelfAndChildren(self, index);
    }
  }
  function recursiveSetDepth(tree, c, setDepth) {
    if (setDepth !== undefined) {
      c.set('depth', setDepth);
    }
    util.each(c.get('children'), function (child) {
      if (typeof setDepth === 'number') {
        recursiveSetDepth(tree, child, setDepth + 1);
      } else {
        recursiveSetDepth(tree, child);
      }
    });
  }
  function refreshCssForSelfAndChildren(self, index) {
    refreshCss(self);
    index = Math.max(0, index - 1);
    var children = self.get('children'), c, len = children.length;
    for (; index < len; index++) {
      c = children[index];
      refreshCss(c);
      c.el.setAttribute('aria-posinset', index + 1);
    }
  }
  return exports;
}();
treeCheckNode = function (exports) {
  /**
   * @ignore
   * checkable tree node
   * @author yiminghe@gmail.com
   */
  var TreeNode = treeNode;
  var util = _util_;
  var $ = node, PARTIAL_CHECK = 2, CHECK = 1, EMPTY = 0;
  var CHECK_CLS = 'checked', ALL_STATES_CLS = 'checked0 checked1 checked2';
  /**
   * Checked tree node. xclass: 'check-tree-node'.
   * @class KISSY.Tree.CheckNode
   * @extends KISSY.Tree.Node
   */
  var CheckNode = TreeNode.extend({
    handleClickInternal: function (e) {
      var self = this, checkState, expanded = self.get('expanded'), expandIconEl = self.get('expandIconEl'), tree = self.get('tree'), target = $(e.target);
      // 需要通知 tree 获得焦点
      tree.focus();
      self.callSuper(e);
      // 点击在 +- 号，切换状态
      if (target.equals(expandIconEl)) {
        self.set('expanded', !expanded);
        return;
      }
      // 单击任何其他地方都切换 check 状态
      checkState = self.get('checkState');
      if (checkState === CHECK) {
        checkState = EMPTY;
      } else {
        checkState = CHECK;
      }
      self.set('checkState', checkState);
      return true;
    },
    _onSetCheckState: function (s) {
      var self = this, parent = self.get('parent'), checkCount, i, c, cState, cs;
      var checkCls = self.getBaseCssClasses(CHECK_CLS).split(/\s+/).join(s + ' ') + s, checkIconEl = self.get('checkIconEl');
      checkIconEl.removeClass(self.getBaseCssClasses(ALL_STATES_CLS)).addClass(checkCls);
      if (s === CHECK || s === EMPTY) {
        util.each(self.get('children'), function (c) {
          c.set('checkState', s);
        });
      }
      // 每次状态变化都通知 parent 沿链检查，一层层向上通知
      // 效率不高，但是结构清晰
      if (parent) {
        checkCount = 0;
        cs = parent.get('children');
        for (i = 0; i < cs.length; i++) {
          c = cs[i];
          cState = c.get('checkState');
          // 一个是部分选，父亲必定是部分选，立即结束
          if (cState === PARTIAL_CHECK) {
            parent.set('checkState', PARTIAL_CHECK);
            return;
          } else if (cState === CHECK) {
            checkCount++;
          }
        }
        // 儿子都没选，父亲也不选
        if (checkCount === 0) {
          parent.set('checkState', EMPTY);
        } else if (checkCount === cs.length) {
          // 儿子全都选了，父亲也全选
          parent.set('checkState', CHECK);
        } else {
          // 有的儿子选了，有的没选，父亲部分选
          parent.set('checkState', PARTIAL_CHECK);
        }
      }
    }
  }, {
    ATTRS: {
      checkIconEl: {
        selector: function () {
          return '.' + this.getBaseCssClass(CHECK_CLS);
        }
      },
      checkable: {
        value: true,
        render: 1,
        sync: 0
      },
      /**
       * Enums for check states.
       * CheckNode.PARTIAL_CHECK: checked partly.
       * CheckNode.CHECK: checked completely.
       * CheckNode.EMPTY: not checked.
       * @type {Number}
       */
      checkState: {
        // check 的三状态
        // 0 一个不选
        // 1 儿子有选择
        // 2 全部都选了
        value: 0,
        sync: 0,
        render: 1,
        parse: function () {
          var checkIconEl = this.get('checkIconEl');
          if (checkIconEl) {
            var allStates = ALL_STATES_CLS.split(/\s+/);
            for (var i = 0; i < allStates.length; i++) {
              if (checkIconEl.hasClass(this.getBaseCssClass(allStates[i]))) {
                return i;
              }
            }
          }
          return undefined;
        }
      },
      defaultChildCfg: {
        valueFn: function () {
          return { xclass: 'check-tree-node' };
        }
      }
    },
    xclass: 'check-tree-node'
  });
  /**
   * check node's check state enum
   * @enum {Number} KISSY.Tree.CheckNode.CheckState
   */
  CheckNode.CheckState = {
    /**
     * checked partly.
     */
    PARTIAL_CHECK: PARTIAL_CHECK,
    /**
     * checked completely.
     */
    CHECK: CHECK,
    /**
     * not checked at all.
     */
    EMPTY: EMPTY
  };
  exports = CheckNode;
  return exports;
}();
treeCheckTree = function (exports) {
  /**
   * @ignore
   * root node represent a check tree
   * @author yiminghe@gmail.com
   */
  var CheckNode = treeCheckNode;
  var TreeManager = treeTreeManager;
  /**
   * KISSY Checked Tree. xclass: 'check-tree'.
   * @extends KISSY.Tree.CheckNode
   * @class KISSY.Tree.CheckTree
   * @mixins {KISSY.Tree.Manager}
   */
  exports = CheckNode.extend([TreeManager], {
    handleKeyDownInternal: function (e) {
      var current = this.get('selectedItem');
      if (current === this) {
        return this.callSuper(e);
      }
      return current && current.handleKeyDownInternal(e);
    },
    _onSetFocused: function (v, e) {
      var self = this;
      self.callSuper(v, e);
      if (v && !self.get('selectedItem')) {
        self.select();
      }
    }
  }, {
    ATTRS: {
      defaultChildCfg: {
        valueFn: function () {
          return { xclass: 'check-tree-node' };
        }
      }
    },
    xclass: 'check-tree'
  });
  return exports;
}();
treeControl = function (exports) {
  var TreeNode = treeNode;
  var TreeManager = treeTreeManager;
  exports = TreeNode.extend([TreeManager], {
    handleKeyDownInternal: function (e) {
      var current = this.get('selectedItem');
      if (current === this) {
        return this.callSuper(e);
      }
      return current && current.handleKeyDownInternal(e);
    },
    _onSetFocused: function (v) {
      var self = this;
      self.callSuper(v);
      if (v && !self.get('selectedItem')) {
        self.select();
      }
    }
  }, {
    ATTRS: {
      defaultChildCfg: {
        valueFn: function () {
          return { xclass: 'tree-node' };
        }
      }
    },
    xclass: 'tree'
  });
  return exports;
}();
_tree_ = function (exports) {
  var Tree = treeControl;
  var TreeNode = treeNode;
  var CheckNode = treeCheckNode;
  var CheckTree = treeCheckTree;
  Tree.Node = TreeNode;
  Tree.CheckNode = CheckNode;
  Tree.CheckTree = CheckTree;
  exports = Tree;
  Tree.version = '1.0.1';
  return exports;
}();
module.exports = _tree_;
});