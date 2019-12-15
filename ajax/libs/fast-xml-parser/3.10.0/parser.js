(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.parser = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
//parse Empty Node as self closing node
var buildOptions = require("./util").buildOptions;

var defaultOptions = {
    attributeNamePrefix: "@_",
    attrNodeName: false,
    textNodeName: "#text",
    ignoreAttributes: true,
    cdataTagName: false,
    cdataPositionChar: "\\c",
    format: false,
    indentBy: "  ",
    supressEmptyNode: false,
    tagValueProcessor: function(a) {return a},
    attrValueProcessor: function(a) {return a}
};

var props = [
    "attributeNamePrefix",
    "attrNodeName",
    "textNodeName",
    "ignoreAttributes",
    "cdataTagName",
    "cdataPositionChar",
    "format",
    "indentBy",
    "supressEmptyNode",
    "tagValueProcessor",
    "attrValueProcessor"
]

function Parser(options) {
    this.options = buildOptions(options,defaultOptions,props);
    if (this.options.ignoreAttributes || this.options.attrNodeName) {
        this.isAttribute = function(/*a*/) { return false;};
    } else {
        this.attrPrefixLen = this.options.attributeNamePrefix.length;
        this.isAttribute = isAttribute;
    }
    if (this.options.cdataTagName) {
        this.isCDATA = isCDATA;
    } else {
        this.isCDATA = function(/*a*/) { return false;};
    }
    this.replaceCDATAstr = replaceCDATAstr;
    this.replaceCDATAarr = replaceCDATAarr;

    if (this.options.format) {
        this.indentate = indentate;
        this.tagEndChar = ">\n";
        this.newLine = "\n";
    } else {
        this.indentate = function() { return "";};
        this.tagEndChar = ">";
        this.newLine = "";
    }

    if (this.options.supressEmptyNode) {
        this.buildTextNode = buildEmptyTextNode;
        this.buildObjNode = buildEmptyObjNode;
    } else {
        this.buildTextNode = buildTextValNode;
        this.buildObjNode = buildObjectNode;
    }

    this.buildTextValNode = buildTextValNode;
    this.buildObjectNode = buildObjectNode;

}

Parser.prototype.parse = function(jObj) {
    return this.j2x(jObj, 0).val;
};

Parser.prototype.j2x = function(jObj, level) {
    var attrStr = "";
    var val = "";
    var keys = Object.keys(jObj);
    var len = keys.length;
    for (var i = 0; i < len; i++) {
        var key = keys[i];
        if (typeof jObj[key] === "undefined") {
            // supress undefined node
        }else if (jObj[key] === null) {
            val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
        }else if (typeof jObj[key] !== "object") {//premitive type
            var attr = this.isAttribute(key);
            if (attr) {
                attrStr += " " + attr + "=\"" +  this.options.attrValueProcessor("" + jObj[key]) + "\"";
            } else if (this.isCDATA(key)) {
                if (jObj[this.options.textNodeName]) {
                    val += this.replaceCDATAstr(jObj[this.options.textNodeName], jObj[key]);
                } else {
                    val += this.replaceCDATAstr("", jObj[key]);
                }
            } else {//tag value
                if (key === this.options.textNodeName) {
                    if (jObj[this.options.cdataTagName]) {
                        //value will added while processing cdata
                    } else {
                        val +=  this.options.tagValueProcessor("" + jObj[key]);
                    }
                } else {
                    val += this.buildTextNode(jObj[key], key, "", level);
                }
            }
        } else if (Array.isArray(jObj[key])) {//repeated nodes
            if (this.isCDATA(key)) {
                if (jObj[this.options.textNodeName]) {
                    val += this.replaceCDATAarr(jObj[this.options.textNodeName], jObj[key]);
                } else {
                    val += this.replaceCDATAarr("", jObj[key]);
                }
            } else {//nested nodes
                var arrLen = jObj[key].length;
                for (var j = 0; j < arrLen; j++) {
                    var item = jObj[key][j];
                    if (typeof item === "undefined") {
                        // supress undefined node
                    }else if(item === null){
                        val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
                    }else if (typeof item === "object") {
                        var result = this.j2x(item, level + 1);
                        val += this.buildObjNode(result.val, key, result.attrStr, level);
                    } else {
                        val += this.buildTextNode(item, key, "", level);
                    }
                }
            }
        } else {//nested node
            if (this.options.attrNodeName && key === this.options.attrNodeName) {
                var Ks = Object.keys(jObj[key]);
                var L = Ks.length;
                for (var j = 0; j < L; j++) {
                    attrStr += " " + Ks[j] + "=\"" + this.options.tagValueProcessor("" + jObj[key][Ks[j]]) + "\"";
                }
            } else {
                var result = this.j2x(jObj[key], level + 1);
                val += this.buildObjNode(result.val, key, result.attrStr, level);
            }
        }
    }
    return {attrStr: attrStr, val: val};
};

function replaceCDATAstr(str, cdata) {
    str = this.options.tagValueProcessor("" + str);
    if (this.options.cdataPositionChar === "" || str === "") {
        return str + "<![CDATA[" + cdata + "]]>";
    } else {
        return str.replace(this.options.cdataPositionChar, "<![CDATA[" + cdata + "]]>");
    }
}

function replaceCDATAarr(str, cdata) {
    str = this.options.tagValueProcessor("" + str);
    if (this.options.cdataPositionChar === "" || str === "") {
        return str + "<![CDATA[" + cdata.join("]]><![CDATA[") + "]]>";
    } else {
        for (var v in cdata) {
            str = str.replace(this.options.cdataPositionChar, "<![CDATA[" + cdata[v] + "]]>");
        }
        return str;
    }
}

function buildObjectNode(val, key, attrStr, level) {
    return this.indentate(level)
           + "<" + key + attrStr
           + this.tagEndChar
           + val
           //+ this.newLine
           + this.indentate(level)
           + "</" + key + this.tagEndChar;
}

function buildEmptyObjNode(val, key, attrStr, level) {
    if (val !== "") {
        return this.buildObjectNode(val, key, attrStr, level);
    } else {
        return this.indentate(level)
               + "<" + key + attrStr
               + "/"
               + this.tagEndChar;
        //+ this.newLine
    }
}

function buildTextValNode(val, key, attrStr, level) {
    return this.indentate(level) + "<" + key + attrStr + ">" + this.options.tagValueProcessor("" + val) + "</" + key + this.tagEndChar;
}

function buildEmptyTextNode(val, key, attrStr, level) {
    if (val !== "") {
        return this.buildTextValNode(val, key, attrStr, level);
    } else {
        return this.indentate(level) + "<" + key + attrStr + "/" + this.tagEndChar;
    }
}

function indentate(level) {
    return this.options.indentBy.repeat(level);
}

function isAttribute(name/*, options*/) {
    if (name.startsWith(this.options.attributeNamePrefix)) {
        return name.substr(this.attrPrefixLen);
    } else {
        return false;
    }
}

function isCDATA(name) {
    return name === this.options.cdataTagName;
}

//formatting
//indentation
//\n after each closing or self closing tag

module.exports = Parser;

},{"./util":6}],2:[function(require,module,exports){
"use strict";

var util = require("./util");

var convertToJson =function(node, options) {
    var jObj = {};

    if ((!node.child  ||  util.isEmptyObject(node.child)) && (!node.attrsMap || util.isEmptyObject(node.attrsMap))) {
        return util.isExist(node.val) ? node.val : "";
    } else {
        if (util.isExist(node.val)) {
            if (!(typeof node.val === "string" && (node.val === "" || node.val === options.cdataPositionChar))) {
                jObj[options.textNodeName] = node.val;
            }
        }
    }

    util.merge(jObj, node.attrsMap);

    var keys = Object.keys(node.child);
    for (var index = 0; index < keys.length; index++) {
        var tagname = keys[index];
        if (node.child[tagname] && node.child[tagname].length > 1) {
            jObj[tagname] = [];
            for (var tag in node.child[tagname]) {
                jObj[tagname].push(convertToJson(node.child[tagname][tag], options));
            }
        } else {
            jObj[tagname] = convertToJson(node.child[tagname][0], options);
        }
    }
    
    //add value
    return jObj;
};

exports.convertToJson = convertToJson;
},{"./util":6}],3:[function(require,module,exports){
"use strict";

var util = require("./util");
var buildOptions = require("./util").buildOptions;
var x2j = require("./x2j");

//TODO: do it later
var convertToJsonString = function(node, options) {
    options = buildOptions(options,x2j.defaultOptions,x2j.props);

    options.indentBy = options.indentBy || "";
    return _cToJsonStr(node, options,0);
}

var _cToJsonStr = function(node, options,level) {
    var jObj = "{";

    //traver through all the children
    var keys = Object.keys(node.child);
    
    for (var index = 0; index < keys.length; index++) {
        var tagname = keys[index];
        if (node.child[tagname] && node.child[tagname].length > 1) {
            jObj  += "\"" + tagname + "\" : [ ";
            for (var tag in node.child[tagname]) {
                jObj += _cToJsonStr(node.child[tagname][tag], options) + " , ";
            }
            jObj = jObj.substr(0,jObj.length-1) + " ] "; //remove extra comma in last
        } else {
            jObj += "\"" +tagname + "\" : " + _cToJsonStr(node.child[tagname][0], options) + " ,";
        }
    }
    util.merge(jObj, node.attrsMap);
    //add attrsMap as new children
    if (util.isEmptyObject(jObj)) {
        return util.isExist(node.val) ? node.val : "";
    } else {
        if (util.isExist(node.val)) {
            if (!(typeof node.val === "string" && (node.val === "" || node.val === options.cdataPositionChar))) {
                jObj += "\"" + options.textNodeName +"\" : " + stringval(node.val);
            }
        }
    }
    //add value
    if(jObj[jObj.length-1] === ","){
        jObj = jObj.substr(0,jObj.length-2);
    }
    return jObj + "}";
};

function stringval(v){
    if(v === true || v === false || !isNaN(v)){
        return v;
    }else{
        return "\"" + v + "\"";
    }
}

function indentate(options, level) {
    return options.indentBy.repeat(level);
}

exports.convertToJsonString = convertToJsonString;
},{"./util":6,"./x2j":8}],4:[function(require,module,exports){
"use strict";
var char = function(a) {
    return String.fromCharCode(a);
};

var chars = {
    nilChar : char(176),
    missingChar : char(201),
    nilPremitive : char(175),
    missingPremitive : char(200),

    emptyChar : char(178),
    emptyValue:  char(177),//empty Premitive
    
    boundryChar : char(179),
    
    objStart: char(198),
    arrStart: char(204),
    arrayEnd: char(185),
};

var charsArr = [
    chars.nilChar,
    chars.nilPremitive,
    chars.missingChar,
    chars.missingPremitive,
    chars.boundryChar,
    chars.emptyChar,
    chars.emptyValue,
    chars.arrayEnd,
    chars.objStart,
    chars.arrStart
];

var _e = function(node, e_schema, options) {
    if (typeof e_schema === "string") {//premitive
        if (node && node[0] && node[0].val !== undefined) {
            return getValue(node[0].val, e_schema);
        } else {
            return getValue(node, e_schema);
        }
    } else {
        var hasValidData = hasData(node);
        if (hasValidData === true) {
            var str = "";
            if (Array.isArray(e_schema)) {
                //attributes can't be repeated. hence check in children tags only
                str += chars.arrStart;
                var itemSchema = e_schema[0];
                //var itemSchemaType = itemSchema;
                var arr_len = node.length;

                if (typeof itemSchema === "string") {
                    for (var arr_i = 0; arr_i < arr_len; arr_i++) {
                        var r = getValue(node[arr_i].val, itemSchema);
                        str = processValue(str, r);
                    }
                } else {
                    for (var arr_i = 0; arr_i < arr_len; arr_i++) {
                        var r = _e(node[arr_i], itemSchema, options);
                        str = processValue(str, r);
                    }
                }
                str += chars.arrayEnd;//indicates that next item is not array item
            } else {//object
                str += chars.objStart;
                var keys = Object.keys(e_schema);
                if (Array.isArray(node)) {
                    node = node[0];
                }
                for (var i in keys) {
                    var key = keys[i];
                    //a property defined in schema can be present either in attrsMap or children tags
                    //options.textNodeName will not present in both maps, take it's value from val
                    //options.attrNodeName will be present in attrsMap
                    var r;
                    if (!options.ignoreAttributes && node.attrsMap && node.attrsMap[key]) {
                        r = _e(node.attrsMap[key], e_schema[key], options);
                    } else if (key === options.textNodeName) {
                        r = _e(node.val, e_schema[key], options);
                    } else {
                        r = _e(node.child[key], e_schema[key], options);
                    }
                    str = processValue(str, r);
                }
            }
            return str;
        } else {
            return hasValidData;
        }
    }
};

var getValue = function(a/*, type*/) {
    switch (a) {
        case undefined:
            return chars.missingPremitive;
        case null:
            return chars.nilPremitive;
        case "":
            return chars.emptyValue;
        default:
            return a;
    }
};

var processValue = function(str, r) {
    if (!isAppChar(r[0]) && !isAppChar(str[str.length - 1])) {
        str += chars.boundryChar;
    }
    return str + r;
};

var isAppChar = function(ch) {
    return charsArr.indexOf(ch) !== -1;
};

function hasData(jObj) {
    if (jObj === undefined) {
        return chars.missingChar;
    } else if (jObj === null) {
        return chars.nilChar;
    } else if (jObj.child && Object.keys(jObj.child).length === 0 && (!jObj.attrsMap || Object.keys(jObj.attrsMap).length === 0)) {
        return chars.emptyChar;
    } else {
        return true;
    }
}

var x2j = require("./x2j");
var buildOptions = require("./util").buildOptions;

var convert2nimn = function(node, e_schema, options) {
    options = buildOptions(options,x2j.defaultOptions,x2j.props);
    return _e(node, e_schema, options);
};

exports.convert2nimn = convert2nimn;

},{"./util":6,"./x2j":8}],5:[function(require,module,exports){
"use strict";

var nodeToJson = require("./n2j");
var xmlToNodeobj = require("./x2j");
var x2j = require("./x2j");
var buildOptions = require("./util").buildOptions;

exports.parse = function(xmlData, options) {
    options = buildOptions(options,x2j.defaultOptions,x2j.props);
    return nodeToJson.convertToJson(xmlToNodeobj.getTraversalObj(xmlData, options), options);
};
exports.convertTonimn = require("../src/nimndata").convert2nimn;
exports.getTraversalObj = xmlToNodeobj.getTraversalObj;
exports.convertToJson = nodeToJson.convertToJson;
exports.convertToJsonString = require("./n2j_str").convertToJsonString;
exports.validate = require("./validator").validate;
exports.j2xParser = require("./j2x");
exports.parseToNimn = function (xmlData,schema,options){
    return exports.convertTonimn(exports.getTraversalObj(xmlData,options), schema, options);
};

},{"../src/nimndata":4,"./j2x":1,"./n2j":2,"./n2j_str":3,"./util":6,"./validator":7,"./x2j":8}],6:[function(require,module,exports){
"use strict";

var getAllMatches = function(string, regex) {
    var matches = [];
    var match = regex.exec(string);
    while (match) {
        var allmatches = [];
        var len = match.length;
        for (var index = 0; index < len; index++) {
            allmatches.push(match[index]);
        }
        matches.push(allmatches);
        match = regex.exec(string);
    }
    return matches;
};

var doesMatch = function(string, regex) {
    var match = regex.exec(string);
    return !(match === null || typeof match === "undefined");
};

var doesNotMatch = function(string, regex) {
    return !doesMatch(string, regex);
};

exports.isExist = function(v) {
    return typeof v !== "undefined";
};

exports.isEmptyObject = function(obj) {
    return Object.keys(obj).length === 0;
};

/**
 * Copy all the properties of a into b.
 * @param {*} target
 * @param {*} a
 */
exports.merge = function(target, a) {
    if (a) {
        var keys = Object.keys(a); // will return an array of own properties
        var len = keys.length; //don't make it inline
        for (var i = 0; i < len; i++) {
            target[keys[i]] = a[keys[i]];
        }
    }
};
/* exports.merge =function (b,a){
  return Object.assign(b,a);
} */

exports.getValue = function(v) {
    if (exports.isExist(v)) {
        return v;
    } else {
        return "";
    }
};

// var fakeCall = function(a) {return a;};
// var fakeCallNoReturn = function() {};

exports.buildOptions = function(options,defaultOptions,props) {
    var newOptions = {};
    if (!options) {
        options = {};
    }
    
    for (var i = 0; i < props.length; i++) {
        if ( options[props[i]] !== undefined) {
            newOptions[props[i]] = options[props[i]];
        }else{
            newOptions[props[i]] = defaultOptions[props[i]];
        }
    }
    return newOptions;
};

exports.doesMatch = doesMatch;
exports.doesNotMatch = doesNotMatch;
exports.getAllMatches = getAllMatches;

},{}],7:[function(require,module,exports){
"use strict";

var util = require("./util");

var defaultOptions = {
    allowBooleanAttributes: false         //A tag can have attributes without any value
};

var props = ["allowBooleanAttributes"];

//var tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
exports.validate = function(xmlData, options) {
    options = util.buildOptions(options,defaultOptions,props);

    //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
    //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
    //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE

    var tags = [];
    var tagFound = false;
    for (var i = 0; i < xmlData.length; i++) {

        if (xmlData[i] === "<") {//starting of tag
            //read until you reach to '>' avoiding any '>' in attribute value

            i++;
            if (xmlData[i] === "?") {
                i = readPI(xmlData, ++i);
                if (i.err) {
                    return i;
                }
            } else if (xmlData[i] === "!") {
                i = readCommentAndCDATA(xmlData, i);
                continue;
            } else {
                var closingTag = false;
                if (xmlData[i] === "/") {//closing tag
                    closingTag = true;
                    i++;
                }
                //read tagname
                var tagName = "";
                for (; i < xmlData.length &&
                       xmlData[i] !== ">" &&
                       xmlData[i] !== " " &&
                       xmlData[i] !== "\t"; i++) {

                    tagName += xmlData[i];
                }
                tagName = tagName.trim();
                //console.log(tagName);

                if (tagName[tagName.length - 1] === "/") {//self closing tag without attributes
                    tagName = tagName.substring(0, tagName.length - 1);
                    continue;
                }
                if (!validateTagName(tagName)) {
                    return {err: {code: "InvalidTag", msg: "Tag " + tagName + " is an invalid name."}};
                }

                var result = readAttributeStr(xmlData, i);
                if (result === false) {
                    return {err: {code: "InvalidAttr", msg: "Attributes for " + tagName + " have open quote"}};
                }
                var attrStr = result.value;
                i = result.index;

                if (attrStr[attrStr.length - 1] === "/") {//self closing tag
                    attrStr = attrStr.substring(0, attrStr.length - 1);
                    var isValid = validateAttributeString(attrStr, options);
                    if (isValid === true) {
                        tagFound = true;
                        continue;
                    } else {
                        return isValid;
                    }
                } else if (closingTag) {
                    if (attrStr.trim().length > 0) {
                        return {err: {code: "InvalidTag", msg: "closing tag " + tagName + " can't have attributes or invalid starting."}};
                    } else {
                        var otg = tags.pop();
                        if (tagName !== otg) {
                            return {err: {code: "InvalidTag", msg: "closing tag " + otg + " is expected inplace of " + tagName + "."}};
                        }
                    }
                } else {
                    var isValid = validateAttributeString(attrStr, options);
                    if (isValid !== true) {
                        return isValid;
                    }
                    tags.push(tagName);
                    tagFound = true;
                }

                //skip tag text value
                //It may include comments and CDATA value
                for (i++; i < xmlData.length; i++) {
                    if (xmlData[i] === "<") {
                        if (xmlData[i + 1] === "!") {//comment or CADATA
                            i++;
                            i = readCommentAndCDATA(xmlData, i);
                            continue;
                        } else {
                            break;
                        }
                    }
                }//end of reading tag text value
                if (xmlData[i] === "<") {
                    i--;
                }
            }
        } else {
            if (xmlData[i] === " " || xmlData[i] === "\t" || xmlData[i] === "\n" || xmlData[i] === "\r") {
                continue;
            }
            return {err: {code: "InvalidChar", msg: "char " + xmlData[i] + " is not expected ."}};
        }
    }

    if (!tagFound) {
        return {err: {code: "InvalidXml", msg: "Start tag expected."}};
    } else if (tags.length > 0) {
        return {err: {code: "InvalidXml", msg: "Invalid " + JSON.stringify(tags, null, 4).replace(/\r?\n/g, "") + " found."}};
    }

    return true;
};

/**
 * Read Processing insstructions and skip
 * @param {*} xmlData
 * @param {*} i
 */
function readPI(xmlData, i) {
    var start = i;
    for (; i < xmlData.length; i++) {
        if (xmlData[i] == "?" || xmlData[i] == " ") {//tagname
            var tagname = xmlData.substr(start, i - start);
            if (i > 5 && tagname === "xml") {
                return {err: {code: "InvalidXml", msg: "XML declaration allowed only at the start of the document."}};
            } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
                //check if valid attribut string
                i++;
                break;
            } else {
                continue;
            }
        }
    }
    return i;
}

function readCommentAndCDATA(xmlData, i) {
    if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {//comment
        for (i += 3; i < xmlData.length; i++) {
            if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
                i += 2;
                break;
            }
        }
    } else if (xmlData.length > i + 8 &&
               xmlData[i + 1] === "D" &&
               xmlData[i + 2] === "O" &&
               xmlData[i + 3] === "C" &&
               xmlData[i + 4] === "T" &&
               xmlData[i + 5] === "Y" &&
               xmlData[i + 6] === "P" &&
               xmlData[i + 7] === "E") {
        var angleBracketsCount = 1;
        for (i += 8; i < xmlData.length; i++) {
            if (xmlData[i] === "<") {angleBracketsCount++;}
            else if (xmlData[i] === ">") {
                angleBracketsCount--;
                if (angleBracketsCount === 0) {
                    break;
                }
            }
        }
    } else if (xmlData.length > i + 9 &&
               xmlData[i + 1] === "[" &&
               xmlData[i + 2] === "C" &&
               xmlData[i + 3] === "D" &&
               xmlData[i + 4] === "A" &&
               xmlData[i + 5] === "T" &&
               xmlData[i + 6] === "A" &&
               xmlData[i + 7] === "[") {

        for (i += 8; i < xmlData.length; i++) {
            if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
                i += 2;
                break;
            }
        }
    }

    return i;
}

