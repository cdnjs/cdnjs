/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("view-node-map",function(e,t){function i(){}var n=e.namespace("View._buildCfg"),r={};n.aggregates||(n.aggregates=[]),n.aggregates.push("getByNode"),i.getByNode=function(t){var n;return e.one(t).ancestor(function(t){return(n=r[e.stamp(t,!0)])||!1},!0),n||null},i._instances=r,i.prototype={initializer:function(){r[e.stamp(this.get("container"))]=this},destructor:function(){var t=e.stamp(this.get("container"),!0);t in r&&delete r[t]}},e.View.NodeMap=i},"3.15.0",{requires:["view"]});
