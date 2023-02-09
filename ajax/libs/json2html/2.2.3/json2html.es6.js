//     json2html.es6.js 2.2.2
//     https://www.json2html.com
//     (c) 2006-2022 Crystalline Technologies
//     json2html may be freely distributed under the MIT license.

(function() {

	"use strict";

	// ES6 Support
	// --------------

	// Establish the root object, `window` (`self`) in the browser, `global`
	// on the server, or `this` in some virtual machines. We use `self`
	// instead of `window` for `WebWorker` support.
	var root = typeof self == 'object' && self.self === self && self ||
			typeof global == 'object' && global.global === global && global ||
			this ||
			{};
	
	if(!root.json2html) root.json2html = {};

	/* ---------------------------------------- Private Methods ------------------------------------------------ */
	
	//Add es6 support
	root.json2html.es6 = {
	    
    	//Adds support for Template Literals 
    	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        "interpolate":function(params) {
          var names = Object.keys(params),
                vals = Object.values(params);
          return new Function(...names, `return \`${this}\`;`)(...vals);
        }
	};
	
}());