/*!
  * Bootstrap Material Design v4.0.0 (https://github.com/FezVrasta/bootstrap-material-design)
  * Copyright 2014-2016 Federico Zivolo
  * Licensed under MIT (https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, function () { 'use strict';

  var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }


  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers;

  var polyfill=__commonjs(function(module,exports,global){(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;})({1:[function(_dereq_,module,exports){(function(global){ /* eslint max-len: 0 */"use strict";var _Object$defineProperty=_dereq_(3)["default"];_dereq_(284);_dereq_(2); // Should be removed in the next major release:
  _dereq_(6);if(global._babelPolyfill){throw new Error("only one instance of babel-polyfill is allowed");}global._babelPolyfill=true;function define(O,key,value){O[key]||_Object$defineProperty(O,key,{writable:true,configurable:true,value:value});}define(String.prototype,"padLeft","".padStart);define(String.prototype,"padRight","".padEnd);"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function(key){[][key]&&define(Array,key,Function.call.bind([][key]));});}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"2":2,"284":284,"3":3,"6":6}],2:[function(_dereq_,module,exports){module.exports=_dereq_(285);},{"285":285}],3:[function(_dereq_,module,exports){module.exports={"default":_dereq_(4),__esModule:true};},{"4":4}],4:[function(_dereq_,module,exports){var $=_dereq_(5);module.exports=function defineProperty(it,key,desc){return $.setDesc(it,key,desc);};},{"5":5}],5:[function(_dereq_,module,exports){var $Object=Object;module.exports={create:$Object.create,getProto:$Object.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:$Object.getOwnPropertyDescriptor,setDesc:$Object.defineProperty,setDescs:$Object.defineProperties,getKeys:$Object.keys,getNames:$Object.getOwnPropertyNames,getSymbols:$Object.getOwnPropertySymbols,each:[].forEach};},{}],6:[function(_dereq_,module,exports){_dereq_(118);module.exports=_dereq_(26).RegExp.escape;},{"118":118,"26":26}],7:[function(_dereq_,module,exports){module.exports=function(it){if(typeof it!='function')throw TypeError(it+' is not a function!');return it;};},{}],8:[function(_dereq_,module,exports){var cof=_dereq_(21);module.exports=function(it,msg){if(typeof it!='number'&&cof(it)!='Number')throw TypeError(msg);return +it;};},{"21":21}],9:[function(_dereq_,module,exports){ // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES=_dereq_(115)('unscopables'),ArrayProto=Array.prototype;if(ArrayProto[UNSCOPABLES]==undefined)_dereq_(41)(ArrayProto,UNSCOPABLES,{});module.exports=function(key){ArrayProto[UNSCOPABLES][key]=true;};},{"115":115,"41":41}],10:[function(_dereq_,module,exports){module.exports=function(it,Constructor,name,forbiddenField){if(!(it instanceof Constructor)||forbiddenField!==undefined&&forbiddenField in it){throw TypeError(name+': incorrect invocation!');}return it;};},{}],11:[function(_dereq_,module,exports){var isObject=_dereq_(50);module.exports=function(it){if(!isObject(it))throw TypeError(it+' is not an object!');return it;};},{"50":50}],12:[function(_dereq_,module,exports){ // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
  'use strict';var toObject=_dereq_(109),toIndex=_dereq_(105),toLength=_dereq_(108);module.exports=[].copyWithin||function copyWithin(target /*= 0*/,start /*= 0, end = @length*/){var O=toObject(this),len=toLength(O.length),to=toIndex(target,len),from=toIndex(start,len),end=arguments.length>2?arguments[2]:undefined,count=Math.min((end===undefined?len:toIndex(end,len))-from,len-to),inc=1;if(from<to&&to<from+count){inc=-1;from+=count-1;to+=count-1;}while(count-->0){if(from in O)O[to]=O[from];else delete O[to];to+=inc;from+=inc;}return O;};},{"105":105,"108":108,"109":109}],13:[function(_dereq_,module,exports){ // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
  'use strict';var toObject=_dereq_(109),toIndex=_dereq_(105),toLength=_dereq_(108);module.exports=function fill(value /*, start = 0, end = @length */){var O=toObject(this),length=toLength(O.length),aLen=arguments.length,index=toIndex(aLen>1?arguments[1]:undefined,length),end=aLen>2?arguments[2]:undefined,endPos=end===undefined?length:toIndex(end,length);while(endPos>index){O[index++]=value;}return O;};},{"105":105,"108":108,"109":109}],14:[function(_dereq_,module,exports){var forOf=_dereq_(38);module.exports=function(iter,ITERATOR){var result=[];forOf(iter,false,result.push,result,ITERATOR);return result;};},{"38":38}],15:[function(_dereq_,module,exports){ // false -> Array#indexOf
  // true  -> Array#includes
  var toIObject=_dereq_(107),toLength=_dereq_(108),toIndex=_dereq_(105);module.exports=function(IS_INCLUDES){return function($this,el,fromIndex){var O=toIObject($this),length=toLength(O.length),index=toIndex(fromIndex,length),value; // Array#includes uses SameValueZero equality algorithm
  if(IS_INCLUDES&&el!=el)while(length>index){value=O[index++];if(value!=value)return true; // Array#toIndex ignores holes, Array#includes - not
  }else for(;length>index;index++){if(IS_INCLUDES||index in O){if(O[index]===el)return IS_INCLUDES||index;}}return !IS_INCLUDES&&-1;};};},{"105":105,"107":107,"108":108}],16:[function(_dereq_,module,exports){ // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex
  var ctx=_dereq_(27),IObject=_dereq_(46),toObject=_dereq_(109),toLength=_dereq_(108),asc=_dereq_(18);module.exports=function(TYPE,$create){var IS_MAP=TYPE==1,IS_FILTER=TYPE==2,IS_SOME=TYPE==3,IS_EVERY=TYPE==4,IS_FIND_INDEX=TYPE==6,NO_HOLES=TYPE==5||IS_FIND_INDEX,create=$create||asc;return function($this,callbackfn,that){var O=toObject($this),self=IObject(O),f=ctx(callbackfn,that,3),length=toLength(self.length),index=0,result=IS_MAP?create($this,length):IS_FILTER?create($this,0):undefined,val,res;for(;length>index;index++){if(NO_HOLES||index in self){val=self[index];res=f(val,index,O);if(TYPE){if(IS_MAP)result[index]=res; // map
  else if(res)switch(TYPE){case 3:return true; // some
  case 5:return val; // find
  case 6:return index; // findIndex
  case 2:result.push(val); // filter
  }else if(IS_EVERY)return false; // every
  }}}return IS_FIND_INDEX?-1:IS_SOME||IS_EVERY?IS_EVERY:result;};};},{"108":108,"109":109,"18":18,"27":27,"46":46}],17:[function(_dereq_,module,exports){var aFunction=_dereq_(7),toObject=_dereq_(109),IObject=_dereq_(46),toLength=_dereq_(108);module.exports=function(that,callbackfn,aLen,memo,isRight){aFunction(callbackfn);var O=toObject(that),self=IObject(O),length=toLength(O.length),index=isRight?length-1:0,i=isRight?-1:1;if(aLen<2)for(;;){if(index in self){memo=self[index];index+=i;break;}index+=i;if(isRight?index<0:length<=index){throw TypeError('Reduce of empty array with no initial value');}}for(;isRight?index>=0:length>index;index+=i){if(index in self){memo=callbackfn(memo,self[index],index,O);}}return memo;};},{"108":108,"109":109,"46":46,"7":7}],18:[function(_dereq_,module,exports){ // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
  var isObject=_dereq_(50),isArray=_dereq_(48),SPECIES=_dereq_(115)('species');module.exports=function(original,length){var C;if(isArray(original)){C=original.constructor; // cross-realm fallback
  if(typeof C=='function'&&(C===Array||isArray(C.prototype)))C=undefined;if(isObject(C)){C=C[SPECIES];if(C===null)C=undefined;}}return new (C===undefined?Array:C)(length);};},{"115":115,"48":48,"50":50}],19:[function(_dereq_,module,exports){'use strict';var aFunction=_dereq_(7),isObject=_dereq_(50),invoke=_dereq_(45),arraySlice=[].slice,factories={};var construct=function construct(F,len,args){if(!(len in factories)){for(var n=[],i=0;i<len;i++){n[i]='a['+i+']';}factories[len]=Function('F,a','return new F('+n.join(',')+')');}return factories[len](F,args);};module.exports=Function.bind||function bind(that /*, args... */){var fn=aFunction(this),partArgs=arraySlice.call(arguments,1);var bound=function bound() /* args... */{var args=partArgs.concat(arraySlice.call(arguments));return this instanceof bound?construct(fn,args.length,args):invoke(fn,args,that);};if(isObject(fn.prototype))bound.prototype=fn.prototype;return bound;};},{"45":45,"50":50,"7":7}],20:[function(_dereq_,module,exports){ // getting tag from 19.1.3.6 Object.prototype.toString()
  var cof=_dereq_(21),TAG=_dereq_(115)('toStringTag') // ES3 wrong here
  ,ARG=cof(function(){return arguments;}())=='Arguments'; // fallback for IE11 Script Access Denied error
  var tryGet=function tryGet(it,key){try{return it[key];}catch(e){ /* empty */}};module.exports=function(it){var O,T,B;return it===undefined?'Undefined':it===null?'Null' // @@toStringTag case
  :typeof (T=tryGet(O=Object(it),TAG))=='string'?T // builtinTag case
  :ARG?cof(O) // ES3 arguments fallback
  :(B=cof(O))=='Object'&&typeof O.callee=='function'?'Arguments':B;};},{"115":115,"21":21}],21:[function(_dereq_,module,exports){var toString={}.toString;module.exports=function(it){return toString.call(it).slice(8,-1);};},{}],22:[function(_dereq_,module,exports){'use strict';var dP=_dereq_(68).f,create=_dereq_(67),hide=_dereq_(41),redefineAll=_dereq_(86),ctx=_dereq_(27),anInstance=_dereq_(10),defined=_dereq_(28),forOf=_dereq_(38),$iterDefine=_dereq_(54),step=_dereq_(56),setSpecies=_dereq_(91),DESCRIPTORS=_dereq_(29),fastKey=_dereq_(63).fastKey,SIZE=DESCRIPTORS?'_s':'size';var getEntry=function getEntry(that,key){ // fast case
  var index=fastKey(key),entry;if(index!=='F')return that._i[index]; // frozen object case
  for(entry=that._f;entry;entry=entry.n){if(entry.k==key)return entry;}};module.exports={getConstructor:function getConstructor(wrapper,NAME,IS_MAP,ADDER){var C=wrapper(function(that,iterable){anInstance(that,C,NAME,'_i');that._i=create(null); // index
  that._f=undefined; // first entry
  that._l=undefined; // last entry
  that[SIZE]=0; // size
  if(iterable!=undefined)forOf(iterable,IS_MAP,that[ADDER],that);});redefineAll(C.prototype,{ // 23.1.3.1 Map.prototype.clear()
  // 23.2.3.2 Set.prototype.clear()
  clear:function clear(){for(var that=this,data=that._i,entry=that._f;entry;entry=entry.n){entry.r=true;if(entry.p)entry.p=entry.p.n=undefined;delete data[entry.i];}that._f=that._l=undefined;that[SIZE]=0;}, // 23.1.3.3 Map.prototype.delete(key)
  // 23.2.3.4 Set.prototype.delete(value)
  'delete':function _delete(key){var that=this,entry=getEntry(that,key);if(entry){var next=entry.n,prev=entry.p;delete that._i[entry.i];entry.r=true;if(prev)prev.n=next;if(next)next.p=prev;if(that._f==entry)that._f=next;if(that._l==entry)that._l=prev;that[SIZE]--;}return !!entry;}, // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
  // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
  forEach:function forEach(callbackfn /*, that = undefined */){anInstance(this,C,'forEach');var f=ctx(callbackfn,arguments.length>1?arguments[1]:undefined,3),entry;while(entry=entry?entry.n:this._f){f(entry.v,entry.k,this); // revert to the last existing entry
  while(entry&&entry.r){entry=entry.p;}}}, // 23.1.3.7 Map.prototype.has(key)
  // 23.2.3.7 Set.prototype.has(value)
  has:function has(key){return !!getEntry(this,key);}});if(DESCRIPTORS)dP(C.prototype,'size',{get:function get(){return defined(this[SIZE]);}});return C;},def:function def(that,key,value){var entry=getEntry(that,key),prev,index; // change existing entry
  if(entry){entry.v=value; // create new entry
  }else {that._l=entry={i:index=fastKey(key,true), // <- index
  k:key, // <- key
  v:value, // <- value
  p:prev=that._l, // <- previous entry
  n:undefined, // <- next entry
  r:false // <- removed
  };if(!that._f)that._f=entry;if(prev)prev.n=entry;that[SIZE]++; // add to index
  if(index!=='F')that._i[index]=entry;}return that;},getEntry:getEntry,setStrong:function setStrong(C,NAME,IS_MAP){ // add .keys, .values, .entries, [@@iterator]
  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
  $iterDefine(C,NAME,function(iterated,kind){this._t=iterated; // target
  this._k=kind; // kind
  this._l=undefined; // previous
  },function(){var that=this,kind=that._k,entry=that._l; // revert to the last existing entry
  while(entry&&entry.r){entry=entry.p;} // get next entry
  if(!that._t||!(that._l=entry=entry?entry.n:that._t._f)){ // or finish the iteration
  that._t=undefined;return step(1);} // return step by kind
  if(kind=='keys')return step(0,entry.k);if(kind=='values')return step(0,entry.v);return step(0,[entry.k,entry.v]);},IS_MAP?'entries':'values',!IS_MAP,true); // add [@@species], 23.1.2.2, 23.2.2.2
  setSpecies(NAME);}};},{"10":10,"27":27,"28":28,"29":29,"38":38,"41":41,"54":54,"56":56,"63":63,"67":67,"68":68,"86":86,"91":91}],23:[function(_dereq_,module,exports){ // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var classof=_dereq_(20),from=_dereq_(14);module.exports=function(NAME){return function toJSON(){if(classof(this)!=NAME)throw TypeError(NAME+"#toJSON isn't generic");return from(this);};};},{"14":14,"20":20}],24:[function(_dereq_,module,exports){'use strict';var redefineAll=_dereq_(86),getWeak=_dereq_(63).getWeak,anObject=_dereq_(11),isObject=_dereq_(50),anInstance=_dereq_(10),forOf=_dereq_(38),createArrayMethod=_dereq_(16),$has=_dereq_(40),arrayFind=createArrayMethod(5),arrayFindIndex=createArrayMethod(6),id=0; // fallback for uncaught frozen keys
  var uncaughtFrozenStore=function uncaughtFrozenStore(that){return that._l||(that._l=new UncaughtFrozenStore());};var UncaughtFrozenStore=function UncaughtFrozenStore(){this.a=[];};var findUncaughtFrozen=function findUncaughtFrozen(store,key){return arrayFind(store.a,function(it){return it[0]===key;});};UncaughtFrozenStore.prototype={get:function get(key){var entry=findUncaughtFrozen(this,key);if(entry)return entry[1];},has:function has(key){return !!findUncaughtFrozen(this,key);},set:function set(key,value){var entry=findUncaughtFrozen(this,key);if(entry)entry[1]=value;else this.a.push([key,value]);},'delete':function _delete(key){var index=arrayFindIndex(this.a,function(it){return it[0]===key;});if(~index)this.a.splice(index,1);return !! ~index;}};module.exports={getConstructor:function getConstructor(wrapper,NAME,IS_MAP,ADDER){var C=wrapper(function(that,iterable){anInstance(that,C,NAME,'_i');that._i=id++; // collection id
  that._l=undefined; // leak store for uncaught frozen objects
  if(iterable!=undefined)forOf(iterable,IS_MAP,that[ADDER],that);});redefineAll(C.prototype,{ // 23.3.3.2 WeakMap.prototype.delete(key)
  // 23.4.3.3 WeakSet.prototype.delete(value)
  'delete':function _delete(key){if(!isObject(key))return false;var data=getWeak(key);if(data===true)return uncaughtFrozenStore(this)['delete'](key);return data&&$has(data,this._i)&&delete data[this._i];}, // 23.3.3.4 WeakMap.prototype.has(key)
  // 23.4.3.4 WeakSet.prototype.has(value)
  has:function has(key){if(!isObject(key))return false;var data=getWeak(key);if(data===true)return uncaughtFrozenStore(this).has(key);return data&&$has(data,this._i);}});return C;},def:function def(that,key,value){var data=getWeak(anObject(key),true);if(data===true)uncaughtFrozenStore(that).set(key,value);else data[that._i]=value;return that;},ufstore:uncaughtFrozenStore};},{"10":10,"11":11,"16":16,"38":38,"40":40,"50":50,"63":63,"86":86}],25:[function(_dereq_,module,exports){'use strict';var global=_dereq_(39),$export=_dereq_(33),redefine=_dereq_(87),redefineAll=_dereq_(86),meta=_dereq_(63),forOf=_dereq_(38),anInstance=_dereq_(10),isObject=_dereq_(50),fails=_dereq_(35),$iterDetect=_dereq_(55),setToStringTag=_dereq_(92),inheritIfRequired=_dereq_(44);module.exports=function(NAME,wrapper,methods,common,IS_MAP,IS_WEAK){var Base=global[NAME],C=Base,ADDER=IS_MAP?'set':'add',proto=C&&C.prototype,O={};var fixMethod=function fixMethod(KEY){var fn=proto[KEY];redefine(proto,KEY,KEY=='delete'?function(a){return IS_WEAK&&!isObject(a)?false:fn.call(this,a===0?0:a);}:KEY=='has'?function has(a){return IS_WEAK&&!isObject(a)?false:fn.call(this,a===0?0:a);}:KEY=='get'?function get(a){return IS_WEAK&&!isObject(a)?undefined:fn.call(this,a===0?0:a);}:KEY=='add'?function add(a){fn.call(this,a===0?0:a);return this;}:function set(a,b){fn.call(this,a===0?0:a,b);return this;});};if(typeof C!='function'||!(IS_WEAK||proto.forEach&&!fails(function(){new C().entries().next();}))){ // create collection constructor
  C=common.getConstructor(wrapper,NAME,IS_MAP,ADDER);redefineAll(C.prototype,methods);meta.NEED=true;}else {var instance=new C() // early implementations not supports chaining
  ,HASNT_CHAINING=instance[ADDER](IS_WEAK?{}:-0,1)!=instance // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
  ,THROWS_ON_PRIMITIVES=fails(function(){instance.has(1);}) // most early implementations doesn't supports iterables, most modern - not close it correctly
  ,ACCEPT_ITERABLES=$iterDetect(function(iter){new C(iter);}) // eslint-disable-line no-new
  // for early implementations -0 and +0 not the same
  ,BUGGY_ZERO=!IS_WEAK&&fails(function(){ // V8 ~ Chromium 42- fails only with 5+ elements
  var $instance=new C(),index=5;while(index--){$instance[ADDER](index,index);}return !$instance.has(-0);});if(!ACCEPT_ITERABLES){C=wrapper(function(target,iterable){anInstance(target,C,NAME);var that=inheritIfRequired(new Base(),target,C);if(iterable!=undefined)forOf(iterable,IS_MAP,that[ADDER],that);return that;});C.prototype=proto;proto.constructor=C;}if(THROWS_ON_PRIMITIVES||BUGGY_ZERO){fixMethod('delete');fixMethod('has');IS_MAP&&fixMethod('get');}if(BUGGY_ZERO||HASNT_CHAINING)fixMethod(ADDER); // weak collections should not contains .clear method
  if(IS_WEAK&&proto.clear)delete proto.clear;}setToStringTag(C,NAME);O[NAME]=C;$export($export.G+$export.W+$export.F*(C!=Base),O);if(!IS_WEAK)common.setStrong(C,NAME,IS_MAP);return C;};},{"10":10,"33":33,"35":35,"38":38,"39":39,"44":44,"50":50,"55":55,"63":63,"86":86,"87":87,"92":92}],26:[function(_dereq_,module,exports){var core=module.exports={version:'2.1.4'};if(typeof __e=='number')__e=core; // eslint-disable-line no-undef
  },{}],27:[function(_dereq_,module,exports){ // optional / simple context binding
  var aFunction=_dereq_(7);module.exports=function(fn,that,length){aFunction(fn);if(that===undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a);};case 2:return function(a,b){return fn.call(that,a,b);};case 3:return function(a,b,c){return fn.call(that,a,b,c);};}return function() /* ...args */{return fn.apply(that,arguments);};};},{"7":7}],28:[function(_dereq_,module,exports){ // 7.2.1 RequireObjectCoercible(argument)
  module.exports=function(it){if(it==undefined)throw TypeError("Can't call method on  "+it);return it;};},{}],29:[function(_dereq_,module,exports){ // Thank's IE8 for his funny defineProperty
  module.exports=!_dereq_(35)(function(){return Object.defineProperty({},'a',{get:function get(){return 7;}}).a!=7;});},{"35":35}],30:[function(_dereq_,module,exports){var isObject=_dereq_(50),document=_dereq_(39).document // in old IE typeof document.createElement is 'object'
  ,is=isObject(document)&&isObject(document.createElement);module.exports=function(it){return is?document.createElement(it):{};};},{"39":39,"50":50}],31:[function(_dereq_,module,exports){ // IE 8- don't enum bug keys
  module.exports='constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');},{}],32:[function(_dereq_,module,exports){ // all enumerable object keys, includes symbols
  var getKeys=_dereq_(76),gOPS=_dereq_(73),pIE=_dereq_(77);module.exports=function(it){var result=getKeys(it),getSymbols=gOPS.f;if(getSymbols){var symbols=getSymbols(it),isEnum=pIE.f,i=0,key;while(symbols.length>i){if(isEnum.call(it,key=symbols[i++]))result.push(key);}}return result;};},{"73":73,"76":76,"77":77}],33:[function(_dereq_,module,exports){var global=_dereq_(39),core=_dereq_(26),hide=_dereq_(41),redefine=_dereq_(87),ctx=_dereq_(27),PROTOTYPE='prototype';var $export=function $export(type,name,source){var IS_FORCED=type&$export.F,IS_GLOBAL=type&$export.G,IS_STATIC=type&$export.S,IS_PROTO=type&$export.P,IS_BIND=type&$export.B,target=IS_GLOBAL?global:IS_STATIC?global[name]||(global[name]={}):(global[name]||{})[PROTOTYPE],exports=IS_GLOBAL?core:core[name]||(core[name]={}),expProto=exports[PROTOTYPE]||(exports[PROTOTYPE]={}),key,own,out,exp;if(IS_GLOBAL)source=name;for(key in source){ // contains in native
  own=!IS_FORCED&&target&&target[key]!==undefined; // export native or passed
  out=(own?target:source)[key]; // bind timers to global for call from export context
  exp=IS_BIND&&own?ctx(out,global):IS_PROTO&&typeof out=='function'?ctx(Function.call,out):out; // extend global
  if(target)redefine(target,key,out,type&$export.U); // export
  if(exports[key]!=out)hide(exports,key,exp);if(IS_PROTO&&expProto[key]!=out)expProto[key]=out;}};global.core=core; // type bitmap
  $export.F=1; // forced
  $export.G=2; // global
  $export.S=4; // static
  $export.P=8; // proto
  $export.B=16; // bind
  $export.W=32; // wrap
  $export.U=64; // safe
  $export.R=128; // real proto method for `library` 
  module.exports=$export;},{"26":26,"27":27,"39":39,"41":41,"87":87}],34:[function(_dereq_,module,exports){var MATCH=_dereq_(115)('match');module.exports=function(KEY){var re=/./;try{'/./'[KEY](re);}catch(e){try{re[MATCH]=false;return !'/./'[KEY](re);}catch(f){ /* empty */}}return true;};},{"115":115}],35:[function(_dereq_,module,exports){module.exports=function(exec){try{return !!exec();}catch(e){return true;}};},{}],36:[function(_dereq_,module,exports){'use strict';var hide=_dereq_(41),redefine=_dereq_(87),fails=_dereq_(35),defined=_dereq_(28),wks=_dereq_(115);module.exports=function(KEY,length,exec){var SYMBOL=wks(KEY),fns=exec(defined,SYMBOL,''[KEY]),strfn=fns[0],rxfn=fns[1];if(fails(function(){var O={};O[SYMBOL]=function(){return 7;};return ''[KEY](O)!=7;})){redefine(String.prototype,KEY,strfn);hide(RegExp.prototype,SYMBOL,length==2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
  // 21.2.5.11 RegExp.prototype[@@split](string, limit)
  ?function(string,arg){return rxfn.call(string,this,arg);} // 21.2.5.6 RegExp.prototype[@@match](string)
  // 21.2.5.9 RegExp.prototype[@@search](string)
  :function(string){return rxfn.call(string,this);});}};},{"115":115,"28":28,"35":35,"41":41,"87":87}],37:[function(_dereq_,module,exports){'use strict'; // 21.2.5.3 get RegExp.prototype.flags
  var anObject=_dereq_(11);module.exports=function(){var that=anObject(this),result='';if(that.global)result+='g';if(that.ignoreCase)result+='i';if(that.multiline)result+='m';if(that.unicode)result+='u';if(that.sticky)result+='y';return result;};},{"11":11}],38:[function(_dereq_,module,exports){var ctx=_dereq_(27),call=_dereq_(52),isArrayIter=_dereq_(47),anObject=_dereq_(11),toLength=_dereq_(108),getIterFn=_dereq_(116);module.exports=function(iterable,entries,fn,that,ITERATOR){var iterFn=ITERATOR?function(){return iterable;}:getIterFn(iterable),f=ctx(fn,that,entries?2:1),index=0,length,step,iterator;if(typeof iterFn!='function')throw TypeError(iterable+' is not iterable!'); // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length=toLength(iterable.length);length>index;index++){entries?f(anObject(step=iterable[index])[0],step[1]):f(iterable[index]);}else for(iterator=iterFn.call(iterable);!(step=iterator.next()).done;){call(iterator,f,step.value,entries);}};},{"108":108,"11":11,"116":116,"27":27,"47":47,"52":52}],39:[function(_dereq_,module,exports){ // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global=module.exports=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();if(typeof __g=='number')__g=global; // eslint-disable-line no-undef
  },{}],40:[function(_dereq_,module,exports){var hasOwnProperty={}.hasOwnProperty;module.exports=function(it,key){return hasOwnProperty.call(it,key);};},{}],41:[function(_dereq_,module,exports){var dP=_dereq_(68),createDesc=_dereq_(85);module.exports=_dereq_(29)?function(object,key,value){return dP.f(object,key,createDesc(1,value));}:function(object,key,value){object[key]=value;return object;};},{"29":29,"68":68,"85":85}],42:[function(_dereq_,module,exports){module.exports=_dereq_(39).document&&document.documentElement;},{"39":39}],43:[function(_dereq_,module,exports){module.exports=!_dereq_(29)&&!_dereq_(35)(function(){return Object.defineProperty(_dereq_(30)('div'),'a',{get:function get(){return 7;}}).a!=7;});},{"29":29,"30":30,"35":35}],44:[function(_dereq_,module,exports){var isObject=_dereq_(50),setPrototypeOf=_dereq_(90).set;module.exports=function(that,target,C){var P,S=target.constructor;if(S!==C&&typeof S=='function'&&(P=S.prototype)!==C.prototype&&isObject(P)&&setPrototypeOf){setPrototypeOf(that,P);}return that;};},{"50":50,"90":90}],45:[function(_dereq_,module,exports){ // fast apply, http://jsperf.lnkit.com/fast-apply/5
  module.exports=function(fn,args,that){var un=that===undefined;switch(args.length){case 0:return un?fn():fn.call(that);case 1:return un?fn(args[0]):fn.call(that,args[0]);case 2:return un?fn(args[0],args[1]):fn.call(that,args[0],args[1]);case 3:return un?fn(args[0],args[1],args[2]):fn.call(that,args[0],args[1],args[2]);case 4:return un?fn(args[0],args[1],args[2],args[3]):fn.call(that,args[0],args[1],args[2],args[3]);}return fn.apply(that,args);};},{}],46:[function(_dereq_,module,exports){ // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var cof=_dereq_(21);module.exports=Object('z').propertyIsEnumerable(0)?Object:function(it){return cof(it)=='String'?it.split(''):Object(it);};},{"21":21}],47:[function(_dereq_,module,exports){ // check on default Array iterator
  var Iterators=_dereq_(57),ITERATOR=_dereq_(115)('iterator'),ArrayProto=Array.prototype;module.exports=function(it){return it!==undefined&&(Iterators.Array===it||ArrayProto[ITERATOR]===it);};},{"115":115,"57":57}],48:[function(_dereq_,module,exports){ // 7.2.2 IsArray(argument)
  var cof=_dereq_(21);module.exports=Array.isArray||function isArray(arg){return cof(arg)=='Array';};},{"21":21}],49:[function(_dereq_,module,exports){ // 20.1.2.3 Number.isInteger(number)
  var isObject=_dereq_(50),floor=Math.floor;module.exports=function isInteger(it){return !isObject(it)&&isFinite(it)&&floor(it)===it;};},{"50":50}],50:[function(_dereq_,module,exports){module.exports=function(it){return (typeof it==="undefined"?"undefined":babelHelpers.typeof(it))==='object'?it!==null:typeof it==='function';};},{}],51:[function(_dereq_,module,exports){ // 7.2.8 IsRegExp(argument)
  var isObject=_dereq_(50),cof=_dereq_(21),MATCH=_dereq_(115)('match');module.exports=function(it){var isRegExp;return isObject(it)&&((isRegExp=it[MATCH])!==undefined?!!isRegExp:cof(it)=='RegExp');};},{"115":115,"21":21,"50":50}],52:[function(_dereq_,module,exports){ // call something on iterator step with safe closing on error
  var anObject=_dereq_(11);module.exports=function(iterator,fn,value,entries){try{return entries?fn(anObject(value)[0],value[1]):fn(value); // 7.4.6 IteratorClose(iterator, completion)
  }catch(e){var ret=iterator['return'];if(ret!==undefined)anObject(ret.call(iterator));throw e;}};},{"11":11}],53:[function(_dereq_,module,exports){'use strict';var create=_dereq_(67),descriptor=_dereq_(85),setToStringTag=_dereq_(92),IteratorPrototype={}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _dereq_(41)(IteratorPrototype,_dereq_(115)('iterator'),function(){return this;});module.exports=function(Constructor,NAME,next){Constructor.prototype=create(IteratorPrototype,{next:descriptor(1,next)});setToStringTag(Constructor,NAME+' Iterator');};},{"115":115,"41":41,"67":67,"85":85,"92":92}],54:[function(_dereq_,module,exports){'use strict';var LIBRARY=_dereq_(59),$export=_dereq_(33),redefine=_dereq_(87),hide=_dereq_(41),has=_dereq_(40),Iterators=_dereq_(57),$iterCreate=_dereq_(53),setToStringTag=_dereq_(92),getPrototypeOf=_dereq_(74),ITERATOR=_dereq_(115)('iterator'),BUGGY=!([].keys&&'next' in [].keys()) // Safari has buggy iterators w/o `next`
  ,FF_ITERATOR='@@iterator',KEYS='keys',VALUES='values';var returnThis=function returnThis(){return this;};module.exports=function(Base,NAME,Constructor,next,DEFAULT,IS_SET,FORCED){$iterCreate(Constructor,NAME,next);var getMethod=function getMethod(kind){if(!BUGGY&&kind in proto)return proto[kind];switch(kind){case KEYS:return function keys(){return new Constructor(this,kind);};case VALUES:return function values(){return new Constructor(this,kind);};}return function entries(){return new Constructor(this,kind);};};var TAG=NAME+' Iterator',DEF_VALUES=DEFAULT==VALUES,VALUES_BUG=false,proto=Base.prototype,$native=proto[ITERATOR]||proto[FF_ITERATOR]||DEFAULT&&proto[DEFAULT],$default=$native||getMethod(DEFAULT),$entries=DEFAULT?!DEF_VALUES?$default:getMethod('entries'):undefined,$anyNative=NAME=='Array'?proto.entries||$native:$native,methods,key,IteratorPrototype; // Fix native
  if($anyNative){IteratorPrototype=getPrototypeOf($anyNative.call(new Base()));if(IteratorPrototype!==Object.prototype){ // Set @@toStringTag to native iterators
  setToStringTag(IteratorPrototype,TAG,true); // fix for some old engines
  if(!LIBRARY&&!has(IteratorPrototype,ITERATOR))hide(IteratorPrototype,ITERATOR,returnThis);}} // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES&&$native&&$native.name!==VALUES){VALUES_BUG=true;$default=function values(){return $native.call(this);};} // Define iterator
  if((!LIBRARY||FORCED)&&(BUGGY||VALUES_BUG||!proto[ITERATOR])){hide(proto,ITERATOR,$default);} // Plug for library
  Iterators[NAME]=$default;Iterators[TAG]=returnThis;if(DEFAULT){methods={values:DEF_VALUES?$default:getMethod(VALUES),keys:IS_SET?$default:getMethod(KEYS),entries:$entries};if(FORCED)for(key in methods){if(!(key in proto))redefine(proto,key,methods[key]);}else $export($export.P+$export.F*(BUGGY||VALUES_BUG),NAME,methods);}return methods;};},{"115":115,"33":33,"40":40,"41":41,"53":53,"57":57,"59":59,"74":74,"87":87,"92":92}],55:[function(_dereq_,module,exports){var ITERATOR=_dereq_(115)('iterator'),SAFE_CLOSING=false;try{var riter=[7][ITERATOR]();riter['return']=function(){SAFE_CLOSING=true;};Array.from(riter,function(){throw 2;});}catch(e){ /* empty */}module.exports=function(exec,skipClosing){if(!skipClosing&&!SAFE_CLOSING)return false;var safe=false;try{var arr=[7],iter=arr[ITERATOR]();iter.next=function(){safe=true;};arr[ITERATOR]=function(){return iter;};exec(arr);}catch(e){ /* empty */}return safe;};},{"115":115}],56:[function(_dereq_,module,exports){module.exports=function(done,value){return {value:value,done:!!done};};},{}],57:[function(_dereq_,module,exports){module.exports={};},{}],58:[function(_dereq_,module,exports){var getKeys=_dereq_(76),toIObject=_dereq_(107);module.exports=function(object,el){var O=toIObject(object),keys=getKeys(O),length=keys.length,index=0,key;while(length>index){if(O[key=keys[index++]]===el)return key;}};},{"107":107,"76":76}],59:[function(_dereq_,module,exports){module.exports=false;},{}],60:[function(_dereq_,module,exports){ // 20.2.2.14 Math.expm1(x)
  module.exports=Math.expm1||function expm1(x){return (x=+x)==0?x:x>-1e-6&&x<1e-6?x+x*x/2:Math.exp(x)-1;};},{}],61:[function(_dereq_,module,exports){ // 20.2.2.20 Math.log1p(x)
  module.exports=Math.log1p||function log1p(x){return (x=+x)>-1e-8&&x<1e-8?x-x*x/2:Math.log(1+x);};},{}],62:[function(_dereq_,module,exports){ // 20.2.2.28 Math.sign(x)
  module.exports=Math.sign||function sign(x){return (x=+x)==0||x!=x?x:x<0?-1:1;};},{}],63:[function(_dereq_,module,exports){var META=_dereq_(114)('meta'),isObject=_dereq_(50),has=_dereq_(40),setDesc=_dereq_(68).f,id=0;var isExtensible=Object.isExtensible||function(){return true;};var FREEZE=!_dereq_(35)(function(){return isExtensible(Object.preventExtensions({}));});var setMeta=function setMeta(it){setDesc(it,META,{value:{i:'O'+ ++id, // object ID
  w:{} // weak collections IDs
  }});};var fastKey=function fastKey(it,create){ // return primitive with prefix
  if(!isObject(it))return (typeof it==="undefined"?"undefined":babelHelpers.typeof(it))=='symbol'?it:(typeof it=='string'?'S':'P')+it;if(!has(it,META)){ // can't set metadata to uncaught frozen object
  if(!isExtensible(it))return 'F'; // not necessary to add metadata
  if(!create)return 'E'; // add missing metadata
  setMeta(it); // return object ID
  }return it[META].i;};var getWeak=function getWeak(it,create){if(!has(it,META)){ // can't set metadata to uncaught frozen object
  if(!isExtensible(it))return true; // not necessary to add metadata
  if(!create)return false; // add missing metadata
  setMeta(it); // return hash weak collections IDs
  }return it[META].w;}; // add metadata on freeze-family methods calling
  var onFreeze=function onFreeze(it){if(FREEZE&&meta.NEED&&isExtensible(it)&&!has(it,META))setMeta(it);return it;};var meta=module.exports={KEY:META,NEED:false,fastKey:fastKey,getWeak:getWeak,onFreeze:onFreeze};},{"114":114,"35":35,"40":40,"50":50,"68":68}],64:[function(_dereq_,module,exports){var Map=_dereq_(147),$export=_dereq_(33),shared=_dereq_(94)('metadata'),store=shared.store||(shared.store=new (_dereq_(253))());var getOrCreateMetadataMap=function getOrCreateMetadataMap(target,targetKey,create){var targetMetadata=store.get(target);if(!targetMetadata){if(!create)return undefined;store.set(target,targetMetadata=new Map());}var keyMetadata=targetMetadata.get(targetKey);if(!keyMetadata){if(!create)return undefined;targetMetadata.set(targetKey,keyMetadata=new Map());}return keyMetadata;};var ordinaryHasOwnMetadata=function ordinaryHasOwnMetadata(MetadataKey,O,P){var metadataMap=getOrCreateMetadataMap(O,P,false);return metadataMap===undefined?false:metadataMap.has(MetadataKey);};var ordinaryGetOwnMetadata=function ordinaryGetOwnMetadata(MetadataKey,O,P){var metadataMap=getOrCreateMetadataMap(O,P,false);return metadataMap===undefined?undefined:metadataMap.get(MetadataKey);};var ordinaryDefineOwnMetadata=function ordinaryDefineOwnMetadata(MetadataKey,MetadataValue,O,P){getOrCreateMetadataMap(O,P,true).set(MetadataKey,MetadataValue);};var ordinaryOwnMetadataKeys=function ordinaryOwnMetadataKeys(target,targetKey){var metadataMap=getOrCreateMetadataMap(target,targetKey,false),keys=[];if(metadataMap)metadataMap.forEach(function(_,key){keys.push(key);});return keys;};var toMetaKey=function toMetaKey(it){return it===undefined||(typeof it==="undefined"?"undefined":babelHelpers.typeof(it))=='symbol'?it:String(it);};var exp=function exp(O){$export($export.S,'Reflect',O);};module.exports={store:store,map:getOrCreateMetadataMap,has:ordinaryHasOwnMetadata,get:ordinaryGetOwnMetadata,set:ordinaryDefineOwnMetadata,keys:ordinaryOwnMetadataKeys,key:toMetaKey,exp:exp};},{"147":147,"253":253,"33":33,"94":94}],65:[function(_dereq_,module,exports){var global=_dereq_(39),macrotask=_dereq_(104).set,Observer=global.MutationObserver||global.WebKitMutationObserver,process=global.process,Promise=global.Promise,isNode=_dereq_(21)(process)=='process',head,last,notify;var flush=function flush(){var parent,domain,fn;if(isNode&&(parent=process.domain)){process.domain=null;parent.exit();}while(head){domain=head.domain;fn=head.fn;if(domain)domain.enter();fn(); // <- currently we use it only for Promise - try / catch not required
  if(domain)domain.exit();head=head.next;}last=undefined;if(parent)parent.enter();}; // Node.js
  if(isNode){notify=function notify(){process.nextTick(flush);}; // browsers with MutationObserver
  }else if(Observer){var toggle=1,node=document.createTextNode('');new Observer(flush).observe(node,{characterData:true}); // eslint-disable-line no-new
  notify=function notify(){node.data=toggle=-toggle;}; // environments with maybe non-completely correct, but existent Promise
  }else if(Promise&&Promise.resolve){notify=function notify(){Promise.resolve().then(flush);}; // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  }else {notify=function notify(){ // strange IE + webpack dev server bug - use .call(global)
  macrotask.call(global,flush);};}module.exports=function(fn){var task={fn:fn,next:undefined,domain:isNode&&process.domain};if(last)last.next=task;if(!head){head=task;notify();}last=task;};},{"104":104,"21":21,"39":39}],66:[function(_dereq_,module,exports){'use strict'; // 19.1.2.1 Object.assign(target, source, ...)
  var getKeys=_dereq_(76),gOPS=_dereq_(73),pIE=_dereq_(77),toObject=_dereq_(109),IObject=_dereq_(46),$assign=Object.assign; // should work with symbols and should have deterministic property order (V8 bug)
  module.exports=!$assign||_dereq_(35)(function(){var A={},B={},S=Symbol(),K='abcdefghijklmnopqrst';A[S]=7;K.split('').forEach(function(k){B[k]=k;});return $assign({},A)[S]!=7||Object.keys($assign({},B)).join('')!=K;})?function assign(target,source){ // eslint-disable-line no-unused-vars
  var T=toObject(target),aLen=arguments.length,index=1,getSymbols=gOPS.f,isEnum=pIE.f;while(aLen>index){var S=IObject(arguments[index++]),keys=getSymbols?getKeys(S).concat(getSymbols(S)):getKeys(S),length=keys.length,j=0,key;while(length>j){if(isEnum.call(S,key=keys[j++]))T[key]=S[key];}}return T;}:$assign;},{"109":109,"35":35,"46":46,"73":73,"76":76,"77":77}],67:[function(_dereq_,module,exports){ // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  var anObject=_dereq_(11),dPs=_dereq_(69),enumBugKeys=_dereq_(31),IE_PROTO=_dereq_(93)('IE_PROTO'),Empty=function Empty(){ /* empty */},PROTOTYPE='prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var _createDict=function createDict(){ // Thrash, waste and sodomy: IE GC bug
  var iframe=_dereq_(30)('iframe'),i=enumBugKeys.length,gt='>',iframeDocument;iframe.style.display='none';_dereq_(42).appendChild(iframe);iframe.src='javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument=iframe.contentWindow.document;iframeDocument.open();iframeDocument.write('<script>document.F=Object</script'+gt);iframeDocument.close();_createDict=iframeDocument.F;while(i--){delete _createDict[PROTOTYPE][enumBugKeys[i]];}return _createDict();};module.exports=Object.create||function create(O,Properties){var result;if(O!==null){Empty[PROTOTYPE]=anObject(O);result=new Empty();Empty[PROTOTYPE]=null; // add "__proto__" for Object.getPrototypeOf polyfill
  result[IE_PROTO]=O;}else result=_createDict();return Properties===undefined?result:dPs(result,Properties);};},{"11":11,"30":30,"31":31,"42":42,"69":69,"93":93}],68:[function(_dereq_,module,exports){var anObject=_dereq_(11),IE8_DOM_DEFINE=_dereq_(43),toPrimitive=_dereq_(110),dP=Object.defineProperty;exports.f=_dereq_(29)?Object.defineProperty:function defineProperty(O,P,Attributes){anObject(O);P=toPrimitive(P,true);anObject(Attributes);if(IE8_DOM_DEFINE)try{return dP(O,P,Attributes);}catch(e){ /* empty */}if('get' in Attributes||'set' in Attributes)throw TypeError('Accessors not supported!');if('value' in Attributes)O[P]=Attributes.value;return O;};},{"11":11,"110":110,"29":29,"43":43}],69:[function(_dereq_,module,exports){var dP=_dereq_(68),anObject=_dereq_(11),getKeys=_dereq_(76);module.exports=_dereq_(29)?Object.defineProperties:function defineProperties(O,Properties){anObject(O);var keys=getKeys(Properties),length=keys.length,i=0,P;while(length>i){dP.f(O,P=keys[i++],Properties[P]);}return O;};},{"11":11,"29":29,"68":68,"76":76}],70:[function(_dereq_,module,exports){var pIE=_dereq_(77),createDesc=_dereq_(85),toIObject=_dereq_(107),toPrimitive=_dereq_(110),has=_dereq_(40),IE8_DOM_DEFINE=_dereq_(43),gOPD=Object.getOwnPropertyDescriptor;exports.f=_dereq_(29)?gOPD:function getOwnPropertyDescriptor(O,P){O=toIObject(O);P=toPrimitive(P,true);if(IE8_DOM_DEFINE)try{return gOPD(O,P);}catch(e){ /* empty */}if(has(O,P))return createDesc(!pIE.f.call(O,P),O[P]);};},{"107":107,"110":110,"29":29,"40":40,"43":43,"77":77,"85":85}],71:[function(_dereq_,module,exports){ // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var toIObject=_dereq_(107),gOPN=_dereq_(72).f,toString={}.toString;var windowNames=(typeof window==="undefined"?"undefined":babelHelpers.typeof(window))=='object'&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];var getWindowNames=function getWindowNames(it){try{return gOPN.f(it);}catch(e){return windowNames.slice();}};module.exports.f=function getOwnPropertyNames(it){return windowNames&&toString.call(it)=='[object Window]'?getWindowNames(it):gOPN(toIObject(it));};},{"107":107,"72":72}],72:[function(_dereq_,module,exports){ // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  var $keys=_dereq_(75),hiddenKeys=_dereq_(31).concat('length','prototype');exports.f=Object.getOwnPropertyNames||function getOwnPropertyNames(O){return $keys(O,hiddenKeys);};},{"31":31,"75":75}],73:[function(_dereq_,module,exports){exports.f=Object.getOwnPropertySymbols;},{}],74:[function(_dereq_,module,exports){ // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  var has=_dereq_(40),toObject=_dereq_(109),IE_PROTO=_dereq_(93)('IE_PROTO'),ObjectProto=Object.prototype;module.exports=Object.getPrototypeOf||function(O){O=toObject(O);if(has(O,IE_PROTO))return O[IE_PROTO];if(typeof O.constructor=='function'&&O instanceof O.constructor){return O.constructor.prototype;}return O instanceof Object?ObjectProto:null;};},{"109":109,"40":40,"93":93}],75:[function(_dereq_,module,exports){var has=_dereq_(40),toIObject=_dereq_(107),arrayIndexOf=_dereq_(15)(false),IE_PROTO=_dereq_(93)('IE_PROTO');module.exports=function(object,names){var O=toIObject(object),i=0,result=[],key;for(key in O){if(key!=IE_PROTO)has(O,key)&&result.push(key);} // Don't enum bug & hidden keys
  while(names.length>i){if(has(O,key=names[i++])){~arrayIndexOf(result,key)||result.push(key);}}return result;};},{"107":107,"15":15,"40":40,"93":93}],76:[function(_dereq_,module,exports){ // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  var $keys=_dereq_(75),enumBugKeys=_dereq_(31);module.exports=Object.keys||function keys(O){return $keys(O,enumBugKeys);};},{"31":31,"75":75}],77:[function(_dereq_,module,exports){exports.f={}.propertyIsEnumerable;},{}],78:[function(_dereq_,module,exports){ // most Object methods by ES6 should accept primitives
  var $export=_dereq_(33),core=_dereq_(26),fails=_dereq_(35);module.exports=function(KEY,exec){var fn=(core.Object||{})[KEY]||Object[KEY],exp={};exp[KEY]=exec(fn);$export($export.S+$export.F*fails(function(){fn(1);}),'Object',exp);};},{"26":26,"33":33,"35":35}],79:[function(_dereq_,module,exports){var getKeys=_dereq_(76),toIObject=_dereq_(107),isEnum=_dereq_(77).f;module.exports=function(isEntries){return function(it){var O=toIObject(it),keys=getKeys(O),length=keys.length,i=0,result=[],key;while(length>i){if(isEnum.call(O,key=keys[i++])){result.push(isEntries?[key,O[key]]:O[key]);}}return result;};};},{"107":107,"76":76,"77":77}],80:[function(_dereq_,module,exports){ // all object keys, includes non-enumerable and symbols
  var gOPN=_dereq_(72),gOPS=_dereq_(73),anObject=_dereq_(11),Reflect=_dereq_(39).Reflect;module.exports=Reflect&&Reflect.ownKeys||function ownKeys(it){var keys=gOPN.f(anObject(it)),getSymbols=gOPS.f;return getSymbols?keys.concat(getSymbols(it)):keys;};},{"11":11,"39":39,"72":72,"73":73}],81:[function(_dereq_,module,exports){var $parseFloat=_dereq_(39).parseFloat,$trim=_dereq_(102).trim;module.exports=1/$parseFloat(_dereq_(103)+'-0')!==-Infinity?function parseFloat(str){var string=$trim(String(str),3),result=$parseFloat(string);return result===0&&string.charAt(0)=='-'?-0:result;}:$parseFloat;},{"102":102,"103":103,"39":39}],82:[function(_dereq_,module,exports){var $parseInt=_dereq_(39).parseInt,$trim=_dereq_(102).trim,ws=_dereq_(103),hex=/^[\-+]?0[xX]/;module.exports=$parseInt(ws+'08')!==8||$parseInt(ws+'0x16')!==22?function parseInt(str,radix){var string=$trim(String(str),3);return $parseInt(string,radix>>>0||(hex.test(string)?16:10));}:$parseInt;},{"102":102,"103":103,"39":39}],83:[function(_dereq_,module,exports){'use strict';var path=_dereq_(84),invoke=_dereq_(45),aFunction=_dereq_(7);module.exports=function() /* ...pargs */{var fn=aFunction(this),length=arguments.length,pargs=Array(length),i=0,_=path._,holder=false;while(length>i){if((pargs[i]=arguments[i++])===_)holder=true;}return function() /* ...args */{var that=this,aLen=arguments.length,j=0,k=0,args;if(!holder&&!aLen)return invoke(fn,pargs,that);args=pargs.slice();if(holder)for(;length>j;j++){if(args[j]===_)args[j]=arguments[k++];}while(aLen>k){args.push(arguments[k++]);}return invoke(fn,args,that);};};},{"45":45,"7":7,"84":84}],84:[function(_dereq_,module,exports){module.exports=_dereq_(39);},{"39":39}],85:[function(_dereq_,module,exports){module.exports=function(bitmap,value){return {enumerable:!(bitmap&1),configurable:!(bitmap&2),writable:!(bitmap&4),value:value};};},{}],86:[function(_dereq_,module,exports){var redefine=_dereq_(87);module.exports=function(target,src,safe){for(var key in src){redefine(target,key,src[key],safe);}return target;};},{"87":87}],87:[function(_dereq_,module,exports){var global=_dereq_(39),hide=_dereq_(41),has=_dereq_(40),SRC=_dereq_(114)('src'),TO_STRING='toString',$toString=Function[TO_STRING],TPL=(''+$toString).split(TO_STRING);_dereq_(26).inspectSource=function(it){return $toString.call(it);};(module.exports=function(O,key,val,safe){var isFunction=typeof val=='function';if(isFunction)has(val,'name')||hide(val,'name',key);if(O[key]===val)return;if(isFunction)has(val,SRC)||hide(val,SRC,O[key]?''+O[key]:TPL.join(String(key)));if(O===global){O[key]=val;}else {if(!safe){delete O[key];hide(O,key,val);}else {if(O[key])O[key]=val;else hide(O,key,val);}} // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype,TO_STRING,function toString(){return typeof this=='function'&&this[SRC]||$toString.call(this);});},{"114":114,"26":26,"39":39,"40":40,"41":41}],88:[function(_dereq_,module,exports){module.exports=function(regExp,replace){var replacer=replace===Object(replace)?function(part){return replace[part];}:replace;return function(it){return String(it).replace(regExp,replacer);};};},{}],89:[function(_dereq_,module,exports){ // 7.2.9 SameValue(x, y)
  module.exports=Object.is||function is(x,y){return x===y?x!==0||1/x===1/y:x!=x&&y!=y;};},{}],90:[function(_dereq_,module,exports){ // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */var isObject=_dereq_(50),anObject=_dereq_(11);var check=function check(O,proto){anObject(O);if(!isObject(proto)&&proto!==null)throw TypeError(proto+": can't set as prototype!");};module.exports={set:Object.setPrototypeOf||('__proto__' in {}? // eslint-disable-line
  function(test,buggy,set){try{set=_dereq_(27)(Function.call,_dereq_(70).f(Object.prototype,'__proto__').set,2);set(test,[]);buggy=!(test instanceof Array);}catch(e){buggy=true;}return function setPrototypeOf(O,proto){check(O,proto);if(buggy)O.__proto__=proto;else set(O,proto);return O;};}({},false):undefined),check:check};},{"11":11,"27":27,"50":50,"70":70}],91:[function(_dereq_,module,exports){'use strict';var global=_dereq_(39),dP=_dereq_(68),DESCRIPTORS=_dereq_(29),SPECIES=_dereq_(115)('species');module.exports=function(KEY){var C=global[KEY];if(DESCRIPTORS&&C&&!C[SPECIES])dP.f(C,SPECIES,{configurable:true,get:function get(){return this;}});};},{"115":115,"29":29,"39":39,"68":68}],92:[function(_dereq_,module,exports){var def=_dereq_(68).f,has=_dereq_(40),TAG=_dereq_(115)('toStringTag');module.exports=function(it,tag,stat){if(it&&!has(it=stat?it:it.prototype,TAG))def(it,TAG,{configurable:true,value:tag});};},{"115":115,"40":40,"68":68}],93:[function(_dereq_,module,exports){var shared=_dereq_(94)('keys'),uid=_dereq_(114);module.exports=function(key){return shared[key]||(shared[key]=uid(key));};},{"114":114,"94":94}],94:[function(_dereq_,module,exports){var global=_dereq_(39),SHARED='__core-js_shared__',store=global[SHARED]||(global[SHARED]={});module.exports=function(key){return store[key]||(store[key]={});};},{"39":39}],95:[function(_dereq_,module,exports){ // 7.3.20 SpeciesConstructor(O, defaultConstructor)
  var anObject=_dereq_(11),aFunction=_dereq_(7),SPECIES=_dereq_(115)('species');module.exports=function(O,D){var C=anObject(O).constructor,S;return C===undefined||(S=anObject(C)[SPECIES])==undefined?D:aFunction(S);};},{"11":11,"115":115,"7":7}],96:[function(_dereq_,module,exports){var fails=_dereq_(35);module.exports=function(method,arg){return !!method&&fails(function(){arg?method.call(null,function(){},1):method.call(null);});};},{"35":35}],97:[function(_dereq_,module,exports){var toInteger=_dereq_(106),defined=_dereq_(28); // true  -> String#at
  // false -> String#codePointAt
  module.exports=function(TO_STRING){return function(that,pos){var s=String(defined(that)),i=toInteger(pos),l=s.length,a,b;if(i<0||i>=l)return TO_STRING?'':undefined;a=s.charCodeAt(i);return a<0xd800||a>0xdbff||i+1===l||(b=s.charCodeAt(i+1))<0xdc00||b>0xdfff?TO_STRING?s.charAt(i):a:TO_STRING?s.slice(i,i+2):(a-0xd800<<10)+(b-0xdc00)+0x10000;};};},{"106":106,"28":28}],98:[function(_dereq_,module,exports){ // helper for String#{startsWith, endsWith, includes}
  var isRegExp=_dereq_(51),defined=_dereq_(28);module.exports=function(that,searchString,NAME){if(isRegExp(searchString))throw TypeError('String#'+NAME+" doesn't accept regex!");return String(defined(that));};},{"28":28,"51":51}],99:[function(_dereq_,module,exports){var $export=_dereq_(33),fails=_dereq_(35),defined=_dereq_(28),quot=/"/g; // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
  var createHTML=function createHTML(string,tag,attribute,value){var S=String(defined(string)),p1='<'+tag;if(attribute!=='')p1+=' '+attribute+'="'+String(value).replace(quot,'&quot;')+'"';return p1+'>'+S+'</'+tag+'>';};module.exports=function(NAME,exec){var O={};O[NAME]=exec(createHTML);$export($export.P+$export.F*fails(function(){var test=''[NAME]('"');return test!==test.toLowerCase()||test.split('"').length>3;}),'String',O);};},{"28":28,"33":33,"35":35}],100:[function(_dereq_,module,exports){ // https://github.com/tc39/proposal-string-pad-start-end
  var toLength=_dereq_(108),repeat=_dereq_(101),defined=_dereq_(28);module.exports=function(that,maxLength,fillString,left){var S=String(defined(that)),stringLength=S.length,fillStr=fillString===undefined?' ':String(fillString),intMaxLength=toLength(maxLength);if(intMaxLength<=stringLength)return S;if(fillStr=='')fillStr=' ';var fillLen=intMaxLength-stringLength,stringFiller=repeat.call(fillStr,Math.ceil(fillLen/fillStr.length));if(stringFiller.length>fillLen)stringFiller=stringFiller.slice(0,fillLen);return left?stringFiller+S:S+stringFiller;};},{"101":101,"108":108,"28":28}],101:[function(_dereq_,module,exports){'use strict';var toInteger=_dereq_(106),defined=_dereq_(28);module.exports=function repeat(count){var str=String(defined(this)),res='',n=toInteger(count);if(n<0||n==Infinity)throw RangeError("Count can't be negative");for(;n>0;(n>>>=1)&&(str+=str)){if(n&1)res+=str;}return res;};},{"106":106,"28":28}],102:[function(_dereq_,module,exports){var $export=_dereq_(33),defined=_dereq_(28),fails=_dereq_(35),spaces=_dereq_(103),space='['+spaces+']',non="​",ltrim=RegExp('^'+space+space+'*'),rtrim=RegExp(space+space+'*$');var exporter=function exporter(KEY,exec,ALIAS){var exp={};var FORCE=fails(function(){return !!spaces[KEY]()||non[KEY]()!=non;});var fn=exp[KEY]=FORCE?exec(trim):spaces[KEY];if(ALIAS)exp[ALIAS]=fn;$export($export.P+$export.F*FORCE,'String',exp);}; // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim
  var trim=exporter.trim=function(string,TYPE){string=String(defined(string));if(TYPE&1)string=string.replace(ltrim,'');if(TYPE&2)string=string.replace(rtrim,'');return string;};module.exports=exporter;},{"103":103,"28":28,"33":33,"35":35}],103:[function(_dereq_,module,exports){module.exports="\t\n\u000b\f\r   ᠎    "+"         　\u2028\u2029﻿";},{}],104:[function(_dereq_,module,exports){var ctx=_dereq_(27),invoke=_dereq_(45),html=_dereq_(42),cel=_dereq_(30),global=_dereq_(39),process=global.process,setTask=global.setImmediate,clearTask=global.clearImmediate,MessageChannel=global.MessageChannel,counter=0,queue={},ONREADYSTATECHANGE='onreadystatechange',defer,channel,port;var run=function run(){var id=+this;if(queue.hasOwnProperty(id)){var fn=queue[id];delete queue[id];fn();}};var listener=function listener(event){run.call(event.data);}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if(!setTask||!clearTask){setTask=function setImmediate(fn){var args=[],i=1;while(arguments.length>i){args.push(arguments[i++]);}queue[++counter]=function(){invoke(typeof fn=='function'?fn:Function(fn),args);};defer(counter);return counter;};clearTask=function clearImmediate(id){delete queue[id];}; // Node.js 0.8-
  if(_dereq_(21)(process)=='process'){defer=function defer(id){process.nextTick(ctx(run,id,1));}; // Browsers with MessageChannel, includes WebWorkers
  }else if(MessageChannel){channel=new MessageChannel();port=channel.port2;channel.port1.onmessage=listener;defer=ctx(port.postMessage,port,1); // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  }else if(global.addEventListener&&typeof postMessage=='function'&&!global.importScripts){defer=function defer(id){global.postMessage(id+'','*');};global.addEventListener('message',listener,false); // IE8-
  }else if(ONREADYSTATECHANGE in cel('script')){defer=function defer(id){html.appendChild(cel('script'))[ONREADYSTATECHANGE]=function(){html.removeChild(this);run.call(id);};}; // Rest old browsers
  }else {defer=function defer(id){setTimeout(ctx(run,id,1),0);};}}module.exports={set:setTask,clear:clearTask};},{"21":21,"27":27,"30":30,"39":39,"42":42,"45":45}],105:[function(_dereq_,module,exports){var toInteger=_dereq_(106),max=Math.max,min=Math.min;module.exports=function(index,length){index=toInteger(index);return index<0?max(index+length,0):min(index,length);};},{"106":106}],106:[function(_dereq_,module,exports){ // 7.1.4 ToInteger
  var ceil=Math.ceil,floor=Math.floor;module.exports=function(it){return isNaN(it=+it)?0:(it>0?floor:ceil)(it);};},{}],107:[function(_dereq_,module,exports){ // to indexed object, toObject with fallback for non-array-like ES3 strings
  var IObject=_dereq_(46),defined=_dereq_(28);module.exports=function(it){return IObject(defined(it));};},{"28":28,"46":46}],108:[function(_dereq_,module,exports){ // 7.1.15 ToLength
  var toInteger=_dereq_(106),min=Math.min;module.exports=function(it){return it>0?min(toInteger(it),0x1fffffffffffff):0; // pow(2, 53) - 1 == 9007199254740991
  };},{"106":106}],109:[function(_dereq_,module,exports){ // 7.1.13 ToObject(argument)
  var defined=_dereq_(28);module.exports=function(it){return Object(defined(it));};},{"28":28}],110:[function(_dereq_,module,exports){ // 7.1.1 ToPrimitive(input [, PreferredType])
  var isObject=_dereq_(50); // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  module.exports=function(it,S){if(!isObject(it))return it;var fn,val;if(S&&typeof (fn=it.toString)=='function'&&!isObject(val=fn.call(it)))return val;if(typeof (fn=it.valueOf)=='function'&&!isObject(val=fn.call(it)))return val;if(!S&&typeof (fn=it.toString)=='function'&&!isObject(val=fn.call(it)))return val;throw TypeError("Can't convert object to primitive value");};},{"50":50}],111:[function(_dereq_,module,exports){'use strict';if(_dereq_(29)){var LIBRARY=_dereq_(59),global=_dereq_(39),fails=_dereq_(35),$export=_dereq_(33),$typed=_dereq_(113),$buffer=_dereq_(112),ctx=_dereq_(27),anInstance=_dereq_(10),propertyDesc=_dereq_(85),hide=_dereq_(41),redefineAll=_dereq_(86),isInteger=_dereq_(49),toInteger=_dereq_(106),toLength=_dereq_(108),toIndex=_dereq_(105),toPrimitive=_dereq_(110),has=_dereq_(40),same=_dereq_(89),classof=_dereq_(20),isObject=_dereq_(50),toObject=_dereq_(109),isArrayIter=_dereq_(47),create=_dereq_(67),getPrototypeOf=_dereq_(74),gOPN=_dereq_(72).f,isIterable=_dereq_(117),getIterFn=_dereq_(116),uid=_dereq_(114),wks=_dereq_(115),createArrayMethod=_dereq_(16),createArrayIncludes=_dereq_(15),speciesConstructor=_dereq_(95),ArrayIterators=_dereq_(129),Iterators=_dereq_(57),$iterDetect=_dereq_(55),setSpecies=_dereq_(91),arrayFill=_dereq_(13),arrayCopyWithin=_dereq_(12),$DP=_dereq_(68),$GOPD=_dereq_(70),dP=$DP.f,gOPD=$GOPD.f,RangeError=global.RangeError,TypeError=global.TypeError,Uint8Array=global.Uint8Array,ARRAY_BUFFER='ArrayBuffer',SHARED_BUFFER='Shared'+ARRAY_BUFFER,BYTES_PER_ELEMENT='BYTES_PER_ELEMENT',PROTOTYPE='prototype',ArrayProto=Array[PROTOTYPE],$ArrayBuffer=$buffer.ArrayBuffer,$DataView=$buffer.DataView,arrayForEach=createArrayMethod(0),arrayFilter=createArrayMethod(2),arraySome=createArrayMethod(3),arrayEvery=createArrayMethod(4),arrayFind=createArrayMethod(5),arrayFindIndex=createArrayMethod(6),arrayIncludes=createArrayIncludes(true),arrayIndexOf=createArrayIncludes(false),arrayValues=ArrayIterators.values,arrayKeys=ArrayIterators.keys,arrayEntries=ArrayIterators.entries,arrayLastIndexOf=ArrayProto.lastIndexOf,arrayReduce=ArrayProto.reduce,arrayReduceRight=ArrayProto.reduceRight,arrayJoin=ArrayProto.join,arraySort=ArrayProto.sort,arraySlice=ArrayProto.slice,arrayToString=ArrayProto.toString,arrayToLocaleString=ArrayProto.toLocaleString,ITERATOR=wks('iterator'),TAG=wks('toStringTag'),TYPED_CONSTRUCTOR=uid('typed_constructor'),DEF_CONSTRUCTOR=uid('def_constructor'),ALL_CONSTRUCTORS=$typed.CONSTR,TYPED_ARRAY=$typed.TYPED,VIEW=$typed.VIEW,WRONG_LENGTH='Wrong length!';var $map=createArrayMethod(1,function(O,length){return allocate(speciesConstructor(O,O[DEF_CONSTRUCTOR]),length);});var LITTLE_ENDIAN=fails(function(){return new Uint8Array(new Uint16Array([1]).buffer)[0]===1;});var FORCED_SET=!!Uint8Array&&!!Uint8Array[PROTOTYPE].set&&fails(function(){new Uint8Array(1).set({});});var strictToLength=function strictToLength(it,SAME){if(it===undefined)throw TypeError(WRONG_LENGTH);var number=+it,length=toLength(it);if(SAME&&!same(number,length))throw RangeError(WRONG_LENGTH);return length;};var toOffset=function toOffset(it,BYTES){var offset=toInteger(it);if(offset<0||offset%BYTES)throw RangeError('Wrong offset!');return offset;};var validate=function validate(it){if(isObject(it)&&TYPED_ARRAY in it)return it;throw TypeError(it+' is not a typed array!');};var allocate=function allocate(C,length){if(!(isObject(C)&&TYPED_CONSTRUCTOR in C)){throw TypeError('It is not a typed array constructor!');}return new C(length);};var speciesFromList=function speciesFromList(O,list){return fromList(speciesConstructor(O,O[DEF_CONSTRUCTOR]),list);};var fromList=function fromList(C,list){var index=0,length=list.length,result=allocate(C,length);while(length>index){result[index]=list[index++];}return result;};var addGetter=function addGetter(it,key,internal){dP(it,key,{get:function get(){return this._d[internal];}});};var $from=function from(source /*, mapfn, thisArg */){var O=toObject(source),aLen=arguments.length,mapfn=aLen>1?arguments[1]:undefined,mapping=mapfn!==undefined,iterFn=getIterFn(O),i,length,values,result,step,iterator;if(iterFn!=undefined&&!isArrayIter(iterFn)){for(iterator=iterFn.call(O),values=[],i=0;!(step=iterator.next()).done;i++){values.push(step.value);}O=values;}if(mapping&&aLen>2)mapfn=ctx(mapfn,arguments[2],2);for(i=0,length=toLength(O.length),result=allocate(this,length);length>i;i++){result[i]=mapping?mapfn(O[i],i):O[i];}return result;};var $of=function of() /*...items*/{var index=0,length=arguments.length,result=allocate(this,length);while(length>index){result[index]=arguments[index++];}return result;}; // iOS Safari 6.x fails here
  var TO_LOCALE_BUG=!!Uint8Array&&fails(function(){arrayToLocaleString.call(new Uint8Array(1));});var $toLocaleString=function toLocaleString(){return arrayToLocaleString.apply(TO_LOCALE_BUG?arraySlice.call(validate(this)):validate(this),arguments);};var proto={copyWithin:function copyWithin(target,start /*, end */){return arrayCopyWithin.call(validate(this),target,start,arguments.length>2?arguments[2]:undefined);},every:function every(callbackfn /*, thisArg */){return arrayEvery(validate(this),callbackfn,arguments.length>1?arguments[1]:undefined);},fill:function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
  return arrayFill.apply(validate(this),arguments);},filter:function filter(callbackfn /*, thisArg */){return speciesFromList(this,arrayFilter(validate(this),callbackfn,arguments.length>1?arguments[1]:undefined));},find:function find(predicate /*, thisArg */){return arrayFind(validate(this),predicate,arguments.length>1?arguments[1]:undefined);},findIndex:function findIndex(predicate /*, thisArg */){return arrayFindIndex(validate(this),predicate,arguments.length>1?arguments[1]:undefined);},forEach:function forEach(callbackfn /*, thisArg */){arrayForEach(validate(this),callbackfn,arguments.length>1?arguments[1]:undefined);},indexOf:function indexOf(searchElement /*, fromIndex */){return arrayIndexOf(validate(this),searchElement,arguments.length>1?arguments[1]:undefined);},includes:function includes(searchElement /*, fromIndex */){return arrayIncludes(validate(this),searchElement,arguments.length>1?arguments[1]:undefined);},join:function join(separator){ // eslint-disable-line no-unused-vars
  return arrayJoin.apply(validate(this),arguments);},lastIndexOf:function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
  return arrayLastIndexOf.apply(validate(this),arguments);},map:function map(mapfn /*, thisArg */){return $map(validate(this),mapfn,arguments.length>1?arguments[1]:undefined);},reduce:function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
  return arrayReduce.apply(validate(this),arguments);},reduceRight:function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
  return arrayReduceRight.apply(validate(this),arguments);},reverse:function reverse(){var that=this,length=validate(that).length,middle=Math.floor(length/2),index=0,value;while(index<middle){value=that[index];that[index++]=that[--length];that[length]=value;}return that;},slice:function slice(start,end){return speciesFromList(this,arraySlice.call(validate(this),start,end));},some:function some(callbackfn /*, thisArg */){return arraySome(validate(this),callbackfn,arguments.length>1?arguments[1]:undefined);},sort:function sort(comparefn){return arraySort.call(validate(this),comparefn);},subarray:function subarray(begin,end){var O=validate(this),length=O.length,$begin=toIndex(begin,length);return new (speciesConstructor(O,O[DEF_CONSTRUCTOR]))(O.buffer,O.byteOffset+$begin*O.BYTES_PER_ELEMENT,toLength((end===undefined?length:toIndex(end,length))-$begin));}};var $set=function set(arrayLike /*, offset */){validate(this);var offset=toOffset(arguments[1],1),length=this.length,src=toObject(arrayLike),len=toLength(src.length),index=0;if(len+offset>length)throw RangeError(WRONG_LENGTH);while(index<len){this[offset+index]=src[index++];}};var $iterators={entries:function entries(){return arrayEntries.call(validate(this));},keys:function keys(){return arrayKeys.call(validate(this));},values:function values(){return arrayValues.call(validate(this));}};var isTAIndex=function isTAIndex(target,key){return isObject(target)&&target[TYPED_ARRAY]&&(typeof key==="undefined"?"undefined":babelHelpers.typeof(key))!='symbol'&&key in target&&String(+key)==String(key);};var $getDesc=function getOwnPropertyDescriptor(target,key){return isTAIndex(target,key=toPrimitive(key,true))?propertyDesc(2,target[key]):gOPD(target,key);};var $setDesc=function defineProperty(target,key,desc){if(isTAIndex(target,key=toPrimitive(key,true))&&isObject(desc)&&has(desc,'value')&&!has(desc,'get')&&!has(desc,'set') // TODO: add validation descriptor w/o calling accessors
  &&!desc.configurable&&(!has(desc,'writable')||desc.writable)&&(!has(desc,'enumerable')||desc.enumerable)){target[key]=desc.value;return target;}else return dP(target,key,desc);};if(!ALL_CONSTRUCTORS){$GOPD.f=$getDesc;$DP.f=$setDesc;}$export($export.S+$export.F*!ALL_CONSTRUCTORS,'Object',{getOwnPropertyDescriptor:$getDesc,defineProperty:$setDesc});if(fails(function(){arrayToString.call({});})){arrayToString=arrayToLocaleString=function toString(){return arrayJoin.call(this);};}var $TypedArrayPrototype$=redefineAll({},proto);redefineAll($TypedArrayPrototype$,$iterators);hide($TypedArrayPrototype$,ITERATOR,$iterators.values);redefineAll($TypedArrayPrototype$,{set:$set,constructor:function constructor(){ /* noop */},toString:arrayToString,toLocaleString:$toLocaleString});addGetter($TypedArrayPrototype$,'buffer','b');addGetter($TypedArrayPrototype$,'byteOffset','o');addGetter($TypedArrayPrototype$,'byteLength','l');addGetter($TypedArrayPrototype$,'length','e');dP($TypedArrayPrototype$,TAG,{get:function get(){return this[TYPED_ARRAY];}});module.exports=function(KEY,BYTES,wrapper,CLAMPED){CLAMPED=!!CLAMPED;var NAME=KEY+(CLAMPED?'Clamped':'')+'Array',ISNT_UINT8=NAME!='Uint8Array',GETTER='get'+KEY,SETTER='set'+KEY,TypedArray=global[NAME],Base=TypedArray||{},TAC=TypedArray&&getPrototypeOf(TypedArray),FORCED=!TypedArray||!$typed.ABV,O={},TypedArrayPrototype=TypedArray&&TypedArray[PROTOTYPE];var getter=function getter(that,index){var data=that._d;return data.v[GETTER](index*BYTES+data.o,LITTLE_ENDIAN);};var setter=function setter(that,index,value){var data=that._d;if(CLAMPED)value=(value=Math.round(value))<0?0:value>0xff?0xff:value&0xff;data.v[SETTER](index*BYTES+data.o,value,LITTLE_ENDIAN);};var addElement=function addElement(that,index){dP(that,index,{get:function get(){return getter(this,index);},set:function set(value){return setter(this,index,value);},enumerable:true});};if(FORCED){TypedArray=wrapper(function(that,data,$offset,$length){anInstance(that,TypedArray,NAME,'_d');var index=0,offset=0,buffer,byteLength,length,klass;if(!isObject(data)){length=strictToLength(data,true);byteLength=length*BYTES;buffer=new $ArrayBuffer(byteLength);}else if(data instanceof $ArrayBuffer||(klass=classof(data))==ARRAY_BUFFER||klass==SHARED_BUFFER){buffer=data;offset=toOffset($offset,BYTES);var $len=data.byteLength;if($length===undefined){if($len%BYTES)throw RangeError(WRONG_LENGTH);byteLength=$len-offset;if(byteLength<0)throw RangeError(WRONG_LENGTH);}else {byteLength=toLength($length)*BYTES;if(byteLength+offset>$len)throw RangeError(WRONG_LENGTH);}length=byteLength/BYTES;}else if(TYPED_ARRAY in data){return fromList(TypedArray,data);}else {return $from.call(TypedArray,data);}hide(that,'_d',{b:buffer,o:offset,l:byteLength,e:length,v:new $DataView(buffer)});while(index<length){addElement(that,index++);}});TypedArrayPrototype=TypedArray[PROTOTYPE]=create($TypedArrayPrototype$);hide(TypedArrayPrototype,'constructor',TypedArray);}else if(!$iterDetect(function(iter){ // V8 works with iterators, but fails in many other cases
  // https://code.google.com/p/v8/issues/detail?id=4552
  new TypedArray(null); // eslint-disable-line no-new
  new TypedArray(iter); // eslint-disable-line no-new
  },true)){TypedArray=wrapper(function(that,data,$offset,$length){anInstance(that,TypedArray,NAME);var klass; // `ws` module bug, temporarily remove validation length for Uint8Array
  // https://github.com/websockets/ws/pull/645
  if(!isObject(data))return new Base(strictToLength(data,ISNT_UINT8));if(data instanceof $ArrayBuffer||(klass=classof(data))==ARRAY_BUFFER||klass==SHARED_BUFFER){return $length!==undefined?new Base(data,toOffset($offset,BYTES),$length):$offset!==undefined?new Base(data,toOffset($offset,BYTES)):new Base(data);}if(TYPED_ARRAY in data)return fromList(TypedArray,data);return $from.call(TypedArray,data);});arrayForEach(TAC!==Function.prototype?gOPN(Base).concat(gOPN(TAC)):gOPN(Base),function(key){if(!(key in TypedArray))hide(TypedArray,key,Base[key]);});TypedArray[PROTOTYPE]=TypedArrayPrototype;if(!LIBRARY)TypedArrayPrototype.constructor=TypedArray;}var $nativeIterator=TypedArrayPrototype[ITERATOR],CORRECT_ITER_NAME=!!$nativeIterator&&($nativeIterator.name=='values'||$nativeIterator.name==undefined),$iterator=$iterators.values;hide(TypedArray,TYPED_CONSTRUCTOR,true);hide(TypedArrayPrototype,TYPED_ARRAY,NAME);hide(TypedArrayPrototype,VIEW,true);hide(TypedArrayPrototype,DEF_CONSTRUCTOR,TypedArray);if(CLAMPED?new TypedArray(1)[TAG]!=NAME:!(TAG in TypedArrayPrototype)){dP(TypedArrayPrototype,TAG,{get:function get(){return NAME;}});}O[NAME]=TypedArray;$export($export.G+$export.W+$export.F*(TypedArray!=Base),O);$export($export.S,NAME,{BYTES_PER_ELEMENT:BYTES,from:$from,of:$of});if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype,BYTES_PER_ELEMENT,BYTES);$export($export.P,NAME,proto);$export($export.P+$export.F*FORCED_SET,NAME,{set:$set});$export($export.P+$export.F*!CORRECT_ITER_NAME,NAME,$iterators);$export($export.P+$export.F*(TypedArrayPrototype.toString!=arrayToString),NAME,{toString:arrayToString});$export($export.P+$export.F*(fails(function(){return [1,2].toLocaleString()!=new TypedArray([1,2]).toLocaleString();})||!fails(function(){TypedArrayPrototype.toLocaleString.call([1,2]);})),NAME,{toLocaleString:$toLocaleString});Iterators[NAME]=CORRECT_ITER_NAME?$nativeIterator:$iterator;if(!LIBRARY&&!CORRECT_ITER_NAME)hide(TypedArrayPrototype,ITERATOR,$iterator);setSpecies(NAME);};}else module.exports=function(){ /* empty */};},{"10":10,"105":105,"106":106,"108":108,"109":109,"110":110,"112":112,"113":113,"114":114,"115":115,"116":116,"117":117,"12":12,"129":129,"13":13,"15":15,"16":16,"20":20,"27":27,"29":29,"33":33,"35":35,"39":39,"40":40,"41":41,"47":47,"49":49,"50":50,"55":55,"57":57,"59":59,"67":67,"68":68,"70":70,"72":72,"74":74,"85":85,"86":86,"89":89,"91":91,"95":95}],112:[function(_dereq_,module,exports){'use strict';var global=_dereq_(39),DESCRIPTORS=_dereq_(29),LIBRARY=_dereq_(59),$typed=_dereq_(113),hide=_dereq_(41),redefineAll=_dereq_(86),fails=_dereq_(35),anInstance=_dereq_(10),toInteger=_dereq_(106),toLength=_dereq_(108),gOPN=_dereq_(72).f,dP=_dereq_(68).f,arrayFill=_dereq_(13),setToStringTag=_dereq_(92),ARRAY_BUFFER='ArrayBuffer',DATA_VIEW='DataView',PROTOTYPE='prototype',WRONG_LENGTH='Wrong length!',WRONG_INDEX='Wrong index!',$ArrayBuffer=global[ARRAY_BUFFER],$DataView=global[DATA_VIEW],Math=global.Math,parseInt=global.parseInt,RangeError=global.RangeError,Infinity=global.Infinity,BaseBuffer=$ArrayBuffer,abs=Math.abs,pow=Math.pow,min=Math.min,floor=Math.floor,log=Math.log,LN2=Math.LN2,BUFFER='buffer',BYTE_LENGTH='byteLength',BYTE_OFFSET='byteOffset',$BUFFER=DESCRIPTORS?'_b':BUFFER,$LENGTH=DESCRIPTORS?'_l':BYTE_LENGTH,$OFFSET=DESCRIPTORS?'_o':BYTE_OFFSET; // IEEE754 conversions based on https://github.com/feross/ieee754
  var packIEEE754=function packIEEE754(value,mLen,nBytes){var buffer=Array(nBytes),eLen=nBytes*8-mLen-1,eMax=(1<<eLen)-1,eBias=eMax>>1,rt=mLen===23?pow(2,-24)-pow(2,-77):0,i=0,s=value<0||value===0&&1/value<0?1:0,e,m,c;value=abs(value);if(value!=value||value===Infinity){m=value!=value?1:0;e=eMax;}else {e=floor(log(value)/LN2);if(value*(c=pow(2,-e))<1){e--;c*=2;}if(e+eBias>=1){value+=rt/c;}else {value+=rt*pow(2,1-eBias);}if(value*c>=2){e++;c/=2;}if(e+eBias>=eMax){m=0;e=eMax;}else if(e+eBias>=1){m=(value*c-1)*pow(2,mLen);e=e+eBias;}else {m=value*pow(2,eBias-1)*pow(2,mLen);e=0;}}for(;mLen>=8;buffer[i++]=m&255,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[i++]=e&255,e/=256,eLen-=8){}buffer[--i]|=s*128;return buffer;};var unpackIEEE754=function unpackIEEE754(buffer,mLen,nBytes){var eLen=nBytes*8-mLen-1,eMax=(1<<eLen)-1,eBias=eMax>>1,nBits=eLen-7,i=nBytes-1,s=buffer[i--],e=s&127,m;s>>=7;for(;nBits>0;e=e*256+buffer[i],i--,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[i],i--,nBits-=8){}if(e===0){e=1-eBias;}else if(e===eMax){return m?NaN:s?-Infinity:Infinity;}else {m=m+pow(2,mLen);e=e-eBias;}return (s?-1:1)*m*pow(2,e-mLen);};var unpackI32=function unpackI32(bytes){return bytes[3]<<24|bytes[2]<<16|bytes[1]<<8|bytes[0];};var packI8=function packI8(it){return [it&0xff];};var packI16=function packI16(it){return [it&0xff,it>>8&0xff];};var packI32=function packI32(it){return [it&0xff,it>>8&0xff,it>>16&0xff,it>>24&0xff];};var packF64=function packF64(it){return packIEEE754(it,52,8);};var packF32=function packF32(it){return packIEEE754(it,23,4);};var addGetter=function addGetter(C,key,internal){dP(C[PROTOTYPE],key,{get:function get(){return this[internal];}});};var get=function get(view,bytes,index,isLittleEndian){var numIndex=+index,intIndex=toInteger(numIndex);if(numIndex!=intIndex||intIndex<0||intIndex+bytes>view[$LENGTH])throw RangeError(WRONG_INDEX);var store=view[$BUFFER]._b,start=intIndex+view[$OFFSET],pack=store.slice(start,start+bytes);return isLittleEndian?pack:pack.reverse();};var set=function set(view,bytes,index,conversion,value,isLittleEndian){var numIndex=+index,intIndex=toInteger(numIndex);if(numIndex!=intIndex||intIndex<0||intIndex+bytes>view[$LENGTH])throw RangeError(WRONG_INDEX);var store=view[$BUFFER]._b,start=intIndex+view[$OFFSET],pack=conversion(+value);for(var i=0;i<bytes;i++){store[start+i]=pack[isLittleEndian?i:bytes-i-1];}};var validateArrayBufferArguments=function validateArrayBufferArguments(that,length){anInstance(that,$ArrayBuffer,ARRAY_BUFFER);var numberLength=+length,byteLength=toLength(numberLength);if(numberLength!=byteLength)throw RangeError(WRONG_LENGTH);return byteLength;};if(!$typed.ABV){$ArrayBuffer=function ArrayBuffer(length){var byteLength=validateArrayBufferArguments(this,length);this._b=arrayFill.call(Array(byteLength),0);this[$LENGTH]=byteLength;};$DataView=function DataView(buffer,byteOffset,byteLength){anInstance(this,$DataView,DATA_VIEW);anInstance(buffer,$ArrayBuffer,DATA_VIEW);var bufferLength=buffer[$LENGTH],offset=toInteger(byteOffset);if(offset<0||offset>bufferLength)throw RangeError('Wrong offset!');byteLength=byteLength===undefined?bufferLength-offset:toLength(byteLength);if(offset+byteLength>bufferLength)throw RangeError(WRONG_LENGTH);this[$BUFFER]=buffer;this[$OFFSET]=offset;this[$LENGTH]=byteLength;};if(DESCRIPTORS){addGetter($ArrayBuffer,BYTE_LENGTH,'_l');addGetter($DataView,BUFFER,'_b');addGetter($DataView,BYTE_LENGTH,'_l');addGetter($DataView,BYTE_OFFSET,'_o');}redefineAll($DataView[PROTOTYPE],{getInt8:function getInt8(byteOffset){return get(this,1,byteOffset)[0]<<24>>24;},getUint8:function getUint8(byteOffset){return get(this,1,byteOffset)[0];},getInt16:function getInt16(byteOffset /*, littleEndian */){var bytes=get(this,2,byteOffset,arguments[1]);return (bytes[1]<<8|bytes[0])<<16>>16;},getUint16:function getUint16(byteOffset /*, littleEndian */){var bytes=get(this,2,byteOffset,arguments[1]);return bytes[1]<<8|bytes[0];},getInt32:function getInt32(byteOffset /*, littleEndian */){return unpackI32(get(this,4,byteOffset,arguments[1]));},getUint32:function getUint32(byteOffset /*, littleEndian */){return unpackI32(get(this,4,byteOffset,arguments[1]))>>>0;},getFloat32:function getFloat32(byteOffset /*, littleEndian */){return unpackIEEE754(get(this,4,byteOffset,arguments[1]),23,4);},getFloat64:function getFloat64(byteOffset /*, littleEndian */){return unpackIEEE754(get(this,8,byteOffset,arguments[1]),52,8);},setInt8:function setInt8(byteOffset,value){set(this,1,byteOffset,packI8,value);},setUint8:function setUint8(byteOffset,value){set(this,1,byteOffset,packI8,value);},setInt16:function setInt16(byteOffset,value /*, littleEndian */){set(this,2,byteOffset,packI16,value,arguments[2]);},setUint16:function setUint16(byteOffset,value /*, littleEndian */){set(this,2,byteOffset,packI16,value,arguments[2]);},setInt32:function setInt32(byteOffset,value /*, littleEndian */){set(this,4,byteOffset,packI32,value,arguments[2]);},setUint32:function setUint32(byteOffset,value /*, littleEndian */){set(this,4,byteOffset,packI32,value,arguments[2]);},setFloat32:function setFloat32(byteOffset,value /*, littleEndian */){set(this,4,byteOffset,packF32,value,arguments[2]);},setFloat64:function setFloat64(byteOffset,value /*, littleEndian */){set(this,8,byteOffset,packF64,value,arguments[2]);}});}else {if(!fails(function(){new $ArrayBuffer(); // eslint-disable-line no-new
  })||!fails(function(){new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){$ArrayBuffer=function ArrayBuffer(length){return new BaseBuffer(validateArrayBufferArguments(this,length));};var ArrayBufferProto=$ArrayBuffer[PROTOTYPE]=BaseBuffer[PROTOTYPE];for(var keys=gOPN(BaseBuffer),j=0,key;keys.length>j;){if(!((key=keys[j++]) in $ArrayBuffer))hide($ArrayBuffer,key,BaseBuffer[key]);};if(!LIBRARY)ArrayBufferProto.constructor=$ArrayBuffer;} // iOS Safari 7.x bug
  var view=new $DataView(new $ArrayBuffer(2)),$setInt8=$DataView[PROTOTYPE].setInt8;view.setInt8(0,2147483648);view.setInt8(1,2147483649);if(view.getInt8(0)||!view.getInt8(1))redefineAll($DataView[PROTOTYPE],{setInt8:function setInt8(byteOffset,value){$setInt8.call(this,byteOffset,value<<24>>24);},setUint8:function setUint8(byteOffset,value){$setInt8.call(this,byteOffset,value<<24>>24);}},true);}setToStringTag($ArrayBuffer,ARRAY_BUFFER);setToStringTag($DataView,DATA_VIEW);hide($DataView[PROTOTYPE],$typed.VIEW,true);exports[ARRAY_BUFFER]=$ArrayBuffer;exports[DATA_VIEW]=$DataView;},{"10":10,"106":106,"108":108,"113":113,"13":13,"29":29,"35":35,"39":39,"41":41,"59":59,"68":68,"72":72,"86":86,"92":92}],113:[function(_dereq_,module,exports){var global=_dereq_(39),hide=_dereq_(41),uid=_dereq_(114),TYPED=uid('typed_array'),VIEW=uid('view'),ABV=!!(global.ArrayBuffer&&global.DataView),CONSTR=ABV,i=0,l=9,Typed;var TypedArrayConstructors='Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');while(i<l){if(Typed=global[TypedArrayConstructors[i++]]){hide(Typed.prototype,TYPED,true);hide(Typed.prototype,VIEW,true);}else CONSTR=false;}module.exports={ABV:ABV,CONSTR:CONSTR,TYPED:TYPED,VIEW:VIEW};},{"114":114,"39":39,"41":41}],114:[function(_dereq_,module,exports){var id=0,px=Math.random();module.exports=function(key){return 'Symbol('.concat(key===undefined?'':key,')_',(++id+px).toString(36));};},{}],115:[function(_dereq_,module,exports){var store=_dereq_(94)('wks'),uid=_dereq_(114),_Symbol=_dereq_(39).Symbol,USE_SYMBOL=typeof _Symbol=='function';module.exports=function(name){return store[name]||(store[name]=USE_SYMBOL&&_Symbol[name]||(USE_SYMBOL?_Symbol:uid)('Symbol.'+name));};},{"114":114,"39":39,"94":94}],116:[function(_dereq_,module,exports){var classof=_dereq_(20),ITERATOR=_dereq_(115)('iterator'),Iterators=_dereq_(57);module.exports=_dereq_(26).getIteratorMethod=function(it){if(it!=undefined)return it[ITERATOR]||it['@@iterator']||Iterators[classof(it)];};},{"115":115,"20":20,"26":26,"57":57}],117:[function(_dereq_,module,exports){var classof=_dereq_(20),ITERATOR=_dereq_(115)('iterator'),Iterators=_dereq_(57);module.exports=_dereq_(26).isIterable=function(it){var O=Object(it);return O[ITERATOR]!==undefined||'@@iterator' in O||Iterators.hasOwnProperty(classof(O));};},{"115":115,"20":20,"26":26,"57":57}],118:[function(_dereq_,module,exports){ // https://github.com/benjamingr/RexExp.escape
  var $export=_dereq_(33),$re=_dereq_(88)(/[\\^$*+?.()|[\]{}]/g,'\\$&');$export($export.S,'RegExp',{escape:function escape(it){return $re(it);}});},{"33":33,"88":88}],119:[function(_dereq_,module,exports){ // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
  var $export=_dereq_(33);$export($export.P,'Array',{copyWithin:_dereq_(12)});_dereq_(9)('copyWithin');},{"12":12,"33":33,"9":9}],120:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$every=_dereq_(16)(4);$export($export.P+$export.F*!_dereq_(96)([].every,true),'Array',{ // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every:function every(callbackfn /* , thisArg */){return $every(this,callbackfn,arguments[1]);}});},{"16":16,"33":33,"96":96}],121:[function(_dereq_,module,exports){ // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
  var $export=_dereq_(33);$export($export.P,'Array',{fill:_dereq_(13)});_dereq_(9)('fill');},{"13":13,"33":33,"9":9}],122:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$filter=_dereq_(16)(2);$export($export.P+$export.F*!_dereq_(96)([].filter,true),'Array',{ // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter:function filter(callbackfn /* , thisArg */){return $filter(this,callbackfn,arguments[1]);}});},{"16":16,"33":33,"96":96}],123:[function(_dereq_,module,exports){'use strict'; // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
  var $export=_dereq_(33),$find=_dereq_(16)(6),KEY='findIndex',forced=true; // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){forced=false;});$export($export.P+$export.F*forced,'Array',{findIndex:function findIndex(callbackfn /*, that = undefined */){return $find(this,callbackfn,arguments.length>1?arguments[1]:undefined);}});_dereq_(9)(KEY);},{"16":16,"33":33,"9":9}],124:[function(_dereq_,module,exports){'use strict'; // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
  var $export=_dereq_(33),$find=_dereq_(16)(5),KEY='find',forced=true; // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){forced=false;});$export($export.P+$export.F*forced,'Array',{find:function find(callbackfn /*, that = undefined */){return $find(this,callbackfn,arguments.length>1?arguments[1]:undefined);}});_dereq_(9)(KEY);},{"16":16,"33":33,"9":9}],125:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$forEach=_dereq_(16)(0),STRICT=_dereq_(96)([].forEach,true);$export($export.P+$export.F*!STRICT,'Array',{ // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach:function forEach(callbackfn /* , thisArg */){return $forEach(this,callbackfn,arguments[1]);}});},{"16":16,"33":33,"96":96}],126:[function(_dereq_,module,exports){'use strict';var ctx=_dereq_(27),$export=_dereq_(33),toObject=_dereq_(109),call=_dereq_(52),isArrayIter=_dereq_(47),toLength=_dereq_(108),getIterFn=_dereq_(116);$export($export.S+$export.F*!_dereq_(55)(function(iter){Array.from(iter);}),'Array',{ // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from:function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/){var O=toObject(arrayLike),C=typeof this=='function'?this:Array,aLen=arguments.length,mapfn=aLen>1?arguments[1]:undefined,mapping=mapfn!==undefined,index=0,iterFn=getIterFn(O),length,result,step,iterator;if(mapping)mapfn=ctx(mapfn,aLen>2?arguments[2]:undefined,2); // if object isn't iterable or it's array with default iterator - use simple case
  if(iterFn!=undefined&&!(C==Array&&isArrayIter(iterFn))){for(iterator=iterFn.call(O),result=new C();!(step=iterator.next()).done;index++){result[index]=mapping?call(iterator,mapfn,[step.value,index],true):step.value;}}else {length=toLength(O.length);for(result=new C(length);length>index;index++){result[index]=mapping?mapfn(O[index],index):O[index];}}result.length=index;return result;}});},{"108":108,"109":109,"116":116,"27":27,"33":33,"47":47,"52":52,"55":55}],127:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$indexOf=_dereq_(15)(false);$export($export.P+$export.F*!_dereq_(96)([].indexOf),'Array',{ // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf:function indexOf(searchElement /*, fromIndex = 0 */){return $indexOf(this,searchElement,arguments[1]);}});},{"15":15,"33":33,"96":96}],128:[function(_dereq_,module,exports){ // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
  var $export=_dereq_(33);$export($export.S,'Array',{isArray:_dereq_(48)});},{"33":33,"48":48}],129:[function(_dereq_,module,exports){'use strict';var addToUnscopables=_dereq_(9),step=_dereq_(56),Iterators=_dereq_(57),toIObject=_dereq_(107); // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  module.exports=_dereq_(54)(Array,'Array',function(iterated,kind){this._t=toIObject(iterated); // target
  this._i=0; // next index
  this._k=kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  },function(){var O=this._t,kind=this._k,index=this._i++;if(!O||index>=O.length){this._t=undefined;return step(1);}if(kind=='keys')return step(0,index);if(kind=='values')return step(0,O[index]);return step(0,[index,O[index]]);},'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators.Arguments=Iterators.Array;addToUnscopables('keys');addToUnscopables('values');addToUnscopables('entries');},{"107":107,"54":54,"56":56,"57":57,"9":9}],130:[function(_dereq_,module,exports){'use strict'; // 22.1.3.13 Array.prototype.join(separator)
  var $export=_dereq_(33),toIObject=_dereq_(107),arrayJoin=[].join; // fallback for not array-like strings
  $export($export.P+$export.F*(_dereq_(46)!=Object||!_dereq_(96)(arrayJoin)),'Array',{join:function join(separator){return arrayJoin.call(toIObject(this),separator===undefined?',':separator);}});},{"107":107,"33":33,"46":46,"96":96}],131:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),toIObject=_dereq_(107),toInteger=_dereq_(106),toLength=_dereq_(108);$export($export.P+$export.F*!_dereq_(96)([].lastIndexOf),'Array',{ // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf:function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){var O=toIObject(this),length=toLength(O.length),index=length-1;if(arguments.length>1)index=Math.min(index,toInteger(arguments[1]));if(index<0)index=length+index;for(;index>=0;index--){if(index in O)if(O[index]===searchElement)return index;}return -1;}});},{"106":106,"107":107,"108":108,"33":33,"96":96}],132:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$map=_dereq_(16)(1);$export($export.P+$export.F*!_dereq_(96)([].map,true),'Array',{ // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map:function map(callbackfn /* , thisArg */){return $map(this,callbackfn,arguments[1]);}});},{"16":16,"33":33,"96":96}],133:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33); // WebKit Array.of isn't generic
  $export($export.S+$export.F*_dereq_(35)(function(){function F(){}return !(Array.of.call(F) instanceof F);}),'Array',{ // 22.1.2.3 Array.of( ...items)
  of:function of() /* ...args */{var index=0,aLen=arguments.length,result=new (typeof this=='function'?this:Array)(aLen);while(aLen>index){result[index]=arguments[index++];}result.length=aLen;return result;}});},{"33":33,"35":35}],134:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$reduce=_dereq_(17);$export($export.P+$export.F*!_dereq_(96)([].reduceRight,true),'Array',{ // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight:function reduceRight(callbackfn /* , initialValue */){return $reduce(this,callbackfn,arguments.length,arguments[1],true);}});},{"17":17,"33":33,"96":96}],135:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$reduce=_dereq_(17);$export($export.P+$export.F*!_dereq_(96)([].reduce,true),'Array',{ // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce:function reduce(callbackfn /* , initialValue */){return $reduce(this,callbackfn,arguments.length,arguments[1],false);}});},{"17":17,"33":33,"96":96}],136:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),html=_dereq_(42),cof=_dereq_(21),toIndex=_dereq_(105),toLength=_dereq_(108),arraySlice=[].slice; // fallback for not array-like ES3 strings and DOM objects
  $export($export.P+$export.F*_dereq_(35)(function(){if(html)arraySlice.call(html);}),'Array',{slice:function slice(begin,end){var len=toLength(this.length),klass=cof(this);end=end===undefined?len:end;if(klass=='Array')return arraySlice.call(this,begin,end);var start=toIndex(begin,len),upTo=toIndex(end,len),size=toLength(upTo-start),cloned=Array(size),i=0;for(;i<size;i++){cloned[i]=klass=='String'?this.charAt(start+i):this[start+i];}return cloned;}});},{"105":105,"108":108,"21":21,"33":33,"35":35,"42":42}],137:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$some=_dereq_(16)(3);$export($export.P+$export.F*!_dereq_(96)([].some,true),'Array',{ // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some:function some(callbackfn /* , thisArg */){return $some(this,callbackfn,arguments[1]);}});},{"16":16,"33":33,"96":96}],138:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),aFunction=_dereq_(7),toObject=_dereq_(109),fails=_dereq_(35),$sort=[].sort,test=[1,2,3];$export($export.P+$export.F*(fails(function(){ // IE8-
  test.sort(undefined);})||!fails(function(){ // V8 bug
  test.sort(null); // Old WebKit
  })||!_dereq_(96)($sort)),'Array',{ // 22.1.3.25 Array.prototype.sort(comparefn)
  sort:function sort(comparefn){return comparefn===undefined?$sort.call(toObject(this)):$sort.call(toObject(this),aFunction(comparefn));}});},{"109":109,"33":33,"35":35,"7":7,"96":96}],139:[function(_dereq_,module,exports){_dereq_(91)('Array');},{"91":91}],140:[function(_dereq_,module,exports){ // 20.3.3.1 / 15.9.4.4 Date.now()
  var $export=_dereq_(33);$export($export.S,'Date',{now:function now(){return +new Date();}});},{"33":33}],141:[function(_dereq_,module,exports){'use strict'; // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
  var $export=_dereq_(33),fails=_dereq_(35);var lz=function lz(num){return num>9?num:'0'+num;}; // PhantomJS / old WebKit has a broken implementations
  $export($export.P+$export.F*(fails(function(){return new Date(-5e13-1).toISOString()!='0385-07-25T07:06:39.999Z';})||!fails(function(){new Date(NaN).toISOString();})),'Date',{toISOString:function toISOString(){if(!isFinite(this))throw RangeError('Invalid time value');var d=this,y=d.getUTCFullYear(),m=d.getUTCMilliseconds(),s=y<0?'-':y>9999?'+':'';return s+('00000'+Math.abs(y)).slice(s?-6:-4)+'-'+lz(d.getUTCMonth()+1)+'-'+lz(d.getUTCDate())+'T'+lz(d.getUTCHours())+':'+lz(d.getUTCMinutes())+':'+lz(d.getUTCSeconds())+'.'+(m>99?m:'0'+lz(m))+'Z';}});},{"33":33,"35":35}],142:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),toObject=_dereq_(109),toPrimitive=_dereq_(110);$export($export.P+$export.F*_dereq_(35)(function(){return new Date(NaN).toJSON()!==null||Date.prototype.toJSON.call({toISOString:function toISOString(){return 1;}})!==1;}),'Date',{toJSON:function toJSON(key){var O=toObject(this),pv=toPrimitive(O);return typeof pv=='number'&&!isFinite(pv)?null:O.toISOString();}});},{"109":109,"110":110,"33":33,"35":35}],143:[function(_dereq_,module,exports){var DateProto=Date.prototype,INVALID_DATE='Invalid Date',TO_STRING='toString',$toString=DateProto[TO_STRING];if(new Date(NaN)+''!=INVALID_DATE){_dereq_(87)(DateProto,TO_STRING,function toString(){var value=+this;return value===value?$toString.call(this):INVALID_DATE;});}},{"87":87}],144:[function(_dereq_,module,exports){ // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
  var $export=_dereq_(33);$export($export.P,'Function',{bind:_dereq_(19)});},{"19":19,"33":33}],145:[function(_dereq_,module,exports){'use strict';var isObject=_dereq_(50),getPrototypeOf=_dereq_(74),HAS_INSTANCE=_dereq_(115)('hasInstance'),FunctionProto=Function.prototype; // 19.2.3.6 Function.prototype[@@hasInstance](V)
  if(!(HAS_INSTANCE in FunctionProto))_dereq_(68).f(FunctionProto,HAS_INSTANCE,{value:function value(O){if(typeof this!='function'||!isObject(O))return false;if(!isObject(this.prototype))return O instanceof this; // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O=getPrototypeOf(O)){if(this.prototype===O)return true;}return false;}});},{"115":115,"50":50,"68":68,"74":74}],146:[function(_dereq_,module,exports){var dP=_dereq_(68).f,createDesc=_dereq_(85),has=_dereq_(40),FProto=Function.prototype,nameRE=/^\s*function ([^ (]*)/,NAME='name'; // 19.2.4.2 name
  NAME in FProto||_dereq_(29)&&dP(FProto,NAME,{configurable:true,get:function get(){var match=(''+this).match(nameRE),name=match?match[1]:'';has(this,NAME)||dP(this,NAME,createDesc(5,name));return name;}});},{"29":29,"40":40,"68":68,"85":85}],147:[function(_dereq_,module,exports){'use strict';var strong=_dereq_(22); // 23.1 Map Objects
  module.exports=_dereq_(25)('Map',function(get){return function Map(){return get(this,arguments.length>0?arguments[0]:undefined);};},{ // 23.1.3.6 Map.prototype.get(key)
  get:function get(key){var entry=strong.getEntry(this,key);return entry&&entry.v;}, // 23.1.3.9 Map.prototype.set(key, value)
  set:function set(key,value){return strong.def(this,key===0?0:key,value);}},strong,true);},{"22":22,"25":25}],148:[function(_dereq_,module,exports){ // 20.2.2.3 Math.acosh(x)
  var $export=_dereq_(33),log1p=_dereq_(61),sqrt=Math.sqrt,$acosh=Math.acosh; // V8 bug https://code.google.com/p/v8/issues/detail?id=3509
  $export($export.S+$export.F*!($acosh&&Math.floor($acosh(Number.MAX_VALUE))==710),'Math',{acosh:function acosh(x){return (x=+x)<1?NaN:x>94906265.62425156?Math.log(x)+Math.LN2:log1p(x-1+sqrt(x-1)*sqrt(x+1));}});},{"33":33,"61":61}],149:[function(_dereq_,module,exports){ // 20.2.2.5 Math.asinh(x)
  var $export=_dereq_(33);function asinh(x){return !isFinite(x=+x)||x==0?x:x<0?-asinh(-x):Math.log(x+Math.sqrt(x*x+1));}$export($export.S,'Math',{asinh:asinh});},{"33":33}],150:[function(_dereq_,module,exports){ // 20.2.2.7 Math.atanh(x)
  var $export=_dereq_(33);$export($export.S,'Math',{atanh:function atanh(x){return (x=+x)==0?x:Math.log((1+x)/(1-x))/2;}});},{"33":33}],151:[function(_dereq_,module,exports){ // 20.2.2.9 Math.cbrt(x)
  var $export=_dereq_(33),sign=_dereq_(62);$export($export.S,'Math',{cbrt:function cbrt(x){return sign(x=+x)*Math.pow(Math.abs(x),1/3);}});},{"33":33,"62":62}],152:[function(_dereq_,module,exports){ // 20.2.2.11 Math.clz32(x)
  var $export=_dereq_(33);$export($export.S,'Math',{clz32:function clz32(x){return (x>>>=0)?31-Math.floor(Math.log(x+0.5)*Math.LOG2E):32;}});},{"33":33}],153:[function(_dereq_,module,exports){ // 20.2.2.12 Math.cosh(x)
  var $export=_dereq_(33),exp=Math.exp;$export($export.S,'Math',{cosh:function cosh(x){return (exp(x=+x)+exp(-x))/2;}});},{"33":33}],154:[function(_dereq_,module,exports){ // 20.2.2.14 Math.expm1(x)
  var $export=_dereq_(33);$export($export.S,'Math',{expm1:_dereq_(60)});},{"33":33,"60":60}],155:[function(_dereq_,module,exports){ // 20.2.2.16 Math.fround(x)
  var $export=_dereq_(33),sign=_dereq_(62),pow=Math.pow,EPSILON=pow(2,-52),EPSILON32=pow(2,-23),MAX32=pow(2,127)*(2-EPSILON32),MIN32=pow(2,-126);var roundTiesToEven=function roundTiesToEven(n){return n+1/EPSILON-1/EPSILON;};$export($export.S,'Math',{fround:function fround(x){var $abs=Math.abs(x),$sign=sign(x),a,result;if($abs<MIN32)return $sign*roundTiesToEven($abs/MIN32/EPSILON32)*MIN32*EPSILON32;a=(1+EPSILON32/EPSILON)*$abs;result=a-(a-$abs);if(result>MAX32||result!=result)return $sign*Infinity;return $sign*result;}});},{"33":33,"62":62}],156:[function(_dereq_,module,exports){ // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
  var $export=_dereq_(33),abs=Math.abs;$export($export.S,'Math',{hypot:function hypot(value1,value2){ // eslint-disable-line no-unused-vars
  var sum=0,i=0,aLen=arguments.length,larg=0,arg,div;while(i<aLen){arg=abs(arguments[i++]);if(larg<arg){div=larg/arg;sum=sum*div*div+1;larg=arg;}else if(arg>0){div=arg/larg;sum+=div*div;}else sum+=arg;}return larg===Infinity?Infinity:larg*Math.sqrt(sum);}});},{"33":33}],157:[function(_dereq_,module,exports){ // 20.2.2.18 Math.imul(x, y)
  var $export=_dereq_(33),$imul=Math.imul; // some WebKit versions fails with big numbers, some has wrong arity
  $export($export.S+$export.F*_dereq_(35)(function(){return $imul(0xffffffff,5)!=-5||$imul.length!=2;}),'Math',{imul:function imul(x,y){var UINT16=0xffff,xn=+x,yn=+y,xl=UINT16&xn,yl=UINT16&yn;return 0|xl*yl+((UINT16&xn>>>16)*yl+xl*(UINT16&yn>>>16)<<16>>>0);}});},{"33":33,"35":35}],158:[function(_dereq_,module,exports){ // 20.2.2.21 Math.log10(x)
  var $export=_dereq_(33);$export($export.S,'Math',{log10:function log10(x){return Math.log(x)/Math.LN10;}});},{"33":33}],159:[function(_dereq_,module,exports){ // 20.2.2.20 Math.log1p(x)
  var $export=_dereq_(33);$export($export.S,'Math',{log1p:_dereq_(61)});},{"33":33,"61":61}],160:[function(_dereq_,module,exports){ // 20.2.2.22 Math.log2(x)
  var $export=_dereq_(33);$export($export.S,'Math',{log2:function log2(x){return Math.log(x)/Math.LN2;}});},{"33":33}],161:[function(_dereq_,module,exports){ // 20.2.2.28 Math.sign(x)
  var $export=_dereq_(33);$export($export.S,'Math',{sign:_dereq_(62)});},{"33":33,"62":62}],162:[function(_dereq_,module,exports){ // 20.2.2.30 Math.sinh(x)
  var $export=_dereq_(33),expm1=_dereq_(60),exp=Math.exp; // V8 near Chromium 38 has a problem with very small numbers
  $export($export.S+$export.F*_dereq_(35)(function(){return !Math.sinh(-2e-17)!=-2e-17;}),'Math',{sinh:function sinh(x){return Math.abs(x=+x)<1?(expm1(x)-expm1(-x))/2:(exp(x-1)-exp(-x-1))*(Math.E/2);}});},{"33":33,"35":35,"60":60}],163:[function(_dereq_,module,exports){ // 20.2.2.33 Math.tanh(x)
  var $export=_dereq_(33),expm1=_dereq_(60),exp=Math.exp;$export($export.S,'Math',{tanh:function tanh(x){var a=expm1(x=+x),b=expm1(-x);return a==Infinity?1:b==Infinity?-1:(a-b)/(exp(x)+exp(-x));}});},{"33":33,"60":60}],164:[function(_dereq_,module,exports){ // 20.2.2.34 Math.trunc(x)
  var $export=_dereq_(33);$export($export.S,'Math',{trunc:function trunc(it){return (it>0?Math.floor:Math.ceil)(it);}});},{"33":33}],165:[function(_dereq_,module,exports){'use strict';var global=_dereq_(39),has=_dereq_(40),cof=_dereq_(21),inheritIfRequired=_dereq_(44),toPrimitive=_dereq_(110),fails=_dereq_(35),gOPN=_dereq_(72).f,gOPD=_dereq_(70).f,dP=_dereq_(68).f,$trim=_dereq_(102).trim,NUMBER='Number',$Number=global[NUMBER],Base=$Number,proto=$Number.prototype // Opera ~12 has broken Object#toString
  ,BROKEN_COF=cof(_dereq_(67)(proto))==NUMBER,TRIM='trim' in String.prototype; // 7.1.3 ToNumber(argument)
  var toNumber=function toNumber(argument){var it=toPrimitive(argument,false);if(typeof it=='string'&&it.length>2){it=TRIM?it.trim():$trim(it,3);var first=it.charCodeAt(0),third,radix,maxCode;if(first===43||first===45){third=it.charCodeAt(2);if(third===88||third===120)return NaN; // Number('+0x1') should be NaN, old V8 fix
  }else if(first===48){switch(it.charCodeAt(1)){case 66:case 98:radix=2;maxCode=49;break; // fast equal /^0b[01]+$/i
  case 79:case 111:radix=8;maxCode=55;break; // fast equal /^0o[0-7]+$/i
  default:return +it;}for(var digits=it.slice(2),i=0,l=digits.length,code;i<l;i++){code=digits.charCodeAt(i); // parseInt parses a string to a first unavailable symbol
  // but ToNumber should return NaN if a string contains unavailable symbols
  if(code<48||code>maxCode)return NaN;}return parseInt(digits,radix);}}return +it;};if(!$Number(' 0o1')||!$Number('0b1')||$Number('+0x1')){$Number=function Number(value){var it=arguments.length<1?0:value,that=this;return that instanceof $Number // check on 1..constructor(foo) case
  &&(BROKEN_COF?fails(function(){proto.valueOf.call(that);}):cof(that)!=NUMBER)?inheritIfRequired(new Base(toNumber(it)),that,$Number):toNumber(it);};for(var keys=_dereq_(29)?gOPN(Base):( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,'+ // ES6 (in case, if modules with ES6 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,'+'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','),j=0,key;keys.length>j;j++){if(has(Base,key=keys[j])&&!has($Number,key)){dP($Number,key,gOPD(Base,key));}}$Number.prototype=proto;proto.constructor=$Number;_dereq_(87)(global,NUMBER,$Number);}},{"102":102,"110":110,"21":21,"29":29,"35":35,"39":39,"40":40,"44":44,"67":67,"68":68,"70":70,"72":72,"87":87}],166:[function(_dereq_,module,exports){ // 20.1.2.1 Number.EPSILON
  var $export=_dereq_(33);$export($export.S,'Number',{EPSILON:Math.pow(2,-52)});},{"33":33}],167:[function(_dereq_,module,exports){ // 20.1.2.2 Number.isFinite(number)
  var $export=_dereq_(33),_isFinite=_dereq_(39).isFinite;$export($export.S,'Number',{isFinite:function isFinite(it){return typeof it=='number'&&_isFinite(it);}});},{"33":33,"39":39}],168:[function(_dereq_,module,exports){ // 20.1.2.3 Number.isInteger(number)
  var $export=_dereq_(33);$export($export.S,'Number',{isInteger:_dereq_(49)});},{"33":33,"49":49}],169:[function(_dereq_,module,exports){ // 20.1.2.4 Number.isNaN(number)
  var $export=_dereq_(33);$export($export.S,'Number',{isNaN:function isNaN(number){return number!=number;}});},{"33":33}],170:[function(_dereq_,module,exports){ // 20.1.2.5 Number.isSafeInteger(number)
  var $export=_dereq_(33),isInteger=_dereq_(49),abs=Math.abs;$export($export.S,'Number',{isSafeInteger:function isSafeInteger(number){return isInteger(number)&&abs(number)<=0x1fffffffffffff;}});},{"33":33,"49":49}],171:[function(_dereq_,module,exports){ // 20.1.2.6 Number.MAX_SAFE_INTEGER
  var $export=_dereq_(33);$export($export.S,'Number',{MAX_SAFE_INTEGER:0x1fffffffffffff});},{"33":33}],172:[function(_dereq_,module,exports){ // 20.1.2.10 Number.MIN_SAFE_INTEGER
  var $export=_dereq_(33);$export($export.S,'Number',{MIN_SAFE_INTEGER:-0x1fffffffffffff});},{"33":33}],173:[function(_dereq_,module,exports){var $export=_dereq_(33),$parseFloat=_dereq_(81); // 20.1.2.12 Number.parseFloat(string)
  $export($export.S+$export.F*(Number.parseFloat!=$parseFloat),'Number',{parseFloat:$parseFloat});},{"33":33,"81":81}],174:[function(_dereq_,module,exports){var $export=_dereq_(33),$parseInt=_dereq_(82); // 20.1.2.13 Number.parseInt(string, radix)
  $export($export.S+$export.F*(Number.parseInt!=$parseInt),'Number',{parseInt:$parseInt});},{"33":33,"82":82}],175:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),anInstance=_dereq_(10),toInteger=_dereq_(106),aNumberValue=_dereq_(8),repeat=_dereq_(101),$toFixed=1..toFixed,floor=Math.floor,data=[0,0,0,0,0,0],ERROR='Number.toFixed: incorrect invocation!',ZERO='0';var multiply=function multiply(n,c){var i=-1,c2=c;while(++i<6){c2+=n*data[i];data[i]=c2%1e7;c2=floor(c2/1e7);}};var divide=function divide(n){var i=6,c=0;while(--i>=0){c+=data[i];data[i]=floor(c/n);c=c%n*1e7;}};var numToString=function numToString(){var i=6,s='';while(--i>=0){if(s!==''||i===0||data[i]!==0){var t=String(data[i]);s=s===''?t:s+repeat.call(ZERO,7-t.length)+t;}}return s;};var pow=function pow(x,n,acc){return n===0?acc:n%2===1?pow(x,n-1,acc*x):pow(x*x,n/2,acc);};var log=function log(x){var n=0,x2=x;while(x2>=4096){n+=12;x2/=4096;}while(x2>=2){n+=1;x2/=2;}return n;};$export($export.P+$export.F*(!!$toFixed&&(0.00008.toFixed(3)!=='0.000'||0.9.toFixed(0)!=='1'||1.255.toFixed(2)!=='1.25'||1000000000000000128..toFixed(0)!=='1000000000000000128')||!_dereq_(35)(function(){ // V8 ~ Android 4.3-
  $toFixed.call({});})),'Number',{toFixed:function toFixed(fractionDigits){var x=aNumberValue(this,ERROR),f=toInteger(fractionDigits),s='',m=ZERO,e,z,j,k;if(f<0||f>20)throw RangeError(ERROR);if(x!=x)return 'NaN';if(x<=-1e21||x>=1e21)return String(x);if(x<0){s='-';x=-x;}if(x>1e-21){e=log(x*pow(2,69,1))-69;z=e<0?x*pow(2,-e,1):x/pow(2,e,1);z*=0x10000000000000;e=52-e;if(e>0){multiply(0,z);j=f;while(j>=7){multiply(1e7,0);j-=7;}multiply(pow(10,j,1),0);j=e-1;while(j>=23){divide(1<<23);j-=23;}divide(1<<j);multiply(1,1);divide(2);m=numToString();}else {multiply(0,z);multiply(1<<-e,0);m=numToString()+repeat.call(ZERO,f);}}if(f>0){k=m.length;m=s+(k<=f?'0.'+repeat.call(ZERO,f-k)+m:m.slice(0,k-f)+'.'+m.slice(k-f));}else {m=s+m;}return m;}});},{"10":10,"101":101,"106":106,"33":33,"35":35,"8":8}],176:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$fails=_dereq_(35),aNumberValue=_dereq_(8),$toPrecision=1..toPrecision;$export($export.P+$export.F*($fails(function(){ // IE7-
  return $toPrecision.call(1,undefined)!=='1';})||!$fails(function(){ // V8 ~ Android 4.3-
  $toPrecision.call({});})),'Number',{toPrecision:function toPrecision(precision){var that=aNumberValue(this,'Number#toPrecision: incorrect invocation!');return precision===undefined?$toPrecision.call(that):$toPrecision.call(that,precision);}});},{"33":33,"35":35,"8":8}],177:[function(_dereq_,module,exports){ // 19.1.3.1 Object.assign(target, source)
  var $export=_dereq_(33);$export($export.S+$export.F,'Object',{assign:_dereq_(66)});},{"33":33,"66":66}],178:[function(_dereq_,module,exports){var $export=_dereq_(33); // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  $export($export.S,'Object',{create:_dereq_(67)});},{"33":33,"67":67}],179:[function(_dereq_,module,exports){var $export=_dereq_(33); // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
  $export($export.S+$export.F*!_dereq_(29),'Object',{defineProperties:_dereq_(69)});},{"29":29,"33":33,"69":69}],180:[function(_dereq_,module,exports){var $export=_dereq_(33); // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  $export($export.S+$export.F*!_dereq_(29),'Object',{defineProperty:_dereq_(68).f});},{"29":29,"33":33,"68":68}],181:[function(_dereq_,module,exports){ // 19.1.2.5 Object.freeze(O)
  var isObject=_dereq_(50),meta=_dereq_(63).onFreeze;_dereq_(78)('freeze',function($freeze){return function freeze(it){return $freeze&&isObject(it)?$freeze(meta(it)):it;};});},{"50":50,"63":63,"78":78}],182:[function(_dereq_,module,exports){ // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  var toIObject=_dereq_(107),$getOwnPropertyDescriptor=_dereq_(70).f;_dereq_(78)('getOwnPropertyDescriptor',function(){return function getOwnPropertyDescriptor(it,key){return $getOwnPropertyDescriptor(toIObject(it),key);};});},{"107":107,"70":70,"78":78}],183:[function(_dereq_,module,exports){ // 19.1.2.7 Object.getOwnPropertyNames(O)
  _dereq_(78)('getOwnPropertyNames',function(){return _dereq_(71).f;});},{"71":71,"78":78}],184:[function(_dereq_,module,exports){ // 19.1.2.9 Object.getPrototypeOf(O)
  var toObject=_dereq_(109),$getPrototypeOf=_dereq_(74);_dereq_(78)('getPrototypeOf',function(){return function getPrototypeOf(it){return $getPrototypeOf(toObject(it));};});},{"109":109,"74":74,"78":78}],185:[function(_dereq_,module,exports){ // 19.1.2.11 Object.isExtensible(O)
  var isObject=_dereq_(50);_dereq_(78)('isExtensible',function($isExtensible){return function isExtensible(it){return isObject(it)?$isExtensible?$isExtensible(it):true:false;};});},{"50":50,"78":78}],186:[function(_dereq_,module,exports){ // 19.1.2.12 Object.isFrozen(O)
  var isObject=_dereq_(50);_dereq_(78)('isFrozen',function($isFrozen){return function isFrozen(it){return isObject(it)?$isFrozen?$isFrozen(it):false:true;};});},{"50":50,"78":78}],187:[function(_dereq_,module,exports){ // 19.1.2.13 Object.isSealed(O)
  var isObject=_dereq_(50);_dereq_(78)('isSealed',function($isSealed){return function isSealed(it){return isObject(it)?$isSealed?$isSealed(it):false:true;};});},{"50":50,"78":78}],188:[function(_dereq_,module,exports){ // 19.1.3.10 Object.is(value1, value2)
  var $export=_dereq_(33);$export($export.S,'Object',{is:_dereq_(89)});},{"33":33,"89":89}],189:[function(_dereq_,module,exports){ // 19.1.2.14 Object.keys(O)
  var toObject=_dereq_(109),$keys=_dereq_(76);_dereq_(78)('keys',function(){return function keys(it){return $keys(toObject(it));};});},{"109":109,"76":76,"78":78}],190:[function(_dereq_,module,exports){ // 19.1.2.15 Object.preventExtensions(O)
  var isObject=_dereq_(50),meta=_dereq_(63).onFreeze;_dereq_(78)('preventExtensions',function($preventExtensions){return function preventExtensions(it){return $preventExtensions&&isObject(it)?$preventExtensions(meta(it)):it;};});},{"50":50,"63":63,"78":78}],191:[function(_dereq_,module,exports){ // 19.1.2.17 Object.seal(O)
  var isObject=_dereq_(50),meta=_dereq_(63).onFreeze;_dereq_(78)('seal',function($seal){return function seal(it){return $seal&&isObject(it)?$seal(meta(it)):it;};});},{"50":50,"63":63,"78":78}],192:[function(_dereq_,module,exports){ // 19.1.3.19 Object.setPrototypeOf(O, proto)
  var $export=_dereq_(33);$export($export.S,'Object',{setPrototypeOf:_dereq_(90).set});},{"33":33,"90":90}],193:[function(_dereq_,module,exports){'use strict'; // 19.1.3.6 Object.prototype.toString()
  var classof=_dereq_(20),test={};test[_dereq_(115)('toStringTag')]='z';if(test+''!='[object z]'){_dereq_(87)(Object.prototype,'toString',function toString(){return '[object '+classof(this)+']';},true);}},{"115":115,"20":20,"87":87}],194:[function(_dereq_,module,exports){var $export=_dereq_(33),$parseFloat=_dereq_(81); // 18.2.4 parseFloat(string)
  $export($export.G+$export.F*(parseFloat!=$parseFloat),{parseFloat:$parseFloat});},{"33":33,"81":81}],195:[function(_dereq_,module,exports){var $export=_dereq_(33),$parseInt=_dereq_(82); // 18.2.5 parseInt(string, radix)
  $export($export.G+$export.F*(parseInt!=$parseInt),{parseInt:$parseInt});},{"33":33,"82":82}],196:[function(_dereq_,module,exports){'use strict';var LIBRARY=_dereq_(59),global=_dereq_(39),ctx=_dereq_(27),classof=_dereq_(20),$export=_dereq_(33),isObject=_dereq_(50),anObject=_dereq_(11),aFunction=_dereq_(7),anInstance=_dereq_(10),forOf=_dereq_(38),setProto=_dereq_(90).set,speciesConstructor=_dereq_(95),task=_dereq_(104).set,microtask=_dereq_(65),PROMISE='Promise',TypeError=global.TypeError,process=global.process,$Promise=global[PROMISE],isNode=classof(process)=='process',empty=function empty(){ /* empty */},Internal,GenericPromiseCapability,Wrapper;var USE_NATIVE=!!function(){try{ // correct subclassing with @@species support
  var promise=$Promise.resolve(1),FakePromise=(promise.constructor={})[_dereq_(115)('species')]=function(exec){exec(empty,empty);}; // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return (isNode||typeof PromiseRejectionEvent=='function')&&promise.then(empty) instanceof FakePromise;}catch(e){ /* empty */}}(); // helpers
  var sameConstructor=function sameConstructor(a,b){ // with library wrapper special case
  return a===b||a===$Promise&&b===Wrapper;};var isThenable=function isThenable(it){var then;return isObject(it)&&typeof (then=it.then)=='function'?then:false;};var newPromiseCapability=function newPromiseCapability(C){return sameConstructor($Promise,C)?new PromiseCapability(C):new GenericPromiseCapability(C);};var PromiseCapability=GenericPromiseCapability=function GenericPromiseCapability(C){var resolve,reject;this.promise=new C(function($$resolve,$$reject){if(resolve!==undefined||reject!==undefined)throw TypeError('Bad Promise constructor');resolve=$$resolve;reject=$$reject;});this.resolve=aFunction(resolve);this.reject=aFunction(reject);};var perform=function perform(exec){try{exec();}catch(e){return {error:e};}};var notify=function notify(promise,isReject){if(promise._n)return;promise._n=true;var chain=promise._c;microtask(function(){var value=promise._v,ok=promise._s==1,i=0;var run=function run(reaction){var handler=ok?reaction.ok:reaction.fail,resolve=reaction.resolve,reject=reaction.reject,result,then;try{if(handler){if(!ok){if(promise._h==2)onHandleUnhandled(promise);promise._h=1;}result=handler===true?value:handler(value);if(result===reaction.promise){reject(TypeError('Promise-chain cycle'));}else if(then=isThenable(result)){then.call(result,resolve,reject);}else resolve(result);}else reject(value);}catch(e){reject(e);}};while(chain.length>i){run(chain[i++]);} // variable length - can't use forEach
  promise._c=[];promise._n=false;if(isReject&&!promise._h)onUnhandled(promise);});};var onUnhandled=function onUnhandled(promise){task.call(global,function(){var value=promise._v,abrupt,handler,console;if(isUnhandled(promise)){abrupt=perform(function(){if(isNode){process.emit('unhandledRejection',value,promise);}else if(handler=global.onunhandledrejection){handler({promise:promise,reason:value});}else if((console=global.console)&&console.error){console.error('Unhandled promise rejection',value);}}); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
  promise._h=isNode||isUnhandled(promise)?2:1;}promise._a=undefined;if(abrupt)throw abrupt.error;});};var isUnhandled=function isUnhandled(promise){if(promise._h==1)return false;var chain=promise._a||promise._c,i=0,reaction;while(chain.length>i){reaction=chain[i++];if(reaction.fail||!isUnhandled(reaction.promise))return false;}return true;};var onHandleUnhandled=function onHandleUnhandled(promise){task.call(global,function(){var handler;if(isNode){process.emit('rejectionHandled',promise);}else if(handler=global.onrejectionhandled){handler({promise:promise,reason:promise._v});}});};var $reject=function $reject(value){var promise=this;if(promise._d)return;promise._d=true;promise=promise._w||promise; // unwrap
  promise._v=value;promise._s=2;if(!promise._a)promise._a=promise._c.slice();notify(promise,true);};var $resolve=function $resolve(value){var promise=this,then;if(promise._d)return;promise._d=true;promise=promise._w||promise; // unwrap
  try{if(promise===value)throw TypeError("Promise can't be resolved itself");if(then=isThenable(value)){microtask(function(){var wrapper={_w:promise,_d:false}; // wrap
  try{then.call(value,ctx($resolve,wrapper,1),ctx($reject,wrapper,1));}catch(e){$reject.call(wrapper,e);}});}else {promise._v=value;promise._s=1;notify(promise,false);}}catch(e){$reject.call({_w:promise,_d:false},e); // wrap
  }}; // constructor polyfill
  if(!USE_NATIVE){ // 25.4.3.1 Promise(executor)
  $Promise=function Promise(executor){anInstance(this,$Promise,PROMISE,'_h');aFunction(executor);Internal.call(this);try{executor(ctx($resolve,this,1),ctx($reject,this,1));}catch(err){$reject.call(this,err);}};Internal=function Promise(executor){this._c=[]; // <- awaiting reactions
  this._a=undefined; // <- checked in isUnhandled reactions
  this._s=0; // <- state
  this._d=false; // <- done
  this._v=undefined; // <- value
  this._h=0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
  this._n=false; // <- notify
  };Internal.prototype=_dereq_(86)($Promise.prototype,{ // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
  then:function then(onFulfilled,onRejected){var reaction=newPromiseCapability(speciesConstructor(this,$Promise));reaction.ok=typeof onFulfilled=='function'?onFulfilled:true;reaction.fail=typeof onRejected=='function'&&onRejected;this._c.push(reaction);if(this._a)this._a.push(reaction);if(this._s)notify(this,false);return reaction.promise;}, // 25.4.5.1 Promise.prototype.catch(onRejected)
  'catch':function _catch(onRejected){return this.then(undefined,onRejected);}});PromiseCapability=function PromiseCapability(){var promise=new Internal();this.promise=promise;this.resolve=ctx($resolve,promise,1);this.reject=ctx($reject,promise,1);};}$export($export.G+$export.W+$export.F*!USE_NATIVE,{Promise:$Promise});_dereq_(92)($Promise,PROMISE);_dereq_(91)(PROMISE);Wrapper=_dereq_(26)[PROMISE]; // statics
  $export($export.S+$export.F*!USE_NATIVE,PROMISE,{ // 25.4.4.5 Promise.reject(r)
  reject:function reject(r){var capability=newPromiseCapability(this),$$reject=capability.reject;$$reject(r);return capability.promise;}});$export($export.S+$export.F*(LIBRARY||!USE_NATIVE),PROMISE,{ // 25.4.4.6 Promise.resolve(x)
  resolve:function resolve(x){ // instanceof instead of internal slot check because we should fix it without replacement native Promise core
  if(x instanceof $Promise&&sameConstructor(x.constructor,this))return x;var capability=newPromiseCapability(this),$$resolve=capability.resolve;$$resolve(x);return capability.promise;}});$export($export.S+$export.F*!(USE_NATIVE&&_dereq_(55)(function(iter){$Promise.all(iter)['catch'](empty);})),PROMISE,{ // 25.4.4.1 Promise.all(iterable)
  all:function all(iterable){var C=this,capability=newPromiseCapability(C),resolve=capability.resolve,reject=capability.reject;var abrupt=perform(function(){var values=[],index=0,remaining=1;forOf(iterable,false,function(promise){var $index=index++,alreadyCalled=false;values.push(undefined);remaining++;C.resolve(promise).then(function(value){if(alreadyCalled)return;alreadyCalled=true;values[$index]=value;--remaining||resolve(values);},reject);});--remaining||resolve(values);});if(abrupt)reject(abrupt.error);return capability.promise;}, // 25.4.4.4 Promise.race(iterable)
  race:function race(iterable){var C=this,capability=newPromiseCapability(C),reject=capability.reject;var abrupt=perform(function(){forOf(iterable,false,function(promise){C.resolve(promise).then(capability.resolve,reject);});});if(abrupt)reject(abrupt.error);return capability.promise;}});},{"10":10,"104":104,"11":11,"115":115,"20":20,"26":26,"27":27,"33":33,"38":38,"39":39,"50":50,"55":55,"59":59,"65":65,"7":7,"86":86,"90":90,"91":91,"92":92,"95":95}],197:[function(_dereq_,module,exports){ // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
  var $export=_dereq_(33),_apply=Function.apply;$export($export.S,'Reflect',{apply:function apply(target,thisArgument,argumentsList){return _apply.call(target,thisArgument,argumentsList);}});},{"33":33}],198:[function(_dereq_,module,exports){ // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
  var $export=_dereq_(33),create=_dereq_(67),aFunction=_dereq_(7),anObject=_dereq_(11),isObject=_dereq_(50),bind=_dereq_(19); // MS Edge supports only 2 arguments
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  $export($export.S+$export.F*_dereq_(35)(function(){function F(){}return !(Reflect.construct(function(){},[],F) instanceof F);}),'Reflect',{construct:function construct(Target,args /*, newTarget*/){aFunction(Target);var newTarget=arguments.length<3?Target:aFunction(arguments[2]);if(Target==newTarget){ // w/o altered newTarget, optimization for 0-4 arguments
  if(args!=undefined)switch(anObject(args).length){case 0:return new Target();case 1:return new Target(args[0]);case 2:return new Target(args[0],args[1]);case 3:return new Target(args[0],args[1],args[2]);case 4:return new Target(args[0],args[1],args[2],args[3]);} // w/o altered newTarget, lot of arguments case
  var $args=[null];$args.push.apply($args,args);return new (bind.apply(Target,$args))();} // with altered newTarget, not support built-in constructors
  var proto=newTarget.prototype,instance=create(isObject(proto)?proto:Object.prototype),result=Function.apply.call(Target,instance,args);return isObject(result)?result:instance;}});},{"11":11,"19":19,"33":33,"35":35,"50":50,"67":67,"7":7}],199:[function(_dereq_,module,exports){ // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
  var dP=_dereq_(68),$export=_dereq_(33),anObject=_dereq_(11),toPrimitive=_dereq_(110); // MS Edge has broken Reflect.defineProperty - throwing instead of returning false
  $export($export.S+$export.F*_dereq_(35)(function(){Reflect.defineProperty(dP.f({},1,{value:1}),1,{value:2});}),'Reflect',{defineProperty:function defineProperty(target,propertyKey,attributes){anObject(target);propertyKey=toPrimitive(propertyKey,true);anObject(attributes);try{dP.f(target,propertyKey,attributes);return true;}catch(e){return false;}}});},{"11":11,"110":110,"33":33,"35":35,"68":68}],200:[function(_dereq_,module,exports){ // 26.1.4 Reflect.deleteProperty(target, propertyKey)
  var $export=_dereq_(33),gOPD=_dereq_(70).f,anObject=_dereq_(11);$export($export.S,'Reflect',{deleteProperty:function deleteProperty(target,propertyKey){var desc=gOPD(anObject(target),propertyKey);return desc&&!desc.configurable?false:delete target[propertyKey];}});},{"11":11,"33":33,"70":70}],201:[function(_dereq_,module,exports){'use strict'; // 26.1.5 Reflect.enumerate(target)
  var $export=_dereq_(33),anObject=_dereq_(11);var Enumerate=function Enumerate(iterated){this._t=anObject(iterated); // target
  this._i=0; // next index
  var keys=this._k=[] // keys
  ,key;for(key in iterated){keys.push(key);}};_dereq_(53)(Enumerate,'Object',function(){var that=this,keys=that._k,key;do {if(that._i>=keys.length)return {value:undefined,done:true};}while(!((key=keys[that._i++]) in that._t));return {value:key,done:false};});$export($export.S,'Reflect',{enumerate:function enumerate(target){return new Enumerate(target);}});},{"11":11,"33":33,"53":53}],202:[function(_dereq_,module,exports){ // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
  var gOPD=_dereq_(70),$export=_dereq_(33),anObject=_dereq_(11);$export($export.S,'Reflect',{getOwnPropertyDescriptor:function getOwnPropertyDescriptor(target,propertyKey){return gOPD.f(anObject(target),propertyKey);}});},{"11":11,"33":33,"70":70}],203:[function(_dereq_,module,exports){ // 26.1.8 Reflect.getPrototypeOf(target)
  var $export=_dereq_(33),getProto=_dereq_(74),anObject=_dereq_(11);$export($export.S,'Reflect',{getPrototypeOf:function getPrototypeOf(target){return getProto(anObject(target));}});},{"11":11,"33":33,"74":74}],204:[function(_dereq_,module,exports){ // 26.1.6 Reflect.get(target, propertyKey [, receiver])
  var gOPD=_dereq_(70),getPrototypeOf=_dereq_(74),has=_dereq_(40),$export=_dereq_(33),isObject=_dereq_(50),anObject=_dereq_(11);function get(target,propertyKey /*, receiver*/){var receiver=arguments.length<3?target:arguments[2],desc,proto;if(anObject(target)===receiver)return target[propertyKey];if(desc=gOPD.f(target,propertyKey))return has(desc,'value')?desc.value:desc.get!==undefined?desc.get.call(receiver):undefined;if(isObject(proto=getPrototypeOf(target)))return get(proto,propertyKey,receiver);}$export($export.S,'Reflect',{get:get});},{"11":11,"33":33,"40":40,"50":50,"70":70,"74":74}],205:[function(_dereq_,module,exports){ // 26.1.9 Reflect.has(target, propertyKey)
  var $export=_dereq_(33);$export($export.S,'Reflect',{has:function has(target,propertyKey){return propertyKey in target;}});},{"33":33}],206:[function(_dereq_,module,exports){ // 26.1.10 Reflect.isExtensible(target)
  var $export=_dereq_(33),anObject=_dereq_(11),$isExtensible=Object.isExtensible;$export($export.S,'Reflect',{isExtensible:function isExtensible(target){anObject(target);return $isExtensible?$isExtensible(target):true;}});},{"11":11,"33":33}],207:[function(_dereq_,module,exports){ // 26.1.11 Reflect.ownKeys(target)
  var $export=_dereq_(33);$export($export.S,'Reflect',{ownKeys:_dereq_(80)});},{"33":33,"80":80}],208:[function(_dereq_,module,exports){ // 26.1.12 Reflect.preventExtensions(target)
  var $export=_dereq_(33),anObject=_dereq_(11),$preventExtensions=Object.preventExtensions;$export($export.S,'Reflect',{preventExtensions:function preventExtensions(target){anObject(target);try{if($preventExtensions)$preventExtensions(target);return true;}catch(e){return false;}}});},{"11":11,"33":33}],209:[function(_dereq_,module,exports){ // 26.1.14 Reflect.setPrototypeOf(target, proto)
  var $export=_dereq_(33),setProto=_dereq_(90);if(setProto)$export($export.S,'Reflect',{setPrototypeOf:function setPrototypeOf(target,proto){setProto.check(target,proto);try{setProto.set(target,proto);return true;}catch(e){return false;}}});},{"33":33,"90":90}],210:[function(_dereq_,module,exports){ // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
  var dP=_dereq_(68),gOPD=_dereq_(70),getPrototypeOf=_dereq_(74),has=_dereq_(40),$export=_dereq_(33),createDesc=_dereq_(85),anObject=_dereq_(11),isObject=_dereq_(50);function set(target,propertyKey,V /*, receiver*/){var receiver=arguments.length<4?target:arguments[3],ownDesc=gOPD.f(anObject(target),propertyKey),existingDescriptor,proto;if(!ownDesc){if(isObject(proto=getPrototypeOf(target))){return set(proto,propertyKey,V,receiver);}ownDesc=createDesc(0);}if(has(ownDesc,'value')){if(ownDesc.writable===false||!isObject(receiver))return false;existingDescriptor=gOPD.f(receiver,propertyKey)||createDesc(0);existingDescriptor.value=V;dP.f(receiver,propertyKey,existingDescriptor);return true;}return ownDesc.set===undefined?false:(ownDesc.set.call(receiver,V),true);}$export($export.S,'Reflect',{set:set});},{"11":11,"33":33,"40":40,"50":50,"68":68,"70":70,"74":74,"85":85}],211:[function(_dereq_,module,exports){var global=_dereq_(39),inheritIfRequired=_dereq_(44),dP=_dereq_(68).f,gOPN=_dereq_(72).f,isRegExp=_dereq_(51),$flags=_dereq_(37),$RegExp=global.RegExp,Base=$RegExp,proto=$RegExp.prototype,re1=/a/g,re2=/a/g // "new" creates a new object, old webkit buggy here
  ,CORRECT_NEW=new $RegExp(re1)!==re1;if(_dereq_(29)&&(!CORRECT_NEW||_dereq_(35)(function(){re2[_dereq_(115)('match')]=false; // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1)!=re1||$RegExp(re2)==re2||$RegExp(re1,'i')!='/a/i';}))){$RegExp=function RegExp(p,f){var tiRE=this instanceof $RegExp,piRE=isRegExp(p),fiU=f===undefined;return !tiRE&&piRE&&p.constructor===$RegExp&&fiU?p:inheritIfRequired(CORRECT_NEW?new Base(piRE&&!fiU?p.source:p,f):Base((piRE=p instanceof $RegExp)?p.source:p,piRE&&fiU?$flags.call(p):f),tiRE?this:proto,$RegExp);};var proxy=function proxy(key){key in $RegExp||dP($RegExp,key,{configurable:true,get:function get(){return Base[key];},set:function set(it){Base[key]=it;}});};for(var keys=gOPN(Base),i=0;keys.length>i;){proxy(keys[i++]);}proto.constructor=$RegExp;$RegExp.prototype=proto;_dereq_(87)(global,'RegExp',$RegExp);}_dereq_(91)('RegExp');},{"115":115,"29":29,"35":35,"37":37,"39":39,"44":44,"51":51,"68":68,"72":72,"87":87,"91":91}],212:[function(_dereq_,module,exports){ // 21.2.5.3 get RegExp.prototype.flags()
  if(_dereq_(29)&&/./g.flags!='g')_dereq_(68).f(RegExp.prototype,'flags',{configurable:true,get:_dereq_(37)});},{"29":29,"37":37,"68":68}],213:[function(_dereq_,module,exports){ // @@match logic
  _dereq_(36)('match',1,function(defined,MATCH,$match){ // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){'use strict';var O=defined(this),fn=regexp==undefined?undefined:regexp[MATCH];return fn!==undefined?fn.call(regexp,O):new RegExp(regexp)[MATCH](String(O));},$match];});},{"36":36}],214:[function(_dereq_,module,exports){ // @@replace logic
  _dereq_(36)('replace',2,function(defined,REPLACE,$replace){ // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue,replaceValue){'use strict';var O=defined(this),fn=searchValue==undefined?undefined:searchValue[REPLACE];return fn!==undefined?fn.call(searchValue,O,replaceValue):$replace.call(String(O),searchValue,replaceValue);},$replace];});},{"36":36}],215:[function(_dereq_,module,exports){ // @@search logic
  _dereq_(36)('search',1,function(defined,SEARCH,$search){ // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){'use strict';var O=defined(this),fn=regexp==undefined?undefined:regexp[SEARCH];return fn!==undefined?fn.call(regexp,O):new RegExp(regexp)[SEARCH](String(O));},$search];});},{"36":36}],216:[function(_dereq_,module,exports){ // @@split logic
  _dereq_(36)('split',2,function(defined,SPLIT,$split){'use strict';var isRegExp=_dereq_(51),_split=$split,$push=[].push,$SPLIT='split',LENGTH='length',LAST_INDEX='lastIndex';if('abbc'[$SPLIT](/(b)*/)[1]=='c'||'test'[$SPLIT](/(?:)/,-1)[LENGTH]!=4||'ab'[$SPLIT](/(?:ab)*/)[LENGTH]!=2||'.'[$SPLIT](/(.?)(.?)/)[LENGTH]!=4||'.'[$SPLIT](/()()/)[LENGTH]>1||''[$SPLIT](/.?/)[LENGTH]){var NPCG=/()??/.exec('')[1]===undefined; // nonparticipating capturing group
  // based on es5-shim implementation, need to rework it
  $split=function $split(separator,limit){var string=String(this);if(separator===undefined&&limit===0)return []; // If `separator` is not a regex, use native split
  if(!isRegExp(separator))return _split.call(string,separator,limit);var output=[];var flags=(separator.ignoreCase?'i':'')+(separator.multiline?'m':'')+(separator.unicode?'u':'')+(separator.sticky?'y':'');var lastLastIndex=0;var splitLimit=limit===undefined?4294967295:limit>>>0; // Make `global` and avoid `lastIndex` issues by working with a copy
  var separatorCopy=new RegExp(separator.source,flags+'g');var separator2,match,lastIndex,lastLength,i; // Doesn't need flags gy, but they don't hurt
  if(!NPCG)separator2=new RegExp('^'+separatorCopy.source+'$(?!\\s)',flags);while(match=separatorCopy.exec(string)){ // `separatorCopy.lastIndex` is not reliable cross-browser
  lastIndex=match.index+match[0][LENGTH];if(lastIndex>lastLastIndex){output.push(string.slice(lastLastIndex,match.index)); // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
  if(!NPCG&&match[LENGTH]>1)match[0].replace(separator2,function(){for(i=1;i<arguments[LENGTH]-2;i++){if(arguments[i]===undefined)match[i]=undefined;}});if(match[LENGTH]>1&&match.index<string[LENGTH])$push.apply(output,match.slice(1));lastLength=match[0][LENGTH];lastLastIndex=lastIndex;if(output[LENGTH]>=splitLimit)break;}if(separatorCopy[LAST_INDEX]===match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
  }if(lastLastIndex===string[LENGTH]){if(lastLength||!separatorCopy.test(''))output.push('');}else output.push(string.slice(lastLastIndex));return output[LENGTH]>splitLimit?output.slice(0,splitLimit):output;}; // Chakra, V8
  }else if('0'[$SPLIT](undefined,0)[LENGTH]){$split=function $split(separator,limit){return separator===undefined&&limit===0?[]:_split.call(this,separator,limit);};} // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator,limit){var O=defined(this),fn=separator==undefined?undefined:separator[SPLIT];return fn!==undefined?fn.call(separator,O,limit):$split.call(String(O),separator,limit);},$split];});},{"36":36,"51":51}],217:[function(_dereq_,module,exports){'use strict';_dereq_(212);var anObject=_dereq_(11),$flags=_dereq_(37),DESCRIPTORS=_dereq_(29),TO_STRING='toString',$toString=/./[TO_STRING];var define=function define(fn){_dereq_(87)(RegExp.prototype,TO_STRING,fn,true);}; // 21.2.5.14 RegExp.prototype.toString()
  if(_dereq_(35)(function(){return $toString.call({source:'a',flags:'b'})!='/a/b';})){define(function toString(){var R=anObject(this);return '/'.concat(R.source,'/','flags' in R?R.flags:!DESCRIPTORS&&R instanceof RegExp?$flags.call(R):undefined);}); // FF44- RegExp#toString has a wrong name
  }else if($toString.name!=TO_STRING){define(function toString(){return $toString.call(this);});}},{"11":11,"212":212,"29":29,"35":35,"37":37,"87":87}],218:[function(_dereq_,module,exports){'use strict';var strong=_dereq_(22); // 23.2 Set Objects
  module.exports=_dereq_(25)('Set',function(get){return function Set(){return get(this,arguments.length>0?arguments[0]:undefined);};},{ // 23.2.3.1 Set.prototype.add(value)
  add:function add(value){return strong.def(this,value=value===0?0:value,value);}},strong);},{"22":22,"25":25}],219:[function(_dereq_,module,exports){'use strict'; // B.2.3.2 String.prototype.anchor(name)
  _dereq_(99)('anchor',function(createHTML){return function anchor(name){return createHTML(this,'a','name',name);};});},{"99":99}],220:[function(_dereq_,module,exports){'use strict'; // B.2.3.3 String.prototype.big()
  _dereq_(99)('big',function(createHTML){return function big(){return createHTML(this,'big','','');};});},{"99":99}],221:[function(_dereq_,module,exports){'use strict'; // B.2.3.4 String.prototype.blink()
  _dereq_(99)('blink',function(createHTML){return function blink(){return createHTML(this,'blink','','');};});},{"99":99}],222:[function(_dereq_,module,exports){'use strict'; // B.2.3.5 String.prototype.bold()
  _dereq_(99)('bold',function(createHTML){return function bold(){return createHTML(this,'b','','');};});},{"99":99}],223:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$at=_dereq_(97)(false);$export($export.P,'String',{ // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt:function codePointAt(pos){return $at(this,pos);}});},{"33":33,"97":97}],224:[function(_dereq_,module,exports){ // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
  'use strict';var $export=_dereq_(33),toLength=_dereq_(108),context=_dereq_(98),ENDS_WITH='endsWith',$endsWith=''[ENDS_WITH];$export($export.P+$export.F*_dereq_(34)(ENDS_WITH),'String',{endsWith:function endsWith(searchString /*, endPosition = @length */){var that=context(this,searchString,ENDS_WITH),endPosition=arguments.length>1?arguments[1]:undefined,len=toLength(that.length),end=endPosition===undefined?len:Math.min(toLength(endPosition),len),search=String(searchString);return $endsWith?$endsWith.call(that,search,end):that.slice(end-search.length,end)===search;}});},{"108":108,"33":33,"34":34,"98":98}],225:[function(_dereq_,module,exports){'use strict'; // B.2.3.6 String.prototype.fixed()
  _dereq_(99)('fixed',function(createHTML){return function fixed(){return createHTML(this,'tt','','');};});},{"99":99}],226:[function(_dereq_,module,exports){'use strict'; // B.2.3.7 String.prototype.fontcolor(color)
  _dereq_(99)('fontcolor',function(createHTML){return function fontcolor(color){return createHTML(this,'font','color',color);};});},{"99":99}],227:[function(_dereq_,module,exports){'use strict'; // B.2.3.8 String.prototype.fontsize(size)
  _dereq_(99)('fontsize',function(createHTML){return function fontsize(size){return createHTML(this,'font','size',size);};});},{"99":99}],228:[function(_dereq_,module,exports){var $export=_dereq_(33),toIndex=_dereq_(105),fromCharCode=String.fromCharCode,$fromCodePoint=String.fromCodePoint; // length should be 1, old FF problem
  $export($export.S+$export.F*(!!$fromCodePoint&&$fromCodePoint.length!=1),'String',{ // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint:function fromCodePoint(x){ // eslint-disable-line no-unused-vars
  var res=[],aLen=arguments.length,i=0,code;while(aLen>i){code=+arguments[i++];if(toIndex(code,0x10ffff)!==code)throw RangeError(code+' is not a valid code point');res.push(code<0x10000?fromCharCode(code):fromCharCode(((code-=0x10000)>>10)+0xd800,code%0x400+0xdc00));}return res.join('');}});},{"105":105,"33":33}],229:[function(_dereq_,module,exports){ // 21.1.3.7 String.prototype.includes(searchString, position = 0)
  'use strict';var $export=_dereq_(33),context=_dereq_(98),INCLUDES='includes';$export($export.P+$export.F*_dereq_(34)(INCLUDES),'String',{includes:function includes(searchString /*, position = 0 */){return !! ~context(this,searchString,INCLUDES).indexOf(searchString,arguments.length>1?arguments[1]:undefined);}});},{"33":33,"34":34,"98":98}],230:[function(_dereq_,module,exports){'use strict'; // B.2.3.9 String.prototype.italics()
  _dereq_(99)('italics',function(createHTML){return function italics(){return createHTML(this,'i','','');};});},{"99":99}],231:[function(_dereq_,module,exports){'use strict';var $at=_dereq_(97)(true); // 21.1.3.27 String.prototype[@@iterator]()
  _dereq_(54)(String,'String',function(iterated){this._t=String(iterated); // target
  this._i=0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  },function(){var O=this._t,index=this._i,point;if(index>=O.length)return {value:undefined,done:true};point=$at(O,index);this._i+=point.length;return {value:point,done:false};});},{"54":54,"97":97}],232:[function(_dereq_,module,exports){'use strict'; // B.2.3.10 String.prototype.link(url)
  _dereq_(99)('link',function(createHTML){return function link(url){return createHTML(this,'a','href',url);};});},{"99":99}],233:[function(_dereq_,module,exports){var $export=_dereq_(33),toIObject=_dereq_(107),toLength=_dereq_(108);$export($export.S,'String',{ // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw:function raw(callSite){var tpl=toIObject(callSite.raw),len=toLength(tpl.length),aLen=arguments.length,res=[],i=0;while(len>i){res.push(String(tpl[i++]));if(i<aLen)res.push(String(arguments[i]));}return res.join('');}});},{"107":107,"108":108,"33":33}],234:[function(_dereq_,module,exports){var $export=_dereq_(33);$export($export.P,'String',{ // 21.1.3.13 String.prototype.repeat(count)
  repeat:_dereq_(101)});},{"101":101,"33":33}],235:[function(_dereq_,module,exports){'use strict'; // B.2.3.11 String.prototype.small()
  _dereq_(99)('small',function(createHTML){return function small(){return createHTML(this,'small','','');};});},{"99":99}],236:[function(_dereq_,module,exports){ // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
  'use strict';var $export=_dereq_(33),toLength=_dereq_(108),context=_dereq_(98),STARTS_WITH='startsWith',$startsWith=''[STARTS_WITH];$export($export.P+$export.F*_dereq_(34)(STARTS_WITH),'String',{startsWith:function startsWith(searchString /*, position = 0 */){var that=context(this,searchString,STARTS_WITH),index=toLength(Math.min(arguments.length>1?arguments[1]:undefined,that.length)),search=String(searchString);return $startsWith?$startsWith.call(that,search,index):that.slice(index,index+search.length)===search;}});},{"108":108,"33":33,"34":34,"98":98}],237:[function(_dereq_,module,exports){'use strict'; // B.2.3.12 String.prototype.strike()
  _dereq_(99)('strike',function(createHTML){return function strike(){return createHTML(this,'strike','','');};});},{"99":99}],238:[function(_dereq_,module,exports){'use strict'; // B.2.3.13 String.prototype.sub()
  _dereq_(99)('sub',function(createHTML){return function sub(){return createHTML(this,'sub','','');};});},{"99":99}],239:[function(_dereq_,module,exports){'use strict'; // B.2.3.14 String.prototype.sup()
  _dereq_(99)('sup',function(createHTML){return function sup(){return createHTML(this,'sup','','');};});},{"99":99}],240:[function(_dereq_,module,exports){'use strict'; // 21.1.3.25 String.prototype.trim()
  _dereq_(102)('trim',function($trim){return function trim(){return $trim(this,3);};});},{"102":102}],241:[function(_dereq_,module,exports){'use strict'; // ECMAScript 6 symbols shim
  var global=_dereq_(39),core=_dereq_(26),has=_dereq_(40),DESCRIPTORS=_dereq_(29),$export=_dereq_(33),redefine=_dereq_(87),META=_dereq_(63).KEY,$fails=_dereq_(35),shared=_dereq_(94),setToStringTag=_dereq_(92),uid=_dereq_(114),wks=_dereq_(115),keyOf=_dereq_(58),enumKeys=_dereq_(32),isArray=_dereq_(48),anObject=_dereq_(11),toIObject=_dereq_(107),toPrimitive=_dereq_(110),createDesc=_dereq_(85),_create=_dereq_(67),gOPNExt=_dereq_(71),$GOPD=_dereq_(70),$DP=_dereq_(68),gOPD=$GOPD.f,dP=$DP.f,gOPN=gOPNExt.f,$Symbol=global.Symbol,$JSON=global.JSON,_stringify=$JSON&&$JSON.stringify,setter=false,HIDDEN=wks('_hidden'),isEnum={}.propertyIsEnumerable,SymbolRegistry=shared('symbol-registry'),AllSymbols=shared('symbols'),ObjectProto=Object.prototype,USE_NATIVE=typeof $Symbol=='function',QObject=global.QObject; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDesc=DESCRIPTORS&&$fails(function(){return _create(dP({},'a',{get:function get(){return dP(this,'a',{value:7}).a;}})).a!=7;})?function(it,key,D){var protoDesc=gOPD(ObjectProto,key);if(protoDesc)delete ObjectProto[key];dP(it,key,D);if(protoDesc&&it!==ObjectProto)dP(ObjectProto,key,protoDesc);}:dP;var wrap=function wrap(tag){var sym=AllSymbols[tag]=_create($Symbol.prototype);sym._k=tag;DESCRIPTORS&&setter&&setSymbolDesc(ObjectProto,tag,{configurable:true,set:function set(value){if(has(this,HIDDEN)&&has(this[HIDDEN],tag))this[HIDDEN][tag]=false;setSymbolDesc(this,tag,createDesc(1,value));}});return sym;};var isSymbol=function isSymbol(it){return (typeof it==="undefined"?"undefined":babelHelpers.typeof(it))=='symbol';};var $defineProperty=function defineProperty(it,key,D){anObject(it);key=toPrimitive(key,true);anObject(D);if(has(AllSymbols,key)){if(!D.enumerable){if(!has(it,HIDDEN))dP(it,HIDDEN,createDesc(1,{}));it[HIDDEN][key]=true;}else {if(has(it,HIDDEN)&&it[HIDDEN][key])it[HIDDEN][key]=false;D=_create(D,{enumerable:createDesc(0,false)});}return setSymbolDesc(it,key,D);}return dP(it,key,D);};var $defineProperties=function defineProperties(it,P){anObject(it);var keys=enumKeys(P=toIObject(P)),i=0,l=keys.length,key;while(l>i){$defineProperty(it,key=keys[i++],P[key]);}return it;};var $create=function create(it,P){return P===undefined?_create(it):$defineProperties(_create(it),P);};var $propertyIsEnumerable=function propertyIsEnumerable(key){var E=isEnum.call(this,key=toPrimitive(key,true));return E||!has(this,key)||!has(AllSymbols,key)||has(this,HIDDEN)&&this[HIDDEN][key]?E:true;};var $getOwnPropertyDescriptor=function getOwnPropertyDescriptor(it,key){var D=gOPD(it=toIObject(it),key=toPrimitive(key,true));if(D&&has(AllSymbols,key)&&!(has(it,HIDDEN)&&it[HIDDEN][key]))D.enumerable=true;return D;};var $getOwnPropertyNames=function getOwnPropertyNames(it){var names=gOPN(toIObject(it)),result=[],i=0,key;while(names.length>i){if(!has(AllSymbols,key=names[i++])&&key!=HIDDEN&&key!=META)result.push(key);}return result;};var $getOwnPropertySymbols=function getOwnPropertySymbols(it){var names=gOPN(toIObject(it)),result=[],i=0,key;while(names.length>i){if(has(AllSymbols,key=names[i++]))result.push(AllSymbols[key]);}return result;};var $stringify=function stringify(it){if(it===undefined||isSymbol(it))return; // IE8 returns string on undefined
  var args=[it],i=1,replacer,$replacer;while(arguments.length>i){args.push(arguments[i++]);}replacer=args[1];if(typeof replacer=='function')$replacer=replacer;if($replacer||!isArray(replacer))replacer=function replacer(key,value){if($replacer)value=$replacer.call(this,key,value);if(!isSymbol(value))return value;};args[1]=replacer;return _stringify.apply($JSON,args);};var BUGGY_JSON=$fails(function(){var S=$Symbol(); // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S])!='[null]'||_stringify({a:S})!='{}'||_stringify(Object(S))!='{}';}); // 19.4.1.1 Symbol([description])
  if(!USE_NATIVE){$Symbol=function _Symbol2(){if(isSymbol(this))throw TypeError('Symbol is not a constructor');return wrap(uid(arguments.length>0?arguments[0]:undefined));};redefine($Symbol.prototype,'toString',function toString(){return this._k;});isSymbol=function isSymbol(it){return it instanceof $Symbol;};$GOPD.f=$getOwnPropertyDescriptor;$DP.f=$defineProperty;_dereq_(72).f=gOPNExt.f=$getOwnPropertyNames;_dereq_(77).f=$propertyIsEnumerable;_dereq_(73).f=$getOwnPropertySymbols;if(DESCRIPTORS&&!_dereq_(59)){redefine(ObjectProto,'propertyIsEnumerable',$propertyIsEnumerable,true);}}$export($export.G+$export.W+$export.F*!USE_NATIVE,{Symbol:$Symbol}); // 19.4.2.2 Symbol.hasInstance
  // 19.4.2.3 Symbol.isConcatSpreadable
  // 19.4.2.4 Symbol.iterator
  // 19.4.2.6 Symbol.match
  // 19.4.2.8 Symbol.replace
  // 19.4.2.9 Symbol.search
  // 19.4.2.10 Symbol.species
  // 19.4.2.11 Symbol.split
  // 19.4.2.12 Symbol.toPrimitive
  // 19.4.2.13 Symbol.toStringTag
  // 19.4.2.14 Symbol.unscopables
  for(var symbols='hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','),i=0;symbols.length>i;){var key=symbols[i++],Wrapper=core.Symbol,sym=wks(key);if(!(key in Wrapper))dP(Wrapper,key,{value:USE_NATIVE?sym:wrap(sym)});}; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  if(!QObject||!QObject.prototype||!QObject.prototype.findChild)setter=true;$export($export.S+$export.F*!USE_NATIVE,'Symbol',{ // 19.4.2.1 Symbol.for(key)
  'for':function _for(key){return has(SymbolRegistry,key+='')?SymbolRegistry[key]:SymbolRegistry[key]=$Symbol(key);}, // 19.4.2.5 Symbol.keyFor(sym)
  keyFor:function keyFor(key){return keyOf(SymbolRegistry,key);},useSetter:function useSetter(){setter=true;},useSimple:function useSimple(){setter=false;}});$export($export.S+$export.F*!USE_NATIVE,'Object',{ // 19.1.2.2 Object.create(O [, Properties])
  create:$create, // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty:$defineProperty, // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties:$defineProperties, // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor:$getOwnPropertyDescriptor, // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames:$getOwnPropertyNames, // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols:$getOwnPropertySymbols}); // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON&&$export($export.S+$export.F*(!USE_NATIVE||BUGGY_JSON),'JSON',{stringify:$stringify}); // 19.4.3.5 Symbol.prototype[@@toStringTag]
  setToStringTag($Symbol,'Symbol'); // 20.2.1.9 Math[@@toStringTag]
  setToStringTag(Math,'Math',true); // 24.3.3 JSON[@@toStringTag]
  setToStringTag(global.JSON,'JSON',true);},{"107":107,"11":11,"110":110,"114":114,"115":115,"26":26,"29":29,"32":32,"33":33,"35":35,"39":39,"40":40,"48":48,"58":58,"59":59,"63":63,"67":67,"68":68,"70":70,"71":71,"72":72,"73":73,"77":77,"85":85,"87":87,"92":92,"94":94}],242:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$typed=_dereq_(113),buffer=_dereq_(112),anObject=_dereq_(11),toIndex=_dereq_(105),toLength=_dereq_(108),isObject=_dereq_(50),TYPED_ARRAY=_dereq_(115)('typed_array'),ArrayBuffer=_dereq_(39).ArrayBuffer,speciesConstructor=_dereq_(95),$ArrayBuffer=buffer.ArrayBuffer,$DataView=buffer.DataView,$isView=$typed.ABV&&ArrayBuffer.isView,$slice=$ArrayBuffer.prototype.slice,VIEW=$typed.VIEW,ARRAY_BUFFER='ArrayBuffer';$export($export.G+$export.W+$export.F*(ArrayBuffer!==$ArrayBuffer),{ArrayBuffer:$ArrayBuffer});$export($export.S+$export.F*!$typed.CONSTR,ARRAY_BUFFER,{ // 24.1.3.1 ArrayBuffer.isView(arg)
  isView:function isView(it){return $isView&&$isView(it)||isObject(it)&&VIEW in it;}});$export($export.P+$export.U+$export.F*_dereq_(35)(function(){return !new $ArrayBuffer(2).slice(1,undefined).byteLength;}),ARRAY_BUFFER,{ // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice:function slice(start,end){if($slice!==undefined&&end===undefined)return $slice.call(anObject(this),start); // FF fix
  var len=anObject(this).byteLength,first=toIndex(start,len),final=toIndex(end===undefined?len:end,len),result=new (speciesConstructor(this,$ArrayBuffer))(toLength(final-first)),viewS=new $DataView(this),viewT=new $DataView(result),index=0;while(first<final){viewT.setUint8(index++,viewS.getUint8(first++));}return result;}});_dereq_(91)(ARRAY_BUFFER);},{"105":105,"108":108,"11":11,"112":112,"113":113,"115":115,"33":33,"35":35,"39":39,"50":50,"91":91,"95":95}],243:[function(_dereq_,module,exports){var $export=_dereq_(33);$export($export.G+$export.W+$export.F*!_dereq_(113).ABV,{DataView:_dereq_(112).DataView});},{"112":112,"113":113,"33":33}],244:[function(_dereq_,module,exports){_dereq_(111)('Float32',4,function(init){return function Float32Array(data,byteOffset,length){return init(this,data,byteOffset,length);};});},{"111":111}],245:[function(_dereq_,module,exports){_dereq_(111)('Float64',8,function(init){return function Float64Array(data,byteOffset,length){return init(this,data,byteOffset,length);};});},{"111":111}],246:[function(_dereq_,module,exports){_dereq_(111)('Int16',2,function(init){return function Int16Array(data,byteOffset,length){return init(this,data,byteOffset,length);};});},{"111":111}],247:[function(_dereq_,module,exports){_dereq_(111)('Int32',4,function(init){return function Int32Array(data,byteOffset,length){return init(this,data,byteOffset,length);};});},{"111":111}],248:[function(_dereq_,module,exports){_dereq_(111)('Int8',1,function(init){return function Int8Array(data,byteOffset,length){return init(this,data,byteOffset,length);};});},{"111":111}],249:[function(_dereq_,module,exports){_dereq_(111)('Uint16',2,function(init){return function Uint16Array(data,byteOffset,length){return init(this,data,byteOffset,length);};});},{"111":111}],250:[function(_dereq_,module,exports){_dereq_(111)('Uint32',4,function(init){return function Uint32Array(data,byteOffset,length){return init(this,data,byteOffset,length);};});},{"111":111}],251:[function(_dereq_,module,exports){_dereq_(111)('Uint8',1,function(init){return function Uint8Array(data,byteOffset,length){return init(this,data,byteOffset,length);};});},{"111":111}],252:[function(_dereq_,module,exports){_dereq_(111)('Uint8',1,function(init){return function Uint8ClampedArray(data,byteOffset,length){return init(this,data,byteOffset,length);};},true);},{"111":111}],253:[function(_dereq_,module,exports){'use strict';var each=_dereq_(16)(0),redefine=_dereq_(87),meta=_dereq_(63),assign=_dereq_(66),weak=_dereq_(24),isObject=_dereq_(50),has=_dereq_(40),getWeak=meta.getWeak,isExtensible=Object.isExtensible,uncaughtFrozenStore=weak.ufstore,tmp={},InternalMap;var wrapper=function wrapper(get){return function WeakMap(){return get(this,arguments.length>0?arguments[0]:undefined);};};var methods={ // 23.3.3.3 WeakMap.prototype.get(key)
  get:function get(key){if(isObject(key)){var data=getWeak(key);if(data===true)return uncaughtFrozenStore(this).get(key);return data?data[this._i]:undefined;}}, // 23.3.3.5 WeakMap.prototype.set(key, value)
  set:function set(key,value){return weak.def(this,key,value);}}; // 23.3 WeakMap Objects
  var $WeakMap=module.exports=_dereq_(25)('WeakMap',wrapper,methods,weak,true,true); // IE11 WeakMap frozen keys fix
  if(new $WeakMap().set((Object.freeze||Object)(tmp),7).get(tmp)!=7){InternalMap=weak.getConstructor(wrapper);assign(InternalMap.prototype,methods);meta.NEED=true;each(['delete','has','get','set'],function(key){var proto=$WeakMap.prototype,method=proto[key];redefine(proto,key,function(a,b){ // store frozen objects on internal weakmap shim
  if(isObject(a)&&!isExtensible(a)){if(!this._f)this._f=new InternalMap();var result=this._f[key](a,b);return key=='set'?this:result; // store all the rest on native weakmap
  }return method.call(this,a,b);});});}},{"16":16,"24":24,"25":25,"40":40,"50":50,"63":63,"66":66,"87":87}],254:[function(_dereq_,module,exports){'use strict';var weak=_dereq_(24); // 23.4 WeakSet Objects
  _dereq_(25)('WeakSet',function(get){return function WeakSet(){return get(this,arguments.length>0?arguments[0]:undefined);};},{ // 23.4.3.1 WeakSet.prototype.add(value)
  add:function add(value){return weak.def(this,value,true);}},weak,false,true);},{"24":24,"25":25}],255:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$includes=_dereq_(15)(true);$export($export.P,'Array',{ // https://github.com/domenic/Array.prototype.includes
  includes:function includes(el /*, fromIndex = 0 */){return $includes(this,el,arguments.length>1?arguments[1]:undefined);}});_dereq_(9)('includes');},{"15":15,"33":33,"9":9}],256:[function(_dereq_,module,exports){ // https://github.com/ljharb/proposal-is-error
  var $export=_dereq_(33),cof=_dereq_(21);$export($export.S,'Error',{isError:function isError(it){return cof(it)==='Error';}});},{"21":21,"33":33}],257:[function(_dereq_,module,exports){ // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var $export=_dereq_(33);$export($export.P+$export.R,'Map',{toJSON:_dereq_(23)('Map')});},{"23":23,"33":33}],258:[function(_dereq_,module,exports){ // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  var $export=_dereq_(33);$export($export.S,'Math',{iaddh:function iaddh(x0,x1,y0,y1){var $x0=x0>>>0,$x1=x1>>>0,$y0=y0>>>0;return $x1+(y1>>>0)+(($x0&$y0|($x0|$y0)&~($x0+$y0>>>0))>>>31)|0;}});},{"33":33}],259:[function(_dereq_,module,exports){ // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  var $export=_dereq_(33);$export($export.S,'Math',{imulh:function imulh(u,v){var UINT16=0xffff,$u=+u,$v=+v,u0=$u&UINT16,v0=$v&UINT16,u1=$u>>16,v1=$v>>16,t=(u1*v0>>>0)+(u0*v0>>>16);return u1*v1+(t>>16)+((u0*v1>>>0)+(t&UINT16)>>16);}});},{"33":33}],260:[function(_dereq_,module,exports){ // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  var $export=_dereq_(33);$export($export.S,'Math',{isubh:function isubh(x0,x1,y0,y1){var $x0=x0>>>0,$x1=x1>>>0,$y0=y0>>>0;return $x1-(y1>>>0)-((~$x0&$y0|~($x0^$y0)&$x0-$y0>>>0)>>>31)|0;}});},{"33":33}],261:[function(_dereq_,module,exports){ // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
  var $export=_dereq_(33);$export($export.S,'Math',{umulh:function umulh(u,v){var UINT16=0xffff,$u=+u,$v=+v,u0=$u&UINT16,v0=$v&UINT16,u1=$u>>>16,v1=$v>>>16,t=(u1*v0>>>0)+(u0*v0>>>16);return u1*v1+(t>>>16)+((u0*v1>>>0)+(t&UINT16)>>>16);}});},{"33":33}],262:[function(_dereq_,module,exports){ // http://goo.gl/XkBrjD
  var $export=_dereq_(33),$entries=_dereq_(79)(true);$export($export.S,'Object',{entries:function entries(it){return $entries(it);}});},{"33":33,"79":79}],263:[function(_dereq_,module,exports){ // https://gist.github.com/WebReflection/9353781
  var $export=_dereq_(33),ownKeys=_dereq_(80),toIObject=_dereq_(107),createDesc=_dereq_(85),gOPD=_dereq_(70),dP=_dereq_(68);$export($export.S,'Object',{getOwnPropertyDescriptors:function getOwnPropertyDescriptors(object){var O=toIObject(object),getDesc=gOPD.f,keys=ownKeys(O),result={},i=0,key,D;while(keys.length>i){D=getDesc(O,key=keys[i++]);if(key in result)dP.f(result,key,createDesc(0,D));else result[key]=D;}return result;}});},{"107":107,"33":33,"68":68,"70":70,"80":80,"85":85}],264:[function(_dereq_,module,exports){ // http://goo.gl/XkBrjD
  var $export=_dereq_(33),$values=_dereq_(79)(false);$export($export.S,'Object',{values:function values(it){return $values(it);}});},{"33":33,"79":79}],265:[function(_dereq_,module,exports){var metadata=_dereq_(64),anObject=_dereq_(11),toMetaKey=metadata.key,ordinaryDefineOwnMetadata=metadata.set;metadata.exp({defineMetadata:function defineMetadata(metadataKey,metadataValue,target,targetKey){ordinaryDefineOwnMetadata(metadataKey,metadataValue,anObject(target),toMetaKey(targetKey));}});},{"11":11,"64":64}],266:[function(_dereq_,module,exports){var metadata=_dereq_(64),anObject=_dereq_(11),toMetaKey=metadata.key,getOrCreateMetadataMap=metadata.map,store=metadata.store;metadata.exp({deleteMetadata:function deleteMetadata(metadataKey,target /*, targetKey */){var targetKey=arguments.length<3?undefined:toMetaKey(arguments[2]),metadataMap=getOrCreateMetadataMap(anObject(target),targetKey,false);if(metadataMap===undefined||!metadataMap['delete'](metadataKey))return false;if(metadataMap.size)return true;var targetMetadata=store.get(target);targetMetadata['delete'](targetKey);return !!targetMetadata.size||store['delete'](target);}});},{"11":11,"64":64}],267:[function(_dereq_,module,exports){var Set=_dereq_(218),from=_dereq_(14),metadata=_dereq_(64),anObject=_dereq_(11),getPrototypeOf=_dereq_(74),ordinaryOwnMetadataKeys=metadata.keys,toMetaKey=metadata.key;var ordinaryMetadataKeys=function ordinaryMetadataKeys(O,P){var oKeys=ordinaryOwnMetadataKeys(O,P),parent=getPrototypeOf(O);if(parent===null)return oKeys;var pKeys=ordinaryMetadataKeys(parent,P);return pKeys.length?oKeys.length?from(new Set(oKeys.concat(pKeys))):pKeys:oKeys;};metadata.exp({getMetadataKeys:function getMetadataKeys(target /*, targetKey */){return ordinaryMetadataKeys(anObject(target),arguments.length<2?undefined:toMetaKey(arguments[1]));}});},{"11":11,"14":14,"218":218,"64":64,"74":74}],268:[function(_dereq_,module,exports){var metadata=_dereq_(64),anObject=_dereq_(11),getPrototypeOf=_dereq_(74),ordinaryHasOwnMetadata=metadata.has,ordinaryGetOwnMetadata=metadata.get,toMetaKey=metadata.key;var ordinaryGetMetadata=function ordinaryGetMetadata(MetadataKey,O,P){var hasOwn=ordinaryHasOwnMetadata(MetadataKey,O,P);if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey,O,P);var parent=getPrototypeOf(O);return parent!==null?ordinaryGetMetadata(MetadataKey,parent,P):undefined;};metadata.exp({getMetadata:function getMetadata(metadataKey,target /*, targetKey */){return ordinaryGetMetadata(metadataKey,anObject(target),arguments.length<3?undefined:toMetaKey(arguments[2]));}});},{"11":11,"64":64,"74":74}],269:[function(_dereq_,module,exports){var metadata=_dereq_(64),anObject=_dereq_(11),ordinaryOwnMetadataKeys=metadata.keys,toMetaKey=metadata.key;metadata.exp({getOwnMetadataKeys:function getOwnMetadataKeys(target /*, targetKey */){return ordinaryOwnMetadataKeys(anObject(target),arguments.length<2?undefined:toMetaKey(arguments[1]));}});},{"11":11,"64":64}],270:[function(_dereq_,module,exports){var metadata=_dereq_(64),anObject=_dereq_(11),ordinaryGetOwnMetadata=metadata.get,toMetaKey=metadata.key;metadata.exp({getOwnMetadata:function getOwnMetadata(metadataKey,target /*, targetKey */){return ordinaryGetOwnMetadata(metadataKey,anObject(target),arguments.length<3?undefined:toMetaKey(arguments[2]));}});},{"11":11,"64":64}],271:[function(_dereq_,module,exports){var metadata=_dereq_(64),anObject=_dereq_(11),getPrototypeOf=_dereq_(74),ordinaryHasOwnMetadata=metadata.has,toMetaKey=metadata.key;var ordinaryHasMetadata=function ordinaryHasMetadata(MetadataKey,O,P){var hasOwn=ordinaryHasOwnMetadata(MetadataKey,O,P);if(hasOwn)return true;var parent=getPrototypeOf(O);return parent!==null?ordinaryHasMetadata(MetadataKey,parent,P):false;};metadata.exp({hasMetadata:function hasMetadata(metadataKey,target /*, targetKey */){return ordinaryHasMetadata(metadataKey,anObject(target),arguments.length<3?undefined:toMetaKey(arguments[2]));}});},{"11":11,"64":64,"74":74}],272:[function(_dereq_,module,exports){var metadata=_dereq_(64),anObject=_dereq_(11),ordinaryHasOwnMetadata=metadata.has,toMetaKey=metadata.key;metadata.exp({hasOwnMetadata:function hasOwnMetadata(metadataKey,target /*, targetKey */){return ordinaryHasOwnMetadata(metadataKey,anObject(target),arguments.length<3?undefined:toMetaKey(arguments[2]));}});},{"11":11,"64":64}],273:[function(_dereq_,module,exports){var metadata=_dereq_(64),anObject=_dereq_(11),aFunction=_dereq_(7),toMetaKey=metadata.key,ordinaryDefineOwnMetadata=metadata.set;metadata.exp({metadata:function metadata(metadataKey,metadataValue){return function decorator(target,targetKey){ordinaryDefineOwnMetadata(metadataKey,metadataValue,(targetKey!==undefined?anObject:aFunction)(target),toMetaKey(targetKey));};}});},{"11":11,"64":64,"7":7}],274:[function(_dereq_,module,exports){ // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var $export=_dereq_(33);$export($export.P+$export.R,'Set',{toJSON:_dereq_(23)('Set')});},{"23":23,"33":33}],275:[function(_dereq_,module,exports){'use strict'; // https://github.com/mathiasbynens/String.prototype.at
  var $export=_dereq_(33),$at=_dereq_(97)(true);$export($export.P,'String',{at:function at(pos){return $at(this,pos);}});},{"33":33,"97":97}],276:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$pad=_dereq_(100);$export($export.P,'String',{padEnd:function padEnd(maxLength /*, fillString = ' ' */){return $pad(this,maxLength,arguments.length>1?arguments[1]:undefined,false);}});},{"100":100,"33":33}],277:[function(_dereq_,module,exports){'use strict';var $export=_dereq_(33),$pad=_dereq_(100);$export($export.P,'String',{padStart:function padStart(maxLength /*, fillString = ' ' */){return $pad(this,maxLength,arguments.length>1?arguments[1]:undefined,true);}});},{"100":100,"33":33}],278:[function(_dereq_,module,exports){'use strict'; // https://github.com/sebmarkbage/ecmascript-string-left-right-trim
  _dereq_(102)('trimLeft',function($trim){return function trimLeft(){return $trim(this,1);};},'trimStart');},{"102":102}],279:[function(_dereq_,module,exports){'use strict'; // https://github.com/sebmarkbage/ecmascript-string-left-right-trim
  _dereq_(102)('trimRight',function($trim){return function trimRight(){return $trim(this,2);};},'trimEnd');},{"102":102}],280:[function(_dereq_,module,exports){ // https://github.com/ljharb/proposal-global
  var $export=_dereq_(33);$export($export.S,'System',{global:_dereq_(39)});},{"33":33,"39":39}],281:[function(_dereq_,module,exports){var $iterators=_dereq_(129),redefine=_dereq_(87),global=_dereq_(39),hide=_dereq_(41),Iterators=_dereq_(57),wks=_dereq_(115),ITERATOR=wks('iterator'),TO_STRING_TAG=wks('toStringTag'),ArrayValues=Iterators.Array;for(var collections=['NodeList','DOMTokenList','MediaList','StyleSheetList','CSSRuleList'],i=0;i<5;i++){var NAME=collections[i],Collection=global[NAME],proto=Collection&&Collection.prototype,key;if(proto){if(!proto[ITERATOR])hide(proto,ITERATOR,ArrayValues);if(!proto[TO_STRING_TAG])hide(proto,TO_STRING_TAG,NAME);Iterators[NAME]=ArrayValues;for(key in $iterators){if(!proto[key])redefine(proto,key,$iterators[key],true);}}}},{"115":115,"129":129,"39":39,"41":41,"57":57,"87":87}],282:[function(_dereq_,module,exports){var $export=_dereq_(33),$task=_dereq_(104);$export($export.G+$export.B,{setImmediate:$task.set,clearImmediate:$task.clear});},{"104":104,"33":33}],283:[function(_dereq_,module,exports){ // ie9- setTimeout & setInterval additional parameters fix
  var global=_dereq_(39),$export=_dereq_(33),invoke=_dereq_(45),partial=_dereq_(83),navigator=global.navigator,MSIE=!!navigator&&/MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
  var wrap=function wrap(set){return MSIE?function(fn,time /*, ...args */){return set(invoke(partial,[].slice.call(arguments,2),typeof fn=='function'?fn:Function(fn)),time);}:set;};$export($export.G+$export.B+$export.F*MSIE,{setTimeout:wrap(global.setTimeout),setInterval:wrap(global.setInterval)});},{"33":33,"39":39,"45":45,"83":83}],284:[function(_dereq_,module,exports){_dereq_(241);_dereq_(178);_dereq_(180);_dereq_(179);_dereq_(182);_dereq_(184);_dereq_(189);_dereq_(183);_dereq_(181);_dereq_(191);_dereq_(190);_dereq_(186);_dereq_(187);_dereq_(185);_dereq_(177);_dereq_(188);_dereq_(192);_dereq_(193);_dereq_(144);_dereq_(146);_dereq_(145);_dereq_(195);_dereq_(194);_dereq_(165);_dereq_(175);_dereq_(176);_dereq_(166);_dereq_(167);_dereq_(168);_dereq_(169);_dereq_(170);_dereq_(171);_dereq_(172);_dereq_(173);_dereq_(174);_dereq_(148);_dereq_(149);_dereq_(150);_dereq_(151);_dereq_(152);_dereq_(153);_dereq_(154);_dereq_(155);_dereq_(156);_dereq_(157);_dereq_(158);_dereq_(159);_dereq_(160);_dereq_(161);_dereq_(162);_dereq_(163);_dereq_(164);_dereq_(228);_dereq_(233);_dereq_(240);_dereq_(231);_dereq_(223);_dereq_(224);_dereq_(229);_dereq_(234);_dereq_(236);_dereq_(219);_dereq_(220);_dereq_(221);_dereq_(222);_dereq_(225);_dereq_(226);_dereq_(227);_dereq_(230);_dereq_(232);_dereq_(235);_dereq_(237);_dereq_(238);_dereq_(239);_dereq_(140);_dereq_(143);_dereq_(141);_dereq_(142);_dereq_(128);_dereq_(126);_dereq_(133);_dereq_(130);_dereq_(136);_dereq_(138);_dereq_(125);_dereq_(132);_dereq_(122);_dereq_(137);_dereq_(120);_dereq_(135);_dereq_(134);_dereq_(127);_dereq_(131);_dereq_(119);_dereq_(121);_dereq_(124);_dereq_(123);_dereq_(139);_dereq_(129);_dereq_(211);_dereq_(217);_dereq_(212);_dereq_(213);_dereq_(214);_dereq_(215);_dereq_(216);_dereq_(196);_dereq_(147);_dereq_(218);_dereq_(253);_dereq_(254);_dereq_(242);_dereq_(243);_dereq_(248);_dereq_(251);_dereq_(252);_dereq_(246);_dereq_(249);_dereq_(247);_dereq_(250);_dereq_(244);_dereq_(245);_dereq_(197);_dereq_(198);_dereq_(199);_dereq_(200);_dereq_(201);_dereq_(204);_dereq_(202);_dereq_(203);_dereq_(205);_dereq_(206);_dereq_(207);_dereq_(208);_dereq_(210);_dereq_(209);_dereq_(255);_dereq_(275);_dereq_(277);_dereq_(276);_dereq_(278);_dereq_(279);_dereq_(263);_dereq_(264);_dereq_(262);_dereq_(257);_dereq_(274);_dereq_(280);_dereq_(256);_dereq_(258);_dereq_(260);_dereq_(259);_dereq_(261);_dereq_(265);_dereq_(266);_dereq_(268);_dereq_(267);_dereq_(270);_dereq_(269);_dereq_(271);_dereq_(272);_dereq_(273);_dereq_(283);_dereq_(282);_dereq_(281);module.exports=_dereq_(26);},{"119":119,"120":120,"121":121,"122":122,"123":123,"124":124,"125":125,"126":126,"127":127,"128":128,"129":129,"130":130,"131":131,"132":132,"133":133,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"140":140,"141":141,"142":142,"143":143,"144":144,"145":145,"146":146,"147":147,"148":148,"149":149,"150":150,"151":151,"152":152,"153":153,"154":154,"155":155,"156":156,"157":157,"158":158,"159":159,"160":160,"161":161,"162":162,"163":163,"164":164,"165":165,"166":166,"167":167,"168":168,"169":169,"170":170,"171":171,"172":172,"173":173,"174":174,"175":175,"176":176,"177":177,"178":178,"179":179,"180":180,"181":181,"182":182,"183":183,"184":184,"185":185,"186":186,"187":187,"188":188,"189":189,"190":190,"191":191,"192":192,"193":193,"194":194,"195":195,"196":196,"197":197,"198":198,"199":199,"200":200,"201":201,"202":202,"203":203,"204":204,"205":205,"206":206,"207":207,"208":208,"209":209,"210":210,"211":211,"212":212,"213":213,"214":214,"215":215,"216":216,"217":217,"218":218,"219":219,"220":220,"221":221,"222":222,"223":223,"224":224,"225":225,"226":226,"227":227,"228":228,"229":229,"230":230,"231":231,"232":232,"233":233,"234":234,"235":235,"236":236,"237":237,"238":238,"239":239,"240":240,"241":241,"242":242,"243":243,"244":244,"245":245,"246":246,"247":247,"248":248,"249":249,"250":250,"251":251,"252":252,"253":253,"254":254,"255":255,"256":256,"257":257,"258":258,"259":259,"26":26,"260":260,"261":261,"262":262,"263":263,"264":264,"265":265,"266":266,"267":267,"268":268,"269":269,"270":270,"271":271,"272":272,"273":273,"274":274,"275":275,"276":276,"277":277,"278":278,"279":279,"280":280,"281":281,"282":282,"283":283}],285:[function(_dereq_,module,exports){(function(global){ /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */!function(global){"use strict";var hasOwn=Object.prototype.hasOwnProperty;var undefined; // More compressible than void 0.
  var iteratorSymbol=typeof Symbol==="function"&&Symbol.iterator||"@@iterator";var inModule=(typeof module==="undefined"?"undefined":babelHelpers.typeof(module))==="object";var runtime=global.regeneratorRuntime;if(runtime){if(inModule){ // If regeneratorRuntime is defined globally and we're in a module,
  // make the exports object identical to regeneratorRuntime.
  module.exports=runtime;} // Don't bother evaluating the rest of this file if the runtime was
  // already defined globally.
  return;} // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime=global.regeneratorRuntime=inModule?module.exports:{};function wrap(innerFn,outerFn,self,tryLocsList){ // If outerFn provided, then outerFn.prototype instanceof Generator.
  var generator=Object.create((outerFn||Generator).prototype);var context=new Context(tryLocsList||[]); // The ._invoke method unifies the implementations of the .next,
  // .throw, and .return methods.
  generator._invoke=makeInvokeMethod(innerFn,self,context);return generator;}runtime.wrap=wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn,obj,arg){try{return {type:"normal",arg:fn.call(obj,arg)};}catch(err){return {type:"throw",arg:err};}}var GenStateSuspendedStart="suspendedStart";var GenStateSuspendedYield="suspendedYield";var GenStateExecuting="executing";var GenStateCompleted="completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel={}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype;GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;GeneratorFunctionPrototype.constructor=GeneratorFunction;GeneratorFunction.displayName="GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype){["next","throw","return"].forEach(function(method){prototype[method]=function(arg){return this._invoke(method,arg);};});}runtime.isGeneratorFunction=function(genFun){var ctor=typeof genFun==="function"&&genFun.constructor;return ctor?ctor===GeneratorFunction|| // For the native GeneratorFunction constructor, the best we can
  // do is to check its .name property.
  (ctor.displayName||ctor.name)==="GeneratorFunction":false;};runtime.mark=function(genFun){if(Object.setPrototypeOf){Object.setPrototypeOf(genFun,GeneratorFunctionPrototype);}else {genFun.__proto__=GeneratorFunctionPrototype;}genFun.prototype=Object.create(Gp);return genFun;}; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap=function(arg){return new AwaitArgument(arg);};function AwaitArgument(arg){this.arg=arg;}function AsyncIterator(generator){ // This invoke function is written in a style that assumes some
  // calling function (or Promise) will handle exceptions.
  function invoke(method,arg){var result=generator[method](arg);var value=result.value;return value instanceof AwaitArgument?Promise.resolve(value.arg).then(invokeNext,invokeThrow):Promise.resolve(value).then(function(unwrapped){ // When a yielded Promise is resolved, its final value becomes
  // the .value of the Promise<{value,done}> result for the
  // current iteration. If the Promise is rejected, however, the
  // result for this iteration will be rejected with the same
  // reason. Note that rejections of yielded Promises are not
  // thrown back into the generator function, as is the case
  // when an awaited Promise is rejected. This difference in
  // behavior between yield and await is important, because it
  // allows the consumer to decide what to do with the yielded
  // rejection (swallow it and continue, manually .throw it back
  // into the generator, abandon iteration, whatever). With
  // await, by contrast, there is no opportunity to examine the
  // rejection reason outside the generator function, so the
  // only option is to throw it from the await expression, and
  // let the generator function handle the exception.
  result.value=unwrapped;return result;});}if((typeof process==="undefined"?"undefined":babelHelpers.typeof(process))==="object"&&process.domain){invoke=process.domain.bind(invoke);}var invokeNext=invoke.bind(generator,"next");var invokeThrow=invoke.bind(generator,"throw");var invokeReturn=invoke.bind(generator,"return");var previousPromise;function enqueue(method,arg){function callInvokeWithMethodAndArg(){return invoke(method,arg);}return previousPromise= // If enqueue has been called before, then we want to wait until
  // all previous Promises have been resolved before calling invoke,
  // so that results are always delivered in the correct order. If
  // enqueue has not been called before, then it is important to
  // call invoke immediately, without waiting on a callback to fire,
  // so that the async generator function has the opportunity to do
  // any necessary setup in a predictable way. This predictability
  // is why the Promise constructor synchronously invokes its
  // executor callback, and why async functions synchronously
  // execute code before the first await. Since we implement simple
  // async functions in terms of async generators, it is especially
  // important to get this right, even though it requires care.
  previousPromise?previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
  // invocations of the iterator.
  callInvokeWithMethodAndArg):new Promise(function(resolve){resolve(callInvokeWithMethodAndArg());});} // Define the unified helper method that is used to implement .next,
  // .throw, and .return (see defineIteratorMethods).
  this._invoke=enqueue;}defineIteratorMethods(AsyncIterator.prototype); // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async=function(innerFn,outerFn,self,tryLocsList){var iter=new AsyncIterator(wrap(innerFn,outerFn,self,tryLocsList));return runtime.isGeneratorFunction(outerFn)?iter // If outerFn is a generator, return the full iterator.
  :iter.next().then(function(result){return result.done?result.value:iter.next();});};function makeInvokeMethod(innerFn,self,context){var state=GenStateSuspendedStart;return function invoke(method,arg){if(state===GenStateExecuting){throw new Error("Generator is already running");}if(state===GenStateCompleted){if(method==="throw"){throw arg;} // Be forgiving, per 25.3.3.3.3 of the spec:
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
  return doneResult();}while(true){var delegate=context.delegate;if(delegate){if(method==="return"||method==="throw"&&delegate.iterator[method]===undefined){ // A return or throw (when the delegate iterator has no throw
  // method) always terminates the yield* loop.
  context.delegate=null; // If the delegate iterator has a return method, give it a
  // chance to clean up.
  var returnMethod=delegate.iterator["return"];if(returnMethod){var record=tryCatch(returnMethod,delegate.iterator,arg);if(record.type==="throw"){ // If the return method threw an exception, let that
  // exception prevail over the original return or throw.
  method="throw";arg=record.arg;continue;}}if(method==="return"){ // Continue with the outer return, now that the delegate
  // iterator has been terminated.
  continue;}}var record=tryCatch(delegate.iterator[method],delegate.iterator,arg);if(record.type==="throw"){context.delegate=null; // Like returning generator.throw(uncaught), but without the
  // overhead of an extra function call.
  method="throw";arg=record.arg;continue;} // Delegate generator ran and handled its own exceptions so
  // regardless of what the method was, we continue as if it is
  // "next" with an undefined arg.
  method="next";arg=undefined;var info=record.arg;if(info.done){context[delegate.resultName]=info.value;context.next=delegate.nextLoc;}else {state=GenStateSuspendedYield;return info;}context.delegate=null;}if(method==="next"){context._sent=arg;if(state===GenStateSuspendedYield){context.sent=arg;}else {context.sent=undefined;}}else if(method==="throw"){if(state===GenStateSuspendedStart){state=GenStateCompleted;throw arg;}if(context.dispatchException(arg)){ // If the dispatched exception was caught by a catch block,
  // then let that catch block handle the exception normally.
  method="next";arg=undefined;}}else if(method==="return"){context.abrupt("return",arg);}state=GenStateExecuting;var record=tryCatch(innerFn,self,context);if(record.type==="normal"){ // If an exception is thrown from innerFn, we leave state ===
  // GenStateExecuting and loop back for another invocation.
  state=context.done?GenStateCompleted:GenStateSuspendedYield;var info={value:record.arg,done:context.done};if(record.arg===ContinueSentinel){if(context.delegate&&method==="next"){ // Deliberately forget the last sent value so that we don't
  // accidentally pass it on to the delegate.
  arg=undefined;}}else {return info;}}else if(record.type==="throw"){state=GenStateCompleted; // Dispatch the exception by looping back around to the
  // context.dispatchException(arg) call above.
  method="throw";arg=record.arg;}}};} // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);Gp[iteratorSymbol]=function(){return this;};Gp.toString=function(){return "[object Generator]";};function pushTryEntry(locs){var entry={tryLoc:locs[0]};if(1 in locs){entry.catchLoc=locs[1];}if(2 in locs){entry.finallyLoc=locs[2];entry.afterLoc=locs[3];}this.tryEntries.push(entry);}function resetTryEntry(entry){var record=entry.completion||{};record.type="normal";delete record.arg;entry.completion=record;}function Context(tryLocsList){ // The root entry object (effectively a try statement without a catch
  // or a finally block) gives us a place to store values thrown from
  // locations where there is no enclosing try statement.
  this.tryEntries=[{tryLoc:"root"}];tryLocsList.forEach(pushTryEntry,this);this.reset(true);}runtime.keys=function(object){var keys=[];for(var key in object){keys.push(key);}keys.reverse(); // Rather than returning an object with a next method, we keep
  // things simple and return the next function itself.
  return function next(){while(keys.length){var key=keys.pop();if(key in object){next.value=key;next.done=false;return next;}} // To avoid creating an additional object, we just hang the .value
  // and .done properties off the next function object itself. This
  // also ensures that the minifier will not anonymize the function.
  next.done=true;return next;};};function values(iterable){if(iterable){var iteratorMethod=iterable[iteratorSymbol];if(iteratorMethod){return iteratorMethod.call(iterable);}if(typeof iterable.next==="function"){return iterable;}if(!isNaN(iterable.length)){var i=-1,next=function next(){while(++i<iterable.length){if(hasOwn.call(iterable,i)){next.value=iterable[i];next.done=false;return next;}}next.value=undefined;next.done=true;return next;};return next.next=next;}} // Return an iterator with no values.
  return {next:doneResult};}runtime.values=values;function doneResult(){return {value:undefined,done:true};}Context.prototype={constructor:Context,reset:function reset(skipTempReset){this.prev=0;this.next=0;this.sent=undefined;this.done=false;this.delegate=null;this.tryEntries.forEach(resetTryEntry);if(!skipTempReset){for(var name in this){ // Not sure about the optimal order of these conditions:
  if(name.charAt(0)==="t"&&hasOwn.call(this,name)&&!isNaN(+name.slice(1))){this[name]=undefined;}}}},stop:function stop(){this.done=true;var rootEntry=this.tryEntries[0];var rootRecord=rootEntry.completion;if(rootRecord.type==="throw"){throw rootRecord.arg;}return this.rval;},dispatchException:function dispatchException(exception){if(this.done){throw exception;}var context=this;function handle(loc,caught){record.type="throw";record.arg=exception;context.next=loc;return !!caught;}for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];var record=entry.completion;if(entry.tryLoc==="root"){ // Exception thrown outside of any try block that could handle
  // it, so set the completion value of the entire function to
  // throw the exception.
  return handle("end");}if(entry.tryLoc<=this.prev){var hasCatch=hasOwn.call(entry,"catchLoc");var hasFinally=hasOwn.call(entry,"finallyLoc");if(hasCatch&&hasFinally){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true);}else if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc);}}else if(hasCatch){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true);}}else if(hasFinally){if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc);}}else {throw new Error("try statement without catch or finally");}}}},abrupt:function abrupt(type,arg){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc<=this.prev&&hasOwn.call(entry,"finallyLoc")&&this.prev<entry.finallyLoc){var finallyEntry=entry;break;}}if(finallyEntry&&(type==="break"||type==="continue")&&finallyEntry.tryLoc<=arg&&arg<=finallyEntry.finallyLoc){ // Ignore the finally entry if control is not jumping to a
  // location outside the try/catch block.
  finallyEntry=null;}var record=finallyEntry?finallyEntry.completion:{};record.type=type;record.arg=arg;if(finallyEntry){this.next=finallyEntry.finallyLoc;}else {this.complete(record);}return ContinueSentinel;},complete:function complete(record,afterLoc){if(record.type==="throw"){throw record.arg;}if(record.type==="break"||record.type==="continue"){this.next=record.arg;}else if(record.type==="return"){this.rval=record.arg;this.next="end";}else if(record.type==="normal"&&afterLoc){this.next=afterLoc;}},finish:function finish(finallyLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.finallyLoc===finallyLoc){this.complete(entry.completion,entry.afterLoc);resetTryEntry(entry);return ContinueSentinel;}}},"catch":function _catch(tryLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc===tryLoc){var record=entry.completion;if(record.type==="throw"){var thrown=record.arg;resetTryEntry(entry);}return thrown;}} // The context.catch method must only be called with a location
  // argument that corresponds to a known catch block.
  throw new Error("illegal catch attempt");},delegateYield:function delegateYield(iterable,resultName,nextLoc){this.delegate={iterator:values(iterable),resultName:resultName,nextLoc:nextLoc};return ContinueSentinel;}};}( // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  (typeof global==="undefined"?"undefined":babelHelpers.typeof(global))==="object"?global:(typeof window==="undefined"?"undefined":babelHelpers.typeof(window))==="object"?window:(typeof self==="undefined"?"undefined":babelHelpers.typeof(self))==="object"?self:this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}]},{},[1]);});polyfill&&(typeof polyfill==="undefined"?"undefined":babelHelpers.typeof(polyfill))==='object'&&'default' in polyfill?polyfill['default']:polyfill;

  var util = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod);
        global.util = mod.exports;
      }
    })(__commonjs_global, function (exports, module) {
      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): util.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      'use strict';

      var Util = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Private TransitionEnd Helpers
         * ------------------------------------------------------------------------
         */

        var transition = false;

        var TransitionEndEvent = {
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd otransitionend',
          transition: 'transitionend'
        };

        // shoutout AngusCroll (https://goo.gl/pxwQGp)
        function toType(obj) {
          return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }

        function isElement(obj) {
          return (obj[0] || obj).nodeType;
        }

        function getSpecialTransitionEndEvent() {
          return {
            bindType: transition.end,
            delegateType: transition.end,
            handle: function handle(event) {
              if ($(event.target).is(this)) {
                return event.handleObj.handler.apply(this, arguments);
              }
            }
          };
        }

        function transitionEndTest() {
          if (window.QUnit) {
            return false;
          }

          var el = document.createElement('bootstrap');

          for (var _name in TransitionEndEvent) {
            if (el.style[_name] !== undefined) {
              return { end: TransitionEndEvent[_name] };
            }
          }

          return false;
        }

        function transitionEndEmulator(duration) {
          var _this = this;

          var called = false;

          $(this).one(Util.TRANSITION_END, function () {
            called = true;
          });

          setTimeout(function () {
            if (!called) {
              Util.triggerTransitionEnd(_this);
            }
          }, duration);

          return this;
        }

        function setTransitionEndSupport() {
          transition = transitionEndTest();

          $.fn.emulateTransitionEnd = transitionEndEmulator;

          if (Util.supportsTransitionEnd()) {
            $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
          }
        }

        /**
         * --------------------------------------------------------------------------
         * Public Util Api
         * --------------------------------------------------------------------------
         */

        var Util = {

          TRANSITION_END: 'bsTransitionEnd',

          getUID: function getUID(prefix) {
            do {
              /* eslint-disable no-bitwise */
              prefix += ~ ~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
              /* eslint-enable no-bitwise */
            } while (document.getElementById(prefix));
            return prefix;
          },

          getSelectorFromElement: function getSelectorFromElement(element) {
            var selector = element.getAttribute('data-target');

            if (!selector) {
              selector = element.getAttribute('href') || '';
              selector = /^#[a-z]/i.test(selector) ? selector : null;
            }

            return selector;
          },

          reflow: function reflow(element) {
            new Function('bs', 'return bs')(element.offsetHeight);
          },

          triggerTransitionEnd: function triggerTransitionEnd(element) {
            $(element).trigger(transition.end);
          },

          supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(transition);
          },

          typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
            for (var property in configTypes) {
              if (configTypes.hasOwnProperty(property)) {
                var expectedTypes = configTypes[property];
                var value = config[property];
                var valueType = undefined;

                if (value && isElement(value)) {
                  valueType = 'element';
                } else {
                  valueType = toType(value);
                }

                if (!new RegExp(expectedTypes).test(valueType)) {
                  throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
                }
              }
            }
          }
        };

        setTransitionEndSupport();

        return Util;
      }(jQuery);

      module.exports = Util;
    });
  });

  var require$$0$1 = util && (typeof util === 'undefined' ? 'undefined' : babelHelpers.typeof(util)) === 'object' && 'default' in util ? util['default'] : util;

  var tooltip = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './util'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require$$0$1);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod, global.Util);
        global.tooltip = mod.exports;
      }
    })(__commonjs_global, function (exports, module, _util) {
      /* global Tether */

      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      var _Util = _interopRequireDefault(_util);

      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): tooltip.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var Tooltip = function ($) {

        /**
         * Check for Tether dependency
         * Tether - http://github.hubspot.com/tether/
         */
        if (window.Tether === undefined) {
          throw new Error('Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)');
        }

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'tooltip';
        var VERSION = '4.0.0-alpha.2';
        var DATA_KEY = 'bs.tooltip';
        var EVENT_KEY = '.' + DATA_KEY;
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 150;
        var CLASS_PREFIX = 'bs-tether';

        var Default = {
          animation: true,
          template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
          trigger: 'hover focus',
          title: '',
          delay: 0,
          html: false,
          selector: false,
          placement: 'top',
          offset: '0 0',
          constraints: []
        };

        var DefaultType = {
          animation: 'boolean',
          template: 'string',
          title: '(string|element|function)',
          trigger: 'string',
          delay: '(number|object)',
          html: 'boolean',
          selector: '(string|boolean)',
          placement: '(string|function)',
          offset: 'string',
          constraints: 'array'
        };

        var AttachmentMap = {
          TOP: 'bottom center',
          RIGHT: 'middle left',
          BOTTOM: 'top center',
          LEFT: 'middle right'
        };

        var HoverState = {
          IN: 'in',
          OUT: 'out'
        };

        var Event = {
          HIDE: 'hide' + EVENT_KEY,
          HIDDEN: 'hidden' + EVENT_KEY,
          SHOW: 'show' + EVENT_KEY,
          SHOWN: 'shown' + EVENT_KEY,
          INSERTED: 'inserted' + EVENT_KEY,
          CLICK: 'click' + EVENT_KEY,
          FOCUSIN: 'focusin' + EVENT_KEY,
          FOCUSOUT: 'focusout' + EVENT_KEY,
          MOUSEENTER: 'mouseenter' + EVENT_KEY,
          MOUSELEAVE: 'mouseleave' + EVENT_KEY
        };

        var ClassName = {
          FADE: 'fade',
          IN: 'in'
        };

        var Selector = {
          TOOLTIP: '.tooltip',
          TOOLTIP_INNER: '.tooltip-inner'
        };

        var TetherClass = {
          element: false,
          enabled: false
        };

        var Trigger = {
          HOVER: 'hover',
          FOCUS: 'focus',
          CLICK: 'click',
          MANUAL: 'manual'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Tooltip = function () {
          function Tooltip(element, config) {
            _classCallCheck(this, Tooltip);

            // private
            this._isEnabled = true;
            this._timeout = 0;
            this._hoverState = '';
            this._activeTrigger = {};
            this._tether = null;

            // protected
            this.element = element;
            this.config = this._getConfig(config);
            this.tip = null;

            this._setListeners();
          }

          /**
           * ------------------------------------------------------------------------
           * jQuery
           * ------------------------------------------------------------------------
           */

          // getters

          _createClass(Tooltip, [{
            key: 'enable',

            // public

            value: function enable() {
              this._isEnabled = true;
            }
          }, {
            key: 'disable',
            value: function disable() {
              this._isEnabled = false;
            }
          }, {
            key: 'toggleEnabled',
            value: function toggleEnabled() {
              this._isEnabled = !this._isEnabled;
            }
          }, {
            key: 'toggle',
            value: function toggle(event) {
              if (event) {
                var dataKey = this.constructor.DATA_KEY;
                var context = $(event.currentTarget).data(dataKey);

                if (!context) {
                  context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                  $(event.currentTarget).data(dataKey, context);
                }

                context._activeTrigger.click = !context._activeTrigger.click;

                if (context._isWithActiveTrigger()) {
                  context._enter(null, context);
                } else {
                  context._leave(null, context);
                }
              } else {

                if ($(this.getTipElement()).hasClass(ClassName.IN)) {
                  this._leave(null, this);
                  return;
                }

                this._enter(null, this);
              }
            }
          }, {
            key: 'dispose',
            value: function dispose() {
              clearTimeout(this._timeout);

              this.cleanupTether();

              $.removeData(this.element, this.constructor.DATA_KEY);

              $(this.element).off(this.constructor.EVENT_KEY);

              if (this.tip) {
                $(this.tip).remove();
              }

              this._isEnabled = null;
              this._timeout = null;
              this._hoverState = null;
              this._activeTrigger = null;
              this._tether = null;

              this.element = null;
              this.config = null;
              this.tip = null;
            }
          }, {
            key: 'show',
            value: function show() {
              var _this = this;

              var showEvent = $.Event(this.constructor.Event.SHOW);

              if (this.isWithContent() && this._isEnabled) {
                $(this.element).trigger(showEvent);

                var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

                if (showEvent.isDefaultPrevented() || !isInTheDom) {
                  return;
                }

                var tip = this.getTipElement();
                var tipId = _Util['default'].getUID(this.constructor.NAME);

                tip.setAttribute('id', tipId);
                this.element.setAttribute('aria-describedby', tipId);

                this.setContent();

                if (this.config.animation) {
                  $(tip).addClass(ClassName.FADE);
                }

                var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

                var attachment = this._getAttachment(placement);

                $(tip).data(this.constructor.DATA_KEY, this).appendTo(document.body);

                $(this.element).trigger(this.constructor.Event.INSERTED);

                this._tether = new Tether({
                  attachment: attachment,
                  element: tip,
                  target: this.element,
                  classes: TetherClass,
                  classPrefix: CLASS_PREFIX,
                  offset: this.config.offset,
                  constraints: this.config.constraints,
                  addTargetClasses: false
                });

                _Util['default'].reflow(tip);
                this._tether.position();

                $(tip).addClass(ClassName.IN);

                var complete = function complete() {
                  var prevHoverState = _this._hoverState;
                  _this._hoverState = null;

                  $(_this.element).trigger(_this.constructor.Event.SHOWN);

                  if (prevHoverState === HoverState.OUT) {
                    _this._leave(null, _this);
                  }
                };

                if (_Util['default'].supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
                  $(this.tip).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
                  return;
                }

                complete();
              }
            }
          }, {
            key: 'hide',
            value: function hide(callback) {
              var _this2 = this;

              var tip = this.getTipElement();
              var hideEvent = $.Event(this.constructor.Event.HIDE);
              var complete = function complete() {
                if (_this2._hoverState !== HoverState.IN && tip.parentNode) {
                  tip.parentNode.removeChild(tip);
                }

                _this2.element.removeAttribute('aria-describedby');
                $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
                _this2.cleanupTether();

                if (callback) {
                  callback();
                }
              };

              $(this.element).trigger(hideEvent);

              if (hideEvent.isDefaultPrevented()) {
                return;
              }

              $(tip).removeClass(ClassName.IN);

              if (_Util['default'].supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

                $(tip).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
              } else {
                complete();
              }

              this._hoverState = '';
            }

            // protected

          }, {
            key: 'isWithContent',
            value: function isWithContent() {
              return Boolean(this.getTitle());
            }
          }, {
            key: 'getTipElement',
            value: function getTipElement() {
              return this.tip = this.tip || $(this.config.template)[0];
            }
          }, {
            key: 'setContent',
            value: function setContent() {
              var $tip = $(this.getTipElement());

              this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

              $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

              this.cleanupTether();
            }
          }, {
            key: 'setElementContent',
            value: function setElementContent($element, content) {
              var html = this.config.html;
              if ((typeof content === 'undefined' ? 'undefined' : babelHelpers.typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
                // content is a DOM node or a jQuery
                if (html) {
                  if (!$(content).parent().is($element)) {
                    $element.empty().append(content);
                  }
                } else {
                  $element.text($(content).text());
                }
              } else {
                $element[html ? 'html' : 'text'](content);
              }
            }
          }, {
            key: 'getTitle',
            value: function getTitle() {
              var title = this.element.getAttribute('data-original-title');

              if (!title) {
                title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
              }

              return title;
            }
          }, {
            key: 'cleanupTether',
            value: function cleanupTether() {
              if (this._tether) {
                this._tether.destroy();
              }
            }

            // private

          }, {
            key: '_getAttachment',
            value: function _getAttachment(placement) {
              return AttachmentMap[placement.toUpperCase()];
            }
          }, {
            key: '_setListeners',
            value: function _setListeners() {
              var _this3 = this;

              var triggers = this.config.trigger.split(' ');

              triggers.forEach(function (trigger) {
                if (trigger === 'click') {
                  $(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, $.proxy(_this3.toggle, _this3));
                } else if (trigger !== Trigger.MANUAL) {
                  var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
                  var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;

                  $(_this3.element).on(eventIn, _this3.config.selector, $.proxy(_this3._enter, _this3)).on(eventOut, _this3.config.selector, $.proxy(_this3._leave, _this3));
                }
              });

              if (this.config.selector) {
                this.config = $.extend({}, this.config, {
                  trigger: 'manual',
                  selector: ''
                });
              } else {
                this._fixTitle();
              }
            }
          }, {
            key: '_fixTitle',
            value: function _fixTitle() {
              var titleType = babelHelpers.typeof(this.element.getAttribute('data-original-title'));
              if (this.element.getAttribute('title') || titleType !== 'string') {
                this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
                this.element.setAttribute('title', '');
              }
            }
          }, {
            key: '_enter',
            value: function _enter(event, context) {
              var dataKey = this.constructor.DATA_KEY;

              context = context || $(event.currentTarget).data(dataKey);

              if (!context) {
                context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                $(event.currentTarget).data(dataKey, context);
              }

              if (event) {
                context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
              }

              if ($(context.getTipElement()).hasClass(ClassName.IN) || context._hoverState === HoverState.IN) {
                context._hoverState = HoverState.IN;
                return;
              }

              clearTimeout(context._timeout);

              context._hoverState = HoverState.IN;

              if (!context.config.delay || !context.config.delay.show) {
                context.show();
                return;
              }

              context._timeout = setTimeout(function () {
                if (context._hoverState === HoverState.IN) {
                  context.show();
                }
              }, context.config.delay.show);
            }
          }, {
            key: '_leave',
            value: function _leave(event, context) {
              var dataKey = this.constructor.DATA_KEY;

              context = context || $(event.currentTarget).data(dataKey);

              if (!context) {
                context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                $(event.currentTarget).data(dataKey, context);
              }

              if (event) {
                context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
              }

              if (context._isWithActiveTrigger()) {
                return;
              }

              clearTimeout(context._timeout);

              context._hoverState = HoverState.OUT;

              if (!context.config.delay || !context.config.delay.hide) {
                context.hide();
                return;
              }

              context._timeout = setTimeout(function () {
                if (context._hoverState === HoverState.OUT) {
                  context.hide();
                }
              }, context.config.delay.hide);
            }
          }, {
            key: '_isWithActiveTrigger',
            value: function _isWithActiveTrigger() {
              for (var trigger in this._activeTrigger) {
                if (this._activeTrigger[trigger]) {
                  return true;
                }
              }

              return false;
            }
          }, {
            key: '_getConfig',
            value: function _getConfig(config) {
              config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

              if (config.delay && typeof config.delay === 'number') {
                config.delay = {
                  show: config.delay,
                  hide: config.delay
                };
              }

              _Util['default'].typeCheckConfig(NAME, config, this.constructor.DefaultType);

              return config;
            }
          }, {
            key: '_getDelegateConfig',
            value: function _getDelegateConfig() {
              var config = {};

              if (this.config) {
                for (var key in this.config) {
                  if (this.constructor.Default[key] !== this.config[key]) {
                    config[key] = this.config[key];
                  }
                }
              }

              return config;
            }

            // static

          }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY);
                var _config = (typeof config === 'undefined' ? 'undefined' : babelHelpers.typeof(config)) === 'object' ? config : null;

                if (!data && /destroy|hide/.test(config)) {
                  return;
                }

                if (!data) {
                  data = new Tooltip(this, _config);
                  $(this).data(DATA_KEY, data);
                }

                if (typeof config === 'string') {
                  if (data[config] === undefined) {
                    throw new Error('No method named "' + config + '"');
                  }
                  data[config]();
                }
              });
            }
          }, {
            key: 'VERSION',
            get: function get() {
              return VERSION;
            }
          }, {
            key: 'Default',
            get: function get() {
              return Default;
            }
          }, {
            key: 'NAME',
            get: function get() {
              return NAME;
            }
          }, {
            key: 'DATA_KEY',
            get: function get() {
              return DATA_KEY;
            }
          }, {
            key: 'Event',
            get: function get() {
              return Event;
            }
          }, {
            key: 'EVENT_KEY',
            get: function get() {
              return EVENT_KEY;
            }
          }, {
            key: 'DefaultType',
            get: function get() {
              return DefaultType;
            }
          }]);

          return Tooltip;
        }();

        $.fn[NAME] = Tooltip._jQueryInterface;
        $.fn[NAME].Constructor = Tooltip;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Tooltip._jQueryInterface;
        };

        return Tooltip;
      }(jQuery);

      module.exports = Tooltip;
    });
  });

  var require$$0 = tooltip && (typeof tooltip === 'undefined' ? 'undefined' : babelHelpers.typeof(tooltip)) === 'object' && 'default' in tooltip ? tooltip['default'] : tooltip;

  var popover = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './tooltip'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require$$0);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod, global.Tooltip);
        global.popover = mod.exports;
      }
    })(__commonjs_global, function (exports, module, _tooltip) {
      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _get = function get(_x, _x2, _x3) {
        var _again = true;_function: while (_again) {
          var object = _x,
              property = _x2,
              receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
              return undefined;
            } else {
              _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
          } else if ('value' in desc) {
            return desc.value;
          } else {
            var getter = desc.get;if (getter === undefined) {
              return undefined;
            }return getter.call(receiver);
          }
        }
      };

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
          throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : babelHelpers.typeof(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var _Tooltip2 = _interopRequireDefault(_tooltip);

      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): popover.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var Popover = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'popover';
        var VERSION = '4.0.0-alpha.2';
        var DATA_KEY = 'bs.popover';
        var EVENT_KEY = '.' + DATA_KEY;
        var JQUERY_NO_CONFLICT = $.fn[NAME];

        var Default = $.extend({}, _Tooltip2['default'].Default, {
          placement: 'right',
          trigger: 'click',
          content: '',
          template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
        });

        var DefaultType = $.extend({}, _Tooltip2['default'].DefaultType, {
          content: '(string|element|function)'
        });

        var ClassName = {
          FADE: 'fade',
          IN: 'in'
        };

        var Selector = {
          TITLE: '.popover-title',
          CONTENT: '.popover-content',
          ARROW: '.popover-arrow'
        };

        var Event = {
          HIDE: 'hide' + EVENT_KEY,
          HIDDEN: 'hidden' + EVENT_KEY,
          SHOW: 'show' + EVENT_KEY,
          SHOWN: 'shown' + EVENT_KEY,
          INSERTED: 'inserted' + EVENT_KEY,
          CLICK: 'click' + EVENT_KEY,
          FOCUSIN: 'focusin' + EVENT_KEY,
          FOCUSOUT: 'focusout' + EVENT_KEY,
          MOUSEENTER: 'mouseenter' + EVENT_KEY,
          MOUSELEAVE: 'mouseleave' + EVENT_KEY
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Popover = function (_Tooltip) {
          _inherits(Popover, _Tooltip);

          function Popover() {
            _classCallCheck(this, Popover);

            _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).apply(this, arguments);
          }

          /**
           * ------------------------------------------------------------------------
           * jQuery
           * ------------------------------------------------------------------------
           */

          _createClass(Popover, [{
            key: 'isWithContent',

            // overrides

            value: function isWithContent() {
              return this.getTitle() || this._getContent();
            }
          }, {
            key: 'getTipElement',
            value: function getTipElement() {
              return this.tip = this.tip || $(this.config.template)[0];
            }
          }, {
            key: 'setContent',
            value: function setContent() {
              var $tip = $(this.getTipElement());

              // we use append for html objects to maintain js events
              this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
              this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

              $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

              this.cleanupTether();
            }

            // private

          }, {
            key: '_getContent',
            value: function _getContent() {
              return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
            }

            // static

          }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY);
                var _config = (typeof config === 'undefined' ? 'undefined' : babelHelpers.typeof(config)) === 'object' ? config : null;

                if (!data && /destroy|hide/.test(config)) {
                  return;
                }

                if (!data) {
                  data = new Popover(this, _config);
                  $(this).data(DATA_KEY, data);
                }

                if (typeof config === 'string') {
                  if (data[config] === undefined) {
                    throw new Error('No method named "' + config + '"');
                  }
                  data[config]();
                }
              });
            }
          }, {
            key: 'VERSION',

            // getters

            get: function get() {
              return VERSION;
            }
          }, {
            key: 'Default',
            get: function get() {
              return Default;
            }
          }, {
            key: 'NAME',
            get: function get() {
              return NAME;
            }
          }, {
            key: 'DATA_KEY',
            get: function get() {
              return DATA_KEY;
            }
          }, {
            key: 'Event',
            get: function get() {
              return Event;
            }
          }, {
            key: 'EVENT_KEY',
            get: function get() {
              return EVENT_KEY;
            }
          }, {
            key: 'DefaultType',
            get: function get() {
              return DefaultType;
            }
          }]);

          return Popover;
        }(_Tooltip2['default']);

        $.fn[NAME] = Popover._jQueryInterface;
        $.fn[NAME].Constructor = Popover;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Popover._jQueryInterface;
        };

        return Popover;
      }(jQuery);

      module.exports = Popover;
    });
  });

  popover && (typeof popover === 'undefined' ? 'undefined' : babelHelpers.typeof(popover)) === 'object' && 'default' in popover ? popover['default'] : popover;

  var tab = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './util'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require$$0$1);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod, global.Util);
        global.tab = mod.exports;
      }
    })(__commonjs_global, function (exports, module, _util) {
      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      var _Util = _interopRequireDefault(_util);

      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): tab.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var Tab = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'tab';
        var VERSION = '4.0.0-alpha.2';
        var DATA_KEY = 'bs.tab';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 150;

        var Event = {
          HIDE: 'hide' + EVENT_KEY,
          HIDDEN: 'hidden' + EVENT_KEY,
          SHOW: 'show' + EVENT_KEY,
          SHOWN: 'shown' + EVENT_KEY,
          CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
          DROPDOWN_MENU: 'dropdown-menu',
          ACTIVE: 'active',
          FADE: 'fade',
          IN: 'in'
        };

        var Selector = {
          A: 'a',
          LI: 'li',
          DROPDOWN: '.dropdown',
          UL: 'ul:not(.dropdown-menu)',
          FADE_CHILD: '> .nav-item .fade, > .fade',
          ACTIVE: '.active',
          ACTIVE_CHILD: '> .nav-item > .active, > .active',
          DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
          DROPDOWN_TOGGLE: '.dropdown-toggle',
          DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Tab = function () {
          function Tab(element) {
            _classCallCheck(this, Tab);

            this._element = element;
          }

          /**
           * ------------------------------------------------------------------------
           * Data Api implementation
           * ------------------------------------------------------------------------
           */

          // getters

          _createClass(Tab, [{
            key: 'show',

            // public

            value: function show() {
              var _this = this;

              if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
                return;
              }

              var target = undefined;
              var previous = undefined;
              var ulElement = $(this._element).closest(Selector.UL)[0];
              var selector = _Util['default'].getSelectorFromElement(this._element);

              if (ulElement) {
                previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
                previous = previous[previous.length - 1];
              }

              var hideEvent = $.Event(Event.HIDE, {
                relatedTarget: this._element
              });

              var showEvent = $.Event(Event.SHOW, {
                relatedTarget: previous
              });

              if (previous) {
                $(previous).trigger(hideEvent);
              }

              $(this._element).trigger(showEvent);

              if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                return;
              }

              if (selector) {
                target = $(selector)[0];
              }

              this._activate(this._element, ulElement);

              var complete = function complete() {
                var hiddenEvent = $.Event(Event.HIDDEN, {
                  relatedTarget: _this._element
                });

                var shownEvent = $.Event(Event.SHOWN, {
                  relatedTarget: previous
                });

                $(previous).trigger(hiddenEvent);
                $(_this._element).trigger(shownEvent);
              };

              if (target) {
                this._activate(target, target.parentNode, complete);
              } else {
                complete();
              }
            }
          }, {
            key: 'dispose',
            value: function dispose() {
              $.removeClass(this._element, DATA_KEY);
              this._element = null;
            }

            // private

          }, {
            key: '_activate',
            value: function _activate(element, container, callback) {
              var active = $(container).find(Selector.ACTIVE_CHILD)[0];
              var isTransitioning = callback && _Util['default'].supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

              var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

              if (active && isTransitioning) {
                $(active).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
              } else {
                complete();
              }

              if (active) {
                $(active).removeClass(ClassName.IN);
              }
            }
          }, {
            key: '_transitionComplete',
            value: function _transitionComplete(element, active, isTransitioning, callback) {
              if (active) {
                $(active).removeClass(ClassName.ACTIVE);

                var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

                if (dropdownChild) {
                  $(dropdownChild).removeClass(ClassName.ACTIVE);
                }

                active.setAttribute('aria-expanded', false);
              }

              $(element).addClass(ClassName.ACTIVE);
              element.setAttribute('aria-expanded', true);

              if (isTransitioning) {
                _Util['default'].reflow(element);
                $(element).addClass(ClassName.IN);
              } else {
                $(element).removeClass(ClassName.FADE);
              }

              if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

                var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
                if (dropdownElement) {
                  $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                }

                element.setAttribute('aria-expanded', true);
              }

              if (callback) {
                callback();
              }
            }

            // static

          }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
              return this.each(function () {
                var $this = $(this);
                var data = $this.data(DATA_KEY);

                if (!data) {
                  data = data = new Tab(this);
                  $this.data(DATA_KEY, data);
                }

                if (typeof config === 'string') {
                  if (data[config] === undefined) {
                    throw new Error('No method named "' + config + '"');
                  }
                  data[config]();
                }
              });
            }
          }, {
            key: 'VERSION',
            get: function get() {
              return VERSION;
            }
          }]);

          return Tab;
        }();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
          event.preventDefault();
          Tab._jQueryInterface.call($(this), 'show');
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Tab._jQueryInterface;
        $.fn[NAME].Constructor = Tab;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Tab._jQueryInterface;
        };

        return Tab;
      }(jQuery);

      module.exports = Tab;
    });
  });

  tab && (typeof tab === 'undefined' ? 'undefined' : babelHelpers.typeof(tab)) === 'object' && 'default' in tab ? tab['default'] : tab;

  var scrollspy = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './util'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require$$0$1);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod, global.Util);
        global.scrollspy = mod.exports;
      }
    })(__commonjs_global, function (exports, module, _util) {
      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      var _Util = _interopRequireDefault(_util);

      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): scrollspy.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var ScrollSpy = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'scrollspy';
        var VERSION = '4.0.0-alpha.2';
        var DATA_KEY = 'bs.scrollspy';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];

        var Default = {
          offset: 10,
          method: 'auto',
          target: ''
        };

        var DefaultType = {
          offset: 'number',
          method: 'string',
          target: '(string|element)'
        };

        var Event = {
          ACTIVATE: 'activate' + EVENT_KEY,
          SCROLL: 'scroll' + EVENT_KEY,
          LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
          DROPDOWN_ITEM: 'dropdown-item',
          DROPDOWN_MENU: 'dropdown-menu',
          NAV_LINK: 'nav-link',
          NAV: 'nav',
          ACTIVE: 'active'
        };

        var Selector = {
          DATA_SPY: '[data-spy="scroll"]',
          ACTIVE: '.active',
          LIST_ITEM: '.list-item',
          LI: 'li',
          LI_DROPDOWN: 'li.dropdown',
          NAV_LINKS: '.nav-link',
          DROPDOWN: '.dropdown',
          DROPDOWN_ITEMS: '.dropdown-item',
          DROPDOWN_TOGGLE: '.dropdown-toggle'
        };

        var OffsetMethod = {
          OFFSET: 'offset',
          POSITION: 'position'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var ScrollSpy = function () {
          function ScrollSpy(element, config) {
            _classCallCheck(this, ScrollSpy);

            this._element = element;
            this._scrollElement = element.tagName === 'BODY' ? window : element;
            this._config = this._getConfig(config);
            this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
            this._offsets = [];
            this._targets = [];
            this._activeTarget = null;
            this._scrollHeight = 0;

            $(this._scrollElement).on(Event.SCROLL, $.proxy(this._process, this));

            this.refresh();
            this._process();
          }

          /**
           * ------------------------------------------------------------------------
           * Data Api implementation
           * ------------------------------------------------------------------------
           */

          // getters

          _createClass(ScrollSpy, [{
            key: 'refresh',

            // public

            value: function refresh() {
              var _this = this;

              var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

              var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

              var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

              this._offsets = [];
              this._targets = [];

              this._scrollHeight = this._getScrollHeight();

              var targets = $.makeArray($(this._selector));

              targets.map(function (element) {
                var target = undefined;
                var targetSelector = _Util['default'].getSelectorFromElement(element);

                if (targetSelector) {
                  target = $(targetSelector)[0];
                }

                if (target && (target.offsetWidth || target.offsetHeight)) {
                  // todo (fat): remove sketch reliance on jQuery position/offset
                  return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
                }
              }).filter(function (item) {
                return item;
              }).sort(function (a, b) {
                return a[0] - b[0];
              }).forEach(function (item) {
                _this._offsets.push(item[0]);
                _this._targets.push(item[1]);
              });
            }
          }, {
            key: 'dispose',
            value: function dispose() {
              $.removeData(this._element, DATA_KEY);
              $(this._scrollElement).off(EVENT_KEY);

              this._element = null;
              this._scrollElement = null;
              this._config = null;
              this._selector = null;
              this._offsets = null;
              this._targets = null;
              this._activeTarget = null;
              this._scrollHeight = null;
            }

            // private

          }, {
            key: '_getConfig',
            value: function _getConfig(config) {
              config = $.extend({}, Default, config);

              if (typeof config.target !== 'string') {
                var id = $(config.target).attr('id');
                if (!id) {
                  id = _Util['default'].getUID(NAME);
                  $(config.target).attr('id', id);
                }
                config.target = '#' + id;
              }

              _Util['default'].typeCheckConfig(NAME, config, DefaultType);

              return config;
            }
          }, {
            key: '_getScrollTop',
            value: function _getScrollTop() {
              return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
            }
          }, {
            key: '_getScrollHeight',
            value: function _getScrollHeight() {
              return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            }
          }, {
            key: '_process',
            value: function _process() {
              var scrollTop = this._getScrollTop() + this._config.offset;
              var scrollHeight = this._getScrollHeight();
              var maxScroll = this._config.offset + scrollHeight - this._scrollElement.offsetHeight;

              if (this._scrollHeight !== scrollHeight) {
                this.refresh();
              }

              if (scrollTop >= maxScroll) {
                var target = this._targets[this._targets.length - 1];

                if (this._activeTarget !== target) {
                  this._activate(target);
                }
              }

              if (this._activeTarget && scrollTop < this._offsets[0]) {
                this._activeTarget = null;
                this._clear();
                return;
              }

              for (var i = this._offsets.length; i--;) {
                var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

                if (isActiveTarget) {
                  this._activate(this._targets[i]);
                }
              }
            }
          }, {
            key: '_activate',
            value: function _activate(target) {
              this._activeTarget = target;

              this._clear();

              var queries = this._selector.split(',');
              queries = queries.map(function (selector) {
                return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
              });

              var $link = $(queries.join(','));

              if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
                $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                $link.addClass(ClassName.ACTIVE);
              } else {
                // todo (fat) this is kinda sus...
                // recursively add actives to tested nav-links
                $link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
              }

              $(this._scrollElement).trigger(Event.ACTIVATE, {
                relatedTarget: target
              });
            }
          }, {
            key: '_clear',
            value: function _clear() {
              $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
            }

            // static

          }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY);
                var _config = (typeof config === 'undefined' ? 'undefined' : babelHelpers.typeof(config)) === 'object' && config || null;

                if (!data) {
                  data = new ScrollSpy(this, _config);
                  $(this).data(DATA_KEY, data);
                }

                if (typeof config === 'string') {
                  if (data[config] === undefined) {
                    throw new Error('No method named "' + config + '"');
                  }
                  data[config]();
                }
              });
            }
          }, {
            key: 'VERSION',
            get: function get() {
              return VERSION;
            }
          }, {
            key: 'Default',
            get: function get() {
              return Default;
            }
          }]);

          return ScrollSpy;
        }();

        $(window).on(Event.LOAD_DATA_API, function () {
          var scrollSpys = $.makeArray($(Selector.DATA_SPY));

          for (var i = scrollSpys.length; i--;) {
            var $spy = $(scrollSpys[i]);
            ScrollSpy._jQueryInterface.call($spy, $spy.data());
          }
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = ScrollSpy._jQueryInterface;
        $.fn[NAME].Constructor = ScrollSpy;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return ScrollSpy._jQueryInterface;
        };

        return ScrollSpy;
      }(jQuery);

      module.exports = ScrollSpy;
    });
  });

  scrollspy && (typeof scrollspy === 'undefined' ? 'undefined' : babelHelpers.typeof(scrollspy)) === 'object' && 'default' in scrollspy ? scrollspy['default'] : scrollspy;

  var modal = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './util'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require$$0$1);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod, global.Util);
        global.modal = mod.exports;
      }
    })(__commonjs_global, function (exports, module, _util) {
      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      var _Util = _interopRequireDefault(_util);

      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): modal.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var Modal = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'modal';
        var VERSION = '4.0.0-alpha.2';
        var DATA_KEY = 'bs.modal';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 300;
        var BACKDROP_TRANSITION_DURATION = 150;

        var Default = {
          backdrop: true,
          keyboard: true,
          focus: true,
          show: true
        };

        var DefaultType = {
          backdrop: '(boolean|string)',
          keyboard: 'boolean',
          focus: 'boolean',
          show: 'boolean'
        };

        var Event = {
          HIDE: 'hide' + EVENT_KEY,
          HIDDEN: 'hidden' + EVENT_KEY,
          SHOW: 'show' + EVENT_KEY,
          SHOWN: 'shown' + EVENT_KEY,
          FOCUSIN: 'focusin' + EVENT_KEY,
          RESIZE: 'resize' + EVENT_KEY,
          CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
          KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
          MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
          MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
          CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
          SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
          BACKDROP: 'modal-backdrop',
          OPEN: 'modal-open',
          FADE: 'fade',
          IN: 'in'
        };

        var Selector = {
          DIALOG: '.modal-dialog',
          DATA_TOGGLE: '[data-toggle="modal"]',
          DATA_DISMISS: '[data-dismiss="modal"]',
          FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Modal = function () {
          function Modal(element, config) {
            _classCallCheck(this, Modal);

            this._config = this._getConfig(config);
            this._element = element;
            this._dialog = $(element).find(Selector.DIALOG)[0];
            this._backdrop = null;
            this._isShown = false;
            this._isBodyOverflowing = false;
            this._ignoreBackdropClick = false;
            this._originalBodyPadding = 0;
            this._scrollbarWidth = 0;
          }

          /**
           * ------------------------------------------------------------------------
           * Data Api implementation
           * ------------------------------------------------------------------------
           */

          // getters

          _createClass(Modal, [{
            key: 'toggle',

            // public

            value: function toggle(relatedTarget) {
              return this._isShown ? this.hide() : this.show(relatedTarget);
            }
          }, {
            key: 'show',
            value: function show(relatedTarget) {
              var _this = this;

              var showEvent = $.Event(Event.SHOW, {
                relatedTarget: relatedTarget
              });

              $(this._element).trigger(showEvent);

              if (this._isShown || showEvent.isDefaultPrevented()) {
                return;
              }

              this._isShown = true;

              this._checkScrollbar();
              this._setScrollbar();

              $(document.body).addClass(ClassName.OPEN);

              this._setEscapeEvent();
              this._setResizeEvent();

              $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

              $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
                $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
                  if ($(event.target).is(_this._element)) {
                    _this._ignoreBackdropClick = true;
                  }
                });
              });

              this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
            }
          }, {
            key: 'hide',
            value: function hide(event) {
              if (event) {
                event.preventDefault();
              }

              var hideEvent = $.Event(Event.HIDE);

              $(this._element).trigger(hideEvent);

              if (!this._isShown || hideEvent.isDefaultPrevented()) {
                return;
              }

              this._isShown = false;

              this._setEscapeEvent();
              this._setResizeEvent();

              $(document).off(Event.FOCUSIN);

              $(this._element).removeClass(ClassName.IN);

              $(this._element).off(Event.CLICK_DISMISS);
              $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

              if (_Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

                $(this._element).one(_Util['default'].TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
              } else {
                this._hideModal();
              }
            }
          }, {
            key: 'dispose',
            value: function dispose() {
              $.removeData(this._element, DATA_KEY);

              $(window).off(EVENT_KEY);
              $(document).off(EVENT_KEY);
              $(this._element).off(EVENT_KEY);
              $(this._backdrop).off(EVENT_KEY);

              this._config = null;
              this._element = null;
              this._dialog = null;
              this._backdrop = null;
              this._isShown = null;
              this._isBodyOverflowing = null;
              this._ignoreBackdropClick = null;
              this._originalBodyPadding = null;
              this._scrollbarWidth = null;
            }

            // private

          }, {
            key: '_getConfig',
            value: function _getConfig(config) {
              config = $.extend({}, Default, config);
              _Util['default'].typeCheckConfig(NAME, config, DefaultType);
              return config;
            }
          }, {
            key: '_showElement',
            value: function _showElement(relatedTarget) {
              var _this2 = this;

              var transition = _Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

              if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                // don't move modals dom position
                document.body.appendChild(this._element);
              }

              this._element.style.display = 'block';
              this._element.scrollTop = 0;

              if (transition) {
                _Util['default'].reflow(this._element);
              }

              $(this._element).addClass(ClassName.IN);

              if (this._config.focus) {
                this._enforceFocus();
              }

              var shownEvent = $.Event(Event.SHOWN, {
                relatedTarget: relatedTarget
              });

              var transitionComplete = function transitionComplete() {
                if (_this2._config.focus) {
                  _this2._element.focus();
                }
                $(_this2._element).trigger(shownEvent);
              };

              if (transition) {
                $(this._dialog).one(_Util['default'].TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
              } else {
                transitionComplete();
              }
            }
          }, {
            key: '_enforceFocus',
            value: function _enforceFocus() {
              var _this3 = this;

              $(document).off(Event.FOCUSIN) // guard against infinite focus loop
              .on(Event.FOCUSIN, function (event) {
                if (document !== event.target && _this3._element !== event.target && !$(_this3._element).has(event.target).length) {
                  _this3._element.focus();
                }
              });
            }
          }, {
            key: '_setEscapeEvent',
            value: function _setEscapeEvent() {
              var _this4 = this;

              if (this._isShown && this._config.keyboard) {
                $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
                  if (event.which === 27) {
                    _this4.hide();
                  }
                });
              } else if (!this._isShown) {
                $(this._element).off(Event.KEYDOWN_DISMISS);
              }
            }
          }, {
            key: '_setResizeEvent',
            value: function _setResizeEvent() {
              if (this._isShown) {
                $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
              } else {
                $(window).off(Event.RESIZE);
              }
            }
          }, {
            key: '_hideModal',
            value: function _hideModal() {
              var _this5 = this;

              this._element.style.display = 'none';
              this._showBackdrop(function () {
                $(document.body).removeClass(ClassName.OPEN);
                _this5._resetAdjustments();
                _this5._resetScrollbar();
                $(_this5._element).trigger(Event.HIDDEN);
              });
            }
          }, {
            key: '_removeBackdrop',
            value: function _removeBackdrop() {
              if (this._backdrop) {
                $(this._backdrop).remove();
                this._backdrop = null;
              }
            }
          }, {
            key: '_showBackdrop',
            value: function _showBackdrop(callback) {
              var _this6 = this;

              var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

              if (this._isShown && this._config.backdrop) {
                var doAnimate = _Util['default'].supportsTransitionEnd() && animate;

                this._backdrop = document.createElement('div');
                this._backdrop.className = ClassName.BACKDROP;

                if (animate) {
                  $(this._backdrop).addClass(animate);
                }

                $(this._backdrop).appendTo(document.body);

                $(this._element).on(Event.CLICK_DISMISS, function (event) {
                  if (_this6._ignoreBackdropClick) {
                    _this6._ignoreBackdropClick = false;
                    return;
                  }
                  if (event.target !== event.currentTarget) {
                    return;
                  }
                  if (_this6._config.backdrop === 'static') {
                    _this6._element.focus();
                  } else {
                    _this6.hide();
                  }
                });

                if (doAnimate) {
                  _Util['default'].reflow(this._backdrop);
                }

                $(this._backdrop).addClass(ClassName.IN);

                if (!callback) {
                  return;
                }

                if (!doAnimate) {
                  callback();
                  return;
                }

                $(this._backdrop).one(_Util['default'].TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
              } else if (!this._isShown && this._backdrop) {
                $(this._backdrop).removeClass(ClassName.IN);

                var callbackRemove = function callbackRemove() {
                  _this6._removeBackdrop();
                  if (callback) {
                    callback();
                  }
                };

                if (_Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
                  $(this._backdrop).one(_Util['default'].TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
                } else {
                  callbackRemove();
                }
              } else if (callback) {
                callback();
              }
            }

            // ----------------------------------------------------------------------
            // the following methods are used to handle overflowing modals
            // todo (fat): these should probably be refactored out of modal.js
            // ----------------------------------------------------------------------

          }, {
            key: '_handleUpdate',
            value: function _handleUpdate() {
              this._adjustDialog();
            }
          }, {
            key: '_adjustDialog',
            value: function _adjustDialog() {
              var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

              if (!this._isBodyOverflowing && isModalOverflowing) {
                this._element.style.paddingLeft = this._scrollbarWidth + 'px';
              }

              if (this._isBodyOverflowing && !isModalOverflowing) {
                this._element.style.paddingRight = this._scrollbarWidth + 'px~';
              }
            }
          }, {
            key: '_resetAdjustments',
            value: function _resetAdjustments() {
              this._element.style.paddingLeft = '';
              this._element.style.paddingRight = '';
            }
          }, {
            key: '_checkScrollbar',
            value: function _checkScrollbar() {
              var fullWindowWidth = window.innerWidth;
              if (!fullWindowWidth) {
                // workaround for missing window.innerWidth in IE8
                var documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
              }
              this._isBodyOverflowing = document.body.clientWidth < fullWindowWidth;
              this._scrollbarWidth = this._getScrollbarWidth();
            }
          }, {
            key: '_setScrollbar',
            value: function _setScrollbar() {
              var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

              this._originalBodyPadding = document.body.style.paddingRight || '';

              if (this._isBodyOverflowing) {
                document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
              }
            }
          }, {
            key: '_resetScrollbar',
            value: function _resetScrollbar() {
              document.body.style.paddingRight = this._originalBodyPadding;
            }
          }, {
            key: '_getScrollbarWidth',
            value: function _getScrollbarWidth() {
              // thx d.walsh
              var scrollDiv = document.createElement('div');
              scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
              document.body.appendChild(scrollDiv);
              var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
              document.body.removeChild(scrollDiv);
              return scrollbarWidth;
            }

            // static

          }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config, relatedTarget) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY);
                var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : babelHelpers.typeof(config)) === 'object' && config);

                if (!data) {
                  data = new Modal(this, _config);
                  $(this).data(DATA_KEY, data);
                }

                if (typeof config === 'string') {
                  if (data[config] === undefined) {
                    throw new Error('No method named "' + config + '"');
                  }
                  data[config](relatedTarget);
                } else if (_config.show) {
                  data.show(relatedTarget);
                }
              });
            }
          }, {
            key: 'VERSION',
            get: function get() {
              return VERSION;
            }
          }, {
            key: 'Default',
            get: function get() {
              return Default;
            }
          }]);

          return Modal;
        }();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
          var _this7 = this;

          var target = undefined;
          var selector = _Util['default'].getSelectorFromElement(this);

          if (selector) {
            target = $(selector)[0];
          }

          var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

          if (this.tagName === 'A') {
            event.preventDefault();
          }

          var $target = $(target).one(Event.SHOW, function (showEvent) {
            if (showEvent.isDefaultPrevented()) {
              // only register focus restorer if modal will actually get shown
              return;
            }

            $target.one(Event.HIDDEN, function () {
              if ($(_this7).is(':visible')) {
                _this7.focus();
              }
            });
          });

          Modal._jQueryInterface.call($(target), config, this);
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Modal._jQueryInterface;
        $.fn[NAME].Constructor = Modal;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Modal._jQueryInterface;
        };

        return Modal;
      }(jQuery);

      module.exports = Modal;
    });
  });

  modal && (typeof modal === 'undefined' ? 'undefined' : babelHelpers.typeof(modal)) === 'object' && 'default' in modal ? modal['default'] : modal;

  var dropdown = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './util'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require$$0$1);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod, global.Util);
        global.dropdown = mod.exports;
      }
    })(__commonjs_global, function (exports, module, _util) {
      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      var _Util = _interopRequireDefault(_util);

      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): dropdown.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var Dropdown = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'dropdown';
        var VERSION = '4.0.0-alpha.2';
        var DATA_KEY = 'bs.dropdown';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];

        var Event = {
          HIDE: 'hide' + EVENT_KEY,
          HIDDEN: 'hidden' + EVENT_KEY,
          SHOW: 'show' + EVENT_KEY,
          SHOWN: 'shown' + EVENT_KEY,
          CLICK: 'click' + EVENT_KEY,
          CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
          KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
          BACKDROP: 'dropdown-backdrop',
          DISABLED: 'disabled',
          OPEN: 'open'
        };

        var Selector = {
          BACKDROP: '.dropdown-backdrop',
          DATA_TOGGLE: '[data-toggle="dropdown"]',
          FORM_CHILD: '.dropdown form',
          ROLE_MENU: '[role="menu"]',
          ROLE_LISTBOX: '[role="listbox"]',
          NAVBAR_NAV: '.navbar-nav',
          VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Dropdown = function () {
          function Dropdown(element) {
            _classCallCheck(this, Dropdown);

            this._element = element;

            this._addEventListeners();
          }

          /**
           * ------------------------------------------------------------------------
           * Data Api implementation
           * ------------------------------------------------------------------------
           */

          // getters

          _createClass(Dropdown, [{
            key: 'toggle',

            // public

            value: function toggle() {
              if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
                return false;
              }

              var parent = Dropdown._getParentFromElement(this);
              var isActive = $(parent).hasClass(ClassName.OPEN);

              Dropdown._clearMenus();

              if (isActive) {
                return false;
              }

              if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

                // if mobile we use a backdrop because click events don't delegate
                var dropdown = document.createElement('div');
                dropdown.className = ClassName.BACKDROP;
                $(dropdown).insertBefore(this);
                $(dropdown).on('click', Dropdown._clearMenus);
              }

              var relatedTarget = { relatedTarget: this };
              var showEvent = $.Event(Event.SHOW, relatedTarget);

              $(parent).trigger(showEvent);

              if (showEvent.isDefaultPrevented()) {
                return false;
              }

              this.focus();
              this.setAttribute('aria-expanded', 'true');

              $(parent).toggleClass(ClassName.OPEN);
              $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

              return false;
            }
          }, {
            key: 'dispose',
            value: function dispose() {
              $.removeData(this._element, DATA_KEY);
              $(this._element).off(EVENT_KEY);
              this._element = null;
            }

            // private

          }, {
            key: '_addEventListeners',
            value: function _addEventListeners() {
              $(this._element).on(Event.CLICK, this.toggle);
            }

            // static

          }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY);

                if (!data) {
                  $(this).data(DATA_KEY, data = new Dropdown(this));
                }

                if (typeof config === 'string') {
                  if (data[config] === undefined) {
                    throw new Error('No method named "' + config + '"');
                  }
                  data[config].call(this);
                }
              });
            }
          }, {
            key: '_clearMenus',
            value: function _clearMenus(event) {
              if (event && event.which === 3) {
                return;
              }

              var backdrop = $(Selector.BACKDROP)[0];
              if (backdrop) {
                backdrop.parentNode.removeChild(backdrop);
              }

              var toggles = $.makeArray($(Selector.DATA_TOGGLE));

              for (var i = 0; i < toggles.length; i++) {
                var _parent = Dropdown._getParentFromElement(toggles[i]);
                var relatedTarget = { relatedTarget: toggles[i] };

                if (!$(_parent).hasClass(ClassName.OPEN)) {
                  continue;
                }

                if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(_parent, event.target)) {
                  continue;
                }

                var hideEvent = $.Event(Event.HIDE, relatedTarget);
                $(_parent).trigger(hideEvent);
                if (hideEvent.isDefaultPrevented()) {
                  continue;
                }

                toggles[i].setAttribute('aria-expanded', 'false');

                $(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
              }
            }
          }, {
            key: '_getParentFromElement',
            value: function _getParentFromElement(element) {
              var parent = undefined;
              var selector = _Util['default'].getSelectorFromElement(element);

              if (selector) {
                parent = $(selector)[0];
              }

              return parent || element.parentNode;
            }
          }, {
            key: '_dataApiKeydownHandler',
            value: function _dataApiKeydownHandler(event) {
              if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
                return;
              }

              event.preventDefault();
              event.stopPropagation();

              if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
                return;
              }

              var parent = Dropdown._getParentFromElement(this);
              var isActive = $(parent).hasClass(ClassName.OPEN);

              if (!isActive && event.which !== 27 || isActive && event.which === 27) {

                if (event.which === 27) {
                  var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
                  $(toggle).trigger('focus');
                }

                $(this).trigger('click');
                return;
              }

              var items = $.makeArray($(Selector.VISIBLE_ITEMS));

              items = items.filter(function (item) {
                return item.offsetWidth || item.offsetHeight;
              });

              if (!items.length) {
                return;
              }

              var index = items.indexOf(event.target);

              if (event.which === 38 && index > 0) {
                // up
                index--;
              }

              if (event.which === 40 && index < items.length - 1) {
                // down
                index++;
              }

              if (index < 0) {
                index = 0;
              }

              items[index].focus();
            }
          }, {
            key: 'VERSION',
            get: function get() {
              return VERSION;
            }
          }]);

          return Dropdown;
        }();

        $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
          e.stopPropagation();
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Dropdown._jQueryInterface;
        $.fn[NAME].Constructor = Dropdown;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Dropdown._jQueryInterface;
        };

        return Dropdown;
      }(jQuery);

      module.exports = Dropdown;
    });
  });

  dropdown && (typeof dropdown === 'undefined' ? 'undefined' : babelHelpers.typeof(dropdown)) === 'object' && 'default' in dropdown ? dropdown['default'] : dropdown;

  var collapse = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './util'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require$$0$1);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod, global.Util);
        global.collapse = mod.exports;
      }
    })(__commonjs_global, function (exports, module, _util) {
      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      var _Util = _interopRequireDefault(_util);

      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): collapse.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var Collapse = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'collapse';
        var VERSION = '4.0.0-alpha.2';
        var DATA_KEY = 'bs.collapse';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 600;

        var Default = {
          toggle: true,
          parent: ''
        };

        var DefaultType = {
          toggle: 'boolean',
          parent: 'string'
        };

        var Event = {
          SHOW: 'show' + EVENT_KEY,
          SHOWN: 'shown' + EVENT_KEY,
          HIDE: 'hide' + EVENT_KEY,
          HIDDEN: 'hidden' + EVENT_KEY,
          CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
          IN: 'in',
          COLLAPSE: 'collapse',
          COLLAPSING: 'collapsing',
          COLLAPSED: 'collapsed'
        };

        var Dimension = {
          WIDTH: 'width',
          HEIGHT: 'height'
        };

        var Selector = {
          ACTIVES: '.panel > .in, .panel > .collapsing',
          DATA_TOGGLE: '[data-toggle="collapse"]'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Collapse = function () {
          function Collapse(element, config) {
            _classCallCheck(this, Collapse);

            this._isTransitioning = false;
            this._element = element;
            this._config = this._getConfig(config);
            this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

            this._parent = this._config.parent ? this._getParent() : null;

            if (!this._config.parent) {
              this._addAriaAndCollapsedClass(this._element, this._triggerArray);
            }

            if (this._config.toggle) {
              this.toggle();
            }
          }

          /**
           * ------------------------------------------------------------------------
           * Data Api implementation
           * ------------------------------------------------------------------------
           */

          // getters

          _createClass(Collapse, [{
            key: 'toggle',

            // public

            value: function toggle() {
              if ($(this._element).hasClass(ClassName.IN)) {
                this.hide();
              } else {
                this.show();
              }
            }
          }, {
            key: 'show',
            value: function show() {
              var _this = this;

              if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
                return;
              }

              var actives = undefined;
              var activesData = undefined;

              if (this._parent) {
                actives = $.makeArray($(Selector.ACTIVES));
                if (!actives.length) {
                  actives = null;
                }
              }

              if (actives) {
                activesData = $(actives).data(DATA_KEY);
                if (activesData && activesData._isTransitioning) {
                  return;
                }
              }

              var startEvent = $.Event(Event.SHOW);
              $(this._element).trigger(startEvent);
              if (startEvent.isDefaultPrevented()) {
                return;
              }

              if (actives) {
                Collapse._jQueryInterface.call($(actives), 'hide');
                if (!activesData) {
                  $(actives).data(DATA_KEY, null);
                }
              }

              var dimension = this._getDimension();

              $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

              this._element.style[dimension] = 0;
              this._element.setAttribute('aria-expanded', true);

              if (this._triggerArray.length) {
                $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
              }

              this.setTransitioning(true);

              var complete = function complete() {
                $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

                _this._element.style[dimension] = '';

                _this.setTransitioning(false);

                $(_this._element).trigger(Event.SHOWN);
              };

              if (!_Util['default'].supportsTransitionEnd()) {
                complete();
                return;
              }

              var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
              var scrollSize = 'scroll' + capitalizedDimension;

              $(this._element).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

              this._element.style[dimension] = this._element[scrollSize] + 'px';
            }
          }, {
            key: 'hide',
            value: function hide() {
              var _this2 = this;

              if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
                return;
              }

              var startEvent = $.Event(Event.HIDE);
              $(this._element).trigger(startEvent);
              if (startEvent.isDefaultPrevented()) {
                return;
              }

              var dimension = this._getDimension();
              var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

              this._element.style[dimension] = this._element[offsetDimension] + 'px';

              _Util['default'].reflow(this._element);

              $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

              this._element.setAttribute('aria-expanded', false);

              if (this._triggerArray.length) {
                $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }

              this.setTransitioning(true);

              var complete = function complete() {
                _this2.setTransitioning(false);
                $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
              };

              this._element.style[dimension] = 0;

              if (!_Util['default'].supportsTransitionEnd()) {
                complete();
                return;
              }

              $(this._element).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
            }
          }, {
            key: 'setTransitioning',
            value: function setTransitioning(isTransitioning) {
              this._isTransitioning = isTransitioning;
            }
          }, {
            key: 'dispose',
            value: function dispose() {
              $.removeData(this._element, DATA_KEY);

              this._config = null;
              this._parent = null;
              this._element = null;
              this._triggerArray = null;
              this._isTransitioning = null;
            }

            // private

          }, {
            key: '_getConfig',
            value: function _getConfig(config) {
              config = $.extend({}, Default, config);
              config.toggle = Boolean(config.toggle); // coerce string values
              _Util['default'].typeCheckConfig(NAME, config, DefaultType);
              return config;
            }
          }, {
            key: '_getDimension',
            value: function _getDimension() {
              var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
              return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
            }
          }, {
            key: '_getParent',
            value: function _getParent() {
              var _this3 = this;

              var parent = $(this._config.parent)[0];
              var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

              $(parent).find(selector).each(function (i, element) {
                _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
              });

              return parent;
            }
          }, {
            key: '_addAriaAndCollapsedClass',
            value: function _addAriaAndCollapsedClass(element, triggerArray) {
              if (element) {
                var isOpen = $(element).hasClass(ClassName.IN);
                element.setAttribute('aria-expanded', isOpen);

                if (triggerArray.length) {
                  $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
                }
              }
            }

            // static

          }], [{
            key: '_getTargetFromElement',
            value: function _getTargetFromElement(element) {
              var selector = _Util['default'].getSelectorFromElement(element);
              return selector ? $(selector)[0] : null;
            }
          }, {
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
              return this.each(function () {
                var $this = $(this);
                var data = $this.data(DATA_KEY);
                var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : babelHelpers.typeof(config)) === 'object' && config);

                if (!data && _config.toggle && /show|hide/.test(config)) {
                  _config.toggle = false;
                }

                if (!data) {
                  data = new Collapse(this, _config);
                  $this.data(DATA_KEY, data);
                }

                if (typeof config === 'string') {
                  if (data[config] === undefined) {
                    throw new Error('No method named "' + config + '"');
                  }
                  data[config]();
                }
              });
            }
          }, {
            key: 'VERSION',
            get: function get() {
              return VERSION;
            }
          }, {
            key: 'Default',
            get: function get() {
              return Default;
            }
          }]);

          return Collapse;
        }();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
          event.preventDefault();

          var target = Collapse._getTargetFromElement(this);
          var data = $(target).data(DATA_KEY);
          var config = data ? 'toggle' : $(this).data();

          Collapse._jQueryInterface.call($(target), config);
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Collapse._jQueryInterface;
        $.fn[NAME].Constructor = Collapse;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Collapse._jQueryInterface;
        };

        return Collapse;
      }(jQuery);

      module.exports = Collapse;
    });
  });

  collapse && (typeof collapse === 'undefined' ? 'undefined' : babelHelpers.typeof(collapse)) === 'object' && 'default' in collapse ? collapse['default'] : collapse;

  var carousel = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './util'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require$$0$1);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod, global.Util);
        global.carousel = mod.exports;
      }
    })(__commonjs_global, function (exports, module, _util) {
      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      var _Util = _interopRequireDefault(_util);

      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): carousel.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var Carousel = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'carousel';
        var VERSION = '4.0.0-alpha.2';
        var DATA_KEY = 'bs.carousel';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 600;

        var Default = {
          interval: 5000,
          keyboard: true,
          slide: false,
          pause: 'hover',
          wrap: true
        };

        var DefaultType = {
          interval: '(number|boolean)',
          keyboard: 'boolean',
          slide: '(boolean|string)',
          pause: '(string|boolean)',
          wrap: 'boolean'
        };

        var Direction = {
          NEXT: 'next',
          PREVIOUS: 'prev'
        };

        var Event = {
          SLIDE: 'slide' + EVENT_KEY,
          SLID: 'slid' + EVENT_KEY,
          KEYDOWN: 'keydown' + EVENT_KEY,
          MOUSEENTER: 'mouseenter' + EVENT_KEY,
          MOUSELEAVE: 'mouseleave' + EVENT_KEY,
          LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
          CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
          CAROUSEL: 'carousel',
          ACTIVE: 'active',
          SLIDE: 'slide',
          RIGHT: 'right',
          LEFT: 'left',
          ITEM: 'carousel-item'
        };

        var Selector = {
          ACTIVE: '.active',
          ACTIVE_ITEM: '.active.carousel-item',
          ITEM: '.carousel-item',
          NEXT_PREV: '.next, .prev',
          INDICATORS: '.carousel-indicators',
          DATA_SLIDE: '[data-slide], [data-slide-to]',
          DATA_RIDE: '[data-ride="carousel"]'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Carousel = function () {
          function Carousel(element, config) {
            _classCallCheck(this, Carousel);

            this._items = null;
            this._interval = null;
            this._activeElement = null;

            this._isPaused = false;
            this._isSliding = false;

            this._config = this._getConfig(config);
            this._element = $(element)[0];
            this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

            this._addEventListeners();
          }

          /**
           * ------------------------------------------------------------------------
           * Data Api implementation
           * ------------------------------------------------------------------------
           */

          // getters

          _createClass(Carousel, [{
            key: 'next',

            // public

            value: function next() {
              if (!this._isSliding) {
                this._slide(Direction.NEXT);
              }
            }
          }, {
            key: 'nextWhenVisible',
            value: function nextWhenVisible() {
              // Don't call next when the page isn't visible
              if (!document.hidden) {
                this.next();
              }
            }
          }, {
            key: 'prev',
            value: function prev() {
              if (!this._isSliding) {
                this._slide(Direction.PREVIOUS);
              }
            }
          }, {
            key: 'pause',
            value: function pause(event) {
              if (!event) {
                this._isPaused = true;
              }

              if ($(this._element).find(Selector.NEXT_PREV)[0] && _Util['default'].supportsTransitionEnd()) {
                _Util['default'].triggerTransitionEnd(this._element);
                this.cycle(true);
              }

              clearInterval(this._interval);
              this._interval = null;
            }
          }, {
            key: 'cycle',
            value: function cycle(event) {
              if (!event) {
                this._isPaused = false;
              }

              if (this._interval) {
                clearInterval(this._interval);
                this._interval = null;
              }

              if (this._config.interval && !this._isPaused) {
                this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
              }
            }
          }, {
            key: 'to',
            value: function to(index) {
              var _this = this;

              this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

              var activeIndex = this._getItemIndex(this._activeElement);

              if (index > this._items.length - 1 || index < 0) {
                return;
              }

              if (this._isSliding) {
                $(this._element).one(Event.SLID, function () {
                  return _this.to(index);
                });
                return;
              }

              if (activeIndex === index) {
                this.pause();
                this.cycle();
                return;
              }

              var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

              this._slide(direction, this._items[index]);
            }
          }, {
            key: 'dispose',
            value: function dispose() {
              $(this._element).off(EVENT_KEY);
              $.removeData(this._element, DATA_KEY);

              this._items = null;
              this._config = null;
              this._element = null;
              this._interval = null;
              this._isPaused = null;
              this._isSliding = null;
              this._activeElement = null;
              this._indicatorsElement = null;
            }

            // private

          }, {
            key: '_getConfig',
            value: function _getConfig(config) {
              config = $.extend({}, Default, config);
              _Util['default'].typeCheckConfig(NAME, config, DefaultType);
              return config;
            }
          }, {
            key: '_addEventListeners',
            value: function _addEventListeners() {
              if (this._config.keyboard) {
                $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
              }

              if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
                $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
              }
            }
          }, {
            key: '_keydown',
            value: function _keydown(event) {
              event.preventDefault();

              if (/input|textarea/i.test(event.target.tagName)) {
                return;
              }

              switch (event.which) {
                case 37:
                  this.prev();break;
                case 39:
                  this.next();break;
                default:
                  return;
              }
            }
          }, {
            key: '_getItemIndex',
            value: function _getItemIndex(element) {
              this._items = $.makeArray($(element).parent().find(Selector.ITEM));
              return this._items.indexOf(element);
            }
          }, {
            key: '_getItemByDirection',
            value: function _getItemByDirection(direction, activeElement) {
              var isNextDirection = direction === Direction.NEXT;
              var isPrevDirection = direction === Direction.PREVIOUS;
              var activeIndex = this._getItemIndex(activeElement);
              var lastItemIndex = this._items.length - 1;
              var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

              if (isGoingToWrap && !this._config.wrap) {
                return activeElement;
              }

              var delta = direction === Direction.PREVIOUS ? -1 : 1;
              var itemIndex = (activeIndex + delta) % this._items.length;

              return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
            }
          }, {
            key: '_triggerSlideEvent',
            value: function _triggerSlideEvent(relatedTarget, directionalClassname) {
              var slideEvent = $.Event(Event.SLIDE, {
                relatedTarget: relatedTarget,
                direction: directionalClassname
              });

              $(this._element).trigger(slideEvent);

              return slideEvent;
            }
          }, {
            key: '_setActiveIndicatorElement',
            value: function _setActiveIndicatorElement(element) {
              if (this._indicatorsElement) {
                $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

                var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

                if (nextIndicator) {
                  $(nextIndicator).addClass(ClassName.ACTIVE);
                }
              }
            }
          }, {
            key: '_slide',
            value: function _slide(direction, element) {
              var _this2 = this;

              var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
              var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

              var isCycling = Boolean(this._interval);

              var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

              if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
                this._isSliding = false;
                return;
              }

              var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
              if (slideEvent.isDefaultPrevented()) {
                return;
              }

              if (!activeElement || !nextElement) {
                // some weirdness is happening, so we bail
                return;
              }

              this._isSliding = true;

              if (isCycling) {
                this.pause();
              }

              this._setActiveIndicatorElement(nextElement);

              var slidEvent = $.Event(Event.SLID, {
                relatedTarget: nextElement,
                direction: directionalClassName
              });

              if (_Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

                $(nextElement).addClass(direction);

                _Util['default'].reflow(nextElement);

                $(activeElement).addClass(directionalClassName);
                $(nextElement).addClass(directionalClassName);

                $(activeElement).one(_Util['default'].TRANSITION_END, function () {
                  $(nextElement).removeClass(directionalClassName).removeClass(direction);

                  $(nextElement).addClass(ClassName.ACTIVE);

                  $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

                  _this2._isSliding = false;

                  setTimeout(function () {
                    return $(_this2._element).trigger(slidEvent);
                  }, 0);
                }).emulateTransitionEnd(TRANSITION_DURATION);
              } else {
                $(activeElement).removeClass(ClassName.ACTIVE);
                $(nextElement).addClass(ClassName.ACTIVE);

                this._isSliding = false;
                $(this._element).trigger(slidEvent);
              }

              if (isCycling) {
                this.cycle();
              }
            }

            // static

          }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY);
                var _config = $.extend({}, Default, $(this).data());

                if ((typeof config === 'undefined' ? 'undefined' : babelHelpers.typeof(config)) === 'object') {
                  $.extend(_config, config);
                }

                var action = typeof config === 'string' ? config : _config.slide;

                if (!data) {
                  data = new Carousel(this, _config);
                  $(this).data(DATA_KEY, data);
                }

                if (typeof config === 'number') {
                  data.to(config);
                } else if (typeof action === 'string') {
                  if (data[action] === undefined) {
                    throw new Error('No method named "' + action + '"');
                  }
                  data[action]();
                } else if (_config.interval) {
                  data.pause();
                  data.cycle();
                }
              });
            }
          }, {
            key: '_dataApiClickHandler',
            value: function _dataApiClickHandler(event) {
              var selector = _Util['default'].getSelectorFromElement(this);

              if (!selector) {
                return;
              }

              var target = $(selector)[0];

              if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
                return;
              }

              var config = $.extend({}, $(target).data(), $(this).data());
              var slideIndex = this.getAttribute('data-slide-to');

              if (slideIndex) {
                config.interval = false;
              }

              Carousel._jQueryInterface.call($(target), config);

              if (slideIndex) {
                $(target).data(DATA_KEY).to(slideIndex);
              }

              event.preventDefault();
            }
          }, {
            key: 'VERSION',
            get: function get() {
              return VERSION;
            }
          }, {
            key: 'Default',
            get: function get() {
              return Default;
            }
          }]);

          return Carousel;
        }();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

        $(window).on(Event.LOAD_DATA_API, function () {
          $(Selector.DATA_RIDE).each(function () {
            var $carousel = $(this);
            Carousel._jQueryInterface.call($carousel, $carousel.data());
          });
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Carousel._jQueryInterface;
        $.fn[NAME].Constructor = Carousel;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Carousel._jQueryInterface;
        };

        return Carousel;
      }(jQuery);

      module.exports = Carousel;
    });
  });

  carousel && (typeof carousel === 'undefined' ? 'undefined' : babelHelpers.typeof(carousel)) === 'object' && 'default' in carousel ? carousel['default'] : carousel;

  var button = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod);
        global.button = mod.exports;
      }
    })(__commonjs_global, function (exports, module) {
      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): button.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      var Button = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'button';
        var VERSION = '4.0.0-alpha.2';
        var DATA_KEY = 'bs.button';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];

        var ClassName = {
          ACTIVE: 'active',
          BUTTON: 'btn',
          FOCUS: 'focus'
        };

        var Selector = {
          DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
          DATA_TOGGLE: '[data-toggle="buttons"]',
          INPUT: 'input',
          ACTIVE: '.active',
          BUTTON: '.btn'
        };

        var Event = {
          CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
          FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Button = function () {
          function Button(element) {
            _classCallCheck(this, Button);

            this._element = element;
          }

          /**
           * ------------------------------------------------------------------------
           * Data Api implementation
           * ------------------------------------------------------------------------
           */

          // getters

          _createClass(Button, [{
            key: 'toggle',

            // public

            value: function toggle() {
              var triggerChangeEvent = true;
              var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

              if (rootElement) {
                var input = $(this._element).find(Selector.INPUT)[0];

                if (input) {
                  if (input.type === 'radio') {
                    if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                      triggerChangeEvent = false;
                    } else {
                      var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                      if (activeElement) {
                        $(activeElement).removeClass(ClassName.ACTIVE);
                      }
                    }
                  }

                  if (triggerChangeEvent) {
                    input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
                    $(this._element).trigger('change');
                  }

                  input.focus();
                }
              } else {
                this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
              }

              if (triggerChangeEvent) {
                $(this._element).toggleClass(ClassName.ACTIVE);
              }
            }
          }, {
            key: 'dispose',
            value: function dispose() {
              $.removeData(this._element, DATA_KEY);
              this._element = null;
            }

            // static

          }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
              return this.each(function () {
                var data = $(this).data(DATA_KEY);

                if (!data) {
                  data = new Button(this);
                  $(this).data(DATA_KEY, data);
                }

                if (config === 'toggle') {
                  data[config]();
                }
              });
            }
          }, {
            key: 'VERSION',
            get: function get() {
              return VERSION;
            }
          }]);

          return Button;
        }();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
          event.preventDefault();

          var button = event.target;

          if (!$(button).hasClass(ClassName.BUTTON)) {
            button = $(button).closest(Selector.BUTTON);
          }

          Button._jQueryInterface.call($(button), 'toggle');
        }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
          var button = $(event.target).closest(Selector.BUTTON)[0];
          $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Button._jQueryInterface;
        $.fn[NAME].Constructor = Button;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Button._jQueryInterface;
        };

        return Button;
      }(jQuery);

      module.exports = Button;
    });
  });

  button && (typeof button === 'undefined' ? 'undefined' : babelHelpers.typeof(button)) === 'object' && 'default' in button ? button['default'] : button;

  var alert = __commonjs(function (module, exports, global) {
    (function (global, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './util'], factory);
      } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require$$0$1);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod.exports, mod, global.Util);
        global.alert = mod.exports;
      }
    })(__commonjs_global, function (exports, module, _util) {
      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      var _Util = _interopRequireDefault(_util);

      /**
       * --------------------------------------------------------------------------
       * Bootstrap (v4.0.0-alpha.2): alert.js
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       * --------------------------------------------------------------------------
       */

      var Alert = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'alert';
        var VERSION = '4.0.0-alpha.2';
        var DATA_KEY = 'bs.alert';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 150;

        var Selector = {
          DISMISS: '[data-dismiss="alert"]'
        };

        var Event = {
          CLOSE: 'close' + EVENT_KEY,
          CLOSED: 'closed' + EVENT_KEY,
          CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
          ALERT: 'alert',
          FADE: 'fade',
          IN: 'in'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Alert = function () {
          function Alert(element) {
            _classCallCheck(this, Alert);

            this._element = element;
          }

          /**
           * ------------------------------------------------------------------------
           * Data Api implementation
           * ------------------------------------------------------------------------
           */

          // getters

          _createClass(Alert, [{
            key: 'close',

            // public

            value: function close(element) {
              element = element || this._element;

              var rootElement = this._getRootElement(element);
              var customEvent = this._triggerCloseEvent(rootElement);

              if (customEvent.isDefaultPrevented()) {
                return;
              }

              this._removeElement(rootElement);
            }
          }, {
            key: 'dispose',
            value: function dispose() {
              $.removeData(this._element, DATA_KEY);
              this._element = null;
            }

            // private

          }, {
            key: '_getRootElement',
            value: function _getRootElement(element) {
              var selector = _Util['default'].getSelectorFromElement(element);
              var parent = false;

              if (selector) {
                parent = $(selector)[0];
              }

              if (!parent) {
                parent = $(element).closest('.' + ClassName.ALERT)[0];
              }

              return parent;
            }
          }, {
            key: '_triggerCloseEvent',
            value: function _triggerCloseEvent(element) {
              var closeEvent = $.Event(Event.CLOSE);

              $(element).trigger(closeEvent);
              return closeEvent;
            }
          }, {
            key: '_removeElement',
            value: function _removeElement(element) {
              $(element).removeClass(ClassName.IN);

              if (!_Util['default'].supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
                this._destroyElement(element);
                return;
              }

              $(element).one(_Util['default'].TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
            }
          }, {
            key: '_destroyElement',
            value: function _destroyElement(element) {
              $(element).detach().trigger(Event.CLOSED).remove();
            }

            // static

          }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
              return this.each(function () {
                var $element = $(this);
                var data = $element.data(DATA_KEY);

                if (!data) {
                  data = new Alert(this);
                  $element.data(DATA_KEY, data);
                }

                if (config === 'close') {
                  data[config](this);
                }
              });
            }
          }, {
            key: '_handleDismiss',
            value: function _handleDismiss(alertInstance) {
              return function (event) {
                if (event) {
                  event.preventDefault();
                }

                alertInstance.close(this);
              };
            }
          }, {
            key: 'VERSION',
            get: function get() {
              return VERSION;
            }
          }]);

          return Alert;
        }();

        $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Alert._jQueryInterface;
        $.fn[NAME].Constructor = Alert;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return Alert._jQueryInterface;
        };

        return Alert;
      }(jQuery);

      module.exports = Alert;
    });
  });

  alert && (typeof alert === 'undefined' ? 'undefined' : babelHelpers.typeof(alert)) === 'object' && 'default' in alert ? alert['default'] : alert;

  var npm = __commonjs(function (module) {
    // This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.
  });

  npm && (typeof npm === 'undefined' ? 'undefined' : babelHelpers.typeof(npm)) === 'object' && 'default' in npm ? npm['default'] : npm;

  var Util = function () {

    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    var transitionEnd = false;
    var _transitionEndSelector = '';

    var TransitionEndEvent = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    function transitionEndTest() {
      if (window.QUnit) {
        return false;
      }

      var el = document.createElement('mdb');

      for (var name in TransitionEndEvent) {
        if (el.style[name] !== undefined) {
          return TransitionEndEvent[name]; // { end: TransitionEndEvent[name] }
        }
      }

      return false;
    }

    function setTransitionEndSupport() {
      transitionEnd = transitionEndTest();

      // generate a concatenated transition end event selector
      for (var name in TransitionEndEvent) {
        _transitionEndSelector += ' ' + TransitionEndEvent[name];
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */

    var Util = {
      transitionEndSupported: function transitionEndSupported() {
        return transitionEnd;
      },
      transitionEndSelector: function transitionEndSelector() {
        return _transitionEndSelector;
      },
      isChar: function isChar(event) {
        if (typeof event.which === 'undefined') {
          return true;
        } else if (typeof event.which === 'number' && event.which > 0) {
          return !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8 // backspace
           && event.which !== 9 // tab
           && event.which !== 13 // enter
           && event.which !== 16 // shift
           && event.which !== 17 // ctrl
           && event.which !== 20 // caps lock
           && event.which !== 27 // escape
          ;
        }
        return false;
      },
      assert: function assert($element, invalidTest, message) {
        if (invalidTest) {
          if (!$element === undefined) {
            $element.css('border', '1px solid red');
          }
          console.error(message, $element); // eslint-disable-line no-console
          throw message;
        }
      },
      describe: function describe($element) {
        if ($element === undefined) {
          return 'undefined';
        } else if ($element.length === 0) {
          return '(no matching elements)';
        }
        return $element[0].outerHTML.split('>')[0] + '>';
      }
    };

    setTransitionEndSupport();
    return Util;
  }(jQuery);

  var Base = function ($) {

    var ClassName = {
      MDB_FORM_GROUP: 'mdb-form-group',
      IS_FILLED: 'is-filled',
      IS_FOCUSED: 'is-focused'
    };

    var Selector = {
      MDB_FORM_GROUP: '.' + ClassName.MDB_FORM_GROUP
    };

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Base = function () {

      /**
       *
       * @param element
       * @param config
       * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
       */

      function Base($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        babelHelpers.classCallCheck(this, Base);

        this.$element = $element;
        this.config = $.extend(true, {}, Default, config);

        // set properties for use in the constructor initialization
        for (var key in properties) {
          this[key] = properties[key];
        }
      }

      babelHelpers.createClass(Base, [{
        key: 'dispose',
        value: function dispose(dataKey) {
          $.removeData(this.$element, dataKey);
          this.$element = null;
          this.config = null;
        }

        // ------------------------------------------------------------------------
        // protected

      }, {
        key: 'addFormGroupFocus',
        value: function addFormGroupFocus() {
          if (!this.$element.prop('disabled')) {
            this.$mdbFormGroup.addClass(ClassName.IS_FOCUSED);
          }
        }
      }, {
        key: 'removeFormGroupFocus',
        value: function removeFormGroupFocus() {
          this.$mdbFormGroup.removeClass(ClassName.IS_FOCUSED);
        }
      }, {
        key: 'removeIsFilled',
        value: function removeIsFilled() {
          this.$mdbFormGroup.removeClass(ClassName.IS_FILLED);
        }
      }, {
        key: 'addIsFilled',
        value: function addIsFilled() {
          this.$mdbFormGroup.addClass(ClassName.IS_FILLED);
        }

        // Find mdb-form-group

      }, {
        key: 'findMdbFormGroup',
        value: function findMdbFormGroup() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

          var mfg = this.$element.closest(Selector.MDB_FORM_GROUP);
          if (mfg.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.MDB_FORM_GROUP + ' for ' + Util.describe(this.$element));
          }
          return mfg;
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }]);
      return Base;
    }();

    return Base;
  }(jQuery);

  var BaseInput = function ($) {

    var ClassName = {
      FORM_GROUP: 'form-group',
      MDB_FORM_GROUP: 'mdb-form-group',
      MDB_LABEL: 'mdb-label',
      MDB_LABEL_STATIC: 'mdb-label-static',
      MDB_LABEL_PLACEHOLDER: 'mdb-label-placeholder',
      MDB_LABEL_FLOATING: 'mdb-label-floating',
      HAS_DANGER: 'has-danger',
      IS_FILLED: 'is-filled',
      IS_FOCUSED: 'is-focused'
    };

    var Selector = {
      FORM_GROUP: '.' + ClassName.FORM_GROUP,
      MDB_FORM_GROUP: '.' + ClassName.MDB_FORM_GROUP,
      MDB_LABEL_WILDCARD: 'label[class^=\'' + ClassName.MDB_LABEL + '\'], label[class*=\' ' + ClassName.MDB_LABEL + '\']' // match any label variant if specified
    };

    var Default = {
      validate: false,
      formGroup: {
        required: false
      },
      mdbFormGroup: {
        template: '<span class=\'' + ClassName.MDB_FORM_GROUP + '\'></span>',
        create: true, // create a wrapper if form-group not found
        required: true // not recommended to turn this off, only used for inline components
      },
      label: {
        required: false,

        // Prioritized find order for resolving the label to be used as an mdb-label if not specified in the markup
        //  - a function(thisComponent); or
        //  - a string selector used like $mdbFormGroup.find(selector)
        //
        // Note this only runs if $mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD) fails to find a label (as authored in the markup)
        //
        selectors: ['.form-control-label', // in the case of horizontal or inline forms, this will be marked
        '> label' // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
        ],
        className: ClassName.MDB_LABEL_STATIC
      },
      requiredClasses: [],
      invalidComponentMatches: [],
      convertInputSizeVariations: true
    };

    var FormControlSizeMarkers = {
      'form-control-lg': 'mdb-form-group-lg',
      'form-control-sm': 'mdb-form-group-sm'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseInput = function (_Base) {
      babelHelpers.inherits(BaseInput, _Base);


      /**
       *
       * @param element
       * @param config
       * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
       */

      function BaseInput($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        babelHelpers.classCallCheck(this, BaseInput);


        // Enforce no overlap between components to prevent side effects

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BaseInput).call(this, $element, $.extend(true, {}, Default, config), properties));

        _this._rejectInvalidComponentMatches();

        // Enforce expected structure (if any)
        _this.rejectWithoutRequiredStructure();

        // Enforce required classes for a consistent rendering
        _this._rejectWithoutRequiredClasses();

        // Resolve the form-group first, it will be used for mdb-form-group if possible
        //   note: different components have different rules
        _this.$formGroup = _this.findFormGroup(_this.config.formGroup.required);

        // Will add mdb-form-group to form-group or create an mdb-form-group
        //  Performance Note: for those forms that are really performance driven, create the markup with the .mdb-form-group to avoid
        //    rendering changes once added.
        _this.$mdbFormGroup = _this.resolveMdbFormGroup();

        // Resolve and mark the mdbLabel if necessary as defined by the config
        _this.$mdbLabel = _this.resolveMdbLabel();

        // Signal to the mdb-form-group that a form-control-* variation is being used
        _this.resolveMdbFormGroupSizing();

        _this.addFocusListener();
        _this.addChangeListener();
        return _this;
      }

      babelHelpers.createClass(BaseInput, [{
        key: 'dispose',
        value: function dispose(dataKey) {
          babelHelpers.get(Object.getPrototypeOf(BaseInput.prototype), 'dispose', this).call(this, dataKey);
          this.$mdbFormGroup = null;
          this.$formGroup = null;
        }

        // ------------------------------------------------------------------------
        // protected

      }, {
        key: 'rejectWithoutRequiredStructure',
        value: function rejectWithoutRequiredStructure() {
          // implement
        }
      }, {
        key: 'addFocusListener',
        value: function addFocusListener() {
          var _this2 = this;

          this.$element.on('focus', function () {
            _this2.addFormGroupFocus();
          }).on('blur', function () {
            _this2.removeFormGroupFocus();
          });
        }
      }, {
        key: 'addChangeListener',
        value: function addChangeListener() {
          var _this3 = this;

          this.$element.on('keydown paste', function (event) {
            if (Util.isChar(event)) {
              _this3.addIsFilled();
            }
          }).on('keyup change', function () {

            // make sure empty is added back when there is a programmatic value change.
            //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
            if (_this3.isEmpty()) {
              _this3.removeIsFilled();
            } else {
              _this3.addIsFilled();
            }

            if (_this3.config.validate) {
              // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
              //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
              //  the form-group on change.
              //
              // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
              //        BUT, I've left it here for backwards compatibility.
              var isValid = typeof _this3.$element[0].checkValidity === 'undefined' || _this3.$element[0].checkValidity();
              if (isValid) {
                _this3.removeHasDanger();
              } else {
                _this3.addHasDanger();
              }
            }
          });
        }
      }, {
        key: 'addHasDanger',
        value: function addHasDanger() {
          this.$mdbFormGroup.addClass(ClassName.HAS_DANGER);
        }
      }, {
        key: 'removeHasDanger',
        value: function removeHasDanger() {
          this.$mdbFormGroup.removeClass(ClassName.HAS_DANGER);
        }
      }, {
        key: 'isEmpty',
        value: function isEmpty() {
          return this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === '';
        }

        // Will add mdb-form-group to form-group or create a mdb-form-group if necessary

      }, {
        key: 'resolveMdbFormGroup',
        value: function resolveMdbFormGroup() {
          var mfg = this.findMdbFormGroup(false);
          if (mfg === undefined || mfg.length === 0) {
            if (this.config.mdbFormGroup.create && (this.$formGroup === undefined || this.$formGroup.length === 0)) {
              // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
              //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.
              this.outerElement().wrap(this.config.mdbFormGroup.template);
            } else {
              // a form-group does exist, add our marker class to it
              this.$formGroup.addClass(ClassName.MDB_FORM_GROUP);

              // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
              // A form-group does exist, so add an mdb-form-group wrapping it's internal contents
              //fg.wrapInner(this.config.mdbFormGroup.template)
            }

            mfg = this.findMdbFormGroup(this.config.mdbFormGroup.required);
          }

          return mfg;
        }

        // Demarcation element (e.g. first child of a form-group)
        //  Subclasses such as file inputs may have different structures

      }, {
        key: 'outerElement',
        value: function outerElement() {
          return this.$element;
        }

        // Will add mdb-label to mdb-form-group if not already specified

      }, {
        key: 'resolveMdbLabel',
        value: function resolveMdbLabel() {

          var label = this.$mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD);
          if (label === undefined || label.length === 0) {
            // we need to find it based on the configured selectors
            label = this.findMdbLabel(this.config.label.required);

            if (label === undefined || label.length === 0) {
              // no label found, and finder did not require one
            } else {
                // a candidate label was found, add the configured default class name
                label.addClass(this.config.label.className);
              }
          }

          return label;
        }

        // Find mdb-label variant based on the config selectors

      }, {
        key: 'findMdbLabel',
        value: function findMdbLabel() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

          var label = null;

          // use the specified selector order
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.config.label.selectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var selector = _step.value;

              if ($.isFunction(selector)) {
                label = selector(this);
              } else {
                label = this.$mdbFormGroup.find(selector);
              }

              if (label !== undefined && label.length > 0) {
                break;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (label.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.MDB_LABEL_WILDCARD + ' within form-group for ' + Util.describe(this.$element));
          }
          return label;
        }

        // Find mdb-form-group

      }, {
        key: 'findFormGroup',
        value: function findFormGroup() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

          var fg = this.$element.closest(Selector.FORM_GROUP);
          if (fg.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.FORM_GROUP + ' for ' + Util.describe(this.$element));
          }
          return fg;
        }

        // Due to the interconnected nature of labels/inputs/help-blocks, signal the mdb-form-group-* size variation based on
        //  a found form-control-* size

      }, {
        key: 'resolveMdbFormGroupSizing',
        value: function resolveMdbFormGroupSizing() {
          if (!this.config.convertInputSizeVariations) {
            return;
          }

          // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
          for (var inputSize in FormControlSizeMarkers) {
            if (this.$element.hasClass(inputSize)) {
              //this.$element.removeClass(inputSize)
              this.$mdbFormGroup.addClass(FormControlSizeMarkers[inputSize]);
            }
          }
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_rejectInvalidComponentMatches',
        value: function _rejectInvalidComponentMatches() {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.config.invalidComponentMatches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var otherComponent = _step2.value;

              otherComponent.rejectMatch(this.constructor.name, this.$element);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }, {
        key: '_rejectWithoutRequiredClasses',
        value: function _rejectWithoutRequiredClasses() {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.config.requiredClasses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var requiredClass = _step3.value;


              var found = false;
              // allow one of several classes to be passed in x||y
              if (requiredClass.indexOf('||') !== -1) {
                var oneOf = requiredClass.split('||');
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                  for (var _iterator4 = oneOf[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _requiredClass = _step4.value;

                    if (this.$element.hasClass(_requiredClass)) {
                      found = true;
                      break;
                    }
                  }
                } catch (err) {
                  _didIteratorError4 = true;
                  _iteratorError4 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                      _iterator4.return();
                    }
                  } finally {
                    if (_didIteratorError4) {
                      throw _iteratorError4;
                    }
                  }
                }
              } else if (this.$element.hasClass(requiredClass)) {
                found = true;
              }

              // error if not found
              if (!found) {
                $.error(this.constructor.name + ' element: ' + Util.describe(this.$element) + ' requires class: ' + requiredClass);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }

        // ------------------------------------------------------------------------
        // static

      }]);
      return BaseInput;
    }(Base);

    return BaseInput;
  }(jQuery);

  var BaseSelection = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var Default = {
      label: {
        required: false

        // Prioritized find order for resolving the label to be used as an mdb-label if not specified in the markup
        //  - a function(thisComponent); or
        //  - a string selector used like $mdbFormGroup.find(selector)
        //
        // Note this only runs if $mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD) fails to find a label (as authored in the markup)
        //
        //selectors: [
        //  `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
        //  `> label` // usual case for text inputs
        //]
      }
    };

    var Selector = {
      LABEL: 'label'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseSelection = function (_BaseInput) {
      babelHelpers.inherits(BaseSelection, _BaseInput);

      function BaseSelection($element, config, properties) {
        babelHelpers.classCallCheck(this, BaseSelection);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BaseSelection).call(this, $element, $.extend(true, {}, Default, config), properties));
        // properties = {inputType: checkbox, outerClass: checkbox-inline}
        // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
        // '.${this.outerClass} > label > input[type=${this.inputType}]'

        _this.decorateMarkup();
        return _this;
      }

      // ------------------------------------------------------------------------
      // protected

      babelHelpers.createClass(BaseSelection, [{
        key: 'decorateMarkup',
        value: function decorateMarkup() {
          this.$element.after(this.config.template);
        }

        // Demarcation element (e.g. first child of a form-group)

      }, {
        key: 'outerElement',
        value: function outerElement() {
          // .checkbox|switch|radio > label > input[type=checkbox|radio]
          // label.checkbox-inline > input[type=checkbox|radio]
          // .${this.outerClass} > label > input[type=${this.inputType}]
          return this.$element.parent().closest('.' + this.outerClass);
        }
      }, {
        key: 'rejectWithoutRequiredStructure',
        value: function rejectWithoutRequiredStructure() {
          // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
          // '.${this.outerClass} > label > input[type=${this.inputType}]'
          Util.assert(this.$element, !this.$element.parent().prop('tagName') === 'label', this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element should be <label>.');
          Util.assert(this.$element, !this.outerElement().hasClass(this.outerClass), this.constructor.name + '\'s ' + Util.describe(this.$element) + ' outer element should have class ' + this.outerClass + '.');
        }
      }, {
        key: 'addFocusListener',
        value: function addFocusListener() {
          var _this2 = this;

          // checkboxes didn't appear to bubble to the document, so we'll bind these directly
          this.$element.closest(Selector.LABEL).hover(function () {
            _this2.addFormGroupFocus();
          }, function () {
            _this2.removeFormGroupFocus();
          });
        }
      }, {
        key: 'addChangeListener',
        value: function addChangeListener() {
          var _this3 = this;

          this.$element.change(function () {
            _this3.$element.blur();
          });
        }

        // ------------------------------------------------------------------------
        // private

      }]);
      return BaseSelection;
    }(BaseInput);

    return BaseSelection;
  }(jQuery);

  var Checkbox = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'checkbox';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      template: '<span class=\'checkbox-decorator\'><span class=\'check\'></span></span>'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Checkbox = function (_BaseSelection) {
      babelHelpers.inherits(Checkbox, _BaseSelection);

      function Checkbox($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: NAME, outerClass: NAME } : arguments[2];
        babelHelpers.classCallCheck(this, Checkbox);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [File, Radio, Text, Textarea, Select]},
        Default, config), properties));
      }

      babelHelpers.createClass(Checkbox, [{
        key: 'dispose',
        value: function dispose() {
          var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

          babelHelpers.get(Object.getPrototypeOf(Checkbox.prototype), 'dispose', this).call(this, dataKey);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          // '.checkbox > label > input[type=checkbox]'
          if ($element.attr('type') === 'checkbox') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'checkbox\'.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Checkbox($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Checkbox;
    }(BaseSelection);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Checkbox._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Checkbox;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Checkbox._jQueryInterface;
    };

    return Checkbox;
  }(jQuery);

  var CheckboxInline = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'checkboxInline';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      mdbFormGroup: {
        create: false, // no mdb-form-group creation if form-group not present. It messes with the layout.
        required: false
      }
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var CheckboxInline = function (_Checkbox) {
      babelHelpers.inherits(CheckboxInline, _Checkbox);

      function CheckboxInline($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'checkbox', outerClass: 'checkbox-inline' } : arguments[2];
        babelHelpers.classCallCheck(this, CheckboxInline);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxInline).call(this, $element, $.extend(true, {}, Default, config), properties));
      }

      babelHelpers.createClass(CheckboxInline, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(CheckboxInline.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        //static matches($element) {
        //  // '.checkbox-inline > input[type=checkbox]'
        //  if ($element.attr('type') === 'checkbox') {
        //    return true
        //  }
        //  return false
        //}
        //
        //static rejectMatch(component, $element) {
        //  Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
        //}

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new CheckboxInline($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return CheckboxInline;
    }(Checkbox);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = CheckboxInline._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = CheckboxInline;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return CheckboxInline._jQueryInterface;
    };

    return CheckboxInline;
  }(jQuery);

  var CollapseInline = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapseInline';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Selector = {
      ANY_INPUT: 'input, select, textarea'
    };

    var ClassName = {
      IN: 'in',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed',
      WIDTH: 'width'
    };
    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var CollapseInline = function (_Base) {
      babelHelpers.inherits(CollapseInline, _Base);


      // $element is expected to be the trigger
      //  i.e. <button class="btn mdb-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">

      function CollapseInline($element, config) {
        babelHelpers.classCallCheck(this, CollapseInline);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(CollapseInline).call(this, $element, $.extend(true, {}, Default, config)));

        _this.$mdbFormGroup = _this.findMdbFormGroup(true);

        var collapseSelector = $element.data('target');
        _this.$collapse = $(collapseSelector);

        Util.assert($element, _this.$collapse.length === 0, 'Cannot find collapse target for ' + Util.describe($element));
        Util.assert(_this.$collapse, !_this.$collapse.hasClass(ClassName.COLLAPSE), Util.describe(_this.$collapse) + ' is expected to have the \'' + ClassName.COLLAPSE + '\' class.  It is being targeted by ' + Util.describe($element));

        // find the first input for focusing
        var $inputs = _this.$mdbFormGroup.find(Selector.ANY_INPUT);
        if ($inputs.length > 0) {
          _this.$input = $inputs.first();
        }

        // automatically add the marker class to collapse width instead of height - nice convenience because it is easily forgotten
        if (!_this.$collapse.hasClass(ClassName.WIDTH)) {
          _this.$collapse.addClass(ClassName.WIDTH);
        }

        if (_this.$input) {
          // add a listener to set focus
          _this.$collapse.on('shown.bs.collapse', function () {
            _this.$input.focus();
          });

          // add a listener to collapse field
          _this.$input.blur(function () {
            _this.$collapse.collapse('hide');
          });
        }
        return _this;
      }

      babelHelpers.createClass(CollapseInline, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(CollapseInline.prototype), 'dispose', this).call(this, DATA_KEY);
          this.$mdbFormGroup = null;
          this.$collapse = null;
          this.$input = null;
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new CollapseInline($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return CollapseInline;
    }(Base);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = CollapseInline._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = CollapseInline;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return CollapseInline._jQueryInterface;
    };

    return CollapseInline;
  }(jQuery);

  var File = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'file';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    var ClassName = {
      FILE: NAME,
      IS_FILE: 'is-file'
    };

    var Selector = {
      FILENAMES: 'input.form-control[readonly]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var File = function (_BaseInput) {
      babelHelpers.inherits(File, _BaseInput);

      function File($element, config) {
        babelHelpers.classCallCheck(this, File);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(File).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]},
        Default, config)));

        _this.$mdbFormGroup.addClass(ClassName.IS_FILE);
        return _this;
      }

      babelHelpers.createClass(File, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(File.prototype), 'dispose', this).call(this, DATA_KEY);
        }
      }, {
        key: 'outerElement',


        // ------------------------------------------------------------------------
        // protected

        // Demarcation element (e.g. first child of a form-group)
        value: function outerElement() {
          // label.file > input[type=file]
          return this.$element.parent().closest('.' + ClassName.FILE);
        }
      }, {
        key: 'rejectWithoutRequiredStructure',
        value: function rejectWithoutRequiredStructure() {
          // label.file > input[type=file]
          Util.assert(this.$element, !this.outerElement().prop('tagName') === 'label', this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element ' + Util.describe(this.outerElement()) + ' should be <label>.');
          Util.assert(this.$element, !this.outerElement().hasClass(ClassName.FILE), this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element ' + Util.describe(this.outerElement()) + ' should have class .' + ClassName.FILE + '.');
        }
      }, {
        key: 'addFocusListener',
        value: function addFocusListener() {
          var _this2 = this;

          this.$mdbFormGroup.on('focus', function () {
            _this2.addFormGroupFocus();
          }).on('blur', function () {
            _this2.removeFormGroupFocus();
          });
        }
      }, {
        key: 'addChangeListener',
        value: function addChangeListener() {
          var _this3 = this;

          // set the fileinput readonly field with the name of the file
          this.$element.on('change', function () {
            var value = '';
            $.each(_this3.$element.files, function (i, file) {
              value += file.name + '  , ';
            });
            value = value.substring(0, value.length - 2);
            if (value) {
              _this3.addIsFilled();
            } else {
              _this3.removeIsFilled();
            }
            _this3.$mdbFormGroup.find(Selector.FILENAMES).val(value);
          });
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.attr('type') === 'file') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'file\'.');
        }
      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new File($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return File;
    }(BaseInput);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = File._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = File;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return File._jQueryInterface;
    };

    return File;
  }(jQuery);

  var Radio = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'radio';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      template: '<span class=\'mdb-radio-outer-circle\'></span><span class=\'mdb-radio-inner-circle\'></span>'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Radio = function (_BaseSelection) {
      babelHelpers.inherits(Radio, _BaseSelection);

      function Radio($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: NAME, outerClass: NAME } : arguments[2];
        babelHelpers.classCallCheck(this, Radio);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Radio).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Switch, Text]},
        Default, config), properties));
      }

      babelHelpers.createClass(Radio, [{
        key: 'dispose',
        value: function dispose() {
          var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

          babelHelpers.get(Object.getPrototypeOf(Radio.prototype), 'dispose', this).call(this, dataKey);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          // '.radio > label > input[type=radio]'
          if ($element.attr('type') === 'radio') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'radio\'.');
        }

        // ------------------------------------------------------------------------
        // protected

        //decorateMarkup() {
        //  this.$element.after(this.config.template)
        //}

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Radio($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Radio;
    }(BaseSelection);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Radio._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Radio;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Radio._jQueryInterface;
    };

    return Radio;
  }(jQuery);

  var RadioInline = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'radioInline';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      mdbFormGroup: {
        create: false, // no mdb-form-group creation if form-group not present. It messes with the layout.
        required: false
      }
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var RadioInline = function (_Radio) {
      babelHelpers.inherits(RadioInline, _Radio);

      function RadioInline($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'radio', outerClass: 'radio-inline' } : arguments[2];
        babelHelpers.classCallCheck(this, RadioInline);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(RadioInline).call(this, $element, $.extend(true, {}, Default, config), properties));
      }

      babelHelpers.createClass(RadioInline, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(RadioInline.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new RadioInline($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return RadioInline;
    }(Radio);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = RadioInline._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = RadioInline;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return RadioInline._jQueryInterface;
    };

    return RadioInline;
  }(jQuery);

  var BaseFormControl = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var Default = {
      requiredClasses: ['form-control']
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseFormControl = function (_BaseInput) {
      babelHelpers.inherits(BaseFormControl, _BaseInput);

      function BaseFormControl($element, config) {
        babelHelpers.classCallCheck(this, BaseFormControl);


        // Initially mark as empty

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BaseFormControl).call(this, $element, $.extend(true, Default, config)));

        if (_this.isEmpty()) {
          _this.removeIsFilled();
        }
        return _this;
      }

      return BaseFormControl;
    }(BaseInput);

    return BaseFormControl;
  }(jQuery);

  var Select = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'select';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      requiredClasses: ['form-control||custom-select']
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Select = function (_BaseFormControl) {
      babelHelpers.inherits(Select, _BaseFormControl);

      function Select($element, config) {
        babelHelpers.classCallCheck(this, Select);


        // floating labels will cover the options, so trigger them to be above (if used)

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]},
        Default, config)));

        _this.addIsFilled();
        return _this;
      }

      babelHelpers.createClass(Select, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(Select.prototype), 'dispose', this).call(this, DATA_KEY);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.prop('tagName') === 'select') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for <select>.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Select($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Select;
    }(BaseFormControl);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Select._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Select;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Select._jQueryInterface;
    };

    return Select;
  }(jQuery);

  var Switch = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'switch';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      template: '<span class=\'mdb-switch-track\'></span>'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Switch = function (_Checkbox) {
      babelHelpers.inherits(Switch, _Checkbox);

      function Switch($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'checkbox', outerClass: 'switch' } : arguments[2];
        babelHelpers.classCallCheck(this, Switch);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Switch).call(this, $element, $.extend(true, {}, Default, config), properties));
        // selector: '.switch > label > input[type=checkbox]'
      }

      babelHelpers.createClass(Switch, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(Switch.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Switch($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Switch;
    }(Checkbox);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Switch._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Switch;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Switch._jQueryInterface;
    };

    return Switch;
  }(jQuery);

  var Text = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'text';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Text = function (_BaseFormControl) {
      babelHelpers.inherits(Text, _BaseFormControl);

      function Text($element, config) {
        babelHelpers.classCallCheck(this, Text);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Select, Textarea]},
        Default, config)));
      }

      babelHelpers.createClass(Text, [{
        key: 'dispose',
        value: function dispose() {
          var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

          babelHelpers.get(Object.getPrototypeOf(Text.prototype), 'dispose', this).call(this, dataKey);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.attr('type') === 'text') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'text\'.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Text($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Text;
    }(BaseFormControl);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Text._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Text;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Text._jQueryInterface;
    };

    return Text;
  }(jQuery);

  var Textarea = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'textarea';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Textarea = function (_BaseFormControl) {
      babelHelpers.inherits(Textarea, _BaseFormControl);

      function Textarea($element, config) {
        babelHelpers.classCallCheck(this, Textarea);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Textarea).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]},
        Default, config)));
      }

      babelHelpers.createClass(Textarea, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(Textarea.prototype), 'dispose', this).call(this, DATA_KEY);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.prop('tagName') === 'textarea') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for <textarea>.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Textarea($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Textarea;
    }(BaseFormControl);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Textarea._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Textarea;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Textarea._jQueryInterface;
    };

    return Textarea;
  }(jQuery);

  var BaseLayout = function ($) {

    var ClassName = {
      CANVAS: 'mdb-layout-canvas',
      CONTAINER: 'mdb-layout-container',
      BACKDROP: 'mdb-layout-backdrop'
    };

    var Selector = {
      CANVAS: '.' + ClassName.CANVAS,
      CONTAINER: '.' + ClassName.CONTAINER,
      BACKDROP: '.' + ClassName.BACKDROP
    };

    var Default = {
      canvas: {
        create: true,
        required: true,
        template: '<div class="' + ClassName.CANVAS + '"></div>'
      },
      backdrop: {
        create: true,
        required: true,
        template: '<div class="' + ClassName.BACKDROP + '"></div>'
      }
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseLayout = function (_Base) {
      babelHelpers.inherits(BaseLayout, _Base);

      function BaseLayout($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        babelHelpers.classCallCheck(this, BaseLayout);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BaseLayout).call(this, $element, $.extend(true, {}, Default, config), properties));

        _this.$container = _this.findContainer(true);
        _this.$backdrop = _this.resolveBackdrop();
        _this.resolveCanvas();
        return _this;
      }

      babelHelpers.createClass(BaseLayout, [{
        key: 'dispose',
        value: function dispose(dataKey) {
          babelHelpers.get(Object.getPrototypeOf(BaseLayout.prototype), 'dispose', this).call(this, dataKey);
          this.$container = null;
          this.$backdrop = null;
        }

        // ------------------------------------------------------------------------
        // protected

        // Will wrap container in mdb-layout-canvas if necessary

      }, {
        key: 'resolveCanvas',
        value: function resolveCanvas() {
          var bd = this.findCanvas(false);
          if (bd === undefined || bd.length === 0) {
            if (this.config.canvas.create) {
              this.$container.wrap(this.config.canvas.template);
            }

            bd = this.findCanvas(this.config.canvas.required);
          }

          return bd;
        }

        // Find closest mdb-layout-container based on the given context

      }, {
        key: 'findCanvas',
        value: function findCanvas() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
          var context = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

          var canvas = context.closest(Selector.CANVAS);
          if (canvas.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.CANVAS + ' for ' + Util.describe(context));
          }
          return canvas;
        }

        // Will add mdb-layout-backdrop to mdb-layout-container if necessary

      }, {
        key: 'resolveBackdrop',
        value: function resolveBackdrop() {
          var bd = this.findBackdrop(false);
          if (bd === undefined || bd.length === 0) {
            if (this.config.backdrop.create) {
              this.$container.append(this.config.backdrop.template);
            }

            bd = this.findBackdrop(this.config.backdrop.required);
          }

          return bd;
        }

        // Find closest mdb-layout-container based on the given context

      }, {
        key: 'findBackdrop',
        value: function findBackdrop() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
          var context = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

          var backdrop = context.find('> ' + Selector.BACKDROP);
          if (backdrop.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.BACKDROP + ' for ' + Util.describe(context));
          }
          return backdrop;
        }

        // Find closest mdb-layout-container based on the given context

      }, {
        key: 'findContainer',
        value: function findContainer() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
          var context = arguments.length <= 1 || arguments[1] === undefined ? this.$element : arguments[1];

          var container = context.closest(Selector.CONTAINER);
          if (container.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.CONTAINER + ' for ' + Util.describe(context));
          }
          return container;
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }]);
      return BaseLayout;
    }(Base);

    return BaseLayout;
  }(jQuery);

  var Drawer = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'drawer';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Keycodes = {
      ESCAPE: 27
      //ENTER: 13,
      //SPACE: 32
    };

    var ClassName = {
      IN: 'in',
      DRAWER_IN: 'mdb-drawer-in',
      DRAWER_OUT: 'mdb-drawer-out',
      DRAWER: 'mdb-layout-drawer',
      CONTAINER: 'mdb-layout-container'
    };

    var Default = {
      focusSelector: 'a, button, input'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Drawer = function (_BaseLayout) {
      babelHelpers.inherits(Drawer, _BaseLayout);


      // $element is expected to be the trigger
      //  i.e. <button class="btn mdb-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">

      function Drawer($element, config) {
        babelHelpers.classCallCheck(this, Drawer);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Drawer).call(this, $element, $.extend(true, {}, Default, config)));

        _this.$toggles = $('[data-toggle="drawer"][href="#' + _this.$element[0].id + '"], [data-toggle="drawer"][data-target="#' + _this.$element[0].id + '"]');

        _this._addAria();

        // click or escape on the backdrop closes the drawer
        _this.$backdrop.keydown(function (ev) {
          if (ev.which === Keycodes.ESCAPE) {
            _this.hide();
          }
        }).click(function () {
          _this.hide();
        });

        // escape on the drawer closes it
        _this.$element.keydown(function (ev) {
          if (ev.which === Keycodes.ESCAPE) {
            _this.hide();
          }
        });

        // any toggle button clicks
        _this.$toggles.click(function () {
          _this.toggle();
        });
        return _this;
      }

      babelHelpers.createClass(Drawer, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(Drawer.prototype), 'dispose', this).call(this, DATA_KEY);
          this.$toggles = null;
        }
      }, {
        key: 'toggle',
        value: function toggle() {
          if (this._isOpen()) {
            this.hide();
          } else {
            this.show();
          }
        }
      }, {
        key: 'show',
        value: function show() {
          if (this._isForcedClosed() || this._isOpen()) {
            return;
          }

          this.$toggles.attr('aria-expanded', true);
          this.$element.attr('aria-expanded', true);
          this.$element.attr('aria-hidden', false);

          // focus on the first focusable item
          var $focusOn = this.$element.find(this.config.focusSelector);
          if ($focusOn.length > 0) {
            $focusOn.first().focus();
          }

          this.$container.addClass(ClassName.DRAWER_IN);
          // backdrop is responsively styled based on mdb-drawer-overlay, therefore style is none of our concern, simply add the marker class and let the scss determine if it should be displayed or not.
          this.$backdrop.addClass(ClassName.IN);
        }
      }, {
        key: 'hide',
        value: function hide() {
          if (!this._isOpen()) {
            return;
          }

          this.$toggles.attr('aria-expanded', false);
          this.$element.attr('aria-expanded', false);
          this.$element.attr('aria-hidden', true);

          this.$container.removeClass(ClassName.DRAWER_IN);
          this.$backdrop.removeClass(ClassName.IN);
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_isOpen',
        value: function _isOpen() {
          return this.$container.hasClass(ClassName.DRAWER_IN);
        }
      }, {
        key: '_isForcedClosed',
        value: function _isForcedClosed() {
          return this.$container.hasClass(ClassName.DRAWER_OUT);
        }
      }, {
        key: '_addAria',
        value: function _addAria() {
          var isOpen = this._isOpen();
          this.$element.attr('aria-expanded', isOpen);
          this.$element.attr('aria-hidden', isOpen);

          if (this.$toggles.length) {
            this.$toggles.attr('aria-expanded', isOpen);
          }
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Drawer($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Drawer;
    }(BaseLayout);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Drawer._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Drawer;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Drawer._jQueryInterface;
    };

    return Drawer;
  }(jQuery);

  var Ripples = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'ripples';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var ClassName = {
      CONTAINER: 'ripple-container',
      DECORATOR: 'ripple-decorator'
    };

    var Selector = {
      CONTAINER: '.' + ClassName.CONTAINER,
      DECORATOR: '.' + ClassName.DECORATOR //,
    };

    var Default = {
      container: {
        template: '<div class=\'' + ClassName.CONTAINER + '\'></div>'
      },
      decorator: {
        template: '<div class=\'' + ClassName.DECORATOR + '\'></div>'
      },
      trigger: {
        start: 'mousedown touchstart',
        end: 'mouseup mouseleave touchend'
      },
      touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
      duration: 500
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Ripples = function () {
      function Ripples($element, config) {
        var _this = this;

        babelHelpers.classCallCheck(this, Ripples);

        this.$element = $element;

        //console.log(`Adding ripples to ${Util.describe(this.$element)}`)  // eslint-disable-line no-console
        this.config = $.extend(true, {}, Default, config);

        // attach initial listener
        this.$element.on(this.config.trigger.start, function (event) {
          _this._onStartRipple(event);
        });
      }

      babelHelpers.createClass(Ripples, [{
        key: 'dispose',
        value: function dispose() {
          $.removeData(this.$element, DATA_KEY);
          this.$element = null;
          this.$container = null;
          this.$decorator = null;
          this.config = null;
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_onStartRipple',
        value: function _onStartRipple(event) {
          var _this2 = this;

          // Verify if the user is just touching on a device and return if so
          if (this._isTouch() && event.type === 'mousedown') {
            return;
          }

          // Find or create the ripple container element
          this._findOrCreateContainer();

          // Get relY and relX positions of the container element
          var relY = this._getRelY(event);
          var relX = this._getRelX(event);

          // If relY and/or relX are false, return the event
          if (!relY && !relX) {
            return;
          }

          // set the location and color each time (even if element is cached)
          this.$decorator.css({
            left: relX,
            top: relY,
            'background-color': this._getRipplesColor()
          });

          // Make sure the ripple has the styles applied (ugly hack but it works)
          this._forceStyleApplication();

          // Turn on the ripple animation
          this.rippleOn();

          // Call the rippleEnd function when the transition 'on' ends
          setTimeout(function () {
            _this2.rippleEnd();
          }, this.config.duration);

          // Detect when the user leaves the element to cleanup if not already done?
          this.$element.on(this.config.trigger.end, function () {
            if (_this2.$decorator) {
              // guard against race condition/mouse attack
              _this2.$decorator.data('mousedown', 'off');

              if (_this2.$decorator.data('animating') === 'off') {
                _this2.rippleOut();
              }
            }
          });
        }
      }, {
        key: '_findOrCreateContainer',
        value: function _findOrCreateContainer() {
          if (!this.$container || !this.$container.length > 0) {
            this.$element.append(this.config.container.template);
            this.$container = this.$element.find(Selector.CONTAINER);
          }

          // always add the rippleElement, it is always removed
          this.$container.append(this.config.decorator.template);
          this.$decorator = this.$container.find(Selector.DECORATOR);
        }

        // Make sure the ripple has the styles applied (ugly hack but it works)

      }, {
        key: '_forceStyleApplication',
        value: function _forceStyleApplication() {
          return window.getComputedStyle(this.$decorator[0]).opacity;
        }

        /**
         * Get the relX
         */

      }, {
        key: '_getRelX',
        value: function _getRelX(event) {
          var wrapperOffset = this.$container.offset();

          var result = null;
          if (!this._isTouch()) {
            // Get the mouse position relative to the ripple wrapper
            result = event.pageX - wrapperOffset.left;
          } else {
            // Make sure the user is using only one finger and then get the touch
            //  position relative to the ripple wrapper
            event = event.originalEvent;

            if (event.touches.length === 1) {
              result = event.touches[0].pageX - wrapperOffset.left;
            } else {
              result = false;
            }
          }

          return result;
        }

        /**
         * Get the relY
         */

      }, {
        key: '_getRelY',
        value: function _getRelY(event) {
          var containerOffset = this.$container.offset();
          var result = null;

          if (!this._isTouch()) {
            /**
             * Get the mouse position relative to the ripple wrapper
             */
            result = event.pageY - containerOffset.top;
          } else {
            /**
             * Make sure the user is using only one finger and then get the touch
             * position relative to the ripple wrapper
             */
            event = event.originalEvent;

            if (event.touches.length === 1) {
              result = event.touches[0].pageY - containerOffset.top;
            } else {
              result = false;
            }
          }

          return result;
        }

        /**
         * Get the ripple color
         */

      }, {
        key: '_getRipplesColor',
        value: function _getRipplesColor() {
          var color = this.$element.data('ripple-color') ? this.$element.data('ripple-color') : window.getComputedStyle(this.$element[0]).color;
          return color;
        }

        /**
         * Verify if the client is using a mobile device
         */

      }, {
        key: '_isTouch',
        value: function _isTouch() {
          return this.config.touchUserAgentRegex.test(navigator.userAgent);
        }

        /**
         * End the animation of the ripple
         */

      }, {
        key: 'rippleEnd',
        value: function rippleEnd() {
          if (this.$decorator) {
            // guard against race condition/mouse attack
            this.$decorator.data('animating', 'off');

            if (this.$decorator.data('mousedown') === 'off') {
              this.rippleOut(this.$decorator);
            }
          }
        }

        /**
         * Turn off the ripple effect
         */

      }, {
        key: 'rippleOut',
        value: function rippleOut() {
          var _this3 = this;

          this.$decorator.off();

          if (Util.transitionEndSupported()) {
            this.$decorator.addClass('ripple-out');
          } else {
            this.$decorator.animate({ opacity: 0 }, 100, function () {
              _this3.$decorator.trigger('transitionend');
            });
          }

          this.$decorator.on(Util.transitionEndSelector(), function () {
            if (_this3.$decorator) {
              _this3.$decorator.remove();
              _this3.$decorator = null;
            }
          });
        }

        /**
         * Turn on the ripple effect
         */

      }, {
        key: 'rippleOn',
        value: function rippleOn() {
          var _this4 = this;

          var size = this._getNewSize();

          if (Util.transitionEndSupported()) {
            this.$decorator.css({
              '-ms-transform': 'scale(' + size + ')',
              '-moz-transform': 'scale(' + size + ')',
              '-webkit-transform': 'scale(' + size + ')',
              transform: 'scale(' + size + ')'
            }).addClass('ripple-on').data('animating', 'on').data('mousedown', 'on');
          } else {
            this.$decorator.animate({
              width: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
              height: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
              'margin-left': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
              'margin-top': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
              opacity: 0.2
            }, this.config.duration, function () {
              _this4.$decorator.trigger('transitionend');
            });
          }
        }

        /**
         * Get the new size based on the element height/width and the ripple width
         */

      }, {
        key: '_getNewSize',
        value: function _getNewSize() {
          return Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth() * 2.5;
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Ripples($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Ripples;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Ripples._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Ripples;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Ripples._jQueryInterface;
    };

    return Ripples;
  }(jQuery);

  var Autofill = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'autofill';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Autofill = function (_Base) {
      babelHelpers.inherits(Autofill, _Base);

      function Autofill($element, config) {
        babelHelpers.classCallCheck(this, Autofill);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Autofill).call(this, $element, $.extend(true, {}, Default, config)));

        _this._watchLoading();
        _this._attachEventHandlers();
        return _this;
      }

      babelHelpers.createClass(Autofill, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(Autofill.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_watchLoading',
        value: function _watchLoading() {
          var _this2 = this;

          // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
          setTimeout(function () {
            clearInterval(_this2._onLoading);
          }, 10000);
        }

        // This part of code will detect autofill when the page is loading (username and password inputs for example)

      }, {
        key: '_onLoading',
        value: function _onLoading() {
          setInterval(function () {
            $('input[type!=checkbox]').each(function (index, element) {
              var $element = $(element);
              if ($element.val() && $element.val() !== $element.attr('value')) {
                $element.trigger('change');
              }
            });
          }, 100);
        }
      }, {
        key: '_attachEventHandlers',
        value: function _attachEventHandlers() {
          // Listen on inputs of the focused form
          //  (because user can select from the autofill dropdown only when the input has focus)
          var focused = null;
          $(document).on('focus', 'input', function (event) {
            var $inputs = $(event.currentTarget).closest('form').find('input').not('[type=file]');
            focused = setInterval(function () {
              $inputs.each(function (index, element) {
                var $element = $(element);
                if ($element.val() !== $element.attr('value')) {
                  $element.trigger('change');
                }
              });
            }, 100);
          }).on('blur', '.form-group input', function () {
            clearInterval(focused);
          });
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Autofill($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Autofill;
    }(Base);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Autofill._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Autofill;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Autofill._jQueryInterface;
    };

    return Autofill;
  }(jQuery);

  /**
   * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
   *  used in Material Design for Bootstrap.  You may pass overrides to the configurations
   *  which will be passed into each component, or you may omit use of this class and
   *  configure each component separately.
   */
  var BootstrapMaterialDesign = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'bootstrapMaterialDesign';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = NAME; // retain this full name since it is long enough not to conflict
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    /**
     * Global configuration:
     *  The global configuration hash will be mixed in to each components' config.
     *    e.g. calling $.bootstrapMaterialDesign({global: { validate: true } }) would pass `validate:true` to every component
     *
     *
     * Component configuration:
     *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
     *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
     *
     *  @see each individual component for more configuration settings.
     */
    var Default = {
      global: {
        validate: false,
        label: {
          className: 'mdb-label-static' // default style of label to be used if not specified in the html markup
        }
      },
      autofill: {
        selector: 'body'
      },
      checkbox: {
        selector: '.checkbox > label > input[type=checkbox]'
      },
      checkboxInline: {
        selector: 'label.checkbox-inline > input[type=checkbox]'
      },
      collapseInline: {
        selector: '.mdb-collapse-inline [data-toggle="collapse"]'
      },
      drawer: {
        selector: '.mdb-layout-drawer'
      },
      file: {
        selector: 'input[type=file]'
      },
      radio: {
        selector: '.radio > label > input[type=radio]'
      },
      radioInline: {
        selector: 'label.radio-inline > input[type=radio]'
      },
      ripples: {
        //selector: ['.btn:not(.btn-link):not(.ripple-none)'] // testing only
        selector: ['.btn:not(.btn-link):not(.ripple-none)', '.card-image:not(.ripple-none)', '.navbar a:not(.ripple-none)', '.dropdown-menu a:not(.ripple-none)', '.nav-tabs a:not(.ripple-none)', '.pagination li:not(.active):not(.disabled) a:not(.ripple-none)', '.ripple' // generic marker class to add ripple to elements
        ]
      },
      select: {
        selector: ['select']
      },
      switch: {
        selector: '.switch > label > input[type=checkbox]'
      },
      text: {
        // omit inputs we have specialized components to handle - we need to match text, email, etc.  The easiest way to do this appears to be just omit the ones we don't want to match and let the rest fall through to this.
        selector: ['input[type!=\'hidden\'][type!=\'checkbox\'][type!=\'radio\'][type!=\'file\'][type!=\'button\'][type!=\'submit\'][type!=\'reset\']']
      },
      textarea: {
        selector: ['textarea']
      },
      arrive: true,
      // create an ordered component list for instantiation
      instantiation: ['ripples', 'checkbox', 'checkboxInline', 'collapseInline', 'drawer',
      //'file',
      'radio', 'radioInline', 'switch', 'text', 'textarea', 'select', 'autofill']
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BootstrapMaterialDesign = function () {
      function BootstrapMaterialDesign($element, config) {
        var _this = this;

        babelHelpers.classCallCheck(this, BootstrapMaterialDesign);

        this.$element = $element;
        this.config = $.extend(true, {}, Default, config);
        var $document = $(document);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var component = _step.value;


            // the component's config fragment is passed in directly, allowing users to override
            var componentConfig = _this.config[component];

            // check to make sure component config is enabled (not `false`)
            if (componentConfig) {
              (function () {

                // assemble the selector as it may be an array
                var selector = _this._resolveSelector(componentConfig);

                // mix in global options
                componentConfig = $.extend(true, {}, _this.config.global, componentConfig);

                // create the jquery fn name e.g. 'mdbText' for 'text'
                var componentName = '' + (component.charAt(0).toUpperCase() + component.slice(1));
                var jqueryFn = 'mdb' + componentName;

                try {
                  // safely instantiate component on selector elements with config, report errors and move on.
                  // console.debug(`instantiating: $('${selector}')[${jqueryFn}](${componentConfig})`) // eslint-disable-line no-console
                  $(selector)[jqueryFn](componentConfig);

                  // add to arrive if present and enabled
                  if (document.arrive && _this.config.arrive) {
                    $document.arrive(selector, function (element) {
                      // eslint-disable-line no-loop-func
                      $(element)[jqueryFn](componentConfig);
                    });
                  }
                } catch (e) {
                  var message = 'Failed to instantiate component: $(\'' + selector + '\')[' + jqueryFn + '](' + componentConfig + ')';
                  console.error(message, e, '\nSelected elements: ', $(selector)); // eslint-disable-line no-console
                  throw e;
                }
              })();
            }
          };

          for (var _iterator = this.config.instantiation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      babelHelpers.createClass(BootstrapMaterialDesign, [{
        key: 'dispose',
        value: function dispose() {
          $.removeData(this.$element, DATA_KEY);
          this.$element = null;
          this.config = null;
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_resolveSelector',
        value: function _resolveSelector(componentConfig) {
          var selector = componentConfig.selector;
          if (Array.isArray(selector)) {
            selector = selector.join(', ');
          }

          return selector;
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new BootstrapMaterialDesign($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return BootstrapMaterialDesign;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = BootstrapMaterialDesign._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = BootstrapMaterialDesign;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return BootstrapMaterialDesign._jQueryInterface;
    };

    return BootstrapMaterialDesign;
  }(jQuery);

}));
//# sourceMappingURL=bootstrap-material-design.umd.js.map