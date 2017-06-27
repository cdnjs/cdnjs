/*! JSON v3.1 | http://bestiejs.github.com/json3 | Copyright 2012, Kit Cambridge | http://kit.mit-license.org */
;(function (root, Module) {
  if (typeof define == "function" && define.amd) {
    // Export JSON 3 for asynchronous module loaders.
    define("json", ["exports"], Module);
  } else {
    // Export for CommonJS environments, web browsers, and JavaScript engines.
    Module(typeof exports == "object" && exports || this.JSON || (this.JSON = {}));
  }
})(this, function (exports) {
  // Convenience aliases.
  var getClass = {}.toString, hasOwnProperty = {}.hasOwnProperty, forEach, stringifySupported, parseSupported;

  // Feature tests to determine whether the native `JSON.stringify` and `parse`
  // implementations are spec-compliant. Based on work by Ken Snyder.
  stringifySupported = typeof exports.stringify == "function";
  parseSupported = typeof exports.parse == "function";
  (function () {
    var serialized = '{"result":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}', toJSON, original, value;
    // Test `JSON.stringify`.
    if (stringifySupported) {
      // An object with a custom `toJSON` method.
      toJSON = function toJSON() {
        return 1;
      };
      toJSON.toJSON = toJSON;
      try {
        switch (false) {
          // Firefox 3.1b1 and 2 serialize string, number, and boolean
          // primitives as object literals.
          case exports.stringify(0) === "0":
          // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
          // literals.
          case exports.stringify(new (0).constructor()) === "0":
          case exports.stringify(new "".constructor()) == '""':
          // FF 3.1b1, 2 will throw an error if the value is `null`,
          // `undefined`, or does not define a canonical JSON representation
          // (this applies to objects with `toJSON` properties as well, *unless*
          // they are nested within an object or array).
          case exports.stringify(getClass) === void 0:
          // IE 8 serializes `undefined` as `"undefined"`.
          case exports.stringify(void 0) === void 0:
          // Safari 5.1.2 will throw an error if the `value` argument is
          // omitted, but correctly returns `undefined` for the above test.
          case exports.stringify() === void 0:
          // FF 3.1b1, 2 will throw an error if the value does not define a
          // canonical JSON representation. This applies to objects with
          // `toJSON` properties, unless they are nested inside object or array
          // literals. YUI 3.0.0b1 ignores custom `toJSON` methods.
          case exports.stringify(toJSON) === "1":
          case exports.stringify([toJSON]) == "[1]":
          // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
          // `"[null]"`.
          case exports.stringify([void 0]) == "[null]":
          // YUI 3.0.0b1 fails to serialize `null` literals.
          case exports.stringify(null) == "null":
          // FF 3.1b1, 2 will halt serialization if an array contains a function.
          // `[1, true, getClass, 1]` serializes as "[1,true,],". These versions
          // of Firefox also allow trailing commas in JSON objects and arrays.
          case exports.stringify([void 0, getClass, null]) == "[null,null,null]":
          // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
          // where character escape codes are required (e.g., `\b` => `\u0008`).
          case exports.stringify({ "result": [toJSON, true, false, null, "\0\b\n\f\r\t"] }) == serialized:
          // FF 3.1b1, b2, and Prototype <= 1.7 ignore the `filter` and `width`
          // arguments.
          case exports.stringify(null, toJSON) === "1":
          case exports.stringify([1, 2], null, 1) == "[\n 1,\n 2\n]":
          // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
          // serialize extended years. Safari < 2.0.2 restricts date time values
          // to the range `[(-2 ** 31), (2 ** 31) - 1]`, so the serialization
          // tests will fail in case JSON 3 is loaded twice.
          case (toJSON = new Date(-8.64e15)).getUTCFullYear() != -271821 || exports.stringify(toJSON) == '"-271821-04-20T00:00:00.000Z"':
          // The milliseconds are optional in ES 5, but required in 5.1.
          case (toJSON = new Date(8.64e15)).getUTCFullYear() != 275760 || exports.stringify(toJSON) == '"+275760-09-13T00:00:00.000Z"':
            stringifySupported = false;
        }
      } catch (exception) {
        stringifySupported = false;
      }
    }
    // Test `JSON.parse`.
    if (parseSupported) {
      try {
        // FF 3.1b1, 2 will throw an exception if a bare literal is provided.
        // Conforming implementations should also coerce the initial argument to
        // a string prior to parsing.
        if (exports.parse("0") === 0 && !exports.parse(false)) {
          // Simple parsing test.
          value = exports.parse(serialized);
          if ((parseSupported = value.result.length == 5 && value.result[0] == 1)) {
            try {
              // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
              parseSupported = !exports.parse('"\t"');
            } catch (exception) {}
            if (parseSupported) {
              try {
                // Firefox 4.0 and 4.0.1 allow leading `+` signs, leading decimal
                // points, trailing decimal points, and certain octal literals.
                parseSupported = exports.parse("+1") != 1 && exports.parse("01") != 1;
              } catch (exception) {}
            }
          }
        }
      } catch (exception) {
        parseSupported = false;
      }
    }
  })();

  // **hasOwnProperty** determines if a property is a direct property of the
  // given object. Delegates to the native `Object#hasOwnProperty` method if
  // available.
  if (typeof hasOwnProperty != "function") {
    hasOwnProperty = (function () {
      // Capture a reference to the top-level `Object` constructor.
      var hasOwnProperty, members = {}, constructor = members.constructor;
      if ((members.__proto__ = null, members.__proto__ = {
        // The internal *proto* property cannot be set multiple times in recent
        // versions of Mozilla Firefox and SeaMonkey.
        "toString": 1
      }, members).toString != getClass) {
        // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
        // supports the mutable *proto* property.
        hasOwnProperty = function hasOwnProperty(property) {
          // Capture and break the object's prototype chain (see section 8.6.2
          // of the ES 5.1 spec). The parenthesized expression prevents an
          // unsafe transformation by the Closure Compiler.
          var original = this.__proto__, result = property in (this.__proto__ = null, this);
          // Restore the original prototype chain.
          this.__proto__ = original;
          return result;
        };
      } else {
        // Use the `constructor` property to simulate `Object#hasOwnProperty` in
        // other environments.
        hasOwnProperty = function hasOwnProperty(property) {
          var parent = (this.constructor || constructor).prototype;
          return property in this && !(property in parent && this[property] === parent[property]);
        };
      }
      members = null;
      return hasOwnProperty;
    })();
  }

  // **forEach** normalizes the `for...in` iteration algorithm across
  // environments. Each enumerated key is yielded to a `callback` function.
  forEach = (function () {
    var members, property, forEach, size = 0;

    // Tests for bugs in the current environment's `for...in` algorithm. The
    // `valueOf` property inherits the non-enumerable flag from
    // `Object.prototype` in JScript <= 5.8 and Gecko <= 1.0.
    function Properties() {
      this.valueOf = 0;
    }
    Properties.prototype.valueOf = 0;

    // Iterate over a new instance of the `Properties` class.
    members = new Properties();
    for (property in members) {
      // Ignore all other properties inherited from `Object.prototype`.
      if (hasOwnProperty.call(members, property)) {
        size += 1;
      }
    }
    members = null;

    // Normalize the iteration algorithm.
    if (!size) {
      // A list of non-enumerable properties inherited from `Object.prototype`.
      members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
      // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
      // properties.
      forEach = function forEach(object, callback) {
        var isFunction = getClass.call(object) == "[object Function]", property, length;
        for (property in object) {
          // Gecko <= 1.0 enumerates the `prototype` property of functions under
          // certain conditions; IE does not.
          if (!(isFunction && property == "prototype") && hasOwnProperty.call(object, property)) {
            callback(property);
          }
        }
        // Manually invoke the callback for each non-enumerable property.
        for (length = members.length; length--;) {
          property = members[length];
          if (hasOwnProperty.call(object, property)) {
            callback(property);
          }
        }
      };
    } else if (size == 2) {
      // Safari <= 2.0.4 enumerates shadowed properties twice.
      forEach = function forEach(object, callback) {
        // Create a set of iterated properties.
        var members = {}, isFunction = getClass.call(object) == "[object Function]", property;
        for (property in object) {
          // Store each property name to prevent double enumeration. The
          // `prototype` property of functions is not enumerated due to cross-
          // environment inconsistencies.
          if (!(isFunction && property == "prototype") && !hasOwnProperty.call(members, property) && (members[property] = 1) && hasOwnProperty.call(object, property)) {
            callback(property);
          }
        }
      };
    } else {
      // No bugs detected; use the standard `for...in` algorithm.
      forEach = function forEach(object, callback) {
        var isFunction = getClass.call(object) == "[object Function]", property, isConstructor;
        for (property in object) {
          if (!(isFunction && property == "prototype") && hasOwnProperty.call(object, property) && !(isConstructor = property === "constructor")) {
            callback(property);
          }
        }
        // Manually invoke the callback for the `constructor` property due to
        // cross-environment inconsistencies.
        if (isConstructor || hasOwnProperty.call(object, "constructor")) {
          callback("constructor");
        }
      };
    }
    return forEach;
  })();

  // Serializes a JavaScript `value` as a JSON string. The optional `filter`
  // argument may be either a function that alters how certain values in objects
  // and arrays are serialized, or an array of strings and numbers that filters
  // object properties for serialization. The optional `width` argument may be
  // either a string or number that specifies the indentation level of the
  // output.
  if (!stringifySupported) {
    exports.stringify = (function () {
      // Maps control characters to their escaped equivalents.
      var Escapes = {
        "\\": "\\\\",
        '"': '\\"',
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t"
      };

      // Converts `value` into a zero-padded string such that its length is at
      // least equal to `width`. The `width` must be <= 6.
      function toPaddedString(width, value) {
        // The `|| 0` expression is necessary to work around a bug in Opera 7
        // where `0 == -0`, but `String(-0) == "-0"`.
        value = "000000" + (value || 0);
        // Opera 7 doesn't support passing negative arguments to `String#slice`.
        return value.slice(value.length - width);
      }

      // Double-quotes a string, replacing all ASCII control characters with their
      // escaped equivalents. This is an implementation of the `Quote(value)`
      // operation defined in ES 5.1 section 15.12.3.
      function quote(value) {
        var result = '"', index = 0, symbol;
        for (; symbol = value.charAt(index); index += 1) {
          // Escape the reverse solidus, double quote, backspace, form feed, line
          // feed, carriage return, and tab characters.
          result += '\\"\b\f\n\r\t'.indexOf(symbol) > -1 ? Escapes[symbol] :
            // If the character is a control character, append its Unicode escape
            // sequence; otherwise, append the character as-is.
            symbol < " " ? "\\u00" + toPaddedString(2, symbol.charCodeAt(0).toString(16)) : symbol;
        }
        return result + '"';
      }

      // Recursively serializes an object. Implements the `Str(key, holder)`,
      // `JO(value)`, and `JA(value)` operations.
      function serialize(property, object, callback, properties, whitespace, indentation, stack) {
        var value = object[property], className, year, results, element, index, length, prefix, any;
        if (typeof value == "object" && value) {
          if (getClass.call(value) == "[object Date]" && !hasOwnProperty.call(value, "toJSON")) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15 for
              // the ISO 8601 date time string format.
              year = value.getUTCFullYear();
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                "-" + toPaddedString(2, value.getUTCMonth() + 1) + "-" + toPaddedString(2, value.getUTCDate()) +
                // Months, dates, hours, minutes, and seconds should have two
                // digits; milliseconds should have three.
                "T" + toPaddedString(2, value.getUTCHours()) + ":" + toPaddedString(2, value.getUTCMinutes()) + ":" + toPaddedString(2, value.getUTCSeconds()) +
                // Milliseconds are optional in ES 5.0, but required in 5.1.
                "." + toPaddedString(3, value.getUTCMilliseconds()) + "Z";
            } else {
              value = null;
            }
          } else if (typeof value.toJSON == "function") {
            value = value.toJSON(property);
          }
        }
        if (callback) {
          // If a replacement function was provided, call it to obtain the value
          // for serialization.
          value = callback.call(object, property, value);
        }
        if (value === null) {
          return "null";
        }
        className = getClass.call(value);
        switch (className) {
          case "[object Boolean]":
            // Booleans are represented literally.
            return "" + value;
          case "[object Number]":
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          case "[object String]":
            // Strings are double-quoted and escaped.
            return quote(value);
        }
        // Recursively serialize objects and arrays.
        if (typeof value == "object") {
          // Check for cyclic structures. This is a linear search; performance
          // is inversely proportional to the number of unique nested objects.
          for (length = stack.length; length--;) {
            if (stack[length] == value) {
              throw TypeError("Cyclic structures cannot be serialized.");
            }
          }
          // Add the object to the stack of traversed objects.
          stack.push(value);
          results = [];
          // Save the current indentation level and indent one additional level.
          prefix = indentation;
          indentation += whitespace;
          if (className == "[object Array]") {
            // Recursively serialize array elements.
            for (index = 0, length = value.length; index < length; any || (any = true), index++) {
              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
              results.push(element === void 0 ? "null" : element);
            }
            return any ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
          } else {
            // Recursively serialize object members. Members are selected from
            // either a user-specified list of property names, or the object
            // itself.
            forEach(properties || value, function (property) {
              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
              if (element !== void 0) {
                // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                // is not the empty string, let `member` {quote(property) + ":"}
                // be the concatenation of `member` and the `space` character."
                // The "`space` character" refers to the literal space
                // character, not the `space` {width} argument provided to
                // `JSON.stringify`.
                results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
              }
              any || (any = true);
            });
            return any ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
          }
          // Remove the object from the traversed object stack.
          stack.pop();
        }
      }

      // `JSON.stringify`. See section 15.12.3 of the ES 5.1 spec.
      function stringify(value, filter, width) {
        var whitespace = "", callback, properties, length, element;
        if (typeof filter == "function" || typeof filter == "object" && filter) {
          if (getClass.call(filter) == "[object Function]") {
            callback = filter;
          } else if (getClass.call(filter) == "[object Array]") {
            // Convert the property names array into a makeshift set.
            properties = {};
            for (length = filter.length; length--;) {
              element = filter[length];
              if (element && (getClass.call(element) == "[object String]" || getClass.call(element) == "[object Number]")) {
                properties[element] = 1;
              }
            }
          }
        }
        if (width != null && width !== "") {
          if (getClass.call(width) == "[object Number]") {
            // Convert the `width` to an integer and create a string containing
            // `width` number of space characters.
            if ((width -= width % 1) > 0) {
              for (whitespace = "", width > 10 && (width = 10); whitespace.length < width;) {
                whitespace += " ";
              }
            }
          } else if (getClass.call(width) == "[object String]") {
            whitespace = width.length <= 10 ? width : width.slice(0, 10);
          }
        }
        // Opera 7 ignores `""` and `"\0"` object properties, so the `$`
        // character is used as a placeholder value instead.
        return serialize("$", { "$": value }, callback, properties, whitespace, "", []);
      }

      return stringify;
    })();
  }

  // Parses a JSON source string.
  if (!parseSupported) {
    exports.parse = (function () {
      // Maps escaped JSON control characters to their revived equivalents.
      var Unescapes = {
        "\\": "\\",
        '"': '"',
        "/": "/",
        "b": "\b",
        "t": "\t",
        "n": "\n",
        "f": "\f",
        "r": "\r"
      }, fromCharCode = "".constructor.fromCharCode;

      // Internal: creates a new JSON parser instance. The `source` string is parsed
      // according to the grammar specified in section 15.12.1 of the ES 5.1 spec.
      function Parser(source) {
        this.source = source;
        this.index = 0;
      }

      // Returns the next token, or `"$"` if the parser has reached the end of the
      // source string. A token may be a string, number, `null` literal, or Boolean
      // literal.
      Parser.prototype.lex = lex;
      function lex() {
        for (var source = this.source, length = this.source.length, symbol, value, begin, position, sign; this.index < length;) {
          symbol = source.charAt(this.index);
          switch (symbol) {
            // Skip whitespace tokens, including tabs, carriage returns, line
            // feeds, and space characters.
            case "\t":
            case "\r":
            case "\n":
            case " ":
              this.index += 1;
              break;
            // Parse a punctuator token at the current position.
            case "{":
            case "}":
            case "[":
            case "]":
            case ":":
            case ",":
              this.index += 1;
              return symbol;
            // Parse a JSON string token at the current position. String tokens are
            // prefixed with the special `@` character to distinguish them from
            // punctuators.
            case '"':
              value = "@";
              // Advance to the first character.
              this.index += 1;
              while (this.index < length) {
                symbol = source.charAt(this.index);
                if (symbol < " ") {
                  // Unescaped ASCII control characters are not permitted.
                  throw SyntaxError("Unescaped control character in string.");
                } else if (symbol == "\\") {
                  // Parse escaped JSON control characters, `"`, `\`, `/`, and
                  // Unicode escape sequences.
                  this.index += 1;
                  symbol = source.charAt(this.index);
                  if ('\\"/btnfr'.indexOf(symbol) > -1) {
                    // Revive escaped control characters.
                    value += Unescapes[symbol];
                    this.index += 1;
                  } else if (symbol == "u") {
                    // Advance to the first character of the escape sequence.
                    begin = this.index += 1;
                    // Validate the Unicode escape sequence.
                    for (position = this.index + 4; this.index < position; this.index += 1) {
                      symbol = source.charAt(this.index);
                      // A valid sequence comprises four hexdigits that form a
                      // single hexadecimal value.
                      if (!(symbol >= "0" && symbol <= "9" || symbol >= "a" && symbol <= "f" || symbol >= "A" && symbol <= "F")) {
                        throw SyntaxError("Invalid Unicode escape sequence in string.");
                      }
                    }
                    // Revive the escaped character.
                    value += fromCharCode("0x" + source.slice(begin, this.index));
                  } else {
                    throw SyntaxError("Invalid escape sequence in string.");
                  }
                } else {
                  if (symbol == '"') {
                    // An unescaped double-quote character marks the end of the
                    // string.
                    break;
                  }
                  // Append the original character as-is.
                  value += symbol;
                  this.index += 1;
                }
              }
              if (source.charAt(this.index) == '"') {
                this.index += 1;
                // Return the revived string.
                return value;
              }
              throw SyntaxError("Unterminated string.");
            // Parse numbers and literals.
            default:
              begin = this.index;
              // Advance the scanner's position past the sign, if one is specified.
              if (symbol == "-") {
                sign = true;
                symbol = source.charAt(this.index += 1);
              }
              // Parse an integer or floating-point value.
              if (symbol >= "0" && symbol <= "9") {
                // Leading zeroes are interpreted as octal literals.
                if (symbol == "0" && (symbol = source.charAt(this.index + 1), symbol >= "0" && symbol <= "9")) {
                  throw SyntaxError("Illegal octal literal.");
                }
                sign = false;
                // Parse the integer component.
                for (; this.index < length && (symbol = source.charAt(this.index), symbol >= "0" && symbol <= "9"); this.index += 1);
                // Floats cannot contain a leading decimal point; however, this
                // case is already accounted for by the parser.
                if (source.charAt(this.index) == ".") {
                  position = this.index += 1;
                  // Parse the decimal component.
                  for (; position < length && (symbol = source.charAt(position), symbol >= "0" && symbol <= "9"); position += 1);
                  if (position == this.index) {
                    throw SyntaxError("Illegal trailing decimal.");
                  }
                  this.index = position;
                }
                // Parse exponents.
                symbol = source.charAt(this.index);
                if (symbol == "e" || symbol == "E") {
                  // Skip past the sign following the exponent, if one is specified.
                  symbol = source.charAt(this.index += 1);
                  if (symbol == "+" || symbol == "-") {
                    this.index += 1;
                  }
                  // Parse the exponential component.
                  for (position = this.index; position < length && (symbol = source.charAt(position), symbol >= "0" && symbol <= "9"); position += 1);
                  if (position == this.index) {
                    throw SyntaxError("Illegal empty exponent.");
                  }
                  this.index = position;
                }
                // Coerce the parsed value to a JavaScript number.
                return +source.slice(begin, this.index);
              }
              // A negative sign may only precede numbers.
              if (sign) {
                throw SyntaxError("Unexpected `-`.");
              }
              // `true`, `false`, and `null` literals.
              if (symbol == "t" && source.slice(this.index, this.index + 4) == "true") {
                this.index += 4;
                return true;
              } else if (symbol == "f" && source.slice(this.index, this.index + 5) == "false") {
                this.index += 5;
                return false;
              } else if (symbol == "n" && source.slice(this.index, this.index + 4) == "null") {
                this.index += 4;
                return null;
              }
              throw SyntaxError("Unrecognized token.");
          }
        }
        // Return the sentinel `$` character if the parser has reached the end of
        // the source string.
        return "$";
      }

      // Parses a JSON token.
      Parser.prototype.get = get;
      function get(value) {
        var results, any, key;
        if (value == "$") {
          throw SyntaxError("Unexpected end-of-file.");
        }
        if (typeof value == "string") {
          if (value.charAt(0) == "@") {
            // Remove the sentinel `@` character.
            return value.slice(1);
          }
          // Parse object and array literals.
          switch (value) {
            // Parses a JSON array, returning a new JavaScript array.
            case "[":
              results = [];
              for (;; any || (any = true)) {
                value = this.lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token should
                // be a comma separating the previous element from the next.
                if (any) {
                  if (value == ",") {
                    value = this.lex();
                    if (value == "]") {
                      throw SyntaxError("Unexpected trailing `,` in array literal.");
                    }
                  } else {
                    throw SyntaxError("A comma (`,`) must separate the previous array element from the next.");
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  throw SyntaxError("Unexpected `,` in array literal.");
                }
                results.push(this.get(value));
              }
              return results;
            // Parses a JSON object, returning a new JavaScript object.
            case "{":
              results = {};
              for (;; any || (any = true)) {
                value = this.lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token should
                // be a comma separating the previous member from the next.
                if (any) {
                  if (value == ",") {
                    value = this.lex();
                    if (value == "}") {
                      throw SyntaxError("Unexpected trailing `,`. in object literal.");
                    }
                  } else {
                    throw SyntaxError("A comma (`,`) must separate the previous object member from the next.");
                  }
                }
                // Leading commas are not permitted.
                if (value == ",") {
                  throw SyntaxError("Unexpected `,` in object literal.");
                }
                if (typeof value != "string" || value.charAt(0) != "@") {
                  throw SyntaxError("Object property names must be double-quoted strings.");
                }
                if (this.lex() != ":") {
                  throw SyntaxError("A single colon (`:`) must separate each object property name from the value.");
                }
                results[value.slice(1)] = this.get(this.lex());
              }
              return results;
          }
          throw SyntaxError("Expected `[` or `{`.");
        }
        return value;
      }

      // Recursively traverses a parsed JSON object, invoking the callback function
      // for each value. This is an implementation of the `Walk(holder, name)`
      // operation defined in ES 5.1 section 15.12.2.
      function walk(source, property, callback) {
        var value = source[property], length, element;
        if (typeof value == "object" && value) {
          if (getClass.call(value) == "[object Array]") {
            for (length = value.length; length--;) {
              element = walk(value, length, callback);
              if (element === void 0) {
                value.splice(length, 1);
              } else {
                value[length] = element;
              }
            }
          } else {
            forEach(value, function (property) {
              var element = walk(value, property, callback);
              if (element === void 0) {
                delete value[property];
              } else {
                value[property] = element;
              }
            });
          }
        }
        return callback.call(source, property, value);
      }

      // `JSON.parse`. See section 15.12.2.
      function parse(source, callback) {
        var parser = new Parser("" + source), value = parser.get(parser.lex());
        // If a JSON string contains multiple tokens, it is invalid.
        if (parser.lex() != "$") {
          throw SyntaxError("Expected end-of-file.");
        }
        return callback && getClass.call(callback) == "[object Function]" ? walk({ "$": value }, "$", callback) : value;
      }

      return parse;
    })();
  }

  return exports;
});