/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("paginator-url",function(e,t){function n(){}n.ATTRS={pageUrl:{}},n.prototype={prevPageUrl:function(){return this.hasPrevPage()&&this.formatPageUrl(this.get("page")-1)||null},nextPageUrl:function(){return this.hasNextPage()&&this.formatPageUrl(this.get("page")+1)||null},formatPageUrl:function(t){var n=this.get("pageUrl");return n?e.Lang.sub(n,{page:t||this.get("page")}):null}},e.namespace("Paginator").Url=n,e.Base.mix(e.Paginator,[n])},"3.15.0",{requires:["paginator"]});
