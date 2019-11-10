/*!
 * najaxjs ver 1.1.0 - najax.js
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

/* global ActiveXObject: false */

function nxXHR(){
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

/* global nxXHR: false */

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
 * @param {assoc} [opt] Nx options.
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
	return njx.load(null, url, null, opt);
};

/* global mkURL: false */
/* global argPss: false */
/* global preRl: false */

/**
 * Tx class. This class is created automatically by $najax.scriptTag and $najax.jsonpTag.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * <b>Specification</b><br>
 * - Specify load and response behaviors by <code>Nx object</code>.
 * - Specify by Tx object's various method or <code>Tx <i>opt</i></code> method.
 * - Begin tag-loading by <code>Tx <i>done</i></code>.
 * - <code>Tx <i>done</i></code> returns <code>Relay object</code>.
 * - <code>Relay</code> provide operating response-data, and bundling multiple <code>Relay</code>.
 * - <code>Tx</code> implement tag-loading by appending <i>SCRIPT tag</i> element.
 *
 * @class Tx
 *
 * @param {assoc} [opt] Tx options.
 * @param {string} [opt.type='script'] Response type.
 * @param {boolean} [opt.cache=false] Enable cache.
 * @param {number} [opt.retry=null] Retry number.
 * @param {boolean} [opt.noescape=false] If true, not escape parameters. Apply to GET parameters.
 * @param {assoc} [opt.jsonp] Jsonp option.
 * @param {string|function} [opt.jsonp.callback=''] Jsonp callback function.
 * @param {string} [opt.jsonp.name='callback'] Jsonp callback variable name.
 * @param {string} [opt.mime='text/javascript'] Script tag's <i>type</i>.
 * @param {string} [opt.charset=null] Script tag's <i>charset</i>.
 * @param {number} [opt.relaymode=$najax.define.relaymode] Data relaymode. See $najax.define.relaymode for detail.
 * @param {boolean} [opt.clean=true] Clear object's values after completed.
 *
 * @see $najax.scriptTag
 * @see $najax.jsonpTag
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).done();
 * $najax.jsonpTag(url, 'func').done();
 *
 * $najax.scriptTag(url).param('a', 1).param('b', 1).done();
 * $najax.jsonpTag(url).jsonp('func').done();
 *
 * $najax.scriptTag(url).opt({charset: 'utf-8'}).done();
 * $najax.scriptTag(url).complete(function(){ ... }).done();
 * $najax.scriptTag(url).fail(function(){ ... }).done();
 */
var Tx = function(opt){
	this._url = null;
	this._vs = null;
	this._relaydata = null;

	this._o = ext({
		type: 'script',
		cache: false,
		retry: null,
		noescape: false,
		jsonp: {name: 'callback', callback: ''},
		mime: 'text/javascript',
		charset: null,
		relaymode: njx.define.relaymode,
		clean: true
	}, opt);

	this._begin = null;
	this._running = null;
	this._sccs = null;
	this._fail = null;
	this._cmpl = null;

	this.__url = null;
	this.__retry = 0;
	this.__before = null;
	this.__after = null;

	this.__el = null;
};

/**
 * Set url.
 * @function
 * @name url
 * @memberof Tx
 * @instance
 *
 * @param {string} url URL.
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(null).url(url).done();
 */

/**
 * Set param. GET parameters.
 * @function
 * @name param
 * @memberof Tx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).param('a', 1).param('b', 1).done();
 * $najax.scriptTag(url).param({a: 1, b:2, c:3}).done();
 */

/**
 * Set cache behavior.
 * @function
 * @name cache
 * @memberof Tx
 * @instance
 *
 * @param {boolean} on Determine to cache.
 * @returns {Tx}
 *
 * @default false
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).cache(true).done();
 */

/**
 * Set retry number.
 * @function
 * @name retry
 * @memberof Tx
 * @instance
 *
 * @param {number} n Retry number.
 * @returns {Tx}
 *
 * @default null
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).retry(2).done();
 */

/**
 * Set jsonp option.
 * @function
 * @name jsonp
 * @memberof Tx
 * @instance
 *
 * @param {string|function} [callback] Jsonp callback function.
 * @param {string} [name='callback'] Jsonp callback variable name.
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.jsonpTag(url).jsonp('func').done();
 * $najax.jsonpTag(url).jsonp(func).done();
 * $najax.jsonpTag(url).jsonp(func, 'callback').done();
 */

/**
 * Set <i>charset</i> value of script-tag.
 * @memberof Tx
 * @instance
 *
 * @param {string} v Charset.
 * @returns {Tx}
 *
 * @default null
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).charset('utf-8').done();
 */
Tx.prototype.charset = function(v){
	this._o.charset = v;
	return this;
};

/**
 * Set <i>type</i> value of script-tag.
 * @memberof Tx
 * @instance
 *
 * @param {string} v Type.
 * @returns {Tx}
 *
 * @default 'text/javascript'
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).mime('application/javascript').done();
 */
Tx.prototype.mime = function(v){
	this._o.mime = v;
	return this;
};

/**
 * Set clear behavior.
 * @function
 * @name clean
 * @memberof Tx
 * @instance
 *
 * @param {boolean} on Determine to clear. If true, clear object's values after completed.
 * @returns {Tx}
 *
 * @default true
 *
 * @see Nx#clear
 * @tutorial static-najax
 *
 * @example
 * var tx = $najax.scriptTag(url).clean(false);tx.done();
 */

/**
 * Set relay original data.
 * @function
 * @name relay
 * @memberof Tx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).relay('a', 1).relay('b', 2).done();
 * $najax.scriptTag(url).relay({a:1, b:2}).done();
 */

