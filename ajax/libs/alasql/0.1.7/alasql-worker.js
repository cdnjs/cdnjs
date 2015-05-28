//
// alasql.js
// AlaSQL - JavaScript SQL database
// Date: 17.05.2015
// Version: 0.1.6
// (ñ) 2014-2015, Andrey Gershun
//

/*
The MIT License (MIT)

Copyright (c) 2014-2015 Andrey Gershun (agershun@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/*
//
// AlaSQL Workker
// Date: 13.04.2014
// (c) 2014-2015, Andrey Gershun
//
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.alasql = factory();
    }
}(this, function () {

/**
	Main procedure for worker
 */
function alasql(sql,params,cb){
	var id = alasql.lastid++;
	alasql.buffer[id] = cb;
	alasql.webworker.postMessage({id:id,sql:sql,params:params});
};


if (typeof importScripts === 'function') {
	// Nothing
} else if(typeof exports != 'object') {

alasql.worker = function(path, paths, cb) {
//	var path;
	if(path === true) path = undefined;
	if (typeof path == "undefined") {
		var sc = document.getElementsByTagName('script');
		for(var i=0;i<sc.length;i++) {
			if (sc[i].src.substr(-16).toLowerCase() == 'alasql-worker.js') {
				path = sc[i].src.substr(0,sc[i].src.length-16)+'alasql.js'; 
				break;
			} else if (sc[i].src.substr(-20).toLowerCase() == 'alasql-worker.min.js') {
				path = sc[i].src.substr(0,sc[i].src.length-20)+'alasql.min.js';
				break;
			} else if (sc[i].src.substr(-9).toLowerCase() == 'alasql.js') {
				path = sc[i].src; 
				break;
			} else if (sc[i].src.substr(-13).toLowerCase() == 'alasql.min.js') {
				path = sc[i].src.substr(0,sc[i].src.length-13)+'alasql.min.js'; 
				break;
			};
		};
	};

	if(typeof path == "undefined") {
		throw new Error('Path to alasql.js is not specified');
	} else if(path !== false) {

		var js = "importScripts('";
			js += path;
			js+="');\
		self.onmessage = function(event) {\
		alasql(event.data.sql,event.data.params, function(data){\
		postMessage({id:event.data.id, data:data});\
		});\
		}";

		var blob = new Blob([js], {"type": "text\/plain"});
		alasql.webworker = new Worker(URL.createObjectURL(blob));

		alasql.webworker.onmessage = function(event) {
			var id = event.data.id;
//			console.log('onmessage',alasql.buffer,id);
			alasql.buffer[id](event.data.data);
			delete alasql.buffer[id];
		};

		alasql.webworker.onerror = function(e){
			throw e;
		}

		if(arguments.length > 1) {
			var sql = 'REQUIRE ' + paths.map(function(p){
				return '"'+p+'"';
			}).join(",");
			alasql(sql,[],cb);
		}

	} else if(path === false) {
		delete alasql.webworker;
		return;
	}; 
};

};



/* WebWorker */
alasql.lastid = 0;
alasql.buffer = {};

alasql.worker();

return alasql;
}));


//# sourceMappingURL=alasql-worker.js.map
