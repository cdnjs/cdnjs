/*! catiline 2.8.4 2013-09-21*/
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
if (typeof setImmediate === 'function') {
	nextTick = setImmediate.bind(global,drainQueue);
}else if(MutationObserver){
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

function moveImports(string){
	var str = regexImports(string);
	var matches = str[0];
	var rest = str[1];
	if(matches.length>0){
		return 'importScripts(\''+matches.join('\',\'')+'\');\n'+rest;
	}else{
		return rest;
	}
}
function moveIimports(string){
	var str = regexImports(string);
	var matches = str[0];
	var rest = str[1];
	if(matches.length>0){
		return 'importScripts(\''+matches.join('\',\'')+'\');eval(__scripts__);\n'+rest;
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
	var iWin = iFrame.contentWindow;
	var iDoc = iWin.document;
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
	var script =moveIimports(strings.join(''));
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
	var script = moveImports(strings.join(''));
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

catiline.Worker = function Catiline(obj) {
		if(typeof obj === 'function'){
			obj = {
				data:obj
			};
		}
		var __codeWord__='com.catilinejs.'+(catiline._hasWorker?'iframe':'worker')+Math.random();
		var listeners = {};
		var self = this;
		self.on = function (eventName, func, scope) {
			scope = scope || self;
			if (eventName.indexOf(' ') > 0) {
				eventName.split(' ').map(function (v) {
					return self.on(v, func, scope);
				}, this);
				return self;
			}
			if (!(eventName in listeners)) {
				listeners[eventName] = [];
			}
			listeners[eventName].push(function (a) {
				func.call(scope, a);
			});
			return self;
		};
	
		function _fire(eventName, data) {
			if (eventName.indexOf(' ') > 0) {
				eventName.split(' ').forEach(function (v) {
					_fire(v, data);
				});
				return self;
			}
			if (!(eventName in listeners)) {
				return self;
			}
			listeners[eventName].forEach(function (v) {
				v(data);
			});
			return self;
		}
		self.fire = function (eventName, data, transfer) {
			if(catiline._noTransferable){
				worker.postMessage([[eventName], data]);
			}else{
				worker.postMessage([[eventName], data], transfer);
			}
			
			return self;
		};
		self.off = function (eventName, func) {
			if (eventName.indexOf(' ') > 0) {
				eventName.split(' ').map(function (v) {
					return self.off(v, func);
				});
				return self;
			}
			if (!(eventName in listeners)) {
				return self;
			}
			else if (!func) {
				delete listeners[eventName];
			}
			else {
				if (listeners[eventName].indexOf(func) > -1) {
					if (listeners[eventName].length > 1) {
						delete listeners[eventName];
					}
					else {
						listeners[eventName].splice(listeners[eventName].indexOf(func), 1);
					}
				}
			}
			return self;
		};

		var promises = [];
		var rejectPromises = function (msg) {
			if (typeof msg !== 'string' && 'preventDefault' in msg) {
				msg.preventDefault();
				msg = msg.message;
			}
			promises.forEach(function (p) {
				if (p) {
					p.reject(msg);
				}
			});
		};
		obj.__codeWord__='"'+__codeWord__+'"';
		if (!('initialize' in obj)) {
			if ('init' in obj) {
				obj.initialize = obj.init;
			}
			else {
				obj.initialize = function () {};
			}
		}
		var fObj = '{\n\t';
		var keyFunc = function (key) {
			var out = function (data, transfer) {
				var i = promises.length;
				promises[i] = catiline.deferred();
				if(catiline._noTransferable){
					worker.postMessage([[__codeWord__, i], key, data]);
				}else{
					worker.postMessage([[__codeWord__, i], key, data], transfer);
				}
				return promises[i].promise;
			};
			return out;
		};
		var i = 0;
		for (var key in obj) {
			if (i !== 0) {
				fObj = fObj + ',\n\t';
			}
			else {
				i++;
			}
			fObj = fObj + key + ':' + obj[key].toString();
			self[key] = keyFunc(key);
		}
		fObj = fObj + '}';
		var worker = catiline.makeWorker(['\'use strict\';\n\nvar _db = ',fObj,';\nvar listeners = {};\nvar __iFrame__ = typeof document!=="undefined";\nvar __self__={onmessage:function(e){\n	_fire("messege",e.data[1]);\n	if(e.data[0][0]===_db.__codeWord__){\n		return regMsg(e);\n	}else{\n		_fire(e.data[0][0],e.data[1]);\n	}\n}};\nif(__iFrame__){\n	window.onmessage=function(e){\n		if(typeof e.data === "string"){\n			e ={data: JSON.parse(e.data)};\n		}\n		__self__.onmessage(e);\n	};\n}else{\n	self.onmessage=__self__.onmessage;\n}\n__self__.postMessage=function(rawData, transfer){\n	if(!self._noTransferable&&!__iFrame__){\n		self.postMessage(rawData, transfer);\n	}else if(__iFrame__){\n		var data = _db.__codeWord__+JSON.stringify(rawData);\n		window.parent.postMessage(data,"*");\n	}else if(self._noTransferable){\n		self.postMessage(rawData);\n	}\n};\n_db.on = function (eventName, func, scope) {\n	if(eventName.indexOf(" ")>0){\n		return eventName.split(" ").map(function(v){\n			return _db.on(v,func,scope);\n		},_db);\n	}\n	scope = scope || _db;\n	if (!(eventName in listeners)) {\n		listeners[eventName] = [];\n	}\n	listeners[eventName].push(function (a) {\n		func.call(scope, a, _db);\n	});\n};\nfunction _fire(eventName,data){\n	if(eventName.indexOf(" ")>0){\n		eventName.split(" ").forEach(function(v){\n			_fire(v,data);\n		});\n		return;\n	}\n	if (!(eventName in listeners)) {\n		return;\n	}\n	listeners[eventName].forEach(function (v) {\n		v(data);\n	});\n}\n\n_db.fire = function (eventName, data, transfer) {\n	__self__.postMessage([[eventName], data], transfer);\n};\n_db.off=function(eventName,func){\n	if(eventName.indexOf(" ")>0){\n		return eventName.split(" ").map(function(v){\n			return _db.off(v,func);\n		});\n	}\n	if(!(eventName in listeners)){\n		return;\n	}else if(!func){\n		delete listeners[eventName];\n	}else{\n		if(listeners[eventName].indexOf(func)>-1){\n			if(listeners[eventName].length>1){\n				delete listeners[eventName];\n			}else{\n				listeners[eventName].splice(listeners[eventName].indexOf(func),1);\n			}\n		}\n	}\n};\nvar console={};\nfunction makeConsole(method){\n	return function(){\n		var len = arguments.length;\n		var out =[];\n		var i = 0;\n		while (i<len){\n			out.push(arguments[i]);\n			i++;\n		}\n		_db.fire("console",[method,out]);\n	};\n}\n["log", "debug", "error", "info", "warn", "time", "timeEnd"].forEach(function(v){\n	console[v]=makeConsole(v);\n});\nvar regMsg = function(e){\n	var cb=function(data,transfer){\n		__self__.postMessage([e.data[0],data],transfer);\n	};\n	var result;\n	if(__iFrame__){\n		try{\n			result = _db[e.data[1]](e.data[2],cb,_db);\n		}catch(e){\n			_db.fire("error",JSON.stringify(e));\n		}\n	}else{\n		result = _db[e.data[1]](e.data[2],cb,_db);\n	}\n	if(typeof result !== "undefined"){\n		cb(result);\n	}\n};\n_db.initialize(_db);\n'],__codeWord__);
		worker.onmessage = function (e) {
			_fire('message', e.data[1]);
			if (e.data[0][0] === __codeWord__) {
				promises[e.data[0][1]].resolve(e.data[1]);
				promises[e.data[0][1]] = 0;
			}
			else {
				_fire(e.data[0][0], e.data[1]);
			}
		};
		self.on('error',rejectPromises);
		worker.onerror =function (e) {
			_fire('error', e);
		};
		self.on('console', function (msg) {
			console[msg[0]].apply(console, msg[1]);
		});
		self._close = function () {
			worker.terminate();
			rejectPromises('closed');
			return catiline.resolve();
		};
		if (!('close' in self)) {
			self.close = self._close;
		}
	};
catiline.worker = function (obj){
	return new catiline.Worker(obj);
};

catiline.Queue = function CatilineQueue(obj, n, dumb) {
	var self = this;
	self.__batchcb__ = {};
	self.__batchtcb__ = {};
	self.batch = function (cb) {
		if (typeof cb === 'function') {
			self.__batchcb__.__cb__ = cb;
			return self.__batchcb__;
		}
		else {
			return clearQueue(cb);
		}
	};
	self.batchTransfer = function (cb) {
		if (typeof cb === 'function') {
			self.__batchtcb__.__cb__ = cb;
			return self.__batchtcb__;
		}
		else {
			return clearQueue(cb);
		}
	};
	var workers = [];
	var numIdle = 0;
	var idle = [];
	var que = [];
	var queueLen = 0;
	while (numIdle < n) {
		workers[numIdle] = new catiline.Worker(obj);
		idle.push(numIdle);
		numIdle++;
	}
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
	var batchFire = function (eventName, data) {
		workers.forEach(function (worker) {
			worker.fire(eventName, data);
		});
		return self;
	};
	self.fire = function (eventName, data) {
		workers[~~ (Math.random() * n)].fire(eventName, data);
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

	function keyFunc(k) {
		return function (data, transfer) {
			return doStuff(k, data, transfer);
		};
	}

	function keyFuncBatch(k) {
		return function (array) {
			return catiline.all(array.map(function (data) {
				return doStuff(k, data);
			}));
		};
	}

	function keyFuncBatchCB(k) {
		return function (array) {
			var self = this;
			return catiline.all(array.map(function (data) {
				return doStuff(k, data).then(self.__cb__);
			}));
		};
	}

	function keyFuncBatchTransfer(k) {
		return function (array) {
			return catiline.all(array.map(function (data) {
				return doStuff(k, data[0], data[1]);
			}));
		};
	}

	function keyFuncBatchTransferCB(k) {
		return function (array) {
			var self = this;
			return catiline.all(array.map(function (data) {
				return doStuff(k, data[0], data[1]).then(self.__cb__);
			}));
		};
	}
	for (var key in obj) {
		self[key] = keyFunc(key);
		self.batch[key] = keyFuncBatch(key);
		self.__batchcb__[key] = keyFuncBatchCB(key);
		self.batchTransfer[key] = keyFuncBatchTransfer(key);
		self.__batchtcb__[key] = keyFuncBatchTransferCB(key);
	}

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

	function doStuff(key, data, transfer) { //srsly better name!
		var promise = catiline.deferred();
		if (dumb) {
			promise.promise.cancel = function(reason){
				return promise.reject(reason);
			};
			workers[~~ (Math.random() * n)][key](data, transfer).then(function(v){
				return promise.resolve(v);
			},function(v){
				return promise.reject(v);
			});
			return promise.promise;
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
		}
		else if (queueLen || !numIdle) {
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
};
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
}
catiline.version = '2.8.4';
})(this);}