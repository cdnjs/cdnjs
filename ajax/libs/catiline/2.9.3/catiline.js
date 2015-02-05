/*! catiline 2.9.3 2013-10-25*/
/*!©2013 Calvin Metcalf @license MIT https://github.com/calvinmetcalf/catiline */
if (typeof document === 'undefined') {
	self._noTransferable=true;
	self.onmessage=function(e){
		/*jslint evil: true */
		eval(e.data);
	};
} else {
(function(global){
	'use strict';
//overall structure based on when
//https://github.com/cujojs/when/blob/master/when.js#L805-L852
var nextTick;
var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
/*if (typeof setImmediate === 'function') {
	nextTick = setImmediate.bind(global,drainQueue);
}else */if(MutationObserver){
	//based on RSVP
	//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/async.js
	var observer = new MutationObserver(drainQueue);
	var element = document.createElement('div');
	observer.observe(element, { attributes: true });

	// Chrome Memory Leak: https://bugs.webkit.org/show_bug.cgi?id=93661
	addEventListener('unload', function () {
		observer.disconnect();
		observer = null;
	}, false);
	nextTick =   function () {
		element.setAttribute('drainQueue', 'drainQueue');
	};
}else{
	var codeWord = 'com.catiline.setImmediate' + Math.random();
	addEventListener('message', function (event) {
		// This will catch all incoming messages (even from other windows!), so we need to try reasonably hard to
		// avoid letting anyone else trick us into firing off. We test the origin is still this window, and that a
		// (randomly generated) unpredictable identifying prefix is present.
		if (event.source === window && event.data === codeWord) {
			drainQueue();
		}
	}, false);
	nextTick =  function() {
		postMessage(codeWord, '*');
	};
}
var mainQueue = [];

/**
 * Enqueue a task. If the queue is not currently scheduled to be
 * drained, schedule it.
 * @param {function} task
 */
catiline.nextTick = function(task) {
	if (mainQueue.push(task) === 1) {
		nextTick();
	}
};

/**
 * Drain the handler queue entirely, being careful to allow the
 * queue to be extended while it is being processed, and to continue
 * processing until it is truly empty.
 */
function drainQueue() {
	var i = 0;
	var task;
	var innerQueue = mainQueue;
	mainQueue = [];
	/*jslint boss: true */
	while (task = innerQueue[i++]) {
		task();
	}

}

var func = 'function';
// Creates a deferred: an object with a promise and corresponding resolve/reject methods
function Deferred() {
	// The `handler` variable points to the function that will
	// 1) handle a .then(onFulfilled, onRejected) call
	// 2) handle a .resolve or .reject call (if not fulfilled)
	// Before 2), `handler` holds a queue of callbacks.
	// After 2), `handler` is a simple .then handler.
	// We use only one function to save memory and complexity.
	var handler = function(onFulfilled, onRejected, value) {
		// Case 1) handle a .then(onFulfilled, onRejected) call
		if (onFulfilled !== handler) {
			var createdDeffered = createDeferred();
			handler.queue.push({
				deferred: createdDeffered,
				resolve: onFulfilled,
				reject: onRejected
			});
			return createdDeffered.promise;
		}

		// Case 2) handle a .resolve or .reject call
		// (`onFulfilled` acts as a sentinel)
		// The actual function signature is
		// .re[ject|solve](sentinel, success, value)
		var action = onRejected ? 'resolve' : 'reject';
		for (var i = 0, l = handler.queue.length; i < l; i++) {
			var queue = handler.queue[i];
			var deferred = queue.deferred;
			var callback = queue[action];
			if (typeof callback !== func) {
				deferred[action](value);
			}
			else {
				execute(callback, value, deferred);
			}
		}
		// Replace this handler with a simple resolved or rejected handler
		handler = createHandler(promise, value, onRejected);
	};

	function Promise() {
		this.then = function(onFulfilled, onRejected) {
			return handler(onFulfilled, onRejected);
		};
	}
	var promise = new Promise();
	this.promise = promise;
	// The queue of deferreds
	handler.queue = [];

	this.resolve = function(value) {
		if (handler.queue) {
			handler(handler, true, value);
		}
	};

	this.fulfill = this.resolve;

	this.reject = function(reason) {
		if (handler.queue) {
			handler(handler, false, reason);
		}
	};
}

function createDeferred() {
	return new Deferred();
}

// Creates a fulfilled or rejected .then function
function createHandler(promise, value, success) {
	return function(onFulfilled, onRejected) {
		var callback = success ? onFulfilled : onRejected;
		if (typeof callback !== func) {
			return promise;
		}
		var result = createDeferred();
		execute(callback, value, result);
		return result.promise;
	};
}

// Executes the callback with the specified value,
// resolving or rejecting the deferred
function execute(callback, value, deferred) {
	catiline.nextTick(function() {
		try {
			var result = callback(value);
			if (result && typeof result.then === func) {
				result.then(deferred.resolve, deferred.reject);
			}
			else {
				deferred.resolve(result);
			}
		}
		catch (error) {
			deferred.reject(error);
		}
	});
}
catiline.deferred = createDeferred;
// Returns a resolved promise
catiline.resolve = function(value) {
	var promise = {};
	promise.then = createHandler(promise, value, true);
	return promise;
};
// Returns a rejected promise
catiline.reject = function(reason) {
	var promise = {};
	promise.then = createHandler(promise, reason, false);
	return promise;
};
// Returns a deferred

catiline.all = function(array) {
	var promise = createDeferred();
	var len = array.length;
	var resolved = 0;
	var out = [];
	var onSuccess = function(n) {
		return function(v) {
			out[n] = v;
			resolved++;
			if (resolved === len) {
				promise.resolve(out);
			}
		};
	};
	array.forEach(function(v, i) {
		v.then(onSuccess(i), function(a) {
			promise.reject(a);
		});
	});
	return promise.promise;
};
catiline._hasWorker = typeof Worker !== 'undefined'&&typeof fakeLegacy === 'undefined';
catiline.URL = window.URL || window.webkitURL;
catiline._noTransferable=!catiline.URL;
//regex out the importScript call and move it up to the top out of the function.
function regexImports(string){
	var rest=string;
	var match = true;
	var matches = {};
	var loopFunc = function(a,b){
		if(b){
			'importScripts('+b.split(',').forEach(function(cc){
				matches[catiline.makeUrl(cc.match(/\s*[\'\"](\S*)[\'\"]\s*/)[1])]=true; // trim whitespace, add to matches
			})+');\n';
		}
	};
	while(match){
		match = rest.match(/(importScripts\(.*?\);?)/);
		rest = rest.replace(/(importScripts\(\s*(?:[\'\"].*?[\'\"])?\s*\);?)/,'\n');
		if(match){
			match[0].replace(/importScripts\(\s*([\'\"].*?[\'\"])?\s*\);?/g,loopFunc);
		}
	}
	matches = Object.keys(matches);
	return [matches,rest];
}

function moveImports(string,after){
	var str = regexImports(string);
	var matches = str[0];
	var rest = str[1];
	if(matches.length>0){
		return 'importScripts(\''+matches.join('\',\'')+after+rest;
	}else{
		return rest;
	}
}
function getPath(){
	if(typeof SHIM_WORKER_PATH !== 'undefined'){
		return SHIM_WORKER_PATH;
	}else if('SHIM_WORKER_PATH' in catiline){
		return catiline.SHIM_WORKER_PATH;
	}
	var scripts = document.getElementsByTagName('script');
	var len = scripts.length;
	var i = 0;
	while(i<len){
		if(/catiline(\.min)?\.js/.test(scripts[i].src)){
			return scripts[i].src;
		}
		i++;
	}
}
function appendScript(iDoc,text){
	var iScript = iDoc.createElement('script');
	if (typeof iScript.text !== 'undefined') {
		iScript.text = text;
	} else {
		iScript.innerHTML = text;
	}
	if(iDoc.readyState==='complete'){
		iDoc.documentElement.appendChild(iScript);
	}else{
		iDoc.onreadystatechange=function(){
			if(iDoc.readyState==='complete'){
				iDoc.documentElement.appendChild(iScript);
			}
		};
	}
}
//much of the iframe stuff inspired by https://github.com/padolsey/operative
//most things besides the names have since been changed
function actualMakeI(script,codeword){
	var iFrame = document.createElement('iframe');
	iFrame.style.display = 'none';
	document.body.appendChild(iFrame);
	var iDoc = iFrame.contentWindow.document;
	var text=['try{ ',
	'var __scripts__=\'\';function importScripts(scripts){',
	'	if(Array.isArray(scripts)&&scripts.length>0){',
	'		scripts.forEach(function(url){',
	'			var ajax = new XMLHttpRequest();',
	'			ajax.open(\'GET\',url,false);',
	'			ajax.send();__scripts__+=ajax.responseText;',
	'			__scripts__+=\'\\n;\';',
	'		});',
	'	}',
	'};',
	script,
	'}catch(e){',
	'	window.parent.postMessage([\''+codeword+'\',\'error\'],\'*\')',
	'}'].join('\n');
	appendScript(iDoc,text);
	return iFrame;
}
function makeIframe(script,codeword){
	var promise = catiline.deferred();
	if(document.readyState==='complete'){
		promise.resolve(actualMakeI(script,codeword));
	}else{
		window.addEventListener('load',function(){
			promise.resolve(actualMakeI(script,codeword));
		},false);
	}
	return promise.promise;
}
catiline.makeIWorker = function (strings,codeword){
	var script =moveImports(strings.join(''),'\');eval(__scripts__);\n');
	var worker = {onmessage:function(){}};
	var ipromise = makeIframe(script,codeword);
	window.addEventListener('message',function(e){
		if(e.data.slice && e.data.slice(0,codeword.length) === codeword){
			worker.onmessage({data:JSON.parse(e.data.slice(codeword.length))});
		}
	});
	worker.postMessage=function(data){
		ipromise.then(function(iFrame){
			iFrame.contentWindow.postMessage(JSON.stringify(data),'*');
		});
	};
	worker.terminate=function(){
		ipromise.then(function(iFrame){
			document.body.removeChild(iFrame);
		});
	};
	return worker;
	
};

function makeFallbackWorker(script){
	catiline._noTransferable=true;
	var worker = new Worker(getPath());
	worker.postMessage(script);
	return worker;
}
//accepts an array of strings, joins them, and turns them into a worker.
catiline.makeWorker = function (strings, codeword){
	if(!catiline._hasWorker){
		return catiline.makeIWorker(strings,codeword);
	}
	var worker;
	var script = moveImports(strings.join('\n'),'\');\n');
	if(catiline._noTransferable){
		return makeFallbackWorker(script);
	}
	try{
		worker= new Worker(catiline.URL.createObjectURL(new Blob([script],{type: 'text/javascript'})));
	}catch(e){
		try{
			worker=makeFallbackWorker(script);
		}catch(ee){
			worker = catiline.makeIWorker(strings,codeword);
		}
	}finally{
		return worker;
	}
};

catiline.makeUrl = function (fileName) {
	var link = document.createElement('link');
	link.href = fileName;
	return link.href;
};

function stringifyObject(obj){
	var out = '{';
	var first = true;
	for(var key in obj){
		if(first){
			first = false;
		}else{
			out+=',';
		}
		out += key;
		out += ':';
		out += catiline.stringify(obj[key]);
	}
	out += '}';
	return out;
}
function stringifyArray(array){
	if(array.length){
		var out = '[';
		out += catiline.stringify(array[0]);
		var i = 0;
		var len = array.length;
		while(++i<len){
			out += ',';
			out += catiline.stringify(array[i]);
		}
		out += ']';
		return out;
	}else{
		return '[]';
	}
}
catiline.stringify = function(thing){
	if(Array.isArray(thing)){
		return stringifyArray(thing);
	}else if(typeof thing === 'function'||typeof thing === 'number'||typeof thing === 'boolean'){
		return thing.toString();
	}else if(typeof thing === 'string'){
		return '"' + thing + '"';
	}else if(thing.toString() === '[object Object]'){
		return stringifyObject(thing);
	}
};

var workerSetup = function(context) {
	self.__iFrame__ = typeof document !== 'undefined';
	self.__self__ = {
		onmessage: function(e) {
			context.trigger('messege', e.data[1]);
			if (e.data[0][0] === context.__codeWord__) {
				return regMsg(e);
			}
			else {
				context.trigger(e.data[0][0], e.data[1]);
			}
		}
	};
	if (__iFrame__) {
		window.onmessage = function(e) {
			if (typeof e.data === 'string') {
				e = {
					data: JSON.parse(e.data)
				};
			}
			__self__.onmessage(e);
		};
	}
	else {
		self.onmessage = __self__.onmessage;
	}
	__self__.postMessage = function(rawData, transfer) {
		if (!self._noTransferable && !__iFrame__) {
			self.postMessage(rawData, transfer);
		}
		else if (__iFrame__) {
			var data = context.__codeWord__ + JSON.stringify(rawData);
			window.parent.postMessage(data, '*');
		}
		else if (self._noTransferable) {
			self.postMessage(rawData);
		}
	};
	self.console = {};
	var regMsg = function(e) {
		var cb = function(data, transfer) {
			__self__.postMessage([e.data[0], data], transfer);
		};
		var result;
		if (__iFrame__) {
			try {
				result = context[e.data[1]](e.data[2], cb, context);
			}
			catch (ee) {
				context.fire('error', JSON.stringify(ee));
			}
		}
		else {
			result = context[e.data[1]](e.data[2], cb, context);
		}
		if (typeof result !== 'undefined') {
			cb(result);
		}
	};
};
function addEvents(context, msg) {
	var listeners = {};
	var sendMessage;
	if(typeof __self__ !== 'undefined'){
		sendMessage = __self__.postMessage;
	}else if (msg) {
		sendMessage = msg;
	}
	context.on = function(eventName, func, scope) {
		scope = scope || context;
		if (eventName.indexOf(' ') > 0) {
			eventName.split(' ').map(function(v) {
				return context.on(v, func, scope);
			}, this);
			return context;
		}
		if (!(eventName in listeners)) {
			listeners[eventName] = [];
		}
		var newFunc = function(a) {
			func.call(scope, a, scope);
		};
		newFunc.orig = func;
		listeners[eventName].push(newFunc);
		return context;
	};
	context.one = function(eventName, func, scope) {
		scope = scope || context;

		function ourFunc(a) {
			context.off(eventName, ourFunc);
			func.call(scope, a, scope);
		}
		return context.on(eventName, ourFunc);
	};

	context.trigger = function(eventName, data) {
		if (eventName.indexOf(' ') > 0) {
			eventName.split(' ').forEach(function(v) {
				context.trigger(v, data);
			});
			return context;
		}
		if (!(eventName in listeners)) {
			return context;
		}
		listeners[eventName].forEach(function(v) {
			v(data);
		});
		return context;
	};
	context.fire = function(eventName, data, transfer) {
		sendMessage([[eventName],data],transfer);
		return context;
	};
	context.off = function(eventName, func) {
		if (eventName.indexOf(' ') > 0) {
			eventName.split(' ').map(function(v) {
				return context.off(v, func);
			});
			return context;
		}
		if (!(eventName in listeners)) {
			return context;
		}
		else {
			if (func) {
				listeners[eventName] = listeners[eventName].map(function(a) {
					if (a.orig === func) {
						return false;
					}
					else {
						return a;
					}
				}).filter(function(a) {
					return a;
				});
			}
			else {
				delete listeners[eventName];
			}
		}
		return context;
	};
}
function makeConsole(msg) {
	if (typeof console !== 'undefined') {
		var method = console[msg[0]] ? msg[0] : 'log';
		if (typeof console[method].apply === 'undefined') {
			console[method](msg[1].join(' '));
		}
		else {
			console[method].apply(console, msg[1]);
		}
	}
}
function makeWorkerConsole(context){
	function makeConsole(method) {
		return function() {
			var len = arguments.length;
			var out = [];
			var i = 0;
			while (i < len) {
				out.push(arguments[i]);
				i++;
			}
			context.fire('console', [method, out]);
		};
	}
	['log', 'debug', 'error', 'info', 'warn', 'time', 'timeEnd'].forEach(function(v) {
		console[v] = makeConsole(v);
	});
}
function Catiline(obj) {
	if (typeof obj === 'function') {
		obj = {
			data: obj
		};
	}
	var codeWord = 'com.catilinejs.' + (Catiline._hasWorker ? 'iframe' : 'worker') + Math.random();
	var self = this;
	var promises = [];
	addEvents(self, function(data, transfer) {
		if (catiline._noTransferable) {
			worker.postMessage(data);
		}
		else {
			worker.postMessage(data, transfer);
		}
	});
	var rejectPromises = function(msg) {
		if (typeof msg !== 'string' && 'preventDefault' in msg) {
			msg.preventDefault();
			msg = msg.message;
		}
		promises.forEach(function(p) {
			if (p) {
				p.reject(msg);
			}
		});
	};
	obj.__codeWord__ = codeWord;
	obj.__initialize__ = [workerSetup, addEvents, makeWorkerConsole];
	if (!('initialize' in obj)) {
		if ('init' in obj) {
			obj.__initialize__.push(obj.init);
		}
	}
	else {
		obj.__initialize__.push(obj.initialize);
	}

	if (!('events' in obj)) {
		obj.events = {};
	}
	if ('listners' in obj && typeof obj.listners !== 'function') {
		for (var key in obj.listners) {
			self.on(key, obj.listners[key]);
		}
	}
	var fObj = 'var _db = {\n\t';
	var keyFunc = function(key) {
		var out = function(data, transfer) {
			var i = promises.length;
			promises[i] = catiline.deferred();
			if (catiline._noTransferable) {
				worker.postMessage([
					[codeWord, i], key, data]);
			}
			else {
				worker.postMessage([
					[codeWord, i], key, data], transfer);
			}
			return promises[i].promise;
		};
		return out;
	};
	var i = false;
	for (var key$0 in obj) {
		if(['listners','initialize','init'].indexOf(key$0)>-1){
			continue;
		}
		if (i) {
			fObj += ',\n\t';
		}
		else {
			i = true;
		}
		if (typeof obj[key$0] === 'function') {
			fObj = fObj + key$0 + ':' + obj[key$0].toString();
			self[key$0] = keyFunc(key$0);
		}
		else {
			var outThing = catiline.stringify(obj[key$0]);
			if (typeof outThing !== 'undefined') {
				fObj = fObj + key$0 + ':' + outThing;
			}
		}
	}
	fObj = fObj + '};';
	var worker = catiline.makeWorker(['\'use strict\';', '',
	fObj, '_db.__initialize__.forEach(function(f){', '	f.call(_db,_db);', '});', 'for(var key in _db.events){', '	_db.on(key,_db.events[key]);', '}'], codeWord);
	worker.onmessage = function(e) {
		self.trigger('message', e.data[1]);
		if (e.data[0][0] === codeWord) {
			promises[e.data[0][1]].resolve(e.data[1]);
			promises[e.data[0][1]] = 0;
		}
		else {
			self.trigger(e.data[0][0], e.data[1]);
		}
	};
	self.on('error', rejectPromises);
	worker.onerror = function(e) {
		self.trigger('error', e);
	};
	self.on('console', makeConsole);
	self._close = function() {
		worker.terminate();
		rejectPromises('closed');
		return catiline.resolve();
	};
	if (!('close' in self)) {
		self.close = self._close;
	}
}
catiline.Worker = Catiline;

catiline.worker = function(obj){
    return new Catiline(obj);
};
function makeActualKeyFuncs(resolvePromises, self) {
	return {
		keyFunc: function(k) {
			return function(data, transfer) {
				return resolvePromises(k, data, transfer);
			};
		},
		keyFuncBatch: function(k) {
			return function(array) {
				return catiline.all(array.map(function(data) {
					return resolvePromises(k, data);
				}));
			};
		},
		keyFuncBatchCB: function(k) {
			return function(array) {
				return catiline.all(array.map(function(data) {
					return resolvePromises(k, data).then(self.__cb__);
				}));
			};
		},
		keyFuncBatchTransfer: function(k) {
			return function(array) {
				return catiline.all(array.map(function(data) {
					return resolvePromises(k, data[0], data[1]);
				}));
			};
		},
		keyFuncBatchTransferCB: function(k) {
			return function(array) {
				return catiline.all(array.map(function(data) {
					return resolvePromises(k, data[0], data[1]).then(self.__cb__);
				}));
			};
		}
	};
}
function makeKeyFuncs(resolvePromises, self, obj){
	var funcs = makeActualKeyFuncs(resolvePromises, self);
	for (var key in obj) {
		self[key] = funcs.keyFunc(key);
		self.batch[key] = funcs.keyFuncBatch(key);
		self.__batchcb__[key] = funcs.keyFuncBatchCB(key);
		self.batchTransfer[key] = funcs.keyFuncBatchTransfer(key);
		self.__batchtcb__[key] = funcs.keyFuncBatchTransferCB(key);
	}
}
function addBatchEvents(self, workers, n){
	self.on = function (eventName, func, context) {
		workers.forEach(function (worker) {
			worker.on(eventName, func, context);
		});
		return self;
	};
	self.off = function (eventName, func, context) {
		workers.forEach(function (worker) {
			worker.off(eventName, func, context);
		});
		return self;
	};
	self.fire = function (eventName, data) {
		workers[~~ (Math.random() * n)].fire(eventName, data);
		return self;
	};
}
function makeUnmanaged(workers, n){
	return function(key, data, transfer, promise){
		promise.promise.cancel = function(reason){
			return promise.reject(reason);
		};
		workers[~~ (Math.random() * n)][key](data, transfer).then(function(v){
			return promise.resolve(v);
		},function(v){
			return promise.reject(v);
		});
		return promise.promise;
	};
}
function makeQueueWorkers(n,idle,obj){
	var workers = [];
	var numIdle = -1;
	while (++numIdle < n) {
		workers[numIdle] = new catiline.Worker(obj);
		idle.push(numIdle);
	}
	return workers;
}
function CatilineQueue(obj, n, dumb) {
	var self = this;
	var numIdle = n;
	var idle = [];
	var que = [];
	var queueLen = 0;
	var workers = makeQueueWorkers(n,idle,obj);
	addBatchEvents(self, workers, n);
	var batchFire = function (eventName, data) {
		workers.forEach(function (worker) {
			worker.fire(eventName, data);
		});
		return self;
	};
	
	self.batch.fire = batchFire;
	self.batchTransfer.fire = batchFire;

	function clearQueue(mgs) {
		mgs = mgs || 'canceled';
		queueLen = 0;
		var oQ = que;
		que = [];
		oQ.forEach(function (p) {
			p[3].reject(mgs);
		});
		return self;
	}
	self.clearQueue = clearQueue;
	makeKeyFuncs(resolvePromises, self, obj);
	

	function done(num) {
		if (queueLen) {
			var data = que.shift();
			queueLen--;
			workers[num][data[0]](data[1], data[2]).then(function (d) {
				done(num);
				data[3].resolve(d);
			}, function (d) {
				done(num);
				data[3].reject(d);
			});
		}
		else {
			numIdle++;
			idle.push(num);
		}
	}
	var resolveUnmanagedPromises;
	if(dumb){
		resolveUnmanagedPromises = makeUnmanaged(workers, n);
	}
	function resolvePromises(key, data, transfer) { //srsly better name!
		var promise = catiline.deferred();
		if (dumb) {
			return resolveUnmanagedPromises(key, data, transfer,promise);
		}
		if (!queueLen && numIdle) {
			var num = idle.pop();
			numIdle--;
			promise.promise.cancel = function(reason){
				return promise.reject(reason);
			};
			workers[num][key](data, transfer).then(function (d) {
				done(num);
				promise.resolve(d);
			}, function (d) {
				done(num);
				promise.reject(d);
			});
		} else if (queueLen || !numIdle) {
			var queueItem = [key, data, transfer, promise];
			promise.promise.cancel = function(reason){
				var loc = que.indexOf(queueItem);
				if(loc>-1){
					que.splice(loc,1);
					queueLen--;
				}
				return promise.reject(reason);
			};
			queueLen = que.push(queueItem);
		}
		return promise.promise;
	}
	self._close = function () {
		return catiline.all(workers.map(function (w) {
			return w._close();
		}));
	};
	if (!('close' in self)) {
		self.close = self._close;
	}
}
CatilineQueue.prototype.__batchcb__ = {};
CatilineQueue.prototype.__batchtcb__ = {};
CatilineQueue.prototype.batch = function (cb) {
	if (typeof cb === 'function') {
		this.__cb__ = cb;
		return this.__batchcb__;
	}
	else {
		return this.clearQueue(cb);
	}
};
CatilineQueue.prototype.batchTransfer = function (cb) {
	if (typeof cb === 'function') {
		this.__batchtcb__.__cb__ = cb;
		return this.__batchtcb__;
	}
	else {
		return this.clearQueue(cb);
	}
};
catiline.Queue = CatilineQueue;
catiline.queue = function (obj, n, dumb) {
	return new catiline.Queue(obj, n, dumb);
};

function catiline(object,queueLength,unmanaged){
	if(arguments.length === 1 || !queueLength || queueLength <= 1){
		return new catiline.Worker(object);
	}else{
		return new catiline.Queue(object,queueLength,unmanaged);
	}
}
//will be removed in v3
catiline.setImmediate = catiline.nextTick;
function initBrowser(catiline){
	var origCW = global.cw;
	catiline.noConflict=function(newName){
		global.cw = origCW;
		if(newName){
			global[newName]=catiline;
		}
	};
	global.catiline = catiline;
	global.cw = catiline;
	if(!('communist' in global)){
		global.communist=catiline;
	}

}

if(typeof define === 'function'){
	define(function(require){
		catiline.SHIM_WORKER_PATH=require.toUrl('./catiline.js');
		return catiline;
	});
}else if(typeof module === 'undefined' || !('exports' in module)){
	initBrowser(catiline);
} else {
	module.exports=catiline;
}catiline.version = '2.9.3';
})(this);}