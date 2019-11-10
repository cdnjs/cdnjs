/*
Fermata: a succinct REST client.
Written by Nathan Vander Wilt (nate@andyet.net).

Copyright © 2011 &yet, LLC. Released under the terms of the MIT License:

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

var fermata = {};

fermata.registerPlugin = function (name, plugin) {
    fermata[name] = function () {
        var url = {base:"", path:[], query:{}}, args = [];
        args.push(fermata._transport);
        [].push.apply(args, arguments);
        return fermata._makeNativeURL(plugin.apply(url, args), url);
    };
    if (fermata._useExports) {
        exports[name] = fermata[name];
    }
};

fermata._makeNativeURL = function (transport, url) {
    return fermata._wrapTheWrapper(function () {
        var args = [].splice.call(arguments, 0),
            lastArg = fermata._typeof2(args[args.length-1]);
        if (lastArg === 'undefined') {
            return fermata._stringForURL(url);
        } else if (lastArg === 'function') {
            var callback = args.pop(),
                data = args.pop(),
                headers = fermata._normalize(args.pop() || {}),
                method = url.path.pop().toUpperCase();
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
        'get': function () { impl('get').apply(null, arguments); },
        'put': function () { impl('put').apply(null, arguments); },
        'post': function () { impl('post').apply(null, arguments); },
        'delete': function () { impl('delete').apply(null, arguments); },
        'del': function () { impl('delete').apply(null, arguments); },
    });
};

fermata._nodeTransport = function (request, callback) {
    var url = fermata._stringForURL(request),
        url_parts = require('url').parse(url),
        headers = {},
        data = null, textResponse = true;
    
    if (url_parts.auth) {
        headers['Authorization'] = 'Basic ' + new Buffer(url_parts.auth).toString('base64');
    }
    fermata._extend(headers, request.headers);
    
    console.log(typeof(request.data));
    if (request.data && request.method === 'GET' || request.method === 'HEAD') {
        /* XHR ignores data on these requests, so we'll standardize on that behaviour to keep things consistent. Conveniently, this
           avoids https://github.com/joyent/node/issues/989 in situations like https://issues.apache.org/jira/browse/COUCHDB-1146 */
        console.warn("Ignoring data passed to GET or HEAD request.");
    } else if (typeof(request.data) === 'string') {
        data = new Buffer(request.data, 'utf8');
        // TODO: follow XHR algorithm for charset replacement if Content-Type already set
        headers['Content-Type'] || (headers['Content-Type'] = "text/plain;charset=UTF-8");
    } else if (request.data && request.data.length) {
        textResponse = false;
        data = new Buffer(request.data);
    }
    
    var req = ((url_parts.protocol === 'https:') ? require('https') : require('http')).request({
        host: url_parts.hostname,
        port: url_parts.port,
        method: request.method,
        path: url_parts.pathname + (url_parts.search || ''),
        headers: headers
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
};

fermata._stringForURL = function (url) {        // url={base:"",path:[],query:{}}
    var p = url.path.map(function (c) {
        return (c.join) ? c.join('/') : encodeURIComponent(c);
    }).join('/');
    var q = Object.keys(url.query).map(function (k) {
        var v = url.query[k];
        if (k[0] === '$') {
            k = k.slice(1);
            if (k[0] !== '$') {
                v = JSON.stringify(v);
            }
        }
        return [].concat(v).map(function (v1) {
            return encodeURIComponent(k) + ((v1 !== null) ? '=' + encodeURIComponent(v1) : '');
        }).join('&');
    }).join('&');
    return url.base + '/' + p + ((q) ? '?' + q : '');
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
    if (!Proxy) {
        fermata._nodeProxy = require('node-proxy');
    }
    exports.registerPlugin = fermata.registerPlugin;
} else {
    fermata._transport = fermata._xhrTransport;
}

fermata.registerPlugin("raw", function (transport, config) {
    fermata._extend(this, config);
    return transport;
});

fermata.registerPlugin("json", function (transport, baseURL) {
    this.base = baseURL;                        // this = initial URL = {base, path, query}
    return function (request, callback) {       // request = {base, method, path, query, headers, data}
        request.headers['Accept'] = "application/json";
        request.headers['Content-Type'] = "application/json";
        request.data = JSON.stringify(request.data);        // Fermata transports String as UTF-8 "text", Buffer/UInt8Array/Array as "bytes"
        transport(request, function (err, response) {       // response = {status, headers, data}
            if (!err) {
                if (response.status.toFixed()[0] !== '2') {
                    err = Error("Bad status code from server: " + response.status);
                }
                try {
                    response = JSON.parse(response.data);
                } catch (e) {
                    err = e;
                }
            }
            callback(err, response);
        });
    };
});


// TODO: remove this in next version
fermata.registerPlugin("api", function (transport, temp) {
    var correctURL = temp.url.replace(/\/$/, '');
    if (temp.user) {
        correctURL = correctURL.replace(/\/\/(\w)/, '//' + temp.user + ':PASSWORD@$1');
    }
    console.warn("Using deprecated API! Please initialize with `fermata.json(\"" + correctURL + "\")`")
    this.base = correctURL;
    
    // copy-pasted from new JSON plugin
    return function (request, callback) {
        request.headers['Accept'] = "application/json";
        request.headers['Content-Type'] = "application/json";
        request.data = JSON.stringify(request.data);
        transport(request, function (err, response) {
            if (!err) {
                if (response.status.toFixed()[0] !== '2') {
                    err = Error("Bad status code from server: " + response.status);
                }
                try {
                    response = JSON.parse(response.data);
                } catch (e) {
                    err = e;
                }
            }
            callback(err, response);
        });
    };
});