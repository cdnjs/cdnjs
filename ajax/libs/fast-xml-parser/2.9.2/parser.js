(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.parser = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//var cdataRegx = "<!\\[CDATA\\[([^\\]\\]]*)\\]\\]>";
var cdataRegx = "<!\\[CDATA\\[(.*?)(\\]\\]>)";
var tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");

var defaultOptions = {
    attrPrefix : "@_",
    attrNodeName: false,
    textNodeName : "#text",
    ignoreNonTextNodeAttr : true,
    ignoreTextNodeAttr : true,
    ignoreNameSpace : false,
    ignoreRootElement : false,
    textNodeConversion : true,
    textAttrConversion : false,
    arrayMode : false
};

var buildOptions = function (options){
    if(!options) options = {};
    var props = ["attrPrefix","attrNodeName","ignoreNonTextNodeAttr","ignoreTextNodeAttr","ignoreNameSpace","ignoreRootElement","textNodeName","textNodeConversion","textAttrConversion","arrayMode"];
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
    xmlData = xmlData.replace(/<!--(.|\n)*?-->/g, "");//Remove single and multiline comments
    var tags = getAllMatches(xmlData,tagsRegx);
    //console.log(tags);
    var xmlObj = new xmlNode('!xml');
    var currentNode = xmlObj;

    for (var i = 0; i < tags.length ; i++) {
        var tag = resolveNameSpace(tags[i][1],options.ignoreNameSpace),
            nexttag = i+1 < tags.length ? resolveNameSpace(tags[i+1][1],options.ignoreNameSpace) : undefined,
            attrsStr = tags[i][2], attrs,
            val = tags[i][4] ===  undefined ? tags[i][6] :  simplifyCDATA(tags[i][0]);
        if(tag.indexOf("/") === 0){//ending tag
            currentNode = currentNode.parent;
            continue;
        }

        var selfClosingTag = attrsStr.charAt(attrsStr.length-1) === '/';
        var childNode = new xmlNode(tag,currentNode);

        if(selfClosingTag){
            attrs = buildAttributesArr(attrsStr,options.ignoreTextNodeAttr,options.attrPrefix,options.attrNodeName,options.ignoreNameSpace,options.textAttrConversion);
            childNode.val = attrs || "";
            currentNode.addChild(childNode);
        }else if( ("/" + tag) === nexttag){ //Text node
            attrs = buildAttributesArr(attrsStr,options.ignoreTextNodeAttr,options.attrPrefix,options.attrNodeName,options.ignoreNameSpace,options.textAttrConversion);
            val = parseValue(val,options.textNodeConversion);
            if(attrs){
                attrs[options.textNodeName] = val;
                childNode.val = attrs;
            }else{
                childNode.val = val;    
            }
            currentNode.addChild(childNode);
            i++;
        }else if( (nexttag && nexttag.indexOf("/") === -1) && (val !== undefined && val != null && val.trim() !== "" )){ //Text node with sub nodes
            val = parseValue(val,options.textNodeConversion);
            childNode.addChild(new xmlNode(options.textNodeName,childNode,val));
            currentNode.addChild(childNode);
            currentNode = childNode;
        }else{//starting tag
            attrs = buildAttributesArr(attrsStr,options.ignoreNonTextNodeAttr,options.attrPrefix,options.attrNodeName,options.ignoreNameSpace,options.textAttrConversion);
            if(attrs){
                for (var prop in attrs) {
                  if(attrs.hasOwnProperty(prop)){
                    childNode.addChild(new xmlNode(prop,childNode,attrs[prop]));
                  }
                }
            }
            currentNode.addChild(childNode);
            currentNode = childNode;
        }
    }
    return xmlObj;
};

var xml2json = function (xmlData,options){
    return convertToJson(getTraversalObj(xmlData,options), buildOptions(options).arrayMode);
};

var cdRegx = new RegExp(cdataRegx,"g");

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
            if(tags[0] === "xmlns") {
                return "";
            }
            tagname = prefix + tags[1];
        }
    }
    return tagname;
}

