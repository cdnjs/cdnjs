/**
 * using AMD (Asynchronous Module Definition) API with OzJS
 * see http://ozjs.org for details
 *
 * Copyright (C) 2010-2012, Dexter.Yy, MIT License
 * vim: et:ts=4:sw=4:sts=4
 */
define("mo/network/ajax", [], function(require, exports){

    var rquery = /\?/,
        rhash = /#.*$/,
        rnoContent = /^(?:GET|HEAD)$/,
        xhrObj = window.XMLHttpRequest 
                && (window.location.protocol !== "file:" 
                    || !window.ActiveXObject) 
            ? function(){
                return new window.XMLHttpRequest();
            } : function(){
                try {
                    return new window.ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {}
            };

    exports.params = function(a) {
        var s = [];
        if (a.constructor == Array) {
            for (var i = 0; i < a.length; i++)
                s.push(a[i].name + "=" + encodeURIComponent(a[i].value));
        } else {
            for (var j in a)
                s.push(j + "=" + encodeURIComponent(a[j]));
        }
        return s.join("&").replace(/%20/g, "+");
    };

    exports.parseJSON = function(json){
        json = json.replace(/^.*?(\{|\[)/, '$1')
            .replace(/(\]|\})[^\]\}]*$/, '$1');
        try {
            if (window.JSON && window.JSON.parse) {
                json = window.JSON.parse(json);
            } else {
                json = (new Function("return " + json))();
            }
        } catch(ex) {
            json = false;
        }
        return json;
    };

    /**
     * From jquery by John Resig
     */ 
    exports.ajax = function(s){
        var options = {
            type: s.type || "GET",
            url: s.url || "",
            data: s.data || null,
            dataType: s.dataType,
            contentType: s.contentType === false 
                ? false 
                : (s.contentType || "application/x-www-form-urlencoded"),
            username: s.username || null,
            password: s.password || null,
            timeout: s.timeout || 0,
            processData: s.processData === undefined ? true : s.processData,
            beforeSend: s.beforeSend || null,
            complete: s.complete || function(){},
            handleError: s.handleError || function(){},
            success: s.success || function(){},
            xhrFields: s.xhrFields || null,
            headers: s.headers || {},
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        };
        var type = options.type.toUpperCase();
        var noContent = rnoContent.test(type);

        options.url = options.url.replace(rhash, "");
        
        if (options.data && options.processData 
                && typeof options.data !== "string") {
            options.data = this.params(options.data);
        }
        if (options.data && noContent) {
            options.url += (rquery.test(options.url) ? "&" : "?") 
                + options.data;
            options.data = null;
        }
        
        var status, data, requestDone = false, xhr = xhrObj();
        if (!xhr) {
            return;
        }
        if (options.username) {
            xhr.open(type, options.url, true, 
                options.username, options.password);
        } else {
            xhr.open(type, options.url, true);
        }

        try {
            var i;
            if (options.xhrFields) {
                for (i in options.xhrFields) {
                    xhr[i] = options.xhrFields[i];
                }
            }
            if (options.data && !noContent 
                    && options.contentType !== false) { 
                xhr.setRequestHeader("Content-Type", options.contentType);
            }
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("Accept", 
                options.dataType && options.accepts[options.dataType] ?
                    options.accepts[options.dataType] + ", */*; q=0.01" :
                    options.accepts._default);
            for (i in options.headers) {
                xhr.setRequestHeader(i, options.headers[i]);
            }
        } catch(e){}
        
        if (options.beforeSend) {
            options.beforeSend(xhr);
        }
            
        var onreadystatechange = xhr.onreadystatechange = function(isTimeout){
            if (!xhr || xhr.readyState === 0 || isTimeout === "abort") {
                if (!requestDone) {
                    options.complete(xhr);
                }
                requestDone = true;
                if (xhr) {
                    xhr.onreadystatechange = noop;
                }
            } else if (!requestDone && xhr 
                    && (xhr.readyState === 4 || isTimeout === "timeout")) {
                requestDone = true;
                xhr.onreadystatechange = noop;
                status = isTimeout === "timeout" ?
                    "timeout" :
                    !httpSuccess(xhr) ?
                        "error" : "success";
                var errMsg;
                if (status === "success") {
                    try {
                        data = httpData(xhr, options.dataType);
                    } catch(parserError) {
                        status = "parsererror";
                        errMsg = parserError;
                    }
                    options.success(data);
                } else {
                    options.handleError(xhr, status, errMsg);
                }
                options.complete(xhr);
                if (isTimeout === "timeout") {
                    xhr.abort();
                }
                xhr = null;
            }
        };

        try {
            var oldAbort = xhr.abort;
            xhr.abort = function(){
                if (xhr) {
                    Function.prototype.call.call(oldAbort, xhr);
                }
                onreadystatechange('abort');
            };
        } catch(e) {}

        if (options.timeout > 0) {
            setTimeout(function(){
                if (xhr && !requestDone) {
                    onreadystatechange("timeout");
                }
            }, options.timeout);
        }

        try {
            xhr.send(noContent || options.data == null ? null : options.data);
        } catch(sendError) {
            options.handleError(xhr, null, sendError);
            options.complete(xhr);
        }

        function httpSuccess(r) {
            try {
                return !r.status && location.protocol == "file:" 
                    || ( r.status >= 200 && r.status < 300 ) 
                    || r.status === 304 || r.status === 1223 || r.status === 0;
            } catch(e){}
            return false;
        }

        function httpData(r, type) {
            var ct = r.getResponseHeader("content-type") || '';
            var xml = type === "xml" || !type && ct && ct.indexOf("xml") >= 0;
            var data = xml ? r.responseXML : r.responseText;
            if (xml && data.documentElement.tagName === "parsererror") {
                throw "parsererror";
            }
            if (type === "json" || !type && ct.indexOf("json") >= 0) {
                data = exports.parseJSON(data);
            } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                globalEval(data);
            }
            return data;
        }

        return xhr;
    };

    function noop(){}

    function globalEval(code){
        var script, indirect = eval;
        if (code) {
            if (/^[^\S]*use strict/.test(code)) {
                script = document.createElement("script");
                script.text = code;
                document.head.appendChild(script)
                    .parentNode.removeChild(script);
            } else {
                indirect(code);
            }
        }
    }

});
