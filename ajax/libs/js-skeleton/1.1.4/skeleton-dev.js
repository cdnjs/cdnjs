var Skeleton = (function() {

/*********
   Model
 *********/
function Model(attributes) {

	// Make sure initialized
	if(!(this instanceof Model))
		return new Model(attributes);

	function model(options) {

		let _attrs = Object.assign({}, attributes.defaults) || {};

		this.get = function(attr) {
			return _attrs[attr] || null;
		}

		this.set = function() {
			if(arguments.length === 2)
				_attrs[arguments[0]] = arguments[1];
			else if(arguments.length === 1) {
				let obj = arguments[0];
				for(let key in obj) {
					_attrs[key] = obj[key];
				}
			}
			else
				throw new Error('Error on setting a value');
		}

		this.toJSON = function() {
			return _attrs;
		}

		// Set attributes
		for(let opt in options) {
			this.set(opt, options[opt]);
		}

		// Call init
		if(attributes && attributes.init)
			attributes.init.call(this);

	}

	// Set additional methods to model
	for(let attr in attributes) {
		if(attr !== 'init' && attr !== 'defaults') {
			model.prototype[attr] = attributes[attr];
		}
	}

	return model;
}


/************
  Collection
 ************/
function Collection(attributes) {

	// Make sure initialized
	if(!(this instanceof Collection))
		return new Collection(attributes);

	function collection(options) {

		let _collection = [];

		let _collectionModel = attributes && attributes.model;

		this.add = function(model) {
			if(!(model instanceof _collectionModel))
				throw new Error('A collection must consist of models of same instance');
			_collection.push(model);
		}

		this.removeByFields = function(options) {
			_collection = _collection.filter(model => {
				for(let opt in options) {
					if(model.get(opt) !== options[opt])
						return true;
				}
				return false;
			});
		}

		this.remove = function() {
			if(arguments.length === 1) {
				removeOne(arguments[0]);
			}
			else {
				for(let i=0; i<arguments.length; i++) {
					removeOne(arguments[i]);
				}
			}
		}

		this.removeAll = function() {
			_collection = [];
		}

		this.models = function() {
			return _collection;
		}

		this.filterToJSON = function(options, comperator) {
			let filteredCollection = this.toJSON();
			if(!comperator) {
				for(let opt in options) {
					filteredCollection = filteredCollection.filter(modelJSON => {
							return modelJSON[opt] === options[opt];
					});
				}
			}
			else {
				for(let opt in options) {
					filteredCollection = filteredCollection.filter(modelJSON => {
						return comperator.call(modelJSON[opt], options[opt]);
					});
				}
			}
			return filteredCollection;			
		}

		this.toJSON = function() {
			return _collection.map(model => model.toJSON());
		}

		if(attributes && attributes.init)
			attributes.init.call(this);

		function removeOne(arg) {
			if(typeof(arg) === 'number') {
				_collection.splice(arg,1);
			}
			else {
				_collection = _collection.filter(model => model !== arg);
			}
		}

	}

	return collection;

}


/********
   View
 ********/
 function List(attributes) {

 	// Make sure initialized
	if(!(this instanceof List))
		return new List(attributes);

 	const re = /{{\s*((\w+\.?\w+?)*\s*\|?\s*\w+)\s*}}/g;

 	let _index = 0;
 	let _listeners = []; // {type: all/push/remove, listener: function}

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
 	if(typeof(temp) === 'string')
 		_template = temp;
 	else if(typeof(temp) === 'object') {
 		if(!temp.templateId)
 			throw new Error('Template must be a string, or an object with "templateId" field');
 		else
 			_template = document.getElementById(temp.templateId).innerHTML;
 	}

 	if(!_model)
 		throw new Error('A model must be supplied');
 	if(!_element)
 		throw new Error('An element must be supplied, provided by its id');
 	if(!_template)
 		throw new Error('A template id or string must be supplied');

 	let _collection = new (new Collection({ model : _model }));

 	this.getCollection = function() {
 		return _collection;
 	}

 	this.models = function() {
 		return _collection.toJSON();
 	}

 	this.updateView = _updateView;

 	this.pushAll = function(models) {
 		models.forEach(model => {
 			_collection.add(new _model(model));
 		});
 		_updateView();
 		_notifyListeners('push');
 	}

 	this.push = function(model) {
 		if(model instanceof _model)
 			_collection.add(model);
 		else
 			_collection.add(new _model(model));
 		_updateView();
 		_notifyListeners('push');
 	}

 	this.remove = function(index) {
 		let collection = this.models();
 		for(var i=0; i<collection.length; i++) {
 			let model = collection[i];
 			if(model.index === index) {
 				_collection.remove(i);
 				break;
 			}
 		}
 		_updateView();
 		_notifyListeners('remove');
 		return collection[i];
 	}

 	this.removeByFields = function(options) {
 		_collection.removeByFields(options);
 		_updateView();
 		_notifyListeners('remove');
 	}

 	this.removeAll = function() {
 		_collection.removeAll();
 		_updateView();
 		_notifyListeners('remove');
 	}

 	this.get = function(index) {
  		let collection = this.models();
 		for(let i=0; i<collection.length; i++) {
 			let model = collection[i];
 			if(model.index === index) 
 				return model;
 		}	
 	}

 	this.size = function() {
 		return this.models().length;
 	}

 	this.filter = function(options, comperator) {
 		let coll = _collection.filterToJSON(options, comperator);
 		_updateView(coll);
 		return coll;
 	}

 	this.addFilter = function(filterName, filterCbk) {
 		if(typeof(filterName) !== 'string')
 			throw new Error('Filter name must be a string');
 		if(typeof(filterCbk) !== 'function')
 			throw new Error('Filter callback must be a function');
 		_customFilters[filterName] = filterCbk;
 	}

 	this.subscribe = function() {
 		if(arguments.length === 1 && typeof(arguments[0]) === 'function') {
 			_listeners.push({ type: 'all', listener: arguments[0] });
 		}
 		else if(arguments.length === 2) {
 			let type = arguments[0];
 			let listener = arguments[1];
 			if(type === 'push') {
 				_listeners.push({ type: 'push', listener });
 			}
 			else if(type === 'remove') {
 				_listeners.push({ type: 'remove', listener });
 			}
 			else
 				throw new Error('type of listener must be "push" or "remove"');
 		}
 		else 
 			throw new Error('You should pass a callback function or a type "push" or "remove" and a callback to subscribe');
 	}

 	function _notifyListeners(type) {
 		if(type === 'all' || !type) {
 			_listeners.forEach(l => l.listener());
 		}
 		else if(type === 'push') {
 			_listeners.filter(l => l.type !== 'remove').forEach(l => l.listener());
 		}
 		else { // type = 'remove'
 			_listeners.filter(l => l.type !== 'push').forEach(l => l.listener());
 		}
 	}

 	function _updateView(coll) {
 		_element.innerHTML = _renderTemplate(coll);
 	}

 	function _renderTemplate(coll) {
 		let collection = coll || _collection.toJSON();
 		collection.forEach(model => model.index = _generateIndex()); // generate unique index to each model
 		let templateString = '';
 		collection.forEach(model => templateString += _renderModel(model));
 		return templateString;
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
		if(!txtToRender)
			throw new Error('Please check the expression "' + txt + '" you passed in the template');
		if(_customFilters[filter]) {
			return _customFilters[filter](txtToRender);
		}
		throw new Error('The filter you are using does not exist. Please use "addFilter" function to create it.');
 	}

 	function _resolveNestedObject(model, input) {
		let nestedObjectArray = input.split('.');
		if(nestedObjectArray.length === 1)
			return model[input];
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

 }

return {
	Model,
	List
}

})();

