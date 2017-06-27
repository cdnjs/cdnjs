/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.robot"]){
dojo._hasResource["dojo.robot"]=true;
dojo.provide("dojo.robot");
dojo.experimental("dojo.robot");
dojo.require("doh.robot");
(function(){
dojo.mixin(doh.robot,{_scrollIntoView:function(_1){
if(typeof _1=="function"){
_1=_1();
}
_1.scrollIntoView(false);
},scrollIntoView:function(_2,_3){
doh.robot.sequence(function(){
doh.robot._scrollIntoView(_2);
},_3);
},mouseMoveAt:function(_4,_5,_6,_7,_8){
doh.robot._assertRobot();
_6=_6||100;
this.sequence(function(){
if(typeof _4=="function"){
_4=_4();
}
if(!_4){
return;
}
_4=dojo.byId(_4);
if(_8===undefined){
var _9=dojo.contentBox(_4);
_7=_9.w/2;
_8=_9.h/2;
}
var x=_7;
var y=_8;
doh.robot._scrollIntoView(_4);
var c=dojo.coords(_4);
x+=c.x;
y+=c.y;
doh.robot._mouseMove(x,y,false,_6);
},_5,_6);
}});
})();
}
