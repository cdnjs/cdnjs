var Skeleton = (function() {

/*********
   Model
 *********/
function Model(attributes) {

	// Make sure initialized
	if(!(this instanceof Model)) {
		return new Model(attributes);
	}

	if(!(attributes && attributes.defaults)) {
		throw new Error('A "defaults" field must be passed');
	}

	// model class
	function model(options) {

		let _attrs = Object.assign({}, attributes.defaults) || {};

		this.get = function(attr) {
			return _attrs[attr] || null;
		}

		this.set = function() {
			if(arguments.length === 2) {
				_attrs[arguments[0]] = arguments[1];
			}
			else if(arguments.length === 1) {
				let obj = arguments[0];
				for(let key in obj) {
					_attrs[key] = obj[key];
				}
			}
			else {
				throw new Error('Error on setting a value');
			}
		}

		// get json representation of the model
		this.toJSON = function() {
			return _attrs;
		}

		// set attributes
		for(let opt in options) {
			this.set(opt, options[opt]);
		}

		// call init
		if(attributes && attributes.init) {
			attributes.init.call(this);
		}

	}

	// set additional methods to model
	for(let attr in attributes) {
		if(attr !== 'init' && attr !== 'defaults') {
			model.prototype[attr] = attributes[attr];
		}
	}

	return model;
}


/**********
    View
 **********/
 function List(attributes) {

 	// Make sure initialized
	if(!(this instanceof List)) {
		return new List(attributes);
	}

 	const re = /{{\s*((\w+\.?\w+?)*\s*\|?\s*\w+)\s*}}/g; 
 	const re_loop = /{{\s*#\s*((\w+\.?\w+?)*\s*\|?\s*\w+)\s*}}/g;

 	let _index = 0;
 	
 	let _listeners = { // Each array contains functions to run
 		push: [],
 		remove: [],
 		filter: [],
 		sort: [],
 		pushAll: [],
 		removeAll: [],
 		edit: []
 	};

 	let _customFilters = {
 		upper: function(txt) {
 			return txt.toUpperCase();
 		},
 		lower: function(txt) {
 			return txt.toLowerCase();
 		},
 		capitalize: function(txt) {
 			return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
 		},
 		currency: function(txt) {
 			return '$' + txt;
 		},
 		json: function(txt) {
 			try {
				txt = JSON.stringify(txt);
			}
			catch(e) {
				throw new Error('The argument passed can not be stringified to a json string');
			}
			return txt;		
 		}
 	}; 

 	let _model = attributes && attributes.model;
 	let _element = document.getElementById(attributes && attributes.element);
 	let _template;

 	let temp = attributes && attributes.template;
 	if(typeof(temp) === 'string') {
 		_template = temp;
 	}
 	else if(typeof(temp) === 'object') {
 		if(!temp.templateId) {
 			throw new Error('Template must be a string, or an object with "templateId" field');
 		}
 		else {
 			_template = document.getElementById(temp.templateId).innerHTML;
 		}
 	}

 	if(!_model) {
 		throw new Error('A model must be supplied');
 	}
 	if(!_element) {
 		throw new Error('An element must be supplied, provided by its id');
 	}
 	if(!_template) {
 		throw new Error('A template id or string must be supplied');
 	}

 	let self = this;

 	let _collection = {}; // {index: model}

 	// get collection of model types
 	this.getCollection = function() {
 		return Object.keys(_collection).map(index => _collection[index]);
 	}

 	// get collection of objects
 	this.models = function() {
 		return Object.keys(_collection).map(index => _collection[index].toJSON());
 	}

 	// append array of objects that
 	// represent models to the list
 	this.pushAll = function(models) {
 		models.forEach(model => {
 			model.index = _generateIndex();
 			_collection[model.index] = new _model(model);
 		});
 		_element.innerHTML += _renderTemplate();
 		_notifyListeners('pushAll', this.models());
 	}

 	// push to end of the list
 	this.push = function(model) {
		_addModel(model, 'push');
 	}

 	// push to begining of the list
 	this.unshift = function(model) {
 		_addModel(model, 'unshift');
 	}

 	// remove single model and return it
 	this.remove = function(index) {
 		if(!_collection[index]) {
 			return;
 		}
 		let model = _collection[index];
 		delete _collection[index];
 		_removeModelAndRender(index);
 		_notifyListeners('remove', model);
 		return model;
 	}

 	// get max index
 	this.lastIndex = function() {
 		if(this.size() === 0) {
 			return -1;
 		}
 		return _index-1;
 	}

 	// get min index
 	this.firstIndex = function() {
 		let indexes = Object.keys(_collection);
 		if(!indexes.length)
 			return;
 		let min_index = Infinity;
 		indexes.forEach(index => {
 			if(index < min_index) {
 				min_index = index;
 			}
 		});
 		return min_index;
 	}

 	// clear list and notify listeners
 	this.removeAll = function() {
 		_collection = {};
 		_element.innerHTML = '';
 		_notifyListeners('removeAll');
 	}

 	// get model object by index
 	this.get = function(index) {
  		if(!_collection[index]) {
  			return null;
  		}
  		return _collection[index].toJSON();
 	}

 	// get number of models in the list
 	this.size = function() {
 		return Object.keys(_collection).length;
 	}

 	// filter models and render
 	this.filter = function(cbk) {
 		let coll = this.models().filter(cbk);
 		_element.innerHTML = _renderTemplate(coll);
 		_notifyListeners('filter', coll);
 		return coll;
 	}

 	// sort models and render
 	this.sort = function(sorter) {
 		sorter = sorter || function(a,b){return a.index - b.index;};
 		let sorted = this.models().sort(sorter);
 		let sortedCollection = {};
 		sorted.forEach(model => {
 			sortedCollection[model.index] = _collection[model.index];
 		});
 		_collection = sortedCollection;
 		_element.innerHTML = _renderTemplate(); // render
 		_notifyListeners('sort', sorted);
 	}

 	// go over models
 	this.forEach = function(cbk) {
 		this.models().forEach(cbk);
 	}

 	// edit a field in the model and replace it in the list
 	this.edit = function(index, options) {
 		if(!options) {
 			return;
 		}
 		let model = _collection[index];
 		for(let key in options) {
 			model.set(key, options[key]);
 		}
 		let modelJSON = model.toJSON();
 		let html = _renderLoop(_renderModel(modelJSON), modelJSON);
 		let newEl = _htmlToElement(html);
 		_replaceModel(index, newEl); // render
 		_notifyListeners('edit', modelJSON);
 	}

 	// add filter to be used by pipe in the template
 	this.addFilter = function(filterName, filterCbk) {
 		if(typeof(filterName) !== 'string') {
 			throw new Error('Filter name must be a string');
 		}
 		if(typeof(filterCbk) !== 'function') {
 			throw new Error('Filter callback must be a function');
 		}
 		_customFilters[filterName] = filterCbk;
 	}

 	// subscribe to event
 	this.subscribe = function() {
 		if(arguments.length === 1 && typeof(arguments[0]) === 'function') {
 			let listener = arguments[0];
 			_listeners['push'].push(listener);
 			_listeners['remove'].push(listener);
 			return () => { // unsubscription
 				unsubscribe('push', listener);
 				unsubscribe('remove', listener);
 			}
 		}
 		else if(arguments.length === 2) {
 			let type = arguments[0];
 			let listener = arguments[1];
 			if(Array.isArray(type)) {
 				type.forEach(t => {
	 	 			if(_listeners[t]) {
	 					_listeners[t].push(listener);		
	 				}	
	 				else {
	 					throw new Error('type ' + t + ' is not a possible type. possible types: "push", "remove", "filter", "sort", "edit", "pushAll", "removeAll"');
	 				}	
 				});
 				return () => type.forEach(t => unsubscribe(t, listener)) // unsubscription
 			}
 			else {
	 			if(_listeners[type]) {
	 				_listeners[type].push(listener);
		 			return () => unsubscribe(type, listener) // unsubscription
	 			}
 				throw new Error('type ' + type + ' is not a possible type. possible types: "push", "remove", "filter", "sort", "edit", "pushAll", "removeAll"');	
 			}
 		}
 		else {
 			throw new Error('You should pass a callback function or a type "push" or "remove" and a callback to subscribe');
 		}
 		// Give a way to unsubscribe
 		function unsubscribe(type, listener) {
			for(let i=0; i<_listeners[type].length; i++) {
				if(_listeners[type][i] === listener) {
					_listeners[type].splice(i,1);
					break;
				}
			}
		}
 	}

 	/****************************
 	    List Private Functions
 	 ***************************/
 	function _notifyListeners(type, param) {
 		if(!type) {
 			_listeners.push.forEach(listener => listener(param));
 			_listeners.remove.forEach(listener => listener(param));
 		}
 		else if(_listeners[type]) {
 			_listeners[type].forEach(listener => listener(param));
 		}
 		else {
 			throw new Error('The type passed is not a possible type');
 		}
 	}

 	function _addModel(model, method) {
  		if(!(model instanceof _model)) {
 			model = new _model(model);
 		}
 		let index = _generateIndex();
 		model.set('index', index);
 		let modelJSON = model.toJSON();
 		_collection[index] = model;
 		_updateSingleModelView(modelJSON, method);
 		_notifyListeners('push', modelJSON);
 	}

 	function _replaceModel(index, newEl) {
 		let attr = '[data-id="' + index + '"]';
 		let el = _element.querySelector(attr);
 		if(!el) {
 			throw new Error('Make sure your you set a "data-id" attribute to each model');
 		}
 		_element.replaceChild(newEl, el);
 	}

 	function _updateSingleModelView(model, method) {
 		let el = _htmlToElement(_renderLoop(_renderModel(model), model));
 		if(method === 'push') {
 			_element.appendChild(el);
 		}
 		else if(method === 'unshift') {
 			_element.insertBefore(el, _element.childNodes[0]);
 		}
 		else {
 			throw new Error('unknown method passed to "_updateSingleModelView"');
 		}
 	}

 	function _removeModelAndRender(index) {
 		let attr = '[data-id="' + index + '"]';
 		let el = _element.querySelector(attr);
 		if(!el) {
 			throw new Error('Make sure your you set a "data-id" attribute to each model');
 		}
 		el.remove();
 	}

 	function _renderTemplate(coll) {
 		let collection = coll || self.models();
 		let templateString = '';
 		collection.forEach(model => {
 			templateString += _renderLoop(_renderModel(model), model);
 		});
 		return templateString;
 	}

 	function _renderLoop(template, model) {
 		let el = _htmlToElement(template);
 		let domElements = el.querySelectorAll('[data-loop]');
 		if(!domElements || !domElements.length) // no data-loop
 			return template;
 		Array.prototype.slice.call(domElements).forEach((dElement,i) => {
	 		let attr = dElement.getAttribute('data-loop').trim();
	 		let arr = model[attr];
	 		if(!arr) { // no attribute in model
	 			throw new Error(attr + ' attribute does not appear in model');
	 		}
	 		if(!Array.isArray(arr)) {
	 			throw new Error(attr + '\'s value must be an array');
	 		}
	 		let dElementHtml = _elementToHtml(dElement);
	 		let temp = '';
	 		arr.forEach(obj => {
		 		temp += dElementHtml.replace(re_loop, (str,g) => {
		 			if(g.indexOf('|') !== -1) {
		 				return _filterize(obj, g);
		 			}
		 			return _resolveNestedObject(obj, g);
		 		});
	 		});
	 		template = template.replace(dElementHtml, temp);
	 	});
 		return template;
 	}

 	function _renderModel(model) {
 		let temp = _template;
 		temp = temp.replace(re, (str,g) => {
 			if(g.indexOf('|') !== -1) {
 				return _filterize(model, g);
 			}
 			return _resolveNestedObject(model, g);
 		});
 		return temp;
 	}

 	function _filterize(model, g) {
		let parts = g.split('|');
		let txt = parts[0].trim();
		let filter = parts[1].trim();
		let txtToRender = _resolveNestedObject(model, txt); // resolve nested object
		if(!txtToRender) {
			throw new Error('Please check the expression "' + txt + '" you passed in the template');
		}
		if(_customFilters[filter]) {
			return _customFilters[filter](txtToRender);
		}
		throw new Error('The filter you are using does not exist. Please use "addFilter" function to create it.');
 	}

 	function _resolveNestedObject(model, input) {
 		if(input === 'this')
 			return model;
		let nestedObjectArray = input.split('.');
		if(nestedObjectArray.length === 1) {
			return model[input];
		}
		else {
			let txtToRender = model[nestedObjectArray[0].trim()];
			for(var i=1; i<nestedObjectArray.length; i++) {
				txtToRender = txtToRender[nestedObjectArray[i].trim()];
			}
			return txtToRender;
		}
 	}

 	function _generateIndex() {
 		return _index++;
 	}

 	function _elementToHtml(el) {
 		let div = document.createElement('div');
 		div.appendChild(el);
 		return div.innerHTML;
 	}

 	function _htmlToElement(html) {
		let div = document.createElement('div');
		div.innerHTML = html;
		return div.firstElementChild;
	}

 }

/***************************************
    Skeleton Storage Helper Functions
 ***************************************/
function _stringifyValue(value) {
	try {
		value = JSON.stringify(value);
		return value;	
	}
	catch(e) {
		return value;
	}	
}

function _parseValue(value) {
	try {
		value = JSON.parse(value);
		return value;	
	}
	catch(e) {
		return value;
	}	
}

/***********************
    Skeleton Storage
 ***********************/
let storage = {
	save() {
	 	if(window.localStorage) {
	 		if(arguments.length === 2) {
	 			let key = arguments[0];
	 			let value = arguments[1];
	 			if(typeof(key) !== 'string') {
	 				throw new Error('First item must be a string');
	 			}
	 			value = _stringifyValue(value);
	 			window.localStorage.setItem(key, value);
	 		}
	 		else if(arguments.length === 1 && typeof(arguments[0]) === 'object') {
	 			let pairs = arguments[0];
	 			for(let key in pairs) {
	 				let value = pairs[key];
	 				value = _stringifyValue(value);
	 				window.localStorage.setItem(key, value);
	 			}
	 		}
	 		else {
	 			throw new Error('Method save must get key an value, or an object of keys and values');
	 		}
	 	}
	 },

	fetch(key) {
	 	if(window.localStorage) {
	 		let value = window.localStorage.getItem(key);
	 		if(!value) {
	 			return null;
	 		}
	 		return _parseValue(value);
	 	}
	 },

	clear() {
	 	if(window.localStorage) {
	 		window.localStorage.clear();
	 	}
	}
}

/************
    Return
 ************/
return {
	Model,
	List,
	storage
}

})();

