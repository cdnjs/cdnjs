/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/touch",["./_base/kernel","./_base/lang","./aspect","./dom","./on","./has","./mouse","./ready","./_base/window"],function(_1,_2,_3,_4,on,_5,_6,_7,_8){
var _9=_5("touch");
var _a=false;
if(_5("ios")){
var ua=navigator.userAgent;
var v=ua.match(/OS ([\d_]+)/)?RegExp.$1:"1";
var os=parseFloat(v.replace(/_/,".").replace(/_/g,""));
_a=os<5;
}
var _b,_c;
if(_9){
_7(function(){
_c=_8.body();
_8.doc.addEventListener("touchstart",function(_d){
var _e=_c;
_c=_d.target;
on.emit(_e,"dojotouchout",{target:_e,relatedTarget:_c,bubbles:true});
on.emit(_c,"dojotouchover",{target:_c,relatedTarget:_e,bubbles:true});
},true);
on(_8.doc,"touchmove",function(_f){
var _10=_8.doc.elementFromPoint(_f.pageX-(_a?0:_8.global.pageXOffset),_f.pageY-(_a?0:_8.global.pageYOffset));
if(_10&&_c!==_10){
on.emit(_c,"dojotouchout",{target:_c,relatedTarget:_10,bubbles:true});
on.emit(_10,"dojotouchover",{target:_10,relatedTarget:_c,bubbles:true});
_c=_10;
}
});
});
_b=function(_11,_12){
return on(_8.doc,"touchmove",function(evt){
if(_11===_8.doc||_4.isDescendant(_c,_11)){
_12.call(this,_2.mixin({},evt,{target:_c,touches:evt.touches,preventDefault:function(){
evt.preventDefault();
},stopPropagation:function(){
evt.stopPropagation();
}}));
}
});
};
}
function _13(_14){
return function(_15,_16){
return on(_15,_14,_16);
};
};
var _17={press:_13(_9?"touchstart":"mousedown"),move:_9?_b:_13("mousemove"),release:_13(_9?"touchend":"mouseup"),cancel:_9?_13("touchcancel"):_6.leave,over:_13(_9?"dojotouchover":"mouseover"),out:_13(_9?"dojotouchout":"mouseout"),enter:_6._eventHandler(_9?"dojotouchover":"mouseover"),leave:_6._eventHandler(_9?"dojotouchout":"mouseout")};
1&&(_1.touch=_17);
return _17;
});
