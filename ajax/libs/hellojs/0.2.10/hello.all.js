/**
 * @hello.js
 *
 * HelloJS is a client side Javascript SDK for making OAuth2 logins and subsequent REST calls.
 *
 * @author Andrew Dodson
 * @company Knarly
 *
 * @copyright Andrew Dodson, 2012 - 2013
 * @license MIT: You are free to use and modify this code for any use, on the condition that this copyright notice remains.
 */

// Can't use strict with arguments.callee
//"use strict";


//
// Setup
// Initiates the construction of the library

var hello = function(name){
	return hello.use(name);
};


hello.utils = {
	//
	// Extend the first object with the properties and methods of the second
	extend : function(r /*, a[, b[, ...]] */){

		// Get the arguments as an array but ommit the initial item
		var args = Array.prototype.slice.call(arguments,1);

		for(var i=0;i<args.length;i++){
			var a = args[i];
			if( r instanceof Object && a instanceof Object && r !== a ){
				for(var x in a){
					//if(a.hasOwnProperty(x)){
					r[x] = hello.utils.extend( r[x], a[x] );
					//}
				}
			}
			else{
				r = a;
			}
		}
		return r;
	}
};



/////////////////////////////////////////////////
// Core library
// This contains the following methods
// ----------------------------------------------
// init
// login
// logout
// getAuthRequest
/////////////////////////////////////////////////

hello.utils.extend( hello, {

	//
	// Options
	settings : {

		//
		// OAuth 2 authentication defaults
		redirect_uri  : window.location.href.split('#')[0],
		response_type : 'token',
		display       : 'popup',
		state         : '',

		//
		// OAuth 1 shim
		// The path to the OAuth1 server for signing user requests
		// Wanna recreate your own? checkout https://github.com/MrSwitch/node-oauth-shim
		oauth_proxy   : 'https://auth-server.herokuapp.com/proxy',

		//
		// API Timeout, milliseconds
		timeout : 20000,

		//
		// Default Network
		default_service : null,

		//
		// Force signin
		// When hello.login is fired, ignore current session expiry and continue with login
		force : true
	},


	//
	// Service
	// Get/Set the default service
	//
	service : function(service){

		//this.utils.warn("`hello.service` is deprecated");

		if(typeof (service) !== 'undefined' ){
			return this.utils.store( 'sync_service', service );
		}
		return this.utils.store( 'sync_service' );
	},


	//
	// Services
	// Collection of objects which define services configurations
	services : {},

	//
	// Use
	// Define a new instance of the Hello library with a default service
	//
	use : function(service){

		// Create self, which inherits from its parent
		var self = this.utils.objectCreate(this);

		// Inherit the prototype from its parent
		self.settings = this.utils.objectCreate(this.settings);

		// Define the default service
		if(service){
			self.settings.default_service = service;
		}

		// Create an instance of Events
		self.utils.Event.call(self);

		return self;
	},


	//
	// init
	// Define the clientId's for the endpoint services
	// @param object o, contains a key value pair, service => clientId
	// @param object opts, contains a key value pair of options used for defining the authentication defaults
	// @param number timeout, timeout in seconds
	//
	init : function(services,options){

		var utils = this.utils;

		if(!services){
			return this.services;
		}

		// Define provider credentials
		// Reformat the ID field
		for( var x in services ){if(services.hasOwnProperty(x)){
			if( typeof(services[x]) !== 'object' ){
				services[x] = {id : services[x]};
			}
		}}

		//
		// merge services if there already exists some
		utils.extend(this.services, services);

		//
		// Format the incoming
		for( x in this.services ){if(this.services.hasOwnProperty(x)){
			this.services[x].scope = this.services[x].scope || {};
		}}

		//
		// Update the default settings with this one.
		if(options){
			utils.extend(this.settings, options);

			// Do this immediatly incase the browser changes the current path.
			if("redirect_uri" in options){
				this.settings.redirect_uri = utils.realPath(options.redirect_uri);
			}
		}

		return this;
	},


	//
	// Login
	// Using the endpoint
	// @param network	stringify				name to connect to
	// @param options	object		(optional)	{display mode, is either none|popup(default)|page, scope: email,birthday,publish, .. }
	// @param callback	function	(optional)	fired on signin
	//
	login :  function(){

		// Create self
		// An object which inherits its parent as the prototype.
		// And constructs a new event chain.
		var self = this.use(),
			utils = self.utils;

		// Get parameters
		var p = utils.args({network:'s', options:'o', callback:'f'}, arguments);

		// Apply the args
		self.args = p;

		// Local vars
		var url;

		// merge/override options with app defaults
		var opts = p.options = utils.merge(self.settings, p.options || {} );

		// Network
		p.network = self.settings.default_service = p.network || self.settings.default_service;

		//
		// Bind listener
		self.on('complete', p.callback);

		// Is our service valid?
		if( typeof(p.network) !== 'string' || !( p.network in self.services ) ){
			// trigger the default login.
			// ahh we dont have one.
			self.emitAfter('error complete', {error:{
				code : 'invalid_network',
				message : 'The provided network was not recognized'
			}});
			return self;
		}

		//
		var provider  = self.services[p.network];

		//
		// Callback
		// Save the callback until state comes back.
		//
		var responded = false;

		//
		// Create a global listener to capture events triggered out of scope
		var callback_id = utils.globalEvent(function(str){

			// Save this locally
			// responseHandler returns a string, lets save this locally
			var obj = JSON.parse(str);
			hello.utils.store(obj.network, obj);

			//
			// Cancel the popup close listener
			responded = true;

			//
			// Handle these response using the local
			// Trigger on the parent
			if(!obj.error){

				// Save on the parent window the new credentials
				// This fixes an IE10 bug i think... atleast it does for me.
				utils.store(obj.network,obj);

				// Trigger local complete events
				self.emit("complete success login auth.login auth", {
					network : obj.network,
					authResponse : obj
				});
			}
			else{
				// Trigger local complete events
				self.emit("complete error failed auth.failed", {
					error : obj.error
				});
			}
		});



		//
		// QUERY STRING
		// querystring parameters, we may pass our own arguments to form the querystring
		//
		p.qs = {
			client_id	: provider.id,
			response_type : provider.oauth.response_type || opts.response_type,
			redirect_uri : opts.redirect_uri,
			display		: opts.display,
			scope		: 'basic',
			state		: {
				client_id	: provider.id,
				network		: p.network,
				display		: opts.display,
				callback	: callback_id,
				state		: opts.state,
				oauth_proxy : opts.oauth_proxy
			}
		};

		//
		// SESSION
		// Get current session for merging scopes, and for quick auth response
		var session = utils.store(p.network);

		//
		// SCOPES
		// Authentication permisions
		//
		
		// convert any array, or falsy value to a string.
		var scope = (opts.scope||'').toString();

		scope = (scope ? scope + ',' : '') + p.qs.scope;

		// Append scopes from a previous session
		// This helps keep app credentials constant,
		// Avoiding having to keep tabs on what scopes are authorized
		if(session && "scope" in session && session.scope instanceof String){
			scope += ","+ session.scope;
		}

		// Save in the State
		// Convert to a string because IE, has a problem moving Arrays between windows
		p.qs.state.scope = hello.utils.unique( scope.split(/[,\s]+/) ).join(',');

		// Map replace each scope with the providers default scopes
		p.qs.scope = scope.replace(/[^,\s]+/ig, function(m){
			// Does this have a mapping?
			if (m in provider.scope){
				return provider.scope[m];
			}else{
				// Loop through all services and determine whether the scope is generic
				for(var x in self.services){
					var _scopes = self.services[x].scope;
					if(_scopes && m in _scopes){
						// found an instance of this scope, so lets not assume its special
						return '';
					}
				}
				// this is a unique scope to this service so lets in it.
				return m;
			}

		}).replace(/[,\s]+/ig, ',');

		// remove duplication and empty spaces
		p.qs.scope = utils.unique(p.qs.scope.split(/,+/)).join( provider.scope_delim || ',');




		//
		// FORCE
		// Is the user already signed in with the appropriate scopes, valid access_token?
		//
		if(opts.force===false){

			if( session && "access_token" in session && session.access_token && "expires" in session && session.expires > ((new Date()).getTime()/1e3) ){
				// What is different about the scopes in the session vs the scopes in the new login?
				var diff = utils.diff( session.scope || [], p.qs.state.scope || [] );
				if(diff.length===0){

					// Nothing has changed
					self.emit("notice", "User already has a valid access_token");

					// Ok trigger the callback
					self.emitAfter("complete success login", {
						network : p.network,
						authResponse : session
					});

					// Nothing has changed
					return self;
				}
			}
		}

		//
		// REDIRECT_URI
		// Is the redirect_uri root?
		//
		p.qs.redirect_uri = utils.realPath(p.qs.redirect_uri);


		// Add OAuth to state
		p.qs.state.oauth = provider.oauth;


		// Convert state to a string
		p.qs.state = JSON.stringify(p.qs.state);


		// Bespoke
		// Override login querystrings from auth_options
		if("login" in provider && typeof(provider.login) === 'function'){
			// Format the paramaters according to the providers formatting function
			provider.login(p);
		}



		//
		// URL
		//
		if( parseInt(provider.oauth.version,10) === 1 ){

			// Turn the request to the OAuth Proxy for 3-legged auth
			url = utils.qs( opts.oauth_proxy, p.qs );
		}

		// Refresh token
		else if( opts.display === 'none' && provider.oauth.grant && session.refresh_token ){

			// Add the refresh_token to the request
			p.qs.refresh_token = session.refresh_token;

			// Define the request path
			url = utils.qs( opts.oauth_proxy, p.qs );
		}

		// 
		else{

			url = utils.qs( provider.oauth.auth, p.qs );
		}


		self.emit("notice", "Authorization URL " + url );


		//
		// Execute
		// Trigger how we want self displayed
		// Calling Quietly?
		//
		if( opts.display === 'none' ){
			// signin in the background, iframe
			utils.iframe(url);
		}


		// Triggering popup?
		else if( opts.display === 'popup'){


			var popup = hello.utils.popup( url, p.qs.redirect_uri, opts.window_width || 500, opts.window_height || 550 );

			var timer = setInterval(function(){
				if(!popup||popup.closed){
					clearInterval(timer);
					if(!responded){

						var error = {
							code:"cancelled",
							message:"Login has been cancelled"
						};

						if(!popup){
							error = {
								code:'blocked',
								message :'Popup was blocked'
							};
						}

						self.emit("complete failed error", {error:error, network:p.network });
					}
				}
			}, 100);
		}

		else {
			window.location = url;
		}

		return self;
	},


	//
	// Logout
	// Remove any data associated with a given service
	// @param string name of the service
	// @param function callback
	//
	logout : function(){

		// Create self
		// An object which inherits its parent as the prototype.
		// And constructs a new event chain.
		var self = this.use();

		var utils = self.utils;

		var p = utils.args({name:'s', options: 'o', callback:"f" }, arguments);

		p.options = p.options || {};

		// Add callback to events
		self.on('complete', p.callback);

		// Netowrk
		p.name = p.name || self.settings.default_service;


		if( p.name && !( p.name in self.services ) ){
			self.emitAfter("complete error", {error:{
				code : 'invalid_network',
				message : 'The network was unrecognized'
			}});
		}
		else if(p.name && utils.store(p.name)){

			// Define the callback
			var callback = function(opts){

				// Remove from the store
				self.utils.store(p.name,'');

				// Emit events by default
				self.emitAfter("complete logout success auth.logout auth", hello.utils.merge( {network:p.name}, opts || {} ) );
			};

			//
			// Run an async operation to remove the users session
			// 
			var _opts = {};
			if(p.options.force){
				var logout = self.services[p.name].logout;
				if( logout ){
					// Convert logout to URL string,
					// If no string is returned, then this function will handle the logout async style
					if(typeof(logout) === 'function' ){
						logout = logout(callback);
					}
					// If logout is a string then assume URL and open in iframe.
					if(typeof(logout)==='string'){
						utils.iframe( logout );
						_opts.force = null;
						_opts.message = "Logout success on providers site was indeterminate";
					}
					else if(logout === undefined){
						// the callback function will handle the response.
						return self;
					}
				}
			}

			//
			// Remove local credentials
			callback(_opts);
		}
		else if(!p.name){
			for(var x in self.services){if(self.services.hasOwnProperty(x)){
				self.logout(x);
			}}
			// remove the default
			self.service(false);
			// trigger callback
		}
		else{
			self.emitAfter("complete error", {error:{
				code : 'invalid_session',
				message : 'There was no session to remove'
			}});
		}

		return self;
	},



	//
	// getAuthResponse
	// Returns all the sessions that are subscribed too
	// @param string optional, name of the service to get information about.
	//
	getAuthResponse : function(service){

		// If the service doesn't exist
		service = service || this.settings.default_service;

		if( !service || !( service in this.services ) ){
			this.emit("complete error", {error:{
				code : 'invalid_network',
				message : 'The network was unrecognized'
			}});
			return null;
		}

		return this.utils.store(service) || null;
	},


	//
	// Events
	// Define placeholder for the events
	events : {}
});







///////////////////////////////////
// Core Utilities
///////////////////////////////////

