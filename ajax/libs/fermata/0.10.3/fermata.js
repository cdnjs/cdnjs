/*
Fermata: a succinct REST client.
Written by Nathan Vander Wilt (nate@calftrail.com).

Copyright © 2011 &yet, LLC.
Copyright © 2012–2013 Nathan Vander Wilt.

Released under the terms of the MIT License:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var Proxy;  // FEEEEL THE POWAH! FEEEEEEEEEEL IT!!!!

var fermata = {plugins:{}};

fermata.registerPlugin = function (name, plugin) {
    fermata.plugins[name] = plugin;
    fermata[name] = function () {
        var baseURL = {base:"", path:[""], query:{}},
            args = [name].concat([].slice.call(arguments)),
            transport = fermata._makeTransport.call(baseURL, "_base").using.apply(null, args);
        return fermata._makeNativeURL(transport, baseURL);
    };
    if (fermata._useExports) {
        exports[name] = fermata[name];
    }
};

fermata._makeTransport = function (name, args) {
    var baseURL = this, transport = fermata.plugins[name].apply(baseURL, args);
    transport.using = function () {
        var plugin = arguments[0];
        arguments[0] = transport;
        return fermata._makeTransport.call(baseURL, plugin, arguments);
    };
    return transport;
};

fermata._makeNativeURL = function (transport, url) {
    return fermata._wrapTheWrapper(function () {
        var args = [].slice.call(arguments),
            lastArg = fermata._typeof2(args[args.length-1]);
        if (lastArg === 'undefined') {
            return fermata._stringForURL(url);
        } else if (lastArg === 'function') {
            var callback = args.pop(),
                data = args.pop(),
                headers = fermata._normalize(args.pop() || {}),
                method = url.path.pop().toUpperCase();
            if (method === 'DEL') method = 'DELETE';
            return transport({base:url.base, method:method, path:url.path, query:url.query, headers:headers, data:data}, callback);
        } else {
            var query2 = (lastArg === 'object') ? fermata._extend(fermata._extend({}, url.query), args.pop()) : url.query,
                path2 = (args.length) ? url.path.concat(args) : url.path;
            return fermata._makeNativeURL(transport, {base:url.base, path:path2, query:query2});
        }
    });
};

fermata._wrapTheWrapper = function (impl) {
    return (Proxy || fermata._nodeProxy) ? (Proxy) ? Proxy.createFunction({
        // fundamental trap stubs - http://wiki.ecmascript.org/doku.php?id=harmony:proxies
        'getOwnPropertyDescriptor': function (name) {},
        'getPropertyDescriptor': function (name) {},
        'getPropertyNames': function () { return []; },
        'enumerate': function () { return []; },    // FF4 console likes this derived trap
        'defineProperty': function () { return false; },
        'delete': function () { return false; },
        'fix': function () {},
        
        'get': function (target, name) {
            return impl(name);
        }
    }, impl) : fermata._nodeProxy.createFunction({
        // NOTE: node-proxy has a different set of required handlers than harmony:proxies proposal
        'getOwnPropertyDescriptor': function (name) {},
        'enumerate': function () { return []; },
        'delete': function () { return false; },
        'fix': function () {},
        'set': function (target, name, val) {},
        
        'get': function (target, name) {
            return impl(name);
        }
    }, impl) : fermata._extend(impl, {
        'get': function () { return impl('get').apply(null, arguments); },
        'put': function () { return impl('put').apply(null, arguments); },
        'post': function () { return impl('post').apply(null, arguments); },
        'delete': function () { return impl('delete').apply(null, arguments); },
        'del': function () { return impl('del').apply(null, arguments); }
    });
};

fermata._nodeTransport = function (request, callback) {
    var url = fermata._stringForURL(request),
        url_parts = require('url').parse(url),
        headers = {},
        data = null, textResponse = true;
    
    if (url_parts.auth) {
        // TODO: this is a workaround for https://github.com/joyent/node/issues/2736 and should be removed or hardcoded per its resolution
        if (require('url').parse("http//either%2for@example").auth !== "either/or") {
            url_parts.auth = decodeURIComponent(url_parts.auth);
        }
        headers['Authorization'] = 'Basic ' + new Buffer(url_parts.auth).toString('base64');
    }
    fermata._extend(headers, request.headers);
    
    if (request.data && request.data.length && request.method === 'GET' || request.method === 'HEAD') {
        /* XHR ignores data on these requests, so we'll standardize on that behaviour to keep things consistent. Conveniently, this
           avoids https://github.com/joyent/node/issues/989 in situations like https://issues.apache.org/jira/browse/COUCHDB-1146 */
        if (console && console.warn) console.warn("Ignoring data passed to GET or HEAD request.");
    } else if (typeof(request.data) === 'string') {
        data = new Buffer(request.data, 'utf8');
        // TODO: follow XHR algorithm for charset replacement if Content-Type already set
        headers['Content-Type'] || (headers['Content-Type'] = "text/plain;charset=UTF-8");
    } else if (request.data) {
        textResponse = false;
        data = new Buffer(request.data);
    }
    
    var http = (url_parts.protocol === 'https:') ? require('https') : require('http');
    var req = http.request({
        host: url_parts.hostname,
        port: url_parts.port,
        method: request.method,
        path: url_parts.pathname + (url_parts.search || ''),
        headers: headers,
        agent: http.globalAgent         // HACK: allow users some control over connections via e.g. `require('https').globalAgent = new CustomAgent()`
    });
    if (data) {
        req.setHeader('Content-Length', data.length);
        req.write(data);
    } else {
        req.setHeader('Content-Length', 0);
    }
    req.end();
    
    req.on('error', function (e) {
        callback(e, null);
    });
    req.on('response', function (res) {
        var responseData = new Buffer(0);
        res.on('data', function (chunk) {
            var prevChunk = responseData;
            responseData = new Buffer(prevChunk.length + chunk.length);
            prevChunk.copy(responseData);
            chunk.copy(responseData, prevChunk.length);
        });
        res.on('end', function () {
            if (textResponse) {
                // TODO: (below too) follow XHR charset algorithm via https://github.com/bnoordhuis/node-iconv
                responseData = responseData.toString('utf8');
            }
            callback(null, {status:res.statusCode, headers:fermata._normalize(res.headers), data:responseData});
        });
        res.on('close', function (err) {
            if (textResponse) {
                responseData = responseData.toString('utf8');
            }
            callback(Error("Connection dropped (" + err + ")"), {status:res.statusCode, headers:fermata._normalize(res.headers), data:responseData});
        });
    });
    return req;
};