/**
 * Set <i>opt</i> value.
 * @function
 * @name opt
 * @memberof Tx
 * @instance
 *
 * @param {string|assoc} w Name or assoc.
 * @param {string} [v] Value.
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).opt('noescape', true).done();
 * $najax.scriptTag(url).opt('relaymode', 1).done();
 * $najax.scriptTag(url).opt({charset: 'utf-8'}).done();
 */

/**
 * Set begin function.
 *
 * <b>Function specification</b><br>
 * Called before beginning tag-loading.
 *
 * <b>Function structure</b><br>
 * <code>function(){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name begin
 * @memberof Tx
 * @instance
 *
 * @param {function} fn Begin function.
 * @returns {Tx}
 *
 * @see Tx#success
 * @see Tx#fail
 * @see Tx#complete
 * @see Tx#running
 * @see Tx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).begin(function(){ ... }).done();
 */

/**
 * Set success function.
 *
 * <b>Function specification</b><br>
 * Called when tag-loading succeed. ex: HTTP code 200.
 *
 * <b>Function structure</b><br>
 * <code>function(){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name success
 * @memberof Tx
 * @instance
 *
 * @param {function} fn Success function.
 * @returns {Tx}
 *
 * @see Tx#begin
 * @see Tx#fail
 * @see Tx#complete
 * @see Tx#running
 * @see Tx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).success(function(){ ... }).done();
 */

/**
 * Set fail function.
 *
 * <b>Function specification</b><br>
 * Called when tag-loading fail. ex: network error, 403, 404, 503 or any other HTTP error.
 *
 * <b>Function structure</b><br>
 * <code>function(){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name fail
 * @memberof Tx
 * @instance
 *
 * @param {function} fn Fail function.
 * @returns {Tx}
 *
 * @see Tx#begin
 * @see Tx#success
 * @see Tx#complete
 * @see Tx#running
 * @see Tx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).fail(function(){ ... }).done();
 */

/**
 * Set complete function.
 *
 * <b>Function specification</b><br>
 * Called after ajax completed, both success and fail.
 *
 * <b>Function structure</b><br>
 * <code>function(){ ... }</code> <code>this: <i>Relay object</i></code>
 *
 * @function
 * @name complete
 * @memberof Tx
 * @instance
 *
 * @param {function} fn Complete function.
 * @returns {Tx}
 *
 * @see Tx#begin
 * @see Tx#success
 * @see Tx#fail
 * @see Tx#running
 * @see Tx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).complete(function(){ ... }).done();
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
 * @memberof Tx
 * @instance
 *
 * @param {function} fn Running function.
 * @returns {Tx}
 *
 * @see Tx#begin
 * @see Tx#success
 * @see Tx#fail
 * @see Tx#complete
 * @see Tx#done
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).running(function(state){ ... }).done();
 */

/**
 * Set success / fail / complete, and begin tag-loading.
 * @memberof Tx
 * @instance
 *
 * @param {function} [success] Success function. See <i>Tx.success</i>.
 * @param {function} [fail] Fail function. See <i>Tx.fail</i>.
 * @param {function} [complete] Complete function. See <i>Tx.complete</i>.
 * @returns {Relay} Relay object.
 *
 * @see Tx#begin
 * @see Tx#success
 * @see Tx#fail
 * @see Tx#complete
 * @see Tx#running
 *
 * @tutorial static-najax
 *
 * @example
 * $najax.scriptTag(url).done();
 * $najax.scriptTag(url).done(function{ ... });
 * $najax.jsonpTag(url, 'func').done(null, function{ ... });
 * $najax.jsonpTag(url, 'func').done(null, null, function{ ... });
 */
Tx.prototype.done = function(success, fail, complete){
	this.__done(success, fail, complete);

	var rl = new Relay();

	mkURL(this);

	preRl(this, rl);

	this.__start(rl);

	txReady(this, rl);

	return rl;
};

/**
 * Abort ajax.
 * @memberof Tx
 * @instance
 *
 * @returns {Tx}
 *
 * @tutorial static-najax
 *
 * @example
 * tx.abort();
 */
Tx.prototype.abort = function(){
	if (window.stop){
		window.stop();
	}

	txDrop(this);

	return this;
};

/**
 * Clear object's values after completed.
 * @memberof Tx
 * @instance
 *
 * @tutorial static-najax
 *
 * @example
 * tx.clear();
 */
Tx.prototype.clear = function(){
	txDrop(this);
	clear(this);
};

ext(Tx.prototype, Bx);

function txDrop(tx){
	if (tx.__el){
		tx.__el.onreadystatechange = tx.__el.onload = tx.__el.onerror = none;
		tx.__el.parentNode.removeChild(tx.__el);
		tx.__el = null;
	}
}

function txSc(tx, rl){
	var r = null;

	if (tx._sccs){
		r = tx._sccs();
	}

	tx.__end(rl, null, r);

	rl.notifySuccess();

	if (tx._o.clean){
		tx.clear();
	}
}

