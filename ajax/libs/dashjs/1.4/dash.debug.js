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

MediaPlayer = function(context) {
    "use strict";
    var VERSION = "1.4.0", DEFAULT_TIME_SERVER = "http://time.akamai.com/?iso", DEFAULT_TIME_SOURCE_SCHEME = "urn:mpeg:dash:utc:http-xsdate:2014", numOfParallelRequestAllowed = 0, system, abrController, element, source, protectionController = null, protectionData = null, streamController, rulesController, playbackController, metricsExt, metricsModel, videoModel, DOMStorage, initialized = false, playing = false, autoPlay = true, scheduleWhilePaused = false, bufferMax = MediaPlayer.dependencies.BufferController.BUFFER_SIZE_REQUIRED, useManifestDateHeaderTimeSource = true, UTCTimingSources = [], liveDelayFragmentCount = 4, usePresentationDelay = false, isReady = function() {
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
        this.debug.log("Playback initiated!");
        streamController = system.getObject("streamController");
        playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, streamController);
        playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, streamController);
        playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY, streamController);
        playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR, streamController);
        playbackController.setLiveDelayAttributes(liveDelayFragmentCount, usePresentationDelay);
        streamController.initialize(autoPlay, protectionController, protectionData);
        DOMStorage.checkInitialBitrate();
        if (typeof source === "string") {
            streamController.load(source);
        } else {
            streamController.loadWithManifest(source);
        }
        streamController.setUTCTimingSources(UTCTimingSources, useManifestDateHeaderTimeSource);
        system.mapValue("scheduleWhilePaused", scheduleWhilePaused);
        system.mapOutlet("scheduleWhilePaused", "stream");
        system.mapOutlet("scheduleWhilePaused", "scheduleController");
        system.mapValue("numOfParallelRequestAllowed", numOfParallelRequestAllowed);
        system.mapOutlet("numOfParallelRequestAllowed", "scheduleController");
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
        this.getVideoModel().getElement().currentTime = this.getDVRSeekOffset(value);
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
    }, getAsUTC = function(valToConvert) {
        var metric = getDVRInfoMetric.call(this), availableFrom, utcValue;
        if (metric === null) {
            return 0;
        }
        availableFrom = metric.manifestInfo.availableFrom.getTime() / 1e3;
        utcValue = valToConvert + (availableFrom + metric.range.start);
        return utcValue;
    }, timeAsUTC = function() {
        return getAsUTC.call(this, this.time());
    }, durationAsUTC = function() {
        return getAsUTC.call(this, this.duration());
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
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, streamController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, streamController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY, streamController);
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR, streamController);
            streamController.reset();
            abrController.reset();
            rulesController.reset();
            playbackController.reset();
            streamController = null;
            playing = false;
        }
    };
    var _getObject = dijon.System.prototype.getObject;
    dijon.System.prototype.getObject = function(name) {
        var obj = _getObject.call(this, name);
        if (typeof obj === "object" && !obj.getName) {
            obj.getName = function() {
                return name;
            };
            obj.setMediaType = function(mediaType) {
                obj.mediaType = mediaType;
            };
            obj.getMediaType = function() {
                return obj.mediaType;
            };
        }
        return obj;
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
            abrController = system.getObject("abrController");
            rulesController = system.getObject("rulesController");
            metricsModel = system.getObject("metricsModel");
            DOMStorage = system.getObject("DOMStorage");
            playbackController = system.getObject("playbackController");
            this.restoreDefaultUTCTimingSources();
        },
        addEventListener: function(type, listener, useCapture) {
            type = type.toLowerCase();
            this.eventBus.addEventListener(type, listener, useCapture);
        },
        removeEventListener: function(type, listener, useCapture) {
            type = type.toLowerCase();
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
        setLiveDelayFragmentCount: function(value) {
            liveDelayFragmentCount = value;
        },
        useSuggestedPresentationDelay: function(value) {
            usePresentationDelay = value;
        },
        enableLastBitrateCaching: function(enable, ttl) {
            DOMStorage.enableLastBitrateCaching(enable, ttl);
        },
        setNumOfParallelRequestAllowed: function(value) {
            numOfParallelRequestAllowed = value;
        },
        setMaxAllowedBitrateFor: function(type, value) {
            abrController.setMaxAllowedBitrateFor(type, value);
        },
        getMaxAllowedBitrateFor: function(type) {
            return abrController.getMaxAllowedBitrateFor(type);
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
            return metricsModel.getReadOnlyMetricsFor(type);
        },
        getQualityFor: function(type) {
            return abrController.getQualityFor(type, streamController.getActiveStreamInfo());
        },
        setQualityFor: function(type, value) {
            abrController.setPlaybackQuality(type, streamController.getActiveStreamInfo(), value);
        },
        getBitrateInfoListFor: function(type) {
            var streamInfo = streamController.getActiveStreamInfo(), stream = streamController.getStreamById(streamInfo.id);
            return stream.getBitrateListFor(type);
        },
        setInitialBitrateFor: function(type, value) {
            abrController.setInitialBitrateFor(type, value);
        },
        getInitialBitrateFor: function(type) {
            return abrController.getInitialBitrateFor(type);
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
        createProtection: function() {
            return system.getObject("protectionController");
        },
        retrieveManifest: function(url, callback) {
            (function(manifestUrl) {
                var manifestLoader = system.getObject("manifestLoader"), uriQueryFragModel = system.getObject("uriQueryFragModel"), cbObj = {};
                cbObj[MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED] = function(e) {
                    if (!e.error) {
                        callback(e.data.manifest);
                    } else {
                        callback(null, e.error);
                    }
                    manifestLoader.unsubscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, this);
                };
                manifestLoader.subscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, cbObj);
                manifestLoader.load(uriQueryFragModel.parseURI(manifestUrl));
            })(url);
        },
        addUTCTimingSource: function(schemeIdUri, value) {
            this.removeUTCTimingSource(schemeIdUri, value);
            var vo = new Dash.vo.UTCTiming();
            vo.schemeIdUri = schemeIdUri;
            vo.value = value;
            UTCTimingSources.push(vo);
        },
        removeUTCTimingSource: function(schemeIdUri, value) {
            UTCTimingSources.forEach(function(obj, idx) {
                if (obj.schemeIdUri === schemeIdUri && obj.value === value) {
                    UTCTimingSources.splice(idx, 1);
                }
            });
        },
        clearDefaultUTCTimingSources: function() {
            UTCTimingSources = [];
        },
        restoreDefaultUTCTimingSources: function() {
            this.addUTCTimingSource(DEFAULT_TIME_SOURCE_SCHEME, DEFAULT_TIME_SERVER);
        },
        enableManifestDateHeaderTimeSource: function(value) {
            useManifestDateHeaderTimeSource = value;
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
        attachSource: function(urlOrManifest, protectionCtrl, data) {
            if (!initialized) {
                throw "MediaPlayer not initialized!";
            }
            if (typeof urlOrManifest === "string") {
                this.uriQueryFragModel.reset();
                source = this.uriQueryFragModel.parseURI(urlOrManifest);
            } else {
                source = urlOrManifest;
            }
            protectionController = protectionCtrl;
            protectionData = data;
            doReset.call(this);
            if (isReady.call(this)) {
                doAutoPlay.call(this);
            }
        },
        reset: function() {
            this.attachSource(null);
            this.attachView(null);
            protectionController = null;
            protectionData = null;
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

MediaPlayer.dependencies.protection.servers = {};

MediaPlayer.utils = {};

MediaPlayer.models = {};

MediaPlayer.vo = {};

MediaPlayer.vo.metrics = {};

MediaPlayer.vo.protection = {};

MediaPlayer.rules = {};

MediaPlayer.di = {};

MediaPlayer.events = {
    METRICS_CHANGED: "metricschanged",
    METRIC_CHANGED: "metricchanged",
    METRIC_UPDATED: "metricupdated",
    METRIC_ADDED: "metricadded",
    MANIFEST_LOADED: "manifestloaded",
    STREAM_SWITCH_STARTED: "streamswitchstarted",
    STREAM_SWITCH_COMPLETED: "streamswitchcompleted",
    STREAM_INITIALIZED: "streaminitialized",
    TEXT_TRACK_ADDED: "texttrackadded",
    BUFFER_LOADED: "bufferloaded",
    BUFFER_EMPTY: "bufferstalled",
    ERROR: "error",
    LOG: "log"
};

MediaPlayer.di.Context = function() {
    "use strict";
    var mapProtectionModel = function() {
        var videoElement = document.createElement("video");
        if (MediaPlayer.models.ProtectionModel_21Jan2015.detect(videoElement)) {
            this.system.mapClass("protectionModel", MediaPlayer.models.ProtectionModel_21Jan2015);
        } else if (MediaPlayer.models.ProtectionModel_3Feb2014.detect(videoElement)) {
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
            this.system.mapSingleton("DOMStorage", MediaPlayer.utils.DOMStorage);
            this.system.mapClass("customTimeRanges", MediaPlayer.utils.CustomTimeRanges);
            this.system.mapSingleton("virtualBuffer", MediaPlayer.utils.VirtualBuffer);
            this.system.mapSingleton("textTrackExtensions", MediaPlayer.utils.TextTrackExtensions);
            this.system.mapSingleton("vttParser", MediaPlayer.utils.VTTParser);
            this.system.mapSingleton("ttmlParser", MediaPlayer.utils.TTMLParser);
            this.system.mapSingleton("videoModel", MediaPlayer.models.VideoModel);
            this.system.mapSingleton("manifestModel", MediaPlayer.models.ManifestModel);
            this.system.mapSingleton("metricsModel", MediaPlayer.models.MetricsModel);
            this.system.mapSingleton("uriQueryFragModel", MediaPlayer.models.URIQueryAndFragmentModel);
            this.system.mapSingleton("ksPlayReady", MediaPlayer.dependencies.protection.KeySystem_PlayReady);
            this.system.mapSingleton("ksWidevine", MediaPlayer.dependencies.protection.KeySystem_Widevine);
            this.system.mapSingleton("ksClearKey", MediaPlayer.dependencies.protection.KeySystem_ClearKey);
            this.system.mapSingleton("serverPlayReady", MediaPlayer.dependencies.protection.servers.PlayReady);
            this.system.mapSingleton("serverWidevine", MediaPlayer.dependencies.protection.servers.Widevine);
            this.system.mapSingleton("serverClearKey", MediaPlayer.dependencies.protection.servers.ClearKey);
            this.system.mapSingleton("serverDRMToday", MediaPlayer.dependencies.protection.servers.DRMToday);
            this.system.mapSingleton("requestModifierExt", MediaPlayer.dependencies.RequestModifierExtensions);
            this.system.mapSingleton("textSourceBuffer", MediaPlayer.dependencies.TextSourceBuffer);
            this.system.mapSingleton("mediaSourceExt", MediaPlayer.dependencies.MediaSourceExtensions);
            this.system.mapSingleton("sourceBufferExt", MediaPlayer.dependencies.SourceBufferExtensions);
            this.system.mapSingleton("abrController", MediaPlayer.dependencies.AbrController);
            this.system.mapSingleton("errHandler", MediaPlayer.dependencies.ErrorHandler);
            this.system.mapSingleton("videoExt", MediaPlayer.dependencies.VideoModelExtensions);
            this.system.mapSingleton("protectionExt", MediaPlayer.dependencies.ProtectionExtensions);
            this.system.mapClass("protectionController", MediaPlayer.dependencies.ProtectionController);
            this.system.mapSingleton("playbackController", MediaPlayer.dependencies.PlaybackController);
            mapProtectionModel.call(this);
            this.system.mapSingleton("liveEdgeFinder", MediaPlayer.dependencies.LiveEdgeFinder);
            this.system.mapClass("metrics", MediaPlayer.models.MetricsList);
            this.system.mapClass("insufficientBufferRule", MediaPlayer.rules.InsufficientBufferRule);
            this.system.mapClass("bufferOccupancyRule", MediaPlayer.rules.BufferOccupancyRule);
            this.system.mapClass("throughputRule", MediaPlayer.rules.ThroughputRule);
            this.system.mapSingleton("abrRulesCollection", MediaPlayer.rules.ABRRulesCollection);
            this.system.mapSingleton("rulesController", MediaPlayer.rules.RulesController);
            this.system.mapClass("bufferLevelRule", MediaPlayer.rules.BufferLevelRule);
            this.system.mapClass("pendingRequestsRule", MediaPlayer.rules.PendingRequestsRule);
            this.system.mapClass("playbackTimeRule", MediaPlayer.rules.PlaybackTimeRule);
            this.system.mapClass("sameTimeRequestRule", MediaPlayer.rules.SameTimeRequestRule);
            this.system.mapClass("abandonRequestRule", MediaPlayer.rules.AbandonRequestsRule);
            this.system.mapSingleton("scheduleRulesCollection", MediaPlayer.rules.ScheduleRulesCollection);
            this.system.mapClass("liveEdgeBinarySearchRule", MediaPlayer.rules.LiveEdgeBinarySearchRule);
            this.system.mapClass("liveEdgeWithTimeSynchronizationRule", MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule);
            this.system.mapSingleton("synchronizationRulesCollection", MediaPlayer.rules.SynchronizationRulesCollection);
            this.system.mapSingleton("xlinkController", MediaPlayer.dependencies.XlinkController);
            this.system.mapSingleton("xlinkLoader", MediaPlayer.dependencies.XlinkLoader);
            this.system.mapClass("streamProcessor", MediaPlayer.dependencies.StreamProcessor);
            this.system.mapClass("eventController", MediaPlayer.dependencies.EventController);
            this.system.mapClass("textController", MediaPlayer.dependencies.TextController);
            this.system.mapClass("bufferController", MediaPlayer.dependencies.BufferController);
            this.system.mapClass("manifestLoader", MediaPlayer.dependencies.ManifestLoader);
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
    }, convertRepresentationToTrackInfo = function(manifest, representation) {
        var trackInfo = new MediaPlayer.vo.TrackInfo(), a = representation.adaptation.period.mpd.manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index], r = this.manifestExt.getRepresentationFor(representation.index, a);
        trackInfo.id = representation.id;
        trackInfo.quality = representation.index;
        trackInfo.bandwidth = this.manifestExt.getBandwidth(r);
        trackInfo.DVRWindow = representation.segmentAvailabilityRange;
        trackInfo.fragmentDuration = representation.segmentDuration || (representation.segments && representation.segments.length > 0 ? representation.segments[0].duration : NaN);
        trackInfo.MSETimeOffset = representation.MSETimeOffset;
        trackInfo.useCalculatedLiveEdgeTime = representation.useCalculatedLiveEdgeTime;
        trackInfo.mediaInfo = convertAdaptationToMediaInfo.call(this, manifest, representation.adaptation);
        return trackInfo;
    }, convertAdaptationToMediaInfo = function(manifest, adaptation) {
        var mediaInfo = new MediaPlayer.vo.MediaInfo(), self = this, a = adaptation.period.mpd.manifest.Period_asArray[adaptation.period.index].AdaptationSet_asArray[adaptation.index];
        mediaInfo.id = adaptation.id;
        mediaInfo.index = adaptation.index;
        mediaInfo.type = adaptation.type;
        mediaInfo.streamInfo = convertPeriodToStreamInfo.call(this, manifest, adaptation.period);
        mediaInfo.trackCount = this.manifestExt.getRepresentationCount(a);
        mediaInfo.lang = this.manifestExt.getLanguageForAdaptation(a);
        mediaInfo.codec = this.manifestExt.getCodec(a);
        mediaInfo.mimeType = this.manifestExt.getMimeType(a);
        mediaInfo.contentProtection = this.manifestExt.getContentProtectionData(a);
        mediaInfo.bitrateList = this.manifestExt.getBitrateListForAdaptation(a);
        if (mediaInfo.contentProtection) {
            mediaInfo.contentProtection.forEach(function(item) {
                item.KID = self.manifestExt.getKID(item);
            });
        }
        mediaInfo.isText = this.manifestExt.getIsTextTrack(mediaInfo.mimeType);
        return mediaInfo;
    }, convertPeriodToStreamInfo = function(manifest, period) {
        var streamInfo = new MediaPlayer.vo.StreamInfo(), THRESHOLD = 1;
        streamInfo.id = period.id;
        streamInfo.index = period.index;
        streamInfo.start = period.start;
        streamInfo.duration = period.duration;
        streamInfo.manifestInfo = convertMpdToManifestInfo.call(this, manifest, period.mpd);
        streamInfo.isLast = manifest.Period_asArray.length === 1 || Math.abs(streamInfo.start + streamInfo.duration - streamInfo.manifestInfo.duration) < THRESHOLD;
        return streamInfo;
    }, convertMpdToManifestInfo = function(manifest, mpd) {
        var manifestInfo = new MediaPlayer.vo.ManifestInfo();
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
        return convertAdaptationToMediaInfo.call(this, manifest, adaptations[periodId][idx]);
    }, getStreamsInfoFromManifest = function(manifest) {
        var mpd, streams = [], ln, i;
        if (!manifest) return null;
        mpd = this.manifestExt.getMpd(manifest);
        periods = this.manifestExt.getRegularPeriods(manifest, mpd);
        mpd.checkTime = this.manifestExt.getCheckTime(manifest, periods[0]);
        adaptations = {};
        ln = periods.length;
        for (i = 0; i < ln; i += 1) {
            streams.push(convertPeriodToStreamInfo.call(this, manifest, periods[i]));
        }
        return streams;
    }, getMpdInfo = function(manifest) {
        var mpd = this.manifestExt.getMpd(manifest);
        return convertMpdToManifestInfo.call(this, manifest, mpd);
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
        var representation = getRepresentationForTrackInfo(trackInfo, streamProcessor.trackController);
        return streamProcessor.indexHandler.generateSegmentRequestForTime(representation, time);
    }, getIndexHandlerTime = function(streamProcessor) {
        return streamProcessor.indexHandler.getCurrentTime();
    }, setIndexHandlerTime = function(streamProcessor, value) {
        return streamProcessor.indexHandler.setCurrentTime(value);
    }, updateData = function(manifest, streamProcessor) {
        var periodInfo = getPeriodForStreamInfo(streamProcessor.getStreamInfo()), mediaInfo = streamProcessor.getMediaInfo(), adaptation = getAdaptationForMediaInfo(mediaInfo), type = streamProcessor.getType(), id, data;
        id = mediaInfo.id;
        data = id ? this.manifestExt.getAdaptationForId(id, manifest, periodInfo.index) : this.manifestExt.getAdaptationForIndex(mediaInfo.index, manifest, periodInfo.index);
        streamProcessor.trackController.updateData(data, adaptation, type);
    }, getTrackInfoForQuality = function(manifest, representationController, quality) {
        var representation = representationController.getRepresentationForQuality(quality);
        return representation ? convertRepresentationToTrackInfo.call(this, manifest, representation) : null;
    }, getCurrentTrackInfo = function(manifest, representationController) {
        var representation = representationController.getCurrentRepresentation();
        return representation ? convertRepresentationToTrackInfo.call(this, manifest, representation) : null;
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
    }, getEventsFor = function(manifest, info, streamProcessor) {
        var events = [];
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
    if (typeof video === "undefined" || video.nodeName != "VIDEO") return null;
    var player, videoID = video.id || video.name || "video element";
    context = context || new Dash.di.DashContext();
    source = source || [].slice.call(video.querySelectorAll("source")).filter(function(s) {
        return s.type == Dash.supportedManifestMimeTypes.mimeType;
    })[0];
    if (source === undefined && video.src) {
        source = document.createElement("source");
        source.src = video.src;
    } else if (source === undefined && !video.src) {
        return null;
    }
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
        var startPos, endPos, tokenLen = token.length, formatTag = "%0", formatTagLen = formatTag.length, formatTagPos, specifier, width, paddedValue;
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
                    this.log("Unsupported/invalid IEEE 1003.1 format identifier string in URL");
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
        if (index < 0) {
            isFinished = false;
        } else if (isDynamic || index < representation.availableSegmentsNumber) {
            seg = getSegmentByIndex(index, representation);
            if (seg) {
                fTime = seg.presentationStartTime - period.start;
                sDuration = representation.adaptation.period.duration;
                this.log(representation.segmentInfoType + ": " + fTime + " / " + sDuration);
                isFinished = fTime >= sDuration;
            }
        } else {
            isFinished = true;
        }
        return isFinished;
    }, getIndexBasedSegment = function(representation, index) {
        var self = this, seg, duration, presentationStartTime, presentationEndTime;
        duration = representation.segmentDuration;
        if (isNaN(duration)) {
            duration = representation.adaptation.period.duration;
        }
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
        if (isNaN(duration) && !isDynamic) {
            segmentRange = {
                start: start,
                end: start
            };
        } else {
            segmentRange = decideSegmentListRangeForTemplate.call(self, representation);
        }
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
        if (isNaN(duration)) {
            representation.availableSegmentsNumber = 1;
        } else {
            representation.availableSegmentsNumber = Math.ceil((availabilityWindow.end - availabilityWindow.start) / duration);
        }
        return segments;
    }, decideSegmentListRangeForTemplate = function(representation) {
        var self = this, duration = representation.segmentDuration, minBufferTime = representation.adaptation.period.mpd.manifest.minBufferTime, availabilityWindow = representation.segmentAvailabilityRange, periodRelativeRange = {
            start: self.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(representation, availabilityWindow.start),
            end: self.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(representation, availabilityWindow.end)
        }, originAvailabilityTime = NaN, originSegment = null, currentSegmentList = representation.segments, availabilityLowerLimit = 2 * duration, availabilityUpperLimit = Math.max(2 * minBufferTime, 10 * duration), start, end, range;
        if (!periodRelativeRange) {
            periodRelativeRange = self.timelineConverter.calcSegmentAvailabilityRange(representation, isDynamic);
        }
        periodRelativeRange.start = Math.max(periodRelativeRange.start, 0);
        if (isDynamic && !self.timelineConverter.isTimeSyncCompleted()) {
            start = Math.floor(periodRelativeRange.start / duration);
            end = Math.floor(periodRelativeRange.end / duration);
            range = {
                start: start,
                end: end
            };
            return range;
        }
        if (currentSegmentList && currentSegmentList.length > 0) {
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
            liveEdge = lastSegment.presentationStartTime;
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
        if (!representation.segmentDuration && !representation.segments) {
            updateSegmentList.call(self, representation);
        }
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
        if (representation.segmentDuration) {
            updateSegmentList.call(self, representation);
        }
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
        var request, segment, finished, idx = index, keepIdx = options ? options.keepIdx : false, timeThreshold = options ? options.timeThreshold : null, ignoreIsFinished = options && options.ignoreIsFinished ? true : false, self = this;
        if (!representation) {
            return null;
        }
        requestedTime = time;
        self.log("Getting the request for time: " + time);
        index = getIndexForSegments.call(self, time, representation, timeThreshold);
        getSegments.call(self, representation);
        if (index < 0) {
            index = getIndexForSegments.call(self, time, representation, timeThreshold);
        }
        self.log("Index for time " + time + " is " + index);
        finished = !ignoreIsFinished ? isMediaFinished.call(self, representation) : false;
        if (finished) {
            request = new MediaPlayer.vo.FragmentRequest();
            request.action = request.ACTION_COMPLETE;
            request.index = index;
            request.mediaType = type;
            self.log("Signal complete.");
            self.log(request);
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
            keepIdx: false,
            ignoreIsFinished: true
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
            self.log("Signal complete.");
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
        log: undefined,
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
            this.setMediaType(type);
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
            isDynamic = undefined;
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
    var SECONDS_IN_YEAR = 365 * 24 * 60 * 60, SECONDS_IN_MONTH = 30 * 24 * 60 * 60, SECONDS_IN_DAY = 24 * 60 * 60, SECONDS_IN_HOUR = 60 * 60, SECONDS_IN_MIN = 60, MINUTES_IN_HOUR = 60, MILLISECONDS_IN_SECONDS = 1e3, durationRegex = /^([-])?P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/, datetimeRegex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+-])([0-9]{2})([0-9]{2}))?/, numericRegex = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/, matchers = [ {
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
            var result = parseFloat(match[2] || 0) * SECONDS_IN_YEAR + parseFloat(match[4] || 0) * SECONDS_IN_MONTH + parseFloat(match[6] || 0) * SECONDS_IN_DAY + parseFloat(match[8] || 0) * SECONDS_IN_HOUR + parseFloat(match[10] || 0) * SECONDS_IN_MIN + parseFloat(match[12] || 0);
            if (match[1] !== undefined) {
                result = -result;
            }
            return result;
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
            this.xlinkController.setMatchers(matchers);
            this.xlinkController.setIron(iron);
            this.log("Parsing complete: ( xml2json: " + (json.getTime() - start.getTime()) + "ms, objectiron: " + (ironed.getTime() - json.getTime()) + "ms, total: " + (ironed.getTime() - start.getTime()) / 1e3 + "s)");
        } catch (err) {
            this.errHandler.manifestError("parsing the manifest failed", "parse", data);
            return null;
        }
        return manifest;
    };
    return {
        log: undefined,
        errHandler: undefined,
        xlinkController: undefined,
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
        }, d = representation.segmentDuration || (representation.segments && representation.segments.length ? representation.segments[representation.segments.length - 1].duration : 0), checkTime, now;
        if (!isDynamic) return range;
        if (!isClientServerTimeSyncCompleted && representation.segmentAvailabilityRange) {
            return representation.segmentAvailabilityRange;
        }
        checkTime = representation.adaptation.period.mpd.checkTime;
        now = calcPresentationTimeFromWallTime(new Date(), representation.adaptation.period);
        start = Math.max(now - representation.adaptation.period.mpd.timeShiftBufferDepth, 0);
        end = (isNaN(checkTime) ? now : Math.min(checkTime, now)) - d;
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
        clientServerTimeShift += e.data.liveEdge - (expectedLiveEdge + e.data.searchTime);
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
        setTimeSyncCompleted: function(value) {
            isClientServerTimeSyncCompleted = value;
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
        var self = this, bitrate = null, streamInfo = self.streamProcessor.getStreamInfo(), quality, maxQuality = self.abrController.getTopQualityIndexFor(type, streamInfo.id);
        updating = true;
        self.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED);
        availableRepresentations = updateRepresentations.call(self, adaptation);
        if (data === null) {
            bitrate = self.abrController.getInitialBitrateFor(type, streamInfo);
            quality = self.abrController.getQualityForBitrate(self.streamProcessor.getMediaInfo(), bitrate);
        } else {
            quality = self.abrController.getQualityFor(type, streamInfo);
        }
        if (quality > maxQuality) {
            quality = maxQuality;
        }
        currentRepresentation = getRepresentationForQuality.call(self, quality);
        data = dataValue;
        if (type !== "video" && type !== "audio" && type !== "fragmentedText") {
            updating = false;
            self.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, {
                data: data,
                currentRepresentation: currentRepresentation
            });
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
    }, getQualityForRepresentation = function(representation) {
        return availableRepresentations.indexOf(representation);
    }, isAllRepresentationsUpdated = function() {
        for (var i = 0, ln = availableRepresentations.length; i < ln; i += 1) {
            var segmentInfoType = availableRepresentations[i].segmentInfoType;
            if (availableRepresentations[i].segmentAvailabilityRange === null || availableRepresentations[i].initialization === null || (segmentInfoType === "SegmentBase" || segmentInfoType === "BaseURL") && !availableRepresentations[i].segments) {
                return false;
            }
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
        var self = this, r = e.data.representation, streamMetrics = self.metricsModel.getMetricsFor("stream"), metrics = self.metricsModel.getMetricsFor(this.getCurrentRepresentation().adaptation.type), manifestUpdateInfo = self.metricsExt.getCurrentManifestUpdate(streamMetrics), repInfo, err, alreadyAdded = false, repSwitch;
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
        if (manifestUpdateInfo) {
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
        }
        if (isAllRepresentationsUpdated()) {
            updating = false;
            self.abrController.setPlaybackQuality(self.streamProcessor.getType(), self.streamProcessor.getStreamInfo(), getQualityForRepresentation.call(this, currentRepresentation));
            self.metricsModel.updateManifestUpdateInfo(manifestUpdateInfo, {
                latency: currentRepresentation.segmentAvailabilityRange.end - self.streamProcessor.playbackController.getTime()
            });
            repSwitch = self.metricsExt.getCurrentRepresentationSwitch(metrics);
            if (!repSwitch) {
                addRepresentationSwitch.call(self);
            }
            this.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, {
                data: data,
                currentRepresentation: currentRepresentation
            });
        }
    }, onWallclockTimeUpdated = function(e) {
        updateAvailabilityWindow.call(this, e.data.isDynamic);
    }, onLiveEdgeSearchCompleted = function(e) {
        if (e.error) return;
        updateAvailabilityWindow.call(this, true);
        this.indexHandler.updateRepresentation(currentRepresentation, false);
        var manifest = this.manifestModel.getValue(), period = currentRepresentation.adaptation.period, streamInfo = this.streamController.getActiveStreamInfo();
        if (streamInfo.isLast) {
            period.mpd.checkTime = this.manifestExt.getCheckTime(manifest, period);
            period.duration = this.manifestExt.getEndTimeForLastPeriod(this.manifestModel.getValue(), period) - period.start;
            streamInfo.duration = period.duration;
        }
    }, onBufferLevelUpdated = function() {
        addDVRMetric.call(this);
    }, onQualityChanged = function(e) {
        var self = this;
        if (e.data.mediaType !== self.streamProcessor.getType() || self.streamProcessor.getStreamInfo().id !== e.data.streamInfo.id) return;
        currentRepresentation = self.getRepresentationForQuality(e.data.newQuality);
        setLocalStorage.call(self, e.data.mediaType, currentRepresentation.bandwidth);
        addRepresentationSwitch.call(self);
    }, setLocalStorage = function(type, bitrate) {
        if (this.DOMStorage.isSupported(MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL) && (type === "video" || type === "audio")) {
            localStorage.setItem(MediaPlayer.utils.DOMStorage["LOCAL_STORAGE_" + type.toUpperCase() + "_BITRATE_KEY"], JSON.stringify({
                bitrate: bitrate / 1e3,
                timestamp: new Date().getTime()
            }));
        }
    };
    return {
        system: undefined,
        log: undefined,
        manifestExt: undefined,
        manifestModel: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        abrController: undefined,
        streamController: undefined,
        timelineConverter: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        DOMStorage: undefined,
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
        this.log("Parsed SIDX box: " + segments.length + " segments.");
        return segments;
    }, findInit = function(data, info, callback) {
        var ftyp, moov, start, end, d = new DataView(data), pos = 0, type = "", size = 0, i, c, request, loaded = false, irange, self = this;
        self.log("Searching for initialization.");
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
        if (type !== "moov") {
            self.log("Loading more bytes to find initialization.");
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
            sendRequest.call(self, request, info);
        } else {
            start = ftyp === undefined ? moov : ftyp;
            end = moov + size - 1;
            irange = start + "-" + end;
            self.log("Found the initialization.  Range: " + irange);
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
        self.log("Start searching for initialization.");
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
        sendRequest.call(self, request, info);
        self.log("Perform init search: " + info.url);
    }, findSIDX = function(data, info, representation, callback) {
        var segments, d = new DataView(data), request = new XMLHttpRequest(), pos = 0, type = "", size = 0, bytesAvailable, sidxBytes, sidxSlice, sidxOut, i, c, needFailureReport = true, parsed, ref, loadMultiSidx = false, self = this;
        self.log("Searching for SIDX box.");
        self.log(info.bytesLoaded + " bytes loaded.");
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
            self.log("Found SIDX but we don't have all of it.");
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
            sendRequest.call(self, request, info);
        } else {
            info.range.start = pos - 8;
            info.range.end = info.range.start + size;
            self.log("Found the SIDX box.  Start: " + info.range.start + " | End: " + info.range.end);
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
                self.log("Initiate multiple SIDX load.");
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
                self.log("Parsing segments from SIDX.");
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
            self.log("No known range for SIDX request.");
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
        sendRequest.call(self, request, info);
        self.log("Perform SIDX load: " + info.url);
    }, sendRequest = function(request, info) {
        request.open("GET", this.requestModifierExt.modifyRequestURL(info.url));
        request.responseType = "arraybuffer";
        request.setRequestHeader("Range", "bytes=" + info.range.start + "-" + info.range.end);
        request = this.requestModifierExt.modifyRequestHeader(request);
        request.send(null);
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
        log: undefined,
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
        if (adaptation.Representation_asArray.length > 0 && adaptation.Representation_asArray[0].hasOwnProperty("codecs") && adaptation.Representation_asArray[0].codecs == "stpp") {
            return type == "fragmentedText";
        }
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
    getIsFragmentedText: function(adaptation) {
        "use strict";
        return this.getIsTypeOf(adaptation, "fragmentedText");
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
        var representation = adaptation.Representation_asArray[0];
        return representation.mimeType + ';codecs="' + representation.codecs + '"';
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
            mpdDuration = Number.MAX_VALUE;
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
    getBitrateListForAdaptation: function(adaptation) {
        if (!adaptation || !adaptation.Representation_asArray || !adaptation.Representation_asArray.length) return null;
        var a = this.processAdaptation(adaptation), reps = a.Representation_asArray, ln = reps.length, bitrateList = [];
        for (var i = 0; i < ln; i += 1) {
            bitrateList.push(reps[i].bandwidth);
        }
        return bitrateList;
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
            if (r.hasOwnProperty("bandwidth")) {
                representation.bandwidth = r.bandwidth;
            }
            if (r.hasOwnProperty("maxPlayoutRate")) {
                representation.maxPlayoutRate = r.maxPlayoutRate;
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
            if (this.getIsAudio(a)) {
                adaptationSet.type = "audio";
            } else if (this.getIsVideo(a)) {
                adaptationSet.type = "video";
            } else if (this.getIsFragmentedText(a)) {
                adaptationSet.type = "fragmentedText";
            } else {
                adaptationSet.type = "text";
            }
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
        if (vo1 !== null && isNaN(vo1.duration)) {
            vo1.duration = self.getEndTimeForLastPeriod(manifest, vo1) - vo1.start;
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
        return this.timelineConverter.calcPresentationTimeFromWallTime(manifest.loadedTime, period);
    },
    getCheckTime: function(manifest, period) {
        var self = this, checkTime = NaN, fetchTime;
        if (manifest.hasOwnProperty("minimumUpdatePeriod")) {
            fetchTime = self.getFetchTime(manifest, period);
            checkTime = fetchTime + manifest.minimumUpdatePeriod;
        }
        return checkTime;
    },
    getEndTimeForLastPeriod: function(manifest, period) {
        var periodEnd, checkTime = this.getCheckTime(manifest, period);
        if (manifest.mediaPresentationDuration) {
            periodEnd = manifest.mediaPresentationDuration;
        } else if (!isNaN(checkTime)) {
            periodEnd = checkTime;
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
    getEventStreams: function(inbandStreams, representation) {
        var eventStreams = [];
        if (!inbandStreams) return eventStreams;
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
        return eventStreams;
    },
    getEventStreamForAdaptationSet: function(manifest, adaptation) {
        var inbandStreams = manifest.Period_asArray[adaptation.period.index].AdaptationSet_asArray[adaptation.index].InbandEventStream_asArray;
        return this.getEventStreams(inbandStreams, null);
    },
    getEventStreamForRepresentation: function(manifest, representation) {
        var inbandStreams = manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index].Representation_asArray[representation.index].InbandEventStream_asArray;
        return this.getEventStreams(inbandStreams, representation);
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
    var findRepresentationIndex = function(period, representationId) {
        var adaptationSet, adaptationSetArray, representation, representationArray, adaptationSetArrayIndex, representationArrayIndex;
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
        return -1;
    }, findRepresentation = function(period, representationId) {
        var adaptationSet, adaptationSetArray, representation, representationArray, adaptationSetArrayIndex, representationArrayIndex;
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
        return null;
    }, adaptationIsType = function(adaptation, bufferType) {
        return this.manifestExt.getIsTypeOf(adaptation, bufferType);
    }, findMaxBufferIndex = function(period, bufferType) {
        var adaptationSet, adaptationSetArray, representationArray, adaptationSetArrayIndex;
        if (!period || !bufferType) return -1;
        adaptationSetArray = period.AdaptationSet_asArray;
        for (adaptationSetArrayIndex = 0; adaptationSetArrayIndex < adaptationSetArray.length; adaptationSetArrayIndex = adaptationSetArrayIndex + 1) {
            adaptationSet = adaptationSetArray[adaptationSetArrayIndex];
            representationArray = adaptationSet.Representation_asArray;
            if (adaptationIsType.call(this, adaptationSet, bufferType)) {
                return representationArray.length;
            }
        }
        return -1;
    }, getBandwidthForRepresentation = function(representationId, periodId) {
        var self = this, manifest = self.manifestModel.getValue(), representation, period = manifest.Period_asArray[periodId];
        representation = findRepresentation.call(self, period, representationId);
        if (representation === null) {
            return null;
        }
        return representation.bandwidth;
    }, getIndexForRepresentation = function(representationId, periodIdx) {
        var self = this, manifest = self.manifestModel.getValue(), representationIndex, period = manifest.Period_asArray[periodIdx];
        representationIndex = findRepresentationIndex.call(self, period, representationId);
        return representationIndex;
    }, getMaxIndexForBufferType = function(bufferType, periodIdx) {
        var self = this, manifest = self.manifestModel.getValue(), maxIndex, period = manifest.Period_asArray[periodIdx];
        maxIndex = findMaxBufferIndex.call(this, period, bufferType);
        return maxIndex;
    }, getMaxAllowedIndexForBufferType = function(bufferType, periodId) {
        var abrController = this.system.getObject("abrController"), idx = 0;
        if (abrController) {
            idx = abrController.getTopQualityIndexFor(bufferType, periodId);
        }
        return idx;
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
        while (httpListLastIndex >= 0) {
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
        var dvrInfo = metrics.DVRInfo, dvrInfoLastIndex, curentDVRInfo;
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
            headers = parseResponseHeaders(httpRequest.responseHeaders);
        }
        return headers[id] === undefined ? null : headers[id];
    }, getLatestFragmentRequestHeaderValueByID = function(metrics, id) {
        if (metrics === null) return null;
        var httpRequest = getCurrentHttpRequest(metrics), headers;
        if (httpRequest === null || httpRequest.responseHeaders === null) return null;
        headers = parseResponseHeaders(httpRequest.responseHeaders);
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
        system: undefined,
        getBandwidthForRepresentation: getBandwidthForRepresentation,
        getIndexForRepresentation: getIndexForRepresentation,
        getMaxIndexForBufferType: getMaxIndexForBufferType,
        getMaxAllowedIndexForBufferType: getMaxAllowedIndexForBufferType,
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

function intTobitArray(integer, integerSizeInBit) {
    var bitArray = [];
    for (var i = 0; i < integerSizeInBit; i++) {
        bitArray.push((integer & Math.pow(2, i)) > 0);
    }
    return bitArray;
}

Dash.dependencies.FragmentExtensions = function() {
    "use strict";
    var TFHD_BASE_DATA_OFFSET_PRESENT_FLAG_INDEX = 0, TFHD_SAMPLE_DESCRIPTION_INDEX_PRESENT_FLAG_INDEX = 1, TFHD_DEFAULT_SAMPLE_DURATION_PRESENT_FLAG_INDEX = 3, TFHD_DEFAULT_SAMPLE_SIZE_PRESENT_FLAG_INDEX = 4, TFHD_DEFAULT_SAMPLE_FLAGS_PRESENT_FLAG_INDEX = 5, TRUN_DATA_OFFSET_PRESENT_FLAG_INDEX = 0, TRUN_FIRST_SAMPLE_FLAGS_PRESENT_FLAG_INDEX = 2, TRUN_SAMPLE_DURATION_PRESENT_FLAG_INDEX = 8, TRUN_SAMPLE_SIZE_PRESENT_FLAG_INDEX = 9, TRUN_SAMPLE_FLAGS_PRESENT_FLAG_INDEX = 10, TRUN_SAMPLE_COMPOSITION_TIME_OFFSET_PRESENT_FLAG_INDEX = 11;
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
    }, parseTFHD = function(ab) {
        var d = new DataView(ab), pos = 0, size, type, flags, flagsBits, tfhd, i, c;
        while (type !== "tfhd" && pos < d.byteLength) {
            size = d.getUint32(pos);
            pos += 4;
            type = "";
            for (i = 0; i < 4; i += 1) {
                c = d.getInt8(pos);
                type += String.fromCharCode(c);
                pos += 1;
            }
            if (type !== "moof" && type !== "traf" && type !== "tfhd") {
                pos += size - 8;
            }
        }
        if (pos === d.byteLength) {
            throw "Error finding live offset.";
        }
        tfhd = {
            baseDataOffset: 0,
            descriptionIndex: 0,
            sampleDuration: 0,
            sampleSize: 0,
            defaultSampleFlags: 0
        };
        pos += 1;
        pos += 2;
        flags = d.getUint8(pos);
        pos += 1;
        flagsBits = intTobitArray(flags, 8);
        pos += 4;
        if (flagsBits[TFHD_BASE_DATA_OFFSET_PRESENT_FLAG_INDEX]) {
            tfhd.baseDataOffset = utils.Math.to64BitNumber(d.getUint32(pos + 4, false), d.getUint32(pos, false));
            pos += 8;
        }
        if (flagsBits[TFHD_SAMPLE_DESCRIPTION_INDEX_PRESENT_FLAG_INDEX]) {
            tfhd.descriptionIndex = d.getUint32(pos);
            pos += 4;
        }
        if (flagsBits[TFHD_DEFAULT_SAMPLE_DURATION_PRESENT_FLAG_INDEX]) {
            tfhd.sampleDuration = d.getUint32(pos);
            pos += 4;
        }
        if (flagsBits[TFHD_DEFAULT_SAMPLE_SIZE_PRESENT_FLAG_INDEX]) {
            tfhd.sampleSize = d.getUint32(pos);
            pos += 4;
        }
        if (flagsBits[TFHD_DEFAULT_SAMPLE_FLAGS_PRESENT_FLAG_INDEX]) {
            tfhd.defaultSampleFlags = d.getUint32(pos);
            pos += 4;
        }
        return tfhd;
    }, getMediaTimescaleFromMoov = function(ab) {
        var d = new DataView(ab), pos = 0, version, size, type, i, c;
        while (type !== "mdhd" && pos < d.byteLength) {
            size = d.getUint32(pos);
            pos += 4;
            type = "";
            for (i = 0; i < 4; i += 1) {
                c = d.getInt8(pos);
                type += String.fromCharCode(c);
                pos += 1;
            }
            if (type !== "moov" && type !== "trak" && type !== "mdia" && type !== "mdhd") {
                pos += size - 8;
            }
        }
        if (pos === d.byteLength) {
            throw "Error finding live offset.";
        }
        version = d.getUint8(pos);
        pos += 12;
        if (version == 1) {
            pos += 8;
        }
        return d.getUint32(pos, false);
    }, getSamplesInfo = function(ab) {
        var d = new DataView(ab), pos = 0, size, type, sampleDuration, sampleCompostionTimeOffset, sampleCount, sampleSize, sampleDts, sampleList, flags, flagsBits, i, c, moofPosition, tfhd, tfdt, dataOffset;
        tfhd = parseTFHD(ab);
        tfdt = parseTFDT(ab);
        while (type !== "trun" && pos < d.byteLength) {
            size = d.getUint32(pos);
            pos += 4;
            type = "";
            for (i = 0; i < 4; i += 1) {
                c = d.getInt8(pos);
                type += String.fromCharCode(c);
                pos += 1;
            }
            if (type !== "moof" && type !== "traf" && type !== "trun") {
                pos += size - 8;
            }
            if (type == "moof") {
                moofPosition = pos - 8;
            }
        }
        if (pos === d.byteLength) {
            throw "Error finding live offset.";
        }
        pos += 1;
        pos += 1;
        flags = d.getUint16(pos);
        pos += 2;
        flagsBits = intTobitArray(flags, 16);
        sampleCount = d.getUint32(pos);
        pos += 4;
        sampleDts = tfdt.base_media_decode_time;
        if (flagsBits[TRUN_DATA_OFFSET_PRESENT_FLAG_INDEX]) {
            dataOffset = d.getUint32(pos) + tfhd.baseDataOffset;
            pos += 4;
        } else {
            dataOffset = tfhd.baseDataOffset;
        }
        if (flagsBits[TRUN_FIRST_SAMPLE_FLAGS_PRESENT_FLAG_INDEX]) {
            pos += 4;
        }
        sampleList = [];
        for (i = 0; i < sampleCount; i++) {
            if (flagsBits[TRUN_SAMPLE_DURATION_PRESENT_FLAG_INDEX]) {
                sampleDuration = d.getUint32(pos);
                pos += 4;
            } else {
                sampleDuration = tfhd.sampleDuration;
            }
            if (flagsBits[TRUN_SAMPLE_SIZE_PRESENT_FLAG_INDEX]) {
                sampleSize = d.getUint32(pos);
                pos += 4;
            } else {
                sampleSize = tfhd.sampleSize;
            }
            if (flagsBits[TRUN_SAMPLE_FLAGS_PRESENT_FLAG_INDEX]) {
                pos += 4;
            }
            if (flagsBits[TRUN_SAMPLE_COMPOSITION_TIME_OFFSET_PRESENT_FLAG_INDEX]) {
                sampleCompostionTimeOffset = d.getUint32(pos);
                pos += 4;
            } else {
                sampleCompostionTimeOffset = 0;
            }
            sampleList.push({
                dts: sampleDts,
                cts: sampleDts + sampleCompostionTimeOffset,
                duration: sampleDuration,
                offset: moofPosition + dataOffset,
                size: sampleSize
            });
            dataOffset += sampleSize;
            sampleDts += sampleDuration;
        }
        return sampleList;
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
        log: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        loadFragment: loadFragment,
        parseTFDT: parseTFDT,
        parseSIDX: parseSIDX,
        getSamplesInfo: getSamplesInfo,
        getMediaTimescaleFromMoov: getMediaTimescaleFromMoov
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
    this.bandwidth = NaN;
    this.maxPlayoutRate = NaN;
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
    var errorEvent = MediaPlayer.events.ERROR;
    return {
        eventBus: undefined,
        capabilityError: function(err) {
            this.eventBus.dispatchEvent({
                type: errorEvent,
                error: "capability",
                event: err
            });
        },
        downloadError: function(id, url, request) {
            this.eventBus.dispatchEvent({
                type: errorEvent,
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
                type: errorEvent,
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
                type: errorEvent,
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
                type: errorEvent,
                error: "mediasource",
                event: err
            });
        },
        mediaKeySessionError: function(err) {
            this.eventBus.dispatchEvent({
                type: errorEvent,
                error: "key_session",
                event: err
            });
        },
        mediaKeyMessageError: function(err) {
            this.eventBus.dispatchEvent({
                type: errorEvent,
                error: "key_message",
                event: err
            });
        },
        mediaKeySystemSelectionError: function(err) {
            this.eventBus.dispatchEvent({
                type: errorEvent,
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
        var req = new XMLHttpRequest(), httpRequestMetrics = null, firstProgress = true, needFailureReport = true, lastTraceTime = null, self = this, handleLoaded = function(requestVO, succeeded) {
            needFailureReport = false;
            var currentTime = new Date(), bytes = req.response, latency, download;
            if (!requestVO.firstByteDate) {
                requestVO.firstByteDate = requestVO.requestStartDate;
            }
            requestVO.requestEndDate = currentTime;
            latency = requestVO.firstByteDate.getTime() - requestVO.requestStartDate.getTime();
            download = requestVO.requestEndDate.getTime() - requestVO.firstByteDate.getTime();
            self.log((succeeded ? "loaded " : "failed ") + requestVO.mediaType + ":" + requestVO.type + ":" + requestVO.startTime + " (" + req.status + ", " + latency + "ms, " + download + "ms)");
            httpRequestMetrics.tresponse = requestVO.firstByteDate;
            httpRequestMetrics.tfinish = requestVO.requestEndDate;
            httpRequestMetrics.responsecode = req.status;
            httpRequestMetrics.responseHeaders = req.getAllResponseHeaders();
            self.metricsModel.appendHttpTrace(httpRequestMetrics, currentTime, currentTime.getTime() - lastTraceTime.getTime(), [ bytes ? bytes.byteLength : 0 ]);
            lastTraceTime = currentTime;
        };
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
            if (event.lengthComputable) {
                request.bytesLoaded = event.loaded;
                request.bytesTotal = event.total;
            }
            self.metricsModel.appendHttpTrace(httpRequestMetrics, currentTime, currentTime.getTime() - lastTraceTime.getTime(), [ req.response ? req.response.byteLength : 0 ]);
            lastTraceTime = currentTime;
            self.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS, {
                request: request
            });
        };
        req.onload = function() {
            if (req.status < 200 || req.status > 299) return;
            handleLoaded(request, true);
            self.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, {
                request: request,
                response: req.response
            });
        };
        req.onloadend = req.onerror = function() {
            if (xhrs.indexOf(req) === -1) {
                return;
            } else {
                xhrs.splice(xhrs.indexOf(req), 1);
            }
            if (!needFailureReport) return;
            handleLoaded(request, false);
            if (remainingAttempts > 0) {
                self.log("Failed loading fragment: " + request.mediaType + ":" + request.type + ":" + request.startTime + ", retry in " + RETRY_INTERVAL + "ms" + " attempts: " + remainingAttempts);
                remainingAttempts--;
                setTimeout(function() {
                    doLoad.call(self, request, remainingAttempts);
                }, RETRY_INTERVAL);
            } else {
                self.log("Failed loading fragment: " + request.mediaType + ":" + request.type + ":" + request.startTime + " no retry attempts left");
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
        log: undefined,
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
    ENAME_LOADING_PROGRESS: "loadingProgress",
    ENAME_CHECK_FOR_EXISTENCE_COMPLETED: "checkForExistenceCompleted"
};

MediaPlayer.dependencies.LiveEdgeFinder = function() {
    "use strict";
    var isSearchStarted = false, searchStartTime = NaN, rules, liveEdge = null, ruleSet = MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES, onSearchCompleted = function(req) {
        var searchTime = (new Date().getTime() - searchStartTime) / 1e3;
        liveEdge = req.value;
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
        },
        getLiveEdge: function() {
            return liveEdge;
        },
        reset: function() {
            this.abortSearch();
            liveEdge = null;
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
        var base = "";
        if (url.indexOf("/") !== -1) {
            if (url.indexOf("?") !== -1) {
                url = url.substring(0, url.indexOf("?"));
            }
            base = url.substring(0, url.lastIndexOf("/") + 1);
        }
        return base;
    }, doLoad = function(url, remainingAttempts) {
        var baseUrl = parseBaseUrl(url), request = new XMLHttpRequest(), requestTime = new Date(), loadedTime = null, needFailureReport = true, manifest, onload, report, self = this;
        onload = function() {
            if (request.status < 200 || request.status > 299) {
                return;
            }
            needFailureReport = false;
            loadedTime = new Date();
            self.metricsModel.addHttpRequest("stream", null, "MPD", url, null, null, requestTime, loadedTime, null, request.status, null, null, request.getAllResponseHeaders());
            if (request.responseURL) {
                baseUrl = parseBaseUrl(request.responseURL);
                url = request.responseURL;
            }
            manifest = self.parser.parse(request.responseText, baseUrl);
            if (manifest) {
                manifest.url = url;
                manifest.loadedTime = loadedTime;
                self.metricsModel.addManifestUpdate("stream", manifest.type, requestTime, loadedTime, manifest.availabilityStartTime);
                self.xlinkController.resolveManifestOnLoad(manifest);
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
                self.log("Failed loading manifest: " + url + ", retry in " + RETRY_INTERVAL + "ms" + " attempts: " + remainingAttempts);
                remainingAttempts--;
                setTimeout(function() {
                    doLoad.call(self, url, remainingAttempts);
                }, RETRY_INTERVAL);
            } else {
                self.log("Failed loading manifest: " + url + " no retry attempts left");
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
    }, onXlinkReady = function(event) {
        this.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, {
            manifest: event.data.manifest
        });
    };
    return {
        log: undefined,
        parser: undefined,
        errHandler: undefined,
        metricsModel: undefined,
        requestModifierExt: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        xlinkController: undefined,
        load: function(url) {
            doLoad.call(this, url, RETRY_ATTEMPTS);
        },
        setup: function() {
            onXlinkReady = onXlinkReady.bind(this);
            this.xlinkController.subscribe(MediaPlayer.dependencies.XlinkController.eventList.ENAME_XLINK_READY, this, onXlinkReady);
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
    var refreshDelay = NaN, refreshTimer = null, isStopped = true, isUpdating = false, manifestLoader, clear = function() {
        if (refreshTimer !== null) {
            clearInterval(refreshTimer);
            refreshTimer = null;
        }
    }, start = function() {
        clear.call(this);
        if (!isNaN(refreshDelay)) {
            this.log("Refresh manifest in " + refreshDelay + " seconds.");
            refreshTimer = setTimeout(onRefreshTimer.bind(this), Math.min(refreshDelay * 1e3, Math.pow(2, 31) - 1), this);
        }
    }, update = function(manifest) {
        var delay, timeSinceLastUpdate;
        this.manifestModel.setValue(manifest);
        this.log("Manifest has been refreshed.");
        delay = this.manifestExt.getRefreshDelay(manifest);
        timeSinceLastUpdate = (new Date().getTime() - manifest.loadedTime.getTime()) / 1e3;
        refreshDelay = Math.max(delay - timeSinceLastUpdate, 0);
        this.notify(MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED, {
            manifest: manifest
        });
        if (!isStopped) {
            start.call(this);
        }
    }, onRefreshTimer = function() {
        var self = this, manifest, url;
        if (isStopped || isUpdating) return;
        isUpdating = true;
        manifest = self.manifestModel.getValue();
        url = manifest.url;
        if (manifest.hasOwnProperty("Location")) {
            url = manifest.Location;
        }
        manifestLoader.load(url);
    }, onManifestLoaded = function(e) {
        if (!e.error) {
            update.call(this, e.data.manifest);
        }
    }, onPlaybackStarted = function() {
        isStopped = false;
        start.call(this);
    }, onPlaybackPaused = function() {
        isStopped = true;
        clear.call(this);
    }, onStreamsComposed = function() {
        isUpdating = false;
    };
    return {
        log: undefined,
        system: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        notify: undefined,
        manifestModel: undefined,
        manifestExt: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED] = onStreamsComposed;
            this[MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED] = onManifestLoaded;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED] = onPlaybackStarted;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED] = onPlaybackPaused;
        },
        initialize: function(loader) {
            isUpdating = false;
            isStopped = true;
            manifestLoader = loader;
            manifestLoader.subscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, this);
        },
        setManifest: function(m) {
            update.call(this, m);
        },
        getManifestLoader: function() {
            return manifestLoader;
        },
        reset: function() {
            isStopped = true;
            isUpdating = false;
            clear.call(this);
            manifestLoader.unsubscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, this);
            refreshDelay = NaN;
        }
    };
};

MediaPlayer.dependencies.ManifestUpdater.prototype = {
    constructor: MediaPlayer.dependencies.ManifestUpdater
};

MediaPlayer.dependencies.ManifestUpdater.eventList = {
    ENAME_MANIFEST_UPDATED: "manifestUpdated"
};

MediaPlayer.dependencies.Notifier = function() {
    "use strict";
    var OBSERVABLE_ID_PROP = "observableId", system, id = 0, getId = function() {
        if (!this[OBSERVABLE_ID_PROP]) {
            id += 1;
            this[OBSERVABLE_ID_PROP] = "_id_" + id;
        }
        return this[OBSERVABLE_ID_PROP];
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
    var streamProcessors = [], isStreamActivated = false, isMediaInitialized = false, streamInfo = null, updateError = {}, isUpdating = false, isInitialized = false, protectionController, ownProtectionController = false, eventController = null, onProtectionError = function(event) {
        this.errHandler.mediaKeySessionError(event.data);
        this.log(event.data);
        this.reset();
    }, initializeMediaForType = function(type, mediaSource) {
        var self = this, mimeType = null, manifest = self.manifestModel.getValue(), codec, getCodecOrMimeType = function(mediaInfo) {
            return mediaInfo.codec;
        }, streamProcessor, mediaInfo = self.adapter.getMediaInfoForType(manifest, streamInfo, type);
        if (type === "text") {
            getCodecOrMimeType = function(mediaInfo) {
                mimeType = mediaInfo.mimeType;
                return mimeType;
            };
        }
        if (mediaInfo !== null) {
            var codecOrMime = getCodecOrMimeType.call(self, mediaInfo), contentProtectionData;
            if (type !== "text" && type !== "fragmentedText") {
                codec = codecOrMime;
                self.log(type + " codec: " + codec);
                contentProtectionData = mediaInfo.contentProtection;
                if (!!contentProtectionData && !self.capabilities.supportsEncryptedMedia()) {
                    self.errHandler.capabilityError("encryptedmedia");
                } else {
                    if (!self.capabilities.supportsCodec(self.videoModel.getElement(), codec)) {
                        var msg = type + "Codec (" + codec + ") is not supported.";
                        self.errHandler.manifestError(msg, "codec", manifest);
                        self.log(msg);
                        return;
                    }
                }
            }
            streamProcessor = self.system.getObject("streamProcessor");
            streamProcessors.push(streamProcessor);
            streamProcessor.initialize(mimeType || type, self.fragmentController, mediaSource, self, eventController);
            self.abrController.updateTopQualityIndex(mediaInfo);
            streamProcessor.updateMediaInfo(manifest, mediaInfo);
        } else {
            self.log("No " + type + " data.");
        }
    }, initializeMedia = function(mediaSource) {
        var self = this, manifest = self.manifestModel.getValue(), events;
        eventController = self.system.getObject("eventController");
        events = self.adapter.getEventsFor(manifest, streamInfo);
        eventController.addInlineEvents(events);
        isUpdating = true;
        initializeMediaForType.call(self, "video", mediaSource);
        initializeMediaForType.call(self, "audio", mediaSource);
        initializeMediaForType.call(self, "text", mediaSource);
        initializeMediaForType.call(self, "fragmentedText", mediaSource);
        createBuffers.call(self);
        isMediaInitialized = true;
        isUpdating = false;
        if (streamProcessors.length === 0) {
            var msg = "No streams to play.";
            self.errHandler.manifestError(msg, "nostreams", manifest);
            self.log(msg);
        } else {
            self.liveEdgeFinder.initialize(streamProcessors[0]);
            self.liveEdgeFinder.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, self.playbackController);
        }
        checkIfInitializationCompleted.call(this);
    }, checkIfInitializationCompleted = function() {
        var self = this, ln = streamProcessors.length, hasError = !!updateError.audio || !!updateError.video, error = hasError ? new MediaPlayer.vo.Error(MediaPlayer.dependencies.Stream.DATA_UPDATE_FAILED_ERROR_CODE, "Data update failed", null) : null, i = 0;
        for (i; i < ln; i += 1) {
            if (streamProcessors[i].isUpdating() || isUpdating) return;
        }
        isInitialized = true;
        self.eventBus.dispatchEvent({
            type: MediaPlayer.events.STREAM_INITIALIZED,
            data: {
                streamInfo: streamInfo
            }
        });
        self.notify(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, {
            streamInfo: streamInfo
        }, error);
        if (!isMediaInitialized || isStreamActivated) return;
        protectionController.init(self.manifestModel.getValue(), getMediaInfo.call(this, "audio"), getMediaInfo.call(this, "video"));
        isStreamActivated = true;
    }, getMediaInfo = function(type) {
        var ln = streamProcessors.length, mediaCtrl = null;
        for (var i = 0; i < ln; i += 1) {
            mediaCtrl = streamProcessors[i];
            if (mediaCtrl.getType() === type) return mediaCtrl.getMediaInfo();
        }
        return null;
    }, createBuffers = function() {
        for (var i = 0, ln = streamProcessors.length; i < ln; i += 1) {
            streamProcessors[i].createBuffer();
        }
    }, onBufferingCompleted = function() {
        var processors = getAudioVideoProcessors(), ln = processors.length, i = 0;
        for (i; i < ln; i += 1) {
            if (!processors[i].isBufferingCompleted()) return;
        }
        this.notify(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED, {
            streamInfo: streamInfo
        });
    }, onDataUpdateCompleted = function(e) {
        var type = e.sender.streamProcessor.getType();
        updateError[type] = e.error;
        checkIfInitializationCompleted.call(this);
    }, getAudioVideoProcessors = function() {
        var arr = [], i = 0, ln = streamProcessors.length, type, controller;
        for (i; i < ln; i += 1) {
            controller = streamProcessors[i];
            type = controller.getType();
            if (type === "audio" || type === "video") {
                arr.push(controller);
            }
        }
        return arr;
    }, updateData = function(updatedStreamInfo) {
        var self = this, ln = streamProcessors.length, manifest = self.manifestModel.getValue(), i = 0, mediaInfo, events, controller;
        isStreamActivated = false;
        streamInfo = updatedStreamInfo;
        self.log("Manifest updated... set new data on buffers.");
        if (eventController) {
            events = self.adapter.getEventsFor(manifest, streamInfo);
            eventController.addInlineEvents(events);
        }
        isUpdating = true;
        isInitialized = false;
        for (i; i < ln; i += 1) {
            controller = streamProcessors[i];
            mediaInfo = self.adapter.getMediaInfoForType(manifest, streamInfo, controller.getType());
            this.abrController.updateTopQualityIndex(mediaInfo);
            controller.updateMediaInfo(manifest, mediaInfo);
        }
        isUpdating = false;
        checkIfInitializationCompleted.call(self);
    };
    return {
        system: undefined,
        eventBus: undefined,
        manifestModel: undefined,
        sourceBufferExt: undefined,
        adapter: undefined,
        videoModel: undefined,
        fragmentController: undefined,
        playbackController: undefined,
        capabilities: undefined,
        log: undefined,
        errHandler: undefined,
        liveEdgeFinder: undefined,
        abrController: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED] = onBufferingCompleted;
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
            this[MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR] = onProtectionError.bind(this);
        },
        initialize: function(strmInfo, protectionCtrl, protectionData) {
            streamInfo = strmInfo;
            if (this.capabilities.supportsEncryptedMedia()) {
                if (!protectionCtrl) {
                    protectionCtrl = this.system.getObject("protectionController");
                    ownProtectionController = true;
                }
                protectionController = protectionCtrl;
                protectionController.subscribe(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR, this);
                protectionController.setMediaElement(this.videoModel.getElement());
                if (protectionData) {
                    protectionController.setProtectionData(protectionData);
                }
            }
        },
        activate: function(mediaSource) {
            if (!isStreamActivated) {
                initializeMedia.call(this, mediaSource);
            } else {
                createBuffers.call(this);
            }
        },
        deactivate: function() {
            var ln = streamProcessors.length, i = 0;
            for (i; i < ln; i += 1) {
                streamProcessors[i].reset();
            }
            streamProcessors = [];
            isStreamActivated = false;
            isMediaInitialized = false;
            this.resetEventController();
        },
        reset: function(errored) {
            this.playbackController.pause();
            var ln = streamProcessors.length, i = 0, processors;
            for (i; i < ln; i += 1) {
                processors = streamProcessors[i];
                processors.reset(errored);
                processors = null;
            }
            if (!!eventController) {
                eventController.reset();
            }
            streamProcessors = [];
            isUpdating = false;
            isInitialized = false;
            if (this.fragmentController) {
                this.fragmentController.reset();
            }
            this.fragmentController = undefined;
            this.liveEdgeFinder.abortSearch();
            this.liveEdgeFinder.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, this.playbackController);
            if (protectionController) {
                protectionController.unsubscribe(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR, this);
                if (ownProtectionController) {
                    protectionController.teardown();
                    protectionController = null;
                    ownProtectionController = false;
                }
            }
            isMediaInitialized = false;
            isStreamActivated = false;
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
        getStreamInfo: function() {
            return streamInfo;
        },
        hasMedia: function(type) {
            return getMediaInfo.call(this, type) !== null;
        },
        getBitrateListFor: function(type) {
            var mediaInfo = getMediaInfo.call(this, type);
            return this.abrController.getBitrateList(mediaInfo);
        },
        startEventController: function() {
            eventController.start();
        },
        resetEventController: function() {
            eventController.reset();
        },
        isActivated: function() {
            return isStreamActivated;
        },
        isInitialized: function() {
            return isInitialized;
        },
        updateData: updateData
    };
};

MediaPlayer.dependencies.Stream.prototype = {
    constructor: MediaPlayer.dependencies.Stream
};

MediaPlayer.dependencies.Stream.DATA_UPDATE_FAILED_ERROR_CODE = 1;

MediaPlayer.dependencies.Stream.eventList = {
    ENAME_STREAM_UPDATED: "streamUpdated",
    ENAME_STREAM_BUFFERING_COMPLETED: "streamBufferingCompleted"
};

MediaPlayer.dependencies.StreamProcessor = function() {
    "use strict";
    var isDynamic, stream = null, mediaInfo = null, type = null, eventController = null, createBufferControllerForType = function(type) {
        var self = this, controllerName = type === "video" || type === "audio" || type === "fragmentedText" ? "bufferController" : "textController";
        return self.system.getObject(controllerName);
    };
    return {
        system: undefined,
        videoModel: undefined,
        indexHandler: undefined,
        liveEdgeFinder: undefined,
        timelineConverter: undefined,
        abrController: undefined,
        playbackController: undefined,
        baseURLExt: undefined,
        adapter: undefined,
        manifestModel: undefined,
        initialize: function(typeValue, fragmentController, mediaSource, streamValue, eventControllerValue) {
            var self = this, trackController = self.system.getObject("trackController"), scheduleController = self.system.getObject("scheduleController"), liveEdgeFinder = self.liveEdgeFinder, abrController = self.abrController, indexHandler = self.indexHandler, baseUrlExt = self.baseURLExt, playbackController = self.playbackController, fragmentModel, fragmentLoader = this.system.getObject("fragmentLoader"), bufferController = createBufferControllerForType.call(self, typeValue);
            stream = streamValue;
            type = typeValue;
            eventController = eventControllerValue;
            isDynamic = stream.getStreamInfo().manifestInfo.isDynamic;
            self.bufferController = bufferController;
            self.scheduleController = scheduleController;
            self.trackController = trackController;
            self.fragmentController = fragmentController;
            self.fragmentLoader = fragmentLoader;
            trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, bufferController);
            fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED, bufferController);
            trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, stream);
            if (type === "video" || type === "audio" || type === "fragmentedText") {
                abrController.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, bufferController);
                abrController.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, trackController);
                abrController.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, scheduleController);
                liveEdgeFinder.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, this.timelineConverter);
                liveEdgeFinder.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, trackController);
                liveEdgeFinder.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, scheduleController);
                trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED, scheduleController);
                trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, scheduleController);
                stream.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, scheduleController);
                trackController.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, playbackController);
                fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED, bufferController);
                fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START, scheduleController);
                fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, scheduleController);
                fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, bufferController);
                fragmentController.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, scheduleController.scheduleRulesCollection.bufferLevelRule);
                bufferController.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, playbackController);
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
                playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, abrController.abrRulesCollection.insufficientBufferRule);
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
            indexHandler.setCurrentTime(playbackController.getStreamStartTime(this.getStreamInfo()));
            bufferController.initialize(type, mediaSource, self);
            scheduleController.initialize(type, this);
            abrController.initialize(type, this);
            fragmentModel = this.getFragmentModel();
            fragmentModel.setLoader(fragmentLoader);
            fragmentModel.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED, fragmentController);
            fragmentModel.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, fragmentController);
            fragmentModel.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED, fragmentController);
            fragmentModel.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, scheduleController);
            fragmentLoader.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, fragmentModel);
            fragmentLoader.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS, abrController);
            if (type === "video" || type === "audio" || type === "fragmentedText") {
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
        getABRController: function() {
            return this.abrController;
        },
        getFragmentLoader: function() {
            return this.fragmentLoader;
        },
        getFragmentModel: function() {
            return this.scheduleController.getFragmentModel();
        },
        getStreamInfo: function() {
            return stream.getStreamInfo();
        },
        updateMediaInfo: function(manifest, newMediaInfo) {
            if (newMediaInfo !== mediaInfo && (!newMediaInfo || !mediaInfo || newMediaInfo.type === mediaInfo.type)) {
                mediaInfo = newMediaInfo;
            }
            this.adapter.updateData(manifest, this);
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
            return this.adapter.getCurrentTrackInfo(this.manifestModel.getValue(), this.trackController);
        },
        getTrackForQuality: function(quality) {
            return this.adapter.getTrackInfoForQuality(this.manifestModel.getValue(), this.trackController, quality);
        },
        isBufferingCompleted: function() {
            return this.bufferController.isBufferingCompleted();
        },
        createBuffer: function() {
            return this.bufferController.getBuffer() || this.bufferController.createBuffer(mediaInfo);
        },
        isDynamic: function() {
            return isDynamic;
        },
        reset: function(errored) {
            var self = this, bufferController = self.bufferController, trackController = self.trackController, scheduleController = self.scheduleController, liveEdgeFinder = self.liveEdgeFinder, fragmentController = self.fragmentController, abrController = self.abrController, playbackController = self.playbackController, indexHandler = this.indexHandler, baseUrlExt = this.baseURLExt, fragmentModel = this.getFragmentModel(), fragmentLoader = this.fragmentLoader;
            abrController.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, bufferController);
            abrController.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, trackController);
            abrController.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, scheduleController);
            liveEdgeFinder.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, this.timelineConverter);
            liveEdgeFinder.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, scheduleController);
            liveEdgeFinder.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, trackController);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED, scheduleController);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, bufferController);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, scheduleController);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, stream);
            trackController.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, playbackController);
            stream.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, scheduleController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED, bufferController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED, bufferController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START, scheduleController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, scheduleController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, bufferController);
            fragmentController.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, scheduleController.scheduleRulesCollection.bufferLevelRule);
            bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, playbackController);
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
            playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, abrController.abrRulesCollection.insufficientBufferRule);
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
            fragmentLoader.unsubscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS, abrController);
            fragmentModel.reset();
            indexHandler.reset();
            this.bufferController.reset(errored);
            this.scheduleController.reset();
            this.bufferController = null;
            this.scheduleController = null;
            this.trackController = null;
            this.videoModel = null;
            this.fragmentController = null;
            isDynamic = undefined;
            stream = null;
            mediaInfo = null;
            type = null;
            eventController = null;
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
        var passed = false, hasTt = ttml.hasOwnProperty("tt"), hasHead = hasTt ? ttml.tt.hasOwnProperty("head") : false, hasLayout = hasHead ? ttml.tt.head.hasOwnProperty("layout") : false, hasStyling = hasHead ? ttml.tt.head.hasOwnProperty("styling") : false, hasBody = hasTt ? ttml.tt.hasOwnProperty("body") : false;
        if (hasTt && hasHead && hasLayout && hasStyling && hasBody) {
            passed = true;
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
        var captionArray = [], converter = new X2JS([], "", false), errorMsg, cues, cue, startTime, endTime, nsttp, text, i, j;
        ttml = converter.xml_str2json(data);
        if (!passStructuralConstraints()) {
            errorMsg = "TTML document has incorrect structure";
            throw errorMsg;
        }
        nsttp = getNamespacePrefix(ttml.tt, "http://www.w3.org/ns/ttml#parameter");
        if (ttml.tt.hasOwnProperty(nsttp + ":frameRate")) {
            ttml.tt.frameRate = parseInt(ttml.tt[nsttp + ":frameRate"], 10);
        }
        if (ttml.tt.body.div_asArray) {
            cues = ttml.tt.body.div_asArray[0].p_asArray;
        } else {
            cues = ttml.tt.body.p_asArray;
        }
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
            if (cue["smpte:backgroundImage"] !== undefined) {
                var images = ttml.tt.head.metadata.image_asArray;
                for (j = 0; j < images.length; j += 1) {
                    if ("#" + images[j]["xml:id"] == cue["smpte:backgroundImage"]) {
                        captionArray.push({
                            start: startTime,
                            end: endTime,
                            id: images[j]["xml:id"],
                            data: "data:image/" + images[j].imagetype.toLowerCase() + ";base64, " + images[j].__text,
                            type: "image"
                        });
                    }
                }
            } else {
                if (cue.span_asArray) {
                    text = cue.span_asArray[0].__text;
                } else {
                    text = cue.__text;
                }
                captionArray.push({
                    start: startTime,
                    end: endTime,
                    data: text,
                    type: "text"
                });
            }
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
        videoModel: undefined,
        eventBus: undefined,
        errHandler: undefined,
        initialize: function(type, bufferController) {
            mimeType = type;
            mediaInfo = bufferController.streamProcessor.getCurrentTrack().mediaInfo;
            this.buffered = this.system.getObject("customTimeRanges");
            this.initializationSegmentReceived = false;
            this.timescale = 9e4;
        },
        append: function(bytes, chunk) {
            var self = this, result, label, lang, samplesInfo, i, ccContent;
            if (mimeType == "fragmentedText") {
                var fragmentExt;
                if (!this.initializationSegmentReceived) {
                    this.initializationSegmentReceived = true;
                    label = mediaInfo.id;
                    lang = mediaInfo.lang;
                    this.textTrackExtensions = self.getTextTrackExtensions();
                    this.textTrackExtensions.addTextTrack(self.videoModel.getElement(), result, label, lang, true);
                    self.eventBus.dispatchEvent({
                        type: MediaPlayer.events.TEXT_TRACK_ADDED
                    });
                    fragmentExt = self.system.getObject("fragmentExt");
                    this.timescale = fragmentExt.getMediaTimescaleFromMoov(bytes.buffer);
                } else {
                    fragmentExt = self.system.getObject("fragmentExt");
                    samplesInfo = fragmentExt.getSamplesInfo(bytes.buffer);
                    for (i = 0; i < samplesInfo.length; i++) {
                        if (!this.firstSubtitleStart) {
                            this.firstSubtitleStart = samplesInfo[0].cts - chunk.start * this.timescale;
                        }
                        samplesInfo[i].cts -= this.firstSubtitleStart;
                        this.buffered.add(samplesInfo[i].cts / this.timescale, (samplesInfo[i].cts + samplesInfo[i].duration) / this.timescale);
                        ccContent = window.UTF8.decode(new Uint8Array(bytes.buffer.slice(samplesInfo[i].offset, samplesInfo[i].offset + samplesInfo[i].size)));
                        var parser = this.system.getObject("ttmlParser");
                        try {
                            result = parser.parse(ccContent);
                            this.textTrackExtensions.addCaptions(this.firstSubtitleStart / this.timescale, result);
                        } catch (e) {}
                    }
                }
            } else {
                ccContent = window.UTF8.decode(bytes);
                try {
                    result = self.getParser().parse(ccContent);
                    label = mediaInfo.id;
                    lang = mediaInfo.lang;
                    self.getTextTrackExtensions().addTextTrack(self.videoModel.getElement(), result, label, lang, true);
                    self.eventBus.dispatchEvent({
                        type: MediaPlayer.events.TEXT_TRACK_ADDED
                    });
                } catch (e) {
                    self.errHandler.closedCaptionsError(e, "parse", ccContent);
                }
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
    var HTTP_TIMEOUT_MS = 5e3, offsetToDeviceTimeMs = 0, isSynchronizing = false, isInitialised = false, useManifestDateHeaderTimeSource, setIsSynchronizing = function(value) {
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
    }, checkForDateHeader = function() {
        var metrics = this.metricsModel.getReadOnlyMetricsFor("stream"), dateHeaderValue = this.metricsExt.getLatestMPDRequestHeaderValueByID(metrics, "Date"), dateHeaderTime = dateHeaderValue !== null ? new Date(dateHeaderValue).getTime() : Number.NaN;
        if (!isNaN(dateHeaderTime)) {
            setOffsetMs(dateHeaderTime - new Date().getTime());
            completeTimeSyncSequence.call(this, false, dateHeaderTime / 1e3, offsetToDeviceTimeMs);
        } else {
            completeTimeSyncSequence.call(this, true);
        }
    }, completeTimeSyncSequence = function(failed, time, offset) {
        setIsSynchronizing(false);
        this.notify(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, {
            time: time,
            offset: offset
        }, failed ? new MediaPlayer.vo.Error(MediaPlayer.dependencies.TimeSyncController.TIME_SYNC_FAILED_ERROR_CODE) : null);
    }, attemptSync = function(sources, sourceIndex) {
        var self = this, index = sourceIndex || 0, source = sources[index], onComplete = function(time, offset) {
            var failed = !time || !offset;
            if (failed && useManifestDateHeaderTimeSource) {
                checkForDateHeader.call(self);
            } else {
                completeTimeSyncSequence.call(self, failed, time, offset);
            }
        };
        setIsSynchronizing(true);
        if (source) {
            if (handlers.hasOwnProperty(source.schemeIdUri)) {
                handlers[source.schemeIdUri](source.value, function(serverTime) {
                    var deviceTime = new Date().getTime(), offset = serverTime - deviceTime;
                    setOffsetMs(offset);
                    self.log("Local time:      " + new Date(deviceTime));
                    self.log("Server time:     " + new Date(serverTime));
                    self.log("Difference (ms): " + offset);
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
        log: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        getOffsetToDeviceTimeMs: function() {
            return getOffsetMs();
        },
        initialize: function(timingSources, useManifestDateHeader) {
            useManifestDateHeaderTimeSource = useManifestDateHeader;
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
    var regExNewLine = /(?:\r\n|\r|\n)/gm, regExToken = /-->/, regExWhiteSpace = /(^[\s]+|[\s]+$)/g, regExWhiteSpaceWordBoundry = /\s\b/g, convertCuePointTimes = function(time) {
        var timeArray = time.split(":"), len = timeArray.length - 1;
        time = parseInt(timeArray[len - 1], 10) * 60 + parseFloat(timeArray[len]);
        if (len === 2) {
            time += parseInt(timeArray[0], 10) * 3600;
        }
        return time;
    }, parseItemAttributes = function(data) {
        var vttCuePoints = data.split(regExToken);
        var arr = vttCuePoints[1].split(regExWhiteSpaceWordBoundry);
        arr.shift();
        vttCuePoints[1] = arr[0];
        arr.shift();
        return {
            cuePoints: vttCuePoints,
            styles: getCaptionStyles(arr)
        };
    }, getCaptionStyles = function(arr) {
        var styleObject = {};
        arr.forEach(function(element) {
            if (element.split(/:/).length > 1) {
                var val = element.split(/:/)[1];
                if (val && val.search(/%/) != -1) {
                    val = parseInt(val.replace(/%/, ""));
                }
                if (element.match(/align/) || element.match(/A/)) {
                    styleObject.align = val;
                }
                if (element.match(/line/) || element.match(/L/)) {
                    styleObject.line = val;
                }
                if (element.match(/position/) || element.match(/P/)) {
                    styleObject.position = val;
                }
                if (element.match(/size/) || element.match(/S/)) {
                    styleObject.size = val;
                }
            }
        });
        return styleObject;
    }, getSublines = function(data, idx) {
        var lineCount, i = idx, subline = "", lineData = "";
        while (data[i] !== "" && i < data.length) {
            i++;
        }
        lineCount = i - idx;
        if (lineCount > 1) {
            for (var j = 0; j < lineCount; j++) {
                lineData = data[idx + j];
                if (!lineData.match(regExToken)) {
                    subline += lineData;
                    if (j !== lineCount - 1) {
                        subline += "\n";
                    }
                } else {
                    subline = "";
                    break;
                }
            }
        } else {
            lineData = data[idx];
            if (!lineData.match(regExToken)) subline = lineData;
        }
        return decodeURI(subline);
    };
    return {
        log: undefined,
        parse: function(data) {
            var captionArray = [], len, lastStartTime;
            data = data.split(regExNewLine);
            len = data.length;
            lastStartTime = -1;
            for (var i = 0; i < len; i++) {
                var item = data[i];
                if (item.length > 0 && item !== "WEBVTT") {
                    if (item.match(regExToken)) {
                        var attributes = parseItemAttributes(item), cuePoints = attributes.cuePoints, styles = attributes.styles, text = getSublines(data, i + 1), startTime = convertCuePointTimes(cuePoints[0].replace(regExWhiteSpace, "")), endTime = convertCuePointTimes(cuePoints[1].replace(regExWhiteSpace, ""));
                        if (!Number.isNaN(startTime) && !Number.isNaN(endTime) && startTime >= lastStartTime && endTime > startTime) {
                            if (text !== "") {
                                lastStartTime = startTime;
                                captionArray.push({
                                    start: startTime,
                                    end: endTime,
                                    data: text,
                                    styles: styles
                                });
                            } else {
                                this.log("Skipping cue due to empty/malformed cue text");
                            }
                        } else {
                            this.log("Skipping cue due to incorrect cue timing");
                        }
                    }
                }
            }
            return captionArray;
        }
    };
};

MediaPlayer.dependencies.XlinkLoader = function() {
    "use strict";
    var RETRY_ATTEMPTS = 1, RETRY_INTERVAL = 500, RESOLVE_TO_ZERO = "urn:mpeg:dash:resolve-to-zero:2013", doLoad = function(url, element, resolveObject, remainingAttempts) {
        var request = new XMLHttpRequest(), self = this, report, onload, content, loadedTime = null, needFailureReport = true, requestTime = new Date();
        onload = function() {
            if (request.status < 200 || request.status > 299) {
                return;
            }
            needFailureReport = false;
            self.metricsModel.addHttpRequest("stream", null, "XLink", url, null, null, requestTime, loadedTime, null, request.status, null, null, request.getAllResponseHeaders());
            content = request.responseText;
            element.resolved = true;
            if (content) {
                element.resolvedContent = content;
                self.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED, {
                    element: element,
                    resolveObject: resolveObject
                });
            } else {
                element.resolvedContent = null;
                self.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED, {
                    element: element,
                    resolveObject: resolveObject
                }, new MediaPlayer.vo.Error(null, "Failed loading Xlink element: " + url, null));
            }
        };
        report = function() {
            if (!needFailureReport) {
                return;
            }
            needFailureReport = false;
            self.metricsModel.addHttpRequest("stream", null, "xlink", url, null, null, requestTime, new Date(), request.status, null, null, request.getAllResponseHeaders());
            if (remainingAttempts > 0) {
                console.log("Failed loading xLink content: " + url + ", retry in " + RETRY_INTERVAL + "ms" + " attempts: " + remainingAttempts);
                remainingAttempts--;
                setTimeout(function() {
                    doLoad.call(self, url, element, resolveObject, remainingAttempts);
                }, RETRY_INTERVAL);
            } else {
                console.log("Failed loading Xlink content: " + url + " no retry attempts left");
                self.errHandler.downloadError("xlink", url, request);
                element.resolvedContent = null;
                self.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED, {
                    element: element,
                    resolveObject: resolveObject
                }, new Error("Failed loading xlink Element: " + url + " no retry attempts left"));
            }
        };
        try {
            request.onload = onload;
            request.onloadend = report;
            request.onerror = report;
            request.open("GET", self.requestModifierExt.modifyRequestURL(url), true);
            request.send();
        } catch (e) {
            console.log("Error");
            request.onerror();
        }
    };
    return {
        errHandler: undefined,
        metricsModel: undefined,
        requestModifierExt: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        load: function(url, element, resolveObject) {
            if (url === RESOLVE_TO_ZERO) {
                element.resolvedContent = null;
                element.resolved = true;
                this.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED, {
                    element: element,
                    resolveObject: resolveObject
                });
            } else {
                doLoad.call(this, url, element, resolveObject, RETRY_ATTEMPTS);
            }
        }
    };
};

MediaPlayer.dependencies.XlinkLoader.prototype = {
    constructor: MediaPlayer.dependencies.XlinkLoader
};

MediaPlayer.dependencies.XlinkLoader.eventList = {
    ENAME_XLINKELEMENT_LOADED: "xlinkElementLoaded"
};

MediaPlayer.dependencies.AbrController = function() {
    "use strict";
    var autoSwitchBitrate = true, topQualities = {}, qualityDict = {}, confidenceDict = {}, bitrateDict = {}, streamProcessorDict = {}, abandonmentStateDict = {}, abandonmentTimeout, getInternalQuality = function(type, id) {
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
    }, getInitialBitrate = function(type) {
        return bitrateDict[type];
    }, setInitialBitrate = function(type, value) {
        bitrateDict[type] = value;
    }, getMaxBitrate = function(type) {
        if (bitrateDict.hasOwnProperty("max") && bitrateDict.max.hasOwnProperty(type)) {
            return bitrateDict.max[type];
        }
        return NaN;
    }, setMaxBitrate = function(type, value) {
        bitrateDict.max = bitrateDict.max || {};
        bitrateDict.max[type] = value;
    }, getTopQualityIndex = function(type, id) {
        var idx;
        topQualities[id] = topQualities[id] || {};
        if (!topQualities[id].hasOwnProperty(type)) {
            topQualities[id][type] = 0;
        }
        idx = checkMaxBitrate.call(this, topQualities[id][type], type);
        return idx;
    }, checkMaxBitrate = function(idx, type) {
        var maxBitrate = getMaxBitrate(type);
        if (isNaN(maxBitrate)) {
            return idx;
        }
        var maxIdx = this.getQualityForBitrate(streamProcessorDict[type].getMediaInfo(), maxBitrate);
        return Math.min(idx, maxIdx);
    }, onFragmentLoadProgress = function(evt) {
        if (MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD === 0) {
            var self = this, type = evt.data.request.mediaType, rules = self.abrRulesCollection.getRules(MediaPlayer.rules.ABRRulesCollection.prototype.ABANDON_FRAGMENT_RULES), schduleController = streamProcessorDict[type].getScheduleController(), fragmentModel = schduleController.getFragmentModel(), callback = function(switchRequest) {
                function setupTimeout(type) {
                    abandonmentTimeout = setTimeout(function() {
                        self.setAbandonmentStateFor(type, MediaPlayer.dependencies.AbrController.ALLOW_LOAD);
                    }, MediaPlayer.dependencies.AbrController.ABANDON_TIMEOUT);
                }
                if (switchRequest.confidence === MediaPlayer.rules.SwitchRequest.prototype.STRONG) {
                    var requests = fragmentModel.getRequests({
                        state: MediaPlayer.dependencies.FragmentModel.states.LOADING
                    }), newQuality = switchRequest.value, currentQuality = self.getQualityFor(type, self.streamController.getActiveStreamInfo());
                    if (newQuality < currentQuality) {
                        fragmentModel.abortRequests();
                        self.setAbandonmentStateFor(type, MediaPlayer.dependencies.AbrController.ABANDON_LOAD);
                        self.setPlaybackQuality(type, self.streamController.getActiveStreamInfo(), newQuality);
                        schduleController.replaceCanceledRequests(requests);
                        setupTimeout(type);
                    }
                }
            };
            self.rulesController.applyRules(rules, streamProcessorDict[type], callback, evt, function(currentValue, newValue) {
                return newValue;
            });
        }
    };
    return {
        log: undefined,
        abrRulesCollection: undefined,
        rulesController: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        streamController: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS] = onFragmentLoadProgress;
        },
        initialize: function(type, streamProcessor) {
            streamProcessorDict[type] = streamProcessor;
            abandonmentStateDict[type] = abandonmentStateDict[type] || {};
            abandonmentStateDict[type].state = MediaPlayer.dependencies.AbrController.ALLOW_LOAD;
        },
        getAutoSwitchBitrate: function() {
            return autoSwitchBitrate;
        },
        setAutoSwitchBitrate: function(value) {
            autoSwitchBitrate = value;
        },
        getPlaybackQuality: function(streamProcessor) {
            var self = this, type = streamProcessor.getType(), streamId = streamProcessor.getStreamInfo().id, quality, oldQuality, rules, confidence, callback = function(res) {
                var topQualityIdx = getTopQualityIndex.call(self, type, streamId);
                quality = res.value;
                confidence = res.confidence;
                if (quality < 0) {
                    quality = 0;
                }
                if (quality > topQualityIdx) {
                    quality = topQualityIdx;
                }
                oldQuality = getInternalQuality(type, streamId);
                if (quality === oldQuality || abandonmentStateDict[type].state === MediaPlayer.dependencies.AbrController.ABANDON_LOAD && quality > oldQuality) return;
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
            if (newPlaybackQuality !== quality && newPlaybackQuality >= 0 && newPlaybackQuality <= getTopQualityIndex.call(this, type, id)) {
                setInternalQuality(type, streamInfo.id, newPlaybackQuality);
                this.notify(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, {
                    mediaType: type,
                    streamInfo: streamInfo,
                    oldQuality: quality,
                    newQuality: newPlaybackQuality
                });
            }
        },
        setAbandonmentStateFor: function(type, state) {
            abandonmentStateDict[type].state = state;
        },
        getAbandonmentStateFor: function(type) {
            return abandonmentStateDict[type].state;
        },
        getQualityFor: function(type, streamInfo) {
            return getInternalQuality(type, streamInfo.id);
        },
        getConfidenceFor: function(type, streamInfo) {
            return getInternalConfidence(type, streamInfo.id);
        },
        setInitialBitrateFor: function(type, value) {
            setInitialBitrate(type, value);
        },
        getInitialBitrateFor: function(type) {
            return getInitialBitrate(type);
        },
        setMaxAllowedBitrateFor: function(type, value) {
            setMaxBitrate(type, value);
        },
        getMaxAllowedBitrateFor: function(type) {
            return getMaxBitrate(type);
        },
        getQualityForBitrate: function(mediaInfo, bitrate) {
            var bitrateList = this.getBitrateList(mediaInfo), ln = bitrateList.length, bitrateInfo;
            for (var i = 0; i < ln; i += 1) {
                bitrateInfo = bitrateList[i];
                if (bitrate * 1e3 <= bitrateInfo.bitrate) {
                    return Math.max(i - 1, 0);
                }
            }
            return ln - 1;
        },
        getBitrateList: function(mediaInfo) {
            if (!mediaInfo || !mediaInfo.bitrateList) return null;
            var bitrateList = mediaInfo.bitrateList, type = mediaInfo.type, infoList = [], bitrateInfo;
            for (var i = 0, ln = bitrateList.length; i < ln; i += 1) {
                bitrateInfo = new MediaPlayer.vo.BitrateInfo();
                bitrateInfo.mediaType = type;
                bitrateInfo.qualityIndex = i;
                bitrateInfo.bitrate = bitrateList[i];
                infoList.push(bitrateInfo);
            }
            return infoList;
        },
        updateTopQualityIndex: function(mediaInfo) {
            var type = mediaInfo.type, streamId = mediaInfo.streamInfo.id, max;
            max = mediaInfo.trackCount - 1;
            setTopQualityIndex(type, streamId, max);
            return max;
        },
        isPlayingAtTopQuality: function(streamInfo) {
            var self = this, isAtTop, streamId = streamInfo.id, audioQuality = self.getQualityFor("audio", streamInfo), videoQuality = self.getQualityFor("video", streamInfo);
            isAtTop = audioQuality === getTopQualityIndex.call(this, "audio", streamId) && videoQuality === getTopQualityIndex.call(this, "video", streamId);
            return isAtTop;
        },
        getTopQualityIndexFor: getTopQualityIndex,
        reset: function() {
            autoSwitchBitrate = true;
            topQualities = {};
            qualityDict = {};
            confidenceDict = {};
            streamProcessorDict = {};
            abandonmentStateDict = {};
            clearTimeout(abandonmentTimeout);
            abandonmentTimeout = null;
        }
    };
};

MediaPlayer.dependencies.AbrController.prototype = {
    constructor: MediaPlayer.dependencies.AbrController
};

MediaPlayer.dependencies.AbrController.eventList = {
    ENAME_QUALITY_CHANGED: "qualityChanged"
};

MediaPlayer.dependencies.AbrController.DEFAULT_VIDEO_BITRATE = 1e3;

MediaPlayer.dependencies.AbrController.DEFAULT_AUDIO_BITRATE = 100;

MediaPlayer.dependencies.AbrController.ABANDON_LOAD = "abandonload";

MediaPlayer.dependencies.AbrController.ALLOW_LOAD = "allowload";

MediaPlayer.dependencies.AbrController.ABANDON_TIMEOUT = 1e4;

MediaPlayer.dependencies.AbrController.BANDWIDTH_SAFETY = .9;

MediaPlayer.dependencies.BufferController = function() {
    "use strict";
    var STALL_THRESHOLD = .5, requiredQuality = 0, currentQuality = -1, isBufferingCompleted = false, bufferLevel = 0, bufferTarget = 0, criticalBufferLevel = Number.POSITIVE_INFINITY, mediaSource, maxAppendedIndex = -1, lastIndex = -1, type, buffer = null, minBufferTime, hasSufficientBuffer = null, appendedBytesInfo, isBufferLevelOutrun = false, isAppendingInProgress = false, inbandEventFound = false, createBuffer = function(mediaInfo) {
        if (!mediaInfo || !mediaSource || !this.streamProcessor) return null;
        var sourceBuffer = null;
        try {
            sourceBuffer = this.sourceBufferExt.createSourceBuffer(mediaSource, mediaInfo);
            if (sourceBuffer && sourceBuffer.hasOwnProperty("initialize")) {
                sourceBuffer.initialize(type, this);
            }
        } catch (e) {
            this.errHandler.mediaSourceError("Error creating " + type + " source buffer.");
        }
        this.setBuffer(sourceBuffer);
        updateBufferTimestampOffset.call(this, this.streamProcessor.getTrackForQuality(requiredQuality).MSETimeOffset);
        return sourceBuffer;
    }, isActive = function() {
        var thisStreamId = this.streamProcessor.getStreamInfo().id, activeStreamId = this.streamController.getActiveStreamInfo().id;
        return thisStreamId === activeStreamId;
    }, waitingForInit = function() {
        var loadingReqs = this.streamProcessor.getFragmentModel().getRequests({
            state: MediaPlayer.dependencies.FragmentModel.states.LOADING
        }), streamId = getStreamId.call(this), mediaData = this.virtualBuffer.getChunks({
            streamId: streamId,
            mediaType: type,
            segmentType: MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE,
            quality: currentQuality
        });
        if (currentQuality > requiredQuality && (hasDataForQuality(mediaData, currentQuality) || hasDataForQuality(loadingReqs, currentQuality))) {
            return false;
        }
        return currentQuality !== requiredQuality;
    }, hasDataForQuality = function(arr, quality) {
        var i = 0, ln = arr.length;
        for (i; i < ln; i += 1) {
            if (arr[i].quality === quality) return true;
        }
        return false;
    }, onInitializationLoaded = function(e) {
        var self = this, chunk;
        if (e.data.fragmentModel !== self.streamProcessor.getFragmentModel()) return;
        self.log("Initialization finished loading");
        chunk = e.data.chunk;
        this.virtualBuffer.append(chunk);
        if (chunk.quality !== requiredQuality || !waitingForInit.call(self)) return;
        switchInitData.call(self);
    }, onMediaLoaded = function(e) {
        if (e.data.fragmentModel !== this.streamProcessor.getFragmentModel()) return;
        var events, chunk = e.data.chunk, bytes = chunk.bytes, quality = chunk.quality, index = chunk.index, request = this.streamProcessor.getFragmentModel().getRequests({
            state: MediaPlayer.dependencies.FragmentModel.states.EXECUTED,
            quality: quality,
            index: index
        })[0], currentTrack = this.streamProcessor.getTrackForQuality(quality), manifest = this.manifestModel.getValue(), eventStreamMedia = this.adapter.getEventsFor(manifest, currentTrack.mediaInfo, this.streamProcessor), eventStreamTrack = this.adapter.getEventsFor(manifest, currentTrack, this.streamProcessor);
        if (eventStreamMedia.length > 0 || eventStreamTrack.length > 0) {
            events = handleInbandEvents.call(this, bytes, request, eventStreamMedia, eventStreamTrack);
            this.streamProcessor.getEventController().addInbandEvents(events);
        }
        chunk.bytes = deleteInbandEvents.call(this, bytes);
        this.virtualBuffer.append(chunk);
        appendNext.call(this);
    }, appendToBuffer = function(chunk) {
        isAppendingInProgress = true;
        appendedBytesInfo = chunk;
        var self = this, quality = chunk.quality, isInit = isNaN(chunk.index);
        if (quality !== requiredQuality && isInit || quality !== currentQuality && !isInit) {
            onMediaRejected.call(self, quality, chunk.index);
            return;
        }
        self.sourceBufferExt.append(buffer, chunk);
    }, onAppended = function(e) {
        if (buffer !== e.data.buffer) return;
        if (this.isBufferingCompleted() && this.streamProcessor.getStreamInfo().isLast) {
            this.mediaSourceExt.signalEndOfStream(mediaSource);
        }
        var self = this, ranges;
        if (e.error) {
            if (e.error.code === MediaPlayer.dependencies.SourceBufferExtensions.QUOTA_EXCEEDED_ERROR_CODE) {
                self.virtualBuffer.append(appendedBytesInfo);
                criticalBufferLevel = self.sourceBufferExt.getTotalBufferedTime(buffer) * .8;
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
                    self.log("Buffered Range: " + ranges.start(i) + " - " + ranges.end(i));
                }
            }
        }
        self.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, {
            quality: appendedBytesInfo.quality,
            index: appendedBytesInfo.index,
            bufferedRanges: ranges
        });
        onAppendToBufferCompleted.call(self, appendedBytesInfo.quality, appendedBytesInfo.index);
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
        var self = this, totalBufferedTime = self.sourceBufferExt.getTotalBufferedTime(buffer);
        return totalBufferedTime < criticalBufferLevel;
    }, clearBuffer = function() {
        var self = this, currentTime, removeStart, removeEnd, range, req;
        if (!buffer) return;
        currentTime = self.playbackController.getTime();
        req = self.streamProcessor.getFragmentModel().getRequests({
            state: MediaPlayer.dependencies.FragmentModel.states.EXECUTED,
            time: currentTime
        })[0];
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
        var bufferState = getBufferState(), eventName = bufferState === MediaPlayer.dependencies.BufferController.BUFFER_LOADED ? MediaPlayer.events.BUFFER_LOADED : MediaPlayer.events.BUFFER_EMPTY;
        addBufferMetrics.call(this);
        this.eventBus.dispatchEvent({
            type: eventName,
            data: {
                bufferType: type
            }
        });
        this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, {
            hasSufficientBuffer: state
        });
        this.log(hasSufficientBuffer ? "Got enough buffer to start." : "Waiting for more buffer before starting playback.");
    }, updateBufferTimestampOffset = function(MSETimeOffset) {
        if (buffer && buffer.timestampOffset !== MSETimeOffset && !isNaN(MSETimeOffset)) {
            buffer.timestampOffset = MSETimeOffset;
        }
    }, updateBufferState = function() {
        if (!buffer) return;
        var self = this, fragmentsToLoad = this.streamProcessor.getScheduleController().getFragmentToLoadCount(), fragmentDuration = this.streamProcessor.getCurrentTrack().fragmentDuration;
        updateBufferLevel.call(self);
        bufferTarget = fragmentsToLoad > 0 ? fragmentsToLoad * fragmentDuration + bufferLevel : bufferTarget;
        addBufferMetrics.call(this);
        appendNext.call(self);
    }, appendNext = function() {
        if (waitingForInit.call(this)) {
            switchInitData.call(this);
        } else {
            appendNextMedia.call(this);
        }
    }, addBufferMetrics = function() {
        if (!isActive.call(this)) return;
        this.metricsModel.addBufferState(type, getBufferState(), bufferTarget);
        var level = bufferLevel, virtualLevel;
        virtualLevel = this.virtualBuffer.getTotalBufferLevel(this.streamProcessor.getMediaInfo());
        if (virtualLevel) {
            level += virtualLevel;
        }
        this.metricsModel.addBufferLevel(type, new Date(), level);
    }, getStreamId = function() {
        return this.streamProcessor.getStreamInfo().id;
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
        var streamId = getStreamId.call(this), chunk;
        if (!buffer || isBufferLevelOutrun || isAppendingInProgress || waitingForInit.call(this) || !hasEnoughSpaceToAppend.call(this)) return;
        chunk = this.virtualBuffer.extract({
            streamId: streamId,
            mediaType: type,
            segmentType: MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE,
            limit: 1
        })[0];
        if (!chunk) return;
        appendToBuffer.call(this, chunk);
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
    }, onChunkAppended = function() {
        addBufferMetrics.call(this);
    }, switchInitData = function() {
        var self = this, streamId = getStreamId.call(self), filter = {
            streamId: streamId,
            mediaType: type,
            segmentType: MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE,
            quality: requiredQuality
        }, chunk = self.virtualBuffer.getChunks(filter)[0];
        if (chunk) {
            if (isAppendingInProgress || !buffer) return;
            appendToBuffer.call(self, chunk);
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
        sourceBufferExt: undefined,
        eventBus: undefined,
        bufferMax: undefined,
        manifestModel: undefined,
        errHandler: undefined,
        mediaSourceExt: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        streamController: undefined,
        playbackController: undefined,
        adapter: undefined,
        log: undefined,
        abrController: undefined,
        system: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        virtualBuffer: undefined,
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
            onChunkAppended = onChunkAppended.bind(this);
            this.sourceBufferExt.subscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED, this, onAppended);
            this.sourceBufferExt.subscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, this, onRemoved);
            this.virtualBuffer.subscribe(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED, this, onChunkAppended);
        },
        initialize: function(typeValue, source, streamProcessor) {
            var self = this;
            type = typeValue;
            self.setMediaType(type);
            self.setMediaSource(source);
            self.streamProcessor = streamProcessor;
            self.fragmentController = streamProcessor.fragmentController;
            self.scheduleController = streamProcessor.scheduleController;
            requiredQuality = self.abrController.getQualityFor(type, streamProcessor.getStreamInfo());
        },
        createBuffer: createBuffer,
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
            criticalBufferLevel = Number.POSITIVE_INFINITY;
            hasSufficientBuffer = null;
            minBufferTime = null;
            currentQuality = -1;
            lastIndex = -1;
            maxAppendedIndex = -1;
            requiredQuality = 0;
            self.sourceBufferExt.unsubscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED, self, onAppended);
            self.sourceBufferExt.unsubscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, self, onRemoved);
            appendedBytesInfo = null;
            this.virtualBuffer.unsubscribe(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED, self, onChunkAppended);
            isBufferLevelOutrun = false;
            isAppendingInProgress = false;
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
    var inlineEvents = {}, inbandEvents = {}, activeEvents = {}, eventInterval = null, refreshDelay = 100, presentationTimeThreshold = refreshDelay / 1e3, MPD_RELOAD_SCHEME = "urn:mpeg:dash:event:2012", MPD_RELOAD_VALUE = 1, reset = function() {
        clear();
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
        self.log("Start Event Controller");
        if (!isNaN(refreshDelay)) {
            eventInterval = setInterval(onEventTimer.bind(this), refreshDelay);
        }
    }, addInlineEvents = function(values) {
        var self = this;
        inlineEvents = {};
        if (values) {
            for (var i = 0; i < values.length; i++) {
                var event = values[i];
                inlineEvents[event.id] = event;
                self.log("Add inline event with id " + event.id);
            }
        }
        self.log("Added " + values.length + " inline events");
    }, addInbandEvents = function(values) {
        var self = this;
        for (var i = 0; i < values.length; i++) {
            var event = values[i];
            if (!(event.id in inbandEvents)) {
                inbandEvents[event.id] = event;
                self.log("Add inband event with id " + event.id);
            } else {
                self.log("Repeated event with id " + event.id);
            }
        }
    }, onEventTimer = function() {
        triggerEvents.call(this, inbandEvents);
        triggerEvents.call(this, inlineEvents);
        removeEvents.call(this);
    }, triggerEvents = function(events) {
        var self = this, currentVideoTime = this.videoModel.getCurrentTime(), presentationTime;
        if (events) {
            var eventIds = Object.keys(events);
            for (var i = 0; i < eventIds.length; i++) {
                var eventId = eventIds[i];
                var curr = events[eventId];
                if (curr !== undefined) {
                    presentationTime = curr.presentationTime / curr.eventStream.timescale;
                    if (presentationTime === 0 || presentationTime <= currentVideoTime && presentationTime + presentationTimeThreshold > currentVideoTime) {
                        self.log("Start Event " + eventId + " at " + currentVideoTime);
                        if (curr.duration > 0) activeEvents[eventId] = curr;
                        if (curr.eventStream.schemeIdUri == MPD_RELOAD_SCHEME && curr.eventStream.value == MPD_RELOAD_VALUE) refreshManifest.call(this);
                        delete events[eventId];
                    }
                }
            }
        }
    }, removeEvents = function() {
        var self = this;
        if (activeEvents) {
            var currentVideoTime = this.videoModel.getCurrentTime();
            var eventIds = Object.keys(activeEvents);
            for (var i = 0; i < eventIds.length; i++) {
                var eventId = eventIds[i];
                var curr = activeEvents[eventId];
                if (curr !== null && (curr.duration + curr.presentationTime) / curr.eventStream.timescale < currentVideoTime) {
                    self.log("Remove Event " + eventId + " at time " + currentVideoTime);
                    curr = null;
                    delete activeEvents[eventId];
                }
            }
        }
    }, refreshManifest = function() {
        var manifest = this.manifestModel.getValue(), url = manifest.url;
        if (manifest.hasOwnProperty("Location")) {
            url = manifest.Location;
        }
        this.log("Refresh manifest @ " + url);
        this.manifestUpdater.getManifestLoader().load(url);
    };
    return {
        manifestModel: undefined,
        manifestUpdater: undefined,
        log: undefined,
        system: undefined,
        videoModel: undefined,
        addInlineEvents: addInlineEvents,
        addInbandEvents: addInbandEvents,
        reset: reset,
        clear: clear,
        start: start
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
    }, createDataChunk = function(bytes, request, streamId) {
        var chunk = new MediaPlayer.vo.DataChunk();
        chunk.streamId = streamId;
        chunk.mediaType = request.mediaType;
        chunk.segmentType = request.type;
        chunk.start = request.startTime;
        chunk.duration = request.duration;
        chunk.end = chunk.start + chunk.duration;
        chunk.bytes = bytes;
        chunk.index = request.index;
        chunk.quality = request.quality;
        return chunk;
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
        var self = this, request = e.data.request, bytes = self.process(e.data.response), streamId = e.sender.getContext().streamProcessor.getStreamInfo().id, isInit = this.isInitializationRequest(request), eventName = isInit ? MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED : MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED, chunk;
        if (bytes === null) {
            self.log("No " + request.mediaType + " bytes to push.");
            return;
        }
        chunk = createDataChunk.call(this, bytes, request, streamId);
        self.notify(eventName, {
            chunk: chunk,
            fragmentModel: e.sender
        });
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
                    r = m.getRequests({
                        state: MediaPlayer.dependencies.FragmentModel.states.PENDING,
                        time: r.startTime
                    })[0];
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
        log: undefined,
        scheduleRulesCollection: undefined,
        rulesController: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED] = onFragmentLoadingStart;
            this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED] = onFragmentLoadingCompleted;
            this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED] = onStreamCompleted;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED] = onBufferLevelBalanced;
            if (this.scheduleRulesCollection.sameTimeRequestRule) {
                this.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, this.scheduleRulesCollection.sameTimeRequestRule);
            }
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
        isInitializationRequest: function(request) {
            return request && request.type && request.type === MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE;
        },
        prepareFragmentForLoading: function(fragmentModel, request) {
            if (!fragmentModel || !request) return;
            if (fragmentModel.addRequest(request)) {
                executeRequests.call(this, request);
            }
        },
        executePendingRequests: function() {
            executeRequests.call(this);
        },
        reset: function() {
            fragmentModels = [];
            if (this.scheduleRulesCollection.sameTimeRequestRule) {
                this.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, this.scheduleRulesCollection.sameTimeRequestRule);
            }
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
    var WALLCLOCK_TIME_UPDATE_INTERVAL = 1e3, currentTime = 0, liveStartTime = NaN, wallclockTimeIntervalId = null, commonEarliestTime = {}, firstAppended = {}, streamInfo, videoModel, isDynamic, liveDelayFragmentCount = NaN, useSuggestedPresentationDelay, getStreamStartTime = function(streamInfo) {
        var presentationStartTime, startTimeOffset = parseInt(this.uriQueryFragModel.getURIFragmentData().s);
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
        var self = this, metrics = self.metricsModel.getReadOnlyMetricsFor("video") || self.metricsModel.getReadOnlyMetricsFor("audio"), DVRMetrics = self.metricsExt.getCurrentDVRInfo(metrics), DVRWindow = DVRMetrics ? DVRMetrics.range : null, actualTime;
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
        if (firstAppended[streamInfo.id] || this.isSeeking()) return;
        var initialSeekTime = getStreamStartTime.call(this, streamInfo);
        this.log("Starting playback at offset: " + initialSeekTime);
        this.seek(initialSeekTime);
    }, updateCurrentTime = function() {
        if (this.isPaused() || !isDynamic || videoModel.getElement().readyState === 0) return;
        var currentTime = this.getTime(), actualTime = getActualPresentationTime.call(this, currentTime), timeChanged = !isNaN(actualTime) && actualTime !== currentTime;
        if (timeChanged) {
            this.seek(actualTime);
        }
    }, onDataUpdateCompleted = function(e) {
        if (e.error) return;
        var track = this.adapter.convertDataToTrack(this.manifestModel.getValue(), e.data.currentRepresentation), info = track.mediaInfo.streamInfo;
        if (streamInfo.id !== info.id) return;
        streamInfo = track.mediaInfo.streamInfo;
        updateCurrentTime.call(this);
    }, onLiveEdgeSearchCompleted = function(e) {
        if (e.error || videoModel.getElement().readyState === 0) return;
        initialStart.call(this);
    }, removeAllListeners = function() {
        if (!videoModel) return;
        videoModel.unlisten("play", onPlaybackStart);
        videoModel.unlisten("playing", onPlaybackPlaying);
        videoModel.unlisten("pause", onPlaybackPaused);
        videoModel.unlisten("error", onPlaybackError);
        videoModel.unlisten("seeking", onPlaybackSeeking);
        videoModel.unlisten("seeked", onPlaybackSeeked);
        videoModel.unlisten("timeupdate", onPlaybackTimeUpdated);
        videoModel.unlisten("progress", onPlaybackProgress);
        videoModel.unlisten("ratechange", onPlaybackRateChanged);
        videoModel.unlisten("loadedmetadata", onPlaybackMetaDataLoaded);
        videoModel.unlisten("ended", onPlaybackEnded);
    }, onCanPlay = function() {
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY);
    }, onPlaybackStart = function() {
        this.log("<video> play");
        updateCurrentTime.call(this);
        startUpdatingWallclockTime.call(this);
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, {
            startTime: this.getTime()
        });
    }, onPlaybackPlaying = function() {
        this.log("<video> playing");
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PLAYING, {
            playingTime: this.getTime()
        });
    }, onPlaybackPaused = function() {
        this.log("<video> pause");
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED);
    }, onPlaybackSeeking = function() {
        this.log("<video> seek");
        startUpdatingWallclockTime.call(this);
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, {
            seekTime: this.getTime()
        });
    }, onPlaybackSeeked = function() {
        this.log("<video> seeked");
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
        this.log("<video> ratechange: ", this.getPlaybackRate());
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED);
    }, onPlaybackMetaDataLoaded = function() {
        this.log("<video> loadedmetadata");
        if (!isDynamic || this.timelineConverter.isTimeSyncCompleted()) {
            initialStart.call(this);
        }
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_METADATA_LOADED);
        startUpdatingWallclockTime.call(this);
    }, onPlaybackEnded = function() {
        this.log("<video> ended");
        stopUpdatingWallclockTime.call(this);
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED);
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
        var bufferedStart, ranges = e.data.bufferedRanges, id = streamInfo.id, time = this.getTime(), type = e.sender.streamProcessor.getType(), stream = this.system.getObject("streamController").getStreamById(streamInfo.id), currentEarliestTime = commonEarliestTime[id];
        if (e.data.index === 0) {
            firstAppended[id] = firstAppended[id] || {};
            firstAppended[id][type] = true;
            firstAppended.ready = !(stream.hasMedia("audio") && !firstAppended[id].audio || stream.hasMedia("video") && !firstAppended[id].video);
        }
        if (!ranges || !ranges.length) return;
        bufferedStart = Math.max(ranges.start(0), streamInfo.start);
        commonEarliestTime[id] = commonEarliestTime[id] === undefined ? bufferedStart : Math.max(commonEarliestTime[id], bufferedStart);
        if (currentEarliestTime === commonEarliestTime[id] && time === currentEarliestTime || !firstAppended.ready || time > commonEarliestTime[id]) return;
        this.seek(commonEarliestTime[id]);
    }, onBufferLevelStateChanged = function(e) {
        var type = e.sender.streamProcessor.getType(), senderStreamInfo = e.sender.streamProcessor.getStreamInfo();
        if (senderStreamInfo.id !== streamInfo.id) return;
        videoModel.setStallState(type, !e.data.hasSufficientBuffer);
    }, setupVideoModel = function() {
        videoModel.listen("canplay", onCanPlay);
        videoModel.listen("play", onPlaybackStart);
        videoModel.listen("playing", onPlaybackPlaying);
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
        system: undefined,
        log: undefined,
        timelineConverter: undefined,
        uriQueryFragModel: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        manifestModel: undefined,
        manifestExt: undefined,
        videoModel: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        adapter: undefined,
        setup: function() {
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
            this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED] = onLiveEdgeSearchCompleted;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED] = onBytesAppended;
            this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED] = onBufferLevelStateChanged;
            onCanPlay = onCanPlay.bind(this);
            onPlaybackStart = onPlaybackStart.bind(this);
            onPlaybackPlaying = onPlaybackPlaying.bind(this);
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
        initialize: function(streamInfoValue) {
            videoModel = this.videoModel;
            streamInfo = streamInfoValue;
            commonEarliestTime = {};
            removeAllListeners.call(this);
            setupVideoModel.call(this);
            isDynamic = streamInfo.manifestInfo.isDynamic;
            liveStartTime = streamInfoValue.start;
        },
        getStreamStartTime: getStreamStartTime,
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
        getPlayedRanges: function() {
            return videoModel.getElement().played;
        },
        setLiveStartTime: function(value) {
            liveStartTime = value;
        },
        getLiveStartTime: function() {
            return liveStartTime;
        },
        setLiveDelayAttributes: function(count, useSPD) {
            liveDelayFragmentCount = count;
            useSuggestedPresentationDelay = useSPD;
        },
        getLiveDelay: function(fragmentDuration) {
            var delay, mpd = this.manifestExt.getMpd(this.manifestModel.getValue());
            if (useSuggestedPresentationDelay && mpd.hasOwnProperty("suggestedPresentationDelay")) {
                delay = mpd.suggestedPresentationDelay;
            } else if (!isNaN(fragmentDuration)) {
                delay = fragmentDuration * liveDelayFragmentCount;
            } else {
                delay = streamInfo.manifestInfo.minBufferTime * 2;
            }
            return delay;
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
            if (!videoModel || time === this.getTime()) return;
            this.log("Do seek: " + time);
            videoModel.setCurrentTime(time);
        },
        reset: function() {
            stopUpdatingWallclockTime.call(this);
            removeAllListeners.call(this);
            videoModel = null;
            streamInfo = null;
            currentTime = 0;
            liveStartTime = NaN;
            commonEarliestTime = {};
            firstAppended = {};
            isDynamic = undefined;
            useSuggestedPresentationDelay = undefined;
            liveDelayFragmentCount = NaN;
        }
    };
};

