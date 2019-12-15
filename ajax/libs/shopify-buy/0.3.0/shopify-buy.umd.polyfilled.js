/**
* The MIT License (MIT)
* 
* Copyright (c) 2016 Shopify Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
* OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
* CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
* TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
* SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
* 
* Version: 0.2.2 Commit: 48a1ad7
**/(function(global,factory){if(typeof define==="function"&&define.amd){define('shopify-buy',['module'],factory);}else if(typeof exports!=="undefined"){factory(module);}else{var mod={exports:{}};factory(mod);global.ShopifyBuy=mod.exports;}})(this,function(module){'use strict';function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2;}else{return Array.from(arr);}}var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};function interopDefault(ex){return ex&&(typeof ex==='undefined'?'undefined':_typeof(ex))==='object'&&'default'in ex?ex['default']:ex;}function createCommonjsModule(fn,module){return module={exports:{}},fn(module,module.exports),module.exports;}var _cof=createCommonjsModule(function(module){var toString={}.toString;module.exports=function(it){return toString.call(it).slice(8,-1);};});var _cof$1=interopDefault(_cof);var require$$0=Object.freeze({default:_cof$1});var _global=createCommonjsModule(function(module){// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global=module.exports=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();if(typeof __g=='number')__g=global;// eslint-disable-line no-undef
});var _global$1=interopDefault(_global);var require$$3$1=Object.freeze({default:_global$1});var _shared=createCommonjsModule(function(module){var global=interopDefault(require$$3$1),SHARED='__core-js_shared__',store=global[SHARED]||(global[SHARED]={});module.exports=function(key){return store[key]||(store[key]={});};});var _shared$1=interopDefault(_shared);var require$$1=Object.freeze({default:_shared$1});var _uid=createCommonjsModule(function(module){var id=0,px=Math.random();module.exports=function(key){return'Symbol('.concat(key===undefined?'':key,')_',(++id+px).toString(36));};});var _uid$1=interopDefault(_uid);var require$$0$2=Object.freeze({default:_uid$1});var _wks=createCommonjsModule(function(module){var store=interopDefault(require$$1)('wks'),uid=interopDefault(require$$0$2),_Symbol=interopDefault(require$$3$1).Symbol,USE_SYMBOL=typeof _Symbol=='function';var $exports=module.exports=function(name){return store[name]||(store[name]=USE_SYMBOL&&_Symbol[name]||(USE_SYMBOL?_Symbol:uid)('Symbol.'+name));};$exports.store=store;});var _wks$1=interopDefault(_wks);var require$$0$1=Object.freeze({default:_wks$1});var _classof=createCommonjsModule(function(module){// getting tag from 19.1.3.6 Object.prototype.toString()
var cof=interopDefault(require$$0),TAG=interopDefault(require$$0$1)('toStringTag')// ES3 wrong here
,ARG=cof(function(){return arguments;}())=='Arguments';// fallback for IE11 Script Access Denied error
var tryGet=function tryGet(it,key){try{return it[key];}catch(e){/* empty */}};module.exports=function(it){var O,T,B;return it===undefined?'Undefined':it===null?'Null'// @@toStringTag case
:typeof(T=tryGet(O=Object(it),TAG))=='string'?T// builtinTag case
:ARG?cof(O)// ES3 arguments fallback
:(B=cof(O))=='Object'&&typeof O.callee=='function'?'Arguments':B;};});var _classof$1=interopDefault(_classof);var require$$3=Object.freeze({default:_classof$1});var _isObject=createCommonjsModule(function(module){module.exports=function(it){return(typeof it==='undefined'?'undefined':_typeof(it))==='object'?it!==null:typeof it==='function';};});var _isObject$1=interopDefault(_isObject);var require$$12=Object.freeze({default:_isObject$1});var _anObject=createCommonjsModule(function(module){var isObject=interopDefault(require$$12);module.exports=function(it){if(!isObject(it))throw TypeError(it+' is not an object!');return it;};});var _anObject$1=interopDefault(_anObject);var require$$2$1=Object.freeze({default:_anObject$1});var _fails=createCommonjsModule(function(module){module.exports=function(exec){try{return!!exec();}catch(e){return true;}};});var _fails$1=interopDefault(_fails);var require$$0$5=Object.freeze({default:_fails$1});var _descriptors=createCommonjsModule(function(module){// Thank's IE8 for his funny defineProperty
module.exports=!interopDefault(require$$0$5)(function(){return Object.defineProperty({},'a',{get:function get(){return 7;}}).a!=7;});});var _descriptors$1=interopDefault(_descriptors);var require$$1$1=Object.freeze({default:_descriptors$1});var _domCreate=createCommonjsModule(function(module){var isObject=interopDefault(require$$12),document=interopDefault(require$$3$1).document// in old IE typeof document.createElement is 'object'
,is=isObject(document)&&isObject(document.createElement);module.exports=function(it){return is?document.createElement(it):{};};});var _domCreate$1=interopDefault(_domCreate);var require$$2$3=Object.freeze({default:_domCreate$1});var _ie8DomDefine=createCommonjsModule(function(module){module.exports=!interopDefault(require$$1$1)&&!interopDefault(require$$0$5)(function(){return Object.defineProperty(interopDefault(require$$2$3)('div'),'a',{get:function get(){return 7;}}).a!=7;});});var _ie8DomDefine$1=interopDefault(_ie8DomDefine);var require$$2$2=Object.freeze({default:_ie8DomDefine$1});var _toPrimitive=createCommonjsModule(function(module){// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject=interopDefault(require$$12);// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports=function(it,S){if(!isObject(it))return it;var fn,val;if(S&&typeof(fn=it.toString)=='function'&&!isObject(val=fn.call(it)))return val;if(typeof(fn=it.valueOf)=='function'&&!isObject(val=fn.call(it)))return val;if(!S&&typeof(fn=it.toString)=='function'&&!isObject(val=fn.call(it)))return val;throw TypeError("Can't convert object to primitive value");};});var _toPrimitive$1=interopDefault(_toPrimitive);var require$$1$2=Object.freeze({default:_toPrimitive$1});var _objectDp=createCommonjsModule(function(module,exports){var anObject=interopDefault(require$$2$1),IE8_DOM_DEFINE=interopDefault(require$$2$2),toPrimitive=interopDefault(require$$1$2),dP=Object.defineProperty;exports.f=interopDefault(require$$1$1)?Object.defineProperty:function defineProperty(O,P,Attributes){anObject(O);P=toPrimitive(P,true);anObject(Attributes);if(IE8_DOM_DEFINE)try{return dP(O,P,Attributes);}catch(e){/* empty */}if('get'in Attributes||'set'in Attributes)throw TypeError('Accessors not supported!');if('value'in Attributes)O[P]=Attributes.value;return O;};});var _objectDp$1=interopDefault(_objectDp);var f=_objectDp.f;var require$$2=Object.freeze({default:_objectDp$1,f:f});var _propertyDesc=createCommonjsModule(function(module){module.exports=function(bitmap,value){return{enumerable:!(bitmap&1),configurable:!(bitmap&2),writable:!(bitmap&4),value:value};};});var _propertyDesc$1=interopDefault(_propertyDesc);var require$$3$2=Object.freeze({default:_propertyDesc$1});var _hide=createCommonjsModule(function(module){var dP=interopDefault(require$$2),createDesc=interopDefault(require$$3$2);module.exports=interopDefault(require$$1$1)?function(object,key,value){return dP.f(object,key,createDesc(1,value));}:function(object,key,value){object[key]=value;return object;};});var _hide$1=interopDefault(_hide);var require$$0$4=Object.freeze({default:_hide$1});var _has=createCommonjsModule(function(module){var hasOwnProperty={}.hasOwnProperty;module.exports=function(it,key){return hasOwnProperty.call(it,key);};});var _has$1=interopDefault(_has);var require$$2$4=Object.freeze({default:_has$1});var _core=createCommonjsModule(function(module){var core=module.exports={version:'2.4.0'};if(typeof __e=='number')__e=core;// eslint-disable-line no-undef
});var _core$1=interopDefault(_core);var version=_core.version;var require$$0$6=Object.freeze({default:_core$1,version:version});var _redefine=createCommonjsModule(function(module){var global=interopDefault(require$$3$1),hide=interopDefault(require$$0$4),has=interopDefault(require$$2$4),SRC=interopDefault(require$$0$2)('src'),TO_STRING='toString',$toString=Function[TO_STRING],TPL=(''+$toString).split(TO_STRING);interopDefault(require$$0$6).inspectSource=function(it){return $toString.call(it);};(module.exports=function(O,key,val,safe){var isFunction=typeof val=='function';if(isFunction)has(val,'name')||hide(val,'name',key);if(O[key]===val)return;if(isFunction)has(val,SRC)||hide(val,SRC,O[key]?''+O[key]:TPL.join(String(key)));if(O===global){O[key]=val;}else{if(!safe){delete O[key];hide(O,key,val);}else{if(O[key])O[key]=val;else hide(O,key,val);}}// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype,TO_STRING,function toString(){return typeof this=='function'&&this[SRC]||$toString.call(this);});});var _redefine$1=interopDefault(_redefine);var require$$0$3=Object.freeze({default:_redefine$1});var es6_object_toString=createCommonjsModule(function(module){'use strict';// 19.1.3.6 Object.prototype.toString()
var classof=interopDefault(require$$3),test={};test[interopDefault(require$$0$1)('toStringTag')]='z';if(test+''!='[object z]'){interopDefault(require$$0$3)(Object.prototype,'toString',function toString(){return'[object '+classof(this)+']';},true);}});interopDefault(es6_object_toString);var _toInteger=createCommonjsModule(function(module){// 7.1.4 ToInteger
var ceil=Math.ceil,floor=Math.floor;module.exports=function(it){return isNaN(it=+it)?0:(it>0?floor:ceil)(it);};});var _toInteger$1=interopDefault(_toInteger);var require$$0$7=Object.freeze({default:_toInteger$1});var _defined=createCommonjsModule(function(module){// 7.2.1 RequireObjectCoercible(argument)
module.exports=function(it){if(it==undefined)throw TypeError("Can't call method on  "+it);return it;};});var _defined$1=interopDefault(_defined);var require$$0$8=Object.freeze({default:_defined$1});var _stringAt=createCommonjsModule(function(module){var toInteger=interopDefault(require$$0$7),defined=interopDefault(require$$0$8);// true  -> String#at
// false -> String#codePointAt
module.exports=function(TO_STRING){return function(that,pos){var s=String(defined(that)),i=toInteger(pos),l=s.length,a,b;if(i<0||i>=l)return TO_STRING?'':undefined;a=s.charCodeAt(i);return a<0xd800||a>0xdbff||i+1===l||(b=s.charCodeAt(i+1))<0xdc00||b>0xdfff?TO_STRING?s.charAt(i):a:TO_STRING?s.slice(i,i+2):(a-0xd800<<10)+(b-0xdc00)+0x10000;};};});var _stringAt$1=interopDefault(_stringAt);var require$$1$3=Object.freeze({default:_stringAt$1});var _library=createCommonjsModule(function(module){module.exports=false;});var _library$1=interopDefault(_library);var require$$17=Object.freeze({default:_library$1});var _aFunction=createCommonjsModule(function(module){module.exports=function(it){if(typeof it!='function')throw TypeError(it+' is not a function!');return it;};});var _aFunction$1=interopDefault(_aFunction);var require$$1$4=Object.freeze({default:_aFunction$1});var _ctx=createCommonjsModule(function(module){// optional / simple context binding
var aFunction=interopDefault(require$$1$4);module.exports=function(fn,that,length){aFunction(fn);if(that===undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a);};case 2:return function(a,b){return fn.call(that,a,b);};case 3:return function(a,b,c){return fn.call(that,a,b,c);};}return function()/* ...args */{return fn.apply(that,arguments);};};});var _ctx$1=interopDefault(_ctx);var require$$5=Object.freeze({default:_ctx$1});var _export=createCommonjsModule(function(module){var global=interopDefault(require$$3$1),core=interopDefault(require$$0$6),hide=interopDefault(require$$0$4),redefine=interopDefault(require$$0$3),ctx=interopDefault(require$$5),PROTOTYPE='prototype';var $export=function $export(type,name,source){var IS_FORCED=type&$export.F,IS_GLOBAL=type&$export.G,IS_STATIC=type&$export.S,IS_PROTO=type&$export.P,IS_BIND=type&$export.B,target=IS_GLOBAL?global:IS_STATIC?global[name]||(global[name]={}):(global[name]||{})[PROTOTYPE],exports=IS_GLOBAL?core:core[name]||(core[name]={}),expProto=exports[PROTOTYPE]||(exports[PROTOTYPE]={}),key,own,out,exp;if(IS_GLOBAL)source=name;for(key in source){// contains in native
own=!IS_FORCED&&target&&target[key]!==undefined;// export native or passed
out=(own?target:source)[key];// bind timers to global for call from export context
exp=IS_BIND&&own?ctx(out,global):IS_PROTO&&typeof out=='function'?ctx(Function.call,out):out;// extend global
if(target)redefine(target,key,out,type&$export.U);// export
if(exports[key]!=out)hide(exports,key,exp);if(IS_PROTO&&expProto[key]!=out)expProto[key]=out;}};global.core=core;// type bitmap
$export.F=1;// forced
$export.G=2;// global
$export.S=4;// static
$export.P=8;// proto
$export.B=16;// bind
$export.W=32;// wrap
$export.U=64;// safe
$export.R=128;// real proto method for `library` 
module.exports=$export;});var _export$1=interopDefault(_export);var require$$13=Object.freeze({default:_export$1});var _iterators=createCommonjsModule(function(module){module.exports={};});var _iterators$1=interopDefault(_iterators);var require$$1$5=Object.freeze({default:_iterators$1});var _iobject=createCommonjsModule(function(module){// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof=interopDefault(require$$0);module.exports=Object('z').propertyIsEnumerable(0)?Object:function(it){return cof(it)=='String'?it.split(''):Object(it);};});var _iobject$1=interopDefault(_iobject);var require$$1$9=Object.freeze({default:_iobject$1});var _toIobject=createCommonjsModule(function(module){// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject=interopDefault(require$$1$9),defined=interopDefault(require$$0$8);module.exports=function(it){return IObject(defined(it));};});var _toIobject$1=interopDefault(_toIobject);var require$$1$8=Object.freeze({default:_toIobject$1});var _toLength=createCommonjsModule(function(module){// 7.1.15 ToLength
var toInteger=interopDefault(require$$0$7),min=Math.min;module.exports=function(it){return it>0?min(toInteger(it),0x1fffffffffffff):0;// pow(2, 53) - 1 == 9007199254740991
};});var _toLength$1=interopDefault(_toLength);var require$$1$11=Object.freeze({default:_toLength$1});var _toIndex=createCommonjsModule(function(module){var toInteger=interopDefault(require$$0$7),max=Math.max,min=Math.min;module.exports=function(index,length){index=toInteger(index);return index<0?max(index+length,0):min(index,length);};});var _toIndex$1=interopDefault(_toIndex);var require$$0$10=Object.freeze({default:_toIndex$1});var _arrayIncludes=createCommonjsModule(function(module){// false -> Array#indexOf
// true  -> Array#includes
var toIObject=interopDefault(require$$1$8),toLength=interopDefault(require$$1$11),toIndex=interopDefault(require$$0$10);module.exports=function(IS_INCLUDES){return function($this,el,fromIndex){var O=toIObject($this),length=toLength(O.length),index=toIndex(fromIndex,length),value;// Array#includes uses SameValueZero equality algorithm
if(IS_INCLUDES&&el!=el)while(length>index){value=O[index++];if(value!=value)return true;// Array#toIndex ignores holes, Array#includes - not
}else for(;length>index;index++){if(IS_INCLUDES||index in O){if(O[index]===el)return IS_INCLUDES||index||0;}}return!IS_INCLUDES&&-1;};};});var _arrayIncludes$1=interopDefault(_arrayIncludes);var require$$1$10=Object.freeze({default:_arrayIncludes$1});var _sharedKey=createCommonjsModule(function(module){var shared=interopDefault(require$$1)('keys'),uid=interopDefault(require$$0$2);module.exports=function(key){return shared[key]||(shared[key]=uid(key));};});var _sharedKey$1=interopDefault(_sharedKey);var require$$0$11=Object.freeze({default:_sharedKey$1});var _objectKeysInternal=createCommonjsModule(function(module){var has=interopDefault(require$$2$4),toIObject=interopDefault(require$$1$8),arrayIndexOf=interopDefault(require$$1$10)(false),IE_PROTO=interopDefault(require$$0$11)('IE_PROTO');module.exports=function(object,names){var O=toIObject(object),i=0,result=[],key;for(key in O){if(key!=IE_PROTO)has(O,key)&&result.push(key);}// Don't enum bug & hidden keys
while(names.length>i){if(has(O,key=names[i++])){~arrayIndexOf(result,key)||result.push(key);}}return result;};});var _objectKeysInternal$1=interopDefault(_objectKeysInternal);var require$$1$7=Object.freeze({default:_objectKeysInternal$1});var _enumBugKeys=createCommonjsModule(function(module){// IE 8- don't enum bug keys
module.exports='constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');});var _enumBugKeys$1=interopDefault(_enumBugKeys);var require$$0$12=Object.freeze({default:_enumBugKeys$1});var _objectKeys=createCommonjsModule(function(module){// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys=interopDefault(require$$1$7),enumBugKeys=interopDefault(require$$0$12);module.exports=Object.keys||function keys(O){return $keys(O,enumBugKeys);};});var _objectKeys$1=interopDefault(_objectKeys);var require$$1$6=Object.freeze({default:_objectKeys$1});var _objectDps=createCommonjsModule(function(module){var dP=interopDefault(require$$2),anObject=interopDefault(require$$2$1),getKeys=interopDefault(require$$1$6);module.exports=interopDefault(require$$1$1)?Object.defineProperties:function defineProperties(O,Properties){anObject(O);var keys=getKeys(Properties),length=keys.length,i=0,P;while(length>i){dP.f(O,P=keys[i++],Properties[P]);}return O;};});var _objectDps$1=interopDefault(_objectDps);var require$$4$1=Object.freeze({default:_objectDps$1});var _html=createCommonjsModule(function(module){module.exports=interopDefault(require$$3$1).document&&document.documentElement;});var _html$1=interopDefault(_html);var require$$3$4=Object.freeze({default:_html$1});var _objectCreate=createCommonjsModule(function(module){// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject=interopDefault(require$$2$1),dPs=interopDefault(require$$4$1),enumBugKeys=interopDefault(require$$0$12),IE_PROTO=interopDefault(require$$0$11)('IE_PROTO'),Empty=function Empty(){/* empty */},PROTOTYPE='prototype';// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict=function createDict(){// Thrash, waste and sodomy: IE GC bug
var iframe=interopDefault(require$$2$3)('iframe'),i=enumBugKeys.length,lt='<',gt='>',iframeDocument;iframe.style.display='none';interopDefault(require$$3$4).appendChild(iframe);iframe.src='javascript:';// eslint-disable-line no-script-url
// createDict = iframe.contentWindow.Object;
// html.removeChild(iframe);
iframeDocument=iframe.contentWindow.document;iframeDocument.open();iframeDocument.write(lt+'script'+gt+'document.F=Object'+lt+'/script'+gt);iframeDocument.close();_createDict=iframeDocument.F;while(i--){delete _createDict[PROTOTYPE][enumBugKeys[i]];}return _createDict();};module.exports=Object.create||function create(O,Properties){var result;if(O!==null){Empty[PROTOTYPE]=anObject(O);result=new Empty();Empty[PROTOTYPE]=null;// add "__proto__" for Object.getPrototypeOf polyfill
result[IE_PROTO]=O;}else result=_createDict();return Properties===undefined?result:dPs(result,Properties);};});var _objectCreate$1=interopDefault(_objectCreate);var require$$4=Object.freeze({default:_objectCreate$1});var _setToStringTag=createCommonjsModule(function(module){var def=interopDefault(require$$2).f,has=interopDefault(require$$2$4),TAG=interopDefault(require$$0$1)('toStringTag');module.exports=function(it,tag,stat){if(it&&!has(it=stat?it:it.prototype,TAG))def(it,TAG,{configurable:true,value:tag});};});var _setToStringTag$1=interopDefault(_setToStringTag);var require$$3$5=Object.freeze({default:_setToStringTag$1});var _iterCreate=createCommonjsModule(function(module){'use strict';var create=interopDefault(require$$4),descriptor=interopDefault(require$$3$2),setToStringTag=interopDefault(require$$3$5),IteratorPrototype={};// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
interopDefault(require$$0$4)(IteratorPrototype,interopDefault(require$$0$1)('iterator'),function(){return this;});module.exports=function(Constructor,NAME,next){Constructor.prototype=create(IteratorPrototype,{next:descriptor(1,next)});setToStringTag(Constructor,NAME+' Iterator');};});var _iterCreate$1=interopDefault(_iterCreate);var require$$3$3=Object.freeze({default:_iterCreate$1});var _toObject=createCommonjsModule(function(module){// 7.1.13 ToObject(argument)
var defined=interopDefault(require$$0$8);module.exports=function(it){return Object(defined(it));};});var _toObject$1=interopDefault(_toObject);var require$$1$13=Object.freeze({default:_toObject$1});var _objectGpo=createCommonjsModule(function(module){// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has=interopDefault(require$$2$4),toObject=interopDefault(require$$1$13),IE_PROTO=interopDefault(require$$0$11)('IE_PROTO'),ObjectProto=Object.prototype;module.exports=Object.getPrototypeOf||function(O){O=toObject(O);if(has(O,IE_PROTO))return O[IE_PROTO];if(typeof O.constructor=='function'&&O instanceof O.constructor){return O.constructor.prototype;}return O instanceof Object?ObjectProto:null;};});var _objectGpo$1=interopDefault(_objectGpo);var require$$1$12=Object.freeze({default:_objectGpo$1});var _iterDefine=createCommonjsModule(function(module){'use strict';var LIBRARY=interopDefault(require$$17),$export=interopDefault(require$$13),redefine=interopDefault(require$$0$3),hide=interopDefault(require$$0$4),has=interopDefault(require$$2$4),Iterators=interopDefault(require$$1$5),$iterCreate=interopDefault(require$$3$3),setToStringTag=interopDefault(require$$3$5),getPrototypeOf=interopDefault(require$$1$12),ITERATOR=interopDefault(require$$0$1)('iterator'),BUGGY=!([].keys&&'next'in[].keys())// Safari has buggy iterators w/o `next`
,FF_ITERATOR='@@iterator',KEYS='keys',VALUES='values';var returnThis=function returnThis(){return this;};module.exports=function(Base,NAME,Constructor,next,DEFAULT,IS_SET,FORCED){$iterCreate(Constructor,NAME,next);var getMethod=function getMethod(kind){if(!BUGGY&&kind in proto)return proto[kind];switch(kind){case KEYS:return function keys(){return new Constructor(this,kind);};case VALUES:return function values(){return new Constructor(this,kind);};}return function entries(){return new Constructor(this,kind);};};var TAG=NAME+' Iterator',DEF_VALUES=DEFAULT==VALUES,VALUES_BUG=false,proto=Base.prototype,$native=proto[ITERATOR]||proto[FF_ITERATOR]||DEFAULT&&proto[DEFAULT],$default=$native||getMethod(DEFAULT),$entries=DEFAULT?!DEF_VALUES?$default:getMethod('entries'):undefined,$anyNative=NAME=='Array'?proto.entries||$native:$native,methods,key,IteratorPrototype;// Fix native
if($anyNative){IteratorPrototype=getPrototypeOf($anyNative.call(new Base()));if(IteratorPrototype!==Object.prototype){// Set @@toStringTag to native iterators
setToStringTag(IteratorPrototype,TAG,true);// fix for some old engines
if(!LIBRARY&&!has(IteratorPrototype,ITERATOR))hide(IteratorPrototype,ITERATOR,returnThis);}}// fix Array#{values, @@iterator}.name in V8 / FF
if(DEF_VALUES&&$native&&$native.name!==VALUES){VALUES_BUG=true;$default=function values(){return $native.call(this);};}// Define iterator
if((!LIBRARY||FORCED)&&(BUGGY||VALUES_BUG||!proto[ITERATOR])){hide(proto,ITERATOR,$default);}// Plug for library
Iterators[NAME]=$default;Iterators[TAG]=returnThis;if(DEFAULT){methods={values:DEF_VALUES?$default:getMethod(VALUES),keys:IS_SET?$default:getMethod(KEYS),entries:$entries};if(FORCED)for(key in methods){if(!(key in proto))redefine(proto,key,methods[key]);}else $export($export.P+$export.F*(BUGGY||VALUES_BUG),NAME,methods);}return methods;};});var _iterDefine$1=interopDefault(_iterDefine);var require$$0$9=Object.freeze({default:_iterDefine$1});var es6_string_iterator=createCommonjsModule(function(module){'use strict';var $at=interopDefault(require$$1$3)(true);// 21.1.3.27 String.prototype[@@iterator]()
interopDefault(require$$0$9)(String,'String',function(iterated){this._t=String(iterated);// target
this._i=0;// next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
},function(){var O=this._t,index=this._i,point;if(index>=O.length)return{value:undefined,done:true};point=$at(O,index);this._i+=point.length;return{value:point,done:false};});});interopDefault(es6_string_iterator);var _addToUnscopables=createCommonjsModule(function(module){// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES=interopDefault(require$$0$1)('unscopables'),ArrayProto=Array.prototype;if(ArrayProto[UNSCOPABLES]==undefined)interopDefault(require$$0$4)(ArrayProto,UNSCOPABLES,{});module.exports=function(key){ArrayProto[UNSCOPABLES][key]=true;};});var _addToUnscopables$1=interopDefault(_addToUnscopables);var require$$4$2=Object.freeze({default:_addToUnscopables$1});var _iterStep=createCommonjsModule(function(module){module.exports=function(done,value){return{value:value,done:!!done};};});var _iterStep$1=interopDefault(_iterStep);var require$$3$6=Object.freeze({default:_iterStep$1});var es6_array_iterator=createCommonjsModule(function(module){'use strict';var addToUnscopables=interopDefault(require$$4$2),step=interopDefault(require$$3$6),Iterators=interopDefault(require$$1$5),toIObject=interopDefault(require$$1$8);// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports=interopDefault(require$$0$9)(Array,'Array',function(iterated,kind){this._t=toIObject(iterated);// target
this._i=0;// next index
this._k=kind;// kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
},function(){var O=this._t,kind=this._k,index=this._i++;if(!O||index>=O.length){this._t=undefined;return step(1);}if(kind=='keys')return step(0,index);if(kind=='values')return step(0,O[index]);return step(0,[index,O[index]]);},'values');// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments=Iterators.Array;addToUnscopables('keys');addToUnscopables('values');addToUnscopables('entries');});var es6_array_iterator$1=interopDefault(es6_array_iterator);var require$$5$1=Object.freeze({default:es6_array_iterator$1});var web_dom_iterable=createCommonjsModule(function(module){var $iterators=interopDefault(require$$5$1),redefine=interopDefault(require$$0$3),global=interopDefault(require$$3$1),hide=interopDefault(require$$0$4),Iterators=interopDefault(require$$1$5),wks=interopDefault(require$$0$1),ITERATOR=wks('iterator'),TO_STRING_TAG=wks('toStringTag'),ArrayValues=Iterators.Array;for(var collections=['NodeList','DOMTokenList','MediaList','StyleSheetList','CSSRuleList'],i=0;i<5;i++){var NAME=collections[i],Collection=global[NAME],proto=Collection&&Collection.prototype,key;if(proto){if(!proto[ITERATOR])hide(proto,ITERATOR,ArrayValues);if(!proto[TO_STRING_TAG])hide(proto,TO_STRING_TAG,NAME);Iterators[NAME]=ArrayValues;for(key in $iterators){if(!proto[key])redefine(proto,key,$iterators[key],true);}}}});interopDefault(web_dom_iterable);var _anInstance=createCommonjsModule(function(module){module.exports=function(it,Constructor,name,forbiddenField){if(!(it instanceof Constructor)||forbiddenField!==undefined&&forbiddenField in it){throw TypeError(name+': incorrect invocation!');}return it;};});var _anInstance$1=interopDefault(_anInstance);var require$$10=Object.freeze({default:_anInstance$1});var _iterCall=createCommonjsModule(function(module){// call something on iterator step with safe closing on error
var anObject=interopDefault(require$$2$1);module.exports=function(iterator,fn,value,entries){try{return entries?fn(anObject(value)[0],value[1]):fn(value);// 7.4.6 IteratorClose(iterator, completion)
}catch(e){var ret=iterator['return'];if(ret!==undefined)anObject(ret.call(iterator));throw e;}};});var _iterCall$1=interopDefault(_iterCall);var require$$4$3=Object.freeze({default:_iterCall$1});var _isArrayIter=createCommonjsModule(function(module){// check on default Array iterator
var Iterators=interopDefault(require$$1$5),ITERATOR=interopDefault(require$$0$1)('iterator'),ArrayProto=Array.prototype;module.exports=function(it){return it!==undefined&&(Iterators.Array===it||ArrayProto[ITERATOR]===it);};});var _isArrayIter$1=interopDefault(_isArrayIter);var require$$3$7=Object.freeze({default:_isArrayIter$1});var core_getIteratorMethod=createCommonjsModule(function(module){var classof=interopDefault(require$$3),ITERATOR=interopDefault(require$$0$1)('iterator'),Iterators=interopDefault(require$$1$5);module.exports=interopDefault(require$$0$6).getIteratorMethod=function(it){if(it!=undefined)return it[ITERATOR]||it['@@iterator']||Iterators[classof(it)];};});var core_getIteratorMethod$1=interopDefault(core_getIteratorMethod);var require$$0$13=Object.freeze({default:core_getIteratorMethod$1});var _forOf=createCommonjsModule(function(module){var ctx=interopDefault(require$$5),call=interopDefault(require$$4$3),isArrayIter=interopDefault(require$$3$7),anObject=interopDefault(require$$2$1),toLength=interopDefault(require$$1$11),getIterFn=interopDefault(require$$0$13),BREAK={},RETURN={};var exports=module.exports=function(iterable,entries,fn,that,ITERATOR){var iterFn=ITERATOR?function(){return iterable;}:getIterFn(iterable),f=ctx(fn,that,entries?2:1),index=0,length,step,iterator,result;if(typeof iterFn!='function')throw TypeError(iterable+' is not iterable!');// fast case for arrays with default iterator
if(isArrayIter(iterFn))for(length=toLength(iterable.length);length>index;index++){result=entries?f(anObject(step=iterable[index])[0],step[1]):f(iterable[index]);if(result===BREAK||result===RETURN)return result;}else for(iterator=iterFn.call(iterable);!(step=iterator.next()).done;){result=call(iterator,f,step.value,entries);if(result===BREAK||result===RETURN)return result;}};exports.BREAK=BREAK;exports.RETURN=RETURN;});var _forOf$1=interopDefault(_forOf);var require$$9=Object.freeze({default:_forOf$1});var _speciesConstructor=createCommonjsModule(function(module){// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject=interopDefault(require$$2$1),aFunction=interopDefault(require$$1$4),SPECIES=interopDefault(require$$0$1)('species');module.exports=function(O,D){var C=anObject(O).constructor,S;return C===undefined||(S=anObject(C)[SPECIES])==undefined?D:aFunction(S);};});var _speciesConstructor$1=interopDefault(_speciesConstructor);var require$$8=Object.freeze({default:_speciesConstructor$1});var _invoke=createCommonjsModule(function(module){// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports=function(fn,args,that){var un=that===undefined;switch(args.length){case 0:return un?fn():fn.call(that);case 1:return un?fn(args[0]):fn.call(that,args[0]);case 2:return un?fn(args[0],args[1]):fn.call(that,args[0],args[1]);case 3:return un?fn(args[0],args[1],args[2]):fn.call(that,args[0],args[1],args[2]);case 4:return un?fn(args[0],args[1],args[2],args[3]):fn.call(that,args[0],args[1],args[2],args[3]);}return fn.apply(that,args);};});var _invoke$1=interopDefault(_invoke);var require$$4$4=Object.freeze({default:_invoke$1});var _task=createCommonjsModule(function(module){var ctx=interopDefault(require$$5),invoke=interopDefault(require$$4$4),html=interopDefault(require$$3$4),cel=interopDefault(require$$2$3),global=interopDefault(require$$3$1),process=global.process,setTask=global.setImmediate,clearTask=global.clearImmediate,MessageChannel=global.MessageChannel,counter=0,queue={},ONREADYSTATECHANGE='onreadystatechange',defer,channel,port;var run=function run(){var id=+this;if(queue.hasOwnProperty(id)){var fn=queue[id];delete queue[id];fn();}};var listener=function listener(event){run.call(event.data);};// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask||!clearTask){setTask=function setImmediate(fn){var args=[],i=1;while(arguments.length>i){args.push(arguments[i++]);}queue[++counter]=function(){invoke(typeof fn=='function'?fn:Function(fn),args);};defer(counter);return counter;};clearTask=function clearImmediate(id){delete queue[id];};// Node.js 0.8-
if(interopDefault(require$$0)(process)=='process'){defer=function defer(id){process.nextTick(ctx(run,id,1));};// Browsers with MessageChannel, includes WebWorkers
}else if(MessageChannel){channel=new MessageChannel();port=channel.port2;channel.port1.onmessage=listener;defer=ctx(port.postMessage,port,1);// Browsers with postMessage, skip WebWorkers
// IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
}else if(global.addEventListener&&typeof postMessage=='function'&&!global.importScripts){defer=function defer(id){global.postMessage(id+'','*');};global.addEventListener('message',listener,false);// IE8-
}else if(ONREADYSTATECHANGE in cel('script')){defer=function defer(id){html.appendChild(cel('script'))[ONREADYSTATECHANGE]=function(){html.removeChild(this);run.call(id);};};// Rest old browsers
}else{defer=function defer(id){setTimeout(ctx(run,id,1),0);};}}module.exports={set:setTask,clear:clearTask};});var _task$1=interopDefault(_task);var set=_task.set;var clear=_task.clear;var require$$1$14=Object.freeze({default:_task$1,set:set,clear:clear});var _microtask=createCommonjsModule(function(module){var global=interopDefault(require$$3$1),macrotask=interopDefault(require$$1$14).set,Observer=global.MutationObserver||global.WebKitMutationObserver,process=global.process,Promise=global.Promise,isNode=interopDefault(require$$0)(process)=='process';module.exports=function(){var head,last,notify;var flush=function flush(){var parent,fn;if(isNode&&(parent=process.domain))parent.exit();while(head){fn=head.fn;head=head.next;try{fn();}catch(e){if(head)notify();else last=undefined;throw e;}}last=undefined;if(parent)parent.enter();};// Node.js
if(isNode){notify=function notify(){process.nextTick(flush);};// browsers with MutationObserver
}else if(Observer){var toggle=true,node=document.createTextNode('');new Observer(flush).observe(node,{characterData:true});// eslint-disable-line no-new
notify=function notify(){node.data=toggle=!toggle;};// environments with maybe non-completely correct, but existent Promise
}else if(Promise&&Promise.resolve){var promise=Promise.resolve();notify=function notify(){promise.then(flush);};// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
}else{notify=function notify(){// strange IE + webpack dev server bug - use .call(global)
macrotask.call(global,flush);};}return function(fn){var task={fn:fn,next:undefined};if(last)last.next=task;if(!head){head=task;notify();}last=task;};};});var _microtask$1=interopDefault(_microtask);var require$$6=Object.freeze({default:_microtask$1});var _redefineAll=createCommonjsModule(function(module){var redefine=interopDefault(require$$0$3);module.exports=function(target,src,safe){for(var key in src){redefine(target,key,src[key],safe);}return target;};});var _redefineAll$1=interopDefault(_redefineAll);var require$$4$5=Object.freeze({default:_redefineAll$1});var _setSpecies=createCommonjsModule(function(module){'use strict';var global=interopDefault(require$$3$1),dP=interopDefault(require$$2),DESCRIPTORS=interopDefault(require$$1$1),SPECIES=interopDefault(require$$0$1)('species');module.exports=function(KEY){var C=global[KEY];if(DESCRIPTORS&&C&&!C[SPECIES])dP.f(C,SPECIES,{configurable:true,get:function get(){return this;}});};});var _setSpecies$1=interopDefault(_setSpecies);var require$$2$5=Object.freeze({default:_setSpecies$1});var _iterDetect=createCommonjsModule(function(module){var ITERATOR=interopDefault(require$$0$1)('iterator'),SAFE_CLOSING=false;try{var riter=[7][ITERATOR]();riter['return']=function(){SAFE_CLOSING=true;};Array.from(riter,function(){throw 2;});}catch(e){/* empty */}module.exports=function(exec,skipClosing){if(!skipClosing&&!SAFE_CLOSING)return false;var safe=false;try{var arr=[7],iter=arr[ITERATOR]();iter.next=function(){return{done:safe=true};};arr[ITERATOR]=function(){return iter;};exec(arr);}catch(e){/* empty */}return safe;};});var _iterDetect$1=interopDefault(_iterDetect);var require$$0$14=Object.freeze({default:_iterDetect$1});var es6_promise=createCommonjsModule(function(module){'use strict';var LIBRARY=interopDefault(require$$17),global=interopDefault(require$$3$1),ctx=interopDefault(require$$5),classof=interopDefault(require$$3),$export=interopDefault(require$$13),isObject=interopDefault(require$$12),aFunction=interopDefault(require$$1$4),anInstance=interopDefault(require$$10),forOf=interopDefault(require$$9),speciesConstructor=interopDefault(require$$8),task=interopDefault(require$$1$14).set,microtask=interopDefault(require$$6)(),PROMISE='Promise',TypeError=global.TypeError,process=global.process,$Promise=global[PROMISE],process=global.process,isNode=classof(process)=='process',empty=function empty(){/* empty */},Internal,GenericPromiseCapability,Wrapper;var USE_NATIVE=!!function(){try{// correct subclassing with @@species support
var promise=$Promise.resolve(1),FakePromise=(promise.constructor={})[interopDefault(require$$0$1)('species')]=function(exec){exec(empty,empty);};// unhandled rejections tracking support, NodeJS Promise without it fails @@species test
return(isNode||typeof PromiseRejectionEvent=='function')&&promise.then(empty)instanceof FakePromise;}catch(e){/* empty */}}();// helpers
var sameConstructor=function sameConstructor(a,b){// with library wrapper special case
return a===b||a===$Promise&&b===Wrapper;};var isThenable=function isThenable(it){var then;return isObject(it)&&typeof(then=it.then)=='function'?then:false;};var newPromiseCapability=function newPromiseCapability(C){return sameConstructor($Promise,C)?new PromiseCapability(C):new GenericPromiseCapability(C);};var PromiseCapability=GenericPromiseCapability=function GenericPromiseCapability(C){var resolve,reject;this.promise=new C(function($$resolve,$$reject){if(resolve!==undefined||reject!==undefined)throw TypeError('Bad Promise constructor');resolve=$$resolve;reject=$$reject;});this.resolve=aFunction(resolve);this.reject=aFunction(reject);};var perform=function perform(exec){try{exec();}catch(e){return{error:e};}};var notify=function notify(promise,isReject){if(promise._n)return;promise._n=true;var chain=promise._c;microtask(function(){var value=promise._v,ok=promise._s==1,i=0;var run=function run(reaction){var handler=ok?reaction.ok:reaction.fail,resolve=reaction.resolve,reject=reaction.reject,domain=reaction.domain,result,then;try{if(handler){if(!ok){if(promise._h==2)onHandleUnhandled(promise);promise._h=1;}if(handler===true)result=value;else{if(domain)domain.enter();result=handler(value);if(domain)domain.exit();}if(result===reaction.promise){reject(TypeError('Promise-chain cycle'));}else if(then=isThenable(result)){then.call(result,resolve,reject);}else resolve(result);}else reject(value);}catch(e){reject(e);}};while(chain.length>i){run(chain[i++]);}// variable length - can't use forEach
promise._c=[];promise._n=false;if(isReject&&!promise._h)onUnhandled(promise);});};var onUnhandled=function onUnhandled(promise){task.call(global,function(){var value=promise._v,abrupt,handler,console;if(isUnhandled(promise)){abrupt=perform(function(){if(isNode){process.emit('unhandledRejection',value,promise);}else if(handler=global.onunhandledrejection){handler({promise:promise,reason:value});}else if((console=global.console)&&console.error){console.error('Unhandled promise rejection',value);}});// Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
promise._h=isNode||isUnhandled(promise)?2:1;}promise._a=undefined;if(abrupt)throw abrupt.error;});};var isUnhandled=function isUnhandled(promise){if(promise._h==1)return false;var chain=promise._a||promise._c,i=0,reaction;while(chain.length>i){reaction=chain[i++];if(reaction.fail||!isUnhandled(reaction.promise))return false;}return true;};var onHandleUnhandled=function onHandleUnhandled(promise){task.call(global,function(){var handler;if(isNode){process.emit('rejectionHandled',promise);}else if(handler=global.onrejectionhandled){handler({promise:promise,reason:promise._v});}});};var $reject=function $reject(value){var promise=this;if(promise._d)return;promise._d=true;promise=promise._w||promise;// unwrap
promise._v=value;promise._s=2;if(!promise._a)promise._a=promise._c.slice();notify(promise,true);};var $resolve=function $resolve(value){var promise=this,then;if(promise._d)return;promise._d=true;promise=promise._w||promise;// unwrap
try{if(promise===value)throw TypeError("Promise can't be resolved itself");if(then=isThenable(value)){microtask(function(){var wrapper={_w:promise,_d:false};// wrap
try{then.call(value,ctx($resolve,wrapper,1),ctx($reject,wrapper,1));}catch(e){$reject.call(wrapper,e);}});}else{promise._v=value;promise._s=1;notify(promise,false);}}catch(e){$reject.call({_w:promise,_d:false},e);// wrap
}};// constructor polyfill
if(!USE_NATIVE){// 25.4.3.1 Promise(executor)
$Promise=function Promise(executor){anInstance(this,$Promise,PROMISE,'_h');aFunction(executor);Internal.call(this);try{executor(ctx($resolve,this,1),ctx($reject,this,1));}catch(err){$reject.call(this,err);}};Internal=function Promise(executor){this._c=[];// <- awaiting reactions
this._a=undefined;// <- checked in isUnhandled reactions
this._s=0;// <- state
this._d=false;// <- done
this._v=undefined;// <- value
this._h=0;// <- rejection state, 0 - default, 1 - handled, 2 - unhandled
this._n=false;// <- notify
};Internal.prototype=interopDefault(require$$4$5)($Promise.prototype,{// 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
then:function then(onFulfilled,onRejected){var reaction=newPromiseCapability(speciesConstructor(this,$Promise));reaction.ok=typeof onFulfilled=='function'?onFulfilled:true;reaction.fail=typeof onRejected=='function'&&onRejected;reaction.domain=isNode?process.domain:undefined;this._c.push(reaction);if(this._a)this._a.push(reaction);if(this._s)notify(this,false);return reaction.promise;},// 25.4.5.1 Promise.prototype.catch(onRejected)
'catch':function _catch(onRejected){return this.then(undefined,onRejected);}});PromiseCapability=function PromiseCapability(){var promise=new Internal();this.promise=promise;this.resolve=ctx($resolve,promise,1);this.reject=ctx($reject,promise,1);};}$export($export.G+$export.W+$export.F*!USE_NATIVE,{Promise:$Promise});interopDefault(require$$3$5)($Promise,PROMISE);interopDefault(require$$2$5)(PROMISE);Wrapper=interopDefault(require$$0$6)[PROMISE];// statics
$export($export.S+$export.F*!USE_NATIVE,PROMISE,{// 25.4.4.5 Promise.reject(r)
reject:function reject(r){var capability=newPromiseCapability(this),$$reject=capability.reject;$$reject(r);return capability.promise;}});$export($export.S+$export.F*(LIBRARY||!USE_NATIVE),PROMISE,{// 25.4.4.6 Promise.resolve(x)
resolve:function resolve(x){// instanceof instead of internal slot check because we should fix it without replacement native Promise core
if(x instanceof $Promise&&sameConstructor(x.constructor,this))return x;var capability=newPromiseCapability(this),$$resolve=capability.resolve;$$resolve(x);return capability.promise;}});$export($export.S+$export.F*!(USE_NATIVE&&interopDefault(require$$0$14)(function(iter){$Promise.all(iter)['catch'](empty);})),PROMISE,{// 25.4.4.1 Promise.all(iterable)
all:function all(iterable){var C=this,capability=newPromiseCapability(C),resolve=capability.resolve,reject=capability.reject;var abrupt=perform(function(){var values=[],index=0,remaining=1;forOf(iterable,false,function(promise){var $index=index++,alreadyCalled=false;values.push(undefined);remaining++;C.resolve(promise).then(function(value){if(alreadyCalled)return;alreadyCalled=true;values[$index]=value;--remaining||resolve(values);},reject);});--remaining||resolve(values);});if(abrupt)reject(abrupt.error);return capability.promise;},// 25.4.4.4 Promise.race(iterable)
race:function race(iterable){var C=this,capability=newPromiseCapability(C),reject=capability.reject;var abrupt=perform(function(){forOf(iterable,false,function(promise){C.resolve(promise).then(capability.resolve,reject);});});if(abrupt)reject(abrupt.error);return capability.promise;}});});interopDefault(es6_promise);var promise=createCommonjsModule(function(module){module.exports=interopDefault(require$$0$6).Promise;});var promisePoly=interopDefault(promise);(function(){'use strict';if(self.fetch){return;}function normalizeName(name){if(typeof name!=='string'){name=String(name);}if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){throw new TypeError('Invalid character in header field name');}return name.toLowerCase();}function normalizeValue(value){if(typeof value!=='string'){value=String(value);}return value;}function Headers(headers){this.map={};if(headers instanceof Headers){headers.forEach(function(value,name){this.append(name,value);},this);}else if(headers){Object.getOwnPropertyNames(headers).forEach(function(name){this.append(name,headers[name]);},this);}}Headers.prototype.append=function(name,value){name=normalizeName(name);value=normalizeValue(value);var list=this.map[name];if(!list){list=[];this.map[name]=list;}list.push(value);};Headers.prototype['delete']=function(name){delete this.map[normalizeName(name)];};Headers.prototype.get=function(name){var values=this.map[normalizeName(name)];return values?values[0]:null;};Headers.prototype.getAll=function(name){return this.map[normalizeName(name)]||[];};Headers.prototype.has=function(name){return this.map.hasOwnProperty(normalizeName(name));};Headers.prototype.set=function(name,value){this.map[normalizeName(name)]=[normalizeValue(value)];};Headers.prototype.forEach=function(callback,thisArg){Object.getOwnPropertyNames(this.map).forEach(function(name){this.map[name].forEach(function(value){callback.call(thisArg,value,name,this);},this);},this);};function consumed(body){if(body.bodyUsed){return Promise.reject(new TypeError('Already read'));}body.bodyUsed=true;}function fileReaderReady(reader){return new Promise(function(resolve,reject){reader.onload=function(){resolve(reader.result);};reader.onerror=function(){reject(reader.error);};});}function readBlobAsArrayBuffer(blob){var reader=new FileReader();reader.readAsArrayBuffer(blob);return fileReaderReady(reader);}function readBlobAsText(blob){var reader=new FileReader();reader.readAsText(blob);return fileReaderReady(reader);}var support={blob:'FileReader'in self&&'Blob'in self&&function(){try{new Blob();return true;}catch(e){return false;}}(),formData:'FormData'in self,arrayBuffer:'ArrayBuffer'in self};function Body(){this.bodyUsed=false;this._initBody=function(body){this._bodyInit=body;if(typeof body==='string'){this._bodyText=body;}else if(support.blob&&Blob.prototype.isPrototypeOf(body)){this._bodyBlob=body;}else if(support.formData&&FormData.prototype.isPrototypeOf(body)){this._bodyFormData=body;}else if(!body){this._bodyText='';}else if(support.arrayBuffer&&ArrayBuffer.prototype.isPrototypeOf(body)){// Only support ArrayBuffers for POST method.
// Receiving ArrayBuffers happens via Blobs, instead.
}else{throw new Error('unsupported BodyInit type');}};if(support.blob){this.blob=function(){var rejected=consumed(this);if(rejected){return rejected;}if(this._bodyBlob){return Promise.resolve(this._bodyBlob);}else if(this._bodyFormData){throw new Error('could not read FormData body as blob');}else{return Promise.resolve(new Blob([this._bodyText]));}};this.arrayBuffer=function(){return this.blob().then(readBlobAsArrayBuffer);};this.text=function(){var rejected=consumed(this);if(rejected){return rejected;}if(this._bodyBlob){return readBlobAsText(this._bodyBlob);}else if(this._bodyFormData){throw new Error('could not read FormData body as text');}else{return Promise.resolve(this._bodyText);}};}else{this.text=function(){var rejected=consumed(this);return rejected?rejected:Promise.resolve(this._bodyText);};}if(support.formData){this.formData=function(){return this.text().then(decode);};}this.json=function(){return this.text().then(JSON.parse);};return this;}// HTTP methods whose capitalization should be normalized
var methods=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];function normalizeMethod(method){var upcased=method.toUpperCase();return methods.indexOf(upcased)>-1?upcased:method;}function Request(input,options){options=options||{};var body=options.body;if(Request.prototype.isPrototypeOf(input)){if(input.bodyUsed){throw new TypeError('Already read');}this.url=input.url;this.credentials=input.credentials;if(!options.headers){this.headers=new Headers(input.headers);}this.method=input.method;this.mode=input.mode;if(!body){body=input._bodyInit;input.bodyUsed=true;}}else{this.url=input;}this.credentials=options.credentials||this.credentials||'omit';if(options.headers||!this.headers){this.headers=new Headers(options.headers);}this.method=normalizeMethod(options.method||this.method||'GET');this.mode=options.mode||this.mode||null;this.referrer=null;if((this.method==='GET'||this.method==='HEAD')&&body){throw new TypeError('Body not allowed for GET or HEAD requests');}this._initBody(body);}Request.prototype.clone=function(){return new Request(this);};function decode(body){var form=new FormData();body.trim().split('&').forEach(function(bytes){if(bytes){var split=bytes.split('=');var name=split.shift().replace(/\+/g,' ');var value=split.join('=').replace(/\+/g,' ');form.append(decodeURIComponent(name),decodeURIComponent(value));}});return form;}function headers(xhr){var head=new Headers();var pairs=xhr.getAllResponseHeaders().trim().split('\n');pairs.forEach(function(header){var split=header.trim().split(':');var key=split.shift().trim();var value=split.join(':').trim();head.append(key,value);});return head;}Body.call(Request.prototype);function Response(bodyInit,options){if(!options){options={};}this._initBody(bodyInit);this.type='default';this.status=options.status;this.ok=this.status>=200&&this.status<300;this.statusText=options.statusText;this.headers=options.headers instanceof Headers?options.headers:new Headers(options.headers);this.url=options.url||'';}Body.call(Response.prototype);Response.prototype.clone=function(){return new Response(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new Headers(this.headers),url:this.url});};Response.error=function(){var response=new Response(null,{status:0,statusText:''});response.type='error';return response;};var redirectStatuses=[301,302,303,307,308];Response.redirect=function(url,status){if(redirectStatuses.indexOf(status)===-1){throw new RangeError('Invalid status code');}return new Response(null,{status:status,headers:{location:url}});};self.Headers=Headers;self.Request=Request;self.Response=Response;self.fetch=function(input,init){return new Promise(function(resolve,reject){var request;if(Request.prototype.isPrototypeOf(input)&&!init){request=input;}else{request=new Request(input,init);}var xhr=new XMLHttpRequest();function responseURL(){if('responseURL'in xhr){return xhr.responseURL;}// Avoid security warnings on getResponseHeader when not allowed by CORS
if(/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())){return xhr.getResponseHeader('X-Request-URL');}return;}xhr.onload=function(){var status=xhr.status===1223?204:xhr.status;if(status<100||status>599){reject(new TypeError('Network request failed'));return;}var options={status:status,statusText:xhr.statusText,headers:headers(xhr),url:responseURL()};var body='response'in xhr?xhr.response:xhr.responseText;resolve(new Response(body,options));};xhr.onerror=function(){reject(new TypeError('Network request failed'));};xhr.open(request.method,request.url,true);if(request.credentials==='include'){xhr.withCredentials=true;}if('responseType'in xhr&&support.blob){xhr.responseType='blob';}request.headers.forEach(function(value,name){xhr.setRequestHeader(name,value);});xhr.send(typeof request._bodyInit==='undefined'?null:request._bodyInit);});};self.fetch.polyfill=true;})();var base64=createCommonjsModule(function(module,exports){;(function(){var object=typeof exports!='undefined'?exports:this;// #8: web workers
var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';function InvalidCharacterError(message){this.message=message;}InvalidCharacterError.prototype=new Error();InvalidCharacterError.prototype.name='InvalidCharacterError';// encoder
// [https://gist.github.com/999166] by [https://github.com/nignag]
object.btoa||(object.btoa=function(input){var str=String(input);for(// initialize result and counter
var block,charCode,idx=0,map=chars,output='';// if the next str index does not exist:
//   change the mapping table to "="
//   check if d has no fractional digits
str.charAt(idx|0)||(map='=',idx%1);// "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
output+=map.charAt(63&block>>8-idx%1*8)){charCode=str.charCodeAt(idx+=3/4);if(charCode>0xFF){throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");}block=block<<8|charCode;}return output;});// decoder
// [https://gist.github.com/1020396] by [https://github.com/atk]
object.atob||(object.atob=function(input){var str=String(input).replace(/=+$/,'');if(str.length%4==1){throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");}for(// initialize result and counters
var bc=0,bs,buffer,idx=0,output='';// get next character
buffer=str.charAt(idx++);// character found in table? initialize bit storage and add its ascii value;
~buffer&&(bs=bc%4?bs*64+buffer:buffer,// and if not first of each 4 characters,
// convert the first 8 bits to one ascii character
bc++%4)?output+=String.fromCharCode(255&bs>>(-2*bc&6)):0){// try to find character in table (0-63, not found => -1)
buffer=chars.indexOf(buffer);}return output;});})();});interopDefault(base64);/* global global */var globalNamespace=void 0;if(typeof global==='undefined'){globalNamespace=window;}else{globalNamespace=global;}var global$1=globalNamespace;// write polyfills to global scope
if(!global$1.Promise){global$1.Promise=promisePoly;}/* eslint no-undefined: 0 */var assign=void 0;if(typeof Object.assign==='function'){assign=Object.assign;}else{assign=function assign(target){if(target===undefined||target===null){throw new TypeError('Cannot convert undefined or null to object');}var output=Object(target);var propertyObjects=[].slice.call(arguments,1);if(propertyObjects.length>0){propertyObjects.forEach(function(source){if(source!==undefined&&source!==null){var nextKey=void 0;for(nextKey in source){if(source.hasOwnProperty(nextKey)){output[nextKey]=source[nextKey];}}}});}return output;};}var assign$1=assign;var includes=void 0;if(!Array.prototype.includes){includes=function includes(array,searchElement){var ObjectifiedArray=Object(array);var length=parseInt(ObjectifiedArray.length,10)||0;if(length===0){return false;}var startIndex=parseInt(arguments[1],10)||0;var index=void 0;if(startIndex>=0){index=startIndex;}else{index=length+startIndex;if(index<0){index=0;}}while(index<length){var currentElement=ObjectifiedArray[index];/* eslint no-self-compare:0 */if(searchElement===currentElement||searchElement!==searchElement&&currentElement!==currentElement){// NaN !== NaN
return true;}index++;}return false;};}else{includes=function includes(array){var args=[].slice.call(arguments,1);return Array.prototype.includes.apply(array,args);};}var includes$1=includes;function wrap(func,superFunc){function superWrapper(){var originalSuper=this.super;this.super=function(){return superFunc.apply(this,arguments);};var ret=func.apply(this,arguments);this.super=originalSuper;return ret;}superWrapper.wrappedFunction=func;return superWrapper;}function defineProperties(names,proto,destination){var parentProto=Object.getPrototypeOf(destination);names.forEach(function(name){var descriptor=Object.getOwnPropertyDescriptor(proto,name);var parentDescriptor=parentProto.hasOwnProperty(name)&&Object.getOwnPropertyDescriptor(parentProto,name);if(typeof parentDescriptor.value==='function'&&typeof descriptor.value==='function'){var wrappedFunction=wrap(descriptor.value,parentDescriptor.value);Object.defineProperty(destination,name,{value:wrappedFunction});}else{Object.defineProperty(destination,name,descriptor);}});}function createClass(props){var parent=arguments.length<=1||arguments[1]===undefined?Object:arguments[1];var Constructor=wrap(props.constructor,parent);var instancePropertyNames=Object.getOwnPropertyNames(props).filter(function(key){return!includes$1(['constructor','static'],key);});assign$1(Constructor,parent);Constructor.prototype=Object.create(parent.prototype);defineProperties(instancePropertyNames,props,Constructor.prototype);Constructor.prototype.constructor=Constructor;var staticProps=props.static;if(staticProps){var staticPropertyNames=Object.getOwnPropertyNames(staticProps);defineProperties(staticPropertyNames,staticProps,Constructor);}return Constructor;}var CoreObject=createClass({constructor:function constructor(){},static:{extend:function extend(subClassProps){return createClass(subClassProps,this);}}});function wrapConsole(logCommand){var logMethod=function logMethod(){/* eslint-disable no-console */if(console[logCommand]){var _console;(_console=console)[logCommand].apply(_console,arguments);}else{var _console2;(_console2=console).log.apply(_console2,arguments);}/* eslint-enable no-console */};return function(){var args=[].concat(Array.prototype.slice.call(arguments));args.unshift('[JS-BUY-SDK]: ');logMethod.apply(undefined,_toConsumableArray(args));};}var Logger=CoreObject.extend({constructor:function constructor(){},debug:wrapConsole('debug'),info:wrapConsole('info'),warn:wrapConsole('warn'),error:wrapConsole('error')});var logger=new Logger();/**
 * @module shopify-buy
 * @submodule config
 */var Config=CoreObject.extend({constructor:function constructor(attrs){var _this=this;Object.keys(this.deprecatedProperties).forEach(function(key){if(attrs.hasOwnProperty(key)){var transformName=_this.deprecatedProperties[key];var transform=_this[transformName];transform(attrs[key],attrs);}});this.requiredProperties.forEach(function(key){if(!attrs.hasOwnProperty(key)){throw new Error('new Config() requires the option \''+key+'\'');}else{_this[key]=attrs[key];}});},/**
   * An object with keys for deprecated properties and values as functions that
   * will transform the value into a usable value. A depracation transform should
   * have the value signature function(deprecated_value, config_to_be_transformed)
   * @attribute deprecatedProperties
   * @default { myShopifyDomain: this.transformMyShopifyDomain }
   * @type Object
   * @private
   */deprecatedProperties:{myShopifyDomain:'transformMyShopifyDomain'},transformMyShopifyDomain:function transformMyShopifyDomain(subdomain,attrs){logger.warn('Config - ','myShopifyDomain is deprecated, please use domain and provide the full shop domain.');attrs.domain=subdomain+'.myshopify.com';},/**
   * Properties that must be set on initializations
   * @attribute requiredProperties
   * @default ['apiKey', 'appId', 'myShopifyDomain']
   * @type Array
   * @private
   */requiredProperties:['apiKey','appId','domain'],/**
   * The apiKey for authenticating against shopify. This is your api client's
   * public api token. Not the shared secret. Set during initialation.
   * @attribute apiKey
   * @default ''
   * @type String
   * @public
   */apiKey:'',/**
   * @attribute appId
   * @default ''
   * @type String
   * @public
   */appId:'',/**
   * The domain that all the api requests will go to
   * @attribute domain
   * @default ''
   * @type String
   * @public
   */domain:'',/**
   * The subdomain of myshopify.io that all the api requests will go to
   * @attribute myShopifyDomain
   * @default ''
   * @type String
   * @public
   * @deprecated Use `config.domain` instead.
   */myShopifyDomain:''});var version$1=undefined;var BaseModel=CoreObject.extend({constructor:function constructor(){var attrs=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var metaAttrs=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];this.attrs=attrs;assign$1(this,metaAttrs);},attrs:null,serializer:null,adapter:null,shopClient:null});/**
  * Class for product option
  * @class Option
  * @constructor
*/var ProductOptionModel=BaseModel.extend({constructor:function constructor(){this.super.apply(this,arguments);this.selected=this.values[0];},/**
    * name of option (ex. "Size", "Color")
    * @property name
    * @type String
  */get name(){return this.attrs.name;},/**
    * possible values for selection
    * @property values
    * @type Array
  */get values(){return this.attrs.values;},/**
    * get/set selected option value (ex. "Large"). Setting this will update the
    * selected value on the model. Throws {Error} if setting selected to value that does not exist for option
    * @property selected
    * @type String
  */get selected(){return this._selected;},set selected(value){if(includes$1(this.values,value)){this._selected=value;}else{throw new Error('Invalid option selection for '+this.name+'.');}return value;}});/**
  * Model for product variant
  * @class ProductVariantModel
  * @constructor
*/var ProductVariantModel=BaseModel.extend({constructor:function constructor(){this.super.apply(this,arguments);},/**
    * Variant unique ID
    * @property id
    * @type {String}
  */get id(){return this.attrs.variant.id;},/**
    * ID of product variant belongs to
    * @property productId
    * @type {String}
  */get productId(){return this.attrs.product.id;},/**
    * Title of variant
    * @property title
    * @type {String}
  */get title(){return this.attrs.variant.title;},/**
    * Title of product variant belongs to
    * @property productTitle
    * @type {String}
  */get productTitle(){return this.attrs.product.title;},/**
    * <a href="https://docs.shopify.com/manual/products/promoting-marketing/sales">
    * Compare at</a> price for variant formatted as currency.
    * @property compareAtPrice
    * @type {String}
  */get compareAtPrice(){return this.attrs.variant.compare_at_price;},/**
    * Price of variant, formatted as currency
    * @property price
    * @type {String}
  */get price(){return this.attrs.variant.price;},/**
    * Variant weight in grams
    * @property grams
    * @type {Number}
  */get grams(){return this.attrs.variant.grams;},/**
    * Option values associated with this variant, ex {name: "color", value: "Blue"}
    * @property optionValues
    * @type {Array|Object}
  */get optionValues(){return this.attrs.variant.option_values;},/**
    * Variant in stock (always true if inventory tracking is disabled)
    * @property available
    * @type {Boolean}
  */get available(){return this.attrs.variant.available;},/**
    * Image for variant
    * @property image
    * @type {Object}
  */get image(){var id=this.id;var images=this.attrs.product.images;var primaryImage=images[0];var variantImage=images.filter(function(image){return image.variant_ids.indexOf(id)!==-1;})[0];return variantImage||primaryImage;},/**
    * Image variants available for a variant, ex [ {"name":"pico","dimension":"16x16","src":"https://cdn.shopify.com/image-two_pico.jpg"} ]
    * See <a href="https://help.shopify.com/themes/liquid/filters/url-filters#size-parameters"> for list of available variants.</a>
    * @property imageVariant
    * @type {Array}
  */get imageVariants(){var image=this.image;if(!image){return[];}var src=this.image.src;var extensionIndex=src.lastIndexOf('.');var pathAndBasename=src.slice(0,extensionIndex);var extension=src.slice(extensionIndex);var variants=[{name:'pico',dimension:'16x16'},{name:'icon',dimension:'32x32'},{name:'thumb',dimension:'50x50'},{name:'small',dimension:'100x100'},{name:'compact',dimension:'160x160'},{name:'medium',dimension:'240x240'},{name:'large',dimension:'480x480'},{name:'grande',dimension:'600x600'},{name:'1024x1024',dimension:'1024x1024'},{name:'2048x2048',dimension:'2048x2048'}];variants.forEach(function(variant){variant.src=pathAndBasename+'_'+variant.name+extension;});return variants;},checkoutUrl:function checkoutUrl(){var quantity=arguments.length<=0||arguments[0]===undefined?1:arguments[0];var config=this.config;var baseUrl='https://'+config.domain+'/cart';var variantPath=this.id+':'+parseInt(quantity,10);var query='api_key='+config.apiKey;return baseUrl+'/'+variantPath+'?'+query;}});function uniq(array){return array.reduce(function(uniqueArray,item){if(uniqueArray.indexOf(item)<0){uniqueArray.push(item);}return uniqueArray;},[]);}var NO_IMAGE_URI='https://widgets.shopifyapps.com/assets/no-image.svg';/**
   * Class for products returned by fetch('product')
   * @class ProductModel
   * @constructor
 */var ProductModel=BaseModel.extend({constructor:function constructor(){this.super.apply(this,arguments);},/**
    * Product unique ID
    * @property id
    * @type {String}
  */get id(){return this.attrs.product_id;},/**
    * Product title
    * @property title
    * @type {String}
  */get title(){return this.attrs.title;},/**
    * Product description. The exposes the `body_html` property on the listings API
    * @property description
    * @type {String}
  */get description(){return this.attrs.body_html;},/**
    * All images associated with product.
    * @property images
    * @type {Array} array of image objects.
  */get images(){return this.attrs.images;},get memoized(){this._memoized=this._memoized||{};return this._memoized;},/**
     *  Get array of options with nested values. Useful for creating UI for selecting options.
     *
     * ```javascript
     *  var elements = product.options.map(function(option) {
     *    return '<select name="' + option.name + '">' + option.values.map(function(value) {
     *      return '<option value="' + value + '">' + value + '</option>';
     *    }) + '</select>';
     *  });
     * ```
     *
     * @attribute options
     * @type {Array|Option}
   */get options(){if(this.memoized.options){return this.memoized.options;}var baseOptions=this.attrs.options;var variants=this.variants;this.memoized.options=baseOptions.map(function(option){var name=option.name;var dupedValues=variants.reduce(function(valueList,variant){var optionValueForOption=variant.optionValues.filter(function(optionValue){return optionValue.name===option.name;})[0];valueList.push(optionValueForOption.value);return valueList;},[]);var values=uniq(dupedValues);return new ProductOptionModel({name:name,values:values});});return this.memoized.options;},/**
    * All variants of a product.
    * @property variants
    * @type {Array|ProductVariantModel} array of ProductVariantModel instances.
  */get variants(){var _this2=this;return this.attrs.variants.map(function(variant){return new ProductVariantModel({variant:variant,product:_this2},{config:_this2.config});});},/**
    * Retrieve currently selected option values.
    * @attribute selections
    * @type {Option}
  */get selections(){return this.options.map(function(option){return option.selected;});},/**
    * Retrieve variant for currently selected options
    * @attribute selectedVariant
    * @type {Object}
  */get selectedVariant(){var variantTitle=this.selections.join(' / ');return this.variants.filter(function(variant){return variant.title===variantTitle;})[0]||null;},/**
    * Retrieve image for currently selected variantImage
    * @attribute selectedVariantImage
    * @type {Object}
  */get selectedVariantImage(){if(!this.selectedVariant){return null;}return this.selectedVariant.image;}});var ListingsSerializer=CoreObject.extend({constructor:function constructor(config){this.config=config;},rootKeyForType:function rootKeyForType(type){return type.slice(0,-1)+'_listing';},models:{collections:BaseModel,products:ProductModel},modelForType:function modelForType(type){return this.models[type];},deserializeSingle:function deserializeSingle(type){var singlePayload=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var metaAttrs=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];var modelAttrs=singlePayload[this.rootKeyForType(type)];var model=this.modelFromAttrs(type,modelAttrs,metaAttrs);return model;},deserializeMultiple:function deserializeMultiple(type){var _this3=this;var collectionPayload=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var metaAttrs=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];var models=collectionPayload[this.rootKeyForType(type)+'s'];return models.map(function(attrs){var model=_this3.modelFromAttrs(type,attrs,metaAttrs);return model;});},modelFromAttrs:function modelFromAttrs(type,attrs,metaAttrs){var Model=this.modelForType(type);metaAttrs.config=this.config;return new Model(attrs,metaAttrs);}});function authToUrl(url,opts){var authorization=void 0;if(opts.headers){Object.keys(opts.headers).forEach(function(key){if(key.toLowerCase()==='authorization'){authorization=opts.headers[key];}});}if(authorization){var hashedKey=authorization.split(' ').slice(-1)[0];try{var plainKey=atob(hashedKey);var newUrl=void 0;if(url.indexOf('?')>-1){newUrl=url+'&_x_http_authorization='+plainKey;}else{newUrl=url+'?_x_http_authorization='+plainKey;}return newUrl;}catch(e){// atob choked on non-encoded data. Therefore, not a form of auth we
// support.
//
// NOOP
//
}}/* eslint newline-before-return: 0 */return url;}function ie9Ajax(method,url,opts){return new Promise(function(resolve,reject){var xdr=new XDomainRequest();xdr.onload=function(){try{var json=JSON.parse(xdr.responseText);resolve({json:json,originalResponse:xdr,isJSON:true});}catch(e){resolve({text:xdr.responseText,originalResponse:xdr,isText:true});}};function handleError(){reject(new Error('There was an error with the XDR'));}xdr.onerror=handleError;xdr.ontimeout=handleError;xdr.open(method,authToUrl(url,opts));xdr.send(opts.data);});}function checkStatus(response){if(response.status>=200&&response.status<300){return response;}var error=new Error(response.statusText);error.status=response.status;error.response=response;throw error;}function parseResponse(response){return response.json().then(function(json){return{json:json,originalResponse:response,isJSON:true};}).catch(function(){var responseClone=response.clone();return responseClone.text().then(function(text){return{text:text,originalResponse:responseClone,isText:true};});});}function ajax(method,url){var opts=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];if(global$1.XDomainRequest){return ie9Ajax.apply(undefined,arguments);}opts.method=method;opts.mode='cors';return fetch(url,opts).then(checkStatus).then(parseResponse);}var ListingsAdapter=CoreObject.extend({ajax:ajax,constructor:function constructor(config){this.config=config;},get base64ApiKey(){return btoa(this.config.apiKey);},get baseUrl(){var _config=this.config;var domain=_config.domain;var appId=_config.appId;return'https://'+domain+'/api/apps/'+appId;},get headers(){return{Authorization:'Basic '+this.base64ApiKey,'Content-Type':'application/json','X-SDK-Variant':'javascript','X-SDK-Version':version$1};},pathForType:function pathForType(type){return'/'+type.slice(0,-1)+'_listings';},buildUrl:function buildUrl(singleOrMultiple,type,idOrQuery){switch(singleOrMultiple){case'multiple':return this.buildMultipleUrl(type,idOrQuery);case'single':return this.buildSingleUrl(type,idOrQuery);default:return'';}},buildMultipleUrl:function buildMultipleUrl(type){var query=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var url=''+this.baseUrl+this.pathForType(type);var paramNames=Object.keys(query);if(paramNames.length>0){var queryString=paramNames.map(function(key){var value=void 0;if(Array.isArray(query[key])){value=query[key].join(',');}else{value=query[key];}return key+'='+encodeURIComponent(value);}).join('&');return url+'?'+queryString;}return url;},buildSingleUrl:function buildSingleUrl(type,id){return''+this.baseUrl+this.pathForType(type)+'/'+id;},fetchMultiple:function fetchMultiple()/* type, [query] */{var url=this.buildUrl.apply(this,['multiple'].concat(Array.prototype.slice.call(arguments)));return this.ajax('GET',url,{headers:this.headers}).then(function(response){return response.json;});},fetchSingle:function fetchSingle()/* type, id */{var url=this.buildUrl.apply(this,['single'].concat(Array.prototype.slice.call(arguments)));return this.ajax('GET',url,{headers:this.headers}).then(function(response){return response.json;});}});/* eslint no-undefined: 0 complexity: 0 */var GUID_KEY='shopify-buy-uuid';var GUID_PREFIX='shopify-buy.'+Date.now();var GUID_DESC={writable:true,configurable:true,enumerable:true,value:null};var uuidSeed=0;function uuid(){return++uuidSeed;}var numberCache={};var stringCache={};function setGuidFor(obj){if(obj&&obj[GUID_KEY]){return obj[GUID_KEY];}if(obj===undefined){return'(undefined)';}if(obj===null){return'(null)';}var type=typeof obj==='undefined'?'undefined':_typeof(obj);var id=void 0;switch(type){case'number':id=numberCache[obj];if(!id){id=numberCache[obj]='nu'+obj;}break;case'string':id=stringCache[obj];if(!id){id=stringCache[obj]='st'+uuid();}break;case'boolean':if(obj){id='(true)';}else{id='(false)';}break;default:if(obj===Object){id='(Object)';break;}if(obj===Array){id='(Array)';break;}id=GUID_PREFIX+'.'+uuid();if(obj[GUID_KEY]===null){obj[GUID_KEY]=id;}else{GUID_DESC.value=id;Object.defineProperty(obj,GUID_KEY,GUID_DESC);}}return id;}var CartLineItem=BaseModel.extend({constructor:function constructor(){this.super.apply(this,arguments);},get id(){return this.attrs[GUID_KEY];},get variant_id(){return this.attrs.variant_id;},get product_id(){return this.attrs.product_id;},get image(){return this.attrs.image;},get title(){return this.attrs.title;},get quantity(){return this.attrs.quantity;},set quantity(value){var parsedValue=parseInt(value,10);if(parsedValue<0){throw new Error('Quantities must be positive');}else if(parsedValue!==parseFloat(value)){/* incidentally, this covers all NaN values, because NaN !== Nan */throw new Error('Quantities must be whole numbers');}this.attrs.quantity=parsedValue;return this.attrs.quantity;},get properties(){return this.attrs.properties||{};},set properties(value){this.attrs.properties=value||{};return value;},get variant_title(){return this.attrs.variant_title;},get price(){return this.attrs.price;},get compare_at_price(){return this.attrs.compare_at_price;},get line_price(){return(this.quantity*parseFloat(this.price)).toFixed(2);},get grams(){return this.attrs.grams;}});function objectsEqual(one,two){if(one===two){return true;}return Object.keys(one).every(function(key){if(one[key]instanceof Date){return one[key].toString()===two[key].toString();}else if(_typeof(one[key])==='object'){return objectsEqual(one[key],two[key]);}return one[key]===two[key];});}var CartModel=BaseModel.extend({constructor:function constructor(){this.super.apply(this,arguments);},/**
    * get ID for current cart
    * @property id
    * @type {String}
  */get id(){return this.attrs[GUID_KEY];},/**
    * Get current line items for cart
    * @property lineItems
    * @type {Array}
  */get lineItems(){return(this.attrs.line_items||[]).map(function(item){return new CartLineItem(item);});},/**
    * Gets the sum quantity of each line item
    * @property lineItemCount
    * @type {Number}
  */get lineItemCount(){return this.lineItems.reduce(function(total,item){return total+item.quantity;},0);},/**
    * Get current subtotal price for all line items
    * @property subtotal
    * @type {String}
  */get subtotal(){var subtotal=this.lineItems.reduce(function(runningTotal,lineItem){return runningTotal+parseFloat(lineItem.line_price);},0);return subtotal.toFixed(2);},/**
    * Get checkout URL for current cart
    * @property checkoutUrl
    * @type {String}
  */get checkoutUrl(){var config=this.config;var baseUrl='https://'+config.domain+'/cart';var variantPath=this.lineItems.map(function(item){return item.variant_id+':'+item.quantity;});var query='api_key='+config.apiKey;if(typeof global$1.ga==='function'){var linkerParam=void 0;global$1.ga(function(tracker){linkerParam=tracker.get('linkerParam');});if(linkerParam){query+='&'+linkerParam;}}return baseUrl+'/'+variantPath+'?'+query;},addVariants:function addVariants(){var newLineItems=[].concat(Array.prototype.slice.call(arguments)).map(function(item){var lineItem={image:item.variant.image,variant_id:item.variant.id,product_id:item.variant.productId,title:item.variant.productTitle,quantity:parseInt(item.quantity,10),properties:item.properties||{},variant_title:item.variant.title,price:item.variant.price,compare_at_price:item.variant.compareAtPrice,grams:item.variant.grams};setGuidFor(lineItem);return lineItem;});var existingLineItems=this.attrs.line_items;existingLineItems.push.apply(existingLineItems,_toConsumableArray(newLineItems));var dedupedLineItems=existingLineItems.reduce(function(itemAcc,item){var matchingItem=itemAcc.filter(function(existingItem){return existingItem.variant_id===item.variant_id&&objectsEqual(existingItem.properties,item.properties);})[0];if(matchingItem){matchingItem.quantity=matchingItem.quantity+item.quantity;}else{itemAcc.push(item);}return itemAcc;},[]);// Users may pass negative numbers and remove items. This ensures there's no
// item with a quantity of zero or less.
this.attrs.line_items=dedupedLineItems.reduce(function(itemAcc,item){if(item.quantity>=1){itemAcc.push(item);}return itemAcc;},[]);return this.updateModel();},updateLineItem:function updateLineItem(id,quantity){if(quantity<1){return this.removeLineItem(id);}var lineItem=this.lineItems.filter(function(item){return item.id===id;})[0];if(lineItem){lineItem.quantity=quantity;return this.updateModel();}return new Promise(function(resolve,reject){reject(new Error('line item with id: '+id+' not found in cart#'+this.id));});},removeLineItem:function removeLineItem(id){var oldLength=this.lineItems.length;var newLineItems=this.lineItems.filter(function(item){return item.id!==id;});var newLength=newLineItems.length;if(newLength<oldLength){this.attrs.line_items=newLineItems.map(function(item){return item.attrs;});return this.updateModel();}return new Promise(function(resolve,reject){reject(new Error('line item with id: '+id+' not found in cart#'+this.id));});},clearLineItems:function clearLineItems(){this.attrs.line_items=[];return this.updateModel();},updateModel:function updateModel(){var _this4=this;return this.shopClient.update('carts',this).then(function(updateCart){assign$1(_this4.attrs,updateCart.attrs);return _this4;});}});var CartSerializer=CoreObject.extend({constructor:function constructor(config){this.config=config;},rootKeyForType:function rootKeyForType(type){return type.slice(0,-1);},modelForType:function modelForType()/* type */{return CartModel;},deserializeSingle:function deserializeSingle(type){var singlePayload=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var metaAttrs=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];var modelAttrs=singlePayload[this.rootKeyForType(type)];var model=this.modelFromAttrs(type,modelAttrs,metaAttrs);return model;},modelFromAttrs:function modelFromAttrs(type,attrs,metaAttrs){var Model=this.modelForType(type);metaAttrs.config=this.config;return new Model(attrs,metaAttrs);},serialize:function serialize(type,model){var root=this.rootKeyForType(type);var payload={};var attrs=assign$1({},model.attrs);payload[root]=attrs;delete attrs.attributes;Object.keys(attrs).forEach(function(key){var value=attrs[key];if(value===null||typeof value==='string'&&value.length===0){delete attrs[key];}});return payload;}});var ReferenceModel=BaseModel.extend({constructor:function constructor(attrs){if(Object.keys(attrs).indexOf('referenceId')<0){throw new Error('Missing key referenceId of reference. References to null are not allowed');}this.super.apply(this,arguments);},/**
    * get the ID for current reference (not what it refers to, but its own unique identifier)
    * @property id
    * @type {String}
  */get id(){return this.attrs[GUID_KEY];},get referenceId(){return this.attrs.referenceId;},set referenceId(value){this.attrs.referenceId=value;return value;}});var ReferenceSerializer=CoreObject.extend({constructor:function constructor(config){this.config=config;},modelForType:function modelForType()/* type */{return ReferenceModel;},deserializeSingle:function deserializeSingle(type){var singlePayload=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var metaAttrs=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];var Model=this.modelForType(type);return new Model(singlePayload,metaAttrs);},serialize:function serialize(type,model){var attrs=assign$1({},model.attrs);return attrs;}});var Store=CoreObject.extend({constructor:function constructor(){this.localStorageAvailable=this.storageAvailable('localStorage');this.cache={};},setItem:function setItem(key,value){if(this.localStorageAvailable){localStorage.setItem(key,JSON.stringify(value));}else{this.cache[key]=value;}return value;},getItem:function getItem(key){if(this.localStorageAvailable){var stringValue=localStorage.getItem(key);try{return JSON.parse(stringValue);}catch(e){return null;}}else{return this.cache[key]||null;}},storageAvailable:function storageAvailable(type){try{var storage=global$1[type];var x='__storage_test__';storage.setItem(x,x);storage.removeItem(x);return true;}catch(e){return false;}}});var LocalStorageAdapter=CoreObject.extend({constructor:function constructor(){this.store=new Store();},idKeyForType:function idKeyForType()/* type */{return GUID_KEY;},fetchSingle:function fetchSingle(type,id){var _this5=this;return new Promise(function(resolve,reject){var value=_this5.store.getItem(_this5.storageKey(type,id));if(value===null){reject(new Error(type+'#'+id+' not found'));return;}resolve(value);});},create:function create(type,payload){var _this6=this;return new Promise(function(resolve){var id=_this6.identify(payload);_this6.store.setItem(_this6.storageKey(type,id),payload);resolve(payload);});},update:function update(type,id,payload){var _this7=this;return new Promise(function(resolve){_this7.store.setItem(_this7.storageKey(type,id),payload);resolve(payload);});},storageKey:function storageKey(type,id){return type+'.'+id;},identify:function identify(payload){var keys=Object.keys(payload);if(keys.length===1&&_typeof(payload[keys[0]])==='object'){return setGuidFor(payload[keys[0]]);}return setGuidFor(payload);}});/**
 * @module shopify-buy
 * @submodule shop-client
 */function fetchFactory(fetchType,type){var func=void 0;switch(fetchType){case'all':func=function func(){return this.fetchAll(type);};break;case'one':func=function func(){return this.fetch.apply(this,[type].concat(Array.prototype.slice.call(arguments)));};break;case'query':func=function func(){return this.fetchQuery.apply(this,[type].concat(Array.prototype.slice.call(arguments)));};break;}return func;}var ShopClient=CoreObject.extend({constructor:function constructor(config){this.config=config;this.serializers={products:ListingsSerializer,collections:ListingsSerializer,carts:CartSerializer,references:ReferenceSerializer};this.adapters={products:ListingsAdapter,collections:ListingsAdapter,carts:LocalStorageAdapter,references:LocalStorageAdapter};},config:null,/**
   * @attribute
   * @default {
   *  products: ListingsAdapter,
   *  collections: ListingsAdapter,
   *  carts: CartAdapter
   * }
   * @type Object
   * @protected
   */// Prevent leaky state
get serializers(){return assign$1({},this.shadowedSerializers);},set serializers(values){this.shadowedSerializers=assign$1({},values);},get adapters(){return assign$1({},this.shadowedAdapters);},set adapters(values){this.shadowedAdapters=assign$1({},values);},fetchAll:function fetchAll(type){var _this8=this;var adapter=new this.adapters[type](this.config);return adapter.fetchMultiple(type).then(function(payload){return _this8.deserialize(type,payload,adapter,null,{multiple:true});});},fetch:function fetch(type,id){var _this9=this;var adapter=new this.adapters[type](this.config);return adapter.fetchSingle(type,id).then(function(payload){return _this9.deserialize(type,payload,adapter,null,{single:true});});},fetchQuery:function fetchQuery(type,query){var _this10=this;var adapter=new this.adapters[type](this.config);return adapter.fetchMultiple(type,query).then(function(payload){return _this10.deserialize(type,payload,adapter,null,{multiple:true});});},create:function create(type){var _this11=this;var modelAttrs=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];var adapter=new this.adapters[type](this.config);var serializer=new this.serializers[type](this.config);var Model=serializer.modelForType(type);var model=new Model(modelAttrs,{shopClient:this});var attrs=serializer.serialize(type,model);return adapter.create(type,attrs).then(function(payload){return _this11.deserialize(type,payload,adapter,serializer,{single:true});});},update:function update(type,updatedModel){var _this12=this;var adapter=updatedModel.adapter;var serializer=updatedModel.serializer;var serializedModel=serializer.serialize(type,updatedModel);var id=updatedModel.attrs[adapter.idKeyForType(type)];return adapter.update(type,id,serializedModel).then(function(payload){return _this12.deserialize(type,payload,adapter,serializer,{single:true});});},deserialize:function deserialize(type,payload,adapter,existingSerializer){var opts=arguments.length<=4||arguments[4]===undefined?{}:arguments[4];var serializer=existingSerializer||new this.serializers[type](this.config);var meta={shopClient:this,adapter:adapter,serializer:serializer,type:type};var serializedPayload=void 0;if(opts.multiple){serializedPayload=serializer.deserializeMultiple(type,payload,meta);}else{serializedPayload=serializer.deserializeSingle(type,payload,meta);}return serializedPayload;},createCart:function createCart(){var userAttrs=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var baseAttrs={line_items:[]};var attrs={};assign$1(attrs,baseAttrs);assign$1(attrs,userAttrs);return this.create('carts',attrs);},updateCart:function updateCart(updatedCart){return this.update('carts',updatedCart);},/**
   * Retrieve a previously created cart by its key.
   *
   * ```javascript
   * client.fetchCart('shopify-buy.1459804699118.2').then(cart => {
   *   console.log(cart); // The retrieved cart
   * });
   *
   * @method fetchCart
   * @public
   * @param {String} id The cart's unique identifier
   * @return {Promise|CartModel} The cart model.
   *
   */fetchCart:fetchFactory('one','carts'),/**
   * Convenience wrapper for {{#crossLink "ShopClient/fetchAll:method"}}
   * {{/crossLink}}. Equivalent to:
   *
   * ```javascript
   * client.fetchAll('products');
   * ```
   *
   * @method fetchAllProducts
   * @private
   * @return {Promise|Array} The product models.
   */fetchAllProducts:fetchFactory('all','products'),/**
   * Convenience wrapper for {{#crossLink "ShopClient/fetchAll:method"}}
   * {{/crossLink}}. Equivalent to:
   *
   * ```javascript
   * client.fetchAll('collections');
   * ```
   *
   * @method fetchAllCollections
   * @private
   * @return {Promise|Array} The collection models.
   */fetchAllCollections:fetchFactory('all','collections'),/**
   * Fetch one product by its ID.
   *
   * ```javascript
   * client.fetchProduct(123).then(product => {
   *   console.log(product); // The product with an ID of 123
   * });
   * ```
   *
   * @method fetchProduct
   * @public
   * @param {String|Number} id a unique identifier
   * @return {Promise|BaseModel} The product model with the specified ID.
   */fetchProduct:fetchFactory('one','products'),/**
   * Fetch one collection by its ID.
   *
   * ```javascript
   * client.fetchCollection(123).then(collection => {
   *   console.log(collection); // The collection with an ID of 123
   * });
   * ```
   *
   * @method fetchCollection
   * @public
   * @param {String|Number} id a unique identifier
   * @return {Promise|BaseModel} The collection model with the specified ID.
   */fetchCollection:fetchFactory('one','collections'),/**
   * Fetches a list of products matching a specified query.
   *
   * ```javascript
   * client.fetchQueryProducts({ collection_id: 123, tag: ['hats'] }).then(products => {
   *   console.log(products); // An array of products in collection `123` having the tag `hats`
   * });
   * ```
   * @method fetchQueryProducts
   * @public
   * @param {Object} query A query sent to the api server containing one or more of:
   *   @param {String|Number} [query.collection_id] The ID of a collection to retrieve products from
   *   @param {Array} [query.tag] A list of tags to filter the products by. Accepts up to 10 tags.
   *   @param {Array} [query.product_ids] A list of product IDs to retrieve
   *   @param {String|Number} [query.page=1] The page offset number of the current lookup (based on the `limit`)
   *   @param {String|Number} [query.limit=50] The number of products to retrieve per page
   *   @param {String} [query.handle] The handle of the product to look up
   *   @param {String} [query.updated_at_min] Products updated since the supplied timestamp (format: 2008-12-31 03:00)
   * @return {Promise|Array} The product models.
   */fetchQueryProducts:fetchFactory('query','products'),/**
   * Fetches a list of collections matching a specified query.
   *
   * ```javascript
   * client.fetchQueryCollections({page: 2, limit: 20}).then(collections => {
   *   console.log(collections); // An array of collection resources
   * });
   * ```
   *
   * @method fetchQueryCollections
   * @public
   * @param {Object} query a query sent to the api server.
   *   @param {String|Number} [query.page=1] the page offset number of the current lookup (based on the `limit`)
   *   @param {String|Number} [query.limit=50] the number of collections to retrieve per page
   * @return {Promise|Array} The collection models.
   */fetchQueryCollections:fetchFactory('query','collections'),fetchRecentCart:function fetchRecentCart(){var _this13=this;return this.fetch('references',this.config.domain+'.recent-cart').then(function(reference){var cartId=reference.referenceId;return _this13.fetchCart(cartId);}).catch(function(){return _this13.createCart().then(function(cart){var refAttrs={referenceId:cart.id};refAttrs[GUID_KEY]=_this13.config.domain+'.recent-cart';_this13.create('references',refAttrs);return cart;});});}});function isNodeLikeEnvironment(){var windowAbsent=typeof window==='undefined';var requirePresent=typeof require==='function';return windowAbsent&&requirePresent;}var fetch$1=global$1.fetch;if(!fetch$1&&isNodeLikeEnvironment()){/* this indirection is needed because babel throws errors when
   * transpiling require('node-fetch') using `amd` plugin with babel6
   */var localRequire=require;global$1.fetch=localRequire('node-fetch');global$1.Response=global$1.fetch.Response;}var btoa$1=global$1.btoa;if(!btoa$1&&isNodeLikeEnvironment()){global$1.btoa=function(string){return new Buffer(string).toString('base64');};}/**
 * @module shopify-buy
 * @submodule shopify
 *//**
 * This namespace contains all globally accessible classes
 * @class ShopifyBuy
 * @static
 */var Shopify={ShopClient:ShopClient,Config:Config,version:version$1,NO_IMAGE_URI:NO_IMAGE_URI,buildClient:function buildClient(){var configAttrs=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var config=new this.Config(configAttrs);return new this.ShopClient(config);}};module.exports=Shopify;});
