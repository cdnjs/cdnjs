/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("paginator-core",function(e,t){var n=e.namespace("Paginator").Core=function(){};n.ATTRS={page:{value:1},totalPages:{readOnly:!0,getter:"_getTotalPagesFn"},itemsPerPage:{value:10},totalItems:{value:0}},e.mix(n.prototype,{prevPage:function(){return this.hasPrevPage()&&this.set("page",this.get("page")-1),this},nextPage:function(){return this.hasNextPage()&&this.set("page",this.get("page")+1),this},hasPrevPage:function(){return this.get("page")>1},hasNextPage:function(){return!this.get("totalItems")||this.get("page")<this.get("totalPages")},_getTotalPagesFn:function(){var e=this.get("itemsPerPage");return e<1?1:Math.ceil(this.get("totalItems")/e)}})},"3.17.2",{requires:["base"]});
