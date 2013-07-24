/** qooxdoo v.2.1.2 | (c) 2012 1&1 Internet AG 1und1.de | qooxdoo.org/license */
(function(){
if (!window.qx) window.qx = {};
var qx = window.qx;

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"json":true,"qx.application":"library.Application","qx.debug":false,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.debug.io":false,"qx.debug.ui.queue":false,"qx.optimization.variants":true,"qx.revision":"","qx.theme":"qx.theme.Modern","qx.version":"2.1.2"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

qx.$$packageData = {};

/** qooxdoo v.2.1.2 | (c) 2012 1&1 Internet AG 1und1.de | qooxdoo.org/license */
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
      // use keys to include the shadowed in IE
      for(var i = 0,keys = qx.Bootstrap.keys(statics),l = keys.length;i < l;i++){

        var key = keys[i];
        clazz[key] = statics[key];
      };
      proto = clazz.prototype;
      var members = config.members || {
      };
      // use keys to include the shadowed in IE
      for(var i = 0,keys = qx.Bootstrap.keys(members),l = keys.length;i < l;i++){

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
     * @throws {Error} when the given object already exists.
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
      var helper = new Function();
      helper.prototype = superproto;
      var proto = new helper();
      // Apply prototype to new helper instance
      clazz.prototype = proto;
      // Store names in prototype
      proto.name = proto.classname = name;
      proto.basename = basename;
      /*
        - Store base constructor to constructor-
        - Store reference to extend class
      */
      construct.base = superClass;
      clazz.superclass = superClass;
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
     * Get the number of own properties in the object.
     *
     * @param map {Object} the map
     * @return {Integer} number of objects in the map
     * @lint ignoreUnused(key)
     */
    objectGetLength : function(map){

      return qx.Bootstrap.keys(map).length;
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
    __shadowedKeys : ["isPrototypeOf", "hasOwnProperty", "toLocaleString", "toString", "valueOf", "propertyIsEnumerable", "constructor"],
    /**
     * Get the keys of a map as array as returned by a "for ... in" statement.
     *
     * @deprecated {2.1.} Please use Object.keys instead.
     * @param map {Object} the map
     * @return {Array} array of the keys of the map
     */
    getKeys : function(map){

      if(qx.Bootstrap.DEBUG){

        qx.Bootstrap.warn("'qx.Bootstrap.getKeys' is deprecated. " + "Please use the native 'Object.keys()' instead.");
      };
      return qx.Bootstrap.keys(map);
    },
    /**
     * Get the keys of a map as array as returned by a "for ... in" statement.
     *
     * @signature function(map)
     * @internal
     * @param map {Object} the map
     * @return {Array} array of the keys of the map
     */
    keys : ({
      "ES5" : Object.keys,
      "BROKEN_IE" : function(map){

        if(map === null || (typeof map != "object" && typeof map != "function")){

          throw new TypeError("Object.keys requires an object as argument.");
        };
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

        if(map === null || (typeof map != "object" && typeof map != "function")){

          throw new TypeError("Object.keys requires an object as argument.");
        };
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
     * @deprecated {2.1} Object.keys(map).join('\", "').
     * @return {String} String of the keys of the map
     *         The keys are separated by ", "
     */
    getKeysAsString : function(map){

      {
      };
      var keys = qx.Bootstrap.keys(map);
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
 *       <td>css.animation.requestframe</td><td><i>String</i> or <i>null</i></td><td><code>mozRequestAnimationFrame</code></td>
 *       <td>{@link qx.bom.client.CssAnimation#getRequestAnimationFrame}</td>
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
 *       <td>deprecated since 2.1: css.overflowxy</td><td><i>Boolean</i></td><td><code>true</code></td>
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
 *       <td>ecmascript.error.stacktrace</td><td><i>String</i> or <i>null</i></td><td><code>stack</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getStackTrace}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.indexof<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayIndexOf}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.lastindexof<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayLastIndexOf}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.foreach<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayForEach}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.filter<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayFilter}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.map<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayMap}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.some<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArraySome}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.every<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayEvery}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.reduce<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayReduce}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.reduceright<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayReduceRight}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.function.bind<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getFunctionBind}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.object.keys<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getObjectKeys}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.date.now<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getDateNow}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.error.toString</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getErrorToString}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.string.trim</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getStringTrim}</td>
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
 *      <tr>
 *       <td>event.mspointer</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Event#getMsPointer}</td>
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
 *       <td>html.history.state</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getHistoryState}</td>
 *     </tr>
 *     <tr>
 *       <td>html.selection</td><td><i>String</i></td><td><code>getSelection</code></td>
 *       <td>{@link qx.bom.client.Html#getSelection}</td>
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
 *       <td>plugin.skype</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getSkype}</td>
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
 *       <td>qx.debug.ui.queue</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
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
 *       <td><i>default:</i> <code>&lt;&lt;initial theme name&gt;&gt;</code></td>
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
      "plugin.skype" : "qx.bom.client.Plugin.getSkype",
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
      // @deprecated {2.1}
      "ecmascript.error.stacktrace" : "qx.bom.client.EcmaScript.getStackTrace",
      "ecmascript.array.indexof" : "qx.bom.client.EcmaScript.getArrayIndexOf",
      "ecmascript.array.lastindexof" : "qx.bom.client.EcmaScript.getArrayLastIndexOf",
      "ecmascript.array.foreach" : "qx.bom.client.EcmaScript.getArrayForEach",
      "ecmascript.array.filter" : "qx.bom.client.EcmaScript.getArrayFilter",
      "ecmascript.array.map" : "qx.bom.client.EcmaScript.getArrayMap",
      "ecmascript.array.some" : "qx.bom.client.EcmaScript.getArraySome",
      "ecmascript.array.every" : "qx.bom.client.EcmaScript.getArrayEvery",
      "ecmascript.array.reduce" : "qx.bom.client.EcmaScript.getArrayReduce",
      "ecmascript.array.reduceright" : "qx.bom.client.EcmaScript.getArrayReduceRight",
      "ecmascript.function.bind" : "qx.bom.client.EcmaScript.getFunctionBind",
      "ecmascript.object.keys" : "qx.bom.client.EcmaScript.getObjectKeys",
      "ecmascript.date.now" : "qx.bom.client.EcmaScript.getDateNow",
      "ecmascript.error.toString" : "qx.bom.client.EcmaScript.getErrorToString",
      "ecmascript.string.trim" : "qx.bom.client.EcmaScript.getStringTrim",
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
      "html.history.state" : "qx.bom.client.Html.getHistoryState",
      "html.selection" : "qx.bom.client.Html.getSelection",
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
      "css.animation.requestframe" : "qx.bom.client.CssAnimation.getRequestAnimationFrame",
      "css.transform" : "qx.bom.client.CssTransform.getSupport",
      "css.transform.3d" : "qx.bom.client.CssTransform.get3D",
      "css.inlineblock" : "qx.bom.client.Css.getInlineBlock",
      "css.opacity" : "qx.bom.client.Css.getOpacity",
      "css.overflowxy" : "qx.bom.client.Css.getOverflowXY",
      // @deprecated {2.1}
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

      if(qx.Bootstrap.DEBUG){

        // @deprecated {2.1}
        if(key == "css.overflowxy"){

          qx.Bootstrap.warn("The environment key 'css.overflowxy' is deprecated.");
        };
        // @deprecated {2.1}
        if(key == "ecmascript.stacktrace"){

          qx.Bootstrap.warn("The environment key 'ecmascript.stacktrace' is now 'ecmascript.error.stacktrace'.");
          key = "ecmascript.error.stacktrace";
        };
      };
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

        throw new Error('No match for variant "' + key + '" (' + (typeof key) + ' type)' + ' in variants [' + qx.Bootstrap.keys(values) + '] found, and no default ("default") given');
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
      this.add("qx.debug.ui.queue", function(){

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
      this.add("qx.nativeScrollBars", function(){

        return false;
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
  // Webkit: https://developer.apple.com/internet/safari/uamatrix.html
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

        var isTrident = /Trident\/([^\);]+)(\)|;)/.test(agent);
        if(/MSIE\s+([^\);]+)(\)|;)/.test(agent)){

          version = RegExp.$1;
          // If the IE8 or IE9 is running in the compatibility mode, the MSIE value
          // is set to an older version, but we need the correct version. The only
          // way is to compare the trident version.
          if(version < 8 && isTrident){

            if(RegExp.$1 == "4.0"){

              version = "8.0";
            } else if(RegExp.$1 == "5.0"){

              version = "9.0";
            };
          };
        } else if(isTrident){

          // IE 11 dropped the "MSIE" string
          var match = /\brv\:(\d+?\.\d+?)\b/.exec(agent);
          if(match){

            version = match[1];
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
     * @return {Boolean} true, if its opera.
     */
    __isOpera : function(){

      return window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]";
    },
    /**
     * Internal helper for checking for webkit.
     * @return {Boolean} true, if its webkit.
     */
    __isWebkit : function(){

      return window.navigator.userAgent.indexOf("AppleWebKit/") != -1;
    },
    /**
     * Internal helper for checking for Maple .
     * Maple is used in Samsung SMART TV 2010-2011 models. It's based on Gecko
     * engine 1.8.1.11.
     * @return {Boolean} true, if its maple.
     */
    __isMaple : function(){

      return window.navigator.userAgent.indexOf("Maple") != -1;
    },
    /**
     * Internal helper for checking for gecko.
     * @return {Boolean} true, if its gecko.
     */
    __isGecko : function(){

      return window.controllers && window.navigator.product === "Gecko" && window.navigator.userAgent.indexOf("Maple") == -1 && window.navigator.userAgent.indexOf("Trident") == -1;
    },
    /**
     * Internal helper to check for MSHTML.
     * @return {Boolean} true, if its MSHTML.
     */
    __isMshtml : function(){

      return window.navigator.cpuClass && (/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent) || /Trident\/\d+?\.\d+?/.test(window.navigator.userAgent));
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
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * The main purpose of this class to hold all checks about ECMAScript.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.EcmaScript", {
  statics : {
    /**
     * Returns the name of the Error object property that holds stack trace
     * information or null if the client does not provide any.
     *
     * @internal
     * @return {String|null} <code>stack</code>, <code>stacktrace</code> or
     * <code>null</code>
     */
    getStackTrace : function(){

      var propName;
      var e = new Error("e");
      propName = e.stack ? "stack" : e.stacktrace ? "stacktrace" : null;
      // only thrown errors have the stack property in IE10 and PhantomJS
      if(!propName){

        try{

          throw e;
        } catch(ex) {

          e = ex;
        };
      };
      return e.stacktrace ? "stacktrace" : e.stack ? "stack" : null;
    },
    /**
     * Checks if 'indexOf' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayIndexOf : function(){

      return !!Array.prototype.indexOf;
    },
    /**
     * Checks if 'lastIndexOf' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayLastIndexOf : function(){

      return !!Array.prototype.lastIndexOf;
    },
    /**
     * Checks if 'forEach' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayForEach : function(){

      return !!Array.prototype.forEach;
    },
    /**
     * Checks if 'filter' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayFilter : function(){

      return !!Array.prototype.filter;
    },
    /**
     * Checks if 'map' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayMap : function(){

      return !!Array.prototype.map;
    },
    /**
     * Checks if 'some' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArraySome : function(){

      return !!Array.prototype.some;
    },
    /**
     * Checks if 'every' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayEvery : function(){

      return !!Array.prototype.every;
    },
    /**
     * Checks if 'reduce' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayReduce : function(){

      return !!Array.prototype.reduce;
    },
    /**
     * Checks if 'reduceRight' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayReduceRight : function(){

      return !!Array.prototype.reduceRight;
    },
    /**
     * Checks if 'toString' is supported on the Error object and
     * its working as expected.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getErrorToString : function(){

      return typeof Error.prototype.toString == "function" && Error.prototype.toString() !== "[object Error]";
    },
    /**
     * Checks if 'bind' is supported on the Function object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getFunctionBind : function(){

      return typeof Function.prototype.bind === "function";
    },
    /**
     * Checks if 'keys' is supported on the Object object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getObjectKeys : function(){

      return !!Object.keys;
    },
    /**
     * Checks if 'now' is supported on the Date object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getDateNow : function(){

      return !!Date.now;
    },
    /**
     * Checks if 'trim' is supported on the String object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getStringTrim : function(){

      return typeof String.prototype.trim === "function";
    }
  },
  defer : function(statics){

    // array polyfill
    qx.core.Environment.add("ecmascript.array.indexof", statics.getArrayIndexOf);
    qx.core.Environment.add("ecmascript.array.lastindexof", statics.getArrayLastIndexOf);
    qx.core.Environment.add("ecmascript.array.foreach", statics.getArrayForEach);
    qx.core.Environment.add("ecmascript.array.filter", statics.getArrayFilter);
    qx.core.Environment.add("ecmascript.array.map", statics.getArrayMap);
    qx.core.Environment.add("ecmascript.array.some", statics.getArraySome);
    qx.core.Environment.add("ecmascript.array.every", statics.getArrayEvery);
    qx.core.Environment.add("ecmascript.array.reduce", statics.getArrayReduce);
    qx.core.Environment.add("ecmascript.array.reduceright", statics.getArrayReduceRight);
    // date polyfill
    qx.core.Environment.add("ecmascript.date.now", statics.getDateNow);
    // error bugfix
    qx.core.Environment.add("ecmascript.error.toString", statics.getErrorToString);
    qx.core.Environment.add("ecmascript.error.stacktrace", statics.getStackTrace);
    // function polyfill
    qx.core.Environment.add("ecmascript.function.bind", statics.getFunctionBind);
    // object polyfill
    qx.core.Environment.add("ecmascript.object.keys", statics.getObjectKeys);
    // string polyfill
    qx.core.Environment.add("ecmascript.string.trim", statics.getStringTrim);
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
 * This class takes care of the normalization of the native 'Array' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *indexOf*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.14">Annotated ES5 Spec</a>
 *
 * *lastIndexOf*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/lastIndexOf">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.15">Annotated ES5 Spec</a>
 *
 * *forEach*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.18">Annotated ES5 Spec</a>
 *
 * *filter*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.20">Annotated ES5 Spec</a>
 *
 * *map*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.19">Annotated ES5 Spec</a>
 *
 * *some*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.17">Annotated ES5 Spec</a>
 *
 * *every*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.16">Annotated ES5 Spec</a>
 *
 * *reduce*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/reduce">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.21">Annotated ES5 Spec</a>
 *
 * *reduceRight*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/reduceRight">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.22">Annotated ES5 Spec</a>
 *
 * Here is a little sample of how to use <code>indexOf</code> e.g.
 * <pre class="javascript">var a = ["a", "b", "c"];
 * a.indexOf("b"); // returns 1</pre>
 */
qx.Bootstrap.define("qx.lang.normalize.Array", {
  defer : function(){

    // fix indexOf
    if(!qx.core.Environment.get("ecmascript.array.indexof")){

      Array.prototype.indexOf = function(searchElement, fromIndex){

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
      };
    };
    // lastIndexOf
    if(!qx.core.Environment.get("ecmascript.array.lastindexof")){

      Array.prototype.lastIndexOf = function(searchElement, fromIndex){

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
      };
    };
    // forEach
    if(!qx.core.Environment.get("ecmascript.array.foreach")){

      Array.prototype.forEach = function(callback, obj){

        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            callback.call(obj || window, value, i, this);
          };
        };
      };
    };
    // filter
    if(!qx.core.Environment.get("ecmascript.array.filter")){

      Array.prototype.filter = function(callback, obj){

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
      };
    };
    // map
    if(!qx.core.Environment.get("ecmascript.array.map")){

      Array.prototype.map = function(callback, obj){

        var res = [];
        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            res[i] = callback.call(obj || window, value, i, this);
          };
        };
        return res;
      };
    };
    // some
    if(!qx.core.Environment.get("ecmascript.array.some")){

      Array.prototype.some = function(callback, obj){

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
      };
    };
    // every
    if(!qx.core.Environment.get("ecmascript.array.every")){

      Array.prototype.every = function(callback, obj){

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
      };
    };
    // reduce
    if(!qx.core.Environment.get("ecmascript.array.reduce")){

      Array.prototype.reduce = function(callback, init){

        if(typeof callback !== "function"){

          throw new TypeError("First argument is not callable");
        };
        if(init === undefined && this.length === 0){

          throw new TypeError("Length is 0 and no second argument given");
        };
        var ret = init === undefined ? this[0] : init;
        for(var i = init === undefined ? 1 : 0;i < this.length;i++){

          if(i in this){

            ret = callback.call(undefined, ret, this[i], i, this);
          };
        };
        return ret;
      };
    };
    // reduceRight
    if(!qx.core.Environment.get("ecmascript.array.reduceright")){

      Array.prototype.reduceRight = function(callback, init){

        if(typeof callback !== "function"){

          throw new TypeError("First argument is not callable");
        };
        if(init === undefined && this.length === 0){

          throw new TypeError("Length is 0 and no second argument given");
        };
        var ret = init === undefined ? this[this.length - 1] : init;
        for(var i = init === undefined ? this.length - 2 : this.length - 1;i >= 0;i--){

          if(i in this){

            ret = callback.call(undefined, ret, this[i], i, this);
          };
        };
        return ret;
      };
    };
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

#require(qx.bom.client.Engine)
#require(qx.lang.normalize.Array)

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
   * @param length_or_items {Integer|var?null} The initial length of the array
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
    Stack.prototype.indexOf = Array.prototype.indexOf;
    Stack.prototype.lastIndexOf = Array.prototype.lastIndexOf;
    Stack.prototype.forEach = Array.prototype.forEach;
    Stack.prototype.some = Array.prototype.some;
    Stack.prototype.every = Array.prototype.every;
    var filter = Array.prototype.filter;
    var map = Array.prototype.map;
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
/* ************************************************************************
#ignore(q)
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
 * By default, the core module is assigned to a global module named <code>q</code>.
 * In case <code>q</code> is already defined, the name <code>qxWeb</code>
 * is used instead.
 *
 * For further details, take a look at the documentation in the
 * <a href='http://manual.qooxdoo.org/${qxversion}/pages/website.html' target='_blank'>user manual</a>.
 */
qx.Bootstrap.define("qxWeb", {
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
      var col = qx.lang.Array.cast(clean, qxWeb);
      for(var i = 0;i < qxWeb.__init.length;i++){

        qxWeb.__init[i].call(col);
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
        qxWeb.prototype[name] = module[name];
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
        qxWeb[name] = module[name];
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

    if(!selector && this instanceof qxWeb){

      return this;
    };
    if(qx.Bootstrap.isString(selector)){

      selector = qx.bom.Selector.query(selector, context);
    } else if(!(qx.Bootstrap.isArray(selector))){

      selector = [selector];
    };
    return qxWeb.$init(selector);
  },
  members : {
    /**
     * Gets a new collection containing only those elements that passed the
     * given filter. This can be either a selector expression or a filter
     * function.
     *
     * @param selector {String|Function} Selector expression or filter function
     * @return {q} New collection containing the elements that passed the filter
     */
    filter : function(selector){

      if(qx.lang.Type.isFunction(selector)){

        return qxWeb.$init(Array.prototype.filter.call(this, selector));
      };
      return qxWeb.$init(qx.bom.Selector.matches(selector, this));
    },
    /**
     * Returns a copy of the collection within the given range.
     *
     * @param begin {Number} The index to begin.
     * @param end {Number?} The index to end.
     * @return {q} A new collection containing a slice of the original collection.
     */
    slice : function(begin, end){

      // Old IEs return an empty array if the second argument is undefined
      if(end){

        return qxWeb.$init(Array.prototype.slice.call(this, begin, end));
      } else {

        return qxWeb.$init(Array.prototype.slice.call(this, begin));
      };
    },
    /**
     * Removes the given number of items and returns the removed items as a new collection.
     * This method can also add items. Take a look at the
     * <a href='https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice' target='_blank'>documentation of MDN</a> for more details.
     *
     * @param index {Number} The index to begin.
     * @param howMany {Number} the amount of items to remove.
     * @param varargs {var} As many items as you want to add.
     * @return {q} A new collection containing the removed items.
     */
    splice : function(index, howMany, varargs){

      return qxWeb.$init(Array.prototype.splice.apply(this, arguments));
    },
    /**
     * Returns a new collection containing the modified elements. For more details, check out the
     * <a href='https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map' target='_blank'>MDN documentation</a>.
     *
     * @param callback {Function} Function which produces the new element.
     * @param thisarg {var} Context of the callback.
     * @return {q} New collection containing the elements that passed the filter
     */
    map : function(callback, thisarg){

      return qxWeb.$init(Array.prototype.map.apply(this, arguments));
    },
    /**
     * Returns a copy of the collection including the given elements.
     *
     * @param varargs {var} As many items as you want to add.
     * @return {q} A new collection containing all items.
     */
    concat : function(varargs){

      var clone = Array.prototype.slice.call(this, 0);
      for(var i = 0;i < arguments.length;i++){

        if(arguments[i] instanceof qxWeb){

          clone = clone.concat(Array.prototype.slice.call(arguments[i], 0));
        } else {

          clone.push(arguments[i]);
        };
      };
      return qxWeb.$init(clone);
    }
  },
  /**
   * @lint ignoreUndefined(q)
   */
  defer : function(statics){

    if(window.q == undefined){

      q = statics;
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
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'Date' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *now*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/now">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.9.4.4">Annotated ES5 Spec</a>
 */
qx.Bootstrap.define("qx.lang.normalize.Date", {
  defer : function(){

    // Date.now
    if(!qx.core.Environment.get("ecmascript.date.now")){

      Date.now = function(){

        return +new Date();
      };
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
#require(qx.lang.normalize.Date)

************************************************************************ */
/**
 * Static helper functions for arrays with a lot of often used convenience
 * methods like <code>remove</code> or <code>contains</code>.
 *
 * The native JavaScript Array is not modified by this class. However,
 * there are modifications to the native Array in {@link qx.lang.normalize.Array} for
 * browsers that do not support certain JavaScript features natively .
 */
qx.Bootstrap.define("qx.lang.Array", {
  statics : {
    /**
     * Converts array like constructions like the <code>argument</code> object,
     * node collections like the ones returned by <code>getElementsByTagName</code>
     * or extended array objects like <code>qx.type.BaseArray</code> to an
     * native Array instance.
     *
     * @deprecated {2.1} Please use cast with 'Array' as constructor.
     * @param object {var} any array like object
     * @param offset {Integer?0} position to start from
     * @return {Array} New array with the content of the incoming object
     */
    toArray : function(object, offset){

      {
      };
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

      // The native Array.slice cannot be used with some Array-like objects
      // including NodeLists in older IEs
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
     * @throws {Error} if one of the arguments is not an array
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
     * @throws {Error} if one of the arguments is not an array
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
      var key = "qx" + Date.now();
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
          } catch(ex1) {

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

   * Sizzle CSS Selector Engine - v1.8.2

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
       Snapshot taken on 2012-10-02, latest Sizzle commit on 2012-09-20:
       commit  41a7c2ce9be6c66e0c9b8b15e0a29c8e3ca6fb31

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
/**
 * Below is the original Sizzle code. Snapshot date is mentioned in the head of
 * this file.
 * @lint ignoreUnused(j, rnot, rendsWithNot)
 */
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function(window, undefined){

  var cachedruns,assertGetIdNotName,Expr,getText,isXML,contains,compile,sortOrder,hasDuplicate,outermostContext,baseHasDuplicate = true,strundefined = "undefined",expando = ("sizcache" + Math.random()).replace(".", ""),Token = String,document = window.document,docElem = document.documentElement,dirruns = 0,done = 0,pop = [].pop,push = [].push,slice = [].slice,// Use a stripped-down indexOf if a native one is unavailable
  indexOf = [].indexOf || function(elem){

    var i = 0,len = this.length;
    for(;i < len;i++){

      if(this[i] === elem){

        return i;
      };
    };
    return -1;
  },// Augment a function for special use by Sizzle
  markFunction = function(fn, value){

    fn[expando] = value == null || value;
    return fn;
  },createCache = function(){

    var cache = {
    },keys = [];
    return markFunction(function(key, value){

      // Only keep the most recent entries
      if(keys.push(key) > Expr.cacheLength){

        delete cache[keys.shift()];
      };
      return (cache[key] = value);
    }, cache);
  },classCache = createCache(),tokenCache = createCache(),compilerCache = createCache(),// Regex
  // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
  whitespace = "[\\x20\\t\\r\\n\\f]",// http://www.w3.org/TR/css3-syntax/#characters
  characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",// Loosely modeled on CSS identifier characters
  // An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
  // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
  identifier = characterEncoding.replace("w", "w#"),// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
  operators = "([*^$|!~]?=)",attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",// Prefer arguments not in parens/brackets,
  //   then attribute selectors and non-pseudos (denoted by :),
  //   then anything else
  // These preferences are here to reduce the number of selectors
  //   needing tokenize in the PSEUDO preFilter
  pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",// For matchExpr.POS and matchExpr.needsContext
  pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
  rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),rpseudo = new RegExp(pseudos),// Easily-parseable/retrievable ID or TAG or CLASS selectors
  rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,rnot = /^:not/,rsibling = /[\x20\t\r\n\f]*[+~]/,rendsWithNot = /:not\($/,rheader = /h\d/i,rinputs = /input|select|textarea|button/i,rbackslash = /\\(?!\\)/g,matchExpr = {
    "ID" : new RegExp("^#(" + characterEncoding + ")"),
    "CLASS" : new RegExp("^\\.(" + characterEncoding + ")"),
    "NAME" : new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
    "TAG" : new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
    "ATTR" : new RegExp("^" + attributes),
    "PSEUDO" : new RegExp("^" + pseudos),
    "POS" : new RegExp(pos, "i"),
    "CHILD" : new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
    // For use in libraries implementing .is()
    "needsContext" : new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
  },// Support
  // Used for testing something on an element
  assert = function(fn){

    var div = document.createElement("div");
    try{

      return fn(div);
    } catch(e) {

      return false;
    }finally{

      // release memory in IE
      div = null;
    };
  },// Check if getElementsByTagName("*") returns only elements
  assertTagNameNoComments = assert(function(div){

    div.appendChild(document.createComment(""));
    return !div.getElementsByTagName("*").length;
  }),// Check if getAttribute returns normalized href attributes
  assertHrefNotNormalized = assert(function(div){

    div.innerHTML = "<a href='#'></a>";
    return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute("href") === "#";
  }),// Check if attributes should be retrieved by attribute nodes
  assertAttributes = assert(function(div){

    div.innerHTML = "<select></select>";
    var type = typeof div.lastChild.getAttribute("multiple");
    // IE8 returns a string for some attributes even when not present
    return type !== "boolean" && type !== "string";
  }),// Check if getElementsByClassName can be trusted
  assertUsableClassName = assert(function(div){

    // Opera can't find a second classname (in 9.6)
    div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
    if(!div.getElementsByClassName || !div.getElementsByClassName("e").length){

      return false;
    };
    // Safari 3.2 caches class attributes and doesn't catch changes
    div.lastChild.className = "e";
    return div.getElementsByClassName("e").length === 2;
  }),// Check if getElementById returns elements by name
  // Check if getElementsByName privileges form controls or returns elements by ID
  assertUsableName = assert(function(div){

    // Inject content
    div.id = expando + 0;
    div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
    docElem.insertBefore(div, docElem.firstChild);
    // Test
    var pass = document.getElementsByName && // buggy browsers will return fewer than the correct 2
    document.getElementsByName(expando).length === 2 + // buggy browsers will return more than the correct 0
    document.getElementsByName(expando + 0).length;
    assertGetIdNotName = !document.getElementById(expando);
    // Cleanup
    docElem.removeChild(div);
    return pass;
  });
  // If slice is not available, provide a backup
  try{

    slice.call(docElem.childNodes, 0)[0].nodeType;
  } catch(e) {

    slice = function(i){

      var elem,results = [];
      for(;(elem = this[i]);i++){

        results.push(elem);
      };
      return results;
    };
  };
  function Sizzle(selector, context, results, seed){

    results = results || [];
    context = context || document;
    var match,elem,xml,m,nodeType = context.nodeType;
    if(!selector || typeof selector !== "string"){

      return results;
    };
    if(nodeType !== 1 && nodeType !== 9){

      return [];
    };
    xml = isXML(context);
    if(!xml && !seed){

      if((match = rquickExpr.exec(selector))){

        // Speed-up: Sizzle("#ID")
        if((m = match[1])){

          if(nodeType === 9){

            elem = context.getElementById(m);
            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            if(elem && elem.parentNode){

              // Handle the case where IE, Opera, and Webkit return items
              // by name instead of ID
              if(elem.id === m){

                results.push(elem);
                return results;
              };
            } else {

              return results;
            };
          } else {

            // Context is not a document
            if(context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m){

              results.push(elem);
              return results;
            };
          };
        } else if(match[2]){

          push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
          return results;
        } else if((m = match[3]) && assertUsableClassName && context.getElementsByClassName){

          push.apply(results, slice.call(context.getElementsByClassName(m), 0));
          return results;
        };;
      };
    };
    // All others
    return select(selector.replace(rtrim, "$1"), context, results, seed, xml);
  };
  Sizzle.matches = function(expr, elements){

    return Sizzle(expr, null, null, elements);
  };
  Sizzle.matchesSelector = function(elem, expr){

    return Sizzle(expr, null, null, [elem]).length > 0;
  };
  // Returns a function to use in pseudos for input types
  function createInputPseudo(type){

    return function(elem){

      var name = elem.nodeName.toLowerCase();
      return name === "input" && elem.type === type;
    };
  };
  // Returns a function to use in pseudos for buttons
  function createButtonPseudo(type){

    return function(elem){

      var name = elem.nodeName.toLowerCase();
      return (name === "input" || name === "button") && elem.type === type;
    };
  };
  // Returns a function to use in pseudos for positionals
  function createPositionalPseudo(fn){

    return markFunction(function(argument){

      argument = +argument;
      return markFunction(function(seed, matches){

        var j,matchIndexes = fn([], seed.length, argument),i = matchIndexes.length;
        // Match elements found at the specified indexes
        while(i--){

          if(seed[(j = matchIndexes[i])]){

            seed[j] = !(matches[j] = seed[j]);
          };
        };
      });
    });
  };
  /**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
  getText = Sizzle.getText = function(elem){

    var node,ret = "",i = 0,nodeType = elem.nodeType;
    if(nodeType){

      if(nodeType === 1 || nodeType === 9 || nodeType === 11){

        // Use textContent for elements
        // innerText usage removed for consistency of new lines (see #11153)
        if(typeof elem.textContent === "string"){

          return elem.textContent;
        } else {

          // Traverse its children
          for(elem = elem.firstChild;elem;elem = elem.nextSibling){

            ret += getText(elem);
          };
        };
      } else if(nodeType === 3 || nodeType === 4){

        return elem.nodeValue;
      };
    } else {

      // If no nodeType, this is expected to be an array
      for(;(node = elem[i]);i++){

        // Do not traverse comment nodes
        ret += getText(node);
      };
    };
    return ret;
  };
  isXML = Sizzle.isXML = function(elem){

    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
  };
  // Element contains another
  contains = Sizzle.contains = docElem.contains ? function(a, b){

    var adown = a.nodeType === 9 ? a.documentElement : a,bup = b && b.parentNode;
    return a === bup || !!(bup && bup.nodeType === 1 && adown.contains && adown.contains(bup));
  } : docElem.compareDocumentPosition ? function(a, b){

    return b && !!(a.compareDocumentPosition(b) & 16);
  } : function(a, b){

    while((b = b.parentNode)){

      if(b === a){

        return true;
      };
    };
    return false;
  };
  Sizzle.attr = function(elem, name){

    var val,xml = isXML(elem);
    if(!xml){

      name = name.toLowerCase();
    };
    if((val = Expr.attrHandle[name])){

      return val(elem);
    };
    if(xml || assertAttributes){

      return elem.getAttribute(name);
    };
    val = elem.getAttributeNode(name);
    return val ? typeof elem[name] === "boolean" ? elem[name] ? name : null : val.specified ? val.value : null : null;
  };
  Expr = Sizzle.selectors = {
    // Can be adjusted by the user
    cacheLength : 50,
    createPseudo : markFunction,
    match : matchExpr,
    // IE6/7 return a modified href
    attrHandle : assertHrefNotNormalized ? {
    } : {
      "href" : function(elem){

        return elem.getAttribute("href", 2);
      },
      "type" : function(elem){

        return elem.getAttribute("type");
      }
    },
    find : {
      "ID" : assertGetIdNotName ? function(id, context, xml){

        if(typeof context.getElementById !== strundefined && !xml){

          var m = context.getElementById(id);
          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document #6963
          return m && m.parentNode ? [m] : [];
        };
      } : function(id, context, xml){

        if(typeof context.getElementById !== strundefined && !xml){

          var m = context.getElementById(id);
          return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined : [];
        };
      },
      "TAG" : assertTagNameNoComments ? function(tag, context){

        if(typeof context.getElementsByTagName !== strundefined){

          return context.getElementsByTagName(tag);
        };
      } : function(tag, context){

        var results = context.getElementsByTagName(tag);
        // Filter out possible comments
        if(tag === "*"){

          var elem,tmp = [],i = 0;
          for(;(elem = results[i]);i++){

            if(elem.nodeType === 1){

              tmp.push(elem);
            };
          };
          return tmp;
        };
        return results;
      },
      "NAME" : assertUsableName && function(tag, context){

        if(typeof context.getElementsByName !== strundefined){

          return context.getElementsByName(name);
        };
      },
      "CLASS" : assertUsableClassName && function(className, context, xml){

        if(typeof context.getElementsByClassName !== strundefined && !xml){

          return context.getElementsByClassName(className);
        };
      }
    },
    relative : {
      ">" : {
        dir : "parentNode",
        first : true
      },
      " " : {
        dir : "parentNode"
      },
      "+" : {
        dir : "previousSibling",
        first : true
      },
      "~" : {
        dir : "previousSibling"
      }
    },
    preFilter : {
      "ATTR" : function(match){

        match[1] = match[1].replace(rbackslash, "");
        // Move the given value to match[3] whether quoted or unquoted
        match[3] = (match[4] || match[5] || "").replace(rbackslash, "");
        if(match[2] === "~="){

          match[3] = " " + match[3] + " ";
        };
        return match.slice(0, 4);
      },
      "CHILD" : function(match){

        /* matches from matchExpr["CHILD"]
          1 type (only|nth|...)
          2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          3 xn-component of xn+y argument ([+-]?\d*n|)
          4 sign of xn-component
          5 x of xn-component
          6 sign of y-component
          7 y of y-component
        */
        match[1] = match[1].toLowerCase();
        if(match[1] === "nth"){

          // nth-child requires argument
          if(!match[2]){

            Sizzle.error(match[0]);
          };
          // numeric x and y parameters for Expr.filter.CHILD
          // remember that false/true cast respectively to 0/1
          match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === "even" || match[2] === "odd"));
          match[4] = +((match[6] + match[7]) || match[2] === "odd");
        } else if(match[2]){

          Sizzle.error(match[0]);
        };
        return match;
      },
      "PSEUDO" : function(match){

        var unquoted,excess;
        if(matchExpr["CHILD"].test(match[0])){

          return null;
        };
        if(match[3]){

          match[2] = match[3];
        } else if((unquoted = match[4])){

          // Only check arguments that contain a pseudo
          if(rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
          (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
          (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)){

            // excess is a negative index
            unquoted = unquoted.slice(0, excess);
            match[0] = match[0].slice(0, excess);
          };
          match[2] = unquoted;
        };
        // Return only captures needed by the pseudo filter method (type and argument)
        return match.slice(0, 3);
      }
    },
    filter : {
      "ID" : assertGetIdNotName ? function(id){

        id = id.replace(rbackslash, "");
        return function(elem){

          return elem.getAttribute("id") === id;
        };
      } : function(id){

        id = id.replace(rbackslash, "");
        return function(elem){

          var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
          return node && node.value === id;
        };
      },
      "TAG" : function(nodeName){

        if(nodeName === "*"){

          return function(){

            return true;
          };
        };
        nodeName = nodeName.replace(rbackslash, "").toLowerCase();
        return function(elem){

          return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
        };
      },
      "CLASS" : function(className){

        var pattern = classCache[expando][className];
        if(!pattern){

          pattern = classCache(className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"));
        };
        return function(elem){

          return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
        };
      },
      "ATTR" : function(name, operator, check){

        return function(elem, context){

          var result = Sizzle.attr(elem, name);
          if(result == null){

            return operator === "!=";
          };
          if(!operator){

            return true;
          };
          result += "";
          return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.substr(result.length - check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.substr(0, check.length + 1) === check + "-" : false;
        };
      },
      "CHILD" : function(type, argument, first, last){

        if(type === "nth"){

          return function(elem){

            var node,diff,parent = elem.parentNode;
            if(first === 1 && last === 0){

              return true;
            };
            if(parent){

              diff = 0;
              for(node = parent.firstChild;node;node = node.nextSibling){

                if(node.nodeType === 1){

                  diff++;
                  if(elem === node){

                    break;
                  };
                };
              };
            };
            // Incorporate the offset (or cast to NaN), then check against cycle size
            diff -= last;
            return diff === first || (diff % first === 0 && diff / first >= 0);
          };
        };
        return function(elem){

          var node = elem;
          switch(type){case "only":case "first":
          while((node = node.previousSibling)){

            if(node.nodeType === 1){

              return false;
            };
          };
          if(type === "first"){

            return true;
          };
          node = elem;/* falls through */
          case "last":
          while((node = node.nextSibling)){

            if(node.nodeType === 1){

              return false;
            };
          };
          return true;};
        };
      },
      "PSEUDO" : function(pseudo, argument){

        // pseudo-class names are case-insensitive
        // http://www.w3.org/TR/selectors/#pseudo-classes
        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
        // Remember that setFilters inherits from pseudos
        var args,fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
        // The user may use createPseudo to indicate that
        // arguments are needed to create the filter function
        // just as Sizzle does
        if(fn[expando]){

          return fn(argument);
        };
        // But maintain support for old signatures
        if(fn.length > 1){

          args = [pseudo, pseudo, "", argument];
          return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches){

            var idx,matched = fn(seed, argument),i = matched.length;
            while(i--){

              idx = indexOf.call(seed, matched[i]);
              seed[idx] = !(matches[idx] = matched[i]);
            };
          }) : function(elem){

            return fn(elem, 0, args);
          };
        };
        return fn;
      }
    },
    pseudos : {
      "not" : markFunction(function(selector){

        // Trim the selector passed to compile
        // to avoid treating leading and trailing
        // spaces as combinators
        var input = [],results = [],matcher = compile(selector.replace(rtrim, "$1"));
        return matcher[expando] ? markFunction(function(seed, matches, context, xml){

          var elem,unmatched = matcher(seed, null, xml, []),i = seed.length;
          // Match elements unmatched by `matcher`
          while(i--){

            if((elem = unmatched[i])){

              seed[i] = !(matches[i] = elem);
            };
          };
        }) : function(elem, context, xml){

          input[0] = elem;
          matcher(input, null, xml, results);
          return !results.pop();
        };
      }),
      "has" : markFunction(function(selector){

        return function(elem){

          return Sizzle(selector, elem).length > 0;
        };
      }),
      "contains" : markFunction(function(text){

        return function(elem){

          return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
        };
      }),
      "enabled" : function(elem){

        return elem.disabled === false;
      },
      "disabled" : function(elem){

        return elem.disabled === true;
      },
      "checked" : function(elem){

        // In CSS3, :checked should return both checked and selected elements
        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
        var nodeName = elem.nodeName.toLowerCase();
        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
      },
      "selected" : function(elem){

        // Accessing this property makes selected-by-default
        // options in Safari work properly
        if(elem.parentNode){

          elem.parentNode.selectedIndex;
        };
        return elem.selected === true;
      },
      "parent" : function(elem){

        return !Expr.pseudos["empty"](elem);
      },
      "empty" : function(elem){

        // http://www.w3.org/TR/selectors/#empty-pseudo
        // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
        //   not comment, processing instructions, or others
        // Thanks to Diego Perini for the nodeName shortcut
        //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
        var nodeType;
        elem = elem.firstChild;
        while(elem){

          if(elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4){

            return false;
          };
          elem = elem.nextSibling;
        };
        return true;
      },
      "header" : function(elem){

        return rheader.test(elem.nodeName);
      },
      "text" : function(elem){

        var type,attr;
        // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
        // use getAttribute instead to test this case
        return elem.nodeName.toLowerCase() === "input" && (type = elem.type) === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type);
      },
      // Input types
      "radio" : createInputPseudo("radio"),
      "checkbox" : createInputPseudo("checkbox"),
      "file" : createInputPseudo("file"),
      "password" : createInputPseudo("password"),
      "image" : createInputPseudo("image"),
      "submit" : createButtonPseudo("submit"),
      "reset" : createButtonPseudo("reset"),
      "button" : function(elem){

        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === "button" || name === "button";
      },
      "input" : function(elem){

        return rinputs.test(elem.nodeName);
      },
      "focus" : function(elem){

        var doc = elem.ownerDocument;
        return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
      },
      "active" : function(elem){

        return elem === elem.ownerDocument.activeElement;
      },
      // Positional types
      "first" : createPositionalPseudo(function(matchIndexes, length, argument){

        return [0];
      }),
      "last" : createPositionalPseudo(function(matchIndexes, length, argument){

        return [length - 1];
      }),
      "eq" : createPositionalPseudo(function(matchIndexes, length, argument){

        return [argument < 0 ? argument + length : argument];
      }),
      "even" : createPositionalPseudo(function(matchIndexes, length, argument){

        for(var i = 0;i < length;i += 2){

          matchIndexes.push(i);
        };
        return matchIndexes;
      }),
      "odd" : createPositionalPseudo(function(matchIndexes, length, argument){

        for(var i = 1;i < length;i += 2){

          matchIndexes.push(i);
        };
        return matchIndexes;
      }),
      "lt" : createPositionalPseudo(function(matchIndexes, length, argument){

        for(var i = argument < 0 ? argument + length : argument;--i >= 0;){

          matchIndexes.push(i);
        };
        return matchIndexes;
      }),
      "gt" : createPositionalPseudo(function(matchIndexes, length, argument){

        for(var i = argument < 0 ? argument + length : argument;++i < length;){

          matchIndexes.push(i);
        };
        return matchIndexes;
      })
    }
  };
  function siblingCheck(a, b, ret){

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
  sortOrder = docElem.compareDocumentPosition ? function(a, b){

    if(a === b){

      hasDuplicate = true;
      return 0;
    };
    return (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1;
  } : function(a, b){

    // The nodes are identical, we can exit early
    if(a === b){

      hasDuplicate = true;
      return 0;
    } else if(a.sourceIndex && b.sourceIndex){

      return a.sourceIndex - b.sourceIndex;
    };
    var al,bl,ap = [],bp = [],aup = a.parentNode,bup = b.parentNode,cur = aup;
    // If the nodes are siblings (or identical) we can do a quick check
    if(aup === bup){

      return siblingCheck(a, b);
    } else if(!aup){

      return -1;
    } else if(!bup){

      return 1;
    };;
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
  // Always assume the presence of duplicates if sort doesn't
  // pass them to our comparison function (as in Google Chrome).
  [0, 0].sort(sortOrder);
  baseHasDuplicate = !hasDuplicate;
  // Document sorting and removing duplicates
  Sizzle.uniqueSort = function(results){

    var elem,i = 1;
    hasDuplicate = baseHasDuplicate;
    results.sort(sortOrder);
    if(hasDuplicate){

      for(;(elem = results[i]);i++){

        if(elem === results[i - 1]){

          results.splice(i--, 1);
        };
      };
    };
    return results;
  };
  Sizzle.error = function(msg){

    throw new Error("Syntax error, unrecognized expression: " + msg);
  };
  function tokenize(selector, parseOnly){

    var matched,match,tokens,type,soFar,groups,preFilters,cached = tokenCache[expando][selector];
    if(cached){

      return parseOnly ? 0 : cached.slice(0);
    };
    soFar = selector;
    groups = [];
    preFilters = Expr.preFilter;
    while(soFar){

      // Comma and first run
      if(!matched || (match = rcomma.exec(soFar))){

        if(match){

          soFar = soFar.slice(match[0].length);
        };
        groups.push(tokens = []);
      };
      matched = false;
      // Combinators
      if((match = rcombinators.exec(soFar))){

        tokens.push(matched = new Token(match.shift()));
        soFar = soFar.slice(matched.length);
        // Cast descendant combinators to space
        matched.type = match[0].replace(rtrim, " ");
      };
      // Filters
      for(type in Expr.filter){

        if((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || // The last two arguments here are (context, xml) for backCompat
        (match = preFilters[type](match, document, true)))){

          tokens.push(matched = new Token(match.shift()));
          soFar = soFar.slice(matched.length);
          matched.type = type;
          matched.matches = match;
        };
      };
      if(!matched){

        break;
      };
    };
    // Return the length of the invalid excess
    // if we're just parsing
    // Otherwise, throw an error or return tokens
    return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
    tokenCache(selector, groups).slice(0);
  };
  function addCombinator(matcher, combinator, base){

    var dir = combinator.dir,checkNonElements = base && combinator.dir === "parentNode",doneName = done++;
    return combinator.first ? // Check against closest ancestor/preceding element
    function(elem, context, xml){

      while((elem = elem[dir])){

        if(checkNonElements || elem.nodeType === 1){

          return matcher(elem, context, xml);
        };
      };
    } : // Check against all ancestor/preceding elements
    function(elem, context, xml){

      // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
      if(!xml){

        var cache,dirkey = dirruns + " " + doneName + " ",cachedkey = dirkey + cachedruns;
        while((elem = elem[dir])){

          if(checkNonElements || elem.nodeType === 1){

            if((cache = elem[expando]) === cachedkey){

              return elem.sizset;
            } else if(typeof cache === "string" && cache.indexOf(dirkey) === 0){

              if(elem.sizset){

                return elem;
              };
            } else {

              elem[expando] = cachedkey;
              if(matcher(elem, context, xml)){

                elem.sizset = true;
                return elem;
              };
              elem.sizset = false;
            };
          };
        };
      } else {

        while((elem = elem[dir])){

          if(checkNonElements || elem.nodeType === 1){

            if(matcher(elem, context, xml)){

              return elem;
            };
          };
        };
      };
    };
  };
  function elementMatcher(matchers){

    return matchers.length > 1 ? function(elem, context, xml){

      var i = matchers.length;
      while(i--){

        if(!matchers[i](elem, context, xml)){

          return false;
        };
      };
      return true;
    } : matchers[0];
  };
  function condense(unmatched, map, filter, context, xml){

    var elem,newUnmatched = [],i = 0,len = unmatched.length,mapped = map != null;
    for(;i < len;i++){

      if((elem = unmatched[i])){

        if(!filter || filter(elem, context, xml)){

          newUnmatched.push(elem);
          if(mapped){

            map.push(i);
          };
        };
      };
    };
    return newUnmatched;
  };
  function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector){

    if(postFilter && !postFilter[expando]){

      postFilter = setMatcher(postFilter);
    };
    if(postFinder && !postFinder[expando]){

      postFinder = setMatcher(postFinder, postSelector);
    };
    return markFunction(function(seed, results, context, xml){

      // Positional selectors apply to seed elements, so it is invalid to follow them with relative ones
      if(seed && postFinder){

        return;
      };
      var i,elem,postFilterIn,preMap = [],postMap = [],preexisting = results.length,// Get initial elements from seed or context
      elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, [], seed),// Prefilter to get matcher input, preserving a map for seed-results synchronization
      matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
      postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
      [] : // ...otherwise use results directly
      results : matcherIn;
      // Find primary matches
      if(matcher){

        matcher(matcherIn, matcherOut, context, xml);
      };
      // Apply postFilter
      if(postFilter){

        postFilterIn = condense(matcherOut, postMap);
        postFilter(postFilterIn, [], context, xml);
        // Un-match failing elements by moving them back to matcherIn
        i = postFilterIn.length;
        while(i--){

          if((elem = postFilterIn[i])){

            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
          };
        };
      };
      // Keep seed and results synchronized
      if(seed){

        // Ignore postFinder because it can't coexist with seed
        i = preFilter && matcherOut.length;
        while(i--){

          if((elem = matcherOut[i])){

            seed[preMap[i]] = !(results[preMap[i]] = elem);
          };
        };
      } else {

        matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
        if(postFinder){

          postFinder(null, results, matcherOut, xml);
        } else {

          push.apply(results, matcherOut);
        };
      };
    });
  };
  function matcherFromTokens(tokens){

    var checkContext,matcher,j,len = tokens.length,leadingRelative = Expr.relative[tokens[0].type],implicitRelative = leadingRelative || Expr.relative[" "],i = leadingRelative ? 1 : 0,// The foundational matcher ensures that elements are reachable from top-level context(s)
    matchContext = addCombinator(function(elem){

      return elem === checkContext;
    }, implicitRelative, true),matchAnyContext = addCombinator(function(elem){

      return indexOf.call(checkContext, elem) > -1;
    }, implicitRelative, true),matchers = [function(elem, context, xml){

      return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
    }];
    for(;i < len;i++){

      if((matcher = Expr.relative[tokens[i].type])){

        matchers = [addCombinator(elementMatcher(matchers), matcher)];
      } else {

        // The concatenated values are (context, xml) for backCompat
        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
        // Return special upon seeing a positional matcher
        if(matcher[expando]){

          // Find the next relative operator (if any) for proper handling
          j = ++i;
          for(;j < len;j++){

            if(Expr.relative[tokens[j].type]){

              break;
            };
          };
          return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && tokens.join(""));
        };
        matchers.push(matcher);
      };
    };
    return elementMatcher(matchers);
  };
  function matcherFromGroupMatchers(elementMatchers, setMatchers){

    var bySet = setMatchers.length > 0,byElement = elementMatchers.length > 0,superMatcher = function(seed, context, xml, results, expandContext){

      var elem,j,matcher,setMatched = [],matchedCount = 0,i = "0",unmatched = seed && [],outermost = expandContext != null,contextBackup = outermostContext,// We must always have either seed elements or context
      elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),// Nested matchers should use non-integer dirruns
      dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);
      if(outermost){

        outermostContext = context !== document && context;
        cachedruns = superMatcher.el;
      };
      // Add elements passing elementMatchers directly to results
      for(;(elem = elems[i]) != null;i++){

        if(byElement && elem){

          for(j = 0;(matcher = elementMatchers[j]);j++){

            if(matcher(elem, context, xml)){

              results.push(elem);
              break;
            };
          };
          if(outermost){

            dirruns = dirrunsUnique;
            cachedruns = ++superMatcher.el;
          };
        };
        // Track unmatched elements for set filters
        if(bySet){

          // They will have gone through all possible matchers
          if((elem = !matcher && elem)){

            matchedCount--;
          };
          // Lengthen the array for every element, matched or not
          if(seed){

            unmatched.push(elem);
          };
        };
      };
      // Apply set filters to unmatched elements
      matchedCount += i;
      if(bySet && i !== matchedCount){

        for(j = 0;(matcher = setMatchers[j]);j++){

          matcher(unmatched, setMatched, context, xml);
        };
        if(seed){

          // Reintegrate element matches to eliminate the need for sorting
          if(matchedCount > 0){

            while(i--){

              if(!(unmatched[i] || setMatched[i])){

                setMatched[i] = pop.call(results);
              };
            };
          };
          // Discard index placeholder values to get only actual matches
          setMatched = condense(setMatched);
        };
        // Add matches to results
        push.apply(results, setMatched);
        // Seedless set matches succeeding multiple successful matchers stipulate sorting
        if(outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1){

          Sizzle.uniqueSort(results);
        };
      };
      // Override manipulation of globals by nested matchers
      if(outermost){

        dirruns = dirrunsUnique;
        outermostContext = contextBackup;
      };
      return unmatched;
    };
    superMatcher.el = 0;
    return bySet ? markFunction(superMatcher) : superMatcher;
  };
  compile = Sizzle.compile = function(selector, group){

    var i,setMatchers = [],elementMatchers = [],cached = compilerCache[expando][selector];
    if(!cached){

      // Generate a function of recursive functions that can be used to check each element
      if(!group){

        group = tokenize(selector);
      };
      i = group.length;
      while(i--){

        cached = matcherFromTokens(group[i]);
        if(cached[expando]){

          setMatchers.push(cached);
        } else {

          elementMatchers.push(cached);
        };
      };
      // Cache the compiled function
      cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
    };
    return cached;
  };
  function multipleContexts(selector, contexts, results, seed){

    var i = 0,len = contexts.length;
    for(;i < len;i++){

      Sizzle(selector, contexts[i], results, seed);
    };
    return results;
  };
  function select(selector, context, results, seed, xml){

    var i,tokens,token,type,find,match = tokenize(selector),j = match.length;
    if(!seed){

      // Try to minimize operations if there is only one group
      if(match.length === 1){

        // Take a shortcut and set the context if the root selector is an ID
        tokens = match[0] = match[0].slice(0);
        if(tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && !xml && Expr.relative[tokens[1].type]){

          context = Expr.find["ID"](token.matches[0].replace(rbackslash, ""), context, xml)[0];
          if(!context){

            return results;
          };
          selector = selector.slice(tokens.shift().length);
        };
        // Fetch a seed set for right-to-left matching
        for(i = matchExpr["POS"].test(selector) ? -1 : tokens.length - 1;i >= 0;i--){

          token = tokens[i];
          // Abort if we hit a combinator
          if(Expr.relative[(type = token.type)]){

            break;
          };
          if((find = Expr.find[type])){

            // Search, expanding context for leading sibling combinators
            if((seed = find(token.matches[0].replace(rbackslash, ""), rsibling.test(tokens[0].type) && context.parentNode || context, xml))){

              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && tokens.join("");
              if(!selector){

                push.apply(results, slice.call(seed, 0));
                return results;
              };
              break;
            };
          };
        };
      };
    };
    // Compile and execute a filtering function
    // Provide `match` to avoid retokenization if we modified the selector above
    compile(selector, match)(seed, context, xml, results, rsibling.test(selector));
    return results;
  };
  if(document.querySelectorAll){

    (function(){

      var disconnectedMatch,oldSelect = select,rescape = /'|\\/g,rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,// qSa(:focus) reports false when true (Chrome 21),
      // A support test would require too much code (would include document ready)
      rbuggyQSA = [":focus"],// matchesSelector(:focus) reports false when true (Chrome 21),
      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
      // A support test would require too much code (would include document ready)
      // just skip matchesSelector for :active
      rbuggyMatches = [":active", ":focus"],matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
      // Build QSA regex
      // Regex strategy adopted from Diego Perini
      assert(function(div){

        // Select is set to empty string on purpose
        // This is to test IE's treatment of not explictly
        // setting a boolean content attribute,
        // since its presence should be enough
        // http://bugs.jquery.com/ticket/12359
        div.innerHTML = "<select><option selected=''></option></select>";
        // IE8 - Some boolean attributes are not treated correctly
        if(!div.querySelectorAll("[selected]").length){

          rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
        };
        // Webkit/Opera - :checked should return selected option elements
        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
        // IE8 throws error here (do not put tests after this one)
        if(!div.querySelectorAll(":checked").length){

          rbuggyQSA.push(":checked");
        };
      });
      assert(function(div){

        // Opera 10-12/IE9 - ^= $= *= and empty values
        // Should not select anything
        div.innerHTML = "<p test=''></p>";
        if(div.querySelectorAll("[test^='']").length){

          rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
        };
        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
        // IE8 throws error here (do not put tests after this one)
        div.innerHTML = "<input type='hidden'/>";
        if(!div.querySelectorAll(":enabled").length){

          rbuggyQSA.push(":enabled", ":disabled");
        };
      });
      // rbuggyQSA always contains :focus, so no need for a length check
      rbuggyQSA = /* rbuggyQSA.length && */      new RegExp(rbuggyQSA.join("|"));
      select = function(selector, context, results, seed, xml){

        // Only use querySelectorAll when not filtering,
        // when this is not xml,
        // and when no QSA bugs apply
        if(!seed && !xml && (!rbuggyQSA || !rbuggyQSA.test(selector))){

          var groups,i,old = true,nid = expando,newContext = context,newSelector = context.nodeType === 9 && selector;
          // qSA works strangely on Element-rooted queries
          // We can work around this by specifying an extra ID on the root
          // and working up from there (Thanks to Andrew Dupont for the technique)
          // IE 8 doesn't work on object elements
          if(context.nodeType === 1 && context.nodeName.toLowerCase() !== "object"){

            groups = tokenize(selector);
            if((old = context.getAttribute("id"))){

              nid = old.replace(rescape, "\\$&");
            } else {

              context.setAttribute("id", nid);
            };
            nid = "[id='" + nid + "'] ";
            i = groups.length;
            while(i--){

              groups[i] = nid + groups[i].join("");
            };
            newContext = rsibling.test(selector) && context.parentNode || context;
            newSelector = groups.join(",");
          };
          if(newSelector){

            try{

              push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
              return results;
            } catch(qsaError) {
            }finally{

              if(!old){

                context.removeAttribute("id");
              };
            };
          };
        };
        return oldSelect(selector, context, results, seed, xml);
      };
      if(matches){

        assert(function(div){

          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          disconnectedMatch = matches.call(div, "div");
          // This should fail with an exception
          // Gecko does not error, returns false instead
          try{

            matches.call(div, "[test!='']:sizzle");
            rbuggyMatches.push("!=", pseudos);
          } catch(e) {
          };
        });
        // rbuggyMatches always contains :active and :focus, so no need for a length check
        rbuggyMatches = /* rbuggyMatches.length && */        new RegExp(rbuggyMatches.join("|"));
        Sizzle.matchesSelector = function(elem, expr){

          // Make sure that attribute selectors are quoted
          expr = expr.replace(rattributeQuotes, "='$1']");
          // rbuggyMatches always contains :active, so no need for an existence check
          if(!isXML(elem) && !rbuggyMatches.test(expr) && (!rbuggyQSA || !rbuggyQSA.test(expr))){

            try{

              var ret = matches.call(elem, expr);
              // IE 9's matchesSelector returns false on disconnected nodes
              if(ret || disconnectedMatch || // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              elem.document && elem.document.nodeType !== 11){

                return ret;
              };
            } catch(e) {
            };
          };
          return Sizzle(expr, null, null, [elem]).length > 0;
        };
      };
    })();
  };
  // Deprecated
  Expr.pseudos["nth"] = Expr.pseudos["eq"];
  // Back-compat
  function setFilters(){
  };
  Expr.filters = setFilters.prototype = Expr.pseudos;
  Expr.setFilters = new setFilters();
  // EXPOSE qooxdoo variant
  qx.bom.Selector.query = function(selector, context){

    return Sizzle(selector, context);
  };
  qx.bom.Selector.matches = function(selector, set){

    return Sizzle(selector, null, null, set);
  };
})(window);

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
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This module offers a cross browser storage implementation. The API is aligned
 * with the API of the HTML web storage (http://www.w3.org/TR/webstorage/) which is
 * also the preferred implementation used. As fallback for IE < 8, we use user data.
 * If both techniques are unsupported, we supply a in memory storage, which is
 * of course, not persistent.
 */
qx.Bootstrap.define("qx.module.Storage", {
  statics : {
    /**
     * Store an item in the storage.
     *
     * @attachStatic {qxWeb, localStorage.setItem}
     * @param key {String} The identifier key.
     * @param value {var} The data, which will be stored as JSON.
     */
    setLocalItem : function(key, value){

      qx.bom.Storage.getLocal().setItem(key, value);
    },
    /**
     * Returns the stored item.
     *
     * @attachStatic {qxWeb, localStorage.getItem}
     * @param key {String} The identifier to get the data.
     * @return {var} The stored data.
     */
    getLocalItem : function(key){

      return qx.bom.Storage.getLocal().getItem(key);
    },
    /**
     * Removes an item form the storage.
     * @attachStatic {qxWeb, localStorage.removeItem}
     * @param key {String} The identifier.
     */
    removeLocalItem : function(key){

      qx.bom.Storage.getLocal().removeItem(key);
    },
    /**
     * Returns the amount of key-value pairs stored.
     * @attachStatic {qxWeb, localStorage.getLength}
     * @return {Number} The length of the storage.
     */
    getLocalLength : function(){

      return qx.bom.Storage.getLocal().getLength();
    },
    /**
     * Returns the named key at the given index.
     * @attachStatic {qxWeb, localStorage.getKey}
     * @param index {Number} The index in the storage.
     * @return {String} The key stored at the given index.
     */
    getLocalKey : function(index){

      return qx.bom.Storage.getLocal().getKey(index);
    },
    /**
     * Deletes every stored item in the storage.
     * @attachStatic {qxWeb, localStorage.clear}
     */
    clearLocal : function(){

      qx.bom.Storage.getLocal().clear();
    },
    /**
     * Helper to access every stored item.
     *
     * @attachStatic {qxWeb, localStorage.forEach}
     * @param callback {Function} A function which will be called for every item.
     *   The function will have two arguments, first the key and second the value
     *    of the stored data.
     * @param scope {var} The scope of the function.
     */
    forEachLocal : function(callback, scope){

      qx.bom.Storage.getLocal().forEach(callback, scope);
    },
    /**
     * Store an item in the storage.
     *
     * @attachStatic {qxWeb, sessionStorage.setItem}
     * @param key {String} The identifier key.
     * @param value {var} The data, which will be stored as JSON.
     */
    setSessionItem : function(key, value){

      qx.bom.Storage.getSession().setItem(key, value);
    },
    /**
     * Returns the stored item.
     *
     * @attachStatic {qxWeb, sessionStorage.getItem}
     * @param key {String} The identifier to get the data.
     * @return {var} The stored data.
     */
    getSessionItem : function(key){

      return qx.bom.Storage.getSession().getItem(key);
    },
    /**
     * Removes an item form the storage.
     * @attachStatic {qxWeb, sessionStorage.removeItem}
     * @param key {String} The identifier.
     */
    removeSessionItem : function(key){

      qx.bom.Storage.getSession().removeItem(key);
    },
    /**
     * Returns the amount of key-value pairs stored.
     * @attachStatic {qxWeb, sessionStorage.getLength}
     * @return {Number} The length of the storage.
     */
    getSessionLength : function(){

      return qx.bom.Storage.getSession().getLength();
    },
    /**
     * Returns the named key at the given index.
     * @attachStatic {qxWeb, sessionStorage.getKey}
     * @param index {Number} The index in the storage.
     * @return {String} The key stored at the given index.
     */
    getSessionKey : function(index){

      return qx.bom.Storage.getSession().getKey(index);
    },
    /**
     * Deletes every stored item in the storage.
     * @attachStatic {qxWeb, sessionStorage.clear}
     */
    clearSession : function(){

      qx.bom.Storage.getSession().clear();
    },
    /**
     * Helper to access every stored item.
     *
     * @attachStatic {qxWeb, sessionStorage.forEach}
     * @param callback {Function} A function which will be called for every item.
     *   The function will have two arguments, first the key and second the value
     *    of the stored data.
     * @param scope {var} The scope of the function.
     */
    forEachSession : function(callback, scope){

      qx.bom.Storage.getSession().forEach(callback, scope);
    }
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      "localStorage" : {
        setItem : statics.setLocalItem,
        getItem : statics.getLocalItem,
        removeItem : statics.removeLocalItem,
        getLength : statics.getLocalLength,
        getKey : statics.getLocalKey,
        clear : statics.clearLocal,
        forEach : statics.forEachLocal
      },
      "sessionStorage" : {
        setItem : statics.setSessionItem,
        getItem : statics.getSessionItem,
        removeItem : statics.removeSessionItem,
        getLength : statics.getSessionLength,
        getKey : statics.getSessionKey,
        clear : statics.clearSession,
        forEach : statics.forEachSession
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
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This is a cross browser storage implementation. The API is aligned with the
 * API of the HTML web storage (http://www.w3.org/TR/webstorage/) which is also
 * the preferred implementation used. As fallback for IE < 8, we use user data.
 * If both techniques are unsupported, we supply a in memory storage, which is
 * of course, not persistent.
 */
qx.Bootstrap.define("qx.bom.Storage", {
  statics : {
    __impl : null,
    /**
     * Get an instance of a local storage.
     * @return {qx.bom.storage.Web|qx.bom.storage.UserData|qx.bom.storage.Memory}
     *   An instance of a storage implementation.
     */
    getLocal : function(){

      // always use HTML5 web storage if available
      if(qx.core.Environment.get("html.storage.local")){

        return qx.bom.storage.Web.getLocal();
      } else if(qx.core.Environment.get("html.storage.userdata")){

        // IE <8 fallback
        // as fallback,use the userdata storage for IE5.5 - 8
        return qx.bom.storage.UserData.getLocal();
      };
      // as last fallback, use a in memory storage (this one is not persistent)
      return qx.bom.storage.Memory.getLocal();
    },
    /**
     * Get an instance of a session storage.
     * @return {qx.bom.storage.Web|qx.bom.storage.UserData|qx.bom.storage.Memory}
     *   An instance of a storage implementation.
     */
    getSession : function(){

      // always use HTML5 web storage if available
      if(qx.core.Environment.get("html.storage.local")){

        return qx.bom.storage.Web.getSession();
      } else if(qx.core.Environment.get("html.storage.userdata")){

        // IE <8 fallback
        // as fallback,use the userdata storage for IE5.5 - 8
        return qx.bom.storage.UserData.getSession();
      };
      // as last fallback, use a in memory storage (this one is not persistent)
      return qx.bom.storage.Memory.getSession();
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
     * https://developer.mozilla.org/en-US/docs/DOM/element.classList
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
    },
    /**
     * Check for HTML5 history manipulation support.
    
     * @internal
     * @return {Boolean} <code>true</code> if the HTML5 history API is supported
     */
    getHistoryState : function(){

      return (typeof window.onpopstate !== "undefined" && typeof window.history.replaceState !== "undefined" && typeof window.history.pushState !== "undefined");
    },
    /**
     * Returns the name of the native object/function used to access the
     * document's text selection.
     *
     * @return {String|null} <code>getSelection</code> if the standard window.getSelection
     * function is available; <code>selection</code> if the MS-proprietary
     * document.selection object is available; <code>null</code> if no known
     * text selection API is available.
     */
    getSelection : function(){

      if(typeof window.getSelection === "function"){

        return "getSelection";
      };
      if(typeof document.selection === "object"){

        return "selection";
      };
      return null;
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
    qx.core.Environment.add("html.history.state", statics.getHistoryState);
    qx.core.Environment.add("html.selection", statics.getSelection);
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
/* ************************************************************************
#require(qx.bom.storage.Web#getLength)
#require(qx.bom.storage.Web#setItem)
#require(qx.bom.storage.Web#getItem)
#require(qx.bom.storage.Web#removeItem)
#require(qx.bom.storage.Web#clear)
#require(qx.bom.storage.Web#getKey)
#require(qx.bom.storage.Web#forEach)
************************************************************************ */
/**
 * Storage implementation using HTML web storage:
 * http://www.w3.org/TR/webstorage/
 */
qx.Bootstrap.define("qx.bom.storage.Web", {
  statics : {
    __local : null,
    __session : null,
    /**
     * Static accessor for the local storage.
     * @return {qx.bom.storage.Web} An instance of a local storage.
     */
    getLocal : function(){

      if(this.__local){

        return this.__local;
      };
      return this.__local = new qx.bom.storage.Web("local");
    },
    /**
     * Static accessor for the session storage.
     * @return {qx.bom.storage.Web} An instance of a session storage.
     */
    getSession : function(){

      if(this.__session){

        return this.__session;
      };
      return this.__session = new qx.bom.storage.Web("session");
    }
  },
  /**
   * Create a new instance. Usually, you should take the static
   * accessors to get your instance.
   *
   * @param type {String} type of storage, either
   *   <code>local</code> or <code>session</code>.
   */
  construct : function(type){

    this.__type = type;
  },
  members : {
    __type : null,
    /**
     * Returns the internal used storage (the native object).
     *
     * @internal
     * @return {Storage} The native storage implementation.
     */
    getStorage : function(){

      return window[this.__type + "Storage"];
    },
    /**
     * Returns the amount of key-value pairs stored.
     * @return {Integer} The length of the storage.
     */
    getLength : function(){

      return this.getStorage(this.__type).length;
    },
    /**
     * Store an item in the storage.
     *
     * @param key {String} The identifier key.
     * @param value {var} The data, which will be stored as JSON.
     */
    setItem : function(key, value){

      value = qx.lang.Json.stringify(value);
      try{

        this.getStorage(this.__type).setItem(key, value);
      } catch(e) {

        throw new Error("Storage full.");
      };
    },
    /**
     * Returns the stored item.
     *
     * @param key {String} The identifier to get the data.
     * @return {var} The stored data.
     */
    getItem : function(key){

      var item = this.getStorage(this.__type).getItem(key);
      if(qx.lang.Type.isString(item)){

        item = qx.lang.Json.parse(item);
      } else if(item && item.value && qx.lang.Type.isString(item.value)){

        item = qx.lang.Json.parse(item.value);
      };
      return item;
    },
    /**
     * Removes an item form the storage.
     * @param key {String} The identifier.
     */
    removeItem : function(key){

      this.getStorage(this.__type).removeItem(key);
    },
    /**
     * Deletes every stored item in the storage.
     */
    clear : function(){

      var storage = this.getStorage(this.__type);
      if(!storage.clear){

        for(var i = storage.length - 1;i >= 0;i--){

          storage.removeItem(storage.key(i));
        };
      } else {

        storage.clear();
      };
    },
    /**
     * Returns the named key at the given index.
     * @param index {Integer} The index in the storage.
     * @return {String} The key stored at the given index.
     */
    getKey : function(index){

      return this.getStorage(this.__type).key(index);
    },
    /**
     * Helper to access every stored item.
     *
     * @param callback {Function} A function which will be called for every item.
     *   The function will have two arguments, first the key and second the value
     *    of the stored data.
     * @param scope {var} The scope of the function.
     */
    forEach : function(callback, scope){

      var length = this.getLength();
      for(var i = 0;i < length;i++){

        var key = this.getKey(i);
        callback.call(scope, key, this.getItem(key));
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
     * Fabian Jakobs (fjakobs)
   ________________________________________________________________________

   This class contains code based on the following work:

    http://www.JSON.org/json2.js
    2009-06-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

************************************************************************ */
/**
 * Pure JavaScript implementation of the EcmaScript 3.1 JSON object. This class
 * is used, if the browser does not support it natively.
 *
 * @internal
 */
qx.Bootstrap.define("qx.lang.JsonImpl", {
  extend : Object,
  construct : function(){

    // bind parse and stringify so they can be called without a context.
    this.stringify = qx.lang.Function.bind(this.stringify, this);
    this.parse = qx.lang.Function.bind(this.parse, this);
  },
  members : {
    __gap : null,
    __indent : null,
    __rep : null,
    __stack : null,
    /**
     * This method produces a JSON text from a JavaScript value.
     *
     * @param value {var} any JavaScript value, usually an object or array.
     *
     * @param replacer {Function?} an optional parameter that determines how
     *    object values are stringified for objects. It can be a function or an
     *    array of strings.
     *
     * @param space {String?} an optional parameter that specifies the
     *    indentation of nested structures. If it is omitted, the text will
     *    be packed without extra whitespace. If it is a number, it will specify
     *    the number of spaces to indent at each level. If it is a string
     *    (such as '\t' or '&nbsp;'), it contains the characters used to indent
     *    at each level.
     *
     * @return {String} The JSON string of the value
     */
    stringify : function(value, replacer, space){

      this.__gap = '';
      this.__indent = '';
      this.__stack = [];
      if(qx.lang.Type.isNumber(space)){

        // If the space parameter is a number, make an indent string containing that
        // many spaces.
        var space = Math.min(10, Math.floor(space));
        for(var i = 0;i < space;i += 1){

          this.__indent += ' ';
        };
      } else if(qx.lang.Type.isString(space)){

        if(space.length > 10){

          space = space.slice(0, 10);
        };
        // If the space parameter is a string, it will be used as the indent string.
        this.__indent = space;
      };
      // If there is a replacer, it must be a function or an array.
      // Otherwise, ignore it.
      if(replacer && (qx.lang.Type.isFunction(replacer) || qx.lang.Type.isArray(replacer))){

        this.__rep = replacer;
      } else {

        this.__rep = null;
      };
      // Make a fake root object containing our value under the key of ''.
      // Return the result of stringifying the value.
      return this.__str('', {
        '' : value
      });
    },
    /**
     * Produce a string from holder[key].
     *
     * @param key {String} the map key
     * @param holder {Object} an object with the given key
     * @return {String} The string representation of holder[key]
     */
    __str : function(key, holder){

      var mind = this.__gap,partial,value = holder[key];
      // If the value has a toJSON method, call it to obtain a replacement value.
      if(value && qx.lang.Type.isFunction(value.toJSON)){

        value = value.toJSON(key);
      } else if(qx.lang.Type.isDate(value)){

        value = this.dateToJSON(value);
      };
      // If we were called with a replacer function, then call the replacer to
      // obtain a replacement value.
      if(typeof this.__rep === 'function'){

        value = this.__rep.call(holder, key, value);
      };
      if(value === null){

        return 'null';
      };
      if(value === undefined){

        return undefined;
      };
      // What happens next depends on the value's type.
      switch(qx.lang.Type.getClass(value)){case 'String':
      return this.__quote(value);case 'Number':
      // JSON numbers must be finite. Encode non-finite numbers as null.
      return isFinite(value) ? String(value) : 'null';case 'Boolean':
      // If the value is a boolean or null, convert it to a string. Note:
      // typeof null does not produce 'null'. The case is included here in
      // the remote chance that this gets fixed someday.
      return String(value);case 'Array':
      // Make an array to hold the partial results of stringifying this array value.
      this.__gap += this.__indent;
      partial = [];
      if(this.__stack.indexOf(value) !== -1){

        throw new TypeError("Cannot stringify a recursive object.");
      };
      this.__stack.push(value);
      // The value is an array. Stringify every element. Use null as a placeholder
      // for non-JSON values.
      var length = value.length;
      for(var i = 0;i < length;i += 1){

        partial[i] = this.__str(i, value) || 'null';
      };
      this.__stack.pop();
      // Join all of the elements together, separated with commas, and wrap them in
      // brackets.
      if(partial.length === 0){

        var string = '[]';
      } else if(this.__gap){

        string = '[\n' + this.__gap + partial.join(',\n' + this.__gap) + '\n' + mind + ']';
      } else {

        string = '[' + partial.join(',') + ']';
      };
      this.__gap = mind;
      return string;case 'Object':
      // Make an array to hold the partial results of stringifying this object value.
      this.__gap += this.__indent;
      partial = [];
      if(this.__stack.indexOf(value) !== -1){

        throw new TypeError("Cannot stringify a recursive object.");
      };
      this.__stack.push(value);
      // If the replacer is an array, use it to select the members to be stringified.
      if(this.__rep && typeof this.__rep === 'object'){

        var length = this.__rep.length;
        for(var i = 0;i < length;i += 1){

          var k = this.__rep[i];
          if(typeof k === 'string'){

            var v = this.__str(k, value);
            if(v){

              partial.push(this.__quote(k) + (this.__gap ? ': ' : ':') + v);
            };
          };
        };
      } else {

        // Otherwise, iterate through all of the keys in the object.
        for(var k in value){

          if(Object.hasOwnProperty.call(value, k)){

            var v = this.__str(k, value);
            if(v){

              partial.push(this.__quote(k) + (this.__gap ? ': ' : ':') + v);
            };
          };
        };
      };
      this.__stack.pop();
      // Join all of the member texts together, separated with commas,
      // and wrap them in braces.
      if(partial.length === 0){

        var string = '{}';
      } else if(this.__gap){

        string = '{\n' + this.__gap + partial.join(',\n' + this.__gap) + '\n' + mind + '}';
      } else {

        string = '{' + partial.join(',') + '}';
      };
      this.__gap = mind;
      return string;};
    },
    /**
     * Convert a date to JSON
     *
     * @param date {Date} The date to convert
     * @return {String} The JSON representation of the date
     */
    dateToJSON : function(date){

      // Format integers to have at least two digits.
      var f2 = function(n){

        return n < 10 ? '0' + n : n;
      };
      var f3 = function(n){

        var value = f2(n);
        return n < 100 ? '0' + value : value;
      };
      return isFinite(date.valueOf()) ? date.getUTCFullYear() + '-' + f2(date.getUTCMonth() + 1) + '-' + f2(date.getUTCDate()) + 'T' + f2(date.getUTCHours()) + ':' + f2(date.getUTCMinutes()) + ':' + f2(date.getUTCSeconds()) + '.' + f3(date.getUTCMilliseconds()) + 'Z' : null;
    },
    /**
     * If the string contains no control characters, no quote characters, and no
     * backslash characters, then we can safely slap some quotes around it.
     * Otherwise we must also replace the offending characters with safe escape
     * sequences.
     *
     * @param string {String} The string to quote
     * @return {String} The quoted string
     */
    __quote : function(string){

      var meta = {
        // table of character substitutions
        '\b' : '\\b',
        '\t' : '\\t',
        '\n' : '\\n',
        '\f' : '\\f',
        '\r' : '\\r',
        '"' : '\\"',
        '\\' : '\\\\'
      };
      var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      escapable.lastIndex = 0;
      if(escapable.test(string)){

        return '"' + string.replace(escapable, function(a){

          var c = meta[a];
          return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"';
      } else {

        return '"' + string + '"';
      };
    },
    /**
     * This method parses a JSON text to produce an object or array.
     * It can throw a SyntaxError exception.
     *
     * @param text {String} JSON string to parse
     *
     * @param reviver {Function?} Optional reviver function to filter and
     *    transform the results
     *
     * @return {Object} The parsed JSON object
     *
     * @lint ignoreDeprecated(eval)
     */
    parse : function(text, reviver){

      var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      cx.lastIndex = 0;
      // Parsing happens in four stages. In the first stage, we replace certain
      // Unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.
      if(cx.test(text)){

        text = text.replace(cx, function(a){

          return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        });
      };
      // In the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with '()' and 'new'
      // because they can cause invocation, and '=' because it can cause mutation.
      // But just to be safe, we want to reject all unexpected forms.
      // We split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
      // replace all simple value tokens with ']' characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or ']' or
      // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
      if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))){

        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.
        var j = eval('(' + text + ')');
        // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.
        return typeof reviver === 'function' ? this.__walk({
          '' : j
        }, '', reviver) : j;
      };
      // If the text is not JSON parseable, then a SyntaxError is thrown.
      throw new SyntaxError('JSON.parse');
    },
    /**
     * The walk method is used to recursively walk the resulting structure so
     * that modifications can be made.
     *
     * @param holder {Object} the root object
     * @param key {String} walk holder[key]
     * @param reviver {Function} callback, which is called on every node.
     * @return {var} The reviver's return value
     */
    __walk : function(holder, key, reviver){

      var value = holder[key];
      if(value && typeof value === 'object'){

        for(var k in value){

          if(Object.hasOwnProperty.call(value, k)){

            var v = this.__walk(value, k, reviver);
            if(v !== undefined){

              value[k] = v;
            } else {

              delete value[k];
            };
          };
        };
      };
      return reviver.call(holder, key, value);
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
     * @deprecated {2.1} Please use a new empty function.
     */
    empty : function(){
    },
    /**
     * Simply return true.
     * @deprecated {2.1} Please use a custom function.
     * @return {Boolean} Always returns true.
     */
    returnTrue : function(){

      return true;
    },
    /**
     * Simply return false.
     * @deprecated {2.1} Please use a custom function.
     * @return {Boolean} Always returns false.
     */
    returnFalse : function(){

      return false;
    },
    /**
     * Simply return null.
     * @deprecated {2.1} Please use a custom function.
     * @return {var} Always returns null.
     */
    returnNull : function(){

      return null;
    },
    /**
     * Return "this".
     * @deprecated {2.1} Please use a custom function.
     * @return {Object} Always returns "this".
     */
    returnThis : function(){

      return this;
    },
    /**
     * Simply return 0.
     * @deprecated {2.1} Please use a custom function.
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
     * @param options {Map?} Map of options
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
     *
     * *Native way*
     *
     * This is also a feature of JavaScript 1.8.5 and will be supplied
     * by modern browsers. Including {@link qx.lang.normalize.Function}
     * will supply a cross browser normalization of the native
     * implementation. We like to encourage you to use the native function!
     *
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
     * Fabian Jakobs (fjakobs)
   ________________________________________________________________________

   This class contains code based on the following work:

    http://www.JSON.org/json2.js
    2009-06-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

************************************************************************ */
/**
 * JSON (JavaScript Object Notation) parser, serializer for qooxdoo
 *
 * This class implements EcmaScript 3.1 JSON support.
 *
 * http://wiki.ecmascript.org/doku.php?id=es3.1:json_support
 *
 * If the browser supports native JSON the browser implementation is used.
 */
qx.Bootstrap.define("qx.lang.Json", {
  statics : {
    /**
     * {JSON} The JSON object to use. If the browser has native JSON support
     *   this member points to <code>window.JSON</code>. Otherwise it points to
     *   the qooxdoo implementation {@link JsonImpl}.
     */
    JSON : true ? window.JSON : new qx.lang.JsonImpl(),
    /**
     * This method produces a JSON text from a JavaScript value.
     *
     * When an object value is found, if the object contains a toJSON
     * method, its toJSON method will be called and the result will be
     * stringified. A toJSON method does not serialize: it returns the
     * value represented by the name/value pair that should be serialized,
     * or undefined if nothing should be serialized. The toJSON method
     * will be passed the key associated with the value, and this will be
     * bound to the object holding the key.
     *
     * For example, this would serialize Dates as ISO strings.
     *
     * <pre class="javascript">
     *     Date.prototype.toJSON = function (key) {
     *         function f(n) {
     *             // Format integers to have at least two digits.
     *             return n < 10 ? '0' + n : n;
     *         }
     *
     *         return this.getUTCFullYear()   + '-' +
     *              f(this.getUTCMonth() + 1) + '-' +
     *              f(this.getUTCDate())      + 'T' +
     *              f(this.getUTCHours())     + ':' +
     *              f(this.getUTCMinutes())   + ':' +
     *              f(this.getUTCSeconds())   + 'Z';
     *     };
     * </pre>
     *
     * You can provide an optional replacer method. It will be passed the
     * key and value of each member, with this bound to the containing
     * object. The value that is returned from your method will be
     * serialized. If your method returns undefined, then the member will
     * be excluded from the serialization.
     *
     * If the replacer parameter is an array of strings, then it will be
     * used to select the members to be serialized. It filters the results
     * such that only members with keys listed in the replacer array are
     * stringified.
     *
     * Values that do not have JSON representations, such as undefined or
     * functions, will not be serialized. Such values in objects will be
     * dropped; in arrays they will be replaced with null. You can use
     * a replacer function to replace those with JSON values.
     * JSON.stringify(undefined) returns undefined.
     *
     * The optional space parameter produces a stringification of the
     * value that is filled with line breaks and indentation to make it
     * easier to read.
     *
     * If the space parameter is a non-empty string, then that string will
     * be used for indentation. If the space parameter is a number, then
     * the indentation will be that many spaces.
     *
     * Example:
     *
     * <pre class="javascript">
     * text = JSON.stringify(['e', {pluribus: 'unum'}]);
     * // text is '["e",{"pluribus":"unum"}]'
     *
     *
     * text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
     * // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
     *
     * text = JSON.stringify([new Date()], function (key, value) {
     *     return this[key] instanceof Date ?
     *         'Date(' + this[key] + ')' : value;
     * });
     * // text is '["Date(---current time---)"]'
     * </pre>
     *
     * @signature function(value, replacer, space)
     *
     * @param value {var} any JavaScript value, usually an object or array.
     *
     * @param replacer {Function?} an optional parameter that determines how
     *    object values are stringified for objects. It can be a function or an
     *    array of strings.
     *
     * @param space {String?} an optional parameter that specifies the
     *    indentation of nested structures. If it is omitted, the text will
     *    be packed without extra whitespace. If it is a number, it will specify
     *    the number of spaces to indent at each level. If it is a string
     *    (such as '\t' or '&nbsp;'), it contains the characters used to indent
     *    at each level.
     *
     * @return {String} The JSON string of the value
     */
    stringify : null,
    // will be set in the defer block
    /**
     * This method parses a JSON text to produce an object or array.
     * It can throw a SyntaxError exception.
     *
     * The optional reviver parameter is a function that can filter and
     * transform the results. It receives each of the keys and values,
     * and its return value is used instead of the original value.
     * If it returns what it received, then the structure is not modified.
     * If it returns undefined then the member is deleted.
     *
     * Example:
     *
     * <pre class="javascript">
     * // Parse the text. Values that look like ISO date strings will
     * // be converted to Date objects.
     *
     * myData = JSON.parse(text, function (key, value)
     * {
     *   if (typeof value === 'string')
     *   {
     *     var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
     *     if (a) {
     *       return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
     *     }
     *   }
     *   return value;
     * });
     *
     * myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
     *     var d;
     *     if (typeof value === 'string' &&
     *             value.slice(0, 5) === 'Date(' &&
     *             value.slice(-1) === ')') {
     *         d = new Date(value.slice(5, -1));
     *         if (d) {
     *             return d;
     *         }
     *     }
     *     return value;
     * });
     * </pre>
     *
     * @signature function(text, reviver)
     *
     * @param text {String} JSON string to parse
     *
     * @param reviver {Function?} Optional reviver function to filter and
     *    transform the results
     *
     * @return {Object} The parsed JSON object
     */
    parse : null
  },
  defer : function(statics){

    statics.stringify = statics.JSON.stringify;
    statics.parse = statics.JSON.parse;
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
#require(qx.bom.storage.UserData#getLength)
#require(qx.bom.storage.UserData#setItem)
#require(qx.bom.storage.UserData#getItem)
#require(qx.bom.storage.UserData#removeItem)
#require(qx.bom.storage.UserData#clear)
#require(qx.bom.storage.UserData#getKey)
#require(qx.bom.storage.UserData#forEach)
************************************************************************ */
/**
 * Fallback storage implementation usable in IE browsers. It is recommended to use
 * these implementation only in IE < 8 because IE >= 8 supports
 * {@link qx.bom.storage.Web}.
 */
qx.Bootstrap.define("qx.bom.storage.UserData", {
  statics : {
    __local : null,
    __session : null,
    // global id used as key for the storage
    __id : 0,
    /**
     * Returns an instance of {@link qx.bom.storage.UserData} used to store
     * data persistent.
     * @return {qx.bom.storage.UserData} A storage instance.
     */
    getLocal : function(){

      if(this.__local){

        return this.__local;
      };
      return this.__local = new qx.bom.storage.UserData("local");
    },
    /**
     * Returns an instance of {@link qx.bom.storage.UserData} used to store
     * data persistent.
     * @return {qx.bom.storage.UserData} A storage instance.
     */
    getSession : function(){

      if(this.__session){

        return this.__session;
      };
      return this.__session = new qx.bom.storage.UserData("session");
    }
  },
  /**
   * Create a new instance. Usually, you should take the static
   * accessors to get your instance.
   *
   * @param storeName {String} type of storage.
   */
  construct : function(storeName){

    // create a dummy DOM element used for storage
    this.__el = document.createElement("div");
    this.__el.style["display"] = "none";
    document.getElementsByTagName("head")[0].appendChild(this.__el);
    this.__el.addBehavior("#default#userdata");
    this.__storeName = storeName;
    // load the inital data which might be stored
    this.__el.load(this.__storeName);
    // set up the internal reference maps
    this.__storage = {
    };
    this.__reference = {
    };
    // initialize
    var value = this.__el.getAttribute("qx" + qx.bom.storage.UserData.__id);
    while(value != undefined){

      value = qx.lang.Json.parse(value);
      // save the data in the internal storage
      this.__storage[value.key] = value.value;
      // save the reference
      this.__reference[value.key] = "qx" + qx.bom.storage.UserData.__id;
      qx.bom.storage.UserData.__id++;
      value = this.__el.getAttribute("qx" + qx.bom.storage.UserData.__id);
    };
  },
  members : {
    __el : null,
    __storeName : "qxtest",
    // storage which holds the key and the value
    __storage : null,
    // reference store which holds the key and the key used to store
    __reference : null,
    /**
     * Returns the map used to keep a in memory copy of the stored data.
     * @return {Map} The stored data.
     * @internal
     */
    getStorage : function(){

      return this.__storage;
    },
    /**
     * Returns the amount of key-value pairs stored.
     * @return {Integer} The length of the storage.
     */
    getLength : function(){

      return Object.keys(this.__storage).length;
    },
    /**
     * Store an item in the storage.
     *
     * @param key {String} The identifier key.
     * @param value {var} The data, which will be stored as JSON.
     */
    setItem : function(key, value){

      // override case
      if(this.__reference[key]){

        var storageKey = this.__reference[key];
      } else {

        var storageKey = "qx" + qx.bom.storage.UserData.__id;
        qx.bom.storage.UserData.__id++;
      };
      // build and save the data used to store both, key and value
      var storageValue = qx.lang.Json.stringify({
        key : key,
        value : value
      });
      this.__el.setAttribute(storageKey, storageValue);
      this.__el.save(this.__storeName);
      // also update the internal mappings
      this.__storage[key] = value;
      this.__reference[key] = storageKey;
    },
    /**
     * Returns the stored item.
     *
     * @param key {String} The identifier to get the data.
     * @return {var} The stored data.
     */
    getItem : function(key){

      return this.__storage[key] || null;
    },
    /**
     * Removes an item form the storage.
     * @param key {String} The identifier.
     */
    removeItem : function(key){

      // check if the item is availabel
      var storageName = this.__reference[key];
      if(storageName == undefined){

        return;
      };
      // remove the item
      this.__el.removeAttribute(storageName);
      // decrease the id because we removed one item
      qx.bom.storage.UserData.__id--;
      // update the internal maps
      delete this.__storage[key];
      delete this.__reference[key];
      // check if we have deleted the last item
      var lastStoreName = "qx" + qx.bom.storage.UserData.__id;
      if(this.__el.getAttribute(lastStoreName)){

        // if not, move the last item to the deleted spot
        var lastItem = this.__el.getAttribute("qx" + qx.bom.storage.UserData.__id);
        this.__el.removeAttribute(lastStoreName);
        this.__el.setAttribute(storageName, lastItem);
        // update the reference map
        var lastKey = qx.lang.Json.parse(lastItem).key;
        this.__reference[lastKey] = storageName;
      };
      this.__el.save(this.__storeName);
    },
    /**
     * Deletes every stored item in the storage.
     */
    clear : function(){

      // delete all entries from the storage
      for(var key in this.__reference){

        this.__el.removeAttribute(this.__reference[key]);
      };
      this.__el.save(this.__storeName);
      // reset the internal maps
      this.__storage = {
      };
      this.__reference = {
      };
    },
    /**
     * Returns the named key at the given index.
     * @param index {Integer} The index in the storage.
     * @return {String} The key stored at the given index.
     */
    getKey : function(index){

      return Object.keys(this.__storage)[index];
    },
    /**
     * Helper to access every stored item.
     *
     * @param callback {Function} A function which will be called for every item.
     *   The function will have two arguments, first the key and second the value
     *    of the stored data.
     * @param scope {var} The scope of the function.
     */
    forEach : function(callback, scope){

      var length = this.getLength();
      for(var i = 0;i < length;i++){

        var key = this.getKey(i);
        callback.call(scope, key, this.getItem(key));
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
#require(qx.bom.storage.Memory#getLength)
#require(qx.bom.storage.Memory#setItem)
#require(qx.bom.storage.Memory#getItem)
#require(qx.bom.storage.Memory#removeItem)
#require(qx.bom.storage.Memory#clear)
#require(qx.bom.storage.Memory#getKey)
#require(qx.bom.storage.Memory#forEach)
************************************************************************ */
/**
 * Fallback storage implementation which offers the same API as every other storage
 * but is not persistent. Basically, its just a storage API on a JavaScript map.
 */
qx.Bootstrap.define("qx.bom.storage.Memory", {
  statics : {
    __local : null,
    __session : null,
    /**
     * Returns an instance of {@link qx.bom.storage.Memory} which is of course
     * not persisted on reload.
     * @return {qx.bom.storage.Memory} A memory storage.
     */
    getLocal : function(){

      if(this.__local){

        return this.__local;
      };
      return this.__local = new qx.bom.storage.Memory();
    },
    /**
     * Returns an instance of {@link qx.bom.storage.Memory} which is of course
     * not persisted on reload.
     * @return {qx.bom.storage.Memory} A memory storage.
     */
    getSession : function(){

      if(this.__session){

        return this.__session;
      };
      return this.__session = new qx.bom.storage.Memory();
    }
  },
  construct : function(){

    this.__storage = {
    };
  },
  members : {
    __storage : null,
    /**
     * Returns the internal used map.
     * @return {Map} The storage.
     * @internal
     */
    getStorage : function(){

      return this.__storage;
    },
    /**
     * Returns the amount of key-value pairs stored.
     * @return {Integer} The length of the storage.
     */
    getLength : function(){

      return Object.keys(this.__storage).length;
    },
    /**
     * Store an item in the storage.
     *
     * @param key {String} The identifier key.
     * @param value {var} The data, which will be stored as JSON.
     */
    setItem : function(key, value){

      value = qx.lang.Json.stringify(value);
      this.__storage[key] = value;
    },
    /**
     * Returns the stored item.
     *
     * @param key {String} The identifier to get the data.
     * @return {var} The stored data.
     */
    getItem : function(key){

      var item = this.__storage[key];
      if(qx.lang.Type.isString(item)){

        item = qx.lang.Json.parse(item);
      };
      return item;
    },
    /**
     * Removes an item form the storage.
     * @param key {String} The identifier.
     */
    removeItem : function(key){

      delete this.__storage[key];
    },
    /**
     * Deletes every stored item in the storage.
     */
    clear : function(){

      this.__storage = {
      };
    },
    /**
     * Returns the named key at the given index.
     * @param index {Integer} The index in the storage.
     * @return {String} The key stored at the given index.
     */
    getKey : function(index){

      var keys = Object.keys(this.__storage);
      return keys[index];
    },
    /**
     * Helper to access every stored item.
     *
     * @param callback {Function} A function which will be called for every item.
     *   The function will have two arguments, first the key and second the value
     *    of the stored data.
     * @param scope {var} The scope of the function.
     */
    forEach : function(callback, scope){

      var length = this.getLength();
      for(var i = 0;i < length;i++){

        var key = this.getKey(i);
        callback.call(scope, key, this.getItem(key));
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
/**
 * CSS/Style property manipulation module
 */
qx.Bootstrap.define("qx.module.Css", {
  statics : {
    /**
     * Modifies the given style property on all elements in the collection.
     *
     * @attach {qxWeb}
     * @param name {String} Name of the style property to modify
     * @param value {var} The value to apply
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param styles {Map} A map of style property name/value pairs
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param name {String} Class name
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @param names {String[]} List of class names to add
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @param name {String} The class name to remove
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @param names {String[]} List of class names to remove
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param name {String} Class name
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @param names {String[]} Class names
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @param oldName {String} Class name to remove
     * @param newName {String} Class name to add
     * @return {qxWeb} The collection for chaining
     */
    replaceClass : function(oldName, newName){

      for(var i = 0,l = this.length;i < l;i++){

        qx.bom.element.Class.replace(this[i], oldName, newName);
      };
      return this;
    },
    /**
     * Returns the rendered height of the first element in the collection.
     * @attach {qxWeb}
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
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
     * @attachStatic {qxWeb}
     * @param uri {String} The stylesheet's URI
     * @param doc {Document?} Document to modify
     */
    includeStylesheet : function(uri, doc){

      qx.bom.Stylesheet.includeFile(uri, doc);
    },
    /**
     * Hides all elements in the collection by setting their "display"
     * style to "none". The previous value is stored so it can be re-applied
     * when {@link #show} is called.
     *
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    hide : function(){

      for(var i = 0,l = this.length;i < l;i++){

        var item = this.slice(i, i + 1);
        var prevStyle = item.getStyle("display");
        if(prevStyle !== "none"){

          item[0].$$qPrevDisp = prevStyle;
          item.setStyle("display", "none");
        };
      };
      return this;
    },
    /**
     * Shows any elements with "display: none" in the collection. If an element
     * was hidden by using the {@link #hide} method, its previous
     * "display" style value will be re-applied. Otherwise, the
     * default "display" value for the element type will be applied.
     *
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    show : function(){

      for(var i = 0,l = this.length;i < l;i++){

        var item = this.slice(i, i + 1);
        var currentVal = item.getStyle("display");
        var prevVal = item[0].$$qPrevDisp;
        var newVal;
        if(currentVal == "none"){

          if(prevVal && prevVal != "none"){

            newVal = prevVal;
          } else {

            var doc = qxWeb.getDocument(item[0]);
            newVal = qx.module.Css.__getDisplayDefault(item[0].tagName, doc);
          };
          item.setStyle("display", newVal);
          item[0].$$qPrevDisp = "none";
        };
      };
      return this;
    },
    /**
     * Maps HTML elements to their default "display" style values.
     */
    __displayDefaults : {
    },
    /**
     * Attempts tp determine the default "display" style value for
     * elements with the given tag name.
     *
     * @param tagName {String} Tag name
     * @param  doc {Document?} Document element. Default: The current document
     * @return {String} The default "display" value, e.g. <code>inline</code>
     * or <code>block</code>
     */
    __getDisplayDefault : function(tagName, doc){

      var defaults = qx.module.Css.__displayDefaults;
      if(!defaults[tagName]){

        var docu = doc || document;
        var tempEl = qxWeb(docu.createElement(tagName)).appendTo(doc.body);
        defaults[tagName] = tempEl.getStyle("display");
        tempEl.remove();
      };
      return defaults[tagName] || "";
    }
  },
  defer : function(statics){

    qxWeb.$attach({
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
      "getPosition" : statics.getPosition,
      "hide" : statics.hide,
      "show" : statics.show
    });
    qxWeb.$attachStatic({
      "includeStylesheet" : statics.includeStylesheet
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
 * This class takes care of the normalization of the native 'String' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *trim*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.5.4.20">Annotated ES5 Spec</a>
 */
qx.Bootstrap.define("qx.lang.normalize.String", {
  defer : function(){

    // trim
    if(!qx.core.Environment.get("ecmascript.string.trim")){

      String.prototype.trim = function(context){

        return this.replace(/^\s+|\s+$/g, '');
      };
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
/* ************************************************************************
#require(qx.lang.normalize.String)
************************************************************************ */
/**
 * String helper functions
 *
 * The native JavaScript String is not modified by this class. However,
 * there are modifications to the native String in {@link qx.lang.normalize.String} for
 * browsers that do not support certain features.
 */
qx.Bootstrap.define("qx.lang.String", {
  statics : {
    /**
     * Unicode letters.  they are taken from Steve Levithan's excellent XRegExp library [http://xregexp.com/addons/unicode/unicode-base.js]
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
        if(str.indexOf("-") >= 0){

          this.__stringsMap[str] = result;
        };
      };
      return result;
    },
    /**
     * Converts a camelcased string to a hyphenated (separated by '-') string.
     *
     * Example:
     * <pre class='javascript'>qx.lang.String.hyphenate("weLikeCookies"); //returns "we-like-cookies"</pre>
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
        if(str.indexOf("-") == -1){

          this.__stringsMap[str] = result;
        };
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

      return str.replace(/\s+/g, ' ').trim();
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
     * @deprecated {2.1} please use the native trim method.
     * @param str {String} the string to trim
     * @return {String} the trimmed string
     */
    trim : function(str){

      {
      };
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
    },
    /**
     * Quotes the given string.
     * @param str {String} String to quote.
     * @return {String} The quoted string.
     */
    quote : function(str){

      return '"' + str.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"") + '"';
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
     * @deprecated {2.1}
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

      return !!qx.bom.Style.getPropertyName("textShadow");
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
      "Windows NT 6.3" : "8.1",
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
      "Mac OS X 10_9" : "10.9",
      "Mac OS X 10.9" : "10.9",
      "Mac OS X 10_8" : "10.8",
      "Mac OS X 10.8" : "10.8",
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

        // IE 11's ua string no longer contains "MSIE" or even "IE"
        if(name === "msie" || name === "trident"){

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
      "mshtml" : "IEMobile|Maxthon|MSIE|Trident",
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
 * take a look at {@link qx.bom.element.Style}.
 */
qx.Bootstrap.define("qx.bom.Style", {
  statics : {
    /** Vendor-specific style property prefixes */
    VENDOR_PREFIXES : ["Webkit", "Moz", "O", "ms", "Khtml"],
    /**
     * Internal lookup table to map property names to CSS names
     * @internal
     */
    __cssName : {
    },
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
     * Takes the name of a JavaScript style property and returns the
     * corresponding CSS name.
     *
     * The name of the style property is taken as is, i.e. it gets not
     * extended by vendor prefixes. The conversion into the CSS name is
     * done by string manipulation, not involving the DOM.
     *
     * Example:
     * <pre class='javascript'>qx.bom.Style.getCssName("MozTransform"); //returns "-moz-transform"</pre>
     *
     * @param propertyName {String} JavaScript style property
     * @return {String} CSS property
     */
    getCssName : function(propertyName){

      var cssName = this.__cssName[propertyName];
      if(!cssName){

        // all vendor prefixes (except for "ms") start with an uppercase letter
        cssName = propertyName.replace(/[A-Z]/g, function(match){

          return ('-' + match.charAt(0).toLowerCase());
        });
        // lowercase "ms" vendor prefix needs special handling
        if((/^ms/.test(cssName))){

          cssName = "-" + cssName;
        };
        this.__cssName[propertyName] = cssName;
      };
      return cssName;
    },
    /**
     * Detects CSS support by applying a style to a DOM element of the given type
     * and verifying the result. Also checks for vendor-prefixed variants of the
     * value, e.g. "linear-gradient" -> "-webkit-linear-gradient". Returns the
     * (possibly vendor-prefixed) value if successful or <code>null</code> if
     * the property and/or value are not supported.
     *
     * @param element {Element} element to be used for the detection
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
  statics : {
    /**
     * {Boolean} <code>true</code> when the style attribute "opacity" is supported,
     * <code>false</code> otherwise.
     * @deprecated {2.1} Please use qx.core.Environment.get("css.opacity") instead.
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
        if(qx.core.Environment.get("css.opacity")){

          return "opacity:" + opacity + ";";
        } else {

          return "zoom:1;filter:alpha(opacity=" + (opacity * 100) + ");";
        };
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
     * @signature function(element, opacity)
     */
    set : qx.core.Environment.select("engine.name", {
      "mshtml" : function(element, opacity){

        if(qx.core.Environment.get("css.opacity")){

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
     * @signature function(element)
     */
    reset : qx.core.Environment.select("engine.name", {
      "mshtml" : function(element){

        if(qx.core.Environment.get("css.opacity")){

          element.style.opacity = "";
        } else {

          // Read in computed filter
          var filter = qx.bom.element.Style.get(element, "filter", qx.bom.element.Style.COMPUTED_MODE, false);
          // Remove old alpha filter
          element.style.filter = filter.replace(/alpha\([^\)]*\)/gi, "");
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

        if(qx.core.Environment.get("css.opacity")){

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
      "default" : function(element, mode){

        var opacity = qx.bom.element.Style.get(element, "opacity", mode, false);
        if(opacity != null){

          return parseFloat(opacity);
        };
        return 1.0;
      }
    })
  },
  // @deprecated {2.1}
  defer : function(statics){

    statics.SUPPORT_CSS3_OPACITY = qx.core.Environment.get("css.opacity");
  }
});
{
};

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
/* ************************************************************************
#require(qx.lang.normalize.String)
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

        clip = clip.trim();
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
          top = split[0].trim();
          right = split[1].trim();
          bottom = split[2].trim();
          left = split[3].trim();
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
    __map : {
    },
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
     */
    set : function(element, value){

      element.style.cursor = this.__map[value] || value;
    },
    /**
     * Removes the local cursor style applied to the element
     *
     * @param element {Element} The element to modify
     */
    reset : function(element){

      element.style.cursor = "";
    }
  },
  defer : function(statics){

    // < IE 9
    if(qx.core.Environment.get("engine.name") == "mshtml" && ((parseFloat(qx.core.Environment.get("engine.version")) < 9 || qx.core.Environment.get("browser.documentmode") < 9) && !qx.core.Environment.get("browser.quirksmode"))){

      statics.__map["nesw-resize"] = "ne-resize";
      statics.__map["nwse-resize"] = "nw-resize";
      // < IE 8
      if(((parseFloat(qx.core.Environment.get("engine.version")) < 8 || qx.core.Environment.get("browser.documentmode") < 8) && !qx.core.Environment.get("browser.quirksmode"))){

        statics.__map["ew-resize"] = "e-resize";
        statics.__map["ns-resize"] = "n-resize";
      };
    } else if(qx.core.Environment.get("engine.name") == "opera" && parseInt(qx.core.Environment.get("engine.version")) < 12){

      statics.__map["nesw-resize"] = "ne-resize";
      statics.__map["nwse-resize"] = "nw-resize";
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
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'Object' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *keys*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.2.3.14">Annotated ES5 Spec</a>
 */
qx.Bootstrap.define("qx.lang.normalize.Object", {
  defer : function(){

    // keys
    if(!qx.core.Environment.get("ecmascript.object.keys")){

      Object.keys = qx.Bootstrap.keys;
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
     * Andreas Ecker (ecker)

************************************************************************ */
/* ************************************************************************
#require(qx.lang.normalize.Object)
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
     * @lint ignoreUnused(key)
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
     * @deprecated {2.1} Please use a check and 'qx.lang.Object.getLength'.
     * @return {Boolean} whether the map contains at least "length" objects.
     * @lint ignoreUnused(key)
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
     * @deprecated {2.1.} Please use Object.keys instead.
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
     * @deprecated {2.1} Object.keys(map).join().
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
      var keys = Object.keys(map);
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
     * @deprecated {2.1} please use mergeWith instead with override set to false
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
     * @deprecated {2.1} Please use mergeWith instead.
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
    * @deprecated {2.1}
    */
    select : function(key, map){

      {
      };
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
     * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
     *
     * Note: For URI parameters that are to be sent as
     * application/x-www-form-urlencoded (POST), spaces should be encoded
     * with "+".
     *
     * @param obj {Object}   Object to serialize.
     * @param post {Boolean} Whether spaces should be encoded with "+".
     * @return {String}      Serialized object. Safe to append to URIs or send as
     *                       URL encoded string.
     * @deprecated {2.1} Please use qx.util.Uri.toParameter instead.
     */
    toUriParameter : function(obj, post){

      {
      };
      return qx.util.Uri.toParameter(obj, post);
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

        params = qx.util.Uri.toParameter(params);
      };
      if(!params){

        return url;
      };
      return url += (/\?/).test(url) ? "&" + params : "?" + params;
    },
    /**
     * Serializes an object to URI parameters (also known as query string).
     *
     * Escapes characters that have a special meaning in URIs as well as
     * umlauts. Uses the global function encodeURIComponent, see
     * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
     *
     * Note: For URI parameters that are to be sent as
     * application/x-www-form-urlencoded (POST), spaces should be encoded
     * with "+".
     *
     * @param obj {Object}   Object to serialize.
     * @param post {Boolean} Whether spaces should be encoded with "+".
     * @return {String}      Serialized object. Safe to append to URIs or send as
     *                       URL encoded string.
     */
    toParameter : function(obj, post){

      var key,parts = [];
      for(key in obj){

        if(obj.hasOwnProperty(key)){

          var value = obj[key];
          if(value instanceof Array){

            for(var i = 0;i < value.length;i++){

              this.__toParameterPair(key, value[i], parts, post);
            };
          } else {

            this.__toParameterPair(key, value, parts, post);
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
    __toParameterPair : function(key, value, parts, post){

      var encode = window.encodeURIComponent;
      if(post){

        parts.push(encode(key).replace(/%20/g, "+") + "=" + encode(value).replace(/%20/g, "+"));
      } else {

        parts.push(encode(key) + "=" + encode(value));
      };
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

        var prop = qx.bom.Style.getCssName(qx.core.Environment.get("css.boxsizing"));
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

#require(qx.bom.element.Clip#get)
#require(qx.bom.element.Cursor#get)
#require(qx.bom.element.Opacity#get)
#require(qx.bom.element.BoxSizing#get)

#require(qx.bom.element.Clip#reset)
#require(qx.bom.element.Cursor#reset)
#require(qx.bom.element.Opacity#reset)
#require(qx.bom.element.BoxSizing#reset)

#require(qx.bom.element.Clip#compile)
#require(qx.bom.element.Cursor#compile)
#require(qx.bom.element.Opacity#compile)
#require(qx.bom.element.BoxSizing#compile)

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
    __styleNames : null,
    __cssNames : null,
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

          this.__cssNames[key] = key == "float" ? "float" : qx.bom.Style.getCssName(styleNames[key]);
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
      boxSizing : qx.bom.element.BoxSizing
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

            cssNames[name] = qx.bom.Style.getCssName(name);
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

        this.__special[name].set(element, value);
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
     */
    reset : function(element, name, smart){

      // normalize name
      name = this.__styleNames[name] || this.__getStyleName(name) || name;
      // special handling for specific properties
      if(smart !== false && this.__special[name]){

        this.__special[name].reset(element);
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
        // Read cascaded style. Shorthand properties like "border" are not available
        // on the currentStyle object.
        var currentStyle = element.currentStyle[name] || element.style[name] || "";
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
        if(computed && computed[name]){

          return computed[name];
        };
        return element.style[name] || "";};
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
    add : {
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
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],
    /**
     * Adds multiple classes to the given element
     *
     * @signature function(element, classes)
     * @param element {Element} DOM element to modify
     * @param classes {String[]} List of classes to add.
     * @return {String} The resulting class name which was applied
     */
    addClasses : {
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
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],
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
    has : {
      "native" : function(element, name){

        return element.classList.contains(name);
      },
      "default" : function(element, name){

        var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
        return regexp.test(element.className);
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],
    /**
     * Removes a className from the given element
     *
     * @signature function(element, name)
     * @param element {Element} The DOM element to modify
     * @param name {String} The class name to remove
     * @return {String} The removed class name
     */
    remove : {
      "native" : function(element, name){

        element.classList.remove(name);
        return name;
      },
      "default" : function(element, name){

        var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
        element.className = element.className.replace(regexp, "$2");
        return name;
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],
    /**
     * Removes multiple classes from the given element
     *
     * @signature function(element, classes)
     * @param element {Element} DOM element to modify
     * @param classes {String[]} List of classes to remove.
     * @return {String} The resulting class name which was applied
     */
    removeClasses : {
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
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],
    /**
     * Replaces the first given class name with the second one
     *
     * @param element {Element} The DOM element to modify
     * @param oldName {String} The class name to remove
     * @param newName {String} The class name to add
     * @return {String} The added class name
     */
    replace : function(element, oldName, newName){

      if(!this.has(element, oldName)){

        return "";
      };
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
    toggle : {
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
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"]
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
      var overflowX = qx.bom.element.Style.get(element, "overflowX");
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
      var overflowY = qx.bom.element.Style.get(element, "overflowY");
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

          var overX = qx.bom.element.Style.get(elem, "overflowX");
          if(overX == "scroll" || overX == "auto"){

            right += elem.scrollWidth - elem.offsetWidth + this.__num(elem, "borderLeftWidth") + this.__num(elem, "borderRightWidth");
          };
          var overY = qx.bom.element.Style.get(elem, "overflowY");
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
     * @return {Map} map with the keys <code>left</code> and <code>top</code>
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
     * @param doc {Document?} Document to modify
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
     * @param text {String?} optional string of css rules
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
      return true;
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
      return true;
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
     * @attachStatic {qxWeb, type.get}
     * @signature function(value)
     * @param value {var} Value to get the class for.
     * @return {String} The internal class of the value.
     */
    get : qx.Bootstrap.getClass
  },
  defer : function(statics){

    qxWeb.$attachStatic({
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
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

   ======================================================================

   This class contains code based on the following work:

   * es5-shim

     Code:
       https://github.com/kriskowal/es5-shim/

     Copyright:
       (c) 2009, 2010 Kristopher Michael Kowal

     License:
       https://github.com/kriskowal/es5-shim/blob/master/LICENSE

   ----------------------------------------------------------------------

   Copyright 2009, 2010 Kristopher Michael Kowal. All rights reserved.
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to
   deal in the Software without restriction, including without limitation the
   rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
   sell copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
   IN THE SOFTWARE.

   ----------------------------------------------------------------------

   Version:
     Snapshot taken on 2012-07-25,:
     commit  9f539abd9aa9950e1d907077a4be7f5133a00e52

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'Function' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *bind*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.3.4.5">Annotated ES5 Spec</a>
 */
qx.Bootstrap.define("qx.lang.normalize.Function", {
  defer : function(){

    // bind
    if(!qx.core.Environment.get("ecmascript.function.bind")){

      var slice = Array.prototype.slice;
      Function.prototype.bind = function(that){

        // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if(typeof target != "function"){

          throw new TypeError("Function.prototype.bind called on incompatible " + target);
        };
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = slice.call(arguments, 1);
        // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var bound = function(){

          if(this instanceof bound){

            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var F = function(){
            };
            F.prototype = target.prototype;
            var self = new F;
            var result = target.apply(self, args.concat(slice.call(arguments)));
            if(Object(result) === result){

              return result;
            };
            return self;
          } else {

            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, args.concat(slice.call(arguments)));
          };
        };
        // XXX bound.length is never writable, so don't even try
        //
        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.
        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.
        return bound;
      };
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
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'Error' object.
 * It contains a simple bugfix for toString which might not print out the proper
 * error message.
 *
 * *toString*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error/toString">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.11.4.4">Annotated ES5 Spec</a>
 */
qx.Bootstrap.define("qx.lang.normalize.Error", {
  defer : function(){

    // toString
    if(!qx.core.Environment.get("ecmascript.error.toString")){

      Error.prototype.toString = function(){

        var name = this.name || "Error";
        var message = this.message || "";
        if(name === "" && message === ""){

          return "Error";
        };
        if(name === ""){

          return message;
        };
        if(message === ""){

          return name;
        };
        return name + ": " + message;
      };
    };
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
/* ************************************************************************
#require(qx.lang.normalize.Function)
#require(qx.lang.normalize.String)
#require(qx.lang.normalize.Date)
#require(qx.lang.normalize.Array)
#require(qx.lang.normalize.Error)
#require(qx.lang.normalize.Object)
************************************************************************ */
/**
 * Adds JavaScript features that may not be supported by all clients.
 */
qx.Bootstrap.define("qx.module.Polyfill", {
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
     * @attach {qxWeb}
     * @param type {String} Type of the event to listen for
     * @param listener {Function} Listener callback
     * @param context {Object?} Context the callback function will be executed in.
     * Default: The element on which the listener was registered
     * @return {qxWeb} The collection for chaining
     */
    on : function(type, listener, context){

      for(var i = 0;i < this.length;i++){

        var el = this[i];
        var ctx = context || qxWeb(el);
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
        var bound = function(event){

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
        }.bind(ctx);
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
     * @attach {qxWeb}
     * @param type {String} Type of the event
     * @param listener {Function} Listener callback
     * @param context {Object?} Listener callback context
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @param type {String} Event type
     * @param data {var?} Optional data that will be passed to the listener
     * callback function.
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @param type {String} Type of the event to listen for
     * @param listener {Function} Listener callback
     * @param context {Object?} Context the callback function will be executed in.
     * Default: The element on which the listener was registered
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
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

      // Copy both arrays to make sure the original collections are not manipulated.
      // If e.g. the 'target' array contains a DOM node with child nodes we run into
      // problems because the 'target' array is flattened within this method.
      var source = this.concat();
      var targetCopy = target.concat();
      // get all children of source and target
      for(var i = source.length - 1;i >= 0;i--){

        var descendants = source[i].getElementsByTagName("*");
        for(var j = 0;j < descendants.length;j++){

          source.push(descendants[j]);
        };
      };
      for(var i = targetCopy.length - 1;i >= 0;i--){

        var descendants = targetCopy[i].getElementsByTagName("*");
        for(var j = 0;j < descendants.length;j++){

          targetCopy.push(descendants[j]);
        };
      };
      // make sure no emitter object has been copied
      targetCopy.forEach(function(el){

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
            qxWeb(targetCopy[i]).on(name, listener, storage[name][j].ctx);
          };
        };
      };
    },
    __isReady : false,
    /**
     * Executes the given function once the document is ready.
     *
     * @attachStatic {qxWeb}
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
      qxWeb(window).on("load", onWindowLoad);
      var wrappedCallback = function(){

        qxWeb(window).off("load", onWindowLoad);
        callback();
      };
      // Listen for DOMContentLoaded event if available (no way to reliably detect
      // support)
      if(qxWeb.env.get("engine.name") !== "mshtml" || qxWeb.env.get("browser.documentmode") > 8){

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
     * @attachStatic {qxWeb, $registerEventNormalization}
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
     * @attachStatic {qxWeb, $unregisterEventNormalization}
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
     * @attachStatic {qxWeb, $getEventNormalizationRegistry}
     * @return {Map} Map of event types/normalizer functions
     */
    $getRegistry : function(){

      return qx.module.Event.__normalizations;
    },
    /**
     * Registers an event hook for the given event types.
     *
     * @attachStatic {qxWeb, $registerEventHook}
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
     * @attachStatic {qxWeb, $unregisterEventHooks}
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
     * @attachStatic {qxWeb, $getEventHookRegistry}
     * @return {Map} Map of event types/registration hook functions
     * @internal
     */
    $getHookRegistry : function(){

      return qx.module.Event.__hooks;
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "on" : statics.on,
      "off" : statics.off,
      "once" : statics.once,
      "emit" : statics.emit,
      "hasListener" : statics.hasListener,
      "copyEventsTo" : statics.copyEventsTo
    });
    qxWeb.$attachStatic({
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
          } catch(ex) {

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

      // Detecting the transitionend event's name is not possible in some
      // browsers, so we deduce it from the style property name instead.
      if(type.toLowerCase().indexOf("transitionend") != -1){

        var transitionProp = qx.bom.Style.getPropertyName("transition");
        if(!transitionProp){

          return false;
        };
        var endEvent = qx.lang.String.firstLow(transitionProp) + (transitionProp.indexOf("Trans") > 0 ? "E" : "e") + "nd";
        return type == endEvent;
      };
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
      for(var i = 0;i < storage.length;i++){

        var entry = storage[i];
        entry.listener.call(entry.ctx, data);
        if(entry.once){

          storage.splice(i, 1);
          i--;
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
     * @type {Array}
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

    qxWeb.$registerEventNormalization(statics.TYPES, statics.normalize);
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

      return /android.+mobile|ip(hone|od)|bada\/|blackberry|maemo|opera m(ob|in)i|fennec|NetFront|phone|psp|symbian|IEMobile|windows (ce|phone)|xda/i.test(userAgentString);
    },
    /**
     * Detects if a device is a tablet device.
     * @param userAgentString {String} userAgent parameter, needed for decision.
     * @return {Boolean} Flag which indicates whether it is a tablet device.
     */
    detectTabletDevice : function(userAgentString){

      var isIE10Tablet = (/MSIE 10/i.test(userAgentString)) && (/ARM/i.test(userAgentString)) && !(/windows phone/i.test(userAgentString));
      var isCommonTablet = (!(/Fennec|HTC.Magic|Nexus|android.+mobile|Tablet PC/i.test(userAgentString)) && (/Android|ipad|tablet|playbook|silk|kindle|psp/i.test(userAgentString)));
      return isIE10Tablet || isCommonTablet;
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
 * It adds a static key <code>env</code> to qxWeb and offers the given methods.
 *
 * <pre class="javascript">
 * q.env.get("engine.name"); // return "webkit" e.g.
 * </pre>
 *
 * The following values are predefined:
 *
 * * <code>browser.name</code> : The name of the browser
 * * <code>browser.version</code> : The version of the browser
 * * <code>browser.quirksmode</code>  : <code>true</code> if the browser is in quirksmode
 * * <code>browser.documentmode</code> : The document mode of the browser
 *
 * * <code>device.name</code> : The name of the device e.g. <code>iPad</code>.
 * * <code>device.type</code> : Either <code>desktop</code>, <code>tablet</code> or <code>mobile</code>.
 *
 * * <code>engine.name</code> : The name of the browser engine
 * * <code>engine.version</code> : The version of the browser engine
 */
qx.Bootstrap.define("qx.module.Environment", {
  statics : {
    /**
     * Get the value stored for the given key.
     *
     * @attachStatic {qxWeb, env.get}
     * @param key {String} The key to check for.
     * @return {var} The value stored for the given key.
     * @lint environmentNonLiteralKey(key)
     */
    get : function(key){

      return qx.core.Environment.get(key);
    },
    /**
     * Adds a new environment setting which can be queried via {@link #get}.
     * @param key {String} The key to store the value for.
     *
     * @attachStatic {qxWeb, env.add}
     * @param value {var} The value to store.
     * @return {qxWeb} The collection for chaining.
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
    qxWeb.$attachStatic({
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
      if(qxWeb.env.get("browser.name") === "ie" && qxWeb.env.get("browser.documentmode") < 9){

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

    qxWeb.$registerEventNormalization(qx.module.event.Mouse.TYPES, statics.normalize);
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
     * Tino Butz (tbtz)
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Define messages to react on certain channels.
 *
 * The channel names will be used in the {@link #on} method to define handlers which will
 * be called on certain channels and routes. The {@link #emit} method can be used
 * to execute a given route on a channel. {@link #onAny} defines a handler on any channel.
 *
 * *Example*
 *
 * Here is a little example of how to use the messaging.
 *
 * <pre class='javascript'>
 *   var m = new qx.event.Messaging();
 *
 *   m.on("get", "/address/{id}", function(data) {
 *     var id = data.params.id; // 1234
 *     // do something with the id...
 *   },this);
 *
 *   m.emit("get", "/address/1234");
 * </pre>
 */
qx.Bootstrap.define("qx.event.Messaging", {
  construct : function(){

    this._listener = {
    },this.__listenerIdCount = 0;
    this.__channelToIdMapping = {
    };
  },
  members : {
    _listener : null,
    __listenerIdCount : null,
    __channelToIdMapping : null,
    /**
     * Adds a route handler for the given channel. The route is called
     * if the {@link #emit} method finds a match.
     *
     * @param channel {String} The channel of the message.
     * @param type {String|RegExp} The type, used for checking if the executed path matches.
     * @param handler {Function} The handler to call if the route matches the executed path.
     * @param scope {var ? null} The scope of the handler.
     * @return {String} The id of the route used to remove the route.
     */
    on : function(channel, type, handler, scope){

      return this._addListener(channel, type, handler, scope);
    },
    /**
     * Adds a handler for the "any" channel. The "any" channel is called
     * before all other channels.
     *
     * @param type {String|RegExp} The route, used for checking if the executed path matches
     * @param handler {Function} The handler to call if the route matches the executed path
     * @param scope {var ? null} The scope of the handler.
     * @return {String} The id of the route used to remove the route.
     */
    onAny : function(type, handler, scope){

      return this._addListener("any", type, handler, scope);
    },
    /**
     * Adds a listener for a certain channel.
     *
     * @param channel {String} The channel the route should be registered for
     * @param type {String|RegExp} The type, used for checking if the executed path matches
     * @param handler {Function} The handler to call if the route matches the executed path
     * @param scope {var ? null} The scope of the handler.
     * @return {String} The id of the route used to remove the route.
     */
    _addListener : function(channel, type, handler, scope){

      var listeners = this._listener[channel] = this._listener[channel] || {
      };
      var id = this.__listenerIdCount++;
      var params = [];
      var param = null;
      // Convert the route to a regular expression.
      if(qx.lang.Type.isString(type)){

        var paramsRegexp = /\{([\w\d]+)\}/g;
        while((param = paramsRegexp.exec(type)) !== null){

          params.push(param[1]);
        };
        type = new RegExp("^" + type.replace(paramsRegexp, "([^\/]+)") + "$");
      };
      listeners[id] = {
        regExp : type,
        params : params,
        handler : handler,
        scope : scope
      };
      this.__channelToIdMapping[id] = channel;
      return id;
    },
    /**
     * Removes a registered listener by the given id.
     *
     * @param id {String} The id of the registered listener.
     */
    remove : function(id){

      var channel = this.__channelToIdMapping[id];
      var listener = this._listener[channel];
      delete listener[id];
      delete this.__channelToIdMapping[id];
    },
    /**
     * Sends a message on the given channel and informs all matching route handlers.
     *
     * @param channel {String} The channel of the message.
     * @param path {String} The path to execute
     * @param params {Map} The given parameters that should be propagated
     * @param customData {var} The given custom data that should be propagated
     */
    emit : function(channel, path, params, customData){

      this._emit(channel, path, params, customData);
    },
    /**
     * Executes a certain channel with a given path. Informs all
     * route handlers that match with the path.
     *
     * @param channel {String} The channel to execute.
     * @param path {String} The path to check
     * @param params {Map} The given parameters that should be propagated
     * @param customData {var} The given custom data that should be propagated
     */
    _emit : function(channel, path, params, customData){

      var listenerMatchedAny = false;
      var listener = this._listener["any"];
      listenerMatchedAny = this._emitListeners(channel, path, listener, params, customData);
      var listenerMatched = false;
      listener = this._listener[channel];
      listenerMatched = this._emitListeners(channel, path, listener, params, customData);
      if(!listenerMatched && !listenerMatchedAny){

        qx.Bootstrap.info("No listener found for " + path);
      };
    },
    /**
     * Executes all given listener for a certain channel. Checks all listeners if they match
     * with the given path and executes the stored handler of the matching route.
     *
     * @param channel {String} The channel to execute.
     * @param path {String} The path to check
     * @param listeners {Map[]} All routes to test and execute.
     * @param params {Map} The given parameters that should be propagated
     * @param customData {var} The given custom data that should be propagated
     *
     * @return {Boolean} Whether the route has been executed
     */
    _emitListeners : function(channel, path, listeners, params, customData){

      if(!listeners || qx.lang.Object.isEmpty(listeners)){

        return false;
      };
      var listenerMatched = false;
      for(var id in listeners){

        var listener = listeners[id];
        listenerMatched |= this._emitRoute(channel, path, listener, params, customData);
      };
      return listenerMatched;
    },
    /**
     * Executes a certain listener. Checks if the listener matches the given path and
     * executes the stored handler of the route.
     *
     * @param channel {String} The channel to execute.
     * @param path {String} The path to check
     * @param listener {Map} The route data.
     * @param params {Map} The given parameters that should be propagated
     * @param customData {var} The given custom data that should be propagated
     *
     * @return {Boolean} Whether the route has been executed
     */
    _emitRoute : function(channel, path, listener, params, customData){

      var match = listener.regExp.exec(path);
      if(match){

        var params = params || {
        };
        var param = null;
        var value = null;
        match.shift();
        // first match is the whole path
        for(var i = 0;i < match.length;i++){

          value = match[i];
          param = listener.params[i];
          if(param){

            params[param] = value;
          } else {

            params[i] = value;
          };
        };
        listener.handler.call(listener.scope, {
          path : path,
          params : params,
          customData : customData
        });
      };
      return match != undefined;
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
#require(qx.event.Messaging#on)
#require(qx.event.Messaging#onAny)
#require(qx.event.Messaging#remove)
#require(qx.event.Messaging#emit)
************************************************************************ */
/**
 * Define messages to react on certain channels.
 *
 * The channel names will be used in the q.messaging.on method to define handlers which will
 * be called on certain channels and routes. The q.messaging.emit method can be used
 * to execute a given route on a channel. q.messaging.onAny defines a handler on any channel.
 */
qx.Bootstrap.define("qx.module.Messaging", {
  statics : {
    /**
     * Adds a route handler for the given channel. The route is called
     * if the {@link #emit} method finds a match.
     *
     * @attachStatic{qxWeb, messaging.on}
     * @param channel {String} The channel of the message.
     * @param type {String|RegExp} The type, used for checking if the executed path matches.
     * @param handler {Function} The handler to call if the route matches the executed path.
     * @param scope {var ? null} The scope of the handler.
     * @return {String} The id of the route used to remove the route.
     * @signature function(channel, type, handler, scope)
     */
    on : null,
    /**
     * Adds a handler for the "any" channel. The "any" channel is called
     * before all other channels.
     *
     * @attachStatic{qxWeb, messaging.onAny}
     * @param type {String|RegExp} The route, used for checking if the executed path matches
     * @param handler {Function} The handler to call if the route matches the executed path
     * @param scope {var ? null} The scope of the handler.
     * @return {String} The id of the route used to remove the route.
     * @signature function(type, handler, scope)
     */
    onAny : null,
    /**
     * Removes a registered listener by the given id.
     *
     * @attachStatic{qxWeb, messaging.remove}
     * @param id {String} The id of the registered listener.
     * @signature function(id)
     */
    remove : null,
    /**
     * Sends a message on the given channel and informs all matching route handlers.
     *
     * @attachStatic{qxWeb, messaging.emit}
     * @param channel {String} The channel of the message.
     * @param path {String} The path to execute
     * @param params {Map} The given parameters that should be propagated
     * @param customData {var} The given custom data that should be propagated
     * @signature function(channel, path, params, customData)
     */
    emit : null
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      "messaging" : new qx.event.Messaging()
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
     * @attachStatic {qxWeb, array.cast}
     *
     * @param object {var} any array-like object
     * @param constructor {Function} constructor of the new instance
     * @param offset {Number?0} position to start from
     * @return {Array} the converted array
     */
    cast : qx.lang.Array.cast,
    /**
     * Check whether the two arrays have the same content. Checks only the
     * equality of the arrays' content.
     *
     * @signature function(arr1, arr2)
     * @attachStatic {qxWeb, array.equals}
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
     * @attachStatic {qxWeb, array.exclude}
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
     * @attachStatic {qxWeb, array.fromArguments}
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
     * @attachStatic {qxWeb, array.insertAfter}
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
     * @attachStatic {qxWeb, array.insertBefore}
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
     * @attachStatic {qxWeb, array.max}
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
     * @attachStatic {qxWeb, array.min}
     *
     * @param arr {Array} Array to process.
     * @return {Number | undefined} The lowest of all values or undefined if array is empty.
     */
    min : qx.lang.Array.min,
    /**
     * Remove an element from the array.
     *
     * @signature function(arr, obj)
     * @attachStatic {qxWeb, array.remove}
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
     * @attachStatic {qxWeb, array.removeAll}
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
     * @attachStatic {qxWeb, array.unique}
     *
     * @param arr {Array} Incoming array
     * @return {Array} Returns a copy with no duplicates
     *   or the original array if no duplicates were found.
     */
    unique : qx.lang.Array.unique
  },
  defer : function(statics){

    qxWeb.$attachStatic({
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
     *
     * @attachStatic {qxWeb, string.camelCase}
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
     * <pre class='javascript'>q.string.hyphenate("weLikeCookies"); //returns "we-like-cookies"</pre>
     *
     * @attachStatic {qxWeb, string.hyphenate}
     * @param str {String} camelcased string
     * @return {String} hyphenated string
     */
    hyphenate : function(str){

      return qx.lang.String.hyphenate.call(qx.lang.String, str);
    },
    /**
     * Convert the first character of the string to upper case.
     *
     * @attachStatic {qxWeb, string.firstUp}
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with an upper case first character
     */
    firstUp : qx.lang.String.firstUp,
    /**
     * Convert the first character of the string to lower case.
     *
     * @attachStatic {qxWeb, string.firstLow}
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with a lower case first character
     */
    firstLow : qx.lang.String.firstLow,
    /**
     * Check whether the string starts with the given substring.
     *
     * @attachStatic {qxWeb, string.startsWith}
     * @signature function(fullstr, substr)
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string starts with the given substring
     */
    startsWith : qx.lang.String.startsWith,
    /**
     * Check whether the string ends with the given substring.
     *
     * @attachStatic {qxWeb, string.endsWith}
     * @signature function(fullstr, substr)
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string ends with the given substring
     */
    endsWith : qx.lang.String.endsWith,
    /**
     * Escapes all chars that have a special meaning in regular expressions.
     *
     * @attachStatic {qxWeb, string.escapeRegexpChars}
     * @signature function(str)
     * @param str {String} the string where to escape the chars.
     * @return {String} the string with the escaped chars.
     */
    escapeRegexpChars : qx.lang.String.escapeRegexpChars
  },
  defer : function(statics){

    qxWeb.$attachStatic({
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
     * @attach {qxWeb}
     * @param transforms {Map} The map containing the transforms and value.
     * @return {qxWeb} This reference for chaining.
     */
    transform : function(transforms){

      this.forEach(function(el){

        qx.bom.element.Transform.transform(el, transforms);
      });
      return this;
    },
    /**
     * Translates by the given value. For further details, take
     * a look at the {@link #transform} method.
     *
     * @attach {qxWeb}
     * @param value {String|Array} The value to translate e.g. <code>"10px"</code>.
     * @return {qxWeb} This reference for chaining.
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
     * @attach {qxWeb}
     * @param value {Number|Array} The value to scale.
     * @return {qxWeb} This reference for chaining.
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
     * @return {qxWeb} This reference for chaining.
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
     * @attach {qxWeb}
     * @param value {String|Array} The value to skew e.g. <code>"90deg"</code>.
     * @return {qxWeb} This reference for chaining.
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
     * @attach {qxWeb}
     * @param value {String} CSS position values like <code>50% 50%</code> or
     *   <code>left top</code>.
     * @return {qxWeb} This reference for chaining.
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param value {String} Either <code>flat</code> or <code>preserve-3d</code>.
     * @return {qxWeb} This reference for chaining.
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param value {Number} The perspective layer. Numbers between 100
     *   and 5000 give the best results.
     * @return {qxWeb} This reference for chaining.
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param value {String} CSS position values like <code>50% 50%</code> or
     *   <code>left top</code>.
     * @return {qxWeb} This reference for chaining.
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param value {Boolean} <code>true</code> if the backface should be visible.
     * @return {qxWeb} This reference for chaining.
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
     * @attach {qxWeb}
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

    qxWeb.$attach({
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
     * Converts the given map to a string which could be added to a css
     * stylesheet.
     * @param transforms {Map} The transforms map. For a detailed description,
     * take a look at the {@link #transform} method.
     * @return {String} The CSS value.
     */
    getCss : function(transforms){

      var transformCss = this.__mapToCss(transforms);
      if(this.__cssKeys != null){

        var style = this.__cssKeys["name"];
        return qx.bom.Style.getCssName(style) + ":" + transformCss + ";";
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
     * Returns the target of the event.
     * Example:
     * <pre class="javascript">
     *   var collection = q("div.inline");
     *   collection.on("click", function(e) {
     *     var clickedElement = e.getTarget();
     *   });
     * </pre>
     *
     * @signature function()
     * @return {Object} Any valid native event target
     */
    getTarget : function(){
    },
    /**
     * Computes the related target from the native DOM event
     *
     * Example:
     * <pre class="javascript">
     *   var collection = q("div.inline");
     *   collection.on("mouseout", function(e) {
     *     // when using 'mouseout' events the 'relatedTarget' is pointing to the DOM element
     *     //  the device exited to.
     *     // Useful for scenarios you only interested if e.g. the user moved away from a
     *     // section at the website
     *     var exitTarget = e.getRelatedTarget();
     *   });
     *
     *   collection.on("mouseover", function(e){
     *      // when using 'mouseover' events the 'relatedTarget' is pointing to the DOM element
     *      // the device entered from.
     *      var earlierElement = e.getRelatedTarget();
     *   });
     * </pre>
     *
     * @signature function()
     * @return {Element} The related target
     */
    getRelatedTarget : function(){
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

    qxWeb.$registerEventNormalization(statics.TYPES, statics.normalize);
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

        // https://developer.mozilla.org/en-US/docs/DOM:Node.compareDocumentPosition
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
     * @attach {qxWeb}
     * @param el {Element} DOM element to add to the collection
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @param selector {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the child elements
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
      return qxWeb.$init(children);
    },
    /**
     * Executes the provided callback function once for each item in the
     * collection.
     *
     * @attach {qxWeb}
     * @param fn {Function} Callback function
     * @param ctx {Object} Context object
     * @return {qxWeb} The collection for chaining
     */
    forEach : function(fn, ctx){

      for(var i = 0;i < this.length;i++){

        fn.call(ctx, this[i], i, this);
      };
      return this;
    },
    /**
     * Gets a set of elements containing the parent of each element in the
     * collection.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the parent elements
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
      return qxWeb.$init(parents);
    },
    /**
     * Gets a set of elements containing all ancestors of each element in the
     * collection.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param filter {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the ancestor elements
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
     * @attach {qxWeb}
     * @param selector {String} Selector that indicates where to stop including
     * ancestor elements
     * @param filter {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the ancestor elements
     */
    getAncestorsUntil : function(selector, filter){

      return this.__getAncestors(selector, filter);
    },
    /**
     * Internal helper for getAncestors and getAncestorsUntil
     *
     * @attach {qxWeb}
     * @param selector {String} Selector that indicates where to stop including
     * ancestor elements
     * @param filter {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the ancestor elements
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
      return qxWeb.$init(ancestors);
    },
    /**
     * Gets a set containing the closest matching ancestor for each item in
     * the collection.
     * If the item itself matches, it is added to the new set. Otherwise, the
     * item's parent chain will be traversed until a match is found.
     *
     * @attach {qxWeb}
     * @param selector {String} Selector expression to match
     * @return {qxWeb} New collection containing the closest matching ancestors
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

        findClosest(qxWeb(this[i]));
      };
      return qxWeb.$init(closest);
    },
    /**
     * Searches the child elements of each item in the collection and returns
     * a new collection containing the children that match the provided selector
     *
     * @attach {qxWeb}
     * @param selector {String} Selector expression to match the child elements
     * against
     * @return {qxWeb} New collection containing the matching child elements
     */
    find : function(selector){

      var found = [];
      for(var i = 0;i < this.length;i++){

        found = found.concat(qx.bom.Selector.query(selector, this[i]));
      };
      return qxWeb.$init(found);
    },
    /**
     * Gets a new set of elements containing the child nodes of each item in the
     * current set.
     *
     * @attach {qxWeb}
     * @return {qxWeb} New collection containing the child nodes
     */
    getContents : function(){

      var found = [];
      for(var i = 0;i < this.length;i++){

        found = found.concat(qx.lang.Array.fromCollection(this[i].childNodes));
      };
      return qxWeb.$init(found);
    },
    /**
     * Checks if at least one element in the collection passes the provided
     * filter. This can be either a selector expression or a filter
     * function
     *
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param index {Number} The position of the element in the collection
     * @return {qxWeb} A new collection containing one element
     */
    eq : function(index){

      return this.slice(index, +index + 1);
    },
    /**
     * Reduces the collection to the first element.
     *
     * @attach {qxWeb}
     * @return {qxWeb} A new collection containing one element
     */
    getFirst : function(){

      return this.slice(0, 1);
    },
    /**
     * Reduces the collection to the last element.
     *
     * @attach {qxWeb}
     * @return {qxWeb} A new collection containing one element
     */
    getLast : function(){

      return this.slice(this.length - 1);
    },
    /**
     * Gets a collection containing only the elements that have descendants
     * matching the given selector
     *
     * @attach {qxWeb}
     * @param selector {String} Selector expression
     * @return {qxWeb} a new collection containing only elements with matching descendants
     */
    has : function(selector){

      var found = [];
      for(var i = 0;i < this.length;i++){

        var descendants = qx.bom.Selector.matches(selector, this.eq(i).getContents());
        if(descendants.length > 0){

          found.push(this[i]);
        };
      };
      return qxWeb.$init(found);
    },
    /**
     * Gets a collection containing the next sibling element of each item in
     * the current set (ignoring text and comment nodes).
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing next siblings
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
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing following siblings
     */
    getNextAll : function(selector){

      var ret = qx.module.Traversing.__hierarchyHelper(this, "getNextSiblings", selector);
      return qxWeb.$init(ret);
    },
    /**
     * Gets a collection containing the following sibling elements of each
     * item in the current set (ignoring text and comment nodes) up to but not
     * including any element that matches the given selector.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing following siblings
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
      return qxWeb.$init(found);
    },
    /**
     * Gets a collection containing the previous sibling element of each item in
     * the current set (ignoring text and comment nodes).
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing previous siblings
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
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing preceding siblings
     */
    getPrevAll : function(selector){

      var ret = qx.module.Traversing.__hierarchyHelper(this, "getPreviousSiblings", selector);
      return qxWeb.$init(ret);
    },
    /**
     * Gets a collection containing the preceding sibling elements of each
     * item in the current set (ignoring text and comment nodes) up to but not
     * including any element that matches the given selector.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing preceding siblings
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
      return qxWeb.$init(found);
    },
    /**
     * Gets a collection containing all sibling elements of the items in the
     * current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing sibling elements
     */
    getSiblings : function(selector){

      var ret = qx.module.Traversing.__hierarchyHelper(this, "getSiblings", selector);
      return qxWeb.$init(ret);
    },
    /**
     * Remove elements from the collection that do not pass the given filter.
     * This can be either a selector expression or a filter function
     *
     * @attach {qxWeb}
     * @param selector {String|Function} Selector or filter function
     * @return {qxWeb} Reduced collection
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
     * @attach {qxWeb}
     * @return {qxWeb} New collection containing offset parents
     */
    getOffsetParent : function(){

      return this.map(qx.bom.element.Location.getOffsetParent);
    },
    /**
     * Whether the first element in the collection is inserted into
     * the document for which it was created.
     *
     * @return {Boolean} <code>true</code> when the element is inserted
     *    into the document.
     */
    isRendered : function(){

      if(!this[0]){

        return false;
      };
      return qx.dom.Hierarchy.isRendered(this[0]);
    },
    /**
     * Checks if the given object is a DOM element
     *
     * @attachStatic{qxWeb}
     * @param element {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM element
     */
    isElement : function(element){

      return qx.dom.Node.isElement(element);
    },
    /**
     * Checks if the given object is a DOM node
     *
     * @attachStatic{qxWeb}
     * @param node {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM node
     */
    isNode : function(node){

      return qx.dom.Node.isNode(node);
    },
    /**
     * Checks if the given object is a DOM document object
     *
     * @attachStatic{qxWeb}
     * @param node {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM document
     */
    isDocument : function(node){

      return qx.dom.Node.isDocument(node);
    },
    /**
     * Returns the DOM2 <code>defaultView</code> (window) for the given node.
     *
     * @attachStatic{qxWeb}
     * @param node {Node|Document|Window} Node to inspect
     * @return {Window} the <code>defaultView</code> for the given node
     */
    getWindow : function(node){

      return qx.dom.Node.getWindow(node);
    },
    /**
     * Returns the owner document of the given node
     *
     * @attachStatic{qxWeb}
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
     * @attach{qxWeb}
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

    qxWeb.$attach({
      "add" : statics.add,
      "getChildren" : statics.getChildren,
      "forEach" : statics.forEach,
      "getParents" : statics.getParents,
      "getAncestors" : statics.getAncestors,
      "getAncestorsUntil" : statics.getAncestorsUntil,
      "__getAncestors" : statics.__getAncestors,
      "getClosest" : statics.getClosest,
      "find" : statics.find,
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
      "getOffsetParent" : statics.getOffsetParent,
      "isRendered" : statics.isRendered
    });
    qxWeb.$attachStatic({
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param html {String} HTML string
     * @return {qxWeb} The collection for chaining
     */
    setHtml : function(html){

      html = qx.bom.Html.fixEmptyTags(html);
      for(var i = 0;i < this.length;i++){

        qx.bom.element.Attribute.set(this[i], "html", html);
      };
      return this;
    },
    /**
     * Sets an HTML attribute on each item in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Attribute name
     * @param value {var} Attribute value
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param name {String} Attribute name
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @param attributes {Map} A map of attribute name/value pairs
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param attributes {String[]} List of attribute names
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @param name {String} Property name
     * @param value {var} Property value
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param properties {Map} A map of property name/value pairs
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
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
     * @attach {qxWeb}
     * @param value {String|Number|Array} The value to apply
     * @return {qxWeb} The collection for chaining
     */
    setValue : function(value){

      for(var i = 0,l = this.length;i < l;i++){

        qx.bom.Input.setValue(this[i], value);
      };
      return this;
    }
  },
  defer : function(statics){

    qxWeb.$attach({
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
/* ************************************************************************
#ignore(qxWeb)
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
     * Fixes "XHTML"-style tags in all browsers.
     * Replaces tags which are not allowed to be closed directly such as
     * <code>div</code> or <code>p</code>. They are patched to use opening and
     * closing tags instead, e.g. <code>&lt;p&gt;</code> => <code>&lt;p&gt;&lt;/p&gt;</code>
     *
     * @param html {String} HTML to fix
     * @return {String} Fixed HTML
     */
    fixEmptyTags : function(html){

      return html.replace(/(<(\w+)[^>]*?)\/>/g, this.__fixNonDirectlyClosableHelper);
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
      html = qx.bom.Html.fixEmptyTags(html);
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
        } else if(obj instanceof qx.type.BaseArray || (typeof qxWeb !== "undefined" && obj instanceof qxWeb)){

          ret.push.apply(ret, Array.prototype.slice.call(obj, 0));
        } else if(obj.toElement){

          ret.push(obj.toElement());
        } else {

          ret.push.apply(ret, obj);
        };;
      };
      // Append to fragment and filter out scripts... or...
      if(fragment){

        var scripts = [],elem;
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
              var scriptList = qx.lang.Array.fromCollection(elem.getElementsByTagName("script"));
              ret.splice.apply(ret, [i + 1, 0].concat(scriptList));
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
/* ************************************************************************
#ignore(qx.bom.element.AnimationJs)
#ignore(qx.bom)
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
     * @attachStatic{qxWeb}
     * @param html {String|Element[]} HTML string or DOM element(s)
     * @return {qxWeb} Collection of elements
     */
    create : function(html){

      return qxWeb.$init(qx.bom.Html.clean([html]));
    },
    /**
     * Clones the items in the current collection and returns them in a new set.
     * Event listeners can also be cloned.
     *
     * @attach{qxWeb}
     * @param events {Boolean} clone event listeners. Default: <pre>false</pre>
     * @return {qxWeb} New collection with clones
     */
    clone : function(events){

      var clones = [];
      for(var i = 0;i < this.length;i++){

        clones[i] = this[i].cloneNode(true);
      };
      if(events === true && this.copyEventsTo){

        this.copyEventsTo(clones);
      };
      return qxWeb(clones);
    },
    /**
     * Appends content to each element in the current set. Accepts an HTML string,
     * a single DOM element or an array of elements
     *
     * @attach{qxWeb}
     * @param html {String|Element[]} HTML string or DOM element(s) to append
     * @return {qxWeb} The collection for chaining
     */
    append : function(html){

      var arr = qx.bom.Html.clean([html]);
      var children = qxWeb.$init(arr);
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
     * @attach{qxWeb}
     * @param parent {String|Element[]} Parent selector expression or list of
     * parent elements
     * @return {qxWeb} The collection for chaining
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
     * @attach{qxWeb}
     * @param target {String|Element} Selector expression or DOM element
     * @return {qxWeb} The collection for chaining
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
     * @attach{qxWeb}
     * @param target {String|Element} Selector expression or DOM element
     * @return {qxWeb} The collection for chaining
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
     * @attach{qxWeb}
     * @param arg {String|Element} Selector expression or DOM element
     * @return {Element[]} Array of elements
     * @internal
     */
    __getElementArray : function(arg){

      if(!qx.lang.Type.isArray(arg)){

        var fromSelector = qxWeb(arg);
        arg = fromSelector.length > 0 ? fromSelector : [arg];
      };
      return arg;
    },
    /**
     * Wraps each element in the collection in a copy of an HTML structure.
     * Elements will be appended to the deepest nested element in the structure
     * as determined by a depth-first search.
     *
     * @attach{qxWeb}
     * @param wrapper {var} Selector expression, HTML string, DOM element or
     * list of DOM elements
     * @return {qxWeb} The collection for chaining
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
     * @return {qxWeb} Collection
     * @internal
     */
    __getCollectionFromArgument : function(arg){

      var coll;
      // Collection/array of DOM elements
      if(qx.lang.Type.isArray(arg)){

        coll = qxWeb(arg);
      } else {

        var arr = qx.bom.Html.clean([arg]);
        if(arr.length > 0 && qx.dom.Node.isElement(arr[0])){

          coll = qxWeb(arr);
        } else {

          coll = qxWeb(arg);
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
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
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
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    empty : function(){

      for(var i = 0;i < this.length;i++){

        // don't use innerHTML="" because of [BUG #7323]
        // and don't use textContent="" because of missing IE8 support
        while(this[i].firstChild){

          this[i].removeChild(this[i].firstChild);
        };
      };
      return this;
    },
    /**
     * Inserts content before each element in the collection. This can either
     * be an HTML string, an array of HTML strings, a single DOM element or an
     * array of elements.
     *
     * @attach{qxWeb}
     * @param content {String[]|Element[]} HTML string(s) or DOM element(s)
     * @return {qxWeb} The collection for chaining
     */
    before : function(content){

      if(!qx.lang.Type.isArray(content)){

        content = [content];
      };
      var fragment = document.createDocumentFragment();
      qx.bom.Html.clean(content, document, fragment);
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
     * @attach{qxWeb}
     * @param content {String[]|Element[]} HTML string(s) or DOM element(s)
     * @return {qxWeb} The collection for chaining
     */
    after : function(content){

      if(!qx.lang.Type.isArray(content)){

        content = [content];
      };
      var fragment = document.createDocumentFragment();
      qx.bom.Html.clean(content, document, fragment);
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
     * @attach{qxWeb}
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
     * @attach{qxWeb}
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
    /** Default animation descriptions for animated scrolling **/
    _animationDescription : {
      scrollLeft : {
        duration : 700,
        timing : "ease-in",
        keep : 100,
        keyFrames : {
          '0' : {
          },
          '100' : {
            scrollLeft : 1
          }
        }
      },
      scrollTop : {
        duration : 700,
        timing : "ease-in",
        keep : 100,
        keyFrames : {
          '0' : {
          },
          '100' : {
            scrollTop : 1
          }
        }
      }
    },
    /**
     * Performs animated scrolling
     *
     * @param property {String} Element property to animate: <code>scrollLeft</code>
     * or <code>scrollTop</code>
     * @param value {Number} Final scroll position
     * @param duration {Number} The animation's duration in ms
     * @return {q} The collection for chaining.
     */
    __animateScroll : function(property, value, duration){

      var desc = qx.lang.Object.clone(qx.module.Manipulating._animationDescription[property], true);
      desc.keyFrames[100][property] = value;
      return this.animate(desc, duration);
    },
    /**
     * Scrolls the elements of the collection to the given coordinate.
     *
     * @attach{qxWeb}
     * @param value {Number} Left scroll position
     * @param duration {Number?} Optional: Duration in ms for animated scrolling
     * @return {qxWeb} The collection for chaining
     */
    setScrollLeft : function(value, duration){

      var Node = qx.dom.Node;
      if(duration && qx.bom.element && qx.bom.element.AnimationJs){

        qx.module.Manipulating.__animateScroll.bind(this, "scrollLeft", value, duration)();
      };
      for(var i = 0,l = this.length,obj;i < l;i++){

        obj = this[i];
        if(Node.isElement(obj)){

          if(!(duration && qx.bom.element && qx.bom.element.AnimationJs)){

            obj.scrollLeft = value;
          };
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
     * @attach{qxWeb}
     * @param value {Number} Top scroll position
     * @param duration {Number?} Optional: Duration in ms for animated scrolling
     * @return {qxWeb} The collection for chaining
     */
    setScrollTop : function(value, duration){

      var Node = qx.dom.Node;
      if(duration && qx.bom.element && qx.bom.element.AnimationJs){

        qx.module.Manipulating.__animateScroll.bind(this, "scrollTop", value, duration)();
      };
      for(var i = 0,l = this.length,obj;i < l;i++){

        obj = this[i];
        if(Node.isElement(obj)){

          if(!(duration && qx.bom.element && qx.bom.element.AnimationJs)){

            obj.scrollTop = value;
          };
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
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
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
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
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

    qxWeb.$attachStatic({
      "create" : statics.create
    });
    qxWeb.$attach({
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
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/* ************************************************************************
#require(qx.module.Manipulating)
#require(qx.module.Css)
#require(qx.module.Attribute)
#require(qx.module.Event)
#require(qx.module.Environment)
#require(qx.module.Polyfill)
#require(qx.module.Traversing)
************************************************************************ */
/**
 * The module supplies a fallback implementation for placeholders, which is
 * used on input and textarea elements. If the browser supports native placeholders
 * the API silently ignores all calls. If not, an element will be created for every
 * given input element and acts as placeholder. Most modern browsers support
 * placeholders which makes the fallback only relevant for IE < 10 and FF < 4.
 *
 *  * <a href="http://dev.w3.org/html5/spec/single-page.html#the-placeholder-attribute">HTML Spec</a>
 *
 *  * <a href="http://caniuse.com/#feat=input-placeholder">Browser Support</a>
 */
qx.Bootstrap.define("qx.module.Placeholder", {
  statics : {
    /**
     * String holding the property name which holds the placeholder
     * element for each input.
     */
    PLACEHOLDER_NAME : "$qx_placeholder",
    /**
     * Queries for all input and textarea elements on the page and updates
     * their placeholder.
     * @attachStatic{qxWeb, placeholder.update}
     */
    update : function(){

      // ignore if native placeholder are supported
      if(!qxWeb.env.get("css.placeholder")){

        qxWeb("input[placeholder], textarea[placeholder]").updatePlaceholder();
      };
    },
    /**
     * Updates the placeholders for input's and textarea's in the collection.
     * This includes positioning, styles and DOM positioning.
     * In case the browser supports native placeholders, this methods simply
     * does nothing.
     *
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    updatePlaceholder : function(){

      // ignore everything if native placeholder are supported
      if(!qxWeb.env.get("css.placeholder")){

        for(var i = 0;i < this.length;i++){

          var item = qxWeb(this[i]);
          // ignore all not fitting items in the collection
          var placeholder = item.getAttribute("placeholder");
          var tagName = item.getProperty("tagName");
          if(!placeholder || (tagName != "TEXTAREA" && tagName != "INPUT")){

            continue;
          };
          // create the element if necessary
          var placeholderEl = item.getProperty(qx.module.Placeholder.PLACEHOLDER_NAME);
          if(!placeholderEl){

            placeholderEl = qx.module.Placeholder.__createPlaceholderElement(item);
          };
          // remove and add handling
          var itemInBody = item.isRendered();
          var placeholderElInBody = placeholderEl.isRendered();
          if(itemInBody && !placeholderElInBody){

            item.before(placeholderEl);
          } else if(!itemInBody && placeholderElInBody){

            placeholderEl.remove();
            return this;
          };
          qx.module.Placeholder.__syncStyles(item);
        };
      };
      return this;
    },
    /**
     * Internal helper method to update the styles for a given input element.
     * @param item {qxWeb} The input element to update.
     */
    __syncStyles : function(item){

      var placeholder = item.getAttribute("placeholder");
      var placeholderEl = item.getProperty(qx.module.Placeholder.PLACEHOLDER_NAME);
      var zIndex = item.getStyle("z-index");
      var paddingHor = parseInt(item.getStyle("padding-left")) + 2 * parseInt(item.getStyle("padding-right"));
      var paddingVer = parseInt(item.getStyle("padding-top")) + 2 * parseInt(item.getStyle("padding-bottom"));
      placeholderEl.setHtml(placeholder).setStyles({
        display : item.getValue() == "" ? "inline" : "none",
        zIndex : zIndex == "auto" ? 1 : zIndex + 1,
        textAlign : item.getStyle("text-align"),
        width : (item.getWidth() - paddingHor - 4) + "px",
        height : (item.getHeight() - paddingVer - 4) + "px",
        left : item.getOffset().left + "px",
        top : item.getOffset().top + "px",
        fontFamily : item.getStyle("font-family"),
        fontStyle : item.getStyle("font-style"),
        fontVariant : item.getStyle("font-variant"),
        fontWeight : item.getStyle("font-weight"),
        fontSize : item.getStyle("font-size"),
        paddingTop : (parseInt(item.getStyle("padding-top")) + 2) + "px",
        paddingRight : (parseInt(item.getStyle("padding-right")) + 2) + "px",
        paddingBottom : (parseInt(item.getStyle("padding-bottom")) + 2) + "px",
        paddingLeft : (parseInt(item.getStyle("padding-left")) + 2) + "px"
      });
    },
    /**
     * Creates a placeholder element based on the given input element.
     * @param item {qxWeb} The input element.
     * @return {qxWeb} The placeholder element.
     */
    __createPlaceholderElement : function(item){

      // create the label with initial styles
      var placeholderEl = qxWeb.create("<label>").setStyles({
        position : "absolute",
        color : "#989898",
        overflow : "hidden",
        pointerEvents : "none"
      });
      // store the label at the input field
      item.setProperty(qx.module.Placeholder.PLACEHOLDER_NAME, placeholderEl);
      // update the placeholders visibility on keyUp
      item.on("keyup", function(item){

        var el = item.getProperty(qx.module.Placeholder.PLACEHOLDER_NAME);
        el.setStyle("display", item.getValue() == "" ? "inline" : "none");
      }.bind(this, item));
      // for browsers not supporting pointer events
      if(!qxWeb.env.get("event.pointer")){

        placeholderEl.setStyle("cursor", "text").on("click", function(item){

          item.focus();
        }.bind(this, item));
      };
      return placeholderEl;
    }
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      "placeholder" : {
        update : statics.update
      }
    });
    qxWeb.$attach({
      "updatePlaceholder" : statics.updatePlaceholder
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
 *   // return "Hi, my name is qooxdoo!"
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
     * Additionally, you should not put the template into a regular, hidden
     * DOM element because the template may not be valid HTML due to the containing
     * mustache tags. We suggest to put it into a script tag with the type
     * <code>text/template</code>.
     *
     * @attachStatic{qxWeb, template.get}
     * @param id {String} The id of the HTML template in the DOM.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {qxWeb} Collection containing a single DOM element with the parsed
     * template data.
     */
    get : function(id, view, partials){

      var el = qx.bom.Template.get(id, view, partials);
      return qxWeb.$init([el]);
    },
    /**
     * Original and only template method of mustache.js. For further
     * documentation, please visit https://github.com/janl/mustache.js
     *
     * @attachStatic{qxWeb, template.render}
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

    qxWeb.$attachStatic({
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
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

   ======================================================================

   This class contains code based on the following work:

   * Mustache.js version 0.7.0

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
     * Helper method which provides you with a direct access to templates
     * stored as HTML in the DOM. The DOM node with the given ID will be used
     * as a template, parsed and a new DOM node will be returned containing the
     * parsed data. Keep in mind to have only one root DOM element in the the
     * template.
     * Additionally, you should not put the template into a regular, hidden
     * DOM element because the template may not be valid HTML due to the containing
     * mustache tags. We suggest to put it into a script tag with the type
     * <code>text/template</code>.
     *
     * @param id {String} The id of the HTML template in the DOM.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {Element} A DOM element holding the parsed template data.
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
  /*global define: false*/
  var Mustache;
  /**
   * @lint ignoreUndefined(module,define)
   */
  (function(exports){

    Mustache = exports;
  }((function(){

    var exports = {
    };
    exports.name = "mustache.js";
    exports.version = "0.7.0";
    exports.tags = ["{{", "}}"];
    exports.Scanner = Scanner;
    exports.Context = Context;
    exports.Writer = Writer;
    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var nonSpaceRe = /\S/;
    var eqRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;
    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    function testRe(re, string){

      return RegExp.prototype.test.call(re, string);
    };
    function isWhitespace(string){

      return !testRe(nonSpaceRe, string);
    };
    var isArray = Array.isArray || function(obj){

      return Object.prototype.toString.call(obj) === "[object Array]";
    };
    function escapeRe(string){

      return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    };
    var entityMap = {
      "&" : "&amp;",
      "<" : "&lt;",
      ">" : "&gt;",
      '"' : '&quot;',
      "'" : '&#39;',
      "/" : '&#x2F;'
    };
    function escapeHtml(string){

      return String(string).replace(/[&<>"'\/]/g, function(s){

        return entityMap[s];
      });
    };
    // Export the escaping function so that the user may override it.
    // See https://github.com/janl/mustache.js/issues/244
    exports.escape = escapeHtml;
    function Scanner(string){

      this.string = string;
      this.tail = string;
      this.pos = 0;
    };
    /**
     * Returns `true` if the tail is empty (end of string).
     */
    Scanner.prototype.eos = function(){

      return this.tail === "";
    };
    /**
     * Tries to match the given regular expression at the current position.
     * Returns the matched text if it can match, the empty string otherwise.
     */
    Scanner.prototype.scan = function(re){

      var match = this.tail.match(re);
      if(match && match.index === 0){

        this.tail = this.tail.substring(match[0].length);
        this.pos += match[0].length;
        return match[0];
      };
      return "";
    };
    /**
     * Skips all text until the given regular expression can be matched. Returns
     * the skipped string, which is the entire tail if no match can be made.
     */
    Scanner.prototype.scanUntil = function(re){

      var match,pos = this.tail.search(re);
      switch(pos){case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;case 0:
      match = "";
      break;default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;};
      return match;
    };
    function Context(view, parent){

      this.view = view;
      this.parent = parent;
      this.clearCache();
    };
    Context.make = function(view){

      return (view instanceof Context) ? view : new Context(view);
    };
    Context.prototype.clearCache = function(){

      this._cache = {
      };
    };
    Context.prototype.push = function(view){

      return new Context(view, this);
    };
    Context.prototype.lookup = function(name){

      var value = this._cache[name];
      if(!value){

        if(name === "."){

          value = this.view;
        } else {

          var context = this;
          while(context){

            if(name.indexOf(".") > 0){

              var names = name.split("."),i = 0;
              value = context.view;
              while(value && i < names.length){

                value = value[names[i++]];
              };
            } else {

              value = context.view[name];
            };
            if(value != null){

              break;
            };
            context = context.parent;
          };
        };
        this._cache[name] = value;
      };
      if(typeof value === "function"){

        value = value.call(this.view);
      };
      return value;
    };
    function Writer(){

      this.clearCache();
    };
    Writer.prototype.clearCache = function(){

      this._cache = {
      };
      this._partialCache = {
      };
    };
    Writer.prototype.compile = function(template, tags){

      var fn = this._cache[template];
      if(!fn){

        var tokens = exports.parse(template, tags);
        fn = this._cache[template] = this.compileTokens(tokens, template);
      };
      return fn;
    };
    Writer.prototype.compilePartial = function(name, template, tags){

      var fn = this.compile(template, tags);
      this._partialCache[name] = fn;
      return fn;
    };
    Writer.prototype.compileTokens = function(tokens, template){

      var fn = compileTokens(tokens);
      var self = this;
      return function(view, partials){

        if(partials){

          if(typeof partials === "function"){

            self._loadPartial = partials;
          } else {

            for(var name in partials){

              self.compilePartial(name, partials[name]);
            };
          };
        };
        return fn(self, Context.make(view), template);
      };
    };
    Writer.prototype.render = function(template, view, partials){

      return this.compile(template)(view, partials);
    };
    Writer.prototype._section = function(name, context, text, callback){

      var value = context.lookup(name);
      switch(typeof value){case "object":
      if(isArray(value)){

        var buffer = "";
        for(var i = 0,len = value.length;i < len;++i){

          buffer += callback(this, context.push(value[i]));
        };
        return buffer;
      };
      return value ? callback(this, context.push(value)) : "";case "function":
      var self = this;
      var scopedRender = function(template){

        return self.render(template, context);
      };
      return value.call(context.view, text, scopedRender) || "";default:
      if(value){

        return callback(this, context);
      };};
      return "";
    };
    Writer.prototype._inverted = function(name, context, callback){

      var value = context.lookup(name);
      // Use JavaScript's definition of falsy. Include empty arrays.
      // See https://github.com/janl/mustache.js/issues/186
      if(!value || (isArray(value) && value.length === 0)){

        return callback(this, context);
      };
      return "";
    };
    Writer.prototype._partial = function(name, context){

      if(!(name in this._partialCache) && this._loadPartial){

        this.compilePartial(name, this._loadPartial(name));
      };
      var fn = this._partialCache[name];
      return fn ? fn(context) : "";
    };
    Writer.prototype._name = function(name, context){

      var value = context.lookup(name);
      if(typeof value === "function"){

        value = value.call(context.view);
      };
      return (value == null) ? "" : String(value);
    };
    Writer.prototype._escaped = function(name, context){

      return exports.escape(this._name(name, context));
    };
    /**
     * Calculates the bounds of the section represented by the given `token` in
     * the original template by drilling down into nested sections to find the
     * last token that is part of that section. Returns an array of [start, end].
     */
    function sectionBounds(token){

      var start = token[3];
      var end = start;
      var tokens;
      while((tokens = token[4]) && tokens.length){

        token = tokens[tokens.length - 1];
        end = token[3];
      };
      return [start, end];
    };
    /**
     * Low-level function that compiles the given `tokens` into a function
     * that accepts three arguments: a Writer, a Context, and the template.
     */
    function compileTokens(tokens){

      var subRenders = {
      };
      function subRender(i, tokens, template){

        if(!subRenders[i]){

          var fn = compileTokens(tokens);
          subRenders[i] = function(writer, context){

            return fn(writer, context, template);
          };
        };
        return subRenders[i];
      };
      return function(writer, context, template){

        var buffer = "";
        var token,sectionText;
        for(var i = 0,len = tokens.length;i < len;++i){

          token = tokens[i];
          switch(token[0]){case "#":
          sectionText = template.slice.apply(template, sectionBounds(token));
          buffer += writer._section(token[1], context, sectionText, subRender(i, token[4], template));
          break;case "^":
          buffer += writer._inverted(token[1], context, subRender(i, token[4], template));
          break;case ">":
          buffer += writer._partial(token[1], context);
          break;case "&":
          buffer += writer._name(token[1], context);
          break;case "name":
          buffer += writer._escaped(token[1], context);
          break;case "text":
          buffer += token[1];
          break;};
        };
        return buffer;
      };
    };
    /**
     * Forms the given array of `tokens` into a nested tree structure where
     * tokens that represent a section have a fifth item: an array that contains
     * all tokens in that section.
     */
    function nestTokens(tokens){

      var tree = [];
      var collector = tree;
      var sections = [];
      var token,section;
      for(var i = 0;i < tokens.length;++i){

        token = tokens[i];
        switch(token[0]){case "#":case "^":
        token[4] = [];
        sections.push(token);
        collector.push(token);
        collector = token[4];
        break;case "/":
        if(sections.length === 0){

          throw new Error("Unopened section: " + token[1]);
        };
        section = sections.pop();
        if(section[1] !== token[1]){

          throw new Error("Unclosed section: " + section[1]);
        };
        if(sections.length > 0){

          collector = sections[sections.length - 1][4];
        } else {

          collector = tree;
        };
        break;default:
        collector.push(token);};
      };
      // Make sure there were no open sections when we're done.
      section = sections.pop();
      if(section){

        throw new Error("Unclosed section: " + section[1]);
      };
      return tree;
    };
    /**
     * Combines the values of consecutive text tokens in the given `tokens` array
     * to a single token.
     */
    function squashTokens(tokens){

      var token,lastToken;
      for(var i = 0;i < tokens.length;++i){

        token = tokens[i];
        if(lastToken && lastToken[0] === "text" && token[0] === "text"){

          lastToken[1] += token[1];
          lastToken[3] = token[3];
          tokens.splice(i--, 1);
        } else {

          lastToken = token;
        };
      };
    };
    function escapeTags(tags){

      if(tags.length !== 2){

        throw new Error("Invalid tags: " + tags.join(" "));
      };
      return [new RegExp(escapeRe(tags[0]) + "\\s*"), new RegExp("\\s*" + escapeRe(tags[1]))];
    };
    /**
     * Breaks up the given `template` string into a tree of token objects. If
     * `tags` is given here it must be an array with two string values: the
     * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
     * course, the default is to use mustaches (i.e. Mustache.tags).
     */
    exports.parse = function(template, tags){

      tags = tags || exports.tags;
      var tagRes = escapeTags(tags);
      var scanner = new Scanner(template);
      var tokens = [],// Buffer to hold the tokens
      spaces = [],// Indices of whitespace tokens on the current line
      hasTag = false,// Is there a {{tag}} on the current line?
      nonSpace = false;
      // Is there a non-space char on the current line?
      // Strips all whitespace tokens array for the current line
      // if there was a {{#tag}} on it and otherwise only space.
      function stripSpace(){

        if(hasTag && !nonSpace){

          while(spaces.length){

            tokens.splice(spaces.pop(), 1);
          };
        } else {

          spaces = [];
        };
        hasTag = false;
        nonSpace = false;
      };
      var start,type,value,chr;
      while(!scanner.eos()){

        start = scanner.pos;
        value = scanner.scanUntil(tagRes[0]);
        if(value){

          for(var i = 0,len = value.length;i < len;++i){

            chr = value.charAt(i);
            if(isWhitespace(chr)){

              spaces.push(tokens.length);
            } else {

              nonSpace = true;
            };
            tokens.push(["text", chr, start, start + 1]);
            start += 1;
            if(chr === "\n"){

              stripSpace();
            };
          };
        };
        start = scanner.pos;
        // Match the opening tag.
        if(!scanner.scan(tagRes[0])){

          break;
        };
        hasTag = true;
        type = scanner.scan(tagRe) || "name";
        // Skip any whitespace between tag and value.
        scanner.scan(whiteRe);
        // Extract the tag value.
        if(type === "="){

          value = scanner.scanUntil(eqRe);
          scanner.scan(eqRe);
          scanner.scanUntil(tagRes[1]);
        } else if(type === "{"){

          var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
          value = scanner.scanUntil(closeRe);
          scanner.scan(curlyRe);
          scanner.scanUntil(tagRes[1]);
          type = "&";
        } else {

          value = scanner.scanUntil(tagRes[1]);
        };
        // Match the closing tag.
        if(!scanner.scan(tagRes[1])){

          throw new Error("Unclosed tag at " + scanner.pos);
        };
        tokens.push([type, value, start, scanner.pos]);
        if(type === "name" || type === "{" || type === "&"){

          nonSpace = true;
        };
        // Set the tags for the next time around.
        if(type === "="){

          tags = value.split(spaceRe);
          tagRes = escapeTags(tags);
        };
      };
      squashTokens(tokens);
      return nestTokens(tokens);
    };
    // The high-level clearCache, compile, compilePartial, and render functions
    // use this default writer.
    var _writer = new Writer();
    /**
     * Clears all cached templates and partials in the default writer.
     */
    exports.clearCache = function(){

      return _writer.clearCache();
    };
    /**
     * Compiles the given `template` to a reusable function using the default
     * writer.
     */
    exports.compile = function(template, tags){

      return _writer.compile(template, tags);
    };
    /**
     * Compiles the partial with the given `name` and `template` to a reusable
     * function using the default writer.
     */
    exports.compilePartial = function(name, template, tags){

      return _writer.compilePartial(name, template, tags);
    };
    /**
     * Compiles the given array of tokens (the output of a parse) to a reusable
     * function using the default writer.
     */
    exports.compileTokens = function(tokens, template){

      return _writer.compileTokens(tokens, template);
    };
    /**
     * Renders the `template` with the given `view` and `partials` using the
     * default writer.
     */
    exports.render = function(template, view, partials){

      return _writer.render(template, view, partials);
    };
    // This is here for backwards compatibility with 0.4.x.
    exports.to_html = function(template, view, partials, send){

      var result = exports.render(template, view, partials);
      if(typeof send === "function"){

        send(result);
      } else {

        return result;
      };
    };
    return exports;
  }())));
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
 * Orientation handler which is responsible for registering and unregistering a
 * {@link qx.event.handler.OrientationCore} handler for each given element.
 */
qx.Bootstrap.define("qx.module.event.OrientationHandler", {
  statics : {
    /**
     * List of events that require an orientation handler
     * @type {Array}
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

    qxWeb.$registerEventHook(statics.TYPES, statics.register, statics.unregister);
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

        {
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
            {
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

        {
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
     * Abort request - i.e. cancels any network activity.
     *
     * Note:
     *  On Windows 7 every browser strangely skips the loading phase
     *  when this method is called (because readyState never gets 3).
     *
     *  So keep this in mind if you rely on the phases which are
     *  passed through. They will be "opened", "sent", "abort"
     *  instead of normally "opened", "sent", "loading", "abort".
     *
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
     * @param ctx {var?} The context of the listener.
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
     * @return {Boolean} <code>true</code> if the object was successfully disposed
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

        return false;
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
      {
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
     * @return {Boolean} <code>true</code> if request object reuse is supported
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
     * @return {Integer} Maximum number of parallel requests
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
        // Bug #6917: Distinguish Chrome from Safari, Chrome has 6 connections
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
     * <ul>
     * <li><code>method</code> The method of the request. Default: <code>GET</code></li>
     * <li><code>async</code> flag to mark the request as asynchronous. Default: <code>true</code></li>
     * <li><code>header</code> A map of request headers.</li>
     * </ul>
     *
     * @attachStatic {qxWeb, io.xhr}
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
     * @attachStatic {qxWeb, io.script}
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
     * @attachStatic {qxWeb, io.jsonp}
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
      script.setPrefix("qxWeb.$$");
      // needed in case no callback name is given
      script.open("get", url);
      return script;
    }
  },
  defer : function(statics){

    qxWeb.$attachStatic({
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
     * @param ctx {var?} The context of the listener.
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

        return null;
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

        return null;
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

        return null;
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
     * @return {String|null} Warning message or <code>null</code> if the request
     * is disposed
     */
    getResponseHeader : function(key){

      if(this.__disposed){

        return null;
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
     * @return {String|null} Warning message or <code>null</code> if the request
     * is disposed
     */
    getAllResponseHeaders : function(){

      if(this.__disposed){

        return null;
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
     * @return {var} Value of the queried environment key
     * @lint environmentNonLiteralKey(key)
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
     * {String} The generated URL for the current request
     */
    __generatedUrl : null,
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
      callbackName = this.__callbackName || this.__prefix + "qx.bom.request.Jsonp." + this.__id + ".callback";
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

          {
          };
        };
      };
      {
      };
      query[callbackParam] = callbackName;
      this.__generatedUrl = url = qx.util.Uri.appendParamsToUrl(url, query);
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
    /**
     * Returns the generated URL for the current / last request
     *
     * @internal
     * @return {String} The current generated URL for the request
     */
    getGeneratedUrl : function(){

      return this.__generatedUrl;
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
      this.__id = "qx" + (new Date().valueOf()) + ("" + Math.random()).substring(2, 5);
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
qxWeb.define("qx.module.Blocker", {
  statics : {
    /**
     * Attaches a blocker div (and additionally a blocker Iframe for IE) to the
     * given element.
     *
     * @param item {Element|Document} The element to be overlaid with the blocker
     * @param color {String} The color for the blocker element (any CSS color value)
     * @param opacity {Number} The CSS opacity value for the blocker
     * @param zIndex {Number} The zIndex value for the blocker
     */
    __attachBlocker : function(item, color, opacity, zIndex){

      var win = qxWeb.getWindow(item);
      var isDocument = qxWeb.isDocument(item);
      if(!item.__blocker){

        item.__blocker = {
          div : qxWeb.create("<div/>")
        };
        if((qxWeb.env.get("engine.name") == "mshtml")){

          item.__blocker.iframe = qx.module.Blocker.__getIframeElement(win);
        };
      };
      qx.module.Blocker.__styleBlocker(item, color, opacity, zIndex, isDocument);
      item.__blocker.div.appendTo(win.document.body);
      if(item.__blocker.iframe){

        item.__blocker.iframe.appendTo(win.document.body);
      };
      if(isDocument){

        qxWeb(win).on("resize", qx.module.Blocker.__onWindowResize);
      };
    },
    /**
     * Styles the blocker element(s)
     *
     * @param item {Element|Document} The element to be overlaid with the blocker
     * @param color {String} The color for the blocker element (any CSS color value)
     * @param opacity {Number} The CSS opacity value for the blocker
     * @param zIndex {Number} The zIndex value for the blocker
     * @param isDocument {Boolean} Whether the item is a document node
     */
    __styleBlocker : function(item, color, opacity, zIndex, isDocument){

      var qItem = qxWeb(item);
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
     * @return {Element} Iframe blocker
     */
    __getIframeElement : function(win){

      var iframe = qxWeb.create('<iframe></iframe>');
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
      qxWeb(win.document.__blocker.div).setStyles(size);
      if(win.document.__blocker.iframe){

        qxWeb(win.document.__blocker.iframe).setStyles(size);
      };
    },
    /**
     * Removes the given item's blocker element(s) from the DOM
     *
     * @param item {Element} Blocked element
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
      if(qxWeb.isDocument(item)){

        qxWeb(qxWeb.getWindow(item)).off("resize", qx.module.Blocker.__onWindowResize);
      };
    },
    /**
     * Adds an overlay to all items in the collection that intercepts mouse
     * events.
     *
     * @attach {qxWeb}
     * @param color {String ? transparent} The color for the blocker element (any CSS color value)
     * @param opacity {Float ? 0} The CSS opacity value for the blocker
     * @param zIndex {Number ? 10000} The zIndex value for the blocker
     * @return {qxWeb} The collection for chaining
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
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining
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

    qxWeb.$attach({
      "block" : statics.block,
      "unblock" : statics.unblock
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
/* ************************************************************************

#require(qx.module.Css)
#require(qx.module.Event)

************************************************************************ */
/**
 * Cross browser animation layer. It uses feature detection to check if CSS
 * animations are available and ready to use. If not, a JavaScript-based
 * fallback will be used.
 */
qx.Bootstrap.define("qx.module.Animation", {
  events : {
    /** Fired when an animation starts. */
    "animationStart" : undefined,
    /** Fired when an animation has ended one iteration. */
    "animationIteration" : undefined,
    /** Fired when an animation has ended. */
    "animationEnd" : undefined
  },
  statics : {
    /**
     * Returns the stored animation handles. The handles are only
     * available while an animation is running.
     *
     * @internal
     * @return {Array} An array of animation handles.
     */
    getAnimationHandles : function(){

      var animationHandles = [];
      for(var i = 0;i < this.length;i++){

        animationHandles[i] = this[i].$$animation;
      };
      return animationHandles;
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
     *   "delay": 2000
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
     * *delay* is the time in milliseconds the animation should wait before start.
     *
     * @attach {qxWeb}
     * @param desc {Map} The animation's description.
     * @param duration {Number?} The duration in milliseconds of the animation,
     *   which will override the duration given in the description.
     * @return {qxWeb} The collection for chaining.
     */
    animate : function(desc, duration){

      qx.module.Animation._animate.bind(this)(desc, duration, false);
      return this;
    },
    /**
     * Starts an animation in reversed order. For further details, take a look at
     * the {@link #animate} method.
     * @attach {qxWeb}
     * @param desc {Map} The animation's description.
     * @param duration {Number?} The duration in milliseconds of the animation,
     *   which will override the duration given in the description.
     * @return {qxWeb} The collection for chaining.
     */
    animateReverse : function(desc, duration){

      qx.module.Animation._animate.bind(this)(desc, duration, true);
      return this;
    },
    /**
     * Animation execute either regular or reversed direction.
     * @param desc {Map} The animation's description.
     * @param duration {Number?} The duration in milliseconds of the animation,
     *   which will override the duration given in the description.
     * @param reverse {Boolean} <code>true</code>, if the animation should be reversed
     */
    _animate : function(desc, duration, reverse){

      for(var i = 0;i < this.length;i++){

        var el = this[i];
        // stop all running animations
        if(el.$$animation){

          el.$$animation.stop();
        };
        if(reverse){

          var handle = qx.bom.element.Animation.animateReverse(el, desc, duration);
        } else {

          var handle = qx.bom.element.Animation.animate(el, desc, duration);
        };
        var self = this;
        // only register for the first element
        if(i == 0){

          handle.on("start", function(){

            self.emit("animationStart");
          }, handle);
          handle.on("iteration", function(){

            self.emit("animationIteration");
          }, handle);
        };
        handle.on("end", function(){

          for(var i = 0;i < self.length;i++){

            if(self[i].$$animation){

              return;
            };
          };
          self.emit("animationEnd");
        }, el);
      };
    },
    /**
     * Manipulates the play state of the animation.
     * This can be used to continue an animation when paused.
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining.
     */
    play : function(){

      for(var i = 0;i < this.length;i++){

        var handle = this[i].$$animation;
        if(handle){

          handle.play();
        };
      };
      return this;
    },
    /**
     * Manipulates the play state of the animation.
     * This can be used to pause an animation when running.
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining.
     */
    pause : function(){

      for(var i = 0;i < this.length;i++){

        var handle = this[i].$$animation;
        if(handle){

          handle.pause();
        };
      };
      return this;
    },
    /**
     * Stops a running animation.
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining.
     */
    stop : function(){

      for(var i = 0;i < this.length;i++){

        var handle = this[i].$$animation;
        if(handle){

          handle.stop();
        };
      };
      return this;
    },
    /**
     * Returns whether an animation is running or not.
     * @attach {qxWeb}
     * @return {Boolean} <code>true</code>, if an animation is running.
     */
    isPlaying : function(){

      for(var i = 0;i < this.length;i++){

        var handle = this[i].$$animation;
        if(handle && handle.isPlaying()){

          return true;
        };
      };
      return false;
    },
    /**
     * Returns whether an animation has ended or not.
     * @attach {qxWeb}
     * @return {Boolean} <code>true</code>, if an animation has ended.
     */
    isEnded : function(){

      for(var i = 0;i < this.length;i++){

        var handle = this[i].$$animation;
        if(handle && !handle.isEnded()){

          return false;
        };
      };
      return true;
    },
    /**
     * Fades in all elements in the collection.
     * @attach {qxWeb}
     * @param duration {Number?} The duration in milliseconds.
     * @return {qxWeb} The collection for chaining.
     */
    fadeIn : function(duration){

      // remove 'display: none' style
      this.setStyle("display", "");
      return this.animate(qx.module.Animation._fadeIn, duration);
    },
    /**
     * Fades out all elements in the collection.
     * @attach {qxWeb}
     * @param duration {Number?} The duration in milliseconds.
     * @return {qxWeb} The collection for chaining.
     */
    fadeOut : function(duration){

      return this.animate(qx.module.Animation._fadeOut, duration);
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "animate" : statics.animate,
      "animateReverse" : statics.animateReverse,
      "fadeIn" : statics.fadeIn,
      "fadeOut" : statics.fadeOut,
      "play" : statics.play,
      "pause" : statics.pause,
      "stop" : statics.stop,
      "isEnded" : statics.isEnded,
      "isPlaying" : statics.isPlaying,
      "getAnimationHandles" : statics.getAnimationHandles
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
     *   "delay" : 2000
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
     * *delay* is the time in milliseconds the animation should wait before start.
     *
     * @param el {Element} The element to animate.
     * @param desc {Map} The animations description.
     * @param duration {Integer?} The duration in milliseconds of the animation
     *   which will override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} AnimationHandle instance to control
     *   the animation.
     */
    animate : function(el, desc, duration){

      var onlyCssKeys = qx.bom.element.Animation.__hasOnlyCssKeys(el, desc.keyFrames);
      if(qx.core.Environment.get("css.animation") && onlyCssKeys){

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

      var onlyCssKeys = qx.bom.element.Animation.__hasOnlyCssKeys(el, desc.keyFrames);
      if(qx.core.Environment.get("css.animation") && onlyCssKeys){

        return qx.bom.element.AnimationCss.animateReverse(el, desc, duration);
      } else {

        return qx.bom.element.AnimationJs.animateReverse(el, desc, duration);
      };
    },
    /**
     * Detection helper which detects if only CSS keys are in
     * the animations key frames.
     * @param el {Element} The element to check for the styles.
     * @param keyFrames {Map} The keyFrames of the animation.
     * @return {Boolean} <code>true</code> if only css properties are included.
     */
    __hasOnlyCssKeys : function(el, keyFrames){

      var keys = [];
      for(var nr in keyFrames){

        var frame = keyFrames[nr];
        for(var key in frame){

          if(keys.indexOf(key) == -1){

            keys.push(key);
          };
        };
      };
      var transformKeys = ["scale", "rotate", "skew", "translate"];
      for(var i = 0;i < keys.length;i++){

        var key = qx.lang.String.camelCase(keys[i]);
        if(!(key in el.style)){

          // check for transform keys
          if(transformKeys.indexOf(keys[i]) != -1){

            continue;
          };
          return false;
        };
      };
      return true;
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
/* ************************************************************************
#require(qx.bom.Stylesheet)
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
     *  <li><code>start-event</code> The name of the start event</li>
     *  <li><code>iternation-event</code> The name of the iternation event</li>
     *  <li><code>end-event</code> The name of the end event</li>
     *  <li><code>fill-mode</code> The fill-mode style</li>
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
          "start-event" : qx.bom.client.CssAnimation.getAnimationStart(),
          "iteration-event" : qx.bom.client.CssAnimation.getAnimationIteration(),
          "end-event" : qx.bom.client.CssAnimation.getAnimationEnd(),
          "fill-mode" : qx.bom.client.CssAnimation.getFillMode(),
          "keyframes" : qx.bom.client.CssAnimation.getKeyFrames()
        };
      };
      return null;
    },
    /**
     * Checks for the 'animation-fill-mode' CSS style.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getFillMode : function(){

      return qx.bom.Style.getPropertyName("AnimationFillMode");
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
     * Checks for the event name of animation start.
     * @internal
     * @return {String} The name of the event.
     */
    getAnimationStart : function(){

      var mapping = {
        "msAnimation" : "MSAnimationStart",
        "WebkitAnimation" : "webkitAnimationStart",
        "MozAnimation" : "animationstart",
        "OAnimation" : "oAnimationStart",
        "animation" : "animationstart"
      };
      return mapping[this.getName()];
    },
    /**
     * Checks for the event name of animation end.
     * @internal
     * @return {String} The name of the event.
     */
    getAnimationIteration : function(){

      var mapping = {
        "msAnimation" : "MSAnimationIteration",
        "WebkitAnimation" : "webkitAnimationIteration",
        "MozAnimation" : "animationiteration",
        "OAnimation" : "oAnimationIteration",
        "animation" : "animationiteration"
      };
      return mapping[this.getName()];
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

        var key = "@" + qx.bom.Style.getCssName(prefixes[i]) + "-keyframes";
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
    },
    /**
     * Checks for the requestAnimationFrame method and return the prefixed name.
     * @internal
     * @return {String|null} A string the method name or null, if the method
     *   is not supported.
     */
    getRequestAnimationFrame : function(){

      var choices = ["requestAnimationFrame", "msRequestAnimationFrame", "webkitRequestAnimationFrame", "mozRequestAnimationFrame", "oRequestAnimationFrame"];
      for(var i = 0;i < choices.length;i++){

        if(window[choices[i]] != undefined){

          return choices[i];
        };
      };
      return null;
    }
  },
  defer : function(statics){

    qx.core.Environment.add("css.animation", statics.getSupport);
    qx.core.Environment.add("css.animation.requestframe", statics.getRequestAnimationFrame);
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
        var style = name + " " + duration + "ms " + desc.repeat + " " + desc.timing + " " + (desc.delay ? desc.delay + "ms " : "") + (desc.alternate ? "alternate" : "");
        qx.bom.Event.addNativeListener(el, this.__cssAnimationKeys["start-event"], this.__onAnimationStart);
        qx.bom.Event.addNativeListener(el, this.__cssAnimationKeys["iteration-event"], this.__onAnimationIteration);
        qx.bom.Event.addNativeListener(el, this.__cssAnimationKeys["end-event"], this.__onAnimationEnd);
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
     * Handler for the animation start.
     * @param e {Event} The native event from the browser.
     */
    __onAnimationStart : function(e){

      e.target.$$animation.emit("start", e.target);
    },
    /**
     * Handler for the animation iteration.
     * @param e {Event} The native event from the browser.
     */
    __onAnimationIteration : function(e){

      // It could happen that an animation end event is fired before an
      // animation iteration appears [BUG #6928]
      if(e.target != null && e.target.$$animation != null){

        e.target.$$animation.emit("iteration", e.target);
      };
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
     * @return {String} The generated name of the keyframes rule.
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
    /** Fired when the animation started via {@link qx.bom.element.Animation}. */
    "start" : "Element",
    /**
     * Fired when the animation started via {@link qx.bom.element.Animation} has
     * ended.
     */
    "end" : "Element",
    /** Fired on every iteration of the animation. */
    "iteration" : "Element"
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
     * Accessor of the paused state.
     * @return {Boolean} <code>true</code>, if the animations is paused.
     */
    isPaused : function(){

      return this.el.style[this.__playState] == "paused";
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
     * You need to create start a new Animation if you want to restart the animation.
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

      if(this.el && qx.core.Environment.get("css.animation") && !this.jsAnimation){

        this.el.style[this.__playState] = "";
        this.el.style[qx.core.Environment.get("css.animation").name] = "";
        this.el.$$animation.__playing = false;
        this.el.$$animation.__ended = true;
      } else if(this.jsAnimation){

        this.stopped = true;
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
#use(qx.bom.element.AnimationJs#play)

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

        return el.$$animation;
      };
      desc = qx.lang.Object.clone(desc, true);
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
      handle.jsAnimation = true;
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
      var delay = desc.delay || 0;
      var self = this;
      handle.delayId = window.setTimeout(function(){

        handle.delayId = null;
        self.play(handle);
      }, delay);
      return handle;
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

            if(name in el.style){

              // get the computed style if possible
              if(window.getComputedStyle){

                frame[name] = getComputedStyle(el, null)[name];
              } else {

                frame[name] = el.style[name];
              };
            } else {

              frame[name] = el[name];
            };
            // if its a unit we know, set 0 as fallback
            if(frame[name] === "" && this.__units.indexOf(units[name]) != -1){

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
              stepValue[j] = parseInt(value0[j] - range * qx.bom.AnimationFrame.calculateTiming(timing, i / steps), 10);
            };
            delta[i][name] = qx.util.ColorUtil.rgbToHexString(stepValue);
          } else if(!isNaN(parseInt(nItem, 10))){

            var unit = nItem.substring((parseInt(nItem, 10) + "").length, nItem.length);
            var range = parseFloat(nItem) - parseFloat(last[name]);
            delta[i][name] = (parseFloat(last[name]) + range * qx.bom.AnimationFrame.calculateTiming(timing, i / steps)) + unit;
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

      handle.emit("start", handle.el);
      var id = window.setInterval(function(){

        handle.repeatSteps--;
        var values = handle.delta[handle.i % handle.steps];
        // save the init values
        if(handle.i === 0){

          for(var name in values){

            if(handle.initValues[name] === undefined){

              // animate element property
              if(handle.el[name] !== undefined){

                handle.initValues[name] = handle.el[name];
              } else if(qx.bom.element.Style){

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

          handle.emit("iteration", handle.el);
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
      return handle;
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
      // clear the delay if the animation has not been started
      if(handle.delayId){

        window.clearTimeout(handle.delayId);
      };
      // check if animation is already stopped
      if(el == undefined){

        return handle;
      };
      // if we should keep a frame
      var keep = desc.keep;
      if(keep != undefined && !handle.stopped){

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
      return handle;
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
     * Central method to apply css styles and element properties.
     * @param el {Element} The DOM element to apply the styles.
     * @param styles {Map} A map containing styles and values.
     */
    __applyStyles : function(el, styles){

      for(var key in styles){

        // ignore undefined values (might be a bad detection)
        if(styles[key] === undefined){

          continue;
        };
        // apply element property value - only if a CSS property
        // is *not* available
        if(typeof el.style[key] === "undefined" && key in el){

          el[key] = styles[key];
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

      var keys = Object.keys(keyFrames);
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
     * @throws {Error} if the string could not be parsed
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
     * @throws {Error} if the string could not be parsed
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
     * @throws {Error} if the string could not be parsed
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
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/* ************************************************************************

#ignore(performance)
#ignore(performance.timing)

************************************************************************* */
/**
 * This is a cross browser wrapper for requestAnimationFrame. For further
 * information about the feature, take a look at spec:
 * http://www.w3.org/TR/animation-timing/
 *
 * This class offers two ways of using this feature. First, the plain
 * API the spec describes.
 *
 * Here is a sample usage:
 * <pre class='javascript'>var start = +(new Date());
 * var clb = function(time) {
 *   if (time >= start + duration) {
 *     // ... do some last tasks
 *   } else {
 *     var timePassed = time - start;
 *     // ... calculate the current step and apply it
 *     qx.bom.AnimationFrame.request(clb, this);
 *   }
 * };
 * qx.bom.AnimationFrame.request(clb, this);
 * </pre>
 *
 * Another way of using it is to use it as an instance emitting events.
 *
 * Here is a sample usage of that API:
 * <pre class='javascript'>var frame = new qx.bom.AnimationFrame();
 * frame.on("end", function() {
 *   // ... do some last tasks
 * }, this);
 * frame.on("frame", function(timePassed) {
 *   // ... calculate the current step and apply it
 * }, this);
 * frame.startSequence(duration);
 * </pre>
 */
qx.Bootstrap.define("qx.bom.AnimationFrame", {
  extend : qx.event.Emitter,
  events : {
    /** Fired as soon as the animation has ended. */
    "end" : undefined,
    /** Fired on every frame having the passed time as value. */
    "frame" : "Number"
  },
  members : {
    /**
     * Method used to start a series of animation frames. The series will end as
     * soon as the given duration is over.
     *
     * @param duration {Number} The duration the sequence should take.
     */
    startSequence : function(duration){

      var start = +(new Date());
      var clb = function(){

        var time = +(new Date());
        // final call
        if(time >= start + duration){

          this.emit("end");
          this.id = null;
        } else {

          var timePassed = time - start;
          this.emit("frame", timePassed);
          this.id = qx.bom.AnimationFrame.request(clb, this);
        };
      };
      this.id = qx.bom.AnimationFrame.request(clb, this);
    }
  },
  statics : {
    /**
     * The default time in ms the timeout fallback implementation uses.
     */
    TIMEOUT : 30,
    /**
     * Calculation of the predefined timing functions. Approximation of the real
     * bezier curves has ben used for easier calculation. This is good and close
     * enough for the predefined functions like <code>ease</code> or
     * <code>linear</code>.
     *
     * @param func {String} The defined timing function. One of the following values:
     *   <code>"ease-in"</code>, <code>"ease-out"</code>, <code>"linear"</code>,
     *   <code>"ease-in-out"</code>, <code>"ease"</code>.
     * @param x {Integer} The percent value of the function.
     * @return {Integer} The calculated value
     */
    calculateTiming : function(func, x){

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
      // A 6th grade polynomial has been used as approximation of the original
      // bezier curves  described in the transition spec
      // http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
      // (the same is used for animations as well)
      var y = 0;
      for(var i = 0;i < a.length;i++){

        y += a[i] * Math.pow(x, i);
      };
      return y;
    },
    /**
     * Request for an animation frame. If the native <code>requestAnimationFrame</code>
     * method is supported, it will be used. Otherwise, we use timeouts with a
     * 30ms delay.
     * @param callback {Function} The callback function which will get the current
     *   time as argument.
     * @param context {var} The context of the callback.
     * @return {Number} The id of the request.
     */
    request : function(callback, context){

      var req = qx.core.Environment.get("css.animation.requestframe");
      var clb = function(){

        var time = +(new Date());
        callback.call(context, time);
      };
      if(req){

        return window[req](clb);
      } else {

        // make sure to use an indirection because setTimeout passes a
        // number as first argument as well
        return window.setTimeout(function(){

          clb();
        }, qx.bom.AnimationFrame.TIMEOUT);
      };
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
     * Christian Hagendorn (chris_schmidt)

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
     *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
     *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
     *   </ul>
     * @return {Integer} The computed start position of the object.
     * @abstract
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
      return target.start + offsets.start;case "align-center":
      return target.start + parseInt((target.end - target.start - size) / 2, 10) + offsets.start;case "align-end":
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
     * Christian Hagendorn (chris_schmidt)

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
     *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
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
     * Christian Hagendorn (chris_schmidt)

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
     *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
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
     * Christian Hagendorn (chris_schmidt)

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
     *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
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
qxWeb.define("qx.module.Placement", {
  statics : {
    /**
     * Moves the first element in the collection, aligning it with the given
     * target.
     *
     * @attach{qxWeb}
     * @param target {Element} Placement target
     * @param position {String} Alignment of the object with the target, any of
     * <code>"top-left"</code>, <code>"top-center"</code>, <code>"top-right"</code>,
     * <code>"bottom-left"</code>, <code>"bottom-center"</code>, <code>"bottom-right"</code>,
     * <code>"left-top"</code>, <code>"left-middle"</code>, <code>"left-bottom"</code>,
     * <code>"right-top"</code>, <code>"right-middle"</code>, <code>"right-bottom"</code>
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
     * @return {qxWeb} The collection for chaining
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
      var target = qxWeb(target).getOffset();
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
     * @param target {qxWeb} Collection containing the placement target
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

    qxWeb.$attach({
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
     * @type {Array}
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

    qxWeb.$registerEventHook(statics.TYPES, statics.register, statics.unregister);
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
    __isTapGesture : null,
    __onMove : null,
    __beginScalingDistance : null,
    __beginRotation : null,
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
      if(qx.core.Environment.get("event.mspointer")){

        Event.addNativeListener(this.__target, "MSPointerDown", this.__onTouchEventWrapper);
        Event.addNativeListener(this.__target, "MSPointerMove", this.__onTouchEventWrapper);
        Event.addNativeListener(this.__target, "MSPointerUp", this.__onTouchEventWrapper);
        Event.addNativeListener(this.__target, "MSPointerCancel", this.__onTouchEventWrapper);
      };
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
      if(qx.core.Environment.get("event.mspointer")){

        Event.removeNativeListener(this.__target, "MSPointerDown", this.__onTouchEventWrapper);
        Event.removeNativeListener(this.__target, "MSPointerMove", this.__onTouchEventWrapper);
        Event.removeNativeListener(this.__target, "MSPointerUp", this.__onTouchEventWrapper);
        Event.removeNativeListener(this.__target, "MSPointerCancel", this.__onTouchEventWrapper);
      };
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
     * Calculates the scaling distance between two touches.
     * @param touch0 {Event} The touch event from the browser.
     * @param touch1 {Event} The touch event from the browser.
     * @return {Number} the calculated distance.
     */
    _getScalingDistance : function(touch0, touch1){

      return (Math.sqrt(Math.pow(touch0.pageX - touch1.pageX, 2) + Math.pow(touch0.pageY - touch1.pageY, 2)));
    },
    /**
     * Calculates the rotation between two touches.
     * @param touch0 {Event} The touch event from the browser.
     * @param touch1 {Event} The touch event from the browser.
     * @return {Number} the calculated rotation.
     */
    _getRotationAngle : function(touch0, touch1){

      var x = touch0.pageX - touch1.pageX;
      var y = touch0.pageY - touch1.pageY;
      return (Math.atan2(y, x) * 180 / Math.PI);
    },
    /**
     * Called by an event handler.
     *
     * @param domEvent {Event} DOM event
     * @param type {String ? null} type of the event
     */
    _commonTouchEventHandler : function(domEvent, type){

      var type = type || domEvent.type;
      if(qx.core.Environment.get("event.mspointer")){

        domEvent.changedTouches = [domEvent];
        domEvent.targetTouches = [domEvent];
        domEvent.touches = [domEvent];
        if(type == "MSPointerDown"){

          type = "touchstart";
        } else if(type == "MSPointerUp"){

          type = "touchend";
        } else if(type == "MSPointerMove"){

          if(this.__onMove == true){

            type = "touchmove";
          };
        } else if(type == "MSPointerCancel"){

          type = "touchcancel";
        };;;
      };
      if(type == "touchstart"){

        this.__originalTarget = this._getTarget(domEvent);
        this.__isTapGesture = true;
        if(domEvent.touches && domEvent.touches.length > 1){

          this.__beginScalingDistance = this._getScalingDistance(domEvent.touches[0], domEvent.touches[1]);
          this.__beginRotation = this._getRotationAngle(domEvent.touches[0], domEvent.touches[1]);
        };
      };
      if(type == "touchmove"){

        // Polyfill for scale
        if(typeof domEvent.scale == "undefined" && domEvent.changedTouches.length > 1){

          var currentScalingDistance = this._getScalingDistance(domEvent.changedTouches[0], domEvent.changedTouches[1]);
          domEvent.scale = currentScalingDistance / this.__beginScalingDistance;
        };
        // Polyfill for rotation
        if(typeof domEvent.rotation == "undefined" && domEvent.changedTouches.length > 1){

          var currentRotation = this._getRotationAngle(domEvent.changedTouches[0], domEvent.changedTouches[1]);
          domEvent.rotation = currentRotation - this.__beginRotation;
        };
        if(this.__isTapGesture){

          this.__isTapGesture = this._isBelowTapMaxDistance(domEvent.changedTouches[0]);
        };
      };
      this._fireEvent(domEvent, type);
      this.__checkAndFireGesture(domEvent, type);
    },
    /**
     * Checks if the distance between the x/y coordinates of "touchstart" and "touchmove" event
     * exceeds TAP_MAX_DISTANCE and returns the result.
     *
     * @param touch {Event} The "touchmove" event from the browser.
     * @return {Boolean} true if distance is below TAP_MAX_DISTANCE.
     */
    _isBelowTapMaxDistance : function(touch){

      var deltaCoordinates = {
        x : touch.screenX - this.__startPageX,
        y : touch.screenY - this.__startPageY
      };
      var clazz = qx.event.handler.TouchCore;
      return (Math.abs(deltaCoordinates.x) <= clazz.TAP_MAX_DISTANCE && Math.abs(deltaCoordinates.y) <= clazz.TAP_MAX_DISTANCE);
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
      if(qx.core.Environment.get("engine.name") == "webkit"){

        if(target && target.nodeType == 3){

          target = target.parentNode;
        };
      } else if(qx.core.Environment.get("event.mspointer")){

        // Fix for IE10 and pointer-events:none
        var targetForIE = this.__evaluateTarget(domEvent);
        if(targetForIE){

          target = targetForIE;
        };
      };
      return target;
    },
    /**
     * This method fixes "pointer-events:none" for Internet Explorer 10.
     * Checks which elements are placed to position x/y and traverses the array
     * till one element has no "pointer-events:none" inside its style attribute.
     * @param domEvent {Event} DOM event
     * @return {Element | null} Event target
     */
    __evaluateTarget : function(domEvent){

      if(domEvent && domEvent.touches){

        var clientX = domEvent.touches[0].clientX;
        var clientY = domEvent.touches[0].clientY;
      };
      // Retrieve an array with elements on point X/Y.
      var hitTargets = document.msElementsFromPoint(clientX, clientY);
      if(hitTargets){

        // Traverse this array for the elements which has no pointer-events:none inside.
        for(var i = 0;i < hitTargets.length;i++){

          var currentTarget = hitTargets[i];
          var pointerEvents = qx.bom.element.Style.get(currentTarget, "pointer-events", 3);
          if(pointerEvents != "none"){

            return currentTarget;
          };
        };
      };
      return null;
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
      this.__onMove = true;
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

      this.__onMove = false;
      if(this.__isSingleTouchGesture){

        var touch = domEvent.changedTouches[0];
        var deltaCoordinates = {
          x : touch.screenX - this.__startPageX,
          y : touch.screenY - this.__startPageY
        };
        var eventType;
        if(this.__originalTarget == target && this.__isTapGesture){

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
      this.__originalTarget = this.__target = this.__emitter = this.__beginScalingDistance = this.__beginRotation = null;
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
     */
    TYPES : ["orientationchange"],
    /**
     * List of qx.module.event.Orientation methods to be attached to native
     * event objects
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

    qxWeb.$registerEventNormalization(statics.TYPES, statics.normalize);
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

#require(qx.module.Attribute)
#require(qx.module.Css)
#require(qx.module.Environment)
#require(qx.module.Event)
#require(qx.module.Manipulating)
#require(qx.module.Polyfill)
#require(qx.module.Traversing)

************************************************************************ */
/**
 * Placeholder class which simply defines and includes the core of qxWeb.
 * The core modules are:
 *
 * * {@link qx.module.Attribute}
 * * {@link qx.module.Css}
 * * {@link qx.module.Environment}
 * * {@link qx.module.Event}
 * * {@link qx.module.Manipulating}
 * * {@link qx.module.Polyfill}
 * * {@link qx.module.Traversing}
 */
qx.Bootstrap.define("qx.module.Core", {
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
     */
    TYPES : ["keydown", "keypress", "keyup"],
    /**
     * List qx.module.event.Keyboard methods to be attached to native mouse event
     * objects
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

      if(this.type == "keypress" && (qxWeb.env.get("engine.name") != "gecko" || this.charCode !== 0)){

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

          element.__inputFix = qxWeb(element).on("keyup", qx.module.event.Keyboard._inputFix);
        };
      };
    },
    /**
     * Removes the IE9 input event fix
     * @param element {Element} target element
     */
    unregisterInputFix : function(element){

      if(element.__inputFix && !qxWeb(element).hasListener("input")){

        qxWeb(element).off("keyup", qx.module.event.Keyboard._inputFix);
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
      var newValue = qxWeb(target).getValue();
      if(!target.__oldInputValue || target.__oldInputValue !== newValue){

        target.__oldInputValue = newValue;
        ev.type = ev._type = "input";
        target.__emitter.emit("input", ev);
      };
    }
  },
  defer : function(statics){

    qxWeb.$registerEventNormalization(qx.module.event.Keyboard.TYPES, statics.normalize);
    if(qxWeb.env.get("engine.name") === "mshtml" && qxWeb.env.get("browser.documentmode") === 9){

      qxWeb.$registerEventHook("input", statics.registerInputFix, statics.unregisterInputFix);
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
     * @attachStatic {qxWeb, cookie.get}
     * @param key {String} The key for the saved string value.
     * @return {String|null} Returns the saved string value if the cookie
     *    contains a value for the key, otherwise <code>null</code>
     * @signature function(key)
     */
    get : qx.bom.Cookie.get,
    /**
     * Sets the string value of a cookie.
     *
     * @attachStatic {qxWeb, cookie.set}
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
     * @attachStatic {qxWeb, cookie.del}
     * @param key {String} The key for the string value.
     * @param path {String?null} Path value.
     * @param domain {String?null} Domain value.
     * @signature function(key, path, domain)
     */
    del : qx.bom.Cookie.del
  },
  defer : function(statics){

    qxWeb.$attachStatic({
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