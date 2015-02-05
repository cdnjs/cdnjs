/*
YUI 3.17.0 (build ce55cc9)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/json-parse/json-parse.js']) {
   __coverage__['build/json-parse/json-parse.js'] = {"path":"build/json-parse/json-parse.js","s":{"1":0,"2":0,"3":0,"4":0},"b":{"1":[0,0]},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":22},"end":{"line":1,"column":41}}},"2":{"name":"(anonymous_2)","line":5,"loc":{"start":{"line":5,"column":28},"end":{"line":5,"column":59}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":10,"column":41}},"2":{"start":{"line":3,"column":0},"end":{"line":3,"column":33}},"3":{"start":{"line":5,"column":0},"end":{"line":7,"column":2}},"4":{"start":{"line":6,"column":4},"end":{"line":6,"column":83}}},"branchMap":{"1":{"line":6,"type":"cond-expr","locations":[{"start":{"line":6,"column":50},"end":{"line":6,"column":53}},{"start":{"line":6,"column":56},"end":{"line":6,"column":64}}]}},"code":["(function () { YUI.add('json-parse', function (Y, NAME) {","","var _JSON = Y.config.global.JSON;","","Y.namespace('JSON').parse = function (obj, reviver, space) {","    return _JSON.parse((typeof obj === 'string' ? obj : obj + ''), reviver, space);","};","","","}, '3.17.0', {\"requires\": [\"yui-base\"]});","","}());"]};
}
var __cov_kCOAyx1X9C_IiHRZgZRBPg = __coverage__['build/json-parse/json-parse.js'];
__cov_kCOAyx1X9C_IiHRZgZRBPg.s['1']++;YUI.add('json-parse',function(Y,NAME){__cov_kCOAyx1X9C_IiHRZgZRBPg.f['1']++;__cov_kCOAyx1X9C_IiHRZgZRBPg.s['2']++;var _JSON=Y.config.global.JSON;__cov_kCOAyx1X9C_IiHRZgZRBPg.s['3']++;Y.namespace('JSON').parse=function(obj,reviver,space){__cov_kCOAyx1X9C_IiHRZgZRBPg.f['2']++;__cov_kCOAyx1X9C_IiHRZgZRBPg.s['4']++;return _JSON.parse(typeof obj==='string'?(__cov_kCOAyx1X9C_IiHRZgZRBPg.b['1'][0]++,obj):(__cov_kCOAyx1X9C_IiHRZgZRBPg.b['1'][1]++,obj+''),reviver,space);};},'3.17.0',{'requires':['yui-base']});
