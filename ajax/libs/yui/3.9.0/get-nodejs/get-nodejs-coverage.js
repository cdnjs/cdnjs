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
_yuitest_coverage["build/get-nodejs/get-nodejs.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/get-nodejs/get-nodejs.js",
    code: []
};
_yuitest_coverage["build/get-nodejs/get-nodejs.js"].code=["YUI.add('get', function (Y, NAME) {","","    /**","    * NodeJS specific Get module used to load remote resources.","    * It contains the same signature as the default Get module so there is no code change needed.","    * @module get-nodejs","    * @class GetNodeJS","    */","","    var Module = require('module'),","","        path = require('path'),","        fs = require('fs'),","        request = require('request'),","        end = function(cb, msg, result) {","            if (Y.Lang.isFunction(cb.onEnd)) {","                cb.onEnd.call(Y, msg, result);","            }","        }, pass = function(cb) {","            if (Y.Lang.isFunction(cb.onSuccess)) {","                cb.onSuccess.call(Y, cb);","            }","            end(cb, 'success', 'success');","        }, fail = function(cb, er) {","            er.errors = [er];","            if (Y.Lang.isFunction(cb.onFailure)) {","                cb.onFailure.call(Y, er, cb);","            }","            end(cb, er, 'fail');","        };","","","    Y.Get = function() {","    };","","    //Setup the default config base path","    Y.config.base = path.join(__dirname, '../');","","    YUI.require = require;","    YUI.process = process;","","    /**","    * Takes the raw JS files and wraps them to be executed in the YUI context so they can be loaded","    * into the YUI object","    * @method _exec","    * @private","    * @param {String} data The JS to execute","    * @param {String} url The path to the file that was parsed","    * @param {Callback} cb The callback to execute when this is completed","    * @param {Error} cb.err=null Error object","    * @param {String} cb.url The URL that was just parsed","    */","","    Y.Get._exec = function(data, url, cb) {","        if (data.charCodeAt(0) === 0xFEFF) {","            data = data.slice(1);","        }","","        var mod = new Module(url, module);","        mod.filename = url;","        mod.paths = Module._nodeModulePaths(path.dirname(url));","        if (typeof YUI._getLoadHook === 'function') {","            data = YUI._getLoadHook(data, url);","        }","        mod._compile('module.exports = function (YUI) {' + data + '\\n;return YUI;};', url);","","        /*global YUI:true */","        YUI = mod.exports(YUI);","","        mod.loaded = true;","","        cb(null, url);","    };","","    /**","    * Fetches the content from a remote URL or a file from disc and passes the content","    * off to `_exec` for parsing","    * @method _include","    * @private","    * @param {String} url The URL/File path to fetch the content from","    * @param {Callback} cb The callback to fire once the content has been executed via `_exec`","    */","    Y.Get._include = function (url, cb) {","        var cfg,","            mod,","            self = this;","","        if (url.match(/^https?:\\/\\//)) {","            cfg = {","                url: url,","                timeout: self.timeout","            };","            request(cfg, function (err, response, body) {","                if (err) {","                    cb(err, url);","                } else {","                    Y.Get._exec(body, url, cb);","                }","            });","        } else {","            try {","                // Try to resolve paths relative to the module that required yui.","                url = Module._findPath(url, Module._resolveLookupPaths(url, module.parent.parent)[1]);","","                if (Y.config.useSync) {","                    //Needs to be in useSync","                    mod = fs.readFileSync(url,'utf8');","                } else {","                    fs.readFile(url, 'utf8', function (err, mod) {","                        if (err) {","                            cb(err, url);","                        } else {","                            Y.Get._exec(mod, url, cb);","                        }","                    });","                    return;","                }","            } catch (err) {","                cb(err, url);","                return;","            }","","            Y.Get._exec(mod, url, cb);","        }","    };","","","    /**","    * Override for Get.script for loading local or remote YUI modules.","    * @method js","    * @param {Array|String} s The URL's to load into this context","    * @param {Object} options Transaction options","    */","    Y.Get.js = function(s, options) {","        var urls = Y.Array(s), url, i, l = urls.length, c= 0,","            check = function() {","                if (c === l) {","                    pass(options);","                }","            };","","","        /*jshint loopfunc: true */","        for (i=0; i<l; i++) {","            url = urls[i];","            if (Y.Lang.isObject(url)) {","                url = url.url;","            }","","            url = url.replace(/'/g, '%27');","            Y.Get._include(url, function(err, url) {","                if (!Y.config) {","                    Y.config = {","                        debug: true","                    };","                }","                if (options.onProgress) {","                    options.onProgress.call(options.context || Y, url);","                }","                if (err) {","                    fail(options, err);","                } else {","                    c++;","                    check();","                }","            });","        }","        ","        //Keeping Signature in the browser.","        return {","            execute: function() {}","        };","    };","","    /**","    * Alias for `Y.Get.js`","    * @method script","    */","    Y.Get.script = Y.Get.js;","","    //Place holder for SS Dom access","    Y.Get.css = function(s, cb) {","        pass(cb);","    };","","","","}, '@VERSION@');"];
_yuitest_coverage["build/get-nodejs/get-nodejs.js"].lines = {"1":0,"10":0,"16":0,"17":0,"20":0,"21":0,"23":0,"25":0,"26":0,"27":0,"29":0,"33":0,"37":0,"39":0,"40":0,"54":0,"55":0,"56":0,"59":0,"60":0,"61":0,"62":0,"63":0,"65":0,"68":0,"70":0,"72":0,"83":0,"84":0,"88":0,"89":0,"93":0,"94":0,"95":0,"97":0,"101":0,"103":0,"105":0,"107":0,"109":0,"110":0,"111":0,"113":0,"116":0,"119":0,"120":0,"123":0,"134":0,"135":0,"137":0,"138":0,"144":0,"145":0,"146":0,"147":0,"150":0,"151":0,"152":0,"153":0,"157":0,"158":0,"160":0,"161":0,"163":0,"164":0,"170":0,"179":0,"182":0,"183":0};
_yuitest_coverage["build/get-nodejs/get-nodejs.js"].functions = {"end:15":0,"pass:19":0,"fail:24":0,"_exec:54":0,"(anonymous 2):93":0,"(anonymous 3):109":0,"_include:83":0,"check:136":0,"(anonymous 4):151":0,"js:134":0,"css:182":0,"(anonymous 1):1":0};
_yuitest_coverage["build/get-nodejs/get-nodejs.js"].coveredLines = 69;
_yuitest_coverage["build/get-nodejs/get-nodejs.js"].coveredFunctions = 12;
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 1);
YUI.add('get', function (Y, NAME) {

    /**
    * NodeJS specific Get module used to load remote resources.
    * It contains the same signature as the default Get module so there is no code change needed.
    * @module get-nodejs
    * @class GetNodeJS
    */

    _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "(anonymous 1)", 1);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 10);
