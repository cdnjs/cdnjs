YUI.add('get', function(Y) {

    /**
    * NodeJS specific Get module used to load remote resources. It contains the same signature as the default Get module so there is no code change needed.
    * @module get-nodejs
    * @class GetNodeJS
    */
        
    var path = require('path'),
        vm = require('vm'),
        fs = require('fs'),
        n_url = require('url'),
        http = require('http'),
        https = require('https');

    Y.Get = function() {};

    //Setup the default config base path
    Y.config.base = path.join(__dirname, '../');

    /**
    * Get the port number from a URL based on the port from the URL module or http(s)
    * @method urlInfoPort
    * @param {Object} urlInfo Info from `require('url').parse(url)`
    * @return {Number} The port number
    */
    Y.Get.urlInfoPort = function(urlInfo) {
        return urlInfo.port ? parseInt(urlInfo.port, 10) :
            urlInfo.protocol === 'http:' ? 80 : 443;
    };

    
    YUI.require = require;
    YUI.process = process;
    
    /**
    * Escape the path for Windows, they need to be double encoded when used as `__dirname` or `__filename`
    * @method escapeWinPath
    * @protected
    * @param {String} p The path to modify
    * @return {String} The encoded path
    */
    var escapeWinPath = function(p) {
        return p.replace(/\\/g, '\\\\');
    };

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

    Y.Get._exec = function(data, url, cb) {
        var dirName = escapeWinPath(path.dirname(url));
        var fileName = escapeWinPath(url);

        if (dirName.match(/^https?:\/\//)) {
            dirName = '.';
            fileName = 'remoteResource';
        }

        var mod = "(function(YUI) { var __dirname = '" + dirName + "'; "+
            "var __filename = '" + fileName + "'; " +
            "var process = YUI.process;" +
            "var require = function(file) {" +
            " if (file.indexOf('./') === 0) {" +
            "   file = __dirname + file.replace('./', '/'); }" +
            " return YUI.require(file); }; " +
            data + " ;return YUI; })";
    
        //var mod = "(function(YUI) { " + data + ";return YUI; })";
        var script = vm.createScript(mod, url);
        var fn = script.runInThisContext(mod);
        YUI = fn(YUI);
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
    Y.Get._include = function(url, cb) {
        if (url.match(/^https?:\/\//)) {
            var u = n_url.parse(url, parseQueryString=false),
                p = Y.Get.urlInfoPort(u),            
                req_url = u.pathname;

            if (u.search) {
                req_url += u.search;
            }            
            var h = http;
            if (p === 443 || u.protocol === 'https:') {
                h = https;
            }
            h.get({
                host: u.hostname,
                port: p,
                path: req_url
            }, function(res) {
                var mod = '';
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    mod += chunk;
                });
                res.on('end', function() {
                    Y.Get._exec(mod, url, cb);
                });
            });
        } else {
            if (Y.config.useSync) {
                //Needs to be in useSync
                var mod = fs.readFileSync(url,'utf8');
                Y.Get._exec(mod, url, cb);
            } else {
                fs.readFile(url, 'utf8', function(err, mod) {
                    Y.Get._exec(mod, url, cb);
                });
            }
        }
        
    };


    var end = function(cb, msg, result) {
        if (Y.Lang.isFunction(cb.onEnd)) {
            cb.onEnd.call(Y, msg, result);
        }
    }, pass = function(cb) {
        if (Y.Lang.isFunction(cb.onSuccess)) {
            cb.onSuccess.call(Y, cb);
        }
        end(cb, 'success', 'success');
    }, fail = function(cb, er) {
        if (Y.Lang.isFunction(cb.onFailure)) {
            cb.onFailure.call(Y, er, cb);
        }
        end(cb, er, 'fail');
    };


    /**
    * Override for Get.script for loading local or remote YUI modules.
    * @method script
    * @param {Array|String} s The URL's to load into this context
    * @param {Callback} cb The callback to execute once the transaction is complete.
    */
    Y.Get.script = function(s, cb) {
        var A = Y.Array,
            urls = A(s), url, i, l = urls.length, c= 0,
            check = function() {
                if (c === l) {
                    pass(cb);
                }
            };



        for (i=0; i<l; i++) {
            url = urls[i];

            url = url.replace(/'/g, '%27');
            // doesn't need to be blocking, so don't block.
            Y.Get._include(url, function(err, url) {
                if (!Y.config) {
                    Y.config = {
                        debug: true
                    };
                }
                if (err) {
                    if (err.stack) {
                        A.each(err.stack.split('\n'), function(frame) {
                        });
                    } else {
                        console.log(err);
                    }
                } else {
                    c++;
                    check();
                }
            });
        }
    };
    
    //Place holder for SS Dom access
    Y.Get.css = function(s, cb) {
        pass(cb);
    };



}, '@VERSION@' ,{requires:['yui-base']});
