/*
Fermata: a succinct REST client.
Written by Nathan Vander Wilt (nate@andyet.net).

Copyright © 2011 by &yet, LLC. Released under the terms of the MIT License:

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
if (typeof window === 'undefined') {
    fermata._node = {
        url: require('url'),
        https: require('https'),
        http: require('http')
    };
    if (!Proxy) {
        fermata._node.Proxy = require('node-proxy');
    }
}
fermata._extend = function (target, source) {
    Object.keys(source).forEach(function (key) {
        target[key] = source[key];
    });
    return target;
}
fermata._typeof2 = function (o) {
    return (Array.isArray(o)) ? 'array' : typeof(o);
}

fermata._wrapTheWrapper = function (impl) {
    return (Proxy || fermata._node) ? (Proxy) ? Proxy.createFunction({
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
    }, impl) : fermata._node.Proxy.createFunction({
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
        'delete': function () { impl('delete').apply(null, arguments); }
    });
}

fermata._makeWrapper = function (site, transport, path, query) {
    return fermata._wrapTheWrapper(function () {
        var args = [].splice.call(arguments, 0),
            lastArg = fermata._typeof2(args[args.length-1]);
        if (lastArg === 'undefined') {
            return site.url(path, query);
        } else if (lastArg === 'function') {
            var callback = args.pop(),
                data = args.pop(),
                headers = args.pop() || {},
                method = path.pop();
            return site.request({method:method, path:path, query:query, headers:headers, data:data, args:args}, transport, callback);
        } else {
            var query2 = (lastArg === 'object') ? site.combine(query, args.pop()) : query,
                path2 = (args.length) ? site.join(path, args) : path;
            return fermata._makeWrapper(site, transport, path2, query2);
        }
    });
}


fermata.Site = function (config) {
    this.base = config.url;
    if (this.base.slice(-1) !== '/') {
        this.base += '/';
    }
    if (config.user) {
        this.basicAuth = config.user + ':' + (config.password || '');
    }
}

fermata.Site.prototype.combine = function (query, subquery) {
    return fermata._extend(fermata._extend({}, query), subquery);
};
fermata.Site.prototype.join = function (path, subpath) {
    return path.concat(subpath);
};
fermata.Site.prototype.url = function (path, query) {
    var p = path.map(function (c) {
        return (c.join) ? c.join('/') : encodeURIComponent(c);
    }).join('/');
    var q = Object.keys(query).map(function (k) {
        var v = query[k];
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
    return this.base + p + ((q) ? '?' + q : '');
};

fermata.Site.prototype.request = function (info, transport, callback) {
    //console.log("Site.request", info);
    var data = JSON.stringify(info.data);
    var req = {
        responseType: 'text', // vs. 'bytes' (Buffer in Node, UInt8Array in supporting DOM, Array otherwise)
        method: info.method,
        url: this.url(info.path, info.query),
        headers: {}
    };
    fermata._extend(req.headers, {
        'Content-Type': "application/json",
        'Accept': "application/json"
    });
    fermata._extend(req.headers, info.headers);
    req.basicAuth = this.basicAuth;
    
    transport.send(req, data, function (status, headers, buffer) {
        //console.log(arguments);
        if (status === null) {
            return callback(headers);
        }
        
        var error, object;
        try {
            object = JSON.parse(buffer);
        } catch (e) {
            error = e;
            object = buffer;
        }
        if (status.toFixed()[0] !== '2') {
            error = Error("Bad status code from server: " + status);
        }
        return callback(error, object);
    });
};


fermata.Transport = function () {
    this.send = (fermata._node) ? this.constructor._nodeSend : this.constructor._xhrSend;
}
fermata.Transport.normalize = function (headers) {
    var headers_norm = {};
    Object.keys(headers).forEach(function (k) {
        var k_norm = k.split('-').map(function (w) {
            return w && w[0].toUpperCase() + w.slice(1).toLowerCase();
        }).join('-');
        headers_norm[k_norm] = headers[k];
    });
    return headers_norm;
};

fermata.Transport._xhrSend = function (siteReq, data, callback) {
    var req = new XMLHttpRequest(),
        reqArgs = [siteReq.method, siteReq.url, true],
        headers = fermata.Transport.normalize(siteReq.headers);
    if (siteReq.basicAuth) {
        reqArgs = reqArgs.concat(siteReq.basicAuth.split(':'));
    }
    
    req.open.apply(req, reqArgs);
    Object.keys(headers).forEach(function (k) {
        req.setRequestHeader(k, headers[k]);
    });
    req.send(data);
    req.onreadystatechange = function () {
        if (this.readyState === (req.DONE || 4)) {
            if (this.status) {
                var responseHeaders = {};
                this.getAllResponseHeaders().split("\u000D\u000A").forEach(function (l) {
                    if (!l) return;
                    l = l.split("\u003A\u0020");
                    responseHeaders[l[0]] = l.slice(1).join("\u003A\u0020");
                });
                // TODO: when XHR2 settles responseBody vs. response, handle "bytes" siteReq.responseType
                callback(this.status, fermata.Transport.normalize(responseHeaders), this.responseText);
            } else {
                callback(null, Error("XHR request failed"));
            }
        }
    }
};

fermata.Transport._nodeSend = function (siteReq, data, callback) {
    var url_parts = fermata._node.url.parse(siteReq.url),
        secure = (url_parts.protocol !== 'http:');
    
    //console.log("Transport.send", siteReq, url_parts);
    var req = {
        host: url_parts.hostname,
        port: url_parts.port,
        method: siteReq.method.toUpperCase(),
        path: url_parts.pathname + (url_parts.search || ''),
        headers: {}
    };
    if (url_parts.auth) {
        req.headers['Authorization'] = 'Basic ' + new Buffer(url_parts.auth).toString('base64');
    }
    if (siteReq.basicAuth) {
        req.headers['Authorization'] = 'Basic ' + new Buffer(siteReq.basicAuth).toString('base64');
    }
    fermata._extend(req.headers, fermata.Transport.normalize(siteReq.headers));
    if (data && req.method === 'GET' || req.method === 'HEAD') {
        /* XHR ignores data on these requests, so we'll standardize on that behaviour to keep things consistent. Conveniently, this
           avoids https://github.com/joyent/node/issues/989 in situations like https://issues.apache.org/jira/browse/COUCHDB-1146 */
        console.warn("Ignoring data passed to GET or HEAD request.");
        data = null;
    }
    
    if (typeof(data) === 'string') {
        data = new Buffer(data, 'utf8');
        // TODO: follow XHR algorithm for charset replacement if Content-Type already set
        req.headers['Content-Type'] = "text/plain;charset=UTF-8";
    }
    
    req = ((secure) ? fermata._node.https : fermata._node.http).request(req);
    if (data) {
        req.setHeader('Content-Length', data.length);
        req.write(data);
    } else {
        req.setHeader('Content-Length', 0);
    }
    req.end();
    
    req.on('error', function (e) {
        callback(null, e);
    });
    req.on('response', function (res) {
        //console.log("HTTP response", res);
        var responseData = new Buffer(0);
        res.on('data', function (chunk) {
            var prevChunk = responseData;
            responseData = new Buffer(prevChunk.length + chunk.length);
            prevChunk.copy(responseData);
            chunk.copy(responseData, prevChunk.length);
        });
        res.on('end', function () {
            if (siteReq.responseType === 'text') {
                // TODO: follow XHR charset algorithm via https://github.com/bnoordhuis/node-iconv
                responseData = responseData.toString('utf8');
            }
            callback(res.statusCode, fermata.Transport.normalize(res.headers), responseData);
        });
    });
};

fermata.api = function (config) {
    return fermata._makeWrapper(new fermata.Site(config), new fermata.Transport(), [], {});
};

if (fermata._node) {
    exports.api = fermata.api;
}
