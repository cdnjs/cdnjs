/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("tree-openable",function(e,t){function i(){}function s(){}var n="close",r="open";i.prototype={initializer:function(){this.nodeExtensions=this.nodeExtensions.concat(e.Tree.Node.Openable)},closeNode:function(e,t){return e.canHaveChildren&&e.isOpen()&&this._fireTreeEvent(n,{node:e,src:t&&t.src},{defaultFn:this._defCloseFn,silent:t&&t.silent}),this},openNode:function(e,t){return e.canHaveChildren&&!e.isOpen()&&this._fireTreeEvent(r,{node:e,src:t&&t.src},{defaultFn:this._defOpenFn,silent:t&&t.silent}),this},toggleOpenNode:function(e,t){return e.isOpen()?this.closeNode(e,t):this.openNode(e,t)},_defCloseFn:function(e){delete e.node.state.open},_defOpenFn:function(e){e.node.state.open=!0}},e.Tree.Openable=i,s.prototype={close:function(e){return this.tree.closeNode(this,e),this},isOpen:function(){return!!this.state.open||this.isRoot()},open:function(e){return this.tree.openNode(this,e),this},toggleOpen:function(e){return this.tree.toggleOpenNode(this,e),this}},e.Tree.Node.Openable=s},"3.17.2",{requires:["tree"]});
