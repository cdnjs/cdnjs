/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/on/asyncEventListener",["../on","../_base/window","../dom-construct","../domReady!"],function(on,_1,_2){
var _3=_2.create("div",null,_1.body()),_4,_5;
on.once(_3,"click",function(e){
_4=e;
});
_3.click();
try{
_5=_4.clientX===undefined;
}
catch(e){
_5=true;
}
finally{
_2.destroy(_3);
}
function _6(_7){
var _8={},i;
for(i in _7){
_8[i]=_7[i];
}
return _8;
};
return function(_9){
if(_5){
return function(e){
_9.call(this,_6(e));
};
}
return _9;
};
});