function txReady(tx, rl){
	var c = document.createElement('script');

	c.src = tx.__url;
	c.type = tx._o.mime;
	c.async = true;

	if (tx._o.charset){
		c.charset = tx._o.charset;
	}

	tx.__el = c;

	if (document.head){
		tx.__el.onload = function(){
			txSc(tx, rl);
			tx = rl = null;
		};

		tx.__el.onerror = function(){
			var r = null;

			if (tx._o.retry && tx._o.retry > tx.__retry){
				tx.__retry++;
				txDrop(tx);
				txReady(tx, rl);
				return;
			}

			if (tx._fail){
				r = tx._fail();
			}

			tx.__end(rl, null, r);

			rl.notifyFail();

			if (tx._o.clean){
				tx.clear();
			}

			tx = rl = null;
		};
	}else{
		tx.__el.onreadystatechange = function(){
			if (this.readyState === 'loaded'){
				txSc(tx, rl);
				tx = rl = null;
			}
		};
	}

	(document.head || document.body).appendChild(tx.__el);
}

Bx = null;

/**
 * Script execute / tag request. Support outer cross-domain request. Only GET method.
 *
 * <b><i>Note! Not included in najax-tiny.js.</i></b><br>
 *
 * <b>Specification</b><br>
 * - Append <i>SCRIPT</i> tag.
 * - Load script and execute script.
 * - Remove <i>SCRIPT</i> tag.
 *
 * @function scriptTag
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET.
 * @param {assoc} [opt] Tx options.
 * @returns {Tx}
 *
 * @see Tx
 * @see Relay
 *
 * @tutorial static-najax
 * @example
 * $najax.scriptTag('script.php').done();
 * $najax.scriptTag('script.php', vs).done();
 * $najax.scriptTag('script.php').charset('utf-8').done();
 * $najax.scriptTag('script.php').success(function(){ ... }).done();
 */
njx.scriptTag = function(url, vs, opt){
	return (new Tx(opt)).__basic(url, vs, 'script');
};

/**
 * Jsonp / tag request. Support outer cross-domain request. Only GET method.
 *
 * <b><i>Note! Not included in najax-tiny.js.</i></b><br>
 *
 * <b>Specification</b><br>
 * See $najax.scriptTag specification.
 *
 * @function jsonpTag
 * @memberof $najax
 *
 * @param {string} url URL.
 * @param {function|string} fn Callback function. It must be global function.
 * @param {assoc} [opt] Tx options.
 * @returns {Tx}
 *
 * @see Tx
 * @see Relay
 *
 * @tutorial static-najax
 * @example
 * $najax.jsonpTag('script.php', jsp_func).done();
 * $najax.jsonpTag('script.php', 'jsp_func').charset('utf-8').done();
 * $najax.jsonpTag('script.php').jsonp(jsp_func, 'callback').done();
 * $najax.jsonpTag('script.php').param(vs).done();
 * $najax.jsonpTag('script.php').success(function(){ ... }).done();
 */
njx.jsonpTag = function(url, fn, opt){
	return (new Tx(opt)).__basic(url, null, 'jsonp').jsonp(fn);
};


/**
 * Ajax request with verifying automatically and showing messages.
 *
 * <b><i>Note! Not included in najax-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @namespace $najax@ex
 * @tutorial najax-ex
 *
 * @example
 * $najax.send('path.php').done();
 * $najax.send('path.php', null, {verify: $najax.define.verify}).done();
 * $najax.send('path.php', null, {verify: function(v){ return (v.verify)?true:false; } }).done();
 *
 * $najax.sendex('path.php').done();
 * $najax.sendex('path.php', null, {verify: $najax.define.verify}).done();
 */

/**
 * Response state defines.
 * @name state
 * @memberof $najax
 * @readonly
 * @enum {number}
 *
 * @see $najax.define.msg
 */
njx.state = {
	/** success. */
	success: 0,
	/** connection error. */
	ajax: 1,
	/** empty error. */
	empty: 2,
	/** verify error. */
	verify: 3,
	/** app error. */
	app: 4
};

/**
 * Default messages for $najax.send / $najax.sendex.
 * @name msg
 * @memberof $najax.define
 *
 * @type {object}
 * @property {string} [0] Success.
 * @property {string} [1]	 Connection error(ajax).
 * @property {string} [2] Empty error(ajax).
 * @property {string} [3] Verify error(ajax).
 * @property {string} [4] App error(ajax).
 *
 * @see $najax.state
 * @see $najax@ex.send
 * @see $najax@ex.sendex
 *
 * @example
 * $najax.define.msg[0] = 'Success.';
 */
njx.define.msg = {
	0: 'Success.',
	1: 'Connection error(ajax).',
	2: 'Empty error(ajax).',
	3: 'Verify error(ajax).',
	4: 'App error(ajax).'
};

/**
 * Default alert method for $najax.send.
 * @name fail
 * @memberof $najax.define
 *
 * @param {number} state Response state. See <i>$najax.state</i>.
 * @param {string} msg Message. See <i>$najax.define.msg</i>.
 * @param {*} v Response value.
 *
 * @see $najax.state
 * @see $najax.define.msg
 *
 * @see $najax@ex.send
 *
 * @example
 * $najax.define.fail = function(state, msg, v){
 *   alert(msg);
 * };
 */
njx.define.fail = function(state, msg, v){
	alert(msg);
};

/**
 * Default verify method for $najax.send / $najax.sendex.
 *
 * <b>Specification</b><br>
 * <code>function(v){ return (v.result == 1); }</code>
 *
 * @name verify
 * @memberof $najax.define
 *
 * @param {*} v Response value.
 * @return {boolean}
 *
 * @see $najax@ex.send
 * @see $najax@ex.sendex
 *
 * @example
 * $najax.define.verify = function(v){
 *   return (v.result == 1);
 * };
 */
njx.define.verify = function(v){
	return (v.result == 1);
};

