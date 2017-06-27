/*!
 * Relay-Linker ver 1.0.2 - rlk.js
 * (c) any-js - https://github.com/any-js/najaxjs/
 * Released under the MIT license
 */
var $rlk = {};

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

})($rlk);
