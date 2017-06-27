/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_base/config",["../has","require"],function(_1,_2){
var _3={};
if(1){
var _4=_2.rawConfig,p;
for(p in _4){
_3[p]=_4[p];
}
}else{
var _5=(function(){
return this;
})();
var _6=function(_7,_8,_9){
for(p in _7){
p!="has"&&_1.add(_8+p,_7[p],0,_9);
}
};
_3=1?_2.rawConfig:_5.dojoConfig||_5.djConfig||{};
_6(_3,"config",1);
_6(_3.has,"",1);
}
return _3;
});