fermata._xhrTransport = function (request, callback) {
    var xhr = new XMLHttpRequest(),
        url = fermata._stringForURL(request);
    
    xhr.open(request.method, url, true);
    Object.keys(request.headers).forEach(function (k) {
        xhr.setRequestHeader(k, request.headers[k]);
    });
    xhr.send(request.data);
    xhr.onreadystatechange = function () {
        if (this.readyState === (xhr.DONE || 4)) {
            if (this.status) {
                var responseHeaders = {};
                this.getAllResponseHeaders().split("\u000D\u000A").forEach(function (l) {
                    if (!l) return;
                    l = l.split("\u003A\u0020");
                    responseHeaders[l[0]] = l.slice(1).join("\u003A\u0020");
                });
                // TODO: when XHR2 settles responseBody vs. response, handle "bytes" siteReq.responseType
                callback(null, {status:this.status, headers:fermata._normalize(responseHeaders), data:this.responseText});
            } else {
                callback(Error("XHR request failed"), null);
            }
        }
    }
    return xhr;
};

fermata._stringForURL = function (url) {        // url={base:"",path:[],query:{}}
    var p = url.path.map(function (c) {
        return (c.join) ? c.join('/') : encodeURIComponent(c);
    }).join('/');
    var q = fermata._flatten(url.query).map(function (kv) {
        return encodeURIComponent(kv[0]) + ((kv[1] !== null) ? '=' + encodeURIComponent(kv[1]) : '');
    }).join("&");
    return url.base + p + ((q) ? '?' + q : '');
};