MediaPlayer.dependencies.PlaybackController.prototype = {
    constructor: MediaPlayer.dependencies.PlaybackController
};

MediaPlayer.dependencies.PlaybackController.eventList = {
    ENAME_CAN_PLAY: "canPlay",
    ENAME_PLAYBACK_STARTED: "playbackStarted",
    ENAME_PLAYBACK_PLAYING: "playbackPlaying",
    ENAME_PLAYBACK_STOPPED: "playbackStopped",
    ENAME_PLAYBACK_PAUSED: "playbackPaused",
    ENAME_PLAYBACK_ENDED: "playbackEnded",
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
    var keySystems = null, pendingNeedKeyData = [], pendingLicenseRequests = [], audioInfo, videoInfo, protDataSet, getProtData = function(keySystem) {
        var protData = null, keySystemString = keySystem.systemString;
        if (protDataSet) {
            protData = keySystemString in protDataSet ? protDataSet[keySystemString] : null;
        }
        return protData;
    }, onKeyMessage = function(e) {
        if (e.error) {
            this.log(e.error);
        } else {
            var keyMessageEvent = e.data;
            pendingLicenseRequests.push(keyMessageEvent.sessionToken);
            this.protectionExt.requestLicense(this.keySystem, getProtData(this.keySystem), keyMessageEvent.message, keyMessageEvent.defaultURL, keyMessageEvent.sessionToken);
        }
    }, onLicenseRequestComplete = function(e) {
        var i, sessionToken = e.error ? e.data : e.data.requestData;
        for (i = 0; i < pendingLicenseRequests.length; i++) {
            if (pendingLicenseRequests[i] === sessionToken) {
                pendingLicenseRequests.splice(i, 1);
                if (!e.error) {
                    this.log("DRM: License request successful.  Session ID = " + e.data.requestData.getSessionID());
                    this.updateKeySession(sessionToken, e.data.message);
                } else {
                    this.log("DRM: License request failed! -- " + e.error);
                }
                break;
            }
        }
    }, onKeySystemSelected = function() {
        if (!this.keySystem) {
            this.keySystem = this.protectionModel.keySystem;
            this.protectionExt.subscribe(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, this);
        }
        for (var i = 0; i < pendingNeedKeyData.length; i++) {
            this.createKeySession(pendingNeedKeyData[i]);
        }
        pendingNeedKeyData = [];
    }, onNeedKey = function(event) {
        if (event.data.initDataType !== "cenc") {
            this.log("DRM:  Only 'cenc' initData is supported!  Ignoring initData of type: " + event.data.initDataType);
            return;
        }
        var abInitData = event.data.initData;
        if (ArrayBuffer.isView(abInitData)) {
            abInitData = abInitData.buffer;
        }
        if (this.keySystem) {
            this.createKeySession(abInitData);
        } else if (this.keySystem === undefined) {
            this.keySystem = null;
            pendingNeedKeyData.push(abInitData);
            try {
                this.protectionExt.autoSelectKeySystem(this.protectionExt.getSupportedKeySystems(abInitData), this, videoInfo, audioInfo);
            } catch (error) {
                this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR, "DRM: Unable to select a key system from needkey initData. -- " + error.message);
            }
        } else {
            pendingNeedKeyData.push(abInitData);
        }
    }, onKeySystemAccessComplete = function(event) {
        if (!event.error) {
            this.log("KeySystem Access Granted");
        } else {
            this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR, "DRM: KeySystem Access Denied! -- " + event.error);
        }
    }, onServerCertificateUpdated = function(event) {
        if (!event.error) {
            this.log("DRM: License server certificate successfully updated.");
        } else {
            this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR, "DRM: Failed to update license server certificate. -- " + event.error);
        }
    }, onKeySessionCreated = function(event) {
        if (!event.error) {
            this.log("DRM: Session created.  SessionID = " + event.data.getSessionID());
        } else {
            this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR, "DRM: Failed to create key session. -- " + event.error);
        }
    }, onKeyAdded = function() {
        this.log("DRM: Key added.");
    }, onKeyError = function(event) {
        this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR, "DRM: MediaKeyError - sessionId: " + event.data.sessionToken.getSessionID() + ".  " + event.data.error);
    }, onKeySessionClosed = function(event) {
        if (!event.error) {
            this.log("DRM: Session closed.  SessionID = " + event.data);
        } else {
            this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR, "DRM Failed to close key session. -- " + event.error);
        }
    }, onKeySessionRemoved = function(event) {
        if (!event.error) {
            this.log("DRM: Session removed.  SessionID = " + event.data);
        } else {
            this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR, "DRM: Failed to remove key session. -- " + event.error);
        }
    };
    return {
        system: undefined,
        log: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        protectionExt: undefined,
        keySystem: undefined,
        sessionType: "temporary",
        setup: function() {
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE] = onKeyMessage.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED] = onKeySystemSelected.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE] = onKeySystemAccessComplete.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY] = onNeedKey.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED] = onServerCertificateUpdated.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED] = onKeyAdded.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR] = onKeyError.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED] = onKeySessionCreated.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED] = onKeySessionClosed.bind(this);
            this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED] = onKeySessionRemoved.bind(this);
            this[MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE] = onLicenseRequestComplete.bind(this);
            keySystems = this.protectionExt.getKeySystems();
            this.protectionModel = this.system.getObject("protectionModel");
            this.protectionModel.init();
        },
        init: function(manifest, aInfo, vInfo) {
            this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED, this);
            this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED, this);
            this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, this);
            this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, this);
            this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, this);
            this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED, this);
            this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, this);
            var adapter, streamInfo;
            if (!aInfo && !vInfo) {
                adapter = this.system.getObject("adapter");
                streamInfo = adapter.getStreamsInfo(manifest)[0];
            }
            audioInfo = aInfo || (streamInfo ? adapter.getMediaInfoForType(manifest, streamInfo, "audio") : null);
            videoInfo = vInfo || (streamInfo ? adapter.getMediaInfoForType(manifest, streamInfo, "video") : null);
            var mediaInfo = videoInfo ? videoInfo : audioInfo;
            var self = this;
            var useNeedKey = function() {
                self.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, self);
                self.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED, self);
                self.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, self);
            };
            var supportedKS = this.protectionExt.getSupportedKeySystemsFromContentProtection(mediaInfo.contentProtection);
            if (supportedKS && supportedKS.length > 0) {
                var ksSelected = {};
                ksSelected[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE] = function(event) {
                    if (event.error) {
                        self.log("DRM: Could not select key system from ContentProtection elements!  Falling back to needkey mechanism...");
                        useNeedKey();
                        self.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED, ksSelected);
                    }
                };
                ksSelected[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED] = function(event) {
                    if (!event.error) {
                        self.keySystem = self.protectionModel.keySystem;
                        self.protectionExt.subscribe(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, self);
                        for (var ksIdx = 0; ksIdx < supportedKS.length; ksIdx++) {
                            if (self.keySystem === supportedKS[ksIdx].ks) {
                                self.createKeySession(supportedKS[ksIdx].initData);
                                break;
                            }
                        }
                    } else {
                        self.log("DRM: Could not select key system from ContentProtection elements!  Falling back to needkey mechanism...");
                        useNeedKey();
                    }
                };
                this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED, ksSelected, undefined, true);
                this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, ksSelected, undefined, true);
                this.protectionExt.autoSelectKeySystem(supportedKS, this, videoInfo, audioInfo);
            } else {
                useNeedKey();
            }
        },
        teardown: function() {
            this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, this);
            this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED, this);
            if (this.keySystem) {
                this.protectionExt.unsubscribe(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, this);
            }
            this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED, this);
            this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED, this);
            this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, this);
            this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, this);
            this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, this);
            this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED, this);
            this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, this);
            this.keySystem = undefined;
            this.protectionModel.teardown();
            this.protectionModel = undefined;
        },
        requestKeySystemAccess: function(ksConfiguration) {
            this.protectionModel.requestKeySystemAccess(ksConfiguration);
        },
        selectKeySystem: function(keySystemAccess) {
            if (this.keySystem) {
                throw new Error("DRM: KeySystem already selected!");
            }
            this.protectionModel.selectKeySystem(keySystemAccess);
        },
        createKeySession: function(initData) {
            var initDataForKS = MediaPlayer.dependencies.protection.CommonEncryption.getPSSHForKeySystem(this.keySystem, initData);
            if (initDataForKS) {
                try {
                    this.protectionModel.createKeySession(initDataForKS, this.sessionType);
                } catch (error) {
                    this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR, "Error creating key session! " + error.message);
                }
            } else {
                this.log("Selected key system is " + this.keySystem.systemString + ".  needkey/encrypted event contains no initData corresponding to that key system!");
            }
        },
        updateKeySession: function(sessionToken, message) {
            this.protectionModel.updateKeySession(sessionToken, message);
        },
        loadKeySession: function(sessionID) {
            this.protectionModel.loadKeySession(sessionID);
        },
        removeKeySession: function(sessionToken) {
            this.protectionModel.removeKeySession(sessionToken);
        },
        closeKeySession: function(sessionToken) {
            this.protectionModel.closeKeySession(sessionToken);
        },
        setServerCertificate: function(serverCertificate) {
            this.protectionModel.setServerCertificate(serverCertificate);
        },
        setMediaElement: function(element) {
            this.protectionModel.setMediaElement(element);
        },
        setSessionType: function(sessionType) {
            this.sessionType = sessionType;
        },
        setProtectionData: function(data) {
            protDataSet = data;
        }
    };
};

