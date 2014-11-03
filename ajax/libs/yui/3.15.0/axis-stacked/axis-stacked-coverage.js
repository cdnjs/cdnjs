/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/axis-stacked/axis-stacked.js']) {
   __coverage__['build/axis-stacked/axis-stacked.js'] = {"path":"build/axis-stacked/axis-stacked.js","s":{"1":0,"2":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":43}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":23,"column":66}},"2":{"start":{"line":19,"column":0},"end":{"line":19,"column":77}}},"branchMap":{},"code":["(function () { YUI.add('axis-stacked', function (Y, NAME) {","","/**"," * Provides functionality for drawing a stacked numeric axis for use with a chart."," *"," * @module charts"," * @submodule axis-stacked"," */","/**"," * StackedAxis draws a stacked numeric axis for a chart."," *"," * @class StackedAxis"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @extends NumericAxis"," * @uses StackedImpl"," * @submodule axis-stacked"," */","Y.StackedAxis = Y.Base.create(\"stackedAxis\", Y.NumericAxis, [Y.StackedImpl]);","","","","}, '3.15.0', {\"requires\": [\"axis-numeric\", \"axis-stacked-base\"]});","","}());"]};
}
var __cov_PBBzFuQXOKkl1sZvW2L$7w = __coverage__['build/axis-stacked/axis-stacked.js'];
__cov_PBBzFuQXOKkl1sZvW2L$7w.s['1']++;YUI.add('axis-stacked',function(Y,NAME){__cov_PBBzFuQXOKkl1sZvW2L$7w.f['1']++;__cov_PBBzFuQXOKkl1sZvW2L$7w.s['2']++;Y.StackedAxis=Y.Base.create('stackedAxis',Y.NumericAxis,[Y.StackedImpl]);},'3.15.0',{'requires':['axis-numeric','axis-stacked-base']});