fermata._flatten = function (q) {
    var list = [];
    Object.keys(q).forEach(function (k) {
        var v = q[k];
        if (k[0] === '$') {
            k = k.slice(1);
            if (k[0] !== '$') {
                v = JSON.stringify(v);
            }
        }
        [].concat(v).forEach(function (v) {
            list.push([k, v]);
        });
    });
    return list;
};

fermata._unflatten = function (l) {
    var obj = {};
    l.forEach(function (kv) {
        var k = kv[0], v = kv[1];
        obj[k] = {}.hasOwnProperty.call(obj, k) ? [].concat(obj[k], v) : v;
    });
    return obj;
};

fermata._normalize = function (headers) {
    var headers_norm = {};
    Object.keys(headers).forEach(function (k) {
        var k_norm = k.split('-').map(function (w) {
            return w && w[0].toUpperCase() + w.slice(1).toLowerCase();
        }).join('-');
        headers_norm[k_norm] = headers[k];
    });
    return headers_norm;
};

fermata._extend = function (target, source) {
    Object.keys(source).forEach(function (key) {
        target[key] = source[key];
    });
    return target;
};

fermata._typeof2 = function (o) {
    return (Array.isArray(o)) ? 'array' : typeof(o);
};


if (typeof window === 'undefined') {
    fermata._useExports = true;
    fermata._transport = fermata._nodeTransport;
    fermata.registerPlugin('oauth', require("./oauth").init(fermata));
    if (!Proxy) {
        fermata._nodeProxy = require('node-proxy');
    }
    exports.registerPlugin = fermata.registerPlugin;
    exports.plugins = fermata.plugins;
} else {
    fermata._transport = fermata._xhrTransport;
}


fermata.registerPlugin('_base', function () {
    /*
     this = baseURL = {base, path, query}
     request = {base, method, path, query, headers, data}
     callback = function(error, response)
     response = {status, headers, data}
    */
    return function (request, callback) {
        return fermata._transport(request, callback);
    };
});

fermata.registerPlugin('raw', function (transport, config) {
    fermata._extend(this, config);
    return transport;
});

fermata.registerPlugin('statusCheck', function (transport) {
    return function (request, callback) {
        return transport(request, function (err, response) {
            if (!err && response.status.toFixed()[0] !== '2') {
                err = Error("Bad status code from server: " + response.status);
                err.status = response.status;
            }
            callback(err, response);
        });
    };
});

// see http://www.w3.org/TR/html5/association-of-controls-and-forms.html#multipart-form-data
fermata._nodeMultipartEncode = function (data) {
    var segno = '' + Math.round(Math.random() * 1e16) + Math.round(Math.random() * 1e16);
    this.headers['Content-Type'] && (this.headers['Content-Type'] += "; boundary=" + segno);
    
    var buffer = new Buffer(0);
    function push(l) {      // NOTE: Fermata simply isn't gonna win at humongous transfers.
        var prevBuffer = buffer, newBuffer = (l instanceof Buffer) ? l : new Buffer(''+l);
        buffer = new Buffer(prevBuffer.length + newBuffer.length + 2);
        prevBuffer.copy(buffer); newBuffer.copy(buffer, prevBuffer.length);
        buffer.write("\r\n", buffer.length - 2);
    }
    function q(s) { return '"' + s.replace(/"|"/g, "%22").replace(/\r\n|\r|\n/g, ' ') + '"'; }
    fermata._flatten(data).forEach(function (kv) {
        push("--" + segno);
        if ({}.hasOwnProperty.call(kv[1], 'data')) {
            var file = kv[1];
            push("Content-Disposition: form-data; name=" + q(kv[0]) + "; filename=" + q(file.name || "blob"));
            push("Content-Type: " + (file.type || "application/octet-stream"));
            push('');
            push(file.data);
        } else {
            push("Content-Disposition: form-data; name=" + q(kv[0]));
            push('');
            push(kv[1]);
        }
    });
    push("--" + segno + "--");
    return buffer;
};

