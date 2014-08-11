/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("datatable-foot",function(e,t){e.namespace("DataTable").FooterView=e.Base.create("tableFooter",e.View,[],{TFOOT_TEMPLATE:'<tfoot class="{className}"/>',getClassName:function(){var t=this.host,n=t&&t.constructor.NAME||this.constructor.NAME;return t&&t.getClassName?t.getClassName.apply(t,arguments):e.ClassNameManager.getClassName.apply(e.ClassNameManager,[n].concat(e.Array(arguments,0,!0)))},render:function(){var e=this.tfootNode||(this.tfootNode=this._createTFootNode());return this.host&&this.host._theadNode&&this.host._theadNode.insert(e,"after"),this},_createTFootNode:function(){return e.Node.create(e.Lang.sub(this.TFOOT_TEMPLATE,{className:this.getClassName("foot")}))},initializer:function(e){this.host=e&&e.host}})},"3.15.0",{requires:["datatable-core","view"]});
