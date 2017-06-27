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

var Proxy = require('node-proxy');

function extend(target, source) {
    for (key in source) {
        target[key] = source[key];
    }
    return target;
}

function typeof2(o) {
    return (Array.isArray(o)) ? 'array' : typeof(o);
}

function wrapTheWrapper(impl) {
    return (Proxy) ? Proxy.createFunction({
        // NOTE: node-proxy has a different set of required handlers than harmony:proxies proposal
        getOwnPropertyDescriptor: function (name) {},
        enumerate: function () { return []; },
        delete: function () { return false; },
        fix: function () {},
        set: function (target, name, val) {},
        
        get: function (target, name) {
            return impl(name);
        }
    }, impl) : extend(impl, {
        get: function () { impl('get').call(impl, arguments); },
        put: function () { impl('put').call(impl, arguments); },
        post: function () { impl('post').call(impl, arguments); },
        delete: function () { impl('delete').call(impl, arguments); }
    });
}

function makeWrapper(site, transport, path, query) {
    return wrapTheWrapper(function () {
        var args = [].splice.call(arguments, 0),
            lastArg = typeof2(args[args.length-1]);
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
            return makeWrapper(site, transport, path2, query2);
        }
    });
}


function Site(config) {
    this.base = config.url;
    if (this.base.slice(-1) !== '/') {
        this.base += '/';
    }
    if (config.user) {
        this.basicAuth = config.user + ':' + (config.password || '');
    }
}

Site.prototype.combine = function (query, subquery) {
    return extend(extend({}, query), subquery);
};
Site.prototype.join = function (path, subpath) {
    return path.concat(subpath);
};
Site.prototype.url = function (path, query) {
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
        return ((v && v.map) ? v : [v]).map(function (v1) {
            return encodeURIComponent(k) + ((v1 !== null) ? '=' + encodeURIComponent(v1) : '');
        }).join('&');
    }).join('&');
    return this.base + p + ((q) ? '?' + q : '');
};

Site.prototype.request = function (info, transport, callback) {
    //console.log("Site.request", info);
    var data = JSON.stringify(info.data);
    var req = {
        responseType: 'text', // vs. 'bytes' (Buffer in Node, UInt8Array in supporting DOM, Array otherwise)
        method: info.method,
        url: this.url(info.path, info.query),
        headers: {}
    };
    extend(req.headers, {
        'Content-Type': "application/json",
        'Accept': "application/json"
    });
    extend(req.headers, info.headers);
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


function Transport() {}
Transport.normalize = function (headers) {
    var headers_norm = {};
    Object.keys(headers).forEach(function (k) {
        var k_norm = k.split('-').map(function (w) {
            return w[0].toUpperCase() + w.slice(1).toLowerCase();
        }).join('-');
        headers_norm[k_norm] = headers[k];
    });
    return headers_norm;
};

var url = require('url'),
    https = require('https'),
    http = require('http');

Transport.prototype.send = function (siteReq, data, callback) {
    var url_parts = url.parse(siteReq.url),
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
    extend(req.headers, Transport.normalize(siteReq.headers));
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
    
    req = ((secure) ? https : http).request(req);
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
            callback(res.statusCode, Transport.normalize(res.headers), responseData);
        });
    });
};


exports.api = function (config) {
    return makeWrapper(new Site(config), new Transport(), [], {});
};
