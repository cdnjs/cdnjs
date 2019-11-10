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
var tagsRegx = new RegExp("<(\\/?[\\w:-]+)([^>]*)>([^<]+)?","g");

var defaultOptions = {
		attrPrefix : "@_",
        textNodeName : "#text",
		ignoreNonTextNodeAttr : true,
        ignoreTextNodeAttr : true,
		ignoreNameSpace : true,
		ignoreRootElement : false
	};

var buildOptions = function (options){
    if(!options) options = {};
    var props = ["attrPrefix","ignoreNonTextNodeAttr","ignoreTextNodeAttr","ignoreNameSpace","ignoreRootElement","textNodeName"];
    for (var i = 0; i < props.length; i++) {
        if(options[props[i]] === undefined){
            options[props[i]] = defaultOptions[props[i]];
        }
    }
    return options;
};

var xml2json = function (xmlData,options){
    options = buildOptions(options);
    xmlData = xmlData.replace(/>(\s+)/g, ">");//Remove spaces and make it single line.
    var tags = getAllMatches(xmlData,tagsRegx);
    var xmlObj = new xmlNode('_xml');
    var currentNode = xmlObj;

    for (var i = 0; i < tags.length -1 ; i++) {
        var tag = tags[i][1], attrsStr = tags[i][2], val = tags[i][3], nexttag = tags[i+1][1], attrs;

        if(tag.indexOf("/") === 0){//ending tag
            currentNode = currentNode.parent;
            continue;
        }

        var selfClosingTag = attrsStr.charAt(attrsStr.length-1) === '/';
        var childNode = new xmlNode(tag,currentNode);
        
        if(selfClosingTag){
            attrs = buildAttributesArr(attrsStr,options.ignoreTextNodeAttr,options.attrPrefix);
            childNode.val = attrs || "";
            currentNode.addChild(childNode);
        }else if( ("/" + tag) === nexttag){ //Text node
            attrs = buildAttributesArr(attrsStr,options.ignoreTextNodeAttr,options.attrPrefix);
            val = parseValue(val);
            if(attrs){
                attrs[options.textNodeName] = val;
                childNode.val = attrs;
            }else{
                childNode.val = val || "";
            }
            currentNode.addChild(childNode);
            i++;
        }else{//starting tag
            attrs = buildAttributesArr(attrsStr,options.ignoreNonTextNodeAttr,options.attrPrefix);
            if(attrs){
                for (var prop in attrs) {
                  attrs.hasOwnProperty(prop) && childNode.addChild(new xmlNode(prop,childNode,attrs[prop]));
                }
            }
            currentNode.addChild(childNode);
            currentNode = childNode;
        }
    }
    return convertToJson(xmlObj);
};

function parseValue(val){
    if(val){
        if(isNaN(val)){
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
function buildAttributesArr(attrStr,ignore,prefix){
    attrStr = attrStr || attrStr.trim();
    if(!ignore && attrStr.length > 3){
        var matches = getAllMatches(attrStr,attrsRegx);
        var attrs = {};
        for (var i = 0; i < matches.length; i++) {
            attrs[prefix + matches[i][1]] = matches[i][2];
        }
        return attrs;
    }
}

function convertToJson(node){
    var jObj = {};
    if(node.val || node.val === "") {
        return node.val;
    }else{
        for (var index = 0; index < node.child.length; index++) {
            var prop = node.child[index].tagname;
            var obj = convertToJson(node.child[index]);
            if(jObj[prop]){
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
}

if(typeof exports === "undefined"){
    exports = this;
}

exports.parse = xml2json;