/**
 * Default success-message method for $najax.sendex.
 *
 * <b>Specification</b><br>
 * Show message by <i>$any.floating.msg</i>
 *
 * @name successex
 * @memberof $najax.define
 *
 * @param {string} msg Message. See <i>$najax.define.msg</i>.
 * @param {*} v Response value.
 *
 * @see $najax.define.msg
 * @see $najax@ex.sendex
 *
 * @example
 * $najax.define.successex = function(msg, v){
 *   $any.floating.msg(msg);
 * }
 */
njx.define.successex = function(msg, v){
	$any.floating.msg(msg);
};

/**
 * Default fail-message method for $najax.sendex.
 *
 * <b>Specification</b><br>
 * Show message by <i>$any.floating.msg</i>
 *
 * @name failex
 * @memberof $najax.define
 *
 * @param {string} msg Message. See <i>$najax.define.msg</i>.
 * @param {*} v Response value.
 *
 * @see $najax.define.msg
 * @see $najax@ex.sendex
 *
 * @example
 * $najax.define.failex = function(type, msg, v){
 *   $any.floating.msg(msg, null, {css: 'error'});
 * }
 */
njx.define.failex = function(type, msg, v){
	$any.floating.msg(msg, null, {css: 'error'});
};

/**
 * @ignore
 */
function sdMsg(v, xhr, r, o){
	var tp = 0;

	if (xhr.status != 200){
		tp = njx.state.ajax;
	}else if (!v){
		tp = njx.state.empty;
	}else if (o.verify && !o.verify(v)){
		tp = njx.state.verify;
	}else if (r === false){
		tp = njx.state.app;
	}

	if (tp == 0){
		if (o.success){
			o.success(o.msg[tp], v);
		}
	}else{
		if (o.fail){
			o.fail(tp, o.msg[tp], v);
		}
	}
}

/**
 * Simple ajax request with verifying automatically and showing messages.
 *
 * @function send
 * @memberof $najax@ex
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @param {function} [opt.success=null] Success function.
 * @param {function} [opt.fail=$najax.define.fail] Fail function.
 * @param {function} [opt.verify=null] Verify function. If null, not verify. <code>Ex: {verify: $najax.define.verify}</code>
 * @param {assoc} [opt.msg=$najax.define.msg] Messages.
 * @returns {Nx}
 *
 * @see $najax.define.fail
 * @see $najax.define.verify
 * @see $najax.define.msg
 * @see $najax.request
 *
 * @tutorial najax-ex
 * @example
 * $najax.send('path.php').done();
 * $najax.send('path.php', null, {verify: $najax.define.verify}).done();
 * $najax.send('path.php', null, {verify: function(v){ return (v.verify)?true:false; } }).done();
 * $najax.send('path.php', null, {msg: {0: 'OK', 4: 'Application error!!'} }).done();
 */
njx.send = function(url, vs, opt){
	opt = ext(ext({}, {
		success: null,
		fail: njx.define.fail,
		verify: null,
		msg: njx.define.msg
	}, true), opt, true);

	return njx.request(url, vs, opt).__set('__after', function(v, xhr, r){
		sdMsg(v, xhr, r, opt);
	});
};

/**
 * Ajax request with verifying automatically and showing messages by $any.floating.msg, showing loading message.
 *
 * <b>Requires</b><br>
 * jQuery / any.js
 *
 * @function sendex
 * @memberof $najax@ex
 *
 * @param {string} url URL.
 * @param {assoc} [vs=null] Parameters for GET / POST.
 * @param {assoc} [opt] Nx options.
 * @param {function} [opt.success=$najax.define.successex] Success function.
 * @param {function} [opt.fail=$najax.define.failex] Fail function.
 * @param {function} [opt.verify=null] Verify function. If null, not verify. <code>Ex: {verify: $najax.define.verify}</code>
 * @param {assoc} [opt.msg=$najax.define.msg] Messages.
 * @param {string} [opt.loading='loading'] Loading CSS name.
 * @returns {Nx}
 *
 * @see $najax.define.successex
 * @see $najax.define.failex
 * @see $najax.define.verify
 * @see $najax.define.msg
 * @see $najax@ex.send
 * @see $najax.request
 *
 * @tutorial najax-ex
 * @example
 * $najax.sendex('path.php').done();
 * $najax.sendex('path.php', null, {verify: $najax.define.verify}).done();
 * $najax.sendex('path.php', null, {verify: function(v){ return (v.verify)?true:false; } }).done();
 * $najax.sendex('path.php', null, {msg: {0: 'OK', 4: 'Application error!!'} }).done();
 */
njx.sendex = function(url, vs, opt){
	opt = ext(ext({}, {
		success: njx.define.successex,
		fail: njx.define.failex,
		verify: null,
		msg: njx.define.msg,
		loading: 'loading'
	}, true), opt);

	return njx.send(url, vs, opt).__set('__before', function(){
		$any.floating.loading(true, {css: opt.loading});
	}).__set('__after', function(v, xhr, r){
		$any.floating.loading(false);

		sdMsg(v, xhr, r, opt);
		opt = null;
	});
};

/**
 * $najax helper class.
 *
 * <b><i>Note! Not included in najax-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @namespace $najax@class
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @see Singular
 * @see Pager
 * @see Reflector
 *
 * @example
 * var Singular = $najax.Singular();
 *
 * var Pager = $najax.Pager();
 *
 * var Reflector = $najax.Reflector();
 */

/**
 * RESTful class.
 *
 * @class RESTful
 */
var RESTful = function(url){
	this.url(url);

	this._error = null;
	this._header = {};
};

