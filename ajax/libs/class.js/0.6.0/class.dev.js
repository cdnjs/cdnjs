/**
 * Javascript Class Helper
 * @author Tom Flidr | tomflidr(at)gmail(dot)com
 * @version 0.6
 * @date 2015-07-31
 * @usage
 *	var ClassName = $class({
 *		$extends: ParentClassName,
 *		$static: {
 *			staticMethod: function () {
 *				this.$base('parentStaticMethod', param1, param2);
 *			}
 *		},
 *		$constructor: function () {
 *			this.$base('$constructor', param1, param2);
 *		},
 *		$dynamic: {
 *			dynamicMethod: function () {
 *				this.$base('parentDynamicMethod', param1, param2);
 *			}
 *		}
 *	});
 */
var $class = (function () {
	var $class = function (clsCfg) {
		var constants = $class.Constants;
		$class.completeClsCfg(clsCfg);
		// create internal class constructor from javascript function
		var Class = function () {
			var args = Array['prototype'].slice.apply(arguments);
			this[constants.InstanceFingerPrint] = $class.completeInstanceFingerPrint();
			this[constants.Constructor].apply(this, args);
			return this;
		};
		// init static and dynamic methods
		$class.iterateStaticsAndDynamics(Class, clsCfg);
		// constructor function
		if (typeof (clsCfg[constants.Constructor]) != 'function') clsCfg[constants.Constructor] = $class.constructorDefault;
		Class['prototype'][constants.Constructor] = clsCfg[constants.Constructor];
		// fingerprint for parent calling
		Class[constants.ClassFingerPrint] = $class.completeClassFingerPrint();
		// parent calling helper
		Class['prototype'][constants.ParentCall] = $class.callParentDynamic;
		Class[constants.ParentCall] = $class.callParentStatic;
		// store extended Class object into local property for later use
		Class[constants.Class] = Class;
		Class['prototype'][constants.Class] = Class;
		return Class;
	};
	$class.completeClsCfg = function (clsCfg) {
		var constants = $class.Constants,
			_extend = constants.Extends,
			_static = constants.Static,
			_dynamic = constants.Dynamic;
		clsCfg[_extend] = clsCfg[_extend] || function () { };
		clsCfg[_static] = clsCfg[_static] || {};
		clsCfg[_dynamic] = clsCfg[_dynamic] || {};
		clsCfg[_static][_extend] = clsCfg[_extend];
	}
	$class.iterateStaticsAndDynamics = function (Class, clsCfg) {
		var constants = $class.Constants,
			_extend = constants.Extends,
			_static = constants.Static,
			_dynamic = constants.Dynamic,
			_prototype = 'prototype',
			_undefined = 'undefined';
		for (var staticName in clsCfg[_static]) {
			Class[staticName] = clsCfg[_static][staticName];
		}
		for (var dynamicName in clsCfg[_dynamic]) {
			if (!$class.isPropertyClassKeyword(dynamicName)) {
				Class[_prototype][dynamicName] = clsCfg[_dynamic][dynamicName];
			}
		}
		// init parent static and dynamic methods
		for (staticName in clsCfg[_extend]) {
			if (typeof (Class[staticName]) == _undefined && !$class.isPropertyClassKeyword(staticName)) {
				Class[staticName] = clsCfg[_extend][staticName];
			}
		}
		for (dynamicName in clsCfg[_extend][_prototype]) {
			if (typeof (Class[_prototype][dynamicName]) == _undefined && !$class.isPropertyClassKeyword(dynamicName)) {
				Class[_prototype][dynamicName] = clsCfg[_extend][_prototype][dynamicName];
			}
		}
	}
	$class.Constants = {
		ClassFingerPrint: '$classFingerPrint',
		InstanceFingerPrint: '$instanceFingerPrint',
		Class: '$class',
		Instance: '$instance',
		Extends: '$extends',
		Static: '$static',
		Dynamic: '$dynamic',
		Constructor: '$constructor',
		ParentCall: '$base'
	};
	$class.keywords = {};
	for (var key in $class.Constants) {
		$class.keywords[$class.Constants[key]] = true;
	}
	$class.callParentFingerPrints = [
		{}, // dynamic
		{}  // static
	];
	$class.classFingerPrintsCounter = 0;
	$class.instanceFingerPrintsCounter = 0;
	$class.constructorDefault = function () {
		var constants = $class.Constants;
		this[constants.ParentCall](constants.Constructor);
	};
	$class.callParentDynamic = function () {
		var args = [].slice.apply(arguments);
		return $class.callParent.call(this, 0, args);
	}
	$class.callParentStatic = function () {
		var args = [].slice.apply(arguments);
		return $class.callParent.call(this, 1, args);
	}
	$class.callParent = function (fingerPrintsKey, args) {
		var result,
			constants = $class.Constants,
			parentMethodStr = args.shift(),
			baseFingerPrint = "",
			targetParentDefinition,
			targetParentMethodResult;
		baseFingerPrint = fingerPrintsKey === 0 ? this[constants.InstanceFingerPrint] : this[constants.ClassFingerPrint];
		targetParentDefinition = $class.getTargetParentDefinition(fingerPrintsKey, this[constants.Class], baseFingerPrint);
		targetParentMethodResult = $class.getRecursive(
			fingerPrintsKey === 0 ? targetParentDefinition['prototype'] : targetParentDefinition,
			parentMethodStr
		);
		if (!targetParentMethodResult.success) {
			throw new Error("No parent method: '" + parentMethodStr + "'.");
		} else if (typeof (targetParentMethodResult._data) != 'function') {
			throw new Error("'" + parentMethodStr + "' is not function.");
		}
		result = targetParentMethodResult._data.apply(this, args);
		$class.callParentFingerPrints[fingerPrintsKey][baseFingerPrint] = [];
		return result;
	}
	$class.getTargetParentDefinition = function (fingerPrintsKey, currentDefinition, baseFingerPrint) {
		var result = function () { },
			constants = $class.Constants,
			allFingerPrints = $class.callParentFingerPrints[fingerPrintsKey],
			fingerPrints = [],
			currentDefinitionFingerPrintCalled = false,
			currentDefinitionFingerPrint = '';
		if (typeof (allFingerPrints[baseFingerPrint]) == 'undefined') {
			allFingerPrints[baseFingerPrint] = [];
		}
		fingerPrints = allFingerPrints[baseFingerPrint];
		if (fingerPrints.length === 0) {
			fingerPrints.push(currentDefinition[constants.ClassFingerPrint]);
		}
		while (true) {
			currentDefinitionFingerPrintCalled = false;
			currentDefinitionFingerPrint = currentDefinition[constants.ClassFingerPrint];
			for (var i = 0, l = fingerPrints.length; i < l; i += 1) {
				if (currentDefinitionFingerPrint == fingerPrints[i]) {
					currentDefinitionFingerPrintCalled = true;
					break;
				}
			}
			if (currentDefinitionFingerPrintCalled) {
				if (typeof (currentDefinition[constants.Extends]) == 'undefined') {
					break; // no parent available
				} else {
					currentDefinition = currentDefinition[constants.Extends];
				}
			} else {
				result = currentDefinition;
				break;
			}
		}
		fingerPrints.push(result[constants.ClassFingerPrint]);
		return result;
	}
	$class.completeClassFingerPrint = function () {
		var result = $class.Constants.Class + $class.classFingerPrintsCounter;
		$class.classFingerPrintsCounter += 1;
		return result;
	}
	$class.completeInstanceFingerPrint = function () {
		var result = $class.Constants.Instance + $class.instanceFingerPrintsCounter;
		$class.instanceFingerPrintsCounter += 1;
		return result;
	}
	$class.getRecursive = function (object, indexesStr) {
		var result = {
			success: true,
			_data: null
		};
		var testResult = {
			success: true,
			_data: null
		};
		var arr = [object],
			iterator = 0,
			indexes = [];
		if (typeof (indexesStr) == 'string') {
			indexes = indexesStr.split('.');
		}
		testResult = $class.getRecursiveTest(object);
		if (testResult.success) {
			result = $class.getRecursiveIterate(object, indexes);
		} else {
			result.success = false;
		};
		return result;
	};
	$class.getRecursiveTest = function (value) {
		var result = {
			success: true,
			_data: null
		}
		if (typeof (value) == 'undefined' || value === null) {
			result = false;
		} else {
			result._data = value;
		}
		return result;
	}
	$class.getRecursiveIterate = function (object, indexes) {
		var arr = [object],
			iterator = 0
		;
		var result = {
			success: true,
			_data: null
		}
		var test = {
			success: true,
			_data: null
		};
		for (var i = 0, l = indexes.length; i < l; i += 1) {
			arr[iterator + 1] = arr[iterator][indexes[i]];
			test = $class.getRecursiveTest(arr[iterator + 1]);
			if (test.success) {
				result._data = test._data;
			} else {
				result.success = false;
			}
			iterator += 1;
		}
		return result;
	}
	$class.isPropertyClassKeyword = function (propertyName) {
		return ($class.keywords[propertyName]) ? true : false;
	}
	return $class;
})();
