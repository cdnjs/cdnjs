(function () {
  function isOldIE() {
    var version = getInternetExplorerVersion();
    if (version === -1) {
      return false;
    }

    return version < 9;
  }

  /**
   * Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
   * Source: https://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
   * @returns {number} the version of Internet Explorer or a -1 (indicating the use of another browser).
   */
  function getInternetExplorerVersion() {
    var rv = -1;

    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      var res = re.exec(ua);
      if (res !== null) {
        rv = parseFloat(res[1]);
      }
    }

    return rv;
  }

  function isDom(obj) {
    return (typeof obj === "object") &&
      (obj.nodeType === 1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument === "object");
  }

  if (isOldIE()) {
    if (Object.videoVastMonkeyPatched) {
      return;
    }

    (function () {

      var original = Object.defineProperty;

      Object.defineProperty = function (obj, prop, description) {
        if (isDom(obj)) {
          return original(obj, prop, description);
        }
        if (description.get || description.set) {
          throw new Error('browser doesn\'t support getters and setters');
        }
        obj[prop] = description.value;
      };

    })();

    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
      var buffer = [];
      var key;

      // Non-enumerable properties cannot be discovered but can be checked for by name.
      // Define those used internally by JS to allow an incomplete solution
      var commonProps = ['length', "name", "arguments", "caller", "prototype", "observe", "unobserve"];

      if (typeof object === 'undefined' || object === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      object = Object(object);

      // Enumerable properties only
      for (key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          buffer.push(key);
        }
      }

      // Check for and add the common non-enumerable properties
      for (var i = 0, s = commonProps.length; i < s; i++) {
        if (commonProps[i] in object) buffer.push(commonProps[i]);
      }

      return buffer;
    };

    (function () {
      var original = Object.getOwnPropertyDescriptor;
      Object.getOwnPropertyDescriptor = function(object, property) {
        if (isDom(object)) {
          return original(object, property);
        }else {
          return {
            writable: true,
            configurable: true,
            enumerable: false,
            value: object[property]
          };
        }
      };
    })();


    Object.videoVastMonkeyPatched = true;
  }


  if (typeof Object.create != 'function') {
    // Production steps of ECMA-262, Edition 5, 15.2.3.5
    // Reference: http://es5.github.io/#x15.2.3.5
    Object.create = (function () {
      // To save on memory, use a shared constructor
      function Temp() {
      }

      // make a safe reference to Object.prototype.hasOwnProperty
      var hasOwn = Object.prototype.hasOwnProperty;

      return function (O) {
        // 1. If Type(O) is not Object or Null throw a TypeError exception.
        if (typeof O != 'object') {
          throw new TypeError('Object prototype may only be an Object or null');
        }

        // 2. Let obj be the result of creating a new object as if by the
        //    expression new Object() where Object is the standard built-in
        //    constructor with that name
        // 3. Set the [[Prototype]] internal property of obj to O.
        Temp.prototype = O;
        var obj = new Temp();
        Temp.prototype = null; // Let's not keep a stray reference to O...

        // 4. If the argument Properties is present and not undefined, add
        //    own properties to obj as if by calling the standard built-in
        //    function Object.defineProperties with arguments obj and
        //    Properties.
        if (arguments.length > 1) {
          // Object.defineProperties does ToObject on its first argument.
          var Properties = Object(arguments[1]);
          for (var prop in Properties) {
            if (hasOwn.call(Properties, prop)) {
              obj[prop] = Properties[prop];
            }
          }
        }

        // 5. Return obj
        return obj;
      };
    })();
  }
  /* jshint ignore:start */
  if ( typeof Object.getPrototypeOf !== "function" ) {
    if ( typeof "test".__proto__ === "object" ) {
      Object.getPrototypeOf = function(object){
        return object.__proto__;
      };
    } else {
      Object.getPrototypeOf = function(object){
        // May break if the constructor has been tampered with
        return object.constructor.prototype;
      };
    }
  }
  /* jshint ignore:end */
})();