ext(RESTful.prototype, {
	index: function(){
		return this._prepare($najax.request(this._url + '/'));
	},
	create: function(vs){
		return this._prepare($najax.request(this._url + '/', vs).opt('method', 'POST'));
	},
	show: function(id){
		return this._prepare($najax.request(this._url + '/' + id + '/'));
	},
	update: function(id, vs){
		return this._prepare($najax.request(this._url + '/' + id + '/', vs).opt('method', 'PUT'));
	},
	destroy: function(id){
		return this._prepare($najax.request(this._url + '/' + id + '/').opt('method', 'DELETE'));
	},
	url: function(v){
		if (v) {
			v = v.replace(/\/$/, '');
			this._url = v;
		}

		return this;
	},
	error: function(fn){
		this._error = fn;

		return this;
	},
	headers: function(vs){
		this._header = vs;

		return this;
	},
	_prepare: function(o){
		if (this._error) {
			o.fail(this._error);
		}

		if (this._header){
			o.header(this._header);
		}

		return o;
	}
});

/**
 * RESTful-class builder.
 *
 * @function RESTful
 * @memberof $najax@class
 * @returns {RESTful} RESTful class.
 *
 * @see RESTful
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 */
njx.RESTful = function(){
	return RESTful;
};

/**
 * Singular class. Provide single-access.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @class Singular
 *
 * @param {function} [caller] Caller function.
 * @param {function} [error] Error function.
 *
 * @see $najax@class.Singular
 * @see Relay
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @example
 * var Singular = $najax.Singular();
 * var singular = new Singular();
 *
 * single.caller(function(){ ... return rl; });  //Set caller.
 * single.kick();  //Begin.
 * btn.onclick = single.kicker();  //Begin.
 */
var Singular = function(caller, error){
	this._run = false;

	this._caller = caller;
	this._error = error;
};

ext(Singular.prototype, {
	/**
	 * Kick method for bind.
	 * @function
	 * @name kick
	 * @memberof Singular
	 * @instance
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * singular.kick();
	 */
	kick: function(){
		if (this._run){
			if (this._error){
				this._error.apply(this, arguments);
			}

			return;
		}else{
			this._run = true;
		}

		var rl = this._caller.apply(this, arguments);

		njx.linker(rl).done(bind(this, function(){
			this._run = false;
		}));
	},
	/**
	 * Return <i>kick</i> method for bind. <i>this</i> in <i>kick</i> method is Singular object.
	 * @function
	 * @name kicker
	 * @memberof Singular
	 * @instance
	 *
	 * @returns {function} <i>kick</i> method.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * btn.onclick = singular.kicker();
	 */
	kicker: function(){
		return bind(this, this.kick);
	},
	/**
	 * Set caller function. The caller function must returns <code>Relay object</code>.
	 *
	 * <b>Function specification</b>
	 * <code>function(any:*){ ... return {Relay}; }</code>
	 *
	 * @function
	 * @name caller
	 * @memberof Singular
	 * @instance
	 *
	 * @param {function} fn Caller function. <code>function(any:*){ ... return {Relay}; }</code>
	 *
	 * @see Relay
	 * @tutorial najax-class
	 *
	 * @example
	 * singular.caller(fn);
	 * singular.caller(function(){ return $najax.request(url).done(function(data){ ... }); });
	 */
	caller: function(fn){
		this._caller = fn;
	},
	/**
	 * Set error function.
	 * @function
	 * @name error
	 * @memberof Singular
	 * @instance
	 *
	 * @param {function} fn Error function.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * singular.error(fn);
	 */
	error: function(fn){
		this._error = fn;
	}
});


/**
 * Singular class builder.
 *
 * @function Singular
 * @memberof $najax@class
 *
 * @returns {Singular} Singular class.
 *
 * @see Singular
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @example
 * var Singular = $najax.Singular();
 * var singular = new Singular();
 *
 * single.caller(function(){ ... return rl; });  Set caller.
 * single.kick();  //Begin.
 * btn.onclick = single.kicker();  //Begin.
 */
njx.Singular = function(){
	return Singular;
};

/**
 * Pager class. Provide paging methods.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @class Pager
 *
 * @param {function} [fn] Callback function.
 * @param {number} [len] Item length.
 * @param {assoc} [opt] Option.
 * @param {string} [opt.n='n'] Variable name of page number.
 * @param {string} [opt.len='len'] Variable name of item length.
 * @param {string} [opt.all='all'] Variable name of all item length.
 *
 * @see $najax@class.Pager
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @example
 * var Pager = $najax.Pager();
 * var pager = new Pager(function(n, len){... $najax.get('send.php', {n: n, len: len}) ... });
 * var pager = new Pager(null, null, {n: 'pg'});
 *
 * pager.len(15);    //set length of page's items
 * pager.current();  //current
 * pager.move(5);   //move
 * pager.prev();      //prev
 * pager.next();      //next
 * pager.data();     //get data
 * pager.data({all: 100, n:1}); //set data
 * pager.func(fn);  //set function
 */
var Pager = function(fn, len, opt){
	this._filter = fn || null;
	this._len = null;
	this.len(len);
	this._opt = ext({n:'n', len:'len', all:'all'}, opt);

	this._n = 1;
	this._all = -1;
	this._max = -1;
};

