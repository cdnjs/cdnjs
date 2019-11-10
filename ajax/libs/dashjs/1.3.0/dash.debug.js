function X2JS(matchers, attrPrefix, ignoreRoot) {
    if (attrPrefix === null || attrPrefix === undefined) {
        attrPrefix = "_";
    }
    if (ignoreRoot === null || ignoreRoot === undefined) {
        ignoreRoot = false;
    }
    var VERSION = "1.0.11";
    var escapeMode = false;
    var DOMNodeTypes = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9
    };
    function getNodeLocalName(node) {
        var nodeLocalName = node.localName;
        if (nodeLocalName == null) nodeLocalName = node.baseName;
        if (nodeLocalName == null || nodeLocalName == "") nodeLocalName = node.nodeName;
        return nodeLocalName;
    }
    function getNodePrefix(node) {
        return node.prefix;
    }
    function escapeXmlChars(str) {
        if (typeof str == "string") return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;"); else return str;
    }
    function unescapeXmlChars(str) {
        return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/");
    }
    function parseDOMChildren(node) {
        if (node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
            var result, child = node.firstChild, i, len;
            for (i = 0, len = node.childNodes.length; i < len; i += 1) {
                if (node.childNodes[i].nodeType !== DOMNodeTypes.COMMENT_NODE) {
                    child = node.childNodes[i];
                    break;
                }
            }
            if (ignoreRoot) {
                result = parseDOMChildren(child);
            } else {
                result = {};
                var childName = getNodeLocalName(child);
                result[childName] = parseDOMChildren(child);
            }
            return result;
        } else if (node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
            var result = new Object();
            result.__cnt = 0;
            var nodeChildren = node.childNodes;
            for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
                var child = nodeChildren.item(cidx);
                var childName = getNodeLocalName(child);
                result.__cnt++;
                if (result[childName] == null) {
                    result[childName] = parseDOMChildren(child);
                    result[childName + "_asArray"] = new Array(1);
                    result[childName + "_asArray"][0] = result[childName];
                } else {
                    if (result[childName] != null) {
                        if (!(result[childName] instanceof Array)) {
                            var tmpObj = result[childName];
                            result[childName] = new Array();
                            result[childName][0] = tmpObj;
                            result[childName + "_asArray"] = result[childName];
                        }
                    }
                    var aridx = 0;
                    while (result[childName][aridx] != null) aridx++;
                    result[childName][aridx] = parseDOMChildren(child);
                }
            }
            for (var aidx = 0; aidx < node.attributes.length; aidx++) {
                var attr = node.attributes.item(aidx);
                result.__cnt++;
                var value2 = attr.value;
                for (var m = 0, ml = matchers.length; m < ml; m++) {
                    var matchobj = matchers[m];
                    if (matchobj.test.call(this, attr)) value2 = matchobj.converter.call(this, attr.value);
                }
                result[attrPrefix + attr.name] = value2;
            }
            var nodePrefix = getNodePrefix(node);
            if (nodePrefix != null && nodePrefix != "") {
                result.__cnt++;
                result.__prefix = nodePrefix;
            }
            if (result.__cnt == 1 && result["#text"] != null) {
                result = result["#text"];
            }
            if (result["#text"] != null) {
                result.__text = result["#text"];
                if (escapeMode) result.__text = unescapeXmlChars(result.__text);
                delete result["#text"];
                delete result["#text_asArray"];
            }
            if (result["#cdata-section"] != null) {
                result.__cdata = result["#cdata-section"];
                delete result["#cdata-section"];
                delete result["#cdata-section_asArray"];
            }
            if (result.__text != null || result.__cdata != null) {
                result.toString = function() {
                    return (this.__text != null ? this.__text : "") + (this.__cdata != null ? this.__cdata : "");
                };
            }
            return result;
        } else if (node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
            return node.nodeValue;
        } else if (node.nodeType == DOMNodeTypes.COMMENT_NODE) {
            return null;
        }
    }
    function startTag(jsonObj, element, attrList, closed) {
        var resultStr = "<" + (jsonObj != null && jsonObj.__prefix != null ? jsonObj.__prefix + ":" : "") + element;
        if (attrList != null) {
            for (var aidx = 0; aidx < attrList.length; aidx++) {
                var attrName = attrList[aidx];
                var attrVal = jsonObj[attrName];
                resultStr += " " + attrName.substr(1) + "='" + attrVal + "'";
            }
        }
        if (!closed) resultStr += ">"; else resultStr += "/>";
        return resultStr;
    }
    function endTag(jsonObj, elementName) {
        return "</" + (jsonObj.__prefix != null ? jsonObj.__prefix + ":" : "") + elementName + ">";
    }
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    function jsonXmlSpecialElem(jsonObj, jsonObjField) {
        if (endsWith(jsonObjField.toString(), "_asArray") || jsonObjField.toString().indexOf("_") == 0 || jsonObj[jsonObjField] instanceof Function) return true; else return false;
    }
    function jsonXmlElemCount(jsonObj) {
        var elementsCnt = 0;
        if (jsonObj instanceof Object) {
            for (var it in jsonObj) {
                if (jsonXmlSpecialElem(jsonObj, it)) continue;
                elementsCnt++;
            }
        }
        return elementsCnt;
    }
    function parseJSONAttributes(jsonObj) {
        var attrList = [];
        if (jsonObj instanceof Object) {
            for (var ait in jsonObj) {
                if (ait.toString().indexOf("__") == -1 && ait.toString().indexOf("_") == 0) {
                    attrList.push(ait);
                }
            }
        }
        return attrList;
    }
    function parseJSONTextAttrs(jsonTxtObj) {
        var result = "";
        if (jsonTxtObj.__cdata != null) {
            result += "<![CDATA[" + jsonTxtObj.__cdata + "]]>";
        }
        if (jsonTxtObj.__text != null) {
            if (escapeMode) result += escapeXmlChars(jsonTxtObj.__text); else result += jsonTxtObj.__text;
        }
        return result;
    }
    function parseJSONTextObject(jsonTxtObj) {
        var result = "";
        if (jsonTxtObj instanceof Object) {
            result += parseJSONTextAttrs(jsonTxtObj);
        } else if (jsonTxtObj != null) {
            if (escapeMode) result += escapeXmlChars(jsonTxtObj); else result += jsonTxtObj;
        }
        return result;
    }
    function parseJSONArray(jsonArrRoot, jsonArrObj, attrList) {
        var result = "";
        if (jsonArrRoot.length == 0) {
            result += startTag(jsonArrRoot, jsonArrObj, attrList, true);
        } else {
            for (var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
                result += startTag(jsonArrRoot[arIdx], jsonArrObj, parseJSONAttributes(jsonArrRoot[arIdx]), false);
                result += parseJSONObject(jsonArrRoot[arIdx]);
                result += endTag(jsonArrRoot[arIdx], jsonArrObj);
            }
        }
        return result;
    }
    function parseJSONObject(jsonObj) {
        var result = "";
        var elementsCnt = jsonXmlElemCount(jsonObj);
        if (elementsCnt > 0) {
            for (var it in jsonObj) {
                if (jsonXmlSpecialElem(jsonObj, it)) continue;
                var subObj = jsonObj[it];
                var attrList = parseJSONAttributes(subObj);
                if (subObj == null || subObj == undefined) {
                    result += startTag(subObj, it, attrList, true);
                } else if (subObj instanceof Object) {
                    if (subObj instanceof Array) {
                        result += parseJSONArray(subObj, it, attrList);
                    } else {
                        var subObjElementsCnt = jsonXmlElemCount(subObj);
                        if (subObjElementsCnt > 0 || subObj.__text != null || subObj.__cdata != null) {
                            result += startTag(subObj, it, attrList, false);
                            result += parseJSONObject(subObj);
                            result += endTag(subObj, it);
                        } else {
                            result += startTag(subObj, it, attrList, true);
                        }
                    }
                } else {
                    result += startTag(subObj, it, attrList, false);
                    result += parseJSONTextObject(subObj);
                    result += endTag(subObj, it);
                }
            }
        }
        result += parseJSONTextObject(jsonObj);
        return result;
    }
    this.parseXmlString = function(xmlDocStr) {
        var xmlDoc;
        if (window.DOMParser) {
            var parser = new window.DOMParser();
            xmlDoc = parser.parseFromString(xmlDocStr, "text/xml");
        } else {
            if (xmlDocStr.indexOf("<?") == 0) {
                xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf("?>") + 2);
            }
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlDocStr);
        }
        return xmlDoc;
    };
    this.xml2json = function(xmlDoc) {
        return parseDOMChildren(xmlDoc);
    };
    this.xml_str2json = function(xmlDocStr) {
        var xmlDoc = this.parseXmlString(xmlDocStr);
        return this.xml2json(xmlDoc);
    };
    this.json2xml_str = function(jsonObj) {
        return parseJSONObject(jsonObj);
    };
    this.json2xml = function(jsonObj) {
        var xmlDocStr = this.json2xml_str(jsonObj);
        return this.parseXmlString(xmlDocStr);
    };
    this.getVersion = function() {
        return VERSION;
    };
    this.escapeMode = function(enabled) {
        escapeMode = enabled;
    };
}

function ObjectIron(map) {
    var lookup;
    lookup = [];
    for (i = 0, len = map.length; i < len; i += 1) {
        if (map[i].isRoot) {
            lookup.push("root");
        } else {
            lookup.push(map[i].name);
        }
    }
    var mergeValues = function(parentItem, childItem) {
        var name, parentValue, childValue;
        if (parentItem === null || childItem === null) {
            return;
        }
        for (name in parentItem) {
            if (parentItem.hasOwnProperty(name)) {
                if (!childItem.hasOwnProperty(name)) {
                    childItem[name] = parentItem[name];
                }
            }
        }
    }, mapProperties = function(properties, parent, child) {
        var i, len, property, parentValue, childValue;
        if (properties === null || properties.length === 0) {
            return;
        }
        for (i = 0, len = properties.length; i < len; i += 1) {
            property = properties[i];
            if (parent.hasOwnProperty(property.name)) {
                if (child.hasOwnProperty(property.name)) {
                    if (property.merge) {
                        parentValue = parent[property.name];
                        childValue = child[property.name];
                        if (typeof parentValue === "object" && typeof childValue === "object") {
                            mergeValues(parentValue, childValue);
                        } else {
                            if (property.mergeFunction != null) {
                                child[property.name] = property.mergeFunction(parentValue, childValue);
                            } else {
                                child[property.name] = parentValue + childValue;
                            }
                        }
                    }
                } else {
                    child[property.name] = parent[property.name];
                }
            }
        }
    }, mapItem = function(obj, node) {
        var item = obj, i, len, v, len2, array, childItem, childNode, property;
        if (item.children === null || item.children.length === 0) {
            return;
        }
        for (i = 0, len = item.children.length; i < len; i += 1) {
            childItem = item.children[i];
            if (node.hasOwnProperty(childItem.name)) {
                if (childItem.isArray) {
                    array = node[childItem.name + "_asArray"];
                    for (v = 0, len2 = array.length; v < len2; v += 1) {
                        childNode = array[v];
                        mapProperties(item.properties, node, childNode);
                        mapItem(childItem, childNode);
                    }
                } else {
                    childNode = node[childItem.name];
                    mapProperties(item.properties, node, childNode);
                    mapItem(childItem, childNode);
                }
            }
        }
    }, performMapping = function(source) {
        var i, len, pi, pp, item, node, array;
        if (source === null) {
            return source;
        }
        if (typeof source !== "object") {
            return source;
        }
        for (i = 0, len = lookup.length; i < len; i += 1) {
            if (lookup[i] === "root") {
                item = map[i];
                node = source;
                mapItem(item, node);
            }
        }
        for (pp in source) {
            if (source.hasOwnProperty(pp)) {
                pi = lookup.indexOf(pp);
                if (pi !== -1) {
                    item = map[pi];
                    if (item.isArray) {
                        array = source[pp + "_asArray"];
                        for (i = 0, len = array.length; i < len; i += 1) {
                            node = array[i];
                            mapItem(item, node);
                        }
                    } else {
                        node = source[pp];
                        mapItem(item, node);
                    }
                }
                performMapping(source[pp]);
            }
        }
        return source;
    };
    return {
        run: performMapping
    };
}

(function(scope) {
    "use strict";
    var dijon = {
        VERSION: "0.5.3"
    };
    dijon.System = function() {
        this._mappings = {};
        this._outlets = {};
        this._handlers = {};
        this.strictInjections = true;
        this.autoMapOutlets = false;
        this.postInjectionHook = "setup";
    };
    dijon.System.prototype = {
        _createAndSetupInstance: function(key, Clazz) {
            var instance = new Clazz();
            this.injectInto(instance, key);
            return instance;
        },
        _retrieveFromCacheOrCreate: function(key, overrideRules) {
            if (typeof overrideRules === "undefined") {
                overrideRules = false;
            }
            var output;
            if (this._mappings.hasOwnProperty(key)) {
                var config = this._mappings[key];
                if (!overrideRules && config.isSingleton) {
                    if (config.object == null) {
                        config.object = this._createAndSetupInstance(key, config.clazz);
                    }
                    output = config.object;
                } else {
                    if (config.clazz) {
                        output = this._createAndSetupInstance(key, config.clazz);
                    } else {
                        output = config.object;
                    }
                }
            } else {
                throw new Error(1e3);
            }
            return output;
        },
        mapOutlet: function(sourceKey, targetKey, outletName) {
            if (typeof sourceKey === "undefined") {
                throw new Error(1010);
            }
            targetKey = targetKey || "global";
            outletName = outletName || sourceKey;
            if (!this._outlets.hasOwnProperty(targetKey)) {
                this._outlets[targetKey] = {};
            }
            this._outlets[targetKey][outletName] = sourceKey;
            return this;
        },
        getObject: function(key) {
            if (typeof key === "undefined") {
                throw new Error(1020);
            }
            return this._retrieveFromCacheOrCreate(key);
        },
        mapValue: function(key, useValue) {
            if (typeof key === "undefined") {
                throw new Error(1030);
            }
            this._mappings[key] = {
                clazz: null,
                object: useValue,
                isSingleton: true
            };
            if (this.autoMapOutlets) {
                this.mapOutlet(key);
            }
            if (this.hasMapping(key)) {
                this.injectInto(useValue, key);
            }
            return this;
        },
        hasMapping: function(key) {
            if (typeof key === "undefined") {
                throw new Error(1040);
            }
            return this._mappings.hasOwnProperty(key);
        },
        mapClass: function(key, clazz) {
            if (typeof key === "undefined") {
                throw new Error(1050);
            }
            if (typeof clazz === "undefined") {
                throw new Error(1051);
            }
            this._mappings[key] = {
                clazz: clazz,
                object: null,
                isSingleton: false
            };
            if (this.autoMapOutlets) {
                this.mapOutlet(key);
            }
            return this;
        },
        mapSingleton: function(key, clazz) {
            if (typeof key === "undefined") {
                throw new Error(1060);
            }
            if (typeof clazz === "undefined") {
                throw new Error(1061);
            }
            this._mappings[key] = {
                clazz: clazz,
                object: null,
                isSingleton: true
            };
            if (this.autoMapOutlets) {
                this.mapOutlet(key);
            }
            return this;
        },
        instantiate: function(key) {
            if (typeof key === "undefined") {
                throw new Error(1070);
            }
            return this._retrieveFromCacheOrCreate(key, true);
        },
        injectInto: function(instance, key) {
            if (typeof instance === "undefined") {
                throw new Error(1080);
            }
            if (typeof instance === "object") {
                var o = [];
                if (this._outlets.hasOwnProperty("global")) {
                    o.push(this._outlets["global"]);
                }
                if (typeof key !== "undefined" && this._outlets.hasOwnProperty(key)) {
                    o.push(this._outlets[key]);
                }
                for (var i in o) {
                    var l = o[i];
                    for (var outlet in l) {
                        var source = l[outlet];
                        if (!this.strictInjections || outlet in instance) {
                            instance[outlet] = this.getObject(source);
                        }
                    }
                }
                if ("setup" in instance) {
                    instance.setup.call(instance);
                }
            }
            return this;
        },
        unmap: function(key) {
            if (typeof key === "undefined") {
                throw new Error(1090);
            }
            delete this._mappings[key];
            return this;
        },
        unmapOutlet: function(target, outlet) {
            if (typeof target === "undefined") {
                throw new Error(1100);
            }
            if (typeof outlet === "undefined") {
                throw new Error(1101);
            }
            delete this._outlets[target][outlet];
            return this;
        },
        mapHandler: function(eventName, key, handler, oneShot, passEvent) {
            if (typeof eventName === "undefined") {
                throw new Error(1110);
            }
            key = key || "global";
            handler = handler || eventName;
            if (typeof oneShot === "undefined") {
                oneShot = false;
            }
            if (typeof passEvent === "undefined") {
                passEvent = false;
            }
            if (!this._handlers.hasOwnProperty(eventName)) {
                this._handlers[eventName] = {};
            }
            if (!this._handlers[eventName].hasOwnProperty(key)) {
                this._handlers[eventName][key] = [];
            }
            this._handlers[eventName][key].push({
                handler: handler,
                oneShot: oneShot,
                passEvent: passEvent
            });
            return this;
        },
        unmapHandler: function(eventName, key, handler) {
            if (typeof eventName === "undefined") {
                throw new Error(1120);
            }
            key = key || "global";
            handler = handler || eventName;
            if (this._handlers.hasOwnProperty(eventName) && this._handlers[eventName].hasOwnProperty(key)) {
                var handlers = this._handlers[eventName][key];
                for (var i in handlers) {
                    var config = handlers[i];
                    if (config.handler === handler) {
                        handlers.splice(i, 1);
                        break;
                    }
                }
            }
            return this;
        },
        notify: function(eventName) {
            if (typeof eventName === "undefined") {
                throw new Error(1130);
            }
            var argsWithEvent = Array.prototype.slice.call(arguments);
            var argsClean = argsWithEvent.slice(1);
            if (this._handlers.hasOwnProperty(eventName)) {
                var handlers = this._handlers[eventName];
                for (var key in handlers) {
                    var configs = handlers[key];
                    var instance;
                    if (key !== "global") {
                        instance = this.getObject(key);
                    }
                    var toBeDeleted = [];
                    var i, n;
                    for (i = 0, n = configs.length; i < n; i++) {
                        var handler;
                        var config = configs[i];
                        if (instance && typeof config.handler === "string") {
                            handler = instance[config.handler];
                        } else {
                            handler = config.handler;
                        }
                        if (config.oneShot) {
                            toBeDeleted.unshift(i);
                        }
                        if (config.passEvent) {
                            handler.apply(instance, argsWithEvent);
                        } else {
                            handler.apply(instance, argsClean);
                        }
                    }
                    for (i = 0, n = toBeDeleted.length; i < n; i++) {
                        configs.splice(toBeDeleted[i], 1);
                    }
                }
            }
            return this;
        }
    };
    scope.dijon = dijon;
})(this);

if (typeof utils == "undefined") {
    var utils = {};
}

if (typeof utils.Math == "undefined") {
    utils.Math = {};
}

utils.Math.to64BitNumber = function(low, high) {
    var highNum, lowNum, expected;
    highNum = new goog.math.Long(0, high);
    lowNum = new goog.math.Long(low, 0);
    expected = highNum.add(lowNum);
    return expected.toNumber();
};

goog = {};

goog.math = {};

goog.math.Long = function(low, high) {
    this.low_ = low | 0;
    this.high_ = high | 0;
};

goog.math.Long.IntCache_ = {};

goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
        var cachedObj = goog.math.Long.IntCache_[value];
        if (cachedObj) {
            return cachedObj;
        }
    }
    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
        goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
};

goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
        return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
        return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
        return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
        return goog.math.Long.fromNumber(-value).negate();
    } else {
        return new goog.math.Long(value % goog.math.Long.TWO_PWR_32_DBL_ | 0, value / goog.math.Long.TWO_PWR_32_DBL_ | 0);
    }
};

goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
};

goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
        throw Error("number format error: empty string");
    }
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
        throw Error("radix out of range: " + radix);
    }
    if (str.charAt(0) == "-") {
        return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf("-") >= 0) {
        throw Error('number format error: interior "-" character: ' + str);
    }
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));
    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i);
        var value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = goog.math.Long.fromNumber(Math.pow(radix, size));
            result = result.multiply(power).add(goog.math.Long.fromNumber(value));
        } else {
            result = result.multiply(radixToPower);
            result = result.add(goog.math.Long.fromNumber(value));
        }
    }
    return result;
};

goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;

goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;

goog.math.Long.TWO_PWR_32_DBL_ = goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;

goog.math.Long.TWO_PWR_31_DBL_ = goog.math.Long.TWO_PWR_32_DBL_ / 2;

goog.math.Long.TWO_PWR_48_DBL_ = goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;

goog.math.Long.TWO_PWR_64_DBL_ = goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;

goog.math.Long.TWO_PWR_63_DBL_ = goog.math.Long.TWO_PWR_64_DBL_ / 2;

goog.math.Long.ZERO = goog.math.Long.fromInt(0);

goog.math.Long.ONE = goog.math.Long.fromInt(1);

goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);

goog.math.Long.MAX_VALUE = goog.math.Long.fromBits(4294967295 | 0, 2147483647 | 0);

goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 2147483648 | 0);

goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);

goog.math.Long.prototype.toInt = function() {
    return this.low_;
};

goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ + this.getLowBitsUnsigned();
};

goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
        throw Error("radix out of range: " + radix);
    }
    if (this.isZero()) {
        return "0";
    }
    if (this.isNegative()) {
        if (this.equals(goog.math.Long.MIN_VALUE)) {
            var radixLong = goog.math.Long.fromNumber(radix);
            var div = this.div(radixLong);
            var rem = div.multiply(radixLong).subtract(this);
            return div.toString(radix) + rem.toInt().toString(radix);
        } else {
            return "-" + this.negate().toString(radix);
        }
    }
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));
    var rem = this;
    var result = "";
    while (true) {
        var remDiv = rem.div(radixToPower);
        var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
        var digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero()) {
            return digits + result;
        } else {
            while (digits.length < 6) {
                digits = "0" + digits;
            }
            result = "" + digits + result;
        }
    }
};

goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
};

goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
};

goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return this.low_ >= 0 ? this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
};

goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
        if (this.equals(goog.math.Long.MIN_VALUE)) {
            return 64;
        } else {
            return this.negate().getNumBitsAbs();
        }
    } else {
        var val = this.high_ != 0 ? this.high_ : this.low_;
        for (var bit = 31; bit > 0; bit--) {
            if ((val & 1 << bit) != 0) {
                break;
            }
        }
        return this.high_ != 0 ? bit + 33 : bit + 1;
    }
};

goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
};

goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
};

goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
};

goog.math.Long.prototype.equals = function(other) {
    return this.high_ == other.high_ && this.low_ == other.low_;
};

goog.math.Long.prototype.notEquals = function(other) {
    return this.high_ != other.high_ || this.low_ != other.low_;
};

goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
};

goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
};

goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
};

goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
};

goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
        return 0;
    }
    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
        return -1;
    }
    if (!thisNeg && otherNeg) {
        return 1;
    }
    if (this.subtract(other).isNegative()) {
        return -1;
    } else {
        return 1;
    }
};

goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.MIN_VALUE;
    } else {
        return this.not().add(goog.math.Long.ONE);
    }
};

goog.math.Long.prototype.add = function(other) {
    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 65535;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 65535;
    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 65535;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 65535;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 65535;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 65535;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 65535;
    c48 += a48 + b48;
    c48 &= 65535;
    return goog.math.Long.fromBits(c16 << 16 | c00, c48 << 16 | c32);
};

goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
};

goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
        return goog.math.Long.ZERO;
    } else if (other.isZero()) {
        return goog.math.Long.ZERO;
    }
    if (this.equals(goog.math.Long.MIN_VALUE)) {
        return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }
    if (this.isNegative()) {
        if (other.isNegative()) {
            return this.negate().multiply(other.negate());
        } else {
            return this.negate().multiply(other).negate();
        }
    } else if (other.isNegative()) {
        return this.multiply(other.negate()).negate();
    }
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) && other.lessThan(goog.math.Long.TWO_PWR_24_)) {
        return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }
    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 65535;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 65535;
    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 65535;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 65535;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 65535;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 65535;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 65535;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 65535;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 65535;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 65535;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 65535;
    return goog.math.Long.fromBits(c16 << 16 | c00, c48 << 16 | c32);
};

goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
        throw Error("division by zero");
    } else if (this.isZero()) {
        return goog.math.Long.ZERO;
    }
    if (this.equals(goog.math.Long.MIN_VALUE)) {
        if (other.equals(goog.math.Long.ONE) || other.equals(goog.math.Long.NEG_ONE)) {
            return goog.math.Long.MIN_VALUE;
        } else if (other.equals(goog.math.Long.MIN_VALUE)) {
            return goog.math.Long.ONE;
        } else {
            var halfThis = this.shiftRight(1);
            var approx = halfThis.div(other).shiftLeft(1);
            if (approx.equals(goog.math.Long.ZERO)) {
                return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
            } else {
                var rem = this.subtract(other.multiply(approx));
                var result = approx.add(rem.div(other));
                return result;
            }
        }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ZERO;
    }
    if (this.isNegative()) {
        if (other.isNegative()) {
            return this.negate().div(other.negate());
        } else {
            return this.negate().div(other).negate();
        }
    } else if (other.isNegative()) {
        return this.div(other.negate()).negate();
    }
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
        var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));
        var log2 = Math.ceil(Math.log(approx) / Math.LN2);
        var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
        var approxRes = goog.math.Long.fromNumber(approx);
        var approxRem = approxRes.multiply(other);
        while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
            approx -= delta;
            approxRes = goog.math.Long.fromNumber(approx);
            approxRem = approxRes.multiply(other);
        }
        if (approxRes.isZero()) {
            approxRes = goog.math.Long.ONE;
        }
        res = res.add(approxRes);
        rem = rem.subtract(approxRem);
    }
    return res;
};

goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
};

goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
};

goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_, this.high_ & other.high_);
};

goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_, this.high_ | other.high_);
};

goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_, this.high_ ^ other.high_);
};

goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
        return this;
    } else {
        var low = this.low_;
        if (numBits < 32) {
            var high = this.high_;
            return goog.math.Long.fromBits(low << numBits, high << numBits | low >>> 32 - numBits);
        } else {
            return goog.math.Long.fromBits(0, low << numBits - 32);
        }
    }
};

goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
        return this;
    } else {
        var high = this.high_;
        if (numBits < 32) {
            var low = this.low_;
            return goog.math.Long.fromBits(low >>> numBits | high << 32 - numBits, high >> numBits);
        } else {
            return goog.math.Long.fromBits(high >> numBits - 32, high >= 0 ? 0 : -1);
        }
    }
};

goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
        return this;
    } else {
        var high = this.high_;
        if (numBits < 32) {
            var low = this.low_;
            return goog.math.Long.fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits);
        } else if (numBits == 32) {
            return goog.math.Long.fromBits(high, 0);
        } else {
            return goog.math.Long.fromBits(high >>> numBits - 32, 0);
        }
    }
};

var UTF8 = {};

UTF8.encode = function(s) {
    var u = [];
    for (var i = 0; i < s.length; ++i) {
        var c = s.charCodeAt(i);
        if (c < 128) {
            u.push(c);
        } else if (c < 2048) {
            u.push(192 | c >> 6);
            u.push(128 | 63 & c);
        } else if (c < 65536) {
            u.push(224 | c >> 12);
            u.push(128 | 63 & c >> 6);
            u.push(128 | 63 & c);
        } else {
            u.push(240 | c >> 18);
            u.push(128 | 63 & c >> 12);
            u.push(128 | 63 & c >> 6);
            u.push(128 | 63 & c);
        }
    }
    return u;
};

UTF8.decode = function(u) {
    var a = [];
    var i = 0;
    while (i < u.length) {
        var v = u[i++];
        if (v < 128) {} else if (v < 224) {
            v = (31 & v) << 6;
            v |= 63 & u[i++];
        } else if (v < 240) {
            v = (15 & v) << 12;
            v |= (63 & u[i++]) << 6;
            v |= 63 & u[i++];
        } else {
            v = (7 & v) << 18;
            v |= (63 & u[i++]) << 12;
            v |= (63 & u[i++]) << 6;
            v |= 63 & u[i++];
        }
        a.push(String.fromCharCode(v));
    }
    return a.join("");
};

var BASE64 = {};

(function(T) {
    var encodeArray = function(u) {
        var i = 0;
        var a = [];
        var n = 0 | u.length / 3;
        while (0 < n--) {
            var v = (u[i] << 16) + (u[i + 1] << 8) + u[i + 2];
            i += 3;
            a.push(T.charAt(63 & v >> 18));
            a.push(T.charAt(63 & v >> 12));
            a.push(T.charAt(63 & v >> 6));
            a.push(T.charAt(63 & v));
        }
        if (2 == u.length - i) {
            var v = (u[i] << 16) + (u[i + 1] << 8);
            a.push(T.charAt(63 & v >> 18));
            a.push(T.charAt(63 & v >> 12));
            a.push(T.charAt(63 & v >> 6));
            a.push("=");
        } else if (1 == u.length - i) {
            var v = u[i] << 16;
            a.push(T.charAt(63 & v >> 18));
            a.push(T.charAt(63 & v >> 12));
            a.push("==");
        }
        return a.join("");
    };
    var R = function() {
        var a = [];
        for (var i = 0; i < T.length; ++i) {
            a[T.charCodeAt(i)] = i;
        }
        a["=".charCodeAt(0)] = 0;
        return a;
    }();
    var decodeArray = function(s) {
        var i = 0;
        var u = [];
        var n = 0 | s.length / 4;
        while (0 < n--) {
            var v = (R[s.charCodeAt(i)] << 18) + (R[s.charCodeAt(i + 1)] << 12) + (R[s.charCodeAt(i + 2)] << 6) + R[s.charCodeAt(i + 3)];
            u.push(255 & v >> 16);
            u.push(255 & v >> 8);
            u.push(255 & v);
            i += 4;
        }
        if (u) {
            if ("=" == s.charAt(i - 2)) {
                u.pop();
                u.pop();
            } else if ("=" == s.charAt(i - 1)) {
                u.pop();
            }
        }
        return u;
    };
    var ASCII = {};
    ASCII.encode = function(s) {
        var u = [];
        for (var i = 0; i < s.length; ++i) {
            u.push(s.charCodeAt(i));
        }
        return u;
    };
    ASCII.decode = function(u) {
        for (var i = 0; i < s.length; ++i) {
            a[i] = String.fromCharCode(a[i]);
        }
        return a.join("");
    };
    BASE64.decodeArray = function(s) {
        var u = decodeArray(s);
        return new Uint8Array(u);
    };
    BASE64.encodeASCII = function(s) {
        var u = ASCII.encode(s);
        return encodeArray(u);
    };
    BASE64.decodeASCII = function(s) {
        var a = decodeArray(s);
        return ASCII.decode(a);
    };
    BASE64.encode = function(s) {
        var u = UTF8.encode(s);
        return encodeArray(u);
    };
    BASE64.decode = function(s) {
        var u = decodeArray(s);
        return UTF8.decode(u);
    };
})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");

if (undefined === btoa) {
    var btoa = BASE64.encode;
}

if (undefined === atob) {
    var atob = BASE64.decode;
}

MediaPlayer = function(aContext) {
    "use strict";
    var VERSION = "1.3.0", context = aContext, system, manifestLoader, abrController, element, source, protectionData = null, streamController, rulesController, manifestUpdater, metricsExt, metricsModel, videoModel, initialized = false, playing = false, autoPlay = true, scheduleWhilePaused = false, bufferMax = MediaPlayer.dependencies.BufferController.BUFFER_SIZE_REQUIRED, isReady = function() {
        return !!element && !!source;
    }, play = function() {
        if (!initialized) {
            throw "MediaPlayer not initialized!";
        }
        if (!this.capabilities.supportsMediaSource()) {
            this.errHandler.capabilityError("mediasource");
            return;
        }
        if (!element || !source) {
            throw "Missing view or source.";
        }
        playing = true;
        streamController = system.getObject("streamController");
        streamController.subscribe(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED, manifestUpdater);
        manifestLoader.subscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, streamController);
        manifestLoader.subscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, manifestUpdater);
        streamController.initialize();
        streamController.setVideoModel(videoModel);
        streamController.setAutoPlay(autoPlay);
        streamController.setProtectionData(protectionData);
        streamController.load(source);
        system.mapValue("scheduleWhilePaused", scheduleWhilePaused);
        system.mapOutlet("scheduleWhilePaused", "stream");
        system.mapOutlet("scheduleWhilePaused", "scheduleController");
        system.mapValue("bufferMax", bufferMax);
        system.mapOutlet("bufferMax", "bufferController");
        rulesController.initialize();
    }, doAutoPlay = function() {
        if (isReady()) {
            play.call(this);
        }
    }, getDVRInfoMetric = function() {
        var metric = metricsModel.getReadOnlyMetricsFor("video") || metricsModel.getReadOnlyMetricsFor("audio");
        return metricsExt.getCurrentDVRInfo(metric);
    }, getDVRWindowSize = function() {
        return getDVRInfoMetric.call(this).manifestInfo.DVRWindowSize;
    }, getDVRSeekOffset = function(value) {
        var metric = getDVRInfoMetric.call(this), val = metric.range.start + value;
        if (val > metric.range.end) {
            val = metric.range.end;
        }
        return val;
    }, seek = function(value) {
        videoModel.getElement().currentTime = this.getDVRSeekOffset(value);
    }, time = function() {
        var metric = getDVRInfoMetric.call(this);
        return metric === null ? 0 : this.duration() - (metric.range.end - metric.time);
    }, duration = function() {
        var metric = getDVRInfoMetric.call(this), range;
        if (metric === null) {
            return 0;
        }
        range = metric.range.end - metric.range.start;
        return range < metric.manifestInfo.DVRWindowSize ? range : metric.manifestInfo.DVRWindowSize;
    }, timeAsUTC = function() {
        var metric = getDVRInfoMetric.call(this), availableFrom, currentUTCTime;
        if (metric === null) {
            return 0;
        }
        availableFrom = metric.manifestInfo.availableFrom.getTime() / 1e3;
        currentUTCTime = this.time() + (availableFrom + metric.range.start);
        return currentUTCTime;
    }, durationAsUTC = function() {
        var metric = getDVRInfoMetric.call(this), availableFrom, currentUTCDuration;
        if (metric === null) {
            return 0;
        }
        availableFrom = metric.manifestInfo.availableFrom.getTime() / 1e3;
        currentUTCDuration = availableFrom + metric.range.start + this.duration();
        return currentUTCDuration;
    }, formatUTC = function(time, locales, hour12) {
        var dt = new Date(time * 1e3);
        var d = dt.toLocaleDateString(locales);
        var t = dt.toLocaleTimeString(locales, {
            hour12: hour12
        });
        return t + " " + d;
    }, convertToTimeCode = function(value) {
        value = Math.max(value, 0);
        var h = Math.floor(value / 3600);
        var m = Math.floor(value % 3600 / 60);
        var s = Math.floor(value % 3600 % 60);
        return (h === 0 ? "" : h < 10 ? "0" + h.toString() + ":" : h.toString() + ":") + (m < 10 ? "0" + m.toString() : m.toString()) + ":" + (s < 10 ? "0" + s.toString() : s.toString());
    }, updateRules = function(type, rules, override) {
        if (!rules || type === undefined || type === null) return;
        if (override) {
            rulesController.setRules(type, rules);
        } else {
            rulesController.addRules(type, rules);
        }
    }, doReset = function() {
        if (playing && streamController) {
            streamController.unsubscribe(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED, manifestUpdater);
            manifestLoader.unsubscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, streamController);
            manifestLoader.unsubscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, manifestUpdater);
            streamController.reset();
            abrController.reset();
            rulesController.reset();
            streamController = null;
            playing = false;
        }
    };
    system = new dijon.System();
    system.mapValue("system", system);
    system.mapOutlet("system");
    system.injectInto(context);
    return {
        notifier: undefined,
        debug: undefined,
        eventBus: undefined,
        capabilities: undefined,
        adapter: undefined,
        errHandler: undefined,
        uriQueryFragModel: undefined,
        videoElementExt: undefined,
        setup: function() {
            metricsExt = system.getObject("metricsExt");
            manifestLoader = system.getObject("manifestLoader");
            manifestUpdater = system.getObject("manifestUpdater");
            abrController = system.getObject("abrController");
            rulesController = system.getObject("rulesController");
            metricsModel = system.getObject("metricsModel");
        },
        addEventListener: function(type, listener, useCapture) {
            this.eventBus.addEventListener(type, listener, useCapture);
        },
        removeEventListener: function(type, listener, useCapture) {
            this.eventBus.removeEventListener(type, listener, useCapture);
        },
        getVersion: function() {
            return VERSION;
        },
        startup: function() {
            if (!initialized) {
                system.injectInto(this);
                initialized = true;
            }
        },
        getDebug: function() {
            return this.debug;
        },
        getVideoModel: function() {
            return videoModel;
        },
        setAutoPlay: function(value) {
            autoPlay = value;
        },
        getAutoPlay: function() {
            return autoPlay;
        },
        setScheduleWhilePaused: function(value) {
            scheduleWhilePaused = value;
        },
        getScheduleWhilePaused: function() {
            return scheduleWhilePaused;
        },
        setBufferMax: function(value) {
            bufferMax = value;
        },
        getBufferMax: function() {
            return bufferMax;
        },
        getMetricsExt: function() {
            return metricsExt;
        },
        getMetricsFor: function(type) {
            var metrics = metricsModel.getReadOnlyMetricsFor(type);
            return metrics;
        },
        getQualityFor: function(type) {
            return abrController.getQualityFor(type, streamController.getActiveStreamInfo());
        },
        setQualityFor: function(type, value) {
            abrController.setPlaybackQuality(type, streamController.getActiveStreamInfo(), value);
        },
        getAutoSwitchQuality: function() {
            return abrController.getAutoSwitchBitrate();
        },
        setAutoSwitchQuality: function(value) {
            abrController.setAutoSwitchBitrate(value);
        },
        setSchedulingRules: function(newRulesCollection) {
            updateRules.call(this, rulesController.SCHEDULING_RULE, newRulesCollection, true);
        },
        addSchedulingRules: function(newRulesCollection) {
            updateRules.call(this, rulesController.SCHEDULING_RULE, newRulesCollection, false);
        },
        setABRRules: function(newRulesCollection) {
            updateRules.call(this, rulesController.ABR_RULE, newRulesCollection, true);
        },
        addABRRules: function(newRulesCollection) {
            updateRules.call(this, rulesController.ABR_RULE, newRulesCollection, false);
        },
        attachView: function(view) {
            if (!initialized) {
                throw "MediaPlayer not initialized!";
            }
            element = view;
            videoModel = null;
            if (element) {
                videoModel = system.getObject("videoModel");
                videoModel.setElement(element);
            }
            doReset.call(this);
            if (isReady.call(this)) {
                doAutoPlay.call(this);
            }
        },
        attachSource: function(url) {
            if (!initialized) {
                throw "MediaPlayer not initialized!";
            }
            this.uriQueryFragModel.reset();
            source = this.uriQueryFragModel.parseURI(url);
            doReset.call(this);
            if (isReady.call(this)) {
                doAutoPlay.call(this);
            }
        },
        attachProtectionData: function(data) {
            protectionData = data;
        },
        reset: function() {
            this.attachSource(null);
            this.attachView(null);
        },
        play: play,
        isReady: isReady,
        seek: seek,
        time: time,
        duration: duration,
        timeAsUTC: timeAsUTC,
        durationAsUTC: durationAsUTC,
        getDVRWindowSize: getDVRWindowSize,
        getDVRSeekOffset: getDVRSeekOffset,
        formatUTC: formatUTC,
        convertToTimeCode: convertToTimeCode
    };
};

MediaPlayer.prototype = {
    constructor: MediaPlayer
};

MediaPlayer.dependencies = {};

MediaPlayer.dependencies.protection = {};

MediaPlayer.utils = {};

MediaPlayer.models = {};

MediaPlayer.vo = {};

MediaPlayer.vo.metrics = {};

MediaPlayer.vo.protection = {};

MediaPlayer.rules = {};

MediaPlayer.di = {};

MediaPlayer.di.Context = function() {
    "use strict";
    var mapProtectionModel = function() {
        var videoElement = document.createElement("video");
        if (MediaPlayer.models.ProtectionModel_3Feb2014.detect(videoElement)) {
            this.system.mapClass("protectionModel", MediaPlayer.models.ProtectionModel_3Feb2014);
        } else if (MediaPlayer.models.ProtectionModel_01b.detect(videoElement)) {
            this.system.mapClass("protectionModel", MediaPlayer.models.ProtectionModel_01b);
        } else {
            var debug = this.system.getObject("debug");
            debug.log("No supported version of EME detected on this user agent!");
            debug.log("Attempts to play encrypted content will fail!");
        }
    };
    return {
        system: undefined,
        setup: function() {
            this.system.autoMapOutlets = true;
            this.system.mapSingleton("debug", MediaPlayer.utils.Debug);
            this.system.mapSingleton("eventBus", MediaPlayer.utils.EventBus);
            this.system.mapSingleton("capabilities", MediaPlayer.utils.Capabilities);
            this.system.mapSingleton("textTrackExtensions", MediaPlayer.utils.TextTrackExtensions);
            this.system.mapSingleton("vttParser", MediaPlayer.utils.VTTParser);
            this.system.mapSingleton("ttmlParser", MediaPlayer.utils.TTMLParser);
            this.system.mapClass("videoModel", MediaPlayer.models.VideoModel);
            this.system.mapSingleton("manifestModel", MediaPlayer.models.ManifestModel);
            this.system.mapSingleton("metricsModel", MediaPlayer.models.MetricsModel);
            this.system.mapSingleton("uriQueryFragModel", MediaPlayer.models.URIQueryAndFragmentModel);
            this.system.mapSingleton("ksPlayReady", MediaPlayer.dependencies.protection.KeySystem_PlayReady);
            this.system.mapSingleton("ksWidevine", MediaPlayer.dependencies.protection.KeySystem_Widevine);
            this.system.mapSingleton("ksClearKey", MediaPlayer.dependencies.protection.KeySystem_ClearKey);
            this.system.mapSingleton("requestModifierExt", MediaPlayer.dependencies.RequestModifierExtensions);
            this.system.mapSingleton("textSourceBuffer", MediaPlayer.dependencies.TextSourceBuffer);
            this.system.mapSingleton("mediaSourceExt", MediaPlayer.dependencies.MediaSourceExtensions);
            this.system.mapSingleton("sourceBufferExt", MediaPlayer.dependencies.SourceBufferExtensions);
            this.system.mapSingleton("abrController", MediaPlayer.dependencies.AbrController);
            this.system.mapSingleton("errHandler", MediaPlayer.dependencies.ErrorHandler);
            this.system.mapSingleton("videoExt", MediaPlayer.dependencies.VideoModelExtensions);
            this.system.mapSingleton("protectionExt", MediaPlayer.dependencies.ProtectionExtensions);
            this.system.mapClass("protectionController", MediaPlayer.dependencies.ProtectionController);
            this.system.mapClass("playbackController", MediaPlayer.dependencies.PlaybackController);
            mapProtectionModel.call(this);
            this.system.mapSingleton("liveEdgeFinder", MediaPlayer.dependencies.LiveEdgeFinder);
            this.system.mapClass("metrics", MediaPlayer.models.MetricsList);
            this.system.mapClass("downloadRatioRule", MediaPlayer.rules.DownloadRatioRule);
            this.system.mapClass("insufficientBufferRule", MediaPlayer.rules.InsufficientBufferRule);
            this.system.mapClass("limitSwitchesRule", MediaPlayer.rules.LimitSwitchesRule);
            this.system.mapClass("bufferOccupancyRule", MediaPlayer.rules.BufferOccupancyRule);
            this.system.mapClass("throughputRule", MediaPlayer.rules.ThroughputRule);
            this.system.mapSingleton("abrRulesCollection", MediaPlayer.rules.ABRRulesCollection);
            this.system.mapSingleton("rulesController", MediaPlayer.rules.RulesController);
            this.system.mapClass("bufferLevelRule", MediaPlayer.rules.BufferLevelRule);
            this.system.mapClass("pendingRequestsRule", MediaPlayer.rules.PendingRequestsRule);
            this.system.mapClass("playbackTimeRule", MediaPlayer.rules.PlaybackTimeRule);
            this.system.mapClass("sameTimeRequestRule", MediaPlayer.rules.SameTimeRequestRule);
            this.system.mapSingleton("scheduleRulesCollection", MediaPlayer.rules.ScheduleRulesCollection);
            this.system.mapClass("liveEdgeBinarySearchRule", MediaPlayer.rules.LiveEdgeBinarySearchRule);
            this.system.mapClass("liveEdgeWithTimeSynchronizationRule", MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule);
            this.system.mapSingleton("synchronizationRulesCollection", MediaPlayer.rules.SynchronizationRulesCollection);
            this.system.mapClass("streamProcessor", MediaPlayer.dependencies.StreamProcessor);
            this.system.mapClass("eventController", MediaPlayer.dependencies.EventController);
            this.system.mapClass("textController", MediaPlayer.dependencies.TextController);
            this.system.mapClass("bufferController", MediaPlayer.dependencies.BufferController);
            this.system.mapSingleton("manifestLoader", MediaPlayer.dependencies.ManifestLoader);
            this.system.mapSingleton("manifestUpdater", MediaPlayer.dependencies.ManifestUpdater);
            this.system.mapClass("fragmentController", MediaPlayer.dependencies.FragmentController);
            this.system.mapClass("fragmentLoader", MediaPlayer.dependencies.FragmentLoader);
            this.system.mapClass("fragmentModel", MediaPlayer.dependencies.FragmentModel);
            this.system.mapSingleton("streamController", MediaPlayer.dependencies.StreamController);
            this.system.mapClass("stream", MediaPlayer.dependencies.Stream);
            this.system.mapClass("scheduleController", MediaPlayer.dependencies.ScheduleController);
            this.system.mapSingleton("timeSyncController", MediaPlayer.dependencies.TimeSyncController);
            this.system.mapSingleton("notifier", MediaPlayer.dependencies.Notifier);
        }
    };
};

Dash = function() {
    "use strict";
    return {
        modules: {},
        dependencies: {},
        vo: {},
        di: {}
    };
}();

Dash.di.DashContext = function() {
    "use strict";
    return {
        system: undefined,
        setup: function() {
            Dash.di.DashContext.prototype.setup.call(this);
            this.system.mapClass("parser", Dash.dependencies.DashParser);
            this.system.mapClass("indexHandler", Dash.dependencies.DashHandler);
            this.system.mapSingleton("baseURLExt", Dash.dependencies.BaseURLExtensions);
            this.system.mapClass("fragmentExt", Dash.dependencies.FragmentExtensions);
            this.system.mapClass("trackController", Dash.dependencies.RepresentationController);
            this.system.mapSingleton("manifestExt", Dash.dependencies.DashManifestExtensions);
            this.system.mapSingleton("metricsExt", Dash.dependencies.DashMetricsExtensions);
            this.system.mapSingleton("timelineConverter", Dash.dependencies.TimelineConverter);
            this.system.mapSingleton("adapter", Dash.dependencies.DashAdapter);
        }
    };
};

Dash.di.DashContext.prototype = new MediaPlayer.di.Context();

Dash.di.DashContext.prototype.constructor = Dash.di.DashContext;

Dash.dependencies.DashAdapter = function() {
    "use strict";
    var periods = [], adaptations = {}, getRepresentationForTrackInfo = function(trackInfo, representationController) {
        return representationController.getRepresentationForQuality(trackInfo.quality);
    }, getAdaptationForMediaInfo = function(mediaInfo) {
        return adaptations[mediaInfo.streamInfo.id][mediaInfo.index];
    }, getPeriodForStreamInfo = function(streamInfo) {
        var period, ln = periods.length, i = 0;
        for (i; i < ln; i += 1) {
            period = periods[i];
            if (streamInfo.id === period.id) return period;
        }
        return null;
    }, convertRepresentationToTrackInfo = function(representation) {
        var trackInfo = new MediaPlayer.vo.TrackInfo(), a = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index], r = this.manifestExt.getRepresentationFor(representation.index, a);
        trackInfo.id = representation.id;
        trackInfo.quality = representation.index;
        trackInfo.bandwidth = this.manifestExt.getBandwidth(r);
        trackInfo.DVRWindow = representation.segmentAvailabilityRange;
        trackInfo.fragmentDuration = representation.segmentDuration || (representation.segments && representation.segments.length > 0 ? representation.segments[0].duration : NaN);
        trackInfo.MSETimeOffset = representation.MSETimeOffset;
        trackInfo.useCalculatedLiveEdgeTime = representation.useCalculatedLiveEdgeTime;
        trackInfo.mediaInfo = convertAdaptationToMediaInfo.call(this, representation.adaptation);
        return trackInfo;
    }, convertAdaptationToMediaInfo = function(adaptation) {
        var mediaInfo = new MediaPlayer.vo.MediaInfo(), self = this, a = adaptation.period.mpd.manifest.Period_asArray[adaptation.period.index].AdaptationSet_asArray[adaptation.index];
        mediaInfo.id = adaptation.id;
        mediaInfo.index = adaptation.index;
        mediaInfo.type = adaptation.type;
        mediaInfo.streamInfo = convertPeriodToStreamInfo.call(this, adaptation.period);
        mediaInfo.trackCount = this.manifestExt.getRepresentationCount(a);
        mediaInfo.lang = this.manifestExt.getLanguageForAdaptation(a);
        mediaInfo.codec = this.manifestExt.getCodec(a);
        mediaInfo.mimeType = this.manifestExt.getMimeType(a);
        mediaInfo.contentProtection = this.manifestExt.getContentProtectionData(a);
        if (mediaInfo.contentProtection) {
            mediaInfo.contentProtection.forEach(function(item) {
                item.KID = self.manifestExt.getKID(item);
            });
        }
        mediaInfo.isText = this.manifestExt.getIsTextTrack(mediaInfo.mimeType);
        return mediaInfo;
    }, convertPeriodToStreamInfo = function(period) {
        var streamInfo = new MediaPlayer.vo.StreamInfo(), THRESHOLD = 1;
        streamInfo.id = period.id;
        streamInfo.index = period.index;
        streamInfo.start = period.start;
        streamInfo.duration = period.duration;
        streamInfo.manifestInfo = convertMpdToManifestInfo.call(this, period.mpd);
        streamInfo.isLast = Math.abs(streamInfo.start + streamInfo.duration - streamInfo.manifestInfo.duration) < THRESHOLD;
        return streamInfo;
    }, convertMpdToManifestInfo = function(mpd) {
        var manifestInfo = new MediaPlayer.vo.ManifestInfo(), manifest = this.manifestModel.getValue();
        manifestInfo.DVRWindowSize = mpd.timeShiftBufferDepth;
        manifestInfo.loadedTime = mpd.manifest.loadedTime;
        manifestInfo.availableFrom = mpd.availabilityStartTime;
        manifestInfo.minBufferTime = mpd.manifest.minBufferTime;
        manifestInfo.maxFragmentDuration = mpd.maxSegmentDuration;
        manifestInfo.duration = this.manifestExt.getDuration(manifest);
        manifestInfo.isDynamic = this.manifestExt.getIsDynamic(manifest);
        return manifestInfo;
    }, getMediaInfoForType = function(manifest, streamInfo, type) {
        var periodInfo = getPeriodForStreamInfo(streamInfo), periodId = periodInfo.id, data = this.manifestExt.getAdaptationForType(manifest, streamInfo.index, type), idx;
        if (!data) return null;
        idx = this.manifestExt.getIndexForAdaptation(data, manifest, streamInfo.index);
        adaptations[periodId] = adaptations[periodId] || this.manifestExt.getAdaptationsForPeriod(manifest, periodInfo);
        return convertAdaptationToMediaInfo.call(this, adaptations[periodId][idx]);
    }, getStreamsInfoFromManifest = function(manifest) {
        var mpd, streams = [], ln, i;
        if (!manifest) return null;
        mpd = this.manifestExt.getMpd(manifest);
        periods = this.manifestExt.getRegularPeriods(manifest, mpd);
        adaptations = {};
        ln = periods.length;
        for (i = 0; i < ln; i += 1) {
            streams.push(convertPeriodToStreamInfo.call(this, periods[i]));
        }
        return streams;
    }, getMpdInfo = function(manifest) {
        var mpd = this.manifestExt.getMpd(manifest);
        return convertMpdToManifestInfo.call(this, mpd);
    }, getInitRequest = function(streamProcessor, quality) {
        var representation = streamProcessor.trackController.getRepresentationForQuality(quality);
        return streamProcessor.indexHandler.getInitRequest(representation);
    }, getNextFragmentRequest = function(streamProcessor, trackInfo) {
        var representation = getRepresentationForTrackInfo(trackInfo, streamProcessor.trackController);
        return streamProcessor.indexHandler.getNextSegmentRequest(representation);
    }, getFragmentRequestForTime = function(streamProcessor, trackInfo, time, options) {
        var representation = getRepresentationForTrackInfo(trackInfo, streamProcessor.trackController);
        return streamProcessor.indexHandler.getSegmentRequestForTime(representation, time, options);
    }, generateFragmentRequestForTime = function(streamProcessor, trackInfo, time) {
        var representation = getRepresentationForTrackInfo(trackInfo, streamProcessor.trackController), request = streamProcessor.indexHandler.generateSegmentRequestForTime(representation, time);
        return request;
    }, getIndexHandlerTime = function(streamProcessor) {
        return streamProcessor.indexHandler.getCurrentTime();
    }, setIndexHandlerTime = function(streamProcessor, value) {
        return streamProcessor.indexHandler.setCurrentTime(value);
    }, updateData = function(streamProcessor) {
        var periodInfo = getPeriodForStreamInfo(streamProcessor.getStreamInfo()), mediaInfo = streamProcessor.getMediaInfo(), adaptation = getAdaptationForMediaInfo(mediaInfo), manifest = this.manifestModel.getValue(), type = streamProcessor.getType(), id, data;
        id = mediaInfo.id;
        data = id ? this.manifestExt.getAdaptationForId(id, manifest, periodInfo.index) : this.manifestExt.getAdaptationForIndex(mediaInfo.index, manifest, periodInfo.index);
        streamProcessor.setMediaInfo(mediaInfo);
        streamProcessor.trackController.updateData(data, adaptation, type);
    }, getTrackInfoForQuality = function(representationController, quality) {
        var representation = representationController.getRepresentationForQuality(quality);
        return representation ? convertRepresentationToTrackInfo.call(this, representation) : null;
    }, getCurrentTrackInfo = function(representationController) {
        var representation = representationController.getCurrentRepresentation();
        return representation ? convertRepresentationToTrackInfo.call(this, representation) : null;
    }, getEvent = function(eventBox, eventStreams, startTime) {
        var event = new Dash.vo.Event(), schemeIdUri = eventBox[0], value = eventBox[1], timescale = eventBox[2], presentationTimeDelta = eventBox[3], duration = eventBox[4], id = eventBox[5], messageData = eventBox[6], presentationTime = startTime * timescale + presentationTimeDelta;
        if (!eventStreams[schemeIdUri]) return null;
        event.eventStream = eventStreams[schemeIdUri];
        event.eventStream.value = value;
        event.eventStream.timescale = timescale;
        event.duration = duration;
        event.id = id;
        event.presentationTime = presentationTime;
        event.messageData = messageData;
        event.presentationTimeDelta = presentationTimeDelta;
        return event;
    }, getEventsFor = function(info, streamProcessor) {
        var manifest = this.manifestModel.getValue(), events = [];
        if (info instanceof MediaPlayer.vo.StreamInfo) {
            events = this.manifestExt.getEventsForPeriod(manifest, getPeriodForStreamInfo(info));
        } else if (info instanceof MediaPlayer.vo.MediaInfo) {
            events = this.manifestExt.getEventStreamForAdaptationSet(manifest, getAdaptationForMediaInfo(info));
        } else if (info instanceof MediaPlayer.vo.TrackInfo) {
            events = this.manifestExt.getEventStreamForRepresentation(manifest, getRepresentationForTrackInfo(info, streamProcessor.trackController));
        }
        return events;
    };
    return {
        system: undefined,
        manifestExt: undefined,
        manifestModel: undefined,
        timelineConverter: undefined,
        metricsList: {
            TCP_CONNECTION: "TcpConnection",
            HTTP_REQUEST: "HttpRequest",
            HTTP_REQUEST_TRACE: "HttpRequestTrace",
            TRACK_SWITCH: "RepresentationSwitch",
            BUFFER_LEVEL: "BufferLevel",
            BUFFER_STATE: "BufferState",
            DVR_INFO: "DVRInfo",
            DROPPED_FRAMES: "DroppedFrames",
            SCHEDULING_INFO: "SchedulingInfo",
            MANIFEST_UPDATE: "ManifestUpdate",
            MANIFEST_UPDATE_STREAM_INFO: "ManifestUpdatePeriodInfo",
            MANIFEST_UPDATE_TRACK_INFO: "ManifestUpdateRepresentationInfo",
            PLAY_LIST: "PlayList",
            PLAY_LIST_TRACE: "PlayListTrace"
        },
        convertDataToTrack: convertRepresentationToTrackInfo,
        convertDataToMedia: convertAdaptationToMediaInfo,
        convertDataToStream: convertPeriodToStreamInfo,
        getDataForTrack: getRepresentationForTrackInfo,
        getDataForMedia: getAdaptationForMediaInfo,
        getDataForStream: getPeriodForStreamInfo,
        getStreamsInfo: getStreamsInfoFromManifest,
        getManifestInfo: getMpdInfo,
        getMediaInfoForType: getMediaInfoForType,
        getCurrentTrackInfo: getCurrentTrackInfo,
        getTrackInfoForQuality: getTrackInfoForQuality,
        updateData: updateData,
        getInitRequest: getInitRequest,
        getNextFragmentRequest: getNextFragmentRequest,
        getFragmentRequestForTime: getFragmentRequestForTime,
        generateFragmentRequestForTime: generateFragmentRequestForTime,
        getIndexHandlerTime: getIndexHandlerTime,
        setIndexHandlerTime: setIndexHandlerTime,
        getEventsFor: getEventsFor,
        getEvent: getEvent,
        reset: function() {
            periods = [];
            adaptations = {};
        }
    };
};

Dash.dependencies.DashAdapter.prototype = {
    constructor: Dash.dependencies.DashAdapter
};

Dash.create = function(video, source, context) {
    if (typeof video === undefined || video.nodeName != "VIDEO") return;
    var player, videoID = video.id || video.name || "video element";
    context = context || new Dash.di.DashContext();
    source = source || [].slice.call(video.querySelectorAll("source")).filter(function(s) {
        return s.type == Dash.supportedManifestMimeTypes.mimeType;
    })[0];
    player = new MediaPlayer(context);
    player.startup();
    player.attachView(video);
    player.setAutoPlay(video.autoplay);
    player.attachSource(source.src);
    player.getDebug().log("Converted " + videoID + " to dash.js player and added content: " + source.src);
    return player;
};

Dash.createAll = function(className, scope, context) {
    var aPlayers = [];
    className = className || ".dashjs-player";
    scope = scope || document;
    context = context || new Dash.di.DashContext();
    var videos = scope.querySelectorAll(className);
    for (var i = 0; i < videos.length; i++) {
        var player = Dash.create(videos[i], undefined, context);
        aPlayers.push(player);
    }
    return aPlayers;
};

Dash.supportedManifestMimeTypes = {
    mimeType: "application/dash+xml"
};

Dash.dependencies.DashHandler = function() {
    "use strict";
    var index = -1, requestedTime, isDynamic, type, currentTime = 0, absUrl = new RegExp("^(?:(?:[a-z]+:)?/)?/", "i"), zeroPadToLength = function(numStr, minStrLength) {
        while (numStr.length < minStrLength) {
            numStr = "0" + numStr;
        }
        return numStr;
    }, replaceTokenForTemplate = function(url, token, value) {
        var startPos = 0, endPos = 0, tokenLen = token.length, formatTag = "%0", formatTagLen = formatTag.length, formatTagPos, specifier, width, paddedValue;
        while (true) {
            startPos = url.indexOf("$" + token);
            if (startPos < 0) {
                return url;
            }
            endPos = url.indexOf("$", startPos + tokenLen);
            if (endPos < 0) {
                return url;
            }
            formatTagPos = url.indexOf(formatTag, startPos + tokenLen);
            if (formatTagPos > startPos && formatTagPos < endPos) {
                specifier = url.charAt(endPos - 1);
                width = parseInt(url.substring(formatTagPos + formatTagLen, endPos - 1), 10);
                switch (specifier) {
                  case "d":
                  case "i":
                  case "u":
                    paddedValue = zeroPadToLength(value.toString(), width);
                    break;

                  case "x":
                    paddedValue = zeroPadToLength(value.toString(16), width);
                    break;

                  case "X":
                    paddedValue = zeroPadToLength(value.toString(16), width).toUpperCase();
                    break;

                  case "o":
                    paddedValue = zeroPadToLength(value.toString(8), width);
                    break;

                  default:
                    this.debug.log("Unsupported/invalid IEEE 1003.1 format identifier string in URL");
                    return url;
                }
            } else {
                paddedValue = value;
            }
            url = url.substring(0, startPos) + paddedValue + url.substring(endPos + 1);
        }
    }, unescapeDollarsInTemplate = function(url) {
        return url.split("$$").join("$");
    }, replaceIDForTemplate = function(url, value) {
        if (value === null || url.indexOf("$RepresentationID$") === -1) {
            return url;
        }
        var v = value.toString();
        return url.split("$RepresentationID$").join(v);
    }, getNumberForSegment = function(segment, segmentIndex) {
        return segment.representation.startNumber + segmentIndex;
    }, getRequestUrl = function(destination, representation) {
        var baseURL = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].BaseURL, url;
        if (destination === baseURL) {
            url = destination;
        } else if (absUrl.test(destination)) {
            url = destination;
        } else {
            url = baseURL + destination;
        }
        return url;
    }, generateInitRequest = function(representation, mediaType) {
        var self = this, period, request = new MediaPlayer.vo.FragmentRequest(), presentationStartTime;
        period = representation.adaptation.period;
        request.mediaType = mediaType;
        request.type = "Initialization Segment";
        request.url = getRequestUrl(representation.initialization, representation);
        request.range = representation.range;
        presentationStartTime = period.start;
        request.availabilityStartTime = self.timelineConverter.calcAvailabilityStartTimeFromPresentationTime(presentationStartTime, representation.adaptation.period.mpd, isDynamic);
        request.availabilityEndTime = self.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(presentationStartTime + period.duration, period.mpd, isDynamic);
        request.quality = representation.index;
        return request;
    }, getInit = function(representation) {
        var self = this, request;
        if (!representation) return null;
        request = generateInitRequest.call(self, representation, type);
        return request;
    }, isMediaFinished = function(representation) {
        var sDuration, period = representation.adaptation.period, isFinished = false, seg, fTime;
        if (isDynamic) {
            isFinished = false;
        } else {
            if (index < 0) {
                isFinished = false;
            } else if (index < representation.availableSegmentsNumber) {
                seg = getSegmentByIndex(index, representation);
                if (seg) {
                    fTime = seg.presentationStartTime - period.start;
                    sDuration = representation.adaptation.period.duration;
                    this.debug.log(representation.segmentInfoType + ": " + fTime + " / " + sDuration);
                    isFinished = fTime >= sDuration;
                }
            } else {
                isFinished = true;
            }
        }
        return isFinished;
    }, getIndexBasedSegment = function(representation, index) {
        var self = this, seg, duration, presentationStartTime, presentationEndTime;
        duration = representation.segmentDuration;
        presentationStartTime = representation.adaptation.period.start + index * duration;
        presentationEndTime = presentationStartTime + duration;
        seg = new Dash.vo.Segment();
        seg.representation = representation;
        seg.duration = duration;
        seg.presentationStartTime = presentationStartTime;
        seg.mediaStartTime = self.timelineConverter.calcMediaTimeFromPresentationTime(seg.presentationStartTime, representation);
        seg.availabilityStartTime = self.timelineConverter.calcAvailabilityStartTimeFromPresentationTime(seg.presentationStartTime, representation.adaptation.period.mpd, isDynamic);
        seg.availabilityEndTime = self.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(presentationEndTime, representation.adaptation.period.mpd, isDynamic);
        seg.wallStartTime = self.timelineConverter.calcWallTimeForSegment(seg, isDynamic);
        seg.replacementNumber = getNumberForSegment(seg, index);
        seg.availabilityIdx = index;
        return seg;
    }, getSegmentsFromTimeline = function(representation) {
        var self = this, template = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].SegmentTemplate, timeline = template.SegmentTimeline, isAvailableSegmentNumberCalculated = representation.availableSegmentsNumber > 0, maxSegmentsAhead = 10, segments = [], fragments, frag, i, len, j, repeat, repeatEndTime, nextFrag, time = 0, scaledTime = 0, availabilityIdx = -1, calculatedRange, hasEnoughSegments, requiredMediaTime, startIdx, endIdx, fTimescale, createSegment = function(s) {
            return getTimeBasedSegment.call(self, representation, time, s.d, fTimescale, template.media, s.mediaRange, availabilityIdx);
        };
        fTimescale = representation.timescale;
        fragments = timeline.S_asArray;
        calculatedRange = decideSegmentListRangeForTimeline.call(self, representation);
        if (calculatedRange) {
            startIdx = calculatedRange.start;
            endIdx = calculatedRange.end;
        } else {
            requiredMediaTime = self.timelineConverter.calcMediaTimeFromPresentationTime(requestedTime || 0, representation);
        }
        for (i = 0, len = fragments.length; i < len; i += 1) {
            frag = fragments[i];
            repeat = 0;
            if (frag.hasOwnProperty("r")) {
                repeat = frag.r;
            }
            if (frag.hasOwnProperty("t")) {
                time = frag.t;
                scaledTime = time / fTimescale;
            }
            if (repeat < 0) {
                nextFrag = fragments[i + 1];
                if (nextFrag && nextFrag.hasOwnProperty("t")) {
                    repeatEndTime = nextFrag.t / fTimescale;
                } else {
                    repeatEndTime = self.timelineConverter.calcMediaTimeFromPresentationTime(representation.segmentAvailabilityRange.end, representation);
                    representation.segmentDuration = frag.d / fTimescale;
                }
                repeat = Math.ceil((repeatEndTime - scaledTime) / (frag.d / fTimescale)) - 1;
            }
            if (hasEnoughSegments) {
                if (isAvailableSegmentNumberCalculated) break;
                availabilityIdx += repeat + 1;
                continue;
            }
            for (j = 0; j <= repeat; j += 1) {
                availabilityIdx += 1;
                if (calculatedRange) {
                    if (availabilityIdx > endIdx) {
                        hasEnoughSegments = true;
                        if (isAvailableSegmentNumberCalculated) break;
                        continue;
                    }
                    if (availabilityIdx >= startIdx) {
                        segments.push(createSegment.call(self, frag));
                    }
                } else {
                    if (segments.length > maxSegmentsAhead) {
                        hasEnoughSegments = true;
                        if (isAvailableSegmentNumberCalculated) break;
                        continue;
                    }
                    if (scaledTime >= requiredMediaTime - frag.d / fTimescale) {
                        segments.push(createSegment.call(self, frag));
                    }
                }
                time += frag.d;
                scaledTime = time / fTimescale;
            }
        }
        if (!isAvailableSegmentNumberCalculated) {
            representation.availableSegmentsNumber = availabilityIdx + 1;
        }
        return segments;
    }, getSegmentsFromTemplate = function(representation) {
        var segments = [], self = this, template = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].SegmentTemplate, duration = representation.segmentDuration, availabilityWindow = representation.segmentAvailabilityRange, segmentRange, periodSegIdx, startIdx, endIdx, seg = null, start, url = null;
        start = representation.startNumber;
        segmentRange = decideSegmentListRangeForTemplate.call(self, representation);
        startIdx = segmentRange.start;
        endIdx = segmentRange.end;
        for (periodSegIdx = startIdx; periodSegIdx <= endIdx; periodSegIdx += 1) {
            seg = getIndexBasedSegment.call(self, representation, periodSegIdx);
            seg.replacementTime = (start + periodSegIdx - 1) * representation.segmentDuration;
            url = template.media;
            url = replaceTokenForTemplate(url, "Number", seg.replacementNumber);
            url = replaceTokenForTemplate(url, "Time", seg.replacementTime);
            seg.media = url;
            segments.push(seg);
            seg = null;
        }
        representation.availableSegmentsNumber = Math.ceil((availabilityWindow.end - availabilityWindow.start) / duration);
        return segments;
    }, decideSegmentListRangeForTemplate = function(representation) {
        var self = this, duration = representation.segmentDuration, minBufferTime = representation.adaptation.period.mpd.manifest.minBufferTime, availabilityWindow = representation.segmentAvailabilityRange, periodRelativeRange = {
            start: self.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(representation, availabilityWindow.start),
            end: self.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(representation, availabilityWindow.end)
        }, originAvailabilityTime = NaN, originSegment = null, currentSegmentList = representation.segments, availabilityLowerLimit = 2 * duration, availabilityUpperLimit = Math.max(2 * minBufferTime, 10 * duration), start, end, range;
        if (!periodRelativeRange) {
            periodRelativeRange = self.timelineConverter.calcSegmentAvailabilityRange(representation, isDynamic);
        }
        if (isDynamic && !self.timelineConverter.isTimeSyncCompleted()) {
            start = Math.floor(periodRelativeRange.start / duration);
            end = Math.floor(periodRelativeRange.end / duration);
            range = {
                start: start,
                end: end
            };
            return range;
        }
        if (currentSegmentList) {
            originSegment = getSegmentByIndex(index, representation);
            originAvailabilityTime = originSegment ? self.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(representation, originSegment.presentationStartTime) : index > 0 ? index * duration : self.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(representation, requestedTime || currentSegmentList[0].presentationStartTime);
        } else {
            originAvailabilityTime = index > 0 ? index * duration : isDynamic ? periodRelativeRange.end : periodRelativeRange.start;
        }
        start = Math.floor(Math.max(originAvailabilityTime - availabilityLowerLimit, periodRelativeRange.start) / duration);
        end = Math.floor(Math.min(start + availabilityUpperLimit / duration, periodRelativeRange.end / duration));
        range = {
            start: start,
            end: end
        };
        return range;
    }, decideSegmentListRangeForTimeline = function() {
        var availabilityLowerLimit = 2, availabilityUpperLimit = 10, firstIdx = 0, lastIdx = Number.POSITIVE_INFINITY, start, end, range;
        if (isDynamic && !this.timelineConverter.isTimeSyncCompleted()) {
            range = {
                start: firstIdx,
                end: lastIdx
            };
            return range;
        }
        if (!isDynamic && requestedTime || index < 0) return null;
        start = Math.max(index - availabilityLowerLimit, firstIdx);
        end = Math.min(index + availabilityUpperLimit, lastIdx);
        range = {
            start: start,
            end: end
        };
        return range;
    }, getTimeBasedSegment = function(representation, time, duration, fTimescale, url, range, index) {
        var self = this, scaledTime = time / fTimescale, scaledDuration = Math.min(duration / fTimescale, representation.adaptation.period.mpd.maxSegmentDuration), presentationStartTime, presentationEndTime, seg;
        presentationStartTime = self.timelineConverter.calcPresentationTimeFromMediaTime(scaledTime, representation);
        presentationEndTime = presentationStartTime + scaledDuration;
        seg = new Dash.vo.Segment();
        seg.representation = representation;
        seg.duration = scaledDuration;
        seg.mediaStartTime = scaledTime;
        seg.presentationStartTime = presentationStartTime;
        seg.availabilityStartTime = representation.adaptation.period.mpd.manifest.loadedTime;
        seg.availabilityEndTime = self.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(presentationEndTime, representation.adaptation.period.mpd, isDynamic);
        seg.wallStartTime = self.timelineConverter.calcWallTimeForSegment(seg, isDynamic);
        seg.replacementTime = time;
        seg.replacementNumber = getNumberForSegment(seg, index);
        url = replaceTokenForTemplate(url, "Number", seg.replacementNumber);
        url = replaceTokenForTemplate(url, "Time", seg.replacementTime);
        seg.media = url;
        seg.mediaRange = range;
        seg.availabilityIdx = index;
        return seg;
    }, getSegmentsFromList = function(representation) {
        var self = this, segments = [], list = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].SegmentList, baseURL = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].BaseURL, len = list.SegmentURL_asArray.length, periodSegIdx, seg, s, range, startIdx, endIdx, start;
        start = representation.startNumber;
        range = decideSegmentListRangeForTemplate.call(self, representation);
        startIdx = Math.max(range.start, 0);
        endIdx = Math.min(range.end, list.SegmentURL_asArray.length - 1);
        for (periodSegIdx = startIdx; periodSegIdx <= endIdx; periodSegIdx += 1) {
            s = list.SegmentURL_asArray[periodSegIdx];
            seg = getIndexBasedSegment.call(self, representation, periodSegIdx);
            seg.replacementTime = (start + periodSegIdx - 1) * representation.segmentDuration;
            seg.media = s.media ? s.media : baseURL;
            seg.mediaRange = s.mediaRange;
            seg.index = s.index;
            seg.indexRange = s.indexRange;
            segments.push(seg);
            seg = null;
        }
        representation.availableSegmentsNumber = len;
        return segments;
    }, getSegments = function(representation) {
        var segments, self = this, type = representation.segmentInfoType;
        if (type === "SegmentBase" || type === "BaseURL" || !isSegmentListUpdateRequired.call(self, representation)) {
            segments = representation.segments;
        } else {
            if (type === "SegmentTimeline") {
                segments = getSegmentsFromTimeline.call(self, representation);
            } else if (type === "SegmentTemplate") {
                segments = getSegmentsFromTemplate.call(self, representation);
            } else if (type === "SegmentList") {
                segments = getSegmentsFromList.call(self, representation);
            }
            onSegmentListUpdated.call(self, representation, segments);
        }
        return segments;
    }, onSegmentListUpdated = function(representation, segments) {
        var lastIdx, liveEdge, metrics, lastSegment;
        representation.segments = segments;
        lastIdx = segments.length - 1;
        if (isDynamic && isNaN(this.timelineConverter.getExpectedLiveEdge())) {
            lastSegment = segments[lastIdx];
            liveEdge = lastSegment.presentationStartTime + lastSegment.duration;
            metrics = this.metricsModel.getMetricsFor("stream");
            this.timelineConverter.setExpectedLiveEdge(liveEdge);
            this.metricsModel.updateManifestUpdateInfo(this.metricsExt.getCurrentManifestUpdate(metrics), {
                presentationStartTime: liveEdge
            });
        }
    }, updateSegmentList = function(representation) {
        var self = this;
        if (!representation) {
            throw new Error("no representation");
        }
        representation.segments = null;
        getSegments.call(self, representation);
        return representation;
    }, updateRepresentation = function(representation, keepIdx) {
        var self = this, hasInitialization = representation.initialization, hasSegments = representation.segmentInfoType !== "BaseURL" && representation.segmentInfoType !== "SegmentBase", error;
        representation.segmentAvailabilityRange = null;
        representation.segmentAvailabilityRange = self.timelineConverter.calcSegmentAvailabilityRange(representation, isDynamic);
        if (representation.segmentAvailabilityRange.end < representation.segmentAvailabilityRange.start && !representation.useCalculatedLiveEdgeTime) {
            error = new MediaPlayer.vo.Error(Dash.dependencies.DashHandler.SEGMENTS_UNAVAILABLE_ERROR_CODE, "no segments are available yet", {
                availabilityDelay: Math.abs(representation.segmentAvailabilityRange.end)
            });
            self.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, {
                representation: representation
            }, error);
            return;
        }
        if (!keepIdx) index = -1;
        updateSegmentList.call(self, representation);
        if (!hasInitialization) {
            self.baseURLExt.loadInitialization(representation);
        }
        if (!hasSegments) {
            self.baseURLExt.loadSegments(representation, type, representation.indexRange);
        }
        if (hasInitialization && hasSegments) {
            self.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, {
                representation: representation
            });
        }
    }, getIndexForSegments = function(time, representation, timeThreshold) {
        var segments = representation.segments, ln = segments ? segments.length : null, idx = -1, epsilon, frag, ft, fd, i;
        if (segments && ln > 0) {
            for (i = 0; i < ln; i += 1) {
                frag = segments[i];
                ft = frag.presentationStartTime;
                fd = frag.duration;
                epsilon = timeThreshold === undefined || timeThreshold === null ? fd / 2 : timeThreshold;
                if (time + epsilon >= ft && time - epsilon < ft + fd) {
                    idx = frag.availabilityIdx;
                    break;
                }
            }
        }
        return idx;
    }, getSegmentByIndex = function(index, representation) {
        if (!representation || !representation.segments) return null;
        var ln = representation.segments.length, seg, i;
        for (i = 0; i < ln; i += 1) {
            seg = representation.segments[i];
            if (seg.availabilityIdx === index) {
                return seg;
            }
        }
        return null;
    }, isSegmentListUpdateRequired = function(representation) {
        var updateRequired = false, segments = representation.segments, upperIdx, lowerIdx;
        if (!segments || segments.length === 0) {
            updateRequired = true;
        } else {
            lowerIdx = segments[0].availabilityIdx;
            upperIdx = segments[segments.length - 1].availabilityIdx;
            updateRequired = index < lowerIdx || index > upperIdx;
        }
        return updateRequired;
    }, getRequestForSegment = function(segment) {
        if (segment === null || segment === undefined) {
            return null;
        }
        var request = new MediaPlayer.vo.FragmentRequest(), representation = segment.representation, bandwidth = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].bandwidth, url;
        url = getRequestUrl(segment.media, representation);
        url = replaceTokenForTemplate(url, "Number", segment.replacementNumber);
        url = replaceTokenForTemplate(url, "Time", segment.replacementTime);
        url = replaceTokenForTemplate(url, "Bandwidth", bandwidth);
        url = replaceIDForTemplate(url, representation.id);
        url = unescapeDollarsInTemplate(url);
        request.mediaType = type;
        request.type = "Media Segment";
        request.url = url;
        request.range = segment.mediaRange;
        request.startTime = segment.presentationStartTime;
        request.duration = segment.duration;
        request.timescale = representation.timescale;
        request.availabilityStartTime = segment.availabilityStartTime;
        request.availabilityEndTime = segment.availabilityEndTime;
        request.wallStartTime = segment.wallStartTime;
        request.quality = representation.index;
        request.index = segment.availabilityIdx;
        return request;
    }, getForTime = function(representation, time, options) {
        var request, segment, finished, idx = index, keepIdx = options ? options.keepIdx : false, timeThreshold = options ? options.timeThreshold : null, self = this;
        if (!representation) {
            return null;
        }
        requestedTime = time;
        self.debug.log("Getting the request for time: " + time);
        index = getIndexForSegments.call(self, time, representation, timeThreshold);
        getSegments.call(self, representation);
        if (index < 0) {
            index = getIndexForSegments.call(self, time, representation, timeThreshold);
        }
        self.debug.log("Index for time " + time + " is " + index);
        finished = isMediaFinished.call(self, representation);
        if (finished) {
            request = new MediaPlayer.vo.FragmentRequest();
            request.action = request.ACTION_COMPLETE;
            request.index = index;
            request.mediaType = type;
            self.debug.log("Signal complete.");
            self.debug.log(request);
        } else {
            segment = getSegmentByIndex(index, representation);
            request = getRequestForSegment.call(self, segment);
        }
        if (keepIdx) {
            index = idx;
        }
        return request;
    }, generateForTime = function(representation, time) {
        var step = (representation.segmentAvailabilityRange.end - representation.segmentAvailabilityRange.start) / 2;
        representation.segments = null;
        representation.segmentAvailabilityRange = {
            start: time - step,
            end: time + step
        };
        return getForTime.call(this, representation, time, {
            keepIdx: false
        });
    }, getNext = function(representation) {
        var request, segment, finished, idx, self = this;
        if (!representation) {
            return null;
        }
        if (index === -1) {
            throw "You must call getSegmentRequestForTime first.";
        }
        requestedTime = null;
        index += 1;
        idx = index;
        finished = isMediaFinished.call(self, representation);
        if (finished) {
            request = new MediaPlayer.vo.FragmentRequest();
            request.action = request.ACTION_COMPLETE;
            request.index = idx;
            request.mediaType = type;
            self.debug.log("Signal complete.");
        } else {
            getSegments.call(self, representation);
            segment = getSegmentByIndex(idx, representation);
            request = getRequestForSegment.call(self, segment);
        }
        return request;
    }, onInitializationLoaded = function(e) {
        var representation = e.data.representation;
        if (!representation.segments) return;
        this.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, {
            representation: representation
        });
    }, onSegmentsLoaded = function(e) {
        if (e.error || type !== e.data.mediaType) return;
        var self = this, fragments = e.data.segments, representation = e.data.representation, i, len, s, segments = [], count = 0, seg;
        for (i = 0, len = fragments.length; i < len; i += 1) {
            s = fragments[i];
            seg = getTimeBasedSegment.call(self, representation, s.startTime, s.duration, s.timescale, s.media, s.mediaRange, count);
            segments.push(seg);
            seg = null;
            count += 1;
        }
        representation.segmentAvailabilityRange = {
            start: segments[0].presentationStartTime,
            end: segments[len - 1].presentationStartTime
        };
        representation.availableSegmentsNumber = len;
        onSegmentListUpdated.call(self, representation, segments);
        if (!representation.initialization) return;
        this.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, {
            representation: representation
        });
    };
    return {
        debug: undefined,
        baseURLExt: undefined,
        timelineConverter: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED] = onInitializationLoaded;
            this[Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED] = onSegmentsLoaded;
        },
        initialize: function(streamProcessor) {
            this.subscribe(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, streamProcessor.trackController);
            type = streamProcessor.getType();
            isDynamic = streamProcessor.isDynamic();
            this.streamProcessor = streamProcessor;
        },
        getType: function() {
            return type;
        },
        setType: function(value) {
            type = value;
        },
        getIsDynamic: function() {
            return isDynamic;
        },
        setIsDynamic: function(value) {
            isDynamic = value;
        },
        setCurrentTime: function(value) {
            currentTime = value;
        },
        getCurrentTime: function() {
            return currentTime;
        },
        reset: function() {
            currentTime = 0;
            requestedTime = undefined;
            index = -1;
            this.unsubscribe(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, this.streamProcessor.trackController);
        },
        getInitRequest: getInit,
        getSegmentRequestForTime: getForTime,
        getNextSegmentRequest: getNext,
        generateSegmentRequestForTime: generateForTime,
        updateRepresentation: updateRepresentation
    };
};

Dash.dependencies.DashHandler.prototype = {
    constructor: Dash.dependencies.DashHandler
};

Dash.dependencies.DashHandler.SEGMENTS_UNAVAILABLE_ERROR_CODE = 1;

Dash.dependencies.DashHandler.eventList = {
    ENAME_REPRESENTATION_UPDATED: "representationUpdated"
};

Dash.dependencies.DashParser = function() {
    "use strict";
    var SECONDS_IN_YEAR = 365 * 24 * 60 * 60, SECONDS_IN_MONTH = 30 * 24 * 60 * 60, SECONDS_IN_DAY = 24 * 60 * 60, SECONDS_IN_HOUR = 60 * 60, SECONDS_IN_MIN = 60, MINUTES_IN_HOUR = 60, MILLISECONDS_IN_SECONDS = 1e3, durationRegex = /^P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/, datetimeRegex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+-])([0-9]{2})([0-9]{2}))?/, numericRegex = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/, matchers = [ {
        type: "duration",
        test: function(attr) {
            var attributeList = [ "minBufferTime", "mediaPresentationDuration", "minimumUpdatePeriod", "timeShiftBufferDepth", "maxSegmentDuration", "maxSubsegmentDuration", "suggestedPresentationDelay", "start", "starttime", "duration" ], len = attributeList.length;
            for (var i = 0; i < len; i++) {
                if (attr.nodeName === attributeList[i]) {
                    return durationRegex.test(attr.value);
                }
            }
            return false;
        },
        converter: function(str) {
            var match = durationRegex.exec(str);
            return parseFloat(match[2] || 0) * SECONDS_IN_YEAR + parseFloat(match[4] || 0) * SECONDS_IN_MONTH + parseFloat(match[6] || 0) * SECONDS_IN_DAY + parseFloat(match[8] || 0) * SECONDS_IN_HOUR + parseFloat(match[10] || 0) * SECONDS_IN_MIN + parseFloat(match[12] || 0);
        }
    }, {
        type: "datetime",
        test: function(attr) {
            return datetimeRegex.test(attr.value);
        },
        converter: function(str) {
            var match = datetimeRegex.exec(str), utcDate;
            utcDate = Date.UTC(parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10), parseInt(match[4], 10), parseInt(match[5], 10), match[6] && parseInt(match[6], 10) || 0, match[7] && parseFloat(match[7]) * MILLISECONDS_IN_SECONDS || 0);
            if (match[9] && match[10]) {
                var timezoneOffset = parseInt(match[9], 10) * MINUTES_IN_HOUR + parseInt(match[10], 10);
                utcDate += (match[8] === "+" ? -1 : +1) * timezoneOffset * SECONDS_IN_MIN * MILLISECONDS_IN_SECONDS;
            }
            return new Date(utcDate);
        }
    }, {
        type: "numeric",
        test: function(attr) {
            return numericRegex.test(attr.value);
        },
        converter: function(str) {
            return parseFloat(str);
        }
    } ], getCommonValuesMap = function() {
        var adaptationSet, representation, subRepresentation, common;
        common = [ {
            name: "profiles",
            merge: false
        }, {
            name: "width",
            merge: false
        }, {
            name: "height",
            merge: false
        }, {
            name: "sar",
            merge: false
        }, {
            name: "frameRate",
            merge: false
        }, {
            name: "audioSamplingRate",
            merge: false
        }, {
            name: "mimeType",
            merge: false
        }, {
            name: "segmentProfiles",
            merge: false
        }, {
            name: "codecs",
            merge: false
        }, {
            name: "maximumSAPPeriod",
            merge: false
        }, {
            name: "startsWithSap",
            merge: false
        }, {
            name: "maxPlayoutRate",
            merge: false
        }, {
            name: "codingDependency",
            merge: false
        }, {
            name: "scanType",
            merge: false
        }, {
            name: "FramePacking",
            merge: true
        }, {
            name: "AudioChannelConfiguration",
            merge: true
        }, {
            name: "ContentProtection",
            merge: true
        } ];
        adaptationSet = {};
        adaptationSet.name = "AdaptationSet";
        adaptationSet.isRoot = false;
        adaptationSet.isArray = true;
        adaptationSet.parent = null;
        adaptationSet.children = [];
        adaptationSet.properties = common;
        representation = {};
        representation.name = "Representation";
        representation.isRoot = false;
        representation.isArray = true;
        representation.parent = adaptationSet;
        representation.children = [];
        representation.properties = common;
        adaptationSet.children.push(representation);
        subRepresentation = {};
        subRepresentation.name = "SubRepresentation";
        subRepresentation.isRoot = false;
        subRepresentation.isArray = true;
        subRepresentation.parent = representation;
        subRepresentation.children = [];
        subRepresentation.properties = common;
        representation.children.push(subRepresentation);
        return adaptationSet;
    }, getSegmentValuesMap = function() {
        var period, adaptationSet, representation, common;
        common = [ {
            name: "SegmentBase",
            merge: true
        }, {
            name: "SegmentTemplate",
            merge: true
        }, {
            name: "SegmentList",
            merge: true
        } ];
        period = {};
        period.name = "Period";
        period.isRoot = false;
        period.isArray = true;
        period.parent = null;
        period.children = [];
        period.properties = common;
        adaptationSet = {};
        adaptationSet.name = "AdaptationSet";
        adaptationSet.isRoot = false;
        adaptationSet.isArray = true;
        adaptationSet.parent = period;
        adaptationSet.children = [];
        adaptationSet.properties = common;
        period.children.push(adaptationSet);
        representation = {};
        representation.name = "Representation";
        representation.isRoot = false;
        representation.isArray = true;
        representation.parent = adaptationSet;
        representation.children = [];
        representation.properties = common;
        adaptationSet.children.push(representation);
        return period;
    }, getBaseUrlValuesMap = function() {
        var mpd, period, adaptationSet, representation, common;
        common = [ {
            name: "BaseURL",
            merge: true,
            mergeFunction: function(parentValue, childValue) {
                var mergedValue;
                if (childValue.indexOf("http://") === 0) {
                    mergedValue = childValue;
                } else {
                    mergedValue = parentValue + childValue;
                }
                return mergedValue;
            }
        } ];
        mpd = {};
        mpd.name = "mpd";
        mpd.isRoot = true;
        mpd.isArray = true;
        mpd.parent = null;
        mpd.children = [];
        mpd.properties = common;
        period = {};
        period.name = "Period";
        period.isRoot = false;
        period.isArray = true;
        period.parent = null;
        period.children = [];
        period.properties = common;
        mpd.children.push(period);
        adaptationSet = {};
        adaptationSet.name = "AdaptationSet";
        adaptationSet.isRoot = false;
        adaptationSet.isArray = true;
        adaptationSet.parent = period;
        adaptationSet.children = [];
        adaptationSet.properties = common;
        period.children.push(adaptationSet);
        representation = {};
        representation.name = "Representation";
        representation.isRoot = false;
        representation.isArray = true;
        representation.parent = adaptationSet;
        representation.children = [];
        representation.properties = common;
        adaptationSet.children.push(representation);
        return mpd;
    }, getDashMap = function() {
        var result = [];
        result.push(getCommonValuesMap());
        result.push(getSegmentValuesMap());
        result.push(getBaseUrlValuesMap());
        return result;
    }, internalParse = function(data, baseUrl) {
        var manifest, converter = new X2JS(matchers, "", true), iron = new ObjectIron(getDashMap()), start = new Date(), json = null, ironed = null;
        try {
            manifest = converter.xml_str2json(data);
            json = new Date();
            if (!manifest.hasOwnProperty("BaseURL")) {
                manifest.BaseURL = baseUrl;
            } else {
                manifest.BaseURL = manifest.BaseURL_asArray[0];
                if (manifest.BaseURL.toString().indexOf("http") !== 0) {
                    manifest.BaseURL = baseUrl + manifest.BaseURL;
                }
            }
            if (manifest.hasOwnProperty("Location")) {
                manifest.Location = manifest.Location_asArray[0];
            }
            iron.run(manifest);
            ironed = new Date();
            this.debug.log("Parsing complete: ( xml2json: " + (json.getTime() - start.getTime()) + "ms, objectiron: " + (ironed.getTime() - json.getTime()) + "ms, total: " + (ironed.getTime() - start.getTime()) / 1e3 + "s)");
        } catch (err) {
            this.errHandler.manifestError("parsing the manifest failed", "parse", data);
            return null;
        }
        return manifest;
    };
    return {
        debug: undefined,
        errHandler: undefined,
        parse: internalParse
    };
};

Dash.dependencies.DashParser.prototype = {
    constructor: Dash.dependencies.DashParser
};

Dash.dependencies.TimelineConverter = function() {
    "use strict";
    var clientServerTimeShift = 0, isClientServerTimeSyncCompleted = false, expectedLiveEdge = NaN, calcAvailabilityTimeFromPresentationTime = function(presentationTime, mpd, isDynamic, calculateEnd) {
        var availabilityTime = NaN;
        if (calculateEnd) {
            if (isDynamic && mpd.timeShiftBufferDepth != Number.POSITIVE_INFINITY) {
                availabilityTime = new Date(mpd.availabilityStartTime.getTime() + (presentationTime + mpd.timeShiftBufferDepth) * 1e3);
            } else {
                availabilityTime = mpd.availabilityEndTime;
            }
        } else {
            if (isDynamic) {
                availabilityTime = new Date(mpd.availabilityStartTime.getTime() + (presentationTime - clientServerTimeShift) * 1e3);
            } else {
                availabilityTime = mpd.availabilityStartTime;
            }
        }
        return availabilityTime;
    }, calcAvailabilityStartTimeFromPresentationTime = function(presentationTime, mpd, isDynamic) {
        return calcAvailabilityTimeFromPresentationTime.call(this, presentationTime, mpd, isDynamic);
    }, calcAvailabilityEndTimeFromPresentationTime = function(presentationTime, mpd, isDynamic) {
        return calcAvailabilityTimeFromPresentationTime.call(this, presentationTime, mpd, isDynamic, true);
    }, calcPresentationTimeFromWallTime = function(wallTime, period) {
        return (wallTime.getTime() - period.mpd.availabilityStartTime.getTime() + clientServerTimeShift * 1e3) / 1e3;
    }, calcPresentationTimeFromMediaTime = function(mediaTime, representation) {
        var periodStart = representation.adaptation.period.start, presentationOffset = representation.presentationTimeOffset;
        return mediaTime + (periodStart - presentationOffset);
    }, calcMediaTimeFromPresentationTime = function(presentationTime, representation) {
        var periodStart = representation.adaptation.period.start, presentationOffset = representation.presentationTimeOffset;
        return presentationTime - periodStart + presentationOffset;
    }, calcWallTimeForSegment = function(segment, isDynamic) {
        var suggestedPresentationDelay, displayStartTime, wallTime;
        if (isDynamic) {
            suggestedPresentationDelay = segment.representation.adaptation.period.mpd.suggestedPresentationDelay;
            displayStartTime = segment.presentationStartTime + suggestedPresentationDelay;
            wallTime = new Date(segment.availabilityStartTime.getTime() + displayStartTime * 1e3);
        }
        return wallTime;
    }, calcSegmentAvailabilityRange = function(representation, isDynamic) {
        var start = representation.adaptation.period.start, end = start + representation.adaptation.period.duration, range = {
            start: start,
            end: end
        }, checkTime, now;
        if (!isDynamic) return range;
        if (!isClientServerTimeSyncCompleted && representation.segmentAvailabilityRange) {
            return representation.segmentAvailabilityRange;
        }
        checkTime = representation.adaptation.period.mpd.checkTime;
        now = calcPresentationTimeFromWallTime(new Date(new Date().getTime()), representation.adaptation.period);
        start = Math.max(now - representation.adaptation.period.mpd.timeShiftBufferDepth, 0);
        end = isNaN(checkTime) ? now : Math.min(checkTime, now);
        range = {
            start: start,
            end: end
        };
        return range;
    }, calcPeriodRelativeTimeFromMpdRelativeTime = function(representation, mpdRelativeTime) {
        var periodStartTime = representation.adaptation.period.start;
        return mpdRelativeTime - periodStartTime;
    }, calcMpdRelativeTimeFromPeriodRelativeTime = function(representation, periodRelativeTime) {
        var periodStartTime = representation.adaptation.period.start;
        return periodRelativeTime + periodStartTime;
    }, onLiveEdgeSearchCompleted = function(e) {
        if (isClientServerTimeSyncCompleted || e.error) return;
        clientServerTimeShift = e.data.liveEdge - (expectedLiveEdge + e.data.searchTime);
        isClientServerTimeSyncCompleted = true;
    }, onTimeSyncComplete = function(e) {
        if (isClientServerTimeSyncCompleted || e.error) {
            return;
        }
        clientServerTimeShift = e.data.offset / 1e3;
        isClientServerTimeSyncCompleted = true;
    }, calcMSETimeOffset = function(representation) {
        var presentationOffset = representation.presentationTimeOffset;
        var periodStart = representation.adaptation.period.start;
        return periodStart - presentationOffset;
    }, reset = function() {
        clientServerTimeShift = 0;
        isClientServerTimeSyncCompleted = false;
        expectedLiveEdge = NaN;
    };
    return {
        notifier: undefined,
        uriQueryFragModel: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED] = onLiveEdgeSearchCompleted;
            this[MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED] = onTimeSyncComplete;
        },
        calcAvailabilityStartTimeFromPresentationTime: calcAvailabilityStartTimeFromPresentationTime,
        calcAvailabilityEndTimeFromPresentationTime: calcAvailabilityEndTimeFromPresentationTime,
        calcPresentationTimeFromWallTime: calcPresentationTimeFromWallTime,
        calcPresentationTimeFromMediaTime: calcPresentationTimeFromMediaTime,
        calcPeriodRelativeTimeFromMpdRelativeTime: calcPeriodRelativeTimeFromMpdRelativeTime,
        calcMpdRelativeTimeFromPeriodRelativeTime: calcMpdRelativeTimeFromPeriodRelativeTime,
        calcMediaTimeFromPresentationTime: calcMediaTimeFromPresentationTime,
        calcSegmentAvailabilityRange: calcSegmentAvailabilityRange,
        calcWallTimeForSegment: calcWallTimeForSegment,
        calcMSETimeOffset: calcMSETimeOffset,
        reset: reset,
        isTimeSyncCompleted: function() {
            return isClientServerTimeSyncCompleted;
        },
        getClientTimeOffset: function() {
            return clientServerTimeShift;
        },
        getExpectedLiveEdge: function() {
            return expectedLiveEdge;
        },
        setExpectedLiveEdge: function(value) {
            expectedLiveEdge = value;
        }
    };
};

Dash.dependencies.TimelineConverter.prototype = {
    constructor: Dash.dependencies.TimelineConverter
};

Dash.dependencies.RepresentationController = function() {
    "use strict";
    var data = null, dataIndex = -1, updating = true, availableRepresentations = [], currentRepresentation, updateData = function(dataValue, adaptation, type) {
        var self = this;
        updating = true;
        self.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED);
        availableRepresentations = updateRepresentations.call(self, adaptation);
        currentRepresentation = getRepresentationForQuality.call(self, self.abrController.getQualityFor(type, self.streamProcessor.getStreamInfo()));
        data = dataValue;
        if (type !== "video" && type !== "audio") {
            self.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, {
                data: data,
                currentRepresentation: currentRepresentation
            });
            addRepresentationSwitch.call(self);
            return;
        }
        for (var i = 0; i < availableRepresentations.length; i += 1) {
            self.indexHandler.updateRepresentation(availableRepresentations[i], true);
        }
    }, addRepresentationSwitch = function() {
        var now = new Date(), currentRepresentation = this.getCurrentRepresentation(), currentVideoTime = this.streamProcessor.playbackController.getTime();
        this.metricsModel.addTrackSwitch(currentRepresentation.adaptation.type, now, currentVideoTime, currentRepresentation.id);
    }, addDVRMetric = function() {
        var streamProcessor = this.streamProcessor, range = this.timelineConverter.calcSegmentAvailabilityRange(currentRepresentation, streamProcessor.isDynamic());
        this.metricsModel.addDVRInfo(streamProcessor.getType(), streamProcessor.playbackController.getTime(), streamProcessor.getStreamInfo().manifestInfo, range);
    }, getRepresentationForQuality = function(quality) {
        return availableRepresentations[quality];
    }, isAllRepresentationsUpdated = function() {
        for (var i = 0, ln = availableRepresentations.length; i < ln; i += 1) {
            if (availableRepresentations[i].segmentAvailabilityRange === null || availableRepresentations[i].initialization === null) return false;
        }
        return true;
    }, updateRepresentations = function(adaptation) {
        var self = this, reps, manifest = self.manifestModel.getValue();
        dataIndex = self.manifestExt.getIndexForAdaptation(data, manifest, adaptation.period.index);
        reps = self.manifestExt.getRepresentationsForAdaptation(manifest, adaptation);
        return reps;
    }, updateAvailabilityWindow = function(isDynamic) {
        var self = this, rep;
        for (var i = 0, ln = availableRepresentations.length; i < ln; i += 1) {
            rep = availableRepresentations[i];
            rep.segmentAvailabilityRange = self.timelineConverter.calcSegmentAvailabilityRange(rep, isDynamic);
        }
    }, postponeUpdate = function(availabilityDelay) {
        var self = this, delay = (availabilityDelay + currentRepresentation.segmentDuration * 3) * 1e3, update = function() {
            if (this.isUpdating()) return;
            updating = true;
            self.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED);
            for (var i = 0; i < availableRepresentations.length; i += 1) {
                self.indexHandler.updateRepresentation(availableRepresentations[i], true);
            }
        };
        updating = false;
        setTimeout(update.bind(this), delay);
    }, onRepresentationUpdated = function(e) {
        if (!this.isUpdating()) return;
        var self = this, r = e.data.representation, metrics = self.metricsModel.getMetricsFor("stream"), manifestUpdateInfo = self.metricsExt.getCurrentManifestUpdate(metrics), repInfo, err, alreadyAdded = false;
        if (e.error && e.error.code === Dash.dependencies.DashHandler.SEGMENTS_UNAVAILABLE_ERROR_CODE) {
            addDVRMetric.call(this);
            postponeUpdate.call(this, e.error.data.availabilityDelay);
            err = new MediaPlayer.vo.Error(Dash.dependencies.RepresentationController.SEGMENTS_UPDATE_FAILED_ERROR_CODE, "Segments update failed", null);
            this.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, {
                data: data,
                currentRepresentation: currentRepresentation
            }, err);
            return;
        }
        for (var i = 0; i < manifestUpdateInfo.trackInfo.length; i += 1) {
            repInfo = manifestUpdateInfo.trackInfo[i];
            if (repInfo.index === r.index && repInfo.mediaType === self.streamProcessor.getType()) {
                alreadyAdded = true;
                break;
            }
        }
        if (!alreadyAdded) {
            self.metricsModel.addManifestUpdateTrackInfo(manifestUpdateInfo, r.id, r.index, r.adaptation.period.index, self.streamProcessor.getType(), r.presentationTimeOffset, r.startNumber, r.segmentInfoType);
        }
        if (isAllRepresentationsUpdated()) {
            updating = false;
            self.metricsModel.updateManifestUpdateInfo(manifestUpdateInfo, {
                latency: currentRepresentation.segmentAvailabilityRange.end - self.streamProcessor.playbackController.getTime()
            });
            this.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, {
                data: data,
                currentRepresentation: currentRepresentation
            });
            addRepresentationSwitch.call(self);
        }
    }, onWallclockTimeUpdated = function(e) {
        updateAvailabilityWindow.call(this, e.data.isDynamic);
    }, onLiveEdgeSearchCompleted = function(e) {
        if (e.error) return;
        updateAvailabilityWindow.call(this, true);
        this.indexHandler.updateRepresentation(currentRepresentation, false);
        var manifest = this.manifestModel.getValue();
        currentRepresentation.adaptation.period.mpd.checkTime = this.manifestExt.getCheckTime(manifest, currentRepresentation.adaptation.period);
    }, onBufferLevelUpdated = function() {
        addDVRMetric.call(this);
    }, onQualityChanged = function(e) {
        var self = this;
        if (e.data.mediaType !== self.streamProcessor.getType() || self.streamProcessor.getStreamInfo().id !== e.data.streamInfo.id) return;
        currentRepresentation = self.getRepresentationForQuality(e.data.newQuality);
        addRepresentationSwitch.call(self);
    };
    return {
        system: undefined,
        debug: undefined,
        manifestExt: undefined,
        manifestModel: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        abrController: undefined,
        timelineConverter: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED] = onQualityChanged;
            this[Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED] = onRepresentationUpdated;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED] = onWallclockTimeUpdated;
            this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED] = onLiveEdgeSearchCompleted;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED] = onBufferLevelUpdated;
        },
        initialize: function(streamProcessor) {
            this.streamProcessor = streamProcessor;
            this.indexHandler = streamProcessor.indexHandler;
        },
        getData: function() {
            return data;
        },
        getDataIndex: function() {
            return dataIndex;
        },
        isUpdating: function() {
            return updating;
        },
        updateData: updateData,
        getRepresentationForQuality: getRepresentationForQuality,
        getCurrentRepresentation: function() {
            return currentRepresentation;
        }
    };
};

Dash.dependencies.RepresentationController.prototype = {
    constructor: Dash.dependencies.RepresentationController
};

Dash.dependencies.RepresentationController.SEGMENTS_UPDATE_FAILED_ERROR_CODE = 1;

Dash.dependencies.RepresentationController.eventList = {
    ENAME_DATA_UPDATE_COMPLETED: "dataUpdateCompleted",
    ENAME_DATA_UPDATE_STARTED: "dataUpdateStarted"
};

Dash.dependencies.BaseURLExtensions = function() {
    "use strict";
    var parseSIDX = function(ab, ab_first_byte_offset) {
        var d = new DataView(ab), sidx = {}, pos = 0, offset, time, sidxEnd, i, ref_type, ref_size, ref_dur, type, size, charCode;
        while (type !== "sidx" && pos < d.byteLength) {
            size = d.getUint32(pos);
            pos += 4;
            type = "";
            for (i = 0; i < 4; i += 1) {
                charCode = d.getInt8(pos);
                type += String.fromCharCode(charCode);
                pos += 1;
            }
            if (type !== "moof" && type !== "traf" && type !== "sidx") {
                pos += size - 8;
            } else if (type === "sidx") {
                pos -= 8;
            }
        }
        sidxEnd = d.getUint32(pos, false) + pos;
        if (sidxEnd > ab.byteLength) {
            throw "sidx terminates after array buffer";
        }
        sidx.version = d.getUint8(pos + 8);
        pos += 12;
        sidx.timescale = d.getUint32(pos + 4, false);
        pos += 8;
        if (sidx.version === 0) {
            sidx.earliest_presentation_time = d.getUint32(pos, false);
            sidx.first_offset = d.getUint32(pos + 4, false);
            pos += 8;
        } else {
            sidx.earliest_presentation_time = utils.Math.to64BitNumber(d.getUint32(pos + 4, false), d.getUint32(pos, false));
            sidx.first_offset = (d.getUint32(pos + 8, false) << 32) + d.getUint32(pos + 12, false);
            pos += 16;
        }
        sidx.first_offset += sidxEnd + (ab_first_byte_offset || 0);
        sidx.reference_count = d.getUint16(pos + 2, false);
        pos += 4;
        sidx.references = [];
        offset = sidx.first_offset;
        time = sidx.earliest_presentation_time;
        for (i = 0; i < sidx.reference_count; i += 1) {
            ref_size = d.getUint32(pos, false);
            ref_type = ref_size >>> 31;
            ref_size = ref_size & 2147483647;
            ref_dur = d.getUint32(pos + 4, false);
            pos += 12;
            sidx.references.push({
                size: ref_size,
                type: ref_type,
                offset: offset,
                duration: ref_dur,
                time: time,
                timescale: sidx.timescale
            });
            offset += ref_size;
            time += ref_dur;
        }
        if (pos !== sidxEnd) {
            throw "Error: final pos " + pos + " differs from SIDX end " + sidxEnd;
        }
        return sidx;
    }, parseSegments = function(data, media, offset) {
        var parsed, ref, segments, segment, i, len, start, end;
        parsed = parseSIDX.call(this, data, offset);
        ref = parsed.references;
        segments = [];
        for (i = 0, len = ref.length; i < len; i += 1) {
            segment = new Dash.vo.Segment();
            segment.duration = ref[i].duration;
            segment.media = media;
            segment.startTime = ref[i].time;
            segment.timescale = ref[i].timescale;
            start = ref[i].offset;
            end = ref[i].offset + ref[i].size - 1;
            segment.mediaRange = start + "-" + end;
            segments.push(segment);
        }
        this.debug.log("Parsed SIDX box: " + segments.length + " segments.");
        return segments;
    }, findInit = function(data, info, callback) {
        var ftyp, moov, start, end, d = new DataView(data), pos = 0, type = "", size = 0, bytesAvailable, i, c, request, loaded = false, irange, self = this;
        self.debug.log("Searching for initialization.");
        while (type !== "moov" && pos < d.byteLength) {
            size = d.getUint32(pos);
            pos += 4;
            type = "";
            for (i = 0; i < 4; i += 1) {
                c = d.getInt8(pos);
                type += String.fromCharCode(c);
                pos += 1;
            }
            if (type === "ftyp") {
                ftyp = pos - 8;
            }
            if (type === "moov") {
                moov = pos - 8;
            }
            if (type !== "moov") {
                pos += size - 8;
            }
        }
        bytesAvailable = d.byteLength - pos;
        if (type !== "moov") {
            self.debug.log("Loading more bytes to find initialization.");
            info.range.start = 0;
            info.range.end = info.bytesLoaded + info.bytesToLoad;
            request = new XMLHttpRequest();
            request.onloadend = function() {
                if (!loaded) {
                    callback.call(self, null, new Error("Error loading initialization."));
                }
            };
            request.onload = function() {
                loaded = true;
                info.bytesLoaded = info.range.end;
                findInit.call(self, request.response, function(segments) {
                    callback.call(self, segments);
                });
            };
            request.onerror = function() {
                callback.call(self, null, new Error("Error loading initialization."));
            };
            request.open("GET", self.requestModifierExt.modifyRequestURL(info.url));
            request.responseType = "arraybuffer";
            request.setRequestHeader("Range", "bytes=" + info.range.start + "-" + info.range.end);
            request = self.requestModifierExt.modifyRequestHeader(request);
            request.send(null);
        } else {
            start = ftyp === undefined ? moov : ftyp;
            end = moov + size - 1;
            irange = start + "-" + end;
            self.debug.log("Found the initialization.  Range: " + irange);
            callback.call(self, irange);
        }
    }, loadInit = function(representation) {
        var request = new XMLHttpRequest(), needFailureReport = true, self = this, media = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].BaseURL, info = {
            url: media,
            range: {},
            searching: false,
            bytesLoaded: 0,
            bytesToLoad: 1500,
            request: request
        };
        self.debug.log("Start searching for initialization.");
        info.range.start = 0;
        info.range.end = info.bytesToLoad;
        request.onload = function() {
            if (request.status < 200 || request.status > 299) {
                return;
            }
            needFailureReport = false;
            info.bytesLoaded = info.range.end;
            findInit.call(self, request.response, info, function(range) {
                representation.range = range;
                representation.initialization = media;
                self.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED, {
                    representation: representation
                });
            });
        };
        request.onloadend = request.onerror = function() {
            if (!needFailureReport) {
                return;
            }
            needFailureReport = false;
            self.errHandler.downloadError("initialization", info.url, request);
            self.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED, {
                representation: representation
            });
        };
        request.open("GET", self.requestModifierExt.modifyRequestURL(info.url));
        request.responseType = "arraybuffer";
        request.setRequestHeader("Range", "bytes=" + info.range.start + "-" + info.range.end);
        request = self.requestModifierExt.modifyRequestHeader(request);
        request.send(null);
        self.debug.log("Perform init search: " + info.url);
    }, findSIDX = function(data, info, representation, callback) {
        var segments, d = new DataView(data), request = new XMLHttpRequest(), pos = 0, type = "", size = 0, bytesAvailable, sidxBytes, sidxSlice, sidxOut, i, c, needFailureReport = true, parsed, ref, loadMultiSidx = false, self = this;
        self.debug.log("Searching for SIDX box.");
        self.debug.log(info.bytesLoaded + " bytes loaded.");
        while (type !== "sidx" && pos < d.byteLength) {
            size = d.getUint32(pos);
            pos += 4;
            type = "";
            for (i = 0; i < 4; i += 1) {
                c = d.getInt8(pos);
                type += String.fromCharCode(c);
                pos += 1;
            }
            if (type !== "sidx") {
                pos += size - 8;
            }
        }
        bytesAvailable = d.byteLength - pos;
        if (type !== "sidx") {
            callback.call(self);
        } else if (bytesAvailable < size - 8) {
            self.debug.log("Found SIDX but we don't have all of it.");
            info.range.start = 0;
            info.range.end = info.bytesLoaded + (size - bytesAvailable);
            request.onload = function() {
                if (request.status < 200 || request.status > 299) {
                    return;
                }
                needFailureReport = false;
                info.bytesLoaded = info.range.end;
                findSIDX.call(self, request.response, info, representation, callback);
            };
            request.onloadend = request.onerror = function() {
                if (!needFailureReport) {
                    return;
                }
                needFailureReport = false;
                self.errHandler.downloadError("SIDX", info.url, request);
                callback.call(self);
            };
            request.open("GET", self.requestModifierExt.modifyRequestURL(info.url));
            request.responseType = "arraybuffer";
            request.setRequestHeader("Range", "bytes=" + info.range.start + "-" + info.range.end);
            request = self.requestModifierExt.modifyRequestHeader(request);
            request.send(null);
        } else {
            info.range.start = pos - 8;
            info.range.end = info.range.start + size;
            self.debug.log("Found the SIDX box.  Start: " + info.range.start + " | End: " + info.range.end);
            sidxBytes = new ArrayBuffer(info.range.end - info.range.start);
            sidxOut = new Uint8Array(sidxBytes);
            sidxSlice = new Uint8Array(data, info.range.start, info.range.end - info.range.start);
            sidxOut.set(sidxSlice);
            parsed = this.parseSIDX.call(this, sidxBytes, info.range.start);
            ref = parsed.references;
            if (ref !== null && ref !== undefined && ref.length > 0) {
                loadMultiSidx = ref[0].type === 1;
            }
            if (loadMultiSidx) {
                self.debug.log("Initiate multiple SIDX load.");
                var j, len, ss, se, r, segs = [], count = 0, tmpCallback = function(segments) {
                    if (segments) {
                        segs = segs.concat(segments);
                        count += 1;
                        if (count >= len) {
                            callback.call(self, segs);
                        }
                    } else {
                        callback.call(self);
                    }
                };
                for (j = 0, len = ref.length; j < len; j += 1) {
                    ss = ref[j].offset;
                    se = ref[j].offset + ref[j].size - 1;
                    r = ss + "-" + se;
                    loadSegments.call(self, representation, null, r, tmpCallback);
                }
            } else {
                self.debug.log("Parsing segments from SIDX.");
                segments = parseSegments.call(self, sidxBytes, info.url, info.range.start);
                callback.call(self, segments);
            }
        }
    }, loadSegments = function(representation, type, theRange, callback) {
        var request = new XMLHttpRequest(), segments, parts, media = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].BaseURL, needFailureReport = true, self = this, info = {
            url: media,
            range: {},
            searching: false,
            bytesLoaded: 0,
            bytesToLoad: 1500,
            request: request
        };
        if (theRange === null) {
            self.debug.log("No known range for SIDX request.");
            info.searching = true;
            info.range.start = 0;
            info.range.end = info.bytesToLoad;
        } else {
            parts = theRange.split("-");
            info.range.start = parseFloat(parts[0]);
            info.range.end = parseFloat(parts[1]);
        }
        request.onload = function() {
            if (request.status < 200 || request.status > 299) {
                return;
            }
            needFailureReport = false;
            if (info.searching) {
                info.bytesLoaded = info.range.end;
                findSIDX.call(self, request.response, info, representation, function(segments) {
                    if (segments) {
                        callback.call(self, segments, representation, type);
                    }
                });
            } else {
                segments = parseSegments.call(self, request.response, info.url, info.range.start);
                callback.call(self, segments, representation, type);
            }
        };
        request.onloadend = request.onerror = function() {
            if (!needFailureReport) {
                return;
            }
            needFailureReport = false;
            self.errHandler.downloadError("SIDX", info.url, request);
            callback.call(self, null, representation, type);
        };
        request.open("GET", self.requestModifierExt.modifyRequestURL(info.url));
        request.responseType = "arraybuffer";
        request.setRequestHeader("Range", "bytes=" + info.range.start + "-" + info.range.end);
        request = self.requestModifierExt.modifyRequestHeader(request);
        request.send(null);
        self.debug.log("Perform SIDX load: " + info.url);
    }, onLoaded = function(segments, representation, type) {
        var self = this;
        if (segments) {
            self.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED, {
                segments: segments,
                representation: representation,
                mediaType: type
            });
        } else {
            self.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED, {
                segments: null,
                representation: representation,
                mediaType: type
            }, new MediaPlayer.vo.Error(null, "error loading segments", null));
        }
    };
    return {
        debug: undefined,
        errHandler: undefined,
        requestModifierExt: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        loadSegments: function(representation, type, range) {
            loadSegments.call(this, representation, type, range, onLoaded.bind(this));
        },
        loadInitialization: loadInit,
        parseSegments: parseSegments,
        parseSIDX: parseSIDX,
        findSIDX: findSIDX
    };
};

Dash.dependencies.BaseURLExtensions.prototype = {
    constructor: Dash.dependencies.BaseURLExtensions
};

Dash.dependencies.BaseURLExtensions.eventList = {
    ENAME_INITIALIZATION_LOADED: "initializationLoaded",
    ENAME_SEGMENTS_LOADED: "segmentsLoaded"
};

Dash.dependencies.DashManifestExtensions = function() {
    "use strict";
    this.timelineConverter = undefined;
};

Dash.dependencies.DashManifestExtensions.prototype = {
    constructor: Dash.dependencies.DashManifestExtensions,
    getIsTypeOf: function(adaptation, type) {
        "use strict";
        var i, len, col = adaptation.ContentComponent_asArray, mimeTypeRegEx = type !== "text" ? new RegExp(type) : new RegExp("(vtt|ttml)"), representation, result = false, found = false;
        if (col) {
            for (i = 0, len = col.length; i < len; i += 1) {
                if (col[i].contentType === type) {
                    result = true;
                    found = true;
                }
            }
        }
        if (adaptation.hasOwnProperty("mimeType")) {
            result = mimeTypeRegEx.test(adaptation.mimeType);
            found = true;
        }
        if (!found) {
            i = 0;
            len = adaptation.Representation_asArray.length;
            while (!found && i < len) {
                representation = adaptation.Representation_asArray[i];
                if (representation.hasOwnProperty("mimeType")) {
                    result = mimeTypeRegEx.test(representation.mimeType);
                    found = true;
                }
                i += 1;
            }
        }
        return result;
    },
    getIsAudio: function(adaptation) {
        "use strict";
        return this.getIsTypeOf(adaptation, "audio");
    },
    getIsVideo: function(adaptation) {
        "use strict";
        return this.getIsTypeOf(adaptation, "video");
    },
    getIsText: function(adaptation) {
        "use strict";
        return this.getIsTypeOf(adaptation, "text");
    },
    getIsTextTrack: function(type) {
        return type === "text/vtt" || type === "application/ttml+xml";
    },
    getLanguageForAdaptation: function(adaptation) {
        var lang = "";
        if (adaptation.hasOwnProperty("lang")) {
            lang = adaptation.lang;
        }
        return lang;
    },
    getIsMain: function() {
        "use strict";
        return false;
    },
    processAdaptation: function(adaptation) {
        "use strict";
        if (adaptation.Representation_asArray !== undefined && adaptation.Representation_asArray !== null) {
            adaptation.Representation_asArray.sort(function(a, b) {
                return a.bandwidth - b.bandwidth;
            });
        }
        return adaptation;
    },
    getAdaptationForId: function(id, manifest, periodIndex) {
        "use strict";
        var adaptations = manifest.Period_asArray[periodIndex].AdaptationSet_asArray, i, len;
        for (i = 0, len = adaptations.length; i < len; i += 1) {
            if (adaptations[i].hasOwnProperty("id") && adaptations[i].id === id) {
                return adaptations[i];
            }
        }
        return null;
    },
    getAdaptationForIndex: function(index, manifest, periodIndex) {
        "use strict";
        var adaptations = manifest.Period_asArray[periodIndex].AdaptationSet_asArray;
        return adaptations[index];
    },
    getIndexForAdaptation: function(adaptation, manifest, periodIndex) {
        "use strict";
        var adaptations = manifest.Period_asArray[periodIndex].AdaptationSet_asArray, i, len;
        for (i = 0, len = adaptations.length; i < len; i += 1) {
            if (adaptations[i] === adaptation) {
                return i;
            }
        }
        return -1;
    },
    getAdaptationsForType: function(manifest, periodIndex, type) {
        "use strict";
        var self = this, adaptationSet = manifest.Period_asArray[periodIndex].AdaptationSet_asArray, i, len, adaptations = [];
        for (i = 0, len = adaptationSet.length; i < len; i += 1) {
            if (this.getIsTypeOf(adaptationSet[i], type)) {
                adaptations.push(self.processAdaptation(adaptationSet[i]));
            }
        }
        return adaptations;
    },
    getAdaptationForType: function(manifest, periodIndex, type) {
        "use strict";
        var i, len, adaptations, self = this;
        adaptations = this.getAdaptationsForType(manifest, periodIndex, type);
        if (!adaptations || adaptations.length === 0) return null;
        for (i = 0, len = adaptations.length; i < len; i += 1) {
            if (self.getIsMain(adaptations[i])) return adaptations[i];
        }
        return adaptations[0];
    },
    getCodec: function(adaptation) {
        "use strict";
        var representation = adaptation.Representation_asArray[0], codec = representation.mimeType + ';codecs="' + representation.codecs + '"';
        return codec;
    },
    getMimeType: function(adaptation) {
        "use strict";
        return adaptation.Representation_asArray[0].mimeType;
    },
    getKID: function(adaptation) {
        "use strict";
        if (!adaptation || !adaptation.hasOwnProperty("cenc:default_KID")) {
            return null;
        }
        return adaptation["cenc:default_KID"];
    },
    getContentProtectionData: function(adaptation) {
        "use strict";
        if (!adaptation || !adaptation.hasOwnProperty("ContentProtection_asArray") || adaptation.ContentProtection_asArray.length === 0) {
            return null;
        }
        return adaptation.ContentProtection_asArray;
    },
    getIsDynamic: function(manifest) {
        "use strict";
        var isDynamic = false, LIVE_TYPE = "dynamic";
        if (manifest.hasOwnProperty("type")) {
            isDynamic = manifest.type === LIVE_TYPE;
        }
        return isDynamic;
    },
    getIsDVR: function(manifest) {
        "use strict";
        var isDynamic = this.getIsDynamic(manifest), containsDVR, isDVR;
        containsDVR = !isNaN(manifest.timeShiftBufferDepth);
        isDVR = isDynamic && containsDVR;
        return isDVR;
    },
    getIsOnDemand: function(manifest) {
        "use strict";
        var isOnDemand = false;
        if (manifest.profiles && manifest.profiles.length > 0) {
            isOnDemand = manifest.profiles.indexOf("urn:mpeg:dash:profile:isoff-on-demand:2011") !== -1;
        }
        return isOnDemand;
    },
    getDuration: function(manifest) {
        var mpdDuration;
        if (manifest.hasOwnProperty("mediaPresentationDuration")) {
            mpdDuration = manifest.mediaPresentationDuration;
        } else {
            mpdDuration = Number.POSITIVE_INFINITY;
        }
        return mpdDuration;
    },
    getBandwidth: function(representation) {
        "use strict";
        return representation.bandwidth;
    },
    getRefreshDelay: function(manifest) {
        "use strict";
        var delay = NaN, minDelay = 2;
        if (manifest.hasOwnProperty("minimumUpdatePeriod")) {
            delay = Math.max(parseFloat(manifest.minimumUpdatePeriod), minDelay);
        }
        return delay;
    },
    getRepresentationCount: function(adaptation) {
        "use strict";
        return adaptation.Representation_asArray.length;
    },
    getRepresentationFor: function(index, adaptation) {
        "use strict";
        return adaptation.Representation_asArray[index];
    },
    getRepresentationsForAdaptation: function(manifest, adaptation) {
        var self = this, a = self.processAdaptation(manifest.Period_asArray[adaptation.period.index].AdaptationSet_asArray[adaptation.index]), representations = [], representation, initialization, segmentInfo, r, s;
        for (var i = 0; i < a.Representation_asArray.length; i += 1) {
            r = a.Representation_asArray[i];
            representation = new Dash.vo.Representation();
            representation.index = i;
            representation.adaptation = adaptation;
            if (r.hasOwnProperty("id")) {
                representation.id = r.id;
            }
            if (r.hasOwnProperty("SegmentBase")) {
                segmentInfo = r.SegmentBase;
                representation.segmentInfoType = "SegmentBase";
            } else if (r.hasOwnProperty("SegmentList")) {
                segmentInfo = r.SegmentList;
                representation.segmentInfoType = "SegmentList";
                representation.useCalculatedLiveEdgeTime = true;
            } else if (r.hasOwnProperty("SegmentTemplate")) {
                segmentInfo = r.SegmentTemplate;
                if (segmentInfo.hasOwnProperty("SegmentTimeline")) {
                    representation.segmentInfoType = "SegmentTimeline";
                    s = segmentInfo.SegmentTimeline.S_asArray[segmentInfo.SegmentTimeline.S_asArray.length - 1];
                    if (!s.hasOwnProperty("r") || s.r >= 0) {
                        representation.useCalculatedLiveEdgeTime = true;
                    }
                } else {
                    representation.segmentInfoType = "SegmentTemplate";
                }
                if (segmentInfo.hasOwnProperty("initialization")) {
                    representation.initialization = segmentInfo.initialization.split("$Bandwidth$").join(r.bandwidth).split("$RepresentationID$").join(r.id);
                }
            } else {
                segmentInfo = r.BaseURL;
                representation.segmentInfoType = "BaseURL";
            }
            if (segmentInfo.hasOwnProperty("Initialization")) {
                initialization = segmentInfo.Initialization;
                if (initialization.hasOwnProperty("sourceURL")) {
                    representation.initialization = initialization.sourceURL;
                } else if (initialization.hasOwnProperty("range")) {
                    representation.initialization = r.BaseURL;
                    representation.range = initialization.range;
                }
            } else if (r.hasOwnProperty("mimeType") && self.getIsTextTrack(r.mimeType)) {
                representation.initialization = r.BaseURL;
                representation.range = 0;
            }
            if (segmentInfo.hasOwnProperty("timescale")) {
                representation.timescale = segmentInfo.timescale;
            }
            if (segmentInfo.hasOwnProperty("duration")) {
                representation.segmentDuration = segmentInfo.duration / representation.timescale;
            }
            if (segmentInfo.hasOwnProperty("startNumber")) {
                representation.startNumber = segmentInfo.startNumber;
            }
            if (segmentInfo.hasOwnProperty("indexRange")) {
                representation.indexRange = segmentInfo.indexRange;
            }
            if (segmentInfo.hasOwnProperty("presentationTimeOffset")) {
                representation.presentationTimeOffset = segmentInfo.presentationTimeOffset / representation.timescale;
            }
            representation.MSETimeOffset = self.timelineConverter.calcMSETimeOffset(representation);
            representations.push(representation);
        }
        return representations;
    },
    getAdaptationsForPeriod: function(manifest, period) {
        var p = manifest.Period_asArray[period.index], adaptations = [], adaptationSet, a;
        for (var i = 0; i < p.AdaptationSet_asArray.length; i += 1) {
            a = p.AdaptationSet_asArray[i];
            adaptationSet = new Dash.vo.AdaptationSet();
            if (a.hasOwnProperty("id")) {
                adaptationSet.id = a.id;
            }
            adaptationSet.index = i;
            adaptationSet.period = period;
            adaptationSet.type = this.getIsAudio(a) ? "audio" : this.getIsVideo(a) ? "video" : "text";
            adaptations.push(adaptationSet);
        }
        return adaptations;
    },
    getRegularPeriods: function(manifest, mpd) {
        var self = this, periods = [], isDynamic = self.getIsDynamic(manifest), i, len, p1 = null, p = null, vo1 = null, vo = null;
        for (i = 0, len = manifest.Period_asArray.length; i < len; i += 1) {
            p = manifest.Period_asArray[i];
            if (p.hasOwnProperty("start")) {
                vo = new Dash.vo.Period();
                vo.start = p.start;
            } else if (p1 !== null && p.hasOwnProperty("duration") && vo1 !== null) {
                vo = new Dash.vo.Period();
                vo.start = vo1.start + vo1.duration;
                vo.duration = p.duration;
            } else if (i === 0 && !isDynamic) {
                vo = new Dash.vo.Period();
                vo.start = 0;
            }
            if (vo1 !== null && isNaN(vo1.duration)) {
                vo1.duration = vo.start - vo1.start;
            }
            if (vo !== null && p.hasOwnProperty("id")) {
                vo.id = p.id;
            }
            if (vo !== null && p.hasOwnProperty("duration")) {
                vo.duration = p.duration;
            }
            if (vo !== null) {
                vo.index = i;
                vo.mpd = mpd;
                periods.push(vo);
                p1 = p;
                vo1 = vo;
            }
            p = null;
            vo = null;
        }
        if (periods.length === 0) {
            return periods;
        }
        mpd.checkTime = self.getCheckTime(manifest, periods[0]);
        if (vo1 !== null && isNaN(vo1.duration)) {
            vo1.duration = self.getEndTimeForLastPeriod(mpd) - vo1.start;
        }
        return periods;
    },
    getMpd: function(manifest) {
        var mpd = new Dash.vo.Mpd();
        mpd.manifest = manifest;
        if (manifest.hasOwnProperty("availabilityStartTime")) {
            mpd.availabilityStartTime = new Date(manifest.availabilityStartTime.getTime());
        } else {
            mpd.availabilityStartTime = new Date(manifest.loadedTime.getTime());
        }
        if (manifest.hasOwnProperty("availabilityEndTime")) {
            mpd.availabilityEndTime = new Date(manifest.availabilityEndTime.getTime());
        }
        if (manifest.hasOwnProperty("suggestedPresentationDelay")) {
            mpd.suggestedPresentationDelay = manifest.suggestedPresentationDelay;
        }
        if (manifest.hasOwnProperty("timeShiftBufferDepth")) {
            mpd.timeShiftBufferDepth = manifest.timeShiftBufferDepth;
        }
        if (manifest.hasOwnProperty("maxSegmentDuration")) {
            mpd.maxSegmentDuration = manifest.maxSegmentDuration;
        }
        return mpd;
    },
    getFetchTime: function(manifest, period) {
        var fetchTime = this.timelineConverter.calcPresentationTimeFromWallTime(manifest.loadedTime, period);
        return fetchTime;
    },
    getCheckTime: function(manifest, period) {
        var self = this, checkTime = NaN, fetchTime;
        if (manifest.hasOwnProperty("minimumUpdatePeriod")) {
            fetchTime = self.getFetchTime(manifest, period);
            checkTime = fetchTime + manifest.minimumUpdatePeriod;
        }
        return checkTime;
    },
    getEndTimeForLastPeriod: function(mpd) {
        var periodEnd;
        if (mpd.manifest.mediaPresentationDuration) {
            periodEnd = mpd.manifest.mediaPresentationDuration;
        } else if (!isNaN(mpd.checkTime)) {
            periodEnd = mpd.checkTime;
        } else {
            throw new Error("Must have @mediaPresentationDuration or @minimumUpdatePeriod on MPD or an explicit @duration on the last period.");
        }
        return periodEnd;
    },
    getEventsForPeriod: function(manifest, period) {
        var periodArray = manifest.Period_asArray, eventStreams = periodArray[period.index].EventStream_asArray, events = [];
        if (eventStreams) {
            for (var i = 0; i < eventStreams.length; i += 1) {
                var eventStream = new Dash.vo.EventStream();
                eventStream.period = period;
                eventStream.timescale = 1;
                if (eventStreams[i].hasOwnProperty("schemeIdUri")) {
                    eventStream.schemeIdUri = eventStreams[i].schemeIdUri;
                } else {
                    throw "Invalid EventStream. SchemeIdUri has to be set";
                }
                if (eventStreams[i].hasOwnProperty("timescale")) {
                    eventStream.timescale = eventStreams[i].timescale;
                }
                if (eventStreams[i].hasOwnProperty("value")) {
                    eventStream.value = eventStreams[i].value;
                }
                for (var j = 0; j < eventStreams[i].Event_asArray.length; j += 1) {
                    var event = new Dash.vo.Event();
                    event.presentationTime = 0;
                    event.eventStream = eventStream;
                    if (eventStreams[i].Event_asArray[j].hasOwnProperty("presentationTime")) {
                        event.presentationTime = eventStreams[i].Event_asArray[j].presentationTime;
                    }
                    if (eventStreams[i].Event_asArray[j].hasOwnProperty("duration")) {
                        event.duration = eventStreams[i].Event_asArray[j].duration;
                    }
                    if (eventStreams[i].Event_asArray[j].hasOwnProperty("id")) {
                        event.id = eventStreams[i].Event_asArray[j].id;
                    }
                    events.push(event);
                }
            }
        }
        return events;
    },
    getEventStreamForAdaptationSet: function(manifest, adaptation) {
        var eventStreams = [], inbandStreams = manifest.Period_asArray[adaptation.period.index].AdaptationSet_asArray[adaptation.index].InbandEventStream_asArray;
        if (inbandStreams) {
            for (var i = 0; i < inbandStreams.length; i += 1) {
                var eventStream = new Dash.vo.EventStream();
                eventStream.timescale = 1;
                if (inbandStreams[i].hasOwnProperty("schemeIdUri")) {
                    eventStream.schemeIdUri = inbandStreams[i].schemeIdUri;
                } else {
                    throw "Invalid EventStream. SchemeIdUri has to be set";
                }
                if (inbandStreams[i].hasOwnProperty("timescale")) {
                    eventStream.timescale = inbandStreams[i].timescale;
                }
                if (inbandStreams[i].hasOwnProperty("value")) {
                    eventStream.value = inbandStreams[i].value;
                }
                eventStreams.push(eventStream);
            }
        }
        return eventStreams;
    },
    getEventStreamForRepresentation: function(manifest, representation) {
        var eventStreams = [], inbandStreams = manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].InbandEventStream_asArray;
        if (inbandStreams) {
            for (var i = 0; i < inbandStreams.length; i++) {
                var eventStream = new Dash.vo.EventStream();
                eventStream.timescale = 1;
                eventStream.representation = representation;
                if (inbandStreams[i].hasOwnProperty("schemeIdUri")) {
                    eventStream.schemeIdUri = inbandStreams[i].schemeIdUri;
                } else {
                    throw "Invalid EventStream. SchemeIdUri has to be set";
                }
                if (inbandStreams[i].hasOwnProperty("timescale")) {
                    eventStream.timescale = inbandStreams[i].timescale;
                }
                if (inbandStreams[i].hasOwnProperty("value")) {
                    eventStream.value = inbandStreams[i].value;
                }
                eventStreams.push(eventStream);
            }
        }
        return eventStreams;
    },
    getUTCTimingSources: function(manifest) {
        "use strict";
        var self = this, isDynamic = self.getIsDynamic(manifest), hasAST = manifest.hasOwnProperty("availabilityStartTime"), utcTimingsArray = manifest.UTCTiming_asArray, utcTimingEntries = [];
        if (isDynamic || hasAST) {
            if (utcTimingsArray) {
                utcTimingsArray.forEach(function(utcTiming) {
                    var entry = new Dash.vo.UTCTiming();
                    if (utcTiming.hasOwnProperty("schemeIdUri")) {
                        entry.schemeIdUri = utcTiming.schemeIdUri;
                    } else {
                        return;
                    }
                    if (utcTiming.hasOwnProperty("value")) {
                        entry.value = utcTiming.value.toString();
                    } else {
                        return;
                    }
                    utcTimingEntries.push(entry);
                });
            }
        }
        return utcTimingEntries;
    }
};

Dash.dependencies.DashMetricsExtensions = function() {
    "use strict";
    var findRepresentationIndexInPeriodArray = function(periodArray, representationId) {
        var period, adaptationSet, adaptationSetArray, representation, representationArray, periodArrayIndex, adaptationSetArrayIndex, representationArrayIndex;
        for (periodArrayIndex = 0; periodArrayIndex < periodArray.length; periodArrayIndex = periodArrayIndex + 1) {
            period = periodArray[periodArrayIndex];
            adaptationSetArray = period.AdaptationSet_asArray;
            for (adaptationSetArrayIndex = 0; adaptationSetArrayIndex < adaptationSetArray.length; adaptationSetArrayIndex = adaptationSetArrayIndex + 1) {
                adaptationSet = adaptationSetArray[adaptationSetArrayIndex];
                representationArray = adaptationSet.Representation_asArray;
                for (representationArrayIndex = 0; representationArrayIndex < representationArray.length; representationArrayIndex = representationArrayIndex + 1) {
                    representation = representationArray[representationArrayIndex];
                    if (representationId === representation.id) {
                        return representationArrayIndex;
                    }
                }
            }
        }
        return -1;
    }, findRepresentionInPeriodArray = function(periodArray, representationId) {
        var period, adaptationSet, adaptationSetArray, representation, representationArray, periodArrayIndex, adaptationSetArrayIndex, representationArrayIndex;
        for (periodArrayIndex = 0; periodArrayIndex < periodArray.length; periodArrayIndex = periodArrayIndex + 1) {
            period = periodArray[periodArrayIndex];
            adaptationSetArray = period.AdaptationSet_asArray;
            for (adaptationSetArrayIndex = 0; adaptationSetArrayIndex < adaptationSetArray.length; adaptationSetArrayIndex = adaptationSetArrayIndex + 1) {
                adaptationSet = adaptationSetArray[adaptationSetArrayIndex];
                representationArray = adaptationSet.Representation_asArray;
                for (representationArrayIndex = 0; representationArrayIndex < representationArray.length; representationArrayIndex = representationArrayIndex + 1) {
                    representation = representationArray[representationArrayIndex];
                    if (representationId === representation.id) {
                        return representation;
                    }
                }
            }
        }
        return null;
    }, adaptationIsType = function(adaptation, bufferType) {
        return this.manifestExt.getIsTypeOf(adaptation, bufferType);
    }, findMaxBufferIndex = function(periodArray, bufferType) {
        var period, adaptationSet, adaptationSetArray, representationArray, periodArrayIndex, adaptationSetArrayIndex;
        for (periodArrayIndex = 0; periodArrayIndex < periodArray.length; periodArrayIndex = periodArrayIndex + 1) {
            period = periodArray[periodArrayIndex];
            adaptationSetArray = period.AdaptationSet_asArray;
            for (adaptationSetArrayIndex = 0; adaptationSetArrayIndex < adaptationSetArray.length; adaptationSetArrayIndex = adaptationSetArrayIndex + 1) {
                adaptationSet = adaptationSetArray[adaptationSetArrayIndex];
                representationArray = adaptationSet.Representation_asArray;
                if (adaptationIsType.call(this, adaptationSet, bufferType)) {
                    return representationArray.length;
                }
            }
        }
        return -1;
    }, getBandwidthForRepresentation = function(representationId) {
        var self = this, manifest = self.manifestModel.getValue(), representation, periodArray = manifest.Period_asArray;
        representation = findRepresentionInPeriodArray.call(self, periodArray, representationId);
        if (representation === null) {
            return null;
        }
        return representation.bandwidth;
    }, getIndexForRepresentation = function(representationId) {
        var self = this, manifest = self.manifestModel.getValue(), representationIndex, periodArray = manifest.Period_asArray;
        representationIndex = findRepresentationIndexInPeriodArray.call(self, periodArray, representationId);
        return representationIndex;
    }, getMaxIndexForBufferType = function(bufferType) {
        var self = this, manifest = self.manifestModel.getValue(), maxIndex, periodArray = manifest.Period_asArray;
        maxIndex = findMaxBufferIndex.call(this, periodArray, bufferType);
        return maxIndex;
    }, getCurrentRepresentationSwitch = function(metrics) {
        if (metrics === null) {
            return null;
        }
        var repSwitch = metrics.RepSwitchList, repSwitchLength, repSwitchLastIndex, currentRepSwitch;
        if (repSwitch === null || repSwitch.length <= 0) {
            return null;
        }
        repSwitchLength = repSwitch.length;
        repSwitchLastIndex = repSwitchLength - 1;
        currentRepSwitch = repSwitch[repSwitchLastIndex];
        return currentRepSwitch;
    }, getCurrentBufferLevel = function(metrics) {
        if (metrics === null) {
            return null;
        }
        var bufferLevel = metrics.BufferLevel, bufferLevelLength, bufferLevelLastIndex, currentBufferLevel;
        if (bufferLevel === null || bufferLevel.length <= 0) {
            return null;
        }
        bufferLevelLength = bufferLevel.length;
        bufferLevelLastIndex = bufferLevelLength - 1;
        currentBufferLevel = bufferLevel[bufferLevelLastIndex];
        return currentBufferLevel;
    }, getCurrentPlaybackRate = function(metrics) {
        if (metrics === null) {
            return null;
        }
        var playList = metrics.PlayList, trace, currentRate;
        if (playList === null || playList.length <= 0) {
            return null;
        }
        trace = playList[playList.length - 1].trace;
        if (trace === null || trace.length <= 0) {
            return null;
        }
        currentRate = trace[trace.length - 1].playbackspeed;
        return currentRate;
    }, getCurrentHttpRequest = function(metrics) {
        if (metrics === null) {
            return null;
        }
        var httpList = metrics.HttpList, httpListLength, httpListLastIndex, currentHttpList = null;
        if (httpList === null || httpList.length <= 0) {
            return null;
        }
        httpListLength = httpList.length;
        httpListLastIndex = httpListLength - 1;
        while (httpListLastIndex > 0) {
            if (httpList[httpListLastIndex].responsecode) {
                currentHttpList = httpList[httpListLastIndex];
                break;
            }
            httpListLastIndex -= 1;
        }
        return currentHttpList;
    }, getHttpRequests = function(metrics) {
        if (metrics === null) {
            return [];
        }
        return !!metrics.HttpList ? metrics.HttpList : [];
    }, getCurrentDroppedFrames = function(metrics) {
        if (metrics === null) {
            return null;
        }
        var droppedFrames = metrics.DroppedFrames, droppedFramesLength, droppedFramesLastIndex, currentDroppedFrames;
        if (droppedFrames === null || droppedFrames.length <= 0) {
            return null;
        }
        droppedFramesLength = droppedFrames.length;
        droppedFramesLastIndex = droppedFramesLength - 1;
        currentDroppedFrames = droppedFrames[droppedFramesLastIndex];
        return currentDroppedFrames;
    }, getCurrentSchedulingInfo = function(metrics) {
        if (metrics === null) return null;
        var schedulingInfo = metrics.SchedulingInfo, ln, lastIdx, currentSchedulingInfo;
        if (schedulingInfo === null || schedulingInfo.length <= 0) {
            return null;
        }
        ln = schedulingInfo.length;
        lastIdx = ln - 1;
        currentSchedulingInfo = schedulingInfo[lastIdx];
        return currentSchedulingInfo;
    }, getCurrentManifestUpdate = function(metrics) {
        if (metrics === null) return null;
        var manifestUpdate = metrics.ManifestUpdate, ln, lastIdx, currentManifestUpdate;
        if (manifestUpdate === null || manifestUpdate.length <= 0) {
            return null;
        }
        ln = manifestUpdate.length;
        lastIdx = ln - 1;
        currentManifestUpdate = manifestUpdate[lastIdx];
        return currentManifestUpdate;
    }, getCurrentDVRInfo = function(metrics) {
        if (metrics === null) {
            return null;
        }
        var dvrInfo = metrics.DVRInfo, dvrInfoLastIndex, curentDVRInfo = null;
        if (dvrInfo === null || dvrInfo.length <= 0) {
            return null;
        }
        dvrInfoLastIndex = dvrInfo.length - 1;
        curentDVRInfo = dvrInfo[dvrInfoLastIndex];
        return curentDVRInfo;
    }, getLatestMPDRequestHeaderValueByID = function(metrics, id) {
        if (metrics === null) return null;
        var httpRequestList = getHttpRequests(metrics), httpRequest = httpRequestList[httpRequestList.length - 1], headers;
        if (httpRequest.type === "MPD") {
            headers = parseResponseHeaders(httpRequest.responseHeaders, id);
        }
        return headers[id] === undefined ? null : headers[id];
    }, getLatestFragmentRequestHeaderValueByID = function(metrics, id) {
        if (metrics === null) return null;
        var httpRequest = getCurrentHttpRequest(metrics), headers;
        if (httpRequest === null || httpRequest.responseHeaders === null) return null;
        headers = parseResponseHeaders(httpRequest.responseHeaders, id);
        return headers[id] === undefined ? null : headers[id];
    }, parseResponseHeaders = function(headerStr) {
        var headers = {};
        if (!headerStr) {
            return headers;
        }
        var headerPairs = headerStr.split("\r\n");
        for (var i = 0, ilen = headerPairs.length; i < ilen; i++) {
            var headerPair = headerPairs[i];
            var index = headerPair.indexOf(": ");
            if (index > 0) {
                headers[headerPair.substring(0, index)] = headerPair.substring(index + 2);
            }
        }
        return headers;
    };
    return {
        manifestModel: undefined,
        manifestExt: undefined,
        getBandwidthForRepresentation: getBandwidthForRepresentation,
        getIndexForRepresentation: getIndexForRepresentation,
        getMaxIndexForBufferType: getMaxIndexForBufferType,
        getCurrentRepresentationSwitch: getCurrentRepresentationSwitch,
        getCurrentBufferLevel: getCurrentBufferLevel,
        getCurrentPlaybackRate: getCurrentPlaybackRate,
        getCurrentHttpRequest: getCurrentHttpRequest,
        getHttpRequests: getHttpRequests,
        getCurrentDroppedFrames: getCurrentDroppedFrames,
        getCurrentSchedulingInfo: getCurrentSchedulingInfo,
        getCurrentDVRInfo: getCurrentDVRInfo,
        getCurrentManifestUpdate: getCurrentManifestUpdate,
        getLatestFragmentRequestHeaderValueByID: getLatestFragmentRequestHeaderValueByID,
        getLatestMPDRequestHeaderValueByID: getLatestMPDRequestHeaderValueByID
    };
};

Dash.dependencies.DashMetricsExtensions.prototype = {
    constructor: Dash.dependencies.DashMetricsExtensions
};

Dash.dependencies.FragmentExtensions = function() {
    "use strict";
    var parseTFDT = function(ab) {
        var d = new DataView(ab), pos = 0, base_media_decode_time, version, size, type, i, c;
        while (type !== "tfdt" && pos < d.byteLength) {
            size = d.getUint32(pos);
            pos += 4;
            type = "";
            for (i = 0; i < 4; i += 1) {
                c = d.getInt8(pos);
                type += String.fromCharCode(c);
                pos += 1;
            }
            if (type !== "moof" && type !== "traf" && type !== "tfdt") {
                pos += size - 8;
            }
        }
        if (pos === d.byteLength) {
            throw "Error finding live offset.";
        }
        version = d.getUint8(pos);
        this.debug.log("position: " + pos);
        if (version === 0) {
            pos += 4;
            base_media_decode_time = d.getUint32(pos, false);
        } else {
            pos += size - 16;
            base_media_decode_time = utils.Math.to64BitNumber(d.getUint32(pos + 4, false), d.getUint32(pos, false));
        }
        return {
            version: version,
            base_media_decode_time: base_media_decode_time
        };
    }, parseSIDX = function(ab) {
        var d = new DataView(ab), pos = 0, version, timescale, earliest_presentation_time, i, type, size, charCode;
        while (type !== "sidx" && pos < d.byteLength) {
            size = d.getUint32(pos);
            pos += 4;
            type = "";
            for (i = 0; i < 4; i += 1) {
                charCode = d.getInt8(pos);
                type += String.fromCharCode(charCode);
                pos += 1;
            }
            if (type !== "moof" && type !== "traf" && type !== "sidx") {
                pos += size - 8;
            } else if (type === "sidx") {
                pos -= 8;
            }
        }
        version = d.getUint8(pos + 8);
        pos += 12;
        timescale = d.getUint32(pos + 4, false);
        pos += 8;
        if (version === 0) {
            earliest_presentation_time = d.getUint32(pos, false);
        } else {
            earliest_presentation_time = utils.Math.to64BitNumber(d.getUint32(pos + 4, false), d.getUint32(pos, false));
        }
        return {
            earliestPresentationTime: earliest_presentation_time,
            timescale: timescale
        };
    }, loadFragment = function(media) {
        var self = this, request = new XMLHttpRequest(), url = media, loaded = false, errorStr = "Error loading fragment: " + url, error = new MediaPlayer.vo.Error(null, errorStr, null), parsed;
        request.onloadend = function() {
            if (!loaded) {
                errorStr = "Error loading fragment: " + url;
                self.notify(Dash.dependencies.FragmentExtensions.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, {
                    fragment: null
                }, error);
            }
        };
        request.onload = function() {
            loaded = true;
            parsed = parseTFDT(request.response);
            self.notify(Dash.dependencies.FragmentExtensions.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, {
                fragment: parsed
            });
        };
        request.onerror = function() {
            errorStr = "Error loading fragment: " + url;
            self.notify(Dash.dependencies.FragmentExtensions.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, {
                fragment: null
            }, error);
        };
        request.responseType = "arraybuffer";
        request.open("GET", url);
        request.send(null);
    };
    return {
        debug: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        loadFragment: loadFragment,
        parseTFDT: parseTFDT,
        parseSIDX: parseSIDX
    };
};

Dash.dependencies.FragmentExtensions.prototype = {
    constructor: Dash.dependencies.FragmentExtensions
};

Dash.dependencies.FragmentExtensions.eventList = {
    ENAME_FRAGMENT_LOADING_COMPLETED: "fragmentLoadingCompleted"
};

Dash.vo.AdaptationSet = function() {
    "use strict";
    this.period = null;
    this.index = -1;
    this.type = null;
};

Dash.vo.AdaptationSet.prototype = {
    constructor: Dash.vo.AdaptationSet
};

Dash.vo.Event = function() {
    "use strict";
    this.duration = NaN;
    this.presentationTime = NaN;
    this.id = NaN;
    this.messageData = "";
    this.eventStream = null;
    this.presentationTimeDelta = NaN;
};

Dash.vo.Event.prototype = {
    constructor: Dash.vo.Event
};

Dash.vo.EventStream = function() {
    "use strict";
    this.adaptionSet = null;
    this.representation = null;
    this.period = null;
    this.timescale = 1;
    this.value = "";
    this.schemeIdUri = "";
};

Dash.vo.EventStream.prototype = {
    constructor: Dash.vo.EventStream
};

Dash.vo.Mpd = function() {
    "use strict";
    this.manifest = null;
    this.suggestedPresentationDelay = 0;
    this.availabilityStartTime = null;
    this.availabilityEndTime = Number.POSITIVE_INFINITY;
    this.timeShiftBufferDepth = Number.POSITIVE_INFINITY;
    this.maxSegmentDuration = Number.POSITIVE_INFINITY;
    this.checkTime = NaN;
    this.clientServerTimeShift = 0;
    this.isClientServerTimeSyncCompleted = false;
};

Dash.vo.Mpd.prototype = {
    constructor: Dash.vo.Mpd
};

Dash.vo.Period = function() {
    "use strict";
    this.id = null;
    this.index = -1;
    this.duration = NaN;
    this.start = NaN;
    this.mpd = null;
};

Dash.vo.Period.prototype = {
    constructor: Dash.vo.Period
};

Dash.vo.Representation = function() {
    "use strict";
    this.id = null;
    this.index = -1;
    this.adaptation = null;
    this.segmentInfoType = null;
    this.initialization = null;
    this.segmentDuration = NaN;
    this.timescale = 1;
    this.startNumber = 1;
    this.indexRange = null;
    this.range = null;
    this.presentationTimeOffset = 0;
    this.MSETimeOffset = NaN;
    this.segmentAvailabilityRange = null;
    this.availableSegmentsNumber = 0;
};

Dash.vo.Representation.prototype = {
    constructor: Dash.vo.Representation
};

Dash.vo.Segment = function() {
    "use strict";
    this.indexRange = null;
    this.index = null;
    this.mediaRange = null;
    this.media = null;
    this.duration = NaN;
    this.replacementTime = null;
    this.replacementNumber = NaN;
    this.mediaStartTime = NaN;
    this.presentationStartTime = NaN;
    this.availabilityStartTime = NaN;
    this.availabilityEndTime = NaN;
    this.availabilityIdx = NaN;
    this.wallStartTime = NaN;
    this.representation = null;
};

Dash.vo.Segment.prototype = {
    constructor: Dash.vo.Segment
};

Dash.vo.UTCTiming = function() {
    "use strict";
    this.schemeIdUri = "";
    this.value = "";
};

Dash.vo.UTCTiming.prototype = {
    constructor: Dash.vo.UTCTiming
};

MediaPlayer.dependencies.ErrorHandler = function() {
    "use strict";
    return {
        eventBus: undefined,
        capabilityError: function(err) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "capability",
                event: err
            });
        },
        downloadError: function(id, url, request) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "download",
                event: {
                    id: id,
                    url: url,
                    request: request
                }
            });
        },
        manifestError: function(message, id, manifest) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "manifestError",
                event: {
                    message: message,
                    id: id,
                    manifest: manifest
                }
            });
        },
        closedCaptionsError: function(message, id, ccContent) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "cc",
                event: {
                    message: message,
                    id: id,
                    cc: ccContent
                }
            });
        },
        mediaSourceError: function(err) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "mediasource",
                event: err
            });
        },
        mediaKeySessionError: function(err) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "key_session",
                event: err
            });
        },
        mediaKeyMessageError: function(err) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "key_message",
                event: err
            });
        },
        mediaKeySystemSelectionError: function(err) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "key_system_selection",
                event: err
            });
        }
    };
};

MediaPlayer.dependencies.ErrorHandler.prototype = {
    constructor: MediaPlayer.dependencies.ErrorHandler
};

MediaPlayer.dependencies.FragmentLoader = function() {
    "use strict";
    var RETRY_ATTEMPTS = 3, RETRY_INTERVAL = 500, xhrs = [], doLoad = function(request, remainingAttempts) {
        var req = new XMLHttpRequest(), httpRequestMetrics = null, firstProgress = true, needFailureReport = true, lastTraceTime = null, self = this;
        xhrs.push(req);
        request.requestStartDate = new Date();
        httpRequestMetrics = self.metricsModel.addHttpRequest(request.mediaType, null, request.type, request.url, null, request.range, request.requestStartDate, null, null, null, null, request.duration, null);
        self.metricsModel.appendHttpTrace(httpRequestMetrics, request.requestStartDate, request.requestStartDate.getTime() - request.requestStartDate.getTime(), [ 0 ]);
        lastTraceTime = request.requestStartDate;
        req.open("GET", self.requestModifierExt.modifyRequestURL(request.url), true);
        req.responseType = "arraybuffer";
        req = self.requestModifierExt.modifyRequestHeader(req);
        if (request.range) {
            req.setRequestHeader("Range", "bytes=" + request.range);
        }
        req.onprogress = function(event) {
            var currentTime = new Date();
            if (firstProgress) {
                firstProgress = false;
                if (!event.lengthComputable || event.lengthComputable && event.total != event.loaded) {
                    request.firstByteDate = currentTime;
                    httpRequestMetrics.tresponse = currentTime;
                }
            }
            self.metricsModel.appendHttpTrace(httpRequestMetrics, currentTime, currentTime.getTime() - lastTraceTime.getTime(), [ req.response ? req.response.byteLength : 0 ]);
            lastTraceTime = currentTime;
        };
        req.onload = function() {
            if (req.status < 200 || req.status > 299) {
                return;
            }
            needFailureReport = false;
            var currentTime = new Date(), bytes = req.response, latency, download;
            if (!request.firstByteDate) {
                request.firstByteDate = request.requestStartDate;
            }
            request.requestEndDate = currentTime;
            latency = request.firstByteDate.getTime() - request.requestStartDate.getTime();
            download = request.requestEndDate.getTime() - request.firstByteDate.getTime();
            self.debug.log("loaded " + request.mediaType + ":" + request.type + ":" + request.startTime + " (" + req.status + ", " + latency + "ms, " + download + "ms)");
            httpRequestMetrics.tresponse = request.firstByteDate;
            httpRequestMetrics.tfinish = request.requestEndDate;
            httpRequestMetrics.responsecode = req.status;
            httpRequestMetrics.responseHeaders = req.getAllResponseHeaders();
            self.metricsModel.appendHttpTrace(httpRequestMetrics, currentTime, currentTime.getTime() - lastTraceTime.getTime(), [ bytes ? bytes.byteLength : 0 ]);
            lastTraceTime = currentTime;
            self.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, {
                request: request,
                response: bytes
            });
        };
        req.onloadend = req.onerror = function() {
            if (xhrs.indexOf(req) === -1) {
                return;
            } else {
                xhrs.splice(xhrs.indexOf(req), 1);
            }
            if (!needFailureReport) {
                return;
            }
            needFailureReport = false;
            var currentTime = new Date(), bytes = req.response, latency, download;
            if (!request.firstByteDate) {
                request.firstByteDate = request.requestStartDate;
            }
            request.requestEndDate = currentTime;
            latency = request.firstByteDate.getTime() - request.requestStartDate.getTime();
            download = request.requestEndDate.getTime() - request.firstByteDate.getTime();
            self.debug.log("failed " + request.mediaType + ":" + request.type + ":" + request.startTime + " (" + req.status + ", " + latency + "ms, " + download + "ms)");
            httpRequestMetrics.tresponse = request.firstByteDate;
            httpRequestMetrics.tfinish = request.requestEndDate;
            httpRequestMetrics.responsecode = req.status;
            self.metricsModel.appendHttpTrace(httpRequestMetrics, currentTime, currentTime.getTime() - lastTraceTime.getTime(), [ bytes ? bytes.byteLength : 0 ]);
            lastTraceTime = currentTime;
            if (remainingAttempts > 0) {
                self.debug.log("Failed loading fragment: " + request.mediaType + ":" + request.type + ":" + request.startTime + ", retry in " + RETRY_INTERVAL + "ms" + " attempts: " + remainingAttempts);
                remainingAttempts--;
                setTimeout(function() {
                    doLoad.call(self, request, remainingAttempts);
                }, RETRY_INTERVAL);
            } else {
                self.debug.log("Failed loading fragment: " + request.mediaType + ":" + request.type + ":" + request.startTime + " no retry attempts left");
                self.errHandler.downloadError("content", request.url, req);
                self.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, {
                    request: request,
                    bytes: null
                }, new MediaPlayer.vo.Error(null, "failed loading fragment", null));
            }
        };
        req.send();
    }, checkForExistence = function(request) {
        var self = this, req = new XMLHttpRequest(), isSuccessful = false;
        req.open("HEAD", request.url, true);
        req.onload = function() {
            if (req.status < 200 || req.status > 299) return;
            isSuccessful = true;
            self.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED, {
                request: request,
                exists: true
            });
        };
        req.onloadend = req.onerror = function() {
            if (isSuccessful) return;
            self.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED, {
                request: request,
                exists: false
            });
        };
        req.send();
    };
    return {
        metricsModel: undefined,
        errHandler: undefined,
        debug: undefined,
        requestModifierExt: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        load: function(req) {
            if (!req) {
                this.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, {
                    request: req,
                    bytes: null
                }, new MediaPlayer.vo.Error(null, "request is null", null));
            } else {
                doLoad.call(this, req, RETRY_ATTEMPTS);
            }
        },
        checkForExistence: function(req) {
            if (!req) {
                this.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED, {
                    request: req,
                    exists: false
                });
                return;
            }
            checkForExistence.call(this, req);
        },
        abort: function() {
            var i, req, ln = xhrs.length;
            for (i = 0; i < ln; i += 1) {
                req = xhrs[i];
                xhrs[i] = null;
                req.abort();
                req = null;
            }
            xhrs = [];
        }
    };
};

MediaPlayer.dependencies.FragmentLoader.prototype = {
    constructor: MediaPlayer.dependencies.FragmentLoader
};

MediaPlayer.dependencies.FragmentLoader.eventList = {
    ENAME_LOADING_COMPLETED: "loadingCompleted",
    ENAME_CHECK_FOR_EXISTENCE_COMPLETED: "checkForExistenceCompleted"
};

MediaPlayer.dependencies.LiveEdgeFinder = function() {
    "use strict";
    var isSearchStarted = false, searchStartTime = NaN, rules, ruleSet = MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES, onSearchCompleted = function(req) {
        var liveEdge = req.value, searchTime = (new Date().getTime() - searchStartTime) / 1e3;
        this.notify(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, {
            liveEdge: liveEdge,
            searchTime: searchTime
        }, liveEdge === null ? new MediaPlayer.vo.Error(MediaPlayer.dependencies.LiveEdgeFinder.LIVE_EDGE_NOT_FOUND_ERROR_CODE, "live edge has not been found", null) : null);
    }, onStreamUpdated = function(e) {
        var self = this;
        if (!self.streamProcessor.isDynamic() || isSearchStarted || e.error) {
            return;
        }
        rules = self.synchronizationRulesCollection.getRules(ruleSet);
        isSearchStarted = true;
        searchStartTime = new Date().getTime();
        self.rulesController.applyRules(rules, self.streamProcessor, onSearchCompleted.bind(self), null, function(currentValue, newValue) {
            return newValue;
        });
    }, onTimeSyncComplete = function(e) {
        if (e.error) {
            ruleSet = MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES;
        } else {
            ruleSet = MediaPlayer.rules.SynchronizationRulesCollection.prototype.TIME_SYNCHRONIZED_RULES;
        }
    };
    return {
        system: undefined,
        synchronizationRulesCollection: undefined,
        rulesController: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED] = onStreamUpdated;
            this[MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED] = onTimeSyncComplete;
        },
        initialize: function(streamProcessor) {
            this.streamProcessor = streamProcessor;
            this.fragmentLoader = streamProcessor.fragmentLoader;
        },
        abortSearch: function() {
            isSearchStarted = false;
            searchStartTime = NaN;
        }
    };
};

MediaPlayer.dependencies.LiveEdgeFinder.prototype = {
    constructor: MediaPlayer.dependencies.LiveEdgeFinder
};

MediaPlayer.dependencies.LiveEdgeFinder.eventList = {
    ENAME_LIVE_EDGE_SEARCH_COMPLETED: "liveEdgeFound"
};

MediaPlayer.dependencies.LiveEdgeFinder.LIVE_EDGE_NOT_FOUND_ERROR_CODE = 1;

MediaPlayer.dependencies.ManifestLoader = function() {
    "use strict";
    var RETRY_ATTEMPTS = 3, RETRY_INTERVAL = 500, parseBaseUrl = function(url) {
        var base = null;
        if (url.indexOf("/") !== -1) {
            if (url.indexOf("?") !== -1) {
                url = url.substring(0, url.indexOf("?"));
            }
            base = url.substring(0, url.lastIndexOf("/") + 1);
        }
        return base;
    }, doLoad = function(url, remainingAttempts) {
        var baseUrl = parseBaseUrl(url), request = new XMLHttpRequest(), requestTime = new Date(), loadedTime = null, needFailureReport = true, manifest, onload = null, report = null, self = this;
        onload = function() {
            if (request.status < 200 || request.status > 299) {
                return;
            }
            needFailureReport = false;
            loadedTime = new Date();
            self.metricsModel.addHttpRequest("stream", null, "MPD", url, null, null, requestTime, loadedTime, null, request.status, null, null, request.getAllResponseHeaders());
            manifest = self.parser.parse(request.responseText, baseUrl);
            if (manifest) {
                manifest.url = url;
                manifest.loadedTime = loadedTime;
                self.metricsModel.addManifestUpdate("stream", manifest.type, requestTime, loadedTime, manifest.availabilityStartTime);
                self.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, {
                    manifest: manifest
                });
            } else {
                self.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, {
                    manifest: null
                }, new MediaPlayer.vo.Error(null, "Failed loading manifest: " + url, null));
            }
        };
        report = function() {
            if (!needFailureReport) {
                return;
            }
            needFailureReport = false;
            self.metricsModel.addHttpRequest("stream", null, "MPD", url, null, null, requestTime, new Date(), request.status, null, null, request.getAllResponseHeaders());
            if (remainingAttempts > 0) {
                self.debug.log("Failed loading manifest: " + url + ", retry in " + RETRY_INTERVAL + "ms" + " attempts: " + remainingAttempts);
                remainingAttempts--;
                setTimeout(function() {
                    doLoad.call(self, url, remainingAttempts);
                }, RETRY_INTERVAL);
            } else {
                self.debug.log("Failed loading manifest: " + url + " no retry attempts left");
                self.errHandler.downloadError("manifest", url, request);
                self.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, null, new Error("Failed loading manifest: " + url + " no retry attempts left"));
            }
        };
        try {
            request.onload = onload;
            request.onloadend = report;
            request.onerror = report;
            request.open("GET", self.requestModifierExt.modifyRequestURL(url), true);
            request.send();
        } catch (e) {
            request.onerror();
        }
    };
    return {
        debug: undefined,
        parser: undefined,
        errHandler: undefined,
        metricsModel: undefined,
        requestModifierExt: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        load: function(url) {
            doLoad.call(this, url, RETRY_ATTEMPTS);
        }
    };
};

MediaPlayer.dependencies.ManifestLoader.prototype = {
    constructor: MediaPlayer.dependencies.ManifestLoader
};

MediaPlayer.dependencies.ManifestLoader.eventList = {
    ENAME_MANIFEST_LOADED: "manifestLoaded"
};

MediaPlayer.dependencies.ManifestUpdater = function() {
    "use strict";
    var refreshDelay = NaN, refreshTimer = null, isStopped = false, isUpdating = false, clear = function() {
        if (refreshTimer !== null) {
            clearInterval(refreshTimer);
            refreshTimer = null;
        }
    }, start = function() {
        clear.call(this);
        if (!isNaN(refreshDelay)) {
            this.debug.log("Refresh manifest in " + refreshDelay + " seconds.");
            refreshTimer = setTimeout(onRefreshTimer.bind(this), Math.min(refreshDelay * 1e3, Math.pow(2, 31) - 1), this);
        }
    }, update = function() {
        var self = this, manifest = self.manifestModel.getValue(), delay, timeSinceLastUpdate;
        if (manifest !== undefined && manifest !== null) {
            delay = self.manifestExt.getRefreshDelay(manifest);
            timeSinceLastUpdate = (new Date().getTime() - manifest.loadedTime.getTime()) / 1e3;
            refreshDelay = Math.max(delay - timeSinceLastUpdate, 0);
            start.call(self);
        }
    }, onRefreshTimer = function() {
        var self = this, manifest, url;
        if (isUpdating) return;
        isUpdating = true;
        manifest = self.manifestModel.getValue();
        url = manifest.url;
        if (manifest.hasOwnProperty("Location")) {
            url = manifest.Location;
        }
        self.manifestLoader.load(url);
    }, onManifestLoaded = function(e) {
        if (e.error) return;
        this.manifestModel.setValue(e.data.manifest);
        this.debug.log("Manifest has been refreshed.");
        if (isStopped) return;
        update.call(this);
    }, onPlaybackStarted = function() {
        this.start();
    }, onPlaybackPaused = function() {
        this.stop();
    }, onStreamsComposed = function() {
        isUpdating = false;
    };
    return {
        debug: undefined,
        system: undefined,
        manifestModel: undefined,
        manifestExt: undefined,
        manifestLoader: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED] = onStreamsComposed;
            this[MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED] = onManifestLoaded;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED] = onPlaybackStarted;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED] = onPlaybackPaused;
        },
        start: function() {
            isStopped = false;
            update.call(this);
        },
        stop: function() {
            isStopped = true;
            clear.call(this);
        }
    };
};

MediaPlayer.dependencies.ManifestUpdater.prototype = {
    constructor: MediaPlayer.dependencies.ManifestUpdater
};

MediaPlayer.dependencies.Notifier = function() {
    "use strict";
    var system, id = 0, getId = function() {
        if (!this.id) {
            id += 1;
            this.id = "_id_" + id;
        }
        return this.id;
    };
    return {
        system: undefined,
        setup: function() {
            system = this.system;
            system.mapValue("notify", this.notify);
            system.mapValue("subscribe", this.subscribe);
            system.mapValue("unsubscribe", this.unsubscribe);
        },
        notify: function() {
            var eventId = arguments[0] + getId.call(this), event = new MediaPlayer.vo.Event();
            event.sender = this;
            event.type = arguments[0];
            event.data = arguments[1];
            event.error = arguments[2];
            event.timestamp = new Date().getTime();
            system.notify.call(system, eventId, event);
        },
        subscribe: function(eventName, observer, handler, oneShot) {
            if (!handler && observer[eventName]) {
                handler = observer[eventName] = observer[eventName].bind(observer);
            }
            if (!observer) throw "observer object cannot be null or undefined";
            if (!handler) throw "event handler cannot be null or undefined";
            eventName += getId.call(this);
            system.mapHandler(eventName, undefined, handler, oneShot);
        },
        unsubscribe: function(eventName, observer, handler) {
            handler = handler || observer[eventName];
            eventName += getId.call(this);
            system.unmapHandler(eventName, undefined, handler);
        }
    };
};

MediaPlayer.dependencies.Notifier.prototype = {
    constructor: MediaPlayer.dependencies.Notifier
};

MediaPlayer.dependencies.Stream = function() {
    "use strict";
    var manifest, mediaSource, mediaInfos = {}, streamProcessors = [], autoPlay = true, initialized = false, loaded = false, errored = false, kid = null, initData = [], updating = true, streamInfo = null, updateError = {}, eventController = null, play = function() {
        if (!initialized) {
            return;
        }
        this.playbackController.start();
    }, pause = function() {
        this.playbackController.pause();
    }, seek = function(time) {
        if (!initialized) {
            return;
        }
        this.debug.log("Do seek: " + time);
        this.playbackController.seek(time);
    }, onNeedKey = function(event) {
        try {
            var mediaInfo = mediaInfos.video, initData = this.protectionExt.autoSelectKeySystem(this.protectionModel, mediaInfo, event.data.initData);
            if (!!this.keySystem && this.keySystem !== this.protectionModel.keySystem) {
                throw new Error("DRM:  Changing key systems within a single Period is not allowed!");
            }
            if (!this.keySystem) {
                this.keySystem = this.protectionModel.keySystem;
                this.protectionModel.keySystem.subscribe(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, this);
            }
            this.debug.log("DRM: Key required for - " + mediaInfo.codec);
            this.protectionController.createKeySession(initData, mediaInfo.codec);
        } catch (error) {
            this.errHandler.mediaKeySessionError(error.message);
            this.debug.log(error.message);
            this.reset();
        }
    }, onKeyAdded = function() {
        this.debug.log("DRM: Key added.");
    }, onLicenseRequestComplete = function(e) {
        if (e.error) {
            pause.call(this);
            this.debug.log(e.error);
            this.errHandler.mediaKeyMessageError(e.error);
        } else {
            this.debug.log("DRM: License request successful.  Session ID = " + e.data.requestData.sessionID);
            this.protectionController.updateKeySession(e.data.requestData, e.data.message);
        }
    }, onKeyError = function(event) {
        var session = event.data.sessionToken, sessionID = session.sessionID ? session.sessionID : "NONE", msg;
        msg = "DRM: MediaKeyError - sessionId: " + sessionID + ".  " + event.data.error;
        this.debug.log(msg);
        this.errHandler.mediaKeySessionError(msg);
    }, onKeySessionCreated = function(event) {
        this.debug.log("DRM: Session created.  SessionID = " + event.data.sessionID);
    }, onKeySessionLoaded = function(event) {
        this.debug.log("DRM: Session loaded.  SessionID = " + event.data.sessionID);
    }, onKeySessionUnloaded = function(event) {
        this.debug.log("DRM: Session unloaded.  SessionID = " + event.data.sessionID);
    }, onKeySessionClosed = function(event) {
        this.debug.log("DRM: Session closed.  SessionID = " + event.data.sessionID);
    }, setUpMediaSource = function(mediaSourceArg, callback) {
        var self = this, sourceUrl, onMediaSourceOpen = function(e) {
            self.debug.log("MediaSource is open!");
            self.debug.log(e);
            window.URL.revokeObjectURL(sourceUrl);
            mediaSourceArg.removeEventListener("sourceopen", onMediaSourceOpen);
            mediaSourceArg.removeEventListener("webkitsourceopen", onMediaSourceOpen);
            callback(mediaSourceArg);
        };
        mediaSourceArg.addEventListener("sourceopen", onMediaSourceOpen, false);
        mediaSourceArg.addEventListener("webkitsourceopen", onMediaSourceOpen, false);
        sourceUrl = self.mediaSourceExt.attachMediaSource(mediaSourceArg, self.videoModel);
    }, tearDownMediaSource = function() {
        var self = this, ln = streamProcessors.length, i = 0, processor;
        for (i; i < ln; i += 1) {
            processor = streamProcessors[i];
            processor.reset(errored);
            processor = null;
        }
        if (!!eventController) {
            eventController.reset();
        }
        streamProcessors = [];
        if (!!mediaSource) {
            self.mediaSourceExt.detachMediaSource(self.videoModel);
        }
        initialized = false;
        kid = null;
        initData = [];
        mediaInfos = {};
        mediaSource = null;
        manifest = null;
    }, initializeMediaForType = function(type, manifest) {
        var self = this, mimeType, codec, getCodecOrMimeType = function(mediaInfo) {
            return mediaInfo.codec;
        }, processor, mediaInfo = self.adapter.getMediaInfoForType(manifest, streamInfo, type);
        if (type === "text") {
            getCodecOrMimeType = function(mediaInfo) {
                mimeType = mediaInfo.mimeType;
                return mimeType;
            };
        }
        if (mediaInfo !== null) {
            var codecOrMime = getCodecOrMimeType.call(self, mediaInfo), contentProtectionData, buffer = null;
            if (codecOrMime === mimeType) {
                try {
                    buffer = self.sourceBufferExt.createSourceBuffer(mediaSource, mediaInfo);
                } catch (e) {
                    self.errHandler.mediaSourceError("Error creating " + type + " source buffer.");
                }
            } else {
                codec = codecOrMime;
                self.debug.log(type + " codec: " + codec);
                mediaInfos[type] = mediaInfo;
                contentProtectionData = mediaInfo.contentProtection;
                if (!!contentProtectionData && !self.capabilities.supportsEncryptedMedia()) {
                    self.errHandler.capabilityError("encryptedmedia");
                } else {
                    if (!self.capabilities.supportsCodec(self.videoModel.getElement(), codec)) {
                        var msg = type + "Codec (" + codec + ") is not supported.";
                        self.errHandler.manifestError(msg, "codec", manifest);
                        self.debug.log(msg);
                    } else {
                        try {
                            buffer = self.sourceBufferExt.createSourceBuffer(mediaSource, mediaInfo);
                        } catch (e) {
                            self.errHandler.mediaSourceError("Error creating " + type + " source buffer.");
                        }
                    }
                }
            }
            if (buffer === null) {
                self.debug.log("No buffer was created, skipping " + type + " data.");
            } else {
                processor = self.system.getObject("streamProcessor");
                streamProcessors.push(processor);
                processor.initialize(mimeType || type, buffer, self.videoModel, self.fragmentController, self.playbackController, mediaSource, self, eventController);
                processor.setMediaInfo(mediaInfo);
                self.adapter.updateData(processor);
            }
        } else {
            self.debug.log("No " + type + " data.");
        }
    }, initializeMediaSource = function() {
        var self = this, events;
        eventController = self.system.getObject("eventController");
        eventController.initialize(self.videoModel);
        events = self.adapter.getEventsFor(streamInfo);
        eventController.addInlineEvents(events);
        initializeMediaForType.call(self, "video", manifest);
        initializeMediaForType.call(self, "audio", manifest);
        initializeMediaForType.call(self, "text", manifest);
    }, initializePlayback = function() {
        var self = this, manifestDuration, mediaDuration;
        manifestDuration = streamInfo.manifestInfo.duration;
        mediaDuration = self.mediaSourceExt.setDuration(mediaSource, manifestDuration);
        self.debug.log("Duration successfully set to: " + mediaDuration);
        initialized = true;
        checkIfInitializationCompleted.call(self);
    }, onLoad = function() {
        this.debug.log("element loaded!");
        loaded = true;
        startAutoPlay.call(this);
    }, startAutoPlay = function() {
        if (!initialized || !loaded) return;
        if (streamInfo.index === 0) {
            eventController.start();
            if (autoPlay) {
                play.call(this);
            }
        }
    }, checkIfInitializationCompleted = function() {
        var self = this, ln = streamProcessors.length, hasError = !!updateError.audio || !!updateError.video, error = hasError ? new MediaPlayer.vo.Error(MediaPlayer.dependencies.Stream.DATA_UPDATE_FAILED_ERROR_CODE, "Data update failed", null) : null, i = 0;
        if (!initialized) return;
        for (i; i < ln; i += 1) {
            if (streamProcessors[i].isUpdating()) return;
        }
        updating = false;
        self.notify(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, null, error);
    }, onError = function(e) {
        var code = e.data.error.code, msg = "";
        if (code === -1) {
            return;
        }
        switch (code) {
          case 1:
            msg = "MEDIA_ERR_ABORTED";
            break;

          case 2:
            msg = "MEDIA_ERR_NETWORK";
            break;

          case 3:
            msg = "MEDIA_ERR_DECODE";
            break;

          case 4:
            msg = "MEDIA_ERR_SRC_NOT_SUPPORTED";
            break;

          case 5:
            msg = "MEDIA_ERR_ENCRYPTED";
            break;
        }
        errored = true;
        this.debug.log("Video Element Error: " + msg);
        this.debug.log(e.error);
        this.errHandler.mediaSourceError(msg);
        this.reset();
    }, doLoad = function(manifestResult) {
        var self = this, onMediaSourceSetup = function(mediaSourceResult) {
            mediaSource = mediaSourceResult;
            initializeMediaSource.call(self);
            if (streamProcessors.length === 0) {
                var msg = "No streams to play.";
                self.errHandler.manifestError(msg, "nostreams", manifest);
                self.debug.log(msg);
            } else {
                self.liveEdgeFinder.initialize(streamProcessors[0]);
                self.liveEdgeFinder.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, self.playbackController);
                initializePlayback.call(self);
                startAutoPlay.call(self);
            }
        }, mediaSourceResult;
        manifest = manifestResult;
        mediaSourceResult = self.mediaSourceExt.createMediaSource();
        setUpMediaSource.call(self, mediaSourceResult, onMediaSourceSetup);
    }, onBufferingCompleted = function() {
        var processors = getAudioVideoProcessors(), ln = processors.length, i = 0;
        for (i; i < ln; i += 1) {
            if (!processors[i].isBufferingCompleted()) return;
        }
        if (mediaSource && streamInfo.isLast) {
            this.mediaSourceExt.signalEndOfStream(mediaSource);
        }
    }, onDataUpdateCompleted = function(e) {
        var type = e.sender.streamProcessor.getType();
        updateError[type] = e.error;
        checkIfInitializationCompleted.call(this);
    }, getAudioVideoProcessors = function() {
        var arr = [], i = 0, ln = streamProcessors.length, type, proc;
        for (i; i < ln; i += 1) {
            proc = streamProcessors[i];
            type = proc.getType();
            if (type === "audio" || type === "video") {
                arr.push(proc);
            }
        }
        return arr;
    }, updateData = function(updatedStreamInfo) {
        var self = this, ln = streamProcessors.length, i = 0, mediaInfo, events, processor;
        updating = true;
        manifest = self.manifestModel.getValue();
        streamInfo = updatedStreamInfo;
        self.debug.log("Manifest updated... set new data on buffers.");
        if (eventController) {
            events = self.adapter.getEventsFor(streamInfo);
            eventController.addInlineEvents(events);
        }
        for (i; i < ln; i += 1) {
            processor = streamProcessors[i];
            mediaInfo = self.adapter.getMediaInfoForType(manifest, streamInfo, processor.getType());
            processor.setMediaInfo(mediaInfo);
            this.adapter.updateData(processor);
        }
    };
    return {
        system: undefined,
        manifestModel: undefined,
        mediaSourceExt: undefined,
        sourceBufferExt: undefined,
        adapter: undefined,
        fragmentController: undefined,
        playbackController: undefined,
        protectionExt: undefined,
        capabilities: undefined,
        debug: undefined,
        errHandler: undefined,
        liveEdgeFinder: undefined,
        abrController: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        eventList: {
            ENAME_STREAM_UPDATED: "streamUpdated"
        },
        setup: function() {
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED] = onBufferingCompleted;
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR] = onError;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_METADATA_LOADED] = onLoad;
            this[MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE] = onLicenseRequestComplete.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY] = onNeedKey.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED] = onKeyAdded.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR] = onKeyError.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED] = onKeySessionCreated.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_LOADED] = onKeySessionLoaded.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_UNLOADED] = onKeySessionUnloaded.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED] = onKeySessionClosed.bind(this);
        },
        load: function(manifest) {
            doLoad.call(this, manifest);
        },
        setVideoModel: function(value) {
            this.videoModel = value;
        },
        initProtection: function() {
            if (this.capabilities.supportsEncryptedMedia()) {
                this.protectionModel = this.system.getObject("protectionModel");
                this.protectionModel.init(this.getVideoModel());
                this.protectionModel.setMediaElement(this.videoModel.getElement());
                this.protectionController = this.system.getObject("protectionController");
                this.protectionController.init(this.protectionModel);
                this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, this);
                this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED, this);
                this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, this);
                this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, this);
                this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_LOADED, this);
                this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_UNLOADED, this);
                this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, this);
            }
        },
        getVideoModel: function() {
            return this.videoModel;
        },
        setAutoPlay: function(value) {
            autoPlay = value;
        },
        getAutoPlay: function() {
            return autoPlay;
        },
        reset: function() {
            pause.call(this);
            if (!!this.protectionModel) {
                this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, this);
                this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED, this);
                this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, this);
                this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, this);
                this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_LOADED, this);
                this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_UNLOADED, this);
                this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, this);
                if (!!this.keySystem) {
                    this.keySystem.unsubscribe(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, this);
                    this.keySystem = undefined;
                }
                this.protectionController.teardown();
                this.protectionModel.teardown();
                this.protectionController = undefined;
                this.protectionModel = undefined;
            }
            tearDownMediaSource.call(this);
            this.fragmentController = undefined;
            this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR, this);
            this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_METADATA_LOADED, this);
            this.playbackController.reset();
            this.liveEdgeFinder.abortSearch();
            this.liveEdgeFinder.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, this.playbackController);
            loaded = false;
            updateError = {};
        },
        getDuration: function() {
            return streamInfo.duration;
        },
        getStartTime: function() {
            return streamInfo.start;
        },
        getStreamIndex: function() {
            return streamInfo.index;
        },
        getId: function() {
            return streamInfo.id;
        },
        setStreamInfo: function(stream) {
            streamInfo = stream;
        },
        getStreamInfo: function() {
            return streamInfo;
        },
        startEventController: function() {
            eventController.start();
        },
        resetEventController: function() {
            eventController.reset();
        },
        setPlaybackController: function(value) {
            this.playbackController = value;
            value.initialize(streamInfo, this.videoModel);
        },
        getPlaybackController: function() {
            return this.playbackController;
        },
        isUpdating: function() {
            return updating;
        },
        updateData: updateData,
        play: play,
        seek: seek,
        pause: pause
    };
};

MediaPlayer.dependencies.Stream.prototype = {
    constructor: MediaPlayer.dependencies.Stream
};

MediaPlayer.dependencies.Stream.DATA_UPDATE_FAILED_ERROR_CODE = 1;

MediaPlayer.dependencies.Stream.eventList = {
    ENAME_STREAM_UPDATED: "streamUpdated"
};

MediaPlayer.dependencies.StreamProcessor = function() {
    "use strict";
    var isDynamic, stream, mediaInfo, type, eventController, createBufferControllerForType = function(type) {
        var self = this, controllerName = type === "video" || type === "audio" ? "bufferController" : "textController";
        return self.system.getObject(controllerName);
    };
    return {
        system: undefined,
        indexHandler: undefined,
        liveEdgeFinder: undefined,
        timelineConverter: undefined,
        eventList: undefined,
        abrController: undefined,
        baseURLExt: undefined,
        adapter: undefined,
        initialize: function(typeValue, buffer, videoModel, fragmentController, playbackController, mediaSource, streamValue, eventControllerValue) {
            var self = this, trackController = self.system.getObject("trackController"), scheduleController = self.system.getObject("scheduleController"), liveEdgeFinder = self.liveEdgeFinder, abrController = self.abrController, indexHandler = self.indexHandler, baseUrlExt = self.baseURLExt, fragmentModel, fragmentLoader = this.system.getObject("fragmentLoader"), bufferController = createBufferControllerForType.call(self, typeValue);
            stream = streamValue;
            type = typeValue;
            eventController = eventControllerValue;
            isDynamic = stream.getStreamInfo().manifestInfo.isDynamic;
            self.bufferController = bufferController;
            self.playbackController = playbackController;
            self.scheduleController = scheduleController;
            self.trackController = trackController;
            self.videoModel = videoModel;
            self.fragmentController = fragmentController;
            self.fragmentLoader = fragmentLoader;
            trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, bufferController);
            fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED, bufferController);
            if (type === "video" || type === "audio") {
                abrController.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, bufferController);
                abrController.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, trackController);
                abrController.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, scheduleController);
                liveEdgeFinder.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, this.timelineConverter);
                liveEdgeFinder.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, trackController);
                liveEdgeFinder.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, scheduleController);
                trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED, scheduleController);
                trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, scheduleController);
                trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, abrController);
                trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, stream);
                if (!playbackController.streamProcessor) {
                    playbackController.streamProcessor = self;
                    trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, playbackController);
                }
                fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED, bufferController);
                fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START, scheduleController);
                fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, scheduleController);
                fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, bufferController);
                fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, scheduleController.scheduleRulesCollection.bufferLevelRule);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, videoModel);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED, scheduleController);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, scheduleController);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED, scheduleController);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED, trackController);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, scheduleController);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED, scheduleController);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED, stream);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED, scheduleController);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, scheduleController.scheduleRulesCollection.bufferLevelRule);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, scheduleController.scheduleRulesCollection.bufferLevelRule);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, playbackController);
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS, bufferController);
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, bufferController);
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED, bufferController);
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED, scheduleController);
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, bufferController);
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, scheduleController);
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, scheduleController);
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, scheduleController.scheduleRulesCollection.playbackTimeRule);
                if (isDynamic) {
                    playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, trackController);
                }
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, bufferController);
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, scheduleController);
                baseUrlExt.subscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED, indexHandler);
                baseUrlExt.subscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED, indexHandler);
            } else {
                bufferController.subscribe(MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED, scheduleController);
            }
            indexHandler.initialize(this);
            bufferController.initialize(type, buffer, mediaSource, self);
            scheduleController.initialize(type, this);
            fragmentModel = this.getFragmentModel();
            fragmentModel.setLoader(fragmentLoader);
            fragmentModel.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED, fragmentController);
            fragmentModel.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, fragmentController);
            fragmentModel.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED, fragmentController);
            fragmentModel.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, scheduleController);
            fragmentLoader.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, fragmentModel);
            if (type === "video" || type === "audio") {
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, fragmentModel);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, fragmentModel);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED, fragmentModel);
            }
            trackController.initialize(this);
        },
        isUpdating: function() {
            return this.trackController.isUpdating();
        },
        getType: function() {
            return type;
        },
        getFragmentLoader: function() {
            return this.fragmentLoader;
        },
        getFragmentModel: function() {
            return this.scheduleController.getFragmentModel();
        },
        getPlaybackController: function() {
            return this.playbackController;
        },
        getStreamInfo: function() {
            return stream.getStreamInfo();
        },
        setMediaInfo: function(value) {
            mediaInfo = value;
        },
        getMediaInfo: function() {
            return mediaInfo;
        },
        getScheduleController: function() {
            return this.scheduleController;
        },
        getEventController: function() {
            return eventController;
        },
        start: function() {
            this.scheduleController.start();
        },
        stop: function() {
            this.scheduleController.stop();
        },
        getCurrentTrack: function() {
            return this.adapter.getCurrentTrackInfo(this.trackController);
        },
        getTrackForQuality: function(quality) {
            return this.adapter.getTrackInfoForQuality(this.trackController, quality);
        },
        isBufferingCompleted: function() {
            return this.bufferController.isBufferingCompleted();
        },
        isDynamic: function() {
            return isDynamic;
        },
        reset: function(errored) {
            var self = this, bufferController = self.bufferController, trackController = self.trackController, scheduleController = self.scheduleController, liveEdgeFinder = self.liveEdgeFinder, fragmentController = self.fragmentController, abrController = self.abrController, playbackController = self.playbackController, indexHandler = this.indexHandler, baseUrlExt = this.baseURLExt, fragmentModel = this.getFragmentModel(), fragmentLoader = this.fragmentLoader, videoModel = self.videoModel;
            abrController.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, bufferController);
            abrController.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, trackController);
            abrController.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, scheduleController);
            liveEdgeFinder.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, this.timelineConverter);
            liveEdgeFinder.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, scheduleController);
            liveEdgeFinder.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, trackController);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED, scheduleController);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, bufferController);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, scheduleController);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, abrController);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, stream);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, playbackController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED, bufferController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED, bufferController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START, scheduleController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, scheduleController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, bufferController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, scheduleController.scheduleRulesCollection.bufferLevelRule);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, videoModel);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED, scheduleController);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, scheduleController);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED, scheduleController);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED, trackController);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, scheduleController);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED, scheduleController);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED, stream);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED, scheduleController);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, scheduleController.scheduleRulesCollection.bufferLevelRule);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, scheduleController.scheduleRulesCollection.bufferLevelRule);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, playbackController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS, bufferController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, bufferController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED, bufferController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED, scheduleController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, bufferController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, scheduleController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, scheduleController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, trackController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, bufferController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, scheduleController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, scheduleController.scheduleRulesCollection.playbackTimeRule);
            baseUrlExt.unsubscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED, indexHandler);
            baseUrlExt.unsubscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED, indexHandler);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, fragmentModel);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, fragmentModel);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED, fragmentModel);
            fragmentModel.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED, fragmentController);
            fragmentModel.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, fragmentController);
            fragmentModel.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED, fragmentController);
            fragmentModel.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, scheduleController);
            fragmentLoader.unsubscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, fragmentModel);
            fragmentController.resetModel(fragmentModel);
            indexHandler.reset();
            this.bufferController.reset(errored);
            this.scheduleController.reset();
            this.bufferController = null;
            this.scheduleController = null;
            this.trackController = null;
            this.videoModel = null;
            this.fragmentController = null;
        }
    };
};

MediaPlayer.dependencies.StreamProcessor.prototype = {
    constructor: MediaPlayer.dependencies.StreamProcessor
};

MediaPlayer.utils.TTMLParser = function() {
    "use strict";
    var SECONDS_IN_HOUR = 60 * 60, SECONDS_IN_MIN = 60, timingRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])((\.[0-9][0-9][0-9])|(:[0-9][0-9]))$/, ttml, parseTimings = function(timingStr) {
        var test = timingRegex.test(timingStr), timeParts, parsedTime, frameRate;
        if (!test) {
            return NaN;
        }
        timeParts = timingStr.split(":");
        parsedTime = parseFloat(timeParts[0]) * SECONDS_IN_HOUR + parseFloat(timeParts[1]) * SECONDS_IN_MIN + parseFloat(timeParts[2]);
        if (timeParts[3]) {
            frameRate = ttml.tt.frameRate;
            if (frameRate && !isNaN(frameRate)) {
                parsedTime += parseFloat(timeParts[3]) / frameRate;
            } else {
                return NaN;
            }
        }
        return parsedTime;
    }, passStructuralConstraints = function() {
        var passed = false, hasTt = ttml.hasOwnProperty("tt"), hasHead = hasTt ? ttml.tt.hasOwnProperty("head") : false, hasLayout = hasHead ? ttml.tt.head.hasOwnProperty("layout") : false, hasStyling = hasHead ? ttml.tt.head.hasOwnProperty("styling") : false, hasBody = hasTt ? ttml.tt.hasOwnProperty("body") : false, hasProfile = hasHead ? ttml.tt.head.hasOwnProperty("profile") : false;
        if (hasTt && hasHead && hasLayout && hasStyling && hasBody) {
            passed = true;
        }
        if (passed) {
            passed = hasProfile && ttml.tt.head.profile.use === "http://www.w3.org/ns/ttml/profile/sdp-us";
        }
        return passed;
    }, getNamespacePrefix = function(json, ns) {
        var r = Object.keys(json).filter(function(k) {
            return k.split(":")[0] === "xmlns" && json[k] === ns;
        }).map(function(k) {
            return k.split(":")[1];
        });
        if (r.length != 1) {
            return null;
        }
        return r[0];
    }, internalParse = function(data) {
        var captionArray = [], converter = new X2JS([], "", false), errorMsg, cues, cue, startTime, endTime, nsttp, i;
        ttml = converter.xml_str2json(data);
        if (!passStructuralConstraints()) {
            errorMsg = "TTML document has incorrect structure";
            throw errorMsg;
        }
        nsttp = getNamespacePrefix(ttml.tt, "http://www.w3.org/ns/ttml#parameter");
        if (ttml.tt.hasOwnProperty(nsttp + ":frameRate")) {
            ttml.tt.frameRate = parseInt(ttml.tt[nsttp + ":frameRate"], 10);
        }
        cues = ttml.tt.body.div_asArray[0].p_asArray;
        if (!cues || cues.length === 0) {
            errorMsg = "TTML document does not contain any cues";
            throw errorMsg;
        }
        for (i = 0; i < cues.length; i += 1) {
            cue = cues[i];
            startTime = parseTimings(cue.begin);
            endTime = parseTimings(cue.end);
            if (isNaN(startTime) || isNaN(endTime)) {
                errorMsg = "TTML document has incorrect timing value";
                throw errorMsg;
            }
            captionArray.push({
                start: startTime,
                end: endTime,
                data: cue.__text
            });
        }
        return captionArray;
    };
    return {
        parse: internalParse
    };
};

MediaPlayer.dependencies.TextSourceBuffer = function() {
    var mediaInfo, mimeType;
    return {
        system: undefined,
        eventBus: undefined,
        errHandler: undefined,
        initialize: function(type, bufferController) {
            mimeType = type;
            this.videoModel = bufferController.videoModel;
            mediaInfo = bufferController.streamProcessor.getCurrentTrack().mediaInfo;
        },
        append: function(bytes) {
            var self = this, result, label, lang, ccContent = String.fromCharCode.apply(null, new Uint16Array(bytes));
            try {
                result = self.getParser().parse(ccContent);
                label = mediaInfo.id;
                lang = mediaInfo.lang;
                self.getTextTrackExtensions().addTextTrack(self.videoModel.getElement(), result, label, lang, true);
                self.eventBus.dispatchEvent({
                    type: "updateend"
                });
            } catch (e) {
                self.errHandler.closedCaptionsError(e, "parse", ccContent);
            }
        },
        abort: function() {
            this.getTextTrackExtensions().deleteCues(this.videoModel.getElement());
        },
        getParser: function() {
            var parser;
            if (mimeType === "text/vtt") {
                parser = this.system.getObject("vttParser");
            } else if (mimeType === "application/ttml+xml") {
                parser = this.system.getObject("ttmlParser");
            }
            return parser;
        },
        getTextTrackExtensions: function() {
            return this.system.getObject("textTrackExtensions");
        },
        addEventListener: function(type, listener, useCapture) {
            this.eventBus.addEventListener(type, listener, useCapture);
        },
        removeEventListener: function(type, listener, useCapture) {
            this.eventBus.removeEventListener(type, listener, useCapture);
        }
    };
};

MediaPlayer.dependencies.TextSourceBuffer.prototype = {
    constructor: MediaPlayer.dependencies.TextSourceBuffer
};

MediaPlayer.dependencies.TimeSyncController = function() {
    "use strict";
    var HTTP_TIMEOUT_MS = 5e3, offsetToDeviceTimeMs = 0, isSynchronizing = false, isInitialised = false, setIsSynchronizing = function(value) {
        isSynchronizing = value;
    }, getIsSynchronizing = function() {
        return isSynchronizing;
    }, setIsInitialised = function(value) {
        isInitialised = value;
    }, setOffsetMs = function(value) {
        offsetToDeviceTimeMs = value;
    }, getOffsetMs = function() {
        return offsetToDeviceTimeMs;
    }, alternateXsdatetimeDecoder = function(xsdatetimeStr) {
        var SECONDS_IN_MIN = 60, MINUTES_IN_HOUR = 60, MILLISECONDS_IN_SECONDS = 1e3, datetimeRegex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+\-])([0-9]{2})([0-9]{2}))?/, match = datetimeRegex.exec(xsdatetimeStr), utcDate, timezoneOffset;
        utcDate = Date.UTC(parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10), parseInt(match[4], 10), parseInt(match[5], 10), match[6] && (parseInt(match[6], 10) || 0), match[7] && parseFloat(match[7]) * MILLISECONDS_IN_SECONDS || 0);
        if (match[9] && match[10]) {
            timezoneOffset = parseInt(match[9], 10) * MINUTES_IN_HOUR + parseInt(match[10], 10);
            utcDate += (match[8] === "+" ? -1 : +1) * timezoneOffset * SECONDS_IN_MIN * MILLISECONDS_IN_SECONDS;
        }
        return new Date(utcDate).getTime();
    }, xsdatetimeDecoder = function(xsdatetimeStr) {
        var parsedDate = Date.parse(xsdatetimeStr);
        if (isNaN(parsedDate)) {
            parsedDate = alternateXsdatetimeDecoder(xsdatetimeStr);
        }
        return parsedDate;
    }, iso8601Decoder = function(isoStr) {
        return Date.parse(isoStr);
    }, rfc1123Decoder = function(dateStr) {
        return Date.parse(dateStr);
    }, notSupportedHandler = function(url, onSuccessCB, onFailureCB) {
        onFailureCB();
    }, directHandler = function(xsdatetimeStr, onSuccessCB, onFailureCB) {
        var time = xsdatetimeDecoder(xsdatetimeStr);
        if (!isNaN(time)) {
            onSuccessCB(time);
            return;
        }
        onFailureCB();
    }, httpHandler = function(decoder, url, onSuccessCB, onFailureCB, isHeadRequest) {
        var oncomplete, onload, complete = false, req = new XMLHttpRequest(), verb = isHeadRequest ? "HEAD" : "GET", urls = url.match(/\S+/g);
        url = urls.shift();
        oncomplete = function() {
            if (complete) {
                return;
            }
            complete = true;
            if (urls.length) {
                httpHandler(decoder, urls.join(" "), onSuccessCB, onFailureCB, isHeadRequest);
            } else {
                onFailureCB();
            }
        };
        onload = function() {
            var time, result;
            if (req.status === 200) {
                time = isHeadRequest ? req.getResponseHeader("Date") : req.response;
                result = decoder(time);
                if (!isNaN(result)) {
                    onSuccessCB(result);
                    complete = true;
                }
            }
        };
        req.open(verb, url);
        req.timeout = HTTP_TIMEOUT_MS || 0;
        req.onload = onload;
        req.onloadend = oncomplete;
        req.send();
    }, httpHeadHandler = function(url, onSuccessCB, onFailureCB) {
        httpHandler.call(this, rfc1123Decoder, url, onSuccessCB, onFailureCB, true);
    }, handlers = {
        "urn:mpeg:dash:utc:http-head:2014": httpHeadHandler,
        "urn:mpeg:dash:utc:http-xsdate:2014": httpHandler.bind(null, xsdatetimeDecoder),
        "urn:mpeg:dash:utc:http-iso:2014": httpHandler.bind(null, iso8601Decoder),
        "urn:mpeg:dash:utc:direct:2014": directHandler,
        "urn:mpeg:dash:utc:http-head:2012": httpHeadHandler,
        "urn:mpeg:dash:utc:http-xsdate:2012": httpHandler.bind(null, xsdatetimeDecoder),
        "urn:mpeg:dash:utc:http-iso:2012": httpHandler.bind(null, iso8601Decoder),
        "urn:mpeg:dash:utc:direct:2012": directHandler,
        "urn:mpeg:dash:utc:http-ntp:2014": notSupportedHandler,
        "urn:mpeg:dash:utc:ntp:2014": notSupportedHandler,
        "urn:mpeg:dash:utc:sntp:2014": notSupportedHandler
    }, attemptSync = function(sources, sourceIndex) {
        var self = this, index = sourceIndex || 0, source = sources[index], onComplete = function(time, offset) {
            var failed = !time || !offset;
            setIsSynchronizing(false);
            self.notify(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, {
                time: time,
                offset: offset
            }, failed ? new MediaPlayer.vo.Error(MediaPlayer.dependencies.TimeSyncController.TIME_SYNC_FAILED_ERROR_CODE) : null);
        };
        setIsSynchronizing(true);
        if (source) {
            if (handlers.hasOwnProperty(source.schemeIdUri)) {
                handlers[source.schemeIdUri](source.value, function(serverTime) {
                    var deviceTime = new Date().getTime(), offset = serverTime - deviceTime;
                    setOffsetMs(offset);
                    self.debug.log("Local time:      " + new Date(deviceTime));
                    self.debug.log("Server time:     " + new Date(serverTime));
                    self.debug.log("Difference (ms): " + offset);
                    onComplete.call(self, serverTime, offset);
                }, function() {
                    attemptSync.call(self, sources, index + 1);
                });
            } else {
                attemptSync.call(self, sources, index + 1);
            }
        } else {
            setOffsetMs(0);
            onComplete.call(self);
        }
    };
    return {
        debug: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        getOffsetToDeviceTimeMs: function() {
            return getOffsetMs();
        },
        initialize: function(timingSources) {
            if (!getIsSynchronizing()) {
                attemptSync.call(this, timingSources);
                setIsInitialised(true);
            }
        },
        reset: function() {
            setIsInitialised(false);
            setIsSynchronizing(false);
        }
    };
};

MediaPlayer.dependencies.TimeSyncController.prototype = {
    constructor: MediaPlayer.dependencies.TimeSyncController
};

MediaPlayer.dependencies.TimeSyncController.eventList = {
    ENAME_TIME_SYNCHRONIZATION_COMPLETED: "timeSynchronizationComplete"
};

MediaPlayer.dependencies.TimeSyncController.TIME_SYNC_FAILED_ERROR_CODE = 1;

MediaPlayer.utils.VTTParser = function() {
    "use strict";
    var convertCuePointTimes = function(time) {
        var timeArray = time.split(":"), len = timeArray.length - 1;
        time = parseInt(timeArray[len - 1], 10) * 60 + parseFloat(timeArray[len], 10);
        if (len === 2) {
            time += parseInt(timeArray[0], 10) * 3600;
        }
        return time;
    };
    return {
        parse: function(data) {
            var regExNewLine = /(?:\r\n|\r|\n)/gm, regExToken = /-->/, regExWhiteSpace = /(^[\s]+|[\s]+$)/g, captionArray = [], len;
            data = data.split(regExNewLine);
            len = data.length;
            for (var i = 0; i < len; i++) {
                var item = data[i];
                if (item.length > 0 && item !== "WEBVTT") {
                    if (item.match(regExToken)) {
                        var cuePoints = item.split(regExToken);
                        var sublines = data[i + 1];
                        captionArray.push({
                            start: convertCuePointTimes(cuePoints[0].replace(regExWhiteSpace, "")),
                            end: convertCuePointTimes(cuePoints[1].replace(regExWhiteSpace, "")),
                            data: sublines
                        });
                    }
                }
            }
            return captionArray;
        }
    };
};

MediaPlayer.dependencies.AbrController = function() {
    "use strict";
    var autoSwitchBitrate = true, topQualities = {}, qualityDict = {}, confidenceDict = {}, getInternalQuality = function(type, id) {
        var quality;
        qualityDict[id] = qualityDict[id] || {};
        if (!qualityDict[id].hasOwnProperty(type)) {
            qualityDict[id][type] = 0;
        }
        quality = qualityDict[id][type];
        return quality;
    }, setInternalQuality = function(type, id, value) {
        qualityDict[id] = qualityDict[id] || {};
        qualityDict[id][type] = value;
    }, getInternalConfidence = function(type, id) {
        var confidence;
        confidenceDict[id] = confidenceDict[id] || {};
        if (!confidenceDict[id].hasOwnProperty(type)) {
            confidenceDict[id][type] = 0;
        }
        confidence = confidenceDict[id][type];
        return confidence;
    }, setInternalConfidence = function(type, id, value) {
        confidenceDict[id] = confidenceDict[id] || {};
        confidenceDict[id][type] = value;
    }, setTopQualityIndex = function(type, id, value) {
        topQualities[id] = topQualities[id] || {};
        topQualities[id][type] = value;
    }, getTopQualityIndex = function(type, id) {
        var idx;
        topQualities[id] = topQualities[id] || {};
        if (!topQualities[id].hasOwnProperty(type)) {
            topQualities[id][type] = 0;
        }
        idx = topQualities[id][type];
        return idx;
    }, onDataUpdateCompleted = function(e) {
        if (e.error) return;
        var self = this, mediaInfo = this.adapter.convertDataToTrack(e.data.currentRepresentation).mediaInfo, type = mediaInfo.type, streamId = mediaInfo.streamInfo.id, max;
        max = mediaInfo.trackCount - 1;
        if (getTopQualityIndex(type, streamId) === max) return;
        setTopQualityIndex(type, streamId, max);
        self.notify(MediaPlayer.dependencies.AbrController.eventList.ENAME_TOP_QUALITY_INDEX_CHANGED, {
            mediaType: type,
            streamInfo: mediaInfo.streamInfo,
            maxIndex: max
        });
    };
    return {
        debug: undefined,
        adapter: undefined,
        abrRulesCollection: undefined,
        rulesController: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
        },
        getAutoSwitchBitrate: function() {
            return autoSwitchBitrate;
        },
        setAutoSwitchBitrate: function(value) {
            autoSwitchBitrate = value;
        },
        getPlaybackQuality: function(streamProcessor) {
            var self = this, type = streamProcessor.getType(), streamId = streamProcessor.getStreamInfo().id, quality, oldQuality, rules, confidence, callback = function(res) {
                var topQualityIdx = getTopQualityIndex(type, streamId);
                quality = res.value;
                confidence = res.confidence;
                if (quality < 0) {
                    quality = 0;
                }
                if (quality > topQualityIdx) {
                    quality = topQualityIdx;
                }
                oldQuality = getInternalQuality(type, streamId);
                if (quality === oldQuality) return;
                setInternalQuality(type, streamId, quality);
                setInternalConfidence(type, streamId, confidence);
                self.notify(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, {
                    mediaType: type,
                    streamInfo: streamProcessor.getStreamInfo(),
                    oldQuality: oldQuality,
                    newQuality: quality
                });
            };
            quality = getInternalQuality(type, streamId);
            confidence = getInternalConfidence(type, streamId);
            if (!autoSwitchBitrate) return;
            rules = self.abrRulesCollection.getRules(MediaPlayer.rules.ABRRulesCollection.prototype.QUALITY_SWITCH_RULES);
            self.rulesController.applyRules(rules, streamProcessor, callback.bind(self), quality, function(currentValue, newValue) {
                currentValue = currentValue === MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE ? 0 : currentValue;
                return Math.max(currentValue, newValue);
            });
        },
        setPlaybackQuality: function(type, streamInfo, newPlaybackQuality) {
            var id = streamInfo.id, quality = getInternalQuality(type, id), isInt = newPlaybackQuality !== null && !isNaN(newPlaybackQuality) && newPlaybackQuality % 1 === 0;
            if (!isInt) throw "argument is not an integer";
            if (newPlaybackQuality !== quality && newPlaybackQuality >= 0 && topQualities[id].hasOwnProperty(type) && newPlaybackQuality <= topQualities[id][type]) {
                setInternalQuality(type, streamInfo.id, newPlaybackQuality);
                this.notify(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, {
                    mediaType: type,
                    streamInfo: streamInfo,
                    oldQuality: quality,
                    newQuality: newPlaybackQuality
                });
            }
        },
        getQualityFor: function(type, streamInfo) {
            return getInternalQuality(type, streamInfo.id);
        },
        getConfidenceFor: function(type, streamInfo) {
            return getInternalConfidence(type, streamInfo.id);
        },
        isPlayingAtTopQuality: function(streamInfo) {
            var self = this, isAtTop, streamId = streamInfo.id, audioQuality = self.getQualityFor("audio", streamInfo), videoQuality = self.getQualityFor("video", streamInfo);
            isAtTop = audioQuality === getTopQualityIndex("audio", streamId) && videoQuality === getTopQualityIndex("video", streamId);
            return isAtTop;
        },
        reset: function() {
            autoSwitchBitrate = true;
            topQualities = {};
            qualityDict = {};
            confidenceDict = {};
        }
    };
};

MediaPlayer.dependencies.AbrController.prototype = {
    constructor: MediaPlayer.dependencies.AbrController
};

MediaPlayer.dependencies.AbrController.eventList = {
    ENAME_QUALITY_CHANGED: "qualityChanged",
    ENAME_TOP_QUALITY_INDEX_CHANGED: "topQualityIndexChanged"
};

MediaPlayer.dependencies.BufferController = function() {
    "use strict";
    var STALL_THRESHOLD = .5, initializationData = [], requiredQuality = 0, currentQuality = -1, isBufferingCompleted = false, bufferLevel = 0, bufferTarget = 0, criticalBufferLevel = Number.POSITIVE_INFINITY, mediaSource, maxAppendedIndex = -1, lastIndex = -1, type, buffer = null, minBufferTime, hasSufficientBuffer = null, appendedBytesInfo, isBufferLevelOutrun = false, isAppendingInProgress = false, pendingMedia = [], inbandEventFound = false, waitingForInit = function() {
        var loadingReqs = this.streamProcessor.getFragmentModel().getLoadingRequests();
        if (currentQuality > requiredQuality && (hasReqsForQuality(pendingMedia, currentQuality) || hasReqsForQuality(loadingReqs, currentQuality))) {
            return false;
        }
        return currentQuality !== requiredQuality;
    }, hasReqsForQuality = function(arr, quality) {
        var i = 0, ln = arr.length;
        for (i; i < ln; i += 1) {
            if (arr[i].quality === quality) return true;
        }
        return false;
    }, sortArrayByProperty = function(array, sortProp) {
        var compare = function(obj1, obj2) {
            if (obj1[sortProp] < obj2[sortProp]) return -1;
            if (obj1[sortProp] > obj2[sortProp]) return 1;
            return 0;
        };
        array.sort(compare);
    }, onInitializationLoaded = function(e) {
        var self = this;
        if (e.data.fragmentModel !== self.streamProcessor.getFragmentModel()) return;
        self.debug.log("Initialization finished loading: " + type);
        initializationData[e.data.quality] = e.data.bytes;
        if (e.data.quality !== requiredQuality || !waitingForInit.call(self)) return;
        switchInitData.call(self);
    }, onMediaLoaded = function(e) {
        if (e.data.fragmentModel !== this.streamProcessor.getFragmentModel()) return;
        var events, bytes = e.data.bytes, quality = e.data.quality, index = e.data.index, request = this.streamProcessor.getFragmentModel().getExecutedRequestForQualityAndIndex(quality, index), currentTrack = this.streamProcessor.getTrackForQuality(quality), eventStreamMedia = this.adapter.getEventsFor(currentTrack.mediaInfo, this.streamProcessor), eventStreamTrack = this.adapter.getEventsFor(currentTrack, this.streamProcessor);
        if (eventStreamMedia.length > 0 || eventStreamTrack.length > 0) {
            events = handleInbandEvents.call(this, bytes, request, eventStreamMedia, eventStreamTrack);
            this.streamProcessor.getEventController().addInbandEvents(events);
        }
        bytes = deleteInbandEvents.call(this, bytes);
        pendingMedia.push({
            bytes: bytes,
            quality: quality,
            index: index
        });
        sortArrayByProperty(pendingMedia, "index");
        appendNext.call(this);
    }, appendToBuffer = function(data, quality, index) {
        isAppendingInProgress = true;
        appendedBytesInfo = {
            quality: quality,
            index: index
        };
        var self = this, isInit = isNaN(index);
        if (quality !== requiredQuality && isInit || quality !== currentQuality && !isInit) {
            onMediaRejected.call(self, quality, index);
            return;
        }
        self.sourceBufferExt.append(buffer, data);
    }, onAppended = function(e) {
        if (buffer !== e.data.buffer) return;
        if (this.isBufferingCompleted() && this.streamProcessor.getStreamInfo().isLast) {
            this.mediaSourceExt.signalEndOfStream(mediaSource);
        }
        var self = this, ranges;
        if (e.error) {
            if (e.error.code === MediaPlayer.dependencies.SourceBufferExtensions.QUOTA_EXCEEDED_ERROR_CODE) {
                pendingMedia.unshift({
                    bytes: e.data.bytes,
                    quality: appendedBytesInfo.quality,
                    index: appendedBytesInfo.index
                });
                criticalBufferLevel = getTotalBufferedTime.call(self) * .8;
                self.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED, {
                    criticalBufferLevel: criticalBufferLevel
                });
                clearBuffer.call(self);
            }
            isAppendingInProgress = false;
            return;
        }
        updateBufferLevel.call(self);
        if (!hasEnoughSpaceToAppend.call(self)) {
            self.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED, {
                criticalBufferLevel: criticalBufferLevel
            });
            clearBuffer.call(self);
        }
        ranges = self.sourceBufferExt.getAllRanges(buffer);
        if (ranges) {
            if (ranges.length > 0) {
                var i, len;
                for (i = 0, len = ranges.length; i < len; i += 1) {
                    self.debug.log("Buffered " + type + " Range: " + ranges.start(i) + " - " + ranges.end(i));
                }
            }
        }
        onAppendToBufferCompleted.call(self, appendedBytesInfo.quality, appendedBytesInfo.index);
        self.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, {
            quality: appendedBytesInfo.quality,
            index: appendedBytesInfo.index,
            bufferedRanges: ranges
        });
    }, updateBufferLevel = function() {
        var self = this, currentTime = self.playbackController.getTime();
        bufferLevel = self.sourceBufferExt.getBufferLength(buffer, currentTime);
        self.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED, {
            bufferLevel: bufferLevel
        });
        checkGapBetweenBuffers.call(self);
        checkIfSufficientBuffer.call(self);
        if (bufferLevel < STALL_THRESHOLD) {
            notifyIfSufficientBufferStateChanged.call(self, false);
        }
        return true;
    }, handleInbandEvents = function(data, request, mediaInbandEvents, trackInbandEvents) {
        var events = [], i = 0, identifier, size, expTwo = Math.pow(256, 2), expThree = Math.pow(256, 3), fragmentStarttime = Math.max(isNaN(request.startTime) ? 0 : request.startTime, 0), eventStreams = [], event, inbandEvents;
        inbandEventFound = false;
        inbandEvents = mediaInbandEvents.concat(trackInbandEvents);
        for (var loop = 0; loop < inbandEvents.length; loop++) {
            eventStreams[inbandEvents[loop].schemeIdUri] = inbandEvents[loop];
        }
        while (i < data.length) {
            identifier = String.fromCharCode(data[i + 4], data[i + 5], data[i + 6], data[i + 7]);
            size = data[i] * expThree + data[i + 1] * expTwo + data[i + 2] * 256 + data[i + 3] * 1;
            if (identifier == "moov" || identifier == "moof") {
                break;
            } else if (identifier == "emsg") {
                inbandEventFound = true;
                var eventBox = [ "", "", 0, 0, 0, 0, "" ], arrIndex = 0, j = i + 12;
                while (j < size + i) {
                    if (arrIndex === 0 || arrIndex == 1 || arrIndex == 6) {
                        if (data[j] !== 0) {
                            eventBox[arrIndex] += String.fromCharCode(data[j]);
                        } else {
                            arrIndex += 1;
                        }
                        j += 1;
                    } else {
                        eventBox[arrIndex] = data[j] * expThree + data[j + 1] * expTwo + data[j + 2] * 256 + data[j + 3] * 1;
                        j += 4;
                        arrIndex += 1;
                    }
                }
                event = this.adapter.getEvent(eventBox, eventStreams, fragmentStarttime);
                if (event) {
                    events.push(event);
                }
            }
            i += size;
        }
        return events;
    }, deleteInbandEvents = function(data) {
        if (!inbandEventFound) {
            return data;
        }
        var length = data.length, i = 0, j = 0, identifier, size, expTwo = Math.pow(256, 2), expThree = Math.pow(256, 3), modData = new Uint8Array(data.length);
        while (i < length) {
            identifier = String.fromCharCode(data[i + 4], data[i + 5], data[i + 6], data[i + 7]);
            size = data[i] * expThree + data[i + 1] * expTwo + data[i + 2] * 256 + data[i + 3] * 1;
            if (identifier != "emsg") {
                for (var l = i; l < i + size; l++) {
                    modData[j] = data[l];
                    j += 1;
                }
            }
            i += size;
        }
        return modData.subarray(0, j);
    }, checkGapBetweenBuffers = function() {
        var leastLevel = getLeastBufferLevel.call(this), acceptableGap = minBufferTime * 2, actualGap = bufferLevel - leastLevel;
        if (actualGap >= acceptableGap && !isBufferLevelOutrun) {
            isBufferLevelOutrun = true;
            this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN);
        } else if (actualGap < acceptableGap / 2 && isBufferLevelOutrun) {
            this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED);
            isBufferLevelOutrun = false;
            appendNext.call(this);
        }
    }, getLeastBufferLevel = function() {
        var videoMetrics = this.metricsModel.getReadOnlyMetricsFor("video"), videoBufferLevel = this.metricsExt.getCurrentBufferLevel(videoMetrics), audioMetrics = this.metricsModel.getReadOnlyMetricsFor("audio"), audioBufferLevel = this.metricsExt.getCurrentBufferLevel(audioMetrics), leastLevel = null;
        if (videoBufferLevel === null || audioBufferLevel === null) {
            leastLevel = audioBufferLevel !== null ? audioBufferLevel.level : videoBufferLevel !== null ? videoBufferLevel.level : null;
        } else {
            leastLevel = Math.min(audioBufferLevel.level, videoBufferLevel.level);
        }
        return leastLevel;
    }, hasEnoughSpaceToAppend = function() {
        var self = this, totalBufferedTime = getTotalBufferedTime.call(self);
        return totalBufferedTime < criticalBufferLevel;
    }, clearBuffer = function() {
        var self = this, currentTime, removeStart, removeEnd, range, req;
        if (!buffer) return;
        currentTime = self.playbackController.getTime();
        req = self.fragmentController.getExecutedRequestForTime(self.streamProcessor.getFragmentModel(), currentTime);
        removeEnd = req && !isNaN(req.startTime) ? req.startTime : Math.floor(currentTime);
        range = self.sourceBufferExt.getBufferRange(buffer, currentTime);
        if (range === null && buffer.buffered.length > 0) {
            removeEnd = buffer.buffered.end(buffer.buffered.length - 1);
        }
        removeStart = buffer.buffered.start(0);
        self.sourceBufferExt.remove(buffer, removeStart, removeEnd, mediaSource);
    }, onRemoved = function(e) {
        if (buffer !== e.data.buffer) return;
        updateBufferLevel.call(this);
        this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED, {
            from: e.data.from,
            to: e.data.to,
            hasEnoughSpaceToAppend: hasEnoughSpaceToAppend.call(this)
        });
        if (hasEnoughSpaceToAppend.call(this)) return;
        setTimeout(clearBuffer.bind(this), minBufferTime * 1e3);
    }, getTotalBufferedTime = function() {
        var self = this, ranges = self.sourceBufferExt.getAllRanges(buffer), totalBufferedTime = 0, ln, i;
        if (!ranges) return totalBufferedTime;
        for (i = 0, ln = ranges.length; i < ln; i += 1) {
            totalBufferedTime += ranges.end(i) - ranges.start(i);
        }
        return totalBufferedTime;
    }, checkIfBufferingCompleted = function() {
        var isLastIdxAppended = maxAppendedIndex === lastIndex - 1;
        if (!isLastIdxAppended || isBufferingCompleted) return;
        isBufferingCompleted = true;
        this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED);
    }, checkIfSufficientBuffer = function() {
        var timeToEnd = this.playbackController.getTimeToStreamEnd();
        if (bufferLevel < STALL_THRESHOLD && minBufferTime < timeToEnd || minBufferTime >= timeToEnd && !isBufferingCompleted) {
            notifyIfSufficientBufferStateChanged.call(this, false);
        } else {
            notifyIfSufficientBufferStateChanged.call(this, true);
        }
    }, getBufferState = function() {
        return hasSufficientBuffer ? MediaPlayer.dependencies.BufferController.BUFFER_LOADED : MediaPlayer.dependencies.BufferController.BUFFER_EMPTY;
    }, notifyIfSufficientBufferStateChanged = function(state) {
        if (hasSufficientBuffer === state) return;
        hasSufficientBuffer = state;
        var bufferState = getBufferState();
        this.metricsModel.addBufferState(type, bufferState, bufferTarget);
        this.eventBus.dispatchEvent({
            type: bufferState,
            data: {
                bufferType: type
            }
        });
        this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, {
            hasSufficientBuffer: state
        });
        this.debug.log(hasSufficientBuffer ? "Got enough " + type + " buffer to start." : "Waiting for more " + type + " buffer before starting playback.");
    }, updateBufferTimestampOffset = function(MSETimeOffset) {
        if (buffer.timestampOffset !== MSETimeOffset) {
            buffer.timestampOffset = MSETimeOffset;
        }
    }, updateBufferState = function() {
        var self = this, fragmentsToLoad = this.streamProcessor.getScheduleController().getFragmentToLoadCount(), fragmentDuration = this.streamProcessor.getCurrentTrack().fragmentDuration;
        updateBufferLevel.call(self);
        bufferTarget = fragmentsToLoad > 0 ? fragmentsToLoad * fragmentDuration + bufferLevel : bufferTarget;
        this.metricsModel.addBufferState(type, getBufferState(), bufferTarget);
        appendNext.call(self);
    }, appendNext = function() {
        if (waitingForInit.call(this)) {
            switchInitData.call(this);
        } else {
            appendNextMedia.call(this);
        }
    }, onAppendToBufferCompleted = function(quality, index) {
        isAppendingInProgress = false;
        if (!isNaN(index)) {
            onMediaAppended.call(this, index);
        } else {
            onInitAppended.call(this, quality);
        }
        appendNext.call(this);
    }, onMediaRejected = function(quality, index) {
        isAppendingInProgress = false;
        this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED, {
            quality: quality,
            index: index
        });
        appendNext.call(this);
    }, onInitAppended = function(quality) {
        currentQuality = quality;
    }, onMediaAppended = function(index) {
        maxAppendedIndex = Math.max(index, maxAppendedIndex);
        checkIfBufferingCompleted.call(this);
    }, appendNextMedia = function() {
        var data;
        if (pendingMedia.length === 0 || isBufferLevelOutrun || isAppendingInProgress || waitingForInit.call(this) || !hasEnoughSpaceToAppend.call(this)) return;
        data = pendingMedia.shift();
        appendToBuffer.call(this, data.bytes, data.quality, data.index);
    }, onDataUpdateCompleted = function(e) {
        if (e.error) return;
        var self = this, bufferLength;
        updateBufferTimestampOffset.call(self, e.data.currentRepresentation.MSETimeOffset);
        bufferLength = self.streamProcessor.getStreamInfo().manifestInfo.minBufferTime;
        if (minBufferTime !== bufferLength) {
            self.setMinBufferTime(bufferLength);
            self.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_MIN_BUFFER_TIME_UPDATED, {
                minBufferTime: bufferLength
            });
        }
    }, onStreamCompleted = function(e) {
        var self = this;
        if (e.data.fragmentModel !== self.streamProcessor.getFragmentModel()) return;
        lastIndex = e.data.request.index;
        checkIfBufferingCompleted.call(self);
    }, onQualityChanged = function(e) {
        if (type !== e.data.mediaType || this.streamProcessor.getStreamInfo().id !== e.data.streamInfo.id) return;
        var self = this, newQuality = e.data.newQuality;
        if (requiredQuality === newQuality) return;
        updateBufferTimestampOffset.call(self, self.streamProcessor.getTrackForQuality(newQuality).MSETimeOffset);
        requiredQuality = newQuality;
        if (!waitingForInit.call(self)) return;
        switchInitData.call(self);
    }, switchInitData = function() {
        var self = this;
        if (initializationData[requiredQuality]) {
            if (isAppendingInProgress) return;
            appendToBuffer.call(self, initializationData[requiredQuality], requiredQuality);
        } else {
            self.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED, {
                requiredQuality: requiredQuality
            });
        }
    }, onWallclockTimeUpdated = function() {
        appendNext.call(this);
    }, onPlaybackRateChanged = function() {
        checkIfSufficientBuffer.call(this);
    };
    return {
        manifestModel: undefined,
        sourceBufferExt: undefined,
        eventBus: undefined,
        bufferMax: undefined,
        mediaSourceExt: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        adapter: undefined,
        scheduleRulesCollection: undefined,
        debug: undefined,
        system: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
            this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED] = onInitializationLoaded;
            this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED] = onMediaLoaded;
            this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED] = onStreamCompleted;
            this[MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED] = onQualityChanged;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS] = updateBufferState;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = updateBufferState;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED] = updateBufferState;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED] = onPlaybackRateChanged;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED] = onWallclockTimeUpdated;
            onAppended = onAppended.bind(this);
            onRemoved = onRemoved.bind(this);
            this.sourceBufferExt.subscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED, this, onAppended);
            this.sourceBufferExt.subscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, this, onRemoved);
        },
        initialize: function(typeValue, buffer, source, streamProcessor) {
            var self = this;
            type = typeValue;
            self.setMediaSource(source);
            self.setBuffer(buffer);
            self.streamProcessor = streamProcessor;
            self.fragmentController = streamProcessor.fragmentController;
            self.scheduleController = streamProcessor.scheduleController;
            self.playbackController = streamProcessor.playbackController;
        },
        getStreamProcessor: function() {
            return this.streamProcessor;
        },
        setStreamProcessor: function(value) {
            this.streamProcessor = value;
        },
        getBuffer: function() {
            return buffer;
        },
        setBuffer: function(value) {
            buffer = value;
        },
        getBufferLevel: function() {
            return bufferLevel;
        },
        getMinBufferTime: function() {
            return minBufferTime;
        },
        setMinBufferTime: function(value) {
            minBufferTime = value;
        },
        getCriticalBufferLevel: function() {
            return criticalBufferLevel;
        },
        setMediaSource: function(value) {
            mediaSource = value;
        },
        isBufferingCompleted: function() {
            return isBufferingCompleted;
        },
        reset: function(errored) {
            var self = this;
            initializationData = [];
            criticalBufferLevel = Number.POSITIVE_INFINITY;
            hasSufficientBuffer = null;
            minBufferTime = null;
            currentQuality = -1;
            requiredQuality = 0;
            self.sourceBufferExt.unsubscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED, self, onAppended);
            self.sourceBufferExt.unsubscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, self, onRemoved);
            appendedBytesInfo = null;
            isBufferLevelOutrun = false;
            isAppendingInProgress = false;
            pendingMedia = [];
            if (!errored) {
                self.sourceBufferExt.abort(mediaSource, buffer);
                self.sourceBufferExt.removeSourceBuffer(mediaSource, buffer);
            }
            buffer = null;
        }
    };
};

MediaPlayer.dependencies.BufferController.BUFFER_SIZE_REQUIRED = "required";

MediaPlayer.dependencies.BufferController.BUFFER_SIZE_MIN = "min";

MediaPlayer.dependencies.BufferController.BUFFER_SIZE_INFINITY = "infinity";

MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME = 12;

MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD = 4;

MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY = 30;

MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY_LONG_FORM = 300;

MediaPlayer.dependencies.BufferController.LONG_FORM_CONTENT_DURATION_THRESHOLD = 600;

MediaPlayer.dependencies.BufferController.RICH_BUFFER_THRESHOLD = 20;

MediaPlayer.dependencies.BufferController.BUFFER_LOADED = "bufferLoaded";

MediaPlayer.dependencies.BufferController.BUFFER_EMPTY = "bufferStalled";

MediaPlayer.dependencies.BufferController.prototype = {
    constructor: MediaPlayer.dependencies.BufferController
};

MediaPlayer.dependencies.BufferController.eventList = {
    ENAME_BUFFER_LEVEL_STATE_CHANGED: "bufferLevelStateChanged",
    ENAME_BUFFER_LEVEL_UPDATED: "bufferLevelUpdated",
    ENAME_QUOTA_EXCEEDED: "quotaExceeded",
    ENAME_BYTES_APPENDED: "bytesAppended",
    ENAME_BYTES_REJECTED: "bytesRejected",
    ENAME_BUFFERING_COMPLETED: "bufferingCompleted",
    ENAME_BUFFER_CLEARED: "bufferCleared",
    ENAME_INIT_REQUESTED: "initRequested",
    ENAME_BUFFER_LEVEL_OUTRUN: "bufferLevelOutrun",
    ENAME_BUFFER_LEVEL_BALANCED: "bufferLevelBalanced",
    ENAME_MIN_BUFFER_TIME_UPDATED: "minBufferTimeUpdated"
};

MediaPlayer.dependencies.EventController = function() {
    "use strict";
    var inlineEvents = [], inbandEvents = [], activeEvents = [], eventInterval = null, refreshDelay = 100, presentationTimeThreshold = refreshDelay / 1e3, MPD_RELOAD_SCHEME = "urn:mpeg:dash:event:2012", MPD_RELOAD_VALUE = 1, reset = function() {
        if (eventInterval !== null) {
            clearInterval(eventInterval);
            eventInterval = null;
        }
        inlineEvents = null;
        inbandEvents = null;
        activeEvents = null;
    }, clear = function() {
        if (eventInterval !== null) {
            clearInterval(eventInterval);
            eventInterval = null;
        }
    }, start = function() {
        var self = this;
        self.debug.log("Start Event Controller");
        if (!isNaN(refreshDelay)) {
            eventInterval = setInterval(onEventTimer.bind(this), refreshDelay);
        }
    }, addInlineEvents = function(values) {
        var self = this;
        inlineEvents = [];
        if (values && values.length > 0) {
            inlineEvents = values;
        }
        self.debug.log("Added " + values.length + " inline events");
    }, addInbandEvents = function(values) {
        var self = this;
        for (var i = 0; i < values.length; i++) {
            var event = values[i];
            inbandEvents[event.id] = event;
            self.debug.log("Add inband event with id " + event.id);
        }
    }, onEventTimer = function() {
        triggerEvents.call(this, inbandEvents);
        triggerEvents.call(this, inlineEvents);
        removeEvents.call(this);
    }, triggerEvents = function(events) {
        var self = this, currentVideoTime = this.videoModel.getCurrentTime(), presentationTime;
        if (events) {
            for (var j = 0; j < events.length; j++) {
                var curr = events[j];
                if (curr !== undefined) {
                    presentationTime = curr.presentationTime / curr.eventStream.timescale;
                    if (presentationTime === 0 || presentationTime <= currentVideoTime && presentationTime + presentationTimeThreshold > currentVideoTime) {
                        self.debug.log("Start Event at " + currentVideoTime);
                        if (curr.duration > 0) activeEvents.push(curr);
                        if (curr.eventStream.schemeIdUri == MPD_RELOAD_SCHEME && curr.eventStream.value == MPD_RELOAD_VALUE) refreshManifest.call(this);
                        events.splice(j, 1);
                    }
                }
            }
        }
    }, removeEvents = function() {
        var self = this;
        if (activeEvents) {
            var currentVideoTime = this.videoModel.getCurrentTime();
            for (var i = 0; i < activeEvents.length; i++) {
                var curr = activeEvents[i];
                if (curr !== null && (curr.duration + curr.presentationTime) / curr.eventStream.timescale < currentVideoTime) {
                    self.debug.log("Remove Event at time " + currentVideoTime);
                    curr = null;
                    activeEvents.splice(i, 1);
                }
            }
        }
    }, refreshManifest = function() {
        var self = this, manifest = self.manifestModel.getValue(), url = manifest.url;
        if (manifest.hasOwnProperty("Location")) {
            url = manifest.Location;
        }
        self.debug.log("Refresh manifest @ " + url);
        self.manifestLoader.load(url);
    };
    return {
        manifestModel: undefined,
        manifestLoader: undefined,
        debug: undefined,
        system: undefined,
        errHandler: undefined,
        videoModel: undefined,
        addInlineEvents: addInlineEvents,
        addInbandEvents: addInbandEvents,
        reset: reset,
        clear: clear,
        start: start,
        getVideoModel: function() {
            return this.videoModel;
        },
        setVideoModel: function(value) {
            this.videoModel = value;
        },
        initialize: function(videoModel) {
            this.setVideoModel(videoModel);
        }
    };
};

MediaPlayer.dependencies.EventController.prototype = {
    constructor: MediaPlayer.dependencies.EventController
};

MediaPlayer.dependencies.FragmentController = function() {
    "use strict";
    var fragmentModels = [], inProgress = false, findModel = function(context) {
        var ln = fragmentModels.length;
        for (var i = 0; i < ln; i++) {
            if (fragmentModels[i].getContext() == context) {
                return fragmentModels[i];
            }
        }
        return null;
    }, getRequestsToLoad = function(current, callback) {
        var self = this, streamProcessor = fragmentModels[0].getContext().streamProcessor, streamId = streamProcessor.getStreamInfo().id, rules = self.scheduleRulesCollection.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_EXECUTE_RULES);
        if (rules.indexOf(this.scheduleRulesCollection.sameTimeRequestRule) !== -1) {
            this.scheduleRulesCollection.sameTimeRequestRule.setFragmentModels(fragmentModels, streamId);
        }
        self.rulesController.applyRules(rules, streamProcessor, callback, current, function(currentValue, newValue) {
            return newValue;
        });
    }, onFragmentLoadingStart = function(e) {
        var self = this, request = e.data.request;
        if (self.isInitializationRequest(request)) {
            self.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADING_START, {
                request: request,
                fragmentModel: e.sender
            });
        } else {
            self.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START, {
                request: request,
                fragmentModel: e.sender
            });
        }
    }, onFragmentLoadingCompleted = function(e) {
        var self = this, request = e.data.request, bytes = self.process(e.data.response);
        if (bytes === null) {
            self.debug.log("No " + request.mediaType + " bytes to push.");
            return;
        }
        if (self.isInitializationRequest(request)) {
            self.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED, {
                bytes: bytes,
                quality: request.quality,
                fragmentModel: e.sender
            });
        } else {
            self.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED, {
                bytes: bytes,
                quality: request.quality,
                index: request.index,
                fragmentModel: e.sender
            });
        }
        executeRequests.call(this);
    }, onStreamCompleted = function(e) {
        this.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, {
            request: e.data.request,
            fragmentModel: e.sender
        });
    }, onBufferLevelBalanced = function() {
        executeRequests.call(this);
    }, onGetRequests = function(result) {
        var reqsToExecute = result.value, mediaType, r, m, i, j;
        for (i = 0; i < reqsToExecute.length; i += 1) {
            r = reqsToExecute[i];
            if (!r) continue;
            for (j = 0; j < fragmentModels.length; j += 1) {
                m = fragmentModels[j];
                mediaType = m.getContext().streamProcessor.getType();
                if (r.mediaType !== mediaType) continue;
                if (!(r instanceof MediaPlayer.vo.FragmentRequest)) {
                    r = m.getPendingRequestForTime(r.startTime);
                }
                m.executeRequest(r);
            }
        }
        inProgress = false;
    }, executeRequests = function(request) {
        if (inProgress) return;
        inProgress = true;
        getRequestsToLoad.call(this, request, onGetRequests.bind(this));
    };
    return {
        system: undefined,
        debug: undefined,
        scheduleRulesCollection: undefined,
        rulesController: undefined,
        fragmentLoader: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED] = onFragmentLoadingStart;
            this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED] = onFragmentLoadingCompleted;
            this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED] = onStreamCompleted;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED] = onBufferLevelBalanced;
        },
        process: function(bytes) {
            var result = null;
            if (bytes !== null && bytes !== undefined && bytes.byteLength > 0) {
                result = new Uint8Array(bytes);
            }
            return result;
        },
        getModel: function(context) {
            if (!context) return null;
            var model = findModel(context);
            if (!model) {
                model = this.system.getObject("fragmentModel");
                model.setContext(context);
                fragmentModels.push(model);
            }
            return model;
        },
        detachModel: function(model) {
            var idx = fragmentModels.indexOf(model);
            if (idx > -1) {
                fragmentModels.splice(idx, 1);
            }
        },
        isFragmentLoadedOrPending: function(context, request) {
            var fragmentModel = findModel(context), isLoaded;
            if (!fragmentModel) {
                return false;
            }
            isLoaded = fragmentModel.isFragmentLoadedOrPending(request);
            return isLoaded;
        },
        getPendingRequests: function(context) {
            var fragmentModel = findModel(context);
            if (!fragmentModel) {
                return null;
            }
            return fragmentModel.getPendingRequests();
        },
        getLoadingRequests: function(context) {
            var fragmentModel = findModel(context);
            if (!fragmentModel) {
                return null;
            }
            return fragmentModel.getLoadingRequests();
        },
        isInitializationRequest: function(request) {
            return request && request.type && request.type.toLowerCase().indexOf("initialization") !== -1;
        },
        getLoadingTime: function(context) {
            var fragmentModel = findModel(context);
            if (!fragmentModel) {
                return null;
            }
            return fragmentModel.getLoadingTime();
        },
        getExecutedRequestForTime: function(model, time) {
            if (model) {
                return model.getExecutedRequestForTime(time);
            }
            return null;
        },
        removeExecutedRequest: function(model, request) {
            if (model) {
                model.removeExecutedRequest(request);
            }
        },
        removeExecutedRequestsBeforeTime: function(model, time) {
            if (model) {
                model.removeExecutedRequestsBeforeTime(time);
            }
        },
        cancelPendingRequestsForModel: function(model) {
            if (model) {
                model.cancelPendingRequests();
            }
        },
        abortRequestsForModel: function(model) {
            if (model) {
                model.abortRequests();
            }
            executeRequests.call(this);
        },
        prepareFragmentForLoading: function(context, request) {
            var fragmentModel = findModel(context);
            if (!fragmentModel || !request) return;
            if (fragmentModel.addRequest(request)) {
                executeRequests.call(this, request);
            }
        },
        executePendingRequests: function() {
            executeRequests.call(this);
        },
        resetModel: function(model) {
            this.abortRequestsForModel(model);
            this.cancelPendingRequestsForModel(model);
        }
    };
};

MediaPlayer.dependencies.FragmentController.prototype = {
    constructor: MediaPlayer.dependencies.FragmentController
};

MediaPlayer.dependencies.FragmentController.eventList = {
    ENAME_STREAM_COMPLETED: "streamCompleted",
    ENAME_INIT_FRAGMENT_LOADING_START: "initFragmentLoadingStart",
    ENAME_MEDIA_FRAGMENT_LOADING_START: "mediaFragmentLoadingStart",
    ENAME_INIT_FRAGMENT_LOADED: "initFragmentLoaded",
    ENAME_MEDIA_FRAGMENT_LOADED: "mediaFragmentLoaded"
};

MediaPlayer.dependencies.PlaybackController = function() {
    "use strict";
    var WALLCLOCK_TIME_UPDATE_INTERVAL = 1e3, currentTime = 0, liveStartTime = NaN, wallclockTimeIntervalId = null, commonEarliestTime = null, streamInfo, videoModel, trackInfo, isDynamic, getStreamStartTime = function(streamInfo) {
        var presentationStartTime, startTimeOffset = parseInt(this.uriQueryFragModel.getURIFragmentData.s);
        if (isDynamic) {
            if (!isNaN(startTimeOffset) && startTimeOffset > 1262304e3) {
                presentationStartTime = startTimeOffset - streamInfo.manifestInfo.availableFrom.getTime() / 1e3;
                if (presentationStartTime > liveStartTime || presentationStartTime < liveStartTime - streamInfo.manifestInfo.DVRWindowSize) {
                    presentationStartTime = null;
                }
            }
            presentationStartTime = presentationStartTime || liveStartTime;
        } else {
            if (!isNaN(startTimeOffset) && startTimeOffset < streamInfo.duration && startTimeOffset >= 0) {
                presentationStartTime = startTimeOffset;
            } else {
                presentationStartTime = streamInfo.start;
            }
        }
        return presentationStartTime;
    }, getActualPresentationTime = function(currentTime) {
        var self = this, metrics = self.metricsModel.getMetricsFor(trackInfo.mediaInfo.type), DVRMetrics = self.metricsExt.getCurrentDVRInfo(metrics), DVRWindow = DVRMetrics ? DVRMetrics.range : null, actualTime;
        if (!DVRWindow) return NaN;
        if (currentTime >= DVRWindow.start && currentTime <= DVRWindow.end) {
            return currentTime;
        }
        actualTime = Math.max(DVRWindow.end - streamInfo.manifestInfo.minBufferTime * 2, DVRWindow.start);
        return actualTime;
    }, startUpdatingWallclockTime = function() {
        if (wallclockTimeIntervalId !== null) return;
        var self = this, tick = function() {
            onWallclockTime.call(self);
        };
        wallclockTimeIntervalId = setInterval(tick, WALLCLOCK_TIME_UPDATE_INTERVAL);
    }, stopUpdatingWallclockTime = function() {
        clearInterval(wallclockTimeIntervalId);
        wallclockTimeIntervalId = null;
    }, initialStart = function() {
        var initialSeekTime = getStreamStartTime.call(this, streamInfo);
        this.debug.log("Starting playback at offset: " + initialSeekTime);
        this.seek(initialSeekTime);
    }, updateCurrentTime = function() {
        if (this.isPaused() || !isDynamic) return;
        var currentTime = this.getTime(), actualTime = getActualPresentationTime.call(this, currentTime), timeChanged = !isNaN(actualTime) && actualTime !== currentTime;
        if (timeChanged) {
            this.seek(actualTime);
        }
    }, onDataUpdateCompleted = function(e) {
        if (e.error) return;
        trackInfo = this.adapter.convertDataToTrack(e.data.currentRepresentation);
        streamInfo = trackInfo.mediaInfo.streamInfo;
        isDynamic = e.sender.streamProcessor.isDynamic();
        updateCurrentTime.call(this);
    }, onLiveEdgeSearchCompleted = function(e) {
        if (e.error || videoModel.getElement().readyState === 0) return;
        initialStart.call(this);
    }, removeAllListeners = function() {
        if (!videoModel) return;
        videoModel.unlisten("play", onPlaybackStart);
        videoModel.unlisten("pause", onPlaybackPaused);
        videoModel.unlisten("error", onPlaybackError);
        videoModel.unlisten("seeking", onPlaybackSeeking);
        videoModel.unlisten("seeked", onPlaybackSeeked);
        videoModel.unlisten("timeupdate", onPlaybackTimeUpdated);
        videoModel.unlisten("progress", onPlaybackProgress);
        videoModel.unlisten("ratechange", onPlaybackRateChanged);
        videoModel.unlisten("loadedmetadata", onPlaybackMetaDataLoaded);
        videoModel.unlisten("ended", onPlaybackEnded);
    }, onPlaybackStart = function() {
        updateCurrentTime.call(this);
        startUpdatingWallclockTime.call(this);
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, {
            startTime: this.getTime()
        });
    }, onPlaybackPaused = function() {
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED);
    }, onPlaybackSeeking = function() {
        startUpdatingWallclockTime.call(this);
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, {
            seekTime: this.getTime()
        });
    }, onPlaybackSeeked = function() {
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKED);
    }, onPlaybackTimeUpdated = function() {
        var time = this.getTime();
        if (time === currentTime) return;
        currentTime = time;
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, {
            timeToEnd: this.getTimeToStreamEnd()
        });
    }, onPlaybackProgress = function() {
        var ranges = videoModel.getElement().buffered, lastRange, bufferEndTime, remainingUnbufferedDuration;
        if (ranges.length) {
            lastRange = ranges.length - 1;
            bufferEndTime = ranges.end(lastRange);
            remainingUnbufferedDuration = getStreamStartTime.call(this, streamInfo) + streamInfo.duration - bufferEndTime;
        }
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS, {
            bufferedRanges: videoModel.getElement().buffered,
            remainingUnbufferedDuration: remainingUnbufferedDuration
        });
    }, onPlaybackRateChanged = function() {
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED);
    }, onPlaybackMetaDataLoaded = function() {
        this.debug.log("Got loadmetadata event.");
        if (!isDynamic || this.timelineConverter.isTimeSyncCompleted()) {
            initialStart.call(this);
        }
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_METADATA_LOADED);
        startUpdatingWallclockTime.call(this);
    }, onPlaybackEnded = function() {
        this.debug.log("Got ended event.");
        stopUpdatingWallclockTime.call(this);
    }, onPlaybackError = function(event) {
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR, {
            error: event.srcElement.error
        });
    }, onWallclockTime = function() {
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, {
            isDynamic: isDynamic,
            time: new Date()
        });
    }, onBytesAppended = function(e) {
        var bufferedStart, ranges = e.data.bufferedRanges, currentEarliestTime = commonEarliestTime, playbackStart = getStreamStartTime.call(this, streamInfo), req;
        if (!ranges || !ranges.length) return;
        bufferedStart = ranges.start(0);
        commonEarliestTime = commonEarliestTime === null ? bufferedStart : Math.max(commonEarliestTime, bufferedStart);
        if (currentEarliestTime === commonEarliestTime) return;
        req = this.adapter.getFragmentRequestForTime(e.sender.streamProcessor, trackInfo, playbackStart, {
            keepIdx: false
        });
        if (!req || req.index !== e.data.index) return;
        this.seek(commonEarliestTime);
    }, setupVideoModel = function(model) {
        videoModel = model;
        videoModel.listen("play", onPlaybackStart);
        videoModel.listen("pause", onPlaybackPaused);
        videoModel.listen("error", onPlaybackError);
        videoModel.listen("seeking", onPlaybackSeeking);
        videoModel.listen("seeked", onPlaybackSeeked);
        videoModel.listen("timeupdate", onPlaybackTimeUpdated);
        videoModel.listen("progress", onPlaybackProgress);
        videoModel.listen("ratechange", onPlaybackRateChanged);
        videoModel.listen("loadedmetadata", onPlaybackMetaDataLoaded);
        videoModel.listen("ended", onPlaybackEnded);
    };
    return {
        debug: undefined,
        timelineConverter: undefined,
        uriQueryFragModel: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        adapter: undefined,
        setup: function() {
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
            this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED] = onLiveEdgeSearchCompleted;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED] = onBytesAppended;
            onPlaybackStart = onPlaybackStart.bind(this);
            onPlaybackPaused = onPlaybackPaused.bind(this);
            onPlaybackError = onPlaybackError.bind(this);
            onPlaybackSeeking = onPlaybackSeeking.bind(this);
            onPlaybackSeeked = onPlaybackSeeked.bind(this);
            onPlaybackTimeUpdated = onPlaybackTimeUpdated.bind(this);
            onPlaybackProgress = onPlaybackProgress.bind(this);
            onPlaybackRateChanged = onPlaybackRateChanged.bind(this);
            onPlaybackMetaDataLoaded = onPlaybackMetaDataLoaded.bind(this);
            onPlaybackEnded = onPlaybackEnded.bind(this);
        },
        initialize: function(streamInfoValue, model) {
            streamInfo = streamInfoValue;
            if (videoModel === model) return;
            removeAllListeners.call(this);
            setupVideoModel.call(this, model);
        },
        getTimeToStreamEnd: function() {
            var currentTime = videoModel.getCurrentTime();
            return getStreamStartTime.call(this, streamInfo) + streamInfo.duration - currentTime;
        },
        getStreamId: function() {
            return streamInfo.id;
        },
        getStreamDuration: function() {
            return streamInfo.duration;
        },
        getTime: function() {
            return videoModel.getCurrentTime();
        },
        getPlaybackRate: function() {
            return videoModel.getPlaybackRate();
        },
        setLiveStartTime: function(value) {
            liveStartTime = value;
        },
        getLiveStartTime: function() {
            return liveStartTime;
        },
        start: function() {
            videoModel.play();
        },
        isPaused: function() {
            return videoModel.isPaused();
        },
        pause: function() {
            if (videoModel) {
                videoModel.pause();
            }
        },
        isSeeking: function() {
            return videoModel.getElement().seeking;
        },
        seek: function(time) {
            if (time === this.getTime()) return;
            videoModel.setCurrentTime(time);
        },
        reset: function() {
            stopUpdatingWallclockTime.call(this);
            removeAllListeners.call(this);
            videoModel = null;
            streamInfo = null;
            currentTime = 0;
            liveStartTime = NaN;
            commonEarliestTime = null;
        }
    };
};

MediaPlayer.dependencies.PlaybackController.prototype = {
    constructor: MediaPlayer.dependencies.PlaybackController
};

MediaPlayer.dependencies.PlaybackController.eventList = {
    ENAME_PLAYBACK_STARTED: "playbackStarted",
    ENAME_PLAYBACK_STOPPED: "playbackStopped",
    ENAME_PLAYBACK_PAUSED: "playbackPaused",
    ENAME_PLAYBACK_SEEKING: "playbackSeeking",
    ENAME_PLAYBACK_SEEKED: "playbackSeeked",
    ENAME_PLAYBACK_TIME_UPDATED: "playbackTimeUpdated",
    ENAME_PLAYBACK_PROGRESS: "playbackProgress",
    ENAME_PLAYBACK_RATE_CHANGED: "playbackRateChanged",
    ENAME_PLAYBACK_METADATA_LOADED: "playbackMetaDataLoaded",
    ENAME_PLAYBACK_ERROR: "playbackError",
    ENAME_WALLCLOCK_TIME_UPDATED: "wallclockTimeUpdated"
};

MediaPlayer.dependencies.ProtectionController = function() {
    "use strict";
    var keySystems = null, onKeyMessage = function(e) {
        if (e.error) {
            this.debug.log(e.error);
        } else {
            var keyMessageEvent = e.data;
            this.protectionModel.keySystem.doLicenseRequest(keyMessageEvent.message, keyMessageEvent.defaultURL, keyMessageEvent.sessionToken);
        }
    };
    return {
        system: undefined,
        debug: undefined,
        protectionExt: undefined,
        setup: function() {
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE] = onKeyMessage.bind(this);
        },
        init: function(protectionModel) {
            this.protectionModel = protectionModel;
            keySystems = this.protectionExt.getKeySystems();
            this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, this);
        },
        teardown: function() {
            this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, this);
        },
        selectKeySystem: function(mediaInfo, initData) {
            this.protectionExt.autoSelectKeySystem(mediaInfo, initData);
        },
        createKeySession: function(initData, contentType) {
            this.protectionModel.createKeySession(initData, contentType, "cenc");
        },
        updateKeySession: function(sessionToken, message) {
            this.protectionModel.updateKeySession(sessionToken, message);
        }
    };
};

MediaPlayer.dependencies.ProtectionController.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionController
};

MediaPlayer.dependencies.ScheduleController = function() {
    "use strict";
    var fragmentsToLoad = 0, type, ready, fragmentModel, isDynamic, currentTrackInfo, initialPlayback = true, lastValidationTime = null, lastABRRuleApplyTime = 0, isStopped = false, playListMetrics = null, playListTraceMetrics = null, playListTraceMetricsClosed = true, clearPlayListTraceMetrics = function(endTime, stopreason) {
        var duration = 0, startTime = null;
        if (playListTraceMetricsClosed === false) {
            startTime = playListTraceMetrics.start;
            duration = endTime.getTime() - startTime.getTime();
            playListTraceMetrics.duration = duration;
            playListTraceMetrics.stopreason = stopreason;
            playListTraceMetricsClosed = true;
        }
    }, doStart = function() {
        if (!ready) return;
        isStopped = false;
        if (initialPlayback) {
            initialPlayback = false;
        }
        this.debug.log("ScheduleController " + type + " start.");
        validate.call(this);
    }, startOnReady = function() {
        if (initialPlayback) {
            getInitRequest.call(this, currentTrackInfo.quality);
            addPlaylistMetrics.call(this, MediaPlayer.vo.metrics.PlayList.INITIAL_PLAY_START_REASON);
        }
        doStart.call(this);
    }, doStop = function(cancelPending) {
        if (isStopped) return;
        isStopped = true;
        this.debug.log("ScheduleController " + type + " stop.");
        if (cancelPending) {
            this.fragmentController.cancelPendingRequestsForModel(fragmentModel);
        }
        clearPlayListTraceMetrics(new Date(), MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON);
    }, getNextFragment = function(callback) {
        var self = this, rules = self.scheduleRulesCollection.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.NEXT_FRAGMENT_RULES);
        self.rulesController.applyRules(rules, self.streamProcessor, callback, null, function(currentValue, newValue) {
            return newValue;
        });
    }, getInitRequest = function(quality) {
        var self = this, request;
        request = self.adapter.getInitRequest(self.streamProcessor, quality);
        if (request !== null) {
            self.fragmentController.prepareFragmentForLoading(self, request);
        }
        return request;
    }, getRequiredFragmentCount = function(callback) {
        var self = this, rules = self.scheduleRulesCollection.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_SCHEDULE_RULES);
        self.rulesController.applyRules(rules, self.streamProcessor, callback, fragmentsToLoad, function(currentValue, newValue) {
            currentValue = currentValue === MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE ? 0 : currentValue;
            return Math.max(currentValue, newValue);
        });
    }, replaceCanceledPendingRequests = function(canceledRequests) {
        var ln = canceledRequests.length, EPSILON = .1, request, time, i;
        for (i = 0; i < ln; i += 1) {
            request = canceledRequests[i];
            time = request.startTime + request.duration / 2 + EPSILON;
            request = this.adapter.getFragmentRequestForTime(this.streamProcessor, currentTrackInfo, time, {
                timeThreshold: 0
            });
            this.fragmentController.prepareFragmentForLoading(this, request);
        }
    }, onGetRequiredFragmentCount = function(result) {
        var self = this;
        fragmentsToLoad = result.value;
        if (fragmentsToLoad <= 0) {
            self.fragmentController.executePendingRequests();
            return;
        }
        getNextFragment.call(self, onNextFragment.bind(self));
    }, onNextFragment = function(result) {
        var request = result.value;
        if (request !== null && !(request instanceof MediaPlayer.vo.FragmentRequest)) {
            request = this.adapter.getFragmentRequestForTime(this.streamProcessor, currentTrackInfo, request.startTime);
        }
        if (request) {
            fragmentsToLoad--;
            this.fragmentController.prepareFragmentForLoading(this, request);
        } else {
            this.fragmentController.executePendingRequests();
        }
    }, validate = function() {
        var now = new Date().getTime(), isEnoughTimeSinceLastValidation = lastValidationTime ? now - lastValidationTime > this.fragmentController.getLoadingTime(this) : true, qualitySwitchThreshold = 1e3;
        if (now - lastABRRuleApplyTime > qualitySwitchThreshold) {
            lastABRRuleApplyTime = now;
            this.abrController.getPlaybackQuality(this.streamProcessor);
        }
        if (!isEnoughTimeSinceLastValidation || isStopped || this.playbackController.isPaused() && (!this.scheduleWhilePaused || isDynamic)) return;
        lastValidationTime = now;
        getRequiredFragmentCount.call(this, onGetRequiredFragmentCount.bind(this));
    }, clearMetrics = function() {
        var self = this;
        if (type === null || type === "") {
            return;
        }
        self.metricsModel.clearCurrentMetricsForType(type);
    }, onDataUpdateCompleted = function(e) {
        if (e.error) return;
        currentTrackInfo = this.adapter.convertDataToTrack(e.data.currentRepresentation);
        if (!isDynamic) {
            ready = true;
        }
        if (ready) {
            startOnReady.call(this);
        }
    }, onStreamCompleted = function(e) {
        if (e.data.fragmentModel !== this.streamProcessor.getFragmentModel()) return;
        this.debug.log(type + " Stream is complete.");
        clearPlayListTraceMetrics(new Date(), MediaPlayer.vo.metrics.PlayList.Trace.END_OF_CONTENT_STOP_REASON);
    }, onMediaFragmentLoadingStart = function(e) {
        var self = this;
        if (e.data.fragmentModel !== self.streamProcessor.getFragmentModel()) return;
        validate.call(self);
    }, onFragmentLoadingCompleted = function(e) {
        if (!e.error) return;
        doStop.call(this);
    }, onBytesAppended = function() {
        addPlaylistTraceMetrics.call(this);
    }, onDataUpdateStarted = function() {
        doStop.call(this, false);
    }, onInitRequested = function(e) {
        getInitRequest.call(this, e.data.requiredQuality);
    }, onBufferCleared = function(e) {
        this.fragmentController.removeExecutedRequestsBeforeTime(fragmentModel, e.data.to);
        if (e.data.hasEnoughSpaceToAppend) {
            doStart.call(this);
        }
    }, onBufferLevelStateChanged = function(e) {
        var self = this;
        if (!e.data.hasSufficientBuffer && !self.playbackController.isSeeking()) {
            self.debug.log("Stalling " + type + " Buffer: " + type);
            clearPlayListTraceMetrics(new Date(), MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON);
        }
    }, onBufferLevelUpdated = function(e) {
        var self = this;
        self.metricsModel.addBufferLevel(type, new Date(), e.data.bufferLevel);
        validate.call(this);
    }, onQuotaExceeded = function() {
        doStop.call(this, false);
    }, onQualityChanged = function(e) {
        if (type !== e.data.mediaType || this.streamProcessor.getStreamInfo().id !== e.data.streamInfo.id) return;
        var self = this, canceledReqs;
        canceledReqs = fragmentModel.cancelPendingRequests(e.data.oldQuality);
        currentTrackInfo = self.streamProcessor.getTrackForQuality(e.data.newQuality);
        if (currentTrackInfo === null || currentTrackInfo === undefined) {
            throw "Unexpected error!";
        }
        replaceCanceledPendingRequests.call(self, canceledReqs);
        clearPlayListTraceMetrics(new Date(), MediaPlayer.vo.metrics.PlayList.Trace.REPRESENTATION_SWITCH_STOP_REASON);
    }, addPlaylistMetrics = function(stopReason) {
        var currentTime = new Date(), presentationTime = this.playbackController.getTime();
        clearPlayListTraceMetrics(currentTime, MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON);
        playListMetrics = this.metricsModel.addPlayList(type, currentTime, presentationTime, stopReason);
    }, addPlaylistTraceMetrics = function() {
        var self = this, currentVideoTime = self.playbackController.getTime(), rate = self.playbackController.getPlaybackRate(), currentTime = new Date();
        if (playListTraceMetricsClosed === true && currentTrackInfo && playListMetrics) {
            playListTraceMetricsClosed = false;
            playListTraceMetrics = self.metricsModel.appendPlayListTrace(playListMetrics, currentTrackInfo.id, null, currentTime, currentVideoTime, null, rate, null);
        }
    }, onClosedCaptioningRequested = function(e) {
        var self = this, req = getInitRequest.call(self, e.data.CCIndex);
        fragmentModel.executeRequest(req);
    }, onPlaybackStarted = function() {
        doStart.call(this);
    }, onPlaybackSeeking = function(e) {
        if (!initialPlayback) {
            this.fragmentController.cancelPendingRequestsForModel(fragmentModel);
        }
        var metrics = this.metricsModel.getMetricsFor("stream"), manifestUpdateInfo = this.metricsExt.getCurrentManifestUpdate(metrics);
        this.debug.log("ScheduleController " + type + " seek: " + e.data.seekTime);
        addPlaylistMetrics.call(this, MediaPlayer.vo.metrics.PlayList.SEEK_START_REASON);
        this.metricsModel.updateManifestUpdateInfo(manifestUpdateInfo, {
            latency: currentTrackInfo.DVRWindow.end - this.playbackController.getTime()
        });
    }, onPlaybackRateChanged = function() {
        addPlaylistTraceMetrics.call(this);
    }, onWallclockTimeUpdated = function() {
        validate.call(this);
    }, onLiveEdgeSearchCompleted = function(e) {
        if (e.error) return;
        var self = this, liveEdgeTime = e.data.liveEdge, manifestInfo = currentTrackInfo.mediaInfo.streamInfo.manifestInfo, startTime = liveEdgeTime - Math.min(manifestInfo.minBufferTime * 2, manifestInfo.DVRWindowSize / 2), request, metrics = self.metricsModel.getMetricsFor("stream"), manifestUpdateInfo = self.metricsExt.getCurrentManifestUpdate(metrics), currentLiveStart = self.playbackController.getLiveStartTime(), actualStartTime;
        request = self.adapter.getFragmentRequestForTime(self.streamProcessor, currentTrackInfo, startTime);
        actualStartTime = request.startTime;
        if (isNaN(currentLiveStart) || actualStartTime > currentLiveStart) {
            self.playbackController.setLiveStartTime(actualStartTime);
        }
        self.metricsModel.updateManifestUpdateInfo(manifestUpdateInfo, {
            currentTime: actualStartTime,
            presentationStartTime: liveEdgeTime,
            latency: liveEdgeTime - actualStartTime,
            clientTimeOffset: self.timelineConverter.getClientTimeOffset()
        });
        ready = true;
        startOnReady.call(self);
    };
    return {
        debug: undefined,
        system: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        scheduleWhilePaused: undefined,
        timelineConverter: undefined,
        abrController: undefined,
        adapter: undefined,
        scheduleRulesCollection: undefined,
        rulesController: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED] = onLiveEdgeSearchCompleted;
            this[MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED] = onQualityChanged;
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED] = onDataUpdateStarted;
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
            this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START] = onMediaFragmentLoadingStart;
            this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED] = onFragmentLoadingCompleted;
            this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED] = onStreamCompleted;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED] = onBufferCleared;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED] = onBytesAppended;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED] = onBufferLevelStateChanged;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED] = onBufferLevelUpdated;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED] = onInitRequested;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED] = onQuotaExceeded;
            this[MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED] = onClosedCaptioningRequested;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED] = onPlaybackStarted;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = onPlaybackSeeking;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED] = onPlaybackRateChanged;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED] = onWallclockTimeUpdated;
        },
        initialize: function(typeValue, streamProcessor) {
            var self = this;
            type = typeValue;
            self.streamProcessor = streamProcessor;
            self.playbackController = streamProcessor.playbackController;
            self.fragmentController = streamProcessor.fragmentController;
            self.liveEdgeFinder = streamProcessor.liveEdgeFinder;
            self.bufferController = streamProcessor.bufferController;
            isDynamic = streamProcessor.isDynamic();
            fragmentModel = this.fragmentController.getModel(this);
            if (self.scheduleRulesCollection.bufferLevelRule) {
                self.scheduleRulesCollection.bufferLevelRule.setScheduleController(self);
            }
            if (self.scheduleRulesCollection.pendingRequestsRule) {
                self.scheduleRulesCollection.pendingRequestsRule.setScheduleController(self);
            }
            if (self.scheduleRulesCollection.playbackTimeRule) {
                self.scheduleRulesCollection.playbackTimeRule.setScheduleController(self);
            }
        },
        getFragmentModel: function() {
            return fragmentModel;
        },
        getFragmentToLoadCount: function() {
            return fragmentsToLoad;
        },
        reset: function() {
            var self = this;
            doStop.call(self, true);
            self.bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, self.scheduleRulesCollection.bufferLevelRule);
            self.bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, self.scheduleRulesCollection.bufferLevelRule);
            self.fragmentController.abortRequestsForModel(fragmentModel);
            self.fragmentController.detachModel(fragmentModel);
            clearMetrics.call(self);
            fragmentsToLoad = 0;
        },
        start: doStart,
        stop: doStop
    };
};

MediaPlayer.dependencies.ScheduleController.prototype = {
    constructor: MediaPlayer.dependencies.ScheduleController
};

MediaPlayer.dependencies.StreamController = function() {
    "use strict";
    var streams = [], activeStream, STREAM_BUFFER_END_THRESHOLD = 6, STREAM_END_THRESHOLD = .2, autoPlay = true, isStreamSwitchingInProgress = false, play = function() {
        activeStream.play();
    }, pause = function() {
        activeStream.pause();
    }, seek = function(time) {
        activeStream.seek(time);
    }, switchVideoModel = function(fromModel, toModel) {
        var activeVideoElement = fromModel.getElement(), newVideoElement = toModel.getElement();
        if (!newVideoElement.parentNode) {
            activeVideoElement.parentNode.insertBefore(newVideoElement, activeVideoElement);
        }
        activeVideoElement.style.width = "0px";
        newVideoElement.style.width = "100%";
        copyVideoProperties(activeVideoElement, newVideoElement);
    }, attachVideoEvents = function(stream) {
        var playbackCtrl = stream.getPlaybackController();
        playbackCtrl.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, this.manifestUpdater);
        playbackCtrl.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED, this.manifestUpdater);
        playbackCtrl.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, this);
        playbackCtrl.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, this);
        playbackCtrl.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS, this);
    }, detachVideoEvents = function(stream) {
        var self = this, playbackCtrl = stream.getPlaybackController();
        setTimeout(function() {
            playbackCtrl.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, self.manifestUpdater);
            playbackCtrl.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED, self.manifestUpdater);
            playbackCtrl.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, self);
            playbackCtrl.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, self);
            playbackCtrl.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS, self);
        }, 1);
    }, copyVideoProperties = function(fromVideoElement, toVideoElement) {
        [ "controls", "loop", "muted", "volume" ].forEach(function(prop) {
            toVideoElement[prop] = fromVideoElement[prop];
        });
    }, onProgress = function(e) {
        if (!e.data.remainingUnbufferedDuration || e.data.remainingUnbufferedDuration >= STREAM_BUFFER_END_THRESHOLD) return;
        onStreamBufferingEnd();
    }, onTimeupdate = function(e) {
        var self = this, playbackQuality = self.videoExt.getPlaybackQuality(activeStream.getVideoModel().getElement());
        if (playbackQuality) {
            self.metricsModel.addDroppedFrames("video", playbackQuality);
        }
        if (!getNextStream()) return;
        if (activeStream.getVideoModel().getElement().seeking) return;
        if (e.data.timeToEnd < STREAM_END_THRESHOLD) {
            switchStream.call(this, activeStream, getNextStream());
        }
    }, onSeeking = function(e) {
        var seekingStream = getStreamForTime(e.data.seekTime);
        if (seekingStream && seekingStream !== activeStream) {
            switchStream.call(this, activeStream, seekingStream, e.data.seekTime);
        }
    }, onStreamBufferingEnd = function() {
        var nextStream = getNextStream();
        if (nextStream) {
            nextStream.seek(nextStream.getStartTime());
        }
    }, getNextStream = function() {
        var nextIndex = activeStream.getStreamIndex() + 1;
        return nextIndex < streams.length ? streams[nextIndex] : null;
    }, getStreamForTime = function(time) {
        var duration = 0, stream = null, ln = streams.length;
        if (ln > 0) {
            duration += streams[0].getStartTime();
        }
        for (var i = 0; i < ln; i++) {
            stream = streams[i];
            duration += stream.getDuration();
            if (time < duration) {
                return stream;
            }
        }
        return null;
    }, createVideoModel = function() {
        var model = this.system.getObject("videoModel"), video = document.createElement("video");
        model.setElement(video);
        return model;
    }, removeVideoElement = function(element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, switchStream = function(from, to, seekTo) {
        if (isStreamSwitchingInProgress || !from || !to || from === to) return;
        isStreamSwitchingInProgress = true;
        from.pause();
        activeStream = to;
        switchVideoModel.call(this, from.getVideoModel(), to.getVideoModel());
        detachVideoEvents.call(this, from);
        attachVideoEvents.call(this, to);
        if (seekTo) {
            seek(from.getPlaybackController().getTime());
        } else {
            seek(to.getStartTime());
        }
        play();
        from.resetEventController();
        activeStream.startEventController();
        isStreamSwitchingInProgress = false;
    }, composeStreams = function() {
        var self = this, manifest = self.manifestModel.getValue(), metrics = self.metricsModel.getMetricsFor("stream"), manifestUpdateInfo = self.metricsExt.getCurrentManifestUpdate(metrics), videoModel = activeStream ? activeStream.getVideoModel() : self.getVideoModel(), playbackCtrl, streamInfo, pLen, sLen, pIdx, sIdx, streamsInfo, stream;
        if (!manifest) return;
        streamsInfo = self.adapter.getStreamsInfo(manifest);
        try {
            if (streamsInfo.length === 0) {
                throw new Error("There are no streams");
            }
            self.metricsModel.updateManifestUpdateInfo(manifestUpdateInfo, {
                currentTime: videoModel.getCurrentTime(),
                buffered: videoModel.getElement().buffered,
                presentationStartTime: streamsInfo[0].start,
                clientTimeOffset: self.timelineConverter.getClientTimeOffset()
            });
            for (pIdx = 0, pLen = streamsInfo.length; pIdx < pLen; pIdx += 1) {
                streamInfo = streamsInfo[pIdx];
                for (sIdx = 0, sLen = streams.length; sIdx < sLen; sIdx += 1) {
                    if (streams[sIdx].getId() === streamInfo.id) {
                        stream = streams[sIdx];
                        stream.updateData(streamInfo);
                    }
                }
                if (!stream) {
                    stream = self.system.getObject("stream");
                    playbackCtrl = self.system.getObject("playbackController");
                    stream.setStreamInfo(streamInfo);
                    stream.setVideoModel(pIdx === 0 ? self.videoModel : createVideoModel.call(self));
                    stream.setPlaybackController(playbackCtrl);
                    playbackCtrl.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR, stream);
                    playbackCtrl.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_METADATA_LOADED, stream);
                    stream.initProtection();
                    stream.setAutoPlay(autoPlay);
                    stream.load(manifest);
                    stream.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, self);
                    streams.push(stream);
                }
                self.metricsModel.addManifestUpdateStreamInfo(manifestUpdateInfo, streamInfo.id, streamInfo.index, streamInfo.start, streamInfo.duration);
                stream = null;
            }
            if (!activeStream) {
                activeStream = streams[0];
                attachVideoEvents.call(self, activeStream);
                activeStream.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, this.liveEdgeFinder);
            }
        } catch (e) {
            self.errHandler.manifestError(e.message, "nostreamscomposed", self.manifestModel.getValue());
            self.reset();
        }
    }, onStreamUpdated = function() {
        var self = this, ln = streams.length, i = 0;
        for (i; i < ln; i += 1) {
            if (streams[i].isUpdating()) return;
        }
        self.notify(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED);
    }, onTimeSyncAttemptCompleted = function() {
        composeStreams.call(this);
    }, onManifestLoaded = function(e) {
        if (!e.error) {
            this.manifestModel.setValue(e.data.manifest);
            this.debug.log("Manifest has loaded.");
            this.timeSyncController.initialize(this.manifestExt.getUTCTimingSources(e.data.manifest));
        } else {
            this.reset();
        }
    };
    return {
        system: undefined,
        videoModel: undefined,
        manifestLoader: undefined,
        manifestUpdater: undefined,
        manifestModel: undefined,
        manifestExt: undefined,
        adapter: undefined,
        debug: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        videoExt: undefined,
        liveEdgeFinder: undefined,
        timelineConverter: undefined,
        protectionExt: undefined,
        timeSyncController: undefined,
        errHandler: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED] = onManifestLoaded;
            this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED] = onStreamUpdated;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = onSeeking;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS] = onProgress;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED] = onTimeupdate;
            this[MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED] = onTimeSyncAttemptCompleted;
        },
        setAutoPlay: function(value) {
            autoPlay = value;
        },
        getAutoPlay: function() {
            return autoPlay;
        },
        setProtectionData: function(value) {
            this.protectionExt.init(value);
        },
        getVideoModel: function() {
            return this.videoModel;
        },
        setVideoModel: function(value) {
            this.videoModel = value;
        },
        getActiveStreamInfo: function() {
            return activeStream ? activeStream.getStreamInfo() : null;
        },
        initialize: function() {
            this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.timelineConverter);
            this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.liveEdgeFinder);
            this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this);
        },
        load: function(url) {
            this.manifestLoader.load(url);
        },
        reset: function() {
            if (!!activeStream) {
                detachVideoEvents.call(this, activeStream);
                if (activeStream.getVideoModel() !== this.getVideoModel()) {
                    switchVideoModel.call(this, activeStream.getVideoModel(), this.getVideoModel());
                }
            }
            this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.timelineConverter);
            this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.liveEdgeFinder);
            this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this);
            this.timeSyncController.reset();
            for (var i = 0, ln = streams.length; i < ln; i++) {
                var stream = streams[i];
                stream.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, this);
                stream.reset();
                if (stream.getVideoModel() !== this.getVideoModel()) {
                    removeVideoElement(stream.getVideoModel().getElement());
                }
            }
            streams = [];
            this.manifestUpdater.stop();
            this.metricsModel.clearAllCurrentMetrics();
            this.manifestModel.setValue(null);
            this.timelineConverter.reset();
            this.adapter.reset();
            isStreamSwitchingInProgress = false;
            activeStream = null;
        },
        play: play,
        seek: seek,
        pause: pause
    };
};

MediaPlayer.dependencies.StreamController.prototype = {
    constructor: MediaPlayer.dependencies.StreamController
};

MediaPlayer.dependencies.StreamController.eventList = {
    ENAME_STREAMS_COMPOSED: "streamsComposed"
};

MediaPlayer.dependencies.TextController = function() {
    var initialized = false, mediaSource, buffer, type, onDataUpdateCompleted = function() {
        if (!initialized) {
            if (buffer.hasOwnProperty("initialize")) {
                buffer.initialize(type, this);
            }
            initialized = true;
        }
        this.notify(MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED, {
            CCIndex: 0
        });
    }, onInitFragmentLoaded = function(e) {
        var self = this;
        if (e.data.fragmentModel !== self.streamProcessor.getFragmentModel()) return;
        if (e.data.bytes !== null) {
            self.sourceBufferExt.append(buffer, e.data.bytes, self.videoModel);
        }
    };
    return {
        sourceBufferExt: undefined,
        debug: undefined,
        system: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
            this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED] = onInitFragmentLoaded;
        },
        initialize: function(typeValue, buffer, source, streamProcessor) {
            var self = this;
            type = typeValue;
            self.setBuffer(buffer);
            self.setMediaSource(source);
            self.videoModel = streamProcessor.videoModel;
            self.trackController = streamProcessor.trackController;
            self.streamProcessor = streamProcessor;
        },
        getBuffer: function() {
            return buffer;
        },
        setBuffer: function(value) {
            buffer = value;
        },
        setMediaSource: function(value) {
            mediaSource = value;
        },
        reset: function(errored) {
            if (!errored) {
                this.sourceBufferExt.abort(mediaSource, buffer);
                this.sourceBufferExt.removeSourceBuffer(mediaSource, buffer);
            }
        }
    };
};

MediaPlayer.dependencies.TextController.prototype = {
    constructor: MediaPlayer.dependencies.TextController
};

MediaPlayer.dependencies.TextController.eventList = {
    ENAME_CLOSED_CAPTIONING_REQUESTED: "closedCaptioningRequested"
};

MediaPlayer.dependencies.MediaSourceExtensions = function() {
    "use strict";
};

MediaPlayer.dependencies.MediaSourceExtensions.prototype = {
    constructor: MediaPlayer.dependencies.MediaSourceExtensions,
    createMediaSource: function() {
        "use strict";
        var hasWebKit = "WebKitMediaSource" in window, hasMediaSource = "MediaSource" in window;
        if (hasMediaSource) {
            return new MediaSource();
        } else if (hasWebKit) {
            return new WebKitMediaSource();
        }
        return null;
    },
    attachMediaSource: function(source, videoModel) {
        "use strict";
        var objectURL = window.URL.createObjectURL(source);
        videoModel.setSource(objectURL);
        return objectURL;
    },
    detachMediaSource: function(videoModel) {
        "use strict";
        videoModel.setSource("");
    },
    setDuration: function(source, value) {
        "use strict";
        source.duration = value;
        return source.duration;
    },
    signalEndOfStream: function(source) {
        "use strict";
        var buffers = source.sourceBuffers, ln = buffers.length, i = 0;
        if (source.readyState !== "open") return;
        for (i; i < ln; i += 1) {
            if (buffers[i].updating) return;
        }
        source.endOfStream();
    }
};

MediaPlayer.dependencies.ProtectionExtensions = function() {
    "use strict";
    var keySystems = [];
    var clearkeyKeySystem;
    return {
        system: undefined,
        debug: undefined,
        setup: function() {
            var keySystem;
            keySystem = this.system.getObject("ksPlayReady");
            keySystems.push(keySystem);
            keySystem = this.system.getObject("ksWidevine");
            keySystems.push(keySystem);
            keySystem = this.system.getObject("ksClearKey");
            keySystems.push(keySystem);
            clearkeyKeySystem = keySystem;
        },
        init: function(protectionDataSet) {
            var getProtectionData = function(keySystemString) {
                var protData = null;
                if (protectionDataSet) {
                    protData = keySystemString in protectionDataSet ? protectionDataSet[keySystemString] : null;
                }
                return protData;
            };
            for (var i = 0; i < keySystems.length; i++) {
                var keySystem = keySystems[i];
                keySystem.init(getProtectionData(keySystem.systemString));
            }
        },
        getKeySystems: function() {
            return keySystems;
        },
        isClearKey: function(keySystem) {
            return keySystem === clearkeyKeySystem;
        },
        autoSelectKeySystem: function(protectionModel, mediaInfo, initData) {
            var ks = null, ksIdx, cpIdx, cp, selectedInitData;
            for (ksIdx = 0; ksIdx < keySystems.length; ++ksIdx) {
                for (cpIdx = 0; cpIdx < mediaInfo.contentProtection.length; ++cpIdx) {
                    cp = mediaInfo.contentProtection[cpIdx];
                    if (protectionModel.isSupported(keySystems[ksIdx], mediaInfo.codec) && cp.schemeIdUri.toLowerCase() === keySystems[ksIdx].schemeIdURI) {
                        selectedInitData = keySystems[ksIdx].getInitData(cp);
                        if (!selectedInitData) {
                            continue;
                        }
                        ks = keySystems[ksIdx];
                        protectionModel.selectKeySystem(ks);
                        break;
                    }
                }
            }
            if (!ks) {
                cp = MediaPlayer.dependencies.protection.CommonEncryption.findCencContentProtection(mediaInfo.contentProtection);
                if (cp) {
                    this.debug.log("CommonEncryption detected in MPD.  Searching initData for supported key systems...");
                    var pssh = MediaPlayer.dependencies.protection.CommonEncryption.parsePSSHList(initData);
                    for (ksIdx = 0; ksIdx < keySystems.length; ++ksIdx) {
                        if (keySystems[ksIdx].uuid in pssh && protectionModel.isSupported(keySystems[ksIdx], mediaInfo.codec)) {
                            ks = keySystems[ksIdx];
                            selectedInitData = pssh[keySystems[ksIdx].uuid];
                            protectionModel.selectKeySystem(ks);
                            break;
                        }
                    }
                }
            }
            if (!ks) {
                throw new Error("DRM: The protection system for this content is not supported.");
            }
            this.debug.log("Selected key system -- " + ks.systemString);
            return selectedInitData;
        }
    };
};

MediaPlayer.dependencies.ProtectionExtensions.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionExtensions
};

MediaPlayer.dependencies.RequestModifierExtensions = function() {
    "use strict";
    return {
        modifyRequestURL: function(url) {
            return url;
        },
        modifyRequestHeader: function(request) {
            return request;
        }
    };
};

MediaPlayer.dependencies.SourceBufferExtensions = function() {
    "use strict";
    this.system = undefined;
    this.errHandler = undefined;
    this.notify = undefined;
    this.subscribe = undefined;
    this.unsubscribe = undefined;
};

MediaPlayer.dependencies.SourceBufferExtensions.prototype = {
    constructor: MediaPlayer.dependencies.SourceBufferExtensions,
    createSourceBuffer: function(mediaSource, mediaInfo) {
        "use strict";
        var self = this, codec = mediaInfo.codec, buffer = null;
        try {
            buffer = mediaSource.addSourceBuffer(codec);
        } catch (ex) {
            if (mediaInfo.isText) {
                buffer = self.system.getObject("textSourceBuffer");
            } else {
                throw ex;
            }
        }
        return buffer;
    },
    removeSourceBuffer: function(mediaSource, buffer) {
        "use strict";
        try {
            mediaSource.removeSourceBuffer(buffer);
        } catch (ex) {}
    },
    getBufferRange: function(buffer, time, tolerance) {
        "use strict";
        var ranges = null, start = 0, end = 0, firstStart = null, lastEnd = null, gap = 0, toler = tolerance || .15, len, i;
        try {
            ranges = buffer.buffered;
        } catch (ex) {
            return null;
        }
        if (ranges !== null) {
            for (i = 0, len = ranges.length; i < len; i += 1) {
                start = ranges.start(i);
                end = ranges.end(i);
                if (firstStart === null) {
                    gap = Math.abs(start - time);
                    if (time >= start && time < end) {
                        firstStart = start;
                        lastEnd = end;
                    } else if (gap <= toler) {
                        firstStart = start;
                        lastEnd = end;
                    }
                } else {
                    gap = start - lastEnd;
                    if (gap <= toler) {
                        lastEnd = end;
                    } else {
                        break;
                    }
                }
            }
            if (firstStart !== null) {
                return {
                    start: firstStart,
                    end: lastEnd
                };
            }
        }
        return null;
    },
    getAllRanges: function(buffer) {
        var ranges = null;
        try {
            ranges = buffer.buffered;
            return ranges;
        } catch (ex) {
            return null;
        }
    },
    getBufferLength: function(buffer, time, tolerance) {
        "use strict";
        var self = this, range, length;
        range = self.getBufferRange(buffer, time, tolerance);
        if (range === null) {
            length = 0;
        } else {
            length = range.end - time;
        }
        return length;
    },
    waitForUpdateEnd: function(buffer, callback) {
        "use strict";
        var intervalId, CHECK_INTERVAL = 50, checkIsUpdateEnded = function() {
            if (buffer.updating) return;
            clearInterval(intervalId);
            callback(true);
        }, updateEndHandler = function() {
            if (buffer.updating) return;
            buffer.removeEventListener("updateend", updateEndHandler, false);
            callback(true);
        };
        if (!buffer.updating) {
            callback(true);
            return;
        }
        if (typeof buffer.addEventListener === "function") {
            try {
                buffer.addEventListener("updateend", updateEndHandler, false);
            } catch (err) {
                intervalId = setInterval(checkIsUpdateEnded, CHECK_INTERVAL);
            }
        } else {
            intervalId = setInterval(checkIsUpdateEnded, CHECK_INTERVAL);
        }
    },
    append: function(buffer, bytes) {
        var self = this, appendMethod = "append" in buffer ? "append" : "appendBuffer" in buffer ? "appendBuffer" : null;
        if (!appendMethod) return;
        try {
            self.waitForUpdateEnd(buffer, function() {
                buffer[appendMethod](bytes);
                self.waitForUpdateEnd(buffer, function() {
                    self.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED, {
                        buffer: buffer,
                        bytes: bytes
                    });
                });
            });
        } catch (err) {
            self.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED, {
                buffer: buffer,
                bytes: bytes
            }, new MediaPlayer.vo.Error(err.code, err.message, null));
        }
    },
    remove: function(buffer, start, end, mediaSource) {
        var self = this;
        try {
            if (start >= 0 && end > start && mediaSource.readyState !== "ended") {
                buffer.remove(start, end);
            }
            this.waitForUpdateEnd(buffer, function() {
                self.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, {
                    buffer: buffer,
                    from: start,
                    to: end
                });
            });
        } catch (err) {
            self.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, {
                buffer: buffer,
                from: start,
                to: end
            }, new MediaPlayer.vo.Error(err.code, err.message, null));
        }
    },
    abort: function(mediaSource, buffer) {
        "use strict";
        try {
            if (mediaSource.readyState === "open") {
                buffer.abort();
            }
        } catch (ex) {}
    }
};

MediaPlayer.dependencies.SourceBufferExtensions.QUOTA_EXCEEDED_ERROR_CODE = 22;

MediaPlayer.dependencies.SourceBufferExtensions.eventList = {
    ENAME_SOURCEBUFFER_REMOVE_COMPLETED: "sourceBufferRemoveCompleted",
    ENAME_SOURCEBUFFER_APPEND_COMPLETED: "sourceBufferAppendCompleted"
};

MediaPlayer.utils.TextTrackExtensions = function() {
    "use strict";
    var Cue;
    return {
        setup: function() {
            Cue = window.VTTCue || window.TextTrackCue;
        },
        addTextTrack: function(video, captionData, label, scrlang, isDefaultTrack) {
            var track = video.addTextTrack("captions", label, scrlang);
            track.default = isDefaultTrack;
            track.mode = "showing";
            for (var item in captionData) {
                var currentItem = captionData[item];
                track.addCue(new Cue(currentItem.start, currentItem.end, currentItem.data));
            }
            return track;
        },
        deleteCues: function(video) {
            var i = 0, firstValidTrack = false;
            while (!firstValidTrack) {
                if (video.textTracks[i].cues !== null) {
                    firstValidTrack = true;
                    break;
                }
                i++;
            }
            var track = video.textTracks[i], cues = track.cues, lastIdx = cues.length - 1;
            for (i = lastIdx; i >= 0; i--) {
                track.removeCue(cues[i]);
            }
            track.mode = "disabled";
            track.default = false;
        }
    };
};

MediaPlayer.dependencies.VideoModelExtensions = function() {
    "use strict";
    return {
        getPlaybackQuality: function(videoElement) {
            var hasWebKit = "webkitDroppedFrameCount" in videoElement, hasQuality = "getVideoPlaybackQuality" in videoElement, result = null;
            if (hasQuality) {
                result = videoElement.getVideoPlaybackQuality();
            } else if (hasWebKit) {
                result = {
                    droppedVideoFrames: videoElement.webkitDroppedFrameCount,
                    creationTime: new Date()
                };
            }
            return result;
        }
    };
};

MediaPlayer.dependencies.VideoModelExtensions.prototype = {
    constructor: MediaPlayer.dependencies.VideoModelExtensions
};

MediaPlayer.dependencies.FragmentModel = function() {
    "use strict";
    var context, executedRequests = [], pendingRequests = [], loadingRequests = [], rejectedRequests = [], isLoadingPostponed = false, loadCurrentFragment = function(request) {
        var self = this;
        self.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED, {
            request: request
        });
        self.fragmentLoader.load(request);
    }, removeExecutedRequest = function(request) {
        var idx = executedRequests.indexOf(request);
        if (idx !== -1) {
            executedRequests.splice(idx, 1);
        }
    }, getRequestForTime = function(arr, time) {
        var lastIdx = arr.length - 1, THRESHOLD = .001, start = NaN, end = NaN, req = null, i;
        for (i = lastIdx; i >= 0; i -= 1) {
            req = arr[i];
            start = req.startTime;
            end = start + req.duration;
            if (!isNaN(start) && !isNaN(end) && time + THRESHOLD >= start && time < end || isNaN(start) && isNaN(time)) {
                return req;
            }
        }
        return null;
    }, addSchedulingInfoMetrics = function(request, state) {
        if (!request) return;
        var mediaType = request.mediaType, now = new Date(), type = request.type, startTime = request.startTime, availabilityStartTime = request.availabilityStartTime, duration = request.duration, quality = request.quality, range = request.range;
        this.metricsModel.addSchedulingInfo(mediaType, now, type, startTime, availabilityStartTime, duration, quality, range, state);
    }, onLoadingCompleted = function(e) {
        var request = e.data.request, response = e.data.response, error = e.error;
        loadingRequests.splice(loadingRequests.indexOf(request), 1);
        if (response && !error) {
            executedRequests.push(request);
        }
        addSchedulingInfoMetrics.call(this, request, error ? MediaPlayer.vo.metrics.SchedulingInfo.FAILED_STATE : MediaPlayer.vo.metrics.SchedulingInfo.EXECUTED_STATE);
        this.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, {
            request: request,
            response: response
        }, error);
    }, onBytesRejected = function(e) {
        var req = this.getExecutedRequestForQualityAndIndex(e.data.quality, e.data.index);
        if (req) {
            this.removeExecutedRequest(req);
            if (!isNaN(e.data.index)) {
                rejectedRequests.push(req);
                addSchedulingInfoMetrics.call(this, req, MediaPlayer.vo.metrics.SchedulingInfo.REJECTED_STATE);
            }
        }
    }, onBufferLevelOutrun = function() {
        isLoadingPostponed = true;
    }, onBufferLevelBalanced = function() {
        isLoadingPostponed = false;
    };
    return {
        system: undefined,
        debug: undefined,
        metricsModel: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN] = onBufferLevelOutrun;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED] = onBufferLevelBalanced;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED] = onBytesRejected;
            this[MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED] = onLoadingCompleted;
        },
        setLoader: function(value) {
            this.fragmentLoader = value;
        },
        setContext: function(value) {
            context = value;
        },
        getContext: function() {
            return context;
        },
        getIsPostponed: function() {
            return isLoadingPostponed;
        },
        addRequest: function(value) {
            if (!value || this.isFragmentLoadedOrPending(value)) return false;
            pendingRequests.push(value);
            addSchedulingInfoMetrics.call(this, value, MediaPlayer.vo.metrics.SchedulingInfo.PENDING_STATE);
            return true;
        },
        isFragmentLoadedOrPending: function(request) {
            var isEqualComplete = function(req1, req2) {
                return req1.action === "complete" && req1.action === req2.action;
            }, isEqualMedia = function(req1, req2) {
                return req1.url === req2.url && req1.startTime === req2.startTime;
            }, isEqualInit = function(req1, req2) {
                return isNaN(req1.index) && isNaN(req2.index) && req1.quality === req2.quality;
            }, check = function(arr) {
                var req, isLoaded = false, ln = arr.length, i;
                for (i = 0; i < ln; i += 1) {
                    req = arr[i];
                    if (isEqualMedia(request, req) || isEqualInit(request, req) || isEqualComplete(request, req)) {
                        isLoaded = true;
                        break;
                    }
                }
                return isLoaded;
            };
            return check(pendingRequests) || check(loadingRequests) || check(executedRequests);
        },
        getPendingRequests: function() {
            return pendingRequests;
        },
        getLoadingRequests: function() {
            return loadingRequests;
        },
        getExecutedRequests: function() {
            return executedRequests;
        },
        getRejectedRequests: function() {
            return rejectedRequests;
        },
        getLoadingTime: function() {
            var loadingTime = 0, req, i;
            for (i = executedRequests.length - 1; i >= 0; i -= 1) {
                req = executedRequests[i];
                if (req.requestEndDate instanceof Date && req.firstByteDate instanceof Date) {
                    loadingTime = req.requestEndDate.getTime() - req.firstByteDate.getTime();
                    break;
                }
            }
            return loadingTime;
        },
        getExecutedRequestForTime: function(time) {
            return getRequestForTime(executedRequests, time);
        },
        getPendingRequestForTime: function(time) {
            return getRequestForTime(pendingRequests, time);
        },
        getLoadingRequestForTime: function(time) {
            return getRequestForTime(loadingRequests, time);
        },
        getExecutedRequestForQualityAndIndex: function(quality, index) {
            var lastIdx = executedRequests.length - 1, req = null, i;
            for (i = lastIdx; i >= 0; i -= 1) {
                req = executedRequests[i];
                if (req.quality === quality && req.index === index) {
                    return req;
                }
            }
            return null;
        },
        removeExecutedRequest: function(request) {
            removeExecutedRequest.call(this, request);
        },
        removeExecutedRequestsBeforeTime: function(time) {
            var lastIdx = executedRequests.length - 1, start = NaN, req = null, i;
            for (i = lastIdx; i >= 0; i -= 1) {
                req = executedRequests[i];
                start = req.startTime;
                if (!isNaN(start) && start < time) {
                    removeExecutedRequest.call(this, req);
                }
            }
        },
        cancelPendingRequests: function(quality) {
            var self = this, reqs = pendingRequests, canceled = reqs;
            pendingRequests = [];
            if (quality !== undefined) {
                pendingRequests = reqs.filter(function(request) {
                    if (request.quality === quality) {
                        return false;
                    }
                    canceled.splice(canceled.indexOf(request), 1);
                    return true;
                });
            }
            canceled.forEach(function(request) {
                addSchedulingInfoMetrics.call(self, request, MediaPlayer.vo.metrics.SchedulingInfo.CANCELED_STATE);
            });
            return canceled;
        },
        abortRequests: function() {
            this.fragmentLoader.abort();
            for (var i = 0, ln = loadingRequests.length; i < ln; i += 1) {
                this.removeExecutedRequest(loadingRequests[i]);
            }
            loadingRequests = [];
        },
        executeRequest: function(request) {
            var self = this, idx = pendingRequests.indexOf(request);
            if (!request || idx === -1) return;
            pendingRequests.splice(idx, 1);
            switch (request.action) {
              case "complete":
                executedRequests.push(request);
                addSchedulingInfoMetrics.call(self, request, MediaPlayer.vo.metrics.SchedulingInfo.EXECUTED_STATE);
                self.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED, {
                    request: request
                });
                break;

              case "download":
                loadingRequests.push(request);
                addSchedulingInfoMetrics.call(self, request, MediaPlayer.vo.metrics.SchedulingInfo.LOADING_STATE);
                loadCurrentFragment.call(self, request);
                break;

              default:
                this.debug.log("Unknown request action.");
            }
        }
    };
};

MediaPlayer.dependencies.FragmentModel.prototype = {
    constructor: MediaPlayer.dependencies.FragmentModel
};

MediaPlayer.dependencies.FragmentModel.eventList = {
    ENAME_STREAM_COMPLETED: "streamCompleted",
    ENAME_FRAGMENT_LOADING_STARTED: "fragmentLoadingStarted",
    ENAME_FRAGMENT_LOADING_COMPLETED: "fragmentLoadingCompleted"
};

MediaPlayer.models.ManifestModel = function() {
    "use strict";
    var manifest;
    return {
        system: undefined,
        eventBus: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        getValue: function() {
            return manifest;
        },
        setValue: function(value) {
            manifest = value;
            this.eventBus.dispatchEvent({
                type: "manifestLoaded",
                data: value
            });
            this.notify(MediaPlayer.models.ManifestModel.eventList.ENAME_MANIFEST_UPDATED, {
                manifest: value
            });
        }
    };
};

MediaPlayer.models.ManifestModel.prototype = {
    constructor: MediaPlayer.models.ManifestModel
};

MediaPlayer.models.ManifestModel.eventList = {
    ENAME_MANIFEST_UPDATED: "manifestUpdated"
};

MediaPlayer.models.MetricsModel = function() {
    "use strict";
    return {
        system: undefined,
        eventBus: undefined,
        adapter: undefined,
        streamMetrics: {},
        metricsChanged: function() {
            this.eventBus.dispatchEvent({
                type: "metricsChanged",
                data: {}
            });
        },
        metricChanged: function(mediaType) {
            this.eventBus.dispatchEvent({
                type: "metricChanged",
                data: {
                    stream: mediaType
                }
            });
            this.metricsChanged();
        },
        metricUpdated: function(mediaType, metricType, vo) {
            this.eventBus.dispatchEvent({
                type: "metricUpdated",
                data: {
                    stream: mediaType,
                    metric: metricType,
                    value: vo
                }
            });
            this.metricChanged(mediaType);
        },
        metricAdded: function(mediaType, metricType, vo) {
            this.eventBus.dispatchEvent({
                type: "metricAdded",
                data: {
                    stream: mediaType,
                    metric: metricType,
                    value: vo
                }
            });
            this.metricChanged(mediaType);
        },
        clearCurrentMetricsForType: function(type) {
            delete this.streamMetrics[type];
            this.metricChanged(type);
        },
        clearAllCurrentMetrics: function() {
            var self = this;
            this.streamMetrics = {};
            this.metricsChanged.call(self);
        },
        getReadOnlyMetricsFor: function(type) {
            if (this.streamMetrics.hasOwnProperty(type)) {
                return this.streamMetrics[type];
            }
            return null;
        },
        getMetricsFor: function(type) {
            var metrics;
            if (this.streamMetrics.hasOwnProperty(type)) {
                metrics = this.streamMetrics[type];
            } else {
                metrics = this.system.getObject("metrics");
                this.streamMetrics[type] = metrics;
            }
            return metrics;
        },
        addTcpConnection: function(mediaType, tcpid, dest, topen, tclose, tconnect) {
            var vo = new MediaPlayer.vo.metrics.TCPConnection();
            vo.tcpid = tcpid;
            vo.dest = dest;
            vo.topen = topen;
            vo.tclose = tclose;
            vo.tconnect = tconnect;
            this.getMetricsFor(mediaType).TcpList.push(vo);
            this.metricAdded(mediaType, this.adapter.metricsList.TCP_CONNECTION, vo);
            return vo;
        },
        addHttpRequest: function(mediaType, tcpid, type, url, actualurl, range, trequest, tresponse, tfinish, responsecode, interval, mediaduration, responseHeaders) {
            var vo = new MediaPlayer.vo.metrics.HTTPRequest();
            vo.stream = mediaType;
            vo.tcpid = tcpid;
            vo.type = type;
            vo.url = url;
            vo.actualurl = actualurl;
            vo.range = range;
            vo.trequest = trequest;
            vo.tresponse = tresponse;
            vo.tfinish = tfinish;
            vo.responsecode = responsecode;
            vo.interval = interval;
            vo.mediaduration = mediaduration;
            vo.responseHeaders = responseHeaders;
            this.getMetricsFor(mediaType).HttpList.push(vo);
            this.metricAdded(mediaType, this.adapter.metricsList.HTTP_REQUEST, vo);
            return vo;
        },
        appendHttpTrace: function(httpRequest, s, d, b) {
            var vo = new MediaPlayer.vo.metrics.HTTPRequest.Trace();
            vo.s = s;
            vo.d = d;
            vo.b = b;
            httpRequest.trace.push(vo);
            this.metricUpdated(httpRequest.stream, this.adapter.metricsList.HTTP_REQUEST_TRACE, httpRequest);
            return vo;
        },
        addTrackSwitch: function(mediaType, t, mt, to, lto) {
            var vo = new MediaPlayer.vo.metrics.TrackSwitch();
            vo.t = t;
            vo.mt = mt;
            vo.to = to;
            vo.lto = lto;
            this.getMetricsFor(mediaType).RepSwitchList.push(vo);
            this.metricAdded(mediaType, this.adapter.metricsList.TRACK_SWITCH, vo);
            return vo;
        },
        addBufferLevel: function(mediaType, t, level) {
            var vo = new MediaPlayer.vo.metrics.BufferLevel();
            vo.t = t;
            vo.level = level;
            this.getMetricsFor(mediaType).BufferLevel.push(vo);
            this.metricAdded(mediaType, this.adapter.metricsList.BUFFER_LEVEL, vo);
            return vo;
        },
        addBufferState: function(mediaType, state, target) {
            var vo = new MediaPlayer.vo.metrics.BufferState();
            vo.target = target;
            vo.state = state;
            this.getMetricsFor(mediaType).BufferState.push(vo);
            this.metricAdded(mediaType, this.adapter.metricsList.BUFFER_STATE, vo);
            return vo;
        },
        addDVRInfo: function(mediaType, currentTime, mpd, range) {
            var vo = new MediaPlayer.vo.metrics.DVRInfo();
            vo.time = currentTime;
            vo.range = range;
            vo.manifestInfo = mpd;
            this.getMetricsFor(mediaType).DVRInfo.push(vo);
            this.metricAdded(mediaType, this.adapter.metricsList.DVR_INFO, vo);
            return vo;
        },
        addDroppedFrames: function(mediaType, quality) {
            var vo = new MediaPlayer.vo.metrics.DroppedFrames(), list = this.getMetricsFor(mediaType).DroppedFrames;
            vo.time = quality.creationTime;
            vo.droppedFrames = quality.droppedVideoFrames;
            if (list.length > 0 && list[list.length - 1] == vo) {
                return list[list.length - 1];
            }
            list.push(vo);
            this.metricAdded(mediaType, this.adapter.metricsList.DROPPED_FRAMES, vo);
            return vo;
        },
        addSchedulingInfo: function(mediaType, t, type, startTime, availabilityStartTime, duration, quality, range, state) {
            var vo = new MediaPlayer.vo.metrics.SchedulingInfo();
            vo.mediaType = mediaType;
            vo.t = t;
            vo.type = type;
            vo.startTime = startTime;
            vo.availabilityStartTime = availabilityStartTime;
            vo.duration = duration;
            vo.quality = quality;
            vo.range = range;
            vo.state = state;
            this.getMetricsFor(mediaType).SchedulingInfo.push(vo);
            this.metricAdded(mediaType, this.adapter.metricsList.SCHEDULING_INFO, vo);
            return vo;
        },
        addManifestUpdate: function(mediaType, type, requestTime, fetchTime, availabilityStartTime, presentationStartTime, clientTimeOffset, currentTime, buffered, latency) {
            var vo = new MediaPlayer.vo.metrics.ManifestUpdate(), metrics = this.getMetricsFor("stream");
            vo.mediaType = mediaType;
            vo.type = type;
            vo.requestTime = requestTime;
            vo.fetchTime = fetchTime;
            vo.availabilityStartTime = availabilityStartTime;
            vo.presentationStartTime = presentationStartTime;
            vo.clientTimeOffset = clientTimeOffset;
            vo.currentTime = currentTime;
            vo.buffered = buffered;
            vo.latency = latency;
            metrics.ManifestUpdate.push(vo);
            this.metricAdded(mediaType, this.adapter.metricsList.MANIFEST_UPDATE, vo);
            return vo;
        },
        updateManifestUpdateInfo: function(manifestUpdate, updatedFields) {
            for (var field in updatedFields) {
                manifestUpdate[field] = updatedFields[field];
            }
            this.metricUpdated(manifestUpdate.mediaType, this.adapter.metricsList.MANIFEST_UPDATE, manifestUpdate);
        },
        addManifestUpdateStreamInfo: function(manifestUpdate, id, index, start, duration) {
            var vo = new MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo();
            vo.id = id;
            vo.index = index;
            vo.start = start;
            vo.duration = duration;
            manifestUpdate.streamInfo.push(vo);
            this.metricUpdated(manifestUpdate.mediaType, this.adapter.metricsList.MANIFEST_UPDATE_STREAM_INFO, manifestUpdate);
            return vo;
        },
        addManifestUpdateTrackInfo: function(manifestUpdate, id, index, streamIndex, mediaType, presentationTimeOffset, startNumber, fragmentInfoType) {
            var vo = new MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo();
            vo.id = id;
            vo.index = index;
            vo.streamIndex = streamIndex;
            vo.mediaType = mediaType;
            vo.startNumber = startNumber;
            vo.fragmentInfoType = fragmentInfoType;
            vo.presentationTimeOffset = presentationTimeOffset;
            manifestUpdate.trackInfo.push(vo);
            this.metricUpdated(manifestUpdate.mediaType, this.adapter.metricsList.MANIFEST_UPDATE_TRACK_INFO, manifestUpdate);
            return vo;
        },
        addPlayList: function(mediaType, start, mstart, starttype) {
            var vo = new MediaPlayer.vo.metrics.PlayList();
            vo.stream = mediaType;
            vo.start = start;
            vo.mstart = mstart;
            vo.starttype = starttype;
            this.getMetricsFor(mediaType).PlayList.push(vo);
            this.metricAdded(mediaType, this.adapter.metricsList.PLAY_LIST, vo);
            return vo;
        },
        appendPlayListTrace: function(playList, trackId, subreplevel, start, mstart, duration, playbackspeed, stopreason) {
            var vo = new MediaPlayer.vo.metrics.PlayList.Trace();
            vo.representationid = trackId;
            vo.subreplevel = subreplevel;
            vo.start = start;
            vo.mstart = mstart;
            vo.duration = duration;
            vo.playbackspeed = playbackspeed;
            vo.stopreason = stopreason;
            playList.trace.push(vo);
            this.metricUpdated(playList.stream, this.adapter.metricsList.PLAY_LIST_TRACE, playList);
            return vo;
        }
    };
};

MediaPlayer.models.MetricsModel.prototype = {
    constructor: MediaPlayer.models.MetricsModel
};

MediaPlayer.models.ProtectionModel = {};

MediaPlayer.models.ProtectionModel.eventList = {
    ENAME_NEED_KEY: "needkey",
    ENAME_KEY_MESSAGE: "keyMessage",
    ENAME_KEY_ADDED: "keyAdded",
    ENAME_KEY_ERROR: "keyError",
    ENAME_KEY_SESSION_CREATED: "keySessionCreated",
    ENAME_KEY_SESSION_LOADED: "keySessionLoaded",
    ENAME_KEY_SESSION_UNLOADED: "keySessionUnloaded",
    ENAME_KEY_SESSION_CLOSED: "keySessionClosed"
};

MediaPlayer.models.ProtectionModel_01b = function() {
    var videoElement = null, api = null, pendingSessions = [], sessions = [], moreSessionsAllowed, createEventHandler = function() {
        var self = this;
        return {
            handleEvent: function(event) {
                var sessionToken = null;
                switch (event.type) {
                  case api.needkey:
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, new MediaPlayer.vo.protection.NeedKey(event.initData));
                    break;

                  case api.keyerror:
                    sessionToken = findSessionByID(sessions, event.sessionId);
                    if (!sessionToken) {
                        sessionToken = findSessionByID(pendingSessions, event.sessionId);
                    }
                    if (sessionToken) {
                        var msg = "";
                        switch (event.errorCode.code) {
                          case 1:
                            msg += "MEDIA_KEYERR_UNKNOWN - An unspecified error occurred. This value is used for errors that don't match any of the other codes.";
                            break;

                          case 2:
                            msg += "MEDIA_KEYERR_CLIENT - The Key System could not be installed or updated.";
                            break;

                          case 3:
                            msg += "MEDIA_KEYERR_SERVICE - The message passed into update indicated an error from the license service.";
                            break;

                          case 4:
                            msg += "MEDIA_KEYERR_OUTPUT - There is no available output device with the required characteristics for the content protection system.";
                            break;

                          case 5:
                            msg += "MEDIA_KEYERR_HARDWARECHANGE - A hardware configuration change caused a content protection error.";
                            break;

                          case 6:
                            msg += "MEDIA_KEYERR_DOMAIN - An error occurred in a multi-device domain licensing configuration. The most common error is a failure to join the domain.";
                            break;
                        }
                        msg += "  System Code = " + event.systemCode;
                        self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, new MediaPlayer.vo.protection.KeyError(sessionToken, msg));
                    } else {
                        self.debug.log("No session token found for key error");
                    }
                    break;

                  case api.keyadded:
                    sessionToken = findSessionByID(sessions, event.sessionId);
                    if (!sessionToken) {
                        sessionToken = findSessionByID(pendingSessions, event.sessionId);
                    }
                    if (sessionToken) {
                        self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED, sessionToken);
                    } else {
                        self.debug.log("No session token found for key added");
                    }
                    break;

                  case api.keymessage:
                    moreSessionsAllowed = event.sessionId !== null && event.sessionId !== undefined;
                    if (moreSessionsAllowed) {
                        sessionToken = findSessionByID(sessions, event.sessionId);
                        if (!sessionToken) {
                            sessionToken = pendingSessions.shift();
                            sessions.push(sessionToken);
                            sessionToken.sessionID = event.sessionId;
                        }
                    } else {
                        sessionToken = pendingSessions.shift();
                        sessions.push(sessionToken);
                        if (pendingSessions.length !== 0) {
                            self.errHandler.mediaKeyMessageError("Multiple key sessions were creates with a user-agent that does not support sessionIDs!! Unpredictable behavior ahead!");
                        }
                    }
                    if (sessionToken) {
                        sessionToken.keyMessage = event.message;
                        self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, new MediaPlayer.vo.protection.KeyMessage(sessionToken, event.message, event.defaultURL));
                    } else {
                        self.debug.log("No session token found for key message");
                    }
                    break;
                }
            }
        };
    }, eventHandler = null, findSessionByID = function(sessionArray, sessionID) {
        if (!sessionID || !sessionArray) {
            return null;
        } else {
            var len = sessionArray.length;
            for (var i = 0; i < len; i++) {
                if (sessionArray[i].sessionID == sessionID) {
                    return sessionArray[i];
                }
            }
            return null;
        }
    }, removeEventListeners = function() {
        videoElement.removeEventListener(api.keyerror, eventHandler);
        videoElement.removeEventListener(api.needkey, eventHandler);
        videoElement.removeEventListener(api.keymessage, eventHandler);
        videoElement.removeEventListener(api.keyadded, eventHandler);
    };
    return {
        system: undefined,
        debug: undefined,
        errHandler: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        protectionExt: undefined,
        keySystem: null,
        setup: function() {
            eventHandler = createEventHandler.call(this);
        },
        init: function() {
            var tmpVideoElement = document.createElement("video");
            api = MediaPlayer.models.ProtectionModel_01b.detect(tmpVideoElement);
        },
        teardown: function() {
            if (videoElement) {
                removeEventListeners();
            }
            for (var i = 0; i < sessions.length; i++) {
                this.closeKeySession(sessions[i]);
            }
        },
        isSupported: function(keySystem, contentType) {
            return videoElement.canPlayType(contentType, keySystem.systemString) !== "";
        },
        selectKeySystem: function(keySystem) {
            this.keySystem = keySystem;
        },
        setMediaElement: function(mediaElement) {
            if (videoElement) {
                removeEventListeners();
            }
            videoElement = mediaElement;
            videoElement.addEventListener(api.keyerror, eventHandler);
            videoElement.addEventListener(api.needkey, eventHandler);
            videoElement.addEventListener(api.keymessage, eventHandler);
            videoElement.addEventListener(api.keyadded, eventHandler);
        },
        createKeySession: function(initData) {
            if (!this.keySystem) {
                throw new Error("Can not create sessions until you have selected a key system");
            }
            if (moreSessionsAllowed || sessions.length === 0) {
                var newSession = {
                    prototype: new MediaPlayer.models.SessionToken().prototype,
                    sessionID: null,
                    initData: initData
                };
                pendingSessions.push(newSession);
                videoElement[api.generateKeyRequest](this.keySystem.systemString, initData);
                return newSession;
            } else {
                throw new Error("Multiple sessions not allowed!");
            }
        },
        updateKeySession: function(sessionToken, message) {
            var sessionID = sessionToken.sessionID;
            if (!this.protectionExt.isClearKey(this.keySystem)) {
                videoElement[api.addKey](this.keySystem.systemString, message, sessionToken.initData, sessionID);
            } else {
                for (var i = 0; i < message.keyPairs.length; i++) {
                    videoElement[api.addKey](this.keySystem.systemString, message.keyPairs[i].key, message.keyPairs[i].keyID, sessionID);
                }
            }
        },
        closeKeySession: function(sessionToken) {
            videoElement[api.cancelKeyRequest](this.keySystem.systemString, sessionToken.sessionID);
        },
        setServerCertificate: function() {}
    };
};

MediaPlayer.models.ProtectionModel_01b.prototype = {
    constructor: MediaPlayer.models.ProtectionModel_01b
};

MediaPlayer.models.ProtectionModel_01b.APIs = [ {
    generateKeyRequest: "generateKeyRequest",
    addKey: "addKey",
    cancelKeyRequest: "cancelKeyRequest",
    needkey: "needkey",
    keyerror: "keyerror",
    keyadded: "keyadded",
    keymessage: "keymessage"
}, {
    generateKeyRequest: "webkitGenerateKeyRequest",
    addKey: "webkitAddKey",
    cancelKeyRequest: "webkitCancelKeyRequest",
    needkey: "webkitneedkey",
    keyerror: "webkitkeyerror",
    keyadded: "webkitkeyadded",
    keymessage: "webkitkeymessage"
} ];

MediaPlayer.models.ProtectionModel_01b.detect = function(videoElement) {
    var apis = MediaPlayer.models.ProtectionModel_01b.APIs;
    for (var i = 0; i < apis.length; i++) {
        var api = apis[i];
        if (typeof videoElement[api.generateKeyRequest] !== "function") {
            continue;
        }
        if (typeof videoElement[api.addKey] !== "function") {
            continue;
        }
        if (typeof videoElement[api.cancelKeyRequest] !== "function") {
            continue;
        }
        return api;
    }
    return null;
};

MediaPlayer.models.ProtectionModel_3Feb2014 = function() {
    var videoElement = null, mediaKeys = null, api = null, sessions = [], createEventHandler = function() {
        var self = this;
        return {
            handleEvent: function(event) {
                switch (event.type) {
                  case api.needkey:
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, new MediaPlayer.vo.protection.NeedKey(event.initData));
                    break;
                }
            }
        };
    }, eventHandler = null, createSessionToken = function(keySession, initData) {
        var self = this;
        return {
            prototype: new MediaPlayer.models.SessionToken().prototype,
            session: keySession,
            sessionID: keySession.sessionId,
            initData: initData,
            handleEvent: function(event) {
                switch (event.type) {
                  case api.error:
                    var errorStr = "KeyError";
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, new MediaPlayer.vo.protection.KeyError(this, errorStr));
                    break;

                  case api.message:
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, new MediaPlayer.vo.protection.KeyMessage(this, event.message, event.destinationURL));
                    break;

                  case api.ready:
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED, this);
                    break;

                  case api.close:
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, this);
                    break;
                }
            }
        };
    };
    return {
        system: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        protectionExt: undefined,
        keySystem: null,
        setup: function() {
            eventHandler = createEventHandler.call(this);
        },
        init: function() {
            var tmpVideoElement = document.createElement("video");
            api = MediaPlayer.models.ProtectionModel_3Feb2014.detect(tmpVideoElement);
        },
        teardown: function() {
            if (videoElement) {
                videoElement.removeEventListener(api.needkey, eventHandler);
            }
            for (var i = 0; i < sessions.length; i++) {
                this.closeKeySession(sessions[i]);
            }
        },
        isSupported: function(keySystem, contentType) {
            return window[api.MediaKeys].isTypeSupported(keySystem.systemString, contentType);
        },
        selectKeySystem: function(keySystem) {
            this.keySystem = keySystem;
            mediaKeys = new window[api.MediaKeys](this.keySystem.systemString);
            if (videoElement) {
                videoElement[api.setMediaKeys](mediaKeys);
            }
        },
        setMediaElement: function(mediaElement) {
            if (videoElement) {
                videoElement.removeEventListener(api.needkey, eventHandler().bind(this));
            }
            videoElement = mediaElement;
            videoElement.addEventListener(api.needkey, eventHandler);
            if (mediaKeys) {
                videoElement[api.setMediaKeys](mediaKeys);
            }
        },
        createKeySession: function(initData, contentType) {
            if (!this.keySystem || !mediaKeys) {
                throw new Error("Can not create sessions until you have selected a key system");
            }
            var session = mediaKeys.createSession(contentType, initData);
            var sessionToken = createSessionToken.call(this, session, initData);
            session.addEventListener(api.error, sessionToken);
            session.addEventListener(api.message, sessionToken);
            session.addEventListener(api.ready, sessionToken);
            session.addEventListener(api.close, sessionToken);
            sessions.push(sessionToken);
            return sessionToken;
        },
        updateKeySession: function(sessionToken, message) {
            var session = sessionToken.session;
            if (!this.protectionExt.isClearKey(this.keySystem)) {
                session.update(message);
            } else {
                session.update(message.toJWKString());
            }
        },
        closeKeySession: function(sessionToken) {
            var session = sessionToken.session;
            session.removeEventListener(api.error, sessionToken);
            session.removeEventListener(api.message, sessionToken);
            session.removeEventListener(api.ready, sessionToken);
            session.removeEventListener(api.close, sessionToken);
            for (var i = 0; i < sessions.length; i++) {
                if (sessions[i] === sessionToken) {
                    sessions.splice(i, 1);
                    break;
                }
            }
            session[api.release]();
        }
    };
};

MediaPlayer.models.ProtectionModel_3Feb2014.APIs = [ {
    setMediaKeys: "setMediaKeys",
    MediaKeys: "MediaKeys",
    release: "close",
    needkey: "needkey",
    error: "keyerror",
    message: "keymessage",
    ready: "keyadded",
    close: "keyclose"
}, {
    setMediaKeys: "msSetMediaKeys",
    MediaKeys: "MSMediaKeys",
    release: "close",
    needkey: "msneedkey",
    error: "mskeyerror",
    message: "mskeymessage",
    ready: "mskeyadded",
    close: "mskeyclose"
} ];

MediaPlayer.models.ProtectionModel_3Feb2014.detect = function(videoElement) {
    var apis = MediaPlayer.models.ProtectionModel_3Feb2014.APIs;
    for (var i = 0; i < apis.length; i++) {
        var api = apis[i];
        if (typeof videoElement[api.setMediaKeys] !== "function") {
            continue;
        }
        if (typeof window[api.MediaKeys] !== "function") {
            continue;
        }
        return api;
    }
    return null;
};

MediaPlayer.models.ProtectionModel_3Feb2014.prototype = {
    constructor: MediaPlayer.models.ProtectionModel_3Feb2014
};

MediaPlayer.models.URIQueryAndFragmentModel = function() {
    "use strict";
    var URIFragmentDataVO = new MediaPlayer.vo.URIFragmentData(), URIQueryData = [], parseURI = function(uri) {
        if (!uri) return null;
        var URIFragmentData = [], testQuery = new RegExp(/[?]/), testFragment = new RegExp(/[#]/), isQuery = testQuery.test(uri), isFragment = testFragment.test(uri), mappedArr;
        function reduceArray(previousValue, currentValue, index, array) {
            var arr = array[0].split(/[=]/);
            array.push({
                key: arr[0],
                value: arr[1]
            });
            array.shift();
            return array;
        }
        function mapArray(currentValue, index, array) {
            if (index > 0) {
                if (isQuery && URIQueryData.length === 0) {
                    URIQueryData = array[index].split(/[&]/);
                } else if (isFragment) {
                    URIFragmentData = array[index].split(/[&]/);
                }
            }
            return array;
        }
        mappedArr = uri.split(/[?#]/).map(mapArray);
        if (URIQueryData.length > 0) {
            URIQueryData = URIQueryData.reduce(reduceArray, null);
        }
        if (URIFragmentData.length > 0) {
            URIFragmentData = URIFragmentData.reduce(reduceArray, null);
            URIFragmentData.forEach(function(object) {
                URIFragmentDataVO[object.key] = object.value;
            });
        }
        return uri;
    };
    return {
        parseURI: parseURI,
        getURIFragmentData: function() {
            return URIFragmentDataVO;
        },
        getURIQueryData: function() {
            return URIQueryData;
        },
        reset: function() {
            URIFragmentDataVO = new MediaPlayer.vo.URIFragmentData();
            URIQueryData = [];
        }
    };
};

MediaPlayer.models.URIQueryAndFragmentModel.prototype = {
    constructor: MediaPlayer.models.URIQueryAndFragmentModel
};

MediaPlayer.models.VideoModel = function() {
    "use strict";
    var element, stalledStreams = [], isStalled = function() {
        return stalledStreams.length > 0;
    }, addStalledStream = function(type) {
        if (type === null) {
            return;
        }
        element.playbackRate = 0;
        if (stalledStreams[type] === true) {
            return;
        }
        stalledStreams.push(type);
        stalledStreams[type] = true;
    }, removeStalledStream = function(type) {
        if (type === null) {
            return;
        }
        stalledStreams[type] = false;
        var index = stalledStreams.indexOf(type);
        if (index !== -1) {
            stalledStreams.splice(index, 1);
        }
        if (isStalled() === false) {
            element.playbackRate = 1;
        }
    }, stallStream = function(type, isStalled) {
        if (isStalled) {
            addStalledStream(type);
        } else {
            removeStalledStream(type);
        }
    }, onBufferLevelStateChanged = function(e) {
        var type = e.sender.streamProcessor.getType();
        stallStream.call(this, type, !e.data.hasSufficientBuffer);
    };
    return {
        system: undefined,
        setup: function() {
            this.bufferLevelStateChanged = onBufferLevelStateChanged;
        },
        play: function() {
            element.play();
        },
        pause: function() {
            element.pause();
        },
        isPaused: function() {
            return element.paused;
        },
        getPlaybackRate: function() {
            return element.playbackRate;
        },
        setPlaybackRate: function(value) {
            element.playbackRate = value;
        },
        getCurrentTime: function() {
            return element.currentTime;
        },
        setCurrentTime: function(currentTime) {
            if (element.currentTime == currentTime) return;
            element.currentTime = currentTime;
        },
        listen: function(type, callback) {
            element.addEventListener(type, callback, false);
        },
        unlisten: function(type, callback) {
            element.removeEventListener(type, callback, false);
        },
        getElement: function() {
            return element;
        },
        setElement: function(value) {
            element = value;
        },
        setSource: function(source) {
            element.src = source;
        }
    };
};

MediaPlayer.models.VideoModel.prototype = {
    constructor: MediaPlayer.models.VideoModel
};

MediaPlayer.dependencies.protection.CommonEncryption = {
    findCencContentProtection: function(cpArray) {
        var retVal = null;
        for (var i = 0; i < cpArray.length; ++i) {
            var cp = cpArray[i];
            if (cp.schemeIdUri.toLowerCase() === "urn:mpeg:dash:mp4protection:2011" && cp.value.toLowerCase() === "cenc") retVal = cp;
        }
        return retVal;
    },
    getPSSHData: function(pssh) {
        return new Uint8Array(pssh.buffer.slice(32));
    },
    parsePSSHList: function(data) {
        if (data === null) return [];
        var dv = new DataView(data.buffer), done = false;
        var pssh = {};
        var byteCursor = 0;
        while (!done) {
            var size, nextBox, version, systemID, psshDataSize, boxStart = byteCursor;
            if (byteCursor >= dv.buffer.byteLength) break;
            size = dv.getUint32(byteCursor);
            nextBox = byteCursor + size;
            byteCursor += 4;
            if (dv.getUint32(byteCursor) !== 1886614376) {
                byteCursor = nextBox;
                continue;
            }
            byteCursor += 4;
            version = dv.getUint8(byteCursor);
            if (version !== 0) {
                byteCursor = nextBox;
                continue;
            }
            byteCursor += 1;
            byteCursor += 3;
            systemID = "";
            var i, val;
            for (i = 0; i < 4; i++) {
                val = dv.getUint8(byteCursor + i).toString(16);
                systemID += val.length === 1 ? "0" + val : val;
            }
            byteCursor += 4;
            systemID += "-";
            for (i = 0; i < 2; i++) {
                val = dv.getUint8(byteCursor + i).toString(16);
                systemID += val.length === 1 ? "0" + val : val;
            }
            byteCursor += 2;
            systemID += "-";
            for (i = 0; i < 2; i++) {
                val = dv.getUint8(byteCursor + i).toString(16);
                systemID += val.length === 1 ? "0" + val : val;
            }
            byteCursor += 2;
            systemID += "-";
            for (i = 0; i < 2; i++) {
                val = dv.getUint8(byteCursor + i).toString(16);
                systemID += val.length === 1 ? "0" + val : val;
            }
            byteCursor += 2;
            systemID += "-";
            for (i = 0; i < 6; i++) {
                val = dv.getUint8(byteCursor + i).toString(16);
                systemID += val.length === 1 ? "0" + val : val;
            }
            byteCursor += 6;
            systemID = systemID.toLowerCase();
            psshDataSize = dv.getUint32(byteCursor);
            byteCursor += 4;
            pssh[systemID] = new Uint8Array(dv.buffer.slice(boxStart, nextBox));
            byteCursor = nextBox;
        }
        return pssh;
    }
};

MediaPlayer.dependencies.protection.KeySystem = {
    eventList: {
        ENAME_LICENSE_REQUEST_COMPLETE: "licenseRequestComplete"
    }
};

MediaPlayer.dependencies.protection.KeySystem_Access = function() {
    "use strict";
};

MediaPlayer.dependencies.protection.KeySystem_Access.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_Access
};

MediaPlayer.dependencies.protection.KeySystem_ClearKey = function() {
    "use strict";
    var keySystemStr = "webkit-org.w3.clearkey", keySystemUUID = "10000000-0000-0000-0000-000000000000", protData, requestClearKeyLicense = function(message, requestData) {
        var i;
        var psshData = MediaPlayer.dependencies.protection.CommonEncryption.getPSSHData(message), dv = new DataView(psshData.buffer), byteCursor = 0, ckType, keyPairs = [];
        ckType = dv.getUint8(byteCursor);
        byteCursor += 1;
        if (ckType === 0) {
            var url = "", urlB64 = "", urlLen = dv.getUint16(byteCursor);
            byteCursor += 2;
            for (i = 0; i < urlLen; i++) {
                urlB64 += String.fromCharCode(dv.getUint8(byteCursor + i));
            }
            url = atob(urlB64);
            url = url.replace(/&amp;/, "&");
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if (xhr.status == 200) {
                    if (!xhr.response.hasOwnProperty("keys")) {
                        this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new Error("DRM: ClearKey Remote update, Illegal response JSON"));
                    }
                    for (i = 0; i < xhr.reponse.keys.length; i++) {
                        var keypair = xhr.response.keys[i], keyid = atob(keypair.kid), key = atob(keypair.k);
                        keyPairs.push(new MediaPlayer.vo.protection.KeyPair(keyid, key));
                    }
                    var event = new MediaPlayer.vo.protection.LicenseRequestComplete(new MediaPlayer.vo.protection.ClearKeyKeySet(keyPairs), requestData);
                    this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, event);
                } else {
                    this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new Error('DRM: ClearKey Remote update, XHR aborted. status is "' + xhr.statusText + '" (' + xhr.status + "), readyState is " + xhr.readyState));
                }
            };
            xhr.onabort = function() {
                this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new Error('DRM: ClearKey update, XHR aborted. status is "' + xhr.statusText + '" (' + xhr.status + "), readyState is " + xhr.readyState));
            };
            xhr.onerror = function() {
                this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new Error('DRM: ClearKey update, XHR error. status is "' + xhr.statusText + '" (' + xhr.status + "), readyState is " + xhr.readyState));
            };
            xhr.open("GET", url);
            xhr.responseType = "json";
            xhr.send();
        } else if (ckType === 1) {
            var numKeys = dv.getUint8(byteCursor);
            byteCursor += 1;
            for (i = 0; i < numKeys; i++) {
                var keyid, key;
                keyid = new Uint8Array(psshData.buffer.slice(byteCursor, byteCursor + 16));
                byteCursor += 16;
                key = new Uint8Array(psshData.buffer.slice(byteCursor, byteCursor + 16));
                byteCursor += 16;
                keyPairs.push(new MediaPlayer.vo.protection.KeyPair(keyid, key));
            }
            var event = new MediaPlayer.vo.protection.LicenseRequestComplete(new MediaPlayer.vo.protection.ClearKeyKeySet(keyPairs), requestData);
            this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, event);
        } else {
            this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new Error("DRM: Illegal ClearKey type: " + ckType));
        }
    };
    return {
        schemeIdURI: undefined,
        systemString: keySystemStr,
        uuid: keySystemUUID,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        init: function(protectionData) {
            this.schemeIdURI = "urn:uuid:" + keySystemUUID;
            protData = protectionData;
        },
        doLicenseRequest: function(message, laURL, requestData) {
            requestClearKeyLicense.call(this, message, requestData);
        },
        getInitData: function() {
            return null;
        },
        initDataEquals: function(initData1, initData2) {
            if (initData1.length === initData2.length) {
                if (btoa(initData1.buffer) === btoa(initData2.buffer)) {
                    return true;
                }
            }
            return false;
        }
    };
};

MediaPlayer.dependencies.protection.KeySystem_ClearKey.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_ClearKey
};

MediaPlayer.dependencies.protection.KeySystem_PlayReady = function() {
    "use strict";
    var keySystemStr = "com.microsoft.playready", keySystemUUID = "9a04f079-9840-4286-ab92-e65be0885f95", protData, requestLicense = function(message, laURL, requestData) {
        var decodedChallenge = null, headers = {}, headerName, key, headerOverrides, parser = new DOMParser(), xmlDoc, msg, bytes, self = this;
        bytes = new Uint16Array(message.buffer);
        msg = String.fromCharCode.apply(null, bytes);
        xmlDoc = parser.parseFromString(msg, "application/xml");
        if (xmlDoc.getElementsByTagName("Challenge")[0]) {
            var Challenge = xmlDoc.getElementsByTagName("Challenge")[0].childNodes[0].nodeValue;
            if (Challenge) {
                decodedChallenge = BASE64.decode(Challenge);
            }
        } else {
            self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new MediaPlayer.vo.Error(null, "DRM: playready update, can not find Challenge in keyMessage", null));
        }
        var headerNameList = xmlDoc.getElementsByTagName("name");
        var headerValueList = xmlDoc.getElementsByTagName("value");
        if (headerNameList.length != headerValueList.length) {
            self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new MediaPlayer.vo.Error(null, "DRM: playready update, invalid header name/value pair in keyMessage", null));
        }
        for (var i = 0; i < headerNameList.length; i++) {
            headers[headerNameList[i].childNodes[0].nodeValue] = headerValueList[i].childNodes[0].nodeValue;
        }
        if (protData && protData.bearerToken) {
            headers.push({
                name: "Authorization",
                value: protData.bearerToken
            });
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status == 200) {
                var event = new MediaPlayer.vo.protection.LicenseRequestComplete(new Uint8Array(xhr.response), requestData);
                self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, event);
            } else {
                self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new MediaPlayer.vo.Error(null, 'DRM: playready update, XHR status is "' + xhr.statusText + '" (' + xhr.status + "), expected to be 200. readyState is " + xhr.readyState, null));
            }
        };
        xhr.onabort = function() {
            self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new MediaPlayer.vo.Error(null, 'DRM: playready update, XHR aborted. status is "' + xhr.statusText + '" (' + xhr.status + "), readyState is " + xhr.readyState, null));
        };
        xhr.onerror = function() {
            self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new MediaPlayer.vo.Error(null, 'DRM: playready update, XHR error. status is "' + xhr.statusText + '" (' + xhr.status + "), readyState is " + xhr.readyState, null));
        };
        xhr.open("POST", protData && protData.laURL && protData.laURL !== "" ? protData.laURL : laURL);
        xhr.responseType = "arraybuffer";
        headerOverrides = protData ? protData.httpRequestHeaders : null;
        if (headerOverrides) {
            for (key in headerOverrides) {
                headers[key] = headerOverrides[key];
            }
        }
        for (headerName in headers) {
            if ("authorization" === headerName.toLowerCase()) {
                xhr.withCredentials = true;
            }
            xhr.setRequestHeader(headerName, headers[headerName]);
        }
        xhr.send(decodedChallenge);
    }, parseInitDataFromContentProtection = function(cpData) {
        var byteCursor = 0, PROSize = 0, PSSHSize = 0, PSSHBoxType = new Uint8Array([ 112, 115, 115, 104, 0, 0, 0, 0 ]), playreadySystemID = new Uint8Array([ 154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149 ]), uint8arraydecodedPROHeader = null, PSSHBoxBuffer = null, PSSHBox = null, PSSHData = null;
        if ("pro" in cpData) {
            uint8arraydecodedPROHeader = BASE64.decodeArray(cpData.pro.__text);
        } else if ("prheader" in cpData) {
            uint8arraydecodedPROHeader = BASE64.decodeArray(cpData.prheader.__text);
        } else {
            return null;
        }
        PROSize = uint8arraydecodedPROHeader.length;
        PSSHSize = 4 + PSSHBoxType.length + playreadySystemID.length + 4 + PROSize;
        PSSHBoxBuffer = new ArrayBuffer(PSSHSize);
        PSSHBox = new Uint8Array(PSSHBoxBuffer);
        PSSHData = new DataView(PSSHBoxBuffer);
        PSSHData.setUint32(byteCursor, PSSHSize);
        byteCursor += 4;
        PSSHBox.set(PSSHBoxType, byteCursor);
        byteCursor += PSSHBoxType.length;
        PSSHBox.set(playreadySystemID, byteCursor);
        byteCursor += playreadySystemID.length;
        PSSHData.setUint32(byteCursor, PROSize);
        byteCursor += 4;
        PSSHBox.set(uint8arraydecodedPROHeader, byteCursor);
        byteCursor += PROSize;
        return PSSHBox;
    }, isInitDataEqual = function() {
        return false;
    };
    return {
        schemeIdURI: "urn:uuid:" + keySystemUUID,
        systemString: keySystemStr,
        uuid: keySystemUUID,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        init: function(protectionData) {
            protData = protectionData;
        },
        doLicenseRequest: requestLicense,
        getInitData: parseInitDataFromContentProtection,
        initDataEquals: isInitDataEqual
    };
};

MediaPlayer.dependencies.protection.KeySystem_PlayReady.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_PlayReady
};

MediaPlayer.dependencies.protection.KeySystem_Widevine = function() {
    "use strict";
    var keySystemStr = "com.widevine.alpha", keySystemUUID = "edef8ba9-79d6-4ace-a3c8-27dcd51d21ed", protData, requestLicense = function(message, laURL, requestData) {
        var xhr = new XMLHttpRequest(), headers = {}, key, headerOverrides, headerName, url, self = this;
        url = protData && protData.laURL && protData.laURL !== "" ? protData.laURL : laURL;
        if (!url) {
            self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new Error("DRM: No valid Widevine Proxy Server URL specified!"));
        } else {
            xhr.open("POST", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function() {
                if (this.status == 200) {
                    var event = new MediaPlayer.vo.protection.LicenseRequestComplete(new Uint8Array(this.response), requestData);
                    self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, event);
                } else {
                    self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new Error('DRM: widevine update, XHR status is "' + xhr.statusText + '" (' + xhr.status + "), expected to be 200. readyState is " + xhr.readyState) + ".  Response is " + (this.response ? String.fromCharCode.apply(null, new Uint8Array(this.response)) : "NONE"));
                }
            };
            xhr.onabort = function() {
                self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new Error('DRM: widevine update, XHR aborted. status is "' + xhr.statusText + '" (' + xhr.status + "), readyState is " + xhr.readyState));
            };
            xhr.onerror = function() {
                self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, null, new Error('DRM: widevine update, XHR error. status is "' + xhr.statusText + '" (' + xhr.status + "), readyState is " + xhr.readyState));
            };
            headerOverrides = protData ? protData.httpRequestHeaders : null;
            if (headerOverrides) {
                for (key in headerOverrides) {
                    headers[key] = headerOverrides[key];
                }
            }
            for (headerName in headers) {
                if ("authorization" === headerName.toLowerCase()) {
                    xhr.withCredentials = true;
                }
                xhr.setRequestHeader(headerName, headers[headerName]);
            }
            xhr.send(message);
        }
    }, parseInitDataFromContentProtection = function() {
        return null;
    }, isInitDataEqual = function() {
        return false;
    };
    return {
        schemeIdURI: "urn:uuid:" + keySystemUUID,
        systemString: keySystemStr,
        uuid: keySystemUUID,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        init: function(protectionData) {
            protData = protectionData;
        },
        doLicenseRequest: requestLicense,
        getInitData: parseInitDataFromContentProtection,
        initDataEquals: isInitDataEqual
    };
};

MediaPlayer.dependencies.protection.KeySystem_Widevine.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_Widevine
};

MediaPlayer.rules.ABRRulesCollection = function() {
    "use strict";
    var qualitySwitchRules = [];
    return {
        downloadRatioRule: undefined,
        insufficientBufferRule: undefined,
        limitSwitchesRule: undefined,
        bufferOccupancyRule: undefined,
        throughputRule: undefined,
        getRules: function(type) {
            switch (type) {
              case MediaPlayer.rules.ABRRulesCollection.prototype.QUALITY_SWITCH_RULES:
                return qualitySwitchRules;

              default:
                return null;
            }
        },
        setup: function() {
            qualitySwitchRules.push(this.insufficientBufferRule);
            qualitySwitchRules.push(this.throughputRule);
            qualitySwitchRules.push(this.bufferOccupancyRule);
            qualitySwitchRules.push(this.limitSwitchesRule);
        }
    };
};

MediaPlayer.rules.ABRRulesCollection.prototype = {
    constructor: MediaPlayer.rules.ABRRulesCollection,
    QUALITY_SWITCH_RULES: "qualitySwitchRules"
};

MediaPlayer.rules.BufferOccupancyRule = function() {
    "use strict";
    return {
        debug: undefined,
        metricsModel: undefined,
        execute: function(context, callback) {
            var self = this, mediaInfo = context.getMediaInfo(), mediaType = mediaInfo.type, metrics = this.metricsModel.getReadOnlyMetricsFor(mediaType), lastBufferLevelVO = metrics.BufferLevel.length > 0 ? metrics.BufferLevel[metrics.BufferLevel.length - 1] : null, lastBufferStateVO = metrics.BufferState.length > 0 ? metrics.BufferState[metrics.BufferState.length - 1] : null, isBufferRich = false, maxIndex = mediaInfo.trackCount - 1, switchRequest = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);
            if (lastBufferLevelVO !== null && lastBufferStateVO !== null) {
                if (lastBufferLevelVO.level > lastBufferStateVO.target) {
                    isBufferRich = lastBufferLevelVO.level - lastBufferStateVO.target > MediaPlayer.dependencies.BufferController.RICH_BUFFER_THRESHOLD;
                    if (isBufferRich && mediaInfo.trackCount > 1) {
                        switchRequest = new MediaPlayer.rules.SwitchRequest(maxIndex, MediaPlayer.rules.SwitchRequest.prototype.STRONG);
                    }
                }
            }
            if (switchRequest.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                self.debug.log("BufferOccupancyRule requesting switch to index: ", switchRequest.value, "type: ", mediaType, " Priority: ", switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "Default" : switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "Strong" : "Weak");
            }
            callback(switchRequest);
        }
    };
};

MediaPlayer.rules.BufferOccupancyRule.prototype = {
    constructor: MediaPlayer.rules.BufferOccupancyRule
};

MediaPlayer.rules.DownloadRatioRule = function() {
    "use strict";
    var stepDownFactor = 1, downloadRatioArray = [], TOTAL_DOWNLOAD_RATIO_ARRAY_LENGTH = 20, AVERAGE_DOWNLOAD_RATIO_SAMPLE_AMOUNT = 3, DOWNLOAD_RATIO_SAFETY_FACTOR = 1.4, getSwitchRatio = function(sp, newIdx, current) {
        return sp.getTrackForQuality(newIdx).bandwidth / sp.getTrackForQuality(current).bandwidth;
    }, getAverageDownloadRatio = function(sampleAmount) {
        var averageDownloadRatio = 0, len = downloadRatioArray.length;
        sampleAmount = len < sampleAmount ? len : sampleAmount;
        if (len > 0) {
            var startValue = len - sampleAmount, totalSampledValue = 0;
            for (var i = startValue; i < len; i++) {
                totalSampledValue += downloadRatioArray[i];
            }
            averageDownloadRatio = totalSampledValue / sampleAmount;
        }
        if (downloadRatioArray.length > TOTAL_DOWNLOAD_RATIO_ARRAY_LENGTH) {
            downloadRatioArray.shift();
        }
        return averageDownloadRatio;
    };
    return {
        debug: undefined,
        metricsExt: undefined,
        metricsModel: undefined,
        execute: function(context, callback) {
            var self = this, mediaInfo = context.getMediaInfo(), mediaType = mediaInfo.type, current = context.getCurrentValue(), sp = context.getStreamProcessor(), isDynamic = sp.isDynamic(), metrics = self.metricsModel.getReadOnlyMetricsFor(mediaType), lastRequest = self.metricsExt.getCurrentHttpRequest(metrics), currentBufferMetric = metrics.BufferLevel[metrics.BufferLevel.length - 1] || null, downloadTime, totalTime, averageDownloadRatio, downloadRatio, totalRatio, switchRatio, i, switchRequest = null;
            if (!metrics || lastRequest === null || lastRequest.mediaduration === null || lastRequest.mediaduration === undefined || lastRequest.mediaduration <= 0 || isNaN(lastRequest.mediaduration)) {
                callback(new MediaPlayer.rules.SwitchRequest());
                return;
            }
            totalTime = (lastRequest.tfinish.getTime() - lastRequest.trequest.getTime()) / 1e3;
            downloadTime = (lastRequest.tfinish.getTime() - lastRequest.tresponse.getTime()) / 1e3;
            if (totalTime <= 0) {
                callback(new MediaPlayer.rules.SwitchRequest());
                return;
            }
            totalRatio = lastRequest.mediaduration / totalTime;
            downloadRatio = lastRequest.mediaduration / downloadTime;
            if (downloadRatio !== Infinity) {
                downloadRatioArray.push(downloadRatio);
            }
            averageDownloadRatio = getAverageDownloadRatio(AVERAGE_DOWNLOAD_RATIO_SAMPLE_AMOUNT);
            if (isNaN(averageDownloadRatio) || isNaN(downloadRatio) || isNaN(totalRatio)) {
                callback(new MediaPlayer.rules.SwitchRequest());
                return;
            }
            if (averageDownloadRatio < 1) {
                if (current > 0) {
                    for (i = current - 1; i > 0; i--) {
                        switchRatio = getSwitchRatio.call(self, sp, i, current);
                        if (averageDownloadRatio > switchRatio * DOWNLOAD_RATIO_SAFETY_FACTOR) {
                            switchRequest = new MediaPlayer.rules.SwitchRequest(i, MediaPlayer.rules.SwitchRequest.prototype.STRONG);
                            break;
                        }
                    }
                }
            } else {
                if (currentBufferMetric !== null && currentBufferMetric.level >= currentBufferMetric.target || isDynamic && currentBufferMetric !== null && currentBufferMetric.level >= MediaPlayer.dependencies.BufferController.DEFAULT_STARTUP_BUFFER_TIME) {
                    var max = mediaInfo.trackCount - 1;
                    if (current < max) {
                        for (i = max; i > 0; i--) {
                            switchRatio = getSwitchRatio.call(self, sp, i, current);
                            if (averageDownloadRatio > switchRatio) {
                                if (current !== i) {
                                    switchRequest = new MediaPlayer.rules.SwitchRequest(i, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT);
                                }
                                break;
                            }
                        }
                    }
                }
            }
            if (switchRequest === null) {
                switchRequest = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT);
            }
            if (switchRequest.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                self.debug.log("DownloadRatioRule requesting switch to index: ", switchRequest.value, "type: ", mediaType, " priority: ", switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "default" : switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "strong" : "weak");
            }
            callback(switchRequest);
        },
        reset: function() {
            stepDownFactor = 1;
            downloadRatioArray = [];
        }
    };
};

MediaPlayer.rules.DownloadRatioRule.prototype = {
    constructor: MediaPlayer.rules.DownloadRatioRule
};

MediaPlayer.rules.InsufficientBufferRule = function() {
    "use strict";
    var bufferStateDict = {}, setBufferInfo = function(type, state) {
        bufferStateDict[type] = bufferStateDict[type] || {};
        bufferStateDict[type].state = state;
        if (state === MediaPlayer.dependencies.BufferController.BUFFER_LOADED) {
            bufferStateDict[type].stepDownFactor = 1;
            bufferStateDict[type].lastDryBufferHitRecorded = false;
        }
    };
    return {
        debug: undefined,
        metricsModel: undefined,
        execute: function(context, callback) {
            var self = this, mediaType = context.getMediaInfo().type, current = context.getCurrentValue(), mediaInfo = context.getMediaInfo(), metrics = self.metricsModel.getReadOnlyMetricsFor(mediaType), playlist, streamInfo = context.getStreamInfo(), duration = streamInfo.duration, currentTime = context.getStreamProcessor().getPlaybackController().getTime(), trace, sp = context.getStreamProcessor(), isDynamic = sp.isDynamic(), switchRequest = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK), lastBufferLevelVO = metrics.BufferLevel.length > 0 ? metrics.BufferLevel[metrics.BufferLevel.length - 1] : null, lastBufferStateVO = metrics.BufferState.length > 0 ? metrics.BufferState[metrics.BufferState.length - 1] : null;
            if (mediaInfo.trackCount === 1 || metrics.PlayList === null || metrics.PlayList === undefined || metrics.PlayList.length === 0 || lastBufferStateVO === null) {
                callback(switchRequest);
                return;
            }
            playlist = metrics.PlayList[metrics.PlayList.length - 1];
            if (playlist === null || playlist === undefined || playlist.trace.length === 0) {
                callback(switchRequest);
                return;
            }
            trace = playlist.trace[Math.max(playlist.trace.length - 2, 0)];
            if (trace === null || trace === undefined) {
                callback(switchRequest);
                return;
            }
            setBufferInfo(mediaType, lastBufferStateVO.state);
            if (trace.stopreason !== null && trace.stopreason === MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON && !bufferStateDict[mediaType].lastDryBufferHitRecorded) {
                bufferStateDict[mediaType].lastDryBufferHitRecorded = true;
                switchRequest = new MediaPlayer.rules.SwitchRequest(0, MediaPlayer.rules.SwitchRequest.prototype.STRONG);
            } else if (!isDynamic && bufferStateDict[mediaType].state === MediaPlayer.dependencies.BufferController.BUFFER_LOADED && trace.stopreason !== MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON && lastBufferLevelVO !== null && lastBufferLevelVO.level < MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD * 2 && lastBufferLevelVO.level > MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD && currentTime < duration - MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD * 2) {
                switchRequest = new MediaPlayer.rules.SwitchRequest(Math.max(current - bufferStateDict[mediaType].stepDownFactor, 0), MediaPlayer.rules.SwitchRequest.prototype.STRONG);
                bufferStateDict[mediaType].stepDownFactor++;
            }
            if (switchRequest.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                self.debug.log("InsufficientBufferRule requesting switch to index: ", switchRequest.value, "type: ", mediaType, " Priority: ", switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "Default" : switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "Strong" : "Weak");
            }
            callback(switchRequest);
        },
        reset: function() {
            bufferStateDict = {};
        }
    };
};

MediaPlayer.rules.InsufficientBufferRule.prototype = {
    constructor: MediaPlayer.rules.InsufficientBufferRule
};

MediaPlayer.rules.LimitSwitchesRule = function() {
    "use strict";
    var lastCheckTime = 0, qualitySwitchThreshold = 2e3;
    return {
        debug: undefined,
        metricsModel: undefined,
        execute: function(context, callback) {
            var current = context.getCurrentValue(), now = new Date().getTime(), delay;
            delay = now - lastCheckTime;
            if (delay < qualitySwitchThreshold) {
                callback(new MediaPlayer.rules.SwitchRequest(current, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT));
                return;
            }
            lastCheckTime = now;
            callback(new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK));
        }
    };
};

MediaPlayer.rules.LimitSwitchesRule.prototype = {
    constructor: MediaPlayer.rules.LimitSwitchesRule
};

MediaPlayer.rules.ThroughputRule = function() {
    "use strict";
    var throughputArray = [], AVERAGE_THROUGHPUT_SAMPLE_AMOUNT_LIVE = 2, AVERAGE_THROUGHPUT_SAMPLE_AMOUNT_VOD = 3, storeLastRequestThroughputByType = function(type, lastRequestThroughput) {
        throughputArray[type] = throughputArray[type] || [];
        if (lastRequestThroughput !== Infinity && lastRequestThroughput !== throughputArray[type][throughputArray[type].length - 1]) {
            throughputArray[type].push(lastRequestThroughput);
        }
    }, getAverageThroughput = function(type, isDynamic) {
        var averageThroughput = 0, sampleAmount = isDynamic ? AVERAGE_THROUGHPUT_SAMPLE_AMOUNT_LIVE : AVERAGE_THROUGHPUT_SAMPLE_AMOUNT_VOD, arr = throughputArray[type], len = arr.length;
        sampleAmount = len < sampleAmount ? len : sampleAmount;
        if (len > 0) {
            var startValue = len - sampleAmount, totalSampledValue = 0;
            for (var i = startValue; i < len; i++) {
                totalSampledValue += arr[i];
            }
            averageThroughput = totalSampledValue / sampleAmount;
        }
        if (arr.length > sampleAmount) {
            arr.shift();
        }
        return averageThroughput;
    };
    return {
        debug: undefined,
        metricsExt: undefined,
        metricsModel: undefined,
        manifestExt: undefined,
        manifestModel: undefined,
        execute: function(context, callback) {
            var self = this, mediaInfo = context.getMediaInfo(), mediaType = mediaInfo.type, manifest = this.manifestModel.getValue(), metrics = self.metricsModel.getReadOnlyMetricsFor(mediaType), isDynamic = context.getStreamProcessor().isDynamic(), lastRequest = self.metricsExt.getCurrentHttpRequest(metrics), downloadTime, averageThroughput, lastRequestThroughput, bufferStateVO = metrics.BufferState.length > 0 ? metrics.BufferState[metrics.BufferState.length - 1] : null, bufferLevelVO = metrics.BufferLevel.length > 0 ? metrics.BufferLevel[metrics.BufferLevel.length - 1] : null, switchRequest = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);
            if (!metrics || lastRequest === null || lastRequest.type !== MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE || bufferStateVO === null || bufferLevelVO === null) {
                callback(new MediaPlayer.rules.SwitchRequest());
                return;
            }
            downloadTime = (lastRequest.tfinish.getTime() - lastRequest.tresponse.getTime()) / 1e3;
            lastRequestThroughput = Math.round(lastRequest.trace[lastRequest.trace.length - 1].b * 8 / downloadTime);
            storeLastRequestThroughputByType(mediaType, lastRequestThroughput);
            averageThroughput = Math.round(getAverageThroughput(mediaType, isDynamic));
            var adaptation = this.manifestExt.getAdaptationForType(manifest, 0, mediaType);
            var max = mediaInfo.trackCount - 1;
            if (bufferStateVO.state === MediaPlayer.dependencies.BufferController.BUFFER_LOADED && (bufferLevelVO.level >= MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD * 2 || isDynamic)) {
                for (var i = max; i > 0; i--) {
                    var repBandwidth = this.manifestExt.getRepresentationFor(i, adaptation).bandwidth;
                    if (averageThroughput >= repBandwidth) {
                        var p = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT;
                        switchRequest = new MediaPlayer.rules.SwitchRequest(i, p);
                        break;
                    }
                }
            }
            if (switchRequest.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                self.debug.log("ThroughputRule requesting switch to index: ", switchRequest.value, "type: ", mediaType, " Priority: ", switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "Default" : switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "Strong" : "Weak", "Average throughput", Math.round(averageThroughput / 1024), "kbps");
            }
            callback(switchRequest);
        },
        reset: function() {
            throughputArray = [];
        }
    };
};

MediaPlayer.rules.ThroughputRule.prototype = {
    constructor: MediaPlayer.rules.ThroughputRule
};

MediaPlayer.rules.RulesContext = function(streamProcessor, currentValue) {
    "use strict";
    var trackInfo = streamProcessor.getCurrentTrack(), sp = streamProcessor;
    return {
        getStreamInfo: function() {
            return trackInfo.mediaInfo.streamInfo;
        },
        getMediaInfo: function() {
            return trackInfo.mediaInfo;
        },
        getTrackInfo: function() {
            return trackInfo;
        },
        getCurrentValue: function() {
            return currentValue;
        },
        getManifestInfo: function() {
            return trackInfo.mediaInfo.streamInfo.manifestInfo;
        },
        getStreamProcessor: function() {
            return sp;
        }
    };
};

MediaPlayer.rules.RulesContext.prototype = {
    constructor: MediaPlayer.rules.RulesContext
};

MediaPlayer.rules.RulesController = function() {
    "use strict";
    var rules = {}, ruleMandatoryProperties = [ "execute" ], isRuleTypeSupported = function(ruleType) {
        return ruleType === this.SCHEDULING_RULE || ruleType === this.ABR_RULE;
    }, isRule = function(obj) {
        var ln = ruleMandatoryProperties.length, i = 0;
        for (i; i < ln; i += 1) {
            if (!obj.hasOwnProperty(ruleMandatoryProperties[i])) return false;
        }
        return true;
    }, getRulesContext = function(streamProcessor, currentValue) {
        return new MediaPlayer.rules.RulesContext(streamProcessor, currentValue);
    }, normalizeRule = function(rule) {
        var exec = rule.execute.bind(rule);
        rule.execute = function(context, callback) {
            var normalizedCallback = function(result) {
                callback.call(rule, new MediaPlayer.rules.SwitchRequest(result.value, result.priority));
            };
            exec(context, normalizedCallback);
        };
        if (typeof rule.reset !== "function") {
            rule.reset = function() {};
        }
        return rule;
    }, updateRules = function(currentRulesCollection, newRulesCollection, override) {
        var rule, ruleSubType, subTypeRuleSet, ruleArr, ln, i;
        for (ruleSubType in newRulesCollection) {
            ruleArr = newRulesCollection[ruleSubType];
            ln = ruleArr.length;
            if (!ln) continue;
            for (i = 0; i < ln; i += 1) {
                rule = ruleArr[i];
                if (!isRule.call(this, rule)) continue;
                rule = normalizeRule.call(this, rule);
                subTypeRuleSet = currentRulesCollection.getRules(ruleSubType);
                if (override) {
                    override = false;
                    subTypeRuleSet.length = 0;
                }
                this.system.injectInto(rule);
                subTypeRuleSet.push(rule);
            }
        }
    };
    return {
        system: undefined,
        debug: undefined,
        SCHEDULING_RULE: 0,
        ABR_RULE: 1,
        SYNC_RULE: 2,
        initialize: function() {
            rules[this.ABR_RULE] = this.system.getObject("abrRulesCollection");
            rules[this.SCHEDULING_RULE] = this.system.getObject("scheduleRulesCollection");
            rules[this.SYNC_RULE] = this.system.getObject("synchronizationRulesCollection");
        },
        setRules: function(ruleType, rulesCollection) {
            if (!isRuleTypeSupported.call(this, ruleType) || !rulesCollection) return;
            updateRules.call(this, rules[ruleType], rulesCollection, true);
        },
        addRules: function(ruleType, rulesCollection) {
            if (!isRuleTypeSupported.call(this, ruleType) || !rulesCollection) return;
            updateRules.call(this, rules[ruleType], rulesCollection, false);
        },
        applyRules: function(rulesArr, streamProcessor, callback, current, overrideFunc) {
            var rulesCount = rulesArr.length, ln = rulesCount, values = {}, rulesContext = getRulesContext.call(this, streamProcessor, current), rule, i, callbackFunc = function(result) {
                var value, confidence;
                if (result.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                    values[result.priority] = overrideFunc(values[result.priority], result.value);
                }
                if (--rulesCount) return;
                if (values[MediaPlayer.rules.SwitchRequest.prototype.WEAK] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                    confidence = MediaPlayer.rules.SwitchRequest.prototype.WEAK;
                    value = values[MediaPlayer.rules.SwitchRequest.prototype.WEAK];
                }
                if (values[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                    confidence = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT;
                    value = values[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT];
                }
                if (values[MediaPlayer.rules.SwitchRequest.prototype.STRONG] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE) {
                    confidence = MediaPlayer.rules.SwitchRequest.prototype.STRONG;
                    value = values[MediaPlayer.rules.SwitchRequest.prototype.STRONG];
                }
                if (confidence != MediaPlayer.rules.SwitchRequest.prototype.STRONG && confidence != MediaPlayer.rules.SwitchRequest.prototype.WEAK) {
                    confidence = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT;
                }
                callback({
                    value: value !== undefined ? value : current,
                    confidence: confidence
                });
            };
            values[MediaPlayer.rules.SwitchRequest.prototype.STRONG] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE;
            values[MediaPlayer.rules.SwitchRequest.prototype.WEAK] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE;
            values[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE;
            for (i = 0; i < ln; i += 1) {
                rule = rulesArr[i];
                if (!isRule.call(this, rule)) {
                    rulesCount--;
                    continue;
                }
                rule.execute(rulesContext, callbackFunc);
            }
        },
        reset: function() {
            var abrRules = rules[this.ABR_RULE], schedulingRules = rules[this.SCHEDULING_RULE], synchronizationRules = rules[this.SYNC_RULE], allRules = (abrRules.getRules(MediaPlayer.rules.ABRRulesCollection.prototype.QUALITY_SWITCH_RULES) || []).concat(schedulingRules.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.NEXT_FRAGMENT_RULES) || []).concat(schedulingRules.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_SCHEDULE_RULES) || []).concat(schedulingRules.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_EXECUTE_RULES) || []).concat(synchronizationRules.getRules(MediaPlayer.rules.SynchronizationRulesCollection.prototype.TIME_SYNCHRONIZED_RULES) || []).concat(synchronizationRules.getRules(MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES) || []), ln = allRules.length, rule, i;
            for (i = 0; i < ln; i += 1) {
                rule = allRules[i];
                if (typeof rule.reset !== "function") continue;
                rule.reset();
            }
            rules = {};
        }
    };
};

MediaPlayer.rules.RulesController.prototype = {
    constructor: MediaPlayer.rules.RulesController
};

MediaPlayer.rules.BufferLevelRule = function() {
    "use strict";
    var isBufferLevelOutran = {}, isCompleted = {}, scheduleController = {}, getCurrentHttpRequestLatency = function(metrics) {
        var httpRequest = this.metricsExt.getCurrentHttpRequest(metrics);
        if (httpRequest !== null) {
            return (httpRequest.tresponse.getTime() - httpRequest.trequest.getTime()) / 1e3;
        }
        return 0;
    }, decideBufferLength = function(minBufferTime, duration) {
        var minBufferTarget;
        if (isNaN(duration) || MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME < duration && minBufferTime < duration) {
            minBufferTarget = Math.max(MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME, minBufferTime);
        } else if (minBufferTime >= duration) {
            minBufferTarget = Math.min(duration, MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME);
        } else {
            minBufferTarget = Math.min(duration, minBufferTime);
        }
        return minBufferTarget;
    }, getRequiredBufferLength = function(isDynamic, duration, scheduleController) {
        var self = this, criticalBufferLevel = scheduleController.bufferController.getCriticalBufferLevel(), vmetrics = self.metricsModel.getReadOnlyMetricsFor("video"), ametrics = self.metricsModel.getReadOnlyMetricsFor("audio"), minBufferTarget = decideBufferLength.call(this, scheduleController.bufferController.getMinBufferTime(), duration), currentBufferTarget = minBufferTarget, bufferMax = scheduleController.bufferController.bufferMax, requiredBufferLength = 0;
        if (bufferMax === MediaPlayer.dependencies.BufferController.BUFFER_SIZE_MIN) {
            requiredBufferLength = minBufferTarget;
        } else if (bufferMax === MediaPlayer.dependencies.BufferController.BUFFER_SIZE_INFINITY) {
            requiredBufferLength = duration;
        } else if (bufferMax === MediaPlayer.dependencies.BufferController.BUFFER_SIZE_REQUIRED) {
            if (!isDynamic && self.abrController.isPlayingAtTopQuality(scheduleController.streamProcessor.getStreamInfo())) {
                currentBufferTarget = MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY;
            }
            requiredBufferLength = currentBufferTarget + Math.max(getCurrentHttpRequestLatency.call(self, vmetrics), getCurrentHttpRequestLatency.call(self, ametrics));
        }
        requiredBufferLength = Math.min(requiredBufferLength, criticalBufferLevel);
        return requiredBufferLength;
    }, isCompletedT = function(streamId, type) {
        return isCompleted[streamId] && isCompleted[streamId][type];
    }, isBufferLevelOutranT = function(streamId, type) {
        return isBufferLevelOutran[streamId] && isBufferLevelOutran[streamId][type];
    }, onStreamCompleted = function(e) {
        var streamId = e.data.fragmentModel.getContext().streamProcessor.getStreamInfo().id;
        isCompleted[streamId] = isCompleted[streamId] || {};
        isCompleted[streamId][e.data.request.mediaType] = true;
    }, onBufferLevelOutrun = function(e) {
        var streamId = e.sender.streamProcessor.getStreamInfo().id;
        isBufferLevelOutran[streamId] = isBufferLevelOutran[streamId] || {};
        isBufferLevelOutran[streamId][e.sender.streamProcessor.getType()] = true;
    }, onBufferLevelBalanced = function(e) {
        var streamId = e.sender.streamProcessor.getStreamInfo().id;
        isBufferLevelOutran[streamId] = isBufferLevelOutran[streamId] || {};
        isBufferLevelOutran[streamId][e.sender.streamProcessor.getType()] = false;
    };
    return {
        metricsExt: undefined,
        metricsModel: undefined,
        abrController: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN] = onBufferLevelOutrun;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED] = onBufferLevelBalanced;
            this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED] = onStreamCompleted;
        },
        setScheduleController: function(scheduleControllerValue) {
            var id = scheduleControllerValue.streamProcessor.getStreamInfo().id;
            scheduleController[id] = scheduleController[id] || {};
            scheduleController[id][scheduleControllerValue.streamProcessor.getType()] = scheduleControllerValue;
        },
        execute: function(context, callback) {
            var streamInfo = context.getStreamInfo(), streamId = streamInfo.id, mediaType = context.getMediaInfo().type;
            if (isBufferLevelOutranT(streamId, mediaType)) {
                callback(new MediaPlayer.rules.SwitchRequest(0, MediaPlayer.rules.SwitchRequest.prototype.STRONG));
                return;
            }
            var metrics = this.metricsModel.getReadOnlyMetricsFor(mediaType), bufferLevel = this.metricsExt.getCurrentBufferLevel(metrics) ? this.metricsExt.getCurrentBufferLevel(metrics).level : 0, scheduleCtrl = scheduleController[streamId][mediaType], track = scheduleCtrl.streamProcessor.getCurrentTrack(), isDynamic = scheduleCtrl.streamProcessor.isDynamic(), rate = this.metricsExt.getCurrentPlaybackRate(metrics), duration = streamInfo.duration, bufferedDuration = bufferLevel / Math.max(rate, 1), fragmentDuration = track.fragmentDuration, currentTime = scheduleCtrl.playbackController.getTime(), timeToEnd = isDynamic ? Number.POSITIVE_INFINITY : duration - currentTime, requiredBufferLength = Math.min(getRequiredBufferLength.call(this, isDynamic, duration, scheduleCtrl), timeToEnd), remainingDuration = Math.max(requiredBufferLength - bufferedDuration, 0), fragmentCount;
            fragmentCount = Math.ceil(remainingDuration / fragmentDuration);
            if (bufferedDuration >= timeToEnd && !isCompletedT(streamId, mediaType)) {
                fragmentCount = fragmentCount || 1;
            }
            callback(new MediaPlayer.rules.SwitchRequest(fragmentCount, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT));
        },
        reset: function() {
            isBufferLevelOutran = {};
            isCompleted = {};
            scheduleController = {};
        }
    };
};

MediaPlayer.rules.BufferLevelRule.prototype = {
    constructor: MediaPlayer.rules.BufferLevelRule
};

MediaPlayer.rules.PendingRequestsRule = function() {
    "use strict";
    var LIMIT = 3, scheduleController = {};
    return {
        metricsExt: undefined,
        setScheduleController: function(scheduleControllerValue) {
            var streamId = scheduleControllerValue.streamProcessor.getStreamInfo().id;
            scheduleController[streamId] = scheduleController[streamId] || {};
            scheduleController[streamId][scheduleControllerValue.streamProcessor.getType()] = scheduleControllerValue;
        },
        execute: function(context, callback) {
            var mediaType = context.getMediaInfo().type, streamId = context.getStreamInfo().id, current = context.getCurrentValue(), sc = scheduleController[streamId][mediaType], model = sc.getFragmentModel(), pendingRequests = model.getPendingRequests(), loadingRequests = model.getLoadingRequests(), rejectedRequests = model.getRejectedRequests(), rLn = rejectedRequests.length, ln = pendingRequests.length + loadingRequests.length, count = Math.max(current - ln, 0);
            if (rLn > 0) {
                callback(new MediaPlayer.rules.SwitchRequest(rLn, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT));
                return;
            }
            if (ln > LIMIT) {
                callback(new MediaPlayer.rules.SwitchRequest(0, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT));
                return;
            }
            if (current === 0) {
                callback(new MediaPlayer.rules.SwitchRequest(count, MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE));
                return;
            }
            callback(new MediaPlayer.rules.SwitchRequest(count, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT));
        },
        reset: function() {
            scheduleController = {};
        }
    };
};

MediaPlayer.rules.PendingRequestsRule.prototype = {
    constructor: MediaPlayer.rules.PendingRequestsRule
};

MediaPlayer.rules.PlaybackTimeRule = function() {
    "use strict";
    var seekTarget = {}, scheduleController = {}, onPlaybackSeeking = function(e) {
        var streamId = e.sender.getStreamId(), time = e.data.seekTime;
        seekTarget[streamId] = seekTarget[streamId] || {};
        seekTarget[streamId].audio = time;
        seekTarget[streamId].video = time;
    };
    return {
        adapter: undefined,
        sourceBufferExt: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = onPlaybackSeeking;
        },
        setScheduleController: function(scheduleControllerValue) {
            var streamId = scheduleControllerValue.streamProcessor.getStreamInfo().id;
            scheduleController[streamId] = scheduleController[streamId] || {};
            scheduleController[streamId][scheduleControllerValue.streamProcessor.getType()] = scheduleControllerValue;
        },
        execute: function(context, callback) {
            var mediaType = context.getMediaInfo().type, streamId = context.getStreamInfo().id, sc = scheduleController[streamId][mediaType], EPSILON = .1, streamProcessor = scheduleController[streamId][mediaType].streamProcessor, track = streamProcessor.getCurrentTrack(), st = seekTarget[streamId] ? seekTarget[streamId][mediaType] : null, hasSeekTarget = st !== undefined && st !== null, p = hasSeekTarget ? MediaPlayer.rules.SwitchRequest.prototype.STRONG : MediaPlayer.rules.SwitchRequest.prototype.DEFAULT, rejected = sc.getFragmentModel().getRejectedRequests().shift(), keepIdx = !!rejected && !hasSeekTarget, currentTime = this.adapter.getIndexHandlerTime(streamProcessor), playbackTime = streamProcessor.playbackController.getTime(), rejectedEnd = rejected ? rejected.startTime + rejected.duration : null, useRejected = !hasSeekTarget && rejected && (rejectedEnd > playbackTime && rejected.startTime <= currentTime || isNaN(currentTime)), range, time, request;
            time = hasSeekTarget ? st : useRejected ? rejected.startTime : currentTime;
            if (isNaN(time)) {
                callback(new MediaPlayer.rules.SwitchRequest(null, p));
                return;
            }
            if (seekTarget[streamId]) {
                seekTarget[streamId][mediaType] = null;
            }
            range = this.sourceBufferExt.getBufferRange(streamProcessor.bufferController.getBuffer(), time);
            if (range !== null) {
                time = range.end;
            }
            request = this.adapter.getFragmentRequestForTime(streamProcessor, track, time, {
                keepIdx: keepIdx
            });
            if (useRejected && request && request.index !== rejected.index) {
                request = this.adapter.getFragmentRequestForTime(streamProcessor, track, rejected.startTime + rejected.duration / 2 + EPSILON, {
                    keepIdx: keepIdx
                });
            }
            while (request && streamProcessor.fragmentController.isFragmentLoadedOrPending(sc, request)) {
                if (request.action === "complete") {
                    request = null;
                    this.adapter.setIndexHandlerTime(streamProcessor, NaN);
                    break;
                }
                request = this.adapter.getNextFragmentRequest(streamProcessor, track);
            }
            if (request && !useRejected) {
                this.adapter.setIndexHandlerTime(streamProcessor, request.startTime + request.duration);
            }
            callback(new MediaPlayer.rules.SwitchRequest(request, p));
        },
        reset: function() {
            seekTarget = {};
            scheduleController = {};
        }
    };
};

MediaPlayer.rules.PlaybackTimeRule.prototype = {
    constructor: MediaPlayer.rules.PlaybackTimeRule
};

MediaPlayer.rules.SameTimeRequestRule = function() {
    "use strict";
    var LOADING_REQUEST_THRESHOLD = 4, findClosestToTime = function(fragmentModels, time) {
        var req, r, pendingReqs, i = 0, j, pln, ln = fragmentModels.length;
        for (i; i < ln; i += 1) {
            pendingReqs = fragmentModels[i].getPendingRequests();
            sortRequestsByProperty.call(this, pendingReqs, "index");
            for (j = 0, pln = pendingReqs.length; j < pln; j++) {
                req = pendingReqs[j];
                if (isNaN(req.startTime) && req.action !== "complete") {
                    r = req;
                    break;
                }
                if (req.startTime > time && (!r || req.startTime < r.startTime)) {
                    r = req;
                }
            }
        }
        return r || req;
    }, getForTime = function(fragmentModels, currentTime) {
        var ln = fragmentModels.length, req, r = null, i;
        for (i = 0; i < ln; i += 1) {
            req = fragmentModels[i].getPendingRequestForTime(currentTime);
            if (req && (!r || req.startTime > r.startTime)) {
                r = req;
            }
        }
        return r;
    }, sortRequestsByProperty = function(requestsArray, sortProp) {
        var compare = function(req1, req2) {
            if (req1[sortProp] < req2[sortProp] || isNaN(req1[sortProp]) && req1.action !== "complete") return -1;
            if (req1[sortProp] > req2[sortProp]) return 1;
            return 0;
        };
        requestsArray.sort(compare);
    };
    return {
        setFragmentModels: function(fragmentModels, streamid) {
            this.fragmentModels = this.fragmentModels || {};
            this.fragmentModels[streamid] = fragmentModels;
        },
        execute: function(context, callback) {
            var streamId = context.getStreamInfo().id, current = context.getCurrentValue(), p = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT, fragmentModels = this.fragmentModels[streamId], type, model, sameTimeReq, mIdx, req, currentTime, wallclockTime = new Date(), time = null, reqForCurrentTime, mLength = fragmentModels ? fragmentModels.length : null, shouldWait = false, reqsToExecute = [], pendingReqs, loadingLength;
            if (!fragmentModels || !mLength) {
                callback(new MediaPlayer.rules.SwitchRequest([], p));
                return;
            }
            currentTime = fragmentModels[0].getContext().playbackController.getTime();
            reqForCurrentTime = getForTime(fragmentModels, currentTime);
            req = reqForCurrentTime || findClosestToTime(fragmentModels, currentTime) || current;
            if (!req) {
                callback(new MediaPlayer.rules.SwitchRequest([], p));
                return;
            }
            for (mIdx = 0; mIdx < mLength; mIdx += 1) {
                model = fragmentModels[mIdx];
                type = model.getContext().streamProcessor.getType();
                if (type !== "video" && type !== "audio") continue;
                pendingReqs = model.getPendingRequests();
                loadingLength = model.getLoadingRequests().length;
                if (model.getIsPostponed() && !isNaN(req.startTime)) continue;
                if (loadingLength > LOADING_REQUEST_THRESHOLD) {
                    callback(new MediaPlayer.rules.SwitchRequest([], p));
                    return;
                }
                time = time || (req === reqForCurrentTime ? currentTime : req.startTime);
                if (pendingReqs.indexOf(req) !== -1) {
                    reqsToExecute.push(req);
                    continue;
                }
                sameTimeReq = model.getPendingRequestForTime(time);
                if (!sameTimeReq && req.index === 0) {
                    sameTimeReq = pendingReqs.filter(function(r) {
                        return r.index === req.index;
                    })[0];
                }
                if (sameTimeReq) {
                    reqsToExecute.push(sameTimeReq);
                    continue;
                }
                sameTimeReq = model.getLoadingRequestForTime(time) || model.getExecutedRequestForTime(time);
                if (!sameTimeReq) {
                    shouldWait = true;
                    break;
                }
            }
            reqsToExecute = reqsToExecute.filter(function(req) {
                return req.action === "complete" || wallclockTime.getTime() >= req.availabilityStartTime.getTime();
            });
            if (shouldWait) {
                callback(new MediaPlayer.rules.SwitchRequest([], p));
                return;
            }
            callback(new MediaPlayer.rules.SwitchRequest(reqsToExecute, p));
        }
    };
};

MediaPlayer.rules.SameTimeRequestRule.prototype = {
    constructor: MediaPlayer.rules.SameTimeRequestRule
};

MediaPlayer.rules.ScheduleRulesCollection = function() {
    "use strict";
    var fragmentsToScheduleRules = [], fragmentsToExecuteRules = [], nextFragmentRules = [];
    return {
        bufferLevelRule: undefined,
        pendingRequestsRule: undefined,
        playbackTimeRule: undefined,
        sameTimeRequestRule: undefined,
        getRules: function(type) {
            switch (type) {
              case MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_SCHEDULE_RULES:
                return fragmentsToScheduleRules;

              case MediaPlayer.rules.ScheduleRulesCollection.prototype.NEXT_FRAGMENT_RULES:
                return nextFragmentRules;

              case MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_EXECUTE_RULES:
                return fragmentsToExecuteRules;

              default:
                return null;
            }
        },
        setup: function() {
            fragmentsToScheduleRules.push(this.bufferLevelRule);
            fragmentsToScheduleRules.push(this.pendingRequestsRule);
            nextFragmentRules.push(this.playbackTimeRule);
            fragmentsToExecuteRules.push(this.sameTimeRequestRule);
        }
    };
};

MediaPlayer.rules.ScheduleRulesCollection.prototype = {
    constructor: MediaPlayer.rules.ScheduleRulesCollection,
    FRAGMENTS_TO_SCHEDULE_RULES: "fragmentsToScheduleRules",
    NEXT_FRAGMENT_RULES: "nextFragmentRules",
    FRAGMENTS_TO_EXECUTE_RULES: "fragmentsToExecuteRules"
};

MediaPlayer.rules.SwitchRequest = function(v, p) {
    "use strict";
    this.value = v;
    this.priority = p;
    if (this.value === undefined) {
        this.value = 999;
    }
    if (this.priority === undefined) {
        this.priority = .5;
    }
};

MediaPlayer.rules.SwitchRequest.prototype = {
    constructor: MediaPlayer.rules.SwitchRequest,
    NO_CHANGE: 999,
    DEFAULT: .5,
    STRONG: 1,
    WEAK: 0
};

MediaPlayer.rules.LiveEdgeBinarySearchRule = function() {
    "use strict";
    var SEARCH_TIME_SPAN = 12 * 60 * 60, liveEdgeInitialSearchPosition = NaN, liveEdgeSearchRange = null, liveEdgeSearchStep = NaN, trackInfo = null, useBinarySearch = false, fragmentDuration = NaN, p = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT, callback, fragmentLoader, streamProcessor, findLiveEdge = function(searchTime, onSuccess, onError, request) {
        var self = this, req;
        if (request === null) {
            req = self.adapter.generateFragmentRequestForTime(streamProcessor, trackInfo, searchTime);
            findLiveEdge.call(self, searchTime, onSuccess, onError, req);
        } else {
            var handler = function(e) {
                fragmentLoader.unsubscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED, self, handler);
                if (e.data.exists) {
                    onSuccess.call(self, e.data.request, searchTime);
                } else {
                    onError.call(self, e.data.request, searchTime);
                }
            };
            fragmentLoader.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED, self, handler);
            fragmentLoader.checkForExistence(request);
        }
    }, onSearchForFragmentFailed = function(request, lastSearchTime) {
        var searchTime, req, searchInterval;
        if (useBinarySearch) {
            binarySearch.call(this, false, lastSearchTime);
            return;
        }
        searchInterval = lastSearchTime - liveEdgeInitialSearchPosition;
        searchTime = searchInterval > 0 ? liveEdgeInitialSearchPosition - searchInterval : liveEdgeInitialSearchPosition + Math.abs(searchInterval) + liveEdgeSearchStep;
        if (searchTime < liveEdgeSearchRange.start && searchTime > liveEdgeSearchRange.end) {
            callback(new MediaPlayer.rules.SwitchRequest(null, p));
        } else {
            req = this.adapter.getFragmentRequestForTime(streamProcessor, trackInfo, searchTime);
            findLiveEdge.call(this, searchTime, onSearchForFragmentSucceeded, onSearchForFragmentFailed, req);
        }
    }, onSearchForFragmentSucceeded = function(request, lastSearchTime) {
        var startTime = request.startTime, self = this, req, searchTime;
        if (!useBinarySearch) {
            if (!trackInfo.fragmentDuration) {
                callback(new MediaPlayer.rules.SwitchRequest(startTime, p));
                return;
            }
            useBinarySearch = true;
            liveEdgeSearchRange.end = startTime + 2 * liveEdgeSearchStep;
            if (lastSearchTime === liveEdgeInitialSearchPosition) {
                searchTime = lastSearchTime + fragmentDuration;
                req = self.adapter.getFragmentRequestForTime(streamProcessor, trackInfo, searchTime);
                findLiveEdge.call(self, searchTime, function() {
                    binarySearch.call(self, true, searchTime);
                }, function() {
                    callback(new MediaPlayer.rules.SwitchRequest(searchTime, p));
                }, req);
                return;
            }
        }
        binarySearch.call(this, true, lastSearchTime);
    }, binarySearch = function(lastSearchSucceeded, lastSearchTime) {
        var isSearchCompleted, req, searchTime;
        if (lastSearchSucceeded) {
            liveEdgeSearchRange.start = lastSearchTime;
        } else {
            liveEdgeSearchRange.end = lastSearchTime;
        }
        isSearchCompleted = Math.floor(liveEdgeSearchRange.end - liveEdgeSearchRange.start) <= fragmentDuration;
        if (isSearchCompleted) {
            callback(new MediaPlayer.rules.SwitchRequest(lastSearchSucceeded ? lastSearchTime : lastSearchTime - fragmentDuration, p));
        } else {
            searchTime = (liveEdgeSearchRange.start + liveEdgeSearchRange.end) / 2;
            req = this.adapter.getFragmentRequestForTime(streamProcessor, trackInfo, searchTime);
            findLiveEdge.call(this, searchTime, onSearchForFragmentSucceeded, onSearchForFragmentFailed, req);
        }
    };
    return {
        metricsExt: undefined,
        adapter: undefined,
        timelineConverter: undefined,
        execute: function(context, callbackFunc) {
            var self = this, request, DVRWindow;
            callback = callbackFunc;
            streamProcessor = context.getStreamProcessor();
            fragmentLoader = streamProcessor.getFragmentLoader();
            trackInfo = context.getTrackInfo();
            fragmentDuration = trackInfo.fragmentDuration;
            DVRWindow = trackInfo.DVRWindow;
            liveEdgeInitialSearchPosition = DVRWindow.end;
            if (trackInfo.useCalculatedLiveEdgeTime) {
                var actualLiveEdge = self.timelineConverter.getExpectedLiveEdge();
                self.timelineConverter.setExpectedLiveEdge(liveEdgeInitialSearchPosition);
                callback(new MediaPlayer.rules.SwitchRequest(actualLiveEdge, p));
                return;
            }
            liveEdgeSearchRange = {
                start: Math.max(0, liveEdgeInitialSearchPosition - SEARCH_TIME_SPAN),
                end: liveEdgeInitialSearchPosition + SEARCH_TIME_SPAN
            };
            liveEdgeSearchStep = Math.floor((DVRWindow.end - DVRWindow.start) / 2);
            request = self.adapter.getFragmentRequestForTime(streamProcessor, trackInfo, liveEdgeInitialSearchPosition);
            findLiveEdge.call(self, liveEdgeInitialSearchPosition, onSearchForFragmentSucceeded, onSearchForFragmentFailed, request);
        },
        reset: function() {
            liveEdgeInitialSearchPosition = NaN;
            liveEdgeSearchRange = null;
            liveEdgeSearchStep = NaN;
            trackInfo = null;
            useBinarySearch = false;
            fragmentDuration = NaN;
            streamProcessor = null;
            fragmentLoader = null;
        }
    };
};

MediaPlayer.rules.LiveEdgeBinarySearchRule.prototype = {
    constructor: MediaPlayer.rules.LiveEdgeBinarySearchRule
};

MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule = function() {
    "use strict";
    return {
        execute: function(context, callback) {
            callback(new MediaPlayer.rules.SwitchRequest(context.getTrackInfo().DVRWindow.end, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT));
        }
    };
};

MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule.prototype = {
    constructor: MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule
};

MediaPlayer.rules.SynchronizationRulesCollection = function() {
    "use strict";
    var withAccurateTimeSourceRules = [], bestGuestRules = [];
    return {
        liveEdgeBinarySearchRule: undefined,
        liveEdgeWithTimeSynchronizationRule: undefined,
        getRules: function(type) {
            switch (type) {
              case MediaPlayer.rules.SynchronizationRulesCollection.prototype.TIME_SYNCHRONIZED_RULES:
                return withAccurateTimeSourceRules;

              case MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES:
                return bestGuestRules;

              default:
                return null;
            }
        },
        setup: function() {
            withAccurateTimeSourceRules.push(this.liveEdgeWithTimeSynchronizationRule);
            bestGuestRules.push(this.liveEdgeBinarySearchRule);
        }
    };
};

MediaPlayer.rules.SynchronizationRulesCollection.prototype = {
    constructor: MediaPlayer.rules.SynchronizationRulesCollection,
    TIME_SYNCHRONIZED_RULES: "withAccurateTimeSourceRules",
    BEST_GUESS_RULES: "bestGuestRules"
};

MediaPlayer.utils.Capabilities = function() {
    "use strict";
};

MediaPlayer.utils.Capabilities.prototype = {
    constructor: MediaPlayer.utils.Capabilities,
    system: undefined,
    debug: undefined,
    supportsMediaSource: function() {
        "use strict";
        var hasWebKit = "WebKitMediaSource" in window, hasMediaSource = "MediaSource" in window;
        return hasWebKit || hasMediaSource;
    },
    supportsEncryptedMedia: function() {
        return this.system.hasMapping("protectionModel");
    },
    supportsCodec: function(element, codec) {
        "use strict";
        if (!(element instanceof HTMLMediaElement)) {
            throw "element must be of type HTMLMediaElement.";
        }
        var canPlay = element.canPlayType(codec);
        return canPlay === "probably" || canPlay === "maybe";
    }
};

MediaPlayer.utils.Debug = function() {
    "use strict";
    var logToBrowserConsole = true, showLogTimestamp = false, startTime = new Date().getTime();
    return {
        eventBus: undefined,
        setLogTimestampVisible: function(value) {
            showLogTimestamp = value;
        },
        setLogToBrowserConsole: function(value) {
            logToBrowserConsole = value;
        },
        getLogToBrowserConsole: function() {
            return logToBrowserConsole;
        },
        log: function() {
            var logTime = null, logTimestamp = null;
            if (showLogTimestamp) {
                logTime = new Date().getTime();
                logTimestamp = "[" + (logTime - startTime) + "] ";
            }
            var message = arguments[0];
            if (arguments.length > 1) {
                message = "";
                Array.apply(null, arguments).forEach(function(item) {
                    message += " " + item;
                });
            }
            if (logToBrowserConsole) {
                console.log((showLogTimestamp ? logTimestamp : "") + message);
            }
            this.eventBus.dispatchEvent({
                type: "log",
                message: message
            });
        }
    };
};

MediaPlayer.utils.EventBus = function() {
    "use strict";
    var registrations, getListeners = function(type, useCapture) {
        var captype = (useCapture ? "1" : "0") + type;
        if (!(captype in registrations)) {
            registrations[captype] = [];
        }
        return registrations[captype];
    }, init = function() {
        registrations = {};
    };
    init();
    return {
        addEventListener: function(type, listener, useCapture) {
            var listeners = getListeners(type, useCapture);
            var idx = listeners.indexOf(listener);
            if (idx === -1) {
                listeners.push(listener);
            }
        },
        removeEventListener: function(type, listener, useCapture) {
            var listeners = getListeners(type, useCapture);
            var idx = listeners.indexOf(listener);
            if (idx !== -1) {
                listeners.splice(idx, 1);
            }
        },
        dispatchEvent: function(evt) {
            var listeners = getListeners(evt.type, false).slice();
            for (var i = 0; i < listeners.length; i++) {
                listeners[i].call(this, evt);
            }
            return !evt.defaultPrevented;
        }
    };
};

MediaPlayer.vo.Error = function(code, message, data) {
    "use strict";
    this.code = code || null;
    this.message = message || null;
    this.data = data || null;
};

MediaPlayer.vo.Error.prototype = {
    constructor: MediaPlayer.vo.Error
};

MediaPlayer.vo.Event = function() {
    "use strict";
    this.type = null;
    this.sender = null;
    this.data = null;
    this.error = null;
    this.timestamp = NaN;
};

MediaPlayer.vo.Event.prototype = {
    constructor: MediaPlayer.vo.Event
};

MediaPlayer.vo.FragmentRequest = function() {
    "use strict";
    this.action = "download";
    this.startTime = NaN;
    this.mediaType = null;
    this.type = null;
    this.duration = NaN;
    this.timescale = NaN;
    this.range = null;
    this.url = null;
    this.requestStartDate = null;
    this.firstByteDate = null;
    this.requestEndDate = null;
    this.quality = NaN;
    this.index = NaN;
    this.availabilityStartTime = null;
    this.availabilityEndTime = null;
    this.wallStartTime = null;
};

MediaPlayer.vo.FragmentRequest.prototype = {
    constructor: MediaPlayer.vo.FragmentRequest,
    ACTION_DOWNLOAD: "download",
    ACTION_COMPLETE: "complete"
};

MediaPlayer.vo.ManifestInfo = function() {
    "use strict";
    this.DVRWindowSize = NaN;
    this.loadedTime = null;
    this.availableFrom = null;
    this.minBufferTime = NaN;
    this.duration = NaN;
    this.isDynamic = false;
    this.maxFragmentDuration = null;
};

MediaPlayer.vo.ManifestInfo.prototype = {
    constructor: MediaPlayer.vo.ManifestInfo
};

MediaPlayer.vo.MediaInfo = function() {
    "use strict";
    this.id = null;
    this.index = null;
    this.type = null;
    this.streamInfo = null;
    this.trackCount = 0;
    this.lang = null;
    this.codec = null;
    this.mimeType = null;
    this.contentProtection = null;
    this.isText = false;
    this.KID = null;
};

MediaPlayer.vo.MediaInfo.prototype = {
    constructor: MediaPlayer.vo.MediaInfo
};

MediaPlayer.models.MetricsList = function() {
    "use strict";
    return {
        TcpList: [],
        HttpList: [],
        RepSwitchList: [],
        BufferLevel: [],
        BufferState: [],
        PlayList: [],
        DroppedFrames: [],
        SchedulingInfo: [],
        DVRInfo: [],
        ManifestUpdate: []
    };
};

MediaPlayer.models.MetricsList.prototype = {
    constructor: MediaPlayer.models.MetricsList
};

MediaPlayer.vo.StreamInfo = function() {
    "use strict";
    this.id = null;
    this.index = null;
    this.start = NaN;
    this.duration = NaN;
    this.manifestInfo = null;
    this.isLast = true;
};

MediaPlayer.vo.StreamInfo.prototype = {
    constructor: MediaPlayer.vo.StreamInfo
};

MediaPlayer.vo.TrackInfo = function() {
    "use strict";
    this.id = null;
    this.quality = null;
    this.DVRWindow = null;
    this.fragmentDuration = null;
    this.mediaInfo = null;
    this.MSETimeOffset = null;
};

MediaPlayer.vo.TrackInfo.prototype = {
    constructor: MediaPlayer.vo.TrackInfo
};

MediaPlayer.vo.URIFragmentData = function() {
    "use strict";
    this.t = null;
    this.xywh = null;
    this.track = null;
    this.id = null;
    this.s = null;
};

MediaPlayer.vo.URIFragmentData.prototype = {
    constructor: MediaPlayer.vo.URIFragmentData
};

MediaPlayer.vo.metrics.BufferLevel = function() {
    "use strict";
    this.t = null;
    this.level = null;
};

MediaPlayer.vo.metrics.BufferLevel.prototype = {
    constructor: MediaPlayer.vo.metrics.BufferLevel
};

MediaPlayer.vo.metrics.BufferState = function() {
    "use strict";
    this.target = null;
    this.state = MediaPlayer.dependencies.BufferController.BUFFER_EMPTY;
};

MediaPlayer.vo.metrics.BufferState.prototype = {
    constructor: MediaPlayer.vo.metrics.BufferState
};

MediaPlayer.vo.metrics.DVRInfo = function() {
    "use strict";
    this.time = null;
    this.range = null;
    this.manifestInfo = null;
};

MediaPlayer.vo.metrics.DVRInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.DVRInfo
};

MediaPlayer.vo.metrics.DroppedFrames = function() {
    "use strict";
    this.time = null;
    this.droppedFrames = null;
};

MediaPlayer.vo.metrics.DroppedFrames.prototype = {
    constructor: MediaPlayer.vo.metrics.DroppedFrames
};

MediaPlayer.vo.metrics.HTTPRequest = function() {
    "use strict";
    this.stream = null;
    this.tcpid = null;
    this.type = null;
    this.url = null;
    this.actualurl = null;
    this.range = null;
    this.trequest = null;
    this.tresponse = null;
    this.tfinish = null;
    this.responsecode = null;
    this.interval = null;
    this.mediaduration = null;
    this.responseHeaders = null;
    this.trace = [];
};

MediaPlayer.vo.metrics.HTTPRequest.prototype = {
    constructor: MediaPlayer.vo.metrics.HTTPRequest
};

MediaPlayer.vo.metrics.HTTPRequest.Trace = function() {
    "use strict";
    this.s = null;
    this.d = null;
    this.b = [];
};

MediaPlayer.vo.metrics.HTTPRequest.Trace.prototype = {
    constructor: MediaPlayer.vo.metrics.HTTPRequest.Trace
};

MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE = "Media Segment";

MediaPlayer.vo.metrics.HTTPRequest.MPD_TYPE = "MPD";

MediaPlayer.vo.metrics.ManifestUpdate = function() {
    "use strict";
    this.mediaType = null;
    this.type = null;
    this.requestTime = null;
    this.fetchTime = null;
    this.availabilityStartTime = null;
    this.presentationStartTime = 0;
    this.clientTimeOffset = 0;
    this.currentTime = null;
    this.buffered = null;
    this.latency = 0;
    this.streamInfo = [];
    this.trackInfo = [];
};

MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo = function() {
    "use strict";
    this.id = null;
    this.index = null;
    this.start = null;
    this.duration = null;
};

MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo = function() {
    "use strict";
    this.id = null;
    this.index = null;
    this.mediaType = null;
    this.streamIndex = null;
    this.presentationTimeOffset = null;
    this.startNumber = null;
    this.fragmentInfoType = null;
};

MediaPlayer.vo.metrics.ManifestUpdate.prototype = {
    constructor: MediaPlayer.vo.metrics.ManifestUpdate
};

MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo
};

MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo
};

MediaPlayer.vo.metrics.PlayList = function() {
    "use strict";
    this.stream = null;
    this.start = null;
    this.mstart = null;
    this.starttype = null;
    this.trace = [];
};

MediaPlayer.vo.metrics.PlayList.Trace = function() {
    "use strict";
    this.representationid = null;
    this.subreplevel = null;
    this.start = null;
    this.mstart = null;
    this.duration = null;
    this.playbackspeed = null;
    this.stopreason = null;
};

MediaPlayer.vo.metrics.PlayList.prototype = {
    constructor: MediaPlayer.vo.metrics.PlayList
};

MediaPlayer.vo.metrics.PlayList.INITIAL_PLAY_START_REASON = "initial_start";

MediaPlayer.vo.metrics.PlayList.SEEK_START_REASON = "seek";

MediaPlayer.vo.metrics.PlayList.Trace.prototype = {
    constructor: MediaPlayer.vo.metrics.PlayList.Trace()
};

MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON = "user_request";

MediaPlayer.vo.metrics.PlayList.Trace.REPRESENTATION_SWITCH_STOP_REASON = "representation_switch";

MediaPlayer.vo.metrics.PlayList.Trace.END_OF_CONTENT_STOP_REASON = "end_of_content";

MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON = "rebuffering";

MediaPlayer.vo.metrics.TrackSwitch = function() {
    "use strict";
    this.t = null;
    this.mt = null;
    this.to = null;
    this.lto = null;
};

MediaPlayer.vo.metrics.TrackSwitch.prototype = {
    constructor: MediaPlayer.vo.metrics.TrackSwitch
};

MediaPlayer.vo.metrics.SchedulingInfo = function() {
    "use strict";
    this.mediaType = null;
    this.t = null;
    this.type = null;
    this.startTime = null;
    this.availabilityStartTime = null;
    this.duration = null;
    this.quality = null;
    this.range = null;
    this.state = null;
};

MediaPlayer.vo.metrics.SchedulingInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.SchedulingInfo
};

MediaPlayer.vo.metrics.SchedulingInfo.PENDING_STATE = "pending";

MediaPlayer.vo.metrics.SchedulingInfo.LOADING_STATE = "loading";

MediaPlayer.vo.metrics.SchedulingInfo.EXECUTED_STATE = "executed";

MediaPlayer.vo.metrics.SchedulingInfo.REJECTED_STATE = "rejected";

MediaPlayer.vo.metrics.SchedulingInfo.CANCELED_STATE = "canceled";

MediaPlayer.vo.metrics.SchedulingInfo.FAILED_STATE = "failed";

MediaPlayer.vo.metrics.TCPConnection = function() {
    "use strict";
    this.tcpid = null;
    this.dest = null;
    this.topen = null;
    this.tclose = null;
    this.tconnect = null;
};

MediaPlayer.vo.metrics.TCPConnection.prototype = {
    constructor: MediaPlayer.vo.metrics.TCPConnection
};

MediaPlayer.vo.protection.ClearKeyKeySet = function(keyPairs, type) {
    if (type && type !== "persistent" && type !== "temporary") throw new Error("Invalid ClearKey key set type!  Must be one of 'persistent' or 'temporary'");
    this.keyPairs = keyPairs;
    this.type = type;
    this.toJWKString = function() {
        var i, numKeys = this.keyPairs.length, retval = {};
        retval.keys = [];
        for (i = 0; i < numKeys; i++) {
            var key = {
                kty: "oct",
                alg: "A128KW"
            };
            key.k = btoa(String.fromCharCode.apply(null, this.keyPairs[i].key)).replace(/=/g, "");
            key.kid = btoa(String.fromCharCode.apply(null, this.keyPairs[i].keyID)).replace(/=/g, "");
            retval.keys.push(key);
        }
        if (this.type) {
            retval.type = this.type;
        }
        return JSON.stringify(retval);
    };
};

MediaPlayer.vo.protection.ClearKeyKeySet.prototype = {
    constructor: MediaPlayer.vo.protection.ClearKeyKeySet
};

MediaPlayer.vo.protection.KeyError = function(sessionToken, errorString) {
    "use strict";
    this.sessionToken = sessionToken;
    this.error = errorString;
};

MediaPlayer.vo.protection.KeyError.prototype = {
    constructor: MediaPlayer.vo.protection.KeyError
};

MediaPlayer.vo.protection.KeyMessage = function(sessionToken, message, defaultURL) {
    "use strict";
    this.sessionToken = sessionToken;
    this.message = message;
    this.defaultURL = defaultURL;
};

MediaPlayer.vo.protection.KeyMessage.prototype = {
    constructor: MediaPlayer.vo.protection.KeyMessage
};

MediaPlayer.vo.protection.KeyPair = function(keyID, key) {
    "use strict";
    if (!keyID || keyID.length !== 16) throw new Error("Illegal key ID length! Must be 16 bytes (128 bits)");
    if (!key || key.length !== 16) throw new Error("Illegal key length! Must be 16 bytes (128 bits)");
    this.keyID = keyID;
    this.key = key;
};

MediaPlayer.vo.protection.KeyPair.prototype = {
    constructor: MediaPlayer.vo.protection.KeyPair
};

MediaPlayer.vo.protection.LicenseRequestComplete = function(message, requestData) {
    "use strict";
    this.message = message;
    this.requestData = requestData;
};

MediaPlayer.vo.protection.LicenseRequestComplete.prototype = {
    constructor: MediaPlayer.vo.protection.LicenseRequestComplete
};

MediaPlayer.vo.protection.NeedKey = function(initData, initDataType) {
    this.initData = initData;
    this.initDataType = initDataType;
};

MediaPlayer.vo.protection.NeedKey.prototype = {
    constructor: MediaPlayer.vo.protection.NeedKey
};

MediaPlayer.vo.protection.ProtectionData = function(laURL, httpRequestHeaders, bearerToken) {
    this.laURL = laURL;
    this.httpRequestHeaders = httpRequestHeaders;
    this.bearerToken = bearerToken;
};

MediaPlayer.vo.protection.ProtectionData.prototype = {
    constructor: MediaPlayer.vo.protection.ProtectionData
};

MediaPlayer.models.SessionToken = function() {
    "use strict";
};

MediaPlayer.models.SessionToken.prototype = {
    sessionID: null,
    initData: null
};