/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/pjax-plugin/pjax-plugin.js']) {
   __coverage__['build/pjax-plugin/pjax-plugin.js'] = {"path":"build/pjax-plugin/pjax-plugin.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":23},"end":{"line":1,"column":42}}},"2":{"name":"(anonymous_2)","line":21,"loc":{"start":{"line":21,"column":17},"end":{"line":21,"column":35}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":29,"column":66}},"2":{"start":{"line":19,"column":0},"end":{"line":26,"column":3}},"3":{"start":{"line":22,"column":8},"end":{"line":22,"column":43}}},"branchMap":{},"code":["(function () { YUI.add('pjax-plugin', function (Y, NAME) {","","/**","Node plugin that provides seamless, gracefully degrading pjax functionality.","","@module pjax","@submodule pjax-plugin","@since 3.5.0","**/","","/**","Node plugin that provides seamless, gracefully degrading pjax functionality.","","@class Plugin.Pjax","@extends Pjax","@since 3.5.0","**/","","Y.Plugin.Pjax = Y.Base.create('pjaxPlugin', Y.Pjax, [Y.Plugin.Base], {","    // -- Lifecycle Methods ----------------------------------------------------","    initializer: function (config) {","        this.set('container', config.host);","    }","}, {","    NS: 'pjax'","});","","","}, '3.17.2', {\"requires\": [\"node-pluginhost\", \"pjax\", \"plugin\"]});","","}());"]};
}
var __cov_4Iw3vZgVfE4eBXwFeCq9cg = __coverage__['build/pjax-plugin/pjax-plugin.js'];
__cov_4Iw3vZgVfE4eBXwFeCq9cg.s['1']++;YUI.add('pjax-plugin',function(Y,NAME){__cov_4Iw3vZgVfE4eBXwFeCq9cg.f['1']++;__cov_4Iw3vZgVfE4eBXwFeCq9cg.s['2']++;Y.Plugin.Pjax=Y.Base.create('pjaxPlugin',Y.Pjax,[Y.Plugin.Base],{initializer:function(config){__cov_4Iw3vZgVfE4eBXwFeCq9cg.f['2']++;__cov_4Iw3vZgVfE4eBXwFeCq9cg.s['3']++;this.set('container',config.host);}},{NS:'pjax'});},'3.17.2',{'requires':['node-pluginhost','pjax','plugin']});
