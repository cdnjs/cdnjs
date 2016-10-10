/**
 *-----------------------------------------------------------------------------
 * Petis is a JavaScript Object to (not only) works with DOM.
 *
 * Petis 0.0.1 Z Rev2
 * Licensed under the MIT License
 * Read license.txt or https://opensource.org/licenses/MIT
 *
 * @author   Dali Kewara   <dalikewara@windowslive.com>
 * @return   object        stored as                      Petis() or window.Petis()
 */
(function()
{
	// Using strict for global scope
	'use strict';

	// -------------------------- APPLICATION ---------------------------------
	// The following variable contains Petis main object that will be returned.
	// You can see all of Petis can do through into the object.
	var app = function()
	{
		this.get = {
			/**
			* @param    string|array   target
			* @return   document(object)|array[document(object)]|bool;
			*              array[document(object)] if target is array
			*              bool(false) on unwanted conditions
			*/
			element: function(target)
			{
				return getElements(target);
			},

			/**
			 * @param    string|bool   action
			 * @return   mixed|bool    bool(false) on unwanted conditions
			 */
			uri: function(action = false)
			{
				return getUri(action);
			},
			hostName: function()
			{

			},
			fileName: function()
			{

			},
			fileSize: function()
			{

			},
			fileExtension: function()
			{

			}
		};
		this.set = {
			style: function()
			{

			},
			redirect: function()
			{

			},

			/**
			 * @param     string|document(object)|array[document(object)]   element
			 * @param     object|array(object)                              attribute
			 * @return    mixed|bool   bool(false) on unwanted conditions
			 */
			attribute: function(element, attribute)
			{
				return setAttributes(element, attribute);
			},
			event: function()
			{

			},
		};
		this.create = {
			/**
			 * @param     string|array                element
			 * @param     object|array(object)|null   attribute
			 * @return    mixed|bool                  bool(false) on unwanted conditions
			 */
			element: function(tagname, attribute = null)
			{
				return createElements(tagname, attribute);
			}
		};
		this.add = {
			element: function(element, action, target)
			{
				// app.add.element(elem, 'to', target);
				// app.add.element(elem, 'insideOf', target);
				// app.add.element(elem, 'bottomOf', target);
				// app.add.element(elem, 'topOf', target);

				// return addElements(element, action, target);
			},
			className: function()
			{

			},
			style: function()
			{

			},
		};
		this.remove = {
			element: function()
			{

			},
			attribute: function()
			{

			},
			className: function()
			{

			},
		};

		/**
		 * @param     function        callback
		 * @param     string|object   event
		 * @return    mixed|bool      bool(false) on unwanted conditions
		 */
		this.start = function(callback, event = 'window.onload')
		{
			return start(callback, event);
		};

		// After Petis() has declared, system will delete all global(window) caches
		// which has global access like 'window.Petis' to perform better security.
		__clearCache();
	};
	// -------------------------- APPLICATION ---------------------------------




	// ----------------------------- CORE -------------------------------------
	// The following variable contains global object for all core requirements.
	var globalObj = {
		// This 'globalObj.string' is most used by some functions, especially custom callable
		string: '',
		uri: window.location.href,
		separator: {
			attribute: '&&',
			indexArray: '::'
		},
		regex: {
			attribute: {
				value: {
					complete: /[\(][\(][ a-z0-9\=\;\"\'\@\{\}\[\]\<\>\.\,\/\?\:\(\)\%\#\$\*\!\_\+\-]+[\)][\)]/gi,
					left: /[a-z0-9 ]+[\(][\(]|[\(][\(]/gi,
					right: /[\)][\)][a-z0-9 ]+|[\)][\)]/gi,
				},
				separator: /[ ]+[&][&][ ]+|[&][&]|[ ]+[&][&]|[&][&][ ]+/g,
			},
			space: /\s+/g,
			indexArray: /[:][:][0-9]+|[:][:]/g,
		},
		list: {
			attribute: {
				// The orders are sensitive, very important to take care about it.
				fake: ['id', 'class', 'action', 'method', 'height', 'left', 'top', 'width'],
				real: ['id', 'className', 'actionName', 'methodName', 'clientHeight',
					'clientLeft', 'clientTop', 'clientWidth'],
			},
			uri: {
				actions: ['split', 'check', 'replace'],
			},
		},
	};

	/**
	 * @param    bool    rmListener
	 * @return   mixed
	 */
	var autoload = function(rmListener = false)
	{
		var start = function()
		{
			window.Petis = function()
			{
				return new app();
			};
		};

		if(__isBoolean(rmListener) && rmListener !== false)
		{
			document.removeEventListener('DOMContentLoaded', autoload());
			document.removeEventListener('load', autoload());
			start();
		}
		else
		{
			start();
		}
	};

	/* The bank */
		var __getElement, __setAttribute, __globalCallable, __clearCache, __getObjProp,
			__createElement;
		let __getIndex, __getName, __getRealAttr, __getAttrPrefix, __getAttrValue, __isString,
		    __isNumber, __isBoolean, __isArray, __isObject, __isNull, __isHTMLColl,
			__issetIndex, __issetRealAttr, __checkString, __isset, __getIndexElement;

	/* Branches */
		/* Variable functions */
			/**
			 * @param    string             target
			 * @return   document(object)
			 */
			__getElement = function(target)
			{
				var index = __getIndex(target);
				var name = __getName(target, index);

				return (index === '.') ? document.getElementsByClassName(name) :
					((index === '#') ? document.getElementById(name) :
					((index === '@') ? document.getElementsByName(name) :
					document.getElementsByTagName(name)));
			};

			/**
			 * @param    string|document(object)   element
			 * @param    array                     name
			 * @param    array                     value
			 * @return   mixed
			 */
			__setAttribute = function(element, name, value)
			{
				var getSingle = function(elem, nm, val)
				{
					if(__isArray(nm) && __isArray(val))
					{
						var nmLen = nm.length;
						var a = 0;

						for( ; a < nmLen; a++)
						{
							if(__isObject(val[a]))
							{
								var vObjLen = __getObjProp(val[a], 'length');
								var vObjNm = __getObjProp(val[a], 'key');
								var vObjVal = __getObjProp(val[a], 'value');
								var b = 0;

								for( ; b < vObjLen; b++)
								{
									elem[__getRealAttr(nm[a])][vObjNm[b]] = vObjVal[b];
								}
							}
							else
							{
								elem[__getRealAttr(nm[a])] = val[a];
							}
						}
					}
				};

				__isString(element) ? (element = __getElement(element)) : false;

				if(__isHTMLColl(element))
				{
					var elemLength = element.length;
					var el = 0;

					for( ; el < elemLength; el++)
					{
						getSingle(element[el], name, value);
					}
				}
				else
				{
					getSingle(element, name, value);
				}
			};

			/**
			 * @param     string                      element
			 * @param     object|array(object)|null   attribute
			 * @return    mixed|bool                  bool(false) on unwanted conditions
			 */
			__createElement = function(tagname, attribute)
			{
				if(__isString(tagname))
				{
					var element = document.createElement(tagname);

					setAttributes(element, attribute);

					return element;
				}

				return false;
			};

			/**
			 * @param    object       obj
			 * @param    string       property
			 * @return   mixed|bool   bool(false) on unwanted conditions
			 */
			__getObjProp = function(obj, property)
			{
				if(__isObject(obj))
				{
					switch(property)
					{
						case 'length':
							if(Object.keys)
							{
								return Object.keys(obj).length;
							}
							else
							{
								var key = 0;
								var length = 0;

								for(key in obj)
								{
									length += Number(obj.hasOwnProperty(key));
								}

								return length;
							}
							break;

						case 'key':
							if(Object.keys)
							{
								return Object.keys(obj);
							}
							else
							{
								var key = 0;
								var keys = [];
								var a = 0

								for(key in obj)
								{
									keys[a] = key;

									a++;
								}

								return keys;
							}
							break;

						case 'value':
							var key = 0;
							var values = [];
							var a = 0;

							for(key in obj)
							{
								values[a] = obj.hasOwnProperty(key) ? obj[key] : null;

								a++;
							}

							return values;
							break;

						default:
							return false;
							break;
					}
				}

				return false;
			};

			/**
			 * @return   mixed
			 */
			__clearCache = function()
			{
				delete(window.Petis);
			};
		/* Indexes */
			__getIndex = (string) => string[0];
			__getIndexElement = (array, string) => (__isset(string.split(globalObj.separator.indexArray)[1]) ?
			 	array[Number(string.split(globalObj.separator.indexArray)[1])]: array);
			__getName = (string, index = false) => (!index ? string.replace(globalObj.regex.indexArray, '')
				: string.replace(index, '').replace(globalObj.regex.indexArray, ''));
			__getRealAttr = (index) => (__issetRealAttr(index) ?
				globalObj.list.attribute.real[globalObj.list.attribute.fake.indexOf(index)] : index);
			__getAttrPrefix = (string) => (string.replace(globalObj.regex.attribute.value.complete,
				'').replace(/\n+/, '').trim().split(globalObj.regex.attribute.separator));
			__getAttrValue = (string) => (string.replace(globalObj.regex.attribute.value.left,
				'').replace(globalObj.regex.attribute.value.right, '').replace(/\n+/, '').trim().split(
				globalObj.regex.attribute.separator));
		/* Type checking */
			__isString = (data) => (Object.prototype.toString.call(data) === '[object String]');
			__isNumber = (data) => (Object.prototype.toString.call(data) === '[object Number]');
			__isBoolean = (data) => (Object.prototype.toString.call(data) === '[object Boolean]');
			__isObject = (data) => (((Object.prototype.toString.call(data) === '[object Object]'
				|| typeof data == 'object') && !__isArray(data)) ? true : false);
			__isNull = (data) => (Object.prototype.toString.call(data) === '[object Null]');
			__isHTMLColl = (data) => (Object.prototype.toString.call(data) === '[object HTMLCollection]');
			__isArray = (data) => ((Array.isArray) ? Array.isArray(data) :
				(Object.prototype.toString.call(data) === '[object Array]'));
		/* Content checking */
			__issetIndex = (array, index) => ((array.indexOf(index) < 0) ? false : true);
			__issetRealAttr = (index) => (__issetIndex(globalObj.list.attribute.fake, index) ? true : false);
			__checkString = (string1, string2) => ((string1.indexOf(string2) < 0) ? false : true);
			__isset = (variable) => ((typeof variable != 'undefined') ? true : false);
		/* Custom Callable */
			/**
			 * @param    object   element
			 * @return   mixed
			 */
			__globalCallable = function(obj)
			{
				var call = {};
				call['split'] = function()
				{
					return globalObj.string.split(obj.data);
				};
				call['replace'] = function()
				{
					globalObj.string = globalObj.string.replace(obj.data[0], obj.data[1]);

					return globalObj.string;
				};
				call['check'] = function()
				{
					return (__checkString(globalObj.string, obj.data)) ? true : false;
				};

				return call[obj.action]();
			};

	/* Functions */
		/**
		 * This function used to get single or multiple elements. You must be carefull
		 * when you trying to get elements. Use '#index' to get element by id, '.index'
		 * by class, 'div' by tagname, or '@index-name' by name.
		 *
		 * Please go to Petis's documentation for complete explaination...
		 *
		 * @param    string|array   target
		 * @return   document(object)|array[document(object)]|bool;
		 *              array[document(object)] if target is array
		 *              bool(false) on unwanted conditions
		 */
		function getElements(target)
		{
			if(__isString(target))
			{
				return __getIndexElement(__getElement(target), target);
			}
			else if(__isArray(target))
			{
				var length = target.length;
				var result = [];
				var a = 0;

				for( ; a < length; a++)
				{
					result[a] = __getElement(target[a]);
				}

				return result;
			}

			return false;
		}

		/**
		 * This function used to get uri. You can through manage the uri
		 * (like doing split, replace, check, etc) by using actions that
		 * have come with it(function).
		 *
		 * Please go to Petis's documentation for complete explaination...
		 *
		 * @param    string|bool   action
		 * @return   mixed|bool    bool(false) on unwanted conditions
		 */
		function getUri(action)
		{
			if(__isBoolean(action))
			{
				return globalObj.uri;
			}
			else if(__isObject(action))
			{
				var key, result;

				globalObj.string = globalObj.uri;

				for(key in action)
				{
					result = __issetIndex(globalObj.list.uri.actions, key) ?
						__globalCallable({
							type: 'uri',
							action: key,
							data: action[key]
						}) : false;
				}

				return result;
			}

			return false;
		}

		/**
		 * This function used to set single or multiple attributes from single or multiple elements.
		 * You can set attributes into elements with most used standart index name.
		 * Some attribute index names may cannot be used. Basically, this function is set the attributes
		 * based on default JavaScript rule like element.style.background = 'blue'.
		 * But, we might make it(works with all attribute index names) possible on future.
		 *
		 * Please go to Petis's documentation for complete explaination...
		 *
		 * @param    string|document(object)|array[document(object)]   element
		 * @param    object|array(object)                              attribute
		 * @return   mixed|bool                                        bool(false) on unwanted conditions
		 */
		function setAttributes(element, attribute)
		{
			var name, value;
			var getSingle = function(elem, attr)
			{
				var nm = __getObjProp(attr, 'key');
				var val = __getObjProp(attr, 'value');

				if(__isArray(elem))
				{
					var len = elem.length;
					var a = 0;

					for( ; a < len; a++)
					{
						__setAttribute(elem[a], nm, val);
					}
				}

				__setAttribute(elem, nm, val);
			};

			if(__isObject(attribute) && !__isNull(attribute))
			{
				getSingle(element, attribute);

				return true;
			}
			else if((__isArray(element) && __isArray(attribute)) && element.length === attribute.length)
			{
				var length = element.length;
				var a = 0;

				for( ; a < length; a++)
				{
					getSingle(element[a], attribute[a]);
				}

				return true;
			}

			return false;
		}

		/**
		 * @param     string|array                element
		 * @param     object|array(object)|null   attribute
		 * @return    mixed|bool                  bool(false) on unwanted conditions
		 */
		function createElements(tagname, attribute)
		{
			if(__isString(tagname))
			{
				return __createElement(tagname, attribute);
			}
			else if(__isArray(tagname))
			{
				var length = tagname.length;
				var result = [];
				var a = 0;

				if(__isObject(attribute))
				{
					for( ; a < length; a++)
					{
						result[a] = __createElement(tagname[a], attribute);
					}

					return result;
				}
				else if(__isArray(attribute) && tagname.length === attribute.length)
				{
					for( ; a < length; a++)
					{
						result[a] = __createElement(tagname[a], attribute[a]);
					}

					return result;
				}
			}

			return false;
		}

		/**
		 * This function used to place callback into event loader like window.onload()
		 * or document event listener. By using this, you'll have no worry to insert
		 * your script everywhere inside the HTML.
		 *
		 * Please go to Petis's documentation for complete explaination...
		 *
		 * @param     function        callback
		 * @param     string|object   event
		 * @return    mixed|bool      bool(false) on unwanted conditions
		 */
		function start(callback, event)
		{
			if(event === 'window.onload')
			{
				window.onload = function()
				{
					callback();
				};
			}
			else if(typeof event.eventListener !== 'undefined')
			{
				document.addEventListener(event.eventListener, callback());
			}
			else if(typeof event.readyState !== 'undefined')
			{
				if(document.readyState === event.readyState)
				{
					callback();
				}
			}

			return false;
		}
	// ----------------------------- CORE -------------------------------------




	// Autoloader.
	// Petis will start if browser has complete loaded a page.
	// If you found Petis cannot detects element because you create script at the top
	// of the element(before Petis found it first), you can use Petis().start() function
	// to passing a callback and place your scripts inside of it.
	if(document.readyState === 'complete' || document.readyState !== 'loading')
	{
		window.setTimeout(autoload());
	}
	else
	{
		document.addEventListener('DOMContentLoaded', autoload(true));
		window.addEventListener('load', autoload(true));
	}
}());
