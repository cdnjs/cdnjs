/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('get', function (Y, NAME) {

    /**
    * NodeJS specific Get module used to load remote resources.
    * It contains the same signature as the default Get module so there is no code change needed.
    * @module get-nodejs
    * @class GetNodeJS
    */

    var Module = require('module'),

        path = require('path'),
        fs = require('fs'),
        request = require('request'),
        end = function(cb, msg, result) {
            if (Y.Lang.isFunction(cb.onEnd)) {
                cb.onEnd.call(Y, msg, result);
            }
        }, pass = function(cb) {
            if (Y.Lang.isFunction(cb.onSuccess)) {
                cb.onSuccess.call(Y, cb);
            }
            end(cb, 'success', 'success');
        }, fail = function(cb, er) {
            er.errors = [er];
            if (Y.Lang.isFunction(cb.onFailure)) {
                cb.onFailure.call(Y, er, cb);
            }
            end(cb, er, 'fail');
        };


    Y.Get = function() {
    };

    //Setup the default config base path
    Y.config.base = path.join(__dirname, '../');

    YUI.require = require;
    YUI.process = process;

    /**
    * Takes the raw JS files and wraps them to be executed in the YUI context so they can be loaded
    * into the YUI object
    * @method _exec
    * @private
    * @param {String} data The JS to execute
    * @param {String} url The path to the file that was parsed
    * @param {Function} cb The callback to execute when this is completed
    * @param {Error} cb.err=null Error object
    * @param {String} cb.url The URL that was just parsed
    */

    Y.Get._exec = function(data, url, cb) {
        if (data.charCodeAt(0) === 0xFEFF) {
            data = data.slice(1);
        }

        var mod = new Module(url, module);
        mod.filename = url;
        mod.paths = Module._nodeModulePaths(path.dirname(url));
        if (typeof YUI._getLoadHook === 'function') {
            data = YUI._getLoadHook(data, url);
        }
        mod._compile('module.exports = function (YUI) {' +
            'return (function () {'+ data + '\n;return YUI;}).apply(global);' +
        '};', url);

        /*global YUI:true */
        YUI = mod.exports(YUI);

        mod.loaded = true;

        cb(null, url);
    };

    /**
    * Fetches the content from a remote URL or a file from disc and passes the content
    * off to `_exec` for parsing
    * @method _include
    * @private
    * @param {String} url The URL/File path to fetch the content from
    * @param {Function} cb The callback to fire once the content has been executed via `_exec`
    */
    Y.Get._include = function (url, cb) {
        var cfg,
            mod,
            self = this;

        if (url.match(/^https?:\/\//)) {
            cfg = {
                url: url,
                timeout: self.timeout
            };
            request(cfg, function (err, response, body) {
                if (err) {
                    cb(err, url);
                } else {
                    Y.Get._exec(body, url, cb);
                }
            });
        } else {
            try {
                // Try to resolve paths relative to the module that required yui.
                url = Module._findPath(url, Module._resolveLookupPaths(url, module.parent.parent)[1]);

                if (Y.config.useSync) {
                    //Needs to be in useSync
                    mod = fs.readFileSync(url,'utf8');
                } else {
                    fs.readFile(url, 'utf8', function (err, mod) {
                        if (err) {
                            cb(err, url);
                        } else {
                            Y.Get._exec(mod, url, cb);
                        }
                    });
                    return;
                }
            } catch (err) {
                cb(err, url);
                return;
            }

            Y.Get._exec(mod, url, cb);
        }
    };


    /**
    * Override for Get.script for loading local or remote YUI modules.
    * @method js
    * @param {Array|String} s The URL's to load into this context
    * @param {Object} options Transaction options
    */
    Y.Get.js = function(s, options) {
        var urls = Y.Array(s), url, i, l = urls.length, c= 0,
            check = function() {
                if (c === l) {
                    pass(options);
                }
            };


        /*jshint loopfunc: true */
        for (i=0; i<l; i++) {
            url = urls[i];
            if (Y.Lang.isObject(url)) {
                url = url.url;
            }

            url = url.replace(/'/g, '%27');
            Y.Get._include(url, function(err, url) {
                if (!Y.config) {
                    Y.config = {
                        debug: true
                    };
                }
                if (options.onProgress) {
                    options.onProgress.call(options.context || Y, url);
                }
                if (err) {
                    fail(options, err);
                } else {
                    c++;
                    check();
                }
            });
        }

        //Keeping Signature in the browser.
        return {
            execute: function() {}
        };
    };

    /**
    * Alias for `Y.Get.js`
    * @method script
    */
    Y.Get.script = Y.Get.js;

    //Place holder for SS Dom access
    Y.Get.css = function(s, cb) {
        pass(cb);
    };



}, '@VERSION@');
