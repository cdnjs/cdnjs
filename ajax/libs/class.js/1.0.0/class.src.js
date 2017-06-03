/**
 * Javascript Class Helper
 * @author Tom Flidr | tomflidr(at)gmail(dot)com
 * @version 1.0
 * @date 2016-07-15
 * @usage

var ClassName = Class({
	Extend: ParentClassName,
	Static: {
		staticMethod: function () {
			// call parent static method with same name
			this.parent(param1, param2, ...);
			// call any other parent static method
			this.parent.otherParentStaticMethod(param1, param2, ...);
		}
	},
	Constructor: function () {
		// call parent Constructor
		this.parent(param1, param2);
		// call any other parent dynamic method
		this.parent.otherParentDynamicMethod(param1, param2, ...);
	},
	dynamicMethod: function () {
		// call parent dynamic method with same name
		this.parent(param1, param2);
		// call any other parent dynamic method
		this.parent.otherParentDynamicMethod(param1, param2, ...);
	}
});

*/
Class = (function (_globalScope) {
	// function.prototype.bind Polyfill for Object.create('ClassName, [/* arguments*/]):
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
	Function.prototype.bind||(Function.prototype.bind=function(a){if(typeof this!=='function'){throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');}var b=[].slice,c='prototype',d=b.call(arguments,1),e=this,f=function(){},g=function(){return e.apply(this instanceof f?this:a,d.concat(b.call(arguments)))};if(this[c]){f[c]=this[c]}g[c]=new f();return g});
	// Class helper definition
	var $class = function () {
		var args = [].slice.apply(arguments);
		if (typeof (args[0]) == 'string') {
			return $class._defineNamedClass(args[0], args.length > 1 ? args[1] : {});
		} else {
			return $class._defineClass(args[0], 'Class');
		}
	};
	$class['Constants'] = {
		'ClassImprint'		: '$classImprint',
		'InstanceImprint'	: '$instanceImprint',
		'Extend'			: 'Extend',
		'Static'			: 'Static',
		'Constructor'		: 'Constructor',
		'Name'				: 'Name',
		'self'				: 'self',
		'parent'			: 'parent'
	};
	$class._keywords = {};
	$class['ClassImprintBaseName'] = 'class{0}';
	$class['InstanceImprintBaseName'] = 'instance{0}';
	$class._classImprintCounter = 0;
	$class._instanceImprintCounter = 0;
	$class._actualLevels = [
		{},// dynamic methods parent calls actual level under instanceImprint key
		{} // static methods parent calls actual level under classImprint key
	];
	$class._classParents = {};
	$class['CustomizeSyntax'] = function (constants) {
		var value = '';
		for (var key in constants) {
			value = constants[key];
			$class._keywords[value] = true;
			$class['Constants'][key] = value;
		};
	};
	$class['CustomizeSyntax']($class['Constants']);
	$class['Create'] = function (fullName, args) {
		var _explodedName = fullName.split('.'),
			_namePart = '',
			_currentScope = _globalScope;
		for (var i = 0, l = _explodedName.length; i < l; i += 1) {
			_namePart = _explodedName[i];
			if (!(_namePart in _currentScope)) {
				throw new Error("Class '" + fullName + "' doesn't exist!");
			}
			_currentScope = _currentScope[_namePart];
		}
		args.unshift(_currentScope);
		return new (_currentScope.bind.apply(_currentScope, args))();
	};
	$class['Define'] = function (fullName, cfg) {
		return $class._defineNamedClass(fullName, cfg || {});
	};
	$class._defineNamedClass = function (fullName, cfg) {
		var _explodedName = fullName.split('.'),
			_name = _explodedName[_explodedName.length - 1],
			_namePart = '',
			_constants = $class['Constants'],
			_currentScope = _globalScope,
			_selfStr = $class['Constants']['self'],
			_result;
		for (var i = 0, l = _explodedName.length - 1; i < l; i += 1) {
			_namePart = _explodedName[i];
			if (!(_namePart in _currentScope)) {
				_currentScope[_namePart] = {};
			}
			_currentScope = _currentScope[_namePart];
		}
		if (cfg.toString === {}.toString) {
			cfg['toString'] = function () {
				return '[object ' + this[_constants['self']][_constants['Name']] + ']';
			}
		}
		_result = $class._defineClass(cfg, _name);
		_currentScope[_name] = _result;
		return _result;
	};
	$class._defineClass = function (cfg, _name) {
		var _constants = $class['Constants'],
			_extend = _constants['Extend'],
			_nameStr = _constants['Name'],
			_classImprint = _constants['ClassImprint'],
			_self = _constants['self'],
			_currentClassImprint = '',
			_parentClassImprint = '';
		// create internal class constructor from basic javascript function
		var Class = function () {
			return $class._constructor(cfg, this, [].slice.apply(arguments));
		};
		var _classDefinition = Class;
		// imprints for parent calls
		if (cfg[_extend]) {
			if (typeof (cfg[_extend][_classImprint]) == 'function') {
				_parentClassImprint = cfg[_extend][_classImprint]();
			} else {
				_parentClassImprint = $class._completeClassImprint();
				cfg[_extend][_classImprint] = function () { return _parentClassImprint };
			}
		}
		_currentClassImprint = $class._completeClassImprint();
		_classDefinition[_classImprint] = function () { return _currentClassImprint };
		// extend parent and current dynamic and static elements (including constructor)
		$class._extendParentPrototype(_classDefinition, cfg);
		$class._extendParentStatic(_classDefinition, cfg);
		$class._declareCurrentPrototype(_classDefinition, cfg);
		$class._declareCurrentStatic(_classDefinition, cfg);
		// store current Class object in local property for later use
		_classDefinition[_self] = _classDefinition;
		// to find parent definition by imprint traversing - parent calls - store parent class definition in static place
		if (cfg[_extend]) {
			_classDefinition[_self][_extend] = cfg[_extend];
			$class._classParents[_currentClassImprint] = _parentClassImprint;
		}
		// to get anytime inside instance class definition without naming it:
		_classDefinition['prototype'][_self] = _classDefinition;
		// define parent calls helper in static methods
		$class._declareParentStaticCalls(_classDefinition);
		// return function with prototype - ready to use like: var instance = new ClassName();
		_classDefinition[_nameStr] = _name;
		return _classDefinition;
	};
	$class._constructor = function (_cfg, _context, _args) {
		var _constants = $class['Constants'],
			_constructorStr = _constants['Constructor'],
			_instanceImprint = '';
		if (_context === _globalScope) {
			if (typeof (_cfg[_constructorStr]) == 'function') {
				_cfg[_constructorStr].apply(_context, _args);
			} else {
				throw new Error("Class definition is not possible to call as function, it's necessary to create instance with 'new' keyword before class definition.");
			}
		} else {
			// fingerprint for dynamic parent calls
			_instanceImprint = $class._completeInstanceImprint();
			_context[_constants['InstanceImprint']] = function () { return _instanceImprint };
			// define parent calls helper in dynamic methods in later binding here after instance is created - to work with 'this' context properly
			$class._declareParentDynamicCalls(_context);
			// call defined constructor
			return _context[_constructorStr].apply(_context, _args);
		}
	};
	$class._completeClassImprint = function () {
		var _result = $class['ClassImprintBaseName'].replace('{0}', $class._classImprintCounter);
		$class._classImprintCounter += 1;
		return _result;
	};
	$class._completeInstanceImprint = function () {
		var _result = $class['InstanceImprintBaseName'].replace('{0}', $class._instanceImprintCounter);
		$class._instanceImprintCounter += 1;
		return _result;
	};
	$class._extendParentPrototype = function (classDefinition, cfg) {
		var _constants = $class['Constants'],
			_nameStr = _constants['Name'],
			_prototype = 'prototype',
			_dynamicName = '',
			_cfgExtend = cfg[_constants['Extend']];
		var Prototype = function () { },
			_currentProto;
		if (_cfgExtend) {
			/*if (Object['create']) {
				classDefinition[_prototype] = Object['create'](_cfgExtend[_prototype]);
			} else {*/
				if (_cfgExtend) Prototype[_prototype] = _cfgExtend[_prototype];
				classDefinition[_prototype] = new Prototype();
			//}
		}
		_currentProto = classDefinition[_prototype];
		for (_dynamicName in _currentProto) {
			if (typeof (_currentProto[_dynamicName][_nameStr]) != 'string')
				_currentProto[_dynamicName][_nameStr] = _dynamicName;
		}
	};
	$class._extendParentStatic = function (classDefinition, cfg) {
		var _staticName = '',
			_constants = $class['Constants'],
			_nameStr = _constants['Name'],
			_cfgExtend = cfg[_constants['Extend']];
		if (_cfgExtend) {
			for (_staticName in _cfgExtend) {
				if (!($class._keywords[_staticName] === true)) {
					classDefinition[_staticName] = _cfgExtend[_staticName];
					classDefinition[_staticName][_nameStr] = _staticName;
				}
			}
		}
	};
	$class._declareCurrentPrototype = function (classDefinition, cfg) {
		var _classPrototype = classDefinition['prototype'],
			_constants = $class['Constants'],
			_nameStr = _constants['Name'],
			_constructor = _constants['Constructor'],
			_dynamicName = '';
		for (_dynamicName in cfg) {
			if (!($class._keywords[_dynamicName] === true)) {
				_classPrototype[_dynamicName] = cfg[_dynamicName];
				_classPrototype[_dynamicName][_nameStr] = _dynamicName;
			}
		}
		if (cfg[_constructor]) {
			_classPrototype[_constructor] = cfg[_constructor];
			_classPrototype[_constructor][_nameStr] = _constructor;
		}
		_classPrototype[_constants['InstanceImprint']] = function () { return '' };
	};
	$class._declareCurrentStatic = function (classDefinition, cfg) {
		var _staticName = '',
			_constants = $class['Constants'],
			_nameStr = _constants['Name'],
			_cfgStatic = cfg[_constants['Static']];
		if (_cfgStatic) {
			for (_staticName in _cfgStatic) {
				if (!($class._keywords[_staticName] === true)) {
					classDefinition[_staticName] = _cfgStatic[_staticName];
					classDefinition[_staticName][_nameStr] = _staticName;
				}
			}
		}
	};
	$class._declareParentDynamicCalls = function (_context) {
		var _constants = $class['Constants'],
			_nameStr = _constants['Name'],
			_parent = _constants['parent'],
			_self = _constants['self'],
			_prototypeStr = 'prototype',
			_dynamicName = '',
			_currentDefinition = _context[_self],
			_parentDefinition = _currentDefinition[_self][_constants['Extend']],
			_parentDefinitionPrototype,
			_clsProtoParent;
		_currentDefinition[_prototypeStr][_parent] = function () {
			return $class._parentCall(this, arguments.callee.caller[_nameStr], [].slice.apply(arguments), 0);
		};
		_clsProtoParent = _currentDefinition[_prototypeStr][_parent];
		if (_parentDefinition) {
			_parentDefinitionPrototype = _parentDefinition[_prototypeStr];
			for (_dynamicName in _parentDefinitionPrototype) {
				if (typeof(_parentDefinitionPrototype[_dynamicName]) == 'function' && !($class._keywords[_dynamicName] === true)) {
					_clsProtoParent[_dynamicName] = $class._declareParentDynamicCallsProvider(_context, _dynamicName);
				}
			}
		}
	};
	$class._declareParentDynamicCallsProvider = function (_context, _dynamicName) {
		return function () {
			return $class._parentCall(_context, _dynamicName, [].slice.apply(arguments), 0);
		};
	};
	$class._declareParentStaticCalls = function (_currentDefinition) {
		var _constants = $class['Constants'],
			_nameStr = _constants['Name'],
			_parent = _constants['parent'],
			_staticName = '',
			_parentDefinition = _currentDefinition[_constants['Extend']],
			_clsParent;
		_currentDefinition[_parent] = function () {
			return $class._parentCall(this, arguments.callee.caller[_nameStr], [].slice.apply(arguments), 1);
		};
		_clsParent = _currentDefinition[_parent];
		if (_parentDefinition) {
			for (_staticName in _parentDefinition) {
				if (typeof(_parentDefinition[_staticName]) == 'function' && !Boolean($class._keywords[_staticName])) {
					_clsParent[_staticName] = $class._declareParentStaticCallsProvider(_currentDefinition, _staticName);
				}
			}
		}
	};
	$class._declareParentStaticCallsProvider = function (_context, _staticName) {
		return function () {
			return $class._parentCall(_context, _staticName, [].slice.apply(arguments), 1);
		};
	};
	$class._parentCall = function (_context, _methodName, _args, _imprintsIndex) {
		var _result,
			_constants = $class['Constants'],
			_classImprintStr = _constants['ClassImprint'],
			_instanceImprintStr = _constants['InstanceImprint'],
			_selfStr = _constants['self'],
			_instanceImprintValue = _context[_imprintsIndex ? _classImprintStr : _instanceImprintStr](),
			_contextClassDefinition = _context[_selfStr],
			_contextClassImprintValue = _contextClassDefinition[_classImprintStr](),
			_parentClassImprint = $class._getParentClassImprint(
				_contextClassImprintValue, _instanceImprintValue, _imprintsIndex
			),
			_parentClassDefinition = $class._getParentClassDefinition(
				_contextClassDefinition, _parentClassImprint
			),
			_parentMethod = _imprintsIndex ? _parentClassDefinition[_methodName] : _parentClassDefinition['prototype'][_methodName],
			_parentMethodType = typeof (_parentMethod);
		if (_parentMethodType == 'undefined') {
			try {
				throw "No parent method named: '" + _methodName + "'.";
			} catch (e) {
				console.log(e.stack);
			}
		} else if (_parentMethodType != 'function') {
			throw "Parent method '" + _methodName + "' is not a function.";
		};
		_result = _parentMethod.apply(_context, _args);
		delete $class._actualLevels[_imprintsIndex][_instanceImprintValue];
		return _result;
	};
	$class._getParentClassImprint = function (_contextClassImprint, _instanceImprint, _imprintsIndex) {
		var _levels = $class._actualLevels[_imprintsIndex],
			_currentImprint = '',
			_parentImprint = '';
		if (typeof (_levels[_instanceImprint]) == 'undefined') {
			_levels[_instanceImprint] = _contextClassImprint;
		}
		_currentImprint = _levels[_instanceImprint];
		_parentImprint = $class._classParents[_currentImprint];
		if (!_parentImprint) {
			// no parent class definition
			throw new Error("No parent class defined.");
		}
		_levels[_instanceImprint] = _parentImprint;
		return _parentImprint;
	};
	$class._getParentClassDefinition = function (_currentClassDefinition, _parentClassImprint) {
		var _constants = $class['Constants'],
			_extendStr = _constants['Extend'],
			_classImprintStr = _constants['ClassImprint'],
			_success = false,
			_parentClassDefinition;
		while (true) {
			if (typeof (_currentClassDefinition[_extendStr]) == 'undefined') break;
			_parentClassDefinition = _currentClassDefinition[_extendStr];
			if (_parentClassDefinition[_classImprintStr]() == _parentClassImprint) {
				_success = true;
				break;
			}
			_currentClassDefinition = _parentClassDefinition;
		}
		if (!_success) {
			throw new Error("No parent class definition found for class imprint: '" + _parentClassImprint + "'.");
		}
		return _parentClassDefinition;
	};
	_globalScope['Class'] = $class;
	return $class;
})(Boolean(typeof (module) !== 'undefined' && module.exports) ? global : this);