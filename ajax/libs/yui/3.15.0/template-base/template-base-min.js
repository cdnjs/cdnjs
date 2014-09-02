/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("template-base",function(e,t){function n(t,n){this.defaults=n,this.engine=t||e.Template.Micro,this.engine||e.error("No template engine loaded.")}n._registry={},n.register=function(e,t){return n._registry[e]=t,t},n.get=function(e){return n._registry[e]},n.render=function(t,r,i){var s=n._registry[t],o="";return s?o=s(r,i):e.error('Unregistered template: "'+t+'"'),o},n.prototype={compile:function(t,n){return n=n?e.merge(this.defaults,n):this.defaults,this.engine.compile(t,n)},precompile:function(t,n){return n=n?e.merge(this.defaults,n):this.defaults,this.engine.precompile(t,n)},render:function(t,n,r){return r=r?e.merge(this.defaults,r):this.defaults,this.engine.render?this.engine.render(t,n,r):this.engine.compile(t,r)(n,r)},revive:function(t,n){return n=n?e.merge(this.defaults,n):this.defaults,this.engine.revive?this.engine.revive(t,n):t}},e.Template=e.Template?e.mix(n,e.Template):n},"3.15.0",{requires:["yui-base"]});