var Module = require('module'),

        path = require('path'),
        fs = require('fs'),
        request = require('request'),
        end = function(cb, msg, result) {
            _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "end", 15);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 16);
if (Y.Lang.isFunction(cb.onEnd)) {
                _yuitest_coverline("build/get-nodejs/get-nodejs.js", 17);
cb.onEnd.call(Y, msg, result);
            }
        }, pass = function(cb) {
            _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "pass", 19);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 20);
if (Y.Lang.isFunction(cb.onSuccess)) {
                _yuitest_coverline("build/get-nodejs/get-nodejs.js", 21);
cb.onSuccess.call(Y, cb);
            }
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 23);
end(cb, 'success', 'success');
        }, fail = function(cb, er) {
            _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "fail", 24);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 25);
er.errors = [er];
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 26);
if (Y.Lang.isFunction(cb.onFailure)) {
                _yuitest_coverline("build/get-nodejs/get-nodejs.js", 27);
cb.onFailure.call(Y, er, cb);
            }
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 29);
end(cb, er, 'fail');
        };


    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 33);
Y.Get = function() {
    };

    //Setup the default config base path
    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 37);
Y.config.base = path.join(__dirname, '../');

    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 39);
YUI.require = require;
    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 40);
YUI.process = process;

    /**
    * Takes the raw JS files and wraps them to be executed in the YUI context so they can be loaded
    * into the YUI object
    * @method _exec
    * @private
    * @param {String} data The JS to execute
    * @param {String} url The path to the file that was parsed
    * @param {Callback} cb The callback to execute when this is completed
    * @param {Error} cb.err=null Error object
    * @param {String} cb.url The URL that was just parsed
    */

    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 54);
Y.Get._exec = function(data, url, cb) {
        _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "_exec", 54);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 55);
if (data.charCodeAt(0) === 0xFEFF) {
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 56);
data = data.slice(1);
        }

        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 59);
var mod = new Module(url, module);
        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 60);
mod.filename = url;
        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 61);
mod.paths = Module._nodeModulePaths(path.dirname(url));
        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 62);
