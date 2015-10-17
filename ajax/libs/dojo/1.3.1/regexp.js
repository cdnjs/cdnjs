/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.regexp"]){
dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(_1,_2){
return _1.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_2&&_2.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(_4,re,_6){
if(!(_4 instanceof Array)){
return re(_4);
}
var b=[];
for(var i=0;i<_4.length;i++){
b.push(re(_4[i]));
}
return dojo.regexp.group(b.join("|"),_6);
};
dojo.regexp.group=function(_9,_a){
return "("+(_a?"?:":"")+_9+")";
};
}