var doubleQuote = "\"";
var singleQuote = "'";

/**
 * Keep reading xmlData until '<' is found outside the attribute value.
 * @param {string} xmlData
 * @param {number} i
 */
function readAttributeStr(xmlData, i) {
    var attrStr = "";
    var startChar = "";
    for (; i < xmlData.length; i++) {
        if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
            if (startChar === "") {
                startChar = xmlData[i];
            } else if (startChar !== xmlData[i]) {
                //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
                continue;
            } else {
                startChar = "";
            }
        } else if (xmlData[i] === ">") {
            if (startChar === "") {
                break;
            }
        }
        attrStr += xmlData[i];
    }
    if (startChar !== "") {
        return false;
    }

    return {value: attrStr, index: i};
}

/**
 * Select all the attributes whether valid or invalid.
 */
var validAttrStrRegxp = new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?", "g");

//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

function validateAttributeString(attrStr, options) {
    //console.log("start:"+attrStr+":end");

    //if(attrStr.trim().length === 0) return true; //empty string

    var matches = util.getAllMatches(attrStr, validAttrStrRegxp);
    var attrNames = [];

    for (var i = 0; i < matches.length; i++) {
        //console.log(matches[i]);

        if (matches[i][1].length === 0) {//nospace before attribute name: a="sd"b="saf"
            return {err: {code: "InvalidAttr", msg: "attribute " + matches[i][2] + " has no space in starting."}};
        } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {//independent attribute: ab
            return {err: {code: "InvalidAttr", msg: "boolean attribute " + matches[i][2] + " is not allowed."}};
        }
        /* else if(matches[i][6] === undefined){//attribute without value: ab=
                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                } */
        var attrName = matches[i][2];
        if (!validateAttrName(attrName)) {
            return {err: {code: "InvalidAttr", msg: "attribute " + attrName + " is an invalid name."}};
        }
        if (!attrNames.hasOwnProperty(attrName)) {//check for duplicate attribute.
            attrNames[attrName] = 1;
        } else {
            return {err: {code: "InvalidAttr", msg: "attribute " + attrName + " is repeated."}};
        }
    }

    return true;

}

