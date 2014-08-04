'use strict'

var http = require('http');
var https = require('https');
var tunnel = require('tunnel');
var url = require('url');
var util = require('util');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

function download(src, output, options) {
    var downloader = new EventEmitter(),
        srcUrl,
        tunnelAgent,
        req;

    if (options) { 
        options = parseOptions('download', options);
    }
    srcUrl = url.parse(src);
    srcUrl.protocol = cleanProtocol(srcUrl.protocol);

    req = request({
        protocol: srcUrl.protocol,
        host: srcUrl.hostname,
        port: srcUrl.port,
        path: srcUrl.pathname,
        proxy: options?options.proxy:undefined,
        method: 'GET'
    }, function(res) {
        var fileSize, writeStream, downloadedSize;
        if (res.statusCode === 200) {
            downloadedSize = 0;
            fileSize = res.headers['content-length'];
            writeStream = fs.createWriteStream(output, {
                flags: 'a',
                encoding: 'binary'
            });

            res.on('error', function(err) {
                writeStream.end();
                downloader.emit('error', err);
            });
            res.on('data', function(chunk) {
                downloadedSize += chunk.length;
                downloader.emit('progress', downloadedSize/fileSize);
                writeStream.write(chunk);
            });
            res.on('end', function() {
                writeStream.end();
                downloader.emit('end', output);
            });
        } else {
            downloader.emit('error', 'Server respond ' + res.statusCode);
        }
    });

    req.end();
    req.on('error', function(err) {
        downloader.emit('error', err);
    });

    return downloader;
}

function request(options, callback) {
    var newOptions = {}, newProxy = {}, key;
    options = parseOptions('request', options);
    if (options.protocol === 'http') {
        if (options.proxy) {
            for (key in options.proxy) {
                if (key !== 'protocol') {
                    newProxy[key] = options.proxy[key];
                }
            }
            if (options.proxy.protocol === 'http') {
                options.agent = tunnel.httpOverHttp({proxy: newProxy});
            } else if (options.proxy.protocol === 'https') {
                options.agent = tunnel.httpOverHttps({proxy: newProxy});
            } else {
                throw options.proxy.protocol + ' proxy is not supported!';
            }
        }
        for (key in options) {
            if (key !== 'protocol' && key !== 'proxy') {
                newOptions[key] = options[key];
            }
        }
        return http.request(newOptions, callback);
    }
    if (options.protocol === 'https') {
        if (options.proxy) {
            for (key in options.proxy) {
                if (key !== 'protocol') {
                    newProxy[key] = options.proxy[key];
                }
            }
            if (options.proxy.protocol === 'http') {
                options.agent = tunnel.httpsOverHttp({proxy: newProxy});
            } else if (options.proxy.protocol === 'https') {
                options.agent = tunnel.httpsOverHttps({proxy: newProxy});
            } else {
                throw options.proxy.protocol + ' proxy is not supported!';
            }
        }
        for (key in options) {
            if (key !== 'protocol' && key !== 'proxy') {
                newOptions[key] = options[key];
            }
        }
        return https.request(newOptions, callback);
    }
    throw 'only allow http or https request!';
}

function parseOptions(type, options) {
    var proxy;
    if (type === 'download') {
        if (options.proxy) {
            if (typeof options.proxy === 'string') {
                proxy = url.parse(options.proxy);
                options.proxy = {};
                options.proxy.protocol = cleanProtocol(proxy.protocol);
                options.proxy.host = proxy.hostname;
                options.proxy.port = proxy.port;
                options.proxy.proxyAuth = proxy.auth;
                options.proxy.headers = {'User-Agent': 'Node'};
            }
        }
        return options;
    }
    if (type === 'request') {
        if (!options.protocol) {
            options.protocol = 'http';
        }
        options.protocol = cleanProtocol(options.protocol);

        if (options.proxy) {
            if (typeof options.proxy === 'string') {
                proxy = url.parse(options.proxy);
                options.proxy = {};
                options.proxy.protocol = cleanProtocol(proxy.protocol);
                options.proxy.host = proxy.hostname;
                options.proxy.port = proxy.port;
                options.proxy.proxyAuth = proxy.auth;
                options.proxy.headers = {'User-Agent': 'Node'};
            }
        }
        return options;
    }
}

function cleanProtocol(str) {
    return str.trim().toLowerCase().replace(/:$/, '');
}

exports.download = download;
exports.request = request;