/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/scrollview/scrollview.js']) {
   __coverage__['build/scrollview/scrollview.js'] = {"path":"build/scrollview/scrollview.js","s":{"1":0,"2":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":22},"end":{"line":1,"column":41}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":21,"column":73}},"2":{"start":{"line":18,"column":0},"end":{"line":18,"column":57}}},"branchMap":{},"code":["(function () { YUI.add('scrollview', function (Y, NAME) {","","/**"," * <p>"," * The scrollview module does not add any new classes. It simply plugs the ScrollViewScrollbars plugin into the"," *  base ScrollView class implementation provided by the scrollview-base module, so that all scrollview instances"," *  have scrollbars enabled."," * </p>"," *"," * <ul>"," *     <li><a href=\"../classes/ScrollView.html\">ScrollView API documentation</a></li>"," *     <li><a href=\"scrollview-base.html\">scrollview-base Module documentation</a></li>"," * </ul>"," *"," * @module scrollview"," */","","Y.Base.plug(Y.ScrollView, Y.Plugin.ScrollViewScrollbars);","","","}, '3.15.0', {\"requires\": [\"scrollview-base\", \"scrollview-scrollbars\"]});","","}());"]};
}
var __cov_8Cr3iTxZe95VDY3sT56igw = __coverage__['build/scrollview/scrollview.js'];
__cov_8Cr3iTxZe95VDY3sT56igw.s['1']++;YUI.add('scrollview',function(Y,NAME){__cov_8Cr3iTxZe95VDY3sT56igw.f['1']++;__cov_8Cr3iTxZe95VDY3sT56igw.s['2']++;Y.Base.plug(Y.ScrollView,Y.Plugin.ScrollViewScrollbars);},'3.15.0',{'requires':['scrollview-base','scrollview-scrollbars']});
