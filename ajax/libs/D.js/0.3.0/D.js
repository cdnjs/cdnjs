/**
* attempt of a simple defer/promise library for mobile development
* @author Jonathan Gotti < jgotti at jgotti dot net>
* @since 2012-10
* @changelog
*           - 2013-07-03 - bug correction in promixify method (thx to adrien gibrat )
*           - 2013-06-22 - bug correction in nodeCapsule method
*           - 2013-06-17 - remove unnecessary Array.indexOf method dependency
*           - 2013-04-18 - add try/catch block around nodeCapsuled methods
*           - 2013-04-13 - check promises/A+ conformity
*                        - make some minication optimisations
*           - 2013-03-26 - add resolved, fulfilled and rejected methods
*           - 2013-03-21 - browser/node compatible
*                        - new method nodeCapsule
*                        - simpler promixify with full api support
*           - 2013-01-25 - add rethrow method
*                        - nextTick optimisation -> add support for process.nextTick + MessageChannel where available
*           - 2012-12-28 - add apply method to promise
*           - 2012-12-20 - add alwaysAsync parameters and property for default setting
*/
(function(undef){
	"use strict";

	var nextTick
		, isFunc = function(f){ return (f instanceof Function); }
		, isNotVal = function(v){ return (v === false || v === undef || v === null); }
		, slice = function(a, offset){ return [].slice.call(a, offset); }
		, undefStr = 'undefined'
	;
	if ( (typeof process !== undefStr) && process.nextTick ) {
		nextTick = process.nextTick;
	} else if ( typeof MessageChannel !== undefStr ) {
		var ntickChannel = new MessageChannel(), queue = [];
		ntickChannel.port1.onmessage = function(){ queue.length && (queue.shift())(); };
		nextTick = function(cb){
			queue.push(cb);
			ntickChannel.port2.postMessage(0);
		};
	} else {
		nextTick = function(cb){ setTimeout(cb, 0); };
	}
	function rethrow(e){ nextTick(function(){ throw e;}); }

	/**
	* @param {boolean} [alwaysAsync] if set force the async resolution for this promise independantly of the D.alwaysAsync option
	* @return {promise: {then: Function, success: Function, error: Function, apply: Function, rethrow: Function, isPending: Function, getStatus: Function}, resolve: Function, fulfill: Function, reject: Function}
	 * defered object with property 'promise' and methods reject,fulfill,resolve (fulfill being an alias for resolve)
	*/
	var defer = function (alwaysAsync){
		var alwaysAsyncFn = (undef !== alwaysAsync ? alwaysAsync : defer.alwaysAsync) ? nextTick : function(fn){fn();}
			, status = 0 // -1 failed | 1 fulfilled
			, pendings = []
			, onlyFuncs=defer.onlyFuncs
			, value
			, _promise  = {
				then: function(fulfilled, failed){
					var d = defer();
					pendings.push([
						function(value){
							try{
								if( isNotVal(fulfilled)){
									d.resolve(value);
								} else {
									d.resolve(isFunc(fulfilled) ? fulfilled.call(null, value) : (onlyFuncs ? value : fulfilled));
								}
							}catch(e){
								d.reject(e);
							}
						}
						, function(err){
							if ( isNotVal(failed) || ((!isFunc(failed)) && onlyFuncs) ) {
								d.reject(err);
							}
							if ( failed ) {
								try{ d.resolve(isFunc(failed) ? failed.call(null, err) : failed); }catch(e){ d.reject(e);}
							}
						}
					]);
					status !== 0 && alwaysAsyncFn(execCallbacks);
					return d.promise;
				}
				, success: function(fulfilled){ return this.then(fulfilled, undef); }
				, error: function(failed){ return this.then(undef, failed); }
				, apply: function(fulfilled, failed){
					return this.then(
						function(a){ return isFunc(fulfilled) ? fulfilled.apply(null, a) : (onlyFuncs ? a : fulfilled);}
						, failed || undef
					);
				}
				, rethrow: function(failed){
					return this.then(
						undef
						, failed ? function(err){ failed(err); throw err; } : rethrow
					);
				}
				, isPending: function(){ return !!(status === 0); }
				, getStatus: function(){ return status; }
			}
		;
		_promise.toSource = _promise.toString = _promise.valueOf = function(){return value === undef ? this : value; };

		function execCallbacks(){
			if ( status === 0 ) {
				return;
			}
			var cbs = pendings, i = 0, l = cbs.length, cbIndex = ~status ? 0 : 1, cb;
			pendings = [];
			for( ; i < l; i++ ){
				(cb = cbs[i][cbIndex]) && cb.call(null, value);
			}
		}

		function _resolve(val){
			if ( status ) {
				return this;
			}
			if ( val && isFunc(val.then) ) { // managing a promise
				val.then(_resolve, _reject);
				return this;
			}
			alwaysAsyncFn(function(){
				value = val;
				status = 1;
				execCallbacks();
			});
			return this;
		}

		function _reject(Err){
			status === 0 && alwaysAsyncFn(function(){
				try{ throw(Err); }catch(e){ value = e; }
				status = -1;
				execCallbacks();
			});
			return this;
		}
		return {
			promise:_promise
			,resolve:_resolve
			,fulfill:_resolve // alias
			,reject:_reject
		};
	};


	defer.defer = defer;
	defer.nextTick = nextTick;
	defer.alwaysAsync = true; // setting this will change default behaviour. use it only if necessary as asynchronicity will force some delay between your promise resolutions and is not always what you want.
	/*
	* setting onlyFuncs to false will break promises/A+ conformity in that it will allow you to pass non undefined/null values instead of callbacks
	* instead of just ignoring any non function parameters to then,success,error... it will accept non null|undefined values.
	* this will allow you shortcuts like promise.then('val','handled error'')
	* to be equivalent of promise.then(function(){ return 'val';},function(){ return 'handled error'})
	*/
	defer.onlyFuncs = true;
	defer.resolved = defer.fulfilled = function(value){ return defer(true).resolve(value).promise; };
	defer.rejected = function(reason){ return defer(true).reject(reason).promise; };
	//-- return a promise which will be resolved in time ms
	defer.wait = function(time){
		var d = defer();
		setTimeout(d.resolve, time || 0);
		return d.promise;
	};
	//-- return a promise for the return value of fn which will be resolved in delay ms
	defer.delay = function(fn, delay){
		var d = defer();
		setTimeout(function(){ try{ d.resolve(fn.apply(null)); }catch(e){ d.reject(e); } }, delay || 0);
		return d.promise;
	};
	//-- if given value is not a promise return a fulfilled promise resolved to given value
	defer.promisify = function(promise){
		if ( promise && isFunc(promise.then) ) { return promise;}
		return defer.resolved(promise);
	};

	function multiPromiseResolver(callerArguments, returnPromises){
		var promises = slice(callerArguments);
		if ( promises.length === 1 && ( promises[0] instanceof Array) ) {
			if(! promises[0].length ){
				return defer.fulfilled([]);
			}
			promises = promises[0];
		}
		var args = []
			, d = defer()
			, c = promises.length
		;
		if ( !c ) {
			d.resolve(args);
		} else {
			var resolver = function(i){
				promises[i] = defer.promisify(promises[i]);
				promises[i].then(
					function(v){
						if (! (i in args) ) { //@todo check this is still required as promises can't be resolve more than once
							args[i] = returnPromises ? promises[i] : v;
							(--c) || d.resolve(args);
						}
					}
					, function(e){
						if(! (i in args) ){
							if( ! returnPromises ){
								d.reject(e);
							} else {
								args[i] = returnPromises ? promises[i] : v;
								(--c) || d.resolve(args);
							}
						}
					}
				);
			};
			for( var i = 0, l = c; i < l; i++ ){
				resolver(i);
			}
		}
		return d.promise;
	}
	//-- return a promise for all given promises / values reject on first error resolved with list of resolved value
	defer.all = function(){ return multiPromiseResolver(arguments,false); };
	//-- return a promise for all given promises / values always resolved with list of promises passed as arguments (non promise values are promisified)
	defer.resolveAll = function(){ return multiPromiseResolver(arguments,true); };

	defer.nodeCapsule = function(subject, fn){
		if ( !fn ) {
			fn = subject;
			subject = void(0);
		}
		return function(){
			var d = defer(), args = slice(arguments);
			args.push(function(err, res){
				err ? d.reject(err) : d.resolve(arguments.length > 2 ? slice(arguments, 1) : res);
			});
			try{
				fn.apply(subject, args);
			}catch(e){
				d.reject(e);
			}
			return d.promise;
		};
	};

	(typeof window !== undefStr) ? ( window.D = defer) : ( module.exports = defer);
})();
