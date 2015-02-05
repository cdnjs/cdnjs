if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/yql-jsonp/yql-jsonp.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/yql-jsonp/yql-jsonp.js",
    code: []
};
_yuitest_coverage["build/yql-jsonp/yql-jsonp.js"].code=["YUI.add('yql-jsonp', function (Y, NAME) {","","/**","* Plugin for YQL to use JSONP to make YQL requests. This is the default method,","* when loaded in nodejs or winjs this will not load. The new module is needed","* to make sure that JSONP is not loaded in the environments that it is not needed.","* @module yql","* @submodule yql-jsonp","*/","","//Over writes Y.YQLRequest._send to use IO instead of JSONP","Y.YQLRequest.prototype._send = function (url, o) {","    if (o.allowCache !== false) {","        o.allowCache = true;","    }","    if (!this._jsonp) {","        this._jsonp = Y.jsonp(url, o);","    } else {","        this._jsonp.url = url;","        if (o.on && o.on.success) {","            this._jsonp._config.on.success = o.on.success;","        }","        this._jsonp.send();","    }","};","","","","}, '@VERSION@', {\"requires\": [\"jsonp\", \"jsonp-url\"]});"];
_yuitest_coverage["build/yql-jsonp/yql-jsonp.js"].lines = {"1":0,"12":0,"13":0,"14":0,"16":0,"17":0,"19":0,"20":0,"21":0,"23":0};
_yuitest_coverage["build/yql-jsonp/yql-jsonp.js"].functions = {"_send:12":0,"(anonymous 1):1":0};
_yuitest_coverage["build/yql-jsonp/yql-jsonp.js"].coveredLines = 10;
_yuitest_coverage["build/yql-jsonp/yql-jsonp.js"].coveredFunctions = 2;
_yuitest_coverline("build/yql-jsonp/yql-jsonp.js", 1);
YUI.add('yql-jsonp', function (Y, NAME) {

/**
* Plugin for YQL to use JSONP to make YQL requests. This is the default method,
* when loaded in nodejs or winjs this will not load. The new module is needed
* to make sure that JSONP is not loaded in the environments that it is not needed.
* @module yql
* @submodule yql-jsonp
*/

//Over writes Y.YQLRequest._send to use IO instead of JSONP
_yuitest_coverfunc("build/yql-jsonp/yql-jsonp.js", "(anonymous 1)", 1);
_yuitest_coverline("build/yql-jsonp/yql-jsonp.js", 12);
Y.YQLRequest.prototype._send = function (url, o) {
    _yuitest_coverfunc("build/yql-jsonp/yql-jsonp.js", "_send", 12);
_yuitest_coverline("build/yql-jsonp/yql-jsonp.js", 13);
if (o.allowCache !== false) {
        _yuitest_coverline("build/yql-jsonp/yql-jsonp.js", 14);
o.allowCache = true;
    }
    _yuitest_coverline("build/yql-jsonp/yql-jsonp.js", 16);
if (!this._jsonp) {
        _yuitest_coverline("build/yql-jsonp/yql-jsonp.js", 17);
this._jsonp = Y.jsonp(url, o);
    } else {
        _yuitest_coverline("build/yql-jsonp/yql-jsonp.js", 19);
this._jsonp.url = url;
        _yuitest_coverline("build/yql-jsonp/yql-jsonp.js", 20);
if (o.on && o.on.success) {
            _yuitest_coverline("build/yql-jsonp/yql-jsonp.js", 21);
this._jsonp._config.on.success = o.on.success;
        }
        _yuitest_coverline("build/yql-jsonp/yql-jsonp.js", 23);
this._jsonp.send();
    }
};



}, '@VERSION@', {"requires": ["jsonp", "jsonp-url"]});
