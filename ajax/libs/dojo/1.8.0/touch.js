/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/touch",["./_base/kernel","./_base/lang","./aspect","./dom","./on","./has","./mouse","./ready","./_base/window"],function(_1,_2,_3,_4,on,_5,_6,_7,_8){
var _9=_5("touch");
var _a,_b;
if(_9){
_7(function(){
_b=_8.body();
_8.doc.addEventListener("touchstart",function(_c){
var _d=_b;
_b=_c.target;
on.emit(_d,"dojotouchout",{target:_d,relatedTarget:_b,bubbles:true});
on.emit(_b,"dojotouchover",{target:_b,relatedTarget:_d,bubbles:true});
},true);
on(_8.doc,"touchmove",function(_e){
var _f=_8.doc.elementFromPoint(_e.pageX-_8.global.pageXOffset,_e.pageY-_8.global.pageYOffset);
if(_f&&_b!==_f){
on.emit(_b,"dojotouchout",{target:_b,relatedTarget:_f,bubbles:true});
on.emit(_f,"dojotouchover",{target:_f,relatedTarget:_b,bubbles:true});
_b=_f;
}
});
});
_a=function(_10,_11){
return on(_8.doc,"touchmove",function(evt){
if(_10===_8.doc||_4.isDescendant(_b,_10)){
_11.call(this,_2.mixin({},evt,{target:_b}));
}
});
};
}
function _12(_13){
return function(_14,_15){
return on(_14,_13,_15);
};
};
var _16={press:_12(_9?"touchstart":"mousedown"),move:_9?_a:_12("mousemove"),release:_12(_9?"touchend":"mouseup"),cancel:_9?_12("touchcancel"):_6.leave,over:_12(_9?"dojotouchover":"mouseover"),out:_12(_9?"dojotouchout":"mouseout"),enter:_6._eventHandler(_9?"dojotouchover":"mouseover"),leave:_6._eventHandler(_9?"dojotouchout":"mouseout")};
1&&(_1.touch=_16);
return _16;
});