MediaPlayer.dependencies.ProtectionController.eventList = {
    ENAME_PROTECTION_ERROR: "protectionError"
};

MediaPlayer.dependencies.ProtectionController.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionController
};

MediaPlayer.dependencies.ScheduleController = function() {
    "use strict";
    var fragmentsToLoad = 0, type, ready, fragmentModel, isDynamic, currentTrackInfo, initialPlayback = true, lastValidationTime = null, isStopped = false, playListMetrics = null, playListTraceMetrics = null, playListTraceMetricsClosed = true, clearPlayListTraceMetrics = function(endTime, stopreason) {
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
        this.log("start");
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
        this.log("stop");
        if (cancelPending) {
            fragmentModel.cancelPendingRequests();
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
            self.fragmentController.prepareFragmentForLoading(fragmentModel, request);
        }
        return request;
    }, getRequiredFragmentCount = function(callback) {
        var self = this, rules = self.scheduleRulesCollection.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_SCHEDULE_RULES);
        self.rulesController.applyRules(rules, self.streamProcessor, callback, fragmentsToLoad, function(currentValue, newValue) {
            currentValue = currentValue === MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE ? 0 : currentValue;
            return Math.max(currentValue, newValue);
        });
    }, replaceCanceledRequests = function(canceledRequests) {
        var ln = canceledRequests.length, EPSILON = .1, request, time, i;
        for (i = 0; i < ln; i += 1) {
            request = canceledRequests[i];
            time = request.startTime + request.duration / 2 + EPSILON;
            request = this.adapter.getFragmentRequestForTime(this.streamProcessor, currentTrackInfo, time, {
                timeThreshold: 0,
                ignoreIsFinished: true
            });
            this.fragmentController.prepareFragmentForLoading(fragmentModel, request);
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
            this.fragmentController.prepareFragmentForLoading(fragmentModel, request);
        } else {
            this.fragmentController.executePendingRequests();
        }
    }, validate = function() {
        var now = new Date().getTime(), isEnoughTimeSinceLastValidation = lastValidationTime ? now - lastValidationTime > fragmentModel.getLoadingTime() : true;
        this.abrController.getPlaybackQuality(this.streamProcessor);
        if (!isEnoughTimeSinceLastValidation || isStopped || this.playbackController.isPaused() && this.playbackController.getPlayedRanges().length > 0 && (!this.scheduleWhilePaused || isDynamic)) return;
        lastValidationTime = now;
        getRequiredFragmentCount.call(this, onGetRequiredFragmentCount.bind(this));
    }, onDataUpdateCompleted = function(e) {
        if (e.error) return;
        currentTrackInfo = this.adapter.convertDataToTrack(this.manifestModel.getValue(), e.data.currentRepresentation);
    }, onStreamUpdated = function(e) {
        if (e.error) return;
        currentTrackInfo = this.streamProcessor.getCurrentTrack();
        if (!isDynamic || this.liveEdgeFinder.getLiveEdge() !== null) {
            ready = true;
        }
        if (ready) {
            startOnReady.call(this);
        }
    }, onStreamCompleted = function(e) {
        if (e.data.fragmentModel !== this.streamProcessor.getFragmentModel()) return;
        this.log("Stream is complete");
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
        fragmentModel.removeExecutedRequestsBeforeTime(e.data.to);
        if (e.data.hasEnoughSpaceToAppend) {
            doStart.call(this);
        }
    }, onBufferLevelStateChanged = function(e) {
        var self = this;
        if (!e.data.hasSufficientBuffer && !self.playbackController.isSeeking()) {
            self.log("Stalling Buffer");
            clearPlayListTraceMetrics(new Date(), MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON);
        }
    }, onBufferLevelUpdated = function() {
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
        replaceCanceledRequests.call(self, canceledReqs);
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
            fragmentModel.cancelPendingRequests();
        }
        var metrics = this.metricsModel.getMetricsFor("stream"), manifestUpdateInfo = this.metricsExt.getCurrentManifestUpdate(metrics);
        this.log("seek: " + e.data.seekTime);
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
        var self = this, liveEdgeTime = e.data.liveEdge, manifestInfo = currentTrackInfo.mediaInfo.streamInfo.manifestInfo, startTime = liveEdgeTime - Math.min(self.playbackController.getLiveDelay(currentTrackInfo.fragmentDuration), manifestInfo.DVRWindowSize / 2), request, metrics = self.metricsModel.getMetricsFor("stream"), manifestUpdateInfo = self.metricsExt.getCurrentManifestUpdate(metrics), currentLiveStart = self.playbackController.getLiveStartTime(), actualStartTime;
        request = self.adapter.getFragmentRequestForTime(self.streamProcessor, currentTrackInfo, startTime, {
            ignoreIsFinished: true
        });
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
        if (currentTrackInfo) {
            startOnReady.call(self);
        }
    };
    return {
        log: undefined,
        system: undefined,
        metricsModel: undefined,
        manifestModel: undefined,
        metricsExt: undefined,
        scheduleWhilePaused: undefined,
        timelineConverter: undefined,
        abrController: undefined,
        playbackController: undefined,
        adapter: undefined,
        scheduleRulesCollection: undefined,
        rulesController: undefined,
        numOfParallelRequestAllowed: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED] = onLiveEdgeSearchCompleted;
            this[MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED] = onQualityChanged;
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED] = onDataUpdateStarted;
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
            this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED] = onStreamUpdated;
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
            self.setMediaType(type);
            self.streamProcessor = streamProcessor;
            self.fragmentController = streamProcessor.fragmentController;
            self.liveEdgeFinder = streamProcessor.liveEdgeFinder;
            self.bufferController = streamProcessor.bufferController;
            isDynamic = streamProcessor.isDynamic();
            fragmentModel = this.fragmentController.getModel(this);
            MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD = self.numOfParallelRequestAllowed;
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
        replaceCanceledRequests: replaceCanceledRequests,
        reset: function() {
            var self = this;
            doStop.call(self, true);
            self.bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, self.scheduleRulesCollection.bufferLevelRule);
            self.bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, self.scheduleRulesCollection.bufferLevelRule);
            fragmentModel.abortRequests();
            self.fragmentController.detachModel(fragmentModel);
            fragmentsToLoad = 0;
        },
        start: doStart,
        stop: doStop
    };
};