hello.utils.extend( hello.utils, {

	// Append the querystring to a url
	// @param string url
	// @param object parameters
	qs : function(url, params){
		if(params){
			var reg;
			for(var x in params){
				if(url.indexOf(x)>-1){
					var str = "[\\?\\&]"+x+"=[^\\&]*";
					reg = new RegExp(str);
					url = url.replace(reg,'');
				}
			}
		}
		return url + (!this.isEmpty(params) ? ( url.indexOf('?') > -1 ? "&" : "?" ) + this.param(params) : '');
	},
	

	//
	// Param
	// Explode/Encode the parameters of an URL string/object
	// @param string s, String to decode
	//
	param : function(s){
		var b,
			a = {},
			m;
		
		if(typeof(s)==='string'){

			m = s.replace(/^[\#\?]/,'').match(/([^=\/\&]+)=([^\&]+)/g);
			if(m){
				for(var i=0;i<m.length;i++){
					b = m[i].match(/([^=]+)=(.*)/);
					a[b[1]] = decodeURIComponent( b[2] );
				}
			}
			return a;
		}
		else {
			var o = s;
		
			a = [];

			for( var x in o ){if(o.hasOwnProperty(x)){
				if( o.hasOwnProperty(x) ){
					a.push( [x, o[x] === '?' ? '?' : encodeURIComponent(o[x]) ].join('=') );
				}
			}}

			return a.join('&');
		}
	},
	

	//
	// Local Storage Facade
	store : (function(localStorage){

		//
		// LocalStorage
		var a = [localStorage,window.sessionStorage],
			i=0;

		// Set LocalStorage
		localStorage = a[i++];

		while(localStorage){
			try{
				localStorage.setItem(i,i);
				localStorage.removeItem(i);
				break;
			}
			catch(e){
				localStorage = a[i++];
			}
		}

		if(!localStorage){
			localStorage = {
				getItem : function(prop){
					prop = prop +'=';
					var m = document.cookie.split(";");
					for(var i=0;i<m.length;i++){
						var _m = m[i].replace(/(^\s+|\s+$)/,'');
						if(_m && _m.indexOf(prop)===0){
							return _m.substr(prop.length);
						}
					}
					return null;
				},
				setItem : function(prop, value){
					document.cookie = prop + '=' + value;
				}
			};
		}

		// Does this browser support localStorage?

		return function (name,value,days) {

			// Local storage
			var json = JSON.parse(localStorage.getItem('hello')) || {};

			if(name && value === undefined){
				return json[name] || null;
			}
			else if(name && value === null){
				try{
					delete json[name];
				}
				catch(e){
					json[name]=null;
				}
			}
			else if(name){
				json[name] = value;
			}
			else {
				return json;
			}

			localStorage.setItem('hello', JSON.stringify(json));

			return json || null;
		};

	})(window.localStorage),

	//
	// Create and Append new Dom elements
	// @param node string
	// @param attr object literal
	// @param dom/string
	//
	append : function(node,attr,target){

		var n = typeof(node)==='string' ? document.createElement(node) : node;

		if(typeof(attr)==='object' ){
			if( "tagName" in attr ){
				target = attr;
			}
			else{
				for(var x in attr){if(attr.hasOwnProperty(x)){
					if(typeof(attr[x])==='object'){
						for(var y in attr[x]){if(attr[x].hasOwnProperty(y)){
							n[x][y] = attr[x][y];
						}}
					}
					else if(x==="html"){
						n.innerHTML = attr[x];
					}
					// IE doesn't like us setting methods with setAttribute
					else if(!/^on/.test(x)){
						n.setAttribute( x, attr[x]);
					}
					else{
						n[x] = attr[x];
					}
				}}
			}
		}
		
		if(target==='body'){
			(function self(){
				if(document.body){
					document.body.appendChild(n);
				}
				else{
					setTimeout( self, 16 );
				}
			})();
		}
		else if(typeof(target)==='object'){
			target.appendChild(n);
		}
		else if(typeof(target)==='string'){
			document.getElementsByTagName(target)[0].appendChild(n);
		}
		return n;
	},

	//
	// create IFRAME
	// An easy way to create a hidden iframe
	// @param string src
	//
	iframe : function(src){
		this.append('iframe', { src : src, style : {position:'absolute',left:"-1000px",bottom:0,height:'1px',width:'1px'} }, 'body');
	},

	//
	// merge
	// recursive merge two objects into one, second parameter overides the first
	// @param a array
	//
	merge : function(/*a,b,c,..n*/){
		var args = Array.prototype.slice.call(arguments);
		args.unshift({});
		return this.extend.apply(null, args);
	},

	//
	// Args utility
	// Makes it easier to assign parameters, where some are optional
	// @param o object
	// @param a arguments
	//
	args : function(o,args){

		var p = {},
			i = 0,
			t = null,
			x = null;
		
		// define x
		// x is the first key in the list of object parameters
		for(x in o){if(o.hasOwnProperty(x)){
			break;
		}}

		// Passing in hash object of arguments?
		// Where the first argument can't be an object
		if((args.length===1)&&(typeof(args[0])==='object')&&o[x]!='o!'){

			// Could this object still belong to a property?
			// Check the object keys if they match any of the property keys
			for(x in args[0]){if(o.hasOwnProperty(x)){
				// Does this key exist in the property list?
				if( x in o ){
					// Yes this key does exist so its most likely this function has been invoked with an object parameter
					// return first argument as the hash of all arguments
					return args[0];
				}
			}}
		}

		// else loop through and account for the missing ones.
		for(x in o){if(o.hasOwnProperty(x)){

			t = typeof( args[i] );

			if( ( typeof( o[x] ) === 'function' && o[x].test(args[i]) ) || ( typeof( o[x] ) === 'string' && (
					( o[x].indexOf('s')>-1 && t === 'string' ) ||
					( o[x].indexOf('o')>-1 && t === 'object' ) ||
					( o[x].indexOf('i')>-1 && t === 'number' ) ||
					( o[x].indexOf('a')>-1 && t === 'object' ) ||
					( o[x].indexOf('f')>-1 && t === 'function' )
				) )
			){
				p[x] = args[i++];
			}
			
			else if( typeof( o[x] ) === 'string' && o[x].indexOf('!')>-1 ){
				// ("Whoops! " + x + " not defined");
				return false;
			}
		}}
		return p;
	},

	//
	// realPath
	// Converts relative URL's to fully qualified URL's
	realPath : function(path){

		var location = window.location;

		if(!path){
			return location.href;
		}
		if( path.indexOf('/') === 0 ){
			path = location.protocol + ( path.indexOf('//') === 0 ? path : '//' + location.host + path );
		}
		// Is the redirect_uri relative?
		else if( !path.match(/^https?\:\/\//) ){
			path = (location.href.replace(/#.*/,'').replace(/\/[^\/]+$/,'/') + path).replace(/\/\.\//g,'/');
		}
		while( /\/[^\/]+\/\.\.\//g.test(path) ){
			path = path.replace(/\/[^\/]+\/\.\.\//g, '/');
		}
		return path;
	},

	//
	// diff
	diff : function(a,b){
		var r = [];
		for(var i=0;i<b.length;i++){
			if(this.indexOf(a,b[i])===-1){
				r.push(b[i]);
			}
		}
		return r;
	},

	//
	// indexOf
	// IE hack Array.indexOf doesn't exist prior to IE9
	indexOf : function(a,s){
		// Do we need the hack?
		if(a.indexOf){
			return a.indexOf(s);
		}

		for(var j=0;j<a.length;j++){
			if(a[j]===s){
				return j;
			}
		}
		return -1;
	},


	//
	// unique
	// remove duplicate and null values from an array
	// @param a array
	//
	unique : function(a){
		if(typeof(a)!=='object'){ return []; }
		var r = [];
		for(var i=0;i<a.length;i++){

			if(!a[i]||a[i].length===0||this.indexOf(r, a[i])!==-1){
				continue;
			}
			else{
				r.push(a[i]);
			}
		}
		return r;
	},


	// isEmpty
	isEmpty : function (obj){
		// scalar?
		if(!obj){
			return true;
		}

		// Array?
		if(obj && obj.length>0) return false;
		if(obj && obj.length===0) return true;

		// object?
		for (var key in obj) {
			if (obj.hasOwnProperty(key)){
				return false;
			}
		}
		return true;
	},

	// Shim, Object create
	// A shim for Object.create(), it adds a prototype to a new object
	objectCreate : (function(){
		if (Object.create) {
			return Object.create;
		}
		function F(){}
		return function(o){
			if (arguments.length != 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}
			F.prototype = o;
			return new F();
		};
	})(),

	/*
	//
	// getProtoTypeOf
	// Once all browsers catchup we can access the prototype
	// Currently: manually define prototype object in the `parent` attribute
	getPrototypeOf : (function(){
		if(Object.getPrototypeOf){
			return Object.getPrototypeOf;
		}
		else if(({}).__proto__){
			return function(obj){
				return obj.__proto__;
			};
		}
		return function(obj){
			if(obj.prototype && obj !== obj.prototype.constructor){
				return obj.prototype.constructor;
			}
		};
	})(),
	*/
	//
	// Event
	// A contructor superclass for adding event menthods, on, off, emit.
	//
	Event : function(){

		var separator = /[\s\,]+/;

		// If this doesn't support getProtoType then we can't get prototype.events of the parent
		// So lets get the current instance events, and add those to a parent property
		this.parent = {
			events : this.events,
			findEvents : this.findEvents,
			parent : this.parent,
			utils : this.utils
		};

		this.events = {};


		//
		// On, Subscribe to events
		// @param evt		string
		// @param callback	function
		//
		this.on = function(evt, callback){

			if(callback&&typeof(callback)==='function'){
				var a = evt.split(separator);
				for(var i=0;i<a.length;i++){

					// Has this event already been fired on this instance?
					this.events[a[i]] = [callback].concat(this.events[a[i]]||[]);
				}
			}

			return this;
		};


		//
		// Off, Unsubscribe to events
		// @param evt		string
		// @param callback	function
		//
		this.off = function(evt, callback){

			this.findEvents(evt, function(name, index){
				if( !callback || this.events[name][index] === callback){
					this.events[name][index] = null;
				}
			});

			return this;
		};

		//
		// Emit
		// Triggers any subscribed events
		//
		this.emit = function(evt, data){

			// Get arguments as an Array, knock off the first one
			var args = Array.prototype.slice.call(arguments, 1);
			args.push(evt);

			// Handler
			var handler = function(name, index){
				// Replace the last property with the event name
				args[args.length-1] = (name === '*'? evt.split(separator)[0] : name);

				// Trigger
				this.events[name][index].apply(this, args);
			};

			// Find the callbacks which match the condition and call
			var proto = this;
			while( proto && proto.findEvents ){

				// Find events which match
				proto.findEvents(evt + ',*', handler);

				// proto = this.utils.getPrototypeOf(proto);
				proto = proto.parent;
			}

			return this;
		};

		//
		// Easy functions
		this.emitAfter = function(){
			var self = this,
				args = arguments;
			setTimeout(function(){
				self.emit.apply(self, args);
			},0);
			return this;
		};
		this.success = function(callback){
			return this.on("success",callback);
		};
		this.error = function(callback){
			return this.on("error",callback);
		};
		this.complete = function(callback){
			return this.on("complete",callback);
		};


		this.findEvents = function(evt, callback){

			var a = evt.split(separator);

			for(var name in this.events){if(this.events.hasOwnProperty(name)){

				if( this.utils.indexOf(a,name) > -1 ){

					for(var i=0;i<this.events[name].length;i++){

						// Does the event handler exist?
						if(this.events[name][i]){
							// Emit on the local instance of this
							callback.call(this, name, i);
						}
					}
				}
			}}
		};

	},


	//
	// Global Events
	// Attach the callback to the window object
	// Return its unique reference
	globalEvent : function(callback, guid){
		// If the guid has not been supplied then create a new one.
		guid = guid || "_hellojs_"+parseInt(Math.random()*1e12,10).toString(36);

		// Define the callback function
		window[guid] = function(){
			// Trigger the callback
			try{
				bool = callback.apply(this, arguments);
			}
			catch(e){
				console.error(e);
			}

			if(bool){
				// Remove this handler reference
				try{
					delete window[guid];
				}catch(e){}
			}
		};
		return guid;
	},


	//
	// Trigger a clientside Popup
	// This has been augmented to support PhoneGap
	//
	popup : function(url, redirect_uri, windowWidth, windowHeight){

		var documentElement = document.documentElement;

		// Multi Screen Popup Positioning (http://stackoverflow.com/a/16861050)
		//   Credit: http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html
		// Fixes dual-screen position                         Most browsers      Firefox
		var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

		var width = window.innerWidth || documentElement.clientWidth || screen.width;
		var height = window.innerHeight || documentElement.clientHeight || screen.height;

		var left = ((width - windowWidth) / 2) + dualScreenLeft;
		var top  = ((height - windowHeight) / 2) + dualScreenTop;

		// Create a function for reopening the popup, and assigning events to the new popup object
		// This is a fix whereby triggering the
		var open = function (url){

			// Trigger callback
			var popup = window.open(
				url,
				'_blank',
				"resizeable=true,height=" + windowHeight + ",width=" + windowWidth + ",left=" + left + ",top="  + top
			);

			// PhoneGap support
			// Add an event listener to listen to the change in the popup windows URL
			// This must appear before popup.focus();
			if( popup && popup.addEventListener ){
				popup.addEventListener('loadstart', function(e){

					var url = e.url;

					// Is this the path, as given by the redirect_uri?
					if(url.indexOf(redirect_uri)!==0){
						return;
					}

					// Split appart the URL
					var a = document.createElement('a');
					a.href = url;


					// We dont have window operations on the popup so lets create some
					// The location can be augmented in to a location object like so...

					var _popup = {
						location : {
							// Change the location of the popup
							assign : function(location){
								
								// Unfouurtunatly an app is unable to change the location of a WebView window.
								// Soweopen a new one
								popup.addEventListener('exit', function(){
									//
									// For some reason its failing to close the window if we open a new one two soon
									// 
									setTimeout(function(){
										open(location);
									},1000);
								});

								// kill the previous popup
								_popup.close();
							},
							search : a.search,
							hash : a.hash,
							href : url
						},
						close : function(){
							//alert('closing location:'+url);
							if(popup.close){
								popup.close();
							}
						}
					};

					// Then this URL contains information which HelloJS must process
					// URL string
					// Window - any action such as window relocation goes here
					// Opener - the parent window which opened this, aka this script
					hello.utils.responseHandler( _popup, window );
				});
			}


			//
			// focus on this popup
			//
			if( popup && popup.focus ){
				popup.focus();
			}


			return popup;
		};


		//
		// Call the open() function with the initial path
		//
		// OAuth redirect, fixes URI fragments from being lost in Safari
		// (URI Fragments within 302 Location URI are lost over HTTPS)
		// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
		// 
		// FIREFOX, decodes URL fragments when calling location.hash. 
		//  - This is bad if the value contains break points which are escaped
		//  - Hence the url must be encoded twice as it contains breakpoints.
		if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
			url = redirect_uri + "#oauth_redirect=" + encodeURIComponent(encodeURIComponent(url));
		}

		return open( url );
	},


	//
	// OAuth/API Response Handler
	//
	responseHandler : function( window, parent ){

		var utils = this;

		//
		var location = window.location;

		//
		// Add a helper for relocating, instead of window.location  = url;
		//
		var relocate = function(path){
			if(location.assign){
				location.assign(path);
			}
			else{
				window.location = path;
			}
		};

		//
		// Save session, from redirected authentication
		// #access_token has come in?
		//
		// FACEBOOK is returning auth errors within as a query_string... thats a stickler for consistency.
		// SoundCloud is the state in the querystring and the token in the hashtag, so we'll mix the two together
		
		var p = utils.merge(utils.param(location.search||''), utils.param(location.hash||''));

		
		// if p.state
		if( p && "state" in p ){

			// remove any addition information
			// e.g. p.state = 'facebook.page';
			try{
				var a = JSON.parse(p.state);
				utils.extend(p, a);
			}catch(e){
				console.error("Could not decode state parameter");
			}

			// access_token?
			if( ("access_token" in p&&p.access_token) && p.network ){

				if(!p.expires_in || parseInt(p.expires_in,10) === 0){
					// If p.expires_in is unset, set to 0
					p.expires_in = 0;
				}
				p.expires_in = parseInt(p.expires_in,10);
				p.expires = ((new Date()).getTime()/1e3) + (p.expires_in || ( 60 * 60 * 24 * 365 ));

				// Lets use the "state" to assign it to one of our networks
				authCallback( p, window, parent );
			}

			//error=?
			//&error_description=?
			//&state=?
			else if( ("error" in p && p.error) && p.network ){
				// Error object
				p.error = {
					code: p.error,
					message : p.error_message || p.error_description
				};

				// Let the state handler handle it.
				authCallback( p, window, parent );
			}

			// API Calls
			// IFRAME HACK
			// Result is serialized JSON string.
			else if(p&&p.callback&&"result" in p && p.result ){
				// trigger a function in the parent
				if(p.callback in parent){
					parent[p.callback](JSON.parse(p.result));
				}
			}
		}
		//
		// OAuth redirect, fixes URI fragments from being lost in Safari
		// (URI Fragments within 302 Location URI are lost over HTTPS)
		// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
		else if("oauth_redirect" in p){

			relocate( decodeURIComponent(p.oauth_redirect) );
			return;
		}

		// redefine
		p = utils.param(location.search);

		// IS THIS AN OAUTH2 SERVER RESPONSE? OR AN OAUTH1 SERVER RESPONSE?
		if((p.code&&p.state) || (p.oauth_token&&p.proxy_url)){
			// Add this path as the redirect_uri
			p.redirect_uri = location.href.replace(/[\?\#].*$/,'');
			// JSON decode
			var state = JSON.parse(p.state);
			// redirect to the host
			var path = (state.oauth_proxy || p.proxy_url) + "?" + utils.param(p);

			relocate( path );
		}


		//
		// AuthCallback
		// Trigger a callback to authenticate
		//
		function authCallback(obj, window, parent){

			// Trigger the callback on the parent
			utils.store(obj.network, obj );

			// if this is a page request
			// therefore it has no parent or opener window to handle callbacks
			if( ("display" in obj) && obj.display === 'page' ){
				return;
			}

			if(parent){
				// Call the generic listeners
	//				win.hello.emit(network+":auth."+(obj.error?'failed':'login'), obj);
				// Call the inline listeners

				// to do remove from session object...
				var cb = obj.callback;
				try{
					delete obj.callback;
				}catch(e){}

				// Update store
				utils.store(obj.network,obj);

				// Call the globalEvent function on the parent
				if(cb in parent){

					// its safer to pass back a string to the parent, rather than an object/array
					// Better for IE8
					var str = JSON.stringify(obj);

					try{
						parent[cb](str);
					}
					catch(e){
						// "Error thrown whilst executing parent callback"
					}
				}
				else{
					// "Error: Callback missing from parent window, snap!"
				}

			}

			// Close this current window
			try{
				window.close();
			}
			catch(e){}

			// IOS bug wont let us close a popup if still loading
			if(window.addEventListener){
				window.addEventListener('load', function(){
					window.close();
				});
			}
			//console.log("Trying to close window");
		}

	}

});


//////////////////////////////////
// Events
//////////////////////////////////

// Extend the hello object with its own event instance
hello.utils.Event.call(hello);


// Shimming old deprecated functions
hello.subscribe = hello.on;
hello.trigger = hello.emit;
hello.unsubscribe = hello.off;





/////////////////////////////////////
//
// Save any access token that is in the current page URL
// Handle any response solicited through iframe hash tag following an API request
//
/////////////////////////////////////

hello.utils.responseHandler( window, window.opener || window.parent );



///////////////////////////////////
// Monitoring session state
// Check for session changes
///////////////////////////////////

(function(hello){

	// Monitor for a change in state and fire
	var old_session = {},

		// Hash of expired tokens
		expired = {};

	//
	// Listen to other triggers to Auth events, use these to update this
	//
	hello.on('auth.login, auth.logout', function(auth){
		if(auth&&typeof(auth)==='object'&&auth.network){
			old_session[auth.network] = hello.utils.store(auth.network) || {};
		}
	});
	


	(function self(){

		var CURRENT_TIME = ((new Date()).getTime()/1e3);
		var emit = function(event_name){
			hello.emit("auth."+event_name, {
				network: name,
				authResponse: session
			});
		};

		// Loop through the services
		for(var name in hello.services){if(hello.services.hasOwnProperty(name)){

			if(!hello.services[name].id){
				// we haven't attached an ID so dont listen.
				continue;
			}
		
			// Get session
			var session = hello.utils.store(name) || {};
			var provider = hello.services[name];
			var oldsess = old_session[name] || {};

			//
			// Listen for globalEvents that did not get triggered from the child
			//
			if(session && "callback" in session){

				// to do remove from session object...
				var cb = session.callback;
				try{
					delete session.callback;
				}catch(e){}

				// Update store
				// Removing the callback
				hello.utils.store(name,session);

				// Emit global events
				try{
					window[cb](session);
				}
				catch(e){}
			}
			
			//
			// Refresh token
			//
			if( session && ("expires" in session) && session.expires < CURRENT_TIME ){

				// If auto refresh is provided then determine if we can refresh based upon its value.
				var refresh = !("autorefresh" in provider) || provider.autorefresh;

				// Has the refresh been run recently?
				if( refresh && (!( name in expired ) || expired[name] < CURRENT_TIME ) ){
					// try to resignin
					hello.emit("notice", name + " has expired trying to resignin" );
					hello.login(name,{display:'none', force: false});

					// update expired, every 10 minutes
					expired[name] = CURRENT_TIME + 600;
				}

				// Does this provider not support refresh
				else if( !refresh && !( name in expired ) ) {
					// Label the event
					emit('expired');
					expired[name] = true;
				}

				// If session has expired then we dont want to store its value until it can be established that its been updated
				continue;
			}
			// Has session changed?
			else if( oldsess.access_token === session.access_token &&
						oldsess.expires === session.expires ){
				continue;
			}
			// Access_token has been removed
			else if( !session.access_token && oldsess.access_token ){
				emit('logout');
			}
			// Access_token has been created
			else if( session.access_token && !oldsess.access_token ){
				emit('login');
			}
			// Access_token has been updated
			else if( session.expires !== oldsess.expires ){
				emit('update');
			}

			// Updated stored session
			old_session[name] = session;

			// Remove the expired flags
			if(name in expired){
				delete expired[name];
			}
		}}

		// Check error events
		setTimeout(self, 1000);
	})();

})(hello);









// EOF CORE lib
//////////////////////////////////







/////////////////////////////////////////
// API
// @param path		string
// @param method	string (optional)
// @param data		object (optional)
// @param timeout	integer (optional)
// @param callback	function (optional)

hello.api = function(){

	// get arguments
	var p = this.utils.args({path:'s!', method : "s", data:'o', timeout:'i', callback:"f" }, arguments);

	// Create self
	// An object which inherits its parent as the prototype.
	// And constructs a new event chain.
	var self = this.use(),
		utils = self.utils;


	// Reference arguments
	self.args = p;

	// method
	p.method = (p.method || 'get').toLowerCase();
	
	// data
	var data = p.data = p.data || {};

	// Completed event
	// callback
	self.on('complete', p.callback);
	

	// Path
	// Remove the network from path, e.g. facebook:/me/friends
	// results in { network : facebook, path : me/friends }
	p.path = p.path.replace(/^\/+/,'');
	var a = (p.path.split(/[\/\:]/,2)||[])[0].toLowerCase();

	if(a in self.services){
		p.network = a;
		var reg = new RegExp('^'+a+':?\/?');
		p.path = p.path.replace(reg,'');
	}


	// Network & Provider
	// Define the network that this request is made for
	p.network = self.settings.default_service = p.network || self.settings.default_service;
	var o = self.services[p.network];

	// INVALID?
	// Is there no service by the given network name?
	if(!o){
		self.emitAfter("complete error", {error:{
			code : "invalid_network",
			message : "Could not match the service requested: " + p.network
		}});
		return self;
	}


	// timeout global setting
	if(p.timeout){
		self.settings.timeout = p.timeout;
	}

	// Log self request
	self.emit("notice", "API request "+p.method.toUpperCase()+" '"+p.path+"' (request)",p);
	

	//
	// CALLBACK HANDLER
	// Change the incoming values so that they are have generic values according to the path that is defined
	// @ response object
	// @ statusCode integer if available
	var callback = function(r,headers){

		// FORMAT RESPONSE?
		// Does self request have a corresponding formatter
		if( o.wrap && ( (p.path in o.wrap) || ("default" in o.wrap) )){
			var wrap = (p.path in o.wrap ? p.path : "default");
			var time = (new Date()).getTime();

			// FORMAT RESPONSE
			var b = o.wrap[wrap](r,headers,p);

			// Has the response been utterly overwritten?
			// Typically self augments the existing object.. but for those rare occassions
			if(b){
				r = b;
			}

			// Emit a notice
			self.emit("notice", "Processing took" + ((new Date()).getTime() - time));
		}

		self.emit("notice", "API: "+p.method.toUpperCase()+" '"+p.path+"' (response)", r);

		//
		// Next
		// If the result continues on to other pages
		// callback = function(results, next){ if(next){ next(); } }
		var next = null;

		// Is there a next_page defined in the response?
		if( r && "paging" in r && r.paging.next ){
			// Repeat the action with a new page path
			// This benefits from otherwise letting the user follow the next_page URL
			// In terms of using the same callback handlers etc.
			next = function(){
				processPath( (r.paging.next.match(/^\?/)?p.path:'') + r.paging.next );
			};
		}

		//
		// Dispatch to listeners
		// Emit events which pertain to the formatted response
		self.emit("complete " + (!r || "error" in r ? 'error' : 'success'), r, next);
	};



	// push out to all networks
	// as long as the path isn't flagged as unavaiable, e.g. path == false
	if( !( !(p.method in o) || !(p.path in o[p.method]) || o[p.method][p.path] !== false ) ){
		return self.emitAfter("complete error", {error:{
			code:'invalid_path',
			message:'The provided path is not available on the selected network'
		}});
	}

	//
	// Get the current session
	var session = self.getAuthResponse(p.network);


	//
	// Given the path trigger the fix
	processPath(p.path);


	function processPath(path){

		// Clone the data object
		// Prevent this script overwriting the data of the incoming object.
		// ensure that everytime we run an iteration the callbacks haven't removed some data
		p.data = utils.clone(data);


		// Extrapolate the QueryString
		// Provide a clean path
		// Move the querystring into the data
		if(p.method==='get'){
			var reg = /[\?\&]([^=&]+)(=([^&]+))?/ig,
				m;
			while((m = reg.exec(path))){
				p.data[m[1]] = m[3];
			}
			path = path.replace(/\?.*/,'');
		}


		// URL Mapping
		// Is there a map for the given URL?
		var actions = o[{"delete":"del"}[p.method]||p.method] || {},
			url = actions[path] || actions['default'] || path;


		// if url needs a base
		// Wrap everything in
		var getPath = function(url){

			// Format the string if it needs it
			url = url.replace(/\@\{([a-z\_\-]+)(\|.+?)?\}/gi, function(m,key,defaults){
				var val = defaults ? defaults.replace(/^\|/,'') : '';
				if(key in p.data){
					val = p.data[key];
					delete p.data[key];
				}
				else if(typeof(defaults) === 'undefined'){
					self.emitAfter("error", {error:{
						code : "missing_attribute_"+key,
						message : "The attribute " + key + " is missing from the request"
					}});
				}
				return val;
			});

			// Add base
			if( !url.match(/^https?:\/\//) ){
				url = o.base + url;
			}


			var qs = {};

			// Format URL
			var format_url = function( qs_handler, callback ){

				// Execute the qs_handler for any additional parameters
				if(qs_handler){
					if(typeof(qs_handler)==='function'){
						qs_handler(qs);
					}
					else{
						utils.extend(qs, qs_handler);
					}
				}

				var path = utils.qs(url, qs||{} );

				self.emit("notice", "Request " + path);

				_sign(p.network, path, p.method, p.data, o.querystring, callback);
			};


			// Update the resource_uri
			//url += ( url.indexOf('?') > -1 ? "&" : "?" );

			// Format the data
			if( !utils.isEmpty(p.data) && !("FileList" in window) && utils.hasBinary(p.data) ){
				// If we can't format the post then, we are going to run the iFrame hack
				utils.post( format_url, p.data, ("form" in o ? o.form(p) : null), callback );

				return self;
			}

			// the delete callback needs a better response
			if(p.method === 'delete'){
				var _callback = callback;
				callback = function(r, code){
					_callback((!r||utils.isEmpty(r))? {success:true} : r, code);
				};
			}

			// Can we use XHR for Cross domain delivery?
			if( 'withCredentials' in new XMLHttpRequest() && ( !("xhr" in o) || ( o.xhr && o.xhr(p,qs) ) ) ){
				var x = utils.xhr( p.method, format_url, p.headers, p.data, callback );
				x.onprogress = function(e){
					self.emit("progress", e);
				};
				x.upload.onprogress = function(e){
					self.emit("uploadprogress", e);
				};
			}
			else{

				// Assign a new callbackID
				p.callbackID = utils.globalEvent();

				// Otherwise we're on to the old school, IFRAME hacks and JSONP
				// Preprocess the parameters
				// Change the p parameters
				if("jsonp" in o){
					o.jsonp(p,qs);
				}

				// Does this provider have a custom method?
				if("api" in o && o.api( url, p, (session && session.access_token ? {access_token:session.access_token} : {}), callback ) ){
					return;
				}

				// Is method still a post?
				if( p.method === 'post' ){

					// Add some additional query parameters to the URL
					// We're pretty stuffed if the endpoint doesn't like these
					//			"suppress_response_codes":true
					qs.redirect_uri = self.settings.redirect_uri;
					qs.state = JSON.stringify({callback:p.callbackID});

					utils.post( format_url, p.data, ("form" in o ? o.form(p) : null), callback, p.callbackID, self.settings.timeout );
				}

				// Make the call
				else{

					utils.extend( qs, p.data );

					qs.callback = p.callbackID;

					utils.jsonp( format_url, callback, p.callbackID, self.settings.timeout );
				}
			}
		};

		// Make request
		if(typeof(url)==='function'){
			// Does self have its own callback?
			url(p, getPath);
		}
		else{
			// Else the URL is a string
			getPath(url);
		}
	}
	

	return self;


	//
	// Add authentication to the URL
	function _sign(network, path, method, data, modifyQueryString, callback){

		// OAUTH SIGNING PROXY
		var service = self.services[network],
			token = (session ? session.access_token : null);

		// Is self an OAuth1 endpoint
		var proxy = ( service.oauth && parseInt(service.oauth.version,10) === 1 ? self.settings.oauth_proxy : null);

		if(proxy){
			// Use the proxy as a path
			callback( utils.qs(proxy, {
				path : path,
				access_token : token||'',
				then : (method.toLowerCase() === 'get' ? 'redirect' : 'proxy'),
				method : method,
				suppress_response_codes : true
			}));
			return;
		}

		var qs = { 'access_token' : token||'' };

		if(modifyQueryString){
			modifyQueryString(qs);
		}

		callback(  utils.qs( path, qs) );
	}

};










///////////////////////////////////
// API Utilities
///////////////////////////////////

hello.utils.extend( hello.utils, {

	//
	// isArray
	isArray : function (o){
		return Object.prototype.toString.call(o) === '[object Array]';
	},


	// _DOM
	// return the type of DOM object
	domInstance : function(type,data){
		var test = "HTML" + (type||'').replace(/^[a-z]/,function(m){return m.toUpperCase();}) + "Element";
		if( !data ){
			return false;
		}
		if(window[test]){
			return data instanceof window[test];
		}else if(window.Element){
			return data instanceof window.Element && (!type || (data.tagName&&data.tagName.toLowerCase() === type));
		}else{
			return (!(data instanceof Object||data instanceof Array||data instanceof String||data instanceof Number) && data.tagName && data.tagName.toLowerCase() === type );
		}
	},

	//
	// Clone
	// Create a clone of an object
	clone : function(obj){
		// Does not clone Dom elements, nor Binary data, e.g. Blobs, Filelists
		if("nodeName" in obj || this.isBinary( obj ) ){
			return obj;
		}
		// But does clone everything else.
		var clone = {}, x;
		for(x in obj){
			if(typeof(obj[x]) === 'object'){
				clone[x] = this.clone(obj[x]);
			}
			else{
				clone[x] = obj[x];
			}
		}
		return clone;
	},

	//
	// XHR
	// This uses CORS to make requests
	xhr : function(method, pathFunc, headers, data, callback){

		var utils = this;

		if(typeof(pathFunc)!=='function'){
			var path = pathFunc;
			pathFunc = function(qs, callback){callback(utils.qs( path, qs ));};
		}

		var r = new XMLHttpRequest();

		// Binary?
		var binary = false;
		if(method==='blob'){
			binary = method;
			method = 'GET';
		}
		// UPPER CASE
		method = method.toUpperCase();

		// xhr.responseType = "json"; // is not supported in any of the vendors yet.
		r.onload = function(e){
			var json = r.response;
			try{
				json = JSON.parse(r.responseText);
			}catch(_e){
				if(r.status===401){
					json = {
						error : {
							code : "access_denied",
							message : r.statusText
						}
					};
				}
			}
			var headers = headersToJSON(r.getAllResponseHeaders());
			headers.statusCode = r.status;

			callback( json || ( method!=='DELETE' ? {error:{message:"Could not get resource"}} : {} ), headers );
		};
		r.onerror = function(e){
			var json = r.responseText;
			try{
				json = JSON.parse(r.responseText);
			}catch(_e){}

			callback(json||{error:{
				code: "access_denied",
				message: "Could not get resource"
			}});
		};

		var qs = {}, x;

		// Should we add the query to the URL?
		if(method === 'GET'||method === 'DELETE'){
			if(!utils.isEmpty(data)){
				utils.extend(qs, data);
			}
			data = null;
		}
		else if( data && typeof(data) !== 'string' && !(data instanceof FormData) && !(data instanceof File) && !(data instanceof Blob)){
			// Loop through and add formData
			var f = new FormData();
			for( x in data )if(data.hasOwnProperty(x)){
				if( data[x] instanceof HTMLInputElement ){
					if( "files" in data[x] && data[x].files.length > 0){
						f.append(x, data[x].files[0]);
					}
				}
				else if(data[x] instanceof Blob){
					f.append(x, data[x], data.name);
				}
				else{
					f.append(x, data[x]);
				}
			}
			data = f;
		}

		// Create url

		pathFunc(qs, function(url){

			// Open the path, async
			r.open( method, url, true );

			if(binary){
				if("responseType" in r){
					r.responseType = binary;
				}
				else{
					r.overrideMimeType("text/plain; charset=x-user-defined");
				}
			}

			// Set any bespoke headers
			if(headers){
				for(var x in headers){
					r.setRequestHeader(x, headers[x]);
				}
			}

			r.send( data );
		});


		return r;


		//
		// headersToJSON
		// Headers are returned as a string, which isn't all that great... is it?
		function headersToJSON(s){
			var r = {};
			var reg = /([a-z\-]+):\s?(.*);?/gi,
				m;
			while((m = reg.exec(s))){
				r[m[1]] = m[2];
			}
			return r;
		}
	},


	//
	// JSONP
	// Injects a script tag into the dom to be executed and appends a callback function to the window object
	// @param string/function pathFunc either a string of the URL or a callback function pathFunc(querystringhash, continueFunc);
	// @param function callback a function to call on completion;
	//
	jsonp : function(pathFunc,callback,callbackID,timeout){

		var utils = this;

		// Change the name of the callback
		var bool = 0,
			head = document.getElementsByTagName('head')[0],
			operafix,
			script,
			result = {error:{message:'server_error',code:'server_error'}},
			cb = function(){
				if( !( bool++ ) ){
					window.setTimeout(function(){
						callback(result);
						head.removeChild(script);
					},0);
				}
			};

		// Add callback to the window object
		var cb_name = utils.globalEvent(function(json){
			result = json;
			return true; // mark callback as done
		},callbackID);

		// The URL is a function for some cases and as such
		// Determine its value with a callback containing the new parameters of this function.
		if(typeof(pathFunc)!=='function'){
			var path = pathFunc;
			path = path.replace(new RegExp("=\\?(&|$)"),'='+cb_name+'$1');
			pathFunc = function(qs, callback){ callback(utils.qs(path, qs));};
		}


		pathFunc(function(qs){
				for(var x in qs){ if(qs.hasOwnProperty(x)){
					if (qs[x] === '?') qs[x] = cb_name;
				}}
			}, function(url){

			// Build script tag
			script = utils.append('script',{
				id:cb_name,
				name:cb_name,
				src: url,
				async:true,
				onload:cb,
				onerror:cb,
				onreadystatechange : function(){
					if(/loaded|complete/i.test(this.readyState)){
						cb();
					}
				}
			});

			// Opera fix error
			// Problem: If an error occurs with script loading Opera fails to trigger the script.onerror handler we specified
			// Fix:
			// By setting the request to synchronous we can trigger the error handler when all else fails.
			// This action will be ignored if we've already called the callback handler "cb" with a successful onload event
			if( window.navigator.userAgent.toLowerCase().indexOf('opera') > -1 ){
				operafix = utils.append('script',{
					text:"document.getElementById('"+cb_name+"').onerror();"
				});
				script.async = false;
			}

			// Add timeout
			if(timeout){
				window.setTimeout(function(){
					result = {error:{message:'timeout',code:'timeout'}};
					cb();
				}, timeout);
			}

			// Todo:
			// Add fix for msie,
			// However: unable recreate the bug of firing off the onreadystatechange before the script content has been executed and the value of "result" has been defined.
			// Inject script tag into the head element
			head.appendChild(script);
			
			// Append Opera Fix to run after our script
			if(operafix){
				head.appendChild(operafix);
			}

		});
	},


	//
	// Post
	// Send information to a remote location using the post mechanism
	// @param string uri path
	// @param object data, key value data to send
	// @param function callback, function to execute in response
	//
	post : function(pathFunc, data, options, callback, callbackID, timeout){

		var utils = this,
			doc = document;

		// The URL is a function for some cases and as such
		// Determine its value with a callback containing the new parameters of this function.
		if(typeof(pathFunc)!=='function'){
			var path = pathFunc;
			pathFunc = function(qs, callback){ callback(utils.qs(path, qs));};
		}

		// This hack needs a form
		var form = null,
			reenableAfterSubmit = [],
			newform,
			i = 0,
			x = null,
			bool = 0,
			cb = function(r){
				if( !( bool++ ) ){

					// fire the callback
					callback(r);

					// Do not return true, as that will remove the listeners
					// return true;
				}
			};

		// What is the name of the callback to contain
		// We'll also use this to name the iFrame
		utils.globalEvent(cb, callbackID);

		// Build the iframe window
		var win;
		try{
			// IE7 hack, only lets us define the name here, not later.
			win = doc.createElement('<iframe name="'+callbackID+'">');
		}
		catch(e){
			win = doc.createElement('iframe');
		}

		win.name = callbackID;
		win.id = callbackID;
		win.style.display = 'none';

		// Override callback mechanism. Triggger a response onload/onerror
		if(options&&options.callbackonload){
			// onload is being fired twice
			win.onload = function(){
				cb({
					response : "posted",
					message : "Content was posted"
				});
			};
		}

		if(timeout){
			setTimeout(function(){
				cb({
					error : {
						code:"timeout",
						message : "The post operation timed out"
					}
				});
			}, timeout);
		}

		doc.body.appendChild(win);


		// if we are just posting a single item
		if( utils.domInstance('form', data) ){
			// get the parent form
			form = data.form;
			// Loop through and disable all of its siblings
			for( i = 0; i < form.elements.length; i++ ){
				if(form.elements[i] !== data){
					form.elements[i].setAttribute('disabled',true);
				}
			}
			// Move the focus to the form
			data = form;
		}

		// Posting a form
		if( utils.domInstance('form', data) ){
			// This is a form element
			form = data;

			// Does this form need to be a multipart form?
			for( i = 0; i < form.elements.length; i++ ){
				if(!form.elements[i].disabled && form.elements[i].type === 'file'){
					form.encoding = form.enctype = "multipart/form-data";
					form.elements[i].setAttribute('name', 'file');
				}
			}
		}
		else{
			// Its not a form element,
			// Therefore it must be a JSON object of Key=>Value or Key=>Element
			// If anyone of those values are a input type=file we shall shall insert its siblings into the form for which it belongs.
			for(x in data) if(data.hasOwnProperty(x)){
				// is this an input Element?
				if( utils.domInstance('input', data[x]) && data[x].type === 'file' ){
					form = data[x].form;
					form.encoding = form.enctype = "multipart/form-data";
				}
			}

			// Do If there is no defined form element, lets create one.
			if(!form){
				// Build form
				form = doc.createElement('form');
				doc.body.appendChild(form);
				newform = form;
			}

			var input;

			// Add elements to the form if they dont exist
			for(x in data) if(data.hasOwnProperty(x)){

				// Is this an element?
				var el = ( utils.domInstance('input', data[x]) || utils.domInstance('textArea', data[x]) || utils.domInstance('select', data[x]) );

				// is this not an input element, or one that exists outside the form.
				if( !el || data[x].form !== form ){

					// Does an element have the same name?
					var inputs = form.elements[x];
					if(input){
						// Remove it.
						if(!(inputs instanceof NodeList)){
							inputs = [inputs];
						}
						for(i=0;i<inputs.length;i++){
							inputs[i].parentNode.removeChild(inputs[i]);
						}

					}

					// Create an input element
					input = doc.createElement('input');
					input.setAttribute('type', 'hidden');
					input.setAttribute('name', x);

					// Does it have a value attribute?
					if(el){
						input.value = data[x].value;
					}
					else if( utils.domInstance(null, data[x]) ){
						input.value = data[x].innerHTML || data[x].innerText;
					}else{
						input.value = data[x];
					}

					form.appendChild(input);
				}
				// it is an element, which exists within the form, but the name is wrong
				else if( el && data[x].name !== x){
					data[x].setAttribute('name', x);
					data[x].name = x;
				}
			}

			// Disable elements from within the form if they weren't specified
			for(i=0;i<form.elements.length;i++){

				input = form.elements[i];

				// Does the same name and value exist in the parent
				if( !( input.name in data ) && input.getAttribute('disabled') !== true ) {
					// disable
					input.setAttribute('disabled',true);

					// add re-enable to callback
					reenableAfterSubmit.push(input);
				}
			}
		}


		// Set the target of the form
		form.setAttribute('method', 'POST');
		form.setAttribute('target', callbackID);
		form.target = callbackID;


		// Call the path
		pathFunc( {}, function(url){

			// Update the form URL
			form.setAttribute('action', url);

			// Submit the form
			// Some reason this needs to be offset from the current window execution
			setTimeout(function(){
				form.submit();

				setTimeout(function(){
					try{
						// remove the iframe from the page.
						//win.parentNode.removeChild(win);
						// remove the form
						if(newform){
							newform.parentNode.removeChild(newform);
						}
					}
					catch(e){
						try{
							console.error("HelloJS: could not remove iframe");
						}
						catch(ee){}
					}

					// reenable the disabled form
					for(var i=0;i<reenableAfterSubmit.length;i++){
						if(reenableAfterSubmit[i]){
							reenableAfterSubmit[i].setAttribute('disabled', false);
							reenableAfterSubmit[i].disabled = false;
						}
					}
				},0);
			},100);
		});

		// Build an iFrame and inject it into the DOM
		//var ifm = _append('iframe',{id:'_'+Math.round(Math.random()*1e9), style:shy});
		
		// Build an HTML form, with a target attribute as the ID of the iFrame, and inject it into the DOM.
		//var frm = _append('form',{ method: 'post', action: uri, target: ifm.id, style:shy});

		// _append('input',{ name: x, value: data[x] }, frm);
	},


	//
	// Some of the providers require that only MultiPart is used with non-binary forms.
	// This function checks whether the form contains binary data
	hasBinary : function (data){
		for(var x in data ) if(data.hasOwnProperty(x)){
			if( this.isBinary(data[x]) ){
				return true;
			}
		}
		return false;
	},


	// Determines if a variable Either Is or like a FormInput has the value of a Blob

	isBinary : function(data){

		return data instanceof Object && (
				(this.domInstance('input', data) && data.type === 'file') ||
				("FileList" in window && data instanceof window.FileList) ||
				("File" in window && data instanceof window.File) ||
				("Blob" in window && data instanceof window.Blob));

	},


	// DataURI to Blob
	// Converts a Data-URI to a Blob string
	
	toBlob : function(dataURI){
		var reg = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;
		var m = dataURI.match(reg);
		if(!m){
			return dataURI;
		}
		var binary = atob(dataURI.replace(reg,''));
		var array = [];
		for(var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], {type: m[1]});
	}

});





//
// EXTRA: Convert FORMElements to JSON for POSTING
// Wrappers to add additional functionality to existing functions
//
(function(hello){
	// Copy original function
	var api = hello.api;
	var utils = hello.utils;

utils.extend(utils, {
	//
	// dataToJSON
	// This takes a FormElement|NodeList|InputElement|MixedObjects and convers the data object to JSON.
	//
	dataToJSON : function (p){

		var utils = this,
			w = window;

		var data = p.data;

		// Is data a form object
		if( utils.domInstance('form', data) ){

			data = utils.nodeListToJSON(data.elements);

		}
		else if ( "NodeList" in w && data instanceof NodeList ){

			data = utils.nodeListToJSON(data);

		}
		else if( utils.domInstance('input', data) ){

			data = utils.nodeListToJSON( [ data ] );

		}

		// Is data a blob, File, FileList?
		if( ("File" in w && data instanceof w.File) ||
			("Blob" in w && data instanceof w.Blob) ||
			("FileList" in w && data instanceof w.FileList) ){

			// Convert to a JSON object
			data = {'file' : data};
		}

		// Loop through data if its not FormData it must now be a JSON object
		if( !( "FormData" in w && data instanceof w.FormData ) ){

			// Loop through the object
			for(var x in data) if(data.hasOwnProperty(x)){

				// FileList Object?
				if("FileList" in w && data[x] instanceof w.FileList){
					// Get first record only
					if(data[x].length===1){
						data[x] = data[x][0];
					}
					else{
						//("We were expecting the FileList to contain one file");
					}
				}
				else if( utils.domInstance('input', data[x]) && data[x].type === 'file' ){
					// ignore
					continue;
				}
				else if( utils.domInstance('input', data[x]) ||
					utils.domInstance('select', data[x]) ||
					utils.domInstance('textArea', data[x])
					){
					data[x] = data[x].value;
				}
				// Else is this another kind of element?
				else if( utils.domInstance(null, data[x]) ){
					data[x] = data[x].innerHTML || data[x].innerText;
				}
			}
		}

		// Data has been converted to JSON.
		p.data = data;
		return data;
	},


	//
	// NodeListToJSON
	// Given a list of elements extrapolate their values and return as a json object
	nodeListToJSON : function(nodelist){

		var json = {};

		// Create a data string
		for(var i=0;i<nodelist.length;i++){

			var input = nodelist[i];

			// If the name of the input is empty or diabled, dont add it.
			if(input.disabled||!input.name){
				continue;
			}

			// Is this a file, does the browser not support 'files' and 'FormData'?
			if( input.type === 'file' ){
				json[ input.name ] = input;
			}
			else{
				json[ input.name ] = input.value || input.innerHTML;
			}
		}

		return json;
	}
});


	// Replace it
	hello.api = function(){
		// get arguments
		var p = utils.args({path:'s!', method : "s", data:'o', timeout:'i', callback:"f" }, arguments);
		// Change for into a data object
		if(p.data){
			utils.dataToJSON(p);
		}
		// Continue
		return api.call(this, p);
	};

})(hello);

//
// Dropbox
//
(function(hello){

function formatError(o){
	if(o&&"error" in o){
		o.error = {
			code : "server_error",
			message : o.error.message || o.error
		};
	}
}
	
function format_file(o){

	if(typeof(o)!=='object' ||
		"Blob" in window && o instanceof Blob ||
		"ArrayBuffer" in window && o instanceof ArrayBuffer){
		// this is a file, let it through unformatted
		return;
	}
	if("error" in o){
		return;
	}

	var path = o.root + o.path.replace(/\&/g, '%26');
	if(o.thumb_exists){
		o.thumbnail = hello.settings.oauth_proxy + "?path=" +
		encodeURIComponent('https://api-content.dropbox.com/1/thumbnails/'+ path + '?format=jpeg&size=m') + '&access_token=' + hello.getAuthResponse('dropbox').access_token;
	}
	o.type = ( o.is_dir ? 'folder' : o.mime_type );
	o.name = o.path.replace(/.*\//g,'');
	if(o.is_dir){
		o.files = 'metadata/' + path;
	}
	else{
		o.downloadLink = hello.settings.oauth_proxy + "?path=" +
		encodeURIComponent('https://api-content.dropbox.com/1/files/'+ path ) + '&access_token=' + hello.getAuthResponse('dropbox').access_token;
		o.file = 'https://api-content.dropbox.com/1/files/'+ path;
	}
	if(!o.id){
		o.id = o.path.replace(/^\//,'');
	}
//	o.media = "https://api-content.dropbox.com/1/files/" + path;
}


function req(str){
	return function(p,cb){
		delete p.data.limit;
		cb(str);
	};
}


hello.init({
	'dropbox' : {

		login : function(p){
			// The dropbox login window is a different size.
			p.options.window_width = 1000;
			p.options.window_height = 1000;
		},

		/*
		// DropBox does not allow Unsecure HTTP URI's in the redirect_uri field
		// ... otherwise i'd love to use OAuth2
		// Follow request https://forums.dropbox.com/topic.php?id=106505

		//p.qs.response_type = 'code';
		oauth:{
			version:2,
			auth	: "https://www.dropbox.com/1/oauth2/authorize",
			grant	: 'https://api.dropbox.com/1/oauth2/token'
		},
		*/
		oauth : {
			version : "1.0",
			auth	: "https://www.dropbox.com/1/oauth/authorize",
			request : 'https://api.dropbox.com/1/oauth/request_token',
			token	: 'https://api.dropbox.com/1/oauth/access_token'
		},

		// AutoRefresh
		// Signin once token expires?
		autorefresh : false,

		// API Base URL
		base	: "https://api.dropbox.com/1/",

		// Root
		// BESPOKE SETTING
		// This is says whether to use the custom environment of Dropbox or to use their own environment
		// Because it's notoriously difficult for DropBox too provide access from other webservices, this defaults to Sandbox
		root : 'sandbox',

		// Map GET requests
		get : {
			"me"		: 'account/info',

			// https://www.dropbox.com/developers/core/docs#metadata
			"me/files"	: req("metadata/@{root|sandbox}/@{parent}"),
			"me/folder"	: req("metadata/@{root|sandbox}/@{id}"),
			"me/folders" : req('metadata/@{root|sandbox}/'),

			"default" : function(p,callback){
				if(p.path.match("https://api-content.dropbox.com/1/files/")){
					// this is a file, return binary data
					p.method = 'blob';
				}
				callback(p.path);
			}
		},
		post : {
			"me/files" : function(p,callback){

				var path = p.data.parent,
					file_name = p.data.name;

				p.data = {
					file : p.data.file
				};

				// Does this have a data-uri to upload as a file?
				if( typeof( p.data.file ) === 'string' ){
					p.data.file = hello.utils.toBlob(p.data.file);
				}

				callback('https://api-content.dropbox.com/1/files_put/@{root|sandbox}/'+path+"/"+file_name);
			},
			"me/folders" : function(p, callback){

				var name = p.data.name;
				p.data = {};

				callback('fileops/create_folder?root=@{root|sandbox}&'+hello.utils.param({
					path : name
				}));
			}
		},

		// Map DELETE requests 
		del : {
			"me/files" : "fileops/delete?root=@{root|sandbox}&path=@{id}",
			"me/folder" : "fileops/delete?root=@{root|sandbox}&path=@{id}"
		},


		wrap : {
			me : function(o){
				formatError(o);
				if(!o.uid){
					return o;
				}
				o.name = o.display_name;
				o.first_name = o.name.split(" ")[0];
				o.last_name = o.name.split(" ")[1];
				o.id = o.uid;
				delete o.uid;
				delete o.display_name;
				return o;
			},
			"default"	: function(o){
				formatError(o);
				if(o.is_dir && o.contents){
					o.data = o.contents;
					delete o.contents;

					for(var i=0;i<o.data.length;i++){
						o.data[i].root = o.root;
						format_file(o.data[i]);
					}
				}

				format_file(o);

				if(o.is_deleted){
					o.success = true;
				}

				return o;
			}
		},

		// doesn't return the CORS headers
		xhr : function(p){

			// the proxy supports allow-cross-origin-resource
			// alas that's the only thing we're using. 
			if( p.data && p.data.file ){
				var file = p.data.file;
				if( file ){
					if(file.files){
						p.data = file.files[0];
					}
					else{
						p.data = file;
					}
				}
			}
			if(p.method==='delete'){
				// Post delete operations
				p.method = 'post';

			}
			return true;
		}
	}
});

})(hello);

//
// Facebook
//
(function(hello){

function formatUser(o){
	if(o.id){
		o.thumbnail = o.picture = 'http://graph.facebook.com/'+o.id+'/picture';
	}
	return o;
}

function formatFriends(o){
	if("data" in o){
		for(var i=0;i<o.data.length;i++){
			formatUser(o.data[i]);
		}
	}
	return o;
}

function format(o){
	if("data" in o){
		var token = hello.getAuthResponse('facebook').access_token;
		for(var i=0;i<o.data.length;i++){
			var d = o.data[i];
			if(d.picture){
				d.thumbnail = d.picture;
			}
			if(d.cover_photo){
				d.thumbnail = base + d.cover_photo+'/picture?access_token='+token;
			}
			if(d.type==='album'){
				d.files = d.photos = base + d.id+'/photos';
			}
			if(d.can_upload){
				d.upload_location = base + d.id+'/photos';
			}
		}
	}
	return o;
}

var base = 'https://graph.facebook.com/';

hello.init({
	facebook : {
		name : 'Facebook',

		login : function(p){
			// The facebook login window is a different size.
			p.options.window_width = 580;
			p.options.window_height = 400;
		},

		// REF: http://developers.facebook.com/docs/reference/dialogs/oauth/
		oauth : {
			version : 2,
			auth : 'https://www.facebook.com/dialog/oauth/'
		},

		logout : function(callback){
			// Assign callback to a global handler
			var callbackID = hello.utils.globalEvent( callback );
			var redirect = encodeURIComponent( hello.settings.redirect_uri + "?" + hello.utils.param( { callback:callbackID, result : JSON.stringify({force:true}), state : '{}' } ) );
			var token = (hello.utils.store('facebook')||{}).access_token;
			hello.utils.iframe( 'https://www.facebook.com/logout.php?next='+ redirect +'&access_token='+ token );

			// Possible responses
			// String URL	- hello.logout should handle the logout
			// undefined	- this function will handle the callback
			// true			- throw a success, this callback isn't handling the callback
			// false		- throw a error
			
			if(!token){
				// if there isn't a token, the above wont return a response, so lets trigger a response
				return false;
			}
		},

		// Authorization scopes
		scope : {
			basic			: 'public_profile',
			email			: 'email',
			birthday		: 'user_birthday',
			events			: 'user_events',
			photos			: 'user_photos,user_videos',
			videos			: 'user_photos,user_videos',
			friends			: 'user_friends',
			files			: 'user_photos,user_videos',
			
			publish_files	: 'user_photos,user_videos,publish_stream',
			publish			: 'publish_stream',

			// Deprecated in v2.0
			// create_event	: 'create_event',

			offline_access : 'offline_access'
		},

		// API Base URL
		base : 'https://graph.facebook.com/',

		// Map GET requests
		get : {
			'me' : 'me',
			'me/friends' : 'me/friends',
			'me/following' : 'me/friends',
			'me/followers' : 'me/friends',
			'me/share' : 'me/feed',
			'me/files' : 'me/albums',
			'me/albums' : 'me/albums',
			'me/album' : '@{id}/photos',
			'me/photos' : 'me/photos',
			'me/photo' : '@{id}'

			// PAGINATION
			// https://developers.facebook.com/docs/reference/api/pagination/
		},

		// Map POST requests
		post : {
			'me/share' : 'me/feed',
			'me/albums' : 'me/albums',
			'me/album' : '@{id}/photos'
		},

		// Map DELETE requests
		del : {
			/*
			// Can't delete an album
			// http://stackoverflow.com/questions/8747181/how-to-delete-an-album
			'me/album' : '@{id}'
			*/
			'me/photo' : '@{id}'
		},

		wrap : {
			me : formatUser,
			'me/friends' : formatFriends,
			'me/following' : formatFriends,
			'me/followers' : formatFriends,
			'me/albums' : format,
			'me/files' : format,
			'default' : format
		},

		// special requirements for handling XHR
		xhr : function(p,qs){
			if(p.method==='get'||p.method==='post'){
				qs.suppress_response_codes = true;
			}
			// Is this a post with a data-uri?
			if( p.method==='post' && p.data && typeof(p.data.file) === 'string'){
				// Convert the Data-URI to a Blob
				p.data.file = hello.utils.toBlob(p.data.file);
			}
			return true;
		},

		// Special requirements for handling JSONP fallback
		jsonp : function(p,qs){
			var m = p.method.toLowerCase();
			if( m !== 'get' && !hello.utils.hasBinary(p.data) ){
				p.data.method = m;
				p.method = 'get';
			}
			else if(p.method === "delete"){
				qs.method = 'delete';
				p.method = "post";
			}
		},

		// Special requirements for iframe form hack
		form : function(p){
			return {
				// fire the callback onload
				callbackonload : true
			};
		}
	}
});


})(hello);
//
// Flickr
//
(function(hello){


function getApiUrl(method, extra_params, skip_network){
	var url=((skip_network) ? "" : "flickr:") +
			"?method=" + method +
			"&api_key="+ hello.init().flickr.id +
			"&format=json";
	for (var param in extra_params){ if (extra_params.hasOwnProperty(param)) {
		url += "&" + param + "=" + extra_params[param];
		// url += "&" + param + "=" + encodeURIComponent(extra_params[param]);
	}}
	return url;
}

// this is not exactly neat but avoid to call
// the method 'flickr.test.login' for each api call

function withUser(cb){

	var auth = hello.getAuthResponse("flickr");

	if(auth&&auth.user_nsid){
		cb(auth.user_nsid);
	}
	else{
		hello.api(getApiUrl("flickr.test.login"), function(userJson){
			// If the
			cb( checkResponse(userJson, "user").id );
		});
	}
}

function sign(url, params){
	if(!params){
		params = {};
	}
	return function(p, callback){
		withUser(function(user_id){
			params.user_id = user_id;
			callback(getApiUrl(url, params, true));
		});
	};
}


function getBuddyIcon(profile, size){
	var url="https://www.flickr.com/images/buddyicon.gif";
	if (profile.nsid && profile.iconserver && profile.iconfarm){
		url="https://farm" + profile.iconfarm + ".staticflickr.com/" +
			profile.iconserver + "/" +
			"buddyicons/" + profile.nsid +
			((size) ? "_"+size : "") + ".jpg";
	}
	return url;
}

function getPhoto(id, farm, server, secret, size){
	size = (size) ? "_"+size : '';
	return "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+size+".jpg";
}

function formatUser(o){
}

function formatError(o){
	if(o && o.stat && o.stat.toLowerCase()!='ok'){
		o.error = {
			code : "invalid_request",
			message : o.message
		};
	}
}

function formatPhotos(o){
	if (o.photoset || o.photos){
		var set = ("photoset" in o) ? 'photoset' : 'photos';
		o = checkResponse(o, set);
		paging(o);
		o.data = o.photo;
		delete o.photo;
		for(var i=0;i<o.data.length;i++){
			var photo = o.data[i];
			photo.name = photo.title;
			photo.picture = getPhoto(photo.id, photo.farm, photo.server, photo.secret, '');
			photo.source = getPhoto(photo.id, photo.farm, photo.server, photo.secret, 'b');
			photo.thumbnail = getPhoto(photo.id, photo.farm, photo.server, photo.secret, 'm');
		}
	}
	return o;
}
function checkResponse(o, key){

	if( key in o) {
		o = o[key];
	}
	else if(!("error" in o)){
		o.error = {
			code : "invalid_request",
			message : o.message || "Failed to get data from Flickr"
		};
	}
	return o;
}

function formatFriends(o){
	formatError(o);
	if(o.contacts){
		o = checkResponse(o,'contacts');
		paging(o);
		o.data = o.contact;
		delete o.contact;
		for(var i=0;i<o.data.length;i++){
			var item = o.data[i];
			item.id = item.nsid;
			item.name = item.realname || item.username;
			item.thumbnail = getBuddyIcon(item, 'm');
		}
	}
	return o;
}

function paging(res){
	if( res.page && res.pages && res.page !== res.pages){
		res.paging = {
			next : "?page=" + (++res.page)
		};
	}
}

hello.init({
	'flickr' : {

		name : "Flickr",

		// Ensure that you define an oauth_proxy
		oauth : {
			version : "1.0a",
			auth	: "https://www.flickr.com/services/oauth/authorize?perms=read",
			request : 'https://www.flickr.com/services/oauth/request_token',
			token	: 'https://www.flickr.com/services/oauth/access_token'
		},

		// AutoRefresh
		// Signin once token expires?
		autorefresh : false,

		// API base URL
		base		: "https://api.flickr.com/services/rest",

		// Map GET resquests
		get : {
			"me"		: sign("flickr.people.getInfo"),
			"me/friends": sign("flickr.contacts.getList", {per_page:"@{limit|50}"}),
			"me/following": sign("flickr.contacts.getList", {per_page:"@{limit|50}"}),
			"me/followers": sign("flickr.contacts.getList", {per_page:"@{limit|50}"}),
			"me/albums"	: sign("flickr.photosets.getList", {per_page:"@{limit|50}"}),
			"me/photos" : sign("flickr.people.getPhotos", {per_page:"@{limit|50}"})
		},

		wrap : {
			me : function(o){
				formatError(o);
				o = checkResponse(o, "person");
				if(o.id){
					if(o.realname){
						o.name = o.realname._content;
						var m = o.name.split(" ");
						o.first_name = m[0];
						o.last_name = m[1];
					}
					o.thumbnail = getBuddyIcon(o, 'l');
					o.picture = getBuddyIcon(o, 'l');
				}
				return o;
			},
			"me/friends" : formatFriends,
			"me/followers" : formatFriends,
			"me/following" : formatFriends,
			"me/albums" : function(o){
				formatError(o);
				o = checkResponse(o, "photosets");
				paging(o);
				if(o.photoset){
					o.data = o.photoset;
					delete o.photoset;
					for(var i=0;i<o.data.length;i++){
						var item = o.data[i];
						item.name = item.title._content;
						item.photos = "https://api.flickr.com/services/rest" + getApiUrl("flickr.photosets.getPhotos", {photoset_id: item.id}, true);
					}
				}
				return o;
			},
			"me/photos" : function(o){
				formatError(o);
				return formatPhotos(o);
			},
			"default" : function(o){
				formatError(o);
				return formatPhotos(o);
			}
		},

		xhr : false,

		jsonp: function(p,qs){
			if(p.method.toLowerCase() == "get"){
				delete qs.callback;
				qs.jsoncallback = p.callbackID;
			}
		}
	}
});
})(hello);
//
// FourSquare
//
(function(hello){

function formatError(o){
	if(o.meta&&o.meta.code===400){
		o.error = {
			code : "access_denied",
			message : o.meta.errorDetail
		};
	}
}

function formatUser(o){
	if(o&&o.id){
		o.thumbnail = o.photo.prefix + '100x100'+ o.photo.suffix;
		o.name = o.firstName + ' ' + o.lastName;
		o.first_name = o.firstName;
		o.last_name = o.lastName;
		if(o.contact){
			if(o.contact.email){
				o.email = o.contact.email;
			}
		}
	}
}

function paging(res){
	
}


hello.init({
	foursquare : {

		name : 'FourSquare',

		oauth : {
			version : 2,
			auth : 'https://foursquare.com/oauth2/authenticate'
		},

		// Alter the querystring
		querystring : function(qs){
			var token = qs.access_token;
			delete qs.access_token;
			qs.oauth_token = token;
			qs.v = 20121125;
		},

		base : 'https://api.foursquare.com/v2/',

		get : {
			'me' : 'users/self',
			'me/friends' : 'users/self/friends',
			'me/followers' : 'users/self/friends',
			'me/following' : 'users/self/friends'
		},
		wrap : {
			me : function(o){
				formatError(o);
				if(o && o.response){
					o = o.response.user;
					formatUser(o);
				}
				return o;
			},
			'default' : function(o){
				formatError(o);

				// Format Friends
				if(o && "response" in o && "friends" in o.response && "items" in o.response.friends ){
					o.data = o.response.friends.items;
					delete o.response;
					for(var i=0;i<o.data.length;i++){
						formatUser(o.data[i]);
					}
				}
				return o;
			}
		}
	}
});

})(hello);
//
// GitHub
//
(function(hello){

function formatError(o,headers){
	var code = headers ? headers.statusCode : ( o && "meta" in o && "status" in o.meta && o.meta.status );
	if( (code===401||code===403) ){
		o.error = {
			code : "access_denied",
			message : o.message || (o.data?o.data.message:"Could not get response")
		};
		delete o.message;
	}
}

function formatUser(o){
	if(o.id){
		o.thumbnail = o.picture = o.avatar_url;
		o.name = o.login;
	}
}

function paging(res,headers,req){
	if(res.data&&res.data.length&&headers&&headers.Link){
		var next = headers.Link.match(/&page=([0-9]+)/);
		if(next){
			res.paging = {
				next : "?page="+ next[1]
			};
		}
	}
}

hello.init({
	github : {
		name : 'GitHub',
		oauth : {
			version : 2,
			auth : 'https://github.com/login/oauth/authorize',
			grant : 'https://github.com/login/oauth/access_token',
			response_type : 'code'
		},
		scope : {
			basic           : '',
			email           : 'user:email'
		},
		base : 'https://api.github.com/',
		get : {
			'me' : 'user',
			'me/friends' : 'user/following?per_page=@{limit|100}',
			'me/following' : 'user/following?per_page=@{limit|100}',
			'me/followers' : 'user/followers?per_page=@{limit|100}'
		},
		wrap : {
			me : function(o,headers){

				formatError(o,headers);
				formatUser(o);

				return o;
			},
			"default" : function(o,headers,req){

				formatError(o,headers);

				if(Object.prototype.toString.call(o) === '[object Array]'){
					o = {data:o};
					paging(o,headers,req);
					for(var i=0;i<o.data.length;i++){
						formatUser(o.data[i]);
					}
				}
				return o;
			}
		}
	}
});

})(hello);

//
// GOOGLE API
//
(function(hello, window){

	"use strict";

	function int(s){
		return parseInt(s,10);
	}

	// Format
	// Ensure each record contains a name, id etc.
	function formatItem(o){
		if(o.error){
			return;
		}
		if(!o.name){
			o.name = o.title || o.message;
		}
		if(!o.picture){
			o.picture = o.thumbnailLink;
		}
		if(!o.thumbnail){
			o.thumbnail = o.thumbnailLink;
		}
		if(o.mimeType === "application/vnd.google-apps.folder"){
			o.type = "folder";
			o.files = "https://www.googleapis.com/drive/v2/files?q=%22"+o.id+"%22+in+parents";
		}
	}

	// Google has a horrible JSON API
	function gEntry(o){
		paging(o);

		var entry = function(a){

			var media = a['media$group']['media$content'].length ? a['media$group']['media$content'][0] : {};
			var i=0, _a;
			var p = {
				id		: a.id.$t,
				name	: a.title.$t,
				description	: a.summary.$t,
				updated_time : a.updated.$t,
				created_time : a.published.$t,
				picture : media ? media.url : null,
				thumbnail : media ? media.url : null,
				width : media.width,
				height : media.height
//				original : a
			};
			// Get feed/children
			if("link" in a){
				for(i=0;i<a.link.length;i++){
					var d = a.link[i];
					if(d.rel.match(/\#feed$/)){
						p.upload_location = p.files = p.photos = d.href;
						break;
					}
				}
			}

			// Get images of different scales
			if('category' in a&&a['category'].length){
				_a  = a['category'];
				for(i=0;i<_a.length;i++){
					if(_a[i].scheme&&_a[i].scheme.match(/\#kind$/)){
						p.type = _a[i].term.replace(/^.*?\#/,'');
					}
				}
			}

			// Get images of different scales
			if('media$thumbnail' in a['media$group'] && a['media$group']['media$thumbnail'].length){
				_a = a['media$group']['media$thumbnail'];
				p.thumbnail = a['media$group']['media$thumbnail'][0].url;
				p.images = [];
				for(i=0;i<_a.length;i++){
					p.images.push({
						source : _a[i].url,
						width : _a[i].width,
						height : _a[i].height
					});
				}
				_a = a['media$group']['media$content'].length ? a['media$group']['media$content'][0] : null;
				if(_a){
					p.images.push({
						source : _a.url,
						width : _a.width,
						height : _a.height
					});
				}
			}
			return p;
		};

		var r = [];
		if("feed" in o && "entry" in o.feed){
			for(i=0;i<o.feed.entry.length;i++){
				r.push(entry(o.feed.entry[i]));
			}
			o.data = r;
			delete o.feed;
		}

		// Old style, picasa, etc...
		else if( "entry" in o ){
			return entry(o.entry);
		}
		// New Style, Google Drive & Plus
		else if( "items" in o ){
			for(var i=0;i<o.items.length;i++){
				formatItem( o.items[i] );
			}
			o.data = o.items;
			delete o.items;
		}
		else{
			formatItem( o );
		}
		return o;
	}

	function formatPerson(o){
		o.name = o.displayName || o.name;
		o.picture = o.picture || ( o.image ? o.image.url : null);
		o.thumbnail = o.picture;
	}

	function formatFriends(o){
		paging(o);
		var r = [];
		if("feed" in o && "entry" in o.feed){
			var token = hello.getAuthResponse('google').access_token;
			for(var i=0;i<o.feed.entry.length;i++){
				var a = o.feed.entry[i],
					pic = (a.link&&a.link.length>0)?a.link[0].href+'?access_token='+token:null;

				r.push({
					id		: a.id.$t,
					name	: a.title.$t,
					email	: (a.gd$email&&a.gd$email.length>0)?a.gd$email[0].address:null,
					updated_time : a.updated.$t,
					picture : pic,
					thumbnail : pic
				});
			}
			o.data = r;
			delete o.feed;
		}
		return o;
	}


	//
	// Paging
	function paging(res){

		// Contacts V2
		if("feed" in res && res.feed['openSearch$itemsPerPage']){
			var limit = int(res.feed['openSearch$itemsPerPage']['$t']),
				start = int(res.feed['openSearch$startIndex']['$t']),
				total = int(res.feed['openSearch$totalResults']['$t']);

			if((start+limit)<total){
				res['paging'] = {
					next : '?start='+(start+limit)
				};
			}
		}
		else if ("nextPageToken" in res){
			res['paging'] = {
				next : "?pageToken="+res['nextPageToken']
			};
		}
	}

	//
	// Misc
	var utils = hello.utils;


	// Multipart
	// Construct a multipart message

	function Multipart(){
		// Internal body
		var body = [],
			boundary = (Math.random()*1e10).toString(32),
			counter = 0,
			line_break = "\r\n",
			delim = line_break + "--" + boundary,
			ready = function(){},
			data_uri = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;

		// Add File
		function addFile(item){
			var fr = new FileReader();
			fr.onload = function(e){
				//addContent( e.target.result, item.type );
				addContent( btoa(e.target.result), item.type + line_break + "Content-Transfer-Encoding: base64");
			};
			fr.readAsBinaryString(item);
		}

		// Add content
		function addContent(content, type){
			body.push(line_break + 'Content-Type: ' + type + line_break + line_break + content);
			counter--;
			ready();
		}

		// Add new things to the object
		this.append = function(content, type){

			// Does the content have an array
			if(typeof(content) === "string" || !('length' in Object(content)) ){
				// converti to multiples
				content = [content];
			}

			for(var i=0;i<content.length;i++){

				counter++;

				var item = content[i];

				// Is this a file?
				// Files can be either Blobs or File types
				if(item instanceof window.File || item instanceof window.Blob){
					// Read the file in
					addFile(item);
				}

				// Data-URI?
				// data:[<mime type>][;charset=<charset>][;base64],<encoded data>
				// /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i
				else if( typeof( item ) === 'string' && item.match(data_uri) ){
					var m = item.match(data_uri);
					addContent(item.replace(data_uri,''), m[1] + line_break + "Content-Transfer-Encoding: base64");
				}

				// Regular string
				else{
					addContent(item, type);
				}
			}
		};

		this.onready = function(fn){
			ready = function(){
				if( counter===0 ){
					// trigger ready
					body.unshift('');
					body.push('--');
					fn( body.join(delim), boundary);
					body = [];
				}
			};
			ready();
		};
	}


	//
	// Events
	//
	var addEvent, removeEvent;

	if(document.removeEventListener){
		addEvent = function(elm, event_name, callback){
			elm.addEventListener(event_name, callback);
		};
		removeEvent = function(elm, event_name, callback){
			elm.removeEventListener(event_name, callback);
		};
	}
	else if(document.detachEvent){
		removeEvent = function (elm, event_name, callback){
			elm.detachEvent("on"+event_name, callback);
		};
		addEvent = function (elm, event_name, callback){
			elm.attachEvent("on"+event_name, callback);
		};
	}

	//
	// postMessage
	// This is used whereby the browser does not support CORS
	//
	var xd_iframe, xd_ready, xd_id, xd_counter, xd_queue=[];
	function xd(method, url, headers, body, callback){

		// This is the origin of the Domain we're opening
		var origin = 'https://content.googleapis.com';

		// Is this the first time?
		if(!xd_iframe){

			// ID
			xd_id = String(parseInt(Math.random()*1e8,10));

			// Create the proxy window
			xd_iframe = utils.append('iframe', { src : origin + "/static/proxy.html?jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.mMZgig4ibk0.O%2Fm%3D__features__%2Fam%3DEQ%2Frt%3Dj%2Fd%3D1%2Frs%3DAItRSTNZBJcXGialq7mfSUkqsE3kvYwkpQ#parent="+window.location.origin+"&rpctoken="+xd_id,
										style : {position:'absolute',left:"-1000px",bottom:0,height:'1px',width:'1px'} }, 'body');

			// Listen for on ready events
			// Set the window listener to handle responses from this
			addEvent( window, "message", function CB(e){

				// Try a callback
				if(e.origin !== origin){
					return;
				}

				var json;

				try{
					json = JSON.parse(e.data);
				}
				catch(ee){
					// This wasn't meant to be
					return;
				}

				// Is this the right implementation?
				if(json && json.s && json.s === "ready:"+xd_id){
					// Yes, it is.
					// Lets trigger the pending operations
					xd_ready = true;
					xd_counter = 0;

					for(var i=0;i<xd_queue.length;i++){
						xd_queue[i]();
					}
				}
			});
		}

		//
		// Action
		// This is the function to call if/once the proxy has successfully loaded
		// If makes a call to the IFRAME
		var action = function(){

			var nav = window.navigator,
				position = ++xd_counter,
				qs = utils.param(url.match(/\?.+/)[0]);

			var token = qs.access_token;
			delete qs.access_token;

			// The endpoint is ready send the response
			var message = JSON.stringify({
				"s":"makeHttpRequests",
				"f":"..",
				"c":position,
				"a":[[{
					"key":"gapiRequest",
					"params":{
						"url":url.replace(/(^https?\:\/\/[^\/]+|\?.+$)/,''), // just the pathname
						"httpMethod":method.toUpperCase(),
						"body": body,
						"headers":{
							"Authorization":":Bearer "+token,
							"Content-Type":headers['content-type'],
							"X-Origin":window.location.origin,
							"X-ClientDetails":"appVersion="+nav.appVersion+"&platform="+nav.platform+"&userAgent="+nav.userAgent
						},
						"urlParams": qs,
						"clientName":"google-api-javascript-client",
						"clientVersion":"1.1.0-beta"
					}
				}]],
				"t":xd_id,
				"l":false,
				"g":true,
				"r":".."
			});

			addEvent( window, "message", function CB2(e){

				if(e.origin !== origin ){
					// not the incoming message we're after
					return;
				}

				// Decode the string
				try{
					var json = JSON.parse(e.data);
					if( json.t === xd_id && json.a[0] === position ){
						removeEvent( window, "message", CB2);
						callback(JSON.parse(JSON.parse(json.a[1]).gapiRequest.data.body));
					}
				}
				catch(ee){
					callback({
						error: {
							code : "request_error",
							message : "Failed to post to Google"
						}
					});
				}
			});

			// Post a message to iframe once it has loaded
			xd_iframe.contentWindow.postMessage(message, '*');
		};


		//
		// Check to see if the proy has loaded,
		// If it has then action()!
		// Otherwise, xd_queue until the proxy has loaded
		if(xd_ready){
			action();
		}
		else{
			xd_queue.push(action);
		}
	}
	/**/

	//
	// Upload to Drive
	// If this is PUT then only augment the file uploaded
	// PUT https://developers.google.com/drive/v2/reference/files/update
	// POST https://developers.google.com/drive/manage-uploads
	function uploadDrive(p, callback){
		
		var data = {};

		if( p.data && p.data instanceof window.HTMLInputElement ){
			p.data = { file : p.data };
		}
		if( !p.data.name && Object(Object(p.data.file).files).length && p.method === 'post' ){
			p.data.name = p.data.file.files[0].name;
		}

		if(p.method==='post'){
			p.data = {
				"title": p.data.name,
				"parents": [{"id":p.data.parent||'root'}],
				"file" : p.data.file
			};
		}
		else{
			// Make a reference
			data = p.data;
			p.data = {};

			// Add the parts to change as required
			if( data.parent ){
				p.data["parents"] =  [{"id":p.data.parent||'root'}];
			}
			if( data.file ){
				p.data.file = data.file;
			}
			if( data.name ){
				p.data.title = data.name;
			}
		}

		callback('upload/drive/v2/files'+( data.id ? '/' + data.id : '' )+'?uploadType=multipart');
	}


	//
	// URLS
	var contacts_url = 'https://www.google.com/m8/feeds/contacts/default/full?alt=json&max-results=@{limit|1000}&start-index=@{start|1}';

	//
	// Embed
	hello.init({
		google : {
			name : "Google Plus",

			// Login
			login : function(p){
				if(p.qs.display==='none'){
					// Google doesn't like display=none
					p.qs.display = '';
				}
				if(p.qs.response_type==='code'){

					// Lets set this to an offline access to return a refresh_token
					p.qs.access_type = 'offline';
				}
			},

			// REF: http://code.google.com/apis/accounts/docs/OAuth2UserAgent.html
			oauth : {
				version : 2,
				auth : "https://accounts.google.com/o/oauth2/auth",
				grant : "https://accounts.google.com/o/oauth2/token"
			},

			// Authorization scopes
			scope : {
				//,
				basic : "https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
				email			: '',
				birthday		: '',
				events			: '',
				photos			: 'https://picasaweb.google.com/data/',
				videos			: 'http://gdata.youtube.com',
				friends			: 'https://www.google.com/m8/feeds, https://www.googleapis.com/auth/plus.login',
				files			: 'https://www.googleapis.com/auth/drive.readonly',
				
				publish			: '',
				publish_files	: 'https://www.googleapis.com/auth/drive',
				create_event	: '',

				offline_access : ''
			},
			scope_delim : ' ',

			// API base URI
			base : "https://www.googleapis.com/",

			// Map GET requests
			get : {
				//	me	: "plus/v1/people/me?pp=1",
				'me' : 'oauth2/v1/userinfo?alt=json',

				// https://developers.google.com/+/api/latest/people/list
				'me/friends' : 'plus/v1/people/me/people/visible?maxResults=@{limit|100}',
				'me/following' : contacts_url,
				'me/followers' : contacts_url,
				'me/contacts' : contacts_url,
				'me/share' : 'plus/v1/people/me/activities/public?maxResults=@{limit|100}',
				'me/feed' : 'plus/v1/people/me/activities/public?maxResults=@{limit|100}',
				'me/albums' : 'https://picasaweb.google.com/data/feed/api/user/default?alt=json&max-results=@{limit|100}&start-index=@{start|1}',
				'me/album' : function(p,callback){
					var key = p.data.id;
					delete p.data.id;
					callback(key.replace("/entry/", "/feed/"));
				},
				'me/photos' : 'https://picasaweb.google.com/data/feed/api/user/default?alt=json&kind=photo&max-results=@{limit|100}&start-index=@{start|1}',

				// https://developers.google.com/drive/v2/reference/files/list
				'me/files' : 'drive/v2/files?q=%22@{parent|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}',

				// https://developers.google.com/drive/v2/reference/files/list
				'me/folders' : 'drive/v2/files?q=%22@{id|root}%22+in+parents+and+mimeType+=+%22application/vnd.google-apps.folder%22+and+trashed=false&maxResults=@{limit|100}',

				// https://developers.google.com/drive/v2/reference/files/list
				'me/folder' : 'drive/v2/files?q=%22@{id|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}'
			},

			// Map post requests
			post : {
				/*
				// PICASA
				'me/albums' : function(p, callback){
					p.data = {
						"title": p.data.name,
						"summary": p.data.description,
						"category": 'http://schemas.google.com/photos/2007#album'
					};
					callback('https://picasaweb.google.com/data/feed/api/user/default?alt=json');
				},
				*/
				// DRIVE
				'me/files' : uploadDrive,
				'me/folders' : function(p, callback){
					p.data = {
						"title": p.data.name,
						"parents": [{"id":p.data.parent||'root'}],
						"mimeType": "application/vnd.google-apps.folder"
					};
					callback('drive/v2/files');
				}
			},

			// Map post requests
			put : {
				'me/files' : uploadDrive
			},

			// Map DELETE requests
			del : {
				'me/files' : 'drive/v2/files/@{id}',
				'me/folder' : 'drive/v2/files/@{id}'
			},

			wrap : {
				me : function(o){
					if(o.id){
						o.last_name = o.family_name || (o.name? o.name.familyName : null);
						o.first_name = o.given_name || (o.name? o.name.givenName : null);
	//						o.name = o.first_name + ' ' + o.last_name;

						formatPerson(o);
					}
					return o;
				},
				'me/friends'	: function(o){
					if(o.items){
						paging(o);
						o.data = o.items;
						delete o.items;
						for(var i=0;i<o.data.length;i++){
							formatPerson(o.data[i]);
						}
					}
					return o;
				},
				'me/contacts'	: formatFriends,
				'me/followers'	: formatFriends,
				'me/following'	: formatFriends,
				'me/share' : function(o){
					paging(o);
					o.data = o.items;
					delete o.items;
					return o;
				},
				'me/feed' : function(o){
					paging(o);
					o.data = o.items;
					delete o.items;
					return o;
				},
				'me/albums' : gEntry,
				'me/photos' : gEntry,
				'default' : gEntry
			},
			xhr : function(p){

				// Post
				if(p.method==='post'||p.method==='put'){

					// Does this contain binary data?
					if( p.data && utils.hasBinary(p.data) || p.data.file ){

						// There is support for CORS via Access Control headers
						// ... unless otherwise stated by post/put handlers
						p.cors_support = p.cors_support || true;


						// There is noway, as it appears, to Upload a file along with its meta data
						// So lets cancel the typical approach and use the override '{ api : function() }' below
						return false;
					}

					// Convert the POST into a javascript object
					p.data = JSON.stringify(p.data);
					p.headers = {
						'content-type' : 'application/json'
					};
				}
				return true;
			},

			//
			// Custom API handler, overwrites the default fallbacks
			// Performs a postMessage Request
			//
			api : function(url,p,qs,callback){

				// Dont use this function for GET requests
				if(p.method==='get'){
					return;
				}

				// Contain inaccessible binary data?
				// If there is no "files" property on an INPUT then we can't get the data
				if( "file" in p.data && utils.domInstance('input', p.data.file ) && !( "files" in p.data.file ) ){
					callback({
						error : {
							code : 'request_invalid',
							message : "Sorry, can't upload your files to Google Drive in this browser"
						}
					});
				}

				// Extract the file, if it exists from the data object
				// If the File is an INPUT element lets just concern ourselves with the NodeList
				var file;
				if( "file" in p.data ){
					file = p.data.file;
					delete p.data.file;

					if( typeof(file)==='object' && "files" in file){
						// Assign the NodeList
						file = file.files;
					}
					if(!file || !file.length){
						callback({
							error : {
								code : 'request_invalid',
								message : 'There were no files attached with this request to upload'
							}
						});
						return;
					}
				}


//				p.data.mimeType = Object(file[0]).type || 'application/octet-stream';

				// Construct a multipart message
				var parts = new Multipart();
				parts.append( JSON.stringify(p.data), 'application/json');

				// Read the file into a  base64 string... yep a hassle, i know
				// FormData doesn't let us assign our own Multipart headers and HTTP Content-Type
				// Alas GoogleApi need these in a particular format
				if(file){
					parts.append( file );
				}

				parts.onready(function(body, boundary){

					// Does this userAgent and endpoint support CORS?
					if( p.cors_support ){
						// Deliver via 
						utils.xhr( p.method, utils.qs(url,qs), {
							'content-type' : 'multipart/related; boundary="'+boundary+'"'
						}, body, callback );
					}
					else{
						// Otherwise lets POST the data the good old fashioned way postMessage
						xd( p.method, utils.qs(url,qs), {
							'content-type' : 'multipart/related; boundary="'+boundary+'"'
						}, body, callback );
					}
				});

				return true;
			}
		}
	});
})(hello, window);
//
// Instagram
//
(function(hello){


function formatError(o){
	if(o && "meta" in o && "error_type" in o.meta){
		o.error = {
			code : o.meta.error_type,
			message : o.meta.error_message
		};
	}
}


function formatFriends(o){
	paging(o);
	if(o && "data" in o ){
		for(var i=0;i<o.data.length;i++){
			formatFriend(o.data[i]);
		}
	}
	return o;
}

function formatFriend(o){
	if(o.id){
		o.thumbnail = o.profile_picture;
		o.name = o.full_name || o.username;
	}
}


// Paging
// http://instagram.com/developer/endpoints/
function paging(res){
	if("pagination" in res){
		res['paging'] = {
			next : res['pagination']['next_url']
		};
		delete res.pagination;
	}
}

hello.init({
	instagram : {
		name : 'Instagram',
		login: function(p){
			// Instagram throws errors like "Javascript API is unsupported" if the display is 'popup'.
			// Make the display anything but 'popup'
			p.qs.display = '';
		},

		oauth : {
			version : 2,
			auth : 'https://instagram.com/oauth/authorize/'
		},

		scope : {
			basic : 'basic',
			friends : 'relationships',
			photos : ''
		},
		scope_delim : ' ',

		base : 'https://api.instagram.com/v1/',

		get : {
			'me' : 'users/self',
			'me/feed' : 'users/self/feed?count=@{limit|100}',
			'me/photos' : 'users/self/media/recent?min_id=0&count=@{limit|100}',
			'me/friends' : 'users/self/follows?count=@{limit|100}',
			'me/following' : 'users/self/follows?count=@{limit|100}',
			'me/followers' : 'users/self/followed-by?count=@{limit|100}'
		},

		wrap : {
			me : function(o){

				formatError(o);

				if("data" in o ){
					o.id = o.data.id;
					o.thumbnail = o.data.profile_picture;
					o.name = o.data.full_name || o.data.username;
				}
				return o;
			},
			"me/friends" : formatFriends,
			"me/following" : formatFriends,
			"me/followers" : formatFriends,
			"me/photos" : function(o){

				formatError(o);
				paging(o);

				if("data" in o){
					for(var i=0;i<o.data.length;i++){
						var d = o.data[i];
						if(d.type !== 'image'){
							o.data.splice(i,1);
							i--;
							continue;
						}
						d.thumbnail = d.images.thumbnail.url;
						d.picture = d.images.standard_resolution.url;
						d.name = d.caption ? d.caption.text : null;
					}
				}
				return o;
			},
			"default" : function(o){
				paging(o);
				return o;
			}
		},
		// Use JSONP
		xhr : false
	}
});
})(hello);
//
// Linkedin
//
(function(hello){

function formatError(o){
	if(o && "errorCode" in o){
		o.error = {
			code : o.status,
			message : o.message
		};
	}
}


function formatUser(o){
	if(o.error){
		return;
	}
	o.first_name = o.firstName;
	o.last_name = o.lastName;
	o.name = o.formattedName || (o.first_name + ' ' + o.last_name);
	o.thumbnail = o.pictureUrl;
}


function formatFriends(o){
	formatError(o);
	paging(o);
	if(o.values){
		o.data = o.values;
		for(var i=0;i<o.data.length;i++){
			formatUser(o.data[i]);
		}
		delete o.values;
	}
	return o;
}

function paging(res){
	if( "_count" in res && "_start" in res && (res._count + res._start) < res._total ){
		res['paging'] = {
			next : "?start="+(res._start+res._count)+"&count="+res._count
		};
	}
}

hello.init({
	'linkedin' : {

		login: function(p){
			p.qs.response_type = 'code';
		},

		oauth : {
			version : 2,
			auth	: "https://www.linkedin.com/uas/oauth2/authorization",
			grant	: "https://www.linkedin.com/uas/oauth2/accessToken"
		},

		scope : {
			basic	: 'r_fullprofile',
			email	: 'r_emailaddress',
			friends : 'r_network',
			publish : 'rw_nus'
		},
		scope_delim : ' ',

		querystring : function(qs){
			// Linkedin signs requests with the parameter 'oauth2_access_token'... yeah anotherone who thinks they should be different!
			qs.oauth2_access_token = qs.access_token;
			delete qs.access_token;
		},

		base	: "https://api.linkedin.com/v1/",

		get : {
			"me"			: 'people/~:(picture-url,first-name,last-name,id,formatted-name)',
			"me/friends"	: 'people/~/connections?count=@{limit|500}',
			"me/followers"	: 'people/~/connections?count=@{limit|500}',
			"me/following"	: 'people/~/connections?count=@{limit|500}',

			// http://developer.linkedin.com/documents/get-network-updates-and-statistics-api
			"me/share"		: "people/~/network/updates?count=@{limit|250}"
		},

		post : {
			//"me/share"		: 'people/~/current-status'
		},

		wrap : {
			me : function(o){
				formatError(o);
				formatUser(o);
				return o;
			},
			"me/friends" : formatFriends,
			"me/following" : formatFriends,
			"me/followers" : formatFriends,
			"me/share" : function(o){
				formatError(o);
				paging(o);
				if(o.values){
					o.data = o.values;
					delete o.values;
					for(var i=0;i<o.data.length;i++){
						var d = o.data[i];
						formatUser(d);
						d.message = d.headline;
					}
				}
				return o;
			},
			"default" : function(o){
				formatError(o);
				paging(o);
			}
		},
		jsonp : function(p,qs){
			qs.format = 'jsonp';
			if(p.method==='get'){
				qs['error-callback'] = '?';
			}
		},
		xhr : false
	}
});

})(hello);

//
// SoundCloud
//
(function(hello){


function formatUser(o){
	if(o.id){
		o.picture = o.avatar_url;
		o.thumbnail = o.avatar_url;
		o.name = o.username || o.full_name;
	}
}

// Paging
// http://developers.soundcloud.com/docs/api/reference#activities
function paging(res){
	if("next_href" in res){
		res['paging'] = {
			next : res["next_href"]
		};
	}
}

hello.init({
	soundcloud : {
		name : 'SoundCloud',

		oauth : {
			version : 2,
			auth : 'https://soundcloud.com/connect'
		},

		// AutoRefresh
		// Signin once token expires?
		autorefresh : false,

		// Alter the querystring
		querystring : function(qs){
			var token = qs.access_token;
			delete qs.access_token;
			qs.oauth_token = token;
			qs['_status_code_map[302]'] = 200;
		},
		// Request path translated
		base : 'https://api.soundcloud.com/',
		get : {
			'me' : 'me.json',

			// http://developers.soundcloud.com/docs/api/reference#me
			'me/friends' : 'me/followings.json',
			'me/followers' : 'me/followers.json',
			'me/following' : 'me/followings.json',

			// http://developers.soundcloud.com/docs/api/reference#activities

			'default' : function(p, callback){
				// include ".json at the end of each request"
				callback(p.path + '.json');
			}
		},
		// Response handlers
		wrap : {
			me : function(o){
				formatUser(o);
				return o;
			},
			"default" : function(o){
				if(o instanceof Array){
					o = {
						data : o
					};
					for(var i=0;i<o.data.length;i++){
						formatUser(o.data[i]);
					}
				}
				paging(o);
				return o;
			}
		}
	}
});

})(hello);
//
// Twitter
//
(function(hello){


function formatUser(o){
	if(o.id){
		if(o.name){
			var m = o.name.split(" ");
			o.first_name = m[0];
			o.last_name = m[1];
		}
		o.thumbnail = o.profile_image_url;
	}
}

function formatFriends(o){
	formaterror(o);
	paging(o);
	if(o.users){
		o.data = o.users;
		for(var i=0;i<o.data.length;i++){
			formatUser(o.data[i]);
		}
		delete o.users;
	}
	return o;
}

function formaterror(o){
	if(o.errors){
		var e = o.errors[0];
		o.error = {
			code : "request_failed",
			message : e.message
		};
	}
}


//
// Paging
// Take a cursor and add it to the path
function paging(res){
	// Does the response include a 'next_cursor_string'
	if("next_cursor_str" in res){
		// https://dev.twitter.com/docs/misc/cursoring
		res['paging'] = {
			next : "?cursor=" + res.next_cursor_str
		};
	}
}


/*
// THE DOCS SAY TO DEFINE THE USER IN THE REQUEST
// ... although its not actually required.

var user_id;

function withUserId(callback){
	if(user_id){
		callback(user_id);
	}
	else{
		hello.api('twitter:/me', function(o){
			user_id = o.id;
			callback(o.id);
		});
	}
}

function sign(url){
	return function(p, callback){
		withUserId(function(user_id){
			callback(url+'?user_id='+user_id);
		});
	};
}
*/

hello.init({
	'twitter' : {
		// Ensure that you define an oauth_proxy
		oauth : {
			version : "1.0a",
			auth	: "https://twitter.com/oauth/authorize",
			request : 'https://twitter.com/oauth/request_token',
			token	: 'https://twitter.com/oauth/access_token'
		},

		// AutoRefresh
		// Signin once token expires?
		autorefresh : false,

		base	: "https://api.twitter.com/1.1/",

		get : {
			"me"			: 'account/verify_credentials.json',
			"me/friends"	: 'friends/list.json?count=@{limit|200}',
			"me/following"	: 'friends/list.json?count=@{limit|200}',
			"me/followers"	: 'followers/list.json?count=@{limit|200}',

			// https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
			"me/share"	: 'statuses/user_timeline.json?count=@{limit|200}'
		},

		post : {
			'me/share' : function(p,callback){
				var data = p.data;
				p.data = null;
				callback( 'statuses/update.json?include_entities=1&status='+data.message );
			}
		},

		wrap : {
			me : function(res){
				formaterror(res);
				formatUser(res);
				return res;
			},
			"me/friends" : formatFriends,
			"me/followers" : formatFriends,
			"me/following" : formatFriends,

			"me/share" : function(res){
				formaterror(res);
				paging(res);
				if(!res.error&&"length" in res){
					return {data : res};
				}
				return res;
			},
			"default" : function(res){
				paging(res);
				return res;
			}
		},
		xhr : function(p){
			// Rely on the proxy for non-GET requests.
			return (p.method!=='get');
		}
	}
});

})(hello);

//
// Windows
//

(function(hello){

function formatUser(o){
	if(o.id){
		var token = hello.getAuthResponse('windows').access_token;
		if(o.emails){
			o.email =  o.emails.preferred;
		}
		// If this is not an non-network friend
		if(o.is_friend!==false){
			// Use the id of the user_id if available
			var id = (o.user_id||o.id);
			o.thumbnail = o.picture = 'https://apis.live.net/v5.0/'+id+'/picture?access_token='+token;
		}
	}
}

function formatFriends(o){
	if("data" in o){
		for(var i=0;i<o.data.length;i++){
			formatUser(o.data[i]);
		}
	}
	return o;
}


hello.init({
	windows : {
		name : 'Windows live',

		// REF: http://msdn.microsoft.com/en-us/library/hh243641.aspx
		oauth : {
			version : 2,
			auth : 'https://login.live.com/oauth20_authorize.srf'
		},

		logout : function(){
			return 'http://login.live.com/oauth20_logout.srf?ts='+(new Date()).getTime();
		},

		// Authorization scopes
		scope : {
			basic			: 'wl.signin,wl.basic',
			email			: 'wl.emails',
			birthday		: 'wl.birthday',
			events			: 'wl.calendars',
			photos			: 'wl.photos',
			videos			: 'wl.photos',
			friends			: 'wl.contacts_emails',
			files			: 'wl.skydrive',
			
			publish			: 'wl.share',
			publish_files	: 'wl.skydrive_update',
			create_event	: 'wl.calendars_update,wl.events_create',

			offline_access	: 'wl.offline_access'
		},

		// API Base URL
		base : 'https://apis.live.net/v5.0/',

		// Map GET requests
		get : {
			// Friends
			"me"	: "me",
			"me/friends" : "me/friends",
			"me/following" : "me/contacts",
			"me/followers" : "me/friends",
			"me/contacts" : "me/contacts",

			"me/albums"	: 'me/albums',

			// Include the data[id] in the path
			"me/album"	: '@{id}/files',
			"me/photo"	: '@{id}',

			// FILES
			"me/files"	: '@{parent|me/skydrive}/files',

			"me/folders" : '@{id|me/skydrive}/files',
			"me/folder" : '@{id|me/skydrive}/files'
		},

		// Map POST requests
		post : {
			"me/albums" : "me/albums",
			"me/album" : "@{id}/files/",

			"me/folders" : '@{id|me/skydrive/}',
			"me/files" : "@{parent|me/skydrive/}/files"
		},

		// Map DELETE requests
		del : {
			// Include the data[id] in the path
			"me/album"	: '@{id}',
			"me/photo"	: '@{id}',
			"me/folder"	: '@{id}',
			"me/files"	: '@{id}'
		},

		wrap : {
			me : function(o){
				formatUser(o);
				return o;
			},
			'me/friends' : formatFriends,
			'me/contacts' : formatFriends,
			'me/followers' : formatFriends,
			'me/following' : formatFriends,
			'me/albums' : function(o){
				if("data" in o){
					for(var i=0;i<o.data.length;i++){
						var d = o.data[i];
						d.photos = d.files = 'https://apis.live.net/v5.0/'+d.id+'/photos';
					}
				}
				return o;
			},
			'default' : function(o){
				if("data" in o){
					for(var i=0;i<o.data.length;i++){
						var d = o.data[i];
						if(d.picture){
							d.thumbnail = d.picture;
						}
					}
				}
				return o;
			}
		},
		xhr : function(p){
			if( p.method !== 'get' && p.method !== 'delete' && !hello.utils.hasBinary(p.data) ){

				// Does this have a data-uri to upload as a file?
				if( typeof( p.data.file ) === 'string' ){
					p.data.file = hello.utils.toBlob(p.data.file);
				}else{
					p.data = JSON.stringify(p.data);
					p.headers = {
						'Content-Type' : 'application/json'
					};
				}
			}
			return true;
		},
		jsonp : function(p){
			if( p.method.toLowerCase() !== 'get' && !hello.utils.hasBinary(p.data) ){
				//p.data = {data: JSON.stringify(p.data), method: p.method.toLowerCase()};
				p.data.method = p.method.toLowerCase();
				p.method = 'get';
			}
		}
	}
});

})(hello);
//
// Yahoo
//
// Register Yahoo developer
(function(hello){

function formatError(o){
	if(o && "meta" in o && "error_type" in o.meta){
		o.error = {
			code : o.meta.error_type,
			message : o.meta.error_message
		};
	}
}

function formatFriends(o){
	formatError(o);
	paging(o);
	var contact,field;
	if(o.query&&o.query.results&&o.query.results.contact){
		o.data = o.query.results.contact;
		delete o.query;
		if(!(o.data instanceof Array)){
			o.data = [o.data];
		}
		for(var i=0;i<o.data.length;i++){
			contact = o.data[i];
			contact.id = null;
			for(var j=0;j<contact.fields.length;j++){
				field = contact.fields[j];
				if(field.type === 'email'){
					contact.email = field.value;
				}
				if(field.type === 'name'){
					contact.first_name = field.value.givenName;
					contact.last_name = field.value.familyName;
					contact.name = field.value.givenName + ' ' + field.value.familyName;
				}
				if(field.type === 'yahooid'){
					contact.id = field.value;
				}
			}
		}
	}
	return o;
}

function paging(res){

	// PAGING
	// http://developer.yahoo.com/yql/guide/paging.html#local_limits
	if(res.query && res.query.count){
		res['paging'] = {
			next : '?start='+res.query.count
		};
	}
}

var yql = function(q){
	return 'https://query.yahooapis.com/v1/yql?q=' + (q + ' limit @{limit|100} offset @{start|0}').replace(/\s/g, '%20') + "&format=json";
};

hello.init({
	'yahoo' : {
		// Ensure that you define an oauth_proxy
		oauth : {
			version : "1.0a",
			auth	: "https://api.login.yahoo.com/oauth/v2/request_auth",
			request : 'https://api.login.yahoo.com/oauth/v2/get_request_token',
			token	: 'https://api.login.yahoo.com/oauth/v2/get_token'
		},

		// AutoRefresh
		// Signin once token expires?
		autorefresh : false,

		/*
		// AUTO REFRESH FIX: Bug in Yahoo can't get this to work with node-oauth-shim
		login : function(o){
			// Is the user already logged in
			var auth = hello('yahoo').getAuthResponse();

			// Is this a refresh token?
			if(o.options.display==='none'&&auth&&auth.access_token&&auth.refresh_token){
				// Add the old token and the refresh token, including path to the query
				// See http://developer.yahoo.com/oauth/guide/oauth-refreshaccesstoken.html
				o.qs.access_token = auth.access_token;
				o.qs.refresh_token = auth.refresh_token;
				o.qs.token_url = 'https://api.login.yahoo.com/oauth/v2/get_token';
			}
		},
		*/

		base	: "https://social.yahooapis.com/v1/",

		get : {
			"me"		: yql('select * from social.profile(0) where guid=me'),
			"me/friends"	: yql('select * from social.contacts(0) where guid=me'),
			"me/following"	: yql('select * from social.contacts(0) where guid=me')
		},
		wrap : {
			me : function(o){
				formatError(o);
				if(o.query&&o.query.results&&o.query.results.profile){
					o = o.query.results.profile;
					o.id = o.guid;
					o.name = o.givenName + ' ' +o.familyName;
					o.last_name = o.familyName;
					o.first_name = o.givenName;
					o.email = o.emails?o.emails.handle:null;
					o.thumbnail = o.image?o.image.imageUrl:null;
				}
				return o;
			},
			// Can't get ID's
			// It might be better to loop through the social.relationshipd table with has unique ID's of users.
			"me/friends" : formatFriends,
			"me/following" : formatFriends,
			"default" : function(res){
				paging(res);
				return res;
			}
		},
		xhr : false
	}
});

})(hello);

//
// AMD shim
//
if (typeof define === 'function' && define.amd) {
	// AMD. Register as an anonymous module.
	define(function(){
		return hello;
	});
}