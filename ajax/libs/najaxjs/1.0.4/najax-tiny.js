/*!
 * najaxjs tiny ver 1.0.4 - najax-tiny.js
 * (c) any-js - https://github.com/any-js/najaxjs/
 * Released under the MIT license
 */
var $najax = {};

(function(njx) {
'use strict';

/**
 * Assoc object.
 * @typedef {object<string, *>} assoc
 * @example
 {
 a: 1,
 b: '2',
 c: {c1: 1, c2: 2}
}
 */

/**
 * Functions object.
 * @typedef {object<string, function>} functions
 * @example
 {
 a: function(v){ },
 b: function(v){ }
}
 */

/**
 * Class expression.
 * @typedef {Object} Class
 * @example
 - Class object
 */

/**
 * @ignore
 */
function args(vs){
	var r = [];

	for (var i=0;i<vs.length;i++){
		r.push(vs[i]);
	}

	return r;
}

/**
 * @ignore
 */
function ext(v, s, deep){
	if(!s){
		return v;
	}

	for (var k in s){
		if (s.hasOwnProperty(k)){
			if (deep && s[k] instanceof Object && s[k].constructor === Object){
				if (v[k] == null){
					v[k] = {};
				}
				v[k] = ext(v[k], s[k], deep);
			}else{
				v[k] = s[k];
			}
		}
	}

	return v;
}

/**
 * @ignore
 */
function extVs(s, w, v){
	if (typeof w === 'object'){
		ext(s, w, true);
	}else{
		s[w] = v;
	}
}

/**
 * @ignore
 */
function bind(c, fn){
	try{
		return fn.bind(c);
	} catch (e){

	}

	return function(){
		return fn.apply(c, arguments);
	};
}

/**
 * @ignore
 */
function clear(c){
	for (var k in c){
		if (c.hasOwnProperty(k)){
			delete c[k];
		}else{
			c[k] = null;
		}
	}
}

/**
 * @ignore
 */
function none(){

}

/**
 * $najax defines.
 * @namespace $najax.define
 */
njx.define = {};

/**
 * Info mode.
 *
 * <b>Value defines</b><br>
 *
 * | Value | Description |
 * |:---|:---|
 * | <code>0</code> | none |
 * | <code>1</code> | info |
 * | <code>2</code> | info+trace |
 *
 * @name info
 * @memberof $najax.define
 *
 * @type {number}
 * @default 0
 *
 * @example
 * $najax.define.info = 1;
 */
njx.define.info = 0;		//0:none, 1:info, 2:info+trace

/**
 * Error mode.
 *
 * <b>Value defines</b><br>
 *
 * | Value | Description |
 * |:---|:---|
 * | <code>0</code> | none |
 * | <code>1</code> | error |
 * | <code>2</code> | error+trace |
 *
 * @name error
 * @memberof $najax.define
 * @type {number}
 * @default 1
 *
 * @example
 * $najax.define.error = 2;
 */
njx.define.error = 1;		//0:none, 1:error, 2:error+trace

/**
 * @ignore
 */
function info(){
	if ($najax.define.info <= 0){
		return;
	}

	console.info.apply(console, arguments);

	if ($najax.define.info == 2){
		console.trace();
	}
}

/**
 * @ignore
 */
function error(){
	if ($najax.define.error <= 0){
		return;
	}

	console.error.apply(console, arguments);

	if ($najax.define.error == 2){
		console.trace();
	}
}

/**
 * Identifier for disabling cache. Used by $najax.request and other various methods.
 * @name utms
 * @memberof $najax.define
 *
 * @type {string}
 * @default '__utms'
 */
njx.define.utms = '__utms';

/**
 * Default relay-data mode. It's possible to take out value by <i>Relay</i> object. Specify by 'Bitwise OR' value.
 *
 * <b>Value defines</b><br>
 *
 * | Value | Description |
 * |:---|:---|
 * | <code>1</code> | Args of <i>complete</i> function. Response value and XHR object. <code>rl.value()</code> <code>rl.get()</code> |
 * | <code>2</code> | Original data. User original data, etc. |
 * | <code>4</code> | Raw data. Ajax raw response. <code>rl.data('_raw')</code> |
 *
 * @name relaymode
 * @memberof $najax.define
 *
 * @type {number}
 * @default 3 (args + original data)
 *
 * @example
 * $najax.define.relaymode = 1;		//args.
 * $najax.define.relaymode = 3;		//args + original data.
 * $najax.define.relaymode = 6;		//original data and raw data.
 */
njx.define.relaymode = 3;		//1: args, 2: original data, 4: raw data

/**
 * Alert method for connection error.
 * @name failAlert
 * @memberof $najax.define
 *
 * @example
 * $najax.request(url).fail($najax.define.failAlert).done();
 */
njx.define.failAlert = function(){
	alert(njx.define.msg[1]);
};

/**
 * @ignore
 */
function attr(c, w, v){
	c.setAttribute(w ,v);
}

/**
 * @ignore
 */
function isEmp(vs){
	if (!vs){
		return true;
	}

	for (var k in vs){
		if (vs.hasOwnProperty(k)){
			return false;
		}
	}

	return true;
}

/**
 * Relay / <i>Linker</i> class. It's possible to operate response-data and behaviors after completed.
 * Provide 'Data-relay' and 'Abort', 'Bundle multiple <i>Relay</i> object by <i>Linker</i>'.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | Yes |
 *
 * @namespace $najax@rlk
 *
 * @tutorial relaylinker
 * @tutorial rlk-standalone
 *
 * @see Relay
 * @see Linker
 *
 * @example
 * var rl1 = $najax.request.done();	//Relay object.
 * var rl2 = $najax.post.done();	//Relay object.
 * $rlk.linker(rl1, r2).done(function(){ ... });
 *
 * var rl1 = new ($najax.RelayClass());
 * $najax.linker(rl, r2).success(function{ ... }).done();
 *
 * var rl1 = new ($rlk.RelayClass());
 * $rlk.linker(rl, r2).success(function{ ... }).done();
 *
 * var rl12 = $rlk.linker(rl1, r2).done();
 * $rlk.linker(rl3, rl12).done(function(){ ... });
 */

/**
 * <i>Relay</i> class. Provide 'Data-relay' and 'Abort', 'Bundle multiple <i>Relay</i> object by <i>Linker</i>'.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | Yes |
 *
 * @class Relay
 *
 * @see Linker
 *
 * @tutorial relaylinker
 * @tutorial rlk-standalone
 *
 * @example
 * Relay = $najax.relayClass();
 * Relay = $rlk.relayClass();	//standalone
 */
var Relay = function(){
	this._state = 0;
	this._active = 0;

	this._args = [];
	this._data = null;

	this._linker = null;
	this._abort = null;
};

/**
 * Initialize values and state.
 * @function
 * @name init
 * @memberof Relay
 * @instance
 *
 * @returns {Relay}
 *
 * @example
 * rl.init();
 */
Relay.prototype.init = function(){
	this._state = 0;
	this._active = 0;
	this._args = [];
	this._data = null;

	return this;
};

/**
 * Set state and passed args.
 *
 * <b>State value type</b>
 *
 * | Value | Description |
 * |:---|:---|
 * | <code>1</code> | Success |
 * | <code>-1</code> | Fail |
 * | <code>-2</code> | Abort |
 *
 * @function
 * @name setState
 * @memberof Relay
 * @instance
 *
 * @param {number} [state=null] State.
 * @param {assoc} [vs=null] Argument values.
 * @returns {Relay}
 *
 * @example
 * rl.setState(1);           //Success
 * rl.setState(-1);         //Fail
 * rl.setState(-2);         //Abort
 * rl.setState(null, ags); //Set args.
 */
Relay.prototype.setState = function(state, vs){
	if (state != null && this._state != -2){
		this._state = state;
	}

	if (vs && vs.length > 0){
		this._args = vs;
	}

	return this;
};

/**
 * Notify success with args.
 *
 * @function
 * @name notifySuccess
 * @memberof Relay
 * @instance
 *
 * @param {...*} [v] Passed argument values.
 * @returns {Relay}
 *
 * @see Relay#notifyFail
 *
 * @example
 * rl.notifySuccess();
 * rl.notifySuccess(true, e);
 */
Relay.prototype.notifySuccess = function(){
	this.setState(1, args(arguments));

	rlTrg(this);

	return this;
};

/**
 * Notify fail with args.
 *
 * @function
 * @name notifyFail
 * @memberof Relay
 * @instance
 *
 * @param {...*} [v] Passed argument values.
 * @returns {Relay}
 *
 * @see Relay#notifySuccess
 *
 * @example
 * rl.notifyFail();
 * rl.notifyFail(false, e);
 */
Relay.prototype.notifyFail = function(){
	this.setState(-1, args(arguments));

	rlTrg(this);

	return this;
};

/**
 * Set abort function. It runs when calling <i>abort</i>.
 *
 * @function
 * @name abortCaller
 * @memberof Relay
 * @instance
 *
 * @param {function} [fn] Function.
 * @returns {Relay}
 *
 * @see Relay#abort
 *
 * @example
 * rl.abortCaller(fn);
 */
Relay.prototype.abortCaller = function(fn){
	this._abort = fn;
};

/**
 * Get argument value or values.
 *
 * @function
 * @name get
 * @memberof Relay
 * @instance
 *
 * @param {number} [i=null] Index. If null, all values.
 * @returns {*} Value.
 *
 * @example
 * v = rl.get(0);
 * v = rl.get(1);
 * vs = rl.get();
 */
Relay.prototype.get = function(i){
	if (i === undefined){
		return this._args;
	}

	return this._args[i];
};

/**
 * Get value of first argument.
 *
 * @function
 * @name value
 * @memberof Relay
 * @instance
 *
 * @returns {*} Value.
 *
 * @example
 * v = rl.get(0);
 * vs = rl.get();
 */
Relay.prototype.value = function(){
	return this._args[0];
};

/**
 * Get and set original data. See example for detail.
 *
 * @function
 * @name data
 * @memberof Relay
 * @instance
 *
 * @param {string|assoc|null} [w] Name or assoc.
 * @param {*} [v] Value.
 * @returns {*|assoc|void}
 *
 * @example
 * //Get
 * all = rl.data();    //All values.
 * v = rl.data('a');  //Specify name.
 *
 * //Set
 * rl.data('a', 1);     //By simple value.
 * rl.data({'a': 1}); //By assoc.
 */
Relay.prototype.data = function(w, v){
	if (w === undefined){
		return this._data;
	}else if (typeof w !== 'object' && v === undefined){
		return this._data[w];
	}

	if (this._data === null){
		this._data = {};
	}

	extVs(this._data, w, v);
};

/**
 * Get state.
 *
 * @function
 * @name state
 * @memberof Relay
 * @instance
 *
 * @returns {number} State.
 *
 * @example
 * v = rl.state();
 */
Relay.prototype.state = function(){
	return this._state;
};

/**
 * Is active.
 *
 * @function
 * @name isActive
 * @memberof Relay
 * @instance
 *
 * @returns {boolean} Is active.
 *
 * @example
 * v = rl.isActive();
 */
Relay.prototype.isActive = function(){
	return this._active;
};

/**
 * Call abort.
 * @function
 * @name abort
 * @memberof Relay
 * @instance
 *
 * @returns {Relay}
 *
 * @see Relay#abortCaller
 *
 * @example
 * rl.abort(fn);
 */
Relay.prototype.abort = function(){
	this._state = -2;

	if (this._abort){
		this._abort(this);
	}

	this.notifyFail();

	return this;
};

/**
 * Clear all values and related Relay object.
 * @function
 * @name clear
 * @memberof Relay
 * @instance
 *
 * @example
 * rl.clear();
 */
Relay.prototype.clear = function(){
	var v;

	for (var i=0;i<this._args.length;i++){
		v = this._args[i];
		if (v instanceof Relay && v.clear){
			v.clear();
		}
	}

	clear(this);
};

/**
 * Get related linker.
 * @function
 * @name linker
 * @memberof Relay
 * @instance
 *
 * @returns {Linker} Related <i>Linker</i> object.
 *
 * @example
 * linker = rl.linker();
 */
Relay.prototype.linker = function(){
	return this._linker;
};

function rlRsp(rls, type){
	var r = [], i;

	if (typeof type !== 'function'){
		switch(type){
		case 'first':
			r = rls[0].get();
			break;
		case 'value':
			for(i = 0; i < rls.length; i++){
				r.push(rls[i].get(0));
			}
			break;
		case 'data':
			for(i = 0; i < rls.length; i++){
				r.push(rls[i].data());
			}
			break;
		case 'relay':
		default:
			return rls;
			break;
		}
	}else{
		for (i=0;i<rls.length;i++){
			r.push(type(rls[i]));
		}
	}

	return r;
}

function rlPrp(lk){
	var rl, i;

	if (lk._rls[lk._rls.length - 1] === true){
		lk._rls.pop();
		lk.init();
	}

	for (i=0;i<lk._rls.length;i++){
		rl = lk._rls[i];

		if (rl._active != 0){
			console.error('cancel linker, used object.', rl);
			return;
		}
	}

	for (i=0;i<lk._rls.length;i++){
		rl = lk._rls[i];

		rl._active = 1;
		rl._linker = lk;
	}
}

function rlTrg(rl){
	var lk = rl.linker();

	if (rl._active == 1){
		rl._active = 2;
	}else{
		return;
	}

	var r = true, i;

	for (i=0;i<lk._rls.length;i++){
		switch(lk._rls[i]._state){
		case 0:
			return;
			break;
		case -1:
		case -2:
			r = false;
			break;
		default:
			break;
		}
	}

	var vs = rlRsp(lk._rls, lk._argument);

	if (r){
		if (lk._sccs){
			lk._sccs.apply(lk, vs);
		}

		if (lk._relay && lk._relay._linker){
			lk._relay.notifySuccess.apply(lk._relay, lk._rls);
		}
	}else{
		if (lk._fail){
			lk._fail.apply(lk, vs);
		}

		if (lk._relay && lk._relay._linker){
			lk._relay.notifyFail.apply(lk._relay, lk._rls);
		}
	}

	if (lk._cmpl){
		lk._cmpl.apply(lk, vs);
	}

	if (lk._rls){
		for (i = 0; i < lk._rls.length; i++){
			lk._rls[i]._linker = null;
			lk._rls[i]._abort = null;
		}
	}
}

/**
 * <i>Linker</i> class. Provide 'data relay' and 'abort', 'bundle multiple relay object by <i>Linker</i>'. <i>Linker</i> bundle <i>Relay</i>.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | Yes |
 *
 * @class Linker
 *
 * @see Relay
 *
 * @tutorial relaylinker
 * @tutorial rlk-standalone
 *
 * @example
 * Linker = $najax.linkerClass();
 * Linker = $rlk.linkerClass();	//standalone
 */
var Linker = function(rls){
	this._rls = args(rls);

	this._argument = 'relay';
	this._sccs = null;
	this._fail = null;
	this._cmpl = null;
	this._lock = false;

	this._relay = null;

	rlPrp(this);
};

/**
 * Initialize all <i>Relay</i> objects.
 * @function
 * @name init
 * @memberof Linker
 * @instance
 *
 * @returns {Linker}
 *
 * @example
 * linker.init();
 */
Linker.prototype.init = function(){
	if (this._lock){
		console.error('not available');
		return;
	}

	for (var i=0;i<this._rls.length;i++){
		this._rls[i].init();
	}

	return this;
};

/**
 * Set argument type.
 *
 * <b>Argument types</b><br>
 * <code>first</code> First relay's arguments.<br>
 * <code>value</code> Value of first argument.<br>
 * <code>data</code> Original data.<br>
 * <code>relay(default)</code> Relay object.<br>
 *
 * @function
 * @name argument
 * @memberof Linker
 * @instance
 *
 * @param {string} type Argument type.
 * @returns {Linker}
 *
 * @example
 * linker.argument('value').done(function(v1, v2){ ... });
 * linker.argument('first').done(function(v, x, y){ ... });
 * linker.argument('data').done(function(data1, dat2){ ... });
 * linker.argument('relay').done(function(rl1, rl2){ ... });  //default
 *
 * $najax.linker(rl).argument('value').done(function(v1){ ... });
 * rlk.linker(rl).argument('value').done(function(v1){ ... });
 */
Linker.prototype.argument = function(type){
	if (this._lock){
		console.error('not available');
		return;
	}

	this._argument = type;

	return this;
};

/**
 * Set success function.
 *
 * @function
 * @name success
 * @memberof Linker
 * @instance
 *
 * @param {function} fn Success function.
 * @returns {Linker}
 *
 * @see Linker#fail
 * @see Linker#complete
 * @see Linker#done
 *
 * @example
 * linker.success(fn);
 */
Linker.prototype.success = function(fn){
	this._sccs = fn;
	return this;
};

/**
 * Set fail function.
 *
 * @function
 * @name fail
 * @memberof Linker
 * @instance
 *
 * @param {function} fn Fail function.
 * @returns {Linker}
 *
 * @see Linker#success
 * @see Linker#complete
 * @see Linker#done
 *
 * @example
 * linker.fail(fn);
 */
Linker.prototype.fail = function(fn){
	this._fail = fn;
	return this;
};

/**
 * Set complete function.
 *
 * @function
 * @name complete
 * @memberof Linker
 * @instance
 *
 * @param {function} fn Complete function.
 * @returns {Linker}
 *
 * @see Linker#success
 * @see Linker#fail
 * @see Linker#done
 *
 * @example
 * linker.complete(fn);
 */
Linker.prototype.complete = function(fn){
	this._cmpl = fn;
	return this;
};

/**
 * Set function and return <i>Relay</i> object.
 *
 * @function
 * @name done
 * @memberof Linker
 * @instance
 *
 * @param {function} [success] Success function.
 * @param {function} [fail] Fail function.
 * @param {function} [complete] Complete function.
 * @returns {Relay} Relay object.
 *
 * @see Linker#success
 * @see Linker#fail
 * @see Linker#complete
 *
 * @example
 * linker.done();
 * linker.done(success);
 * linker.done(success, fail ,complete);
 */
Linker.prototype.done = function(success, fail, complete){
	if (success){
		this._sccs = success;
	}

	if (fail){
		this._fail = fail;
	}

	if (complete){
		this._cmpl = complete;
	}

	this._relay = new Relay();

	return this._relay;
};

/**
 * Clear all <i>Relay</i> objects and clear values.
 *
 * @function
 * @name clear
 * @memberof Linker
 * @instance
 *
 * @example
 * linker.clear();
 */
Linker.prototype.clear = function(){
	for (var i=0;i<this._rls.length;i++){
		if (this._rls[i].clear){
			this._rls[i].clear();
		}
	}

	clear(this);
};

/**
 * Abort all <i>Relay</i> objects.
 *
 * @function
 * @name abort
 * @memberof Linker
 * @instance
 *
 * @returns {Linker}
 *
 * @example
 * linker.abort();
 */
Linker.prototype.abort = function(){
	for (var i=0;i<this._rls.length;i++){
		this._rls[i].abort();
	}

	return this;
};

/**
 * Lock.
 *
 * @function
 * @name lock
 * @memberof Linker
 * @instance
 * @returns {Linker}
 *
 * @example
 * linker.lock();
 */
Linker.prototype.lock = function(){
	this._lock = true;
	return this;
};

/**
 * Bundle <i>Relay</i> object. And providing result methods.
 *
 * @function
 * @name linker
 * @function linker
 * @memberof $najax@rlk
 *
 * @param {...Relay} [rl] Relay object.
 *
 * @returns {Linker} <i>Linker</i> object.
 *
 * @see Relay
 * @see Linker
 *
 * @tutorial relaylinker
 * @tutorial rlk-standalone
 *
 * @example
 * $najax.linker(rl).success(function(){ ... });
 * $najax.linker(rl).success(function{ ... }).fail(function{ ... }).done(function(){ ... });
 * $najax.linker(rl).done(function(){ ... });
 * $najax.linker(rl1, rl2, rl3).done(function(r1, r2, r3){ ... });
 * $najax.linker(rl1, rl2, rl3).argument('value').done(function(v1, v2, v3){ ... });
 * $najax.linker(rl1).argument('first').done(function(v, obj, type){ ... });
 * var linker = $najax.linker(rl).done();linker.clear();
 *
 * $rlk.linker(rl1, rl2, rl3);	//standalone
 */
njx.linker = function(){
	return new Linker(arguments);
};

/**
 * Return <i>Relay</i> class.
 *
 * @function RelayClass
 * @memberof $najax@rlk
 *
 * @returns {Linker} <i>Linker</i> class.
 *
 * @see Relay
 * @see Linker
 *
 * @tutorial relaylinker
 * @tutorial rlk-standalone
 *
 * @example
 * Relay = $najax.relayClass();
 * Relay = $rlk.relayClass();	//standalone
 */
njx.RelayClass = function(){
	return Relay;
};

/**
 * Return <i>Linker</i> class.
 *
 * @function LinkerClass
 * @memberof $najax@rlk
 *
 * @returns {Linker} <i>Linker</i> class.
 *
 * @see Relay
 * @see Linker
 *
 * @tutorial relaylinker
 * @tutorial rlk-standalone
 *
 * @example
 * Linker = $najax.linkerClass();
 * Linker = $rlk.linkerClass();	//standalone
 */
njx.LinkerClass = function(){
	return Linker;
};

/* global ActiveXObject: false */

/**
 * @ignore
 */
var Bx = {
	__basic: function(url, vs, type){
		this._url = url;

		if (vs){
			this._vs = vs;
		}

		if (type){
			this._o.type = type;
		}

		return this;
	},
	type: function(type){
		this._o.type = type || '';
		return this;
	},
	url: function(url){
		this._url = url;
		return this;
	},
	param: function(w, v){
		if (!this._vs){
			this._vs = {};
		}

		extVs(this._vs, w, v);

		return this;
	},
	cache: function(on){
		this._o.cache = on;
		return this;
	},
	retry: function(n){
		this._o.retry = n;
		return this;
	},
	success: function(fn){
		this._sccs = fn;
		return this;
	},
	fail: function(fn){
		this._fail = fn;
		return this;
	},
	begin: function(fn){
		if (!this.__exist('begin', '_begin')){
			this._begin = fn;
		}
		return this;
	},
	running: function(fn){
		if (!this.__exist('running', '_running')){
			this._running = fn;
		}
		return this;
	},
	complete: function(fn){
		if (!this.__exist('complete', '_cmpl')){
			this._cmpl = fn;
		}
		return this;
	},
	jsonp: function(callback, name){
		this._o.type = 'jsonp';

		if (callback){
			if (typeof callback === 'function'){
				callback = callback.name;
			}

			this._o.jsonp.callback = callback;
		}

		if (name){
			this._o.jsonp.name = name;
		}

		return this;
	},
	clean: function(on){
		this._o.clean = on;
		return this;
	},
	relay: function(w, v){
		if (!this._relaydata){
			this._relaydata = {};
		}

		this._o.relaymode = this._o.relaymode | 2;

		extVs(this._relaydata, w, v);

		return this;
	},
	opt: function(w, v){
		extVs(this._o, w, v);

		return this;
	},
	__set: function(n, v){
		this[n] = v;

		return this;
	},
	__done: function(sc, fl, cmp){
		if (sc){
			this._sccs = sc;
		}

		if (fl){
			this._fail = fl;
		}

		if (cmp){
			this._cmpl = cmp;
		}
	},
	__exist: function(n, f){
		if (this[f] != null){
			error('already exist. (' + n + ')');
			return true;
		}

		return false;
	},
	__start: function(rl, vs){
		if (this.__before){
			this.__before.apply(rl, vs);
		}

		if (this._begin){
			this._begin.apply(rl, vs);
		}

		if (this._running){
			this._running.call(rl, true);
		}
	},
	__end: function(rl, vs, r){
		var t;

		if (this._cmpl){
			t = this._cmpl.apply(rl, vs);
		}

		if (this.__after){
			vs.push((t !== undefined)?t:r);

			this.__after.apply(rl, vs);
		}

		if (this._running){
			this._running.call(rl, false);
		}
	}
};

function argPss(bx, vs){
	return (bx._o.relaymode & 1)?vs:[];
}

function preRl(bx, rl){
	rl.abortCaller(bind(bx, bx.abort));

	if (bx._relaydata && bx._o.relaymode & 2){
		rl.data(bx._relaydata);
	}
}

/**
 * Nx class. This class is created automatically by $najax various method.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | Yes |
 *
 * <b>Specification</b><br>
 * - Specify ajax request and response behaviors by <code>Nx object</code>.
 * - Specify by Nx object's various method or <code>Nx <i>opt</i></code> method.
 * - Begin ajax connection by <code>Nx <i>done</i></code>.
 * - <code>Nx <i>done</i></code> returns <code>Relay object</code>.
 * - <code>Relay</code> provide operating response-data, and bundling multiple <code>Relay</code>.
 * - <code>Nx</code> implement ajax by using <i>XMLHttpRequest</i>.
 *
 * @class Nx
 *
 * @param {assoc} [opt: Nx options.
 * @param {string} [opt.method='GET'] Method. GET / POST
 * @param {string} [opt.type='json'] Response type.
 * @param {boolean} [opt.async=true] Enable async.
 * @param {boolean} [opt.cache=false] Enable cache.
 * @param {number} [opt.retry=null] Retry number.
 * @param {number} [opt.timeout=null] Timeout ms.
 * @param {function} [opt.filter=null] Response value filter.
 * @param {string} [opt.contentType='application/x-www-form-urlencoded'] Method POST option. It's possbile to specify <i>content-type</i>.
 * @param {string} [opt.mime=null] Mime by XHR.
 * @param {assoc} [opt.headers={}] HTTP Headers.
 * @param {string} [opt.token='X-CSRF-Token'] HTTP Header of CSRF token.
 * @param {boolean} [opt.noescape=false] If true, not escape parameters. Apply to GET or POST parameters.
 * @param {assoc} [opt.jsonp] Jsonp option.
 * @param {string|function} [opt.jsonp.callback=''] Jsonp callback function.
 * @param {string} [opt.jsonp.name='callback'] Jsonp callback variable name.
 * @param {string|Element} [opt.element='div'] Type html option. Root element or element tag name.
 * @param {boolean} [opt.iseval=true] Type script option. Determine to use <i>eval</i>. if false, use <i>function</i>.
 * @param {string} [opt.separator=','] Type csv option. Separator.
 * @param {assoc} [opt.auth] Auth option.
 * @param {string} [opt.auth.user=null] User name.
 * @param {string} [opt.auth.pw=null] Password.
 * @param {number} [opt.relaymode=$najax.define.relaymode] Data relaymode. See $najax.define.relaymode for detail.
 * @param {boolean} [opt.clean=true] Clear object's values after completed.
 *
 * @see $najax.request
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).done();
 * $najax.post(url).param(vs).done();
 * $najax.raw(url).done(function(){ ... });
 * $najax.script(url).success(function(){ ... }).done(function(){ ... });
 *
 * var rl = $najax.html(url).done();
 */
var Nx = function(opt){
	this._url = null;
	this._vs = null;
	this._relaydata = null;

	this._o = ext({
		method: 'GET',
		type: 'json',
		async: true,
		cache: false,
		retry: null,
		timeout: null,
		filter: null,
		contentType: 'application/x-www-form-urlencoded',
		mime: null,
		headers: {},
		token: 'X-CSRF-Token',
		noescape: false,
		jsonp: {callback: '', name: 'callback'},
		element: 'div',
		iseval: true,
		separator: ',',
		auth: {user: null, pw: null},
		relaymode: njx.define.relaymode,
		clean: true
	}, opt);

	this._upload = null;
	this._download = null;
	this._token = null;

	this._begin = null;
	this._running = null;
	this._sccs = null;
	this._fail = null;
	this._cmpl = null;

	this.__url = null;
	this.__retry = 0;
	this.__before = null;
	this.__after = null;

	this.__xhr = null;
	this.__type = 'text';

	this.__rsp = null;
};

/**
 * Set method. GET / POST
 *
 * <b>Method</b><br>
 *
 * | Method | Description | Related method or option |
 * | <code>GET(*)</code> | Http GET. | Nx.param<br>opt.noescape |
 * | <code>POST</code> | Http POST. | Nx.param<br>opt.noescape<br>opt.contentType |
 *
 * @memberof Nx
 * @instance
 *
 * @param {string} method Method. GET / POST
 * @returns {Nx}
 *
 * @default 'GET'
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).method('get').done();
 * $najax.request(url).method('post').done();
 */
Nx.prototype.method = function(method){
	this._o.method = method;
	return this;
};

/**
 * Set response type.
 *
 * <b>Response type</b><br>
 *
 * | Type | Description | Value type | Related method or option |
 * |:---|:---|:---|:---|
 * | <code>json(*)</code> | Json. | assoc |  |
 * | <code>raw</code> | Raw data. | string |  |
 * | <code>text</code> | Text. <i>text</i> is same as <i>raw</i>. | string |  |
 * | <code>html</code> | HTML. | Element | opt.element |
 * | <code>script</code> | Execute script. | null | opt.iseval |
 * | <code>func</code> | Function. | function |  |
 * | <code>jsonp</code> | Jsonp. | null | Nx.jsonp  |
 * | <code>csv</code> | Csv(Tsv). | array | opt.separator |
 * | <code>xml</code> | Xml. | XMLDocument |  |
 * | <code>blob</code> | Blob. | Blob |  |
 * | <code><i>other</i></code> | XMLHttpRequest.responseType. | Varies. |  |
 *
 * @function
 * @name type
 * @memberof Nx
 * @instance
 *
 * @param {string} type Response type.
 * @returns {Nx}
 *
 * @default 'json'
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).type('raw').done();
 * $najax.request(url).type('html').done();
 * $najax.request(url).type('script').done();
 */

/**
 * Set url.
 * @function
 * @name url
 * @memberof Nx
 * @instance
 *
 * @param {string} url URL.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(null).url(url).done();
 */

/**
 * Set param. GET: URL parameters, POST: POST parameters.
 * @function
 * @name param
 * @memberof Nx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).param('a', 1).param('b', 1).done();
 * $najax.request(url).param({a: 1, b:2, c:3}).done();
 */

/**
 * Set async or sync.
 * @memberof Nx
 * @instance
 *
 * @param {boolean} on Async flag.
 * @returns {Nx}
 *
 * @default true
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).async(false).done();	//sync
 */
Nx.prototype.async = function(on){
	this._o.async = on;
	return this;
};

/**
 * Set cache behavior.
 * @function
 * @name cache
 * @memberof Nx
 * @instance
 *
 * @param {boolean} on Determine to cache.
 * @returns {Nx}
 *
 * @default false
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).cache(true).done();
 */

/**
 * Set retry number.
 * @function
 * @name retry
 * @memberof Nx
 * @instance
 *
 * @param {number} n Retry number.
 * @returns {Nx}
 *
 * @default null
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).retry(2).done();
 */

/**
 * Set timeout ms.
 * @memberof Nx
 * @instance
 *
 * @param {number} s Timeout ms.
 * @returns {Nx}
 *
 * @default null
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).timeout(500).done();
 */
Nx.prototype.timeout = function(s){
	this._o.timeout = s;
	return this;
};

/**
 * Set filter function. It's possible to modify response-value.
 *
 * <b>Function specification</b><br>
 * Called after recieving data and before making response-value.
 *
 * <b>Function structure</b><br>
 * <code>function(v:string){ return v; }</code>
 *
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Filter function.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).filter(function(v){ return v; }).done();
 */
Nx.prototype.filter = function(fn){
	this._o.filter = fn;
	return this;
};

/**
 * Set jsonp option.
 * @function
 * @name jsonp
 * @memberof Nx
 * @instance
 *
 * @param {string|function} [callback] Jsonp callback function.
 * @param {string} [name='callback'] Jsonp callback variable name.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).type('jsonp').jsonp('func').done();
 * $najax.request(url).type('jsonp').jsonp(func).done();
 * $najax.request(url).type('jsonp').jsonp(func, 'callback').done();
 */

/**
 * Set <i>content-type</i> and mime. Method POST option.
 * @memberof Nx
 * @instance
 *
 * @param {string} contentType Content-type.
 * @param {string} mime Mime.
 * @returns {Nx}
 *
 * @default 'application/x-www-form-urlencoded'
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).contentType('application/x-www-form-urlencoded').done();
 */
Nx.prototype.contentType = function(contentType, mime){
	if (contentType != null){
		this._o.contentType =  contentType;
	}

	if (mime){
		this._o.mime = mime;
	}

	return this;
};

/**
 * Set HTTP Headers.
 * @memberof Nx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).header('abc', 'ABC').done();
 * $najax.request(url).header({abc: 'ABC'}).done();
 */
Nx.prototype.header = function(w, v){
	if (!this._o.headers){
		this._o.headers = {};
	}

	extVs(this._o.headers, w, v);

	return this;
};

/**
 * Set CSRF token.
 * @memberof Nx
 * @instance
 *
 * @param {string} [v] CSRF token value.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).token('Zvds1yfe.f3iF9y4FfsJeMJKlyqYdJ.duJgMi').done();
 */
Nx.prototype.token = function(v){
	this._token = v;

	return this;
};

/**
 * Set upload object. Support Form(Element) and input(type=file)(Element), FormData.
 * @memberof Nx
 * @instance
 *
 * @param {Element|FormData} v Form(Element) / input(type=file)(Element) / FormData.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).upload(input).done();
 * $najax.request(url).upload(form).done();
 */
Nx.prototype.upload = function(v){
	var o;

	if (v instanceof FormData){
		o = v;
	}else if (v.constructor === Object){
		o = new FormData();

		for (var k in v){
			if (v.hasOwnProperty(k) && v[k].files){
				o.append(k, v[k].files[0]);
			}
		}
	}else if (v instanceof Element){
		switch(v.tagName.toLocaleLowerCase()){
		case 'form':
			o = new FormData(v);
			break;
		case 'input':
			o = new FormData();

			if (v.files){
				o.append(v.name, v.files[0]);
			}
			break;
		default:
			break;
		}
	}

	this._vs = o;

	this.method('post');
	this.contentType(false);

	return this;
};

/**
 * Set download and upload progress function.
 *
 * <b>Function structure</b><br>
 * <code>function(e:ProgressEvent, rate:number, xhr:XMLHttpRequest){ ... }</code> <code>rate: [0.0 - 1.0]</code>
 *
 * @memberof Nx
 * @instance
 *
 * @param {function} [download=null] Download progress function.
 * @param {function} [upload=null] Upload progress function.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).progress(dl, up).done();
 * $najax.request(url).progress(dl).done();
 */
Nx.prototype.progress = function(download, upload){
	if (download){
		this._download = download;
	}

	if (upload){
		this._upload = upload;
	}

	return this;
};

/**
 * Set auth.
 * @memberof Nx
 * @instance
 *
 * @param {string} user User name.
 * @param {string} pw Password.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).auth('user', 'password').done();
 */
Nx.prototype.auth = function(user, pw){
	this._o.auth = {user: user, pw: pw};
	return this;
};

/**
 * Set clear behavior.
 * @function
 * @name clean
 * @memberof Nx
 * @instance
 *
 * @param {boolean} on Determine to clear. If true, clear object's values after completed.
 * @returns {Nx}
 *
 * @default true
 *
 * @see Nx#clear
 * @tutorial static-najax
 *
 * @example
 * var nx = $najax.request(url).clean(false);nx.done();	//not clear
 */

/**
 * Set relay original data.
 * @function
 * @name relay
 * @memberof Nx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).relay('a', 1).relay('b', 2).done();
 * $najax.request(url).relay({a:1, b:2}).done();
 */

/**
 * Set <i>opt</i> value.
 * @function
 * @name opt
 * @memberof Nx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).opt('noescape', true).done();
 * $najax.request(url).opt('relaymode', 1).done();
 * $najax.request(url).opt({element: 'div'}).done();
 */

/**
 * Set begin function.
 *
 * <b>Function specification</b><br>
 * Called before beginning ajax.
 *
 * <b>Function structure</b><br>
 * <code>function(xhr:XMLHttpRequest){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name begin
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Begin function.
 * @returns {Nx}
 *
 * @see Nx#success
 * @see Nx#fail
 * @see Nx#complete
 * @see Nx#running
 * @see Nx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).begin(function(){ ... }).done();
 */

/**
 * Set success function.
 *
 * <b>Function specification</b><br>
 * Called when ajax succeed. ex: HTTP code 200.
 *
 * <b>Function structure</b><br>
 * <code>function(v:*, xhr:XMLHttpRequest){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name success
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Success function.
 * @returns {Nx}
 *
 * @see Nx#begin
 * @see Nx#fail
 * @see Nx#complete
 * @see Nx#running
 * @see Nx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).success(function(v, xhr){ ... }).done();
 */

/**
 * Set fail function.
 *
 * <b>Function specification</b><br>
 * Called when ajax fail. ex: network error, 403, 404, 503 or any other HTTP error.
 *
 * <b>Function structure</b><br>
 * <code>function(state:number, xhr:XMLHttpRequest){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name fail
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Fail function.
 * @returns {Nx}
 *
 * @see Nx#begin
 * @see Nx#success
 * @see Nx#complete
 * @see Nx#running
 * @see Nx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).fail(function(state, xhr){ ... }).done();
 */

/**
 * Set complete function.
 *
 * <b>Function specification</b><br>
 * Called after ajax completed, both success and fail.
 *
 * <b>Function structure</b><br>
 * <code>function(v:*, xhr:XMLHttpRequest){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name complete
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Complete function.
 * @returns {Nx}
 *
 * @see Nx#begin
 * @see Nx#success
 * @see Nx#fail
 * @see Nx#running
 * @see Nx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).complete(function(v, xhr){ ... }).done();
 */

/**
 * Set running function.
 *
 * <b>Function specification</b><br>
 * Called when begin(state=true) and complete(state=false).
 *
 * <b>Function structure</b><br>
 * <code>function(state:boolean){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name running
 * @memberof Nx
 * @instance
 *
 * @param {function} fn Running function.
 * @returns {Nx}
 *
 * @see Nx#begin
 * @see Nx#success
 * @see Nx#fail
 * @see Nx#complete
 * @see Nx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).running(function(state){ ... }).done();
 */

/**
 * Set success / fail / complete, and begin ajax.
 * @memberof Nx
 * @instance
 *
 * @param {function} [success] Success function. See <i>Nx.success</i>.
 * @param {function} [fail] Fail function. See <i>Nx.fail</i>.
 * @param {function} [complete] Complete function. See <i>Nx.complete</i>.
 * @returns {Relay} Relay object.
 *
 * @see Nx#begin
 * @see Nx#success
 * @see Nx#fail
 * @see Nx#complete
 * @see Nx#running
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request(url).done();
 * $najax.request(url).done(function{ ... });
 * $najax.request(url).done(null, function{ ... });
 * $najax.request(url).done(null, null, function{ ... });
 */
Nx.prototype.done = function(success, fail, complete){
	this.__done(success, fail, complete);

	var rl = new Relay();

	this.__xhr = nxXHR();

	mkURL(this);

	preRl(this, rl);

	nxReady(this, rl);

	nxSend(this, true, rl);

	return rl;
};

/**
 * Abort ajax.
 * @memberof Nx
 * @instance
 *
 * @returns {Nx}
 *
 * @tutorial static-najax
 *
 * @example
 * nx.abort();
 */
Nx.prototype.abort = function(){
	this.__xhr.abort();

	return this;
};

/**
 * Clear object's values after completed.
 * @memberof Nx
 * @instance
 *
 * @tutorial static-najax
 *
 * @example
 * nx.clear();
 */
Nx.prototype.clear = function(){
	this.__xhr.onreadystatechange = none;
	this.__xhr.onprogress = none;
	this.__xhr.upload.onprogress = none;

	clear(this);
};

/**
 * Get XHR object.
 * @memberof Nx
 * @instance
 *
 * @returns {XMLHttpRequest}
 *
 * @example
 * var nx = $najax.request(url);nx.done();
 * var xhr = nx.xhr();
 */
Nx.prototype.xhr = function(){
	return this.__xhr;
};

ext(Nx.prototype, Bx);

function mkURL(bx){
	var o = bx._o, u = bx._url;

	o.type = o.type.toLowerCase();

	o.method = (!o.method)?'GET':o.method.toUpperCase();

	if (bx._vs && o.method !== 'POST'){
		u = njx.url(u, bx._vs, o.noescape);
	}

	if (o.type === 'jsonp'){
		u = u + urlAdd(u) + o.jsonp.name + '=' + njx.escape(o.jsonp.callback);
	}

	if (!o.cache){
		u = utms(u);
	}

	bx.__url = u;
}

function utms(url){
	return url + urlAdd(url) + njx.define.utms + '=' + (new Date()).getTime();
}

function urlAdd(url){
	if (url.search(/\?/) != -1){
		if (url.search(/[\&\?]$/) == -1){
			return '&';
		}
	}else{
		return '?';
	}

	return '';
}

function postVs(vs, raw){
	if (vs instanceof Object && vs.constructor === Object || vs instanceof Array){
		return njx.params(vs, raw);
	}

	return vs;
}

function nxXHR() {
	var xhr = null;

	try {
		xhr = new XMLHttpRequest();
	}catch(e){
		try {
			xhr = new ActiveXObject('Msxml2.XMLHTTP');
		} catch(f){
			try {
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			}catch(g){
				error('can\'t create xhr object.');
			}
		}
	}

	return xhr;
}

function nxReady(nx, rl){
	switch(nx._o.type){
	case 'json':
		nx.__rsp = rspJson();
		break;
	case 'html':
		nx.__rsp = rspHtml(nx._o.element);
		break;
	case 'script':
		nx.__rsp = rspScript(nx._o.iseval);
		break;
	case 'func':
		nx.__rsp = rspFunc();
		break;
	case 'jsonp':
		nx.__rsp = rspScript(nx._o.iseval);
		break;
	case 'csv':
		nx.__rsp = rspCsv(nx._o.separator);
		break;
	case 'xml':
		nx.__type = 'document';
		break;
	case 'blob':
		nx.__type = 'blob';
		break;
	case 'raw':
	case 'text':
	case '':
		break;
	default:
		nx.__type = nx._o.type;
		break;
	}

	if (nx._download){
		nx.__xhr.onprogress = function(e){
			var r = e.loaded/e.total;
			nx._download(e, r, nx.__xhr);
		};
	}

	if (nx._upload){
		nx.__xhr.upload.onprogress = function(e){
			var r = e.loaded/e.total;
			nx._upload(e, r, nx.__xhr);
		};
	}

	nx.__xhr.onreadystatechange = function(){
		var xhr = nx.__xhr;

		if (xhr.readyState == 4){
			var v = xhr.response || xhr.responseText, r = null, vs;

			if (xhr.status == 200){
				if (nx._o.relaymode & 4){
					rl.data('_raw', v);
				}

				if (nx._o.filter){
					v = nx._o.filter(v);
				}

				if (nx.__rsp){
					v = nx.__rsp(v);
				}

				vs = [v, xhr];
				rl.setState(null, argPss(nx, vs));

				if (nx._sccs){
					r = nx._sccs.apply(rl, vs);
				}

				nx.__end(rl, vs, r);

				rl.notifySuccess();
			}else{
				if (nx._o.retry && nx._o.retry > nx.__retry && (xhr.status >= 500 || xhr.status == 0)){
					nx.__retry++;
					nxSend(nx, false);
					return;
				}

				if (xhr.status == 0){
					error('connection failed.', xhr);
				}

				vs = [xhr.status, xhr];
				rl.setState(null, argPss(nx, vs));

				if (nx._fail){
					r = nx._fail.apply(rl, vs);
				}

				nx.__end(rl, vs, r);

				rl.notifyFail();
			}

			if (nx._o.clean){
				nx.clear();
				nx = rl = null;
			}
		}
	};
}

function rspHtml(c){
	return function(v){
		if (typeof c !== 'object'){
			c = document.createElement(c);
		}

		njx.parseHTML(c, v);

		return c;
	};
}
function rspScript(evl){
	if (!evl){
		return function(v){
			(new Function(v))();

			return null;
		};
	}

	return function(v){
		if (window.execScript){
			window.execScript(v, 'JavaScript');
		}else{
			eval.call(null, v);
		}

		return null;
	};
}

function rspJson(){
	return function(v){
		if (!v){
			return null;
		}

		try {
			v = JSON.parse(v);
		}catch(e){
			v = null;
		}

		return v;
	};
}

function rspFunc(){
	return function(v){
		return new Function(v);
	};
}

function rspCsv(spl){
	var rx = new RegExp('("([^' + spl + ']*?)"(?:\s*' + spl + '|$)|\'([^' + spl + ']*?)\'(?:\s*' + spl + '|$)|([^' + spl + ']+?)(?:\s*' + spl + '|$))', 'g');

	return function(v){
		var t, w, z, vs = v.split(/[\r\n|\n]/);

		for (var i=0;i<vs.length;i++){
			z = [];
			while ((t = rx.exec(vs[i])) !== null){
				w = (t[2] != null)?t[2]:((t[3] != null)?t[3]:((t[4] != null)?t[4]:''));
				z.push(w);
			}
			vs[i] = z;
		}

		return vs;
	};
}

function nxSend(nx, fs, rl){
	var o = nx._o, xhr = nx.__xhr, k;

	xhr.open(o.method, nx.__url, o.async, o.auth.user, o.auth.pw);

	if (o.async && nx.__type){
		xhr.responseType = nx.__type;
	}

	if (o.timeout != null){
		xhr.timeout = o.timeout*1000;
	}

	for (k in o.headers){
		if (o.headers.hasOwnProperty(k)) {
			xhr.setRequestHeader(k, o.headers[k]);
		}
	}

	if (nx._token !== null){
		xhr.setRequestHeader(o.token, nx._token);
	}

	if (o.mime && xhr.overrideMimeType){
		xhr.overrideMimeType(o.mime);
	}

	if (fs){
		nx.__start(rl, [xhr]);
	}

	if (nx._o.method === 'POST'){
		if (o.contentType){
			xhr.setRequestHeader('content-type', o.contentType);
		}

		xhr.send(postVs(nx._vs, nx._o.noescape));
	}else{
		xhr.send();
	}
}

/**
 * $najax helper methods.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | Yes |
 *
 * @namespace $najax@helper
 * @tutorial najax-helper
 *
 * @example
 * v = $najax.escape(1);
 * v = $najax.escape('E=M+C+2');
 *
 * url = $najax.url('ajax.php', {a:1, b:2, c:3});
 * url = $najax.url('ajax.php', {a:1, b:2}, true);
 *
 * qs = $najax.query(true);
 *
 * $najax.parseHTML(el, html);
 *
 * $najax.submit('form.php', vs);
 * $najax.submit('form.php', vs, {method: 'POST', target: '_blank'});
 * $najax.iframeHtml(el, '<div>content</div>');
 */

/**
 * @ignore
 */
function qsVs(q, dc){
	var r = {}, ps = q.split('&'), p, v;

	for (var i = 0; i < ps.length; i++){
		if (ps[i] != '') {
			p = ps[i].split('=');

			v = (p[1] === undefined)?null:p[1];

			if (dc){
				try {
					v = decodeURI(v);
				} catch(e) {
					v = null;
				}
			}

			r[p[0]] = v;
		}
	}

	return r;
}

/**
 * Escape value.
 * @function escape
 * @memberof $najax@helper
 *
 * @param {string} v Parameter value.
 * @returns {string}
 *
 * @see $najax.params
 * @see $najax.url
 *
 * @tutorial najax-helper
 *
 * @example
 * v = $najax.escape(1);
 * v = $najax.escape('E=M+C+2');
 * v = $najax.escape('K V S');
 */
njx.escape = function(v){
	return encodeURIComponent(v).replace(/%20/g, '+');
};

/**
 * @ignore
 */
function prms(vs, pre, f){
	var s = '', nm;

	for (var k in vs){
		if (vs.hasOwnProperty(k)){
			nm = f(k);

			if (pre){
				nm = pre + '[' + nm + ']';
			}

			if (!(vs[k] instanceof Object)){
				s+= nm + '=' + f(vs[k]) + '&';
			}else{
				s+= prms(vs[k], nm, f);
			}
		}
	}

	return s;
}

/**
 * @ignore
 */
function rawv(v){
	return v;
}

/**
 * Return string values.
 * @function params
 * @memberof $najax@helper
 *
 * @param {assoc} vs Parameter values.
 * @param {boolean} [noescape=false] If true, not escape values.
 * @returns {string}
 *
 * @see $najax.escape
 * @see $najax.url
 *
 * @tutorial najax-helper
 *
 * @example
 * v = $najax.params({a: 1});
 * v = $najax.params({a: 1, b:2}, true);
 * v = $najax.params({K:'V S', E:'M C'});
 */
njx.params = function(vs, noescape){
	var s;

	if (!noescape){
		s = prms(vs, '', njx.escape);
	}else{
		s = prms(vs, '', rawv);
	}

	return s.slice(0, -1);
};

/**
 * Create url by params. URL's query-string value is overridden by parameter-values.
 * @function url
 * @memberof $najax@helper
 *
 * @param {string} url URL.
 * @param {assoc} vs Parameter values.
 * @param {boolean} [noescape=false] If true, not escape values.
 * @returns {string}
 *
 * @see $najax.escape
 * @see $najax.params
 *
 * @tutorial najax-helper
 *
 * @example
 * url = $najax.url('ajax.php', {a:1, b:2, c:3});
 * url = $najax.url('ajax.php', {a:1, b:2}, true);
 * url = $najax.url('ajax.php?a=0&d=3', {a:1, b:2, c:3});
 * url = $najax.url('ajax.php?a=x+y&', {a:'NX', b: 'E=M+C+2', d:'K V S'});
 */
njx.url = function(url, vs, noescape){
	if (!vs){
		return url;
	}

	var t = /^([^\?#]*)\??([^#]*)#?(.*)$/.exec(url), q = qsVs(t[2], false), k;

	for (k in vs){
		if (vs.hasOwnProperty(k)){
			q[k] = vs[k];
		}
	}

	url = t[1];

	if (!isEmp(q)){
		url+= '?' + njx.params(q, noescape);
	}

	if (t[3]){
		url+= '#' + t[3];
	}

	return url;
};

/**
 * Parse query string and return parameter assoc.
 * @function query
 * @memberof $najax@helper
 *
 * @param {boolean} [hash=false] If true, include URL's hash fragment(#).
 * @returns {assoc}
 *
 * @tutorial najax-helper
 *
 * @example
 * qs = $najax.query();
 *
 */
njx.query = function(hash){
	var q, rv = /\?(.+)$/.exec(location.search);

	if (rv){
		q = qsVs(rv[1], true);
	}else{
		q = {};
	}

	return q;
};

/**
 * Get hash.
 * @function hash
 * @memberof $najax@helper
 *
 * @returns {string}
 *
 * @tutorial najax-helper
 *
 * @example
 * hash = $najax.hash();
 *
 */
njx.hash = function() {
	return location.hash.replace('#', '');
};

/**
 * @ignore
 */
function sbmSet(c, nm, vs){
	for (var k in vs){
		if (vs.hasOwnProperty(k)){
			var v = vs[k];

			if (nm != null){
				k = nm + '[' + k + ']';
			}

			if (v instanceof Object){
				sbmSet(c, k, v);
			}else{
				var t = document.createElement('input');
				attr(t, 'type', 'hidden');
				attr(t, 'name', k);
				attr(t, 'value', v);
				c.appendChild(t);
			}
		}
	}
}

/**
 * @ignore
 */
function cpy(nc, tc, nm){
	if (tc[nm] != null && tc[nm] != ''){
		nc[nm] = tc[nm];
	}
}

/**
 * @ignore
 */
function htmPrs(c){
	var tc;

	for (var i=0;i<c.children.length;i++){
		tc = c.children[i];

		if (tc.children.length > 0){
			htmPrs(tc);
		}else{
			if (tc.tagName.toLocaleLowerCase() === 'script'){
				var nc = document.createElement('script');

				cpy(nc, tc, 'type');
				cpy(nc, tc, 'language');
				cpy(nc, tc, 'charset');
				cpy(nc, tc, 'async');
				cpy(nc, tc, 'defer');
				cpy(nc, tc, 'src');

				nc.text = tc.text;
				c.replaceChild(nc, tc);
			}
		}
	}
}

/**
 * Parse HTML with evaluating JavaScript.
 * @function parseHTML
 * @memberof $najax@helper
 *
 * @param {Element} el Destination element.
 * @param {string} src HTML source.
 *
 * @tutorial najax-helper
 *
 * @example
 * $najax.parseHTML(el, html);
 */
njx.parseHTML = function(el, src){
	el.innerHTML = src;

	htmPrs(el);
};

/**
 * Submit values by form Element.
 * @function submit
 * @memberof $najax@helper
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameter.
 * @param {assoc} [opt] Option.
 * @param {Element} [opt.form] Form Element.
 * @param {string} [opt.method=null] Method(GET | POST).
 * @param {string} [opt.target] Target window.
 * @param {string} [opt.enctype] Form enctype.
 * @return {Element}
 *
 * @tutorial najax-helper
 * @example
 * $najax.submit('form.php', vs);
 * $najax.submit('form.php', vs, {method: 'POST', target: '_blank'});
 * $najax.submit('form.php', vs, {form: '#form', target: '_blank'});
 */
njx.submit = function(url, vs, opt){
	info('submit');

	opt = ext({form: null, method: null, target: null, enctype: null}, opt);

	var c, fm = false;

	if (opt.form){
		c = opt.form;
	}else{
		fm = true;
		c = document.createElement('form');
		c.style.display = 'none';
		document.body.appendChild(c);
	}

	if (fm || opt.method){
		attr(c, 'method', opt.method);
	}

	if (fm || url){
		attr(c, 'action', url);
	}

	if (fm || opt.enctype){
		attr(c, 'enctype', opt.enctype);
	}

	if (fm || opt.target){
		attr(c, 'target', opt.target);
	}

	sbmSet(c, null, vs);

	c.submit();

	return c;
};

/**
 * Create iframe content by source.
 * @function iframeHtml
 * @memberof $najax@helper
 *
 * @param {Element} el Iframe Element.
 * @param {string} src HTML source.
 * @param {assoc} [opt] Option.
 * @param {boolean} [opt.all=false] If true, all content mode. or false, body content mode.
 * @param {string} [opt.charset='utf-8'] Charset.
 * @param {string} [opt.css=''] CSS Style.
 * @param {string} [opt.js=''] JavaScript source.
 *
 * @tutorial najax-helper
 *
 * @example
 * $najax.iframeHtml(el, '<div>content</div>');
 * $najax.iframeHtml(el, '<html>....</html>', {all: true});
 * $najax.iframeHtml(el, src, {css: 'body: {font-size:12pt;}'});
 * $najax.iframeHtml(el, src, {js: 'alert("demo");'});
 */
njx.iframeHtml = function(el, src, opt) {
	opt = ext({all: false, charset: 'utf-8', css: '', js: ''}, opt);

	var s, d = el.contentWindow || el.contentDocument;

	if (!opt.all){
		s = '<!doctype html><html><head><meta charset=' + opt.charset + '></head>';

		if (opt.css){
			s += '<style type="text/css">'  + opt.css  + '</style>';
		}

		if (opt.js){
			s += '<script type="text/javascript">' + opt.js + '</script>';
		}

		s += '</head><body>' + src + '</body></html>';
	}else{
		s = src;
	}

	if (d){
		d.document.open();
		d.document.write(s);
		d.document.close();
	}
};

/**
 * $najax(any-ajax) static methods. Provide various ajax methods.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | scriptTag | Yes | - |
 * | jsonpTag | Yes | - |
 * | Others | Yes | Yes |
 *
 * <b>Requires</b><br>
 * Any other library is unnecessary.
 * <small>(Only $najax.sendex method requires <i>any.js</i> and <i>jQuery</i> library.)</small>
 *
 * <b>Specification</b><br>
 * - Specify ajax request and response behaviors by <code>Nx object</code>.
 * - Specify by Nx object's various method or <code>Nx <i>opt</i></code> method.
 * - Begin ajax connection by <code>Nx <i>done</i></code>.
 * - <code>Nx <i>done</i></code> returns <code>Relay object</code>.
 * - <code>Relay</code> provide operating response-data, and bundling multiple <code>Relay</code>.
 * - <code>Nx</code> implement ajax by using <i>XMLHttpRequest</i>.
 *
 * @namespace $najax
 *
 * @see $najax.request
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request('path.php').done();
 * $najax.request('path.php', {a1:1,a2:2,a3:3}).done(function(data){ ... });
 *
 * $najax.post('path.php', {a:1, b:2, c:3}).done();
 * $najax.post('path.php').param('a', 'A').param('b', 'B').done();
 * $najax.raw('path.php').done();
 *
 * $najax.html('template.htm').done(function(el){ ... });
 * $najax.xml('xml.php').done(function(xml){ ... });
 * $najax.jsonp('jsonp.php', jsp_func).done();
 * $najax.sync('ajax.php').done(function(data){ ... });
 * $najax.script('script.php').done();
 * $najax.csv('list.csv').done(function(rows){ ... });
 */

/**
 * Simple ajax request. It's possible to specify ajax behaviors by using Nx object's method chaining.
 *
 * @function request
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see $najax.get
 * @see $najax.post
 *
 * @see Nx
 * @see Relay
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.request('path.php').done();
 * $najax.request('path.php', {a1:1,a2:2,a3:3}).done(function(data){ ... });
 * var nx = $najax.request('path.php');nx.param('a', 1).done();
 * $najax.request('path.php').type('raw').done();
 * $najax.request('path.php').success(function(){ ... }).fail(function(){ ... }).done();
 * $najax.request('path.php').retry(2).done();
 * $najax.request('path.php').async(false).timeout(30).done();
 * $najax.request('path.php').header('certify', 'mycode').done();
 * $najax.request('path.php').upload(element).done();
 * $najax.request('path.php').running(function(v){ ... }).complete(function(){ ... }).done();
 */
njx.request = function(url, vs, opt){
	info('request');

	return (new Nx(opt)).__basic(url , vs);
};

/**
 * GET ajax request.
 * @function get
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see Linker
 * @see $najax.request
 * @see $najax.post
 *
 * @tutorial static-najax
 * @example
 * $najax.get('path.php').done();
 * $najax.get('path.php', {a1:1,a2:2,a3:3}).done(function(data){ ... });
 */
njx.get = function(url, vs, opt){
	info('get');

	return (new Nx(opt)).__basic(url , vs).opt('method', 'GET');
};

/**
 * POST ajax request.
 * @function post
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 * @see $najax.get
 *
 * @tutorial static-najax
 * @example
 * $najax.post('path.php', {a:1, b:2, c:3}).done();
 * $najax.post('path.php').param('a', 'A').param('b', 'B').done();
 * $najax.post('path.php', vs).done(function(data){ ... });
 */
njx.post = function(url, vs, opt){
	info('post');

	return (new Nx(opt)).__basic(url , vs).opt('method', 'POST');
};

/**
 * Raw(text) response / ajax request.
 * @function raw
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.raw('path.php').done();
 * $najax.raw('path.php', vs).done(function(data){ ... });
 * $najax.raw('path.php', vs).success(function(raw){ ... }).done();
 */
njx.raw = function(url, vs, opt){
	info('raw');

	return (new Nx(opt)).__basic(url , vs).type('raw');
};

/**
 * Alias of $najax.raw.
 * @function text
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.text('path.php').done();
 * $najax.text('path.php', vs).done(function(data){ ... });
 * $najax.text('path.php').success(function(text){ ... }).done();
 */
njx.text = function(url, vs, opt){
	return njx.raw(url, vs, opt);
};

/**
 * HTML response / ajax request. This method evaluate JavaScript in HTML. It's possible to specify root element by <code>element</code> option in Nx.
 *
 * <b>Response value type</b> <code>Element</code>
 *
 * @function html
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @param {boolean} [opt.cache=true] Enable cache.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.html('template.htm').done(function(el){ ... }); //Response arg is Element.
 * $najax.html('template.php').success(function(el){ ... }).done();
 * $najax.html('template.php').opt('element', 'span').(function(el){ ... }).done();  //root element tag.
 * $najax.html('template.php').opt('element', el).(function(el){ ... }).done();			//root element.
 */
njx.html = function(url, vs, opt){
	info('html');

	return (new Nx(opt)).__basic(url , vs).cache(true).type('html');
};

/**
 * Script execute / ajax request. It's possible to specify evaluate mode, <i>eval</i> or <i>function</i> by <code>iseval</code> option in Nx.
 *
 * <b>Response value type</b> <code>null</code>
 *
 * @function script
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @param {boolean} [opt.cache=true] Enable cache.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.script('script.php').done();
 * $najax.script('script.php').opt('iseval', false).done();	//by function.
 */
njx.script = function(url, vs, opt){
	info('script');

	return (new Nx(opt)).__basic(url , vs).cache(true).type('script');
};

/**
 * Function response / ajax request. This method don't execute script, pass <i>function object</i> to argument.
 *
 * <b>Response value type</b> <code>function</code>
 *
 * @function func
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @param {boolean} [opt.cache=true] Enable cache.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.func('script.php').done(function(fn){ ... });
 * $najax.func('script.php').success(function(fn){ ... }).done();
 */
njx.func = function(url, vs, opt){
	info('func');

	return (new Nx(opt)).__basic(url, vs).cache(true).type('func');
};

/**
 * XML response / ajax request.
 *
 * <b>Response value type</b> <code>XMLDocument</code>
 *
 * @function xml
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.xml('xml.php').done(function(xml){ ... });
 * $najax.xml('xml.php', vs).done(function(xml){ ... });
 * $najax.xml('xml.php').param({a:1, b:1, c:3}).done(function(xml){ ... });
 */
njx.xml = function(url, vs, opt){
	info('xml');

	return (new Nx(opt)).__basic(url , vs).type('xml');
};

/**
 * Jsonp / ajax request. It's possible to specify jsonp-callback function by <code>jsonp</code> func in Nx.
 *
 * <b>Response value type</b> <code>null</code>
 *
 * @function jsonp
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {function|string} fn Callback function. It must be global function.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.jsonp('jsonp.php', jsp_func).done();
 * $najax.jsonp('jsonp.php', 'jsp_func').done();
 * $najax.jsonp('jsonp.php', jsp_func).method('post').done();
 * $najax.jsonp('jsonp.php').jsonp(jsp_func, 'callback').param(vs).done();
 */
njx.jsonp = function(url, fn, opt){
	info('jsonp');

	return (new Nx(opt)).__basic(url).jsonp(fn);
};

/**
 * CSV(TSV) response / ajax request. It's possible to specify csv-separator by <code>separator</code> option in Nx.
 *
 * <b>Response value type</b> <code>Array</code>
 *
 * @function csv
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.csv('list.csv').done(function(rows){ ... });
 * $najax.csv('list.tsv').opt('separator', "\t").done(function(rows){ ... });
 */
njx.csv = function(url, vs, opt){
	info('text');

	return (new Nx(opt)).__basic(url , vs).type('csv');
};

/**
 * Ajax request with synchronization mode.
 *
 * @function sync
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @returns {Nx}
 *
 * @see Nx
 * @see Relay
 * @see $najax.request
 *
 * @tutorial static-najax
 * @example
 * $najax.sync('ajax.php').done(function(data){ ... });
 * var rl = $najax.sync('ajax.php').done();
 * var v = rl.value();
 */
njx.sync = function(url, vs, opt){
	info('sync');

	return (new Nx(opt)).__basic(url , vs).async(false);
};

/**
 * $najax read methods.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | Yes |
 *
 * @namespace $najax@read
 * @tutorial najax-read
 *
 * @example
 * $najax.require('sample.js');
 * $najax.require(['s1.js', 's2.js'], {base: 'path/'}).done(function(s1, s2){ ... });
 *
 * $najax.ready(function(){ ... });
 *
 * $najax.load('#target', 'demo.php', {a: 1, b: 2});
 *
 * $najax.module('template.php');
 */

var rqFn = null;

function rqSc(){
	this.data({fn: rqFn});
	rqFn = null;
}

/**
 * Load script and pass <i>function object</i> by <code>$najax.ready</code> to arguments.
 *
 * @function require
 * @memberof $najax@read
 *
 * @param {string|array} path Path or Paths.
 * @param {assoc} [opt] Nx options.
 * @param {string} [opt.base=''] Base path.
 * @param {boolean} [opt.run=false] Run script after loading.
 * @param {number} [opt.relaymode=2] For details, see $najax.define.relaymode.
 * @param {boolean} [opt.cache=true] Enable cache.
 * @returns {Linker}
 *
 * @see $najax.ready
 * @see $najax.define.relaymode
 *
 * @see Nx
 * @see Relay
 * @see Linker
 *
 * @tutorial najax-read
 * @example
 * $najax.require('sample.js');
 * $najax.require(['s1.js', 's2.js'], {base: 'path/'}).done(function(s1, s2){ ... });
 * $najax.require(['AClass.js', 'BClass.js']).done(function(AClass, BClass){ ... });
 * $najax.require('sample.js', {run: true});
 */
njx.require = function(path, opt){
	info('require');

	opt = ext({base: '', run: false, relaymode: 2, cache: true}, opt);

	if (typeof path === 'string'){
		path = [path];
	}

	var rls = [];

	for (var i=0;i<path.length;i++){
		rls[i] = njx.script(opt.base + path[i], null, opt).complete(rqSc).done();
	}

	return njx.linker.apply(null, rls).argument(function(rl){
		var f = rl.data('fn');

		if (opt.run && f){
			f = f();
		}

		return f;
	}).lock();
};

/**
 * Ready function for $najax.require.
 *
 * @function ready
 * @memberof $najax@read
 *
 * @param {function} fn Function.
 *
 * @see $najax.require
 *
 * @tutorial najax-read
 * @example
 * $najax.ready(function(){ ... });
 * $najax.ready($any.makeClass( ... ));
 */
njx.ready = function(fn){
	info('ready');

	if (fn){
		rqFn = fn;
	}
};

/**
 * Load template and append HTML and JS to Element. If target Element is null, append to document bottom(auto-append).
 *
 * <b>Specification</b><br>
 * Naming in auto-append: <code>prefix + CRC code created by url. Ex: id=njx5690</code>
 * <code>_elem</code> by Relay::data is Element.
 *
 * @function load
 * @memberof $najax@read
 *
 * @param {Element} el Element. If null, append automatically as a last Element - auto-append.
 * @param {string} url URL
 * @param {assoc} [vs=null] Parameter
 * @param {assoc} [opt] Nx options.
 * @param {string} [opt.prefix='njx'] When appending to as last Element, it's possible to specify Element's id prefix.
 * @param {number} [opt.relaymode=3] For details, see $najax.define.relaymode.
 * @returns {Linker}
 *
 * @see $najax.module
 * @see $najax.define.relaymode
 * @see Nx
 * @see Relay
 * @see Linker
 *
 * @tutorial najax-read
 * @example
 * $najax.load('#target', 'demo.php', {a: 1, b: 2});
 * $najax.load(null, 'demo.php').done(function(data){ ... });
 */
njx.load = function(el, url, vs, opt){
	info('load');

	opt = ext({prefix: 'njx', relaymode: 3}, opt);
	opt.cache = true;

	if (!el){
		el = document.createElement('div');
		el.id = opt.prefix + $any.crc16(url);
		el.style.display = 'none';
		document.body.appendChild(el);
	}

	opt.element = el;

	var rl = njx.html(url, vs, opt).done();

	if (opt.relaymode & 2){
		rl.data('_elem', el);
	}

	return njx.linker(rl);
};

/**
 * Load module - Wrapper of $najax.load. Append to document bottom.
 *
 * <b>Specification</b><br>
 * Append module(HTML and script) to document bottom.
 *
 * @function module
 * @memberof $najax@read
 *
 * @param {string} url URL
 * @param {assoc} [opt] $najax.load options.
 * @returns {Linker}
 *
 * @see $najax.load
 * @see Nx
 * @see Relay
 * @see Linker
 *
 * @tutorial najax-read
 * @example
 * $najax.module('template.php');
 */
njx.module = function(url, opt){
	info('module');

	return njx.load(null, url, null, opt);
};

})($najax);
