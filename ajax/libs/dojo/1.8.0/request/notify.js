/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/request/notify",["../Evented","../_base/lang","./util"],function(_1,_2,_3){
var _4=0;
var _5=_2.mixin(new _1,{onsend:function(_6){
if(!_4){
this.emit("start");
}
_4++;
},_onload:function(_7){
this.emit("done",_7);
},_onerror:function(_8){
this.emit("done",_8);
},_ondone:function(_9){
if(--_4<=0){
_4=0;
this.emit("stop");
}
},emit:function(_a,_b){
var _c=_1.prototype.emit.apply(this,arguments);
if(this["_on"+_a]){
this["_on"+_a].apply(this,arguments);
}
return _c;
}});
function _d(_e,_f){
return _5.on(_e,_f);
};
_d.emit=function(_10,_11,_12){
return _5.emit(_10,_11,_12);
};
return _3.notify=_d;
});