function parseValue(val,conversion){
    if(val){
        if(!conversion || isNaN(val)){
            val = "" + val ;
            val = val.replace("\n"," ");
        }else{
            if(val.indexOf(".") !== -1){
                if(parseFloat){
                    val = parseFloat(val);
                }else{
                    val = Number.parseFloat(val);
                }
            }else{
                if(parseInt){
                    val = parseInt(val,10);
                }else{
                    val = Number.parseInt(val,10);
                }
            }
        }
    }else{
        val = "";
    }
    return val;
}

var attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
function buildAttributesArr(attrStr,ignore,prefix,attrNodeName,ignoreNS,conversion){
    attrStr = attrStr || attrStr.trim();
    
    if(!ignore && attrStr.length > 3){

        var matches = getAllMatches(attrStr,attrsRegx);
        var attrs = {};
        for (var i = 0; i < matches.length; i++) {
            var attrName = resolveNameSpace(matches[i][1],ignoreNS);
            if(attrName.length && attrName !== "xmlns") {
                attrs[prefix + attrName] = parseValue(matches[i][3], conversion);
            }
        }
        if(!Object.keys(attrs).length){
            return;
        }
        if(attrNodeName){
            var attrCollection = {};
            attrCollection[attrNodeName] = attrs;
            return attrCollection;
        }
        return attrs;
    }
}

var convertToJson = function (node, arrayMode){
    var jObj = {};
    if(node.val !== undefined && node.val != null || node.val === "") {
        return node.val;
    }else{
        for (var index = 0; index < node.child.length; index++) {
            var prop = node.child[index].tagname;
            var obj = convertToJson(node.child[index], arrayMode);
            if(jObj[prop] !== undefined){
                if(!Array.isArray(jObj[prop])){
                    var swap = jObj[prop];
                    jObj[prop] = [];
                    jObj[prop].push(swap);
                }
                jObj[prop].push(obj);
            }else{
                jObj[prop] = arrayMode ? [obj] : obj;
            }
        }
    }
    return jObj;
};

