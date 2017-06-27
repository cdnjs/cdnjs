var getAllMatches = function(string, regex) {
  //var regex = new RegExp(regex_str,"g");
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
  	var allmatches = [];
  	for(var i in match){
  		var submatch = match[i];
  		allmatches.push(submatch);
  	}
    matches.push(allmatches);
  }
  return matches;
}

var Node = function(tagname,parent){
    this.tagname = tagname;
    this.parent = parent;
    this.child = [];
    //this.val = "";

    this.addChild = function (child){
        this.child.push(child);
    }
}

var tagsRegx = new RegExp("<(\\/?[a-zA-Z0-9_:]+)","g");
//var tagsRegx = new RegExp("<(\\/?[^\S<>]+)","g");
var valsRegx = new RegExp(">([^<]+)<","g");


exports.parse = function (xmlData){
    xmlData = xmlData.replace(/>(\s+)/g, "");//Remove spaces and make it single line.
    var tags = getAllMatches(xmlData,tagsRegx);
    var values = getAllMatches(xmlData,valsRegx);
    // for (var j = 0; j < values.length; j++) {
    //     console.log(values[j][1]);
    // }
    var rootNode = new Node(tags[0][1]);
    var currentNode = rootNode;
    for (var i = 1,j=0; i < tags.length -1 ; i++) {
        var tag = tags[i][1];
        var nexttag = tags[i+1][1];
        
        if( ("/" + tag) === nexttag){ //leaf node
            var val;
            if(values[j]){
                val = values[j++][1];
                if(isNaN(val)){
                    val = "" + val ;
                }
            }
            var childNode = new Node(tag,currentNode);
            childNode.val = val;
            currentNode.addChild(childNode);
            i++;
        }else if(tag.indexOf("/") === 0){
            currentNode = currentNode.parent;
            continue;
        }else{
            var childNode = new Node(tag,currentNode);
            currentNode.addChild(childNode);
            currentNode = childNode;
        }
    }

    return convertToJson(rootNode);
}

function convertToJson(node){
    var jObj = {};
    if(node.val) {
        //jObj[node.tagname] = node.val;
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