MediaPlayer.dependencies.ScheduleController.prototype = {
    constructor: MediaPlayer.dependencies.ScheduleController
};

MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD = 0;

MediaPlayer.dependencies.StreamController = function() {
    "use strict";
    var streams = [], activeStream, protectionController, protectionData, STREAM_END_THRESHOLD = .2, autoPlay = true, canPlay = false, isStreamSwitchingInProgress = false, isUpdating = false, hasMediaError = false, mediaSource, UTCTimingSources, useManifestDateHeaderTimeSource, attachEvents = function(stream) {
        stream.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, this.liveEdgeFinder);
        stream.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED, this);
    }, detachEvents = function(stream) {
        stream.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, this.liveEdgeFinder);
        stream.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED, this);
    }, fireSwitchEvent = function(stage, fromStream, toStream) {
        this.eventBus.dispatchEvent({
            type: stage,
            data: {
                fromStreamInfo: fromStream ? fromStream.getStreamInfo() : null,
                toStreamInfo: toStream.getStreamInfo()
            }
        });
    }, startAutoPlay = function() {
        if (!activeStream.isActivated() || !canPlay) return;
        if (activeStream.getStreamInfo().index === 0) {
            activeStream.startEventController();
            if (autoPlay) {
                this.playbackController.start();
            }
        }
    }, onCanPlay = function() {
        canPlay = true;
        startAutoPlay.call(this);
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
        hasMediaError = true;
        this.log("Video Element Error: " + msg);
        this.log(e.error);
        this.errHandler.mediaSourceError(msg);
        this.reset();
    }, onTimeupdate = function(e) {
        var self = this, playbackQuality = self.videoExt.getPlaybackQuality(self.videoModel.getElement());
        if (playbackQuality) {
            self.metricsModel.addDroppedFrames("video", playbackQuality);
        }
        if (self.playbackController.isSeeking()) return;
        if (e.data.timeToEnd < STREAM_END_THRESHOLD) {
            this.mediaSourceExt.signalEndOfStream(mediaSource);
        }
    }, onEnded = function() {
        switchStream.call(this, activeStream, getNextStream());
    }, onSeeking = function(e) {
        var seekingStream = getStreamForTime(e.data.seekTime);
        if (seekingStream && seekingStream !== activeStream) {
            switchStream.call(this, activeStream, seekingStream, e.data.seekTime);
        }
    }, onStreamBufferingEnd = function(e) {
        var nextStream = getNextStream(), isLast = e.data.streamInfo.isLast;
        if (mediaSource && isLast) {
            this.mediaSourceExt.signalEndOfStream(mediaSource);
        }
        if (!nextStream) return;
        nextStream.activate(mediaSource);
    }, getNextStream = function() {
        var start = activeStream.getStreamInfo().start, duration = activeStream.getStreamInfo().duration;
        return streams.filter(function(stream) {
            return stream.getStreamInfo().start === start + duration;
        })[0];
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
    }, switchStream = function(from, to, seekTo) {
        if (isStreamSwitchingInProgress || !from || !to || from === to) return;
        fireSwitchEvent.call(this, MediaPlayer.events.STREAM_SWITCH_STARTED, from, to);
        isStreamSwitchingInProgress = true;
        var self = this, onMediaSourceReady = function() {
            if (seekTo !== undefined) {
                self.playbackController.seek(seekTo);
            }
            self.playbackController.start();
            activeStream.startEventController();
            isStreamSwitchingInProgress = false;
            fireSwitchEvent.call(self, MediaPlayer.events.STREAM_SWITCH_COMPLETED, from, to);
        };
        setTimeout(function() {
            detachEvents.call(self, from);
            from.deactivate();
            activeStream = to;
            attachEvents.call(self, to);
            self.playbackController.initialize(activeStream.getStreamInfo());
            setupMediaSource.call(self, onMediaSourceReady);
        }, 0);
    }, setupMediaSource = function(callback) {
        var self = this, sourceUrl, onMediaSourceOpen = function(e) {
            self.log("MediaSource is open!");
            self.log(e);
            window.URL.revokeObjectURL(sourceUrl);
            mediaSource.removeEventListener("sourceopen", onMediaSourceOpen);
            mediaSource.removeEventListener("webkitsourceopen", onMediaSourceOpen);
            setMediaDuration.call(self);
            activeStream.activate(mediaSource);
            if (callback) {
                callback();
            }
        };
        if (!mediaSource) {
            mediaSource = self.mediaSourceExt.createMediaSource();
        } else {
            self.mediaSourceExt.detachMediaSource(self.videoModel);
        }
        mediaSource.addEventListener("sourceopen", onMediaSourceOpen, false);
        mediaSource.addEventListener("webkitsourceopen", onMediaSourceOpen, false);
        sourceUrl = self.mediaSourceExt.attachMediaSource(mediaSource, self.videoModel);
    }, setMediaDuration = function() {
        var self = this, manifestDuration, mediaDuration;
        manifestDuration = activeStream.getStreamInfo().manifestInfo.duration;
        mediaDuration = self.mediaSourceExt.setDuration(mediaSource, manifestDuration);
        self.log("Duration successfully set to: " + mediaDuration);
    }, composeStreams = function() {
        var self = this, manifest = self.manifestModel.getValue(), metrics = self.metricsModel.getMetricsFor("stream"), manifestUpdateInfo = self.metricsExt.getCurrentManifestUpdate(metrics), streamInfo, pLen, sLen, pIdx, sIdx, streamsInfo, remainingStreams = [], stream;
        if (!manifest) return;
        streamsInfo = self.adapter.getStreamsInfo(manifest);
        try {
            if (streamsInfo.length === 0) {
                throw new Error("There are no streams");
            }
            self.metricsModel.updateManifestUpdateInfo(manifestUpdateInfo, {
                currentTime: self.videoModel.getCurrentTime(),
                buffered: self.videoModel.getElement().buffered,
                presentationStartTime: streamsInfo[0].start,
                clientTimeOffset: self.timelineConverter.getClientTimeOffset()
            });
            isUpdating = true;
            for (pIdx = 0, pLen = streamsInfo.length; pIdx < pLen; pIdx += 1) {
                streamInfo = streamsInfo[pIdx];
                for (sIdx = 0, sLen = streams.length; sIdx < sLen; sIdx += 1) {
                    if (streams[sIdx].getId() === streamInfo.id) {
                        stream = streams[sIdx];
                        remainingStreams.push(stream);
                        stream.updateData(streamInfo);
                    }
                }
                if (!stream) {
                    stream = self.system.getObject("stream");
                    stream.initialize(streamInfo, protectionController, protectionData);
                    stream.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, self);
                    remainingStreams.push(stream);
                    if (activeStream) {
                        stream.updateData(streamInfo);
                    }
                }
                self.metricsModel.addManifestUpdateStreamInfo(manifestUpdateInfo, streamInfo.id, streamInfo.index, streamInfo.start, streamInfo.duration);
                stream = null;
            }
            streams = remainingStreams;
            if (!activeStream) {
                activeStream = streams[0];
                fireSwitchEvent.call(self, MediaPlayer.events.STREAM_SWITCH_STARTED, null, activeStream);
                self.playbackController.initialize(activeStream.getStreamInfo());
                attachEvents.call(self, activeStream);
                fireSwitchEvent.call(self, MediaPlayer.events.STREAM_SWITCH_COMPLETED, null, activeStream);
            }
            if (!mediaSource) {
                setupMediaSource.call(this);
            }
            isUpdating = false;
            checkIfUpdateCompleted.call(self);
        } catch (e) {
            self.errHandler.manifestError(e.message, "nostreamscomposed", manifest);
            self.reset();
        }
    }, checkIfUpdateCompleted = function() {
        if (isUpdating) return;
        var self = this, ln = streams.length, i = 0;
        startAutoPlay.call(this);
        for (i; i < ln; i += 1) {
            if (!streams[i].isInitialized()) return;
        }
        self.notify(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED);
    }, onStreamUpdated = function() {
        checkIfUpdateCompleted.call(this);
    }, onTimeSyncAttemptCompleted = function() {
        composeStreams.call(this);
    }, onManifestUpdated = function(e) {
        if (!e.error) {
            this.log("Manifest has loaded.");
            var manifestUTCTimingSources = this.manifestExt.getUTCTimingSources(e.data.manifest), allUTCTimingSources = manifestUTCTimingSources.concat(UTCTimingSources);
            this.timeSyncController.initialize(allUTCTimingSources, useManifestDateHeaderTimeSource);
        } else {
            this.reset();
        }
    };
    return {
        system: undefined,
        videoModel: undefined,
        manifestUpdater: undefined,
        manifestLoader: undefined,
        manifestModel: undefined,
        manifestExt: undefined,
        adapter: undefined,
        playbackController: undefined,
        log: undefined,
        metricsModel: undefined,
        metricsExt: undefined,
        videoExt: undefined,
        liveEdgeFinder: undefined,
        mediaSourceExt: undefined,
        timelineConverter: undefined,
        protectionExt: undefined,
        timeSyncController: undefined,
        virtualBuffer: undefined,
        errHandler: undefined,
        eventBus: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED] = onManifestUpdated;
            this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED] = onStreamUpdated;
            this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED] = onStreamBufferingEnd;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = onSeeking;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED] = onTimeupdate;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED] = onEnded;
            this[MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED] = onTimeSyncAttemptCompleted;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY] = onCanPlay;
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR] = onError;
        },
        getAutoPlay: function() {
            return autoPlay;
        },
        getActiveStreamInfo: function() {
            return activeStream ? activeStream.getStreamInfo() : null;
        },
        isStreamActive: function(streamInfo) {
            return activeStream.getId() === streamInfo.id;
        },
        setUTCTimingSources: function(value, value2) {
            UTCTimingSources = value;
            useManifestDateHeaderTimeSource = value2;
        },
        getStreamById: function(id) {
            return streams.filter(function(item) {
                return item.getId() === id;
            })[0];
        },
        initialize: function(autoPl, protCtrl, protData) {
            autoPlay = autoPl;
            protectionController = protCtrl;
            protectionData = protData;
            this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.timelineConverter);
            this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.liveEdgeFinder);
            this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this);
            this.playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, this.manifestUpdater);
            this.playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED, this.manifestUpdater);
            this.playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED, this);
            this.subscribe(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED, this.manifestUpdater);
            this.manifestUpdater.subscribe(MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED, this);
            this.manifestUpdater.initialize(this.manifestLoader);
        },
        load: function(url) {
            this.manifestLoader.load(url);
        },
        loadWithManifest: function(manifest) {
            this.manifestUpdater.setManifest(manifest);
        },
        reset: function() {
            if (!!activeStream) {
                detachEvents.call(this, activeStream);
            }
            this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.timelineConverter);
            this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.liveEdgeFinder);
            this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this);
            this.timeSyncController.reset();
            for (var i = 0, ln = streams.length; i < ln; i++) {
                var stream = streams[i];
                stream.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, this);
                stream.reset(hasMediaError);
            }
            streams = [];
            this.unsubscribe(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED, this.manifestUpdater);
            this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, this.manifestUpdater);
            this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED, this.manifestUpdater);
            this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED, this);
            this.manifestUpdater.unsubscribe(MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED, this);
            this.manifestUpdater.reset();
            this.metricsModel.clearAllCurrentMetrics();
            this.manifestModel.setValue(null);
            this.timelineConverter.reset();
            this.liveEdgeFinder.reset();
            this.adapter.reset();
            this.virtualBuffer.reset();
            isStreamSwitchingInProgress = false;
            isUpdating = false;
            activeStream = null;
            canPlay = false;
            hasMediaError = false;
            protectionController = null;
            protectionData = null;
            if (!mediaSource) return;
            this.mediaSourceExt.detachMediaSource(this.videoModel);
            mediaSource = null;
        }
    };
};

