(function(exports) {
  "use strict";

  function isArray(obj) {
    if (obj !== null) {
      return toString.call(obj) === "[object Array]";
    } else {
      return false;
    }
  }

  function isObject(obj) {
    if (obj !== null) {
      return toString.call(obj) === "[object Object]";
    } else {
      return false;
    }
  }

  function strictDeepEqual(first, second) {
    // Check the scalar case first.
    if (first === second) {
      return true;
    }

    // Check if they are the same type.
    var firstType = toString.call(first);
    if (firstType !== toString.call(second)) {
      return false;
    }
    // We know that first and second have the same type so we can just check the
    // first type from now on.
    if (isArray(first) === true) {
      // Short circuit if they're not the same length;
      if (first.length !== second.length) {
        return false;
      }
      for (var i = 0; i < first.length; i++) {
        if (strictDeepEqual(first[i], second[i]) === false) {
          return false;
        }
      }
      return true;
    }
    if (isObject(first) === true) {
      // An object is equal if it has the same key/value pairs.
      var keysSeen = {};
      for (var key in first) {
        if (hasOwnProperty.call(first, key)) {
          if (strictDeepEqual(first[key], second[key]) === false) {
            return false;
          }
          keysSeen[key] = true;
        }
      }
      // Now check that there aren't any keys in second that weren't
      // in first.
      for (var key2 in second) {
        if (hasOwnProperty.call(second, key2)) {
          if (keysSeen[key2] !== true) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  function isFalse(obj) {
    // From the spec:
    // A false value corresponds to the following values:
    // Empty list
    // Empty object
    // Empty string
    // False boolean
    // null value

    // First check the scalar values.
    if (obj === "" || obj === false || obj === null) {
        return true;
    } else if (isArray(obj) && obj.length === 0) {
        // Check for an empty array.
        return true;
    } else if (isObject(obj)) {
        // Check for an empty object.
        var key;
        for (key in obj) {
            // If there are any keys, then
            // the object is not empty so the object
            // is not false.
            return false;
        }
        return true;
    } else {
        return false;
    }
  }

  function objValues(obj) {
    var keys = Object.keys(obj);
    var values = [];
    for (var i = 0; i < keys.length; i++) {
      values.push(obj[keys[i]]);
    }
    return values;
  }

  function merge(a, b) {
      var merged = {};
      for (var key in a) {
          merged[key] = a[key];
      }
      for (var key2 in b) {
          merged[key2] = b[key2];
      }
      return merged;
  }


  // The "[", "<", ">" tokens
  // are not in basicToken because
  // there are two token variants
  // ("[?", "<=", ">=").  This is specially handled
  // below.

  var basicTokens = {
    ".": "Dot",
    "*": "Star",
    ",": "Comma",
    ":": "Colon",
    "{": "Lbrace",
    "}": "Rbrace",
    "]": "Rbracket",
    "(": "Lparen",
    ")": "Rparen",
    "@": "Current",
    "&": "Expref"
  };

  var identifierStart = {
      a: true, b: true, c: true, d: true, e: true, f: true, g: true, h: true,
      i: true, j: true, k: true, l: true, m: true, n: true, o: true, p: true,
      q: true, r: true, s: true, t: true, u: true, v: true, w: true, x: true,
      y: true, z: true, A: true, B: true, C: true, D: true, E: true, F: true,
      G: true, H: true, I: true, J: true, K: true, L: true, M: true, N: true,
      O: true, P: true, Q: true, R: true, S: true, T: true, U: true, V: true,
      W: true, X: true, Y: true, Z: true, _: true
  };

  var operatorStartToken = {
      "<": true,
      ">": true,
      "=": true,
      "!": true
  };

  var numbers = {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      "-": true
  };

  var identifierTrailing = merge(identifierStart, numbers);

  var skipChars = {
      " ": true,
      "\t": true,
      "\n": true
  };


  function Lexer() {
  }
  Lexer.prototype = {
      tokenize: function(stream) {
          var tokens = [];
          this.current = 0;
          var start;
          var identifier;
          var token;
          while (this.current < stream.length) {
              if (identifierStart[stream[this.current]] !== undefined) {
                  start = this.current;
                  identifier = this.consumeUnquotedIdentifier(stream);
                  tokens.push({type: "UnquotedIdentifier",
                               value: identifier,
                               start: start});
              } else if (basicTokens[stream[this.current]] !== undefined) {
                  tokens.push({type: basicTokens[stream[this.current]],
                              value: stream[this.current],
                              start: this.current});
                  this.current++;
              } else if (numbers[stream[this.current]] !== undefined) {
                  token = this.consumeNumber(stream);
                  tokens.push(token);
              } else if (stream[this.current] === "[") {
                  // No need to increment this.current.  This happens
                  // in consumeLBracket
                  token = this.consumeLBracket(stream);
                  tokens.push(token);
              } else if (stream[this.current] === "\"") {
                  start = this.current;
                  identifier = this.consumeQuotedIdentifier(stream);
                  tokens.push({type: "QuotedIdentifier",
                               value: identifier,
                               start: start});
              } else if (stream[this.current] === "`") {
                  start = this.current;
                  var literal = this.consumeLiteral(stream);
                  tokens.push({type: "Literal",
                               value: literal,
                               start: start});
              } else if (operatorStartToken[stream[this.current]] !== undefined) {
                  tokens.push(this.consumeOperator(stream));
              } else if (skipChars[stream[this.current]] !== undefined) {
                  // Ignore whitespace.
                  this.current++;
              } else if (stream[this.current] === "|") {
                  start = this.current;
                  this.current++;
                  if (stream[this.current] === "|") {
                      this.current++;
                      tokens.push({type: "Or", value: "||", start: start});
                  } else {
                      tokens.push({type: "Pipe", value: "|", start: start});
                  }
              } else {
                  var error = new Error("Unknown character:" + stream[this.current]);
                  error.name = "LexerError";
                  throw error;
              }
          }
          return tokens;
      },

      consumeUnquotedIdentifier: function(stream) {
          var start = this.current;
          this.current++;
          while (identifierTrailing[stream[this.current]] !== undefined) {
              this.current++;
          }
          return stream.slice(start, this.current);
      },

      consumeQuotedIdentifier: function(stream) {
          var start = this.current;
          this.current++;
          var maxLength = stream.length;
          while (stream[this.current] !== "\"" && this.current < maxLength) {
              // You can escape a double quote and you can escape an escape.
              var current = this.current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "\"")) {
                  current += 2;
              } else {
                  current++;
              }
              this.current = current;
          }
          this.current++;
          return JSON.parse(stream.slice(start, this.current));
      },

      consumeNumber: function(stream) {
          var start = this.current;
          this.current++;
          var maxLength = stream.length;
          while (numbers[stream[this.current]] !== undefined && this.current < maxLength) {
              this.current++;
          }
          var value = parseInt(stream.slice(start, this.current));
          return {type: "Number", value: value, start: start};
      },

      consumeLBracket: function(stream) {
          var start = this.current;
          this.current++;
          if (stream[this.current] === "?") {
              this.current++;
              return {type: "Filter", value: "[?", start: start};
          } else if (stream[this.current] === "]") {
              this.current++;
              return {type: "Flatten", value: "[]", start: start};
          } else {
              return {type: "Lbracket", value: "[", start: start};
          }
      },

      consumeOperator: function(stream) {
          var start = this.current;
          var startingChar = stream[start];
          this.current++;
          if (startingChar === "!") {
              if (stream[this.current] === "=") {
                  this.current++;
                  return {type: "NE", value: "!=", start: start};
              }
          } else if (startingChar === "<") {
              if (stream[this.current] === "=") {
                  this.current++;
                  return {type: "LTE", value: "<=", start: start};
              } else {
                  return {type: "LT", value: "<", start: start};
              }
          } else if (startingChar === ">") {
              if (stream[this.current] === "=") {
                  this.current++;
                  return {type: "GTE", value: ">=", start: start};
              } else {
                  return {type: "GT", value: ">", start: start};
              }
          } else if (startingChar === "=") {
              if (stream[this.current] === "=") {
                  this.current++;
                  return {type: "EQ", value: "==", start: start};
              }
          }
      },

      consumeLiteral: function(stream) {
          this.current++;
          var start = this.current;
          var maxLength = stream.length;
          var literal;
          while(stream[this.current] !== "`" && this.current < maxLength) {
              // You can escape a literal char or you can escape the escape.
              var current = this.current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "`")) {
                  current += 2;
              } else {
                  current++;
              }
              this.current = current;
          }
          var literalString = stream.slice(start, this.current).trimLeft();
          literalString = literalString.replace("\\`", "`");
          if (this.looksLikeJSON(literalString)) {
              literal = JSON.parse(literalString);
          } else {
              // Try to JSON parse it as "<literal>"
              literal = JSON.parse("\"" + literalString + "\"");
          }
          // +1 gets us to the ending "`", +1 to move on to the next char.
          this.current++;
          return literal;
      },

      looksLikeJSON: function(literalString) {
          var startingChars = "[{\"";
          var jsonLiterals = ["true", "false", "null"];
          var numberLooking = "-0123456789";

          if (literalString === "") {
              return false;
          } else if (startingChars.indexOf(literalString[0]) >= 0) {
              return true;
          } else if (jsonLiterals.indexOf(literalString) >= 0) {
              return true;
          } else if (numberLooking.indexOf(literalString[0]) >= 0) {
              try {
                  JSON.parse(literalString);
                  return true;
              } catch (ex) {
                  return false;
              }
          } else {
              return false;
          }
      }
  };


  function Parser() {
      this.bindingPower = {
          "EOF": 0,
          "UnquotedIdentifier": 0,
          "QuotedIdentifier": 0,
          "Rbracket": 0,
          "Rparen": 0,
          "Comma": 0,
          "Rbrace": 0,
          "Number": 0,
          "Current": 0,
          "Expref": 0,
          "Pipe": 1,
          "EQ": 2,
          "GT": 2,
          "LT": 2,
          "GTE": 2,
          "LTE": 2,
          "NE": 2,
          "Or": 5,
          "Flatten": 6,
          "Star": 20,
          "Dot": 40,
          "Lbrace": 50,
          "Filter": 50,
          "Lbracket": 55,
          "Lparen": 60
      };
  }

  Parser.prototype = {
      parse: function(expression) {
          this.loadTokens(expression);
          this.index = 0;
          var ast = this.expression(0);
          if (this.lookahead(0) !== "EOF") {
              var t = this.lookaheadToken(0);
              var error = new Error(
                  "Unexpected token type: " + t.type + ", value: " + t.value);
              error.name = "ParserError";
              throw error;
          }
          return ast;
      },

      loadTokens: function(expression) {
          var lexer = new Lexer();
          var tokens = lexer.tokenize(expression);
          tokens.push({type: "EOF", value: "", start: expression.length});
          this.tokens = tokens;
      },

      expression: function(rbp) {
          var leftToken = this.lookaheadToken(0);
          this.advance();
          var name = "nud" + leftToken.type;
          var nudMethod = this[name] || this.errorToken;
          var left = nudMethod.call(this, leftToken);
          var currentToken = this.lookahead(0);
          while (rbp < this.bindingPower[currentToken]) {
              var ledMethod = this["led" + currentToken];
              if (ledMethod === undefined) {
                  this.errorToken(this.lookaheadToken(0));
              }
              this.advance();
              left = ledMethod.call(this, left);
              currentToken = this.lookahead(0);
          }
          return left;
      },

      lookahead: function(number) {
          return this.tokens[this.index + number].type;
      },

      lookaheadToken: function(number) {
          return this.tokens[this.index + number];
      },

      advance: function() {
          this.index++;
      },

      match: function(tokenType) {
          if (this.lookahead(0) === tokenType) {
              this.advance();
          } else {
              var t = this.lookaheadToken(0);
              var error = new Error("Expected " + tokenType + ", got: " + t.type);
              error.name = "ParserError";
              throw error;
          }
      },

      errorToken: function(token) {
          var error = new Error("Invalid token (" +
                                token.type + "): \"" +
                                token.value + "\"");
          error.name = "ParserError";
          throw error;
      },

      nudLiteral: function(token) {
          return {type: "Literal", value: token.value};
      },

      nudUnquotedIdentifier: function(token) {
          return {type: "Field", name: token.value};
      },

      nudExpref: function() {
        var expression = this.expression(this.bindingPower.Expref);
        return {type: "ExpressionReference", children: [expression]};
      },

      nudQuotedIdentifier: function(token) {
          var node = {type: "Field", name: token.value};
          if (this.lookahead(0) === "Lparen") {
              throw new Error("Quoted identifier not allowed for function names.");
          } else {
              return node;
          }
      },

      ledOr: function(left) {
        var right = this.expression(this.bindingPower.Or);
        return {type: "OrExpression", children: [left, right]};
      },

      ledPipe: function(left) {
          var right = this.expression(this.bindingPower.Pipe);
          return {type: "Pipe", children: [left, right]};
      },

      nudStar: function() {
          var left = {type: "Identity"};
          var right = null;
          if (this.lookahead(0) === "Rbracket") {
              // This can happen in a multiselect,
              // [a, b, *]
              right = {type: "Identity"};
          } else {
              right = this.parseProjectionRHS(this.bindingPower.Star);
          }
          return {type: "ValueProjection", children: [left, right]};
      },

      nudLbracket: function() {
          if (this.lookahead(0) === "Number" || this.lookahead(0) === "Colon") {
              return this.parseIndexExpression();
          } else if (this.lookahead(0) === "Star" &&
                     this.lookahead(1) === "Rbracket") {
              this.advance();
              this.advance();
              var right = this.parseProjectionRHS(this.bindingPower.Star);
              return {type: "Projection",
                      children: [{type: "Identity"}, right]};
          } else {
              return this.parseMultiselectList();
          }
      },

      parseIndexExpression: function() {
          if (this.lookahead(0) === "Colon" || this.lookahead(1) === "Colon") {
              return this.parseSliceExpression();
          } else {
              var node = {
                  type: "Index",
                  value: this.lookaheadToken(0).value};
              this.advance();
              this.match("Rbracket");
              return node;
          }
      },

      parseSliceExpression: function() {
          // [start:end:step] where each part is optional, as well as the last
          // colon.
          var parts = [null, null, null];
          var index = 0;
          var currentToken = this.lookahead(0);
          while (currentToken !== "Rbracket" && index < 3) {
              if (currentToken === "Colon") {
                  index++;
                  this.advance();
              } else if (currentToken === "Number") {
                  parts[index] = this.lookaheadToken(0).value;
                  this.advance();
              } else {
                  var t = this.lookahead(0);
                  var error = new Error("Syntax error, unexpected token: " +
                                        t.value + "(" + t.type + ")");
                  error.name = "Parsererror";
                  throw error;
              }
              currentToken = this.lookahead(0);
          }
          this.match("Rbracket");
          return {
              type: "Slice",
              children: parts
          };
      },

      nudLbrace: function() {
          return this.parseMultiselectHash();
      },

      ledDot: function(left) {
          var rbp = this.bindingPower.Dot;
          var right;
          if (this.lookahead(0) !== "Star") {
              right = this.parseDotRHS(rbp);
              return {type: "Subexpression", children: [left, right]};
          } else {
              // Creating a projection.
              this.advance();
              right = this.parseProjectionRHS(rbp);
              return {type: "ValueProjection", children: [left, right]};
          }
      },

      nudFilter: function() {
        return this.ledFilter({type: "Identity"});
      },

      ledFilter: function(left) {
        var condition = this.expression(0);
        var right;
        this.match("Rbracket");
        if (this.lookahead(0) === "Flatten") {
          right = {type: "Identity"};
        } else {
          right = this.parseProjectionRHS(this.bindingPower.Filter);
        }
        return {type: "FilterProjection", children: [left, right, condition]};
      },

      ledEQ: function(left) {
        return this.parseComparator(left, "EQ");
      },

      ledNE: function(left) {
        return this.parseComparator(left, "NE");
      },

      ledGT: function(left) {
        return this.parseComparator(left, "GT");
      },

      ledGTE: function(left) {
        return this.parseComparator(left, "GTE");
      },

      ledLT: function(left) {
        return this.parseComparator(left, "LT");
      },

      ledLTE: function(left) {
        return this.parseComparator(left, "LTE");
      },

      parseComparator: function(left, comparator) {
        var right = this.expression(this.bindingPower[comparator]);
        return {type: "Comparator", name: comparator, children: [left, right]};
      },

      ledLbracket: function(left) {
          var token = this.lookaheadToken(0);
          var right;
          if (token.type === "Number" || token.type === "Colon") {
              right = this.parseIndexExpression();
              return {type: "IndexExpression", children: [left, right]};
          } else {
              this.match("Star");
              this.match("Rbracket");
              right = this.parseProjectionRHS(this.bindingPower.Star);
              return {type: "Projection", children: [left, right]};
          }
      },

      nudFlatten: function() {
          var left = {type: "Flatten", children: [{type: "Identity"}]};
          var right = this.parseProjectionRHS(this.bindingPower.Flatten);
          return {type: "Projection", children: [left, right]};
      },

      ledFlatten: function(left) {
          var leftNode = {type: "Flatten", children: [left]};
          var rightNode = this.parseProjectionRHS(this.bindingPower.Flatten);
          return {type: "Projection", children: [leftNode, rightNode]};
      },

      ledLparen: function(left) {
        var name = left.name;
        var args = [];
        var expression, node;
        while (this.lookahead(0) !== "Rparen") {
          if (this.lookahead(0) === "Current") {
            expression = {type: "Current"};
            this.advance();
          } else {
            expression = this.expression(0);
          }
          if (this.lookahead(0) === "Comma") {
            this.match("Comma");
          }
          args.push(expression);
        }
        this.match("Rparen");
        node = {type: "Function", name: name, children: args};
        return node;
      },

      parseDotRHS: function(rbp) {
          var lookahead = this.lookahead(0);
          var exprTokens = ["UnquotedIdentifier", "QuotedIdentifier", "Star"];
          if (exprTokens.indexOf(lookahead) >= 0) {
              return this.expression(rbp);
          } else if (lookahead === "Lbracket") {
              this.match("Lbracket");
              return this.parseMultiselectList();
          } else if (lookahead === "Lbrace") {
              this.match("Lbrace");
              return this.parseMultiselectHash();
          }
      },

      parseProjectionRHS: function(rbp) {
          var right;
          if (this.bindingPower[this.lookahead(0)] < 10) {
              right = {type: "Identity"};
          } else if (this.lookahead(0) === "Lbracket") {
              right = this.expression(rbp);
          } else if (this.lookahead(0) === "Filter") {
              right = this.expression(rbp);
          } else if (this.lookahead(0) === "Dot") {
              this.match("Dot");
              right = this.parseDotRHS(rbp);
          } else {
              var t = this.lookaheadToken(0);
              var error = new Error("Sytanx error, unexpected token: " +
                                    t.value + "(" + t.type + ")");
              error.name = "ParserError";
              throw error;
          }
          return right;
      },

      parseMultiselectList: function() {
          var expressions = [];
          while (this.lookahead(0) !== "Rbracket") {
              var expression = this.expression(0);
              expressions.push(expression);
              if (this.lookahead(0) === "Comma") {
                  this.match("Comma");
                  if (this.lookahead(0) === "Rbracket") {
                    throw new Error("Unexpected token Rbracket");
                  }
              }
          }
          this.match("Rbracket");
          return {type: "MultiSelectList", children: expressions};
      },

      parseMultiselectHash: function() {
        var pairs = [];
        var identifierTypes = ["UnquotedIdentifier", "QuotedIdentifier"];
        var keyToken, keyName, value, node;
        for (;;) {
          keyToken = this.lookaheadToken(0);
          if (identifierTypes.indexOf(keyToken.type) < 0) {
            throw new Error("Expecting an identifier token, got: " +
                            keyToken.type);
          }
          keyName = keyToken.value;
          this.advance();
          this.match("Colon");
          value = this.expression(0);
          node = {type: "KeyValuePair", name: keyName, value: value};
          pairs.push(node);
          if (this.lookahead(0) === "Comma") {
            this.match("Comma");
          } else if (this.lookahead(0) === "Rbrace") {
            this.match("Rbrace");
            break;
          }
        }
        return {type: "MultiSelectHash", children: pairs};
      }
  };


  function TreeInterpreter(runtime) {
    this.runtime = runtime;
  }

  TreeInterpreter.prototype = {
      search: function(node, value) {
          return this.visit(node, value);
      },

      visit: function(node, value) {
          var visitMethod = this["visit" + node.type];
          if (visitMethod === undefined) {
              throw new Error("Unknown node type: " + node.type);
          }
          return visitMethod.call(this, node, value);
      },

      visitField: function(node, value) {
          if (value === null ) {
              return null;
          } else if (isObject(value)) {
              var field = value[node.name];
              if (field === undefined) {
                  return null;
              } else {
                  return field;
              }
          } else {
            return null;
          }
      },

      visitSubexpression: function(node, value) {
          var result = this.visit(node.children[0], value);
          for (var i = 1; i < node.children.length; i++) {
              result = this.visit(node.children[1], result);
              if (result === null) {
                  return null;
              }
          }
          return result;
      },

      visitIndexExpression: function(node, value) {
        var left = this.visit(node.children[0], value);
        var right = this.visit(node.children[1], left);
        return right;
      },

      visitIndex: function(node, value) {
        if (!isArray(value)) {
          return null;
        }
        var index = node.value;
        if (index < 0) {
          index = value.length + index;
        }
        var result = value[index];
        if (result === undefined) {
          result = null;
        }
        return result;
      },

      visitSlice: function(node, value) {
        if (!isArray(value)) {
          return null;
        }
        var sliceParams = node.children.slice(0);
        var computed = this.computeSliceParams(value.length, sliceParams);
        var start = computed[0];
        var stop = computed[1];
        var step = computed[2];
        var result = [];
        var i;
        if (step > 0) {
            for (i =  start;  i < stop; i += step) {
                result.push(value[i]);
            }
        } else {
            for (i = start; i  > stop;  i += step) {
                result.push(value[i]);
            }
        }
        return result;
      },

      computeSliceParams: function(arrayLength, sliceParams) {
        var start = sliceParams[0];
        var stop = sliceParams[1];
        var step = sliceParams[2];
        var computed = [null, null, null];
        if (step === null) {
          step  = 1;
        } else if (step === 0) {
          var error = new Error("Invalid slice, step cannot be 0");
          error.name = "RuntimeError";
          throw error;
        }
        var stepValueNegative = step < 0 ? true : false;

        if (start === null) {
            start = stepValueNegative ? arrayLength - 1 : 0;
        } else {
            start = this.capSliceRange(arrayLength, start, step);
        }

        if (stop === null) {
            stop = stepValueNegative ? -1 : arrayLength;
        } else {
            stop = this.capSliceRange(arrayLength, stop, step);
        }
        computed[0] = start;
        computed[1] = stop;
        computed[2] = step;
        return computed;
      },

      capSliceRange: function(arrayLength, actualValue, step) {
          if (actualValue < 0) {
              actualValue += arrayLength;
              if (actualValue < 0)  {
                  actualValue = step < 0 ? -1 : 0;
              }
          } else if (actualValue >= arrayLength) {
              actualValue = step < 0 ? arrayLength - 1 : arrayLength;
          }
          return actualValue;
      },

      visitProjection: function(node, value) {
        // Evaluate left child.
        var base = this.visit(node.children[0], value);
        if (!isArray(base)) {
          return null;
        }
        var collected = [];
        for (var i = 0; i < base.length; i++) {
          var current = this.visit(node.children[1], base[i]);
          if (current !== null) {
            collected.push(current);
          }
        }
        return collected;
      },

      visitValueProjection: function(node, value) {
        // Evaluate left child.
        var base = this.visit(node.children[0], value);
        if (!isObject(base)) {
          return null;
        }
        var collected = [];
        var values = objValues(base);
        for (var i = 0; i < values.length; i++) {
          var current = this.visit(node.children[1], values[i]);
          if (current !== null) {
            collected.push(current);
          }
        }
        return collected;
      },

      visitFilterProjection: function(node, value) {
        var base = this.visit(node.children[0], value);
        if (!isArray(base)) {
          return null;
        }
        var filtered = [];
        var finalResults = [];
        var matched, current;
        for (var i = 0; i < base.length; i++) {
          matched = this.visit(node.children[2], base[i]);
          if (matched === true) {
            filtered.push(base[i]);
          }
        }
        for (var j = 0; j < filtered.length; j++) {
          current = this.visit(node.children[1], filtered[j]);
          if (current !== null) {
            finalResults.push(current);
          }
        }
        return finalResults;
      },

      visitComparator: function(node, value) {
        var first = this.visit(node.children[0], value);
        var second = this.visit(node.children[1], value);
        var result;
        switch(node.name) {
          case "EQ":
            result = strictDeepEqual(first, second);
            break;
          case "NE":
            result = ! strictDeepEqual(first, second);
            break;
          case "GT":
            result = first > second;
            break;
          case "GTE":
            result = first >= second;
            break;
          case "LT":
            result = first < second;
            break;
          case "LTE":
            result = first <= second;
            break;
          default:
            throw new Error("Unknown comparator: " + node.name);
        }
        return result;
      },

      visitFlatten: function(node, value) {
        var original = this.visit(node.children[0], value);
        if (!isArray(original)) {
          return null;
        }
        var merged = [];
        for (var i = 0; i < original.length; i++) {
          var current = original[i];
          if (isArray(current)) {
            merged.push.apply(merged, current);
          } else {
            merged.push(current);
          }
        }
        return merged;
      },

      visitIdentity: function(node, value) {
        return value;
      },

      visitMultiSelectList: function(node, value) {
        if (value === null) {
          return null;
        }
        var collected = [];
        for (var i = 0; i < node.children.length; i++) {
            collected.push(this.visit(node.children[i], value));
        }
        return collected;
      },

      visitMultiSelectHash: function(node, value) {
        if (value === null) {
          return null;
        }
        var collected = {};
        var child;
        for (var i = 0; i < node.children.length; i++) {
          child = node.children[i];
          collected[child.name] = this.visit(child.value, value);
        }
        return collected;
      },

      visitOrExpression: function(node, value) {
        var matched = this.visit(node.children[0], value);
        if (isFalse(matched)) {
            matched = this.visit(node.children[1], value);
        }
        return matched;
      },

      visitLiteral: function(node) {
          return node.value;
      },

      visitPipe: function(node, value) {
        var left = this.visit(node.children[0], value);
        return this.visit(node.children[1], left);
      },

      visitCurrent: function(node, value) {
          return value;
      },

      visitFunction: function(node, value) {
        var resolvedArgs = [];
        for (var i = 0; i < node.children.length; i++) {
            resolvedArgs.push(this.visit(node.children[i], value));
        }
        return this.runtime.callFunction(node.name, resolvedArgs);
      },

      visitExpressionReference: function(node) {
        var refNode = node.children[0];
        // Tag the node with a specific attribute so the type
        // checker verify the type.
        refNode.jmespathType = "Expref";
        return refNode;
      }
  };

  function Runtime(interpreter) {
    this.interpreter = interpreter;
    this.functionTable = {
        // name: [function, <signature>]
        // The <signature> can be:
        //
        // {
        //   args: [[type1, type2], [type1, type2]],
        //   variadic: true|false
        // }
        //
        // Each arg in the arg list is a list of valid types
        // (if the function is overloaded and supports multiple
        // types.  If the type is "any" then no type checking
        // occurs on the argument.  Variadic is optional
        // and if not provided is assumed to be false.
        abs: {func: this.functionAbs, signature: [{types: ["number"]}]},
        avg: {func: this.functionAvg, signature: [{types: ["array-number"]}]},
        ceil: {func: this.functionCeil, signature: [{types: ["number"]}]},
        contains: {
            func: this.functionContains,
            signature: [{types: ["string", "array"]}, {types: ["any"]}]},
        "ends_with": {
            func: this.functionEndsWith,
            signature: [{types: ["string"]}, {types: ["string"]}]},
        floor: {func: this.functionFloor, signature: [{types: ["number"]}]},
        length: {
            func: this.functionLength,
            signature: [{types: ["string", "array", "object"]}]},
        max: {
            func: this.functionMax,
            signature: [{types: ["array-number", "array-string"]}]},
        "max_by": {
          func: this.functionMaxBy,
          signature: [{types: ["array"]}, {types: ["expref"]}]
        },
        sum: {func: this.functionSum, signature: [{types: ["array-number"]}]},
        "starts_with": {
            func: this.functionStartsWith,
            signature: [{types: ["string"]}, {types: ["string"]}]},
        min: {
            func: this.functionMin,
            signature: [{types: ["array-number", "array-string"]}]},
        "min_by": {
          func: this.functionMinBy,
          signature: [{types: ["array"]}, {types: ["expref"]}]
        },
        type: {func: this.functionType, signature: [{types: ["any"]}]},
        keys: {func: this.functionKeys, signature: [{types: ["object"]}]},
        values: {func: this.functionValues, signature: [{types: ["object"]}]},
        sort: {func: this.functionSort, signature: [{types: ["array-string", "array-number"]}]},
        "sort_by": {
          func: this.functionSortBy,
          signature: [{types: ["array"]}, {types: ["expref"]}]
        },
        join: {
            func: this.functionJoin,
            signature: [
                {types: ["string"]},
                {types: ["array-string"]}
            ]
        },
        reverse: {
            func: this.functionReverse,
            signature: [{types: ["string", "array"]}]},
        "to_string": {func: this.functionToString, signature: [{types: ["any"]}]},
        "to_number": {func: this.functionToNumber, signature: [{types: ["any"]}]},
        "not_null": {
            func: this.functionNotNull,
            signature: [{types: ["any"], variadic: true}]
        }
    };
  }

  Runtime.prototype = {
    callFunction: function(name, resolvedArgs) {
      var functionEntry = this.functionTable[name];
      if (functionEntry === undefined) {
          throw new Error("Unknown function: " + name + "()");
      }
      this.validateArgs(name, resolvedArgs, functionEntry.signature);
      return functionEntry.func.call(this, resolvedArgs);
    },

    validateArgs: function(name, args, signature) {
        // Validating the args requires validating
        // the correct arity and the correct type of each arg.
        // If the last argument is declared as variadic, then we need
        // a minimum number of args to be required.  Otherwise it has to
        // be an exact amount.
        var pluralized;
        if (signature[signature.length - 1].variadic) {
            if (args.length < signature.length) {
                pluralized = signature.length === 1 ? " argument" : " arguments";
                throw new Error("ArgumentError: " + name + "() " +
                                "takes at least" + signature.length + pluralized +
                                " but received " + args.length);
            }
        } else if (args.length !== signature.length) {
            pluralized = signature.length === 1 ? " argument" : " arguments";
            throw new Error("ArgumentError: " + name + "() " +
                            "takes " + signature.length + pluralized +
                            " but received " + args.length);
        }
        var currentSpec;
        var actualType;
        var typeMatched;
        for (var i = 0; i < signature.length; i++) {
            typeMatched = false;
            currentSpec = signature[i].types;
            actualType = this.getTypeName(args[i]);
            for (var j = 0; j < currentSpec.length; j++) {
                if (this.typeMatches(actualType, currentSpec[j], args[i])) {
                    typeMatched = true;
                    break;
                }
            }
            if (!typeMatched) {
                throw new Error("TypeError: " + name + "() " +
                                "expected argument " + (i + 1) +
                                " to be type " + currentSpec +
                                " but received type " + actualType +
                                " instead.");
            }
        }
    },

    typeMatches: function(actual, expected, argValue) {
        if (expected === "any") {
            return true;
        }
        if (expected.indexOf("array") === 0) {
            // The expected type can either just be array,
            // or it can require a specific subtype (array of numbers).
            //
            // The simplest case is if "array" with no subtype is specified.
            if (expected === "array") {
                return actual.indexOf("array") === 0;
            } else if (actual.indexOf("array") === 0) {
                // Otherwise we need to check subtypes.
                // I think this has potential to be improved.
                var subtype = expected.split("-")[1];
                for (var i = 0; i < argValue.length; i++) {
                    if (!this.typeMatches(
                            this.getTypeName(argValue[i]), subtype,
                                             argValue[i])) {
                        return false;
                    }
                }
                return true;
            }
        } else {
            return actual === expected;
        }
    },
    getTypeName: function(obj) {
        switch (toString.call(obj)) {
            case "[object String]":
              return "string";
            case "[object Number]":
              return "number";
            case "[object Array]":
              return "array";
            case "[object Boolean]":
              return "boolean";
            case "[object Null]":
              return "null";
            case "[object Object]":
              // Check if it's an expref.  If it has, it's been
              // tagged with a jmespathType attr of 'Expref';
              if (obj.jmespathType === "Expref") {
                return "expref";
              } else {
                return "object";
              }
        }
    },

    functionStartsWith: function(resolvedArgs) {
        return resolvedArgs[0].lastIndexOf(resolvedArgs[1]) === 0;
    },

    functionEndsWith: function(resolvedArgs) {
        var search = resolvedArgs[0];
        var suffix = resolvedArgs[1];
        return search.indexOf(suffix, search.length - suffix.length) !== -1;
    },

    functionReverse: function(resolvedArgs) {
        var typeName = this.getTypeName(resolvedArgs[0]);
        if (typeName === "string") {
          var originalStr = resolvedArgs[0];
          var reversedStr = "";
          for (var i = originalStr.length - 1; i >= 0; i--) {
              reversedStr += originalStr[i];
          }
          return reversedStr;
        } else {
          var reversedArray = resolvedArgs[0].slice(0);
          reversedArray.reverse();
          return reversedArray;
        }
    },

    functionAbs: function(resolvedArgs) {
      return Math.abs(resolvedArgs[0]);
    },

    functionCeil: function(resolvedArgs) {
        return Math.ceil(resolvedArgs[0]);
    },

    functionAvg: function(resolvedArgs) {
        var sum = 0;
        var inputArray = resolvedArgs[0];
        for (var i = 0; i < inputArray.length; i++) {
            sum += inputArray[i];
        }
        return sum / inputArray.length;
    },

    functionContains: function(resolvedArgs) {
        return resolvedArgs[0].indexOf(resolvedArgs[1]) >= 0;
    },

    functionFloor: function(resolvedArgs) {
        return Math.floor(resolvedArgs[0]);
    },

    functionLength: function(resolvedArgs) {
       if (!isObject(resolvedArgs[0])) {
         return resolvedArgs[0].length;
       } else {
         // As far as I can tell, there's no way to get the length
         // of an object without O(n) iteration through the object.
         return Object.keys(resolvedArgs[0]).length;
       }
    },

    functionMax: function(resolvedArgs) {
      if (resolvedArgs[0].length > 0) {
        var typeName = this.getTypeName(resolvedArgs[0][0]);
        if (typeName === "number") {
          return Math.max.apply(Math, resolvedArgs[0]);
        } else {
          var elements = resolvedArgs[0];
          var maxElement = elements[0];
          for (var i = 1; i < elements.length; i++) {
              if (maxElement.localeCompare(elements[i]) < 0) {
                  maxElement = elements[i];
              }
          }
          return maxElement;
        }
      } else {
          return null;
      }
    },

    functionMin: function(resolvedArgs) {
      if (resolvedArgs[0].length > 0) {
        var typeName = this.getTypeName(resolvedArgs[0][0]);
        if (typeName === "number") {
          return Math.min.apply(Math, resolvedArgs[0]);
        } else {
          var elements = resolvedArgs[0];
          var minElement = elements[0];
          for (var i = 1; i < elements.length; i++) {
              if (elements[i].localeCompare(minElement) < 0) {
                  minElement = elements[i];
              }
          }
          return minElement;
        }
      } else {
        return null;
      }
    },

    functionSum: function(resolvedArgs) {
      var sum = 0;
      var listToSum = resolvedArgs[0];
      for (var i = 0; i < listToSum.length; i++) {
        sum += listToSum[i];
      }
      return sum;
    },

    functionType: function(resolvedArgs) {
        return this.getTypeName(resolvedArgs[0]);
    },

    functionKeys: function(resolvedArgs) {
        return Object.keys(resolvedArgs[0]);
    },

    functionValues: function(resolvedArgs) {
        var obj = resolvedArgs[0];
        var keys = Object.keys(obj);
        var values = [];
        for (var i = 0; i < keys.length; i++) {
            values.push(obj[keys[i]]);
        }
        return values;
    },

    functionJoin: function(resolvedArgs) {
        var joinChar = resolvedArgs[0];
        var listJoin = resolvedArgs[1];
        return listJoin.join(joinChar);
    },

    functionToString: function(resolvedArgs) {
        if (this.getTypeName(resolvedArgs[0]) === "string") {
            return resolvedArgs[0];
        } else {
            return JSON.stringify(resolvedArgs[0]);
        }
    },

    functionToNumber: function(resolvedArgs) {
        var typeName = this.getTypeName(resolvedArgs[0]);
        var convertedValue;
        if (typeName === "number") {
            return resolvedArgs[0];
        } else if (typeName === "string") {
            convertedValue = +resolvedArgs[0];
            if (!isNaN(convertedValue)) {
                return convertedValue;
            }
        }
        return null;
    },

    functionNotNull: function(resolvedArgs) {
        for (var i = 0; i < resolvedArgs.length; i++) {
            if (this.getTypeName(resolvedArgs[i]) !== "null") {
                return resolvedArgs[i];
            }
        }
        return null;
    },

    functionSort: function(resolvedArgs) {
        var sortedArray = resolvedArgs[0].slice(0);
        sortedArray.sort();
        return sortedArray;
    },

    functionSortBy: function(resolvedArgs) {
        var sortedArray = resolvedArgs[0].slice(0);
        if (!sortedArray) {
            return sortedArray;
        }
        var interpreter = this.interpreter;
        var exprefNode = resolvedArgs[1];
        var requiredType = this.getTypeName(
            interpreter.visit(exprefNode, sortedArray[0]));
        if (["number", "string"].indexOf(requiredType) < 0) {
            throw new Error("TypeError");
        }
        var that = this;
        // In order to get a stable sort out of an unstable
        // sort algorithm, we decorate/sort/undecorate (DSU)
        // by creating a new list of [index, element] pairs.
        // In the cmp function, if the evaluated elements are
        // equal, then the index will be used as the tiebreaker.
        // After the decorated list has been sorted, it will be
        // undecorated to extract the original elements.
        var decorated = [];
        for (var i = 0; i < sortedArray.length; i++) {
          decorated.push([i, sortedArray[i]]);
        }
        decorated.sort(function(a, b) {
          var exprA = interpreter.visit(exprefNode, a[1]);
          var exprB = interpreter.visit(exprefNode, b[1]);
          if (that.getTypeName(exprA) !== requiredType) {
              throw new Error(
                  "TypeError: expected " + requiredType + ", received " +
                  that.getTypeName(exprA));
          } else if (that.getTypeName(exprB) !== requiredType) {
              throw new Error(
                  "TypeError: expected " + requiredType + ", received " +
                  that.getTypeName(exprB));
          }
          if (exprA > exprB) {
            return 1;
          } else if (exprA < exprB) {
            return -1;
          } else {
            // If they're equal compare the items by their
            // order to maintain relative order of equal keys
            // (i.e. to get a stable sort).
            return a[0] - b[0];
          }
        });
        // Undecorate: extract out the original list elements.
        for (var j = 0; j < decorated.length; j++) {
          sortedArray[j] = decorated[j][1];
        }
        return sortedArray;
    },

    functionMaxBy: function(resolvedArgs) {
      var exprefNode = resolvedArgs[1];
      var resolvedArray = resolvedArgs[0];
      var keyFunction = this.createKeyFunction(exprefNode, ["number", "string"]);
      var maxNumber = -Infinity;
      var maxRecord;
      var current;
      for (var i = 0; i < resolvedArray.length; i++) {
        current = keyFunction(resolvedArray[i]);
        if (current > maxNumber) {
          maxNumber = current;
          maxRecord = resolvedArray[i];
        }
      }
      return maxRecord;
    },

    functionMinBy: function(resolvedArgs) {
      var exprefNode = resolvedArgs[1];
      var resolvedArray = resolvedArgs[0];
      var keyFunction = this.createKeyFunction(exprefNode, ["number", "string"]);
      var minNumber = Infinity;
      var minRecord;
      var current;
      for (var i = 0; i < resolvedArray.length; i++) {
        current = keyFunction(resolvedArray[i]);
        if (current < minNumber) {
          minNumber = current;
          minRecord = resolvedArray[i];
        }
      }
      return minRecord;
    },

    createKeyFunction: function(exprefNode, allowedTypes) {
      var that = this;
      var interpreter = this.interpreter;
      var keyFunc = function(x) {
        var current = interpreter.visit(exprefNode, x);
        if (allowedTypes.indexOf(that.getTypeName(current)) < 0) {
          var msg = "TypeError: expected one of " + allowedTypes +
                    ", received " + that.getTypeName(current);
          throw new Error(msg);
        }
        return current;
      };
      return keyFunc;
    }

  };

  function compile(stream) {
    var parser = new Parser();
    var ast = parser.parse(stream);
    return ast;
  }

  function tokenize(stream) {
      var lexer = new Lexer();
      return lexer.tokenize(stream);
  }

  function search(data, expression) {
      var parser = new Parser();
      // This needs to be improved.  Both the interpreter and runtime depend on
      // each other.  The runtime needs the interpreter to support exprefs.
      // There's likely a clean way to avoid the cyclic dependency.
      var runtime = new Runtime();
      var interpreter = new TreeInterpreter(runtime);
      runtime.interpreter = interpreter;
      var node = parser.parse(expression);
      return interpreter.search(node, data);
  }

  exports.tokenize = tokenize;
  exports.compile = compile;
  exports.search = search;
  exports.Parser = Parser;
  exports.strictDeepEqual = strictDeepEqual;
})(typeof exports === "undefined" ? this.jmespath = {} : exports);
