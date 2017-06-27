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

 	const re = /{{\s*(\w+\s*\|?\s*\w+)\s*}}/g;

 	let _index = -1;

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
 		return collection[i];
 	}

 	this.removeByFields = function(options) {
 		_collection.removeByFields(options);
 		_updateView();
 	}

 	this.removeAll = function() {
 		_collection.removeAll();
 		_updateView();
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

 	this.filter = function(options) {
 		let coll = _collection.filterToJSON(options);
 		_updateView(coll);
 	}

 	function _updateView(coll) {
 		_element.innerHTML = _renderTemplate(coll);
 	}

 	function _renderTemplate(coll) {
 		let collection = coll || _collection.toJSON();
 		collection.forEach(model => model.index = generateIndex()); // generate unique index to each model
 		let tempalteString = '';
 		collection.forEach(model => {
 			tempalteString += _renderModel(model);
 		});
 		return tempalteString;
 	}

 	function _renderModel(model) {
 		let temp = _template;
 		temp = temp.replace(re, (str,g) => {
 			if(g.indexOf('|') !== -1) {
 				let parts = g.split('|');
 				let txt = parts[0].trim();
 				let filter = parts[1].trim();
 				let txtToRender = model[txt];
 				if(!txtToRender)
 					throw new Error('Please check the expression "' + txt + '" you passed in the template');
 				if(filter === 'upper')
 					return txtToRender.toUpperCase();
 				else if(filter === 'lower')
 					return txtToRender.toLowerCase();
 				else if(filter === 'capitalize') 
 					return txtToRender.charAt(0).toUpperCase() + txtToRender.slice(1).toLowerCase();
 				else if(filter === 'currency')
 					return '$' + txtToRender;
 				else if(filter === 'json') {
 					try {
 						txtToRender = JSON.stringify(txtToRender);
 					}
 					catch(e) {
 						throw new Error('The argument passed can not be stringified to a json string');
 					}
 					return txtToRender;
 				}
 				else
 					throw new Error('The filter you are using is not supported. Please write to guypeer8@gmail.com to get support to what you need');

 			}
 			return model[g];
 		});

 		return temp;
 	}

 	function generateIndex() {
 		return _index++;
 	}

 }

return {
	Model,
	List
}

})();