MediaPlayer.dependencies.StreamController.prototype = {
    constructor: MediaPlayer.dependencies.StreamController
};

MediaPlayer.dependencies.StreamController.eventList = {
    ENAME_STREAMS_COMPOSED: "streamsComposed"
};

MediaPlayer.dependencies.TextController = function() {
    var initialized = false, mediaSource = null, buffer = null, type = null, onDataUpdateCompleted = function() {
        this.notify(MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED, {
            CCIndex: 0
        });
    }, onInitFragmentLoaded = function(e) {
        var self = this;
        if (e.data.fragmentModel !== self.streamProcessor.getFragmentModel() || !e.data.chunk.bytes) return;
        self.sourceBufferExt.append(buffer, e.data.chunk);
    };
    return {
        sourceBufferExt: undefined,
        log: undefined,
        system: undefined,
        errHandler: undefined,
        videoModel: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = onDataUpdateCompleted;
            this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED] = onInitFragmentLoaded;
        },
        initialize: function(typeValue, source, streamProcessor) {
            var self = this;
            type = typeValue;
            self.setMediaSource(source);
            self.trackController = streamProcessor.trackController;
            self.streamProcessor = streamProcessor;
        },
        createBuffer: function(mediaInfo) {
            try {
                buffer = this.sourceBufferExt.createSourceBuffer(mediaSource, mediaInfo);
                if (!initialized) {
                    if (buffer.hasOwnProperty("initialize")) {
                        buffer.initialize(type, this);
                    }
                    initialized = true;
                }
            } catch (e) {
                this.errHandler.mediaSourceError("Error creating " + type + " source buffer.");
            }
            return buffer;
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

MediaPlayer.dependencies.XlinkController = function() {
    "use strict";
    var matchers, iron, manifest, converter, RESOLVE_TYPE_ONLOAD = "onLoad", RESOLVE_TYPE_ONACTUATE = "onActuate", ELEMENT_TYPE_PERIOD = "Period", ELEMENT_TYPE_ADAPTATIONSET = "AdaptationSet", ELEMENT_TYPE_EVENTSTREAM = "EventStream", RESOLVE_TO_ZERO = "urn:mpeg:dash:resolve-to-zero:2013", resolveManifestOnLoad = function(mpd) {
        var self = this, elements;
        converter = new X2JS(matchers, "", true);
        manifest = mpd;
        elements = getElementsToResolve(manifest.Period_asArray, manifest, ELEMENT_TYPE_PERIOD, RESOLVE_TYPE_ONLOAD);
        resolve.call(self, elements, ELEMENT_TYPE_PERIOD, RESOLVE_TYPE_ONLOAD);
    }, resolve = function(elements, type, resolveType) {
        var self = this, element, url, resolveObject = {}, i;
        resolveObject.elements = elements;
        resolveObject.type = type;
        resolveObject.resolveType = resolveType;
        if (resolveObject.elements.length === 0) {
            onXlinkAllElementsLoaded.call(self, resolveObject);
        }
        for (i = 0; i < resolveObject.elements.length; i += 1) {
            element = resolveObject.elements[i];
            if (element.url.indexOf("http://") !== -1) {
                url = element.url;
            } else {
                url = element.originalContent.BaseURL + element.url;
            }
            self.xlinkLoader.load(url, element, resolveObject);
        }
    }, onXlinkElementLoaded = function(event) {
        var element, resolveObject, index, openingTag = "<response>", closingTag = "</response>", mergedContent = "";
        element = event.data.element;
        resolveObject = event.data.resolveObject;
        if (element.resolvedContent) {
            index = element.resolvedContent.indexOf(">") + 1;
            mergedContent = element.resolvedContent.substr(0, index) + openingTag + element.resolvedContent.substr(index) + closingTag;
            element.resolvedContent = converter.xml_str2json(mergedContent);
        }
        if (isResolvingFinished.call(this, resolveObject)) {
            onXlinkAllElementsLoaded.call(this, resolveObject);
        }
    }, onXlinkAllElementsLoaded = function(resolveObject) {
        var elements = [], i, obj;
        mergeElementsBack.call(this, resolveObject);
        if (resolveObject.resolveType === RESOLVE_TYPE_ONACTUATE) {
            this.notify(MediaPlayer.dependencies.XlinkController.eventList.ENAME_XLINK_READY, {
                manifest: manifest
            });
        }
        if (resolveObject.resolveType === RESOLVE_TYPE_ONLOAD) {
            switch (resolveObject.type) {
              case ELEMENT_TYPE_PERIOD:
                for (i = 0; i < manifest[ELEMENT_TYPE_PERIOD + "_asArray"].length; i++) {
                    obj = manifest[ELEMENT_TYPE_PERIOD + "_asArray"][i];
                    if (obj.hasOwnProperty(ELEMENT_TYPE_ADAPTATIONSET + "_asArray")) {
                        elements = elements.concat(getElementsToResolve.call(this, obj[ELEMENT_TYPE_ADAPTATIONSET + "_asArray"], obj, ELEMENT_TYPE_ADAPTATIONSET, RESOLVE_TYPE_ONLOAD));
                    }
                    if (obj.hasOwnProperty(ELEMENT_TYPE_EVENTSTREAM + "_asArray")) {
                        elements = elements.concat(getElementsToResolve.call(this, obj[ELEMENT_TYPE_EVENTSTREAM + "_asArray"], obj, ELEMENT_TYPE_EVENTSTREAM, RESOLVE_TYPE_ONLOAD));
                    }
                }
                resolve.call(this, elements, ELEMENT_TYPE_ADAPTATIONSET, RESOLVE_TYPE_ONLOAD);
                break;

              case ELEMENT_TYPE_ADAPTATIONSET:
                this.notify(MediaPlayer.dependencies.XlinkController.eventList.ENAME_XLINK_READY, {
                    manifest: manifest
                });
                break;
            }
        }
    }, getElementsToResolve = function(elements, parentElement, type, resolveType) {
        var toResolve = [], element, i, xlinkObject;
        for (i = elements.length - 1; i >= 0; i -= 1) {
            element = elements[i];
            if (element.hasOwnProperty("xlink:href") && element["xlink:href"] === RESOLVE_TO_ZERO) {
                elements.splice(i, 1);
            }
        }
        for (i = 0; i < elements.length; i++) {
            element = elements[i];
            if (element.hasOwnProperty("xlink:href") && element.hasOwnProperty("xlink:actuate") && element["xlink:actuate"] === resolveType) {
                xlinkObject = createXlinkObject(element["xlink:href"], parentElement, type, i, resolveType, element);
                toResolve.push(xlinkObject);
            }
        }
        return toResolve;
    }, mergeElementsBack = function(resolveObject) {
        var element, type, resolvedElements = [], obj, i, j, k;
        for (i = resolveObject.elements.length - 1; i >= 0; i--) {
            element = resolveObject.elements[i];
            type = element.type + "_asArray";
            if (!element.resolvedContent || isInappropriateTarget()) {
                delete element.originalContent["xlink:actuate"];
                delete element.originalContent["xlink:href"];
                resolvedElements.push(element.originalContent);
            } else if (element.resolvedContent) {
                for (j = 0; j < element.resolvedContent[type].length; j++) {
                    obj = element.resolvedContent[type][j];
                    resolvedElements.push(obj);
                }
            }
            element.parentElement[type].splice(element.index, 1);
            for (k = 0; k < resolvedElements.length; k++) {
                element.parentElement[type].splice(element.index + k, 0, resolvedElements[k]);
            }
            resolvedElements = [];
        }
        if (resolveObject.elements.length > 0) {
            iron.run(manifest);
        }
    }, createXlinkObject = function(url, parentElement, type, index, resolveType, originalContent) {
        return {
            url: url,
            parentElement: parentElement,
            type: type,
            index: index,
            resolveType: resolveType,
            originalContent: originalContent,
            resolvedContent: null,
            resolved: false
        };
    }, isResolvingFinished = function(elementsToResolve) {
        var i, obj;
        for (i = 0; i < elementsToResolve.elements.length; i++) {
            obj = elementsToResolve.elements[i];
            if (obj.resolved === false) {
                return false;
            }
        }
        return true;
    }, isInappropriateTarget = function() {
        return false;
    };
    return {
        xlinkLoader: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        setup: function() {
            onXlinkElementLoaded = onXlinkElementLoaded.bind(this);
            this.xlinkLoader.subscribe(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED, this, onXlinkElementLoaded);
        },
        resolveManifestOnLoad: function(manifest) {
            resolveManifestOnLoad.call(this, manifest);
        },
        setMatchers: function(value) {
            matchers = value;
        },
        setIron: function(value) {
            iron = value;
        }
    };
};

MediaPlayer.dependencies.XlinkController.prototype = {
    constructor: MediaPlayer.dependencies.XlinkController
};

MediaPlayer.dependencies.XlinkController.eventList = {
    ENAME_XLINK_ALLELEMENTSLOADED: "xlinkAllElementsLoaded",
    ENAME_XLINK_READY: "xlinkReady"
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
        if (source.duration != value) source.duration = value;
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
    this.system = undefined;
    this.log = undefined;
    this.keySystems = [];
    this.notify = undefined;
    this.subscribe = undefined;
    this.unsubscribe = undefined;
    this.clearkeyKeySystem = undefined;
};

MediaPlayer.dependencies.ProtectionExtensions.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionExtensions,
    setup: function() {
        var keySystem;
        keySystem = this.system.getObject("ksPlayReady");
        this.keySystems.push(keySystem);
        keySystem = this.system.getObject("ksWidevine");
        this.keySystems.push(keySystem);
        keySystem = this.system.getObject("ksClearKey");
        this.keySystems.push(keySystem);
        this.clearkeyKeySystem = keySystem;
    },
    getKeySystems: function() {
        return this.keySystems;
    },
    getKeySystemBySystemString: function(systemString) {
        for (var i = 0; i < this.keySystems.length; i++) {
            if (this.keySystems[i].systemString === systemString) {
                return this.keySystems[i];
            }
        }
        return null;
    },
    isClearKey: function(keySystem) {
        return keySystem === this.clearkeyKeySystem;
    },
    initDataEquals: function(initData1, initData2) {
        if (initData1.byteLength === initData2.byteLength) {
            for (var j = 0; j < initData1.byteLength; j++) {
                if (initData1[j] !== initData2[j]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    getSupportedKeySystemsFromContentProtection: function(cps) {
        var cp, ks, ksIdx, cpIdx, supportedKS = [];
        if (cps) {
            for (ksIdx = 0; ksIdx < this.keySystems.length; ++ksIdx) {
                ks = this.keySystems[ksIdx];
                for (cpIdx = 0; cpIdx < cps.length; ++cpIdx) {
                    cp = cps[cpIdx];
                    if (cp.schemeIdUri.toLowerCase() === ks.schemeIdURI) {
                        var initData = ks.getInitData(cp);
                        if (!!initData) {
                            supportedKS.push({
                                ks: this.keySystems[ksIdx],
                                initData: initData
                            });
                        }
                    }
                }
            }
        }
        return supportedKS;
    },
    getSupportedKeySystems: function(initData) {
        var ksIdx, supportedKS = [], pssh = MediaPlayer.dependencies.protection.CommonEncryption.parsePSSHList(initData);
        for (ksIdx = 0; ksIdx < this.keySystems.length; ++ksIdx) {
            if (this.keySystems[ksIdx].uuid in pssh) {
                supportedKS.push({
                    ks: this.keySystems[ksIdx],
                    initData: pssh[this.keySystems[ksIdx].uuid]
                });
            }
        }
        return supportedKS;
    },
    autoSelectKeySystem: function(supportedKS, protectionController, videoInfo, audioInfo) {
        if (supportedKS.length === 0) {
            throw new Error("DRM system for this content not supported by the player!");
        }
        var audioCapabilities = [], videoCapabilities = [];
        if (videoInfo) {
            videoCapabilities.push(new MediaPlayer.vo.protection.MediaCapability(videoInfo.codec));
        }
        if (audioInfo) {
            audioCapabilities.push(new MediaPlayer.vo.protection.MediaCapability(audioInfo.codec));
        }
        var ksConfig = new MediaPlayer.vo.protection.KeySystemConfiguration(audioCapabilities, videoCapabilities);
        var requestedKeySystems = [];
        for (var i = 0; i < supportedKS.length; i++) {
            requestedKeySystems.push({
                ks: supportedKS[i].ks,
                configs: [ ksConfig ]
            });
        }
        var self = this;
        (function(protCtrl) {
            var cbObj = {};
            cbObj[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE] = function(event) {
                protCtrl.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, this);
                if (!event.error) {
                    var keySystemAccess = event.data;
                    self.log("KeySystem Access Granted (" + keySystemAccess.keySystem.systemString + ")!");
                    protCtrl.selectKeySystem(keySystemAccess);
                } else {
                    self.log(event.error);
                }
            };
            protCtrl.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, cbObj);
            protCtrl.requestKeySystemAccess(requestedKeySystems);
        })(protectionController);
    },
    requestLicense: function(keySystem, protData, message, laURL, requestData) {
        var licenseServerData = null;
        if (protData && protData.hasOwnProperty("drmtoday")) {
            licenseServerData = this.system.getObject("serverDRMToday");
        } else if (keySystem.systemString === "com.widevine.alpha") {
            licenseServerData = this.system.getObject("serverWidevine");
        } else if (keySystem.systemString === "com.microsoft.playready") {
            licenseServerData = this.system.getObject("serverPlayReady");
        } else if (keySystem.systemString === "org.w3.clearkey") {
            licenseServerData = this.system.getObject("serverClearKey");
        } else {
            this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, requestData, new Error("DRM: Unknown key system! -- " + keySystem.keySystemStr));
            return;
        }
        if (keySystem.systemString === "org.w3.clearkey") {
            try {
                var clearkeys = licenseServerData.getClearKeysFromProtectionData(protData, message);
                if (clearkeys) {
                    var event = new MediaPlayer.vo.protection.LicenseRequestComplete(clearkeys, requestData);
                    this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, event);
                    return;
                }
            } catch (error) {
                this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, requestData, error.message);
                return;
            }
        }
        var xhr = new XMLHttpRequest(), url = protData && protData.laURL && protData.laURL !== "" ? protData.laURL : laURL, self = this;
        url = licenseServerData.getServerURLFromMessage(url, message);
        if (!url) {
            this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, requestData, new Error("DRM: No license server URL specified!"));
            return;
        }
        xhr.open(licenseServerData.getHTTPMethod(), url, true);
        xhr.responseType = licenseServerData.getResponseType(keySystem.systemString);
        xhr.onload = function() {
            if (this.status == 200) {
                var event = new MediaPlayer.vo.protection.LicenseRequestComplete(licenseServerData.getLicenseMessage(this.response, keySystem.systemString), requestData);
                self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, event);
            } else {
                self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, requestData, new Error("DRM: " + keySystem.systemString + ' update, XHR status is "' + this.statusText + '" (' + this.status + "), expected to be 200. readyState is " + this.readyState) + ".  Response is " + (this.response ? licenseServerData.getErrorResponse(this.response, keySystem.systemString) : "NONE"));
            }
        };
        xhr.onabort = function() {
            self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, requestData, new Error("DRM: " + keySystem.systemString + ' update, XHR aborted. status is "' + this.statusText + '" (' + this.status + "), readyState is " + this.readyState));
        };
        xhr.onerror = function() {
            self.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE, requestData, new Error("DRM: " + keySystem.systemString + ' update, XHR error. status is "' + this.statusText + '" (' + this.status + "), readyState is " + this.readyState));
        };
        var updateHeaders = function(headers) {
            var key;
            if (headers) {
                for (key in headers) {
                    if ("authorization" === key.toLowerCase()) {
                        xhr.withCredentials = true;
                    }
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        };
        if (protData) {
            updateHeaders(protData.httpRequestHeaders);
        }
        updateHeaders(keySystem.getRequestHeadersFromMessage(message));
        if (protData && protData.withCredentials) {
            xhr.withCredentials = true;
        }
        xhr.send(keySystem.getLicenseRequestFromMessage(message));
    }
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
            if (mediaInfo.isText || codec.indexOf('codecs="stpp"') != -1) {
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
        if (ranges !== null && ranges !== undefined) {
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
    getTotalBufferedTime: function(buffer) {
        var ranges = this.getAllRanges(buffer), totalBufferedTime = 0, ln, i;
        if (!ranges) return totalBufferedTime;
        for (i = 0, ln = ranges.length; i < ln; i += 1) {
            totalBufferedTime += ranges.end(i) - ranges.start(i);
        }
        return totalBufferedTime;
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
            callback();
        }, updateEndHandler = function() {
            if (buffer.updating) return;
            buffer.removeEventListener("updateend", updateEndHandler, false);
            callback();
        };
        if (!buffer.updating) {
            callback();
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
    append: function(buffer, chunk) {
        var self = this, bytes = chunk.bytes, appendMethod = "append" in buffer ? "append" : "appendBuffer" in buffer ? "appendBuffer" : null;
        if (!appendMethod) return;
        try {
            self.waitForUpdateEnd(buffer, function() {
                buffer[appendMethod](bytes, chunk);
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
            self.waitForUpdateEnd(buffer, function() {
                if (start >= 0 && end > start && mediaSource.readyState !== "ended") {
                    buffer.remove(start, end);
                }
                self.waitForUpdateEnd(buffer, function() {
                    self.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, {
                        buffer: buffer,
                        from: start,
                        to: end
                    });
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
            this.track = video.addTextTrack("captions", label, scrlang);
            this.track.default = isDefaultTrack;
            this.track.mode = "showing";
            this.video = video;
            this.addCaptions(0, captionData);
            return this.track;
        },
        addCaptions: function(timeOffset, captionData) {
            for (var item in captionData) {
                var cue;
                var currentItem = captionData[item];
                var video = this.video;
                if (currentItem.type == "image") {
                    cue = new Cue(currentItem.start - timeOffset, currentItem.end - timeOffset, "");
                    cue.image = currentItem.data;
                    cue.id = currentItem.id;
                    cue.size = 0;
                    cue.type = "image";
                    cue.onenter = function() {
                        var img = new Image();
                        img.id = "ttmlImage_" + this.id;
                        img.src = this.image;
                        img.className = "cue-image";
                        video.parentNode.appendChild(img);
                    };
                    cue.onexit = function() {
                        var imgs = video.parentNode.childNodes;
                        var i;
                        for (i = 0; i < imgs.length; i++) {
                            if (imgs[i].id == "ttmlImage_" + this.id) {
                                video.parentNode.removeChild(imgs[i]);
                            }
                        }
                    };
                } else {
                    cue = new Cue(currentItem.start - timeOffset, currentItem.end - timeOffset, currentItem.data);
                    if (currentItem.styles) {
                        if (currentItem.styles.align !== undefined && cue.hasOwnProperty("align")) {
                            cue.align = currentItem.styles.align;
                        }
                        if (currentItem.styles.line !== undefined && cue.hasOwnProperty("line")) {
                            cue.line = currentItem.styles.line;
                        }
                        if (currentItem.styles.position !== undefined && cue.hasOwnProperty("position")) {
                            cue.position = currentItem.styles.position;
                        }
                        if (currentItem.styles.size !== undefined && cue.hasOwnProperty("size")) {
                            cue.size = currentItem.styles.size;
                        }
                    }
                }
                this.track.addCue(cue);
            }
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
    var context = null, executedRequests = [], pendingRequests = [], loadingRequests = [], rejectedRequests = [], isLoadingPostponed = false, loadCurrentFragment = function(request) {
        var self = this;
        self.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED, {
            request: request
        });
        self.fragmentLoader.load(request);
    }, removeRequest = function(arr, request) {
        var idx = arr.indexOf(request);
        if (idx !== -1) {
            arr.splice(idx, 1);
        }
    }, getRequestForTime = function(arr, time, threshold) {
        var lastIdx = arr.length - 1, start = NaN, end = NaN, req = null, i;
        for (i = lastIdx; i >= 0; i -= 1) {
            req = arr[i];
            start = req.startTime;
            end = start + req.duration;
            threshold = threshold || req.duration / 2;
            if (!isNaN(start) && !isNaN(end) && time + threshold >= start && time - threshold < end || isNaN(start) && isNaN(time)) {
                return req;
            }
        }
        return null;
    }, filterRequests = function(arr, filter) {
        if (!filter) return arr;
        if (filter.hasOwnProperty("time")) {
            return [ getRequestForTime.call(this, arr, filter.time, filter.threshold) ];
        }
        return arr.filter(function(request) {
            for (var prop in filter) {
                if (prop === "state") continue;
                if (filter.hasOwnProperty(prop) && request[prop] != filter[prop]) return false;
            }
            return true;
        });
    }, getRequestsForState = function(state) {
        var requests;
        switch (state) {
          case MediaPlayer.dependencies.FragmentModel.states.PENDING:
            requests = pendingRequests;
            break;

          case MediaPlayer.dependencies.FragmentModel.states.LOADING:
            requests = loadingRequests;
            break;

          case MediaPlayer.dependencies.FragmentModel.states.EXECUTED:
            requests = executedRequests;
            break;

          case MediaPlayer.dependencies.FragmentModel.states.REJECTED:
            requests = rejectedRequests;
            break;

          default:
            requests = [];
        }
        return requests;
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
        addSchedulingInfoMetrics.call(this, request, error ? MediaPlayer.dependencies.FragmentModel.states.FAILED : MediaPlayer.dependencies.FragmentModel.states.EXECUTED);
        this.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, {
            request: request,
            response: response
        }, error);
    }, onBytesRejected = function(e) {
        var req = this.getRequests({
            state: MediaPlayer.dependencies.FragmentModel.states.EXECUTED,
            quality: e.data.quality,
            index: e.data.index
        })[0];
        if (req) {
            removeRequest.call(this, executedRequests, req);
            if (!isNaN(e.data.index)) {
                rejectedRequests.push(req);
                addSchedulingInfoMetrics.call(this, req, MediaPlayer.dependencies.FragmentModel.states.REJECTED);
            }
        }
    }, onBufferLevelOutrun = function() {
        isLoadingPostponed = true;
    }, onBufferLevelBalanced = function() {
        isLoadingPostponed = false;
    };
    return {
        system: undefined,
        log: undefined,
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
            addSchedulingInfoMetrics.call(this, value, MediaPlayer.dependencies.FragmentModel.states.PENDING);
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
        getRequests: function(filter) {
            var requests = [], filteredRequests = [], states, ln = 1;
            if (!filter || !filter.state) return requests;
            if (filter.state instanceof Array) {
                ln = filter.state.length;
                states = filter.state;
            } else {
                states = [ filter.state ];
            }
            for (var i = 0; i < ln; i += 1) {
                requests = getRequestsForState.call(this, states[i]);
                filteredRequests = filteredRequests.concat(filterRequests.call(this, requests, filter));
            }
            return filteredRequests;
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
        removeExecutedRequest: function(request) {
            removeRequest.call(this, executedRequests, request);
        },
        removeRejectedRequest: function(request) {
            removeRequest.call(this, rejectedRequests, request);
        },
        removeExecutedRequestsBeforeTime: function(time) {
            var lastIdx = executedRequests.length - 1, start = NaN, req = null, i;
            for (i = lastIdx; i >= 0; i -= 1) {
                req = executedRequests[i];
                start = req.startTime;
                if (!isNaN(start) && start < time) {
                    removeRequest.call(this, executedRequests, req);
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
                addSchedulingInfoMetrics.call(self, request, MediaPlayer.dependencies.FragmentModel.states.CANCELED);
            });
            return canceled;
        },
        abortRequests: function() {
            var reqs = [];
            this.fragmentLoader.abort();
            while (loadingRequests.length > 0) {
                reqs.push(loadingRequests[0]);
                removeRequest.call(this, loadingRequests, loadingRequests[0]);
            }
            loadingRequests = [];
            return reqs;
        },
        executeRequest: function(request) {
            var self = this, idx = pendingRequests.indexOf(request);
            if (!request || idx === -1) return;
            pendingRequests.splice(idx, 1);
            switch (request.action) {
              case "complete":
                executedRequests.push(request);
                addSchedulingInfoMetrics.call(self, request, MediaPlayer.dependencies.FragmentModel.states.EXECUTED);
                self.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED, {
                    request: request
                });
                break;

              case "download":
                loadingRequests.push(request);
                addSchedulingInfoMetrics.call(self, request, MediaPlayer.dependencies.FragmentModel.states.LOADING);
                loadCurrentFragment.call(self, request);
                break;

              default:
                this.log("Unknown request action.");
            }
        },
        reset: function() {
            this.abortRequests();
            this.cancelPendingRequests();
            context = null;
            executedRequests = [];
            pendingRequests = [];
            loadingRequests = [];
            rejectedRequests = [];
            isLoadingPostponed = false;
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

MediaPlayer.dependencies.FragmentModel.states = {
    PENDING: "pending",
    LOADING: "loading",
    EXECUTED: "executed",
    REJECTED: "rejected",
    CANCELED: "canceled",
    FAILED: "failed"
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
                type: MediaPlayer.events.MANIFEST_LOADED,
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
                type: MediaPlayer.events.METRICS_CHANGED,
                data: {}
            });
        },
        metricChanged: function(mediaType) {
            this.eventBus.dispatchEvent({
                type: MediaPlayer.events.METRIC_CHANGED,
                data: {
                    stream: mediaType
                }
            });
            this.metricsChanged();
        },
        metricUpdated: function(mediaType, metricType, vo) {
            this.eventBus.dispatchEvent({
                type: MediaPlayer.events.METRIC_UPDATED,
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
                type: MediaPlayer.events.METRIC_ADDED,
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
            if (manifestUpdate) {
                for (var field in updatedFields) {
                    manifestUpdate[field] = updatedFields[field];
                }
                this.metricUpdated(manifestUpdate.mediaType, this.adapter.metricsList.MANIFEST_UPDATE, manifestUpdate);
            }
        },
        addManifestUpdateStreamInfo: function(manifestUpdate, id, index, start, duration) {
            if (manifestUpdate) {
                var vo = new MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo();
                vo.id = id;
                vo.index = index;
                vo.start = start;
                vo.duration = duration;
                manifestUpdate.streamInfo.push(vo);
                this.metricUpdated(manifestUpdate.mediaType, this.adapter.metricsList.MANIFEST_UPDATE_STREAM_INFO, manifestUpdate);
                return vo;
            }
            return null;
        },
        addManifestUpdateTrackInfo: function(manifestUpdate, id, index, streamIndex, mediaType, presentationTimeOffset, startNumber, fragmentInfoType) {
            if (manifestUpdate) {
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
            }
            return null;
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
    ENAME_KEY_SYSTEM_ACCESS_COMPLETE: "keySystemAccessComplete",
    ENAME_KEY_SYSTEM_SELECTED: "keySystemSelected",
    ENAME_VIDEO_ELEMENT_SELECTED: "videoElementSelected",
    ENAME_SERVER_CERTIFICATE_UPDATED: "serverCertificateUpdated",
    ENAME_KEY_MESSAGE: "keyMessage",
    ENAME_KEY_ADDED: "keyAdded",
    ENAME_KEY_ERROR: "keyError",
    ENAME_KEY_SESSION_CREATED: "keySessionCreated",
    ENAME_KEY_SESSION_REMOVED: "keySessionRemoved",
    ENAME_KEY_SESSION_CLOSED: "keySessionClosed",
    ENAME_KEY_STATUSES_CHANGED: "keyStatusesChanged"
};

MediaPlayer.models.ProtectionModel_01b = function() {
    var videoElement = null, api = null, pendingSessions = [], sessions = [], moreSessionsAllowed, createEventHandler = function() {
        var self = this;
        return {
            handleEvent: function(event) {
                var sessionToken = null;
                switch (event.type) {
                  case api.needkey:
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, new MediaPlayer.vo.protection.NeedKey(event.initData, "cenc"));
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
                        self.log("No session token found for key error");
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
                        self.log("No session token found for key added");
                    }
                    break;

                  case api.keymessage:
                    moreSessionsAllowed = event.sessionId !== null && event.sessionId !== undefined;
                    if (moreSessionsAllowed) {
                        sessionToken = findSessionByID(sessions, event.sessionId);
                        if (!sessionToken && pendingSessions.length > 0) {
                            sessionToken = pendingSessions.shift();
                            sessions.push(sessionToken);
                            sessionToken.sessionID = event.sessionId;
                        }
                    } else if (pendingSessions.length > 0) {
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
                        self.log("No session token found for key message");
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
        log: undefined,
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
        requestKeySystemAccess: function(ksConfigurations) {
            var ve = videoElement;
            if (!ve) {
                ve = document.createElement("video");
            }
            var found = false;
            for (var ksIdx = 0; ksIdx < ksConfigurations.length; ksIdx++) {
                var systemString = ksConfigurations[ksIdx].ks.systemString;
                var configs = ksConfigurations[ksIdx].configs;
                var supportedAudio = null;
                var supportedVideo = null;
                for (var configIdx = 0; configIdx < configs.length; configIdx++) {
                    var videos = configs[configIdx].videoCapabilities;
                    if (videos && videos.length !== 0) {
                        supportedVideo = [];
                        for (var videoIdx = 0; videoIdx < videos.length; videoIdx++) {
                            if (ve.canPlayType(videos[videoIdx].contentType, systemString) !== "") {
                                supportedVideo.push(videos[videoIdx]);
                            }
                        }
                    }
                    if (!supportedAudio && !supportedVideo || supportedAudio && supportedAudio.length === 0 || supportedVideo && supportedVideo.length === 0) {
                        continue;
                    }
                    found = true;
                    var ksConfig = new MediaPlayer.vo.protection.KeySystemConfiguration(supportedAudio, supportedVideo);
                    var ks = this.protectionExt.getKeySystemBySystemString(systemString);
                    var ksAccess = new MediaPlayer.vo.protection.KeySystemAccess(ks, ksConfig);
                    this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, ksAccess);
                    break;
                }
            }
            if (!found) {
                this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, null, "Key system access denied! -- No valid audio/video content configurations detected!");
            }
        },
        selectKeySystem: function(keySystemAccess) {
            this.keySystem = keySystemAccess.keySystem;
            this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED);
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
            this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_VIDEO_ELEMENT_SELECTED);
        },
        createKeySession: function(initData) {
            if (!this.keySystem) {
                throw new Error("Can not create sessions until you have selected a key system");
            }
            var i;
            for (i = 0; i < sessions.length; i++) {
                if (this.protectionExt.initDataEquals(initData, sessions[i].initData)) {
                    return;
                }
            }
            for (i = 0; i < pendingSessions.length; i++) {
                if (this.protectionExt.initDataEquals(initData, pendingSessions[i].initData)) {
                    return;
                }
            }
            if (moreSessionsAllowed || sessions.length === 0) {
                var newSession = {
                    prototype: new MediaPlayer.models.SessionToken().prototype,
                    sessionID: null,
                    initData: initData,
                    getSessionID: function() {
                        return this.sessionID;
                    }
                };
                pendingSessions.push(newSession);
                videoElement[api.generateKeyRequest](this.keySystem.systemString, new Uint8Array(initData));
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
        setServerCertificate: function() {},
        loadKeySession: function() {},
        removeKeySession: function() {}
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

MediaPlayer.models.ProtectionModel_21Jan2015 = function() {
    var videoElement = null, mediaKeys = null, sessions = [], requestKeySystemAccessInternal = function(ksConfigurations, idx) {
        var self = this;
        (function(i) {
            var keySystem = ksConfigurations[i].ks;
            var configs = ksConfigurations[i].configs;
            navigator.requestMediaKeySystemAccess(keySystem.systemString, configs).then(function(mediaKeySystemAccess) {
                var configuration = typeof mediaKeySystemAccess.getConfiguration === "function" ? mediaKeySystemAccess.getConfiguration() : null;
                var keySystemAccess = new MediaPlayer.vo.protection.KeySystemAccess(keySystem, configuration);
                keySystemAccess.mksa = mediaKeySystemAccess;
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, keySystemAccess);
            }).catch(function() {
                if (++i < ksConfigurations.length) {
                    requestKeySystemAccessInternal.call(self, ksConfigurations, i);
                } else {
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, null, "Key system access denied!");
                }
            });
        })(idx);
    }, createEventHandler = function() {
        var self = this;
        return {
            handleEvent: function(event) {
                switch (event.type) {
                  case "encrypted":
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, new MediaPlayer.vo.protection.NeedKey(event.initData, event.initDataType));
                    break;
                }
            }
        };
    }, eventHandler = null, removeSession = function(token) {
        for (var i = 0; i < sessions.length; i++) {
            if (sessions[i] === token) {
                sessions.splice(i, 1);
                break;
            }
        }
    }, createSessionToken = function(session, initData) {
        var self = this;
        var token = {
            prototype: new MediaPlayer.models.SessionToken().prototype,
            session: session,
            initData: initData,
            handleEvent: function(event) {
                switch (event.type) {
                  case "keystatuseschange":
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_STATUSES_CHANGED, this);
                    break;

                  case "message":
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, new MediaPlayer.vo.protection.KeyMessage(this, event.message, undefined, event.messageType));
                    break;
                }
            },
            getSessionID: function() {
                return this.session.sessionId;
            },
            getExpirationTime: function() {
                return this.session.expiration;
            },
            getKeyStatuses: function() {
                return this.session.keyStatuses;
            }
        };
        session.addEventListener("keystatuseschange", token);
        session.addEventListener("message", token);
        session.closed.then(function() {
            removeSession(token);
            self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, token.getSessionID());
        });
        sessions.push(token);
        return token;
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
        init: function() {},
        teardown: function() {
            if (videoElement) {
                videoElement.removeEventListener("encrypted", eventHandler);
                videoElement.setMediaKeys(null);
            }
            for (var i = 0; i < sessions.length; i++) {
                this.closeKeySession(sessions[i]);
            }
        },
        requestKeySystemAccess: function(ksConfigurations) {
            requestKeySystemAccessInternal.call(this, ksConfigurations, 0);
        },
        selectKeySystem: function(keySystemAccess) {
            var self = this;
            keySystemAccess.mksa.createMediaKeys().then(function(mkeys) {
                self.keySystem = keySystemAccess.keySystem;
                mediaKeys = mkeys;
                if (videoElement) {
                    videoElement.setMediaKeys(mediaKeys);
                }
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED);
            }).catch(function() {
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED, null, "Error selecting keys system (" + keySystemAccess.keySystem.systemString + ")! Could not create MediaKeys -- TODO");
            });
        },
        setMediaElement: function(mediaElement) {
            if (videoElement) {
                videoElement.removeEventListener("encrypted", eventHandler);
            }
            videoElement = mediaElement;
            videoElement.addEventListener("encrypted", eventHandler);
            if (mediaKeys) {
                videoElement.setMediaKeys(mediaKeys);
            }
        },
        setServerCertificate: function(serverCertificate) {
            if (!this.keySystem || !mediaKeys) {
                throw new Error("Can not set server certificate until you have selected a key system");
            }
            var self = this;
            mediaKeys.setServerCertificate(serverCertificate).then(function() {
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED);
            }).catch(function(error) {
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED, null, "Error updating server certificate -- " + error.name);
            });
        },
        createKeySession: function(initData, sessionType) {
            if (!this.keySystem || !mediaKeys) {
                throw new Error("Can not create sessions until you have selected a key system");
            }
            for (var i = 0; i < sessions.length; i++) {
                if (this.protectionExt.initDataEquals(initData, sessions[i].initData)) {
                    return;
                }
            }
            var session = mediaKeys.createSession(sessionType);
            var sessionToken = createSessionToken.call(this, session, initData);
            var self = this;
            session.generateRequest("cenc", initData).then(function() {
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, sessionToken);
            }).catch(function(error) {
                removeSession(sessionToken);
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, null, "Error generating key request -- " + error.name);
            });
        },
        updateKeySession: function(sessionToken, message) {
            var session = sessionToken.session;
            var self = this;
            if (this.protectionExt.isClearKey(this.keySystem)) {
                message = message.toJWK();
            }
            session.update(message).catch(function(error) {
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, new MediaPlayer.vo.protection.KeyError(sessionToken, "Error sending update() message! " + error.name));
            });
        },
        loadKeySession: function(sessionID) {
            if (!this.keySystem || !mediaKeys) {
                throw new Error("Can not load sessions until you have selected a key system");
            }
            var session = mediaKeys.createSession();
            var self = this;
            session.load(sessionID).then(function(success) {
                if (success) {
                    var sessionToken = createSessionToken.call(this, session);
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, sessionToken);
                } else {
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, null, "Could not load session! Invalid Session ID (" + sessionID + ")");
                }
            }).catch(function(error) {
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, null, "Could not load session (" + sessionID + ")! " + error.name);
            });
        },
        removeKeySession: function(sessionToken) {
            var session = sessionToken.session;
            var self = this;
            session.remove().then(function() {
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED, sessionToken.getSessionID());
            }).catch(function(error) {
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED, null, "Error removing session (" + sessionToken.getSessionID() + "). " + error.name);
            });
        },
        closeKeySession: function(sessionToken) {
            var session = sessionToken.session;
            session.removeEventListener("keystatuseschange", sessionToken);
            session.removeEventListener("message", sessionToken);
            var self = this;
            session.close().catch(function(error) {
                self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, null, "Error closing session (" + sessionToken.getSessionID() + ") " + error.name);
            });
        }
    };
};

