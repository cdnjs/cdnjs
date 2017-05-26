/*
syncano
ver: 3.1.3beta
build date: 04-08-2014
Copyright 2014 Syncano Inc.
*/
(function(root, undefined) {
	'use strict';


	/**
	 * Library agnostic version of jQuery's Extend by @jonjaques 
	 */

	function type(obj) {
		var checker = {};
		var types = 'Boolean Number String Function Array Date RegExp Object'.split(' ');
		for(var i in types){
			checker[ '[object ' + types[i] + ']' ] = types[i].toLowerCase();
		}
		return obj === null ?
			String( obj ) :
			checker[ Object.prototype.toString.call(obj) ] || 'object';
	}

	function isFunction(obj) {
		return type(obj) === 'function';
	}

	function isWindow(obj) {
		return obj !== null && obj === obj.window;
	}

	function isPlainObject(obj) {
		var hasOwn = Object.prototype.hasOwnProperty;
		if ( !obj || type(obj) !== 'object' || obj.nodeType || isWindow( obj ) ) {
			return false;
		}
		try {
			if(obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf') ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}
		var key;
		for ( key in obj ) {}
		return key === undefined || hasOwn.call( obj, key );
	}

	function isArray(obj){
		return type(obj) === 'array';
	}


	function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	 
		if ( typeof target === 'boolean' ) {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		if ( typeof target !== 'object' && !isFunction(target) ) {
			target = {};
		}

		for ( ; i < length; i++ ) {
			if ( (options = arguments[ i ]) !== null ) {
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
					if ( target === copy ) {
						continue;
					}
					if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}
						target[ name ] = extend( deep, clone, copy );
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		return target;
	}


	/**
	 * converts string in camel case (eg. dataKey) to lowercase with underscores (eg. data_key) 
	 */
	function uncamelize(s){
		var res = [];
		for(var i=0, l=s.length; i<l; i++){
			var letter = s[i];
			if(s.charCodeAt(i) >= 97){
				res.push(letter);
			} else {
				res.push('_');
				res.push(letter.toLowerCase());
			}
		}
		return res.join('');
	}

	/**
	 *  
	 */
	function isset(v){
		return typeof v !== 'undefined' && v !== null;
	}

	/**
	 *  
	 */
	function isNumber(v){
		if(typeof v === 'number' || parseInt(v, 10) === v){
			return true;
		}
		return false;
	}

	/**
	 *  
	 */
	function isDate(v){
		var d = new Date(v);
		if(Object.prototype.toString.call(d) !== '[object Date]'){
			return false;
		}
		return !isNaN(d.getTime());
	}

	/**
	 *  
	 */
	function inArray(v,a){
		if(a.indexOf(v) !== -1){
			return true;
		}
		return false;
	}

	/**
	 *  
	 */
	function isBool(v){
		return typeof v === 'boolean';
	}

	/**
	 * very simple pub-sub structure. Based on PubSubJS by @mroderick (https://github.com/mroderick/PubSubJS) 
	 */

	var PubSub = {};
	var messages = {};
	var lastUID = 0;


	/**
	 *  Register specified function as a callback for given message
	 * 
	 *  @method on
	 *  @param {string} message Message identifier
	 *  @param {function} callback Function to call when message is triggered
	 */
	PubSub.on = function(message, callback){
		if(typeof callback !== 'function'){
			return false;
		}
		
		if(!messages.hasOwnProperty(message)){
			messages[message] = {};
		}
		
		var token = 'uid_' + (++lastUID);
		messages[message][token] = callback;
		return token;
	};


	/**
	 *  Register specified function as a one-time callback (release it after the first run)
	 *
	 *  @method once
	 *  @param {string} message Message identifier
	 *  @param {function} callback Function to call when message is triggered
	 */
	PubSub.once = function(message, callback){
		if(typeof callback !== 'function'){
			return false;
		}
		
		if(!messages.hasOwnProperty(message)){
			messages[message] = {};
		}
		
		var token = 'uid_' + (++lastUID);
		messages[message][token] = function(param){
			delete messages[message][token];
			callback(param);
		};
		return token;
	};


	/**
	 *  Does message have subscribers?
	 *
	 *  @method hasSubscribers
	 *  @param {string} message - message identifier
	 *  @return: boolean
	 */
	PubSub.hasSubscribers = function(message){
		if(typeof message !== 'string'){
			return false;
		}
		if(messages.hasOwnProperty(message) && Object.keys(messages[message]).length){
			return true;
		}
		return false;
	};


	/**
	 *  Remove specified function callback. If no func is given, removes all callbacks for given message
	 *
	 *  @method off
	 *  @param {string} message - message identifier
	 *  @param {function} func - function to remove
	 */
	PubSub.off = function(message, func){
		if(message === 'all'){
			messages = {};
		}
		if(!this.hasSubscribers(message)){
			return false;
		}
		if(typeof func === 'undefined'){
			return delete messages[message];
		}
		var list = messages[message];
		for(var uuid in list){
			if(list.hasOwnProperty(uuid)){
				if(func === list[uuid]){
					return delete messages[message][uuid];
				}
			}
		}
		return false;
	};


	/**
	 *  Calls asynchronically all registered functions for given message. Shortcut method for doTrigger(message, false)
	 *
	 *  @method trigger
	 *  @param {string} message - message identifier
	 *  @return: boolean (true = success, false = fail)
	 */
	PubSub.trigger = function(message){
		return PubSub.doTrigger(message, false, Array.prototype.slice.call(arguments, 1));
	};


	/**
	 *  Calls synchronically all registered functions for given message. Shortcut method for doTrigger(message, true)
	 *
	 *  @method triggerSync
	 *  @param {string} message - message identifier 
	 */
	PubSub.triggerSync = function(message){
		return PubSub.doTrigger(message, true, Array.prototype.slice.call(arguments, 1));
	};


	/**
	 *  Calls all registered functions for given message
	 *
	 *  @method doTrigger
	 *  @param {string} message - message identifier
	 *  @param {boolean} sync - true for synchronous calls, false for asynchronous
	 */
	PubSub.doTrigger = function(message, sync){
		var list, uuid, func;
		var called = false;

		var params = Array.prototype.slice.call(arguments, 2)[0];
		if(this.hasSubscribers(message)){
			list = messages[message];
			for(uuid in list){
				if(list.hasOwnProperty(uuid)){
					func = list[uuid];
					if(sync === false){
						setTimeout(func.call(func, params), 0);
					} else {
						func.call(func, params);
					}
					called = true;
				}
			}
		}
		/**
		 *  trigger event for 'all'. Send original message name as the first parameter
		 */
		var allMessage = 'all';
		if(this.hasSubscribers(allMessage)){
			list = messages[allMessage];
			for(uuid in list){
				if(list.hasOwnProperty(uuid)){
					func = list[uuid];
					if(sync === false){
						setTimeout(func.call(func, message, params), 0);
					} else {
						func.call(func, message, params);
					}
					called = true;
				}
			}
		}

		return called;
	};

	/**
	 * Methods for handling projects - creating, reading, updating, deleting 
	 */
	var Project = {};

		
	/**
	 * Create new project 
	 * 
	 * @method Project.new
	 * @param {string} name Name of the project
	 * @param {string} [description] Short description of the project
	 * @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:project:new
	 */
	Project.new = function(name, description, callback){
		var method = 'project.new';
		
		if(!isset(name)){
			throw new Error(method + ': name must be defined');
		}
		
		var params = {
			name: name,
		};
		
		if(isset(description)){
			params.description = description;
		}
		this.__super__.__sendWithCallback(method, params, 'project', callback);
	};
		

	/**
	 *  Gets list of all projects in current instance
	 *
	 *  @method Project.get
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:project:get
	 */
	Project.get = function(callback){
		var method = 'project.get';
		this.__super__.__sendWithCallback(method, {}, 'project', callback);
	};

		
	/**
	 *  Receives detailed informations about project with given id 
	 * 
	 *  @method Project.getOne
	 *  @param {number} id Project identifier
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:project:get_one
	 */
	Project.getOne = function(id, callback){
		this.__super__.__checkProjectId(id);
		var method = 'project.get_one';
		this.__super__.__sendWithCallback(method, {project_id: id}, 'project', callback);
	};
		

	/**
	 *  Updates project details (name, description)
	 *
	 *  @method Project.update
	 *  @param {number} id Project identifier
	 *  @param {string} name Optional new name of the project
	 *  @param {string} name Optional new description of the project
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:project:update
	 */
	Project.update = function(id, name, description, callback){
		this.__super__.__checkProjectId(id);
		if((typeof name === 'undefined' || name === null) && (typeof description === 'undefined' || name === null)){
			return false;
		}
		var method = 'project.update';
		var params = {
			project_id: id
		};
		if(name){
			params.name = name;
		}
		if(typeof description !== 'undefined' && description !== null){
			params.description = description;
		}
		this.__super__.__sendWithCallback(method, params, 'project', callback);
	};


	/**
	 *  Deletes project
	 *
	 *  @method Project.delete
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:project:delete
	 */
	Project.delete = function(id, callback){
		this.__super__.__checkProjectId(id);
		var method = 'project.delete';
		this.__super__.__sendWithCallback(method, {project_id: id}, null, callback);
	};


	/**
	 * Methods for handling collections - creating, reading, updating, deleting 
	 */
	var Collection = {};


	/**
	 *  Create new collection within specified project
	 *  
	 *  @method Collection.new
	 *  @param {number} projectId Project id that collection will be created for
	 *  @param {string} name New collections name
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {string} [optionalParams.key] New collections key
	 *  @param {string} [optionalParams.description] New collection's description
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:collection:new
	 */
	Collection.new = function(projectId, name, optionalParams, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'collection.new';
		
		if(!isset(name)){
			throw new Error(method + ': name must be set');
		}

		var params = {
			name: name,
			project_id: projectId
		};
		if(isset(optionalParams)){
			if(isset(optionalParams.description)){
				params.description = optionalParams.description;
			}
			if(isset(optionalParams.key)){
				params.key = optionalParams.key;
			}
		}
		this.__super__.__sendWithCallback(method, params, 'collection', callback);
	};


	/**
	 *  Get collections from specified project
	 *
	 *  @method Collection.get
	 *  @param {number} projectId Project id
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {string} [optionalParams.status] Status of events to list. Accepted values: active, inactive, all. Default value: all
	 *  @param {string / Array} [optionalParams.withTags] If specified, will only list events that has specified tag(s) defined. Note: tags are case sensitive
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:collection:get
	 */
	Collection.get = function(projectId, optionalParams, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'collection.get';
		var params = {
			project_id: projectId
		};
		
		if(isset(optionalParams)){
			if(isset(optionalParams.status)){
				if(inArray(optionalParams.status.toLowerCase(), ['all', 'active', 'inactive'])){
					params.status = optionalParams.status;
				} else {
					throw new Error(method + ': status must be one of the values: "active", "inactive", "all"');
				}
			}
			
			if(isset(optionalParams.withTags)){
				params.with_tags = optionalParams.withTags;
			}
		}
		this.__super__.__sendWithCallback(method, params, 'collection', callback);
	};


	/**
	 * Get one collection from specified project.
	 * collection_id/collection_key parameter means that one can use either one of them - collection_id or collection_key 
	 *
	 * @method Collection.getOne
	 * @param {number} projectId Project id
	 * @param {string / Number} collection Either collection id (number) or key (string)
	 * @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:collection:get_one
	 */
	Collection.getOne = function(projectId, collection, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'collection.get_one';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		this.__super__.__sendWithCallback(method, params, 'collection', callback);
	};


	/**
	 * Activates specified collection 
	 * 
	 * @method Collection.activate
	 * @param {number} projectId Project id
	 * @param {number} collectionId Collection id defining collection to be activated
	 * @param {boolean} force If set to True, will force the activation by deactivating all other collections that may share it's data_key.
	 * @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:collection:activate
	 */
	Collection.activate = function(projectId, collectionId, force, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'collection.activate';

		if(!isNumber(collectionId)){
			throw new Error(method + ': collectionId must be a number');
		}

		var params = {
			project_id: projectId,
			collection_id: collectionId
		};
		
		if(isset(force)){
			params.force = force;
		}
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 * Deactivates specified collection
	 * collection_id/collection_key parameter means that one can use either one of them - collection_id or collection_key 
	 *
	 * @method Collection.deactivate
	 * @param {number} projectId Project id
	 * @param {string / Number} collection Either collection id (number) or key (string)
	 * @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:collection:deactivate
	 */
	Collection.deactivate = function(projectId, collection, callback){
		this.__super__.__checkProjectId(projectId);

		var method = 'collection.deactivate';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 * Update existing collections name and/or description
	 * 
	 * @method Collection.update
	 * @param {number} projectId Project id
	 * @param {string / Number} collection Either collection id (number) or key (string)
	 * @param {object} [optionalParams] Optional parameters:
	 * @param {string} [optionalParams.name] New collection name
	 * @param {string} [optionalParams.description] New collection description
	 * @param {function} [callback] Function to be called when successful response comes 
	 */
	/** 
	 *  @event syncano:collection:update
	 */
	Collection.update = function(projectId, collection, optionalParams, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'collection.update';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(isset(optionalParams)){
			if(isset(optionalParams.name)){
				params.name = optionalParams.name;
			}
			if(isset(optionalParams.description)){
				params.description = optionalParams.description;
			}
		}
		this.__super__.__sendWithCallback(method, params, 'collection', callback);
	};


	/**
	 *  Add a tag to specific event.
	 *  Note: tags are case sensitive. Non-ascii characters are not allowed.
	 * 
	 *  @method Collection.addTag
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {string / Array} tags Tag(s) to be added. Either string (one tag) or array (multiple tags)
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {float} [optionalParams.weight] Tags weight. Default value = 1
	 *  @param {boolean} [optionalParams.removeOther] If true, will remove all other tags of specified collection. Default value: False
	 *  @param {function} [callback] Function to be called when successful response comes 
	 */
	/** 
	 *  @event syncano:collection:add_tag
	 */
	Collection.addTag = function(projectId, collection, tags, optionalParams, callback){
		if(typeof arguments[3] === 'function'){
			callback = arguments[3];
			optionalParams = undefined;
		}

		this.__super__.__checkProjectId(projectId);
		var method = 'collection.add_tag';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof tags !== 'string' && !(typeof tags === 'object' && typeof tags.length !== 'undefined')){
			throw new Error(method + ': tags must be passed');
		}
		
		/**
		 *  currently only ascii chars are supported
		 */
		var testTagString;
		if(typeof tags === 'string'){
			testTagString = tags;
		} else {
			testTagString = tags.join(',');
		}
		if(!/^[\000-\177]*$/.test(testTagString)){
			throw new Error(method + ': non ascii characters found in tag name');
		}
		
		params.tags = tags;
		
		if(isset(optionalParams)){
			if(isset(optionalParams.weight)){
				params.weight = optionalParams.weight;
			}
			if(isset(optionalParams.removeOther)){
				params.remove_other = !!optionalParams.removeOther;
			}
		}
		
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 * Delete a tag or tags from specified collection.
	 * Note: tags are case sensitive 
	 *
	 * @method Collection.deleteTag
	 * @param {number} projectId Project id
	 * @param {string / Number} collection Either collection id (number) or key (string)
	 * @param {string / Array} tags Tag(s) to be added. Either string (one tag) or array (multiple tags)
	 * @param {function} [callback] Function to be called when successful response comes 
	 */
	/** 
	 *  @event syncano:collection:delete_tag
	 */
	Collection.deleteTag = function(projectId, collection, tags, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'collection.delete_tag';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof tags !== 'string' && !(typeof tags === 'object' && typeof tags.length !== 'undefined')){
			throw new Error(method + ': tags must be passed');
		}
		
		/**
		 *  currently only ascii chars are supported
		 */
		var testTagString;
		if(typeof tags === 'string'){
			testTagString = tags;
		} else {
			testTagString = tags.join(',');
		}
		if(!/^[\000-\177]*$/.test(testTagString)){
			throw new Error(method + ': non ascii characters found in tag name');
		}
		
		params.tags = tags;
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 * Adds collection-level permission to specified User API client. Requires Backend API key with Admin permission role.
	 * Available permissions:
	 *   create_data - can create new Data Objects within container,
	 *   read_data - can read all Data Objects within container,
	 *   read_own_data - can read only Data Objects within container that were created by associated user,
	 *   update_data - can update all Data Objects within container,
	 *   update_own_data - can update only Data Objects within container that were created by associated user,
	 *   delete_data - can delete all Data Objects within container,
	 *   delete_own_data - can delete only Data Objects within container that were created by associated user
	 * 
	 * @method Collection.authorize
	 * @param {number} projectId Project id
	 * @param {string} collection Either collection id (number) or key (string)
	 * @param {number} apiClientId User API client id
	 * @param {string} permission User API client's permission to add
	 * @param {function} [callback] Function to be called when successful response comes 
	 */
	Collection.authorize = function(projectId, collection, apiClientId, permission, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'collection.authorize';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);

		if(!isNumber(apiClientId)){
			throw new Error(method + ': apiClientId must be a number');
		}

		var availablePermissions = [
			'create_data', 'read_data', 'read_own_data', 'update_data', 'update_own_data', 'delete_data', 'delete_own_data'
		];
		if(availablePermissions.indexOf(permission) === -1){
			throw new Error(method + ': unknown permission name (' + permission + ')');
		}
		params.api_client_id = apiClientId;
		params.permission = permission;
		this.__super__.__sendWithCallback(method, params, null, callback);
	};

	/**
	 * Removes container-level permission from specified User API client. Requires Backend API key with Admin permission role.
	 * Available permissions:
	 *   create_data - can create new Data Objects within container,
	 *   read_data - can read all Data Objects within container,
	 *   read_own_data - can read only Data Objects within container that were created by associated user,
	 *   update_data - can update all Data Objects within container,
	 *   update_own_data - can update only Data Objects within container that were created by associated user,
	 *   delete_data - can delete all Data Objects within container,
	 *   delete_own_data - can delete only Data Objects within container that were created by associated user
	 * 
	 * @method Collection.deauthorize
	 * @param {number} projectId Project id
	 * @param {string} collection Either collection id (number) or key (string)
	 * @param {number} apiClientId User API client id
	 * @param {string} permission User API client's permission to add
	 * @param {function} [callback] Function to be called when successful response comes 
	 */
	Collection.deauthorize = function(projectId, collection, apiClientId, permission, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'collection.deauthorize';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);

		if(!isNumber(apiClientId)){
			throw new Error(method + ': apiClientId must be a number');
		}

		var availablePermissions = [
			'create_data', 'read_data', 'read_own_data', 'update_data', 'update_own_data', 'delete_data', 'delete_own_data'
		];
		if(availablePermissions.indexOf(permission) === -1){
			throw new Error(method + ': unknown permission name (' + permission + ')');
		}
		params.api_client_id = apiClientId;
		params.permission = permission;
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 * Permanently delete specified collection and all associated data.
	 * 
	 * @method Collection.delete
	 * @param {number} projectId Project id
	 * @param {string / Number} collection Either collection id (number) or key (string)
	 * @param {function} [callback] Function to be called when successful response comes 
	 */
	/** 
	 *  @event syncano:collection:delete
	 */
	Collection.delete = function(projectId, collection, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'collection.delete';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 * methods for handling folders - creating, reading, updating, deleting 
	 */

	var Folder = {};

	/**
	 *  Create new folder within specified collection
	 *
	 *  @method Folder.new
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {string} name Folder name
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:folder:new
	 */
	Folder.new = function(projectId, collection, name, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'folder.new';
		var params = {
			name: name,
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(!name){
			throw new Error('Folder must have a name');
		}
		
		this.__super__.__sendWithCallback(method, params, 'folder', callback);
	};


	/**
	 *  Get folders for specified collection
	 *
	 *  @method Folder.get 
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Collection id or key defining collection for which folders will be returned
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:folder:get
	 */
	Folder.get = function(projectId, collection, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'folder.get';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		this.__super__.__sendWithCallback(method, params, 'folder', callback);
	};


	/**
	 *  Get folders for specified collection 
	 * 
	 *  @name method Folder.getOne 
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Collection id or key defining collection for which folder will be returned
	 *  @param {string} folderName Folder name defining folder
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:folder:get_one
	 */
	Folder.getOne = function(projectId, collection, folderName, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'folder.get_one';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof folderName !== 'string'){
			throw new Error('FolderName must be a string');
		}
		params.folder_name = folderName;
		this.__super__.__sendWithCallback(method, params, 'folder', callback);
	};


	/**
	 *  Update existing folder
	 *  Params newName and sourceId can be passed as a single object: {newName: '', sourceId: ''} 
	 * 
	 *  @method Folder.update
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Collection id or key defining collection for which folder will be returned
	 *  @param {string} folderName Folder name defining folder
	 *  @param {string} [newName] New folder name
	 *  @param {string} [sourceId] New source id, can be used for mapping folders to external source
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:folder:update
	 */
	Folder.update = function(projectId, collection, folderName, newName, sourceId, callback){
		if(typeof arguments[3] === 'object'){
			var obj = Object.create(arguments[3]);
			callback = arguments[4];
			newName = obj.newName;
			sourceId = obj.sourceId;
		}
		this.__super__.__checkProjectId(projectId);
		var method = 'folder.update';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof folderName !== 'string'){
			throw new Error('FolderName must be a string');
		}
		params.name = folderName;
		
		if(isset(newName)){
			if(typeof newName !== 'string'){
				throw new Error('newName must be a string');
			}
			params.new_name = newName;
		} else {
			throw new Error('newName must be passed');
		}
		
		if(isset(sourceId)){
			if(isNumber(sourceId)){
				params.source_id = sourceId + '';
			} else {
				throw new Error('sourceId must be a number');
			}
		}
		this.__super__.__sendWithCallback(method, params, 'folder', callback);
	};


	/**
	 *  Permanently delete specified folder and all associated data
	 *
	 *  @method Folder.delete
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Collection id or key defining collection for which folder will be returned
	 *  @param {string} folderName Folder name defining folder
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:folder:delete
	 */
	Folder.delete = function(projectId, collection, folderName, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'folder.delete';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof folderName !== 'string'){
			throw new Error('FolderName must be a string');
		}
		params.name = folderName;
		
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	Folder.authorize = function(apiKey, projectId, collection, permission, folderName, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'folder.authorize';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		params.api_client_id = apiKey;

		if(typeof folderName !== 'string'){
			throw new Error('FolderName must be a string');
		}
		params.name = folderName;

		var availPermissions = [
			'create_data', 'read_data', 'read_own_data', 'update_data', 'update_own_data', 'delete_data', 'delete_own_data'
		];

		if(isset(permission) && availPermissions.indexOf(permission) !== -1){
			params.permission = permission;
		} else {
			throw new Error('Permission must be one of: ' + availPermissions.join(', '));
		}

		this.__super__.__sendWithCallback(method, params, null, callback);
	};

	var Data = {};

	/**
	 *  Creates a new Data Object
	 * 
	 *  @method Data.new
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {string} [optionalParams.dataKey] Used for uniquely identifying message. Has to be unique within collection. Useful for updating
	 *  @param {string} [optionalParams.userName] Name of user to associate Data Object with. If not set, internal user 'syncano' is used
	 *  @param {string} [optionalParams.sourceUrl] Source URL associated with message
	 *  @param {string} [optionalParams.title] Title of data object
	 *  @param {string} [optionalParams.text] Text data associated with message
	 *  @param {string} [optionalParams.link] Link associated with message
	 *  @param {string} [optionalParams.image] Image data associated with message
	 *  @param {string} [optionalParams.imageUrl] Image source URL. Used in combination with image parameter
	 *  @param {string} [optionalParams.folder] Folder name that data will be put in. Default value: 'Default'.
	 *  @param {string} [optionalParams.state] State of data to be initially set. Accepted values: Pending, Moderated, Rejected. Default value: Pending
	 *  @param {number} [optionalParams.parentId] If specified, creates one parent-child relation with specified parent id.
	 *  @param {object} [optionalParams.additional] Any number of additional parameters (key - value)
	 *  @param {object} [optionalParams.special] Special object with max 3 keys - data1, data2 and data3. These fields are "special purpose" integers - one can sort and filter by them in Data.get method
	 *  @param {function} [callback] Function to be called when successful response comes
	 *  @example
		var s = SyncanoConnector.getInstance();
		s.connect({instance:'', api_key:''});
		s.Data.new(projectId, 'Default', {}, function(res){
			console.log('Added data object:', res);
		});
	 */
	/** 
	 *  @event syncano:data:new
	 */
	Data.new = function(projectId, collection, optionalParams, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.new';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);

		var key, value;
		
		/**
		 *  all optional params
		 */
		if(isset(optionalParams)){
			var stringParams = [
				'dataKey', 'userName', 'sourceUrl', 'title', 'text', 'link', 'image', 'imageUrl', 'folder', 'state'
			];
			for(var i=0; i<stringParams.length; i++){
				var strParam = stringParams[i];
				if(isset(optionalParams[strParam])){
					if(typeof optionalParams[strParam] === 'string'){
						params[uncamelize(strParam)] = optionalParams[strParam];
					} else {
						throw new Error(strParam + ' must be a string');
					}
				}
			}
			if(isset(optionalParams.parentId)){
				if(isNumber(optionalParams.parentId)){
					params.parent_id = optionalParams.parentId;
				} else {
					throw new Error('parentId must be a number');
				}
			}
			
			if(isset(params.state)){
				if(['pending', 'moderated', 'rejected'].indexOf(params.state.toLowerCase()) === -1){
					throw new Error('incorrect value of state param');
				}
			}
			
			if(isset(optionalParams.additional)){
				for(key in optionalParams.additional){
					if(optionalParams.additional.hasOwnProperty(key)){
						var val = optionalParams.additional[key];
						if(stringParams.indexOf(key) !== -1 || key === 'parent_id'){
							throw new Error('Cannot use additional (custom) param named ' + key);
						}
						params[key] = val;
					}
				}
			}

			if(isset(optionalParams.special) && Object.keys(optionalParams.special).length > 0){
				var predefined = ['data1', 'data2', 'data3'];
				for(key in optionalParams.special){
					if(optionalParams.special.hasOwnProperty(key)){
						value = optionalParams.special[key];
						var idx = predefined.indexOf(key);
						if(idx !== -1){
							params[key] = value;
							predefined[idx] = null;
							delete optionalParams.special[key];
						}
					}
				}
				if(Object.keys(optionalParams.special).length > 0){
					// there are some keys left, so we didn't use default data1...data3 names
					for(key in optionalParams.special){
						if(optionalParams.special.hasOwnProperty(key)){
							value = optionalParams.special[key];
							var predefinedKey;
							do {
								predefinedKey = predefined.shift();
							} while(predefinedKey === null && predefined.length > 0);
							if(typeof predefinedKey !== 'undefined'){
								params[predefinedKey] = value;
								params[key] = predefinedKey;
							}
						}
					}
				}
			}
		}

		this.__super__.ignoreNextNew = true;
		this.__super__.__sendWithCallback(method, params, 'data', callback);
	};


	/**
	 *  Get data from collection(s) or whole project with optional additional filtering. All filters, unless explicitly noted otherwise, affect all hierarchy levels.
	 *  To paginate and to get more data, use since_id or since_time parameter
	 *  All optional params should be passed as a single object: {key: value, ...}
	 *
	 *  @method Data.get
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {object} [optionalParams] Object with additional parameters
	 *  @param {string / Array} [optionalParams.dataIds] If specified, will return data objects with specified ids. Note: has no effect on returned data object's children. Max 100 values per request 
	 *  @param {string} [optionalParams.state] State of data to be returned. Accepted values: Pending, Moderated, Rejected, All. Default value: All.
	 *  @param {string / Array} [optionalParams.folders] Folder name that data will be returned from. Max 100 values per request. If not presents returns data from across all collection folders
	 *  @param {number} [optionalParams.sinceId] If specified, will only return data with id higher than since_id (newer). Note: has no effect on returned data object's children
	 *  @param {string} [optionalParams.sinceTime] String with date. If specified, will only return data with created_at or updated_at time after specified value (newer). Note: has no effect on returned data object's children
	 *  @param {number} [optionalParams.maxId] If specified, will only return data with id lower than max_id (older)
	 *  @param {number} [optionalParams.limit] Number of Data Objects to be returned. Default and max value: 100 
	 *  @param {string} [optionalParams.order] Sets order of data that will be returned. ASC (default) - oldest first, DESC - newest first
	 *  @param {string} [optionalParams.orderBy] Orders by specified criteria. created_at (default), updated_at
	 *  @param {string} [optionalParams.filter] TEXT - only data with text field specified, IMAGE - only data with an image attached
	 *  @param {string} [optionalParams.includeChildren] If true, include Data Object children as well (recursively). Default value: True.
	 *  @param {number} [optionalParams.depth] Max depth of children to follow. If not specified, will follow all levels until children limit is reached
	 *  @param {number} [optionalParams.childrenLimit] Limit of children to show (if include_children is True). Default and max value: 100 (some children levels may be incomplete if there are more than this limit).
	 *  @param {string / Array} [optionalParams.parentIds] Data Object id or ids. If specified, only children of specific Data Object parent will be listed
	 *  @param {string} [optionalParams.byUser] If specified, filter by Data Object user's name
	 *  @param {function} [callback] Function to be called when successful response comes
	 *  @example
		var s = SyncanoConnector.getInstance();
		s.connect({instance:'', api_key:''});
		s.Data.get(projectId, 'Default', {}, function(res){
			console.log('Loaded '+ res.length + ' records');
			res.forEach(function(d){
				console.log(d);
			});
		});
	 */
	/** 
	 *  @event syncano:data:get
	 */
	Data.get = function(projectId, collection, optionalParams, callback){
		var i;

		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.get';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(isset(optionalParams)){
			
			/**
			 *  these optionalParams are just copied to params array if they are set
			 */
			var justSetParams = ['dataIds', 'folders', 'byUser', 'parentIds'];
			for(i=0; i<justSetParams.length; i++){
				var jsParam = justSetParams[i];
				if(isset(optionalParams[jsParam])){
					params[uncamelize(jsParam)] = optionalParams[jsParam];
				}
			}
			
			/**
			 *  these optionalParams have to be numbers - so check if they are set and are proper numbers. If not - throw an Error
			 */
			var numericParams = ['maxId', 'limit', 'sinceId', 'depth', 'childrenLimit'];
			for(i=0; i<numericParams.length; i++){
				var numParam = numericParams[i];
				if(isset(optionalParams[numParam])){
					if(isNumber(optionalParams[numParam])){
						params[uncamelize(numParam)] = optionalParams[numParam];
					} else {
						throw new Error(numParam + ' must be a number');
					}
				}
			}
			
			if(isset(optionalParams.state)){
				if(inArray(optionalParams.state.toLowerCase(), ['pending','moderated','rejected','all'])){
					params.state = optionalParams.state;
				} else {
					throw new Error('incorrect value of state param');
				}
			}
			
			if(isset(optionalParams.sinceTime)){
				if(isDate(optionalParams.sinceTime)){
					params.since_time = optionalParams.sinceTime;
				} else {
					throw new Error('Param sinceTime must be a proper date string');
				}
			}
			
			if(isset(optionalParams.order)){
				if(['asc', 'desc'].indexOf(optionalParams.order.toLowerCase()) !== -1){
					params.order = optionalParams.order;
				} else {
					throw new Error('incorrect value of order param - only "asc" and "desc" are allowed');
				}
			}
			
			if(isset(optionalParams.orderBy)){
				if(inArray(optionalParams.orderBy.toLowerCase(), ['created_at', 'updated_at', 'data1', 'data2', 'data3'])){
					params.order_by = optionalParams.orderBy;
				} else {
					throw new Error('incorrect value of order_by param - only "created_at" and "updated_at" are allowed');
				}
			}
			
			if(isset(optionalParams.filter)){
				if(inArray(optionalParams.filter.toLowerCase(), ['text', 'image'])){
					params.filter = optionalParams.filter;
				} else {
					throw new Error('incorrect value of filter param - only "text" and "image" are allowed');
				}
			}
			
			if(isset(optionalParams.includeChildren)){
				if(isBool(optionalParams.includeChildren)){
					params.include_children = optionalParams.includeChildren;
				} else {
					throw new Error('includeChildren param must be boolean');
				}
			}

			var specialFields = ['data1', 'data2', 'data3'];
			var operators = ['eq', 'neq', 'lte', 'lt', 'gte', 'gt'];
			for(var f=0; f<specialFields.length; f++){
				for(var o=0; o<operators.length; o++){
					var key = specialFields[f] + '__' + operators[o];
					if(isset(optionalParams[key])){
						params[key] = optionalParams[key];
					}
				}
			}
		}

		this.__super__.__sendWithCallback(method, params, 'data', callback);
	};


	/**
	 * Get data by data_id or data_key
	 * 
	 *  @method Data.getOne 
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {string / Number} dataKeyOrId Either data id (number) or key (string)
	 *  @param {function} [callback] Function to be called when successful response comes
	 *  @example
		var s = SyncanoConnector.getInstance();
		s.connect({instance:'', api_key:''});
		s.Data.getOne(projectId, 'Default', dataId, function(res){
			console.log('Found record:', res);
		});
	 */
	/** 
	 *  @event syncano:data:get_one
	 */
	Data.getOne = function(projectId, collection, dataKeyOrId, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.get_one';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		if(typeof dataKeyOrId === 'string'){
			params.data_key = dataKeyOrId;
		} else if (typeof dataKeyOrId === 'number'){
			params.data_id = dataKeyOrId;
		} else {
			throw new Error('Data key/id must be passed');
		}
		
		this.__super__.__sendWithCallback(method, params, 'data', callback);
	};


	/**
	 * Increase one of special fields in data object
	 *
	 *  @method Data.increase
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {string / Number} dataKeyOrId Either data id (number) or key (string)
	 *  @param {string} field One of predefined fields - data1, data2 or data3
	 *  @param {int} value Value by which the field has to be increased
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	Data.increase = function(projectId, collection, dataKeyOrId, field, value, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.update';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof dataKeyOrId === 'string'){
			params.data_key = dataKeyOrId;
		} else if (typeof dataKeyOrId === 'number'){
			params.data_id = dataKeyOrId;
		} else {
			throw new Error('Data key/id must be passed');
		}

		var allowedFields = ['data1', 'data2', 'data3'];
		if(allowedFields.indexOf(field) !== -1){
			params[field + '__inc'] = value;
		}

		this.__super__.ignoreNextChange = true;
		this.__super__.__sendWithCallback(method, params, 'data', callback);
	};


	/**
	 * Decrease one of special fields in data object
	 *
	 *  @method Data.decrease
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {string / Number} dataKeyOrId Either data id (number) or key (string)
	 *  @param {string} field One of predefined fields - data1, data2 or data3
	 *  @param {int} value Value by which the field has to be decreased
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	Data.decrease = function(projectId, collection, dataKeyOrId, field, value, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.update';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof dataKeyOrId === 'string'){
			params.data_key = dataKeyOrId;
		} else if (typeof dataKeyOrId === 'number'){
			params.data_id = dataKeyOrId;
		} else {
			throw new Error('Data key/id must be passed');
		}

		var allowedFields = ['data1', 'data2', 'data3'];
		if(allowedFields.indexOf(field) !== -1){
			params[field + '__dec'] = value;
		}

		this.__super__.ignoreNextChange = true;
		this.__super__.__sendWithCallback(method, params, 'data', callback);
	};


	/**
	 *  
	 *  @method Data.update
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {string / Number} dataKeyOrId Either data id (number) or key (string)
	 *  @param {object} [optionalParams] Object with additional parameters
	 *  @param {string} [optionalParams.updateMethod] Default value: replace
	 *  @param {string} [optionalParams.user_name] User name of user to associate Data Object with. If not set, internal user 'syncano' is used
	 *  @param {string} [optionalParams.sourceUrl] Source URL associated with message
	 *  @param {string} [optionalParams.title] Title of message
	 *  @param {string} [optionalParams.text] Text data associated with message
	 *  @param {string} [optionalParams.link] Link associated with message
	 *  @param {string} [optionalParams.image] Image data associated with message. If specified as empty string - will instead delete current image
	 *  @param {string} [optionalParams.imageUrl] Image source URL. Used in combination with image parameter
	 *  @param {string} [optionalParams.folder] Folder name that data will be put in. Default value: 'Default'
	 *  @param {string} [optionalParams.dataKey] New data key to be set
	 *  @param {string} [optionalParams.state] State of data to be initially set. Accepted values: Pending, Moderated, Rejected. Default value: Pending
	 *  @param {number} [optionalParams.parentId] If specified, new Data Object becomes a child of specified parent id. Note that all other parent-child relations for this Data Object are removed
	 *  @param {string} [optionalParams.additional] any number of additional parameters passed as key - value object literal
	 *  @param {function} [callback] Function to be called when successful response comes
	 *  @example
		var s = SyncanoConnector.getInstance();
		s.connect({instance:'', api_key:''});
		s.Data.update(projectId, 'Default', dataId, {title: 'New title'}, function(res){
			console.log('Modified record:', res);
		});
	 */
	/** 
	 *  @event syncano:data:update
	 */
	Data.update = function(projectId, collection, dataKeyOrId, optionalParams, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.update';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof dataKeyOrId === 'string'){
			params.data_key = dataKeyOrId;
		} else if (typeof dataKeyOrId === 'number'){
			params.data_id = dataKeyOrId;
		} else {
			throw new Error('Data key/id must be passed');
		}
		
		if(isset(optionalParams)){
			var paramsToPass = ['updateMethod', 'userName', 'sourceUrl', 'title', 'text', 'link', 'image', 'imageUrl', 'dataKey', 'data1', 'data2', 'data3'];
			for(var i=0; i<paramsToPass.length; i++){
				var jsParam = paramsToPass[i];
				if(isset(optionalParams[jsParam])){
					var tmpK = jsParam;
					if(jsParam !== 'data1' && jsParam !== 'data2' && jsParam !== 'data3'){
						tmpK = uncamelize(jsParam);
					}
					params[tmpK] = optionalParams[jsParam];
				}
			}
			
			if(isset(optionalParams.parentId)){
				if(isNumber(optionalParams.parentId)){
					params.parent_id = optionalParams.parentId;
				} else {
					throw new Error('parentId must be a number');
				}
			}
			
			if(isset(optionalParams.state)){
				if(inArray(optionalParams.state.toLowerCase(), ['pending','moderated','rejected'])){
					params.state = optionalParams.state;
				} else {
					throw new Error('incorrect value of state param');
				}
			}
		}

		if(isset(optionalParams.additional)){
			for(var key in optionalParams.additional){
				if(optionalParams.additional.hasOwnProperty(key)){
					var val = optionalParams.additional[key];
					if(typeof params[key] !== 'undefined'){
						throw new Error('Cannot use additional (custom) param named ' + key);
					}
					params[key] = val;
				}
			}
		}
		
		this.__super__.ignoreNextChange = true;
		this.__super__.__sendWithCallback(method, params, 'data', callback);
	};


	/**
	 *  Moves data to folder and/or state
	 * 
	 *  @method Data.move 
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {object} [optionalParams] Object with additional parameters
	 *  @param {string} [optionalParams.dataIds] If specified, will filter by Data id or ids. Max 100 ids per request.
	 *  @param {string} [optionalParams.folders] If specified, filter by specified folder or folders. Max 100 values per request.
	 *  @param {string} [optionalParams.state] If specified, filter by Data state. Accepted values: Pending, Moderated, All. Default value: All.
	 *  @param {string} [optionalParams.filter] TEXT - only data with text IMAGE - only data with an image
	 *  @param {string} [optionalParams.byUser] If specified, filter by user's name
	 *  @param {string} [optionalParams.limit] Number of Data Objects to process. Default and max value: 100
	 *  @param {string} [optionalParams.newFolder] Destination folder where data will be moved. If not specified, leaves folder as is.
	 *  @param {string} [optionalParams.newState] State to be set data for specified data. Accepted values: Pending, Moderated. If not specified, leaves state as is.
	 *  @param {function} [callback] Function to be called when successful response comes
	 *  @example
		var s = SyncanoConnector.getInstance();
		s.connect({instance:'', api_key:''});
		s.Data.move(projectId, 'Default', {newFolder: 'Output folder'});
	 */
	/** 
	 *  @event syncano:data:move
	 */
	Data.move = function(projectId, collection, optionalParams, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.move';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(isset(optionalParams)){
			/**
			 *  these optionalParams are just copied to params array if they are set
			 */
			var justSetParams = ['dataIds', 'folders', 'byUser', 'newFolder'];
			for(var i=0; i<justSetParams.length; i++){
				var jsParam = justSetParams[i];
				if(isset(optionalParams[jsParam])){
					params[uncamelize(jsParam)] = optionalParams[jsParam];
				}
			}
			
			if(isset(optionalParams.filter)){
				if(inArray(optionalParams.filter.toLowerCase(), ['text', 'image'])){
					params.filter = optionalParams.filter;
				} else {
					throw new Error('incorrect value of filter param - only "text" and "image" are allowed');
				}
			}
			
			if(isset(optionalParams.state)){
				if(inArray(optionalParams.state.toLowerCase(), ['pending','moderated','rejected'])){
					params.state = optionalParams.state;
				} else {
					throw new Error('incorrect value of state param');
				}
			}
			
			if(isset(optionalParams.newState)){
				if(inArray(optionalParams.newState.toLowerCase(), ['pending','moderated','rejected'])){
					params.new_state = optionalParams.newState;
				} else {
					throw new Error('incorrect value of newState param');
				}
			}
			
			if(isset(optionalParams.limit)){
				if(isNumber(optionalParams.limit)){
					params.limit = optionalParams.limit;
				} else {
					throw new Error('limit must be a number');
				}
			}
		}
		
		this.__super__.ignoreNextChange = true;
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Copies data with data_id. Copy has data_key cleared
	 *
	 *  @method Data.copy
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {string / Array} dataId Data id or ids
	 *  @param {function} [callback] Function to be called when successful response comes
	 *  @example
		var s = SyncanoConnector.getInstance();
		s.connect({instance:'', api_key:''});
		s.Data.copy(projectId, 'Default', dataId, function(res){
			console.log('Copied data object:', res);
		});
	 */
	/** 
	 *  @event syncano:data:copy
	 */
	Data.copy = function(projectId, collection, dataId, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.copy';
		var params = {
			project_id: projectId,
			data_ids: []
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(!isset(dataId)){
			throw new Error('dataId must be set');
		}

		if(isNumber(dataId)){
			params.data_ids = [String(dataId)];
		} else if(typeof dataId === 'object'){
			params.data_ids = [];
			for(var i=0; i<dataId.length; i++){
				if(!isNumber(dataId[i])){
					throw new Error('dataId must be integer or array of integers');
				} else {
					params.data_ids.push(String(dataId[i]));
				}
			}
		} else {
			throw new Error('dataId must be integer or array of integers');
		}

		this.__super__.__sendWithCallback(method, params, 'data', callback);
	};


	/**
	 *  Adds additional parent to data with data_id. If remove_other is True, all other parents of specified Data Object will be removed.
	 *
	 *  @method Data.addParent 
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {number} dataId Data Object id
	 *  @param {number} parentId Parent id to add
	 *  @param {boolean} [removeOther] If true, will remove all other parents. Default value: False
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:data:add_parent
	 */
	Data.addParent = function(projectId, collection, dataId, parentId, removeOther, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.add_parent';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(isset(dataId) && isNumber(dataId)){
			params.data_id = dataId;
		} else {
			throw new Error('dataId must be passed');
		}
		
		if(isset(parentId) && isNumber(parentId)){
			params.parent_id = parentId;
		} else {
			throw new Error('parentId must be passed');
		}
		
		if(isset(removeOther) && isBool(removeOther)){
			params.remove_other = removeOther;
		}
		
		this.__super__.ignoreNextNewRelation = true;
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Removes a parent (or parents) from data with data_id
	 *
	 *  @method Data.removeParent 
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {number} dataId Data Object id
	 *  @param {number} parentId Parent id to remove. If not specified, will remove all Data Object parents
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:data:remove_parent
	 */
	Data.removeParent = function(projectId, collection, dataId, parentId, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.remove_parent';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(isset(dataId) && isNumber(dataId)){
			params.data_id = dataId;
		} else {
			throw new Error('dataId must be passed');
		}

		if(isset(parentId) && isNumber(parentId)){
			params.parent_id = parentId;
		}
		
		this.__super__.ignoreNextDeleteRelation = true;
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Adds additional child to data with data_id. If remove_other is True, all other children of specified Data Object will be removed.
	 *  Note: There is a limit of maximum 250 parents per Data Object, but there is no limit of children.
	 *
	 *  @method Data.addChild 
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {number} dataId Data Object id
	 *  @param {number} childId Child id to add
	 *  @param {boolean} [removeOther] If true, will remove all other parents. Default value: False
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:data:add_child
	 */
	Data.addChild = function(projectId, collection, dataId, childId, removeOther, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'data.add_child';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(isset(dataId) && isNumber(dataId)){
			params.data_id = dataId;
		} else {
			throw new Error('dataId must be passed');
		}
		
		if(isset(childId) && isNumber(childId)){
			params.child_id = childId;
		} else {
			throw new Error('childId must be passed');
		}
		
		if(isset(removeOther) && isBool(removeOther)){
			params.remove_other = removeOther;
		}
		
		this.__super__.ignoreNextNewRelation = true;
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Removes a child (or children) from data with data_id.
	 *
	 *  @method Data.removeChild 
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {number} dataId Data Object id
	 *  @param {number} childId Child id to remove. If not specified, will remove all Data Object children
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:data:remove_child
	 */
	Data.removeChild = function(projectId, collection, dataId, childId, callback){
		this.__super__.__checkProjectId(projectId);

		var method = 'data.remove_child';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);

		if(isset(dataId) && isNumber(dataId)){
			params.data_id = dataId;
		} else {
			throw new Error('dataId must be passed');
		}

		if(isset(childId) && isNumber(childId)){
			params.child_id = childId;
		}

		this.__super__.ignoreNextDeleteRelation = true;
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Deletes Data Object. If no filters are specified, will process all Data Objects in defined collection(s) (up to defined limit).
	 *
	 *  @method Data.delete
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number / Array} [optionalParams.dataIds] If specified, will filter by Data id or ids. Max 100 ids per request
	 *  @param {string} [optionalParams.state] If specified, filter by Data state. Accepted values: Pending, Moderated, All. Default value: All
	 *  @param {string / Array} [optionalParams.folders] If specified, filter by specified folder or folders. Max 100 values per request
	 *  @param {string} [optionalParams.filter] TEXT - only data with text IMAGE - only data with an image
	 *  @param {string} [optionalParams.byUser] If specified, filter by user name.
	 *  @param {string} [optionalParams.limit] Number of Data Objects to process. Default and max value: 100.
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:data:delete
	 */
	Data.delete = function(projectId, collection, optionalParams, callback){
		this.__super__.__checkProjectId(projectId);

		var method = 'data.delete';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);

		if(isset(optionalParams)){
			/**
			 *  these optionalParams are just copied to params array if they are set
			 */
			var justSetParams = ['dataIds', 'folders', 'byUser'];
			for(var i=0; i<justSetParams.length; i++){
				var jsParam = justSetParams[i];
				if(isset(optionalParams[jsParam])){
					params[uncamelize(jsParam)] = optionalParams[jsParam];
				}
			}
			
			if(isset(optionalParams.limit)){
				if(isNumber(optionalParams.limit)){
					params.limit = optionalParams.limit;
				} else {
					throw new Error('limit must be a number');
				}
			}
			
			if(isset(optionalParams.state)){
				if(inArray(optionalParams.state.toLowerCase(), ['pending','moderated','rejected','all'])){
					params.state = optionalParams.state;
				} else {
					throw new Error('incorrect value of state param');
				}
			}
			
			if(isset(optionalParams.filter)){
				if(inArray(optionalParams.filter.toLowerCase(), ['text', 'image'])){
					params.filter = optionalParams.filter;
				} else {
					throw new Error('incorrect value of filter param - only "text" and "image" are allowed');
				}
			}
		}

		this.__super__.ignoreNextDelete = true;
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Counts data of specified criteria
	 *
	 *  @method Data.count
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {string} [optionalParams.state] State of data to be counted. Accepted values: Pending, Moderated, All. Default value: All
	 *  @param {string / Array} [optionalParams.folders] Folder name(s) that data will be counted from. If not presents counts data from across all collection folders. Max 100 values per request
	 *  @param {string} [optionalParams.filter] TEXT - only data with text IMAGE - only data with an image
	 *  @param {string} [optionalParams.byUser] If specified, filter by user name.
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:data:count
	 */
	Data.count = function(projectId, collection, optionalParams, callback){
		this.__super__.__checkProjectId(projectId);

		var method = 'data.count';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);

		if(isset(optionalParams)){
			/**
			 *  these optionalParams are just copied to params array if they are set
			 */
			var justSetParams = ['folders', 'byUser'];
			for(var i=0; i<justSetParams.length; i++){
				var jsParam = justSetParams[i];
				if(isset(optionalParams[jsParam])){
					params[uncamelize(jsParam)] = optionalParams[jsParam];
				}
			}

			if(isset(optionalParams.state)){
				if(inArray(optionalParams.state.toLowerCase(), ['pending','moderated','rejected','all'])){
					params.state = optionalParams.state;
				} else {
					throw new Error('incorrect value of state param');
				}
			}
			
			if(isset(optionalParams.filter)){
				if(inArray(optionalParams.filter.toLowerCase(), ['text', 'image'])){
					params.filter = optionalParams.filter;
				} else {
					throw new Error('incorrect value of filter param - only "text" and "image" are allowed');
				}
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'count', callback);
	};

	var BigData = {};

	BigData.__internalDataGet = function(res, limit, projectId, collectionId, params, callback){
		this.__super__.Data.get(projectId, collectionId, params, function(part){
			var pLen = part.length;
			res = res.concat(part);
			if(pLen === 0 || pLen !== limit){
				callback(res);
			} else {
				params.sinceId = parseInt(part[pLen - 1].id, 10);
				this.__internalDataGet(res, limit, projectId, collectionId, params, callback);
			}
		}.bind(this));
	};

	BigData.get = function(projectId, collectionId, params, callback){
		var res = [];
		var limit = 100;
		if(typeof params.limit !== 'undefined'){
			limit = params.limit;
		}
		this.__internalDataGet(res, limit, projectId, collectionId, params, function(res){
			callback(res);
		});
	};

	var Tree = {};

	Tree.__internalReadLevel = function(projectId, collection, params, ids, callback){
		this.__super__.BigData.get(projectId, collection, params, function(levelData){
			var len = levelData.length;
			var parentIds = [];
			for(var i=0; i<len; i++){
				var item = levelData[i];
				var id = item.id | 0;
				ids.push(id);
				if(item.children_count > 0){
					parentIds.push(id);
				}
			}
			if(parentIds.length > 0){
				params.parentIds = parentIds;
				this.__internalReadLevel(projectId, collection, params, ids, callback);
			} else {
				callback(ids);
			}
		}.bind(this));
	};

	Tree.__internalRemoveIds = function(projectId, collection, ids, folders, callback){
		var packSize = 100;
		var idsPack = ids.splice(0, packSize);

		var params = {
			dataIds: idsPack,
			folders: folders
		};
		this.__super__.Data.delete(projectId, collection, params, function(){
			if(ids.length === 0){
				callback();
			} else {
				this.__internalRemoveIds(projectId, collection, ids, folders, callback);
			}
		}.bind(this));
	};


	Tree.delete = function(projectId, collection, dataId, folders, callback){
		var params = {
			parentIds: dataId,
			folders: folders,
			includeChildren: false
		};
		var ids = [dataId];
		this.__internalReadLevel(projectId, collection, params, ids, function(ids){
			this.__internalRemoveIds(projectId, collection, ids, folders, callback);
		}.bind(this));
	};


	/*
		odczytaj wszystkie rekordy ze wskazanych folderów
		zapisz je w tablicy
		zapamiętaj wszystkie identyfikatory rekordów mających children_count > 0
	*/
	Tree.get = function(projectId, collection, folders, callback){
		var params = {
			folders: folders,
			includeChildren: false
		};
		var out = [];
		var parents = [];
		var relations = {};

		var internalReadChildren = function(){
			console.log('Przetwarzam, liczba węzłów:', parents.length);
			var parent = parents.shift();
			relations[parent] = [];
			var params = {
				includeChildren: false,
				parentIds: parent
			};
			this.__super__.BigData.get(projectId, collection, params, function(data){
				// w data mamy wszystkie dzieci zadanego węzła
				for(var i=0; i<data.length; i++){
					var rec = data[i];
					rec.id = rec.id | 0;

					// zapamiętaj relację
					relations[parent].push(rec.id);
					// zapamiętaj data object
					out.push(rec);
					// jeśli ma dzieci, dopisz go do listy
					if(rec.children_count > 0){
						parents.push(rec.id);
					}
				}
				
				// przetworzono wszystkie dzieci. Zdecyduj, czy przetwarzamy dalej
				if(parents.length === 0){
					callback(out, relations);
				} else {
					internalReadChildren();
				}
			}.bind(this));
		}.bind(this);

		this.__super__.BigData.get(projectId, collection, params, function(data){
			for(var i=0; i<data.length; i++){
				var rec = data[i];
				rec.id = rec.id | 0;
				out.push(rec);
				if(rec.children_count > 0){
					parents.push(rec.id);
				}
			}
			internalReadChildren();
		});
	};









	/**
	 * Methods for user management 
	 */
	var User = {};

	/**
	 *
	 */
	User.login = function(userName, password, instanceName, apiKey, callback){
		var method = 'user.login';
		var params = {};

		if(type(userName) === 'object' && (isFunction(password) || isPlainObject(password))){
			var tempParams = userName;
			callback = password;
			apiKey = tempParams.api_key;
			userName = tempParams.user_name;
			password = tempParams.password;
			instanceName = tempParams.instance;
		}

		if(isset(userName)){
			params.user_name = userName;
		} else {
			throw new Error('Please provide user name');
		}
		if(isset(password)){
			params.password = password;
		} else {
			throw new Error('Please provide password');
		}
		if(isset(instanceName)){
			params.instance = instanceName;
		}
		if(isset(apiKey)){
			params.apiKey = apiKey;
		}

		var success = function(){};
		var error = function(msg){
			this.__super__.trigger('syncano:error', msg);
		}.bind(this);

		if(typeof callback === 'function'){
			success = callback;
		} else if(typeof callback === 'object'){
			if(typeof callback.success === 'function'){
				success = callback.success;
			}
			if(typeof callback.error === 'function'){
				error = callback.error;
			}
		}

		this.__super__.__sendAjaxRequest(method, params, 'user', function(result){
			if(typeof result.auth_key !== 'undefined' && result.result === 'OK'){
				this.auth_key = result.auth_key;
				success(result);
			} else if(result.result === 'NOK'){
				error(result.error);
			} else {
				success(result);
			}
		}.bind(this.__super__));
	};


	/**
	 *  Creates new user
	 *  
	 *  @method User.new
	 *  @param {string} name User's name
	 *  @param {string} [nick] User's nick
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:new
	 */
	User.new = function(name, nick, callback){
		var method = 'user.new';
		var params = {};
		if(isset(name)){
			params.user_name = name;
		} else {
			throw new Error('user must have a name');
		}
		if(isset(nick)){
			params.nick = nick;
		}
		
		this.__super__.__sendWithCallback(method, params, 'user', callback);
	};


	/**
	 *  Get all users from within instance. To paginate and to get more data, use since_id or since_time parameter.
	 *
	 *  @method User.getAll
	 *  @param {number} sinceId If specified, will only return users with id higher than since_id (newer).
	 *  @param {number} limit Number of users to be returned. Default and max value: 100
	 */
	/** 
	 *  @event syncano:user:get_all
	 */
	User.getAll = function(sinceId, limit, callback){
		var method = 'user.get_all';
		
		if(typeof arguments[0] === 'function'){
			callback = arguments[0];
			sinceId = undefined;
			limit = undefined;
		}
		
		var params = {};
		if(isset(sinceId)){
			if(isNumber(sinceId)){
				params.since_id = sinceId;
			} else {
				throw new Error('sinceId must be a number');
			}
		}
		
		if(isset(limit)){
			if(isNumber(limit)){
				params.limit = limit;
			} else {
				throw new Error('limit must be a number');
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'user', callback);
	};


	/**
	 *  Get users of specified criteria that are associated with Data Objects within specified collection 
	 *
	 *  @method User.count
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {string} [optionalParams.state] Return only users whose Data Objects are in specified state. Accepted values: Pending, Moderated, Rejected, All. Default value: All
	 *  @param {string / Array} [optionalParams.folders] Folder name that data will be returned from. Max 100 values per request. If not present returns data from across all collection folders
	 *  @param {string} [optionalParams.filter] TEXT - only return users that sent data with text IMAGE - only return users that sent data with an image
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:get
	 */
	User.get = function(projectId, collection, optionalParams, callback){
		this.__super__.__checkProjectId(projectId);

		var method = 'user.get';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);

		if(isset(optionalParams)){
			if(isset(optionalParams.folders)){
				params.folders = optionalParams.folders;
			}
			
			if(isset(optionalParams.state)){
				if(inArray(optionalParams.state.toLowerCase(), ['pending','moderated','rejected','all'])){
					params.state = optionalParams.state;
				} else {
					throw new Error('incorrect value of state param');
				}
			}
			
			if(isset(optionalParams.filter)){
				if(inArray(optionalParams.filter.toLowerCase(), ['text', 'image'])){
					params.filter = optionalParams.filter;
				} else {
					throw new Error('incorrect value of filter param - only "text" and "image" are allowed');
				}
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'user', callback);
	};


	/**
	 *  Get one user
	 *
	 *  @method User.getOne
	 *  @param {string / Number} user User id or name
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:get_one
	 */
	User.getOne = function(user, callback){
		var method = 'user.get_one';
		var params = {};
		if(isset(user)){
			if(typeof user === 'number'){
				params.user_id = user;
			} else if(typeof user === 'string'){
				params.user_name = user;
			} else {
				throw new Error('incorrect type of user param');
			}
		} else {
			throw new Error('user id or name must be passed');
		}
		this.__super__.__sendWithCallback(method, params, 'user', callback);
	};


	/**
	 *  Updates specified user
	 *
	 *  @method User.update
	 *  @param {string / Number} user User id or name
	 *  @param {string} [nick] User's nick
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:update
	 */
	User.update = function(user, nick, callback){
		var method = 'user.update';
		var params = {};
		if(isset(user)){
			if(typeof user === 'number'){
				params.user_id = user;
			} else if(typeof user === 'string'){
				params.user_name = user;
			} else {
				throw new Error('incorrect type of user param');
			}
		} else {
			throw new Error('user id or name must be passed');
		}
		
		if(isset(nick)){
			if(typeof nick === 'string'){
				params.nick = nick;
			} else {
				throw new Error('nick must be given');
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'user', callback);
	};


	/**
	 *  Count users of specified criteria 
	 *
	 *  @method User.count
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number} [optionalParams.projectId] Project id. If defined, will only count users that has a Data Object associated within project.
	 *  @param {string / Number} [optionalParams.collection] Collection id or key defining collection. If defined, will only count users that has a Data Object associated within collection
	 *  @param {string} [optionalParams.state] Return only users whose Data Objects are in specified state. Accepted values: Pending, Moderated, All. Default value: All
	 *  @param {string / Array} [optionalParams.folders] Folder name that data will be returned from. Max 100 values per request. If not present returns data from across all collection folders
	 *  @param {string} [optionalParams.filter] TEXT - only return users that sent data with text IMAGE - only return users that sent data with an image
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:count
	 */
	User.count = function(optionalParams, callback){

		var method = 'user.count';
		var params = {};
		
		if(arguments.length === 1){
			callback = arguments[0];
			optionalParams = undefined;
		}

		if(isset(optionalParams)){
			if(isset(optionalParams.projectId)){
				if(isNumber(optionalParams.projectId)){
					params.project_id = optionalParams.projectId;
				}
			}

			if(isset(optionalParams.collection)){
				if(typeof optionalParams.collection === 'string'){
					params.collection_key = optionalParams.collection;
				} else if(typeof optionalParams.collection === 'number'){
					params.collection_id = optionalParams.collection;
				} else {
					throw new Error('collection identifier must be a string (key) or number (id)');
				}
			}

			if(isset(optionalParams.folders)){
				params.folders = optionalParams.folders;
			}

			if(isset(optionalParams.state)){
				if(inArray(optionalParams.state.toLowerCase(), ['pending','moderated','rejected','all'])){
					params.state = optionalParams.state;
				} else {
					throw new Error('incorrect value of state param');
				}
			}

			if(isset(optionalParams.filter)){
				if(inArray(optionalParams.filter.toLowerCase(), ['text', 'image'])){
					params.filter = optionalParams.filter;
				} else {
					throw new Error('incorrect value of filter param - only "text" and "image" are allowed');
				}
			}
		}

		this.__super__.__sendWithCallback(method, params, 'count', callback);
	};


	/**
	 *  Deletes (permanently) specified user and all associated data
	 *
	 *  @method User.delete
	 *  @param {string / Number} user User id or name
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:delete
	 */
	User.delete = function(user, callback){
		var method = 'user.delete';
		var params = {};
		if(typeof user === 'number'){
			params.user_id = user;
		} else if(typeof user === 'string'){
			params.user_name = user;
		} else {
			throw new Error('user identifier must be given');
		}
		this.__super__.__sendWithCallback(method, params, null, callback);
	};

	/**
	 * Subscriptions handling methods 
	 */
	var Subscription = {};


	/**
	 *  Subscribe to project level notifications
	 *
	 *  @method Subscription.subscribeProject
	 *  @param {number} projectId Project id
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:subscription:subscribe_project
	 */
	Subscription.subscribeProject = function(projectId, callback){
		var method = 'subscription.subscribe_project';
		if(!isset(projectId) || !isNumber(projectId)){
			throw new Error('projectId must be defined');
		}
		this.__super__.__sendWithCallback(method, {project_id: projectId}, null, callback);
	};


	/**
	 *  Unsubscribe from project
	 *
	 *  @method Subscription.unsubscribeProject
	 *  @param {number} projectId Project id
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:subscription:unsubscribe_project
	 */
	Subscription.unsubscribeProject = function(projectId, callback){
		var method = 'subscription.unsubscribe_project';
		if(!isset(projectId) || !isNumber(projectId)){
			throw new Error('projectId must be defined');
		}
		this.__super__.__sendWithCallback(method, {project_id: projectId}, null, callback);
	};


	/**
	 *  Subscribe to collection level notifications within specified project 
	 * 
	 *  @method Subscription.subscribeCollection
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:subscription:subscribe_collection
	 */
	Subscription.subscribeCollection = function(projectId, collection, callback){
		this.__super__.__checkProjectId(projectId);

		var method = 'subscription.subscribe_collection';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Unsubscribe from collection within specified project 
	 *
	 *  @method Subscription.unsubscribeCollection
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:subscription:unsubscribe_collection
	 */
	Subscription.unsubscribeCollection = function(projectId, collection, callback){
		this.__super__.__checkProjectId(projectId);

		var method = 'subscription.unsubscribe_collection';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Get API client subscriptions
	 * 
	 *  @method Subscription.get
	 *  @param {string} [apiId] API client id defining client. If not present, gets subscriptions for current client
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:subscription:get
	 */
	Subscription.get = function(apiId, callback){
		if(typeof arguments[0] === 'function'){
			callback = arguments[0];
			apiId = undefined;
		}

		var method = 'subscription.get';
		var params = {};
		if(isset(apiId)){
			params.api_client_id = apiId;
		}
		this.__super__.__sendWithCallback(method, params, 'subscription', callback);
	};

	var Connection = {};

	/**
	 *  Get currently connected API client connections up to limit (max 100).
	 *
	 *  @method Connection.get
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number} [optionalParams.apiClientId] API client id. If not specified, will get connections for current API client
	 *  @param {string} [optionalParams.name] If specified, will only return connections of specified name.
	 *  @param {number} [optionalParams.sinceId] If specified, will only return data with id higher than since_id (newer).
	 *  @param {number} [optionalParams.limit] Maximum number of API client connections to get. Default and max: 100
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:connection:get
	 */
	Connection.get = function(optionalParams, callback){
		if(typeof arguments[0] === 'function'){
			callback = arguments[0];
			optionalParams = undefined;
		}
		var method = 'connection.get';
		var params = {};
		
		if(isset(optionalParams)){

			var numericParams = ['apiClientId', 'sinceId', 'limit'];
			for(var i=0; i<numericParams.length; i++){
				var numParam = numericParams[i];
				if(isset(optionalParams[numParam])){
					if(isNumber(optionalParams[numParam])){
						params[uncamelize(numParam)] = optionalParams[numParam];
					} else {
						throw new Error(method + ': ' + numParam + ' must be a number');
					}
				}
			}
			
			if(isset(optionalParams.name)){
				if(typeof optionalParams.name === 'string'){
					params.name = optionalParams.name;
				} else {
					throw new Error(method + ': name must be a string');
				}
			}
		}
		this.__super__.__sendWithCallback(method, params, 'connection', callback);
	};


	/**
	 *  Updates specified API client connection info.
	 *
	 *  @method Connection.update
	 *  @param {string} uuid Identity UUID
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number} [optionalParams.apiClientId] API client id. If not specified, will query current API client connections
	 *  @param {string} [optionalParams.name] New connection name to set.
	 *  @param {string} [optionalParams.state] New state to set
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:connection:update
	 */
	Connection.update = function(uuid, optionalParams, callback){
		if(typeof arguments[1] === 'function'){
			callback = arguments[1];
			optionalParams = undefined;
		}
		var method = 'connection.update';
		var params = {};
		
		if(!isset(uuid) || typeof uuid !== 'string'){
			throw new Error(method + ': uuid parameter is required');
		} else {
			params.uuid = uuid;
		}
		
		if(isset(optionalParams)){
			
			if(isset(optionalParams.apiClientId)){
				if(isNumber(optionalParams.apiClientId)){
					params.api_client_id = optionalParams.apiClientId;
				} else {
					throw new Error(method + ': apiClientId must be a number');
				}
			}
			
			if(isset(optionalParams.name)){
				if(typeof optionalParams.name === 'string'){
					params.name = optionalParams.name;
				} else {
					throw new Error(method + ': name must be a string');
				}
			}
			
			if(isset(optionalParams.state)){
				if(typeof optionalParams.state === 'string'){
					params.state = optionalParams.state;
				} else {
					throw new Error(method + ': state must be a string');
				}
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'connection', callback);
	};

	var Notification = {};


	/**
	 *  Sends custom notification to API client through Sync Server. If uuid is specified - will only send to this specific instance.
	 *
	 *  @method Notification.send
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number} [optionalParams.apiClientId] Destination API client id. If not specified, will use current API client
	 *  @param {string} [optionalParams.uuid] UUID of client identity. If not specified, will send a broadcast to all API client identities within current instance
	 *  @param {object} [optionalParams.data] Additional key-value parameters to be sent.
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:notification:send
	 */
	Notification.send = function(optionalParams, callback){
		if(typeof arguments[0] === 'function'){
			callback = arguments[0];
			optionalParams = undefined;
		}
		var method = 'notification.send';
		var params = {};
		
		if(isset(optionalParams)){
			if(isset(optionalParams.apiClientId)){
				if(isNumber(optionalParams.apiClientId)){
					params.api_client_id = optionalParams.apiClientId;
				} else {
					throw new Error(method + ': apiClientId must be a number');
				}
			}
			
			if(isset(optionalParams.uuid)){
				if(typeof optionalParams.uuid === 'string'){
					params.uuid = optionalParams.uuid;
				} else {
					throw new Error(method + ': uuid must be a string');
				}
			}
			
			if(isset(optionalParams.data)){
				for(var key in optionalParams.data){
					if(optionalParams.data.hasOwnProperty(key)){
						var val = optionalParams.data[key];
						if(inArray(key, ['apiClientId', 'api_client_id', 'uuid'])){
							throw new Error(method + ': Cannot send custom param named ' + key);
						}
						params[key] = val;
					}
				}
			}
		}
		
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Get history of notifications of specified API client. History items are stored for 24 hours
	 *
	 *  @method Notification.getHistory
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number} [optionalParams.apiClientId] Client id. If not specified, will return history of current API client.
	 *  @param {number} [optionalParams.sinceId] If specified, will only return data with id higher than since_id (newer).
	 *  @param {string} [optionalParams.sinceTime] String with date. If specified, will only return data with timestamp after specified value (newer).
	 *  @param {number} [optionalParams.limit] Maximum number of history items to get. Default and max: 100
	 *  @param {string} [optionalParams.order] Sets order of data that will be returned. ASC (default) - oldest first, DESC - newest first
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:notification:get_history
	 */
	Notification.getHistory = function(optionalParams, callback){
		if(typeof arguments[0] === 'function'){
			callback = arguments[0];
			optionalParams = undefined;
		}
		var method = 'notification.get_history';
		var params = {};
		
		if(isset(optionalParams)){
			if(isset(optionalParams.apiClientId)){
				if(isNumber(optionalParams.apiClientId)){
					params.api_client_id = optionalParams.apiClientId;
				} else {
					throw new Error(method + ': apiClientId must be a number');
				}
			}
			
			/**
			 *  these optionalParams have to be numbers - so check if they are set and are proper numbers. If not - throw an Error
			 */
			var numericParams = ['limit', 'sinceId'];
			for(var i=0; i<numericParams.length; i++){
				var numParam = numericParams[i];
				if(isset(optionalParams[numParam])){
					if(isNumber(optionalParams[numParam])){
						params[uncamelize(numParam)] = optionalParams[numParam];
					} else {
						throw new Error(method + ': ' + numParam + ' must be a number');
					}
				}
			}
			
			if(isset(optionalParams.sinceTime)){
				if(isDate(optionalParams.sinceTime)){
					params.since_time = optionalParams.sinceTime;
				} else {
					throw new Error(method + ': sinceTime must be a proper date string');
				}
			}
			
			if(isset(optionalParams.order)){
				if(typeof optionalParams.order.toLowerCase !== 'undefined' && inArray(optionalParams.order.toLowerCase(), ['asc', 'desc'])){
					params.order = optionalParams.order;
				} else {
					throw new Error(method + ': incorrect value of order param - only "asc" and "desc" are allowed');
				}
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'history', callback);
	};

	/*global XMLHttpRequest*/
	/**
	 *  
	 */
	var states = {
		DISCONNECTED: 1,
		CONNECTED: 2,
		AUTHORIZED: 3
	};


	/**
	 * Real time high level library for Syncano (www.syncano.com)
	 *
	 * @class Syncano
	 * @constructor
	 */
	var Syncano = function(){
		this.socketURL = 'https://api.syncano.com/ws';
		this.socket = null;
		this.status = states.DISCONNECTED;
		this.requestId = 1;
		this.uuid = null;

		this.instance = null;
		this.apiKey = null;

		this.requestInProgress = false;

		/**
			this flags are set by Data.new, Data.addChild, Data.addParent methods
			when we create new data object in syncano, we still get notification from the backend that new data has been created
			we already know that (cause we've created it!), so we have to ignore message
		 */
		this.ignoreNextNew = false;
		this.ignoreNextNewRelation = false;
		this.ignoreNextDelete = false;
		this.ignoreNextDeleteRelation = false;
		this.ignoreNextChange = false;
		
		this.VERSION = '3.1.0beta';
		
		/**
		 *  queue for messages which could not be sent because of no connection 
		 */
		this.requestsQueue = [];

		this.connectionType = 'socket';
		
		/**
		 *  in this list we will keep arrays of [action, callback] for every sent message, so we will be able to run callback function
		 *  when answer to message arrives. The list is indexed with message_id attribute
		 */
		this.waitingForResponse = {};
		
		/**
		 *  High-level function mixins
		 */
		this.Project = Project;
		this.Project.__super__ = this;
		this.Collection = Collection;
		this.Collection.__super__ = this;
		this.Folder = Folder;
		this.Folder.__super__ = this;
		this.Data = Data;
		this.Data.__super__ = this;
		this.BigData = BigData;
		this.BigData.__super__ = this;
		this.Tree = Tree;
		this.Tree.__super__ = this;
		this.User = User;
		this.User.__super__ = this;
		this.Subscription = Subscription;
		this.Subscription.__super__ = this;
		this.Connection = Connection;
		this.Connection.__super__ = this;
		this.Notification = Notification;
		this.Notification.__super__ = this;
	};


	/**
	 *  add PubSub mixin
	 */
	Syncano.prototype = extend(Syncano.prototype, PubSub);


	/**
	 *  Establishes connecion to the server and sends authorization request.
	 *  
	 *  @method connect
	 *  @param {object} params Connection parameters {instance, api_key, optional timezone}. If any of them is not defined, error is thrown
	 *  @param {function} callback Optional callback to be called after successful connection and authorization.
	 */
	Syncano.prototype.connect = function(params, callback){
		if(typeof params === 'undefined' || typeof params.api_key === 'undefined' || typeof params.instance === 'undefined'){
			throw new Error('syncano.connect requires instance name and api_key');
		}

		this.instance = params.instance;
		this.apiKey = params.api_key;

		if(typeof root.SockJS === 'undefined'){
			this.connectionType = 'ajax';
		}
		if(typeof params.type !== 'undefined'){
			this.connectionType = params.type;
		}

		this.connectionParams = params;
		if(this.auth_key){
			this.connectionParams.auth_key = this.auth_key;
		}


		if(this.status !== states.DISCONNECTED){
			this.reconnectOnSocketClose = true;
			return;
		}

		if(typeof callback !== 'undefined'){
			this.waitingForResponse.auth = ['auth', callback];
		}

		if(this.connectionType === 'socket'){
			this.socket = new root.SockJS(this.socketURL);
			this.socket.onopen = this.onSocketOpen.bind(this);
			this.socket.onclose = this.onSocketClose.bind(this);
			this.socket.onmessage = this.onMessage.bind(this);
		} else {
			if(typeof callback === 'function'){
				callback();
			}
		}
	};


	/**
	 *  Internal method called after the socket is open. Sends authorization request - instance, api_key and (optional) timezone 
	 *  defined in this.connectionParams.
	 *
	 *  @method onSocketOpen
	 */
	Syncano.prototype.onSocketOpen = function(){
		this.status = states.CONNECTED;
		this.socketSend(this.connectionParams);
	};


	/**
	 *  Internal method called automatically when socket is closed. Clears SockJS instance, changes state to DISCONNECTED. If there was
	 *  waiting request to reconnect, handles reconnection with the same params.
	 *
	 *  @method onSocketClose
	 */
	Syncano.prototype.onSocketClose = function(){
		this.status = states.DISCONNECTED;
		this.socket = null;
		if(this.reconnectOnSocketClose === true){
			this.reconnectOnSocketClose = false;
			this.connect(this.connectionParams);
		}
	};


	/**
	 *  Method called every time the message is received. Message is passed as e.data
	 *  If there was an error, e.data.result is 'NOK' (not ok), otherwise e.data has response data.
	 * 
	 *  @method onMessage
	 *  @param {object} e event object
	 */
	/** 
	 *  When server cannot process request (result === NOK)
	 *  @event syncano:error
	 */
	/** 
	 *  When authorization failed
	 *  @event syncano:auth:error
	 */
	/** 
	 *  When response to message sent comes
	 *  @event syncano:received
	 */
	Syncano.prototype.onMessage = function(e){
		var data = JSON.parse(e.data);
		
		if(data.result === 'NOK'){
			var messageId = (data.type === 'auth') ? 'auth' : data.message_id;
			var errMsg = data.error || data.data.error;

			if(typeof messageId !== 'undefined' && typeof this.waitingForResponse[messageId] !== 'undefined' && typeof this.waitingForResponse[messageId][1] === 'object' && typeof this.waitingForResponse[messageId][1].error === 'function'){
				this.waitingForResponse[messageId][1].error(errMsg);
			} else {
				this.trigger('syncano:error', errMsg);
			}
			if(data.type === 'auth'){
				this.socket.close();
				this.trigger('syncano:auth:error');
			} else {
				this.requestInProgress = false;
				this.sendQueue();
			}
			return;
		}
		
		switch(data.type){
		case 'auth':
			this.parseAuthorizationResponse(data);
			break;
			
		case 'callresponse':
			if(this.status === states.AUTHORIZED){
				this.requestInProgress = false;
				this.sendQueue();
			}
			this.parseCallResponse(data);
			break;
			
		case 'message':
			this.parseMessageNotifier(data);
			break;
			
		case 'new':
			if(data.object === 'data'){
				this.parseNewRecordNotifier(data);
			} else if(data.object === 'datarelation'){
				this.parseNewRelationNotifier(data);
			}
			break;
			
		case 'change':
			this.parseChangeRecordNotifier(data);
			break;
			
		case 'delete':
			if(data.object === 'data'){
				this.parseDeleteRecordNotifier(data);
			} else {
				this.parseDeleteRelationNotifier(data);
			}
			break;
		}
	};


	/**
	 *  After successful authorization trigger event and send all queued messages
	 *
	 *  @method parseAuthorizationResponse
	 *  @param {object} data Object send by server. Fields: timestamp, uuid, type, result
	 */
	/** 
	 *  @event syncano:authorized
	 */
	Syncano.prototype.parseAuthorizationResponse = function(data){
		this.uuid = data.uuid;
		this.status = states.AUTHORIZED;
		this.trigger('syncano:received', data);
		this.trigger('syncano:authorized', this.uuid);
		this.parseCallResponse({message_id: 'auth', data:data});
		this.sendQueue();
	};


	/**
	 *  When message with type 'new' comes, we trigger 3 events: one for the project (syncano:newdata:project-ID), 
	 *  one for the collection (syncano:newdata:collection-ID) and one for the folder (syncano:newdata:folder-NAME).
	 *  You can handle any of them.
	 *  
	 *  @method parseNewRecordNotifier
	 *  @param {object} rec Object send by server. Fields: timestamp, uuid, type, result
	 */
	/**
	 *  Triggered after receiving message with new record in folder XXX
	 *  @event syncano:newdata:folder-XXX
	 */
	/** 
	 *  Triggered after receiving message with new record in project XXX
	 *  @event syncano:newdata:project-XXX
	 */
	/** 
	 *  Triggered after receiving message with new record in collection XXX 
	 *  @event syncano:newdata:collection-XXX
	 */
	Syncano.prototype.parseNewRecordNotifier = function(rec){
		// ignore means ignore
		if(this.ignoreNextNew === true){
			this.trigger('syncano:ignored', rec);
			this.ignoreNextNew = false;
			return;
		}
		this.trigger('syncano:received', rec);
		var projectId = rec.channel.project_id | 0;
		var collectionId = rec.channel.collection_id | 0;
		var recData = rec.data;
		var folder = recData.folder;
		if(folder){
			this.trigger('syncano:newdata:folder-' + folder, recData);
		}
		this.trigger('syncano:newdata:project-' + projectId, recData);
		this.trigger('syncano:newdata:collection-' + collectionId, recData);
	};


	/**
	 *  When message with type 'new' and object 'datarelation' comes, trigger two events - for parent and for child 
	 *
	 *  @method parseNewRelationNotifier
	 *  @param {object} rec Object send by server
	 */
	/** 
	 *  Triggered after receiving message with new relation between records XXX (child) and YYY (parent)
	 *  @event syncano:newparent:data-XXX
	 */
	/** 
	 *  Triggered after receiving message with new relation between records XXX (child) and YYY (parent)
	 *  @event syncano:newchild:data-YYY
	 */
	Syncano.prototype.parseNewRelationNotifier = function(rec){
		if(this.ignoreNextNewRelation === true){
			this.trigger('syncano:ignored', rec);
			this.ignoreNextNewRelation = false;
			return;
		}
		this.trigger('syncano:received', rec);
		if(typeof rec.target !== 'undefined'){
			var parentId = rec.target.parent_id;
			var childId = rec.target.child_id;
			this.trigger('syncano:newparent:data-' + childId, parentId);
			this.trigger('syncano:newchild:data-' + parentId, childId);
		}
	};


	/**
	 *  When message with type 'change' comes, trigger appropriate event for each data object modified.
	 *
	 *  @method parseChangeRecordNotifier
	 *  @param {object} rec Object send by server. Fields: timestamp, uuid, type, result
	 */
	/** 
	 *  Triggered after receiving message with changed record XXX 
	 *  @event syncano:change:data-XXX
	 */
	Syncano.prototype.parseChangeRecordNotifier = function(rec){
		// ignore means ignore
		if(this.ignoreNextChange === true){
			this.trigger('syncano:ignored', rec);
			this.ignoreNextChange = false;
			return;
		}
		var targetIds = rec.target.id;
		this.trigger('syncano:received', rec);
		for(var i=0; i<targetIds.length; i++){
			var id = targetIds[i];
			var p = {};
			if(typeof rec.add !== 'undefined'){
				p.add = rec.add;
			}
			if(typeof rec.replace !== 'undefined'){
				p.replace = rec.replace;
			}
			if(typeof rec.delete !== 'undefined'){
				p['delete'] = rec['delete'];
			}
			this.trigger('syncano:change:data-'+id, p);
		}
	};

	/**
	 *  When message with type 'delete' comes, trigger appropriate event for each data object modified.
	 *
	 *  @method parseChangeRecordNotifier
	 *  @param {object} rec Object send by server. Fields: timestamp, uuid, type, result
	 */
	/** 
	 *  Triggered after receiving message with deleted record XXX 
	 *  @event syncano:delete:data-XXX
	 */
	Syncano.prototype.parseDeleteRecordNotifier = function(rec){
		if(this.ignoreNextDelete === true){
			this.trigger('syncano:ignored', rec);
			this.ignoreNextDelete = false;
			return;
		}
		var targetIds = rec.target.id;
		this.trigger('syncano:received', rec);
		for(var i=0; i<targetIds.length; i++){
			var id = targetIds[i];
			this.trigger('syncano:delete:data-'+id);
		}
	};

	/**
	 *  When message with type 'delete' and object 'datarelation' comes, trigger two events - for parent and for child 
	 *
	 *  @method parseDeleteRelationNotifier
	 *  @param {object} rec Object send by server
	 */
	/** 
	 *  Triggered after receiving message with removed relation between records XXX (child) and YYY (parent)
	 *  @event syncano:removeparent:data-XXX
	 */
	/** 
	 *  Triggered after receiving message with removed relation between records XXX (child) and YYY (parent)
	 *  @event syncano:removechild:data-YYY
	 */
	Syncano.prototype.parseDeleteRelationNotifier = function(rec){
		if(this.ignoreNextDeleteRelation === true){
			this.trigger('syncano:ignored', rec);
			this.ignoreNextDeleteRelation = false;
			return;
		}
		this.trigger('syncano:received', rec);
		if(typeof rec.target !== 'undefined'){
			var parentId = rec.target.parent_id;
			var childId = rec.target.child_id;
			this.trigger('syncano:removeparent:data-' + childId, parentId);
			this.trigger('syncano:removechild:data-' + parentId, childId);
		}
	};

	/**
	 *  When message with type 'message' comes, just trigger event with data passed
	 *
	 *  @method parseMessageNotifier
	 *  @param {object} data Object send by server. Fields: timestamp, uuid, type, result
	 */
	/** 
	 *  Triggered after receiving message from server
	 *  @event syncano:message
	 */
	Syncano.prototype.parseMessageNotifier = function(data){
		this.trigger('syncano:received', data);
		this.trigger('syncano:message', data);
	};


	/**
	 *  Receiven new callresponse message. If we were waiting for this response, handle it (call callback, etc). Otherwise - ignore
	 *
	 *  @method parseCallResponse
	 *  @param {object} data - data received. Fields: type (=callresponse), message_id, result, data
	 */
	/** 
	 *  When server sends data we are not waiting for
	 *  @event syncano:ignored
	 */
	Syncano.prototype.parseCallResponse = function(data){
		var messageId = data.message_id;
		if(typeof messageId !== 'undefined' && typeof this.waitingForResponse[messageId] !== 'undefined'){
			var rec = this.waitingForResponse[messageId];
			var actionType = rec[0].replace('.', ':');
			var callback = rec[1];
			this.trigger('syncano:received', data);
			this.trigger('syncano:' + actionType, data.data);
			if(typeof callback === 'function'){
				callback(data.data);
			} else if(typeof callback === 'object' && typeof callback.success === 'function'){
				callback.success(data.data);
			}
			delete this.waitingForResponse[messageId];
		} else {
			this.trigger('syncano:ignored', data);
		}
	};


	/**
	 *  Sends all requests waiting in the queue and clears the queue.
	 *
	 *  @method sendQueue
	 */
	Syncano.prototype.sendQueue = function(){
		// while(this.requestsQueue.length > 0){
		if(this.requestsQueue.length > 0){
			var request = this.requestsQueue.shift();
			this.socketSend(request);
		}
	};


	/**
	 *  Generates unique message id
	 * 
	 *  @method getNextRequestId
	 *  @return {number} next unique identifier
	 */
	Syncano.prototype.getNextRequestId = function(){
		return this.requestId++;
	};


	/**
	 *  Sends request as a string. Internal low-level function, should not be used outside
	 * 
	 *  @method socketSend
	 *  @param {object} request 
	 */
	Syncano.prototype.socketSend = function(request){
		this.socket.send(JSON.stringify(request) + '\n');
	};


	/**
	 *  Universal high-level function for sending requests to syncano. 
	 *  Sends request to 'method' with given 'params' if the socket is connected. If not, puts request on the queue to be sent later.
	 *  Uses internal 'waitingForResponse' object to match request with response.
	 *
	 *  @method sendRequest
	 *  @param {string} method Name of the Syncano method to call (check syncano docs)
	 *  @param {object} params Parameters to send. Every method needs different parameters (check syncano docs)
	 *  @param {function} callback Function to call after receiving response from server
	 */
	/** 
	 *  Before sending request to server
	 *  @event syncano:call
	 */
	/** 
	 *  When user wants to send data to the server, but connection has not been established yet
	 *  @event syncano:queued
	 */
	Syncano.prototype.sendRequest = function(method, params, callback, requestType){
		if(typeof params === 'undefined'){
			params = {};
		}
		if(this.connectionType === 'ajax' || requestType === 'ajax'){
			var url = 'https://' + this.instance + '.syncano.com/api/' + method + '?api_key=' + this.apiKey + '&';
			for(var key in params){
				if(params.hasOwnProperty(key)){
					url += key + '=' + params[key] + '&';
				}
			}
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4 && xhr.status === 200){
					var data = JSON.parse(xhr.responseText);
					this.trigger('syncano:received', data);
					callback(data);
				}
			}.bind(this);
			xhr.send();
		} else if(this.connectionType === 'socket'){
			var request = {
				type: 'call',
				method: method,
				params: params
			};
			
			request.message_id = this.getNextRequestId();

			/**
			 *  Remember method and callback on the waitingForResponse list. When the response comes, callback will be called
			 */
			this.waitingForResponse[request.message_id] = [method, callback];
			
			/**
			 *  Send message to socket if already open and authorized. Otherwise - push to requestsQueue
			 */
			if(this.status === states.AUTHORIZED && this.requestInProgress === false){
				this.requestInProgress = true;
				this.trigger('syncano:call', request);
				this.socketSend(request);
			} else {
				this.trigger('syncano:queued', request);
				this.requestsQueue.push(request);
			}
		}
	};

	/**
	 *  Internal method to check if projectId is a number - so I don't have to write this manualy again and again
	 */
	Syncano.prototype.__checkProjectId = function(projectId){
		if(typeof projectId !== 'number'){
			throw new Error('projectId must be a number');
		}
	};

	/**
	 *  Internal method to check the variable name (string or number) and add correct key to passed object
	 */
	Syncano.prototype.__addCollectionIdentifier = function(params, collection){
		if (typeof collection === 'number'){
			params.collection_id = collection;
		} else if(typeof collection === 'string'){
			params.collection_key = collection;
		} else {
			throw new Error('Collection key/id must be passed');
		}
		return params;
	};

	/**
	 *  Internal shortcut method to send request and run the callback function with proper data as parameter
	 */
	Syncano.prototype.__sendWithCallback = function(method, params, key, callback, requestType){

		var success = function(){};
		var error;

		if(typeof callback === 'function'){
			success = callback;
		} else if(typeof callback === 'object'){
			if(typeof callback.success === 'function'){
				success = callback.success;
			}
			if(typeof callback.error === 'function'){
				error = callback.error;
			}
		}

		var customSuccess = function(data){
			var res;
			if(key === null){
				res = true;
			} else {
				if(typeof data[key] !== 'undefined'){
					res = data[key];
				} else {
					res = data;
				}
			}
			success(res);
		};

		this.sendRequest(method, params, {
			success: customSuccess,
			error: error
		}, requestType);
	};

	/**
	 *
	 */
	Syncano.prototype.__sendAjaxRequest = function(method, params, resultKey, callback){
		if(typeof params === 'undefined'){
			params = {};
		}
		if(this.instance === null){
			if(typeof params.instance !== 'undefined'){
				this.instance = params.instance;
				delete params.instance;
			} else {
				throw new Error('Please provide instance name');
			}
		}
		if(this.apiKey === null){
			if(typeof params.apiKey !== 'undefined'){
				this.apiKey = params.apiKey;
				delete params.apiKey;
			} else {
				throw new Error('Please provide api key');
			}
		}

		var url = 'https://' + this.instance + '.syncano.com/api/' + method + '?api_key=' + this.apiKey + '&';
		for(var key in params){
			if(params.hasOwnProperty(key)){
				url += key + '=' + params[key] + '&';
			}
		}

		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				var data = JSON.parse(xhr.responseText);
				var callbackParam;
				if(typeof data[resultKey] !== 'undefined'){
					callbackParam = data[resultKey];
				} else {
					callbackParam = data;
				}
				this.trigger('syncano:received', data);
				callback(callbackParam);
			}
		}.bind(this);
		xhr.send();
	};

	var objectInstance = null;


	/**
	 * Export to the root, which is probably `window`. 
	 */
	root.SyncanoConnector = {
		getInstance: function(){
			if(objectInstance === null){
				objectInstance = new Syncano();
			}
			return objectInstance;
		}
	};


}(this));