fermata._xhrMultipartEncode = function (data) {
    var form = new FormData();
    fermata._flatten(data).forEach(function (kv) {
        form.append(kv[0], kv[1]);
    });
    return form;
};

fermata.registerPlugin('autoConvert', function (transport, defaultType) {
    var TYPES = {
        "text/plain" : [
            function (d) { return '' + d; },
            function (d) { return '' + d; }
        ],
        "application/json": [
            JSON.stringify,
            JSON.parse
        ],
        "application/x-www-form-urlencoded": [
            // see http://www.w3.org/TR/html5/association-of-controls-and-forms.html#application-x-www-form-urlencoded-encoding-algorithm
            function (data) {
                return fermata._flatten(data).map(function (kv) {
                    return encodeURIComponent(kv[0]).replace(/%20/g, '+') + '=' + encodeURIComponent(kv[1]).replace(/%20/g, '+');
                }).join("&");
            },
            function (data) {
                return fermata._unflatten(data.split("&").map(function (kv) {
                    return kv.split("=").map(function (c) { return decodeURIComponent(c.replace(/\+/g, ' ')); });
                }));
            }
        ],
        "multipart/form-data": [
            (fermata._transport === fermata._xhrTransport) ? fermata._xhrMultipartEncode : fermata._nodeMultipartEncode,
            null
        ]
    };
    return function (request, callback) {
        if (defaultType) {
            if (request.method !== 'GET' && request.method !== 'HEAD')  // setting Content-Type triggers CORS pre-flight, avoid when data isn't sent
                request.headers['Content-Type'] || (request.headers['Content-Type'] = defaultType);
            request.headers['Accept'] || (request.headers['Accept'] = defaultType);
        }
        var reqType = request.headers['Content-Type'],
            encoder = (TYPES[reqType] || [])[0];
        if (encoder) {
            request.data = request.data && encoder.call(request, request.data);
        }
        return transport(request, function (err, response) {
            var accType = request.headers['Accept'],
                resType = response && response.headers['Content-Type'],
                decoder = (TYPES[accType] || TYPES[resType] || [])[1];
            var data = response && response.data,
                // NOTE: I can only find one precedent (Symfony web framework) for this header extension
                meta = response && fermata._extend({'X-Status-Code':response.status}, response.headers);
            if (response && response.status === 204) {     // handle No-Content responses, HT https://github.com/natevw/fermata/pull/35
                data = null;
            } else if (decoder) {
                try {
                    data = decoder.call(response, data);
                } catch (e) {
                    err || (err = e);
                }
            }
            callback(err, data, meta);
        });
    };
});

fermata.registerPlugin('json', function (transport, baseURL) {
    this.base = baseURL;
    return transport.using('statusCheck').using('autoConvert', "application/json");
});


// TODO: remove this completely before any 1.0 release
fermata.registerPlugin('api', function (transport, temp) {
    var correctURL = temp.url.replace(/\/$/, '');
    if (temp.user) {
        correctURL = correctURL.replace(/\/\/(\w)/, '//' + temp.user + ':PASSWORD@$1');
    }
    if (console && console.warn) console.warn("Using deprecated API: please initialize with `fermata.json(\"" + correctURL + "\")` instead. This plugin will be disabled soon!");
    this.base = correctURL;
    return transport.using('statusCheck').using('autoConvert', "application/json");
});