MediaPlayer.models.ProtectionModel_21Jan2015.detect = function(videoElement) {
    if (videoElement.onencrypted === undefined || videoElement.mediaKeys === undefined) {
        return false;
    }
    if (navigator.requestMediaKeySystemAccess === undefined || typeof navigator.requestMediaKeySystemAccess !== "function") {
        return false;
    }
    return true;
};

MediaPlayer.models.ProtectionModel_21Jan2015.prototype = {
    constructor: MediaPlayer.models.ProtectionModel_21Jan2015
};

MediaPlayer.models.ProtectionModel_3Feb2014 = function() {
    var videoElement = null, mediaKeys = null, keySystemAccess = null, api = null, sessions = [], createEventHandler = function() {
        var self = this;
        return {
            handleEvent: function(event) {
                switch (event.type) {
                  case api.needkey:
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, new MediaPlayer.vo.protection.NeedKey(event.initData, "cenc"));
                    break;
                }
            }
        };
    }, eventHandler = null, setMediaKeys = function() {
        var doSetKeys = function() {
            videoElement[api.setMediaKeys](mediaKeys);
            this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_VIDEO_ELEMENT_SELECTED);
        };
        if (videoElement.readyState >= 1) {
            doSetKeys.call(this);
        } else {
            videoElement.addEventListener("loadedmetadata", doSetKeys.bind(this));
        }
    }, createSessionToken = function(keySession, initData) {
        var self = this;
        return {
            prototype: new MediaPlayer.models.SessionToken().prototype,
            session: keySession,
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
                    self.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, this.getSessionID());
                    break;
                }
            },
            getSessionID: function() {
                return this.session.sessionId;
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
        requestKeySystemAccess: function(ksConfigurations) {
            var found = false;
            for (var ksIdx = 0; ksIdx < ksConfigurations.length; ksIdx++) {
                var systemString = ksConfigurations[ksIdx].ks.systemString;
                var configs = ksConfigurations[ksIdx].configs;
                var supportedAudio = null;
                var supportedVideo = null;
                for (var configIdx = 0; configIdx < configs.length; configIdx++) {
                    var audios = configs[configIdx].audioCapabilities;
                    var videos = configs[configIdx].videoCapabilities;
                    if (audios && audios.length !== 0) {
                        supportedAudio = [];
                        for (var audioIdx = 0; audioIdx < audios.length; audioIdx++) {
                            if (window[api.MediaKeys].isTypeSupported(systemString, audios[audioIdx].contentType)) {
                                supportedAudio.push(audios[audioIdx]);
                            }
                        }
                    }
                    if (videos && videos.length !== 0) {
                        supportedVideo = [];
                        for (var videoIdx = 0; videoIdx < videos.length; videoIdx++) {
                            if (window[api.MediaKeys].isTypeSupported(systemString, videos[videoIdx].contentType)) {
                                supportedVideo.push(videos[videoIdx]);
                            }
                        }
                    }
                    if (!supportedAudio && !supportedVideo || supportedAudio && supportedAudio.length === 0 || supportedVideo && supportedVideo.length === 0) {
                        continue;
                    }
                    found = true;
                    var ksConfig = new MediaPlayer.vo.protection.KeySystemConfiguration(supportedAudio, supportedVideo);
                    var ks = this.protectionExt.getKeySystemBySystemString(systemString);
                    var ksAccess = new MediaPlayer.vo.protection.KeySystemAccess(ks, ksConfig);
                    this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, ksAccess);
                    break;
                }
            }
            if (!found) {
                this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, null, "Key system access denied! -- No valid audio/video content configurations detected!");
            }
        },
        selectKeySystem: function(ksAccess) {
            try {
                mediaKeys = ksAccess.mediaKeys = new window[api.MediaKeys](ksAccess.keySystem.systemString);
                this.keySystem = ksAccess.keySystem;
                keySystemAccess = ksAccess;
                if (videoElement) {
                    setMediaKeys.call(this);
                }
                this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED);
            } catch (error) {
                this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED, null, "Error selecting keys system (" + this.keySystem.systemString + ")! Could not create MediaKeys -- TODO");
            }
        },
        setMediaElement: function(mediaElement) {
            if (videoElement) {
                videoElement.removeEventListener(api.needkey, eventHandler);
            }
            videoElement = mediaElement;
            videoElement.addEventListener(api.needkey, eventHandler);
            if (mediaKeys) {
                setMediaKeys.call(this);
            }
        },
        createKeySession: function(initData) {
            if (!this.keySystem || !mediaKeys || !keySystemAccess) {
                throw new Error("Can not create sessions until you have selected a key system");
            }
            for (var i = 0; i < sessions.length; i++) {
                if (this.protectionExt.initDataEquals(initData, sessions[i].initData)) {
                    return;
                }
            }
            var contentType = keySystemAccess.ksConfiguration.videoCapabilities[0].contentType;
            var session = mediaKeys.createSession(contentType, new Uint8Array(initData));
            var sessionToken = createSessionToken.call(this, session, initData);
            session.addEventListener(api.error, sessionToken);
            session.addEventListener(api.message, sessionToken);
            session.addEventListener(api.ready, sessionToken);
            session.addEventListener(api.close, sessionToken);
            sessions.push(sessionToken);
            this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, sessionToken);
        },
        updateKeySession: function(sessionToken, message) {
            var session = sessionToken.session;
            if (!this.protectionExt.isClearKey(this.keySystem)) {
                session.update(message);
            } else {
                session.update(new Uint8Array(message.toJWK()));
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
        },
        setServerCertificate: function() {},
        loadKeySession: function() {},
        removeKeySession: function() {}
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
        if (type === null || element.seeking) {
            return;
        }
        this.setPlaybackRate(0);
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
            this.setPlaybackRate(1);
        }
    }, stallStream = function(type, isStalled) {
        if (isStalled) {
            addStalledStream.call(this, type);
        } else {
            removeStalledStream.call(this, type);
        }
    };
    return {
        system: undefined,
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
            if (!element || element.readyState < 2) return;
            element.playbackRate = value;
        },
        getCurrentTime: function() {
            return element.currentTime;
        },
        setCurrentTime: function(currentTime) {
            if (element.currentTime == currentTime) return;
            try {
                element.currentTime = currentTime;
            } catch (e) {
                if (element.readyState === 0 && e.code === e.INVALID_STATE_ERR) {
                    setTimeout(function() {
                        element.currentTime = currentTime;
                    }, 400);
                }
            }
        },
        setStallState: function(type, state) {
            stallStream.call(this, type, state);
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
        return pssh.slice(32);
    },
    getPSSHForKeySystem: function(keySystem, initData) {
        var psshList = MediaPlayer.dependencies.protection.CommonEncryption.parsePSSHList(initData);
        if (psshList.hasOwnProperty(keySystem.uuid.toLowerCase())) {
            return psshList[keySystem.uuid.toLowerCase()];
        }
        return null;
    },
    parseInitDataFromContentProtection: function(cpData) {
        if ("pssh" in cpData) {
            return BASE64.decodeArray(cpData.pssh.__text).buffer;
        }
        return null;
    },
    parsePSSHList: function(data) {
        if (data === null) return [];
        var dv = new DataView(data), done = false;
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
            if (version !== 0 && version !== 1) {
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
            pssh[systemID] = dv.buffer.slice(boxStart, nextBox);
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
    var keySystemStr = "org.w3.clearkey", keySystemUUID = "1077efec-c0b2-4d02-ace3-3c1e52e2fb4b";
    return {
        system: undefined,
        schemeIdURI: "urn:uuid:" + keySystemUUID,
        systemString: keySystemStr,
        uuid: keySystemUUID,
        getInitData: MediaPlayer.dependencies.protection.CommonEncryption.parseInitDataFromContentProtection,
        getRequestHeadersFromMessage: function() {
            return null;
        },
        getLicenseRequestFromMessage: function(message) {
            return new Uint8Array(message);
        }
    };
};

MediaPlayer.dependencies.protection.KeySystem_ClearKey.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_ClearKey
};

