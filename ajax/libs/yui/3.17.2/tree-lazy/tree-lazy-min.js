/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("tree-lazy",function(e,t){var n="beforeLoad",r="error",i="load";e.namespace("Plugin.Tree").Lazy=e.Base.create("lazyTreePlugin",e.Plugin.Base,[],{initializer:function(e){this._host=e.host,e.load&&(this.load=e.load),!this._host.openNode,this._published={},this._attachEvents()},load:function(e,t){t(new Error("Plugin.Tree.Lazy: Please provide a custom `load` method when instantiating this plugin."))},_attachEvents:function(){this.onHostEvent("open",this._onOpen)},_onOpen:function(e){var t=e.node;if(!t.canHaveChildren||t.state.loaded||t.state.loading)return;this._published[n]||(this._published[n]=this.publish(n,{defaultFn:this._defLoadingFn})),this.fire(n,{node:t})},_defLoadingFn:function(e){var t=e.node,n=this;t.state.loading=!0,this.load(t,function(e){delete t.state.loading;if(e){n.fire(r,{error:e,src:"load"});return}t.state.loaded=!0,n.fire(i,{node:t})})}},{NS:"lazy"})},"3.17.2",{requires:["base-pluginhost","plugin","tree"]});