if (typeof YUI._getLoadHook === 'function') {
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 63);
data = YUI._getLoadHook(data, url);
        }
        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 65);
mod._compile('module.exports = function (YUI) {' + data + '\n;return YUI;};', url);

        /*global YUI:true */
        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 68);
YUI = mod.exports(YUI);

        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 70);
mod.loaded = true;

        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 72);
cb(null, url);
    };

    /**
    * Fetches the content from a remote URL or a file from disc and passes the content
    * off to `_exec` for parsing
    * @method _include
    * @private
    * @param {String} url The URL/File path to fetch the content from
    * @param {Callback} cb The callback to fire once the content has been executed via `_exec`
    */
    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 83);
Y.Get._include = function (url, cb) {
        _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "_include", 83);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 84);
var cfg,
            mod,
            self = this;

        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 88);
if (url.match(/^https?:\/\//)) {
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 89);
cfg = {
                url: url,
                timeout: self.timeout
            };
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 93);
request(cfg, function (err, response, body) {
                _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "(anonymous 2)", 93);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 94);
if (err) {
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 95);
cb(err, url);
                } else {
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 97);
Y.Get._exec(body, url, cb);
                }
            });
        } else {
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 101);
try {
                // Try to resolve paths relative to the module that required yui.
                _yuitest_coverline("build/get-nodejs/get-nodejs.js", 103);
url = Module._findPath(url, Module._resolveLookupPaths(url, module.parent.parent)[1]);

                _yuitest_coverline("build/get-nodejs/get-nodejs.js", 105);
if (Y.config.useSync) {
                    //Needs to be in useSync
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 107);
mod = fs.readFileSync(url,'utf8');
                } else {
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 109);
fs.readFile(url, 'utf8', function (err, mod) {
                        _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "(anonymous 3)", 109);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 110);
if (err) {
                            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 111);
cb(err, url);
                        } else {
                            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 113);
Y.Get._exec(mod, url, cb);
                        }
                    });
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 116);
return;
                }
            } catch (err) {
                _yuitest_coverline("build/get-nodejs/get-nodejs.js", 119);
cb(err, url);
                _yuitest_coverline("build/get-nodejs/get-nodejs.js", 120);
return;
            }

            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 123);
Y.Get._exec(mod, url, cb);
        }
    };


    /**
    * Override for Get.script for loading local or remote YUI modules.
    * @method js
    * @param {Array|String} s The URL's to load into this context
    * @param {Object} options Transaction options
    */
    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 134);
Y.Get.js = function(s, options) {
        _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "js", 134);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 135);
var urls = Y.Array(s), url, i, l = urls.length, c= 0,
            check = function() {
                _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "check", 136);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 137);
if (c === l) {
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 138);
pass(options);
                }
            };


        /*jshint loopfunc: true */
        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 144);
for (i=0; i<l; i++) {
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 145);
url = urls[i];
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 146);
if (Y.Lang.isObject(url)) {
                _yuitest_coverline("build/get-nodejs/get-nodejs.js", 147);
url = url.url;
            }

            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 150);
url = url.replace(/'/g, '%27');
            _yuitest_coverline("build/get-nodejs/get-nodejs.js", 151);
Y.Get._include(url, function(err, url) {
                _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "(anonymous 4)", 151);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 152);
if (!Y.config) {
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 153);
Y.config = {
                        debug: true
                    };
                }
                _yuitest_coverline("build/get-nodejs/get-nodejs.js", 157);
if (options.onProgress) {
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 158);
options.onProgress.call(options.context || Y, url);
                }
                _yuitest_coverline("build/get-nodejs/get-nodejs.js", 160);
if (err) {
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 161);
fail(options, err);
                } else {
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 163);
c++;
                    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 164);
check();
                }
            });
        }
        
        //Keeping Signature in the browser.
        _yuitest_coverline("build/get-nodejs/get-nodejs.js", 170);
return {
            execute: function() {}
        };
    };

    /**
    * Alias for `Y.Get.js`
    * @method script
    */
    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 179);
Y.Get.script = Y.Get.js;

    //Place holder for SS Dom access
    _yuitest_coverline("build/get-nodejs/get-nodejs.js", 182);
Y.Get.css = function(s, cb) {
        _yuitest_coverfunc("build/get-nodejs/get-nodejs.js", "css", 182);
_yuitest_coverline("build/get-nodejs/get-nodejs.js", 183);
pass(cb);
    };



}, '@VERSION@');