MediaPlayer.dependencies.protection.KeySystem_PlayReady = function() {
    "use strict";
    var keySystemStr = "com.microsoft.playready", keySystemUUID = "9a04f079-9840-4286-ab92-e65be0885f95", getRequestHeaders = function(message) {
        var msg, xmlDoc, headers = {}, parser = new DOMParser();
        msg = String.fromCharCode.apply(null, new Uint16Array(message.buffer));
        xmlDoc = parser.parseFromString(msg, "application/xml");
        var headerNameList = xmlDoc.getElementsByTagName("name");
        var headerValueList = xmlDoc.getElementsByTagName("value");
        for (var i = 0; i < headerNameList.length; i++) {
            headers[headerNameList[i].childNodes[0].nodeValue] = headerValueList[i].childNodes[0].nodeValue;
        }
        return headers;
    }, getLicenseRequest = function(message) {
        var msg, xmlDoc, parser = new DOMParser(), licenseRequest = null;
        msg = String.fromCharCode.apply(null, new Uint16Array(message.buffer));
        xmlDoc = parser.parseFromString(msg, "application/xml");
        if (xmlDoc.getElementsByTagName("Challenge")[0]) {
            var Challenge = xmlDoc.getElementsByTagName("Challenge")[0].childNodes[0].nodeValue;
            if (Challenge) {
                licenseRequest = BASE64.decode(Challenge);
            }
        }
        return licenseRequest;
    }, parseInitDataFromContentProtection = function(cpData) {
        var byteCursor = 0, PROSize, PSSHSize, PSSHBoxType = new Uint8Array([ 112, 115, 115, 104, 0, 0, 0, 0 ]), playreadySystemID = new Uint8Array([ 154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149 ]), uint8arraydecodedPROHeader = null, PSSHBoxBuffer, PSSHBox, PSSHData;
        if ("pssh" in cpData) {
            return MediaPlayer.dependencies.protection.CommonEncryption.parseInitDataFromContentProtection(cpData);
        }
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
        return PSSHBox.buffer;
    };
    return {
        schemeIdURI: "urn:uuid:" + keySystemUUID,
        systemString: keySystemStr,
        uuid: keySystemUUID,
        getInitData: parseInitDataFromContentProtection,
        getRequestHeadersFromMessage: getRequestHeaders,
        getLicenseRequestFromMessage: getLicenseRequest
    };
};

MediaPlayer.dependencies.protection.KeySystem_PlayReady.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_PlayReady
};

MediaPlayer.dependencies.protection.KeySystem_Widevine = function() {
    "use strict";
    var keySystemStr = "com.widevine.alpha", keySystemUUID = "edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";
    return {
        schemeIdURI: "urn:uuid:" + keySystemUUID,
        systemString: keySystemStr,
        uuid: keySystemUUID,
        getInitData: MediaPlayer.dependencies.protection.CommonEncryption.parseInitDataFromContentProtection,
        getRequestHeadersFromMessage: function() {
            return null;
        },
        getLicenseRequestFromMessage: function(message) {
            return new Uint8Array(message);
        }
    };
};

MediaPlayer.dependencies.protection.KeySystem_Widevine.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_Widevine
};

MediaPlayer.dependencies.protection.servers.ClearKey = function() {
    "use strict";
    return {
        getServerURLFromMessage: function(url, message) {
            var jsonMsg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(message)));
            url += "/?";
            for (var i = 0; i < jsonMsg.kids.length; i++) {
                url += jsonMsg.kids[i] + "&";
            }
            url = url.substring(0, url.length - 1);
            return url;
        },
        getHTTPMethod: function() {
            return "GET";
        },
        getResponseType: function() {
            return "json";
        },
        getLicenseMessage: function(serverResponse) {
            if (!serverResponse.hasOwnProperty("keys")) {
                return null;
            }
            var i, keyPairs = [];
            for (i = 0; i < serverResponse.keys.length; i++) {
                var keypair = serverResponse.keys[i], keyid = keypair.kid.replace(/=/g, ""), key = keypair.k.replace(/=/g, "");
                keyPairs.push(new MediaPlayer.vo.protection.KeyPair(keyid, key));
            }
            return new MediaPlayer.vo.protection.ClearKeyKeySet(keyPairs);
        },
        getErrorResponse: function(serverResponse) {
            return String.fromCharCode.apply(null, new Uint8Array(serverResponse));
        },
        getClearKeysFromProtectionData: function(protData, message) {
            var clearkeySet = null;
            if (protData) {
                var jsonMsg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(message)));
                var keyPairs = [];
                for (var i = 0; i < jsonMsg.kids.length; i++) {
                    var clearkeyID = jsonMsg.kids[i], clearkey = protData.clearkeys.hasOwnProperty(clearkeyID) ? protData.clearkeys[clearkeyID] : null;
                    if (!clearkey) {
                        throw new Error("DRM: ClearKey keyID (" + clearkeyID + ") is not known!");
                    }
                    keyPairs.push(new MediaPlayer.vo.protection.KeyPair(clearkeyID, clearkey));
                }
                clearkeySet = new MediaPlayer.vo.protection.ClearKeyKeySet(keyPairs);
            }
            return clearkeySet;
        }
    };
};

MediaPlayer.dependencies.protection.servers.ClearKey.prototype = {
    constructor: MediaPlayer.dependencies.protection.servers.ClearKey
};

MediaPlayer.dependencies.protection.servers.DRMToday = function() {
    "use strict";
    var keySystems = {
        "com.widevine.alpha": {
            responseType: "json",
            getLicenseMessage: function(response) {
                return new Uint8Array(BASE64.decodeArray(response.license));
            },
            getErrorResponse: function(response) {
                return response;
            }
        },
        "com.microsoft.playready": {
            responseType: "arraybuffer",
            getLicenseMessage: function(response) {
                return new Uint8Array(response);
            },
            getErrorResponse: function(response) {
                return String.fromCharCode.apply(null, new Uint8Array(response));
            }
        }
    };
    return {
        getServerURLFromMessage: function(url) {
            return url;
        },
        getHTTPMethod: function() {
            return "POST";
        },
        getResponseType: function(keySystemStr) {
            return keySystems[keySystemStr].responseType;
        },
        getLicenseMessage: function(serverResponse, keySystemStr) {
            return keySystems[keySystemStr].getLicenseMessage(serverResponse);
        },
        getErrorResponse: function(serverResponse, keySystemStr) {
            return keySystems[keySystemStr].getErrorResponse(serverResponse);
        }
    };
};

MediaPlayer.dependencies.protection.servers.DRMToday.prototype = {
    constructor: MediaPlayer.dependencies.protection.servers.DRMToday
};

MediaPlayer.dependencies.protection.servers.PlayReady = function() {
    "use strict";
    return {
        getServerURLFromMessage: function(url) {
            return url;
        },
        getHTTPMethod: function() {
            return "POST";
        },
        getResponseType: function() {
            return "arraybuffer";
        },
        getLicenseMessage: function(serverResponse) {
            return new Uint8Array(serverResponse);
        },
        getErrorResponse: function(serverResponse) {
            return String.fromCharCode.apply(null, new Uint8Array(serverResponse));
        }
    };
};

MediaPlayer.dependencies.protection.servers.PlayReady.prototype = {
    constructor: MediaPlayer.dependencies.protection.servers.PlayReady
};

MediaPlayer.dependencies.protection.servers.Widevine = function() {
    "use strict";
    return {
        getServerURLFromMessage: function(url) {
            return url;
        },
        getHTTPMethod: function() {
            return "POST";
        },
        getResponseType: function() {
            return "arraybuffer";
        },
        getLicenseMessage: function(serverResponse) {
            return new Uint8Array(serverResponse);
        },
        getErrorResponse: function(serverResponse) {
            return String.fromCharCode.apply(null, new Uint8Array(serverResponse));
        }
    };
};

MediaPlayer.dependencies.protection.servers.Widevine.prototype = {
    constructor: MediaPlayer.dependencies.protection.servers.Widevine
};

MediaPlayer.rules.ABRRulesCollection = function() {
    "use strict";
    var qualitySwitchRules = [], adandonFragmentRules = [];
    return {
        insufficientBufferRule: undefined,
        bufferOccupancyRule: undefined,
        throughputRule: undefined,
        abandonRequestRule: undefined,
        getRules: function(type) {
            switch (type) {
              case MediaPlayer.rules.ABRRulesCollection.prototype.QUALITY_SWITCH_RULES:
                return qualitySwitchRules;

              case MediaPlayer.rules.ABRRulesCollection.prototype.ABANDON_FRAGMENT_RULES:
                return adandonFragmentRules;

              default:
                return null;
            }
        },
        setup: function() {
            qualitySwitchRules.push(this.insufficientBufferRule);
            qualitySwitchRules.push(this.throughputRule);
            qualitySwitchRules.push(this.bufferOccupancyRule);
            adandonFragmentRules.push(this.abandonRequestRule);
        }
    };
};

MediaPlayer.rules.ABRRulesCollection.prototype = {
    constructor: MediaPlayer.rules.ABRRulesCollection,
    QUALITY_SWITCH_RULES: "qualitySwitchRules",
    ABANDON_FRAGMENT_RULES: "abandonFragmentRules"
};

MediaPlayer.rules.AbandonRequestsRule = function() {
    "use strict";
    var GRACE_TIME_THRESHOLD = 500, ABANDON_MULTIPLIER = 1.5, fragmentDict = {}, abandonDict = {}, setFragmentRequestDict = function(type, id) {
        fragmentDict[type] = fragmentDict[type] || {};
        fragmentDict[type][id] = fragmentDict[type][id] || {};
    };
    return {
        metricsExt: undefined,
        log: undefined,
        execute: function(context, callback) {
            var now = new Date().getTime(), mediaInfo = context.getMediaInfo(), mediaType = mediaInfo.type, progressEvent = context.getCurrentValue(), trackInfo = context.getTrackInfo(), req = progressEvent.data.request, abrController = context.getStreamProcessor().getABRController(), fragmentInfo, switchRequest = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);
            if (!isNaN(req.index)) {
                setFragmentRequestDict(mediaType, req.index);
                fragmentInfo = fragmentDict[mediaType][req.index];
                if (fragmentInfo === null || req.firstByteDate === null || abandonDict.hasOwnProperty(fragmentInfo.id)) {
                    callback(switchRequest);
                    return;
                }
                if (fragmentInfo.firstByteTime === undefined) {
                    fragmentInfo.firstByteTime = req.firstByteDate.getTime();
                    fragmentInfo.segmentDuration = req.duration;
                    fragmentInfo.bytesTotal = req.bytesTotal;
                    fragmentInfo.id = req.index;
                }
                fragmentInfo.bytesLoaded = req.bytesLoaded;
                fragmentInfo.elapsedTime = now - fragmentInfo.firstByteTime;
                if (fragmentInfo.bytesLoaded < fragmentInfo.bytesTotal && fragmentInfo.elapsedTime >= GRACE_TIME_THRESHOLD) {
                    fragmentInfo.measuredBandwidthInKbps = Math.round(fragmentInfo.bytesLoaded * 8 / fragmentInfo.elapsedTime);
                    fragmentInfo.estimatedTimeOfDownload = (fragmentInfo.bytesTotal * 8 * .001 / fragmentInfo.measuredBandwidthInKbps).toFixed(2);
                    if (fragmentInfo.estimatedTimeOfDownload < fragmentInfo.segmentDuration * ABANDON_MULTIPLIER || trackInfo.quality === 0) {
                        callback(switchRequest);
                        return;
                    } else if (!abandonDict.hasOwnProperty(fragmentInfo.id)) {
                        var newQuality = abrController.getQualityForBitrate(mediaInfo, fragmentInfo.measuredBandwidthInKbps * MediaPlayer.dependencies.AbrController.BANDWIDTH_SAFETY);
                        switchRequest = new MediaPlayer.rules.SwitchRequest(newQuality, MediaPlayer.rules.SwitchRequest.prototype.STRONG);
                        abandonDict[fragmentInfo.id] = fragmentInfo;
                        this.log("AbandonRequestsRule ( ", mediaType, "frag id", fragmentInfo.id, ") is asking to abandon and switch to quality to ", newQuality, " measured bandwidth was", fragmentInfo.measuredBandwidthInKbps);
                        delete fragmentDict[mediaType][fragmentInfo.id];
                    }
                } else if (fragmentInfo.bytesLoaded === fragmentInfo.bytesTotal) {
                    delete fragmentDict[mediaType][fragmentInfo.id];
                }
            }
            callback(switchRequest);
        },
        reset: function() {
            fragmentDict = {};
            abandonDict = {};
        }
    };
};

MediaPlayer.rules.AbandonRequestsRule.prototype = {
    constructor: MediaPlayer.rules.AbandonRequestsRule
};

MediaPlayer.rules.BufferOccupancyRule = function() {
    "use strict";
    var lastSwitchTime = 0;
    return {
        log: undefined,
        metricsModel: undefined,
        execute: function(context, callback) {
            var self = this, now = new Date().getTime() / 1e3, mediaInfo = context.getMediaInfo(), trackInfo = context.getTrackInfo(), mediaType = mediaInfo.type, waitToSwitchTime = !isNaN(trackInfo.fragmentDuration) ? trackInfo.fragmentDuration / 2 : 2, current = context.getCurrentValue(), streamProcessor = context.getStreamProcessor(), abrController = streamProcessor.getABRController(), metrics = this.metricsModel.getReadOnlyMetricsFor(mediaType), lastBufferLevelVO = metrics.BufferLevel.length > 0 ? metrics.BufferLevel[metrics.BufferLevel.length - 1] : null, lastBufferStateVO = metrics.BufferState.length > 0 ? metrics.BufferState[metrics.BufferState.length - 1] : null, isBufferRich = false, maxIndex = mediaInfo.trackCount - 1, switchRequest = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);
            if (now - lastSwitchTime < waitToSwitchTime || abrController.getAbandonmentStateFor(mediaType) === MediaPlayer.dependencies.AbrController.ABANDON_LOAD) {
                callback(switchRequest);
                return;
            }
            if (lastBufferLevelVO !== null && lastBufferStateVO !== null) {
                if (lastBufferLevelVO.level > lastBufferStateVO.target) {
                    isBufferRich = lastBufferLevelVO.level - lastBufferStateVO.target > MediaPlayer.dependencies.BufferController.RICH_BUFFER_THRESHOLD;
                    if (isBufferRich && mediaInfo.trackCount > 1) {
                        switchRequest = new MediaPlayer.rules.SwitchRequest(maxIndex, MediaPlayer.rules.SwitchRequest.prototype.STRONG);
                    }
                }
            }
            if (switchRequest.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && switchRequest.value !== current) {
                self.log("BufferOccupancyRule requesting switch to index: ", switchRequest.value, "type: ", mediaType, " Priority: ", switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "Default" : switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "Strong" : "Weak");
            }
            callback(switchRequest);
        },
        reset: function() {
            lastSwitchTime = 0;
        }
    };
};

MediaPlayer.rules.BufferOccupancyRule.prototype = {
    constructor: MediaPlayer.rules.BufferOccupancyRule
};