ext(Pager.prototype, {
	/**
	 * Set item-length or get item-length.
	 * @function
	 * @name len
	 * @memberof Pager
	 * @instance
	 *
	 * @param {number} [v] Item length.
	 * @returns {void|number}
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.len(v);
	 * len = pager.len();
	 */
	len: function(v){
		if (v === undefined){
			return this._len;
		}

		this._len = v || 10;
	},
	/**
	 * Current.
	 * @function
	 * @name current
	 * @memberof Pager
	 * @instance
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.current();
	 */
	current: function(){
		this.__up();
	},
	/**
	 * Move.
	 * @function
	 * @name move
	 * @memberof Pager
	 * @instance
	 *
	 * @param {number} [v] Page number.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.move(v);
	 */
	move: function(v){
		this._n = v;
		this.__up();
	},
	/**
	 * Previous.
	 * @function
	 * @name prev
	 * @memberof Pager
	 * @instance
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.prev();
	 */
	prev: function(){
		this._n--;
		this.__up();
	},
	/**
	 * Next.
	 * @function
	 * @name next
	 * @memberof Pager
	 * @instance
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.next();
	 */
	next: function(){
		this._n++;
		this.__up();
	},
	/**
	 * Set data or get data.
	 * @function
	 * @name data
	 * @memberof Pager
	 * @instance
	 *
	 * @param {assoc} [data] Data. <code>{n:n, len:len, all: all}</code>
	 * @returns {void|assoc} <b>assoc</b> {n:n, len:len, all: all, max: max}
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.data(data);
	 * data = pager.data();
	 */
	data: function(data){
		if (data == null){
			return {n:this._n, len:this._len, all:this._all, max: this._max};
		}

		if (data[this._opt.n]){
			this._n = data[this._opt.n];
		}

		if (data[this._opt.len]){
			this._len = data[this._opt.len];
		}

		if (data[this._opt.all]){
			this._all = data[this._opt.all];
		}

		this.update();
	},
	/**
	 * Set function.
	 * @function
	 * @name func
	 * @memberof Pager
	 * @instance
	 *
	 * @param {function} fn Function.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.func(fn);
	 */
	func: function(fn){
		this._filter = fn;
	},
	/**
	 * Update state.
	 * @function
	 * @name update
	 * @memberof Pager
	 * @instance
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * pager.update();
	 */
	update: function(){
		this._n = (this._n < 1)?1:this._n;

		if (this._all > 0){
			this._max = Math.ceil(this._all/this._len);
			this._n = (this._n > this._max)?this._max:this._n;
		}
	},
	/**
	 * @ignore
	 */
	__up: function(){
		this.update();

		this._filter(this._n, this._len);
	}
});

/**
 * Pager-class builder.
 *
 * @function Pager
 * @memberof $najax@class
 * @returns {Pager} Pager class.
 *
 * @see Pager
 *
 * @tutorial najax-class
 *
 * @example
 * var Pager = $najax.Pager();
 * var pager = new Pager(function(n, len){... $najax.get('send.php', {n: n, len: len}) ... });
 *
 * pager.len(15);		//set length of page's items
 * pager.current();	//current
 * pager.move(5);	//move
 * pager.prev();		//prev
 * pager.next();		//next
 * pager.data();		//get data
 * pager.data({all: 100, n:1});	//set data
 * pager.func(fn);	//set function
 */
njx.Pager = function(){
	return Pager;
};

/**
 * Reflector class. Provide ajax request and reflect to content.
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @class Reflector
 *
 * @param {Nx} [nx=null] Nx object. If null, Create <i>Nx object</i> automatically.
 *
 * @see $najax@class.Reflector
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @example
 * var reflector = new ($najax.Reflector());
 *
 * reflector.render('#target', url);
 * reflector.render('#target', url, {v: v});
 * reflector.render('#target', url, null, function(v){ ... return v; });
 *
 * var Reflector = $najax.Reflector();
 * var nx = $najax.get(null).timeout(5);
 * var reflector = new Reflector(nx);
 *
 * reflector.type('html').render('#target', url);
 * reflector.typeJson(function(v){ ... return v;}).render('#target', url);
 * reflector.type('json').render('#target', url, null, function(v){ return this.list(v.list, function(k, v){ ... return v;}); });
 */
var Reflector = function(nx){
	this._nx = nx || null;
	this._el = null;
	this._type = null;
	this._filter = null;
};

