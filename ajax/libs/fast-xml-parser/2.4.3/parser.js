(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.parser = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var InvalidXmlException = function (msg){
    this.name = "InvalidXmlException";
    this.message = msg;
    this.stack = (new Error()).stack;
}
InvalidXmlException.prototype = Object.create(Error.prototype);
InvalidXmlException.prototype.constructor = InvalidXmlException;

module.exports = InvalidXmlException;
},{}],2:[function(require,module,exports){
var getAllMatches = require("./util").getAllMatches;

var xmlNode = function(tagname,parent,val){
    this.tagname = tagname;
    this.parent = parent;
    this.child = [];
    this.val = val;
    this.addChild = function (child){
        this.child.push(child);
    };
};

//var tagsRegx = new RegExp("<(\\/?[a-zA-Z0-9_:]+)([^>\\/]*)(\\/?)>([^<]+)?","g");
//var tagsRegx = new RegExp("<(\\/?[\\w:-]+)([^>]*)>([^<]+)?","g");
var cdataRegx = "<!\\[CDATA\\[([^\\]\\]]*)\\]\\]>"
var tagsRegx = new RegExp("<(\\/?[\\w:-]+)([^>]*)>(<!\\[CDATA\\[([^\\]\\]]*)\\]\\]>)*([^<]+)?","g");

var defaultOptions = {
    attrPrefix : "@_",
    textNodeName : "#text",
    ignoreNonTextNodeAttr : true,
    ignoreTextNodeAttr : true,
    ignoreNameSpace : false,
    ignoreRootElement : false,
    textNodeConversion : true
};

var buildOptions = function (options){
    if(!options) options = {};
    var props = ["attrPrefix","ignoreNonTextNodeAttr","ignoreTextNodeAttr","ignoreNameSpace","ignoreRootElement","textNodeName","textNodeConversion"];
    for (var i = 0; i < props.length; i++) {
        if(options[props[i]] === undefined){
            options[props[i]] = defaultOptions[props[i]];
        }
    }
    return options;
};

var getTraversalObj =function (xmlData,options){
    options = buildOptions(options);
    //xmlData = xmlData.replace(/>(\s+)/g, ">");//Remove spaces and make it single line.
    var tags = getAllMatches(xmlData,tagsRegx);
    var xmlObj = new xmlNode('!xml');
    var currentNode = xmlObj;

    for (var i = 0; i < tags.length ; i++) {
        var tag = resolveNameSpace(tags[i][1],options.ignoreNameSpace),
            nexttag = i+1 < tags.length ? resolveNameSpace(tags[i+1][1],options.ignoreNameSpace) : undefined,
            attrsStr = tags[i][2], attrs,
            val = tags[i][4] ===  undefined ? tags[i][5] :  simplifyCDATA(tags[i][0]);

        if(tag.indexOf("/") === 0){//ending tag
            currentNode = currentNode.parent;
            continue;
        }

        var selfClosingTag = attrsStr.charAt(attrsStr.length-1) === '/';
        var childNode = new xmlNode(tag,currentNode);

        if(selfClosingTag){
            attrs = buildAttributesArr(attrsStr,options.ignoreTextNodeAttr,options.attrPrefix,options.ignoreNameSpace);
            childNode.val = attrs || "";
            currentNode.addChild(childNode);
        }else if( ("/" + tag) === nexttag){ //Text node
            attrs = buildAttributesArr(attrsStr,options.ignoreTextNodeAttr,options.attrPrefix,options.ignoreNameSpace);
            val = parseValue(val,options.textNodeConversion);
            if(attrs){
                attrs[options.textNodeName] = val;
                childNode.val = attrs;
            }else{
                childNode.val = val || "";
            }
            currentNode.addChild(childNode);
            i++;
        }else{//starting tag
            attrs = buildAttributesArr(attrsStr,options.ignoreNonTextNodeAttr,options.attrPrefix,options.ignoreNameSpace);
            if(attrs){
                for (var prop in attrs) {
                  attrs.hasOwnProperty(prop) && childNode.addChild(new xmlNode(prop,childNode,attrs[prop]));
                }
            }
            currentNode.addChild(childNode);
            currentNode = childNode;
        }
    }
    return xmlObj;
};

var xml2json = function (xmlData,options){
    return convertToJson(getTraversalObj(xmlData,options));
};

var cdRegx = new RegExp("<!\\[CDATA\\[([^\\]\\]]*)\\]\\]>","g");

function simplifyCDATA(cdata){
    var result = getAllMatches(cdata,cdRegx);
    var val = "";
    for (var i = 0; i < result.length ; i++) {
        val+=result[i][1];
    }
    return val;
}

function resolveNameSpace(tagname,ignore){
    if(ignore){
        var tags = tagname.split(":");
        var prefix = tagname.charAt(0) === "/" ? "/" : "";
        if(tags.length === 2) {
            tagname = prefix + tags[1];
        }
    }
    return tagname;
}

function parseValue(val,conversion){
    if(val){
        if(!conversion || isNaN(val)){
            val = "" + val ;
        }else{
            if(val.indexOf(".") !== -1){
                val = Number.parseFloat(val);
            }else{
                val = Number.parseInt(val,10);
            }
        }
    }else{
        val = "";
    }
    return val;
}

var attrsRegx = new RegExp("(\\S+)=.([^'\"]+)","g");
function buildAttributesArr(attrStr,ignore,prefix,ignoreNS){
    attrStr = attrStr || attrStr.trim();
    if(!ignore && attrStr.length > 3){
        var matches = getAllMatches(attrStr,attrsRegx);
        var attrs = {};
        for (var i = 0; i < matches.length; i++) {
            var attrName = prefix + resolveNameSpace( matches[i][1],ignoreNS);
            attrs[attrName] = matches[i][2];
        }
        return attrs;
    }
}

var convertToJson = function (node){
    var jObj = {};
    if(node.val || node.val === "") {
        return node.val;
    }else{
        for (var index = 0; index < node.child.length; index++) {
            var prop = node.child[index].tagname;
            var obj = convertToJson(node.child[index]);
            if(jObj[prop] !== undefined){
                if(!Array.isArray(jObj[prop])){
                    var swap = jObj[prop];
                    jObj[prop] = [];
                    jObj[prop].push(swap);
                }
                jObj[prop].push(obj);
            }else{
                jObj[prop] = obj;
            }
        }
    }
    return jObj;
};

exports.parse = xml2json;
exports.getTraversalObj = getTraversalObj;
exports.convertToJson = convertToJson;
exports.validate = require("./validator").validate;

},{"./util":3,"./validator":4}],3:[function(require,module,exports){
var getAllMatches = function(string, regex) {
  //var regex = new RegExp(regex_str,"g");
  var matches = [];
  var match = regex.exec(string);
  while (match) {
  	var allmatches = [];
    for (var index = 0; index < match.length; index++) {
  		allmatches.push(match[index]);
  	}
    matches.push(allmatches);
    match = regex.exec(string);
  }
  return matches;
};

exports.getAllMatches = getAllMatches;
},{}],4:[function(require,module,exports){
var getAllMatches = require("./util").getAllMatches;
var InvalidXmlException = require("./InvalidXmlException");

var validate = function (xmlData){
    xmlData = xmlData.replace(/[ \t]/g, " ");
    var eStack = [], currentTag = "", lineNum = 1;
    for (var i = 0; i < xmlData.length;i++) {
        if(xmlData[i] === "\n"){
            lineNum++;
        }else if(xmlData[i] === '<'){
            if(xmlData[i+1] === " "){//comment tag
                throw new InvalidXmlException("Invalid tag at "+ lineNum + ":" + i);
            }else if(xmlData[i+1] === "!"){//comment tag or CDATA tag
                var tg = "";
                if(xmlData[i+2] === "-")
                    tg = getCommentTag(xmlData,i,lineNum);
                else if(xmlData[i+2] === "["){
                    tg = getCDATA(xmlData,i,lineNum);
                }else{
                    throw new InvalidXmlException("Invalid tag at "+ lineNum + ":" + i);
                }
                i+=tg.length-1;
            }else if(xmlData[i+1] === "/"){//closing tag
                i+=2;
                currentTag = getEndTagName(xmlData,i,lineNum);
                if(eStack[eStack.length-1] !== currentTag){
                    throw new InvalidXmlException("closing tag is not matching at "+ lineNum + ":" + i);
                }else{
                    eStack.pop();
                }
                i+=currentTag.length;
            }else{
                currentTag = getTagName(xmlData,++i);
                i+=currentTag.length;
                var attrStr = getAttrStr(xmlData,i,lineNum);
                if(attrStr && (attrStr[attrStr.length-1] === "/"|| attrStr[attrStr.length-1] === "?")){
                    i+=attrStr.length;
                }else{
                    eStack.push(currentTag);
                }
                var text = getvalue(xmlData,++i);
                i+=text.length-1;
            }
        }
    }
    if(eStack.length === 0)     return true;
    else
        throw new InvalidXmlException("closing tag is missing for "+ eStack);
};

/**
 * Validate and return comment tag 
 */
function getCommentTag(xmlData,startIndex,lineNum){
    for (var i = startIndex; i < xmlData.length; i++){
        if(xmlData[i] === "-" && xmlData[i+1] === "-" && xmlData[i+2] === ">") break;
    }
    if(xmlData.substr(startIndex,4) === "<!--" && xmlData.substr(i,3) === "-->")
        return xmlData.substring(startIndex,i);
    else
        throw new InvalidXmlException("Invalid comment tag at " + lineNum +":"+ startIndex);
}

/**
 * Validate and return comment tag 
 */
function getCDATA(xmlData,startIndex,lineNum){
    for (var i = startIndex; i < xmlData.length; i++){
        if(xmlData[i] === "<" && xmlData[i+1] === "/") {
            i--;
            break;
        }
    }
    if(xmlData.substr(startIndex,9) === "<![CDATA[" && xmlData.substr(i-2,3) === "]]>")
        return xmlData.substring(startIndex,i);
    else
        throw new InvalidXmlException("Invalid CDATA tag at " + lineNum +":"+ startIndex);
}

/**
 * Validate and return end ending tag
 */
function getEndTagName(xmlData,startIndex,lineNum){
    xmlData = xmlData.replace(/\s/g, " ");for (var i = startIndex; i < xmlData.length && xmlData[i] !== " " && xmlData[i] !== ">"; i++);
    if(xmlData[i-1] !== ">"){
        for(var j=i;j<xmlData.length && xmlData[j] !== ">"; j++){
            if(xmlData[j] !== " ")
                throw new InvalidXmlException("Invalid closing tag at " + lineNum +":"+ startIndex);
        }
    }
    return xmlData.substring(startIndex,i);
}

var attrsRegx1 = new RegExp('(?:[\\s]+([\\w:\-]+)[\\s]*=[\\s]*"([^"]*)")',"g");
var attrsRegx2 = new RegExp("(?:[\\s]+([\\w:\-]+)[\\s]*=[\\s]*'([^']*)')","g");
var attrNamesRegx = new RegExp("([\\w: \-]+)[\\s]*=","g");

/**
 * Repeated attributes are not allowed
 * if attribute value is enclosed in \' there can't be \' in value
 * if attribute value is enclosed in \" there can't be \" in value
 * there should be space between 2 attributs
 * attribute name can't have space, \', \", =
 */
function getAttrStr(xmlData,startIndex,lineNum){
    for (var i = startIndex; i < xmlData.length && xmlData[i] !== ">"; i++);
    if(xmlData[i] === ">"){
        var attrStr = xmlData.substring(startIndex,i);
        //attrStr = attrStr.trim();
        if(attrStr.length > 4){ //a=""
            var attrs = getListOfAttrsName([],attrStr,attrsRegx1,startIndex,lineNum);
            attrs = getListOfAttrsName(attrs,attrStr,attrsRegx2,startIndex,lineNum);

            var matches = getAllMatches(attrStr,attrNamesRegx);
            for (i = 0; i < matches.length; i++) {
                var attrName = matches[i][1].trim();
                if(!attrs[attrName])
                    throw new InvalidXmlException("Invalid arguments at " + lineNum +":"+ startIndex);
            }
        }
        return attrStr;
    }else{
        throw new InvalidXmlException("Not closing tag at " + lineNum +":"+ startIndex);
    }
    
}

function getListOfAttrsName(attrs,attrStr,attrsRegx,startIndex,lineNum){
    var matches = getAllMatches(attrStr,attrsRegx);
    for (var i = 0; i < matches.length; i++) {
        var attrName = matches[i][1];
        if(!attrs[attrName])
            attrs[attrName] = true;
        else
            throw new InvalidXmlException("Argument "+ attrName +" is redefined at " + lineNum +":"+ startIndex);
    }
    return attrs;
}

function getTagName(xmlData,startIndex){
    for (var i = startIndex; i < xmlData.length; i++){
        if(xmlData[i] === " " || xmlData[i] === ">" || (xmlData[i] === "/" && xmlData[i+1] === ">")) break;
    }
    return xmlData.substring(startIndex,i);
}

function getvalue(xmlData,startIndex){
    for (var i = startIndex; i < xmlData.length && xmlData[i] !== "<"; i++);
    return xmlData.substring(startIndex,i);
}

exports.validate = validate;

},{"./InvalidXmlException":1,"./util":3}]},{},[2])(2)
});