var validAttrRegxp = /^[_a-zA-Z][\w\-.:]*$/;

function validateAttrName(attrName) {
    return util.doesMatch(attrName, validAttrRegxp);
}

//var startsWithXML = new RegExp("^[Xx][Mm][Ll]");
var startsWith = /^([a-zA-Z]|_)[\w.\-_:]*/;

function validateTagName(tagname) {
    /*if(util.doesMatch(tagname,startsWithXML)) return false;
    else*/
    return !util.doesNotMatch(tagname, startsWith);
}



},{"./util":6}],8:[function(require,module,exports){
"use strict";

var util = require("./util");
var buildOptions = require("./util").buildOptions;
var xmlNode = require("./xmlNode");
var TagType = {"OPENING": 1, "CLOSING": 2, "SELF": 3, "CDATA": 4};
var regx = "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|(([\\w:\\-._]*:)?([\\w:\\-._]+))([^>]*)>|((\\/)(([\\w:\\-._]*:)?([\\w:\\-._]+))\\s*>))([^<]*)";

//var tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
//var tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");

//treat cdata as a tag

var defaultOptions = {
    attributeNamePrefix:    "@_",
    attrNodeName:           false,
    textNodeName:           "#text",
    ignoreAttributes:       true,
    ignoreNameSpace:        false,
    allowBooleanAttributes: false,         //a tag can have attributes without any value
    //ignoreRootElement : false,
    parseNodeValue:         true,
    parseAttributeValue:    false,
    arrayMode:              false,
    trimValues:             true,                                //Trim string values of tag and attributes
    cdataTagName:           false,
    cdataPositionChar:      "\\c",
    localeRange:            "",
    tagValueProcessor: function(a) {return a},
    attrValueProcessor: function(a) {return a}
    //decodeStrict: false,
};

exports.defaultOptions = defaultOptions;

var props = ["attributeNamePrefix", "attrNodeName", "textNodeName", "ignoreAttributes", "ignoreNameSpace", "allowBooleanAttributes", "parseNodeValue", "parseAttributeValue", "arrayMode", "trimValues", "cdataTagName", "cdataPositionChar", "localeRange", "tagValueProcessor", "attrValueProcessor"];
exports.props = props;

var getTraversalObj = function(xmlData, options) {
    options = buildOptions(options,defaultOptions,props);
    //xmlData = xmlData.replace(/\r?\n/g, " ");//make it single line
    xmlData = xmlData.replace(/<!--[\s\S]*?-->/g, "");//Remove  comments

    var xmlObj = new xmlNode("!xml");
    var currentNode = xmlObj;

    regx = regx.replace(/\[\\w/g, "[" + options.localeRange + "\\w");
    var tagsRegx = new RegExp(regx, "g");
    var tag = tagsRegx.exec(xmlData);
    var nextTag = tagsRegx.exec(xmlData);
    while (tag) {
        var tagType = checkForTagType(tag);

        if (tagType === TagType.CLOSING) {
            //add parsed data to parent node
            if (currentNode.parent && tag[14]) {
                currentNode.parent.val = util.getValue(currentNode.parent.val) + "" + processTagValue(tag[14], options);
            }

            currentNode = currentNode.parent;
        } else if (tagType === TagType.CDATA) {
            if (options.cdataTagName) {
                //add cdata node
                var childNode = new xmlNode(options.cdataTagName, currentNode, tag[3]);
                childNode.attrsMap = buildAttributesMap(tag[8], options);
                currentNode.addChild(childNode);
                //for backtracking
                currentNode.val = util.getValue(currentNode.val) + options.cdataPositionChar;
                //add rest value to parent node
                if (tag[14]) {
                    currentNode.val += processTagValue(tag[14], options);
                }
            } else {
                currentNode.val = (currentNode.val || "") + (tag[3] || "") + processTagValue(tag[14], options);
            }
        } else if (tagType === TagType.SELF) {
            var childNode = new xmlNode(options.ignoreNameSpace ? tag[7] : tag[5], currentNode, "");
            if (tag[8] && tag[8].length > 1) {
                tag[8] = tag[8].substr(0, tag[8].length - 1);
            }
            childNode.attrsMap = buildAttributesMap(tag[8], options);
            currentNode.addChild(childNode);
        } else {//TagType.OPENING
            var childNode = new xmlNode(options.ignoreNameSpace ? tag[7] : tag[5], currentNode, processTagValue(tag[14], options));
            childNode.attrsMap = buildAttributesMap(tag[8], options);
            currentNode.addChild(childNode);
            currentNode = childNode;
        }

        tag = nextTag;
        nextTag = tagsRegx.exec(xmlData);
    }

    return xmlObj;
};

function processTagValue(val, options) {
    if (val) {
        if (options.trimValues) {
            val = val.trim();
        }
        val = options.tagValueProcessor(val);
        val = parseValue(val, options.parseNodeValue);
    }

    return val;
}

function checkForTagType(match) {
    if (match[4] === "]]>") {
        return TagType.CDATA;
    } else if (match[10] === "/") {
        return TagType.CLOSING;
    } else if (typeof match[8] !== "undefined" && match[8].substr(match[8].length - 1) === "/") {
        return TagType.SELF;
    } else {
        return TagType.OPENING;
    }
}

function resolveNameSpace(tagname, options) {
    if (options.ignoreNameSpace) {
        var tags = tagname.split(":");
        var prefix = tagname.charAt(0) === "/" ? "/" : "";
        if (tags[0] === "xmlns") {
            return "";
        }
        if (tags.length === 2) {
            tagname = prefix + tags[1];
        }
    }
    return tagname;
}

function parseValue(val, shouldParse) {
    if (shouldParse && typeof val === "string") {
        if (val.trim() === "" || isNaN(val)) {
            val = val === "true" ? true : val === "false" ? false : val;
        } else {
            if (val.indexOf(".") !== -1) {
                val = Number.parseFloat(val);
            } else {
                val = Number.parseInt(val, 10);
            }
        }
        return val;
    } else {
        if (util.isExist(val)) {
            return val;
        } else {
            return "";
        }
    }
}

//TODO: change regex to capture NS
//var attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
var attrsRegx = new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])(.*?)\\3)?", "g");