MediaPlayer.rules.InsufficientBufferRule = function() {
    "use strict";
    var bufferStateDict = {}, lastSwitchTime = 0, waitToSwitchTime = 1e3, setBufferInfo = function(type, state) {
        bufferStateDict[type] = bufferStateDict[type] || {};
        bufferStateDict[type].state = state;
        if (state === MediaPlayer.dependencies.BufferController.BUFFER_LOADED && !bufferStateDict[type].firstBufferLoadedEvent) {
            bufferStateDict[type].firstBufferLoadedEvent = true;
        }
    }, onPlaybackSeeking = function() {
        bufferStateDict = {};
    };
    return {
        log: undefined,
        metricsModel: undefined,
        playbackController: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = onPlaybackSeeking;
        },
        execute: function(context, callback) {
            var self = this, now = new Date().getTime(), mediaType = context.getMediaInfo().type, current = context.getCurrentValue(), metrics = self.metricsModel.getReadOnlyMetricsFor(mediaType), lastBufferStateVO = metrics.BufferState.length > 0 ? metrics.BufferState[metrics.BufferState.length - 1] : null, switchRequest = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);
            if (now - lastSwitchTime < waitToSwitchTime || lastBufferStateVO === null) {
                callback(switchRequest);
                return;
            }
            setBufferInfo(mediaType, lastBufferStateVO.state);
            if (lastBufferStateVO.state === MediaPlayer.dependencies.BufferController.BUFFER_EMPTY && bufferStateDict[mediaType].firstBufferLoadedEvent !== undefined) {
                switchRequest = new MediaPlayer.rules.SwitchRequest(0, MediaPlayer.rules.SwitchRequest.prototype.STRONG);
            }
            if (switchRequest.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && switchRequest.value !== current) {
                self.log("InsufficientBufferRule requesting switch to index: ", switchRequest.value, "type: ", mediaType, " Priority: ", switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "Default" : switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "Strong" : "Weak");
            }
            lastSwitchTime = now;
            callback(switchRequest);
        },
        reset: function() {
            bufferStateDict = {};
            lastSwitchTime = 0;
        }
    };
};

MediaPlayer.rules.InsufficientBufferRule.prototype = {
    constructor: MediaPlayer.rules.InsufficientBufferRule
};

MediaPlayer.rules.ThroughputRule = function() {
    "use strict";
    var throughputArray = [], lastSwitchTime = 0, AVERAGE_THROUGHPUT_SAMPLE_AMOUNT_LIVE = 2, AVERAGE_THROUGHPUT_SAMPLE_AMOUNT_VOD = 3, storeLastRequestThroughputByType = function(type, lastRequestThroughput) {
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
        return averageThroughput * MediaPlayer.dependencies.AbrController.BANDWIDTH_SAFETY;
    };
    return {
        log: undefined,
        metricsExt: undefined,
        metricsModel: undefined,
        manifestExt: undefined,
        manifestModel: undefined,
        execute: function(context, callback) {
            var self = this, now = new Date().getTime() / 1e3, mediaInfo = context.getMediaInfo(), mediaType = mediaInfo.type, current = context.getCurrentValue(), trackInfo = context.getTrackInfo(), metrics = self.metricsModel.getReadOnlyMetricsFor(mediaType), streamProcessor = context.getStreamProcessor(), abrController = streamProcessor.getABRController(), isDynamic = streamProcessor.isDynamic(), lastRequest = self.metricsExt.getCurrentHttpRequest(metrics), waitToSwitchTime = !isNaN(trackInfo.fragmentDuration) ? trackInfo.fragmentDuration / 2 : 2, downloadTime, averageThroughput, lastRequestThroughput, bufferStateVO = metrics.BufferState.length > 0 ? metrics.BufferState[metrics.BufferState.length - 1] : null, bufferLevelVO = metrics.BufferLevel.length > 0 ? metrics.BufferLevel[metrics.BufferLevel.length - 1] : null, switchRequest = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);
            if (now - lastSwitchTime < waitToSwitchTime || !metrics || lastRequest === null || lastRequest.type !== MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE || bufferStateVO === null || bufferLevelVO === null) {
                callback(switchRequest);
                return;
            }
            downloadTime = (lastRequest.tfinish.getTime() - lastRequest.tresponse.getTime()) / 1e3;
            lastRequestThroughput = Math.round(lastRequest.trace[lastRequest.trace.length - 1].b * 8 / downloadTime);
            storeLastRequestThroughputByType(mediaType, lastRequestThroughput);
            averageThroughput = Math.round(getAverageThroughput(mediaType, isDynamic));
            if (abrController.getAbandonmentStateFor(mediaType) !== MediaPlayer.dependencies.AbrController.ABANDON_LOAD) {
                if (bufferStateVO.state === MediaPlayer.dependencies.BufferController.BUFFER_LOADED && (bufferLevelVO.level >= MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD * 2 || isDynamic)) {
                    var newQuality = abrController.getQualityForBitrate(mediaInfo, averageThroughput / 1e3);
                    switchRequest = new MediaPlayer.rules.SwitchRequest(newQuality, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT);
                }
                if (switchRequest.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && switchRequest.value !== current) {
                    self.log("ThroughputRule requesting switch to index: ", switchRequest.value, "type: ", mediaType, " Priority: ", switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "Default" : switchRequest.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "Strong" : "Weak", "Average throughput", Math.round(averageThroughput / 1024), "kbps");
                }
            }
            callback(switchRequest);
        },
        reset: function() {
            throughputArray = [];
            lastSwitchTime = 0;
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
        log: undefined,
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
    }, decideBufferLength = function(minBufferTime, duration, isDynamic) {
        var minBufferTarget;
        if (isDynamic) {
            minBufferTarget = this.playbackController.getLiveDelay();
        } else if (isNaN(duration) || MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME < duration && minBufferTime < duration) {
            minBufferTarget = Math.max(MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME, minBufferTime);
        } else if (minBufferTime >= duration) {
            minBufferTarget = Math.min(duration, MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME);
        } else {
            minBufferTarget = Math.min(duration, minBufferTime);
        }
        return minBufferTarget;
    }, getRequiredBufferLength = function(isDynamic, duration, scheduleController) {
        var self = this, criticalBufferLevel = scheduleController.bufferController.getCriticalBufferLevel(), vmetrics = self.metricsModel.getReadOnlyMetricsFor("video"), ametrics = self.metricsModel.getReadOnlyMetricsFor("audio"), minBufferTarget = decideBufferLength.call(this, scheduleController.bufferController.getMinBufferTime(), duration, isDynamic), currentBufferTarget = minBufferTarget, bufferMax = scheduleController.bufferController.bufferMax, requiredBufferLength = 0;
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
        playbackController: undefined,
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
            var metrics = this.metricsModel.getReadOnlyMetricsFor(mediaType), bufferLevel = this.metricsExt.getCurrentBufferLevel(metrics) ? this.metricsExt.getCurrentBufferLevel(metrics).level : 0, scheduleCtrl = scheduleController[streamId][mediaType], track = scheduleCtrl.streamProcessor.getCurrentTrack(), isDynamic = scheduleCtrl.streamProcessor.isDynamic(), rate = this.metricsExt.getCurrentPlaybackRate(metrics), duration = streamInfo.manifestInfo.duration, bufferedDuration = bufferLevel / Math.max(rate, 1), fragmentDuration = track.fragmentDuration, currentTime = this.playbackController.getTime(), timeToEnd = isDynamic ? Number.POSITIVE_INFINITY : duration - currentTime, requiredBufferLength = Math.min(getRequiredBufferLength.call(this, isDynamic, duration, scheduleCtrl), timeToEnd), remainingDuration = Math.max(requiredBufferLength - bufferedDuration, 0), fragmentCount;
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
            var mediaType = context.getMediaInfo().type, streamId = context.getStreamInfo().id, current = context.getCurrentValue(), sc = scheduleController[streamId][mediaType], model = sc.getFragmentModel(), requests = model.getRequests({
                state: [ MediaPlayer.dependencies.FragmentModel.states.PENDING, MediaPlayer.dependencies.FragmentModel.states.LOADING ]
            }), rejectedRequests = model.getRequests({
                state: MediaPlayer.dependencies.FragmentModel.states.REJECTED
            }), rLn = rejectedRequests.length, ln = requests.length, count = Math.max(current - ln, 0);
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
        setTimeout(function() {
            var time = e.data.seekTime;
            seekTarget.audio = time;
            seekTarget.video = time;
            seekTarget.fragmentedText = time;
        }, 0);
    };
    return {
        adapter: undefined,
        sourceBufferExt: undefined,
        playbackController: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = onPlaybackSeeking;
        },
        setScheduleController: function(scheduleControllerValue) {
            var streamId = scheduleControllerValue.streamProcessor.getStreamInfo().id;
            scheduleController[streamId] = scheduleController[streamId] || {};
            scheduleController[streamId][scheduleControllerValue.streamProcessor.getType()] = scheduleControllerValue;
        },
        execute: function(context, callback) {
            var mediaType = context.getMediaInfo().type, streamId = context.getStreamInfo().id, sc = scheduleController[streamId][mediaType], EPSILON = .1, streamProcessor = scheduleController[streamId][mediaType].streamProcessor, track = streamProcessor.getCurrentTrack(), st = seekTarget ? seekTarget[mediaType] : null, hasSeekTarget = st !== undefined && st !== null, p = hasSeekTarget ? MediaPlayer.rules.SwitchRequest.prototype.STRONG : MediaPlayer.rules.SwitchRequest.prototype.DEFAULT, rejected = sc.getFragmentModel().getRequests({
                state: MediaPlayer.dependencies.FragmentModel.states.REJECTED
            })[0], keepIdx = !!rejected && !hasSeekTarget, currentTime = this.adapter.getIndexHandlerTime(streamProcessor), playbackTime = this.playbackController.getTime(), rejectedEnd = rejected ? rejected.startTime + rejected.duration : null, useRejected = !hasSeekTarget && rejected && (rejectedEnd > playbackTime && rejected.startTime <= currentTime || isNaN(currentTime)), buffer = streamProcessor.bufferController.getBuffer(), range = null, time, request;
            time = hasSeekTarget ? st : useRejected ? rejected.startTime : currentTime;
            if (rejected) {
                sc.getFragmentModel().removeRejectedRequest(rejected);
            }
            if (isNaN(time)) {
                callback(new MediaPlayer.rules.SwitchRequest(null, p));
                return;
            }
            if (hasSeekTarget) {
                seekTarget[mediaType] = null;
            }
            if (buffer) {
                range = this.sourceBufferExt.getBufferRange(streamProcessor.bufferController.getBuffer(), time);
                if (range !== null) {
                    time = range.end;
                }
            }
            request = this.adapter.getFragmentRequestForTime(streamProcessor, track, time, {
                keepIdx: keepIdx
            });
            if (useRejected && request && request.index !== rejected.index) {
                request = this.adapter.getFragmentRequestForTime(streamProcessor, track, rejected.startTime + rejected.duration / 2 + EPSILON, {
                    keepIdx: keepIdx,
                    timeThreshold: 0
                });
            }
            while (request && streamProcessor.getFragmentModel().isFragmentLoadedOrPending(request)) {
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
    var lastMediaRequestIdxs = {}, findClosestToTime = function(fragmentModels, time) {
        var req, r, pendingReqs, i = 0, j, pln, ln = fragmentModels.length;
        for (i; i < ln; i += 1) {
            pendingReqs = fragmentModels[i].getRequests({
                state: MediaPlayer.dependencies.FragmentModel.states.PENDING
            });
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
            req = fragmentModels[i].getRequests({
                state: MediaPlayer.dependencies.FragmentModel.states.PENDING,
                time: currentTime
            })[0];
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
    }, getLastMediaRequestIdx = function(streamId, type) {
        return lastMediaRequestIdxs[streamId] && lastMediaRequestIdxs[streamId][type] ? lastMediaRequestIdxs[streamId][type] : NaN;
    }, onStreamCompleted = function(e) {
        var model = e.data.fragmentModel, req = e.data.request, streamId = model.getContext().streamProcessor.getStreamInfo().id, type = req.mediaType;
        lastMediaRequestIdxs[streamId] = lastMediaRequestIdxs[streamId] || {};
        lastMediaRequestIdxs[streamId][type] = req.index - 1;
    };
    return {
        playbackController: undefined,
        setup: function() {
            this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED] = onStreamCompleted;
        },
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
            currentTime = this.playbackController.getTime();
            reqForCurrentTime = getForTime(fragmentModels, currentTime);
            req = reqForCurrentTime || findClosestToTime(fragmentModels, currentTime) || current;
            if (!req) {
                callback(new MediaPlayer.rules.SwitchRequest([], p));
                return;
            }
            for (mIdx = 0; mIdx < mLength; mIdx += 1) {
                model = fragmentModels[mIdx];
                type = model.getContext().streamProcessor.getType();
                if (type !== "video" && type !== "audio" && type !== "fragmentedText") continue;
                pendingReqs = model.getRequests({
                    state: MediaPlayer.dependencies.FragmentModel.states.PENDING
                });
                loadingLength = model.getRequests({
                    state: MediaPlayer.dependencies.FragmentModel.states.LOADING
                }).length;
                if (model.getIsPostponed() && !isNaN(req.startTime)) continue;
                if (loadingLength > MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD) {
                    callback(new MediaPlayer.rules.SwitchRequest([], p));
                    return;
                }
                time = time || (req === reqForCurrentTime ? currentTime : req.startTime);
                if (pendingReqs.indexOf(req) !== -1) {
                    reqsToExecute.push(req);
                    continue;
                }
                sameTimeReq = model.getRequests({
                    state: MediaPlayer.dependencies.FragmentModel.states.PENDING,
                    time: time
                })[0];
                if (!sameTimeReq && req.index === 0) {
                    sameTimeReq = pendingReqs.filter(function(r) {
                        return r.index === req.index;
                    })[0];
                }
                if (sameTimeReq) {
                    reqsToExecute.push(sameTimeReq);
                    continue;
                }
                sameTimeReq = model.getRequests({
                    state: MediaPlayer.dependencies.FragmentModel.states.LOADING,
                    time: time
                })[0] || model.getRequests({
                    state: MediaPlayer.dependencies.FragmentModel.states.EXECUTED,
                    time: time
                })[0];
                if (!sameTimeReq && req.index !== getLastMediaRequestIdx.call(this, streamId, req.mediaType)) {
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
        },
        reset: function() {
            lastMediaRequestIdxs = {};
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
            req = this.adapter.getFragmentRequestForTime(streamProcessor, trackInfo, searchTime, {
                ignoreIsFinished: true
            });
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
                req = self.adapter.getFragmentRequestForTime(streamProcessor, trackInfo, searchTime, {
                    ignoreIsFinished: true
                });
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
            req = this.adapter.getFragmentRequestForTime(streamProcessor, trackInfo, searchTime, {
                ignoreIsFinished: true
            });
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
            request = self.adapter.getFragmentRequestForTime(streamProcessor, trackInfo, liveEdgeInitialSearchPosition, {
                ignoreIsFinished: true
            });
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
        timelineConverter: undefined,
        execute: function(context, callback) {
            var trackInfo = context.getTrackInfo(), liveEdgeInitialSearchPosition = trackInfo.DVRWindow.end, p = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT;
            if (trackInfo.useCalculatedLiveEdgeTime) {
                var actualLiveEdge = this.timelineConverter.getExpectedLiveEdge();
                this.timelineConverter.setExpectedLiveEdge(liveEdgeInitialSearchPosition);
                this.timelineConverter.setTimeSyncCompleted(false);
                callback(new MediaPlayer.rules.SwitchRequest(actualLiveEdge, p));
            } else {
                callback(new MediaPlayer.rules.SwitchRequest(liveEdgeInitialSearchPosition, p));
            }
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
    log: undefined,
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

MediaPlayer.utils.CustomTimeRanges = function() {
    return {
        customTimeRangeArray: [],
        length: 0,
        add: function(start, end) {
            var i = 0;
            for (i = 0; i < this.customTimeRangeArray.length && start > this.customTimeRangeArray[i].start; i++) ;
            this.customTimeRangeArray.splice(i, 0, {
                start: start,
                end: end
            });
            for (i = 0; i < this.customTimeRangeArray.length - 1; i++) {
                if (this.mergeRanges(i, i + 1)) {
                    i--;
                }
            }
            this.length = this.customTimeRangeArray.length;
        },
        remove: function(start, end) {
            for (var i = 0; i < this.customTimeRangeArray.length; i++) {
                if (start <= this.customTimeRangeArray[i].start && end >= this.customTimeRangeArray[i].end) {
                    this.customTimeRangeArray.splice(i, 1);
                    i--;
                } else if (start > this.customTimeRangeArray[i].start && end < this.customTimeRangeArray[i].end) {
                    this.customTimeRangeArray.splice(i + 1, 0, {
                        start: end,
                        end: this.customTimeRangeArray[i].end
                    });
                    this.customTimeRangeArray[i].end = start;
                    break;
                } else if (start > this.customTimeRangeArray[i].start && start < this.customTimeRangeArray[i].end) {
                    this.customTimeRangeArray[i].end = start;
                } else if (end > this.customTimeRangeArray[i].start && end < this.customTimeRangeArray[i].end) {
                    this.customTimeRangeArray[i].start = end;
                }
            }
            this.length = this.customTimeRangeArray.length;
        },
        mergeRanges: function(rangeIndex1, rangeIndex2) {
            var range1 = this.customTimeRangeArray[rangeIndex1];
            var range2 = this.customTimeRangeArray[rangeIndex2];
            if (range1.start <= range2.start && range2.start <= range1.end && range1.end <= range2.end) {
                range1.end = range2.end;
                this.customTimeRangeArray.splice(rangeIndex2, 1);
                return true;
            } else if (range2.start <= range1.start && range1.start <= range2.end && range2.end <= range1.end) {
                range1.start = range2.start;
                this.customTimeRangeArray.splice(rangeIndex2, 1);
                return true;
            } else if (range2.start <= range1.start && range1.start <= range2.end && range1.end <= range2.end) {
                this.customTimeRangeArray.splice(rangeIndex1, 1);
                return true;
            } else if (range1.start <= range2.start && range2.start <= range1.end && range2.end <= range1.end) {
                this.customTimeRangeArray.splice(rangeIndex2, 1);
                return true;
            }
            return false;
        },
        start: function(index) {
            return this.customTimeRangeArray[index].start;
        },
        end: function(index) {
            return this.customTimeRangeArray[index].end;
        }
    };
};

MediaPlayer.utils.CustomTimeRanges.prototype = {
    constructor: MediaPlayer.utils.CustomTimeRanges
};

MediaPlayer.utils.DOMStorage = function() {
    var enableLastBitrateCaching = true, checkInitialBitrate = function() {
        [ "video", "audio" ].forEach(function(value) {
            if (this.abrController.getInitialBitrateFor(value) === undefined) {
                if (this.isSupported(MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL) && enableLastBitrateCaching) {
                    var key = MediaPlayer.utils.DOMStorage["LOCAL_STORAGE_" + value.toUpperCase() + "_BITRATE_KEY"], obj = JSON.parse(localStorage.getItem(key)) || {}, isExpired = new Date().getTime() - parseInt(obj.timestamp) >= MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_BITRATE_EXPIRATION || false, bitrate = parseInt(obj.bitrate);
                    if (!isNaN(bitrate) && !isExpired) {
                        this.abrController.setInitialBitrateFor(value, bitrate);
                        this.log("Last bitrate played for " + value + " was " + bitrate);
                    } else if (isExpired) {
                        localStorage.removeItem(key);
                    }
                }
                if (this.abrController.getInitialBitrateFor(value) === undefined) {
                    this.abrController.setInitialBitrateFor(value, MediaPlayer.dependencies.AbrController["DEFAULT_" + value.toUpperCase() + "_BITRATE"]);
                }
            }
        }, this);
    };
    return {
        system: undefined,
        log: undefined,
        abrController: undefined,
        checkInitialBitrate: checkInitialBitrate,
        enableLastBitrateCaching: function(enable, ttl) {
            enableLastBitrateCaching = enable;
            if (ttl !== undefined && !isNaN(ttl) && typeof ttl === "number") {
                MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_BITRATE_EXPIRATION = ttl;
            }
        },
        isSupported: function(type) {
            if (type === MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL) {
                return window.localStorage || false;
            } else if (type === MediaPlayer.utils.DOMStorage.STORAGE_TYPE_SESSION) {
                return window.sessionStorage || false;
            } else {
                return false;
            }
        }
    };
};

MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_VIDEO_BITRATE_KEY = "dashjs_vbitrate";

MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_AUDIO_BITRATE_KEY = "dashjs_abitrate";

MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_BITRATE_EXPIRATION = 36e4;

MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL = "local";

MediaPlayer.utils.DOMStorage.STORAGE_TYPE_SESSION = "session";

MediaPlayer.utils.DOMStorage.prototype = {
    constructor: MediaPlayer.utils.DOMStorage
};

MediaPlayer.utils.Debug = function() {
    "use strict";
    var logToBrowserConsole = true, showLogTimestamp = false, showCalleeName = false, startTime = new Date().getTime(), eventBus;
    return {
        system: undefined,
        eventBus: undefined,
        setup: function() {
            this.system.mapValue("log", this.log);
            eventBus = this.eventBus;
        },
        setLogTimestampVisible: function(value) {
            showLogTimestamp = value;
        },
        showCalleeName: function(value) {
            showCalleeName = value;
        },
        setLogToBrowserConsole: function(value) {
            logToBrowserConsole = value;
        },
        getLogToBrowserConsole: function() {
            return logToBrowserConsole;
        },
        log: function() {
            var message = "", logTime = null;
            if (showLogTimestamp) {
                logTime = new Date().getTime();
                message += "[" + (logTime - startTime) + "]";
            }
            if (showCalleeName && this.getName) {
                message += "[" + this.getName() + "]";
            }
            if (this.getMediaType && this.getMediaType()) {
                message += "[" + this.getMediaType() + "]";
            }
            if (message.length > 0) {
                message += " ";
            }
            Array.apply(null, arguments).forEach(function(item) {
                message += item + " ";
            });
            if (logToBrowserConsole) {
                console.log(message);
            }
            eventBus.dispatchEvent({
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

MediaPlayer.utils.VirtualBuffer = function() {
    var data = {}, sortArrayByProperty = function(array, sortProp) {
        var compare = function(obj1, obj2) {
            if (obj1[sortProp] < obj2[sortProp]) return -1;
            if (obj1[sortProp] > obj2[sortProp]) return 1;
            return 0;
        };
        array.sort(compare);
    }, findData = function(filter) {
        var streamId = filter.streamId, mediaType = filter.mediaType;
        if (!data[streamId]) return null;
        return data[streamId][mediaType];
    }, createDataStorage = function() {
        var data = {};
        data.audio = {
            buffered: new MediaPlayer.utils.CustomTimeRanges()
        };
        data.audio[MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE] = [];
        data.audio[MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE] = [];
        data.video = {
            buffered: new MediaPlayer.utils.CustomTimeRanges()
        };
        data.video[MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE] = [];
        data.video[MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE] = [];
        data.fragmentedText = {
            buffered: new MediaPlayer.utils.CustomTimeRanges()
        };
        data.fragmentedText[MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE] = [];
        data.fragmentedText[MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE] = [];
        return data;
    };
    return {
        system: undefined,
        sourceBufferExt: undefined,
        notify: undefined,
        subscribe: undefined,
        unsubscribe: undefined,
        append: function(chunk) {
            var streamId = chunk.streamId, mediaType = chunk.mediaType, segmentType = chunk.segmentType, start = chunk.start, end = chunk.end;
            data[streamId] = data[streamId] || createDataStorage();
            data[streamId][mediaType][segmentType].push(chunk);
            sortArrayByProperty(data[streamId][mediaType][segmentType], "index");
            if (!isNaN(start) && !isNaN(end)) {
                data[streamId][mediaType].buffered.add(start, end);
                this.notify(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED, {
                    chunk: chunk
                });
            }
        },
        getChunks: function(filter) {
            var originData = findData.call(this, filter), segmentType = filter.segmentType, removeOrigin = filter.removeOrigin, limit = filter.limit || Number.POSITIVE_INFINITY, ln = 0, result = [];
            if (!originData) return result;
            delete filter.streamId;
            delete filter.mediaType;
            delete filter.segmentType;
            delete filter.removeOrigin;
            delete filter.limit;
            result = originData[segmentType].filter(function(item, idx, arr) {
                if (ln >= limit) return false;
                for (var prop in filter) {
                    if (filter.hasOwnProperty(prop) && item[prop] != filter[prop]) return false;
                }
                if (removeOrigin) {
                    originData.buffered.remove(item.start, item.end);
                    arr.splice(idx, 1);
                }
                ln += 1;
                return true;
            });
            return result;
        },
        extract: function(filter) {
            filter.removeOrigin = true;
            return this.getChunks(filter);
        },
        getTotalBufferLevel: function(mediaInfo) {
            var mediaType = mediaInfo.type, level = 0;
            for (var streamId in data) {
                if (data.hasOwnProperty(streamId)) {
                    level += this.sourceBufferExt.getTotalBufferedTime(data[streamId][mediaType]);
                }
            }
            return level;
        },
        reset: function() {
            data = {};
        }
    };
};

MediaPlayer.utils.VirtualBuffer.prototype = {
    constructor: MediaPlayer.utils.VirtualBuffer
};

MediaPlayer.utils.VirtualBuffer.eventList = {
    CHUNK_APPENDED: "chunkAppended"
};

MediaPlayer.vo.BitrateInfo = function() {
    "use strict";
    this.mediaType = null;
    this.bitrate = null;
    this.qualityIndex = NaN;
};

MediaPlayer.vo.BitrateInfo.prototype = {
    constructor: MediaPlayer.vo.BitrateInfo
};

MediaPlayer.vo.DataChunk = function() {
    "use strict";
    this.streamId = null;
    this.mediaType = null;
    this.segmentType = null;
    this.quality = NaN;
    this.index = NaN;
    this.bytes = null;
    this.start = NaN;
    this.end = NaN;
    this.duration = NaN;
};

MediaPlayer.vo.DataChunk.prototype = {
    constructor: MediaPlayer.vo.DataChunk
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
    this.bytesLoaded = NaN;
    this.bytesTotal = NaN;
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
    this.bitrateList = null;
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

MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE = "Initialization Segment";

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
    this.toJWK = function() {
        var i, numKeys = this.keyPairs.length, jwk = {};
        jwk.keys = [];
        for (i = 0; i < numKeys; i++) {
            var key = {
                kty: "oct",
                alg: "A128KW",
                kid: this.keyPairs[i].keyID,
                k: this.keyPairs[i].key
            };
            jwk.keys.push(key);
        }
        if (this.type) {
            jwk.type = this.type;
        }
        var jwkString = JSON.stringify(jwk);
        var len = jwkString.length;
        var buf = new ArrayBuffer(len);
        var bView = new Uint8Array(buf);
        for (i = 0; i < len; i++) bView[i] = jwkString.charCodeAt(i);
        return buf;
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

MediaPlayer.vo.protection.KeyMessage = function(sessionToken, message, defaultURL, messageType) {
    "use strict";
    this.sessionToken = sessionToken;
    this.message = message;
    this.defaultURL = defaultURL;
    this.messageType = messageType;
};

MediaPlayer.vo.protection.KeyMessage.prototype = {
    constructor: MediaPlayer.vo.protection.KeyMessage
};

MediaPlayer.vo.protection.KeyPair = function(keyID, key) {
    "use strict";
    this.keyID = keyID;
    this.key = key;
};

MediaPlayer.vo.protection.KeyPair.prototype = {
    constructor: MediaPlayer.vo.protection.KeyPair
};

MediaPlayer.vo.protection.KeySystemAccess = function(keySystem, ksConfiguration) {
    this.keySystem = keySystem;
    this.ksConfiguration = ksConfiguration;
};

MediaPlayer.vo.protection.KeySystemAccess.prototype = {
    constructor: MediaPlayer.vo.protection.KeySystemAccess
};

MediaPlayer.vo.protection.KeySystemConfiguration = function(audioCapabilities, videoCapabilities, distinctiveIdentifier, persistentState) {
    this.initDataTypes = [ "cenc" ];
    this.audioCapabilities = audioCapabilities;
    this.videoCapabilities = videoCapabilities;
    this.distinctiveIdentifier = distinctiveIdentifier;
    this.persistentState = persistentState;
};

MediaPlayer.vo.protection.KeySystemConfiguration.prototype = {
    constructor: MediaPlayer.vo.protection.KeySystemConfiguration
};

MediaPlayer.vo.protection.LicenseRequestComplete = function(message, requestData) {
    "use strict";
    this.message = message;
    this.requestData = requestData;
};

MediaPlayer.vo.protection.LicenseRequestComplete.prototype = {
    constructor: MediaPlayer.vo.protection.LicenseRequestComplete
};

MediaPlayer.vo.protection.MediaCapability = function(contentType, robustness) {
    this.contentType = contentType;
    this.robustness = robustness;
};

MediaPlayer.vo.protection.MediaCapability.prototype = {
    constructor: MediaPlayer.vo.protection.MediaCapability
};

MediaPlayer.vo.protection.NeedKey = function(initData, initDataType) {
    this.initData = initData;
    this.initDataType = initDataType;
};

MediaPlayer.vo.protection.NeedKey.prototype = {
    constructor: MediaPlayer.vo.protection.NeedKey
};

MediaPlayer.vo.protection.ProtectionData = function(laURL, httpRequestHeaders, clearkeys) {
    this.laURL = laURL;
    this.httpRequestHeaders = httpRequestHeaders;
    this.clearkeys = clearkeys;
};

MediaPlayer.vo.protection.ProtectionData.prototype = {
    constructor: MediaPlayer.vo.protection.ProtectionData
};

MediaPlayer.models.SessionToken = function() {
    "use strict";
};

MediaPlayer.models.SessionToken.prototype = {
    initData: null,
    getSessionID: function() {
        return "";
    },
    getExpirationTime: function() {
        return NaN;
    },
    getKeyStatuses: function() {
        return null;
    }
};