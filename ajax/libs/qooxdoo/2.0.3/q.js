/** qooxdoo v.2.0.3 | (c) 2012 1&1 Internet AG 1und1.de | qooxdoo.org/license */
(function(){
if (!window.qx) window.qx = {};
var qx = window.qx;

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"qx.application":"library.Application","qx.debug":false,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.optimization.variants":true,"qx.revision":"","qx.theme":"qx.theme.Modern","qx.version":"2.0.3"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

qx.$$packageData = {};

/** qooxdoo v.2.0.3 | (c) 2012 1&1 Internet AG 1und1.de | qooxdoo.org/license */
qx.$$packageData['0']={"locales":{},"resources":{},"translations":{"C":{},"en":{}}};

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/* ************************************************************************

#ignore(qx.data)
#ignore(qx.data.IListData)
#ignore(qx.util.OOUtil)

************************************************************************ */
/**
 * Create namespace
 */
if(!window.qx){

  window.qx = {
  };
};
/**
 * Bootstrap qx.Bootstrap to create myself later
 * This is needed for the API browser etc. to let them detect me
 */
qx.Bootstrap = {
  genericToString : function(){

    return "[Class " + this.classname + "]";
  },
  createNamespace : function(name, object){

    var splits = name.split(".");
    var parent = window;
    var part = splits[0];
    for(var i = 0,len = splits.length - 1;i < len;i++,part = splits[i]){

      if(!parent[part]){

        parent = parent[part] = {
        };
      } else {

        parent = parent[part];
      };
    };
    // store object
    parent[part] = object;
    // return last part name (e.g. classname)
    return part;
  },
  setDisplayName : function(fcn, classname, name){

    fcn.displayName = classname + "." + name + "()";
  },
  setDisplayNames : function(functionMap, classname){

    for(var name in functionMap){

      var value = functionMap[name];
      if(value instanceof Function){

        value.displayName = classname + "." + name + "()";
      };
    };
  },
  define : function(name, config){

    if(!config){

      var config = {
        statics : {
        }
      };
    };
    var clazz;
    var proto = null;
    qx.Bootstrap.setDisplayNames(config.statics, name);
    if(config.members || config.extend){

      qx.Bootstrap.setDisplayNames(config.members, name + ".prototype");
      clazz = config.construct || new Function;
      if(config.extend){

        this.extendClass(clazz, clazz, config.extend, name, basename);
      };
      var statics = config.statics || {
      };
      // use getKeys to include the shadowed in IE
      for(var i = 0,keys = qx.Bootstrap.getKeys(statics),l = keys.length;i < l;i++){

        var key = keys[i];
        clazz[key] = statics[key];
      };
      proto = clazz.prototype;
      var members = config.members || {
      };
      // use getKeys to include the shadowed in IE
      for(var i = 0,keys = qx.Bootstrap.getKeys(members),l = keys.length;i < l;i++){

        var key = keys[i];
        proto[key] = members[key];
      };
    } else {

      clazz = config.statics || {
      };
    };
    // Create namespace
    var basename = name ? this.createNamespace(name, clazz) : "";
    // Store names in constructor/object
    clazz.name = clazz.classname = name;
    clazz.basename = basename;
    // Store type info
    clazz.$$type = "Class";
    // Attach toString
    if(!clazz.hasOwnProperty("toString")){

      clazz.toString = this.genericToString;
    };
    // Execute defer section
    if(config.defer){

      config.defer(clazz, proto);
    };
    // Store class reference in global class registry
    qx.Bootstrap.$$registry[name] = clazz;
    return clazz;
  }
};
/**
 * Internal class that is responsible for bootstrapping the qooxdoo
 * framework at load time.
 *
 * Automatically loads JavaScript language fixes and enhancements to
 * bring all engines to at least JavaScript 1.6.
 *
 * Does support:
 *
 * * Construct
 * * Statics
 * * Members
 * * Extend
 * * Defer
 *
 * Does not support:
 *
 * * Super class calls
 * * Mixins, Interfaces, Properties, ...
 */
qx.Bootstrap.define("qx.Bootstrap", {
  statics : {
    /** Timestamp of qooxdoo based application startup */
    LOADSTART : qx.$$start || new Date(),
    /**
     * Mapping for early use of the qx.debug environment setting.
     */
    DEBUG : (function(){

      // make sure to reflect all changes here to the environment class!
      var debug = true;
      if(qx.$$environment && qx.$$environment["qx.debug"] === false){

        debug = false;
      };
      return debug;
    })(),
    /**
     * Minimal accessor API for the environment settings given from the
     * generator.
     *
     * WARNING: This method only should be used if the
     * {@link qx.core.Environment} class is not loaded!
     *
     * @param key {String} The key to get the value from.
     * @return {var} The value of the setting or <code>undefined</code>.
     */
    getEnvironmentSetting : function(key){

      if(qx.$$environment){

        return qx.$$environment[key];
      };
    },
    /**
     * Minimal mutator for the environment settings given from the generator.
     * It checks for the existance of the environment settings and sets the
     * key if its not given from the generator. If a setting is available from
     * the generator, the setting will be ignored.
     *
     * WARNING: This method only should be used if the
     * {@link qx.core.Environment} class is not loaded!
     *
     * @param key {String} The key of the setting.
     * @param value {var} The value for the setting.
     */
    setEnvironmentSetting : function(key, value){

      if(!qx.$$environment){

        qx.$$environment = {
        };
      };
      if(qx.$$environment[key] === undefined){

        qx.$$environment[key] = value;
      };
    },
    /**
     * Creates a namespace and assigns the given object to it.
     *
     * @internal
     * @param name {String} The complete namespace to create. Typically, the last part is the class name itself
     * @param object {Object} The object to attach to the namespace
     * @return {Object} last part of the namespace (typically the class name)
     * @throws an exception when the given object already exists.
     */
    createNamespace : qx.Bootstrap.createNamespace,
    /**
     * Define a new class using the qooxdoo class system.
     * Lightweight version of {@link qx.Class#define} only used during bootstrap phase.
     *
     * @internal
     * @signature function(name, config)
     * @param name {String?} Name of the class. If null, the class will not be
     *   attached to a namespace.
     * @param config {Map ? null} Class definition structure.
     * @return {Class} The defined class
     */
    define : qx.Bootstrap.define,
    /**
     * Sets the display name of the given function
     *
     * @signature function(fcn, classname, name)
     * @param fcn {Function} the function to set the display name for
     * @param classname {String} the name of the class the function is defined in
     * @param name {String} the function name
     */
    setDisplayName : qx.Bootstrap.setDisplayName,
    /**
     * Set the names of all functions defined in the given map
     *
     * @signature function(functionMap, classname)
     * @param functionMap {Object} a map with functions as values
     * @param classname {String} the name of the class, the functions are
     *   defined in
     */
    setDisplayNames : qx.Bootstrap.setDisplayNames,
    /**
     * This method will be attached to all classes to return
     * a nice identifier for them.
     *
     * @internal
     * @signature function()
     * @return {String} The class identifier
     */
    genericToString : qx.Bootstrap.genericToString,
    /**
     * Inherit a clazz from a super class.
     *
     * This function differentiates between class and constructor because the
     * constructor written by the user might be wrapped and the <code>base</code>
     * property has to be attached to the constructor, while the <code>superclass</code>
     * property has to be attached to the wrapped constructor.
     *
     * @param clazz {Function} The class's wrapped constructor
     * @param construct {Function} The unwrapped constructor
     * @param superClass {Function} The super class
     * @param name {Function} fully qualified class name
     * @param basename {Function} the base name
     */
    extendClass : function(clazz, construct, superClass, name, basename){

      var superproto = superClass.prototype;
      // Use helper function/class to save the unnecessary constructor call while
      // setting up inheritance.
      var helper = new Function;
      helper.prototype = superproto;
      var proto = new helper;
      // Apply prototype to new helper instance
      clazz.prototype = proto;
      // Store names in prototype
      proto.name = proto.classname = name;
      proto.basename = basename;
      /*
        - Store base constructor to constructor-
        - Store reference to extend class
      */
      construct.base = clazz.superclass = superClass;
      /*
        - Store statics/constructor onto constructor/prototype
        - Store correct constructor
        - Store statics onto prototype
      */
      construct.self = clazz.constructor = proto.constructor = clazz;
    },
    /**
     * Find a class by its name
     *
     * @param name {String} class name to resolve
     * @return {Class} the class
     */
    getByName : function(name){

      return qx.Bootstrap.$$registry[name];
    },
    /** {Map} Stores all defined classes */
    $$registry : {
    },
    /*
    ---------------------------------------------------------------------------
      OBJECT UTILITY FUNCTIONS
    ---------------------------------------------------------------------------
    */
    /**
     * Get the number of objects in the map
     *
     * @signature function(map)
     * @param map {Object} the map
     * @return {Integer} number of objects in the map
     */
    objectGetLength : function(map){

      var length = 0;
      for(var key in map){

        length++;
      };
      return length;
    },
    /**
     * Inserts all keys of the source object into the
     * target objects. Attention: The target map gets modified.
     *
     * @param target {Object} target object
     * @param source {Object} object to be merged
     * @param overwrite {Boolean ? true} If enabled existing keys will be overwritten
     * @return {Object} Target with merged values from the source object
     */
    objectMergeWith : function(target, source, overwrite){

      if(overwrite === undefined){

        overwrite = true;
      };
      for(var key in source){

        if(overwrite || target[key] === undefined){

          target[key] = source[key];
        };
      };
      return target;
    },
    /**
     * IE does not return "shadowed" keys even if they are defined directly
     * in the object.
     *
     * @internal
     */
    __shadowedKeys : ["isPrototypeOf", "hasOwnProperty", "toLocaleString", "toString", "valueOf", "constructor"],
    /**
     * Get the keys of a map as array as returned by a "for ... in" statement.
     *
     * @signature function(map)
     * @param map {Object} the map
     * @return {Array} array of the keys of the map
     */
    getKeys : ({
      "ES5" : Object.keys,
      "BROKEN_IE" : function(map){

        var arr = [];
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        for(var key in map){

          if(hasOwnProperty.call(map, key)){

            arr.push(key);
          };
        };
        // IE does not return "shadowed" keys even if they are defined directly
        // in the object. This is incompatible with the ECMA standard!!
        // This is why this checks are needed.
        var shadowedKeys = qx.Bootstrap.__shadowedKeys;
        for(var i = 0,a = shadowedKeys,l = a.length;i < l;i++){

          if(hasOwnProperty.call(map, a[i])){

            arr.push(a[i]);
          };
        };
        return arr;
      },
      "default" : function(map){

        var arr = [];
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        for(var key in map){

          if(hasOwnProperty.call(map, key)){

            arr.push(key);
          };
        };
        return arr;
      }
    })[typeof (Object.keys) == "function" ? "ES5" : (function(){

      for(var key in {
        toString : 1
      }){

        return key;
      };
    })() !== "toString" ? "BROKEN_IE" : "default"],
    /**
     * Get the keys of a map as string
     *
     * @param map {Object} the map
     * @return {String} String of the keys of the map
     *         The keys are separated by ", "
     */
    getKeysAsString : function(map){

      var keys = qx.Bootstrap.getKeys(map);
      if(keys.length == 0){

        return "";
      };
      return '"' + keys.join('\", "') + '"';
    },
    /**
     * Mapping from JavaScript string representation of objects to names
     * @internal
     */
    __classToTypeMap : {
      "[object String]" : "String",
      "[object Array]" : "Array",
      "[object Object]" : "Object",
      "[object RegExp]" : "RegExp",
      "[object Number]" : "Number",
      "[object Boolean]" : "Boolean",
      "[object Date]" : "Date",
      "[object Function]" : "Function",
      "[object Error]" : "Error"
    },
    /*
    ---------------------------------------------------------------------------
      FUNCTION UTILITY FUNCTIONS
    ---------------------------------------------------------------------------
    */
    /**
     * Returns a function whose "this" is altered.
     *
     * *Syntax*
     *
     * <pre class='javascript'>qx.Bootstrap.bind(myFunction, [self, [varargs...]]);</pre>
     *
     * *Example*
     *
     * <pre class='javascript'>
     * function myFunction()
     * {
     *   this.setStyle('color', 'red');
     *   // note that 'this' here refers to myFunction, not an element
     *   // we'll need to bind this function to the element we want to alter
     * };
     *
     * var myBoundFunction = qx.Bootstrap.bind(myFunction, myElement);
     * myBoundFunction(); // this will make the element myElement red.
     * </pre>
     *
     * @param func {Function} Original function to wrap
     * @param self {Object ? null} The object that the "this" of the function will refer to.
     * @param varargs {arguments ? null} The arguments to pass to the function.
     * @return {Function} The bound function.
     */
    bind : function(func, self, varargs){

      var fixedArgs = Array.prototype.slice.call(arguments, 2, arguments.length);
      return function(){

        var args = Array.prototype.slice.call(arguments, 0, arguments.length);
        return func.apply(self, fixedArgs.concat(args));
      };
    },
    /*
    ---------------------------------------------------------------------------
      STRING UTILITY FUNCTIONS
    ---------------------------------------------------------------------------
    */
    /**
     * Convert the first character of the string to upper case.
     *
     * @param str {String} the string
     * @return {String} the string with an upper case first character
     */
    firstUp : function(str){

      return str.charAt(0).toUpperCase() + str.substr(1);
    },
    /**
     * Convert the first character of the string to lower case.
     *
     * @param str {String} the string
     * @return {String} the string with a lower case first character
     */
    firstLow : function(str){

      return str.charAt(0).toLowerCase() + str.substr(1);
    },
    /*
    ---------------------------------------------------------------------------
      TYPE UTILITY FUNCTIONS
    ---------------------------------------------------------------------------
    */
    /**
     * Get the internal class of the value. See
     * http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
     * for details.
     *
     * @param value {var} value to get the class for
     * @return {String} the internal class of the value
     */
    getClass : function(value){

      var classString = Object.prototype.toString.call(value);
      return (qx.Bootstrap.__classToTypeMap[classString] || classString.slice(8, -1));
    },
    /**
     * Whether the value is a string.
     *
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is a string.
     */
    isString : function(value){

      // Added "value !== null" because IE throws an exception "Object expected"
      // by executing "value instanceof String" if value is a DOM element that
      // doesn't exist. It seems that there is an internal different between a
      // JavaScript null and a null returned from calling DOM.
      // e.q. by document.getElementById("ReturnedNull").
      return (value !== null && (typeof value === "string" || qx.Bootstrap.getClass(value) == "String" || value instanceof String || (!!value && !!value.$$isString)));
    },
    /**
     * Whether the value is an array.
     *
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is an array.
     */
    isArray : function(value){

      // Added "value !== null" because IE throws an exception "Object expected"
      // by executing "value instanceof Array" if value is a DOM element that
      // doesn't exist. It seems that there is an internal different between a
      // JavaScript null and a null returned from calling DOM.
      // e.q. by document.getElementById("ReturnedNull").
      return (value !== null && (value instanceof Array || (value && qx.data && qx.data.IListData && qx.util.OOUtil.hasInterface(value.constructor, qx.data.IListData)) || qx.Bootstrap.getClass(value) == "Array" || (!!value && !!value.$$isArray)));
    },
    /**
     * Whether the value is an object. Note that built-in types like Window are
     * not reported to be objects.
     *
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is an object.
     */
    isObject : function(value){

      return (value !== undefined && value !== null && qx.Bootstrap.getClass(value) == "Object");
    },
    /**
     * Whether the value is a function.
     *
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is a function.
     */
    isFunction : function(value){

      return qx.Bootstrap.getClass(value) == "Function";
    },
    /*
    ---------------------------------------------------------------------------
      LOGGING UTILITY FUNCTIONS
    ---------------------------------------------------------------------------
    */
    $$logs : [],
    /**
     * Sending a message at level "debug" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     * @return {void}
     */
    debug : function(object, message){

      qx.Bootstrap.$$logs.push(["debug", arguments]);
    },
    /**
     * Sending a message at level "info" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     * @return {void}
     */
    info : function(object, message){

      qx.Bootstrap.$$logs.push(["info", arguments]);
    },
    /**
     * Sending a message at level "warn" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     * @return {void}
     */
    warn : function(object, message){

      qx.Bootstrap.$$logs.push(["warn", arguments]);
    },
    /**
     * Sending a message at level "error" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     * @return {void}
     */
    error : function(object, message){

      qx.Bootstrap.$$logs.push(["error", arguments]);
    },
    /**
     * Prints the current stack trace at level "info"
     *
     * @param object {Object} Contextual object (either instance or static class)
     */
    trace : function(object){
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * The intention of this class is to add features to native JavaScript
 * objects so that all browsers operate on a common JavaScript language level
 * (particularly JavaScript 1.6).
 *
 * The methods defined in this class contain implementations of methods, which
 * are not supported by all browsers. If a method is supported it points to
 * the native implementation, otherwise it contains an emulation function.
 *
 * For reference:
 *
 * * http://www.ecma-international.org/publications/standards/Ecma-262.htm
 * * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference
 * * http://developer.mozilla.org/en/docs/New_in_JavaScript_1.6
 *
 * The following methods are added if they are not supported natively:
 *
 * * Error.toString()
 * * Array.indexOf()
 * * Array.lastIndexOf()
 * * Array.forEach()
 * * Array.filter()
 * * Array.map()
 * * Array.some()
 * * Array.every()
 * * String.quote()
 */
qx.Bootstrap.define("qx.lang.Core", {
  statics : {
    /**
     * Some browsers (e.g. Internet Explorer) do not support to stringify
     * error objects like other browsers usually do. This feature is added to
     * those browsers.
     *
     * @signature function()
     * @return {String} Error message
     */
    errorToString : {
      "native" : Error.prototype.toString,
      "emulated" : function(){

        return this.message;
      }
    }[(!Error.prototype.toString || Error.prototype.toString() == "[object Error]") ? "emulated" : "native"],
    /**
     * Returns the first index at which a given element can be found in the array,
     * or <code>-1</code> if it is not present. It compares <code>searchElement</code> to elements of the Array
     * using strict equality (the same method used by the <code>===</code>, or
     * triple-equals, operator).
     *
     * Natively supported in Gecko since version 1.8.
     * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:indexOf
     *
     * @signature function(searchElement, fromIndex)
     * @param searchElement {var} Element to locate in the array.
     * @param fromIndex {Integer} The index at which to begin the search. Defaults to 0, i.e. the whole
     *         array will be searched. If the index is greater than or equal to the length of the array,
     *         <code>-1</code> is returned, i.e. the array will not be searched. If negative, it is taken as the
     *         offset from the end of the array. Note that even when the index is negative, the array is still
     *         searched from front to back. If the calculated index is less than 0, the whole array will be searched.
     * @return {Integer} Returns the first index at which a given element can
     *    be found in the array, or <code>-1</code> if it is not present.
     */
    arrayIndexOf : {
      "native" : Array.prototype.indexOf,
      "emulated" : function(searchElement, fromIndex){

        if(fromIndex == null){

          fromIndex = 0;
        } else if(fromIndex < 0){

          fromIndex = Math.max(0, this.length + fromIndex);
        };
        for(var i = fromIndex;i < this.length;i++){

          if(this[i] === searchElement){

            return i;
          };
        };
        return -1;
      }
    }[Array.prototype.indexOf ? "native" : "emulated"],
    /**
     * Returns the last index at which a given element can be found in the array, or <code>-1</code>
     * if it is not present. The array is searched backwards, starting at <code>fromIndex</code>.
     * It compares <code>searchElement</code> to elements of the Array using strict equality
     * (the same method used by the <code>===</code>, or triple-equals, operator).
     *
     * Natively supported in Gecko since version 1.8.
     * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:lastIndexOf
     *
     * @signature function(searchElement, fromIndex)
     * @param searchElement {var} Element to locate in the array.
     * @param fromIndex {Integer} The index at which to start searching backwards.
     *         Defaults to the array's length, i.e. the whole array will be searched. If
     *         the index is greater than or equal to the length of the array, the whole array
     *         will be searched. If negative, it is taken as the offset from the end of the
     *         array. Note that even when the index is negative, the array is still searched
     *         from back to front. If the calculated index is less than 0, -1 is returned,
     *         i.e. the array will not be searched.
     * @return {Integer} Returns the last index at which a given element can be
     *    found in the array, or <code>-1</code> if it is not present.
     */
    arrayLastIndexOf : {
      "native" : Array.prototype.lastIndexOf,
      "emulated" : function(searchElement, fromIndex){

        if(fromIndex == null){

          fromIndex = this.length - 1;
        } else if(fromIndex < 0){

          fromIndex = Math.max(0, this.length + fromIndex);
        };
        for(var i = fromIndex;i >= 0;i--){

          if(this[i] === searchElement){

            return i;
          };
        };
        return -1;
      }
    }[Array.prototype.lastIndexOf ? "native" : "emulated"],
    /**
     * Executes a provided function once per array element.
     *
     * <code>forEach</code> executes the provided function (<code>callback</code>) once for each
     * element present in the array.  <code>callback</code> is invoked only for indexes of the array
     * which have assigned values; it is not invoked for indexes which have been deleted or which
     * have never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index
     * of the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>forEach</code>, it will be used
     * as the <code>this</code> for each invocation of the <code>callback</code>.  If it is not
     * provided, or is <code>null</code>, the global object associated with <code>callback</code>
     * is used instead.
     *
     * <code>forEach</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>forEach</code> is set before the first invocation of
     * <code>callback</code>.  Elements which are appended to the array after the call to
     * <code>forEach</code> begins will not be visited by <code>callback</code>. If existing elements
     * of the array are changed, or deleted, their value as passed to <code>callback</code> will be
     * the value at the time <code>forEach</code> visits them; elements that are deleted are not visited.
     *
     * Natively supported in Gecko since version 1.8.
     * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:forEach
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to execute for each element.
     * @param obj {Object} Object to use as this when executing callback.
     * @return {void}
     */
    arrayForEach : {
      "native" : Array.prototype.forEach,
      "emulated" : function(callback, obj){

        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            callback.call(obj || window, value, i, this);
          };
        };
      }
    }[Array.prototype.forEach ? "native" : "emulated"],
    /**
     * Creates a new array with all elements that pass the test implemented by the provided
     * function.
     *
     * <code>filter</code> calls a provided <code>callback</code> function once for each
     * element in an array, and constructs a new array of all the values for which
     * <code>callback</code> returns a true value.  <code>callback</code> is invoked only
     * for indexes of the array which have assigned values; it is not invoked for indexes
     * which have been deleted or which have never been assigned values.  Array elements which
     * do not pass the <code>callback</code> test are simply skipped, and are not included
     * in the new array.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the
     * index of the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>filter</code>, it will
     * be used as the <code>this</code> for each invocation of the <code>callback</code>.
     * If it is not provided, or is <code>null</code>, the global object associated with
     * <code>callback</code> is used instead.
     *
     * <code>filter</code> does not mutate the array on which it is called. The range of
     * elements processed by <code>filter</code> is set before the first invocation of
     * <code>callback</code>. Elements which are appended to the array after the call to
     * <code>filter</code> begins will not be visited by <code>callback</code>. If existing
     * elements of the array are changed, or deleted, their value as passed to <code>callback</code>
     * will be the value at the time <code>filter</code> visits them; elements that are deleted
     * are not visited.
     *
     * Natively supported in Gecko since version 1.8.
     * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:filter
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test each element of the array.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Array} Returns a new array with all elements that pass the test
     *    implemented by the provided function.
     */
    arrayFilter : {
      "native" : Array.prototype.filter,
      "emulated" : function(callback, obj){

        var res = [];
        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            if(callback.call(obj || window, value, i, this)){

              res.push(this[i]);
            };
          };
        };
        return res;
      }
    }[Array.prototype.filter ? "native" : "emulated"],
    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     *
     * <code>map</code> calls a provided <code>callback</code> function once for each element in an array,
     * in order, and constructs a new array from the results.  <code>callback</code> is invoked only for
     * indexes of the array which have assigned values; it is not invoked for indexes which have been
     * deleted or which have never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of the
     * element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>map</code>, it will be used as the
     * <code>this</code> for each invocation of the <code>callback</code>. If it is not provided, or is
     * <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>map</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>map</code> is set before the first invocation of
     * <code>callback</code>. Elements which are appended to the array after the call to <code>map</code>
     * begins will not be visited by <code>callback</code>.  If existing elements of the array are changed,
     * or deleted, their value as passed to <code>callback</code> will be the value at the time
     * <code>map</code> visits them; elements that are deleted are not visited.
     *
     * Natively supported in Gecko since version 1.8.
     * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:map
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function produce an element of the new Array from an element of the current one.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Array} Returns a new array with the results of calling a provided
     *    function on every element in this array.
     */
    arrayMap : {
      "native" : Array.prototype.map,
      "emulated" : function(callback, obj){

        var res = [];
        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            res[i] = callback.call(obj || window, value, i, this);
          };
        };
        return res;
      }
    }[Array.prototype.map ? "native" : "emulated"],
    /**
     * Tests whether some element in the array passes the test implemented by the provided function.
     *
     * <code>some</code> executes the <code>callback</code> function once for each element present in
     * the array until it finds one where <code>callback</code> returns a true value. If such an element
     * is found, <code>some</code> immediately returns <code>true</code>. Otherwise, <code>some</code>
     * returns <code>false</code>. <code>callback</code> is invoked only for indexes of the array which
     * have assigned values; it is not invoked for indexes which have been deleted or which have never
     * been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of the
     * element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>some</code>, it will be used as the
     * <code>this</code> for each invocation of the <code>callback</code>. If it is not provided, or is
     * <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>some</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>some</code> is set before the first invocation of
     * <code>callback</code>.  Elements that are appended to the array after the call to <code>some</code>
     * begins will not be visited by <code>callback</code>. If an existing, unvisited element of the array
     * is changed by <code>callback</code>, its value passed to the visiting <code>callback</code> will
     * be the value at the time that <code>some</code> visits that element's index; elements that are
     * deleted are not visited.
     *
     * Natively supported in Gecko since version 1.8.
     * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:some
     *
     * @param callback {Function} Function to test for each element.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Boolean} Returns <code>true</code> whether some element in the
     *    array passes the test implemented by the provided function,
     *    <code>false</code> otherwise.
     */
    arraySome : {
      "native" : Array.prototype.some,
      "emulated" : function(callback, obj){

        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            if(callback.call(obj || window, value, i, this)){

              return true;
            };
          };
        };
        return false;
      }
    }[Array.prototype.some ? "native" : "emulated"],
    /**
     * Tests whether all elements in the array pass the test implemented by the provided function.
     *
     * <code>every</code> executes the provided <code>callback</code> function once for each element
     * present in the array until it finds one where <code>callback</code> returns a false value. If
     * such an element is found, the <code>every</code> method immediately returns <code>false</code>.
     * Otherwise, if <code>callback</code> returned a true value for all elements, <code>every</code>
     * will return <code>true</code>.  <code>callback</code> is invoked only for indexes of the array
     * which have assigned values; it is not invoked for indexes which have been deleted or which have
     * never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of
     * the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>every</code>, it will be used as
     * the <code>this</code> for each invocation of the <code>callback</code>. If it is not provided,
     * or is <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>every</code> does not mutate the array on which it is called. The range of elements processed
     * by <code>every</code> is set before the first invocation of <code>callback</code>. Elements which
     * are appended to the array after the call to <code>every</code> begins will not be visited by
     * <code>callback</code>.  If existing elements of the array are changed, their value as passed
     * to <code>callback</code> will be the value at the time <code>every</code> visits them; elements
     * that are deleted are not visited.
     *
     * Natively supported in Gecko since version 1.8.
     * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:every
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test for each element.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Boolean} Returns <code>false</code> whether all elements in the
     *    array pass the test implemented by the provided function,
     *    <code>false</code> otherwise.
     */
    arrayEvery : {
      "native" : Array.prototype.every,
      "emulated" : function(callback, obj){

        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            if(!callback.call(obj || window, value, i, this)){

              return false;
            };
          };
        };
        return true;
      }
    }[Array.prototype.every ? "native" : "emulated"],
    /**
     * Surrounds the string with double quotes and escapes all double quotes
     * and backslashes within the string.
     *
     * Note: Not part of ECMAScript Language Specification ECMA-262
     *       3rd edition (December 1999), but implemented by Gecko:
     *       http://lxr.mozilla.org/seamonkey/source/js/src/jsstr.c
     *
     * @signature function()
     * @return {String} Returns a string with double quotes and escapes all
     *    double quotes and backslashes within the string.
     */
    stringQuote : {
      "native" : String.prototype.quote,
      "emulated" : function(){

        return '"' + this.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"") + '"';
      }
    }[String.prototype.quote ? "native" : "emulated"]
  }
});
/*
---------------------------------------------------------------------------
  FEATURE EXTENSION OF NATIVE ERROR OBJECT
---------------------------------------------------------------------------
*/
if(!Error.prototype.toString || Error.prototype.toString() == "[object Error]"){

  Error.prototype.toString = qx.lang.Core.errorToString;
};
/*
---------------------------------------------------------------------------
  FEATURE EXTENSION OF NATIVE ARRAY OBJECT
---------------------------------------------------------------------------
*/
if(!Array.prototype.indexOf){

  Array.prototype.indexOf = qx.lang.Core.arrayIndexOf;
};
if(!Array.prototype.lastIndexOf){

  Array.prototype.lastIndexOf = qx.lang.Core.arrayLastIndexOf;
};
if(!Array.prototype.forEach){

  Array.prototype.forEach = qx.lang.Core.arrayForEach;
};
if(!Array.prototype.filter){

  Array.prototype.filter = qx.lang.Core.arrayFilter;
};
if(!Array.prototype.map){

  Array.prototype.map = qx.lang.Core.arrayMap;
};
if(!Array.prototype.some){

  Array.prototype.some = qx.lang.Core.arraySome;
};
if(!Array.prototype.every){

  Array.prototype.every = qx.lang.Core.arrayEvery;
};
/*
---------------------------------------------------------------------------
  FEATURE EXTENSION OF NATIVE STRING OBJECT
---------------------------------------------------------------------------
*/
if(!String.prototype.quote){

  String.prototype.quote = qx.lang.Core.stringQuote;
};

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2005-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * This class is the single point to access all settings that may be different
 * in different environments. This contains e.g. the browser name, engine
 * version but also qooxdoo or application specific settings.
 *
 * Its public API can be found in its four main methods. One pair of methods
 * is used to check the synchronous values of the environment. The other pair
 * of methods is used for asynchronous checks.
 *
 * The most often used method should be {@link #get}, which returns the
 * current value for a given environment check.
 *
 * All qooxdoo settings can be changed via the generator's config. See the manual
 * for more details about the environment key in the config. As you can see
 * from the methods API, there is no way to override an existing key. So if you
 * need to change a qooxdoo setting, you have to use the generator to do so.
 *
 * The following table shows the available checks. If you are
 * interested in more details, check the reference to the implementation of
 * each check. Please do not use those check implementations directly, as the
 * Environment class comes with a smart caching feature.
 *
 * <table border="0" cellspacing="10">
 *   <tbody>
 *     <tr>
 *       <td colspan="4"><h2>Synchronous checks</h2>
 *       </td>
 *     </tr>
 *     <tr>
 *       <th><h3>Key</h3></th>
 *       <th><h3>Type</h3></th>
 *       <th><h3>Example</h3></th>
 *       <th><h3>Details</h3></th>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>browser</b></td>
 *     </tr>
 *     <tr>
 *       <td>browser.documentmode</td><td><i>Integer</i></td><td><code>0</code></td>
 *       <td>{@link qx.bom.client.Browser#getDocumentMode}</td>
 *     </tr>
 *     <tr>
 *       <td>browser.name</td><td><i>String</i></td><td><code> chrome </code></td>
 *       <td>{@link qx.bom.client.Browser#getName}</td>
 *     </tr>
 *     <tr>
 *       <td>browser.quirksmode</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Browser#getQuirksMode}</td>
 *     </tr>
 *     <tr>
 *       <td>browser.version</td><td><i>String</i></td><td><code>11.0</code></td>
 *       <td>{@link qx.bom.client.Browser#getVersion}</td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>runtime</b></td>
 *     </tr>
 *     <tr>
 *       <td>runtime.name</td><td><i> String </i></td><td><code> node.js </code></td>
 *       <td>{@link qx.bom.client.Runtime#getName}</td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>css</b></td>
 *     </tr>
 *     <tr>
 *       <td>css.borderradius</td><td><i>String</i> or <i>null</i></td><td><code>borderRadius</code></td>
 *       <td>{@link qx.bom.client.Css#getBorderRadius}</td>
 *     </tr>
 *     <tr>
 *       <td>css.borderimage</td><td><i>String</i> or <i>null</i></td><td><code>WebkitBorderImage</code></td>
 *       <td>{@link qx.bom.client.Css#getBorderImage}</td>
 *     </tr>
 *     <tr>
 *       <td>css.borderimage.standardsyntax</td><td><i>Boolean</i> or <i>null</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getBorderImageSyntax}</td>
 *     </tr>
 *     <tr>
 *       <td>css.boxmodel</td><td><i>String</i></td><td><code>content</code></td>
 *       <td>{@link qx.bom.client.Css#getBoxModel}</td>
 *     </tr>
 *     <tr>
 *       <td>css.boxshadow</td><td><i>String</i> or <i>null</i></td><td><code>boxShadow</code></td>
 *       <td>{@link qx.bom.client.Css#getBoxShadow}</td>
 *     </tr>
 *     <tr>
 *       <td>css.gradient.linear</td><td><i>String</i> or <i>null</i></td><td><code>-moz-linear-gradient</code></td>
 *       <td>{@link qx.bom.client.Css#getLinearGradient}</td>
 *     </tr>
 *     <tr>
 *       <td>css.gradient.filter</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getFilterGradient}</td>
 *     </tr>
 *     <tr>
 *       <td>css.gradient.radial</td><td><i>String</i> or <i>null</i></td><td><code>-moz-radial-gradient</code></td>
 *       <td>{@link qx.bom.client.Css#getRadialGradient}</td>
 *     </tr>
 *     <tr>
 *       <td>css.gradient.legacywebkit</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Css#getLegacyWebkitGradient}</td>
 *     </tr>
 *     <tr>
 *       <td>css.placeholder</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getPlaceholder}</td>
 *     </tr>
 *     <tr>
 *       <td>css.textoverflow</td><td><i>String</i> or <i>null</i></td><td><code>textOverflow</code></td>
 *       <td>{@link qx.bom.client.Css#getTextOverflow}</td>
 *     </tr>
 *     <tr>
 *       <td>css.rgba</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getRgba}</td>
 *     </tr>
 *     <tr>
 *       <td>css.usermodify</td><td><i>String</i> or <i>null</i></td><td><code>WebkitUserModify</code></td>
 *       <td>{@link qx.bom.client.Css#getUserModify}</td>
 *     </tr>
 *     <tr>
 *       <td>css.appearance</td><td><i>String</i> or <i>null</i></td><td><code>WebkitAppearance</code></td>
 *       <td>{@link qx.bom.client.Css#getAppearance}</td>
 *     </tr>
 *     <tr>
 *       <td>css.float</td><td><i>String</i> or <i>null</i></td><td><code>cssFloat</code></td>
 *       <td>{@link qx.bom.client.Css#getFloat}</td>
 *     </tr>
 *     <tr>
 *       <td>css.userselect</td><td><i>String</i> or <i>null</i></td><td><code>WebkitUserSelect</code></td>
 *       <td>{@link qx.bom.client.Css#getUserSelect}</td>
 *     </tr>
 *     <tr>
 *       <td>css.userselect.none</td><td><i>String</i> or <i>null</i></td><td><code>-moz-none</code></td>
 *       <td>{@link qx.bom.client.Css#getUserSelectNone}</td>
 *     </tr>
 *     <tr>
 *       <td>css.boxsizing</td><td><i>String</i> or <i>null</i></td><td><code>boxSizing</code></td>
 *       <td>{@link qx.bom.client.Css#getBoxSizing}</td>
 *     </tr>
 *     <tr>
 *       <td>css.animation</td><td><i>Object</i> or <i>null</i></td><td><code>{end-event: "webkitAnimationEnd", keyframes: "@-webkit-keyframes", play-state: null, name: "WebkitAnimation"}</code></td>
 *       <td>{@link qx.bom.client.CssAnimation#getSupport}</td>
 *     </tr>
 *     <tr>
 *       <td>css.transform</td><td><i>Object</i> or <i>null</i></td><td><code>{3d: true, origin: "WebkitTransformOrigin", name: "WebkitTransform", style: "WebkitTransformStyle", perspective: "WebkitPerspective", perspective-origin: "WebkitPerspectiveOrigin", backface-visibility: "WebkitBackfaceVisibility"}</code></td>
 *       <td>{@link qx.bom.client.CssTransform#getSupport}</td>
 *     </tr>
 *     <tr>
 *       <td>css.transform.3d</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.CssTransform#get3D}</td>
 *     </tr>
 *     <tr>
 *       <td>css.inlineblock</td><td><i>String</i> or <i>null</i></td><td><code>inline-block</code></td>
 *       <td>{@link qx.bom.client.Css#getInlineBlock}</td>
 *     </tr>
 *     <tr>
 *       <td>css.opacity</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getOpacity}</td>
 *     </tr>
 *     <tr>
 *       <td>css.overflowxy</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getOverflowXY}</td>
 *     </tr>
 *     <tr>
 *       <td>css.textShadow</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getTextShadow}</td>
 *     </tr>
 *     <tr>
 *       <td>css.textShadow.filter</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getFilterTextShadow}</td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>device</b></td>
 *     </tr>
 *     <tr>
 *       <td>device.name</td><td><i>String</i></td><td><code>pc</code></td>
 *       <td>{@link qx.bom.client.Device#getName}</td>
 *     </tr>
 *     <tr>
 *       <td>device.type</td><td><i>String</i></td><td><code>mobile</code></td>
 *       <td>{@link qx.bom.client.Device#getType}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>ecmascript</b></td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.stacktrace</td><td><i>String</i> or <i>null</i></td><td><code>stack</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getStackTrace}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>engine</b></td>
 *     </tr>
 *     <tr>
 *       <td>engine.name</td><td><i>String</i></td><td><code>webkit</code></td>
 *       <td>{@link qx.bom.client.Engine#getName}</td>
 *     </tr>
 *     <tr>
 *       <td>engine.version</td><td><i>String</i></td><td><code>534.24</code></td>
 *       <td>{@link qx.bom.client.Engine#getVersion}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>event</b></td>
 *     </tr>
 *     <tr>
 *       <td>event.pointer</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Event#getPointer}</td>
 *     </tr>
 *     <tr>
 *       <td>event.touch</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Event#getTouch}</td>
 *     </tr>
 *     <tr>
 *       <td>event.help</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Event#getHelp}</td>
 *     </tr>
 *     <tr>
 *       <td>event.hashchange</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Event#getHashChange}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>html</b></td>
 *     </tr>
 *     <tr>
 *       <td>html.audio</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getAudio}</td>
 *     </tr>
 *     <tr>
 *       <td>html.audio.mp3</td><td><i>String</i></td><td><code>""</code></td>
 *       <td>{@link qx.bom.client.Html#getAudioMp3}</td>
 *     </tr>
 *     <tr>
 *       <td>html.audio.ogg</td><td><i>String</i></td><td><code>"maybe"</code></td>
 *       <td>{@link qx.bom.client.Html#getAudioOgg}</td>
 *     </tr>
 *     <tr>
 *       <td>html.audio.wav</td><td><i>String</i></td><td><code>"probably"</code></td>
 *       <td>{@link qx.bom.client.Html#getAudioWav}</td>
 *     </tr>
 *     <tr>
 *       <td>html.audio.au</td><td><i>String</i></td><td><code>"maybe"</code></td>
 *       <td>{@link qx.bom.client.Html#getAudioAu}</td>
 *     </tr>
 *     <tr>
 *       <td>html.audio.aif</td><td><i>String</i></td><td><code>"probably"</code></td>
 *       <td>{@link qx.bom.client.Html#getAudioAif}</td>
 *     </tr>
 *     <tr>
 *       <td>html.canvas</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getCanvas}</td>
 *     </tr>
 *     <tr>
 *       <td>html.classlist</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getClassList}</td>
 *     </tr>
 *     <tr>
 *       <td>html.geolocation</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getGeoLocation}</td>
 *     </tr>
 *     <tr>
 *       <td>html.storage.local</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getLocalStorage}</td>
 *     </tr>
 *     <tr>
 *       <td>html.storage.session</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getSessionStorage}</td>
 *     </tr>
 *     <tr>
 *       <td>html.storage.userdata</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getUserDataStorage}</td>
 *     </tr>
 *     <tr>
 *       <td>html.svg</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getSvg}</td>
 *     </tr>
 *     <tr>
 *       <td>html.video</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getVideo}</td>
 *     </tr>
 *     <tr>
 *       <td>html.video.h264</td><td><i>String</i></td><td><code>"probably"</code></td>
 *       <td>{@link qx.bom.client.Html#getVideoH264}</td>
 *     </tr>
 *     <tr>
 *       <td>html.video.ogg</td><td><i>String</i></td><td><code>""</code></td>
 *       <td>{@link qx.bom.client.Html#getVideoOgg}</td>
 *     </tr>
 *     <tr>
 *       <td>html.video.webm</td><td><i>String</i></td><td><code>"maybe"</code></td>
 *       <td>{@link qx.bom.client.Html#getVideoWebm}</td>
 *     </tr>
 *     <tr>
 *       <td>html.vml</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Html#getVml}</td>
 *     </tr>
 *     <tr>
 *       <td>html.webworker</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getWebWorker}</td>
 *     <tr>
 *       <td>html.filereader</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getFileReader}</td>
 *     </tr>
 *     <tr>
 *       <td>html.xpath</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getXPath}</td>
 *     </tr>
 *     <tr>
 *       <td>html.xul</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getXul}</td>
 *     </tr>
 *     <tr>
 *       <td>html.console</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getConsole}</td>
 *     </tr>
 *     <tr>
 *       <td>html.element.contains</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getContains}</td>
 *     </tr>
 *     <tr>
 *       <td>html.element.compareDocumentPosition</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getCompareDocumentPosition}</td>
 *     </tr>
 *     <tr>
 *       <td>html.element.textContent</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getTextContent}</td>
 *     </tr>
 *     <tr>
 *       <td>html.image.naturaldimensions</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getNaturalDimensions}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>XML</b></td>
 *     </tr>
 *     <tr>
 *       <td>xml.implementation</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Xml#getImplementation}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.domparser</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Xml#getDomParser}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.selectsinglenode</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Xml#getSelectSingleNode}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.selectnodes</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Xml#getSelectNodes}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.getelementsbytagnamens</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Xml#getElementsByTagNameNS}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.domproperties</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Xml#getDomProperties}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.attributens</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Xml#getAttributeNS}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.createelementns</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Xml#getCreateElementNS}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.createnode</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Xml#getCreateNode}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.getqualifieditem</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Xml#getQualifiedItem}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>Stylesheets</b></td>
 *     </tr>
 *     <tr>
 *       <td>html.stylesheet.createstylesheet</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Stylesheet#getCreateStyleSheet}</td>
 *     </tr>
 *     <tr>
 *       <td>html.stylesheet.insertrule</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Stylesheet#getInsertRule}</td>
 *     </tr>
 *     <tr>
 *       <td>html.stylesheet.deleterule</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Stylesheet#getDeleteRule}</td>
 *     </tr>
 *     <tr>
 *       <td>html.stylesheet.addimport</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Stylesheet#getAddImport}</td>
 *     </tr>
 *     <tr>
 *       <td>html.stylesheet.removeimport</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Stylesheet#getRemoveImport}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>io</b></td>
 *     </tr>
 *     <tr>
 *       <td>io.maxrequests</td><td><i>Integer</i></td><td><code>4</code></td>
 *       <td>{@link qx.bom.client.Transport#getMaxConcurrentRequestCount}</td>
 *     </tr>
 *     <tr>
 *       <td>io.ssl</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Transport#getSsl}</td>
 *     </tr>
 *     <tr>
 *       <td>io.xhr</td><td><i>String</i></td><td><code>xhr</code></td>
 *       <td>{@link qx.bom.client.Transport#getXmlHttpRequest}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>locale</b></td>
 *     </tr>
 *     <tr>
 *       <td>locale</td><td><i>String</i></td><td><code>de</code></td>
 *       <td>{@link qx.bom.client.Locale#getLocale}</td>
 *     </tr>
 *     <tr>
 *       <td>locale.variant</td><td><i>String</i></td><td><code>de</code></td>
 *       <td>{@link qx.bom.client.Locale#getVariant}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>os</b></td>
 *     </tr>
 *     <tr>
 *       <td>os.name</td><td><i>String</i></td><td><code>osx</code></td>
 *       <td>{@link qx.bom.client.OperatingSystem#getName}</td>
 *     </tr>
 *     <tr>
 *       <td>os.version</td><td><i>String</i></td><td><code>10.6</code></td>
 *       <td>{@link qx.bom.client.OperatingSystem#getVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>os.scrollBarOverlayed</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Scroll#scrollBarOverlayed}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>phonegap</b></td>
 *     </tr>
 *     <tr>
 *       <td>phonegap</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.PhoneGap#getPhoneGap}</td>
 *     </tr>
 *     <tr>
 *       <td>phonegap.notification</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.PhoneGap#getNotification}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>plugin</b></td>
 *     </tr>
 *     <tr>
 *       <td>plugin.divx</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getDivX}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.divx.version</td><td><i>String</i></td><td></td>
 *       <td>{@link qx.bom.client.Plugin#getDivXVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.flash</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Flash#isAvailable}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.flash.express</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Flash#getExpressInstall}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.flash.strictsecurity</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Flash#getStrictSecurityModel}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.flash.version</td><td><i>String</i></td><td><code>10.2.154</code></td>
 *       <td>{@link qx.bom.client.Flash#getVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.gears</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getGears}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.activex</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getActiveX}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.pdf</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getPdf}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.pdf.version</td><td><i>String</i></td><td></td>
 *       <td>{@link qx.bom.client.Plugin#getPdfVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.quicktime</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Plugin#getQuicktime}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.quicktime.version</td><td><i>String</i></td><td><code>7.6</code></td>
 *       <td>{@link qx.bom.client.Plugin#getQuicktimeVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.silverlight</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getSilverlight}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.silverlight.version</td><td><i>String</i></td><td></td>
 *       <td>{@link qx.bom.client.Plugin#getSilverlightVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.windowsmedia</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getWindowsMedia}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.windowsmedia.version</td><td><i>String</i></td><td></td>
 *       <td>{@link qx.bom.client.Plugin#getWindowsMediaVersion}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>qx</b></td>
 *     </tr>
 *     <tr>
 *       <td>qx.allowUrlSettings</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.allowUrlVariants</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.application</td><td><i>String</i></td><td><code>name.space</code></td>
 *       <td><i>default:</i> <code>&lt;&lt;application name&gt;&gt;</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.aspects</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.databinding</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.dispose</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.dispose.level</td><td><i>Integer</i></td><td><code>0</code></td>
 *       <td><i>default:</i> <code>0</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.io</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *     <tr>
 *       <td>qx.debug.io.remote</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *     <tr>
 *       <td>qx.debug.io.remote.data</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.property.level</td><td><i>Integer</i></td><td><code>0</code></td>
 *       <td><i>default:</i> <code>0</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.dynamicmousewheel</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.dynlocale</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.globalErrorHandling</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.mobile.emulatetouch</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.mobile.nativescroll</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.basecalls</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.comments</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.privates</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.strings</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.variables</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.variants</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.revision</td><td><i>String</i></td><td><code>27348</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.theme</td><td><i>String</i></td><td><code>qx.theme.Modern</code></td>
 *       <td><i>default:</i> <code>&lt;&lt;theme name&gt;&gt;</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.version</td><td><i>String</i></td><td><code>${qxversion}</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.blankpage</td><td><i>String</i></td><td><code>URI to blank.html page</code></td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>module</b></td>
 *     </tr>
 *     <tr>
 *       <td>module.databinding</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>module.logger</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>module.property</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>module.events</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><h3>Asynchronous checks</h3>
 *       </td>
 *     </tr>
 *     <tr>
 *       <td>html.dataurl</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getDataUrl}</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 */
qx.Bootstrap.define("qx.core.Environment", {
  statics : {
    /** Map containing the synchronous check functions. */
    _checks : {
    },
    /** Map containing the asynchronous check functions. */
    _asyncChecks : {
    },
    /** Internal cache for all checks. */
    __cache : {
    },
    /** Internal map for environment keys to check methods. */
    _checksMap : {
      "engine.version" : "qx.bom.client.Engine.getVersion",
      "engine.name" : "qx.bom.client.Engine.getName",
      "browser.name" : "qx.bom.client.Browser.getName",
      "browser.version" : "qx.bom.client.Browser.getVersion",
      "browser.documentmode" : "qx.bom.client.Browser.getDocumentMode",
      "browser.quirksmode" : "qx.bom.client.Browser.getQuirksMode",
      "runtime.name" : "qx.bom.client.Runtime.getName",
      "device.name" : "qx.bom.client.Device.getName",
      "device.type" : "qx.bom.client.Device.getType",
      "locale" : "qx.bom.client.Locale.getLocale",
      "locale.variant" : "qx.bom.client.Locale.getVariant",
      "os.name" : "qx.bom.client.OperatingSystem.getName",
      "os.version" : "qx.bom.client.OperatingSystem.getVersion",
      "os.scrollBarOverlayed" : "qx.bom.client.Scroll.scrollBarOverlayed",
      "plugin.gears" : "qx.bom.client.Plugin.getGears",
      "plugin.activex" : "qx.bom.client.Plugin.getActiveX",
      "plugin.quicktime" : "qx.bom.client.Plugin.getQuicktime",
      "plugin.quicktime.version" : "qx.bom.client.Plugin.getQuicktimeVersion",
      "plugin.windowsmedia" : "qx.bom.client.Plugin.getWindowsMedia",
      "plugin.windowsmedia.version" : "qx.bom.client.Plugin.getWindowsMediaVersion",
      "plugin.divx" : "qx.bom.client.Plugin.getDivX",
      "plugin.divx.version" : "qx.bom.client.Plugin.getDivXVersion",
      "plugin.silverlight" : "qx.bom.client.Plugin.getSilverlight",
      "plugin.silverlight.version" : "qx.bom.client.Plugin.getSilverlightVersion",
      "plugin.flash" : "qx.bom.client.Flash.isAvailable",
      "plugin.flash.version" : "qx.bom.client.Flash.getVersion",
      "plugin.flash.express" : "qx.bom.client.Flash.getExpressInstall",
      "plugin.flash.strictsecurity" : "qx.bom.client.Flash.getStrictSecurityModel",
      "plugin.pdf" : "qx.bom.client.Plugin.getPdf",
      "plugin.pdf.version" : "qx.bom.client.Plugin.getPdfVersion",
      "io.maxrequests" : "qx.bom.client.Transport.getMaxConcurrentRequestCount",
      "io.ssl" : "qx.bom.client.Transport.getSsl",
      "io.xhr" : "qx.bom.client.Transport.getXmlHttpRequest",
      "event.touch" : "qx.bom.client.Event.getTouch",
      "event.pointer" : "qx.bom.client.Event.getPointer",
      "event.help" : "qx.bom.client.Event.getHelp",
      "event.hashchange" : "qx.bom.client.Event.getHashChange",
      "ecmascript.stacktrace" : "qx.bom.client.EcmaScript.getStackTrace",
      "html.webworker" : "qx.bom.client.Html.getWebWorker",
      "html.filereader" : "qx.bom.client.Html.getFileReader",
      "html.geolocation" : "qx.bom.client.Html.getGeoLocation",
      "html.audio" : "qx.bom.client.Html.getAudio",
      "html.audio.ogg" : "qx.bom.client.Html.getAudioOgg",
      "html.audio.mp3" : "qx.bom.client.Html.getAudioMp3",
      "html.audio.wav" : "qx.bom.client.Html.getAudioWav",
      "html.audio.au" : "qx.bom.client.Html.getAudioAu",
      "html.audio.aif" : "qx.bom.client.Html.getAudioAif",
      "html.video" : "qx.bom.client.Html.getVideo",
      "html.video.ogg" : "qx.bom.client.Html.getVideoOgg",
      "html.video.h264" : "qx.bom.client.Html.getVideoH264",
      "html.video.webm" : "qx.bom.client.Html.getVideoWebm",
      "html.storage.local" : "qx.bom.client.Html.getLocalStorage",
      "html.storage.session" : "qx.bom.client.Html.getSessionStorage",
      "html.storage.userdata" : "qx.bom.client.Html.getUserDataStorage",
      "html.classlist" : "qx.bom.client.Html.getClassList",
      "html.xpath" : "qx.bom.client.Html.getXPath",
      "html.xul" : "qx.bom.client.Html.getXul",
      "html.canvas" : "qx.bom.client.Html.getCanvas",
      "html.svg" : "qx.bom.client.Html.getSvg",
      "html.vml" : "qx.bom.client.Html.getVml",
      "html.dataset" : "qx.bom.client.Html.getDataset",
      "html.dataurl" : "qx.bom.client.Html.getDataUrl",
      "html.console" : "qx.bom.client.Html.getConsole",
      "html.stylesheet.createstylesheet" : "qx.bom.client.Stylesheet.getCreateStyleSheet",
      "html.stylesheet.insertrule" : "qx.bom.client.Stylesheet.getInsertRule",
      "html.stylesheet.deleterule" : "qx.bom.client.Stylesheet.getDeleteRule",
      "html.stylesheet.addimport" : "qx.bom.client.Stylesheet.getAddImport",
      "html.stylesheet.removeimport" : "qx.bom.client.Stylesheet.getRemoveImport",
      "html.element.contains" : "qx.bom.client.Html.getContains",
      "html.element.compareDocumentPosition" : "qx.bom.client.Html.getCompareDocumentPosition",
      "html.element.textcontent" : "qx.bom.client.Html.getTextContent",
      "html.image.naturaldimensions" : "qx.bom.client.Html.getNaturalDimensions",
      "json" : "qx.bom.client.Json.getJson",
      "css.textoverflow" : "qx.bom.client.Css.getTextOverflow",
      "css.placeholder" : "qx.bom.client.Css.getPlaceholder",
      "css.borderradius" : "qx.bom.client.Css.getBorderRadius",
      "css.borderimage" : "qx.bom.client.Css.getBorderImage",
      "css.borderimage.standardsyntax" : "qx.bom.client.Css.getBorderImageSyntax",
      "css.boxshadow" : "qx.bom.client.Css.getBoxShadow",
      "css.gradient.linear" : "qx.bom.client.Css.getLinearGradient",
      "css.gradient.filter" : "qx.bom.client.Css.getFilterGradient",
      "css.gradient.radial" : "qx.bom.client.Css.getRadialGradient",
      "css.gradient.legacywebkit" : "qx.bom.client.Css.getLegacyWebkitGradient",
      "css.boxmodel" : "qx.bom.client.Css.getBoxModel",
      "css.rgba" : "qx.bom.client.Css.getRgba",
      "css.userselect" : "qx.bom.client.Css.getUserSelect",
      "css.userselect.none" : "qx.bom.client.Css.getUserSelectNone",
      "css.usermodify" : "qx.bom.client.Css.getUserModify",
      "css.appearance" : "qx.bom.client.Css.getAppearance",
      "css.float" : "qx.bom.client.Css.getFloat",
      "css.boxsizing" : "qx.bom.client.Css.getBoxSizing",
      "css.animation" : "qx.bom.client.CssAnimation.getSupport",
      "css.transform" : "qx.bom.client.CssTransform.getSupport",
      "css.transform.3d" : "qx.bom.client.CssTransform.get3D",
      "css.inlineblock" : "qx.bom.client.Css.getInlineBlock",
      "css.opacity" : "qx.bom.client.Css.getOpacity",
      "css.overflowxy" : "qx.bom.client.Css.getOverflowXY",
      "css.textShadow" : "qx.bom.client.Css.getTextShadow",
      "css.textShadow.filter" : "qx.bom.client.Css.getFilterTextShadow",
      "phonegap" : "qx.bom.client.PhoneGap.getPhoneGap",
      "phonegap.notification" : "qx.bom.client.PhoneGap.getNotification",
      "xml.implementation" : "qx.bom.client.Xml.getImplementation",
      "xml.domparser" : "qx.bom.client.Xml.getDomParser",
      "xml.selectsinglenode" : "qx.bom.client.Xml.getSelectSingleNode",
      "xml.selectnodes" : "qx.bom.client.Xml.getSelectNodes",
      "xml.getelementsbytagnamens" : "qx.bom.client.Xml.getElementsByTagNameNS",
      "xml.domproperties" : "qx.bom.client.Xml.getDomProperties",
      "xml.attributens" : "qx.bom.client.Xml.getAttributeNS",
      "xml.createnode" : "qx.bom.client.Xml.getCreateNode",
      "xml.getqualifieditem" : "qx.bom.client.Xml.getQualifiedItem",
      "xml.createelementns" : "qx.bom.client.Xml.getCreateElementNS"
    },
    /**
     * The default accessor for the checks. It returns the value the current
     * environment has for the given key. The key could be something like
     * "qx.debug", "css.textoverflow" or "io.ssl". A complete list of
     * checks can be found in the class comment of this class.
     *
     * Please keep in mind that the result is cached. If you want to run the
     * check function again in case something could have been changed, take a
     * look at the {@link #invalidateCacheKey} function.
     *
     * @param key {String} The name of the check you want to query.
     * @return {var} The stored value depending on the given key.
     *   (Details in the class doc)
     */
    get : function(key){

      // check the cache
      if(this.__cache[key] != undefined){

        return this.__cache[key];
      };
      // search for a matching check
      var check = this._checks[key];
      if(check){

        // execute the check and write the result in the cache
        var value = check();
        this.__cache[key] = value;
        return value;
      };
      // try class lookup
      var classAndMethod = this._getClassNameFromEnvKey(key);
      if(classAndMethod[0] != undefined){

        var clazz = classAndMethod[0];
        var method = classAndMethod[1];
        var value = clazz[method]();
        // call the check method
        this.__cache[key] = value;
        return value;
      };
      // debug flag
      if(qx.Bootstrap.DEBUG){

        qx.Bootstrap.warn(key + " is not a valid key. Please see the API-doc of " + "qx.core.Environment for a list of predefined keys.");
        qx.Bootstrap.trace(this);
      };
    },
    /**
     * Maps an environment key to a check class and method name.
     *
     * @param key {String} The name of the check you want to query.
     * @return {Array} [className, methodName] of
     *  the corresponding implementation.
     */
    _getClassNameFromEnvKey : function(key){

      var envmappings = this._checksMap;
      if(envmappings[key] != undefined){

        var implementation = envmappings[key];
        // separate class from method
        var lastdot = implementation.lastIndexOf(".");
        if(lastdot > -1){

          var classname = implementation.slice(0, lastdot);
          var methodname = implementation.slice(lastdot + 1);
          var clazz = qx.Bootstrap.getByName(classname);
          if(clazz != undefined){

            return [clazz, methodname];
          };
        };
      };
      return [undefined, undefined];
    },
    /**
     * Invokes the callback as soon as the check has been done. If no check
     * could be found, a warning will be printed.
     *
     * @param key {String} The key of the asynchronous check.
     * @param callback {Function} The function to call as soon as the check is
     *   done. The function should have one argument which is the result of the
     *   check.
     * @param self {var} The context to use when invoking the callback.
     */
    getAsync : function(key, callback, self){

      // check the cache
      var env = this;
      if(this.__cache[key] != undefined){

        // force async behavior
        window.setTimeout(function(){

          callback.call(self, env.__cache[key]);
        }, 0);
        return;
      };
      var check = this._asyncChecks[key];
      if(check){

        check(function(result){

          env.__cache[key] = result;
          callback.call(self, result);
        });
        return;
      };
      // try class lookup
      var classAndMethod = this._getClassNameFromEnvKey(key);
      if(classAndMethod[0] != undefined){

        var clazz = classAndMethod[0];
        var method = classAndMethod[1];
        clazz[method](function(result){

          // call the check method
          env.__cache[key] = result;
          callback.call(self, result);
        });
        return;
      };
      // debug flag
      if(qx.Bootstrap.DEBUG){

        qx.Bootstrap.warn(key + " is not a valid key. Please see the API-doc of " + "qx.core.Environment for a list of predefined keys.");
        qx.Bootstrap.trace(this);
      };
    },
    /**
     * Returns the proper value dependent on the check for the given key.
     *
     * @param key {String} The name of the check the select depends on.
     * @param values {Map} A map containing the values which should be returned
     *   in any case. The "default" key could be used as a catch all statement.
     * @return {var} The value which is stored in the map for the given
     *   check of the key.
     */
    select : function(key, values){

      return this.__pickFromValues(this.get(key), values);
    },
    /**
     * Selects the proper function dependent on the asynchronous check.
     *
     * @param key {String} The key for the async check.
     * @param values {Map} A map containing functions. The map keys should
     *   contain all possibilities which could be returned by the given check
     *   key. The "default" key could be used as a catch all statement.
     *   The called function will get one parameter, the result of the query.
     * @param self {var} The context which should be used when calling the
     *   method in the values map.
     */
    selectAsync : function(key, values, self){

      this.getAsync(key, function(result){

        var value = this.__pickFromValues(key, values);
        value.call(self, result);
      }, this);
    },
    /**
     * Internal helper which tries to pick the given key from the given values
     * map. If that key is not found, it tries to use a key named "default".
     * If there is also no default key, it prints out a warning and returns
     * undefined.
     *
     * @param key {String} The key to search for in the values.
     * @param values {Map} A map containing some keys.
     * @return {var} The value stored as values[key] usually.
     */
    __pickFromValues : function(key, values){

      var value = values[key];
      if(values.hasOwnProperty(key)){

        return value;
      };
      // check for piped values
      for(var id in values){

        if(id.indexOf("|") != -1){

          var ids = id.split("|");
          for(var i = 0;i < ids.length;i++){

            if(ids[i] == key){

              return values[id];
            };
          };
        };
      };
      if(values["default"] !== undefined){

        return values["default"];
      };
      if(qx.Bootstrap.DEBUG){

        throw new Error('No match for variant "' + key + '" (' + (typeof key) + ' type)' + ' in variants [' + qx.Bootstrap.getKeysAsString(values) + '] found, and no default ("default") given');
      };
    },
    /**
     * Takes a given map containing the check names as keys and converts
     * the map to an array only containing the values for check evaluating
     * to <code>true</code>. This is especially handy for conditional
     * includes of mixins.
     * @param map {Map} A map containing check names as keys and values.
     * @return {Array} An array containing the values.
     */
    filter : function(map){

      var returnArray = [];
      for(var check in map){

        if(this.get(check)){

          returnArray.push(map[check]);
        };
      };
      return returnArray;
    },
    /**
     * Invalidates the cache for the given key.
     *
     * @param key {String} The key of the check.
     */
    invalidateCacheKey : function(key){

      delete this.__cache[key];
    },
    /**
     * Add a check to the environment class. If there is already a check
     * added for the given key, the add will be ignored.
     *
     * @param key {String} The key for the check e.g. html.featurexyz.
     * @param check {var} It could be either a function or a simple value.
     *   The function should be responsible for the check and should return the
     *   result of the check.
     */
    add : function(key, check){

      // ignore already added checks.
      if(this._checks[key] == undefined){

        // add functions directly
        if(check instanceof Function){

          this._checks[key] = check;
        } else {

          this._checks[key] = this.__createCheck(check);
        };
      };
    },
    /**
     * Adds an asynchronous check to the environment. If there is already a check
     * added for the given key, the add will be ignored.
     *
     * @param key {String} The key of the check e.g. html.featureabc
     * @param check {Function} A function which should check for a specific
     *   environment setting in an asynchronous way. The method should take two
     *   arguments. First one is the callback and the second one is the context.
     */
    addAsync : function(key, check){

      if(this._checks[key] == undefined){

        this._asyncChecks[key] = check;
      };
    },
    /**
     * Returns all currently defined synchronous checks.
     *
     * @internal
     * @return {Map} The map of synchronous checks
     */
    getChecks : function(){

      return this._checks;
    },
    /**
     * Returns all currently defined asynchronous checks.
     *
     * @internal
     * @return {Map} The map of asynchronous checks
     */
    getAsyncChecks : function(){

      return this._asyncChecks;
    },
    /**
     * Initializer for the default values of the framework settings.
     */
    _initDefaultQxValues : function(){

      // an always-true key (e.g. for use in qx.core.Environment.filter() calls)
      this.add("true", function(){

        return true;
      });
      // old settings
      this.add("qx.allowUrlSettings", function(){

        return false;
      });
      this.add("qx.allowUrlVariants", function(){

        return false;
      });
      this.add("qx.debug.property.level", function(){

        return 0;
      });
      // old variants
      // make sure to reflect all changes to qx.debug here in the bootstrap class!
      this.add("qx.debug", function(){

        return true;
      });
      this.add("qx.aspects", function(){

        return false;
      });
      this.add("qx.dynlocale", function(){

        return true;
      });
      this.add("qx.mobile.emulatetouch", function(){

        return false;
      });
      this.add("qx.mobile.nativescroll", function(){

        return false;
      });
      this.add("qx.blankpage", function(){

        return "qx/static/blank.html";
      });
      this.add("qx.dynamicmousewheel", function(){

        return true;
      });
      this.add("qx.debug.databinding", function(){

        return false;
      });
      this.add("qx.debug.dispose", function(){

        return false;
      });
      // generator optimization vectors
      this.add("qx.optimization.basecalls", function(){

        return false;
      });
      this.add("qx.optimization.comments", function(){

        return false;
      });
      this.add("qx.optimization.privates", function(){

        return false;
      });
      this.add("qx.optimization.strings", function(){

        return false;
      });
      this.add("qx.optimization.variables", function(){

        return false;
      });
      this.add("qx.optimization.variants", function(){

        return false;
      });
      // qooxdoo modules
      this.add("module.databinding", function(){

        return true;
      });
      this.add("module.logger", function(){

        return true;
      });
      this.add("module.property", function(){

        return true;
      });
      this.add("module.events", function(){

        return true;
      });
    },
    /**
     * Import checks from global qx.$$environment into the Environment class.
     */
    __importFromGenerator : function(){

      // import the environment map
      if(qx && qx.$$environment){

        for(var key in qx.$$environment){

          var value = qx.$$environment[key];
          this._checks[key] = this.__createCheck(value);
        };
      };
    },
    /**
     * Checks the URL for environment settings and imports these into the
     * Environment class.
     */
    __importFromUrl : function(){

      if(window.document && window.document.location){

        var urlChecks = window.document.location.search.slice(1).split("&");
        for(var i = 0;i < urlChecks.length;i++){

          var check = urlChecks[i].split(":");
          if(check.length != 3 || check[0] != "qxenv"){

            continue;
          };
          var key = check[1];
          var value = decodeURIComponent(check[2]);
          // implicit type conversion
          if(value == "true"){

            value = true;
          } else if(value == "false"){

            value = false;
          } else if(/^(\d|\.)+$/.test(value)){

            value = parseFloat(value);
          };;
          this._checks[key] = this.__createCheck(value);
        };
      };
    },
    /**
     * Internal helper which creates a function returning the given value.
     *
     * @param value {var} The value which should be returned.
     * @return {Function} A function which could be used by a test.
     */
    __createCheck : function(value){

      return qx.Bootstrap.bind(function(value){

        return value;
      }, null, value);
    }
  },
  defer : function(statics){

    // create default values for the environment class
    statics._initDefaultQxValues();
    // load the checks from the generator
    statics.__importFromGenerator();
    // load the checks from the url
    if(statics.get("qx.allowUrlSettings") === true){

      statics.__importFromUrl();
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Martin Wittemann (martinwittemann)

   ======================================================================

   This class contains code from:

     Copyright:
       2011 Pocket Widget S.L., Spain, http://www.pocketwidget.com

     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php

     Authors:
       * Javier Martinez Villacampa

************************************************************************ */
/**
 * This class comes with all relevant information regarding
 * the client's engine.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Engine", {
  // General: http://en.wikipedia.org/wiki/Browser_timeline
  // Webkit: http://developer.apple.com/internet/safari/uamatrix.html
  // Firefox: http://en.wikipedia.org/wiki/History_of_Mozilla_Firefox
  // Maple: http://www.scribd.com/doc/46675822/2011-SDK2-0-Maple-Browser-Specification-V1-00
  statics : {
    /**
     * Returns the version of the engine.
     *
     * @return {String} The version number of the current engine.
     * @internal
     */
    getVersion : function(){

      var agent = window.navigator.userAgent;
      var version = "";
      if(qx.bom.client.Engine.__isOpera()){

        // Opera has a special versioning scheme, where the second part is combined
        // e.g. 8.54 which should be handled like 8.5.4 to be compatible to the
        // common versioning system used by other browsers
        if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(agent)){

          // opera >= 10 has as a first verison 9.80 and adds the proper version
          // in a separate "Version/" postfix
          // http://my.opera.com/chooseopera/blog/2009/05/29/changes-in-operas-user-agent-string-format
          if(agent.indexOf("Version/") != -1){

            var match = agent.match(/Version\/(\d+)\.(\d+)/);
            // ignore the first match, its the whole version string
            version = match[1] + "." + match[2].charAt(0) + "." + match[2].substring(1, match[2].length);
          } else {

            version = RegExp.$1 + "." + RegExp.$2;
            if(RegExp.$3 != ""){

              version += "." + RegExp.$3;
            };
          };
        };
      } else if(qx.bom.client.Engine.__isWebkit()){

        if(/AppleWebKit\/([^ ]+)/.test(agent)){

          version = RegExp.$1;
          // We need to filter these invalid characters
          var invalidCharacter = RegExp("[^\\.0-9]").exec(version);
          if(invalidCharacter){

            version = version.slice(0, invalidCharacter.index);
          };
        };
      } else if(qx.bom.client.Engine.__isGecko() || qx.bom.client.Engine.__isMaple()){

        // Parse "rv" section in user agent string
        if(/rv\:([^\);]+)(\)|;)/.test(agent)){

          version = RegExp.$1;
        };
      } else if(qx.bom.client.Engine.__isMshtml()){

        if(/MSIE\s+([^\);]+)(\)|;)/.test(agent)){

          version = RegExp.$1;
          // If the IE8 or IE9 is running in the compatibility mode, the MSIE value
          // is set to an older version, but we need the correct version. The only
          // way is to compare the trident version.
          if(version < 8 && /Trident\/([^\);]+)(\)|;)/.test(agent)){

            if(RegExp.$1 == "4.0"){

              version = "8.0";
            } else if(RegExp.$1 == "5.0"){

              version = "9.0";
            };
          };
        };
      } else {

        var failFunction = window.qxFail;
        if(failFunction && typeof failFunction === "function"){

          version = failFunction().FULLVERSION;
        } else {

          version = "1.9.0.0";
          qx.Bootstrap.warn("Unsupported client: " + agent + "! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
        };
      };;;
      return version;
    },
    /**
     * Returns the name of the engine.
     *
     * @return {String} The name of the current engine.
     * @internal
     */
    getName : function(){

      var name;
      if(qx.bom.client.Engine.__isOpera()){

        name = "opera";
      } else if(qx.bom.client.Engine.__isWebkit()){

        name = "webkit";
      } else if(qx.bom.client.Engine.__isGecko() || qx.bom.client.Engine.__isMaple()){

        name = "gecko";
      } else if(qx.bom.client.Engine.__isMshtml()){

        name = "mshtml";
      } else {

        // check for the fallback
        var failFunction = window.qxFail;
        if(failFunction && typeof failFunction === "function"){

          name = failFunction().NAME;
        } else {

          name = "gecko";
          qx.Bootstrap.warn("Unsupported client: " + window.navigator.userAgent + "! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
        };
      };;;
      return name;
    },
    /**
     * Internal helper for checking for opera.
     * @return {boolean} true, if its opera.
     */
    __isOpera : function(){

      return window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]";
    },
    /**
     * Internal helper for checking for webkit.
     * @return {boolean} true, if its webkit.
     */
    __isWebkit : function(){

      return window.navigator.userAgent.indexOf("AppleWebKit/") != -1;
    },
    /**
     * Internal helper for checking for Maple .
     * Maple is used in Samsung SMART TV 2010-2011 models. It's based on Gecko
     * engine 1.8.1.11.
     * @return {boolean} true, if its maple.
     */
    __isMaple : function(){

      return window.navigator.userAgent.indexOf("Maple") != -1;
    },
    /**
     * Internal helper for checking for gecko.
     * @return {boolean} true, if its gecko.
     */
    __isGecko : function(){

      return window.controllers && window.navigator.product === "Gecko" && window.navigator.userAgent.indexOf("Maple") == -1;
    },
    /**
     * Internal helper to check for MSHTML.
     * @return {boolean} true, if its MSHTML.
     */
    __isMshtml : function(){

      return window.navigator.cpuClass && /MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent);
    }
  },
  defer : function(statics){

    qx.core.Environment.add("engine.version", statics.getVersion);
    qx.core.Environment.add("engine.name", statics.getName);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

   ======================================================================

   This class uses ideas and code snipplets presented at
   http://webreflection.blogspot.com/2008/05/habemus-array-unlocked-length-in-ie8.html
   http://webreflection.blogspot.com/2008/05/stack-and-arrayobject-how-to-create.html

   Author:
     Andrea Giammarchi

   License:
     MIT: http://www.opensource.org/licenses/mit-license.php

   ======================================================================

   This class uses documentation of the native Array methods from the MDC
   documentation of Mozilla.

   License:
     CC Attribution-Sharealike License:
     http://creativecommons.org/licenses/by-sa/2.5/

************************************************************************ */
/* ************************************************************************

#require(qx.lang.Core)
#require(qx.bom.client.Engine)

************************************************************************ */
/**
 * This class is the common superclass for most array classes in
 * qooxdoo. It supports all of the shiny 1.6 JavaScript array features
 * like <code>forEach</code> and <code>map</code>.
 *
 * This class may be instantiated instead of the native Array if
 * one wants to work with a feature-unified Array instead of the native
 * one. This class uses native features whereever possible but fills
 * all missing implementations with custom ones.
 *
 * Through the ability to extend from this class one could add even
 * more utility features on top of it.
 */
qx.Bootstrap.define("qx.type.BaseArray", {
  extend : Array,
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates a new Array with the given length or the listed elements.
   *
   * <pre class="javascript">
   * var arr1 = new qx.type.BaseArray(arrayLength);
   * var arr2 = new qx.type.BaseArray(item0, item1, ..., itemN);
   * </pre>
   *
   * * <code>arrayLength</code>: The initial length of the array. You can access
   * this value using the length property. If the value specified is not a
   * number, an array of length 1 is created, with the first element having
   * the specified value. The maximum length allowed for an
   * array is 2^32-1, i.e. 4,294,967,295.
   * * <code>itemN</code>:  A value for the element in that position in the
   * array. When this form is used, the array is initialized with the specified
   * values as its elements, and the array's length property is set to the
   * number of arguments.
   *
   * @param length_or_items {Integer|varargs?null} The initial length of the array
   *        OR an argument list of values.
   */
  construct : function(length_or_items){
  },
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    /**
     * Converts a base array to a native Array
     *
     * @signature function()
     * @return {Array} The native array
     */
    toArray : null,
    /**
     * Returns the current number of items stored in the Array
     *
     * @signature function()
     * @return {Integer} number of items
     */
    valueOf : null,
    /**
     * Removes the last element from an array and returns that element.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {var} The last element of the array.
     */
    pop : null,
    /**
     * Adds one or more elements to the end of an array and returns the new length of the array.
     *
     * This method modifies the array.
     *
     * @signature function(varargs)
     * @param varargs {var} The elements to add to the end of the array.
     * @return {Integer} The new array's length
     */
    push : null,
    /**
     * Reverses the order of the elements of an array -- the first becomes the last, and the last becomes the first.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {Array} Returns the modified array (works in place)
     */
    reverse : null,
    /**
     * Removes the first element from an array and returns that element.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {var} The first element of the array.
     */
    shift : null,
    /**
     * Sorts the elements of an array.
     *
     * This method modifies the array.
     *
     * @signature function(compareFunction)
     * @param compareFunction {Function?null} Specifies a function that defines the sort order. If omitted,
     *   the array is sorted lexicographically (in dictionary order) according to the string conversion of each element.
     * @return {Array} Returns the modified array (works in place)
     */
    sort : null,
    /**
     * Adds and/or removes elements from an array.
     *
     * @signature function(index, howMany, varargs)
     * @param index {Integer} Index at which to start changing the array. If negative, will begin
     *   that many elements from the end.
     * @param howMany {Integer} An integer indicating the number of old array elements to remove.
     *   If <code>howMany</code> is 0, no elements are removed. In this case, you should specify
     *   at least one new element.
     * @param varargs {var?null} The elements to add to the array. If you don't specify any elements,
     *   splice simply removes elements from the array.
     * @return {BaseArray} New array with the removed elements.
     */
    splice : null,
    /**
     * Adds one or more elements to the front of an array and returns the new length of the array.
     *
     * This method modifies the array.
     *
     * @signature function(varargs)
     * @param varargs {var} The elements to add to the front of the array.
     * @return {Integer} The new array's length
     */
    unshift : null,
    /**
     * Returns a new array comprised of this array joined with other array(s) and/or value(s).
     *
     * This method does not modify the array and returns a modified copy of the original.
     *
     * @signature function(varargs)
     * @param varargs {Array|var} Arrays and/or values to concatenate to the resulting array.
     * @return {qx.type.BaseArray} New array built of the given arrays or values.
     */
    concat : null,
    /**
     * Joins all elements of an array into a string.
     *
     * @signature function(separator)
     * @param separator {String} Specifies a string to separate each element of the array. The separator is
     *   converted to a string if necessary. If omitted, the array elements are separated with a comma.
     * @return {String} The stringified values of all elements divided by the given separator.
     */
    join : null,
    /**
     * Extracts a section of an array and returns a new array.
     *
     * @signature function(begin, end)
     * @param begin {Integer} Zero-based index at which to begin extraction. As a negative index, start indicates
     *   an offset from the end of the sequence. slice(-2) extracts the second-to-last element and the last element
     *   in the sequence.
     * @param end {Integer?length} Zero-based index at which to end extraction. slice extracts up to but not including end.
     *   <code>slice(1,4)</code> extracts the second element through the fourth element (elements indexed 1, 2, and 3).
     *   As a negative index, end indicates an offset from the end of the sequence. slice(2,-1) extracts the third element through the second-to-last element in the sequence.
     *   If end is omitted, slice extracts to the end of the sequence.
     * @return {BaseArray} An new array which contains a copy of the given region.
     */
    slice : null,
    /**
     * Returns a string representing the array and its elements. Overrides the Object.prototype.toString method.
     *
     * @signature function()
     * @return {String} The string representation of the array.
     */
    toString : null,
    /**
     * Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
     *
     * @signature function(searchElement, fromIndex)
     * @param searchElement {var} Element to locate in the array.
     * @param fromIndex {Integer?0} The index at which to begin the search. Defaults to 0, i.e. the
     *   whole array will be searched. If the index is greater than or equal to the length of the
     *   array, -1 is returned, i.e. the array will not be searched. If negative, it is taken as
     *   the offset from the end of the array. Note that even when the index is negative, the array
     *   is still searched from front to back. If the calculated index is less than 0, the whole
     *   array will be searched.
     * @return {Integer} The index of the given element
     */
    indexOf : null,
    /**
     * Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.
     *
     * @signature function(searchElement, fromIndex)
     * @param searchElement {var} Element to locate in the array.
     * @param fromIndex {Integer?length} The index at which to start searching backwards. Defaults to
     *   the array's length, i.e. the whole array will be searched. If the index is greater than
     *   or equal to the length of the array, the whole array will be searched. If negative, it
     *   is taken as the offset from the end of the array. Note that even when the index is
     *   negative, the array is still searched from back to front. If the calculated index is
     *   less than 0, -1 is returned, i.e. the array will not be searched.
     * @return {Integer} The index of the given element
     */
    lastIndexOf : null,
    /**
     * Executes a provided function once per array element.
     *
     * <code>forEach</code> executes the provided function (<code>callback</code>) once for each
     * element present in the array.  <code>callback</code> is invoked only for indexes of the array
     * which have assigned values; it is not invoked for indexes which have been deleted or which
     * have never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index
     * of the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>forEach</code>, it will be used
     * as the <code>this</code> for each invocation of the <code>callback</code>.  If it is not
     * provided, or is <code>null</code>, the global object associated with <code>callback</code>
     * is used instead.
     *
     * <code>forEach</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>forEach</code> is set before the first invocation of
     * <code>callback</code>.  Elements which are appended to the array after the call to
     * <code>forEach</code> begins will not be visited by <code>callback</code>. If existing elements
     * of the array are changed, or deleted, their value as passed to <code>callback</code> will be
     * the value at the time <code>forEach</code> visits them; elements that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to execute for each element.
     * @param obj {Object} Object to use as this when executing callback.
     */
    forEach : null,
    /**
     * Creates a new array with all elements that pass the test implemented by the provided
     * function.
     *
     * <code>filter</code> calls a provided <code>callback</code> function once for each
     * element in an array, and constructs a new array of all the values for which
     * <code>callback</code> returns a true value.  <code>callback</code> is invoked only
     * for indexes of the array which have assigned values; it is not invoked for indexes
     * which have been deleted or which have never been assigned values.  Array elements which
     * do not pass the <code>callback</code> test are simply skipped, and are not included
     * in the new array.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the
     * index of the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>filter</code>, it will
     * be used as the <code>this</code> for each invocation of the <code>callback</code>.
     * If it is not provided, or is <code>null</code>, the global object associated with
     * <code>callback</code> is used instead.
     *
     * <code>filter</code> does not mutate the array on which it is called. The range of
     * elements processed by <code>filter</code> is set before the first invocation of
     * <code>callback</code>. Elements which are appended to the array after the call to
     * <code>filter</code> begins will not be visited by <code>callback</code>. If existing
     * elements of the array are changed, or deleted, their value as passed to <code>callback</code>
     * will be the value at the time <code>filter</code> visits them; elements that are deleted
     * are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test each element of the array.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {BaseArray} The newly created array with all matching elements
     */
    filter : null,
    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     *
     * <code>map</code> calls a provided <code>callback</code> function once for each element in an array,
     * in order, and constructs a new array from the results.  <code>callback</code> is invoked only for
     * indexes of the array which have assigned values; it is not invoked for indexes which have been
     * deleted or which have never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of the
     * element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>map</code>, it will be used as the
     * <code>this</code> for each invocation of the <code>callback</code>. If it is not provided, or is
     * <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>map</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>map</code> is set before the first invocation of
     * <code>callback</code>. Elements which are appended to the array after the call to <code>map</code>
     * begins will not be visited by <code>callback</code>.  If existing elements of the array are changed,
     * or deleted, their value as passed to <code>callback</code> will be the value at the time
     * <code>map</code> visits them; elements that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function produce an element of the new Array from an element of the current one.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {BaseArray} A new array which contains the return values of every item executed through the given function
     */
    map : null,
    /**
     * Tests whether some element in the array passes the test implemented by the provided function.
     *
     * <code>some</code> executes the <code>callback</code> function once for each element present in
     * the array until it finds one where <code>callback</code> returns a true value. If such an element
     * is found, <code>some</code> immediately returns <code>true</code>. Otherwise, <code>some</code>
     * returns <code>false</code>. <code>callback</code> is invoked only for indexes of the array which
     * have assigned values; it is not invoked for indexes which have been deleted or which have never
     * been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of the
     * element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>some</code>, it will be used as the
     * <code>this</code> for each invocation of the <code>callback</code>. If it is not provided, or is
     * <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>some</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>some</code> is set before the first invocation of
     * <code>callback</code>.  Elements that are appended to the array after the call to <code>some</code>
     * begins will not be visited by <code>callback</code>. If an existing, unvisited element of the array
     * is changed by <code>callback</code>, its value passed to the visiting <code>callback</code> will
     * be the value at the time that <code>some</code> visits that element's index; elements that are
     * deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test for each element.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Boolean} Whether at least one elements passed the test
     */
    some : null,
    /**
     * Tests whether all elements in the array pass the test implemented by the provided function.
     *
     * <code>every</code> executes the provided <code>callback</code> function once for each element
     * present in the array until it finds one where <code>callback</code> returns a false value. If
     * such an element is found, the <code>every</code> method immediately returns <code>false</code>.
     * Otherwise, if <code>callback</code> returned a true value for all elements, <code>every</code>
     * will return <code>true</code>.  <code>callback</code> is invoked only for indexes of the array
     * which have assigned values; it is not invoked for indexes which have been deleted or which have
     * never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of
     * the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>every</code>, it will be used as
     * the <code>this</code> for each invocation of the <code>callback</code>. If it is not provided,
     * or is <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>every</code> does not mutate the array on which it is called. The range of elements processed
     * by <code>every</code> is set before the first invocation of <code>callback</code>. Elements which
     * are appended to the array after the call to <code>every</code> begins will not be visited by
     * <code>callback</code>.  If existing elements of the array are changed, their value as passed
     * to <code>callback</code> will be the value at the time <code>every</code> visits them; elements
     * that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test for each element.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Boolean} Whether all elements passed the test
     */
    every : null
  }
});
(function(){

  function createStackConstructor(stack){

    // In IE don't inherit from Array but use an empty object as prototype
    // and copy the methods from Array
    if((qx.core.Environment.get("engine.name") == "mshtml")){

      Stack.prototype = {
        length : 0,
        $$isArray : true
      };
      var args = "pop.push.reverse.shift.sort.splice.unshift.join.slice".split(".");
      for(var length = args.length;length;){

        Stack.prototype[args[--length]] = Array.prototype[args[length]];
      };
    };
    // Remember Array's slice method
    var slice = Array.prototype.slice;
    // Fix "concat" method
    Stack.prototype.concat = function(){

      var constructor = this.slice(0);
      for(var i = 0,length = arguments.length;i < length;i++){

        var copy;
        if(arguments[i] instanceof Stack){

          copy = slice.call(arguments[i], 0);
        } else if(arguments[i] instanceof Array){

          copy = arguments[i];
        } else {

          copy = [arguments[i]];
        };
        constructor.push.apply(constructor, copy);
      };
      return constructor;
    };
    // Fix "toString" method
    Stack.prototype.toString = function(){

      return slice.call(this, 0).toString();
    };
    // Fix "toLocaleString"
    Stack.prototype.toLocaleString = function(){

      return slice.call(this, 0).toLocaleString();
    };
    // Fix constructor
    Stack.prototype.constructor = Stack;
    // Add JS 1.6 Array features
    Stack.prototype.indexOf = qx.lang.Core.arrayIndexOf;
    Stack.prototype.lastIndexOf = qx.lang.Core.arrayLastIndexOf;
    Stack.prototype.forEach = qx.lang.Core.arrayForEach;
    Stack.prototype.some = qx.lang.Core.arraySome;
    Stack.prototype.every = qx.lang.Core.arrayEvery;
    var filter = qx.lang.Core.arrayFilter;
    var map = qx.lang.Core.arrayMap;
    // Fix methods which generates a new instance
    // to return an instance of the same class
    Stack.prototype.filter = function(){

      var ret = new this.constructor;
      ret.push.apply(ret, filter.apply(this, arguments));
      return ret;
    };
    Stack.prototype.map = function(){

      var ret = new this.constructor;
      ret.push.apply(ret, map.apply(this, arguments));
      return ret;
    };
    Stack.prototype.slice = function(){

      var ret = new this.constructor;
      ret.push.apply(ret, Array.prototype.slice.apply(this, arguments));
      return ret;
    };
    Stack.prototype.splice = function(){

      var ret = new this.constructor;
      ret.push.apply(ret, Array.prototype.splice.apply(this, arguments));
      return ret;
    };
    // Add new "toArray" method for convert a base array to a native Array
    Stack.prototype.toArray = function(){

      return Array.prototype.slice.call(this, 0);
    };
    // Add valueOf() to return the length
    Stack.prototype.valueOf = function(){

      return this.length;
    };
    // Return final class
    return Stack;
  };
  function Stack(length){

    if(arguments.length === 1 && typeof length === "number"){

      this.length = -1 < length && length === length >> .5 ? length : this.push(length);
    } else if(arguments.length){

      this.push.apply(this, arguments);
    };
  };
  function PseudoArray(){
  };
  PseudoArray.prototype = [];
  Stack.prototype = new PseudoArray;
  Stack.prototype.length = 0;
  qx.type.BaseArray = createStackConstructor(Stack);
})();

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * The Core module's responsibility is to query the DOM for elements and offer
 * these elements as a collection. The Core module itself does not offer any methods to
 * work with the collection. These methods are added by the other included modules,
 * such as Manipulating or Attributes.
 *
 * Core also provides the plugin API which allows modules to attach either
 * static functions to the global <code>q</code> object or define methods on the
 * collection it returns.
 *
 * For further details, take a look at the documentation in the
 * <a href='http://manual.qooxdoo.org/${qxversion}/pages/website.html' target='_blank'>user manual</a>.
 */
qx.Bootstrap.define("q", {
  extend : qx.type.BaseArray,
  statics : {
    // internal storage for all initializers
    __init : [],
    // internal reference to the used qx namespace
    $$qx : qx,
    /**
     * Internal helper to initialize collections.
     *
     * @param arg {var} An array of Elements which will
     *   be initialized as {@link q}. All items in the array which are not
     *   either a window object or a node object will be ignored.
     * @return {q} A new initialized collection.
     */
    $init : function(arg){

      var clean = [];
      for(var i = 0;i < arg.length;i++){

        var isNode = !!(arg[i] && arg[i].nodeType != null);
        if(isNode){

          clean.push(arg[i]);
          continue;
        };
        var isWindow = !!(arg[i] && arg[i].history && arg[i].location && arg[i].document);
        if(isWindow){

          clean.push(arg[i]);
        };
      };
      // check for node or window object
      var col = qx.lang.Array.cast(clean, q);
      for(var i = 0;i < q.__init.length;i++){

        q.__init[i].call(col);
      };
      return col;
    },
    /**
     * This is an API for module development and can be used to attach new methods
     * to {@link q}.
     *
     * @param module {Map} A map containing the methods to attach.
     */
    $attach : function(module){

      for(var name in module){

        {
        };
        q.prototype[name] = module[name];
      };
    },
    /**
     * This is an API for module development and can be used to attach new methods
     * to {@link q}.
     *
     * @param module {Map} A map containing the methods to attach.
     */
    $attachStatic : function(module){

      for(var name in module){

        {
        };
        q[name] = module[name];
      };
    },
    /**
     * This is an API for module development and can be used to attach new initialization
     * methods to {@link q} which will be called when a new collection is
     * created.
     *
     * @param init {Function} The initialization method for a module.
     */
    $attachInit : function(init){

      this.__init.push(init);
    },
    /**
     * Define a new class using the qooxdoo class system.
     *
     * @signature function(name, config)
     * @param name {String?} Name of the class. If null, the class will not be
     *   attached to a namespace.
     * @param config {Map} Class definition structure.
     * @return {Function} The defined class.
     */
    define : function(name, config){

      if(config == undefined){

        config = name;
        name = null;
      };
      return qx.Bootstrap.define.call(qx.Bootstrap, name, config);
    }
  },
  /**
   * Accepts a selector string and returns a set of found items. The optional context
   * element can be used to reduce the amount of found elements to children of the
   * context element.
   *
   * <a href="http://sizzlejs.com/" target="_blank">Sizzle</a> is used as selector engine.
   * Check out the <a href="https://github.com/jquery/sizzle/wiki/Sizzle-Home" target="_blank">documentation</a>
   * for more details.
   *
   * @param selector {String|Element|Array} Valid selector (CSS3 + extensions)
   *   or DOM element or Array of DOM Elements.
   * @param context {Element} Only the children of this element are considered.
   * @return {q} A collection of DOM elements.
   */
  construct : function(selector, context){

    if(!selector && this instanceof q){

      return this;
    };
    if(qx.Bootstrap.isString(selector)){

      selector = qx.bom.Selector.query(selector, context);
    } else if(!(qx.Bootstrap.isArray(selector))){

      selector = [selector];
    };
    return q.$init(selector);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

   ======================================================================

   This class contains code based on the following work:

   * jQuery
     http://jquery.com
     Version 1.3.1

     Copyright:
       2009 John Resig

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/* ************************************************************************

#ignore(qx.data.IListData)
#ignore(qx.Class)

************************************************************************ */
/**
 * Static helper functions for arrays with a lot of often used convenience
 * methods like <code>remove</code> or <code>contains</code>.
 *
 * The native JavaScript Array is not modified by this class. However,
 * there are modifications to the native Array in {@link qx.lang.Core} for
 * browsers that do not support certain JavaScript 1.6 features natively .
 *
 * The string/array generics introduced in JavaScript 1.6 are supported by
 * {@link qx.lang.Generics}.
 */
qx.Bootstrap.define("qx.lang.Array", {
  statics : {
    /**
     * Converts array like constructions like the <code>argument</code> object,
     * node collections like the ones returned by <code>getElementsByTagName</code>
     * or extended array objects like <code>qx.type.BaseArray</code> to an
     * native Array instance.
     *
     * @param object {var} any array like object
     * @param offset {Integer?0} position to start from
     * @return {Array} New array with the content of the incoming object
     */
    toArray : function(object, offset){

      return this.cast(object, Array, offset);
    },
    /**
     * Converts an array like object to any other array like
     * object.
     *
     * Attention: The returned array may be same
     * instance as the incoming one if the constructor is identical!
     *
     * @param object {var} any array-like object
     * @param constructor {Function} constructor of the new instance
     * @param offset {Integer?0} position to start from
     * @return {Array} the converted array
     */
    cast : function(object, constructor, offset){

      if(object.constructor === constructor){

        return object;
      };
      if(qx.data && qx.data.IListData){

        if(qx.Class && qx.Class.hasInterface(object, qx.data.IListData)){

          var object = object.toArray();
        };
      };
      // Create from given constructor
      var ret = new constructor;
      // Some collections in mshtml are not able to be sliced.
      // These lines are a special workaround for this client.
      if((qx.core.Environment.get("engine.name") == "mshtml")){

        if(object.item){

          for(var i = offset || 0,l = object.length;i < l;i++){

            ret.push(object[i]);
          };
          return ret;
        };
      };
      // Copy over items
      if(Object.prototype.toString.call(object) === "[object Array]" && offset == null){

        ret.push.apply(ret, object);
      } else {

        ret.push.apply(ret, Array.prototype.slice.call(object, offset || 0));
      };
      return ret;
    },
    /**
     * Convert an arguments object into an array.
     *
     * @param args {arguments} arguments object
     * @param offset {Integer?0} position to start from
     * @return {Array} a newly created array (copy) with the content of the arguments object.
     */
    fromArguments : function(args, offset){

      return Array.prototype.slice.call(args, offset || 0);
    },
    /**
     * Convert a (node) collection into an array
     *
     * @param coll {var} node collection
     * @return {Array} a newly created array (copy) with the content of the node collection.
     */
    fromCollection : function(coll){

      // Some collection is mshtml are not able to be sliced.
      // This lines are a special workaround for this client.
      if((qx.core.Environment.get("engine.name") == "mshtml")){

        if(coll.item){

          var arr = [];
          for(var i = 0,l = coll.length;i < l;i++){

            arr[i] = coll[i];
          };
          return arr;
        };
      };
      return Array.prototype.slice.call(coll, 0);
    },
    /**
     * Expand shorthand definition to a four element list.
     * This is an utility function for padding/margin and all other shorthand handling.
     *
     * @param input {Array} arr with one to four elements
     * @return {Array} an arr with four elements
     */
    fromShortHand : function(input){

      var len = input.length;
      var result = qx.lang.Array.clone(input);
      // Copy Values (according to the length)
      switch(len){case 1:
      result[1] = result[2] = result[3] = result[0];
      break;case 2:
      result[2] = result[0];// no break here
      case 3:
      result[3] = result[1];};
      // Return list with 4 items
      return result;
    },
    /**
     * Return a copy of the given array
     *
     * @param arr {Array} the array to copy
     * @return {Array} copy of the array
     */
    clone : function(arr){

      return arr.concat();
    },
    /**
     * Insert an element at a given position into the array
     *
     * @param arr {Array} the array
     * @param obj {var} the element to insert
     * @param i {Integer} position where to insert the element into the array
     * @return {Array} the array
     */
    insertAt : function(arr, obj, i){

      arr.splice(i, 0, obj);
      return arr;
    },
    /**
     * Insert an element into the array before a given second element.
     *
     * @param arr {Array} the array
     * @param obj {var} object to be inserted
     * @param obj2 {var} insert obj1 before this object
     * @return {Array} the array
     */
    insertBefore : function(arr, obj, obj2){

      var i = arr.indexOf(obj2);
      if(i == -1){

        arr.push(obj);
      } else {

        arr.splice(i, 0, obj);
      };
      return arr;
    },
    /**
     * Insert an element into the array after a given second element.
     *
     * @param arr {Array} the array
     * @param obj {var} object to be inserted
     * @param obj2 {var} insert obj1 after this object
     * @return {Array} the array
     */
    insertAfter : function(arr, obj, obj2){

      var i = arr.indexOf(obj2);
      if(i == -1 || i == (arr.length - 1)){

        arr.push(obj);
      } else {

        arr.splice(i + 1, 0, obj);
      };
      return arr;
    },
    /**
     * Remove an element from the array at the given index
     *
     * @param arr {Array} the array
     * @param i {Integer} index of the element to be removed
     * @return {var} The removed element.
     */
    removeAt : function(arr, i){

      return arr.splice(i, 1)[0];
    },
    /**
     * Remove all elements from the array
     *
     * @param arr {Array} the array
     * @return {Array} empty array
     */
    removeAll : function(arr){

      arr.length = 0;
      return this;
    },
    /**
     * Append the elements of an array to the array
     *
     * @param arr1 {Array} the array
     * @param arr2 {Array} the elements of this array will be appended to other one
     * @return {Array} The modified array.
     * @throws an exception if one of the arguments is not an array
     */
    append : function(arr1, arr2){

      {
      };
      Array.prototype.push.apply(arr1, arr2);
      return arr1;
    },
    /**
     * Modifies the first array as it removes all elements
     * which are listed in the second array as well.
     *
     * @param arr1 {Array} the array
     * @param arr2 {Array} the elements of this array will be excluded from the other one
     * @return {Array} The modified array.
     * @throws an exception if one of the arguments is not an array
     */
    exclude : function(arr1, arr2){

      {
      };
      for(var i = 0,il = arr2.length,index;i < il;i++){

        index = arr1.indexOf(arr2[i]);
        if(index != -1){

          arr1.splice(index, 1);
        };
      };
      return arr1;
    },
    /**
     * Remove an element from the array.
     *
     * @param arr {Array} the array
     * @param obj {var} element to be removed from the array
     * @return {var} the removed element
     */
    remove : function(arr, obj){

      var i = arr.indexOf(obj);
      if(i != -1){

        arr.splice(i, 1);
        return obj;
      };
    },
    /**
     * Whether the array contains the given element
     *
     * @param arr {Array} the array
     * @param obj {var} object to look for
     * @return {Boolean} whether the arr contains the element
     */
    contains : function(arr, obj){

      return arr.indexOf(obj) !== -1;
    },
    /**
     * Check whether the two arrays have the same content. Checks only the
     * equality of the arrays' content.
     *
     * @param arr1 {Array} first array
     * @param arr2 {Array} second array
     * @return {Boolean} Whether the two arrays are equal
     */
    equals : function(arr1, arr2){

      var length = arr1.length;
      if(length !== arr2.length){

        return false;
      };
      for(var i = 0;i < length;i++){

        if(arr1[i] !== arr2[i]){

          return false;
        };
      };
      return true;
    },
    /**
     * Returns the sum of all values in the given array. Supports
     * numeric values only.
     *
     * @param arr {Number[]} Array to process
     * @return {Number} The sum of all values.
     */
    sum : function(arr){

      var result = 0;
      for(var i = 0,l = arr.length;i < l;i++){

        result += arr[i];
      };
      return result;
    },
    /**
     * Returns the highest value in the given array. Supports
     * numeric values only.
     *
     * @param arr {Number[]} Array to process
     * @return {Number | null} The highest of all values or undefined if array is empty.
     */
    max : function(arr){

      {
      };
      var i,len = arr.length,result = arr[0];
      for(i = 1;i < len;i++){

        if(arr[i] > result){

          result = arr[i];
        };
      };
      return result === undefined ? null : result;
    },
    /**
     * Returns the lowest value in the given array. Supports
     * numeric values only.
     *
     * @param arr {Number[]} Array to process
     * @return {Number | null} The lowest of all values or undefined if array is empty.
     */
    min : function(arr){

      {
      };
      var i,len = arr.length,result = arr[0];
      for(i = 1;i < len;i++){

        if(arr[i] < result){

          result = arr[i];
        };
      };
      return result === undefined ? null : result;
    },
    /**
     * Recreates an array which is free of all duplicate elements from the original.
     *
     * This method do not modifies the original array!
     *
     * Keep in mind that this methods deletes undefined indexes.
     *
     * @param arr {Array} Incoming array
     * @return {Array} Returns a copy with no duplicates or the original array if no duplicates were found
     */
    unique : function(arr){

      var ret = [],doneStrings = {
      },doneNumbers = {
      },doneObjects = {
      };
      var value,count = 0;
      var key = "qx" + qx.lang.Date.now();
      var hasNull = false,hasFalse = false,hasTrue = false;
      // Rebuild array and omit duplicates
      for(var i = 0,len = arr.length;i < len;i++){

        value = arr[i];
        // Differ between null, primitives and reference types
        if(value === null){

          if(!hasNull){

            hasNull = true;
            ret.push(value);
          };
        } else if(value === undefined){
        } else if(value === false){

          if(!hasFalse){

            hasFalse = true;
            ret.push(value);
          };
        } else if(value === true){

          if(!hasTrue){

            hasTrue = true;
            ret.push(value);
          };
        } else if(typeof value === "string"){

          if(!doneStrings[value]){

            doneStrings[value] = 1;
            ret.push(value);
          };
        } else if(typeof value === "number"){

          if(!doneNumbers[value]){

            doneNumbers[value] = 1;
            ret.push(value);
          };
        } else {

          var hash = value[key];
          if(hash == null){

            hash = value[key] = count++;
          };
          if(!doneObjects[hash]){

            doneObjects[hash] = value;
            ret.push(value);
          };
        };;;;;
      };
      // Clear object hashs
      for(var hash in doneObjects){

        try{

          // TODO: The following delete seems to fail in IE7
          delete doneObjects[hash][key];
        } catch(ex) {

          try{

            doneObjects[hash][key] = null;
          } catch(ex) {

            throw new Error("Cannot clean-up map entry doneObjects[" + hash + "][" + key + "]");
          };
        };
      };
      return ret;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 Sebastian Werner, http://sebastian-werner.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * jQuery
     http://jquery.com
     Version 1.3.1

     Copyright:
       2009 John Resig

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/**
 * Helper functions for dates.
 *
 * The native JavaScript Date is not modified by this class.
 */
qx.Bootstrap.define("qx.lang.Date", {
  statics : {
    /**
     * Returns the current time
     *
     * @return {Integer} Time in ms from 1970.
     */
    now : function(){

      return +new Date;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008-2010 Sebastian Werner, http://sebastian-werner.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)
     * Andreas Ecker (ecker)

   ======================================================================

   This class contains code based on the following work:

   * Sizzle CSS Selector Engine - v1.5.1

     Homepage:
       http://sizzlejs.com/

     Documentation:
       http://wiki.github.com/jeresig/sizzle

     Discussion:
       http://groups.google.com/group/sizzlejs

     Code:
       http://github.com/jeresig/sizzle/tree

     Copyright:
       (c) 2009, The Dojo Foundation

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   ----------------------------------------------------------------------

     Copyright (c) 2009 John Resig

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation files
     (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

   ----------------------------------------------------------------------

     Version:
       Snapshot taken on 2011-03-15, latest Sizzle commit on 2011-02-18:
       commit  ef19279f54ba49242c6461d47577c703f4f4e80e

************************************************************************ */
/**
 * The selector engine supports virtually all CSS 3 Selectors  – this even
 * includes some parts that are infrequently implemented such as escaped
 * selectors (<code>.foo\\+bar</code>), Unicode selectors, and results returned
 * in document order. There are a few notable exceptions to the CSS 3 selector
 * support:
 *
 * * <code>:root</code>
 * * <code>:target</code>
 * * <code>:nth-last-child</code>
 * * <code>:nth-of-type</code>
 * * <code>:nth-last-of-type</code>
 * * <code>:first-of-type</code>
 * * <code>:last-of-type</code>
 * * <code>:only-of-type</code>
 * * <code>:lang()</code>
 *
 * In addition to the CSS 3 Selectors the engine supports the following
 * additional selectors or conventions.
 *
 * *Changes*
 *
 * * <code>:not(a.b)</code>: Supports non-simple selectors in <code>:not()</code> (most browsers only support <code>:not(a)</code>, for example).
 * * <code>:not(div > p)</code>: Supports full selectors in <code>:not()</code>.
 * * <code>:not(div, p)</code>: Supports multiple selectors in <code>:not()</code>.
 * * <code>[NAME=VALUE]</code>: Doesn't require quotes around the specified value in an attribute selector.
 *
 * *Additions*
 *
 * * <code>[NAME!=VALUE]</code>: Finds all elements whose <code>NAME</code> attribute doesn't match the specified value. Is equivalent to doing <code>:not([NAME=VALUE])</code>.
 * * <code>:contains(TEXT)</code>: Finds all elements whose textual context contains the word <code>TEXT</code> (case sensitive).
 * * <code>:header</code>: Finds all elements that are a header element (h1, h2, h3, h4, h5, h6).
 * * <code>:parent</code>: Finds all elements that contains another element.
 *
 * *Positional Selector Additions*
 *
 * * <code>:first</code>/</code>:last</code>: Finds the first or last matching element on the page. (e.g. <code>div:first</code> would find the first div on the page, in document order)
 * * <code>:even</code>/<code>:odd</code>: Finds every other element on the page (counting begins at 0, so <code>:even</code> would match the first element).
 * * <code>:eq</code>/<code>:nth</code>: Finds the Nth element on the page (e.g. <code>:eq(5)</code> finds the 6th element on the page).
 * * <code>:lt</code>/<code>:gt</code>: Finds all elements at positions less than or greater than the specified positions.
 *
 * *Form Selector Additions*
 *
 * * <code>:input</code>: Finds all input elements (includes textareas, selects, and buttons).
 * * <code>:text</code>, <code>:checkbox</code>, <code>:file</code>, <code>:password</code>, <code>:submit</code>, <code>:image</code>, <code>:reset</code>, <code>:button</code>: Finds the input element with the specified input type (<code>:button</code> also finds button elements).
 *
 * Based on Sizzle by John Resig, see:
 *
 * * http://sizzlejs.com/
 *
 * For further usage details also have a look at the wiki page at:
 *
 * * https://github.com/jquery/sizzle/wiki/Sizzle-Home
 */
qx.Bootstrap.define("qx.bom.Selector", {
  statics : {
    /**
     * Queries the document for the given selector. Supports all CSS3 selectors
     * plus some extensions as mentioned in the class description.
     *
     * @signature function(selector, context)
     * @param selector {String} Valid selector (CSS3 + extensions)
     * @param context {Element} Context element (result elements must be children of this element)
     * @return {Array} Matching elements
     */
    query : null,
    /**
     * Returns an reduced array which only contains the elements from the given
     * array which matches the given selector
     *
     * @signature function(selector, set)
     * @param selector {String} Selector to filter given set
     * @param set {Array} List to filter according to given selector
     * @return {Array} New array containing matching elements
     */
    matches : null
  }
});
(function(){

  var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done = 0,toString = Object.prototype.toString,hasDuplicate = false,baseHasDuplicate = true,rBackslash = /\\/g,rNonWord = /\W/;
  [0, 0].sort(function(){

    baseHasDuplicate = false;
    return 0;
  });
  var Sizzle = function(selector, context, results, seed){

    results = results || [];
    context = context || document;
    var origContext = context;
    if(context.nodeType !== 1 && context.nodeType !== 9){

      return [];
    };
    if(!selector || typeof selector !== "string"){

      return results;
    };
    var m,set,checkSet,extra,ret,cur,pop,i,prune = true,contextXML = Sizzle.isXML(context),parts = [],soFar = selector;
    // Reset the position of the chunker regexp (start from head)
    do {

      chunker.exec("");
      m = chunker.exec(soFar);
      if(m){

        soFar = m[3];
        parts.push(m[1]);
        if(m[2]){

          extra = m[3];
          break;
        };
      };
    }while(m);
    if(parts.length > 1 && origPOS.exec(selector)){

      if(parts.length === 2 && Expr.relative[parts[0]]){

        set = posProcess(parts[0] + parts[1], context);
      } else {

        set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
        while(parts.length){

          selector = parts.shift();
          if(Expr.relative[selector]){

            selector += parts.shift();
          };
          set = posProcess(selector, set);
        };
      };
    } else {

      // Take a shortcut and set the context if the root selector is an ID
      // (but not if it'll be faster if the inner selector is an ID)
      if(!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])){

        ret = Sizzle.find(parts.shift(), context, contextXML);
        context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
      };
      if(context){

        ret = seed ? {
          expr : parts.pop(),
          set : makeArray(seed)
        } : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
        set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
        if(parts.length > 0){

          checkSet = makeArray(set);
        } else {

          prune = false;
        };
        while(parts.length){

          cur = parts.pop();
          pop = cur;
          if(!Expr.relative[cur]){

            cur = "";
          } else {

            pop = parts.pop();
          };
          if(pop == null){

            pop = context;
          };
          Expr.relative[cur](checkSet, pop, contextXML);
        };
      } else {

        checkSet = parts = [];
      };
    };
    if(!checkSet){

      checkSet = set;
    };
    if(!checkSet){

      Sizzle.error(cur || selector);
    };
    if(toString.call(checkSet) === "[object Array]"){

      if(!prune){

        results.push.apply(results, checkSet);
      } else if(context && context.nodeType === 1){

        for(i = 0;checkSet[i] != null;i++){

          if(checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))){

            results.push(set[i]);
          };
        };
      } else {

        for(i = 0;checkSet[i] != null;i++){

          if(checkSet[i] && checkSet[i].nodeType === 1){

            results.push(set[i]);
          };
        };
      };
    } else {

      makeArray(checkSet, results);
    };
    if(extra){

      Sizzle(extra, origContext, results, seed);
      Sizzle.uniqueSort(results);
    };
    return results;
  };
  Sizzle.uniqueSort = function(results){

    if(sortOrder){

      hasDuplicate = baseHasDuplicate;
      results.sort(sortOrder);
      if(hasDuplicate){

        for(var i = 1;i < results.length;i++){

          if(results[i] === results[i - 1]){

            results.splice(i--, 1);
          };
        };
      };
    };
    return results;
  };
  Sizzle.matches = function(expr, set){

    return Sizzle(expr, null, null, set);
  };
  Sizzle.matchesSelector = function(node, expr){

    return Sizzle(expr, null, null, [node]).length > 0;
  };
  Sizzle.find = function(expr, context, isXML){

    var set;
    if(!expr){

      return [];
    };
    for(var i = 0,l = Expr.order.length;i < l;i++){

      var match,type = Expr.order[i];
      if((match = Expr.leftMatch[type].exec(expr))){

        var left = match[1];
        match.splice(1, 1);
        if(left.substr(left.length - 1) !== "\\"){

          match[1] = (match[1] || "").replace(rBackslash, "");
          set = Expr.find[type](match, context, isXML);
          if(set != null){

            expr = expr.replace(Expr.match[type], "");
            break;
          };
        };
      };
    };
    if(!set){

      set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : [];
    };
    return {
      set : set,
      expr : expr
    };
  };
  Sizzle.filter = function(expr, set, inplace, not){

    var match,anyFound,old = expr,result = [],curLoop = set,isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
    while(expr && set.length){

      for(var type in Expr.filter){

        if((match = Expr.leftMatch[type].exec(expr)) != null && match[2]){

          var found,item,filter = Expr.filter[type],left = match[1];
          anyFound = false;
          match.splice(1, 1);
          if(left.substr(left.length - 1) === "\\"){

            continue;
          };
          if(curLoop === result){

            result = [];
          };
          if(Expr.preFilter[type]){

            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
            if(!match){

              anyFound = found = true;
            } else if(match === true){

              continue;
            };
          };
          if(match){

            for(var i = 0;(item = curLoop[i]) != null;i++){

              if(item){

                found = filter(item, match, i, curLoop);
                var pass = not ^ !!found;
                if(inplace && found != null){

                  if(pass){

                    anyFound = true;
                  } else {

                    curLoop[i] = false;
                  };
                } else if(pass){

                  result.push(item);
                  anyFound = true;
                };
              };
            };
          };
          if(found !== undefined){

            if(!inplace){

              curLoop = result;
            };
            expr = expr.replace(Expr.match[type], "");
            if(!anyFound){

              return [];
            };
            break;
          };
        };
      };
      // Improper expression
      if(expr === old){

        if(anyFound == null){

          Sizzle.error(expr);
        } else {

          break;
        };
      };
      old = expr;
    };
    return curLoop;
  };
  Sizzle.error = function(msg){

    throw "Syntax error, unrecognized expression: " + msg;
  };
  var Expr = Sizzle.selectors = {
    order : ["ID", "NAME", "TAG"],
    match : {
      ID : /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
      CLASS : /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
      NAME : /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
      ATTR : /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
      TAG : /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
      CHILD : /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
      POS : /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
      PSEUDO : /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
    },
    leftMatch : {
    },
    attrMap : {
      "class" : "className",
      "for" : "htmlFor"
    },
    attrHandle : {
      href : function(elem){

        return elem.getAttribute("href");
      },
      type : function(elem){

        return elem.getAttribute("type");
      }
    },
    relative : {
      "+" : function(checkSet, part){

        var isPartStr = typeof part === "string",isTag = isPartStr && !rNonWord.test(part),isPartStrNotTag = isPartStr && !isTag;
        if(isTag){

          part = part.toLowerCase();
        };
        for(var i = 0,l = checkSet.length,elem;i < l;i++){

          if((elem = checkSet[i])){

            while((elem = elem.previousSibling) && elem.nodeType !== 1){
            };
            checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
          };
        };
        if(isPartStrNotTag){

          Sizzle.filter(part, checkSet, true);
        };
      },
      ">" : function(checkSet, part){

        var elem,isPartStr = typeof part === "string",i = 0,l = checkSet.length;
        if(isPartStr && !rNonWord.test(part)){

          part = part.toLowerCase();
          for(;i < l;i++){

            elem = checkSet[i];
            if(elem){

              var parent = elem.parentNode;
              checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
            };
          };
        } else {

          for(;i < l;i++){

            elem = checkSet[i];
            if(elem){

              checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
            };
          };
          if(isPartStr){

            Sizzle.filter(part, checkSet, true);
          };
        };
      },
      "" : function(checkSet, part, isXML){

        var nodeCheck,doneName = done++,checkFn = dirCheck;
        if(typeof part === "string" && !rNonWord.test(part)){

          part = part.toLowerCase();
          nodeCheck = part;
          checkFn = dirNodeCheck;
        };
        checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
      },
      "~" : function(checkSet, part, isXML){

        var nodeCheck,doneName = done++,checkFn = dirCheck;
        if(typeof part === "string" && !rNonWord.test(part)){

          part = part.toLowerCase();
          nodeCheck = part;
          checkFn = dirNodeCheck;
        };
        checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
      }
    },
    find : {
      ID : function(match, context, isXML){

        if(typeof context.getElementById !== "undefined" && !isXML){

          var m = context.getElementById(match[1]);
          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document #6963
          return m && m.parentNode ? [m] : [];
        };
      },
      NAME : function(match, context){

        if(typeof context.getElementsByName !== "undefined"){

          var ret = [],results = context.getElementsByName(match[1]);
          for(var i = 0,l = results.length;i < l;i++){

            if(results[i].getAttribute("name") === match[1]){

              ret.push(results[i]);
            };
          };
          return ret.length === 0 ? null : ret;
        };
      },
      TAG : function(match, context){

        if(typeof context.getElementsByTagName !== "undefined"){

          return context.getElementsByTagName(match[1]);
        };
      }
    },
    preFilter : {
      CLASS : function(match, curLoop, inplace, result, not, isXML){

        match = " " + match[1].replace(rBackslash, "") + " ";
        if(isXML){

          return match;
        };
        for(var i = 0,elem;(elem = curLoop[i]) != null;i++){

          if(elem){

            if(not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0)){

              if(!inplace){

                result.push(elem);
              };
            } else if(inplace){

              curLoop[i] = false;
            };
          };
        };
        return false;
      },
      ID : function(match){

        return match[1].replace(rBackslash, "");
      },
      TAG : function(match, curLoop){

        return match[1].replace(rBackslash, "").toLowerCase();
      },
      CHILD : function(match){

        if(match[1] === "nth"){

          if(!match[2]){

            Sizzle.error(match[0]);
          };
          match[2] = match[2].replace(/^\+|\s*/g, '');
          // parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
          var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
          // calculate the numbers (first)n+(last) including if they are negative
          match[2] = (test[1] + (test[2] || 1)) - 0;
          match[3] = test[3] - 0;
        } else if(match[2]){

          Sizzle.error(match[0]);
        };
        // TODO: Move to normal caching system
        match[0] = done++;
        return match;
      },
      ATTR : function(match, curLoop, inplace, result, not, isXML){

        var name = match[1] = match[1].replace(rBackslash, "");
        if(!isXML && Expr.attrMap[name]){

          match[1] = Expr.attrMap[name];
        };
        // Handle if an un-quoted value was used
        match[4] = (match[4] || match[5] || "").replace(rBackslash, "");
        if(match[2] === "~="){

          match[4] = " " + match[4] + " ";
        };
        return match;
      },
      PSEUDO : function(match, curLoop, inplace, result, not){

        if(match[1] === "not"){

          // If we're dealing with a complex expression, or a simple one
          if((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])){

            match[3] = Sizzle(match[3], null, null, curLoop);
          } else {

            var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
            if(!inplace){

              result.push.apply(result, ret);
            };
            return false;
          };
        } else if(Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])){

          return true;
        };
        return match;
      },
      POS : function(match){

        match.unshift(true);
        return match;
      }
    },
    filters : {
      enabled : function(elem){

        return elem.disabled === false && elem.type !== "hidden";
      },
      disabled : function(elem){

        return elem.disabled === true;
      },
      checked : function(elem){

        return elem.checked === true;
      },
      selected : function(elem){

        // Accessing this property makes selected-by-default
        // options in Safari work properly
        if(elem.parentNode){

          elem.parentNode.selectedIndex;
        };
        return elem.selected === true;
      },
      parent : function(elem){

        return !!elem.firstChild;
      },
      empty : function(elem){

        return !elem.firstChild;
      },
      has : function(elem, i, match){

        return !!Sizzle(match[3], elem).length;
      },
      header : function(elem){

        return (/h\d/i).test(elem.nodeName);
      },
      text : function(elem){

        // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
        // use getAttribute instead to test this case
        return "text" === elem.getAttribute('type');
      },
      radio : function(elem){

        return "radio" === elem.type;
      },
      checkbox : function(elem){

        return "checkbox" === elem.type;
      },
      file : function(elem){

        return "file" === elem.type;
      },
      password : function(elem){

        return "password" === elem.type;
      },
      submit : function(elem){

        return "submit" === elem.type;
      },
      image : function(elem){

        return "image" === elem.type;
      },
      reset : function(elem){

        return "reset" === elem.type;
      },
      button : function(elem){

        return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
      },
      input : function(elem){

        return (/input|select|textarea|button/i).test(elem.nodeName);
      }
    },
    setFilters : {
      first : function(elem, i){

        return i === 0;
      },
      last : function(elem, i, match, array){

        return i === array.length - 1;
      },
      even : function(elem, i){

        return i % 2 === 0;
      },
      odd : function(elem, i){

        return i % 2 === 1;
      },
      lt : function(elem, i, match){

        return i < match[3] - 0;
      },
      gt : function(elem, i, match){

        return i > match[3] - 0;
      },
      nth : function(elem, i, match){

        return match[3] - 0 === i;
      },
      eq : function(elem, i, match){

        return match[3] - 0 === i;
      }
    },
    filter : {
      PSEUDO : function(elem, match, i, array){

        var name = match[1],filter = Expr.filters[name];
        if(filter){

          return filter(elem, i, match, array);
        } else if(name === "contains"){

          return (elem.textContent || elem.innerText || Sizzle.getText([elem]) || "").indexOf(match[3]) >= 0;
        } else if(name === "not"){

          var not = match[3];
          for(var j = 0,l = not.length;j < l;j++){

            if(not[j] === elem){

              return false;
            };
          };
          return true;
        } else {

          Sizzle.error(name);
        };;
      },
      CHILD : function(elem, match){

        var type = match[1],node = elem;
        switch(type){case "only":case "first":
        while((node = node.previousSibling)){

          if(node.nodeType === 1){

            return false;
          };
        };
        if(type === "first"){

          return true;
        };
        node = elem;case "last":
        while((node = node.nextSibling)){

          if(node.nodeType === 1){

            return false;
          };
        };
        return true;case "nth":
        var first = match[2],last = match[3];
        if(first === 1 && last === 0){

          return true;
        };
        var doneName = match[0],parent = elem.parentNode;
        if(parent && (parent.sizcache !== doneName || !elem.nodeIndex)){

          var count = 0;
          for(node = parent.firstChild;node;node = node.nextSibling){

            if(node.nodeType === 1){

              node.nodeIndex = ++count;
            };
          };
          parent.sizcache = doneName;
        };
        var diff = elem.nodeIndex - last;
        if(first === 0){

          return diff === 0;
        } else {

          return (diff % first === 0 && diff / first >= 0);
        };};
      },
      ID : function(elem, match){

        return elem.nodeType === 1 && elem.getAttribute("id") === match;
      },
      TAG : function(elem, match){

        return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
      },
      CLASS : function(elem, match){

        return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
      },
      ATTR : function(elem, match){

        var name = match[1],result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name),value = result + "",type = match[2],check = match[4];
        return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
      },
      POS : function(elem, match, i, array){

        var name = match[2],filter = Expr.setFilters[name];
        if(filter){

          return filter(elem, i, match, array);
        };
      }
    }
  };
  var origPOS = Expr.match.POS,fescape = function(all, num){

    return "\\" + (num - 0 + 1);
  };
  for(var type in Expr.match){

    Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
    Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
  };
  var makeArray = function(array, results){

    array = Array.prototype.slice.call(array, 0);
    if(results){

      results.push.apply(results, array);
      return results;
    };
    return array;
  };
  // Perform a simple check to determine if the browser is capable of
  // converting a NodeList to an array using builtin methods.
  // Also verifies that the returned array holds DOM nodes
  // (which is not the case in the Blackberry browser)
  try{

    Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
  } catch(e) {

    makeArray = function(array, results){

      var i = 0,ret = results || [];
      if(toString.call(array) === "[object Array]"){

        Array.prototype.push.apply(ret, array);
      } else {

        if(typeof array.length === "number"){

          for(var l = array.length;i < l;i++){

            ret.push(array[i]);
          };
        } else {

          for(;array[i];i++){

            ret.push(array[i]);
          };
        };
      };
      return ret;
    };
  };
  var sortOrder,siblingCheck;
  if(document.documentElement.compareDocumentPosition){

    sortOrder = function(a, b){

      if(a === b){

        hasDuplicate = true;
        return 0;
      };
      if(!a.compareDocumentPosition || !b.compareDocumentPosition){

        return a.compareDocumentPosition ? -1 : 1;
      };
      return a.compareDocumentPosition(b) & 4 ? -1 : 1;
    };
  } else {

    sortOrder = function(a, b){

      var al,bl,ap = [],bp = [],aup = a.parentNode,bup = b.parentNode,cur = aup;
      // The nodes are identical, we can exit early
      if(a === b){

        hasDuplicate = true;
        return 0;
      } else if(aup === bup){

        return siblingCheck(a, b);
      } else if(!aup){

        return -1;
      } else if(!bup){

        return 1;
      };;;
      // Otherwise they're somewhere else in the tree so we need
      // to build up a full list of the parentNodes for comparison
      while(cur){

        ap.unshift(cur);
        cur = cur.parentNode;
      };
      cur = bup;
      while(cur){

        bp.unshift(cur);
        cur = cur.parentNode;
      };
      al = ap.length;
      bl = bp.length;
      // Start walking down the tree looking for a discrepancy
      for(var i = 0;i < al && i < bl;i++){

        if(ap[i] !== bp[i]){

          return siblingCheck(ap[i], bp[i]);
        };
      };
      // We ended someplace up the tree so do a sibling check
      return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
    };
    siblingCheck = function(a, b, ret){

      if(a === b){

        return ret;
      };
      var cur = a.nextSibling;
      while(cur){

        if(cur === b){

          return -1;
        };
        cur = cur.nextSibling;
      };
      return 1;
    };
  };
  // Utility function for retreiving the text value of an array of DOM nodes
  Sizzle.getText = function(elems){

    var ret = "",elem;
    for(var i = 0;elems[i];i++){

      elem = elems[i];
      // Get the text from text nodes and CDATA nodes
      if(elem.nodeType === 3 || elem.nodeType === 4){

        ret += elem.nodeValue;
      } else if(elem.nodeType !== 8){

        ret += Sizzle.getText(elem.childNodes);
      };
    };
    return ret;
  };
  (function(){

    // We're going to inject a fake input element with a specified name
    var form = document.createElement("div"),id = "script" + (new Date()).getTime(),root = document.documentElement;
    form.innerHTML = "<a name='" + id + "'/>";
    // Inject it into the root element, check its status, and remove it quickly
    root.insertBefore(form, root.firstChild);
    // The workaround has to do additional checks after a getElementById
    // Which slows things down for other browsers (hence the branching)
    if(document.getElementById(id)){

      Expr.find.ID = function(match, context, isXML){

        if(typeof context.getElementById !== "undefined" && !isXML){

          var m = context.getElementById(match[1]);
          return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
        };
      };
      Expr.filter.ID = function(elem, match){

        var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
        return elem.nodeType === 1 && node && node.nodeValue === match;
      };
    };
    root.removeChild(form);
    // release memory in IE
    root = form = null;
  })();
  (function(){

    // Check to see if the browser returns only elements
    // when doing getElementsByTagName("*")
    // Create a fake element
    var div = document.createElement("div");
    div.appendChild(document.createComment(""));
    // Make sure no comments are found
    if(div.getElementsByTagName("*").length > 0){

      Expr.find.TAG = function(match, context){

        var results = context.getElementsByTagName(match[1]);
        // Filter out possible comments
        if(match[1] === "*"){

          var tmp = [];
          for(var i = 0;results[i];i++){

            if(results[i].nodeType === 1){

              tmp.push(results[i]);
            };
          };
          results = tmp;
        };
        return results;
      };
    };
    // Check to see if an attribute returns normalized href attributes
    div.innerHTML = "<a href='#'></a>";
    if(div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#"){

      Expr.attrHandle.href = function(elem){

        return elem.getAttribute("href", 2);
      };
    };
    // release memory in IE
    div = null;
  })();
  if(document.querySelectorAll){

    (function(){

      var oldSizzle = Sizzle,div = document.createElement("div"),id = "__sizzle__";
      div.innerHTML = "<p class='TEST'></p>";
      // Safari can't handle uppercase or unicode characters when
      // in quirks mode.
      if(div.querySelectorAll && div.querySelectorAll(".TEST").length === 0){

        return;
      };
      Sizzle = function(query, context, extra, seed){

        context = context || document;
        // Only use querySelectorAll on non-XML documents
        // (ID selectors don't work in non-HTML documents)
        if(!seed && !Sizzle.isXML(context)){

          // See if we find a selector to speed up
          var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);
          if(match && (context.nodeType === 1 || context.nodeType === 9)){

            // Speed-up: Sizzle("TAG")
            if(match[1]){

              return makeArray(context.getElementsByTagName(query), extra);
            } else if(match[2] && Expr.find.CLASS && context.getElementsByClassName){

              return makeArray(context.getElementsByClassName(match[2]), extra);
            };
          };
          if(context.nodeType === 9){

            // Speed-up: Sizzle("body")
            // The body element only exists once, optimize finding it
            if(query === "body" && context.body){

              return makeArray([context.body], extra);
            } else if(match && match[3]){

              var elem = context.getElementById(match[3]);
              // Check parentNode to catch when Blackberry 4.6 returns
              // nodes that are no longer in the document #6963
              if(elem && elem.parentNode){

                // Handle the case where IE and Opera return items
                // by name instead of ID
                if(elem.id === match[3]){

                  return makeArray([elem], extra);
                };
              } else {

                return makeArray([], extra);
              };
            };
            try{

              return makeArray(context.querySelectorAll(query), extra);
            } catch(qsaError) {
            };
          } else if(context.nodeType === 1 && context.nodeName.toLowerCase() !== "object"){

            var oldContext = context,old = context.getAttribute("id"),nid = old || id,hasParent = context.parentNode,relativeHierarchySelector = /^\s*[+~]/.test(query);
            if(!old){

              context.setAttribute("id", nid);
            } else {

              nid = nid.replace(/'/g, "\\$&");
            };
            if(relativeHierarchySelector && hasParent){

              context = context.parentNode;
            };
            try{

              if(!relativeHierarchySelector || hasParent){

                return makeArray(context.querySelectorAll("[id='" + nid + "'] " + query), extra);
              };
            } catch(pseudoError) {
            }finally{

              if(!old){

                oldContext.removeAttribute("id");
              };
            };
          };
        };
        return oldSizzle(query, context, extra, seed);
      };
      for(var prop in oldSizzle){

        Sizzle[prop] = oldSizzle[prop];
      };
      // release memory in IE
      div = null;
    })();
  };
  (function(){

    var html = document.documentElement,matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector,pseudoWorks = false;
    try{

      // This should fail with an exception
      // Gecko does not error, returns false instead
      matches.call(document.documentElement, "[test!='']:sizzle");
    } catch(pseudoError) {

      pseudoWorks = true;
    };
    if(matches){

      Sizzle.matchesSelector = function(node, expr){

        // Make sure that attribute selectors are quoted
        expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
        if(!Sizzle.isXML(node)){

          try{

            if(pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)){

              return matches.call(node, expr);
            };
          } catch(e) {
          };
        };
        return Sizzle(expr, null, null, [node]).length > 0;
      };
    };
  })();
  (function(){

    var div = document.createElement("div");
    div.innerHTML = "<div class='test e'></div><div class='test'></div>";
    // Opera can't find a second classname (in 9.6)
    // Also, make sure that getElementsByClassName actually exists
    if(!div.getElementsByClassName || div.getElementsByClassName("e").length === 0){

      return;
    };
    // Safari caches class attributes, doesn't catch changes (in 3.2)
    div.lastChild.className = "e";
    if(div.getElementsByClassName("e").length === 1){

      return;
    };
    Expr.order.splice(1, 0, "CLASS");
    Expr.find.CLASS = function(match, context, isXML){

      if(typeof context.getElementsByClassName !== "undefined" && !isXML){

        return context.getElementsByClassName(match[1]);
      };
    };
    // release memory in IE
    div = null;
  })();
  function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML){

    for(var i = 0,l = checkSet.length;i < l;i++){

      var elem = checkSet[i];
      if(elem){

        var match = false;
        elem = elem[dir];
        while(elem){

          if(elem.sizcache === doneName){

            match = checkSet[elem.sizset];
            break;
          };
          if(elem.nodeType === 1 && !isXML){

            elem.sizcache = doneName;
            elem.sizset = i;
          };
          if(elem.nodeName.toLowerCase() === cur){

            match = elem;
            break;
          };
          elem = elem[dir];
        };
        checkSet[i] = match;
      };
    };
  };
  function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML){

    for(var i = 0,l = checkSet.length;i < l;i++){

      var elem = checkSet[i];
      if(elem){

        var match = false;
        elem = elem[dir];
        while(elem){

          if(elem.sizcache === doneName){

            match = checkSet[elem.sizset];
            break;
          };
          if(elem.nodeType === 1){

            if(!isXML){

              elem.sizcache = doneName;
              elem.sizset = i;
            };
            if(typeof cur !== "string"){

              if(elem === cur){

                match = true;
                break;
              };
            } else if(Sizzle.filter(cur, [elem]).length > 0){

              match = elem;
              break;
            };
          };
          elem = elem[dir];
        };
        checkSet[i] = match;
      };
    };
  };
  if(document.documentElement.contains){

    Sizzle.contains = function(a, b){

      return a !== b && (a.contains ? a.contains(b) : true);
    };
  } else if(document.documentElement.compareDocumentPosition){

    Sizzle.contains = function(a, b){

      return !!(a.compareDocumentPosition(b) & 16);
    };
  } else {

    Sizzle.contains = function(){

      return false;
    };
  };
  Sizzle.isXML = function(elem){

    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
  };
  var posProcess = function(selector, context){

    var match,tmpSet = [],later = "",root = context.nodeType ? [context] : context;
    // Position selectors must be done after the filter
    // And so must :not(positional) so we move all PSEUDOs to the end
    while((match = Expr.match.PSEUDO.exec(selector))){

      later += match[0];
      selector = selector.replace(Expr.match.PSEUDO, "");
    };
    selector = Expr.relative[selector] ? selector + "*" : selector;
    for(var i = 0,l = root.length;i < l;i++){

      Sizzle(selector, root[i], tmpSet);
    };
    return Sizzle.filter(later, tmpSet);
  };
  /**
   * Above is the original Sizzle code.
   */
  // EXPOSE qooxdoo variant
  var Selector = qx.bom.Selector;
  Selector.query = function(selector, context){

    return Sizzle(selector, context);
  };
  Selector.matches = function(selector, set){

    return Sizzle(selector, null, null, set);
  };
})();

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * CSS/Style property manipulation module
 */
qx.Bootstrap.define("qx.module.Css", {
  statics : {
    /**
     * Modifies the given style property on all elements in the collection.
     *
     * @attach {q}
     * @param name {String} Name of the style property to modify
     * @param value {var} The value to apply
     * @return {q} The collection for chaining
     */
    setStyle : function(name, value){

      if(/\w-\w/.test(name)){

        name = qx.lang.String.camelCase(name);
      };
      for(var i = 0;i < this.length;i++){

        qx.bom.element.Style.set(this[i], name, value);
      };
      return this;
    },
    /**
     * Returns the value of the given style property for the first item in the
     * collection.
     *
     * @attach {q}
     * @param name {String} Style property name
     * @return {var} Style property value
     */
    getStyle : function(name){

      if(this[0]){

        if(/\w-\w/.test(name)){

          name = qx.lang.String.camelCase(name);
        };
        return qx.bom.element.Style.get(this[0], name);
      };
      return null;
    },
    /**
     * Sets multiple style properties for each item in the collection.
     *
     * @attach {q}
     * @param styles {Map} A map of style property name/value pairs
     * @return {q} The collection for chaining
     */
    setStyles : function(styles){

      for(var name in styles){

        this.setStyle(name, styles[name]);
      };
      return this;
    },
    /**
     * Returns the values of multiple style properties for each item in the
     * collection
     *
     * @attach {q}
     * @param names {String[]} List of style property names
     * @return {Map} Map of style property name/value pairs
     */
    getStyles : function(names){

      var styles = {
      };
      for(var i = 0;i < names.length;i++){

        styles[names[i]] = this.getStyle(names[i]);
      };
      return styles;
    },
    /**
     * Adds a class name to each element in the collection
     *
     * @attach {q}
     * @param name {String} Class name
     * @return {q} The collection for chaining
     */
    addClass : function(name){

      for(var i = 0;i < this.length;i++){

        qx.bom.element.Class.add(this[i], name);
      };
      return this;
    },
    /**
     * Adds multiple class names to each element in the collection
     *
     * @attach {q}
     * @param names {String[]} List of class names to add
     * @return {q} The collection for chaining
     */
    addClasses : function(names){

      for(var i = 0;i < this.length;i++){

        qx.bom.element.Class.addClasses(this[i], names);
      };
      return this;
    },
    /**
     * Removes a class name from each element in the collection
     *
     * @attach {q}
     * @param name {String} The class name to remove
     * @return {q} The collection for chaining
     */
    removeClass : function(name){

      for(var i = 0;i < this.length;i++){

        qx.bom.element.Class.remove(this[i], name);
      };
      return this;
    },
    /**
     * Removes multiple class names from each element in the collection
     *
     * @attach {q}
     * @param names {String[]} List of class names to remove
     * @return {q} The collection for chaining
     */
    removeClasses : function(names){

      for(var i = 0;i < this.length;i++){

        qx.bom.element.Class.removeClasses(this[i], names);
      };
      return this;
    },
    /**
     * Checks if the first element in the collection has the given class name
     *
     * @attach {q}
     * @param name {String} Class name to check for
     * @return {Boolean} <code>true</code> if the first item has the given class name
     */
    hasClass : function(name){

      if(!this[0]){

        return false;
      };
      return qx.bom.element.Class.has(this[0], name);
    },
    /**
     * Returns the class name of the first element in the collection
     *
     * @attach {q}
     * @return {String} Class name
     */
    getClass : function(){

      if(!this[0]){

        return "";
      };
      return qx.bom.element.Class.get(this[0]);
    },
    /**
     * Toggles the given class name on each item in the collection
     *
     * @attach {q}
     * @param name {String} Class name
     * @return {q} The collection for chaining
     */
    toggleClass : function(name){

      var bCls = qx.bom.element.Class;
      for(var i = 0,l = this.length;i < l;i++){

        bCls.has(this[i], name) ? bCls.remove(this[i], name) : bCls.add(this[i], name);
      };
      return this;
    },
    /**
     * Toggles the given list of class names on each item in the collection
     *
     * @attach {q}
     * @param names {String[]} Class names
     * @return {q} The collection for chaining
     */
    toggleClasses : function(names){

      for(var i = 0,l = names.length;i < l;i++){

        this.toggleClass(names[i]);
      };
      return this;
    },
    /**
     * Replaces a class name on each element in the collection
     *
     * @attach {q}
     * @param oldName {String} Class name to remove
     * @param newName {String} Class name to add
     * @return {q} The collection for chaining
     */
    replaceClass : function(oldName, newName){

      for(var i = 0,l = this.length;i < l;i++){

        qx.bom.element.Class.replace(this[i], oldName, newName);
      };
      return this;
    },
    /**
     * Returns the rendered height of the first element in the collection.
     * @attach {q}
     * @return {Number} The first item's rendered height
     */
    getHeight : function(){

      var elem = this[0];
      if(elem){

        if(qx.dom.Node.isElement(elem)){

          return qx.bom.element.Dimension.getHeight(elem);
        } else if(qx.dom.Node.isDocument(elem)){

          return qx.bom.Document.getHeight(qx.dom.Node.getWindow(elem));
        } else if(qx.dom.Node.isWindow(elem)){

          return qx.bom.Viewport.getHeight(elem);
        };;
      };
      return null;
    },
    /**
     * Returns the rendered width of the first element in the collection
     * @attach {q}
     * @return {Number} The first item's rendered width
     */
    getWidth : function(){

      var elem = this[0];
      if(elem){

        if(qx.dom.Node.isElement(elem)){

          return qx.bom.element.Dimension.getWidth(elem);
        } else if(qx.dom.Node.isDocument(elem)){

          return qx.bom.Document.getWidth(qx.dom.Node.getWindow(elem));
        } else if(qx.dom.Node.isWindow(elem)){

          return qx.bom.Viewport.getWidth(elem);
        };;
      };
      return null;
    },
    /**
     * Returns the computed location of the given element in the context of the
     * document dimensions.
     *
     * @attach {q}
     * @return {Map} A map with the keys <code>left<code/>, <code>top<code/>,
     * <code>right<code/> and <code>bottom<code/> which contains the distance
     * of the element relative to the document.
     */
    getOffset : function(){

      var elem = this[0];
      if(elem){

        return qx.bom.element.Location.get(elem);
      };
      return null;
    },
    /**
     * Returns the content height of the first element in the collection.
     * This is the maximum height the element can use, excluding borders,
     * margins, padding or scroll bars.
     * @attach {q}
     * @return {Number} Computed content height
     */
    getContentHeight : function(){

      var obj = this[0];
      if(qx.dom.Node.isElement(obj)){

        return qx.bom.element.Dimension.getContentHeight(obj);
      };
      return null;
    },
    /**
     * Returns the content width of the first element in the collection.
     * This is the maximum width the element can use, excluding borders,
     * margins, padding or scroll bars.
     * @attach {q}
     * @return {Number} Computed content width
     */
    getContentWidth : function(){

      var obj = this[0];
      if(qx.dom.Node.isElement(obj)){

        return qx.bom.element.Dimension.getContentWidth(obj);
      };
      return null;
    },
    /**
     * Returns the distance between the first element in the collection and its
     * offset parent
     *
     * @attach {q}
     * @return {Map} a map with the keys <code>left</code> and <code>top</code>
     * containing the distance between the elements
     */
    getPosition : function(){

      var obj = this[0];
      if(qx.dom.Node.isElement(obj)){

        return qx.bom.element.Location.getPosition(obj);
      };
      return null;
    },
    /**
     * Includes a Stylesheet file
     *
     * @attachStatic {q}
     * @param uri {String} The stylesheet's URI
     * @param doc {Document?} Document to modify
     */
    includeStylesheet : function(uri, doc){

      qx.bom.Stylesheet.includeFile(uri, doc);
    }
  },
  defer : function(statics){

    q.$attach({
      "setStyle" : statics.setStyle,
      "getStyle" : statics.getStyle,
      "setStyles" : statics.setStyles,
      "getStyles" : statics.getStyles,
      "addClass" : statics.addClass,
      "addClasses" : statics.addClasses,
      "removeClass" : statics.removeClass,
      "removeClasses" : statics.removeClasses,
      "hasClass" : statics.hasClass,
      "getClass" : statics.getClass,
      "toggleClass" : statics.toggleClass,
      "toggleClasses" : statics.toggleClasses,
      "replaceClass" : statics.replaceClass,
      "getHeight" : statics.getHeight,
      "getWidth" : statics.getWidth,
      "getOffset" : statics.getOffset,
      "getContentHeight" : statics.getContentHeight,
      "getContentWidth" : statics.getContentWidth,
      "getPosition" : statics.getPosition
    });
    q.$attachStatic({
      "includeStylesheet" : statics.includeStylesheet
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

   ======================================================================

   This class contains code based on the following work:

   * Mootools
     http://mootools.net/
     Version 1.1.1

     Copyright:
       (c) 2007 Valerio Proietti

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   and

   * XRegExp
   http://xregexp.com/
   Version 1.5

   Copyright:
       (c) 2006-2007, Steven Levithan <http://stevenlevithan.com>

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Steven Levithan

************************************************************************ */
/**
 * String helper functions
 *
 * The native JavaScript String is not modified by this class. However,
 * there are modifications to the native String in {@link qx.lang.Core} for
 * browsers that do not support certain features.
 *
 * The string/array generics introduced in JavaScript 1.6 are supported by
 * {@link qx.lang.Generics}.
 */
qx.Bootstrap.define("qx.lang.String", {
  statics : {
    /**
     * Unicode letters.  they are taken from Steve Levithan's excellent XRegExp library [http://xregexp.com/plugins/xregexp-unicode-base.js]
     */
    __unicodeLetters : "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
    /**
     * A RegExp that matches the first letter in a word - unicode aware
     */
    __unicodeFirstLetterInWordRegexp : null,
    /**
     * {Map} Cache for often used string operations [camelCasing and hyphenation]
     * e.g. marginTop => margin-top
     */
    __stringsMap : {
    },
    /**
     * Converts a hyphenated string (separated by '-') to camel case.
     *
     * Example:
     * <pre class='javascript'>qx.lang.String.camelCase("I-like-cookies"); //returns "ILikeCookies"</pre>
     * The implementation does not force a lowerCamelCase or upperCamelCase version.
     * (think java variables that start with lower case versus classnames that start with capital letter)
     * The first letter of the parameter keeps its case.
     *
     * @param str {String} hyphenated string
     * @return {String} camelcase string
     */
    camelCase : function(str){

      var result = this.__stringsMap[str];
      if(!result){

        result = str.replace(/\-([a-z])/g, function(match, chr){

          return chr.toUpperCase();
        });
        this.__stringsMap[str] = result;
      };
      return result;
    },
    /**
     * Converts a camelcased string to a hyphenated (separated by '-') string.
     *
     * Example:
     * <pre class='javascript'>qx.lang.String.hyphenate("ILikeCookies"); //returns "I-like-cookies"</pre>
     * The implementation does not force a lowerCamelCase or upperCamelCase version.
     * (think java variables that start with lower case versus classnames that start with capital letter)
     * The first letter of the parameter keeps its case.
     *
     * @param str {String} camelcased string
     * @return {String} hyphenated string
     */
    hyphenate : function(str){

      var result = this.__stringsMap[str];
      if(!result){

        result = str.replace(/[A-Z]/g, function(match){

          return ('-' + match.charAt(0).toLowerCase());
        });
        this.__stringsMap[str] = result;
      };
      return result;
    },
    /**
     * Converts a string to camel case.
     *
     * Example:
     * <pre class='javascript'>qx.lang.String.camelCase("i like cookies"); //returns "I Like Cookies"</pre>
     *
     * @param str {String} any string
     * @return {String} capitalized string
     */
    capitalize : function(str){

      if(this.__unicodeFirstLetterInWordRegexp === null){

        var unicodeEscapePrefix = '\\u';
        this.__unicodeFirstLetterInWordRegexp = new RegExp("(^|[^" + this.__unicodeLetters.replace(/[0-9A-F]{4}/g, function(match){

          return unicodeEscapePrefix + match;
        }) + "])[" + this.__unicodeLetters.replace(/[0-9A-F]{4}/g, function(match){

          return unicodeEscapePrefix + match;
        }) + "]", "g");
      };
      return str.replace(this.__unicodeFirstLetterInWordRegexp, function(match){

        return match.toUpperCase();
      });
    },
    /**
     * Removes all extraneous whitespace from a string and trims it
     *
     * Example:
     *
     * <code>
     * qx.lang.String.clean(" i      like     cookies      \n\n");
     * </code>
     *
     * Returns "i like cookies"
     *
     * @param str {String} the string to clean up
     * @return {String} Cleaned up string
     */
    clean : function(str){

      return this.trim(str.replace(/\s+/g, ' '));
    },
    /**
     * removes white space from the left side of a string
     *
     * @param str {String} the string to trim
     * @return {String} the trimmed string
     */
    trimLeft : function(str){

      return str.replace(/^\s+/, "");
    },
    /**
     * removes white space from the right side of a string
     *
     * @param str {String} the string to trim
     * @return {String} the trimmed string
     */
    trimRight : function(str){

      return str.replace(/\s+$/, "");
    },
    /**
     * removes white space from the left and the right side of a string
     *
     * @param str {String} the string to trim
     * @return {String} the trimmed string
     */
    trim : function(str){

      return str.replace(/^\s+|\s+$/g, "");
    },
    /**
     * Check whether the string starts with the given substring
     *
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string starts with the given substring
     */
    startsWith : function(fullstr, substr){

      return fullstr.indexOf(substr) === 0;
    },
    /**
     * Check whether the string ends with the given substring
     *
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string ends with the given substring
     */
    endsWith : function(fullstr, substr){

      return fullstr.substring(fullstr.length - substr.length, fullstr.length) === substr;
    },
    /**
     * Returns a string, which repeats a string 'length' times
     *
     * @param str {String} string used to repeat
     * @param times {Integer} the number of repetitions
     * @return {String} repeated string
     */
    repeat : function(str, times){

      return str.length > 0 ? new Array(times + 1).join(str) : "";
    },
    /**
     * Pad a string up to a given length. Padding characters are added to the left of the string.
     *
     * @param str {String} the string to pad
     * @param length {Integer} the final length of the string
     * @param ch {String} character used to fill up the string
     * @return {String} padded string
     */
    pad : function(str, length, ch){

      var padLength = length - str.length;
      if(padLength > 0){

        if(typeof ch === "undefined"){

          ch = "0";
        };
        return this.repeat(ch, padLength) + str;
      } else {

        return str;
      };
    },
    /**
     * Convert the first character of the string to upper case.
     *
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with an upper case first character
     */
    firstUp : qx.Bootstrap.firstUp,
    /**
     * Convert the first character of the string to lower case.
     *
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with a lower case first character
     */
    firstLow : qx.Bootstrap.firstLow,
    /**
     * Check whether the string contains a given substring
     *
     * @param str {String} the string
     * @param substring {String} substring to search for
     * @return {Boolean} whether the string contains the substring
     */
    contains : function(str, substring){

      return str.indexOf(substring) != -1;
    },
    /**
     * Print a list of arguments using a format string
     * In the format string occurrences of %n are replaced by the n'th element of the args list.
     * Example:
     * <pre class='javascript'>qx.lang.String.format("Hello %1, my name is %2", ["Egon", "Franz"]) == "Hello Egon, my name is Franz"</pre>
     *
     * @param pattern {String} format string
     * @param args {Array} array of arguments to insert into the format string
     * @return {String} the formatted string
     */
    format : function(pattern, args){

      var str = pattern;
      var i = args.length;
      while(i--){

        // be sure to always use a string for replacement.
        str = str.replace(new RegExp("%" + (i + 1), "g"), args[i] + "");
      };
      return str;
    },
    /**
     * Escapes all chars that have a special meaning in regular expressions
     *
     * @param str {String} the string where to escape the chars.
     * @return {String} the string with the escaped chars.
     */
    escapeRegexpChars : function(str){

      return str.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
    },
    /**
     * Converts a string to an array of characters.
     * <pre>"hello" => [ "h", "e", "l", "l", "o" ];</pre>
     *
     * @param str {String} the string which should be split
     * @return {Array} the result array of characters
     */
    toArray : function(str){

      return str.split(/\B|\b/g);
    },
    /**
     * Remove HTML/XML tags from a string
     * Example:
     * <pre class='javascript'>qx.lang.String.stripTags("&lt;h1>Hello&lt;/h1>") == "Hello"</pre>
     *
     * @param str {String} string containing tags
     * @return {String} the string with stripped tags
     */
    stripTags : function(str){

      return str.replace(/<\/?[^>]+>/gi, "");
    },
    /**
     * Strips <script> tags including its content from the given string.
     *
     * @param str {String} string containing tags
     * @param exec {Boolean?false} Whether the filtered code should be executed
     * @return {String} The filtered string
     */
    stripScripts : function(str, exec){

      var scripts = "";
      var text = str.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){

        scripts += arguments[1] + '\n';
        return "";
      });
      if(exec === true){

        qx.lang.Function.globalEval(scripts);
      };
      return text;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

   ======================================================================

   This class contains code based on the following work:

   * Mootools
     http://mootools.net
     Version 1.1.1

     Copyright:
       2007 Valerio Proietti

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/* ************************************************************************

#require(qx.lang.Array)
#ignore(qx.core.Object)
#ignore(qx.event.GlobalError)

************************************************************************ */
/**
 * Collection of helper methods operating on functions.
 */
qx.Bootstrap.define("qx.lang.Function", {
  statics : {
    /**
     * Extract the caller of a function from the arguments variable.
     * This will not work in Opera < 9.6.
     *
     * @param args {arguments} The local arguments variable
     * @return {Function} A reference to the calling function or "undefined" if caller is not supported.
     */
    getCaller : function(args){

      return args.caller ? args.caller.callee : args.callee.caller;
    },
    /**
     * Try to get a sensible textual description of a function object.
     * This may be the class/mixin and method name of a function
     * or at least the signature of the function.
     *
     * @param fcn {Function} function the get the name for.
     * @return {String} Name of the function.
     */
    getName : function(fcn){

      if(fcn.displayName){

        return fcn.displayName;
      };
      if(fcn.$$original || fcn.wrapper || fcn.classname){

        return fcn.classname + ".constructor()";
      };
      if(fcn.$$mixin){

        //members
        for(var key in fcn.$$mixin.$$members){

          if(fcn.$$mixin.$$members[key] == fcn){

            return fcn.$$mixin.name + ".prototype." + key + "()";
          };
        };
        // statics
        for(var key in fcn.$$mixin){

          if(fcn.$$mixin[key] == fcn){

            return fcn.$$mixin.name + "." + key + "()";
          };
        };
      };
      if(fcn.self){

        var clazz = fcn.self.constructor;
        if(clazz){

          // members
          for(var key in clazz.prototype){

            if(clazz.prototype[key] == fcn){

              return clazz.classname + ".prototype." + key + "()";
            };
          };
          // statics
          for(var key in clazz){

            if(clazz[key] == fcn){

              return clazz.classname + "." + key + "()";
            };
          };
        };
      };
      var fcnReResult = fcn.toString().match(/function\s*(\w*)\s*\(.*/);
      if(fcnReResult && fcnReResult.length >= 1 && fcnReResult[1]){

        return fcnReResult[1] + "()";
      };
      return 'anonymous()';
    },
    /**
     * Evaluates JavaScript code globally
     *
     * @lint ignoreDeprecated(eval)
     *
     * @param data {String} JavaScript commands
     * @return {var} Result of the execution
     */
    globalEval : function(data){

      if(window.execScript){

        return window.execScript(data);
      } else {

        return eval.call(window, data);
      };
    },
    /**
     * empty function
     */
    empty : function(){
    },
    /**
     * Simply return true.
     *
     * @return {Boolean} Always returns true.
     */
    returnTrue : function(){

      return true;
    },
    /**
     * Simply return false.
     *
     * @return {Boolean} Always returns false.
     */
    returnFalse : function(){

      return false;
    },
    /**
     * Simply return null.
     *
     * @return {var} Always returns null.
     */
    returnNull : function(){

      return null;
    },
    /**
     * Return "this".
     *
     * @return {Object} Always returns "this".
     */
    returnThis : function(){

      return this;
    },
    /**
     * Simply return 0.
     *
     * @return {Number} Always returns 0.
     */
    returnZero : function(){

      return 0;
    },
    /**
     * Base function for creating functional closures which is used by most other methods here.
     *
     * *Syntax*
     *
     * <pre class='javascript'>var createdFunction = qx.lang.Function.create(myFunction, [options]);</pre>
     *
     * @param func {Function} Original function to wrap
     * @param options? {Map} Map of options
     * <ul>
     * <li><strong>self</strong>: The object that the "this" of the function will refer to. Default is the same as the wrapper function is called.</li>
     * <li><strong>args</strong>: An array of arguments that will be passed as arguments to the function when called.
     *     Default is no custom arguments; the function will receive the standard arguments when called.</li>
     * <li><strong>delay</strong>: If set, the returned function will delay the actual execution by this amount of milliseconds and return a timer handle when called.
     *     Default is no delay.</li>
     * <li><strong>periodical</strong>: If set the returned function will periodically perform the actual execution with this specified interval
     *      and return a timer handle when called. Default is no periodical execution.</li>
     * <li><strong>attempt</strong>: If set to true, the returned function will try to execute and return either the results or false on error. Default is false.</li>
     * </ul>
     *
     * @return {Function} Wrapped function
     */
    create : function(func, options){

      {
      };
      // Nothing to be done when there are no options.
      if(!options){

        return func;
      };
      // Check for at least one attribute.
      if(!(options.self || options.args || options.delay != null || options.periodical != null || options.attempt)){

        return func;
      };
      return function(event){

        {
        };
        // Convert (and copy) incoming arguments
        var args = qx.lang.Array.fromArguments(arguments);
        // Prepend static arguments
        if(options.args){

          args = options.args.concat(args);
        };
        if(options.delay || options.periodical){

          var returns = function(){

            return func.apply(options.self || this, args);
          };
          if(qx.core.Environment.get("qx.globalErrorHandling")){

            returns = qx.event.GlobalError.observeMethod(returns);
          };
          if(options.delay){

            return window.setTimeout(returns, options.delay);
          };
          if(options.periodical){

            return window.setInterval(returns, options.periodical);
          };
        } else if(options.attempt){

          var ret = false;
          try{

            ret = func.apply(options.self || this, args);
          } catch(ex) {
          };
          return ret;
        } else {

          return func.apply(options.self || this, args);
        };
      };
    },
    /**
     * Returns a function whose "this" is altered.
     *
     * *Syntax*
     *
     * <pre class='javascript'>qx.lang.Function.bind(myFunction, [self, [varargs...]]);</pre>
     *
     * *Example*
     *
     * <pre class='javascript'>
     * function myFunction()
     * {
     *   this.setStyle('color', 'red');
     *   // note that 'this' here refers to myFunction, not an element
     *   // we'll need to bind this function to the element we want to alter
     * };
     *
     * var myBoundFunction = qx.lang.Function.bind(myFunction, myElement);
     * myBoundFunction(); // this will make the element myElement red.
     * </pre>
     *
     * If you find yourself using this static method a lot, you may be
     * interested in the bindTo() method in the mixin qx.core.MBindTo.
     *
     * @see qx.core.MBindTo
     *
     * @param func {Function} Original function to wrap
     * @param self {Object ? null} The object that the "this" of the function will refer to.
     * @param varargs {arguments ? null} The arguments to pass to the function.
     * @return {Function} The bound function.
     */
    bind : function(func, self, varargs){

      return this.create(func, {
        self : self,
        args : arguments.length > 2 ? qx.lang.Array.fromArguments(arguments, 2) : null
      });
    },
    /**
     * Returns a function whose arguments are pre-configured.
     *
     * *Syntax*
     *
     * <pre class='javascript'>qx.lang.Function.curry(myFunction, [varargs...]);</pre>
     *
     * *Example*
     *
     * <pre class='javascript'>
     * function myFunction(elem) {
     *   elem.setStyle('color', 'red');
     * };
     *
     * var myBoundFunction = qx.lang.Function.curry(myFunction, myElement);
     * myBoundFunction(); // this will make the element myElement red.
     * </pre>
     *
     * @param func {Function} Original function to wrap
     * @param varargs {arguments} The arguments to pass to the function.
     * @return {var} The pre-configured function.
     */
    curry : function(func, varargs){

      return this.create(func, {
        args : arguments.length > 1 ? qx.lang.Array.fromArguments(arguments, 1) : null
      });
    },
    /**
     * Returns a function which could be used as a listener for a native event callback.
     *
     * *Syntax*
     *
     * <pre class='javascript'>qx.lang.Function.listener(myFunction, [self, [varargs...]]);</pre>
     *
     * @param func {Function} Original function to wrap
     * @param self {Object ? null} The object that the "this" of the function will refer to.
     * @param varargs {arguments ? null} The arguments to pass to the function.
     * @return {var} The bound function.
     */
    listener : function(func, self, varargs){

      if(arguments.length < 3){

        return function(event){

          // Directly execute, but force first parameter to be the event object.
          return func.call(self || this, event || window.event);
        };
      } else {

        var optargs = qx.lang.Array.fromArguments(arguments, 2);
        return function(event){

          var args = [event || window.event];
          // Append static arguments
          args.push.apply(args, optargs);
          // Finally execute original method
          func.apply(self || this, args);
        };
      };
    },
    /**
     * Tries to execute the function.
     *
     * *Syntax*
     *
     * <pre class='javascript'>var result = qx.lang.Function.attempt(myFunction, [self, [varargs...]]);</pre>
     *
     * *Example*
     *
     * <pre class='javascript'>
     * var myObject = {
     *   'cow': 'moo!'
     * };
     *
     * var myFunction = function()
     * {
     *   for(var i = 0; i < arguments.length; i++) {
     *     if(!this[arguments[i]]) throw('doh!');
     *   }
     * };
     *
     * var result = qx.lang.Function.attempt(myFunction, myObject, 'pig', 'cow'); // false
     * </pre>
     *
     * @param func {Function} Original function to wrap
     * @param self {Object ? null} The object that the "this" of the function will refer to.
     * @param varargs {arguments ? null} The arguments to pass to the function.
     * @return {Boolean|var} <code>false</code> if an exception is thrown, else the function's return.
     */
    attempt : function(func, self, varargs){

      return this.create(func, {
        self : self,
        attempt : true,
        args : arguments.length > 2 ? qx.lang.Array.fromArguments(arguments, 2) : null
      })();
    },
    /**
     * Delays the execution of a function by a specified duration.
     *
     * *Syntax*
     *
     * <pre class='javascript'>var timeoutID = qx.lang.Function.delay(myFunction, [delay, [self, [varargs...]]]);</pre>
     *
     * *Example*
     *
     * <pre class='javascript'>
     * var myFunction = function(){ alert('moo! Element id is: ' + this.id); };
     * //wait 50 milliseconds, then call myFunction and bind myElement to it
     * qx.lang.Function.delay(myFunction, 50, myElement); // alerts: 'moo! Element id is: ... '
     *
     * // An anonymous function, example
     * qx.lang.Function.delay(function(){ alert('one second later...'); }, 1000); //wait a second and alert
     * </pre>
     *
     * @param func {Function} Original function to wrap
     * @param delay {Integer} The duration to wait (in milliseconds).
     * @param self {Object ? null} The object that the "this" of the function will refer to.
     * @param varargs {arguments ? null} The arguments to pass to the function.
     * @return {Integer} The JavaScript Timeout ID (useful for clearing delays).
     */
    delay : function(func, delay, self, varargs){

      return this.create(func, {
        delay : delay,
        self : self,
        args : arguments.length > 3 ? qx.lang.Array.fromArguments(arguments, 3) : null
      })();
    },
    /**
     * Executes a function in the specified intervals of time
     *
     * *Syntax*
     *
     * <pre class='javascript'>var intervalID = qx.lang.Function.periodical(myFunction, [period, [self, [varargs...]]]);</pre>
     *
     * *Example*
     *
     * <pre class='javascript'>
     * var Site = { counter: 0 };
     * var addCount = function(){ this.counter++; };
     * qx.lang.Function.periodical(addCount, 1000, Site); // will add the number of seconds at the Site
     * </pre>
     *
     * @param func {Function} Original function to wrap
     * @param interval {Integer} The duration of the intervals between executions.
     * @param self {Object ? null} The object that the "this" of the function will refer to.
     * @param varargs {arguments ? null} The arguments to pass to the function.
     * @return {Integer} The Interval ID (useful for clearing a periodical).
     */
    periodical : function(func, interval, self, varargs){

      return this.create(func, {
        periodical : interval,
        self : self,
        args : arguments.length > 3 ? qx.lang.Array.fromArguments(arguments, 3) : null
      })();
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Contains methods to control and query the element's clip property
 */
qx.Bootstrap.define("qx.bom.element.Clip", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Compiles the given clipping into a CSS compatible string. This
     * is a simple square which describes the visible area of an DOM element.
     * Changing the clipping does not change the dimensions of
     * an element.
     *
     * @param map {Map}  Map which contains <code>left</code>, <code>top</code>
     *   <code>width</code> and <code>height</code> of the clipped area.
     * @return {String} CSS compatible string
     */
    compile : function(map){

      if(!map){

        return "clip:auto;";
      };
      var left = map.left;
      var top = map.top;
      var width = map.width;
      var height = map.height;
      var right,bottom;
      if(left == null){

        right = (width == null ? "auto" : width + "px");
        left = "auto";
      } else {

        right = (width == null ? "auto" : left + width + "px");
        left = left + "px";
      };
      if(top == null){

        bottom = (height == null ? "auto" : height + "px");
        top = "auto";
      } else {

        bottom = (height == null ? "auto" : top + height + "px");
        top = top + "px";
      };
      return "clip:rect(" + top + "," + right + "," + bottom + "," + left + ");";
    },
    /**
     * Gets the clipping of the given element.
     *
     * @param element {Element} DOM element to query
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {Map} Map which contains <code>left</code>, <code>top</code>
     *   <code>width</code> and <code>height</code> of the clipped area.
     *   Each one could be null or any integer value.
     */
    get : function(element, mode){

      var clip = qx.bom.element.Style.get(element, "clip", mode, false);
      var left,top,width,height;
      var right,bottom;
      if(typeof clip === "string" && clip !== "auto" && clip !== ""){

        clip = qx.lang.String.trim(clip);
        // Do not use "global" here. This will break Firefox because of
        // an issue that the lastIndex will not be resetted on separate calls.
        if(/\((.*)\)/.test(clip)){

          var result = RegExp.$1;
          // Process result
          // Some browsers store values space-separated, others comma-separated.
          // Handle both cases by means of feature-detection.
          if(/,/.test(result)){

            var split = result.split(",");
          } else {

            var split = result.split(" ");
          };
          top = qx.lang.String.trim(split[0]);
          right = qx.lang.String.trim(split[1]);
          bottom = qx.lang.String.trim(split[2]);
          left = qx.lang.String.trim(split[3]);
          // Normalize "auto" to null
          if(left === "auto"){

            left = null;
          };
          if(top === "auto"){

            top = null;
          };
          if(right === "auto"){

            right = null;
          };
          if(bottom === "auto"){

            bottom = null;
          };
          // Convert to integer values
          if(top != null){

            top = parseInt(top, 10);
          };
          if(right != null){

            right = parseInt(right, 10);
          };
          if(bottom != null){

            bottom = parseInt(bottom, 10);
          };
          if(left != null){

            left = parseInt(left, 10);
          };
          // Compute width and height
          if(right != null && left != null){

            width = right - left;
          } else if(right != null){

            width = right;
          };
          if(bottom != null && top != null){

            height = bottom - top;
          } else if(bottom != null){

            height = bottom;
          };
        } else {

          throw new Error("Could not parse clip string: " + clip);
        };
      };
      // Return map when any value is available.
      return {
        left : left || null,
        top : top || null,
        width : width || null,
        height : height || null
      };
    },
    /**
     * Sets the clipping of the given element. This is a simple
     * square which describes the visible area of an DOM element.
     * Changing the clipping does not change the dimensions of
     * an element.
     *
     * @param element {Element} DOM element to modify
     * @param map {Map} A map with one or more of these available keys:
     *   <code>left</code>, <code>top</code>, <code>width</code>, <code>height</code>.
     * @return {void}
     */
    set : function(element, map){

      if(!map){

        element.style.clip = "rect(auto,auto,auto,auto)";
        return;
      };
      var left = map.left;
      var top = map.top;
      var width = map.width;
      var height = map.height;
      var right,bottom;
      if(left == null){

        right = (width == null ? "auto" : width + "px");
        left = "auto";
      } else {

        right = (width == null ? "auto" : left + width + "px");
        left = left + "px";
      };
      if(top == null){

        bottom = (height == null ? "auto" : height + "px");
        top = "auto";
      } else {

        bottom = (height == null ? "auto" : top + height + "px");
        top = top + "px";
      };
      element.style.clip = "rect(" + top + "," + right + "," + bottom + "," + left + ")";
    },
    /**
     * Resets the clipping of the given DOM element.
     *
     * @param element {Element} DOM element to modify
     * @return {void}
     */
    reset : function(element){

      element.style.clip = "rect(auto, auto, auto, auto)";
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Responsible class for everything concerning styles without the need of
 * an element.
 *
 * If you want to query or modify styles of HTML elements,
 * take a look at {@see qx.bom.element.Style}.
 */
qx.Bootstrap.define("qx.bom.Style", {
  statics : {
    /** Vendor-specific style property prefixes **/
    VENDOR_PREFIXES : ["Webkit", "Moz", "O", "ms", "Khtml"],
    /**
     * Takes the name of a style property and returns the name the browser uses
     * for its implementation, which might include a vendor prefix.
     *
     * @param propertyName {String} Style property name to check
     * @return {String|null} The supported property name or <code>null</code> if
     * not supported
     */
    getPropertyName : function(propertyName){

      var style = document.documentElement.style;
      if(style[propertyName] !== undefined){

        return propertyName;
      };
      for(var i = 0,l = this.VENDOR_PREFIXES.length;i < l;i++){

        var prefixedProp = this.VENDOR_PREFIXES[i] + qx.lang.String.firstUp(propertyName);
        if(style[prefixedProp] !== undefined){

          return prefixedProp;
        };
      };
      return null;
    },
    /**
     * Detects CSS support by applying a style to a DOM element of the given type
     * and verifying the result. Also checks for vendor-prefixed variants of the
     * value, e.g. "linear-gradient" -> "-webkit-linear-gradient". Returns the
     * (possibly vendor-prefixed) value if successful or <code>null</code> if
     * the property and/or value are not supported.
     *
     * @param element {DOMelement} element to be used for the detection
     * @param propertyName {String} the style property to be tested
     * @param value {String} style property value to be tested
     * @param prefixed {Boolean?} try to determine the appropriate vendor prefix
     * for the value. Default: <code>true</code>
     * @return {String|null} prefixed style value or <code>null</code> if not supported
     * @internal
     */
    getAppliedStyle : function(element, propertyName, value, prefixed){

      var vendorPrefixes = (prefixed !== false) ? [null].concat(this.VENDOR_PREFIXES) : [null];
      for(var i = 0,l = vendorPrefixes.length;i < l;i++){

        var prefixedVal = vendorPrefixes[i] ? "-" + vendorPrefixes[i].toLowerCase() + "-" + value : value;
        // IE might throw an exception
        try{

          element.style[propertyName] = prefixedVal;
          if(typeof element.style[propertyName] == "string" && element.style[propertyName] !== ""){

            return prefixedVal;
          };
        } catch(ex) {
        };
      };
      return null;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Contains methods to control and query the element's box-sizing property.
 *
 * Supported values:
 *
 * * "content-box" = W3C model (dimensions are content specific)
 * * "border-box" = Microsoft model (dimensions are box specific incl. border and padding)
 */
qx.Bootstrap.define("qx.bom.element.BoxSizing", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** {Map} Internal data structure for __usesNativeBorderBox() */
    __nativeBorderBox : {
      tags : {
        button : true,
        select : true
      },
      types : {
        search : true,
        button : true,
        submit : true,
        reset : true,
        checkbox : true,
        radio : true
      }
    },
    /**
     * Whether the given elements defaults to the "border-box" Microsoft model in all cases.
     *
     * @param element {Element} DOM element to query
     * @return {Boolean} true when the element uses "border-box" independently from the doctype
     */
    __usesNativeBorderBox : function(element){

      var map = this.__nativeBorderBox;
      return map.tags[element.tagName.toLowerCase()] || map.types[element.type];
    },
    /**
     * Compiles the given box sizing into a CSS compatible string.
     *
     * @param value {String} Valid CSS box-sizing value
     * @return {String} CSS string
     */
    compile : function(value){

      if(qx.core.Environment.get("css.boxsizing")){

        var prop = qx.lang.String.hyphenate(qx.core.Environment.get("css.boxsizing"));
        return prop + ":" + value + ";";
      } else {

        {
        };
      };
    },
    /**
     * Returns the box sizing for the given element.
     *
     * @param element {Element} The element to query
     * @return {String} Box sizing value of the given element.
     */
    get : function(element){

      if(qx.core.Environment.get("css.boxsizing")){

        return qx.bom.element.Style.get(element, "boxSizing", null, false) || "";
      };
      if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(element))){

        if(!this.__usesNativeBorderBox(element)){

          return "content-box";
        };
      };
      return "border-box";
    },
    /**
     * Applies a new box sizing to the given element
     *
     * @param element {Element} The element to modify
     * @param value {String} New box sizing value to set
     * @return {void}
     */
    set : function(element, value){

      if(qx.core.Environment.get("css.boxsizing")){

        // IE8 bombs when trying to apply an unsupported value
        try{

          element.style[qx.core.Environment.get("css.boxsizing")] = value;
        } catch(ex) {

          {
          };
        };
      } else {

        {
        };
      };
    },
    /**
     * Removes the local box sizing applied to the element
     *
     * @param element {Element} The element to modify
     * @return {void}
     */
    reset : function(element){

      this.set(element, "");
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/* ************************************************************************

#ignore(WebKitCSSMatrix)

************************************************************************ */
/**
 * The purpose of this class is to contain all checks about css.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Css", {
  statics : {
    __WEBKIT_LEGACY_GRADIENT : null,
    /**
     * Checks what box model is used in the current environemnt.
     * @return {String} It either returns "content" or "border".
     * @internal
     */
    getBoxModel : function(){

      var content = qx.bom.client.Engine.getName() !== "mshtml" || !qx.bom.client.Browser.getQuirksMode();
      return content ? "content" : "border";
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>textOverflow</code> style property.
     *
     * @return {String|null} textOverflow property name or <code>null</code> if
     * textOverflow is not supported.
     * @internal
     */
    getTextOverflow : function(){

      return qx.bom.Style.getPropertyName("textOverflow");
    },
    /**
     * Checks if a placeholder could be used.
     * @return {Boolean} <code>true</code>, if it could be used.
     * @internal
     */
    getPlaceholder : function(){

      var i = document.createElement("input");
      return "placeholder" in i;
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>appearance</code> style property.
     *
     * @return {String|null} appearance property name or <code>null</code> if
     * appearance is not supported.
     * @internal
     */
    getAppearance : function(){

      return qx.bom.Style.getPropertyName("appearance");
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>borderRadius</code> style property.
     *
     * @return {String|null} borderRadius property name or <code>null</code> if
     * borderRadius is not supported.
     * @internal
     */
    getBorderRadius : function(){

      return qx.bom.Style.getPropertyName("borderRadius");
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>boxShadow</code> style property.
     *
     * @return {String|null} boxShadow property name or <code>null</code> if
     * boxShadow is not supported.
     * @internal
     */
    getBoxShadow : function(){

      return qx.bom.Style.getPropertyName("boxShadow");
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>borderImage</code> style property.
     *
     * @return {String|null} borderImage property name or <code>null</code> if
     * borderImage is not supported.
     * @internal
     */
    getBorderImage : function(){

      return qx.bom.Style.getPropertyName("borderImage");
    },
    /**
     * Returns the type of syntax this client supports for its CSS border-image
     * implementation. Some browsers do not support the "fill" keyword defined
     * in the W3C draft (http://www.w3.org/TR/css3-background/) and will not
     * show the border image if it's set. Others follow the standard closely and
     * will omit the center image if "fill" is not set.
     *
     * @return {Boolean|null} <code>true</code> if the standard syntax is supported.
     * <code>null</code> if the supported syntax could not be detected.
     * @internal
     */
    getBorderImageSyntax : function(){

      var styleName = qx.bom.client.Css.getBorderImage();
      if(!styleName){

        return null;
      };
      var el = document.createElement("div");
      if(styleName === "borderImage"){

        // unprefixed implementation: check individual properties
        el.style[styleName] = 'url("foo.png") 4 4 4 4 fill stretch';
        if(el.style.borderImageSource.indexOf("foo.png") >= 0 && el.style.borderImageSlice.indexOf("4 fill") >= 0 && el.style.borderImageRepeat.indexOf("stretch") >= 0){

          return true;
        };
      } else {

        // prefixed implementation, assume no support for "fill"
        el.style[styleName] = 'url("foo.png") 4 4 4 4 stretch';
        // serialized value is unreliable, so just a simple check
        if(el.style[styleName].indexOf("foo.png") >= 0){

          return false;
        };
      };
      // unable to determine syntax
      return null;
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>userSelect</code> style property.
     *
     * @return {String|null} userSelect property name or <code>null</code> if
     * userSelect is not supported.
     * @internal
     */
    getUserSelect : function(){

      return qx.bom.Style.getPropertyName("userSelect");
    },
    /**
     * Returns the (possibly vendor-prefixed) value for the
     * <code>userSelect</code> style property that disables selection. For Gecko,
     * "-moz-none" is returned since "none" only makes the target element appear
     * as if its text could not be selected
     *
     * @internal
     * @return {String|null} the userSelect property value that disables
     * selection or <code>null</code> if userSelect is not supported
     */
    getUserSelectNone : function(){

      var styleProperty = qx.bom.client.Css.getUserSelect();
      if(styleProperty){

        var el = document.createElement("span");
        el.style[styleProperty] = "-moz-none";
        return el.style[styleProperty] === "-moz-none" ? "-moz-none" : "none";
      };
      return null;
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>userModify</code> style property.
     *
     * @return {String|null} userModify property name or <code>null</code> if
     * userModify is not supported.
     * @internal
     */
    getUserModify : function(){

      return qx.bom.Style.getPropertyName("userModify");
    },
    /**
     * Returns the vendor-specific name of the <code>float</code> style property
     *
     * @return {String|null} <code>cssFloat</code> for standards-compliant
     * browsers, <code>styleFloat</code> for legacy IEs, <code>null</code> if
     * the client supports neither property.
     * @internal
     */
    getFloat : function(){

      var style = document.documentElement.style;
      return style.cssFloat !== undefined ? "cssFloat" : style.styleFloat !== undefined ? "styleFloat" : null;
    },
    /**
     * Checks if translate3d can be used.
     * @return {Boolean} <code>true</code>, if it could be used.
     * @internal
     * @lint ignoreUndefined(WebKitCSSMatrix)
     */
    getTranslate3d : function(){

      return 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
    },
    /**
     * Returns the (possibly vendor-prefixed) name this client uses for
     * <code>linear-gradient</code>.
     * http://dev.w3.org/csswg/css3-images/#linear-gradients
     *
     * @return {String|null} Prefixed linear-gradient name or <code>null</code>
     * if linear gradients are not supported
     * @internal
     */
    getLinearGradient : function(){

      qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT = false;
      var value = "linear-gradient(0deg, #fff, #000)";
      var el = document.createElement("div");
      var style = qx.bom.Style.getAppliedStyle(el, "backgroundImage", value);
      if(!style){

        //try old WebKit syntax (versions 528 - 534.16)
        value = "-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))";
        var style = qx.bom.Style.getAppliedStyle(el, "backgroundImage", value, false);
        if(style){

          qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT = true;
        };
      };
      // not supported
      if(!style){

        return null;
      };
      var match = /(.*?)\(/.exec(style);
      return match ? match[1] : null;
    },
    /**
     * Returns <code>true</code> if the browser supports setting gradients
     * using the filter style. This usually only applies for IE browsers
     * starting from IE5.5.
     * http://msdn.microsoft.com/en-us/library/ms532997(v=vs.85).aspx
     *
     * @return {Boolean} <code>true</code> if supported.
     * @internal
     */
    getFilterGradient : function(){

      return qx.bom.client.Css.__isFilterSupported("DXImageTransform.Microsoft.Gradient", "startColorStr=#550000FF, endColorStr=#55FFFF00");
    },
    /**
     * Returns the (possibly vendor-prefixed) name this client uses for
     * <code>radial-gradient</code>.
     *
     * @return {String|null} Prefixed radial-gradient name or <code>null</code>
     * if radial gradients are not supported
     * @internal
     */
    getRadialGradient : function(){

      var value = "radial-gradient(0px 0px, cover, red 50%, blue 100%)";
      var el = document.createElement("div");
      var style = qx.bom.Style.getAppliedStyle(el, "backgroundImage", value);
      if(!style){

        return null;
      };
      var match = /(.*?)\(/.exec(style);
      return match ? match[1] : null;
    },
    /**
     * Checks if **only** the old WebKit (version < 534.16) syntax for
     * linear gradients is supported, e.g.
     * <code>linear-gradient(0deg, #fff, #000)</code>
     *
     * @return {Boolean} <code>true</code> if the legacy syntax must be used
     * @internal
     */
    getLegacyWebkitGradient : function(){

      if(qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT === null){

        qx.bom.client.Css.getLinearGradient();
      };
      return qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT;
    },
    /**
     * Checks if rgba colors can be used:
     * http://www.w3.org/TR/2010/PR-css3-color-20101028/#rgba-color
     *
     * @return {Boolean} <code>true</code>, if rgba colors are supported.
     * @internal
     */
    getRgba : function(){

      var el;
      try{

        el = document.createElement("div");
      } catch(ex) {

        el = document.createElement();
      };
      // try catch for IE
      try{

        el.style["color"] = "rgba(1, 2, 3, 0.5)";
        if(el.style["color"].indexOf("rgba") != -1){

          return true;
        };
      } catch(ex) {
      };
      return false;
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>boxSizing</code> style property.
     *
     * @return {String|null} boxSizing property name or <code>null</code> if
     * boxSizing is not supported.
     * @internal
     */
    getBoxSizing : function(){

      return qx.bom.Style.getPropertyName("boxSizing");
    },
    /**
     * Returns the browser-specific name used for the <code>display</code> style
     * property's <code>inline-block</code> value.
     *
     * @internal
     * @return {String|null}
     */
    getInlineBlock : function(){

      var el = document.createElement("span");
      el.style.display = "inline-block";
      if(el.style.display == "inline-block"){

        return "inline-block";
      };
      el.style.display = "-moz-inline-box";
      if(el.style.display !== "-moz-inline-box"){

        return "-moz-inline-box";
      };
      return null;
    },
    /**
     * Checks if CSS opacity is supported
     *
     * @internal
     * @return {Boolean} <code>true</code> if opacity is supported
     */
    getOpacity : function(){

      return (typeof document.documentElement.style.opacity == "string");
    },
    /**
     * Checks if the overflowX and overflowY style properties are supported
     *
     * @internal
     * @return {Boolean} <code>true</code> if overflow-x and overflow-y can be
     * used
     */
    getOverflowXY : function(){

      return (typeof document.documentElement.style.overflowX == "string") && (typeof document.documentElement.style.overflowY == "string");
    },
    /**
     * Checks if CSS texShadow is supported
     *
     * @internal
     * @return {Boolean} <code>true</code> if textShadow is supported
     */
    getTextShadow : function(){

      var value = "red 1px 1px 3px";
      var el = document.createElement("div");
      var style = qx.bom.Style.getAppliedStyle(el, "textShadow", value);
      return !style;
    },
    /**
     * Returns <code>true</code> if the browser supports setting text shadow
     * using the filter style. This usually only applies for IE browsers
     * starting from IE5.5.
     *
     * @internal
     * @return {Boolean} <code>true</code> if textShadow is supported
     */
    getFilterTextShadow : function(){

      return qx.bom.client.Css.__isFilterSupported("DXImageTransform.Microsoft.Shadow", "color=#666666,direction=45");
    },
    /**
     * Checks if the given filter is supported.
     *
     * @param filterClass {String} The name of the filter class
     * @param initParams {String} Init values for the filter
     * @return {Boolean} <code>true</code> if the given filter is supported
     */
    __isFilterSupported : function(filterClass, initParams){

      var supported = false;
      var value = "progid:" + filterClass + "(" + initParams + ");";
      var el = document.createElement("div");
      document.body.appendChild(el);
      el.style.filter = value;
      if(el.filters && el.filters.length > 0 && el.filters.item(filterClass).enabled == true){

        supported = true;
      };
      document.body.removeChild(el);
      return supported;
    }
  },
  defer : function(statics){

    qx.core.Environment.add("css.textoverflow", statics.getTextOverflow);
    qx.core.Environment.add("css.placeholder", statics.getPlaceholder);
    qx.core.Environment.add("css.borderradius", statics.getBorderRadius);
    qx.core.Environment.add("css.boxshadow", statics.getBoxShadow);
    qx.core.Environment.add("css.gradient.linear", statics.getLinearGradient);
    qx.core.Environment.add("css.gradient.filter", statics.getFilterGradient);
    qx.core.Environment.add("css.gradient.radial", statics.getRadialGradient);
    qx.core.Environment.add("css.gradient.legacywebkit", statics.getLegacyWebkitGradient);
    qx.core.Environment.add("css.boxmodel", statics.getBoxModel);
    qx.core.Environment.add("css.rgba", statics.getRgba);
    qx.core.Environment.add("css.borderimage", statics.getBorderImage);
    qx.core.Environment.add("css.borderimage.standardsyntax", statics.getBorderImageSyntax);
    qx.core.Environment.add("css.usermodify", statics.getUserModify);
    qx.core.Environment.add("css.userselect", statics.getUserSelect);
    qx.core.Environment.add("css.userselect.none", statics.getUserSelectNone);
    qx.core.Environment.add("css.appearance", statics.getAppearance);
    qx.core.Environment.add("css.float", statics.getFloat);
    qx.core.Environment.add("css.boxsizing", statics.getBoxSizing);
    qx.core.Environment.add("css.inlineblock", statics.getInlineBlock);
    qx.core.Environment.add("css.opacity", statics.getOpacity);
    qx.core.Environment.add("css.overflowxy", statics.getOverflowXY);
    qx.core.Environment.add("css.textShadow", statics.getTextShadow);
    qx.core.Environment.add("css.textShadow.filter", statics.getFilterTextShadow);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)
     * Sebastian Fastner (fastner)

************************************************************************ */
/**
 * This class is responsible for checking the operating systems name.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.OperatingSystem", {
  statics : {
    /**
     * Checks for the name of the operating system.
     * @return {String} The name of the operating system.
     * @internal
     */
    getName : function(){

      if(!navigator){

        return "";
      };
      var input = navigator.platform || "";
      var agent = navigator.userAgent || "";
      if(input.indexOf("Windows") != -1 || input.indexOf("Win32") != -1 || input.indexOf("Win64") != -1){

        return "win";
      } else if(input.indexOf("Macintosh") != -1 || input.indexOf("MacPPC") != -1 || input.indexOf("MacIntel") != -1 || input.indexOf("Mac OS X") != -1){

        return "osx";
      } else if(agent.indexOf("RIM Tablet OS") != -1){

        return "rim_tabletos";
      } else if(agent.indexOf("webOS") != -1){

        return "webos";
      } else if(input.indexOf("iPod") != -1 || input.indexOf("iPhone") != -1 || input.indexOf("iPad") != -1){

        return "ios";
      } else if(agent.indexOf("Android") != -1){

        return "android";
      } else if(input.indexOf("Linux") != -1){

        return "linux";
      } else if(input.indexOf("X11") != -1 || input.indexOf("BSD") != -1 || input.indexOf("Darwin") != -1){

        return "unix";
      } else if(input.indexOf("SymbianOS") != -1){

        return "symbian";
      } else if(input.indexOf("BlackBerry") != -1){

        return "blackberry";
      };;;;;;;;;
      // don't know
      return "";
    },
    /** Maps user agent names to system IDs */
    __ids : {
      // Windows
      "Windows NT 6.2" : "8",
      "Windows NT 6.1" : "7",
      "Windows NT 6.0" : "vista",
      "Windows NT 5.2" : "2003",
      "Windows NT 5.1" : "xp",
      "Windows NT 5.0" : "2000",
      "Windows 2000" : "2000",
      "Windows NT 4.0" : "nt4",
      "Win 9x 4.90" : "me",
      "Windows CE" : "ce",
      "Windows 98" : "98",
      "Win98" : "98",
      "Windows 95" : "95",
      "Win95" : "95",
      // OS X
      "Mac OS X 10_7" : "10.7",
      "Mac OS X 10.7" : "10.7",
      "Mac OS X 10_6" : "10.6",
      "Mac OS X 10.6" : "10.6",
      "Mac OS X 10_5" : "10.5",
      "Mac OS X 10.5" : "10.5",
      "Mac OS X 10_4" : "10.4",
      "Mac OS X 10.4" : "10.4",
      "Mac OS X 10_3" : "10.3",
      "Mac OS X 10.3" : "10.3",
      "Mac OS X 10_2" : "10.2",
      "Mac OS X 10.2" : "10.2",
      "Mac OS X 10_1" : "10.1",
      "Mac OS X 10.1" : "10.1",
      "Mac OS X 10_0" : "10.0",
      "Mac OS X 10.0" : "10.0"
    },
    /**
     * Checks for the version of the operating system using the internal map.
     *
     * @internal
     * @return {String} The version as strin or an empty string if the version
     *   could not be detected.
     */
    getVersion : function(){

      var version = qx.bom.client.OperatingSystem.__getVersionForDesktopOs(navigator.userAgent);
      if(version == null){

        version = qx.bom.client.OperatingSystem.__getVersionForMobileOs(navigator.userAgent);
      };
      if(version != null){

        return version;
      } else {

        return "";
      };
    },
    /**
     * Detect OS version for desktop devices
     * @param userAgent {String} userAgent parameter, needed for detection.
     * @return {String} version number as string or null.
     */
    __getVersionForDesktopOs : function(userAgent){

      var str = [];
      for(var key in qx.bom.client.OperatingSystem.__ids){

        str.push(key);
      };
      var reg = new RegExp("(" + str.join("|").replace(/\./g, "\.") + ")", "g");
      var match = reg.exec(userAgent);
      if(match && match[1]){

        return qx.bom.client.OperatingSystem.__ids[match[1]];
      };
      return null;
    },
    /**
     * Detect OS version for mobile devices
     * @param userAgent {String} userAgent parameter, needed for detection.
     * @return {String} version number as string or null.
     */
    __getVersionForMobileOs : function(userAgent){

      var android = userAgent.indexOf("Android") != -1;
      var iOs = userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false;
      if(android){

        var androidVersionRegExp = new RegExp(/ Android (\d+(?:\.\d+)+)/i);
        var androidMatch = androidVersionRegExp.exec(userAgent);
        if(androidMatch && androidMatch[1]){

          return androidMatch[1];
        };
      } else if(iOs){

        var iOsVersionRegExp = new RegExp(/(CPU|iPhone|iPod) OS (\d+)_(\d+)\s+/);
        var iOsMatch = iOsVersionRegExp.exec(userAgent);
        if(iOsMatch && iOsMatch[2] && iOsMatch[3]){

          return iOsMatch[2] + "." + iOsMatch[3];
        };
      };
      return null;
    }
  },
  defer : function(statics){

    qx.core.Environment.add("os.name", statics.getName);
    qx.core.Environment.add("os.version", statics.getVersion);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Hagendorn (chris_schmidt)
     * Martin Wittemann (martinwittemann)

   ======================================================================

   This class contains code from:

     Copyright:
       2009 Deutsche Telekom AG, Germany, http://telekom.com

     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php

     Authors:
       * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code from:

     Copyright:
       2011 Pocket Widget S.L., Spain, http://www.pocketwidget.com

     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php

     Authors:
       * Javier Martinez Villacampa


************************************************************************ */
/**
#require(qx.bom.client.OperatingSystem#getVersion)
*/
/**
 * Basic browser detection for qooxdoo.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Browser", {
  statics : {
    /**
     * Checks for the name of the browser and returns it.
     * @return {String} The name of the current browser.
     * @internal
     */
    getName : function(){

      var agent = navigator.userAgent;
      var reg = new RegExp("(" + qx.bom.client.Browser.__agents + ")(/| )([0-9]+\.[0-9])");
      var match = agent.match(reg);
      if(!match){

        return "";
      };
      var name = match[1].toLowerCase();
      var engine = qx.bom.client.Engine.getName();
      if(engine === "webkit"){

        if(name === "android"){

          // Fix Chrome name (for instance wrongly defined in user agent on Android 1.6)
          name = "mobile chrome";
        } else if(agent.indexOf("Mobile Safari") !== -1 || agent.indexOf("Mobile/") !== -1){

          // Fix Safari name
          name = "mobile safari";
        };
      } else if(engine === "mshtml"){

        if(name === "msie"){

          name = "ie";
          // Fix IE mobile before Microsoft added IEMobile string
          if(qx.bom.client.OperatingSystem.getVersion() === "ce"){

            name = "iemobile";
          };
        };
      } else if(engine === "opera"){

        if(name === "opera mobi"){

          name = "operamobile";
        } else if(name === "opera mini"){

          name = "operamini";
        };
      } else if(engine === "gecko"){

        if(agent.indexOf("Maple") !== -1){

          name = "maple";
        };
      };;;
      return name;
    },
    /**
     * Determines the version of the current browser.
     * @return {String} The name of the current browser.
     * @internal
     */
    getVersion : function(){

      var agent = navigator.userAgent;
      var reg = new RegExp("(" + qx.bom.client.Browser.__agents + ")(/| )([0-9]+\.[0-9])");
      var match = agent.match(reg);
      if(!match){

        return "";
      };
      var name = match[1].toLowerCase();
      var version = match[3];
      // Support new style version string used by Opera and Safari
      if(agent.match(/Version(\/| )([0-9]+\.[0-9])/)){

        version = RegExp.$2;
      };
      if(qx.bom.client.Engine.getName() == "mshtml"){

        // Use the Engine version, because IE8 and higher change the user agent
        // string to an older version in compatibility mode
        version = qx.bom.client.Engine.getVersion();
        if(name === "msie" && qx.bom.client.OperatingSystem.getVersion() == "ce"){

          // Fix IE mobile before Microsoft added IEMobile string
          version = "5.0";
        };
      };
      if(qx.bom.client.Browser.getName() == "maple"){

        // Fix version detection for Samsung Smart TVs Maple browser from 2010 and 2011 models
        reg = new RegExp("(Maple )([0-9]+\.[0-9]+\.[0-9]*)");
        match = agent.match(reg);
        if(!match){

          return "";
        };
        version = match[2];
      };
      return version;
    },
    /**
     * Returns in which document mode the current document is (only for IE).
     *
     * @internal
     * @return {Number} The mode in which the browser is.
     */
    getDocumentMode : function(){

      if(document.documentMode){

        return document.documentMode;
      };
      return 0;
    },
    /**
     * Check if in quirks mode.
     *
     * @internal
     * @return {Boolean} <code>true</code>, if the environment is in quirks mode
     */
    getQuirksMode : function(){

      if(qx.bom.client.Engine.getName() == "mshtml" && parseFloat(qx.bom.client.Engine.getVersion()) >= 8){

        return qx.bom.client.Engine.DOCUMENT_MODE === 5;
      } else {

        return document.compatMode !== "CSS1Compat";
      };
    },
    /**
     * Internal helper map for picking the right browser names to check.
     */
    __agents : {
      // Safari should be the last one to check, because some other Webkit-based browsers
      // use this identifier together with their own one.
      // "Version" is used in Safari 4 to define the Safari version. After "Safari" they place the
      // Webkit version instead. Silly.
      // Palm Pre uses both Safari (contains Webkit version) and "Version" contains the "Pre" version. But
      // as "Version" is not Safari here, we better detect this as the Pre-Browser version. So place
      // "Pre" in front of both "Version" and "Safari".
      "webkit" : "AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",
      // Better security by keeping Firefox the last one to match
      "gecko" : "prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",
      // No idea what other browsers based on IE's engine
      "mshtml" : "IEMobile|Maxthon|MSIE",
      // Keep "Opera" the last one to correctly prefer/match the mobile clients
      "opera" : "Opera Mini|Opera Mobi|Opera"
    }[qx.bom.client.Engine.getName()]
  },
  defer : function(statics){

    qx.core.Environment.add("browser.name", statics.getName),qx.core.Environment.add("browser.version", statics.getVersion),qx.core.Environment.add("browser.documentmode", statics.getDocumentMode),qx.core.Environment.add("browser.quirksmode", statics.getQuirksMode);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Contains methods to control and query the element's cursor property
 */
qx.Bootstrap.define("qx.bom.element.Cursor", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** Internal helper structure to map cursor values to supported ones */
    __map : qx.core.Environment.select("engine.name", {
      "mshtml" : {
        "cursor" : "hand",
        "ew-resize" : "e-resize",
        "ns-resize" : "n-resize",
        "nesw-resize" : "ne-resize",
        "nwse-resize" : "nw-resize"
      },
      "opera" : {
        "col-resize" : "e-resize",
        "row-resize" : "n-resize",
        "ew-resize" : "e-resize",
        "ns-resize" : "n-resize",
        "nesw-resize" : "ne-resize",
        "nwse-resize" : "nw-resize"
      },
      "default" : {
      }
    }),
    /**
     * Compiles the given cursor into a CSS compatible string.
     *
     * @param cursor {String} Valid CSS cursor name
     * @return {String} CSS string
     */
    compile : function(cursor){

      return "cursor:" + (this.__map[cursor] || cursor) + ";";
    },
    /**
     * Returns the computed cursor style for the given element.
     *
     * @param element {Element} The element to query
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {String} Computed cursor value of the given element.
     */
    get : function(element, mode){

      return qx.bom.element.Style.get(element, "cursor", mode, false);
    },
    /**
     * Applies a new cursor style to the given element
     *
     * @param element {Element} The element to modify
     * @param value {String} New cursor value to set
     * @return {void}
     */
    set : function(element, value){

      element.style.cursor = this.__map[value] || value;
    },
    /**
     * Removes the local cursor style applied to the element
     *
     * @param element {Element} The element to modify
     * @return {void}
     */
    reset : function(element){

      element.style.cursor = "";
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */
/**
 * Helper functions to handle Object as a Hash map.
 */
qx.Bootstrap.define("qx.lang.Object", {
  statics : {
    /**
     * Clears the map from all values
     *
     * @param map {Object} the map to clear
     */
    empty : function(map){

      {
      };
      for(var key in map){

        if(map.hasOwnProperty(key)){

          delete map[key];
        };
      };
    },
    /**
     * Check if the hash has any keys
     *
     * @signature function(map)
     * @param map {Object} the map to check
     * @return {Boolean} whether the map has any keys
     */
    isEmpty : function(map){

      {
      };
      for(var key in map){

        return false;
      };
      return true;
    },
    /**
     * Check whether the number of objects in the maps is at least "length"
     *
     * @signature function(map, minLength)
     * @param map {Object} the map to check
     * @param minLength {Integer} minimum number of objects in the map
     * @return {Boolean} whether the map contains at least "length" objects.
     */
    hasMinLength : function(map, minLength){

      {
      };
      if(minLength <= 0){

        return true;
      };
      var length = 0;
      for(var key in map){

        if((++length) >= minLength){

          return true;
        };
      };
      return false;
    },
    /**
     * Get the number of objects in the map
     *
     * @signature function(map)
     * @param map {Object} the map
     * @return {Integer} number of objects in the map
     */
    getLength : qx.Bootstrap.objectGetLength,
    /**
     * Get the keys of a map as array as returned by a "for ... in" statement.
     *
     * @signature function(map)
     * @param map {Object} the map
     * @return {Array} array of the keys of the map
     */
    getKeys : qx.Bootstrap.getKeys,
    /**
     * Get the keys of a map as string
     *
     * @signature function(map)
     * @param map {Object} the map
     * @return {String} String of the keys of the map
     *         The keys are separated by ", "
     */
    getKeysAsString : qx.Bootstrap.getKeysAsString,
    /**
     * Get the values of a map as array
     *
     * @param map {Object} the map
     * @return {Array} array of the values of the map
     */
    getValues : function(map){

      {
      };
      var arr = [];
      var keys = this.getKeys(map);
      for(var i = 0,l = keys.length;i < l;i++){

        arr.push(map[keys[i]]);
      };
      return arr;
    },
    /**
     * Inserts all keys of the source object into the
     * target objects. Attention: The target map gets modified.
     *
     * @signature function(target, source, overwrite)
     * @param target {Object} target object
     * @param source {Object} object to be merged
     * @param overwrite {Boolean ? true} If enabled existing keys will be overwritten
     * @return {Object} Target with merged values from the source object
     */
    mergeWith : qx.Bootstrap.objectMergeWith,
    /**
     * Inserts all key/value pairs of the source object into the
     * target object but doesn't override existing keys
     *
     * @param target {Object} target object
     * @param source {Object} object to be merged
     * @return {Object} target with merged values from source
     */
    carefullyMergeWith : function(target, source){

      {
      };
      return qx.lang.Object.mergeWith(target, source, false);
    },
    /**
     * Merge a number of objects.
     *
     * @param target {Object} target object
     * @param varargs {Object} variable number of objects to merged with target
     * @return {Object} target with merged values from the other objects
     */
    merge : function(target, varargs){

      {
      };
      var len = arguments.length;
      for(var i = 1;i < len;i++){

        qx.lang.Object.mergeWith(target, arguments[i]);
      };
      return target;
    },
    /**
     * Return a copy of an Object
     *
     * @param source {Object} Object to copy
     * @param deep {Boolean} If the clone should be a deep clone.
     * @return {Object} A copy of the object
     */
    clone : function(source, deep){

      if(qx.lang.Type.isObject(source)){

        var clone = {
        };
        for(var key in source){

          if(deep){

            clone[key] = qx.lang.Object.clone(source[key], deep);
          } else {

            clone[key] = source[key];
          };
        };
        return clone;
      } else if(qx.lang.Type.isArray(source)){

        var clone = [];
        for(var i = 0;i < source.length;i++){

          if(deep){

            clone[i] = qx.lang.Object.clone(source[i]);
          } else {

            clone[i] = source[i];
          };
        };
        return clone;
      };
      return source;
    },
    /**
     * Inverts a map by exchanging the keys with the values.
     *
     * If the map has the same values for different keys, information will get lost.
     * The values will be converted to strings using the toString methods.
     *
     * @param map {Object} Map to invert
     * @return {Object} inverted Map
     */
    invert : function(map){

      {
      };
      var result = {
      };
      for(var key in map){

        result[map[key].toString()] = key;
      };
      return result;
    },
    /**
     * Get the key of the given value from a map.
     * If the map has more than one key matching the value, the first match is returned.
     * If the map does not contain the value, <code>null</code> is returned.
     *
     * @param map {Object} Map to search for the key
     * @param value {var} Value to look for
     * @return {String|null} Name of the key (null if not found).
     */
    getKeyFromValue : function(map, value){

      {
      };
      for(var key in map){

        if(map.hasOwnProperty(key) && map[key] === value){

          return key;
        };
      };
      return null;
    },
    /**
     * Whether the map contains the given value.
     *
     * @param map {Object} Map to search for the value
     * @param value {var} Value to look for
     * @return {Boolean} Whether the value was found in the map.
     */
    contains : function(map, value){

      {
      };
      return this.getKeyFromValue(map, value) !== null;
    },
    /**
    * Selects the value with the given key from the map.
    *
    * @param key {String} name of the key to get the value from
    * @param map {Object} map to get the value from
    * @return {var} value for the given key from the map
    */
    select : function(key, map){

      {
      };
      return map[key];
    },
    /**
    * Convert an array into a map.
    *
    * All elements of the array become keys of the returned map by
    * calling <code>toString</code> on the array elements. The values of the
    * map are set to <code>true</code>
    *
    * @param array {Array} array to convert
    * @return {Map} the array converted to a map.
    */
    fromArray : function(array){

      {
      };
      var obj = {
      };
      for(var i = 0,l = array.length;i < l;i++){

        {
        };
        obj[array[i].toString()] = true;
      };
      return obj;
    },
    /**
     * Serializes an object to URI parameters (also known as query string).
     *
     * Escapes characters that have a special meaning in URIs as well as
     * umlauts. Uses the global function encodeURIComponent, see
     * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/encodeURIComponent
     *
     * Note: For URI parameters that are to be sent as
     * application/x-www-form-urlencoded (POST), spaces should be encoded
     * with "+".
     *
     * @param obj {Object}   Object to serialize.
     * @param post {Boolean} Whether spaces should be encoded with "+".
     * @return {String}      Serialized object. Safe to append to URIs or send as
     *                       URL encoded string.
     *
     */
    toUriParameter : function(obj, post){

      var key,parts = [];
      for(key in obj){

        if(obj.hasOwnProperty(key)){

          var value = obj[key];
          if(value instanceof Array){

            for(var i = 0;i < value.length;i++){

              this.__toUriParameter(key, value[i], parts, post);
            };
          } else {

            this.__toUriParameter(key, value, parts, post);
          };
        };
      };
      return parts.join("&");
    },
    /**
     * Encodes key/value to URI safe string and pushes to given array.
     *
     * @param key {String} Key.
     * @param value {String} Value.
     * @param parts {Array} Array to push to.
     * @param post {Boolean} Whether spaces should be encoded with "+".
     */
    __toUriParameter : function(key, value, parts, post){

      var encode = window.encodeURIComponent;
      if(post){

        parts.push(encode(key).replace(/%20/g, "+") + "=" + encode(value).replace(/%20/g, "+"));
      } else {

        parts.push(encode(key) + "=" + encode(value));
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Utility class with type check for all native JavaScript data types.
 */
qx.Bootstrap.define("qx.lang.Type", {
  statics : {
    /**
     * Get the internal class of the value. See
     * http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
     * for details.
     *
     * @signature function(value)
     * @param value {var} value to get the class for
     * @return {String} the internal class of the value
     */
    getClass : qx.Bootstrap.getClass,
    /**
     * Whether the value is a string.
     *
     * @signature function(value)
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is a string.
     */
    isString : qx.Bootstrap.isString,
    /**
     * Whether the value is an array.
     *
     * @signature function(value)
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is an array.
     */
    isArray : qx.Bootstrap.isArray,
    /**
     * Whether the value is an object. Note that built-in types like Window are
     * not reported to be objects.
     *
     * @signature function(value)
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is an object.
     */
    isObject : qx.Bootstrap.isObject,
    /**
     * Whether the value is a function.
     *
     * @signature function(value)
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is a function.
     */
    isFunction : qx.Bootstrap.isFunction,
    /**
    * Whether the value is a regular expression.
    *
    * @param value {var} Value to check.
    * @return {Boolean} Whether the value is a regular expression.
    */
    isRegExp : function(value){

      return this.getClass(value) == "RegExp";
    },
    /**
    * Whether the value is a number.
    *
    * @param value {var} Value to check.
    * @return {Boolean} Whether the value is a number.
    */
    isNumber : function(value){

      // Added "value !== null" because IE throws an exception "Object expected"
      // by executing "value instanceof Number" if value is a DOM element that
      // doesn't exist. It seems that there is an internal different between a
      // JavaScript null and a null returned from calling DOM.
      // e.q. by document.getElementById("ReturnedNull").
      return (value !== null && (this.getClass(value) == "Number" || value instanceof Number));
    },
    /**
    * Whether the value is a boolean.
    *
    * @param value {var} Value to check.
    * @return {Boolean} Whether the value is a boolean.
    */
    isBoolean : function(value){

      // Added "value !== null" because IE throws an exception "Object expected"
      // by executing "value instanceof Boolean" if value is a DOM element that
      // doesn't exist. It seems that there is an internal different between a
      // JavaScript null and a null returned from calling DOM.
      // e.q. by document.getElementById("ReturnedNull").
      return (value !== null && (this.getClass(value) == "Boolean" || value instanceof Boolean));
    },
    /**
     * Whether the value is a date.
     *
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is a date.
     */
    isDate : function(value){

      // Added "value !== null" because IE throws an exception "Object expected"
      // by executing "value instanceof Date" if value is a DOM element that
      // doesn't exist. It seems that there is an internal different between a
      // JavaScript null and a null returned from calling DOM.
      // e.q. by document.getElementById("ReturnedNull").
      return (value !== null && (this.getClass(value) == "Date" || value instanceof Date));
    },
    /**
     * Whether the value is a Error.
     *
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is a Error.
     */
    isError : function(value){

      // Added "value !== null" because IE throws an exception "Object expected"
      // by executing "value instanceof Error" if value is a DOM element that
      // doesn't exist. It seems that there is an internal different between a
      // JavaScript null and a null returned from calling DOM.
      // e.q. by document.getElementById("ReturnedNull").
      return (value !== null && (this.getClass(value) == "Error" || value instanceof Error));
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Contains methods to control and query the element's overflow properties.
 */
qx.Bootstrap.define("qx.bom.element.Overflow", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * The default width which is used for the width of the scroll bar if
     * overlayed.
     */
    DEFAULT_SCROLLBAR_WIDTH : 14,
    /** {Integer} The typical native scrollbar size in the environment */
    __scrollbarSize : null,
    /**
     * Get the typical native scrollbar size in the environment
     *
     * @return {Integer} The native scrollbar size
     */
    getScrollbarWidth : function(){

      if(this.__scrollbarSize !== null){

        return this.__scrollbarSize;
      };
      var Style = qx.bom.element.Style;
      var getStyleSize = function(el, propertyName){

        return parseInt(Style.get(el, propertyName), 10) || 0;
      };
      var getBorderRight = function(el){

        return (Style.get(el, "borderRightStyle") == "none" ? 0 : getStyleSize(el, "borderRightWidth"));
      };
      var getBorderLeft = function(el){

        return (Style.get(el, "borderLeftStyle") == "none" ? 0 : getStyleSize(el, "borderLeftWidth"));
      };
      var getInsetRight = qx.core.Environment.select("engine.name", {
        "mshtml" : function(el){

          if(Style.get(el, "overflowY") == "hidden" || el.clientWidth == 0){

            return getBorderRight(el);
          };
          return Math.max(0, el.offsetWidth - el.clientLeft - el.clientWidth);
        },
        "default" : function(el){

          // Alternative method if clientWidth is unavailable
          // clientWidth == 0 could mean both: unavailable or really 0
          if(el.clientWidth == 0){

            var ov = Style.get(el, "overflow");
            var sbv = (ov == "scroll" || ov == "-moz-scrollbars-vertical" ? 16 : 0);
            return Math.max(0, getBorderRight(el) + sbv);
          };
          return Math.max(0, (el.offsetWidth - el.clientWidth - getBorderLeft(el)));
        }
      });
      var getScrollBarSizeRight = function(el){

        return getInsetRight(el) - getBorderRight(el);
      };
      var t = document.createElement("div");
      var s = t.style;
      s.height = s.width = "100px";
      s.overflow = "scroll";
      document.body.appendChild(t);
      var c = getScrollBarSizeRight(t);
      this.__scrollbarSize = c;
      document.body.removeChild(t);
      return this.__scrollbarSize;
    },
    /**
     * Compiles the given property into a cross-browser style string.
     *
     * @signature function(prop, value)
     * @param prop {String} Property name (overflowX or overflowY)
     * @param value {String} Overflow value for the given axis
     * @return {String} CSS string
     */
    _compile : function(prop, value){

      if(!qx.core.Environment.get("css.overflowxy")){

        prop = "overflow:";
        if(qx.core.Environment.get("engine.name") === "gecko" && value == "hidden"){

          value = "-moz-scrollbars-none";
        };
      };
      return prop + ":" + value + ";";
    },
    /**
     * Compiles the horizontal overflow property into a cross-browser style string.
     *
     * @param value {String} Overflow value
     * @return {String} CSS string
     */
    compileX : function(value){

      return this._compile("overflow-x", value);
    },
    /**
     * Compiles the vertical overflow property into a cross-browser style string.
     *
     * @param value {String} Overflow value
     * @return {String} CSS string
     */
    compileY : function(value){

      return this._compile("overflow-y", value);
    },
    // Mozilla notes (http://developer.mozilla.org/en/docs/Mozilla_CSS_Extensions):
    // -moz-scrollbars-horizontal: Indicates that horizontal scrollbars should
    //    always appear and vertical scrollbars should never appear.
    // -moz-scrollbars-vertical: Indicates that vertical scrollbars should
    //    always appear and horizontal scrollbars should never appear.
    // -moz-scrollbars-none: Indicates that no scrollbars should appear but
    //    the element should be scrollable from script. (This is the same as
    //    hidden, and has been since Mozilla 1.6alpha.)
    //
    // Also a lot of interesting bugs:
    // * https://bugzilla.mozilla.org/show_bug.cgi?id=42676
    // * https://bugzilla.mozilla.org/show_bug.cgi?id=47710
    // * https://bugzilla.mozilla.org/show_bug.cgi?id=235524
    /**
     * Returns the computed value of the horizontal overflow
     *
     * @param element {Element} DOM element to query
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {String} computed overflow value
     */
    getX : function(element, mode){

      if(qx.core.Environment.get("css.overflowxy")){

        return qx.bom.element.Style.get(element, "overflowX", mode, false);
      };
      var overflow = qx.bom.element.Style.get(element, "overflow", mode, false);
      if(overflow === "-moz-scrollbars-none"){

        overflow = "hidden";
      };
      return overflow;
    },
    /**
     * Sets the local horizontal overflow value to the given value
     *
     * @param element {Element} DOM element to modify
     * @param value {String} Any of "visible", "scroll", "hidden", "auto" or ""
     * @return {void}
     */
    setX : function(element, value){

      if(qx.core.Environment.get("css.overflowxy")){

        element.style.overflowX = value;
      } else {

        if(value === "hidden" && qx.core.Environment.get("engine.name") === "gecko" && parseFloat(qx.core.Environment.get("engine.version")) < 1.8){

          value = "-moz-scrollbars-none";
        };
        element.style.overflow = value;
      };
    },
    /**
     * Removes the locally configured horizontal overflow property
     *
     * @param element {Element} DOM element to modify
     * @return {void}
     */
    resetX : function(element){

      if(qx.core.Environment.get("css.overflowxy")){

        element.style.overflowX = "";
      } else {

        element.style.overflow = "";
      };
    },
    /**
     * Returns the computed value of the vertical overflow
     *
     * @param element {Element} DOM element to query
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {String} computed overflow value
     */
    getY : function(element, mode){

      if(qx.core.Environment.get("css.overflowxy")){

        return qx.bom.element.Style.get(element, "overflowY", mode, false);
      };
      var overflow = qx.bom.element.Style.get(element, "overflow", mode, false);
      if(overflow === "-moz-scrollbars-none"){

        overflow = "hidden";
      };
      return overflow;
    },
    /**
     * Sets the local vertical overflow value to the given value
     *
     * @param element {Element} DOM element to modify
     * @param value {String} Any of "visible", "scroll", "hidden", "auto" or ""
     * @return {void}
     */
    setY : function(element, value){

      if(qx.core.Environment.get("css.overflowxy")){

        element.style.overflowY = value;
      } else {

        if(value === "hidden" && qx.core.Environment.get("engine.name") === "gecko" && parseFloat(qx.core.Environment.get("engine.version")) < 1.8){

          value = "-moz-scrollbars-none";
        };
        element.style.overflow = value;
      };
    },
    /**
     * Removes the locally configured vertical overflow property
     *
     * @param element {Element} DOM element to modify
     * @return {void}
     */
    resetY : function(element){

      if(qx.core.Environment.get("css.overflowxy")){

        element.style.overflowY = "";
      } else {

        element.style.overflow = "";
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Christian Hagendorn (chris_schmidt)

   ======================================================================

   This class contains code based on the following work:

   * Prototype JS
     http://www.prototypejs.org/
     Version 1.5

     Copyright:
       (c) 2006-2007, Prototype Core Team

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Prototype Core Team

   ----------------------------------------------------------------------

     Copyright (c) 2005-2008 Sam Stephenson

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */
/**
 * Cross-browser opacity support.
 *
 * Optimized for animations (contains workarounds for typical flickering
 * in some browsers). Reduced class dependencies for optimal size and
 * performance.
 */
qx.Bootstrap.define("qx.bom.element.Opacity", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * {Boolean} <code>true</code> when the style attribute "opacity" is supported,
     * <code>false</code> otherwise.
     */
    SUPPORT_CSS3_OPACITY : false,
    /**
     * Compiles the given opacity value into a cross-browser CSS string.
     * Accepts numbers between zero and one
     * where "0" means transparent, "1" means opaque.
     *
     * @signature function(opacity)
     * @param opacity {Float} A float number between 0 and 1
     * @return {String} CSS compatible string
     */
    compile : qx.core.Environment.select("engine.name", {
      "mshtml" : function(opacity){

        if(opacity >= 1){

          opacity = 1;
        };
        if(opacity < 0.00001){

          opacity = 0;
        };
        if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){

          return "opacity:" + opacity + ";";
        } else {

          return "zoom:1;filter:alpha(opacity=" + (opacity * 100) + ");";
        };
      },
      "gecko" : function(opacity){

        // Animations look better when not using 1.0 in gecko
        if(opacity >= 1){

          opacity = 0.999999;
        };
        return "opacity:" + opacity + ";";
      },
      "default" : function(opacity){

        if(opacity >= 1){

          return "";
        };
        return "opacity:" + opacity + ";";
      }
    }),
    /**
     * Sets opacity of given element. Accepts numbers between zero and one
     * where "0" means transparent, "1" means opaque.
     *
     * @param element {Element} DOM element to modify
     * @param opacity {Float} A float number between 0 and 1
     * @return {void}
     * @signature function(element, opacity)
     */
    set : qx.core.Environment.select("engine.name", {
      "mshtml" : function(element, opacity){

        if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){

          if(opacity >= 1){

            opacity = "";
          };
          element.style.opacity = opacity;
        } else {

          // Read in computed filter
          var filter = qx.bom.element.Style.get(element, "filter", qx.bom.element.Style.COMPUTED_MODE, false);
          if(opacity >= 1){

            opacity = 1;
          };
          if(opacity < 0.00001){

            opacity = 0;
          };
          // IE has trouble with opacity if it does not have layout (hasLayout)
          // Force it by setting the zoom level
          if(!element.currentStyle || !element.currentStyle.hasLayout){

            element.style.zoom = 1;
          };
          // Remove old alpha filter and add new one
          element.style.filter = filter.replace(/alpha\([^\)]*\)/gi, "") + "alpha(opacity=" + opacity * 100 + ")";
        };
      },
      "gecko" : function(element, opacity){

        // Animations look better when not using 1.0 in gecko
        if(opacity >= 1){

          opacity = 0.999999;
        };
        if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){

          element.style.MozOpacity = opacity;
        } else {

          element.style.opacity = opacity;
        };
      },
      "default" : function(element, opacity){

        if(opacity >= 1){

          opacity = "";
        };
        element.style.opacity = opacity;
      }
    }),
    /**
     * Resets opacity of given element.
     *
     * @param element {Element} DOM element to modify
     * @return {void}
     * @signature function(element)
     */
    reset : qx.core.Environment.select("engine.name", {
      "mshtml" : function(element){

        if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){

          element.style.opacity = "";
        } else {

          // Read in computed filter
          var filter = qx.bom.element.Style.get(element, "filter", qx.bom.element.Style.COMPUTED_MODE, false);
          // Remove old alpha filter
          element.style.filter = filter.replace(/alpha\([^\)]*\)/gi, "");
        };
      },
      "gecko" : function(element){

        if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){

          element.style.MozOpacity = "";
        } else {

          element.style.opacity = "";
        };
      },
      "default" : function(element){

        element.style.opacity = "";
      }
    }),
    /**
     * Gets computed opacity of given element. Accepts numbers between zero and one
     * where "0" means transparent, "1" means opaque.
     *
     * @param element {Element} DOM element to modify
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {Float} A float number between 0 and 1
     * @signature function(element, mode)
     */
    get : qx.core.Environment.select("engine.name", {
      "mshtml" : function(element, mode){

        if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){

          var opacity = qx.bom.element.Style.get(element, "opacity", mode, false);
          if(opacity != null){

            return parseFloat(opacity);
          };
          return 1.0;
        } else {

          var filter = qx.bom.element.Style.get(element, "filter", mode, false);
          if(filter){

            var opacity = filter.match(/alpha\(opacity=(.*)\)/);
            if(opacity && opacity[1]){

              return parseFloat(opacity[1]) / 100;
            };
          };
          return 1.0;
        };
      },
      "gecko" : function(element, mode){

        var opacity = qx.bom.element.Style.get(element, !qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY ? "MozOpacity" : "opacity", mode, false);
        if(opacity == 0.999999){

          opacity = 1.0;
        };
        if(opacity != null){

          return parseFloat(opacity);
        };
        return 1.0;
      },
      "default" : function(element, mode){

        var opacity = qx.bom.element.Style.get(element, "opacity", mode, false);
        if(opacity != null){

          return parseFloat(opacity);
        };
        return 1.0;
      }
    })
  },
  defer : function(statics){

    statics.SUPPORT_CSS3_OPACITY = qx.core.Environment.get("css.opacity");
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Prototype JS
     http://www.prototypejs.org/
     Version 1.5

     Copyright:
       (c) 2006-2007, Prototype Core Team

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Prototype Core Team

   ----------------------------------------------------------------------

     Copyright (c) 2005-2008 Sam Stephenson

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */
/* ************************************************************************

#require(qx.lang.String)
#require(qx.bom.client.Css)

#require(qx.bom.element.Clip#set)
#require(qx.bom.element.Cursor#set)
#require(qx.bom.element.Opacity#set)
#require(qx.bom.element.BoxSizing#set)
#require(qx.bom.element.Overflow#setY)
#require(qx.bom.element.Overflow#setX)

#require(qx.bom.element.Clip#get)
#require(qx.bom.element.Cursor#get)
#require(qx.bom.element.Opacity#get)
#require(qx.bom.element.BoxSizing#get)
#require(qx.bom.element.Overflow#getX)
#require(qx.bom.element.Overflow#getY)

#require(qx.bom.element.Clip#reset)
#require(qx.bom.element.Cursor#reset)
#require(qx.bom.element.Opacity#reset)
#require(qx.bom.element.BoxSizing#reset)
#require(qx.bom.element.Overflow#resetX)
#require(qx.bom.element.Overflow#resetY)

#require(qx.bom.element.Clip#compile)
#require(qx.bom.element.Cursor#compile)
#require(qx.bom.element.Opacity#compile)
#require(qx.bom.element.BoxSizing#compile)
#require(qx.bom.element.Overflow#compileX)
#require(qx.bom.element.Overflow#compileY)

************************************************************************ */
/**
 * Style querying and modification of HTML elements.
 *
 * Automatically normalizes cross-browser differences for setting and reading
 * CSS attributes. Optimized for performance.
 */
qx.Bootstrap.define("qx.bom.element.Style", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Detect vendor specific properties.
     */
    __detectVendorProperties : function(){

      var styleNames = {
        "appearance" : qx.core.Environment.get("css.appearance"),
        "userSelect" : qx.core.Environment.get("css.userselect"),
        "textOverflow" : qx.core.Environment.get("css.textoverflow"),
        "borderImage" : qx.core.Environment.get("css.borderimage"),
        "float" : qx.core.Environment.get("css.float"),
        "userModify" : qx.core.Environment.get("css.usermodify"),
        "boxSizing" : qx.core.Environment.get("css.boxsizing")
      };
      this.__cssNames = {
      };
      for(var key in qx.lang.Object.clone(styleNames)){

        if(!styleNames[key]){

          delete styleNames[key];
        } else {

          this.__cssNames[key] = key == "float" ? "float" : qx.lang.String.hyphenate(styleNames[key]);
        };
      };
      this.__styleNames = styleNames;
    },
    /**
     * Gets the (possibly vendor-prefixed) name of a style property and stores
     * it to avoid multiple checks.
     *
     * @param name {String} Style property name to check
     * @return {String|null} The client-specific name of the property, or
     * <code>null</code> if it's not supported.
     */
    __getStyleName : function(name){

      var styleName = qx.bom.Style.getPropertyName(name);
      if(styleName){

        this.__styleNames[name] = styleName;
      };
      return styleName;
    },
    /**
     * Mshtml has proprietary pixel* properties for locations and dimensions
     * which return the pixel value. Used by getComputed() in mshtml variant.
     *
     * @internal
     */
    __mshtmlPixel : {
      width : "pixelWidth",
      height : "pixelHeight",
      left : "pixelLeft",
      right : "pixelRight",
      top : "pixelTop",
      bottom : "pixelBottom"
    },
    /**
     * Whether a special class is available for the processing of this style.
     *
     * @internal
     */
    __special : {
      clip : qx.bom.element.Clip,
      cursor : qx.bom.element.Cursor,
      opacity : qx.bom.element.Opacity,
      boxSizing : qx.bom.element.BoxSizing,
      overflowX : {
        set : qx.lang.Function.bind(qx.bom.element.Overflow.setX, qx.bom.element.Overflow),
        get : qx.lang.Function.bind(qx.bom.element.Overflow.getX, qx.bom.element.Overflow),
        reset : qx.lang.Function.bind(qx.bom.element.Overflow.resetX, qx.bom.element.Overflow),
        compile : qx.lang.Function.bind(qx.bom.element.Overflow.compileX, qx.bom.element.Overflow)
      },
      overflowY : {
        set : qx.lang.Function.bind(qx.bom.element.Overflow.setY, qx.bom.element.Overflow),
        get : qx.lang.Function.bind(qx.bom.element.Overflow.getY, qx.bom.element.Overflow),
        reset : qx.lang.Function.bind(qx.bom.element.Overflow.resetY, qx.bom.element.Overflow),
        compile : qx.lang.Function.bind(qx.bom.element.Overflow.compileY, qx.bom.element.Overflow)
      }
    },
    /*
    ---------------------------------------------------------------------------
      COMPILE SUPPORT
    ---------------------------------------------------------------------------
    */
    /**
     * Compiles the given styles into a string which can be used to
     * concat a HTML string for innerHTML usage.
     *
     * @param map {Map} Map of style properties to compile
     * @return {String} Compiled string of given style properties.
     */
    compile : function(map){

      var html = [];
      var special = this.__special;
      var cssNames = this.__cssNames;
      var name,value;
      for(name in map){

        // read value
        value = map[name];
        if(value == null){

          continue;
        };
        // normalize name
        name = this.__styleNames[name] || this.__getStyleName(name) || name;
        // process special properties
        if(special[name]){

          html.push(special[name].compile(value));
        } else {

          if(!cssNames[name]){

            cssNames[name] = qx.lang.String.hyphenate(name);
          };
          html.push(cssNames[name], ":", value, ";");
        };
      };
      return html.join("");
    },
    /*
    ---------------------------------------------------------------------------
      CSS TEXT SUPPORT
    ---------------------------------------------------------------------------
    */
    /**
     * Set the full CSS content of the style attribute
     *
     * @param element {Element} The DOM element to modify
     * @param value {String} The full CSS string
     * @return {void}
     */
    setCss : function(element, value){

      if(qx.core.Environment.get("engine.name") === "mshtml" && parseInt(qx.core.Environment.get("browser.documentmode"), 10) < 8){

        element.style.cssText = value;
      } else {

        element.setAttribute("style", value);
      };
    },
    /**
     * Returns the full content of the style attribute.
     *
     * @param element {Element} The DOM element to query
     * @return {String} the full CSS string
     * @signature function(element)
     */
    getCss : function(element){

      if(qx.core.Environment.get("engine.name") === "mshtml" && parseInt(qx.core.Environment.get("browser.documentmode"), 10) < 8){

        return element.style.cssText.toLowerCase();
      } else {

        return element.getAttribute("style");
      };
    },
    /*
    ---------------------------------------------------------------------------
      STYLE ATTRIBUTE SUPPORT
    ---------------------------------------------------------------------------
    */
    /**
     * Checks whether the browser supports the given CSS property.
     *
     * @param propertyName {String} The name of the property
     * @return {Boolean} Whether the property id supported
     */
    isPropertySupported : function(propertyName){

      return (this.__special[propertyName] || this.__styleNames[propertyName] || propertyName in document.documentElement.style);
    },
    /** {Integer} Computed value of a style property. Compared to the cascaded style,
     * this one also interprets the values e.g. translates <code>em</code> units to
     * <code>px</code>.
     */
    COMPUTED_MODE : 1,
    /** {Integer} Cascaded value of a style property. */
    CASCADED_MODE : 2,
    /**
     * {Integer} Local value of a style property. Ignores inheritance cascade.
     *   Does not interpret values.
     */
    LOCAL_MODE : 3,
    /**
     * Sets the value of a style property
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the style attribute (js variant e.g. marginTop, wordSpacing)
     * @param value {var} The value for the given style
     * @param smart {Boolean?true} Whether the implementation should automatically use
     *    special implementations for some properties
     */
    set : function(element, name, value, smart){

      {
      };
      // normalize name
      name = this.__styleNames[name] || this.__getStyleName(name) || name;
      // special handling for specific properties
      // through this good working switch this part costs nothing when
      // processing non-smart properties
      if(smart !== false && this.__special[name]){

        return this.__special[name].set(element, value);
      } else {

        element.style[name] = value !== null ? value : "";
      };
    },
    /**
     * Convenience method to modify a set of styles at once.
     *
     * @param element {Element} The DOM element to modify
     * @param styles {Map} a map where the key is the name of the property
     *    and the value is the value to use.
     * @param smart {Boolean?true} Whether the implementation should automatically use
     *    special implementations for some properties
     * @return {void}
     */
    setStyles : function(element, styles, smart){

      {
      };
      // inline calls to "set" and "reset" because this method is very
      // performance critical!
      var styleNames = this.__styleNames;
      var special = this.__special;
      var style = element.style;
      for(var key in styles){

        var value = styles[key];
        var name = styleNames[key] || this.__getStyleName(key) || key;
        if(value === undefined){

          if(smart !== false && special[name]){

            special[name].reset(element);
          } else {

            style[name] = "";
          };
        } else {

          if(smart !== false && special[name]){

            special[name].set(element, value);
          } else {

            style[name] = value !== null ? value : "";
          };
        };
      };
    },
    /**
     * Resets the value of a style property
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the style attribute (js variant e.g. marginTop, wordSpacing)
     * @param smart {Boolean?true} Whether the implementation should automatically use
     *    special implementations for some properties
     * @return {void}
     */
    reset : function(element, name, smart){

      // normalize name
      name = this.__styleNames[name] || this.__getStyleName(name) || name;
      // special handling for specific properties
      if(smart !== false && this.__special[name]){

        return this.__special[name].reset(element);
      } else {

        element.style[name] = "";
      };
    },
    /**
     * Gets the value of a style property.
     *
     * *Computed*
     *
     * Returns the computed value of a style property. Compared to the cascaded style,
     * this one also interprets the values e.g. translates <code>em</code> units to
     * <code>px</code>.
     *
     * *Cascaded*
     *
     * Returns the cascaded value of a style property.
     *
     * *Local*
     *
     * Ignores inheritance cascade. Does not interpret values.
     *
     * @signature function(element, name, mode, smart)
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the style attribute (js variant e.g. marginTop, wordSpacing)
     * @param mode {Number} Choose one of the modes {@link #COMPUTED_MODE}, {@link #CASCADED_MODE},
     *   {@link #LOCAL_MODE}. The computed mode is the default one.
     * @param smart {Boolean?true} Whether the implementation should automatically use
     *    special implementations for some properties
     * @return {var} The value of the property
     */
    get : qx.core.Environment.select("engine.name", {
      "mshtml" : function(element, name, mode, smart){

        // normalize name
        name = this.__styleNames[name] || this.__getStyleName(name) || name;
        // special handling
        if(smart !== false && this.__special[name]){

          return this.__special[name].get(element, mode);
        };
        // if the element is not inserted into the document "currentStyle"
        // may be undefined. In this case always return the local style.
        if(!element.currentStyle){

          return element.style[name] || "";
        };
        // switch to right mode
        switch(mode){case this.LOCAL_MODE:
        return element.style[name] || "";case this.CASCADED_MODE:
        return element.currentStyle[name] || "";default:
        // Read cascaded style
        var currentStyle = element.currentStyle[name] || "";
        // Pixel values are always OK
        if(/^-?[\.\d]+(px)?$/i.test(currentStyle)){

          return currentStyle;
        };
        // Try to convert non-pixel values
        var pixel = this.__mshtmlPixel[name];
        if(pixel){

          // Backup local and runtime style
          var localStyle = element.style[name];
          // Overwrite local value with cascaded value
          // This is needed to have the pixel value setupped
          element.style[name] = currentStyle || 0;
          // Read pixel value and add "px"
          var value = element.style[pixel] + "px";
          // Recover old local value
          element.style[name] = localStyle;
          // Return value
          return value;
        };
        // Non-Pixel values may be problematic
        if(/^-?[\.\d]+(em|pt|%)?$/i.test(currentStyle)){

          throw new Error("Untranslated computed property value: " + name + ". Only pixel values work well across different clients.");
        };
        // Just the current style
        return currentStyle;};
      },
      "default" : function(element, name, mode, smart){

        // normalize name
        name = this.__styleNames[name] || this.__getStyleName(name) || name;
        // special handling
        if(smart !== false && this.__special[name]){

          return this.__special[name].get(element, mode);
        };
        // switch to right mode
        switch(mode){case this.LOCAL_MODE:
        return element.style[name] || "";case this.CASCADED_MODE:
        // Currently only supported by Opera and Internet Explorer
        if(element.currentStyle){

          return element.currentStyle[name] || "";
        };
        throw new Error("Cascaded styles are not supported in this browser!");// Support for the DOM2 getComputedStyle method
        //
        // Safari >= 3 & Gecko > 1.4 expose all properties to the returned
        // CSSStyleDeclaration object. In older browsers the function
        // "getPropertyValue" is needed to access the values.
        //
        // On a computed style object all properties are read-only which is
        // identical to the behavior of MSHTML's "currentStyle".
        default:
        // Opera, Mozilla and Safari 3+ also have a global getComputedStyle which is identical
        // to the one found under document.defaultView.
        // The problem with this is however that this does not work correctly
        // when working with frames and access an element of another frame.
        // Then we must use the <code>getComputedStyle</code> of the document
        // where the element is defined.
        var doc = qx.dom.Node.getDocument(element);
        var computed = doc.defaultView.getComputedStyle(element, null);
        // All relevant browsers expose the configured style properties to
        // the CSSStyleDeclaration objects
        return computed ? computed[name] : "";};
      }
    })
  },
  defer : function(statics){

    statics.__detectVendorProperties();
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Basic node creation and type detection
 */
qx.Bootstrap.define("qx.dom.Node", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /*
    ---------------------------------------------------------------------------
      NODE TYPES
    ---------------------------------------------------------------------------
    */
    /**
     * {Map} Node type:
     *
     * * ELEMENT
     * * ATTRIBUTE
     * * TEXT
     * * CDATA_SECTION
     * * ENTITY_REFERENCE
     * * ENTITY
     * * PROCESSING_INSTRUCTION
     * * COMMENT
     * * DOCUMENT
     * * DOCUMENT_TYPE
     * * DOCUMENT_FRAGMENT
     * * NOTATION
     */
    ELEMENT : 1,
    ATTRIBUTE : 2,
    TEXT : 3,
    CDATA_SECTION : 4,
    ENTITY_REFERENCE : 5,
    ENTITY : 6,
    PROCESSING_INSTRUCTION : 7,
    COMMENT : 8,
    DOCUMENT : 9,
    DOCUMENT_TYPE : 10,
    DOCUMENT_FRAGMENT : 11,
    NOTATION : 12,
    /*
    ---------------------------------------------------------------------------
      DOCUMENT ACCESS
    ---------------------------------------------------------------------------
    */
    /**
     * Returns the owner document of the given node
     *
     * @param node {Node|Document|Window} the node which should be tested
     * @return {Document|null} The document of the given DOM node
     */
    getDocument : function(node){

      return node.nodeType === this.DOCUMENT ? node : // is document already
      node.ownerDocument || // is DOM node
      node.document;
    },
    /**
     * Returns the DOM2 <code>defaultView</code> (window).
     *
     * @param node {Node|Document|Window} node to inspect
     * @return {Window} the <code>defaultView</code> of the given node
     */
    getWindow : function(node){

      // is a window already
      if(node.nodeType == null){

        return node;
      };
      // jump to document
      if(node.nodeType !== this.DOCUMENT){

        node = node.ownerDocument;
      };
      // jump to window
      return node.defaultView || node.parentWindow;
    },
    /**
     * Returns the document element. (Logical root node)
     *
     * This is a convenience attribute that allows direct access to the child
     * node that is the root element of the document. For HTML documents,
     * this is the element with the tagName "HTML".
     *
     * @param node {Node|Document|Window} node to inspect
     * @return {Element} document element of the given node
     */
    getDocumentElement : function(node){

      return this.getDocument(node).documentElement;
    },
    /**
     * Returns the body element. (Visual root node)
     *
     * This normally only makes sense for HTML documents. It returns
     * the content area of the HTML document.
     *
     * @param node {Node|Document|Window} node to inspect
     * @return {Element} document body of the given node
     */
    getBodyElement : function(node){

      return this.getDocument(node).body;
    },
    /*
    ---------------------------------------------------------------------------
      TYPE TESTS
    ---------------------------------------------------------------------------
    */
    /**
     * Whether the given object is a DOM node
     *
     * @param node {Node} the node which should be tested
     * @return {Boolean} true if the node is a DOM node
     */
    isNode : function(node){

      return !!(node && node.nodeType != null);
    },
    /**
     * Whether the given object is a DOM element node
     *
     * @param node {Node} the node which should be tested
     * @return {Boolean} true if the node is a DOM element
     */
    isElement : function(node){

      return !!(node && node.nodeType === this.ELEMENT);
    },
    /**
     * Whether the given object is a DOM document node
     *
     * @param node {Node} the node which should be tested
     * @return {Boolean} true when the node is a DOM document
     */
    isDocument : function(node){

      return !!(node && node.nodeType === this.DOCUMENT);
    },
    /**
     * Whether the given object is a DOM text node
     *
     * @param node {Node} the node which should be tested
     * @return {Boolean} true if the node is a DOM text node
     */
    isText : function(node){

      return !!(node && node.nodeType === this.TEXT);
    },
    /**
     * Check whether the given object is a browser window object.
     *
     * @param obj {Object} the object which should be tested
     * @return {Boolean} true if the object is a window object
     */
    isWindow : function(obj){

      return !!(obj && obj.history && obj.location && obj.document);
    },
    /**
     * Whether the node has the given node name
     *
     * @param node {Node} the node
     * @param nodeName {String} the node name to check for
     * @return {Boolean} Whether the node has the given node name
     */
    isNodeName : function(node, nodeName){

      if(!nodeName || !node || !node.nodeName){

        return false;
      };
      return nodeName.toLowerCase() == qx.dom.Node.getName(node);
    },
    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */
    /**
     * Get the node name as lower case string
     *
     * @param node {Node} the node
     * @return {String} the node name
     */
    getName : function(node){

      if(!node || !node.nodeName){

        return null;
      };
      return node.nodeName.toLowerCase();
    },
    /**
     * Returns the text content of an node where the node may be of node type
     * NODE_ELEMENT, NODE_ATTRIBUTE, NODE_TEXT or NODE_CDATA
     *
     * @param node {Node} the node from where the search should start.
     *     If the node has subnodes the text contents are recursively retreived and joined.
     * @return {String} the joined text content of the given node or null if not appropriate.
     * @signature function(node)
     */
    getText : function(node){

      if(!node || !node.nodeType){

        return null;
      };
      switch(node.nodeType){case 1:
      // NODE_ELEMENT
      var i,a = [],nodes = node.childNodes,length = nodes.length;
      for(i = 0;i < length;i++){

        a[i] = this.getText(nodes[i]);
      };
      return a.join("");case 2:// NODE_ATTRIBUTE
      case 3:// NODE_TEXT
      case 4:
      // CDATA
      return node.nodeValue;};
      return null;
    },
    /**
     * Checks if the given node is a block node
     *
     * @param node {Node} Node
     * @return {Boolean} whether it is a block node
     */
    isBlockNode : function(node){

      if(!qx.dom.Node.isElement(node)){

        return false;
      };
      node = qx.dom.Node.getName(node);
      return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(node);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Yahoo! UI Library
       http://developer.yahoo.com/yui
       Version 2.2.0

     Copyright:
       (c) 2007, Yahoo! Inc.

     License:
       BSD: http://developer.yahoo.com/yui/license.txt

   ----------------------------------------------------------------------

     http://developer.yahoo.com/yui/license.html

     Copyright (c) 2009, Yahoo! Inc.
     All rights reserved.

     Redistribution and use of this software in source and binary forms,
     with or without modification, are permitted provided that the
     following conditions are met:

     * Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in
       the documentation and/or other materials provided with the
       distribution.
     * Neither the name of Yahoo! Inc. nor the names of its contributors
       may be used to endorse or promote products derived from this
       software without specific prior written permission of Yahoo! Inc.

     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
     FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
     INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
     HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
     STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
     ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     OF THE POSSIBILITY OF SUCH DAMAGE.

************************************************************************ */
/**
 * Includes library functions to work with the current document.
 */
qx.Bootstrap.define("qx.bom.Document", {
  statics : {
    /**
     * Whether the document is in quirks mode (e.g. non XHTML, HTML4 Strict or missing doctype)
     *
     * @signature function(win)
     * @param win {Window?window} The window to query
     * @return {Boolean} true when containing document is in quirks mode
     */
    isQuirksMode : qx.core.Environment.select("engine.name", {
      "mshtml" : function(win){

        if(qx.core.Environment.get("engine.version") >= 8){

          return (win || window).document.documentMode === 5;
        } else {

          return (win || window).document.compatMode !== "CSS1Compat";
        };
      },
      "webkit" : function(win){

        if(document.compatMode === undefined){

          var el = (win || window).document.createElement("div");
          el.style.cssText = "position:absolute;width:0;height:0;width:1";
          return el.style.width === "1px" ? true : false;
        } else {

          return (win || window).document.compatMode !== "CSS1Compat";
        };
      },
      "default" : function(win){

        return (win || window).document.compatMode !== "CSS1Compat";
      }
    }),
    /**
     * Whether the document is in standard mode (e.g. XHTML, HTML4 Strict or doctype defined)
     *
     * @param win {Window?window} The window to query
     * @return {Boolean} true when containing document is in standard mode
     */
    isStandardMode : function(win){

      return !this.isQuirksMode(win);
    },
    /**
     * Returns the width of the document.
     *
     * Internet Explorer in standard mode stores the proprietary <code>scrollWidth</code> property
     * on the <code>documentElement</code>, but in quirks mode on the body element. All
     * other known browsers simply store the correct value on the <code>documentElement</code>.
     *
     * If the viewport is wider than the document the viewport width is returned.
     *
     * As the html element has no visual appearance it also can not scroll. This
     * means that we must use the body <code>scrollWidth</code> in all non mshtml clients.
     *
     * Verified to correctly work with:
     *
     * * Mozilla Firefox 2.0.0.4
     * * Opera 9.2.1
     * * Safari 3.0 beta (3.0.2)
     * * Internet Explorer 7.0
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The width of the actual document (which includes the body and its margin).
     *
     * NOTE: Opera 9.5x and 9.6x have wrong value for the scrollWidth property,
     * if an element use negative value for top and left to be outside the viewport!
     * See: http://bugzilla.qooxdoo.org/show_bug.cgi?id=2869
     */
    getWidth : function(win){

      var doc = (win || window).document;
      var view = qx.bom.Viewport.getWidth(win);
      var scroll = this.isStandardMode(win) ? doc.documentElement.scrollWidth : doc.body.scrollWidth;
      return Math.max(scroll, view);
    },
    /**
     * Returns the height of the document.
     *
     * Internet Explorer in standard mode stores the proprietary <code>scrollHeight</code> property
     * on the <code>documentElement</code>, but in quirks mode on the body element. All
     * other known browsers simply store the correct value on the <code>documentElement</code>.
     *
     * If the viewport is higher than the document the viewport height is returned.
     *
     * As the html element has no visual appearance it also can not scroll. This
     * means that we must use the body <code>scrollHeight</code> in all non mshtml clients.
     *
     * Verified to correctly work with:
     *
     * * Mozilla Firefox 2.0.0.4
     * * Opera 9.2.1
     * * Safari 3.0 beta (3.0.2)
     * * Internet Explorer 7.0
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The height of the actual document (which includes the body and its margin).
     *
     * NOTE: Opera 9.5x and 9.6x have wrong value for the scrollWidth property,
     * if an element use negative value for top and left to be outside the viewport!
     * See: http://bugzilla.qooxdoo.org/show_bug.cgi?id=2869
     */
    getHeight : function(win){

      var doc = (win || window).document;
      var view = qx.bom.Viewport.getHeight(win);
      var scroll = this.isStandardMode(win) ? doc.documentElement.scrollHeight : doc.body.scrollHeight;
      return Math.max(scroll, view);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Sebastian Fastner (fastner)
     * Tino Butz (tbtz)

   ======================================================================

   This class contains code based on the following work:

   * Unify Project

     Homepage:
       http://unify-project.org

     Copyright:
       2009-2010 Deutsche Telekom AG, Germany, http://telekom.com

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   * Yahoo! UI Library
       http://developer.yahoo.com/yui
       Version 2.2.0

     Copyright:
       (c) 2007, Yahoo! Inc.

     License:
       BSD: http://developer.yahoo.com/yui/license.txt

   ----------------------------------------------------------------------

     http://developer.yahoo.com/yui/license.html

     Copyright (c) 2009, Yahoo! Inc.
     All rights reserved.

     Redistribution and use of this software in source and binary forms,
     with or without modification, are permitted provided that the
     following conditions are met:

     * Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in
       the documentation and/or other materials provided with the
       distribution.
     * Neither the name of Yahoo! Inc. nor the names of its contributors
       may be used to endorse or promote products derived from this
       software without specific prior written permission of Yahoo! Inc.

     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
     FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
     INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
     HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
     STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
     ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     OF THE POSSIBILITY OF SUCH DAMAGE.

************************************************************************ */
/**
 * Includes library functions to work with the client's viewport (window).
 * Orientation related functions are point to window.top as default.
 */
qx.Bootstrap.define("qx.bom.Viewport", {
  statics : {
    /**
     * Returns the current width of the viewport (excluding the vertical scrollbar
     * if present).
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The width of the viewable area of the page (excluding scrollbars).
     */
    getWidth : function(win){

      var win = win || window;
      var doc = win.document;
      return qx.bom.Document.isStandardMode(win) ? doc.documentElement.clientWidth : doc.body.clientWidth;
    },
    /**
     * Returns the current height of the viewport (excluding the horizontal scrollbar
     * if present).
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The Height of the viewable area of the page (excluding scrollbars).
     */
    getHeight : function(win){

      var win = win || window;
      var doc = win.document;
      return qx.bom.Document.isStandardMode(win) ? doc.documentElement.clientHeight : doc.body.clientHeight;
    },
    /**
     * Returns the scroll position of the viewport
     *
     * All clients except IE < 9 support the non-standard property <code>pageXOffset</code>.
     * As this is easier to evaluate we prefer this property over <code>scrollLeft</code>.
     * Since the window could differ from the one the application is running in, we can't
     * use a one-time environment check to decide which property to use.
     *
     * @param win {Window?window} The window to query
     * @return {Integer} Scroll position in pixels from left edge, always a positive integer or zero
     */
    getScrollLeft : function(win){

      var win = win ? win : window;
      if(typeof win.pageXOffset !== "undefined"){

        return win.pageXOffset;
      };
      // Firefox is using 'documentElement.scrollLeft' and Chrome is using
      // 'document.body.scrollLeft'. For the other value each browser is returning
      // 0, so we can use this check to get the positive value without using specific
      // browser checks.
      var doc = win.document;
      return doc.documentElement.scrollLeft || doc.body.scrollLeft;
    },
    /**
     * Returns the scroll position of the viewport
     *
     * All clients except MSHTML support the non-standard property <code>pageYOffset</code>.
     * As this is easier to evaluate we prefer this property over <code>scrollTop</code>.
     * Since the window could differ from the one the application is running in, we can't
     * use a one-time environment check to decide which property to use.
     *
     * @param win {Window?window} The window to query
     * @return {Integer} Scroll position in pixels from top edge, always a positive integer or zero
     */
    getScrollTop : function(win){

      var win = win ? win : window;
      if(typeof win.pageYOffeset !== "undefined"){

        return win.pageYOffset;
      };
      // Firefox is using 'documentElement.scrollTop' and Chrome is using
      // 'document.body.scrollTop'. For the other value each browser is returning
      // 0, so we can use this check to get the positive value without using specific
      // browser checks.
      var doc = win.document;
      return doc.documentElement.scrollTop || doc.body.scrollTop;
    },
    /**
     * Returns an orientation normalizer value that should be added to device orientation
     * to normalize behaviour on different devices.
     *
     * @param win {Window} The window to query
     * @return {Map} Orientation normalizing value
     */
    __getOrientationNormalizer : function(win){

      // Calculate own understanding of orientation (0 = portrait, 90 = landscape)
      var currentOrientation = this.getWidth(win) > this.getHeight(win) ? 90 : 0;
      var deviceOrientation = win.orientation;
      if(deviceOrientation == null || Math.abs(deviceOrientation % 180) == currentOrientation){

        // No device orientation available or device orientation equals own understanding of orientation
        return {
          "-270" : 90,
          "-180" : 180,
          "-90" : -90,
          "0" : 0,
          "90" : 90,
          "180" : 180,
          "270" : -90
        };
      } else {

        // Device orientation is not equal to own understanding of orientation
        return {
          "-270" : 180,
          "-180" : -90,
          "-90" : 0,
          "0" : 90,
          "90" : 180,
          "180" : -90,
          "270" : 0
        };
      };
    },
    // Cache orientation normalizer map on start
    __orientationNormalizer : null,
    /**
     * Returns the current orientation of the viewport in degree.
     *
     * All possible values and their meaning:
     *
     * * <code>-90</code>: "Landscape"
     * * <code>0</code>: "Portrait"
     * * <code>90</code>: "Landscape"
     * * <code>180</code>: "Portrait"
     *
     * @param win {Window?window.top} The window to query. (Default = top window)
     * @return {Integer} The current orientation in degree
     */
    getOrientation : function(win){

      // Set window.top as default, because orientationChange event is only fired top window
      var win = win || window.top;
      // The orientation property of window does not have the same behaviour over all devices
      // iPad has 0degrees = Portrait, Playbook has 90degrees = Portrait, same for Android Honeycomb
      //
      // To fix this an orientationNormalizer map is calculated on application start
      //
      // The calculation of getWidth and getHeight returns wrong values if you are in an input field
      // on iPad and rotate your device!
      var orientation = win.orientation;
      if(orientation == null){

        // Calculate orientation from window width and window height
        orientation = this.getWidth(win) > this.getHeight(win) ? 90 : 0;
      } else {

        if(this.__orientationNormalizer == null){

          this.__orientationNormalizer = this.__getOrientationNormalizer(win);
        };
        // Normalize orientation value
        orientation = this.__orientationNormalizer[orientation];
      };
      return orientation;
    },
    /**
     * Whether the viewport orientation is currently in landscape mode.
     *
     * @param win {Window?window} The window to query
     * @return {Boolean} <code>true</code> when the viewport orientation
     *     is currently in landscape mode.
     */
    isLandscape : function(win){

      return this.getWidth(win) >= this.getHeight(win);
    },
    /**
     * Whether the viewport orientation is currently in portrait mode.
     *
     * @param win {Window?window} The window to query
     * @return {Boolean} <code>true</code> when the viewport orientation
     *     is currently in portrait mode.
     */
    isPortrait : function(win){

      return this.getWidth(win) < this.getHeight(win);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * Internal class which contains the checks used by {@link qx.core.Environment}.
 * All checks in here are marked as internal which means you should never use
 * them directly.
 *
 * This class should contain all checks about HTML.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Html", {
  statics : {
    /**
     * Whether the client supports Web Workers.
     *
     * @internal
     * @return {Boolean} <code>true</code> if webworkers are supported
     */
    getWebWorker : function(){

      return window.Worker != null;
    },
    /**
     * Whether the client supports File Readers
     *
     * @internal
     * @return {Boolean} <code>true</code> if FileReaders are supported
     */
    getFileReader : function(){

      return window.FileReader != null;
    },
    /**
     * Whether the client supports Geo Location.
     *
     * @internal
     * @return {Boolean} <code>true</code> if geolocation supported
     */
    getGeoLocation : function(){

      return navigator.geolocation != null;
    },
    /**
     * Whether the client supports audio.
     *
     * @internal
     * @return {Boolean} <code>true</code> if audio is supported
     */
    getAudio : function(){

      return !!document.createElement('audio').canPlayType;
    },
    /**
     * Whether the client can play ogg audio format.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getAudioOgg : function(){

      if(!qx.bom.client.Html.getAudio()){

        return "";
      };
      var a = document.createElement("audio");
      return a.canPlayType("audio/ogg");
    },
    /**
     * Whether the client can play mp3 audio format.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getAudioMp3 : function(){

      if(!qx.bom.client.Html.getAudio()){

        return "";
      };
      var a = document.createElement("audio");
      return a.canPlayType("audio/mpeg");
    },
    /**
     * Whether the client can play wave audio wave format.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getAudioWav : function(){

      if(!qx.bom.client.Html.getAudio()){

        return "";
      };
      var a = document.createElement("audio");
      return a.canPlayType("audio/x-wav");
    },
    /**
     * Whether the client can play au audio format.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getAudioAu : function(){

      if(!qx.bom.client.Html.getAudio()){

        return "";
      };
      var a = document.createElement("audio");
      return a.canPlayType("audio/basic");
    },
    /**
     * Whether the client can play aif audio format.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getAudioAif : function(){

      if(!qx.bom.client.Html.getAudio()){

        return "";
      };
      var a = document.createElement("audio");
      return a.canPlayType("audio/x-aiff");
    },
    /**
     * Whether the client supports video.
     *
     * @internal
     * @return {Boolean} <code>true</code> if video is supported
     */
    getVideo : function(){

      return !!document.createElement('video').canPlayType;
    },
    /**
     * Whether the client supports ogg video.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getVideoOgg : function(){

      if(!qx.bom.client.Html.getVideo()){

        return "";
      };
      var v = document.createElement("video");
      return v.canPlayType('video/ogg; codecs="theora, vorbis"');
    },
    /**
     * Whether the client supports mp4 video.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getVideoH264 : function(){

      if(!qx.bom.client.Html.getVideo()){

        return "";
      };
      var v = document.createElement("video");
      return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    },
    /**
     * Whether the client supports webm video.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getVideoWebm : function(){

      if(!qx.bom.client.Html.getVideo()){

        return "";
      };
      var v = document.createElement("video");
      return v.canPlayType('video/webm; codecs="vp8, vorbis"');
    },
    /**
     * Whether the client supports local storage.
     *
     * @internal
     * @return {Boolean} <code>true</code> if local storage is supported
     */
    getLocalStorage : function(){

      try{

        return window.localStorage != null;
      } catch(exc) {

        // Firefox Bug: Local execution of window.sessionStorage throws error
        // see https://bugzilla.mozilla.org/show_bug.cgi?id=357323
        return false;
      };
    },
    /**
     * Whether the client supports session storage.
     *
     * @internal
     * @return {Boolean} <code>true</code> if session storage is supported
     */
    getSessionStorage : function(){

      try{

        return window.sessionStorage != null;
      } catch(exc) {

        // Firefox Bug: Local execution of window.sessionStorage throws error
        // see https://bugzilla.mozilla.org/show_bug.cgi?id=357323
        return false;
      };
    },
    /**
     * Whether the client supports user data to persist data. This is only
     * relevant for IE < 8.
     *
     * @internal
     * @return {Boolean} <code>true</code> if the user data is supported.
     */
    getUserDataStorage : function(){

      var el = document.createElement("div");
      el.style["display"] = "none";
      document.getElementsByTagName("head")[0].appendChild(el);
      var supported = false;
      try{

        el.addBehavior("#default#userdata");
        el.load("qxtest");
        supported = true;
      } catch(e) {
      };
      document.getElementsByTagName("head")[0].removeChild(el);
      return supported;
    },
    /**
     * Whether the browser supports CSS class lists.
     * https://developer.mozilla.org/en/DOM/element.classList
     *
     * @internal
     * @return {Boolean} <code>true</code> if class list is supported.
     */
    getClassList : function(){

      return !!(document.documentElement.classList && qx.Bootstrap.getClass(document.documentElement.classList) === "DOMTokenList");
    },
    /**
     * Checks if XPath could be used.
     *
     * @internal
     * @return {Boolean} <code>true</code> if xpath is supported.
     */
    getXPath : function(){

      return !!document.evaluate;
    },
    /**
     * Checks if XUL could be used.
     *
     * @internal
     * @return {Boolean} <code>true</code> if XUL is supported.
     */
    getXul : function(){

      try{

        document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "label");
        return true;
      } catch(e) {

        return false;
      };
    },
    /**
     * Checks if SVG could be used
     *
     * @internal
     * @return {Boolean} <code>true</code> if SVG is supported.
     */
    getSvg : function(){

      return document.implementation && document.implementation.hasFeature && (document.implementation.hasFeature("org.w3c.dom.svg", "1.0") || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    },
    /**
     * Checks if VML is supported
     *
     * @internal
     * @return {Boolean} <code>true</code> if VML is supported.
     */
    getVml : function(){

      var el = document.createElement("div");
      document.body.appendChild(el);
      el.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
      el.firstChild.style.behavior = "url(#default#VML)";
      var hasVml = typeof el.firstChild.adj == "object";
      document.body.removeChild(el);
      return hasVml;
    },
    /**
     * Checks if canvas could be used
     *
     * @internal
     * @return {Boolean} <code>true</code> if canvas is supported.
     */
    getCanvas : function(){

      return !!window.CanvasRenderingContext2D;
    },
    /**
     * Asynchronous check for using data urls.
     *
     * @internal
     * @param callback {Function} The function which should be executed as
     *   soon as the check is done.
     */
    getDataUrl : function(callback){

      var data = new Image();
      data.onload = data.onerror = function(){

        // wrap that into a timeout because IE might execute it synchronously
        window.setTimeout(function(){

          callback.call(null, (data.width == 1 && data.height == 1));
        }, 0);
      };
      data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    },
    /**
     * Checks if dataset could be used
     *
     * @internal
     * @return {Boolean} <code>true</code> if dataset is supported.
     */
    getDataset : function(){

      return !!document.documentElement.dataset;
    },
    /**
     * Check for element.contains
     *
     * @internal
     * @return {Boolean} <code>true</code> if element.contains is supported
     */
    getContains : function(){

      // "object" in IE6/7/8, "function" in IE9
      return (typeof document.documentElement.contains !== "undefined");
    },
    /**
     * Check for element.compareDocumentPosition
     *
     * @internal
     * @return {Boolean} <code>true</code> if element.compareDocumentPosition is supported
     */
    getCompareDocumentPosition : function(){

      return (typeof document.documentElement.compareDocumentPosition === "function");
    },
    /**
     * Check for element.textContent. Legacy IEs do not support this, use
     * innerText instead.
     *
     * @internal
     * @return {Boolean} <code>true</code> if textContent is supported
     */
    getTextContent : function(){

      var el = document.createElement("span");
      return (typeof el.textContent !== "undefined");
    },
    /**
     * Check for a console object.
     *
     * @internal
     * @return {Boolean} <code>true</code> if a console is available.
     */
    getConsole : function(){

      return typeof window.console !== "undefined";
    },
    /**
     * Check for the <code>naturalHeight</code> and <code>naturalWidth</code>
     * image element attributes.
     *
     * @internal
     * @return {Boolean} <code>true</code> if both attributes are supported
     */
    getNaturalDimensions : function(){

      var img = document.createElement("img");
      return typeof img.naturalHeight === "number" && typeof img.naturalWidth === "number";
    }
  },
  defer : function(statics){

    qx.core.Environment.add("html.webworker", statics.getWebWorker);
    qx.core.Environment.add("html.filereader", statics.getFileReader);
    qx.core.Environment.add("html.geolocation", statics.getGeoLocation);
    qx.core.Environment.add("html.audio", statics.getAudio);
    qx.core.Environment.add("html.audio.ogg", statics.getAudioOgg);
    qx.core.Environment.add("html.audio.mp3", statics.getAudioMp3);
    qx.core.Environment.add("html.audio.wav", statics.getAudioWav);
    qx.core.Environment.add("html.audio.au", statics.getAudioAu);
    qx.core.Environment.add("html.audio.aif", statics.getAudioAif);
    qx.core.Environment.add("html.video", statics.getVideo);
    qx.core.Environment.add("html.video.ogg", statics.getVideoOgg);
    qx.core.Environment.add("html.video.h264", statics.getVideoH264);
    qx.core.Environment.add("html.video.webm", statics.getVideoWebm);
    qx.core.Environment.add("html.storage.local", statics.getLocalStorage);
    qx.core.Environment.add("html.storage.session", statics.getSessionStorage);
    qx.core.Environment.add("html.storage.userdata", statics.getUserDataStorage);
    qx.core.Environment.add("html.classlist", statics.getClassList);
    qx.core.Environment.add("html.xpath", statics.getXPath);
    qx.core.Environment.add("html.xul", statics.getXul);
    qx.core.Environment.add("html.canvas", statics.getCanvas);
    qx.core.Environment.add("html.svg", statics.getSvg);
    qx.core.Environment.add("html.vml", statics.getVml);
    qx.core.Environment.add("html.dataset", statics.getDataset);
    qx.core.Environment.addAsync("html.dataurl", statics.getDataUrl);
    qx.core.Environment.add("html.element.contains", statics.getContains);
    qx.core.Environment.add("html.element.compareDocumentPosition", statics.getCompareDocumentPosition);
    qx.core.Environment.add("html.element.textcontent", statics.getTextContent);
    qx.core.Environment.add("html.console", statics.getConsole);
    qx.core.Environment.add("html.image.naturaldimensions", statics.getNaturalDimensions);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Base2
     http://code.google.com/p/base2/
     Version 0.9

     Copyright:
       (c) 2006-2007, Dean Edwards

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Dean Edwards

************************************************************************ */
/**
 * CSS class name support for HTML elements. Supports multiple class names
 * for each element. Can query and apply class names to HTML elements.
 */
qx.Bootstrap.define("qx.bom.element.Class", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** {RegExp} Regular expressions to split class names */
    __splitter : /\s+/g,
    /** {RegExp} String trim regular expression. */
    __trim : /^\s+|\s+$/g,
    /**
     * Adds a className to the given element
     * If successfully added the given className will be returned
     *
     * @signature function(element, name)
     * @param element {Element} The element to modify
     * @param name {String} The class name to add
     * @return {String} The added classname (if so)
     */
    add : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default", {
      "native" : function(element, name){

        element.classList.add(name);
        return name;
      },
      "default" : function(element, name){

        if(!this.has(element, name)){

          element.className += (element.className ? " " : "") + name;
        };
        return name;
      }
    }),
    /**
     * Adds multiple classes to the given element
     *
     * @signature function(element, classes)
     * @param element {Element} DOM element to modify
     * @param classes {String[]} List of classes to add.
     * @return {String} The resulting class name which was applied
     */
    addClasses : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default", {
      "native" : function(element, classes){

        for(var i = 0;i < classes.length;i++){

          element.classList.add(classes[i]);
        };
        return element.className;
      },
      "default" : function(element, classes){

        var keys = {
        };
        var result;
        var old = element.className;
        if(old){

          result = old.split(this.__splitter);
          for(var i = 0,l = result.length;i < l;i++){

            keys[result[i]] = true;
          };
          for(var i = 0,l = classes.length;i < l;i++){

            if(!keys[classes[i]]){

              result.push(classes[i]);
            };
          };
        } else {

          result = classes;
        };
        return element.className = result.join(" ");
      }
    }),
    /**
     * Gets the classname of the given element
     *
     * @param element {Element} The element to query
     * @return {String} The retrieved classname
     */
    get : function(element){

      var className = element.className;
      if(typeof className.split !== 'function'){

        if(typeof className === 'object'){

          if(qx.Bootstrap.getClass(className) == 'SVGAnimatedString'){

            className = className.baseVal;
          } else {

            {
            };
            className = '';
          };
        };
        if(typeof className === 'undefined'){

          {
          };
          className = '';
        };
      };
      return className;
    },
    /**
     * Whether the given element has the given className.
     *
     * @signature function(element, name)
     * @param element {Element} The DOM element to check
     * @param name {String} The class name to check for
     * @return {Boolean} true when the element has the given classname
     */
    has : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default", {
      "native" : function(element, name){

        return element.classList.contains(name);
      },
      "default" : function(element, name){

        var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
        return regexp.test(element.className);
      }
    }),
    /**
     * Removes a className from the given element
     *
     * @signature function(element, name)
     * @param element {Element} The DOM element to modify
     * @param name {String} The class name to remove
     * @return {String} The removed class name
     */
    remove : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default", {
      "native" : function(element, name){

        element.classList.remove(name);
        return name;
      },
      "default" : function(element, name){

        var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
        element.className = element.className.replace(regexp, "$2");
        return name;
      }
    }),
    /**
     * Removes multiple classes from the given element
     *
     * @signature function(element, classes)
     * @param element {Element} DOM element to modify
     * @param classes {String[]} List of classes to remove.
     * @return {String} The resulting class name which was applied
     */
    removeClasses : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default", {
      "native" : function(element, classes){

        for(var i = 0;i < classes.length;i++){

          element.classList.remove(classes[i]);
        };
        return element.className;
      },
      "default" : function(element, classes){

        var reg = new RegExp("\\b" + classes.join("\\b|\\b") + "\\b", "g");
        return element.className = element.className.replace(reg, "").replace(this.__trim, "").replace(this.__splitter, " ");
      }
    }),
    /**
     * Replaces the first given class name with the second one
     *
     * @param element {Element} The DOM element to modify
     * @param oldName {String} The class name to remove
     * @param newName {String} The class name to add
     * @return {String} The added class name
     */
    replace : function(element, oldName, newName){

      this.remove(element, oldName);
      return this.add(element, newName);
    },
    /**
     * Toggles a className of the given element
     *
     * @signature function(element, name, toggle)
     * @param element {Element} The DOM element to modify
     * @param name {String} The class name to toggle
     * @param toggle {Boolean?null} Whether to switch class on/off. Without
     *    the parameter an automatic toggling would happen.
     * @return {String} The class name
     */
    toggle : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default", {
      "native" : function(element, name, toggle){

        if(toggle === undefined){

          element.classList.toggle(name);
        } else {

          toggle ? this.add(element, name) : this.remove(element, name);
        };
        return name;
      },
      "default" : function(element, name, toggle){

        if(toggle == null){

          toggle = !this.has(element, name);
        };
        toggle ? this.add(element, name) : this.remove(element, name);
        return name;
      }
    })
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Contains support for calculating dimensions of HTML elements.
 *
 * We differ between the box (or border) size which is available via
 * {@link #getWidth} and {@link #getHeight} and the content or scroll
 * sizes which are available via {@link #getContentWidth} and
 * {@link #getContentHeight}.
 */
qx.Bootstrap.define("qx.bom.element.Dimension", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Returns the rendered width of the given element.
     *
     * This is the visible width of the object, which need not to be identical
     * to the width configured via CSS. This highly depends on the current
     * box-sizing for the document and maybe even for the element.
     *
     * @signature function(element)
     * @param element {Element} element to query
     * @return {Integer} width of the element
     */
    getWidth : qx.core.Environment.select("engine.name", {
      "gecko" : function(element){

        // offsetWidth in Firefox does not always return the rendered pixel size
        // of an element.
        // Starting with Firefox 3 the rendered size can be determined by using
        // getBoundingClientRect
        // https://bugzilla.mozilla.org/show_bug.cgi?id=450422
        if(element.getBoundingClientRect){

          var rect = element.getBoundingClientRect();
          return Math.round(rect.right) - Math.round(rect.left);
        } else {

          return element.offsetWidth;
        };
      },
      "default" : function(element){

        return element.offsetWidth;
      }
    }),
    /**
     * Returns the rendered height of the given element.
     *
     * This is the visible height of the object, which need not to be identical
     * to the height configured via CSS. This highly depends on the current
     * box-sizing for the document and maybe even for the element.
     *
     * @signature function(element)
     * @param element {Element} element to query
     * @return {Integer} height of the element
     */
    getHeight : qx.core.Environment.select("engine.name", {
      "gecko" : function(element){

        if(element.getBoundingClientRect){

          var rect = element.getBoundingClientRect();
          return Math.round(rect.bottom) - Math.round(rect.top);
        } else {

          return element.offsetHeight;
        };
      },
      "default" : function(element){

        return element.offsetHeight;
      }
    }),
    /**
     * Returns the rendered size of the given element.
     *
     * @param element {Element} element to query
     * @return {Map} map containing the width and height of the element
     */
    getSize : function(element){

      return {
        width : this.getWidth(element),
        height : this.getHeight(element)
      };
    },
    /** {Map} Contains all overflow values where scrollbars are invisible */
    __hiddenScrollbars : {
      visible : true,
      hidden : true
    },
    /**
     * Returns the content width.
     *
     * The content width is basically the maximum
     * width used or the maximum width which can be used by the content. This
     * excludes all kind of styles of the element like borders, paddings, margins,
     * and even scrollbars.
     *
     * Please note that with visible scrollbars the content width returned
     * may be larger than the box width returned via {@link #getWidth}.
     *
     * @param element {Element} element to query
     * @return {Integer} Computed content width
     */
    getContentWidth : function(element){

      var Style = qx.bom.element.Style;
      var overflowX = qx.bom.element.Overflow.getX(element);
      var paddingLeft = parseInt(Style.get(element, "paddingLeft") || "0px", 10);
      var paddingRight = parseInt(Style.get(element, "paddingRight") || "0px", 10);
      if(this.__hiddenScrollbars[overflowX]){

        var contentWidth = element.clientWidth;
        if((qx.core.Environment.get("engine.name") == "opera") || qx.dom.Node.isBlockNode(element)){

          contentWidth = contentWidth - paddingLeft - paddingRight;
        };
        return contentWidth;
      } else {

        if(element.clientWidth >= element.scrollWidth){

          // Scrollbars visible, but not needed? We need to substract both paddings
          return Math.max(element.clientWidth, element.scrollWidth) - paddingLeft - paddingRight;
        } else {

          // Scrollbars visible and needed. We just remove the left padding,
          // as the right padding is not respected in rendering.
          var width = element.scrollWidth - paddingLeft;
          // IE renders the paddingRight as well with scrollbars on
          if(qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("engine.version") >= 6){

            width -= paddingRight;
          };
          return width;
        };
      };
    },
    /**
     * Returns the content height.
     *
     * The content height is basically the maximum
     * height used or the maximum height which can be used by the content. This
     * excludes all kind of styles of the element like borders, paddings, margins,
     * and even scrollbars.
     *
     * Please note that with visible scrollbars the content height returned
     * may be larger than the box height returned via {@link #getHeight}.
     *
     * @param element {Element} element to query
     * @return {Integer} Computed content height
     */
    getContentHeight : function(element){

      var Style = qx.bom.element.Style;
      var overflowY = qx.bom.element.Overflow.getY(element);
      var paddingTop = parseInt(Style.get(element, "paddingTop") || "0px", 10);
      var paddingBottom = parseInt(Style.get(element, "paddingBottom") || "0px", 10);
      if(this.__hiddenScrollbars[overflowY]){

        return element.clientHeight - paddingTop - paddingBottom;
      } else {

        if(element.clientHeight >= element.scrollHeight){

          // Scrollbars visible, but not needed? We need to substract both paddings
          return Math.max(element.clientHeight, element.scrollHeight) - paddingTop - paddingBottom;
        } else {

          // Scrollbars visible and needed. We just remove the top padding,
          // as the bottom padding is not respected in rendering.
          var height = element.scrollHeight - paddingTop;
          // IE renders the paddingBottom as well with scrollbars on
          if(qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("engine.version") == 6){

            height -= paddingBottom;
          };
          return height;
        };
      };
    },
    /**
     * Returns the rendered content size of the given element.
     *
     * @param element {Element} element to query
     * @return {Map} map containing the content width and height of the element
     */
    getContentSize : function(element){

      return {
        width : this.getContentWidth(element),
        height : this.getContentHeight(element)
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * jQuery Dimension Plugin
       http://jquery.com/
       Version 1.1.3

     Copyright:
       (c) 2007, Paul Bakaus & Brandon Aaron

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       Paul Bakaus
       Brandon Aaron

************************************************************************ */
/**
 * Query the location of an arbitrary DOM element in relation to its top
 * level body element. Works in all major browsers:
 *
 * * Mozilla 1.5 + 2.0
 * * Internet Explorer 6.0 + 7.0 (both standard & quirks mode)
 * * Opera 9.2
 * * Safari 3.0 beta
 */
qx.Bootstrap.define("qx.bom.element.Location", {
  statics : {
    /**
     * Queries a style property for the given element
     *
     * @param elem {Element} DOM element to query
     * @param style {String} Style property
     * @return {String} Value of given style property
     */
    __style : function(elem, style){

      return qx.bom.element.Style.get(elem, style, qx.bom.element.Style.COMPUTED_MODE, false);
    },
    /**
     * Queries a style property for the given element and parses it to an integer value
     *
     * @param elem {Element} DOM element to query
     * @param style {String} Style property
     * @return {Integer} Value of given style property
     */
    __num : function(elem, style){

      return parseInt(qx.bom.element.Style.get(elem, style, qx.bom.element.Style.COMPUTED_MODE, false), 10) || 0;
    },
    /**
     * Computes the scroll offset of the given element relative to the document
     * <code>body</code>.
     *
     * @param elem {Element} DOM element to query
     * @return {Map} Map which contains the <code>left</code> and <code>top</code> scroll offsets
     */
    __computeScroll : function(elem){

      var left = 0,top = 0;
      // Find window
      var win = qx.dom.Node.getWindow(elem);
      left -= qx.bom.Viewport.getScrollLeft(win);
      top -= qx.bom.Viewport.getScrollTop(win);
      return {
        left : left,
        top : top
      };
    },
    /**
     * Computes the offset of the given element relative to the document
     * <code>body</code>.
     *
     * @param elem {Element} DOM element to query
     * @return {Map} Map which contains the <code>left</code> and <code>top</code> offsets
     */
    __computeBody : qx.core.Environment.select("engine.name", {
      "mshtml" : function(elem){

        // Find body element
        var doc = qx.dom.Node.getDocument(elem);
        var body = doc.body;
        var left = 0;
        var top = 0;
        left -= body.clientLeft + doc.documentElement.clientLeft;
        top -= body.clientTop + doc.documentElement.clientTop;
        if(!qx.core.Environment.get("browser.quirksmode")){

          left += this.__num(body, "borderLeftWidth");
          top += this.__num(body, "borderTopWidth");
        };
        return {
          left : left,
          top : top
        };
      },
      "webkit" : function(elem){

        // Find body element
        var doc = qx.dom.Node.getDocument(elem);
        var body = doc.body;
        // Start with the offset
        var left = body.offsetLeft;
        var top = body.offsetTop;
        // only for safari < version 4.0
        if(parseFloat(qx.core.Environment.get("engine.version")) < 530.17){

          left += this.__num(body, "borderLeftWidth");
          top += this.__num(body, "borderTopWidth");
        };
        return {
          left : left,
          top : top
        };
      },
      "gecko" : function(elem){

        // Find body element
        var body = qx.dom.Node.getDocument(elem).body;
        // Start with the offset
        var left = body.offsetLeft;
        var top = body.offsetTop;
        // add the body margin for firefox 3.0 and below
        if(parseFloat(qx.core.Environment.get("engine.version")) < 1.9){

          left += this.__num(body, "marginLeft");
          top += this.__num(body, "marginTop");
        };
        // Correct substracted border (only in content-box mode)
        if(qx.bom.element.BoxSizing.get(body) !== "border-box"){

          left += this.__num(body, "borderLeftWidth");
          top += this.__num(body, "borderTopWidth");
        };
        return {
          left : left,
          top : top
        };
      },
      // At the moment only correctly supported by Opera
      "default" : function(elem){

        // Find body element
        var body = qx.dom.Node.getDocument(elem).body;
        // Start with the offset
        var left = body.offsetLeft;
        var top = body.offsetTop;
        return {
          left : left,
          top : top
        };
      }
    }),
    /**
     * Computes the sum of all offsets of the given element node.
     *
     * Traditionally this is a loop which goes up the whole parent tree
     * and sums up all found offsets.
     *
     * But both <code>mshtml</code> and <code>gecko >= 1.9</code> support
     * <code>getBoundingClientRect</code> which allows a
     * much faster access to the offset position.
     *
     * Please note: When gecko 1.9 does not use the <code>getBoundingClientRect</code>
     * implementation, and therefore use the traditional offset calculation
     * the gecko 1.9 fix in <code>__computeBody</code> must not be applied.
     *
     * @signature function(elem)
     * @param elem {Element} DOM element to query
     * @return {Map} Map which contains the <code>left</code> and <code>top</code> offsets
     */
    __computeOffset : qx.core.Environment.select("engine.name", {
      "gecko" : function(elem){

        // Use faster getBoundingClientRect() if available (gecko >= 1.9)
        if(elem.getBoundingClientRect){

          var rect = elem.getBoundingClientRect();
          // Firefox 3.0 alpha 6 (gecko 1.9) returns floating point numbers
          // use Math.round() to round them to style compatible numbers
          // MSHTML returns integer numbers
          var left = Math.round(rect.left);
          var top = Math.round(rect.top);
        } else {

          var left = 0;
          var top = 0;
          // Stop at the body
          var body = qx.dom.Node.getDocument(elem).body;
          var box = qx.bom.element.BoxSizing;
          if(box.get(elem) !== "border-box"){

            left -= this.__num(elem, "borderLeftWidth");
            top -= this.__num(elem, "borderTopWidth");
          };
          while(elem && elem !== body){

            // Add node offsets
            left += elem.offsetLeft;
            top += elem.offsetTop;
            // Mozilla does not add the borders to the offset
            // when using box-sizing=content-box
            if(box.get(elem) !== "border-box"){

              left += this.__num(elem, "borderLeftWidth");
              top += this.__num(elem, "borderTopWidth");
            };
            // Mozilla does not add the border for a parent that has
            // overflow set to anything but visible
            if(elem.parentNode && this.__style(elem.parentNode, "overflow") != "visible"){

              left += this.__num(elem.parentNode, "borderLeftWidth");
              top += this.__num(elem.parentNode, "borderTopWidth");
            };
            // One level up (offset hierarchy)
            elem = elem.offsetParent;
          };
        };
        return {
          left : left,
          top : top
        };
      },
      "default" : function(elem){

        var doc = qx.dom.Node.getDocument(elem);
        // Use faster getBoundingClientRect() if available
        if(elem.getBoundingClientRect){

          var rect = elem.getBoundingClientRect();
          var left = Math.round(rect.left);
          var top = Math.round(rect.top);
        } else {

          // Offset of the incoming element
          var left = elem.offsetLeft;
          var top = elem.offsetTop;
          // Start with the first offset parent
          elem = elem.offsetParent;
          // Stop at the body
          var body = doc.body;
          // Border correction is only needed for each parent
          // not for the incoming element itself
          while(elem && elem != body){

            // Add node offsets
            left += elem.offsetLeft;
            top += elem.offsetTop;
            // Fix missing border
            left += this.__num(elem, "borderLeftWidth");
            top += this.__num(elem, "borderTopWidth");
            // One level up (offset hierarchy)
            elem = elem.offsetParent;
          };
        };
        return {
          left : left,
          top : top
        };
      }
    }),
    /**
     * Computes the location of the given element in context of
     * the document dimensions.
     *
     * Supported modes:
     *
     * * <code>margin</code>: Calculate from the margin box of the element (bigger than the visual appearance: including margins of given element)
     * * <code>box</code>: Calculates the offset box of the element (default, uses the same size as visible)
     * * <code>border</code>: Calculate the border box (useful to align to border edges of two elements).
     * * <code>scroll</code>: Calculate the scroll box (relevant for absolute positioned content).
     * * <code>padding</code>: Calculate the padding box (relevant for static/relative positioned content).
     *
     * @param elem {Element} DOM element to query
     * @param mode {String?box} A supported option. See comment above.
     * @return {Map} Returns a map with <code>left</code>, <code>top</code>,
     *   <code>right</code> and <code>bottom</code> which contains the distance
     *   of the element relative to the document.
     */
    get : function(elem, mode){

      if(elem.tagName == "BODY"){

        var location = this.__getBodyLocation(elem);
        var left = location.left;
        var top = location.top;
      } else {

        var body = this.__computeBody(elem);
        var offset = this.__computeOffset(elem);
        // Reduce by viewport scrolling.
        // Hint: getBoundingClientRect returns the location of the
        // element in relation to the viewport which includes
        // the scrolling
        var scroll = this.__computeScroll(elem);
        var left = offset.left + body.left - scroll.left;
        var top = offset.top + body.top - scroll.top;
      };
      var right = left + elem.offsetWidth;
      var bottom = top + elem.offsetHeight;
      if(mode){

        // In this modes we want the size as seen from a child what means that we want the full width/height
        // which may be higher than the outer width/height when the element has scrollbars.
        if(mode == "padding" || mode == "scroll"){

          var overX = qx.bom.element.Overflow.getX(elem);
          if(overX == "scroll" || overX == "auto"){

            right += elem.scrollWidth - elem.offsetWidth + this.__num(elem, "borderLeftWidth") + this.__num(elem, "borderRightWidth");
          };
          var overY = qx.bom.element.Overflow.getY(elem);
          if(overY == "scroll" || overY == "auto"){

            bottom += elem.scrollHeight - elem.offsetHeight + this.__num(elem, "borderTopWidth") + this.__num(elem, "borderBottomWidth");
          };
        };
        switch(mode){case "padding":
        left += this.__num(elem, "paddingLeft");
        top += this.__num(elem, "paddingTop");
        right -= this.__num(elem, "paddingRight");
        bottom -= this.__num(elem, "paddingBottom");// no break here
        case "scroll":
        left -= elem.scrollLeft;
        top -= elem.scrollTop;
        right -= elem.scrollLeft;
        bottom -= elem.scrollTop;// no break here
        case "border":
        left += this.__num(elem, "borderLeftWidth");
        top += this.__num(elem, "borderTopWidth");
        right -= this.__num(elem, "borderRightWidth");
        bottom -= this.__num(elem, "borderBottomWidth");
        break;case "margin":
        left -= this.__num(elem, "marginLeft");
        top -= this.__num(elem, "marginTop");
        right += this.__num(elem, "marginRight");
        bottom += this.__num(elem, "marginBottom");
        break;};
      };
      return {
        left : left,
        top : top,
        right : right,
        bottom : bottom
      };
    },
    /**
     * Get the location of the body element relative to the document.
     * @param body {Element} The body element.
     */
    __getBodyLocation : function(body){

      var top = body.offsetTop;
      var left = body.offsetLeft;
      if(qx.core.Environment.get("engine.name") !== "mshtml" || !((parseFloat(qx.core.Environment.get("engine.version")) < 8 || qx.core.Environment.get("browser.documentmode") < 8) && !qx.core.Environment.get("browser.quirksmode"))){

        top += this.__num(body, "marginTop");
        left += this.__num(body, "marginLeft");
      };
      if(qx.core.Environment.get("engine.name") === "gecko"){

        top += this.__num(body, "borderLeftWidth");
        left += this.__num(body, "borderTopWidth");
      };
      return {
        left : left,
        top : top
      };
    },
    /**
     * Computes the location of the given element in context of
     * the document dimensions. For supported modes please
     * have a look at the {@link qx.bom.element.Location#get} method.
     *
     * @param elem {Element} DOM element to query
     * @param mode {String} A supported option. See comment above.
     * @return {Integer} The left distance
     *   of the element relative to the document.
     */
    getLeft : function(elem, mode){

      return this.get(elem, mode).left;
    },
    /**
     * Computes the location of the given element in context of
     * the document dimensions. For supported modes please
     * have a look at the {@link qx.bom.element.Location#get} method.
     *
     * @param elem {Element} DOM element to query
     * @param mode {String} A supported option. See comment above.
     * @return {Integer} The top distance
     *   of the element relative to the document.
     */
    getTop : function(elem, mode){

      return this.get(elem, mode).top;
    },
    /**
     * Computes the location of the given element in context of
     * the document dimensions. For supported modes please
     * have a look at the {@link qx.bom.element.Location#get} method.
     *
     * @param elem {Element} DOM element to query
     * @param mode {String} A supported option. See comment above.
     * @return {Integer} The right distance
     *   of the element relative to the document.
     */
    getRight : function(elem, mode){

      return this.get(elem, mode).right;
    },
    /**
     * Computes the location of the given element in context of
     * the document dimensions. For supported modes please
     * have a look at the {@link qx.bom.element.Location#get} method.
     *
     * @param elem {Element} DOM element to query
     * @param mode {String} A supported option. See comment above.
     * @return {Integer} The bottom distance
     *   of the element relative to the document.
     */
    getBottom : function(elem, mode){

      return this.get(elem, mode).bottom;
    },
    /**
     * Returns the distance between two DOM elements. For supported modes please
     * have a look at the {@link qx.bom.element.Location#get} method.
     *
     * @param elem1 {Element} First element
     * @param elem2 {Element} Second element
     * @param mode1 {String?null} Mode for first element
     * @param mode2 {String?null} Mode for second element
     * @return {Map} Returns a map with <code>left</code> and <code>top</code>
     *   which contains the distance of the elements from each other.
     */
    getRelative : function(elem1, elem2, mode1, mode2){

      var loc1 = this.get(elem1, mode1);
      var loc2 = this.get(elem2, mode2);
      return {
        left : loc1.left - loc2.left,
        top : loc1.top - loc2.top,
        right : loc1.right - loc2.right,
        bottom : loc1.bottom - loc2.bottom
      };
    },
    /**
     * Returns the distance between the given element to its offset parent.
     *
     * @param elem {Element} DOM element to query
     * @return {Map} Returns a map with <code>left</code> and <code>top</code>
     *   which contains the distance of the elements from each other.
     */
    getPosition : function(elem){

      return this.getRelative(elem, this.getOffsetParent(elem));
    },
    /**
     * Detects the offset parent of the given element
     *
     * @param element {Element} Element to query for offset parent
     * @return {Element} Detected offset parent
     */
    getOffsetParent : function(element){

      var offsetParent = element.offsetParent || document.body;
      var Style = qx.bom.element.Style;
      while(offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && Style.get(offsetParent, "position") === "static")){

        offsetParent = offsetParent.offsetParent;
      };
      return offsetParent;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Andreas Junghans (lucidcake)

************************************************************************ */
/**
 * Cross-browser wrapper to work with CSS stylesheets.
 */
qx.Bootstrap.define("qx.bom.Stylesheet", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Include a CSS file
     *
     * <em>Note:</em> Using a resource ID as the <code>href</code> parameter
     * will no longer be supported. Call
     * <code>qx.util.ResourceManager.getInstance().toUri(href)</code> to get
     * valid URI to be used with this method.
     *
     * @param href {String} Href value
     * @param doc? {Document} Document to modify
     * @return {void}
     */
    includeFile : function(href, doc){

      if(!doc){

        doc = document;
      };
      var el = doc.createElement("link");
      el.type = "text/css";
      el.rel = "stylesheet";
      el.href = href;
      var head = doc.getElementsByTagName("head")[0];
      head.appendChild(el);
    },
    /**
     * Create a new Stylesheet node and append it to the document
     *
     * @param text? {String} optional string of css rules
     * @return {Stylesheet} the generates stylesheet element
     */
    createElement : function(text){

      if(qx.core.Environment.get("html.stylesheet.createstylesheet")){

        var sheet = document.createStyleSheet();
        if(text){

          sheet.cssText = text;
        };
        return sheet;
      } else {

        var elem = document.createElement("style");
        elem.type = "text/css";
        if(text){

          elem.appendChild(document.createTextNode(text));
        };
        document.getElementsByTagName("head")[0].appendChild(elem);
        return elem.sheet;
      };
    },
    /**
     * Insert a new CSS rule into a given Stylesheet
     *
     * @param sheet {Object} the target Stylesheet object
     * @param selector {String} the selector
     * @param entry {String} style rule
     */
    addRule : function(sheet, selector, entry){

      if(qx.core.Environment.get("html.stylesheet.insertrule")){

        sheet.insertRule(selector + "{" + entry + "}", sheet.cssRules.length);
      } else {

        sheet.addRule(selector, entry);
      };
    },
    /**
     * Remove a CSS rule from a stylesheet
     *
     * @param sheet {Object} the Stylesheet
     * @param selector {String} the Selector of the rule to remove
     * @return {void}
     */
    removeRule : function(sheet, selector){

      if(qx.core.Environment.get("html.stylesheet.deleterule")){

        var rules = sheet.cssRules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;--i){

          if(rules[i].selectorText == selector){

            sheet.deleteRule(i);
          };
        };
      } else {

        var rules = sheet.rules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;--i){

          if(rules[i].selectorText == selector){

            sheet.removeRule(i);
          };
        };
      };
    },
    /**
     * Remove the given sheet from its owner.
     * @param sheet {Object} the stylesheet object
     */
    removeSheet : function(sheet){

      var owner = sheet.ownerNode ? sheet.ownerNode : sheet.owningElement;
      qx.dom.Element.removeChild(owner, owner.parentNode);
    },
    /**
     * Remove all CSS rules from a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     * @return {void}
     */
    removeAllRules : function(sheet){

      if(qx.core.Environment.get("html.stylesheet.deleterule")){

        var rules = sheet.cssRules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;i--){

          sheet.deleteRule(i);
        };
      } else {

        var rules = sheet.rules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;i--){

          sheet.removeRule(i);
        };
      };
    },
    /**
     * Add an import of an external CSS file to a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     * @param url {String} URL of the external stylesheet file
     * @return {void}
     */
    addImport : function(sheet, url){

      if(qx.core.Environment.get("html.stylesheet.addimport")){

        sheet.addImport(url);
      } else {

        sheet.insertRule('@import "' + url + '";', sheet.cssRules.length);
      };
    },
    /**
     * Removes an import from a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     * @param url {String} URL of the imported CSS file
     * @return {void}
     */
    removeImport : function(sheet, url){

      if(qx.core.Environment.get("html.stylesheet.removeimport")){

        var imports = sheet.imports;
        var len = imports.length;
        for(var i = len - 1;i >= 0;i--){

          if(imports[i].href == url || imports[i].href == qx.util.Uri.getAbsolute(url)){

            sheet.removeImport(i);
          };
        };
      } else {

        var rules = sheet.cssRules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;i--){

          if(rules[i].href == url){

            sheet.deleteRule(i);
          };
        };
      };
    },
    /**
     * Remove all imports from a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     * @return {void}
     */
    removeAllImports : function(sheet){

      if(qx.core.Environment.get("html.stylesheet.removeimport")){

        var imports = sheet.imports;
        var len = imports.length;
        for(var i = len - 1;i >= 0;i--){

          sheet.removeImport(i);
        };
      } else {

        var rules = sheet.cssRules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;i--){

          if(rules[i].type == rules[i].IMPORT_RULE){

            sheet.deleteRule(i);
          };
        };
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (d_wagner)

************************************************************************ */
/**
 * Internal class which contains the checks used by {@link qx.core.Environment}.
 * All checks in here are marked as internal which means you should never use
 * them directly.
 *
 * This class contains checks related to Stylesheet objects.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Stylesheet", {
  statics : {
    /**
     * Returns a stylesheet to be used for feature checks
     *
     * @return {Stylesheet} Stylesheet element
     */
    __getStylesheet : function(){

      if(!qx.bom.client.Stylesheet.__stylesheet){

        qx.bom.client.Stylesheet.__stylesheet = qx.bom.Stylesheet.createElement();
      };
      return qx.bom.client.Stylesheet.__stylesheet;
    },
    /**
     * Check for IE's non-standard document.createStyleSheet function.
     * In IE9 (standards mode), the typeof check returns "function" so false is
     * returned. This is intended since IE9 supports the DOM-standard
     * createElement("style") which should be used instead.
     *
     * @internal
     * @return {Boolean} <code>true</code> if the browser supports
     * document.createStyleSheet
     */
    getCreateStyleSheet : function(){

      return typeof document.createStyleSheet === "object";
    },
    /**
     * Check for stylesheet.insertRule. Legacy IEs do not support this.
     *
     * @internal
     * @return {Boolean} <code>true</code> if insertRule is supported
     */
    getInsertRule : function(){

      return typeof qx.bom.client.Stylesheet.__getStylesheet().insertRule === "function";
    },
    /**
     * Check for stylesheet.deleteRule. Legacy IEs do not support this.
     *
     * @internal
     * @return {Boolean} <code>true</code> if deleteRule is supported
     */
    getDeleteRule : function(){

      return typeof qx.bom.client.Stylesheet.__getStylesheet().deleteRule === "function";
    },
    /**
     * Decides whether to use the legacy IE-only stylesheet.addImport or the
     * DOM-standard stylesheet.insertRule('@import [...]')
     *
     * @internal
     * @return {Boolean} <code>true</code> if stylesheet.addImport is supported
     */
    getAddImport : function(){

      return (typeof qx.bom.client.Stylesheet.__getStylesheet().addImport === "object");
    },
    /**
     * Decides whether to use the legacy IE-only stylesheet.removeImport or the
     * DOM-standard stylesheet.deleteRule('@import [...]')
     *
     * @internal
     * @return {Boolean} <code>true</code> if stylesheet.removeImport is supported
     */
    getRemoveImport : function(){

      return (typeof qx.bom.client.Stylesheet.__getStylesheet().removeImport === "object");
    }
  },
  defer : function(statics){

    qx.core.Environment.add("html.stylesheet.createstylesheet", statics.getCreateStyleSheet);
    qx.core.Environment.add("html.stylesheet.insertrule", statics.getInsertRule);
    qx.core.Environment.add("html.stylesheet.deleterule", statics.getDeleteRule);
    qx.core.Environment.add("html.stylesheet.addimport", statics.getAddImport);
    qx.core.Environment.add("html.stylesheet.removeimport", statics.getRemoveImport);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Manages children structures of an element. Easy and convenient APIs
 * to insert, remove and replace children.
 */
qx.Bootstrap.define("qx.dom.Element", {
  statics : {
    /**
     * {Map} A list of all attributes which needs to be part of the initial element to work correctly
     *
     * @internal
     */
    __initialAttributes : {
      "onload" : true,
      "onpropertychange" : true,
      "oninput" : true,
      "onchange" : true,
      "name" : true,
      "type" : true,
      "checked" : true,
      "disabled" : true
    },
    /**
     * Whether the given <code>child</code> is a child of <code>parent</code>
     *
     * @param parent {Element} parent element
     * @param child {Node} child node
     * @return {Boolean} true when the given <code>child</code> is a child of <code>parent</code>
     */
    hasChild : function(parent, child){

      return child.parentNode === parent;
    },
    /**
     * Whether the given <code>element</code> has children.
     *
     * @param element {Element} element to test
     * @return {Boolean} true when the given <code>element</code> has at least one child node
     */
    hasChildren : function(element){

      return !!element.firstChild;
    },
    /**
     * Whether the given <code>element</code> has any child elements.
     *
     * @param element {Element} element to test
     * @return {Boolean} true when the given <code>element</code> has at least one child element
     */
    hasChildElements : function(element){

      element = element.firstChild;
      while(element){

        if(element.nodeType === 1){

          return true;
        };
        element = element.nextSibling;
      };
      return false;
    },
    /**
     * Returns the parent element of the given element.
     *
     * @param element {Element} Element to find the parent for
     * @return {Element} The parent element
     */
    getParentElement : function(element){

      return element.parentNode;
    },
    /**
     * Checks if the <code>element</code> is in the DOM, but note that
     * the method is very expensive!
     *
     * @param element {Element} The DOM element to check.
     * @param win {Window} The window to check for.
     * @return {Boolean} <code>true</code> if the <code>element</code> is in
     *          the DOM, <code>false</code> otherwise.
     */
    isInDom : function(element, win){

      if(!win){

        win = window;
      };
      var domElements = win.document.getElementsByTagName(element.nodeName);
      for(var i = 0,l = domElements.length;i < l;i++){

        if(domElements[i] === element){

          return true;
        };
      };
      return false;
    },
    /*
    ---------------------------------------------------------------------------
      INSERTION
    ---------------------------------------------------------------------------
    */
    /**
     * Inserts <code>node</code> at the given <code>index</code>
     * inside <code>parent</code>.
     *
     * @param node {Node} node to insert
     * @param parent {Element} parent element node
     * @param index {Integer} where to insert
     * @return {Boolean} returns true (successful)
     */
    insertAt : function(node, parent, index){

      var ref = parent.childNodes[index];
      if(ref){

        parent.insertBefore(node, ref);
      } else {

        parent.appendChild(node);
      };
      return true;
    },
    /**
     * Insert <code>node</code> into <code>parent</code> as first child.
     * Indexes of other children will be incremented by one.
     *
     * @param node {Node} Node to insert
     * @param parent {Element} parent element node
     * @return {Boolean} returns true (successful)
     */
    insertBegin : function(node, parent){

      if(parent.firstChild){

        this.insertBefore(node, parent.firstChild);
      } else {

        parent.appendChild(node);
      };
    },
    /**
     * Insert <code>node</code> into <code>parent</code> as last child.
     *
     * @param node {Node} Node to insert
     * @param parent {Element} parent element node
     * @return {Boolean} returns true (successful)
     */
    insertEnd : function(node, parent){

      parent.appendChild(node);
    },
    /**
     * Inserts <code>node</code> before <code>ref</code> in the same parent.
     *
     * @param node {Node} Node to insert
     * @param ref {Node} Node which will be used as reference for insertion
     * @return {Boolean} returns true (successful)
     */
    insertBefore : function(node, ref){

      ref.parentNode.insertBefore(node, ref);
      return true;
    },
    /**
     * Inserts <code>node</code> after <code>ref</code> in the same parent.
     *
     * @param node {Node} Node to insert
     * @param ref {Node} Node which will be used as reference for insertion
     * @return {Boolean} returns true (successful)
     */
    insertAfter : function(node, ref){

      var parent = ref.parentNode;
      if(ref == parent.lastChild){

        parent.appendChild(node);
      } else {

        return this.insertBefore(node, ref.nextSibling);
      };
      return true;
    },
    /*
    ---------------------------------------------------------------------------
      REMOVAL
    ---------------------------------------------------------------------------
    */
    /**
     * Removes the given <code>node</code> from its parent element.
     *
     * @param node {Node} Node to remove
     * @return {Boolean} <code>true</code> when node was successfully removed,
     *   otherwise <code>false</code>
     */
    remove : function(node){

      if(!node.parentNode){

        return false;
      };
      node.parentNode.removeChild(node);
      return true;
    },
    /**
     * Removes the given <code>node</code> from the <code>parent</code>.
     *
     * @param node {Node} Node to remove
     * @param parent {Element} parent element which contains the <code>node</code>
     * @return {Boolean} <code>true</code> when node was successfully removed,
     *   otherwise <code>false</code>
     */
    removeChild : function(node, parent){

      if(node.parentNode !== parent){

        return false;
      };
      parent.removeChild(node);
      return true;
    },
    /**
     * Removes the node at the given <code>index</code>
     * from the <code>parent</code>.
     *
     * @param index {Integer} position of the node which should be removed
     * @param parent {Element} parent DOM element
     * @return {Boolean} <code>true</code> when node was successfully removed,
     *   otherwise <code>false</code>
     */
    removeChildAt : function(index, parent){

      var child = parent.childNodes[index];
      if(!child){

        return false;
      };
      parent.removeChild(child);
      return true;
    },
    /*
    ---------------------------------------------------------------------------
      REPLACE
    ---------------------------------------------------------------------------
    */
    /**
     * Replaces <code>oldNode</code> with <code>newNode</code> in the current
     * parent of <code>oldNode</code>.
     *
     * @param newNode {Node} DOM node to insert
     * @param oldNode {Node} DOM node to remove
     * @return {Boolean} <code>true</code> when node was successfully replaced
     */
    replaceChild : function(newNode, oldNode){

      if(!oldNode.parentNode){

        return false;
      };
      oldNode.parentNode.replaceChild(newNode, oldNode);
      return true;
    },
    /**
     * Replaces the node at <code>index</code> with <code>newNode</code> in
     * the given parent.
     *
     * @param newNode {Node} DOM node to insert
     * @param index {Integer} position of old DOM node
     * @param parent {Element} parent DOM element
     * @return {Boolean} <code>true</code> when node was successfully replaced
     */
    replaceAt : function(newNode, index, parent){

      var oldNode = parent.childNodes[index];
      if(!oldNode){

        return false;
      };
      parent.replaceChild(newNode, oldNode);
      return true;
    },
    /**
     * Stores helper element for element creation in WebKit
     *
     * @internal
     */
    __helperElement : {
    },
    /**
     * Saves whether a helper element is needed for each window.
     *
     * @internal
     */
    __allowMarkup : {
    },
    /**
     * Detects if the DOM support a <code>document.createElement</code> call with a
     * <code>String</code> as markup like:
     *
     * <pre class="javascript">
     * document.createElement("<INPUT TYPE='RADIO' NAME='RADIOTEST' VALUE='Second Choice'>");
     * </pre>
     *
     * Element creation with markup is not standard compatible with Document Object Model (Core) Level 1, but
     * Internet Explorer supports it. With an exception that IE9 in IE9 standard mode is standard compatible and
     * doesn't support element creation with markup.
     *
     * @param win {Window?} Window to check for
     * @return {Boolean} <code>true</code> if the DOM supports it, <code>false</code> otherwise.
     */
    _allowCreationWithMarkup : function(win){

      if(!win){

        win = window;
      };
      // key is needed to allow using different windows
      var key = win.location.href;
      if(qx.dom.Element.__allowMarkup[key] == undefined){

        try{

          win.document.createElement("<INPUT TYPE='RADIO' NAME='RADIOTEST' VALUE='Second Choice'>");
          qx.dom.Element.__allowMarkup[key] = true;
        } catch(e) {

          qx.dom.Element.__allowMarkup[key] = false;
        };
      };
      return qx.dom.Element.__allowMarkup[key];
    },
    /**
         * Creates and returns a DOM helper element.
         *
         * @param win {Window?} Window to create the element for
         * @return {Element} The created element node
         */
    getHelperElement : function(win){

      if(!win){

        win = window;
      };
      // key is needed to allow using different windows
      var key = win.location.href;
      if(!qx.dom.Element.__helperElement[key]){

        var helper = qx.dom.Element.__helperElement[key] = win.document.createElement("div");
        // innerHTML will only parsed correctly if element is appended to document
        if(qx.core.Environment.get("engine.name") == "webkit"){

          helper.style.display = "none";
          win.document.body.appendChild(helper);
        };
      };
      return qx.dom.Element.__helperElement[key];
    },
    /**
     * Creates a DOM element.
     *
     * Attributes may be given directly with this call. This is critical
     * for some attributes e.g. name, type, ... in many clients.
     *
     * Depending on the kind of attributes passed, <code>innerHTML</code> may be
     * used internally to assemble the element. Please make sure you understand
     * the security implications. See {@link qx.bom.Html#clean}.
     *
     * @param name {String} Tag name of the element
     * @param attributes {Map?} Map of attributes to apply
     * @param win {Window?} Window to create the element for
     * @return {Element} The created element node
     */
    create : function(name, attributes, win){

      if(!win){

        win = window;
      };
      if(!name){

        throw new Error("The tag name is missing!");
      };
      var initial = this.__initialAttributes;
      var attributesHtml = "";
      for(var key in attributes){

        if(initial[key]){

          attributesHtml += key + "='" + attributes[key] + "' ";
        };
      };
      var element;
      // If specific attributes are defined we need to process
      // the element creation in a more complex way.
      if(attributesHtml != ""){

        if(qx.dom.Element._allowCreationWithMarkup(win)){

          element = win.document.createElement("<" + name + " " + attributesHtml + ">");
        } else {

          var helper = qx.dom.Element.getHelperElement(win);
          helper.innerHTML = "<" + name + " " + attributesHtml + "></" + name + ">";
          element = helper.firstChild;
        };
      } else {

        element = win.document.createElement(name);
      };
      for(var key in attributes){

        if(!initial[key]){

          qx.bom.element.Attribute.set(element, key, attributes[key]);
        };
      };
      return element;
    },
    /**
     * Removes all content from the given element
     *
     * @param element {Element} element to clean
     * @return {String} empty string (new HTML content)
     */
    empty : function(element){

      return element.innerHTML = "";
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Alexander Steitz (aback)

   ======================================================================

   This class contains code based on the following work:

   * Prototype JS
     http://www.prototypejs.org/
     Version 1.5

     Copyright:
       (c) 2006-2007, Prototype Core Team

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Prototype Core Team

   ----------------------------------------------------------------------

     Copyright (c) 2005-2008 Sam Stephenson

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */
/**
 * Attribute/Property handling for DOM HTML elements.
 *
 * Also includes support for HTML properties like <code>checked</code>
 * or <code>value</code>. This feature set is supported cross-browser
 * through one common interface and is independent of the differences between
 * the multiple implementations.
 *
 * Supports applying text and HTML content using the attribute names
 * <code>text</code> and <code>html</code>.
 */
qx.Bootstrap.define("qx.bom.element.Attribute", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** Internal map of attribute conversions */
    __hints : {
      // Name translation table (camelcase is important for some attributes)
      names : {
        "class" : "className",
        "for" : "htmlFor",
        html : "innerHTML",
        text : qx.core.Environment.get("html.element.textcontent") ? "textContent" : "innerText",
        colspan : "colSpan",
        rowspan : "rowSpan",
        valign : "vAlign",
        datetime : "dateTime",
        accesskey : "accessKey",
        tabindex : "tabIndex",
        maxlength : "maxLength",
        readonly : "readOnly",
        longdesc : "longDesc",
        cellpadding : "cellPadding",
        cellspacing : "cellSpacing",
        frameborder : "frameBorder",
        usemap : "useMap"
      },
      // Attributes which are only applyable on a DOM element (not using compile())
      runtime : {
        "html" : 1,
        "text" : 1
      },
      // Attributes which are (forced) boolean
      bools : {
        compact : 1,
        nowrap : 1,
        ismap : 1,
        declare : 1,
        noshade : 1,
        checked : 1,
        disabled : 1,
        readOnly : 1,
        multiple : 1,
        selected : 1,
        noresize : 1,
        defer : 1,
        allowTransparency : 1
      },
      // Interpreted as property (element.property)
      property : {
        // Used by qx.html.Element
        $$html : 1,
        // Used by qx.ui.core.Widget
        $$widget : 1,
        // Native properties
        disabled : 1,
        checked : 1,
        readOnly : 1,
        multiple : 1,
        selected : 1,
        value : 1,
        maxLength : 1,
        className : 1,
        innerHTML : 1,
        innerText : 1,
        textContent : 1,
        htmlFor : 1,
        tabIndex : 1
      },
      qxProperties : {
        $$widget : 1,
        $$html : 1
      },
      // Default values when "null" is given to a property
      propertyDefault : {
        disabled : false,
        checked : false,
        readOnly : false,
        multiple : false,
        selected : false,
        value : "",
        className : "",
        innerHTML : "",
        innerText : "",
        textContent : "",
        htmlFor : "",
        tabIndex : 0,
        maxLength : qx.core.Environment.select("engine.name", {
          "mshtml" : 2147483647,
          "webkit" : 524288,
          "default" : -1
        })
      },
      // Properties which can be removed to reset them
      removeableProperties : {
        disabled : 1,
        multiple : 1,
        maxLength : 1
      },
      // Use getAttribute(name, 2) for these to query for the real value, not
      // the interpreted one.
      original : {
        href : 1,
        src : 1,
        type : 1
      }
    },
    /**
     * Compiles an incoming attribute map to a string which
     * could be used when building HTML blocks using innerHTML.
     *
     * This method silently ignores runtime attributes like
     * <code>html</code> or <code>text</code>.
     *
     * @param map {Map} Map of attributes. The key is the name of the attribute.
     * @return {String} Returns a compiled string ready for usage.
     */
    compile : function(map){

      var html = [];
      var runtime = this.__hints.runtime;
      for(var key in map){

        if(!runtime[key]){

          html.push(key, "='", map[key], "'");
        };
      };
      return html.join("");
    },
    /**
     * Returns the value of the given HTML attribute
     *
     * @param element {Element} The DOM element to query
     * @param name {String} Name of the attribute
     * @return {var} The value of the attribute
     */
    get : function(element, name){

      var hints = this.__hints;
      var value;
      // normalize name
      name = hints.names[name] || name;
      // respect original values
      // http://msdn2.microsoft.com/en-us/library/ms536429.aspx
      if(qx.core.Environment.get("engine.name") == "mshtml" && parseInt(qx.core.Environment.get("browser.documentmode"), 10) < 8 && hints.original[name]){

        value = element.getAttribute(name, 2);
      } else if(hints.property[name]){

        value = element[name];
        if(typeof hints.propertyDefault[name] !== "undefined" && value == hints.propertyDefault[name]){

          // only return null for all non-boolean properties
          if(typeof hints.bools[name] === "undefined"){

            return null;
          } else {

            return value;
          };
        };
      } else {

        // fallback to attribute
        value = element.getAttribute(name);
      };
      // TODO: Is this enough, what's about string false values?
      if(hints.bools[name]){

        return !!value;
      };
      return value;
    },
    /**
     * Sets an HTML attribute on the given DOM element
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the attribute
     * @param value {var} New value of the attribute
     * @return {void}
     */
    set : function(element, name, value){

      if(typeof value === "undefined"){

        return;
      };
      var hints = this.__hints;
      // normalize name
      name = hints.names[name] || name;
      // respect booleans
      if(hints.bools[name]){

        value = !!value;
      };
      // apply attribute
      // only properties which can be applied by the browser or qxProperties
      // otherwise use the attribute methods
      if(hints.property[name] && (!(element[name] === undefined) || hints.qxProperties[name])){

        // resetting the attribute/property
        if(value == null){

          // for properties which need to be removed for a correct reset
          if(hints.removeableProperties[name]){

            element.removeAttribute(name);
            return;
          } else if(typeof hints.propertyDefault[name] !== "undefined"){

            value = hints.propertyDefault[name];
          };
        };
        element[name] = value;
      } else {

        if(value === true){

          element.setAttribute(name, name);
        } else if(value === false || value === null){

          element.removeAttribute(name);
        } else {

          element.setAttribute(name, value);
        };
      };
    },
    /**
     * Resets an HTML attribute on the given DOM element
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the attribute
     * @return {void}
     */
    reset : function(element, name){

      this.set(element, name, null);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */
/**
 * Static helpers for parsing and modifying URIs.
 */
qx.Bootstrap.define("qx.util.Uri", {
  statics : {
    /**
     * Split URL
     *
     * Code taken from:
     *   parseUri 1.2.2
     *   (c) Steven Levithan <stevenlevithan.com>
     *   MIT License
     *
     *
     * @param str {String} String to parse as URI
     * @param strict {Boolean} Whether to parse strictly by the rules
     * @return {Object} Map with parts of URI as properties
     */
    parseUri : function(str, strict){

      var options = {
        key : ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q : {
          name : "queryKey",
          parser : /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser : {
          strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
          loose : /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
      };
      var o = options,m = options.parser[strict ? "strict" : "loose"].exec(str),uri = {
      },i = 14;
      while(i--){

        uri[o.key[i]] = m[i] || "";
      };
      uri[o.q.name] = {
      };
      uri[o.key[12]].replace(o.q.parser, function($0, $1, $2){

        if($1){

          uri[o.q.name][$1] = $2;
        };
      });
      return uri;
    },
    /**
     * Append string to query part of URL. Respects existing query.
     *
     * @param url {String} URL to append string to.
     * @param params {String} Parameters to append to URL.
     * @return {String} URL with string appended in query part.
     */
    appendParamsToUrl : function(url, params){

      if(params === undefined){

        return url;
      };
      {
      };
      if(qx.lang.Type.isObject(params)){

        params = qx.lang.Object.toUriParameter(params);
      };
      if(!params){

        return url;
      };
      return url += (/\?/).test(url) ? "&" + params : "?" + params;
    },
    /**
     * Takes a relative URI and returns an absolute one.
     *
     * @param uri {String} relative URI
     * @return {String} absolute URI
     */
    getAbsolute : function(uri){

      var div = document.createElement("div");
      div.innerHTML = '<a href="' + uri + '">0</a>';
      return div.firstChild.href;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Utility for checking the type of a variable.
 * It adds a <code>type</code> key static to q and offers the given method.
 *
 * <pre class="javascript">
 * q.type.get("abc"); // return "String" e.g.
 * </pre>
 */
qx.Bootstrap.define("qx.module.util.Type", {
  statics : {
    /**
     * Get the internal class of the value. The following classes are possible:
     * <code>"String"</code>,
     * <code>"Array"</code>,
     * <code>"Object"</code>,
     * <code>"RegExp"</code>,
     * <code>"Number"</code>,
     * <code>"Boolean"</code>,
     * <code>"Date"</code>,
     * <code>"Function"</code>,
     * <code>"Error"</code>
     * </pre>
     * @attachStatic {q, type.get}
     * @signature function(value)
     * @param value {var} Value to get the class for.
     * @return {String} The internal class of the value.
     */
    get : qx.Bootstrap.getClass
  },
  defer : function(statics){

    q.$attachStatic({
      type : {
        get : statics.get
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Adds JavaScript features that may not be supported by all clients.
 */
qx.Bootstrap.define("qx.module.Polyfill", {
  statics : {
    /**
     * Wraps the given function so that it will be executed in the given context
     */
    functionBind : function(){

      if(typeof Function.prototype.bind !== "function"){

        Function.prototype.bind = function(context){

          var args = Array.prototype.slice.call(arguments, 1);
          return qx.Bootstrap.bind.apply(null, [this, context].concat(args));
        };
      };
    },
    /**
     * Removes white space from the left and right sides of a string
     */
    stringTrim : function(){

      if(typeof String.prototype.trim !== "function"){

        String.prototype.trim = function(context){

          return this.replace(/^\s+|\s+$/g, '');
        };
      };
      /**
       * Removes white space from the left side of a string
       */
      if(typeof String.prototype.trimLeft !== "function"){

        String.prototype.trimLeft = function(context){

          return this.replace(/^\s+/g, '');
        };
      };
      /**
       * Removes white space from the right side of a string
       */
      if(typeof String.prototype.trimRight !== "function"){

        String.prototype.trimRight = function(context){

          return this.replace(/\s+$/g, '');
        };
      };
    }
  },
  defer : function(statics){

    statics.functionBind();
    statics.stringTrim();
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.module.Polyfill)
************************************************************************ */
/**
 * Support for native and custom events.
 */
qx.Bootstrap.define("qx.module.Event", {
  statics : {
    /**
     * Event normalization registry
     *
     * @type Map
     * @internal
     */
    __normalizations : {
    },
    /**
     * Registry of event hooks
     * @internal
     */
    __hooks : {
      on : {
      },
      off : {
      }
    },
    /**
     * Registers a listener for the given event type on each item in the
     * collection. This can be either native or custom events.
     *
     * @attach {q}
     * @param type {String} Type of the event to listen for
     * @param listener {Function} Listener callback
     * @param context {Object?} Context the callback function will be executed in.
     * Default: The element on which the listener was registered
     * @return {q} The collection for chaining
     */
    on : function(type, listener, context){

      for(var i = 0;i < this.length;i++){

        var el = this[i];
        var ctx = context || q(el);
        // call hooks
        var hooks = qx.module.Event.__hooks.on;
        // generic
        var typeHooks = hooks["*"] || [];
        // type specific
        if(hooks[type]){

          typeHooks = typeHooks.concat(hooks[type]);
        };
        for(var j = 0,m = typeHooks.length;j < m;j++){

          typeHooks[j](el, type, listener, context);
        };
        var bound = (function(event){

          // apply normalizations
          var registry = qx.module.Event.__normalizations;
          // generic
          var normalizations = registry["*"] || [];
          // type specific
          if(registry[type]){

            normalizations = normalizations.concat(registry[type]);
          };
          for(var x = 0,y = normalizations.length;x < y;x++){

            event = normalizations[x](event, el, type);
          };
          // call original listener with normalized event
          listener.apply(this, [event]);
        }).bind(ctx);
        bound.original = listener;
        // add native listener
        if(qx.bom.Event.supportsEvent(el, type)){

          qx.bom.Event.addNativeListener(el, type, bound);
        };
        // create an emitter if necessary
        if(!el.__emitter){

          el.__emitter = new qx.event.Emitter();
        };
        var id = el.__emitter.on(type, bound, ctx);
        if(!el.__listener){

          el.__listener = {
          };
        };
        if(!el.__listener[type]){

          el.__listener[type] = {
          };
        };
        el.__listener[type][id] = bound;
        if(!context){

          // store a reference to the dynamically created context so we know
          // what to check for when removing the listener
          if(!el.__ctx){

            el.__ctx = {
            };
          };
          el.__ctx[id] = ctx;
        };
      };
      return this;
    },
    /**
     * Unregisters event listeners for the given type from each element in the
     * collection.
     *
     * @attach {q}
     * @param type {String} Type of the event
     * @param listener {Function} Listener callback
     * @param context {Object?} Listener callback context
     * @return {q} The collection for chaining
     */
    off : function(type, listener, context){

      for(var j = 0;j < this.length;j++){

        var el = this[j];
        // continue if no listener are available
        if(!el.__listener){

          continue;
        };
        for(var id in el.__listener[type]){

          var storedListener = el.__listener[type][id];
          if(storedListener == listener || storedListener.original == listener){

            // get the stored context
            var hasStoredContext = typeof el.__ctx !== "undefined" && el.__ctx[id];
            if(!context && hasStoredContext){

              var storedContext = el.__ctx[id];
            };
            // remove the listener from the emitter
            el.__emitter.off(type, storedListener, storedContext || context);
            // check if it's a bound listener which means it was a native event
            if(storedListener.original == listener){

              // remove the native listener
              qx.bom.Event.removeNativeListener(el, type, storedListener);
            };
            delete el.__listener[type][id];
            if(hasStoredContext){

              delete el.__ctx[id];
            };
          };
        };
        // call hooks
        var hooks = qx.module.Event.__hooks.off;
        // generic
        var typeHooks = hooks["*"] || [];
        // type specific
        if(hooks[type]){

          typeHooks = typeHooks.concat(hooks[type]);
        };
        for(var i = 0,m = typeHooks.length;i < m;i++){

          typeHooks[i](el, type, listener, context);
        };
      };
      return this;
    },
    /**
     * Fire an event of the given type.
     *
     * @attach {q}
     * @param type {String} Event type
     * @param data {?var} Optional data that will be passed to the listener
     * callback function.
     * @return {q} The collection for chaining
     */
    emit : function(type, data){

      for(var j = 0;j < this.length;j++){

        var el = this[j];
        if(el.__emitter){

          el.__emitter.emit(type, data);
        };
      };
      return this;
    },
    /**
     * Attaches a listener for the given event that will be executed only once.
     *
     * @attach {q}
     * @param type {String} Type of the event to listen for
     * @param listener {Function} Listener callback
     * @param context {Object?} Context the callback function will be executed in.
     * Default: The element on which the listener was registered
     * @return {q} The collection for chaining
     */
    once : function(type, listener, context){

      var self = this;
      var wrappedListener = function(data){

        self.off(type, wrappedListener, context);
        listener.call(this, data);
      };
      this.on(type, wrappedListener, context);
      return this;
    },
    /**
     * Checks if one or more listeners for the given event type are attached to
     * the first element in the collection
     *
     * @attach {q}
     * @param type {String} Event type, e.g. <code>mousedown</code>
     * @return {Boolean} <code>true</code> if one or more listeners are attached
     */
    hasListener : function(type){

      if(!this[0] || !this[0].__emitter || !this[0].__emitter.getListeners()[type]){

        return false;
      };
      return this[0].__emitter.getListeners()[type].length > 0;
    },
    /**
     * Copies any event listeners that are attached to the elements in the
     * collection to the provided target element
     *
     * @internal
     * @param target {Element} Element to attach the copied listeners to
     */
    copyEventsTo : function(target){

      var source = this.concat();
      // get all children of source and target
      for(var i = source.length - 1;i >= 0;i--){

        var descendants = source[i].getElementsByTagName("*");
        for(var j = 0;j < descendants.length;j++){

          source.push(descendants[j]);
        };
      };
      for(var i = target.length - 1;i >= 0;i--){

        var descendants = target[i].getElementsByTagName("*");
        for(var j = 0;j < descendants.length;j++){

          target.push(descendants[j]);
        };
      };
      // make sure no emitter object has been copied
      target.forEach(function(el){

        el.__emitter = null;
      });
      for(var i = 0;i < source.length;i++){

        var el = source[i];
        if(!el.__emitter){

          continue;
        };
        var storage = el.__emitter.getListeners();
        for(var name in storage){

          for(var j = storage[name].length - 1;j >= 0;j--){

            var listener = storage[name][j].listener;
            if(listener.original){

              listener = listener.original;
            };
            q(target[i]).on(name, listener, storage[name][j].ctx);
          };
        };
      };
    },
    __isReady : false,
    /**
     * Executes the given function once the document is ready.
     *
     * @attachStatic {q}
     * @param callback {Function} callback function
     */
    ready : function(callback){

      // DOM is already ready
      if(document.readyState === "complete"){

        window.setTimeout(callback, 1);
        return;
      };
      // listen for the load event so the callback is executed no matter what
      var onWindowLoad = function(){

        qx.module.Event.__isReady = true;
        callback();
      };
      q(window).on("load", onWindowLoad);
      var wrappedCallback = function(){

        q(window).off("load", onWindowLoad);
        callback();
      };
      // Listen for DOMContentLoaded event if available (no way to reliably detect
      // support)
      if(q.env.get("engine.name") !== "mshtml" || q.env.get("browser.documentmode") > 8){

        qx.bom.Event.addNativeListener(document, "DOMContentLoaded", wrappedCallback);
      } else {

        // Continually check to see if the document is ready
        var timer = function(){

          // onWindowLoad already executed
          if(qx.module.Event.__isReady){

            return;
          };
          try{

            // If DOMContentLoaded is unavailable, use the trick by Diego Perini
            // http://javascript.nwbox.com/IEContentLoaded/
            document.documentElement.doScroll("left");
            if(document.body){

              wrappedCallback();
            };
          } catch(error) {

            window.setTimeout(timer, 100);
          };
        };
        timer();
      };
    },
    /**
     * Registers a normalization function for the given event types. Listener
     * callbacks for these types will be called with the return value of the
     * normalization function instead of the regular event object.
     *
     * The normalizer will be called with two arguments: The original event
     * object and the element on which the event was triggered
     *
     * @attachStatic {q, $registerEventNormalization}
     * @param types {String[]} List of event types to be normalized. Use an
     * asterisk (<code>*</code>) to normalize all event types
     * @param normalizer {Function} Normalizer function
     */
    $registerNormalization : function(types, normalizer){

      if(!qx.lang.Type.isArray(types)){

        types = [types];
      };
      var registry = qx.module.Event.__normalizations;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(qx.lang.Type.isFunction(normalizer)){

          if(!registry[type]){

            registry[type] = [];
          };
          registry[type].push(normalizer);
        };
      };
    },
    /**
     * Unregisters a normalization function from the given event types.
     *
     * @attachStatic {q, $unregisterEventNormalization}
     * @param types {String[]} List of event types
     * @param normalizer {Function} Normalizer function
     */
    $unregisterNormalization : function(types, normalizer){

      if(!qx.lang.Type.isArray(types)){

        types = [types];
      };
      var registry = qx.module.Event.__normalizations;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(registry[type]){

          qx.lang.Array.remove(registry[type], normalizer);
        };
      };
    },
    /**
     * Returns all registered event normalizers
     *
     * @attachStatic {q, $getEventNormalizationRegistry}
     * @return {Map} Map of event types/normalizer functions
     */
    $getRegistry : function(){

      return qx.module.Event.__normalizations;
    },
    /**
     * Registers an event hook for the given event types.
     *
     * @attachStatic {q, $registerEventHook}
     * @param types {String[]} List of event types
     * @param registerHook {Function} Hook function to be called on event registration
     * @param unregisterHook {Function?} Hook function to be called on event deregistration
     * @internal
     */
    $registerEventHook : function(types, registerHook, unregisterHook){

      if(!qx.lang.Type.isArray(types)){

        types = [types];
      };
      var onHooks = qx.module.Event.__hooks.on;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(qx.lang.Type.isFunction(registerHook)){

          if(!onHooks[type]){

            onHooks[type] = [];
          };
          onHooks[type].push(registerHook);
        };
      };
      if(!unregisterHook){

        return;
      };
      var offHooks = qx.module.Event.__hooks.off;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(qx.lang.Type.isFunction(unregisterHook)){

          if(!offHooks[type]){

            offHooks[type] = [];
          };
          offHooks[type].push(unregisterHook);
        };
      };
    },
    /**
     * Unregisters a hook from the given event types.
     *
     * @attachStatic {q, $unregisterEventHooks}
     * @param types {String[]} List of event types
     * @param registerHook {Function} Hook function to be called on event registration
     * @param unregisterHook {Function?} Hook function to be called on event deregistration
     * @internal
     */
    $unregisterEventHook : function(types, registerHook, unregisterHook){

      if(!qx.lang.Type.isArray(types)){

        types = [types];
      };
      var onHooks = qx.module.Event.__hooks.on;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(onHooks[type]){

          qx.lang.Array.remove(onHooks[type], registerHook);
        };
      };
      if(!unregisterHook){

        return;
      };
      var offHooks = qx.module.Event.__hooks.off;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(offHooks[type]){

          qx.lang.Array.remove(offHooks[type], unregisterHook);
        };
      };
    },
    /**
     * Returns all registered event hooks
     *
     * @attachStatic {q, $getEventHookRegistry}
     * @return {Map} Map of event types/registration hook functions
     * @internal
     */
    $getHookRegistry : function(){

      return qx.module.Event.__hooks;
    }
  },
  defer : function(statics){

    q.$attach({
      "on" : statics.on,
      "off" : statics.off,
      "once" : statics.once,
      "emit" : statics.emit,
      "hasListener" : statics.hasListener,
      "copyEventsTo" : statics.copyEventsTo
    });
    q.$attachStatic({
      "ready" : statics.ready,
      "$registerEventNormalization" : statics.$registerNormalization,
      "$unregisterEventNormalization" : statics.$unregisterNormalization,
      "$getEventNormalizationRegistry" : statics.$getRegistry,
      "$registerEventHook" : statics.$registerEventHook,
      "$unregisterEventHook" : statics.$unregisterEventHook,
      "$getEventHookRegistry" : statics.$getHookRegistry
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Sebastian Werner (wpbasti)
     * Alexander Steitz (aback)
     * Christian Hagendorn (chris_schmidt)

   ======================================================================

   This class contains code based on the following work:

   * Juriy Zaytsev
     http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/

     Copyright (c) 2009 Juriy Zaytsev

     Licence:
       BSD: http://github.com/kangax/iseventsupported/blob/master/LICENSE

     ----------------------------------------------------------------------

     http://github.com/kangax/iseventsupported/blob/master/LICENSE

     Copyright (c) 2009 Juriy Zaytsev

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without
     restriction, including without limitation the rights to use,
     copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the
     Software is furnished to do so, subject to the following
     conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     OTHER DEALINGS IN THE SOFTWARE.

************************************************************************ */
/**
 * Wrapper around native event management capabilities of the browser.
 * This class should not be used directly normally. It's better
 * to use {@link qx.event.Registration} instead.
 */
qx.Bootstrap.define("qx.bom.Event", {
  statics : {
    /**
     * Use the low level browser functionality to attach event listeners
     * to DOM nodes.
     *
     * Use this with caution. This is only thought for event handlers and
     * qualified developers. These are not mem-leak protected!
     *
     * @param target {Object} Any valid native event target
     * @param type {String} Name of the event
     * @param listener {Function} The pointer to the function to assign
     * @param useCapture {Boolean ? false} A Boolean value that specifies the event phase to add
     *    the event handler for the capturing phase or the bubbling phase.
     */
    addNativeListener : function(target, type, listener, useCapture){

      if(target.addEventListener){

        target.addEventListener(type, listener, !!useCapture);
      } else if(target.attachEvent){

        target.attachEvent("on" + type, listener);
      } else if(typeof target["on" + type] != "undefined"){

        target["on" + type] = listener;
      } else {

        {
        };
      };;
    },
    /**
     * Use the low level browser functionality to remove event listeners
     * from DOM nodes.
     *
     * @param target {Object} Any valid native event target
     * @param type {String} Name of the event
     * @param listener {Function} The pointer to the function to assign
     * @param useCapture {Boolean ? false} A Boolean value that specifies the event phase to remove
     *    the event handler for the capturing phase or the bubbling phase.
     */
    removeNativeListener : function(target, type, listener, useCapture){

      if(target.removeEventListener){

        target.removeEventListener(type, listener, !!useCapture);
      } else if(target.detachEvent){

        try{

          target.detachEvent("on" + type, listener);
        } catch(e) {

          // IE7 sometimes dispatches "unload" events on protected windows
          // Ignore the "permission denied" errors.
          if(e.number !== -2146828218){

            throw e;
          };
        };
      } else if(typeof target["on" + type] != "undefined"){

        target["on" + type] = null;
      } else {

        {
        };
      };;
    },
    /**
     * Returns the target of the event.
     *
     * @param e {Event} Native event object
     * @return {Object} Any valid native event target
     */
    getTarget : function(e){

      return e.target || e.srcElement;
    },
    /**
     * Computes the related target from the native DOM event
     *
     * @param e {Event} Native DOM event object
     * @return {Element} The related target
     */
    getRelatedTarget : function(e){

      if(e.relatedTarget !== undefined){

        // In Firefox the related target of mouse events is sometimes an
        // anonymous div inside of a text area, which raises an exception if
        // the nodeType is read. This is why the try/catch block is needed.
        if((qx.core.Environment.get("engine.name") == "gecko")){

          try{

            e.relatedTarget && e.relatedTarget.nodeType;
          } catch(e) {

            return null;
          };
        };
        return e.relatedTarget;
      } else if(e.fromElement !== undefined && e.type === "mouseover"){

        return e.fromElement;
      } else if(e.toElement !== undefined){

        return e.toElement;
      } else {

        return null;
      };;
    },
    /**
     * Prevent the native default of the event to be processed.
     *
     * This is useful to stop native keybindings, native selection
     * and other native functionality behind events.
     *
     * @param e {Event} Native event object
     */
    preventDefault : function(e){

      if(e.preventDefault){

        e.preventDefault();
      } else {

        try{

          // this allows us to prevent some key press events in IE.
          // See bug #1049
          e.keyCode = 0;
        } catch(ex) {
        };
        e.returnValue = false;
      };
    },
    /**
     * Stops the propagation of the given event to the parent element.
     *
     * Only useful for events which bubble e.g. mousedown.
     *
     * @param e {Event} Native event object
     */
    stopPropagation : function(e){

      if(e.stopPropagation){

        e.stopPropagation();
      } else {

        e.cancelBubble = true;
      };
    },
    /**
     * Fires a synthetic native event on the given element.
     *
     * @param target {Element} DOM element to fire event on
     * @param type {String} Name of the event to fire
     * @return {Boolean} A value that indicates whether any of the event handlers called {@link #preventDefault}.
     *  <code>true</code> The default action is permitted, <code>false</code> the caller should prevent the default action.
     */
    fire : function(target, type){

      // dispatch for standard first
      if(document.createEvent){

        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(type, true, true);
        return !target.dispatchEvent(evt);
      } else {

        var evt = document.createEventObject();
        return target.fireEvent("on" + type, evt);
      };
    },
    /**
     * Whether the given target supports the given event type.
     *
     * Useful for testing for support of new features like
     * touch events, gesture events, orientation change, on/offline, etc.
     *
     * @signature function(target, type)
     * @param target {var} Any valid target e.g. window, dom node, etc.
     * @param type {String} Type of the event e.g. click, mousedown
     * @return {Boolean} Whether the given event is supported
     */
    supportsEvent : function(target, type){

      var eventName = "on" + type;
      var supportsEvent = (eventName in target);
      if(!supportsEvent){

        supportsEvent = typeof target[eventName] == "function";
        if(!supportsEvent && target.setAttribute){

          target.setAttribute(eventName, "return;");
          supportsEvent = typeof target[eventName] == "function";
          target.removeAttribute(eventName);
        };
      };
      return supportsEvent;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * EXPERIMENTAL - NOT READY FOR PRODUCTION
 *
 * Basic implementation for an event emitter. This supplies a basic and
 * minimalistic event mechanism.
 */
qx.Bootstrap.define("qx.event.Emitter", {
  extend : Object,
  statics : {
    /** Static storage for all event listener */
    __storage : []
  },
  members : {
    __listener : null,
    __any : null,
    /**
     * Attach a listener to the event emitter. The given <code>name</code>
     * will define the type of event. Handing in a <code>'*'</code> will
     * listen to all events emitted by the event emitter.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     * @return {Integer} An unique <code>id</code> for the attached listener.
     */
    on : function(name, listener, ctx){

      var id = qx.event.Emitter.__storage.length;
      this.__getStorage(name).push({
        listener : listener,
        ctx : ctx,
        id : id
      });
      qx.event.Emitter.__storage.push({
        name : name,
        listener : listener,
        ctx : ctx
      });
      return id;
    },
    /**
     * Attach a listener to the event emitter which will be executed only once.
     * The given <code>name</code> will define the type of event. Handing in a
     * <code>'*'</code> will listen to all events emitted by the event emitter.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     * @return {Integer} An unique <code>id</code> for the attached listener.
     */
    once : function(name, listener, ctx){

      var id = qx.event.Emitter.__storage.length;
      this.__getStorage(name).push({
        listener : listener,
        ctx : ctx,
        once : true,
        id : id
      });
      qx.event.Emitter.__storage.push({
        name : name,
        listener : listener,
        ctx : ctx
      });
      return id;
    },
    /**
     * Remove a listener from the event emitter. The given <code>name</code>
     * will define the type of event.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     * @return {Integer|null} The listener's id if it was removed or
     * <code>null</code> if it wasn't found
     */
    off : function(name, listener, ctx){

      var storage = this.__getStorage(name);
      for(var i = storage.length - 1;i >= 0;i--){

        var entry = storage[i];
        if(entry.listener == listener && entry.ctx == ctx){

          storage.splice(i, 1);
          qx.event.Emitter.__storage[entry.id] = null;
          return entry.id;
        };
      };
      return null;
    },
    /**
     * Removes the listener identified by the given <code>id</code>. The id
     * will be return on attaching the listener and can be stored for removing.
     *
     * @param id {Integer} The id of the listener.
     */
    offById : function(id){

      var entry = qx.event.Emitter.__storage[id];
      this.off(entry.name, entry.listener, entry.ctx);
    },
    /**
     * Alternative for {@link #on}.
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     * @return {Integer} An unique <code>id</code> for the attached listener.
     */
    addListener : function(name, listener, ctx){

      return this.on(name, listener, ctx);
    },
    /**
     * Alternative for {@link #once}.
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     * @return {Integer} An unique <code>id</code> for the attached listener.
     */
    addListenerOnce : function(name, listener, ctx){

      return this.once(name, listener, ctx);
    },
    /**
     * Alternative for {@link #off}.
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     */
    removeListener : function(name, listener, ctx){

      this.off(name, listener, ctx);
    },
    /**
     * Alternative for {@link #offById}.
     * @param id {Integer} The id of the listener.
     */
    removeListenerById : function(id){

      this.offById(id);
    },
    /**
     * Emits an event with the given name. The data will be passed
     * to the listener.
     * @param name {String} The name of the event to emit.
     * @param data {var?undefined} The data which should be passed to the listener.
     */
    emit : function(name, data){

      var storage = this.__getStorage(name);
      for(var i = storage.length - 1;i >= 0;i--){

        var entry = storage[i];
        entry.listener.call(entry.ctx, data);
        if(entry.once){

          storage.splice(i, 1);
        };
      };
      // call on any
      storage = this.__getStorage("*");
      for(var i = storage.length - 1;i >= 0;i--){

        var entry = storage[i];
        entry.listener.call(entry.ctx, data);
      };
    },
    /**
     * Returns the internal attached listener.
     * @internal
     * @return {Map} A map which has the event name as key. The values are
     *   arrays containing a map with 'listener' and 'ctx'.
     */
    getListeners : function(){

      return this.__listener;
    },
    /**
     * Internal helper which will return the storage for the given name.
     * @param name {String} The name of the event.
     * @return {Array} An array which is the storage for the listener and
     *   the given event name.
     */
    __getStorage : function(name){

      if(this.__listener == null){

        this.__listener = {
        };
      };
      if(this.__listener[name] == null){

        this.__listener[name] = [];
      };
      return this.__listener[name];
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.module.Event)
************************************************************************ */
/**
 * Normalization for touch events
 */
qx.Bootstrap.define("qx.module.event.Touch", {
  statics : {
    /**
     * List of event types to be normalized
     * @type Array
     */
    TYPES : ["tap", "swipe"],
    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @param type {String} Event type
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element, type){

      if(!event){

        return event;
      };
      event._type = type;
      return event;
    }
  },
  defer : function(statics){

    q.$registerEventNormalization(statics.TYPES, statics.normalize);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * The class is responsible for device detection. This is specially usefull
 * if you are on a mobile device.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Device", {
  statics : {
    /** Maps user agent names to device IDs */
    __ids : {
      "iPod" : "ipod",
      "iPad" : "ipad",
      "iPhone" : "iPhone",
      "PSP" : "psp",
      "PLAYSTATION 3" : "ps3",
      "Nintendo Wii" : "wii",
      "Nintendo DS" : "ds",
      "XBOX" : "xbox",
      "Xbox" : "xbox"
    },
    /**
     * Returns the name of the current device if detectable. It falls back to
     * <code>pc</code> if the detection for other devices fails.
     *
     * @internal
     * @return {String} The string of the device found.
     */
    getName : function(){

      var str = [];
      for(var key in this.__ids){

        str.push(key);
      };
      var reg = new RegExp("(" + str.join("|").replace(/\./g, "\.") + ")", "g");
      var match = reg.exec(navigator.userAgent);
      if(match && match[1]){

        return qx.bom.client.Device.__ids[match[1]];
      };
      return "pc";
    },
    /**
     * Determines on what type of device the application is running.
     * Valid values are: "mobile", "tablet" or "desktop".
     * @return {String} The device type name of determined device.
     */
    getType : function(){

      return qx.bom.client.Device.detectDeviceType(navigator.userAgent);
    },
    /**
     * Detects the device type, based on given userAgentString.
     *
     * @param userAgentString {String} userAgent parameter, needed for decision.
     * @return {String} The device type name of determined device: "mobile","desktop","tablet"
     */
    detectDeviceType : function(userAgentString){

      if(qx.bom.client.Device.detectTabletDevice(userAgentString)){

        return "tablet";
      } else if(qx.bom.client.Device.detectMobileDevice(userAgentString)){

        return "mobile";
      };
      return "desktop";
    },
    /**
     * Detects if a device is a mobile phone. (Tablets excluded.)
     * @param userAgentString {String} userAgent parameter, needed for decision.
     * @return {Boolean} Flag which indicates whether it is a mobile device.
     */
    detectMobileDevice : function(userAgentString){

      return /android.+mobile|ip(hone|od)|bada\/|blackberry|maemo|opera m(ob|in)i|fennec|NetFront|phone|psp|symbian|windows (ce|phone)|xda/i.test(userAgentString);
    },
    /**
     * Detects if a device is a tablet device.
     * @param userAgentString {String} userAgent parameter, needed for decision.
     * @return {Boolean} Flag which indicates whether it is a tablet device.
     */
    detectTabletDevice : function(userAgentString){

      return !(/Fennec|HTC.Magic|Nexus|android.+mobile/i.test(userAgentString)) && (/Android|ipad|tablet|playbook|silk|kindle|psp/i.test(userAgentString));
    }
  },
  defer : function(statics){

    qx.core.Environment.add("device.name", statics.getName);
    qx.core.Environment.add("device.type", statics.getType);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Module for querying information about the environment / runtime.
 * It adds a static key <code>env</code> to q and offers the given methods.
 *
 * <pre class="javascript">
 * q.env.get("engine.name"); // return "webkit" e.g.
 * </pre>
 *
 * The following values are predefined:
 * "browser.name" --> The name of the browser
 * "browser.version" --> The version of the browser
 * "browser.quirksmode"  --> <code>true</code> if the browser is in quirksmode
 * "browser.documentmode" --> The document mode of the browser
 *
 * "device.name" --> The name of the device e.g. <code>iPad</code>.
 * "device.type" --> Either <code>desktop</code>, <code>tablet</code> or <code>mobile</code>.
 *
 * "engine.name" --> The name of the browser engine
 * "engine.version" --> The version of the browser engine
 */
qx.Bootstrap.define("qx.module.Environment", {
  statics : {
    /**
     * Get the value stored for the given key.
     *
     * @attachStatic {q, env.get}
     * @param key {String} The key to check for.
     * @return {var} The value stored for the given key.
     */
    get : function(key){

      return qx.core.Environment.get(key);
    },
    /**
     * Adds a new environment setting which can be queried via {@link #get}.
     * @param key {String} The key to store the value for.
     *
     * @attachStatic {q, env.add}
     * @param value {var} The value to store.
     * @return {q} The collection for chaining.
     */
    add : function(key, value){

      qx.core.Environment.add(key, value);
      return this;
    }
  },
  defer : function(statics){

    // make sure the desired keys are available (browser.* and engine.*)
    qx.core.Environment.get("browser.name");
    qx.core.Environment.get("browser.version");
    qx.core.Environment.get("browser.quirksmode");
    qx.core.Environment.get("browser.documentmode");
    qx.core.Environment.get("engine.name");
    qx.core.Environment.get("engine.version");
    qx.core.Environment.get("device.type");
    q.$attachStatic({
      "env" : {
        get : statics.get,
        add : statics.add
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.module.Environment)
#require(qx.module.Event)
************************************************************************ */
/**
 * Normalization for native mouse events
 */
qx.Bootstrap.define("qx.module.event.Mouse", {
  statics : {
    /**
     * List of event types to be normalized
     */
    TYPES : ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mousemove", "mouseout"],
    /**
     * List qx.module.event.Mouse methods to be attached to native mouse event
     * objects
     * @internal
     */
    BIND_METHODS : ["getButton", "getViewportLeft", "getViewportTop", "getDocumentLeft", "getDocumentTop", "getScreenLeft", "getScreenTop"],
    /**
     * Standard mouse button mapping
     */
    BUTTONS_DOM2 : {
      '0' : "left",
      '2' : "right",
      '1' : "middle"
    },
    /**
     * Legacy Internet Explorer mouse button mapping
     */
    BUTTONS_MSHTML : {
      '1' : "left",
      '2' : "right",
      '4' : "middle"
    },
    /**
     * Returns the identifier of the mouse button that change state when the
     * event was triggered
     *
     * @return {String} One of <code>left</code>, <code>right</code> or
     * <code>middle</code>
     */
    getButton : function(){

      switch(this.type){case "contextmenu":
      return "right";case "click":
      // IE does not support buttons on click --> assume left button
      if(q.env.get("browser.name") === "ie" && q.env.get("browser.documentmode") < 9){

        return "left";
      };default:
      if(this.target !== undefined){

        return qx.module.event.Mouse.BUTTONS_DOM2[this.button] || "none";
      } else {

        return qx.module.event.Mouse.BUTTONS_MSHTML[this.button] || "none";
      };};
    },
    /**
     * Get the horizontal coordinate at which the event occurred relative
     * to the viewport.
     *
     * @return {Number} The horizontal mouse position
     */
    getViewportLeft : function(){

      return this.clientX;
    },
    /**
     * Get the vertical coordinate at which the event occurred relative
     * to the viewport.
     *
     * @return {Number} The vertical mouse position
     * @signature function()
     */
    getViewportTop : function(){

      return this.clientY;
    },
    /**
     * Get the horizontal position at which the event occurred relative to the
     * left of the document. This property takes into account any scrolling of
     * the page.
     *
     * @return {Number} The horizontal mouse position in the document.
     */
    getDocumentLeft : function(){

      if(this.pageX !== undefined){

        return this.pageX;
      } else {

        var win = qx.dom.Node.getWindow(this.srcElement);
        return this.clientX + qx.bom.Viewport.getScrollLeft(win);
      };
    },
    /**
     * Get the vertical position at which the event occurred relative to the
     * top of the document. This property takes into account any scrolling of
     * the page.
     *
     * @return {Number} The vertical mouse position in the document.
     */
    getDocumentTop : function(){

      if(this.pageY !== undefined){

        return this.pageY;
      } else {

        var win = qx.dom.Node.getWindow(this.srcElement);
        return this.clientY + qx.bom.Viewport.getScrollTop(win);
      };
    },
    /**
     * Get the horizontal coordinate at which the event occurred relative to
     * the origin of the screen coordinate system.
     *
     * Note: This value is usually not very useful unless you want to
     * position a native popup window at this coordinate.
     *
     * @return {Number} The horizontal mouse position on the screen.
     */
    getScreenLeft : function(){

      return this.screenX;
    },
    /**
     * Get the vertical coordinate at which the event occurred relative to
     * the origin of the screen coordinate system.
     *
     * Note: This value is usually not very useful unless you want to
     * position a native popup window at this coordinate.
     *
     * @return {Number} The vertical mouse position on the screen.
     */
    getScreenTop : function(){

      return this.screenY;
    },
    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element){

      if(!event){

        return event;
      };
      var bindMethods = qx.module.event.Mouse.BIND_METHODS;
      for(var i = 0,l = bindMethods.length;i < l;i++){

        if(typeof event[bindMethods[i]] != "function"){

          event[bindMethods[i]] = qx.module.event.Mouse[bindMethods[i]].bind(event);
        };
      };
      return event;
    }
  },
  defer : function(statics){

    q.$registerEventNormalization(qx.module.event.Mouse.TYPES, statics.normalize);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Utility module to give some support to work with arrays.
 */
qx.Bootstrap.define("qx.module.util.Array", {
  statics : {
    /**
     * Converts an array like object to any other array like
     * object.
     *
     * Attention: The returned array may be same
     * instance as the incoming one if the constructor is identical!
     *
     * @signature function(object, constructor, offset)
     * @attachStatic {q, array.cast}
     *
     * @param object {var} any array-like object
     * @param constructor {Function} constructor of the new instance
     * @param offset {Integer?0} position to start from
     * @return {Array} the converted array
     */
    cast : qx.lang.Array.cast,
    /**
     * Check whether the two arrays have the same content. Checks only the
     * equality of the arrays' content.
     *
     * @signature function(arr1, arr2)
     * @attachStatic {q, array.equals}
     *
     * @param arr1 {Array} first array
     * @param arr2 {Array} second array
     * @return {Boolean} Whether the two arrays are equal
     */
    equals : qx.lang.Array.equals,
    /**
     * Modifies the first array as it removes all elements
     * which are listed in the second array as well.
     *
     * @signature function(arr1, arr2)
     * @attachStatic {q, array.exclude}
     *
     * @param arr1 {Array} the array
     * @param arr2 {Array} the elements of this array will be excluded from the other one
     * @return {Array} The modified array.
     */
    exclude : qx.lang.Array.exclude,
    /**
     * Convert an arguments object into an array.
     *
     * @signature function(args, offset)
     * @attachStatic {q, array.fromArguments}
     *
     * @param args {arguments} arguments object
     * @param offset {Number?0} position to start from
     * @return {Array} a newly created array (copy) with the content of the arguments object.
     */
    fromArguments : qx.lang.Array.fromArguments,
    /**
     * Insert an element into the array after a given second element.
     *
     * @signature function(arr, obj, obj2)
     * @attachStatic {q, array.insertAfter}
     *
     * @param arr {Array} the array
     * @param obj {var} object to be inserted
     * @param obj2 {var} insert obj1 after this object
     * @return {Array} The given array.
     */
    insertAfter : qx.lang.Array.insertAfter,
    /**
     * Insert an element into the array before a given second element.
     *
     * @signature function(arr, obj, obj2)
     * @attachStatic {q, array.insertBefore}
     *
     * @param arr {Array} the array
     * @param obj {var} object to be inserted
     * @param obj2 {var} insert obj1 before this object
     * @return {Array} The given array.
     */
    insertBefore : qx.lang.Array.insertBefore,
    /**
     * Returns the highest value in the given array. Supports
     * numeric values only.
     *
     * @signature function(arr)
     * @attachStatic {q, array.max}
     *
     * @param arr {Array} Array to process.
     * @return {Number | undefined} The highest of all values or undefined if array is empty.
     */
    max : qx.lang.Array.max,
    /**
     * Returns the lowest value in the given array. Supports
     * numeric values only.
     *
     * @signature function(arr)
     * @attachStatic {q, array.min}
     *
     * @param arr {Array} Array to process.
     * @return {Number | undefined} The lowest of all values or undefined if array is empty.
     */
    min : qx.lang.Array.min,
    /**
     * Remove an element from the array.
     *
     * @signature function(arr, obj)
     * @attachStatic {q, array.remove}
     *
     * @param arr {Array} the array
     * @param obj {var} element to be removed from the array
     * @return {var} the removed element
     */
    remove : qx.lang.Array.remove,
    /**
     * Remove all elements from the array
     *
     * @signature function(arr)
     * @attachStatic {q, array.removeAll}
     *
     * @param arr {Array} the array
     * @return {Array} empty array
     */
    removeAll : qx.lang.Array.removeAll,
    /**
     * Recreates an array which is free of all duplicate elements from the original.
     * This method do not modifies the original array!
     * Keep in mind that this methods deletes undefined indexes.
     *
     * @signature function(arr)
     * @attachStatic {q, array.unique}
     *
     * @param arr {Array} Incoming array
     * @return {Array} Returns a copy with no duplicates
     *   or the original array if no duplicates were found.
     */
    unique : qx.lang.Array.unique
  },
  defer : function(statics){

    q.$attachStatic({
      array : {
        cast : statics.cast,
        equals : statics.equals,
        exclude : statics.exclude,
        fromArguments : statics.fromArguments,
        insertAfter : statics.insertAfter,
        insertBefore : statics.insertBefore,
        max : statics.max,
        min : statics.min,
        remove : statics.remove,
        removeAll : statics.removeAll,
        unique : statics.unique
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Utility module to give some support to work with strings.
 */
qx.Bootstrap.define("qx.module.util.String", {
  statics : {
    /**
     * Converts a hyphenated string (separated by '-') to camel case.
     *
     * Example:
     * <pre class='javascript'>q.string.camelCase("I-like-cookies"); //returns "ILikeCookies"</pre>
     * The implementation does not force a lowerCamelCase or upperCamelCase version.
     * The first letter of the parameter keeps its case.
     *
     * @attachStatic {q, string.camelCase}
     * @param str {String} hyphenated string
     * @return {String} camelcase string
     */
    camelCase : function(str){

      return qx.lang.String.camelCase.call(qx.lang.String, str);
    },
    /**
     * Converts a camelcased string to a hyphenated (separated by '-') string.
     *
     * Example:
     * <pre class='javascript'>q.string.hyphenate("ILikeCookies"); //returns "I-like-cookies"</pre>
     * The implementation does not force a lowerCamelCase or upperCamelCase version.
     * The first letter of the parameter keeps its case.
     *
     * @attachStatic {q, string.hyphenate}
     * @param str {String} camelcased string
     * @return {String} hyphenated string
     */
    hyphenate : function(str){

      return qx.lang.String.hyphenate.call(qx.lang.String, str);
    },
    /**
     * Convert the first character of the string to upper case.
     *
     * @attachStatic {q, string.firstUp}
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with an upper case first character
     */
    firstUp : qx.lang.String.firstUp,
    /**
     * Convert the first character of the string to lower case.
     *
     * @attachStatic {q, string.firstLow}
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with a lower case first character
     */
    firstLow : qx.lang.String.firstLow,
    /**
     * Check whether the string starts with the given substring.
     *
     * @attachStatic {q, string.startsWith}
     * @signature function(fullstr, substr)
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string starts with the given substring
     */
    startsWith : qx.lang.String.startsWith,
    /**
     * Check whether the string ends with the given substring.
     *
     * @attachStatic {q, string.endsWith}
     * @signature function(fullstr, substr)
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string ends with the given substring
     */
    endsWith : qx.lang.String.endsWith,
    /**
     * Escapes all chars that have a special meaning in regular expressions.
     *
     * @attachStatic {q, string.escapeRegexpChars}
     * @signature function(str)
     * @param str {String} the string where to escape the chars.
     * @return {String} the string with the escaped chars.
     */
    escapeRegexpChars : qx.lang.String.escapeRegexpChars
  },
  defer : function(statics){

    q.$attachStatic({
      string : {
        camelCase : statics.camelCase,
        hyphenate : statics.hyphenate,
        firstUp : statics.firstUp,
        firstLow : statics.firstLow,
        startsWith : statics.startsWith,
        endsWith : statics.endsWith,
        escapeRegexpChars : statics.escapeRegexpChars
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class is responsible for applying CSS3 transforms to the collection.
 * The implementation is mostly a cross browser wrapper for applying the
 * transforms.
 * The API is keep to the spec as close as possible.
 *
 * http://www.w3.org/TR/css3-3d-transforms/
 */
qx.Bootstrap.define("qx.module.Transform", {
  statics : {
    /**
     * Method to apply multiple transforms at once to the given element. It
     * takes a map containing the transforms you want to apply plus the values
     * e.g.<code>{scale: 2, rotate: "5deg"}</code>.
     * The values can be either singular, which means a single value will
     * be added to the CSS. If you give an array, the values will be split up
     * and each array entry will be used for the X, Y or Z dimension in that
     * order e.g. <code>{scale: [2, 0.5]}</code> will result in a element
     * double the size in X direction and half the size in Y direction.
     * Make sure your browser supports all transformations you apply.
     *
     * @attach {q}
     * @param transforms {Map} The map containing the transforms and value.
     * @return {q} This reference for chaining.
     */
    transform : function(transforms){

      this.forEach(function(el){

        qx.bom.element.Transform.transform(el, transforms);
      });
    },
    /**
     * Translates by the given value. For further details, take
     * a look at the {@link #transform} method.
     *
     * @attach {q}
     * @param value {String|Array} The value to translate e.g. <code>"10px"</code>.
     * @return {q} This reference for chaining.
     */
    translate : function(value){

      return this.transform({
        translate : value
      });
    },
    /**
     * Scales by the given value. For further details, take
     * a look at the {@link #transform} method.
     *
     * @attach {q}
     * @param value {Number|Array} The value to scale.
     * @return {q} This reference for chaining.
     */
    scale : function(value){

      return this.transform({
        scale : value
      });
    },
    /**
     * Rotates by the given value. For further details, take
     * a look at the {@link #transform} method.
     * @param value {String|Array} The value to rotate e.g. <code>"90deg"</code>.
     * @return {q} This reference for chaining.
     */
    rotate : function(value){

      return this.transform({
        rotate : value
      });
    },
    /**
     * Skews by the given value. For further details, take
     * a look at the {@link #transform} method.
     *
     * @attach {q}
     * @param value {String|Array} The value to skew e.g. <code>"90deg"</code>.
     * @return {q} This reference for chaining.
     */
    skew : function(value){

      return this.transform({
        skew : value
      });
    },
    /**
     * Sets the transform-origin property.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
     *
     * @attach {q}
     * @param value {String} CSS position values like <code>50% 50%</code> or
     *   <code>left top</code>.
     * @return {q} This reference for chaining.
     */
    setTransformOrigin : function(value){

      this.forEach(function(el){

        qx.bom.element.Transform.setOrigin(el, value);
      });
      return this;
    },
    /**
     * Returns the transform-origin property of the first element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
     *
     * @attach {q}
     * @return {String} The set property, e.g. <code>50% 50%</code> or null,
     *   of the collection is empty.
     */
    getTransformOrigin : function(){

      if(this[0]){

        return qx.bom.element.Transform.getOrigin(this[0]);
      };
      return "";
    },
    /**
     * Sets the transform-style property.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
     *
     * @attach {q}
     * @param value {String} Either <code>flat</code> or <code>preserve-3d</code>.
     * @return {q} This reference for chaining.
     */
    setTransformStyle : function(value){

      this.forEach(function(el){

        qx.bom.element.Transform.setStyle(el, value);
      });
      return this;
    },
    /**
     * Returns the transform-style property of the first element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
     *
     * @attach {q}
     * @return {String} The set property, either <code>flat</code> or
     *   <code>preserve-3d</code>.
     */
    getTransformStyle : function(){

      if(this[0]){

        return qx.bom.element.Transform.getStyle(this[0]);
      };
      return "";
    },
    /**
     * Sets the perspective property.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
     *
     * @attach {q}
     * @param value {Number} The perspective layer. Numbers between 100
     *   and 5000 give the best results.
     * @return {q} This reference for chaining.
     */
    setTransformPerspective : function(value){

      this.forEach(function(el){

        qx.bom.element.Transform.setPerspective(el, value);
      });
      return this;
    },
    /**
     * Returns the perspective property of the first element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
     *
     * @attach {q}
     * @return {String} The set property, e.g. <code>500</code>
     */
    getTransformPerspective : function(){

      if(this[0]){

        return qx.bom.element.Transform.getPerspective(this[0]);
      };
      return "";
    },
    /**
     * Sets the perspective-origin property.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
     *
     * @attach {q}
     * @param value {String} CSS position values like <code>50% 50%</code> or
     *   <code>left top</code>.
     * @return {q} This reference for chaining.
     */
    setTransformPerspectiveOrigin : function(value){

      this.forEach(function(el){

        qx.bom.element.Transform.setPerspectiveOrigin(el, value);
      });
      return this;
    },
    /**
     * Returns the perspective-origin property of the first element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
     *
     * @attach {q}
     * @return {String} The set property, e.g. <code>50% 50%</code>
     */
    getTransformPerspectiveOrigin : function(){

      if(this[0]){

        return qx.bom.element.Transform.getPerspectiveOrigin(this[0]);
      };
      return "";
    },
    /**
     * Sets the backface-visibility property.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
     *
     * @attach {q}
     * @param value {Boolean} <code>true</code> if the backface should be visible.
     * @return {q} This reference for chaining.
     */
    setTransformBackfaceVisibility : function(value){

      this.forEach(function(el){

        qx.bom.element.Transform.setBackfaceVisibility(el, value);
      });
      return this;
    },
    /**
     * Returns the backface-visibility property of the first element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
     *
     * @attach {q}
     * @return {Boolean} <code>true</code>, if the backface is visible.
     */
    getTransformBackfaceVisibility : function(){

      if(this[0]){

        return qx.bom.element.Transform.getBackfaceVisibility(this[0]);
      };
      return "";
    }
  },
  defer : function(statics){

    q.$attach({
      "transform" : statics.transform,
      "translate" : statics.translate,
      "rotate" : statics.rotate,
      "skew" : statics.skew,
      "scale" : statics.scale,
      "setTransformStyle" : statics.setTransformStyle,
      "getTransformStyle" : statics.getTransformStyle,
      "setTransformOrigin" : statics.setTransformOrigin,
      "getTransformOrigin" : statics.getTransformOrigin,
      "setTransformPerspective" : statics.setTransformPerspective,
      "getTransformPerspective" : statics.getTransformPerspective,
      "setTransformPerspectiveOrigin" : statics.setTransformPerspectiveOrigin,
      "getTransformPerspectiveOrigin" : statics.getTransformPerspectiveOrigin,
      "setTransformBackfaceVisibility" : statics.setTransformBackfaceVisibility,
      "getTransformBackfaceVisibility" : statics.getTransformBackfaceVisibility
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Responsible for checking all relevant CSS transform properties.
 *
 * Specs:
 * http://www.w3.org/TR/css3-2d-transforms/
 * http://www.w3.org/TR/css3-3d-transforms/
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.CssTransform", {
  statics : {
    /**
     * Main check method which returns an object if CSS animations are
     * supported. This object contains all necessary keys to work with CSS
     * animations.
     * <ul>
     *  <li><code>name</code> The name of the css transform style</li>
     *  <li><code>style</code> The name of the css transform-style style</li>
     *  <li><code>origin</code> The name of the transform-origin style</li>
     *  <li><code>3d</code> Whether 3d transforms are supported</li>
     *  <li><code>perspective</code> The name of the perspective style</li>
     *  <li><code>perspective-origin</code> The name of the perspective-origin style</li>
     *  <li><code>backface-visibility</code> The name of the backface-visibility style</li>
     * </ul>
     *
     * @internal
     * @return {Object|null} The described object or null, if animations are
     *   not supported.
     */
    getSupport : function(){

      var name = qx.bom.client.CssTransform.getName();
      if(name != null){

        return {
          "name" : name,
          "style" : qx.bom.client.CssTransform.getStyle(),
          "origin" : qx.bom.client.CssTransform.getOrigin(),
          "3d" : qx.bom.client.CssTransform.get3D(),
          "perspective" : qx.bom.client.CssTransform.getPerspective(),
          "perspective-origin" : qx.bom.client.CssTransform.getPerspectiveOrigin(),
          "backface-visibility" : qx.bom.client.CssTransform.getBackFaceVisibility()
        };
      };
      return null;
    },
    /**
     * Checks for the style name used to set the transform origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getStyle : function(){

      return qx.bom.Style.getPropertyName("transformStyle");
    },
    /**
     * Checks for the style name used to set the transform origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getPerspective : function(){

      return qx.bom.Style.getPropertyName("perspective");
    },
    /**
     * Checks for the style name used to set the perspective origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getPerspectiveOrigin : function(){

      return qx.bom.Style.getPropertyName("perspectiveOrigin");
    },
    /**
     * Checks for the style name used to set the backface visibility.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getBackFaceVisibility : function(){

      return qx.bom.Style.getPropertyName("backfaceVisibility");
    },
    /**
     * Checks for the style name used to set the transform origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getOrigin : function(){

      return qx.bom.Style.getPropertyName("transformOrigin");
    },
    /**
     * Checks for the style name used for transforms.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getName : function(){

      return qx.bom.Style.getPropertyName("transform");
    },
    /**
     * Checks if 3D transforms are supported.
     * @internal
     * @return {Boolean} <code>true</code>, if 3D transformations are supported
     */
    get3D : function(){

      return qx.bom.client.CssTransform.getPerspective() != null;
    }
  },
  defer : function(statics){

    qx.core.Environment.add("css.transform", statics.getSupport);
    qx.core.Environment.add("css.transform.3d", statics.get3D);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class is responsible for applying CSS3 transforms to plain DOM elements.
 * The implementation is mostly a cross browser wrapper for applying the
 * transforms.
 * The API is keep to the spec as close as possible.
 *
 * http://www.w3.org/TR/css3-3d-transforms/
 */
qx.Bootstrap.define("qx.bom.element.Transform", {
  statics : {
    /** The dimensions of the transforms */
    __dimensions : ["X", "Y", "Z"],
    /** Internal storage of the CSS names */
    __cssKeys : qx.core.Environment.get("css.transform"),
    /**
     * Method to apply multiple transforms at once to the given element. It
     * takes a map containing the transforms you want to apply plus the values
     * e.g.<code>{scale: 2, rotate: "5deg"}</code>.
     * The values can be either singular, which means a single value will
     * be added to the CSS. If you give an array, the values will be split up
     * and each array entry will be used for the X, Y or Z dimension in that
     * order e.g. <code>{scale: [2, 0.5]}</code> will result in a element
     * double the size in X direction and half the size in Y direction.
     * Make sure your browser supports all transformations you apply.
     * @param el {Element} The element to apply the transformation.
     * @param transforms {Map} The map containing the transforms and value.
     */
    transform : function(el, transforms){

      var transformCss = this.__mapToCss(transforms);
      if(this.__cssKeys != null){

        var style = this.__cssKeys["name"];
        el.style[style] = transformCss;
      };
    },
    /**
     * Translates the given element by the given value. For further details, take
     * a look at the {@link #transform} method.
     * @param el {Element} The element to apply the transformation.
     * @param value {String|Array} The value to translate e.g. <code>"10px"</code>.
     */
    translate : function(el, value){

      this.transform(el, {
        translate : value
      });
    },
    /**
     * Scales the given element by the given value. For further details, take
     * a look at the {@link #transform} method.
     * @param el {Element} The element to apply the transformation.
     * @param value {Number|Array} The value to scale.
     */
    scale : function(el, value){

      this.transform(el, {
        scale : value
      });
    },
    /**
     * Rotates the given element by the given value. For further details, take
     * a look at the {@link #transform} method.
     * @param el {Element} The element to apply the transformation.
     * @param value {String|Array} The value to rotate e.g. <code>"90deg"</code>.
     */
    rotate : function(el, value){

      this.transform(el, {
        rotate : value
      });
    },
    /**
     * Skews the given element by the given value. For further details, take
     * a look at the {@link #transform} method.
     * @param el {Element} The element to apply the transformation.
     * @param value {String|Array} The value to skew e.g. <code>"90deg"</code>.
     */
    skew : function(el, value){

      this.transform(el, {
        skew : value
      });
    },
    /**
     * Converts the given map to a string which chould ba added to a css
     * stylesheet.
     * @param transforms {Map} The transforms map. For a detailed description,
     * take a look at the {@link #transform} method.
     * @return {String} The CSS value.
     */
    getCss : function(transforms){

      var transformCss = this.__mapToCss(transforms);
      if(this.__cssKeys != null){

        var style = this.__cssKeys["name"];
        return qx.lang.String.hyphenate(style) + ":" + transformCss + ";";
      };
      return "";
    },
    /**
     * Sets the transform-origin property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
     * @param el {Element} The dom element to set the property.
     * @param value {String} CSS position values like <code>50% 50%</code> or
     *   <code>left top</code>.
     */
    setOrigin : function(el, value){

      if(this.__cssKeys != null){

        el.style[this.__cssKeys["origin"]] = value;
      };
    },
    /**
     * Returns the transform-origin property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
     * @param el {Element} The dom element to read the property.
     * @return {String} The set property, e.g. <code>50% 50%</code>
     */
    getOrigin : function(el){

      if(this.__cssKeys != null){

        return el.style[this.__cssKeys["origin"]];
      };
      return "";
    },
    /**
     * Sets the transform-style property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
     * @param el {Element} The dom element to set the property.
     * @param value {String} Either <code>flat</code> or <code>preserve-3d</code>.
     */
    setStyle : function(el, value){

      if(this.__cssKeys != null){

        el.style[this.__cssKeys["style"]] = value;
      };
    },
    /**
     * Returns the transform-style property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
     * @param el {Element} The dom element to read the property.
     * @return {String} The set property, either <code>flat</code> or
     *   <code>preserve-3d</code>.
     */
    getStyle : function(el){

      if(this.__cssKeys != null){

        return el.style[this.__cssKeys["style"]];
      };
      return "";
    },
    /**
     * Sets the perspective property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
     * @param el {Element} The dom element to set the property.
     * @param value {Number} The perspective layer. Numbers between 100
     *   and 5000 give the best results.
     */
    setPerspective : function(el, value){

      if(this.__cssKeys != null){

        el.style[this.__cssKeys["perspective"]] = value + "px";
      };
    },
    /**
     * Returns the perspective property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
     * @param el {Element} The dom element to read the property.
     * @return {String} The set property, e.g. <code>500</code>
     */
    getPerspective : function(el){

      if(this.__cssKeys != null){

        return el.style[this.__cssKeys["perspective"]];
      };
      return "";
    },
    /**
     * Sets the perspective-origin property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
     * @param el {Element} The dom element to set the property.
     * @param value {String} CSS position values like <code>50% 50%</code> or
     *   <code>left top</code>.
     */
    setPerspectiveOrigin : function(el, value){

      if(this.__cssKeys != null){

        el.style[this.__cssKeys["perspective-origin"]] = value;
      };
    },
    /**
     * Returns the perspective-origin property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
     * @param el {Element} The dom element to read the property.
     * @return {String} The set property, e.g. <code>50% 50%</code>
     */
    getPerspectiveOrigin : function(el){

      if(this.__cssKeys != null){

        var value = el.style[this.__cssKeys["perspective-origin"]];
        if(value != ""){

          return value;
        } else {

          var valueX = el.style[this.__cssKeys["perspective-origin"] + "X"];
          var valueY = el.style[this.__cssKeys["perspective-origin"] + "Y"];
          if(valueX != ""){

            return valueX + " " + valueY;
          };
        };
      };
      return "";
    },
    /**
     * Sets the backface-visibility property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
     * @param el {Element} The dom element to set the property.
     * @param value {Boolean} <code>true</code> if the backface should be visible.
     */
    setBackfaceVisibility : function(el, value){

      if(this.__cssKeys != null){

        el.style[this.__cssKeys["backface-visibility"]] = value ? "visible" : "hidden";
      };
    },
    /**
     * Returns the backface-visibility property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
     * @param el {Element} The dom element to read the property.
     * @return {Boolean} <code>true</code>, if the backface is visible.
     */
    getBackfaceVisibility : function(el){

      if(this.__cssKeys != null){

        return el.style[this.__cssKeys["backface-visibility"]] == "visible";
      };
      return true;
    },
    /**
     * Internal helper which converts the given transforms map to a valid CSS
     * string.
     * @param transforms {Map} A map containing the transforms.
     * @return {String} The CSS transforms.
     */
    __mapToCss : function(transforms){

      var value = "";
      for(var func in transforms){

        var params = transforms[func];
        // if an array is given
        if(qx.Bootstrap.isArray(params)){

          for(var i = 0;i < params.length;i++){

            if(params[i] == undefined){

              continue;
            };
            value += func + this.__dimensions[i] + "(";
            value += params[i];
            value += ") ";
          };
        } else {

          // single value case
          value += func + "(" + transforms[func] + ") ";
        };
      };
      return value;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.module.Event)
#require(qx.bom.Event#getTarget)
#require(qx.bom.Event#getRelatedTarget)
************************************************************************ */
/**
 * Common normalizations for native events
 */
qx.Bootstrap.define("qx.module.event.Native", {
  statics : {
    /**
     * List of event types to be normalized
     */
    TYPES : ["*"],
    /**
     * List of qx.bom.Event methods to be attached to native event objects
     * @internal
     */
    FORWARD_METHODS : ["getTarget", "getRelatedTarget"],
    /**
     * List of qx.module.event.Native methods to be attached to native event objects
     * @internal
     */
    BIND_METHODS : ["preventDefault", "stopPropagation", "getType"],
    /**
     * Prevent the native default behavior of the event.
     */
    preventDefault : function(){

      try{

        // this allows us to prevent some key press events in IE.
        // See bug #1049
        this.keyCode = 0;
      } catch(ex) {
      };
      this.returnValue = false;
    },
    /**
     * Stops the event's propagation to the element's parent
     */
    stopPropagation : function(){

      this.cancelBubble = true;
    },
    /**
     * Returns the event's type
     *
     * @return {String} event type
     */
    getType : function(){

      return this._type || this.type;
    },
    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element){

      if(!event){

        return event;
      };
      var fwdMethods = qx.module.event.Native.FORWARD_METHODS;
      for(var i = 0,l = fwdMethods.length;i < l;i++){

        event[fwdMethods[i]] = qx.lang.Function.curry(qx.bom.Event[fwdMethods[i]], event);
      };
      var bindMethods = qx.module.event.Native.BIND_METHODS;
      for(var i = 0,l = bindMethods.length;i < l;i++){

        if(typeof event[bindMethods[i]] != "function"){

          event[bindMethods[i]] = qx.module.event.Native[bindMethods[i]].bind(event);
        };
      };
      event.getCurrentTarget = function(){

        return event.currentTarget || element;
      };
      return event;
    }
  },
  defer : function(statics){

    q.$registerEventNormalization(statics.TYPES, statics.normalize);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/* ************************************************************************

#require(qx.module.Css)

************************************************************************ */
/**
 * Cross browser animation layer. It uses feature detection to check if CSS
 * animations are available and ready to use. If not, a JavaScript-based
 * fallback will be used.
 */
qx.Bootstrap.define("qx.module.Animation", {
  events : {
    /**
     * Fired when an animation has ended.
     */
    "animationEnd" : undefined
  },
  statics : {
    /**
     * Internal initializer to make sure we always have a plain array
     * for storing animation handles.
     * @internal
     */
    $init : function(){

      this.__animationHandles = [];
    },
    /**
     * Animation description used in {@link #fadeOut}.
     */
    _fadeOut : {
      duration : 700,
      timing : "ease-out",
      keep : 100,
      keyFrames : {
        '0' : {
          opacity : 1
        },
        '100' : {
          opacity : 0,
          display : "none"
        }
      }
    },
    /**
     * Animation description used in {@link #fadeIn}.
     */
    _fadeIn : {
      duration : 700,
      timing : "ease-in",
      keep : 100,
      keyFrames : {
        '0' : {
          opacity : 0
        },
        '100' : {
          opacity : 1
        }
      }
    },
    /**
     * Starts the animation with the given description.
     * The description should be a map, which could look like this:
     *
     * <pre class="javascript">
     * {
     *   "duration": 1000,
     *   "keep": 100,
     *   "keyFrames": {
     *     0 : {"opacity": 1, "scale": 1},
     *     100 : {"opacity": 0, "scale": 0}
     *   },
     *   "origin": "50% 50%",
     *   "repeat": 1,
     *   "timing": "ease-out",
     *   "alternate": false,
     *   "reverse": false
     * }
     * </pre>
     *
     * *duration* is the time in milliseconds one animation cycle should take.
     *
     * *keep* is the key frame to apply at the end of the animation. (optional)
     *
     * *keyFrames* is a map of separate frames. Each frame is defined by a
     *   number which is the percentage value of time in the animation. The value
     *   is a map itself which holds css properties or transforms
     *   (Transforms only for CSS Animations).
     *
     * *origin* maps to the transform origin {@link qx.bom.element.Transform#setOrigin}
     *   (Only for CSS animations).
     *
     * *repeat* is the amount of time the animation should be run in
     *   sequence. You can also use "infinite".
     *
     * *timing* takes one of these predefined values:
     *   <code>ease</code> | <code>linear</code> | <code>ease-in</code>
     *   | <code>ease-out</code> | <code>ease-in-out</code> |
     *   <code>cubic-bezier(&lt;number&gt;, &lt;number&gt;, &lt;number&gt;, &lt;number&gt;)</code>
     *   (cubic-bezier only available for CSS animations)
     *
     * *alternate* defines if every other animation should be run in reverse order.
     *
     * @attach {q}
     * @param desc {Map} The animation's description.
     * @param duration {Number?} The duration in milliseconds of the animation,
     *   which will override the duration given in the description.
     * @return {q} The collection for chaining.
     */
    animate : function(desc, duration){

      if(this.__animationHandles.length > 0){

        throw new Error("Only one animation at a time.");
      };
      for(var i = 0;i < this.length;i++){

        var handle = qx.bom.element.Animation.animate(this[i], desc, duration);
        var self = this;
        handle.on("end", function(){

          var handles = self.__animationHandles;
          handles.splice(self.indexOf(handle), 1);
          if(handles.length == 0){

            self.emit("animationEnd");
          };
        }, handle);
        this.__animationHandles.push(handle);
      };
      return this;
    },
    /**
     * Starts an animation in reversed order. For further details, take a look at
     * the {@link #animate} method.
     * @attach {q}
     * @param desc {Map} The animation's description.
     * @param duration {Number?} The duration in milliseconds of the animation,
     *   which will override the duration given in the description.
     * @return {q} The collection for chaining.
     */
    animateReverse : function(desc, duration){

      if(this.__animationHandles.length > 0){

        throw new Error("Only one animation at a time.");
      };
      for(var i = 0;i < this.length;i++){

        var handle = qx.bom.element.Animation.animateReverse(this[i], desc, duration);
        var self = this;
        handle.on("end", function(){

          var handles = self.__animationHandles;
          handles.splice(self.indexOf(handle), 1);
          if(handles.length == 0){

            self.emit("animationEnd");
          };
        }, handle);
        this.__animationHandles.push(handle);
      };
      return this;
    },
    /**
     * Manipulates the play state of the animation.
     * This can be used to continue an animation when paused.
     * @attach {q}
     * @return {q} The collection for chaining.
     */
    play : function(){

      for(var i = 0;i < this.__animationHandles.length;i++){

        this.__animationHandles[i].play();
      };
      return this;
    },
    /**
     * Manipulates the play state of the animation.
     * This can be used to pause an animation when running.
     * @attach {q}
     * @return {q} The collection for chaining.
     */
    pause : function(){

      for(var i = 0;i < this.__animationHandles.length;i++){

        this.__animationHandles[i].pause();
      };
      return this;
    },
    /**
     * Stops a running animation.
     * @attach {q}
     * @return {q} The collection for chaining.
     */
    stop : function(){

      for(var i = 0;i < this.__animationHandles.length;i++){

        this.__animationHandles[i].stop();
      };
      this.__animationHandles = [];
      return this;
    },
    /**
     * Returns whether an animation is running or not.
     * @attach {q}
     * @return {Boolean} <code>true</code>, if an animation is running.
     */
    isPlaying : function(){

      for(var i = 0;i < this.__animationHandles.length;i++){

        if(this.__animationHandles[i].isPlaying()){

          return true;
        };
      };
      return false;
    },
    /**
     * Returns whether an animation has ended or not.
     * @attach {q}
     * @return {Boolean} <code>true</code>, if an animation has ended.
     */
    isEnded : function(){

      for(var i = 0;i < this.__animationHandles.length;i++){

        if(!this.__animationHandles[i].isEnded()){

          return false;
        };
      };
      return true;
    },
    /**
     * Fades in all elements in the collection.
     * @attach {q}
     * @param duration {Number?} The duration in milliseconds.
     * @return {q} The collection for chaining.
     */
    fadeIn : function(duration){

      // remove 'display: none' style
      this.setStyle("display", "");
      return this.animate(qx.module.Animation._fadeIn, duration);
    },
    /**
     * Fades out all elements in the collection.
     * @attach {q}
     * @param duration {Number?} The duration in milliseconds.
     * @return {q} The collection for chaining.
     */
    fadeOut : function(duration){

      return this.animate(qx.module.Animation._fadeOut, duration);
    }
  },
  defer : function(statics){

    q.$attach({
      "animate" : statics.animate,
      "animateReverse" : statics.animateReverse,
      "fadeIn" : statics.fadeIn,
      "fadeOut" : statics.fadeOut,
      "play" : statics.play,
      "pause" : statics.pause,
      "stop" : statics.stop,
      "isEnded" : statics.isEnded,
      "isPlaying" : statics.isPlaying
    });
    q.$attachInit(statics.$init);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * Wrapper for {@link qx.bom.element.AnimationCss} and
 * {@link qx.bom.element.AnimationJs}. It offers the pubilc API and decides using
 * feature checks either to use CSS animations or JS animations.
 *
 * If you use this class, the restrictions of the JavaScript animations apply.
 * This means that you can not use transforms and custom bezier timing functions.
 */
qx.Bootstrap.define("qx.bom.element.Animation", {
  statics : {
    /**
     * This function takes care of the feature check and starts the animation.
     * It takes a DOM element to apply the animation to, and a description.
     * The description should be a map, which could look like this:
     *
     * <pre class="javascript">
     * {
     *   "duration": 1000,
     *   "keep": 100,
     *   "keyFrames": {
     *     0 : {"opacity": 1, "scale": 1},
     *     100 : {"opacity": 0, "scale": 0}
     *   },
     *   "origin": "50% 50%",
     *   "repeat": 1,
     *   "timing": "ease-out",
     *   "alternate": false,
     *   "reverse": false
     * }
     * </pre>
     *
     * *duration* is the time in milliseconds one animation cycle should take.
     *
     * *keep* is the key frame to apply at the end of the animation. (optional)
     *   Keep in mind that the keep key is reversed in case you use an reverse
     *   animation or set the alternate key and a even repeat count.
     *
     * *keyFrames* is a map of separate frames. Each frame is defined by a
     *   number which is the percentage value of time in the animation. The value
     *   is a map itself which holds css properties or transforms
     *   {@link qx.bom.element.Transform} (Transforms only for CSS Animations).
     *
     * *origin* maps to the transform origin {@link qx.bom.element.Transform#setOrigin}
     *   (Only for CSS animations).
     *
     * *repeat* is the amount of time the animation should be run in
     *   sequence. You can also use "infinite".
     *
     * *timing* takes one of the predefined value:
     *   <code>ease</code> | <code>linear</code> | <code>ease-in</code>
     *   | <code>ease-out</code> | <code>ease-in-out</code> |
     *   <code>cubic-bezier(&lt;number&gt;, &lt;number&gt;, &lt;number&gt;, &lt;number&gt;)</code>
     *   (cubic-bezier only available for CSS animations)
     *
     * *alternate* defines if every other animation should be run in reverse order.
     *
     * @param el {Element} The element to animate.
     * @param desc {Map} The animations description.
     * @param duration {Integer?} The duration in milliseconds of the animation
     *   which will override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} AnimationHandle instance to control
     *   the animation.
     */
    animate : function(el, desc, duration){

      if(qx.core.Environment.get("css.animation")){

        return qx.bom.element.AnimationCss.animate(el, desc, duration);
      } else {

        return qx.bom.element.AnimationJs.animate(el, desc, duration);
      };
    },
    /**
     * Starts an animation in reversed order. For further details, take a look at
     * the {@link #animate} method.
     * @param el {Element} The element to animate.
     * @param desc {Map} The animations description.
     * @param duration {Integer?} The duration in milliseconds of the animation
     *   which will override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} AnimationHandle instance to control
     *   the animation.
     */
    animateReverse : function(el, desc, duration){

      if(qx.core.Environment.get("css.animation")){

        return qx.bom.element.AnimationCss.animateReverse(el, desc, duration);
      } else {

        return qx.bom.element.AnimationJs.animateReverse(el, desc, duration);
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Responsible for checking all relevant animation properties.
 *
 * Spec: http://www.w3.org/TR/css3-animations/
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.CssAnimation", {
  statics : {
    /**
     * Main check method which returns an object if CSS animations are
     * supported. This object contains all necessary keys to work with CSS
     * animations.
     * <ul>
     *  <li><code>name</code> The name of the css animation style</li>
     *  <li><code>play-state</code> The name of the play-state style</li>
     *  <li><code>end-event</code> The name of the end event</li>
     *  <li><code>keyframes</code> The name of the keyframes selector.</li>
     * </ul>
     *
     * @internal
     * @return {Object|null} The described object or null, if animations are
     *   not supported.
     */
    getSupport : function(){

      var name = qx.bom.client.CssAnimation.getName();
      if(name != null){

        return {
          "name" : name,
          "play-state" : qx.bom.client.CssAnimation.getPlayState(),
          "end-event" : qx.bom.client.CssAnimation.getAnimationEnd(),
          "keyframes" : qx.bom.client.CssAnimation.getKeyFrames()
        };
      };
      return null;
    },
    /**
     * Checks for the 'animation-play-state' CSS style.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getPlayState : function(){

      return qx.bom.Style.getPropertyName("AnimationPlayState");
    },
    /**
     * Checks for the style name used for animations.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getName : function(){

      return qx.bom.Style.getPropertyName("animation");
    },
    /**
     * Checks for the event name of animation end.
     * @internal
     * @return {String} The name of the event.
     */
    getAnimationEnd : function(){

      var mapping = {
        "msAnimation" : "MSAnimationEnd",
        "WebkitAnimation" : "webkitAnimationEnd",
        "MozAnimation" : "animationend",
        "OAnimation" : "oAnimationEnd",
        "animation" : "animationend"
      };
      return mapping[this.getName()];
    },
    /**
     * Checks what selector should be used to add keyframes to stylesheets.
     * @internal
     * @return {String|null} The name of the selector or null, if the selector
     *   is not supported.
     */
    getKeyFrames : function(){

      var prefixes = qx.bom.Style.VENDOR_PREFIXES;
      var keyFrames = [];
      for(var i = 0;i < prefixes.length;i++){

        var key = "@" + qx.lang.String.hyphenate(prefixes[i]) + "-keyframes";
        // special treatment for IE10
        if(key == "@ms-keyframes"){

          key = "@-ms-keyframes";
        };
        keyFrames.push(key);
      };
      keyFrames.unshift("@keyframes");
      var sheet = qx.bom.Stylesheet.createElement();
      for(var i = 0;i < keyFrames.length;i++){

        try{

          qx.bom.Stylesheet.addRule(sheet, keyFrames[i] + " name", "");
          return keyFrames[i];
        } catch(e) {
        };
      };
      return null;
    }
  },
  defer : function(statics){

    qx.core.Environment.add("css.animation", statics.getSupport);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * This class is responsible for applying CSS3 animations to plain DOM elements.
 *
 * The implementation is mostly a cross-browser wrapper for applying the
 * animations, including transforms. If the browser does not support
 * CSS animations, but you have set a keep frame, the keep frame will be applied
 * immediately, thus making the animations optional.
 *
 * The API aligns closely to the spec wherever possible.
 *
 * http://www.w3.org/TR/css3-animations/
 *
 * {@link qx.bom.element.Animation} is the class, which takes care of the
 * feature detection for CSS animations and decides which implementation
 * (CSS or JavaScript) should be used. Most likely, this implementation should
 * be the one to use.
 */
qx.Bootstrap.define("qx.bom.element.AnimationCss", {
  statics : {
    // initialization
    __sheet : null,
    __rulePrefix : "Anni",
    __id : 0,
    /** Static map of rules */
    __rules : {
    },
    /** The used keys for transforms. */
    __transitionKeys : {
      "scale" : true,
      "rotate" : true,
      "skew" : true,
      "translate" : true
    },
    /** Map of cross browser CSS keys. */
    __cssAnimationKeys : qx.core.Environment.get("css.animation"),
    /**
     * This is the main function to start the animation in reverse mode.
     * For further details, take a look at the documentation of the wrapper
     * {@link qx.bom.element.Animation}.
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    animateReverse : function(el, desc, duration){

      return this._animate(el, desc, duration, true);
    },
    /**
     * This is the main function to start the animation. For further details,
     * take a look at the documentation of the wrapper
     * {@link qx.bom.element.Animation}.
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    animate : function(el, desc, duration){

      return this._animate(el, desc, duration, false);
    },
    /**
     * Internal method to start an animation either reverse or not.
     * {@link qx.bom.element.Animation}.
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @param reverse {Boolean} <code>true</code>, if the animation should be
     *   reversed.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    _animate : function(el, desc, duration, reverse){

      this.__normalizeDesc(desc);
      // @deprecated since 2.0
      if(desc.hasOwnProperty("reverse")){

        reverse = desc.reverse;
        {
        };
      };
      {
      };
      // reverse the keep property if the animation is reverse as well
      var keep = desc.keep;
      if(keep != null && (reverse || (desc.alternate && desc.repeat % 2 == 0))){

        keep = 100 - keep;
      };
      if(!this.__sheet){

        this.__sheet = qx.bom.Stylesheet.createElement();
      };
      var keyFrames = desc.keyFrames;
      if(duration == undefined){

        duration = desc.duration;
      };
      // if animations are supported
      if(this.__cssAnimationKeys != null){

        var name = this.__addKeyFrames(keyFrames, reverse);
        var style = name + " " + duration + "ms " + desc.repeat + " " + desc.timing + " " + (desc.alternate ? "alternate" : "");
        var eventName = this.__cssAnimationKeys["end-event"];
        qx.bom.Event.addNativeListener(el, eventName, this.__onAnimationEnd);
        el.style[qx.lang.String.camelCase(this.__cssAnimationKeys["name"])] = style;
        // use the fill mode property if available and suitable
        if(keep && keep == 100 && this.__cssAnimationKeys["fill-mode"]){

          el.style[this.__cssAnimationKeys["fill-mode"]] = "forwards";
        };
      };
      var animation = new qx.bom.element.AnimationHandle();
      animation.desc = desc;
      animation.el = el;
      animation.keep = keep;
      el.$$animation = animation;
      // additional transform keys
      if(desc.origin != null){

        qx.bom.element.Transform.setOrigin(el, desc.origin);
      };
      // fallback for browsers not supporting animations
      if(this.__cssAnimationKeys == null){

        window.setTimeout(function(){

          qx.bom.element.AnimationCss.__onAnimationEnd({
            target : el
          });
        }, 0);
      };
      return animation;
    },
    /**
     * Handler for the animation end.
     * @param e {Event} The native event from the browser.
     */
    __onAnimationEnd : function(e){

      var el = e.target;
      var animation = el.$$animation;
      // ignore events when already cleaned up
      if(!animation){

        return;
      };
      var desc = animation.desc;
      if(qx.bom.element.AnimationCss.__cssAnimationKeys != null){

        // reset the styling
        var key = qx.lang.String.camelCase(qx.bom.element.AnimationCss.__cssAnimationKeys["name"]);
        el.style[key] = "";
        qx.bom.Event.removeNativeListener(el, qx.bom.element.AnimationCss.__cssAnimationKeys["name"], qx.bom.element.AnimationCss.__onAnimationEnd);
      };
      if(desc.origin != null){

        qx.bom.element.Transform.setOrigin(el, "");
      };
      qx.bom.element.AnimationCss.__keepFrame(el, desc.keyFrames[animation.keep]);
      el.$$animation = null;
      animation.el = null;
      animation.ended = true;
      animation.emit("end", el);
    },
    /**
     * Helper method which takes an element and a key frame description and
     * applies the properties defined in the given frame to the element. This
     * method is used to keep the state of the animation.
     * @param el {Element} The element to apply the frame to.
     * @param endFrame {Map} The description of the end frame, which is basically
     *   a map containing CSS properties and values including transforms.
     */
    __keepFrame : function(el, endFrame){

      // keep the element at this animation step
      var transforms;
      for(var style in endFrame){

        if(style in qx.bom.element.AnimationCss.__transitionKeys){

          if(!transforms){

            transforms = {
            };
          };
          transforms[style] = endFrame[style];
        } else {

          el.style[qx.lang.String.camelCase(style)] = endFrame[style];
        };
      };
      // transform keeping
      if(transforms){

        qx.bom.element.Transform.transform(el, transforms);
      };
    },
    /**
     * Preprocessing of the description to make sure every necessary key is
     * set to its default.
     * @param desc {Map} The description of the animation.
     */
    __normalizeDesc : function(desc){

      if(!desc.hasOwnProperty("alternate")){

        desc.alternate = false;
      };
      if(!desc.hasOwnProperty("keep")){

        desc.keep = null;
      };
      if(!desc.hasOwnProperty("repeat")){

        desc.repeat = 1;
      };
      if(!desc.hasOwnProperty("timing")){

        desc.timing = "linear";
      };
      if(!desc.hasOwnProperty("origin")){

        desc.origin = null;
      };
    },
    /**
     * Debugging helper to validate the description.
     * @signature function(desc)
     * @param desc {Map} The description of the animation.
     */
    __validateDesc : null,
    /**
     * Helper to add the given frames to an internal CSS stylesheet. It parses
     * the description and adds the key frames to the sheet.
     * @param frames {Map} A map of key frames that describe the animation.
     * @param reverse {Boolean} <code>true</code>, if the key frames should
     *   be added in reverse order.
     */
    __addKeyFrames : function(frames, reverse){

      var rule = "";
      // for each key frame
      for(var position in frames){

        rule += (reverse ? -(position - 100) : position) + "% {";
        var frame = frames[position];
        var transforms;
        // each style
        for(var style in frame){

          if(style in this.__transitionKeys){

            if(!transforms){

              transforms = {
              };
            };
            transforms[style] = frame[style];
          } else {

            rule += style + ":" + frame[style] + ";";
          };
        };
        // transform handling
        if(transforms){

          rule += qx.bom.element.Transform.getCss(transforms);
        };
        rule += "} ";
      };
      // cached shorthand
      if(this.__rules[rule]){

        return this.__rules[rule];
      };
      var name = this.__rulePrefix + this.__id++;
      var selector = this.__cssAnimationKeys["keyframes"] + " " + name;
      qx.bom.Stylesheet.addRule(this.__sheet, selector, rule);
      this.__rules[rule] = name;
      return name;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/* ************************************************************************

#ignore(qx.bom.element.AnimationJs)

************************************************************************ */
/**
 * This is a simple handle, which will be returned when an animation is
 * started using the {@link qx.bom.element.Animation#animate} method. It
 * basically controls the animation.
 */
qx.Bootstrap.define("qx.bom.element.AnimationHandle", {
  extend : qx.event.Emitter,
  construct : function(){

    var css = qx.core.Environment.get("css.animation");
    this.__playState = css && css["play-state"];
    this.__playing = true;
  },
  events : {
    /**
     * Fired when the animation started via {@link qx.bom.element.Animation} has
     * ended.
     */
    "end" : "Element"
  },
  members : {
    __playState : null,
    __playing : false,
    __ended : false,
    /**
     * Accessor of the playing state.
     * @return {Boolean} <code>true</code>, if the animations is playing.
     */
    isPlaying : function(){

      return this.__playing;
    },
    /**
     * Accessor of the ended state.
     * @return {Boolean} <code>true</code>, if the animations has ended.
     */
    isEnded : function(){

      return this.__ended;
    },
    /**
     * Pauses the animation, if running. If not running, it will be ignored.
     */
    pause : function(){

      if(this.el){

        this.el.style[this.__playState] = "paused";
        this.el.$$animation.__playing = false;
        // in case the animation is based on JS
        if(this.animationId && qx.bom.element.AnimationJs){

          qx.bom.element.AnimationJs.pause(this);
        };
      };
    },
    /**
     * Resumes an animation. This does not start the animation once it has ended.
     */
    play : function(){

      if(this.el){

        this.el.style[this.__playState] = "running";
        this.el.$$animation.__playing = true;
        // in case the animation is based on JS
        if(this.i != undefined && qx.bom.element.AnimationJs){

          qx.bom.element.AnimationJs.play(this);
        };
      };
    },
    /**
     * Stops the animation if running.
     */
    stop : function(){

      if(this.el && qx.core.Environment.get("css.animation")){

        this.el.style[this.__playState] = "";
        this.el.style[qx.core.Environment.get("css.animation").name] = "";
        this.el.$$animation.__playing = false;
        this.el.$$animation.__ended = true;
      };
      // in case the animation is based on JS
      if(qx.bom.element.AnimationJs){

        qx.bom.element.AnimationJs.stop(this);
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/* ************************************************************************

#ignore(qx.bom.element.Style)

************************************************************************ */
/**
 * This class offers the same API as the CSS3 animation layer in
 * {@link qx.bom.element.AnimationCss} but uses JavaScript to fake the behavior.
 *
 * {@link qx.bom.element.Animation} is the class, which takes care of the
 * feature detection for CSS animations and decides which implementation
 * (CSS or JavaScript) should be used. Most likely, this implementation should
 * be the one to use.
 */
qx.Bootstrap.define("qx.bom.element.AnimationJs", {
  statics : {
    /**
     * The maximal time a frame should take.
     */
    __maxStepTime : 30,
    /**
     * The supported CSS units.
     */
    __units : ["%", "in", "cm", "mm", "em", "ex", "pt", "pc", "px"],
    /**
     * This is the main function to start the animation. For further details,
     * take a look at the documentation of the wrapper
     * {@link qx.bom.element.Animation}.
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    animate : function(el, desc, duration){

      return this._animate(el, desc, duration, false);
    },
    /**
     * This is the main function to start the animation in reversed mode.
     * For further details, take a look at the documentation of the wrapper
     * {@link qx.bom.element.Animation}.
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    animateReverse : function(el, desc, duration){

      return this._animate(el, desc, duration, true);
    },
    /**
     * Helper to start the animation, either in reversed order or not.
     *
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @param reverse {Boolean} <code>true</code>, if the animation should be
     *   reversed.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    _animate : function(el, desc, duration, reverse){

      // stop if an animation is already running
      if(el.$$animation){

        return;
      };
      // @deprecated since 2.0
      if(desc.hasOwnProperty("reverse")){

        reverse = desc.reverse;
        {
        };
      };
      if(duration == undefined){

        duration = desc.duration;
      };
      var keyFrames = desc.keyFrames;
      var keys = this.__getOrderedKeys(keyFrames);
      var stepTime = this.__getStepTime(duration, keys);
      var steps = parseInt(duration / stepTime, 10);
      this.__normalizeKeyFrames(keyFrames, el);
      var delta = this.__calculateDelta(steps, stepTime, keys, keyFrames, duration, desc.timing);
      var handle = new qx.bom.element.AnimationHandle();
      if(reverse){

        delta.reverse();
        handle.reverse = true;
      };
      handle.desc = desc;
      handle.el = el;
      handle.delta = delta;
      handle.stepTime = stepTime;
      handle.steps = steps;
      el.$$animation = handle;
      handle.i = 0;
      handle.initValues = {
      };
      handle.repeatSteps = this.__applyRepeat(steps, desc.repeat);
      return this.play(handle);
    },
    /**
     * Try to normalize the keyFrames by adding the default / set values of the
     * element.
     * @param keyFrames {Map} The map of key frames.
     * @param el {Element} The element to animate.
     */
    __normalizeKeyFrames : function(keyFrames, el){

      // collect all possible keys and its units
      var units = {
      };
      for(var percent in keyFrames){

        for(var name in keyFrames[percent]){

          if(units[name] == undefined){

            var item = keyFrames[percent][name];
            if(typeof item == "string"){

              units[name] = item.substring((parseInt(item, 10) + "").length, item.length);
            } else {

              units[name] = "";
            };
          };
        };
      };
      // add all missing keys
      for(var percent in keyFrames){

        var frame = keyFrames[percent];
        for(var name in units){

          if(frame[name] == undefined){

            // get the computed style if possible
            if(window.getComputedStyle){

              frame[name] = getComputedStyle(el, null)[name];
            } else {

              frame[name] = el.style[name];
            };
            // if its a unit we know, set 0 as fallback
            if(frame[name] == "" && this.__units.indexOf(units[name]) != -1){

              frame[name] = "0" + units[name];
            };
          };
        };
      };
    },
    /**
     * Precalculation of the delta which will be applied during the animation.
     * The whole deltas will be calculated prior to the animation and stored
     * in a single array. This method takes care of that calculation.
     *
     * @param steps {Integer} The amount of steps to take to the end of the
     *   animation.
     * @param stepTime {Integer} The amount of milliseconds each step takes.
     * @param keys {Array} Ordered list of keys in the key frames map.
     * @param keyFrames {Map} The map of key frames.
     * @param duration {Integer} Time in milliseconds the animation should take.
     * @param timing {String} The given timing function.
     * @return {Array} An array containing the animation deltas.
     */
    __calculateDelta : function(steps, stepTime, keys, keyFrames, duration, timing){

      var delta = new Array(steps);
      var keyIndex = 1;
      delta[0] = keyFrames[0];
      var last = keyFrames[0];
      var next = keyFrames[keys[keyIndex]];
      // for every step
      for(var i = 1;i < delta.length;i++){

        // switch key frames if we crossed a percent border
        if(i * stepTime / duration * 100 > keys[keyIndex]){

          last = next;
          keyIndex++;
          next = keyFrames[keys[keyIndex]];
        };
        delta[i] = {
        };
        // for every property
        for(var name in next){

          var nItem = next[name] + "";
          // color values
          if(nItem.charAt(0) == "#"){

            // get the two values from the frames as RGB arrays
            var value0 = qx.util.ColorUtil.cssStringToRgb(last[name]);
            var value1 = qx.util.ColorUtil.cssStringToRgb(nItem);
            var stepValue = [];
            // calculate every color chanel
            for(var j = 0;j < value0.length;j++){

              var range = value0[j] - value1[j];
              stepValue[j] = parseInt(value0[j] - range * this.__calculateTiming(timing, i / steps), 10);
            };
            delta[i][name] = qx.util.ColorUtil.rgbToHexString(stepValue);
          } else if(!isNaN(parseInt(nItem, 10))){

            var unit = nItem.substring((parseInt(nItem, 10) + "").length, nItem.length);
            var range = parseFloat(nItem) - parseFloat(last[name]);
            delta[i][name] = (parseFloat(last[name]) + range * this.__calculateTiming(timing, i / steps)) + unit;
          } else {

            delta[i][name] = last[name] + "";
          };
        };
      };
      // make sure the last key frame is right
      delta[delta.length - 1] = keyFrames[100];
      return delta;
    },
    /**
     * Internal helper for the {@link qx.bom.element.AnimationHandle} to play
     * the animation.
     * @internal
     * @param handle {qx.bom.element.AnimationHandle} The hand which
     *   represents the animation.
     * @return {qx.bom.element.AnimationHandle} The handle for chaining.
     */
    play : function(handle){

      var id = window.setInterval(function(){

        handle.repeatSteps--;
        var values = handle.delta[handle.i % handle.steps];
        // save the init values
        if(handle.i == 0){

          for(var name in values){

            if(handle.initValues[name] == undefined){

              if(qx.bom.element.Style){

                handle.initValues[name] = qx.bom.element.Style.get(handle.el, qx.lang.String.camelCase(name));
              } else {

                handle.initValues[name] = handle.el.style[qx.lang.String.camelCase(name)];
              };
            };
          };
        };
        qx.bom.element.AnimationJs.__applyStyles(handle.el, values);
        handle.i++;
        // iteration condition
        if(handle.i % handle.steps == 0){

          if(handle.desc.alternate){

            handle.delta.reverse();
          };
        };
        // end condition
        if(handle.repeatSteps < 0){

          qx.bom.element.AnimationJs.stop(handle);
        };
      }, handle.stepTime);
      handle.animationId = id;
      return handle;
    },
    /**
     * Internal helper for the {@link qx.bom.element.AnimationHandle} to pause
     * the animation.
     * @internal
     * @param handle {qx.bom.element.AnimationHandle} The hand which
     *   represents the animation.
     * @return {qx.bom.element.AnimationHandle} The handle for chaining.
     */
    pause : function(handle){

      // stop the interval
      window.clearInterval(handle.animationId);
      handle.animationId = null;
    },
    /**
     * Internal helper for the {@link qx.bom.element.AnimationHandle} to stop
     * the animation.
     * @internal
     * @param handle {qx.bom.element.AnimationHandle} The hand which
     *   represents the animation.
     * @return {qx.bom.element.AnimationHandle} The handle for chaining.
     */
    stop : function(handle){

      var desc = handle.desc;
      var el = handle.el;
      var initValues = handle.initValues;
      if(handle.animationId){

        window.clearInterval(handle.animationId);
      };
      // check if animation is already stopped
      if(el == undefined){

        return;
      };
      // if we should keep a frame
      var keep = desc.keep;
      if(keep != undefined){

        if(handle.reverse || (desc.alternate && desc.repeat && desc.repeat % 2 == 0)){

          keep = 100 - keep;
        };
        this.__applyStyles(el, desc.keyFrames[keep]);
      } else {

        this.__applyStyles(el, initValues);
      };
      el.$$animation = null;
      handle.el = null;
      handle.ended = true;
      handle.animationId = null;
      handle.emit("end", el);
    },
    /**
     * Calculation of the predefined timing functions. Approximations of the real
     * bezier curves has ben used for easier calculation. This is good and close
     * enough for the predefined functions like <code>ease</code> or
     * <code>linear</code>.
     *
     * @param func {String} The defined timing function. One of the following values:
     *   <code>"ease-in"</code>, <code>"ease-out"</code>, <code>"linear"</code>,
     *   <code>"ease-in-out"</code>, <code>"ease"</code>.
     * @param x {Integer} The percent value of the function.
     */
    __calculateTiming : function(func, x){

      if(func == "ease-in"){

        var a = [3.1223e-7, 0.0757, 1.2646, -0.167, -0.4387, 0.2654];
      } else if(func == "ease-out"){

        var a = [-7.0198e-8, 1.652, -0.551, -0.0458, 0.1255, -0.1807];
      } else if(func == "linear"){

        return x;
      } else if(func == "ease-in-out"){

        var a = [2.482e-7, -0.2289, 3.3466, -1.0857, -1.7354, 0.7034];
      } else {

        // default is 'ease'
        var a = [-0.0021, 0.2472, 9.8054, -21.6869, 17.7611, -5.1226];
      };;;
      // A 6th grade polynom has been used to approximation function
      // of the original bezier curves  described in the transition spec
      // http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
      // (the same is used for animations as well)
      var y = 0;
      for(var i = 0;i < a.length;i++){

        y += a[i] * Math.pow(x, i);
      };
      return y;
    },
    /**
     * Takes care of the repeat key of the description.
     * @param steps {Integer} The number of steps one iteration would take.
     * @param repeat {Integer|String} It can be either a number how often the
     * animation should be repeated or the string 'infinite'.
     * @return {Integer} The number of steps to animate.
     */
    __applyRepeat : function(steps, repeat){

      if(repeat == undefined){

        return steps;
      };
      if(repeat == "infinite"){

        return Number.MAX_VALUE;
      };
      return steps * repeat;
    },
    /**
     * Central method to apply css styles.
     * @param el {Element} The DOM element to apply the styles.
     * @param styles {Map} A map containing styles and values.
     */
    __applyStyles : function(el, styles){

      for(var key in styles){

        // ignore undefined values (might be a bad detection)
        if(styles[key] === undefined){

          continue;
        };
        var name = qx.lang.String.camelCase(key);
        if(qx.bom.element.Style){

          qx.bom.element.Style.set(el, name, styles[key]);
        } else {

          el.style[name] = styles[key];
        };
      };
    },
    /**
     * Dynamic calculation of the steps time considering a max step time.
     * @param duration {Number} The duration of the animation.
     * @param keys {Array} An array containing the orderd set of key frame keys.
     * @return {Integer} The best suited step time.
     */
    __getStepTime : function(duration, keys){

      // get min difference
      var minDiff = 100;
      for(var i = 0;i < keys.length - 1;i++){

        minDiff = Math.min(minDiff, keys[i + 1] - keys[i]);
      };
      var stepTime = duration * minDiff / 100;
      while(stepTime > this.__maxStepTime){

        stepTime = stepTime / 2;
      };
      return Math.round(stepTime);
    },
    /**
     * Helper which returns the orderd keys of the key frame map.
     * @param keyFrames {Map} The map of key frames.
     * @return {Array} An orderd list of kyes.
     */
    __getOrderedKeys : function(keyFrames){

      var keys = qx.Bootstrap.getKeys(keyFrames);
      for(var i = 0;i < keys.length;i++){

        keys[i] = parseInt(keys[i], 10);
      };
      keys.sort(function(a, b){

        return a - b;
      });
      return keys;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Christian Hagendorn (cs)

************************************************************************ */
/* ************************************************************************

#ignore(qx.theme.*)
#ignore(qx.theme)
#ignore(qx.Class)

************************************************************************ */
/**
 * Methods to convert colors between different color spaces.
 */
qx.Bootstrap.define("qx.util.ColorUtil", {
  statics : {
    /**
     * Regular expressions for color strings
     */
    REGEXP : {
      hex3 : /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6 : /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      rgb : /^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,
      rgba : /^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/
    },
    /**
     * CSS3 system color names.
     */
    SYSTEM : {
      activeborder : true,
      activecaption : true,
      appworkspace : true,
      background : true,
      buttonface : true,
      buttonhighlight : true,
      buttonshadow : true,
      buttontext : true,
      captiontext : true,
      graytext : true,
      highlight : true,
      highlighttext : true,
      inactiveborder : true,
      inactivecaption : true,
      inactivecaptiontext : true,
      infobackground : true,
      infotext : true,
      menu : true,
      menutext : true,
      scrollbar : true,
      threeddarkshadow : true,
      threedface : true,
      threedhighlight : true,
      threedlightshadow : true,
      threedshadow : true,
      window : true,
      windowframe : true,
      windowtext : true
    },
    /**
     * Named colors, only the 16 basic colors plus the following ones:
     * transparent, grey, magenta, orange and brown
     */
    NAMED : {
      black : [0, 0, 0],
      silver : [192, 192, 192],
      gray : [128, 128, 128],
      white : [255, 255, 255],
      maroon : [128, 0, 0],
      red : [255, 0, 0],
      purple : [128, 0, 128],
      fuchsia : [255, 0, 255],
      green : [0, 128, 0],
      lime : [0, 255, 0],
      olive : [128, 128, 0],
      yellow : [255, 255, 0],
      navy : [0, 0, 128],
      blue : [0, 0, 255],
      teal : [0, 128, 128],
      aqua : [0, 255, 255],
      // Additional values
      transparent : [-1, -1, -1],
      magenta : [255, 0, 255],
      // alias for fuchsia
      orange : [255, 165, 0],
      brown : [165, 42, 42]
    },
    /**
     * Whether the incoming value is a named color.
     *
     * @param value {String} the color value to test
     * @return {Boolean} true if the color is a named color
     */
    isNamedColor : function(value){

      return this.NAMED[value] !== undefined;
    },
    /**
     * Whether the incoming value is a system color.
     *
     * @param value {String} the color value to test
     * @return {Boolean} true if the color is a system color
     */
    isSystemColor : function(value){

      return this.SYSTEM[value] !== undefined;
    },
    /**
     * Whether the color theme manager is loaded. Generally
     * part of the GUI of qooxdoo.
     *
     * @return {Boolean} <code>true</code> when color theme support is ready.
     **/
    supportsThemes : function(){

      if(qx.Class){

        return qx.Class.isDefined("qx.theme.manager.Color");
      };
      return false;
    },
    /**
     * Whether the incoming value is a themed color.
     *
     * @param value {String} the color value to test
     * @return {Boolean} true if the color is a themed color
     */
    isThemedColor : function(value){

      if(!this.supportsThemes()){

        return false;
      };
      if(qx.theme && qx.theme.manager && qx.theme.manager.Color){

        return qx.theme.manager.Color.getInstance().isDynamic(value);
      };
      return false;
    },
    /**
     * Try to convert an incoming string to an RGB array.
     * Supports themed, named and system colors, but also RGB strings,
     * hex3 and hex6 values.
     *
     * @param str {String} any string
     * @return {Array} returns an array of red, green, blue on a successful transformation
     * @throws an error if the string could not be parsed
     */
    stringToRgb : function(str){

      if(this.supportsThemes() && this.isThemedColor(str)){

        var str = qx.theme.manager.Color.getInstance().resolveDynamic(str);
      };
      if(this.isNamedColor(str)){

        return this.NAMED[str];
      } else if(this.isSystemColor(str)){

        throw new Error("Could not convert system colors to RGB: " + str);
      } else if(this.isRgbString(str)){

        return this.__rgbStringToRgb();
      } else if(this.isHex3String(str)){

        return this.__hex3StringToRgb();
      } else if(this.isHex6String(str)){

        return this.__hex6StringToRgb();
      };;;;
      throw new Error("Could not parse color: " + str);
    },
    /**
     * Try to convert an incoming string to an RGB array.
     * Support named colors, RGB strings, hex3 and hex6 values.
     *
     * @param str {String} any string
     * @return {Array} returns an array of red, green, blue on a successful transformation
     * @throws an error if the string could not be parsed
     */
    cssStringToRgb : function(str){

      if(this.isNamedColor(str)){

        return this.NAMED[str];
      } else if(this.isSystemColor(str)){

        throw new Error("Could not convert system colors to RGB: " + str);
      } else if(this.isRgbString(str)){

        return this.__rgbStringToRgb();
      } else if(this.isRgbaString(str)){

        return this.__rgbaStringToRgb();
      } else if(this.isHex3String(str)){

        return this.__hex3StringToRgb();
      } else if(this.isHex6String(str)){

        return this.__hex6StringToRgb();
      };;;;;
      throw new Error("Could not parse color: " + str);
    },
    /**
     * Try to convert an incoming string to an RGB string, which can be used
     * for all color properties.
     * Supports themed, named and system colors, but also RGB strings,
     * hex3 and hex6 values.
     *
     * @param str {String} any string
     * @return {String} a RGB string
     * @throws an error if the string could not be parsed
     */
    stringToRgbString : function(str){

      return this.rgbToRgbString(this.stringToRgb(str));
    },
    /**
     * Converts a RGB array to an RGB string
     *
     * @param rgb {Array} an array with red, green and blue
     * @return {String} a RGB string
     */
    rgbToRgbString : function(rgb){

      return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    },
    /**
     * Converts a RGB array to an hex6 string
     *
     * @param rgb {Array} an array with red, green and blue
     * @return {String} a hex6 string (#xxxxxx)
     */
    rgbToHexString : function(rgb){

      return ("#" + qx.lang.String.pad(rgb[0].toString(16).toUpperCase(), 2) + qx.lang.String.pad(rgb[1].toString(16).toUpperCase(), 2) + qx.lang.String.pad(rgb[2].toString(16).toUpperCase(), 2));
    },
    /**
     * Detects if a string is a valid qooxdoo color
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid qooxdoo color
     */
    isValidPropertyValue : function(str){

      return (this.isThemedColor(str) || this.isNamedColor(str) || this.isHex3String(str) || this.isHex6String(str) || this.isRgbString(str) || this.isRgbaString(str));
    },
    /**
     * Detects if a string is a valid CSS color string
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid CSS color string
     */
    isCssString : function(str){

      return (this.isSystemColor(str) || this.isNamedColor(str) || this.isHex3String(str) || this.isHex6String(str) || this.isRgbString(str) || this.isRgbaString(str));
    },
    /**
     * Detects if a string is a valid hex3 string
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid hex3 string
     */
    isHex3String : function(str){

      return this.REGEXP.hex3.test(str);
    },
    /**
     * Detects if a string is a valid hex6 string
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid hex6 string
     */
    isHex6String : function(str){

      return this.REGEXP.hex6.test(str);
    },
    /**
     * Detects if a string is a valid RGB string
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid RGB string
     */
    isRgbString : function(str){

      return this.REGEXP.rgb.test(str);
    },
    /**
     * Detects if a string is a valid RGBA string
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid RGBA string
     */
    isRgbaString : function(str){

      return this.REGEXP.rgba.test(str);
    },
    /**
     * Converts a regexp object match of a rgb string to an RGB array.
     *
     * @return {Array} an array with red, green, blue
     */
    __rgbStringToRgb : function(){

      var red = parseInt(RegExp.$1, 10);
      var green = parseInt(RegExp.$2, 10);
      var blue = parseInt(RegExp.$3, 10);
      return [red, green, blue];
    },
    /**
     * Converts a regexp object match of a rgba string to an RGB array.
     *
     * @return {Array} an array with red, green, blue
     */
    __rgbaStringToRgb : function(){

      var red = parseInt(RegExp.$1, 10);
      var green = parseInt(RegExp.$2, 10);
      var blue = parseInt(RegExp.$3, 10);
      return [red, green, blue];
    },
    /**
     * Converts a regexp object match of a hex3 string to an RGB array.
     *
     * @return {Array} an array with red, green, blue
     */
    __hex3StringToRgb : function(){

      var red = parseInt(RegExp.$1, 16) * 17;
      var green = parseInt(RegExp.$2, 16) * 17;
      var blue = parseInt(RegExp.$3, 16) * 17;
      return [red, green, blue];
    },
    /**
     * Converts a regexp object match of a hex6 string to an RGB array.
     *
     * @return {Array} an array with red, green, blue
     */
    __hex6StringToRgb : function(){

      var red = (parseInt(RegExp.$1, 16) * 16) + parseInt(RegExp.$2, 16);
      var green = (parseInt(RegExp.$3, 16) * 16) + parseInt(RegExp.$4, 16);
      var blue = (parseInt(RegExp.$5, 16) * 16) + parseInt(RegExp.$6, 16);
      return [red, green, blue];
    },
    /**
     * Converts a hex3 string to an RGB array
     *
     * @param value {String} a hex3 (#xxx) string
     * @return {Array} an array with red, green, blue
     */
    hex3StringToRgb : function(value){

      if(this.isHex3String(value)){

        return this.__hex3StringToRgb(value);
      };
      throw new Error("Invalid hex3 value: " + value);
    },
    /**
     * Converts a hex3 (#xxx) string to a hex6 (#xxxxxx) string.
     *
     * @param value {String} a hex3 (#xxx) string
     * @return {String} The hex6 (#xxxxxx) string or the passed value when the
     *   passed value is not an hex3 (#xxx) value.
     */
    hex3StringToHex6String : function(value){

      if(this.isHex3String(value)){

        return this.rgbToHexString(this.hex3StringToRgb(value));
      };
      return value;
    },
    /**
     * Converts a hex6 string to an RGB array
     *
     * @param value {String} a hex6 (#xxxxxx) string
     * @return {Array} an array with red, green, blue
     */
    hex6StringToRgb : function(value){

      if(this.isHex6String(value)){

        return this.__hex6StringToRgb(value);
      };
      throw new Error("Invalid hex6 value: " + value);
    },
    /**
     * Converts a hex string to an RGB array
     *
     * @param value {String} a hex3 (#xxx) or hex6 (#xxxxxx) string
     * @return {Array} an array with red, green, blue
     */
    hexStringToRgb : function(value){

      if(this.isHex3String(value)){

        return this.__hex3StringToRgb(value);
      };
      if(this.isHex6String(value)){

        return this.__hex6StringToRgb(value);
      };
      throw new Error("Invalid hex value: " + value);
    },
    /**
     * Convert RGB colors to HSB
     *
     * @param rgb {Number[]} red, blue and green as array
     * @return {Array} an array with hue, saturation and brightness
     */
    rgbToHsb : function(rgb){

      var hue,saturation,brightness;
      var red = rgb[0];
      var green = rgb[1];
      var blue = rgb[2];
      var cmax = (red > green) ? red : green;
      if(blue > cmax){

        cmax = blue;
      };
      var cmin = (red < green) ? red : green;
      if(blue < cmin){

        cmin = blue;
      };
      brightness = cmax / 255.0;
      if(cmax != 0){

        saturation = (cmax - cmin) / cmax;
      } else {

        saturation = 0;
      };
      if(saturation == 0){

        hue = 0;
      } else {

        var redc = (cmax - red) / (cmax - cmin);
        var greenc = (cmax - green) / (cmax - cmin);
        var bluec = (cmax - blue) / (cmax - cmin);
        if(red == cmax){

          hue = bluec - greenc;
        } else if(green == cmax){

          hue = 2.0 + redc - bluec;
        } else {

          hue = 4.0 + greenc - redc;
        };
        hue = hue / 6.0;
        if(hue < 0){

          hue = hue + 1.0;
        };
      };
      return [Math.round(hue * 360), Math.round(saturation * 100), Math.round(brightness * 100)];
    },
    /**
     * Convert HSB colors to RGB
     *
     * @param hsb {Number[]} an array with hue, saturation and brightness
     * @return {Integer[]} an array with red, green, blue
     */
    hsbToRgb : function(hsb){

      var i,f,p,q,t;
      var hue = hsb[0] / 360;
      var saturation = hsb[1] / 100;
      var brightness = hsb[2] / 100;
      if(hue >= 1.0){

        hue %= 1.0;
      };
      if(saturation > 1.0){

        saturation = 1.0;
      };
      if(brightness > 1.0){

        brightness = 1.0;
      };
      var tov = Math.floor(255 * brightness);
      var rgb = {
      };
      if(saturation == 0.0){

        rgb.red = rgb.green = rgb.blue = tov;
      } else {

        hue *= 6.0;
        i = Math.floor(hue);
        f = hue - i;
        p = Math.floor(tov * (1.0 - saturation));
        q = Math.floor(tov * (1.0 - (saturation * f)));
        t = Math.floor(tov * (1.0 - (saturation * (1.0 - f))));
        switch(i){case 0:
        rgb.red = tov;
        rgb.green = t;
        rgb.blue = p;
        break;case 1:
        rgb.red = q;
        rgb.green = tov;
        rgb.blue = p;
        break;case 2:
        rgb.red = p;
        rgb.green = tov;
        rgb.blue = t;
        break;case 3:
        rgb.red = p;
        rgb.green = q;
        rgb.blue = tov;
        break;case 4:
        rgb.red = t;
        rgb.green = p;
        rgb.blue = tov;
        break;case 5:
        rgb.red = tov;
        rgb.green = p;
        rgb.blue = q;
        break;};
      };
      return [rgb.red, rgb.green, rgb.blue];
    },
    /**
     * Creates a random color.
     *
     * @return {String} a valid qooxdoo/CSS rgb color string.
     */
    randomColor : function(){

      var r = Math.round(Math.random() * 255);
      var g = Math.round(Math.random() * 255);
      var b = Math.round(Math.random() * 255);
      return this.rgbToRgbString([r, g, b]);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Prototype JS
     http://www.prototypejs.org/
     Version 1.5

     Copyright:
       (c) 2006-2007, Prototype Core Team

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Prototype Core Team

   ----------------------------------------------------------------------

     Copyright (c) 2005-2008 Sam Stephenson

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */
/**
 * Methods to operate on nodes and elements on a DOM tree. This contains
 * special getters to query for child nodes, siblings, etc. This class also
 * supports to operate on one element and reorganize the content with
 * the insertion of new HTML or nodes.
 */
qx.Bootstrap.define("qx.dom.Hierarchy", {
  statics : {
    /**
     * Returns the DOM index of the given node
     *
     * @param node {Node} Node to look for
     * @return {Integer} The DOM index
     */
    getNodeIndex : function(node){

      var index = 0;
      while(node && (node = node.previousSibling)){

        index++;
      };
      return index;
    },
    /**
     * Returns the DOM index of the given element (ignoring non-elements)
     *
     * @param element {Element} Element to look for
     * @return {Integer} The DOM index
     */
    getElementIndex : function(element){

      var index = 0;
      var type = qx.dom.Node.ELEMENT;
      while(element && (element = element.previousSibling)){

        if(element.nodeType == type){

          index++;
        };
      };
      return index;
    },
    /**
     * Return the next element to the supplied element
     *
     * "nextSibling" is not good enough as it might return a text or comment element
     *
     * @param element {Element} Starting element node
     * @return {Element | null} Next element node
     */
    getNextElementSibling : function(element){

      while(element && (element = element.nextSibling) && !qx.dom.Node.isElement(element)){

        continue;
      };
      return element || null;
    },
    /**
     * Return the previous element to the supplied element
     *
     * "previousSibling" is not good enough as it might return a text or comment element
     *
     * @param element {Element} Starting element node
     * @return {Element | null} Previous element node
     */
    getPreviousElementSibling : function(element){

      while(element && (element = element.previousSibling) && !qx.dom.Node.isElement(element)){

        continue;
      };
      return element || null;
    },
    /**
     * Whether the first element contains the second one
     *
     * Uses native non-standard contains() in Internet Explorer,
     * Opera and Webkit (supported since Safari 3.0 beta)
     *
     * @param element {Element} Parent element
     * @param target {Node} Child node
     * @return {Boolean}
     */
    contains : function(element, target){

      if(qx.core.Environment.get("html.element.contains")){

        if(qx.dom.Node.isDocument(element)){

          var doc = qx.dom.Node.getDocument(target);
          return element && doc == element;
        } else if(qx.dom.Node.isDocument(target)){

          return false;
        } else {

          return element.contains(target);
        };
      } else if(qx.core.Environment.get("html.element.compareDocumentPosition")){

        // http://developer.mozilla.org/en/docs/DOM:Node.compareDocumentPosition
        return !!(element.compareDocumentPosition(target) & 16);
      } else {

        while(target){

          if(element == target){

            return true;
          };
          target = target.parentNode;
        };
        return false;
      };
    },
    /**
     * Whether the element is inserted into the document
     * for which it was created.
     *
     * @param element {Element} DOM element to check
     * @return {Boolean} <code>true</code> when the element is inserted
     *    into the document.
     */
    isRendered : function(element){

      var doc = element.ownerDocument || element.document;
      if(qx.core.Environment.get("html.element.contains")){

        // Fast check for all elements which are not in the DOM
        if(!element.parentNode || !element.offsetParent){

          return false;
        };
        return doc.body.contains(element);
      } else if(qx.core.Environment.get("html.element.compareDocumentPosition")){

        // Gecko way, DOM3 method
        return !!(doc.compareDocumentPosition(element) & 16);
      } else {

        while(element){

          if(element == doc.body){

            return true;
          };
          element = element.parentNode;
        };
        return false;
      };
    },
    /**
     * Checks if <code>element</code> is a descendant of <code>ancestor</code>.
     *
     * @param element {Element} first element
     * @param ancestor {Element} second element
     * @return {Boolean} Element is a descendant of ancestor
     */
    isDescendantOf : function(element, ancestor){

      return this.contains(ancestor, element);
    },
    /**
     * Get the common parent element of two given elements. Returns
     * <code>null</code> when no common element has been found.
     *
     * Uses native non-standard contains() in Opera and Internet Explorer
     *
     * @param element1 {Element} First element
     * @param element2 {Element} Second element
     * @return {Element} the found parent, if none was found <code>null</code>
     */
    getCommonParent : function(element1, element2){

      if(element1 === element2){

        return element1;
      };
      if(qx.core.Environment.get("html.element.contains")){

        while(element1 && qx.dom.Node.isElement(element1)){

          if(element1.contains(element2)){

            return element1;
          };
          element1 = element1.parentNode;
        };
        return null;
      } else {

        var known = [];
        while(element1 || element2){

          if(element1){

            if(qx.lang.Array.contains(known, element1)){

              return element1;
            };
            known.push(element1);
            element1 = element1.parentNode;
          };
          if(element2){

            if(qx.lang.Array.contains(known, element2)){

              return element2;
            };
            known.push(element2);
            element2 = element2.parentNode;
          };
        };
        return null;
      };
    },
    /**
     * Collects all of element's ancestors and returns them as an array of
     * elements.
     *
     * @param element {Element} DOM element to query for ancestors
     * @return {Array} list of all parents
     */
    getAncestors : function(element){

      return this._recursivelyCollect(element, "parentNode");
    },
    /**
     * Returns element's children.
     *
     * @param element {Element} DOM element to query for child elements
     * @return {Array} list of all child elements
     */
    getChildElements : function(element){

      element = element.firstChild;
      if(!element){

        return [];
      };
      var arr = this.getNextSiblings(element);
      if(element.nodeType === 1){

        arr.unshift(element);
      };
      return arr;
    },
    /**
     * Collects all of element's descendants (deep) and returns them as an array
     * of elements.
     *
     * @param element {Element} DOM element to query for child elements
     * @return {Array} list of all found elements
     */
    getDescendants : function(element){

      return qx.lang.Array.fromCollection(element.getElementsByTagName("*"));
    },
    /**
     * Returns the first child that is an element. This is opposed to firstChild DOM
     * property which will return any node (whitespace in most usual cases).
     *
     * @param element {Element} DOM element to query for first descendant
     * @return {Element} the first descendant
     */
    getFirstDescendant : function(element){

      element = element.firstChild;
      while(element && element.nodeType != 1){

        element = element.nextSibling;
      };
      return element;
    },
    /**
     * Returns the last child that is an element. This is opposed to lastChild DOM
     * property which will return any node (whitespace in most usual cases).
     *
     * @param element {Element} DOM element to query for last descendant
     * @return {Element} the last descendant
     */
    getLastDescendant : function(element){

      element = element.lastChild;
      while(element && element.nodeType != 1){

        element = element.previousSibling;
      };
      return element;
    },
    /**
     * Collects all of element's previous siblings and returns them as an array of elements.
     *
     * @param element {Element} DOM element to query for previous siblings
     * @return {Array} list of found DOM elements
     */
    getPreviousSiblings : function(element){

      return this._recursivelyCollect(element, "previousSibling");
    },
    /**
     * Collects all of element's next siblings and returns them as an array of
     * elements.
     *
     * @param element {Element} DOM element to query for next siblings
     * @return {Array} list of found DOM elements
     */
    getNextSiblings : function(element){

      return this._recursivelyCollect(element, "nextSibling");
    },
    /**
     * Recursively collects elements whose relationship is specified by
     * property.  <code>property</code> has to be a property (a method won't
     * do!) of element that points to a single DOM node. Returns an array of
     * elements.
     *
     * @param element {Element} DOM element to start with
     * @param property {String} property to look for
     * @return {Array} result list
     */
    _recursivelyCollect : function(element, property){

      var list = [];
      while(element = element[property]){

        if(element.nodeType == 1){

          list.push(element);
        };
      };
      return list;
    },
    /**
     * Collects all of element's siblings and returns them as an array of elements.
     *
     * @param element {var} DOM element to start with
     * @return {Array} list of all found siblings
     */
    getSiblings : function(element){

      return this.getPreviousSiblings(element).reverse().concat(this.getNextSiblings(element));
    },
    /**
     * Whether the given element is empty.
     * Inspired by Base2 (Dean Edwards)
     *
     * @param element {Element} The element to check
     * @return {Boolean} true when the element is empty
     */
    isEmpty : function(element){

      element = element.firstChild;
      while(element){

        if(element.nodeType === qx.dom.Node.ELEMENT || element.nodeType === qx.dom.Node.TEXT){

          return false;
        };
        element = element.nextSibling;
      };
      return true;
    },
    /**
     * Removes all of element's text nodes which contain only whitespace
     *
     * @param element {Element} Element to cleanup
     * @return {void}
     */
    cleanWhitespace : function(element){

      var node = element.firstChild;
      while(node){

        var nextNode = node.nextSibling;
        if(node.nodeType == 3 && !/\S/.test(node.nodeValue)){

          element.removeChild(node);
        };
        node = nextNode;
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.dom.Hierarchy#getSiblings)
#require(qx.dom.Hierarchy#getNextSiblings)
#require(qx.dom.Hierarchy#getPreviousSiblings)
************************************************************************ */
/**
 * DOM traversal module
 */
qx.Bootstrap.define("qx.module.Traversing", {
  statics : {
    /**
     * Adds an element to the collection
     *
     * @attach {q}
     * @param el {Element} DOM element to add to the collection
     * @return {q} The collection for chaining
     */
    add : function(el){

      this.push(el);
      return this;
    },
    /**
     * Gets a set of elements containing all of the unique immediate children of
     * each of the matched set of elements.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?null} Optional selector to match
     * @return {q} Collection containing the child elements
     */
    getChildren : function(selector){

      var children = [];
      for(var i = 0;i < this.length;i++){

        var found = qx.dom.Hierarchy.getChildElements(this[i]);
        if(selector){

          found = qx.bom.Selector.matches(selector, found);
        };
        children = children.concat(found);
      };
      return q.$init(children);
    },
    /**
     * Executes the provided callback function once for each item in the
     * collection. @see qx.type.BaseArray#forEach
     *
     * @attach {q}
     * @param fn {Function} Callback function
     * @param ctx {Obj} Context object
     * @return {q} The collection for chaining
     */
    forEach : function(fn, ctx){

      for(var i = 0;i < this.length;i++){

        fn.call(ctx, this[i], i, this);
      };
      return this;
    },
    /**
     * Returns a copy of the collection within the given range.
     *
     * @attach {q}
     * @param begin {Number} The index to begin.
     * @param end {Number?} The index to end.
     * @return {q} A new collection containing a slice of the original collection.
     */
    slice : function(begin, end){

      // Old IEs return an empty array if the second argument is undefined
      if(end){

        return q.$init(Array.prototype.slice.call(this, begin, end));
      } else {

        return q.$init(Array.prototype.slice.call(this, begin));
      };
    },
    /**
     * Gets a set of elements containing the parent of each element in the
     * collection.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?null} Optional selector to match
     * @return {q} Collection containing the parent elements
     */
    getParents : function(selector){

      var parents = [];
      for(var i = 0;i < this.length;i++){

        var found = qx.dom.Element.getParentElement(this[i]);
        if(selector){

          found = qx.bom.Selector.matches(selector, [found]);
        };
        parents = parents.concat(found);
      };
      return q.$init(parents);
    },
    /**
     * Gets a set of elements containing all ancestors of each element in the
     * collection.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param filter {String?null} Optional selector to match
     * @return {q} Collection containing the ancestor elements
     */
    getAncestors : function(filter){

      return this.__getAncestors(null, filter);
    },
    /**
     * Gets a set of elements containing all ancestors of each element in the
     * collection, up to (but not including) the element matched by the provided
     * selector.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String} Selector that indicates where to stop including
     * ancestor elements
     * @param filter {String?null} Optional selector to match
     * @return {q} Collection containing the ancestor elements
     */
    getAncestorsUntil : function(selector, filter){

      return this.__getAncestors(selector, filter);
    },
    /**
     * Internal helper for getAncestors and getAncestorsUntil
     *
     * @attach {q}
     * @param selector {String} Selector that indicates where to stop including
     * ancestor elements
     * @param filter {String?null} Optional selector to match
     * @return {q} Collection containing the ancestor elements
     * @internal
     */
    __getAncestors : function(selector, filter){

      var ancestors = [];
      for(var i = 0;i < this.length;i++){

        var parent = qx.dom.Element.getParentElement(this[i]);
        while(parent){

          var found = [parent];
          if(selector && qx.bom.Selector.matches(selector, found).length > 0){

            break;
          };
          if(filter){

            found = qx.bom.Selector.matches(filter, found);
          };
          ancestors = ancestors.concat(found);
          parent = qx.dom.Element.getParentElement(parent);
        };
      };
      return q.$init(ancestors);
    },
    /**
     * Gets a set containing the closest matching ancestor for each item in
     * the collection.
     * If the item itself matches, it is added to the new set. Otherwise, the
     * item's parent chain will be traversed until a match is found.
     *
     * @attach {q}
     * @param selector {String} Selector expression to match
     * @return {q} New collection containing the closest matching ancestors
     */
    getClosest : function(selector){

      var closest = [];
      var findClosest = function findClosest(current){

        var found = qx.bom.Selector.matches(selector, current);
        if(found.length){

          closest.push(found[0]);
        } else {

          current = current.getParents();
          // One up
          if(current[0] && current[0].parentNode){

            findClosest(current);
          };
        };
      };
      for(var i = 0;i < this.length;i++){

        findClosest(q(this[i]));
      };
      return q.$init(closest);
    },
    /**
     * Searches the child elements of each item in the collection and returns
     * a new collection containing the children that match the provided selector
     *
     * @attach {q}
     * @param selector {String} Selector expression to match the child elements
     * against
     * @return {q} New collection containing the matching child elements
     */
    find : function(selector){

      var found = [];
      for(var i = 0;i < this.length;i++){

        found = found.concat(qx.bom.Selector.query(selector, this[i]));
      };
      return q.$init(found);
    },
    /**
     * Gets a new collection containing only those elements that passed the
     * given filter. This can be either a selector expression or a filter
     * function.
     *
     * @attach {q}
     * @param selector {String|Function} Selector expression or filter function
     * @return {q} New collection containing the elements that passed the filter
     */
    filter : function(selector){

      if(qx.lang.Type.isFunction(selector)){

        return qx.type.BaseArray.prototype.filter.call(this, selector);
      };
      /*
       * This works but isn't currently needed:
      if (qx.dom.Node.isElement(selector)) {
        for (var i=0; i < this.length; i++) {
          if (this[i] == selector) {
            return q.$init([this[i]]);
          }
        }
      }
      */
      return q.$init(qx.bom.Selector.matches(selector, this));
    },
    /**
     * Gets a new set of elements containing the child nodes of each item in the
     * current set.
     *
     * @attach {q}
     * @return {q} New collection containing the child nodes
     */
    getContents : function(){

      var found = [];
      for(var i = 0;i < this.length;i++){

        found = found.concat(qx.lang.Array.fromCollection(this[i].childNodes));
      };
      return q.$init(found);
    },
    /**
     * Checks if at least one element in the collection passes the provided
     * filter. This can be either a selector expression or a filter
     * function @see qx.type.BaseArray#filter
     *
     * @attach {q}
     * @param selector {String|Function} Selector expression or filter function
     * @return {Boolean} <code>true</code> if at least one element matches
     */
    is : function(selector){

      if(qx.lang.Type.isFunction(selector)){

        return this.filter(selector).length > 0;
      };
      return !!selector && qx.bom.Selector.matches(selector, this).length > 0;
    },
    /**
     * Reduce the set of matched elements to a single element.
     *
     * @attach {q}
     * @param index {Number} The position of the element in the collection
     * @return {q} A new collection containing one element
     */
    eq : function(index){

      return this.slice(index, +index + 1);
    },
    /**
     * Reduces the collection to the first element.
     *
     * @attach {q}
     * @return {q} A new collection containing one element
     */
    getFirst : function(){

      return this.slice(0, 1);
    },
    /**
     * Reduces the collection to the last element.
     *
     * @attach {q}
     * @return {q} A new collection containing one element
     */
    getLast : function(){

      return this.slice(this.length - 1);
    },
    /**
     * Gets a collection containing only the elements that have descendants
     * matching the given selector
     *
     * @attach {q}
     * @param selector {String} Selector expression
     * @return {q} a new collection containing only elements with matching descendants
     */
    has : function(selector){

      var found = [];
      for(var i = 0;i < this.length;i++){

        var descendants = qx.bom.Selector.matches(selector, this.eq(i).getContents());
        if(descendants.length > 0){

          found.push(this[i]);
        };
      };
      return q.$init(found);
    },
    /**
     * Gets a collection containing the next sibling element of each item in
     * the current set (ignoring text and comment nodes).
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing next siblings
     */
    getNext : function(selector){

      var found = this.map(qx.dom.Hierarchy.getNextElementSibling, qx.dom.Hierarchy);
      if(selector){

        found = qx.bom.Selector.matches(selector, found);
      };
      return found;
    },
    /**
     * Gets a collection containing all following sibling elements of each
     * item in the current set (ignoring text and comment nodes).
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing following siblings
     */
    getNextAll : function(selector){

      var ret = qx.module.Traversing.__hierarchyHelper(this, "getNextSiblings", selector);
      return q.$init(ret);
    },
    /**
     * Gets a collection containing the following sibling elements of each
     * item in the current set (ignoring text and comment nodes) up to but not
     * including any element that matches the given selector.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing following siblings
     */
    getNextUntil : function(selector){

      var found = [];
      this.forEach(function(item, index){

        var nextSiblings = qx.dom.Hierarchy.getNextSiblings(item);
        for(var i = 0,l = nextSiblings.length;i < l;i++){

          if(qx.bom.Selector.matches(selector, [nextSiblings[i]]).length > 0){

            break;
          };
          found.push(nextSiblings[i]);
        };
      });
      return q.$init(found);
    },
    /**
     * Gets a collection containing the previous sibling element of each item in
     * the current set (ignoring text and comment nodes).
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing previous siblings
     */
    getPrev : function(selector){

      var found = this.map(qx.dom.Hierarchy.getPreviousElementSibling, qx.dom.Hierarchy);
      if(selector){

        found = qx.bom.Selector.matches(selector, found);
      };
      return found;
    },
    /**
     * Gets a collection containing all preceding sibling elements of each
     * item in the current set (ignoring text and comment nodes).
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing preceding siblings
     */
    getPrevAll : function(selector){

      var ret = qx.module.Traversing.__hierarchyHelper(this, "getPreviousSiblings", selector);
      return q.$init(ret);
    },
    /**
     * Gets a collection containing the preceding sibling elements of each
     * item in the current set (ignoring text and comment nodes) up to but not
     * including any element that matches the given selector.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing preceding siblings
     */
    getPrevUntil : function(selector){

      var found = [];
      this.forEach(function(item, index){

        var previousSiblings = qx.dom.Hierarchy.getPreviousSiblings(item);
        for(var i = 0,l = previousSiblings.length;i < l;i++){

          if(qx.bom.Selector.matches(selector, [previousSiblings[i]]).length > 0){

            break;
          };
          found.push(previousSiblings[i]);
        };
      });
      return q.$init(found);
    },
    /**
     * Gets a collection containing all sibling elements of the items in the
     * current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing sibling elements
     */
    getSiblings : function(selector){

      var ret = qx.module.Traversing.__hierarchyHelper(this, "getSiblings", selector);
      return q.$init(ret);
    },
    /**
     * Remove elements from the collection that do not pass the given filter.
     * This can be either a selector expression or a filter function
     * @see qx.type.BaseArray#filter
     *
     * @attach {q}
     * @param selector {String|Function} Selector or filter function
     * @return {q} Reduced collection
     */
    not : function(selector){

      if(qx.lang.Type.isFunction(selector)){

        return this.filter(function(item, index, obj){

          return !selector(item, index, obj);
        });
      };
      var res = qx.bom.Selector.matches(selector, this);
      return this.filter(function(value){

        return res.indexOf(value) === -1;
      });
    },
    /**
     * Gets a new collection containing the offset parent of each item in the
     * current set.
     *
     * @attach {q}
     * @return {q} New collection containing offset parents
     */
    getOffsetParent : function(){

      return this.map(qx.bom.element.Location.getOffsetParent);
    },
    /**
     * Checks if the given object is a DOM element
     *
     * @attachStatic{q}
     * @param element {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM element
     */
    isElement : function(element){

      return qx.dom.Node.isElement(element);
    },
    /**
     * Checks if the given object is a DOM node
     *
     * @attachStatic{q}
     * @param node {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM node
     */
    isNode : function(node){

      return qx.dom.Node.isNode(node);
    },
    /**
     * Checks if the given object is a DOM document object
     *
     * @attachStatic{q}
     * @param node {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM document
     */
    isDocument : function(node){

      return qx.dom.Node.isDocument(node);
    },
    /**
     * Returns the DOM2 <code>defaultView</code> (window) for the given node.
     *
     * @attachStatic{q}
     * @param node {Node|Document|Window} Node to inspect
     * @return {Window} the <code>defaultView</code> for the given node
     */
    getWindow : function(node){

      return qx.dom.Node.getWindow(node);
    },
    /**
     * Returns the owner document of the given node
     *
     * @attachStatic{q}
     * @param node {Node } Node to get the document for
     * @return {Document|null} The document of the given DOM node
     */
    getDocument : function(node){

      return qx.dom.Node.getDocument(node);
    },
    /**
     * Helper function that iterates over a set of items and applies the given
     * qx.dom.Hierarchy method to each entry, storing the results in a new Array.
     * Duplicates are removed and the items are filtered if a selector is
     * provided.
     *
     * @attach{q}
     * @param collection {Array} Collection to iterate over (any Array-like object)
     * @param method {String} Name of the qx.dom.Hierarchy method to apply
     * @param selector {String?} Optional selector that elements to be included
     * must match
     * @return {Array} Result array
     * @internal
     */
    __hierarchyHelper : function(collection, method, selector){

      // Iterate ourself, as we want to directly combine the result
      var all = [];
      var Hierarchy = qx.dom.Hierarchy;
      for(var i = 0,l = collection.length;i < l;i++){

        all.push.apply(all, Hierarchy[method](collection[i]));
      };
      // Remove duplicates
      var ret = qx.lang.Array.unique(all);
      // Post reduce result by selector
      if(selector){

        ret = qx.bom.Selector.matches(selector, ret);
      };
      return ret;
    }
  },
  defer : function(statics){

    q.$attach({
      "add" : statics.add,
      "getChildren" : statics.getChildren,
      "forEach" : statics.forEach,
      "slice" : statics.slice,
      "getParents" : statics.getParents,
      "getAncestors" : statics.getAncestors,
      "getAncestorsUntil" : statics.getAncestorsUntil,
      "__getAncestors" : statics.__getAncestors,
      "getClosest" : statics.getClosest,
      "find" : statics.find,
      "filter" : statics.filter,
      "getContents" : statics.getContents,
      "is" : statics.is,
      "eq" : statics.eq,
      "getFirst" : statics.getFirst,
      "getLast" : statics.getLast,
      "has" : statics.has,
      "getNext" : statics.getNext,
      "getNextAll" : statics.getNextAll,
      "getNextUntil" : statics.getNextUntil,
      "getPrev" : statics.getPrev,
      "getPrevAll" : statics.getPrevAll,
      "getPrevUntil" : statics.getPrevUntil,
      "getSiblings" : statics.getSiblings,
      "not" : statics.not,
      "getOffsetParent" : statics.getOffsetParent
    });
    q.$attachStatic({
      "isElement" : statics.isElement,
      "isNode" : statics.isNode,
      "isDocument" : statics.isDocument,
      "getDocument" : statics.getDocument,
      "getWindow" : statics.getWindow
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * HTML templating module. This is a wrapper for mustache.js which is a
 * "framework-agnostic way to render logic-free views".
 *
 * Here is a basic example how to use it:
 * <pre class="javascript">
 * var template = "Hi, my name is {{name}}!";
 * var view = {name: "qooxdoo"};
 * q.template.render(template, view);
 * // return "Hi, my name is qooxdoo!"
 * </pre>
 *
 * For further details, please visit the mustache.js documentation here:
 *   https://github.com/janl/mustache.js/blob/master/README.md
 */
qx.Bootstrap.define("qx.module.Template", {
  statics : {
    /**
     * Helper method which provides direct access to templates stored as HTML in
     * the DOM. The DOM node with the given ID will be treated as a template,
     * parsed and a new DOM node will be returned containing the parsed data.
     * Keep in mind that templates can only have one root element.
     *
     * @attachStatic{q, template.get}
     * @param id {String} The id of the HTML template in the DOM.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {q} Collection containing a single DOM element with the parsed
     * template data.
     */
    get : function(id, view, partials){

      var el = qx.bom.Template.get(id, view, partials);
      return q.$init([el]);
    },
    /**
     * Original and only template method of mustache.js. For further
     * documentation, please visit https://github.com/janl/mustache.js
     *
     * @attachStatic{q, template.render}
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {String} The parsed template.
     */
    render : function(template, view, partials){

      return qx.bom.Template.render(template, view, partials);
    }
  },
  defer : function(statics){

    q.$attachStatic({
      "template" : {
        get : statics.get,
        render : statics.render
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

   ======================================================================

   This class contains code based on the following work:

   * Mustache.js version 0.5.0-dev

     Code:
       https://github.com/janl/mustache.js

     Copyright:
       (c) 2009 Chris Wanstrath (Ruby)
       (c) 2010 Jan Lehnardt (JavaScript)

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   ----------------------------------------------------------------------

   Copyright (c) 2009 Chris Wanstrath (Ruby)
   Copyright (c) 2010 Jan Lehnardt (JavaScript)

   Permission is hereby granted, free of charge, to any person obtaining
   a copy of this software and associated documentation files (the
   "Software"), to deal in the Software without restriction, including
   without limitation the rights to use, copy, modify, merge, publish,
   distribute, sublicense, and/or sell copies of the Software, and to
   permit persons to whom the Software is furnished to do so, subject to
   the following conditions:

   The above copyright notice and this permission notice shall be
   included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

************************************************************************ */
/* ************************************************************************

#ignore(module)

************************************************************************ */
/**
 * The is a template class which can be used for HTML templating. In fact,
 * this is a wrapper for mustache.js which is a "framework-agnostic way to
 * render logic-free views".
 *
 * Here is a basic example how to use it:
 * Template:
 * <pre class="javascript">
 * var template = "Hi, my name is {{name}}!";
 * var view = {name: "qooxdoo"};
 * qx.bom.Template.render(template, view);
 * // return "Hi, my name is qooxdoo!"
 * </pre>
 *
 * For further details, please visit the mustache.js documentation here:
 *   https://github.com/janl/mustache.js/blob/master/README.md
 *
 */
qx.Bootstrap.define("qx.bom.Template", {
  statics : {
    /** Contains the mustache.js version. */
    version : null,
    /**
     * Original and only template method of mustache.js. For further
     * documentation, please visit https://github.com/janl/mustache.js
     *
     * @signature function(template, view, partials)
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {String} The parsed template.
     */
    render : null,
    /**
     * Original and only template method of mustache.js. For further
     * documentation, please visit https://github.com/janl/mustache.js
     *
     * @deprecated since 2.0
     * @signature function(template, view, partials)
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {String} The parsed template.
     */
    toHtml : function(template, view, partials){

      {
      };
      return this.render(template, view, partials);
    },
    /**
     * Helper method which provides you with a direct access to templates
     * stored as HTML in the DOM. The DOM node with the given ID will be used
     * as a template, parsed and a new DOM node will be returned containing the
     * parsed data. Keep in mind to have only one root DOM element in the the
     * template.
     *
     * @param id {String} The id of the HTML template in the DOM.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {DomNode} A DOM element holding the parsed template data.
     */
    get : function(id, view, partials){

      // get the content stored in the DOM
      var template = document.getElementById(id);
      var inner = template.innerHTML;
      // apply the view
      inner = this.render(inner, view, partials);
      // special case for text only conversion
      if(inner.search(/<|>/) === -1){

        return document.createTextNode(inner);
      };
      // create a helper to convert the string into DOM nodes
      var helper = qx.dom.Element.create("div");
      helper.innerHTML = inner;
      return helper.children[0];
    }
  }
});
(function(){

  /**
   * Below is the original mustache.js code. Snapshot date is mentioned in
   * the head of this file.
   * @lint ignoreUndefined(module)
   */
  /*!
  * mustache.js - Logic-less {{mustache}} templates with JavaScript
  * http://github.com/janl/mustache.js
  */
  var Mustache = (typeof module !== "undefined" && module.exports) || {
  };
  (function(exports){

    exports.name = "mustache.js";
    exports.version = "0.5.0-dev";
    exports.tags = ["{{", "}}"];
    exports.parse = parse;
    exports.compile = compile;
    exports.render = render;
    exports.clearCache = clearCache;
    // This is here for backwards compatibility with 0.4.x.
    exports.to_html = function(template, view, partials, send){

      var result = render(template, view, partials);
      if(typeof send === "function"){

        send(result);
      } else {

        return result;
      };
    };
    var _toString = Object.prototype.toString;
    var _isArray = Array.isArray;
    var _forEach = Array.prototype.forEach;
    var _trim = String.prototype.trim;
    var isArray;
    if(_isArray){

      isArray = _isArray;
    } else {

      isArray = function(obj){

        return _toString.call(obj) === "[object Array]";
      };
    };
    var forEach;
    if(_forEach){

      forEach = function(obj, callback, scope){

        return _forEach.call(obj, callback, scope);
      };
    } else {

      forEach = function(obj, callback, scope){

        for(var i = 0,len = obj.length;i < len;++i){

          callback.call(scope, obj[i], i, obj);
        };
      };
    };
    var spaceRe = /^\s*$/;
    function isWhitespace(string){

      return spaceRe.test(string);
    };
    var trim;
    if(_trim){

      trim = function(string){

        return string == null ? "" : _trim.call(string);
      };
    } else {

      var trimLeft,trimRight;
      if(isWhitespace("\xA0")){

        trimLeft = /^\s+/;
        trimRight = /\s+$/;
      } else {

        // IE doesn't match non-breaking spaces with \s, thanks jQuery.
        trimLeft = /^[\s\xA0]+/;
        trimRight = /[\s\xA0]+$/;
      };
      trim = function(string){

        return string == null ? "" : String(string).replace(trimLeft, "").replace(trimRight, "");
      };
    };
    var escapeMap = {
      "&" : "&amp;",
      "<" : "&lt;",
      ">" : "&gt;",
      '"' : '&quot;',
      "'" : '&#39;'
    };
    function escapeHTML(string){

      return String(string).replace(/&(?!\w+;)|[<>"']/g, function(s){

        return escapeMap[s] || s;
      });
    };
    /**
     * Adds the `template`, `line`, and `file` properties to the given error
     * object and alters the message to provide more useful debugging information.
     */
    function debug(e, template, line, file){

      file = file || "<template>";
      var lines = template.split("\n"),start = Math.max(line - 3, 0),end = Math.min(lines.length, line + 3),context = lines.slice(start, end);
      var c;
      for(var i = 0,len = context.length;i < len;++i){

        c = i + start + 1;
        context[i] = (c === line ? " >> " : "    ") + context[i];
      };
      e.template = template;
      e.line = line;
      e.file = file;
      e.message = [file + ":" + line, context.join("\n"), "", e.message].join("\n");
      return e;
    };
    /**
     * Looks up the value of the given `name` in the given context `stack`.
     */
    function lookup(name, stack, defaultValue){

      if(name === "."){

        return stack[stack.length - 1];
      };
      var names = name.split(".");
      var lastIndex = names.length - 1;
      var target = names[lastIndex];
      var value,context,i = stack.length,j,localStack;
      while(i){

        localStack = stack.slice(0);
        context = stack[--i];
        j = 0;
        while(j < lastIndex){

          context = context[names[j++]];
          if(context == null){

            break;
          };
          localStack.push(context);
        };
        if(context && typeof context === "object" && target in context){

          value = context[target];
          break;
        };
      };
      // If the value is a function, call it in the current context.
      if(typeof value === "function"){

        value = value.call(localStack[localStack.length - 1]);
      };
      if(value == null){

        return defaultValue;
      };
      return value;
    };
    function renderSection(name, stack, callback, inverted){

      var buffer = "";
      var value = lookup(name, stack);
      if(inverted){

        // From the spec: inverted sections may render text once based on the
        // inverse value of the key. That is, they will be rendered if the key
        // doesn't exist, is false, or is an empty list.
        if(value == null || value === false || (isArray(value) && value.length === 0)){

          buffer += callback();
        };
      } else if(isArray(value)){

        forEach(value, function(value){

          stack.push(value);
          buffer += callback();
          stack.pop();
        });
      } else if(typeof value === "object"){

        stack.push(value);
        buffer += callback();
        stack.pop();
      } else if(typeof value === "function"){

        var scope = stack[stack.length - 1];
        var scopedRender = function(template){

          return render(template, scope);
        };
        buffer += value.call(scope, callback(), scopedRender) || "";
      } else if(value){

        buffer += callback();
      };;;;
      return buffer;
    };
    /**
     * Parses the given `template` and returns the source of a function that,
     * with the proper arguments, will render the template. Recognized options
     * include the following:
     *
     *   - file     The name of the file the template comes from (displayed in
     *              error messages)
     *   - tags     An array of open and close tags the `template` uses. Defaults
     *              to the value of Mustache.tags
     *   - debug    Set `true` to log the body of the generated function to the
     *              console
     *   - space    Set `true` to preserve whitespace from lines that otherwise
     *              contain only a {{tag}}. Defaults to `false`
     */
    function parse(template, options){

      options = options || {
      };
      var tags = options.tags || exports.tags,openTag = tags[0],closeTag = tags[tags.length - 1];
      var code = ['var buffer = "";', // output buffer
      "\nvar line = 1;", // keep track of source line number
      "\ntry {", '\nbuffer += "'];
      var spaces = [],// indices of whitespace in code on the current line
      hasTag = false,// is there a {{tag}} on the current line?
      nonSpace = false;
      // is there a non-space char on the current line?
      // Strips all space characters from the code array for the current line
      // if there was a {{tag}} on it and otherwise only spaces.
      var stripSpace = function(){

        if(hasTag && !nonSpace && !options.space){

          while(spaces.length){

            code.splice(spaces.pop(), 1);
          };
        } else {

          spaces = [];
        };
        hasTag = false;
        nonSpace = false;
      };
      var sectionStack = [],updateLine,nextOpenTag,nextCloseTag;
      var setTags = function(source){

        tags = trim(source).split(/\s+/);
        nextOpenTag = tags[0];
        nextCloseTag = tags[tags.length - 1];
      };
      var includePartial = function(source){

        code.push('";', updateLine, '\nvar partial = partials["' + trim(source) + '"];', '\nif (partial) {', '\n  buffer += render(partial,stack[stack.length - 1],partials);', '\n}', '\nbuffer += "');
      };
      var openSection = function(source, inverted){

        var name = trim(source);
        if(name === ""){

          throw debug(new Error("Section name may not be empty"), template, line, options.file);
        };
        sectionStack.push({
          name : name,
          inverted : inverted
        });
        code.push('";', updateLine, '\nvar name = "' + name + '";', '\nvar callback = (function () {', '\n  return function () {', '\n    var buffer = "";', '\nbuffer += "');
      };
      var openInvertedSection = function(source){

        openSection(source, true);
      };
      var closeSection = function(source){

        var name = trim(source);
        var openName = sectionStack.length != 0 && sectionStack[sectionStack.length - 1].name;
        if(!openName || name != openName){

          throw debug(new Error('Section named "' + name + '" was never opened'), template, line, options.file);
        };
        var section = sectionStack.pop();
        code.push('";', '\n    return buffer;', '\n  };', '\n})();');
        if(section.inverted){

          code.push("\nbuffer += renderSection(name,stack,callback,true);");
        } else {

          code.push("\nbuffer += renderSection(name,stack,callback);");
        };
        code.push('\nbuffer += "');
      };
      var sendPlain = function(source){

        code.push('";', updateLine, '\nbuffer += lookup("' + trim(source) + '",stack,"");', '\nbuffer += "');
      };
      var sendEscaped = function(source){

        code.push('";', updateLine, '\nbuffer += escapeHTML(lookup("' + trim(source) + '",stack,""));', '\nbuffer += "');
      };
      var line = 1,c,callback;
      for(var i = 0,len = template.length;i < len;++i){

        if(template.slice(i, i + openTag.length) === openTag){

          i += openTag.length;
          c = template.substr(i, 1);
          updateLine = '\nline = ' + line + ';';
          nextOpenTag = openTag;
          nextCloseTag = closeTag;
          hasTag = true;
          switch(c){case "!":
          // comment
          i++;
          callback = null;
          break;case "=":
          // change open/close tags, e.g. {{=<% %>=}}
          i++;
          closeTag = "=" + closeTag;
          callback = setTags;
          break;case ">":
          // include partial
          i++;
          callback = includePartial;
          break;case "#":
          // start section
          i++;
          callback = openSection;
          break;case "^":
          // start inverted section
          i++;
          callback = openInvertedSection;
          break;case "/":
          // end section
          i++;
          callback = closeSection;
          break;case "{":
          // plain variable
          closeTag = "}" + closeTag;// fall through
          case "&":
          // plain variable
          i++;
          nonSpace = true;
          callback = sendPlain;
          break;default:
          // escaped variable
          nonSpace = true;
          callback = sendEscaped;};
          var end = template.indexOf(closeTag, i);
          if(end === -1){

            throw debug(new Error('Tag "' + openTag + '" was not closed properly'), template, line, options.file);
          };
          var source = template.substring(i, end);
          if(callback){

            callback(source);
          };
          // Maintain line count for \n in source.
          var n = 0;
          while(~(n = source.indexOf("\n", n))){

            line++;
            n++;
          };
          i = end + closeTag.length - 1;
          openTag = nextOpenTag;
          closeTag = nextCloseTag;
        } else {

          c = template.substr(i, 1);
          switch(c){case '"':case "\\":
          nonSpace = true;
          code.push("\\" + c);
          break;case "\r":
          // Ignore carriage returns.
          break;case "\n":
          spaces.push(code.length);
          code.push("\\n");
          stripSpace();
          // Check for whitespace on the current line.
          line++;
          break;default:
          if(isWhitespace(c)){

            spaces.push(code.length);
          } else {

            nonSpace = true;
          };
          code.push(c);};
        };
      };
      if(sectionStack.length != 0){

        throw debug(new Error('Section "' + sectionStack[sectionStack.length - 1].name + '" was not closed properly'), template, line, options.file);
      };
      // Clean up any whitespace from a closing {{tag}} that was at the end
      // of the template without a trailing \n.
      stripSpace();
      code.push('";', "\nreturn buffer;", "\n} catch (e) { throw {error: e, line: line}; }");
      // Ignore `buffer += "";` statements.
      var body = code.join("").replace(/buffer \+= "";\n/g, "");
      if(options.debug){

        if(typeof console != "undefined" && console.log){

          console.log(body);
        } else if(typeof print === "function"){

          print(body);
        };
      };
      return body;
    };
    /**
     * Used by `compile` to generate a reusable function for the given `template`.
     */
    function _compile(template, options){

      var args = "view,partials,stack,lookup,escapeHTML,renderSection,render";
      var body = parse(template, options);
      var fn = new Function(args, body);
      // This anonymous function wraps the generated function so we can do
      // argument coercion, setup some variables, and handle any errors
      // encountered while executing it.
      return function(view, partials){

        partials = partials || {
        };
        var stack = [view];
        // context stack
        try{

          return fn(view, partials, stack, lookup, escapeHTML, renderSection, render);
        } catch(e) {

          throw debug(e.error, template, e.line, options.file);
        };
      };
    };
    // Cache of pre-compiled templates.
    var _cache = {
    };
    /**
     * Clear the cache of compiled templates.
     */
    function clearCache(){

      _cache = {
      };
    };
    /**
     * Compiles the given `template` into a reusable function using the given
     * `options`. In addition to the options accepted by Mustache.parse,
     * recognized options include the following:
     *
     *   - cache    Set `false` to bypass any pre-compiled version of the given
     *              template. Otherwise, a given `template` string will be cached
     *              the first time it is parsed
     */
    function compile(template, options){

      options = options || {
      };
      // Use a pre-compiled version from the cache if we have one.
      if(options.cache !== false){

        if(!_cache[template]){

          _cache[template] = _compile(template, options);
        };
        return _cache[template];
      };
      return _compile(template, options);
    };
    /**
     * High-level function that renders the given `template` using the given
     * `view` and `partials`. If you need to use any of the template options (see
     * `compile` above), you must compile in a separate step, and then call that
     * compiled function.
     */
    function render(template, view, partials){

      return compile(template)(view, partials);
    };
  })(Mustache);
  /**
   * Above is the original mustache code.
   */
  // EXPOSE qooxdoo variant
  qx.bom.Template.version = Mustache.version;
  qx.bom.Template.render = Mustache.render;
})();

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.module.Event)
************************************************************************ */
/**
 * TODO
 */
qx.Bootstrap.define("qx.module.event.OrientationHandler", {
  statics : {
    /**
     * List of events that require an orientation handler
     * @type Array
     */
    TYPES : ["orientationchange"],
    /**
     * Creates an orientation handler for the given window when an
     * orientationchange event listener is attached to it
     *
     * @param element {Window} DOM Window
     */
    register : function(element){

      if(!qx.dom.Node.isWindow(element)){

        throw new Error("The 'orientationchange' event is only available on window objects!");
      };
      if(!element.__orientationHandler){

        if(!element.__emitter){

          element.__emitter = new qx.event.Emitter();
        };
        element.__orientationHandler = new qx.event.handler.OrientationCore(element, element.__emitter);
      };
    },
    /**
     * Removes the orientation event handler from the element if there are no more
     * orientationchange event listeners attached to it
     * @param element {Element} DOM element
     */
    unregister : function(element){

      if(element.__orientationHandler){

        if(!element.__emitter){

          element.__orientationHandler = null;
        } else {

          var hasListener = false;
          var listeners = element.__emitter.getListeners();
          qx.module.event.OrientationHandler.TYPES.forEach(function(type){

            if(type in listeners && listeners[type].length > 0){

              hasListener = true;
            };
          });
          if(!hasListener){

            element.__orientationHandler = null;
          };
        };
      };
    }
  },
  defer : function(statics){

    q.$registerEventHook(statics.TYPES, statics.register, statics.unregister);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tino Butz (tbtz)
     * Daniel Wagner (danielwagner)

   ======================================================================

   This class contains code based on the following work:

   * Unify Project

     Homepage:
       http://unify-project.org

     Copyright:
       2009-2010 Deutsche Telekom AG, Germany, http://telekom.com

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/**
 * Listens for native orientation change events
 */
qx.Bootstrap.define("qx.event.handler.OrientationCore", {
  extend : Object,
  /**
   *
   * @param targetWindow {Window} DOM window object
   * @param emitter {qx.event.Emitter} Event emitter object
   */
  construct : function(targetWindow, emitter){

    this._window = targetWindow || window;
    this.__emitter = emitter;
    this._initObserver();
  },
  members : {
    __emitter : null,
    _window : null,
    _currentOrientation : null,
    __onNativeWrapper : null,
    __nativeEventType : null,
    /*
    ---------------------------------------------------------------------------
      OBSERVER INIT
    ---------------------------------------------------------------------------
    */
    /**
     * Initializes the native orientation change event listeners.
     */
    _initObserver : function(){

      this.__onNativeWrapper = qx.lang.Function.listener(this._onNative, this);
      // Handle orientation change event for Android devices by the resize event.
      // See http://stackoverflow.com/questions/1649086/detect-rotation-of-android-phone-in-the-browser-with-javascript
      // for more information.
      this.__nativeEventType = qx.bom.Event.supportsEvent(this._window, "orientationchange") ? "orientationchange" : "resize";
      qx.bom.Event.addNativeListener(this._window, this.__nativeEventType, this.__onNativeWrapper);
    },
    /*
    ---------------------------------------------------------------------------
      OBSERVER STOP
    ---------------------------------------------------------------------------
    */
    /**
     * Disconnects the native orientation change event listeners.
     */
    _stopObserver : function(){

      qx.bom.Event.removeNativeListener(this._window, this.__nativeEventType, this.__onNativeWrapper);
    },
    /*
    ---------------------------------------------------------------------------
      NATIVE EVENT OBSERVERS
    ---------------------------------------------------------------------------
    */
    /**
     * Handler for the native orientation change event.
     *
     * @signature function(domEvent)
     * @param domEvent {Event} The touch event from the browser.
     */
    _onNative : function(domEvent){

      var orientation = qx.bom.Viewport.getOrientation();
      if(this._currentOrientation != orientation){

        this._currentOrientation = orientation;
        var mode = qx.bom.Viewport.isLandscape() ? "landscape" : "portrait";
        domEvent._orientation = orientation;
        domEvent._mode = mode;
        if(this.__emitter){

          this.__emitter.emit("orientationchange", domEvent);
        };
      };
    }
  },
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function(){

    this._stopObserver();
    this.__manager = this.__emitter = null;
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */
/* ************************************************************************
#ignore(XDomainRequest)
#require(qx.bom.request.Xhr#open)
#require(qx.bom.request.Xhr#send)
#require(qx.bom.request.Xhr#on)
#require(qx.bom.request.Xhr#onreadystatechange)
#require(qx.bom.request.Xhr#onload)
#require(qx.bom.request.Xhr#onloadend)
#require(qx.bom.request.Xhr#onerror)
#require(qx.bom.request.Xhr#onabort)
#require(qx.bom.request.Xhr#ontimeout)
#require(qx.bom.request.Xhr#setRequestHeader)
#require(qx.bom.request.Xhr#getAllResponseHeaders)
#require(qx.bom.request.Xhr#getRequest)
************************************************************************ */
/**
 * A wrapper of the XMLHttpRequest host object (or equivalent). The interface is
 * similar to <a href="http://www.w3.org/TR/XMLHttpRequest/">XmlHttpRequest</a>.
 *
 * Hides browser inconsistencies and works around bugs found in popular
 * implementations.
 *
 * <div class="desktop">
 * Example:
 *
 * <pre class="javascript">
 *  var req = new qx.bom.request.Xhr();
 *  req.onload = function() {
 *    // Handle data received
 *    req.responseText;
 *  }
 *
 *  req.open("GET", url);
 *  req.send();
 * </pre>
 * </div>
 */
qx.Bootstrap.define("qx.bom.request.Xhr", {
  construct : function(){

    this.__onNativeReadyStateChangeBound = qx.Bootstrap.bind(this.__onNativeReadyStateChange, this);
    this.__onNativeAbortBound = qx.Bootstrap.bind(this.__onNativeAbort, this);
    this.__onTimeoutBound = qx.Bootstrap.bind(this.__onTimeout, this);
    this.__initNativeXhr();
    this._emitter = new qx.event.Emitter();
    // BUGFIX: IE
    // IE keeps connections alive unless aborted on unload
    if(window.attachEvent){

      this.__onUnloadBound = qx.Bootstrap.bind(this.__onUnload, this);
      window.attachEvent("onunload", this.__onUnloadBound);
    };
  },
  statics : {
    UNSENT : 0,
    OPENED : 1,
    HEADERS_RECEIVED : 2,
    LOADING : 3,
    DONE : 4
  },
  events : {
    /** Fired at ready state changes. */
    "readystatechange" : "qx.bom.request.Xhr",
    /** Fired on error. */
    "error" : "qx.bom.request.Xhr",
    /** Fired at loadend. */
    "loadend" : "qx.bom.request.Xhr",
    /** Fired on timeouts. */
    "timeout" : "qx.bom.request.Xhr",
    /** Fired when the request is aborted. */
    "abort" : "qx.bom.request.Xhr",
    /** Fired on successful retrieval. */
    "load" : "qx.bom.request.Xhr"
  },
  members : {
    /*
    ---------------------------------------------------------------------------
      PUBLIC
    ---------------------------------------------------------------------------
    */
    /**
     * {Number} Ready state.
     *
     * States can be:
     * UNSENT:           0,
     * OPENED:           1,
     * HEADERS_RECEIVED: 2,
     * LOADING:          3,
     * DONE:             4
     */
    readyState : 0,
    /**
     * {String} The response of the request as text.
     */
    responseText : "",
    /**
     * {Object} The response of the request as a Document object.
     */
    responseXML : null,
    /**
     * {Number} The HTTP status code.
     */
    status : 0,
    /**
     * {String} The HTTP status text.
     */
    statusText : "",
    /**
     * {Number} Timeout limit in milliseconds.
     *
     * 0 (default) means no timeout. Not supported for synchronous requests.
     */
    timeout : 0,
    /**
     * Initializes (prepares) request.
     *
     * @lint ignoreUndefined(XDomainRequest)
     *
     * @param method {String?"GET"}
     *  The HTTP method to use.
     * @param url {String}
     *  The URL to which to send the request.
     * @param async {Boolean?true}
     *  Whether or not to perform the operation asynchronously.
     * @param user {String?null}
     *  Optional user name to use for authentication purposes.
     * @param password {String?null}
     *  Optional password to use for authentication purposes.
     */
    open : function(method, url, async, user, password){

      this.__checkDisposed();
      // Mimick native behavior
      if(typeof url === "undefined"){

        throw new Error("Not enough arguments");
      } else if(typeof method === "undefined"){

        method = "GET";
      };
      // Reset flags that may have been set on previous request
      this.__abort = false;
      this.__send = false;
      this.__conditional = false;
      // Store URL for later checks
      this.__url = url;
      if(typeof async == "undefined"){

        async = true;
      };
      this.__async = async;
      // BUGFIX
      // IE < 9 and FF < 3.5 cannot reuse the native XHR to issue many requests
      if(!this.__supportsManyRequests() && this.readyState > qx.bom.request.Xhr.UNSENT){

        // XmlHttpRequest Level 1 requires open() to abort any pending requests
        // associated to the object. Since we're dealing with a new object here,
        // we have to emulate this behavior. Moreover, allow old native XHR to be garbage collected
        //
        // Dispose and abort.
        //
        this.dispose();
        // Replace the underlying native XHR with a new one that can
        // be used to issue new requests.
        this.__initNativeXhr();
      };
      // Restore handler in case it was removed before
      this.__nativeXhr.onreadystatechange = this.__onNativeReadyStateChangeBound;
      try{

        if(qx.core.Environment.get("qx.debug.io")){

          qx.Bootstrap.debug(qx.bom.request.Xhr, "Open native request with method: " + method + ", url: " + url + ", async: " + async);
        };
        this.__nativeXhr.open(method, url, async, user, password);
      } catch(OpenError) {

        // Only work around exceptions caused by cross domain request attempts
        if(!qx.util.Request.isCrossDomain(url)){

          // Is same origin
          throw OpenError;
        };
        if(!this.__async){

          this.__openError = OpenError;
        };
        if(this.__async){

          // Try again with XDomainRequest
          // (Success case not handled on purpose)
          // - IE 9
          if(window.XDomainRequest){

            this.readyState = 4;
            this.__nativeXhr = new XDomainRequest();
            this.__nativeXhr.onerror = qx.Bootstrap.bind(function(){

              this._emit("readystatechange");
              this._emit("error");
              this._emit("loadend");
            }, this);
            if(qx.core.Environment.get("qx.debug.io")){

              qx.Bootstrap.debug(qx.bom.request.Xhr, "Retry open native request with method: " + method + ", url: " + url + ", async: " + async);
            };
            this.__nativeXhr.open(method, url, async, user, password);
            return;
          };
          // Access denied
          // - IE 6: -2146828218
          // - IE 7: -2147024891
          // - Legacy Firefox
          window.setTimeout(qx.Bootstrap.bind(function(){

            if(this.__disposed){

              return;
            };
            this.readyState = 4;
            this._emit("readystatechange");
            this._emit("error");
            this._emit("loadend");
          }, this));
        };
      };
      // BUGFIX: IE < 9
      // IE < 9 tends to cache overly agressive. This may result in stale
      // representations. Force validating freshness of cached representation.
      if(qx.core.Environment.get("engine.name") === "mshtml" && qx.core.Environment.get("browser.documentmode") < 9 && this.__nativeXhr.readyState > 0){

        this.__nativeXhr.setRequestHeader("If-Modified-Since", "-1");
      };
      // BUGFIX: Firefox
      // Firefox < 4 fails to trigger onreadystatechange OPENED for sync requests
      if(qx.core.Environment.get("engine.name") === "gecko" && parseInt(qx.core.Environment.get("engine.version"), 10) < 2 && !this.__async){

        // Native XHR is already set to readyState DONE. Fake readyState
        // and call onreadystatechange manually.
        this.readyState = qx.bom.request.Xhr.OPENED;
        this._emit("readystatechange");
      };
    },
    /**
     * Sets an HTTP request header to be used by the request.
     *
     * Note: The request must be initialized before using this method.
     *
     * @param key {String}
     *  The name of the header whose value is to be set.
     * @param value {String}
     *  The value to set as the body of the header.
     * @return {qx.bom.request.Xhr} Self for chaining.
     */
    setRequestHeader : function(key, value){

      this.__checkDisposed();
      // Detect conditional requests
      if(key == "If-Match" || key == "If-Modified-Since" || key == "If-None-Match" || key == "If-Range"){

        this.__conditional = true;
      };
      this.__nativeXhr.setRequestHeader(key, value);
      return this;
    },
    /**
     * Sends request.
     *
     * @param data {String|Document?null}
     *  Optional data to send.
     * @return {qx.bom.request.Xhr} Self for chaining.
     */
    send : function(data){

      this.__checkDisposed();
      // BUGFIX: IE & Firefox < 3.5
      // For sync requests, some browsers throw error on open()
      // while it should be on send()
      //
      if(!this.__async && this.__openError){

        throw this.__openError;
      };
      // BUGFIX: Opera
      // On network error, Opera stalls at readyState HEADERS_RECEIVED
      // This violates the spec. See here http://www.w3.org/TR/XMLHttpRequest2/#send
      // (Section: If there is a network error)
      //
      // To fix, assume a default timeout of 10 seconds. Note: The "error"
      // event will be fired correctly, because the error flag is inferred
      // from the statusText property. Of course, compared to other
      // browsers there is an additional call to ontimeout(), but this call
      // should not harm.
      //
      if(qx.core.Environment.get("engine.name") === "opera" && this.timeout === 0){

        this.timeout = 10000;
      };
      // Timeout
      if(this.timeout > 0){

        this.__timerId = window.setTimeout(this.__onTimeoutBound, this.timeout);
      };
      // BUGFIX: Firefox 2
      // "NS_ERROR_XPC_NOT_ENOUGH_ARGS" when calling send() without arguments
      data = typeof data == "undefined" ? null : data;
      // Some browsers may throw an error when sending of async request fails.
      // This violates the spec which states only sync requests should.
      try{

        if(qx.core.Environment.get("qx.debug.io")){

          qx.Bootstrap.debug(qx.bom.request.Xhr, "Send native request");
        };
        this.__nativeXhr.send(data);
      } catch(SendError) {

        if(!this.__async){

          throw SendError;
        };
        // BUGFIX
        // Some browsers throws error when file not found via file:// protocol.
        // Synthesize readyState changes.
        if(this._getProtocol() === "file:"){

          this.readyState = 2;
          this.__readyStateChange();
          var that = this;
          window.setTimeout(function(){

            if(that.__disposed){

              return;
            };
            that.readyState = 3;
            that.__readyStateChange();
            that.readyState = 4;
            that.__readyStateChange();
          });
        };
      };
      // BUGFIX: Firefox
      // Firefox fails to trigger onreadystatechange DONE for sync requests
      if(qx.core.Environment.get("engine.name") === "gecko" && !this.__async){

        // Properties all set, only missing native readystatechange event
        this.__onNativeReadyStateChange();
      };
      // Set send flag
      this.__send = true;
      return this;
    },
    /**
     * Abort request.
     *
     * Cancels any network activity.
     * @return {qx.bom.request.Xhr} Self for chaining.
     */
    abort : function(){

      this.__checkDisposed();
      this.__abort = true;
      this.__nativeXhr.abort();
      if(this.__nativeXhr){

        this.readyState = this.__nativeXhr.readyState;
      };
      return this;
    },
    /**
     * Helper to emit events and call the callback methods.
     * @param event {String} The name of the event.
     */
    _emit : function(event){

      this["on" + event]();
      this._emitter.emit(event, this);
    },
    /**
     * Event handler for XHR event that fires at every state change.
     *
     * Replace with custom method to get informed about the communication progress.
     */
    onreadystatechange : function(){
    },
    /**
     * Event handler for XHR event "load" that is fired on successful retrieval.
     *
     * Note: This handler is called even when the HTTP status indicates an error.
     *
     * Replace with custom method to listen to the "load" event.
     */
    onload : function(){
    },
    /**
     * Event handler for XHR event "loadend" that is fired on retrieval.
     *
     * Note: This handler is called even when a network error (or similar)
     * occurred.
     *
     * Replace with custom method to listen to the "loadend" event.
     */
    onloadend : function(){
    },
    /**
     * Event handler for XHR event "error" that is fired on a network error.
     *
     * Replace with custom method to listen to the "error" event.
     */
    onerror : function(){
    },
    /**
    * Event handler for XHR event "abort" that is fired when request
    * is aborted.
    *
    * Replace with custom method to listen to the "abort" event.
    */
    onabort : function(){
    },
    /**
    * Event handler for XHR event "timeout" that is fired when timeout
    * interval has passed.
    *
    * Replace with custom method to listen to the "timeout" event.
    */
    ontimeout : function(){
    },
    /**
     * Add an event listener for the given event name.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function to execute when the event is fired
     * @param ctx {?var} The context of the listener.
     * @return {qx.bom.request.Xhr} Self for chaining.
     */
    on : function(name, listener, ctx){

      this._emitter.on(name, listener, ctx);
      return this;
    },
    /**
     * Get a single response header from response.
     *
     * @param header {String}
     *  Key of the header to get the value from.
     * @return {String}
     *  Response header.
     */
    getResponseHeader : function(header){

      this.__checkDisposed();
      return this.__nativeXhr.getResponseHeader(header);
    },
    /**
     * Get all response headers from response.
     *
     * @return {String} All response headers.
     */
    getAllResponseHeaders : function(){

      this.__checkDisposed();
      return this.__nativeXhr.getAllResponseHeaders();
    },
    /**
     * Get wrapped native XMLHttpRequest (or equivalent).
     *
     * Can be XMLHttpRequest or ActiveX.
     *
     * @return {Object} XMLHttpRequest or equivalent.
     */
    getRequest : function(){

      return this.__nativeXhr;
    },
    /*
    ---------------------------------------------------------------------------
      HELPER
    ---------------------------------------------------------------------------
    */
    /**
     * Dispose object and wrapped native XHR.
     */
    dispose : function(){

      if(this.__disposed){

        return false;
      };
      window.clearTimeout(this.__timerId);
      // Remove unload listener in IE. Aborting on unload is no longer required
      // for this instance.
      if(window.detachEvent){

        window.detachEvent("onunload", this.__onUnloadBound);
      };
      // May fail in IE
      try{

        this.__nativeXhr.onreadystatechange;
      } catch(PropertiesNotAccessable) {

        return;
      };
      // Clear out listeners
      var noop = function(){
      };
      this.__nativeXhr.onreadystatechange = noop;
      this.__nativeXhr.onload = noop;
      this.__nativeXhr.onerror = noop;
      // Abort any network activity
      this.abort();
      // Remove reference to native XHR
      this.__nativeXhr = null;
      this.__disposed = true;
      return true;
    },
    /*
    ---------------------------------------------------------------------------
      PROTECTED
    ---------------------------------------------------------------------------
    */
    /**
     * Create XMLHttpRequest (or equivalent).
     *
     * @return {Object} XMLHttpRequest or equivalent.
     */
    _createNativeXhr : function(){

      var xhr = qx.core.Environment.get("io.xhr");
      if(xhr === "xhr"){

        return new XMLHttpRequest();
      };
      if(xhr == "activex"){

        return new window.ActiveXObject("Microsoft.XMLHTTP");
      };
      qx.Bootstrap.error(this, "No XHR support available.");
    },
    /**
     * Get protocol of requested URL.
     *
     * @return {String} The used protocol.
     */
    _getProtocol : function(){

      var url = this.__url;
      var protocolRe = /^(\w+:)\/\//;
      // Could be http:// from file://
      if(url !== null && url.match){

        var match = url.match(protocolRe);
        if(match && match[1]){

          return match[1];
        };
      };
      return window.location.protocol;
    },
    /*
    ---------------------------------------------------------------------------
      PRIVATE
    ---------------------------------------------------------------------------
    */
    /**
     * {Object} XMLHttpRequest or equivalent.
     */
    __nativeXhr : null,
    /**
     * {Boolean} Whether request is async.
     */
    __async : null,
    /**
     * {Function} Bound __onNativeReadyStateChange handler.
     */
    __onNativeReadyStateChangeBound : null,
    /**
     * {Function} Bound __onNativeAbort handler.
     */
    __onNativeAbortBound : null,
    /**
     * {Function} Bound __onUnload handler.
     */
    __onUnloadBound : null,
    /**
     * {Function} Bound __onTimeout handler.
     */
    __onTimeoutBound : null,
    /**
     * {Boolean} Send flag
     */
    __send : null,
    /**
     * {String} Requested URL
     */
    __url : null,
    /**
     * {Boolean} Abort flag
     */
    __abort : null,
    /**
     * {Boolean} Timeout flag
     */
    __timeout : null,
    /**
     * {Boolean} Whether object has been disposed.
     */
    __disposed : null,
    /**
     * {Number} ID of timeout timer.
     */
    __timerId : null,
    /**
     * {Error} Error thrown on open, if any.
     */
    __openError : null,
    /**
     * {Boolean} Conditional get flag
     */
    __conditional : null,
    /**
     * Init native XHR.
     */
    __initNativeXhr : function(){

      // Create native XHR or equivalent and hold reference
      this.__nativeXhr = this._createNativeXhr();
      // Track native ready state changes
      this.__nativeXhr.onreadystatechange = this.__onNativeReadyStateChangeBound;
      // Track native abort, when supported
      if(this.__nativeXhr.onabort){

        this.__nativeXhr.onabort = this.__onNativeAbortBound;
      };
      // Reset flags
      this.__disposed = this.__send = this.__abort = false;
    },
    /**
     * Track native abort.
     *
     * In case the end user cancels the request by other
     * means than calling abort().
     */
    __onNativeAbort : function(){

      // When the abort that triggered this method was not a result from
      // calling abort()
      if(!this.__abort){

        this.abort();
      };
    },
    /**
     * Handle native onreadystatechange.
     *
     * Calls user-defined function onreadystatechange on each
     * state change and syncs the XHR status properties.
     */
    __onNativeReadyStateChange : function(){

      var nxhr = this.__nativeXhr,propertiesReadable = true;
      if(qx.core.Environment.get("qx.debug.io")){

        qx.Bootstrap.debug(qx.bom.request.Xhr, "Received native readyState: " + nxhr.readyState);
      };
      // BUGFIX: IE, Firefox
      // onreadystatechange() is called twice for readyState OPENED.
      //
      // Call onreadystatechange only when readyState has changed.
      if(this.readyState == nxhr.readyState){

        return;
      };
      // Sync current readyState
      this.readyState = nxhr.readyState;
      // BUGFIX: IE
      // Superfluous onreadystatechange DONE when aborting OPENED
      // without send flag
      if(this.readyState === qx.bom.request.Xhr.DONE && this.__abort && !this.__send){

        return;
      };
      // BUGFIX: IE
      // IE fires onreadystatechange HEADERS_RECEIVED and LOADING when sync
      //
      // According to spec, only onreadystatechange OPENED and DONE should
      // be fired.
      if(!this.__async && (nxhr.readyState == 2 || nxhr.readyState == 3)){

        return;
      };
      // Default values according to spec.
      this.status = 0;
      this.statusText = this.responseText = "";
      this.responseXML = null;
      if(this.readyState >= qx.bom.request.Xhr.HEADERS_RECEIVED){

        // In some browsers, XHR properties are not readable
        // while request is in progress.
        try{

          this.status = nxhr.status;
          this.statusText = nxhr.statusText;
          this.responseText = nxhr.responseText;
          this.responseXML = nxhr.responseXML;
        } catch(XhrPropertiesNotReadable) {

          propertiesReadable = false;
        };
        if(propertiesReadable){

          this.__normalizeStatus();
          this.__normalizeResponseXML();
        };
      };
      this.__readyStateChange();
      // BUGFIX: IE
      // Memory leak in XMLHttpRequest (on-page)
      if(this.readyState == qx.bom.request.Xhr.DONE){

        // Allow garbage collecting of native XHR
        if(nxhr){

          nxhr.onreadystatechange = function(){
          };
        };
      };
    },
    /**
     * Handle readystatechange. Called internally when readyState is changed.
     */
    __readyStateChange : function(){

      var that = this;
      // Cancel timeout before invoking handlers because they may throw
      if(this.readyState === qx.bom.request.Xhr.DONE){

        // Request determined DONE. Cancel timeout.
        window.clearTimeout(this.__timerId);
      };
      // BUGFIX: IE
      // IE < 8 fires LOADING and DONE on open() - before send() - when from cache
      if(qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 8){

        // Detect premature events when async. LOADING and DONE is
        // illogical to happen before request was sent.
        if(this.__async && !this.__send && this.readyState >= qx.bom.request.Xhr.LOADING){

          if(this.readyState == qx.bom.request.Xhr.LOADING){

            // To early to fire, skip.
            return;
          };
          if(this.readyState == qx.bom.request.Xhr.DONE){

            window.setTimeout(function(){

              if(that.__disposed){

                return;
              };
              // Replay previously skipped
              that.readyState = 3;
              that._emit("readystatechange");
              that.readyState = 4;
              that._emit("readystatechange");
              that.__readyStateChangeDone();
            });
            return;
          };
        };
      };
      // Always fire "readystatechange"
      this._emit("readystatechange");
      if(this.readyState === qx.bom.request.Xhr.DONE){

        this.__readyStateChangeDone();
      };
    },
    /**
     * Handle readystatechange. Called internally by
     * {@link #__readyStateChange} when readyState is DONE.
     */
    __readyStateChangeDone : function(){

      // Fire "timeout" if timeout flag is set
      if(this.__timeout){

        this._emit("timeout");
        // BUGFIX: Opera
        // Since Opera does not fire "error" on network error, fire additional
        // "error" on timeout (may well be related to network error)
        if(qx.core.Environment.get("engine.name") === "opera"){

          this._emit("error");
        };
        this.__timeout = false;
      } else {

        if(this.__abort){

          this._emit("abort");
        } else {

          if(this.__isNetworkError()){

            this._emit("error");
          } else {

            this._emit("load");
          };
        };
      };
      // Always fire "onloadend" when DONE
      this._emit("loadend");
    },
    /**
     * Check for network error.
     *
     * @return {Boolean} Whether a network error occured.
     */
    __isNetworkError : function(){

      var error;
      // Infer the XHR internal error flag from statusText when not aborted.
      // See http://www.w3.org/TR/XMLHttpRequest2/#error-flag and
      // http://www.w3.org/TR/XMLHttpRequest2/#the-statustext-attribute
      //
      // With file://, statusText is always falsy. Assume network error when
      // response is empty.
      if(this._getProtocol() === "file:"){

        error = !this.responseText;
      } else {

        error = !this.statusText;
      };
      return error;
    },
    /**
     * Handle faked timeout.
     */
    __onTimeout : function(){

      // Basically, mimick http://www.w3.org/TR/XMLHttpRequest2/#timeout-error
      var nxhr = this.__nativeXhr;
      this.readyState = qx.bom.request.Xhr.DONE;
      // Set timeout flag
      this.__timeout = true;
      // No longer consider request. Abort.
      nxhr.abort();
      this.responseText = "";
      this.responseXML = null;
      // Signal readystatechange
      this.__readyStateChange();
    },
    /**
     * Normalize status property across browsers.
     */
    __normalizeStatus : function(){

      var isDone = this.readyState === qx.bom.request.Xhr.DONE;
      // BUGFIX: Most browsers
      // Most browsers tell status 0 when it should be 200 for local files
      if(this._getProtocol() === "file:" && this.status === 0 && isDone){

        if(!this.__isNetworkError()){

          this.status = 200;
        };
      };
      // BUGFIX: IE
      // IE sometimes tells 1223 when it should be 204
      if(this.status === 1223){

        this.status = 204;
      };
      // BUGFIX: Opera
      // Opera tells 0 for conditional requests when it should be 304
      //
      // Detect response to conditional request that signals fresh cache.
      if(qx.core.Environment.get("engine.name") === "opera"){

        if(isDone && // Done
        this.__conditional && // Conditional request
        !this.__abort && // Not aborted
        this.status === 0){

          this.status = 304;
        };
      };
    },
    /**
     * Normalize responseXML property across browsers.
     */
    __normalizeResponseXML : function(){

      // BUGFIX: IE
      // IE does not recognize +xml extension, resulting in empty responseXML.
      //
      // Check if Content-Type is +xml, verify missing responseXML then parse
      // responseText as XML.
      if(qx.core.Environment.get("engine.name") == "mshtml" && (this.getResponseHeader("Content-Type") || "").match(/[^\/]+\/[^\+]+\+xml/) && this.responseXML && !this.responseXML.documentElement){

        var dom = new window.ActiveXObject("Microsoft.XMLDOM");
        dom.async = false;
        dom.validateOnParse = false;
        dom.loadXML(this.responseText);
        this.responseXML = dom;
      };
    },
    /**
     * Handler for native unload event.
     */
    __onUnload : function(){

      try{

        // Abort and dispose
        if(this){

          this.dispose();
        };
      } catch(e) {
      };
    },
    /**
     * Helper method to determine whether browser supports reusing the
     * same native XHR to send more requests.
     */
    __supportsManyRequests : function(){

      var name = qx.core.Environment.get("engine.name");
      var version = qx.core.Environment.get("browser.version");
      return !(name == "mshtml" && version < 9 || name == "gecko" && version < 3.5);
    },
    /**
     * Throw when already disposed.
     */
    __checkDisposed : function(){

      if(this.__disposed){

        throw new Error("Already disposed");
      };
    }
  },
  defer : function(){

    qx.core.Environment.add("qx.debug.io", false);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */
/**
 * Static helpers for handling requests.
 */
qx.Bootstrap.define("qx.util.Request", {
  statics : {
    /**
     * Whether URL given points to resource that is cross-domain,
     * i.e. not of same origin.
     *
     * @param url {String} URL.
     * @return {Boolean} Whether URL is cross domain.
     */
    isCrossDomain : function(url){

      var result = qx.util.Uri.parseUri(url),location = window.location;
      if(!location){

        return false;
      };
      var protocol = location.protocol;
      // URL is relative in the sence that it points to origin host
      if(!(url.indexOf("//") !== -1)){

        return false;
      };
      if(protocol.substr(0, protocol.length - 1) == result.protocol && location.host === result.host && location.port === result.port){

        return false;
      };
      return true;
    },
    /**
     * Determine if given HTTP status is considered successful.
     *
     * @param status {Number} HTTP status.
     * @return {Boolean} Whether status is considered successful.
     */
    isSuccessful : function(status){

      return (status >= 200 && status < 300 || status === 304);
    },
    /**
     * Request body is ignored for HTTP method GET and HEAD.
     *
     * See http://www.w3.org/TR/XMLHttpRequest2/#the-send-method.
     *
     * @param method {String} The HTTP method.
     * @return {Boolean} Whether request may contain body.
     */
    methodAllowsRequestBody : function(method){

      return !((/^(GET)|(HEAD)$/).test(method));
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Carsten Lergenmueller (carstenl)
     * Fabian Jakobs (fbjakobs)
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * Determines browser-dependent information about the transport layer.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Transport", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Returns the maximum number of parallel requests the current browser
     * supports per host addressed.
     *
     * Note that this assumes one connection can support one request at a time
     * only. Technically, this is not correct when pipelining is enabled (which
     * it currently is only for IE 8 and Opera). In this case, the number
     * returned will be too low, as one connection supports multiple pipelined
     * requests. This is accepted for now because pipelining cannot be
     * detected from JavaScript and because modern browsers have enough
     * parallel connections already - it's unlikely an app will require more
     * than 4 parallel XMLHttpRequests to one server at a time.
     *
     * @internal
     */
    getMaxConcurrentRequestCount : function(){

      var maxConcurrentRequestCount;
      // Parse version numbers.
      var versionParts = qx.bom.client.Engine.getVersion().split(".");
      var versionMain = 0;
      var versionMajor = 0;
      var versionMinor = 0;
      // Main number
      if(versionParts[0]){

        versionMain = versionParts[0];
      };
      // Major number
      if(versionParts[1]){

        versionMajor = versionParts[1];
      };
      // Minor number
      if(versionParts[2]){

        versionMinor = versionParts[2];
      };
      // IE 8 gives the max number of connections in a property
      // see http://msdn.microsoft.com/en-us/library/cc197013(VS.85).aspx
      if(window.maxConnectionsPerServer){

        maxConcurrentRequestCount = window.maxConnectionsPerServer;
      } else if(qx.bom.client.Engine.getName() == "opera"){

        // Opera: 8 total
        // see http://operawiki.info/HttpProtocol
        maxConcurrentRequestCount = 8;
      } else if(qx.bom.client.Engine.getName() == "webkit"){

        // Safari: 4
        // http://www.stevesouders.com/blog/2008/03/20/roundup-on-parallel-connections/
        // TODO: Distinguish Chrome from Safari, Chrome has 6 connections
        //       according to
        //      http://stackoverflow.com/questions/561046/how-many-concurrent-ajax-xmlhttprequest-requests-are-allowed-in-popular-browser
        maxConcurrentRequestCount = 4;
      } else if(qx.bom.client.Engine.getName() == "gecko" && ((versionMain > 1) || ((versionMain == 1) && (versionMajor > 9)) || ((versionMain == 1) && (versionMajor == 9) && (versionMinor >= 1)))){

        // FF 3.5 (== Gecko 1.9.1): 6 Connections.
        // see  http://gemal.dk/blog/2008/03/18/firefox_3_beta_5_will_have_improved_connection_parallelism/
        maxConcurrentRequestCount = 6;
      } else {

        // Default is 2, as demanded by RFC 2616
        // see http://blogs.msdn.com/ie/archive/2005/04/11/407189.aspx
        maxConcurrentRequestCount = 2;
      };;;
      return maxConcurrentRequestCount;
    },
    /**
     * Checks whether the app is loaded with SSL enabled which means via https.
     *
     * @internal
     * @return {Boolean} <code>true</code>, if the app runs on https
     */
    getSsl : function(){

      return window.location.protocol === "https:";
    },
    /**
     * Checks what kind of XMLHttpRequest object the browser supports
     * for the current protocol, if any.
     *
     * The standard XMLHttpRequest is preferred over ActiveX XMLHTTP.
     *
     * @internal
     * @return {String}
     *  <code>"xhr"</code>, if the browser provides standard XMLHttpRequest.<br/>
     *  <code>"activex"</code>, if the browser provides ActiveX XMLHTTP.<br/>
     *  <code>""</code>, if there is not XHR support at all.
     */
    getXmlHttpRequest : function(){

      // Standard XHR can be disabled in IE's security settings,
      // therefore provide ActiveX as fallback. Additionaly,
      // standard XHR in IE7 is broken for file protocol.
      var supports = window.ActiveXObject ? (function(){

        if(window.location.protocol !== "file:"){

          try{

            new window.XMLHttpRequest();
            return "xhr";
          } catch(noXhr) {
          };
        };
        try{

          new window.ActiveXObject("Microsoft.XMLHTTP");
          return "activex";
        } catch(noActiveX) {
        };
      })() : (function(){

        try{

          new window.XMLHttpRequest();
          return "xhr";
        } catch(noXhr) {
        };
      })();
      return supports || "";
    }
  },
  defer : function(statics){

    qx.core.Environment.add("io.maxrequests", statics.getMaxConcurrentRequestCount);
    qx.core.Environment.add("io.ssl", statics.getSsl);
    qx.core.Environment.add("io.xhr", statics.getXmlHttpRequest);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/* ************************************************************************
#require(qx.bom.request.Xhr#open)
************************************************************************ */
/**
 * This module provides basic IO functionality. It contains three ways to load
 * data:
 *
 * * XMLHttpRequest: {@link #xhr}
 * * Script tag: {@link #script}
 * * Script tag using JSONP: {@link #jsonp}
 */
qx.Bootstrap.define("qx.module.Io", {
  statics : {
    /**
     * Returns a configured XMLHttpRequest object. Using the send method will
     * finally send the request.
     *
     * @param url {String} Mandatory URL to load the data from.
     * @param settings {Map?} Optional settings map which may contain one of
     *   the following settings:
     *
     * * <code>method</code> The method of the request. Default: <pre>GET</pre>
     * * <code>async</code> flag to mark the request as asynchronous. Default: <pre>true</pre>
     * * <code>header</code> A map of request headers.
     *
     * @attachStatic {q, io.xhr}
     * @return {qx.bom.request.Xhr} The request object.
     */
    xhr : function(url, settings){

      if(!settings){

        settings = {
        };
      };
      var xhr = new qx.bom.request.Xhr();
      xhr.open(settings.method, url, settings.async);
      if(settings.header){

        var header = settings.header;
        for(var key in header){

          xhr.setRequestHeader(key, header[key]);
        };
      };
      return xhr;
    },
    /**
     * Returns a predefined script tag wrapper which can be used to load data
     * from cross-domain origins.
     *
     * @param url {String} Mandatory URL to load the data from.
     * @attachStatic {q, io.script}
     * @return {qx.bom.request.Script} The request object.
     */
    script : function(url){

      var script = new qx.bom.request.Script();
      script.open("get", url);
      return script;
    },
    /**
     * Returns a predefined script tag wrapper which can be used to load data
     * from cross-domain origins via JSONP.
     *
     * @param url {String} Mandatory URL to load the data from.
     * @param settings {Map?} Optional settings map which may contain one of
     *   the following settings:
     *
     * * <code>callbackName</code>: The name of the callback which will
     *      be called by the loaded script.
     * * <code>callbackParam</code>: The name of the callback expected by the server
     * @attachStatic {q, io.jsonp}
     * @return {qx.bom.request.Jsonp} The request object.
     */
    jsonp : function(url, settings){

      var script = new qx.bom.request.Jsonp();
      if(settings && settings.callbackName){

        script.setCallbackName(settings.callbackName);
      };
      if(settings && settings.callbackParam){

        script.setCallbackParam(settings.callbackParam);
      };
      script.setPrefix("q.$$");
      // needed in case no callback name is given
      script.open("get", url);
      return script;
    }
  },
  defer : function(statics){

    q.$attachStatic({
      io : {
        xhr : statics.xhr,
        script : statics.script,
        jsonp : statics.jsonp
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */
/**
 * Script loader with interface similar to
 * <a href="http://www.w3.org/TR/XMLHttpRequest/">XmlHttpRequest</a>.
 *
 * The script loader can be used to load scripts from arbitrary sources.
 * <span class="desktop">
 * For JSONP requests, consider the {@link qx.bom.request.Jsonp} transport
 * that derives from the script loader.
 * </span>
 *
 * <div class="desktop">
 * Example:
 *
 * <pre class="javascript">
 *  var req = new qx.bom.request.Script();
 *  req.onload = function() {
 *    // Script is loaded and parsed and
 *    // globals set are available
 *  }
 *
 *  req.open("GET", url);
 *  req.send();
 * </pre>
 * </div>
 */
/* ************************************************************************
#ignore(qx.core.Environment)
#require(qx.bom.request.Script#_success)
#require(qx.bom.request.Script#abort)
#require(qx.bom.request.Script#dispose)
#require(qx.bom.request.Script#getAllResponseHeaders)
#require(qx.bom.request.Script#getResponseHeader)
#require(qx.bom.request.Script#setDetermineSuccess)
#require(qx.bom.request.Script#setRequestHeader)
************************************************************************ */
qx.Bootstrap.define("qx.bom.request.Script", {
  construct : function(){

    this.__initXhrProperties();
    this.__onNativeLoadBound = qx.Bootstrap.bind(this._onNativeLoad, this);
    this.__onNativeErrorBound = qx.Bootstrap.bind(this._onNativeError, this);
    this.__onTimeoutBound = qx.Bootstrap.bind(this._onTimeout, this);
    this.__headElement = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    this._emitter = new qx.event.Emitter();
    // BUGFIX: Browsers not supporting error handler
    // Set default timeout to capture network errors
    //
    // Note: The script is parsed and executed, before a "load" is fired.
    this.timeout = this.__supportsErrorHandler() ? 0 : 15000;
  },
  events : {
    /** Fired at ready state changes. */
    "readystatechange" : "qx.bom.request.Script",
    /** Fired on error. */
    "error" : "qx.bom.request.Script",
    /** Fired at loadend. */
    "loadend" : "qx.bom.request.Script",
    /** Fired on timeouts. */
    "timeout" : "qx.bom.request.Script",
    /** Fired when the request is aborted. */
    "abort" : "qx.bom.request.Script",
    /** Fired on successful retrieval. */
    "load" : "qx.bom.request.Script"
  },
  members : {
    /**
     * {Number} Ready state.
     *
     * States can be:
     * UNSENT:           0,
     * OPENED:           1,
     * LOADING:          2,
     * LOADING:          3,
     * DONE:             4
     *
     * Contrary to {@link qx.bom.request.Xhr#readyState}, the script transport
     * does not receive response headers. For compatibility, another LOADING
     * state is implemented that replaces the HEADERS_RECEIVED state.
     */
    readyState : null,
    /**
     * {Number} The status code.
     *
     * Note: The script transport cannot determine the HTTP status code.
     */
    status : null,
    /**
     * {String} The status text.
     *
     * The script transport does not receive response headers. For compatibility,
     * the statusText property is set to the status casted to string.
     */
    statusText : null,
    /**
     * {Number} Timeout limit in milliseconds.
     *
     * 0 (default) means no timeout.
     */
    timeout : null,
    /**
     * {Function} Function that is executed once the script was loaded.
     */
    __determineSuccess : null,
    /**
     * Add an event listener for the given event name.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function to execute when the event is fired
     * @param ctx {?var} The context of the listener.
     * @return {qx.bom.request.Script} Self for chaining.
     */
    on : function(name, listener, ctx){

      this._emitter.on(name, listener, ctx);
      return this;
    },
    /**
     * Initializes (prepares) request.
     *
     * @param method {String}
     *   The HTTP method to use.
     *   This parameter exists for compatibility reasons. The script transport
     *   does not support methods other than GET.
     * @param url {String}
     *   The URL to which to send the request.
     */
    open : function(method, url){

      if(this.__disposed){

        return;
      };
      // Reset XHR properties that may have been set by previous request
      this.__initXhrProperties();
      this.__abort = null;
      this.__url = url;
      if(this.__environmentGet("qx.debug.io")){

        qx.Bootstrap.debug(qx.bom.request.Script, "Open native request with " + "url: " + url);
      };
      this._readyStateChange(1);
    },
    /**
     * Appends a query parameter to URL.
     *
     * This method exists for compatibility reasons. The script transport
     * does not support request headers. However, many services parse query
     * parameters like request headers.
     *
     * Note: The request must be initialized before using this method.
     *
     * @param key {String}
     *  The name of the header whose value is to be set.
     * @param value {String}
     *  The value to set as the body of the header.
     * @return {qx.bom.request.Script} Self for chaining.
     */
    setRequestHeader : function(key, value){

      if(this.__disposed){

        return;
      };
      var param = {
      };
      if(this.readyState !== 1){

        throw new Error("Invalid state");
      };
      param[key] = value;
      this.__url = qx.util.Uri.appendParamsToUrl(this.__url, param);
      return this;
    },
    /**
     * Sends request.
     * @return {qx.bom.request.Script} Self for chaining.
     */
    send : function(){

      if(this.__disposed){

        return;
      };
      var script = this.__createScriptElement(),head = this.__headElement,that = this;
      if(this.timeout > 0){

        this.__timeoutId = window.setTimeout(this.__onTimeoutBound, this.timeout);
      };
      if(this.__environmentGet("qx.debug.io")){

        qx.Bootstrap.debug(qx.bom.request.Script, "Send native request");
      };
      // Attach script to DOM
      head.insertBefore(script, head.firstChild);
      // The resource is loaded once the script is in DOM.
      // Assume HEADERS_RECEIVED and LOADING and dispatch async.
      window.setTimeout(function(){

        that._readyStateChange(2);
        that._readyStateChange(3);
      });
      return this;
    },
    /**
     * Aborts request.
     * @return {qx.bom.request.Script} Self for chaining.
     */
    abort : function(){

      if(this.__disposed){

        return;
      };
      this.__abort = true;
      this.__disposeScriptElement();
      this._emit("abort");
      return this;
    },
    /**
     * Helper to emit events and call the callback methods.
     * @param event {String} The name of the event.
     */
    _emit : function(event){

      this["on" + event]();
      this._emitter.emit(event, this);
    },
    /**
     * Event handler for an event that fires at every state change.
     *
     * Replace with custom method to get informed about the communication progress.
     */
    onreadystatechange : function(){
    },
    /**
     * Event handler for XHR event "load" that is fired on successful retrieval.
     *
     * Note: This handler is called even when an invalid script is returned.
     *
     * Warning: Internet Explorer < 9 receives a false "load" for invalid URLs.
     * This "load" is fired about 2 seconds after sending the request. To
     * distinguish from a real "load", consider defining a custom check
     * function using {@link #setDetermineSuccess} and query the status
     * property. However, the script loaded needs to have a known impact on
     * the global namespace. If this does not work for you, you may be able
     * to set a timeout lower than 2 seconds, depending on script size,
     * complexity and execution time.
     *
     * Replace with custom method to listen to the "load" event.
     */
    onload : function(){
    },
    /**
     * Event handler for XHR event "loadend" that is fired on retrieval.
     *
     * Note: This handler is called even when a network error (or similar)
     * occurred.
     *
     * Replace with custom method to listen to the "loadend" event.
     */
    onloadend : function(){
    },
    /**
     * Event handler for XHR event "error" that is fired on a network error.
     *
     * Note: Some browsers do not support the "error" event.
     *
     * Replace with custom method to listen to the "error" event.
     */
    onerror : function(){
    },
    /**
    * Event handler for XHR event "abort" that is fired when request
    * is aborted.
    *
    * Replace with custom method to listen to the "abort" event.
    */
    onabort : function(){
    },
    /**
    * Event handler for XHR event "timeout" that is fired when timeout
    * interval has passed.
    *
    * Replace with custom method to listen to the "timeout" event.
    */
    ontimeout : function(){
    },
    /**
     * Get a single response header from response.
     *
     * Note: This method exists for compatibility reasons. The script
     * transport does not receive response headers.
     *
     * @param key {String}
     *  Key of the header to get the value from.
     */
    getResponseHeader : function(key){

      if(this.__disposed){

        return;
      };
      if(this.__environmentGet("qx.debug")){

        qx.Bootstrap.debug("Response header cannot be determined for " + "requests made with script transport.");
      };
      return "unknown";
    },
    /**
     * Get all response headers from response.
     *
     * Note: This method exists for compatibility reasons. The script
     * transport does not receive response headers.
     */
    getAllResponseHeaders : function(){

      if(this.__disposed){

        return;
      };
      if(this.__environmentGet("qx.debug")){

        qx.Bootstrap.debug("Response headers cannot be determined for" + "requests made with script transport.");
      };
      return "Unknown response headers";
    },
    /**
     * Determine if loaded script has expected impact on global namespace.
     *
     * The function is called once the script was loaded and must return a
     * boolean indicating if the response is to be considered successful.
     *
     * @param check {Function} Function executed once the script was loaded.
     *
     */
    setDetermineSuccess : function(check){

      this.__determineSuccess = check;
    },
    /**
     * Dispose object.
     */
    dispose : function(){

      var script = this.__scriptElement;
      if(!this.__disposed){

        // Prevent memory leaks
        if(script){

          script.onload = script.onreadystatechange = null;
          this.__disposeScriptElement();
        };
        if(this.__timeoutId){

          window.clearTimeout(this.__timeoutId);
        };
        this.__disposed = true;
      };
    },
    /*
    ---------------------------------------------------------------------------
      PROTECTED
    ---------------------------------------------------------------------------
    */
    /**
     * Get URL of request.
     *
     * @return {String} URL of request.
     */
    _getUrl : function(){

      return this.__url;
    },
    /**
     * Get script element used for request.
     *
     * @return {Element} Script element.
     */
    _getScriptElement : function(){

      return this.__scriptElement;
    },
    /**
     * Handle timeout.
     */
    _onTimeout : function(){

      this.__failure();
      if(!this.__supportsErrorHandler()){

        this._emit("error");
      };
      this._emit("timeout");
      if(!this.__supportsErrorHandler()){

        this._emit("loadend");
      };
    },
    /**
     * Handle native load.
     */
    _onNativeLoad : function(){

      var script = this.__scriptElement,determineSuccess = this.__determineSuccess,that = this;
      // Aborted request must not fire load
      if(this.__abort){

        return;
      };
      // BUGFIX: IE < 9
      // When handling "readystatechange" event, skip if readyState
      // does not signal loaded script
      if(this.__environmentGet("engine.name") === "mshtml" && this.__environmentGet("browser.documentmode") < 9){

        if(!(/loaded|complete/).test(script.readyState)){

          return;
        } else {

          if(this.__environmentGet("qx.debug.io")){

            qx.Bootstrap.debug(qx.bom.request.Script, "Received native readyState: loaded");
          };
        };
      };
      if(this.__environmentGet("qx.debug.io")){

        qx.Bootstrap.debug(qx.bom.request.Script, "Received native load");
      };
      // Determine status by calling user-provided check function
      if(determineSuccess){

        // Status set before has higher precedence
        if(!this.status){

          this.status = determineSuccess() ? 200 : 500;
        };
      };
      if(this.status === 500){

        if(this.__environmentGet("qx.debug.io")){

          qx.Bootstrap.debug(qx.bom.request.Script, "Detected error");
        };
      };
      if(this.__timeoutId){

        window.clearTimeout(this.__timeoutId);
      };
      window.setTimeout(function(){

        that._success();
        that._readyStateChange(4);
        that._emit("load");
        that._emit("loadend");
      });
    },
    /**
     * Handle native error.
     */
    _onNativeError : function(){

      this.__failure();
      this._emit("error");
      this._emit("loadend");
    },
    /*
    ---------------------------------------------------------------------------
      PRIVATE
    ---------------------------------------------------------------------------
    */
    /**
     * {Element} Script element
     */
    __scriptElement : null,
    /**
     * {Element} Head element
     */
    __headElement : null,
    /**
     * {String} URL
     */
    __url : "",
    /**
     * {Function} Bound _onNativeLoad handler.
     */
    __onNativeLoadBound : null,
    /**
     * {Function} Bound _onNativeError handler.
     */
    __onNativeErrorBound : null,
    /**
     * {Function} Bound _onTimeout handler.
     */
    __onTimeoutBound : null,
    /**
     * {Number} Timeout timer iD.
     */
    __timeoutId : null,
    /**
     * {Boolean} Whether request was aborted.
     */
    __abort : null,
    /**
     * {Boolean} Whether request was disposed.
     */
    __disposed : null,
    /*
    ---------------------------------------------------------------------------
      HELPER
    ---------------------------------------------------------------------------
    */
    /**
     * Initialize properties.
     */
    __initXhrProperties : function(){

      this.readyState = 0;
      this.status = 0;
      this.statusText = "";
    },
    /**
     * Change readyState.
     *
     * @param readyState {Number} The desired readyState
     */
    _readyStateChange : function(readyState){

      this.readyState = readyState;
      this._emit("readystatechange");
    },
    /**
     * Handle success.
     */
    _success : function(){

      this.__disposeScriptElement();
      this.readyState = 4;
      // By default, load is considered successful
      if(!this.status){

        this.status = 200;
      };
      this.statusText = "" + this.status;
    },
    /**
     * Handle failure.
     */
    __failure : function(){

      this.__disposeScriptElement();
      this.readyState = 4;
      this.status = 0;
      this.statusText = null;
    },
    /**
     * Looks up whether browser supports error handler.
     *
     * @return {Boolean} Whether browser supports error handler.
     */
    __supportsErrorHandler : function(){

      var isLegacyIe = this.__environmentGet("engine.name") === "mshtml" && this.__environmentGet("browser.documentmode") < 9;
      var isOpera = this.__environmentGet("engine.name") === "opera";
      return !(isLegacyIe || isOpera);
    },
    /**
     * Create and configure script element.
     *
     * @return {Element} Configured script element.
     */
    __createScriptElement : function(){

      var script = this.__scriptElement = document.createElement("script");
      script.src = this.__url;
      script.onerror = this.__onNativeErrorBound;
      script.onload = this.__onNativeLoadBound;
      // BUGFIX: IE < 9
      // Legacy IEs do not fire the "load" event for script elements.
      // Instead, they support the "readystatechange" event
      if(this.__environmentGet("engine.name") === "mshtml" && this.__environmentGet("browser.documentmode") < 9){

        script.onreadystatechange = this.__onNativeLoadBound;
      };
      return script;
    },
    /**
     * Remove script element from DOM.
     */
    __disposeScriptElement : function(){

      var script = this.__scriptElement;
      if(script && script.parentNode){

        this.__headElement.removeChild(script);
      };
    },
    /**
     * Proxy Environment.get to guard against env not being present yet.
     *
     * @param key {String} Environment key.
     */
    __environmentGet : function(key){

      if(qx && qx.core && qx.core.Environment){

        return qx.core.Environment.get(key);
      } else {

        if(key === "engine.name"){

          return qx.bom.client.Engine.getName();
        };
        if(key === "browser.documentmode"){

          return qx.bom.client.Browser.getDocumentMode();
        };
        if(key == "qx.debug.io"){

          return false;
        };
        throw new Error("Unknown environment key at this phase");
      };
    }
  },
  defer : function(){

    if(qx && qx.core && qx.core.Environment){

      qx.core.Environment.add("qx.debug.io", false);
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */
/* ************************************************************************
#require(qx.bom.request.Script#open)
#require(qx.bom.request.Script#on)
#require(qx.bom.request.Script#onreadystatechange)
#require(qx.bom.request.Script#onload)
#require(qx.bom.request.Script#onloadend)
#require(qx.bom.request.Script#onerror)
#require(qx.bom.request.Script#onabort)
#require(qx.bom.request.Script#ontimeout)
#require(qx.bom.request.Script#send)
************************************************************************ */
/**
 * A special script loader handling JSONP responses. Automatically
 * provides callbacks and populates responseJson property.
 *
 * Example:
 *
 * <pre class="javascript">
 *  var req = new qx.bom.request.Jsonp();
 *
 *  // Some services have a fixed callback name
 *  // req.setCallbackName("callback");
 *
 *  req.onload = function() {
 *    // Handle data received
 *    req.responseJson;
 *  }
 *
 *  req.open("GET", url);
 *  req.send();
 * </pre>
 */
qx.Bootstrap.define("qx.bom.request.Jsonp", {
  extend : qx.bom.request.Script,
  construct : function(){

    // Borrow super-class constructor
    qx.bom.request.Script.apply(this);
    this.__generateId();
  },
  members : {
    /**
     * {Object} Parsed JSON response.
     */
    responseJson : null,
    /**
     * {Number} Identifier of this instance.
     */
    __id : null,
    /**
     * {String} Callback parameter.
     */
    __callbackParam : null,
    /**
     * {String} Callback name.
     */
    __callbackName : null,
    /**
     * {Boolean} Whether callback was called.
     */
    __callbackCalled : null,
    /**
     * {Boolean} Whether a custom callback was created automatically.
     */
    __customCallbackCreated : null,
    /**
     * {Boolean} Whether request was disposed.
     */
    __disposed : null,
    /** Prefix used for the internal callback name. */
    __prefix : "",
    /**
     * Initializes (prepares) request.
     *
     * @param method {String}
     *   The HTTP method to use.
     *   This parameter exists for compatibility reasons. The script transport
     *   does not support methods other than GET.
     * @param url {String}
     *   The URL to which to send the request.
     */
    open : function(method, url){

      if(this.__disposed){

        return;
      };
      var query = {
      },callbackParam,callbackName,that = this;
      // Reset properties that may have been set by previous request
      this.responseJson = null;
      this.__callbackCalled = false;
      callbackParam = this.__callbackParam || "callback";
      callbackName = this.__callbackName || this.__prefix + "qx.bom.request.Jsonp[" + this.__id + "].callback";
      // Default callback
      if(!this.__callbackName){

        // Store globally available reference to this object
        this.constructor[this.__id] = this;
      } else {

        // Dynamically create globally available callback (if it does not
        // exist yet) with user defined name. Delegate to this object’s
        // callback method.
        if(!window[this.__callbackName]){

          this.__customCallbackCreated = true;
          window[this.__callbackName] = function(data){

            that.callback(data);
          };
        } else {

          if(qx.core.Environment.get("qx.debug.io")){

            qx.Bootstrap.debug(qx.bom.request.Jsonp, "Callback " + this.__callbackName + " already exists");
          };
        };
      };
      if(qx.core.Environment.get("qx.debug.io")){

        qx.Bootstrap.debug(qx.bom.request.Jsonp, "Expecting JavaScript response to call: " + callbackName);
      };
      query[callbackParam] = callbackName;
      url = qx.util.Uri.appendParamsToUrl(url, query);
      this.__callBase("open", [method, url]);
    },
    /**
     * Callback provided for JSONP response to pass data.
     *
     * Called internally to populate responseJson property
     * and indicate successful status.
     *
     * Note: If you write a custom callback you’ll need to call
     * this method in order to notify the request about the data
     * loaded. Writing a custom callback should not be necessary
     * in most cases.
     *
     * @param data {Object} JSON
     */
    callback : function(data){

      if(this.__disposed){

        return;
      };
      // Signal callback was called
      this.__callbackCalled = true;
      {
      };
      // Set response
      this.responseJson = data;
      // Delete global reference to this
      this.constructor[this.__id] = undefined;
      this.__deleteCustomCallback();
    },
    /**
     * Set callback parameter.
     *
     * Some JSONP services expect the callback name to be passed labeled with a
     * special URL parameter key, e.g. "jsonp" in "?jsonp=myCallback". The
     * default is "callback".
     *
     * @param param {String} Name of the callback parameter.
     * @return {qx.bom.request.Jsonp} Self reference for chaining.
     */
    setCallbackParam : function(param){

      this.__callbackParam = param;
      return this;
    },
    /**
     * Set callback name.
     *
     * Must be set to the name of the callback function that is called by the
     * script returned from the JSONP service. By default, the callback name
     * references this instance’s {@link #callback} method, allowing to connect
     * multiple JSONP responses to different requests.
     *
     * If the JSONP service allows to set custom callback names, it should not
     * be necessary to change the default. However, some services use a fixed
     * callback name. This is when setting the callbackName is useful. A
     * function is created and made available globally under the given name.
     * The function receives the JSON data and dispatches it to this instance’s
     * {@link #callback} method. Please note that this function is only created
     * if it does not exist before.
     *
     * @param name {String} Name of the callback function.
     * @return {qx.bom.request.Jsonp} Self reference for chaining.
     */
    setCallbackName : function(name){

      this.__callbackName = name;
      return this;
    },
    /**
     * Set the prefix used in front of 'qx.' in case 'qx' is not available
     * (for qx.Website e.g.)
     * @internal
     * @param prefix {String} The prefix to put in front of 'qx'
     */
    setPrefix : function(prefix){

      this.__prefix = prefix;
    },
    dispose : function(){

      // In case callback was not called
      this.__deleteCustomCallback();
      this.__callBase("dispose");
    },
    /**
     * Handle native load.
     */
    _onNativeLoad : function(){

      // Indicate erroneous status (500) if callback was not called.
      //
      // Why 500? 5xx belongs to the range of server errors. If the callback was
      // not called, it is assumed the server failed to provide an appropriate
      // response. Since the exact reason of the error is unknown, the most
      // generic message ("500 Internal Server Error") is chosen.
      this.status = this.__callbackCalled ? 200 : 500;
      this.__callBase("_onNativeLoad");
    },
    /**
     *  Delete custom callback if dynamically created before.
     */
    __deleteCustomCallback : function(){

      if(this.__customCallbackCreated && window[this.__callbackName]){

        window[this.__callbackName] = undefined;
        this.__customCallbackCreated = false;
      };
    },
    /**
     * Call overriden method.
     *
     * @param method {String} Name of the overriden method.
     * @param args {Array} Arguments.
     */
    __callBase : function(method, args){

      qx.bom.request.Script.prototype[method].apply(this, args || []);
    },
    /**
     * Generate ID.
     */
    __generateId : function(){

      // Add random digits to date to allow immediately following requests
      // that may be send at the same time
      this.__id = (new Date().valueOf()) + ("" + Math.random()).substring(2, 5);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Attribute/Property handling for DOM elements.
 */
qx.Bootstrap.define("qx.module.Attribute", {
  statics : {
    /**
     * Returns the HTML content of the first item in the collection
     * @attach {q}
     * @return {String|null} HTML content or null if the collection is empty
     */
    getHtml : function(){

      if(this[0]){

        return qx.bom.element.Attribute.get(this[0], "html");
      };
      return null;
    },
    /**
     * Sets the HTML content of each item in the collection
     *
     * @attach {q}
     * @param html {String} HTML string
     * @return {q} The collection for chaining
     */
    setHtml : function(html){

      for(var i = 0;i < this.length;i++){

        qx.bom.element.Attribute.set(this[i], "html", html);
      };
      return this;
    },
    /**
     * Sets an HTML attribute on each item in the collection
     *
     * @attach {q}
     * @param name {String} Attribute name
     * @param value {var} Attribute value
     * @return {q} The collection for chaining
     */
    setAttribute : function(name, value){

      for(var i = 0;i < this.length;i++){

        qx.bom.element.Attribute.set(this[i], name, value);
      };
      return this;
    },
    /**
     * Returns the value of the given attribute for the first item in the
     * collection.
     *
     * @attach {q}
     * @param name {String} Attribute name
     * @return {var} Attribute value
     */
    getAttribute : function(name){

      if(this[0]){

        return qx.bom.element.Attribute.get(this[0], name);
      };
      return null;
    },
    /**
     * Removes the given attribute from all elements in the collection
     *
     * @attach {q}
     * @param name {String} Attribute name
     * @return {q} The collection for chaining
     */
    removeAttribute : function(name){

      for(var i = 0;i < this.length;i++){

        qx.bom.element.Attribute.set(this[i], name, null);
      };
      return this;
    },
    /**
     * Sets multiple attributes for each item in the collection.
     *
     * @attach {q}
     * @param attributes {Map} A map of attribute name/value pairs
     * @return {q} The collection for chaining
     */
    setAttributes : function(attributes){

      for(var name in attributes){

        this.setAttribute(name, attributes[name]);
      };
      return this;
    },
    /**
     * Returns the values of multiple attributes for the first item in the collection
     *
     * @attach {q}
     * @param names {String[]} List of attribute names
     * @return {Map} Map of attribute name/value pairs
     */
    getAttributes : function(names){

      var attributes = {
      };
      for(var i = 0;i < names.length;i++){

        attributes[names[i]] = this.getAttribute(names[i]);
      };
      return attributes;
    },
    /**
     * Removes multiple attributes from each item in the collection.
     *
     * @attach {q}
     * @param attributes {String[]} List of attribute names
     * @return {q} The collection for chaining
     */
    removeAttributes : function(attributes){

      for(var i = 0,l = attributes.length;i < l;i++){

        this.removeAttribute(attributes[i]);
      };
      return this;
    },
    /**
     * Sets a property on each item in the collection
     *
     * @attach {q}
     * @param name {String} Property name
     * @param value {var} Property value
     * @return {q} The collection for chaining
     */
    setProperty : function(name, value){

      for(var i = 0;i < this.length;i++){

        this[i][name] = value;
      };
      return this;
    },
    /**
     * Returns the value of the given property for the first item in the
     * collection
     *
     * @attach {q}
     * @param name {String} Property name
     * @return {var} Property value
     */
    getProperty : function(name){

      if(this[0]){

        return this[0][name];
      };
      return null;
    },
    /**
     * Sets multiple properties for each item in the collection.
     *
     * @attach {q}
     * @param properties {Map} A map of property name/value pairs
     * @return {q} The collection for chaining
     */
    setProperties : function(properties){

      for(var name in properties){

        this.setProperty(name, properties[name]);
      };
      return this;
    },
    /**
     * Returns the values of multiple properties for the first item in the collection
     *
     * @attach {q}
     * @param names {String[]} List of property names
     * @return {Map} Map of property name/value pairs
     */
    getProperties : function(names){

      var properties = {
      };
      for(var i = 0;i < names.length;i++){

        properties[names[i]] = this.getProperty(names[i]);
      };
      return properties;
    },
    /**
     * Returns the currently configured value for the first item in the collection.
     * Works with simple input fields as well as with select boxes or option
     * elements. Returns an array for select boxes with multi selection. In all
     * other cases, a string is returned.
     *
     * @attach {q}
     * @return {String|Array}
     */
    getValue : function(){

      if(this[0]){

        return qx.bom.Input.getValue(this[0]);
      };
      return null;
    },
    /**
     * Applies the given value to each element in the collection.
     * Normally the value is given as a string/number value and applied to the
     * field content (textfield, textarea) or used to detect whether the field
     * is checked (checkbox, radiobutton).
     * Supports array values for selectboxes (multiple selection) and checkboxes
     * or radiobuttons (for convenience).
     * Please note: To modify the value attribute of a checkbox or radiobutton
     * use @link{#set} instead.
     *
     * @attach {q}
     * @param value {String|Number|Array} The value to apply
     * @return {q} The collection for chaining
     */
    setValue : function(value){

      for(var i = 0,l = this.length;i < l;i++){

        qx.bom.Input.setValue(this[i], value);
      };
      return this;
    }
  },
  defer : function(statics){

    q.$attach({
      "getHtml" : statics.getHtml,
      "setHtml" : statics.setHtml,
      "getAttribute" : statics.getAttribute,
      "setAttribute" : statics.setAttribute,
      "removeAttribute" : statics.removeAttribute,
      "getAttributes" : statics.getAttributes,
      "setAttributes" : statics.setAttributes,
      "removeAttributes" : statics.removeAttributes,
      "getProperty" : statics.getProperty,
      "setProperty" : statics.setProperty,
      "getProperties" : statics.getProperties,
      "setProperties" : statics.setProperties,
      "getValue" : statics.getValue,
      "setValue" : statics.setValue
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

   ======================================================================

   This class contains code based on the following work:

   * jQuery
     http://jquery.com
     Version 1.3.1

     Copyright:
       2009 John Resig

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/* ************************************************************************
#require(qx.lang.Array#contains)
************************************************************************ */
/**
 * Cross browser abstractions to work with input elements.
 */
qx.Bootstrap.define("qx.bom.Input", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** {Map} Internal data structures with all supported input types */
    __types : {
      text : 1,
      textarea : 1,
      select : 1,
      checkbox : 1,
      radio : 1,
      password : 1,
      hidden : 1,
      submit : 1,
      image : 1,
      file : 1,
      search : 1,
      reset : 1,
      button : 1
    },
    /**
     * Creates an DOM input/textarea/select element.
     *
     * Attributes may be given directly with this call. This is critical
     * for some attributes e.g. name, type, ... in many clients.
     *
     * Note: <code>select</code> and <code>textarea</code> elements are created
     * using the identically named <code>type</code>.
     *
     * @param type {String} Any valid type for HTML, <code>select</code>
     *   and <code>textarea</code>
     * @param attributes {Map} Map of attributes to apply
     * @param win {Window} Window to create the element for
     * @return {Element} The created input node
     */
    create : function(type, attributes, win){

      {
      };
      // Work on a copy to not modify given attributes map
      var attributes = attributes ? qx.lang.Object.clone(attributes) : {
      };
      var tag;
      if(type === "textarea" || type === "select"){

        tag = type;
      } else {

        tag = "input";
        attributes.type = type;
      };
      return qx.dom.Element.create(tag, attributes, win);
    },
    /**
     * Applies the given value to the element.
     *
     * Normally the value is given as a string/number value and applied
     * to the field content (textfield, textarea) or used to
     * detect whether the field is checked (checkbox, radiobutton).
     *
     * Supports array values for selectboxes (multiple-selection)
     * and checkboxes or radiobuttons (for convenience).
     *
     * Please note: To modify the value attribute of a checkbox or
     * radiobutton use {@link qx.bom.element.Attribute#set} instead.
     *
     * @param element {Element} element to update
     * @param value {String|Number|Array} the value to apply
     */
    setValue : function(element, value){

      var tag = element.nodeName.toLowerCase();
      var type = element.type;
      var Array = qx.lang.Array;
      var Type = qx.lang.Type;
      if(typeof value === "number"){

        value += "";
      };
      if((type === "checkbox" || type === "radio")){

        if(Type.isArray(value)){

          element.checked = Array.contains(value, element.value);
        } else {

          element.checked = element.value == value;
        };
      } else if(tag === "select"){

        var isArray = Type.isArray(value);
        var options = element.options;
        var subel,subval;
        for(var i = 0,l = options.length;i < l;i++){

          subel = options[i];
          subval = subel.getAttribute("value");
          if(subval == null){

            subval = subel.text;
          };
          subel.selected = isArray ? Array.contains(value, subval) : value == subval;
        };
        if(isArray && value.length == 0){

          element.selectedIndex = -1;
        };
      } else if((type === "text" || type === "textarea") && (qx.core.Environment.get("engine.name") == "mshtml")){

        // These flags are required to detect self-made property-change
        // events during value modification. They are used by the Input
        // event handler to filter events.
        element.$$inValueSet = true;
        element.value = value;
        element.$$inValueSet = null;
      } else {

        element.value = value;
      };;
    },
    /**
     * Returns the currently configured value.
     *
     * Works with simple input fields as well as with
     * select boxes or option elements.
     *
     * Returns an array in cases of multi-selection in
     * select boxes but in all other cases a string.
     *
     * @param element {Element} DOM element to query
     * @return {String|Array} The value of the given element
     */
    getValue : function(element){

      var tag = element.nodeName.toLowerCase();
      if(tag === "option"){

        return (element.attributes.value || {
        }).specified ? element.value : element.text;
      };
      if(tag === "select"){

        var index = element.selectedIndex;
        // Nothing was selected
        if(index < 0){

          return null;
        };
        var values = [];
        var options = element.options;
        var one = element.type == "select-one";
        var clazz = qx.bom.Input;
        var value;
        // Loop through all the selected options
        for(var i = one ? index : 0,max = one ? index + 1 : options.length;i < max;i++){

          var option = options[i];
          if(option.selected){

            // Get the specifc value for the option
            value = clazz.getValue(option);
            // We don't need an array for one selects
            if(one){

              return value;
            };
            // Multi-Selects return an array
            values.push(value);
          };
        };
        return values;
      } else {

        return (element.value || "").replace(/\r/g, "");
      };
    },
    /**
     * Sets the text wrap behaviour of a text area element.
     * This property uses the attribute "wrap" respectively
     * the style property "whiteSpace"
     *
     * @signature function(element, wrap)
     * @param element {Element} DOM element to modify
     * @param wrap {Boolean} Whether to turn text wrap on or off.
     */
    setWrap : qx.core.Environment.select("engine.name", {
      "mshtml" : function(element, wrap){

        var wrapValue = wrap ? "soft" : "off";
        // Explicitly set overflow-y CSS property to auto when wrapped,
        // allowing the vertical scroll-bar to appear if necessary
        var styleValue = wrap ? "auto" : "";
        element.wrap = wrapValue;
        element.style.overflowY = styleValue;
      },
      "gecko|webkit" : function(element, wrap){

        var wrapValue = wrap ? "soft" : "off";
        var styleValue = wrap ? "" : "auto";
        element.setAttribute("wrap", wrapValue);
        element.style.overflow = styleValue;
      },
      "default" : function(element, wrap){

        element.style.whiteSpace = wrap ? "normal" : "nowrap";
      }
    })
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * DOM manipulation module
 */
qx.Bootstrap.define("qx.module.Manipulating", {
  statics : {
    /**
     * Creates a new collection from the given argument. This can either be an
     * HTML string, a single DOM element or an array of elements
     *
     * @attachStatic{q}
     * @param html {String|Element[]} HTML string or DOM element(s)
     * @return {q} Collection of elements
     */
    create : function(html){

      return q.$init(qx.bom.Html.clean([html]));
    },
    /**
     * Clones the items in the current collection and returns them in a new set.
     * Event listeners can also be cloned.
     *
     * @attach{q}
     * @param events {Boolean} clone event listeners. Default: <pre>false</pre>
     * @return {q} New collection with clones
     */
    clone : function(events){

      var clones = [];
      for(var i = 0;i < this.length;i++){

        clones[i] = this[i].cloneNode(true);
      };
      if(events === true && this.copyEventsTo){

        this.copyEventsTo(clones);
      };
      return q(clones);
    },
    /**
     * Appends content to each element in the current set. Accepts an HTML string,
     * a single DOM element or an array of elements
     *
     * @attach{q}
     * @param html {String|Element[]} HTML string or DOM element(s) to append
     * @return {q} The collection for chaining
     */
    append : function(html){

      var arr = qx.bom.Html.clean([html]);
      var children = q.$init(arr);
      for(var i = 0,l = this.length;i < l;i++){

        for(var j = 0,m = children.length;j < m;j++){

          if(i == 0){

            // first parent: move the target node(s)
            qx.dom.Element.insertEnd(children[j], this[i]);
          } else {

            qx.dom.Element.insertEnd(children.eq(j).clone(true)[0], this[i]);
          };
        };
      };
      return this;
    },
    /**
     * Appends all items in the collection to the specified parents. If multiple
     * parents are given, the items will be moved to the first parent, while
     * clones of the items will be appended to subsequent parents.
     *
     * @attach{q}
     * @param parent {String|Element[]} Parent selector expression or list of
     * parent elements
     * @return {q} The collection for chaining
     */
    appendTo : function(parent){

      parent = qx.module.Manipulating.__getElementArray(parent);
      for(var i = 0,l = parent.length;i < l;i++){

        for(var j = 0,m = this.length;j < m;j++){

          if(i == 0){

            // first parent: move the target node(s)
            qx.dom.Element.insertEnd(this[j], parent[i]);
          } else {

            // further parents: clone the target node(s)
            qx.dom.Element.insertEnd(this.eq(j).clone(true)[0], parent[i]);
          };
        };
      };
      return this;
    },
    /**
     * Inserts the current collection before each target item. The collection
     * items are moved before the first target. For subsequent targets,
     * clones of the collection items are created and inserted.
     *
     * @attach{q}
     * @param target {String|Element} Selector expression or DOM element
     * @return {q} The collection for chaining
     */
    insertBefore : function(target){

      target = qx.module.Manipulating.__getElementArray(target);
      for(var i = 0,l = target.length;i < l;i++){

        for(var j = 0,m = this.length;j < m;j++){

          if(i == 0){

            // first target: move the target node(s)
            qx.dom.Element.insertBefore(this[j], target[i]);
          } else {

            // further targets: clone the target node(s)
            qx.dom.Element.insertBefore(this.eq(j).clone(true)[0], target[i]);
          };
        };
      };
      return this;
    },
    /**
     * Inserts the current collection after each target item. The collection
     * items are moved after the first target. For subsequent targets,
     * clones of the collection items are created and inserted.
     *
     * @attach{q}
     * @param target {String|Element} Selector expression or DOM element
     * @return {q} The collection for chaining
     */
    insertAfter : function(target){

      target = qx.module.Manipulating.__getElementArray(target);
      for(var i = 0,l = target.length;i < l;i++){

        for(var j = this.length - 1;j >= 0;j--){

          if(i == 0){

            // first target: move the target node(s)
            qx.dom.Element.insertAfter(this[j], target[i]);
          } else {

            // further targets: clone the target node(s)
            qx.dom.Element.insertAfter(this.eq(j).clone(true)[0], target[i]);
          };
        };
      };
      return this;
    },
    /**
     * Returns an array from a selector expression or a single element
     *
     * @attach{q}
     * @param arg {String|Element} Selector expression or DOM element
     * @return {Element[]} Array of elements
     * @internal
     */
    __getElementArray : function(arg){

      if(!qx.lang.Type.isArray(arg)){

        var fromSelector = q(arg);
        arg = fromSelector.length > 0 ? fromSelector : [arg];
      };
      return arg;
    },
    /**
     * Wraps each element in the collection in a copy of an HTML structure.
     * Elements will be appended to the deepest nested element in the structure
     * as determined by a depth-first search.
     *
     * @attach{q}
     * @param wrapper {var} Selector expression, HTML string, DOM element or
     * list of DOM elements
     * @return {q} The collection for chaining
     */
    wrap : function(wrapper){

      var wrapper = qx.module.Manipulating.__getCollectionFromArgument(wrapper);
      if(wrapper.length == 0 || !qx.dom.Node.isElement(wrapper[0])){

        return this;
      };
      for(var i = 0,l = this.length;i < l;i++){

        var clonedwrapper = wrapper.eq(0).clone(true);
        qx.dom.Element.insertAfter(clonedwrapper[0], this[i]);
        var innermost = qx.module.Manipulating.__getInnermostElement(clonedwrapper[0]);
        qx.dom.Element.insertEnd(this[i], innermost);
      };
      return this;
    },
    /**
     * Creates a new collection from the given argument
     * @param arg {var} Selector expression, HTML string, DOM element or list of
     * DOM elements
     * @return {q} Collection
     * @internal
     */
    __getCollectionFromArgument : function(arg){

      var coll;
      // Collection/array of DOM elements
      if(qx.lang.Type.isArray(arg)){

        coll = q(arg);
      } else {

        var arr = qx.bom.Html.clean([arg]);
        if(arr.length > 0 && qx.dom.Node.isElement(arr[0])){

          coll = q(arr);
        } else {

          coll = q(arg);
        };
      };
      return coll;
    },
    /**
     * Returns the innermost element of a DOM tree as determined by a simple
     * depth-first search.
     *
     * @param element {Element} Root element
     * @return {Element} innermost element
     * @internal
     */
    __getInnermostElement : function(element){

      if(element.childNodes.length == 0){

        return element;
      };
      for(var i = 0,l = element.childNodes.length;i < l;i++){

        if(element.childNodes[i].nodeType === 1){

          return this.__getInnermostElement(element.childNodes[i]);
        };
      };
      return element;
    },
    /**
     * Removes each element in the current collection from the DOM
     *
     * @attach{q}
     * @return {q} The collection for chaining
     */
    remove : function(){

      for(var i = 0;i < this.length;i++){

        qx.dom.Element.remove(this[i]);
      };
      return this;
    },
    /**
     * Removes all content from the elements in the collection
     *
     * @attach{q}
     * @return {q} The collection for chaining
     */
    empty : function(){

      for(var i = 0;i < this.length;i++){

        this[i].innerHTML = "";
      };
      return this;
    },
    /**
     * Inserts content before each element in the collection. This can either
     * be an HTML string, an array of HTML strings, a single DOM element or an
     * array of elements.
     *
     * @attach{q}
     * @param args {String[]|Element[]} HTML string(s) or DOM element(s)
     * @return {q} The collection for chaining
     */
    before : function(args){

      if(!qx.lang.Type.isArray(args)){

        args = [args];
      };
      var fragment = document.createDocumentFragment();
      qx.bom.Html.clean(args, document, fragment);
      this.forEach(function(item, index){

        var kids = qx.lang.Array.cast(fragment.childNodes, Array);
        for(var i = 0,l = kids.length;i < l;i++){

          var child;
          if(index < this.length - 1){

            child = kids[i].cloneNode(true);
          } else {

            child = kids[i];
          };
          item.parentNode.insertBefore(child, item);
        };
      }, this);
      return this;
    },
    /**
     * Inserts content after each element in the collection. This can either
     * be an HTML string, an array of HTML strings, a single DOM element or an
     * array of elements.
     *
     * @attach{q}
     * @param args {String[]|Element[]} HTML string(s) or DOM element(s)
     * @return {q} The collection for chaining
     */
    after : function(args){

      if(!qx.lang.Type.isArray(args)){

        args = [args];
      };
      var fragment = document.createDocumentFragment();
      qx.bom.Html.clean(args, document, fragment);
      this.forEach(function(item, index){

        var kids = qx.lang.Array.cast(fragment.childNodes, Array);
        for(var i = kids.length - 1;i >= 0;i--){

          var child;
          if(index < this.length - 1){

            child = kids[i].cloneNode(true);
          } else {

            child = kids[i];
          };
          item.parentNode.insertBefore(child, item.nextSibling);
        };
      }, this);
      return this;
    },
    /**
     * Returns the left scroll position of the first element in the collection.
     *
     * @attach{q}
     * @return {Number} Current left scroll position
     */
    getScrollLeft : function(){

      var obj = this[0];
      if(!obj){

        return null;
      };
      var Node = qx.dom.Node;
      if(Node.isWindow(obj) || Node.isDocument(obj)){

        return qx.bom.Viewport.getScrollLeft();
      };
      return obj.scrollLeft;
    },
    /**
     * Returns the top scroll position of the first element in the collection.
     *
     * @attach{q}
     * @return {Number} Current top scroll position
     */
    getScrollTop : function(){

      var obj = this[0];
      if(!obj){

        return null;
      };
      var Node = qx.dom.Node;
      if(Node.isWindow(obj) || Node.isDocument(obj)){

        return qx.bom.Viewport.getScrollTop();
      };
      return obj.scrollTop;
    },
    /**
     * Scrolls the elements of the collection to the given coordinate.
     *
     * @attach{q}
     * @param value {Number} Left scroll position
     * @return {q} The collection for chaining
     */
    setScrollLeft : function(value){

      var Node = qx.dom.Node;
      for(var i = 0,l = this.length,obj;i < l;i++){

        obj = this[i];
        if(Node.isElement(obj)){

          obj.scrollLeft = value;
        } else if(Node.isWindow(obj)){

          obj.scrollTo(value, this.getScrollTop(obj));
        } else if(Node.isDocument(obj)){

          Node.getWindow(obj).scrollTo(value, this.getScrollTop(obj));
        };;
      };
      return this;
    },
    /**
     * Scrolls the elements of the collection to the given coordinate.
     *
     * @attach{q}
     * @param value {Number} Top scroll position
     * @return {q} The collection for chaining
     */
    setScrollTop : function(value){

      var Node = qx.dom.Node;
      for(var i = 0,l = this.length,obj;i < l;i++){

        obj = this[i];
        if(Node.isElement(obj)){

          obj.scrollTop = value;
        } else if(Node.isWindow(obj)){

          obj.scrollTo(this.getScrollLeft(obj), value);
        } else if(Node.isDocument(obj)){

          Node.getWindow(obj).scrollTo(this.getScrollLeft(obj), value);
        };;
      };
      return this;
    },
    /**
     * Focuses the first element in the collection
     *
     * @attach{q}
     * @return {q} The collection for chaining
     */
    focus : function(){

      try{

        this[0].focus();
      } catch(ex) {
      };
      return this;
    },
    /**
     * Blurs each element in the collection
     *
     * @attach{q}
     * @return {q} The collection for chaining
     */
    blur : function(){

      this.forEach(function(item, index){

        try{

          item.blur();
        } catch(ex) {
        };
      });
      return this;
    }
  },
  defer : function(statics){

    q.$attachStatic({
      "create" : statics.create
    });
    q.$attach({
      "append" : statics.append,
      "appendTo" : statics.appendTo,
      "remove" : statics.remove,
      "empty" : statics.empty,
      "before" : statics.before,
      "insertBefore" : statics.insertBefore,
      "after" : statics.after,
      "insertAfter" : statics.insertAfter,
      "wrap" : statics.wrap,
      "clone" : statics.clone,
      "getScrollLeft" : statics.getScrollLeft,
      "setScrollLeft" : statics.setScrollLeft,
      "getScrollTop" : statics.getScrollTop,
      "setScrollTop" : statics.setScrollTop,
      "focus" : statics.focus,
      "blur" : statics.blur
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 Sebastian Werner, http://sebastian-werner.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * jQuery
     http://jquery.com
     Version 1.3.1

     Copyright:
       2009 John Resig

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/**
 * This class is mainly a convenience wrapper for DOM elements to
 * qooxdoo's event system.
 */
qx.Bootstrap.define("qx.bom.Html", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Helper method for XHTML replacement.
     *
     * @param all {String} Complete string
     * @param front {String} Front of the match
     * @param tag {String} Tag name
     * @return {String} XHTML corrected tag
     */
    __fixNonDirectlyClosableHelper : function(all, front, tag){

      return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? all : front + "></" + tag + ">";
    },
    /** {Map} Contains wrap fragments for specific HTML matches */
    __convertMap : {
      opt : [1, "<select multiple='multiple'>", "</select>"],
      // option or optgroup
      leg : [1, "<fieldset>", "</fieldset>"],
      table : [1, "<table>", "</table>"],
      tr : [2, "<table><tbody>", "</tbody></table>"],
      td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      def : qx.core.Environment.select("engine.name", {
        "mshtml" : [1, "div<div>", "</div>"],
        "default" : null
      })
    },
    /**
     * Translates a HTML string into an array of elements.
     *
     * @param html {String} HTML string
     * @param context {Document} Context document in which (helper) elements should be created
     * @return {Array} List of resulting elements
     */
    __convertHtmlString : function(html, context){

      var div = context.createElement("div");
      // Fix "XHTML"-style tags in all browsers
      // Replaces tags which are not allowed to be directly closed like
      // <code>div</code> or <code>p</code>. They are patched to use an
      // open and close tag instead e.g. <p> => <p></p>
      html = html.replace(/(<(\w+)[^>]*?)\/>/g, this.__fixNonDirectlyClosableHelper);
      // Trim whitespace, otherwise indexOf won't work as expected
      var tags = html.replace(/^\s+/, "").substring(0, 5).toLowerCase();
      // Auto-wrap content into required DOM structure
      var wrap,map = this.__convertMap;
      if(!tags.indexOf("<opt")){

        wrap = map.opt;
      } else if(!tags.indexOf("<leg")){

        wrap = map.leg;
      } else if(tags.match(/^<(thead|tbody|tfoot|colg|cap)/)){

        wrap = map.table;
      } else if(!tags.indexOf("<tr")){

        wrap = map.tr;
      } else if(!tags.indexOf("<td") || !tags.indexOf("<th")){

        wrap = map.td;
      } else if(!tags.indexOf("<col")){

        wrap = map.col;
      } else {

        wrap = map.def;
      };;;;;
      // Omit string concat when no wrapping is needed
      if(wrap){

        // Go to html and back, then peel off extra wrappers
        div.innerHTML = wrap[1] + html + wrap[2];
        // Move to the right depth
        var depth = wrap[0];
        while(depth--){

          div = div.lastChild;
        };
      } else {

        div.innerHTML = html;
      };
      // Fix IE specific bugs
      if((qx.core.Environment.get("engine.name") == "mshtml")){

        // Remove IE's autoinserted <tbody> from table fragments
        // String was a <table>, *may* have spurious <tbody>
        var hasBody = /<tbody/i.test(html);
        // String was a bare <thead> or <tfoot>
        var tbody = !tags.indexOf("<table") && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] == "<table>" && !hasBody ? div.childNodes : [];
        for(var j = tbody.length - 1;j >= 0;--j){

          if(tbody[j].tagName.toLowerCase() === "tbody" && !tbody[j].childNodes.length){

            tbody[j].parentNode.removeChild(tbody[j]);
          };
        };
        // IE completely kills leading whitespace when innerHTML is used
        if(/^\s/.test(html)){

          div.insertBefore(context.createTextNode(html.match(/^\s*/)[0]), div.firstChild);
        };
      };
      return qx.lang.Array.fromCollection(div.childNodes);
    },
    /**
     * Cleans-up the given HTML and append it to a fragment
     *
     * When no <code>context</code> is given the global document is used to
     * create new DOM elements.
     *
     * When a <code>fragment</code> is given the nodes are appended to this
     * fragment except the script tags. These are returned in a separate Array.
     *
     * Please note: HTML coming from user input must be validated prior
     * to passing it to this method. HTML is temporarily inserted to the DOM
     * using <code>innerHTML</code>. As a consequence, scripts included in
     * attribute event handlers may be executed.
     *
     * @param objs {Element[]|String[]} Array of DOM elements or HTML strings
     * @param context {Document?document} Context in which the elements should be created
     * @param fragment {Element?null} Document fragment to appends elements to
     * @return {Element[]} Array of elements (when a fragment is given it only contains script elements)
     */
    clean : function(objs, context, fragment){

      context = context || document;
      // !context.createElement fails in IE with an error but returns typeof 'object'
      if(typeof context.createElement === "undefined"){

        context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
      };
      // Fast-Path:
      // If a single string is passed in and it's a single tag
      // just do a createElement and skip the rest
      if(!fragment && objs.length === 1 && typeof objs[0] === "string"){

        var match = /^<(\w+)\s*\/?>$/.exec(objs[0]);
        if(match){

          return [context.createElement(match[1])];
        };
      };
      // Interate through items in incoming array
      var obj,ret = [];
      for(var i = 0,l = objs.length;i < l;i++){

        obj = objs[i];
        // Convert HTML string into DOM nodes
        if(typeof obj === "string"){

          obj = this.__convertHtmlString(obj, context);
        };
        // Append or merge depending on type
        if(obj.nodeType){

          ret.push(obj);
        } else if(obj instanceof qx.type.BaseArray){

          ret.push.apply(ret, Array.prototype.slice.call(obj, 0));
        } else if(obj.toElement){

          ret.push(obj.toElement());
        } else {

          ret.push.apply(ret, obj);
        };;
      };
      // Append to fragment and filter out scripts... or...
      if(fragment){

        var scripts = [],LArray = qx.lang.Array,elem,temp;
        for(var i = 0;ret[i];i++){

          elem = ret[i];
          if(elem.nodeType == 1 && elem.tagName.toLowerCase() === "script" && (!elem.type || elem.type.toLowerCase() === "text/javascript")){

            // Trying to remove the element from DOM
            if(elem.parentNode){

              elem.parentNode.removeChild(ret[i]);
            };
            // Store in script list
            scripts.push(elem);
          } else {

            if(elem.nodeType === 1){

              // Recursively search for scripts and append them to the list of elements to process
              temp = LArray.fromCollection(elem.getElementsByTagName("script"));
              ret.splice.apply(ret, [i + 1, 0].concat(temp));
            };
            // Finally append element to fragment
            fragment.appendChild(elem);
          };
        };
        return scripts;
      };
      // Otherwise return the array of all elements
      return ret;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.module.Environment)
#require(qx.module.Manipulating)
#require(qx.module.Traversing)
#require(qx.module.Css)
#require(qx.module.Attribute)
************************************************************************ */
/**
 * Provides a way to block elements so they will no longer receive (native)
 * events by overlaying them with a div.
 * For Internet Explorer, an additional Iframe element will be overlayed since
 * native form controls cannot be blocked otherwise.
 *
 * The blocker can also be applied to the entire document, e.g.:
 *
 * <pre class="javascript">
 * q(document).block();
 * </pre>
 */
q.define("qx.module.Blocker", {
  statics : {
    /**
     * Attaches a blocker div (and additionally a blocker Iframe for IE) to the
     * given element.
     *
     * @param item {DOMElement|DOMDocument} The element to be overlaid with the blocker
     * @param color {String} The color for the blocker element (any CSS color value)
     * @param opacity {Number} The CSS opacity value for the blocker
     * @param zIndex {Number} The zIndex value for the blocker
     */
    __attachBlocker : function(item, color, opacity, zIndex){

      var win = q.getWindow(item);
      var isDocument = q.isDocument(item);
      if(!item.__blocker){

        item.__blocker = {
          div : q.create("<div/>")
        };
        if((q.env.get("engine.name") == "mshtml")){

          item.__blocker.iframe = qx.module.Blocker.__getIframeElement(win);
        };
      };
      qx.module.Blocker.__styleBlocker(item, color, opacity, zIndex, isDocument);
      item.__blocker.div.appendTo(win.document.body);
      if(item.__blocker.iframe){

        item.__blocker.iframe.appendTo(win.document.body);
      };
      if(isDocument){

        q(win).on("resize", qx.module.Blocker.__onWindowResize);
      };
    },
    /**
     * Styles the blocker element(s)
     *
     * @param item {DOMElement|DOMDocument} The element to be overlaid with the blocker
     * @param color {String} The color for the blocker element (any CSS color value)
     * @param opacity {Number} The CSS opacity value for the blocker
     * @param zIndex {Number} The zIndex value for the blocker
     * @param isDocument {Boolean} Whether the item is a document node
     */
    __styleBlocker : function(item, color, opacity, zIndex, isDocument){

      var qItem = q(item);
      var styles = {
        "zIndex" : zIndex,
        "display" : "block",
        "position" : "absolute",
        "backgroundColor" : color,
        "opacity" : opacity,
        "width" : qItem.getWidth() + "px",
        "height" : qItem.getHeight() + "px"
      };
      if(isDocument){

        styles.top = 0 + "px";
        styles.left = 0 + "px";
      } else {

        var pos = qItem.getOffset();
        styles.top = pos.top + "px";
        styles.left = pos.left + "px";
      };
      item.__blocker.div.setStyles(styles);
      if(item.__blocker.iframe){

        styles.zIndex = styles.zIndex - 1;
        styles.backgroundColor = "transparent";
        styles.opacity = 0;
        item.__blocker.iframe.setStyles(styles);
      };
    },
    /**
     * Creates an iframe element used as a blocker in IE
     *
     * @param win {Window} The parent window of the item to be blocked
     * @return {Iframe} Iframe blocker
     */
    __getIframeElement : function(win){

      var iframe = q.create('<iframe></iframe>');
      iframe.setAttributes({
        frameBorder : 0,
        frameSpacing : 0,
        marginWidth : 0,
        marginHeight : 0,
        hspace : 0,
        vspace : 0,
        border : 0,
        allowTransparency : false,
        src : "javascript:false"
      });
      return iframe;
    },
    /**
     * Callback for the Window's resize event. Applies the window's new sizes
     * to the blocker element(s).
     *
     * @param ev {Event} resize event
     */
    __onWindowResize : function(ev){

      var win = this[0];
      var size = {
        width : this.getWidth() + "px",
        height : this.getHeight() + "px"
      };
      q(win.document.__blocker.div).setStyles(size);
      if(win.document.__blocker.iframe){

        q(win.document.__blocker.iframe).setStyles(size);
      };
    },
    /**
     * Removes the given item's blocker element(s) from the DOM
     *
     * @param item {DOMElement} Blocked element
     * @param index {Number} index of the item in the collection
     */
    __detachBlocker : function(item, index){

      if(!item.__blocker){

        return;
      };
      item.__blocker.div.remove();
      if(item.__blocker.iframe){

        item.__blocker.iframe.remove();
      };
      if(q.isDocument(item)){

        q(q.getWindow(item)).off("resize", qx.module.Blocker.__onWindowResize);
      };
    },
    /**
     * Adds an overlay to all items in the collection that intercepts mouse
     * events.
     *
     * @attach {q}
     * @param color {String ? transparent} The color for the blocker element (any CSS color value)
     * @param opacity {Float ? 0} The CSS opacity value for the blocker
     * @param zIndex {Number ? 10000} The zIndex value for the blocker
     * @return {q} The collection for chaining
     */
    block : function(color, opacity, zIndex){

      if(!this[0]){

        return this;
      };
      color = color || "transparent";
      opacity = opacity || 0;
      zIndex = zIndex || 10000;
      this.forEach(function(item, index){

        qx.module.Blocker.__attachBlocker(item, color, opacity, zIndex);
      });
      return this;
    },
    /**
     * Removes the blockers from all items in the collection
     *
     * @attach {q}
     * @return {q} The collection for chaining
     */
    unblock : function(){

      if(!this[0]){

        return this;
      };
      this.forEach(qx.module.Blocker.__detachBlocker);
      return this;
    }
  },
  defer : function(statics){

    q.$attach({
      "block" : statics.block,
      "unblock" : statics.unblock
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Abstract class to compute the position of an object on one axis.
 */
qx.Bootstrap.define("qx.util.placement.AbstractAxis", {
  extend : Object,
  statics : {
    /**
     * Computes the start of the object on the axis
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param areaSize {Integer} Size of the axis.
     * @param position {String} Alignment of the object on the target. Valid values are
     *   <ul>
     *   <li><code>edge-start</code> The object is placed before the target</li>
     *   <li><code>edge-end</code> The object is placed after the target</li>
     *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
     *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
     *   </ul>
     * @return {Integer} The computed start position of the object.
     */
    computeStart : function(size, target, offsets, areaSize, position){

      throw new Error("abstract method call!");
    },
    /**
     * Computes the start of the object by taking only the attachment and
     * alignment into account. The object by be not fully visible.
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param position {String} Accepts the same values as the <code> position</code>
     *   argument of {@link #computeStart}.
     * @return {Integer} The computed start position of the object.
     */
    _moveToEdgeAndAlign : function(size, target, offsets, position){

      switch(position){case "edge-start":
      return target.start - offsets.end - size;case "edge-end":
      return target.end + offsets.start;case "align-start":
      return target.start + offsets.start;case "align-end":
      return target.end - offsets.end - size;};
    },
    /**
     * Whether the object specified by <code>start</code> and <code>size</code>
     * is completely inside of the axis' range..
     *
     * @param start {Integer} Computed start position of the object
     * @param size {Integer} Size of the object
     * @param areaSize {Integer} The size of the axis
     * @return {Boolean} Whether the object is inside of the axis' range
     */
    _isInRange : function(start, size, areaSize){

      return start >= 0 && start + size <= areaSize;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Places the object directly at the specified position. It is not moved if
 * parts of the object are outside of the axis' range.
 */
qx.Bootstrap.define("qx.util.placement.DirectAxis", {
  statics : {
    /**
     * Computes the start of the object by taking only the attachment and
     * alignment into account. The object by be not fully visible.
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param position {String} Accepts the same values as the <code> position</code>
     *   argument of {@link #computeStart}.
     * @return {Integer} The computed start position of the object.
     */
    _moveToEdgeAndAlign : qx.util.placement.AbstractAxis._moveToEdgeAndAlign,
    /**
     * Computes the start of the object on the axis
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param areaSize {Integer} Size of the axis.
     * @param position {String} Alignment of the object on the target. Valid values are
     *   <ul>
     *   <li><code>edge-start</code> The object is placed before the target</li>
     *   <li><code>edge-end</code> The object is placed after the target</li>
     *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
     *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
     *   </ul>
     * @return {Integer} The computed start position of the object.
     */
    computeStart : function(size, target, offsets, areaSize, position){

      return this._moveToEdgeAndAlign(size, target, offsets, position);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Places the object to the target. If parts of the object are outside of the
 * range this class places the object at the best "edge", "alignment"
 * combination so that the overlap between object and range is maximized.
 */
qx.Bootstrap.define("qx.util.placement.KeepAlignAxis", {
  statics : {
    /**
     * Computes the start of the object by taking only the attachment and
     * alignment into account. The object by be not fully visible.
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param position {String} Accepts the same values as the <code> position</code>
     *   argument of {@link #computeStart}.
     * @return {Integer} The computed start position of the object.
     */
    _moveToEdgeAndAlign : qx.util.placement.AbstractAxis._moveToEdgeAndAlign,
    /**
     * Whether the object specified by <code>start</code> and <code>size</code>
     * is completely inside of the axis' range..
     *
     * @param start {Integer} Computed start position of the object
     * @param size {Integer} Size of the object
     * @param areaSize {Integer} The size of the axis
     * @return {Boolean} Whether the object is inside of the axis' range
     */
    _isInRange : qx.util.placement.AbstractAxis._isInRange,
    /**
     * Computes the start of the object on the axis
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param areaSize {Integer} Size of the axis.
     * @param position {String} Alignment of the object on the target. Valid values are
     *   <ul>
     *   <li><code>edge-start</code> The object is placed before the target</li>
     *   <li><code>edge-end</code> The object is placed after the target</li>
     *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
     *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
     *   </ul>
     * @return {Integer} The computed start position of the object.
     */
    computeStart : function(size, target, offsets, areaSize, position){

      var start = this._moveToEdgeAndAlign(size, target, offsets, position);
      var range1End,range2Start;
      if(this._isInRange(start, size, areaSize)){

        return start;
      };
      if(position == "edge-start" || position == "edge-end"){

        range1End = target.start - offsets.end;
        range2Start = target.end + offsets.start;
      } else {

        range1End = target.end - offsets.end;
        range2Start = target.start + offsets.start;
      };
      if(range1End > areaSize - range2Start){

        start = range1End - size;
      } else {

        start = range2Start;
      };
      return start;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Places the object according to the target. If parts of the object are outside
 * of the axis' range the object's start is adjusted so that the overlap between
 * the object and the axis is maximized.
 */
qx.Bootstrap.define("qx.util.placement.BestFitAxis", {
  statics : {
    /**
     * Whether the object specified by <code>start</code> and <code>size</code>
     * is completely inside of the axis' range..
     *
     * @param start {Integer} Computed start position of the object
     * @param size {Integer} Size of the object
     * @param areaSize {Integer} The size of the axis
     * @return {Boolean} Whether the object is inside of the axis' range
     */
    _isInRange : qx.util.placement.AbstractAxis._isInRange,
    /**
     * Computes the start of the object by taking only the attachment and
     * alignment into account. The object by be not fully visible.
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param position {String} Accepts the same values as the <code> position</code>
     *   argument of {@link #computeStart}.
     * @return {Integer} The computed start position of the object.
     */
    _moveToEdgeAndAlign : qx.util.placement.AbstractAxis._moveToEdgeAndAlign,
    /**
     * Computes the start of the object on the axis
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param areaSize {Integer} Size of the axis.
     * @param position {String} Alignment of the object on the target. Valid values are
     *   <ul>
     *   <li><code>edge-start</code> The object is placed before the target</li>
     *   <li><code>edge-end</code> The object is placed after the target</li>
     *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
     *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
     *   </ul>
     * @return {Integer} The computed start position of the object.
     */
    computeStart : function(size, target, offsets, areaSize, position){

      var start = this._moveToEdgeAndAlign(size, target, offsets, position);
      if(this._isInRange(start, size, areaSize)){

        return start;
      };
      if(start < 0){

        start = Math.min(0, areaSize - size);
      };
      if(start + size > areaSize){

        start = Math.max(0, areaSize - size);
      };
      return start;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.util.placement.KeepAlignAxis#computeStart)
#require(qx.util.placement.BestFitAxis#computeStart)
#require(qx.util.placement.DirectAxis#computeStart)
************************************************************************ */
/**
 * The Placement module provides a convenient way to align two elements relative
 * to each other using various pre-defined algorithms.
 */
q.define("qx.module.Placement", {
  statics : {
    /**
     * Moves the first element in the collection, aligning it with the given
     * target.
     *
     * @attach{q}
     * @param target {Element} Placement target
     * @param position {String} Alignment of the object with the target, any of
     * <code>"top-left"</code>, <code>"top-right"</code>, <code>"bottom-left"</code>,
     * <code>"bottom-right"</code>, <code>"left-top"</code>,
     * <code>"left-bottom"</code>, <code>"right-top"</code>,
     * <code>"right-bottom"</code>
     * @param offsets {Map?null} Map with the desired offsets between the two elements.
     * Must contain the keys <code>left</code>, <code>top</code>,
     * <code>right</code> and <code>bottom</code>
     * @param modeX {String?"direct"} Horizontal placement mode. Valid values are:
     *   <ul>
     *   <li><code>direct</code>: place the element directly at the given
     *   location.</li>
     *   <li><code>keep-align</code>: if the element is partially outside of the
     *   visible area, it is moved to the best fitting 'edge' and 'alignment' of
     *   the target.
     *   It is guaranteed the the new position attaches the object to one of the
     *   target edges and that it is aligned with a target edge.</li>
     *   <li><code>best-fit</code>: If the element is partially outside of the visible
     *   area, it is moved into the view port, ignoring any offset and position
     *   values.</li>
     *   </ul>
     * @param modeY {String?"direct"} Vertical placement mode. Accepts the same values as
     *   the 'modeX' argument.
     * @return {q} The collection for chaining
     */
    placeTo : function(target, position, offsets, modeX, modeY){

      if(!this[0]){

        return null;
      };
      var axes = {
        x : qx.module.Placement._getAxis(modeX),
        y : qx.module.Placement._getAxis(modeY)
      };
      var size = {
        width : this.getWidth(),
        height : this.getHeight()
      };
      var parent = this.getParents();
      var area = {
        width : parent.getWidth(),
        height : parent.getHeight()
      };
      var target = q(target).getOffset();
      var offsets = offsets || {
        top : 0,
        right : 0,
        bottom : 0,
        left : 0
      };
      var splitted = position.split("-");
      var edge = splitted[0];
      var align = splitted[1];
      var position = {
        x : qx.module.Placement._getPositionX(edge, align),
        y : qx.module.Placement._getPositionY(edge, align)
      };
      var newLocation = qx.module.Placement._computePlacement(axes, size, area, target, offsets, position);
      this.setStyles({
        position : "absolute",
        left : newLocation.left + "px",
        top : newLocation.top + "px"
      });
      return this;
    },
    /**
     * Returns the appropriate axis implementation for the given placement
     * mode
     *
     * @param mode {String} Placement mode
     * @return {Object} Placement axis class
     */
    _getAxis : function(mode){

      switch(mode){case "keep-align":
      return qx.util.placement.KeepAlignAxis;case "best-fit":
      return qx.util.placement.BestFitAxis;case "direct":default:
      return qx.util.placement.DirectAxis;};
    },
    /**
     * Returns the computed coordinates for the element to be placed
     *
     * @param axes {Map} Map with the keys <code>x</code> and <code>y</code>. Values
     * are the axis implementations
     * @param size {Map} Map with the keys <code>width</code> and <code>height</code>
     * containing the size of the placement target
     * @param area {Map} Map with the keys <code>width</code> and <code>height</code>
     * containing the size of the two elements' common parent (available space for
     * placement)
     * @param target {q} Collection containing the placement target
     * @param offsets {Map} Map of offsets (top, right, bottom, left)
     * @param position {Map} Map with the keys <code>x</code> and <code>y</code>,
     * containing the type of positioning for each axis
     * @return {Map} Map with the keys <code>left</code> and <code>top</code>
     * containing the computed coordinates to which the element should be moved
     */
    _computePlacement : function(axes, size, area, target, offsets, position){

      var left = axes.x.computeStart(size.width, {
        start : target.left,
        end : target.right
      }, {
        start : offsets.left,
        end : offsets.right
      }, area.width, position.x);
      var top = axes.y.computeStart(size.height, {
        start : target.top,
        end : target.bottom
      }, {
        start : offsets.top,
        end : offsets.bottom
      }, area.height, position.y);
      return {
        left : left,
        top : top
      };
    },
    /**
     * Returns the X axis positioning type for the given edge and alignment
     * values
     *
     * @param edge {String} edge value
     * @param align {String} align value
     * @return {String} X positioning type
     */
    _getPositionX : function(edge, align){

      if(edge == "left"){

        return "edge-start";
      } else if(edge == "right"){

        return "edge-end";
      } else if(align == "left"){

        return "align-start";
      } else if(align == "right"){

        return "align-end";
      };;;
    },
    /**
     * Returns the Y axis positioning type for the given edge and alignment
     * values
     *
     * @param edge {String} edge value
     * @param align {String} align value
     * @return {String} Y positioning type
     */
    _getPositionY : function(edge, align){

      if(edge == "top"){

        return "edge-start";
      } else if(edge == "bottom"){

        return "edge-end";
      } else if(align == "top"){

        return "align-start";
      } else if(align == "bottom"){

        return "align-end";
      };;;
    }
  },
  defer : function(statics){

    q.$attach({
      "placeTo" : statics.placeTo
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.module.Event)
************************************************************************ */
/**
 * Creates a touch event handler that fires high-level events such as "swipe"
 * based on low-level event sequences on the given element
 */
qx.Bootstrap.define("qx.module.event.TouchHandler", {
  statics : {
    /**
     * List of events that require a touch handler
     * @type Array
     */
    TYPES : ["tap", "swipe"],
    /**
     * Creates a touch handler for the given element when a touch event listener
     * is attached to it
     *
     * @param element {Element} DOM element
     */
    register : function(element){

      if(!element.__touchHandler){

        if(!element.__emitter){

          element.__emitter = new qx.event.Emitter();
        };
        element.__touchHandler = new qx.event.handler.TouchCore(element, element.__emitter);
      };
    },
    /**
     * Removes the touch event handler from the element if there are no more
     * touch event listeners attached to it
     * @param element {Element} DOM element
     */
    unregister : function(element){

      if(element.__touchHandler){

        if(!element.__emitter){

          element.__touchHandler = null;
        } else {

          var hasTouchListener = false;
          var listeners = element.__emitter.getListeners();
          qx.module.event.TouchHandler.TYPES.forEach(function(type){

            if(type in listeners && listeners[type].length > 0){

              hasTouchListener = true;
            };
          });
          if(!hasTouchListener){

            element.__touchHandler = null;
          };
        };
      };
    }
  },
  defer : function(statics){

    q.$registerEventHook(statics.TYPES, statics.register, statics.unregister);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)
     * Tino Butz (tbtz)
     * Christian Hagendorn (chris_schmidt)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#ignore(qx.event.type.Tap)
#ignore(qx.event.type.Swipe)
#ignore(qx.event.type)
#ignore(qx.event)
************************************************************************ */
/**
 * Listens for native touch events and fires composite events like "tap" and
 * "swipe"
 */
qx.Bootstrap.define("qx.event.handler.TouchCore", {
  extend : Object,
  statics : {
    /** {Integer} The maximum distance of a tap. Only if the x or y distance of
     *      the performed tap is less or equal the value of this constant, a tap
     *      event is fired.
     */
    TAP_MAX_DISTANCE : qx.core.Environment.get("os.name") != "android" ? 10 : 40,
    /** {Map} The direction of a swipe relative to the axis */
    SWIPE_DIRECTION : {
      x : ["left", "right"],
      y : ["up", "down"]
    },
    /** {Integer} The minimum distance of a swipe. Only if the x or y distance
     *      of the performed swipe is greater as or equal the value of this
     *      constant, a swipe event is fired.
     */
    SWIPE_MIN_DISTANCE : qx.core.Environment.get("os.name") != "android" ? 11 : 41,
    /** {Integer} The minimum velocity of a swipe. Only if the velocity of the
     *      performed swipe is greater as or equal the value of this constant, a
     *      swipe event is fired.
     */
    SWIPE_MIN_VELOCITY : 0
  },
  /**
   * Create a new instance
   *
   * @param target {Element} element on which to listen for native touch events
   * @param emitter {qx.event.Emitter} Event emitter object
   */
  construct : function(target, emitter){

    this.__target = target;
    this.__emitter = emitter;
    this._initTouchObserver();
  },
  members : {
    __target : null,
    __emitter : null,
    __onTouchEventWrapper : null,
    __originalTarget : null,
    __startPageX : null,
    __startPageY : null,
    __startTime : null,
    __isSingleTouchGesture : null,
    /*
    ---------------------------------------------------------------------------
      OBSERVER INIT
    ---------------------------------------------------------------------------
    */
    /**
     * Initializes the native touch event listeners.
     */
    _initTouchObserver : function(){

      this.__onTouchEventWrapper = qx.lang.Function.listener(this._onTouchEvent, this);
      var Event = qx.bom.Event;
      Event.addNativeListener(this.__target, "touchstart", this.__onTouchEventWrapper);
      Event.addNativeListener(this.__target, "touchmove", this.__onTouchEventWrapper);
      Event.addNativeListener(this.__target, "touchend", this.__onTouchEventWrapper);
      Event.addNativeListener(this.__target, "touchcancel", this.__onTouchEventWrapper);
    },
    /*
    ---------------------------------------------------------------------------
      OBSERVER STOP
    ---------------------------------------------------------------------------
    */
    /**
     * Disconnects the native touch event listeners.
     */
    _stopTouchObserver : function(){

      var Event = qx.bom.Event;
      Event.removeNativeListener(this.__target, "touchstart", this.__onTouchEventWrapper);
      Event.removeNativeListener(this.__target, "touchmove", this.__onTouchEventWrapper);
      Event.removeNativeListener(this.__target, "touchend", this.__onTouchEventWrapper);
      Event.removeNativeListener(this.__target, "touchcancel", this.__onTouchEventWrapper);
    },
    /*
    ---------------------------------------------------------------------------
      NATIVE EVENT OBSERVERS
    ---------------------------------------------------------------------------
    */
    /**
     * Handler for native touch events.
     *
     * @param domEvent {Event} The touch event from the browser.
     */
    _onTouchEvent : function(domEvent){

      this._commonTouchEventHandler(domEvent);
    },
    /**
     * Called by an event handler.
     *
     * @param domEvent {Event} DOM event
     * @param type {String ? null} type of the event
     */
    _commonTouchEventHandler : function(domEvent, type){

      var type = type || domEvent.type;
      if(type == "touchstart"){

        this.__originalTarget = this._getTarget(domEvent);
      };
      this._fireEvent(domEvent, type);
      this.__checkAndFireGesture(domEvent, type);
    },
    /*
    ---------------------------------------------------------------------------
      HELPERS
    ---------------------------------------------------------------------------
    */
    /**
     * Return the target of the event.
     *
     * @param domEvent {Event} DOM event
     * @return {Element} Event target
     */
    _getTarget : function(domEvent){

      var target = qx.bom.Event.getTarget(domEvent);
      // Text node. Fix Safari Bug, see http://www.quirksmode.org/js/events_properties.html
      if((qx.core.Environment.get("engine.name") == "webkit")){

        if(target && target.nodeType == 3){

          target = target.parentNode;
        };
      };
      return target;
    },
    /**
     * Fire a touch event with the given parameters
     *
     * @param domEvent {Event} DOM event
     * @param type {String ? null} type of the event
     * @param target {Element ? null} event target
     */
    _fireEvent : function(domEvent, type, target){

      if(!target){

        target = this._getTarget(domEvent);
      };
      var type = type || domEvent.type;
      if(target && target.nodeType && this.__emitter){

        this.__emitter.emit(type, domEvent);
      };
    },
    /**
     * Checks if a gesture was made and fires the gesture event.
     *
     * @param domEvent {Event} DOM event
     * @param type {String ? null} type of the event
     * @param target {Element ? null} event target
     */
    __checkAndFireGesture : function(domEvent, type, target){

      if(!target){

        target = this._getTarget(domEvent);
      };
      var type = type || domEvent.type;
      if(type == "touchstart"){

        this.__gestureStart(domEvent, target);
      } else if(type == "touchmove"){

        this.__gestureChange(domEvent, target);
      } else if(type == "touchend"){

        this.__gestureEnd(domEvent, target);
      };;
    },
    /**
     * Helper method for gesture start.
     *
     * @param domEvent {Event} DOM event
     * @param target {Element} event target
     */
    __gestureStart : function(domEvent, target){

      var touch = domEvent.changedTouches[0];
      this.__startPageX = touch.screenX;
      this.__startPageY = touch.screenY;
      this.__startTime = new Date().getTime();
      this.__isSingleTouchGesture = domEvent.changedTouches.length === 1;
    },
    /**
     * Helper method for gesture change.
     *
     * @param domEvent {Event} DOM event
     * @param target {Element} event target
     */
    __gestureChange : function(domEvent, target){

      // Abort a single touch gesture when another touch occurs.
      if(this.__isSingleTouchGesture && domEvent.changedTouches.length > 1){

        this.__isSingleTouchGesture = false;
      };
    },
    /**
     * Helper method for gesture end.
     *
     * @param domEvent {Event} DOM event
     * @param target {Element} event target
     */
    __gestureEnd : function(domEvent, target){

      if(this.__isSingleTouchGesture){

        var touch = domEvent.changedTouches[0];
        var deltaCoordinates = {
          x : touch.screenX - this.__startPageX,
          y : touch.screenY - this.__startPageY
        };
        var clazz = qx.event.handler.TouchCore;
        var eventType;
        if(this.__originalTarget == target && Math.abs(deltaCoordinates.x) <= clazz.TAP_MAX_DISTANCE && Math.abs(deltaCoordinates.y) <= clazz.TAP_MAX_DISTANCE){

          if(qx.event && qx.event.type && qx.event.type.Tap){

            eventType = qx.event.type.Tap;
          };
          this._fireEvent(domEvent, "tap", target, eventType);
        } else {

          var swipe = this.__getSwipeGesture(domEvent, target, deltaCoordinates);
          if(swipe){

            if(qx.event && qx.event.type && qx.event.type.Swipe){

              eventType = qx.event.type.Swipe;
            };
            domEvent.swipe = swipe;
            this._fireEvent(domEvent, "swipe", target, eventType);
          };
        };
      };
    },
    /**
     * Returns the swipe gesture when the user performed a swipe.
     *
     * @param domEvent {Event} DOM event
     * @param target {Element} event target
     * @param deltaCoordinates {Map} delta x/y coordinates since the gesture started.
     * @return {Map} returns the swipe data when the user performed a swipe, null if the gesture was no swipe.
     */
    __getSwipeGesture : function(domEvent, target, deltaCoordinates){

      var clazz = qx.event.handler.TouchCore;
      var duration = new Date().getTime() - this.__startTime;
      var axis = (Math.abs(deltaCoordinates.x) >= Math.abs(deltaCoordinates.y)) ? "x" : "y";
      var distance = deltaCoordinates[axis];
      var direction = clazz.SWIPE_DIRECTION[axis][distance < 0 ? 0 : 1];
      var velocity = (duration !== 0) ? distance / duration : 0;
      var swipe = null;
      if(Math.abs(velocity) >= clazz.SWIPE_MIN_VELOCITY && Math.abs(distance) >= clazz.SWIPE_MIN_DISTANCE){

        swipe = {
          startTime : this.__startTime,
          duration : duration,
          axis : axis,
          direction : direction,
          distance : distance,
          velocity : velocity
        };
      };
      return swipe;
    },
    /**
     * Dispose this object
     */
    dispose : function(){

      this._stopTouchObserver();
      this.__originalTarget = this.__target = this.__emitter = null;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.module.Event)
************************************************************************ */
/**
 * Normalization for orientationchange events
 * Example:
 * <pre class="javascript">
 *   q(window).on("orientationchange", function(ev) {
 *     ev.getOrientation();
 *     ev.isLandscape();
 *   });
 * </pre>
 */
qx.Bootstrap.define("qx.module.event.Orientation", {
  statics : {
    /**
     * List of event types to be normalized
     * @type Array
     */
    TYPES : ["orientationchange"],
    /**
     * List of qx.module.event.Orientation methods to be attached to native
     * event objects
     * @type Array
     * @internal
     */
    BIND_METHODS : ["getOrientation", "isLandscape", "isPortrait"],
    /**
     * Returns the current orientation of the viewport in degrees.
     *
     * All possible values and their meaning:
     *
     * * <code>0</code>: "Portrait"
     * * <code>-90</code>: "Landscape (right, screen turned clockwise)"
     * * <code>90</code>: "Landscape (left, screen turned counterclockwise)"
     * * <code>180</code>: "Portrait (upside-down portrait)"
     *
     * @return {Number} The current orientation in degrees
     */
    getOrientation : function(){

      return this._orientation;
    },
    /**
     * Whether the viewport orientation is currently in landscape mode.
     *
     * @return {Boolean} <code>true</code> when the viewport orientation
     *     is currently in landscape mode.
     */
    isLandscape : function(){

      return this._mode == "landscape";
    },
    /**
     * Whether the viewport orientation is currently in portrait mode.
     *
     * @return {Boolean} <code>true</code> when the viewport orientation
     *     is currently in portrait mode.
     */
    isPortrait : function(){

      return this._mode == "portrait";
    },
    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @param type {String} Event type
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element, type){

      if(!event){

        return event;
      };
      event._type = type;
      var bindMethods = qx.module.event.Orientation.BIND_METHODS;
      for(var i = 0,l = bindMethods.length;i < l;i++){

        if(typeof event[bindMethods[i]] != "function"){

          event[bindMethods[i]] = qx.module.event.Orientation[bindMethods[i]].bind(event);
        };
      };
      return event;
    }
  },
  defer : function(statics){

    q.$registerEventNormalization(statics.TYPES, statics.normalize);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#require(qx.module.Event)
#require(qx.module.Environment)
************************************************************************ */
/**
 * Normalization for native keyboard events
 */
qx.Bootstrap.define("qx.module.event.Keyboard", {
  statics : {
    /**
     * List of event types to be normalized
     * @type Array
     */
    TYPES : ["keydown", "keypress", "keyup"],
    /**
     * List qx.module.event.Keyboard methods to be attached to native mouse event
     * objects
     * @type Array
     * @internal
     */
    BIND_METHODS : ["getKeyIdentifier"],
    /**
     * Identifier of the pressed key. This property is modeled after the <em>KeyboardEvent.keyIdentifier</em> property
     * of the W3C DOM 3 event specification
     * (http://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html#Events-KeyboardEvent-keyIdentifier).
     *
     * Printable keys are represented by an unicode string, non-printable keys
     * have one of the following values:
     *
     * <table>
     * <tr><th>Backspace</th><td>The Backspace (Back) key.</td></tr>
     * <tr><th>Tab</th><td>The Horizontal Tabulation (Tab) key.</td></tr>
     * <tr><th>Space</th><td>The Space (Spacebar) key.</td></tr>
     * <tr><th>Enter</th><td>The Enter key. Note: This key identifier is also used for the Return (Macintosh numpad) key.</td></tr>
     * <tr><th>Shift</th><td>The Shift key.</td></tr>
     * <tr><th>Control</th><td>The Control (Ctrl) key.</td></tr>
     * <tr><th>Alt</th><td>The Alt (Menu) key.</td></tr>
     * <tr><th>CapsLock</th><td>The CapsLock key</td></tr>
     * <tr><th>Meta</th><td>The Meta key. (Apple Meta and Windows key)</td></tr>
     * <tr><th>Escape</th><td>The Escape (Esc) key.</td></tr>
     * <tr><th>Left</th><td>The Left Arrow key.</td></tr>
     * <tr><th>Up</th><td>The Up Arrow key.</td></tr>
     * <tr><th>Right</th><td>The Right Arrow key.</td></tr>
     * <tr><th>Down</th><td>The Down Arrow key.</td></tr>
     * <tr><th>PageUp</th><td>The Page Up key.</td></tr>
     * <tr><th>PageDown</th><td>The Page Down (Next) key.</td></tr>
     * <tr><th>End</th><td>The End key.</td></tr>
     * <tr><th>Home</th><td>The Home key.</td></tr>
     * <tr><th>Insert</th><td>The Insert (Ins) key. (Does not fire in Opera/Win)</td></tr>
     * <tr><th>Delete</th><td>The Delete (Del) Key.</td></tr>
     * <tr><th>F1</th><td>The F1 key.</td></tr>
     * <tr><th>F2</th><td>The F2 key.</td></tr>
     * <tr><th>F3</th><td>The F3 key.</td></tr>
     * <tr><th>F4</th><td>The F4 key.</td></tr>
     * <tr><th>F5</th><td>The F5 key.</td></tr>
     * <tr><th>F6</th><td>The F6 key.</td></tr>
     * <tr><th>F7</th><td>The F7 key.</td></tr>
     * <tr><th>F8</th><td>The F8 key.</td></tr>
     * <tr><th>F9</th><td>The F9 key.</td></tr>
     * <tr><th>F10</th><td>The F10 key.</td></tr>
     * <tr><th>F11</th><td>The F11 key.</td></tr>
     * <tr><th>F12</th><td>The F12 key.</td></tr>
     * <tr><th>NumLock</th><td>The Num Lock key.</td></tr>
     * <tr><th>PrintScreen</th><td>The Print Screen (PrintScrn, SnapShot) key.</td></tr>
     * <tr><th>Scroll</th><td>The scroll lock key</td></tr>
     * <tr><th>Pause</th><td>The pause/break key</td></tr>
     * <tr><th>Win</th><td>The Windows Logo key</td></tr>
     * <tr><th>Apps</th><td>The Application key (Windows Context Menu)</td></tr>
     * </table>
     *
     * @return {String} The key identifier
     */
    getKeyIdentifier : function(){

      if(this.type == "keypress" && (q.env.get("engine.name") != "gecko" || this.charCode !== 0)){

        return qx.event.util.Keyboard.charCodeToIdentifier(this.charCode || this.keyCode);
      };
      return qx.event.util.Keyboard.keyCodeToIdentifier(this.keyCode);
    },
    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element){

      if(!event){

        return event;
      };
      var bindMethods = qx.module.event.Keyboard.BIND_METHODS;
      for(var i = 0,l = bindMethods.length;i < l;i++){

        if(typeof event[bindMethods[i]] != "function"){

          event[bindMethods[i]] = qx.module.event.Keyboard[bindMethods[i]].bind(event);
        };
      };
      return event;
    },
    /**
     * IE9 will not fire an "input" event on text input elements if the user changes
     * the field's value by pressing the Backspace key. We fix this by listening
     * for the "keyup" event and emitting the missing event if necessary
     *
     * @param element {Element} Target element
     */
    registerInputFix : function(element){

      if(element.type === "text" || element.type === "password" || element.type === "textarea"){

        if(!element.__inputFix){

          element.__inputFix = q(element).on("keyup", qx.module.event.Keyboard._inputFix);
        };
      };
    },
    /**
     * Removes the IE9 input event fix
     * @param element {Element} target element
     */
    unregisterInputFix : function(element){

      if(element.__inputFix && !q(element).hasListener("input")){

        q(element).off("keyup", qx.module.event.Keyboard._inputFix);
        element.__inputFix = null;
      };
    },
    /**
     * IE9 fix: Emits an "input" event if a text input element's value was changed
     * using the Backspace key
     * @param ev {Event} Keyup event
     */
    _inputFix : function(ev){

      if(ev.getKeyIdentifier() !== "Backspace"){

        return;
      };
      var target = ev.getTarget();
      var newValue = q(target).getValue();
      if(!target.__oldInputValue || target.__oldInputValue !== newValue){

        target.__oldInputValue = newValue;
        ev.type = ev._type = "input";
        target.__emitter.emit("input", ev);
      };
    }
  },
  defer : function(statics){

    q.$registerEventNormalization(qx.module.event.Keyboard.TYPES, statics.normalize);
    if(q.env.get("engine.name") === "mshtml" && q.env.get("browser.documentmode") === 9){

      q.$registerEventHook("input", statics.registerInputFix, statics.unregisterInputFix);
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Utilities for working with character codes and key identifiers
 */
qx.Bootstrap.define("qx.event.util.Keyboard", {
  statics : {
    /*
    ---------------------------------------------------------------------------
      KEY MAPS
    ---------------------------------------------------------------------------
    */
    /**
     * {Map} maps the charcodes of special printable keys to key identifiers
     *
     * @lint ignoreReferenceField(specialCharCodeMap)
     */
    specialCharCodeMap : {
      '8' : "Backspace",
      // The Backspace (Back) key.
      '9' : "Tab",
      // The Horizontal Tabulation (Tab) key.
      //   Note: This key identifier is also used for the
      //   Return (Macintosh numpad) key.
      '13' : "Enter",
      // The Enter key.
      '27' : "Escape",
      // The Escape (Esc) key.
      '32' : "Space"
    },
    /**
     * {Map} maps the keycodes of the numpad keys to the right charcodes
     *
     * @lint ignoreReferenceField(numpadToCharCode)
     */
    numpadToCharCode : {
      '96' : "0".charCodeAt(0),
      '97' : "1".charCodeAt(0),
      '98' : "2".charCodeAt(0),
      '99' : "3".charCodeAt(0),
      '100' : "4".charCodeAt(0),
      '101' : "5".charCodeAt(0),
      '102' : "6".charCodeAt(0),
      '103' : "7".charCodeAt(0),
      '104' : "8".charCodeAt(0),
      '105' : "9".charCodeAt(0),
      '106' : "*".charCodeAt(0),
      '107' : "+".charCodeAt(0),
      '109' : "-".charCodeAt(0),
      '110' : ",".charCodeAt(0),
      '111' : "/".charCodeAt(0)
    },
    /**
     * {Map} maps the keycodes of non printable keys to key identifiers
     *
     * @lint ignoreReferenceField(keyCodeToIdentifierMap)
     */
    keyCodeToIdentifierMap : {
      '16' : "Shift",
      // The Shift key.
      '17' : "Control",
      // The Control (Ctrl) key.
      '18' : "Alt",
      // The Alt (Menu) key.
      '20' : "CapsLock",
      // The CapsLock key
      '224' : "Meta",
      // The Meta key. (Apple Meta and Windows key)
      '37' : "Left",
      // The Left Arrow key.
      '38' : "Up",
      // The Up Arrow key.
      '39' : "Right",
      // The Right Arrow key.
      '40' : "Down",
      // The Down Arrow key.
      '33' : "PageUp",
      // The Page Up key.
      '34' : "PageDown",
      // The Page Down (Next) key.
      '35' : "End",
      // The End key.
      '36' : "Home",
      // The Home key.
      '45' : "Insert",
      // The Insert (Ins) key. (Does not fire in Opera/Win)
      '46' : "Delete",
      // The Delete (Del) Key.
      '112' : "F1",
      // The F1 key.
      '113' : "F2",
      // The F2 key.
      '114' : "F3",
      // The F3 key.
      '115' : "F4",
      // The F4 key.
      '116' : "F5",
      // The F5 key.
      '117' : "F6",
      // The F6 key.
      '118' : "F7",
      // The F7 key.
      '119' : "F8",
      // The F8 key.
      '120' : "F9",
      // The F9 key.
      '121' : "F10",
      // The F10 key.
      '122' : "F11",
      // The F11 key.
      '123' : "F12",
      // The F12 key.
      '144' : "NumLock",
      // The Num Lock key.
      '44' : "PrintScreen",
      // The Print Screen (PrintScrn, SnapShot) key.
      '145' : "Scroll",
      // The scroll lock key
      '19' : "Pause",
      // The pause/break key
      // The left Windows Logo key or left cmd key
      '91' : qx.core.Environment.get("os.name") == "osx" ? "cmd" : "Win",
      '92' : "Win",
      // The right Windows Logo key or left cmd key
      // The Application key (Windows Context Menu) or right cmd key
      '93' : qx.core.Environment.get("os.name") == "osx" ? "cmd" : "Apps"
    },
    /** char code for capital A */
    charCodeA : "A".charCodeAt(0),
    /** char code for capital Z */
    charCodeZ : "Z".charCodeAt(0),
    /** char code for 0 */
    charCode0 : "0".charCodeAt(0),
    /** char code for 9 */
    charCode9 : "9".charCodeAt(0),
    /**
     * converts a keyboard code to the corresponding identifier
     *
     * @param keyCode {Integer} key code
     * @return {String} key identifier
     */
    keyCodeToIdentifier : function(keyCode){

      if(this.isIdentifiableKeyCode(keyCode)){

        var numPadKeyCode = this.numpadToCharCode[keyCode];
        if(numPadKeyCode){

          return String.fromCharCode(numPadKeyCode);
        };
        return (this.keyCodeToIdentifierMap[keyCode] || this.specialCharCodeMap[keyCode] || String.fromCharCode(keyCode));
      } else {

        return "Unidentified";
      };
    },
    /**
     * converts a character code to the corresponding identifier
     *
     * @param charCode {String} character code
     * @return {String} key identifier
     */
    charCodeToIdentifier : function(charCode){

      return this.specialCharCodeMap[charCode] || String.fromCharCode(charCode).toUpperCase();
    },
    /**
     * Check whether the keycode can be reliably detected in keyup/keydown events
     *
     * @param keyCode {String} key code to check.
     * @return {Boolean} Whether the keycode can be reliably detected in keyup/keydown events.
     */
    isIdentifiableKeyCode : function(keyCode){

      // A-Z (TODO: is this lower or uppercase?)
      if(keyCode >= this.charCodeA && keyCode <= this.charCodeZ){

        return true;
      };
      // 0-9
      if(keyCode >= this.charCode0 && keyCode <= this.charCode9){

        return true;
      };
      // Enter, Space, Tab, Backspace
      if(this.specialCharCodeMap[keyCode]){

        return true;
      };
      // Numpad
      if(this.numpadToCharCode[keyCode]){

        return true;
      };
      // non printable keys
      if(this.isNonPrintableKeyCode(keyCode)){

        return true;
      };
      return false;
    },
    /**
     * Checks whether the keyCode represents a non printable key
     *
     * @param keyCode {String} key code to check.
     * @return {Boolean} Whether the keyCode represents a non printable key.
     */
    isNonPrintableKeyCode : function(keyCode){

      return this.keyCodeToIdentifierMap[keyCode] ? true : false;
    },
    /**
     * Checks whether a given string is a valid keyIdentifier
     *
     * @param keyIdentifier {String} The key identifier.
     * @return {Boolean} whether the given string is a valid keyIdentifier
     */
    isValidKeyIdentifier : function(keyIdentifier){

      if(this.identifierToKeyCodeMap[keyIdentifier]){

        return true;
      };
      if(keyIdentifier.length != 1){

        return false;
      };
      if(keyIdentifier >= "0" && keyIdentifier <= "9"){

        return true;
      };
      if(keyIdentifier >= "A" && keyIdentifier <= "Z"){

        return true;
      };
      switch(keyIdentifier){case "+":case "-":case "*":case "/":
      return true;default:
      return false;};
    },
    /**
     * Checks whether a given string is a printable keyIdentifier.
     *
     * @param keyIdentifier {String} The key identifier.
     * @return {Boolean} whether the given string is a printable keyIdentifier.
     */
    isPrintableKeyIdentifier : function(keyIdentifier){

      if(keyIdentifier === "Space"){

        return true;
      } else {

        return this.identifierToKeyCodeMap[keyIdentifier] ? false : true;
      };
    }
  },
  defer : function(statics, members){

    // construct inverse of keyCodeToIdentifierMap
    if(!statics.identifierToKeyCodeMap){

      statics.identifierToKeyCodeMap = {
      };
      for(var key in statics.keyCodeToIdentifierMap){

        statics.identifierToKeyCodeMap[statics.keyCodeToIdentifierMap[key]] = parseInt(key, 10);
      };
      for(var key in statics.specialCharCodeMap){

        statics.identifierToKeyCodeMap[statics.specialCharCodeMap[key]] = parseInt(key, 10);
      };
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */
/**
 * A wrapper for Cookie handling.
 */
qx.Bootstrap.define("qx.bom.Cookie", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /*
    ---------------------------------------------------------------------------
      USER APPLICATION METHODS
    ---------------------------------------------------------------------------
    */
    /**
     * Returns the string value of a cookie.
     *
     * @param key {String} The key for the saved string value.
     * @return {null | String} Returns the saved string value, if the cookie
     *    contains a value for the key, <code>null</code> otherwise.
     */
    get : function(key){

      var start = document.cookie.indexOf(key + "=");
      var len = start + key.length + 1;
      if((!start) && (key != document.cookie.substring(0, key.length))){

        return null;
      };
      if(start == -1){

        return null;
      };
      var end = document.cookie.indexOf(";", len);
      if(end == -1){

        end = document.cookie.length;
      };
      return unescape(document.cookie.substring(len, end));
    },
    /**
     * Sets the string value of a cookie.
     *
     * @param key {String} The key for the string value.
     * @param value {String} The string value.
     * @param expires {Number?null} The expires in days starting from now,
     *    or <code>null</code> if the cookie should deleted after browser close.
     * @param path {String?null} Path value.
     * @param domain {String?null} Domain value.
     * @param secure {Boolean?null} Secure flag.
     * @return {void}
     */
    set : function(key, value, expires, path, domain, secure){

      // Generate cookie
      var cookie = [key, "=", escape(value)];
      if(expires){

        var today = new Date();
        today.setTime(today.getTime());
        cookie.push(";expires=", new Date(today.getTime() + (expires * 1000 * 60 * 60 * 24)).toGMTString());
      };
      if(path){

        cookie.push(";path=", path);
      };
      if(domain){

        cookie.push(";domain=", domain);
      };
      if(secure){

        cookie.push(";secure");
      };
      // Store cookie
      document.cookie = cookie.join("");
    },
    /**
     * Deletes the string value of a cookie.
     *
     * @param key {String} The key for the string value.
     * @param path {String?null} Path value.
     * @param domain {String?null} Domain value.
     * @return {void}
     */
    del : function(key, path, domain){

      if(!qx.bom.Cookie.get(key)){

        return;
      };
      // Generate cookie
      var cookie = [key, "="];
      if(path){

        cookie.push(";path=", path);
      };
      if(domain){

        cookie.push(";domain=", domain);
      };
      cookie.push(";expires=Thu, 01-Jan-1970 00:00:01 GMT");
      // Store cookie
      document.cookie = cookie.join("");
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Cookie handling module
 */
qx.Bootstrap.define("qx.module.Cookie", {
  statics : {
    /**
     * Returns the string value of a cookie.
     *
     * @attachStatic {q, cookie.get}
     * @param key {String} The key for the saved string value.
     * @return {String|null} Returns the saved string value if the cookie
     *    contains a value for the key, otherwise <code>null</code>
     * @signature function(key)
     */
    get : qx.bom.Cookie.get,
    /**
     * Sets the string value of a cookie.
     *
     * @attachStatic {q, cookie.set}
     * @param key {String} The key for the string value.
     * @param value {String} The string value.
     * @param expires {Number?null} Expires directive value in days starting from now,
     *    or <code>null</code> if the cookie should be deleted when the browser
     *    is closed.
     * @param path {String?null} Path value.
     * @param domain {String?null} Domain value.
     * @param secure {Boolean?null} Secure flag.
     * @signature function(key, value, expires, path, domain, secure)
     */
    set : qx.bom.Cookie.set,
    /**
     * Deletes the string value of a cookie.
     *
     * @attachStatic {q, cookie.del}
     * @param key {String} The key for the string value.
     * @param path {String?null} Path value.
     * @param domain {String?null} Domain value.
     * @signature function(key, path, domain)
     */
    del : qx.bom.Cookie.del
  },
  defer : function(statics){

    q.$attachStatic({
      "cookie" : {
        get : statics.get,
        set : statics.set,
        del : statics.del
      }
    });
  }
});


var exp = envinfo["qx.export"];
if (exp) {
  for (var name in exp) {
    var c = exp[name].split(".");
    var root = window;
    for (var i=0; i < c.length; i++) {
      root = root[c[i]];
    };
    window[name] = root;
  }
}

window["qx"] = undefined;
try {
  delete window.qx;
} catch(e) {}

})();