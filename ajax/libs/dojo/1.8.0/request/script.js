/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/request/script",["module","./watch","./util","../_base/array","../_base/lang","../on","../dom","../dom-construct","../has","../_base/window"],function(_1,_2,_3,_4,_5,on,_6,_7,_8,_9){
_8.add("script-readystatechange",function(_a,_b){
var _c=_b.createElement("script");
return typeof _c["onreadystatechange"]!=="undefined"&&(typeof _a["opera"]==="undefined"||_a["opera"].toString()!=="[object Opera]");
});
var _d=_1.id.replace(/[\/\.\-]/g,"_"),_e=0,_f=_8("script-readystatechange")?"readystatechange":"load",_10=/complete|loaded/,_11=this[_d+"_callbacks"]={},_12=[];
function _13(id,url,_14){
var doc=(_14||_9.doc),_15=doc.createElement("script");
_15.type="text/javascript";
_15.src=url;
_15.id=id;
_15.async=true;
_15.charset="utf-8";
return doc.getElementsByTagName("head")[0].appendChild(_15);
};
function _16(id,_17,_18){
_7.destroy(_6.byId(id,_17));
if(_11[id]){
if(_18){
_11[id]=function(){
delete _11[id];
};
}else{
delete _11[id];
}
}
};
function _19(dfd){
var _1a=dfd.response;
_12.push({id:dfd.id,frameDoc:_1a.options.frameDoc});
_1a.options.frameDoc=null;
};
function _1b(dfd,_1c){
if(dfd.canDelete){
_1d._remove(dfd.id,_1c.options.frameDoc,true);
}
};
function _1e(_1f){
if(_12&&_12.length){
_4.forEach(_12,function(_20){
_1d._remove(_20.id,_20.frameDoc);
_20.frameDoc=null;
});
_12=[];
}
return _1f.options.jsonp?!_1f.data:true;
};
function _21(_22){
return !!this.scriptLoaded;
};
function _23(_24){
var _25=_24.options.checkString;
return _25&&eval("typeof("+_25+") !== \"undefined\"");
};
function _26(_27,_28){
if(this.canDelete){
_19(this);
}
if(_28){
this.reject(_28);
}else{
this.resolve(_27);
}
};
function _1d(url,_29,_2a){
var _2b=_3.parseArgs(url,_3.deepCopy({},_29));
url=_2b.url;
_29=_2b.options;
var dfd=_3.deferred(_2b,_1b,_1e,_29.jsonp?null:(_29.checkString?_23:_21),_26);
_5.mixin(dfd,{id:_d+(_e++),canDelete:false});
if(_29.jsonp){
var _2c=(~url.indexOf("?")?"&":"?")+_29.jsonp+"=";
if(url.indexOf(_2c)===-1){
url+=_2c+(_29.frameDoc?"parent.":"")+_d+"_callbacks."+dfd.id;
}
dfd.canDelete=true;
_11[dfd.id]=function(_2d){
_2b.data=_2d;
dfd.handleResponse(_2b);
};
}
if(_3.notify){
_3.notify.emit("send",_2b,dfd.promise.cancel);
}
if(!_29.canAttach||_29.canAttach(dfd)){
var _2e=_1d._attach(dfd.id,url,_29.frameDoc);
if(!_29.jsonp&&!_29.checkString){
var _2f=on(_2e,_f,function(evt){
if(evt.type==="load"||_10.test(_2e.readyState)){
_2f.remove();
dfd.scriptLoaded=evt;
}
});
}
}
_2(dfd);
return _2a?dfd:dfd.promise;
};
_1d.get=_1d;
_1d._attach=_13;
_1d._remove=_16;
_1d._callbacksProperty=_d+"_callbacks";
return _1d;
});
