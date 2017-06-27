/**
 * XadillaX created at 2014-10-20 18:05
 *
 * Copyright (c) 2014 Huaban.com, all rights
 * reserved.
 */
"ust strict";

(function() {
    /**
     * parse key
     * @param str
     * @param pos
     * @param quote
     * @returns {string}
     */
    function parseKey(str, pos, quote) {
        var key = "";
        for(var i = pos; i < str.length; i++) {
            if(quote && quote === str[i]) {
                return key;
            } else if(!quote && (str[i] === " " || str[i] === ":")) {
                return key;
            }
    
            key += str[i];
    
            if(str[i] === "\\" && i + 1 < str.length) {
                key += str[i + 1];
                i++;
            }
        }
    
        throw new Error("Broken JSON syntax near " + key);
    }
    
    /**
     * get body
     * @param str
     * @param pos
     * @returns {*}
     */
    function getBody(str, pos) {
        // parse string body
        if(str[pos] === "\"" || str[pos] === "'") {
            var body = "\"";
            for(var i = pos + 1; i < str.length; i++) {
                if(str[i] === "\\") {
                    body += str[i];
                    if(i + 1 < str.length) body += str[i + 1];
                    i++;
                } else if(str[i] === str[pos]) {
                    body += "\"";
                    return body;
                } else body += str[i];
            }
    
            throw new Error("Broken JSON string body near " + body);
        }
    
        // parse true / false
        if(str[pos] === "t") {
            if(str.indexOf("true", pos) === pos) return "true";
            throw new Error("Broken JSON boolean body near " + str.substr(0, pos + 10));
        }
        if(str[pos] === "f") {
            if(str.indexOf("f", pos) === pos) return "false";
            throw new Error("Broken JSON boolean body near " + str.substr(0, pos + 10));
        }
    
        // parse number
        if(str[pos] === "-" || str[pos] === "+" || str[pos] === "." || (str[pos] >= "0" && str[pos] <= "9")) {
            var body = "";
            for(var i = pos; i < str.length; i++) {
                if(str[i] === "-" || str[i] === "+" || str[i] === "." || (str[i] >= "0" && str[i] <= "9")) {
                    body += str[i];
                } else {
                    return body;
                }
            }
    
            throw new Error("Broken JSON number body near " + body);
        }
    
        // parse object
        if(str[pos] === "{" || str[pos] === "[") {
            var stack = [ str[pos] ];
            var body = str[pos];
            for(var i = pos + 1; i < str.length; i++) {
                body += str[i];
                if(str[i] === "\\") {
                    if(i + 1 < str.length) body += str[i + 1];
                    i++;
                } else if(str[i] === "\"") {
                    if(stack[stack.length - 1] === "\"") {
                        stack.pop();
                    } else {
                        stack.push(str[i]);
                    }
                } else if(str[i] === "{") {
                    stack.push("{");
                } else if(str[i] === "}") {
                    if(stack[stack.length - 1] === "{") {
                        stack.pop();
                    } else {
                        throw new Error("Broken JSON " + (str[pos] === "{" ? "object" : "array") + " body near " + body);
                    }
                } else if(str[i] === "[") {
                    stack.push("[");
                } else if(str[i] === "]") {
                    if(stack[stack.length - 1] === "[") {
                        stack.pop();
                    } else {
                        throw new Error("Broken JSON " + (str[pos] === "{" ? "object" : "array") + " body near " + body);
                    }
                }
    
                if(!stack.length) {
                    return body;
                }
            }
    
            throw new Error("Broken JSON " + (str[pos] === "{" ? "object" : "array") + " body near " + body);
        }
    
        throw new Error("Broken JSON body near " + str.substr((pos - 5 >= 0) ? pos - 5 : 0, 50));
    }
    
    /**
     * is a char can be key head
     * @param ch
     * @returns {boolean}
     */
    function canBeKeyHead(ch) {
        if(ch[0] === "\\") return false;
        if((ch[0] >= 'a' && ch[0] <= 'z') || (ch[0] >= 'A' && ch[0] <= 'Z') || ch[0] === '_') return true;
        if(ch[0] >= '0' && ch[0] <= '9') return true;
        if(ch[0] === '$') return true;
        if(ch.charCodeAt(0) > 255) return true;
        return false;
    }
    
    /**
     * parse JSON
     * @param str
     */
    function parse(str) {
        str = str.trim();
        if(!str.length) throw new Error("Broken JSON object.");
        var result = "";
    
        /**
         * string
         */
        if(str[0] === "\"" || str[0] === "'") {
            if(str[str.length - 1] !== str[0]) {
                throw new Error("Invalid string JSON object.");
            }

            if(str[0] === "'") str[0] = "\"";
            if(str[str.length - 1] === "'") str[str.length - 1] = "\"";
            return str;
        }
    
        /**
         * boolean
         */
        if(str === "true" || str === "false") {
            return str;
        }
    
        /**
         * number
         */
        var num = parseFloat(str);
        if(!isNaN(num)) {
            return num.toString();
        }
    
        /**
         * object
         */
        if(str[0] === "{") {
            var type = "needKey";
            var result = "{";
    
            for(var i = 1; i < str.length; i++) {
                if(" " === str[i] || "\n" === str[i] || "\t" === str[i]) {
                    result += str[i];
                } else if(type === "needKey" && (str[i] === "\"" || str[i] === "'")) {
                    var key = parseKey(str, i + 1, str[i]);
                    result += "\"" + key + "\"";
                    i += key.length;
                    i += 1;
                    type = "afterKey";
                } else if(type === "needKey" && canBeKeyHead(str[i])/**((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z') || str[i] === '_')*/) {
                    var key = parseKey(str, i);
                    result += "\"";
                    result += key;
                    result += "\"";
                    i += key.length - 1;
                    type = "afterKey";
                } else if(type === "afterKey" && str[i] === ":") {
                    result += ":";
                    type = ":";
                } else if(type === ":") {
                    var body = getBody(str, i);
                    i += (body.length - 1);
                    result += parse(body);
                    type = "afterBody";
                } else if(type === "afterBody" || type === "needKey") {
                    if(str[i] === ",") {
                        result += ",";
                        type = "needKey";
                    } else if(str[i] === "}" && i === str.length - 1) {
                        result += "}";
                        return result;
                    }
                }
            }
    
            throw new Error("Broken JSON object near " + result);
        }
    
        /**
         * array
         */
        if(str[0] === "[") {
            var result = "[";
            var type = "needBody";
            for(var i = 1; i < str.length; i++) {
                if(" " === str[i] || "\n" === str[i] || "\t" === str[i]) {
                    result += str[i];
                } else if(type === "needBody") {
                    if(str[i] === "]" && i === str.length - 1) {
                        result += "]";
                        return result;
                    }
    
                    var body = getBody(str, i);
                    i += body.length - 1;
                    result += parse(body);
                    type = "afterBody";
                } else if(type === "afterBody") {
                    if(str[i] === ",") {
                        result += ",";
                        type = "needBody";
                    } else if(str[i] === "]" && i === str.length - 1) {
                        result += "]";
                        return result;
                    }
                }
            }
    
            throw new Error("Broken JSON array near " + result);
        }
    }

    var g = (typeof exports === "undefined") ? (window.fJSON = {}) : exports;
    
    /**
     * parse Fbbk JSON string into JSON object
     * @param json
     * @returns {*}
     */
    g.parse = function(json) {
        var jsonString = parse(json);
        return JSON.parse(jsonString);
    };
})();