ext(Reflector.prototype, {
	/**
	 * Set and get Nx object.
	 *
	 * @function
	 * @name nx
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {Nx} [nx] Nx object.
	 * @returns {void|Nx}
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * var nx = $najax.get(null).retry(1);
	 * reflector.nx(nx);       //Set
	 *
	 * vsr nx = reflector.nx(); //Get
	 */
	nx: function(nx){
		if (nx === undefined){
			return this._nx;
		}

		this._nx = nx;

		return this;
	},
	/**
	 * Set type and filter function.
	 *
	 * @function
	 * @name type
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {string} type Type. <code>raw(default), text</code> / <code>html</code> / <code>json</code> / <code><i>any other Nx.type</i></code>
	 * @param {function} [filter] Filter function. <code>function(v:*){ return {string}; }</code>
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.type('html');
	 * reflector.type('json');
	 * reflector.type('raw');
	 * reflector.type(null, function(v){ ... return v;});
	 * reflector.type('json', function(v){ ... return v;});
	 */
	type: function(type, filter){
		this._type = type;
		this.filter(filter);

		return this;
	},
	/**
	 * Set <i>Json</i> type. Wrapper of <i>type</i> method.
	 *
	 * @function
	 * @name typeJson
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {function} [filter] Filter function. <code>function(v:*){ return {string}; }</code>
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.typeJson();
	 * reflector.typeJson(function(v){ ... return v;});
	 */
	typeJson: function(filter){
		this.type('json', filter);

		return this;
	},
	/**
	 * Set <i>HTML</i> type. Wrapper of <i>type</i> method.
	 *
	 * @function
	 * @name typeHtml
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {function} [filter] Filter function. <code>function(v:*){ return {string}; }</code>
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.typeHtml();
	 * reflector.typeHtml(function(v){ ... return v;});
	 */
	typeHtml: function(filter){
		this.type('json', filter);

		return this;
	},
	/**
	 * Set filter function.
	 *
	 * @function
	 * @name filter
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {function} [fn] Filter function. <code>function(v:*){ return {string}; }</code>
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.filter(function(v){ ... return v;});
	 */
	filter: function(fn){
		this._filter = fn || null;

		return this;
	},
	/**
	 * Create combined string by assoc and function.
	 *
	 * @function
	 * @name list
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {array|assoc} vs Array or Assoc values.
	 * @param {function} fn Filter function for single item. <code>function(v:*){ return {string}; }</code>
	 * @returns {string} Combined string.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.filter(function(v){ return this.list(v.list){ return v.a + ', ' + v.b; } });
	 * reflector.jsonType(function(v){ return this.list(v.list){ return v.a + ', ' + v.b; } });
	 */
	list: function(vs, fn){
		var r = '';

		for (var k in vs){
			if (vs.hasOwnProperty(k)){
				r += fn(k, vs[k]);
			}
		}

		return r;
	},
	/**
	 * Ajax & render to content.
	 *
	 * @function
	 * @name render
	 * @memberof Reflector
	 * @instance
	 *
	 * @param {string|Element} el Element or Element selector.
	 * @param {string} url URL.
	 * @param {assoc} [vs] URL parameter values.
	 * @param {function} [filter] Filter function. See <i>Reflector.filter</i> for detail.
	 * @returns {Relay} <i>Relay</i> object by <i>Nx.done</i>.
	 *
	 * @tutorial najax-class
	 *
	 * @example
	 * reflector.filter(function(v){ return this.list(v.list){ return v.a + ', ' + v.b; } });
	 * reflector.jsonType(function(v){ return this.list(v.list){ return v.a + ', ' + v.b; } });
	 */
	render: function(el, url, vs, filter){
		this._el = el;

		if (!this._nx){
			this._nx = $najax.get(null);
		}

		this._nx.type((this._type == 'html')?'raw':this._type);

		return this._nx.url(url).param(vs).__set('__after', this.__apply(filter)).clean(false).done();
	},
	/**
	 * @ignore
	 */
	__apply: function(fn){
		return bind(this, function(v){
			var el = (typeof this._el === 'string')?document.querySelector(this._el):this._el;
			v = this.__filter(fn, v);

			if (typeof v === 'object'){
				console.error("Can't render object.");
				return;
			}

			switch (this._type){
			case 'html':
				njx.parseHTML(el, v);
				break;
			case 'json':
			case 'raw':
			default:
				el.innerHTML = v;
				break;
			}
		});
	},
	/**
	 * @ignore
	 */
	__filter: function(fn, v){
		if (!fn && !this._filter){
			return v;
		}

		return (fn || this._filter).call(this, v);
	}
});

/**
 * Reflector-class builder.
 *
 * @function Reflector
 * @memberof $najax@class
 * @returns {Reflector} Reflector class.
 *
 * @see Reflector
 *
 * @tutorial najax-class
 * @tutorial demo-ui-ajax
 *
 * @example
 * var reflector = new ($najax.Reflector());
 *
 * reflector.render('#target', url);
 * reflector.render('#target', url, {v: v});
 * reflector.render('#target', url, null, function(v){ ... return v; });
 *
 * var Reflector = $najax.Reflector();
 * var nx = $najax.get(null).timeout(5);
 * var reflector = new Reflector(nx);
 *
 * reflector.type('html').render('#target', url);
 * reflector.typeJson(function(v){ ... return v;}).render('#target', url);
 * reflector.type('json').render('#target', url, null, function(v){ return this.list(v.list, function(k, v){ ... return v;}); });
 */
njx.Reflector = function(){
	return Reflector;
};


/**
 * Support history push and replace, listen.
 *
 * <b><i>Note! Not included in najax-tiny.js.</i></b><br>
 *
 * | Method | Default ver | Tiny ver |
 * |:---|:---:|:---:|
 * | All methods | Yes | - |
 *
 * @namespace $najax.history
 *
 * @tutorial static-history
 *
 * @example
 * //push
 * $najax.history.push('?v=1');
 * $najax.history.push('?v=1', null, 'abc');
 * $najax.history.pushQuery();
 *
 * //replace
 * $najax.history.replace('?v=1');
 * $najax.history.replace('?v=1', null, 'abc', {data: {v: 2}});
 * $najax.history.replaceQuery('abc', {v: 2});
 *
 * //listen
 * $najax.history.listen(function(e, id, vs, title){ ... });
 *
 * //init
 * $najax.history.replaceListen(function(e, id, vs, title){ ... });
 */
njx.history = {};

/**
 * @ignore
 */
var hsRpl = false;
var hsLtn = false;


/**
 * Push new page's url and title, values. Recommend to use this method with <i>$najax.history.listen</i>.
 * @function push
 * @memberof $najax.history
 *
 * @param {string} url URL.
 * @param {string|integer} [id=null] Page's id.
 * @param {string} [title=null] Title.
 * @param {assoc} [opt] Options.
 * @param {assoc} [opt.data=null] Passed values.
 * @param {assoc} [opt.store=true] Store first page's data by <i>$najax.history.replace</i>.
 * @param {function} [opt.legacy=null] Legacy browser's behaviors. <code>Ex: function(url, title, vs){location.href = url;}</code>
 *
 * @see $najax.history.pushQuery
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.push('?v=1');
 * $najax.history.push('?v=1', id, 'abc', {data: {v: 2}});
 * $najax.history.push('?v=1', null, null, {legacy: function(url, id, title, vs){ ... } });
 */
