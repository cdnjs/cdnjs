/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/anim-xy/anim-xy.js']) {
   __coverage__['build/anim-xy/anim-xy.js'] = {"path":"build/anim-xy/anim-xy.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0},"b":{},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":19},"end":{"line":1,"column":38}}},"2":{"name":"(anonymous_2)","line":13,"loc":{"start":{"line":13,"column":9},"end":{"line":13,"column":62}}},"3":{"name":"(anonymous_3)","line":19,"loc":{"start":{"line":19,"column":9},"end":{"line":19,"column":24}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":26,"column":57}},"2":{"start":{"line":10,"column":0},"end":{"line":10,"column":17}},"3":{"start":{"line":12,"column":0},"end":{"line":22,"column":2}},"4":{"start":{"line":14,"column":8},"end":{"line":17,"column":11}},"5":{"start":{"line":20,"column":8},"end":{"line":20,"column":34}}},"branchMap":{},"code":["(function () { YUI.add('anim-xy', function (Y, NAME) {","","/**"," * Adds support for the <code>xy</code> property in <code>from</code> and"," * <code>to</code> attributes."," * @module anim"," * @submodule anim-xy"," */","","var NUM = Number;","","Y.Anim.behaviors.xy = {","    set: function(anim, att, from, to, elapsed, duration, fn) {","        anim._node.setXY([","            fn(elapsed, NUM(from[0]), NUM(to[0]) - NUM(from[0]), duration),","            fn(elapsed, NUM(from[1]), NUM(to[1]) - NUM(from[1]), duration)","        ]);","    },","    get: function(anim) {","        return anim._node.getXY();","    }","};","","","","}, '3.17.2', {\"requires\": [\"anim-base\", \"node-screen\"]});","","}());"]};
}
var __cov_vcW0xg39Nuqj8fkBcEjsLQ = __coverage__['build/anim-xy/anim-xy.js'];
__cov_vcW0xg39Nuqj8fkBcEjsLQ.s['1']++;YUI.add('anim-xy',function(Y,NAME){__cov_vcW0xg39Nuqj8fkBcEjsLQ.f['1']++;__cov_vcW0xg39Nuqj8fkBcEjsLQ.s['2']++;var NUM=Number;__cov_vcW0xg39Nuqj8fkBcEjsLQ.s['3']++;Y.Anim.behaviors.xy={set:function(anim,att,from,to,elapsed,duration,fn){__cov_vcW0xg39Nuqj8fkBcEjsLQ.f['2']++;__cov_vcW0xg39Nuqj8fkBcEjsLQ.s['4']++;anim._node.setXY([fn(elapsed,NUM(from[0]),NUM(to[0])-NUM(from[0]),duration),fn(elapsed,NUM(from[1]),NUM(to[1])-NUM(from[1]),duration)]);},get:function(anim){__cov_vcW0xg39Nuqj8fkBcEjsLQ.f['3']++;__cov_vcW0xg39Nuqj8fkBcEjsLQ.s['5']++;return anim._node.getXY();}};},'3.17.2',{'requires':['anim-base','node-screen']});
