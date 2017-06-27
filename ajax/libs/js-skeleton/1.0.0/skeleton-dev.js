var Skeleton = (function() {

/*********
   Model
 *********/
function Model(attributes) {

	// Make sure initialized
	if(!(this instanceof Model))
		return new Model(attributes);

	function model(options) {

		var _attrs = Object.assign({}, attributes.defaults) || {};

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

		let collectionModel = attributes && attributes.model;

		this.add = function(model) {
			if(!(model instanceof collectionModel))
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

		this.filterToJSON = function(options) {
			let filteredCollection = this.toJSON();
			for(let opt in options) {
				filteredCollection = filteredCollection.filter(modelJSON => {
					return modelJSON[opt] === options[opt];
				});
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

 	const re = /{{\s*(\w+)\s*}}/g;

 	let _model = attributes && attributes.model;
 	let _element = document.getElementById(attributes && attributes.element);
 	let _template;

 	if(typeof(attributes && attributes.template) === 'string')
 		_template = attributes.template;
 	else if(typeof(attributes && attributes.template) === 'object') {
 		if(!attributes.template.templateId)
 			throw new Error('Template must be a string, or an object with "templateId" field');
 		else
 			_template = document.getElementById(attributes.template.templateId).innerHTML;
 	}

 	if(!_model)
 		throw new Error('A model must be supplied');
 	if(!_element)
 		throw new Error('An element must be supplied, provided by its id');
 	if(!_template)
 		throw new Error('A template must be supplied');

 	let _collection = new (new Collection({ model : _model }));

 	this.getCollection = function() {
 		return _collection;
 	}

 	this.models = function() {
 		return _collection.toJSON();
 	}

 	this.updateView = _updateView;

 	this.renderAll = function() {
 		_updateView();
 	}

 	this.pushAll = function(models) {
 		models.forEach(model => {
 			_collection.add(new _model(model));
 		});
 		_updateView();
 	}

 	this.push = function(model) {
 		if(model instanceof _model)
 			_collection.add(model);
 		else
 			_collection.add(new _model(model));
 		_updateView();
 	}

 	this.remove = function(options) {
 		_collection.removeByFields(options);
 		_updateView();
 	}

 	this.removeAll = function() {
 		_collection.removeAll();
 		_updateView();
 	}

 	this.size = function() {
 		return this.models().length;
 	}

 	this.filter = function(options) {
 		let coll = _collection.filterToJSON(options);
 		_updateView(coll);
 	}

 	function _updateView(coll) {
 		_element.innerHTML = _renderTemplate(coll);
 	}

 	function _renderTemplate(coll) {
 		let collection = coll || _collection.toJSON();
 		let tempalteString = '';
 		collection.forEach(model => {
 			tempalteString += _renderModel(model);
 		});
 		return tempalteString;
 	}

 	function _renderModel(model) {
 		let temp = _template;
 		temp = temp.replace(re, (str,g) => {
 			return model[g];
 		});
 		return temp;
 	}

 }

return {
	Model,
	List
}

})();