njx.history.push = function(url, id, title, opt){
	opt = ext({data:null, store: true, legacy: null}, opt);

	id = (id !== undefined)?id:null;
	title = (title !== undefined)?title:null;

	if (history.pushState){
		if (opt.store && !hsRpl){
			njx.history.replace();
		}

		history.pushState({id: id, title: title, data: opt.data}, title, url);
	}else{
		if (opt.legacy){
			opt.legacy.call(null, url, id, title, opt.data);
		}
	}
};

/**
 * Push new page's url and title, values. Support query-string. Recommend to use this with <i>$najax.history.listen</i>.
 * @function pushQuery
 * @memberof $najax.history
 *
 * @param {string|integer} [id=null] Page's id.
 * @param {string} [title=null] Title. If null, set now title.
 * @param {assoc} [vs=null] Passed values. URL's query-string values is overrided by this values.
 * @param {assoc} [opt] Options. $najax.history.push options.
 *
 * @see $najax.history.pushQuery
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.pushQuery();
 * $najax.history.pushQuery(id, 'abc', vs, {data: {v: 2}});
 * $najax.history.pushQuery(null, 'abc', null, {title: false});
 */
njx.history.pushQuery = function(id, title, vs, opt){
	var u = njx.url(location.href, vs);

	njx.history.push(u, id, title, vs, opt);
};

/**
 * Replace now page's url and title, values.
 * @function replace
 * @memberof $najax.history
 *
 * @param {string} [url] URL. If null, prepare now url.
 * @param {string|integer} [id=null] Page's id.
 * @param {string} [title=null] Title. If null, set now title.
 * @param {assoc} [opt] Options.
 * @param {assoc} [opt.data=null] Passed values.
 * @param {function} [opt.legacy=null] Legacy browser's behaviors. <code>Ex: function(url, title, vs){location.replace = url;}</code>
 *
 * @see $najax.history.replaceQuery
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.replace('?v=1');
 * $najax.history.replace('?v=1', id, 'abc', {data: {v: 2}});
 * $najax.history.replace('?v=1', null, null, {legacy: function(url, id, title, vs){ ... } });
 */
njx.history.replace = function(url, id, title, opt){
	opt = ext({data:null, legacy: null}, opt);

	hsRpl = true;

	if (url == null){
		url = location.href;
	}

	if (title == null){
		title = document.title;
	}

	if (history.pushState){
		history.replaceState({id: id, title: title, data: opt.data}, title, url);
	}else{
		if (opt.legacy){
			opt.legacy.call(null, url, id, title, opt.data);
		}
	}
};

/**
 * Replace now page's url and title, values. Support query-string.
 * @function replaceQuery
 * @memberof $najax.history
 *
 * @param {string|integer} [id=null] Page's id.
 * @param {string} [title=null] Title. If null, set now title.
 * @param {assoc} [vs=null] Passed values. URL's query-string values is overrided by this values.
 * @param {assoc} [opt] Options. $najax.history.replace options.
 *
 * @see $najax.history.replace
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.replaceQuery();
 * $najax.history.replaceQuery(id, 'abc', vs, {data: {v: 2}});
 * $najax.history.replaceQuery(null, 'abc', null, {title: false});
 */
njx.history.replaceQuery = function(id, title, vs, opt){
	var u = njx.url(location.href, vs);

	njx.history.replace(u, id, title, vs, opt);
};

/**
 * Listen to event of browser's back and prev.
 * @function listen
 * @memberof $najax.history
 *
 * @param {function} fn Callback function. <code>function(e:event, title:string, vs:assoc){ ... }</code>
 * @param {assoc} [opt] Options.
 * @param {boolean} [opt.title=true] Change title automatically.
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.listen(function(e, id, title, data){ ... });
 */
njx.history.listen = function(fn, opt){
	opt = ext({title: true}, opt);

	hsLtn = true;

	if (history.pushState){
		window.onpopstate = function(e){
			var id=null, title=null, data=null;

			if (e.state){
				id = e.state.id || null;
				title = e.state.title || null;
				data = e.state.data || null;
			}

			if (fn){
				fn.call(null, e, id, title, data);
			}

			if (opt.title && title != null){
				document.title = title;
			}
		};
	}
};

/**
 * Replace & replace now.
 * @function init
 * @memberof $najax.history
 *
 * @param {function} fn Callback function. <code>function(e:event, title:string, vs:assoc){ ... }</code>
 * @param {string|integer} [id=null] Page's id.
 * @param {string} [title=null] Title.
 * @param {assoc} [opt] Options. <i>$najax.history.listen, $najax.history.replace</i>'s options.
 * @param {assoc} [opt.data=null] Passed values.
 *
 * @tutorial static-history
 *
 * @example
 * $najax.history.replaceListen(function(e, id, title, data){ ... }, id);
 */
njx.history.replaceListen = function(fn, id, title, opt){
	opt = ext({data: null}, opt);

	njx.history.listen(fn, opt);

	njx.history.replace(null, id, title, opt);
};

/**
 * Get <i>history.state</i>.
 * @function state
 * @memberof $najax.history
 * @returns {assoc}
 *
 * @tutorial static-history
 *
 * @example
 * vs = $najax.history.state();
 */
njx.history.state = function(){
	return history.state || null;
};

})($najax);
