/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/touch",["./_base/kernel","./aspect","./dom","./on","./has","./mouse","./ready","./_base/window"],function(_1,_2,_3,on,_4,_5,_6,_7){
var _8=_4("touch");
var _9=false;
if(_4("ios")){
var ua=navigator.userAgent;
var v=ua.match(/OS ([\d_]+)/)?RegExp.$1:"1";
var os=parseFloat(v.replace(/_/,".").replace(/_/g,""));
_9=os<5;
}
var _a,_b;
if(_8){
_6(function(){
_b=_7.body();
_7.doc.addEventListener("touchstart",function(_c){
var _d=_b;
_b=_c.target;
on.emit(_d,"dojotouchout",{target:_d,relatedTarget:_b,bubbles:true});
on.emit(_b,"dojotouchover",{target:_b,relatedTarget:_d,bubbles:true});
},true);
on(_7.doc,"touchmove",function(_e){
var _f=_7.doc.elementFromPoint(_e.pageX-(_9?0:_7.global.pageXOffset),_e.pageY-(_9?0:_7.global.pageYOffset));
if(_f&&_b!==_f){
on.emit(_b,"dojotouchout",{target:_b,relatedTarget:_f,bubbles:true});
on.emit(_f,"dojotouchover",{target:_f,relatedTarget:_b,bubbles:true});
_b=_f;
}
});
});
_a=function(_10,_11){
return on(_7.doc,"touchmove",function(evt){
if(_10===_7.doc||_3.isDescendant(_b,_10)){
evt.target=_b;
_11.call(this,evt);
}
});
};
}
function _12(_13){
return function(_14,_15){
return on(_14,_13,_15);
};
};
var _16={press:_12(_8?"touchstart":"mousedown"),move:_8?_a:_12("mousemove"),release:_12(_8?"touchend":"mouseup"),cancel:_8?_12("touchcancel"):_5.leave,over:_12(_8?"dojotouchover":"mouseover"),out:_12(_8?"dojotouchout":"mouseout"),enter:_5._eventHandler(_8?"dojotouchover":"mouseover"),leave:_5._eventHandler(_8?"dojotouchout":"mouseout")};
1&&(_1.touch=_16);
return _16;
});