function buildAttributesMap(attrStr, options) {
    if (!options.ignoreAttributes && typeof attrStr === "string") {
        attrStr = attrStr.replace(/\r?\n/g, " ");
        //attrStr = attrStr || attrStr.trim();

        var matches = util.getAllMatches(attrStr, attrsRegx);
        var len = matches.length; //don't make it inline
        var attrs = {};
        for (var i = 0; i < len; i++) {
            var attrName = resolveNameSpace(matches[i][1], options);
            if (attrName.length) {
                if (matches[i][4] !== undefined) {
                    if (options.trimValues) {
                        matches[i][4] = matches[i][4].trim();
                    }
                    matches[i][4] = options.attrValueProcessor(matches[i][4]);
                    attrs[options.attributeNamePrefix + attrName] = parseValue(matches[i][4], options.parseAttributeValue);
                } else if (options.allowBooleanAttributes) {
                    attrs[options.attributeNamePrefix + attrName] = true;
                }

            }
        }
        if (!Object.keys(attrs).length) {
            return;
        }
        if (options.attrNodeName) {
            var attrCollection = {};
            attrCollection[options.attrNodeName] = attrs;
            return attrCollection;
        }
        return attrs;
    }
}

exports.getTraversalObj = getTraversalObj;

},{"./util":6,"./xmlNode":9}],9:[function(require,module,exports){
"use strict";

module.exports = function(tagname, parent, val) {
    this.tagname = tagname;
    this.parent = parent;
    this.child = {};//child tags
    this.attrsMap = {};//attributes map
    this.val = val;//text only
    this.addChild = function(child) {
        if (this.child[child.tagname]) {//already presents
            this.child[child.tagname].push(child);
        } else {
            this.child[child.tagname] = [child];
        }
    };
};

},{}]},{},[5])(5)
});