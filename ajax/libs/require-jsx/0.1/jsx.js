define(['JSXTransformer'], function (JSXTransformer) {
    'use strict';
    
    var fs, getXhr,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        fetchText = function () {
            throw new Error('Environment unsupported.');
        },
        buildMap = {};
 
    if (typeof process !== "undefined" &&
               process.versions &&
               !!process.versions.node) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');
        fetchText = function (path, callback) {
            callback(fs.readFileSync(path, 'utf8'));
        };
    } else {
        getXhr = function () {
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            if (!xhr) {
                throw new Error("getXhr(): XMLHttpRequest not available");
            }

            return xhr;
        };

        fetchText = function (url, callback) {
            var xhr = getXhr();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function (evt) {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            };
            xhr.send(null);
        };
    }
    
    return {
        write: function (pluginName, name, write) {
            if (buildMap.hasOwnProperty(name)) {
                var text = buildMap[name];
                write.asModule(pluginName + "!" + name, text);
            }
        },
 
        version: '0.1',
 
        load: function (name, parentRequire, load, config) {
            var path = parentRequire.toUrl(/\.(js)$/.test(name) ? name : name + '.js');
            fetchText(path, function (text) {
                try {
                    if (-1 === text.indexOf('React.DOM')) {
                        text =
                          '/**' + "\n"
                          + ' * @jsx React.DOM' + "\n"
                          + ' */' + "\n"
                          + text;
                    }
                    
                    text = JSXTransformer.transform(text).code;
                } catch (err) {
                    err.message = "In " + path + ", " + err.message;
                    throw err;
                }
 
                load.fromText(text);
            });
        }
    };
});