exports.parse = xml2json;
exports.getTraversalObj = getTraversalObj;
exports.convertToJson = convertToJson;
exports.validate = require("./validator").validate;

},{"./util":2,"./validator":3}],2:[function(require,module,exports){
var getAllMatches = function(string, regex) {
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


var doesMatch = function(string,regex){
  var match = regex.exec(string);
  if(match === null || match === undefined) return false;
  else return true;
}

var doesNotMatch = function(string,regex){
  return !doesMatch(string,regex);
}

exports.doesMatch = doesMatch
exports.doesNotMatch = doesNotMatch
exports.getAllMatches = getAllMatches;
},{}],3:[function(require,module,exports){
var util = require("./util");


var tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
exports.validate = function(xmlData){
    xmlData = xmlData.replace(/\n/g,"");//make it single line
    xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
    xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE

    var tags = [];
    for (var i = 0; i < xmlData.length; i++) {

        if(xmlData[i] === "<"){//starting of tag
            //read until you reach to '>' avoiding any '>' in attribute value
            
            i++;
            
            if(xmlData[i] === "!"){
                i = readCommentAndCDATA(xmlData,i);
                continue;
            }else{
                var closingTag = false;
                if(xmlData[i] === "/"){//closing tag
                    closingTag = true;
                    i++;
                }
                //read tagname
                var tagName = "";
                for(;i < xmlData.length 
                    && xmlData[i] !== ">" 
                    && xmlData[i] !== " "
                    && xmlData[i] !== "\t" ; i++) {

                    tagName +=xmlData[i];
                }
                tagName = tagName.trim();
                //console.log(tagName);
                
                if(tagName[tagName.length-1] === "/"){//self closing tag without attributes
                    tagName = tagName.substring(0,tagName.length-2);
                    return validateTagName(tagName);
                }
                if(!validateTagName(tagName)) return false;

                
                var attrStr = "";
                var startChar = "";
                for(;i < xmlData.length ;i++){
                    if(xmlData[i] === '"' || xmlData[i] === "'"){
                        if(startChar === ""){
                            startChar = xmlData[i];
                        }else{
                            startChar = "";
                        }
                    }else if(xmlData[i] === ">"){
                        if(startChar === ""){
                            break;
                        }
                    }
                    attrStr += xmlData[i];
                }
                if(startChar !== "") return false;//Unclosed quote
                attrStr = attrStr.trim();
                //console.log(attrStr, attrStr);
                
                if(attrStr[attrStr.length-1] === "/" ){//self closing tag
                    attrStr = attrStr.substring(0,attrStr.length-2);
                    
                    if(!validateAttributeString(attrStr)){
                        return false;
                    }else{
                        
                        continue;
                    }
                }else if(closingTag){
                    if(attrStr.length > 0){
                        return false;
                        //throw new Error("XML validation error: closing tag should not have any attribute");
                    }else{
                        var otg = tags.pop();    
                        if(tagName !== otg){
                            return false;
                            //throw new Error("XML validation error: no mathicng closing tag");
                        }
                    }
                }else{
                    if(!validateAttributeString(attrStr)){
                        return false;
                    }
                    tags.push(tagName);
                }

                //skip tag text value
                //It may include comments and CDATA value
                for(i++;i < xmlData.length ; i++){
                    if(xmlData[i] === "<"){
                        if(xmlData[i+1] === "!"){//comment or CADATA
                            i++;
                            i = readCommentAndCDATA(xmlData,i);
                            continue;
                        }else{
                            break;
                        }
                    }
                }//end of reading tag text value
                if(xmlData[i] === "<") i--;
            }
        }else{
            
            if(xmlData[i] === " " || xmlData[i] === "\t") continue;
            return false;
        }
    }

    
    if(tags.length > 0){
        return false;
        //throw new Error("XML validation error");
    }
    
    return true;
}

function readCommentAndCDATA(xmlData,i){
    if(xmlData.length > i+5 && xmlData[i+1] === "-" && xmlData[i+2] === "-"){//comment
        for(i+=3;i<xmlData.length;i++){
            if(xmlData[i] === "-" && xmlData[i+1] === "-" && xmlData[i+2] === ">"){
                i+=2;
                break;
            }
        }
    }else if( xmlData.length > i+9 
        && xmlData[i+1] === "[" 
        && xmlData[i+2] === "C"
        && xmlData[i+3] === "D"
        && xmlData[i+4] === "A"
        && xmlData[i+5] === "T"
        && xmlData[i+6] === "A"
        && xmlData[i+7] === "["){

        for(i+=8;i<xmlData.length;i++){
            if(xmlData[i] === "]" && xmlData[i+1] === "]" && xmlData[i+2] === ">" ){
                i+=2;
                break;
            }
        }
    }

    return i;
}
//attr, ="sd", a="amit's", a="sd"b="saf", 
function validateAttributeString(attrStr){
    var attrNames = [];
    for(var i=0; i< attrStr.length; i++){
        var startChar = "";
        //read attribute name
        var attrName = "";
        for(;i < attrStr.length && attrStr[i] !== "=" ; i++) {
            attrName +=attrStr[i];
        }
        //validate attrName
        attrName = attrName.trim();

        
        
        if(!attrNames.hasOwnProperty(attrName)){
            attrNames[attrName]=1;
        }else{
            return false;
        }
        if(!validateAttrName(attrName)){
            return false;
        }
        i++;
        
        //skip whitespaces
        for(;i < attrStr.length 
            && (attrStr[i] === " "
            || attrStr[i] === "\t") ; i++);

        //read attribute value
        startChar = attrStr[i++];
        
        var attrVal = "";
        for(;i < attrStr.length && attrStr[i] !== startChar; i++) {
            attrVal +=attrStr[i];
        }
        
        //validate attrVal

        if(startChar !== ""){
            i++;
            if(i<attrStr.length && (attrStr[i] !== " " && attrStr[i] !== "\t") ){//when no spce between 2 attributes : a="sd"b="saf"
                return false;
            }
            startChar = "";
        }
    }

    return true;
}

var validAttrRegxp = new RegExp("^[_a-zA-Z][\\w\\-\\.\\:]*$");

function validateAttrName(attrName){
    return util.doesMatch(attrName,validAttrRegxp);
}
//var startsWithXML = new RegExp("^[Xx][Mm][Ll]");
var startsWith = new RegExp("^([a-zA-Z]|_)[\\w\.\\-_:]*");

function validateTagName(tagname){
    /*if(util.doesMatch(tagname,startsWithXML)) return false;
    else*/ if(util.doesNotMatch(tagname,startsWith)) return false;
    else return true;
}



},{"./util":2}]},{},[1])(1)
});