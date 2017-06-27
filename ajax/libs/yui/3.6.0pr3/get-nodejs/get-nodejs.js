YUI.add('get-nodejs', function(Y) {

    /**
    * NodeJS specific Get module used to load remote resources. It contains the same signature as the default Get module so there is no code change needed.
    * Note: There is an added method called Get.domScript, which is the same as Get.script in a browser, it simply loads the script into the dom tree
    * so that you can call outerHTML on the document to print it to the screen.
    * @module get-nodejs
    */

        var path = require('path');

        Y.config.base = path.join(__dirname, '../');
        console.log(Y.config);

        YUI.add('get', function() { });
        
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

        Y.Get = function() {};

        /**
        * Override for Get.script for loading local or remote YUI modules.
        */
        Y.Get.script = function(s, cb) {
            var A = Y.Array,
                urls = A(s), url, i, l = urls.length;
            for (i=0; i<l; i++) {
                url = urls[i];

                url = url.replace(/'/g, '%27');
                // doesn't need to be blocking, so don't block.
                include(url, function(err) {
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
                        pass(cb);
                    }
                });
            }
        };


    
    var vm = require('vm'),
        fs = require('fs');


    var include = function(url, cb) {
        var mod = fs.readFileSync(url, 'utf8');
        var script = vm.createScript(mod, url);
        var box = {
            YUI: {
                add: function() {
                    console.log('YUI in the sandbox');
                    console.log(arguments);
                    YUI.apply(YUI, arguments);
                    cb();
                }
            }
        };
        script.runInNewContext(box);
        
    };



}, '@VERSION@' ,{requires:['yui-base']});
