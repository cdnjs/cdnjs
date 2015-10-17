/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/hccss",["require","./_base/config","./dom-class","./dom-construct","./dom-style","./has","./ready","./_base/window"],function(_1,_2,_3,_4,_5,_6,_7,_8){
_6.add("highcontrast",function(){
var _9=_8.doc.createElement("div");
_9.style.cssText="border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;"+"background-image: url("+(_2.blankGif||_1.toUrl("./resources/blank.gif"))+");";
_8.body().appendChild(_9);
var cs=_5.getComputedStyle(_9),_a=cs.backgroundImage,hc=(cs.borderTopColor==cs.borderRightColor)||(_a&&(_a=="none"||_a=="url(invalid-url:)"));
_4.destroy(_9);
return hc;
});
_7(90,function(){
if(_6("highcontrast")){
_3.add(_8.body(),"dj_a11y");
}
});
return _6;
});
