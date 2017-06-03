/*

  objx core library
  Copyright (c) 2009 - 2010  Mat Ryer
  v2.3.2
  
  Contributors:
    Mat Ryer, Edd Grant, Simon Howard
  
  
  http://objx.googlecode.com/

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  
*/
var
objx=function(o){if(o&&o._objx){return o;}
return new objx.fn.init(o);},ODebug=true,OAlwaysRememberBoundSource=false,OVersion="2.3.2",ONew="ONew",OReplace="OReplace",OUnwrap="OUnwrap",OOriginal="OOriginal",OPlugins={};var OConsole=function(o){if(typeof console!=="undefined"){if(console){console.warn(" ");objx(OArray(o)).each(function(obj){if(typeof obj==="string"){console.info("objx: "+obj);}else{console.info(obj);}});}}};var OArgArray=function(args){var a=[];a.push.apply(a,args);return a;};var OTrimOffFirstArg=function(args){var a=OArgArray(args);a.splice(0,1);return a;};var OError=function(){var
tag=arguments.length>1?arguments[0]:"Error",message=arguments[arguments.length-1];throw tag+": "+message;};var OType=function(o){var kind;if(o!==null&&typeof o!=="undefined"){kind=typeof o;if(kind==="object"){if(typeof o.length!=="undefined"){kind="array";}else if(o._objx){kind="objx";}}}else{kind="null";}
return kind;};var OExtend=function(){if(ODebug){if(arguments.length<2){OError("OExtend","Must provide at least two arguments when using OExtend(). See http://code.google.com/p/objx/wiki/extend");}}
var i,property;for(i=1;i<arguments.length;i++){for(property in arguments[i]){if(arguments[i].hasOwnProperty(property)){arguments[0][property]=arguments[i][property];}}}
return arguments[0];};var ORequires=function(plugin,source){if(!OPlugins[plugin]){var byText=source?"by \""+source+"\" ":"";OError("requires","Plugin \""+plugin+"\" is required "+byText+"but missing. Are you missing a <script /> tag?  Have you got your <script /> tags in the wrong order?");}
return this;};var OProvides=function(plugin){if(OPlugins[plugin]){OError("provides","A plugin called \""+plugin+"\" has already been provided. Have you duplicated a <script /> tag?");}
OPlugins[plugin]=true;};var OProvided=function(plugin){return OPlugins[plugin]||false;};objx.fn=objx.prototype={_objx:true,_obj:null,init:function(obj){this.obj(obj);this.kind=OType(obj);},extend:function(){var args=[],i=0;args.push(this._obj);for(;i<arguments.length;i++){args.push(arguments[i]);}
OExtend.apply(objx,args);return this;},obj:function(){if(arguments.length===0){return this._obj;}else{this._obj=arguments[0];this.kind=OType(this._obj);}
return this;},size:function(){if(this.kind!=="number"&&typeof this._obj.length==="undefined"){OError("size","Cannot get the size of "+this.kind+"s.");}
return this._obj.length||this._obj;},toString:function(){var
type=this.kind,val=this._obj.toString();switch(type){case"string":val='"'+val+'"';break;case"function":val=" ... ";break;case"array":var size=this.size();if(size===0){val="0";}else{val=" 0.."+(size-1)+" ";}
break;}
return"objx:("+type+"("+val+"))";},requires:function(){for(var i=0,l=arguments.length;i<l;i++){ORequires(arguments[i],this.obj());}
return this;}};objx.fn.init.prototype=objx.fn;var OIsObjx=function(o){if(o&&o._objx){return true;}
return false;};var OBind=function(){var
_func=arguments[0]||null,_obj=arguments[1]||this,_args=[],i=2,l=arguments.length,bound;for(;i<l;i++){_args.push(arguments[i]);}
bound=function(){var theArgs=[];var i=0;for(i=0,l=_args.length;i<l;i++){theArgs.push(_args[i]);}
for(i=0,l=arguments.length;i<l;i++){theArgs.push(arguments[i]);}
return _func.apply(_obj,theArgs);};if(ODebug||OAlwaysRememberBoundSource){bound.func=_func;bound.context=_obj;bound.args=_args;}
return bound;};Function.prototype.bind=function(){var theArgs=[],i=0,l=arguments.length;theArgs.push(this);for(;i<l;i++){theArgs.push(arguments[i]);}
return OBind.apply(window,theArgs);};var OAction=function(name,options){var _options=options,_name=name;if(options.requires){objx(OArray(options.requires)).each(function(plugin){ORequires(plugin,"OAction(\""+name+"\")");});}
objx.fn[name]=function(){var
actor,argX=arguments[arguments.length-1],args=OArgArray(arguments),result;if(args.length>0&&(argX instanceof Function||argX===OOriginal||argX===ONew||argX===OReplace||argX===OUnwrap)){args.pop();}
if(_options.collective){result=[];var sArgs=[null,null].concat(args);this.each(function(o,i){actor=_options[OType(o)]||_options.all||OError("."+_name+"() does not support "+OType(o)+"s.  Are you working with the wrong type?  Check objx(o).kind to be sure.");sArgs[0]=o;sArgs[1]=i;result.push(actor.apply(this,sArgs));});}else{actor=_options[this.kind]||_options.all||OError("."+_name+"() does not support "+this.kind+"s.  Are you working with the wrong type?  Check objx(o).kind to be sure.");result=actor.apply(this,args);}
if(argX instanceof Function){argX.apply(this,[result]);return this;}else{var action=_options.action||OUnwrap,userAction;if(argX===ONew||argX===OReplace||argX===OUnwrap||argX===OOriginal){userAction=action=argX;}
if(typeof result=="undefined"){if(userAction===OUnwrap){result=this.obj();}else{result=this;}}
switch(action){case OOriginal:return this;case ONew:return objx(result);case OReplace:return this.obj(result);default:return result;}}};};var OGet=function(obj,prop){var result;var inputType;if(typeof obj=="string"&&typeof prop!="function"){obj=obj.split("");inputType="string";}
switch(typeof prop){case"function":return prop.apply(this,[obj]);case"number":if(typeof obj==="string"){result=obj.substr(OIndex(prop,obj.length),1);}else{result=obj[OIndex(prop,obj.length)];}
break;case"string":var dotPos=prop.toString().indexOf(".");if(dotPos==-1){result=obj[prop];}
else{result=OGet(obj[prop.substring(0,dotPos)],prop.substring(dotPos+1));}
break;case"object":if(prop.length){selectedRange=[];var startIndex=OIndex(prop[0],obj.length);var endIndex=OIndex(prop[1],obj.length);if(startIndex<=endIndex){for(i=startIndex;i<=endIndex;i++){selectedRange.push(obj[i]);}}
else{for(i=startIndex;i>=endIndex;i--){selectedRange.push(obj[i]);}}
result=selectedRange;}
break;}
if(inputType=="string"&&typeof prop!="function"){var resultString="";objx(result).each(function(item,index){resultString+=item});result=resultString;}
return result;};OAction("get",{action:OUnwrap,all:function(what){return OGet(this._obj,what);}});var OCheck=function(o,c){var prop,val,oval,comp,comps=OCheck.comparers,passed=true;if(c instanceof Function){if(!c(o)){passed=false;}}else if(c instanceof Object){for(prop in c){if(c.hasOwnProperty(prop)){var dealt=false;for(comp in comps){if(prop==comp){dealt=true;if(!comps[comp](o,c[prop])){passed=false;}}}
if(!dealt){oval=OGet(o,prop);if(typeof oval!=="undefined"){dealt=true;val=c[prop];switch(OType(val)){case"object":if(!OCheck(oval,val)){passed=false;}
break;case"array":var orPassed=false;objx(val).each(function(orVal){if(OCheck(oval,orVal)){orPassed=true;return false;}});if(!orPassed){passed=false;}
break;case"function":if(!val(oval,o)){passed=false;}
break;default:if(!OCheck.comparers.eq(oval,val)){passed=false;}}}}
if(!dealt){OError("OCheck","Unknown comparer token \""+prop+"\".  It's not in OCheck.comparers nor is it a field name in the object being checked.  Are you calling this before including the right <script /> tag?  Have you mispelled the field name?");}}}}else{if(!OCheck.comparers.eq(o,c)){passed=false;}}
return passed;};OCheck.comparers={eq:function(o,c){return o==c;},eqs:function(o,c){return o===c;},gt:function(o,c){return o>c;},eqgt:function(o,c){return o>=c;},lt:function(o,c){return o<c;},eqlt:function(o,c){return o<=c;},isType:function(o,c){return typeof o===c;}};OCheck.comparers.above=OCheck.comparers.gt;OCheck.comparers.below=OCheck.comparers.lt;OCheck.comparers.is=OCheck.comparers.eq;OAction("check",{all:function(c){return OCheck(this.obj(),c);}});var OIndex=function(i,l){return(i>-1)?i:(l+(i));};var OIndexRange=function(s,e,len){var range={};range.start=OIndex(s,len);if(e){range.end=OIndex(e,len);}else if(s<0){range.end=len-1;}else{range.end=range.start;}
if(s&&e){s=Math.min(range.start,range.end);e=Math.max(range.start,range.end);range.start=s;range.end=e;}
return range;};var OArray=function(o){if(OType(o)!="array"){return[o];}else{return o;}};objx.toString=function(){return"{objx engine}";};objx.fn.each=function(){if(ODebug){if(!arguments[0]){OError("each","You must pass a function as the first argument to 'each'.");}}
var obj=this.obj(),i=0,e;if(arguments[1]===true){switch(this.kind){case"string":i=this.size();for(;i--;){if(arguments[0].apply(this,[obj.charAt(i),i])===false){break;}}
break;case"number":i=this.size();if(i>0){for(;i--;){if(arguments[0].apply(this,[i+1,i])===false){break;}}}else{e=-1;for(;i<=e;e--){if(arguments[0].apply(this,[e,0-e-1])===false){break;}}}
break;case"array":i=this.size();for(;i--;){if(arguments[0].apply(this,[obj[i],i])===false){break;}}
break;default:for(var prop in obj){if(arguments[0].apply(this,[obj[prop],prop])===false){break;}}}}else{switch(this.kind){case"string":e=this.size();for(;i<e;i++){if(arguments[0].apply(this,[obj.charAt(i),i])===false){break;}}
break;case"number":e=this.size();if(e>0){for(;i<e;i++){if(arguments[0].apply(this,[i+1,i])===false){break;}}}else{i=e;for(;i++;){if(arguments[0].apply(this,[i-1,i-e-1])===false){break;}}}
break;case"array":e=this.size();for(;i<e;i++){if(arguments[0].apply(this,[obj[i],i])===false){break;}}
break;default:for(var prop in obj){if(arguments[0].apply(this,[obj[prop],prop])===false){break;}}}}
return this;};